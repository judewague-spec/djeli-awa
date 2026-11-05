/* Graphe des prérequis du bloc « Programmer » (PROGRAMME.md).
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
  bloc: 'programmer',
  titre: 'Programmer',
  quartier: 'techno',
  prefixe: 'prg',
  notions: [
    { numero: '1', id: 'prog-variables', classe: 'cycle 4', titre: 'Les variables', prerequis: [] },
    { numero: '2', id: 'prog-operateurs', classe: 'cycle 4', titre: 'Les opérateurs', prerequis: ['prog-variables'] },
    { numero: '3', id: 'prog-conditions', classe: 'cycle 4', titre: 'Les conditions', prerequis: ['prog-operateurs'] },
    { numero: '4', id: 'prog-et-ou-non', classe: 'cycle 4', titre: 'ET, OU, NON', prerequis: ['prog-conditions'] },
    { numero: '5', id: 'prog-boucles', classe: 'cycle 4', titre: 'Les boucles', prerequis: ['prog-conditions'] },
    { numero: '6', id: 'prog-listes', classe: 'cycle 4', titre: 'Les listes', prerequis: ['prog-boucles'] },
    { numero: '7', id: 'prog-evenements', classe: 'cycle 4', titre: 'Les événements', prerequis: ['prog-conditions'] },
    { numero: '8', id: 'prog-entrees-sorties', classe: 'cycle 4', titre: 'Entrées et sorties', prerequis: ['prog-evenements'] },
    { numero: '9', id: 'algorithme-programme', classe: '4e', titre: 'De l’algorithme au programme', prerequis: ['prog-boucles', 'prog-conditions'] },
    { numero: '10', id: 'programme-structure', classe: '3e', titre: 'Piloter un objet réel', prerequis: ['prog-entrees-sorties', 'algorithme-programme'] },
    { numero: '11', id: 'ecriture-texte', classe: '3e', titre: 'Écrire en texte', prerequis: ['algorithme-programme'] },
  ],
});
