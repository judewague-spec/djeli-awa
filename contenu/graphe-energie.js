/* Graphe des prérequis du bloc « Énergie » (PROGRAMME.md).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   Les notions du cycle 4 viennent avant celles de 3e (SPEC.md, principe 3). Elles ne demandent aucune notion de 3e : elles restent testables au test de départ.
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js). */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'physique-chimie',
  bloc: 'energie',
  titre: 'Énergie',
  quartier: 'physique',
  prefixe: 'eng',
  notions: [
    { numero: '1', id: 'formes-energie', classe: 'cycle 4', titre: 'Les formes d’énergie', prerequis: [] },
    { numero: '2', id: 'conversions-energie', classe: 'cycle 4', titre: 'Les conversions d’énergie', prerequis: ['formes-energie'] },
    { numero: '3', id: 'chaine-energetique', classe: 'cycle 4', titre: 'La chaîne énergétique', prerequis: ['conversions-energie'] },
    { numero: '4', id: 'centrale-electrique', classe: 'cycle 4', titre: 'La centrale électrique', prerequis: ['chaine-energetique'] },
    { numero: '5', id: 'conservation-energie', classe: 'cycle 4', titre: 'La conservation de l’énergie', prerequis: ['chaine-energetique'] },
    { numero: '6', id: 'unites-energie', classe: 'cycle 4', titre: 'Joule et kilowattheure', prerequis: ['conservation-energie'] },
    { numero: '7', id: 'co2-effet-serre', classe: 'cycle 4', titre: 'CO₂ et effet de serre', prerequis: ['centrale-electrique'] },
    { numero: '8', id: 'energie-position', classe: 'cycle 4', titre: 'L’énergie de position', prerequis: ['formes-energie', 'centrale-electrique', 'unites-energie'] },
    { numero: '9', id: 'energie-cinetique', classe: '3e', titre: 'L’énergie cinétique', prerequis: ['energie-position', 'unites-energie'] },
    { numero: '10', id: 'freinage', classe: '3e', titre: 'Freinage et sécurité', prerequis: ['energie-cinetique'] },
  ],
});
