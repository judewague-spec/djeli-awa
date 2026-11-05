/* Notion 3 du bloc physique-chimie « La matière » : corps pur et mélange. Les trois eaux d'Aminata. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const PUR = 'Un corps pur', MEL = 'Un mélange';
  const HOM = 'Homogène', HET = 'Hétérogène';

  return {
    id: 'corps-pur-melange',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Corps pur et mélange',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'maison-courses', 'commerce'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière ».',

    accroche: {
      texte: 'Au marché, Aminata compare trois bouteilles d’eau : de l’eau minérale, de l’eau du robinet et de l’eau distillée pour le fer à repasser. ' +
        'Sur l’étiquette de l’eau minérale, il y a toute une liste : calcium, magnésium, sodium… L’eau, est-ce une seule chose, ou plusieurs ?',
      image: { dessin: 'tube', aspect: 'clair', legende: 'eau minérale', description: 'Un tube rempli d’eau minérale : on dirait de l’eau toute seule, pourtant elle contient des sels dissous.' },
    },

    manipulation: {
      image: { dessin: 'tube', aspect: 'trouble', legende: 'eau boueuse', description: 'Un tube d’eau boueuse : on voit des grains de terre dans l’eau.' },
      etapes: [
        'L’eau distillée ne contient que de l’eau : une seule sorte de particules.',
        'L’eau minérale contient de l’eau et des sels dissous : plusieurs sortes de particules, même si on ne les voit pas.',
        'Dans l’eau boueuse, on voit la terre à l’œil nu : il y a au moins deux parties différentes.',
        'L’eau sucrée, elle, paraît toute pareille, d’un bout à l’autre : on ne distingue qu’une seule partie.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’eau distillée ne contient qu’une seule sorte de particules : c’est ' + c.mot('pur') + '. L’eau minérale en contient plusieurs : c’est un mélange. ' +
        'Quand on ne voit qu’une seule partie, comme dans l’eau sucrée, c’est ' + c.mot('homogene') + '. Quand on en voit plusieurs, comme dans l’eau boueuse, c’est ' + c.mot('heterogene') + '. ' +
        'L’astuce : un mélange qui paraît tout pareil partout peut quand même contenir plusieurs matières.',
    },

    vocabulaire: {
      termes: {
        pur: { sesMots: 'une matière toute seule', officiel: 'un corps pur', lesDeux: 'une matière toute seule, que les scientifiques appellent un corps pur' },
        homogene: { sesMots: 'un mélange tout pareil partout', officiel: 'un mélange homogène', lesDeux: 'un mélange tout pareil partout, que les scientifiques appellent un mélange homogène' },
        heterogene: { sesMots: 'un mélange où l’on voit plusieurs parties', officiel: 'un mélange hétérogène', lesDeux: 'un mélange où l’on voit plusieurs parties, que les scientifiques appellent un mélange hétérogène' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’eau sucrée est un mélange tout pareil partout, l’eau boueuse un mélange où l’on voit plusieurs parties. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : un mélange homogène, quand il est tout pareil partout, et un mélange hétérogène, quand on voit plusieurs parties. ' +
          'Une seule sorte de particules, c’est un corps pur.',
        'Tu connais les mots officiels : corps pur, mélange homogène, mélange hétérogène.',
      ],
    },

    exercices: [
      {
        id: 'pur-ou-melange',
        univers: 'commerce',
        versions: [['l’eau distillée', PUR], ['le jus d’orange', MEL], ['l’eau salée', MEL], ['l’air', MEL], ['le dioxygène pur d’un flacon de laboratoire', PUR], ['l’eau minérale', MEL], ['le lait', MEL], ['le sucre en morceaux', PUR]],
        genere(c) {
          const [objet, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Est-ce un corps pur ou un mélange : ' + objet + ' ?',
            reponse: O.choix(c.alea, bonne, [PUR, MEL]),
            aide: 'Une seule sorte de particules, ou plusieurs ?',
            correction: [bonne === PUR ? 'Il ne contient qu’une seule sorte de particules.' : 'Il contient plusieurs sortes de particules.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'homogene-ou-pas',
        univers: 'cuisine-restaurant',
        versions: [['de l’eau sucrée', HOM], ['de l’eau avec du sable', HET], ['de l’huile et du vinaigre', HET], ['du sirop de menthe mélangé à de l’eau', HOM], ['du jus d’orange avec de la pulpe', HET], ['du thé', HOM]],
        genere(c) {
          const [objet, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans la cuisine, Laure regarde un verre ' + objet.replace(/^de l’|^de la |^du /, (m) => ({ 'de l’': 'd’', 'de la ': 'de ', 'du ': 'de ' })[m]) + '. Ce mélange est-il homogène ou hétérogène ?',
            reponse: O.choix(c.alea, bonne, [HOM, HET]),
            aide: 'Vois-tu une seule partie, ou plusieurs ?',
            correction: [bonne === HOM ? 'On ne voit qu’une seule partie.' : 'On voit plusieurs parties.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'separer',
        univers: 'maison-courses',
        versions: [['récupérer le sel dissous dans l’eau salée', 'L’évaporation'], ['retirer le sable d’une eau sableuse', 'La filtration'], ['séparer les feuilles de thé de la boisson', 'La filtration'], ['récupérer le sucre dissous dans l’eau sucrée', 'L’évaporation']],
        genere(c) {
          const [but, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa veut ' + but + '. Quelle méthode choisir ?',
            reponse: O.choix(c.alea, bonne, ['La filtration', 'L’évaporation']),
            aide: 'Un filtre retient ce qu’on voit ; ce qui est dissous passe à travers.',
            correction: [bonne === 'La filtration' ? 'Les morceaux sont visibles : un filtre les retient.' : 'Ce qui est dissous passe le filtre : il faut faire évaporer l’eau.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'etiquette',
        univers: 'commerce',
        // [calcium, magnésium, sodium] en milligrammes par litre
        versions: [[80, 26, 6], [78, 24, 5], [11, 8, 12], [94, 20, 9], [10, 6, 7], [70, 30, 10]],
        genere(c) {
          const [ca, mg, na] = c.alea.choisir(this.versions);
          const t = ca + mg + na;
          return {
            enonce: 'L’étiquette d’une eau minérale indique, pour un litre : calcium ' + ca + ' mg, magnésium ' + mg + ' mg, sodium ' + na + ' mg. Quelle masse, en milligrammes, font ces trois éléments ensemble dans un litre ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Ajoute les trois masses.',
            correction: [ca + ' + ' + mg + ' + ' + na + ' = ' + t + ' mg.', 'L’eau minérale est donc un mélange.'],
          };
        },
      },
      {
        id: 'sel-de-mer',
        univers: 'cuisine-restaurant',
        // litres d'eau de mer, à 35 g de sel par litre
        versions: [2, 3, 4, 5, 6, 10, 8, 20],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          return {
            enonce: 'L’eau de mer contient environ 35 g de sel par litre. Rachel fait évaporer ' + v + ' litres d’eau de mer. Quelle masse de sel reste-t-il, en grammes ?',
            reponse: { type: 'nombre', valeur: 35 * v },
            aide: 'Calcule 35 × ' + v + '.',
            aideParlee: 'Multiplie la masse de sel d’un litre par le nombre de litres.',
            correction: ['35 × ' + v + ' = ' + 35 * v + ' g de sel.'],
          };
        },
      },
    ],

    defi: {
      // [litres d'eau salée, grammes de sel par litre]
      versions: [[1, 300], [2, 350], [0.5, 380], [1, 350], [2, 300], [0.5, 300]],
      genere(c) {
        const [v, g] = c.alea.choisir(this.versions);
        return {
          enonce: 'Au lac Rose, au Sénégal, l’eau est très salée. Rebecca rapporte ' + O.ecr(v) + ' litre' + (v > 1 ? 's' : '') + ' d’une eau qui contient ' + g + ' g de sel par litre, dix fois plus que l’eau de mer. ' +
            'Dans un verre, l’eau paraît toute claire, pareille partout.',
          image: { dessin: 'tube', aspect: 'clair', legende: 'eau salée', description: 'Un tube d’eau salée : elle paraît claire, pareille partout.' },
          questions: [
            {
              texte: 'Question 1. Cette eau salée est-elle un corps pur ou un mélange ?',
              reponse: O.choix(c.alea, MEL, [PUR, MEL]),
              aide: 'Combien de sortes de particules contient-elle ?',
              correction: ['Elle contient de l’eau et du sel. Réponse : ' + MEL + '.'],
            },
            {
              texte: 'Question 2. Quelle masse de sel, en grammes, obtient-elle en faisant évaporer toute l’eau ?',
              reponse: { type: 'nombre', valeur: v * g },
              aide: 'Multiplie la masse de sel d’un litre par le nombre de litres.',
              correction: [g + ' × ' + O.ecr(v) + ' = ' + v * g + ' g de sel.'],
            },
            {
              texte: 'Question 3. Rebecca dit : « Mon eau est claire, donc c’est un corps pur. » Explique son erreur.',
              correction: ['L’eau est claire parce que le mélange est homogène : on ne voit qu’une seule partie.', 'Mais elle contient du sel dissous : c’est un mélange, pas un corps pur. L’évaporation le prouve.'],
              grille: ['As-tu dit que le mélange est homogène ?', 'As-tu dit qu’il contient du sel dissous ?', 'As-tu cité l’évaporation comme preuve ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais reconnaître un corps pur d’un mélange, même quand le mélange se cache derrière une eau toute claire.',
    carte: ['pur-ou-melange', 'homogene-ou-pas', 'separer'],
    papierDuSoir: { exercices: ['etiquette', 'sel-de-mer'], defi: true },
    automatismes: [
      {
        id: 'pur-rapide',
        versions: [['l’eau distillée', PUR], ['l’eau salée', MEL], ['l’air', MEL]],
        genere(c) { const [o, b] = c.alea.choisir(this.versions); return { enonce: o + ' : corps pur ou mélange ?', reponse: O.choix(c.alea, b, [PUR, MEL]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au lac Rose, au Sénégal, on récolte le sel dans une eau encore plus salée que celle de la mer Morte.',
    prenoms: ['Aminata', 'Laure', 'Moussa', 'Rachel', 'Rebecca'],
  };
});
