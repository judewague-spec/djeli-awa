/* Notion 15 du bloc SVT « Le vivant et son évolution » : la parenté et la classification. La basse-cour de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const VERT = 'Les vertébrés', TETRA = 'Les tétrapodes', MAM = 'Les mammifères';

  return {
    id: 'parente-classification',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'La parenté et la classification',
    classe: 'cycle 4',
    univers: ['champetre', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : parenté entre les êtres vivants, classification par groupes emboîtés fondée sur des caractères partagés.',

    accroche: {
      texte: 'Au potager, Moussa voit passer une poule, le chat, une grenouille et un escargot. La poule et la grenouille n’ont pas la même peau. Le chat a des poils, comme lui. ' +
        'Qui est le plus proche de qui ? Pour le savoir, on ne regarde pas où ils vivent, mais ce qu’ils ont en commun.',
      image: { dessin: 'parente', description: 'Des boîtes emboîtées. Les vertébrés contiennent le poisson et les tétrapodes. Les tétrapodes contiennent la grenouille, la poule et les mammifères. Les mammifères contiennent le chat et l’être humain. L’escargot reste à part.' },
    },

    manipulation: {
      type: 'parente',
      consigne: 'Pour chaque point commun, choisis tous les animaux qui le possèdent, puis valide. Ton arbre de parenté se construit, boîte après boîte.',
    },

    decouverte: {
      texte: (c) => 'Pour classer les êtres vivants, on cherche ' + c.mot('caracteres') + '. Tous ceux qui ont le même forment un groupe. Les groupes s’emboîtent, comme des boîtes : on parle de ' + c.mot('groupes') + '. ' +
        'Plus deux espèces partagent de points communs, plus elles sont proches parentes. ' +
        'L’astuce : on classe sur ce que les êtres ont, jamais sur ce qu’ils n’ont pas.',
    },

    vocabulaire: {
      termes: {
        caracteres: { sesMots: 'leurs points communs', officiel: 'leurs caractères partagés', lesDeux: 'leurs points communs, que les scientifiques appellent des caractères partagés' },
        groupes: { sesMots: 'boîtes dans des boîtes', officiel: 'groupes emboîtés', lesDeux: 'boîtes dans des boîtes, que les scientifiques appellent des groupes emboîtés' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les points communs, et les boîtes dans des boîtes. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : des caractères partagés, et des groupes emboîtés. Ces groupes montrent une parenté, c’est-à-dire un ancêtre commun.',
        'Tu connais les mots officiels : le caractère partagé, le groupe emboîté, la parenté et l’ancêtre commun.',
      ],
    },

    exercices: [
      O.qcm('quel-groupe', 'champetre',
        [['Un squelette avec une colonne vertébrale', VERT], ['Quatre membres', TETRA], ['Des poils et des mamelles', MAM]].map((v) => [v[0], v[1], 'La colonne vertébrale définit les vertébrés, les quatre membres les tétrapodes, les poils et les mamelles les mammifères.']),
        (x) => x + ' : quel groupe ce caractère définit-il ?', [VERT, TETRA, MAM],
        'Du plus large au plus précis : vertébrés, tétrapodes, mammifères.'),
      O.qcm('qui-est-le-plus-proche', 'famille',
        [['Le chat est plus proche de qui ?', 'L’être humain : ils ont des poils et des mamelles'], ['Avec le chat, qui partage le plus de caractères ?', 'L’être humain : ils ont des poils et des mamelles']].map((v) => [v[0], v[1], 'Le chat et l’être humain partagent les trois caractères : ils sont tous deux mammifères. L’endroit où l’on vit ne compte pas.']),
        (x) => x, ['L’être humain : ils ont des poils et des mamelles', 'La poule : elle vit dans la même cour', 'L’escargot : il passe sur le même chemin'],
        'On regarde les caractères partagés, pas l’endroit où ils vivent.'),
      O.qcm('vrai-ou-faux', 'champetre',
        [['On classe les êtres vivants selon leurs caractères partagés.', 'Vrai'], ['On classe la baleine avec les poissons, car elle vit dans l’eau.', 'Faux'], ['Tous les mammifères sont aussi des vertébrés.', 'Vrai'], ['L’escargot est un vertébré.', 'Faux']].map((v) => [v[0], v[1], 'On classe selon les caractères partagés, pas le lieu de vie : la baleine est un mammifère, et l’escargot n’a pas de colonne vertébrale.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Ce sont les caractères qui comptent, pas le lieu de vie.'),
      {
        id: 'combien-de-vertebres',
        univers: 'champetre',
        // [animaux du potager, animaux sans colonne vertébrale]
        versions: [[12, 5], [15, 9], [20, 12], [10, 4], [18, 11], [25, 19]],
        genere(c) {
          const [n, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa compte ' + n + ' espèces d’animaux au potager. ' + s + ' n’ont pas de colonne vertébrale, comme les insectes et les escargots. Combien d’espèces sont des vertébrés ?',
            reponse: { type: 'nombre', valeur: n - s },
            aide: 'Calcule ' + n + ' − ' + s + '.',
            aideParlee: 'Enlève les espèces sans colonne vertébrale au nombre total.',
            correction: [n + ' − ' + s + ' = ' + (n - s) + ' espèces.'],
          };
        },
      },
      {
        id: 'part-de-mammiferes',
        univers: 'famille',
        // [vertébrés, mammifères]
        versions: [[20, 5], [40, 10], [50, 10], [30, 6], [25, 5], [80, 20]],
        genere(c) {
          const [v, m] = c.alea.choisir(this.versions);
          const p = (m / v) * 100;
          return {
            enonce: 'Sur ' + v + ' espèces de vertébrés observées, ' + m + ' sont des mammifères. Quel est le pourcentage de mammifères ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + m + ' ÷ ' + v + ' × 100.',
            aideParlee: 'Divise les mammifères par les vertébrés, puis multiplie par cent.',
            correction: [m + ' ÷ ' + v + ' × 100 = ' + p + ' %.'],
          };
        },
      },
    ],

    defi: {
      // [nombre de caractères partagés entre le chat et l'humain, entre le chat et la poule, entre le chat et le poisson]
      versions: [[3, 2, 1]],
      genere(c) {
        const [a, b, d] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : trois caractères sont observés : colonne vertébrale, quatre membres, poils et mamelles. Le chat les a tous les trois. L’être humain aussi. La poule n’a que les deux premiers. Le poisson n’a que le premier.',
          image: { dessin: 'parente', description: 'Des boîtes emboîtées. Les vertébrés contiennent le poisson et les tétrapodes. Les tétrapodes contiennent la grenouille, la poule et les mammifères. Les mammifères contiennent le chat et l’être humain.' },
          questions: [
            {
              texte: 'Question 1. Combien de caractères le chat partage-t-il avec la poule ?',
              reponse: { type: 'nombre', valeur: b },
              aide: 'Compte les caractères que les deux possèdent.',
              correction: ['La colonne vertébrale et les quatre membres : ' + b + ' caractères.'],
            },
            {
              texte: 'Question 2. Combien de caractères le chat partage-t-il avec l’être humain ?',
              reponse: { type: 'nombre', valeur: a },
              aide: 'Compte de la même manière.',
              correction: ['Les trois caractères : ' + a + '.'],
            },
            {
              texte: 'Question 3. Combien de caractères le chat partage-t-il avec le poisson ?',
              reponse: { type: 'nombre', valeur: d },
              aide: 'Le poisson n’a que le premier caractère.',
              correction: ['La colonne vertébrale seule : ' + d + ' caractère.'],
            },
            {
              texte: 'Question 4. Avec qui le chat a-t-il la parenté la plus proche ? Justifie.',
              correction: ['Le chat est le plus proche de l’être humain.', 'Ils partagent le plus de caractères : ils appartiennent au même groupe, les mammifères, et ont un ancêtre commun plus récent.'],
              grille: ['As-tu nommé l’être humain ?', 'As-tu utilisé le nombre de caractères partagés ?', 'As-tu parlé du groupe ou de l’ancêtre commun ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Des points communs, des boîtes dans des boîtes : tu sais lire un arbre de parenté.',
    carte: ['quel-groupe', 'qui-est-le-plus-proche', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['combien-de-vertebres', 'part-de-mammiferes'], defi: true },
    automatismes: [
      {
        id: 'groupe-rapide',
        versions: [['des poils et des mamelles', MAM], ['une colonne vertébrale', VERT], ['quatre membres', TETRA]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Quel groupe a ' + d + ' ?', reponse: O.choix(c.alea, b, [VERT, TETRA, MAM]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Suède, Carl von Linné a donné à chaque espèce un nom en deux mots, encore utilisé aujourd’hui.',
    prenoms: ['Moussa'],
  };
});
