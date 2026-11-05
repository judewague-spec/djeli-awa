/* Chemin et prérequis : quelles notions sont ouvertes, et le graphe d'un bloc est-il cohérent ?
   Graphe : { bloc, notions: [{ id, prerequis: [id…] }] }, dans l'ordre du chemin. */
(function (racine, fabrique) {
  const P = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = P;
  else racine.Prerequis = P;
})(this, function () {
  'use strict';

  /** Liste des défauts du graphe (vide si tout va bien) : doublon, prérequis inconnu, prérequis placé après la notion. */
  function verifier(graphe) {
    const defauts = [];
    const rang = new Map();
    graphe.notions.forEach((n, i) => {
      if (rang.has(n.id)) defauts.push('doublon : ' + n.id);
      rang.set(n.id, i);
    });
    graphe.notions.forEach((n, i) => {
      for (const p of n.prerequis) {
        if (!rang.has(p)) defauts.push(n.id + ' : prérequis inconnu ' + p);
        else if (rang.get(p) >= i) defauts.push(n.id + ' : prérequis placé après lui, ' + p);
      }
    });
    return defauts;
  }

  /** Notions non acquises dont tous les prérequis sont acquis, dans l'ordre du chemin. */
  function ouvertes(graphe, acquises) {
    const a = new Set(acquises);
    return graphe.notions.filter((n) => !a.has(n.id) && n.prerequis.every((p) => a.has(p))).map((n) => n.id);
  }

  /** La prochaine notion du chemin, ou null quand le bloc est fini. */
  function prochaine(graphe, acquises) {
    return ouvertes(graphe, acquises)[0] || null;
  }

  return { verifier, ouvertes, prochaine };
});
