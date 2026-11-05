/* Graphe des prérequis du bloc de maths « Le calcul avec des lettres » (PROGRAMME.md, section 4, bloc 2 : la boîte mystère).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   quartier : le marché, comme « Les nombres ».
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js). */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'maths',
  bloc: 'calcul-lettres',
  titre: 'Le calcul avec des lettres',
  quartier: 'maths',
  prefixe: 'let',
  notions: [
    { numero: '1', id: 'lire-expression', classe: '4e', titre: 'Lire une expression : la boîte mystère', prerequis: [] },
    { numero: '2', id: 'remplacer-lettre', classe: '4e', titre: 'Remplacer la lettre par un nombre', prerequis: ['lire-expression'] },
    { numero: '3', id: 'tester-egalite', classe: '4e', titre: 'Tester une égalité', prerequis: ['remplacer-lettre'] },
    { numero: '4', id: 'developper', classe: '4e', titre: 'Simple distributivité : développer', prerequis: ['remplacer-lettre'] },
    { numero: '5', id: 'reduire', classe: '4e', titre: 'Réduire une expression', prerequis: ['developper'] },
    { numero: '6', id: 'factoriser', classe: '4e', titre: 'Factoriser par un facteur commun', prerequis: ['reduire'] },
    { numero: '7', id: 'double-distributivite', classe: '3e', titre: 'Double distributivité', prerequis: ['reduire'] },
    { numero: '8', id: 'difference-carres', classe: '3e', titre: 'Somme fois différence : a² − b²', prerequis: ['double-distributivite'] },
    { numero: '9', id: 'identites-remarquables', classe: 'ancien programme', titre: 'Le carré d’une somme et d’une différence', prerequis: ['double-distributivite'] },
    { numero: '10', id: 'mettre-en-equation', classe: '4e', titre: 'Mettre un problème en équation', prerequis: ['tester-egalite'] },
    { numero: '11', id: 'resoudre-equation', classe: '4e', titre: 'Résoudre une équation : la balance', prerequis: ['mettre-en-equation'] },
    { numero: '12', id: 'equation-deux-cotes', classe: '4e', titre: 'Équations avec x des deux côtés', prerequis: ['resoudre-equation', 'developper'] },
    { numero: '13', id: 'equation-produit-nul', classe: '3e', titre: 'Équation produit nul', prerequis: ['equation-deux-cotes', 'factoriser'] },
    { numero: '14', id: 'inequations', classe: 'ancien programme', titre: 'Les inéquations', prerequis: ['equation-deux-cotes'] },
    { numero: '15', id: 'systemes', classe: 'ancien programme', titre: 'Les systèmes de deux équations', prerequis: ['equation-deux-cotes'] },
    { numero: '16', id: 'prouver-calcul', classe: '3e', titre: 'Prouver par le calcul', prerequis: ['factoriser', 'tester-egalite'] },
  ],
});
