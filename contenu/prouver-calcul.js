/* Notion 16 du bloc « Le calcul avec des lettres » : prouver une propriété générale par le calcul. Le pari de Rebecca.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const PREUVE = 'Non, des exemples ne prouvent rien pour tous les nombres';

  return {
    id: 'prouver-calcul',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Prouver par le calcul',
    classe: '3e',
    univers: ['famille', 'danses', 'commerce'],

    accroche: {
      texte: 'Rebecca lance un pari à Moussa : quand on additionne deux nombres impairs, on trouve toujours un nombre pair. Moussa essaie : 3 plus 5, 8. 7 plus 9, 16. ' +
        'Il dit : c’est bon, c’est prouvé ! Rebecca sourit : et les milliards de nombres que tu n’as pas essayés ? Avec des lettres, on peut parler de tous les nombres à la fois.',
      image: { dessin: 'chaine', etapes: ['Un nombre pair : 2n', 'Un nombre impair : 2n + 1', 'Deux impairs : (2n + 1) + (2m + 1)', '= 2n + 2m + 2 = 2(n + m + 1)'], description: 'Un nombre pair s’écrit 2n. Un nombre impair s’écrit 2n plus 1. Deux impairs : 2n plus 1, plus 2m plus 1. Cela fait 2n plus 2m plus 2, soit 2 fois n plus m plus 1.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Des exemples : ça donne une idée', 'Un contre-exemple : la phrase est fausse', 'Un calcul avec des lettres : la phrase est prouvée'], description: 'Des exemples donnent une idée. Un seul contre-exemple prouve que la phrase est fausse. Un calcul avec des lettres prouve la phrase pour tous les nombres.' },
      etapes: [
        'Un nombre pair, c’est le double d’un nombre entier : on l’écrit 2n, où n est un nombre entier.',
        'Un nombre impair, c’est un nombre pair plus 1 : on l’écrit 2n + 1.',
        'Deux impairs : 2n + 1 et 2m + 1. Leur somme : 2n + 2m + 2 = 2(n + m + 1). C’est le double d’un nombre entier : c’est pair.',
        'Le calcul marche pour tous les nombres entiers n et m. Des exemples, même très nombreux, n’auraient rien prouvé.',
        'À l’inverse, pour prouver qu’une phrase est fausse, un seul contre-exemple suffit.',
      ],
    },

    decouverte: {
      texte: (c) => 'Essayer des exemples donne une idée, mais ne prouve rien pour tous les nombres. Pour prouver, on écrit le calcul avec des lettres : c’est ' + c.mot('demonstration') + '. ' +
        'Pour montrer qu’une phrase est fausse, un seul exemple qui ne marche pas suffit. C’est ' + c.mot('contre') + '. ' +
        'L’astuce : pair, c’est 2n ; impair, c’est 2n plus 1 ; multiple de 3, c’est 3n.',
    },

    vocabulaire: {
      termes: {
        demonstration: { sesMots: 'le calcul qui prouve', officiel: 'une démonstration', lesDeux: 'le calcul qui prouve, que les matheux appellent une démonstration' },
        contre: { sesMots: 'l’exemple qui casse tout', officiel: 'un contre-exemple', lesDeux: 'l’exemple qui casse tout, que les matheux appellent un contre-exemple' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le calcul qui prouve, et l’exemple qui casse tout. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une démonstration, et un contre-exemple.',
        'Tu connais les mots officiels : une démonstration, et un contre-exemple.',
      ],
    },

    exercices: [
      O.qcm('quelle-ecriture', 'famille',
        [['un nombre pair', '2n'], ['un nombre impair', '2n + 1'], ['un multiple de 3', '3n'], ['un multiple de 5', '5n']],
        (x) => 'n est un nombre entier. Comment écrire ' + x + ' ?', ['2n', '2n + 1', '3n', '5n'],
        'Pair : le double. Impair : le double, plus 1. Multiple : le nombre, fois n.'),
      O.qcm('des-exemples-suffisent', 'danses',
        [['Moussa a essayé 10 exemples, et ça marche à chaque fois. A-t-il prouvé que c’est vrai pour tous les nombres ?', PREUVE], ['Rebecca a essayé 100 exemples, et ça marche à chaque fois. A-t-elle prouvé que c’est vrai pour tous les nombres ?', PREUVE]],
        (x) => x, [PREUVE, 'Oui, 10 exemples suffisent toujours', 'Oui, à partir de 100 exemples, c’est prouvé'],
        'Il reste tous les nombres qu’on n’a pas essayés.'),
      {
        id: 'contre-exemple',
        univers: 'commerce',
        // [phrase, contre-exemple, deux nombres qui ne contredisent pas]
        versions: [
          ['Tous les nombres premiers sont impairs.', '2', '3', '5'],
          ['Tous les multiples de 4 sont des multiples de 8.', '12', '8', '16'],
          ['Le carré d’un nombre est toujours plus grand que ce nombre.', '1', '2', '3'],
          ['Un nombre impair plus 2 est toujours un nombre pair.', '5', '4', '6'],
        ],
        genere(c) {
          const [p, ce, u, v] = c.alea.choisir(this.versions);
          return {
            enonce: '« ' + p + ' » Quel nombre prouve que cette phrase est fausse ?',
            reponse: O.choix(c.alea, ce, [u, v]),
            aide: 'Essaie chaque nombre proposé dans la phrase.',
            correction: ['Avec ' + ce + ', la phrase ne marche pas : c’est un contre-exemple.', 'Réponse : ' + ce + '.'],
          };
        },
      },
      {
        id: 'somme-de-deux-pairs',
        univers: 'famille',
        // [n, m]
        versions: [[3, 4], [5, 2], [7, 6], [8, 1], [9, 3]],
        genere(c) {
          const [n, m] = c.alea.choisir(this.versions);
          return {
            enonce: '2n + 2m = 2(n + m). Pour n = ' + n + ' et m = ' + m + ', combien vaut n + m, le nombre entier dont cette somme est le double ?',
            reponse: { type: 'nombre', valeur: n + m },
            aide: 'Calcule ' + n + ' + ' + m + '.',
            aideParlee: 'Additionne les deux nombres entiers.',
            correction: [n + ' + ' + m + ' = ' + (n + m) + '.', '2 × ' + (n + m) + ' = ' + 2 * (n + m) + ' : c’est bien un nombre pair.'],
          };
        },
      },
      {
        id: 'trois-entiers',
        univers: 'commerce',
        versions: [4, 7, 10, 12, 15, 20],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Trois nombres entiers qui se suivent s’écrivent n, n + 1, n + 2. Leur somme vaut 3n + 3 = 3(n + 1). Pour n = ' + n + ', calcule cette somme.',
            reponse: { type: 'nombre', valeur: 3 * (n + 1) },
            aide: 'Calcule 3 × (' + n + ' + 1).',
            aideParlee: 'Ajoute un, puis multiplie par trois.',
            correction: ['3 × (' + n + ' + 1) = 3 × ' + (n + 1) + ' = ' + 3 * (n + 1) + '.'],
          };
        },
      },
    ],

    defi: {
      // [n, m] pour l'exemple
      versions: [[3, 5], [7, 2], [4, 8], [6, 9]],
      genere(c) {
        const [n, m] = c.alea.choisir(this.versions);
        const a = 2 * n + 1, b = 2 * m + 1;
        return {
          enonce: 'Rebecca affirme : « La somme de deux nombres impairs est toujours un nombre pair. » On écrit les deux nombres impairs 2n + 1 et 2m + 1, où n et m sont des nombres entiers.',
          questions: [
            {
              texte: 'Question 1. Pour n = ' + n + ' et m = ' + m + ', calcule la somme des deux nombres impairs.',
              reponse: { type: 'nombre', valeur: a + b },
              aide: 'Remplace n et m, puis additionne.',
              correction: ['2 × ' + n + ' + 1 = ' + a + ' ; 2 × ' + m + ' + 1 = ' + b + '.', a + ' + ' + b + ' = ' + (a + b) + '.'],
            },
            {
              texte: 'Question 2. Moussa dit que cet exemple suffit à prouver la phrase de Rebecca. A-t-il raison ?',
              reponse: O.choix(c.alea, PREUVE, [PREUVE, 'Oui, un exemple suffit à tout prouver']),
              aide: 'Pense à tous les nombres qu’on n’a pas essayés.',
              correction: ['Réponse : ' + PREUVE + '.'],
            },
            {
              texte: 'Question 3. Démontre la phrase de Rebecca par le calcul, avec n et m.',
              correction: ['(2n + 1) + (2m + 1) = 2n + 2m + 2 = 2(n + m + 1).', 'n + m + 1 est un nombre entier : la somme est le double d’un nombre entier, elle est paire.'],
              grille: ['As-tu écrit la somme avec n et m ?', 'As-tu fait apparaître 2 fois un nombre entier ?', 'As-tu conclu que la somme est paire ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Des lettres pour parler de tous les nombres à la fois : tu sais prouver, comme une vraie matheuse.',
    carte: ['quelle-ecriture', 'des-exemples-suffisent', 'contre-exemple'],
    papierDuSoir: { exercices: ['somme-de-deux-pairs', 'trois-entiers'], defi: true },
    automatismes: [
      {
        id: 'pair-ou-impair',
        versions: [14, 27, 36, 51],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return { enonce: n + ' est-il pair ou impair ?', reponse: O.choix(c.alea, n % 2 === 0 ? 'Pair' : 'Impair', ['Pair', 'Impair']) };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? À Alexandrie, en Égypte, Euclide a rassemblé les preuves de son temps dans Les Éléments. Ce livre a été au centre de l’enseignement des maths pendant deux mille ans.',
    prenoms: ['Rebecca', 'Moussa'],
  };
});
