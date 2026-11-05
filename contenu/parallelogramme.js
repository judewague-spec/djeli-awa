/* Notion 3 du bloc « Mesures, géométrie et espace » : le parallélogramme. Le portillon de Laure, qui penche.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const PAR = 'C’est un parallélogramme', RIEN = 'On ne peut pas l’affirmer';

  return {
    id: 'parallelogramme',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Le parallélogramme',
    classe: '5e',
    univers: ['maison-courses', 'famille'],

    accroche: {
      texte: 'Le portillon de Laure s’est affaissé. Il n’a plus d’angle droit, il penche. Pourtant, ses côtés face à face restent parallèles, et de même longueur. ' +
        'Rachel le regarde : ce n’est plus un rectangle. C’est un parallélogramme.',
      image: { dessin: 'figure', points: { A: [0, 0], B: [5, 0], C: [7, 3], D: [2, 3] }, segments: [['A', 'B', '50 cm'], ['B', 'C', '30 cm'], ['C', 'D', '50 cm'], ['D', 'A', '30 cm']], pointilles: [['A', 'C'], ['B', 'D']], description: 'Un parallélogramme A B C D. A B et D C mesurent 50 centimètres. B C et A D mesurent 30 centimètres. Les diagonales A C et B D, en pointillés, se coupent en leur milieu.' },
    },

    manipulation: {
      etapes: [
        'Imagine quatre baguettes, deux de 50 centimètres et deux de 30, attachées par les bouts.',
        'Pousse le cadre sur le côté : il penche, mais les côtés face à face restent parallèles.',
        'Tends deux fils d’un coin à l’autre. Ils se croisent juste au milieu de chacun.',
        'Regarde deux coins opposés : ils s’ouvrent exactement autant.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans un parallélogramme, les côtés en face sont parallèles et de même longueur. Les angles en face sont égaux. Deux angles voisins font 180 degrés. ' +
        'Et ' + c.mot('diagonales') + ' se coupent en leur milieu : c’est ' + c.mot('centre') + '.',
    },

    vocabulaire: {
      termes: {
        diagonales: { sesMots: 'les fils tendus d’un coin à l’autre', officiel: 'les diagonales', lesDeux: 'les fils tendus, ou diagonales,' },
        centre: { sesMots: 'le point de croisement', officiel: 'le centre de symétrie', lesDeux: 'le point de croisement, appelé le centre de symétrie' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les fils tendus d’un coin à l’autre, et le point de croisement. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : les diagonales, pour les fils tendus. Et le point de croisement s’appelle le centre de symétrie.',
        'Tu connais les mots officiels : les diagonales, et le centre de symétrie.',
      ],
    },

    exercices: [
      {
        id: 'cote-en-face',
        univers: 'maison-courses',
        versions: [[50, 30], [45, 20], [80, 35], [12, 7], [2.5, 1.5], [60, 25]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'ABCD est un parallélogramme, avec AB = ' + ecr(a) + ' cm et BC = ' + ecr(b) + ' cm. Combien mesure DC, en cm ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'DC est le côté en face de AB.',
            correction: ['Les côtés en face ont la même longueur.', 'DC = AB = ' + ecr(a) + ' cm.'],
          };
        },
      },
      {
        id: 'perimetre',
        univers: 'famille',
        versions: [[50, 30], [45, 20], [80, 35], [12, 7], [2.5, 1.5], [60, 25]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const p = r2(2 * (a + b));
          return {
            enonce: 'Rachel peint le tour d’un cadre en parallélogramme, de côtés ' + ecr(a) + ' cm et ' + ecr(b) + ' cm. Quel est le périmètre de ce cadre, en cm ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Il y a deux côtés de chaque longueur. Ajoute les deux longueurs, puis double.',
            correction: [ecr(a) + ' + ' + ecr(b) + ' = ' + ecr(r2(a + b)) + ' cm.', ecr(r2(a + b)) + ' × 2 = ' + ecr(p) + ' cm.'],
          };
        },
      },
      {
        id: 'angle-oppose',
        univers: 'maison-courses',
        versions: [[60], [70], [110], [125], [45], [100]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          return {
            enonce: 'ABCD est un parallélogramme. L’angle en A mesure ' + a + '°. Combien mesure l’angle en C, en degrés ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'A et C sont des coins opposés.',
            correction: ['Les angles opposés sont égaux.', 'L’angle en C mesure ' + a + '°.'],
          };
        },
      },
      {
        id: 'angle-voisin',
        univers: 'famille',
        versions: [[60], [70], [110], [125], [45], [100]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          return {
            enonce: 'ABCD est un parallélogramme. L’angle en A mesure ' + a + '°. Combien mesure l’angle en B, en degrés ?',
            reponse: { type: 'nombre', valeur: 180 - a },
            aide: 'A et B sont des coins voisins. Ensemble, ils font un demi-tour.',
            correction: ['Deux angles voisins font 180°.', '180 − ' + a + ' = ' + (180 - a) + '°.'],
          };
        },
      },
      O.qcm('reconnaitre', 'maison-courses',
        [['ses diagonales se coupent en leur milieu', PAR, 'Des diagonales qui se coupent en leur milieu : c’est un parallélogramme.'],
          ['ses côtés opposés sont parallèles deux à deux', PAR, 'C’est la définition du parallélogramme.'],
          ['ses côtés opposés ont la même longueur deux à deux', PAR, 'Un quadrilatère non croisé dont les côtés opposés sont égaux est un parallélogramme.'],
          ['deux de ses côtés sont parallèles', RIEN, 'Deux côtés parallèles, ce n’est pas assez : un trapèze aussi en a deux.'],
          ['deux de ses côtés voisins ont la même longueur', RIEN, 'Deux côtés voisins égaux ne disent rien sur les côtés en face.']],
        (x) => 'Un quadrilatère non croisé est tel que ' + x + '. Que peut-on conclure ?', [PAR, RIEN],
        'Pense au portillon qui penche. Cette seule information suffit-elle ?'),
    ],

    defi: {
      // [AB, BC, angle A, longueur de AC] : AC² = AB² + BC² + 2 × AB × BC × cos A, des mesures qui vont ensemble
      versions: [[5, 3, 60, 7], [8, 7, 60, 13], [8, 5, 120, 7], [8, 3, 120, 7]],
      genere(c) {
        const [a, b, ang, ac] = c.alea.choisir(this.versions);
        return {
          enonce: 'ABCD est un parallélogramme de centre O. On donne AB = ' + a + ' cm, BC = ' + b + ' cm, AC = ' + ac + ' cm, et l’angle en A mesure ' + ang + '°.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [5, 0], C: [7, 3], D: [2, 3], O: [3.5, 1.5] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']], pointilles: [['A', 'C'], ['B', 'D']], description: 'Un parallélogramme A B C D. Ses diagonales se coupent en O. A B mesure ' + a + ' centimètres, B C ' + b + ' centimètres, A C ' + ac + ' centimètres. L’angle en A mesure ' + ang + ' degrés. Le dessin n’est pas à l’échelle.' },
          questions: [
            {
              texte: 'Question 1. Calculer le périmètre de ABCD, en cm.',
              reponse: { type: 'nombre', valeur: 2 * (a + b) },
              aide: 'Deux côtés de chaque longueur.',
              correction: ['2 × (' + a + ' + ' + b + ') = ' + 2 * (a + b) + ' cm.'],
            },
            {
              texte: 'Question 2. Calculer la longueur AO, en cm.',
              reponse: { type: 'nombre', valeur: ac / 2 },
              aide: 'Les diagonales se coupent en leur milieu.',
              correction: ['O est le milieu de [AC].', 'AO = ' + ac + ' ÷ 2 = ' + ecr(ac / 2) + ' cm.'],
            },
            {
              texte: 'Question 3. Calculer la mesure de l’angle en B, en degrés.',
              reponse: { type: 'nombre', valeur: 180 - ang },
              aide: 'A et B sont deux angles voisins.',
              correction: ['180 − ' + ang + ' = ' + (180 - ang) + '°.'],
            },
            {
              texte: 'Question 4. Quelle est la mesure de l’angle en D ? Justifier en citant la propriété utilisée.',
              correction: ['Les angles opposés d’un parallélogramme sont égaux.', 'B et D sont opposés, donc l’angle en D mesure ' + (180 - ang) + '°.'],
              grille: ['As-tu donné la bonne mesure ?', 'As-tu dit que B et D sont opposés ?', 'As-tu cité la propriété des angles opposés ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Même quand le portillon penche, tu sais tout ce qui reste vrai.',
    carte: ['cote-en-face', 'angle-oppose', 'reconnaitre'],
    papierDuSoir: { exercices: ['perimetre', 'angle-voisin'], defi: true },
    automatismes: [
      {
        id: 'demi-tour',
        versions: [[70], [110], [45], [135]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: '180 − ' + a + ' = ?', reponse: { type: 'nombre', valeur: 180 - a } }; },
      },
    ],
    savaisTu: null,
    prenoms: ['Laure', 'Rachel'],
  };
});
