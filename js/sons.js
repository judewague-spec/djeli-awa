/* Sons des blocs : gardés dans un cache par bloc, tels quels, octet pour octet (aucune conversion).
   Ouvrir un bloc garde ses sons ; « Tout télécharger maintenant » garde ceux de tous les blocs.
   Un son déjà là, avec la bonne empreinte, n'est jamais retéléchargé : c'est ce qui permet de reprendre après un arrêt. */
(function (racine) {
  'use strict';
  const LISTE = 'voix/sons-blocs.json';
  const DOSSIER = 'voix/app/';
  const EN_MEME_TEMPS = 6;
  let liste = null;

  async function manifeste() {
    if (!liste) liste = (await fetch(LISTE)).json();
    return liste;
  }

  const adresse = (id) => DOSSIER + id + '.mp3';
  const nomCache = (bloc) => 'sons-' + bloc;
  const disponible = () => 'caches' in racine;

  /** Les sons déjà gardés. Une mise à jour retire ceux dont le fichier a changé (sw.js) : ce qui reste est à jour. */
  async function dejaGardes() {
    const s = new Set();
    for (const k of await caches.keys()) {
      if (!k.startsWith('sons-')) continue;
      for (const req of await (await caches.open(k)).keys()) s.add(decodeURIComponent(new URL(req.url).pathname.split('/').pop().replace(/[.]mp3$/, '')));
    }
    return s;
  }

  /** Télécharge un son et le garde : le corps du fichier n'est pas touché. L'empreinte voyage dans un en-tête. */
  async function garder(bloc, fiche, signal) {
    const rep = await fetch(adresse(fiche[0]), { signal, cache: 'no-cache' });
    if (!rep.ok) throw new Error('Son introuvable : ' + fiche[0]);
    const c = await caches.open(nomCache(bloc));
    await c.put(adresse(fiche[0]), new Response(rep.body, { status: 200, headers: { 'Content-Type': 'audio/mpeg', 'Content-Length': String(fiche[1]), 'X-Empreinte': fiche[2] } }));
  }

  /** Garde une liste de [bloc, fiche]. surAvance(octetsFaits) est appelé après chaque son. Rend false si on a arrêté. */
  async function travailler(travaux, surAvance, signal) {
    let i = 0;
    let erreur = null;
    const ouvrier = async () => {
      while (i < travaux.length && !erreur && !(signal && signal.aborted)) {
        const [bloc, fiche] = travaux[i++];
        try {
          await garder(bloc, fiche, signal);
          if (surAvance) surAvance(fiche[1]);
        } catch (e) { if (!(signal && signal.aborted)) erreur = e; }
      }
    };
    await Promise.all(Array.from({ length: EN_MEME_TEMPS }, ouvrier));
    if (erreur) throw erreur;
    return !(signal && signal.aborted);
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
    return { total: r.total, faits: r.faits, complet: r.travaux.length === 0 };
  }

  const blocsOuverts = new Map();

  /** À l'ouverture d'un bloc : garde ses sons, en arrière-plan. Rend une promesse qui ne rejette jamais. */
  function ouvrirBloc(bloc) {
    if (!disponible()) return Promise.resolve(false);
    if (!blocsOuverts.has(bloc)) {
      blocsOuverts.set(bloc, aFaire([bloc]).then((r) => travailler(r.travaux)).catch(() => false).then((ok) => { blocsOuverts.delete(bloc); return ok; }));
    }
    return blocsOuverts.get(bloc);
  }

  /** Tous les sons de tous les blocs. o : { signal, surAvance(fait, total) }. Reprend là où on s'est arrêté. */
  async function toutTelecharger(o) {
    const m = await manifeste();
    const r = await aFaire(Object.keys(m.blocs));
    let fait = r.faits;
    if (o.surAvance) o.surAvance(fait, r.total);
    return travailler(r.travaux, (n) => { fait += n; if (o.surAvance) o.surAvance(fait, r.total); }, o.signal);
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

  racine.Sons = { manifeste, etat, ouvrirBloc, toutTelecharger, preparerPlace, disponible };
})(window);
