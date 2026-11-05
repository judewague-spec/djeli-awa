/* Notion 9 du bloc « Les nombres » : comparer et ranger des fractions. Les gâteaux de Rachel et d'Esther. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { frac, ppcm } = O;
  /** a/b écrit avec le dénominateur D. */
  const sur = (a, b, D) => (D === b ? frac(a, b) : frac(a, b) + ' = ' + frac(a * D / b, D));

  return {
    id: 'fractions-comparer',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Comparer et ranger des fractions',
    classe: '4e',
    univers: ['cuisine-restaurant', 'maison-courses', 'famille'],

    accroche: {
      texte: 'Laure a fait deux gâteaux de la même taille. Rachel a mangé 2 parts du gâteau coupé en 3. ' +
        'Esther a mangé 3 parts du gâteau coupé en 4. Chacune dit qu’elle a mangé le moins ! Qui a mangé le plus de gâteau ?',
      image: { dessin: 'gateau', gateaux: [{ nom: 'Rachel', parts: 3, prises: 2 }, { nom: 'Esther', parts: 4, prises: 3 }], description: 'Deux gâteaux rectangulaires de même taille. Celui de Rachel est coupé en 3 parts, dont 2 mangées. Celui d’Esther est coupé en 4 parts, dont 3 mangées.' },
    },

    manipulation: {
      type: 'gateau',
      gateaux: [{ nom: 'Rachel', parts: 3, prises: 2 }, { nom: 'Esther', parts: 4, prises: 3 }],
      consigne: 'Les parts des deux gâteaux n’ont pas la même taille : on ne peut pas comparer en comptant. ' +
        'Recoupe chaque gâteau en plus de parts, jusqu’à ce que les deux gâteaux aient le même nombre de parts. Puis touche « Comparer les gâteaux ».',
    },

    decouverte: {
      texte: (c) => 'Avec 12 parts chacun, Rachel a mangé 8 parts, et Esther 9 parts. 2/3 = 8/12 et 3/4 = 9/12. ' +
        'Esther a mangé le plus : 3/4 est plus grand que 2/3. On écrit 2/3 < 3/4. ' +
        'L’astuce : pour comparer deux fractions, on les écrit avec ' + c.mot('meme') + '. Ensuite, il suffit de comparer les numérateurs.',
      image: { dessin: 'gateau', gateaux: [{ nom: 'Rachel', parts: 12, prises: 8 }, { nom: 'Esther', parts: 12, prises: 9 }], description: 'Les deux gâteaux recoupés en 12 parts : Rachel en a mangé 8, Esther 9.' },
    },

    vocabulaire: {
      termes: {
        meme: { sesMots: 'des parts de même taille', officiel: 'le même dénominateur', lesDeux: 'des parts de même taille, c’est-à-dire le même dénominateur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : pour comparer, on recoupe les gâteaux pour avoir des parts de même taille. ' +
          'Les matheux ont une façon de le dire : je te la donnerai la prochaine fois.',
        'Les matheux disent : réduire au même dénominateur. Des parts de même taille, c’est le même nombre en bas de la fraction. ' +
          'Et le signe « plus petit que » s’écrit avec une pointe tournée vers le plus petit nombre.',
        'Tu connais les mots officiels : pour comparer deux fractions, on les réduit au même dénominateur, puis on compare les numérateurs.',
      ],
    },

    exercices: [
      {
        id: 'meme-bas',
        univers: 'cuisine-restaurant',
        // [a, b, dénominateur commun]
        versions: [[3, 5, 7], [4, 2, 9], [5, 7, 11], [7, 3, 10], [2, 5, 6], [9, 4, 12], [6, 11, 13], [5, 3, 8]],
        genere(c) {
          const [a, b, n] = c.alea.choisir(this.versions);
          const bonne = frac(Math.max(a, b), n);
          return {
            enonce: 'Moussa mange ' + frac(a, n) + ' d’une galette, et Ibrahim ' + frac(b, n) + ' d’une galette pareille. Lequel a mangé le plus ? Choisis la plus grande fraction.',
            reponse: O.choix(c.alea, bonne, [frac(a, n), frac(b, n)]),
            aide: 'Les deux galettes sont coupées en ' + n + ' : compare le nombre de parts prises.',
            aideParlee: 'Les parts ont déjà la même taille : compare seulement les nombres du haut.',
            correction: ['Même dénominateur : on compare ' + a + ' et ' + b + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'meme-haut',
        univers: 'maison-courses',
        // [haut commun, b, d]
        versions: [[1, 3, 5], [1, 4, 6], [2, 5, 3], [3, 8, 4], [1, 7, 2], [2, 9, 7], [3, 5, 10], [1, 10, 8]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const bonne = frac(a, Math.min(b, d));
          return {
            enonce: 'Deux bouteilles de jus identiques : il reste ' + frac(a, b) + ' de la première et ' + frac(a, d) + ' de la seconde. Laquelle est la plus pleine ? Choisis la plus grande fraction.',
            reponse: O.choix(c.alea, bonne, [frac(a, b), frac(a, d)]),
            aide: 'Même nombre de parts prises : plus le bas est grand, plus les parts sont petites.',
            correction: ['Les deux fractions ont ' + a + ' en haut.', 'Couper en ' + Math.min(b, d) + ' donne des parts plus grosses que couper en ' + Math.max(b, d) + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'un-bas-multiple',
        univers: 'cuisine-restaurant',
        // [a, b, c, d] : d est un multiple de b
        versions: [[1, 2, 3, 4], [2, 3, 5, 6], [3, 4, 5, 8], [1, 3, 4, 9], [2, 5, 3, 10], [3, 5, 7, 10], [5, 6, 11, 12], [1, 4, 3, 8], [3, 7, 5, 14], [2, 3, 7, 12]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const gauche = a * d / b;
          const bonne = gauche > cc ? frac(a, b) : frac(cc, d);
          return {
            enonce: 'Quelle est la plus grande fraction : ' + frac(a, b) + ' ou ' + frac(cc, d) + ' ?',
            reponse: O.choix(c.alea, bonne, [frac(a, b), frac(cc, d)]),
            aide: 'Écris ' + frac(a, b) + ' avec ' + d + ' en bas.',
            aideParlee: 'Écris la première fraction avec le même dénominateur que la seconde : multiplie le haut et le bas par le même nombre.',
            correction: [sur(a, b, d) + '.', 'On compare ' + gauche + ' et ' + cc + ' : ' + (gauche > cc ? frac(gauche, d) + ' > ' + frac(cc, d) : frac(gauche, d) + ' < ' + frac(cc, d)) + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'plus-que-un',
        univers: 'famille',
        versions: [[7, 5], [3, 8], [9, 4], [5, 6], [11, 10], [4, 9], [13, 12], [6, 7], [8, 3], [2, 11]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = a > b ? 'Plus grand que 1' : 'Plus petit que 1';
          return {
            enonce: 'Pour la fête, Laure prévoit ' + frac(a, b) + ' de gâteau par personne. Est-ce plus ou moins qu’un gâteau entier ?',
            reponse: O.choix(c.alea, bonne, ['Plus grand que 1', 'Plus petit que 1']),
            aide: 'Un gâteau entier, c’est ' + frac(b, b) + '. Compare ' + a + ' et ' + b + '.',
            aideParlee: 'Un gâteau entier, c’est autant en haut qu’en bas. Compare le haut et le bas.',
            correction: ['1 = ' + frac(b, b) + '.', a > b ? a + ' > ' + b + ' : il y a plus d’un gâteau.' : a + ' < ' + b + ' : il y a moins d’un gâteau.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'bas-commun',
        univers: 'maison-courses',
        versions: [[2, 3], [3, 4], [4, 6], [2, 5], [6, 8], [3, 5], [4, 10], [6, 9], [5, 6], [8, 12]],
        genere(c) {
          const [b, d] = c.alea.choisir(this.versions);
          const D = ppcm(b, d);
          return {
            enonce: 'Pour comparer une fraction de dénominateur ' + b + ' et une fraction de dénominateur ' + d + ', quel est le plus petit dénominateur commun possible ?',
            reponse: { type: 'nombre', valeur: D },
            aide: 'Cherche le plus petit nombre qui est à la fois dans la table de ' + b + ' et dans celle de ' + d + '.',
            aideParlee: 'Cherche le plus petit nombre qui est à la fois dans les deux tables.',
            correction: ['Table de ' + b + ' : ' + Array.from({ length: D / b }, (_, i) => b * (i + 1)).join(', ') + '.', 'Table de ' + d + ' : ' + Array.from({ length: D / d }, (_, i) => d * (i + 1)).join(', ') + '.', 'Le plus petit multiple commun est ' + D + '.'],
          };
        },
      },
    ],

    defi: {
      // Trois fractions de jus restant : [[a, b], [c, d], [e, f]]
      versions: [[[1, 2], [2, 3], [3, 4]], [[3, 4], [5, 8], [1, 2]], [[2, 3], [5, 6], [7, 12]], [[3, 5], [7, 10], [1, 2]], [[5, 6], [3, 4], [2, 3]], [[1, 3], [4, 9], [1, 2]]],
      genere(c) {
        const fr = c.alea.choisir(this.versions);
        const D = fr.reduce((m, [, b]) => ppcm(m, b), 1);
        const hauts = fr.map(([a, b]) => a * D / b);
        const noms = ['Rachel', 'Esther', 'Aminata'];
        const plus = fr[hauts.indexOf(Math.max(...hauts))];
        const ordre = fr.map((f, i) => [f, hauts[i]]).sort((x, y) => x[1] - y[1]).map(([f]) => frac(f[0], f[1]));
        return {
          enonce: 'Trois amies ont chacune une bouteille de jus de gingembre de la même taille. Il reste ' + frac(...fr[0]) + ' de la bouteille de Rachel, ' +
            frac(...fr[1]) + ' de celle d’Esther et ' + frac(...fr[2]) + ' de celle d’Aminata.',
          questions: [
            {
              texte: 'Question 1. Quel est le plus petit dénominateur commun aux trois fractions ?',
              reponse: { type: 'nombre', valeur: D },
              aide: 'Cherche le plus petit nombre qui est dans les trois tables.',
              correction: ['Le plus petit nombre commun aux tables de ' + fr.map(([, b]) => b).join(', ') + ' est ' + D + '.'],
            },
            {
              texte: 'Question 2. Quelle bouteille est la plus pleine ? Choisis sa fraction.',
              reponse: O.choix(c.alea, frac(...plus), fr.map((f) => frac(...f))),
              aide: 'Écris les trois fractions avec le même dénominateur, puis compare les numérateurs.',
              correction: fr.map(([a, b]) => sur(a, b, D)).concat(['Réponse : ' + frac(...plus) + ', la bouteille ' + (/^[AEIOUÉ]/.test(noms[hauts.indexOf(Math.max(...hauts))]) ? 'd’' : 'de ') + noms[hauts.indexOf(Math.max(...hauts))] + '.']),
            },
            {
              texte: 'Question 3. Range les trois fractions de la plus petite à la plus grande, en justifiant.',
              correction: fr.map(([a, b]) => sur(a, b, D)).concat(['On compare les numérateurs : ' + hauts.slice().sort((x, y) => x - y).join(' < ') + '.', 'Donc ' + ordre.join(' < ') + '.']),
              grille: ['As-tu écrit les trois fractions avec le dénominateur ' + D + ' ?', 'As-tu comparé les numérateurs ?', 'As-tu écrit le rangement avec le signe < ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais recouper les gâteaux pour avoir des parts de même taille, et comparer n’importe quelles fractions.',
    carte: ['meme-bas', 'un-bas-multiple', 'plus-que-un'],
    papierDuSoir: { exercices: ['un-bas-multiple', 'bas-commun'], defi: true },
    automatismes: [
      {
        id: 'plus-grande',
        versions: [[1, 2, 1, 3], [3, 4, 2, 4], [2, 5, 3, 5], [1, 4, 1, 2], [5, 6, 5, 8], [2, 3, 1, 3]],
        genere(c) { const [a, b, d, e] = c.alea.choisir(this.versions); const bonne = a / b > d / e ? frac(a, b) : frac(d, e); return { enonce: 'La plus grande : ' + frac(a, b) + ' ou ' + frac(d, e) + ' ?', reponse: O.choix(c.alea, bonne, [frac(a, b), frac(d, e)]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? On raconte que Pythagore a remarqué que des cordes dont les longueurs sont dans des rapports simples donnent des sons qui vont bien ensemble.',
    prenoms: ['Laure', 'Rachel', 'Esther', 'Moussa', 'Ibrahim', 'Aminata'],
  };
});
