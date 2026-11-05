/* Notion 7 du bloc « Proportionnalité, pourcentages et fonctions » : la masse volumique. L'huile sur l'eau d'Esther.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const r2 = (x) => Math.round(x * 100) / 100;
  const FLOTTE = 'Il flotte sur l’eau', COULE = 'Il coule dans l’eau';

  return {
    id: 'grandeur-masse-volumique',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'La masse volumique',
    classe: '3e',
    univers: ['cuisine-restaurant', 'maison-courses'],

    accroche: {
      texte: 'Esther verse de l’huile dans un verre d’eau : l’huile reste au-dessus. Elle pèse deux bouteilles d’un litre : celle d’eau pèse 1 kilo, celle d’huile 0,9 kilo. ' +
        'Pour un même volume, l’huile est plus légère. C’est pour cela qu’elle flotte.',
      image: { dessin: 'tableur', colonnes: ['Liquide', 'Volume (L)', 'Masse (kg)'], lignes: [['Eau', 1, 1], ['Huile', 1, '0,9']], description: 'Un tableau. Un litre d’eau a une masse de 1 kilo. Un litre d’huile a une masse de 0,9 kilo.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Masse d’huile : 1,8 kg', 'Volume : 2 L', '1,8 ÷ 2 = 0,9 kg par litre'], description: 'Une masse d’huile de 1,8 kilo, pour un volume de 2 litres. 1,8 divisé par 2 égale 0,9 kilo par litre.' },
      etapes: [
        'Pour une même matière, la masse est proportionnelle au volume. Deux fois plus de litres, deux fois plus de kilos.',
        'Le multiplicateur, c’est la masse d’un seul litre. On l’obtient en divisant la masse par le volume.',
        'Pour l’eau : 1 kg par litre. Pour l’huile : 0,9 kg par litre.',
        'Ce qui a moins de masse par litre que l’eau flotte sur l’eau. Ce qui en a plus coule.',
      ],
    },

    decouverte: {
      texte: (c) => 'La masse d’un litre de matière s’appelle ' + c.mot('masseVolumique') + '. On la trouve en divisant la masse par le volume. ' +
        'On l’écrit par exemple en kilos par litre. ' +
        'L’astuce : c’est encore une grandeur en deux morceaux, comme la vitesse et le débit.',
    },

    vocabulaire: {
      termes: {
        masseVolumique: { sesMots: 'la lourdeur', officiel: 'la masse volumique', lesDeux: 'la lourdeur, que les matheux et les physiciens appellent la masse volumique' },
      },
      textes: [
        'Pour l’instant, garde ton mot : la lourdeur d’une matière. ' +
          'Les scientifiques ont un mot à eux : je te le dirai la prochaine fois.',
        'Les scientifiques disent : la masse volumique, pour la lourdeur d’une matière. Elle s’écrit en kilos par litre.',
        'Tu connais le mot officiel : la masse volumique.',
      ],
    },

    exercices: [
      {
        id: 'calculer-la-masse-volumique',
        univers: 'maison-courses',
        // [kg, L]
        versions: [[1.8, 2], [4.5, 5], [2.7, 3], [13.6, 1], [2, 2.5], [3.6, 4]],
        genere(c) {
          const [m, v] = c.alea.choisir(this.versions);
          const r = r2(m / v);
          return {
            enonce: 'Un liquide a une masse de ' + ecr(m) + ' kg pour un volume de ' + ecr(v) + ' L. Quelle est sa masse volumique, en kg/L ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule ' + ecr(m) + ' ÷ ' + ecr(v) + '.',
            aideParlee: 'Divise la masse par le volume.',
            correction: [ecr(m) + ' ÷ ' + ecr(v) + ' = ' + ecr(r) + ' kg/L.'],
          };
        },
      },
      {
        id: 'calculer-la-masse',
        univers: 'cuisine-restaurant',
        // [kg/L, L]
        versions: [[0.9, 5], [1.2, 3], [0.8, 10], [1.1, 2], [0.9, 20], [1.4, 5]],
        genere(c) {
          const [r, v] = c.alea.choisir(this.versions);
          const m = r2(r * v);
          return {
            enonce: 'Un liquide a une masse volumique de ' + ecr(r) + ' kg/L. Quelle est la masse de ' + v + ' L de ce liquide, en kg ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Calcule ' + ecr(r) + ' × ' + v + '.',
            aideParlee: 'Multiplie la masse volumique par le volume.',
            correction: [ecr(r) + ' × ' + v + ' = ' + ecr(m) + ' kg.'],
          };
        },
      },
      {
        id: 'calculer-le-volume',
        univers: 'cuisine-restaurant',
        // [kg, kg/L]
        versions: [[4.5, 0.9], [6, 1.2], [8, 0.8], [2.2, 1.1], [18, 0.9], [7, 1.4]],
        genere(c) {
          const [m, r] = c.alea.choisir(this.versions);
          const v = r2(m / r);
          return {
            enonce: 'Laure a ' + ecr(m) + ' kg d’un liquide, de masse volumique ' + ecr(r) + ' kg/L. Quel volume cela fait-il, en litres ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Calcule ' + ecr(m) + ' ÷ ' + ecr(r) + '.',
            aideParlee: 'Divise la masse par la masse volumique.',
            correction: [ecr(m) + ' ÷ ' + ecr(r) + ' = ' + ecr(v) + ' L.'],
          };
        },
      },
      Q('flotte-ou-coule', 'maison-courses',
        [['Un objet de masse volumique 0,6 kg/L (l’eau : 1 kg/L)', FLOTTE], ['Un objet de masse volumique 2,7 kg/L (l’eau : 1 kg/L)', COULE], ['Un objet de masse volumique 0,9 kg/L (l’eau : 1 kg/L)', FLOTTE], ['Un objet de masse volumique 7,8 kg/L (l’eau : 1 kg/L)', COULE]],
        (x) => x + ' : que fait-il dans l’eau ?', [FLOTTE, COULE],
        'Compare sa masse volumique à celle de l’eau.',
        'Si sa masse volumique est plus petite que celle de l’eau, il flotte. Si elle est plus grande, il coule.'),
      Q('comme-quoi', 'cuisine-restaurant',
        [['Quelle grandeur se calcule en divisant une masse par un volume ?', 'La masse volumique'], ['Quelle grandeur se calcule en divisant une distance par une durée ?', 'La vitesse'], ['Quelle grandeur se calcule en divisant un volume par une durée ?', 'Le débit']],
        (x) => x, ['La masse volumique', 'La vitesse', 'Le débit'],
        'Regarde les deux grandeurs que l’on divise.',
        'Une grandeur composée se reconnaît à ce que l’on divise : masse par volume, distance par durée, ou volume par durée.'),
    ],

    defi: {
      // [masse d'huile en kg, litres d'huile, litres dans le bidon]
      versions: [[1.8, 2, 5], [4.5, 5, 10], [2.7, 3, 20], [3.6, 4, 15]],
      genere(c) {
        const [m, v, b] = c.alea.choisir(this.versions);
        const r = r2(m / v), t = r2(r * b);
        return {
          enonce: 'Au marché, Moussa pèse de l’huile de palme. Il trouve que ' + v + ' L ont une masse de ' + ecr(m) + ' kg. Il veut remplir un bidon de ' + b + ' L, dont la masse à vide est négligeable. L’eau a une masse volumique de 1 kg/L.',
          questions: [
            {
              texte: 'Question 1. Quelle est la masse volumique de cette huile, en kg/L ?',
              reponse: { type: 'nombre', valeur: r },
              aide: 'Divise la masse par le volume.',
              correction: [ecr(m) + ' ÷ ' + v + ' = ' + ecr(r) + ' kg/L.'],
            },
            {
              texte: 'Question 2. Quelle sera la masse du bidon rempli, en kg ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Multiplie la masse volumique par le volume du bidon.',
              correction: [ecr(r) + ' × ' + b + ' = ' + ecr(t) + ' kg.'],
            },
            {
              texte: 'Question 3. Moussa verse un peu de cette huile dans un seau d’eau. Que se passe-t-il ? Justifie.',
              correction: ['L’huile flotte sur l’eau.', 'Sa masse volumique, ' + ecr(r) + ' kg/L, est plus petite que celle de l’eau, 1 kg/L.'],
              grille: ['As-tu dit que l’huile flotte ?', 'As-tu comparé les deux masses volumiques ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une masse divisée par un volume, et tu sais pourquoi l’huile reste au-dessus de l’eau.',
    carte: ['calculer-la-masse-volumique', 'flotte-ou-coule', 'comme-quoi'],
    papierDuSoir: { exercices: ['calculer-la-masse', 'calculer-le-volume'], defi: true },
    automatismes: [
      {
        id: 'masse-rapide',
        versions: [[3, 2], [8, 4], [10, 5], [12, 3]],
        genere(c) { const [m, v] = c.alea.choisir(this.versions); return { enonce: m + ' kg pour ' + v + ' L : combien de kg/L ?', reponse: { type: 'nombre', valeur: m / v } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Djibouti, le lac Assal est dix fois plus salé que l’océan.',
    prenoms: ['Esther', 'Laure', 'Moussa'],
  };
});
