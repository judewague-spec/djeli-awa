/* Notion du bloc « Données, probabilités, programmation » : le diagramme circulaire. Les fruits d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const FRACS = ['la moitié du rond', 'le quart du rond', 'le tiers du rond', 'le sixième du rond'];
  const IMG = { dessin: 'circulaire', parts: [['mangues', 180], ['bananes', 120], ['ananas', 60]], description: 'Un diagramme circulaire de 36 fruits. Les mangues : 18 fruits, un angle de 180 degrés. Les bananes : 12 fruits, un angle de 120 degrés. Les ananas : 6 fruits, un angle de 60 degrés.' };

  return {
    id: 'diagramme-circulaire',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Le diagramme circulaire',
    classe: '4e',
    univers: ['commerce', 'cuisine-restaurant'],

    accroche: {
      texte: 'Aminata a vendu 36 fruits. Il y a 18 mangues, 12 bananes et 6 ananas. Elle veut tout montrer sur un seul rond, partagé en parts. ' +
        'Un tour complet du rond fait 360 degrés. Les mangues prendront la moitié du rond : 180 degrés.',
      image: IMG,
    },

    manipulation: {
      image: IMG,
      etapes: [
        'Le rond entier fait 360 degrés. Il représente tous les fruits vendus.',
        'Plus il y a de fruits, plus la part du rond est grande. C’est proportionnel.',
        'Ici, 36 fruits se partagent 360 degrés : chaque fruit vaut 10 degrés.',
        'Les 18 mangues prennent 18 fois 10 degrés, soit 180 degrés. Les 12 bananes prennent 120 degrés.',
      ],
    },

    decouverte: {
      texte: (c) => 'Chaque sorte de fruit a sa place dans le rond. Regarde-la. C’est ' + c.mot('secteur') + '. ' +
        'Calcule 360 divisé par 36. Regarde ce nombre. C’est ' + c.mot('coefficient') + '. ' +
        'L’astuce : angle égale nombre de fruits, divisé par le total, fois 360.',
    },

    vocabulaire: {
      termes: {
        secteur: { sesMots: 'un morceau de rond, comme une part de gâteau', officiel: 'un secteur', lesDeux: 'un morceau de rond, comme une part de gâteau, que l’on appelle un secteur' },
        coefficient: { sesMots: 'ce que vaut un seul fruit en degrés', officiel: 'le coefficient de proportionnalité', lesDeux: 'ce que vaut un seul fruit en degrés, que l’on appelle le coefficient de proportionnalité' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un morceau de rond, et ce que vaut un seul fruit en degrés. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : un secteur, pour un morceau de rond. Ce que vaut un seul fruit en degrés s’appelle le coefficient de proportionnalité.',
        'Tu connais les mots officiels : le secteur et le coefficient de proportionnalité.',
      ],
    },

    exercices: [
      {
        id: 'calculer-un-angle',
        univers: 'commerce',
        // [effectif du fruit, effectif total]
        versions: [[18, 36], [5, 20], [9, 24], [8, 30], [15, 40], [20, 45]],
        genere(c) {
          const [e, t] = c.alea.choisir(this.versions);
          const k = 360 / t;
          return {
            enonce: 'Aminata a vendu ' + t + ' fruits, dont ' + e + ' mangues. Pour son diagramme circulaire, quel est l’angle du secteur des mangues, en degrés ?',
            reponse: { type: 'nombre', valeur: e * k },
            aide: 'Divise 360 par le nombre total de fruits, puis multiplie par le nombre de mangues.',
            correction: ['360 ÷ ' + t + ' = ' + k + ' degrés pour un fruit.', e + ' × ' + k + ' = ' + (e * k) + ' degrés.'],
          };
        },
      },
      {
        id: 'effectif-depuis-angle',
        univers: 'commerce',
        // [angle du secteur, effectif total]
        versions: [[90, 36], [120, 24], [60, 30], [144, 40], [45, 24], [72, 20]],
        genere(c) {
          const [a, t] = c.alea.choisir(this.versions);
          const k = 360 / t, e = a / k;
          return {
            enonce: 'Le diagramme circulaire d’Aminata représente ' + t + ' fruits. Le secteur des bananes mesure ' + a + ' degrés. Combien de bananes a-t-elle vendues ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Trouve ce que vaut un fruit en degrés, puis demande-toi combien de fois il tient dans l’angle.',
            correction: ['360 ÷ ' + t + ' = ' + k + ' degrés pour un fruit.', a + ' ÷ ' + k + ' = ' + e + ' bananes.'],
          };
        },
      },
      {
        id: 'angle-manquant',
        univers: 'cuisine-restaurant',
        // [angle du premier secteur, angle du deuxième secteur]
        versions: [[180, 90], [120, 150], [100, 140], [200, 75], [90, 90], [150, 60]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un diagramme circulaire a trois secteurs. Le premier mesure ' + a + ' degrés, le deuxième ' + b + ' degrés. Combien mesure le troisième, en degrés ?',
            reponse: { type: 'nombre', valeur: 360 - a - b },
            aide: 'Les trois parts du rond font ensemble un tour complet.',
            correction: [a + ' + ' + b + ' = ' + (a + b) + '.', '360 − ' + (a + b) + ' = ' + (360 - a - b) + ' degrés.'],
          };
        },
      },
      {
        id: 'quelle-part-du-rond',
        univers: 'cuisine-restaurant',
        // [angle, bonne réponse]
        versions: [[180, FRACS[0]], [90, FRACS[1]], [120, FRACS[2]], [60, FRACS[3]], [180, FRACS[0]], [90, FRACS[1]]],
        genere(c) {
          const [a, juste] = c.alea.choisir(this.versions);
          const k = { 180: '360 ÷ 180 = 2', 90: '360 ÷ 90 = 4', 120: '360 ÷ 120 = 3', 60: '360 ÷ 60 = 6' }[a];
          return {
            enonce: 'Dans un diagramme circulaire, un secteur mesure ' + a + ' degrés. Quelle part du rond représente-t-il ?',
            reponse: O.choix(c.alea, juste, FRACS.filter((f) => f !== juste).slice(0, 2)),
            aide: 'Demande-toi combien de parts pareilles feraient un tour complet.',
            correction: [k + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'plus-grand-secteur',
        univers: 'commerce',
        // [mangues, bananes, ananas]
        versions: [[18, 12, 6], [10, 25, 15], [30, 14, 16], [9, 11, 20], [22, 8, 10], [14, 12, 24]],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const noms = ['mangues', 'bananes', 'ananas'];
          const juste = noms[l.indexOf(Math.max(...l))];
          return {
            enonce: 'Aminata a vendu ' + l[0] + ' mangues, ' + l[1] + ' bananes et ' + l[2] + ' ananas. Quel fruit aura le plus grand secteur dans son diagramme circulaire ?',
            reponse: O.choix(c.alea, juste, noms.filter((x) => x !== juste)),
            aide: 'L’angle est proportionnel au nombre de fruits : le plus grand nombre donne le plus grand angle.',
            correction: ['Le plus grand nombre est ' + Math.max(...l) + ' : ce sont les ' + juste + '.', 'Leur secteur est donc le plus grand.'],
          };
        },
      },
    ],

    defi: {
      // [bissap, gingembre, baobab] : clients interrogés, total 20, 24, 30, 36 ou 40
      versions: [[12, 8, 4], [15, 10, 5], [18, 12, 6], [20, 15, 5], [9, 6, 5]],
      genere(c) {
        const [a, b, d] = c.alea.choisir(this.versions);
        const t = a + b + d, k = 360 / t;
        return {
          enonce: 'Moussa demande à des clients leur jus préféré. Bissap : ' + a + ' clients. Gingembre : ' + b + ' clients. Baobab : ' + d + ' clients. Il veut tracer un diagramme circulaire.',
          image: { dessin: 'circulaire', parts: [['bissap', a * k], ['gingembre', b * k], ['baobab', d * k]], description: 'Un diagramme circulaire de ' + t + ' clients. Le bissap : ' + a + ' clients, ' + (a * k) + ' degrés. Le gingembre : ' + b + ' clients, ' + (b * k) + ' degrés. Le baobab : ' + d + ' clients, ' + (d * k) + ' degrés.' },
          questions: [
            {
              texte: 'Question 1. Combien de clients Moussa a-t-il interrogés en tout ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Ajoute les trois nombres.',
              correction: [a + ' + ' + b + ' + ' + d + ' = ' + t + ' clients.'],
            },
            {
              texte: 'Question 2. Quel est l’angle du secteur du bissap, en degrés ?',
              reponse: { type: 'nombre', valeur: a * k },
              aide: 'Trouve ce que vaut un client en degrés, puis multiplie.',
              correction: ['360 ÷ ' + t + ' = ' + k + ' degrés pour un client.', a + ' × ' + k + ' = ' + (a * k) + ' degrés.'],
            },
            {
              texte: 'Question 3. Quel est l’angle du secteur du gingembre, en degrés ?',
              reponse: { type: 'nombre', valeur: b * k },
              aide: 'Même méthode que pour le bissap.',
              correction: [b + ' × ' + k + ' = ' + (b * k) + ' degrés.'],
            },
            {
              texte: 'Question 4. Explique comment Moussa trouve l’angle du baobab. Vérifie ensuite que les trois angles font 360 degrés.',
              correction: ['Angle du baobab : ' + d + ' × ' + k + ' = ' + (d * k) + ' degrés.', (a * k) + ' + ' + (b * k) + ' + ' + (d * k) + ' = 360 degrés.'],
              grille: ['As-tu calculé ce que vaut un client en degrés ?', 'As-tu multiplié par le nombre de clients du baobab ?', 'As-tu ajouté les trois angles et trouvé 360 ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un fruit, quelques degrés : tu sais découper un rond pour montrer les parts de chacun.',
    carte: ['calculer-un-angle', 'effectif-depuis-angle', 'quelle-part-du-rond'],
    papierDuSoir: { exercices: ['effectif-depuis-angle', 'angle-manquant'], defi: true },
    automatismes: [
      {
        id: 'angle-rapide',
        versions: [[2, 10], [3, 10], [4, 10], [5, 10]],
        genere(c) { const [e, k] = c.alea.choisir(this.versions); return { enonce: 'Un fruit vaut ' + k + ' degrés. Quel est l’angle de ' + e + ' fruits ?', reponse: { type: 'nombre', valeur: e * k } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? L’Écossais William Playfair a dessiné un premier diagramme circulaire en 1801, avant sa version complète de 1805.',
    prenoms: ['Aminata', 'Moussa'],
  };
});
