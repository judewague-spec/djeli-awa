/* Notion 17 du bloc « Mesures, géométrie et espace » : la translation, frises et pavages. La frise du pagne de Rebecca, qui glisse sans tourner.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'translation',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Translation et frises',
    classe: '4e',
    univers: ['coiffure', 'danses'],

    accroche: {
      texte: 'Rebecca imprime une frise sur un pagne. Elle a un tampon en forme de triangle. Elle le pose, puis le fait glisser, toujours dans le même sens, de la même longueur. ' +
        'Le tampon ne tourne pas, il ne se retourne pas. Il glisse, c’est tout. Le motif se répète à l’infini.',
      image: { dessin: 'transformation', points: { A: [1, 2], B: [3, 2], C: [2, 4] }, image: [[5, 2], [7, 2], [6, 4]], cote: 10, description: 'Un quadrillage. Le triangle A, de coordonnées 1 et 2, B, de coordonnées 3 et 2, C, de coordonnées 2 et 4, en pointillés. Son image a glissé de 4 carreaux à droite : A prime 5 et 2, B prime 7 et 2, C prime 6 et 4.' },
    },

    manipulation: {
      type: 'transformation',
      genre: 'translation',
      points: { A: [1, 1], B: [3, 1], C: [2, 3] },
      cote: 10,
      cible: [4, 2],
      consigne: 'Fais glisser le triangle de quatre carreaux vers la droite, et de deux carreaux vers le haut. Les coordonnées de son image sont écrites à l’écran. Puis valide.',
    },

    decouverte: {
      texte: (c) => 'Faire glisser une figure sans la tourner, c’est ' + c.mot('translation') + '. Tous les points bougent de la même façon : même direction, même sens, même longueur. ' +
        'L’astuce : regarde où va un seul point, et tu sais où vont tous les autres. Les longueurs et les angles ne changent pas. Un motif qui glisse plusieurs fois donne une frise. S’il couvre toute la surface, c’est ' + c.mot('pavage') + '.',
    },

    vocabulaire: {
      termes: {
        translation: { sesMots: 'le glissement', officiel: 'une translation', lesDeux: 'le glissement, que l’on appelle une translation' },
        pavage: { sesMots: 'un carrelage de motifs', officiel: 'un pavage', lesDeux: 'un carrelage de motifs, que l’on appelle un pavage' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le glissement, et un carrelage de motifs. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une translation, pour le glissement. Et un carrelage de motifs s’appelle un pavage.',
        'Tu connais les mots officiels : une translation, et un pavage.',
      ],
    },

    exercices: [
      {
        id: 'abscisse-image',
        univers: 'danses',
        // [x, y, dx, dy]
        versions: [[1, 2, 4, 1], [2, 3, 3, 2], [5, 1, -2, 3], [0, 4, 6, -1], [3, 3, 2, -2], [7, 5, -3, -2]],
        genere(c) {
          const [x, y, dx, dy] = c.alea.choisir(this.versions);
          const sens = dx > 0 ? dx + ' carreaux à droite' : -dx + ' carreaux à gauche';
          const haut = dy > 0 ? dy + ' vers le haut' : -dy + ' vers le bas';
          return {
            enonce: 'Une danseuse est sur le quadrillage de la scène, au point de coordonnées (' + x + ' ; ' + y + '). Elle glisse de ' + sens + ' et de ' + haut + '. Quelle est sa nouvelle abscisse, le premier nombre ?',
            reponse: { type: 'nombre', valeur: x + dx },
            aide: 'À droite, on ajoute. À gauche, on enlève.',
            correction: [x + (dx > 0 ? ' + ' + dx : ' − ' + -dx) + ' = ' + (x + dx) + '.'],
          };
        },
      },
      {
        id: 'ordonnee-image',
        univers: 'danses',
        versions: [[1, 2, 4, 1], [2, 3, 3, 2], [5, 1, -2, 3], [0, 4, 6, -1], [3, 3, 2, -2], [7, 5, -3, -2]],
        genere(c) {
          const [x, y, dx, dy] = c.alea.choisir(this.versions);
          const sens = dx > 0 ? dx + ' carreaux à droite' : -dx + ' carreaux à gauche';
          const haut = dy > 0 ? dy + ' vers le haut' : -dy + ' vers le bas';
          return {
            enonce: 'Le point A(' + x + ' ; ' + y + ') glisse de ' + sens + ' et de ' + haut + '. Quelle est la nouvelle ordonnée, le second nombre ?',
            reponse: { type: 'nombre', valeur: y + dy },
            aide: 'Vers le haut, on ajoute. Vers le bas, on enlève.',
            correction: [y + (dy > 0 ? ' + ' + dy : ' − ' + -dy) + ' = ' + (y + dy) + '.'],
          };
        },
      },
      {
        id: 'longueur-conservee',
        univers: 'coiffure',
        versions: [[6], [4.5], [12], [3], [7.5], [10]],
        genere(c) {
          const [d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un motif du pagne a un côté de ' + ecr(d) + ' cm. Par une translation, le tampon imprime un motif identique plus loin. Combien mesure ce côté sur le nouveau motif, en cm ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Un glissement ne change aucune longueur.',
            correction: ['La translation conserve les longueurs.', 'Le côté mesure ' + ecr(d) + ' cm.'],
          };
        },
      },
      {
        id: 'longueur-de-frise',
        univers: 'coiffure',
        // [largeur du motif en cm, nombre de motifs]
        versions: [[5, 8], [4, 12], [6, 15], [2.5, 10], [8, 6], [10, 9]],
        genere(c) {
          const [l, n] = c.alea.choisir(this.versions);
          const t = Math.round(l * n * 100) / 100;
          return {
            enonce: 'Rebecca imprime une frise de ' + n + ' motifs identiques, de ' + ecr(l) + ' cm de large, posés bord à bord. Quelle est la longueur de la frise, en cm ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Chaque motif glisse d’une largeur. Multiplie.',
            correction: [n + ' × ' + ecr(l) + ' = ' + ecr(t) + ' cm.'],
          };
        },
      },
      Q('glisse-ou-pas', 'danses',
        [['Un tampon que l’on pose plusieurs fois de suite le long d’un bord, sans le tourner.', 'Oui, c’est une translation'], ['Un dessin que l’on retourne en le pliant.', 'Non, ce n’est pas une translation'], ['Une danseuse qui tourne sur elle-même.', 'Non, ce n’est pas une translation'], ['Une caisse poussée tout droit sur le sol, sans tourner.', 'Oui, c’est une translation'], ['Un carreau que l’on fait pivoter d’un quart de tour.', 'Non, ce n’est pas une translation'], ['Dans un pavage, on passe d’un carreau au suivant en le faisant glisser, sans le tourner.', 'Oui, c’est une translation']],
        (x) => x + ' Est-ce une translation ?', ['Oui, c’est une translation', 'Non, ce n’est pas une translation'],
        'La figure glisse-t-elle, sans tourner et sans se retourner ?',
        'Une translation fait seulement glisser : elle ne tourne pas, elle ne retourne pas.'),
    ],

    defi: {
      // [A, B, C abscisses/ordonnées, dx, dy]
      versions: [[1, 1, 4, 1, 1, 3, 4, 2], [2, 1, 5, 1, 2, 5, 3, 2], [1, 2, 3, 2, 1, 4, 5, 3], [2, 2, 6, 2, 2, 5, 2, 4]],
      genere(c) {
        const [xa, ya, xb, yb, xc, yc, dx, dy] = c.alea.choisir(this.versions);
        const ab = xb - xa;
        return {
          enonce: 'Dans un repère, on donne les points A(' + xa + ' ; ' + ya + '), B(' + xb + ' ; ' + yb + ') et C(' + xc + ' ; ' + yc + '). On appelle A′B′C′ l’image du triangle ABC par la translation qui déplace chaque point de ' + dx + ' carreaux à droite et de ' + dy + ' carreaux vers le haut.',
          image: { dessin: 'transformation', points: { A: [xa, ya], B: [xb, yb], C: [xc, yc] }, image: [[xa + dx, ya + dy], [xb + dx, yb + dy], [xc + dx, yc + dy]], cote: 10, description: 'Un quadrillage. Le triangle A B C, avec A ' + xa + ' et ' + ya + ', B ' + xb + ' et ' + yb + ', C ' + xc + ' et ' + yc + '. Le triangle image, déplacé de ' + dx + ' à droite et de ' + dy + ' vers le haut.' },
          questions: [
            {
              texte: 'Question 1. Quelle est l’abscisse du point A′ ?',
              reponse: { type: 'nombre', valeur: xa + dx },
              aide: 'Ajoute le déplacement vers la droite.',
              correction: [xa + ' + ' + dx + ' = ' + (xa + dx) + '.'],
            },
            {
              texte: 'Question 2. Quelle est l’ordonnée du point C′ ?',
              reponse: { type: 'nombre', valeur: yc + dy },
              aide: 'Ajoute le déplacement vers le haut.',
              correction: [yc + ' + ' + dy + ' = ' + (yc + dy) + '.'],
            },
            {
              texte: 'Question 3. La longueur AB vaut ' + ab + ' carreaux. Combien vaut A′B′, en carreaux ?',
              reponse: { type: 'nombre', valeur: ab },
              aide: 'Un glissement ne change aucune longueur.',
              correction: ['La translation conserve les longueurs : A′B′ = ' + ab + '.'],
            },
            {
              texte: 'Question 4. Le quadrilatère ABB′A′ est un parallélogramme. Expliquer pourquoi.',
              correction: ['A et B glissent de la même façon : les segments [AA′] et [BB′] ont même direction, même sens et même longueur.', 'Un quadrilatère avec deux côtés opposés parallèles et de même longueur est un parallélogramme.'],
              grille: ['As-tu parlé de la même direction et de la même longueur pour [AA′] et [BB′] ?', 'As-tu conclu avec la propriété du parallélogramme ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Ton tampon glisse juste : frises et pavages n’ont plus qu’à se répéter.',
    carte: ['abscisse-image', 'longueur-conservee', 'glisse-ou-pas'],
    papierDuSoir: { exercices: ['ordonnee-image', 'longueur-de-frise'], defi: true },
    automatismes: [
      {
        id: 'somme-relative',
        versions: [[5, -2], [3, 4], [7, -3], [1, 6]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' + (' + String(b).replace('-', '−') + ') = ?', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, un dessin du royaume bamoun montre les rois devant les murs à motifs géométriques du palais de Foumban.',
    prenoms: ['Rebecca'],
  };
});
