/* Notion 16 du bloc de technologie « Les objets et la société » : mesurer une performance, l'autonomie et la vitesse. La trottinette d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;

  return {
    id: 'mesurer-performance',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Mesurer une performance : autonomie et vitesse',
    classe: '4e',
    univers: ['dehors', 'appareils', 'commerce'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 32) : les critères de performance d’un objet, grandeurs mesurables (vitesse, autonomie énergétique).',

    accroche: {
      texte: 'Aminata veut savoir si sa trottinette électrique tient ses promesses. La boîte dit : « 20 kilomètres par heure, 25 kilomètres avec une charge. » ' +
        'Avec Moussa, elle chronomètre un trajet bien mesuré, puis roule jusqu’à ce que la batterie soit vide. Les chiffres de la boîte sont-ils vrais ?',
      image: { dessin: 'chaine', etapes: ['Mesurer une distance', 'Mesurer le temps au chronomètre', 'Calculer la vitesse', 'Rouler jusqu’à la batterie vide'], description: 'Mesurer une distance, mesurer le temps au chronomètre, calculer la vitesse, puis rouler jusqu’à la batterie vide.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Distance en kilomètres', 'Temps en heures', 'Vitesse : distance divisée par temps'], description: 'Distance en kilomètres, temps en heures, vitesse égale distance divisée par temps.' },
      etapes: [
        'Pour la vitesse, on mesure une distance avec un mètre ou une carte, et un temps avec un chronomètre.',
        'Vitesse égale distance divisée par temps : en kilomètres par heure, ou en mètres par seconde.',
        'Pour la durée de la batterie, on part avec une batterie pleine.',
        'On note la distance ou le temps, jusqu’à ce qu’elle soit vide.',
        'On compare ensuite les mesures avec ce que promet la boîte.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ce qu’un objet sait faire, et que l’on peut mesurer, c’est ' + c.mot('performance') + ' : par exemple sa vitesse. ' +
        'Ce qu’il tient avec une charge de batterie, c’est ' + c.mot('autonomie') + '. Vitesse égale distance divisée par temps. ' +
        'L’astuce : une performance se mesure avec un appareil, puis se compare à ce qui est promis.',
    },

    vocabulaire: {
      termes: {
        performance: { sesMots: 'ce que l’objet sait faire, mesuré', officiel: 'une performance', lesDeux: 'ce que l’objet sait faire, mesuré, que les techniciens appellent une performance' },
        autonomie: { sesMots: 'ce qu’il tient avec une charge', officiel: 'l’autonomie', lesDeux: 'ce qu’il tient avec une charge, que les techniciens appellent l’autonomie' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce que l’objet sait faire, mesuré, et ce qu’il tient avec une charge. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : une performance, comme la vitesse, et l’autonomie, la distance ou le temps tenu avec une charge.',
        'Tu connais les mots officiels : la performance, la vitesse et l’autonomie.',
      ],
    },

    exercices: [
      {
        id: 'vitesse',
        univers: 'dehors',
        // [distance en km, temps en heures]
        versions: [[10, 0.5], [6, 0.5], [15, 1], [9, 0.5], [12, 1], [5, 0.25]],
        genere(c) {
          const [d, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Aminata parcourt ' + d + ' km en ' + ecr(t) + ' heure' + (t > 1 ? 's' : '') + '. Quelle est sa vitesse moyenne, en kilomètres par heure ?',
            reponse: { type: 'nombre', valeur: d / t },
            aide: 'Calcule ' + d + ' ÷ ' + ecr(t) + '.',
            aideParlee: 'Divise la distance par le temps.',
            correction: [d + ' ÷ ' + ecr(t) + ' = ' + ecr(d / t) + ' km par heure.'],
          };
        },
      },
      {
        id: 'distance-possible',
        univers: 'dehors',
        // [vitesse en km/h, autonomie en heures]
        versions: [[20, 1], [15, 2], [20, 1.5], [12, 2], [18, 1]],
        genere(c) {
          const [v, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'La trottinette roule à ' + v + ' km par heure, et sa batterie tient ' + ecr(h) + ' heure' + (h > 1 ? 's' : '') + '. Quelle distance peut-elle parcourir avec une charge ?',
            reponse: { type: 'nombre', valeur: v * h },
            aide: 'Calcule ' + v + ' × ' + ecr(h) + '.',
            aideParlee: 'Multiplie la vitesse par la durée de la batterie.',
            correction: [v + ' × ' + ecr(h) + ' = ' + ecr(v * h) + ' km.'],
          };
        },
      },
      {
        id: 'ecart-promesse',
        univers: 'commerce',
        // [autonomie promise en km, autonomie mesurée en km]
        versions: [[25, 20], [30, 24], [40, 32], [20, 15], [50, 45]],
        genere(c) {
          const [p, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'La boîte promet ' + p + ' km avec une charge. Aminata mesure ' + m + ' km. Combien de kilomètres manque-t-il ?',
            reponse: { type: 'nombre', valeur: p - m },
            aide: 'Calcule ' + p + ' − ' + m + '.',
            aideParlee: 'Soustrais la distance mesurée à la distance promise.',
            correction: [p + ' − ' + m + ' = ' + (p - m) + ' km.'],
          };
        },
      },
      O.qcm('quel-appareil', 'appareils',
        [['un temps de trajet', 'Un chronomètre'], ['une distance dans la cour', 'Un mètre ruban'], ['la masse de la trottinette', 'Une balance'], ['une tension de batterie', 'Un voltmètre']],
        (x) => 'Quel appareil faut-il pour mesurer ' + x + ' ?', ['Un chronomètre', 'Un mètre ruban', 'Une balance', 'Un voltmètre'],
        'Temps, distance, masse ou tension ?'),
      O.qcm('quelle-grandeur', 'appareils',
        [['« Elle tient 25 kilomètres avec une charge. »', 'L’autonomie'], ['« Elle roule à 20 kilomètres par heure. »', 'La vitesse'], ['« La lampe éclaire 6 heures sans être rechargée. »', 'L’autonomie'], ['« Le scooter monte à 45 kilomètres par heure. »', 'La vitesse']],
        (x) => x + ' De quelle performance parle-t-on ?', ['L’autonomie', 'La vitesse', 'La masse'],
        'Ce qu’il tient avec une charge, ou à quelle allure il va ?'),
    ],

    defi: {
      // [distance chronométrée en km, temps en heures, autonomie promise en km, autonomie mesurée en km]
      versions: [[10, 0.5, 25, 20], [6, 0.5, 30, 24], [9, 0.5, 40, 32], [15, 1, 20, 15]],
      genere(c) {
        const [d, t, p, m] = c.alea.choisir(this.versions);
        const v = d / t;
        return {
          enonce: 'Rebecca teste la trottinette d’Aminata. Sur un trajet de ' + d + ' km, le chronomètre indique ' + ecr(t) + ' heure' + (t > 1 ? 's' : '') + '. ' +
            'La boîte promet une autonomie de ' + p + ' km ; avec une batterie pleine, Rebecca a pu rouler ' + m + ' km.',
          questions: [
            {
              texte: 'Question 1. Calcule la vitesse moyenne, en kilomètres par heure.',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Divise la distance par le temps.',
              correction: [d + ' ÷ ' + ecr(t) + ' = ' + ecr(v) + ' km par heure.'],
            },
            {
              texte: 'Question 2. Combien de kilomètres d’autonomie manque-t-il par rapport à la promesse ?',
              reponse: { type: 'nombre', valeur: p - m },
              aide: 'Soustrais la distance mesurée à la distance promise.',
              correction: [p + ' − ' + m + ' = ' + (p - m) + ' km.'],
            },
            {
              texte: 'Question 3. Quels appareils de mesure Rebecca a-t-elle utilisés ? La promesse de la boîte est-elle tenue ?',
              correction: ['Un chronomètre pour le temps, et une distance connue ou un compteur pour les kilomètres.', 'L’autonomie mesurée, ' + m + ' km, est plus faible que les ' + p + ' km promis : la promesse n’est pas tout à fait tenue.'],
              grille: ['As-tu cité au moins un appareil de mesure ?', 'As-tu comparé la mesure à la promesse ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un chronomètre, une distance, une batterie pleine : tu sais vérifier les promesses d’un objet.',
    carte: ['vitesse', 'distance-possible', 'quel-appareil'],
    papierDuSoir: { exercices: ['vitesse', 'ecart-promesse'], defi: true },
    automatismes: [
      {
        id: 'vitesse-rapide',
        versions: [[10, 0.5], [20, 1], [6, 0.5], [30, 2]],
        genere(c) { const [d, t] = c.alea.choisir(this.versions); return { enonce: d + ' km en ' + ecr(t) + ' h : combien de km par heure ?', reponse: { type: 'nombre', valeur: d / t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Maroc, le train à grande vitesse Al Boraq roule à trois cent vingt kilomètres par heure. C’est le premier projet de ce type en Afrique.',
    prenoms: ['Aminata', 'Moussa', 'Rebecca'],
  };
});
