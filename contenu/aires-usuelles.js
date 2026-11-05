/* Notion 8 du bloc « Mesures, géométrie et espace » : les aires des figures usuelles. Le carrelage et la peinture de la maison de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'aires-usuelles',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Les aires usuelles',
    classe: '4e',
    univers: ['maison-courses', 'famille'],

    accroche: {
      texte: 'Laure veut carreler sa terrasse. Rachel compte les carreaux : les rangées fois les colonnes, et voilà la surface. ' +
        'Une aire, ce n’est rien d’autre que ça : le nombre de petits carrés qu’il faut pour tout couvrir.',
      image: { dessin: 'carrelage', rangees: 3, colonnes: 5, description: 'Un coin de terrasse couvert de 3 rangées de 5 carreaux d’un mètre carré. Il y a 15 carreaux, soit 15 mètres carrés.' },
    },

    manipulation: {
      type: 'carrelage',
      carreaux: 36,
      rangees: 1,
      colonnes: 1,
      consigne: 'Pose tes carreaux d’un mètre carré pour couvrir une terrasse carrée. Ajoute des rangées et des colonnes, jusqu’à poser les trente-six carreaux. Le nombre de carreaux, c’est l’aire.',
    },

    decouverte: {
      texte: (c) => 'Un rectangle, c’est longueur fois largeur : les rangées fois les colonnes. Un triangle, c’est la moitié d’un rectangle : base fois hauteur, divisé par deux. ' +
        'Un parallélogramme : base fois hauteur, comme un rectangle qui penche. Et un disque : le rayon fois le rayon, fois ' + c.mot('pi') + '. Il vaut environ 3,14.',
    },

    vocabulaire: {
      termes: {
        pi: { sesMots: 'le nombre magique du cercle', officiel: 'le nombre pi', lesDeux: 'le nombre magique du cercle, que l’on appelle le nombre pi' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le nombre magique du cercle. Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : le nombre pi, pour le nombre magique du cercle. On l’écrit avec une lettre grecque.',
        'Tu connais le mot officiel : le nombre pi.',
      ],
    },

    exercices: [
      {
        id: 'rectangle',
        univers: 'maison-courses',
        versions: [[5, 3], [6, 4], [2.5, 4], [8, 1.5], [12, 5], [7, 3]],
        genere(c) {
          const [l, k] = c.alea.choisir(this.versions);
          const a = r2(l * k);
          return {
            enonce: 'Une terrasse rectangulaire mesure ' + ecr(l) + ' m sur ' + ecr(k) + ' m. Quelle est son aire, en m² ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Longueur fois largeur.',
            correction: [ecr(l) + ' × ' + ecr(k) + ' = ' + ecr(a) + ' m².'],
          };
        },
      },
      {
        id: 'triangle',
        univers: 'famille',
        versions: [[6, 4], [10, 3], [8, 5], [7, 4], [12, 6], [9, 2]],
        genere(c) {
          const [b, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un fanion de fête a la forme d’un triangle. Sa base mesure ' + b + ' dm, et sa hauteur ' + h + ' dm. Quelle est son aire, en dm² ?',
            reponse: { type: 'nombre', valeur: (b * h) / 2 },
            aide: 'Base fois hauteur, puis divise par deux.',
            correction: [b + ' × ' + h + ' = ' + b * h + '.', b * h + ' ÷ 2 = ' + ecr((b * h) / 2) + ' dm².'],
          };
        },
      },
      {
        id: 'disque',
        univers: 'famille',
        versions: [[5], [6], [7], [8], [10], [4]],
        genere(c) {
          const [r] = c.alea.choisir(this.versions);
          const a = r2(3.14 * r * r);
          return {
            enonce: 'Une table ronde a un rayon de ' + r + ' dm. Quelle est l’aire de son plateau, en dm² ? Prends 3,14 pour π.',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Rayon fois rayon, puis fois 3,14.',
            aideParlee: 'Rayon fois rayon, puis fois le nombre pi.',
            correction: [r + ' × ' + r + ' = ' + r * r + '.', r * r + ' × 3,14 = ' + ecr(a) + ' dm².'],
          };
        },
      },
      {
        id: 'peinture',
        univers: 'maison-courses',
        // [longueur du mur, hauteur, m² couverts par un pot] : un nombre exact de pots
        versions: [[5, 2, 10], [6, 3, 9], [8, 3, 12], [4, 2.5, 10], [10, 3, 15], [6, 2.5, 5]],
        genere(c) {
          const [l, h, m] = c.alea.choisir(this.versions);
          const a = r2(l * h);
          return {
            enonce: 'Laure peint un mur de ' + l + ' m de long et ' + ecr(h) + ' m de haut. Un pot couvre ' + m + ' m². Combien de pots lui faut-il ?',
            reponse: { type: 'nombre', valeur: a / m },
            aide: 'Calcule l’aire du mur, puis divise par la surface couverte par un pot.',
            correction: [l + ' × ' + ecr(h) + ' = ' + ecr(a) + ' m².', ecr(a) + ' ÷ ' + m + ' = ' + a / m + (a / m > 1 ? ' pots.' : ' pot.')],
          };
        },
      },
      O.qcm('quelle-formule', 'maison-courses',
        [['un rectangle', 'Longueur × largeur', 'Les rangées fois les colonnes.'], ['un triangle', 'Base × hauteur ÷ 2', 'Un triangle est la moitié d’un rectangle.'], ['un parallélogramme', 'Base × hauteur', 'C’est un rectangle qui penche.'], ['un disque', 'π × rayon × rayon', 'Le disque utilise le nombre pi.']],
        (x) => 'Quelle formule donne l’aire d’' + x + ' ?', ['Longueur × largeur', 'Base × hauteur ÷ 2', 'π × rayon × rayon', 'Base × hauteur'],
        'Pense à la forme, et à ce qu’elle coupe dans un rectangle.'),
    ],

    defi: {
      // [longueur, largeur, rayon du bassin rond, prix au m²]
      versions: [[10, 8, 2, 2], [12, 6, 1, 3], [15, 10, 3, 2], [9, 8, 2, 3]],
      genere(c) {
        const [l, k, r, p] = c.alea.choisir(this.versions);
        const a = l * k, b = r2(3.14 * r * r), g = r2(a - b), t = r2(g * p);
        return {
          enonce: 'Le jardin de Clarisse est un rectangle de ' + l + ' m sur ' + k + ' m. Au milieu, un bassin rond a un rayon de ' + r + ' m. Elle veut semer du gazon autour du bassin, à ' + p + ' € le m². On prendra 3,14 pour π.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [10, 0], C: [10, 6], D: [0, 6], O: [5, 3] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']], cercles: [['O', 2]], description: 'Un rectangle A B C D de ' + l + ' mètres sur ' + k + ' mètres. Au centre O, un cercle de ' + r + (r < 2 ? ' mètre' : ' mètres') + ' de rayon. Le dessin n’est pas à l’échelle.' },
          questions: [
            {
              texte: 'Question 1. Calculer l’aire du jardin, en m².',
              reponse: { type: 'nombre', valeur: a },
              aide: 'Longueur fois largeur.',
              correction: [l + ' × ' + k + ' = ' + a + ' m².'],
            },
            {
              texte: 'Question 2. Calculer l’aire du bassin, en m².',
              reponse: { type: 'nombre', valeur: b },
              aide: 'Rayon fois rayon, fois 3,14.',
              aideParlee: 'Rayon fois rayon, fois le nombre pi.',
              correction: ['3,14 × ' + r + ' × ' + r + ' = ' + ecr(b) + ' m².'],
            },
            {
              texte: 'Question 3. Calculer l’aire à semer, en m².',
              reponse: { type: 'nombre', valeur: g },
              aide: 'Enlève le bassin du jardin.',
              correction: [a + ' − ' + ecr(b) + ' = ' + ecr(g) + ' m².'],
            },
            {
              texte: 'Question 4. Quel est le prix du gazon ? Rédiger le calcul, et donner le résultat en euros.',
              correction: [ecr(g) + ' × ' + p + ' = ' + ecr(t) + ' €.'],
              grille: ['As-tu repris l’aire à semer ?', 'As-tu multiplié par le prix au mètre carré ?', 'As-tu écrit l’unité, en euros ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Terrasse, fanion ou table ronde : tu sais mesurer toutes les surfaces de la maison.',
    carte: ['rectangle', 'triangle', 'quelle-formule'],
    papierDuSoir: { exercices: ['disque', 'peinture'], defi: true },
    automatismes: [
      {
        id: 'aire-rapide',
        versions: [[6, 5], [8, 3], [7, 4], [9, 2]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Aire d’un rectangle de ' + a + ' m sur ' + b + ' m, en m² ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte, le papyrus Rhind calcule l’aire d’un champ rond en partant de son diamètre.',
    prenoms: ['Laure', 'Rachel', 'Clarisse'],
  };
});
