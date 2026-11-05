/* Graphe des prérequis du bloc maths « Les nombres », validé le 29 octobre 2026.
   L'ordre de la liste est l'ordre du chemin (celui de PROGRAMME.md).
   Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises. */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'maths',
  bloc: 'nombres',
  titre: 'Les nombres',
  notions: [
    { numero: '1', id: 'multiples-diviseurs', classe: '5e', titre: 'Multiples et diviseurs', prerequis: [] },
    { numero: '2', id: 'criteres-divisibilite', classe: '5e', titre: 'Critères de divisibilité', prerequis: ['multiples-diviseurs'] },
    { numero: '3', id: 'relatifs-addition', classe: '4e', titre: 'Nombres relatifs : addition et soustraction', prerequis: [] },
    { numero: '4', id: 'relatifs-multiplication', classe: '4e', titre: 'Nombres relatifs : multiplication et division', prerequis: ['relatifs-addition'] },
    { numero: '5', id: 'nombres-premiers', classe: '4e', titre: 'Nombres premiers jusqu’à 100', prerequis: ['criteres-divisibilite'] },
    { numero: '6', id: 'decomposition-facteurs-premiers', classe: '3e', titre: 'Décomposition en facteurs premiers', prerequis: ['nombres-premiers'] },
    { numero: '7', id: 'pgcd', classe: 'ancien programme', titre: 'PGCD : méthode des diviseurs et algorithme d’Euclide', prerequis: ['multiples-diviseurs', 'criteres-divisibilite'] },
    { numero: '8', id: 'fractions-sens-egalite', classe: '4e', titre: 'Fractions : sens et égalité', prerequis: ['multiples-diviseurs'] },
    { numero: '9', id: 'fractions-comparer', classe: '4e', titre: 'Comparer et ranger des fractions', prerequis: ['fractions-sens-egalite'] },
    { numero: '10a', id: 'fractions-addition-positives', classe: '4e', titre: 'Additionner et soustraire des fractions positives', prerequis: ['fractions-comparer'] },
    { numero: '10b', id: 'fractions-addition-negatives', classe: '4e', titre: 'Additionner et soustraire des fractions négatives', prerequis: ['fractions-addition-positives', 'relatifs-addition'] },
    { numero: '11a', id: 'fractions-multiplication-positives', classe: '4e', titre: 'Multiplier des fractions positives, inverse d’un nombre', prerequis: ['fractions-sens-egalite'] },
    { numero: '11b', id: 'fractions-multiplication-negatives', classe: '4e', titre: 'Multiplier des fractions négatives', prerequis: ['fractions-multiplication-positives', 'relatifs-multiplication'] },
    { numero: '12', id: 'fractions-division', classe: '4e', titre: 'Diviser des fractions', prerequis: ['fractions-multiplication-negatives'] },
    { numero: '13', id: 'fraction-irreductible', classe: '3e', titre: 'Fraction irréductible', prerequis: ['pgcd', 'fractions-sens-egalite'] },
    { numero: '14', id: 'puissances-10-positives', classe: '4e', titre: 'Puissances de 10, exposant positif', prerequis: [] },
    { numero: '15', id: 'puissances-10-negatives', classe: '4e', titre: 'Puissances de 10, exposant négatif', prerequis: ['puissances-10-positives', 'fractions-sens-egalite'] },
    { numero: '16', id: 'puissances-quelconques', classe: '4e', titre: 'Puissances d’un nombre quelconque', prerequis: ['puissances-10-positives', 'relatifs-multiplication'] },
    { numero: '17', id: 'puissances-produits-quotients', classe: '3e', titre: 'Produits et quotients de puissances', prerequis: ['puissances-10-negatives', 'puissances-quelconques'] },
    { numero: '18', id: 'notation-scientifique', classe: '4e', titre: 'Notation scientifique', prerequis: ['puissances-10-negatives'] },
    { numero: '19', id: 'prefixes-ordres-grandeur', classe: '4e', titre: 'Préfixes de nano à giga, ordres de grandeur', prerequis: ['notation-scientifique'] },
    { numero: '20', id: 'carres-parfaits', classe: 'cycle 4', titre: 'Carrés parfaits de 1 à 144', prerequis: [] },
    { numero: '21', id: 'racine-carree', classe: '4e', titre: 'Racine carrée : définition et encadrement', prerequis: ['carres-parfaits'] },
    { numero: '22', id: 'equation-x-carre', classe: '3e', titre: 'Équation x² = a', prerequis: ['racine-carree', 'relatifs-multiplication'] },
    { numero: '23', id: 'calculs-racines', classe: 'ancien programme', titre: 'Calculs avec les racines carrées', prerequis: ['racine-carree', 'decomposition-facteurs-premiers'] },
    { numero: '24', id: 'nombres-irrationnels', classe: '3e', titre: 'Nombres irrationnels, √2', prerequis: ['racine-carree', 'fraction-irreductible'], aConfirmer: true },
    { numero: '25', id: 'ratio', classe: '3e', titre: 'Ratio et partage selon un ratio', prerequis: ['fractions-sens-egalite'], aConfirmer: true },
  ],
});
