/* Graphe des prérequis du bloc « Planète Terre, environnement, action humaine » (PROGRAMME.md).
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
  matiere: 'svt',
  bloc: 'planete-terre',
  titre: 'Planète Terre, environnement, action humaine',
  quartier: 'svt',
  prefixe: 'ter',
  notions: [
    { numero: '1', id: 'systeme-solaire', classe: 'cycle 4', titre: 'Le système solaire', prerequis: [] },
    { numero: '2', id: 'plaques-tectoniques', classe: 'cycle 4', titre: 'Les plaques tectoniques', prerequis: [] },
    { numero: '3', id: 'seismes', classe: 'cycle 4', titre: 'Les séismes', prerequis: ['plaques-tectoniques'] },
    { numero: '4', id: 'volcans', classe: 'cycle 4', titre: 'Les volcans', prerequis: ['plaques-tectoniques'] },
    { numero: '5', id: 'eres-geologiques', classe: 'cycle 4', titre: 'Les ères géologiques', prerequis: [] },
    { numero: '6', id: 'meteo-climat', classe: 'cycle 4', titre: 'Météo et climat', prerequis: [] },
    { numero: '7', id: 'vents-courants', classe: 'cycle 4', titre: 'Vents et courants', prerequis: ['meteo-climat'] },
    { numero: '8', id: 'zones-climatiques', classe: 'cycle 4', titre: 'Les zones climatiques', prerequis: ['meteo-climat'] },
    { numero: '9', id: 'changements-climatiques', classe: 'cycle 4', titre: 'Climats passés et actuels', prerequis: ['zones-climatiques', 'eres-geologiques'] },
    { numero: '10', id: 'alea-vulnerabilite', classe: 'cycle 4', titre: 'Aléa, enjeu, vulnérabilité', prerequis: ['seismes', 'volcans'] },
    { numero: '11', id: 'prevention-risques', classe: 'cycle 4', titre: 'Prévenir les risques', prerequis: ['alea-vulnerabilite'] },
    { numero: '12', id: 'ressources-eau-sol', classe: 'cycle 4', titre: 'L’eau et le sol', prerequis: ['meteo-climat'] },
    { numero: '13', id: 'ressources-exploitees', classe: 'cycle 4', titre: 'Énergies, bois, minerais, pêche', prerequis: ['ressources-eau-sol'] },
    { numero: '14', id: 'activites-ecosystemes', classe: 'cycle 4', titre: 'Activités et écosystèmes', prerequis: ['ressources-exploitees'] },
    { numero: '15', id: 'biodiversite-gestion', classe: 'cycle 4', titre: 'Préserver la biodiversité', prerequis: ['activites-ecosystemes'] },
  ],
});
