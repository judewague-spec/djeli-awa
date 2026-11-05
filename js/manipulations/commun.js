/* Boîte à outils des manipulations à l'écran (SPEC.md, section 5). Une manipulation est un module qui suit ce contrat :
     type            nom court, celui du champ manipulation.type d'une notion (« pizza ») ;
     monter(conteneur, reglages, dire, fini)
                     affiche la manipulation ; dire(texte, parle) fait parler Djéli Awa ; fini() quand c'est réussi ;
                     au doigt ET au lecteur d'écran : chaque geste a une alternative par boutons, chaque état est annoncé ;
     phrases(reglages)
                     les phrases qu'elle peut dire (pour la liste des sons, outils/lister-phrases.js) ;
     phrasesDites(reglages)
                     facultatif : la liste de toutes les phrases fixes qu'elle peut dire (pour les sons) ;
     dessin(img)     facultatif : le dessin fixe (SVG en texte) d'une image { dessin: type, …, description }.
   Les fiches des manipulations prévues sont dans js/manipulations/FICHES.md. */
(function (racine, fabrique) {
  const M = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = M;
  else racine.Manipulations = M;
})(this, function () {
  'use strict';

  const registre = new Map();

  /** Ce qui manque à un module pour suivre le contrat ([] si rien). */
  function defautsDuContrat(m) {
    const d = [];
    if (!m || typeof m.type !== 'string' || !m.type) d.push('type manquant');
    if (!m || typeof m.monter !== 'function') d.push('monter manquant');
    if (!m || typeof m.phrases !== 'function') d.push('phrases manquant');
    if (m && m.dessin !== undefined && typeof m.dessin !== 'function') d.push('dessin doit être une fonction');
    return d;
  }

  function enregistrer(m) {
    const d = defautsDuContrat(m);
    if (d.length) throw new Error('manipulation refusée : ' + d.join(', '));
    registre.set(m.type, m);
    return m;
  }

  const obtenir = (type) => registre.get(type) || null;
  const types = () => [...registre.keys()];

  /** Le dessin fixe d'une image de notion, ou '' si aucune manipulation ne sait la dessiner. */
  function dessin(img) {
    const m = img && obtenir(img.dessin);
    return m && m.dessin ? m.dessin(img) : '';
  }

  // ---------- Aides communes pour l'affichage (navigateur) ----------

  /** Un bouton d'au moins 48 px (style .manip-bouton), avec son nom pour le lecteur d'écran. */
  function bouton(texte, action, nom) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'manip-bouton';
    b.textContent = texte;
    if (nom) b.setAttribute('aria-label', nom);
    b.addEventListener('click', action);
    return b;
  }

  /** Une zone qui annonce chaque changement d'état au lecteur d'écran. */
  function zoneAnnonce() {
    const z = document.createElement('p');
    z.className = 'manip-etat';
    z.setAttribute('aria-live', 'polite');
    return z;
  }

  return { defautsDuContrat, enregistrer, obtenir, types, dessin, bouton, zoneAnnonce };
});
