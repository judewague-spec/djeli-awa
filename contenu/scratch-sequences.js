/* Notion du bloc « Données, probabilités, programmation » : séquences et événements. Le lutin du marché, en blocs comme Scratch.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const DEPART = 'quand le drapeau vert est cliqué';
  const DRAPEAU = 'quand le drapeau vert est cliqué', ESPACE = 'quand la touche espace est pressée', LUTIN = 'quand ce lutin est cliqué';

  return {
    id: 'scratch-sequences',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Séquences et événements',
    classe: '4e',
    univers: ['appareils', 'commerce'],

    accroche: {
      texte: 'Rachel programme un petit jeu sur son ordinateur. Un lutin, ou sprite, doit rejoindre l’étal de mangues. ' +
        'Rachel lui donne des ordres, un par un, dans l’ordre. Le lutin fait exactement ce qu’elle écrit, ni plus, ni moins.',
      image: { dessin: 'programme', lignes: [DEPART, 'avancer de 10 pas', 'avancer de 10 pas', 'ajouter 10 à y'], description: 'Un programme de quatre blocs, l’un sous l’autre. Un : quand le drapeau vert est cliqué. Deux : avancer de 10 pas. Trois : avancer de 10 pas. Quatre : ajouter 10 à y.' },
    },

    manipulation: {
      type: 'blocs',
      cote: 4,
      cible: [2, 1],
      blocs: ['avancer', 'monter'],
      consigne: 'Conduis le lutin sur la croix. Le bloc « ajouter 1 à x » le fait avancer d’une case. Le bloc « ajouter 1 à y » le fait monter d’une case. Ajoute les blocs dans l’ordre, puis lance le programme.',
    },

    decouverte: {
      texte: (c) => 'Les ordres donnés l’un après l’autre forment ' + c.mot('sequence') + '. Le lutin les lit de haut en bas, un par un. ' +
        'Pour lancer le programme, on place d’abord le bloc « quand le drapeau vert est cliqué ». C’est ' + c.mot('evenement') + '. L’ordre compte souvent.',
    },

    vocabulaire: {
      termes: {
        sequence: { sesMots: 'une suite d’ordres', officiel: 'une séquence', lesDeux: 'une suite d’ordres, que l’on appelle une séquence' },
        evenement: { sesMots: 'le signal de départ', officiel: 'un événement', lesDeux: 'le signal de départ, que l’on appelle un événement' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une suite d’ordres, et le signal de départ. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une séquence, pour une suite d’ordres. Le signal de départ s’appelle un événement.',
        'Tu connais les mots officiels : une séquence, et un événement.',
      ],
    },

    exercices: [
      {
        id: 'valeur-de-x',
        univers: 'appareils',
        // [avancer a, avancer b, monter c]
        versions: [[10, 20, 5], [15, 5, 10], [30, 10, 20], [25, 25, 10], [40, 15, 5], [12, 8, 30]],
        genere(c) {
          const [a, b, m] = c.alea.choisir(this.versions);
          const lignes = [DEPART, 'avancer de ' + a + ' pas', 'avancer de ' + b + ' pas', 'ajouter ' + m + ' à y'];
          return {
            enonce: 'Le lutin part de x = 0 et regarde vers la droite. Le programme est : ' + DEPART + ', puis avancer de ' + a + ' pas, puis avancer de ' + b + ' pas, puis ajouter ' + m + ' à y. Quelle est la valeur de x à la fin ?',
            image: { dessin: 'programme', lignes, description: 'Un programme de quatre blocs. Un : ' + DEPART + '. Deux : avancer de ' + a + ' pas. Trois : avancer de ' + b + ' pas. Quatre : ajouter ' + m + ' à y.' },
            reponse: { type: 'nombre', valeur: a + b },
            aide: 'Seuls les blocs « avancer de … pas » changent x. Additionne-les.',
            aideParlee: 'Seuls les blocs « avancer de … pas » changent x. Additionne-les.',
            correction: ['Les blocs « avancer de … pas » : ' + a + ' et ' + b + '.', a + ' + ' + b + ' = ' + (a + b) + '. Le bloc « ajouter à y » ne change pas x.'],
          };
        },
      },
      {
        id: 'valeur-de-y',
        univers: 'appareils',
        // [monter a, avancer b, monter c]
        versions: [[10, 20, 5], [5, 15, 10], [20, 30, 10], [15, 5, 15], [30, 10, 20], [8, 12, 4]],
        genere(c) {
          const [a, b, m] = c.alea.choisir(this.versions);
          const lignes = [DEPART, 'ajouter ' + a + ' à y', 'avancer de ' + b + ' pas', 'ajouter ' + m + ' à y'];
          return {
            enonce: 'Le lutin part de y = 0. Le programme est : ' + DEPART + ', puis ajouter ' + a + ' à y, puis avancer de ' + b + ' pas, puis ajouter ' + m + ' à y. Quelle est la valeur de y à la fin ?',
            image: { dessin: 'programme', lignes, description: 'Un programme de quatre blocs. Un : ' + DEPART + '. Deux : ajouter ' + a + ' à y. Trois : avancer de ' + b + ' pas. Quatre : ajouter ' + m + ' à y.' },
            reponse: { type: 'nombre', valeur: a + m },
            aide: 'Seuls les blocs « ajouter à y » changent y. Additionne-les.',
            aideParlee: 'Seuls les blocs « ajouter à y » changent y. Additionne-les.',
            correction: ['Les blocs « ajouter à y » : ' + a + ' et ' + m + '.', a + ' + ' + m + ' = ' + (a + m) + '. Le bloc « avancer de … pas » ne change pas y.'],
          };
        },
      },
      {
        id: 'ordre-compte',
        univers: 'commerce',
        // [avancer a, avancer b]
        versions: [[20, 5], [30, 10], [15, 25], [40, 20], [10, 35], [25, 15]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const lignes = [DEPART, 'avancer de ' + a + ' pas', 'mettre x à 0', 'avancer de ' + b + ' pas'];
          return {
            enonce: 'Le lutin part de x = 0. Le programme est : ' + DEPART + ', puis avancer de ' + a + ' pas, puis mettre x à 0, puis avancer de ' + b + ' pas. Quelle est la valeur de x à la fin ?',
            image: { dessin: 'programme', lignes, description: 'Un programme de quatre blocs. Un : ' + DEPART + '. Deux : avancer de ' + a + ' pas. Trois : mettre x à 0. Quatre : avancer de ' + b + ' pas.' },
            reponse: { type: 'nombre', valeur: b },
            aide: 'Lis les blocs dans l’ordre. Que devient x quand le lutin revient à 0 ?',
            aideParlee: 'Lis les blocs dans l’ordre. Que devient x quand le lutin revient à zéro ?',
            correction: ['Après « avancer de ' + a + ' pas », x vaut ' + a + '.', 'Après « mettre x à 0 », x vaut 0.', 'Après « avancer de ' + b + ' pas », x vaut ' + b + '.'],
          };
        },
      },
      O.qcm('quel-signal', 'appareils',
        [['Rachel veut que le programme démarre quand elle clique sur le drapeau vert.', DRAPEAU, 'Le drapeau vert est le signal de départ habituel.'],
          ['Rachel veut que le programme démarre quand elle appuie sur la touche espace.', ESPACE, 'Il faut un signal lié à la touche espace.'],
          ['Rachel veut que le programme démarre quand elle clique sur le lutin.', LUTIN, 'Il faut un signal lié à un clic sur le lutin.'],
          ['Rachel veut lancer le programme avec la touche espace.', ESPACE, 'Il faut un signal lié à la touche espace.'],
          ['Rachel veut lancer le programme avec le drapeau vert.', DRAPEAU, 'Le drapeau vert est le signal de départ habituel.'],
          ['Rachel veut lancer le programme en cliquant sur le lutin avec la souris.', LUTIN, 'Il faut un signal lié à un clic sur le lutin.']],
        (x) => x + ' Quel bloc doit-elle placer en premier ?', [DRAPEAU, ESPACE, LUTIN],
        'Le premier bloc est le signal de départ : il dit à quel moment le programme se lance.'),
      {
        id: 'bloc-manquant',
        univers: 'appareils',
        // [avancer a, valeur de x voulue]
        versions: [[10, 30], [20, 45], [15, 40], [25, 60], [5, 50], [30, 75]],
        genere(c) {
          const [a, T] = c.alea.choisir(this.versions);
          const lignes = [DEPART, 'avancer de ' + a + ' pas', 'avancer de ?'];
          return {
            enonce: 'Le lutin part de x = 0. Le programme est : ' + DEPART + ', puis avancer de ' + a + ' pas, puis avancer d’un nombre inconnu. Le lutin doit finir à x = ' + T + '. De combien doit-il avancer dans le dernier bloc ?',
            image: { dessin: 'programme', lignes, description: 'Un programme de trois blocs. Un : ' + DEPART + '. Deux : avancer de ' + a + ' pas. Trois : avancer d’un nombre inconnu, pour finir à x égale ' + T + '.' },
            reponse: { type: 'nombre', valeur: T - a },
            aide: 'Il reste à parcourir la distance voulue moins celle déjà faite.',
            aideParlee: 'Il reste à parcourir la distance voulue moins celle déjà faite.',
            correction: ['Après le premier bloc, x vaut ' + a + '. Il faut arriver à ' + T + '.', T + ' − ' + a + ' = ' + (T - a) + '.'],
          };
        },
      },
    ],

    defi: {
      // [avancer a, monter b, avancer c, étal en x, étal en y]
      versions: [[10, 20, 30, 40, 20], [20, 10, 10, 40, 10], [15, 5, 25, 40, 5], [30, 10, 10, 50, 10]],
      genere(c) {
        const [a, b, d, X, Y] = c.alea.choisir(this.versions);
        const x = a + d, ok = x === X && b === Y;
        const lignes = [DEPART, 'avancer de ' + a + ' pas', 'ajouter ' + b + ' à y', 'avancer de ' + d + ' pas'];
        return {
          enonce: 'Rachel a écrit un programme pour conduire le lutin à l’étal de mangues. Le lutin part de x = 0 et y = 0, et regarde vers la droite. Le programme est : ' + DEPART + ', puis avancer de ' + a + ' pas, puis ajouter ' + b + ' à y, puis avancer de ' + d + ' pas. L’étal est en x = ' + X + ' et y = ' + Y + '.',
          image: { dessin: 'programme', lignes, description: 'Un programme de quatre blocs. Un : ' + DEPART + '. Deux : avancer de ' + a + ' pas. Trois : ajouter ' + b + ' à y. Quatre : avancer de ' + d + ' pas. L’étal est en x égale ' + X + ' et y égale ' + Y + '.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la valeur de x à la fin du programme ?',
              reponse: { type: 'nombre', valeur: x },
              aide: 'Additionne les blocs « avancer de … pas ».',
              correction: [a + ' + ' + d + ' = ' + x + '.'],
            },
            {
              texte: 'Question 2. Quelle est la valeur de y à la fin du programme ?',
              reponse: { type: 'nombre', valeur: b },
              aide: 'Regarde les blocs « ajouter à y ».',
              correction: ['Un seul bloc « ajouter à y » : y vaut ' + b + '.'],
            },
            {
              texte: 'Question 3. Le lutin arrive-t-il exactement à l’étal ?',
              reponse: O.choix(c.alea, ok ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare x et y à la fin avec la place de l’étal.',
              aideParlee: 'Compare la place d’arrivée du lutin avec la place de l’étal.',
              correction: ['Le lutin finit en x = ' + x + ' et y = ' + b + '. L’étal est en x = ' + X + ' et y = ' + Y + '.', 'Réponse : ' + (ok ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Écris un programme de blocs qui conduit le lutin de x = 0 et y = 0 jusqu’à l’étal, en x = ' + X + ' et y = ' + Y + '. Écris les blocs dans l’ordre.',
              correction: ['Un exemple : ' + DEPART + ', puis avancer de ' + X + ' pas, puis ajouter ' + Y + ' à y.', 'Plusieurs programmes sont justes, si les blocs « avancer de … pas » font ' + X + ' en tout et les blocs « ajouter à y » ' + Y + ' en tout.'],
              grille: ['As-tu commencé par le bloc « quand le drapeau vert est cliqué » ?', 'Les blocs « avancer de … pas » font-ils ' + X + ' en tout ?', 'Les blocs « ajouter à y » font-ils ' + Y + ' en tout ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais lire un programme dans l’ordre, et choisir le signal de départ. Le lutin de Rachel arrive à l’étal !',
    carte: ['valeur-de-x', 'ordre-compte', 'quel-signal'],
    papierDuSoir: { exercices: ['valeur-de-y', 'bloc-manquant'], defi: true },
    automatismes: [
      {
        id: 'avancer-vite',
        versions: [[10, 20], [15, 25], [30, 5], [40, 10]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'x = 0. Avancer de ' + a + ', puis avancer de ' + b + ' pas. x = ?', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Royaume-Uni, Ada Lovelace a décrit comment programmer la machine de Babbage.',
    prenoms: ['Rachel'],
  };
});
