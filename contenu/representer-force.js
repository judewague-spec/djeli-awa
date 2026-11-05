/* Notion 7 du bloc « Mouvement et forces » : représenter une force par une flèche. Manipulation : la flèche de force (js/manipulations/fleche-force.js).
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const SENS = { droite: 'Vers la droite', gauche: 'Vers la gauche', haut: 'Vers le haut', bas: 'Vers le bas' };
  const TOUS = Object.values(SENS);

  return {
    id: 'representer-force',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'Représenter une force par une flèche',
    classe: '4e',
    univers: ['maison-courses', 'appareils', 'champetre'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : modéliser une interaction par une force, représentée par un segment fléché.',

    accroche: {
      texte: 'À la forge, Moussa pousse le chariot de charbon par son côté gauche, vers la droite. Le forgeron note sur son carnet : 150 newtons. ' +
        'Rachel, elle, préfère un dessin. Une seule flèche peut tout dire : d’où part la force, sur quelle ligne, de quel côté, et combien. Essayons.',
      image: { dessin: 'fleche-force', objet: 'Chariot', forces: [{ point: 'gauche', sens: 'droite', longueur: 3 }], echelle: '1 carreau pour 50 N', description: 'Un carré marqué Chariot, sur un quadrillage. Une flèche part de son bord gauche et va vers la droite. Elle mesure trois carreaux, un carreau valant 50 newtons.' },
    },

    manipulation: {
      type: 'fleche-force',
      objet: 'Chariot',
      points: ['centre', 'gauche', 'droite'],
      but: { point: 'gauche', sens: 'droite', valeur: 150, echelle: 50 },
      echelleEcrite: '1 carreau pour 50 N',
      consigne: 'À toi de dessiner la force de Moussa. Il pousse le chariot par la gauche, vers la droite, avec 150 newtons. Un carreau vaut 50 newtons. Choisis le départ, le sens et la longueur. Puis valide.',
    },

    decouverte: {
      texte: (c) => 'Une force se dessine avec ' + c.mot('fleche') + '. Ce dessin part de l’endroit où la force s’applique. Il suit sa ligne, et sa pointe montre son côté. ' +
        'Sa longueur dépend de ' + c.mot('echelle') + '. L’astuce : divise la valeur de la force par ce que vaut un carreau. Tu trouves le nombre de carreaux.',
    },

    vocabulaire: {
      termes: {
        fleche: { sesMots: 'une flèche', officiel: 'un segment fléché', lesDeux: 'une flèche, que les physiciens appellent un segment fléché' },
        echelle: { sesMots: 'ce que vaut un carreau', officiel: 'l’échelle', lesDeux: 'ce que vaut un carreau, que les physiciens appellent l’échelle' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une flèche, et ce que vaut un carreau. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : un segment fléché, pour la flèche. Et l’échelle, pour dire ce que vaut chaque centimètre ou chaque carreau.',
        'Tu connais les mots officiels : le segment fléché, et l’échelle.',
      ],
    },

    exercices: [
      {
        id: 'longueur-de-la-fleche',
        univers: 'maison-courses',
        // [valeur en newtons, échelle en newtons par centimètre]
        versions: [[60, 20], [150, 50], [40, 10], [250, 50], [90, 30], [8, 2]],
        genere(c) {
          const [f, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une force vaut ' + f + ' N. À l’échelle de 1 cm pour ' + e + ' N, quelle est la longueur de la flèche, en centimètres ?',
            reponse: { type: 'nombre', valeur: f / e },
            aide: 'Calcule ' + f + ' ÷ ' + e + '.',
            aideParlee: 'Divise la valeur de la force par ce que vaut un centimètre.',
            correction: ['Longueur = ' + f + ' ÷ ' + e + ' = ' + f / e + ' cm.'],
          };
        },
      },
      {
        id: 'valeur-de-la-force',
        univers: 'appareils',
        // [longueur en carreaux, échelle en newtons par carreau]
        versions: [[3, 20], [2, 50], [4, 10], [3, 100], [2, 30]],
        genere(c) {
          const [l, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur le schéma, une flèche mesure ' + l + ' carreaux. Un carreau vaut ' + e + ' N. Quelle est la valeur de la force, en newtons ?',
            image: { dessin: 'fleche-force', objet: 'Objet', forces: [{ point: 'gauche', sens: 'droite', longueur: l }], echelle: '1 carreau pour ' + e + ' N', description: 'Une flèche part du bord gauche de l’objet et va vers la droite. Sa longueur et l’échelle sont écrites dans l’énoncé.' },
            reponse: { type: 'nombre', valeur: l * e },
            aide: 'Calcule ' + l + ' × ' + e + '.',
            aideParlee: 'Multiplie le nombre de carreaux par ce que vaut un carreau.',
            correction: [l + ' × ' + e + ' = ' + l * e + ' N.'],
          };
        },
      },
      {
        id: 'lire-le-sens',
        univers: 'appareils',
        versions: ['droite', 'gauche', 'haut', 'bas'],
        genere(c) {
          const s = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur le schéma, de quel côté va la force ?',
            image: { dessin: 'fleche-force', objet: 'Objet', forces: [{ point: 'centre', sens: s, longueur: 2 }], description: 'Une flèche part du centre de l’objet et va ' + SENS[s].toLowerCase() + '.' },
            reponse: O.choix(c.alea, SENS[s], TOUS.filter((x) => x !== SENS[s]).slice(0, 2)),
            aide: 'Regarde de quel côté se trouve la pointe de la flèche.',
            correction: ['La pointe de la flèche montre le sens.', 'Réponse : ' + SENS[s] + '.'],
          };
        },
      },
      O.qcm('ce-que-dit-la-fleche', 'maison-courses',
        [['Sur une flèche de force, l’origine, là où elle part, indique…', 'Le point d’application'], ['Sur une flèche de force, la pointe indique…', 'Le sens'], ['Sur une flèche de force, la longueur indique…', 'La valeur']],
        (x) => x, ['Le point d’application', 'Le sens', 'La valeur'],
        'Le début de la flèche dit où, la pointe dit de quel côté, la longueur dit combien.'),
      {
        id: 'quelle-fleche-la-plus-longue',
        univers: 'champetre',
        // [force de Moussa, force d'Aminata] en newtons, même échelle
        versions: [[100, 150], [80, 40], [60, 90], [120, 60]],
        genere(c) {
          const [m, a] = c.alea.choisir(this.versions);
          const bonne = m > a ? 'La flèche de Moussa' : 'La flèche d’Aminata';
          return {
            enonce: 'Au champ, Moussa tire une charrette avec ' + m + ' N. Aminata tire une charrette avec ' + a + ' N. On dessine les deux forces à la même échelle. Quelle flèche est la plus longue ?',
            reponse: O.choix(c.alea, bonne, ['La flèche de Moussa', 'La flèche d’Aminata', 'Elles ont la même longueur'].filter((x) => x !== bonne)),
            aide: 'À la même échelle, plus la force est grande, plus la flèche est longue.',
            correction: ['La plus grande force a la plus longue flèche.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [valeur de la force de traction en newtons, échelle en N par cm]
      versions: [[120, 40], [200, 50], [90, 30], [80, 20]],
      genere(c) {
        const [f, e] = c.alea.choisir(this.versions);
        const l = f / e;
        return {
          enonce: 'Esther tire une charrette vers la droite avec une corde horizontale, attachée à l’avant de la charrette. La force de la corde sur la charrette vaut ' + f + ' N. Échelle : 1 cm pour ' + e + ' N.',
          questions: [
            {
              texte: 'Question 1. Calcule la longueur de la flèche, en centimètres.',
              reponse: { type: 'nombre', valeur: l },
              aide: 'Divise la valeur de la force par ce que vaut un centimètre.',
              correction: ['Longueur = ' + f + ' ÷ ' + e + ' = ' + l + ' cm.'],
            },
            {
              texte: 'Question 2. Quel est le sens de cette force ?',
              reponse: O.choix(c.alea, 'Vers la droite', ['Vers la gauche', 'Vers le haut']),
              aide: 'La corde tire la charrette de quel côté ?',
              correction: ['La corde tire la charrette vers l’avant.', 'Réponse : Vers la droite.'],
            },
            {
              texte: 'Question 3. Sur ton cahier, dessine la charrette par un rectangle, puis la flèche de cette force.',
              correction: ['La flèche part de l’avant de la charrette, là où la corde est attachée. Elle est horizontale, va vers la droite, et mesure ' + l + ' cm.'],
              grille: ['Ta flèche part-elle du point d’attache de la corde ?', 'Est-elle horizontale, pointée vers la droite ?', 'A-t-elle la bonne longueur ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une seule flèche, et tout est dit : où, sur quelle ligne, de quel côté et combien.',
    carte: ['longueur-de-la-fleche', 'valeur-de-la-force', 'ce-que-dit-la-fleche'],
    papierDuSoir: { exercices: ['longueur-de-la-fleche', 'valeur-de-la-force'], defi: true },
    automatismes: [
      {
        id: 'echelle-rapide',
        versions: [[100, 50], [60, 20], [80, 40], [30, 10]],
        genere(c) { const [f, e] = c.alea.choisir(this.versions); return { enonce: f + ' N, avec 1 cm pour ' + e + ' N : combien de centimètres ?', reponse: { type: 'nombre', valeur: f / e } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Simon Stevin est né à Bruges, aujourd’hui en Belgique. Son livre de 1586 sur les forces en équilibre a fait avancer cette science.',
    prenoms: ['Moussa', 'Rachel', 'Aminata', 'Esther'],
  };
});
