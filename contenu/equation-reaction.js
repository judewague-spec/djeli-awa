/* Notion 11 du bloc physique-chimie « La matière » : l'équation d'une réaction. La gazinière d'Aminata. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const INDICES = '₀₁₂₃₄₅₆₇₈₉';
  const f = (formule) => formule.replace(/\d/g, (x) => INDICES[x]);
  function comptes(formule) {
    const c = {};
    for (const [, e, n] of formule.matchAll(/([A-Z][a-z]?)(\d*)/g)) c[e] = (c[e] || 0) + (n ? Number(n) : 1);
    return c;
  }
  // Équations ajustées : [[coefficient, formule]…] pour les réactifs, puis pour les produits.
  const EQUATIONS = [
    [[[1, 'C'], [1, 'O2']], [[1, 'CO2']]],
    [[[2, 'H2'], [1, 'O2']], [[2, 'H2O']]],
    [[[1, 'CH4'], [2, 'O2']], [[1, 'CO2'], [2, 'H2O']]],
    [[[2, 'C'], [1, 'O2']], [[2, 'CO']]],
    [[[1, 'N2'], [3, 'H2']], [[2, 'NH3']]],
    [[[1, 'C3H8'], [5, 'O2']], [[3, 'CO2'], [4, 'H2O']]],
  ];
  const cote = (l, cache) => l.map(([k, m], i) => (i === cache ? '?' : k === 1 ? '' : k + ' ') + (i === cache ? ' ' : '') + f(m)).join(' + ');
  const ecrire = (eq, cache) => cote(eq[0], cache !== undefined && cache < eq[0].length ? cache : -1) + ' → ' + cote(eq[1], cache !== undefined && cache >= eq[0].length ? cache - eq[0].length : -1);
  /** Atomes d'un élément d'un côté de l'équation. */
  const atomes = (l, e) => l.reduce((s, [k, m]) => s + k * (comptes(m)[e] || 0), 0);
  const NOMS = { C: 'carbone', H: 'hydrogène', O: 'oxygène', N: 'azote' };
  const de = (e) => (/^[aeiouh]/.test(NOMS[e]) ? 'd’' : 'de ') + NOMS[e];

  return {
    id: 'equation-reaction',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'L’équation d’une réaction',
    classe: '4e',
    univers: ['cuisine-restaurant', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : équation de réaction.',

    accroche: {
      texte: 'Aminata allume la gazinière. Le gaz de ville, le méthane, brûle avec le dioxygène de l’air, et donne du dioxyde de carbone et de l’eau. ' +
        'Comment écrire cette transformation comme une recette exacte, avec le bon nombre de chaque molécule ?',
      image: { dessin: 'molecule', formule: 'CH4', description: 'Une molécule de méthane : un atome C et quatre atomes H.' },
    },

    manipulation: {
      image: { dessin: 'molecule', formule: 'H2O', description: 'Une molécule d’eau : deux atomes H et un atome O.' },
      etapes: [
        'On écrit les formules : CH₄ + O₂ → CO₂ + H₂O. Les réactifs à gauche, les produits à droite.',
        'Compte les atomes de chaque côté. À gauche, 4 H ; à droite, seulement 2 H. Il faut 2 molécules d’eau : CH₄ + O₂ → CO₂ + 2 H₂O.',
        'Maintenant, à droite, il y a 2 + 2 = 4 atomes O. À gauche, 2 seulement : il faut 2 molécules de dioxygène.',
        'L’équation ajustée : CH₄ + 2 O₂ → CO₂ + 2 H₂O. Chaque sorte d’atome est en même nombre des deux côtés.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pendant une transformation chimique, les atomes ne disparaissent pas : ils changent de partenaires. ' +
        'Il y a donc autant d’atomes de chaque sorte avant et après. Pour l’écrire, on place des nombres devant les formules : ce sont ' + c.mot('coefficients') + '. ' +
        'L’astuce : on ne change jamais une formule, on change seulement le nombre de molécules.',
    },

    vocabulaire: {
      termes: {
        coefficients: { sesMots: 'les nombres de molécules', officiel: 'les coefficients', lesDeux: 'les nombres de molécules, que les scientifiques appellent les coefficients' },
      },
      textes: [
        'Pour l’instant, garde tes mots : c’est la recette écrite, avec les nombres de molécules devant les formules. ' +
          'Les scientifiques ont des mots pour ça : je te les dirai la prochaine fois.',
        'Les scientifiques disent : l’équation de la réaction, et les nombres devant les formules sont les coefficients. Une équation est ajustée quand les atomes sont en même nombre des deux côtés.',
        'Tu connais les mots officiels : l’équation de réaction, ajustée avec des coefficients, traduit la conservation des atomes.',
      ],
    },

    exercices: [
      {
        id: 'coefficient-manquant',
        univers: 'cuisine-restaurant',
        // [numéro de l'équation, place du coefficient caché]
        versions: [[1, 0], [1, 2], [2, 1], [2, 3], [3, 0], [3, 2], [4, 1], [5, 1], [5, 3]],
        genere(c) {
          const [n, cache] = c.alea.choisir(this.versions);
          const eq = EQUATIONS[n];
          const tous = eq[0].concat(eq[1]);
          return {
            enonce: 'Complète l’équation ajustée : ' + ecrire(eq, cache) + '. Quel nombre remplace le point d’interrogation ?',
            reponse: { type: 'nombre', valeur: tous[cache][0] },
            aide: 'Compte chaque sorte d’atome des deux côtés de la flèche.',
            correction: ['L’équation ajustée : ' + ecrire(eq) + '.', 'Réponse : ' + tous[cache][0] + '.'],
          };
        },
      },
      {
        id: 'atomes-a-gauche',
        univers: 'maison-courses',
        versions: [[2, 'O'], [2, 'H'], [1, 'H'], [5, 'O'], [5, 'H'], [4, 'H'], [3, 'O']],
        genere(c) {
          const [n, e] = c.alea.choisir(this.versions);
          const eq = EQUATIONS[n];
          const a = atomes(eq[0], e);
          return {
            enonce: 'Dans l’équation ' + ecrire(eq) + ', combien d’atomes ' + de(e) + ' y a-t-il du côté des réactifs ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Pour chaque molécule : coefficient fois le petit chiffre.',
            correction: [eq[0].filter(([, m]) => comptes(m)[e]).map(([k, m]) => k + ' × ' + comptes(m)[e]).join(' + ') + ' = ' + a + '.', 'Il y en a autant du côté des produits : ' + atomes(eq[1], e) + '.'],
          };
        },
      },
      {
        id: 'ajustee-ou-pas',
        univers: 'cuisine-restaurant',
        versions: [['C + O₂ → CO₂', 'Oui'], ['H₂ + O₂ → H₂O', 'Non'], ['CH₄ + 2 O₂ → CO₂ + 2 H₂O', 'Oui'], ['CH₄ + O₂ → CO₂ + H₂O', 'Non'], ['2 H₂ + O₂ → 2 H₂O', 'Oui'], ['C + O₂ → CO', 'Non']],
        genere(c) {
          const [eq, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’équation « ' + eq + ' » est-elle ajustée ?',
            reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
            aide: 'Compte les atomes de chaque sorte, à gauche puis à droite.',
            correction: [bonne === 'Oui' ? 'Chaque sorte d’atome est en même nombre des deux côtés.' : 'Une sorte d’atome n’est pas en même nombre des deux côtés.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'molecules-d-eau',
        univers: 'maison-courses',
        versions: [1, 2, 3, 5, 10, 4, 6, 8],
        genere(c) {
          const k = c.alea.choisir(this.versions);
          return {
            enonce: 'L’équation de la combustion du méthane est CH₄ + 2 O₂ → CO₂ + 2 H₂O. Si ' + k + ' molécule' + (k > 1 ? 's' : '') + ' de méthane ' + (k > 1 ? 'brûlent' : 'brûle') + ' complètement, combien de molécules d’eau se forment ?',
            reponse: { type: 'nombre', valeur: 2 * k },
            aide: 'Pour une molécule de méthane, il se forme 2 molécules d’eau.',
            correction: ['Une molécule de méthane donne 2 molécules d’eau.', k + ' × 2 = ' + 2 * k + ' molécules d’eau.'],
          };
        },
      },
      {
        id: 'quels-reactifs',
        univers: 'cuisine-restaurant',
        versions: [0, 1, 2, 5],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const eq = EQUATIONS[n];
          const bonne = eq[0].map(([, m]) => f(m)).join(' et ');
          const faux = eq[1].map(([, m]) => f(m)).join(' et ');
          return {
            enonce: 'Dans l’équation ' + ecrire(eq) + ', quels sont les réactifs ?',
            reponse: O.choix(c.alea, bonne, [faux]),
            aide: 'Les réactifs sont avant la flèche.',
            correction: ['Avant la flèche : ' + bonne + '. Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      versions: [2, 3, 4, 5],
      genere(c) {
        const k = c.alea.choisir(this.versions);
        return {
          enonce: 'Le propane du réchaud de Laure brûle dans le dioxygène et donne du dioxyde de carbone et de l’eau. L’équation non ajustée est : C₃H₈ + O₂ → CO₂ + H₂O.',
          image: { dessin: 'molecule', formule: 'C3H8', description: 'Une molécule de propane : trois atomes C et huit atomes H.' },
          questions: [
            {
              texte: 'Question 1. Combien de molécules de CO₂ faut-il écrire à droite pour une molécule de propane ?',
              reponse: { type: 'nombre', valeur: 3 },
              aide: 'Compte les atomes de carbone à gauche.',
              correction: ['À gauche, 3 atomes C : il faut 3 CO₂.'],
            },
            {
              texte: 'Question 2. Dans l’équation ajustée C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O, si ' + k + ' molécules de propane brûlent, combien de molécules de dioxygène faut-il ?',
              reponse: { type: 'nombre', valeur: 5 * k },
              aide: 'Pour une molécule de propane, il faut 5 molécules de dioxygène.',
              correction: [k + ' × 5 = ' + 5 * k + ' molécules de dioxygène.'],
            },
            {
              texte: 'Question 3. Vérifie que l’équation C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O est ajustée, atome par atome.',
              correction: ['Carbone : 3 à gauche, 3 à droite.', 'Hydrogène : 8 à gauche, 4 × 2 = 8 à droite.', 'Oxygène : 5 × 2 = 10 à gauche, 3 × 2 + 4 = 10 à droite.', 'Les trois sortes d’atomes sont en même nombre : l’équation est ajustée.'],
              grille: ['As-tu compté les atomes de carbone des deux côtés ?', 'As-tu compté les atomes d’hydrogène ?', 'As-tu compté les atomes d’oxygène ?', 'As-tu conclu que l’équation est ajustée ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais écrire et ajuster une équation : les atomes changent de partenaires, mais aucun ne se perd.',
    carte: ['coefficient-manquant', 'atomes-a-gauche', 'ajustee-ou-pas'],
    papierDuSoir: { exercices: ['coefficient-manquant', 'molecules-d-eau'], defi: true },
    automatismes: [
      {
        id: 'coefficient-rapide',
        versions: [[1, 0], [2, 3], [3, 2]],
        genere(c) { const [n, cache] = c.alea.choisir(this.versions); const eq = EQUATIONS[n]; return { enonce: 'Le nombre caché : ' + ecrire(eq, cache), reponse: { type: 'nombre', valeur: eq[0].concat(eq[1])[cache][0] } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le chimiste suédois Jöns Jacob Berzelius a proposé d’écrire les éléments chimiques avec des lettres, comme H ou O.',
    prenoms: ['Aminata', 'Laure'],
  };
});
