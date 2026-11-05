/* Notion 2 du bloc de technologie « Concevoir et fabriquer » : la revue de projet. Le coffre à outils de l’atelier.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const pl = (n, mot) => O.ecr(n) + ' ' + mot + (n < 2 ? '' : 's');

  return {
    id: 'revue-projet',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'La revue de projet',
    classe: '4e',
    univers: ['appareils', 'commerce', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : suivre un projet, point d’étape, retard, décision, compte rendu.',

    accroche: {
      texte: 'Vendredi, Rachel fait le point avec Moussa. Ils fabriquent un coffre à outils pour Laure. ' +
        'Ce vendredi, deux planches ne sont pas encore coupées. Moussa dit : « On a du retard. » Que faire maintenant ?',
      image: { dessin: 'chaine', etapes: ['Ce qui était prévu', 'Ce qui est fait', 'Ce qu’on décide'], description: 'Le point du vendredi : ce qui était prévu, ce qui est fait, puis ce que Rachel et Moussa décident.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Regarder le prévu', 'Regarder le fait', 'Décider', 'Écrire une note'], description: 'Les quatre gestes du vendredi : regarder le prévu, regarder le fait, décider, écrire une note.' },
      etapes: [
        'Rachel regarde ce qui était prévu pour ce vendredi : toutes les planches coupées.',
        'Elle regarde ce qui est vraiment fait. Il manque deux planches : le projet est en retard.',
        'Moussa propose de passer un après-midi de plus à scier. Rachel est d’accord.',
        'Ils écrivent une petite note : ce qu’ils ont vu, ce qu’ils ont décidé, et qui fait quoi.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le point que Rachel et Moussa font le vendredi : c’est ' + c.mot('revue') + '. ' +
        'Regarde les deux planches en retard : c’est ' + c.mot('ecart') + '. ' +
        'Regarde la feuille que Rachel remplit à la fin : c’est ' + c.mot('cr') + '. ' +
        'L’astuce : on compare le prévu et le fait, on décide, puis on écrit la décision.',
    },

    vocabulaire: {
      termes: {
        revue: { sesMots: 'un rendez-vous pour regarder où en est le projet', officiel: 'une revue de projet', lesDeux: 'un rendez-vous pour regarder où en est le projet, que les techniciens appellent une revue de projet' },
        ecart: { sesMots: 'la différence entre le prévu et le fait', officiel: 'un écart', lesDeux: 'la différence entre le prévu et le fait, que les techniciens appellent un écart' },
        cr: { sesMots: 'la note qui garde les décisions', officiel: 'le compte rendu', lesDeux: 'la note qui garde les décisions, que les techniciens appellent le compte rendu' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un rendez-vous pour regarder où en est le projet. Garde aussi la différence entre le prévu et le fait, et la petite note. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : une revue de projet, un écart, le compte rendu. Une revue de projet est un rendez-vous pour faire le point. ' +
          'Un écart est la différence entre le prévu et le fait. Le compte rendu garde ce qui a été décidé.',
        'Tu connais les mots officiels : une revue de projet, un écart, et le compte rendu. Avec eux, tu suis un projet sans le perdre de vue.',
      ],
    },

    exercices: [
      {
        id: 'jours-de-retard',
        univers: 'appareils',
        // [jours prévus pour scier, jours réellement passés]
        versions: [[3, 5], [2, 4], [4, 5], [1, 3], [5, 8]],
        genere(c) {
          const [p, r] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa devait scier les planches en ' + pl(p, 'jour') + '. Il y a passé ' + pl(r, 'jour') + '. Combien de jours de retard a-t-il ?',
            reponse: { type: 'nombre', valeur: r - p },
            aide: 'Soustrais la durée prévue à la durée réelle.',
            correction: [r + ' − ' + p + ' = ' + (r - p) + (r - p < 2 ? ' jour' : ' jours') + ' de retard.'],
          };
        },
      },
      {
        id: 'part-faite',
        univers: 'commerce',
        // [tâches prévues, tâches terminées]
        versions: [[10, 4], [20, 15], [8, 2], [5, 3], [4, 3]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          const pc = (100 * k) / n;
          return {
            enonce: 'Le coffre à outils compte ' + n + ' tâches. À la revue de projet, ' + k + ' sont terminées. Quel pourcentage des tâches est terminé ?',
            reponse: { type: 'nombre', valeur: pc },
            aide: 'Divise les tâches terminées par les tâches prévues, puis multiplie par 100.',
            correction: [k + ' ÷ ' + n + ' = ' + O.ecr(k / n) + '.', O.ecr(k / n) + ' × 100 = ' + O.ecr(pc) + ' %.'],
          };
        },
      },
      {
        id: 'quelle-decision',
        univers: 'famille',
        // [situation, bonne décision, deux mauvaises décisions]
        versions: [
          ['Le projet a 2 jours de retard, mais il reste 3 jours de marge avant la date de Laure.', 'Continuer, et noter ce retard dans le compte rendu', ['Annuler tout le projet', 'Cacher le retard à Laure']],
          ['Une planche est mal coupée. En racheter une fait perdre 2 jours.', 'Noter le retard, prévenir Laure et refaire le planning', ['Ne rien dire et continuer comme prévu', 'Peindre sans cette planche']],
          ['Rachel et Moussa ont fini une tâche avec 1 jour d’avance.', 'Noter l’avance et avancer la tâche suivante', ['Effacer les dates du planning', 'Arrêter de travailler pendant 1 jour']],
          ['Le magasin n’a plus de vis. Le planning ne laisse que 2 jours de marge.', 'Chercher une autre solution et prévenir Laure du risque', ['Attendre sans prévenir personne', 'Supprimer la tâche de montage']],
        ],
        genere(c) {
          const [s, bonne, autres] = c.alea.choisir(this.versions);
          return {
            enonce: 'À la revue de projet : ' + s + ' Quelle décision est la bonne ?',
            reponse: O.choix(c.alea, bonne, autres),
            aide: 'Une bonne décision tient compte de l’écart et en parle à ceux qui attendent le travail.',
            correction: ['Après un écart, on décide ce qui aide le projet, et on l’écrit dans le compte rendu.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'nouvelle-date',
        univers: 'appareils',
        // [jour de fin prévu, jours de retard de la tâche 2, jours de retard de la tâche 3]
        versions: [[12, 2, 1], [10, 1, 3], [15, 2, 2], [9, 1, 1], [20, 3, 2]],
        genere(c) {
          const [d, a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le projet devait finir au jour ' + d + '. La tâche 2 a pris ' + pl(a, 'jour') + ' de retard, puis la tâche 3 en a pris ' + b + '. Les tâches se suivent et rien n’est rattrapé. À quel jour le projet finira-t-il ?',
            reponse: { type: 'nombre', valeur: d + a + b },
            aide: 'Ajoute les deux retards au jour de fin prévu.',
            correction: [d + ' + ' + a + ' + ' + b + ' = ' + (d + a + b) + '.', 'Le projet finira au jour ' + (d + a + b) + '.'],
          };
        },
      },
      {
        id: 'jours-restants',
        univers: 'appareils',
        // [tâches restantes, heures par tâche, heures de travail par jour pour les deux]
        versions: [[4, 3, 4], [5, 4, 10], [3, 6, 9], [8, 3, 6], [5, 6, 10]],
        genere(c) {
          const [k, h, j] = c.alea.choisir(this.versions);
          const total = k * h;
          return {
            enonce: 'Il reste ' + k + ' tâches. Chaque tâche demande ' + pl(h, 'heure') + ' de travail. À deux, Rachel et Moussa travaillent ' + pl(j, 'heure') + ' par jour en tout. Combien de jours complets leur faut-il ?',
            reponse: { type: 'nombre', valeur: total / j },
            aide: 'Calcule d’abord toutes les heures de travail, puis divise par les heures d’un jour.',
            correction: [k + ' × ' + h + ' = ' + total + ' heures de travail.', total + ' ÷ ' + j + ' = ' + total / j + (total / j < 2 ? ' jour.' : ' jours.')],
          };
        },
      },
    ],

    defi: {
      // [tâches prévues à la revue, tâches terminées, jours par tâche, jour de fin prévu]
      versions: [[4, 3, 2, 12], [5, 3, 2, 15], [3, 1, 3, 14], [6, 5, 1, 10], [5, 2, 1, 13]],
      genere(c) {
        const [k, f, t, fin] = c.alea.choisir(this.versions);
        const m = k - f;
        const jours = (n) => n + (n < 2 ? ' jour' : ' jours');
        return {
          enonce: 'Rachel et Moussa fabriquent le coffre à outils. À la revue de projet, le planning prévoit ' + k + ' tâches terminées, et seulement ' + (f > 1 ? f + ' le sont' : '1 l’est') + '. ' +
            'Chaque tâche dure ' + pl(t, 'jour') + '. Le projet devait finir au jour ' + fin + '. Le retard n’est pas rattrapé.',
          questions: [
            {
              texte: 'Question 1. Combien de tâches sont en retard ?',
              reponse: { type: 'nombre', valeur: m },
              aide: 'Soustrais les tâches terminées aux tâches prévues.',
              correction: [k + ' − ' + f + ' = ' + m + (m < 2 ? ' tâche.' : ' tâches.')],
            },
            {
              texte: 'Question 2. Combien de jours de retard cela fait-il ?',
              reponse: { type: 'nombre', valeur: m * t },
              aide: 'Multiplie les tâches en retard par la durée d’une tâche.',
              correction: [m + ' × ' + t + ' = ' + m * t + (m * t < 2 ? ' jour' : ' jours') + ' de retard.'],
            },
            {
              texte: 'Question 3. À quel jour le projet finira-t-il ?',
              reponse: { type: 'nombre', valeur: fin + m * t },
              aide: 'Ajoute le retard au jour de fin prévu.',
              correction: [fin + ' + ' + m * t + ' = ' + (fin + m * t) + '.', 'Le projet finira au jour ' + (fin + m * t) + ' (au lieu du jour ' + fin + ').'],
            },
            {
              texte: 'Question 4. Écris le compte rendu en trois phrases : où en est le projet, quel est le retard, et quelle décision tu proposes.',
              correction: ['Une phrase dit où en est le projet.', 'Une phrase donne le retard, avec son nombre de jours.', 'Une phrase propose une décision, par exemple travailler plus longtemps ou prévenir Laure.'],
              grille: ['As-tu dit où en est le projet ?', 'As-tu donné le retard en jours ?', 'As-tu proposé une décision ?', 'Tes phrases sont-elles courtes et claires ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais faire le point sur un projet, mesurer un retard, décider et garder une trace écrite.',
    carte: ['jours-de-retard', 'quelle-decision', 'nouvelle-date'],
    papierDuSoir: { exercices: ['jours-de-retard', 'nouvelle-date', 'jours-restants'], defi: true },
    automatismes: [
      {
        id: 'retard-rapide',
        versions: [[3, 5], [2, 6], [4, 5], [5, 9]],
        genere(c) { const [p, r] = c.alea.choisir(this.versions); return { enonce: 'Prévu : ' + p + ' jours. Réel : ' + r + ' jours. Combien de jours de retard ?', reponse: { type: 'nombre', valeur: r - p } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, une équipe de l’université de Nairobi a remis le premier satellite du pays à l’agence japonaise en janvier 2018.',
    prenoms: ['Rachel', 'Moussa', 'Laure'],
  };
});
