/* Notion 19 du bloc SVT « Le vivant et son évolution » : la vie sur d'autres planètes. Le ciel de Clarisse et Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const OUI = 'Elle est dans la zone habitable', NON = 'Elle n’est pas dans la zone habitable';
  const LIQUIDE = 'Liquide', GLACE = 'De la glace', VAPEUR = 'De la vapeur';

  return {
    id: 'vie-ailleurs',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'La vie sur d’autres planètes',
    classe: 'cycle 4',
    univers: ['dehors', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thèmes « La planète Terre » et « Le vivant et son évolution » : conditions de la vie, place de la Terre dans le système solaire.',

    accroche: {
      texte: 'Le soir, à côté du champ, Clarisse montre à Rachel un point rouge dans le ciel : Mars. Rachel demande : « Y a-t-il de la vie, là-bas ? » ' +
        'Pour répondre, il faut savoir ce qu’une planète doit avoir pour accueillir la vie telle qu’on la connaît.',
      image: { dessin: 'chaine', etapes: ['Trop près de l’étoile : l’eau s’évapore', 'À la bonne distance : l’eau est liquide', 'Trop loin : l’eau gèle'], description: 'Trop près de son étoile, l’eau d’une planète s’évapore ; à la bonne distance, l’eau est liquide ; trop loin, l’eau gèle.' },
    },

    manipulation: {
      image: { dessin: 'thermometre', min: -20, max: 40, valeur: 15, depart: 15, description: 'Un thermomètre à quinze degrés : la température moyenne de la Terre.' },
      etapes: [
        'Tous les êtres vivants connus ont besoin d’eau liquide.',
        'Sur Vénus, il fait environ 460 degrés : l’eau ne peut pas rester liquide. Sur Mars, il fait environ moins 60 degrés : elle gèle, presque partout.',
        'La Terre est à la bonne distance du Soleil. Il lui fallait aussi une atmosphère qui garde un peu de chaleur.',
        'Jusqu’à présent, la vie n’a été trouvée que sur Terre. Les scientifiques la cherchent ailleurs : sur Mars, et autour d’autres étoiles.',
      ],
    },

    decouverte: {
      texte: (c) => 'Autour d’une étoile, une bande permet à l’eau de rester liquide. C’est ' + c.mot('zone') + '. La Terre s’y trouve. ' +
        'Très loin de nous, les astronomes observent ' + c.mot('exoplanetes') + '. Certaines sont dans une telle bande. Jusqu’à présent, la vie n’y a pas été observée. ' +
        'L’astuce : pour chercher la vie, cherche d’abord l’eau liquide.',
    },

    vocabulaire: {
      termes: {
        zone: { sesMots: 'la bonne distance', officiel: 'la zone habitable', lesDeux: 'la bonne distance, que l’on appelle la zone habitable' },
        exoplanetes: { sesMots: 'des planètes d’autres étoiles', officiel: 'des exoplanètes', lesDeux: 'des planètes d’autres étoiles, que l’on appelle des exoplanètes' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la bonne distance, et les planètes d’autres étoiles. ' +
          'Les astronomes ont des mots à eux : je te les dirai la prochaine fois.',
        'Les astronomes disent : la zone habitable, pour la bonne distance. Et les exoplanètes, pour les planètes qui tournent autour d’autres étoiles.',
        'Tu connais les mots officiels : la zone habitable, l’exoplanète et l’atmosphère.',
      ],
    },

    exercices: [
      O.qcm('etat-de-l-eau', 'famille',
        [['À 460 °C, comme sur Vénus', VAPEUR], ['À moins 60 °C, comme sur Mars', GLACE], ['À 15 °C, comme sur Terre', LIQUIDE]].map((v) => [v[0], v[1], 'L’eau gèle à 0 °C et bout à 100 °C : entre les deux, elle est liquide.']),
        (x) => x + ', sous la pression de la Terre, sous quelle forme serait l’eau ?', [LIQUIDE, GLACE, VAPEUR],
        'L’eau gèle à 0 °C et bout à 100 °C.'),
      O.qcm('habitable-ou-pas', 'dehors',
        [['Une planète où l’eau s’évapore tout de suite', NON], ['Une planète où l’eau peut rester liquide', OUI], ['Une planète très loin de son étoile, couverte de glace', NON]].map((v) => [v[0], v[1], 'La zone habitable est la bande où l’eau peut rester liquide : ni trop près de l’étoile, ni trop loin.']),
        (x) => x + ' : que peut-on dire ?', [OUI, NON],
        'Regarde si l’eau peut y rester liquide.'),
      O.qcm('vrai-ou-faux', 'dehors',
        [['La vie a déjà été observée sur Mars.', 'Faux'], ['Tous les êtres vivants connus ont besoin d’eau liquide.', 'Vrai'], ['Une exoplanète tourne autour d’une autre étoile que le Soleil.', 'Vrai'], ['La Terre est la seule planète où la vie est connue.', 'Vrai'], ['Une planète dans la zone habitable est forcément habitée.', 'Faux']].map((v) => [v[0], v[1], 'La vie n’a été observée que sur Terre. La zone habitable est une condition, pas une preuve.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Pour l’instant, la vie n’est connue que sur Terre.'),
      {
        id: 'ecart-de-temperature',
        univers: 'dehors',
        // [température de la Terre, température d'une autre planète]
        versions: [[15, -60], [15, 460], [15, 0], [15, -20], [15, 100], [15, -40]],
        genere(c) {
          const [t, a] = c.alea.choisir(this.versions);
          const e = Math.abs(t - a);
          return {
            enonce: 'La température moyenne de la Terre est de ' + t + ' °C. Celle d’une planète est de ' + O.ecr(a).replace('-', '−') + ' °C. Quel est l’écart entre les deux, en degrés ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Fais la différence, en comptant bien les degrés sous zéro.',
            correction: [a < 0 ? t + ' + ' + -a + ' = ' + e + ' degrés.' : Math.max(t, a) + ' − ' + Math.min(t, a) + ' = ' + e + ' degrés.'],
          };
        },
      },
      {
        id: 'minutes-de-lumiere',
        univers: 'famille',
        // [minutes pour la lumière du Soleil, nombre de voyages]
        versions: [[8, 2], [13, 2], [8, 5], [13, 3], [8, 4], [43, 2]],
        genere(c) {
          const [m, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Depuis une planète, la lumière du Soleil met ' + m + ' minutes pour arriver. Combien de minutes met-elle pour faire ' + n + ' fois ce trajet ?',
            reponse: { type: 'nombre', valeur: m * n },
            aide: 'Calcule ' + m + ' × ' + n + '.',
            aideParlee: 'Multiplie la durée d’un trajet par le nombre de trajets.',
            correction: [m + ' × ' + n + ' = ' + m * n + ' minutes.'],
          };
        },
      },
    ],

    defi: {
      // [température Terre, Mars, Vénus]
      versions: [[15, -60, 460]],
      genere(c) {
        const [t, m, v] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : la température moyenne de la Terre est de ' + t + ' °C. Celle de Mars est de −' + Math.abs(m) + ' °C. Celle de Vénus est de ' + v + ' °C. Sur Terre, l’eau est liquide entre 0 °C et 100 °C.',
          image: { dessin: 'barres', barres: [{ nom: 'Vénus', parts: 8 }, { nom: 'Terre', parts: 2 }, { nom: 'Mars', parts: 1 }], description: 'Trois barres, sans échelle exacte : Vénus est de très loin la plus chaude, puis la Terre, puis Mars, la plus froide.' },
          questions: [
            {
              texte: 'Question 1. Quel est l’écart de température entre la Terre et Mars, en degrés ?',
              reponse: { type: 'nombre', valeur: t - m },
              aide: 'Compte les degrés jusqu’à zéro, puis ceux sous zéro.',
              correction: [t + ' + ' + Math.abs(m) + ' = ' + (t - m) + ' degrés.'],
            },
            {
              texte: 'Question 2. Sur quelle planète l’eau est-elle liquide à cette température moyenne ?',
              reponse: O.choix(c.alea, 'La Terre', ['La Terre', 'Mars', 'Vénus']),
              aide: 'Cherche celle qui est entre les deux températures données.',
              correction: ['Seule la température de la Terre est entre 0 °C et 100 °C.', 'Réponse : La Terre.'],
            },
            {
              texte: 'Question 3. Un élève dit : « Une planète à la bonne distance de son étoile contient forcément de la vie. » Explique pourquoi cette phrase est fausse.',
              correction: ['La bonne distance permet seulement à l’eau de rester liquide : c’est une condition, pas une preuve.', 'Jusqu’à présent, la vie n’a été observée que sur Terre.'],
              grille: ['As-tu dit que c’est une condition, sans être une preuve ?', 'As-tu parlé de l’eau liquide ?', 'As-tu dit que la vie n’a été observée que sur Terre ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Eau liquide, bonne distance, atmosphère : tu sais ce qu’il faut chercher dans le ciel.',
    carte: ['etat-de-l-eau', 'habitable-ou-pas', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['ecart-de-temperature', 'minutes-de-lumiere'], defi: true },
    automatismes: [
      {
        id: 'eau-rapide',
        versions: [[-5, GLACE], [40, LIQUIDE], [120, VAPEUR]],
        genere(c) { const [t, b] = c.alea.choisir(this.versions); return { enonce: 'L’eau, à ' + String(t).replace('-', '−') + ' °C, sous la pression de la Terre ?', reponse: O.choix(c.alea, b, [LIQUIDE, GLACE, VAPEUR]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Maroc, en juillet 2011, une rare météorite venue de Mars est tombée dans le sud du pays.',
    prenoms: ['Clarisse', 'Rachel'],
  };
});
