/* Notion 3 du bloc « L'énergie » : l'énergie de position. L'eau du barrage de Rachel et Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  // Un nombre écrit avec des espaces entre les milliers : 150 000.
  const gr = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const Q = (id, u, v, e, t, a) => O.qcm(id, u, v, e, t, a);
  const COMPARE = ' Lequel a le plus d’énergie de position ? On donne Ep = m × g × h, avec g = 10 N/kg.';

  return {
    id: 'energie-position',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'L’énergie de position',
    classe: 'cycle 4',
    univers: ['dehors', 'champetre', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : énergie de position, conversion en énergie de mouvement ; formule Ep = m × g × h donnée dans l’énoncé.',

    accroche: {
      texte: 'Rachel et Moussa visitent un barrage. L’eau du grand lac est retenue très haut. ' +
        'Quand on ouvre la vanne, l’eau dévale la pente et fait tourner une turbine. ' +
        'Pourquoi retenir l’eau si haut ? Plus l’eau part de haut, plus elle a d’énergie à donner.',
      image: { dessin: 'chaine', etapes: ['Eau retenue en hauteur', 'Elle descend dans la conduite', 'Elle fait tourner la turbine'], description: 'L’eau est retenue en hauteur par le barrage. Elle descend dans la conduite et fait tourner la turbine.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Plus haut : plus d’énergie', 'Plus lourd : plus d’énergie', 'Ep = m × g × h, donné dans l’énoncé'], description: 'Plus un objet est haut, plus il a d’énergie de position. Plus il est lourd, plus il en a. Le calcul utilise la formule Ep égale m fois g fois h, donnée dans l’énoncé.' },
      etapes: [
        'Un objet en hauteur a de l’énergie grâce à sa position : c’est l’énergie de position, notée Ep.',
        'Plus l’objet est haut, plus Ep est grande. Plus l’objet est lourd, plus Ep est grande.',
        'Quand l’objet descend, son énergie de position se transforme en énergie de mouvement.',
        'Pour le calcul, l’énoncé donne la formule : Ep = m × g × h.',
        'Ici, m est la masse en kilogrammes, h la hauteur en mètres, et Ep est en joules.',
        'L’énoncé donne aussi g = 10 N/kg : c’est la valeur à utiliser dans les exercices.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un objet haut et lourd a ' + c.mot('ep') + '. Plus il est haut et lourd, plus il en a. L’énergie de position est aussi appelée énergie potentielle. ' +
        'Quand l’eau tombe, c’est ' + c.mot('conv') + '. Ici, de la hauteur vers le mouvement. ' +
        'L’astuce : avec deux fois plus de hauteur, ou deux fois plus de masse, l’énergie est deux fois plus grande.',
    },

    vocabulaire: {
      termes: {
        ep: { sesMots: 'de l’énergie cachée dans sa hauteur', officiel: 'de l’énergie de position', lesDeux: 'de l’énergie cachée dans sa hauteur, que les physiciens appellent énergie de position' },
        conv: { sesMots: 'le passage d’une énergie à une autre', officiel: 'une conversion d’énergie', lesDeux: 'le passage d’une énergie à une autre, que les physiciens appellent une conversion d’énergie' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’énergie cachée dans la hauteur, et le passage d’une énergie à une autre. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : l’énergie de position, aussi appelée énergie potentielle, notée Ep, et une conversion d’énergie.',
        'Tu connais les mots officiels : l’énergie de position, aussi appelée énergie potentielle, et la conversion d’énergie.',
      ],
    },

    exercices: [
      {
        id: 'calcul-ep',
        univers: 'famille',
        // [m en kg, h en m]
        versions: [[2, 3], [5, 2], [10, 4], [0.5, 10], [20, 5], [3, 10]],
        genere(c) {
          const [m, h] = c.alea.choisir(this.versions);
          const ep = m * 10 * h;
          return {
            enonce: 'Un objet de ' + ecr(m) + ' kg est posé à ' + h + ' m du sol. On donne Ep = m × g × h, avec g = 10 N/kg. Quelle est son énergie de position, en joules ?',
            reponse: { type: 'nombre', valeur: ep },
            aide: 'Calcule ' + ecr(m) + ' × 10 × ' + h + '.',
            aideParlee: 'Multiplie la masse, g, et la hauteur.',
            correction: ['Ep = m × g × h = ' + ecr(m) + ' × 10 × ' + h + ' = ' + ep + ' J.'],
          };
        },
      },
      {
        id: 'hauteur-inconnue',
        univers: 'dehors',
        // [Ep en J, m en kg]
        versions: [[100, 2], [300, 3], [60, 2], [200, 4], [500, 10]],
        genere(c) {
          const [ep, m] = c.alea.choisir(this.versions);
          const h = ep / (m * 10);
          return {
            enonce: 'Un objet de ' + m + ' kg a une énergie de position de ' + ep + ' J. On donne Ep = m × g × h, avec g = 10 N/kg. À quelle hauteur est-il, en mètres ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'Calcule d’abord m × g, puis divise Ep par ce résultat.',
            aideParlee: 'Calcule d’abord la masse fois g, puis divise l’énergie par ce résultat.',
            correction: ['m × g = ' + m + ' × 10 = ' + m * 10 + '.', 'h = ' + ep + ' ÷ ' + m * 10 + ' = ' + h + ' m.'],
          };
        },
      },
      {
        id: 'eau-barrage',
        univers: 'champetre',
        // [litres d'eau, hauteur de chute en m]
        versions: [[100, 20], [500, 10], [200, 25], [100, 30], [300, 20], [50, 40]],
        genere(c) {
          const [l, h] = c.alea.choisir(this.versions);
          const ep = l * 10 * h;
          return {
            enonce: 'Un barrage retient de l’eau à ' + h + ' m de hauteur. Prenons ' + l + ' L de cette eau. On sait que 1 L d’eau a une masse de 1 kg. On donne Ep = m × g × h, avec g = 10 N/kg. Quelle est l’énergie de position de cette eau, en joules ?',
            reponse: { type: 'nombre', valeur: ep },
            aide: 'La masse de l’eau est ' + l + ' kg. Calcule ' + l + ' × 10 × ' + h + '.',
            aideParlee: 'Un litre d’eau pèse un kilogramme. Multiplie ensuite la masse, g, et la hauteur.',
            correction: ['m = ' + l + ' kg.', 'Ep = ' + l + ' × 10 × ' + h + ' = ' + gr(ep) + ' J.'],
          };
        },
      },
      Q('qui-a-le-plus', 'famille',
        [
          ['Deux blocs identiques : le premier est à 1 m du sol, le second à 3 m.', 'Le second objet', 'À masse égale, le plus haut a le plus d’énergie de position.'],
          ['Deux seaux à la même hauteur : le premier contient 2 kg d’eau, le second 8 kg.', 'Le second objet', 'À hauteur égale, le plus lourd a le plus d’énergie de position.'],
          ['Deux sacs de 5 kg, posés tous les deux à 2 m du sol.', 'Les deux autant', 'Même masse et même hauteur : même énergie de position.'],
          ['Un cageot de 10 kg à 1 m du sol, et un autre de 5 kg à 2 m du sol.', 'Les deux autant', 'Premier : 10 × 10 × 1 = 100 J. Second : 5 × 10 × 2 = 100 J.'],
          ['Un ballon de 1 kg à 5 m du sol, et un autre ballon de 1 kg à 2 m du sol.', 'Le premier objet', 'À masse égale, le plus haut a le plus d’énergie de position.'],
        ],
        (x) => x + COMPARE,
        ['Le premier objet', 'Le second objet', 'Les deux autant'],
        'Compare la masse, puis la hauteur. Calcule m × g × h si besoin.'),
      {
        id: 'transformation',
        univers: 'dehors',
        // [question, bonne réponse, piège 1, piège 2, pourquoi]
        versions: [
          ['Une balle est lâchée du haut d’un mur et tombe. Que devient son énergie de position pendant la chute ?', 'Elle se transforme en énergie de mouvement', 'Elle disparaît sans laisser de trace', 'Elle augmente de plus en plus', 'Plus la balle descend, moins elle a d’énergie de position, et plus elle va vite.'],
          ['L’eau d’un barrage tombe dans la conduite. Que devient son énergie de position ?', 'Elle se transforme en énergie de mouvement', 'Elle disparaît sans laisser de trace', 'Elle augmente de plus en plus', 'L’eau descend et prend de la vitesse : sa hauteur devient du mouvement.'],
          ['Un pot de fleurs tombe d’une étagère. Que devient son énergie de position pendant la chute ?', 'Elle se transforme en énergie de mouvement', 'Elle disparaît sans laisser de trace', 'Elle augmente de plus en plus', 'Le pot descend et prend de la vitesse : sa hauteur devient du mouvement.'],
          ['On monte un sac sur une étagère. Que se passe-t-il pour son énergie de position ?', 'Elle augmente', 'Elle diminue', 'Elle reste nulle', 'Plus le sac est haut, plus son énergie de position est grande.'],
        ],
        genere(c) {
          const [q, bonne, p1, p2, pourquoi] = c.alea.choisir(this.versions);
          return {
            enonce: q,
            reponse: O.choix(c.alea, bonne, [p1, p2]),
            aide: 'Pense à la hauteur et à la vitesse de l’objet.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [masse d'eau en kg, hauteur du lac A en m, hauteur du lac B en m]
      versions: [[200, 10, 25], [500, 30, 20], [100, 40, 15], [300, 12, 18]],
      genere(c) {
        const [m, a, b] = c.alea.choisir(this.versions);
        const eA = m * 10 * a, eB = m * 10 * b;
        const bonne = eA > eB ? 'Le lac A' : eB > eA ? 'Le lac B' : 'Les deux autant';
        return {
          enonce: 'Rachel et Moussa comparent deux lacs de montagne. Prenons ' + m + ' kg d’eau du lac A, à ' + a + ' m de hauteur. Prenons la même masse d’eau du lac B, à ' + b + ' m de hauteur. On donne Ep = m × g × h, avec g = 10 N/kg.',
          questions: [
            {
              texte: 'Question 1. Quelle est l’énergie de position de l’eau du lac A, en joules ?',
              reponse: { type: 'nombre', valeur: eA },
              aide: 'Calcule ' + m + ' × 10 × ' + a + '.',
              aideParlee: 'Multiplie la masse, g, et la hauteur.',
              correction: ['Ep = ' + m + ' × 10 × ' + a + ' = ' + gr(eA) + ' J.'],
            },
            {
              texte: 'Question 2. Quelle est l’énergie de position de l’eau du lac B, en joules ?',
              reponse: { type: 'nombre', valeur: eB },
              aide: 'Calcule ' + m + ' × 10 × ' + b + '.',
              aideParlee: 'Multiplie la masse, g, et la hauteur.',
              correction: ['Ep = ' + m + ' × 10 × ' + b + ' = ' + gr(eB) + ' J.'],
            },
            {
              texte: 'Question 3. Quel lac donne le plus d’énergie à l’eau qui descend ?',
              reponse: O.choix(c.alea, bonne, ['Le lac A', 'Le lac B', 'Les deux autant']),
              aide: 'Compare les deux résultats.',
              correction: [gr(eA) + ' J pour le lac A, ' + gr(eB) + ' J pour le lac B.', 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Explique pourquoi on retient l’eau le plus haut possible dans un barrage. Parle de la hauteur et de l’énergie.',
              correction: ['Plus l’eau est haute, plus son énergie de position est grande.', 'En descendant, cette énergie se transforme en mouvement et fait tourner la turbine.'],
              grille: ['As-tu relié la hauteur à l’énergie de position ?', 'As-tu parlé de la transformation en mouvement ?', 'As-tu cité la turbine ou l’électricité ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Haut et lourd, c’est beaucoup d’énergie de position : tu comprends pourquoi on retient l’eau en hauteur.',
    carte: ['calcul-ep', 'hauteur-inconnue', 'eau-barrage'],
    papierDuSoir: { exercices: ['calcul-ep', 'eau-barrage'], defi: true },
    automatismes: [
      {
        id: 'm-fois-10-fois-h',
        versions: [[2, 3], [5, 2], [4, 5], [10, 3]],
        genere(c) { const [m, h] = c.alea.choisir(this.versions); return { enonce: m + ' × 10 × ' + h + ' = ?', reponse: { type: 'nombre', valeur: m * 10 * h } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Lesotho, l’eau du barrage de Katse, haut de 185 mètres, alimente la centrale hydroélectrique de ’Muela.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
