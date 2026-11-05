/* Notion 3 du bloc de technologie « Programmer » : de l’algorithme au programme. La recette de thé de Laure et la machine de Moussa.
   Les programmes sont écrits en mots (lisibles au lecteur d’écran) et exécutés en code (js/programme-blocs.js).
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const image = (prog, intro) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: intro + ' ' + PB.enMots(prog) + '.' });
  const dit = (t) => ({ dire: { t } });

  // La recette de thé traduite : n tasses, p centilitres d’eau par tasse.
  const the = (n, p) => [{ mettre: 'eau', a: 0 }, { repeter: n, faire: [{ ajouter: 'eau', a: p }] }, { dire: { v: 'eau' } }];

  // Trois blocs : x vaut a, puis on ajoute b, puis on multiplie par m. Avec echange, les deux derniers blocs changent de place.
  const trois = (a, b, m, echange) => {
    const ajout = { mettre: 'x', a: { op: '+', g: { v: 'x' }, d: b } };
    const produit = { mettre: 'x', a: { op: '×', g: { v: 'x' }, d: m } };
    return [{ mettre: 'x', a }].concat(echange ? [produit, ajout] : [ajout, produit], [{ dire: { v: 'x' } }]);
  };

  // Une ou deux théières selon le nombre d’invités.
  const théières = (n, s) => [
    { mettre: 'invités', a: n },
    { mettre: 'théières', a: 1 },
    { si: { op: '>', g: { v: 'invités' }, d: s }, alors: [{ ajouter: 'théières', a: 1 }] },
    { dire: { v: 'théières' } },
  ];

  // Le bloc répété a une valeur inconnue : p.
  const inconnu = (n) => [{ mettre: 'total', a: 0 }, { repeter: n, faire: [{ ajouter: 'total', a: { v: 'p' } }] }];

  // La boîte de vis de Moussa.
  const boite = (n, p, seuil) => [
    { mettre: 'vis', a: 0 },
    { repeter: n, faire: [{ ajouter: 'vis', a: p }] },
    { si: { op: '>', g: { v: 'vis' }, d: seuil }, alors: [dit('Boîte pleine')], sinon: [dit('Il manque des vis')] },
  ];

  const THE = the(4, 25);

  return {
    id: 'algorithme-programme',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'De l’algorithme au programme',
    classe: '4e',
    univers: ['cuisine-restaurant', 'appareils', 'commerce'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Programmer » : décrire un algorithme en phrases, le traduire en programme, l’ordre des instructions.',

    accroche: {
      texte: 'Rachel suit la recette de Laure. Verser l’eau, attendre, servir : tout est écrit en phrases. ' +
        'Au fond de l’atelier, Moussa construit une machine à thé. Un ordinateur ne devine rien : chaque phrase doit devenir un ordre précis.',
      image: image(THE, 'La recette de thé traduite pour la machine de Moussa, écrite en mots. Le programme :'),
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: THE,
      entrees: {},
      choix: {},
      essais: 1,
      consigne: 'Lis les étapes, puis joue le programme de Moussa, ligne par ligne. L’ordinateur suit les lignes de haut en bas.',
      etapes: [
        'Laure écrit sa recette en phrases : verser, attendre, servir, dans l’ordre.',
        'Pour la machine de Moussa, verser devient des blocs précis : 25 centilitres d’eau, 4 fois.',
        'Un ordinateur ne devine rien : il suit les blocs de haut en bas.',
        'Si on change l’ordre des blocs, le résultat peut changer : « dire eau » avant la boucle dit 0.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde les étapes de Laure : c’est ' + c.mot('algorithme') + '. ' +
        'Regarde les blocs de Moussa : c’est ' + c.mot('programme') + '. ' +
        'L’astuce : on pense d’abord en phrases, puis on traduit en blocs, dans le bon ordre.',
    },

    vocabulaire: {
      termes: {
        algorithme: { sesMots: 'la recette écrite en phrases', officiel: 'un algorithme', lesDeux: 'la recette écrite en phrases, que les informaticiens appellent un algorithme' },
        programme: { sesMots: 'la recette traduite pour l’ordinateur', officiel: 'un programme', lesDeux: 'la recette traduite pour l’ordinateur, que les informaticiens appellent un programme' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la recette écrite en phrases, et la recette traduite pour l’ordinateur. Les informaticiens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les informaticiens disent : un algorithme, pour la recette écrite en phrases ; un programme, pour la recette traduite pour l’ordinateur.',
        'Tu connais les mots officiels : l’algorithme est écrit en phrases, et le programme le traduit pour l’ordinateur.',
      ],
    },

    exercices: [
      {
        id: 'ordre-des-blocs',
        univers: 'appareils',
        // [x au départ, nombre ajouté, multiplicateur]
        versions: [[2, 3, 4], [1, 5, 3], [4, 2, 5], [3, 3, 2], [5, 1, 6]],
        genere(c) {
          const [a, b, m] = c.alea.choisir(this.versions);
          const prog = trois(a, b, m, true);
          const x = PB.executer(prog).vars.x;
          return {
            enonce: 'Moussa avait écrit les blocs dans l’ordre : ' + PB.enMots(trois(a, b, m, false)) + '. Il échange les deux derniers blocs de calcul. Voici le programme : ' + PB.enMots(prog) + '. Que vaut x à la fin ?',
            image: image(prog, 'Le programme après l’échange des deux blocs de calcul. Le programme :'),
            reponse: { type: 'nombre', valeur: x },
            aide: 'Joue les blocs un par un, de haut en bas, comme l’ordinateur.',
            correction: ['x vaut ' + a + ' au départ.', 'On multiplie par ' + m + ' : ' + a + ' × ' + m + ' = ' + a * m + '.', 'Puis on ajoute ' + b + ' : ' + a * m + ' + ' + b + ' = ' + x + '.', 'Dans l’autre ordre, on aurait eu ' + (a + b) * m + '.'],
          };
        },
      },
      {
        id: 'traduire-la-phrase',
        univers: 'commerce',
        // [type de bloc, variable, nombre, phrase de la recette]
        versions: [['ajouter', 'vis', 4, 'Ajoute 4 vis dans la boîte.'], ['mettre', 'caisse', 0, 'Remets la caisse à 0.'], ['ajouter', 'tasses', 3, 'Ajoute 3 tasses sur le plateau.'],
          ['mettre', 'vis', 10, 'Compte 10 vis au départ.'], ['ajouter', 'euros', 5, 'Ajoute 5 euros à la tirelire.'], ['mettre', 'tasses', 6, 'Pose 6 tasses sur la table.']],
        genere(c) {
          const [type, v, n, phrase] = c.alea.choisir(this.versions);
          const bloc = type === 'ajouter' ? { ajouter: v, a: n } : { mettre: v, a: n };
          const juste = PB.entete(bloc);
          const faux = type === 'ajouter' ? ['mettre ' + v + ' à ' + n, 'ajouter ' + v + ' à ' + n] : ['mettre ' + n + ' à ' + v, 'ajouter ' + v + ' à ' + n];
          return {
            enonce: 'Dans la recette de Moussa, on lit : « ' + phrase + ' » Quelle ligne de programme traduit cette phrase ?',
            reponse: O.choix(c.alea, juste, faux),
            aide: 'Cherche la ligne qui fait exactement ce que dit la phrase.',
            correction: [type === 'ajouter' ? 'La phrase ajoute à ce qu’il y a déjà : il faut le bloc « ajouter ».' : 'La phrase donne une valeur de départ : il faut le bloc « mettre ».', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'recette-en-boucle',
        univers: 'cuisine-restaurant',
        // [nombre de tasses, centilitres d’eau par tasse]
        versions: [[4, 25], [3, 20], [5, 15], [6, 25], [2, 30]],
        genere(c) {
          const [n, p] = c.alea.choisir(this.versions);
          const prog = the(n, p);
          const eau = PB.executer(prog).dits[0];
          return {
            enonce: 'La recette de Laure dit : « Pour chaque tasse, verse ' + p + ' cL d’eau. » Il y a ' + n + ' tasses. Voici la traduction : ' + PB.enMots(prog) + '. Combien de centilitres d’eau la machine dit-elle à la fin ?',
            image: image(prog, 'La recette traduite : ' + n + ' tasses et ' + p + ' centilitres par tasse. Le programme :'),
            reponse: { type: 'nombre', valeur: eau },
            aide: 'Répète la même étape autant de fois que la recette le dit.',
            correction: ['Le bloc est répété ' + n + ' fois.', 'Chaque fois, on ajoute ' + p + ' cL.', n + ' × ' + p + ' = ' + eau + ' cL.'],
          };
        },
      },
      {
        id: 'deuxieme-theiere',
        univers: 'cuisine-restaurant',
        // [nombre d’invités, personnes servies par une théière]
        versions: [[6, 4], [3, 4], [8, 8], [9, 8], [5, 4]],
        genere(c) {
          const [n, s] = c.alea.choisir(this.versions);
          const prog = théières(n, s);
          const t = PB.executer(prog).dits[0];
          return {
            enonce: 'La recette dit : « Une théière sert ' + s + ' personnes. S’il y a plus d’invités, prépare une deuxième théière. » Voici la traduction : ' + PB.enMots(prog) + '. Que dit la machine à la fin ?',
            image: image(prog, 'La recette traduite : ' + n + ' invités et ' + s + ' personnes par théière. Le programme :'),
            reponse: { type: 'nombre', valeur: t },
            aide: 'Regarde si la condition est vraie, avant de décider.',
            correction: [n > s ? n + ' est plus grand que ' + s + ' : la condition est vraie.' : n + ' n’est pas plus grand que ' + s + ' : la condition est fausse.', n > s ? 'On ajoute une théière : il y en a ' + t + '.' : 'On n’ajoute rien : il y a ' + t + ' théière.'],
          };
        },
      },
      {
        id: 'valeur-manquante',
        univers: 'appareils',
        // [répétitions, valeur de p]
        versions: [[4, 6], [3, 5], [5, 4], [6, 3], [4, 8]],
        genere(c) {
          const [n, p] = c.alea.choisir(this.versions);
          const total = PB.executer([{ mettre: 'p', a: p }].concat(inconnu(n))).vars.total;
          return {
            enonce: 'Moussa a écrit le programme : ' + PB.enMots(inconnu(n)) + '. Il veut que total vaille ' + total + ' à la fin. Quelle valeur faut-il donner à p ?',
            image: image(inconnu(n), 'Un programme dont la valeur p est inconnue. Le programme :'),
            reponse: { type: 'nombre', valeur: p },
            aide: 'Joue la répétition, puis cherche la valeur qui donne le bon total.',
            correction: ['On ajoute p à total, ' + n + ' fois.', 'Il faut donc ' + n + ' × p = ' + total + '.', total + ' ÷ ' + n + ' = ' + p + '.'],
          };
        },
      },
    ],

    defi: {
      // [répétitions, vis par ajout, nombre de la condition, prix d’une vis en centimes]
      versions: [[4, 12, 40, 5], [5, 8, 45, 10], [3, 15, 45, 10], [6, 10, 50, 5]],
      genere(c) {
        const [n, p, s, cts] = c.alea.choisir(this.versions);
        const prog = boite(n, p, s);
        const res = PB.executer(prog);
        const vis = res.vars.vis;
        const parole = res.dits[0];
        const autre = parole === 'Boîte pleine' ? 'Il manque des vis' : 'Boîte pleine';
        return {
          enonce: 'Moussa remplit des boîtes de vis. Sa recette : « Mets 0 vis dans la boîte. Ajoute ' + p + ' vis, ' + n + ' fois. Si la boîte contient plus de ' + s + ' vis, dis : Boîte pleine. Sinon, dis : Il manque des vis. » ' +
            'Il la traduit en programme : ' + PB.enMots(prog) + '. Une vis coûte ' + cts + ' centimes.',
          image: image(prog, 'Le programme de Moussa : ' + n + ' ajouts de ' + p + ' vis, avec ' + s + ' vis comme limite. Le programme :'),
          questions: [
            {
              texte: 'Question 1. Combien de vis y a-t-il dans la boîte à la fin ?',
              reponse: { type: 'nombre', valeur: vis },
              aide: 'Répète l’ajout autant de fois que les blocs le disent.',
              correction: [n + ' × ' + p + ' = ' + vis + ' vis.'],
            },
            {
              texte: 'Question 2. Combien d’euros valent les vis de la boîte ?',
              reponse: { type: 'nombre', valeur: (vis * cts) / 100 },
              aide: 'Multiplie le nombre de vis par le prix d’une vis, puis passe en euros.',
              correction: [vis + ' × ' + cts + ' = ' + vis * cts + ' centimes.', vis * cts + ' centimes font ' + O.ecr((vis * cts) / 100) + ' euros.'],
            },
            {
              texte: 'Question 3. Que dit le programme à la fin ?',
              reponse: O.choix(c.alea, 'Il dit « ' + parole + ' »', ['Il dit « ' + autre + ' »', 'Il ne dit rien']),
              aide: 'Compare le nombre de vis au nombre de la condition.',
              correction: [vis > s ? vis + ' est plus grand que ' + s + ' : la condition est vraie.' : vis + ' n’est pas plus grand que ' + s + ' : la condition est fausse.', 'Réponse : Il dit « ' + parole + ' ».'],
            },
            {
              texte: 'Question 4. Explique la différence entre la recette de Moussa en phrases et son programme. Pourquoi l’ordre des blocs compte-t-il ?',
              correction: ['La recette est écrite en phrases, pour une personne : c’est l’algorithme.', 'Le programme la traduit en blocs précis, pour l’ordinateur.', 'L’ordinateur joue les blocs dans l’ordre : un bloc déplacé peut changer le résultat.'],
              grille: ['As-tu dit que la recette est écrite en phrases et le programme en blocs précis ?', 'As-tu dit que l’ordinateur suit les blocs dans l’ordre ?', 'As-tu donné une raison pour laquelle changer l’ordre change le résultat ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais écrire une recette en phrases, puis la traduire en blocs, dans le bon ordre.',
    carte: ['ordre-des-blocs', 'traduire-la-phrase', 'deuxieme-theiere'],
    papierDuSoir: { exercices: ['recette-en-boucle', 'valeur-manquante'], defi: true },
    automatismes: [
      {
        id: 'repeter-ajouter',
        versions: [[3, 4], [5, 2], [4, 6], [6, 5]],
        genere(c) { const [n, p] = c.alea.choisir(this.versions); return { enonce: 'Répéter ' + n + ' fois : ajouter ' + p + ' à total. Total vaut 0 au départ. Total vaut ?', reponse: { type: 'nombre', valeur: n * p } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, Katherine Johnson a refait à la main les calculs d’un ordinateur pour le vol de Glenn.',
    prenoms: ['Rachel', 'Laure', 'Moussa'],
  };
});
