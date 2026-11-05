/* Notion 5 du bloc « Le calcul avec des lettres » : réduire une expression. Le panier d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;

  return {
    id: 'reduire',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Réduire une expression',
    classe: '4e',
    univers: ['commerce', 'maison-courses', 'famille'],

    accroche: {
      texte: 'Aminata range ses achats. Le matin, elle a pris 3 boîtes de sucre et 2 sachets de thé. Le soir, encore 4 boîtes de sucre et 1 sachet. ' +
        'Pour faire ses comptes, elle ne mélange pas tout : les boîtes avec les boîtes, les sachets avec les sachets. En tout : 7 boîtes et 3 sachets.',
      image: { dessin: 'barres', barres: [{ nom: 'Boîtes', parts: 7 }, { nom: 'Sachets', parts: 3 }], description: 'Deux barres : 7 boîtes d’un côté, 3 sachets de l’autre. On ne les mélange pas.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['3x + 2 + 4x + 1', 'Les x ensemble : 3x + 4x = 7x', 'Les nombres ensemble : 2 + 1 = 3', 'Résultat : 7x + 3'], description: 'On part de 3x plus 2 plus 4x plus 1. Les x ensemble font 7x. Les nombres ensemble font 3. Le résultat est 7x plus 3.' },
      etapes: [
        'Si chaque boîte contient x morceaux de sucre, 3 boîtes et 4 boîtes s’écrivent 3x + 4x. En tout, 7 boîtes : 7x.',
        'Les nombres seuls vont ensemble : 2 + 1 = 3.',
        'Résultat : 3x + 2 + 4x + 1 = 7x + 3.',
        'On ne peut pas aller plus loin : 7x + 3 n’est pas 10x. Des boîtes et des sachets ne s’additionnent pas.',
        'Et x², c’est encore autre chose : x² et x ne vont pas ensemble.',
      ],
    },

    decouverte: {
      texte: (c) => 'On ne regroupe que ce qui se ressemble : les x avec les x, les nombres avec les nombres. Écrire le calcul le plus court possible, c’est ' + c.mot('reduire') + '. ' +
        'Pour additionner les x, on additionne simplement ' + c.mot('coefficients') + '. ' +
        'L’astuce : pense à des boîtes et des sachets. On ne les mélange jamais.',
    },

    vocabulaire: {
      termes: {
        reduire: { sesMots: 'ranger le calcul', officiel: 'réduire', lesDeux: 'ranger le calcul, ce que les matheux appellent réduire' },
        coefficients: { sesMots: 'les nombres devant x', officiel: 'les coefficients', lesDeux: 'les nombres devant x, que les matheux appellent les coefficients' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ranger le calcul, et les nombres devant x. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : réduire une expression, en additionnant les coefficients, les nombres devant x.',
        'Tu connais les mots officiels : réduire une expression, et les coefficients.',
      ],
    },

    exercices: [
      {
        id: 'les-x-ensemble',
        univers: 'commerce',
        // [a, b] : ax + bx
        versions: [[3, 4], [5, 2], [7, 6], [8, 1], [9, 3], [4, 4]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Réduis ' + a + 'x + ' + (b === 1 ? '' : b) + 'x. Quel nombre se trouve devant x dans le résultat ?',
            reponse: { type: 'nombre', valeur: a + b },
            aide: 'Calcule ' + a + ' + ' + b + '.',
            aideParlee: 'Additionne les nombres devant x.',
            correction: [a + 'x + ' + (b === 1 ? '' : b) + 'x = ' + (a + b) + 'x.'],
          };
        },
      },
      {
        id: 'x-et-nombres',
        univers: 'maison-courses',
        // [a, b, c, d] : ax + b + cx + d
        versions: [[3, 2, 4, 1], [5, 1, 2, 6], [2, 7, 6, 3], [4, 5, 3, 2], [6, 4, 2, 5]],
        genere(c) {
          const [a, b, d, e] = c.alea.choisir(this.versions);
          const bonne = expr(a + d, b + e);
          return {
            enonce: 'Réduis ' + a + 'x + ' + b + ' + ' + d + 'x + ' + e + '.',
            reponse: O.choix(c.alea, bonne, [a + d + b + e + 'x', expr(b + e, a + d), expr(a + d, b + e + 1)]),
            aide: 'Regroupe les x ensemble, puis les nombres ensemble.',
            correction: [a + 'x + ' + d + 'x = ' + (a + d) + 'x ; ' + b + ' + ' + e + ' = ' + (b + e) + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'avec-moins',
        univers: 'famille',
        // [a, b, c, d] : ax + b − cx − d
        versions: [[7, 9, 3, 4], [8, 6, 5, 1], [6, 10, 2, 7], [9, 8, 4, 3], [5, 7, 1, 2]],
        genere(c) {
          const [a, b, d, e] = c.alea.choisir(this.versions);
          const bonne = expr(a - d, b - e);
          return {
            enonce: 'Réduis ' + a + 'x + ' + b + ' − ' + (d === 1 ? '' : d) + 'x − ' + e + '.',
            reponse: O.choix(c.alea, bonne, [expr(a + d, b - e), expr(a - d, b + e), a - d + b - e + 'x']),
            aide: 'Les x ensemble, les nombres ensemble, et garde les signes moins.',
            correction: [a + 'x − ' + (d === 1 ? '' : d) + 'x = ' + (a - d) + 'x ; ' + b + ' − ' + e + ' = ' + (b - e) + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'developper-puis-reduire',
        univers: 'commerce',
        // [k, b, a] : k(x + b) + ax
        versions: [[2, 3, 5], [3, 1, 4], [4, 2, 3], [5, 2, 2], [2, 6, 7]],
        genere(c) {
          const [k, b, a] = c.alea.choisir(this.versions);
          const bonne = expr(k + a, k * b);
          return {
            enonce: 'Développe, puis réduis : ' + k + '(x + ' + b + ') + ' + a + 'x.',
            reponse: O.choix(c.alea, bonne, [expr(k + a, b), expr(k * a, k * b), expr(k, k * b + a)]),
            aide: 'Enlève d’abord la parenthèse, puis regroupe les x.',
            correction: [k + '(x + ' + b + ') = ' + expr(k, k * b) + '.', expr(k, k * b) + ' + ' + a + 'x = ' + bonne + '.'],
          };
        },
      },
      O.qcm('peut-on-reduire', 'maison-courses',
        [['3x + 2', 'Non, c’est déjà réduit'], ['5x + 4x', 'Oui, on regroupe les x'], ['x² + x', 'Non, c’est déjà réduit'], ['2x + 7x', 'Oui, on regroupe les x'], ['4x + 9', 'Non, c’est déjà réduit']],
        (x) => 'Peut-on écrire ' + x + ' plus simplement ?', ['Oui, on regroupe les x', 'Non, c’est déjà réduit'],
        'On ne regroupe que ce qui se ressemble.'),
    ],

    defi: {
      // [a, b, c, d, x] : périmètre d'un triangle dont les côtés sont ax + b, cx, d
      versions: [[2, 3, 3, 4, 5], [3, 1, 2, 7, 4], [2, 4, 3, 5, 3], [2, 5, 4, 3, 2]],
      genere(c) {
        const [a, b, d, e, x] = c.alea.choisir(this.versions);
        const bonne = expr(a + d, b + e);
        return {
          enonce: 'Esther pose une guirlande autour d’un stand en triangle. Les trois côtés mesurent ' + expr(a, b) + ', ' + (d === 1 ? '' : d) + 'x et ' + e + ' mètres.',
          questions: [
            {
              texte: 'Question 1. Écris le périmètre du stand sous forme réduite.',
              reponse: O.choix(c.alea, bonne, [a + d + b + e + 'x', expr(a + d, b)]),
              aide: 'Additionne les trois côtés, puis regroupe les x et les nombres.',
              correction: [expr(a, b) + ' + ' + (d === 1 ? '' : d) + 'x + ' + e + ' = ' + bonne + '.'],
            },
            {
              texte: 'Question 2. Calcule ce périmètre pour x = ' + x + '.',
              reponse: { type: 'nombre', valeur: (a + d) * x + b + e },
              aide: 'Remplace x par le nombre donné dans la forme réduite.',
              correction: [(a + d) + ' × ' + x + ' + ' + (b + e) + ' = ' + ((a + d) * x + b + e) + ' mètres.'],
            },
            {
              texte: 'Question 3. Esther écrit : « Le périmètre est ' + (a + d + b + e) + 'x. » Explique son erreur.',
              correction: ['Elle a additionné les x et les nombres seuls.', 'Or on ne regroupe que ce qui se ressemble : les x avec les x, les nombres avec les nombres.', 'La bonne forme est ' + bonne + '.'],
              grille: ['As-tu dit qu’on ne peut pas ajouter des x et des nombres seuls ?', 'As-tu donné la bonne forme réduite ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Les x avec les x, les nombres avec les nombres : tes calculs sont bien rangés.',
    carte: ['les-x-ensemble', 'x-et-nombres', 'peut-on-reduire'],
    papierDuSoir: { exercices: ['avec-moins', 'developper-puis-reduire'], defi: true },
    automatismes: [
      {
        id: 'somme-de-x',
        versions: [[3, 4], [5, 2], [6, 3], [7, 2]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + 'x + ' + b + 'x = ? x (écris le nombre)', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Bagdad, en Irak, al-Khwarizmi appelait al-muqabala, l’équilibre, le geste de réduire les termes pareils des deux côtés d’une équation.',
    prenoms: ['Aminata', 'Esther'],
  };
});
