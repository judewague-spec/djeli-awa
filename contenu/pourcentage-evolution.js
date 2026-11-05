/* Notion 10 du bloc « Proportionnalité, pourcentages et fonctions » : le pourcentage d'évolution. Le loyer de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const r2 = (x) => Math.round(x * 100) / 100;
  const evol = (i, f) => r2(((f - i) / i) * 100);

  return {
    id: 'pourcentage-evolution',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'Le pourcentage d’évolution',
    classe: '3e',
    univers: ['maison-courses', 'commerce'],

    accroche: {
      texte: 'Le loyer de Laure passe de 500 à 525 euros. Une lettre annonce une hausse de 25 euros. Pour Laure, c’est beaucoup. Pour un loyer de 2 000 euros, 25 euros, ce serait presque rien. ' +
        'Pour comparer deux hausses, on regarde la part du départ que cela représente.',
      image: { dessin: 'tableur', colonnes: ['Loyer', 'Avant', 'Après'], lignes: [['En euros', 500, 525]], description: 'Un tableau. Le loyer était de 500 euros avant, et de 525 euros après.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['La hausse : 525 − 500 = 25', 'On divise par le départ : 25 ÷ 500', 'On multiplie par 100 : 5 %'], description: 'La hausse : 525 moins 500 égale 25. On divise par le prix de départ : 25 divisé par 500. On multiplie par 100 : cela fait 5 pour cent.' },
      etapes: [
        'D’abord, on calcule l’écart : 525 − 500 = 25 euros.',
        'Puis on le compare au prix de départ, toujours au prix de départ : 25 ÷ 500 = 0,05.',
        'On multiplie par 100 : 0,05 × 100 = 5. La hausse est de 5 pour cent.',
        'Attention : 10 pour cent de hausse, puis 10 pour cent de baisse, ne ramènent pas au prix de départ. La baisse s’applique sur un prix plus grand.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’écart, comparé au départ et écrit sur 100, s’appelle ' + c.mot('evolution') + '. On calcule : arrivée moins départ, divisé par le départ, multiplié par 100. ' +
        'L’astuce : on divise toujours par le départ, jamais par l’arrivée.',
    },

    vocabulaire: {
      termes: {
        evolution: { sesMots: 'le changement sur cent', officiel: 'le pourcentage d’évolution', lesDeux: 'le changement sur cent, que les matheux appellent le pourcentage d’évolution' },
      },
      textes: [
        'Pour l’instant, garde ton mot : le changement sur cent. ' +
          'Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : le pourcentage d’évolution, pour le changement sur cent. Il peut être une hausse, ou une baisse.',
        'Tu connais le mot officiel : le pourcentage d’évolution.',
      ],
    },

    exercices: [
      {
        id: 'hausse-en-pourcentage',
        univers: 'maison-courses',
        // [départ, arrivée]
        versions: [[500, 525], [600, 630], [800, 816], [40, 50], [20, 23], [200, 260]],
        genere(c) {
          const [i, f] = c.alea.choisir(this.versions);
          const p = evol(i, f);
          return {
            enonce: 'Un prix passe de ' + i + ' € à ' + f + ' €. Quel est le pourcentage de hausse ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + f + ' − ' + i + ', divise par ' + i + ', puis multiplie par 100.',
            aideParlee: 'Calcule l’écart, divise par le prix de départ, puis multiplie par cent.',
            correction: [f + ' − ' + i + ' = ' + (f - i) + '.', (f - i) + ' ÷ ' + i + ' × 100 = ' + ecr(p) + ' %.'],
          };
        },
      },
      {
        id: 'baisse-en-pourcentage',
        univers: 'commerce',
        // [départ, arrivée]
        versions: [[50, 40], [80, 60], [120, 90], [40, 30], [200, 150], [60, 45]],
        genere(c) {
          const [i, f] = c.alea.choisir(this.versions);
          const p = r2(((i - f) / i) * 100);
          return {
            enonce: 'En solde, un prix passe de ' + i + ' € à ' + f + ' €. Quel est le pourcentage de baisse ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + i + ' − ' + f + ', divise par ' + i + ', puis multiplie par 100.',
            aideParlee: 'Calcule l’écart, divise par le prix de départ, puis multiplie par cent.',
            correction: [i + ' − ' + f + ' = ' + (i - f) + '.', (i - f) + ' ÷ ' + i + ' × 100 = ' + ecr(p) + ' %.'],
          };
        },
      },
      {
        id: 'prix-d-avant',
        univers: 'commerce',
        // [prix final, baisse %]
        versions: [[40, 20], [30, 25], [45, 10], [60, 50], [56, 30], [76, 5]],
        genere(c) {
          const [f, b] = c.alea.choisir(this.versions);
          const k = r2(1 - b / 100), i = r2(f / k);
          return {
            enonce: 'Après une baisse de ' + b + ' %, un article coûte ' + f + ' €. Quel était son prix avant les soldes, en euros ?',
            reponse: { type: 'nombre', valeur: i },
            aide: 'On a multiplié par ' + ecr(k) + '. Calcule donc ' + f + ' ÷ ' + ecr(k) + '.',
            aideParlee: 'Trouve le nombre par lequel on a multiplié, puis divise le prix final par ce nombre.',
            correction: [f + ' ÷ ' + ecr(k) + ' = ' + ecr(i) + ' €.'],
          };
        },
      },
      {
        id: 'deux-evolutions',
        univers: 'maison-courses',
        // [prix, % de hausse et de baisse]
        versions: [[100, 10], [200, 10], [100, 20], [50, 20], [400, 5], [100, 50]],
        genere(c) {
          const [m, p] = c.alea.choisir(this.versions);
          const a = r2(m * (1 + p / 100)), b = r2(a * (1 - p / 100));
          return {
            enonce: 'Un prix de ' + m + ' € augmente de ' + p + ' %, puis ce nouveau prix baisse de ' + p + ' %. Quel est le prix final, en euros ?',
            reponse: { type: 'nombre', valeur: b },
            aide: 'Applique la hausse, puis applique la baisse au nouveau prix.',
            correction: ['Après la hausse : ' + m + ' × ' + ecr(r2(1 + p / 100)) + ' = ' + ecr(a) + ' €.', 'Après la baisse : ' + ecr(a) + ' × ' + ecr(r2(1 - p / 100)) + ' = ' + ecr(b) + ' €.'],
          };
        },
      },
      Q('par-quoi-diviser', 'commerce',
        [['Un prix passe de 40 € à 50 €. Par quoi divise-t-on l’écart ?', 'Par le prix de départ : 40'], ['Des charges passent de 40 € à 50 €. Pour le pourcentage, par quoi divise-t-on l’écart ?', 'Par le prix de départ : 40']],
        (x) => x, ['Par le prix de départ : 40', 'Par le prix d’arrivée : 50', 'Par l’écart : 10'],
        'On compare toujours au départ.',
        'L’évolution compare l’écart au point de départ : c’est lui qui compte pour cent pour cent.'),
    ],

    defi: {
      // [loyer avant, loyer après, charges avant, charges après]
      versions: [[500, 525, 40, 50], [600, 630, 50, 60], [800, 824, 60, 75], [400, 420, 20, 25]],
      genere(c) {
        const [l, n, a, b] = c.alea.choisir(this.versions);
        const pl = evol(l, n), pc = evol(a, b);
        return {
          enonce: 'Le loyer de Laure passe de ' + l + ' € à ' + n + ' € par mois. Ses charges passent de ' + a + ' € à ' + b + ' € par mois.',
          image: { dessin: 'tableur', colonnes: ['', 'Avant', 'Après'], lignes: [['Loyer', l, n], ['Charges', a, b]], description: 'Le loyer : ' + l + ' euros avant, ' + n + ' euros après. Les charges : ' + a + ' euros avant, ' + b + ' euros après.' },
          questions: [
            {
              texte: 'Question 1. Quel est le pourcentage de hausse du loyer ?',
              reponse: { type: 'nombre', valeur: pl },
              aide: 'Calcule l’écart, divise par le départ, puis multiplie par cent.',
              correction: [n + ' − ' + l + ' = ' + (n - l) + '.', (n - l) + ' ÷ ' + l + ' × 100 = ' + ecr(pl) + ' %.'],
            },
            {
              texte: 'Question 2. Quel est le pourcentage de hausse des charges ?',
              reponse: { type: 'nombre', valeur: pc },
              aide: 'Fais le même calcul pour les charges.',
              correction: [b + ' − ' + a + ' = ' + (b - a) + '.', (b - a) + ' ÷ ' + a + ' × 100 = ' + ecr(pc) + ' %.'],
            },
            {
              texte: 'Question 3. Laure dit : « C’est le loyer qui a le plus augmenté, puisqu’il a pris plus d’euros. » Que lui réponds-tu ?',
              correction: ['En euros, le loyer a pris plus : ' + (n - l) + ' € contre ' + (b - a) + ' €.', 'Mais en pourcentage, les charges ont augmenté davantage : ' + ecr(pc) + ' % contre ' + ecr(pl) + ' %. Tout dépend de ce que l’on compare.'],
              grille: ['As-tu comparé en euros ?', 'As-tu comparé en pourcentage ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! L’écart, comparé au départ : tu sais lire une hausse de loyer sans te laisser tromper.',
    carte: ['hausse-en-pourcentage', 'baisse-en-pourcentage', 'par-quoi-diviser'],
    papierDuSoir: { exercices: ['prix-d-avant', 'deux-evolutions'], defi: true },
    automatismes: [
      {
        id: 'evolution-rapide',
        versions: [[100, 110], [100, 125], [50, 55], [200, 220]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'De ' + a + ' € à ' + b + ' € : hausse de combien de pour cent ?', reponse: { type: 'nombre', valeur: ((b - a) / a) * 100 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, la population est passée d’environ 15 millions en 2000 à environ 30 millions en 2025.',
    prenoms: ['Laure'],
  };
});
