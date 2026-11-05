/* Notion 7 du bloc « Le calcul avec des lettres » : double distributivité. Le champ agrandi d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr2 } = O;
  const par2 = (a, b) => '(x + ' + a + ')(x + ' + b + ')';
  const co = (n) => (n === 1 ? 'x' : n + 'x');

  return {
    id: 'double-distributivite',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Double distributivité',
    classe: '3e',
    univers: ['champetre', 'maison-courses', 'commerce'],

    accroche: {
      texte: 'Aminata a un champ carré de x mètres de côté. Elle l’agrandit de 2 mètres d’un côté, et de 3 mètres de l’autre. ' +
        'Quelle est la nouvelle aire ? Elle dessine son champ sur son cahier. Le grand rectangle se coupe en quatre morceaux, et chaque morceau a une aire facile à calculer.',
      image: { dessin: 'aires', lignes: ['x', '3'], colonnes: ['x', '2'], cases: [['x²', '2x'], ['3x', '6']], description: 'Un rectangle coupé en quatre : en haut, x carré et 2x ; en bas, 3x et 6. Ses côtés sont x plus 2 et x plus 3.' },
    },

    manipulation: {
      image: { dessin: 'aires', lignes: ['c', 'd'], colonnes: ['a', 'b'], cases: [['ac', 'bc'], ['ad', 'bd']], description: 'Un rectangle coupé en quatre : ac, bc, ad et bd. Ses côtés sont a plus b et c plus d.' },
      etapes: [
        'Le grand rectangle a pour côtés x + 2 et x + 3 : son aire est (x + 2)(x + 3).',
        'Il est coupé en quatre morceaux : x × x = x², 2 × x = 2x, 3 × x = 3x, et 2 × 3 = 6.',
        'En tout : x² + 2x + 3x + 6. On réduit : x² + 5x + 6.',
        'Chaque terme de la première parenthèse multiplie chaque terme de la seconde : quatre multiplications.',
        'Avec un moins, on garde les signes : (x − 2)(x + 3) = x² + 3x − 2x − 6 = x² + x − 6.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour multiplier deux parenthèses, chaque terme de la première multiplie chaque terme de la seconde. Cela fait quatre produits : c’est ' + c.mot('double') + '. ' +
        'Ensuite, on regroupe les termes qui se ressemblent : c’est ' + c.mot('reduire') + '. ' +
        'L’astuce : dessine le rectangle en quatre morceaux. Quatre cases, quatre produits.',
    },

    vocabulaire: {
      termes: {
        double: { sesMots: 'la règle des quatre cases', officiel: 'la double distributivité', lesDeux: 'la règle des quatre cases, que les matheux appellent la double distributivité' },
        reduire: { sesMots: 'ranger le résultat', officiel: 'réduire', lesDeux: 'ranger le résultat, ce que les matheux appellent réduire' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la règle des quatre cases, et ranger le résultat. ' +
          'Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : la double distributivité, puis on réduit.',
        'Tu connais le mot officiel : la double distributivité.',
      ],
    },

    exercices: [
      {
        id: 'developper-plus',
        univers: 'champetre',
        // [a, b] : (x + a)(x + b)
        versions: [[2, 3], [1, 4], [5, 2], [3, 3], [4, 6], [1, 7]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = expr2(1, a + b, a * b);
          return {
            enonce: 'Développe et réduis ' + par2(a, b) + '.',
            reponse: O.choix(c.alea, bonne, [expr2(1, 0, a * b), expr2(1, a * b, a + b), expr2(2, a + b, a * b)]),
            aide: 'Fais les quatre produits : x × x, x × ' + b + ', ' + a + ' × x, ' + a + ' × ' + b + '.',
            aideParlee: 'Fais les quatre produits, puis regroupe les x.',
            correction: ['x² + ' + co(b) + ' + ' + co(a) + ' + ' + a * b + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'nombre-devant-x',
        univers: 'maison-courses',
        // [a, b]
        versions: [[2, 5], [3, 4], [6, 1], [7, 2], [4, 4]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'On développe et on réduit ' + par2(a, b) + '. Quel nombre se trouve devant x ?',
            reponse: { type: 'nombre', valeur: a + b },
            aide: 'Les deux morceaux avec x sont ' + co(b) + ' et ' + co(a) + '.',
            aideParlee: 'Il y a deux morceaux avec x. Additionne leurs nombres.',
            correction: [co(b) + ' + ' + co(a) + ' = ' + (a + b) + 'x.'],
          };
        },
      },
      {
        id: 'nombre-seul',
        univers: 'maison-courses',
        // [a, b]
        versions: [[2, 5], [3, 4], [6, 2], [7, 3], [5, 5]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'On développe ' + par2(a, b) + '. Quel nombre, sans lettre, obtient-on ?',
            reponse: { type: 'nombre', valeur: a * b },
            aide: 'Calcule ' + a + ' × ' + b + '.',
            aideParlee: 'Multiplie les deux nombres seuls.',
            correction: [a + ' × ' + b + ' = ' + a * b + '.'],
          };
        },
      },
      {
        id: 'avec-un-moins',
        univers: 'commerce',
        // [a, b] : (x − a)(x + b)
        versions: [[2, 3], [1, 4], [5, 2], [3, 6], [4, 1]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = expr2(1, b - a, -a * b);
          return {
            enonce: 'Développe et réduis (x − ' + a + ')(x + ' + b + ').',
            reponse: O.choix(c.alea, bonne, [expr2(1, a + b, -a * b), expr2(1, b - a, a * b), expr2(1, a - b, a * b)]),
            aide: 'Fais les quatre produits, et garde le signe moins avec le ' + a + '.',
            aideParlee: 'Fais les quatre produits, en gardant bien le signe moins.',
            correction: ['x² + ' + co(b) + ' − ' + co(a) + ' − ' + a * b + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'combien-de-produits',
        univers: 'champetre',
        // [expression, nombre de produits à faire]
        versions: [['(x + 2)(x + 3)', 4], ['3(x + 5)', 2], ['(x − 1)(x + 7)', 4], ['x(x + 4)', 2], ['(2x + 1)(x − 3)', 4]],
        genere(c) {
          const [e, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour développer ' + e + ', combien de produits faut-il calculer ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Multiplie le nombre de termes de chaque côté.',
            correction: [(n === 4 ? '2 termes par 2 termes' : '1 terme par 2 termes') + ' : ' + n + ' produits.'],
          };
        },
      },
    ],

    defi: {
      // [a, b, x]
      versions: [[2, 3, 10], [1, 4, 6], [5, 2, 8], [3, 6, 4]],
      genere(c) {
        const [a, b, x] = c.alea.choisir(this.versions);
        const bonne = expr2(1, a + b, a * b);
        return {
          enonce: 'Le champ carré d’Aminata a pour côté x mètres. Elle l’agrandit : un côté gagne ' + a + ' m, l’autre gagne ' + b + ' m. Le champ devient un rectangle.',
          image: { dessin: 'aires', lignes: ['x', String(b)], colonnes: ['x', String(a)], cases: [['x²', co(a)], [co(b), String(a * b)]], description: 'Un rectangle coupé en quatre : x carré, ' + co(a) + ', ' + co(b) + ' et ' + a * b + '.' },
          questions: [
            {
              texte: 'Question 1. Écris l’aire du nouveau champ sous forme développée et réduite.',
              reponse: O.choix(c.alea, bonne, [expr2(1, 0, a * b), expr2(1, a * b, a + b)]),
              aide: 'Fais les quatre produits, puis regroupe les x.',
              correction: [par2(a, b) + ' = ' + bonne + '.'],
            },
            {
              texte: 'Question 2. Calcule cette aire pour x = ' + x + ', en mètres carrés.',
              reponse: { type: 'nombre', valeur: (x + a) * (x + b) },
              aide: 'Remplace x par le nombre donné.',
              correction: ['(' + x + ' + ' + a + ') × (' + x + ' + ' + b + ') = ' + (x + a) + ' × ' + (x + b) + ' = ' + (x + a) * (x + b) + ' mètres carrés.'],
            },
            {
              texte: 'Question 3. Combien de mètres carrés Aminata a-t-elle gagnés, pour x = ' + x + ' ?',
              reponse: { type: 'nombre', valeur: (x + a) * (x + b) - x * x },
              aide: 'Enlève l’aire de l’ancien champ, x fois x.',
              correction: [(x + a) * (x + b) + ' − ' + x * x + ' = ' + ((x + a) * (x + b) - x * x) + ' mètres carrés.'],
            },
            {
              texte: 'Question 4. Montre, à l’aide du dessin, d’où vient chacun des quatre termes.',
              correction: ['x² est l’ancien champ ; ' + co(a) + ' et ' + co(b) + ' sont les deux bandes ajoutées ; ' + a * b + ' est le petit coin.'],
              grille: ['As-tu nommé les quatre morceaux ?', 'As-tu relié chaque morceau à un terme ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Quatre cases, quatre produits, puis on réduit : tu sais multiplier deux parenthèses.',
    carte: ['developper-plus', 'nombre-devant-x', 'avec-un-moins'],
    papierDuSoir: { exercices: ['developper-plus', 'avec-un-moins'], defi: true },
    automatismes: [
      {
        id: 'somme-produit',
        versions: [[2, 3], [4, 5], [3, 6], [2, 7]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Il y a environ mille ans, en Irak, al-Karaji donnait déjà des règles pour multiplier de longues expressions.',
    prenoms: ['Aminata'],
  };
});
