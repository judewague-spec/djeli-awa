/* Notion 17 du bloc « Les nombres » : produits et quotients de puissances. La mémoire du téléphone. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { puissance: p, ecr } = O;
  const par = (x) => (x < 0 ? '(' + x + ')' : String(x));

  return {
    id: 'puissances-produits-quotients',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Produits et quotients de puissances',
    classe: '3e',
    univers: ['appareils', 'commerce'],

    accroche: {
      texte: 'Le téléphone d’Aminata range ses photos dans des dossiers. Chaque dossier contient 10² photos, et il y a 10³ dossiers. ' +
        'Combien de photos en tout ? Elle pourrait écrire tous les zéros… ou trouver une astuce avec les exposants.',
      image: { dessin: 'echelle', reperes: [{ nom: 'photos par dossier', puissance: 2 }, { nom: 'dossiers', puissance: 3 }, { nom: 'photos en tout', puissance: 5 }], description: 'Une règle des puissances de 10 : 10², 10³, et leur produit 10⁵.' },
    },

    manipulation: {
      image: { dessin: 'echelle', reperes: [{ nom: '10²', puissance: 2 }, { nom: '10³', puissance: 3 }, { nom: '10⁵', puissance: 5 }], description: 'Deux crans, plus trois crans, font cinq crans.' },
      etapes: [
        '10² × 10³ = (10 × 10) × (10 × 10 × 10) : on compte cinq 10 multipliés. Donc 10² × 10³ = 10⁵.',
        'Pour diviser : 10⁵ ÷ 10² = 10³, on enlève deux 10 sur les cinq.',
        'Une puissance de puissance : (10²)³ = 10² × 10² × 10² = 10⁶.',
        'Ça marche avec n’importe quelle base : 2³ × 2⁴ = 2⁷.',
      ],
    },

    decouverte: {
      texte: (c) => 'Voici ' + c.mot('regles') + '. Pour multiplier deux puissances de même base, on ajoute les exposants : aᵐ × aⁿ = aᵐ⁺ⁿ. ' +
        'Pour diviser, on soustrait : aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Pour une puissance de puissance, on multiplie : (aᵐ)ⁿ = aᵐˣⁿ. ' +
        'Attention : ça ne marche qu’avec la même base !',
    },

    vocabulaire: {
      termes: {
        regles: { sesMots: 'les astuces des exposants', officiel: 'les règles de calcul sur les puissances', lesDeux: 'les astuces des exposants, les règles de calcul sur les puissances' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce sont les astuces des exposants. On ajoute, on soustrait ou on multiplie les petits nombres en haut. ' +
          'Les matheux ont un nom pour elles : je te le dirai la prochaine fois.',
        'Les matheux parlent des règles de calcul sur les puissances : nos astuces des exposants. Elles sont au programme du brevet.',
        'Tu connais le nom officiel : les règles de calcul sur les puissances. Même base : on ajoute les exposants pour un produit, on les soustrait pour un quotient.',
      ],
    },

    exercices: [
      {
        id: 'produit',
        univers: 'appareils',
        versions: [[10, 2, 3], [10, 4, 5], [2, 3, 4], [3, 2, 5], [10, -2, 5], [5, 3, 3], [10, 6, -2], [7, 4, 2], [2, 5, 5], [10, -3, -4]],
        genere(c) {
          const [a, m, n] = c.alea.choisir(this.versions);
          return {
            enonce: p(a, m) + ' × ' + p(a, n) + ' s’écrit ' + a + ' puissance n. Quel est n ?',
            reponse: { type: 'nombre', valeur: m + n },
            aide: 'Même base : ajoute les exposants, ' + m + ' + ' + par(n) + '.',
            aideParlee: 'Même base : pour un produit, on ajoute les exposants.',
            correction: [p(a, m) + ' × ' + p(a, n) + ' = ' + p(a, m + n) + ', car ' + m + ' + ' + par(n) + ' = ' + ecr(m + n) + '.'],
          };
        },
      },
      {
        id: 'quotient',
        univers: 'commerce',
        versions: [[10, 5, 2], [10, 8, 3], [2, 7, 3], [3, 6, 4], [10, 2, 5], [5, 4, 1], [10, 3, -2], [2, 4, 6]],
        genere(c) {
          const [a, m, n] = c.alea.choisir(this.versions);
          return {
            enonce: p(a, m) + ' ÷ ' + p(a, n) + ' s’écrit ' + a + ' puissance n. Quel est n ?',
            reponse: { type: 'nombre', valeur: m - n },
            aide: 'Même base : soustrais les exposants, ' + m + ' − ' + par(n) + '.',
            aideParlee: 'Même base : pour un quotient, on soustrait les exposants.',
            correction: [p(a, m) + ' ÷ ' + p(a, n) + ' = ' + p(a, m - n) + ', car ' + m + ' − ' + par(n) + ' = ' + ecr(m - n) + '.'],
          };
        },
      },
      {
        id: 'puissance-de-puissance',
        univers: 'appareils',
        versions: [[10, 2, 3], [2, 3, 2], [10, 4, 2], [3, 2, 4], [10, -1, 3], [5, 2, 2], [10, 3, 3], [2, 5, 2]],
        genere(c) {
          const [a, m, n] = c.alea.choisir(this.versions);
          return {
            enonce: '(' + p(a, m) + ')' + p('', n).slice(0) + ' s’écrit ' + a + ' puissance n. Quel est n ?',
            reponse: { type: 'nombre', valeur: m * n },
            aide: 'Puissance de puissance : multiplie les exposants, ' + m + ' × ' + n + '.',
            aideParlee: 'Une puissance de puissance : on multiplie les exposants.',
            correction: ['(' + p(a, m) + ')' + p('', n) + ' = ' + p(a, m * n) + ', car ' + par(m) + ' × ' + n + ' = ' + ecr(m * n) + '.'],
          };
        },
      },
      {
        id: 'photos',
        univers: 'appareils',
        // [photos par dossier 10^a, dossiers 10^b]
        versions: [[2, 3], [3, 2], [2, 2], [1, 4], [3, 3], [2, 4]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un téléphone a ' + p(10, b) + ' dossiers de ' + p(10, a) + ' photos chacun. Le nombre total de photos s’écrit 10 puissance n. Quel est n ?',
            reponse: { type: 'nombre', valeur: a + b },
            aide: 'Calcule ' + p(10, b) + ' × ' + p(10, a) + ' en ajoutant les exposants.',
            aideParlee: 'Multiplie les deux puissances de 10 en ajoutant les exposants.',
            correction: [p(10, b) + ' × ' + p(10, a) + ' = ' + p(10, a + b) + '. Réponse : ' + (a + b) + '.'],
          };
        },
      },
      {
        id: 'vrai-faux',
        univers: 'commerce',
        // [a, m, n, exposant affirmé] : « aᵐ × aⁿ = a^affirmé »
        versions: [[2, 3, 4, 7], [2, 3, 4, 12], [10, 2, 5, 10], [10, 2, 5, 7], [3, 4, 2, 6], [3, 4, 2, 8], [5, 1, 6, 7], [5, 1, 6, 6]],
        genere(c) {
          const [a, m, n, e] = c.alea.choisir(this.versions);
          const vrai = m + n === e;
          const bonne = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Ibrahim écrit : ' + p(a, m) + ' × ' + p(a, n) + ' = ' + p(a, e) + '. Vrai ou faux ?',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Pour un produit, on ajoute les exposants : ' + m + ' + ' + n + '.',
            aideParlee: 'Pour un produit de même base, on ajoute les exposants : on ne les multiplie pas.',
            correction: [p(a, m) + ' × ' + p(a, n) + ' = ' + p(a, m + n) + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [m, n, k] : A = 10^m × 10^n ÷ 10^k
      versions: [[5, 3, 2], [4, 6, 3], [7, -2, 1], [3, 3, 4], [6, 2, 5], [8, -3, 2]],
      genere(c) {
        const [m, n, k] = c.alea.choisir(this.versions);
        const e = m + n - k;
        return {
          enonce: 'On donne A = ' + p(10, m) + ' × ' + p(10, n) + ' ÷ ' + p(10, k) + '.',
          questions: [
            {
              texte: 'Question 1. Écris ' + p(10, m) + ' × ' + p(10, n) + ' sous la forme 10ⁿ : quel est l’exposant ?',
              reponse: { type: 'nombre', valeur: m + n },
              aide: 'Ajoute les exposants.',
              correction: [p(10, m) + ' × ' + p(10, n) + ' = ' + p(10, m + n) + '. Réponse : ' + ecr(m + n) + '.'],
            },
            {
              texte: 'Question 2. Écris A sous la forme 10ⁿ : quel est l’exposant ?',
              reponse: { type: 'nombre', valeur: e },
              aide: 'Soustrais l’exposant du diviseur.',
              correction: [p(10, m + n) + ' ÷ ' + p(10, k) + ' = ' + p(10, e) + '. Réponse : ' + ecr(e) + '.'],
            },
            {
              texte: 'Question 3. Rachel écrit : « ' + p(10, 2) + ' × ' + p(10, 3) + ' = ' + p(10, 6) + '. » Explique son erreur.',
              correction: ['Rachel a multiplié les exposants au lieu de les ajouter.', p(10, 2) + ' × ' + p(10, 3) + ' = 100 × 1 000 = 100 000 = ' + p(10, 5) + '.'],
              grille: ['As-tu dit qu’il faut ajouter les exposants ?', 'As-tu trouvé ' + p(10, 5) + ' ?', 'As-tu vérifié avec les nombres écrits en entier ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Même base : on ajoute les exposants pour multiplier, on les soustrait pour diviser. Les zéros n’ont qu’à bien se tenir !',
    carte: ['produit', 'quotient', 'photos'],
    papierDuSoir: { exercices: ['quotient', 'puissance-de-puissance'], defi: true },
    automatismes: [
      {
        id: 'ajouter-exposants',
        versions: [[2, 3], [4, 1], [5, 5], [-2, 6], [3, -1]],
        genere(c) { const [m, n] = c.alea.choisir(this.versions); return { enonce: p(10, m) + ' × ' + p(10, n) + ' = 10 puissance ?', reponse: { type: 'nombre', valeur: m + n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? L’Écossais John Napier a inventé les logarithmes, qui remplacent les multiplications par des additions, comme nos exposants.',
    prenoms: ['Aminata', 'Ibrahim', 'Rachel'],
  };
});
