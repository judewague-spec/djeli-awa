/* Notion 17 du bloc SVT « Le vivant et son évolution » : les fossiles. Le coquillage dans la pierre de Moussa.
   S'en tient à la science du programme, sans jugement sur les croyances : consigne du 2 nov. 2026.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const FOSSILE = ['Un être vivant meurt', 'Il est recouvert de boue ou de sable', 'Les couches durcissent en roche', 'Ses restes deviennent de la pierre'];
  const BAS = 'La couche du bas', HAUT = 'La couche du haut';

  return {
    id: 'fossiles',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Les fossiles',
    classe: 'cycle 4',
    univers: ['dehors', 'champetre'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thèmes « La planète Terre » et « Le vivant et son évolution » : fossiles, couches de roches, évolution des espèces au cours des temps géologiques.',

    accroche: {
      texte: 'En creusant un puits près du champ, Moussa casse une pierre. Dedans, la forme parfaite d’un coquillage ! Pourtant, il n’y a pas de mer ici. ' +
        'Cette pierre raconte un monde très ancien. Comment la lire ?',
      image: { dessin: 'chaine', etapes: FOSSILE, description: 'Comment se forme un fossile : un être vivant meurt ; il est recouvert de boue ou de sable ; les couches durcissent en roche ; ses restes deviennent de la pierre.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Couche du haut : la plus récente', 'Couche du milieu', 'Couche du bas : la plus ancienne'], description: 'Trois couches de roche superposées : celle du haut est la plus récente, celle du bas est la plus ancienne.' },
      etapes: [
        'Un fossile, c’est le reste ou la trace d’un être vivant ancien, conservé dans la roche.',
        'Les couches de roche se déposent les unes sur les autres. Celles du bas sont donc en général les plus anciennes.',
        'En comparant les couches, on voit que les espèces changent : certaines apparaissent, d’autres disparaissent.',
        'Les espèces changent ainsi lentement, sur des millions d’années.',
      ],
    },

    decouverte: {
      texte: (c) => 'En cassant une roche, tu peux trouver ' + c.mot('fossile') + '. La roche s’empile en ' + c.mot('strates') + ' : en général, le bas est le plus ancien. ' +
        'D’une couche à l’autre, les espèces changent. ' +
        'L’astuce : lis les couches comme un carnet, de la plus ancienne, en bas, à la plus récente, en haut.',
    },

    vocabulaire: {
      termes: {
        fossile: { sesMots: 'une trace de vie dans la pierre', officiel: 'un fossile', lesDeux: 'une trace de vie dans la pierre, que les scientifiques appellent un fossile' },
        strates: { sesMots: 'couches', officiel: 'strates', lesDeux: 'couches, que les scientifiques appellent des strates' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la trace de vie dans la pierre, et les couches. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : un fossile, pour la trace de vie dans la pierre. Les couches sont des strates. Le lent changement des espèces est l’évolution.',
        'Tu connais les mots officiels : le fossile, la strate et l’évolution.',
      ],
    },

    exercices: [
      O.qcm('quelle-couche', 'dehors',
        [['Dans une falaise sans plis, quelle couche est la plus ancienne ?', BAS], ['Dans une falaise sans plis, quelle couche est la plus récente ?', HAUT], ['Un coquillage se trouve sous un poisson fossile, dans des couches sans plis. Où est le plus ancien ?', BAS]].map((v) => [v[0], v[1], 'Les couches se déposent les unes sur les autres : celles du bas sont les plus anciennes, celles du haut les plus récentes.']),
        (x) => x, [BAS, HAUT],
        'Les couches se déposent les unes sur les autres.'),
      {
        id: 'etape-suivante',
        univers: 'dehors',
        versions: [0, 1, 2],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = FOSSILE[i + 1];
          return {
            enonce: 'Dans la formation d’un fossile, que se passe-t-il juste après cette étape : « ' + FOSSILE[i] + ' » ?',
            reponse: O.choix(c.alea, bonne, FOSSILE.filter((_, k) => k !== i)),
            aide: 'D’abord être recouvert, ensuite durcir, enfin devenir pierre.',
            correction: ['L’ordre : ' + FOSSILE.join(', puis ').toLowerCase() + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'champetre',
        [['Un coquillage fossile dans un champ montre qu’il y a eu de l’eau ici.', 'Vrai'], ['Les espèces d’aujourd’hui ont toutes existé depuis le début de la vie.', 'Faux'], ['Certaines espèces fossiles ont complètement disparu.', 'Vrai'], ['Un fossile se forme en quelques jours.', 'Faux']].map((v) => [v[0], v[1], 'Un fossile marin montre que l’eau a été là. Il se forme en très longtemps, et il montre que des espèces ont changé ou disparu.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Les fossiles sont le témoin de millions d’années de changements.'),
      {
        id: 'duree-entre-fossiles',
        univers: 'dehors',
        // âges en millions d'années
        versions: [[230, 66], [500, 230], [400, 230], [150, 66], [300, 200], [100, 66]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un fossile a ' + a + ' millions d’années, un autre ' + b + ' millions d’années. Combien de millions d’années les séparent ?',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Calcule ' + a + ' − ' + b + '.',
            aideParlee: 'Fais la différence entre les deux âges.',
            correction: [a + ' − ' + b + ' = ' + (a - b) + ' millions d’années.'],
          };
        },
      },
      {
        id: 'hauteur-de-roche',
        univers: 'dehors',
        // [strates, épaisseur d'une strate en mètres]
        versions: [[12, 3], [8, 5], [15, 2], [6, 7], [20, 4], [10, 9]],
        genere(c) {
          const [n, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une falaise contient ' + n + ' strates de ' + e + ' m chacune. Quelle est la hauteur totale, en mètres ?',
            reponse: { type: 'nombre', valeur: n * e },
            aide: 'Calcule ' + n + ' × ' + e + '.',
            aideParlee: 'Multiplie le nombre de strates par leur épaisseur.',
            correction: [n + ' × ' + e + ' = ' + n * e + ' m.'],
          };
        },
      },
    ],

    defi: {
      // [âge de la strate du bas, du milieu, du haut, en millions d'années]
      versions: [[400, 230, 66], [500, 300, 100], [450, 200, 66], [350, 150, 50]],
      genere(c) {
        const [a, b, h] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : une falaise sans plis montre trois strates. En bas, des coquillages marins (' + a + ' millions d’années). Au milieu, des poissons (' + b + ' millions d’années). En haut, des reptiles (' + h + ' millions d’années).',
          image: { dessin: 'chaine', etapes: ['Haut : reptiles', 'Milieu : poissons', 'Bas : coquillages marins'], description: 'Trois strates, de haut en bas : des reptiles, des poissons, puis des coquillages marins.' },
          questions: [
            {
              texte: 'Question 1. Combien de millions d’années séparent la strate du bas de celle du haut ?',
              reponse: { type: 'nombre', valeur: a - h },
              aide: 'Fais la différence entre les deux âges.',
              correction: [a + ' − ' + h + ' = ' + (a - h) + ' millions d’années.'],
            },
            {
              texte: 'Question 2. Quels fossiles sont les plus anciens ?',
              reponse: O.choix(c.alea, 'Les coquillages marins', ['Les coquillages marins', 'Les poissons', 'Les reptiles']),
              aide: 'Les couches du bas se sont déposées en premier.',
              correction: ['Ils sont dans la strate du bas.', 'Réponse : Les coquillages marins.'],
            },
            {
              texte: 'Question 3. Que nous apprend cette falaise sur l’histoire du vivant ? Rédige ta réponse.',
              correction: ['Les êtres vivants n’ont pas toujours été les mêmes : les espèces changent au cours du temps.', 'Les fossiles montrent cette évolution, couche après couche.'],
              grille: ['As-tu dit que les espèces changent au cours du temps ?', 'As-tu utilisé l’ordre des couches ?', 'As-tu cité l’évolution ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais lire une falaise, couche après couche, comme un carnet de la vie.',
    carte: ['quelle-couche', 'etape-suivante', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['duree-entre-fossiles', 'hauteur-de-roche'], defi: true },
    automatismes: [
      {
        id: 'couche-rapide',
        versions: [['la plus ancienne', BAS], ['la plus récente', HAUT]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Sans plis, quelle est la couche ' + d + ' ?', reponse: O.choix(c.alea, b, [BAS, HAUT]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Tchad, en 2001, une équipe a trouvé Toumaï, un crâne vieux de 6 à 7 millions d’années.',
    prenoms: ['Moussa'],
  };
});
