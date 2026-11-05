/* Notion 13 du bloc « Mesures, géométrie et espace » : la réciproque et la contraposée de Pythagore. La corde de 3, 4 et 5, pour vérifier un coin de mur.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const OUI = 'Oui, il est rectangle', NON = 'Non, il n’est pas rectangle';
  const REC = 'La réciproque', CON = 'La contraposée', DIR = 'Le théorème de Pythagore';
  const carre = (x) => Math.round(x * x * 100) / 100;

  return {
    id: 'pythagore-reciproque',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Réciproque de Pythagore',
    classe: '4e',
    univers: ['maison-courses', 'champetre'],

    accroche: {
      texte: 'Moussa construit un petit mur. Est-il bien d’équerre ? Il n’a pas d’équerre assez grande. Aminata prend une corde : elle marque 3 mètres sur un mur, 4 mètres sur l’autre. ' +
        'Puis elle tend la corde entre les deux marques. Si elle mesure 5 mètres, le coin est droit.',
      image: { dessin: 'figure', points: { A: [0, 0], B: [3, 0], C: [0, 4] }, segments: [['A', 'B', '3 m'], ['A', 'C', '4 m'], ['B', 'C', '5 m']], droits: [['B', 'A', 'C']], description: 'Le coin du mur, au point A. Sur un mur, le point B à 3 mètres. Sur l’autre, le point C à 4 mètres. La corde tendue de B à C mesure 5 mètres : le coin en A est droit.' },
    },

    manipulation: {
      etapes: [
        'Prends une corde, avec des marques à 3, 4 et 5 unités. Forme un triangle avec.',
        'Calcule : 3 au carré plus 4 au carré font 25. Et 5 au carré font 25 aussi. Le coin est droit.',
        'Essaie maintenant 4, 5 et 6. 4 au carré plus 5 au carré font 41, et 6 au carré font 36.',
        'Ce n’est pas égal : ce triangle-là n’a pas d’angle droit.',
      ],
    },

    decouverte: {
      texte: (c) => 'On calcule séparément. D’un côté, le carré du plus grand côté. De l’autre, la somme des deux autres carrés. Si c’est égal, le triangle est rectangle : c’est ' + c.mot('reciproque') + '. ' +
        'Si ce n’est pas égal, il n’est pas rectangle : c’est ' + c.mot('contraposee') + '. L’astuce : ne jamais écrire l’égalité avant de l’avoir vérifiée.',
    },

    vocabulaire: {
      termes: {
        reciproque: { sesMots: 'la preuve du coin droit', officiel: 'la réciproque', lesDeux: 'la preuve du coin droit, que l’on appelle la réciproque du théorème de Pythagore' },
        contraposee: { sesMots: 'la preuve du coin pas droit', officiel: 'la contraposée', lesDeux: 'la preuve du coin pas droit, que l’on appelle la contraposée du théorème de Pythagore' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la preuve du coin droit, et la preuve du coin pas droit. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la réciproque du théorème de Pythagore, pour la preuve du coin droit. Et la preuve du coin pas droit s’appelle la contraposée.',
        'Tu connais les mots officiels : la réciproque, et la contraposée du théorème de Pythagore.',
      ],
    },

    exercices: [
      {
        id: 'rectangle-ou-pas',
        univers: 'maison-courses',
        versions: [[3, 4, 5], [6, 8, 10], [5, 12, 13], [4, 5, 6], [7, 8, 11], [8, 15, 17], [2, 3, 4], [9, 12, 14]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const juste = a * a + b * b === d * d ? OUI : NON;
          return {
            enonce: 'Un triangle a des côtés de ' + a + ' m, ' + b + ' m et ' + d + ' m. Est-il rectangle ?',
            reponse: O.choix(c.alea, juste, [OUI, NON]),
            aide: 'Compare le carré du plus grand côté avec la somme des deux autres carrés.',
            correction: [d + '² = ' + d * d + '.', a + '² + ' + b + '² = ' + (a * a + b * b) + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'carre-du-plus-grand',
        univers: 'champetre',
        versions: [[3, 4, 5], [6, 8, 10], [4, 6, 7], [5, 12, 13], [2, 3, 4], [9, 12, 15]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un enclos a des côtés de ' + a + ' m, ' + b + ' m et ' + d + ' m. Que vaut le carré du plus grand côté ?',
            reponse: { type: 'nombre', valeur: d * d },
            aide: 'Multiplie le plus grand côté par lui-même.',
            correction: [d + ' × ' + d + ' = ' + d * d + '.'],
          };
        },
      },
      {
        id: 'somme-des-petits',
        univers: 'champetre',
        versions: [[3, 4, 5], [6, 8, 10], [4, 6, 7], [5, 12, 13], [2, 3, 4], [9, 12, 15]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un enclos a des côtés de ' + a + ' m, ' + b + ' m et ' + d + ' m. Que vaut la somme des carrés des deux plus petits côtés ?',
            reponse: { type: 'nombre', valeur: a * a + b * b },
            aide: 'Calcule chaque carré, puis ajoute.',
            correction: [a + '² + ' + b + '² = ' + a * a + ' + ' + b * b + ' = ' + (a * a + b * b) + '.'],
          };
        },
      },
      {
        id: 'avec-virgule',
        univers: 'maison-courses',
        versions: [[1.5, 2, 2.5], [0.6, 0.8, 1], [1.2, 1.6, 2], [1.5, 2, 2.6], [0.9, 1.2, 1.6], [3, 4.5, 5]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const s = Math.round((carre(a) + carre(b)) * 100) / 100;
          const juste = s === carre(d) ? OUI : NON;
          return {
            enonce: 'Le coin d’une étagère forme un triangle de côtés ' + ecr(a) + ' m, ' + ecr(b) + ' m et ' + ecr(d) + ' m. Ce triangle est-il rectangle ?',
            reponse: O.choix(c.alea, juste, [OUI, NON]),
            aide: 'La virgule ne change rien : compare les carrés.',
            correction: [ecr(d) + '² = ' + ecr(carre(d)) + '.', ecr(a) + '² + ' + ecr(b) + '² = ' + ecr(s) + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      O.qcm('quel-theoreme', 'maison-courses',
        [['Je sais que le triangle est rectangle, et je cherche une longueur.', DIR, 'On part d’un angle droit connu.'],
          ['Les deux calculs sont égaux, et je veux prouver que le triangle est rectangle.', REC, 'L’égalité prouve l’angle droit.'],
          ['Les deux calculs sont différents, et je veux prouver que le triangle n’est pas rectangle.', CON, 'L’inégalité prouve qu’il n’y a pas d’angle droit.']],
        (x) => x + ' Quel théorème dois-je utiliser ?', [DIR, REC, CON],
        'Sais-tu déjà que le coin est droit, ou veux-tu le prouver ?'),
    ],

    defi: {
      // [côté, côté, corde], la corde dit si le coin est droit
      versions: [[3, 4, 5], [6, 8, 10], [6, 8, 11], [5, 12, 14]],
      genere(c) {
        const [a, b, d] = c.alea.choisir(this.versions);
        const eg = a * a + b * b === d * d;
        const juste = eg ? 'Oui, le coin est droit' : 'Non, le coin n’est pas droit';
        return {
          enonce: 'Aminata vérifie le coin d’un mur, au point A. Sur un mur, elle marque B, avec AB = ' + a + ' dm. Sur l’autre, elle marque C, avec AC = ' + b + ' dm. La corde tendue de B à C mesure BC = ' + d + ' dm.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [3, 0], C: [0, 4] }, segments: [['A', 'B'], ['A', 'C'], ['B', 'C']], description: 'Le triangle A B C, au coin du mur. A B mesure ' + a + ' décimètres, A C ' + b + ' décimètres, B C ' + d + ' décimètres. Le dessin ne dit pas si le coin est droit : il faut calculer.' },
          questions: [
            {
              texte: 'Question 1. Calculer BC².',
              reponse: { type: 'nombre', valeur: d * d },
              aide: 'BC est le plus grand côté.',
              correction: [d + '² = ' + d * d + '.'],
            },
            {
              texte: 'Question 2. Calculer AB² + AC².',
              reponse: { type: 'nombre', valeur: a * a + b * b },
              aide: 'Ajoute les deux carrés.',
              correction: [a * a + ' + ' + b * b + ' = ' + (a * a + b * b) + '.'],
            },
            {
              texte: 'Question 3. Le coin du mur est-il droit ?',
              reponse: O.choix(c.alea, juste, ['Oui, le coin est droit', 'Non, le coin n’est pas droit']),
              aide: 'Compare les deux résultats.',
              correction: ['Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Rédiger la justification, en citant le théorème utilisé.',
              correction: ['BC² = ' + d * d + ' et AB² + AC² = ' + (a * a + b * b) + '.', eg ? 'L’égalité est vraie : d’après la réciproque du théorème de Pythagore, le triangle est rectangle en A.' : 'L’égalité est fausse : d’après la contraposée du théorème de Pythagore, le triangle n’est pas rectangle.'],
              grille: ['As-tu fait les deux calculs séparément ?', 'As-tu comparé les deux résultats ?', 'As-tu cité le bon théorème ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avec une simple corde et deux calculs, tu vérifies n’importe quel coin.',
    carte: ['rectangle-ou-pas', 'quel-theoreme', 'carre-du-plus-grand'],
    papierDuSoir: { exercices: ['rectangle-ou-pas', 'avec-virgule'], defi: true },
    automatismes: [
      {
        id: 'somme-de-carres',
        versions: [[3, 4], [6, 8], [1, 2], [2, 4]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + '² + ' + b + '² = ?', reponse: { type: 'nombre', valeur: a * a + b * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Inde, les Sulbasutras disent qu’une corde tendue sur la diagonale d’un carré donne un carré d’aire double.',
    prenoms: ['Moussa', 'Aminata'],
  };
});
