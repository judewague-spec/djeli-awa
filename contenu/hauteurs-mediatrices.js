/* Notion 4 du bloc « Mesures, géométrie et espace » : hauteurs et médiatrices. Le puits à égale distance de deux maisons, et la hauteur du toit.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const MED = 'Une médiatrice', HAU = 'Une hauteur', AUTRE = 'Ni l’une, ni l’autre';

  return {
    id: 'hauteurs-mediatrices',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Hauteurs et médiatrices',
    classe: '5e',
    univers: ['champetre', 'famille'],

    accroche: {
      texte: 'Clarisse et Laure sont voisines. Elles veulent creuser un puits, exactement aussi loin de l’une que de l’autre. Où le mettre ? ' +
        'Il y a toute une ligne de places possibles. Elle passe au milieu du chemin, et elle le coupe bien droit.',
      image: { dessin: 'figure', points: { C: [0, 0], L: [6, 0], I: [3, 0], P: [3, 4] }, segments: [['C', 'L', '60 m'], ['I', 'P'], ['C', 'P', '50 m'], ['L', 'P', '50 m']], droits: [['L', 'I', 'P']], description: 'Deux maisons, C et L, à 60 mètres l’une de l’autre. I est le milieu du chemin. Une ligne part de I, à angle droit. Sur cette ligne, le puits P est à 50 mètres de chaque maison.' },
    },

    manipulation: {
      etapes: [
        'Plie une feuille de façon à poser le point C sur le point L.',
        'Le pli passe par le milieu du chemin, et il le coupe à angle droit. C’est la ligne des places possibles.',
        'Prends maintenant un triangle en papier, posé sur un côté.',
        'Depuis le sommet, descends bien droit jusqu’à ce côté : c’est la vraie hauteur du triangle, celle qui sert pour son aire.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une ligne coupe un segment en son milieu, à angle droit : c’est ' + c.mot('mediatrice') + '. Tous ses points sont à la même distance des deux bouts. ' +
        'Une autre part d’un sommet, et tombe à angle droit sur le côté d’en face : c’est ' + c.mot('hauteur') + '. L’astuce : l’une passe par un milieu, l’autre par un sommet.',
    },

    vocabulaire: {
      termes: {
        mediatrice: { sesMots: 'la ligne du pli', officiel: 'la médiatrice', lesDeux: 'la ligne du pli, que l’on appelle la médiatrice' },
        hauteur: { sesMots: 'la descente bien droite', officiel: 'la hauteur', lesDeux: 'la descente bien droite, que l’on appelle la hauteur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la ligne du pli, et la descente bien droite. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la médiatrice, pour la ligne du pli. Et la descente bien droite s’appelle la hauteur.',
        'Tu connais les mots officiels : la médiatrice, et la hauteur.',
      ],
    },

    exercices: [
      {
        id: 'distance-puits',
        univers: 'champetre',
        versions: [[50], [35], [42], [28], [64], [75]],
        genere(c) {
          const [d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le point P est sur la médiatrice du segment [CL]. On sait que PC = ' + d + ' m. Combien mesure PL, en mètres ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Un point de la médiatrice est à la même distance des deux bouts.',
            correction: ['P est sur la médiatrice de [CL], donc PL = PC.', 'PL = ' + d + ' m.'],
          };
        },
      },
      {
        id: 'milieu',
        univers: 'famille',
        versions: [[60], [48], [90], [36], [75], [25]],
        genere(c) {
          const [d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le chemin [CL] mesure ' + d + ' m. Sa médiatrice le coupe en I. Combien mesure CI, en mètres ?',
            reponse: { type: 'nombre', valeur: d / 2 },
            aide: 'La médiatrice passe par le milieu du segment.',
            correction: ['I est le milieu de [CL].', ecr(d) + ' ÷ 2 = ' + ecr(d / 2) + ' m.'],
          };
        },
      },
      O.qcm('laquelle', 'famille',
        [['passe par le milieu d’un côté, et elle lui est perpendiculaire', MED, 'Un milieu et un angle droit : c’est une médiatrice.'],
          ['passe par un sommet, et elle est perpendiculaire au côté d’en face', HAU, 'Un sommet et un angle droit : c’est une hauteur.'],
          ['passe par un sommet et par le milieu du côté d’en face, sans angle droit', AUTRE, 'Sans angle droit, ce n’est ni une hauteur, ni une médiatrice.'],
          ['est perpendiculaire à un côté, en son milieu', MED, 'Un milieu et un angle droit : c’est une médiatrice.']],
        (x) => 'Dans un triangle quelconque, une droite ' + x + '. Comment s’appelle-t-elle ?', [MED, HAU, AUTRE],
        'Cherche d’abord l’angle droit. Puis regarde si la droite passe par un milieu ou par un sommet.'),
      {
        id: 'aire-avec-hauteur',
        univers: 'champetre',
        versions: [[8, 5], [10, 6], [12, 7], [6, 9], [14, 4], [20, 15]],
        genere(c) {
          const [b, h] = c.alea.choisir(this.versions);
          const a = r2((b * h) / 2);
          return {
            enonce: 'Un coin de potager a la forme d’un triangle. Un côté mesure ' + b + ' m, et la hauteur qui tombe sur ce côté mesure ' + h + ' m. Quelle est son aire, en m² ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Multiplie le côté par la hauteur, puis partage en deux.',
            correction: [b + ' × ' + h + ' = ' + b * h + '.', b * h + ' ÷ 2 = ' + ecr(a) + ' m².'],
          };
        },
      },
      O.qcm('cote-hauteur', 'champetre',
        [['[AB]', 'Oui, c’est une hauteur', 'Le côté [AB] part du sommet B et tombe à angle droit sur [AC].'],
          ['[AC]', 'Oui, c’est une hauteur', 'Le côté [AC] part du sommet C et tombe à angle droit sur [AB].'],
          ['[BC]', 'Non, ce n’est pas une hauteur', 'Le côté [BC] ne fait d’angle droit avec aucun autre côté.']],
        (x) => 'Le triangle ABC est rectangle en A. Le côté ' + x + ' est-il aussi une hauteur du triangle ?', ['Oui, c’est une hauteur', 'Non, ce n’est pas une hauteur'],
        'Une hauteur part d’un sommet, et tombe à angle droit sur le côté d’en face.'),
    ],

    defi: {
      // [CL, PC, PI] : PI² + (CL ÷ 2)² = PC²
      versions: [[60, 50, 40], [48, 40, 32], [30, 25, 20], [36, 30, 24]],
      genere(c) {
        const [cl, pc, h] = c.alea.choisir(this.versions);
        return {
          enonce: 'Deux maisons C et L sont distantes de ' + cl + ' m. Le puits P est situé sur la médiatrice de [CL], et PC = ' + pc + ' m. I est le milieu de [CL], et PI = ' + h + ' m.',
          image: { dessin: 'figure', points: { C: [0, 0], L: [6, 0], I: [3, 0], P: [3, 4] }, segments: [['C', 'L'], ['I', 'P'], ['C', 'P'], ['L', 'P']], droits: [['L', 'I', 'P']], description: 'Le triangle C L P. I est le milieu de C L, et I P est perpendiculaire à C L. C L mesure ' + cl + ' mètres, P C ' + pc + ' mètres, P I ' + h + ' mètres.' },
          questions: [
            {
              texte: 'Question 1. Combien mesure PL, en mètres ?',
              reponse: { type: 'nombre', valeur: pc },
              aide: 'P est sur la médiatrice.',
              correction: ['P est sur la médiatrice de [CL], donc PL = PC = ' + pc + ' m.'],
            },
            {
              texte: 'Question 2. Combien mesure CI, en mètres ?',
              reponse: { type: 'nombre', valeur: cl / 2 },
              aide: 'I est le milieu de [CL].',
              correction: [cl + ' ÷ 2 = ' + cl / 2 + ' m.'],
            },
            {
              texte: 'Question 3. Calculer l’aire du triangle CLP, en m².',
              reponse: { type: 'nombre', valeur: (cl * h) / 2 },
              aide: 'La droite (PI) est une hauteur du triangle.',
              correction: [cl + ' × ' + h + ' ÷ 2 = ' + (cl * h) / 2 + ' m².'],
            },
            {
              texte: 'Question 4. Expliquer pourquoi la droite (PI) est à la fois une médiatrice et une hauteur du triangle CLP.',
              correction: ['(PI) coupe [CL] en son milieu, à angle droit : c’est la médiatrice de [CL].', 'Elle passe par le sommet P et elle est perpendiculaire au côté d’en face : c’est aussi une hauteur.'],
              grille: ['As-tu parlé du milieu et de l’angle droit pour la médiatrice ?', 'As-tu parlé du sommet et de l’angle droit pour la hauteur ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le puits est à la bonne place, et ton triangle a sa vraie hauteur.',
    carte: ['distance-puits', 'laquelle', 'aire-avec-hauteur'],
    papierDuSoir: { exercices: ['milieu', 'aire-avec-hauteur'], defi: true },
    automatismes: [
      {
        id: 'moitie-du-produit',
        versions: [[8, 5], [6, 7], [10, 3], [4, 9]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' ÷ 2 = ?', reponse: { type: 'nombre', valeur: (a * b) / 2 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte, à Alexandrie, Héron a donné l’aire d’un triangle à partir de ses trois côtés.',
    prenoms: ['Clarisse', 'Laure'],
  };
});
