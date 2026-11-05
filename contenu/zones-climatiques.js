/* Notion 3 du bloc SVT « Planète Terre, environnement, action humaine » : les zones climatiques. La carte postale de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ecr = O.ecr;
  const somme = (l) => l.reduce((a, b) => a + b, 0);
  const ZONES = ['La zone polaire', 'La zone tempérée', 'La zone équatoriale', 'La zone tropicale', 'La zone désertique'];

  return {
    id: 'zones-climatiques',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Les zones climatiques',
    classe: 'cycle 4',
    univers: ['dehors', 'champetre'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : les grandes zones climatiques, la latitude et l’inclinaison de l’axe de la Terre.',

    accroche: {
      texte: 'Une carte arrive de très loin. Clarisse écrit : « Ici, il fait chaud et il pleut tous les mois. » ' +
        'Aminata prépare un exposé. Elle cherche pourquoi le temps habituel change d’un bout à l’autre de la Terre.',
      image: { dessin: 'tableur', colonnes: ['Lieu', 'Température (°C)', 'Pluie par mois (mm)'], lignes: [['Lieu de la carte', 26, 250]], description: 'Un tableau. Le lieu de la carte postale : 26 degrés, et 250 millimètres de pluie par mois.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Mois', 'Janvier', 'Avril', 'Juillet', 'Octobre'], lignes: [['Température (°C)', 26, 27, 26, 25], ['Pluie (mm)', 250, 200, 300, 280]], description: 'Un tableau de quatre mois. Températures : 26, 27, 26 et 25 degrés. Pluie : 250, 200, 300 et 280 millimètres.' },
      etapes: [
        'Aminata lit la fiche d’un lieu inconnu : quatre mois, avec la température et la pluie.',
        'Toute l’année, il fait très chaud : au moins 25 degrés chaque mois.',
        'Et il pleut beaucoup, tous les mois : pas de saison sèche, pas de saison froide.',
        'Ce lieu est près de l’équateur, la ligne du milieu de la Terre. Là, les rayons du Soleil arrivent bien droits.',
        'Plus on s’éloigne de l’équateur, plus les rayons arrivent penchés, et plus il fait frais. Près des pôles, il fait très froid.',
        'La Terre est aussi penchée sur son axe : c’est pour cela que les saisons existent loin de l’équateur.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde où se trouve un lieu entre l’équateur et un pôle : c’est ' + c.mot('latitude') + '. ' +
        'Regarde les groupes de lieux au temps habituel semblable : ce sont ' + c.mot('zones') + '. ' +
        'Le temps équatorial est chaud et pluvieux toute l’année. Le temps tropical est chaud, avec une saison sèche. Le temps désertique est très sec. ' +
        'Le temps tempéré a quatre saisons. Le temps polaire est froid toute l’année. L’astuce : plus on s’éloigne de l’équateur, plus il fait frais.',
    },

    vocabulaire: {
      termes: {
        latitude: { sesMots: 'la hauteur sur la carte', officiel: 'la latitude', lesDeux: 'la hauteur sur la carte, que l’on appelle la latitude' },
        zones: { sesMots: 'les bandes de temps pareil', officiel: 'les zones climatiques', lesDeux: 'les bandes de temps pareil, que l’on appelle les zones climatiques' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la hauteur sur la carte, et les bandes de temps pareil. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la latitude, pour la hauteur sur la carte. Les bandes de temps pareil s’appellent les zones climatiques.',
        'Tu connais les mots officiels : la latitude, et les zones climatiques, polaire, tempérée, tropicale, équatoriale et désertique.',
      ],
    },

    exercices: [
      O.qcm('quelle-zone', 'dehors',
        [
          ['Très froid toute l’année, avec de la glace et peu de pluie.', ZONES[0], 'Un froid constant et de la glace : c’est la zone polaire.'],
          ['Chaud et très pluvieux tous les mois, sans saison sèche.', ZONES[2], 'Chaud et pluvieux toute l’année : c’est la zone équatoriale.'],
          ['Quatre saisons : étés doux, hivers frais, pluie toute l’année.', ZONES[1], 'Quatre saisons bien marquées : c’est la zone tempérée.'],
          ['Presque jamais de pluie, des jours très chauds et des nuits fraîches.', ZONES[4], 'Très sec : c’est la zone désertique.'],
          ['Toujours chaud, avec une saison des pluies et une saison sèche.', ZONES[3], 'Chaud avec une saison sèche : c’est la zone tropicale.'],
        ],
        (x) => x + ' Dans quelle zone climatique est-on ?', ZONES,
        'Regarde la chaleur, puis la pluie, puis les saisons.'),
      O.qcm('vrai-ou-faux', 'dehors',
        [
          ['Plus on s’éloigne de l’équateur, plus il fait froid, en général.', 'Vrai', 'Les rayons du Soleil arrivent de plus en plus penchés : ils chauffent moins.'],
          ['À l’équateur, les rayons du Soleil arrivent très penchés.', 'Faux', 'À l’équateur, les rayons arrivent presque droits : ils chauffent fort.'],
          ['Les saisons existent parce que la Terre est penchée sur son axe.', 'Vrai', 'Selon la saison, un côté de la Terre reçoit des rayons plus droits.'],
          ['La zone polaire est la plus proche de l’équateur.', 'Faux', 'La zone polaire est près des pôles, très loin de l’équateur.'],
        ],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Pense à l’équateur : les rayons y arrivent droits, donc il y fait chaud.'),
      {
        id: 'ecart-saisons',
        univers: 'champetre',
        // [température moyenne de juillet, température moyenne de janvier] en °C
        versions: [[22, 4], [20, 3], [24, 6], [18, 2], [25, 5]],
        genere(c) {
          const [e, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un lieu de la zone tempérée, la température moyenne est de ' + e + ' °C en juillet et de ' + h + ' °C en janvier. Quel est l’écart entre l’été et l’hiver, en °C ?',
            reponse: { type: 'nombre', valeur: e - h },
            aide: 'Enlève la température d’hiver à la température d’été.',
            correction: [e + ' − ' + h + ' = ' + (e - h) + ' °C d’écart.'],
          };
        },
      },
      {
        id: 'pluie-annuelle',
        univers: 'champetre',
        // pluie de chaque trimestre, en mm
        versions: [[450, 550, 500, 600], [550, 650, 600, 700], [650, 750, 700, 800], [400, 500, 450, 550], [500, 600, 550, 650]],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un lieu chaud et très pluvieux, il tombe ' + p[0] + ' mm de pluie au premier trimestre, ' + p[1] + ' au deuxième, ' + p[2] + ' au troisième et ' + p[3] + ' au quatrième. Combien de millimètres de pluie tombent en un an ?',
            reponse: { type: 'nombre', valeur: somme(p) },
            aide: 'Additionne la pluie des quatre trimestres.',
            correction: [p.join(' + ') + ' = ' + somme(p) + ' mm en un an.'],
          };
        },
      },
      {
        id: 'plus-pres-equateur',
        univers: 'dehors',
        // [janvier A, juillet A, janvier B, juillet B] en °C
        versions: [[26, 26, 4, 20], [8, 22, 27, 27], [3, 18, 25, 26], [27, 28, 10, 24]],
        genere(c) {
          const [a1, a2, b1, b2] = c.alea.choisir(this.versions);
          const plage = (x, y) => (x === y ? x + ' °C toute l’année' : 'de ' + Math.min(x, y) + ' à ' + Math.max(x, y) + ' °C selon la saison');
          const juste = a1 + a2 > b1 + b2 ? 'Le lieu A' : 'Le lieu B';
          return {
            enonce: 'Lieu A : ' + plage(a1, a2) + '. Lieu B : ' + plage(b1, b2) + '. Lequel est le plus proche de l’équateur ?',
            reponse: O.choix(c.alea, juste, ['Le lieu A', 'Le lieu B']),
            aide: 'Plus un lieu est proche de l’équateur, plus il y fait chaud toute l’année.',
            correction: ['Lieu A : ' + plage(a1, a2) + '. Lieu B : ' + plage(b1, b2) + '.', 'Le lieu où il fait le plus chaud toute l’année est le plus proche de l’équateur.', 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [températures de janvier, avril, juillet, octobre (°C), pluie des mêmes mois (mm), zone]
      versions: [
        [[26, 27, 26, 25], [250, 200, 300, 280], ZONES[2], 'Environ 26 °C et de la pluie tous les mois : c’est la zone équatoriale.'],
        [[4, 12, 22, 14], [50, 45, 40, 60], ZONES[1], 'De 4 à 22 °C selon la saison et de la pluie toute l’année : c’est la zone tempérée.'],
        [[14, 26, 34, 26], [5, 2, 0, 3], ZONES[4], 'Très chaud en été et presque aucune pluie : c’est la zone désertique.'],
        [[27, 30, 27, 28], [10, 100, 350, 150], ZONES[3], 'Toujours chaud, avec une saison sèche et une saison des pluies : c’est la zone tropicale.'],
      ],
      genere(c) {
        const [t, p, zone, indices] = c.alea.choisir(this.versions);
        const m = somme(t) / 4;
        return {
          enonce: 'Rebecca prépare un exposé sur un lieu inconnu. Elle a relevé quatre mois : janvier, avril, juillet et octobre. Températures : ' + t.join(' °C, ') + ' °C. Pluie : ' + p.join(' mm, ') + ' mm.',
          image: { dessin: 'tableur', colonnes: ['Mois', 'Janvier', 'Avril', 'Juillet', 'Octobre'], lignes: [['Température (°C)', ...t], ['Pluie (mm)', ...p]], description: 'Un tableau de quatre mois. Températures : ' + t.join(', ') + ' degrés. Pluie : ' + p.join(', ') + ' millimètres.' },
          questions: [
            {
              texte: 'Question 1. Calcule la température moyenne de ces quatre mois, en °C.',
              reponse: { type: 'nombre', valeur: m },
              aide: 'Additionne les quatre températures, puis divise par 4.',
              correction: [t.join(' + ') + ' = ' + somme(t) + '.', somme(t) + ' ÷ 4 = ' + ecr(m) + ' °C.'],
            },
            {
              texte: 'Question 2. Dans quelle zone climatique se trouve ce lieu ?',
              reponse: O.choix(c.alea, zone, ZONES.filter((z) => z !== zone).slice(0, 2)),
              aide: 'Regarde si le lieu est chaud ou frais, et s’il pleut beaucoup, peu, ou seulement à certaines saisons.',
              correction: [indices, 'Réponse : ' + zone + '.'],
            },
            {
              texte: 'Question 3. Explique ton choix de la question 2 en deux phrases, avec la température et la pluie.',
              correction: ['Pour ce lieu : ' + indices.charAt(0).toLowerCase() + indices.slice(1), 'Je donne la température et la pluie, puis je les relie à la zone choisie.'],
              grille: ['As-tu cité la température (chaude, fraîche ou froide) ?', 'As-tu cité la pluie (abondante, rare, ou selon les saisons) ?', 'As-tu relié ces deux indices à la zone choisie ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu lis un climat comme une vraie voyageuse. Une température, une pluie, et tu sais où tu es sur la Terre.',
    carte: ['quelle-zone', 'vrai-ou-faux', 'plus-pres-equateur'],
    papierDuSoir: { exercices: ['ecart-saisons', 'pluie-annuelle'], defi: true },
    automatismes: [
      {
        id: 'chaud-ou-froid',
        versions: [['Près de l’équateur', 'Chaud'], ['Près d’un pôle', 'Froid']],
        genere(c) { const [l, b] = c.alea.choisir(this.versions); return { enonce: l + ', fait-il chaud ou froid toute l’année ?', reponse: O.choix(c.alea, b, ['Chaud', 'Froid']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Namibie, le désert du Namib est presque sans pluie, mais le brouillard de l’océan apporte l’eau.',
    prenoms: ['Aminata', 'Clarisse', 'Rebecca'],
  };
});
