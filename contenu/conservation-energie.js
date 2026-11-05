/* Notion 5 du bloc « L'énergie » : la conservation de l'énergie. Le mixeur d'Aminata.
   Les nombres des exercices sont des exemples de la notion.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  // Un nombre écrit avec des espaces entre les milliers et une virgule : 1 000, 0,3.
  const gr = (x) => { const [a, b] = String(x).split('.'); return a.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (b ? ',' + b : ''); };
  const JOULE = 'Le joule, noté J, est l’unité d’énergie. ';

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
    id: 'conservation-energie',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'La conservation de l’énergie',
    classe: 'cycle 4',
    univers: ['appareils', 'cuisine-restaurant', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : conservation de l’énergie, bilan énergétique d’un système simple.',

    accroche: {
      texte: 'Aminata touche le moteur de son mixeur. Il est chaud ! Elle croit que cette énergie est perdue pour toujours. Moussa lui répond : elle n’a pas disparu.',
      image: { dessin: 'barres', barres: [{ nom: 'Énergie reçue', parts: 10 }, { nom: 'Énergie utile', parts: 7 }, { nom: 'Énergie dissipée', parts: 3 }], description: 'Trois barres. L’énergie reçue compte dix parts. L’énergie utile en compte sept, et l’énergie dissipée trois. Sept plus trois font dix.' },
    },

    manipulation: {
      etapes: [
        'Le mixeur d’Aminata reçoit de l’énergie électrique par la prise.',
        'Une partie fait tourner les lames : c’est l’énergie utile.',
        'Une autre partie chauffe le moteur et l’air autour : c’est l’énergie dissipée.',
        'Exemple : le mixeur reçoit 1 000 joules. Il en rend 800 en mouvement et 200 en chaleur.',
        'Si on additionne l’énergie utile et l’énergie dissipée, on retrouve l’énergie reçue.',
        'L’énergie ne se crée pas et ne se perd pas. Elle se transforme.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans le mixeur d’Aminata, l’énergie qui entre se retrouve entièrement dans ce qui sort. C’est ' + c.mot('conservation') + '. ' +
        'Pour tout suivre, on fait ' + c.mot('bilan') + '. ' +
        'Il s’écrit ainsi : énergie reçue égale énergie utile plus énergie dissipée. ' +
        'Pour savoir si l’appareil est bon, regarde ' + c.mot('rendement') + '. On divise l’énergie utile par l’énergie reçue. ' +
        'L’astuce : l’énergie ne disparaît jamais, elle passe d’une forme à une autre.',
    },

    vocabulaire: {
      termes: {
        conservation: { sesMots: 'le fait qu’aucune énergie ne disparaît', officiel: 'la conservation de l’énergie', lesDeux: 'le fait qu’aucune énergie ne disparaît, appelé conservation de l’énergie' },
        bilan: { sesMots: 'un compte de l’énergie qui entre et de celle qui sort', officiel: 'un bilan énergétique', lesDeux: 'un compte de l’énergie qui entre et de celle qui sort, appelé bilan énergétique' },
        rendement: { sesMots: 'la part de l’énergie reçue qui sert vraiment', officiel: 'le rendement', lesDeux: 'la part de l’énergie reçue qui sert vraiment, appelée rendement' },
      },
      textes: [
        'Pour l’instant, garde tes mots : aucune énergie ne disparaît. Le compte de ce qui entre et sort. La part qui sert vraiment. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la conservation de l’énergie, un bilan énergétique, et le rendement.',
        'Tu connais les mots officiels : conservation, bilan énergétique et rendement. Tu sais que l’énergie reçue égale l’énergie utile plus l’énergie dissipée.',
      ],
    },

    exercices: [
      {
        id: 'energie-dissipee',
        univers: 'appareils',
        // [énergie reçue, énergie utile, en joules]
        versions: [[500, 400], [1000, 700], [200, 150], [800, 600], [1500, 1200], [60, 45]],
        genere(c) {
          const [r, u] = c.alea.choisir(this.versions);
          return {
            enonce: JOULE + 'Un appareil d’Aminata reçoit ' + gr(r) + ' J. Il en rend ' + gr(u) + ' J en énergie utile. Quelle énergie dissipe-t-il, en joules ?',
            reponse: { type: 'nombre', valeur: r - u },
            aide: 'L’énergie reçue égale l’énergie utile plus l’énergie dissipée. Calcule ' + gr(r) + ' − ' + gr(u) + '.',
            aideParlee: 'L’énergie reçue égale l’énergie utile plus l’énergie dissipée. Fais une soustraction.',
            correction: ['Énergie dissipée = énergie reçue − énergie utile.', gr(r) + ' − ' + gr(u) + ' = ' + gr(r - u) + ' J.'],
          };
        },
      },
      {
        id: 'energie-utile',
        univers: 'cuisine-restaurant',
        // [énergie reçue, énergie dissipée, en joules]
        versions: [[2000, 300], [600, 150], [900, 300], [1200, 200], [100, 40], [4000, 600]],
        genere(c) {
          const [r, d] = c.alea.choisir(this.versions);
          return {
            enonce: JOULE + 'Le mixeur d’Aminata reçoit ' + gr(r) + ' J et dissipe ' + gr(d) + ' J en chaleur. Quelle énergie utile rend-il, en joules ?',
            reponse: { type: 'nombre', valeur: r - d },
            aide: 'L’énergie reçue égale l’énergie utile plus l’énergie dissipée. Calcule ' + gr(r) + ' − ' + gr(d) + '.',
            aideParlee: 'L’énergie reçue égale l’énergie utile plus l’énergie dissipée. Fais une soustraction.',
            correction: ['Énergie utile = énergie reçue − énergie dissipée.', gr(r) + ' − ' + gr(d) + ' = ' + gr(r - d) + ' J.'],
          };
        },
      },
      {
        id: 'energie-recue',
        univers: 'famille',
        // [énergie utile, énergie dissipée, en joules]
        versions: [[300, 100], [450, 50], [1200, 300], [80, 20], [900, 100], [2500, 500]],
        genere(c) {
          const [u, d] = c.alea.choisir(this.versions);
          return {
            enonce: JOULE + 'Un appareil de Laure rend ' + gr(u) + ' J en énergie utile et dissipe ' + gr(d) + ' J. Quelle énergie a-t-il reçue, en joules ?',
            reponse: { type: 'nombre', valeur: u + d },
            aide: 'L’énergie reçue égale l’énergie utile plus l’énergie dissipée. Calcule ' + gr(u) + ' + ' + gr(d) + '.',
            aideParlee: 'L’énergie reçue égale l’énergie utile plus l’énergie dissipée. Fais une addition.',
            correction: ['Énergie reçue = énergie utile + énergie dissipée.', gr(u) + ' + ' + gr(d) + ' = ' + gr(u + d) + ' J.'],
          };
        },
      },
      {
        id: 'rendement',
        univers: 'appareils',
        // [énergie reçue, énergie utile, en joules]
        versions: [[200, 50], [500, 400], [800, 600], [1000, 600], [250, 100], [60, 18]],
        genere(c) {
          const [r, u] = c.alea.choisir(this.versions);
          const pct = (u * 100) / r;
          return {
            enonce: JOULE + 'Un appareil reçoit ' + gr(r) + ' J et rend ' + gr(u) + ' J en énergie utile. Son rendement est l’énergie utile divisée par l’énergie reçue, puis multipliée par 100. Quel est son rendement, en pourcentage ?',
            reponse: { type: 'nombre', valeur: pct },
            aide: 'Divise ' + gr(u) + ' par ' + gr(r) + ', puis multiplie par 100.',
            aideParlee: 'Divise l’énergie utile par l’énergie reçue, puis multiplie par cent.',
            correction: ['Rendement = ' + gr(u) + ' ÷ ' + gr(r) + ' × 100 = ' + gr(pct) + ' %.'],
          };
        },
      },
      Q('vrai-ou-faux', 'appareils', [
        ['L’énergie reçue est égale à l’énergie utile plus l’énergie dissipée.', 'Vrai', ['Faux'], 'C’est le bilan d’un appareil : aucune énergie ne disparaît.'],
        ['L’énergie dissipée disparaît pour toujours.', 'Faux', ['Vrai'], 'Elle ne disparaît pas : elle part dans l’air, sous forme de chaleur.'],
        ['Un appareil peut rendre plus d’énergie utile qu’il n’en reçoit.', 'Faux', ['Vrai'], 'L’énergie ne se crée pas : l’énergie utile ne peut pas dépasser l’énergie reçue.'],
        ['L’énergie ne se crée pas et ne se perd pas.', 'Vrai', ['Faux'], 'Elle passe seulement d’une forme à une autre.'],
        ['La chaleur dissipée par un appareil existe encore, dans l’air autour de lui.', 'Vrai', ['Faux'], 'L’énergie dissipée est de la chaleur qui a quitté l’appareil, mais elle existe toujours.'],
        ['Un moteur change toute l’énergie reçue en énergie utile.', 'Faux', ['Vrai'], 'Un moteur chauffe un peu : une partie de l’énergie est dissipée.'],
      ], (x) => 'Moussa lit cette phrase : « ' + x + ' » Est-elle vraie ou fausse ?', 'Pense au mixeur d’Aminata : ce qui entre, ce qui sert, et la chaleur.'),
    ],

    defi: {
      // [appareil, énergie reçue, énergie utile, total annoncé par Moussa, en joules]
      versions: [
        ['un mixeur', 1000, 750, 1000],
        ['un ventilateur', 600, 360, 960],
        ['une bouilloire', 2000, 1800, 2200],
        ['une lampe à diodes', 200, 80, 200],
      ],
      genere(c) {
        const [app, r, u, s] = c.alea.choisir(this.versions);
        const d = r - u, pct = (u * 100) / r;
        return {
          enonce: JOULE + 'Rachel observe ' + app + '. Pendant un court instant, cet appareil reçoit ' + gr(r) + ' joules et rend ' + gr(u) + ' joules en énergie utile.',
          questions: [
            {
              texte: 'Question 1. Quelle énergie l’appareil dissipe-t-il, en joules ?',
              reponse: { type: 'nombre', valeur: d },
              aide: 'L’énergie reçue égale l’énergie utile plus l’énergie dissipée.',
              correction: [gr(r) + ' − ' + gr(u) + ' = ' + gr(d) + ' J.'],
            },
            {
              texte: 'Question 2. Quel est son rendement, en pourcentage ? On le calcule en divisant l’énergie utile par l’énergie reçue, puis en multipliant par 100.',
              reponse: { type: 'nombre', valeur: pct },
              aide: 'Divise l’énergie utile par l’énergie reçue, puis multiplie par 100.',
              correction: [gr(u) + ' ÷ ' + gr(r) + ' × 100 = ' + gr(pct) + ' %.'],
            },
            {
              texte: 'Question 3. Moussa dit : « L’énergie utile et l’énergie dissipée font ' + gr(s) + ' joules en tout. » A-t-il raison ?',
              reponse: O.choix(c.alea, s === r ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Additionne l’énergie utile et l’énergie dissipée, puis compare avec l’énergie reçue.',
              correction: [gr(u) + ' + ' + gr(d) + ' = ' + gr(r) + ' J.', s === r ? 'Oui : c’est bien l’énergie reçue.' : 'Non : le total est ' + gr(r) + ' J, pas ' + gr(s) + ' J.'],
            },
            {
              texte: 'Question 4. Aminata dit que l’énergie dissipée est perdue pour toujours. Explique pourquoi elle se trompe.',
              correction: ['L’énergie ne se crée pas et ne se perd pas : elle se transforme.', 'L’énergie dissipée est de la chaleur qui part dans l’air. L’énergie reçue égale l’énergie utile plus l’énergie dissipée.'],
              grille: ['As-tu écrit que l’énergie ne disparaît pas ?', 'As-tu dit où va l’énergie dissipée : en chaleur, dans l’air ?', 'As-tu écrit que l’énergie reçue égale l’énergie utile plus l’énergie dissipée ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais que l’énergie ne disparaît jamais : elle se transforme, et tu sais faire le bilan d’un appareil.',
    carte: ['energie-dissipee', 'energie-utile', 'rendement'],
    papierDuSoir: { exercices: ['energie-recue', 'rendement'], defi: true },
    automatismes: [
      {
        id: 'soustraire',
        versions: [[500, 400], [1000, 700], [200, 150], [800, 600]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Allemagne, Hermann von Helmholtz a présenté en 1847 son discours sur la conservation de l’énergie.',
    prenoms: ['Aminata', 'Moussa', 'Rachel', 'Laure'],
  };
});
