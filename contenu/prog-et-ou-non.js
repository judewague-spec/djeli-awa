/* Notion 4 du bloc de technologie « Programmer » : ET, OU, NON. La lampe et l’alarme de l’atelier de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const ecr = O.ecr;
  const image = (prog) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: 'Le programme, en blocs : ' + PB.enMots(prog) + '.' });
  const vf = (b) => (b ? 'Vrai' : 'Faux');
  // « x > s » écrit en données
  const plus = (v, s) => ({ op: '>', g: { v }, d: s });
  const moins = (v, s) => ({ op: '<', g: { v }, d: s });
  const alarme = (op) => [{ si: { op, g: { op: '=', g: { entree: 'porte' }, d: 0 }, d: { op: '=', g: { entree: 'fenêtre' }, d: 0 } }, alors: [{ allumer: 'alarme' }], sinon: [{ eteindre: 'alarme' }] }];
  const sonne = (r) => (r.sorties.alarme ? 'Elle sonne' : 'Elle reste muette');

  const PROG_ACCROCHE = [{ si: { op: 'et', g: { op: '=', g: { entree: 'porte' }, d: 1 }, d: { op: '=', g: { entree: 'clients' }, d: 0 } }, alors: [{ eteindre: 'lampe' }], sinon: [{ allumer: 'lampe' }] }];

  return {
    id: 'prog-et-ou-non',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'ET, OU, NON',
    classe: 'cycle 4',
    univers: ['appareils', 'commerce'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur l’informatique et la programmation : conditions à deux questions.',

    accroche: {
      texte: 'Moussa ferme l’atelier chaque soir. Il éteint la lampe seulement si la porte est fermée et si le dernier client est parti. ' +
        'Si une seule chose manque, la lampe reste allumée. Pour l’alarme, une seule suffit : la porte ouverte, ou la fenêtre ouverte. Un programme sait relier deux questions.',
      image: { dessin: 'programme', lignes: PB.lignes(PROG_ACCROCHE), description: 'Le programme de la lampe, en blocs : ' + PB.enMots(PROG_ACCROCHE) + '.' },
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: PROG_ACCROCHE,
      entrees: { porte: 1, clients: 0 },
      choix: { porte: [0, 1], clients: [0, 2] },
      essais: 2,
      consigne: 'La porte vaut 1 quand elle est fermée. Joue le programme, change un réglage, rejoue, et regarde quand la lampe s’éteint.',
    },

    decouverte: {
      texte: (c) => 'Regarde les mots et, ou, non dans les programmes : ce sont ' + c.mot('logique') + '. ' +
        'Avec et, les deux réponses doivent être oui. Avec ou, une seule réponse oui suffit. Avec non, la réponse est renversée. ' +
        'Dans la table du mot et, vrai et vrai donne vrai, et tous les autres cas donnent faux. ' +
        'L’astuce : et est strict, ou est large, non retourne.',
    },

    vocabulaire: {
      termes: {
        logique: { sesMots: 'des petits mots qui relient ou renversent des réponses', officiel: 'des opérateurs logiques', lesDeux: 'des petits mots qui relient ou renversent des réponses, que les informaticiens appellent des opérateurs logiques' },
      },
      textes: [
        'Pour l’instant, garde tes mots : des petits mots qui relient ou renversent des réponses. Les informaticiens ont un mot à eux : je te le dirai la prochaine fois.',
        'Les informaticiens disent : des opérateurs logiques, pour les petits mots qui relient ou renversent des réponses.',
        'Tu connais le mot officiel : les opérateurs logiques et, ou, non relient ou renversent des conditions.',
      ],
    },

    exercices: [
      {
        id: 'et-deux-conditions',
        univers: 'appareils',
        // [premier nombre, second nombre, seuil du premier, seuil du second]
        versions: [[7, 8, 5, 10], [7, 12, 5, 10], [3, 8, 5, 10], [20, 4, 15, 6], [20, 9, 15, 6], [12, 4, 15, 6]],
        genere(c) {
          const [a, b, s, t] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'x', a }, { mettre: 'y', a: b }, { mettre: 'ok', a: { op: 'et', g: plus('x', s), d: moins('y', t) } }];
          const r = PB.executer(prog).vars.ok;
          const p1 = a > s, p2 = b < t;
          return {
            enonce: 'Voici un programme : ' + PB.enMots(prog) + '. Que vaut ok à la fin : vrai ou faux ?',
            image: image(prog),
            reponse: O.choix(c.alea, vf(r), [vf(!r)]),
            aide: 'Avec et, les deux comparaisons doivent être vraies. Examine-les l’une après l’autre.',
            correction: [ecr(a) + ' > ' + ecr(s) + ' est ' + vf(p1).toLowerCase() + '.', ecr(b) + ' < ' + ecr(t) + ' est ' + vf(p2).toLowerCase() + '.',
              'Avec et, il faut deux fois vrai. Réponse : ' + vf(r) + '.'],
          };
        },
      },
      {
        id: 'ou-deux-conditions',
        univers: 'maison-courses',
        // [premier nombre, second nombre, seuil du premier, seuil du second]
        versions: [[2, 3, 5, 10], [8, 3, 5, 10], [8, 12, 5, 10], [9, 9, 10, 20], [15, 9, 10, 20], [15, 25, 10, 20]],
        genere(c) {
          const [a, b, s, t] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'x', a }, { mettre: 'y', a: b }, { mettre: 'ok', a: { op: 'ou', g: moins('x', s), d: plus('y', t) } }];
          const r = PB.executer(prog).vars.ok;
          const p1 = a < s, p2 = b > t;
          return {
            enonce: 'Voici un programme : ' + PB.enMots(prog) + '. Que vaut ok à la fin : vrai ou faux ?',
            image: image(prog),
            reponse: O.choix(c.alea, vf(r), [vf(!r)]),
            aide: 'Avec ou, il suffit qu’une seule comparaison soit vraie. Examine-les l’une après l’autre.',
            correction: [ecr(a) + ' < ' + ecr(s) + ' est ' + vf(p1).toLowerCase() + '.', ecr(b) + ' > ' + ecr(t) + ' est ' + vf(p2).toLowerCase() + '.',
              r ? 'Avec ou, une seule suffit. Réponse : Vrai.' : 'Avec ou, il faut au moins un vrai, et il n’y en a aucun. Réponse : Faux.'],
          };
        },
      },
      {
        id: 'non-renverse',
        univers: 'dehors',
        // [nombre, seuil]
        versions: [[5, 3], [2, 3], [4, 4], [9, 10], [11, 10], [7, 2]],
        genere(c) {
          const [a, s] = c.alea.choisir(this.versions);
          const prog = [{ mettre: 'x', a }, { mettre: 'ok', a: { non: plus('x', s) } }];
          const r = PB.executer(prog).vars.ok;
          const p = a > s;
          return {
            enonce: 'Voici un programme : ' + PB.enMots(prog) + '. Que vaut ok à la fin : vrai ou faux ?',
            image: image(prog),
            reponse: O.choix(c.alea, vf(r), [vf(!r)]),
            aide: 'Calcule d’abord ce qui est entre parenthèses. Puis renverse la réponse avec non.',
            correction: [ecr(a) + ' > ' + ecr(s) + ' est ' + vf(p).toLowerCase() + '.', 'Non renverse : ' + vf(p).toLowerCase() + ' devient ' + vf(r).toLowerCase() + '. Réponse : ' + vf(r) + '.'],
          };
        },
      },
      O.qcm('quel-mot', 'appareils',
        [['Le portail s’ouvre seulement quand les deux sont vrais : la clé est tournée, le code est bon.', 'et', 'Il faut les deux réponses oui : c’est le mot et.'],
          ['La sirène sonne dès qu’une seule des deux choses arrive : la porte s’ouvre, la fenêtre s’ouvre.', 'ou', 'Une seule réponse oui suffit : c’est le mot ou.'],
          ['La lampe s’allume quand il ne fait pas clair.', 'non', 'On renverse la réponse « il fait clair » : c’est le mot non.'],
          ['Le chauffage démarre si l’une des deux pièces est froide : le salon, la cuisine.', 'ou', 'Une seule pièce froide suffit : c’est le mot ou.'],
          ['Le ticket s’imprime seulement si les deux sont vrais : la machine est prête, le papier est là.', 'et', 'Il faut les deux réponses oui : c’est le mot et.']],
        (x) => 'Quel petit mot faut-il écrire dans le programme pour dire ceci ? « ' + x + ' »',
        ['et', 'ou', 'non'],
        'Il faut les deux : et. Une seule suffit : ou. On renverse : non.'),
      {
        id: 'tarif-reduit',
        univers: 'commerce',
        // [prix normal en euros, prix réduit en euros, âge du client]
        versions: [[10, 6, 8], [10, 6, 30], [10, 6, 70], [12, 7, 65], [12, 7, 12]],
        genere(c) {
          const [p, red, âge] = c.alea.choisir(this.versions);
          const prog = [{ si: { op: 'ou', g: { op: '<', g: { entree: 'âge' }, d: 12 }, d: { op: '>', g: { entree: 'âge' }, d: 65 } }, alors: [{ mettre: 'prix', a: red }], sinon: [{ mettre: 'prix', a: p }] }];
          const r = PB.executer(prog, { âge }).vars.prix;
          const enfant = âge < 12, aine = âge > 65;
          return {
            enonce: 'Voici le programme de la caisse de l’atelier de réparation de vélos, avec des prix en euros : ' + PB.enMots(prog) + '. L’entrée âge vaut ' + ecr(âge) + '. Que vaut prix à la fin ?',
            image: image(prog),
            reponse: { type: 'nombre', valeur: r },
            aide: 'Avec ou, il suffit qu’une des deux comparaisons soit vraie pour suivre alors.',
            correction: [ecr(âge) + ' < 12 est ' + vf(enfant).toLowerCase() + '.', ecr(âge) + ' > 65 est ' + vf(aine).toLowerCase() + '.',
              enfant || aine ? 'Au moins une est vraie : le programme suit alors, et prix vaut ' + ecr(red) + '.' : 'Aucune n’est vraie : le programme suit sinon, et prix vaut ' + ecr(p) + '.'],
          };
        },
      },
    ],

    defi: {
      // [porte, fenêtre pour les questions 1 et 3 ; porte, fenêtre pour la question 2] ; 0 : ouverte, 1 : fermée
      versions: [[0, 1, 1, 1], [0, 0, 1, 0], [1, 1, 0, 1], [1, 0, 1, 1], [0, 0, 0, 1]],
      genere(c) {
        const [p1, f1, p2, f2] = c.alea.choisir(this.versions);
        const prog = alarme('ou');
        const r1 = PB.executer(prog, { porte: p1, fenêtre: f1 });
        const r2 = PB.executer(prog, { porte: p2, fenêtre: f2 });
        const r3 = PB.executer(alarme('et'), { porte: p1, fenêtre: f1 });
        const oui = Boolean(r3.sorties.alarme);
        const etat = (p, f) => 'la porte vaut ' + ecr(p) + ' et la fenêtre vaut ' + ecr(f);
        const nom = (p) => (p === 0 ? 'ouverte' : 'fermée');
        return {
          enonce: 'L’alarme de l’atelier de Moussa sonne avec ce programme : ' + PB.enMots(prog) + '. Les entrées valent 0 quand la porte ou la fenêtre est ouverte, et 1 quand chacune est fermée.',
          image: image(prog),
          questions: [
            {
              texte: 'Question 1. La porte vaut ' + ecr(p1) + ' et la fenêtre vaut ' + ecr(f1) + '. Que fait l’alarme à la fin du programme ?',
              reponse: O.choix(c.alea, sonne(r1), [r1.sorties.alarme ? 'Elle reste muette' : 'Elle sonne']),
              aide: 'Regarde si la porte vaut zéro, puis si la fenêtre vaut zéro. Avec ou, une seule réponse oui suffit.',
              correction: ['Porte ' + nom(p1) + ' : la comparaison rend ' + vf(p1 === 0).toLowerCase() + '. Fenêtre ' + nom(f1) + ' : la comparaison rend ' + vf(f1 === 0).toLowerCase() + '.', 'Réponse : ' + sonne(r1) + '.'],
            },
            {
              texte: 'Question 2. Maintenant, ' + etat(p2, f2) + '. Que fait l’alarme à la fin du programme ?',
              reponse: O.choix(c.alea, sonne(r2), [r2.sorties.alarme ? 'Elle reste muette' : 'Elle sonne']),
              aide: 'Même méthode : une seule ouverture suffit à faire sonner l’alarme.',
              correction: ['Porte ' + nom(p2) + ' : la comparaison rend ' + vf(p2 === 0).toLowerCase() + '. Fenêtre ' + nom(f2) + ' : la comparaison rend ' + vf(f2 === 0).toLowerCase() + '.', 'Réponse : ' + sonne(r2) + '.'],
            },
            {
              texte: 'Question 3. Moussa remplace ou par et. Avec ' + etat(p1, f1) + ', l’alarme sonnerait-elle ? Réponds par Oui ou par Non.',
              reponse: O.choix(c.alea, oui ? 'Oui' : 'Non', [oui ? 'Non' : 'Oui']),
              aide: 'Avec et, la porte et la fenêtre doivent être ouvertes toutes les deux.',
              correction: [oui ? 'Les deux sont ouvertes : avec et, l’alarme sonnerait. Réponse : Oui.' : 'Une seule est ouverte, ou aucune : avec et, l’alarme ne sonnerait pas. Réponse : Non.'],
            },
            {
              texte: 'Question 4. Explique en une ou deux phrases pourquoi ou fait sonner l’alarme plus souvent que et.',
              correction: ['Avec ou, une seule ouverture suffit.', 'Avec et, il faut deux ouvertures en même temps.'],
              grille: ['As-tu dit qu’avec ou, une seule ouverture suffit ?', 'As-tu dit qu’avec et, il faut les deux ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais relier deux questions avec et, avec ou, et renverser une réponse avec non.',
    carte: ['quel-mot', 'et-deux-conditions', 'ou-deux-conditions'],
    papierDuSoir: { exercices: ['et-deux-conditions', 'tarif-reduit'], defi: true },
    automatismes: [
      {
        id: 'table-en-mots',
        // [mot, première réponse, seconde réponse]
        versions: [['et', 'vrai', 'faux'], ['ou', 'vrai', 'faux'], ['et', 'vrai', 'vrai'], ['ou', 'faux', 'faux']],
        genere(c) {
          const [m, a, b] = c.alea.choisir(this.versions);
          const va = a === 'vrai', vb = b === 'vrai';
          const r = m === 'et' ? va && vb : va || vb;
          return { enonce: m === 'et' ? a + ' et ' + b + ' : réponds 1 si c’est vrai, 0 si c’est faux.' : a + ' ou ' + b + ' : réponds 1 si c’est vrai, 0 si c’est faux.', reponse: { type: 'nombre', valeur: r ? 1 : 0 } };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? En Grèce antique, les stoïciens ont étudié les phrases reliées par « et » ou « soit », et les phrases niées.',
    prenoms: ['Moussa'],
  };
});
