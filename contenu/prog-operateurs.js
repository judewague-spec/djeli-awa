/* Notion 2 du bloc de technologie « Programmer » : les opérateurs (calculs et comparaisons). La recette de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const ecr = O.ecr;
  const image = (prog) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: 'Le programme, en blocs : ' + PB.enMots(prog) + '.' });
  const pas = (prog, nom) => PB.executer(prog).trace.filter((t) => nom in t.vars).map((t) => 'Ligne « ' + t.texte + ' » : ' + nom + ' vaut ' + ecr(t.vars[nom]) + '.');
  const vf = (b) => (b ? 'Vrai' : 'Faux');

  const PROG_ACCROCHE = [{ mettre: 'prix', a: 15 }, { mettre: 'radios', a: 3 }, { mettre: 'recette', a: { op: '×', g: { v: 'prix' }, d: { v: 'radios' } } }, { mettre: 'assez', a: { op: '>', g: { v: 'recette' }, d: 40 } }];

  return {
    id: 'prog-operateurs',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'Les opérateurs',
    classe: 'cycle 4',
    univers: ['commerce', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur l’informatique et la programmation : calculs et comparaisons dans un programme.',

    accroche: {
      texte: 'Moussa calcule sa recette de la journée. Il répare des radios, toutes au même prix. ' +
        'Pour la recette, il multiplie le prix par le nombre de radios. Pour savoir s’il peut payer le loyer, il regarde si la recette est assez grande. Un programme sait faire les deux.',
      image: { dessin: 'programme', lignes: PB.lignes(PROG_ACCROCHE), description: 'Le programme de Moussa, en blocs : ' + PB.enMots(PROG_ACCROCHE) + '.' },
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: PROG_ACCROCHE,
      entrees: {},
      choix: {},
      essais: 1,
      consigne: 'Joue le programme ligne par ligne. Écoute le calcul, puis regarde si assez vaut vrai ou faux.',
    },

    decouverte: {
      texte: (c) => 'Regarde le signe × dans la ligne qui calcule la recette : c’est ' + c.mot('operateur') + '. Il donne un nombre. ' +
        'Regarde maintenant 8 > 5 : c’est ' + c.mot('comparaison') + '. Elle répond par vrai ou par faux. Ici, c’est vrai. Mais 3 = 4 est faux. ' +
        'L’astuce : un calcul rend un nombre, une question sur deux nombres rend vrai ou faux.',
    },

    vocabulaire: {
      termes: {
        operateur: { sesMots: 'le signe qui calcule', officiel: 'un opérateur', lesDeux: 'le signe qui calcule, que les informaticiens appellent un opérateur' },
        comparaison: { sesMots: 'une question sur deux nombres', officiel: 'une comparaison', lesDeux: 'une question sur deux nombres, que les informaticiens appellent une comparaison' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le signe qui calcule, et la question sur deux nombres. Les informaticiens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les informaticiens disent : un opérateur, pour le signe qui calcule ; une comparaison, pour la question sur deux nombres.',
        'Tu connais les mots officiels : un opérateur calcule un nombre, une comparaison répond vrai ou faux.',
      ],
    },

    exercices: [
      {
        id: 'recette',
        univers: 'commerce',
        // [prix d’une réparation en euros, nombre de réparations]
        versions: [[15, 3], [12, 4], [8, 6], [20, 5], [9, 7]],
        genere(c) {
          const [p, n] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'prix', a: p }, { mettre: 'réparations', a: n }, { mettre: 'recette', a: { op: '×', g: { v: 'prix' }, d: { v: 'réparations' } } }];
          const r = PB.executer(prog).vars.recette;
          return {
            enonce: 'Moussa calcule sa recette en euros avec ce programme : ' + PB.enMots(prog) + '. Que vaut recette à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'Le signe × multiplie la boîte prix par la boîte réparations.',
            correction: pas(prog, 'recette').concat([ecr(p) + ' × ' + ecr(n) + ' = ' + ecr(r) + '. À la fin, recette vaut ' + ecr(r) + '.']),
          };
        },
      },
      {
        id: 'partage',
        univers: 'maison-courses',
        // [recette à partager en euros, nombre de parts]
        versions: [[24, 4], [30, 5], [45, 9], [36, 6], [28, 7]],
        genere(c) {
          const [t, k] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'total', a: t }, { mettre: 'parts', a: k }, { mettre: 'chacun', a: { op: '÷', g: { v: 'total' }, d: { v: 'parts' } } }];
          const r = PB.executer(prog).vars.chacun;
          return {
            enonce: 'Moussa partage une somme en euros avec ce programme : ' + PB.enMots(prog) + '. Que vaut chacun à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'Le signe ÷ partage la boîte total en autant de parts que la boîte parts.',
            correction: [ecr(t) + ' ÷ ' + ecr(k) + ' = ' + ecr(r) + '.', 'À la fin, chacun vaut ' + ecr(r) + '.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'appareils',
        // [premier nombre, signe de comparaison, second nombre]
        versions: [[12, '>', 15], [15, '>', 12], [8, '<', 20], [20, '<', 8], [9, '=', 9], [9, '=', 7]],
        genere(c) {
          const [a, o, b] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'r', a: { op: o, g: a, d: b } }];
          const res = PB.executer(prog).vars.r;
          const raison = o === '=' ? (res ? 'Les deux nombres sont égaux.' : 'Les deux nombres sont différents.')
            : o === '>' ? (res ? ecr(a) + ' est plus grand que ' + ecr(b) + '.' : ecr(a) + ' est plus petit que ' + ecr(b) + '.')
              : (res ? ecr(a) + ' est plus petit que ' + ecr(b) + '.' : ecr(a) + ' est plus grand que ' + ecr(b) + '.');
          return {
            enonce: 'Dans un programme, la ligne « ' + PB.entete(prog[0]) + ' » est jouée. La comparaison ' + ecr(a) + ' ' + o + ' ' + ecr(b) + ' rend-elle vrai ou faux ?',
            reponse: O.choix(c.alea, vf(res), [vf(!res)]),
            aide: 'Le signe > veut dire « plus grand que », le signe < « plus petit que », le signe = « égal à ».',
            correction: [raison, 'La comparaison ' + ecr(a) + ' ' + o + ' ' + ecr(b) + ' rend donc ' + vf(res).toLowerCase() + '. Réponse : ' + vf(res) + '.'],
          };
        },
      },
      {
        id: 'assez-pour-le-loyer',
        univers: 'commerce',
        // [prix d’une réparation, nombre de réparations, loyer en euros]
        versions: [[15, 3, 40], [12, 4, 50], [8, 6, 40], [20, 2, 45], [9, 7, 63]],
        genere(c) {
          const [p, n, loyer] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'recette', a: { op: '×', g: p, d: n } }, { mettre: 'loyer', a: loyer }, { mettre: 'assez', a: { op: '>', g: { v: 'recette' }, d: { v: 'loyer' } } }];
          const r = PB.executer(prog).vars;
          return {
            enonce: 'Moussa vérifie sa recette en euros avec ce programme : ' + PB.enMots(prog) + '. Que vaut assez à la fin : vrai ou faux ?',
            image: image(prog),
            reponse: O.choix(c.alea, vf(r.assez), [vf(!r.assez)]),
            aide: 'Calcule d’abord la recette. Puis compare-la au loyer avec le signe >.',
            correction: [ecr(p) + ' × ' + ecr(n) + ' = ' + ecr(r.recette) + ', donc recette vaut ' + ecr(r.recette) + '.',
              r.assez ? ecr(r.recette) + ' est plus grand que ' + ecr(loyer) + '.' : ecr(r.recette) + ' n’est pas plus grand que ' + ecr(loyer) + '.',
              'À la fin, assez vaut ' + vf(r.assez).toLowerCase() + '. Réponse : ' + vf(r.assez) + '.'],
          };
        },
      },
      {
        id: 'deux-calculs',
        univers: 'appareils',
        // [nombre de départ, nombre retiré, nombre de parts]
        versions: [[20, 8, 3], [30, 10, 5], [17, 5, 4], [50, 14, 6], [25, 7, 6]],
        genere(c) {
          const [a, b, k] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'x', a: { op: '−', g: a, d: b } }, { mettre: 'y', a: { op: '÷', g: { v: 'x' }, d: k } }];
          const r = PB.executer(prog).vars;
          return {
            enonce: 'Voici un programme : ' + PB.enMots(prog) + '. Que vaut y à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r.y },
            aide: 'Fais le premier calcul, range-le dans x, puis utilise x pour le second calcul.',
            correction: [ecr(a) + ' − ' + ecr(b) + ' = ' + ecr(r.x) + ', donc x vaut ' + ecr(r.x) + '.', ecr(r.x) + ' ÷ ' + ecr(k) + ' = ' + ecr(r.y) + ', donc y vaut ' + ecr(r.y) + '.'],
          };
        },
      },
    ],

    defi: {
      // [prix d’une réparation, nombre de réparations, dépenses en euros, objectif de gain en euros]
      versions: [[15, 6, 40, 45], [12, 5, 35, 30], [20, 4, 30, 40], [10, 8, 50, 35]],
      genere(c) {
        const [p, n, d, obj] = c.alea.choisir(this.versions);
        const prog = [{ mettre: 'prix', a: p }, { mettre: 'nombre', a: n }, { mettre: 'recette', a: { op: '×', g: { v: 'prix' }, d: { v: 'nombre' } } },
          { mettre: 'dépenses', a: d }, { mettre: 'gain', a: { op: '−', g: { v: 'recette' }, d: { v: 'dépenses' } } }, { mettre: 'objectif', a: obj },
          { mettre: 'réussi', a: { op: '>', g: { v: 'gain' }, d: { v: 'objectif' } } }];
        const r = PB.executer(prog).vars;
        return {
          enonce: 'Moussa fait le bilan de sa semaine, en euros, avec un programme. Il répare des radios, déduit ses dépenses, puis regarde s’il atteint son objectif. Voici son programme : ' + PB.enMots(prog) + '.',
          image: image(prog),
          questions: [
            {
              texte: 'Question 1. Que vaut recette à la fin du programme ?',
              reponse: { type: 'nombre', valeur: r.recette },
              aide: 'La recette est le prix multiplié par le nombre de réparations.',
              correction: [ecr(p) + ' × ' + ecr(n) + ' = ' + ecr(r.recette) + '. La recette vaut ' + ecr(r.recette) + ' euros.'],
            },
            {
              texte: 'Question 2. Que vaut gain à la fin du programme ?',
              reponse: { type: 'nombre', valeur: r.gain },
              aide: 'Le gain est la recette moins les dépenses.',
              correction: [ecr(r.recette) + ' − ' + ecr(d) + ' = ' + ecr(r.gain) + '. Le gain vaut ' + ecr(r.gain) + ' euros.'],
            },
            {
              texte: 'Question 3. Moussa atteint-il son objectif, c’est-à-dire réussi vaut-il vrai ? Réponds par Oui ou par Non.',
              reponse: O.choix(c.alea, r.réussi ? 'Oui' : 'Non', [r.réussi ? 'Non' : 'Oui']),
              aide: 'Compare le gain à l’objectif avec le signe >.',
              correction: [r.réussi ? ecr(r.gain) + ' est plus grand que ' + ecr(obj) + '. Réponse : Oui.' : ecr(r.gain) + ' n’est pas plus grand que ' + ecr(obj) + '. Réponse : Non.'],
            },
            {
              texte: 'Question 4. Explique en une ou deux phrases pourquoi la ligne qui remplit réussi donne vrai ou faux, et pas un nombre.',
              correction: ['Le signe > est une comparaison : il pose une question sur deux nombres.', 'La réponse à une question comme celle-là est vrai ou faux, pas un nombre.'],
              grille: ['As-tu dit que > est une comparaison ou une question sur deux nombres ?', 'As-tu dit que la réponse est vrai ou faux ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais calculer avec un opérateur, et répondre vrai ou faux avec une comparaison.',
    carte: ['vrai-ou-faux', 'assez-pour-le-loyer', 'deux-calculs'],
    papierDuSoir: { exercices: ['recette', 'deux-calculs'], defi: true },
    automatismes: [
      {
        id: 'produit-rapide',
        versions: [[6, 4], [5, 7], [9, 3], [8, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Chez les Yoruba, au Nigeria, huit noix de palme, ouvertes ou fermées, donnent 256 résultats dans l’Ifá.',
    prenoms: ['Moussa'],
  };
});
