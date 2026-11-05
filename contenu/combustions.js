/* Notion 13 du bloc physique-chimie « La matière » : les combustions. La bougie et la gazinière. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const CB = 'Le combustible', CO = 'Le comburant', CH = 'La chaleur';

  return {
    id: 'combustions',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Les combustions',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'maison-courses', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : combustions.',

    accroche: {
      texte: 'Le soir, la lumière s’éteint dans le quartier. Laure allume une bougie, puis la gazinière pour chauffer la soupe. ' +
        'Quand elle pose un verre retourné sur une petite bougie, la flamme faiblit, puis s’éteint. ' +
        'Qu’est-ce qui manque à la flamme ? Et que devient la cire ou le gaz qui brûle ?',
      image: { dessin: 'tube', aspect: 'trouble', legende: 'gaz de la flamme dans l’eau de chaux', description: 'Un tube d’eau de chaux troublée par les gaz d’une flamme : ils contiennent du dioxyde de carbone.' },
    },

    manipulation: {
      image: { dessin: 'molecule', formule: 'CH4', description: 'Une molécule de méthane, le gaz de la gazinière : un atome C et quatre atomes H.' },
      etapes: [
        'Pour qu’un feu brûle, il faut trois choses : quelque chose qui brûle, du dioxygène, et de la chaleur pour démarrer. C’est le triangle du feu.',
        'Sous le verre, la bougie consomme le dioxygène de l’air. Quand il n’y en a plus assez, la flamme s’éteint.',
        'Pendant la combustion, de la buée apparaît, et l’eau de chaux se trouble : il se forme de l’eau et du dioxyde de carbone.',
        'Pour le méthane de la gazinière : CH₄ + 2 O₂ → CO₂ + 2 H₂O.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une combustion est une transformation chimique. Pour brûler, il faut ' + c.mot('combustible') + ', du dioxygène et de la chaleur. ' +
        'Avec le carbone, il se forme du dioxyde de carbone ; avec le méthane, du dioxyde de carbone et de l’eau. ' +
        'Attention : s’il manque du dioxygène, il peut se former du monoxyde de carbone, un gaz toxique et sans odeur. Il faut toujours aérer.',
    },

    vocabulaire: {
      termes: {
        combustible: { sesMots: 'quelque chose qui brûle', officiel: 'un combustible', lesDeux: 'quelque chose qui brûle, que les scientifiques appellent un combustible' },
      },
      textes: [
        'Pour l’instant, garde tes mots : il faut ce qui brûle, du dioxygène, et de la chaleur. Si l’un manque, le feu s’éteint. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le combustible, c’est ce qui brûle ; le comburant, c’est le dioxygène. Avec la chaleur, ils forment le triangle du feu.',
        'Tu connais les mots officiels : combustible, comburant, triangle du feu. Une combustion consomme du dioxygène et forme de nouveaux produits.',
      ],
    },

    exercices: [
      {
        id: 'triangle',
        univers: 'famille',
        versions: [['le bois', CB], ['le dioxygène de l’air', CO], ['l’étincelle de l’allumette', CH], ['le gaz de la gazinière', CB], ['la cire de la bougie', CB]],
        genere(c) {
          const [corps, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans le triangle du feu, quel est le rôle ' + corps.replace(/^le /, 'du ').replace(/^(l’|la )/, 'de $1') + ' ?',
            reponse: O.choix(c.alea, bonne, [CB, CO, CH]),
            aide: 'Ce qui brûle, ce qui fait brûler, ce qui démarre.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'eteindre',
        univers: 'cuisine-restaurant',
        versions: [['poser un couvercle sur une poêle qui flambe', 'Le dioxygène'], ['fermer le robinet du gaz', 'Le combustible'], ['jeter de l’eau froide sur des braises', 'La chaleur'], ['étouffer une petite flamme avec une couverture', 'Le dioxygène']],
        genere(c) {
          const [geste, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour éteindre un feu, Aminata pense à ' + geste + '. Quel côté du triangle du feu retire-t-elle ainsi ?',
            reponse: O.choix(c.alea, bonne, ['Le dioxygène', 'Le combustible', 'La chaleur']),
            aide: 'Qu’est-ce qui ne peut plus arriver jusqu’au feu ?',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'produits',
        univers: 'maison-courses',
        versions: [['du carbone (charbon de bois)', 'Du dioxyde de carbone'], ['du méthane', 'Du dioxyde de carbone et de l’eau'], ['du butane d’un réchaud', 'Du dioxyde de carbone et de l’eau']],
        genere(c) {
          const [corps, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quels produits forme la combustion complète ' + corps.replace(/^du /, 'du ') + ' dans le dioxygène ?',
            reponse: O.choix(c.alea, bonne, ['Du dioxyde de carbone', 'Du dioxyde de carbone et de l’eau', 'Du dioxygène et de l’eau']),
            aide: 'Le carbone donne du dioxyde de carbone. L’hydrogène du combustible donne de l’eau.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'masse-de-co2',
        univers: 'famille',
        // [masse de carbone, masse de dioxygène] en g ; carbone + dioxygène → dioxyde de carbone
        versions: [[12, 32], [6, 16], [3, 8], [24, 64], [36, 96], [9, 24]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un récipient fermé, ' + a + ' g de carbone brûlent complètement avec ' + b + ' g de dioxygène. Il ne se forme que du dioxyde de carbone. Quelle masse de dioxyde de carbone se forme, en grammes ?',
            reponse: { type: 'nombre', valeur: a + b },
            aide: 'La masse des réactifs est égale à celle des produits.',
            correction: [a + ' + ' + b + ' = ' + (a + b) + ' g de dioxyde de carbone.'],
          };
        },
      },
      {
        id: 'molecules-de-dioxygene',
        univers: 'cuisine-restaurant',
        versions: [1, 2, 3, 4, 5, 10],
        genere(c) {
          const k = c.alea.choisir(this.versions);
          return {
            enonce: 'L’équation de la combustion du méthane est CH₄ + 2 O₂ → CO₂ + 2 H₂O. Combien de molécules de dioxygène faut-il pour brûler ' + k + ' molécule' + (k > 1 ? 's' : '') + ' de méthane ?',
            reponse: { type: 'nombre', valeur: 2 * k },
            aide: 'Il faut 2 molécules de dioxygène par molécule de méthane.',
            correction: [k + ' × 2 = ' + 2 * k + ' molécules de dioxygène.'],
          };
        },
      },
    ],

    defi: {
      // [masse de méthane brûlé en g, masse de dioxygène en g, masse d'eau formée en g]
      versions: [[16, 64, 36], [8, 32, 18], [32, 128, 72], [4, 16, 9], [24, 96, 54], [12, 48, 27]],
      genere(c) {
        const [m, o, e] = c.alea.choisir(this.versions);
        return {
          enonce: 'Dans un récipient fermé, Rachel fait brûler complètement ' + m + ' g de méthane avec ' + o + ' g de dioxygène. Il se forme ' + e + ' g d’eau et du dioxyde de carbone. ' +
            'Équation : CH₄ + 2 O₂ → CO₂ + 2 H₂O.',
          image: { dessin: 'molecule', formule: 'CH4', description: 'Une molécule de méthane.' },
          questions: [
            {
              texte: 'Question 1. Quelle masse de dioxyde de carbone s’est formée, en grammes ?',
              reponse: { type: 'nombre', valeur: m + o - e },
              aide: 'Masse des réactifs = masse des produits.',
              correction: ['Masse des réactifs : ' + m + ' + ' + o + ' = ' + (m + o) + ' g.', (m + o) + ' − ' + e + ' = ' + (m + o - e) + ' g de dioxyde de carbone.'],
            },
            {
              texte: 'Question 2. Quel test prouve la présence de dioxyde de carbone ?',
              reponse: O.choix(c.alea, 'L’eau de chaux se trouble', ['L’eau de chaux se trouble', 'Le sulfate de cuivre anhydre bleuit']),
              aide: 'Quel test détecte le dioxyde de carbone ?',
              correction: ['Réponse : L’eau de chaux se trouble.'],
            },
            {
              texte: 'Question 3. Laure chauffe la maison avec un poêle dans une pièce fermée. Explique pourquoi c’est dangereux.',
              correction: ['Dans une pièce fermée, le dioxygène finit par manquer.', 'La combustion devient incomplète et peut former du monoxyde de carbone, un gaz toxique et sans odeur.', 'Il faut aérer.'],
              grille: ['As-tu dit que le dioxygène manque ?', 'As-tu nommé le monoxyde de carbone et dit qu’il est toxique ?', 'As-tu donné la solution : aérer ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le triangle du feu n’a plus de secret, et tu sais pourquoi il faut toujours aérer quand quelque chose brûle.',
    carte: ['triangle', 'eteindre', 'produits'],
    papierDuSoir: { exercices: ['masse-de-co2', 'molecules-de-dioxygene'], defi: true },
    automatismes: [
      {
        id: 'comburant-rapide',
        versions: [['le dioxygène', CO], ['le bois', CB], ['l’étincelle', CH]],
        genere(c) { const [x, b] = c.alea.choisir(this.versions); return { enonce: 'Triangle du feu : ' + x + ' ?', reponse: O.choix(c.alea, b, [CB, CO, CH]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au lac Kivu, entre le Rwanda et la République démocratique du Congo, on retire le méthane dissous dans l’eau pour produire de l’électricité.',
    prenoms: ['Laure', 'Aminata', 'Rachel'],
  };
});
