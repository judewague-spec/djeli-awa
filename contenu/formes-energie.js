/* Notion 1 du bloc « L'énergie » : les formes d'énergie. Le ballon de Moussa et le soleil de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const E_C = 'L’énergie cinétique', E_T = 'L’énergie thermique', E_CH = 'L’énergie chimique', E_P = 'L’énergie de position';
  const E_EL = 'L’énergie électrique', E_L = 'L’énergie lumineuse', E_N = 'L’énergie nucléaire';
  const SOURCE = 'Une source d’énergie', FORME = 'Une forme d’énergie';

  /** Une question à choix : versions [[texte, bonne réponse, autres réponses, explication]]. */
  const Q = (id, univers, versions, enonce, aide) => ({
    id, univers, versions,
    genere(c) {
      const [x, bonne, autres, pourquoi] = c.alea.choisir(this.versions);
      return {
        enonce: enonce(x),
        reponse: O.choix(c.alea, bonne, autres),
        aide,
        correction: [pourquoi, 'Réponse : ' + bonne + '.'],
      };
    },
  });

  return {
    id: 'formes-energie',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'Les formes d’énergie',
    classe: 'cycle 4',
    univers: ['dehors', 'famille', 'appareils'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : sources et formes d’énergie (cinétique, de position, thermique, électrique, chimique, nucléaire, lumineuse).',

    accroche: {
      texte: 'Rachel et Moussa sont au soleil. Le soleil éclaire, et il chauffe la peau de Rachel. Moussa fait rouler un ballon. ' +
        'Tout cela, c’est de l’énergie, mais sous plusieurs formes.',
      image: { dessin: 'chaine', etapes: ['Le soleil : une source d’énergie', 'La lumière : une forme d’énergie', 'La chaleur : une autre forme'], description: 'Le soleil est une source d’énergie. Il envoie de la lumière, puis de la chaleur : ce sont deux formes d’énergie.' },
    },

    manipulation: {
      etapes: [
        'Une source d’énergie, c’est d’où l’énergie vient : le soleil, le vent, l’eau d’un barrage, le pétrole, l’uranium.',
        'Une forme d’énergie, c’est la façon dont l’énergie se montre.',
        'Le ballon qui roule a l’énergie du mouvement. Le livre en haut de l’étagère a l’énergie de position.',
        'Une casserole chaude a l’énergie de la chaleur. Une pile neuve, le bois et la nourriture gardent de l’énergie en réserve.',
        'Un fil branché porte l’énergie électrique. Une lampe donne l’énergie lumineuse. L’uranium cache l’énergie nucléaire.',
        'Le soleil est une source. La lumière et la chaleur qu’il envoie sont des formes.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le ballon de Moussa qui roule : il a ' + c.mot('cinetique') + '. ' +
        'Regarde l’eau chaude de la casserole : elle a ' + c.mot('thermique') + '. ' +
        'Regarde la pile neuve : elle contient ' + c.mot('chimique') + '. ' +
        'Il existe aussi l’énergie de position, l’énergie électrique, l’énergie lumineuse et l’énergie nucléaire. ' +
        'L’astuce : le soleil est une source, d’où l’énergie vient. La lumière et la chaleur sont des formes, des façons dont l’énergie se montre.',
    },

    vocabulaire: {
      termes: {
        cinetique: { sesMots: 'l’énergie du mouvement', officiel: 'l’énergie cinétique', lesDeux: 'l’énergie du mouvement, appelée énergie cinétique' },
        thermique: { sesMots: 'l’énergie de la chaleur', officiel: 'l’énergie thermique', lesDeux: 'l’énergie de la chaleur, appelée énergie thermique' },
        chimique: { sesMots: 'l’énergie mise en réserve', officiel: 'l’énergie chimique', lesDeux: 'l’énergie mise en réserve, appelée énergie chimique' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’énergie du mouvement, l’énergie de la chaleur et l’énergie mise en réserve. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : l’énergie cinétique pour le mouvement, l’énergie thermique pour la chaleur, l’énergie chimique pour la réserve.',
        'Tu connais les mots officiels : cinétique, thermique et chimique. Tu sais aussi distinguer une source d’une forme.',
      ],
    },

    exercices: [
      Q('quelle-forme', 'dehors', [
        ['Moussa roule à vélo dans la rue. Quelle forme d’énergie le vélo a-t-il parce qu’il est en mouvement ?', E_C, [E_N, E_L], 'Le vélo bouge : son énergie dépend de sa vitesse.'],
        ['Laure pose une casserole d’eau chaude sur la table. Quelle forme d’énergie l’eau a-t-elle parce qu’elle est chaude ?', E_T, [E_EL, E_N], 'L’eau chaude a de l’énergie liée à sa chaleur : c’est l’énergie thermique.'],
        ['Rachel range une pile neuve dans sa lampe de poche, encore éteinte. Quelle forme d’énergie la pile garde-t-elle en réserve ?', E_CH, [E_L, E_C], 'La pile garde son énergie en réserve, dans ses produits chimiques.'],
        ['Clarisse pose un livre tout en haut de l’étagère. Quelle forme d’énergie le livre a-t-il à cause de sa hauteur ?', E_P, [E_EL, E_L], 'Plus le livre est haut, plus il a d’énergie de position.'],
        ['Un courant passe dans le fil de la lampe de Moussa. Quelle forme d’énergie circule dans le fil ?', E_EL, [E_N, E_P], 'Dans le fil, l’énergie circule sous forme électrique.'],
        ['Le soleil entre par la fenêtre chez Aminata. Quelle forme d’énergie la lumière du soleil apporte-t-elle ?', E_L, [E_CH, E_C], 'La lumière est une énergie qui voyage : c’est l’énergie lumineuse.'],
      ], (x) => x, 'Cherche ce qui se passe. Cinétique veut dire du mouvement, thermique de la chaleur, chimique de la réserve. Puis pense à la lumière, à la hauteur ou au courant.'),

      Q('source-ou-forme', 'famille', [
        ['le vent', SOURCE, [FORME], 'Le vent est ce d’où l’énergie vient : c’est une source.'],
        ['l’énergie cinétique', FORME, [SOURCE], 'C’est la façon dont l’énergie se montre quand quelque chose bouge : c’est une forme.'],
        ['l’uranium', SOURCE, [FORME], 'L’uranium est ce d’où vient l’énergie d’une centrale nucléaire : c’est une source.'],
        ['l’énergie thermique', FORME, [SOURCE], 'C’est la façon dont l’énergie se montre sous forme de chaleur : c’est une forme.'],
        ['le bois', SOURCE, [FORME], 'Le bois est ce d’où vient l’énergie d’un feu : c’est une source.'],
        ['l’énergie lumineuse', FORME, [SOURCE], 'C’est la façon dont l’énergie se montre sous forme de lumière : c’est une forme.'],
      ], (x) => 'Moussa lit dans son cahier : « ' + x + ' ». Est-ce une source ou une forme d’énergie ?', 'Une source, c’est d’où l’énergie vient. Une forme, c’est la façon dont elle se montre. Cinétique veut dire du mouvement, et thermique de la chaleur.'),

      {
        id: 'plus-cinetique',
        univers: 'dehors',
        // [vitesse du premier ballon, vitesse du second, en km/h]
        versions: [[6, 12], [10, 5], [8, 3], [11, 7], [9, 4], [3, 10]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = a > b ? 'Le premier ballon' : 'Le second ballon';
          return {
            enonce: 'Rachel et Moussa jouent avec deux ballons identiques. Le premier roule à ' + a + ' km/h, le second à ' + b + ' km/h. Lequel a le plus d’énergie cinétique (l’énergie du mouvement) ?',
            reponse: O.choix(c.alea, bonne, ['Le premier ballon', 'Le second ballon', 'Les deux ont la même énergie cinétique']),
            aide: 'Les ballons sont identiques : compare ' + a + ' km/h et ' + b + ' km/h.',
            aideParlee: 'Les ballons sont identiques : compare leurs deux vitesses.',
            correction: [a + ' km/h et ' + b + ' km/h. À masse égale, celui qui va le plus vite a le plus d’énergie cinétique.', 'Réponse : ' + bonne + '.'],
          };
        },
      },

      {
        id: 'plus-position',
        univers: 'famille',
        // [hauteur du premier livre, du second, en cm]
        versions: [[40, 160], [150, 50], [30, 120], [180, 60], [100, 20], [70, 140]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = a > b ? 'Le premier livre' : 'Le second livre';
          return {
            enonce: 'Laure range deux livres identiques. Le premier est à ' + a + ' cm du sol, le second à ' + b + ' cm. Lequel a le plus d’énergie de position ?',
            reponse: O.choix(c.alea, bonne, ['Le premier livre', 'Le second livre', 'Les deux ont la même énergie de position']),
            aide: 'Les livres sont identiques : compare ' + a + ' cm et ' + b + ' cm.',
            aideParlee: 'Les livres sont identiques : compare leurs deux hauteurs.',
            correction: [a + ' cm et ' + b + ' cm. À masse égale, le plus haut a le plus d’énergie de position.', 'Réponse : ' + bonne + '.'],
          };
        },
      },

      Q('vrai-ou-faux', 'appareils', [
        ['Un livre posé en haut d’une étagère a de l’énergie de position.', 'Vrai', ['Faux'], 'Il est en hauteur : il a de l’énergie de position.'],
        ['Un ballon posé immobile par terre a de l’énergie cinétique (celle du mouvement).', 'Faux', ['Vrai'], 'Il ne bouge pas : on ne parle pas d’énergie cinétique.'],
        ['La nourriture contient de l’énergie chimique (celle qu’on garde en réserve).', 'Vrai', ['Faux'], 'Le corps puise dans la nourriture l’énergie qu’elle garde en réserve.'],
        ['Une pile neuve contient de l’énergie lumineuse.', 'Faux', ['Vrai'], 'Une pile neuve garde de l’énergie chimique, pas de la lumière.'],
        ['L’uranium est une source de l’énergie nucléaire.', 'Vrai', ['Faux'], 'Les centrales nucléaires utilisent l’énergie cachée dans l’uranium.'],
        ['Un fer à repasser chaud n’a aucune énergie.', 'Faux', ['Vrai'], 'Un fer chaud a de l’énergie thermique.'],
      ], (x) => 'Rachel lit cette phrase : « ' + x + ' » Est-elle vraie ou fausse ?', 'Relis la phrase et pense à une scène que tu connais. Cinétique veut dire du mouvement, chimique de la réserve.'),
    ],

    defi: {
      // [vitesse A, vitesse B en km/h, objet, mot de la question 3, le mot est-il une source ?]
      versions: [
        [6, 12, 'une pile neuve', 'le vent', true],
        [10, 5, 'un morceau de bois', 'l’énergie lumineuse', false],
        [11, 7, 'un sandwich', 'l’uranium', true],
        [4, 9, 'une pile neuve', 'l’énergie thermique', false],
      ],
      genere(c) {
        const [a, b, objet, mot, estSource] = c.alea.choisir(this.versions);
        const plus = a > b ? a : b;
        return {
          enonce: 'Laure organise un pique-nique au bord du lac avec Rachel et Moussa. Rachel emporte ' + objet + '. Moussa fait rouler un ballon : d’abord à ' + a + ' km/h, puis à ' + b + ' km/h.',
          questions: [
            {
              texte: 'Question 1. Quelle forme d’énergie est gardée en réserve dans ' + objet + ' ?',
              reponse: O.choix(c.alea, E_CH, [E_L, E_C]),
              aide: 'Cherche l’énergie mise en réserve. On la nomme énergie chimique.',
              correction: [objet.charAt(0).toUpperCase() + objet.slice(1) + ' garde son énergie en réserve.', 'Réponse : ' + E_CH + '.'],
            },
            {
              texte: 'Question 2. Quand le ballon a-t-il le plus d’énergie cinétique (l’énergie du mouvement) ?',
              reponse: O.choix(c.alea, 'Quand il roule à ' + plus + ' km/h', ['Quand il roule à ' + a + ' km/h', 'Quand il roule à ' + b + ' km/h', 'Les deux fois, pareil']),
              aide: 'Plus le ballon va vite, plus son énergie cinétique est grande.',
              correction: [a + ' km/h et ' + b + ' km/h : le ballon a le plus d’énergie cinétique quand il roule à ' + plus + ' km/h.', 'Réponse : Quand il roule à ' + plus + ' km/h.'],
            },
            {
              texte: 'Question 3. Moussa dit : « ' + mot.charAt(0).toUpperCase() + mot.slice(1) + ' est une source d’énergie. » A-t-il raison ?',
              reponse: O.choix(c.alea, estSource ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Une source, c’est d’où l’énergie vient. Une forme, c’est la façon dont elle se montre.',
              correction: [estSource ? 'Oui : ' + mot + ' est ce d’où vient l’énergie, c’est une source.' : 'Non : ' + mot + ' est une façon dont l’énergie se montre, c’est une forme.'],
            },
            {
              texte: 'Question 4. Explique la différence entre une source d’énergie et une forme d’énergie. Donne un exemple de chacune.',
              correction: ['Une source, c’est d’où l’énergie vient : le soleil, le vent, l’uranium.', 'Une forme, c’est la façon dont l’énergie se montre : la lumière, la chaleur, le mouvement.'],
              grille: ['As-tu dit qu’une source est ce d’où l’énergie vient ?', 'As-tu dit qu’une forme est la façon dont l’énergie se montre ?', 'As-tu donné un exemple de source et un exemple de forme ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais nommer les formes d’énergie, et tu ne confonds plus une source avec une forme.',
    carte: ['quelle-forme', 'source-ou-forme', 'plus-cinetique'],
    papierDuSoir: { exercices: ['quelle-forme', 'plus-position'], defi: true },
    automatismes: [
      {
        id: 'vitesse-max',
        versions: [[6, 12], [10, 5], [8, 3], [11, 7]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Un ballon roule à ' + a + ' km/h, puis à ' + b + ' km/h. Quelle est la plus grande vitesse, en km/h ?', reponse: { type: 'nombre', valeur: Math.max(a, b) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, à Olkaria, la chaleur de la Terre produit de la vapeur qui fait tourner des turbines.',
    prenoms: ['Rachel', 'Moussa', 'Laure', 'Clarisse', 'Aminata'],
  };
});
