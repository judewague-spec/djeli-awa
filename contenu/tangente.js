/* Notion 27 du bloc « Mesures, géométrie et espace » : la tangente. La pente de la rampe, et la hauteur du manguier vue de loin.
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
  const COS = 'Le cosinus', SIN = 'Le sinus', TAN = 'La tangente';

  return {
    id: 'tangente',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'La tangente',
    classe: '3e',
    univers: ['dehors', 'champetre'],

    accroche: {
      texte: 'Rebecca regarde le haut du grand manguier. Elle est à 10 mètres de son pied, et son regard monte de 40 degrés. Elle ne connaît ni la hauteur, ni la longueur du regard. Elle ne connaît que la distance au sol. ' +
        'Ni le sinus, ni le cosinus ne suffisent, car ils demandent le grand côté. Heureusement, il y a un troisième outil.',
      image: { dessin: 'figure', points: { A: [0, 0], B: [5, 0], C: [5, 4.2] }, segments: [['A', 'B', '10 m'], ['B', 'C', '8,4 m'], ['A', 'C']], droits: [['A', 'B', 'C']], angles: [['B', 'A', 'C', '40°']], description: 'Un triangle rectangle en B. A est Rebecca, B le pied de l’arbre, C le haut de l’arbre. A B mesure 10 mètres. L’angle en A mesure 40 degrés. La hauteur B C mesure environ 8,4 mètres.' },
    },

    manipulation: {
      etapes: [
        'Depuis l’angle, on a deux côtés : celui d’en face, et celui qui touche, le long du sol.',
        'Leur quotient, hauteur divisée par distance, ne dépend que de l’angle. C’est ce que l’on appelle la pente.',
        'Sur la calculatrice, la touche tan donne ce quotient. Pour 40 degrés, environ 0,84.',
        'Alors la hauteur vaut 10 fois 0,84, soit environ 8,4 mètres.',
      ],
    },

    decouverte: {
      texte: (c) => 'Divise le côté d’en face par le côté qui touche l’angle : tu obtiens ' + c.mot('tangente') + '. Une route qui monte de 10 mètres pour 100 mètres, c’est ' + c.mot('pente') + ' de 10 pour cent. ' +
        'L’astuce pour tout retenir : CAH, SOH, TOA. Cosinus, adjacent sur hypoténuse. Sinus, opposé sur hypoténuse. Tangente, opposé sur adjacent.',
    },

    vocabulaire: {
      termes: {
        tangente: { sesMots: 'le quotient de la montée', officiel: 'la tangente', lesDeux: 'le quotient de la montée, que l’on appelle la tangente' },
        pente: { sesMots: 'une montée', officiel: 'une pente', lesDeux: 'une montée, ou une pente,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le quotient de la montée, et une montée. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la tangente, pour le quotient de la montée. Et une montée s’appelle une pente.',
        'Tu connais les mots officiels : la tangente, et la pente.',
      ],
    },

    exercices: [
      {
        id: 'calculer-la-tangente',
        univers: 'dehors',
        // [opposé, adjacent]
        versions: [[1, 2], [3, 4], [5, 4], [2, 5], [3, 2], [6, 8]],
        genere(c) {
          const [o, a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le triangle ABC est rectangle en B. On donne BC = ' + o + ' m et AB = ' + a + ' m. Que vaut la tangente de l’angle en A, en écriture décimale ?',
            reponse: { type: 'nombre', valeur: o / a },
            aide: 'Divise le côté d’en face par le côté qui touche l’angle.',
            correction: ['tan(A) = BC/AB = ' + o + '/' + a + ' = ' + ecr(o / a) + '.'],
          };
        },
      },
      {
        id: 'hauteur-arbre',
        univers: 'champetre',
        // [angle, distance]
        versions: [[40, 10], [30, 12], [45, 8], [60, 5], [25, 20], [35, 15]],
        genere(c) {
          const [ang, d] = c.alea.choisir(this.versions);
          const h = r1(d * Math.tan(rad(ang)));
          return {
            enonce: 'À ' + d + ' m du pied d’un arbre, on voit son sommet sous un angle de ' + ang + '°. Quelle est sa hauteur, en mètres, arrondie au dixième ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'La hauteur égale la distance fois la tangente de l’angle.',
            correction: ['Hauteur = ' + d + ' × tan(' + ang + '°).', 'Hauteur ≈ ' + ecr(h) + ' m.'],
          };
        },
      },
      {
        id: 'angle-de-rampe',
        univers: 'dehors',
        // [hauteur, longueur au sol]
        versions: [[1, 10], [1, 5], [1, 2], [2, 5], [3, 4], [1, 20]],
        genere(c) {
          const [o, a] = c.alea.choisir(this.versions);
          const ang = Math.round(deg(Math.atan(o / a)));
          return {
            enonce: 'Une rampe monte de ' + o + ' m pour ' + a + ' m au sol. Quel angle fait-elle avec le sol, en degrés, arrondi à l’unité ?',
            reponse: { type: 'nombre', valeur: ang },
            aide: 'Calcule le quotient, puis utilise la touche arctan de la calculatrice.',
            correction: ['tan(A) = ' + o + '/' + a + ' = ' + ecr(r2(o / a)) + '.', 'A ≈ ' + ang + '°.'],
          };
        },
      },
      {
        id: 'pente-en-pourcent',
        univers: 'champetre',
        // [montée, distance horizontale]
        versions: [[10, 100], [5, 100], [6, 50], [3, 25], [12, 200], [2, 40]],
        genere(c) {
          const [m, d] = c.alea.choisir(this.versions);
          const p = (m / d) * 100;
          return {
            enonce: 'Un chemin monte de ' + m + ' m pour ' + d + ' m parcourus à l’horizontale. Quelle est sa pente, en pourcentage ?',
            reponse: { type: 'nombre', valeur: r2(p) },
            aide: 'Divise la montée par la distance, puis multiplie par cent.',
            correction: [m + ' ÷ ' + d + ' = ' + ecr(r2(m / d)) + '.', ecr(r2(m / d)) + ' × 100 = ' + ecr(r2(p)) + ' %.'],
          };
        },
      },
      O.qcm('quel-outil', 'dehors',
        [['le côté adjacent et le grand côté', COS, 'Cosinus : adjacent sur hypoténuse.'],
          ['le côté opposé et le grand côté', SIN, 'Sinus : opposé sur hypoténuse.'],
          ['le côté opposé et le côté adjacent', TAN, 'Tangente : opposé sur adjacent.']],
        (x) => 'Dans un triangle rectangle, on utilise un angle aigu avec ' + x + '. Quel outil faut-il ?', [COS, SIN, TAN],
        'Pense à CAH, SOH, TOA.'),
    ],

    defi: {
      // [distance, angle, hauteur des yeux]
      versions: [[20, 30, 1.5], [15, 40, 1.5], [12, 45, 1.5], [30, 25, 1.5]],
      genere(c) {
        const [d, ang, y] = c.alea.choisir(this.versions);
        const h = r1(d * Math.tan(rad(ang))), t = r1(h + y);
        return {
          enonce: 'Rebecca veut connaître la hauteur d’un arbre. Ses yeux sont à ' + ecr(y) + ' m du sol, et elle se tient à ' + d + ' m de l’arbre. Elle vise le sommet sous un angle de ' + ang + '° par rapport à l’horizontale. On note A ses yeux, B le point du tronc à la hauteur de ses yeux, et C le sommet de l’arbre.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [5, 0], C: [5, 3] }, segments: [['A', 'B'], ['B', 'C'], ['A', 'C']], droits: [['A', 'B', 'C']], description: 'Un triangle rectangle en B. A B, à l’horizontale, mesure ' + d + ' mètres. L’angle en A mesure ' + ang + ' degrés. B C est la partie de l’arbre au-dessus des yeux de Rebecca, qui sont à ' + ecr(y) + ' mètre du sol.' },
          questions: [
            {
              texte: 'Question 1. Quel outil relie AB, BC et l’angle en A ?',
              reponse: O.choix(c.alea, TAN, [COS, SIN, TAN]),
              aide: 'On a le côté qui touche, et on cherche le côté d’en face.',
              correction: ['Opposé sur adjacent.', 'Réponse : ' + TAN + '.'],
            },
            {
              texte: 'Question 2. Calculer BC, en mètres, arrondi au dixième.',
              reponse: { type: 'nombre', valeur: h },
              aide: 'Multiplie la distance par la tangente de l’angle.',
              correction: [d + ' × tan(' + ang + '°) ≈ ' + ecr(h) + ' m.'],
            },
            {
              texte: 'Question 3. Quelle est la hauteur totale de l’arbre, en mètres, arrondie au dixième ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'N’oublie pas la hauteur des yeux.',
              correction: [ecr(h) + ' + ' + ecr(y) + ' = ' + ecr(t) + ' m.'],
            },
            {
              texte: 'Question 4. Rédiger le calcul de BC, en précisant le triangle et l’outil utilisés.',
              correction: ['Le triangle ABC est rectangle en B.', 'tan(A) = BC/AB, donc BC = AB × tan(A).', 'BC = ' + d + ' × tan(' + ang + '°) ≈ ' + ecr(h) + ' m.'],
              grille: ['As-tu dit que le triangle est rectangle ?', 'As-tu écrit la tangente avec les bons côtés ?', 'As-tu donné l’arrondi et l’unité ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! CAH, SOH, TOA : tu as maintenant les trois outils du triangle rectangle.',
    carte: ['calculer-la-tangente', 'hauteur-arbre', 'quel-outil'],
    papierDuSoir: { exercices: ['hauteur-arbre', 'angle-de-rampe'], defi: true },
    automatismes: [
      {
        id: 'pourcent-simple',
        versions: [[0.1], [0.05], [0.25], [0.5]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: ecr(a) + ' × 100 = ?', reponse: { type: 'nombre', valeur: Math.round(a * 100) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Abu’l-Wafa, né dans l’Iran actuel, a été le premier à utiliser la fonction tangente.',
    prenoms: ['Rebecca'],
  };
});
