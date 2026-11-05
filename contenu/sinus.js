/* Notion 26 du bloc « Mesures, géométrie et espace » : le sinus. La hauteur atteinte par l'échelle, ou par une rampe.
   Format : contenu/GABARIT-NOTION.md. */
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
    id: 'sinus',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Le sinus',
    classe: '3e',
    univers: ['dehors', 'maison-courses'],

    accroche: {
      texte: 'Esther pose une rampe de 5 mètres. Elle doit monter les sacs jusqu’au camion du marché. La rampe fait un angle de 30 degrés avec le sol. À quelle hauteur arrivera-t-elle ? ' +
        'Le cosinus parlait du côté qui touche l’angle. Pour la hauteur, il faut le côté d’en face. Son outil à lui, c’est le sinus.',
      image: { dessin: 'figure', points: { A: [0, 0], B: [4.33, 0], C: [4.33, 2.5] }, segments: [['A', 'B'], ['B', 'C', '2,5 m'], ['A', 'C', '5 m']], droits: [['A', 'B', 'C']], angles: [['B', 'A', 'C', '30°']], description: 'Un triangle rectangle en B. La rampe A C mesure 5 mètres. L’angle en A mesure 30 degrés. La hauteur B C, en face de l’angle, mesure 2,5 mètres.' },
    },

    manipulation: {
      etapes: [
        'Dans ce triangle, regarde depuis l’angle au sol. La hauteur est en face de lui.',
        'Divise la hauteur par la longueur de la rampe : 2,5 divisé par 5 font 0,5.',
        'Avec une rampe deux fois plus longue et le même angle, la hauteur double, et le quotient ne change pas.',
        'Ce quotient, c’est le sinus de l’angle : la touche sin de la calculatrice le donne.',
      ],
    },

    decouverte: {
      texte: (c) => 'Depuis un angle aigu, regarde ' + c.mot('oppose') + ' : il ne touche pas l’angle. Divise-le par l’hypoténuse : tu obtiens ' + c.mot('sinus') + '. ' +
        'L’astuce : côté d’en face, divisé par grand côté. Et la touche arcsin fait le chemin inverse, du quotient vers l’angle.',
    },

    vocabulaire: {
      termes: {
        oppose: { sesMots: 'le côté d’en face', officiel: 'le côté opposé', lesDeux: 'le côté d’en face, que l’on appelle le côté opposé' },
        sinus: { sesMots: 'le quotient de la hauteur', officiel: 'le sinus', lesDeux: 'le quotient de la hauteur, que l’on appelle le sinus' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le côté d’en face, et le quotient de la hauteur. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : le côté opposé, pour le côté d’en face. Et le quotient de la hauteur s’appelle le sinus.',
        'Tu connais les mots officiels : le côté opposé, et le sinus.',
      ],
    },

    exercices: [
      {
        id: 'calculer-le-sinus',
        univers: 'maison-courses',
        versions: [[1, 2], [3, 5], [2, 5], [4, 5], [3, 4], [6, 8]],
        genere(c) {
          const [o, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le triangle ABC est rectangle en B. On donne BC = ' + o + ' m et AC = ' + h + ' m. Que vaut le sinus de l’angle en A, en écriture décimale ?',
            reponse: { type: 'nombre', valeur: o / h },
            aide: 'Divise le côté d’en face par le grand côté.',
            correction: ['sin(A) = BC/AC = ' + o + '/' + h + ' = ' + ecr(o / h) + '.'],
          };
        },
      },
      {
        id: 'trouver-oppose',
        univers: 'dehors',
        // [angle, hypoténuse]
        versions: [[30, 5], [30, 8], [20, 4], [45, 6], [50, 3], [10, 10]],
        genere(c) {
          const [ang, h] = c.alea.choisir(this.versions);
          const o = r1(h * Math.sin(rad(ang)));
          return {
            enonce: 'Une rampe de ' + h + ' m fait un angle de ' + ang + '° avec le sol. À quelle hauteur arrive-t-elle, en mètres, arrondie au dixième ?',
            reponse: { type: 'nombre', valeur: o },
            aide: 'La hauteur égale la rampe fois le sinus de l’angle.',
            correction: ['Hauteur = ' + h + ' × sin(' + ang + '°).', 'Hauteur ≈ ' + ecr(o) + ' m.'],
          };
        },
      },
      {
        id: 'trouver-hypotenuse',
        univers: 'dehors',
        // [angle, hauteur]
        versions: [[30, 2], [30, 1.5], [20, 1], [45, 3], [10, 1], [25, 2]],
        genere(c) {
          const [ang, o] = c.alea.choisir(this.versions);
          const h = r1(o / Math.sin(rad(ang)));
          return {
            enonce: 'Pour monter à ' + ecr(o) + ' m de haut, avec un angle de ' + ang + '°, quelle longueur de rampe faut-il, en mètres, arrondie au dixième ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'La rampe égale la hauteur divisée par le sinus de l’angle.',
            correction: ['Rampe = ' + ecr(o) + ' ÷ sin(' + ang + '°).', 'Rampe ≈ ' + ecr(h) + ' m.'],
          };
        },
      },
      {
        id: 'trouver-angle',
        univers: 'maison-courses',
        versions: [[1, 2], [2, 4], [3, 5], [2, 5], [4, 5], [1, 4]],
        genere(c) {
          const [o, h] = c.alea.choisir(this.versions);
          const ang = Math.round(deg(Math.asin(o / h)));
          return {
            enonce: 'Une rampe de ' + h + ' m monte à ' + o + ' m de haut. Quel angle fait-elle avec le sol, en degrés, arrondi à l’unité ?',
            reponse: { type: 'nombre', valeur: ang },
            aide: 'Calcule le quotient, puis utilise la touche arcsin de la calculatrice.',
            correction: ['sin(A) = ' + o + '/' + h + ' = ' + ecr(r2(o / h)) + '.', 'A ≈ ' + ang + '°.'],
          };
        },
      },
      O.qcm('quel-rapport', 'maison-courses',
        [['Le triangle ABC est rectangle en B. On connaît la longueur AC, et l’angle en A. On cherche BC.', 'Le sinus', 'BC est en face de l’angle, et AC est le grand côté.'],
          ['Le triangle ABC est rectangle en B. On connaît la longueur AC, et l’angle en A. On cherche AB.', 'Le cosinus', 'AB touche l’angle, et AC est le grand côté.'],
          ['Le triangle ABC est rectangle en B. On connaît la longueur BC, et l’angle en C. On cherche AC.', 'Le cosinus', 'BC touche l’angle en C, et AC est le grand côté.'],
          ['Le triangle ABC est rectangle en B. On connaît la longueur AB, et l’angle en C. On cherche AC.', 'Le sinus', 'AB est en face de l’angle en C, et AC est le grand côté.']],
        (x) => x + ' Quel outil faut-il ?', ['Le sinus', 'Le cosinus'],
        'Depuis l’angle : le côté utile est-il en face, ou le touche-t-il ?'),
    ],

    defi: {
      // [longueur de rampe, hauteur à franchir, longueur de la rampe de secours]
      versions: [[5, 1], [4, 1], [6, 2], [8, 2]],
      genere(c) {
        const [h, o] = c.alea.choisir(this.versions);
        const ang = Math.round(deg(Math.asin(o / h)));
        const au = r1(Math.sqrt(h * h - o * o));
        const juste = ang <= 15 ? 'Oui, elle convient' : 'Non, elle est trop raide';
        return {
          enonce: 'Une rampe [AC] de ' + h + ' m permet de monter des sacs jusqu’à une hauteur BC de ' + o + ' m. Le triangle ABC est rectangle en B. Pour que les sacs ne glissent pas, l’angle en A ne doit pas dépasser 15°.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [4, 0], C: [4, 1.2] }, segments: [['A', 'B'], ['B', 'C'], ['A', 'C']], droits: [['A', 'B', 'C']], description: 'Un triangle rectangle en B. La rampe A C mesure ' + h + ' mètres, la hauteur B C ' + o + (o < 2 ? ' mètre' : ' mètres') + '. L’angle en A est à calculer.' },
          questions: [
            {
              texte: 'Question 1. Calculer le sinus de l’angle en A, en écriture décimale arrondie au centième.',
              reponse: { type: 'nombre', valeur: r2(o / h) },
              aide: 'Côté d’en face, divisé par grand côté.',
              correction: [o + ' ÷ ' + h + (r2(o / h) === o / h ? ' = ' : ' ≈ ') + ecr(r2(o / h)) + '.'],
            },
            {
              texte: 'Question 2. Donner la mesure de l’angle en A, arrondie au degré.',
              reponse: { type: 'nombre', valeur: ang },
              aide: 'Utilise la touche arcsin, avec le quotient exact.',
              correction: ['A ≈ ' + ang + '°.'],
            },
            {
              texte: 'Question 3. Cette rampe convient-elle ?',
              reponse: O.choix(c.alea, juste, ['Oui, elle convient', 'Non, elle est trop raide']),
              aide: 'Compare l’angle à la limite.',
              correction: ['L’angle mesure environ ' + ang + '°.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Calculer la longueur AB au sol, arrondie au dixième, et dire quel théorème on peut utiliser.',
              correction: ['Le triangle est rectangle en B : on peut utiliser le théorème de Pythagore.', 'AB² = ' + h * h + ' − ' + o * o + ' = ' + (h * h - o * o) + ', donc AB ≈ ' + ecr(au) + ' m.'],
              grille: ['As-tu cité le théorème de Pythagore, ou un outil juste ?', 'As-tu donné l’arrondi demandé ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Côté d’en face, grand côté : ta rampe arrive exactement où tu le voulais.',
    carte: ['calculer-le-sinus', 'trouver-oppose', 'quel-rapport'],
    papierDuSoir: { exercices: ['trouver-oppose', 'trouver-angle'], defi: true },
    automatismes: [
      {
        id: 'quotient-simple',
        versions: [[1, 2], [3, 5], [1, 4], [4, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Inde, le savant Aryabhata a dressé une table de sinus, il y a plus de quinze siècles.',
    prenoms: ['Esther'],
  };
});
