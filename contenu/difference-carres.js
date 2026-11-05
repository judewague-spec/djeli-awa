/* Notion 8 du bloc « Le calcul avec des lettres » : (a + b)(a − b) et a² − b². Le calcul malin de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr2 } = O;

  return {
    id: 'difference-carres',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Somme fois différence : a² − b²',
    classe: '3e',
    univers: ['commerce', 'maison-courses', 'famille'],

    accroche: {
      texte: 'Au marché, Moussa vend 102 sacs à 98 euros. Il donne le total de tête, avant que Rachel ait sorti sa calculatrice : 9 996 euros ! ' +
        'Quel est son secret ? 102, c’est 100 plus 2. Et 98, c’est 100 moins 2. Quand deux parenthèses se ressemblent ainsi, un calcul disparaît.',
      image: { dessin: 'aires', lignes: ['a', '−b'], colonnes: ['a', 'b'], cases: [['a²', 'ab'], ['−ab', '−b²']], description: 'Quatre cases : a carré, ab, moins ab, et moins b carré. Les deux cases ab et moins ab s’annulent.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['(a + b)(a − b)', 'a² − ab + ab − b²', '− ab et + ab s’annulent', 'a² − b²'], description: 'On développe a plus b, fois a moins b. On obtient a carré moins ab plus ab moins b carré. Moins ab et plus ab s’annulent. Il reste a carré moins b carré.' },
      etapes: [
        'On développe avec les quatre cases : (a + b)(a − b) = a² − ab + ab − b².',
        'Les deux termes du milieu s’annulent : − ab + ab = 0.',
        'Il reste a² − b². Cela marche pour tous les nombres a et b.',
        'Moussa : 102 × 98 = (100 + 2)(100 − 2) = 100² − 2² = 10 000 − 4 = 9 996.',
        'Dans l’autre sens, on factorise : x² − 9 = x² − 3² = (x + 3)(x − 3).',
      ],
    },

    decouverte: {
      texte: (c) => 'Quand on multiplie une somme par la même différence, les termes du milieu s’annulent. Il reste le carré du premier, moins le carré du second. C’est ' + c.mot('difference') + '. ' +
        'Cette égalité marche pour tous les nombres. C’est ' + c.mot('identite') + '. ' +
        'L’astuce : même début, même fin, un plus et un moins. Alors, plus de calcul au milieu.',
    },

    vocabulaire: {
      termes: {
        difference: { sesMots: 'le carré moins le carré', officiel: 'une différence de deux carrés', lesDeux: 'le carré moins le carré, que les matheux appellent une différence de deux carrés' },
        identite: { sesMots: 'une égalité toujours vraie', officiel: 'une identité remarquable', lesDeux: 'une égalité toujours vraie, que les matheux appellent une identité remarquable' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le carré moins le carré, et une égalité toujours vraie. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une différence de deux carrés, et une identité remarquable.',
        'Tu connais les mots officiels : une différence de deux carrés, et une identité remarquable. a plus b, fois a moins b, égale a carré moins b carré.',
      ],
    },

    exercices: [
      {
        id: 'developper',
        univers: 'maison-courses',
        versions: [3, 5, 2, 7, 4, 9],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const bonne = expr2(1, 0, -a * a);
          return {
            enonce: 'Développe (x + ' + a + ')(x − ' + a + ').',
            reponse: O.choix(c.alea, bonne, [expr2(1, 0, a * a), expr2(1, 2 * a, -a * a), expr2(1, -2 * a, a * a)]),
            aide: 'Le carré du premier, moins le carré du second.',
            correction: ['(x + ' + a + ')(x − ' + a + ') = x² − ' + a + '² = ' + bonne + '.'],
          };
        },
      },
      {
        id: 'factoriser',
        univers: 'famille',
        versions: [4, 9, 16, 25, 36, 49],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const r = Math.round(Math.sqrt(n));
          const bonne = '(x + ' + r + ')(x − ' + r + ')';
          return {
            enonce: 'Factorise x² − ' + n + '.',
            reponse: O.choix(c.alea, bonne, ['(x + ' + r + ')(x + ' + r + ')', '(x − ' + r + ')(x − ' + r + ')', '(x + ' + n + ')(x − ' + n + ')']),
            aide: 'Écris ' + n + ' comme un carré.',
            aideParlee: 'Écris le nombre comme un carré, puis utilise le carré moins le carré.',
            correction: [n + ' = ' + r + '².', 'x² − ' + r + '² = ' + bonne + '.'],
          };
        },
      },
      {
        id: 'calcul-malin',
        univers: 'commerce',
        // [n, d] : (n + d)(n − d)
        versions: [[100, 2], [100, 3], [50, 1], [100, 1], [30, 2], [20, 3]],
        genere(c) {
          const [n, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa vend ' + (n + d) + ' sacs à ' + (n - d) + ' euros. Calcule ' + (n + d) + ' × ' + (n - d) + ' de tête.',
            reponse: { type: 'nombre', valeur: (n + d) * (n - d) },
            aide: 'Écris (' + n + ' + ' + d + ')(' + n + ' − ' + d + ') : cela fait ' + n + '² − ' + d + '².',
            aideParlee: 'Écris le calcul avec un nombre rond, plus et moins le même écart. Puis le carré moins le carré.',
            correction: [n + '² − ' + d + '² = ' + n * n + ' − ' + d * d + ' = ' + (n + d) * (n - d) + ' euros.'],
          };
        },
      },
      {
        id: 'carre-moins-carre',
        univers: 'maison-courses',
        // [a, b]
        versions: [[15, 5], [12, 8], [17, 3], [13, 7], [25, 5]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule de tête ' + a + '² − ' + b + '², en écrivant (' + a + ' + ' + b + ')(' + a + ' − ' + b + ').',
            reponse: { type: 'nombre', valeur: (a + b) * (a - b) },
            aide: 'Calcule ' + (a + b) + ' × ' + (a - b) + '.',
            aideParlee: 'Calcule la somme, puis la différence, puis multiplie-les.',
            correction: ['(' + a + ' + ' + b + ')(' + a + ' − ' + b + ') = ' + (a + b) + ' × ' + (a - b) + ' = ' + (a + b) * (a - b) + '.'],
          };
        },
      },
      O.qcm('la-reconnaitre', 'famille',
        [['x² − 25', 'Oui, ce nombre est un carré'], ['x² − 49', 'Oui, ce nombre est un carré'], ['x² − 7', 'Non, ce nombre n’est pas le carré d’un nombre entier'], ['x² − 15', 'Non, ce nombre n’est pas le carré d’un nombre entier']],
        (x) => 'Peut-on factoriser ' + x + ' avec des nombres entiers, en utilisant le carré moins le carré ?', ['Oui, ce nombre est un carré', 'Non, ce nombre n’est pas le carré d’un nombre entier'],
        'Le second nombre doit être le carré d’un nombre entier.'),
    ],

    defi: {
      // [côté du grand carré x, côté du petit carré a]
      versions: [[10, 3], [12, 2], [15, 5], [8, 3]],
      genere(c) {
        const [x, a] = c.alea.choisir(this.versions);
        const bonne = '(x + ' + a + ')(x − ' + a + ')';
        return {
          enonce: 'Dans une nappe carrée de côté x cm, Clarisse découpe un petit carré de côté ' + a + ' cm, dans un coin. Il reste une aire x² − ' + a * a + '.',
          questions: [
            {
              texte: 'Question 1. Factorise x² − ' + a * a + '.',
              reponse: O.choix(c.alea, bonne, ['(x − ' + a + ')(x − ' + a + ')', '(x + ' + a * a + ')(x − ' + a * a + ')']),
              aide: 'Écris le nombre comme un carré.',
              correction: [a * a + ' = ' + a + '². Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 2. Calcule l’aire restante pour x = ' + x + ', en centimètres carrés, avec la forme factorisée.',
              reponse: { type: 'nombre', valeur: (x + a) * (x - a) },
              aide: 'Remplace x dans la forme factorisée, puis calcule.',
              correction: ['(' + x + ' + ' + a + ')(' + x + ' − ' + a + ') = ' + (x + a) + ' × ' + (x - a) + ' = ' + (x + a) * (x - a) + '.'],
            },
            {
              texte: 'Question 3. Vérifie ce résultat avec x² − ' + a * a + ', et explique pourquoi les deux calculs donnent le même nombre.',
              correction: [x + '² − ' + a * a + ' = ' + x * x + ' − ' + a * a + ' = ' + (x * x - a * a) + '.', 'Les deux formes sont égales pour tous les nombres : c’est une identité remarquable.'],
              grille: ['As-tu fait le second calcul ?', 'As-tu dit que l’égalité est vraie pour tous les nombres ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Même début, même fin, un plus et un moins : tu calcules aussi vite que Moussa.',
    carte: ['developper', 'factoriser', 'calcul-malin'],
    papierDuSoir: { exercices: ['factoriser', 'carre-moins-carre'], defi: true },
    automatismes: [
      {
        id: 'carres-rapides',
        versions: [2, 3, 5, 7],
        genere(c) { const a = c.alea.choisir(this.versions); return { enonce: a + '² = ?', reponse: { type: 'nombre', valeur: a * a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Babylone, dans l’actuel Irak, une table de carrés suffisait pour multiplier. On prenait la différence de deux carrés, puis son quart.',
    prenoms: ['Moussa', 'Rachel', 'Clarisse'],
  };
});
