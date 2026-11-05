/* Notion 6 du bloc « Proportionnalité, pourcentages et fonctions » : une grandeur qui dépend d'une autre, tableau et graphique. La chaleur au marché de Rachel.
   Chaque graphique annonce ses valeurs : dans sa description et dans l'énoncé (consigne du 2 nov. 2026).
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const HEURES = [8, 10, 12, 14, 16];
  const lire = (v) => HEURES.map((h, i) => h + ' h : ' + v[i] + ' °C').join(', ');
  const image = (v) => ({ dessin: 'courbe', points: HEURES.map((h, i) => [h, v[i]]), axeX: 'Heure', axeY: 'Température (°C)', description: 'Une courbe de la température. ' + lire(v) + '.' });

  return {
    id: 'dependance-graphique',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'Une grandeur qui dépend d’une autre : tableau et graphique',
    classe: '4e',
    univers: ['commerce', 'dehors', 'champetre'],

    accroche: {
      texte: 'Le matin au marché, Rachel a froid. À midi, elle cherche l’ombre. La température dépend de l’heure. Elle la note dans un tableau, heure par heure, puis elle place chaque mesure sur son cahier. ' +
        'D’un seul coup d’œil, elle voit quand il fait le plus chaud.',
      image: image([16, 22, 28, 30, 26]),
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Heure', '8', '10', '12', '14', '16'], lignes: [['Température (°C)', 16, 22, 28, 30, 26]], description: 'Un tableau. À 8 heures, 16 degrés. À 10 heures, 22 degrés. À 12 heures, 28 degrés. À 14 heures, 30 degrés. À 16 heures, 26 degrés.' },
      etapes: [
        'Dans le tableau, chaque colonne est une mesure : une heure, et la température à cette heure.',
        'Sur le dessin, on trace deux règles : celle des heures, couchée, et celle des températures, debout.',
        'Chaque mesure devient un point. On lit l’heure sur la règle couchée, puis la température sur la règle debout.',
        'Quand la ligne monte, la température monte. Quand elle descend, la température descend.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour montrer comment une grandeur dépend d’une autre, on trace ' + c.mot('graphique') + '. Sur la règle couchée, on lit ' + c.mot('abscisse') + '. Sur la règle debout, on lit ' + c.mot('ordonnee') + '. ' +
        'L’astuce : lis toujours le dessin dans le même ordre. D’abord la règle couchée, puis la règle debout.',
    },

    vocabulaire: {
      termes: {
        graphique: { sesMots: 'un dessin de points', officiel: 'un graphique', lesDeux: 'un dessin de points, que les matheux appellent un graphique' },
        abscisse: { sesMots: 'la valeur de départ', officiel: 'l’abscisse', lesDeux: 'la valeur de départ, que les matheux appellent l’abscisse' },
        ordonnee: { sesMots: 'la valeur d’arrivée', officiel: 'l’ordonnée', lesDeux: 'la valeur d’arrivée, que les matheux appellent l’ordonnée' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le dessin de points, la valeur de départ, et la valeur d’arrivée. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : un graphique, pour le dessin de points. L’abscisse se lit sur la règle couchée, l’ordonnée sur la règle debout. Ces deux règles sont les axes.',
        'Tu connais les mots officiels : le graphique, les axes, l’abscisse et l’ordonnée.',
      ],
    },

    exercices: [
      {
        id: 'lire-une-valeur',
        univers: 'commerce',
        // [températures, heure demandée]
        versions: [[[16, 22, 28, 30, 26], 10], [[18, 20, 26, 28, 24], 14], [[15, 19, 25, 27, 23], 12], [[12, 18, 24, 22, 20], 16], [[20, 24, 30, 32, 28], 8], [[14, 20, 26, 30, 28], 14]],
        genere(c) {
          const [v, h] = c.alea.choisir(this.versions);
          const t = v[HEURES.indexOf(h)];
          return {
            enonce: 'Voici les températures au marché. ' + lire(v) + '. Quelle est la température à ' + h + ' h, en degrés ?',
            image: image(v),
            reponse: { type: 'nombre', valeur: t },
            aide: 'Cherche l’heure sur la règle couchée, puis lis la température.',
            correction: ['À ' + h + ' h, on lit ' + t + ' °C.'],
          };
        },
      },
      {
        id: 'le-plus-chaud',
        univers: 'dehors',
        versions: [[16, 22, 28, 30, 26], [18, 20, 26, 24, 22], [15, 19, 25, 27, 23], [12, 18, 24, 22, 20], [20, 24, 30, 32, 28], [17, 23, 21, 19, 16]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const m = Math.max(...v), h = HEURES[v.indexOf(m)];
          return {
            enonce: 'Voici les températures. ' + lire(v) + '. À quelle heure fait-il le plus chaud ?',
            image: image(v),
            reponse: { type: 'nombre', valeur: h },
            aide: 'Cherche le point le plus haut, puis lis l’heure sur la règle couchée.',
            correction: ['La plus haute température est ' + m + ' °C, à ' + h + ' h.'],
          };
        },
      },
      {
        id: 'ecart-de-temperature',
        univers: 'champetre',
        versions: [[16, 22, 28, 30, 26], [18, 20, 26, 24, 22], [15, 19, 25, 27, 23], [12, 18, 24, 22, 20], [20, 24, 30, 32, 28], [17, 23, 21, 19, 16]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const a = Math.max(...v), b = Math.min(...v);
          return {
            enonce: 'Voici les températures. ' + lire(v) + '. De combien de degrés la température a-t-elle varié, entre la plus basse et la plus haute ?',
            image: image(v),
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Enlève la plus basse température à la plus haute.',
            correction: [a + ' − ' + b + ' = ' + (a - b) + ' °C.'],
          };
        },
      },
      Q('que-fait-la-courbe', 'dehors',
        [['De 8 h à 14 h, chaque point est plus haut que le précédent.', 'La température monte'], ['De 14 h à 16 h, le point suivant est plus bas.', 'La température descend'], ['De 10 h à 12 h, les deux points sont à la même hauteur.', 'La température ne change pas']],
        (x) => x + ' Que se passe-t-il ?', ['La température monte', 'La température descend', 'La température ne change pas'],
        'Regarde si les points montent, descendent, ou restent à la même hauteur.',
        'Une ligne qui monte veut dire que la grandeur augmente. Une ligne qui descend, qu’elle diminue. Une ligne plate, qu’elle ne change pas.'),
      Q('quel-axe', 'commerce',
        [['Sur un graphique de la température au fil des heures, où lit-on l’heure ?', 'Sur la règle couchée'], ['Sur un graphique de la température au fil des heures, où lit-on la température ?', 'Sur la règle debout']],
        (x) => x, ['Sur la règle couchée', 'Sur la règle debout'],
        'La grandeur qui dépend de l’autre se lit sur la règle debout.',
        'La grandeur de départ, ici l’heure, se lit sur la règle couchée. Celle qui en dépend, ici la température, sur la règle debout.'),
    ],

    defi: {
      versions: [[16, 22, 28, 30, 26], [18, 20, 26, 28, 24], [15, 19, 25, 27, 23], [14, 20, 26, 30, 26]],
      genere(c) {
        const v = c.alea.choisir(this.versions);
        const m = Math.max(...v), h = HEURES[v.indexOf(m)];
        return {
          enonce: 'Le graphique donne la température au marché, au cours d’une journée. Les mesures sont les suivantes : ' + lire(v) + '.',
          image: image(v),
          questions: [
            {
              texte: 'Question 1. Quelle est la température à 12 h, en degrés ?',
              reponse: { type: 'nombre', valeur: v[2] },
              aide: 'Cherche 12 sur la règle couchée, puis lis la valeur.',
              correction: ['À 12 h, on lit ' + v[2] + ' °C.'],
            },
            {
              texte: 'Question 2. À quelle heure fait-il le plus chaud ?',
              reponse: { type: 'nombre', valeur: h },
              aide: 'Cherche le point le plus haut.',
              correction: ['Le maximum est de ' + m + ' °C, à ' + h + ' h.'],
            },
            {
              texte: 'Question 3. La température est-elle proportionnelle à l’heure ? Justifie.',
              correction: ['Non : la température ne fait pas que monter, elle descend après ' + h + ' h.', 'Quand l’heure double, la température ne double pas : ce n’est pas proportionnel.'],
              grille: ['As-tu répondu non ?', 'As-tu justifié, par la forme de la courbe ou par un calcul ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un tableau, une courbe, et tu lis l’histoire de la journée d’un seul coup d’œil.',
    carte: ['lire-une-valeur', 'que-fait-la-courbe', 'quel-axe'],
    papierDuSoir: { exercices: ['le-plus-chaud', 'ecart-de-temperature'], defi: true },
    automatismes: [
      {
        id: 'ecart-rapide',
        versions: [[30, 16], [28, 18], [25, 15], [32, 20]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' °C − ' + b + ' °C = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Royaume-Uni, Florence Nightingale montra en 1858, par un diagramme, que la maladie tuait plus de soldats que les blessures.',
    prenoms: ['Rachel'],
  };
});
