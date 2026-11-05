/* Graphe des prérequis du bloc « Données, probabilités, programmation » (PROGRAMME.md).
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
  matiere: 'maths',
  bloc: 'donnees-probabilites',
  titre: 'Données, probabilités, programmation',
  quartier: 'maths',
  prefixe: 'dat',
  notions: [
    { numero: '1', id: 'tableaux-donnees', classe: '4e', titre: 'Lire un tableau de données', prerequis: [] },
    { numero: '2', id: 'diagramme-batons', classe: '4e', titre: 'Le diagramme en bâtons', prerequis: ['tableaux-donnees'] },
    { numero: '3', id: 'diagramme-circulaire', classe: '4e', titre: 'Le diagramme circulaire', prerequis: ['tableaux-donnees'] },
    { numero: '4', id: 'effectifs-frequences', classe: '4e', titre: 'Effectifs et fréquences', prerequis: ['tableaux-donnees'] },
    { numero: '5', id: 'moyenne-simple', classe: '4e', titre: 'La moyenne', prerequis: ['effectifs-frequences'] },
    { numero: '6', id: 'moyenne-ponderee', classe: '4e', titre: 'La moyenne pondérée', prerequis: ['moyenne-simple'] },
    { numero: '7', id: 'mediane-etendue', classe: '4e', titre: 'Médiane et étendue', prerequis: ['moyenne-simple'] },
    { numero: '8', id: 'issues-evenements', classe: '4e', titre: 'Issues et événements', prerequis: [] },
    { numero: '9', id: 'calculer-probabilite', classe: '4e', titre: 'Calculer une probabilité', prerequis: ['issues-evenements'] },
    { numero: '10', id: 'evenement-contraire', classe: '4e', titre: 'L’événement contraire', prerequis: ['calculer-probabilite'] },
    { numero: '11', id: 'scratch-sequences', classe: '4e', titre: 'Séquences et événements', prerequis: [] },
    { numero: '12', id: 'scratch-boucles', classe: '4e', titre: 'Les boucles', prerequis: ['scratch-sequences'] },
    { numero: '13', id: 'scratch-variables', classe: '4e', titre: 'Les variables', prerequis: ['scratch-boucles'] },
    { numero: '14', id: 'scratch-conditions', classe: '4e', titre: 'Les conditions', prerequis: ['scratch-variables'] },
    { numero: '15', id: 'histogrammes', classe: '3e', titre: 'Les histogrammes', prerequis: ['diagramme-batons', 'effectifs-frequences'] },
    { numero: '16', id: 'deux-epreuves', classe: '3e', titre: 'Deux épreuves', prerequis: ['calculer-probabilite', 'evenement-contraire'] },
    { numero: '17', id: 'frequence-probabilite', classe: '3e', titre: 'Fréquence et probabilité', prerequis: ['calculer-probabilite', 'effectifs-frequences'] },
    { numero: '18', id: 'scratch-blocs-parallele', classe: '3e', titre: 'Blocs personnalisés et parallèle', prerequis: ['scratch-conditions'] },
  ],
});
