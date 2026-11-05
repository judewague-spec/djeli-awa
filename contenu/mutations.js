/* Notion 12 du bloc SVT « Le vivant et son évolution » : les mutations. Le carnet recopié par Rachel.
   Aucun exemple de maladie héréditaire : consigne du 2 nov. 2026.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const TRANSMISE = 'Elle peut passer aux descendants', PAS = 'Elle ne passe pas aux descendants';

  return {
    id: 'mutations',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Les mutations',
    classe: '3e',
    univers: ['cuisine-restaurant', 'dehors', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : mutations de l’ADN, origine de nouveaux allèles, rôle du hasard.',

    accroche: {
      texte: 'Rachel recopie à la main le carnet de recettes de Laure. Mille pages, c’est long. À un endroit, elle écrit « sel » à la place de « sucre ». Une toute petite faute, et le plat change. ' +
        'Chaque fois qu’une cellule se divise, elle recopie tout son ADN. Et elle aussi fait de rares fautes.',
      image: { dessin: 'chaine', etapes: ['L’ADN est recopié', 'Une rare faute de copie', 'Un nouvel allèle apparaît', 'Effet nul, utile ou gênant'], description: 'L’ADN est recopié ; une rare faute de copie arrive ; un nouvel allèle apparaît ; son effet peut être nul, utile ou gênant.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Sans crème', parts: 8 }, { nom: 'Avec crème', parts: 1 }], description: 'Deux barres : le soleil sur une peau sans crème provoque davantage de fautes dans l’ADN qu’avec une crème solaire.' },
      etapes: [
        'La faute arrive par hasard, le plus souvent lors de la copie de l’ADN.',
        'Le soleil ou certains produits peuvent en augmenter le nombre. C’est une raison de protéger sa peau.',
        'Beaucoup de fautes ne changent rien. Certaines donnent un nouveau caractère, parfois utile, parfois gênant.',
        'Une faute dans une cellule de la peau reste dans le corps de la personne. Seule une faute dans un gamète peut passer aux enfants.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une modification de l’ADN, c’est ' + c.mot('mutation') + '. Elle arrive au hasard, et elle est rare. Elle peut créer une nouvelle version d’un gène. ' +
        'Pour passer aux descendants, elle doit toucher ' + c.mot('germinale') + '. ' +
        'L’astuce : c’est la source de toutes les nouvelles versions des gènes.',
    },

    vocabulaire: {
      termes: {
        mutation: { sesMots: 'une faute de copie', officiel: 'une mutation', lesDeux: 'une faute de copie, que les scientifiques appellent une mutation' },
        germinale: { sesMots: 'une cellule qui fabrique les gamètes', officiel: 'une cellule germinale', lesDeux: 'une cellule qui fabrique les gamètes, que l’on appelle une cellule germinale' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la faute de copie, et les cellules qui fabriquent les gamètes. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une mutation, pour la faute de copie. Les cellules qui donnent les gamètes sont les cellules germinales.',
        'Tu connais les mots officiels : la mutation, le nouvel allèle, et la cellule germinale.',
      ],
    },

    exercices: [
      O.qcm('passe-ou-pas', 'famille',
        [['Une mutation dans une cellule de la peau', PAS], ['Une mutation dans une cellule qui fabrique des spermatozoïdes', TRANSMISE], ['Une mutation dans une cellule du foie', PAS], ['Une mutation dans une cellule qui fabrique des ovules', TRANSMISE]].map((v) => [v[0], v[1], 'Seule une mutation dans un gamète, ou dans une cellule qui les fabrique, peut passer aux enfants. Ailleurs, elle reste dans le corps.']),
        (x) => x + ' : que peut-on dire ?', [TRANSMISE, PAS],
        'Seuls les gamètes passent aux enfants.'),
      O.qcm('vrai-ou-faux', 'famille',
        [['Toutes les mutations sont graves.', 'Faux'], ['Une mutation peut créer un nouvel allèle.', 'Vrai'], ['Les mutations arrivent au hasard.', 'Vrai'], ['Un être vivant choisit ses mutations pour s’adapter.', 'Faux']].map((v) => [v[0], v[1], 'Les mutations arrivent au hasard et peuvent créer un nouvel allèle. Beaucoup n’ont pas d’effet. Aucun être vivant ne les choisit.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Hasard, rareté, effet parfois nul, parfois utile, parfois gênant.'),
      O.qcm('se-proteger', 'dehors',
        [['Quel geste limite les mutations des cellules de la peau ?', 'Se protéger du soleil'], ['Quel conseil aide à éviter les fautes de copie dues aux rayons du soleil ?', 'Se protéger du soleil']].map((v) => [v[0], v[1], 'Les rayons du soleil peuvent abîmer l’ADN des cellules de la peau : il faut s’en protéger.']),
        (x) => x, ['Se protéger du soleil', 'Boire beaucoup d’eau', 'Marcher moins vite'],
        'Les rayons du soleil peuvent abîmer l’ADN.'),
      {
        id: 'fautes-de-copie',
        univers: 'cuisine-restaurant',
        // [pages, une faute toutes les n pages]
        versions: [[1000, 100], [600, 50], [800, 40], [500, 25], [900, 300], [1200, 200]],
        genere(c) {
          const [p, f] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rachel recopie ' + p + ' pages et fait une faute toutes les ' + f + ' pages. Combien de fautes fait-elle ?',
            reponse: { type: 'nombre', valeur: p / f },
            aide: 'Calcule ' + p + ' ÷ ' + f + '.',
            aideParlee: 'Divise le nombre de pages par l’écart entre deux fautes.',
            correction: [p + ' ÷ ' + f + ' = ' + p / f + ' fautes.'],
          };
        },
      },
      {
        id: 'bacteries-mutantes',
        univers: 'cuisine-restaurant',
        // [bactéries, une mutante pour n]
        versions: [[1000, 100], [5000, 1000], [2000, 500], [10000, 2000], [3000, 100], [8000, 400]],
        genere(c) {
          const [b, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans une boîte de culture, il y a ' + b + ' bactéries. En moyenne, une bactérie sur ' + n + ' porte une mutation. Combien de bactéries la portent ?',
            reponse: { type: 'nombre', valeur: b / n },
            aide: 'Calcule ' + b + ' ÷ ' + n + '.',
            aideParlee: 'Divise le nombre de bactéries par le nombre donné.',
            correction: [b + ' ÷ ' + n + ' = ' + b / n + ' bactéries.'],
          };
        },
      },
    ],

    defi: {
      // [bactéries au départ, une mutante pour n, colonies après ajout de l'antibiotique, nombre de doublements]
      versions: [[100000, 10000, 3], [200000, 10000, 2], [50000, 5000, 4], [300000, 30000, 3]],
      genere(c) {
        const [b, n, d] = c.alea.choisir(this.versions);
        const m = b / n, f = m * 2 ** d;
        return {
          enonce: 'Expérience : on cultive ' + b + ' bactéries. En moyenne, une bactérie sur ' + n + ' porte, par hasard, une mutation qui la rend résistante à un antibiotique. On ajoute cet antibiotique dans la culture : toutes les autres meurent. Les résistantes doublent ensuite ' + d + ' fois.',
          questions: [
            {
              texte: 'Question 1. Combien de bactéries résistantes y a-t-il au moment où l’on ajoute l’antibiotique ?',
              reponse: { type: 'nombre', valeur: m },
              aide: 'Divise le nombre de bactéries par le nombre donné.',
              correction: [b + ' ÷ ' + n + ' = ' + m + ' bactéries résistantes.'],
            },
            {
              texte: 'Question 2. Combien de bactéries résistantes y a-t-il après tous les doublements ?',
              reponse: { type: 'nombre', valeur: f },
              aide: 'Multiplie par deux, une fois pour chaque doublement.',
              correction: [m + ' × ' + Array(d).fill(2).join(' × ') + ' = ' + f + ' bactéries.'],
            },
            {
              texte: 'Question 3. L’antibiotique a-t-il créé la mutation ? Justifie à partir de l’énoncé.',
              correction: ['Non : la mutation existait déjà avant l’antibiotique, elle est apparue par hasard.', 'L’antibiotique a seulement tué les autres : les bactéries résistantes survivent, et se multiplient.'],
              grille: ['As-tu dit que la mutation existait avant ?', 'As-tu parlé du hasard ?', 'As-tu dit que l’antibiotique élimine les autres bactéries ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une faute de copie, au hasard, et parfois un nouveau caractère : tu sais d’où viennent les différences.',
    carte: ['passe-ou-pas', 'vrai-ou-faux', 'se-proteger'],
    papierDuSoir: { exercices: ['fautes-de-copie', 'bacteries-mutantes'], defi: true },
    automatismes: [
      {
        id: 'division-rapide',
        versions: [[1000, 100], [500, 50], [600, 100], [800, 200]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Tanzanie, au Kenya et au Soudan, des mutations permettent à des adultes de digérer le lait.',
    prenoms: ['Rachel', 'Laure'],
  };
});
