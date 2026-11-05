/* Notion 11a du bloc « Les nombres » : multiplier des fractions positives, inverse d'un nombre. Le lait de coco. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { frac, simplifier } = O;
  function produit(a, b, cc, d) {
    const n = a * cc, D = b * d;
    const r = simplifier(n, D);
    const l = [frac(a, b) + ' × ' + frac(cc, d) + ' = ' + '(' + a + ' × ' + cc + ')/(' + b + ' × ' + d + ')' + ' = ' + frac(n, D) + '.'];
    if (r[1] !== D) l.push('On simplifie : ' + frac(n, D) + ' = ' + frac(r[0], r[1]) + '.');
    return { lignes: l, r };
  }

  return {
    id: 'fractions-multiplication-positives',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Multiplier des fractions positives, inverse d’un nombre',
    classe: '4e',
    univers: ['cuisine-restaurant', 'coiffure', 'commerce'],

    accroche: {
      texte: 'Aminata veut faire la moitié de sa recette de riz au lait de coco. Il lui reste les trois quarts d’une bouteille de lait de coco. ' +
        'La recette dit : verse la bouteille entière. Pour une demi-recette, elle prend donc la moitié de ce qui reste. ' +
        'Quelle part de la bouteille est-ce, la moitié des trois quarts ?',
      image: { dessin: 'gateau', parts: 4, prises: 3, description: 'Une bouteille vue comme une barre coupée en 4 : il en reste 3 parts.' },
    },

    manipulation: {
      image: { dessin: 'gateau', parts: 8, prises: 3, description: 'La même barre, chaque quart coupé en deux : 8 parts. La moitié des 3 quarts, ce sont 3 parts sur 8.' },
      etapes: [
        'Il reste 3/4 de la bouteille : 3 parts sur 4.',
        'Pour prendre la moitié, coupe chaque quart en deux. La bouteille a maintenant 8 parts, et il en reste 6.',
        'La moitié de ces 6 parts, c’est 3 parts : 3 parts sur 8.',
        'Donc la moitié des trois quarts, c’est 1/2 × 3/4 = 3/8. En haut : 1 × 3. En bas : 2 × 4.',
      ],
    },

    decouverte: {
      texte: (c) => '« La moitié de », c’est « 1/2 fois ». 1/2 × 3/4 = 3/8. L’astuce : on multiplie les hauts entre eux, et les bas entre eux. ' +
        'Et quand on retourne une fraction, 3/4 devient 4/3 : c’est ' + c.mot('inverse') + '. Une fraction fois ' + c.mot('inverse') + ' donne toujours 1 : 3/4 × 4/3 = 12/12 = 1.',
    },

    vocabulaire: {
      termes: {
        inverse: { sesMots: 'sa fraction retournée', officiel: 'son inverse', lesDeux: 'sa fraction retournée, son inverse' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 4/3 est la fraction retournée de 3/4. Le haut passe en bas, le bas passe en haut. ' +
          'Les matheux ont un mot pour ça : je te le dirai la prochaine fois.',
        'Les matheux disent : 4/3 est l’inverse de 3/4. La fraction retournée, c’est l’inverse. ' +
          'Un nombre multiplié par son inverse donne 1. Et l’inverse de 5, c’est 1/5.',
        'Tu connais le mot officiel : l’inverse de 3/4 est 4/3, et l’inverse de 5 est 1/5. Zéro, lui, n’a pas d’inverse.',
      ],
    },

    exercices: [
      {
        id: 'moitie-de',
        univers: 'cuisine-restaurant',
        versions: [[3, 5], [2, 3], [5, 6], [3, 7], [4, 9], [7, 8], [5, 11], [1, 3]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const k = produit(1, 2, a, b);
          return {
            enonce: 'Il reste ' + frac(a, b) + ' d’un sac de riz. Laure en utilise la moitié. Quelle fraction du sac utilise-t-elle ?',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'La moitié de, c’est 1/2 × ' + frac(a, b) + '.',
            aideParlee: 'La moitié de, c’est un demi fois la fraction. Multiplie les hauts entre eux et les bas entre eux.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'produit',
        univers: 'commerce',
        versions: [[2, 3, 4, 5], [3, 4, 1, 2], [5, 7, 2, 3], [1, 6, 5, 4], [3, 5, 5, 9], [2, 9, 3, 4], [4, 7, 7, 8], [5, 6, 3, 10]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = produit(a, b, cc, d);
          return {
            enonce: 'Calcule : ' + frac(a, b) + ' × ' + frac(cc, d) + '. Donne le résultat sous forme de fraction.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'En haut : ' + a + ' × ' + cc + '. En bas : ' + b + ' × ' + d + '.',
            aideParlee: 'Multiplie les numérateurs entre eux, et les dénominateurs entre eux.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'tresses',
        univers: 'coiffure',
        // [haut, bas, mèches]
        versions: [[2, 3, 24], [3, 4, 32], [3, 5, 40], [5, 6, 36], [2, 5, 45], [4, 7, 28], [3, 8, 48], [5, 9, 54]],
        genere(c) {
          const [a, b, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Esther a ' + n + ' mèches à tresser. Elle en a déjà tressé les ' + frac(a, b) + '. Combien de mèches a-t-elle tressées ?',
            reponse: { type: 'nombre', valeur: n * a / b },
            aide: 'Calcule ' + frac(a, b) + ' × ' + n + ' : d’abord ' + n + ' ÷ ' + b + ', puis fois ' + a + '.',
            aideParlee: 'Partage d’abord les mèches en parts égales, comme le dit le bas, puis prends-en autant que le haut.',
            correction: [n + ' ÷ ' + b + ' = ' + n / b + '.', n / b + ' × ' + a + ' = ' + n * a / b + ' mèches.'],
          };
        },
      },
      {
        id: 'inverse',
        univers: 'commerce',
        versions: [[3, 4], [2, 7], [5, 3], [1, 6], [9, 2], [4, 5], [7, 1], [8, 3]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const ecrit = b === 1 ? String(a) : frac(a, b);
          return {
            enonce: 'Quel est l’inverse de ' + ecrit + ' ? Écris-le sous forme de fraction.',
            reponse: { type: 'fraction', valeur: [b, a] },
            aide: 'Retourne la fraction : le haut passe en bas.' + (b === 1 ? ' ' + a + ', c’est ' + a + '/1.' : ''),
            aideParlee: 'Retourne la fraction : le haut passe en bas, le bas passe en haut.',
            correction: [(b === 1 ? a + ' = ' + a + '/1. ' : '') + 'L’inverse est ' + frac(b, a) + '.', ecrit + ' × ' + frac(b, a) + ' = 1.'],
          };
        },
      },
      {
        id: 'simplifier-avant',
        univers: 'cuisine-restaurant',
        versions: [[2, 3, 3, 5], [4, 5, 5, 7], [3, 8, 8, 9], [5, 6, 6, 11], [7, 4, 4, 9], [2, 9, 9, 7]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = produit(a, b, cc, d);
          return {
            enonce: 'Calcule : ' + frac(a, b) + ' × ' + frac(cc, d) + '. Astuce : regarde bien les nombres avant de multiplier.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: b + ' est en bas de la première fraction et en haut de la seconde : ils se simplifient.',
            aideParlee: 'Un même nombre est en bas d’une fraction et en haut de l’autre : il se simplifie.',
            correction: ['(' + a + ' × ' + cc + ')/(' + b + ' × ' + d + ')' + ' : ' + b + ' est en haut et en bas, on le barre.', 'Il reste ' + frac(k.r[0], k.r[1]) + '.'],
          };
        },
      },
    ],

    defi: {
      // [part du terrain pour le potager a/b, part du potager pour les tomates c/d, aire totale en mètres carrés]
      versions: [[2, 3, 3, 4, 120], [3, 5, 2, 3, 150], [3, 4, 2, 5, 200], [4, 5, 1, 2, 160], [2, 5, 3, 4, 240], [5, 6, 3, 5, 180]],
      genere(c) {
        const [a, b, cc, d, S] = c.alea.choisir(this.versions);
        const k = produit(cc, d, a, b);
        const aire = S * k.r[0] / k.r[1];
        return {
          enonce: 'Le terrain de Laure mesure ' + S + ' mètres carrés. Elle en fait un potager sur les ' + frac(a, b) + ' du terrain. ' +
            'Dans ce potager, elle plante des tomates sur les ' + frac(cc, d) + ' du potager.',
          questions: [
            {
              texte: 'Question 1. Quelle fraction du terrain est plantée en tomates ?',
              reponse: { type: 'fraction', valeur: k.r },
              aide: 'Les tomates, c’est une fraction d’une fraction : multiplie les deux fractions.',
              correction: k.lignes,
            },
            {
              texte: 'Question 2. Quelle est l’aire plantée en tomates, en mètres carrés ?',
              reponse: { type: 'nombre', valeur: aire },
              aide: 'Prends la fraction trouvée à la question 1 et applique-la à l’aire totale du terrain.',
              correction: [frac(k.r[0], k.r[1]) + ' × ' + S + ' = ' + S + ' ÷ ' + k.r[1] + ' × ' + k.r[0] + ' = ' + aire + ' mètres carrés.'],
            },
            {
              texte: 'Question 3. Laure dit : « Les tomates occupent moins de la moitié du terrain. » A-t-elle raison ? Justifie.',
              correction: ['Les tomates occupent ' + frac(k.r[0], k.r[1]) + ' du terrain, soit ' + aire + ' mètres carrés.', 'La moitié du terrain, c’est ' + S / 2 + ' mètres carrés.',
                aire < S / 2 ? aire + ' < ' + S / 2 + ' : Laure a raison.' : aire === S / 2 ? 'Les tomates occupent exactement la moitié, pas moins : Laure a tort.' : aire + ' > ' + S / 2 + ' : Laure a tort.'],
              grille: ['As-tu comparé la part des tomates à la moitié du terrain ?', 'As-tu utilisé la fraction ou les mètres carrés pour comparer ?', 'As-tu conclu par une phrase : « Laure a raison » ou « Laure a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! La moitié des trois quarts n’a plus de secret : on multiplie les hauts et les bas. Et tu sais retourner une fraction.',
    carte: ['moitie-de', 'produit', 'tresses'],
    papierDuSoir: { exercices: ['produit', 'tresses'], defi: true },
    automatismes: [
      {
        id: 'produit-simple',
        versions: [[1, 2, 1, 3], [2, 3, 1, 5], [1, 4, 3, 5], [3, 4, 1, 2], [2, 5, 2, 3]],
        genere(c) { const [a, b, d, e] = c.alea.choisir(this.versions); return { enonce: frac(a, b) + ' × ' + frac(d, e) + ' = ?', reponse: { type: 'fraction', valeur: [a * d, b * e] } }; },
      },
      {
        id: 'inverse-rapide',
        versions: [[2, 3], [5, 4], [1, 7], [3, 1]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Inverse de ' + (b === 1 ? a : frac(a, b)) + ' ?', reponse: { type: 'fraction', valeur: [b, a] } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le savant italien Fibonacci a découvert les chiffres indiens à Béjaïa, en Algérie, puis les a fait connaître en Europe.',
    prenoms: ['Aminata', 'Laure', 'Esther'],
  };
});
