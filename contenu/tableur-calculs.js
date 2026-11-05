/* Notion 13 du bloc de technologie « Le numérique et l'intelligence artificielle » : le tableur, les calculs. Les ventes de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'tableur-calculs',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Le tableur : les calculs',
    classe: 'cycle 4',
    univers: ['commerce', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : tableur, calculs et formules.',

    accroche: {
      texte: 'Laure a ses ventes de la semaine dans un cahier. Le soir, elle refait tous les calculs à la main. Si un prix change, elle recommence tout ! ' +
        'Sur une grande grille à l’écran, elle écrit le calcul une seule fois. Et si un prix change, le résultat se met à jour tout seul.',
      image: { dessin: 'tableur', colonnes: ['Produit', 'Prix', 'Quantité', 'Total'], lignes: [['Beignets', 2, 10, 20], ['Jus', 3, 5, 15]], description: 'Une grille de quatre colonnes. Ligne 2 : beignets, prix deux, quantité dix, total vingt. Ligne 3 : jus, prix trois, quantité cinq, total quinze.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Colonne A', 'Colonne B'], lignes: [['Case A2', 'Case B2'], ['Case A3', 'Case B3']], description: 'Une grille : la case de la colonne A et de la ligne 2 s’appelle A2 ; à sa droite, B2 ; en dessous, A3 et B3.' },
      etapes: [
        'Cette grande grille a des colonnes, avec des lettres, et des lignes, avec des numéros.',
        'Chaque case a son nom : la lettre, puis le numéro. Par exemple, B2.',
        'Pour calculer, on commence par le signe égal. B2 fois C2 s’écrit : égal, B2, étoile, C2.',
        'Pour additionner beaucoup de cases, on écrit : égal, SOMME, et la plage entre parenthèses, comme D2 à D9. Pour une moyenne : égal, MOYENNE, et la plage.',
        'On peut recopier le calcul vers le bas : la grille adapte toute seule les noms des cases.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans ' + c.mot('tableur') + ', chaque case a un nom, comme B2. Ce nom désigne ' + c.mot('cellule') + '. ' +
        'Un calcul commence toujours par le signe égal : c’est ' + c.mot('formule') + '. ' +
        'L’astuce : écris le nom des cases plutôt que les nombres. Ainsi, tout se met à jour.',
    },

    vocabulaire: {
      termes: {
        tableur: { sesMots: 'la grande grille', officiel: 'un tableur', lesDeux: 'la grande grille, que l’on appelle un tableur' },
        cellule: { sesMots: 'une case', officiel: 'une cellule', lesDeux: 'une case, que l’on appelle une cellule' },
        formule: { sesMots: 'un calcul de case', officiel: 'une formule', lesDeux: 'un calcul de case, que l’on appelle une formule' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la grande grille, la case, et le calcul de case. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un tableur, pour la grande grille. Une cellule, pour la case. Une formule, pour le calcul de case.',
        'Tu connais les mots officiels : le tableur, la cellule, la formule et la plage de cellules.',
      ],
    },

    exercices: [
      Q('nom-de-la-case', 'commerce',
        [['La case de la colonne B et de la ligne 3', 'B3'], ['La case de la colonne C et de la ligne 2', 'C2'], ['La case de la colonne A et de la ligne 4', 'A4'], ['La case de la colonne D et de la ligne 1', 'D1']],
        (x) => x + ' s’appelle :', ['B3', 'C2', 'A4', 'D1'],
        'D’abord la lettre de la colonne, puis le numéro de la ligne.',
        'Le nom d’une cellule s’écrit avec la lettre de la colonne, puis le numéro de la ligne.'),
      Q('bonne-formule', 'commerce',
        [['Pour multiplier le prix en B2 par la quantité en C2', '=B2*C2'], ['Pour additionner les cases de D2 à D9', '=SOMME(D2:D9)'], ['Pour ajouter B2 et C2', '=B2+C2']],
        (x) => x + ', quelle formule écrire ?', ['=B2*C2', '=SOMME(D2:D9)', '=B2+C2'],
        'Une formule commence par le signe égal. La multiplication s’écrit avec une étoile.',
        'Le signe égal ouvre la formule. L’étoile multiplie, le signe plus ajoute, et SOMME additionne une plage.'),
      {
        id: 'resultat-de-la-formule',
        univers: 'commerce',
        // [B2, C2]
        versions: [[2, 10], [3, 5], [4, 6], [5, 7], [8, 3], [6, 9]],
        genere(c) {
          const [b, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'La cellule B2 contient ' + b + ', et la cellule C2 contient ' + k + '. Quelle valeur affiche la formule =B2*C2 ?',
            reponse: { type: 'nombre', valeur: b * k },
            aide: 'Calcule ' + b + ' × ' + k + '.',
            aideParlee: 'L’étoile veut dire multiplier. Multiplie le contenu des deux cellules.',
            correction: [b + ' × ' + k + ' = ' + b * k + '.'],
          };
        },
      },
      {
        id: 'somme-de-la-plage',
        univers: 'maison-courses',
        // [D2, D3, D4]
        versions: [[20, 15, 10], [12, 8, 30], [25, 25, 40], [9, 16, 5], [50, 30, 20], [14, 6, 10]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'D2 contient ' + a + ', D3 contient ' + b + ', et D4 contient ' + d + '. Quelle valeur affiche la formule =SOMME(D2:D4) ?',
            reponse: { type: 'nombre', valeur: a + b + d },
            aide: 'Additionne les trois cases.',
            correction: [a + ' + ' + b + ' + ' + d + ' = ' + (a + b + d) + '.'],
          };
        },
      },
      {
        id: 'moyenne-de-la-plage',
        univers: 'commerce',
        // [B2, B3, B4]
        versions: [[10, 20, 30], [12, 14, 16], [5, 10, 15], [20, 30, 40], [8, 10, 12], [30, 30, 60]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const m = (a + b + d) / 3;
          return {
            enonce: 'B2 contient ' + a + ', B3 contient ' + b + ', et B4 contient ' + d + '. Quelle valeur affiche la formule =MOYENNE(B2:B4) ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Additionne les trois valeurs, puis divise par 3.',
            aideParlee: 'Additionne les trois valeurs, puis divise par trois.',
            correction: [a + ' + ' + b + ' + ' + d + ' = ' + (a + b + d) + '.', (a + b + d) + ' ÷ 3 = ' + m + '.'],
          };
        },
      },
    ],

    defi: {
      // [prix des beignets, quantité, prix du jus, quantité]
      versions: [[2, 10, 3, 5], [1, 20, 2, 15], [3, 8, 4, 5], [2, 25, 5, 6]],
      genere(c) {
        const [p, q, r, s] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : le tableur de Laure a les colonnes A (Produit), B (Prix), C (Quantité) et D (Total). Ligne 2 : beignets, ' + p + ' €, quantité ' + q + '. Ligne 3 : jus, ' + r + ' €, quantité ' + s + '.',
          image: { dessin: 'tableur', colonnes: ['Produit', 'Prix', 'Quantité', 'Total'], lignes: [['Beignets', p, q, '?'], ['Jus', r, s, '?']], description: 'Un tableur : la colonne Total est à calculer pour les beignets et pour le jus.' },
          questions: [
            {
              texte: 'Question 1. Quelle formule écrire en D2, pour le total des beignets ?',
              reponse: O.choix(c.alea, '=B2*C2', ['=B2*C2', '=B2+C2', 'B2 fois C2']),
              aide: 'Le total, c’est le prix multiplié par la quantité. Une formule commence par égal.',
              correction: ['Le signe égal ouvre la formule, l’étoile multiplie.', 'Réponse : =B2*C2.'],
            },
            {
              texte: 'Question 2. Quelle valeur affiche la cellule D2 ?',
              reponse: { type: 'nombre', valeur: p * q },
              aide: 'Multiplie le prix par la quantité.',
              correction: [p + ' × ' + q + ' = ' + p * q + '.'],
            },
            {
              texte: 'Question 3. Quelle valeur affiche =SOMME(D2:D3), le total des deux lignes ?',
              reponse: { type: 'nombre', valeur: p * q + r * s },
              aide: 'Calcule le total de chaque ligne, puis additionne.',
              correction: [r + ' × ' + s + ' = ' + r * s + '.', p * q + ' + ' + r * s + ' = ' + (p * q + r * s) + '.'],
            },
            {
              texte: 'Question 4. Le prix des beignets change. Explique pourquoi Laure n’a rien à recalculer.',
              correction: ['Les formules utilisent le nom des cellules, pas les nombres eux-mêmes.', 'Quand une cellule change, le tableur recalcule tout seul les formules qui l’utilisent.'],
              grille: ['As-tu dit que la formule utilise le nom des cellules ?', 'As-tu dit que le tableur recalcule tout seul ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une case, une formule, et le tableur fait les comptes à ta place.',
    carte: ['nom-de-la-case', 'bonne-formule', 'resultat-de-la-formule'],
    papierDuSoir: { exercices: ['somme-de-la-plage', 'moyenne-de-la-plage'], defi: true },
    automatismes: [
      {
        id: 'formule-rapide',
        versions: [[2, 6], [3, 4], [5, 5], [4, 7]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'B2 vaut ' + a + ', C2 vaut ' + b + '. =B2*C2 affiche :', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, en 1979, Dan Bricklin, étudiant à Harvard, et Bob Frankston créent le tableur VisiCalc.',
    prenoms: ['Laure'],
  };
});
