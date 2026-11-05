/* Notion 3 du bloc « Le calcul avec des lettres » : tester une égalité. Les deux prix de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;
  const VRAIE = 'Elle est vraie', FAUSSE = 'Elle est fausse';

  return {
    id: 'tester-egalite',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Tester une égalité',
    classe: '4e',
    univers: ['commerce', 'famille', 'maison-courses'],

    accroche: {
      texte: 'Laure compare deux vendeurs de pagnes. Le premier demande 2 euros par mètre, plus 9 euros. Le second demande 5 euros par mètre. ' +
        'Pour 3 mètres, est-ce le même prix ? Et pour 4 mètres ? Sa fille Rachel prend son cahier : il suffit de calculer des deux côtés.',
      image: { dessin: 'chaine', etapes: ['Premier vendeur : 2 × 3 + 9 = 15', 'Second vendeur : 5 × 3 = 15', 'Pour 3 mètres : même prix'], description: 'Pour 3 mètres, le premier vendeur demande 2 fois 3 plus 9, soit 15 euros. Le second demande 5 fois 3, soit 15 euros. C’est le même prix.' },
    },

    manipulation: {
      image: { dessin: 'plateaux', boites: 2, kilos: 9, droite: 15, unite: '€', description: 'Une balance : deux boîtes et 9 euros d’un côté, 15 euros de l’autre. Elle est en équilibre si les deux côtés donnent le même nombre.' },
      etapes: [
        'Une égalité a deux côtés, de part et d’autre du signe =.',
        'Pour la tester avec un nombre, on calcule chaque côté séparément. On n’écrit pas tout d’un coup.',
        'Côté gauche, avec x = 3 : 2 × 3 + 9 = 15. Côté droit : 5 × 3 = 15. Les deux côtés sont égaux : l’égalité est vraie pour x = 3.',
        'Avec x = 4 : à gauche, 2 × 4 + 9 = 17 ; à droite, 5 × 4 = 20. L’égalité est fausse pour x = 4.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une égalité avec une lettre peut être vraie pour un nombre, et fausse pour un autre. Pour la vérifier, on calcule ' + c.mot('cotes') + ' séparément, avec le même nombre. ' +
        'S’ils donnent le même résultat, ' + c.mot('vraie') + ' pour ce nombre. ' +
        'L’astuce : un seul côté ne suffit pas, calcule toujours les deux.',
    },

    vocabulaire: {
      termes: {
        cotes: { sesMots: 'les deux côtés', officiel: 'les deux membres', lesDeux: 'les deux côtés, que les matheux appellent les deux membres' },
        vraie: { sesMots: 'ça tombe juste', officiel: 'l’égalité est vraie', lesDeux: 'ça tombe juste, ce que les matheux disent ainsi : l’égalité est vraie' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les deux côtés, et ça tombe juste. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : les deux membres de l’égalité, et l’égalité est vraie, ou fausse, pour ce nombre.',
        'Tu connais les mots officiels : les deux membres, une égalité vraie ou fausse pour un nombre donné.',
      ],
    },

    exercices: [
      {
        id: 'vraie-ou-fausse',
        univers: 'commerce',
        // [a, b, c, x] : ax + b = cx pour x ?
        versions: [[2, 9, 5, 3], [2, 9, 5, 4], [3, 4, 5, 2], [3, 4, 5, 3], [4, 6, 6, 3], [4, 6, 6, 2]],
        genere(c) {
          const [a, b, d, x] = c.alea.choisir(this.versions);
          const g = a * x + b, dr = d * x, bonne = g === dr ? VRAIE : FAUSSE;
          return {
            enonce: 'L’égalité ' + expr(a, b) + ' = ' + d + 'x est-elle vraie pour x = ' + x + ' ?',
            reponse: O.choix(c.alea, bonne, [VRAIE, FAUSSE]),
            aide: 'Calcule les deux côtés avec x = ' + x + '.',
            aideParlee: 'Calcule les deux côtés séparément, avec le nombre donné.',
            correction: ['À gauche : ' + a + ' × ' + x + ' + ' + b + ' = ' + g + '.', 'À droite : ' + d + ' × ' + x + ' = ' + dr + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'cote-gauche',
        univers: 'maison-courses',
        // [a, b, x]
        versions: [[3, 2, 4], [5, 1, 2], [2, 8, 6], [4, 3, 5], [6, 2, 3]],
        genere(c) {
          const [a, b, x] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans l’égalité ' + expr(a, b) + ' = 20, combien vaut le côté gauche pour x = ' + x + ' ?',
            reponse: { type: 'nombre', valeur: a * x + b },
            aide: 'Calcule ' + a + ' × ' + x + ' + ' + b + '.',
            aideParlee: 'Remplace x dans le côté gauche seulement, puis calcule.',
            correction: [a + ' × ' + x + ' + ' + b + ' = ' + (a * x + b) + '.'],
          };
        },
      },
      {
        id: 'quelle-valeur',
        univers: 'famille',
        // [a, b, c, solution, deux autres nombres]
        versions: [[2, 9, 5, 3, 1, 4], [3, 4, 5, 2, 3, 5], [4, 6, 6, 3, 2, 5], [1, 8, 3, 4, 2, 6], [2, 10, 4, 5, 3, 6]],
        genere(c) {
          const [a, b, d, s, u, v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour quel nombre l’égalité ' + expr(a, b) + ' = ' + d + 'x est-elle vraie ?',
            reponse: O.choix(c.alea, String(s), [String(u), String(v)]),
            aide: 'Essaie chaque nombre proposé, des deux côtés.',
            correction: ['Avec x = ' + s + ' : à gauche, ' + (a * s + b) + ' ; à droite, ' + d * s + '. Les deux côtés sont égaux.', 'Réponse : ' + s + '.'],
          };
        },
      },
      O.qcm('toujours-vraie', 'maison-courses',
        [['Une égalité vraie pour x = 3 est forcément vraie pour x = 4.', 'Faux'], ['Pour tester une égalité, il faut calculer les deux côtés.', 'Vrai'], ['Une égalité peut être fausse pour un nombre, et vraie pour un autre.', 'Vrai'], ['Pour tester une égalité, un seul côté suffit.', 'Faux']],
        (x) => '« ' + x + ' » Vrai ou faux ?', ['Vrai', 'Faux'],
        'Une égalité peut être vraie pour un nombre, et fausse pour un autre.'),
      {
        id: 'ecart-des-cotes',
        univers: 'commerce',
        // [a, b, c, x]
        versions: [[2, 9, 5, 4], [3, 4, 5, 3], [4, 6, 6, 5], [1, 8, 3, 6], [2, 10, 4, 7]],
        genere(c) {
          const [a, b, d, x] = c.alea.choisir(this.versions);
          const g = a * x + b, dr = d * x;
          return {
            enonce: 'Le premier vendeur demande ' + expr(a, b) + ' euros pour x mètres, et le second ' + d + 'x euros. Pour x = ' + x + ', quel est l’écart entre les deux prix, en euros ?',
            reponse: { type: 'nombre', valeur: Math.abs(g - dr) },
            aide: 'Calcule les deux prix, puis enlève le plus petit du plus grand.',
            correction: ['Premier vendeur : ' + g + ' euros. Second vendeur : ' + dr + ' euros.', 'Écart : ' + Math.abs(g - dr) + ' euros.'],
          };
        },
      },
    ],

    defi: {
      // [a, b, c, x1 faux, x2 vrai]
      versions: [[2, 9, 5, 4, 3], [3, 4, 5, 3, 2], [4, 6, 6, 5, 3], [1, 8, 3, 6, 4]],
      genere(c) {
        const [a, b, d, x1, x2] = c.alea.choisir(this.versions);
        return {
          enonce: 'Pour x mètres de pagne, le premier vendeur demande ' + expr(a, b) + ' euros, et le second ' + d + 'x euros. Laure veut savoir pour quelle longueur les deux prix sont égaux.',
          questions: [
            {
              texte: 'Question 1. Pour x = ' + x1 + ', combien demande le premier vendeur ?',
              reponse: { type: 'nombre', valeur: a * x1 + b },
              aide: 'Remplace x dans le prix du premier vendeur.',
              correction: [a + ' × ' + x1 + ' + ' + b + ' = ' + (a * x1 + b) + ' euros.'],
            },
            {
              texte: 'Question 2. Pour x = ' + x2 + ', l’égalité ' + expr(a, b) + ' = ' + d + 'x est-elle vraie ?',
              reponse: O.choix(c.alea, VRAIE, [VRAIE, FAUSSE]),
              aide: 'Calcule les deux côtés.',
              correction: ['À gauche : ' + (a * x2 + b) + '. À droite : ' + d * x2 + '.', 'Réponse : ' + VRAIE + '.'],
            },
            {
              texte: 'Question 3. Rédige la réponse pour Laure : pour quelle longueur les deux prix sont-ils égaux ? Explique comment tu le sais.',
              correction: ['Pour ' + x2 + ' mètres : les deux vendeurs demandent ' + d * x2 + ' euros.', 'On l’a vérifié en calculant les deux côtés de l’égalité avec x = ' + x2 + '.'],
              grille: ['As-tu donné la longueur ?', 'As-tu écrit le calcul des deux côtés ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un côté, puis l’autre, avec le même nombre : tu sais tester une égalité sans te tromper.',
    carte: ['vraie-ou-fausse', 'cote-gauche', 'toujours-vraie'],
    papierDuSoir: { exercices: ['vraie-ou-fausse', 'ecart-des-cotes'], defi: true },
    automatismes: [
      {
        id: 'egal-ou-pas',
        versions: [[3, 2, 6], [4, 2, 9], [5, 3, 15], [6, 2, 13]],
        genere(c) {
          const [a, b, r] = c.alea.choisir(this.versions);
          return { enonce: a + ' × ' + b + ' = ' + r + ' : vrai ou faux ?', reponse: O.choix(c.alea, a * b === r ? 'Vrai' : 'Faux', ['Vrai', 'Faux']) };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? Au pays de Galles, Robert Recorde a inventé le signe égal, en 1557. Deux traits parallèles, disait-il, car rien n’est plus égal.',
    prenoms: ['Laure', 'Rachel'],
  };
});
