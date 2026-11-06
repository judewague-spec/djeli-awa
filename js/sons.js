/* Sons des blocs : gardés dans un cache par bloc, tels quels, octet pour octet (aucune conversion).
   Ouvrir un bloc garde ses sons ; « Tout télécharger maintenant » garde ceux de tous les blocs.
   Un son déjà là n'est jamais retéléchargé : c'est ce qui permet de reprendre après un arrêt.
   Une erreur isolée n'arrête plus tout (consigne du 6 nov. 2026) : chaque son est réessayé 3 fois (pauses de 1, 3 et 9 s,
   ou Retry-After sur 429 et 503), puis sauté ; sans internet ou page cachée, on attend le retour au lieu de compter un échec. */
(function (racine) {
  'use strict';
  const LISTE = 'voix/sons-blocs.json';
  const DOSSIER = 'voix/app/';
  const EN_MEME_TEMPS = 3;
  const PAUSES = [1000, 3000, 9000];
  let liste = null;

  async function manifeste() {
    if (!liste) liste = fetch(LISTE).then((r) => { if (!r.ok) throw new Error('liste des sons introuvable'); return r.json(); }).catch((e) => { liste = null; throw e; });
    return liste;
  }

  const adresse = (id) => DOSSIER + id + '.mp3';
  const nomCache = (bloc) => 'sons-' + bloc;
  const disponible = () => 'caches' in racine;
  const estPlein = (e) => !!e && (e.name === 'QuotaExceededError' || /quota/i.test(String(e.message || '')));

  /** Une erreur avec un court détail, à lire par les testeurs. */
  function echec(detail, autre) { const e = new Error(detail); e.detail = detail; return Object.assign(e, autre || {}); }

  /** Attend ms millisecondes, sauf si l'on arrête. */
  const pause = (ms, signal) => new Promise((ok) => {
    const t = setTimeout(ok, ms);
    if (signal) signal.addEventListener('abort', () => { clearTimeout(t); ok(); }, { once: true });
  });

  /** Sans internet, ou page cachée (écran éteint) : on attend le retour, sans rien compter. */
  function attendreReprise(signal) {
    const pret = () => navigator.onLine !== false && !(typeof document !== 'undefined' && document.hidden);
    if (pret() || (signal && signal.aborted)) return Promise.resolve();
    return new Promise((ok) => {
      const voir = () => { if (pret() || (signal && signal.aborted)) { fin(); ok(); } };
      const fin = () => { racine.removeEventListener('online', voir); document.removeEventListener('visibilitychange', voir); clearInterval(t); };
      racine.addEventListener('online', voir);
      document.addEventListener('visibilitychange', voir);
      const t = setInterval(voir, 2000); // filet : certains navigateurs n'envoient pas toujours ces événements
      if (signal) signal.addEventListener('abort', voir, { once: true });
    });
  }

  /** Les sons déjà gardés. Une mise à jour retire ceux dont le fichier a changé (sw.js) : ce qui reste est à jour. */
  async function dejaGardes() {
    const s = new Set();
    for (const k of await caches.keys()) {
      if (!k.startsWith('sons-')) continue;
      for (const req of await (await caches.open(k)).keys()) s.add(decodeURIComponent(new URL(req.url).pathname.split('/').pop().replace(/[.]mp3$/, '')));
    }
    return s;
  }

  /** Les octets d'un son, entiers : la taille reçue doit être celle du manifeste. */
  async function recevoir(fiche, signal) {
    let rep;
    try { rep = await fetch(adresse(fiche[0]), { signal, cache: 'no-cache' }); }
    catch (e) { if (signal && signal.aborted) throw e; throw echec(navigator.onLine === false ? 'pas d’internet' : 'réseau coupé', { reseau: true }); }
    if (!rep.ok) {
      const apres = Number(rep.headers.get('Retry-After'));
      const detail = rep.status === 404 ? 'son introuvable' : rep.status === 429 ? 'serveur saturé (429)' : 'erreur du serveur (' + rep.status + ')';
      throw echec(detail, { statut: rep.status, attente: (rep.status === 429 || rep.status === 503) && apres > 0 ? Math.min(apres, 120) * 1000 : 0 });
    }
    let octets;
    try { octets = await rep.arrayBuffer(); }
    catch (e) { if (signal && signal.aborted) throw e; throw echec('réception coupée', { reseau: true }); }
    if (octets.byteLength !== fiche[1]) throw echec('son incomplet (' + octets.byteLength + ' octets sur ' + fiche[1] + ')');
    return octets;
  }

  /** Télécharge un son et le garde : les octets reçus sont gardés tels quels. L'empreinte voyage dans un en-tête. */
  async function garder(bloc, fiche, signal) {
    for (let essai = 0; ; essai++) {
      try {
        const octets = await recevoir(fiche, signal);
        const c = await caches.open(nomCache(bloc));
        try {
          await c.put(adresse(fiche[0]), new Response(octets, { status: 200, headers: { 'Content-Type': 'audio/mpeg', 'Content-Length': String(fiche[1]), 'X-Empreinte': fiche[2] } }));
        } catch (e) { throw estPlein(e) ? Object.assign(e, { detail: 'plus de place' }) : echec('rangement refusé (' + (e && e.name) + ')'); }
        return;
      } catch (e) {
        if ((signal && signal.aborted) || estPlein(e)) throw e;
        // Réseau absent ou écran éteint : on attend, et cet essai ne compte pas.
        if (e.reseau && (navigator.onLine === false || document.hidden)) { await attendreReprise(signal); essai--; continue; }
        if (essai >= PAUSES.length) throw e;
        await pause(e.attente || PAUSES[essai], signal);
      }
    }
  }

  /** Garde une liste de [bloc, fiche]. surAvance(octets) après chaque son gardé.
      Rend { arrete, manquants : [{ id, detail }] } ; ne s'interrompt que sur un arrêt demandé ou le manque de place. */
  async function travailler(travaux, surAvance, signal) {
    let i = 0;
    let plein = null;
    const manquants = [];
    const ouvrier = async () => {
      while (i < travaux.length && !plein && !(signal && signal.aborted)) {
        const [bloc, fiche] = travaux[i++];
        await attendreReprise(signal);
        if (signal && signal.aborted) break;
        try {
          await garder(bloc, fiche, signal);
          if (surAvance) surAvance(fiche[1]);
        } catch (e) {
          if (signal && signal.aborted) break;
          if (estPlein(e)) { plein = e; break; }
          manquants.push({ id: fiche[0], detail: e.detail || String((e && e.message) || e) });
        }
      }
    };
    await Promise.all(Array.from({ length: EN_MEME_TEMPS }, ouvrier));
    if (plein) throw plein;
    return { arrete: !!(signal && signal.aborted), manquants };
  }

  /** Les sons à télécharger (et le total) pour une liste de blocs. */
  async function aFaire(blocs) {
    const m = await manifeste();
    const gardes = await dejaGardes();
    const vus = new Set();
    const travaux = [];
    let total = 0, faits = 0;
    for (const bloc of blocs) {
      for (const fiche of (m.blocs[bloc] || { sons: [] }).sons) {
        if (vus.has(fiche[0])) continue;
        vus.add(fiche[0]);
        total += fiche[1];
        if (gardes.has(fiche[0])) faits += fiche[1];
        else travaux.push([bloc, fiche]);
      }
    }
    return { travaux, total, faits };
  }

  /** L'état d'un bloc ou de tous : { total, faits, complet } en octets. */
  async function etat(bloc) {
    if (!disponible()) return { total: 0, faits: 0, complet: false };
    const m = await manifeste();
    const r = await aFaire(bloc ? [bloc] : Object.keys(m.blocs));
    return { total: r.total, faits: r.faits, complet: r.travaux.length === 0, reste: r.travaux.length };
  }

  const blocsOuverts = new Map();

  /** À l'ouverture d'un bloc : garde ses sons, en arrière-plan, avec les mêmes reprises. Rend une promesse qui ne rejette jamais :
      { ok, manquants, detail }. */
  function ouvrirBloc(bloc) {
    if (!disponible()) return Promise.resolve({ ok: false, manquants: [], detail: 'pas de cache' });
    if (!blocsOuverts.has(bloc)) {
      blocsOuverts.set(bloc, aFaire([bloc]).then((r) => travailler(r.travaux))
        .then((r) => ({ ok: !r.manquants.length, manquants: r.manquants, detail: r.manquants.length ? r.manquants[0].detail : '' }))
        .catch((e) => ({ ok: false, manquants: [], detail: estPlein(e) ? 'plus de place' : (e && e.detail) || String((e && e.message) || e) }))
        .then((r) => { blocsOuverts.delete(bloc); return r; }));
    }
    return blocsOuverts.get(bloc);
  }

  /** Garde l'écran allumé pendant un long téléchargement, s'il le permet ; la demande est refaite quand la page revient. */
  function ecranAllume() {
    let verrou = null, actif = true;
    const demander = async () => {
      if (!actif || !navigator.wakeLock || document.hidden) return;
      try { verrou = await navigator.wakeLock.request('screen'); } catch (e) { verrou = null; }
    };
    const voir = () => { if (!document.hidden) demander(); };
    document.addEventListener('visibilitychange', voir);
    demander();
    return () => { actif = false; document.removeEventListener('visibilitychange', voir); if (verrou) verrou.release().catch(() => {}); };
  }

  /** Tous les sons de tous les blocs. o : { signal, surAvance(fait, total) }. Reprend là où on s'est arrêté.
      Rend { fini, arrete, manquants } ; rejette seulement si la place manque. */
  async function toutTelecharger(o) {
    const m = await manifeste();
    const r = await aFaire(Object.keys(m.blocs));
    let fait = r.faits;
    if (o.surAvance) o.surAvance(fait, r.total);
    const relacher = ecranAllume();
    try {
      const t = await travailler(r.travaux, (n) => { fait += n; if (o.surAvance) o.surAvance(fait, r.total); }, o.signal);
      return { fini: !t.arrete && !t.manquants.length, arrete: t.arrete, manquants: t.manquants };
    } finally { relacher(); }
  }

  /** La place libre, si le navigateur la donne ; le navigateur est prié de garder les fichiers. */
  async function preparerPlace() {
    const s = navigator.storage;
    if (!s) return { persistant: false, libre: null };
    const persistant = s.persist ? await s.persist().catch(() => false) : false;
    let libre = null;
    if (s.estimate) { const e = await s.estimate().catch(() => null); if (e && e.quota) libre = e.quota - (e.usage || 0); }
    return { persistant, libre };
  }

  racine.Sons = { manifeste, etat, ouvrirBloc, toutTelecharger, preparerPlace, disponible, estPlein, EN_MEME_TEMPS, PAUSES };
})(window);
