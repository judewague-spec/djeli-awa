/* Notion 29 du bloc « Mesures, géométrie et espace » : l'homothétie. L'ombre d'Esther sur le mur, agrandie par la lampe.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const moins = (x) => ecr(x).replace('-', '−');
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'homothetie',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'L’homothétie',
    classe: '3e',
    univers: ['danses', 'appareils'],

    accroche: {
      texte: 'Esther danse le soir devant une lampe. Sur le mur, son ombre est deux fois plus grande qu’elle. Chaque point de son corps, la lampe, et le point d’ombre sont sur une même ligne droite. ' +
        'Si elle s’éloigne du mur, l’ombre change de taille. Une seule lampe, un seul nombre, et toute la figure s’agrandit.',
      image: { dessin: 'transformation', points: { A: [2, 1], B: [3, 1], C: [2, 3] }, image: [[4, 2], [6, 2], [4, 6]], centre: [0, 0], cote: 8, description: 'Un quadrillage, avec le centre O à l’origine. Le triangle A, en 2 et 1, B, en 3 et 1, C, en 2 et 3, en pointillés. Son image de rapport 2 : A prime en 4 et 2, B prime en 6 et 2, C prime en 4 et 6. Chaque point, son image et O sont alignés.' },
    },

    manipulation: {
      type: 'transformation',
      genre: 'homothetie',
      points: { A: [2, 1], B: [3, 1], C: [2, 3] },
      centre: [0, 0],
      cote: 10,
      cible: 2,
      rapports: [0.5, 1, 1.5, 2, 3],
      consigne: 'Change le rapport, et lis les coordonnées et l’aire écrites à l’écran. Choisis le rapport qui double les longueurs, puis valide.',
    },

    decouverte: {
      texte: (c) => 'Agrandir ou réduire une figure depuis un point fixe, c’est ' + c.mot('homothetie') + '. Il faut deux renseignements : le centre, et ' + c.mot('rapport') + '. ' +
        'Chaque point et son image sont alignés avec le centre. L’astuce : avec un rapport négatif, l’image passe de l’autre côté du centre, tête en bas, comme dans une chambre noire.',
    },

    vocabulaire: {
      termes: {
        homothetie: { sesMots: 'l’agrandissement depuis la lampe', officiel: 'une homothétie', lesDeux: 'l’agrandissement depuis la lampe, que l’on appelle une homothétie' },
        rapport: { sesMots: 'le nombre multiplicateur', officiel: 'le rapport', lesDeux: 'le nombre multiplicateur, que l’on appelle le rapport' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’agrandissement depuis la lampe, et le nombre multiplicateur. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une homothétie, pour l’agrandissement depuis la lampe. Et le nombre multiplicateur s’appelle le rapport.',
        'Tu connais les mots officiels : une homothétie, et son rapport.',
      ],
    },

    exercices: [
      {
        id: 'distance-image',
        univers: 'danses',
        // [OA, k]
        versions: [[3, 2], [4, 3], [6, 0.5], [5, 1.5], [10, 0.2], [2, 4]],
        genere(c) {
          const [d, k] = c.alea.choisir(this.versions);
          const r = r2(d * k);
          return {
            enonce: 'A′ est l’image de A par l’homothétie de centre O et de rapport ' + ecr(k) + '. On sait que OA = ' + d + ' m. Combien mesure OA′, en mètres ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Multiplie la distance au centre par le rapport.',
            correction: [d + ' × ' + ecr(k) + ' = ' + ecr(r) + ' m.'],
          };
        },
      },
      {
        id: 'trouver-le-rapport',
        univers: 'appareils',
        // [OA, OA']
        versions: [[2, 6], [3, 12], [4, 2], [5, 10], [10, 5], [8, 2]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une homothétie de centre O envoie le point A sur A′, du même côté de O. On a OA = ' + a + ' dm et OA′ = ' + b + ' dm, dans le même sens. Quel est le rapport de cette homothétie, en écriture décimale ?',
            reponse: { type: 'nombre', valeur: b / a },
            aide: 'Divise la distance de l’image par celle du point de départ.',
            correction: [b + ' ÷ ' + a + ' = ' + ecr(b / a) + '.'],
          };
        },
      },
      {
        id: 'aire-de-limage',
        univers: 'danses',
        // [aire, k]
        versions: [[5, 2], [3, 3], [20, 0.5], [4, 1.5], [2, 5], [16, 0.25]],
        genere(c) {
          const [a, k] = c.alea.choisir(this.versions);
          const f = k * k, r = r2(a * f);
          return {
            enonce: 'Un motif a une aire de ' + a + ' cm². On construit son image par une homothétie de rapport ' + ecr(k) + '. Quelle est l’aire de l’image, en cm² ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Une aire se multiplie par le rapport au carré.',
            correction: [ecr(k) + '² = ' + ecr(f) + '.', a + ' × ' + ecr(f) + ' = ' + ecr(r) + ' cm².'],
          };
        },
      },
      {
        id: 'coordonnee-image',
        univers: 'appareils',
        // [x, y, k] centre à l'origine
        versions: [[2, 1, 2], [3, 2, 3], [4, 6, 0.5], [1, 5, 2], [6, 2, 1.5], [2, 3, -1]],
        genere(c) {
          const [x, y, k] = c.alea.choisir(this.versions);
          const r = r2(x * k);
          return {
            enonce: 'Dans un repère d’origine O, le point A(' + x + ' ; ' + y + ') a pour image A′ par l’homothétie de centre O et de rapport ' + moins(k) + '. Quelle est l’abscisse de A′ ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Le centre est l’origine : multiplie l’abscisse par le rapport.',
            correction: [x + ' × ' + (k < 0 ? '(' + moins(k) + ')' : moins(k)) + ' = ' + moins(r) + '.'],
          };
        },
      },
      Q('agrandi-ou-reduit', 'danses',
        [['2', 'Un agrandissement'], ['0,5', 'Une réduction'], ['3', 'Un agrandissement'], ['0,25', 'Une réduction'], ['1,5', 'Un agrandissement'], ['−0,5', 'Une réduction, de l’autre côté du centre']],
        (x) => 'Une homothétie a pour rapport ' + x + '. Qu’obtient-on ?', ['Un agrandissement', 'Une réduction', 'Une réduction, de l’autre côté du centre'],
        'Le rapport est-il plus grand ou plus petit que 1 ? Et son signe ?',
        'Plus grand que 1 : agrandissement. Entre 0 et 1 : réduction. Un rapport négatif fait passer l’image de l’autre côté du centre.'),
    ],

    defi: {
      // [AB, BC, CA, k, aire]
      versions: [[3, 4, 5, 2, 6], [6, 8, 10, 0.5, 24], [3, 4, 5, 3, 6], [6, 8, 10, 1.5, 24]],
      genere(c) {
        const [ab, bc, ca, k, a] = c.alea.choisir(this.versions);
        return {
          enonce: 'On considère un triangle ABC, avec AB = ' + ab + ' cm, BC = ' + bc + ' cm et CA = ' + ca + ' cm. Il est rectangle en B, et son aire est de ' + a + ' cm². On construit son image A′B′C′ par une homothétie de centre O et de rapport ' + ecr(k) + '.',
          image: { dessin: 'figure', points: { O: [-2, -1], A: [0, 3], B: [0, 0], C: [4, 0] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'A']], pointilles: [['O', 'A'], ['O', 'B'], ['O', 'C']], droits: [['A', 'B', 'C']], description: 'Un triangle A B C, rectangle en B, avec A B ' + ab + ' centimètres, B C ' + bc + ' centimètres, C A ' + ca + ' centimètres. Le centre O est en dehors du triangle, relié à chaque sommet en pointillés.' },
          questions: [
            {
              texte: 'Question 1. Calculer A′B′, en cm.',
              reponse: { type: 'nombre', valeur: ab * k },
              aide: 'Multiplie par le rapport.',
              correction: [ab + ' × ' + ecr(k) + ' = ' + ecr(ab * k) + ' cm.'],
            },
            {
              texte: 'Question 2. Calculer le périmètre de A′B′C′, en cm.',
              reponse: { type: 'nombre', valeur: (ab + bc + ca) * k },
              aide: 'Le périmètre se multiplie par le rapport, comme toute longueur.',
              correction: ['(' + ab + ' + ' + bc + ' + ' + ca + ') × ' + ecr(k) + ' = ' + ecr((ab + bc + ca) * k) + ' cm.'],
            },
            {
              texte: 'Question 3. Calculer l’aire de A′B′C′, en cm².',
              reponse: { type: 'nombre', valeur: a * k * k },
              aide: 'L’aire se multiplie par le rapport au carré.',
              correction: [a + ' × ' + ecr(k * k) + ' = ' + ecr(a * k * k) + ' cm².'],
            },
            {
              texte: 'Question 4. Le triangle A′B′C′ est-il rectangle ? Justifier.',
              correction: ['Une homothétie conserve les angles.', 'ABC est rectangle en B, donc A′B′C′ est rectangle en B′.'],
              grille: ['As-tu répondu oui, rectangle en B′ ?', 'As-tu dit qu’une homothétie conserve les angles ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un centre, un rapport : ton ombre a exactement la taille que tu voulais.',
    carte: ['distance-image', 'aire-de-limage', 'agrandi-ou-reduit'],
    papierDuSoir: { exercices: ['trouver-le-rapport', 'aire-de-limage'], defi: true },
    automatismes: [
      {
        id: 'carre-de-k',
        versions: [[2], [3], [4], [5]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: a + '² = ?', reponse: { type: 'nombre', valeur: a * a } }; },
      },
    ],
    savaisTu: null,
    prenoms: ['Esther'],
  };
});
