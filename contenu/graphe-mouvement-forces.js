/* Graphe des prérequis du bloc de physique-chimie « Mouvement et forces » (PROGRAMME.md, section 5, bloc 3).
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
  bloc: 'mouvement-forces',
  titre: 'Mouvement et forces',
  quartier: 'physique',
  prefixe: 'mvt',
  notions: [
    { numero: '1', id: 'trajectoire', classe: 'cycle 4', titre: 'La trajectoire d’un mouvement', prerequis: [] },
    { numero: '2', id: 'vitesse-moyenne', classe: 'cycle 4', titre: 'La vitesse moyenne', prerequis: ['trajectoire'] },
    { numero: '3', id: 'nature-mouvement', classe: 'cycle 4', titre: 'Uniforme, accéléré ou ralenti', prerequis: ['vitesse-moyenne'] },
    { numero: '4', id: 'relativite-mouvement', classe: 'cycle 4', titre: 'Le mouvement dépend de qui regarde', prerequis: ['nature-mouvement'] },
    { numero: '5', id: 'actions-mecaniques', classe: '4e', titre: 'Les actions de contact et à distance', prerequis: [] },
    { numero: '6', id: 'force-newton', classe: '4e', titre: 'La force et le newton', prerequis: ['actions-mecaniques'] },
    { numero: '7', id: 'representer-force', classe: '4e', titre: 'Représenter une force par une flèche', prerequis: ['force-newton'] },
    { numero: '8', id: 'gravitation', classe: '3e', titre: 'La gravitation', prerequis: ['representer-force'] },
    { numero: '9', id: 'masse-poids', classe: '3e', titre: 'La masse et le poids', prerequis: ['gravitation'] },
    { numero: '10', id: 'poids-lune', classe: '3e', titre: 'Le poids sur la Lune', prerequis: ['masse-poids'] },
    { numero: '11', id: 'impesanteur', classe: '3e', titre: 'L’impesanteur', prerequis: ['poids-lune', 'relativite-mouvement'] },
  ],
});
