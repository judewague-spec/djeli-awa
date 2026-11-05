/* Notion 10b du bloc « Les nombres » : additionner et soustraire des fractions négatives. Le budget de Rachel et la rivière. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { frac, ppcm, simplifier } = O;
  const fp = (n, d) => (n < 0 ? '(' + frac(n, d) + ')' : frac(n, d));
  /** a/b + c/d avec des signes : lignes et résultat simplifié. */
  function somme(a, b, cc, d) {
    const D = ppcm(b, d);
    const x = a * D / b, y = cc * D / d;
    const r = simplifier(x + y, D);
    const l = [];
    if (D !== b || D !== d) l.push('Même dénominateur : ' + frac(a, b) + ' = ' + frac(x, D) + ' et ' + frac(cc, d) + ' = ' + frac(y, D) + '.');
    l.push(fp(x, D) + ' + ' + fp(y, D) + ' = ' + frac(x + y, D) + ', car ' + (x < 0 ? '(' + x + ')' : x) + ' + ' + (y < 0 ? '(' + y + ')' : y) + ' = ' + (x + y) + '.');
    if (r[1] !== D) l.push('On simplifie : ' + frac(x + y, D) + ' = ' + frac(r[0], r[1]) + '.');
    return { lignes: l, r };
  }

  return {
    id: 'fractions-addition-negatives',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Additionner et soustraire des fractions négatives',
    classe: '4e',
    univers: ['famille', 'dehors', 'champetre'],

    accroche: {
      texte: 'Rachel suit son budget du mois. La première semaine, ses économies baissent d’un tiers du budget : une grosse facture. ' +
        'La deuxième semaine, elles remontent d’un quart du budget grâce à un petit travail. ' +
        'Au bout de deux semaines, a-t-elle gagné ou perdu ? Et de combien ?',
      image: { dessin: 'thermometre', min: -6, max: 6, valeur: -1, depart: -4, description: 'Une échelle graduée comme un thermomètre : on descend de 4 crans, puis on remonte de 3. On finit un cran au-dessous de zéro.' },
    },

    manipulation: {
      image: { dessin: 'gateau', gateaux: [{ nom: 'Baisse : un tiers', parts: 12, prises: 4 }, { nom: 'Hausse : un quart', parts: 12, prises: 3 }], description: 'Deux barres coupées en 12 : 4 parts de baisse, 3 parts de hausse.' },
      etapes: [
        'Une baisse d’un tiers s’écrit −1/3. Une hausse d’un quart s’écrit +1/4.',
        'Même dénominateur : −1/3 = −4/12, et 1/4 = 3/12.',
        'Sur une échelle de douzièmes, on descend de 4, puis on remonte de 3 : −4/12 + 3/12 = −1/12.',
        'Le résultat est négatif : au bout de deux semaines, Rachel a perdu un douzième de son budget.',
      ],
    },

    decouverte: {
      texte: (c) => '−1/3 + 1/4 = −4/12 + 3/12 = −1/12. L’astuce : même dénominateur d’abord, comme pour les fractions positives. ' +
        'Puis tu calcules les numérateurs avec les règles des nombres relatifs. ' +
        'Le signe moins peut se mettre devant, en haut ou en bas : −1/12, c’est la même chose. Et soustraire une fraction, c’est ajouter ' + c.mot('oppose') + '.',
    },

    vocabulaire: {
      termes: {
        oppose: { sesMots: 'la même fraction avec l’autre signe', officiel: 'son opposé', lesDeux: 'la même fraction avec l’autre signe, son opposé' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 1/4 et −1/4, c’est la même fraction avec l’autre signe. Soustraire 1/4, c’est ajouter −1/4. ' +
          'Les matheux ont un mot pour ça : je te le dirai la prochaine fois.',
        'Les matheux disent : −1/4 est l’opposé de 1/4. La même fraction avec l’autre signe, c’est l’opposé. ' +
          'Soustraire une fraction, c’est ajouter son opposé.',
        'Tu connais le mot officiel : l’opposé de 1/4 est −1/4. Soustraire un nombre, c’est ajouter son opposé.',
      ],
    },

    exercices: [
      {
        id: 'meme-bas-signe',
        univers: 'famille',
        versions: [[-5, 7, 2], [-3, 8, 7], [-4, 9, 1], [-6, 11, 4], [-2, 5, 4], [-9, 10, 3], [-7, 12, 2], [-1, 6, -4]],
        genere(c) {
          const [a, n, b] = c.alea.choisir(this.versions);
          const k = somme(a, n, b, n);
          return {
            enonce: 'Calcule : ' + frac(a, n) + ' + ' + fp(b, n) + '. Écris le signe moins devant s’il le faut, par exemple -2/7.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Même dénominateur : calcule ' + a + ' + ' + (b < 0 ? '(' + b + ')' : b) + ' en haut.',
            aideParlee: 'Même dénominateur : calcule les numérateurs avec la règle des nombres relatifs, et garde le dénominateur.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'soustraire',
        univers: 'dehors',
        versions: [[1, 5, 3], [2, 7, 6], [1, 4, 3], [3, 10, 7], [2, 9, 8], [1, 3, 2], [5, 12, 11], [1, 8, 5]],
        genere(c) {
          const [a, n, b] = c.alea.choisir(this.versions);
          const k = somme(a, n, -b, n);
          return {
            enonce: 'Calcule : ' + frac(a, n) + ' − ' + frac(b, n) + '. Écris le signe moins devant s’il le faut.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Soustraire ' + frac(b, n) + ', c’est ajouter ' + frac(-b, n) + '.',
            aideParlee: 'Soustraire une fraction, c’est ajouter son opposé. Puis calcule les numérateurs.',
            correction: [frac(a, n) + ' − ' + frac(b, n) + ' = ' + frac(a, n) + ' + ' + fp(-b, n) + '.'].concat(k.lignes),
          };
        },
      },
      {
        id: 'budget',
        univers: 'famille',
        // [baisse a/b, hausse c/d]
        versions: [[1, 3, 1, 4], [1, 2, 1, 3], [2, 5, 1, 10], [3, 4, 1, 2], [1, 4, 1, 6], [2, 3, 1, 2], [1, 2, 1, 5], [5, 6, 1, 3]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = somme(-a, b, cc, d);
          return {
            enonce: 'Les économies de Rachel baissent de ' + frac(a, b) + ' de son budget, puis remontent de ' + frac(cc, d) + ' de son budget. ' +
              'Écris le changement total comme une fraction, avec son signe.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Calcule ' + frac(-a, b) + ' + ' + frac(cc, d) + ', avec un dénominateur commun.',
            aideParlee: 'Une baisse est négative, une hausse est positive. Ajoute les deux, avec un dénominateur commun.',
            correction: [frac(-a, b) + ' + ' + frac(cc, d) + ' :'].concat(k.lignes),
          };
        },
      },
      {
        id: 'riviere',
        univers: 'champetre',
        // [montée a/b, baisse c/d] en mètres
        versions: [[1, 2, 3, 4], [1, 4, 1, 2], [2, 3, 5, 6], [1, 3, 1, 2], [3, 8, 3, 4], [1, 5, 1, 2], [3, 4, 5, 6], [1, 6, 2, 3]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = somme(a, b, -cc, d);
          return {
            enonce: 'Près du village, la rivière monte de ' + frac(a, b) + ' de mètre pendant l’orage, puis baisse de ' + frac(cc, d) + ' de mètre le lendemain. ' +
              'De combien de mètres a-t-elle changé en tout ? Écris une fraction avec son signe.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Calcule ' + frac(a, b) + ' + (' + frac(-cc, d) + ').',
            aideParlee: 'Une montée est positive, une baisse est négative. Ajoute les deux, avec un dénominateur commun.',
            correction: [frac(a, b) + ' + ' + fp(-cc, d) + ' :'].concat(k.lignes),
          };
        },
      },
      {
        id: 'oppose',
        univers: 'dehors',
        versions: [[-3, 4], [5, 7], [-2, 9], [7, 3], [-11, 5], [1, 8], [-5, 6], [4, 13]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel est l’opposé de ' + frac(a, b) + ' ?',
            reponse: { type: 'fraction', valeur: [-a, b], equivalentes: true },
            aide: 'La même fraction, avec l’autre signe.',
            correction: ['On change le signe : l’opposé de ' + frac(a, b) + ' est ' + frac(-a, b) + '.', frac(a, b) + ' + ' + fp(-a, b) + ' = 0.'],
          };
        },
      },
    ],

    defi: {
      // Variation de la hauteur d'eau d'un puits sur trois jours, en mètres : [[a, b], [c, d], [e, f]]
      versions: [[[1, 2], [-3, 4], [-1, 4]], [[2, 3], [-1, 2], [-1, 3]], [[3, 4], [-5, 6], [1, 3]], [[1, 4], [-1, 2], [1, 8]], [[1, 3], [-5, 6], [1, 4]], [[2, 5], [-1, 2], [3, 10]]],
      genere(c) {
        const fr = c.alea.choisir(this.versions);
        const k1 = somme(fr[0][0], fr[0][1], fr[1][0], fr[1][1]);
        const k2 = somme(k1.r[0], k1.r[1], fr[2][0], fr[2][1]);
        const bas = k2.r[0] < 0;
        return {
          enonce: 'Au village, Ibrahim mesure chaque jour la hauteur de l’eau du puits. Le premier jour, elle change de ' + frac(...fr[0]) + ' de mètre. ' +
            'Le deuxième jour, de ' + frac(...fr[1]) + ' de mètre. Le troisième jour, de ' + frac(...fr[2]) + ' de mètre. ' +
            'Une fraction positive veut dire que l’eau monte ; négative, qu’elle baisse.',
          questions: [
            {
              texte: 'Question 1. De combien la hauteur de l’eau a-t-elle changé au bout des deux premiers jours ?',
              reponse: { type: 'fraction', valeur: k1.r },
              aide: 'Ajoute les deux premières fractions, avec un dénominateur commun.',
              correction: k1.lignes,
            },
            {
              texte: 'Question 2. De combien a-t-elle changé au bout des trois jours ?',
              reponse: { type: 'fraction', valeur: k2.r },
              aide: 'Ajoute la troisième fraction au résultat de la question 1.',
              correction: k2.lignes,
            },
            {
              texte: 'Question 3. Fatou dit : « Au bout des trois jours, l’eau est plus basse qu’au départ. » A-t-elle raison ? Justifie.',
              correction: ['Le changement total est ' + frac(k2.r[0], k2.r[1]) + ' de mètre.', bas ? 'Il est négatif : l’eau a baissé. Fatou a raison.' : 'Il est positif ou nul : l’eau n’a pas baissé. Fatou a tort.'],
              grille: ['As-tu utilisé le changement total de la question 2 ?', 'As-tu regardé son signe ?', 'As-tu conclu par une phrase : « Fatou a raison » ou « Fatou a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Les fractions négatives ne te font plus peur : même dénominateur, puis la règle des nombres relatifs.',
    carte: ['meme-bas-signe', 'budget', 'riviere'],
    papierDuSoir: { exercices: ['budget', 'soustraire'], defi: true },
    automatismes: [
      {
        id: 'somme-signee',
        versions: [[-3, 5, 1], [-2, 7, 5], [1, 4, -3], [-5, 9, 2], [-1, 3, -1], [4, 11, -6]],
        genere(c) { const [a, n, b] = c.alea.choisir(this.versions); return { enonce: frac(a, n) + ' + ' + fp(b, n) + ' = ?', reponse: { type: 'fraction', valeur: [a + b, n] } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le lac Assal, à Djibouti, est le point le plus bas d’Afrique : sa surface est plus basse que celle de la mer.',
    prenoms: ['Rachel', 'Ibrahim', 'Fatou'],
  };
});
