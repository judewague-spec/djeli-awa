/* Notion 15 du bloc « Le calcul avec des lettres » : systèmes de deux équations. Cafés et beignets chez Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const OUI = 'Oui, les deux égalités sont vraies', NON = 'Non, une égalité est fausse';

  return {
    id: 'systemes',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Les systèmes de deux équations',
    classe: 'ancien programme',
    univers: ['cuisine-restaurant', 'commerce', 'famille'],

    accroche: {
      texte: 'Au stand de Moussa, Aminata paie 2 cafés et 1 beignet : 5 euros. Rachel paie 1 café et 1 beignet : 3 euros. Moussa a oublié ses prix ! ' +
        'Deux boîtes mystère cette fois : le prix du café et le prix du beignet. Mais on a deux indices. Regarde bien la différence entre les deux additions.',
      image: { dessin: 'chaine', etapes: ['2 cafés et 1 beignet : 5 euros', '1 café et 1 beignet : 3 euros', 'La différence : 1 café, 2 euros'], description: 'Deux cafés et un beignet coûtent 5 euros. Un café et un beignet coûtent 3 euros. La différence est un café, qui coûte 2 euros.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['2x + y = 5', 'x + y = 3', 'On soustrait : x = 2', 'On remplace : 2 + y = 3, donc y = 1'], description: '2x plus y égale 5. x plus y égale 3. On soustrait : x égale 2. On remplace : 2 plus y égale 3, donc y égale 1.' },
      etapes: [
        'On appelle x le prix d’un café et y le prix d’un beignet.',
        'Les deux additions s’écrivent : 2x + y = 5 et x + y = 3.',
        'On soustrait la seconde de la première : les y disparaissent. Il reste x = 2.',
        'On remplace x par 2 dans une équation : 2 + y = 3, donc y = 1.',
        'On vérifie dans l’autre équation : 2 × 2 + 1 = 5. C’est juste.',
      ],
    },

    decouverte: {
      texte: (c) => 'Deux boîtes mystère et deux indices ? C’est ' + c.mot('systeme') + '. On cherche deux nombres qui rendent les deux égalités vraies en même temps. ' +
        'Pour cela, on fait disparaître une lettre, puis on remplace. À la fin, on trouve ' + c.mot('couple') + '. ' +
        'L’astuce : vérifie toujours dans les deux équations.',
    },

    vocabulaire: {
      termes: {
        systeme: { sesMots: 'une énigme à deux indices', officiel: 'un système de deux équations', lesDeux: 'une énigme à deux indices, que les matheux appellent un système de deux équations' },
        couple: { sesMots: 'la paire de nombres', officiel: 'le couple solution', lesDeux: 'la paire de nombres, que les matheux appellent le couple solution' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une énigme à deux indices, et la paire de nombres. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : un système de deux équations, et le couple solution.',
        'Tu connais les mots officiels : un système de deux équations à deux inconnues, et le couple solution.',
      ],
    },

    exercices: [
      {
        id: 'prix-du-cafe',
        univers: 'cuisine-restaurant',
        // [cafés a, cafés b, prix café, prix beignet] : a cafés et 1 beignet ; b cafés et 1 beignet
        versions: [[2, 1, 2, 1], [3, 1, 2, 3], [4, 2, 3, 2], [5, 2, 2, 4], [3, 2, 4, 1]],
        genere(c) {
          const [a, b, x, y] = c.alea.choisir(this.versions);
          const P = a * x + y, Q = b * x + y;
          return {
            enonce: a + ' cafés et 1 beignet coûtent ' + P + ' euros. ' + b + (b > 1 ? ' cafés' : ' café') + ' et 1 beignet coûtent ' + Q + ' euros. Combien coûte un café ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'La différence entre les deux additions : ' + (a - b) + (a - b > 1 ? ' cafés' : ' café') + ', ' + (P - Q) + ' euros.',
            aideParlee: 'Regarde la différence entre les deux additions : le beignet disparaît.',
            correction: [P + ' − ' + Q + ' = ' + (P - Q) + ' euros pour ' + (a - b) + (a - b > 1 ? ' cafés' : ' café') + '.', (P - Q) + ' ÷ ' + (a - b) + ' = ' + x + ' euros.'],
          };
        },
      },
      {
        id: 'prix-du-beignet',
        univers: 'cuisine-restaurant',
        // [cafés, prix café, prix beignet]
        versions: [[2, 2, 1], [3, 2, 3], [2, 3, 2], [4, 2, 4], [3, 4, 1]],
        genere(c) {
          const [a, x, y] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un café coûte ' + x + ' euros. ' + a + ' cafés et 1 beignet coûtent ' + (a * x + y) + ' euros. Combien coûte un beignet ?',
            reponse: { type: 'nombre', valeur: y },
            aide: 'Calcule ' + (a * x + y) + ' − ' + a + ' × ' + x + '.',
            aideParlee: 'Enlève le prix des cafés du total.',
            correction: [a + ' × ' + x + ' = ' + a * x + '.', (a * x + y) + ' − ' + a * x + ' = ' + O.nb(y, 'euro') + '.'],
          };
        },
      },
      {
        id: 'somme-et-difference',
        univers: 'famille',
        // [x, y] : x + y = S ; x − y = D
        versions: [[7, 3], [9, 5], [6, 2], [11, 4], [8, 6]],
        genere(c) {
          const [x, y] = c.alea.choisir(this.versions);
          return {
            enonce: 'On a x + y = ' + (x + y) + ' et x − y = ' + (x - y) + '. Combien vaut x ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'Additionne les deux égalités : les y disparaissent.',
            correction: ['2x = ' + (x + y) + ' + ' + (x - y) + ' = ' + 2 * x + '.', 'x = ' + x + '.'],
          };
        },
      },
      {
        id: 'remplacer',
        univers: 'commerce',
        // [k, x] : y = kx ; x + y = S
        versions: [[2, 4], [3, 2], [4, 3], [2, 7], [5, 2]],
        genere(c) {
          const [k, x] = c.alea.choisir(this.versions);
          return {
            enonce: 'On a y = ' + k + 'x et x + y = ' + (k + 1) * x + '. Combien vaut x ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'Remplace y par ' + k + 'x dans la seconde égalité.',
            aideParlee: 'Remplace y dans la seconde égalité. Il ne reste plus que x.',
            correction: ['x + ' + k + 'x = ' + (k + 1) * x + '.', (k + 1) + 'x = ' + (k + 1) * x + ', donc x = ' + x + '.'],
          };
        },
      },
      {
        id: 'tester-un-couple',
        univers: 'commerce',
        // [a, S1, S2, x, y] : ax + y = S1 ; x + y = S2
        versions: [[2, 5, 3, 2, 1], [2, 5, 3, 1, 3], [3, 11, 5, 3, 2], [3, 11, 5, 2, 5], [4, 14, 5, 3, 2]],
        genere(c) {
          const [a, s1, s2, x, y] = c.alea.choisir(this.versions);
          const g1 = a * x + y, g2 = x + y, bonne = g1 === s1 && g2 === s2 ? OUI : NON;
          return {
            enonce: 'x = ' + x + ' et y = ' + y + ' sont-ils solutions de ' + a + 'x + y = ' + s1 + ' et x + y = ' + s2 + ' ?',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Teste les deux égalités.',
            correction: [a + ' × ' + x + ' + ' + y + ' = ' + g1 + ' ; ' + x + ' + ' + y + ' = ' + g2 + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [cafés a, cafés b, prix café, prix beignet, commande : cafés, beignets]
      versions: [[2, 1, 2, 1, 3, 2], [3, 1, 2, 3, 4, 2], [4, 2, 3, 2, 5, 3], [3, 2, 4, 1, 2, 5]],
      genere(c) {
        const [a, b, x, y, cc, cb] = c.alea.choisir(this.versions);
        const P = a * x + y, Q = b * x + y;
        return {
          enonce: 'Au stand de Moussa, Aminata paie ' + a + ' cafés et 1 beignet : ' + P + ' euros. Rachel paie ' + b + (b > 1 ? ' cafés' : ' café') + ' et 1 beignet : ' + Q + ' euros. On note x le prix d’un café et y le prix d’un beignet.',
          questions: [
            {
              texte: 'Question 1. Trouve le prix d’un café, en euros.',
              reponse: { type: 'nombre', valeur: x },
              aide: 'Regarde la différence entre les deux additions.',
              correction: [a + 'x + y − (' + (b === 1 ? '' : b) + 'x + y) = ' + (P - Q) + '.', (a - b === 1 ? '' : (a - b) + 'x = ' + (P - Q) + ', donc ') + 'x = ' + x + ' euros.'],
            },
            {
              texte: 'Question 2. Trouve le prix d’un beignet, en euros.',
              reponse: { type: 'nombre', valeur: y },
              aide: 'Remplace x dans une des deux égalités.',
              correction: [b + ' × ' + x + ' + y = ' + Q + ', donc y = ' + O.nb(y, 'euro') + '.'],
            },
            {
              texte: 'Question 3. Laure commande ' + cc + ' cafés et ' + cb + ' beignets. Combien paie-t-elle ?',
              reponse: { type: 'nombre', valeur: cc * x + cb * y },
              aide: 'Multiplie chaque prix par sa quantité, puis ajoute.',
              correction: [cc + ' × ' + x + ' + ' + cb + ' × ' + y + ' = ' + (cc * x + cb * y) + ' euros.'],
            },
            {
              texte: 'Question 4. Vérifie tes deux prix dans les deux additions, et rédige ta conclusion.',
              correction: [a + ' × ' + x + ' + ' + y + ' = ' + P + ' et ' + b + ' × ' + x + ' + ' + y + ' = ' + Q + '.', 'Un café coûte ' + x + ' euros, et un beignet ' + O.nb(y, 'euro') + '.'],
              grille: ['As-tu vérifié la première addition ?', 'As-tu vérifié la seconde addition ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Deux boîtes mystère, deux indices : tu as retrouvé les prix de Moussa.',
    carte: ['prix-du-cafe', 'prix-du-beignet', 'tester-un-couple'],
    papierDuSoir: { exercices: ['somme-et-difference', 'remplacer'], defi: true },
    automatismes: [
      {
        id: 'difference-rapide',
        versions: [[12, 7], [15, 9], [20, 13], [11, 4]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Chine, un vieux livre, Les Neuf Chapitres, résout des problèmes à plusieurs équations, avec des nombres en colonnes.',
    prenoms: ['Moussa', 'Aminata', 'Rachel', 'Laure'],
  };
});
