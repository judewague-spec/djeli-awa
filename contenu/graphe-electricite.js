/* Graphe des prérequis du bloc de physique-chimie « L'électricité » (PROGRAMME.md, section 5, bloc 2).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   quartier : la forge (SPEC.md, principe 8 : les blocs de physique-chimie autres que « La matière » vont à la forge).
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js). */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'physique-chimie',
  bloc: 'electricite',
  titre: 'L’électricité',
  quartier: 'physique',
  prefixe: 'ele',
  notions: [
    { numero: '1', id: 'circuit-simple', classe: 'cycle 4', titre: 'Le circuit électrique simple', prerequis: [] },
    { numero: '2', id: 'serie-derivation', classe: 'cycle 4', titre: 'Série et dérivation', prerequis: ['circuit-simple'] },
    { numero: '3', id: 'intensite', classe: '4e', titre: 'L’intensité du courant', prerequis: ['serie-derivation'] },
    { numero: '4', id: 'tension', classe: '4e', titre: 'La tension électrique', prerequis: ['intensite'] },
    { numero: '5', id: 'lois-serie', classe: '4e', titre: 'Les lois du circuit en série', prerequis: ['tension'] },
    { numero: '6', id: 'lois-derivation', classe: '4e', titre: 'Les lois du circuit en dérivation', prerequis: ['lois-serie'] },
    { numero: '7', id: 'loi-ohm', classe: '4e', titre: 'La résistance et la loi d’Ohm', prerequis: ['lois-serie'] },
    { numero: '8', id: 'puissance-electrique', classe: '3e', titre: 'La puissance électrique', prerequis: ['loi-ohm', 'lois-derivation'] },
    { numero: '9', id: 'energie-electrique', classe: '3e', titre: 'L’énergie électrique', prerequis: ['puissance-electrique'] },
    { numero: '10', id: 'facture-electricite', classe: '3e', titre: 'Le kilowattheure et la facture', prerequis: ['energie-electrique'] },
  ],
});
