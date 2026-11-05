/* Notion 5 du bloc de technologie « Programmer » : les boucles (répéter N fois, répéter tant que). Les vis de Moussa, le compte à rebours.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const ecr = O.ecr;
  const image = (prog) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: 'Le programme, en blocs : ' + PB.enMots(prog) + '.' });
  const liste = (v) => v.map(ecr).join(', ');

  const PROG_ACCROCHE = [{ mettre: 'vis', a: 0 }, { repeter: 4, faire: [{ ajouter: 'vis', a: 1 }] }];

  return {
    id: 'prog-boucles',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'Les boucles',
    classe: 'cycle 4',
    univers: ['appareils', 'commerce'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur l’informatique et la programmation : répéter des instructions dans un programme.',

    accroche: {
      texte: 'Moussa visse quatre vis sur une radio. Il visse, il visse, il visse, il visse : le même geste, quatre fois. ' +
        'Le programme écrit ce geste une seule fois, sous la ligne : répéter 4 fois. Et pour un décompte, il répète tant qu’il reste du temps.',
      image: { dessin: 'programme', lignes: PB.lignes(PROG_ACCROCHE), description: 'Le programme des vis, en blocs : ' + PB.enMots(PROG_ACCROCHE) + '.' },
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: PROG_ACCROCHE,
      entrees: {},
      choix: {},
      essais: 1,
      consigne: 'Joue le programme ligne par ligne. Écoute combien de tours fait la répétition, et ce que vaut vis à chaque tour.',
    },

    decouverte: {
      texte: (c) => 'Regarde les lignes entre « répéter 4 fois » et « fin du bloc » : c’est ' + c.mot('boucle') + '. ' +
        'Le programme les joue 4 fois de suite. Avec « répéter tant que », il recommence tant que la réponse à la question est oui. ' +
        'L’astuce : combien de tours, ou jusqu’à quand ?',
    },

    vocabulaire: {
      termes: {
        boucle: { sesMots: 'le bloc qu’on répète', officiel: 'une boucle', lesDeux: 'le bloc qu’on répète, que les informaticiens appellent une boucle' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le bloc qu’on répète. Les informaticiens ont un mot à eux : je te le dirai la prochaine fois.',
        'Les informaticiens disent : une boucle, pour le bloc qu’on répète.',
        'Tu connais le mot officiel : une boucle répète un bloc, un nombre de fois connu ou tant qu’une condition est vraie.',
      ],
    },

    exercices: [
      {
        id: 'total-repete',
        univers: 'commerce',
        // [nombre de tours, ajout à chaque tour]
        versions: [[4, 3], [5, 2], [6, 5], [3, 8], [7, 4]],
        genere(c) {
          const [n, p] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'total', a: 0 }, { repeter: n, faire: [{ ajouter: 'total', a: p }] }];
          const r = PB.executer(prog);
          const totaux = r.trace.filter((t) => t.texte.startsWith('ajouter')).map((t) => t.vars.total);
          return {
            enonce: 'Moussa remplit des boîtes de vis avec ce programme : ' + PB.enMots(prog) + '. Que vaut total à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r.vars.total },
            aide: 'Compte les tours de la boucle. À chaque tour, la même ligne est jouée.',
            correction: ['La boucle fait ' + ecr(n) + ' tours. Après chaque tour, total vaut : ' + liste(totaux) + '.', 'À la fin, total vaut ' + ecr(r.vars.total) + '.'],
          };
        },
      },
      {
        id: 'compte-a-rebours',
        univers: 'dehors',
        // [départ, valeur d’arrêt]
        versions: [[5, 0], [6, 2], [8, 3], [10, 5], [4, 1]],
        genere(c) {
          const [t, s] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 't', a: t }, { tantQue: { op: '>', g: { v: 't' }, d: s }, faire: [{ dire: { v: 't' } }, { mettre: 't', a: { op: '−', g: { v: 't' }, d: 1 } }] }];
          const r = PB.executer(prog);
          return {
            enonce: 'Voici le compte à rebours de Rachel : ' + PB.enMots(prog) + '. Combien de nombres le programme dit-il en tout ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r.dits.length },
            aide: 'Joue la boucle tour après tour. Arrête-toi quand la condition devient fausse.',
            correction: ['Le programme dit : ' + liste(r.dits) + '.', 'Quand t vaut ' + ecr(s) + ', la condition « t > ' + ecr(s) + ' » est fausse : la boucle s’arrête.', 'Il a dit ' + ecr(r.dits.length) + ' nombres.'],
          };
        },
      },
      O.qcm('quelle-boucle', 'appareils',
        [['Visser exactement 6 vis sur une radio', 'Répéter un nombre de fois connu', 'On connaît le nombre de tours à l’avance : répéter 6 fois.'],
          ['Remplir un seau tant qu’il n’est pas plein', 'Répéter tant qu’une condition est vraie', 'On ne sait pas combien de tours il faudra : on répète tant que le seau n’est pas plein.'],
          ['Dire bonjour 3 fois', 'Répéter un nombre de fois connu', 'On connaît le nombre de tours à l’avance : répéter 3 fois.'],
          ['Rincer jusqu’à ce que l’eau soit claire', 'Répéter tant qu’une condition est vraie', 'On ne sait pas combien de tours il faudra : on répète tant que l’eau n’est pas claire.']],
        (x) => 'Quelle boucle est la plus simple pour cette tâche ? « ' + x + ' »',
        ['Répéter un nombre de fois connu', 'Répéter tant qu’une condition est vraie', 'Écrire la ligne une seule fois'],
        'Si on connaît le nombre de tours, on répète N fois. Sinon, on répète tant qu’une condition est vraie.'),
      {
        id: 'tours-avant-la-fin',
        univers: 'maison-courses',
        // [kilos ajoutés à chaque tour, kilos à atteindre au moins]
        versions: [[3, 10], [4, 12], [5, 12], [6, 20], [7, 15]],
        genere(c) {
          const [p, l] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'total', a: 0 }, { mettre: 'tours', a: 0 },
            { tantQue: { op: '<', g: { v: 'total' }, d: l }, faire: [{ ajouter: 'total', a: p }, { ajouter: 'tours', a: 1 }] }];
          const r = PB.executer(prog).vars;
          return {
            enonce: 'Moussa empile des caisses de ' + ecr(p) + ' kilos, jusqu’à atteindre au moins ' + ecr(l) + ' kilos. Voici son programme : ' + PB.enMots(prog) + '. Que vaut tours à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r.tours },
            aide: 'Avant chaque tour, vérifie la condition. Si elle est vraie, joue le bloc, puis revérifie.',
            correction: ['Après chaque tour, total vaut : ' + liste(Array.from({ length: r.tours }, (_, i) => p * (i + 1))) + '.',
              'La condition « total < ' + ecr(l) + ' » devient fausse quand total vaut ' + ecr(r.total) + '.', 'Il y a eu ' + ecr(r.tours) + ' tours : tours vaut ' + ecr(r.tours) + '.'],
          };
        },
      },
      {
        id: 'rangees-de-vis',
        univers: 'appareils',
        // [nombre de rangées, nombre de vis par rangée]
        versions: [[3, 4], [2, 6], [4, 5], [5, 3], [3, 7]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'vis', a: 0 }, { repeter: a, faire: [{ repeter: b, faire: [{ ajouter: 'vis', a: 1 }] }] }];
          const r = PB.executer(prog).vars.vis;
          return {
            enonce: 'Moussa range des vis avec une boucle dans une boucle : ' + PB.enMots(prog) + '. Que vaut vis à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'La boucle du dedans est rejouée en entier à chaque tour de la boucle du dehors.',
            correction: ['La boucle du dehors fait ' + ecr(a) + ' tours.', 'À chaque tour, la boucle du dedans ajoute ' + ecr(b) + ' vis.', ecr(a) + ' × ' + ecr(b) + ' = ' + ecr(r) + '. À la fin, vis vaut ' + ecr(r) + '.'],
          };
        },
      },
    ],

    defi: {
      // [nombre de boîtes de la première rangée, seuil de la question 3]
      versions: [[4, 12], [5, 12], [6, 25], [7, 25], [8, 40]],
      genere(c) {
        const [t, k] = c.alea.choisir(this.versions);
        const prog = [{ mettre: 't', a: t }, { mettre: 'boîtes', a: 0 }, { mettre: 'rangées', a: 0 },
          { tantQue: { op: '>', g: { v: 't' }, d: 0 }, faire: [{ ajouter: 'boîtes', a: { v: 't' } }, { ajouter: 'rangées', a: 1 }, { mettre: 't', a: { op: '−', g: { v: 't' }, d: 1 } }] }];
        const r = PB.executer(prog).vars;
        const depasse = r.boîtes > k;
        const termes = Array.from({ length: t }, (_, i) => t - i);
        return {
          enonce: 'Aminata empile des boîtes de piles dans la vitrine de Moussa. La première rangée a ' + ecr(t) + ' boîtes, la suivante une de moins, et ainsi de suite jusqu’à une seule boîte. Voici le programme : ' + PB.enMots(prog) + '.',
          image: image(prog),
          questions: [
            {
              texte: 'Question 1. Que vaut rangées à la fin du programme ?',
              reponse: { type: 'nombre', valeur: r.rangées },
              aide: 'Chaque tour de la boucle ajoute une rangée. Compte les tours.',
              correction: ['La boucle s’arrête quand t vaut 0. Elle part de ' + ecr(t) + ' et descend de 1 à chaque tour.', 'Il y a ' + ecr(r.rangées) + ' tours : rangées vaut ' + ecr(r.rangées) + '.'],
            },
            {
              texte: 'Question 2. Que vaut boîtes à la fin du programme ?',
              reponse: { type: 'nombre', valeur: r.boîtes },
              aide: 'À chaque tour, on ajoute à boîtes la valeur de t.',
              correction: ['On ajoute successivement : ' + liste(termes) + '.', termes.map(ecr).join(' + ') + ' = ' + ecr(r.boîtes) + '. À la fin, boîtes vaut ' + ecr(r.boîtes) + '.'],
            },
            {
              texte: 'Question 3. Le total de boîtes dépasse-t-il ' + ecr(k) + ' ? Réponds par Oui ou par Non.',
              reponse: O.choix(c.alea, depasse ? 'Oui' : 'Non', [depasse ? 'Non' : 'Oui']),
              aide: 'Compare ta réponse à la question précédente avec le nombre demandé.',
              correction: [ecr(r.boîtes) + (depasse ? ' est plus grand que ' : ' n’est pas plus grand que ') + ecr(k) + '. Réponse : ' + (depasse ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Que se passerait-il si on oubliait la ligne « mettre t à t − 1 » ? Explique en une ou deux phrases.',
              correction: ['Sans cette ligne, t resterait toujours le même.', 'La condition « t > 0 » resterait vraie : la boucle ne s’arrêterait jamais.'],
              grille: ['As-tu dit que t ne changerait plus ?', 'As-tu dit que la boucle ne s’arrêterait jamais ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais répéter un bloc avec une boucle, un nombre de fois connu ou tant qu’une condition est vraie.',
    carte: ['quelle-boucle', 'total-repete', 'compte-a-rebours'],
    papierDuSoir: { exercices: ['total-repete', 'tours-avant-la-fin'], defi: true },
    automatismes: [
      {
        id: 'tours-fois-ajout',
        versions: [[3, 4], [5, 2], [6, 3], [4, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'On répète ' + a + ' fois « ajouter ' + b + ' à x », en partant de x égal à 0. Que vaut x ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Un métier Jacquard, né en France vers 1804, lit des cartes perforées reliées en boucle continue.',
    prenoms: ['Moussa', 'Rachel', 'Aminata'],
  };
});
