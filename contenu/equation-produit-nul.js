/* Notion 13 du bloc « Le calcul avec des lettres » : équation produit nul. La caisse de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  return {
    id: 'equation-produit-nul',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Équation produit nul',
    classe: '3e',
    univers: ['commerce', 'maison-courses', 'dehors'],

    accroche: {
      texte: 'Rachel joue avec sa caisse enregistreuse. Quand elle multiplie deux nombres, le résultat affiche zéro. Que peut-elle dire de ces deux nombres ? ' +
        'Elle essaie : 5 fois 3, jamais zéro. 5 fois 0, zéro ! Pour que le produit soit nul, il faut qu’au moins un des deux nombres soit zéro.',
      image: { dessin: 'chaine', etapes: ['A × B = 0', 'Soit A = 0', 'Soit B = 0'], description: 'Si A fois B égale zéro, alors soit A égale zéro, soit B égale zéro.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['(x − 3)(x + 5) = 0', 'x − 3 = 0 ou x + 5 = 0', 'x = 3 ou x = −5'], description: 'x moins 3, fois x plus 5, égale zéro. Donc x moins 3 égale zéro, ou x plus 5 égale zéro. Donc x égale 3, ou x égale moins 5.' },
      etapes: [
        'Si un produit de deux nombres vaut 0, alors au moins l’un des deux vaut 0.',
        'Dans (x − 3)(x + 5) = 0, les deux nombres sont les parenthèses. On écrit : x − 3 = 0 ou x + 5 = 0.',
        'On résout chaque petite équation : x = 3 ou x = −5. Il y a deux solutions.',
        'Parfois, il faut d’abord factoriser : x² − 4x = 0 s’écrit x(x − 4) = 0. Donc x = 0 ou x = 4.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un produit égal à zéro, c’est ' + c.mot('nul') + '. Il faut que l’un des facteurs soit nul : on sépare en deux petites équations. ' +
        'Cette équation a donc souvent deux solutions. ' +
        'L’astuce : le mot « ou ». Une parenthèse égale zéro, ou l’autre. Et n’oublie pas ' + c.mot('facteurs') + ' : pense à les faire apparaître en factorisant.',
    },

    vocabulaire: {
      termes: {
        nul: { sesMots: 'une multiplication qui donne zéro', officiel: 'une équation produit nul', lesDeux: 'une multiplication qui donne zéro, que les matheux appellent une équation produit nul' },
        facteurs: { sesMots: 'les nombres multipliés', officiel: 'les facteurs', lesDeux: 'les nombres multipliés, que les matheux appellent les facteurs' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une multiplication qui donne zéro, et les nombres multipliés. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une équation produit nul, et les facteurs du produit.',
        'Tu connais les mots officiels : une équation produit nul, les facteurs, et ses deux solutions.',
      ],
    },

    exercices: [
      {
        id: 'solution-positive',
        univers: 'commerce',
        // [a, b] : (x − a)(x + b) = 0
        versions: [[3, 5], [2, 7], [4, 1], [6, 2], [9, 4], [1, 8]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’équation (x − ' + a + ')(x + ' + b + ') = 0 a deux solutions. Quelle est la solution positive ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Écris x − ' + a + ' = 0.',
            aideParlee: 'Une des deux parenthèses vaut zéro. Prends celle qui donne un nombre positif.',
            correction: ['x − ' + a + ' = 0 donne x = ' + a + '.'],
          };
        },
      },
      {
        id: 'solution-negative',
        univers: 'maison-courses',
        // [a, b]
        versions: [[3, 5], [2, 7], [4, 1], [6, 2], [9, 4], [1, 8]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’équation (x − ' + a + ')(x + ' + b + ') = 0 a deux solutions. Quelle est la solution négative ?',
            reponse: { type: 'nombre', valeur: -b },
            aide: 'Écris x + ' + b + ' = 0.',
            aideParlee: 'Une des deux parenthèses vaut zéro. Prends celle qui donne un nombre négatif.',
            correction: ['x + ' + b + ' = 0 donne x = −' + b + '.'],
          };
        },
      },
      {
        id: 'avec-factorisation',
        univers: 'dehors',
        versions: [4, 3, 7, 5, 9, 2],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          return {
            enonce: 'Factorise x² − ' + a + 'x, puis résous x² − ' + a + 'x = 0. L’une des solutions est 0. Quelle est l’autre ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'x² − ' + a + 'x = x(x − ' + a + ').',
            aideParlee: 'Mets x en facteur, puis écris que chaque facteur peut valoir zéro.',
            correction: ['x(x − ' + a + ') = 0.', 'x = 0 ou x = ' + a + '.'],
          };
        },
      },
      {
        id: 'bonne-etape',
        univers: 'commerce',
        versions: [[3, 5], [2, 7], [6, 1], [4, 9]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = 'x − ' + a + ' = 0 ou x + ' + b + ' = 0';
          return {
            enonce: 'Quelle étape suit (x − ' + a + ')(x + ' + b + ') = 0 ?',
            reponse: O.choix(c.alea, bonne, ['x − ' + a + ' = 0 et x + ' + b + ' = 0 en même temps', 'x² = ' + a * b, 'x − ' + a + ' = x + ' + b]),
            aide: 'Le produit est nul si l’un des facteurs est nul.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'somme-des-solutions',
        univers: 'maison-courses',
        // [a, b] : (x − a)(x − b) = 0
        versions: [[2, 5], [3, 4], [1, 6], [7, 2], [8, 3]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Résous (x − ' + a + ')(x − ' + b + ') = 0. Quelle est la somme des deux solutions ?',
            reponse: { type: 'nombre', valeur: a + b },
            aide: 'Les solutions sont ' + a + ' et ' + b + '.',
            aideParlee: 'Trouve les deux solutions, puis ajoute-les.',
            correction: ['x = ' + a + ' ou x = ' + b + '.', a + ' + ' + b + ' = ' + (a + b) + '.'],
          };
        },
      },
    ],

    defi: {
      // [a, longueur du côté] : l'aire d'un rectangle x(x − a) vaut 0 seulement si…
      versions: [[4, 7], [3, 5], [6, 9], [2, 4]],
      genere(c) {
        const [a, x] = c.alea.choisir(this.versions);
        return {
          enonce: 'Clarisse découpe un tissu rectangulaire : sa longueur est x cm et sa largeur est x − ' + a + ' cm. Son aire s’écrit x(x − ' + a + ').',
          questions: [
            {
              texte: 'Question 1. Quelle est l’aire du tissu pour x = ' + x + ', en centimètres carrés ?',
              reponse: { type: 'nombre', valeur: x * (x - a) },
              aide: 'Remplace x par le nombre donné.',
              correction: [x + ' × (' + x + ' − ' + a + ') = ' + x + ' × ' + (x - a) + ' = ' + x * (x - a) + '.'],
            },
            {
              texte: 'Question 2. Résous x(x − ' + a + ') = 0. L’une des solutions est 0. Quelle est l’autre ?',
              reponse: { type: 'nombre', valeur: a },
              aide: 'Un des deux facteurs vaut zéro.',
              correction: ['x = 0 ou x − ' + a + ' = 0, donc x = ' + a + '.'],
            },
            {
              texte: 'Question 3. Pour ces deux valeurs, que se passe-t-il pour le tissu ? Explique.',
              correction: ['Avec x = 0, la longueur est nulle, et la largeur serait négative : ce n’est pas un vrai tissu.', 'Avec x = ' + a + ', la largeur est nulle.', 'Dans les deux cas, il n’y a plus de rectangle : le calcul donne 0.'],
              grille: ['As-tu parlé de la longueur et de la largeur ?', 'As-tu dit que l’aire vaut zéro ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une parenthèse égale zéro, ou l’autre : deux solutions, trouvées en un rien de temps.',
    carte: ['solution-positive', 'solution-negative', 'bonne-etape'],
    papierDuSoir: { exercices: ['avec-factorisation', 'somme-des-solutions'], defi: true },
    automatismes: [
      {
        id: 'fois-zero',
        versions: [7, 12, 25, 100],
        genere(c) { const a = c.alea.choisir(this.versions); return { enonce: a + ' × 0 = ?', reponse: { type: 'nombre', valeur: 0 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Inde, au septième siècle, Brahmagupta a écrit les règles du zéro : un nombre multiplié par zéro donne zéro.',
    prenoms: ['Rachel', 'Clarisse'],
  };
});
