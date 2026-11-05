/* Notion 7 du bloc physique-chimie « La matière » : la conservation de la masse. La balance de Rachel. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;

  return {
    id: 'conservation-masse',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'La conservation de la masse',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'maison-courses', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : conservation de la masse.',

    accroche: {
      texte: 'Rachel pose sur la balance un verre d’eau et un petit sachet de sucre, à côté : la balance affiche 250 g. ' +
        'Elle verse le sucre dans l’eau, remue, et repose le sachet vide sur la balance. Le sucre a disparu… La balance va-t-elle afficher moins ?',
      image: { dessin: 'balance', gauche: 'avant', droite: 'après', masseG: 250, masseD: 250, description: 'Une balance équilibrée : le verre et le sucre avant, puis l’eau sucrée après, ont la même masse, 250 g.' },
    },

    manipulation: {
      image: { dessin: 'balance', gauche: 'avant', droite: 'après', masseG: 250, masseD: 250, description: 'Avant et après la dissolution, la balance reste équilibrée.' },
      etapes: [
        'Avant : le verre d’eau et le sucre pèsent 250 g ensemble.',
        'Après la dissolution, la balance affiche toujours 250 g. Le sucre est invisible, mais ses particules sont dans l’eau.',
        'Même chose quand la glace fond : un glaçon de 30 g donne 30 g d’eau.',
        'Attention au piège : si un gaz s’échappe d’un récipient ouvert, la balance baisse. Le gaz est parti dans l’air, avec sa masse.',
      ],
    },

    decouverte: {
      texte: (c) => 'Avant et après, la balance affiche la même masse : c’est ' + c.mot('conservation') + '. Pendant une dissolution, un changement d’état, et même quand de nouvelles matières se forment, ' +
        'la masse totale reste la même, à condition que rien n’entre ni ne sorte. ' +
        'L’astuce : quand une balance baisse, cherche le gaz qui s’est échappé.',
    },

    vocabulaire: {
      termes: {
        conservation: { sesMots: 'la règle du « rien ne se perd »', officiel: 'la conservation de la masse', lesDeux: 'la règle du « rien ne se perd », que les scientifiques appellent la conservation de la masse' },
      },
      textes: [
        'Pour l’instant, garde tes mots : c’est la règle du « rien ne se perd ». La masse d’avant est la masse d’après, si rien ne s’échappe. ' +
          'Les scientifiques ont un nom pour cette règle : je te le dirai la prochaine fois.',
        'Les scientifiques disent : la conservation de la masse. Notre règle du « rien ne se perd », c’est elle.',
        'Tu connais le mot officiel : la conservation de la masse. Dans un récipient fermé, la masse totale ne change pas.',
      ],
    },

    exercices: [
      {
        id: 'dissolution',
        univers: 'cuisine-restaurant',
        versions: [[200, 20], [250, 15], [300, 40], [180, 12], [500, 50], [150, 30]],
        genere(c) {
          const [e, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure dissout ' + s + ' g de sel dans ' + e + ' g d’eau pour cuire le riz. Quelle est la masse de l’eau salée, en grammes ?',
            reponse: { type: 'nombre', valeur: e + s },
            aide: 'La masse se conserve : additionne.',
            correction: [e + ' + ' + s + ' = ' + (e + s) + ' g.'],
          };
        },
      },
      {
        id: 'fonte',
        univers: 'famille',
        versions: [35, 120, 80, 250, 15, 400],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa pèse un bac à glaçons fermé : la glace seule pèse ' + m + ' g. Il la laisse fondre sans ouvrir le bac. Quelle masse d’eau liquide trouve-t-il, en grammes ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Pendant un changement d’état, la masse ne change pas.',
            correction: ['La masse se conserve : ' + m + ' g.'],
          };
        },
      },
      {
        id: 'flacon-ferme',
        univers: 'maison-courses',
        // [masse du flacon fermé avec vinaigre et bicarbonate, en g]
        versions: [312, 280, 455, 198, 367, 520],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          return {
            enonce: 'Aminata met du vinaigre et du bicarbonate dans une bouteille, et la ferme avec un ballon. Avant la réaction, l’ensemble pèse ' + m + ' g. ' +
              'Ça mousse, le ballon gonfle. Combien pèse l’ensemble après, en grammes ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Rien n’est sorti : le gaz est resté dans le ballon.',
            correction: ['Le récipient est fermé : la masse se conserve.', 'L’ensemble pèse toujours ' + m + ' g.'],
          };
        },
      },
      {
        id: 'verre-ouvert',
        univers: 'maison-courses',
        // [masse avant, masse après] dans un verre ouvert
        versions: [[245, 241], [310, 305], [198, 195], [420, 412], [275, 272], [360, 354]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un verre ouvert posé sur la balance, Rebecca mélange vinaigre et bicarbonate. La balance passe de ' + a + ' g à ' + b + ' g. Quelle masse de gaz, en grammes, s’est échappée ?',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Calcule ' + a + ' − ' + b + '.',
            aideParlee: 'Le gaz parti dans l’air a emporté sa masse : fais la différence.',
            correction: [a + ' − ' + b + ' = ' + (a - b) + ' g de gaz se sont échappés dans l’air.'],
          };
        },
      },
      {
        id: 'masse-manquante',
        univers: 'cuisine-restaurant',
        // [masse du réactif A, masse du réactif B, masse du produit C] ; on cherche le produit D
        versions: [[12, 32, 30], [10, 40, 25], [20, 16, 9], [56, 32, 60], [6, 16, 4], [30, 30, 41]],
        genere(c) {
          const [a, b, p] = c.alea.choisir(this.versions);
          const d = a + b - p;
          return {
            enonce: 'Dans un récipient fermé, ' + a + ' g d’un premier corps réagissent avec ' + b + ' g d’un second. Il se forme ' + p + ' g d’un produit, et un autre produit. Quelle est la masse de l’autre produit, en grammes ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Masse avant = masse après : ' + a + ' + ' + b + ' = ' + p + ' + ?',
            aideParlee: 'La masse de ce qui réagit est égale à la masse de ce qui se forme.',
            correction: ['Masse avant : ' + a + ' + ' + b + ' = ' + (a + b) + ' g.', (a + b) + ' − ' + p + ' = ' + d + ' g.'],
          };
        },
      },
    ],

    defi: {
      // [masse avant en g, masse après dans le verre ouvert]
      versions: [[350, 344], [420, 415], [280, 276], [510, 502], [300, 297], [460, 452]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Laure verse du vinaigre sur du bicarbonate dans un verre ouvert posé sur une balance : ' + a + ' g au départ. Une mousse apparaît. ' +
            'À la fin, la balance affiche ' + b + ' g. Puis elle recommence dans une bouteille fermée par un ballon.',
          image: { dessin: 'balance', gauche: 'avant', droite: 'après', masseG: a, masseD: b, description: 'Une balance qui penche du côté de l’avant : ' + a + ' g avant, ' + b + ' g après.' },
          questions: [
            {
              texte: 'Question 1. Dans le verre ouvert, quelle masse, en grammes, a « disparu » ?',
              reponse: { type: 'nombre', valeur: a - b },
              aide: 'Fais la différence entre avant et après.',
              correction: [a + ' − ' + b + ' = ' + (a - b) + ' g.'],
            },
            {
              texte: 'Question 2. Dans la bouteille fermée, avec ' + a + ' g au départ, que va afficher la balance à la fin, en grammes ?',
              reponse: { type: 'nombre', valeur: a },
              aide: 'Dans un récipient fermé, rien ne sort.',
              correction: ['Le gaz reste dans le ballon : la balance affiche ' + a + ' g.'],
            },
            {
              texte: 'Question 3. Explique où est passée la masse « disparue » du verre ouvert.',
              correction: ['La réaction produit un gaz, le dioxyde de carbone.', 'Dans le verre ouvert, ce gaz part dans l’air avec sa masse : la balance baisse. La masse totale, elle, est conservée.'],
              grille: ['As-tu parlé du gaz produit par la réaction ?', 'As-tu dit qu’il s’échappe dans l’air ?', 'As-tu dit que la masse totale se conserve ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Rien ne se perd : tu sais retrouver la masse, même celle d’un gaz qui s’échappe.',
    carte: ['dissolution', 'flacon-ferme', 'verre-ouvert'],
    papierDuSoir: { exercices: ['verre-ouvert', 'masse-manquante'], defi: true },
    automatismes: [
      {
        id: 'somme-de-masses',
        versions: [[100, 25], [250, 50], [80, 20], [300, 45]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' g d’eau + ' + b + ' g de sucre dissous = ? g', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le chimiste français Antoine Lavoisier a montré qu’au cours d’une transformation, la masse totale ne change pas.',
    prenoms: ['Rachel', 'Laure', 'Moussa', 'Aminata', 'Rebecca'],
  };
});
