/* Notion 6 du bloc « Mesures, géométrie et espace » : les conversions, longueurs, aires, volumes et contenances. Rachel commande du tissu et remplit des bidons.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r3 = (x) => Math.round(x * 1000) / 1000;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'conversions-unites',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Les conversions',
    classe: '4e',
    univers: ['commerce', 'maison-courses'],

    accroche: {
      texte: 'Rachel veut carreler sa cuisine. Le coin fait un mètre carré, et les carreaux un décimètre de côté. Elle pense : dix carreaux suffiront, puisqu’un mètre fait dix décimètres. ' +
        'Laure sourit, et pose une rangée au sol. Dix carreaux ne font qu’une seule rangée ! Il en faut dix rangées, soit cent carreaux.',
      image: { dessin: 'carrelage', cote: 10, description: 'Un carré d’un mètre de côté, couvert de 10 rangées de 10 carreaux d’un décimètre de côté. Il y a 100 carreaux en tout.' },
    },

    manipulation: {
      etapes: [
        'Un mètre, c’est dix décimètres : pour une longueur, on multiplie par dix à chaque unité.',
        'Un mètre carré, c’est dix rangées de dix carreaux : pour une aire, on multiplie par cent à chaque unité.',
        'Un mètre cube, c’est dix couches de cent petits cubes : pour un volume, on multiplie par mille à chaque unité.',
        'Et le décimètre cube, ce petit cube de dix centimètres de côté, contient juste un litre.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’astuce : regarde le petit chiffre de l’unité. Sans chiffre, on saute de dix en dix. Avec un 2, pour ' + c.mot('aire') + ', de cent en cent. Avec un 3, pour ' + c.mot('volume') + ', de mille en mille. ' +
        'Pour passer aux litres, retiens : un décimètre cube, c’est un litre.',
    },

    vocabulaire: {
      termes: {
        aire: { sesMots: 'la surface à couvrir', officiel: 'une aire', lesDeux: 'la surface à couvrir, que l’on appelle une aire' },
        volume: { sesMots: 'la place occupée', officiel: 'un volume', lesDeux: 'la place occupée, que l’on appelle un volume' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la surface à couvrir, et la place occupée. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une aire, pour la surface à couvrir. Et la place occupée s’appelle un volume.',
        'Tu connais les mots officiels : une aire, et un volume.',
      ],
    },

    exercices: [
      {
        id: 'longueur',
        univers: 'commerce',
        // [valeur, de, vers, facteur]
        versions: [[2.5, 'm', 'cm', 100], [350, 'cm', 'm', 0.01], [1.2, 'km', 'm', 1000], [45, 'mm', 'cm', 0.1], [800, 'm', 'km', 0.001], [3.4, 'm', 'mm', 1000]],
        genere(c) {
          const [v, de, vers, f] = c.alea.choisir(this.versions);
          const r = r3(v * f);
          return {
            enonce: 'Sur une fiche de chantier, une longueur est notée ' + ecr(v) + ' ' + de + '. Combien cela fait-il en ' + vers + ' ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Compte les rangs entre ' + de + ' et ' + vers + ' : pour une longueur, chaque rang vaut dix.',
            aideParlee: 'Compte les rangs entre les deux unités : pour une longueur, chaque rang vaut dix.',
            correction: [ecr(v) + ' ' + de + ' = ' + ecr(r) + ' ' + vers + '.'],
          };
        },
      },
      {
        id: 'aire',
        univers: 'maison-courses',
        versions: [[3, 'm²', 'dm²', 100], [2.5, 'm²', 'cm²', 10000], [450, 'dm²', 'm²', 0.01], [1200, 'cm²', 'dm²', 0.01], [0.02, 'km²', 'm²', 1000000], [6, 'dm²', 'cm²', 100]],
        genere(c) {
          const [v, de, vers, f] = c.alea.choisir(this.versions);
          const r = r3(v * f);
          return {
            enonce: 'Sur un plan, une surface est notée ' + ecr(v) + ' ' + de + '. Combien cela fait-il en ' + vers + ' ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Pour une aire, chaque rang vaut cent.',
            aideParlee: 'Pour une aire, chaque rang vaut cent. Compte les rangs entre les deux unités.',
            correction: [ecr(v) + ' ' + de + ' = ' + ecr(r) + ' ' + vers + '.'],
          };
        },
      },
      {
        id: 'volume',
        univers: 'maison-courses',
        versions: [[2, 'm³', 'dm³', 1000], [1.5, 'm³', 'dm³', 1000], [3000, 'cm³', 'dm³', 0.001], [0.75, 'dm³', 'cm³', 1000], [500, 'dm³', 'm³', 0.001], [4, 'dm³', 'cm³', 1000]],
        genere(c) {
          const [v, de, vers, f] = c.alea.choisir(this.versions);
          const r = r3(v * f);
          return {
            enonce: 'Sur une fiche, un volume est noté ' + ecr(v) + ' ' + de + '. Combien cela fait-il en ' + vers + ' ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Pour un volume, chaque rang vaut mille.',
            aideParlee: 'Pour un volume, chaque rang vaut mille. Compte les rangs entre les deux unités.',
            correction: [ecr(v) + ' ' + de + ' = ' + ecr(r) + ' ' + vers + '.'],
          };
        },
      },
      {
        id: 'litres',
        univers: 'commerce',
        // [valeur, de, facteur vers les litres]
        versions: [[20, 'dm³', 1], [1.5, 'm³', 1000], [750, 'cm³', 0.001], [0.2, 'm³', 1000], [2500, 'cm³', 0.001], [8, 'dm³', 1]],
        genere(c) {
          const [v, de, f] = c.alea.choisir(this.versions);
          const r = r3(v * f);
          return {
            enonce: 'Un récipient a un volume de ' + ecr(v) + ' ' + de + '. Combien de litres peut-il contenir ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Un litre, c’est un décimètre cube. Passe d’abord en décimètres cubes.',
            correction: de === 'dm³' ? ['1 L = 1 dm³.', 'Donc ' + ecr(r) + ' L.'] : ['1 L = 1 dm³.', ecr(v) + ' ' + de + ' = ' + ecr(r) + ' dm³, soit ' + ecr(r) + ' L.'],
          };
        },
      },
      Q('combien-pour-un', 'commerce',
        [['1 m en cm', '100'], ['1 m² en dm²', '100'], ['1 m³ en dm³', '1 000'], ['1 m² en cm²', '10 000'], ['1 km en m', '1 000'], ['1 dm³ en cm³', '1 000']],
        (x) => 'Que vaut ' + x + ' ?', ['100', '1 000', '10 000'],
        'Regarde le petit chiffre de l’unité, et compte les rangs.',
        'Chaque rang vaut dix pour une longueur, cent pour une aire, mille pour un volume.'),
    ],

    defi: {
      // [largeur en m, longueur en m, côté du carreau en dm]
      versions: [[2, 3, 2], [2, 4, 5], [3, 5, 2], [4, 5, 5]],
      genere(c) {
        const [l, L, k] = c.alea.choisir(this.versions);
        const aire = l * L, cm = aire * 100, n = cm / (k * k);
        return {
          enonce: 'Une pièce rectangulaire mesure ' + l + ' m sur ' + L + ' m. On veut la carreler avec des carreaux carrés de ' + k + ' dm de côté.',
          questions: [
            {
              texte: 'Question 1. Calculer l’aire de la pièce, en m².',
              reponse: { type: 'nombre', valeur: aire },
              aide: 'Longueur fois largeur.',
              correction: [l + ' × ' + L + ' = ' + aire + ' m².'],
            },
            {
              texte: 'Question 2. Exprimer cette aire en dm².',
              reponse: { type: 'nombre', valeur: cm },
              aide: 'Pour une aire, chaque rang vaut cent.',
              correction: [aire + ' m² = ' + cm + ' dm².'],
            },
            {
              texte: 'Question 3. Combien de carreaux faut-il, sans tenir compte des coupes ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Calcule d’abord l’aire d’un carreau.',
              correction: ['Un carreau : ' + k + ' × ' + k + ' = ' + k * k + ' dm².', cm + ' ÷ ' + k * k + ' = ' + n + ' carreaux.'],
            },
            {
              texte: 'Question 4. Quelqu’un dit : « 1 m² vaut 10 dm². » Expliquer son erreur.',
              correction: ['Un carré d’un mètre de côté a 10 rangées de 10 carreaux d’un décimètre de côté.', 'Donc 1 m² = 100 dm², et non 10.'],
              grille: ['As-tu donné la bonne égalité, 1 m² = 100 dm² ?', 'As-tu expliqué avec les rangées, ou avec 10 × 10 ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Dix, cent ou mille : le petit chiffre de l’unité n’a plus de secret pour toi.',
    carte: ['aire', 'volume', 'litres'],
    papierDuSoir: { exercices: ['aire', 'litres'], defi: true },
    automatismes: [
      {
        id: 'conversion-rapide',
        versions: [[3, 'm', 'cm', 100], [2, 'km', 'm', 1000], [5, 'm²', 'dm²', 100], [2, 'dm³', 'L', 1]],
        genere(c) { const [v, de, vers, f] = c.alea.choisir(this.versions); return { enonce: v + ' ' + de + ' = combien de ' + vers + ' ?', reponse: { type: 'nombre', valeur: v * f } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte, la coudée royale de référence était une règle de granit, divisée en 28 doigts.',
    prenoms: ['Rachel', 'Laure'],
  };
});
