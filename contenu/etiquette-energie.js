/* Notion 10 du bloc de technologie « Les objets et la société » : l'étiquette énergie. Le réfrigérateur de Laure.
   Les prix de l'électricité sont donnés dans chaque énoncé (valeurs d'exercice). Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const CLASSES = 'ABCDEFG';
  const ETIQ = (classe, kwh, appareil) => ({ dessin: 'etiquette', classe, kwh, appareil, description: 'Une étiquette énergie : sept classes, de A, la plus sobre, à G. ' + appareil + ' est en classe ' + classe + ', et consomme ' + kwh + ' kilowattheures par an.' });

  return {
    id: 'etiquette-energie',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'L’étiquette énergie',
    classe: '4e',
    univers: ['appareils', 'commerce', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 31) : l’indice énergétique ; comparer l’efficacité énergétique de plusieurs objets.',

    accroche: {
      texte: 'Laure doit changer son vieux réfrigérateur. Au magasin, chaque appareil porte une étiquette avec des lettres de A à G et des barres de couleur. ' +
        'Le moins cher affiche un G ; un autre, un peu plus cher, affiche un B. Lequel lui coûtera le moins, au bout de quelques années ?',
      image: ETIQ('B', 150, 'Le réfrigérateur'),
    },

    manipulation: {
      image: ETIQ('G', 400, 'Le vieux réfrigérateur'),
      etapes: [
        'Sur l’étiquette, sept lettres : A pour l’appareil qui consomme le moins d’électricité, G pour celui qui en consomme le plus.',
        'Un nombre est écrit en dessous : l’électricité consommée en un an, en kilowattheures.',
        'Pour connaître le prix de cette électricité, on multiplie ce nombre par le prix d’un kilowattheure.',
        'Un appareil sobre peut coûter plus cher à l’achat, mais faire économiser chaque année.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’étiquette énergie classe les appareils de A à G : c’est ' + c.mot('classe') + '. A consomme le moins, G le plus. ' +
        'Elle donne aussi ' + c.mot('conso') + ', en kilowattheures. Coût par an : cette consommation multipliée par le prix d’un kilowattheure. ' +
        'L’astuce : compare toujours le prix d’achat et le coût de l’électricité sur plusieurs années.',
    },

    vocabulaire: {
      termes: {
        classe: { sesMots: 'la lettre de l’étiquette', officiel: 'la classe énergétique', lesDeux: 'la lettre de l’étiquette, que les techniciens appellent la classe énergétique' },
        conso: { sesMots: 'l’électricité utilisée en un an', officiel: 'la consommation annuelle', lesDeux: 'l’électricité utilisée en un an, que les techniciens appellent la consommation annuelle' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la lettre de l’étiquette, et l’électricité utilisée en un an. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la classe énergétique, de A à G, et la consommation annuelle, en kilowattheures.',
        'Tu connais les mots officiels : la classe énergétique et la consommation annuelle. Elles disent si un appareil est économe en énergie.',
      ],
    },

    exercices: [
      {
        id: 'cout-annuel',
        univers: 'famille',
        // [kWh par an, prix du kWh en euros]
        versions: [[150, 0.2], [200, 0.25], [400, 0.2], [300, 0.25], [120, 0.25], [250, 0.2]],
        genere(c) {
          const [k, p] = c.alea.choisir(this.versions);
          const cout = r2(k * p);
          return {
            enonce: 'Un réfrigérateur consomme ' + k + ' kWh par an. Le kilowattheure coûte ' + ecr(p) + ' euro. Combien coûte son électricité en un an, en euros ?',
            image: ETIQ('C', k, 'Le réfrigérateur'),
            reponse: { type: 'nombre', valeur: cout },
            aide: 'Calcule ' + k + ' × ' + ecr(p) + '.',
            aideParlee: 'Multiplie la consommation annuelle par le prix d’un kilowattheure.',
            correction: [k + ' × ' + ecr(p) + ' = ' + ecr(cout) + ' euros.'],
          };
        },
      },
      {
        id: 'economie-par-an',
        univers: 'commerce',
        // [kWh de l'appareil G, kWh de l'appareil B, prix du kWh]
        versions: [[400, 150, 0.2], [500, 200, 0.2], [350, 150, 0.25], [300, 100, 0.25], [450, 250, 0.2]],
        genere(c) {
          const [g, b, p] = c.alea.choisir(this.versions);
          const e = r2((g - b) * p);
          return {
            enonce: 'Le réfrigérateur G consomme ' + g + ' kWh par an ; le réfrigérateur B, ' + b + ' kWh. Le kilowattheure coûte ' + ecr(p) + ' euro. Combien d’euros le B fait-il économiser par an ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Calcule (' + g + ' − ' + b + ') × ' + ecr(p) + '.',
            aideParlee: 'Calcule la différence de consommation, puis multiplie-la par le prix d’un kilowattheure.',
            correction: [g + ' − ' + b + ' = ' + (g - b) + ' kWh.', (g - b) + ' × ' + ecr(p) + ' = ' + ecr(e) + ' euros.'],
          };
        },
      },
      O.qcm('plus-sobre', 'appareils',
        [[['B', 'E'], 'La classe B'], [['F', 'C'], 'La classe C'], [['A', 'D'], 'La classe A'], [['G', 'E'], 'La classe E']],
        (x) => 'Deux appareils font le même travail : l’un est en classe ' + x[0] + ', l’autre en classe ' + x[1] + '. Quelle classe consomme le moins ?', CLASSES.split('').map((l) => 'La classe ' + l),
        'A consomme le moins, G le plus.'),
      O.qcm('que-dit-le-nombre', 'appareils',
        [['150 kWh par an', 'L’électricité consommée en un an'], ['400 kWh par an', 'L’électricité consommée en un an']],
        (x) => 'Sur l’étiquette, que veut dire « ' + x + ' » ?', ['L’électricité consommée en un an', 'Le prix de l’appareil', 'La durée de la garantie'],
        'C’est une quantité d’énergie, pour un an.'),
      {
        id: 'lave-linge',
        univers: 'famille',
        // [kWh pour 100 lavages, lavages par an]
        versions: [[50, 200], [60, 150], [70, 200], [55, 100], [80, 250]],
        genere(c) {
          const [k, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’étiquette d’un lave-linge ne donne pas la consommation par an, mais pour 100 lavages : ' + k + ' kWh. Clarisse, la tante de Rachel, fait ' + n + ' lavages par an. Combien de kWh son lave-linge consomme-t-il en un an ?',
            reponse: { type: 'nombre', valeur: (k * n) / 100 },
            aide: 'Calcule ' + k + ' × ' + n + ' ÷ 100.',
            aideParlee: 'Multiplie la consommation pour cent lavages par le nombre de lavages, puis divise par cent.',
            correction: [k + ' × ' + n + ' ÷ 100 = ' + ecr((k * n) / 100) + ' kWh.'],
          };
        },
      },
      {
        id: 'annees-pour-rembourser',
        univers: 'commerce',
        // [différence de prix à l'achat en euros, économie par an en euros]
        versions: [[100, 50], [150, 50], [120, 40], [90, 30], [200, 50], [60, 20]],
        genere(c) {
          const [d, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le réfrigérateur B coûte ' + d + ' euros de plus à l’achat que le G, mais il fait économiser ' + e + ' euros d’électricité par an. Au bout de combien d’années la différence est-elle remboursée ?',
            reponse: { type: 'nombre', valeur: d / e },
            aide: 'Calcule ' + d + ' ÷ ' + e + '.',
            aideParlee: 'Divise la différence de prix par l’économie d’une année.',
            correction: [d + ' ÷ ' + e + ' = ' + d / e + ' ans.'],
          };
        },
      },
    ],

    defi: {
      // [prix G, kWh G, prix B, kWh B, prix du kWh]
      versions: [[300, 400, 400, 150, 0.2], [350, 500, 500, 200, 0.2], [280, 350, 380, 150, 0.25], [320, 300, 420, 100, 0.25]],
      genere(c) {
        const [pg, kg, pb, kb, p] = c.alea.choisir(this.versions);
        const cg = r2(kg * p), cb = r2(kb * p), e = r2(cg - cb), ans = (pb - pg) / e;
        return {
          enonce: 'Laure compare deux réfrigérateurs de même taille. Le réfrigérateur G coûte ' + pg + ' euros et consomme ' + kg + ' kWh par an. ' +
            'Le réfrigérateur B coûte ' + pb + ' euros et consomme ' + kb + ' kWh par an. Le kilowattheure coûte ' + ecr(p) + ' euro.',
          image: ETIQ('B', kb, 'Le réfrigérateur B'),
          questions: [
            {
              texte: 'Question 1. Combien coûte l’électricité du réfrigérateur G en un an ?',
              reponse: { type: 'nombre', valeur: cg },
              aide: 'Multiplie la consommation annuelle par le prix d’un kilowattheure.',
              correction: [kg + ' × ' + ecr(p) + ' = ' + ecr(cg) + ' euros.'],
            },
            {
              texte: 'Question 2. Combien d’euros le réfrigérateur B fait-il économiser par an ?',
              reponse: { type: 'nombre', valeur: e },
              aide: 'Calcule le coût annuel du B, puis la différence avec le G.',
              correction: [kb + ' × ' + ecr(p) + ' = ' + ecr(cb) + ' euros.', ecr(cg) + ' − ' + ecr(cb) + ' = ' + ecr(e) + ' euros.'],
            },
            {
              texte: 'Question 3. Au bout de combien d’années la différence de prix d’achat est-elle remboursée ?',
              reponse: { type: 'nombre', valeur: ans },
              aide: 'Divise la différence de prix d’achat par l’économie d’une année.',
              correction: [pb + ' − ' + pg + ' = ' + (pb - pg) + ' euros.', (pb - pg) + ' ÷ ' + ecr(e) + ' = ' + ecr(ans) + ' ans.'],
            },
            {
              texte: 'Question 4. Un réfrigérateur dure souvent plus de dix ans. Lequel conseilles-tu à Laure ? Justifie.',
              correction: ['Le réfrigérateur B : il coûte plus cher à l’achat, mais la différence est remboursée en ' + ecr(ans) + ' ans.', 'Ensuite, il fait économiser de l’argent chaque année, et il consomme moins d’énergie.'],
              grille: ['As-tu comparé le prix d’achat et le coût de l’électricité ?', 'As-tu utilisé la durée de remboursement ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une lettre, une consommation, un calcul sur plusieurs années : tu sais lire l’étiquette énergie mieux qu’un vendeur.',
    carte: ['cout-annuel', 'plus-sobre', 'economie-par-an'],
    papierDuSoir: { exercices: ['economie-par-an', 'annees-pour-rembourser'], defi: true },
    automatismes: [
      {
        id: 'fois-zero-virgule-deux',
        versions: [100, 150, 200, 400],
        genere(c) { const k = c.alea.choisir(this.versions); return { enonce: k + ' × 0,2 = ?', reponse: { type: 'nombre', valeur: r2(k * 0.2) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Ghana, les réfrigérateurs, les climatiseurs et les micro-ondes sont notés avec des étoiles. Sans étiquette, prévient la Commission de l’énergie, on achète à ses risques.',
    prenoms: ['Laure', 'Rachel', 'Clarisse'],
  };
});
