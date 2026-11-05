/* Notion 11 du bloc « Le calcul avec des lettres » : résoudre ax + b = c, la balance. La balance d'Aminata.
   Manipulation : la balance à plateaux (js/manipulations/plateaux.js). Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;
  const sg = (x) => String(x).replace('-', '−');
  const par = (x) => (x < 0 ? '(' + sg(x) + ')' : String(x));

  return {
    id: 'resoudre-equation',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Résoudre une équation : la balance',
    classe: '4e',
    univers: ['commerce', 'cuisine-restaurant', 'maison-courses'],

    accroche: {
      texte: 'Au marché, Aminata pose sur sa balance 2 sacs de riz identiques et un poids de 3 kilos. De l’autre côté, 11 kilos. La balance est en équilibre. ' +
        'Combien pèse un sac ? Elle n’a pas besoin de deviner : si elle enlève la même chose des deux côtés, la balance reste droite.',
      image: { dessin: 'plateaux', boites: 2, kilos: 3, droite: 11, description: 'Une balance en équilibre : deux sacs et 3 kilos à gauche, 11 kilos à droite.' },
    },

    manipulation: {
      type: 'plateaux',
      boites: 2,
      kilos: 3,
      droite: 11,
      consigne: 'À gauche, deux boîtes et trois kilos. À droite, onze kilos. La balance doit rester en équilibre. Fais toujours la même chose des deux côtés, jusqu’à savoir ce que pèse une boîte.',
    },

    decouverte: {
      texte: (c) => 'Une équation, c’est une balance en équilibre. On peut ' + c.mot('enlever') + '. On peut aussi diviser les deux côtés par le même nombre. ' +
        'Pour trouver la boîte, on enlève d’abord le nombre seul, puis on partage. C’est ' + c.mot('resoudre') + '. ' +
        'L’astuce : à la fin, vérifie en remplaçant x dans l’équation de départ.',
    },

    vocabulaire: {
      termes: {
        enlever: { sesMots: 'faire la même chose des deux côtés', officiel: 'ajouter ou soustraire le même nombre aux deux membres', lesDeux: 'faire la même chose des deux côtés : les matheux disent ajouter ou soustraire aux deux membres' },
        resoudre: { sesMots: 'trouver la boîte', officiel: 'résoudre l’équation', lesDeux: 'trouver la boîte, ce que les matheux appellent résoudre l’équation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : faire la même chose des deux côtés, et trouver la boîte. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : ajouter ou soustraire le même nombre aux deux membres, puis diviser les deux membres. C’est résoudre l’équation.',
        'Tu connais les mots officiels : les deux membres, résoudre l’équation, et vérifier la solution.',
      ],
    },

    exercices: [
      {
        id: 'resoudre-plus',
        univers: 'commerce',
        // [a, b, solution]
        versions: [[2, 3, 4], [3, 5, 6], [4, 1, 5], [5, 2, 7], [6, 4, 3], [7, 3, 2]],
        genere(c) {
          const [a, b, s] = c.alea.choisir(this.versions);
          const t = a * s + b;
          return {
            enonce: 'Résous ' + expr(a, b) + ' = ' + t + '.',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Enlève ' + b + ' des deux côtés, puis divise par ' + a + '.',
            aideParlee: 'Enlève le nombre seul des deux côtés, puis divise par le nombre devant x.',
            correction: [a + 'x = ' + t + ' − ' + b + ' = ' + (t - b) + '.', 'x = ' + (t - b) + ' ÷ ' + a + ' = ' + s + '.'],
          };
        },
      },
      {
        id: 'resoudre-moins',
        univers: 'cuisine-restaurant',
        // [a, b, solution] : ax − b = t
        versions: [[2, 3, 5], [3, 4, 6], [5, 2, 3], [4, 7, 4], [6, 5, 2]],
        genere(c) {
          const [a, b, s] = c.alea.choisir(this.versions);
          const t = a * s - b;
          return {
            enonce: 'Résous ' + expr(a, -b) + ' = ' + t + '.',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Ajoute ' + b + ' des deux côtés, puis divise par ' + a + '.',
            aideParlee: 'Ajoute le même nombre des deux côtés pour enlever le moins, puis divise.',
            correction: [a + 'x = ' + t + ' + ' + b + ' = ' + (t + b) + '.', 'x = ' + (t + b) + ' ÷ ' + a + ' = ' + s + '.'],
          };
        },
      },
      {
        id: 'solution-negative',
        univers: 'maison-courses',
        // [a, b, solution négative]
        versions: [[2, 9, -3], [3, 10, -2], [4, 8, -1], [5, 20, -2], [2, 1, -4]],
        genere(c) {
          const [a, b, s] = c.alea.choisir(this.versions);
          const t = a * s + b;
          return {
            enonce: 'Résous ' + expr(a, b) + ' = ' + sg(t) + '.',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Enlève ' + b + ' des deux côtés : ' + sg(t) + ' − ' + b + ' = ' + sg(t - b) + '. Puis divise par ' + a + '.',
            aideParlee: 'Enlève le nombre seul, puis divise. Ici, la solution est négative.',
            correction: [a + 'x = ' + sg(t) + ' − ' + b + ' = ' + sg(t - b) + '.', 'x = ' + par(t - b) + ' ÷ ' + a + ' = ' + sg(s) + '.'],
          };
        },
      },
      O.qcm('premier-geste', 'commerce',
        [['3x + 5 = 20', 'Enlever 5 des deux côtés'], ['3x = 15', 'Diviser les deux côtés par 3'], ['x − 4 = 9', 'Ajouter 4 des deux côtés']],
        (x) => 'Pour résoudre ' + x + ', quel geste faire d’abord ?', ['Enlever 5 des deux côtés', 'Diviser les deux côtés par 3', 'Ajouter 4 des deux côtés'],
        'Il faut laisser x tout seul : d’abord le nombre seul, puis celui qui multiplie.'),
      {
        id: 'probleme',
        univers: 'commerce',
        // [billets ou sacs, frais, total] : solution entière
        versions: [[3, 4, 19], [5, 2, 27], [2, 6, 20], [4, 3, 31], [6, 5, 41]],
        genere(c) {
          const [n, b, t] = c.alea.choisir(this.versions);
          const s = (t - b) / n;
          return {
            enonce: 'Moussa achète ' + n + ' sacs de riz identiques, et paie ' + b + ' euros de livraison. Il paie ' + t + ' euros en tout. Combien coûte un sac ?',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Écris ' + expr(n, b) + ' = ' + t + ', puis résous.',
            aideParlee: 'Écris l’équation, enlève le nombre seul, puis divise.',
            correction: [expr(n, b) + ' = ' + t + '.', n + 'x = ' + (t - b) + ', donc x = ' + s + ' euros.'],
          };
        },
      },
    ],

    defi: {
      // [a, b, solution]
      versions: [[2, 3, 4], [3, 5, 6], [4, 1, 5], [5, 2, 7]],
      genere(c) {
        const [a, b, s] = c.alea.choisir(this.versions);
        const t = a * s + b;
        return {
          enonce: 'Aminata pose sur sa balance ' + a + ' sacs de riz identiques et un poids de ' + b + ' kg. De l’autre côté, elle met ' + t + ' kg. La balance est en équilibre.',
          image: { dessin: 'plateaux', boites: a, kilos: b, droite: t, description: 'Une balance en équilibre : ' + a + ' sacs et ' + O.nb(b, 'kilo') + ' d’un côté, ' + t + ' kilos de l’autre.' },
          questions: [
            {
              texte: 'Question 1. Combien de kilos pèsent les ' + a + ' sacs ensemble ?',
              reponse: { type: 'nombre', valeur: t - b },
              aide: 'Enlève le poids des deux côtés.',
              correction: [t + ' − ' + b + ' = ' + (t - b) + ' kg.'],
            },
            {
              texte: 'Question 2. Combien pèse un sac, en kilos ?',
              reponse: { type: 'nombre', valeur: s },
              aide: 'Partage en parts égales.',
              correction: [(t - b) + ' ÷ ' + a + ' = ' + s + ' kg.'],
            },
            {
              texte: 'Question 3. Écris l’équation, et vérifie ta réponse par un calcul.',
              correction: ['Équation : ' + expr(a, b) + ' = ' + t + '.', 'Vérification : ' + a + ' × ' + s + ' + ' + b + ' = ' + t + '.'],
              grille: ['As-tu écrit l’équation ?', 'As-tu remplacé x par ta réponse ?', 'As-tu retrouvé le bon nombre ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! La même chose des deux côtés, et la balance reste droite : tu sais résoudre une équation.',
    carte: ['resoudre-plus', 'resoudre-moins', 'premier-geste'],
    papierDuSoir: { exercices: ['resoudre-plus', 'probleme'], defi: true },
    automatismes: [
      {
        id: 'equation-rapide',
        versions: [[2, 10], [3, 12], [5, 20], [4, 28]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + 'x = ' + b + ' : x = ?', reponse: { type: 'nombre', valeur: b / a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Bagdad, en Irak, al-Khwarizmi a écrit un grand livre de calcul par l’équilibre. Son titre, al-jabr, nous a donné le mot algèbre.',
    prenoms: ['Aminata', 'Moussa'],
  };
});
