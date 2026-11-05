/* Notion 3 du bloc SVT « Planète Terre, environnement, action humaine » : les séismes. Le souvenir de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const FOYER = 'Le foyer', EPI = 'L’épicentre', MAG = 'La magnitude', SISMO = 'Le sismographe';
  const FREQ = 'Séismes plus fréquents', RARE = 'Séismes plus rares', AUCUN = 'Aucun séisme possible';

  return {
    id: 'seismes',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Les séismes',
    classe: 'cycle 4',
    univers: ['dehors', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : séismes, risques, lien avec les mouvements des plaques.',

    accroche: {
      texte: 'Clarisse a déjà senti la terre trembler. Les verres tintaient, le sol bougeait quelques secondes. ' +
        'Rachel lui demande : « Qu’est-ce qui se passe, sous nos pieds ? » La réponse se cache dans les roches.',
      image: { dessin: 'chaine', etapes: ['Les roches se déforment', 'Elles cassent d’un coup', 'Les ondes partent dans toutes les directions', 'Le sol tremble en surface'], description: 'Comment naît un séisme : les roches se déforment, elles cassent d’un coup, des ondes partent dans toutes les directions, et le sol tremble en surface.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Sous terre : le point de départ de la cassure', 'À la surface, juste au-dessus : la zone la plus secouée'], description: 'Deux repères. Sous terre, le point de départ de la cassure. À la surface, juste au-dessus, la zone la plus secouée.' },
      etapes: [
        'Sous terre, les grandes pièces de la Terre se frottent et se poussent. Les roches se déforment, comme une règle que l’on plie.',
        'Quand la roche ne peut plus plier, elle casse d’un coup. Cette cassure libère de l’énergie.',
        'L’énergie part en ondes, que l’on appelle les ondes sismiques, dans toutes les directions, comme les ronds dans l’eau.',
        'À la surface, le sol tremble. Les appareils qui enregistrent ces ondes s’appellent des sismographes.',
        'Plus la note de force est grande, plus le séisme est puissant. La plupart ont lieu au bord des pièces.',
      ],
    },

    decouverte: {
      texte: (c) => 'Sous terre, la roche casse d’un coup. Regarde le premier point de cassure : c’est ' + c.mot('foyer') + '. ' +
        'Regarde la surface, juste au-dessus : c’est ' + c.mot('epicentre') + '. ' +
        'La force du séisme se mesure par un nombre : c’est ' + c.mot('magnitude') + '. ' +
        'L’astuce : les séismes sont fréquents là où les plaques se frottent.',
    },

    vocabulaire: {
      termes: {
        foyer: { sesMots: 'le point de départ du séisme', officiel: 'le foyer', lesDeux: 'le point de départ du séisme, que l’on appelle le foyer' },
        epicentre: { sesMots: 'en général le point le plus secoué', officiel: 'l’épicentre', lesDeux: 'en général le point le plus secoué, que l’on appelle l’épicentre' },
        magnitude: { sesMots: 'la note de force', officiel: 'la magnitude', lesDeux: 'la note de force, que les scientifiques appellent la magnitude' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le point de départ du séisme, en général le point le plus secoué, et la note de force. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le foyer, pour le point de départ du séisme. L’épicentre est en général le point le plus secoué. La note de force est la magnitude.',
        'Tu connais les mots officiels : le foyer, l’épicentre, la magnitude et les ondes sismiques.',
      ],
    },

    exercices: [
      O.qcm('mot-juste', 'dehors',
        [['Le point, sous terre, où la roche casse d’abord.', FOYER], ['Le point de la surface situé juste au-dessus du foyer.', EPI],
          ['La valeur qui mesure la force d’un séisme.', MAG], ['L’appareil qui enregistre les ondes d’un séisme.', SISMO]].map((v) => [v[0], v[1], v[1] + ' correspond à cette définition.']),
        (x) => x + ' De quoi s’agit-il ?', [FOYER, EPI, MAG, SISMO],
        'Le foyer est sous terre. L’épicentre est à la surface, juste au-dessus.'),
      {
        id: 'distance-station',
        univers: 'dehors',
        // [km par seconde (ondes), secondes]
        versions: [[5, 10], [6, 20], [4, 15], [5, 30], [6, 25], [4, 40]],
        genere(c) {
          const [v, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple, les ondes d’un séisme vont à ' + v + ' km par seconde. Une station les reçoit ' + t + ' secondes après la cassure. À quelle distance est-elle, en kilomètres ?',
            reponse: { type: 'nombre', valeur: v * t },
            aide: 'Calcule ' + v + ' × ' + t + '.',
            aideParlee: 'Multiplie la vitesse des ondes par le nombre de secondes.',
            correction: [v + ' × ' + t + ' = ' + v * t + ' km.'],
          };
        },
      },
      {
        id: 'duree-des-ondes',
        univers: 'dehors',
        // [km par seconde, kilomètres]
        versions: [[5, 100], [4, 60], [6, 180], [5, 150], [4, 120], [6, 90]],
        genere(c) {
          const [v, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple, les ondes d’un séisme vont à ' + v + ' km par seconde. Une ville est à ' + d + ' km du foyer. Combien de secondes les ondes mettent-elles pour y arriver ?',
            reponse: { type: 'nombre', valeur: d / v },
            aide: 'Divise la distance par la vitesse : ' + d + ' ÷ ' + v + '.',
            aideParlee: 'Divise la distance par la vitesse des ondes.',
            correction: [d + ' ÷ ' + v + ' = ' + d / v + ' secondes.'],
          };
        },
      },
      O.qcm('ou-secoue-t-on', 'dehors',
        [['Une région située au bord de deux plaques qui se frottent.', FREQ], ['Le milieu d’une grande plaque, loin de ses bords.', RARE], ['Une région où deux plaques se rapprochent.', FREQ]].map((v) => [v[0], v[1], v[1] === FREQ ? 'Les séismes sont plus fréquents aux bords des plaques, là où elles se frottent ou se poussent.' : 'Loin des bords des plaques, les roches sont moins contraintes : les séismes sont plus rares.']),
        (x) => x + ' Que peut-on attendre ?', [FREQ, RARE, AUCUN],
        'Les séismes sont plus fréquents près des bords des plaques.'),
      O.qcm('vrai-ou-faux', 'famille',
        [['Un séisme est une cassure brutale de roches.', 'Vrai'], ['L’épicentre est situé en profondeur.', 'Faux'], ['Plus la magnitude est grande, plus le séisme est puissant.', 'Vrai'], ['On sait prévoir avec certitude le jour d’un séisme.', 'Faux']].map((v) => [v[0], v[1], 'Un séisme est une cassure brutale de roches sous terre. L’épicentre est à la surface. On ne sait pas prévoir avec certitude le jour d’un séisme.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Le foyer est en profondeur, l’épicentre à la surface.'),
    ],

    defi: {
      // [km par seconde, secondes à la station A, secondes à la station B]
      versions: [[5, 12, 20], [6, 16, 10], [4, 20, 30], [5, 24, 16]],
      genere(c) {
        const [v, ta, tb] = c.alea.choisir(this.versions);
        const proche = ta < tb ? 'Station A' : 'Station B';
        return {
          enonce: 'Aminata étudie un séisme enregistré par deux stations. Dans cet exemple, les ondes vont à ' + v + ' km par seconde. La station A les reçoit ' + ta + ' secondes après la cassure, et la station B ' + tb + ' secondes après.',
          image: { dessin: 'barres', barres: [{ nom: 'Station A', parts: Math.round(ta / 2) }, { nom: 'Station B', parts: Math.round(tb / 2) }], description: 'Deux barres, chaque part valant deux secondes : la station A reçoit les ondes après ' + ta + ' secondes, la station B après ' + tb + ' secondes.' },
          questions: [
            {
              texte: 'Question 1. À quelle distance du foyer est la station A, en kilomètres ?',
              reponse: { type: 'nombre', valeur: v * ta },
              aide: 'Multiplie la vitesse par le temps.',
              correction: [v + ' × ' + ta + ' = ' + v * ta + ' km.'],
            },
            {
              texte: 'Question 2. À quelle distance du foyer est la station B, en kilomètres ?',
              reponse: { type: 'nombre', valeur: v * tb },
              aide: 'Multiplie la vitesse par le temps.',
              correction: [v + ' × ' + tb + ' = ' + v * tb + ' km.'],
            },
            {
              texte: 'Question 3. Quelle station est la plus proche du foyer ?',
              reponse: O.choix(c.alea, proche, ['Station A', 'Station B', 'Les deux à la même distance']),
              aide: 'Plus les ondes arrivent tôt, plus la station est proche.',
              correction: [ta + ' secondes pour A, ' + tb + ' secondes pour B.', 'Réponse : ' + proche + '.'],
            },
            {
              texte: 'Question 4. Pourquoi faut-il plusieurs stations pour situer un séisme ? Rédige deux phrases.',
              correction: ['Une seule station donne seulement une distance : le séisme peut être n’importe où sur un cercle autour d’elle.', 'Avec plusieurs stations, les cercles se croisent en un point, qui indique où est le séisme.'],
              grille: ['As-tu dit qu’une station donne seulement une distance ?', 'As-tu dit qu’avec plusieurs stations, on trouve un point commun ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais comment la roche casse, où le sol tremble le plus, et comment on mesure la distance d’un séisme.',
    carte: ['mot-juste', 'ou-secoue-t-on', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['distance-station', 'duree-des-ondes'], defi: true },
    automatismes: [
      {
        id: 'foyer-ou-epicentre',
        versions: [['sous terre', FOYER], ['à la surface', EPI]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Foyer ou épicentre : lequel est ' + d + ' ?', reponse: O.choix(c.alea, b, [FOYER, EPI]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Maroc, en septembre 2023, un séisme de magnitude 6,8 a secoué l’Atlas, et il a été ressenti jusqu’en Espagne.',
    prenoms: ['Clarisse', 'Rachel', 'Aminata'],
  };
});
