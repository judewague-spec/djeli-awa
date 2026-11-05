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
  let enCours = null;

  function stockage() {
    try { return window.localStorage; } catch (e) { return null; }
  }

  function initialiser() {
    sons = table(window.PhrasesVoix);
    actif = lireReglage(stockage());
  }

  function arreter() {
    if (enCours) { enCours.pause(); enCours = null; }
  }

  /** Lit une phrase de Djéli Awa, ou plusieurs phrases complètes l'une après l'autre (liste).
      force : lire même si la voix est coupée (bouton « Réécouter »). */
  function lire(texte, force) {
    if (!sons) initialiser();
    const textes = [].concat(texte || []).filter(Boolean);
    if (!textes.length || (!actif && !force)) return;
    arreter();
    const suivante = (i) => {
      if (i >= textes.length) return;
      const src = sonDe(sons, textes[i]);
      if (!src) { suivante(i + 1); return; } // pas de son : le sous-titre seul
      const audio = new window.Audio(src);
      enCours = audio;
      const fin = (ok) => { if (enCours !== audio) return; enCours = null; if (ok) suivante(i + 1); };
      audio.addEventListener('error', () => fin(true));
      audio.addEventListener('ended', () => fin(true));
      audio.play().catch(() => fin(true)); // lecture refusée ou impossible : le sous-titre seul
    };
    suivante(0);
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

  return { CLE, normaliser, table, sonDe, lireReglage, ecrireReglage, initialiser, lire, arreter, estActive, regler, boutonReecouter, monterReglage };
});
