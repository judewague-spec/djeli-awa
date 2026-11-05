/* Notion 9 du bloc SVT « Le vivant et son évolution » : les populations. Les pucerons des tomates de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const MONTE = 'La population augmente', BAISSE = 'La population diminue';

  return {
    id: 'populations',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Les populations',
    classe: 'cycle 4',
    univers: ['champetre', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : dynamique des populations, facteurs qui les font varier.',

    accroche: {
      texte: 'Lundi, Laure voit quelques pucerons sur ses tomates. Une semaine plus tard, ils couvrent toute la tige ! Puis des coccinelles arrivent, et les pucerons disparaissent peu à peu. ' +
        'Qu’est-ce qui fait monter, puis descendre, le nombre de pucerons ?',
      image: { dessin: 'courbe', points: [[0, 10], [1, 40], [2, 160], [3, 100], [4, 40]], axeX: 'semaines', axeY: 'pucerons', description: 'Une courbe du nombre de pucerons : 10, puis 40, puis 160, puis, avec les coccinelles, 100, puis 40.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Naissances + arrivées : ça monte', 'Morts + départs : ça descend', 'Nourriture, climat, prédateurs décident'], description: 'Les naissances et les arrivées font monter une population ; les morts et les départs la font descendre ; la nourriture, le climat et les prédateurs décident.' },
      etapes: [
        'Tous les pucerons de cette partie du potager appartiennent à la même espèce et vivent au même endroit.',
        'S’il y a plus de naissances que de morts, leur nombre monte. Beaucoup de nourriture et un temps doux les aident.',
        'Quand arrivent les coccinelles, qui les mangent, il y a plus de morts que de naissances : leur nombre baisse.',
        'Dans la nature, ces deux forces se font souvent face. Une population ne peut pas monter sans fin.',
      ],
    },

    decouverte: {
      texte: (c) => 'Les pucerons d’une même espèce, au même endroit, forment ' + c.mot('population') + '. Elle monte quand les naissances dépassent les morts. Elle baisse dans le cas contraire. ' +
        'La nourriture, le climat et ' + c.mot('predateurs') + ' la font varier. ' +
        'L’astuce : fais le compte, comme pour un porte-monnaie : ce qui entre, moins ce qui sort.',
    },

    vocabulaire: {
      termes: {
        population: { sesMots: 'une grande famille', officiel: 'une population', lesDeux: 'une grande famille, que les scientifiques appellent une population' },
        predateurs: { sesMots: 'les animaux qui les mangent', officiel: 'les prédateurs', lesDeux: 'les animaux qui les mangent, que l’on appelle les prédateurs,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la grande famille, et les animaux qui les mangent. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une population, pour les individus d’une même espèce, au même endroit. Les animaux qui les mangent sont des prédateurs.',
        'Tu connais les mots officiels : la population, l’espèce et les prédateurs.',
      ],
    },

    exercices: [
      O.qcm('monte-ou-baisse', 'champetre',
        [['Il y a plus de naissances que de morts.', MONTE], ['Un grand nombre de coccinelles arrive sur les pucerons.', BAISSE], ['Les plantes dont ils se nourrissent ont disparu.', BAISSE], ['Il y a beaucoup de nourriture, et aucun prédateur.', MONTE]].map((v) => [v[0], v[1], 'Plus de naissances que de morts : elle augmente. Trop de prédateurs ou plus aucune nourriture : il y a plus de morts, elle diminue.']),
        (x) => x + ' Que devient cette population ?', [MONTE, BAISSE],
        'Compare les naissances et les morts.'),
      O.qcm('population-ou-pas', 'dehors',
        [['Tous les poissons du fleuve, de toutes les espèces', 'Non : ce sont plusieurs espèces'], ['Toutes les abeilles de la même espèce d’une prairie', 'Oui : même espèce, même endroit'], ['Tous les animaux de la forêt', 'Non : ce sont plusieurs espèces'], ['Tous les baobabs d’une même savane', 'Oui : même espèce, même endroit']].map((v) => [v[0], v[1], 'Une population réunit des individus d’une seule espèce, au même endroit.']),
        (x) => x + ' : est-ce une population ?', ['Oui : même espèce, même endroit', 'Non : ce sont plusieurs espèces'],
        'Une population, c’est une seule espèce, à un même endroit.'),
      O.qcm('quel-facteur', 'champetre',
        [['Un gel très fort tue les jeunes lapins du champ.', 'Le climat'], ['Un renard mange les lapins du champ.', 'Un prédateur'], ['Les chenilles ont mangé toutes les feuilles : elles n’ont plus rien.', 'La nourriture']].map((v) => [v[0], v[1], 'La cause est écrite dans la phrase : le froid est un facteur du climat, le renard un prédateur, et les feuilles la nourriture.']),
        (x) => x + ' Quel facteur est en cause ici ?', ['Le climat', 'Un prédateur', 'La nourriture'],
        'Lis bien la cause dans la phrase.'),
      {
        id: 'bilan-de-population',
        univers: 'champetre',
        // [au départ, naissances, morts]
        versions: [[100, 40, 30], [200, 50, 70], [80, 30, 10], [150, 60, 90], [500, 120, 100], [60, 25, 35]],
        genere(c) {
          const [d, n, m] = c.alea.choisir(this.versions);
          const f = d + n - m;
          return {
            enonce: 'Dans un champ, il y a ' + d + ' lapins au printemps. Pendant l’été, il y a ' + n + ' naissances et ' + m + ' morts. Combien de lapins y a-t-il à la fin de l’été ?',
            reponse: { type: 'nombre', valeur: f },
            aide: 'Calcule ' + d + ' + ' + n + ' − ' + m + '.',
            aideParlee: 'Ajoute les naissances, puis enlève les morts.',
            correction: [d + ' + ' + n + ' − ' + m + ' = ' + f + ' lapins.'],
          };
        },
      },
      {
        id: 'quatre-fois-plus',
        univers: 'champetre',
        // [au départ, semaines, multiplié par 4 chaque semaine]
        versions: [[10, 1], [5, 2], [10, 2], [3, 2], [2, 3], [20, 1]],
        genere(c) {
          const [d, s] = c.alea.choisir(this.versions);
          const f = d * 4 ** s;
          return {
            enonce: 'Il y a ' + d + ' pucerons sur une tomate. Leur nombre est multiplié par 4 chaque semaine. Combien y en a-t-il après ' + s + ' semaine' + (s > 1 ? 's' : '') + ' ?',
            reponse: { type: 'nombre', valeur: f },
            aide: 'Multiplie par 4, une fois pour chaque semaine.',
            aideParlee: 'Multiplie par quatre, une fois pour chaque semaine.',
            correction: [d + ' × ' + Array(s).fill(4).join(' × ') + ' = ' + f + ' pucerons.'],
          };
        },
      },
    ],

    defi: {
      // [pucerons semaine 1, semaine 2, semaine 3 (les coccinelles arrivent), semaine 4]
      versions: [[20, 80, 200, 60], [10, 60, 150, 50], [30, 90, 240, 80], [20, 100, 180, 40]],
      genere(c) {
        const [a, b, h, f] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : Laure compte les pucerons d’un pied de tomate, chaque semaine. Semaine 1 : ' + a + '. Semaine 2 : ' + b + '. Semaine 3 : ' + h + '. Les coccinelles arrivent alors. Semaine 4 : ' + f + '.',
          image: { dessin: 'courbe', points: [[1, a], [2, b], [3, h], [4, f]], axeX: 'semaines', axeY: 'pucerons', description: 'La courbe des pucerons : elle monte jusqu’à la semaine 3, puis elle descend après l’arrivée des coccinelles.' },
          questions: [
            {
              texte: 'Question 1. De combien la population a-t-elle augmenté entre la semaine 1 et la semaine 3 ?',
              reponse: { type: 'nombre', valeur: h - a },
              aide: 'Fais la différence entre les deux semaines.',
              correction: [h + ' − ' + a + ' = ' + (h - a) + ' pucerons de plus.'],
            },
            {
              texte: 'Question 2. De combien a-t-elle diminué entre la semaine 3 et la semaine 4 ?',
              reponse: { type: 'nombre', valeur: h - f },
              aide: 'Fais la différence entre ces deux semaines.',
              correction: [h + ' − ' + f + ' = ' + (h - f) + ' pucerons de moins.'],
            },
            {
              texte: 'Question 3. Explique l’évolution de cette population, en utilisant le document.',
              correction: ['Au début, les naissances dépassent les morts : la population augmente.', 'À l’arrivée des coccinelles, des prédateurs, il y a plus de morts que de naissances : la population diminue.'],
              grille: ['As-tu décrit les deux parties de la courbe ?', 'As-tu comparé naissances et morts ?', 'As-tu cité les coccinelles comme prédateurs ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Naissances, morts, prédateurs : tu sais lire la vie d’une population.',
    carte: ['monte-ou-baisse', 'population-ou-pas', 'quel-facteur'],
    papierDuSoir: { exercices: ['bilan-de-population', 'quatre-fois-plus'], defi: true },
    automatismes: [
      {
        id: 'quatre-fois',
        versions: [10, 20, 25, 50],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: '4 × ' + n + ' = ?', reponse: { type: 'nombre', valeur: 4 * n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 2020, le Kenya a affronté des criquets, en essaims pouvant compter plusieurs centaines de millions d’insectes.',
    prenoms: ['Laure'],
  };
});
