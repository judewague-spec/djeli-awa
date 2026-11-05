/* Notion 16 du bloc physique-chimie « La matière » : les ions. Le sel de Taoudéni. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  // [nom de l'atome, symbole, numéro atomique, charge de l'ion]
  const IONS = [['sodium', 'Na', 11, 1], ['chlore', 'Cl', 17, -1], ['magnésium', 'Mg', 12, 2], ['cuivre', 'Cu', 29, 2], ['fer', 'Fe', 26, 2], ['aluminium', 'Al', 13, 3], ['oxygène', 'O', 8, -2], ['calcium', 'Ca', 20, 2]];
  const EXP = { 1: '⁺', 2: '²⁺', 3: '³⁺', '-1': '⁻', '-2': '²⁻', '-3': '³⁻' };
  const ion = (s, q) => s + EXP[q];
  const de = (nom) => (/^[aeiou]/.test(nom) ? 'd’' : 'de ') + nom;
  const PERD = 'Il a perdu des électrons', GAGNE = 'Il a gagné des électrons';

  return {
    id: 'ions',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Les ions',
    classe: '3e',
    univers: ['cuisine-restaurant', 'commerce', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : ions.',

    accroche: {
      texte: 'Au marché, Aminata achète un morceau de sel venu du désert, taillé dans une grande plaque. Le sel de cuisine, c’est du chlorure de sodium. ' +
        'Mais dans le sel, il n’y a pas des atomes ordinaires : ce sont des atomes qui ont perdu ou gagné des électrons. Comment est-ce possible ?',
      image: { dessin: 'atome', protons: 11, neutrons: 12, electrons: 10, description: 'Un ion sodium, dessiné sans échelle : 11 protons dans le noyau, mais seulement 10 électrons autour.' },
    },

    manipulation: {
      image: { dessin: 'atome', protons: 17, neutrons: 18, electrons: 18, description: 'Un ion chlorure, sans échelle : 17 protons dans le noyau, et 18 électrons autour.' },
      etapes: [
        'Un atome de sodium a 11 protons et 11 électrons : il est neutre.',
        'Il perd un électron : il garde 11 charges positives, mais n’a plus que 10 charges négatives. Il lui reste une charge positive : on l’écrit Na⁺.',
        'Un atome de chlore a 17 protons et 17 électrons. Il gagne un électron : 18 charges négatives pour 17 positives. On l’écrit Cl⁻.',
        'Dans le sel, il y a autant de Na⁺ que de Cl⁻ : les charges se compensent, le sel est neutre.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un atome qui perd ou gagne des électrons devient ' + c.mot('ion') + '. Le noyau, lui, ne change pas : le nombre de protons reste le même. ' +
        'Perdre des électrons donne une charge positive, comme Na⁺ ; en gagner donne une charge négative, comme Cl⁻. ' +
        'L’astuce : perdre du négatif, c’est devenir positif.',
    },

    vocabulaire: {
      termes: {
        ion: { sesMots: 'un atome chargé', officiel: 'un ion', lesDeux: 'un atome chargé, que les scientifiques appellent un ion' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un atome qui a perdu ou gagné des électrons est un atome chargé. ' +
          'Les scientifiques ont un mot pour lui : je te le dirai la prochaine fois.',
        'Les scientifiques disent : un ion. Un atome chargé, c’est un ion. Sa charge s’écrit en haut, à droite du symbole : Na⁺, Cl⁻, Cu²⁺.',
        'Tu connais le mot officiel : un ion est un atome, ou un groupe d’atomes, qui a perdu ou gagné un ou plusieurs électrons.',
      ],
    },

    exercices: [
      {
        id: 'formule-de-l-ion',
        univers: 'commerce',
        versions: IONS.map(([n]) => n),
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const [, s, , q] = IONS.find(([n]) => n === nom);
          const k = Math.abs(q);
          const bonne = ion(s, q);
          const autres = [ion(s, -q), ion(s, q > 0 ? Math.min(3, q + 1) : Math.max(-3, q - 1))];
          return {
            enonce: 'Un atome ' + de(nom) + ' ' + (q > 0 ? 'perd ' : 'gagne ') + k + ' électron' + (k > 1 ? 's' : '') + '. Quelle est la formule de l’ion formé ?',
            reponse: O.choix(c.alea, bonne, autres),
            aide: 'Perdre des électrons donne une charge positive ; en gagner, une charge négative.',
            correction: [(q > 0 ? 'Il perd ' : 'Il gagne ') + k + ' charge' + (k > 1 ? 's' : '') + ' négative' + (k > 1 ? 's' : '') + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'electrons-de-l-ion',
        univers: 'famille',
        versions: IONS.map(([n]) => n),
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const [, s, z, q] = IONS.find(([n]) => n === nom);
          return {
            enonce: 'L’atome ' + de(nom) + ' a pour numéro atomique ' + z + '. Combien d’électrons possède l’ion ' + ion(s, q) + ' ?',
            reponse: { type: 'nombre', valeur: z - q },
            aide: 'L’atome a ' + z + ' électrons. ' + (q > 0 ? 'L’ion en a perdu.' : 'L’ion en a gagné.'),
            aideParlee: 'Pars du nombre d’électrons de l’atome neutre, puis enlève ceux qui sont perdus, ou ajoute ceux qui sont gagnés.',
            correction: ['L’atome neutre a ' + z + ' électrons.', ion(s, q) + (q > 0 ? ' en a perdu ' + q + ' : ' + z + ' − ' + q : ' en a gagné ' + -q + ' : ' + z + ' + ' + -q) + ' = ' + (z - q) + ' électrons.'],
          };
        },
      },
      {
        id: 'perdu-ou-gagne',
        univers: 'cuisine-restaurant',
        versions: IONS.map(([n]) => n),
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const [, s, , q] = IONS.find(([n]) => n === nom);
          const bonne = q > 0 ? PERD : GAGNE;
          return {
            enonce: 'L’ion ' + ion(s, q) + ' vient d’un atome ' + de(nom) + '. Cet atome a-t-il perdu ou gagné des électrons ?',
            reponse: O.choix(c.alea, bonne, [PERD, GAGNE]),
            aide: 'Une charge positive : il manque des électrons.',
            correction: ['Charge ' + (q > 0 ? 'positive' : 'négative') + '. Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'protons-de-l-ion',
        univers: 'commerce',
        versions: IONS.map(([n]) => n),
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const [, s, z, q] = IONS.find(([n]) => n === nom);
          return {
            enonce: 'L’atome ' + de(nom) + ' a pour numéro atomique ' + z + '. Combien de protons possède l’ion ' + ion(s, q) + ' ?',
            reponse: { type: 'nombre', valeur: z },
            aide: 'Le noyau ne change pas quand l’atome devient un ion.',
            correction: ['Seuls les électrons changent : l’ion ' + ion(s, q) + ' garde ' + z + ' protons.'],
          };
        },
      },
      {
        id: 'compenser',
        univers: 'cuisine-restaurant',
        // [ion positif, charge, nom du solide] : combien d'ions chlorure Cl⁻ pour le compenser ?
        versions: [['Na', 1, 'le chlorure de sodium'], ['Mg', 2, 'le chlorure de magnésium'], ['Cu', 2, 'le chlorure de cuivre'], ['Al', 3, 'le chlorure d’aluminium'], ['Ca', 2, 'le chlorure de calcium'], ['Fe', 2, 'le chlorure de fer']],
        genere(c) {
          const [s, q, nom] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans ' + nom + ', chaque ion ' + ion(s, q) + ' est accompagné d’ions chlorure Cl⁻. Combien d’ions Cl⁻ faut-il pour un ion ' + ion(s, q) + ', pour que l’ensemble soit neutre ?',
            reponse: { type: 'nombre', valeur: q },
            aide: 'Chaque ion Cl⁻ apporte une charge négative.',
            correction: ['L’ion ' + ion(s, q) + ' porte ' + q + ' charge' + (q > 1 ? 's' : '') + ' positive' + (q > 1 ? 's' : '') + '.', 'Il faut ' + q + ' ion' + (q > 1 ? 's' : '') + ' Cl⁻ pour compenser.'],
          };
        },
      },
    ],

    defi: {
      versions: [[1], [2], [3], [4]],
      genere(c) {
        const [k] = c.alea.choisir(this.versions);
        const ville = ['Taoudéni', 'Tombouctou', 'Mopti', 'Bamako'][k - 1];
        return {
          enonce: 'Moussa a rapporté de ' + ville + ', au Mali, une plaque de sel. Ce sel contient des ions sodium Na⁺ et des ions chlorure Cl⁻. ' +
            'Le sodium a pour numéro atomique 11, le chlore 17.',
          image: { dessin: 'atome', protons: 11, neutrons: 12, electrons: 10, description: 'Un ion sodium : 11 protons, 10 électrons.' },
          questions: [
            {
              texte: 'Question 1. Combien d’électrons possède l’ion Na⁺ ?',
              reponse: { type: 'nombre', valeur: 10 },
              aide: 'L’atome de sodium a perdu un électron.',
              correction: ['11 − 1 = 10 électrons.'],
            },
            {
              texte: 'Question 2. Combien d’électrons possède l’ion Cl⁻ ?',
              reponse: { type: 'nombre', valeur: 18 },
              aide: 'L’atome de chlore a gagné un électron.',
              correction: ['17 + 1 = 18 électrons.'],
            },
            {
              texte: 'Question 3. Le sel contient des ions chargés. Explique pourquoi un grain de sel est quand même électriquement neutre.',
              correction: ['Chaque ion Na⁺ porte une charge positive, chaque ion Cl⁻ une charge négative.', 'Le sel contient autant d’ions Na⁺ que d’ions Cl⁻ : les charges se compensent.'],
              grille: ['As-tu donné la charge de chaque ion ?', 'As-tu dit qu’il y a autant d’ions Na⁺ que d’ions Cl⁻ ?', 'As-tu conclu que les charges se compensent ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Perdre du négatif, c’est devenir positif : tu sais comment un atome devient un ion.',
    carte: ['formule-de-l-ion', 'electrons-de-l-ion', 'perdu-ou-gagne'],
    papierDuSoir: { exercices: ['electrons-de-l-ion', 'compenser'], defi: true },
    automatismes: [
      {
        id: 'charge-rapide',
        versions: [['Na', 1], ['Cl', -1], ['Mg', 2], ['O', -2]],
        genere(c) { const [s, q] = c.alea.choisir(this.versions); return { enonce: 'L’ion ' + ion(s, q) + ' : électrons perdus ou gagnés ?', reponse: O.choix(c.alea, q > 0 ? PERD : GAGNE, [PERD, GAGNE]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Taoudéni, au Mali, on extrait du sel en grandes plaques, que des caravanes de chameaux portent vers Tombouctou.',
    prenoms: ['Aminata', 'Moussa'],
  };
});
