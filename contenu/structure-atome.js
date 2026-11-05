/* Notion 15 du bloc physique-chimie « La matière » : la structure de l'atome. Le stade et la fourmi. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { puissance: p } = O;
  // [nom, symbole, numéro atomique, nombre de particules du noyau]
  const ATOMES = [['l’hélium', 'He', 2, 4], ['le carbone', 'C', 6, 12], ['l’azote', 'N', 7, 14], ['l’oxygène', 'O', 8, 16], ['le sodium', 'Na', 11, 23],
    ['l’aluminium', 'Al', 13, 27], ['le chlore', 'Cl', 17, 35], ['le fer', 'Fe', 26, 56]];
  const PLUS = 'Positive', MOINS = 'Négative', NULLE = 'Aucune charge';
  const de = (nom) => nom.replace(/^le /, 'du ').replace(/^l’/, 'de l’');

  return {
    id: 'structure-atome',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'La structure de l’atome',
    classe: '3e',
    univers: ['dehors', 'famille', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : constituants de l’atome, ordres de grandeur.',

    accroche: {
      texte: 'Imagine qu’un atome soit aussi grand qu’un stade de football. Son cœur serait alors une fourmi posée au milieu de la pelouse ! ' +
        'Et pourtant, presque toute la masse de l’atome est dans cette fourmi. Autour, des particules minuscules tournent dans un grand vide. ' +
        'Comment est fait un atome ?',
      image: { dessin: 'atome', protons: 6, neutrons: 6, electrons: 6, description: 'Un atome de carbone dessiné sans échelle : un noyau avec 6 protons et 6 neutrons, et 6 électrons autour.' },
    },

    manipulation: {
      image: { dessin: 'atome', protons: 8, neutrons: 8, electrons: 8, description: 'Un atome d’oxygène, sans échelle : un noyau de 8 protons et 8 neutrons, et 8 électrons autour.' },
      etapes: [
        'Au centre, un cœur minuscule. Il contient de petits grains de charge positive, et d’autres grains sans charge.',
        'Autour tournent des grains encore plus petits, de charge négative, très légers.',
        'Le numéro de l’atome dans le tableau donne le nombre de grains positifs. Pour l’oxygène, numéro 8 : 8 grains positifs.',
        'Un atome est neutre : il a autant de grains négatifs que de grains positifs. L’oxygène en a donc 8.',
        'Un atome mesure environ 10⁻¹⁰ m ; son cœur environ 10⁻¹⁵ m, soit cent mille fois plus petit.',
      ],
    },

    decouverte: {
      texte: (c) => 'Au centre de l’atome, il y a ' + c.mot('noyau') + '. Dedans, ' + c.mot('protons') + ', de charge positive, et ' + c.mot('neutrons') + ', sans charge. ' +
        'Autour tournent ' + c.mot('electrons') + ', de charge négative. Le numéro de l’atome dans le tableau donne le nombre de charges positives. ' +
        'L’astuce : un atome a autant de charges négatives que de positives ; il est neutre.',
    },

    vocabulaire: {
      termes: {
        noyau: { sesMots: 'un cœur minuscule', officiel: 'un noyau', lesDeux: 'un cœur minuscule, le noyau' },
        protons: { sesMots: 'des petits grains', officiel: 'des protons', lesDeux: 'des petits grains, les protons' },
        neutrons: { sesMots: 'd’autres grains', officiel: 'des neutrons', lesDeux: 'd’autres grains, les neutrons' },
        electrons: { sesMots: 'des grains encore plus petits', officiel: 'des électrons', lesDeux: 'des grains encore plus petits, les électrons' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un atome a un cœur minuscule, avec de petites particules positives et neutres, et des particules négatives autour. ' +
          'Les scientifiques ont des noms pour tout ça : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le cœur, c’est le noyau ; il contient les protons, positifs, et les neutrons, neutres. Autour tournent les électrons, négatifs.',
        'Tu connais les mots officiels : noyau, protons, neutrons, électrons. Le numéro atomique Z est le nombre de protons.',
      ],
    },

    exercices: [
      {
        id: 'electrons',
        univers: 'famille',
        versions: ATOMES.map(([n]) => n),
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const [, s, z] = ATOMES.find(([n]) => n === nom);
          return {
            enonce: 'Le numéro atomique ' + de(nom) + ', ' + s + ', est Z = ' + z + '. Combien d’électrons a cet atome ?',
            reponse: { type: 'nombre', valeur: z },
            aide: 'Un atome est neutre : autant d’électrons que de protons.',
            correction: ['Z = ' + z + ' : ' + z + ' protons.', 'L’atome est neutre : ' + z + ' électrons.'],
          };
        },
      },
      {
        id: 'neutrons',
        univers: 'maison-courses',
        versions: ATOMES.map(([n]) => n),
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const [, s, z, a] = ATOMES.find(([n]) => n === nom);
          return {
            enonce: 'Le noyau d’un atome ' + de(nom).replace(/^du |^de l’/, (m) => (m === 'du ' ? 'de ' : 'd’')) + ' (' + s + ') contient ' + a + ' particules. Son numéro atomique est ' + z + '. Combien de neutrons contient-il ?',
            reponse: { type: 'nombre', valeur: a - z },
            aide: 'Le noyau contient des protons et des neutrons : enlève les protons.',
            correction: [a + ' − ' + z + ' = ' + (a - z) + ' neutrons.'],
          };
        },
      },
      {
        id: 'charge',
        univers: 'dehors',
        versions: [['un proton', PLUS], ['un électron', MOINS], ['un neutron', NULLE], ['le noyau', PLUS], ['un atome entier', NULLE]],
        genere(c) {
          const [part, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quelle est la charge électrique ' + (part.startsWith('le ') ? 'du ' + part.slice(3) : 'd’' + part) + ' ?',
            reponse: O.choix(c.alea, bonne, [PLUS, MOINS, NULLE]),
            aide: 'Protons positifs, électrons négatifs, neutrons sans charge.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'neutre-ou-pas',
        univers: 'famille',
        versions: [[8, 8], [11, 10], [17, 18], [6, 6], [12, 10], [13, 13]],
        genere(c) {
          const [pr, el] = c.alea.choisir(this.versions);
          const bonne = pr === el ? 'Oui, elle est neutre' : 'Non';
          return {
            enonce: 'Une particule contient ' + pr + ' protons et ' + el + ' électrons. Est-elle électriquement neutre ?',
            reponse: O.choix(c.alea, bonne, ['Oui, elle est neutre', 'Non']),
            aide: 'Neutre : autant de charges positives que de charges négatives.',
            correction: [pr === el ? pr + ' charges positives et ' + el + ' négatives : elles se compensent.' : pr + ' charges positives et ' + el + ' négatives : elles ne se compensent pas.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'combien-plus-petit',
        univers: 'dehors',
        // [exposant de la taille de l'atome, exposant de la taille du noyau], en mètres
        versions: [[-10, -15], [-10, -14], [-11, -15], [-11, -14]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un atome mesure environ ' + p(10, a) + ' m, et son noyau ' + p(10, n) + ' m. Combien de fois le noyau est-il plus petit que l’atome ?',
            reponse: { type: 'nombre', valeur: 10 ** (a - n) },
            aide: 'Compte les crans de dix entre les deux exposants.',
            aideParlee: 'Compte combien de fois il faut multiplier par dix pour passer du noyau à l’atome.',
            correction: ['De ' + p(10, n) + ' à ' + p(10, a) + ', il y a ' + (a - n) + ' crans de dix.', 'Le noyau est ' + 10 ** (a - n) + ' fois plus petit.'],
          };
        },
      },
    ],

    defi: {
      versions: ATOMES.slice(1, 7).map(([n]) => n),
      genere(c) {
        const nom = c.alea.choisir(this.versions);
        const [, s, z, a] = ATOMES.find(([n]) => n === nom);
        return {
          enonce: 'Esther lit dans son livre : « L’atome ' + de(nom).replace(/^du /, 'de ').replace(/^de l’/, 'd’') + ', de symbole ' + s + ', a pour numéro atomique ' + z + '. Son noyau contient ' + a + ' particules. »',
          image: { dessin: 'atome', protons: z, neutrons: a - z, electrons: Math.min(z, 18), description: 'Un atome ' + s + ' dessiné sans échelle : son noyau et ses électrons.' },
          questions: [
            {
              texte: 'Question 1. Combien d’électrons possède cet atome ?',
              reponse: { type: 'nombre', valeur: z },
              aide: 'Un atome est neutre.',
              correction: ['Z = ' + z + ' : ' + z + ' protons, donc ' + z + ' électrons.'],
            },
            {
              texte: 'Question 2. Combien de neutrons contient son noyau ?',
              reponse: { type: 'nombre', valeur: a - z },
              aide: 'Enlève les protons aux particules du noyau.',
              correction: [a + ' − ' + z + ' = ' + (a - z) + ' neutrons.'],
            },
            {
              texte: 'Question 3. Explique pourquoi cet atome est électriquement neutre.',
              correction: ['Il a ' + z + ' protons, de charge positive, et ' + z + ' électrons, de charge négative.', 'Les charges se compensent ; les neutrons n’ont pas de charge. L’atome est neutre.'],
              grille: ['As-tu donné le nombre de protons et d’électrons ?', 'As-tu dit que les charges positives et négatives se compensent ?', 'As-tu dit que les neutrons n’ont pas de charge ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un noyau minuscule, des électrons autour, et autant de plus que de moins : tu sais comment est fait un atome.',
    carte: ['electrons', 'neutrons', 'charge'],
    papierDuSoir: { exercices: ['neutrons', 'combien-plus-petit'], defi: true },
    automatismes: [
      {
        id: 'electrons-rapide',
        versions: [[6, 'C'], [8, 'O'], [1, 'H'], [11, 'Na']],
        genere(c) { const [z, s] = c.alea.choisir(this.versions); return { enonce: 'Atome ' + s + ', Z = ' + z + ' : combien d’électrons ?', reponse: { type: 'nombre', valeur: z } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Ernest Rutherford, né en Nouvelle-Zélande, a découvert que presque toute la masse de l’atome est rassemblée dans un noyau.',
    prenoms: ['Esther'],
  };
});
