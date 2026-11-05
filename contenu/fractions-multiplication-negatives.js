/* Notion 11b du bloc « Les nombres » : multiplier des fractions négatives. Les dettes partagées. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { frac, simplifier, ecr } = O;
  const fp = (n, d) => (n < 0 ? '(' + frac(n, d) + ')' : frac(n, d));
  function produit(a, b, cc, d) {
    const n = a * cc, D = b * d;
    const r = simplifier(n, D);
    const l = ['Sans les signes : ' + frac(Math.abs(a), b) + ' × ' + frac(Math.abs(cc), d) + ' = ' + frac(Math.abs(n), D) + '.',
      (a < 0) === (cc < 0) ? 'Les signes sont pareils : le résultat est positif.' : 'Les signes sont différents : le résultat est négatif.',
      fp(a, b) + ' × ' + fp(cc, d) + ' = ' + frac(n, D) + '.'];
    if (r[1] !== D) l.push('On simplifie : ' + frac(n, D) + ' = ' + frac(r[0], r[1]) + '.');
    return { lignes: l, r };
  }

  return {
    id: 'fractions-multiplication-negatives',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Multiplier des fractions négatives',
    classe: '4e',
    univers: ['famille', 'commerce'],

    accroche: {
      texte: 'Ibrahim et Moussa ont ouvert un petit commerce ensemble. Ce mois-ci, le commerce perd les trois quarts d’une grosse commande. ' +
        'Ibrahim supporte les deux tiers de cette perte. Quelle part de la commande Ibrahim perd-il ? Une perte, c’est un nombre négatif.',
      image: { dessin: 'gateau', parts: 4, prises: 3, description: 'Une commande vue comme une barre coupée en 4 : 3 parts sont perdues.' },
    },

    manipulation: {
      image: { dessin: 'gateau', parts: 12, prises: 6, description: 'La barre coupée en 12 : les deux tiers des trois quarts, ce sont 6 parts sur 12, la moitié.' },
      etapes: [
        'La perte s’écrit −3/4. Ibrahim en prend les deux tiers : 2/3 × (−3/4).',
        'D’abord sans les signes : 2/3 × 3/4 = 6/12 = 1/2.',
        'Puis les signes : un positif fois un négatif, c’est négatif, comme pour les dettes.',
        'Donc 2/3 × (−3/4) = −1/2. Ibrahim perd la moitié de la commande.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour multiplier des fractions avec des signes, on fait deux choses. On multiplie sans les signes, les hauts entre eux et les bas entre eux. ' +
        'Puis on applique ' + c.mot('regle') + ' : signes pareils, positif ; signes différents, négatif. ' +
        'Et l’inverse d’une fraction négative est négatif : l’inverse de −3/4 est −4/3.',
    },

    vocabulaire: {
      termes: {
        regle: { sesMots: 'l’astuce des dettes', officiel: 'la règle des signes', lesDeux: 'l’astuce des dettes, la règle des signes' },
      },
      textes: [
        'Pour l’instant, garde tes mots : c’est l’astuce des dettes, comme avec les nombres entiers. Une perte partagée reste une perte. ' +
          'Je te redonnerai le mot des matheux la prochaine fois.',
        'Les matheux appellent l’astuce des dettes la règle des signes. Elle marche pour les fractions comme pour les nombres entiers.',
        'Tu connais le mot officiel : la règle des signes. Le produit de deux fractions de même signe est positif ; de signes contraires, il est négatif.',
      ],
    },

    exercices: [
      {
        id: 'un-negatif',
        univers: 'commerce',
        versions: [[-2, 3, 3, 5], [3, 4, -1, 2], [-5, 6, 2, 7], [1, 3, -3, 8], [-4, 5, 5, 6], [2, 7, -7, 9], [-3, 10, 5, 3], [5, 8, -2, 5]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = produit(a, b, cc, d);
          return {
            enonce: 'Calcule : ' + fp(a, b) + ' × ' + fp(cc, d) + '. Écris le signe moins devant s’il le faut.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Multiplie sans les signes, puis regarde les signes.',
            aideParlee: 'Multiplie sans les signes, puis applique la règle des signes.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'deux-negatifs',
        univers: 'famille',
        versions: [[-1, 2, -3, 5], [-2, 3, -6, 7], [-3, 4, -2, 9], [-5, 2, -1, 3], [-4, 7, -7, 8], [-1, 6, -5, 4]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = produit(a, b, cc, d);
          return {
            enonce: 'Calcule : ' + fp(a, b) + ' × ' + fp(cc, d) + '.',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Deux signes moins : le résultat est positif.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'part-de-dette',
        univers: 'famille',
        // [part a/b, dette en euros]
        versions: [[2, 3, 30], [3, 4, 48], [1, 5, 60], [2, 5, 45], [5, 6, 36], [3, 8, 64], [1, 3, 27], [4, 7, 56]],
        genere(c) {
          const [a, b, D] = c.alea.choisir(this.versions);
          return {
            enonce: 'La famille de Rebecca a une dette de ' + D + ' euros, qu’on écrit ' + ecr(-D) + '. Rebecca en paie les ' + frac(a, b) + '. ' +
              'Écris sa part de la dette comme un nombre relatif.',
            reponse: { type: 'nombre', valeur: -D * a / b },
            aide: 'Calcule ' + frac(a, b) + ' × (' + ecr(-D) + ') : d’abord ' + D + ' ÷ ' + b + ', puis fois ' + a + ', puis le signe.',
            aideParlee: 'Prends la fraction de la dette sans le signe, puis remets le signe moins : une part de dette reste une dette.',
            correction: [D + ' ÷ ' + b + ' × ' + a + ' = ' + D * a / b + '.', 'Une part de dette est négative : ' + frac(a, b) + ' × (' + ecr(-D) + ') = ' + ecr(-D * a / b) + '.'],
          };
        },
      },
      {
        id: 'inverse-negatif',
        univers: 'commerce',
        versions: [[-3, 4], [-2, 5], [-7, 3], [-1, 6], [-9, 4], [-5, 8]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel est l’inverse de ' + frac(a, b) + ' ?',
            reponse: { type: 'fraction', valeur: [-b, -a] },
            aide: 'Retourne la fraction et garde le signe moins.',
            correction: ['On retourne la fraction et on garde le signe : ' + frac(-b, -a) + '.', fp(a, b) + ' × ' + fp(-b, -a) + ' = 1.'],
          };
        },
      },
      {
        id: 'signe',
        univers: 'famille',
        versions: [[[-1, 2], [3, 4], [-2, 5]], [[-1, 3], [-1, 2], [-3, 4]], [[2, 3], [-5, 6], [1, 2]], [[-4, 5], [-2, 3], [-1, 6]], [[3, 7], [2, 5], [-1, 4]], [[-5, 9], [-3, 2], [2, 7]]],
        genere(c) {
          const fr = c.alea.choisir(this.versions);
          const negatifs = fr.filter(([a]) => a < 0).length;
          const bonne = negatifs % 2 ? 'Négatif' : 'Positif';
          return {
            enonce: 'Sans calculer, ce produit est-il positif ou négatif ? ' + fr.map(([a, b]) => fp(a, b)).join(' × '),
            reponse: O.choix(c.alea, bonne, ['Positif', 'Négatif']),
            aide: 'Compte les fractions négatives.',
            aideParlee: 'Compte les signes moins. Un nombre pair de signes moins donne un résultat positif.',
            correction: ['Il y a ' + negatifs + ' fraction' + (negatifs > 1 ? 's' : '') + ' négative' + (negatifs > 1 ? 's' : '') + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // Programme : multiplier par a/b (négatif), puis par c/d. [a, b, c, d, nombre choisi]
      versions: [[-2, 3, 3, 4, 8], [-3, 5, 5, 6, 12], [-1, 2, -4, 3, 9], [-3, 4, 2, 3, 16], [-5, 6, -3, 5, 4], [-2, 7, 7, 4, 6]],
      genere(c) {
        const [a, b, cc, d, x] = c.alea.choisir(this.versions);
        const k = produit(a, b, cc, d);
        const res = simplifier(x * k.r[0], k.r[1]);
        const positif = k.r[0] > 0;
        return {
          enonce: 'Programme de calcul de Rachel : choisir un nombre, le multiplier par ' + fp(a, b) + ', puis multiplier le résultat par ' + fp(cc, d) + '.',
          questions: [
            {
              texte: 'Question 1. Calcule ' + fp(a, b) + ' × ' + fp(cc, d) + '.',
              reponse: { type: 'fraction', valeur: k.r },
              aide: 'Multiplie sans les signes, puis applique la règle des signes.',
              correction: k.lignes,
            },
            {
              texte: 'Question 2. Quel résultat obtient-on en choisissant ' + x + ' ?',
              reponse: res[1] === 1 ? { type: 'nombre', valeur: res[0] } : { type: 'fraction', valeur: res },
              aide: 'Multiplier par les deux fractions, c’est multiplier par le résultat de la question 1.',
              correction: [x + ' × ' + frac(k.r[0], k.r[1]) + ' = ' + frac(x * k.r[0], k.r[1]) + (res[1] === 1 ? ' = ' + res[0] : res[1] !== k.r[1] ? ' = ' + frac(res[0], res[1]) : '') + '.'],
            },
            {
              texte: 'Question 3. Rebecca affirme : « Avec un nombre positif au départ, ce programme donne toujours un résultat négatif. » A-t-elle raison ? Justifie.',
              correction: ['Le programme revient à multiplier par ' + frac(k.r[0], k.r[1]) + ', qui est ' + (positif ? 'positif' : 'négatif') + '.',
                positif ? 'Un nombre positif fois un nombre positif est positif : Rebecca a tort.' : 'Un nombre positif fois un nombre négatif est négatif : Rebecca a raison.'],
              grille: ['As-tu dit que le programme revient à multiplier par une seule fraction ?', 'As-tu utilisé la règle des signes ?', 'As-tu conclu par une phrase : « Rebecca a raison » ou « Rebecca a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu multiplies les fractions même avec des signes moins : les hauts, les bas, puis la règle des signes.',
    carte: ['un-negatif', 'part-de-dette', 'signe'],
    papierDuSoir: { exercices: ['un-negatif', 'part-de-dette'], defi: true },
    automatismes: [
      {
        id: 'produit-signe',
        versions: [[-1, 2, 1, 3], [-2, 3, -1, 5], [1, 4, -3, 5], [-3, 4, -1, 2]],
        genere(c) { const [a, b, d, e] = c.alea.choisir(this.versions); return { enonce: fp(a, b) + ' × ' + fp(d, e) + ' = ?', reponse: { type: 'fraction', valeur: [a * d, b * e] } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le mot « zéro » vient de l’arabe « sifr », qui a donné aussi le mot « chiffre ».',
    prenoms: ['Ibrahim', 'Moussa', 'Rebecca', 'Rachel'],
  };
});
