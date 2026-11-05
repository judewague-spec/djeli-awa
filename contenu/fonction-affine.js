/* Notion 14 du bloc « Proportionnalité, pourcentages et fonctions » : la fonction affine. L'abonnement de danse de Rebecca.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const r2 = (x) => Math.round(x * 100) / 100;
  const LIN = 'Linéaire', AFF = 'Affine, sans être linéaire', AUTRE = 'Ni l’une, ni l’autre';

  return {
    id: 'fonction-affine',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'La fonction affine',
    classe: '3e',
    univers: ['danses', 'appareils'],

    accroche: {
      texte: 'Rebecca s’inscrit à un cours de danse. Il y a 10 euros d’inscription, à payer une seule fois, puis 2 euros par séance. Pour 0 séance, elle a déjà payé 10 euros. Pour 5 séances, 20 euros. ' +
        'Ici, la machine multiplie, puis elle ajoute. Pas de proportionnalité, et pourtant, c’est très régulier.',
      image: { dessin: 'point-graphique', a: 2, b: 10, xMax: 5, yMax: 20, description: 'Une droite qui part de 10 sur l’axe debout. Pour 0 séance, 10 euros. Pour 1, 12. Pour 2, 14. Pour 3, 16. Pour 4, 18. Pour 5, 20.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Séances x', '0', '1', '2', '5'], lignes: [['Prix (€)', 10, 12, 14, 20]], description: 'Un tableau. 0 séance, 10 euros. 1 séance, 12 euros. 2 séances, 14 euros. 5 séances, 20 euros.' },
      etapes: [
        'La règle est f de x égale 2 fois x, plus 10.',
        'Chaque séance de plus ajoute toujours 2 euros : les points sont alignés.',
        'Mais la droite ne passe pas par l’origine : elle part de 10, le prix de l’inscription.',
        'Le nombre devant x dit de combien cela monte, ou descend s’il est négatif. Le nombre ajouté dit d’où l’on part.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une machine qui multiplie, puis ajoute, c’est ' + c.mot('affine') + '. On écrit f de x égale a x plus b. Ce b, c’est ' + c.mot('ordonnee') + '. ' +
        'L’astuce : le prix par séance, c’est a. L’inscription, payée une seule fois, c’est b.',
    },

    vocabulaire: {
      termes: {
        affine: { sesMots: 'la machine à deux temps', officiel: 'une fonction affine', lesDeux: 'la machine à deux temps, que l’on appelle une fonction affine' },
        ordonnee: { sesMots: 'le prix de départ', officiel: 'l’ordonnée à l’origine', lesDeux: 'le prix de départ, que l’on appelle l’ordonnée à l’origine' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la machine à deux temps, et le prix de départ. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une fonction affine, pour la machine à deux temps. Le prix de départ s’appelle l’ordonnée à l’origine.',
        'Tu connais les mots officiels : la fonction affine et l’ordonnée à l’origine.',
      ],
    },

    exercices: [
      {
        id: 'prix-abonnement',
        univers: 'danses',
        // [a, b, x]
        versions: [[2, 10, 5], [3, 12, 4], [5, 20, 6], [4, 15, 8], [2.5, 10, 4], [1.5, 6, 10]],
        genere(c) {
          const [a, b, x] = c.alea.choisir(this.versions);
          const y = r2(a * x + b);
          return {
            enonce: 'Un cours de danse coûte ' + b + ' € d’inscription, puis ' + ecr(a) + ' € par séance. Le prix est f(x) = ' + ecr(a) + 'x + ' + b + '. Combien coûtent ' + x + ' séances, en euros ?',
            reponse: { type: 'nombre', valeur: y },
            aide: 'Calcule ' + ecr(a) + ' × ' + x + ', puis ajoute ' + b + '.',
            aideParlee: 'Remplace x par le nombre de séances. Multiplie, puis ajoute.',
            correction: [ecr(a) + ' × ' + x + ' = ' + ecr(r2(a * x)) + '.', ecr(r2(a * x)) + ' + ' + b + ' = ' + ecr(y) + ' €.'],
          };
        },
      },
      {
        id: 'combien-de-seances',
        univers: 'danses',
        // [a, b, prix]
        versions: [[2, 10, 26], [3, 12, 30], [5, 20, 45], [4, 15, 31], [2, 8, 20], [3, 6, 21]],
        genere(c) {
          const [a, b, y] = c.alea.choisir(this.versions);
          const x = (y - b) / a;
          return {
            enonce: 'Le prix est donné par f(x) = ' + a + 'x + ' + b + '. Combien de séances peut-on suivre pour ' + y + ' € ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'Enlève ' + b + ' à ' + y + ', puis divise par ' + a + '.',
            aideParlee: 'Enlève le prix de départ, puis divise par le prix d’une séance.',
            correction: [y + ' − ' + b + ' = ' + (y - b) + '.', (y - b) + ' ÷ ' + a + ' = ' + x + ' séances.'],
          };
        },
      },
      {
        id: 'lire-a-et-b',
        univers: 'appareils',
        // [a, b, on demande : 'a' ou 'b']
        versions: [[2, 10, 'a'], [3, 5, 'b'], [4, 1, 'a'], [6, 7, 'b'], [-3, 12, 'a'], [-2, 9, 'b']],
        genere(c) {
          const [a, b, q] = c.alea.choisir(this.versions);
          const r = q === 'a' ? a : b;
          return {
            enonce: 'Dans l’écriture f(x) = ' + String(a).replace('-', '−') + 'x + ' + b + ', quelle est la valeur de ' + q + ' ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'a est le nombre devant x, avec son signe. b est le nombre ajouté.',
            correction: ['f(x) = ax + b. Ici, ' + q + ' = ' + String(r).replace('-', '−') + '.'],
          };
        },
      },
      Q('quel-genre', 'danses',
        [['f(x) = 5x', LIN], ['f(x) = 2x + 3', AFF], ['f(x) = 4x', LIN], ['f(x) = 7x + 1', AFF], ['f(x) = x × x', AUTRE]],
        (x) => 'De quel genre est la fonction ' + x + ' ?', [LIN, AFF, AUTRE],
        'Elle multiplie seulement, elle multiplie et ajoute, ou elle fait autre chose ?',
        'f(x) = ax est linéaire. f(x) = ax + b, avec b différent de zéro, est affine. x × x n’est ni l’une, ni l’autre.'),
      {
        id: 'quel-tarif',
        univers: 'appareils',
        // [abonnement A par mois + prix par heure, B sans abonnement, heures] : qui est le moins cher
        versions: [[10, 1, 3, 3], [10, 1, 3, 8], [20, 2, 4, 5], [20, 2, 4, 15], [15, 1, 4, 3], [15, 1, 4, 10]],
        genere(c) {
          const [f, a, b, h] = c.alea.choisir(this.versions);
          const pa = f + a * h, pb = b * h;
          const juste = pa < pb ? 'Le tarif A' : pb < pa ? 'Le tarif B' : 'Les deux coûtent pareil';
          return {
            enonce: 'Tarif A : ' + f + ' € d’abonnement, plus ' + a + ' € par heure. Tarif B : ' + b + ' € par heure, sans abonnement. Pour ' + h + ' heures, quel tarif coûte le moins cher ?',
            reponse: O.choix(c.alea, juste, ['Le tarif A', 'Le tarif B', 'Les deux coûtent pareil']),
            aide: 'Calcule le prix avec chaque tarif, puis compare.',
            correction: ['Tarif A : ' + f + ' + ' + a + ' × ' + h + ' = ' + pa + ' €.', 'Tarif B : ' + b + ' × ' + h + ' = ' + pb + ' €.', 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [inscription, prix séance formule A, prix séance formule B, séances]
      versions: [[10, 2, 4, 3], [20, 3, 5, 6], [12, 2, 5, 3], [30, 2, 5, 6]],
      genere(c) {
        const [i, a, b, x] = c.alea.choisir(this.versions);
        const pa = i + a * x, pb = b * x;
        const juste = pa < pb ? 'Formule A' : pb < pa ? 'Formule B' : 'Les deux coûtent pareil';
        return {
          enonce: 'Un cours propose deux formules. Formule A : ' + i + ' € d’inscription, puis ' + a + ' € par séance. Formule B : pas d’inscription, ' + b + ' € par séance. On note x le nombre de séances.',
          questions: [
            {
              texte: 'Question 1. Quel est le prix de ' + x + ' séances avec la formule A, en euros ?',
              reponse: { type: 'nombre', valeur: pa },
              aide: 'Multiplie, puis ajoute l’inscription.',
              correction: [a + ' × ' + x + ' + ' + i + ' = ' + pa + ' €.'],
            },
            {
              texte: 'Question 2. Quel est le prix de ' + x + ' séances avec la formule B, en euros ?',
              reponse: { type: 'nombre', valeur: pb },
              aide: 'Multiplie le prix d’une séance par le nombre de séances.',
              correction: [b + ' × ' + x + ' = ' + pb + ' €.'],
            },
            {
              texte: 'Question 3. Pour ' + x + ' séances, quelle formule est la plus avantageuse ?',
              reponse: O.choix(c.alea, juste, ['Formule A', 'Formule B', 'Les deux coûtent pareil']),
              aide: 'Compare les deux prix.',
              correction: ['On compare ' + pa + ' € et ' + pb + ' €.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Écris les deux fonctions. Laquelle est linéaire, laquelle est affine ? Justifie.',
              correction: ['Formule A : f(x) = ' + a + 'x + ' + i + '. Elle multiplie, puis elle ajoute : elle est affine.', 'Formule B : g(x) = ' + b + 'x. Elle ne fait que multiplier : elle est linéaire.'],
              grille: ['As-tu écrit les deux fonctions ?', 'As-tu dit laquelle est affine, et pourquoi ?', 'As-tu dit laquelle est linéaire, et pourquoi ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un prix de départ, un prix par séance : tu sais lire n’importe quel abonnement.',
    carte: ['prix-abonnement', 'lire-a-et-b', 'quel-genre'],
    papierDuSoir: { exercices: ['combien-de-seances', 'quel-tarif'], defi: true },
    automatismes: [
      {
        id: 'affine-rapide',
        versions: [[2, 3, 4], [3, 1, 5], [4, 2, 2], [5, 1, 3]],
        genere(c) { const [a, b, x] = c.alea.choisir(this.versions); return { enonce: 'f(x) = ' + a + 'x + ' + b + '. f(' + x + ') = ?', reponse: { type: 'nombre', valeur: a * x + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Suède, Anders Celsius créa en 1742 une échelle de 100 degrés entre le gel et l’ébullition de l’eau.',
    prenoms: ['Rebecca'],
  };
});
