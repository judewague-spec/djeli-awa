/* Notion 3 du bloc « Proportionnalité, pourcentages et fonctions » : la vitesse. Le vélo de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'grandeur-vitesse',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'La vitesse',
    classe: '4e',
    univers: ['dehors', 'danses'],

    accroche: {
      texte: 'Moussa va au marché à vélo. Il fait 30 kilomètres en 2 heures. Aminata, à moto, fait 40 kilomètres en 1 heure. Qui va le plus vite ? Pour comparer, ils calculent la distance faite en une seule heure. ' +
        'C’est le chiffre qu’affiche le compteur d’un scooter.',
      image: { dessin: 'tableur', colonnes: ['Durée (h)', 'Moussa (km)', 'Aminata (km)'], lignes: [[1, 15, 40], [2, 30, 80]], description: 'En 1 heure, Moussa fait 15 kilomètres, et Aminata 40. En 2 heures, Moussa fait 30 kilomètres, et Aminata 80.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['30 km en 2 heures', '30 ÷ 2 = 15', '15 km en 1 heure'], description: 'Trente kilomètres en deux heures ; trente divisé par deux égale quinze ; donc quinze kilomètres en une heure.' },
      etapes: [
        'Pour Moussa : 30 km ÷ 2 h = 15 kilomètres en une heure.',
        'À cette allure régulière, la distance est proportionnelle à la durée. Une heure de plus, 15 km de plus.',
        'Si l’on connaît cette allure et la durée : distance = allure × durée.',
        'Si l’on connaît la distance et l’allure : durée = distance ÷ allure.',
        'Attention aux minutes : 30 minutes, c’est 0,5 heure. Et 15 minutes, 0,25 heure.',
      ],
    },

    decouverte: {
      texte: (c) => 'La distance faite en une heure s’appelle ' + c.mot('vitesse') + '. On la trouve en divisant la distance par la durée : v égale d divisé par t. ' +
        'On l’écrit en kilomètres par heure. Elle relie deux grandeurs : c’est ' + c.mot('composee') + '. ' +
        'L’astuce : les unités te donnent le calcul. Des kilomètres divisés par des heures.',
    },

    vocabulaire: {
      termes: {
        vitesse: { sesMots: 'l’allure', officiel: 'la vitesse moyenne', lesDeux: 'l’allure, que les matheux appellent la vitesse moyenne' },
        composee: { sesMots: 'une grandeur en deux morceaux', officiel: 'une grandeur composée', lesDeux: 'une grandeur en deux morceaux, que les matheux appellent une grandeur composée' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’allure, et la grandeur en deux morceaux. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la vitesse moyenne, pour l’allure. Et une grandeur composée, pour la grandeur en deux morceaux. Elle s’écrit en kilomètres par heure.',
        'Tu connais les mots officiels : la vitesse moyenne, le kilomètre par heure, et la grandeur composée.',
      ],
    },

    exercices: [
      {
        id: 'calculer-la-vitesse',
        univers: 'dehors',
        // [distance en km, durée en h]
        versions: [[30, 2], [45, 3], [100, 4], [60, 5], [12, 3], [150, 2]],
        genere(c) {
          const [d, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa parcourt ' + d + ' km en ' + t + ' h. Quelle est sa vitesse moyenne, en km/h ?',
            reponse: { type: 'nombre', valeur: d / t },
            aide: 'Calcule ' + d + ' ÷ ' + t + '.',
            aideParlee: 'Divise la distance par la durée.',
            correction: [d + ' ÷ ' + t + ' = ' + ecr(d / t) + ' km/h.'],
          };
        },
      },
      {
        id: 'calculer-la-distance',
        univers: 'dehors',
        // [vitesse en km/h, durée en h]
        versions: [[15, 3], [50, 2], [80, 1.5], [12, 4], [90, 0.5], [60, 2.5]],
        genere(c) {
          const [v, t] = c.alea.choisir(this.versions);
          const d = r2(v * t);
          return {
            enonce: 'Aminata roule à ' + v + ' km/h pendant ' + ecr(t) + ' h. Quelle distance parcourt-elle, en km ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Calcule ' + v + ' × ' + ecr(t) + '.',
            aideParlee: 'Multiplie la vitesse par la durée.',
            correction: [v + ' × ' + ecr(t) + ' = ' + ecr(d) + ' km.'],
          };
        },
      },
      {
        id: 'calculer-la-duree',
        univers: 'dehors',
        // [distance en km, vitesse en km/h]
        versions: [[60, 20], [150, 50], [45, 15], [200, 80], [30, 12], [240, 60]],
        genere(c) {
          const [d, v] = c.alea.choisir(this.versions);
          const t = r2(d / v);
          return {
            enonce: 'Un car roule à ' + v + ' km/h. Il doit parcourir ' + d + ' km. Combien d’heures dure le trajet ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + d + ' ÷ ' + v + '.',
            aideParlee: 'Divise la distance par la vitesse.',
            correction: [d + ' ÷ ' + v + ' = ' + ecr(t) + ' h.'],
          };
        },
      },
      {
        id: 'minutes-en-heures',
        univers: 'danses',
        // [vitesse, minutes]
        versions: [[12, 30], [60, 15], [8, 45], [20, 30], [40, 15], [6, 30]],
        genere(c) {
          const [v, m] = c.alea.choisir(this.versions);
          const h = m / 60, d = r2(v * h);
          return {
            enonce: 'Rebecca se déplace à ' + v + ' km/h pendant ' + m + ' minutes. Quelle distance fait-elle, en km ?',
            reponse: { type: 'nombre', valeur: d },
            aide: m + ' minutes font ' + ecr(h) + ' heure. Calcule ' + v + ' × ' + ecr(h) + '.',
            aideParlee: 'Écris d’abord la durée en heures, puis multiplie par la vitesse.',
            correction: [m + ' ÷ 60 = ' + ecr(h) + ' h.', v + ' × ' + ecr(h) + ' = ' + ecr(d) + ' km.'],
          };
        },
      },
      Q('quelle-unite', 'dehors',
        [['Pour exprimer la vitesse d’une voiture', 'km/h'], ['Pour exprimer une distance', 'km'], ['Pour exprimer une durée', 'h']],
        (x) => x + ', quelle unité choisis-tu ?', ['km/h', 'km', 'h'],
        'La vitesse relie une distance à une durée.',
        'Une vitesse se compte en kilomètres par heure, une distance en kilomètres, une durée en heures.'),
    ],

    defi: {
      // [distance aller, durée en h à vélo, vitesse de la moto]
      versions: [[30, 2, 60], [24, 2, 48], [45, 3, 90], [36, 3, 72]],
      genere(c) {
        const [d, t, m] = c.alea.choisir(this.versions);
        const v = d / t, tm = d / m;
        return {
          enonce: 'Le village de Moussa est à ' + d + ' km du marché. À vélo, il met ' + t + ' h pour y aller. Aminata fait le même trajet à moto, à la vitesse moyenne de ' + m + ' km/h.',
          questions: [
            {
              texte: 'Question 1. Quelle est la vitesse moyenne de Moussa, en km/h ?',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Divise la distance par la durée.',
              correction: [d + ' ÷ ' + t + ' = ' + ecr(v) + ' km/h.'],
            },
            {
              texte: 'Question 2. Combien d’heures met Aminata ?',
              reponse: { type: 'nombre', valeur: tm },
              aide: 'Divise la distance par la vitesse de la moto.',
              correction: [d + ' ÷ ' + m + ' = ' + ecr(tm) + ' h.'],
            },
            {
              texte: 'Question 3. Combien de minutes Aminata gagne-t-elle sur Moussa ?',
              reponse: { type: 'nombre', valeur: (t - tm) * 60 },
              aide: 'Fais la différence des durées, puis multiplie par soixante.',
              correction: [t + ' − ' + ecr(tm) + ' = ' + ecr(t - tm) + ' h.', ecr(t - tm) + ' × 60 = ' + (t - tm) * 60 + ' minutes.'],
            },
            {
              texte: 'Question 4. Moussa dit : « Si je roule deux fois plus vite, je mets deux fois moins de temps. » A-t-il raison ? Justifie avec les nombres de l’énoncé.',
              correction: ['Oui : en roulant à ' + v * 2 + ' km/h, il mettrait ' + d + ' ÷ ' + v * 2 + ' = ' + ecr(d / (v * 2)) + ' h, au lieu de ' + t + ' h.', 'Pour une même distance, quand la vitesse double, la durée est divisée par deux.'],
              grille: ['As-tu fait le calcul avec les nombres de l’énoncé ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Distance, durée, vitesse : tu sais calculer l’une à partir des deux autres.',
    carte: ['calculer-la-vitesse', 'calculer-la-distance', 'quelle-unite'],
    papierDuSoir: { exercices: ['calculer-la-duree', 'minutes-en-heures'], defi: true },
    automatismes: [
      {
        id: 'vitesse-rapide',
        versions: [[30, 2], [60, 3], [100, 2], [40, 4]],
        genere(c) { const [d, t] = c.alea.choisir(this.versions); return { enonce: d + ' km en ' + t + ' h : vitesse en km/h = ?', reponse: { type: 'nombre', valeur: d / t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le Kényan Sabastian Sawe a couru le marathon en 1 heure 59 minutes 30 secondes, à Londres, en 2026.',
    prenoms: ['Moussa', 'Aminata', 'Rebecca'],
  };
});
