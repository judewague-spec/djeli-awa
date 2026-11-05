/* Notion 4 du bloc « Proportionnalité, pourcentages et fonctions » : le débit d'un robinet. L'arrosage de Laure.
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
    id: 'grandeur-debit',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'Le débit d’un robinet',
    classe: '4e',
    univers: ['maison-courses', 'champetre'],

    accroche: {
      texte: 'Laure remplit un seau de 10 litres au robinet du jardin : il lui faut 2 minutes. À la pompe du village, le même seau est plein en 1 minute. ' +
        'Pour comparer deux robinets, on regarde combien de litres coulent en une minute.',
      image: { dessin: 'barres', barres: [{ nom: 'Jardin', parts: 5 }, { nom: 'Pompe', parts: 10 }], description: 'Deux barres, chaque part vaut un litre par minute : le robinet du jardin donne 5 litres par minute, la pompe 10 litres par minute.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['10 litres en 2 minutes', '10 ÷ 2 = 5', '5 litres en 1 minute'], description: 'Dix litres en deux minutes ; dix divisé par deux égale cinq ; donc cinq litres en une minute.' },
      etapes: [
        'Au robinet du jardin : 10 L ÷ 2 min = 5 litres par minute.',
        'À cette allure, le volume est proportionnel au temps. Une minute de plus, 5 litres de plus.',
        'Si l’on connaît la durée : volume = litres par minute × durée.',
        'Si l’on connaît le volume voulu : durée = volume ÷ litres par minute.',
        'C’est la même idée que l’allure du vélo : une quantité, divisée par une durée.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le volume qui coule en une minute s’appelle ' + c.mot('debit') + '. On le trouve en divisant le volume par la durée. On l’écrit en litres par minute. ' +
        'L’astuce : comme pour la vitesse, les unités te donnent le calcul.',
    },

    vocabulaire: {
      termes: {
        debit: { sesMots: 'la force du robinet', officiel: 'le débit', lesDeux: 'la force du robinet, que les matheux appellent le débit' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la force du robinet. ' +
          'Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : le débit, pour la force du robinet. Il s’écrit en litres par minute.',
        'Tu connais le mot officiel : le débit, en litres par minute.',
      ],
    },

    exercices: [
      {
        id: 'calculer-le-debit',
        univers: 'maison-courses',
        // [litres, minutes]
        versions: [[10, 2], [30, 5], [24, 4], [60, 3], [45, 9], [100, 8]],
        genere(c) {
          const [v, t] = c.alea.choisir(this.versions);
          const d = r2(v / t);
          return {
            enonce: 'Un réservoir de ' + v + ' L se remplit en ' + t + ' minutes. Quel est le débit du robinet, en litres par minute ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Calcule ' + v + ' ÷ ' + t + '.',
            aideParlee: 'Divise le volume par la durée.',
            correction: [v + ' ÷ ' + t + ' = ' + ecr(d) + ' L/min.'],
          };
        },
      },
      {
        id: 'calculer-le-volume',
        univers: 'champetre',
        // [litres par minute, minutes]
        versions: [[8, 15], [12, 20], [5, 30], [15, 12], [6, 25], [20, 45]],
        genere(c) {
          const [d, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le tuyau d’arrosage de Laure donne ' + d + ' L par minute. Combien de litres coulent en ' + t + ' minutes ?',
            reponse: { type: 'nombre', valeur: d * t },
            aide: 'Calcule ' + d + ' × ' + t + '.',
            aideParlee: 'Multiplie le débit par la durée.',
            correction: [d + ' × ' + t + ' = ' + d * t + ' L.'],
          };
        },
      },
      {
        id: 'calculer-la-duree',
        univers: 'champetre',
        // [litres, litres par minute]
        versions: [[60, 12], [100, 20], [150, 25], [80, 16], [45, 5], [200, 40]],
        genere(c) {
          const [v, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une citerne de ' + v + ' L se remplit avec un débit de ' + d + ' L par minute. Combien de minutes faut-il pour la remplir ?',
            reponse: { type: 'nombre', valeur: v / d },
            aide: 'Calcule ' + v + ' ÷ ' + d + '.',
            aideParlee: 'Divise le volume par le débit.',
            correction: [v + ' ÷ ' + d + ' = ' + ecr(v / d) + ' minutes.'],
          };
        },
      },
      {
        id: 'en-une-heure',
        univers: 'maison-courses',
        // litres par minute
        versions: [2, 5, 8, 10, 12, 15],
        genere(c) {
          const d = c.alea.choisir(this.versions);
          return {
            enonce: 'Une pompe donne ' + d + ' L par minute. Combien de litres donne-t-elle en une heure ?',
            reponse: { type: 'nombre', valeur: d * 60 },
            aide: 'Une heure, c’est 60 minutes. Calcule ' + d + ' × 60.',
            aideParlee: 'Une heure, c’est soixante minutes. Multiplie par soixante.',
            correction: [d + ' × 60 = ' + d * 60 + ' L.'],
          };
        },
      },
      {
        id: 'le-plus-fort',
        univers: 'maison-courses',
        // [les deux robinets : litres, minutes], le plus fort
        versions: [[[[20, 4], [12, 2]], '12 L en 2 minutes'], [[[30, 3], [25, 5]], '30 L en 3 minutes'], [[[18, 2], [40, 8]], '18 L en 2 minutes'], [[[45, 5], [16, 2]], '45 L en 5 minutes']],
        genere(c) {
          const [[a, b], juste] = c.alea.choisir(this.versions);
          const nom = (r) => r[0] + ' L en ' + r[1] + ' minutes';
          return {
            enonce: 'Quel robinet a le plus grand débit ?',
            reponse: O.choix(c.alea, juste, [nom(a), nom(b)]),
            aide: 'Calcule, pour chaque robinet, les litres qui coulent en une minute.',
            correction: [nom(a) + ' : ' + a[0] / a[1] + ' L/min.', nom(b) + ' : ' + b[0] / b[1] + ' L/min.', 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [litres de la citerne, débit pompe A, débit pompe B]
      versions: [[120, 10, 8], [200, 25, 20], [240, 20, 15], [300, 30, 25]],
      genere(c) {
        const [v, a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Pour arroser son potager, Laure remplit une citerne de ' + v + ' L. La pompe du village a un débit de ' + a + ' L par minute. Le robinet du jardin a un débit de ' + b + ' L par minute.',
          questions: [
            {
              texte: 'Question 1. Combien de minutes faut-il avec la pompe ?',
              reponse: { type: 'nombre', valeur: v / a },
              aide: 'Divise le volume par le débit de la pompe.',
              correction: [v + ' ÷ ' + a + ' = ' + ecr(v / a) + ' minutes.'],
            },
            {
              texte: 'Question 2. Combien de minutes faut-il avec le robinet ?',
              reponse: { type: 'nombre', valeur: v / b },
              aide: 'Divise le volume par le débit du robinet.',
              correction: [v + ' ÷ ' + b + ' = ' + ecr(v / b) + ' minutes.'],
            },
            {
              texte: 'Question 3. Laure utilise les deux en même temps. Quel est le débit total, en litres par minute ?',
              reponse: { type: 'nombre', valeur: a + b },
              aide: 'Additionne les deux débits.',
              correction: [a + ' + ' + b + ' = ' + (a + b) + ' L/min.'],
            },
            {
              texte: 'Question 4. Explique pourquoi le débit est une grandeur composée, et donne son unité.',
              correction: ['Le débit relie deux grandeurs : un volume et une durée.', 'On l’obtient en divisant le volume par la durée : son unité est le litre par minute.'],
              grille: ['As-tu cité le volume et la durée ?', 'As-tu donné l’unité ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Des litres, des minutes, et le tour est joué : tu sais mesurer la force d’un robinet.',
    carte: ['calculer-le-debit', 'calculer-le-volume', 'le-plus-fort'],
    papierDuSoir: { exercices: ['calculer-la-duree', 'en-une-heure'], defi: true },
    automatismes: [
      {
        id: 'debit-rapide',
        versions: [[10, 2], [30, 5], [40, 8], [60, 6]],
        genere(c) { const [v, t] = c.alea.choisir(this.versions); return { enonce: v + ' L en ' + t + ' minutes : débit en L/min = ?', reponse: { type: 'nombre', valeur: v / t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, à Édéa, le fleuve Sanaga débite en moyenne près de 2 000 mètres cubes d’eau par seconde.',
    prenoms: ['Laure'],
  };
});
