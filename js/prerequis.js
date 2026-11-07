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

  /** Les notions de base d'un bloc (décision du 6 nov. 2026) : celles des années d'avant (classe « 5e » ou « 4e » dans le graphe,
      repères de PROGRAMME.md), et tous leurs prérequis du chemin. Les autres (3e, cycle 4, ancien programme) sont le programme. */
  function bases(graphe) {
    const parId = new Map(graphe.notions.map((x) => [x.id, x]));
    const b = new Set();
    const ajouter = (id) => { if (b.has(id) || !parId.has(id)) return; b.add(id); parId.get(id).prerequis.forEach(ajouter); };
    graphe.notions.filter((x) => /^(5e|4e)$/.test(x.classe)).forEach((x) => ajouter(x.id));
    return b;
  }

  /** La prochaine notion à travailler parmi plusieurs blocs d'une matière : les bases d'abord, puis le programme ;
      dans chaque groupe, l'ordre des blocs puis du chemin. faite(id) : vrai si la notion est déjà faite ou commencée ailleurs. */
  function suivanteDansMatiere(graphes, acquises, faite) {
    const candidates = [];
    const base = new Set();
    for (const g of graphes) {
      bases(g).forEach((id) => base.add(id));
      for (const id of ouvertes(g, acquises)) if (!faite || !faite(id)) candidates.push(id);
    }
    return candidates.find((id) => base.has(id)) || candidates[0] || null;
  }

  return { verifier, ouvertes, prochaine, bases, suivanteDansMatiere };
});
