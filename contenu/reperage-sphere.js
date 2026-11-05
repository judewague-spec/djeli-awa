/* Notion 32 du bloc « Mesures, géométrie et espace » : se repérer sur la sphère, latitude et longitude. Le globe de Rebecca : Yaoundé, Paris, Le Cap.
   Format : contenu/GABARIT-NOTION.md. Coordonnées arrondies au degré : atlas courants ; le résultat des exercices ne dépend que des nombres écrits. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r0 = (x) => Math.round(x);
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'reperage-sphere',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Latitude et longitude',
    classe: '3e',
    univers: ['dehors', 'appareils'],

    accroche: {
      texte: 'Rebecca veut envoyer un colis de Paris à Yaoundé. Elle tourne un globe, et cherche. Comment dire où est une ville, sur une boule sans bord ni coin ? ' +
        'On a tracé des lignes. Des cercles qui font le tour de la Terre, comme des ceintures, et des demi-cercles d’un pôle à l’autre. Deux angles suffisent.',
      image: { dessin: 'solide', forme: 'boule', r: 4, description: 'La Terre vue comme une boule. L’équateur fait le tour, au milieu, avec sa moitié arrière en pointillés. Yaoundé est à 4 degrés au nord de l’équateur, et à 12 degrés à l’est du méridien de Greenwich.' },
    },

    manipulation: {
      etapes: [
        'L’équateur coupe la Terre en deux. La latitude dit à quel angle on est au-dessus, ou en dessous : de 0 à 90 degrés, nord ou sud.',
        'Le méridien de Greenwich va d’un pôle à l’autre, en passant près de Londres. La longitude dit à quel angle on est à l’est ou à l’ouest : de 0 à 180 degrés.',
        'Yaoundé : 4 degrés nord, 12 degrés est. Paris : 49 degrés nord, 2 degrés est.',
        'Les deux villes ont des longitudes assez proches, mais des latitudes bien différentes.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un cercle fait le tour de la Terre à une hauteur donnée : c’est ' + c.mot('parallele') + '. Le demi-cercle d’un pôle à l’autre, c’est ' + c.mot('meridien') + '. ' +
        'L’astuce : la latitude dit à quelle hauteur on est, nord ou sud. La longitude dit de quel côté, est ou ouest. Et on donne toujours la latitude en premier.',
    },

    vocabulaire: {
      termes: {
        parallele: { sesMots: 'une ceinture de la Terre', officiel: 'un parallèle', lesDeux: 'une ceinture de la Terre, que l’on appelle un parallèle' },
        meridien: { sesMots: 'une ligne de pôle à pôle', officiel: 'un méridien', lesDeux: 'une ligne de pôle à pôle, que l’on appelle un méridien' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une ceinture de la Terre, et une ligne de pôle à pôle. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : un parallèle, pour une ceinture de la Terre. Et une ligne de pôle à pôle s’appelle un méridien.',
        'Tu connais les mots officiels : un parallèle, et un méridien.',
      ],
    },

    exercices: [
      Q('lire-latitude', 'dehors',
        [['Yaoundé (4° N ; 12° E)', '4° N'], ['Paris (49° N ; 2° E)', '49° N'], ['Le Cap (34° S ; 18° E)', '34° S'], ['Lima (12° S ; 77° O)', '12° S']],
        (x) => 'Une ville a pour coordonnées ' + x.replace(/^.*\(/, '(') + '. Quelle est sa latitude ?', ['4° N', '49° N', '34° S', '12° S'],
        'La latitude est le premier angle : nord ou sud.',
        'On donne toujours la latitude en premier.'),
      Q('lire-longitude', 'dehors',
        [['Yaoundé (4° N ; 12° E)', '12° E'], ['Paris (49° N ; 2° E)', '2° E'], ['Le Cap (34° S ; 18° E)', '18° E'], ['Lima (12° S ; 77° O)', '77° O']],
        (x) => 'Une ville a pour coordonnées ' + x.replace(/^.*\(/, '(') + '. Quelle est sa longitude ?', ['12° E', '2° E', '18° E', '77° O'],
        'La longitude est le second angle : est ou ouest.',
        'La longitude vient en second.'),
      {
        id: 'ecart-de-latitude',
        univers: 'appareils',
        // [latitude 1 signée, latitude 2 signée] : nord positif
        versions: [[49, 4], [4, -34], [49, -34], [12, -12], [30, 10], [60, 45]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const f = (x) => Math.abs(x) + '° ' + (x >= 0 ? 'N' : 'S');
          return {
            enonce: 'Une ville est à la latitude ' + f(a) + ', une autre à ' + f(b) + ', sur le même méridien. Quel est l’écart de latitude, en degrés ?',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Si elles sont du même côté de l’équateur, on enlève. Sinon, on ajoute.',
            correction: [a * b > 0 ? 'Même côté : ' + Math.abs(a) + ' − ' + Math.abs(b) + ' = ' + (a - b) + '°.' : 'De part et d’autre : ' + Math.abs(a) + ' + ' + Math.abs(b) + ' = ' + (a - b) + '°.'],
          };
        },
      },
      {
        id: 'distance-sur-meridien',
        univers: 'appareils',
        // écart en degrés, on prend 40 000 km pour le tour de la Terre
        versions: [[45], [90], [9], [36], [18], [72]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          const d = r0((40000 * a) / 360);
          return {
            enonce: 'Le tour de la Terre mesure environ 40 000 km. Deux villes du même méridien ont un écart de latitude de ' + a + '°. Quelle distance les sépare, en km, à l’unité près ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'La distance est proportionnelle à l’angle : fais un produit en croix avec le tour complet.',
            correction: ['40 000 × ' + a + ' ÷ 360 ≈ ' + d + ' km.'],
          };
        },
      },
      Q('quelle-ligne', 'dehors',
        [['fait le tour de la Terre, parallèlement à l’équateur, sans être l’équateur', 'Un parallèle'], ['va du pôle Nord au pôle Sud', 'Un méridien'], ['coupe la Terre en deux moitiés égales, nord et sud', 'L’équateur'], ['sert de départ à la longitude, et passe près de Londres', 'Un méridien']],
        (x) => 'Quelle ligne ' + x + ' ?', ['Un parallèle', 'Un méridien', 'L’équateur'],
        'Une ceinture, ou une ligne de pôle à pôle ?',
        'L’équateur est la grande ceinture du milieu. Les méridiens vont d’un pôle à l’autre, et Greenwich en est un.'),
    ],

    defi: {
      // [lat A, lat B] en degrés N, même méridien
      versions: [[49, 4], [60, 15], [50, 5], [40, 4]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        const e = a - b, d = r0((40000 * e) / 360);
        const ecrit = d + ' km';
        return {
          enonce: 'On assimile la Terre à une boule dont un grand cercle mesure 40 000 km. La ville A a pour latitude ' + a + '° N, et la ville B a pour latitude ' + b + '° N. Elles sont supposées sur le même méridien.',
          image: { dessin: 'solide', forme: 'boule', r: 4, description: 'La Terre en boule, avec l’équateur. La ville A est à ' + a + ' degrés au nord de l’équateur, la ville B à ' + b + ' degrés, sur le même demi-cercle de pôle à pôle.' },
          questions: [
            {
              texte: 'Question 1. Quel est l’écart de latitude entre A et B, en degrés ?',
              reponse: { type: 'nombre', valeur: e },
              aide: 'Elles sont du même côté de l’équateur.',
              correction: [a + ' − ' + b + ' = ' + e + '°.'],
            },
            {
              texte: 'Question 2. Calculer la distance entre A et B le long du méridien, en km, à l’unité près.',
              reponse: { type: 'nombre', valeur: d },
              aide: 'Proportionnalité avec le tour complet.',
              correction: ['40 000 × ' + e + ' ÷ 360 ≈ ' + ecr(d) + ' km.'],
            },
            {
              texte: 'Question 3. Un avion vole à 800 km/h, en ligne droite le long du méridien. Combien de temps met-il, en heures, arrondi au dixième ?',
              reponse: { type: 'nombre', valeur: Math.round((d / 800) * 10) / 10 },
              aide: 'La durée, c’est la distance divisée par la vitesse.',
              correction: [ecrit + ' ÷ 800 km/h ≈ ' + ecr(Math.round((d / 800) * 10) / 10) + ' h.'],
            },
            {
              texte: 'Question 4. Expliquer pourquoi on peut utiliser la proportionnalité pour calculer cette distance.',
              correction: ['Sur un cercle, la longueur d’un arc est proportionnelle à son angle au centre.', 'Un tour de 360° correspond à 40 000 km.'],
              grille: ['As-tu parlé d’un arc de cercle ?', 'As-tu relié l’angle et la longueur ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Deux angles, et tu trouves ta place sur toute la Terre.',
    carte: ['lire-latitude', 'lire-longitude', 'quelle-ligne'],
    papierDuSoir: { exercices: ['ecart-de-latitude', 'distance-sur-meridien'], defi: true },
    automatismes: [
      {
        id: 'ecart-angles',
        versions: [[49, 4], [60, 30], [45, 15], [50, 8]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Al-Biruni a calculé la différence de longitude entre Bagdad, en Irak, et Kath, grâce à une éclipse de Lune.',
    prenoms: ['Rebecca'],
  };
});
