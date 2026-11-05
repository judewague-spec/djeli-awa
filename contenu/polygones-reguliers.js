/* Notion 31 du bloc « Mesures, géométrie et espace » : les polygones réguliers (ancien programme). Le napperon à six côtés de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const hexagone = () => {
    const P = { O: [0, 0] };
    'ABCDEF'.split('').forEach((n, i) => { P[n] = [r2(Math.cos((i * Math.PI) / 3) * 4), r2(Math.sin((i * Math.PI) / 3) * 4)]; });
    return P;
  };
  const COTES = [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'F'], ['F', 'A']];

  return {
    id: 'polygones-reguliers',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Les polygones réguliers',
    classe: 'ancien programme',
    univers: ['coiffure', 'famille'],

    accroche: {
      texte: 'Clarisse coud un napperon à six côtés. Elle pose la pointe de son compas au centre, et trace un cercle. Puis, sans changer l’écart du compas, elle reporte le rayon tout autour du cercle. ' +
        'Six fois, et elle retombe exactement sur son point de départ. Tous les côtés sont égaux, tous les coins aussi.',
      image: { dessin: 'figure', points: hexagone(), cercles: [['O', 4]], segments: COTES, pointilles: [['O', 'A'], ['O', 'B']], description: 'Un hexagone régulier A B C D E F dans un cercle de centre O. Chacun des six côtés mesure autant que le rayon. L’angle au centre A O B mesure 60 degrés. Le triangle O A B est équilatéral.' },
    },

    manipulation: {
      etapes: [
        'Trace un cercle, et partage le tour en six parts égales : 360 divisé par 6 font 60 degrés.',
        'Relie les points l’un après l’autre : tu obtiens un hexagone régulier.',
        'Pour un carré, partage en quatre : 90 degrés. Pour un triangle équilatéral, partage en trois : 120 degrés.',
        'Chaque part est un triangle isocèle, avec son sommet au centre.',
      ],
    },

    decouverte: {
      texte: (c) => 'Tous les côtés sont égaux, et tous les angles aussi : c’est ' + c.mot('regulier') + '. Cette figure tient dans un cercle, et ses sommets partagent le tour en parts égales. ' +
        'L’astuce : ' + c.mot('centre') + ', c’est 360 degrés divisé par le nombre de côtés.',
    },

    vocabulaire: {
      termes: {
        regulier: { sesMots: 'une figure toute pareille', officiel: 'un polygone régulier', lesDeux: 'une figure toute pareille, que l’on appelle un polygone régulier' },
        centre: { sesMots: 'l’angle d’une part', officiel: 'l’angle au centre', lesDeux: 'l’angle d’une part, que l’on appelle l’angle au centre' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une figure toute pareille, et l’angle d’une part. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : un polygone régulier, pour une figure toute pareille. Et l’angle d’une part s’appelle l’angle au centre.',
        'Tu connais les mots officiels : un polygone régulier, et l’angle au centre.',
      ],
    },

    exercices: [
      {
        id: 'angle-au-centre',
        univers: 'coiffure',
        versions: [[3], [4], [5], [6], [8], [10]],
        genere(c) {
          const [n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un polygone régulier a ' + n + ' côtés. Combien mesure son angle au centre, en degrés ?',
            reponse: { type: 'nombre', valeur: 360 / n },
            aide: 'Partage un tour complet, soit 360 degrés, en parts égales.',
            aideParlee: 'Partage un tour complet en parts égales.',
            correction: ['360 ÷ ' + n + ' = ' + 360 / n + '°.'],
          };
        },
      },
      {
        id: 'perimetre',
        univers: 'famille',
        versions: [[6, 4], [5, 3], [8, 2.5], [4, 7], [10, 1.5], [3, 9]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          const p = r2(n * k);
          return {
            enonce: 'Un napperon est un polygone régulier à ' + n + ' côtés, de ' + ecr(k) + ' dm chacun. Quel ruban faut-il pour en faire le tour, en dm ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Multiplie le nombre de côtés par la longueur d’un côté.',
            correction: [n + ' × ' + ecr(k) + ' = ' + ecr(p) + ' dm.'],
          };
        },
      },
      {
        id: 'angle-du-coin',
        univers: 'coiffure',
        versions: [[3], [4], [5], [6], [8], [10]],
        genere(c) {
          const [n] = c.alea.choisir(this.versions);
          const a = 360 / n, s = (180 - a) / 2;
          return {
            enonce: 'Un polygone régulier a ' + n + ' côtés. Combien mesure l’angle de chacun de ses coins, en degrés ?',
            reponse: { type: 'nombre', valeur: 2 * s },
            aide: 'Chaque part est un triangle isocèle. Un coin est fait de deux angles de sa base.',
            correction: ['Angle au centre : ' + a + '°.', 'Base du triangle isocèle : (180 − ' + a + ') ÷ 2 = ' + s + '°.', 'Le coin : ' + s + ' × 2 = ' + 2 * s + '°.'],
          };
        },
      },
      {
        id: 'cote-hexagone',
        univers: 'famille',
        versions: [[5], [3], [7], [10], [2.5], [4]],
        genere(c) {
          const [r] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un hexagone régulier est tracé dans un cercle de rayon ' + ecr(r) + ' cm. Combien mesure chaque côté, en cm ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Dans un hexagone régulier, chaque part est un triangle équilatéral.',
            correction: ['Le triangle OAB est équilatéral.', 'Le côté mesure autant que le rayon : ' + ecr(r) + ' cm.'],
          };
        },
      },
      Q('regulier-ou-pas', 'coiffure',
        [['un carré', 'Oui'], ['un rectangle qui n’est pas un carré', 'Non'], ['un triangle équilatéral', 'Oui'], ['un losange qui n’est pas un carré', 'Non'], ['un triangle isocèle qui n’est pas équilatéral', 'Non'], ['un hexagone à six côtés et six angles égaux', 'Oui']],
        (x) => 'Est-ce un polygone régulier : ' + x + ' ?', ['Oui', 'Non'],
        'Il faut tous les côtés égaux, et tous les angles égaux.',
        'Un polygone régulier a tous ses côtés égaux, et tous ses angles égaux. L’un sans l’autre ne suffit pas.'),
    ],

    defi: {
      // [rayon]
      versions: [[4], [5], [6], [10]],
      genere(c) {
        const [r] = c.alea.choisir(this.versions);
        return {
          enonce: 'ABCDEF est un hexagone régulier de centre O, inscrit dans un cercle de ' + r + ' cm de rayon.',
          image: { dessin: 'figure', points: hexagone(), cercles: [['O', 4]], segments: COTES, pointilles: [['O', 'A'], ['O', 'B']], description: 'Un hexagone régulier A B C D E F, de centre O, dans un cercle de ' + r + ' centimètres de rayon. O A et O B sont en pointillés.' },
          questions: [
            {
              texte: 'Question 1. Calculer l’angle au centre AOB, en degrés.',
              reponse: { type: 'nombre', valeur: 60 },
              aide: 'Partage un tour en six.',
              correction: ['360 ÷ 6 = 60°.'],
            },
            {
              texte: 'Question 2. Combien mesure le côté [AB], en cm ?',
              reponse: { type: 'nombre', valeur: r },
              aide: 'Le triangle OAB est isocèle, avec un angle de 60 degrés.',
              aideParlee: 'Regarde le triangle formé par le centre et un côté.',
              correction: ['Le triangle OAB est équilatéral, donc AB = OA = ' + r + ' cm.'],
            },
            {
              texte: 'Question 3. Calculer le périmètre de l’hexagone, en cm.',
              reponse: { type: 'nombre', valeur: 6 * r },
              aide: 'Six côtés égaux.',
              correction: ['6 × ' + r + ' = ' + 6 * r + ' cm.'],
            },
            {
              texte: 'Question 4. Expliquer pourquoi le triangle OAB est équilatéral.',
              correction: ['OA = OB, car ce sont deux rayons : le triangle est isocèle en O.', 'Son angle en O mesure 60°, donc les deux autres mesurent (180 − 60) ÷ 2 = 60°.', 'Ses trois angles sont égaux : il est équilatéral.'],
              grille: ['As-tu dit que OA et OB sont des rayons ?', 'As-tu calculé les deux autres angles ?', 'As-tu conclu avec les trois angles égaux ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avec un compas et une seule ouverture, ton napperon tombe juste.',
    carte: ['angle-au-centre', 'cote-hexagone', 'regulier-ou-pas'],
    papierDuSoir: { exercices: ['angle-au-centre', 'angle-du-coin'], defi: true },
    automatismes: [
      {
        id: 'part-du-tour',
        versions: [[3], [4], [6], [10]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: '360 ÷ ' + a + ' = ?', reponse: { type: 'nombre', valeur: 360 / a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Chine, Liu Hui a approché le nombre pi avec un polygone à 96 côtés tracé dans un cercle.',
    prenoms: ['Clarisse'],
  };
});
