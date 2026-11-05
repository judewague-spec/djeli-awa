/* Notion 9 du bloc « L'électricité » : l'énergie électrique. La lampe et le fer à repasser d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;

  return {
    id: 'energie-electrique',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'L’énergie électrique',
    classe: '3e',
    univers: ['appareils', 'famille', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : énergie électrique, relation E = P × t, joule et wattheure.',

    accroche: {
      texte: 'Aminata se demande ce qui coûte le plus. Son fer à repasser, très puissant, utilisé 30 minutes ? Ou sa petite lampe, restée allumée toute la nuit ? ' +
        'La puissance ne suffit pas pour répondre. Il faut aussi savoir combien de temps l’appareil a marché.',
      image: { dessin: 'chaine', etapes: ['Puissance de l’appareil', 'Durée de fonctionnement', 'Énergie : puissance × durée'], description: 'La puissance de l’appareil, multipliée par la durée de fonctionnement, donne l’énergie.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Fer de 1 000 W pendant 30 minutes : 500 Wh', 'Lampe de 10 W pendant 8 heures : 80 Wh'], description: 'Le fer de 1 000 watts pendant 30 minutes utilise 500 wattheures. La lampe de 10 watts pendant 8 heures utilise 80 wattheures.' },
      etapes: [
        'L’énergie utilisée par un appareil dépend de sa puissance et de sa durée : E = P × t.',
        'Si P est en watts et t en heures, E est en wattheures, de symbole Wh.',
        'Si P est en watts et t en secondes, E est en joules, de symbole J. 1 Wh = 3 600 J.',
        'Un fer de 1 000 W pendant 2 heures : 1 000 × 2 = 2 000 Wh. Une lampe de 10 W pendant 8 heures : 10 × 8 = 80 Wh.',
        'Attention aux durées en minutes : 30 minutes, c’est 0,5 heure.',
      ],
    },

    decouverte: {
      texte: (c) => 'La puissance fois la durée donne ' + c.mot('energie') + '. E égale P fois t. ' +
        'En watts et en heures, cela donne ' + c.mot('wattheures') + '. ' +
        'L’astuce : un petit appareil allumé très longtemps peut utiliser beaucoup, lui aussi.',
    },

    vocabulaire: {
      termes: {
        energie: { sesMots: 'ce que l’appareil a utilisé', officiel: 'l’énergie électrique', lesDeux: 'ce que l’appareil a utilisé, que les physiciens appellent l’énergie électrique' },
        wattheures: { sesMots: 'des watts multipliés par des heures', officiel: 'des wattheures', lesDeux: 'des watts multipliés par des heures, que les physiciens appellent des wattheures' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce que l’appareil a utilisé, et des watts multipliés par des heures. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : l’énergie électrique, notée E, en wattheures ou en joules. E égale P fois t.',
        'Tu connais les mots officiels : l’énergie électrique, le wattheure et le joule.',
      ],
    },

    exercices: [
      {
        id: 'en-wattheures',
        univers: 'appareils',
        // [P en W, t en h]
        versions: [[100, 3], [60, 5], [1000, 2], [10, 8], [2000, 0.5], [500, 4]],
        genere(c) {
          const [p, t] = c.alea.choisir(this.versions);
          const e = p * t;
          return {
            enonce: 'Un appareil de ' + p + ' W fonctionne pendant ' + ecr(t) + ' heure' + (t > 1 ? 's' : '') + '. Quelle énergie utilise-t-il, en wattheures ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Calcule ' + p + ' × ' + ecr(t) + '.',
            aideParlee: 'Multiplie la puissance par la durée en heures.',
            correction: ['E = P × t = ' + p + ' × ' + ecr(t) + ' = ' + e + ' Wh.'],
          };
        },
      },
      {
        id: 'en-joules',
        univers: 'maison-courses',
        // [P en W, t en s]
        versions: [[100, 60], [50, 10], [20, 30], [10, 100], [1000, 5]],
        genere(c) {
          const [p, t] = c.alea.choisir(this.versions);
          const e = p * t;
          return {
            enonce: 'Un appareil de ' + p + ' W fonctionne pendant ' + t + ' secondes. Quelle énergie utilise-t-il, en joules ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Calcule ' + p + ' × ' + t + '.',
            aideParlee: 'Multiplie la puissance par la durée en secondes.',
            correction: ['E = ' + p + ' × ' + t + ' = ' + e + ' J.'],
          };
        },
      },
      {
        id: 'minutes-en-heures',
        univers: 'famille',
        // [P en W, durée en minutes]
        versions: [[1000, 30], [2000, 15], [1200, 30], [600, 20], [1500, 10], [900, 40]],
        genere(c) {
          const [p, m] = c.alea.choisir(this.versions);
          const e = Math.round((p * m) / 60);
          return {
            enonce: 'Le fer à repasser de ' + p + ' W d’Aminata marche ' + m + ' minutes. Quelle énergie utilise-t-il, en wattheures ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Écris la durée en heures : ' + m + ' ÷ 60.',
            aideParlee: 'Écris d’abord la durée en heures, puis multiplie par la puissance.',
            correction: [m + ' minutes = ' + m + ' ÷ 60 heure.', p + ' × ' + m + ' ÷ 60 = ' + e + ' Wh.'],
          };
        },
      },
      {
        id: 'wh-en-joules',
        univers: 'appareils',
        versions: [1, 2, 5, 10, 3, 4],
        genere(c) {
          const w = c.alea.choisir(this.versions);
          return {
            enonce: 'On sait que 1 Wh = 3 600 J. Combien font ' + w + ' Wh en joules ?',
            reponse: { type: 'nombre', valeur: w * 3600 },
            aide: 'Calcule ' + w + ' × 3 600.',
            aideParlee: 'Multiplie par trois mille six cents.',
            correction: [w + ' × 3 600 = ' + w * 3600 + ' J.'],
          };
        },
      },
      {
        id: 'qui-utilise-le-plus',
        univers: 'famille',
        // [P1, t1, P2, t2]
        versions: [[1000, 1, 10, 8], [60, 10, 1000, 1], [2000, 0.5, 100, 5], [20, 10, 500, 1], [10, 24, 200, 2]],
        genere(c) {
          const [a, s, b, t] = c.alea.choisir(this.versions);
          const e1 = a * s, e2 = b * t;
          const egal = e1 === e2;
          const bonne = egal ? 'Les deux utilisent autant d’énergie' : e1 > e2 ? 'Le premier appareil' : 'Le second appareil';
          return {
            enonce: 'Le premier appareil a ' + a + ' W et marche ' + ecr(s) + ' h. Le second a ' + b + ' W et marche ' + ecr(t) + ' h. Lequel utilise le plus d’énergie ?',
            reponse: O.choix(c.alea, bonne, ['Le premier appareil', 'Le second appareil', 'Les deux utilisent autant d’énergie']),
            aide: 'Calcule l’énergie de chaque appareil.',
            correction: [a + ' × ' + ecr(s) + ' = ' + e1 + ' Wh ; ' + b + ' × ' + ecr(t) + ' = ' + e2 + ' Wh.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [P fer, minutes par jour, P lampe, heures par jour]
      versions: [[1200, 30, 10, 8], [1000, 30, 20, 10], [1500, 20, 60, 5], [900, 40, 10, 24]],
      genere(c) {
        const [p, m, l, h] = c.alea.choisir(this.versions);
        const eF = Math.round((p * m) / 60), eL = l * h;
        return {
          enonce: 'Chaque jour, Aminata utilise un fer de ' + p + ' W pendant ' + m + ' minutes, et une lampe de ' + l + ' W pendant ' + h + ' heures.',
          questions: [
            {
              texte: 'Question 1. Quelle énergie utilise le fer en un jour, en wattheures ?',
              reponse: { type: 'nombre', valeur: eF },
              aide: 'Écris la durée en heures, puis multiplie par la puissance.',
              correction: [p + ' × ' + m + ' ÷ 60 = ' + eF + ' Wh.'],
            },
            {
              texte: 'Question 2. Quelle énergie utilise la lampe en un jour, en wattheures ?',
              reponse: { type: 'nombre', valeur: eL },
              aide: 'Multiplie la puissance par la durée en heures.',
              correction: [l + ' × ' + h + ' = ' + eL + ' Wh.'],
            },
            {
              texte: 'Question 3. Quel appareil utilise le plus d’énergie ? La puissance suffit-elle pour le dire ? Explique.',
              correction: ['Le fer utilise ' + eF + ' Wh et la lampe ' + eL + ' Wh.', 'La puissance ne suffit pas : l’énergie dépend aussi de la durée.'],
              grille: ['As-tu comparé les deux énergies ?', 'As-tu parlé de la durée ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! La puissance et la durée, multipliées : tu sais ce que tes appareils utilisent vraiment.',
    carte: ['en-wattheures', 'minutes-en-heures', 'qui-utilise-le-plus'],
    papierDuSoir: { exercices: ['minutes-en-heures', 'qui-utilise-le-plus'], defi: true },
    automatismes: [
      {
        id: 'p-fois-t',
        versions: [[100, 3], [60, 5], [10, 8], [500, 4]],
        genere(c) { const [p, t] = c.alea.choisir(this.versions); return { enonce: p + ' × ' + t + ' = ?', reponse: { type: 'nombre', valeur: p * t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, le barrage de Lom Pangar a été construit pour réguler le fleuve Sanaga. Les centrales d’Édéa et de Song Loulou devaient ainsi produire davantage.',
    prenoms: ['Aminata'],
  };
});
