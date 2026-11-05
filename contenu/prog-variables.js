/* Notion 1 du bloc de technologie « Programmer » : les variables. Le compteur de clients de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const ecr = O.ecr;
  const image = (prog) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: 'Le programme, en blocs : ' + PB.enMots(prog) + '.' });
  // Les pas du programme : après chaque ligne où la boîte existe, ce qu’elle vaut.
  const pas = (prog, nom) => PB.executer(prog).trace.filter((t) => nom in t.vars).map((t) => 'Ligne « ' + t.texte + ' » : ' + nom + ' vaut ' + ecr(t.vars[nom]) + '.');

  const PROG_ACCROCHE = [{ mettre: 'clients', a: 0 }, { ajouter: 'clients', a: 1 }, { ajouter: 'clients', a: 1 }, { ajouter: 'clients', a: 1 }];

  return {
    id: 'prog-variables',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'Les variables',
    classe: 'cycle 4',
    univers: ['commerce', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur l’informatique et la programmation : écrire un petit programme avec des variables.',

    accroche: {
      texte: 'Moussa compte ses clients du matin. Sur son établi, il a un petit compteur avec un nom écrit dessus. ' +
        'Chaque fois qu’un client entre, le compteur monte d’un. Le compteur garde le nombre en mémoire. Un programme sait faire la même chose.',
      image: Object.assign(image(PROG_ACCROCHE), { description: 'Le programme du compteur de Moussa, en blocs : mettre clients à 0 ; ajouter 1 à clients ; ajouter 1 à clients ; ajouter 1 à clients.' }),
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: PROG_ACCROCHE,
      entrees: {},
      choix: {},
      essais: 1,
      consigne: 'Joue le programme ligne par ligne. À chaque ligne, écoute ce que vaut le compteur de Moussa.',
    },

    decouverte: {
      texte: (c) => 'Regarde le compteur de Moussa : c’est ' + c.mot('variable') + '. ' +
        'Mettre clients à 3, c’est ranger 3 dans la boîte. Ajouter 2 à clients, c’est ajouter 2 au contenu de la boîte : elle vaut alors 5. ' +
        'L’astuce : on lit les lignes dans l’ordre, et la boîte garde la dernière valeur.',
    },

    vocabulaire: {
      termes: {
        variable: { sesMots: 'la boîte avec un nom', officiel: 'une variable', lesDeux: 'la boîte avec un nom, que les informaticiens appellent une variable' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la boîte avec un nom. Les informaticiens ont un mot à eux : je te le dirai la prochaine fois.',
        'Les informaticiens disent : une variable, pour la boîte avec un nom.',
        'Tu connais le mot officiel : une variable garde une valeur sous son nom.',
      ],
    },

    exercices: [
      {
        id: 'valeur-finale',
        univers: 'commerce',
        // [valeur de départ, premier ajout, second ajout]
        versions: [[0, 3, 2], [2, 4, 1], [5, 3, 3], [10, 6, 2], [4, 5, 5]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'clients', a }, { ajouter: 'clients', a: b }, { ajouter: 'clients', a: d }];
          const r = PB.executer(prog).vars.clients;
          return {
            enonce: 'Voici le programme du compteur de Moussa : ' + PB.enMots(prog) + '. Que vaut clients à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'Lis les lignes dans l’ordre. Après chaque ligne, note ce que vaut la boîte clients.',
            correction: pas(prog, 'clients').concat(['À la fin, clients vaut ' + ecr(r) + '.']),
          };
        },
      },
      {
        id: 'ancienne-valeur',
        univers: 'appareils',
        // [piles sur l’établi, piles en réserve]
        versions: [[3, 10], [4, 8], [6, 20], [0, 15], [7, 12]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'piles', a }, { mettre: 'réserve', a: b }, { mettre: 'piles', a: { v: 'réserve' } }];
          const r = PB.executer(prog).vars.piles;
          return {
            enonce: 'Moussa compte ses piles de rechange avec ce programme : ' + PB.enMots(prog) + '. Que vaut piles à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'Attention : « mettre » efface l’ancien contenu de la boîte et le remplace.',
            correction: pas(prog, 'piles').concat(['La troisième ligne efface ce qui était rangé avant. À la fin, piles vaut ' + ecr(r) + '.']),
          };
        },
      },
      O.qcm('quelle-ligne', 'commerce',
        [['remettre le compteur clients à zéro', 'mettre clients à 0', 'Mettre range une valeur neuve dans la boîte : ici zéro.'],
          ['compter un client de plus', 'ajouter 1 à clients', 'Ajouter garde l’ancien contenu et lui ajoute un.'],
          ['compter deux clients de plus', 'ajouter 2 à clients', 'Ajouter garde l’ancien contenu et lui ajoute deux.'],
          ['écrire que le compteur indique dix', 'mettre clients à 10', 'Mettre range directement la valeur dix dans la boîte.']],
        (x) => 'Moussa veut ' + x + '. Quelle ligne de programme choisis-tu ?',
        ['mettre clients à 0', 'ajouter 1 à clients', 'ajouter 2 à clients', 'mettre clients à 10'],
        'Mettre range une valeur neuve. Ajouter garde l’ancien contenu et lui ajoute un nombre.'),
      {
        id: 'nom-de-la-boite',
        univers: 'appareils',
        // [ligne, nom de la boîte, nombre, verbe]
        versions: [['mettre prix à 5', 'prix', '5', 'mettre'], ['ajouter 3 à stock', 'stock', '3', 'ajouter'], ['mettre âge à 12', 'âge', '12', 'mettre'],
          ['ajouter 1 à clients', 'clients', '1', 'ajouter'], ['mettre piles à 20', 'piles', '20', 'mettre']],
        genere(c) {
          const [ligne, nom, nombre, verbe] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans la ligne « ' + ligne + ' », quel mot est le nom de la boîte ?',
            reponse: O.choix(c.alea, nom, [nombre, verbe]),
            aide: 'Le nom de la boîte n’est ni le nombre, ni le verbe qui dit ce qu’on fait.',
            correction: ['Le nom de la boîte, c’est ' + nom + '.', 'Le nombre ' + nombre + ' est la valeur, et « ' + verbe + ' » dit ce qu’on fait.'],
          };
        },
      },
      {
        id: 'deux-boites',
        univers: 'commerce',
        // [clients du matin, clients du soir]
        versions: [[12, 15], [8, 9], [20, 14], [7, 16], [18, 11]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'matin', a }, { mettre: 'soir', a: b }, { mettre: 'total', a: 0 }, { ajouter: 'total', a: { v: 'matin' } }, { ajouter: 'total', a: { v: 'soir' } }];
          const r = PB.executer(prog).vars.total;
          return {
            enonce: 'Moussa utilise trois boîtes : ' + PB.enMots(prog) + '. Que vaut total à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'On peut ajouter le contenu d’une boîte à une autre boîte. Suis la boîte total.',
            correction: pas(prog, 'total').concat(['À la fin, total vaut ' + ecr(r) + ' : ' + ecr(a) + ' + ' + ecr(b) + '.']),
          };
        },
      },
    ],

    defi: {
      // [clients du matin, clients de 10 h, clients de l’après-midi, 0 : question juste après la copie ; 1 : question à la fin]
      versions: [[4, 3, 5, 0], [6, 2, 4, 1], [5, 5, 3, 0], [3, 4, 6, 1], [7, 2, 2, 1]],
      genere(c) {
        const [a, b, d, k] = c.alea.choisir(this.versions);
        const prog = [{ mettre: 'clients', a: 0 }, { ajouter: 'clients', a }, { ajouter: 'clients', a: b }, { mettre: 'matin', a: { v: 'clients' } }, { ajouter: 'clients', a: d }];
        const r = PB.executer(prog).vars;
        const memes = k === 0;
        return {
          enonce: 'Moussa compte ses clients avec un programme. Il recopie le total du matin dans une autre boîte, matin, puis les clients de l’après-midi arrivent. Voici son programme : ' + PB.enMots(prog) + '.',
          image: image(prog),
          questions: [
            {
              texte: 'Question 1. Que vaut clients à la fin du programme ?',
              reponse: { type: 'nombre', valeur: r.clients },
              aide: 'Lis les lignes dans l’ordre et suis la boîte clients.',
              correction: pas(prog, 'clients').concat(['À la fin, clients vaut ' + ecr(r.clients) + '.']),
            },
            {
              texte: 'Question 2. Que vaut matin à la fin du programme ?',
              reponse: { type: 'nombre', valeur: r.matin },
              aide: 'La ligne qui remplit matin recopie la valeur de clients à cet instant précis.',
              correction: ['Quand la ligne « mettre matin à clients » est jouée, clients vaut ' + ecr(a + b) + '.', 'Ensuite, les lignes suivantes ne touchent plus à matin : il vaut ' + ecr(r.matin) + '.'],
            },
            {
              texte: memes
                ? 'Question 3. Juste après la ligne « mettre matin à clients », matin vaut-il la même chose que clients ?'
                : 'Question 3. À la fin du programme, matin vaut-il la même chose que clients ?',
              reponse: O.choix(c.alea, memes ? 'Oui' : 'Non', [memes ? 'Non' : 'Oui']),
              aide: 'Regarde si une ligne change clients après la copie.',
              correction: memes
                ? ['Juste après la copie, les deux boîtes valent ' + ecr(a + b) + '. Réponse : Oui.']
                : ['La dernière ligne ajoute ' + ecr(d) + ' à clients, qui vaut ' + ecr(r.clients) + ', alors que matin vaut ' + ecr(r.matin) + '. Réponse : Non.'],
            },
            {
              texte: 'Question 4. Explique en une ou deux phrases pourquoi matin ne change pas quand clients change après la copie.',
              correction: ['La ligne « mettre matin à clients » recopie la valeur de clients à ce moment-là.', 'Ensuite, ajouter ' + ecr(d) + ' à clients ne touche pas à matin.'],
              grille: ['As-tu dit que la ligne recopie la valeur à ce moment-là ?', 'As-tu dit que matin ne change plus ensuite ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais ranger un nombre dans une variable, et suivre sa valeur ligne après ligne.',
    carte: ['quelle-ligne', 'nom-de-la-boite', 'ancienne-valeur'],
    papierDuSoir: { exercices: ['valeur-finale', 'deux-boites'], defi: true },
    automatismes: [
      {
        id: 'ajouter-vite',
        versions: [[3, 4], [5, 2], [8, 6], [10, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'x vaut ' + a + '. On ajoute ' + b + ' à x. Que vaut x ?', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte ancienne, on appelait « aha », c’est-à-dire « quelque chose », une quantité inconnue dans un problème.',
    prenoms: ['Moussa'],
  };
});
