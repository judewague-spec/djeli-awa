/* Notion 4 du bloc « L'énergie » : l'énergie cinétique. Les vélos de Moussa et d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a) => O.qcm(id, u, v, e, t, a);
  // Un nombre écrit avec des espaces entre les milliers et une virgule : 2 560, 312,5.
  const gr = (x) => { const [a, b] = String(x).split('.'); return a.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (b ? ',' + b : ''); };
  const r2 = (x) => Math.round(x * 100) / 100;
  const COMPARE = ' Lequel a le plus d’énergie cinétique ? On donne Ec = ½ × m × v².';

  return {
    id: 'energie-cinetique',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'L’énergie cinétique',
    classe: '3e',
    univers: ['dehors', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : énergie cinétique, relation Ec = ½ × m × v², vitesse en mètres par seconde.',

    accroche: {
      texte: 'Moussa roule à vélo, très vite. Aminata roule à côté de lui, tout doucement. ' +
        'Si les deux freinent d’un coup, qui est le plus long à arrêter ? Celui qui va vite. ' +
        'L’énergie du mouvement dépend de la masse, et surtout de la vitesse.',
      image: { dessin: 'chaine', etapes: ['Moussa : vitesse grande', 'Aminata : vitesse petite', 'Plus de vitesse : plus d’énergie'], description: 'Moussa roule vite et Aminata roule doucement. Plus la vitesse est grande, plus l’énergie du mouvement est grande.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Ec = ½ × m × v²', 'm en kg, v en m/s, Ec en J', 'km/h vers m/s : on divise par 3,6'], description: 'Ec égale un demi fois m fois v au carré. La masse m est en kilogrammes, la vitesse v en mètres par seconde et Ec en joules. Pour passer des kilomètres par heure aux mètres par seconde, on divise par trois virgule six.' },
      etapes: [
        'Un objet en mouvement a de l’énergie de mouvement : c’est l’énergie cinétique, notée Ec.',
        'Elle se calcule avec Ec = ½ × m × v², où v² veut dire v × v.',
        'La masse m est en kilogrammes, la vitesse v en mètres par seconde, et Ec est en joules.',
        'Pour passer de km/h à m/s, divise par 3,6. Exemple : 36 km/h, c’est 10 m/s.',
        'Exemple : 2 kg à 3 m/s. Ec = ½ × 2 × 3² = ½ × 2 × 9 = 9 J.',
        'Si la vitesse double, v² est multiplié par 4 : l’énergie cinétique est multipliée par 4.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un objet qui bouge a ' + c.mot('ec') + '. ' +
        'Elle dépend de la masse, et surtout de la vitesse. ' +
        'La vitesse doit se compter en ' + c.mot('ms') + '. ' +
        'Pour changer des kilomètres par heure, tu divises par 3,6. ' +
        'L’astuce : quand la vitesse double, l’énergie est multipliée par 4.',
    },

    vocabulaire: {
      termes: {
        ec: { sesMots: 'l’énergie du mouvement', officiel: 'l’énergie cinétique', lesDeux: 'l’énergie du mouvement, que les physiciens appellent l’énergie cinétique' },
        ms: { sesMots: 'mètres parcourus chaque seconde', officiel: 'mètres par seconde', lesDeux: 'mètres parcourus chaque seconde, que les physiciens appellent mètres par seconde' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’énergie du mouvement, et des mètres parcourus chaque seconde. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : l’énergie cinétique, notée Ec, et des mètres par seconde.',
        'Tu connais les mots officiels : l’énergie cinétique et les mètres par seconde.',
      ],
    },

    exercices: [
      {
        id: 'kmh-en-ms',
        univers: 'dehors',
        // vitesse en km/h
        versions: [36, 72, 18, 54, 90, 108],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const ms = r2(v / 3.6);
          return {
            enonce: 'Une voiture roule à ' + v + ' km/h. Quelle est sa vitesse, en m/s ?',
            reponse: { type: 'nombre', valeur: ms },
            aide: 'Divise ' + v + ' par 3,6.',
            aideParlee: 'Pour passer de kilomètres par heure à mètres par seconde, divise par trois virgule six.',
            correction: [v + ' ÷ 3,6 = ' + ecr(ms) + ' m/s.'],
          };
        },
      },
      {
        id: 'calcul-ec',
        univers: 'famille',
        // [m en kg, v en m/s]
        versions: [[2, 3], [10, 2], [4, 5], [1000, 10], [60, 5], [0.5, 4]],
        genere(c) {
          const [m, v] = c.alea.choisir(this.versions);
          const ec = (m * v * v) / 2;
          return {
            enonce: 'Un objet de ' + gr(m) + ' kg se déplace à ' + v + ' m/s. On donne Ec = ½ × m × v². Quelle est son énergie cinétique, en joules ?',
            reponse: { type: 'nombre', valeur: ec },
            aide: 'Calcule d’abord v × v, puis multiplie par ' + gr(m) + ', puis prends la moitié.',
            aideParlee: 'Calcule d’abord la vitesse fois la vitesse, puis multiplie par la masse, puis prends la moitié.',
            correction: ['v² = ' + v + ' × ' + v + ' = ' + v * v + '.', 'Ec = ½ × ' + gr(m) + ' × ' + v * v + ' = ' + gr(ec) + ' J.'],
          };
        },
      },
      {
        id: 'velo-kmh',
        univers: 'dehors',
        // [masse du cycliste et du vélo en kg, vitesse en km/h]
        versions: [[72, 18], [80, 9], [60, 18], [90, 18], [50, 18], [100, 9]],
        genere(c) {
          const [m, k] = c.alea.choisir(this.versions);
          const v = r2(k / 3.6), ec = (m * v * v) / 2;
          return {
            enonce: 'Moussa et son vélo ont une masse totale de ' + m + ' kg. Il roule à ' + k + ' km/h. On donne Ec = ½ × m × v². Quelle est son énergie cinétique, en joules ?',
            reponse: { type: 'nombre', valeur: ec },
            aide: 'Convertis d’abord la vitesse en m/s : divise ' + k + ' par 3,6.',
            aideParlee: 'Convertis d’abord la vitesse en mètres par seconde, puis calcule l’énergie.',
            correction: [k + ' ÷ 3,6 = ' + ecr(v) + ' m/s.', 'Ec = ½ × ' + m + ' × ' + ecr(v) + '² = ½ × ' + m + ' × ' + ecr(v * v) + ' = ' + gr(ec) + ' J.'],
          };
        },
      },
      {
        id: 'vitesse-double',
        univers: 'dehors',
        // énergie cinétique de départ en J
        versions: [100, 250, 300, 50, 125],
        genere(c) {
          const e = c.alea.choisir(this.versions);
          return {
            enonce: 'Un vélo a une énergie cinétique de ' + e + ' J. Sa vitesse double, sa masse ne change pas. Quelle énergie cinétique a-t-il alors, en joules ?',
            reponse: { type: 'nombre', valeur: 4 * e },
            aide: 'Quand la vitesse double, l’énergie est multipliée par 4.',
            correction: ['La vitesse double : v² est multiplié par 2 × 2 = 4.', '4 × ' + e + ' = ' + gr(4 * e) + ' J.'],
          };
        },
      },
      Q('qui-a-le-plus-ec', 'dehors',
        [
          ['Le premier est un camion de 4 000 kg à 10 m/s. Le second est une voiture de 1 000 kg à 20 m/s.', 'Les deux autant', 'Camion : ½ × 4 000 × 100 = 200 000 J. Voiture : ½ × 1 000 × 400 = 200 000 J.'],
          ['Le premier est une balle de 0,2 kg à 20 m/s. Le second est une balle de 0,1 kg à 20 m/s.', 'Le premier objet', 'Même vitesse : la plus lourde a le plus d’énergie. 40 J contre 20 J.'],
          ['Le premier est un cycliste de 80 kg à 4 m/s. Le second est le même cycliste à 8 m/s.', 'Le second objet', 'La vitesse double : l’énergie est multipliée par 4. 640 J contre 2 560 J.'],
          ['Le premier est une moto de 200 kg à 10 m/s. Le second est un cycliste de 80 kg à 10 m/s.', 'Le premier objet', 'Même vitesse : le plus lourd a le plus d’énergie. 10 000 J contre 4 000 J.'],
          ['Le premier est un ballon de 0,5 kg à 8 m/s. Le second est un ballon de 2 kg à 4 m/s.', 'Les deux autant', 'Premier : ½ × 0,5 × 64 = 16 J. Second : ½ × 2 × 16 = 16 J.'],
        ],
        (x) => x + COMPARE,
        ['Le premier objet', 'Le second objet', 'Les deux autant'],
        'Calcule Ec = ½ × m × v² pour chaque objet, puis compare.'),
    ],

    defi: {
      // [masse d'Aminata et de son vélo en kg, vitesse en km/h]
      versions: [[60, 9], [80, 18], [80, 9], [90, 18]],
      genere(c) {
        const [m, k] = c.alea.choisir(this.versions);
        const v = r2(k / 3.6), ec = (m * v * v) / 2, k2 = 2 * k, v2 = 2 * v, ec2 = (m * v2 * v2) / 2;
        return {
          enonce: 'Aminata et son vélo ont une masse totale de ' + m + ' kg. Elle roule à ' + k + ' km/h. On donne Ec = ½ × m × v².',
          questions: [
            {
              texte: 'Question 1. Quelle est la vitesse d’Aminata, en m/s ?',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Divise ' + k + ' par 3,6.',
              aideParlee: 'Divise la vitesse en kilomètres par heure par trois virgule six.',
              correction: [k + ' ÷ 3,6 = ' + ecr(v) + ' m/s.'],
            },
            {
              texte: 'Question 2. Quelle est son énergie cinétique, en joules ?',
              reponse: { type: 'nombre', valeur: ec },
              aide: 'Calcule ½ × ' + m + ' × ' + ecr(v) + ' × ' + ecr(v) + '.',
              aideParlee: 'Calcule la moitié de la masse fois la vitesse fois la vitesse.',
              correction: ['v² = ' + ecr(v) + ' × ' + ecr(v) + ' = ' + ecr(v * v) + '.', 'Ec = ½ × ' + m + ' × ' + ecr(v * v) + ' = ' + gr(ec) + ' J.'],
            },
            {
              texte: 'Question 3. Aminata roule maintenant à ' + k2 + ' km/h. Quelle est son énergie cinétique, en joules ?',
              reponse: { type: 'nombre', valeur: ec2 },
              aide: 'Convertis ' + k2 + ' km/h en m/s, puis calcule Ec. Ou multiplie le résultat précédent par 4.',
              aideParlee: 'Convertis la nouvelle vitesse, puis calcule l’énergie. Ou multiplie le résultat précédent par 4.',
              correction: [k2 + ' ÷ 3,6 = ' + ecr(v2) + ' m/s.', 'Ec = ½ × ' + m + ' × ' + ecr(v2 * v2) + ' = ' + gr(ec2) + ' J.'],
            },
            {
              texte: 'Question 4. Moussa dit : « Si je roule deux fois plus vite, mon énergie est deux fois plus grande. » A-t-il raison ? Explique avec tes résultats.',
              correction: ['Non. À ' + k + ' km/h, Ec = ' + gr(ec) + ' J. À ' + k2 + ' km/h, Ec = ' + gr(ec2) + ' J.', 'L’énergie est multipliée par 4, pas par 2.'],
              grille: ['As-tu répondu que Moussa a tort ?', 'As-tu comparé tes deux énergies ?', 'As-tu dit que l’énergie est multipliée par 4 ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais calculer l’énergie du mouvement, et tu sais qu’elle grandit très vite avec la vitesse.',
    carte: ['kmh-en-ms', 'calcul-ec', 'velo-kmh'],
    papierDuSoir: { exercices: ['velo-kmh', 'vitesse-double'], defi: true },
    automatismes: [
      {
        id: 'carre-vitesse',
        versions: [3, 4, 5, 6, 8, 10],
        genere(c) { const v = c.alea.choisir(this.versions); return { enonce: v + ' × ' + v + ' = ?', reponse: { type: 'nombre', valeur: v * v } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, Émilie du Châtelet a lâché des boules dans l’argile : l’énergie suit la vitesse au carré.',
    prenoms: ['Moussa', 'Aminata'],
  };
});
