/* Notion 1 du bloc « L'énergie » : joule et kilowattheure. La facture de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  // Un nombre écrit avec des espaces entre les milliers et une virgule : 3 600 000, 0,3.
  const gr = (x) => { const [a, b] = String(x).split('.'); return a.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (b ? ',' + b : ''); };
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'unites-energie',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'Joule et kilowattheure',
    classe: 'cycle 4',
    univers: ['maison-courses', 'appareils', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : unités de l’énergie, joule et kilowattheure, relation E = P × t.',

    accroche: {
      texte: 'Laure lit sa facture d’électricité. Elle y voit des kilowattheures. Rachel, à l’école, a appris les joules. ' +
        'Les deux unités mesurent la même chose : l’énergie. Mais elles n’ont pas la même taille.',
      image: { dessin: 'chaine', etapes: ['Facture : kilowattheures (kWh)', 'École : joules (J)', 'Même grandeur : l’énergie'], description: 'La facture compte en kilowattheures, l’école en joules. Les deux unités mesurent la même grandeur : l’énergie.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['1 kWh = 1 000 Wh', '1 Wh = 3 600 J', '1 kWh = 3 600 000 J'], description: 'Un kilowattheure vaut mille wattheures. Un wattheure vaut trois mille six cents joules. Un kilowattheure vaut donc trois millions six cent mille joules.' },
      etapes: [
        'Sur une facture, l’énergie est en kilowattheures, de symbole kWh. Un kilowattheure, c’est 1 000 wattheures.',
        'Un wattheure, c’est 1 watt pendant 1 heure, soit 3 600 secondes. Donc 1 Wh = 3 600 J.',
        'Un kilowattheure vaut donc 1 000 × 3 600 J, soit 3 600 000 J.',
        'Pour passer des kilowattheures aux joules, tu multiplies par 3 600 000. Pour revenir, tu divises.',
        'Avec E = P × t, si P est en watts et t en secondes, E est en joules.',
        'Si P est en kilowatts et t en heures, E est en kilowattheures.',
      ],
    },

    decouverte: {
      texte: (c) => 'Sur la facture de Laure, l’énergie se compte avec ' + c.mot('kwh') + '. ' +
        'Pour les petites quantités, on compte avec ' + c.mot('joule') + '. ' +
        'La première unité vaut 3 600 000 fois la petite unité. ' +
        'Pour aller vers la petite unité, tu multiplies. Pour revenir vers la grande, tu divises. ' +
        'L’astuce : un wattheure, c’est 3 600 fois ' + c.mot('joule') + '.',
    },

    vocabulaire: {
      termes: {
        kwh: { sesMots: 'mille wattheures d’un coup', officiel: 'le kilowattheure', lesDeux: 'mille wattheures d’un coup, que les physiciens appellent le kilowattheure' },
        joule: { sesMots: 'une minuscule part d’énergie', officiel: 'le joule', lesDeux: 'une minuscule part d’énergie, que les physiciens appellent le joule' },
      },
      textes: [
        'Pour l’instant, garde tes mots : mille wattheures d’un coup, et une minuscule part d’énergie. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : le kilowattheure, de symbole kWh, et le joule, de symbole J. Un kilowattheure vaut 3 600 000 joules.',
        'Tu connais les mots officiels : le kilowattheure, le joule et le wattheure.',
      ],
    },

    exercices: [
      {
        id: 'wh-en-joules',
        univers: 'maison-courses',
        // énergie en Wh
        versions: [1, 2, 5, 10, 20, 25],
        genere(c) {
          const w = c.alea.choisir(this.versions);
          const j = w * 3600;
          return {
            enonce: 'Une lampe a utilisé ' + w + ' Wh. On sait que 1 Wh = 3 600 J. Combien cela fait-il en joules ?',
            reponse: { type: 'nombre', valeur: j },
            aide: 'Multiplie ' + w + ' par 3 600.',
            aideParlee: 'Pour aller vers la petite unité, multiplie.',
            correction: [w + ' × 3 600 = ' + j + ' J.'],
          };
        },
      },
      {
        id: 'joules-en-kwh',
        univers: 'appareils',
        // énergie en joules
        versions: [3600000, 7200000, 10800000, 1800000, 18000000, 14400000],
        genere(c) {
          const j = c.alea.choisir(this.versions);
          const k = j / 3600000;
          return {
            enonce: 'Un appareil a utilisé ' + gr(j) + ' J. On sait que 1 kWh = 3 600 000 J. Combien cela fait-il en kilowattheures ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Divise ' + gr(j) + ' par 3 600 000.',
            aideParlee: 'Pour revenir vers la grande unité, divise.',
            correction: [gr(j) + ' ÷ 3 600 000 = ' + ecr(k) + ' kWh.'],
          };
        },
      },
      {
        id: 'appareil-en-kwh',
        univers: 'appareils',
        // [P en W, t en h]
        versions: [[2000, 3], [1000, 2], [500, 4], [100, 10], [60, 5], [1500, 2]],
        genere(c) {
          const [p, t] = c.alea.choisir(this.versions);
          const wh = p * t, k = wh / 1000;
          return {
            enonce: 'Un appareil de ' + p + ' W fonctionne pendant ' + t + ' heures. Quelle énergie utilise-t-il, en kilowattheures ? On utilise E = P × t, avec P en watts et t en heures.',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Calcule d’abord P × t en wattheures, puis divise par 1 000.',
            aideParlee: 'Calcule d’abord en wattheures, puis divise par mille.',
            correction: ['E = P × t = ' + p + ' × ' + t + ' = ' + gr(wh) + ' Wh.', gr(wh) + ' ÷ 1 000 = ' + ecr(k) + ' kWh.'],
          };
        },
      },
      {
        id: 'cout-facture',
        univers: 'maison-courses',
        // [kWh utilisés, prix du kWh en euros]
        versions: [[10, 0.2], [5, 0.2], [20, 0.25], [8, 0.25], [30, 0.2], [12, 0.25]],
        genere(c) {
          const [k, prix] = c.alea.choisir(this.versions);
          const cout = r2(k * prix);
          return {
            enonce: 'Dans cet exemple, le kilowattheure coûte ' + ecr(prix.toFixed(2)) + ' €. Laure a utilisé ' + k + ' kWh. Combien paie-t-elle, en euros ?',
            reponse: { type: 'nombre', valeur: cout },
            aide: 'Multiplie ' + k + ' par ' + ecr(prix.toFixed(2)) + '.',
            aideParlee: 'Multiplie le nombre de kilowattheures par le prix d’un kilowattheure.',
            correction: [k + ' × ' + ecr(prix.toFixed(2)) + ' = ' + ecr(cout) + ' €.'],
          };
        },
      },
      {
        id: 'bonne-egalite',
        univers: 'famille',
        // [sujet, bonne égalité, piège 1, piège 2, pourquoi]
        versions: [
          ['les kilowattheures et les joules', '1 kWh = 3 600 000 J', '1 kWh = 3 600 J', '1 kWh = 1 000 J', '1 kWh = 1 000 Wh = 1 000 × 3 600 J.'],
          ['les wattheures et les joules', '1 Wh = 3 600 J', '1 Wh = 3 600 000 J', '1 Wh = 60 J', '1 Wh, c’est 1 W pendant 3 600 s : 1 × 3 600 = 3 600 J.'],
          ['les kilowattheures et les wattheures', '1 kWh = 1 000 Wh', '1 kWh = 100 Wh', '1 kWh = 3 600 Wh', 'Le préfixe « kilo » veut dire mille.'],
          ['le joule, le watt et la seconde', '1 J = 1 W × 1 s', '1 J = 1 W × 1 h', '1 J = 1 W × 60 s', 'Avec E = P × t, 1 watt pendant 1 seconde donne 1 joule.'],
        ],
        genere(c) {
          const [s, bonne, p1, p2, pourquoi] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quelle égalité est juste pour ' + s + ' ?',
            reponse: O.choix(c.alea, bonne, [p1, p2]),
            aide: 'Souviens-toi : 1 Wh = 3 600 J et 1 kWh = 1 000 Wh.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [P du radiateur en W, durée par jour en h, prix du kWh en euros]
      versions: [[2000, 3, 0.2], [1500, 2, 0.2], [1000, 4, 0.25], [2000, 2, 0.25]],
      genere(c) {
        const [p, h, prix] = c.alea.choisir(this.versions);
        const k = (p * h) / 1000, j = k * 3600000, cout = r2(k * 30 * prix);
        return {
          enonce: 'Laure utilise un radiateur de ' + p + ' W pendant ' + h + ' heures chaque jour. Dans cet exemple, le kilowattheure coûte ' + ecr(prix.toFixed(2)) + ' €. On sait que 1 kWh = 3 600 000 J.',
          questions: [
            {
              texte: 'Question 1. Quelle énergie le radiateur utilise-t-il en un jour, en kilowattheures ? On utilise E = P × t, avec P en watts et t en heures.',
              reponse: { type: 'nombre', valeur: k },
              aide: 'Calcule P × t en wattheures, puis divise par 1 000.',
              correction: ['E = ' + p + ' × ' + h + ' = ' + gr(p * h) + ' Wh.', gr(p * h) + ' ÷ 1 000 = ' + ecr(k) + ' kWh.'],
            },
            {
              texte: 'Question 2. Quelle est cette énergie en joules ?',
              reponse: { type: 'nombre', valeur: j },
              aide: 'Multiplie le résultat précédent par 3 600 000.',
              correction: [ecr(k) + ' × 3 600 000 = ' + j + ' J.'],
            },
            {
              texte: 'Question 3. Combien Laure paie-t-elle pour ce radiateur en 30 jours, en euros ?',
              reponse: { type: 'nombre', valeur: cout },
              aide: 'Multiplie les kilowattheures d’un jour par 30, puis par le prix.',
              correction: [ecr(k) + ' × 30 = ' + ecr(k * 30) + ' kWh.', ecr(k * 30) + ' × ' + ecr(prix.toFixed(2)) + ' = ' + ecr(cout) + ' €.'],
            },
            {
              texte: 'Question 4. Laure veut payer moins. Propose une action et explique pourquoi elle réduit l’énergie utilisée. Parle de la puissance ou de la durée.',
              correction: ['Par exemple : réduire la durée de chauffage. Comme E = P × t, une durée plus courte donne une énergie plus petite.'],
              grille: ['As-tu proposé une action précise ?', 'As-tu parlé de la puissance ou de la durée ?', 'As-tu relié ton idée à E = P × t ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Joules ou kilowattheures, tu passes de l’un à l’autre : tu sais lire ta facture.',
    carte: ['wh-en-joules', 'appareil-en-kwh', 'cout-facture'],
    papierDuSoir: { exercices: ['appareil-en-kwh', 'cout-facture'], defi: true },
    automatismes: [
      {
        id: 'kwh-en-wh',
        versions: [1, 2, 3, 5, 4],
        genere(c) { const k = c.alea.choisir(this.versions); return { enonce: k + ' kWh = ? Wh', reponse: { type: 'nombre', valeur: k * 1000 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Royaume-Uni, James Joule, de Salford, a mesuré le travail qu’il faut pour produire une quantité de chaleur.',
    prenoms: ['Laure', 'Rachel'],
  };
});
