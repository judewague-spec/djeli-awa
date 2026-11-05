/* Notion 5 du bloc « Mesures, géométrie et espace » : les symétries axiale et centrale. Le motif du pagne d'Esther, plié puis tourné.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const AXE = 'Une symétrie axiale', CEN = 'Une symétrie centrale';

  return {
    id: 'symetries',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Les symétries',
    classe: '5e',
    univers: ['coiffure', 'danses'],

    accroche: {
      texte: 'Esther trace le motif d’un pagne. Elle plie le tissu en deux : la moitié de gauche se pose exactement sur celle de droite. ' +
        'Puis elle pique une épingle au centre d’un autre motif, et le fait tourner d’un demi-tour : il retombe sur lui-même. Deux façons de faire un double parfait.',
      image: { dessin: 'figure', points: { A: [1, 1], B: [3, 1], C: [3, 3], 'A′': [9, 1], 'B′': [7, 1], 'C′': [7, 3], _h: [5, 4], _b: [5, 0] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'A'], ['A′', 'B′'], ['B′', 'C′'], ['C′', 'A′']], pointilles: [['_h', '_b']], description: 'Un triangle A B C à gauche, et son double A prime, B prime, C prime à droite, de l’autre côté d’une ligne verticale en pointillés. A et A prime sont à 4 carreaux de cette ligne. B et B prime, comme C et C prime, à 2 carreaux.' },
    },

    manipulation: {
      etapes: [
        'Dessine un petit triangle sur une feuille, puis plie la feuille le long d’une ligne.',
        'Le double se trouve à la même distance du pli, de l’autre côté : c’est un retournement.',
        'Sur une autre feuille, pique une épingle, et fais tourner le dessin d’un demi-tour.',
        'Dans les deux cas, les longueurs et les angles ne changent pas. Seule la place change.',
      ],
    },

    decouverte: {
      texte: (c) => 'Quand tu plies le long d’une ligne, tu fais ' + c.mot('axiale') + '. Quand tu tournes d’un demi-tour autour d’un point, tu fais ' + c.mot('centrale') + '. ' +
        'L’astuce : dans les deux cas, le double a exactement les mêmes mesures. Une figure et son double se superposent toujours.',
    },

    vocabulaire: {
      termes: {
        axiale: { sesMots: 'le pli', officiel: 'la symétrie axiale', lesDeux: 'le pli, que l’on appelle la symétrie axiale' },
        centrale: { sesMots: 'le demi-tour', officiel: 'la symétrie centrale', lesDeux: 'le demi-tour, que l’on appelle la symétrie centrale' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le pli, et le demi-tour. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la symétrie axiale, pour le pli. Et le demi-tour s’appelle la symétrie centrale.',
        'Tu connais les mots officiels : la symétrie axiale, et la symétrie centrale.',
      ],
    },

    exercices: [
      {
        id: 'longueur-conservee',
        univers: 'coiffure',
        versions: [[5, 'axiale'], [7.5, 'centrale'], [12, 'axiale'], [3.2, 'centrale'], [9, 'axiale'], [6.4, 'centrale']],
        genere(c) {
          const [d, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le segment [A′B′] est l’image du segment [AB] par une symétrie ' + s + '. On sait que AB = ' + ecr(d) + ' cm. Combien mesure A′B′, en cm ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Une symétrie ne change aucune longueur.',
            correction: ['Une symétrie conserve les longueurs.', 'A′B′ = ' + ecr(d) + ' cm.'],
          };
        },
      },
      {
        id: 'angle-conserve',
        univers: 'danses',
        versions: [[40, 'axiale'], [65, 'centrale'], [90, 'axiale'], [120, 'centrale'], [35, 'axiale'], [75, 'centrale']],
        genere(c) {
          const [a, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un pas de danse est tracé au sol, avec un angle de ' + a + '°. On trace son image par une symétrie ' + s + '. Combien mesure l’angle image, en degrés ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Une symétrie ne change aucun angle.',
            correction: ['Une symétrie conserve les angles.', 'L’angle image mesure ' + a + '°.'],
          };
        },
      },
      {
        // Le centre de la symétrie sur une ligne graduée : l'image est à la même distance, de l'autre côté.
        id: 'image-centre',
        univers: 'danses',
        versions: [[2, 5], [1, 4], [3, 6], [4, 9], [0, 3], [5, 7]],
        genere(c) {
          const [a, o] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur une ligne graduée au sol, Esther se tient à la graduation ' + a + '. Elle se déplace par symétrie de centre le point placé à la graduation ' + o + '. À quelle graduation arrive-t-elle ?',
            reponse: { type: 'nombre', valeur: 2 * o - a },
            aide: 'Le centre doit être au milieu du départ et de l’arrivée.',
            correction: ['Du départ au centre : ' + o + ' − ' + a + ' = ' + (o - a) + '.', 'On continue d’autant : ' + o + ' + ' + (o - a) + ' = ' + (2 * o - a) + '.'],
          };
        },
      },
      Q('axes', 'coiffure',
        [['un carré', '4'], ['un rectangle qui n’est pas un carré', '2'], ['un triangle équilatéral', '3'], ['un triangle isocèle qui n’est pas équilatéral', '1']],
        (x) => 'Combien d’axes de symétrie a ' + x + ' ?', ['1', '2', '3', '4'],
        'Imagine toutes les façons de plier la figure pour que les deux moitiés se recouvrent.',
        'Carré : 4 axes. Rectangle : 2. Triangle équilatéral : 3. Triangle isocèle : 1.'),
      Q('laquelle', 'coiffure',
        [['On plie le tissu, et le motif se pose sur son double.', AXE], ['Le motif tourne d’un demi-tour autour d’une épingle, et retombe sur lui-même.', CEN], ['Le reflet d’un visage dans un miroir posé debout.', AXE], ['Une lettre S retournée tête en bas qui reste un S.', CEN]],
        (x) => x + ' De quelle symétrie s’agit-il ?', [AXE, CEN],
        'Y a-t-il un pli ou un demi-tour ?',
        'Un pli autour d’une ligne, c’est une symétrie axiale. Un demi-tour autour d’un point, c’est une symétrie centrale.'),
    ],

    defi: {
      // [AB, BC, angle B]
      versions: [[5, 4, 60], [6, 3, 45], [8, 5, 70], [7, 6, 50]],
      genere(c) {
        const [ab, bc, ang] = c.alea.choisir(this.versions);
        return {
          enonce: 'ABC est un triangle tel que AB = ' + ab + ' cm, BC = ' + bc + ' cm, et l’angle en B mesure ' + ang + '°. On construit le triangle A′B′C′, image de ABC par la symétrie de centre O.',
          image: { dessin: 'figure', points: { A: [0, 2], B: [2, 0], C: [3, 2], O: [4, 1.5], 'A′': [8, 1], 'B′': [6, 3], 'C′': [5, 1] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'A'], ['A′', 'B′'], ['B′', 'C′'], ['C′', 'A′']], description: 'Le triangle A B C, le point O, et de l’autre côté de O le triangle image A prime, B prime, C prime. O est le milieu de A A prime, de B B prime et de C C prime. A B mesure ' + ab + ' centimètres, B C ' + bc + ' centimètres, et l’angle en B ' + ang + ' degrés.' },
          questions: [
            {
              texte: 'Question 1. Combien mesure A′B′, en cm ?',
              reponse: { type: 'nombre', valeur: ab },
              aide: 'Une symétrie conserve les longueurs.',
              correction: ['A′B′ = AB = ' + ab + ' cm.'],
            },
            {
              texte: 'Question 2. Combien mesure l’angle en B′, en degrés ?',
              reponse: { type: 'nombre', valeur: ang },
              aide: 'Une symétrie conserve les angles.',
              correction: ['L’angle en B′ mesure ' + ang + '°.'],
            },
            {
              texte: 'Question 3. Que représente le point O pour le segment [BB′] ? Justifier.',
              correction: ['B′ est l’image de B par la symétrie de centre O.', 'Donc O est le milieu du segment [BB′].'],
              grille: ['As-tu écrit que O est le milieu de [BB′] ?', 'As-tu utilisé la définition de la symétrie de centre O ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un pli ou un demi-tour : ton motif a toujours son double parfait.',
    carte: ['longueur-conservee', 'axes', 'laquelle'],
    papierDuSoir: { exercices: ['image-centre', 'axes'], defi: true },
    automatismes: [
      {
        id: 'double-distance',
        versions: [[3, 5], [2, 7], [4, 6], [1, 8]],
        genere(c) { const [a, o] = c.alea.choisir(this.versions); return { enonce: 'Le milieu de ' + a + ' et de quel nombre vaut ' + o + ' ?', reponse: { type: 'nombre', valeur: 2 * o - a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Allemagne, Emmy Noether a relié en 1918 les symétries et les lois de conservation de la physique.',
    prenoms: ['Esther'],
  };
});
