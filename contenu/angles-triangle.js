/* Notion 1 du bloc « Mesures, géométrie et espace » : la somme des angles d'un triangle. Le foulard de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const OUI = 'Oui, ce triangle existe', NON = 'Non, ce triangle n’existe pas';

  return {
    id: 'angles-triangle',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'La somme des angles',
    classe: '5e',
    univers: ['coiffure', 'maison-courses'],

    accroche: {
      texte: 'Rachel achète un foulard en triangle. Laure lui lance un défi : déchire les trois coins d’un triangle de papier, et colle-les côte à côte. ' +
        'Rachel essaie. Les trois coins forment toujours une ligne bien droite. Quel que soit le triangle !',
      image: { dessin: 'figure', points: { A: [0, 0], B: [6, 0], C: [2, 4] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'A']], angles: [['B', 'A', 'C', '63°'], ['A', 'B', 'C', '45°'], ['A', 'C', 'B', '72°']], description: 'Un triangle A B C. L’angle en A mesure 63 degrés, l’angle en B 45 degrés, l’angle en C 72 degrés. Ensemble : 180 degrés.' },
    },

    manipulation: {
      etapes: [
        'Prends une feuille, et découpe un triangle, de la forme que tu veux.',
        'Déchire ses trois coins, puis pose-les côte à côte, pointe contre pointe.',
        'Les trois coins forment une ligne droite : un demi-tour, soit 180 degrés.',
        'Recommence avec un autre triangle : le résultat ne change pas.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans tout triangle, ' + c.mot('somme') + ' fait 180 degrés. L’astuce : si tu connais deux angles, tu ajoutes, puis tu enlèves le résultat à 180. ' +
        'Dans un triangle ' + c.mot('rectangle') + ', il y a déjà 90 degrés : les deux autres angles se partagent les 90 qui restent.',
    },

    vocabulaire: {
      termes: {
        somme: { sesMots: 'le total des trois coins', officiel: 'la somme des angles', lesDeux: 'le total des trois coins, ou somme des angles,' },
        rectangle: { sesMots: 'avec un coin carré', officiel: 'rectangle', lesDeux: 'avec un coin carré, que l’on appelle rectangle' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le total des trois coins, et le triangle avec un coin carré. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la somme des angles, pour le total des trois coins. Et un triangle avec un coin carré s’appelle un triangle rectangle.',
        'Tu connais les mots officiels : la somme des angles, et le triangle rectangle.',
      ],
    },

    exercices: [
      {
        id: 'troisieme-angle',
        univers: 'coiffure',
        // [angle A, angle B]
        versions: [[50, 60], [40, 75], [35, 85], [70, 70], [25, 110], [90, 30]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le foulard de Rachel est un triangle ABC. L’angle en A mesure ' + a + '° et l’angle en B mesure ' + b + '°. Combien mesure l’angle en C, en degrés ?',
            reponse: { type: 'nombre', valeur: 180 - a - b },
            aide: 'Ajoute ' + a + ' et ' + b + ', puis enlève le résultat à 180.',
            aideParlee: 'Ajoute les deux angles, puis enlève le résultat à cent quatre-vingts.',
            correction: [a + ' + ' + b + ' = ' + (a + b) + '.', '180 − ' + (a + b) + ' = ' + (180 - a - b) + '°.'],
          };
        },
      },
      {
        id: 'triangle-rectangle',
        univers: 'maison-courses',
        versions: [[30], [45], [25], [60], [72], [38]],
        genere(c) {
          const [a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une étagère d’angle a la forme d’un triangle rectangle. L’un de ses angles aigus mesure ' + a + '°. Combien mesure l’autre angle aigu, en degrés ?',
            reponse: { type: 'nombre', valeur: 90 - a },
            aide: 'L’angle droit est déjà là. Les deux autres angles se partagent ce qui reste, soit 90 degrés.',
            aideParlee: 'L’angle droit est déjà là. Les deux autres angles se partagent ce qui reste.',
            correction: ['90 − ' + a + ' = ' + (90 - a) + '°.'],
          };
        },
      },
      {
        id: 'isocele-base',
        univers: 'coiffure',
        // l'angle du sommet
        versions: [[40], [100], [50], [80], [20], [120]],
        genere(c) {
          const [s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un foulard a la forme d’un triangle isocèle : deux côtés égaux, donc deux angles égaux. L’angle du sommet, entre les deux côtés égaux, mesure ' + s + '°. Combien mesure chacun des deux autres angles, en degrés ?',
            reponse: { type: 'nombre', valeur: (180 - s) / 2 },
            aide: 'Enlève ' + s + ' à 180, puis partage en deux.',
            aideParlee: 'Enlève l’angle du sommet à cent quatre-vingts, puis partage en deux.',
            correction: ['180 − ' + s + ' = ' + (180 - s) + '.', (180 - s) + ' ÷ 2 = ' + (180 - s) / 2 + '°.'],
          };
        },
      },
      Q('existe-ou-pas', 'maison-courses',
        [['60°, 60° et 60°', OUI], ['90°, 50° et 50°', NON], ['100°, 40° et 40°', OUI], ['70°, 70° et 50°', NON], ['90°, 45° et 45°', OUI]],
        (x) => 'Un triangle peut-il avoir pour angles ' + x + ' ?', [OUI, NON],
        'Ajoute les trois angles. Le total doit être exact.',
        'Dans un triangle, les trois angles font 180° en tout.'),
      Q('quel-triangle', 'coiffure',
        [['60°, 60° et 60°', 'Équilatéral'], ['90°, 40° et 50°', 'Rectangle'], ['30°, 30° et 120°', 'Isocèle, sans angle droit'], ['90°, 30° et 60°', 'Rectangle'], ['50°, 50° et 80°', 'Isocèle, sans angle droit']],
        (x) => 'Les angles d’un triangle mesurent ' + x + '. Comment s’appelle ce triangle ?', ['Équilatéral', 'Rectangle', 'Isocèle, sans angle droit'],
        'Cherche un angle droit, puis des angles égaux.',
        'Trois angles égaux : équilatéral. Un angle droit : rectangle. Deux angles égaux : isocèle.'),
    ],

    defi: {
      // [angle A, angle B]
      versions: [[50, 80], [40, 100], [30, 70], [60, 50]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        const d = 180 - a - b;
        const iso = d === a || d === b || a === b;
        const juste = iso ? 'Oui, il est isocèle' : 'Non, il n’est pas isocèle';
        return {
          enonce: 'ABC est un triangle tel que l’angle en A mesure ' + a + '° et l’angle en B mesure ' + b + '°.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [6, 0], C: [2, 3] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'A']], description: 'Un triangle A B C. L’angle en A mesure ' + a + ' degrés et l’angle en B mesure ' + b + ' degrés. Le dessin n’est pas à l’échelle.' },
          questions: [
            {
              texte: 'Question 1. Calculer la mesure de l’angle en C, en degrés.',
              reponse: { type: 'nombre', valeur: d },
              aide: 'La somme des trois angles est connue.',
              correction: ['180 − (' + a + ' + ' + b + ') = ' + d + '°.'],
            },
            {
              texte: 'Question 2. Ce triangle est-il isocèle ?',
              reponse: O.choix(c.alea, juste, ['Oui, il est isocèle', 'Non, il n’est pas isocèle']),
              aide: 'Regarde s’il a deux angles égaux.',
              correction: ['Les angles mesurent ' + a + '°, ' + b + '° et ' + d + '°.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 3. Rédiger la justification de la question 2, en citant la propriété utilisée.',
              correction: ['La somme des angles d’un triangle vaut 180°, donc l’angle en C mesure ' + d + '°.', iso ? 'Le triangle a deux angles égaux, donc il est isocèle.' : 'Les trois angles sont différents, donc le triangle n’est pas isocèle.'],
              grille: ['As-tu cité la somme des angles ?', 'As-tu écrit le calcul de l’angle en C ?', 'As-tu comparé les trois angles pour conclure ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Trois coins, un demi-tour : plus aucun triangle ne te cache un angle.',
    carte: ['troisieme-angle', 'triangle-rectangle', 'existe-ou-pas'],
    papierDuSoir: { exercices: ['troisieme-angle', 'isocele-base'], defi: true },
    automatismes: [
      {
        id: 'complement-180',
        versions: [[100], [120], [90], [150]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: '180 − ' + a + ' = ?', reponse: { type: 'nombre', valeur: 180 - a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Grèce, les Pythagoriciens savaient déjà que les angles d’un triangle font ensemble deux angles droits.',
    prenoms: ['Rachel', 'Laure'],
  };
});
