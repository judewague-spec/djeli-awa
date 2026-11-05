/* Notion 12 du bloc « Le calcul avec des lettres » : équations avec x des deux côtés, et parenthèses. Les deux forfaits d'Esther.
   Manipulation : la balance à plateaux (js/manipulations/plateaux.js). Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;
  const sg = (x) => String(x).replace('-', '−');
  const par = (x) => (x < 0 ? '(' + sg(x) + ')' : String(x));
  const coef = (a) => (a === 1 ? 'x' : a + 'x');

  return {
    id: 'equation-deux-cotes',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Équations avec x des deux côtés',
    classe: '4e',
    univers: ['commerce', 'famille', 'maison-courses'],

    accroche: {
      texte: 'Esther hésite entre deux forfaits pour son téléphone. Le premier coûte 3 euros par semaine, plus 2 euros. Le second coûte 1 euro par semaine, plus 8 euros. ' +
        'Au bout de combien de semaines coûtent-ils la même chose ? Cette fois, la boîte mystère est des deux côtés de la balance.',
      image: { dessin: 'plateaux', boites: 3, kilos: 2, boitesDroite: 1, droite: 8, unite: '€', description: 'Une balance en équilibre : trois boîtes et 2 euros à gauche, une boîte et 8 euros à droite.' },
    },

    manipulation: {
      type: 'plateaux',
      boites: 3,
      kilos: 2,
      boitesDroite: 1,
      droite: 8,
      consigne: 'Cette balance est une image du problème. À gauche, trois boîtes et deux kilos. À droite, une boîte et huit kilos. Enlève d’abord les boîtes qui sont des deux côtés, puis les kilos, puis partage.',
    },

    decouverte: {
      texte: (c) => 'Quand x est des deux côtés, on regroupe. On met ' + c.mot('regrouper') + '. Les nombres seuls vont de l’autre. ' +
        'Pour cela, on enlève le même nombre de x des deux côtés, puis le même nombre seul. S’il y a des parenthèses, on développe d’abord. ' +
        'L’astuce : à la fin, vérifie ta réponse en calculant ' + c.mot('membres') + '.',
    },

    vocabulaire: {
      termes: {
        regrouper: { sesMots: 'les boîtes d’un côté', officiel: 'les termes en x dans un membre', lesDeux: 'les boîtes d’un côté, ce que les matheux appellent les termes en x dans un membre' },
        membres: { sesMots: 'gauche et droite', officiel: 'les deux membres', lesDeux: 'gauche et droite, que les matheux appellent les deux membres' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les boîtes d’un côté, les nombres de l’autre. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : les termes en x dans un membre, les nombres seuls dans l’autre.',
        'Tu connais les mots officiels : les deux membres, et les termes en x.',
      ],
    },

    exercices: [
      {
        id: 'x-des-deux-cotes',
        univers: 'commerce',
        // [a, b, c, d] : ax + b = cx + d, solution entière
        versions: [[3, 2, 1, 8], [5, 1, 2, 10], [4, 3, 2, 9], [6, 2, 3, 14], [7, 1, 4, 13], [5, 4, 3, 12]],
        genere(c) {
          const [a, b, d, e] = c.alea.choisir(this.versions);
          const s = (e - b) / (a - d);
          return {
            enonce: 'Résous ' + expr(a, b) + ' = ' + expr(d, e) + '.',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Enlève ' + coef(d) + ' des deux côtés, puis ' + b + ' des deux côtés, puis divise.',
            aideParlee: 'Enlève les x du côté où il y en a le moins, puis le nombre seul, puis divise.',
            correction: [coef(a - d) + ' + ' + b + ' = ' + e + '.', coef(a - d) + ' = ' + (e - b) + '.', 'x = ' + s + '.'],
          };
        },
      },
      {
        id: 'avec-parenthese',
        univers: 'maison-courses',
        // [k, b, t] : k(x + b) = t
        versions: [[2, 3, 14], [3, 1, 15], [4, 2, 24], [5, 3, 25], [6, 1, 30]],
        genere(c) {
          const [k, b, t] = c.alea.choisir(this.versions);
          const s = t / k - b;
          return {
            enonce: 'Résous ' + k + '(x + ' + b + ') = ' + t + '.',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Développe : ' + expr(k, k * b) + ' = ' + t + '.',
            aideParlee: 'Développe d’abord, puis résous comme d’habitude.',
            correction: [expr(k, k * b) + ' = ' + t + '.', k + 'x = ' + (t - k * b) + ', donc x = ' + s + '.'],
          };
        },
      },
      {
        id: 'moins-devant-x',
        univers: 'famille',
        // [a, b, c, d] : ax + b = cx − d, solution négative
        versions: [[3, 4, 1, 2], [5, 6, 2, 3], [4, 7, 2, 1], [6, 9, 3, 3], [7, 2, 5, 4]],
        genere(c) {
          const [a, b, d, e] = c.alea.choisir(this.versions);
          const s = (-e - b) / (a - d);
          return {
            enonce: 'Résous ' + expr(a, b) + ' = ' + expr(d, -e) + '.',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Regroupe les x à gauche et les nombres à droite. La solution est négative.',
            correction: [coef(a - d) + ' = ' + sg(-e) + ' − ' + b + ' = ' + sg(-e - b) + '.', 'x = ' + sg(s) + '.'],
          };
        },
      },
      O.qcm('premier-geste', 'commerce',
        [['3x + 2 = x + 8', 'Enlever x des deux côtés'], ['5x + 1 = 2x + 10', 'Enlever 2x des deux côtés'], ['2(x + 3) = 14', 'Développer la parenthèse']],
        (x) => 'Pour résoudre ' + x + ', quel geste fait le mieux avancer ?', ['Enlever x des deux côtés', 'Enlever 2x des deux côtés', 'Développer la parenthèse'],
        'Regroupe les x d’un seul côté ; s’il y a une parenthèse, développe d’abord.'),
      {
        id: 'forfaits',
        univers: 'commerce',
        // [a, b, c, d] : forfaits en euros, semaines
        versions: [[3, 2, 1, 8], [5, 1, 2, 10], [4, 3, 2, 9], [6, 2, 3, 14]],
        genere(c) {
          const [a, b, d, e] = c.alea.choisir(this.versions);
          const s = (e - b) / (a - d);
          return {
            enonce: 'Un forfait coûte ' + a + ' euros par semaine, plus ' + O.nb(b, 'euro') + '. Un autre coûte ' + d + ' euro' + (d > 1 ? 's' : '') + ' par semaine, plus ' + e + ' euros. Au bout de combien de semaines coûtent-ils la même chose ?',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Écris ' + expr(a, b) + ' = ' + expr(d, e) + ', puis résous.',
            aideParlee: 'Écris une équation avec x des deux côtés, puis résous.',
            correction: [expr(a, b) + ' = ' + expr(d, e) + '.', coef(a - d) + ' = ' + (e - b) + ', donc x = ' + s + ' semaines.'],
          };
        },
      },
    ],

    defi: {
      // [a, b, c, d, autre nombre de semaines]
      versions: [[3, 2, 1, 8, 5], [5, 1, 2, 10, 6], [4, 3, 2, 9, 7], [6, 2, 3, 14, 8]],
      genere(c) {
        const [a, b, d, e, n] = c.alea.choisir(this.versions);
        const s = (e - b) / (a - d);
        return {
          enonce: 'Esther compare deux forfaits. Forfait A : ' + a + ' euros par semaine, plus ' + O.nb(b, 'euro') + '. Forfait B : ' + d + ' euro' + (d > 1 ? 's' : '') + ' par semaine, plus ' + e + ' euros. On note x le nombre de semaines.',
          questions: [
            {
              texte: 'Question 1. Quel est le prix du forfait A pour ' + n + ' semaines ?',
              reponse: { type: 'nombre', valeur: a * n + b },
              aide: 'Remplace x par le nombre de semaines.',
              correction: [a + ' × ' + n + ' + ' + b + ' = ' + (a * n + b) + ' euros.'],
            },
            {
              texte: 'Question 2. Résous ' + expr(a, b) + ' = ' + expr(d, e) + '.',
              reponse: { type: 'nombre', valeur: s },
              aide: 'Regroupe les x d’un côté, les nombres de l’autre.',
              correction: [coef(a - d) + ' = ' + (e - b) + ', donc x = ' + s + '.'],
            },
            {
              texte: 'Question 3. Esther garde son téléphone ' + n + ' semaines. Quel forfait lui conseilles-tu ? Justifie.',
              correction: ['Pour ' + n + ' semaines : forfait A, ' + (a * n + b) + ' euros ; forfait B, ' + (d * n + e) + ' euros.', 'Le forfait B est le moins cher.'],
              grille: ['As-tu calculé les deux prix ?', 'As-tu comparé les deux prix ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Les x d’un côté, les nombres de l’autre : plus aucune balance ne te résiste.',
    carte: ['x-des-deux-cotes', 'avec-parenthese', 'premier-geste'],
    papierDuSoir: { exercices: ['x-des-deux-cotes', 'forfaits'], defi: true },
    automatismes: [
      {
        id: 'ecart-de-x',
        versions: [[5, 2], [7, 3], [9, 4], [6, 1]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + 'x − ' + (b === 1 ? '' : b) + 'x = ? x (écris le nombre)', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Alexandrie, en Égypte, Diophante, souvent appelé le père de l’algèbre, a écrit un grand livre sur les équations.',
    prenoms: ['Esther'],
  };
});
