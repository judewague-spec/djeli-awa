/* Notion 3 du bloc « L'électricité » : l'intensité du courant. Le tuyau d'arrosage de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r3 = (x) => Math.round(x * 1000) / 1000;

  return {
    id: 'intensite',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'L’intensité du courant',
    classe: '4e',
    univers: ['champetre', 'appareils', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : intensité du courant électrique, mesure à l’ampèremètre.',

    accroche: {
      texte: 'Au potager, Laure arrose avec un tuyau. Quand le robinet est peu ouvert, un petit filet d’eau sort. Grand ouvert, beaucoup d’eau passe à chaque seconde. ' +
        'Dans un fil électrique, c’est un peu pareil : un courant peut être faible, ou fort. Rachel se demande : comment le mesurer ?',
      image: { dessin: 'chaine', etapes: ['Dans le tuyau : la quantité d’eau par seconde', 'Dans le fil : le courant électrique', 'L’appareil qui mesure : dans la boucle'], description: 'Dans le tuyau, on compte la quantité d’eau par seconde. Dans le fil, on mesure le courant. L’appareil qui mesure se place dans la boucle.' },
    },

    manipulation: {
      image: { dessin: 'circuit', branches: [1], ampere: true, mesures: ['L’ampèremètre, marqué A, est dans la boucle.'], description: 'Un circuit : une pile, un interrupteur, une lampe et un ampèremètre, marqué A, placé dans la boucle, à la suite des autres.' },
      etapes: [
        'Le courant qui passe dans un fil se mesure, comme l’eau dans un tuyau.',
        'Son unité est l’ampère, de symbole A. Pour les petits courants, on utilise le milliampère : 1 A = 1 000 mA.',
        'L’appareil de mesure s’appelle l’ampèremètre. On le met dans la boucle, à la suite des autres éléments.',
        'Pour passer des milliampères aux ampères, on divise par 1 000 : 250 mA = 0,25 A.',
        'Une petite lampe demande environ 0,2 A ; un sèche-cheveux, bien plus, plusieurs ampères.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un courant peut être faible ou fort. On mesure en ampères ' + c.mot('intensite') + '. L’appareil pour cela, c’est ' + c.mot('appareil') + '. Il se branche en série, dans la boucle. ' +
        'L’astuce : comme un compteur d’eau, il faut que tout le courant passe dedans.',
    },

    vocabulaire: {
      termes: {
        intensite: { sesMots: 'la force du courant', officiel: 'l’intensité', lesDeux: 'la force du courant, que les physiciens appellent l’intensité' },
        appareil: { sesMots: 'le compteur de courant', officiel: 'l’ampèremètre', lesDeux: 'le compteur de courant, que les physiciens appellent l’ampèremètre' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la force du courant, et le compteur de courant. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : l’intensité, notée I, qui se mesure en ampères, avec un ampèremètre branché en série.',
        'Tu connais les mots officiels : l’intensité I, l’ampère, le milliampère, et l’ampèremètre branché en série.',
      ],
    },

    exercices: [
      {
        id: 'milli-en-ampere',
        univers: 'appareils',
        versions: [250, 500, 100, 750, 50, 120],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          const a = r3(m / 1000);
          return {
            enonce: 'L’ampèremètre affiche ' + m + ' mA. Combien cela fait-il en ampères ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Divise ' + m + ' par 1 000.',
            aideParlee: 'Divise par mille.',
            correction: [m + ' ÷ 1 000 = ' + ecr(a) + ' A.'],
          };
        },
      },
      {
        id: 'ampere-en-milli',
        univers: 'maison-courses',
        versions: [0.2, 0.5, 1.5, 0.05, 2, 0.75],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const m = Math.round(a * 1000);
          return {
            enonce: 'Une lampe est traversée par un courant de ' + ecr(a) + ' A. Combien cela fait-il en milliampères ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Multiplie ' + ecr(a) + ' par 1 000.',
            aideParlee: 'Multiplie par mille.',
            correction: [ecr(a) + ' × 1 000 = ' + m + ' mA.'],
          };
        },
      },
      O.qcm('comment-brancher', 'appareils',
        [['un ampèremètre', 'En série, dans la boucle'], ['l’appareil qui mesure l’intensité', 'En série, dans la boucle']],
        (x) => 'Comment branche-t-on ' + x + ' ?', ['En série, dans la boucle', 'En dérivation, aux bornes d’une lampe', 'Il n’a pas besoin de fils'],
        'Tout le courant doit passer dedans.'),
      O.qcm('quelle-unite', 'maison-courses',
        [['Un très petit courant, de cinq millièmes d’ampère', 'Le milliampère'], ['Le courant d’un sèche-cheveux, de plusieurs ampères', 'L’ampère'], ['Le courant minuscule d’une petite diode', 'Le milliampère']],
        (x) => x + ' : quelle unité convient le mieux ?', ['L’ampère', 'Le milliampère', 'Le litre'],
        'Le milliampère sert pour les petits courants.'),
      {
        id: 'le-plus-fort',
        univers: 'champetre',
        // [en mA, en A, écart en mA]
        versions: [[300, 0.5], [800, 0.3], [150, 0.25], [600, 1], [450, 0.2]],
        genere(c) {
          const [m, a] = c.alea.choisir(this.versions);
          const am = Math.round(a * 1000), e = Math.abs(m - am);
          return {
            enonce: 'Sur son circuit à piles, Moussa mesure deux courants : ' + m + ' mA, et ' + ecr(a) + ' A. Quel est l’écart entre eux, en milliampères ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Écris ' + ecr(a) + ' A en milliampères, puis fais la différence.',
            aideParlee: 'Mets les deux courants dans la même unité, puis fais la différence.',
            correction: [ecr(a) + ' A = ' + am + ' mA.', 'Écart : ' + e + ' mA.'],
          };
        },
      },
    ],

    defi: {
      // [intensité de la lampe en mA, intensité du ventilateur en A]
      versions: [[250, 0.5], [200, 0.4], [500, 1.5], [100, 0.3]],
      genere(c) {
        const [m, a] = c.alea.choisir(this.versions);
        const lampeA = r3(m / 1000), f = Math.round((a * 1000) / m * 10) / 10;
        return {
          enonce: 'Esther mesure le courant dans deux appareils à piles. Sa lampe de poche est traversée par ' + m + ' mA, et son petit ventilateur par ' + ecr(a) + ' A.',
          questions: [
            {
              texte: 'Question 1. Convertis l’intensité de la lampe en ampères.',
              reponse: { type: 'nombre', valeur: lampeA },
              aide: 'Divise par mille.',
              correction: [m + ' ÷ 1 000 = ' + ecr(lampeA) + ' A.'],
            },
            {
              texte: 'Question 2. Combien de fois le courant du ventilateur est-il plus fort que celui de la lampe ?',
              reponse: { type: 'nombre', valeur: f },
              aide: 'Mets les deux courants dans la même unité, puis divise.',
              correction: [ecr(a) + ' ÷ ' + ecr(lampeA) + ' = ' + ecr(f) + '.'],
            },
            {
              texte: 'Question 3. Explique comment Esther doit brancher son appareil de mesure, et pourquoi.',
              correction: ['L’ampèremètre se branche en série, dans la boucle.', 'Ainsi, tout le courant passe dans l’appareil qui le mesure.'],
              grille: ['As-tu nommé l’ampèremètre ?', 'As-tu dit « en série » ?', 'As-tu expliqué pourquoi ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Ampère, milliampère, branché dans la boucle : tu sais mesurer la force du courant.',
    carte: ['milli-en-ampere', 'comment-brancher', 'quelle-unite'],
    papierDuSoir: { exercices: ['ampere-en-milli', 'le-plus-fort'], defi: true },
    automatismes: [
      {
        id: 'diviser-par-mille',
        versions: [500, 250, 100, 750],
        genere(c) { const m = c.alea.choisir(this.versions); return { enonce: m + ' ÷ 1 000 = ?', reponse: { type: 'nombre', valeur: r3(m / 1000) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, à Lyon, est né André-Marie Ampère. L’unité de l’intensité du courant porte son nom.',
    prenoms: ['Laure', 'Rachel', 'Moussa', 'Esther'],
  };
});
