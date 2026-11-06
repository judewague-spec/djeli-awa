/* Avancement (consigne du 6 nov. 2026) : pour chaque notion, la part de ses questions réussies et non marquées « À revoir ».
   Une notion acquise avant les cartes par question (mission finie ou test de départ) compte pour 100 % tant qu'aucune de ses
   questions n'a de carte : les progrès déjà faits par les testeurs sont repris. Sans rien afficher : testé seul dans Node. */
(function (racine, fabrique) {
  const A = fabrique(racine.Mission || (typeof require === 'function' ? require('./mission.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = A;
  else racine.Avancement = A;
})(this, function (Mission) {
  'use strict';

  const memoire = new Map();
  /** Les cartes de question d'une notion (gardées en mémoire : elles ne changent pas). */
  function cartesDe(notion) {
    if (!memoire.has(notion.id)) memoire.set(notion.id, Mission.cartesDeNotion(notion));
    return memoire.get(notion.id);
  }

  /** Le pourcentage d'une notion, arrondi à l'unité. suivi : progression.notions[id] (peut manquer). */
  function notion(n, cartesQ, suivi) {
    const ids = cartesDe(n);
    if (!ids.length) return suivi && suivi.acquise ? 100 : 0;
    const vues = ids.filter((id) => cartesQ && cartesQ[id]);
    if (!vues.length) return suivi && suivi.acquise ? 100 : 0;
    const reussies = vues.filter((id) => cartesQ[id].note !== 'revoir').length;
    return Math.round((100 * reussies) / ids.length);
  }

  /** Une matière : { pourcent (moyenne de ses notions), acquises, total }. */
  function matiere(notions, cartesQ, progression) {
    if (!notions.length) return { pourcent: 0, acquises: 0, total: 0 };
    const suivi = (progression && progression.notions) || {};
    const p = notions.map((n) => notion(n, cartesQ, suivi[n.id]));
    return {
      pourcent: Math.round(p.reduce((a, x) => a + x, 0) / notions.length),
      acquises: notions.filter((n) => suivi[n.id] && suivi[n.id].acquise).length,
      total: notions.length,
    };
  }

  /** « 60 % » pour les yeux ; le lecteur d'écran le lit « 60 pour cent ». */
  const enTexte = (p) => p + ' %';

  return { cartesDe, notion, matiere, enTexte };
});
