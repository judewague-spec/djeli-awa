/* Notion 12 du bloc « Mesures, géométrie et espace » : le théorème de Pythagore. La diagonale du portail et l'échelle contre le mur.
   Format : contenu/GABARIT-NOTION.md. Racines carrées : bloc « Les nombres ». */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r1 = (x) => Math.round(x * 10) / 10;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'pythagore',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Le théorème de Pythagore',
    classe: '4e',
    univers: ['maison-courses', 'dehors'],

    accroche: {
      texte: 'Laure a un grand portail. Il fait 3 mètres de large et 4 mètres de haut. Pour le renforcer, elle veut une barre en diagonale. Rachel n’a pas de mètre assez long. Comment connaître sa longueur sans la mesurer ? ' +
        'Il y a un secret, caché dans tous les coins bien droits.',
      image: { dessin: 'figure', points: { A: [0, 0], B: [3, 0], C: [3, 4] }, segments: [['A', 'B', '3 m'], ['B', 'C', '4 m'], ['A', 'C', '5 m']], droits: [['A', 'B', 'C']], description: 'Un triangle rectangle en B, dans le portail. A B mesure 3 mètres, B C mesure 4 mètres. La barre en diagonale A C, le côté le plus long, mesure 5 mètres.' },
    },

    manipulation: {
      type: 'carrelage',
      carreaux: 25,
      rangees: 1,
      colonnes: 1,
      consigne: 'Sur le petit côté, un carré de neuf carreaux. Sur le côté moyen, un carré de seize carreaux. Ensemble, cela fait vingt-cinq carreaux. Pose-les en un seul grand carré : son côté, c’est la diagonale du portail.',
    },

    decouverte: {
      texte: (c) => 'Dans un triangle rectangle, regarde ' + c.mot('hypotenuse') + ' : ce côté est en face du coin droit. Le secret : son carré vaut le carré d’un côté, plus le carré de l’autre. ' +
        'L’astuce : pour trouver le grand côté, on ajoute les carrés. Pour trouver un petit côté, on enlève. Puis on prend la racine carrée.',
    },

    vocabulaire: {
      termes: {
        hypotenuse: { sesMots: 'le grand côté', officiel: 'l’hypoténuse', lesDeux: 'le grand côté, que l’on appelle l’hypoténuse' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le grand côté. Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : l’hypoténuse, pour le grand côté, celui qui est en face de l’angle droit.',
        'Tu connais le mot officiel : l’hypoténuse.',
      ],
    },

    exercices: [
      {
        id: 'grand-cote',
        univers: 'maison-courses',
        versions: [[3, 4], [6, 8], [5, 12], [9, 12], [8, 15], [12, 16]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const s = a * a + b * b;
          return {
            enonce: 'Un triangle est rectangle. Ses deux côtés de l’angle droit mesurent ' + a + ' dm et ' + b + ' dm. Combien mesure son grand côté, en dm ?',
            reponse: { type: 'nombre', valeur: Math.sqrt(s) },
            aide: 'Ajoute les deux carrés, puis prends la racine carrée.',
            correction: [a + '² + ' + b + '² = ' + a * a + ' + ' + b * b + ' = ' + s + '.', '√' + s + ' = ' + Math.sqrt(s) + ' dm.'],
          };
        },
      },
      {
        id: 'petit-cote',
        univers: 'dehors',
        // [grand côté, côté connu]
        versions: [[30, 18], [20, 12], [13, 5], [15, 9], [17, 8], [25, 7]],
        genere(c) {
          const [h, a] = c.alea.choisir(this.versions);
          const d = h * h - a * a;
          return {
            enonce: 'Une échelle de ' + h + ' dm est posée contre un mur droit. Son pied est à ' + a + ' dm du mur. À quelle hauteur, en dm, touche-t-elle le mur ?',
            reponse: { type: 'nombre', valeur: Math.sqrt(d) },
            aide: 'L’échelle est le grand côté. Enlève les carrés, puis prends la racine carrée.',
            correction: [h + '² − ' + a + '² = ' + h * h + ' − ' + a * a + ' = ' + d + '.', '√' + d + ' = ' + Math.sqrt(d) + ' dm.'],
          };
        },
      },
      {
        id: 'avec-arrondi',
        univers: 'maison-courses',
        versions: [[8, 12], [7, 10], [6, 9], [9, 15], [8, 14], [10, 16]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const s = a * a + b * b, r = r1(Math.sqrt(s));
          return {
            enonce: 'Une table rectangulaire mesure ' + a + ' dm sur ' + b + ' dm. Quelle est la longueur de sa diagonale, en dm, arrondie au dixième ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Ajoute les deux carrés, puis prends la racine carrée à la calculatrice.',
            correction: [a + '² + ' + b + '² = ' + s + '.', '√' + s + ' ≈ ' + ecr(r) + ' dm.'],
          };
        },
      },
      {
        id: 'carre-du-grand-cote',
        univers: 'dehors',
        versions: [[3, 4], [2, 5], [6, 7], [1, 8], [4, 5], [10, 2]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'ABC est rectangle en B, avec AB = ' + a + ' cm et BC = ' + b + ' cm. Que vaut AC², en cm² ?',
            reponse: { type: 'nombre', valeur: a * a + b * b },
            aide: 'AC est le grand côté. Ajoute les deux carrés.',
            correction: ['AC² = AB² + BC².', 'AC² = ' + a * a + ' + ' + b * b + ' = ' + (a * a + b * b) + '.'],
          };
        },
      },
      Q('quel-est-le-grand-cote', 'maison-courses',
        [['rectangle en A', '[BC]'], ['rectangle en B', '[AC]'], ['rectangle en C', '[AB]']],
        (x) => 'Le triangle ABC est ' + x + '. Quel côté est le grand côté ?', ['[BC]', '[AC]', '[AB]'],
        'Il est en face de l’angle droit : il ne touche pas le coin droit.',
        'Le grand côté est en face de l’angle droit.'),
    ],

    defi: {
      // [largeur, longueur d'un terrain rectangulaire, en m, prix du mètre de grillage]
      versions: [[30, 40, 5], [60, 80, 3], [24, 32, 4], [15, 20, 6]],
      genere(c) {
        const [l, k, p] = c.alea.choisir(this.versions);
        const d = Math.sqrt(l * l + k * k);
        return {
          enonce: 'Un champ rectangulaire ABCD mesure AB = ' + k + ' m et BC = ' + l + ' m. Clarisse veut le partager en deux avec un grillage tendu de A à C. Le grillage coûte ' + p + ' € le mètre.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [4, 0], C: [4, 3], D: [0, 3] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C']], droits: [['A', 'B', 'C']], description: 'Un rectangle A B C D. A B mesure ' + k + ' mètres, B C ' + l + ' mètres. La diagonale A C partage le champ en deux. Le triangle A B C est rectangle en B.' },
          questions: [
            {
              texte: 'Question 1. Calculer AC², en m².',
              reponse: { type: 'nombre', valeur: l * l + k * k },
              aide: 'Le triangle ABC est rectangle en B.',
              correction: [k + '² + ' + l + '² = ' + (l * l + k * k) + '.'],
            },
            {
              texte: 'Question 2. Calculer la longueur AC, en mètres.',
              reponse: { type: 'nombre', valeur: d },
              aide: 'Prends la racine carrée.',
              correction: ['√' + (l * l + k * k) + ' = ' + d + ' m.'],
            },
            {
              texte: 'Question 3. Calculer le prix du grillage, en euros.',
              reponse: { type: 'nombre', valeur: d * p },
              aide: 'Multiplie la longueur par le prix du mètre.',
              correction: [d + ' × ' + p + ' = ' + d * p + ' €.'],
            },
            {
              texte: 'Question 4. Rédiger le calcul de AC, en citant le théorème utilisé.',
              correction: ['Le triangle ABC est rectangle en B, et [AC] est son hypoténuse.', 'D’après le théorème de Pythagore, AC² = AB² + BC².', 'AC² = ' + (l * l + k * k) + ', donc AC = ' + d + ' m.'],
              grille: ['As-tu dit que le triangle est rectangle en B ?', 'As-tu cité le théorème de Pythagore ?', 'As-tu écrit l’égalité avec les carrés ?', 'As-tu conclu avec l’unité ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un coin bien droit, deux carrés, une racine : tu mesures sans mètre.',
    carte: ['grand-cote', 'petit-cote', 'quel-est-le-grand-cote'],
    papierDuSoir: { exercices: ['petit-cote', 'avec-arrondi'], defi: true },
    automatismes: [
      {
        id: 'carres',
        versions: [[6], [7], [8], [9], [12]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: a + '² = ?', reponse: { type: 'nombre', valeur: a * a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Thabit ibn Qurra, mort à Bagdad, en Irak, a étendu le théorème de Pythagore à tous les triangles.',
    prenoms: ['Laure', 'Rachel', 'Clarisse'],
  };
});
