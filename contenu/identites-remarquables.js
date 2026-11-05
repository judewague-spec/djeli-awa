/* Notion 9 du bloc « Le calcul avec des lettres » : les identités (a + b)² et (a − b)². Le carré de terrasse de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr2 } = O;

  return {
    id: 'identites-remarquables',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Le carré d’une somme et d’une différence',
    classe: 'ancien programme',
    univers: ['maison-courses', 'commerce', 'famille'],

    accroche: {
      texte: 'Laure a un jardin carré de x mètres de côté. Elle l’agrandit de 3 mètres, dans les deux sens. Le jardin reste carré. ' +
        'Rachel écrit vite : x au carré plus 9. Laure sourit, et dessine. Où sont passées les deux grandes bandes le long des côtés ?',
      image: { dessin: 'aires', lignes: ['x', '3'], colonnes: ['x', '3'], cases: [['x²', '3x'], ['3x', '9']], description: 'Un grand carré coupé en quatre : x carré, 3x, 3x et 9. Il y a bien deux bandes de 3x.' },
    },

    manipulation: {
      image: { dessin: 'aires', lignes: ['a', 'b'], colonnes: ['a', 'b'], cases: [['a²', 'ab'], ['ab', 'b²']], description: 'Un carré coupé en quatre : a carré, ab, ab et b carré.' },
      etapes: [
        '(a + b)², c’est (a + b)(a + b). Les quatre cases donnent a² + ab + ab + b².',
        'On réduit : (a + b)² = a² + 2ab + b². Le terme du milieu est le double produit.',
        'Avec un moins : (a − b)² = a² − 2ab + b². Le dernier terme reste positif.',
        'Attention : (x + 3)² n’est pas x² + 9. Il manque le double produit, 6x.',
        'Calcul malin : 101² = (100 + 1)² = 10 000 + 200 + 1 = 10 201.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le carré d’une somme donne trois termes : le carré du premier et le carré du second. Entre les deux : ' + c.mot('double') + '. ' +
        'Pour le carré d’une différence, ce terme du milieu est négatif. Ces égalités sont des ' + c.mot('identites') + '. ' +
        'L’astuce : carré, double produit, carré. N’oublie jamais celui du milieu.',
    },

    vocabulaire: {
      termes: {
        double: { sesMots: 'les deux bandes', officiel: 'le double produit', lesDeux: 'les deux bandes, que les matheux appellent le double produit' },
        identites: { sesMots: 'égalités toujours vraies', officiel: 'identités remarquables', lesDeux: 'égalités toujours vraies, que les matheux appellent identités remarquables' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les deux bandes, et les égalités toujours vraies. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : le double produit, et les identités remarquables.',
        'Tu connais les mots officiels : le double produit, et les identités remarquables.',
      ],
    },

    exercices: [
      {
        id: 'carre-somme',
        univers: 'maison-courses',
        versions: [3, 5, 2, 4, 6, 7],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const bonne = expr2(1, 2 * a, a * a);
          return {
            enonce: 'Développe (x + ' + a + ')².',
            reponse: O.choix(c.alea, bonne, [expr2(1, 0, a * a), expr2(1, a, a * a), expr2(1, 2 * a, 2 * a)]),
            aide: 'Carré du premier, double produit, carré du second.',
            correction: ['x² + 2 × ' + a + ' × x + ' + a + '².', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'carre-difference',
        univers: 'commerce',
        versions: [3, 5, 2, 4, 6, 8],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const bonne = expr2(1, -2 * a, a * a);
          return {
            enonce: 'Développe (x − ' + a + ')².',
            reponse: O.choix(c.alea, bonne, [expr2(1, 0, -a * a), expr2(1, -2 * a, -a * a), expr2(1, 2 * a, a * a)]),
            aide: 'Carré du premier, moins le double produit, plus le carré du second.',
            correction: ['x² − 2 × ' + a + ' × x + ' + a + '².', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'double-produit',
        univers: 'maison-courses',
        versions: [3, 5, 4, 7, 9, 10],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans (x + ' + a + ')², quel nombre se trouve devant x après le développement ?',
            reponse: { type: 'nombre', valeur: 2 * a },
            aide: 'Calcule 2 × ' + a + '.',
            aideParlee: 'C’est le double du nombre dans la parenthèse.',
            correction: ['2 × ' + a + ' = ' + 2 * a + ' : le terme du milieu est ' + 2 * a + 'x.'],
          };
        },
      },
      O.qcm('erreur-classique', 'famille',
        [['(x + 3)² = x² + 9', 'Faux : il manque le double produit'], ['(x + 5)² = x² + 25', 'Faux : il manque le double produit'], ['(x + 3)² = x² + 6x + 9', 'Vrai'], ['(x − 2)² = x² − 4x + 4', 'Vrai'], ['(x − 4)² = x² − 16', 'Faux : il manque le double produit']],
        (x) => 'Vrai ou faux : ' + x + ' ?', ['Vrai', 'Faux : il manque le double produit'],
        'Teste avec un nombre, ou dessine les quatre cases.'),
      {
        id: 'calcul-malin',
        univers: 'commerce',
        // [n, d, signe]
        versions: [[100, 1, 1], [100, 2, 1], [50, 1, 1], [100, 1, -1], [50, 1, -1], [30, 1, 1]],
        genere(c) {
          const [n, d, s] = c.alea.choisir(this.versions);
          const v = n + s * d, r = v * v;
          return {
            enonce: 'Calcule de tête ' + v + '², en écrivant ' + v + ' = ' + n + (s > 0 ? ' + ' : ' − ') + d + '.',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule ' + n + '², puis le double produit, puis ' + d + '².',
            aideParlee: 'Carré du nombre rond, double produit, carré du petit nombre.',
            correction: [n * n + (s > 0 ? ' + ' : ' − ') + 2 * n * d + ' + ' + d * d + ' = ' + r + '.'],
          };
        },
      },
    ],

    defi: {
      // [agrandissement a, côté x]
      versions: [[3, 5], [2, 8], [4, 6], [5, 10]],
      genere(c) {
        const [a, x] = c.alea.choisir(this.versions);
        const bonne = expr2(1, 2 * a, a * a);
        return {
          enonce: 'Le jardin carré de Laure a pour côté x mètres. Elle l’agrandit de ' + a + ' mètres dans les deux sens : il reste carré.',
          image: { dessin: 'aires', lignes: ['x', String(a)], colonnes: ['x', String(a)], cases: [['x²', a + 'x'], [a + 'x', String(a * a)]], description: 'Un carré coupé en quatre : x carré, ' + a + 'x, ' + a + 'x et ' + a * a + '.' },
          questions: [
            {
              texte: 'Question 1. Écris l’aire du nouveau jardin, sous forme développée.',
              reponse: O.choix(c.alea, bonne, [expr2(1, 0, a * a), expr2(1, a, a * a)]),
              aide: 'Carré du premier, double produit, carré du second.',
              correction: ['(x + ' + a + ')² = ' + bonne + '.'],
            },
            {
              texte: 'Question 2. Pour x = ' + x + ', calcule l’aire, en mètres carrés.',
              reponse: { type: 'nombre', valeur: (x + a) * (x + a) },
              aide: 'Remplace x par le nombre donné.',
              correction: ['(' + x + ' + ' + a + ')² = ' + (x + a) + '² = ' + (x + a) * (x + a) + ' mètres carrés.'],
            },
            {
              texte: 'Question 3. Rachel avait écrit x² + ' + a * a + '. Pour x = ' + x + ', calcule ce que donne son écriture, et explique son erreur.',
              correction: [x * x + ' + ' + a * a + ' = ' + (x * x + a * a) + ', et non ' + (x + a) * (x + a) + '.', 'Elle a oublié le double produit, les deux bandes le long des côtés : ' + 2 * a + 'x.'],
              grille: ['As-tu calculé ce que donne l’écriture de Rachel ?', 'As-tu nommé le double produit ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Carré, double produit, carré : le terme du milieu ne t’échappera plus.',
    carte: ['carre-somme', 'carre-difference', 'erreur-classique'],
    papierDuSoir: { exercices: ['carre-difference', 'calcul-malin'], defi: true },
    automatismes: [
      {
        id: 'double-rapide',
        versions: [3, 7, 8, 12],
        genere(c) { const a = c.alea.choisir(this.versions); return { enonce: '2 × ' + a + ' = ?', reponse: { type: 'nombre', valeur: 2 * a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte, Abu Kamil calculait déjà avec x au carré, et jusqu’à x à la puissance huit. Il écrivait tout cela en toutes lettres.',
    prenoms: ['Laure', 'Rachel'],
  };
});
