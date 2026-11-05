/* Notion 6 du bloc de technologie « Programmer » : les listes (pour chaque élément, longueur, somme, ajout). Les recettes de la semaine de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const ecr = O.ecr;
  const image = (prog) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: 'Le programme, en blocs : ' + PB.enMots(prog) + '.' });
  const liste = (v) => v.map(ecr).join(', ');
  const somme = (v) => v.reduce((a, b) => a + b, 0);
  // Le programme qui additionne une liste, boîte par boîte.
  const progSomme = (L, nom) => [{ liste: nom, valeurs: L }, { mettre: 'total', a: 0 }, { pourChaque: 'r', dans: nom, faire: [{ ajouter: 'total', a: { v: 'r' } }] }];

  const PROG_ACCROCHE = [{ liste: 'recettes', valeurs: [12, 8, 15] }, { mettre: 'total', a: 0 }, { pourChaque: 'r', dans: 'recettes', faire: [{ ajouter: 'total', a: { v: 'r' } }] }, { dire: { v: 'total' } }];

  return {
    id: 'prog-listes',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'Les listes',
    classe: 'cycle 4',
    univers: ['commerce', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur l’informatique et la programmation : ranger et parcourir des données dans un programme.',

    accroche: {
      texte: 'Moussa note ses recettes de la semaine. Il écrit un montant par jour, l’un derrière l’autre, sur une seule feuille. ' +
        'Pour la recette totale, il lit chaque montant et il l’ajoute. Pour savoir combien de jours il a notés, il compte les montants. Un programme sait faire la même chose.',
      image: { dessin: 'programme', lignes: PB.lignes(PROG_ACCROCHE), description: 'Le programme de la feuille de recettes, en blocs : ' + PB.enMots(PROG_ACCROCHE) + '.' },
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: PROG_ACCROCHE,
      entrees: {},
      choix: {},
      essais: 1,
      consigne: 'Joue le programme ligne par ligne. Écoute le total grandir à chaque montant lu.',
    },

    decouverte: {
      texte: (c) => 'Regarde la feuille de Moussa : c’est ' + c.mot('liste') + '. Chaque montant écrit dessus est ' + c.mot('element') + '. ' +
        'Avec « pour chaque », le programme lit les montants un par un. La longueur, c’est le nombre de montants. ' +
        'Ajouter à la fin, c’est écrire un montant de plus. L’astuce : on lit, on compte, on ajoute.',
    },

    vocabulaire: {
      termes: {
        liste: { sesMots: 'un paquet de valeurs rangées dans l’ordre', officiel: 'une liste', lesDeux: 'un paquet de valeurs rangées dans l’ordre, que les informaticiens appellent une liste' },
        element: { sesMots: 'une case du paquet', officiel: 'un élément', lesDeux: 'une case du paquet, que les informaticiens appellent un élément' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un paquet de valeurs rangées dans l’ordre, et une case du paquet. Les informaticiens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les informaticiens disent : une liste, pour le paquet de valeurs ; un élément, pour une case du paquet.',
        'Tu connais les mots officiels : une liste contient des éléments rangés dans l’ordre.',
      ],
    },

    exercices: [
      {
        id: 'somme-liste',
        univers: 'commerce',
        // [recettes de la semaine en euros]
        versions: [[[12, 8, 15, 10]], [[20, 5, 9]], [[7, 14, 6, 11, 2]], [[30, 12, 18]], [[25, 5, 10, 15]]],
        genere(c) {
          const [L] = c.alea.choisir(this.versions);
          const prog = progSomme(L, 'recettes');
          const r = PB.executer(prog);
          const totaux = r.trace.filter((t) => t.texte.startsWith('ajouter')).map((t) => t.vars.total);
          return {
            enonce: 'Moussa additionne ses recettes, en euros, avec ce programme : ' + PB.enMots(prog) + '. Que vaut total à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r.vars.total },
            aide: 'La boucle lit un élément à la fois. À chaque tour, il est ajouté à total.',
            correction: ['La boucle fait ' + ecr(L.length) + ' tours. Après chaque tour, total vaut : ' + liste(totaux) + '.', 'À la fin, total vaut ' + ecr(r.vars.total) + '.'],
          };
        },
      },
      {
        id: 'longueur-apres-ajout',
        univers: 'maison-courses',
        // [prix au départ, prix ajoutés]
        versions: [[[10, 20, 30], [5, 8]], [[4, 9], [6, 7, 2]], [[15, 25, 35, 45], [10]], [[3], [8, 9, 4, 6]], [[12, 18, 22], [7, 9, 11]]],
        genere(c) {
          const [base, plus] = c.alea.choisir(this.versions);
          const prog = [{ liste: 'prix', valeurs: base }].concat(plus.map((a) => ({ ajouterListe: 'prix', a })), [{ mettre: 'n', a: { longueur: 'prix' } }]);
          const r = PB.executer(prog).vars;
          return {
            enonce: 'Rachel note des prix en euros avec ce programme : ' + PB.enMots(prog) + '. Que vaut n à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r.n },
            aide: 'La longueur compte tous les éléments de la liste, ceux du départ et ceux ajoutés.',
            correction: ['Au départ, la liste prix a ' + ecr(base.length) + (base.length > 1 ? ' éléments' : ' élément') + '.',
              'On en ajoute ' + ecr(plus.length) + ' : la liste devient ' + liste(r.prix) + '.', 'Sa longueur est ' + ecr(r.n) + ', donc n vaut ' + ecr(r.n) + '.'],
          };
        },
      },
      O.qcm('quelle-instruction', 'commerce',
        [['compter les montants de la feuille', 'la longueur de la liste', 'Compter les éléments, c’est demander la longueur de la liste.'],
          ['écrire un montant de plus à la fin de la feuille', 'ajouter … à la liste', 'Écrire un élément de plus à la fin, c’est ajouter à la liste.'],
          ['faire le même calcul pour chaque montant de la feuille', 'pour chaque élément de la liste', 'Répéter une action sur chaque élément, c’est pour chaque élément de la liste.'],
          ['savoir combien de jours sont notés', 'la longueur de la liste', 'Le nombre de jours notés est le nombre d’éléments : la longueur.'],
          ['ajouter le montant de dimanche à la feuille', 'ajouter … à la liste', 'Le montant de dimanche devient un élément de plus à la fin de la liste.']],
        (x) => 'Moussa veut ' + x + '. Quelle ligne de programme utilise-t-il ?',
        ['la longueur de la liste', 'ajouter … à la liste', 'pour chaque élément de la liste'],
        'Compter : la longueur. Écrire de plus : ajouter. Faire pour tous, un par un : pour chaque.'),
      {
        id: 'plus-grand-element',
        univers: 'appareils',
        // [recettes en euros]
        versions: [[[12, 8, 15, 10]], [[7, 19, 6]], [[22, 5, 14, 9, 17]], [[30, 12, 18]], [[8, 11, 25, 16]]],
        genere(c) {
          const [L] = c.alea.choisir(this.versions);
          const prog = [{ liste: 'recettes', valeurs: L }, { mettre: 'm', a: 0 }, { pourChaque: 'x', dans: 'recettes', faire: [{ si: { op: '>', g: { v: 'x' }, d: { v: 'm' } }, alors: [{ mettre: 'm', a: { v: 'x' } }] }] }];
          const r = PB.executer(prog).vars.m;
          const courants = [];
          L.reduce((m, x) => { const n = Math.max(m, x); courants.push(n); return n; }, 0);
          return {
            enonce: 'Moussa cherche sa meilleure journée, en euros, avec ce programme : ' + PB.enMots(prog) + '. Que vaut m à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'La boîte m garde le plus grand montant vu jusque-là. Elle change seulement si le nouveau montant est plus grand.',
            correction: ['Après chaque élément, m vaut : ' + liste(courants) + '.', 'À la fin, m vaut ' + ecr(r) + '.'],
          };
        },
      },
      {
        id: 'moyenne-liste',
        univers: 'commerce',
        // [recettes en euros, dont la moyenne tombe juste]
        versions: [[[8, 12, 10]], [[15, 9, 12, 12]], [[6, 10, 14]], [[20, 16, 18, 18]], [[5, 7, 9, 11, 8]]],
        genere(c) {
          const [L] = c.alea.choisir(this.versions);
          const prog = progSomme(L, 'recettes').concat([{ mettre: 'moyenne', a: { op: '÷', g: { v: 'total' }, d: { longueur: 'recettes' } } }]);
          const r = PB.executer(prog).vars;
          return {
            enonce: 'Moussa calcule sa recette moyenne, en euros, avec ce programme : ' + PB.enMots(prog) + '. Que vaut moyenne à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r.moyenne },
            aide: 'Additionne tous les éléments, puis divise par la longueur de la liste.',
            correction: ['La somme des éléments est ' + ecr(r.total) + '.', 'La longueur de la liste est ' + ecr(L.length) + '.', ecr(r.total) + ' ÷ ' + ecr(L.length) + ' = ' + ecr(r.moyenne) + '. À la fin, moyenne vaut ' + ecr(r.moyenne) + '.'],
          };
        },
      },
    ],

    defi: {
      // [recettes de la semaine, recette de dimanche, objectif de recette, en euros]
      versions: [[[12, 8, 15, 10, 9], 14, 60], [[20, 5, 9, 16], 12, 70], [[18, 25, 7, 14, 10, 6], 20, 90], [[9, 11, 6, 13], 8, 50], [[30, 12, 18, 20], 15, 100]],
      genere(c) {
        const [L, dim, obj] = c.alea.choisir(this.versions);
        const prog = [{ liste: 'recettes', valeurs: L }, { ajouterListe: 'recettes', a: dim }, { mettre: 'total', a: 0 },
          { pourChaque: 'r', dans: 'recettes', faire: [{ ajouter: 'total', a: { v: 'r' } }] }, { mettre: 'n', a: { longueur: 'recettes' } }];
        const r = PB.executer(prog).vars;
        const depasse = r.total > obj;
        return {
          enonce: 'Moussa note ses recettes en euros dans une liste, puis il ajoute celle de dimanche et fait le total. Voici son programme : ' + PB.enMots(prog) + '.',
          image: image(prog),
          questions: [
            {
              texte: 'Question 1. Que vaut n à la fin du programme ?',
              reponse: { type: 'nombre', valeur: r.n },
              aide: 'La longueur compte les éléments de départ et celui qui est ajouté.',
              correction: ['La liste de départ a ' + ecr(L.length) + ' éléments, et on en ajoute un : la liste devient ' + liste(r.recettes) + '.', 'À la fin, n vaut ' + ecr(r.n) + '.'],
            },
            {
              texte: 'Question 2. Que vaut total à la fin du programme ?',
              reponse: { type: 'nombre', valeur: r.total },
              aide: 'La boucle lit tous les éléments de la liste, y compris celui qui a été ajouté.',
              correction: [r.recettes.map(ecr).join(' + ') + ' = ' + ecr(r.total) + '.', 'À la fin, total vaut ' + ecr(r.total) + '.'],
            },
            {
              texte: 'Question 3. Le total dépasse-t-il l’objectif de ' + ecr(obj) + ' euros ? Réponds par Oui ou par Non.',
              reponse: O.choix(c.alea, depasse ? 'Oui' : 'Non', [depasse ? 'Non' : 'Oui']),
              aide: 'Compare ta réponse à la question précédente avec l’objectif.',
              correction: [ecr(r.total) + (depasse ? ' est plus grand que ' : ' n’est pas plus grand que ') + ecr(obj) + '. Réponse : ' + (depasse ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Explique en une ou deux phrases à quoi sert « pour chaque » pour calculer le total.',
              correction: ['« Pour chaque » lit les éléments de la liste un par un.', 'À chaque tour, l’élément lu est ajouté à total.'],
              grille: ['As-tu dit que le programme lit les éléments un par un ?', 'As-tu dit que chaque élément est ajouté à total ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais lire une liste élément par élément, la compter, y ajouter, et en faire le total.',
    carte: ['quelle-instruction', 'longueur-apres-ajout', 'somme-liste'],
    papierDuSoir: { exercices: ['somme-liste', 'moyenne-liste'], defi: true },
    automatismes: [
      {
        id: 'somme-rapide',
        versions: [[3, 5, 4], [6, 2, 7], [10, 5, 5], [8, 8, 1]],
        genere(c) { const [a, b, d] = c.alea.choisir(this.versions); return { enonce: 'Quelle est la somme de la liste ' + a + ', ' + b + ', ' + d + ' ?', reponse: { type: 'nombre', valeur: a + b + d } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, John McCarthy a inventé en 1958 le langage Lisp, abréviation de « traitement de listes ».',
    prenoms: ['Moussa', 'Rachel'],
  };
});
