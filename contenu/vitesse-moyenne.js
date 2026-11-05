/* Notion 2 du bloc « Mouvement et forces » : la vitesse moyenne. Le trajet de Clarisse, en physique : v = d ÷ t, m/s et km/h.
   Pont avec les maths (notion grandeur-vitesse, bloc « Proportionnalité, pourcentages et fonctions »).
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'vitesse-moyenne',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'La vitesse moyenne',
    classe: 'cycle 4',
    univers: ['dehors', 'famille', 'danses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : vitesse d’un objet, unités du système international.',

    accroche: {
      texte: 'Clarisse, la tante de Rachel, part en voiture voir sa famille. Elle fait 180 kilomètres en 3 heures. ' +
        'Sur la route, le compteur monte, redescend, et s’arrête aux feux. Pourtant, Clarisse annonce : « J’ai roulé à 60 kilomètres par heure ». Comment le sait-elle ?',
      image: { dessin: 'chaine', etapes: ['180 km parcourus', 'en 3 heures', '60 km en 1 heure'], description: 'Cent quatre-vingts kilomètres parcourus en trois heures, cela fait soixante kilomètres en une heure.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['v = d ÷ t', 'd en km et t en h : v en km/h', 'd en m et t en s : v en m/s'], description: 'La vitesse égale la distance divisée par le temps. Avec des kilomètres et des heures, on a des kilomètres par heure. Avec des mètres et des secondes, on a des mètres par seconde.' },
      etapes: [
        'Clarisse partage sa distance en parts égales, une par heure.',
        'Cent quatre-vingts divisé par trois égale soixante : soixante kilomètres en une heure.',
        'Elle n’a pas roulé à soixante à chaque instant. C’est son allure sur tout le trajet.',
        'La règle : v = d ÷ t. Pour trouver la distance : d = v × t. Pour trouver le temps : t = d ÷ v.',
        'En physique, on compte aussi en mètres par seconde.',
        'Pour passer des mètres par seconde aux kilomètres par heure, on multiplie par 3,6.',
      ],
    },

    decouverte: {
      texte: (c) => 'La distance divisée par le temps donne ' + c.mot('vitesse') + '. On l’écrit : v égale d divisé par t. ' +
        'Dans les laboratoires, on l’exprime souvent en ' + c.mot('metreseconde') + '. ' +
        'L’astuce : regarde les unités. Des kilomètres et des heures donnent des kilomètres par heure. Des mètres et des secondes donnent des mètres par seconde.',
    },

    vocabulaire: {
      termes: {
        vitesse: { sesMots: 'l’allure sur tout le trajet', officiel: 'la vitesse moyenne', lesDeux: 'l’allure sur tout le trajet, que les physiciens appellent la vitesse moyenne' },
        metreseconde: { sesMots: 'mètres faits en une seconde', officiel: 'mètres par seconde', lesDeux: 'mètres faits en une seconde, que les physiciens écrivent mètres par seconde' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’allure sur tout le trajet, et les mètres faits en une seconde. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la vitesse moyenne, notée v. Son unité officielle est le mètre par seconde. Le compteur de la voiture, lui, donne une vitesse à un instant.',
        'Tu connais les mots officiels : la vitesse moyenne, et le mètre par seconde.',
      ],
    },

    exercices: [
      {
        id: 'calculer-v',
        univers: 'dehors',
        // [distance en km, temps en h]
        versions: [[120, 2], [150, 3], [36, 2], [45, 3], [200, 4], [24, 2]],
        genere(c) {
          const [d, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa parcourt ' + d + ' km en ' + t + ' h. Quelle est sa vitesse moyenne, en km/h ?',
            reponse: { type: 'nombre', valeur: d / t },
            aide: 'Calcule ' + d + ' ÷ ' + t + '.',
            aideParlee: 'La vitesse égale la distance divisée par le temps.',
            correction: ['v = d ÷ t = ' + d + ' ÷ ' + t + ' = ' + d / t + ' km/h.'],
          };
        },
      },
      {
        id: 'calculer-v-ms',
        univers: 'danses',
        // [distance en m, temps en s]
        versions: [[100, 20], [60, 10], [200, 25], [90, 30], [400, 50]],
        genere(c) {
          const [d, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pendant une danse, Aminata traverse la grande place : ' + d + ' m en ' + t + ' s. Quelle est sa vitesse moyenne, en m/s ?',
            reponse: { type: 'nombre', valeur: d / t },
            aide: 'Calcule ' + d + ' ÷ ' + t + '.',
            aideParlee: 'La vitesse égale la distance divisée par le temps.',
            correction: ['v = ' + d + ' ÷ ' + t + ' = ' + d / t + ' m/s.'],
          };
        },
      },
      {
        id: 'calculer-d',
        univers: 'famille',
        // [vitesse en km/h, temps en h]
        versions: [[60, 2], [80, 3], [50, 4], [90, 2], [20, 3], [70, 2]],
        genere(c) {
          const [v, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure roule à ' + v + ' km/h de moyenne pendant ' + t + ' h. Quelle distance parcourt-elle, en km ?',
            reponse: { type: 'nombre', valeur: v * t },
            aide: 'Calcule ' + v + ' × ' + t + '.',
            aideParlee: 'La distance égale la vitesse multipliée par le temps.',
            correction: ['d = v × t = ' + v + ' × ' + t + ' = ' + v * t + ' km.'],
          };
        },
      },
      {
        id: 'calculer-t',
        univers: 'famille',
        // [distance en km, vitesse en km/h]
        versions: [[120, 60], [240, 80], [150, 50], [45, 15], [300, 100]],
        genere(c) {
          const [d, v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Clarisse doit faire ' + d + ' km à ' + v + ' km/h de moyenne. Combien de temps dure le trajet, en heures ?',
            reponse: { type: 'nombre', valeur: d / v },
            aide: 'Calcule ' + d + ' ÷ ' + v + '.',
            aideParlee: 'Le temps égale la distance divisée par la vitesse.',
            correction: ['t = d ÷ v = ' + d + ' ÷ ' + v + ' = ' + d / v + ' h.'],
          };
        },
      },
      {
        id: 'ms-en-kmh',
        univers: 'dehors',
        versions: [5, 10, 15, 20, 25],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const k = r2(v * 3.6);
          return {
            enonce: 'Une voiture roule à ' + v + ' m/s. Quelle est sa vitesse, en km/h ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Calcule ' + v + ' × 3,6.',
            aideParlee: 'Multiplie les mètres par seconde par trois virgule six.',
            correction: ['En une heure, il y a 3 600 secondes : il fait ' + v + ' × 3 600 mètres, soit ' + v + ' × 3,6 km.', v + ' × 3,6 = ' + ecr(k) + ' km/h.'],
          };
        },
      },
    ],

    defi: {
      // [distance en km, temps en h] : vitesse moyenne qui tombe juste en km/h et en m/s
      versions: [[36, 2], [27, 1.5], [54, 3], [45, 2.5], [72, 2]],
      genere(c) {
        const [d, t] = c.alea.choisir(this.versions);
        const v = r2(d / t), ms = r2(v / 3.6);
        return {
          enonce: 'Esther suit une course à vélo. Document : la coureuse en tête a parcouru ' + d + ' km en ' + ecr(t) + ' h. Pendant la course, son compteur a indiqué parfois 8 km/h dans les montées, parfois 40 km/h dans les descentes.',
          questions: [
            {
              texte: 'Question 1. Calcule la vitesse moyenne de la coureuse, en km/h.',
              reponse: { type: 'nombre', valeur: v },
              aide: 'La vitesse égale la distance divisée par le temps.',
              correction: ['v = ' + d + ' ÷ ' + ecr(t) + ' = ' + ecr(v) + ' km/h.'],
            },
            {
              texte: 'Question 2. Convertis cette vitesse en m/s. Rappel : pour passer des km/h aux m/s, on divise par 3,6.',
              reponse: { type: 'nombre', valeur: ms },
              aide: 'Divise par trois virgule six.',
              correction: [ecr(v) + ' ÷ 3,6 = ' + ecr(ms) + ' m/s.'],
            },
            {
              texte: 'Question 3. La coureuse a-t-elle roulé à cette vitesse à chaque instant ? Justifie à l’aide du document.',
              correction: ['Non : son compteur a indiqué 8 km/h et 40 km/h. Le résultat calculé est une vitesse moyenne, sur tout le trajet.'],
              grille: ['As-tu répondu non ?', 'As-tu cité une valeur du compteur ?', 'As-tu employé les mots « vitesse moyenne » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une distance, un temps, et tu trouves la vitesse moyenne, en kilomètres par heure comme en mètres par seconde.',
    carte: ['calculer-v', 'calculer-d', 'ms-en-kmh'],
    papierDuSoir: { exercices: ['calculer-t', 'ms-en-kmh'], defi: true },
    automatismes: [
      {
        id: 'vitesse-rapide',
        versions: [[100, 2], [60, 3], [80, 4], [150, 3]],
        genere(c) { const [d, t] = c.alea.choisir(this.versions); return { enonce: d + ' km en ' + t + ' h : combien de km/h ?', reponse: { type: 'nombre', valeur: d / t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, la course du mont Cameroun part de Buea, monte au sommet et redescend : 38 kilomètres. En 2022, Elvis Nsabinla l’a gagnée en 4 heures 32 minutes 50 secondes.',
    prenoms: ['Clarisse', 'Rachel', 'Moussa', 'Aminata', 'Laure', 'Esther'],
  };
});
