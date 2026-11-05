/* Notion 2 du bloc « Signaux et Univers » : galaxies et ordres de grandeur. Le ciel de Rachel et Moussa.
   Manipulation à l'écran : ranger des objets du plus petit au plus grand (js/manipulations/ranger.js).
   Les nombres des exercices sont des exemples de la notion.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const TAILLES = ['la Terre', 'le Soleil', 'le système solaire', 'la Voie lactée'];

  return {
    id: 'galaxies-ordres',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'Galaxies et ordres de grandeur',
    classe: 'cycle 4',
    univers: ['dehors', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : Univers, galaxies, année-lumière, ordres de grandeur.',

    accroche: {
      texte: 'Rachel regarde le ciel avec Moussa. Elle voit la Lune, puis des milliers d’étoiles. Moussa demande : « Jusqu’où tout cela s’étend ? » Pour répondre, il faut ranger des tailles très différentes.',
      image: { dessin: 'echelle', reperes: [{ nom: 'la Terre : environ 10⁴ km', puissance: 4 }, { nom: 'le Soleil : environ 10⁶ km', puissance: 6 }, { nom: 'le système solaire : environ 10¹⁰ km', puissance: 10 }, { nom: 'la Voie lactée : environ 10¹⁸ km', puissance: 18 }], description: 'Une règle en kilomètres, où chaque graduation est dix fois plus grande que la précédente. La Terre est vers la graduation 4, le Soleil vers 6, le système solaire vers 10 et la Voie lactée vers 18.' },
    },

    manipulation: {
      type: 'ranger',
      etapes: ['La Terre', 'Le Soleil', 'Le système solaire', 'La Voie lactée', 'L’Univers'],
      depart: ['Le système solaire', 'L’Univers', 'La Terre', 'La Voie lactée', 'Le Soleil'],
      consigne: 'Range ces objets du plus petit en haut au plus grand en bas. Utilise les boutons monter et descendre.',
    },

    decouverte: {
      texte: (c) => 'Regarde le Soleil : c’est une étoile. Plus de 100 milliards d’étoiles vivent ensemble : c’est ' + c.mot('galaxie') + '. La nôtre s’appelle la Voie lactée. ' +
        'La lumière met environ 100 000 ans pour la traverser. Ces distances sont énormes. On les mesure avec ' + c.mot('annee') + '. ' +
        'Elle vaut environ 9 460 milliards de kilomètres, car la lumière va à 300 000 kilomètres par seconde. ' +
        'Pour écrire ces nombres, on utilise ' + c.mot('puissance') + '. Chaque zéro de plus rend le nombre dix fois plus grand.',
    },

    vocabulaire: {
      termes: {
        galaxie: { sesMots: 'un immense village d’étoiles', officiel: 'une galaxie', lesDeux: 'un immense village d’étoiles, que l’on appelle une galaxie' },
        annee: { sesMots: 'la distance parcourue par la lumière en un an', officiel: 'une année-lumière', lesDeux: 'la distance parcourue par la lumière en un an, que les astronomes appellent une année-lumière' },
        puissance: { sesMots: 'les zéros écrits après le un', officiel: 'les puissances de 10', lesDeux: 'les zéros écrits après le un, que l’on appelle les puissances de 10' },
      },
      textes: [
        'Pour l’instant, garde tes mots. Il y a un immense village d’étoiles, et la distance parcourue par la lumière en un an. Il y a aussi les zéros après le un. ' +
          'Les astronomes ont des mots à eux : je te les dirai la prochaine fois.',
        'Les astronomes disent : une galaxie, une année-lumière, et les puissances de 10.',
        'Tu connais les mots officiels : une galaxie, une année-lumière et les puissances de 10. Une année-lumière est une distance, pas une durée. La Voie lactée mesure environ 100 000 années-lumière de diamètre.',
      ],
    },

    exercices: [
      O.qcm('nature-unite', 'dehors', [
        ['l’année-lumière', 'Une distance', 'C’est la distance que la lumière parcourt en un an, même si le mot « année » est dedans.'],
        ['le kilomètre par seconde', 'Une vitesse', 'Des kilomètres en une seconde : c’est une vitesse.'],
        ['l’année', 'Une durée', 'Une année est un temps qui passe.'],
        ['le kilomètre', 'Une distance', 'Le kilomètre mesure une longueur.'],
        ['le mètre par seconde', 'Une vitesse', 'Des mètres en une seconde : c’est une vitesse.'],
        ['la seconde', 'Une durée', 'La seconde mesure un temps.'],
      ], (x) => 'Que mesure ' + x + ' ?', ['Une distance', 'Une durée', 'Une vitesse'], 'Regarde l’unité : une longueur, un temps, ou une longueur en un temps ?'),
      {
        id: 'puissance-de-dix',
        univers: 'famille',
        // [nombre de zéros]
        versions: [3, 4, 5, 6, 9, 12],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          return {
            enonce: 'Le nombre ' + fmt(Math.pow(10, p)) + ' s’écrit 10 puissance combien ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Compte les zéros après le 1.',
            aideParlee: 'Compte les zéros après le un.',
            correction: ['Il y a ' + p + ' zéros après le 1.', fmt(Math.pow(10, p)) + ' = ' + O.puissance(10, p) + '.'],
          };
        },
      },
      {
        id: 'al-en-km',
        univers: 'dehors',
        // [années-lumière]
        versions: [5, 6, 8, 9, 10],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const d = n * 9460;
          return {
            enonce: 'Moussa lit qu’une étoile est à ' + n + ' années-lumière. On compte une année-lumière pour 9 460 milliards de kilomètres. Quelle distance, en milliards de kilomètres ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Multiplie ' + n + ' par 9 460.',
            aideParlee: 'Multiplie le nombre d’années-lumière par la distance d’une année-lumière.',
            correction: [n + ' × 9 460 = ' + fmt(d) + ' milliards de kilomètres.'],
          };
        },
      },
      {
        id: 'plus-grand',
        univers: 'dehors',
        // [numéro du premier objet, numéro du second, 1 = le plus grand demandé, 0 = le plus petit demandé]
        versions: [[0, 1, 1], [1, 2, 0], [2, 3, 1], [0, 3, 0], [0, 2, 1], [1, 3, 0]],
        genere(c) {
          const [i, j, r] = c.alea.choisir(this.versions);
          const bonne = cap(r === 1 ? TAILLES[j] : TAILLES[i]), autre = cap(r === 1 ? TAILLES[i] : TAILLES[j]);
          return {
            enonce: 'Entre ' + TAILLES[i] + ' et ' + TAILLES[j] + ', lequel est le plus ' + (r === 1 ? 'grand' : 'petit') + ' ?',
            reponse: O.choix(c.alea, bonne, [autre, 'Ils ont la même taille']),
            aide: 'Retiens l’ordre, du plus petit au plus grand : la Terre, le Soleil, le système solaire, la Voie lactée.',
            correction: ['Du plus petit au plus grand : la Terre, le Soleil, le système solaire, la Voie lactée.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'lumiere-en-km',
        univers: 'dehors',
        // [secondes]
        versions: [0.05, 0.1, 0.2, 0.25, 0.3],
        genere(c) {
          const s = c.alea.choisir(this.versions);
          const d = Math.round(300000 * s);
          return {
            enonce: 'La lumière va à 300 000 km/s. Quelle distance parcourt-elle en ' + ecr(s) + ' seconde, en kilomètres ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Multiplie 300 000 par ' + ecr(s) + '.',
            aideParlee: 'Multiplie la vitesse de la lumière par la durée.',
            correction: ['d = v × t = 300 000 × ' + ecr(s) + ' = ' + fmt(d) + ' km.'],
          };
        },
      },
    ],

    defi: {
      // [millions de kilomètres jusqu'à la sonde, années-lumière jusqu'à l'étoile]
      versions: [[18, 5], [36, 6], [54, 8], [90, 10]],
      genere(c) {
        const [m, n] = c.alea.choisir(this.versions);
        const s = (m * 10) / 3, mn = s / 60, d = n * 9460;
        return {
          enonce: 'Rachel et Moussa lisent un article. Dans cet exemple, une sonde est à ' + m + ' millions de kilomètres de la Terre. Elle envoie un signal radio, qui voyage à la vitesse de la lumière : 300 000 km/s. ' +
            'L’article dit que la Voie lactée mesure environ 100 000 années-lumière de diamètre. Il parle aussi d’une étoile de la Voie lactée, à ' + n + ' années-lumière du Soleil. On compte une année-lumière pour 9 460 milliards de kilomètres.',
          questions: [
            {
              texte: 'Question 1. Combien de secondes le signal met-il pour arriver à la Terre ?',
              reponse: { type: 'nombre', valeur: s },
              aide: 'Écris la distance en kilomètres : ' + m + ' millions = ' + fmt(m * 1000000) + ' km. Puis divise par 300 000.',
              aideParlee: 'Écris la distance en kilomètres, puis divise par la vitesse de la lumière.',
              correction: [m + ' millions de km = ' + fmt(m * 1000000) + ' km.', fmt(m * 1000000) + ' ÷ 300 000 = ' + s + ' s.'],
            },
            {
              texte: 'Question 2. Écris cette durée en minutes.',
              reponse: { type: 'nombre', valeur: mn },
              aide: 'Divise par 60 : 1 minute = 60 secondes.',
              correction: [s + ' ÷ 60 = ' + mn + ' ' + (mn > 1 ? 'minutes' : 'minute') + '.'],
            },
            {
              texte: 'Question 3. À quelle distance est l’étoile, en milliards de kilomètres ?',
              reponse: { type: 'nombre', valeur: d },
              aide: 'Multiplie ' + n + ' par 9 460.',
              aideParlee: 'Multiplie le nombre d’années-lumière par la distance d’une année-lumière.',
              correction: [n + ' × 9 460 = ' + fmt(d) + ' milliards de kilomètres.'],
            },
            {
              texte: 'Question 4. Pourquoi les astronomes mesurent-ils les distances entre les étoiles en années-lumière, et pas en kilomètres ? Réponds en deux ou trois phrases.',
              correction: ['Les distances entre les étoiles sont énormes : en kilomètres, les nombres seraient trop grands et peu pratiques.', 'L’année-lumière est une unité de distance bien plus grande, adaptée à ces tailles.'],
              grille: ['As-tu dit que les distances entre les étoiles sont énormes ?', 'As-tu dit que l’année-lumière est une unité de distance, pas de temps ?', 'As-tu parlé de nombres trop grands en kilomètres ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! De la Terre jusqu’aux galaxies, tu sais ranger les tailles et lire les très grands nombres.',
    carte: ['nature-unite', 'al-en-km', 'plus-grand'],
    papierDuSoir: { exercices: ['al-en-km', 'lumiere-en-km'], defi: true },
    automatismes: [
      {
        id: 'zeros',
        versions: [[3], [4], [5], [6]],
        genere(c) { const [p] = c.alea.choisir(this.versions); return { enonce: 'Combien de zéros dans 10 puissance ' + p + ' ?', reponse: { type: 'nombre', valeur: p } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, Vera Rubin a mesuré en 1970 la rotation de la galaxie d’Andromède, avec Kent Ford.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
