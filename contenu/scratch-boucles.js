/* Notion du bloc « Données, probabilités, programmation » : les boucles. Les caisses de l'étal, en blocs comme Scratch.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const DEPART = 'quand le drapeau vert est cliqué';
  const rep = (n, a) => 'répéter ' + n + ' fois : avancer de ' + a + ' pas';

  return {
    id: 'scratch-boucles',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Les boucles',
    classe: '4e',
    univers: ['appareils', 'commerce'],

    accroche: {
      texte: 'Rachel range des caisses sur l’étal. Elle en pose une, puis une autre, puis encore une. Toujours le même geste, trois fois. ' +
        'Dans un programme, écrire trois fois le même bloc, c’est long. Il existe un raccourci.',
      image: { dessin: 'programme', lignes: [DEPART, 'répéter 3 fois', '  avancer de 10 pas'], description: 'Un programme de trois blocs. Un : quand le drapeau vert est cliqué. Deux : répéter 3 fois. Trois, rangé à l’intérieur : avancer de 10 pas. Le lutin avance trois fois de 10, donc de 30 en tout.' },
    },

    manipulation: {
      type: 'blocs',
      cote: 5,
      cible: [3, 3],
      blocs: ['avancer', 'monter', 'repeter3 avancer', 'repeter3 monter'],
      maxBlocs: 2,
      consigne: 'Conduis le lutin sur la croix avec deux blocs seulement. Le bloc « ajouter 1 à x » fait avancer d’une case. Le bloc « ajouter 1 à y » fait monter d’une case. Les blocs « répéter 3 fois » vont t’aider.',
    },

    decouverte: {
      texte: (c) => 'Regarde le bloc « répéter 3 fois ». C’est ' + c.mot('boucle') + '. Chaque bloc du programme est ' + c.mot('instruction') + '. ' +
        'Répéter 3 fois « avancer de 10 pas », c’est avancer de 30 pas. Pour trouver où arrive le lutin, multiplie le nombre de répétitions par le déplacement.',
    },

    vocabulaire: {
      termes: {
        boucle: { sesMots: 'le raccourci qui répète', officiel: 'une boucle', lesDeux: 'le raccourci qui répète, que l’on appelle une boucle' },
        instruction: { sesMots: 'un ordre', officiel: 'une instruction', lesDeux: 'un ordre, que l’on appelle une instruction' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le raccourci qui répète, et un ordre. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une boucle, pour le raccourci qui répète. Un ordre s’appelle une instruction.',
        'Tu connais les mots officiels : une boucle, et une instruction.',
      ],
    },

    exercices: [
      {
        id: 'avancer-repete',
        univers: 'appareils',
        // [répétitions, avancer de]
        versions: [[4, 10], [3, 15], [5, 20], [6, 5], [10, 10], [2, 25]],
        genere(c) {
          const [n, a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le lutin part de x = 0 et regarde vers la droite. Le programme est : ' + DEPART + ', puis ' + rep(n, a) + '. Quelle est la valeur de x à la fin ?',
            image: { dessin: 'programme', lignes: [DEPART, 'répéter ' + n + ' fois', '  avancer de ' + a + ' pas'], description: 'Un programme de trois blocs. Un : ' + DEPART + '. Deux : répéter ' + n + ' fois. Trois, rangé à l’intérieur : avancer de ' + a + ' pas.' },
            reponse: { type: 'nombre', valeur: n * a },
            aide: 'Multiplie le nombre de répétitions par le déplacement.',
            aideParlee: 'Multiplie le nombre de répétitions par le déplacement.',
            correction: ['Le lutin avance de ' + a + ', ' + n + ' fois.', n + ' × ' + a + ' = ' + (n * a) + '.'],
          };
        },
      },
      {
        id: 'tracer-forme',
        univers: 'appareils',
        // [forme, répétitions, avancer de, tourner de, question]
        versions: [['un carré', 4, 50, 90, 'longueur'], ['un triangle équilatéral', 3, 30, 120, 'longueur'], ['un hexagone régulier', 6, 20, 60, 'longueur'],
          ['un carré', 4, 25, 90, 'angle'], ['un triangle équilatéral', 3, 40, 120, 'angle'], ['un hexagone régulier', 6, 10, 60, 'angle']],
        genere(c) {
          const [forme, n, a, t, q] = c.alea.choisir(this.versions);
          const tourner = q === 'angle' ? '?' : t;
          return {
            enonce: 'Le lutin a le stylo en position d’écriture : il trace sa route. Il trace ' + forme + ' avec le programme : ' + DEPART + ', puis répéter ' + n + ' fois : avancer de ' + a + ' pas, tourner de ' + tourner + ' degrés. ' +
              (q === 'angle' ? 'De combien de degrés doit-il tourner ?' : 'Quelle est la longueur du tracé total, en pas ?'),
            image: { dessin: 'programme', lignes: [DEPART, 'stylo en position d’écriture', 'répéter ' + n + ' fois', '  avancer de ' + a + ' pas', '  tourner de ' + tourner + ' degrés'], description: 'Un programme de cinq blocs. Un : ' + DEPART + '. Deux : stylo en position d’écriture. Trois : répéter ' + n + ' fois. Quatre, à l’intérieur : avancer de ' + a + ' pas. Cinq, à l’intérieur : tourner ' + (q === 'angle' ? 'd’un nombre inconnu de' : 'de ' + t) + ' degrés.' },
            reponse: { type: 'nombre', valeur: q === 'angle' ? t : n * a },
            aide: q === 'angle' ? 'Pour revenir au départ, le lutin fait un tour complet : 360 degrés. Divise 360 par le nombre de répétitions.' : 'Chaque répétition trace un côté. Multiplie le nombre de côtés par la longueur d’un côté.',
            aideParlee: q === 'angle' ? 'Pour revenir au départ, le lutin fait un tour complet : trois cent soixante degrés. Divise ce nombre par le nombre de répétitions.' : 'Chaque répétition trace un côté. Multiplie le nombre de côtés par la longueur d’un côté.',
            correction: q === 'angle'
              ? ['Un tour complet fait 360 degrés, partagé en ' + n + ' virages.', '360 ÷ ' + n + ' = ' + t + '.', 'Le lutin tourne de ' + t + ' degrés.']
              : ['Il y a ' + n + ' côtés de ' + a + ' pas.', n + ' × ' + a + ' = ' + (n * a) + '.', 'Le tracé total mesure ' + (n * a) + ' pas.'],
          };
        },
      },
      {
        id: 'avant-boucle',
        univers: 'commerce',
        // [avancer de a, répétitions, avancer de b]
        versions: [[10, 3, 5], [20, 4, 10], [5, 6, 5], [15, 2, 20], [30, 5, 2], [8, 3, 6]],
        genere(c) {
          const [a, n, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le lutin part de x = 0. Le programme est : ' + DEPART + ', puis avancer de ' + a + ' pas, puis ' + rep(n, b) + '. Quelle est la valeur de x à la fin ?',
            image: { dessin: 'programme', lignes: [DEPART, 'avancer de ' + a + ' pas', 'répéter ' + n + ' fois', '  avancer de ' + b + ' pas'], description: 'Un programme de quatre blocs. Un : ' + DEPART + '. Deux : avancer de ' + a + ' pas. Trois : répéter ' + n + ' fois. Quatre, à l’intérieur : avancer de ' + b + ' pas.' },
            reponse: { type: 'nombre', valeur: a + n * b },
            aide: 'Calcule d’abord ce que fait le raccourci qui répète, puis ajoute le bloc écrit avant.',
            aideParlee: 'Calcule d’abord ce que fait le raccourci qui répète, puis ajoute le bloc écrit avant.',
            correction: ['La boucle : ' + n + ' × ' + b + ' = ' + (n * b) + '.', 'Avec le premier bloc : ' + a + ' + ' + (n * b) + ' = ' + (a + n * b) + '.'],
          };
        },
      },
      {
        id: 'combien-de-fois',
        univers: 'appareils',
        // [avancer de a, x voulu]
        versions: [[10, 50], [5, 30], [20, 100], [15, 45], [25, 75], [8, 40]],
        genere(c) {
          const [a, T] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le lutin part de x = 0. Il doit finir à x = ' + T + ' avec le programme : ' + DEPART + ', puis répéter ? fois : avancer de ' + a + ' pas. Combien de répétitions faut-il ?',
            image: { dessin: 'programme', lignes: [DEPART, 'répéter ? fois', '  avancer de ' + a + ' pas'], description: 'Un programme de trois blocs. Un : ' + DEPART + '. Deux : répéter un nombre inconnu de fois. Trois, à l’intérieur : avancer de ' + a + ' pas. Le lutin doit finir à x égale ' + T + '.' },
            reponse: { type: 'nombre', valeur: T / a },
            aide: 'Combien de fois ' + a + ' tient-il dans ' + T + ' ? Fais une division.',
            aideParlee: 'Combien de fois le déplacement tient-il dans la distance voulue ? Fais une division.',
            correction: [T + ' ÷ ' + a + ' = ' + (T / a) + '.', 'Il faut répéter ' + (T / a) + ' fois.'],
          };
        },
      },
      {
        id: 'quel-programme',
        univers: 'appareils',
        // [x voulu, bon programme, deux programmes qui n'y arrivent pas]
        versions: [
          [60, rep(3, 20), rep(6, 20), rep(3, 60)],
          [40, rep(4, 10), rep(4, 40), rep(10, 10)],
          [100, rep(5, 20), rep(5, 100), rep(20, 20)],
          [30, rep(6, 5), rep(6, 30), rep(5, 5)],
        ],
        genere(c) {
          const [T, juste, p1, p2] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le lutin part de x = 0. Quel programme le fait finir à x = ' + T + ' ?',
            reponse: O.choix(c.alea, juste, [p1, p2]),
            aide: 'Pour chaque choix, multiplie le nombre de répétitions par le déplacement.',
            aideParlee: 'Pour chaque choix, multiplie le nombre de répétitions par le déplacement.',
            correction: ['Avec « ' + juste + ' », le lutin avance de ' + juste.match(/\d+/g).join(' × ') + ' = ' + juste.match(/\d+/g).reduce((x, y) => x * y, 1) + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [répétitions n, avancer de a, monter de b, répétitions m, avancer de d, étal en x]
      versions: [[3, 10, 5, 2, 5, 40], [4, 10, 10, 2, 10, 70], [5, 5, 20, 3, 10, 55], [2, 20, 15, 4, 5, 50]],
      genere(c) {
        const [n, a, b, m, d, X] = c.alea.choisir(this.versions);
        const x = n * a + m * d, ok = x === X;
        return {
          enonce: 'Rachel programme le lutin pour qu’il s’arrête devant l’étal. Le lutin part de x = 0 et y = 0, et regarde vers la droite. Le programme est : ' + DEPART + ', puis ' + rep(n, a) + ', puis ajouter ' + b + ' à y, puis ' + rep(m, d) + '. Seuls les blocs « avancer » sont dans les boucles. L’étal est en x = ' + X + '.',
          image: { dessin: 'programme', lignes: [DEPART, 'répéter ' + n + ' fois', '  avancer de ' + a + ' pas', 'ajouter ' + b + ' à y', 'répéter ' + m + ' fois', '  avancer de ' + d + ' pas'], description: 'Un programme de six blocs. Un : ' + DEPART + '. Deux : répéter ' + n + ' fois. Trois, à l’intérieur : avancer de ' + a + ' pas. Quatre : ajouter ' + b + ' à y. Cinq : répéter ' + m + ' fois. Six, à l’intérieur : avancer de ' + d + ' pas. L’étal est en x égale ' + X + '.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la valeur de x à la fin du programme ?',
              reponse: { type: 'nombre', valeur: x },
              aide: 'Calcule ce que fait chaque raccourci qui répète, puis additionne.',
              correction: ['Première boucle : ' + n + ' × ' + a + ' = ' + (n * a) + '.', 'Deuxième boucle : ' + m + ' × ' + d + ' = ' + (m * d) + '.', (n * a) + ' + ' + (m * d) + ' = ' + x + '.'],
            },
            {
              texte: 'Question 2. Quelle est la valeur de y à la fin du programme ?',
              reponse: { type: 'nombre', valeur: b },
              aide: 'Le bloc « ajouter à y » est seul : il ne se répète pas.',
              correction: ['Le bloc « ajouter ' + b + ' à y » est exécuté une seule fois : y vaut ' + b + '.'],
            },
            {
              texte: 'Question 3. Le lutin s’arrête-t-il exactement devant l’étal, en x = ' + X + ' ?',
              reponse: O.choix(c.alea, ok ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare la valeur de x à la fin avec la place de l’étal.',
              aideParlee: 'Compare la valeur de x à la fin avec la place de l’étal.',
              correction: ['Le lutin finit en x = ' + x + '. L’étal est en x = ' + X + '.', 'Réponse : ' + (ok ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Rachel veut aussi tracer un carré, avec le stylo en position d’écriture : répéter 4 fois : avancer de ' + a + ' pas, tourner de 90 degrés. Quelle est la longueur du tracé total, en pas ?',
              reponse: { type: 'nombre', valeur: 4 * a },
              aide: 'Un carré a quatre côtés. Chaque répétition en trace un.',
              correction: ['Le programme répète 4 fois « avancer de ' + a + ' pas ».', '4 × ' + a + ' = ' + (4 * a) + '.', 'Le tracé total mesure ' + (4 * a) + ' pas.'],
            },
            {
              texte: 'Question 5. Le lutin doit avancer de ' + (n * a) + ' en tout, par pas de ' + a + '. Écris le programme avec une boucle. Explique pourquoi c’est plus court que d’écrire le même bloc plusieurs fois.',
              correction: ['Programme : ' + DEPART + ', puis ' + rep(n, a) + '.', 'Un seul bloc « avancer de ' + a + ' pas » suffit, au lieu de le recopier ' + n + ' fois.'],
              grille: ['As-tu écrit le bloc de départ ?', 'As-tu écrit la boucle avec ' + n + ' répétitions et « avancer de ' + a + ' pas » ?', 'As-tu expliqué qu’on écrit le bloc une seule fois au lieu de le recopier ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais écrire un raccourci qui répète, et calculer où arrive le lutin. Les caisses de Rachel sont rangées !',
    carte: ['avancer-repete', 'avant-boucle', 'combien-de-fois'],
    papierDuSoir: { exercices: ['tracer-forme', 'quel-programme'], defi: true },
    automatismes: [
      {
        id: 'boucle-vite',
        versions: [[3, 10], [4, 5], [5, 20], [2, 15]],
        genere(c) { const [n, a] = c.alea.choisir(this.versions); return { enonce: 'Répéter ' + n + ' fois : avancer de ' + a + ' pas. x = ?', reponse: { type: 'nombre', valeur: n * a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Angola, les conteurs Tchokwé tracent dans le sable une seule ligne continue autour de points, selon des règles précises.',
    prenoms: ['Rachel'],
  };
});
