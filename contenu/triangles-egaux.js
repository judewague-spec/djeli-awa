/* Notion 11 du bloc « Mesures, géométrie et espace » : les cas d'égalité des triangles. Deux fanions à couper pareil, sans tout mesurer.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const CC = 'Trois côtés égaux', AA = 'Un côté égal, entre deux angles égaux', CA = 'Deux côtés égaux, avec l’angle entre eux égal';
  const OUI = 'Oui, ils sont égaux', NON = 'On ne peut pas l’affirmer';

  return {
    id: 'triangles-egaux',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Cas d’égalité des triangles',
    classe: '4e',
    univers: ['coiffure', 'commerce'],

    accroche: {
      texte: 'Rachel coupe des fanions tous pareils. Clarisse vérifie sans poser un fanion sur l’autre : elle ne prend que trois mesures, pas six. ' +
        '« Trois bonnes mesures suffisent », dit-elle. Mais pas n’importe lesquelles !',
      image: { dessin: 'figure', points: { A: [0, 0], B: [4, 0], C: [1, 3], D: [6, 0], E: [10, 0], F: [7, 3] }, segments: [['A', 'B', '20 cm'], ['B', 'C'], ['C', 'A', '16 cm'], ['D', 'E', '20 cm'], ['E', 'F'], ['F', 'D', '16 cm']], description: 'Deux fanions en triangle, A B C et D E F. A B et D E mesurent 20 centimètres. A C et D F mesurent 16 centimètres. L’angle en A et l’angle en D sont égaux. Les deux fanions se superposent.' },
    },

    manipulation: {
      etapes: [
        'Prends trois baguettes attachées par les bouts : le triangle est rigide, il ne peut pas changer de forme. Trois côtés suffisent donc.',
        'Prends deux baguettes attachées, et ouvre-les d’un angle précis : la distance entre les bouts est fixée. Deux côtés et l’angle entre eux suffisent.',
        'Trace un côté, et pars de chaque bout avec un angle précis : les deux lignes se croisent en un seul point. Un côté et ses deux angles suffisent.',
        'Mais avec trois angles seulement, le triangle peut être petit ou grand. Cela ne suffit pas.',
      ],
    },

    decouverte: {
      texte: (c) => 'Deux triangles superposables sont ' + c.mot('egaux') + '. Pour le prouver, il faut l’un de ces trois cas : trois côtés ; deux côtés et l’angle entre eux ; un côté et les deux angles à ses bouts. ' +
        'L’astuce : retiens-les par ce qui est coincé entre les autres. Et s’ils sont égaux, toutes leurs autres mesures le sont aussi.',
    },

    vocabulaire: {
      termes: {
        egaux: { sesMots: 'des jumeaux', officiel: 'des triangles égaux', lesDeux: 'des jumeaux, que l’on appelle des triangles égaux' },
      },
      textes: [
        'Pour l’instant, garde ton mot : des jumeaux. Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : des triangles égaux, pour des jumeaux.',
        'Tu connais le mot officiel : des triangles égaux.',
      ],
    },

    exercices: [
      Q('quel-cas', 'coiffure',
        [['AB = DE, BC = EF et CA = FD', CC], ['AB = DE, l’angle en A égale l’angle en D, et l’angle en B égale l’angle en E', AA], ['AB = DE, AC = DF, et l’angle en A égale l’angle en D', CA], ['BC = EF, CA = FD et AB = DE', CC], ['BC = EF, l’angle en B égale l’angle en E, et l’angle en C égale l’angle en F', AA]],
        (x) => 'Pour les triangles ABC et DEF, on sait que ' + x + '. Quel cas d’égalité utilise-t-on ?', [CC, AA, CA],
        'Compte les côtés, puis regarde où se place l’angle.',
        'Ce sont les trois cas d’égalité : trois côtés ; un côté entre deux angles ; deux côtés et l’angle entre eux.'),
      O.qcm('suffit-il', 'commerce',
        [['leurs trois côtés sont égaux deux à deux', OUI, 'Trois côtés égaux : c’est l’un des trois cas.'], ['leurs trois angles sont égaux deux à deux', NON, 'Trois angles égaux ne fixent pas la taille : l’un peut être plus grand.'], ['deux côtés et l’angle entre eux sont égaux', OUI, 'Deux côtés et l’angle entre eux : c’est l’un des trois cas.'], ['deux côtés sont égaux, et un angle qui n’est pas entre eux aussi', NON, 'L’angle doit être placé entre les deux côtés.'], ['un côté et les deux angles à ses bouts sont égaux', OUI, 'Un côté et ses deux angles : c’est l’un des trois cas.']],
        (x) => 'Pour deux triangles, on sait ceci : ' + x + '. Sont-ils forcément égaux ?', [OUI, NON],
        'Compare avec les trois cas : trois côtés ; deux côtés et l’angle entre eux ; un côté et ses deux angles.'),
      {
        id: 'cote-du-jumeau',
        univers: 'coiffure',
        versions: [[5, 7, 6], [8, 6, 9], [12, 9, 10], [4, 5, 3], [15, 10, 20], [7, 8, 9]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Les triangles ABC et DEF sont égaux, A correspond à D, B à E et C à F. On donne AB = ' + a + ' cm, BC = ' + b + ' cm et CA = ' + d + ' cm. Combien mesure EF, en cm ?',
            reponse: { type: 'nombre', valeur: b },
            aide: 'E correspond à B, et F correspond à C.',
            correction: ['EF correspond à BC.', 'EF = ' + b + ' cm.'],
          };
        },
      },
      {
        id: 'angle-du-jumeau',
        univers: 'commerce',
        versions: [[60, 50], [45, 75], [90, 30], [100, 35], [40, 70], [55, 65]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Les triangles ABC et DEF sont égaux, A correspond à D, B à E et C à F. L’angle en A mesure ' + a + '° et l’angle en B mesure ' + b + '°. Combien mesure l’angle en F, en degrés ?',
            reponse: { type: 'nombre', valeur: 180 - a - b },
            aide: 'F correspond à C. Calcule d’abord l’angle en C, avec la somme des angles.',
            correction: ['Angle en C : 180 − ' + a + ' − ' + b + ' = ' + (180 - a - b) + '°.', 'F correspond à C, donc l’angle en F mesure ' + (180 - a - b) + '°.'],
          };
        },
      },
      {
        id: 'perimetre-du-jumeau',
        univers: 'coiffure',
        versions: [[5, 7, 6], [8, 6, 9], [12, 9, 10], [4, 5, 3], [15, 10, 20], [7, 8, 9]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un fanion a des côtés de ' + a + ' dm, ' + b + ' dm et ' + d + ' dm. Rachel en coupe un second, égal au premier. Quel est le périmètre du second, en dm ?',
            reponse: { type: 'nombre', valeur: a + b + d },
            aide: 'Deux triangles égaux ont les mêmes côtés.',
            correction: [a + ' + ' + b + ' + ' + d + ' = ' + (a + b + d) + ' dm.'],
          };
        },
      },
    ],

    defi: {
      // [AB, AC, angle A, BC]
      versions: [[20, 16, 50, 15.6], [12, 9, 60, 10.8], [10, 8, 70, 10.5], [15, 12, 40, 9.7]],
      genere(c) {
        const [ab, ac, ang, bc] = c.alea.choisir(this.versions);
        return {
          enonce: 'Deux fanions ABC et DEF sont tels que AB = DE = ' + ab + ' cm, AC = DF = ' + ac + ' cm, et les angles en A et en D mesurent tous les deux ' + ang + '°. On mesure BC = ' + String(bc).replace('.', ',') + ' cm.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [4, 0], C: [1, 3], D: [6, 0], E: [10, 0], F: [7, 3] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'A'], ['D', 'E'], ['E', 'F'], ['F', 'D']], description: 'Deux triangles A B C et D E F. A B égale D E, soit ' + ab + ' centimètres. A C égale D F, soit ' + ac + ' centimètres. Les angles en A et en D mesurent ' + ang + ' degrés.' },
          questions: [
            {
              texte: 'Question 1. Quel cas d’égalité permet de dire que ces triangles sont égaux ?',
              reponse: O.choix(c.alea, CA, [CC, AA, CA]),
              aide: 'Deux côtés, et où est l’angle ?',
              correction: ['L’angle en A est entre [AB] et [AC].', 'Réponse : ' + CA + '.'],
            },
            {
              texte: 'Question 2. Combien mesure EF, en cm ?',
              reponse: { type: 'nombre', valeur: bc },
              aide: 'EF correspond à BC.',
              correction: ['Les triangles sont égaux, donc EF = BC = ' + String(bc).replace('.', ',') + ' cm.'],
            },
            {
              texte: 'Question 3. Rédiger la preuve que les triangles ABC et DEF sont égaux.',
              correction: ['AB = DE, AC = DF, et les angles en A et en D sont égaux.', 'Ces angles sont placés entre les côtés égaux.', 'Deux côtés égaux et l’angle entre eux égal : les triangles sont égaux.'],
              grille: ['As-tu cité les trois égalités ?', 'As-tu dit que l’angle est entre les deux côtés ?', 'As-tu conclu que les triangles sont égaux ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Trois bonnes mesures te suffisent à reconnaître des jumeaux.',
    carte: ['quel-cas', 'suffit-il', 'cote-du-jumeau'],
    papierDuSoir: { exercices: ['angle-du-jumeau', 'suffit-il'], defi: true },
    automatismes: [
      {
        id: 'angle-manquant',
        versions: [[60, 60], [90, 40], [50, 70], [30, 80]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: '180 − ' + a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: 180 - a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Maroc, Ibn al-Banna, de Marrakech, a écrit une introduction aux Éléments d’Euclide, le grand livre de géométrie.',
    prenoms: ['Rachel', 'Clarisse'],
  };
});
