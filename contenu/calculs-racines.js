/* Notion 23 du bloc « Les nombres » : calculs avec les racines carrées. Simplifier √50 avec la décomposition. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  /** √n = k√m avec m le plus petit possible. */
  function simplifier(n) {
    let k = 1;
    for (let d = 2; d * d <= n; d++) if (n % (d * d) === 0) k = d;
    return [k, n / (k * k)];
  }

  return {
    id: 'calculs-racines',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Calculs avec les racines carrées',
    classe: 'ancien programme',
    univers: ['maison-courses', 'appareils'],

    accroche: {
      texte: 'La calculatrice d’Aminata affiche : √50 = 5√2. Elle est étonnée ! D’où vient ce 5 ? ' +
        'Et pourquoi l’écrire comme ça ? Parce que c’est plus simple pour calculer à la main, comme au brevet.',
      image: { dessin: 'arbre', nombre: 50, description: 'L’arbre de 50 : 50 donne 2 et 25 ; 25 donne 5 et 5.' },
    },

    manipulation: {
      image: { dessin: 'carrelage', cote: 5, description: 'Un carré de 5 sur 5 : 25, un carré parfait caché dans 50.' },
      etapes: [
        'Première règle : √a × √b = √(a × b). Par exemple √2 × √8 = √16 = 4.',
        'Pour simplifier √50, cherche un carré parfait caché dans 50 : 50 = 25 × 2.',
        'Alors √50 = √25 × √2 = 5 × √2. On écrit 5√2.',
        'Attention : √(a + b) n’est pas √a + √b. √9 + √16 = 3 + 4 = 7, mais √25 = 5.',
      ],
    },

    decouverte: {
      texte: (c) => '√50 = √25 × √2 = 5√2. L’astuce : cherche le plus grand carré parfait qui divise le nombre. ' +
        'C’est là que la décomposition aide : 50 = 2 × 5². Écrire 5√2, c’est ' + c.mot('simplifier') + '. ' +
        'Et on peut ajouter des racines pareilles : 3√2 + 5√2 = 8√2, comme 3 pommes et 5 pommes.',
    },

    vocabulaire: {
      termes: {
        simplifier: { sesMots: 'sortir le carré de sous la racine', officiel: 'écrire la racine sous la forme a√b, avec b le plus petit possible', lesDeux: 'sortir le carré de sous la racine, c’est-à-dire écrire la racine sous la forme a√b' },
      },
      textes: [
        'Pour l’instant, garde tes mots : dans √50, on sort le carré de sous la racine : 25 sort et devient 5. Il reste 5√2. ' +
          'Les matheux le disent autrement : je te le dirai la prochaine fois.',
        'Les matheux disent : écrire √50 sous la forme a√b, avec b entier le plus petit possible. C’est sortir le carré de sous la racine.',
        'Tu connais l’expression officielle : écrire une racine sous la forme a√b, avec b entier le plus petit possible. On utilise √(a × b) = √a × √b.',
      ],
    },

    exercices: [
      {
        id: 'produit',
        univers: 'appareils',
        versions: [[2, 8], [3, 12], [2, 18], [5, 20], [3, 27], [2, 32], [6, 24], [7, 28]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const r = Math.sqrt(a * b);
          return {
            enonce: 'Calcule : √' + a + ' × √' + b + '.',
            reponse: { type: 'nombre', valeur: r },
            aide: '√' + a + ' × √' + b + ' = √' + a * b + '.',
            aideParlee: 'Le produit de deux racines est la racine du produit. Puis cherche le carré parfait.',
            correction: ['√' + a + ' × √' + b + ' = √(' + a + ' × ' + b + ') = √' + a * b + ' = ' + r + '.'],
          };
        },
      },
      {
        id: 'sortir-le-carre',
        univers: 'maison-courses',
        versions: [8, 12, 18, 20, 27, 28, 32, 45, 50, 75, 72, 98],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const [k, m] = simplifier(n);
          return {
            enonce: 'On écrit √' + n + ' = a√' + m + '. Quel est le nombre a ?',
            reponse: { type: 'nombre', valeur: k },
            aide: n + ' = ' + k * k + ' × ' + m + ', et ' + k * k + ' est un carré parfait.',
            aideParlee: 'Cherche le plus grand carré parfait qui divise le nombre, puis prends sa racine.',
            correction: [n + ' = ' + k * k + ' × ' + m + '.', '√' + n + ' = √' + k * k + ' × √' + m + ' = ' + k + '√' + m + '. Réponse : ' + k + '.'],
          };
        },
      },
      {
        id: 'quotient',
        univers: 'appareils',
        versions: [[50, 2], [27, 3], [72, 2], [80, 5], [98, 2], [48, 3], [63, 7], [200, 2]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const r = Math.sqrt(a / b);
          return {
            enonce: 'Calcule : √' + a + ' ÷ √' + b + '.',
            reponse: { type: 'nombre', valeur: r },
            aide: '√' + a + ' ÷ √' + b + ' = √(' + a + ' ÷ ' + b + ').',
            aideParlee: 'Le quotient de deux racines est la racine du quotient.',
            correction: ['√' + a + ' ÷ √' + b + ' = √(' + a + ' ÷ ' + b + ') = √' + a / b + ' = ' + r + '.'],
          };
        },
      },
      {
        id: 'au-carre',
        univers: 'maison-courses',
        versions: [[3, 2], [2, 5], [5, 3], [4, 2], [2, 7], [3, 5], [6, 2], [10, 3]],
        genere(c) {
          const [k, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule (' + k + '√' + m + ')².',
            reponse: { type: 'nombre', valeur: k * k * m },
            aide: '(' + k + '√' + m + ')² = ' + k + '² × (√' + m + ')².',
            aideParlee: 'Mets au carré chaque morceau : le nombre devant, puis la racine. Une racine au carré redonne le nombre.',
            correction: ['(' + k + '√' + m + ')² = ' + k * k + ' × ' + m + ' = ' + k * k * m + '.'],
          };
        },
      },
      {
        id: 'somme',
        univers: 'appareils',
        // a√n + b√n, ou a√(p²n) + b√n : coefficient de √n
        versions: [[3, 2, 5, 1], [4, 3, 2, 1], [2, 5, 3, 1], [1, 2, 1, 9], [2, 3, 1, 4], [1, 5, 2, 4], [3, 2, 1, 25], [1, 7, 1, 4]],
        genere(c) {
          const [a, n, b, q] = c.alea.choisir(this.versions);
          const k = Math.sqrt(q);
          const coef = a + b * k;
          const second = q === 1 ? b + '√' + n : (b === 1 ? '' : b) + '√' + q * n;
          return {
            enonce: 'Écris ' + (a === 1 ? '' : a) + '√' + n + ' + ' + second + ' sous la forme c√' + n + '. Quel est c ?',
            reponse: { type: 'nombre', valeur: coef },
            aide: q === 1 ? 'Ce sont des racines pareilles : ajoute les nombres devant.' : 'Simplifie d’abord √' + q * n + ' = ' + k + '√' + n + '.',
            aideParlee: 'Écris d’abord les deux racines avec le même nombre sous la racine, puis ajoute les nombres devant.',
            correction: (q === 1 ? [] : ['√' + q * n + ' = √' + q + ' × √' + n + ' = ' + k + '√' + n + '.']).concat([(a === 1 ? '' : a) + '√' + n + ' + ' + b * k + '√' + n + ' = ' + coef + '√' + n + '. Réponse : ' + coef + '.']),
          };
        },
      },
    ],

    defi: {
      versions: [[50, 2], [18, 2], [12, 3], [75, 3], [45, 5], [98, 2]],
      genere(c) {
        const [n, m] = c.alea.choisir(this.versions);
        const [k] = simplifier(n);
        return {
          enonce: 'On donne A = √' + n + ' + √' + m + ' et B = √' + n + ' × √' + m + '.',
          questions: [
            {
              texte: 'Question 1. Écris √' + n + ' sous la forme a√' + m + '. Quel est a ?',
              reponse: { type: 'nombre', valeur: k },
              aide: 'Cherche le plus grand carré parfait qui divise le nombre.',
              correction: [n + ' = ' + k * k + ' × ' + m + ', donc √' + n + ' = ' + k + '√' + m + '. Réponse : ' + k + '.'],
            },
            {
              texte: 'Question 2. Calcule B.',
              reponse: { type: 'nombre', valeur: k * m },
              aide: 'Le produit de deux racines est la racine du produit.',
              correction: ['B = √(' + n + ' × ' + m + ') = √' + n * m + ' = ' + k * m + '.'],
            },
            {
              texte: 'Question 3. Montre que A = ' + (k + 1) + '√' + m + '.',
              correction: ['√' + n + ' = ' + k + '√' + m + '.', 'A = ' + k + '√' + m + ' + √' + m + ' = ' + (k + 1) + '√' + m + '.'],
              grille: ['As-tu simplifié √' + n + ' ?', 'As-tu ajouté les racines pareilles, en comptant 1 devant √' + m + ' ?', 'As-tu écrit la conclusion A = ' + (k + 1) + '√' + m + ' ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais sortir un carré de sous la racine, et calculer avec les racines comme avec des pommes.',
    carte: ['produit', 'sortir-le-carre', 'au-carre'],
    papierDuSoir: { exercices: ['sortir-le-carre', 'somme'], defi: true },
    automatismes: [
      {
        id: 'produit-rapide',
        versions: [[2, 8], [3, 3], [5, 5], [2, 50]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: '√' + a + ' × √' + b + ' = ?', reponse: { type: 'nombre', valeur: Math.sqrt(a * b) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le signe √ de la racine carrée est apparu au seizième siècle, chez le mathématicien allemand Christoph Rudolff.',
    prenoms: ['Aminata'],
  };
});
