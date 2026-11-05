const nbFractions = (typeof require === 'function' ? require('../js/outils-contenu.js') : window.OutilsContenu).nb;
/* Notion 8 du bloc « Les nombres » : fractions, sens et égalité. Mission de démonstration (la pizza).
   Format : contenu/FORMAT.md. */
(function (racine, notion) {
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.notions[notion.id] = notion;
  }
})(this, {
  id: 'fractions-sens-egalite',
  matiere: 'maths',
  bloc: 'nombres',
  titre: 'Fractions : sens et égalité',
  classe: '4e',
  univers: ['maison-courses', 'cuisine-restaurant', 'coiffure', 'dehors', 'commerce'],

  accroche: {
    texte: 'Ce soir, quatre amis partagent une grande pizza : Moussa, Fatou, Ibrahim et Aminata. ' +
      'Chacun doit avoir autant que les autres, sinon ça va râler ! Comment couper ? ' +
      'Mais Aminata n’a plus très faim : elle donnera une de ses parts à Moussa. ' +
      'Comment dire alors combien Moussa en a mangé ?',
    image: { dessin: 'pizza', parts: 1, mangees: 0, description: 'Une grande pizza ronde et entière, posée au milieu de la table des quatre amis.' },
  },

  manipulation: {
    type: 'pizza',
    parts: 8,
    mangees: 3,
    mangeur: 'Moussa',
    // Chaque ami a deux parts : la troisième part de Moussa vient d'Aminata.
    histoire: 'Aminata n’a plus faim : elle donne une de ses parts à Moussa. Moussa aura donc ses 2 parts et celle d’Aminata.',
    consigne: 'Coupe la pizza en 8 parts égales : deux parts pour chacun des quatre amis. ' +
      'Touche le bord de la pizza là où tu veux couper. Tu peux aussi utiliser les boutons sous la pizza.',
  },

  decouverte: {
    texte: (c) => 'Moussa a mangé ses 2 parts et celle d’Aminata : 3 parts sur 8. On l’écrit 3/8. ' +
      'En haut, ' + c.mot('numerateur') + ' : 3. En bas, ' + c.mot('denominateur') + ' : 8. ' +
      'Et voici l’astuce : coupe chaque part en deux. La pizza a maintenant 16 parts, et Moussa en a mangé 6. ' +
      'Il n’a pas mangé plus de pizza pour autant ! Donc 3/8 = 6/16 : ' +
      'on peut multiplier le haut et le bas par le même nombre, la fraction ne change pas.',
    image: { dessin: 'pizza', parts: 8, mangees: 3, description: 'La pizza coupée en 8 parts égales. 3 parts ont été mangées par Moussa, 5 restent.' },
  },

  vocabulaire: {
    termes: {
      numerateur: { sesMots: 'le nombre de parts de pizza prises', officiel: 'le numérateur' },
      denominateur: { sesMots: 'le nombre de parts en tout', officiel: 'le dénominateur' },
    },
    textes: [
      'Pour l’instant, garde tes mots : 3/8 se lit « 3 parts sur 8 ». En haut, le nombre de parts de pizza prises ; ' +
        'en bas, le nombre de parts en tout. Les matheux ont des mots à eux pour ça : je te les dirai la prochaine fois.',
      'Les matheux ont deux mots pour ça. Le nombre de parts de pizza prises, en haut, ils l’appellent le numérateur. ' +
        'Le nombre de parts en tout, en bas, ils l’appellent le dénominateur. Petit truc : dénominateur et dessous commencent tous les deux par un d. ' +
        'Et 3/8 se lit « trois huitièmes ».',
      'Tu connais les mots officiels : dans la fraction 3/8, 3 est le numérateur et 8 est le dénominateur. ' +
        'On lit « trois huitièmes ».',
    ],
  },

  // Chaque exercice tire ses valeurs dans une liste finie de versions. Une aide qui contient un nombre variable
  // a une version parlée sans nombre (aideParlee) : Djéli Awa la dit, l'écran montre l'aide avec les nombres (SPEC.md, section 10).
  exercices: [
    {
      id: 'chocolat',
      univers: 'maison-courses',
      // [rangées, carrés par rangée, carrés mangés]
      versions: [[2, 3, 1], [2, 3, 5], [2, 5, 3], [2, 5, 7], [3, 4, 5], [3, 4, 7], [3, 6, 5], [3, 6, 11], [4, 5, 9], [4, 5, 13]],
      genere(c) {
        const [r, col, k] = c.alea.choisir(this.versions);
        const total = r * col;
        const g = c.pgcd(k, total);
        const correction = [
          'La tablette a ' + nbFractions(r, 'rangée') + ' de ' + nbFractions(col, 'carré') + ' : ' + r + ' × ' + col + ' = ' + total + ' carrés en tout.',
          'Tu en as mangé ' + k + '. Tu as donc mangé ' + k + '/' + total + ' de la tablette.',
        ];
        if (g > 1) correction.push('C’est aussi égal à ' + (k / g) + '/' + (total / g) + ' : ces deux réponses sont justes.');
        return {
          enonce: 'Ta tablette de chocolat a ' + nbFractions(r, 'rangée') + ' de ' + nbFractions(col, 'carré') + '. Tu en manges ' + nbFractions(k, 'carré') + '. ' +
            'Quelle fraction de la tablette as-tu mangée ? Écris-la avec une barre, par exemple 2/5.',
          reponse: { type: 'fraction', valeur: [k, total] },
          aide: 'Compte d’abord tous les carrés : ' + nbFractions(r, 'rangée') + ' de ' + col + '. En bas, ' + c.mot('denominateur') + '.',
          aideParlee: 'Compte d’abord tous les carrés de la tablette. En bas, ' + c.mot('denominateur') + '.',
          correction,
        };
      },
    },
    {
      id: 'facture',
      univers: 'cuisine-restaurant',
      // [nombre de convives, euros par personne]
      versions: [[3, 8], [3, 10], [3, 12], [4, 7], [4, 9], [4, 15], [5, 6], [5, 8], [5, 12], [6, 6], [6, 10], [6, 14]],
      genere(c) {
        const [n, p] = c.alea.choisir(this.versions);
        return {
          enonce: 'Au restaurant, vous êtes ' + n + ' à partager l’addition de ' + (n * p) + ' euros en parts égales. ' +
            'Quelle fraction de l’addition paie chacun ?',
          reponse: { type: 'fraction', valeur: [1, n] },
          aide: 'L’addition est coupée en ' + n + ' parts égales, et chacun en paie une.',
          aideParlee: 'L’addition est coupée en parts égales, et chacun en paie une.',
          correction: [
            'L’addition est partagée en ' + n + ' parts égales : ' + c.mot('denominateur') + ', c’est ' + n + '.',
            'Chacun paie 1 part. Chacun paie donc 1/' + n + ' de l’addition, soit ' + p + ' euros.',
          ],
        };
      },
    },
    {
      id: 'reservoir',
      univers: 'dehors',
      // [litres du plein, haut, bas, jauge] : les 4 réservoirs avec les 3 jauges
      versions: [40, 48, 60, 72].flatMap((l) => [[l, 1, 2, 'à moitié plein'], [l, 1, 4, 'plein au quart'], [l, 3, 4, 'plein aux trois quarts']]),
      genere(c) {
        const [capacite, a, b, mots] = c.alea.choisir(this.versions);
        const litres = (capacite / b) * a;
        return {
          enonce: 'Le réservoir de la voiture contient ' + capacite + ' litres quand il est plein. ' +
            'La jauge montre qu’il est ' + mots + ', c’est-à-dire rempli aux ' + a + '/' + b + '. Combien de litres d’essence y a-t-il ?',
          reponse: { type: 'nombre', valeur: litres },
          aide: 'Coupe les ' + capacite + ' litres en ' + b + ' parts égales, puis prends-en ' + a + '.',
          aideParlee: 'Coupe les litres du plein en parts égales, comme le dit le bas de la fraction, puis prends-en autant que le haut.',
          correction: [
            'Une part : ' + capacite + ' ÷ ' + b + ' = ' + (capacite / b) + ' litres.',
            a === 1 ? 'On en prend 1 : il y a ' + litres + ' litres.' : 'On en prend ' + a + ' : ' + a + ' × ' + (capacite / b) + ' = ' + litres + ' litres.',
          ],
        };
      },
    },
    {
      id: 'tresses',
      univers: 'coiffure',
      // [tresses de Fatou, tresses rouges, multiplicateur]
      versions: [[3, 1, 2], [3, 2, 2], [4, 1, 3], [4, 3, 3], [5, 2, 2], [5, 3, 2], [5, 1, 4], [5, 4, 4], [6, 1, 3], [6, 5, 3], [6, 1, 2], [6, 5, 2]],
      genere(c) {
        const [d, n, k] = c.alea.choisir(this.versions);
        return {
          enonce: 'Fatou se fait ' + d + ' tresses, dont ' + n + (n > 1 ? ' colorées' : ' colorée') + ' en rouge : ' + n + '/' + d + ' de ses tresses sont rouges. ' +
            'Sa cousine se fait ' + (d * k) + ' tresses et veut la même fraction de tresses rouges. Combien de tresses rouges lui faut-il ?',
          reponse: { type: 'nombre', valeur: n * k },
          aide: 'Pour passer de ' + d + ' à ' + (d * k) + ' tresses, on multiplie par ' + k + '. Fais pareil en haut.',
          aideParlee: 'Regarde par combien on multiplie le nombre de tresses, en bas. Fais pareil en haut.',
          correction: [
            d + ' × ' + k + ' = ' + (d * k) + ' : on a multiplié le bas par ' + k + '.',
            'On multiplie le haut aussi : ' + n + ' × ' + k + ' = ' + (n * k) + '.',
            n + '/' + d + ' = ' + (n * k) + '/' + (d * k) + ' : il lui faut ' + (n * k) + ' tresses rouges.',
          ],
        };
      },
    },
    {
      id: 'mangues',
      univers: 'commerce',
      // [mangues mûres, mangues en tout, question sur le haut]
      versions: [[3, 8, true], [5, 8, false], [2, 5, true], [4, 7, false], [5, 9, true], [7, 10, false],
        [3, 11, true], [7, 12, false], [2, 9, false], [6, 11, true], [4, 5, true], [5, 6, false]],
      genere(c) {
        const [a, b, surLeHaut] = c.alea.choisir(this.versions);
        const options = c.alea.melanger([c.mot('numerateur'), c.mot('denominateur'), 'le prix des mangues']);
        const bon = c.mot(surLeHaut ? 'numerateur' : 'denominateur');
        return {
          enonce: 'Au marché, ' + a + ' mangues sur ' + b + ' sont mûres : on écrit ' + a + '/' + b + '. ' +
            'Dans ' + a + '/' + b + ', que représente le nombre ' + (surLeHaut ? a : b) + ' ?',
          reponse: { type: 'choix', options, valeur: options.indexOf(bon) },
          aide: 'En haut, ce que l’on prend ; en bas, combien il y en a en tout.',
          correction: [
            'Il y a ' + b + ' mangues en tout, et on parle des ' + a + ' mangues mûres.',
            surLeHaut ? a + ' est en haut : c’est ' + bon + '.' : b + ' est en bas : c’est ' + bon + '.',
          ],
        };
      },
    },
  ],

  defi: {
    // [parts de la pizza, parts de Fatou, parts de Moussa] : Moussa a raison dans la moitié des versions
    versions: [[8, 2, 3], [8, 3, 1], [8, 1, 4], [8, 2, 1], [12, 4, 5], [12, 3, 2], [12, 5, 4], [12, 2, 6],
      [16, 5, 6], [16, 3, 2], [16, 4, 7], [16, 6, 3]],
    genere(c) {
      const [P, f, m] = c.alea.choisir(this.versions);
      const q = P / 4;
      const reste = P - m - f;
      const raison = m > q;
      return {
        enonce: 'Le restaurant de la place coupe ses pizzas en ' + P + ' parts égales. Pour le dîner, Fatou et Moussa ' +
          'partagent une pizza : Fatou mange ' + nbFractions(f, 'part') + ' et Moussa mange ' + nbFractions(m, 'part') + '.',
        image: { dessin: 'pizza', parts: P, mangees: f + m, description: 'Une pizza coupée en ' + P + ' parts égales ; ' + (f + m) + ' parts ont été mangées.' },
        questions: [
          {
            texte: 'Question 1. Quelle fraction de la pizza Fatou a-t-elle mangée ?',
            reponse: { type: 'fraction', valeur: [f, P] },
            aide: 'Combien de parts en tout ? Combien pour Fatou ?',
            correction: ['La pizza a ' + P + ' parts, Fatou en mange ' + f + ' : elle a mangé ' + f + '/' + P + ' de la pizza.'],
          },
          {
            texte: 'Question 2. Quelle fraction de la pizza reste-t-il ?',
            reponse: { type: 'fraction', valeur: [reste, P] },
            aide: 'Compte les parts mangées par les deux, puis celles qui restent.',
            correction: [
              'Parts mangées : ' + f + ' + ' + m + ' = ' + (f + m) + '. Parts restantes : ' + P + ' − ' + (f + m) + ' = ' + reste + '.',
              'Il reste ' + reste + '/' + P + ' de la pizza.',
            ],
          },
          {
            texte: 'Question 3. Moussa affirme : « J’ai mangé plus du quart de la pizza. » A-t-il raison ? Justifie ta réponse.',
            correction: [
              'Moussa a mangé ' + m + '/' + P + ' de la pizza.',
              'Un quart de la pizza : 1/4 = ' + q + '/' + P + ' (on multiplie le haut et le bas par ' + q + ').',
              'On compare ' + nbFractions(m, 'part') + ' et ' + nbFractions(q, 'part') + ' : ' + m + (raison ? ' > ' : ' < ') + q + '.',
              raison ? 'Moussa a raison : il a mangé plus du quart de la pizza.' : 'Moussa a tort : il a mangé moins du quart de la pizza.',
            ],
            grille: [
              'As-tu écrit la fraction mangée par Moussa, ' + m + '/' + P + ' ?',
              'As-tu écrit le quart avec ' + P + ' en bas : 1/4 = ' + q + '/' + P + ' ?',
              'As-tu comparé ' + m + ' et ' + q + ' ?',
              'As-tu conclu par une phrase : « Moussa a raison » ou « Moussa a tort » ?',
            ],
          },
        ],
      };
    },
  },

  recompense: 'Bravo ! Tu sais dire et écrire une part de pizza, et tu sais que 3/8 et 6/16, c’est pareil.',

  // Générateurs repris pour les cartes de révision.
  carte: ['chocolat', 'reservoir', 'tresses'],

  // Papier du soir : exercices rédigés sur le cahier (contenu/GABARIT-NOTION.md).
  papierDuSoir: { exercices: ['facture', 'reservoir'], defi: true },

  // Automatismes du matin : petits calculs de tête, sans calculatrice.
  automatismes: [
    {
      id: 'fraction-d-un-nombre',
      // [haut, bas, nombre]
      versions: [[1, 2, 8], [1, 2, 14], [1, 4, 12], [1, 4, 20], [3, 4, 8], [3, 4, 16], [1, 3, 9], [2, 3, 12]],
      genere(c) {
        const [a, b, n] = c.alea.choisir(this.versions);
        return { enonce: 'Combien font ' + a + '/' + b + ' de ' + n + ' ?', reponse: { type: 'nombre', valeur: (n / b) * a } };
      },
    },
  ],

  // Fait culturel « Le savais-tu ? » (contenu/sources-culture.md).
  savaisTu: 'Le savais-tu ? Dans l’Égypte ancienne, on écrivait une fraction en plaçant au-dessus du nombre un signe en forme de bouche, qui voulait dire « part ».',

  prenoms: ['Moussa', 'Fatou', 'Ibrahim', 'Aminata'],
});
