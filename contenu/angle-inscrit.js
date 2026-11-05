/* Notion 30 du bloc « Mesures, géométrie et espace » : angle inscrit et angle au centre (ancien programme). La table ronde de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const CERCLE = { O: [0, 0], A: [-2.5, -4.33], B: [2.5, -4.33], M: [0, 5] };

  return {
    id: 'angle-inscrit',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Angle inscrit, angle au centre',
    classe: 'ancien programme',
    univers: ['famille', 'cuisine-restaurant'],

    accroche: {
      texte: 'Rachel et Moussa regardent un plat. Il est posé au bord de la table ronde de Laure. Rachel est au bord, Moussa au centre. Pour voir tout le plat, Moussa doit tourner son regard deux fois plus que Rachel ! ' +
        'Et tous ceux qui sont assis au bord, du même côté, le voient sous le même angle.',
      image: { dessin: 'figure', points: CERCLE, cercles: [['O', 5]], segments: [['O', 'A'], ['O', 'B'], ['M', 'A'], ['M', 'B']], angles: [['A', 'O', 'B', '60°'], ['A', 'M', 'B', '30°']], description: 'Un cercle de centre O. A et B sont deux points du cercle. M est un autre point du cercle, en face. L’angle en O, entre O A et O B, mesure 60 degrés. L’angle en M, entre M A et M B, mesure 30 degrés.' },
    },

    manipulation: {
      etapes: [
        'Trace un cercle, et deux points A et B dessus : c’est le plat, posé au bord de la table.',
        'Place un point M sur le cercle, du côté opposé, puis relie-le à A et à B. Mesure l’angle en M.',
        'Déplace M sur le même arc : l’angle ne change pas.',
        'Relie maintenant A et B au centre : l’angle en O est exactement le double.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’angle dont le sommet est au centre, c’est ' + c.mot('centre') + '. L’angle dont le sommet est sur le cercle, c’est ' + c.mot('inscrit') + '. ' +
        'Un angle intercepte l’arc qui est entre ses deux côtés. L’astuce : pour le même arc, le centre voit deux fois plus grand. Deux angles inscrits sur le même arc sont égaux. Et sur un demi-cercle, l’angle inscrit est droit.',
    },

    vocabulaire: {
      termes: {
        centre: { sesMots: 'l’angle de Moussa', officiel: 'l’angle au centre', lesDeux: 'l’angle de Moussa, que l’on appelle l’angle au centre' },
        inscrit: { sesMots: 'l’angle de Rachel', officiel: 'l’angle inscrit', lesDeux: 'l’angle de Rachel, que l’on appelle l’angle inscrit' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’angle de Moussa, et l’angle de Rachel. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’angle au centre, pour l’angle de Moussa. Et l’angle de Rachel s’appelle l’angle inscrit.',
        'Tu connais les mots officiels : l’angle au centre, et l’angle inscrit.',
      ],
    },

    exercices: [
      {
        id: 'inscrit-depuis-centre',
        univers: 'famille',
        versions: [[60], [80], [100], [40], [120], [90]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un cercle de centre O, l’angle au centre AOB mesure ' + a + '°. M est sur le cercle, et l’angle AMB intercepte le même arc. Combien mesure l’angle AMB, en degrés ?',
            reponse: { type: 'nombre', valeur: a / 2 },
            aide: 'L’angle inscrit vaut la moitié de l’angle au centre.',
            correction: [a + ' ÷ 2 = ' + a / 2 + '°.'],
          };
        },
      },
      {
        id: 'centre-depuis-inscrit',
        univers: 'cuisine-restaurant',
        versions: [[30], [45], [25], [50], [35], [70]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un angle inscrit mesure ' + a + '°. L’angle au centre intercepte le même arc. Combien mesure-t-il, en degrés ?',
            reponse: { type: 'nombre', valeur: a * 2 },
            aide: 'L’angle au centre est le double.',
            correction: [a + ' × 2 = ' + a * 2 + '°.'],
          };
        },
      },
      {
        id: 'meme-arc',
        univers: 'famille',
        versions: [[30], [52], [41], [65], [28], [75]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Autour d’une table ronde, M et N sont assis du même côté de l’arc AB. L’angle AMB mesure ' + a + '°. Combien mesure l’angle ANB, en degrés ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Deux angles inscrits qui interceptent le même arc sont égaux.',
            correction: ['Même arc, donc même angle : ' + a + '°.'],
          };
        },
      },
      {
        id: 'demi-cercle',
        univers: 'cuisine-restaurant',
        // un angle du triangle inscrit dans un demi-cercle
        versions: [[30], [40], [55], [25], [62], [48]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le triangle ABM a pour côté [AB], un diamètre du cercle, et M est sur le cercle. L’angle en M est donc droit. L’angle en A mesure ' + a + '°. Combien mesure l’angle en B, en degrés ?',
            reponse: { type: 'nombre', valeur: 90 - a },
            aide: 'Il y a un angle droit : les deux autres se partagent le reste.',
            correction: ['90 − ' + a + ' = ' + (90 - a) + '°.'],
          };
        },
      },
      Q('quel-angle', 'famille',
        [['au centre du cercle', 'Un angle au centre'], ['sur le cercle', 'Un angle inscrit'], ['à l’intérieur du cercle, sans être le centre', 'Ni l’un, ni l’autre'], ['à l’extérieur du cercle', 'Ni l’un, ni l’autre']],
        (x) => 'Un angle a son sommet ' + x + '. Comment s’appelle-t-il ?', ['Un angle au centre', 'Un angle inscrit', 'Ni l’un, ni l’autre'],
        'Regarde seulement où est son sommet.',
        'Sommet au centre : angle au centre. Sommet sur le cercle : angle inscrit.'),
    ],

    defi: {
      // [AOB]
      versions: [[80], [100], [60], [120]],
      genere(c) {
        const [a] = c.alea.choisir(this.versions);
        const b = (180 - a) / 2;
        return {
          enonce: 'A, B et M sont trois points d’un cercle de centre O. L’angle au centre AOB mesure ' + a + '°, et M est sur le grand arc AB.',
          image: { dessin: 'figure', points: CERCLE, cercles: [['O', 5]], segments: [['O', 'A'], ['O', 'B'], ['M', 'A'], ['M', 'B'], ['A', 'B']], description: 'Un cercle de centre O. A, B et M sont sur le cercle. L’angle au centre A O B mesure ' + a + ' degrés. M est sur le grand arc A B. Le dessin n’est pas à l’échelle.' },
          questions: [
            {
              texte: 'Question 1. Calculer la mesure de l’angle AMB, en degrés.',
              reponse: { type: 'nombre', valeur: a / 2 },
              aide: 'L’angle inscrit vaut la moitié de l’angle au centre.',
              correction: [a + ' ÷ 2 = ' + a / 2 + '°.'],
            },
            {
              texte: 'Question 2. Le triangle AOB est isocèle en O. Calculer l’angle OAB, en degrés.',
              reponse: { type: 'nombre', valeur: b },
              aide: 'Enlève l’angle en O à 180, puis partage en deux.',
              correction: ['(180 − ' + a + ') ÷ 2 = ' + b + '°.'],
            },
            {
              texte: 'Question 3. Expliquer pourquoi le triangle AOB est isocèle en O.',
              correction: ['A et B sont sur le cercle de centre O.', 'Donc OA = OB, car ce sont deux rayons : le triangle AOB est isocèle en O.'],
              grille: ['As-tu dit que OA et OB sont des rayons ?', 'As-tu conclu que le triangle est isocèle ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Du centre ou du bord, tu sais sous quel angle chacun voit le plat.',
    carte: ['inscrit-depuis-centre', 'meme-arc', 'quel-angle'],
    papierDuSoir: { exercices: ['inscrit-depuis-centre', 'demi-cercle'], defi: true },
    automatismes: [
      {
        id: 'moitie-angle',
        versions: [[60], [90], [120], [80]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: 'La moitié de ' + a + ' = ?', reponse: { type: 'nombre', valeur: a / 2 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte, Ératosthène a comparé l’ombre de midi à Syène et à Alexandrie pour mesurer la Terre.',
    prenoms: ['Laure', 'Rachel', 'Moussa'],
  };
});
