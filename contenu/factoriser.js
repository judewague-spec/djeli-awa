/* Notion 6 du bloc « Le calcul avec des lettres » : factoriser par un facteur commun. Les lots de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;

  return {
    id: 'factoriser',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Factoriser par un facteur commun',
    classe: '4e',
    univers: ['commerce', 'maison-courses', 'cuisine-restaurant'],

    accroche: {
      texte: 'Moussa prépare des lots. Dans chaque lot, un savon à x euros et une éponge à 2 euros. Pour 3 lots, il a écrit 3x plus 6 sur son carnet. ' +
        'Rachel lui dit : tu peux aussi écrire 3 lots de x plus 2. C’est le chemin inverse de développer : on retrouve le 3 caché dans chaque nombre.',
      image: { dessin: 'aires', lignes: ['3'], colonnes: ['x', '2'], cases: [['3x', '6']], description: 'Un rectangle de largeur 3, coupé en deux : une partie d’aire 3x, et une partie d’aire 6. Sa longueur totale est x plus 2.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['3x + 6', 'Chaque terme contient 3 : 3 × x + 3 × 2', 'On met le 3 devant : 3(x + 2)'], description: 'On part de 3x plus 6. Chaque terme contient 3 : 3 fois x plus 3 fois 2. On met le 3 devant : 3 fois la parenthèse x plus 2.' },
      etapes: [
        'Dans 3x + 6, on cherche un nombre qui se trouve dans les deux termes : 3x = 3 × x et 6 = 3 × 2.',
        'On écrit ce nombre devant, et ce qui reste dans la parenthèse : 3(x + 2).',
        'Pour vérifier, on développe : 3(x + 2) = 3x + 6.',
        'La lettre peut aussi être commune : x² + 5x = x × x + 5 × x = x(x + 5).',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le nombre ou la lettre présent dans tous les termes. C’est ' + c.mot('commun') + '. On le met devant une parenthèse : c’est ' + c.mot('factoriser') + '. ' +
        'On passe d’une somme à un produit, le chemin inverse de développer. ' +
        'L’astuce : pour vérifier, développe. Tu dois retomber sur le calcul de départ.',
    },

    vocabulaire: {
      termes: {
        commun: { sesMots: 'ce qui se répète partout', officiel: 'le facteur commun', lesDeux: 'ce qui se répète partout, que les matheux appellent le facteur commun' },
        factoriser: { sesMots: 'faire des lots', officiel: 'factoriser', lesDeux: 'faire des lots, ce que les matheux appellent factoriser' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce qui se répète partout, et faire des lots. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : le facteur commun, et factoriser, pour passer d’une somme à un produit.',
        'Tu connais les mots officiels : le facteur commun, factoriser. C’est le contraire de développer.',
      ],
    },

    exercices: [
      {
        id: 'quel-facteur',
        univers: 'commerce',
        // [k, b] : kx + kb, avec b et 1 sans autre diviseur commun utile
        versions: [[3, 2], [5, 3], [4, 1], [7, 2], [6, 1], [9, 2]],
        genere(c) {
          const [k, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans ' + expr(k, k * b) + ', quel est le plus grand nombre qui se trouve dans les deux termes ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Cherche le plus grand nombre qui divise ' + k + ' et ' + k * b + '.',
            aideParlee: 'Cherche le plus grand nombre qui divise les deux nombres.',
            correction: [expr(k, k * b) + ' = ' + k + ' × x + ' + k + ' × ' + b + '.', 'Réponse : ' + k + '.'],
          };
        },
      },
      {
        id: 'factoriser-plus',
        univers: 'maison-courses',
        // [k, b]
        versions: [[3, 2], [4, 5], [2, 7], [5, 3], [6, 4], [7, 2]],
        genere(c) {
          const [k, b] = c.alea.choisir(this.versions);
          const bonne = k + '(x + ' + b + ')';
          return {
            enonce: 'Factorise ' + expr(k, k * b) + '.',
            reponse: O.choix(c.alea, bonne, [k + '(x + ' + k * b + ')', b + '(x + ' + k + ')', 'x(' + k + ' + ' + k * b + ')']),
            aide: 'Mets ' + k + ' devant, et écris dans la parenthèse ce qui reste.',
            aideParlee: 'Mets le nombre commun devant, et écris dans la parenthèse ce qui reste.',
            correction: [expr(k, k * b) + ' = ' + k + ' × x + ' + k + ' × ' + b + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'factoriser-x',
        univers: 'cuisine-restaurant',
        versions: [3, 5, 2, 7, 4, 9],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const bonne = 'x(x + ' + a + ')';
          return {
            enonce: 'Factorise x² + ' + a + 'x.',
            reponse: O.choix(c.alea, bonne, ['x² (1 + ' + a + ')', a + '(x² + x)', 'x(x + ' + a + 'x)']),
            aide: 'Ici, c’est la lettre x qui se trouve dans les deux termes.',
            correction: ['x² + ' + a + 'x = x × x + ' + a + ' × x.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'calcul-malin',
        univers: 'commerce',
        // [k, a, b] : k × a + k × b
        versions: [[13, 7, 3], [25, 6, 4], [17, 8, 2], [9, 15, 5], [12, 55, 45], [35, 3, 7]],
        genere(c) {
          const [k, a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule de tête : ' + k + ' × ' + a + ' + ' + k + ' × ' + b + '.',
            reponse: { type: 'nombre', valeur: k * (a + b) },
            aide: 'Factorise par ' + k + ' : ' + k + ' × (' + a + ' + ' + b + ').',
            aideParlee: 'Mets le nombre commun devant : la parenthèse donne un nombre rond.',
            correction: [k + ' × (' + a + ' + ' + b + ') = ' + k + ' × ' + (a + b) + ' = ' + k * (a + b) + '.'],
          };
        },
      },
      O.qcm('developper-ou-factoriser', 'maison-courses',
        [['3(x + 2) devient 3x + 6.', 'On a développé'], ['5x + 10 devient 5(x + 2).', 'On a factorisé'], ['x² + 4x devient x(x + 4).', 'On a factorisé'], ['2(x + 7) devient 2x + 14.', 'On a développé']],
        (x) => x + ' Qu’a-t-on fait ?', ['On a développé', 'On a factorisé'],
        'Du produit à la somme : développer. De la somme au produit : factoriser.'),
    ],

    defi: {
      // [k, b, nombre de lots vendu x]
      versions: [[3, 2, 4], [5, 3, 6], [4, 5, 2], [6, 1, 5]],
      genere(c) {
        const [k, b, x] = c.alea.choisir(this.versions);
        const bonne = k + '(x + ' + b + ')';
        return {
          enonce: 'Moussa vend ' + k + ' lots identiques. Chaque lot contient un savon à x euros et une éponge à ' + O.nb(b, 'euro') + '. Sur son carnet, il a écrit la recette : ' + expr(k, k * b) + '.',
          questions: [
            {
              texte: 'Question 1. Factorise ' + expr(k, k * b) + '.',
              reponse: O.choix(c.alea, bonne, [b + '(x + ' + k + ')', k + '(x + ' + k * b + ')']),
              aide: 'Cherche le nombre présent dans les deux termes.',
              correction: ['Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 2. Pour x = ' + x + ', calcule la recette.',
              reponse: { type: 'nombre', valeur: k * (x + b) },
              aide: 'Remplace x par le nombre donné.',
              correction: [k + ' × (' + x + ' + ' + b + ') = ' + k * (x + b) + ' euros.'],
            },
            {
              texte: 'Question 3. Que représente x + ' + b + ' dans cette histoire ? Et que représente le ' + k + ' devant la parenthèse ?',
              correction: ['x + ' + b + ' est le prix d’un lot : un savon et une éponge.', k + ' est le nombre de lots vendus.'],
              grille: ['As-tu dit que la parenthèse est le prix d’un lot ?', 'As-tu dit que le nombre devant est le nombre de lots ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu retrouves ce qui se répète, tu le mets devant : tu sais factoriser, et vérifier.',
    carte: ['quel-facteur', 'factoriser-plus', 'developper-ou-factoriser'],
    papierDuSoir: { exercices: ['factoriser-x', 'calcul-malin'], defi: true },
    automatismes: [
      {
        id: 'facteur-rapide',
        versions: [[3, 2], [5, 2], [4, 3], [7, 2]],
        genere(c) { const [k, b] = c.alea.choisir(this.versions); return { enonce: k + ' × ' + b + ' + ' + k + ' × ' + (10 - b) + ' = ?', reponse: { type: 'nombre', valeur: k * 10 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, on a étudié les tontines des Bamiléké. Chacun verse sa part dans une caisse commune, et chacun la reçoit à son tour.',
    prenoms: ['Moussa', 'Rachel'],
  };
});
