/* Notion 15 du bloc « Mesures, géométrie et espace » : le cosinus. L'échelle de Moussa contre le mur.
   Format : contenu/GABARIT-NOTION.md. La calculatrice est permise, comme au brevet ; le code recalcule tout. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r1 = (x) => Math.round(x * 10) / 10;
  const r2 = (x) => Math.round(x * 100) / 100;
  const rad = (d) => (d * Math.PI) / 180;
  const deg = (x) => (x * 180) / Math.PI;

  return {
    id: 'cosinus',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Le cosinus',
    classe: '4e',
    univers: ['maison-courses', 'dehors'],

    accroche: {
      texte: 'Moussa pose une échelle contre un mur. Trop penchée, elle glisse. Trop droite, elle bascule. Laure lui dit : « L’angle au sol doit être juste. » ' +
        'Comment le connaître sans rapporteur ? Il suffit de comparer deux longueurs : le pied de l’échelle au mur, et l’échelle elle-même.',
      image: { dessin: 'figure', points: { A: [0, 0], B: [2, 0], C: [2, 3.46] }, segments: [['A', 'B', '2 m'], ['B', 'C'], ['A', 'C', '4 m']], droits: [['A', 'B', 'C']], angles: [['B', 'A', 'C', '60°']], description: 'Un triangle rectangle en B. A est le pied de l’échelle, B le bas du mur, C le haut de l’échelle. A B mesure 2 mètres, l’échelle A C mesure 4 mètres. L’angle en A mesure 60 degrés.' },
    },

    manipulation: {
      etapes: [
        'Pose une échelle de 4 mètres, avec le pied à 2 mètres du mur. Calcule 2 divisé par 4 : cela fait 0,5.',
        'Prends une échelle de 8 mètres, avec le même angle. Le pied est alors à 4 mètres : 4 divisé par 8 fait encore 0,5.',
        'Le quotient ne dépend donc pas de la taille de l’échelle, seulement de l’angle.',
        'Sur la calculatrice, la touche cos transforme un angle en ce quotient. La touche arccos fait le chemin inverse.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans un triangle rectangle, regarde un angle aigu. Repère ' + c.mot('adjacent') + ' : ce n’est pas le grand côté. ' +
        'Divise-le par le grand côté, l’hypoténuse : tu obtiens ' + c.mot('cosinus') + '. L’astuce : côté qui touche, divisé par grand côté.',
    },

    vocabulaire: {
      termes: {
        adjacent: { sesMots: 'le côté qui touche l’angle', officiel: 'le côté adjacent', lesDeux: 'le côté qui touche l’angle, que l’on appelle le côté adjacent' },
        cosinus: { sesMots: 'le quotient de l’échelle', officiel: 'le cosinus', lesDeux: 'le quotient de l’échelle, que l’on appelle le cosinus' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le côté qui touche l’angle, et le quotient de l’échelle. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : le côté adjacent, pour le côté qui touche l’angle. Et le quotient de l’échelle s’appelle le cosinus.',
        'Tu connais les mots officiels : le côté adjacent, et le cosinus.',
      ],
    },

    exercices: [
      {
        id: 'calculer-le-cosinus',
        univers: 'maison-courses',
        // [adjacent, hypoténuse]
        versions: [[1, 2], [3, 5], [2, 5], [4, 5], [3, 4], [6, 8]],
        genere(c) {
          const [a, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le triangle ABC est rectangle en B. On donne AB = ' + a + ' m et AC = ' + h + ' m. Que vaut le cosinus de l’angle en A, en écriture décimale ?',
            reponse: { type: 'nombre', valeur: a / h },
            aide: 'Divise le côté qui touche l’angle par le grand côté.',
            correction: ['cos(A) = AB/AC = ' + a + '/' + h + ' = ' + ecr(a / h) + '.'],
          };
        },
      },
      {
        id: 'trouver-adjacent',
        univers: 'dehors',
        // [angle, hypoténuse]
        versions: [[60, 4], [60, 10], [65, 6], [70, 8], [75, 5], [70, 3]],
        genere(c) {
          const [ang, h] = c.alea.choisir(this.versions);
          const a = r1(h * Math.cos(rad(ang)));
          return {
            enonce: 'Une échelle de ' + h + ' m fait un angle de ' + ang + '° avec le sol. À quelle distance du mur est son pied, en mètres, arrondie au dixième ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Le côté qui touche l’angle égale le grand côté fois le cosinus.',
            correction: ['Distance = ' + h + ' × cos(' + ang + '°).', 'Distance ≈ ' + ecr(a) + ' m.'],
          };
        },
      },
      {
        id: 'trouver-hypotenuse',
        univers: 'dehors',
        // [angle, adjacent]
        versions: [[60, 2], [60, 3], [65, 2], [70, 1], [75, 1], [70, 2]],
        genere(c) {
          const [ang, a] = c.alea.choisir(this.versions);
          const h = r1(a / Math.cos(rad(ang)));
          return {
            enonce: 'Le pied d’une échelle est à ' + a + ' m du mur, et l’échelle fait un angle de ' + ang + '° avec le sol. Quelle est la longueur de l’échelle, en mètres, arrondie au dixième ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'Le grand côté égale le côté qui touche l’angle, divisé par le cosinus.',
            correction: ['Longueur = ' + a + ' ÷ cos(' + ang + '°).', 'Longueur ≈ ' + ecr(h) + ' m.'],
          };
        },
      },
      {
        id: 'trouver-angle',
        univers: 'maison-courses',
        // [adjacent, hypoténuse]
        versions: [[1, 2], [2, 4], [3, 5], [2, 5], [4, 5], [1, 4]],
        genere(c) {
          const [a, h] = c.alea.choisir(this.versions);
          const ang = Math.round(deg(Math.acos(a / h)));
          return {
            enonce: 'Une rampe fait un triangle rectangle. Sa longueur est de ' + h + ' m, et sa longueur au sol de ' + a + ' m. Quel angle fait-elle avec le sol, en degrés, arrondi à l’unité ?',
            reponse: { type: 'nombre', valeur: ang },
            aide: 'Calcule le quotient, puis utilise la touche arccos de la calculatrice.',
            correction: ['cos(A) = ' + a + '/' + h + ' = ' + ecr(r2(a / h)) + '.', 'A ≈ ' + ang + '°.'],
          };
        },
      },
      O.qcm('quel-cote-touche', 'maison-courses',
        [['A', '[AB]', 'En A, les côtés sont [AB] et [AC]. [AC] est le grand côté, il reste [AB].'], ['C', '[CB]', 'En C, les côtés sont [CB] et [CA]. [CA] est le grand côté, il reste [CB].']],
        (x) => 'Le triangle ABC est rectangle en B. Quel est le côté adjacent à l’angle en ' + x + ' ?', ['[AB]', '[CB]', '[AC]'],
        'Il touche l’angle, et ce n’est pas le grand côté.'),
    ],

    defi: {
      // [échelle, distance au mur]
      versions: [[4, 2], [5, 1.5], [6, 2], [3, 1]],
      genere(c) {
        const [h, a] = c.alea.choisir(this.versions);
        const q = r2(a / h), ang = Math.round(deg(Math.acos(a / h)));
        const juste = ang >= 65 && ang <= 75 ? 'Oui, elle est bien posée' : 'Non, il faut la déplacer';
        return {
          enonce: 'Les règles de sécurité recommandent de poser une échelle avec un angle compris entre 65° et 75° par rapport au sol. Moussa pose une échelle [AC] de ' + h + ' m, avec son pied A à ' + ecr(a) + ' m du mur. Le triangle ABC est rectangle en B.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [1.5, 0], C: [1.5, 4] }, segments: [['A', 'B'], ['B', 'C'], ['A', 'C']], droits: [['A', 'B', 'C']], description: 'Un triangle rectangle en B. A est le pied de l’échelle, A B mesure ' + ecr(a) + (a < 2 ? ' mètre' : ' mètres') + '. L’échelle A C mesure ' + h + ' mètres. L’angle en A est à calculer.' },
          questions: [
            {
              texte: 'Question 1. Calculer le cosinus de l’angle en A, arrondi au centième.',
              reponse: { type: 'nombre', valeur: q },
              aide: 'Côté qui touche, divisé par grand côté.',
              correction: ['cos(A) = ' + ecr(a) + '/' + h + (q === a / h ? ' = ' : ' ≈ ') + ecr(q) + '.'],
            },
            {
              texte: 'Question 2. Donner la mesure de l’angle en A, arrondie au degré.',
              reponse: { type: 'nombre', valeur: ang },
              aide: 'Utilise la touche arccos, avec le quotient exact.',
              correction: ['A ≈ ' + ang + '°.'],
            },
            {
              texte: 'Question 3. L’échelle respecte-t-elle la règle de sécurité ?',
              reponse: O.choix(c.alea, juste, ['Oui, elle est bien posée', 'Non, il faut la déplacer']),
              aide: 'L’angle est-il entre les deux bornes ?',
              correction: ['L’angle mesure environ ' + ang + '°.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Rédiger le calcul de l’angle en A, en précisant dans quel triangle on travaille.',
              correction: ['Le triangle ABC est rectangle en B.', 'cos(A) = AB/AC = ' + ecr(a) + '/' + h + '.', 'Donc A ≈ ' + ang + '°.'],
              grille: ['As-tu dit que le triangle est rectangle ?', 'As-tu écrit le cosinus avec les bons côtés ?', 'As-tu donné l’arrondi demandé ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Deux longueurs et une touche : tu connais l’angle de n’importe quelle échelle.',
    carte: ['calculer-le-cosinus', 'quel-cote-touche', 'trouver-adjacent'],
    papierDuSoir: { exercices: ['trouver-adjacent', 'trouver-angle'], defi: true },
    automatismes: [
      {
        id: 'quotient-simple',
        versions: [[1, 2], [3, 4], [1, 4], [2, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Iran, Nasir al-Din al-Tusi a fait de la trigonométrie une science à part entière.',
    prenoms: ['Moussa', 'Laure'],
  };
});
