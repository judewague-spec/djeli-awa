/* Notion 28 du bloc « Mesures, géométrie et espace » : la rotation. La roue de la pompe et le motif qui tourne.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'rotation',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'La rotation',
    classe: '3e',
    univers: ['danses', 'appareils'],

    accroche: {
      texte: 'Rachel danse en rond autour de Moussa. Elle lui tient la main, sans le lâcher. Son bras reste tendu, de la même longueur. ' +
        'Quel que soit l’endroit où elle arrive, elle est toujours à la même distance de lui. C’est un tour, autour d’un point fixe.',
      image: { dessin: 'transformation', points: { A: [6, 5], B: [8, 5], C: [6, 6] }, image: [[5, 6], [5, 8], [4, 6]], centre: [5, 5], cote: 10, description: 'Un quadrillage, avec le centre O en 5 et 5. Le triangle A, en 6 et 5, B, en 8 et 5, C, en 6 et 6, en pointillés. Son image par un quart de tour, sens inverse des aiguilles d’une montre : A prime en 5 et 6, B prime en 5 et 8, C prime en 4 et 6.' },
    },

    manipulation: {
      type: 'transformation',
      genre: 'rotation',
      points: { A: [6, 5], B: [8, 5], C: [6, 7] },
      centre: [5, 5],
      cote: 10,
      cible: 2,
      consigne: 'Fais tourner le triangle autour du centre, par quarts de tour. Arrête-toi au demi-tour, puis valide. Les coordonnées de l’image sont écrites à l’écran.',
    },

    decouverte: {
      texte: (c) => 'Tourner une figure autour d’un point fixe, c’est ' + c.mot('rotation') + '. Il faut trois renseignements : ' + c.mot('centre') + ', l’angle, et le sens. ' +
        'Le sens inverse des aiguilles d’une montre est le sens direct. L’astuce : chaque point garde sa distance au centre. Une rotation d’un demi-tour, c’est une symétrie centrale. Et les longueurs, les angles et les aires ne changent pas.',
    },

    vocabulaire: {
      termes: {
        rotation: { sesMots: 'le tour', officiel: 'une rotation', lesDeux: 'le tour, que l’on appelle une rotation' },
        centre: { sesMots: 'le point fixe', officiel: 'le centre de la rotation', lesDeux: 'le point fixe, que l’on appelle le centre de la rotation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le tour, et le point fixe. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une rotation, pour le tour. Et le point fixe s’appelle le centre de la rotation.',
        'Tu connais les mots officiels : une rotation, et le centre de la rotation.',
      ],
    },

    exercices: [
      {
        id: 'distance-au-centre',
        univers: 'danses',
        versions: [[3], [5], [2.5], [4], [1.5], [6]],
        genere(c) {
          const [d] = c.alea.choisir(this.versions);
          return {
            enonce: 'A′ est l’image de A par une rotation de centre O. On sait que OA = ' + ecr(d) + ' m. Combien mesure OA′, en mètres ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Chaque point garde sa distance au centre.',
            correction: ['OA′ = OA = ' + ecr(d) + ' m.'],
          };
        },
      },
      {
        id: 'angle-du-tour',
        univers: 'appareils',
        // nombre de positions d'une roue à crans, régulières
        versions: [[4], [6], [8], [10], [12], [3]],
        genere(c) {
          const [n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une roue a ' + n + ' rayons, régulièrement placés. De quel angle faut-il la tourner, en degrés, pour qu’un rayon arrive à la place du suivant ?',
            reponse: { type: 'nombre', valeur: 360 / n },
            aide: 'Un tour complet, soit 360 degrés, partagé en parts égales.',
            aideParlee: 'Un tour complet, partagé en parts égales.',
            correction: ['360 ÷ ' + n + ' = ' + 360 / n + '°.'],
          };
        },
      },
      {
        id: 'quart-de-tour-abscisse',
        univers: 'danses',
        // [x, y] tourné d'un quart de tour direct autour de l'origine
        versions: [[3, 1], [2, 4], [5, 2], [1, 3], [4, 4], [6, 1]],
        genere(c) {
          const [x, y] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un repère, A(' + x + ' ; ' + y + ') tourne d’un quart de tour, dans le sens inverse des aiguilles d’une montre, autour de l’origine. Quelle est l’ordonnée de son image ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'Dessine-le sur ton cahier. Dans ce quart de tour, ce qui était à droite se retrouve en haut.',
            correction: ['L’image est le point (−' + y + ' ; ' + x + ').', 'Son ordonnée est ' + x + '.'],
          };
        },
      },
      {
        id: 'nombre-de-tours',
        univers: 'appareils',
        // angle en degrés
        versions: [[720], [1080], [180], [90], [360], [540]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          return {
            enonce: 'La poignée d’un moulin à manioc tourne de ' + a + '°. Combien de tours complets cela fait-il, en écriture décimale ?',
            reponse: { type: 'nombre', valeur: a / 360 },
            aide: 'Un tour complet, c’est 360 degrés.',
            aideParlee: 'Divise l’angle par la mesure d’un tour complet.',
            correction: [a + ' ÷ 360 = ' + ecr(a / 360) + '.'],
          };
        },
      },
      Q('quelle-transformation', 'danses',
        [['Une danseuse tourne autour d’un point fixe.', 'Une rotation'], ['Un tampon glisse le long d’un pagne, sans tourner.', 'Une translation'], ['On plie un tissu : le motif se pose sur son double.', 'Une symétrie axiale'], ['Une roue de vélo tourne autour de son axe.', 'Une rotation'], ['Une caisse est poussée tout droit.', 'Une translation']],
        (x) => x + ' Quelle est cette transformation ?', ['Une rotation', 'Une translation', 'Une symétrie axiale'],
        'Y a-t-il un point fixe, un glissement ou un pli ?',
        'Point fixe : rotation. Glissement : translation. Pli : symétrie axiale.'),
    ],

    defi: {
      // [OA = OB, angle AOB, AB arrondi, nombre de triangles, aire arrondie] : des mesures qui vont ensemble
      versions: [[4, 60, 4, 6, 6.9], [5, 90, 7.1, 4, 12.5], [3, 45, 2.3, 8, 3.2], [6, 30, 3.1, 12, 9]],
      genere(c) {
        const [oa, ang, ab, n, aire] = c.alea.choisir(this.versions);
        const tout = Math.round(aire * n * 100) / 100;
        return {
          enonce: 'Un motif de pagne est construit à partir d’un triangle AOB, isocèle en O. On le fait tourner autour de O, plusieurs fois, d’un angle de ' + ang + '°, sens direct, jusqu’à refaire un tour complet. On donne OA = OB = ' + oa + ' cm, AB = ' + ecr(ab) + ' cm, et le triangle a une aire de ' + ecr(aire) + ' cm². On appelle A′B′ l’image de [AB] par la première rotation.',
          image: { dessin: 'figure', points: { O: [0, 0], A: [4, 0], B: [2, 3.46] }, segments: [['O', 'A'], ['A', 'B'], ['B', 'O']], description: 'Le triangle A O B, de sommet O. O A et O B mesurent ' + oa + ' centimètres, A B ' + ecr(ab) + ' centimètres. L’angle en O mesure ' + ang + ' degrés. Le dessin n’est pas à l’échelle.' },
          questions: [
            {
              texte: 'Question 1. Combien de triangles faut-il pour faire un tour complet ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Un tour complet, soit 360 degrés, divisé par l’angle du triangle.',
              aideParlee: 'Un tour complet, divisé par l’angle du triangle.',
              correction: ['360 ÷ ' + ang + ' = ' + n + '.'],
            },
            {
              texte: 'Question 2. Combien mesure A′B′, en cm ?',
              reponse: { type: 'nombre', valeur: ab },
              aide: 'Une rotation conserve les longueurs.',
              correction: ['A′B′ = AB = ' + ecr(ab) + ' cm.'],
            },
            {
              texte: 'Question 3. Quelle est l’aire de tout le motif, en cm² ?',
              reponse: { type: 'nombre', valeur: tout },
              aide: 'Une rotation conserve les aires. Multiplie par le nombre de triangles.',
              correction: [ecr(aire) + ' × ' + n + ' = ' + ecr(tout) + ' cm².'],
            },
            {
              texte: 'Question 4. Citer les trois renseignements qui définissent la rotation utilisée ici.',
              correction: ['Le centre : le point O.', 'L’angle : ' + ang + '°.', 'Le sens : sens direct, inverse des aiguilles d’une montre.'],
              grille: ['As-tu donné le centre ?', 'As-tu donné l’angle ?', 'As-tu donné le sens ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un centre, un angle, un sens : ton motif fait un tour parfait.',
    carte: ['distance-au-centre', 'angle-du-tour', 'quelle-transformation'],
    papierDuSoir: { exercices: ['angle-du-tour', 'nombre-de-tours'], defi: true },
    automatismes: [
      {
        id: 'part-de-tour',
        versions: [[2], [4], [6], [9]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: '360 ÷ ' + a + ' = ?', reponse: { type: 'nombre', valeur: 360 / a } }; },
      },
    ],
    savaisTu: null,
    prenoms: ['Rachel', 'Moussa'],
  };
});
