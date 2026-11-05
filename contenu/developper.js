/* Notion 4 du bloc « Le calcul avec des lettres » : simple distributivité, développer. La terrasse de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;

  return {
    id: 'developper',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Simple distributivité : développer',
    classe: '4e',
    univers: ['maison-courses', 'commerce', 'cuisine-restaurant'],

    accroche: {
      texte: 'Rachel veut carreler une terrasse faite de deux parties côte à côte. La largeur est de 3 mètres. La première partie est longue de x mètres, la seconde de 2 mètres. ' +
        'Pour l’aire, deux calculs possibles : la grande longueur fois 3, ou bien chaque partie, puis on ajoute. Les deux donnent-ils le même résultat ?',
      image: { dessin: 'aires', lignes: ['3'], colonnes: ['x', '2'], cases: [['3x', '6']], description: 'Un rectangle de largeur 3, coupé en deux : une partie de longueur x, d’aire 3x, et une partie de longueur 2, d’aire 6.' },
    },

    manipulation: {
      image: { dessin: 'aires', lignes: ['k'], colonnes: ['a', 'b'], cases: [['k × a', 'k × b']], description: 'Un rectangle de largeur k, coupé en deux : une partie d’aire k fois a, et une partie d’aire k fois b.' },
      etapes: [
        'Toute la terrasse est un rectangle de largeur 3 et de longueur x + 2 : son aire est 3(x + 2).',
        'En deux parties : la première a pour aire 3 × x, la seconde 3 × 2. En tout : 3x + 6.',
        'C’est la même terrasse, donc 3(x + 2) = 3x + 6, quel que soit x.',
        'Le nombre devant la parenthèse multiplie chaque terme de la parenthèse. Avec un moins, c’est pareil : 3(x − 2) = 3x − 6.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le nombre devant la parenthèse se distribue : il multiplie chaque nombre de la parenthèse. On appelle cela ' + c.mot('distributivite') + '. ' +
        'Passer du produit à la somme, c’est ' + c.mot('developper') + '. ' +
        'L’astuce : une flèche vers le premier, une flèche vers le second, et n’oublie personne.',
    },

    vocabulaire: {
      termes: {
        distributivite: { sesMots: 'le partage du nombre', officiel: 'la distributivité', lesDeux: 'le partage du nombre, que les matheux appellent la distributivité' },
        developper: { sesMots: 'enlever les parenthèses', officiel: 'développer', lesDeux: 'enlever les parenthèses, ce que les matheux appellent développer' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le partage du nombre, et enlever les parenthèses. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la distributivité, et développer, pour passer d’un produit à une somme.',
        'Tu connais les mots officiels : la distributivité, développer un produit.',
      ],
    },

    exercices: [
      {
        id: 'developper-plus',
        univers: 'maison-courses',
        // [k, b] : k(x + b)
        versions: [[3, 2], [4, 5], [2, 7], [5, 3], [6, 4], [7, 2]],
        genere(c) {
          const [k, b] = c.alea.choisir(this.versions);
          const bonne = expr(k, k * b);
          return {
            enonce: 'Développe ' + k + '(x + ' + b + ').',
            reponse: O.choix(c.alea, bonne, [expr(k, b), expr(1, k * b), k + b + 'x']),
            aide: 'Multiplie x par ' + k + ', puis ' + b + ' par ' + k + '.',
            aideParlee: 'Le nombre devant la parenthèse multiplie chaque terme.',
            correction: [k + ' × x = ' + k + 'x ; ' + k + ' × ' + b + ' = ' + k * b + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'developper-moins',
        univers: 'commerce',
        // [k, b] : k(x − b)
        versions: [[3, 2], [5, 4], [2, 9], [4, 3], [6, 5]],
        genere(c) {
          const [k, b] = c.alea.choisir(this.versions);
          const bonne = expr(k, -k * b);
          return {
            enonce: 'Développe ' + k + '(x − ' + b + ').',
            reponse: O.choix(c.alea, bonne, [expr(k, k * b), expr(k, -b), expr(1, -k * b)]),
            aide: 'Multiplie x par ' + k + ', puis ' + b + ' par ' + k + ', et garde le signe moins.',
            aideParlee: 'Le nombre multiplie chaque terme, et le signe moins reste.',
            correction: [k + ' × x = ' + k + 'x ; ' + k + ' × ' + b + ' = ' + k * b + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'nombre-devant-x',
        univers: 'cuisine-restaurant',
        // [k, a, b] : k(ax + b)
        versions: [[2, 3, 1], [3, 4, 2], [5, 2, 3], [4, 6, 5], [6, 2, 7]],
        genere(c) {
          const [k, a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'On développe ' + k + '(' + expr(a, b) + '). Quel nombre se trouve devant x dans le résultat ?',
            reponse: { type: 'nombre', valeur: k * a },
            aide: 'Calcule ' + k + ' × ' + a + '.',
            aideParlee: 'Multiplie le nombre devant la parenthèse par le nombre devant x.',
            correction: [k + ' × ' + a + 'x = ' + k * a + 'x.'],
          };
        },
      },
      {
        id: 'nombre-seul',
        univers: 'cuisine-restaurant',
        // [k, a, b] : k(ax + b)
        versions: [[2, 3, 4], [3, 5, 2], [5, 2, 6], [4, 3, 7], [6, 2, 3]],
        genere(c) {
          const [k, a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'On développe ' + k + '(' + expr(a, b) + '). Quel nombre, sans lettre, se trouve dans le résultat ?',
            reponse: { type: 'nombre', valeur: k * b },
            aide: 'Calcule ' + k + ' × ' + b + '.',
            aideParlee: 'Multiplie le nombre devant la parenthèse par le nombre sans lettre.',
            correction: [k + ' × ' + b + ' = ' + k * b + '.'],
          };
        },
      },
      {
        id: 'calcul-malin',
        univers: 'commerce',
        // [k, n] : k × (100 + n)
        versions: [[12, 3], [7, 2], [15, 4], [9, 5], [11, 6], [8, 7]],
        genere(c) {
          const [k, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure achète ' + k + ' pagnes à ' + (100 + n) + ' euros. Calcule ' + k + ' × ' + (100 + n) + ' de tête, en écrivant ' + (100 + n) + ' = 100 + ' + n + '.',
            reponse: { type: 'nombre', valeur: k * (100 + n) },
            aide: 'Calcule ' + k + ' × 100, puis ' + k + ' × ' + n + ', puis ajoute.',
            aideParlee: 'Multiplie par cent, multiplie par le petit nombre, puis ajoute.',
            correction: [k + ' × 100 + ' + k + ' × ' + n + ' = ' + k * 100 + ' + ' + k * n + ' = ' + k * (100 + n) + ' euros.'],
          };
        },
      },
    ],

    defi: {
      // [largeur k, partie connue b, valeur de x]
      versions: [[3, 2, 5], [4, 3, 6], [5, 2, 4], [6, 3, 7]],
      genere(c) {
        const [k, b, x] = c.alea.choisir(this.versions);
        const bonne = expr(k, k * b);
        return {
          enonce: 'La terrasse de Rachel est un rectangle de largeur ' + k + ' m, et de longueur x + ' + b + ' m.',
          image: { dessin: 'aires', lignes: [String(k)], colonnes: ['x', String(b)], cases: [[k + 'x', String(k * b)]], description: 'Un rectangle de largeur ' + k + ', coupé en deux : une partie de longueur x, d’aire ' + k + 'x, et une partie de longueur ' + b + ', d’aire ' + k * b + '.' },
          questions: [
            {
              texte: 'Question 1. Quelle est l’aire de la terrasse, en mètres carrés, sous forme développée ?',
              reponse: O.choix(c.alea, bonne, [expr(k, b), expr(1, k * b)]),
              aide: 'Le nombre devant la parenthèse multiplie chaque terme.',
              correction: [k + '(x + ' + b + ') = ' + bonne + '.'],
            },
            {
              texte: 'Question 2. Calcule cette aire pour x = ' + x + '.',
              reponse: { type: 'nombre', valeur: k * (x + b) },
              aide: 'Remplace x par le nombre donné, puis calcule.',
              correction: [k + ' × ' + x + ' + ' + k * b + ' = ' + k * (x + b) + ' mètres carrés.'],
            },
            {
              texte: 'Question 3. Vérifie ton résultat avec l’autre forme, ' + k + '(x + ' + b + '). Écris le calcul et conclus.',
              correction: [k + ' × (' + x + ' + ' + b + ') = ' + k + ' × ' + (x + b) + ' = ' + k * (x + b) + '.', 'On trouve le même résultat : les deux formes sont égales.'],
              grille: ['As-tu remplacé x dans la forme avec parenthèse ?', 'As-tu calculé la parenthèse d’abord ?', 'As-tu conclu que les deux résultats sont égaux ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le nombre se partage entre chaque terme : tu sais développer sans oublier personne.',
    carte: ['developper-plus', 'developper-moins', 'calcul-malin'],
    papierDuSoir: { exercices: ['developper-plus', 'calcul-malin'], defi: true },
    automatismes: [
      {
        id: 'fois-cent-et-un',
        versions: [[4, 2], [3, 1], [5, 2], [2, 4]],
        genere(c) { const [k, n] = c.alea.choisir(this.versions); return { enonce: k + ' × ' + (100 + n) + ' = ?', reponse: { type: 'nombre', valeur: k * (100 + n) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Tombouctou, au Mali, les élèves utilisaient un manuel d’arithmétique. Avec des tableaux et des exemples, il montrait les règles du calcul, dont la multiplication.',
    prenoms: ['Rachel', 'Laure'],
  };
});
