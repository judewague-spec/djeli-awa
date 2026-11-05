/* Notion 23 du bloc « Mesures, géométrie et espace » : Thalès en papillon. Mesurer la largeur d'une rivière sans la traverser.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'thales-papillon',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Thalès en papillon',
    classe: '3e',
    univers: ['dehors', 'champetre'],

    accroche: {
      texte: 'Moussa veut poser une passerelle sur la rivière, derrière le potager. Pas question de nager avec un mètre. Il plante un piquet sur sa rive, puis tend deux cordes qui se croisent en ce point. ' +
        'Il obtient deux triangles, un de chaque côté, opposés par la pointe. Cela ressemble à un papillon, et Thalès marche encore.',
      image: { dessin: 'figure', points: { O: [0, 0], A: [-4, -2], B: [-4, 2], C: [2, 1], D: [2, -1] }, segments: [['A', 'B', '20 m'], ['C', 'D', '10 m'], ['A', 'C'], ['B', 'D']], description: 'Un papillon. Les droites A C et B D se croisent en O. Les segments A B et C D sont parallèles. A B mesure 20 mètres, C D mesure 10 mètres. O A est 2 fois plus long que O C.' },
    },

    manipulation: {
      etapes: [
        'Trace deux droites qui se croisent en un point. Ce point est le corps du papillon.',
        'Trace deux segments parallèles, un de chaque côté, pour fermer les deux ailes.',
        'Fais tourner mentalement l’une des ailes d’un demi-tour : elle vient s’emboîter sur l’autre.',
        'On retrouve les triangles emboîtés. Les fractions de Thalès restent donc vraies.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde deux triangles ' + c.mot('opposes') + '. Si les deux segments sont parallèles, le théorème de Thalès s’applique encore. ' +
        'L’astuce : le point de croisement commence chaque nom. Écris une aile en haut de chaque fraction, l’autre aile en bas.',
    },

    vocabulaire: {
      termes: {
        opposes: { sesMots: 'en papillon', officiel: 'opposés par le sommet', lesDeux: 'en papillon, c’est-à-dire opposés par le sommet' },
      },
      textes: [
        'Pour l’instant, garde tes mots : des triangles en papillon. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : opposés par le sommet, pour des triangles en papillon.',
        'Tu connais le mot officiel : des triangles opposés par le sommet.',
      ],
    },

    exercices: [
      {
        id: 'cote-de-laile',
        univers: 'dehors',
        // [OC, OA, CD] : on cherche AB
        versions: [[2, 4, 3], [3, 9, 2], [5, 10, 4], [4, 6, 8], [2, 5, 6], [6, 9, 4]],
        genere(c) {
          const [oc, oa, cd] = c.alea.choisir(this.versions);
          const ab = r2((cd * oa) / oc);
          return {
            enonce: 'Les droites (AC) et (BD) se coupent en O, et (AB) est parallèle à (CD). On donne OC = ' + oc + ' m, OA = ' + oa + ' m et CD = ' + cd + ' m. Combien mesure AB, en mètres ?',
            reponse: { type: 'nombre', valeur: ab },
            aide: 'Écris OC sur OA égale CD sur AB, puis fais un produit en croix.',
            correction: ['OC/OA = CD/AB, soit ' + oc + '/' + oa + ' = ' + cd + '/AB.', 'AB = ' + cd + ' × ' + oa + ' ÷ ' + oc + ' = ' + ecr(ab) + ' m.'],
          };
        },
      },
      {
        id: 'largeur-riviere',
        univers: 'champetre',
        // [OC : rive proche, CD : piquets proches, AB : piquets lointains]
        versions: [[4, 5, 15], [6, 4, 8], [5, 3, 12], [8, 5, 10], [3, 2, 8], [10, 4, 10]],
        genere(c) {
          const [oc, cd, ab] = c.alea.choisir(this.versions);
          const oa = r2((oc * ab) / cd);
          return {
            enonce: 'Moussa veut connaître la distance OA, de son piquet O à un arbre A de l’autre rive. Le plan du village dit que les arbres A et B sont à AB = ' + ab + ' m l’un de l’autre. Il forme un papillon de centre O, avec (AB) parallèle à (CD), et il mesure OC = ' + oc + ' m et CD = ' + cd + ' m. Combien mesure OA, en mètres ?',
            reponse: { type: 'nombre', valeur: oa },
            aide: 'Écris OA sur OC égale AB sur CD.',
            correction: ['OA/OC = AB/CD, soit OA/' + oc + ' = ' + ab + '/' + cd + '.', 'OA = ' + oc + ' × ' + ab + ' ÷ ' + cd + ' = ' + ecr(oa) + ' m.'],
          };
        },
      },
      {
        id: 'rapport-des-ailes',
        univers: 'dehors',
        versions: [[2, 6], [3, 12], [5, 10], [4, 10], [2, 7], [8, 12]],
        genere(c) {
          const [oc, oa] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un papillon de centre O, OC = ' + oc + ' cm et OA = ' + oa + ' cm. Par combien faut-il multiplier les longueurs de la petite aile pour obtenir celles de la grande ?',
            reponse: { type: 'nombre', valeur: oa / oc },
            aide: 'Divise la longueur de la grande aile par celle de la petite.',
            correction: [oa + ' ÷ ' + oc + ' = ' + ecr(oa / oc) + '.'],
          };
        },
      },
      Q('emboites-ou-papillon', 'champetre',
        [['Le point A est entre O et C, et B est entre O et D.', 'Des triangles emboîtés'], ['Le point O est entre A et C, et entre B et D.', 'Un papillon'], ['Les droites (AC) et (BD) se coupent en O, avec les ailes de chaque côté de O.', 'Un papillon'], ['Les deux triangles sont du même côté de O.', 'Des triangles emboîtés']],
        (x) => x + ' Quelle figure a-t-on ?', ['Des triangles emboîtés', 'Un papillon'],
        'Le point de croisement est-il entre les deux triangles ?',
        'Si le point de croisement est entre les deux triangles, c’est un papillon.'),
      {
        id: 'bonne-fraction',
        univers: 'dehors',
        // [fraction donnée, bonne réponse, piège, piège]
        versions: [['OA/OC', 'OB/OD', 'OD/OB', 'OC/OA'], ['OB/OD', 'AB/CD', 'CD/AB', 'OD/OB'], ['AB/CD', 'OA/OC', 'OC/OA', 'CD/AB']],
        genere(c) {
          const [x, b, p1, p2] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un papillon de centre O, avec (AB) parallèle à (CD), A et C sont sur une droite, B et D sur l’autre. Quelle fraction est égale à ' + x + ' ?',
            reponse: O.choix(c.alea, b, [p1, p2]),
            aide: 'La même aile en haut de chaque fraction, l’autre aile en bas.',
            correction: ['OA/OC = OB/OD = AB/CD : la même aile en haut, à chaque fois.', 'Réponse : ' + b + '.'],
          };
        },
      },
    ],

    defi: {
      // [OC, OD, CD, OA]
      versions: [[3, 4, 2, 9], [4, 5, 3, 8], [2, 3, 2, 6], [5, 6, 4, 10]],
      genere(c) {
        const [oc, od, cd, oa] = c.alea.choisir(this.versions);
        const k = oa / oc;
        return {
          enonce: 'Les droites (AC) et (BD) se coupent en O. Les droites (AB) et (CD) sont parallèles. On donne OC = ' + oc + ' m, OD = ' + od + ' m, CD = ' + cd + ' m et OA = ' + oa + ' m.',
          image: { dessin: 'figure', points: { O: [0, 0], A: [-4, -2], B: [-4, 2], C: [2, 1], D: [2, -1] }, segments: [['A', 'B'], ['C', 'D'], ['A', 'C'], ['B', 'D']], description: 'Un papillon de centre O. A et C sont sur une droite, B et D sur l’autre. A B et C D sont parallèles. O C mesure ' + oc + ' mètres, O D ' + od + ' mètres, C D ' + cd + ' mètres, O A ' + oa + ' mètres. Le dessin n’est pas à l’échelle.' },
          questions: [
            {
              texte: 'Question 1. Calculer le rapport OA/OC.',
              reponse: { type: 'nombre', valeur: k },
              aide: 'Divise les deux longueurs.',
              correction: [oa + ' ÷ ' + oc + ' = ' + k + '.'],
            },
            {
              texte: 'Question 2. Calculer AB, en mètres.',
              reponse: { type: 'nombre', valeur: cd * k },
              aide: 'Multiplie CD par ce rapport.',
              correction: [cd + ' × ' + k + ' = ' + cd * k + ' m.'],
            },
            {
              texte: 'Question 3. Calculer OB, en mètres.',
              reponse: { type: 'nombre', valeur: od * k },
              aide: 'Multiplie OD par ce rapport.',
              correction: [od + ' × ' + k + ' = ' + od * k + ' m.'],
            },
            {
              texte: 'Question 4. Rédiger le calcul de AB, en citant le théorème utilisé.',
              correction: ['Les droites (AC) et (BD) se coupent en O, et (AB) est parallèle à (CD).', 'D’après le théorème de Thalès, OA/OC = OB/OD = AB/CD.', 'Donc AB = ' + cd + ' × ' + oa + ' ÷ ' + oc + ' = ' + cd * k + ' m.'],
              grille: ['As-tu donné les droites qui se coupent et les parallèles ?', 'As-tu cité le théorème de Thalès ?', 'As-tu écrit les fractions dans le bon ordre ?', 'As-tu conclu avec l’unité ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un point de croisement, deux ailes : ta passerelle sera à la bonne longueur.',
    carte: ['cote-de-laile', 'emboites-ou-papillon', 'bonne-fraction'],
    papierDuSoir: { exercices: ['cote-de-laile', 'largeur-riviere'], defi: true },
    automatismes: [
      {
        id: 'produit-en-croix',
        versions: [[3, 9, 2], [2, 8, 5], [5, 10, 4], [4, 12, 3]],
        genere(c) { const [a, b, d] = c.alea.choisir(this.versions); return { enonce: a + '/' + b + ' = ' + d + '/? : quel nombre manque ?', reponse: { type: 'nombre', valeur: (d * b) / a } }; },
      },
    ],
    savaisTu: null,
    prenoms: ['Moussa'],
  };
});
