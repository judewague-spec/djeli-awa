/* Notion 3 du bloc « Mouvement et forces » : uniforme, accéléré ou ralenti. Les gouttes d'huile du vélomoteur.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const NATURES = ['Uniforme', 'Accéléré', 'Ralenti'];
  /** La nature d'un mouvement, d'après ses positions à intervalles de temps égaux. */
  function nature(positions) {
    const ecarts = positions.slice(1).map((p, i) => p - positions[i]);
    if (ecarts.every((e) => e === ecarts[0])) return 'Uniforme';
    return ecarts[ecarts.length - 1] > ecarts[0] ? 'Accéléré' : 'Ralenti';
  }
  const ecrits = (positions) => positions.join(' m, ') + ' m';

  return {
    id: 'nature-mouvement',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'Uniforme, accéléré ou ralenti',
    classe: 'cycle 4',
    univers: ['dehors', 'danses', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : mouvements uniformes, accélérés ou ralentis.',

    accroche: {
      texte: 'Le vélomoteur de Moussa perd de l’huile : une goutte tombe sur la route à chaque seconde. Rebecca regarde les taches. ' +
        'Au début, elles sont serrées. Puis elles s’écartent de plus en plus. Plus loin, elles sont bien régulières. Tout au bout, elles se resserrent. Ces gouttes racontent toute l’histoire du trajet.',
      image: { dessin: 'chronophoto', positions: [0, 1, 3, 6, 10], legende: 'Une goutte par seconde', description: 'Les taches d’huile à 0, 1, 3, 6 et 10 mètres, une par seconde : elles s’écartent de plus en plus.' },
    },

    manipulation: {
      image: { dessin: 'chronophoto', positions: [0, 4, 8, 12, 16], legende: 'Une goutte par seconde', description: 'Les taches d’huile à 0, 4, 8, 12 et 16 mètres, une par seconde : elles sont régulièrement espacées.' },
      etapes: [
        'Les gouttes tombent toujours à une seconde d’écart. Seule la route parcourue change.',
        'Si les taches sont régulières, le vélomoteur fait la même distance à chaque seconde : sa vitesse ne change pas.',
        'Si elles s’écartent, il va de plus en plus vite.',
        'Si elles se resserrent, il va de plus en plus lentement.',
        'Quand la vitesse est stable, on trouve sa valeur avec un seul écart : la distance entre deux taches, divisée par une seconde.',
        'Pour décrire tout un mouvement, on dit sa forme puis sa vitesse : rectiligne et uniforme, par exemple.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde l’écart entre deux gouttes. S’il ne change pas, le mouvement est ' + c.mot('uniforme') + '. ' +
        'S’il grandit, le mouvement est ' + c.mot('accelere') + '. S’il rétrécit, le mouvement est ' + c.mot('ralenti') + '. ' +
        'L’astuce : les gouttes tombent à intervalles égaux. Seul l’écart change.',
    },

    vocabulaire: {
      termes: {
        uniforme: { sesMots: 'à vitesse stable', officiel: 'uniforme', lesDeux: 'à vitesse stable, ce que les physiciens appellent uniforme' },
        accelere: { sesMots: 'de plus en plus rapide', officiel: 'accéléré', lesDeux: 'de plus en plus rapide, ce que les physiciens appellent accéléré' },
        ralenti: { sesMots: 'de plus en plus lent', officiel: 'ralenti', lesDeux: 'de plus en plus lent, ce que les physiciens appellent ralenti' },
      },
      textes: [
        'Pour l’instant, garde tes mots : à vitesse stable, de plus en plus rapide, de plus en plus lent. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : uniforme, pour une vitesse stable. Accéléré, quand la vitesse augmente. Ralenti, quand elle diminue.',
        'Tu connais les mots officiels : un mouvement uniforme, accéléré ou ralenti.',
      ],
    },

    exercices: [
      {
        id: 'lire-les-gouttes',
        univers: 'dehors',
        versions: [[0, 3, 6, 9, 12], [0, 1, 3, 6, 10], [0, 5, 8, 10, 11], [0, 2, 4, 6, 8], [0, 1, 4, 9, 16], [0, 7, 12, 15, 16]],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          const n = nature(p);
          return {
            enonce: 'Une goutte tombe chaque seconde. Les taches sont aux positions : ' + ecrits(p) + '. Comment est le mouvement ?',
            image: { dessin: 'chronophoto', positions: p, legende: 'Une goutte par seconde', description: 'Les taches d’huile aux positions écrites dans l’énoncé, de seconde en seconde.' },
            reponse: O.choix(c.alea, n, NATURES.filter((x) => x !== n)),
            aide: 'Calcule l’écart entre deux taches voisines. Est-il stable, grandit-il, rétrécit-il ?',
            correction: ['Les écarts sont : ' + p.slice(1).map((x, i) => x - p[i]).join(' m, ') + ' m.', 'Réponse : ' + n + '.'],
          };
        },
      },
      O.qcm('dans-la-vie', 'dehors',
        [['La voiture de Clarisse démarre au feu vert.', 'Accéléré'], ['Le train freine à l’approche de la gare.', 'Ralenti'], ['Un marcheur avance d’un pas toujours pareil.', 'Uniforme'], ['Le vélo de Moussa descend une côte sans pédaler, de plus en plus vite.', 'Accéléré'], ['Une balle roule sur le sol et finit par s’arrêter.', 'Ralenti']],
        (x) => x + ' Comment est son mouvement ?', NATURES,
        'Demande-toi si la vitesse change, et dans quel sens.'),
      {
        id: 'vitesse-avec-l-ecart',
        univers: 'maison-courses',
        // [écart en mètres entre deux taches, durée en secondes]
        versions: [[4, 1], [6, 2], [10, 2], [9, 3], [15, 3], [20, 4]],
        genere(c) {
          const [e, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un chariot au mouvement uniforme fait ' + e + ' m ' + (t === 1 ? 'chaque seconde' : 'toutes les ' + t + ' s') + '. Quelle est sa vitesse, en m/s ?',
            reponse: { type: 'nombre', valeur: e / t },
            aide: 'Calcule ' + e + ' ÷ ' + t + '.',
            aideParlee: 'La vitesse égale la distance divisée par le temps.',
            correction: ['v = ' + e + ' ÷ ' + t + ' = ' + e / t + ' m/s.'],
          };
        },
      },
      {
        id: 'distance-uniforme',
        univers: 'danses',
        // [vitesse en m/s, durée en s]
        versions: [[2, 10], [3, 20], [5, 8], [4, 15], [6, 5]],
        genere(c) {
          const [v, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans une danse de groupe, Rachel avance à vitesse stable, à ' + v + ' m/s, pendant ' + t + ' s. Quelle distance parcourt-elle, en mètres ?',
            reponse: { type: 'nombre', valeur: v * t },
            aide: 'Calcule ' + v + ' × ' + t + '.',
            aideParlee: 'La distance égale la vitesse multipliée par le temps.',
            correction: ['d = ' + v + ' × ' + t + ' = ' + v * t + ' m.'],
          };
        },
      },
      O.qcm('les-deux-mots', 'dehors',
        [['Une voiture roule sur une route toute droite, sans changer de vitesse.', 'Rectiligne et uniforme'], ['Un manège tourne à vitesse stable.', 'Circulaire et uniforme'], ['Un train démarre sur une voie toute droite.', 'Rectiligne et accéléré']],
        (x) => x + ' Comment décris-tu ce mouvement ?', ['Rectiligne et uniforme', 'Circulaire et uniforme', 'Rectiligne et accéléré'],
        'Dis d’abord la forme du chemin, puis ce que fait la vitesse.'),
    ],

    defi: {
      // positions des 4 premières secondes (mouvement uniforme), puis positions en fin de freinage
      versions: [[0, 3, 6, 9, 11, 12], [0, 5, 10, 15, 18, 20], [0, 4, 8, 12, 15, 16], [0, 2, 4, 6, 7, 7.5]],
      genere(c) {
        const p = c.alea.choisir(this.versions);
        const v = p[1] - p[0];
        const debut = p.slice(0, 4), fin = p.slice(3);
        const ng = nature(debut), nf = nature(fin);
        return {
          enonce: 'Rebecca filme un chariot qui roule en ligne droite. Elle note sa position à chaque seconde, de 0 s à 5 s : ' + p.map(O.ecr).join(' m, ') + ' m.',
          image: { dessin: 'chronophoto', positions: p, legende: 'Une position par seconde', description: 'Les positions du chariot, de seconde en seconde : d’abord régulières, puis de plus en plus serrées.' },
          questions: [
            {
              texte: 'Question 1. Comment est le mouvement, entre 0 s et 3 s ?',
              reponse: O.choix(c.alea, ng, NATURES.filter((x) => x !== ng)),
              aide: 'Compare les distances parcourues à chaque seconde.',
              correction: ['Chaque seconde, le chariot fait la même distance.', 'Réponse : ' + ng + '.'],
            },
            {
              texte: 'Question 2. Calcule sa vitesse entre 0 s et 3 s, en m/s.',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Regarde la distance faite en une seconde.',
              correction: ['En une seconde, il fait ' + O.ecr(v) + ' m : sa vitesse est de ' + O.ecr(v) + ' m/s.'],
            },
            {
              texte: 'Question 3. Comment est le mouvement à la fin, entre 3 s et 5 s ? Justifie.',
              correction: ['Les distances parcourues chaque seconde diminuent : le mouvement est ' + nf.toLowerCase() + '.'],
              grille: ['As-tu comparé les distances parcourues chaque seconde ?', 'As-tu conclu que le mouvement est ralenti ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu lis un trajet dans ses écarts : régulier, de plus en plus vite ou de plus en plus lentement.',
    carte: ['lire-les-gouttes', 'dans-la-vie', 'les-deux-mots'],
    papierDuSoir: { exercices: ['vitesse-avec-l-ecart', 'distance-uniforme'], defi: true },
    automatismes: [
      {
        id: 'ecart-rapide',
        versions: [[3, 5], [7, 10], [12, 15], [20, 26]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Une tache à ' + a + ' m, la suivante à ' + b + ' m. Quel est l’écart, en mètres ?', reponse: { type: 'nombre', valeur: b - a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Botswana, des colliers ont mesuré la course de guépards sauvages. L’un a atteint 93 kilomètres par heure.',
    prenoms: ['Moussa', 'Rebecca', 'Clarisse', 'Rachel'],
  };
});
