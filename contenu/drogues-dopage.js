/* Notion 6 du bloc SVT « Le corps humain et la santé » : drogues et dopage. Le trajet en scooter.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const NIC = 'La nicotine', GOU = 'Les goudrons', CO = 'Le monoxyde de carbone';

  return {
    id: 'drogues-dopage',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Drogues et dopage',
    classe: 'cycle 4',
    univers: ['famille', 'dehors', 'danses'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : effets des drogues sur le système nerveux, conduites à risque.',

    accroche: {
      texte: 'Moussa doit ramener son cousin en scooter après une fête. Un ami lui tend un verre d’alcool : « Juste un, ça ne change rien ! » ' +
        'Moussa refuse. Il a raison : même un peu d’alcool ralentit les réflexes. Pourquoi certaines substances changent-elles notre façon de réagir ?',
      image: { dessin: 'chaine', etapes: ['Un obstacle apparaît', 'L’œil le voit', 'Les neurones transmettent le message', 'Le cerveau décide de freiner', 'Le pied freine'], description: 'La chaîne de la réaction devant un obstacle : de l’œil au pied qui freine, en passant par les neurones et le cerveau.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Neurone', 'Synapse : les molécules passent le relais', 'Neurone suivant'], description: 'Deux neurones et la synapse entre eux, où les drogues agissent.' },
      etapes: [
        'Le message nerveux passe d’un neurone à l’autre grâce à des molécules, dans les synapses.',
        'L’alcool, le tabac, le cannabis et les autres drogues agissent sur ces synapses : ils perturbent le passage des messages.',
        'Résultat : réflexes plus lents, attention qui baisse, jugement faussé. Au volant ou sur un scooter, c’est un grand danger.',
        'En plus, beaucoup de ces substances rendent dépendant : on a de plus en plus de mal à s’en passer.',
      ],
    },

    decouverte: {
      texte: (c) => 'Les drogues agissent sur les synapses et perturbent le système nerveux. Beaucoup entraînent ' + c.mot('dependance') + '. ' +
        'Dans le tabac, la nicotine rend dépendant, les goudrons peuvent causer des cancers, et le monoxyde de carbone gêne le transport du dioxygène par le sang. ' +
        'Le dopage, lui, est l’usage de produits interdits pour être plus fort au sport : c’est tricher, et c’est dangereux pour la santé.',
    },

    vocabulaire: {
      termes: {
        dependance: { sesMots: 'un besoin dont on n’arrive plus à se passer', officiel: 'une dépendance', lesDeux: 'un besoin dont on n’arrive plus à se passer, que les scientifiques appellent une dépendance' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un besoin dont on n’arrive plus à se passer. Les drogues gênent les relais entre neurones. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une dépendance. Et les substances qui modifient le fonctionnement du cerveau s’appellent des substances psychoactives.',
        'Tu connais les mots officiels : les drogues sont des substances psychoactives ; elles agissent sur les synapses et peuvent créer une dépendance.',
      ],
    },

    exercices: [
      {
        id: 'substance-du-tabac',
        univers: 'famille',
        versions: [['rend dépendant', NIC], ['peut causer des cancers', GOU], ['gêne le transport du dioxygène par le sang', CO]],
        genere(c) {
          const [effet, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quelle substance de la fumée du tabac ' + effet + ' ?',
            reponse: O.choix(c.alea, bonne, [NIC, GOU, CO]),
            aide: 'Nicotine : on ne peut plus s’en passer. Goudrons : cancers. Monoxyde de carbone : dioxygène.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'distance-de-reaction',
        univers: 'dehors',
        // [vitesse en m/s, temps de réaction en s]
        versions: [[10, 1], [14, 1], [10, 2], [14, 2], [8, 1.5], [12, 1.5], [15, 1], [15, 2]],
        genere(c) {
          const [v, t] = c.alea.choisir(this.versions);
          const d = v * t;
          return {
            enonce: 'Un scooter roule à ' + v + ' m par seconde. Son conducteur met ' + ecr(t) + ' s à réagir devant un obstacle. Quelle distance, en mètres, parcourt-il avant même de commencer à freiner ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Distance = vitesse × temps : ' + v + ' × ' + ecr(t) + '.',
            aideParlee: 'Multiplie la vitesse par le temps de réaction.',
            correction: [v + ' × ' + ecr(t) + ' = ' + d + ' m.'],
          };
        },
      },
      {
        id: 'reaction-plus-lente',
        univers: 'danses',
        // [temps de réaction sans alcool, avec, en millisecondes]
        versions: [[250, 400], [300, 500], [220, 380], [280, 450], [260, 420], [240, 390]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans une expérience, le temps de réaction d’une personne passe de ' + a + ' ms à ' + b + ' ms après avoir bu de l’alcool. De combien de millisecondes a-t-il augmenté ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Calcule ' + b + ' − ' + a + '.',
            aideParlee: 'Fais la différence entre le temps avec alcool et le temps sans alcool.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' ms : les réflexes sont plus lents.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'famille',
        versions: [['Les drogues agissent sur les synapses.', true, 'Elles perturbent le passage des messages entre neurones.'], ['Un seul verre d’alcool ne change rien aux réflexes.', false, 'Même un peu d’alcool ralentit les réflexes.'],
          ['Le dopage est sans danger s’il est bien dosé.', false, 'Le dopage est interdit et dangereux pour la santé.'], ['La nicotine du tabac rend dépendant.', true, 'C’est elle qui crée la dépendance au tabac.']],
        genere(c) {
          const [phrase, vrai, pourquoi] = c.alea.choisir(this.versions);
          const bonne = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Vrai ou faux ? « ' + phrase + ' »',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Pense aux synapses et aux réflexes.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'dopage',
        univers: 'danses',
        versions: [1, 2],
        genere(c) {
          const bonne = 'C’est tricher, et c’est dangereux pour la santé';
          return {
            enonce: 'Pourquoi le dopage est-il interdit dans le sport ?',
            reponse: O.choix(c.alea, bonne, ['Parce que les produits coûtent trop cher', 'Parce qu’il rend plus lent']),
            aide: 'Pense à l’égalité entre sportifs, et à la santé.',
            correction: ['Le dopage fausse la compétition et peut abîmer gravement le corps.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [vitesse en m/s, temps de réaction normal, temps de réaction après alcool, en s]
      versions: [[14, 1, 2], [10, 1, 2], [12, 1, 2.5], [15, 1, 2], [8, 1, 2.5], [14, 0.5, 1.5]],
      genere(c) {
        const [v, t1, t2] = c.alea.choisir(this.versions);
        const d1 = v * t1, d2 = v * t2;
        return {
          enonce: 'Moussa roule en scooter à ' + v + ' m par seconde. En temps normal, il met ' + ecr(t1) + ' s à réagir devant un obstacle. Après avoir bu de l’alcool, il mettrait ' + ecr(t2) + ' s.',
          image: { dessin: 'barres', barres: [{ nom: 'Sans alcool', parts: Math.round(d1 / 2) }, { nom: 'Avec alcool', parts: Math.round(d2 / 2) }], description: 'Deux barres : la distance parcourue avant de freiner, sans alcool, puis avec alcool, bien plus longue.' },
          questions: [
            {
              texte: 'Question 1. Quelle distance parcourt-il, en mètres, avant de commencer à freiner, en temps normal ?',
              reponse: { type: 'nombre', valeur: d1 },
              aide: 'Distance = vitesse × temps de réaction.',
              correction: [v + ' × ' + ecr(t1) + ' = ' + d1 + ' m.'],
            },
            {
              texte: 'Question 2. Et après avoir bu de l’alcool ?',
              reponse: { type: 'nombre', valeur: d2 },
              aide: 'Même calcul avec le temps de réaction plus long.',
              correction: [v + ' × ' + ecr(t2) + ' = ' + d2 + ' m.'],
            },
            {
              texte: 'Question 3. Explique pourquoi l’alcool allonge le temps de réaction, et pourquoi c’est dangereux.',
              correction: ['L’alcool agit sur les synapses : il perturbe le passage des messages entre neurones, du regard jusqu’aux muscles.', 'Le temps de réaction s’allonge : le scooter parcourt ' + (d2 - d1) + ' m de plus avant de freiner. Le risque d’accident augmente.'],
              grille: ['As-tu dit que l’alcool agit sur les synapses ou les neurones ?', 'As-tu comparé les deux distances ?', 'As-tu conclu sur le danger ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais comment les drogues troublent les messages entre neurones, et pourquoi dire non protège ta vie.',
    carte: ['substance-du-tabac', 'distance-de-reaction', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['distance-de-reaction', 'reaction-plus-lente'], defi: true },
    automatismes: [
      {
        id: 'distance-rapide',
        versions: [[10, 1], [10, 2], [14, 1], [15, 2]],
        genere(c) { const [v, t] = c.alea.choisir(this.versions); return { enonce: v + ' m par seconde pendant ' + t + ' s : combien de mètres ?', reponse: { type: 'nombre', valeur: v * t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? L’Agence mondiale antidopage, installée à Montréal, au Canada, publie chaque année la liste des produits interdits aux sportifs.',
    prenoms: ['Moussa'],
  };
});
