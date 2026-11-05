/* Notion 10a du bloc « Les nombres » : additionner et soustraire des fractions positives. Le lait de la recette. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { frac, ppcm, simplifier } = O;
  /** Les lignes d'un calcul a/b ± c/d, et le résultat simplifié. */
  function calcul(a, b, cc, d, signe) {
    const D = ppcm(b, d);
    const x = a * D / b, y = cc * D / d;
    const n = signe === '+' ? x + y : x - y;
    const r = simplifier(n, D);
    const l = [];
    if (D !== b || D !== d) l.push('Même dénominateur : ' + frac(a, b) + ' = ' + frac(x, D) + (D !== d ? ' et ' + frac(cc, d) + ' = ' + frac(y, D) : '') + '.');
    l.push(frac(x, D) + ' ' + (signe === '+' ? '+' : '−') + ' ' + frac(y, D) + ' = ' + frac(n, D) + '.');
    if (r[1] !== D) l.push('On simplifie : ' + frac(n, D) + ' = ' + frac(r[0], r[1]) + '.');
    return { lignes: l, r };
  }

  return {
    id: 'fractions-addition-positives',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Additionner et soustraire des fractions positives',
    classe: '4e',
    univers: ['cuisine-restaurant', 'maison-courses', 'champetre'],

    accroche: {
      texte: 'Fatou prépare un gâteau au lait de coco. La recette demande un demi-litre de lait, puis encore un quart de litre pour le glaçage. ' +
        'Elle n’a qu’un verre doseur, gradué en quarts de litre. Combien de lait lui faut-il en tout ?',
      image: { dessin: 'gateau', gateaux: [{ nom: 'Un demi-litre', parts: 2, prises: 1 }, { nom: 'Un quart de litre', parts: 4, prises: 1 }], description: 'Deux verres doseurs de même taille : l’un rempli à moitié, l’autre au quart.' },
    },

    manipulation: {
      image: { dessin: 'gateau', gateaux: [{ nom: 'Un demi-litre, en quarts', parts: 4, prises: 2 }, { nom: 'Un quart de litre', parts: 4, prises: 1 }], description: 'Les deux verres gradués en quarts : 2 quarts dans le premier, 1 quart dans le second.' },
      etapes: [
        'Un demi-litre, c’est 1/2. Un quart de litre, c’est 1/4. On ne peut pas ajouter des moitiés et des quarts tels quels.',
        'Dans un demi-litre, il y a deux quarts : 1/2 = 2/4.',
        'Maintenant, on ajoute des quarts avec des quarts : 2/4 + 1/4 = 3/4.',
        'Il faut trois quarts de litre de lait. Attention : on n’ajoute jamais les nombres du bas !',
      ],
    },

    decouverte: {
      texte: (c) => '1/2 + 1/4 = 2/4 + 1/4 = 3/4. L’astuce : d’abord ' + c.mot('reduire') + ', puis on ajoute les numérateurs, et on garde le dénominateur. ' +
        'Pour soustraire, c’est pareil : 3/4 − 1/2 = 3/4 − 2/4 = 1/4. Et à la fin, on simplifie si on peut.',
    },

    vocabulaire: {
      termes: {
        reduire: { sesMots: 'on met les deux fractions en parts de même taille', officiel: 'on réduit au même dénominateur', lesDeux: 'on met les deux fractions en parts de même taille, on dit : on réduit au même dénominateur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : avant d’ajouter, on met les deux fractions en parts de même taille, ici des quarts. ' +
          'Les matheux ont une expression pour ça : je te la dirai la prochaine fois.',
        'Les matheux disent : on réduit au même dénominateur. C’est notre façon de mettre en parts de même taille. ' +
          'Ensuite, on ajoute les numérateurs, et le dénominateur ne bouge pas.',
        'Tu connais l’expression officielle : pour ajouter ou soustraire deux fractions, on les réduit au même dénominateur, puis on ajoute ou on soustrait les numérateurs.',
      ],
    },

    exercices: [
      {
        id: 'meme-denominateur',
        univers: 'cuisine-restaurant',
        versions: [[2, 7, 3], [1, 5, 2], [4, 9, 2], [3, 11, 5], [5, 13, 4], [2, 9, 4], [1, 8, 3], [3, 10, 4]],
        genere(c) {
          const [a, n, b] = c.alea.choisir(this.versions);
          const k = calcul(a, n, b, n, '+');
          return {
            enonce: 'Dans une recette, Fatou met ' + frac(a, n) + ' de sachet de sucre, puis ' + frac(b, n) + ' de sachet. Quelle fraction du sachet a-t-elle utilisée ?',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Même dénominateur : ajoute seulement les numérateurs.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'un-multiple',
        univers: 'maison-courses',
        versions: [[1, 2, 1, 6], [1, 3, 2, 9], [3, 4, 1, 8], [2, 5, 3, 10], [1, 4, 5, 12], [1, 2, 3, 10], [2, 3, 1, 12], [1, 5, 7, 15]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = calcul(a, b, cc, d, '+');
          return {
            enonce: 'Calcule : ' + frac(a, b) + ' + ' + frac(cc, d) + '. Donne le résultat sous forme de fraction.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Écris ' + frac(a, b) + ' avec ' + d + ' en bas.',
            aideParlee: 'Écris la première fraction avec le même dénominateur que la seconde, puis ajoute les numérateurs.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'deux-denominateurs',
        univers: 'cuisine-restaurant',
        versions: [[1, 2, 1, 3], [2, 3, 1, 4], [1, 4, 1, 6], [3, 4, 1, 6], [2, 5, 1, 2], [1, 3, 2, 5], [5, 6, 1, 4], [1, 6, 3, 8]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = calcul(a, b, cc, d, '+');
          return {
            enonce: 'Laure verse ' + frac(a, b) + ' de litre d’eau, puis ' + frac(cc, d) + ' de litre. Quelle quantité d’eau a-t-elle versée, en litre ? Écris une fraction.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Cherche un dénominateur commun à ' + b + ' et ' + d + '.',
            aideParlee: 'Cherche un dénominateur commun aux deux fractions : un nombre qui est dans les deux tables.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'soustraction',
        univers: 'cuisine-restaurant',
        versions: [[3, 4, 1, 2], [5, 6, 1, 3], [7, 8, 1, 4], [2, 3, 1, 6], [4, 5, 1, 2], [5, 6, 3, 4], [9, 10, 2, 5], [3, 4, 1, 3]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = calcul(a, b, cc, d, '−');
          return {
            enonce: 'Il reste ' + frac(a, b) + ' de litre de jus. Moussa en boit ' + frac(cc, d) + ' de litre. Combien en reste-t-il ? Écris une fraction.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Même dénominateur d’abord, puis soustrais les numérateurs.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'reste',
        univers: 'champetre',
        versions: [[1, 3], [2, 5], [3, 8], [5, 12], [3, 7], [4, 9], [1, 6], [7, 10]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au potager, Rachel a déjà arrosé ' + frac(a, b) + ' des plantes. Quelle fraction des plantes reste-t-il à arroser ?',
            reponse: { type: 'fraction', valeur: [b - a, b] },
            aide: 'Toutes les plantes, c’est ' + frac(b, b) + '. Calcule ' + frac(b, b) + ' − ' + frac(a, b) + '.',
            aideParlee: 'Toutes les plantes, c’est une fraction avec autant en haut qu’en bas. Enlève ce qui est déjà arrosé.',
            correction: ['1 = ' + frac(b, b) + '.', frac(b, b) + ' − ' + frac(a, b) + ' = ' + frac(b - a, b) + '.'],
          };
        },
      },
    ],

    defi: {
      // [[manioc], [maïs]] : le reste est en arachides
      versions: [[[1, 3], [1, 4]], [[1, 2], [1, 3]], [[2, 5], [1, 4]], [[1, 4], [1, 6]], [[1, 3], [2, 5]], [[3, 8], [1, 8]]],
      genere(c) {
        const [[a, b], [cc, d]] = c.alea.choisir(this.versions);
        const k = calcul(a, b, cc, d, '+');
        const [p, q] = k.r;
        const reste = [q - p, q];
        const parts = [['le manioc', a / b], ['le maïs', cc / d], ['les arachides', reste[0] / reste[1]]].sort((x, y) => y[1] - x[1]);
        return {
          enonce: 'Laure partage son champ en trois cultures. Elle plante du manioc sur ' + frac(a, b) + ' du champ, du maïs sur ' + frac(cc, d) + ' du champ, ' +
            'et des arachides sur le reste.',
          questions: [
            {
              texte: 'Question 1. Quelle fraction du champ est plantée en manioc et en maïs ?',
              reponse: { type: 'fraction', valeur: k.r },
              aide: 'Ajoute les deux fractions, avec un dénominateur commun.',
              correction: k.lignes,
            },
            {
              texte: 'Question 2. Quelle fraction du champ est plantée en arachides ?',
              reponse: { type: 'fraction', valeur: reste },
              aide: 'Le champ entier, c’est 1. Enlève ce qui est déjà planté.',
              correction: ['1 − ' + frac(p, q) + ' = ' + frac(q, q) + ' − ' + frac(p, q) + ' = ' + frac(reste[0], reste[1]) + '.'],
            },
            {
              texte: 'Question 3. Quelle culture occupe la plus grande partie du champ ? Justifie ta réponse.',
              correction: ['Avec le dénominateur ' + ppcm(ppcm(b, d), q) + ', on compare les trois fractions.', 'La plus grande partie est pour ' + parts[0][0] + '.'],
              grille: ['As-tu écrit les trois fractions avec le même dénominateur ?', 'As-tu comparé les numérateurs ?', 'As-tu conclu par une phrase qui nomme la culture ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais ajouter et enlever des fractions : d’abord des parts de même taille, puis tu comptes.',
    carte: ['un-multiple', 'deux-denominateurs', 'soustraction'],
    papierDuSoir: { exercices: ['deux-denominateurs', 'soustraction'], defi: true },
    automatismes: [
      {
        id: 'somme-meme-bas',
        versions: [[1, 5, 2], [2, 7, 3], [3, 8, 4], [1, 9, 4], [5, 11, 3], [2, 13, 7]],
        genere(c) { const [a, n, b] = c.alea.choisir(this.versions); return { enonce: frac(a, n) + ' + ' + frac(b, n) + ' = ?', reponse: { type: 'fraction', valeur: [a + b, n] } }; },
      },
      {
        id: 'moitie-plus-quart',
        versions: [[1, 2, 1, 4], [1, 2, 1, 6], [1, 3, 1, 6], [1, 4, 1, 8]],
        genere(c) { const [a, b, d, e] = c.alea.choisir(this.versions); return { enonce: frac(a, b) + ' + ' + frac(d, e) + ' = ?', reponse: { type: 'fraction', valeur: [a * e + d * b, b * e] } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le livre d’algèbre d’al-Khwarizmi, écrit à Bagdad, se termine par des règles pour partager les héritages.',
    prenoms: ['Fatou', 'Laure', 'Moussa', 'Rachel'],
  };
});
