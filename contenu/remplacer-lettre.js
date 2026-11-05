/* Notion 2 du bloc « Le calcul avec des lettres » : remplacer la lettre par un nombre. Les tresses de Clarisse.
   Manipulation : la boîte mystère (js/manipulations/boite-mystere.js). Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;
  const sg = (x) => String(x).replace('-', '−');
  const par = (x) => (x < 0 ? '(' + sg(x) + ')' : String(x));

  return {
    id: 'remplacer-lettre',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Remplacer la lettre par un nombre',
    classe: '4e',
    univers: ['coiffure', 'commerce', 'maison-courses'],

    accroche: {
      texte: 'Clarisse, la tante de Rachel, coiffe au marché. Pour des tresses, elle demande 5 euros par rangée, plus 10 euros pour le lavage. ' +
        'Elle a écrit son tarif sur une pancarte : 5 fois la boîte mystère, plus 10. Une cliente veut 3 rangées. Combien va-t-elle payer ?',
      image: { dessin: 'chaine', etapes: ['Le tarif : 5x + 10', 'La cliente veut 3 rangées : x vaut 3', '5 × 3 + 10 = 25 euros'], description: 'Le tarif est 5x plus 10. La cliente veut 3 rangées, donc x vaut 3. Elle paie 5 fois 3 plus 10, soit 25 euros.' },
    },

    manipulation: {
      type: 'boite-mystere',
      a: 2,
      b: 3,
      cible: 13,
      consigne: 'Voici le calcul : deux fois la boîte, plus trois. Change le nombre caché dans la boîte, et regarde le résultat. Trouve le nombre qui donne treize, puis valide.',
    },

    decouverte: {
      texte: (c) => 'Quand on connaît le nombre caché, on le met à la place de la lettre. C’est ' + c.mot('remplacer') + '. Le résultat s’appelle ' + c.mot('valeur') + '. ' +
        'Attention : 5x veut dire 5 fois x, il faut remettre le signe fois. ' +
        'L’astuce : remets le signe fois, remplace, puis calcule, la multiplication d’abord.',
    },

    vocabulaire: {
      termes: {
        remplacer: { sesMots: 'ouvrir la boîte', officiel: 'remplacer x par ce nombre', lesDeux: 'ouvrir la boîte, ce que les matheux appellent remplacer x par ce nombre' },
        valeur: { sesMots: 'ce que donne le calcul', officiel: 'la valeur de l’expression', lesDeux: 'ce que donne le calcul, que les matheux appellent la valeur de l’expression' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ouvrir la boîte, et ce que donne le calcul. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : remplacer x par ce nombre, et calculer la valeur de l’expression.',
        'Tu connais les mots officiels : remplacer x par un nombre, et la valeur de l’expression.',
      ],
    },

    exercices: [
      {
        id: 'somme-simple',
        univers: 'coiffure',
        // [a, b, valeur de x]
        versions: [[5, 10, 3], [4, 7, 2], [3, 8, 5], [6, 1, 4], [2, 9, 7], [7, 5, 3]],
        genere(c) {
          const [a, b, x] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule ' + expr(a, b) + ' pour x = ' + x + '.',
            reponse: { type: 'nombre', valeur: a * x + b },
            aide: 'Calcule ' + a + ' × ' + x + ' + ' + b + '.',
            aideParlee: 'Remets le signe fois, remplace x, puis fais la multiplication d’abord.',
            correction: [a + ' × ' + x + ' + ' + b + ' = ' + a * x + ' + ' + b + ' = ' + (a * x + b) + '.'],
          };
        },
      },
      {
        id: 'avec-parenthese',
        univers: 'commerce',
        // [a, b, valeur de x]
        versions: [[3, 2, 4], [5, 1, 3], [2, 6, 5], [4, 3, 2], [6, 2, 3]],
        genere(c) {
          const [a, b, x] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule ' + a + '(x + ' + b + ') pour x = ' + x + '.',
            reponse: { type: 'nombre', valeur: a * (x + b) },
            aide: 'Calcule d’abord ' + x + ' + ' + b + ', puis multiplie par ' + a + '.',
            aideParlee: 'Calcule d’abord la parenthèse, puis multiplie.',
            correction: [x + ' + ' + b + ' = ' + (x + b) + '.', a + ' × ' + (x + b) + ' = ' + a * (x + b) + '.'],
          };
        },
      },
      {
        id: 'avec-carre',
        univers: 'maison-courses',
        // [valeur de x, b]
        versions: [[3, 1], [4, 5], [5, 2], [2, 7], [6, 3], [7, 1]],
        genere(c) {
          const [x, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule x² + ' + b + ' pour x = ' + x + '.',
            reponse: { type: 'nombre', valeur: x * x + b },
            aide: 'x² veut dire x × x : calcule ' + x + ' × ' + x + ', puis ajoute ' + b + '.',
            aideParlee: 'x au carré veut dire x fois x. Calcule-le d’abord, puis ajoute.',
            correction: [x + ' × ' + x + ' = ' + x * x + '.', x * x + ' + ' + b + ' = ' + (x * x + b) + '.'],
          };
        },
      },
      {
        id: 'nombre-negatif',
        univers: 'maison-courses',
        // [a, b, valeur de x, négative]
        versions: [[2, 7, -3], [3, 10, -2], [4, 9, -1], [5, 12, -2], [2, 1, -4]],
        genere(c) {
          const [a, b, x] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule ' + expr(a, b) + ' pour x = ' + sg(x) + '.',
            reponse: { type: 'nombre', valeur: a * x + b },
            aide: 'Calcule ' + a + ' × ' + par(x) + ' + ' + b + '. Attention au signe.',
            aideParlee: 'Remplace x, en gardant bien le signe moins, puis applique la règle des signes.',
            correction: [a + ' × ' + par(x) + ' = ' + sg(a * x) + '.', sg(a * x) + ' + ' + b + ' = ' + sg(a * x + b) + '.'],
          };
        },
      },
      {
        id: 'tarif',
        univers: 'coiffure',
        // [euros par rangée, lavage, rangées]
        versions: [[5, 10, 4], [6, 8, 3], [4, 12, 5], [5, 15, 6], [7, 10, 2]],
        genere(c) {
          const [a, b, x] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le tarif de Clarisse est ' + expr(a, b) + ' euros, où x est le nombre de rangées de tresses. Combien paie une cliente pour ' + x + ' rangées ?',
            reponse: { type: 'nombre', valeur: a * x + b },
            aide: 'Remplace x par ' + x + ' : ' + a + ' × ' + x + ' + ' + b + '.',
            aideParlee: 'Remplace x par le nombre de rangées, puis calcule.',
            correction: [a + ' × ' + x + ' + ' + b + ' = ' + (a * x + b) + ' euros.'],
          };
        },
      },
    ],

    defi: {
      // [euros par rangée, lavage, premier x, double]
      versions: [[5, 10, 3], [6, 8, 2], [4, 12, 5], [7, 10, 4]],
      genere(c) {
        const [a, b, x] = c.alea.choisir(this.versions);
        const p1 = a * x + b, p2 = a * 2 * x + b;
        return {
          enonce: 'Clarisse affiche son tarif pour des tresses : P = ' + expr(a, b) + ', où x est le nombre de rangées et P le prix en euros.',
          questions: [
            {
              texte: 'Question 1. Calcule le prix pour ' + x + ' rangées.',
              reponse: { type: 'nombre', valeur: p1 },
              aide: 'Remplace x par le nombre de rangées, puis calcule.',
              correction: [a + ' × ' + x + ' + ' + b + ' = ' + p1 + ' euros.'],
            },
            {
              texte: 'Question 2. Calcule le prix pour ' + 2 * x + ' rangées.',
              reponse: { type: 'nombre', valeur: p2 },
              aide: 'Remplace x par le nombre de rangées, puis calcule.',
              correction: [a + ' × ' + 2 * x + ' + ' + b + ' = ' + p2 + ' euros.'],
            },
            {
              texte: 'Question 3. Rachel dit : « Deux fois plus de rangées, c’est deux fois plus cher. » A-t-elle raison ? Justifie.',
              correction: ['Non : ' + 2 + ' × ' + p1 + ' = ' + 2 * p1 + ', et le prix est ' + p2 + ' euros.', 'Le lavage, ' + b + ' euros, ne compte qu’une fois.'],
              grille: ['As-tu comparé le double du premier prix au second prix ?', 'As-tu expliqué que le lavage ne double pas ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu remplaces, tu calcules, la multiplication d’abord : tu sais ouvrir toutes les boîtes.',
    carte: ['somme-simple', 'avec-parenthese', 'tarif'],
    papierDuSoir: { exercices: ['avec-carre', 'nombre-negatif'], defi: true },
    automatismes: [
      {
        id: 'remplacer-rapide',
        versions: [[2, 3], [3, 4], [5, 2], [4, 5]],
        genere(c) { const [a, x] = c.alea.choisir(this.versions); return { enonce: a + 'x + 1 pour x = ' + x + ' : combien ?', reponse: { type: 'nombre', valeur: a * x + 1 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, au seizième siècle, François Viète a proposé d’écrire des lettres à la place des nombres, connus ou inconnus.',
    prenoms: ['Clarisse', 'Rachel'],
  };
});
