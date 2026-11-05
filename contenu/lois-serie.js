/* Notion 5 du bloc « L'électricité » : les lois du circuit en série. La guirlande mesurée par Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r1 = (x) => Math.round(x * 10) / 10;

  return {
    id: 'lois-serie',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'Les lois du circuit en série',
    classe: '4e',
    univers: ['appareils', 'famille', 'danses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : lois d’unicité de l’intensité et d’additivité des tensions dans un circuit en série.',

    accroche: {
      texte: 'Pour la fête de danse, Rachel monte deux lampes à la suite sur une pile de 4,5 volts. Elle mesure le courant avant la première lampe, entre les deux, et après la seconde. ' +
        'Surprise : trois fois le même nombre ! Le courant ne s’use pas en route. Et les volts, comment se partagent-ils ?',
      image: { dessin: 'circuit', branches: [2], mesures: ['Le courant : le même partout.', 'Les tensions : 2,5 V + 2 V = 4,5 V.'], description: 'Deux lampes en série sur une pile. Le courant est le même partout. Les tensions des lampes, 2,5 volts et 2 volts, s’ajoutent pour donner 4,5 volts.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['I : le même nombre partout', 'U de la pile = U lampe 1 + U lampe 2', '4,5 V = 2,5 V + 2 V'], description: 'L’intensité est la même partout. La tension de la pile égale la somme des tensions des lampes : 4,5 volts égale 2,5 volts plus 2 volts.' },
      etapes: [
        'Dans une seule boucle, le courant n’a qu’un chemin. Il est donc le même partout : 0,2 A avant, entre et après les lampes.',
        'L’eau d’un tuyau sans fuite fait pareil : ce qui entre ressort.',
        'La tension de la pile, elle, se partage entre les lampes : 4,5 V = 2,5 V + 2 V.',
        'Si les lampes sont identiques, elles reçoivent la même part : 4,5 V ÷ 2 = 2,25 V chacune.',
      ],
    },

    decouverte: {
      texte: (c) => 'En série, l’intensité est la même partout. C’est ' + c.mot('unicite') + '. ' +
        'La tension de la pile se partage entre les éléments. C’est ' + c.mot('additivite') + '. ' +
        'L’astuce : un seul chemin, un seul courant. Mais les volts s’additionnent.',
    },

    vocabulaire: {
      termes: {
        unicite: { sesMots: 'la règle du même courant', officiel: 'la loi d’unicité de l’intensité', lesDeux: 'la règle du même courant, que les physiciens appellent la loi d’unicité de l’intensité' },
        additivite: { sesMots: 'la règle du partage des volts', officiel: 'la loi d’additivité des tensions', lesDeux: 'la règle du partage des volts, que les physiciens appellent la loi d’additivité des tensions' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la règle du même courant, et la règle du partage des volts. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la loi d’unicité de l’intensité, et la loi d’additivité des tensions.',
        'Tu connais les mots officiels : la loi d’unicité de l’intensité, et la loi d’additivité des tensions.',
      ],
    },

    exercices: [
      {
        id: 'meme-courant',
        univers: 'appareils',
        versions: [0.2, 0.15, 0.3, 0.25, 0.5],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          return {
            enonce: 'Deux lampes sont en série. Avant la première lampe, l’ampèremètre affiche ' + ecr(i) + ' A. Que va-t-il afficher après la seconde lampe, en ampères ?',
            reponse: { type: 'nombre', valeur: i },
            aide: 'En série, le courant est le même partout.',
            correction: ['En série, l’intensité est la même partout : ' + ecr(i) + ' A.'],
          };
        },
      },
      {
        id: 'tension-de-la-pile',
        univers: 'famille',
        // [U1, U2]
        versions: [[2.5, 2], [3, 1.5], [4, 2], [1.5, 1.5], [6, 3]],
        genere(c) {
          const [u1, u2] = c.alea.choisir(this.versions);
          const t = r1(u1 + u2);
          return {
            enonce: 'Deux lampes sont en série. L’une a ' + ecr(u1) + ' V à ses bornes, l’autre ' + ecr(u2) + ' V. Quelle est la tension de la pile, en volts ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + ecr(u1) + ' + ' + ecr(u2) + '.',
            aideParlee: 'En série, les tensions s’additionnent.',
            correction: [ecr(u1) + ' + ' + ecr(u2) + ' = ' + ecr(t) + ' V.'],
          };
        },
      },
      {
        id: 'tension-de-la-lampe',
        univers: 'danses',
        // [pile, lampe 1]
        versions: [[4.5, 2.5], [6, 3.5], [9, 5], [12, 7.5], [4.5, 3]],
        genere(c) {
          const [p, u] = c.alea.choisir(this.versions);
          const t = r1(p - u);
          return {
            enonce: 'Une pile de ' + ecr(p) + ' V alimente deux lampes en série. La première a ' + ecr(u) + ' V à ses bornes. Quelle tension a la seconde, en volts ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + ecr(p) + ' − ' + ecr(u) + '.',
            aideParlee: 'Enlève la tension de la première lampe à celle de la pile.',
            correction: [ecr(p) + ' − ' + ecr(u) + ' = ' + ecr(t) + ' V.'],
          };
        },
      },
      {
        id: 'lampes-identiques',
        univers: 'danses',
        // [pile, lampes identiques]
        versions: [[6, 2], [9, 3], [12, 4], [4.5, 3], [12, 3]],
        genere(c) {
          const [p, n] = c.alea.choisir(this.versions);
          const u = r1(p / n);
          return {
            enonce: 'Une pile de ' + ecr(p) + ' V alimente ' + n + ' lampes identiques en série. Quelle tension a chaque lampe, en volts ?',
            reponse: { type: 'nombre', valeur: u },
            aide: 'Calcule ' + ecr(p) + ' ÷ ' + n + '.',
            aideParlee: 'Des lampes identiques se partagent la tension en parts égales.',
            correction: [ecr(p) + ' ÷ ' + n + ' = ' + ecr(u) + ' V.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'appareils',
        [['En série, le courant s’use en traversant les lampes.', 'Faux'], ['En série, l’intensité est la même partout.', 'Vrai'], ['En série, la tension de la pile est la somme des tensions des autres éléments.', 'Vrai'], ['En série, chaque lampe a toute la tension de la pile.', 'Faux']],
        (x) => '« ' + x + ' » Vrai ou faux ?', ['Vrai', 'Faux'],
        'Un seul chemin, un seul courant ; les volts s’additionnent.'),
    ],

    defi: {
      // [pile, lampe 1, intensité]
      versions: [[4.5, 2.5, 0.2], [6, 3.5, 0.3], [9, 5, 0.25], [12, 7.5, 0.5]],
      genere(c) {
        const [p, u, i] = c.alea.choisir(this.versions);
        const t = r1(p - u);
        return {
          enonce: 'Pour la fête, Rachel branche deux lampes en série sur un générateur de ' + ecr(p) + ' V. Elle mesure ' + ecr(u) + ' V aux bornes de la première lampe, et ' + ecr(i) + ' A entre le générateur et cette lampe.',
          image: { dessin: 'circuit', branches: [2], description: 'Deux lampes en série sur un générateur.' },
          questions: [
            {
              texte: 'Question 1. Quelle est l’intensité du courant dans la seconde lampe, en ampères ?',
              reponse: { type: 'nombre', valeur: i },
              aide: 'En série, le courant est le même partout.',
              correction: ['Loi d’unicité : ' + ecr(i) + ' A.'],
            },
            {
              texte: 'Question 2. Quelle est la tension aux bornes de la seconde lampe, en volts ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'En série, les tensions s’additionnent.',
              correction: [ecr(p) + ' − ' + ecr(u) + ' = ' + ecr(t) + ' V.'],
            },
            {
              texte: 'Question 3. Nomme les deux lois que tu as utilisées, et écris chacune en une phrase.',
              correction: ['Loi d’unicité : en série, l’intensité est la même partout.', 'Loi d’additivité : la tension du générateur est la somme des tensions des autres éléments.'],
              grille: ['As-tu nommé la loi d’unicité ?', 'As-tu nommé la loi d’additivité ?', 'As-tu écrit des phrases complètes ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un seul chemin, un seul courant, et des volts qui se partagent : tu connais les lois de la série.',
    carte: ['meme-courant', 'tension-de-la-lampe', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['tension-de-la-pile', 'lampes-identiques'], defi: true },
    automatismes: [
      {
        id: 'somme-de-tensions',
        versions: [[2.5, 2], [3, 1.5], [4, 2], [1.5, 1.5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: ecr(a) + ' + ' + ecr(b) + ' = ?', reponse: { type: 'nombre', valeur: r1(a + b) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Italie, Alessandro Volta a construit la première pile. Il a empilé des disques de zinc et de cuivre, séparés par du tissu ou du carton imbibé.',
    prenoms: ['Rachel'],
  };
});
