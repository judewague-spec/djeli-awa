/* Notion 6 du bloc de technologie « Les objets et la société » : découverte scientifique, technologie et société. Les ondes radio et le poste de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const DEC = 'Une découverte scientifique', DEV = 'Un développement technologique', EFF = 'Un effet sur la société';
  const r1 = (x) => Math.round(x * 10) / 10;

  return {
    id: 'decouverte-societe',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Découverte scientifique, technologie et société',
    classe: '3e',
    univers: ['famille', 'appareils', 'champetre'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 11) : mettre en relation une découverte scientifique avec ses développements technologiques et leurs effets sur la société.',

    accroche: {
      texte: 'Le soir, au champ, Moussa écoute les nouvelles sur un petit poste de radio. La voix vient de très loin, sans aucun fil. ' +
        'Il y a longtemps, des savants ont découvert des ondes invisibles qui voyagent dans l’air. Sans eux, pas de radio, ni de téléphone portable.',
      image: { dessin: 'chaine', etapes: ['Des savants découvrent des ondes invisibles', 'Des ingénieurs inventent la radio', 'Les nouvelles arrivent dans chaque village'], description: 'Des savants découvrent des ondes invisibles, des ingénieurs inventent la radio, les nouvelles arrivent dans chaque village.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Comprendre la nature', 'Fabriquer un objet', 'Changer la vie des gens'], description: 'Comprendre la nature, fabriquer un objet, changer la vie des gens.' },
      etapes: [
        'D’abord, des savants comprennent quelque chose de nouveau sur la nature : des ondes qui voyagent sans fil.',
        'Ensuite, des ingénieurs se servent de ce savoir pour fabriquer des objets : la radio, puis le téléphone portable.',
        'Enfin, ces objets changent la vie des gens : les nouvelles, la musique et les appels arrivent jusque dans les villages.',
        'Ces changements ont du bon et du moins bon : on peut parler à sa famille au loin, mais aussi passer trop de temps sur son écran.',
      ],
    },

    decouverte: {
      texte: (c) => 'Tout part souvent d’un savoir nouveau sur la nature : c’est ' + c.mot('decouverte') + '. ' +
        'Les objets que l’on fabrique grâce à lui, c’est ' + c.mot('developpement') + '. Puis ces objets changent la vie de tous : la société évolue. ' +
        'L’astuce : comprendre, fabriquer, changer la vie. Trois étapes, dans cet ordre.',
    },

    vocabulaire: {
      termes: {
        decouverte: { sesMots: 'un savoir nouveau sur la nature', officiel: 'une découverte scientifique', lesDeux: 'un savoir nouveau sur la nature, que les savants appellent une découverte scientifique' },
        developpement: { sesMots: 'les objets qui en sortent', officiel: 'un développement technologique', lesDeux: 'les objets qui en sortent, que les ingénieurs appellent un développement technologique' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un savoir nouveau sur la nature, puis les objets qui en sortent. ' +
          'Les savants et les ingénieurs ont des mots à eux : je te les dirai la prochaine fois.',
        'On dit : une découverte scientifique, puis un développement technologique, et enfin des effets sur la société.',
        'Tu connais les mots officiels : la découverte scientifique, le développement technologique, et leurs effets sur la société.',
      ],
    },

    exercices: [
      O.qcm('quelle-etape', 'appareils',
        [['Des savants comprennent que des ondes invisibles voyagent dans l’air.', DEC], ['Des ingénieurs fabriquent le premier poste de radio.', DEV], ['Les nouvelles arrivent dans les villages les plus éloignés.', EFF],
          ['On comprend que le soleil peut produire de l’électricité dans certains matériaux.', DEC], ['On fabrique des panneaux solaires.', DEV], ['Des maisons sans réseau électrique ont de la lumière le soir.', EFF]],
        (x) => '« ' + x + ' » Est-ce une découverte scientifique, un développement technologique, ou un effet sur la société ?', [DEC, DEV, EFF],
        'Comprendre, fabriquer, ou changer la vie des gens ?'),
      O.qcm('ce-qui-vient-avant', 'famille',
        [['la radio', 'La découverte des ondes'], ['le panneau solaire', 'La découverte que le soleil peut produire de l’électricité']],
        (x) => 'Qu’a-t-il fallu d’abord pour fabriquer ' + x + ' ?', ['La découverte des ondes', 'La découverte que le soleil peut produire de l’électricité', 'Une publicité à la télévision'],
        'Avant de fabriquer, il faut comprendre.'),
      O.qcm('effet-positif-ou-negatif', 'famille',
        [['Rebecca peut appeler sa tante Clarisse, qui vit loin.', 'Un effet positif'], ['Certains passent trop de temps sur leur écran.', 'Un effet négatif'], ['Les nouvelles arrivent vite dans les villages.', 'Un effet positif'], ['Les vieux appareils jetés polluent les sols.', 'Un effet négatif']],
        (x) => '« ' + x + ' » Est-ce un effet positif ou négatif sur la société ?', ['Un effet positif', 'Un effet négatif'],
        'Est-ce bon ou mauvais pour les gens ?'),
      {
        id: 'part-equipee',
        univers: 'champetre',
        // [familles du village, familles avec une radio]
        versions: [[50, 40], [80, 60], [40, 30], [200, 150], [25, 20]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un village de ' + n + ' familles, ' + k + ' ont une radio. Quel pourcentage des familles a une radio ?',
            reponse: { type: 'nombre', valeur: (k * 100) / n },
            aide: 'Calcule ' + k + ' × 100 ÷ ' + n + '.',
            aideParlee: 'Multiplie le nombre de familles équipées par cent, puis divise par le nombre total de familles.',
            correction: [k + ' × 100 ÷ ' + n + ' = ' + ecr((k * 100) / n) + ' %.'],
          };
        },
      },
      {
        id: 'annees-d-ecart',
        univers: 'appareils',
        // [année de la découverte, année de l'objet]
        versions: [[1888, 1920], [1954, 1980], [1905, 1940], [1960, 1990], [1897, 1925]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un manuel, Rebecca lit : une découverte est faite en ' + a + ', et l’objet qui s’en sert est vendu à beaucoup de gens en ' + b + '. Combien d’années ont passé ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Calcule ' + b + ' − ' + a + '.',
            aideParlee: 'Soustrais l’année de la découverte à l’année de l’objet.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' ans.'],
          };
        },
      },
    ],

    defi: {
      // [familles du village, familles avec un téléphone portable il y a dix ans, aujourd'hui]
      versions: [[50, 10, 45], [80, 20, 72], [40, 8, 36], [200, 30, 180]],
      genere(c) {
        const [n, a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Un village compte ' + n + ' familles. Il y a dix ans, ' + a + ' familles avaient un téléphone portable ; aujourd’hui, ' + b + '. ' +
            'Le téléphone portable existe grâce à la découverte des ondes qui voyagent sans fil.',
          questions: [
            {
              texte: 'Question 1. Quel pourcentage des familles avait un téléphone portable il y a dix ans ?',
              reponse: { type: 'nombre', valeur: (a * 100) / n },
              aide: 'Multiplie par cent, puis divise par le nombre de familles.',
              correction: [a + ' × 100 ÷ ' + n + ' = ' + ecr(r1((a * 100) / n)) + ' %.'],
            },
            {
              texte: 'Question 2. Quel pourcentage en a un aujourd’hui ?',
              reponse: { type: 'nombre', valeur: (b * 100) / n },
              aide: 'Multiplie par cent, puis divise par le nombre de familles.',
              correction: [b + ' × 100 ÷ ' + n + ' = ' + ecr(r1((b * 100) / n)) + ' %.'],
            },
            {
              texte: 'Question 3. Explique le lien entre la découverte des ondes, le téléphone portable et la vie du village. Donne un effet positif et un effet négatif.',
              correction: ['La découverte des ondes a permis de fabriquer le téléphone portable : c’est un développement technologique.', 'Effet positif : on appelle sa famille qui vit loin. Effet négatif : on peut passer trop de temps sur l’écran, et les vieux téléphones font des déchets.'],
              grille: ['As-tu relié la découverte à l’objet ?', 'As-tu donné un effet positif ?', 'As-tu donné un effet négatif ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Comprendre, fabriquer, changer la vie : tu sais suivre le chemin d’une découverte jusqu’au village.',
    carte: ['quelle-etape', 'ce-qui-vient-avant', 'effet-positif-ou-negatif'],
    papierDuSoir: { exercices: ['part-equipee', 'annees-d-ecart'], defi: true },
    automatismes: [
      {
        id: 'pourcentage-rapide',
        versions: [[50, 25], [40, 10], [20, 5], [100, 30]],
        genere(c) { const [n, k] = c.alea.choisir(this.versions); return { enonce: k + ' sur ' + n + ', c’est combien pour cent ?', reponse: { type: 'nombre', valeur: (k * 100) / n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, l’ingénieur Arthur Zang a créé le Cardiopad. Cette tablette envoie les examens du cœur, par le réseau de téléphone, à des spécialistes éloignés.',
    prenoms: ['Moussa', 'Rebecca', 'Clarisse'],
  };
});
