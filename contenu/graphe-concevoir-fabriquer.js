/* Graphe des prérequis du bloc « Concevoir et fabriquer » (PROGRAMME.md).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   Les notions de cycle et de 4e avant la 3e (SPEC.md, principe 3). Elles ne demandent aucune notion de 3e : elles restent testables au test de départ.
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js). */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'technologie',
  bloc: 'concevoir-fabriquer',
  titre: 'Concevoir et fabriquer',
  quartier: 'techno',
  prefixe: 'cof',
  notions: [
    { numero: '1', id: 'taches-planning', classe: '4e', titre: 'Tâches et planning', prerequis: [] },
    { numero: '2', id: 'revue-projet', classe: '4e', titre: 'La revue de projet', prerequis: ['taches-planning'] },
    { numero: '3', id: 'ecoconception', classe: '4e', titre: 'L’écoconception', prerequis: [] },
    { numero: '4', id: 'croquis-schemas', classe: '4e', titre: 'Croquis et schémas', prerequis: [] },
    { numero: '5', id: 'modelisation-3d', classe: '4e', titre: 'La modélisation 3D', prerequis: ['croquis-schemas'] },
    { numero: '6', id: 'procedes-fabrication', classe: '4e', titre: 'Les procédés de fabrication', prerequis: ['modelisation-3d'] },
    { numero: '7', id: 'securite-atelier', classe: '4e', titre: 'La sécurité à l’atelier', prerequis: ['procedes-fabrication'] },
    { numero: '8', id: 'prototype-fonction', classe: '4e', titre: 'Ajouter une fonction', prerequis: ['procedes-fabrication'] },
    { numero: '9', id: 'simulation-test', classe: '4e', titre: 'Simuler et tester', prerequis: ['prototype-fonction'] },
    { numero: '10', id: 'concevoir-objet', classe: '3e', titre: 'Concevoir un objet', prerequis: ['prototype-fonction', 'ecoconception', 'revue-projet'] },
    { numero: '11', id: 'objets-communicants', classe: '3e', titre: 'Les objets communicants', prerequis: ['concevoir-objet'] },
    { numero: '12', id: 'protocole-test', classe: '3e', titre: 'Le protocole de test', prerequis: ['simulation-test'] },
  ],
});
