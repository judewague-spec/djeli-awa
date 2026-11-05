/* Notion 8 du bloc physique-chimie « La matière » : les tests de l'eau et du dioxyde de carbone. Le souffle de Moussa. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const SULF = 'Le sulfate de cuivre anhydre', CHAUX = 'L’eau de chaux';
  const EAU = 'De l’eau', CO2 = 'Du dioxyde de carbone', RIEN = 'Rien n’est détecté';

  return {
    id: 'tests-caracteristiques',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Les tests de l’eau et du dioxyde de carbone',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'famille', 'dehors'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : tests caractéristiques.',

    accroche: {
      texte: 'Au collège, Moussa souffle avec une paille dans un tube d’eau de chaux, bien limpide. Petit à petit, l’eau devient trouble, toute blanchâtre. ' +
        'Rachel, elle, verse une goutte de jus d’orange sur une poudre blanche, qui devient bleue. Que cherchent-ils à voir ?',
      image: { dessin: 'tube', aspect: 'trouble', legende: 'eau de chaux troublée', description: 'Un tube d’eau de chaux devenue trouble, avec de petits points blancs.' },
    },

    manipulation: {
      image: { dessin: 'tube', aspect: 'bleu', legende: 'poudre devenue bleue', description: 'Un tube de sulfate de cuivre anhydre devenu bleu au contact de l’eau.' },
      etapes: [
        'Le sulfate de cuivre anhydre est une poudre blanche. Au contact de l’eau, il devient bleu. Il détecte l’eau, même cachée dans un jus.',
        'L’eau de chaux est un liquide limpide. Avec du dioxyde de carbone, elle se trouble : un solide blanc se forme.',
        'Le souffle de Moussa trouble l’eau de chaux : l’air qu’on rejette contient du dioxyde de carbone.',
        'Un test ne dit qu’une chose : la présence d’un corps précis. S’il ne réagit pas, ce corps n’est pas là, ou trop peu.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour reconnaître un corps, on utilise ' + c.mot('test') + '. Pour l’eau : le sulfate de cuivre anhydre, blanc, devient bleu. ' +
        'Pour le dioxyde de carbone : l’eau de chaux, limpide, se trouble. ' +
        'L’astuce pour retenir : l’eau rend le sulfate de cuivre bleu comme la mer ; le dioxyde de carbone rend la chaux blanche comme un nuage.',
    },

    vocabulaire: {
      termes: {
        test: { sesMots: 'un petit détecteur', officiel: 'un test caractéristique', lesDeux: 'un petit détecteur, que les scientifiques appellent un test caractéristique' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la poudre blanche et l’eau de chaux sont des petits détecteurs. Chacun en reconnaît un seul. ' +
          'Les scientifiques ont un mot pour ça : je te le dirai la prochaine fois.',
        'Les scientifiques disent : un test caractéristique. Notre petit détecteur, c’est un test caractéristique : il prouve la présence d’un corps précis.',
        'Tu connais le mot officiel : le sulfate de cuivre anhydre est le test caractéristique de l’eau, l’eau de chaux celui du dioxyde de carbone.',
      ],
    },

    exercices: [
      {
        id: 'quel-test',
        univers: 'famille',
        versions: [['prouver qu’un jus de fruit contient de l’eau', SULF], ['prouver que l’air qu’on souffle contient du dioxyde de carbone', CHAUX], ['savoir si de la buée sur une vitre est de l’eau', SULF], ['savoir si le gaz d’une boisson pétillante est du dioxyde de carbone', CHAUX]],
        genere(c) {
          const [but, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure veut ' + but + '. Quel test utiliser ?',
            reponse: O.choix(c.alea, bonne, [SULF, CHAUX]),
            aide: 'Sulfate de cuivre : l’eau. Eau de chaux : le dioxyde de carbone.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'resultat',
        univers: 'cuisine-restaurant',
        versions: [['Le sulfate de cuivre anhydre devient bleu.', EAU], ['L’eau de chaux se trouble.', CO2], ['L’eau de chaux reste limpide.', RIEN], ['Le sulfate de cuivre anhydre reste blanc.', RIEN]],
        genere(c) {
          const [obs, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Observation : « ' + obs + ' » Qu’a-t-on détecté ?',
            reponse: O.choix(c.alea, bonne, [EAU, CO2, RIEN]),
            aide: 'Le test est positif s’il change : bleu ou trouble.',
            correction: [bonne === RIEN ? 'Le test ne change pas : le corps cherché n’est pas détecté.' : 'Le test a changé : le corps est présent.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'couleur',
        univers: 'cuisine-restaurant',
        versions: [['du lait', true], ['du sucre en poudre sec', false], ['de la sauce tomate', true], ['du sel sec', false], ['du jus de citron', true], ['de la farine sèche', false]],
        genere(c) {
          const [corps, eau] = c.alea.choisir(this.versions);
          const bonne = eau ? 'Il devient bleu' : 'Il reste blanc';
          return {
            enonce: 'Aminata dépose ' + corps + ' sur du sulfate de cuivre anhydre. Que va-t-il se passer ?',
            reponse: O.choix(c.alea, bonne, ['Il devient bleu', 'Il reste blanc']),
            aide: 'Ce corps contient-il de l’eau ?',
            correction: [eau ? 'Il contient de l’eau : la poudre bleuit.' : 'Il est sec, sans eau : la poudre reste blanche.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'souffle',
        univers: 'dehors',
        versions: [['l’air qu’on rejette en soufflant', 'Elle se trouble'], ['de l’air pur pompé avec une seringue pendant quelques secondes', 'Elle reste limpide'], ['le gaz qui sort d’une boisson gazeuse', 'Elle se trouble'], ['du dioxygène pur', 'Elle reste limpide']],
        genere(c) {
          const [gaz, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'On fait passer ' + gaz + ' dans de l’eau de chaux. Que fait l’eau de chaux ?',
            reponse: O.choix(c.alea, bonne, ['Elle se trouble', 'Elle reste limpide']),
            aide: 'Ce gaz contient-il beaucoup de dioxyde de carbone ?',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'compter',
        univers: 'famille',
        // [tubes testés, tubes devenus bleus]
        versions: [[6, 4], [8, 5], [5, 2], [10, 7], [7, 3], [9, 6]],
        genere(c) {
          const [n, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rebecca teste ' + n + ' liquides avec du sulfate de cuivre anhydre. ' + b + ' le font bleuir. Combien de liquides testés ne montrent pas d’eau ?',
            reponse: { type: 'nombre', valeur: n - b },
            aide: 'Ceux qui ne bleuissent pas : ' + n + ' − ' + b + '.',
            aideParlee: 'Enlève les liquides qui ont fait bleuir la poudre.',
            correction: [n + ' − ' + b + ' = ' + (n - b) + ' liquides.'],
          };
        },
      },
    ],

    defi: {
      versions: [[1], [2], [3], [4]],
      genere(c) {
        const [k] = c.alea.choisir(this.versions);
        const objet = ['une bougie', 'un réchaud à gaz', 'une lampe à huile', 'une bougie parfumée'][k - 1];
        return {
          enonce: 'Laure fait brûler ' + objet + ' sous un grand verre retourné. De la buée apparaît sur la paroi. ' +
            'Elle verse ensuite un peu d’eau de chaux dans le verre et l’agite : l’eau de chaux se trouble.',
          image: { dessin: 'tube', aspect: 'trouble', legende: 'eau de chaux troublée', description: 'L’eau de chaux troublée après la combustion.' },
          questions: [
            {
              texte: 'Question 1. Quel test faut-il faire pour prouver que la buée est de l’eau ?',
              reponse: O.choix(c.alea, SULF, [SULF, CHAUX]),
              aide: 'Quel test détecte l’eau ?',
              correction: ['Si le sulfate de cuivre anhydre bleuit, la buée est de l’eau. Réponse : ' + SULF + '.'],
            },
            {
              texte: 'Question 2. Quel gaz l’eau de chaux troublée a-t-elle détecté ?',
              reponse: O.choix(c.alea, CO2, [EAU, CO2, 'Du dioxygène']),
              aide: 'L’eau de chaux se trouble avec un seul gaz.',
              correction: ['Réponse : ' + CO2 + '.'],
            },
            {
              texte: 'Question 3. Rédige la conclusion : quelles matières nouvelles apparaissent quand ça brûle ? Cite les tests qui le prouvent.',
              correction: ['La buée bleuit le sulfate de cuivre anhydre : il se forme de l’eau.', 'L’eau de chaux se trouble : il se forme du dioxyde de carbone.'],
              grille: ['As-tu cité l’eau et le sulfate de cuivre anhydre ?', 'As-tu cité le dioxyde de carbone et l’eau de chaux ?', 'As-tu fait une phrase de conclusion ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Bleu pour l’eau, trouble pour le dioxyde de carbone : tu sais faire parler deux détecteurs.',
    carte: ['quel-test', 'resultat', 'couleur'],
    papierDuSoir: { exercices: ['resultat', 'souffle'], defi: true },
    automatismes: [
      {
        id: 'test-rapide',
        versions: [['l’eau', SULF], ['le dioxyde de carbone', CHAUX]],
        genere(c) { const [corps, b] = c.alea.choisir(this.versions); return { enonce: 'Le test ' + corps.replace(/^le /, 'du ').replace(/^l’/, 'de l’') + ' ?', reponse: O.choix(c.alea, b, [SULF, CHAUX]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au lac Nyos, au Cameroun, un long tuyau fait remonter l’eau du fond, chargée de dioxyde de carbone, pour que ce gaz s’échappe peu à peu dans l’air.',
    prenoms: ['Moussa', 'Rachel', 'Laure', 'Aminata', 'Rebecca'],
  };
});
