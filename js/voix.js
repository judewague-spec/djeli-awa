/* Voix de Djéli Awa : chaque phrase fixe a son son dans voix/app (js/voix-phrases.js).
   Si le son manque ou ne se lit pas, le sous-titre reste seul : jamais de voix de machine (SPEC.md, section 10).
   Le réglage « Voix de Djéli Awa : oui / non » est gardé dans le navigateur (oui par défaut). */
(function (racine, fabrique) {
  const V = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = V;
  else racine.Voix = V;
})(this, function () {
  'use strict';

  const CLE = 'djeli-voix';
  const DOSSIER = 'voix/app/';

  /** Forme unique d'un texte pour la recherche des sons : espaces fines, insécables et multiples ramenées à une espace,
      apostrophes typographiques ramenées à « ' ». */
  function normaliser(texte) {
    return String(texte).replace(/[\u2018\u2019\u02BC]/g, "'").replace(/[\s\u00A0\u202F\u2007\u2009\u200A]+/g, ' ').trim();
  }

  /** Table texte normalisé -> fichier son, à partir de la liste { id, texte }. */
  function table(phrases) {
    const t = new Map();
    for (const p of phrases || []) t.set(normaliser(p.texte), DOSSIER + p.id + '.mp3');
    return t;
  }

  /** Le fichier son d'un texte, ou null. */
  function sonDe(t, texte) {
    return t.get(normaliser(texte)) || null;
  }

  /** Le réglage gardé : true sauf si « non » a été choisi. stockage : un objet comme localStorage (peut manquer ou échouer). */
  function lireReglage(stockage) {
    try { return !stockage || stockage.getItem(CLE) !== 'non'; } catch (e) { return true; }
  }

  function ecrireReglage(stockage, oui) {
    try { if (stockage) stockage.setItem(CLE, oui ? 'oui' : 'non'); } catch (e) { /* le réglage vaut pour cette visite */ }
  }

  // ---------- Dans le navigateur ----------

  let sons = null;
  let actif = true;
  let jeton = 0; // chaque nouvelle lecture annule celle d'avant
  let lecteur = null; // un seul lecteur pour toute la visite : débloqué une fois au premier toucher (iPhone)
  let urlEnCours = null;
  let detacher = null; // retire les écouteurs du son d'avant, sur le lecteur commun

  function stockage() {
    try { return window.localStorage; } catch (e) { return null; }
  }

  function initialiser() {
    sons = table(window.PhrasesVoix);
    actif = lireReglage(stockage());
  }

  /** Un court silence (WAV), pour débloquer le lecteur au premier geste : Safari ne laisse jouer qu'un lecteur déjà touché. */
  function silence() {
    const n = 800, b = new ArrayBuffer(44 + n), v = new DataView(b);
    const s = (o, x) => { for (let i = 0; i < x.length; i++) v.setUint8(o + i, x.charCodeAt(i)); };
    s(0, 'RIFF'); v.setUint32(4, 36 + n, true); s(8, 'WAVEfmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true); s(36, 'data'); v.setUint32(40, n, true);
    for (let i = 0; i < n; i++) v.setUint8(44 + i, 128);
    return URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
  }

  function leLecteur() {
    if (!lecteur) lecteur = new window.Audio();
    return lecteur;
  }
  if (typeof document !== 'undefined') {
    const debloquer = () => {
      document.removeEventListener('pointerdown', debloquer, true);
      document.removeEventListener('keydown', debloquer, true);
      const a = leLecteur();
      if (a.src) return; // déjà en train de lire : il est débloqué
      a.src = silence();
      a.play().catch(() => {});
    };
    document.addEventListener('pointerdown', debloquer, true);
    document.addEventListener('keydown', debloquer, true);
  }

  /** L'adresse à lire. En ligne : le fichier, comme toujours (le service worker le sert s'il est gardé).
      Sans internet : le son gardé dans le cache, octet pour octet, car certains navigateurs ne passent pas par
      le service worker pour l'audio (consigne du 6 nov. 2026). */
  async function sourceDe(src) {
    if (navigator.onLine !== false) return src;
    try {
      if (window.caches) {
        const r = await window.caches.match(src);
        if (r && r.ok) return URL.createObjectURL(await r.blob());
      }
    } catch (e) { /* le fichier en ligne */ }
    return src;
  }

  function liberer() {
    if (urlEnCours && urlEnCours.startsWith('blob:')) URL.revokeObjectURL(urlEnCours);
    urlEnCours = null;
  }

  // Les lectures en attente de leur fin : arrêter les termine toutes (la suite ne reste jamais suspendue).
  const enAttente = new Set();
  function arreter() {
    jeton++;
    for (const f of [...enAttente]) f();
    if (lecteur && !lecteur.paused) lecteur.pause();
  }

  /** Les tests et les essais peuvent suivre les lectures : journal({ son, etat : 'debut' | 'fin' | 'erreur' }). */
  const noter = (son, etat) => { try { if (racineJournal.journal) racineJournal.journal({ son, etat }); } catch (e) { /* rien */ } };
  const racineJournal = {};

  /** Lit une phrase de Djéli Awa, ou plusieurs phrases complètes l'une après l'autre (liste).
      force : lire même si la voix est coupée (bouton « Réécouter »).
      Rend une promesse tenue quand la voix a fini (ou a été arrêtée, ou n'a rien à dire). */
  function lire(texte, force) {
    if (!sons) initialiser();
    const textes = [].concat(texte || []).filter(Boolean);
    if (!textes.length || (!actif && !force)) return Promise.resolve();
    arreter();
    const mien = jeton;
    let tenir;
    const promesse = new Promise((ok) => { tenir = () => { enAttente.delete(tenir); ok(); }; });
    enAttente.add(tenir);
    const suivante = async (i) => {
      if (i >= textes.length || mien !== jeton) { tenir(); return; }
      const src = sonDe(sons, textes[i]);
      if (!src) { suivante(i + 1); return; } // pas de son : le sous-titre seul
      const url = await sourceDe(src);
      if (mien !== jeton) { if (url.startsWith('blob:')) URL.revokeObjectURL(url); return; }
      const audio = leLecteur();
      liberer();
      urlEnCours = url;
      const nom = src.split('/').pop();
      let fini = false, secondEssai = false;
      const fin = (ok) => {
        if (fini) return;
        fini = true;
        if (detacher) detacher();
        noter(nom, ok ? 'fin' : 'erreur');
        if (mien !== jeton) return;
        suivante(i + 1); // lecture refusée ou impossible : le sous-titre seul, puis la suite
      };
      const surFin = () => fin(true);
      // Un son lu depuis le cache que le navigateur refuse : un second essai, par son adresse.
      const surErreur = () => {
        if (url.startsWith('blob:') && !secondEssai && !fini) { secondEssai = true; audio.src = src; audio.play().catch((e) => { if (e && e.name === 'NotAllowedError') fin(false); }); return; }
        fin(false);
      };
      if (detacher) detacher();
      audio.addEventListener('ended', surFin);
      audio.addEventListener('error', surErreur);
      detacher = () => { audio.removeEventListener('ended', surFin); audio.removeEventListener('error', surErreur); detacher = null; };
      audio.src = url;
      noter(nom, 'debut');
      // Lecture refusée (geste manquant) : la suite ; une erreur du fichier passe par l'événement « error ».
      audio.play().catch((e) => { if (e && e.name === 'NotAllowedError') fin(false); });
    };
    suivante(0);
    return promesse;
  }

  function estActive() {
    if (!sons) initialiser();
    return actif;
  }

  function regler(oui) {
    actif = !!oui;
    ecrireReglage(stockage(), actif);
    if (!actif) arreter();
  }

  /** Bouton « Réécouter » pour une phrase ; texte peut être une fonction (texte du moment). */
  function boutonReecouter(texte) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'reecouter secondaire';
    b.textContent = 'Réécouter';
    b.addEventListener('click', () => lire(typeof texte === 'function' ? texte() : texte, true));
    return b;
  }

  /** Le réglage oui / non : deux boutons radio dans un groupe nommé, pour le lecteur d'écran. */
  function monterReglage(conteneur) {
    const oui = estActive();
    conteneur.innerHTML =
      '<fieldset class="reglage-voix"><legend>Voix de Djéli Awa</legend>' +
      '<label><input type="radio" name="voix-djeli" value="oui"' + (oui ? ' checked' : '') + '> Oui</label>' +
      '<label><input type="radio" name="voix-djeli" value="non"' + (oui ? '' : ' checked') + '> Non</label></fieldset>';
    conteneur.querySelectorAll('input').forEach((i) => i.addEventListener('change', () => { if (i.checked) regler(i.value === 'oui'); }));
  }

  return Object.assign(racineJournal, { CLE, normaliser, table, sonDe, lireReglage, ecrireReglage, initialiser, lire, arreter, estActive, regler, boutonReecouter, monterReglage, journal: null });
});
