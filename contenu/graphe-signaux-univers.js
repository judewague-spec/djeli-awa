/* Graphe des prérequis du bloc « Signaux et Univers » (PROGRAMME.md).
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
  matiere: 'physique-chimie',
  bloc: 'signaux-univers',
  titre: 'Signaux et Univers',
  quartier: 'physique',
  prefixe: 'sig',
  notions: [
    { numero: '1', id: 'sources-lumiere', classe: 'cycle 4', titre: 'Sources et objets diffusants', prerequis: [] },
    { numero: '2', id: 'propagation-lumiere', classe: 'cycle 4', titre: 'La lumière va tout droit', prerequis: ['sources-lumiere'] },
    { numero: '3', id: 'vitesse-lumiere', classe: 'cycle 4', titre: 'La vitesse de la lumière', prerequis: ['propagation-lumiere'] },
    { numero: '4', id: 'annee-lumiere', classe: 'cycle 4', titre: 'L’année-lumière', prerequis: ['vitesse-lumiere'] },
    { numero: '5', id: 'propagation-son', classe: 'cycle 4', titre: 'Le son et le vide', prerequis: [] },
    { numero: '6', id: 'vitesse-son', classe: 'cycle 4', titre: 'La vitesse du son', prerequis: ['propagation-son'] },
    { numero: '7', id: 'signal-information', classe: 'cycle 4', titre: 'Signal et information', prerequis: ['vitesse-lumiere', 'vitesse-son'] },
    { numero: '8', id: 'galaxies-ordres', classe: 'cycle 4', titre: 'Galaxies et ordres de grandeur', prerequis: ['annee-lumiere'] },
    { numero: '9', id: 'formation-systeme-solaire', classe: 'cycle 4', titre: 'La formation du système solaire', prerequis: ['galaxies-ordres'] },
    { numero: '10', id: 'origine-elements', classe: 'cycle 4', titre: 'L’origine des éléments', prerequis: ['formation-systeme-solaire'] },
    { numero: '11', id: 'frequence-son', classe: '3e', titre: 'Fréquence, infrasons, ultrasons', prerequis: ['vitesse-son'] },
  ],
});
