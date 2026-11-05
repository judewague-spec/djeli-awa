/* Graphe des prérequis du bloc « Comment un objet fonctionne » (PROGRAMME.md).
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
  bloc: 'fonctionnement-objets',
  titre: 'Comment un objet fonctionne',
  quartier: 'techno',
  prefixe: 'fon',
  notions: [
    { numero: '1', id: 'chaine-energie', classe: 'cycle 4', titre: 'La chaîne d’énergie', prerequis: [] },
    { numero: '2', id: 'flux-energie-objet', classe: '4e', titre: 'Identifier les flux', prerequis: ['chaine-energie'] },
    { numero: '3', id: 'transmission-mouvement', classe: 'cycle 4', titre: 'Transmettre un mouvement', prerequis: ['chaine-energie'] },
    { numero: '4', id: 'rapport-engrenages', classe: 'cycle 4', titre: 'Engrenages et chaîne du vélo', prerequis: ['transmission-mouvement'] },
    { numero: '5', id: 'chaine-information', classe: '4e', titre: 'La chaîne d’information', prerequis: ['chaine-energie'] },
    { numero: '6', id: 'capteurs-interface', classe: '4e', titre: 'Capteurs et interface', prerequis: ['chaine-information'] },
    { numero: '7', id: 'proprietes-materiaux', classe: 'cycle 4', titre: 'Les propriétés des matériaux', prerequis: [] },
    { numero: '8', id: 'recyclage-materiaux', classe: 'cycle 4', titre: 'Recycler les matériaux', prerequis: ['proprietes-materiaux'] },
    { numero: '9', id: 'forme-materiau-procede', classe: '4e', titre: 'Forme, matériau et procédé', prerequis: ['proprietes-materiaux'] },
    { numero: '10', id: 'fiabilite-durabilite', classe: 'cycle 4', titre: 'Fiabilité et durabilité', prerequis: ['proprietes-materiaux'] },
    { numero: '11', id: 'depannage', classe: '4e', titre: 'Dépanner avec méthode', prerequis: ['fiabilite-durabilite', 'chaine-energie'] },
    { numero: '12', id: 'schema-bloc', classe: '3e', titre: 'Le schéma-bloc', prerequis: ['flux-energie-objet', 'chaine-information'] },
    { numero: '13', id: 'mesure-donnee', classe: '3e', titre: 'D’une mesure à une donnée', prerequis: ['capteurs-interface'] },
  ],
});
