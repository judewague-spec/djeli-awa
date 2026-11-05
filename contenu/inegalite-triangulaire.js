/* Notion 2 du bloc « Mesures, géométrie et espace » : l'inégalité triangulaire. Le raccourci de Moussa, entre trois étals.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const OUI = 'Oui, on peut le construire', PLAT = 'Oui, mais il est tout plat', NON = 'Non, c’est impossible';
  const verdict = (a, b, c) => { const m = Math.max(a, b, c), r = a + b + c - m; return r > m ? OUI : r === m ? PLAT : NON; };

  return {
    id: 'inegalite-triangulaire',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'L’inégalité triangulaire',
    classe: '5e',
    univers: ['commerce', 'dehors'],

    accroche: {
      texte: 'Moussa va des mangues au poisson. Il pourrait passer par la fontaine, mais il coupe tout droit. Aminata rit : « Le détour est toujours plus long ! » ' +
        'Ce petit bon sens de marcheur vaut une vraie règle de maths.',
      image: { dessin: 'figure', points: { M: [0, 0], P: [7, 0], F: [3, 3] }, segments: [['M', 'P', '70 m'], ['M', 'F', '42 m'], ['F', 'P', '50 m']], description: 'Trois points : M les mangues, P le poisson, F la fontaine. De M à P tout droit : 70 mètres. De M à F : 42 mètres. De F à P : 50 mètres. Le détour fait 92 mètres.' },
    },

    manipulation: {
      etapes: [
        'Prends trois bandes de papier : 3, 4 et 10 centimètres.',
        'Essaie de former un triangle. Les deux petites bandes n’arrivent pas à se rejoindre.',
        'Remplace la grande par une bande de 6 centimètres : le triangle se ferme.',
        'Avec une bande de 7 centimètres, tout juste : le triangle est tout plat.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour savoir si trois longueurs forment un triangle, regarde seulement la plus grande. Les deux autres, ajoutées, doivent la dépasser. C’est ' + c.mot('inegalite') + '. ' +
        'Si elles font exactement la plus grande, les trois points sont ' + c.mot('alignes') + '.',
    },

    vocabulaire: {
      termes: {
        inegalite: { sesMots: 'la règle du détour', officiel: 'l’inégalité triangulaire', lesDeux: 'la règle du détour, que l’on appelle l’inégalité triangulaire' },
        alignes: { sesMots: 'sur la même ligne droite', officiel: 'alignés', lesDeux: 'sur la même ligne droite, c’est-à-dire alignés' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la règle du détour, et des points sur la même ligne droite. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’inégalité triangulaire, pour la règle du détour. Et des points sur la même ligne droite sont alignés.',
        'Tu connais les mots officiels : l’inégalité triangulaire, et des points alignés.',
      ],
    },

    exercices: [
      {
        id: 'construire-ou-pas',
        univers: 'commerce',
        versions: [[3, 4, 5], [2, 3, 7], [4, 4, 9], [5, 6, 10], [3, 5, 8], [6, 8, 13], [2, 9, 6], [7, 3, 4]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const m = Math.max(a, b, d), r = a + b + d - m;
          const juste = verdict(a, b, d);
          return {
            enonce: 'Un marchand veut faire un cadre en triangle avec trois baguettes de ' + a + ' cm, ' + b + ' cm et ' + d + ' cm. Est-ce possible ?',
            reponse: O.choix(c.alea, juste, [OUI, PLAT, NON]),
            aide: 'Ajoute les deux plus petites longueurs, puis compare à la plus grande.',
            correction: ['La plus grande : ' + m + ' cm. Les deux autres : ' + r + ' cm.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'plus-long-possible',
        univers: 'dehors',
        versions: [[3, 5], [4, 7], [6, 9], [2, 8], [10, 15], [12, 20]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Deux côtés d’un triangle mesurent ' + a + ' cm et ' + b + ' cm. Le troisième côté doit rester plus court que quelle longueur, en cm ?',
            reponse: { type: 'nombre', valeur: a + b },
            aide: 'Le troisième côté ne peut pas atteindre le total des deux autres.',
            correction: [a + ' + ' + b + ' = ' + (a + b) + ' cm.', 'Le troisième côté reste plus court que ' + (a + b) + ' cm.'],
          };
        },
      },
      {
        id: 'plus-court-possible',
        univers: 'dehors',
        versions: [[3, 5], [4, 7], [6, 9], [2, 8], [10, 15], [12, 20]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Deux côtés d’un triangle mesurent ' + a + ' cm et ' + b + ' cm. Le troisième côté doit rester plus long que quelle longueur, en cm ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Avec le troisième côté et le petit côté, il faut dépasser le grand côté.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' cm.', 'Le troisième côté doit dépasser ' + (b - a) + ' cm, sinon le triangle ne se ferme pas.'],
          };
        },
      },
      {
        id: 'detour',
        univers: 'commerce',
        // [M à F, F à P, M à P], en mètres
        versions: [[42, 50, 70], [30, 40, 50], [60, 80, 100], [25, 35, 45], [75, 40, 90], [18, 24, 30]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'De l’étal des mangues à la fontaine : ' + a + ' m. De la fontaine à l’étal du poisson : ' + b + ' m. De l’étal des mangues au poisson, tout droit : ' + d + ' m. De combien de mètres le détour est-il plus long ?',
            reponse: { type: 'nombre', valeur: a + b - d },
            aide: 'Ajoute les deux morceaux du détour, puis enlève le trajet tout droit.',
            correction: [a + ' + ' + b + ' = ' + (a + b) + ' m.', (a + b) + ' − ' + d + ' = ' + (a + b - d) + ' m.'],
          };
        },
      },
      O.qcm('points-alignes', 'dehors',
        [['AB = 3 cm, BC = 4 cm et AC = 7 cm', 'Oui, B est sur le segment AC', '3 + 4 = 7 : le détour par B n’allonge rien.'],
          ['AB = 5 cm, BC = 6 cm et AC = 11 cm', 'Oui, B est sur le segment AC', '5 + 6 = 11 : le détour par B n’allonge rien.'],
          ['AB = 3 cm, BC = 4 cm et AC = 6 cm', 'Non, les trois points forment un triangle', '3 + 4 = 7, et 7 dépasse 6 : le passage par B est un vrai détour.'],
          ['AB = 8 cm, BC = 2 cm et AC = 9 cm', 'Non, les trois points forment un triangle', '8 + 2 = 10, et 10 dépasse 9 : le passage par B est un vrai détour.']],
        (x) => 'On donne ' + x + '. Les points A, B et C sont-ils alignés ?', ['Oui, B est sur le segment AC', 'Non, les trois points forment un triangle'],
        'Compare le trajet qui passe par B avec le trajet tout droit.'),
    ],

    defi: {
      // [a, b, c] : la clôture de trois côtés
      versions: [[5, 7, 10], [6, 6, 11], [4, 9, 12], [8, 8, 15]],
      genere(c) {
        const [a, b, d] = c.alea.choisir(this.versions);
        return {
          enonce: 'Clarisse veut clôturer un coin de jardin en forme de triangle. Elle a mesuré deux côtés : ' + a + ' m et ' + b + ' m. Elle pense que le troisième côté mesure ' + d + ' m.',
          questions: [
            {
              texte: 'Question 1. Calculer la somme des deux côtés mesurés, en mètres.',
              reponse: { type: 'nombre', valeur: a + b },
              aide: 'Ajoute les deux longueurs.',
              correction: [a + ' + ' + b + ' = ' + (a + b) + ' m.'],
            },
            {
              texte: 'Question 2. Quelle longueur totale de grillage faut-il pour faire tout le tour, en mètres ?',
              reponse: { type: 'nombre', valeur: a + b + d },
              aide: 'C’est le périmètre : ajoute les trois côtés.',
              correction: [a + ' + ' + b + ' + ' + d + ' = ' + (a + b + d) + ' m.'],
            },
            {
              texte: 'Question 3. Le triangle de Clarisse peut-il exister ? Justifier en citant la règle utilisée.',
              correction: ['Le plus grand côté mesure ' + d + ' m.', 'La somme des deux autres vaut ' + (a + b) + ' m, ce qui dépasse ' + d + ' m.', 'D’après l’inégalité triangulaire, ce triangle peut exister.'],
              grille: ['As-tu repéré le plus grand côté ?', 'As-tu comparé la somme des deux autres à ce côté ?', 'As-tu cité l’inégalité triangulaire pour conclure ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avant même de sortir la règle, tu sais si un triangle pourra se fermer.',
    carte: ['construire-ou-pas', 'plus-long-possible', 'detour'],
    papierDuSoir: { exercices: ['construire-ou-pas', 'plus-court-possible'], defi: true },
    automatismes: [
      {
        id: 'somme-deux-cotes',
        versions: [[12, 7], [15, 8], [9, 6], [14, 11]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: ecr(a) + ' + ' + ecr(b) + ' = ?', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: null,
    prenoms: ['Moussa', 'Aminata', 'Clarisse'],
  };
});
