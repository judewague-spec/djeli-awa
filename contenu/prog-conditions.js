/* Notion 3 du bloc de technologie « Programmer » : les conditions (si, alors, sinon). La veilleuse de l’atelier et le prix réduit.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const ecr = O.ecr;
  const image = (prog) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: 'Le programme, en blocs : ' + PB.enMots(prog) + '.' });
  const etat = (r) => (r.sorties.veilleuse ? 'Allumée' : 'Éteinte');
  const veilleuse = (seuil) => [{ si: { op: '<', g: { entree: 'lumière' }, d: seuil }, alors: [{ allumer: 'veilleuse' }], sinon: [{ eteindre: 'veilleuse' }] }];

  const PROG_ACCROCHE = veilleuse(30);

  return {
    id: 'prog-conditions',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'Les conditions',
    classe: 'cycle 4',
    univers: ['appareils', 'commerce'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur l’informatique et la programmation : écrire un programme qui choisit selon une situation.',

    accroche: {
      texte: 'La veilleuse de Moussa s’allume toute seule. Le soir, la nuit tombe dans l’atelier. ' +
        'Un capteur mesure la lumière. S’il fait sombre, la veilleuse s’allume. Sinon, elle reste éteinte. Un programme sait faire ce choix.',
      image: { dessin: 'programme', lignes: PB.lignes(PROG_ACCROCHE), description: 'Le programme de la veilleuse, en blocs : ' + PB.enMots(PROG_ACCROCHE) + '.' },
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: PROG_ACCROCHE,
      entrees: { lumière: 20 },
      choix: { lumière: [10, 50, 80] },
      essais: 2,
      consigne: 'Joue le programme. Puis change la lumière avec un bouton, et rejoue pour voir la veilleuse changer.',
    },

    decouverte: {
      texte: (c) => 'Regarde la ligne « si la lumière est plus petite que 30 » : c’est ' + c.mot('condition') + '. ' +
        'Si la lumière est plus petite, la veilleuse s’allume. Sinon, le programme suit les lignes après sinon. ' +
        'L’astuce : une seule question, et un seul chemin suivi.',
    },

    vocabulaire: {
      termes: {
        condition: { sesMots: 'la question à laquelle on répond par oui ou non', officiel: 'une condition', lesDeux: 'la question à laquelle on répond par oui ou non, que les informaticiens appellent une condition' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la question à laquelle on répond par oui ou non. Les informaticiens ont un mot à eux : je te le dirai la prochaine fois.',
        'Les informaticiens disent : une condition, pour la question à laquelle on répond par oui ou non.',
        'Tu connais le mot officiel : une condition décide quel chemin le programme suit.',
      ],
    },

    exercices: [
      {
        id: 'prix-reduit',
        univers: 'commerce',
        // [prix normal en euros, nombre d’achats à dépasser, prix réduit en euros, nombre d’achats du client]
        versions: [[20, 3, 15, 5], [20, 3, 15, 2], [30, 4, 24, 4], [12, 2, 9, 3], [40, 5, 32, 1]],
        genere(c) {
          const [p, s, red, a] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'prix', a: p }, { si: { op: '>', g: { entree: 'achats' }, d: s }, alors: [{ mettre: 'prix', a: red }] }];
          const r = PB.executer(prog, { achats: a });
          return {
            enonce: 'Voici le programme de la caisse de Moussa, avec des prix en euros : ' + PB.enMots(prog) + '. L’entrée achats vaut ' + ecr(a) + '. Que vaut prix à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r.vars.prix },
            aide: 'Regarde si la condition est vraie. Si oui, la ligne après alors est jouée. Sinon, rien ne change.',
            correction: ['Au départ, prix vaut ' + ecr(p) + '.',
              ecr(a) + ' > ' + ecr(s) + (a > s ? ' est vrai : la ligne après alors est jouée, et prix vaut ' + ecr(red) + '.' : ' est faux : la ligne après alors est sautée, et prix reste ' + ecr(p) + '.'),
              'À la fin, prix vaut ' + ecr(r.vars.prix) + '.'],
          };
        },
      },
      {
        id: 'veilleuse',
        univers: 'appareils',
        // [seuil de lumière, lumière mesurée]
        versions: [[30, 10], [30, 60], [40, 40], [50, 20], [25, 80], [35, 34]],
        genere(c) {
          const [s, l] = c.alea.choisir(this.versions);
          const prog = veilleuse(s);
          const r = PB.executer(prog, { lumière: l });
          const allumee = Boolean(r.sorties.veilleuse);
          return {
            enonce: 'Voici le programme de la veilleuse : ' + PB.enMots(prog) + '. L’entrée lumière vaut ' + ecr(l) + '. À la fin, la veilleuse est-elle allumée ou éteinte ?',
            image: image(prog),
            reponse: O.choix(c.alea, etat(r), [allumee ? 'Éteinte' : 'Allumée']),
            aide: 'Compare la lumière au nombre de la condition. Si la condition est vraie, on suit alors ; sinon, on suit sinon.',
            correction: [ecr(l) + ' < ' + ecr(s) + (allumee ? ' est vrai : le programme suit alors.' : ' est faux : le programme suit sinon.'),
              'Réponse : ' + etat(r) + '.'],
          };
        },
      },
      O.qcm('quel-chemin', 'appareils',
        [['5 > 3', 'Il fait les lignes après alors', '5 > 3 est vrai, donc le programme suit alors.'],
          ['2 > 7', 'Il fait les lignes après sinon', '2 > 7 est faux, donc le programme suit sinon.'],
          ['4 = 4', 'Il fait les lignes après alors', '4 = 4 est vrai, donc le programme suit alors.'],
          ['9 < 1', 'Il fait les lignes après sinon', '9 < 1 est faux, donc le programme suit sinon.']],
        (x) => 'Un programme contient « si ' + x + ' alors … sinon … ». Que fait l’ordinateur ?',
        ['Il fait les lignes après alors', 'Il fait les lignes après sinon', 'Il fait les deux chemins'],
        'Cherche d’abord si la condition est vraie ou fausse. Un seul chemin est suivi.'),
      {
        id: 'remise',
        univers: 'commerce',
        // [nombre d’articles du client]
        versions: [[6], [3], [1], [2], [8]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          const prog = [{ si: { op: '>', g: { entree: 'articles' }, d: 5 }, alors: [{ mettre: 'remise', a: 5 }],
            sinon: [{ si: { op: '>', g: { entree: 'articles' }, d: 2 }, alors: [{ mettre: 'remise', a: 2 }], sinon: [{ mettre: 'remise', a: 0 }] }] }];
          const r = PB.executer(prog, { articles: a }).vars.remise;
          return {
            enonce: 'Moussa fait une remise en euros selon le nombre d’articles : ' + PB.enMots(prog) + '. L’entrée articles vaut ' + ecr(a) + '. Que vaut remise à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'Teste la première condition. Si elle est fausse, passe à la condition du sinon.',
            correction: [ecr(a) + ' > 5 est ' + (a > 5 ? 'vrai : remise vaut 5.' : 'faux : on passe au sinon.'),
              ...(a > 5 ? [] : [ecr(a) + ' > 2 est ' + (a > 2 ? 'vrai : remise vaut 2.' : 'faux : remise vaut 0.')]),
              'À la fin, remise vaut ' + ecr(r) + '.'],
          };
        },
      },
      {
        id: 'points',
        univers: 'dehors',
        // [a, b, c, d] : premier test a > b, second test c > d
        versions: [[5, 3, 2, 4], [3, 5, 6, 1], [8, 2, 9, 3], [1, 4, 2, 6], [6, 6, 5, 1]],
        genere(c) {
          const [a, b, d, e] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'points', a: 0 }, { si: { op: '>', g: a, d: b }, alors: [{ ajouter: 'points', a: 1 }] }, { si: { op: '>', g: d, d: e }, alors: [{ ajouter: 'points', a: 2 }] }];
          const r = PB.executer(prog).vars.points;
          return {
            enonce: 'Rachel marque des points avec ce programme : ' + PB.enMots(prog) + '. Que vaut points à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'Il y a deux conditions séparées. Examine-les l’une après l’autre.',
            correction: [ecr(a) + ' > ' + ecr(b) + (a > b ? ' est vrai : points gagne 1.' : ' est faux : points ne change pas.'),
              ecr(d) + ' > ' + ecr(e) + (d > e ? ' est vrai : points gagne 2.' : ' est faux : points ne change pas.'),
              'À la fin, points vaut ' + ecr(r) + '.'],
          };
        },
      },
    ],

    defi: {
      // [seuil de lumière, lumière mesurée, clients à dépasser, clients présents, prix normal, prix réduit, nouvelle lumière]
      versions: [[30, 20, 5, 8, 10, 8, 50], [30, 45, 5, 3, 10, 8, 25], [40, 10, 4, 6, 12, 9, 35], [25, 60, 6, 2, 14, 11, 80]],
      genere(c) {
        const [s, l, n, k, p, red, l2] = c.alea.choisir(this.versions);
        const prog = [{ si: { op: '<', g: { entree: 'lumière' }, d: s }, alors: [{ allumer: 'veilleuse' }], sinon: [{ eteindre: 'veilleuse' }] },
          { si: { op: '>', g: { entree: 'clients' }, d: n }, alors: [{ mettre: 'prix', a: red }], sinon: [{ mettre: 'prix', a: p }] }];
        const r = PB.executer(prog, { lumière: l, clients: k });
        const r2 = PB.executer(prog, { lumière: l2, clients: k });
        const change = Boolean(r.sorties.veilleuse) !== Boolean(r2.sorties.veilleuse);
        const nom = (x) => (x.sorties.veilleuse ? 'Allumée' : 'Éteinte');
        return {
          enonce: 'Dans son atelier, Moussa règle sa veilleuse et le prix des piles, en euros, avec un seul programme. Voici son programme : ' + PB.enMots(prog) + '. L’entrée lumière vaut ' + ecr(l) + ' et l’entrée clients vaut ' + ecr(k) + '.',
          image: image(prog),
          questions: [
            {
              texte: 'Question 1. À la fin du programme, la veilleuse est-elle allumée ou éteinte ?',
              reponse: O.choix(c.alea, nom(r), [nom(r) === 'Allumée' ? 'Éteinte' : 'Allumée']),
              aide: 'Compare la lumière au nombre de la première condition.',
              correction: [ecr(l) + ' < ' + ecr(s) + (l < s ? ' est vrai : le programme suit alors.' : ' est faux : le programme suit sinon.'), 'Réponse : ' + nom(r) + '.'],
            },
            {
              texte: 'Question 2. Que vaut prix à la fin du programme ?',
              reponse: { type: 'nombre', valeur: r.vars.prix },
              aide: 'Compare le nombre de clients au nombre de la seconde condition.',
              correction: [ecr(k) + ' > ' + ecr(n) + (k > n ? ' est vrai : prix vaut ' + ecr(red) + '.' : ' est faux : prix vaut ' + ecr(p) + '.')],
            },
            {
              texte: 'Question 3. Si la lumière valait ' + ecr(l2) + ' au lieu de ' + ecr(l) + ', l’état de la veilleuse à la fin serait-il différent ? Réponds par Oui ou par Non.',
              reponse: O.choix(c.alea, change ? 'Oui' : 'Non', [change ? 'Non' : 'Oui']),
              aide: 'Refais la première condition avec la nouvelle lumière, puis compare avec ta réponse à la première question.',
              correction: [ecr(l2) + ' < ' + ecr(s) + (l2 < s ? ' est vrai : la veilleuse serait allumée.' : ' est faux : la veilleuse serait éteinte.'),
                change ? 'Ce n’est pas le même état qu’avant. Réponse : Oui.' : 'C’est le même état qu’avant. Réponse : Non.'],
            },
            {
              texte: 'Question 4. Explique en une ou deux phrases à quoi sert « sinon » dans la ligne qui règle le prix.',
              correction: ['Sans « sinon », prix ne serait pas réglé quand la condition est fausse.', 'Avec « sinon », il y a un prix pour chacun des deux cas.'],
              grille: ['As-tu dit que sinon donne la suite quand la condition est fausse ?', 'As-tu dit que prix reçoit alors l’autre valeur ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais écrire une condition, et suivre le chemin que le programme choisit.',
    carte: ['quel-chemin', 'veilleuse', 'prix-reduit'],
    papierDuSoir: { exercices: ['prix-reduit', 'remise'], defi: true },
    automatismes: [
      {
        id: 'plus-grand-que',
        versions: [[7, 4], [3, 9], [12, 12], [5, 2]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Le programme teste ' + a + ' > ' + b + '. Réponds 1 s’il suit alors, et 0 s’il suit sinon.', reponse: { type: 'nombre', valeur: a > b ? 1 : 0 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Chez les Ekang, les Beti-Fang du Cameroun, on joue au songo. On capture si la dernière graine tombe chez l’adversaire, dans une case d’une ou deux graines.',
    prenoms: ['Moussa', 'Rachel'],
  };
});
