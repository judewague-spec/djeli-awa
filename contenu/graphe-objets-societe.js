/* Graphe des prérequis du bloc de technologie « Les objets et la société » (PROGRAMME.md, section 7, bloc 1 ;
   programme de technologie du cycle 4, BOEN n° 9 du 29 février 2024, thème OST).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   quartier : l'atelier du réparateur, où l'on démonte, compare et répare les objets.
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js). */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'technologie',
  bloc: 'objets-societe',
  titre: 'Les objets et la société',
  quartier: 'techno',
  prefixe: 'tec',
  notions: [
    { numero: '1', id: 'besoin-fonction', classe: 'cycle 4', titre: 'Le besoin et la fonction d’un objet', prerequis: [] },
    { numero: '2', id: 'invention-innovation', classe: 'cycle 4', titre: 'Invention et innovation', prerequis: ['besoin-fonction'] },
    { numero: '3', id: 'principe-technique', classe: 'cycle 4', titre: 'Fonction technique et principe technique', prerequis: ['besoin-fonction'] },
    { numero: '4', id: 'familles-lignees', classe: 'cycle 4', titre: 'Familles et lignées d’objets', prerequis: ['invention-innovation', 'principe-technique'] },
    { numero: '5', id: 'avantages-inconvenients', classe: '4e', titre: 'Avantages et inconvénients d’une évolution', prerequis: ['familles-lignees'] },
    { numero: '6', id: 'decouverte-societe', classe: '3e', titre: 'Découverte scientifique, technologie et société', prerequis: ['avantages-inconvenients'] },
    { numero: '7', id: 'cahier-des-charges', classe: '4e', titre: 'Le cahier des charges', prerequis: ['besoin-fonction'] },
    { numero: '8', id: 'normes-labels', classe: '4e', titre: 'Normes, labels et certifications', prerequis: ['cahier-des-charges'] },
    { numero: '9', id: 'notice', classe: '4e', titre: 'La notice et la documentation technique', prerequis: ['normes-labels'] },
    { numero: '10', id: 'etiquette-energie', classe: '4e', titre: 'L’étiquette énergie', prerequis: ['notice'] },
    { numero: '11', id: 'indice-reparabilite', classe: '4e', titre: 'L’indice de réparabilité', prerequis: ['notice'] },
    { numero: '12', id: 'impacts-environnement', classe: '4e', titre: 'Les impacts sur l’air, l’eau, le sol et la santé', prerequis: [] },
    { numero: '13', id: 'bilan-carbone', classe: '4e', titre: 'Le bilan carbone', prerequis: ['impacts-environnement'] },
    { numero: '14', id: 'cycle-de-vie', classe: '3e', titre: 'Le cycle de vie d’un objet', prerequis: ['bilan-carbone'] },
    { numero: '15', id: 'developpement-durable', classe: '3e', titre: 'Les trois piliers du développement durable', prerequis: ['cycle-de-vie'] },
    { numero: '16', id: 'mesurer-performance', classe: '4e', titre: 'Mesurer une performance : autonomie et vitesse', prerequis: [] },
    { numero: '17', id: 'protocole-evaluation', classe: '3e', titre: 'Protocole de mesure et choix d’un objet', prerequis: ['mesurer-performance', 'etiquette-energie', 'indice-reparabilite', 'developpement-durable'] },
  ],
});
