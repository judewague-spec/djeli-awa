/* Notion 1 du bloc de technologie « Programmer » : les événements. La sonnette de l’atelier du réparateur.
   Les programmes sont écrits en mots (lisibles au lecteur d’écran) et exécutés en code (js/programme-blocs.js).
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const dit = (t) => ({ dire: { t } });
  const image = (prog, intro) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: intro + ' ' + PB.enMots(prog) + '.' });

  // La sonnette : si le bouton vaut 1, elle sonne.
  const SONNETTE = [{ si: { op: '=', g: { entree: 'bouton' }, d: 1 }, alors: [dit('Ding')] }];

  // Programme de la sonnette avec un message avant et après ; k « Ding » quand on appuie.
  const sonnette = (k) => [dit('Bienvenue'), { si: { op: '=', g: { entree: 'bouton' }, d: 1 }, alors: Array.from({ length: k }, () => dit('Ding')) }, dit('Au revoir')];

  // Lampe de l’établi : deux boutons, marche et arrêt.
  const lampe = [
    { eteindre: 'lampe' },
    { si: { op: '=', g: { entree: 'marche' }, d: 1 }, alors: [{ allumer: 'lampe' }] },
    { si: { op: '=', g: { entree: 'arrêt' }, d: 1 }, alors: [{ eteindre: 'lampe' }] },
  ];

  // Distributeur : deux boutons, café et thé, avec leurs prix en euros.
  const distributeur = (a, b) => [
    { mettre: 'total', a: 0 },
    { si: { op: '=', g: { entree: 'café' }, d: 1 }, alors: [{ ajouter: 'total', a }] },
    { si: { op: '=', g: { entree: 'thé' }, d: 1 }, alors: [{ ajouter: 'total', a: b }] },
    { dire: { v: 'total' } },
  ];

  // Compteur d’appuis : une liste de moments, 1 quand on a appuyé, 0 sinon.
  const compteur = (liste) => [
    { mettre: 'sonneries', a: 0 },
    { liste: 'appuis', valeurs: liste },
    { pourChaque: 'e', dans: 'appuis', faire: [{ si: { op: '=', g: { v: 'e' }, d: 1 }, alors: [{ ajouter: 'sonneries', a: 1 }] }] },
    { dire: { v: 'sonneries' } },
  ];

  // Compteur avec un seuil : trop de bruit si les sonneries dépassent le seuil.
  const bruit = (liste, seuil) => compteur(liste).concat([
    { si: { op: '>', g: { v: 'sonneries' }, d: seuil }, alors: [dit('Trop de bruit')], sinon: [dit('Calme')] },
  ]);

  const nb = (liste) => liste.filter((x) => x === 1).length;
  const fois = (n) => n + ' fois';

  return {
    id: 'prog-evenements',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'Les événements',
    classe: 'cycle 4',
    univers: ['appareils', 'maison-courses', 'commerce'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Programmer » : un programme réagit à des événements ; instructions lues dans l’ordre.',

    accroche: {
      texte: 'Rachel appuie sur la sonnette de l’atelier. Ding ! Le réparateur lève la tête. Sans ce geste, rien ne se passe. ' +
        'Un appui sur le bouton, et la sonnerie démarre. Un autre bouton, et c’est la lampe de l’établi qui s’allume.',
      image: image(SONNETTE, 'Le programme de la sonnette, écrit en mots. Le bouton vaut 1 quand Rachel appuie dessus. Le programme : '),
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: SONNETTE,
      entrees: { bouton: 1 },
      choix: { bouton: [0, 1] },
      essais: 2,
      consigne: 'Joue le programme avec le bouton appuyé. Puis mets le bouton à zéro, et rejoue : la ligne de la sonnerie n’est pas jouée.',
    },

    decouverte: {
      texte: (c) => 'Regarde l’appui de Rachel sur le bouton : c’est ' + c.mot('evenement') + '. ' +
        'Dans le programme, chaque ligne est ' + c.mot('instruction') + ' : l’ordinateur les suit dans l’ordre. ' +
        'L’astuce : d’abord, quelque chose arrive ; ensuite, les ordres se suivent.',
    },

    vocabulaire: {
      termes: {
        evenement: { sesMots: 'ce qui arrive et qui lance le programme', officiel: 'un événement', lesDeux: 'ce qui arrive et qui lance le programme, que les informaticiens appellent un événement' },
        instruction: { sesMots: 'un ordre donné à l’ordinateur', officiel: 'une instruction', lesDeux: 'un ordre donné à l’ordinateur, que les informaticiens appellent une instruction' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce qui arrive et lance le programme, et un ordre donné à l’ordinateur. Les informaticiens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les informaticiens disent : un événement, pour ce qui arrive et lance le programme ; une instruction, pour un ordre donné à l’ordinateur.',
        'Tu connais les mots officiels : un événement lance le programme, et chaque instruction est un ordre.',
      ],
    },

    exercices: [
      O.qcm('evenement-ou-instruction', 'appareils',
        [['Rachel appuie sur le bouton de la sonnette.', 'Un événement', 'Un appui arrive, et il lance le programme.'],
          ['Allumer la lampe.', 'Une instruction', 'C’est un ordre donné à l’ordinateur.'],
          ['La porte de l’atelier s’ouvre.', 'Un événement', 'L’ouverture arrive, et elle peut lancer le programme.'],
          ['Dire « Bonjour ».', 'Une instruction', 'C’est un ordre que l’ordinateur exécute.'],
          ['Le minuteur arrive à zéro.', 'Un événement', 'Le minuteur arrive à zéro : cela lance le programme.'],
          ['Éteindre la lampe.', 'Une instruction', 'C’est un ordre donné à l’ordinateur.']],
        (x) => '« ' + x + ' » Est-ce un événement ou une instruction ?', ['Un événement', 'Une instruction'],
        'Lequel lance le programme, et lequel est un ordre à suivre ?'),
      {
        id: 'paroles-sonnette',
        univers: 'appareils',
        // [le bouton vaut, nombre de « Ding » quand on appuie]
        versions: [[1, 2], [0, 3], [1, 3], [0, 2], [1, 1]],
        genere(c) {
          const [b, k] = c.alea.choisir(this.versions);
          const prog = sonnette(k);
          const dits = PB.executer(prog, { bouton: b }).dits.length;
          return {
            enonce: 'Voici le programme de la sonnette, écrit en mots : ' + PB.enMots(prog) + '. Le bouton vaut 1 quand on appuie, 0 sinon. Ce programme se lance quand un client entre. Ici, le bouton vaut ' + b + '. Combien de paroles le programme dit-il en tout ?',
            image: image(prog, 'Le programme de la sonnette. Le bouton vaut ' + b + '. Le programme :'),
            reponse: { type: 'nombre', valeur: dits },
            aide: 'Joue le programme ligne par ligne. Regarde si la condition est vraie.',
            correction: b === 1
              ? ['Le bouton vaut 1 : la condition est vraie, donc « Ding » est dit ' + fois(k) + '.', 'Avec « Bienvenue » et « Au revoir » : ' + dits + ' paroles.']
              : ['Le bouton vaut 0 : la condition est fausse, donc « Ding » n’est pas dit.', 'Il reste « Bienvenue » et « Au revoir » : ' + dits + ' paroles.'],
          };
        },
      },
      {
        id: 'deux-boutons',
        univers: 'maison-courses',
        // [marche, arrêt]
        versions: [[1, 0], [1, 1], [0, 1], [0, 0]],
        genere(c) {
          const [m, a] = c.alea.choisir(this.versions);
          const allumee = Boolean(PB.executer(lampe, { marche: m, arrêt: a }).sorties.lampe);
          const juste = allumee ? 'La lampe est allumée' : 'La lampe est éteinte';
          const etapes = ['Au départ, la lampe est éteinte.',
            m === 1 ? 'Le bouton marche vaut 1 : on allume la lampe.' : 'Le bouton marche vaut 0 : rien ne change.',
            a === 1 ? 'Le bouton arrêt vaut 1 : on éteint la lampe.' : 'Le bouton arrêt vaut 0 : rien ne change.'];
          return {
            enonce: 'Sur l’établi, deux boutons : marche et arrêt. Ils valent 1 quand on appuie, 0 sinon. Voici le programme : ' + PB.enMots(lampe) + '. Ici, marche vaut ' + m + ' et arrêt vaut ' + a + '. Que devient la lampe ?',
            image: image(lampe, 'Le programme de la lampe. Le bouton marche vaut ' + m + ' et le bouton arrêt vaut ' + a + '. Le programme :'),
            reponse: O.choix(c.alea, juste, ['On ne peut pas savoir', allumee ? 'La lampe est éteinte' : 'La lampe est allumée']),
            aide: 'Lis les lignes dans l’ordre : la dernière ligne jouée l’emporte.',
            correction: etapes.concat(['Réponse : ' + juste + '.']),
          };
        },
      },
      {
        id: 'total-distributeur',
        univers: 'commerce',
        // [prix du café, prix du thé, café demandé, thé demandé]
        versions: [[2, 3, 1, 1], [3, 2, 1, 0], [2, 3, 0, 1], [3, 4, 1, 1], [2, 5, 1, 1]],
        genere(c) {
          const [a, b, ca, th] = c.alea.choisir(this.versions);
          const prog = distributeur(a, b);
          const total = PB.executer(prog, { café: ca, thé: th }).vars.total;
          const pas = [ca === 1 ? 'Le café est demandé : on ajoute ' + a + ' euros.' : 'Le café n’est pas demandé : rien n’est ajouté.',
            th === 1 ? 'Le thé est demandé : on ajoute ' + b + ' euros.' : 'Le thé n’est pas demandé : rien n’est ajouté.'];
          return {
            enonce: 'Un distributeur a deux boutons, café et thé, qui valent 1 quand on appuie, 0 sinon. Voici son programme : ' + PB.enMots(prog) + '. Ici, café vaut ' + ca + ' et thé vaut ' + th + '. Combien d’euros le distributeur dit-il ?',
            image: image(prog, 'Le programme du distributeur. Le bouton café vaut ' + ca + ' et le bouton thé vaut ' + th + '. Le programme :'),
            reponse: { type: 'nombre', valeur: total },
            aide: 'Commence avec total à zéro, puis regarde chaque bouton.',
            correction: ['Au départ, total vaut 0.'].concat(pas, ['Le distributeur dit ' + total + ' euros.']),
          };
        },
      },
      {
        id: 'sonneries-comptees',
        univers: 'appareils',
        // liste des moments : 1 = appui, 0 = pas d’appui
        versions: [[1, 0, 1, 1, 0], [0, 0, 1, 0, 1, 0], [1, 1, 1, 0], [0, 1, 0, 0, 0, 1], [1, 1, 0, 1, 1, 1]],
        genere(c) {
          const liste = c.alea.choisir(this.versions);
          const prog = compteur(liste);
          const n = PB.executer(prog).dits[0];
          return {
            enonce: 'La sonnette note chaque moment de la matinée : 1 s’il y a un appui, 0 sinon. Voici son programme : ' + PB.enMots(prog) + '. Que dit-il à la fin ?',
            image: image(prog, 'Le programme qui compte les appuis. La liste des moments vaut ' + liste.join(', ') + '. Le programme :'),
            reponse: { type: 'nombre', valeur: n },
            aide: 'Passe chaque moment de la liste. Ajoute 1 seulement quand il vaut 1.',
            correction: ['La liste a ' + liste.length + ' moments : ' + liste.join(', ') + '.', 'Les appuis valent 1 ; il y en a ' + n + '.', 'Le programme dit ' + n + '.'],
          };
        },
      },
    ],

    defi: {
      // [liste des moments, secondes par sonnerie, seuil de bruit]
      versions: [[[1, 0, 1, 1, 0, 1], 2, 3], [[0, 1, 0, 0, 1], 3, 3], [[1, 1, 0, 1, 1, 1, 0], 2, 4], [[0, 0, 1, 0, 1, 0], 4, 2]],
      genere(c) {
        const [liste, d, seuil] = c.alea.choisir(this.versions);
        const prog = bruit(liste, seuil);
        const res = PB.executer(prog);
        const n = res.vars.sonneries;
        const parole = res.dits[1];
        const autre = parole === 'Calme' ? 'Trop de bruit' : 'Calme';
        return {
          enonce: 'Clarisse règle la sonnette de l’atelier de réparation. Le programme note chaque moment de la matinée dans une liste : 1 s’il y a un appui, 0 sinon. ' +
            'Chaque sonnerie dure ' + d + ' secondes. Voici le programme : ' + PB.enMots(prog) + '.',
          image: image(prog, 'Le programme de Clarisse. La liste des moments vaut ' + liste.join(', ') + ', chaque sonnerie dure ' + d + ' secondes, le nombre de comparaison est ' + seuil + '. Le programme :'),
          questions: [
            {
              texte: 'Question 1. Combien de sonneries le programme compte-t-il ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Compte les moments qui valent 1.',
              correction: ['La liste est ' + liste.join(', ') + '.', 'Il y a ' + n + ' moments qui valent 1 : ' + n + ' sonneries.'],
            },
            {
              texte: 'Question 2. Combien de secondes la sonnette sonne-t-elle en tout ?',
              reponse: { type: 'nombre', valeur: n * d },
              aide: 'Multiplie le nombre de sonneries par la durée d’une sonnerie.',
              correction: [n + ' × ' + d + ' = ' + n * d + ' secondes.'],
            },
            {
              texte: 'Question 3. Qu’est-ce que le programme dit à la fin ?',
              reponse: O.choix(c.alea, 'Il dit « ' + parole + ' »', ['Il dit « ' + autre + ' »', 'Il ne dit rien']),
              aide: 'Compare le nombre de sonneries au nombre du programme.',
              correction: [n + ' sonneries, et le nombre du programme est ' + seuil + ' : ' + (n > seuil ? n + ' est plus grand que ' + seuil + '.' : n + ' n’est pas plus grand que ' + seuil + '.'), 'Réponse : Il dit « ' + parole + ' ».'],
            },
            {
              texte: 'Question 4. Clarisse veut aussi que la sonnette sonne quand la porte s’ouvre. Explique ce qu’il faut ajouter au programme.',
              correction: ['Il faut un deuxième événement : l’ouverture de la porte.', 'Quand il arrive, une instruction fait sonner la sonnette.'],
              grille: ['As-tu parlé d’un deuxième événement, l’ouverture de la porte ?', 'As-tu dit que cet événement lance une instruction qui fait sonner ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais ce qui lance un programme, et tu lis ses ordres un par un.',
    carte: ['evenement-ou-instruction', 'paroles-sonnette', 'deux-boutons'],
    papierDuSoir: { exercices: ['total-distributeur', 'sonneries-comptees'], defi: true },
    automatismes: [
      {
        id: 'ajouter-a-total',
        versions: [[3, 4], [5, 2], [6, 3], [8, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Total vaut ' + a + '. Ajouter ' + b + ' à total. Total vaut ?', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En République démocratique du Congo, un robot de circulation est équipé d’un système qui détecte les piétons qui veulent traverser.',
    prenoms: ['Rachel', 'Clarisse'],
  };
});
