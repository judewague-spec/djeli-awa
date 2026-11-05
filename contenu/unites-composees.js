/* Notion 7 du bloc « Mesures, géométrie et espace » : les unités composées, kilomètres par heure et mètres par seconde. Moussa à moto, Esther au sprint.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'unites-composees',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Les unités composées',
    classe: '4e',
    univers: ['dehors', 'danses'],

    accroche: {
      texte: 'Moussa roule à 36 kilomètres par heure. Esther file à vélo à 8 mètres par seconde, sur le chemin derrière le marché. Qui va le plus vite ? ' +
        'Impossible de comparer tant que les unités sont différentes. Il faut parler la même langue : mettons tout en mètres par seconde.',
      image: { dessin: 'tableur', colonnes: ['Durée', '1 h', '1 min', '1 s'], lignes: [['Distance', '36 km', '600 m', '10 m']], description: 'Un tableau pour la moto de Moussa. En 1 heure, 36 kilomètres. En 1 minute, 600 mètres. En 1 seconde, 10 mètres.' },
    },

    manipulation: {
      etapes: [
        'En une heure, Moussa fait 36 kilomètres, soit 36 000 mètres.',
        'Une heure, c’est 3 600 secondes. On partage donc 36 000 mètres en 3 600 parts.',
        'En une seconde, il fait 10 mètres. Il va plus vite qu’Esther, qui en fait 8.',
        'Tu vois : on a divisé 36 par 3,6, tout simplement.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une vitesse, c’est ' + c.mot('composee') + ' : des kilomètres par heure, des mètres par seconde. On convertit le haut, puis le bas. ' +
        'L’astuce : pour passer des kilomètres par heure aux mètres par seconde, divise par 3,6. Dans l’autre sens, multiplie par 3,6.',
    },

    vocabulaire: {
      termes: {
        composee: { sesMots: 'une unité à deux étages', officiel: 'une unité composée', lesDeux: 'une unité à deux étages, que l’on appelle une unité composée' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une unité à deux étages. Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : une unité composée, pour une unité à deux étages.',
        'Tu connais le mot officiel : une unité composée.',
      ],
    },

    exercices: [
      {
        id: 'kmh-en-ms',
        univers: 'dehors',
        versions: [[36], [72], [18], [90], [54], [108]],
        genere(c) {
          const [v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une moto roule à ' + v + ' km/h. Quelle est sa vitesse en m/s ?',
            reponse: { type: 'nombre', valeur: v / 3.6 },
            aide: 'Divise par 3,6.',
            aideParlee: 'Pour passer aux mètres par seconde, divise par trois virgule six.',
            correction: [v + ' km/h = ' + v * 1000 + ' m en 3 600 s.', v + ' ÷ 3,6 = ' + ecr(v / 3.6) + ' m/s.'],
          };
        },
      },
      {
        id: 'ms-en-kmh',
        univers: 'danses',
        versions: [[2], [3], [4], [5], [1.5], [2.5]],
        genere(c) {
          const [v] = c.alea.choisir(this.versions);
          const r = r2(v * 3.6);
          return {
            enonce: 'Une danseuse traverse la scène en courant à ' + ecr(v) + ' m/s. Quelle est sa vitesse en km/h ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Multiplie par 3,6.',
            aideParlee: 'Pour passer aux kilomètres par heure, multiplie par trois virgule six.',
            correction: [ecr(v) + ' × 3,6 = ' + ecr(r) + ' km/h.'],
          };
        },
      },
      {
        id: 'litres-par-minute',
        univers: 'dehors',
        versions: [[6], [12], [20], [3], [15], [2.5]],
        genere(c) {
          const [d] = c.alea.choisir(this.versions);
          const r = r2(d * 60);
          return {
            enonce: 'La fontaine du marché coule à ' + ecr(d) + ' L/min. Quel est ce débit en L/h ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Une heure, c’est 60 minutes.',
            aideParlee: 'Une heure compte soixante minutes : multiplie.',
            correction: [ecr(d) + ' × 60 = ' + ecr(r) + ' L/h.'],
          };
        },
      },
      {
        id: 'prix-au-gramme',
        univers: 'danses',
        // [€ par kg, grammes] : le prix d'une petite quantité
        versions: [[20, 100], [12, 250], [8, 500], [30, 200], [15, 100], [40, 50]],
        genere(c) {
          const [p, g] = c.alea.choisir(this.versions);
          const r = r2((p * g) / 1000);
          return {
            enonce: 'Des perles pour un costume de danse coûtent ' + p + ' €/kg. Quel est le prix de ' + g + ' g de perles, en euros ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Un kilogramme, c’est 1 000 grammes.',
            aideParlee: 'Un kilogramme compte mille grammes : cherche la fraction du kilo.',
            correction: [g + ' g = ' + ecr(g / 1000) + ' kg.', p + ' × ' + ecr(g / 1000) + ' = ' + ecr(r) + ' €.'],
          };
        },
      },
      {
        id: 'qui-va-le-plus-vite',
        univers: 'dehors',
        // [km/h, m/s]
        versions: [[36, 8], [36, 12], [54, 12], [54, 18], [36, 15], [72, 15]],
        genere(c) {
          const [k, m] = c.alea.choisir(this.versions);
          const ms = k / 3.6;
          const juste = ms > m ? 'La moto' : 'Le vélo';
          return {
            enonce: 'Une moto roule à ' + k + ' km/h. Un vélo de course dévale une pente à ' + m + ' m/s. Qui va le plus vite ?',
            reponse: O.choix(c.alea, juste, ['La moto', 'Le vélo']),
            aide: 'Mets les deux vitesses dans la même unité.',
            correction: [k + ' ÷ 3,6 = ' + ecr(ms) + ' m/s.', 'On compare ' + ecr(ms) + ' m/s et ' + m + ' m/s.', 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [distance en km, durée en min, limite en m/s]
      versions: [[18, 30, 10], [9, 15, 12], [27, 30, 12], [12, 20, 8]],
      genere(c) {
        const [d, t, m] = c.alea.choisir(this.versions);
        const kmh = (d * 60) / t, ms = kmh / 3.6;
        const juste = ms > m ? 'Oui, il dépasse cette vitesse' : 'Non, il ne la dépasse pas';
        return {
          enonce: 'Moussa parcourt ' + d + ' km à moto en ' + t + ' minutes, à vitesse constante. Le code de la piste du village lui demande de ne pas dépasser ' + m + ' m/s.',
          questions: [
            {
              texte: 'Question 1. Calculer sa vitesse en km/h.',
              reponse: { type: 'nombre', valeur: kmh },
              aide: 'Cherche la distance parcourue en une heure, soit 60 minutes.',
              correction: [d + ' km en ' + t + ' min, soit ' + d + ' × 60 ÷ ' + t + ' = ' + kmh + ' km/h.'],
            },
            {
              texte: 'Question 2. Exprimer cette vitesse en m/s.',
              reponse: { type: 'nombre', valeur: ms },
              aide: 'Divise par 3,6.',
              correction: [kmh + ' ÷ 3,6 = ' + ecr(ms) + ' m/s.'],
            },
            {
              texte: 'Question 3. Moussa dépasse-t-il la vitesse demandée ?',
              reponse: O.choix(c.alea, juste, ['Oui, il dépasse cette vitesse', 'Non, il ne la dépasse pas']),
              aide: 'Compare les deux vitesses, en m/s.',
              correction: ['On compare ' + ecr(ms) + ' m/s et ' + m + ' m/s.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Expliquer pourquoi on divise par 3,6 pour passer des km/h aux m/s.',
              correction: ['1 km/h, c’est 1 000 m en 3 600 s.', '1 000 ÷ 3 600 revient à diviser par 3,6.'],
              grille: ['As-tu converti le kilomètre en mètres ?', 'As-tu converti l’heure en secondes ?', 'As-tu fait le lien avec 3,6 ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Les deux étages de l’unité obéissent : tu compares n’importe quelles vitesses.',
    carte: ['kmh-en-ms', 'ms-en-kmh', 'qui-va-le-plus-vite'],
    papierDuSoir: { exercices: ['kmh-en-ms', 'prix-au-gramme'], defi: true },
    automatismes: [
      {
        id: 'minutes-heure',
        versions: [[2], [3], [5], [10]],
        genere(c) { const [h] = c.alea.choisir(this.versions); return { enonce: h + ' h = combien de minutes ?', reponse: { type: 'nombre', valeur: h * 60 } }; },
      },
    ],
    savaisTu: null,
    prenoms: ['Moussa', 'Esther'],
  };
});
