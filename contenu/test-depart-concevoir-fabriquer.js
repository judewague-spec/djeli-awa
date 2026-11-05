/* Test de départ du bloc « Concevoir et fabriquer » : « Le projet de l'étagère » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : une étape du projet par notion testée (4e ; celles de 3e sont toujours à apprendre).
   Il ne redit aucun test de l'atelier : ici, on fabrique une étagère pour Laure, du planning jusqu'aux essais.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'projet-etagere',
  bloc: 'concevoir-fabriquer',
  titre: 'Le projet de l’étagère',
  etape: 'poste',
  prefixe: 'etagere',
  phrases: {
    'test-intro': 'Viens, on fabrique une étagère pour Laure, à l’atelier ! À chaque poste, je te pose deux petites questions. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend le projet de l’étagère là où tu t’étais arrêtée.',
    'test-fin': 'Le projet de l’étagère est fini. Merci ! Ton chemin de la fabrication est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'taches-planning', titre: 'Le tableau du planning', phrase: 'Par quoi commencer, et combien de temps tout cela va prendre ?', generateurs: ['tache-ou-jalon', 'duree-totale'] },
    { notion: 'revue-projet', titre: 'La table de la réunion', phrase: 'On s’arrête un moment pour voir où en est le projet.', generateurs: ['jours-de-retard', 'quelle-decision'] },
    { notion: 'ecoconception', titre: 'Le tas de planches', phrase: 'Que choisir, pour que l’objet abîme le moins la planète ?', generateurs: ['quel-choix', 'matiere-economisee'] },
    { notion: 'croquis-schemas', titre: 'La feuille de croquis', phrase: 'Je dessine l’étagère sur une feuille, en plus petit.', generateurs: ['echelle-reelle', 'quel-dessin'] },
    { notion: 'modelisation-3d', titre: 'L’écran de l’ordinateur', phrase: 'Avant de scier, je construis l’étagère sur l’ordinateur.', generateurs: ['volume-pave', 'avant-fabriquer'] },
    { notion: 'procedes-fabrication', titre: 'Les machines', phrase: 'Pour chaque pièce, quelle machine faut-il choisir ?', generateurs: ['quel-procede', 'ajout-ou-retrait'] },
    { notion: 'securite-atelier', titre: 'Le panneau de sécurité', phrase: 'Avant de lancer la machine, quels gestes faut-il faire ?', generateurs: ['bon-geste', 'bon-ou-mauvais'] },
    { notion: 'prototype-fonction', titre: 'La petite lampe', phrase: 'Et si l’étagère s’éclairait toute seule, le soir ?', generateurs: ['quel-capteur', 'etape-suivante'] },
    { notion: 'simulation-test', titre: 'Le banc d’essai', phrase: 'Avant de charger l’étagère, comment l’essayer ?', generateurs: ['ordinateur-ou-reel', 'ecart-mesure'] },
  ],
});
