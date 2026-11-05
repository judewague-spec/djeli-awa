/* Notion 6 du bloc « L'électricité » : les lois du circuit en dérivation. Les deux branches de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'lois-derivation',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'Les lois du circuit en dérivation',
    classe: '4e',
    univers: ['maison-courses', 'appareils', 'champetre'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : lois d’additivité des intensités et d’égalité des tensions dans un circuit en dérivation.',

    accroche: {
      texte: 'Dans le champ, un grand canal d’irrigation se partage en deux petits canaux. L’eau de chaque petit canal vient du grand : le grand porte toute l’eau. ' +
        'Clarisse branche deux lampes en dérivation sur une pile. Elle mesure le courant : il se passe la même chose qu’avec le canal !',
      image: { dessin: 'circuit', branches: [1, 1], mesures: ['Le courant se partage : 0,5 A = 0,3 A + 0,2 A.', 'Même tension sur chaque boucle.'], description: 'Deux lampes en dérivation sur une pile. Le courant principal, 0,5 ampère, se partage en 0,3 ampère et 0,2 ampère. Chaque boucle a la même tension.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['I principale = I1 + I2', '0,5 A = 0,3 A + 0,2 A', 'Même U sur chaque branche'], description: 'L’intensité principale égale la somme des intensités des branches : 0,5 ampère égale 0,3 ampère plus 0,2 ampère. Chaque branche a la même tension.' },
      etapes: [
        'À l’endroit où le fil se sépare, le courant se partage entre les branches, comme l’eau du canal.',
        'La branche qui part de la pile porte tout le courant : 0,5 A = 0,3 A + 0,2 A.',
        'Sur chaque branche, on mesure la même tension que celle de la pile : 4,5 V, puis 4,5 V.',
        'Voilà pourquoi tous les appareils de la maison reçoivent la même tension.',
      ],
    },

    decouverte: {
      texte: (c) => 'En dérivation, le courant se partage. C’est ' + c.mot('additivite') + '. ' +
        'Chaque branche a la même tension. C’est ' + c.mot('egalite') + '. ' +
        'L’astuce : c’est le contraire de la série. En série, le courant reste le même et les volts se partagent. En dérivation, les volts restent les mêmes et le courant se partage.',
    },

    vocabulaire: {
      termes: {
        additivite: { sesMots: 'la règle du partage du courant', officiel: 'la loi d’additivité des intensités', lesDeux: 'la règle du partage du courant, que les physiciens appellent la loi d’additivité des intensités' },
        egalite: { sesMots: 'la règle des mêmes volts', officiel: 'la loi d’égalité des tensions', lesDeux: 'la règle des mêmes volts, que les physiciens appellent la loi d’égalité des tensions' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la règle du partage du courant, et la règle des mêmes volts. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la loi d’additivité des intensités, et la loi d’égalité des tensions.',
        'Tu connais les mots officiels : la loi d’additivité des intensités, et la loi d’égalité des tensions, en dérivation.',
      ],
    },

    exercices: [
      {
        id: 'courant-principal',
        univers: 'appareils',
        // [I1, I2]
        versions: [[0.3, 0.2], [0.5, 0.25], [0.4, 0.4], [1.2, 0.3], [0.15, 0.35]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const t = r2(a + b);
          return {
            enonce: 'Deux lampes sont en dérivation. Une branche est traversée par ' + ecr(a) + ' A, l’autre par ' + ecr(b) + ' A. Quelle est l’intensité du courant principal, en ampères ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + ecr(a) + ' + ' + ecr(b) + '.',
            aideParlee: 'En dérivation, les intensités des branches s’additionnent.',
            correction: [ecr(a) + ' + ' + ecr(b) + ' = ' + ecr(t) + ' A.'],
          };
        },
      },
      {
        id: 'courant-de-branche',
        univers: 'maison-courses',
        // [principal, I1]
        versions: [[0.5, 0.3], [1, 0.4], [0.75, 0.25], [2, 1.5], [0.6, 0.2]],
        genere(c) {
          const [p, a] = c.alea.choisir(this.versions);
          const t = r2(p - a);
          return {
            enonce: 'Le courant principal vaut ' + ecr(p) + ' A. Une des deux branches est traversée par ' + ecr(a) + ' A. Quelle est l’intensité dans l’autre branche, en ampères ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + ecr(p) + ' − ' + ecr(a) + '.',
            aideParlee: 'Enlève le courant d’une branche au courant principal.',
            correction: [ecr(p) + ' − ' + ecr(a) + ' = ' + ecr(t) + ' A.'],
          };
        },
      },
      {
        id: 'meme-tension',
        univers: 'appareils',
        versions: [4.5, 6, 9, 12, 1.5],
        genere(c) {
          const u = c.alea.choisir(this.versions);
          return {
            enonce: 'Deux lampes sont en dérivation sur une pile de ' + ecr(u) + ' V. Quelle tension y a-t-il aux bornes de chaque lampe, en volts ?',
            reponse: { type: 'nombre', valeur: u },
            aide: 'En dérivation, chaque branche a la même tension.',
            correction: ['Loi d’égalité des tensions : ' + ecr(u) + ' V.'],
          };
        },
      },
      {
        id: 'branches-identiques',
        univers: 'champetre',
        // [principal, branches identiques]
        versions: [[0.9, 3], [1.2, 2], [1, 4], [1.5, 3], [0.8, 2]],
        genere(c) {
          const [p, n] = c.alea.choisir(this.versions);
          const t = r2(p / n);
          return {
            enonce: 'Un courant principal de ' + ecr(p) + ' A se partage entre ' + n + ' branches identiques. Quelle est l’intensité dans chaque branche, en ampères ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + ecr(p) + ' ÷ ' + n + '.',
            aideParlee: 'Des branches identiques se partagent le courant en parts égales.',
            correction: [ecr(p) + ' ÷ ' + n + ' = ' + ecr(t) + ' A.'],
          };
        },
      },
      O.qcm('serie-ou-derivation', 'maison-courses',
        [['Le courant est le même partout.', 'En série'], ['Les tensions des lampes sont égales à celle de la pile.', 'En dérivation'], ['Les intensités des branches s’additionnent.', 'En dérivation'], ['Les tensions s’additionnent pour donner celle de la pile.', 'En série']],
        (x) => '« ' + x + ' » Dans quel circuit cette phrase est-elle vraie ?', ['En série', 'En dérivation'],
        'Une seule boucle, ou plusieurs branches ?'),
    ],

    defi: {
      // [U pile, I branche 1, I branche 2]
      versions: [[4.5, 0.3, 0.2], [6, 0.5, 0.25], [9, 0.4, 0.4], [12, 1.2, 0.3]],
      genere(c) {
        const [u, a, b] = c.alea.choisir(this.versions);
        const t = r2(a + b);
        return {
          enonce: 'Clarisse branche deux lampes en dérivation sur un générateur de ' + ecr(u) + ' V. Elle mesure ' + ecr(a) + ' A dans la première branche et ' + ecr(b) + ' A dans la seconde.',
          image: { dessin: 'circuit', branches: [1, 1], description: 'Deux lampes en dérivation, chacune sur sa branche, reliées à un générateur.' },
          questions: [
            {
              texte: 'Question 1. Quelle est l’intensité du courant qui sort du générateur, en ampères ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Les intensités des branches s’additionnent.',
              correction: [ecr(a) + ' + ' + ecr(b) + ' = ' + ecr(t) + ' A.'],
            },
            {
              texte: 'Question 2. Quelle est la tension aux bornes de la seconde lampe, en volts ?',
              reponse: { type: 'nombre', valeur: u },
              aide: 'En dérivation, chaque branche a la même tension.',
              correction: ['Loi d’égalité des tensions : ' + ecr(u) + ' V.'],
            },
            {
              texte: 'Question 3. Pourquoi branche-t-on les appareils d’une maison en dérivation ? Donne deux raisons.',
              correction: ['Chaque appareil reçoit la même tension.', 'Si un appareil s’arrête, les autres continuent de fonctionner.'],
              grille: ['As-tu parlé de la même tension ?', 'As-tu dit que les autres appareils continuent ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le courant se partage, les volts restent les mêmes : tu comprends le câblage de ta maison.',
    carte: ['courant-principal', 'courant-de-branche', 'serie-ou-derivation'],
    papierDuSoir: { exercices: ['courant-de-branche', 'branches-identiques'], defi: true },
    automatismes: [
      {
        id: 'somme-de-courants',
        versions: [[0.3, 0.2], [0.5, 0.25], [0.4, 0.4], [1.2, 0.3]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: ecr(a) + ' + ' + ecr(b) + ' = ?', reponse: { type: 'nombre', valeur: r2(a + b) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 1845, l’Allemand Gustav Kirchhoff a donné les lois des circuits à plusieurs boucles.',
    prenoms: ['Clarisse'],
  };
});
