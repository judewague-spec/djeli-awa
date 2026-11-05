/* Notion 2 du bloc physique-chimie « La matière » : les changements d'état. Les glaçons de Moussa. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const NOMS = ['La fusion', 'La solidification', 'La vaporisation', 'La liquéfaction'];
  const S = 'Solide', L = 'Liquide', G = 'Gaz';

  return {
    id: 'changements-etat',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Les changements d’état',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'maison-courses', 'dehors'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière ».',

    accroche: {
      texte: 'Moussa sort des glaçons du congélateur et les met dans une casserole sur le feu. Il plonge un thermomètre dedans. ' +
        'La température monte… puis, pendant que la glace fond, elle ne bouge plus ! Comme si le thermomètre faisait une pause. Pourquoi ?',
      image: { dessin: 'thermometre', min: -10, max: 10, valeur: -8, depart: -8, description: 'Un thermomètre dans les glaçons : il montre 8 degrés au-dessous de zéro.' },
    },

    manipulation: {
      type: 'thermometre',
      min: -10,
      max: 10,
      depart: -8,
      cible: 0,
      consigne: 'Les glaçons sont à 8 degrés au-dessous de zéro. Chauffe-les : fais monter le thermomètre jusqu’à la température où la glace commence à fondre, puis valide.',
    },

    decouverte: {
      texte: (c) => 'La glace fond à zéro degré. Pendant tout le temps où elle fond, le thermomètre reste à zéro : c’est ' + c.mot('palier') + '. ' +
        'Pour une matière pure, comme l’eau pure, le changement d’état se fait toujours à la même température : la glace fond à zéro degré, et l’eau bout à cent degrés à la pression habituelle. ' +
        'Et la masse ne change pas : un glaçon fondu donne autant d’eau, en grammes, que le glaçon.',
      image: { dessin: 'thermometre', min: -10, max: 10, valeur: 0, depart: -8, description: 'Le thermomètre s’est arrêté à zéro degré : la glace fond.' },
    },

    vocabulaire: {
      termes: {
        palier: { sesMots: 'la pause du thermomètre', officiel: 'le palier de température', lesDeux: 'la pause du thermomètre, que les scientifiques appellent le palier de température' },
      },
      textes: [
        'Pour l’instant, garde tes mots : fondre, geler, bouillir, et la pause du thermomètre pendant que ça change. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la fusion quand ça fond, la solidification quand ça gèle, la vaporisation quand ça devient gaz, la liquéfaction quand un gaz redevient liquide. ' +
          'Et la pause du thermomètre, c’est le palier de température.',
        'Tu connais les mots officiels : fusion, solidification, vaporisation et liquéfaction. Pour un corps pur, chaque changement d’état se fait avec un palier de température.',
      ],
    },

    exercices: [
      {
        id: 'nom-du-changement',
        univers: 'maison-courses',
        versions: [[S, L, 'La fusion'], [L, S, 'La solidification'], [L, G, 'La vaporisation'], [G, L, 'La liquéfaction']],
        genere(c) {
          const [de, vers, nom] = c.alea.choisir(this.versions);
          return {
            enonce: 'Comment s’appelle le passage de l’état ' + de.toLowerCase() + ' à l’état ' + vers.toLowerCase() + ' ?',
            reponse: O.choix(c.alea, nom, NOMS),
            aide: 'Fondre, geler, devenir gaz, redevenir liquide : quel mot va avec ?',
            correction: [de + ' vers ' + vers.toLowerCase() + ' : ' + nom.toLowerCase() + '.', 'Réponse : ' + nom + '.'],
          };
        },
      },
      {
        id: 'situation',
        univers: 'cuisine-restaurant',
        versions: [['Le beurre fond dans la poêle chaude.', 'La fusion'], ['De la buée se forme sur le miroir de la salle de bain.', 'La liquéfaction'],
          ['Le linge mouillé sèche au soleil.', 'La vaporisation'], ['L’eau gèle dans le bac à glaçons.', 'La solidification'],
          ['Le chocolat fondu durcit sur le gâteau.', 'La solidification'], ['L’eau de la casserole bout.', 'La vaporisation'], ['Des gouttes apparaissent sur une bouteille sortie du frigo.', 'La liquéfaction']],
        genere(c) {
          const [phrase, nom] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel changement d’état est-ce ? « ' + phrase + ' »',
            reponse: O.choix(c.alea, nom, NOMS),
            aide: 'Cherche l’état du début et l’état de la fin.',
            correction: ['Réponse : ' + nom + '.'],
          };
        },
      },
      {
        id: 'etat-de-l-eau',
        univers: 'dehors',
        versions: [[-5, S], [20, L], [110, G], [50, L], [-18, S], [85, L], [120, G], [4, L]],
        genere(c) {
          const [t, etat] = c.alea.choisir(this.versions);
          return {
            enonce: 'De l’eau pure est à ' + ecr(t) + ' °C, à la pression habituelle. Dans quel état est-elle ?',
            reponse: O.choix(c.alea, etat, [S, L, G]),
            aide: 'L’eau pure fond à 0 °C et bout à 100 °C.',
            correction: ['Sous 0 °C : solide. Entre 0 et 100 °C : liquide. Au-dessus de 100 °C : gaz.', 'Réponse : ' + etat + '.'],
          };
        },
      },
      {
        id: 'masse',
        univers: 'cuisine-restaurant',
        versions: [120, 250, 75, 300, 180, 45, 500, 90],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure met ' + m + ' g de glaçons dans un bol fermé et les laisse fondre. Quelle masse d’eau liquide obtient-elle, en grammes ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Pendant un changement d’état, la masse ne change pas.',
            correction: ['La masse se conserve pendant un changement d’état.', 'Elle obtient ' + m + ' g d’eau.'],
          };
        },
      },
      {
        id: 'duree-du-palier',
        univers: 'cuisine-restaurant',
        // [début du palier, fin du palier] en minutes
        versions: [[3, 9], [2, 7], [4, 12], [5, 11], [1, 6], [6, 15], [3, 10], [2, 10]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'En chauffant de la glace, Aminata voit le thermomètre rester à 0 °C de la minute ' + a + ' à la minute ' + b + '. Combien de minutes dure le palier ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Calcule ' + b + ' − ' + a + '.',
            aideParlee: 'Fais la différence entre la fin et le début du palier.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' minutes.'],
          };
        },
      },
    ],

    defi: {
      // [température au départ, début du palier, fin du palier, masse de glace]
      versions: [[-10, 4, 10, 200], [-6, 2, 8, 150], [-12, 5, 13, 250], [-8, 3, 11, 300], [-4, 2, 7, 100], [-15, 6, 14, 400]],
      genere(c) {
        const [t0, a, b, m] = c.alea.choisir(this.versions);
        return {
          enonce: 'Rachel chauffe ' + m + ' g de glace pure qui sort du congélateur à ' + ecr(t0) + ' °C. Elle note la température chaque minute. ' +
            'De la minute ' + a + ' à la minute ' + b + ', le thermomètre reste bloqué, et la glace fond peu à peu.',
          questions: [
            {
              texte: 'Question 1. À quelle température, en °C, le thermomètre reste-t-il bloqué ?',
              reponse: { type: 'nombre', valeur: 0 },
              aide: 'C’est la température de fusion de la glace.',
              correction: ['La glace pure fond à 0 °C : le palier est à 0 °C.'],
            },
            {
              texte: 'Question 2. Quelle masse d’eau liquide, en grammes, obtient-elle quand toute la glace a fondu ?',
              reponse: { type: 'nombre', valeur: m },
              aide: 'La masse se conserve pendant un changement d’état.',
              correction: ['La masse ne change pas : ' + m + ' g.'],
            },
            {
              texte: 'Question 3. Esther dit : « Ce palier montre que la glace est de l’eau pure. » Explique pourquoi.',
              correction: ['Une matière pure change d’état à une température fixe : le thermomètre fait un palier.', 'Ici, la température reste à 0 °C pendant toute la fusion : la glace se comporte comme de l’eau pure.'],
              grille: ['As-tu dit que la température reste constante pendant la fusion ?', 'As-tu dit que c’est le cas d’une matière pure ?', 'As-tu donné la température du palier, 0 °C ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Fondre, geler, bouillir : tu sais nommer chaque changement d’état, et tu sais que la masse ne change pas.',
    carte: ['nom-du-changement', 'situation', 'etat-de-l-eau'],
    papierDuSoir: { exercices: ['masse', 'duree-du-palier'], defi: true },
    automatismes: [
      {
        id: 'changement-rapide',
        versions: [[S, L, 'La fusion'], [L, G, 'La vaporisation'], [L, S, 'La solidification'], [G, L, 'La liquéfaction']],
        genere(c) { const [a, b, n] = c.alea.choisir(this.versions); return { enonce: a + ' vers ' + b.toLowerCase() + ' ?', reponse: O.choix(c.alea, n, NOMS) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Dans le désert du Namib, en Namibie, un scarabée recueille les gouttes de brouillard sur son dos, puis il les boit.',
    prenoms: ['Moussa', 'Laure', 'Aminata', 'Rachel', 'Esther'],
  };
});
