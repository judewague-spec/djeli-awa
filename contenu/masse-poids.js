/* Notion 9 du bloc « Mouvement et forces » : la masse et le poids. La bassine de Laure ; P = m × g, avec g = 9,8 N/kg.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const G = 9.8;
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'masse-poids',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'La masse et le poids',
    classe: '3e',
    univers: ['famille', 'cuisine-restaurant', 'commerce'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : force de pesanteur et son expression P = m × g, distinction entre masse et poids.',

    accroche: {
      texte: 'Laure porte sur sa tête une bassine de 10 kilos. « Elle pèse 10 kilos », dit Rachel. Au collège, sa professeure corrige : « Sa masse est de 10 kilos. Son poids, lui, se compte en newtons. » ' +
        'Rachel ouvre de grands yeux. Masse et poids, ce ne serait pas pareil ?',
      image: { dessin: 'fleche-force', objet: 'Bassine', forces: [{ point: 'centre', sens: 'bas', longueur: 2, nom: 'P' }], echelle: '1 carreau pour 49 N', description: 'La bassine, sur un quadrillage. La flèche du poids part de son centre et descend tout droit. Elle mesure deux carreaux, soit 98 newtons.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Masse m, en kg : balance', 'Poids P, en N : dynamomètre', 'P = m × g, avec g = 9,8 N/kg'], description: 'La masse, en kilogrammes, se mesure avec une balance. Le poids, en newtons, se mesure avec un dynamomètre. Le poids égale la masse multipliée par g, et g vaut 9,8 newtons par kilogramme sur la Terre.' },
      etapes: [
        'La masse dit combien il y a de matière dans la bassine. On la mesure avec une balance, en kilogrammes.',
        'Le poids est la force avec laquelle la Terre attire la bassine. On le mesure avec un dynamomètre, en newtons.',
        'Le poids est donc une force : il part du centre de l’objet, il est vertical, et il va vers le bas.',
        'Sur la Terre, chaque kilogramme est attiré avec 9,8 newtons.',
        'La règle : P = m × g. Pour 10 kilogrammes : 10 fois 9,8, soit 98 newtons.',
      ],
    },

    decouverte: {
      texte: (c) => 'La balance donne ' + c.mot('masse') + ', en kilogrammes. Le dynamomètre donne ' + c.mot('poids') + ', en newtons. ' +
        'On passe de l’une à l’autre avec ' + c.mot('g') + ' : P égale m fois g. ' +
        'L’astuce : on dit souvent « je pèse tant de kilos », mais en physique, des kilos, c’est une masse.',
    },

    vocabulaire: {
      termes: {
        masse: { sesMots: 'la quantité de matière', officiel: 'la masse', lesDeux: 'la quantité de matière, que les physiciens appellent la masse' },
        poids: { sesMots: 'la force de la Terre sur l’objet', officiel: 'le poids', lesDeux: 'la force de la Terre sur l’objet, que les physiciens appellent le poids' },
        g: { sesMots: 'les newtons de chaque kilogramme', officiel: 'l’intensité de la pesanteur', lesDeux: 'les newtons de chaque kilogramme, que les physiciens appellent l’intensité de la pesanteur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la quantité de matière, la force de la Terre sur l’objet, et les newtons de chaque kilogramme. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la masse, notée m. Le poids, noté P. Et l’intensité de la pesanteur, notée g.',
        'Tu connais les mots officiels : la masse, le poids, et l’intensité de la pesanteur.',
      ],
    },

    exercices: [
      {
        id: 'calculer-le-poids',
        univers: 'commerce',
        versions: [10, 5, 2, 20, 50, 0.5],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          const p = r2(m * G);
          return {
            enonce: 'Au marché, un sac a une masse de ' + ecr(m) + ' kg. Sur la Terre, g = 9,8 N/kg. Quel est son poids, en newtons ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + ecr(m) + ' × 9,8.',
            aideParlee: 'Le poids égale la masse multipliée par g.',
            correction: ['P = m × g = ' + ecr(m) + ' × 9,8 = ' + ecr(p) + ' N.'],
          };
        },
      },
      {
        id: 'calculer-la-masse',
        univers: 'cuisine-restaurant',
        // [poids en newtons]
        versions: [98, 49, 19.6, 196, 9.8, 29.4],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          const m = r2(p / G);
          return {
            enonce: 'Dans la cuisine de Laure, le poids d’un sac de farine est de ' + ecr(p) + ' N. Avec g = 9,8 N/kg, quelle est sa masse, en kilogrammes ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Calcule ' + ecr(p) + ' ÷ 9,8.',
            aideParlee: 'La masse égale le poids divisé par g.',
            correction: ['m = P ÷ g = ' + ecr(p) + ' ÷ 9,8 = ' + ecr(m) + ' kg.'],
          };
        },
      },
      O.qcm('masse-ou-poids', 'famille',
        [['« Ce sac contient 5 kilogrammes de riz. »', 'La masse'], ['« La Terre attire ce sac avec 49 newtons. »', 'Le poids'], ['« Cette grandeur se mesure avec une balance. »', 'La masse'], ['« Cette grandeur se mesure avec un dynamomètre. »', 'Le poids']],
        (x) => x + ' De quelle grandeur parle-t-on ?', ['La masse', 'Le poids', 'L’intensité de la pesanteur'],
        'Des kilogrammes et une balance pour l’une. Des newtons et un dynamomètre pour l’autre.'),
      O.qcm('fleche-du-poids', 'famille',
        [['Le poids de la bassine a pour direction :', 'La verticale'], ['Le poids de la bassine a pour sens :', 'Vers le bas'], ['Le poids de la bassine s’applique :', 'Au centre de la bassine']],
        (x) => x, ['La verticale', 'Vers le bas', 'Au centre de la bassine'],
        'Une mangue lâchée montre la direction et le sens du poids.'),
      {
        id: 'proportionnel',
        univers: 'commerce',
        // [masse 1, poids 1, masse 2]
        versions: [[2, 19.6, 4], [5, 49, 10], [10, 98, 20], [10, 98, 5]],
        genere(c) {
          const [m1, p1, m2] = c.alea.choisir(this.versions);
          const p2 = r2((p1 * m2) / m1);
          return {
            enonce: 'Un carton de ' + m1 + ' kg a un poids de ' + ecr(p1) + ' N. Sans refaire tout le calcul, quel est le poids d’un carton de ' + m2 + ' kg, en newtons ?',
            reponse: { type: 'nombre', valeur: p2 },
            aide: 'Si la masse est multipliée par un nombre, le poids est multiplié par le même nombre.',
            correction: ['La masse et le poids sont proportionnels.', ecr(p1) + ' × ' + m2 + ' ÷ ' + m1 + ' = ' + ecr(p2) + ' N.'],
          };
        },
      },
    ],

    defi: {
      // [masse en kg, échelle en N par cm]
      versions: [[10, 49], [20, 49], [15, 49], [5, 24.5]],
      genere(c) {
        const [m, e] = c.alea.choisir(this.versions);
        const p = r2(m * G), l = r2(p / e);
        return {
          enonce: 'Laure transporte sur sa tête une bassine de masse ' + m + ' kg. Donnée : sur la Terre, g = 9,8 N/kg. Échelle du schéma : 1 cm pour ' + ecr(e) + ' N.',
          questions: [
            {
              texte: 'Question 1. Calcule le poids de la bassine, en newtons.',
              reponse: { type: 'nombre', valeur: p },
              aide: 'Le poids égale la masse multipliée par g.',
              correction: ['P = ' + m + ' × 9,8 = ' + ecr(p) + ' N.'],
            },
            {
              texte: 'Question 2. Quelle est la longueur de la flèche du poids, en centimètres ?',
              reponse: { type: 'nombre', valeur: l },
              aide: 'Divise le poids par ce que vaut un centimètre.',
              correction: ['Longueur = ' + ecr(p) + ' ÷ ' + ecr(e) + ' = ' + ecr(l) + ' cm.'],
            },
            {
              texte: 'Question 3. Rachel dit : « Le poids et la masse, c’est la même chose ». Corrige-la, en citant les unités et les instruments de mesure.',
              correction: ['La masse est une quantité de matière, en kilogrammes, mesurée avec une balance. Le poids est une force, en newtons, mesurée avec un dynamomètre.'],
              grille: ['As-tu donné les deux unités ?', 'As-tu donné les deux instruments ?', 'As-tu dit que le poids est une force ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Des kilogrammes pour la masse, des newtons pour le poids : tu ne confondras plus jamais.',
    carte: ['calculer-le-poids', 'masse-ou-poids', 'fleche-du-poids'],
    papierDuSoir: { exercices: ['calculer-le-poids', 'calculer-la-masse'], defi: true },
    automatismes: [
      {
        id: 'poids-rapide',
        versions: [1, 2, 5, 10],
        genere(c) { const m = c.alea.choisir(this.versions); return { enonce: m + ' × 9,8 = ?', reponse: { type: 'nombre', valeur: r2(m * G) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, des femmes portent sur la tête un cinquième de leur poids sans dépenser plus d’énergie. Des chercheurs l’ont mesuré.',
    prenoms: ['Laure', 'Rachel'],
  };
});
