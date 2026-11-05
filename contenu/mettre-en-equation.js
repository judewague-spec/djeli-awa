/* Notion 10 du bloc « Le calcul avec des lettres » : mettre un problème en équation, tester une solution. Le billet de Rebecca.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;
  const OUI = 'Oui, c’est une solution', NON = 'Non, ce n’est pas une solution';

  return {
    id: 'mettre-en-equation',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Mettre un problème en équation',
    classe: '4e',
    univers: ['commerce', 'danses', 'famille'],

    accroche: {
      texte: 'Rebecca achète 3 billets pour une fête de danse, et paie aussi 4 euros de boissons. Elle a dépensé 19 euros en tout. ' +
        'Le ticket est perdu : combien coûtait un billet ? Le prix est caché : c’est une boîte mystère. Comment écrire l’histoire avec une seule égalité ?',
      image: { dessin: 'plateaux', boites: 3, kilos: 4, droite: 19, unite: '€', description: 'Une balance en équilibre : trois boîtes mystère et 4 euros d’un côté, 19 euros de l’autre.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Choisir la lettre : x est le prix d’un billet', 'Traduire : 3x + 4', 'Écrire l’égalité : 3x + 4 = 19', 'Tester : 3 × 5 + 4 = 19'], description: 'Choisir la lettre : x est le prix d’un billet. Traduire : 3x plus 4. Écrire l’égalité : 3x plus 4 égale 19. Tester : 3 fois 5 plus 4 égale 19.' },
      etapes: [
        'D’abord, on dit ce que représente la lettre : x est le prix d’un billet, en euros.',
        'Ensuite, on traduit l’histoire : 3 billets et 4 euros de boissons, cela fait 3x + 4.',
        'On écrit l’égalité, avec ce que l’on sait du total : 3x + 4 = 19.',
        'Pour tester un nombre, on le met à la place de x : avec 5, 3 × 5 + 4 = 19. Ça tombe juste. Avec 6, 3 × 6 + 4 = 22 : non.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une égalité avec une boîte mystère, c’est ' + c.mot('equation') + '. Le nombre qui rend l’égalité vraie, c’est ' + c.mot('solution') + '. ' +
        'Pour écrire l’égalité : dis ce que représente la lettre, traduis l’histoire, écris le total. ' +
        'L’astuce : pour tester un nombre, remplace, calcule, compare.',
    },

    vocabulaire: {
      termes: {
        equation: { sesMots: 'une égalité à trou', officiel: 'une équation', lesDeux: 'une égalité à trou, que les matheux appellent une équation' },
        solution: { sesMots: 'le bon nombre', officiel: 'la solution', lesDeux: 'le bon nombre, que les matheux appellent la solution' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une égalité à trou, et le bon nombre. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une équation, et sa solution. La lettre x s’appelle aussi l’inconnue.',
        'Tu connais les mots officiels : une équation, l’inconnue x, et la solution.',
      ],
    },

    exercices: [
      {
        id: 'quelle-equation',
        univers: 'danses',
        // [billets, boissons, total]
        versions: [[3, 4, 19], [5, 2, 27], [2, 6, 20], [4, 3, 31], [6, 5, 41]],
        genere(c) {
          const [n, b, t] = c.alea.choisir(this.versions);
          const bonne = expr(n, b) + ' = ' + t;
          return {
            enonce: 'Rebecca achète ' + n + ' billets à x euros, et ' + b + ' euros de boissons. Elle paie ' + t + ' euros en tout. Quelle équation traduit cette histoire ?',
            reponse: O.choix(c.alea, bonne, [expr(b, n) + ' = ' + t, expr(n, t) + ' = ' + b, n + 'x = ' + t]),
            aide: 'Le nombre de billets multiplie x, puis on ajoute les boissons. Le total va après le signe égal.',
            correction: [n + ' billets : ' + n + 'x. Avec les boissons : ' + expr(n, b) + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'tester-un-nombre',
        univers: 'commerce',
        // [a, b, total, nombre testé]
        versions: [[3, 4, 19, 5], [3, 4, 19, 6], [5, 2, 27, 5], [5, 2, 27, 4], [2, 6, 20, 7], [2, 6, 20, 8]],
        genere(c) {
          const [a, b, t, x] = c.alea.choisir(this.versions);
          const v = a * x + b, bonne = v === t ? OUI : NON;
          return {
            enonce: 'Le nombre ' + x + ' est-il une solution de l’équation ' + expr(a, b) + ' = ' + t + ' ?',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Calcule ' + a + ' × ' + x + ' + ' + b + ', puis compare à ' + t + '.',
            aideParlee: 'Remplace x par le nombre, calcule, puis compare au résultat attendu.',
            correction: [a + ' × ' + x + ' + ' + b + ' = ' + v + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quel-nombre-marche',
        univers: 'famille',
        // [a, b, solution, deux autres]
        versions: [[3, 4, 5, 4, 6], [5, 2, 5, 3, 7], [2, 6, 7, 6, 8], [4, 3, 7, 5, 9], [6, 5, 6, 4, 8]],
        genere(c) {
          const [a, b, s, u, v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel nombre est la solution de ' + expr(a, b) + ' = ' + (a * s + b) + ' ?',
            reponse: O.choix(c.alea, String(s), [String(u), String(v)]),
            aide: 'Essaie chaque nombre proposé.',
            correction: [a + ' × ' + s + ' + ' + b + ' = ' + (a * s + b) + '.', 'Réponse : ' + s + '.'],
          };
        },
      },
      O.qcm('que-represente-x', 'commerce',
        [['Moussa achète 4 mangues au même prix et paie 12 euros.', 'Le prix d’une mangue'], ['Aminata a 3 fois plus de perles que Fatou. À elles deux, elles ont 40 perles.', 'Le nombre de perles de Fatou'], ['Rachel marche 2 heures à la même vitesse et fait 9 kilomètres.', 'La vitesse de Rachel']],
        (x) => x + ' Que doit représenter x pour écrire l’équation ?', ['Le prix d’une mangue', 'Le nombre de perles de Fatou', 'La vitesse de Rachel'],
        'La lettre représente ce que l’on cherche.'),
      {
        id: 'solution-de-tete',
        univers: 'maison-courses',
        // [a, b] : x + a = b, ou a × x = b
        versions: [[7, 12, '+'], [9, 20, '+'], [4, 28, '×'], [6, 42, '×'], [15, 40, '+'], [8, 72, '×']],
        genere(c) {
          const [a, b, op] = c.alea.choisir(this.versions);
          const s = op === '+' ? b - a : b / a;
          return {
            enonce: 'Trouve de tête la solution de ' + (op === '+' ? 'x + ' + a : a + 'x') + ' = ' + b + '.',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Demande-toi : quel nombre rend l’égalité vraie ?',
            correction: [(op === '+' ? s + ' + ' + a : a + ' × ' + s) + ' = ' + b + '.', 'Réponse : ' + s + '.'],
          };
        },
      },
    ],

    defi: {
      // [billets, boissons, total, solution, nombre faux]
      versions: [[3, 4, 19, 5, 6], [5, 2, 27, 5, 4], [2, 6, 20, 7, 8], [4, 3, 31, 7, 6]],
      genere(c) {
        const [n, b, t, s, f] = c.alea.choisir(this.versions);
        const bonne = expr(n, b) + ' = ' + t;
        return {
          enonce: 'Pour une fête de danse, Rebecca achète ' + n + ' billets au même prix. Elle ajoute ' + b + ' euros de boissons. Elle paie ' + t + ' euros en tout.',
          questions: [
            {
              texte: 'Question 1. On appelle x le prix d’un billet. Quelle équation traduit le problème ?',
              reponse: O.choix(c.alea, bonne, [expr(b, n) + ' = ' + t, n + 'x = ' + t]),
              aide: 'Traduis les billets, puis ajoute les boissons.',
              correction: ['Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 2. Moussa pense qu’un billet coûte ' + f + ' euros. Combien coûteraient alors les achats ?',
              reponse: { type: 'nombre', valeur: n * f + b },
              aide: 'Remplace x par le prix proposé.',
              correction: [n + ' × ' + f + ' + ' + b + ' = ' + (n * f + b) + ' euros.'],
            },
            {
              texte: 'Question 3. Le prix d’un billet est-il ' + s + ' euros ? Justifie par un calcul.',
              correction: [n + ' × ' + s + ' + ' + b + ' = ' + t + '.', 'On retrouve le total : un billet coûte bien ' + s + ' euros.'],
              grille: ['As-tu remplacé x par ce prix ?', 'As-tu comparé le résultat au total ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une lettre, une histoire traduite, un nombre testé : tu sais mettre un problème en équation.',
    carte: ['quelle-equation', 'tester-un-nombre', 'que-represente-x'],
    papierDuSoir: { exercices: ['quelle-equation', 'solution-de-tete'], defi: true },
    automatismes: [
      {
        id: 'trou-rapide',
        versions: [[7, 12], [9, 20], [15, 40], [6, 13]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'x + ' + a + ' = ' + b + ' : x = ?', reponse: { type: 'nombre', valeur: b - a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Dans l’Égypte ancienne, un scribe écrivait une équation d’aide à l’encre rouge. On l’appelle aujourd’hui l’équation rouge.',
    prenoms: ['Rebecca', 'Moussa', 'Aminata', 'Fatou', 'Rachel'],
  };
});
