/* Notion 1 du bloc de technologie « Comment un objet fonctionne » : les propriétés des matériaux. La cuillère et la casserole de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const pl = (n, mot, pluriel) => mot + (n >= 2 ? pluriel || 's' : '');
  /** Question à choix : versions [[situation, bonne réponse, [deux pièges faux], explication]]. */
  const Q = (id, univers, versions, enonce, aide) => ({
    id, univers, versions,
    genere(c) {
      const [x, bonne, autres, pourquoi] = c.alea.choisir(this.versions);
      return { enonce: enonce(x), reponse: O.choix(c.alea, bonne, autres), aide, correction: [pourquoi, 'Réponse : ' + bonne + '.'] };
    },
  });

  return {
    id: 'proprietes-materiaux',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Les propriétés des matériaux',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'appareils', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : propriétés des matériaux (conductibilité thermique et électrique, résistance à la flexion et à la torsion), essais simples.',

    accroche: {
      texte: 'Rachel remue la soupe chaude. Le manche de sa cuillère en métal devient brûlant ! Laure lui donne une cuillère en bois, dont le manche reste tiède. ' +
        'Chaque matériau se comporte à sa façon. Pour choisir le bon, on fait des essais.',
      image: { dessin: 'chaine', etapes: ['Cuillère en métal : le manche chauffe', 'Cuillère en bois : le manche reste tiède', 'On choisit après des essais'], description: 'Une cuillère en métal dont le manche chauffe, une cuillère en bois dont le manche reste tiède. On choisit le matériau après des essais.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Chaleur : le métal la laisse passer', 'Courant : le cuivre le laisse passer', 'Règle sous une masse : on mesure l’affaissement', 'Tige qu’on tord : on observe'], description: 'Quatre essais : la chaleur passe dans le métal, le courant passe dans le cuivre, une règle sous une masse s’affaisse d’une longueur qu’on mesure, une tige qu’on tord est observée.' },
      etapes: [
        'Le métal laisse passer la chaleur jusqu’à ta main. Le bois la laisse passer très mal.',
        'Pour le courant électrique, c’est pareil : le cuivre le laisse passer, le plastique le bloque.',
        'Autre essai : on pose une règle sur deux appuis, avec une masse au milieu. Elle se plie un peu.',
        'On mesure de combien elle s’affaisse : moins elle s’affaisse, mieux elle tient quand on la plie.',
        'Tordre une tige entre tes mains est un autre essai : certains matériaux se tordent facilement, d’autres non.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le métal sur le feu : c’est ' + c.mot('conduct') + '. ' +
        'Regarde la règle qui plie sous la masse : c’est ' + c.mot('flexion') + '. ' +
        'Regarde la tige que tu tords : c’est ' + c.mot('torsion') + '. ' +
        'L’astuce : on découvre les qualités d’un matériau par des essais, pas à l’œil.',
    },

    vocabulaire: {
      termes: {
        conduct: { sesMots: 'la façon de laisser passer la chaleur ou le courant', officiel: 'la conductibilité', lesDeux: 'la façon de laisser passer la chaleur ou le courant. Les techniciens disent : la conductibilité' },
        flexion: { sesMots: 'la façon de tenir quand on plie', officiel: 'la résistance à la flexion', lesDeux: 'la façon de tenir quand on plie. Les techniciens disent : la résistance à la flexion' },
        torsion: { sesMots: 'la façon de tenir quand on tord', officiel: 'la résistance à la torsion', lesDeux: 'la façon de tenir quand on tord. Les techniciens disent : la résistance à la torsion' },
      },
      textes: [
        'Pour l’instant, garde tes mots : laisser passer la chaleur ou le courant, tenir quand on plie, tenir quand on tord. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la conductibilité, thermique pour la chaleur et électrique pour le courant. ' +
          'Ils disent aussi la résistance à la flexion, pour plier, et à la torsion, pour tordre.',
        'Tu connais les mots officiels : la conductibilité thermique ou électrique, la résistance à la flexion et la résistance à la torsion.',
      ],
    },

    exercices: [
      Q('quelle-qualite', 'cuisine-restaurant',
        [
          ['le fond d’une casserole, qui doit chauffer l’eau vite', 'Un bon conducteur thermique', ['Un bon isolant thermique', 'Un bon isolant électrique'], 'Le fond doit laisser bien passer la chaleur vers l’eau.'],
          ['la poignée d’une casserole, qui doit rester tiède', 'Un bon isolant thermique', ['Un bon conducteur thermique', 'Un bon conducteur électrique'], 'La poignée doit laisser mal passer la chaleur vers la main.'],
          ['le fil d’une rallonge, qui doit laisser passer le courant', 'Un bon conducteur électrique', ['Un bon isolant électrique', 'Un bon isolant thermique'], 'Le fil doit laisser bien passer le courant.'],
          ['la gaine en plastique autour du fil, qui protège la main', 'Un bon isolant électrique', ['Un bon conducteur électrique', 'Un bon conducteur thermique'], 'La gaine doit empêcher le courant de passer vers la main.'],
          ['une boîte de pique-nique qui garde la glace au froid', 'Un bon isolant thermique', ['Un bon conducteur thermique', 'Un bon conducteur électrique'], 'La boîte doit empêcher la chaleur de venir de l’extérieur.'],
          ['la tige d’un tournevis, qui tourne fort pour serrer une vis', 'Une bonne résistance à la torsion', ['Un bon isolant thermique', 'Un bon conducteur électrique'], 'La tige est tordue quand on serre : elle ne doit pas se tordre.'],
        ],
        (x) => 'Pour ' + x + ', quelle qualité cherche-t-on dans le matériau ?',
        'Demande-toi si la chaleur ou le courant doit passer, ou être bloqué, ou si la pièce doit résister à un effort.'),
      {
        id: 'meilleure-regle',
        univers: 'appareils',
        // [affaissement de A en mm, affaissement de B en mm]
        versions: [[4, 9], [12, 5], [7, 3], [2, 6], [10, 15]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = a < b ? 'La règle A' : 'La règle B';
          return {
            enonce: 'On pose la même masse au milieu de deux règles A et B, de même forme. La règle A s’affaisse de ' + a + ' mm, la règle B de ' + b + ' mm. Laquelle résiste le mieux à la flexion ?',
            reponse: O.choix(c.alea, bonne, ['La règle A', 'La règle B', 'Elles résistent pareil']),
            aide: 'La règle qui résiste le mieux est celle qui s’affaisse le moins.',
            correction: [a + ' mm et ' + b + ' mm : le plus petit affaissement est ' + Math.min(a, b) + ' mm.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'ecart-affaissement',
        univers: 'appareils',
        // [affaissement de A en mm, affaissement de B en mm], A plus grand
        versions: [[9, 4], [12, 5], [8, 3], [15, 6], [10, 7]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sous la même masse, la règle A s’affaisse de ' + a + ' mm et la règle B de ' + b + ' mm. De combien de millimètres A s’affaisse-t-elle de plus que B ?',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Soustrais le petit affaissement au grand.',
            correction: [a + ' − ' + b + ' = ' + (a - b) + ' mm.'],
          };
        },
      },
      {
        id: 'lampe-testee',
        univers: 'maison-courses',
        // [matériaux testés, matériaux qui allument la lampe]
        versions: [[8, 3], [10, 4], [6, 2], [9, 5], [12, 7]],
        genere(c) {
          const [t, n] = c.alea.choisir(this.versions);
          const k = t - n;
          return {
            enonce: 'Rachel teste ' + t + ' matériaux avec un circuit et une lampe. La lampe s’allume pour ' + n + ' d’entre eux : ils laissent passer le courant. Combien de matériaux ne laissent pas passer le courant ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Retire les matériaux qui allument la lampe du total.',
            correction: [t + ' − ' + n + ' = ' + k + ' ' + pl(k, 'matériau', 'x') + '.'],
          };
        },
      },
      {
        id: 'etagere-livres',
        univers: 'maison-courses',
        // [kilogrammes avant que l'étagère plie, kilogrammes par livre]
        versions: [[30, 1.5], [24, 2], [45, 1.5], [18, 1.2], [36, 1.5], [20, 2.5]],
        genere(c) {
          const [m, p] = c.alea.choisir(this.versions);
          const n = Math.round(m / p);
          return {
            enonce: 'Une étagère en métal plie si elle porte plus de ' + m + ' kg. Un livre pèse ' + ecr(p) + ' kg. Combien de livres l’étagère peut-elle porter au plus ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Divise la charge permise par la masse d’un livre.',
            correction: [m + ' ÷ ' + ecr(p) + ' = ' + n + ' ' + pl(n, 'livre') + '.'],
          };
        },
      },
    ],

    defi: {
      // [affaissement de A en mm, affaissement de B en mm, kg portés par la planche choisie, kg par pot]
      versions: [[9, 4, 40, 5], [3, 8, 36, 4], [12, 6, 30, 2], [5, 11, 45, 3]],
      genere(c) {
        const [a, b, m, p] = c.alea.choisir(this.versions);
        const meilleure = a < b ? 'La planche A' : 'La planche B';
        return {
          enonce: 'Rachel et Laure construisent un support de plantes. Rachel teste deux planches A et B de même forme. Sous la même masse, A s’affaisse de ' + a + ' mm et B de ' + b + ' mm. ' +
            'La planche choisie peut porter au plus ' + m + ' kg. Un pot de fleurs pèse ' + p + ' kg.',
          image: { dessin: 'chaine', etapes: ['Planche A : ' + a + ' mm d’affaissement', 'Planche B : ' + b + ' mm d’affaissement', 'On choisit la planche qui s’affaisse le moins'], description: 'Planche A : ' + a + ' millimètres d’affaissement. Planche B : ' + b + ' millimètres d’affaissement. On choisit la planche qui s’affaisse le moins.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la différence d’affaissement entre les deux planches, en millimètres ?',
              reponse: { type: 'nombre', valeur: Math.abs(a - b) },
              aide: 'Soustrais le petit affaissement au grand.',
              correction: [Math.max(a, b) + ' − ' + Math.min(a, b) + ' = ' + Math.abs(a - b) + ' mm.'],
            },
            {
              texte: 'Question 2. Quelle planche résiste le mieux à la flexion ?',
              reponse: O.choix(c.alea, meilleure, ['La planche A', 'La planche B', 'Elles résistent pareil']),
              aide: 'La planche qui s’affaisse le moins résiste le mieux.',
              correction: ['Le plus petit affaissement est ' + Math.min(a, b) + ' mm.', 'Réponse : ' + meilleure + '.'],
            },
            {
              texte: 'Question 3. Combien de pots la planche choisie peut-elle porter au plus ?',
              reponse: { type: 'nombre', valeur: m / p },
              aide: 'Divise la charge permise par la masse d’un pot.',
              correction: [m + ' ÷ ' + p + ' = ' + m / p + ' ' + pl(m / p, 'pot') + '.'],
            },
            {
              texte: 'Question 4. Laure veut une poignée de casserole qui reste tiède. Choisit-elle un conducteur ou un isolant thermique ? Explique.',
              correction: ['Elle choisit un isolant thermique.', 'Un isolant laisse mal passer la chaleur : la poignée reste tiède sous la main.'],
              grille: ['As-tu choisi un isolant thermique ?', 'As-tu expliqué que la chaleur passe mal vers la main ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Chaleur, courant, plier, tordre : tu sais maintenant ce que chaque matériau fait de mieux.',
    carte: ['quelle-qualite', 'meilleure-regle', 'etagere-livres'],
    papierDuSoir: { exercices: ['ecart-affaissement', 'etagere-livres'], defi: true },
    automatismes: [
      {
        id: 'charge-par-objet',
        // [charge totale, charge d'un objet]
        versions: [[24, 4], [30, 5], [18, 3], [40, 8]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Nigeria, la culture Nok produisait déjà du fer, il y a plus de 2 000 ans.',
    prenoms: ['Rachel', 'Laure'],
  };
});
