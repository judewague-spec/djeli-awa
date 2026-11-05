/* Notion du bloc « Données, probabilités, programmation » : fréquence et probabilité. Le dé de Rachel, simulé à l'écran.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'frequence-probabilite',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Fréquence et probabilité',
    classe: '3e',
    univers: ['dehors', 'commerce'],

    accroche: {
      texte: 'Rachel veut savoir si son dé est truqué. Elle lance dix fois : la part de six est bizarre. ' +
        'Puis cent fois, puis mille fois. Plus elle lance, plus cette part se calme.',
      image: { dessin: 'batons', valeurs: [['10 lancers', 30], ['100 lancers', 19], ['1000 lancers', 17]], axe: 'part de six obtenus, en pour cent (exemple)', description: 'Un diagramme en bâtons, donné en exemple. Avec 10 lancers, 30 pour cent de six. Avec 100 lancers, 19 pour cent. Avec 1000 lancers, 17 pour cent. La chance prévue du six est un sixième, soit environ 17 pour cent.' },
    },

    manipulation: {
      type: 'simulation',
      graine: 7,
      objectif: 1000,
      consigne: 'Lance le dé par séries de dix, puis de cent. Regarde la part de six se rapprocher de la chance prévue.',
    },

    decouverte: {
      texte: (c) => 'Regarde le nombre de six obtenus, divisé par le nombre de lancers. C’est ' + c.mot('frequence') + '. ' +
        'Regarde un sixième, écrit avant le premier lancer. C’est ' + c.mot('probabilite') + '. ' +
        'Avec peu de lancers, les deux peuvent être très éloignés. Avec beaucoup de lancers, l’écart se réduit.',
    },

    vocabulaire: {
      termes: {
        frequence: { sesMots: 'ce que tu as observé', officiel: 'la fréquence', lesDeux: 'ce que tu as observé, que l’on appelle la fréquence' },
        probabilite: { sesMots: 'la chance prévue', officiel: 'la probabilité', lesDeux: 'la chance prévue, que l’on appelle la probabilité' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce que tu as observé, et la chance prévue. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la fréquence, pour ce que tu as observé. La chance prévue s’appelle la probabilité.',
        'Tu connais les mots officiels : la fréquence et la probabilité.',
      ],
    },

    exercices: [
      {
        id: 'calculer-frequence',
        univers: 'dehors',
        // [objet lancé, résultat observé, lancers, fois obtenu]
        versions: [['une pièce', 'pile', 40, 22], ['un dé à 6 faces', 'six', 60, 12], ['une pièce', 'face', 50, 27], ['un dé à 6 faces', 'six', 30, 4], ['une roue à 4 couleurs', 'rouge', 80, 18], ['une pièce', 'pile', 20, 9]],
        genere(c) {
          const [o, r, n, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Esther ' + (/roue/.test(o) ? 'fait tourner ' : 'lance ') + o + ' ' + n + ' fois et obtient « ' + r + ' » ' + k + ' fois. Quelle est la fréquence de « ' + r + ' » ?',
            reponse: { type: 'fraction', valeur: [k, n] },
            aide: 'Divise le nombre de fois obtenu par le nombre de lancers.',
            correction: ['Nombre de fois obtenu : ' + k + '. Nombre de lancers : ' + n + '.', 'La fréquence est ' + k + '/' + n + '.'],
          };
        },
      },
      {
        id: 'frequence-pourcent',
        univers: 'commerce',
        // [lancers, fois obtenu]
        versions: [[200, 34], [50, 12], [40, 10], [250, 50], [500, 90], [100, 17]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          const p = r2((100 * k) / n);
          return {
            enonce: 'Moussa fait tourner une roue ' + n + ' fois. La roue s’arrête ' + k + ' fois sur le vert. Quelle est la fréquence du vert, en pourcentage ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Divise le nombre de fois par le nombre de tours, puis multiplie par cent.',
            correction: [k + ' ÷ ' + n + ' = ' + ecr(r2(k / n)) + '.', ecr(r2(k / n)) + ' × 100 = ' + ecr(p) + ' %.'],
          };
        },
      },
      {
        id: 'quelle-serie',
        univers: 'dehors',
        // [petite série, grande série, objet]
        versions: [[20, 2000, 'un dé à 6 faces'], [100, 10, 'une pièce'], [50, 5000, 'une roue à 4 couleurs'], [1000, 30, 'un dé à 6 faces'], [200, 20, 'une pièce'], [15, 1500, 'une roue à 4 couleurs']],
        genere(c) {
          const [a, b, o] = c.alea.choisir(this.versions);
          const grand = Math.max(a, b), petit = Math.min(a, b);
          const lib = (n) => 'La série de ' + n + ' lancers';
          return {
            enonce: 'Rachel veut estimer la probabilité d’un résultat avec ' + o + '. Elle a fait une série de ' + a + ' lancers et une série de ' + b + ' lancers. Quelle série est la plus fiable pour estimer cette probabilité ?',
            reponse: O.choix(c.alea, lib(grand), [lib(petit), 'Les deux séries sont aussi fiables']),
            aide: 'Plus on lance, plus ce qu’on observe a des chances d’être proche de la chance prévue.',
            correction: ['Plus il y a de lancers, plus la fréquence a des chances d’être proche de la probabilité.', 'Réponse : ' + lib(grand) + '.'],
          };
        },
      },
      {
        id: 'estimer-probabilite',
        univers: 'commerce',
        // [lancers, fois obtenu]
        versions: [[1000, 620], [500, 140], [2000, 1500], [800, 200], [1000, 350], [400, 100]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          const p = r2(k / n);
          return {
            enonce: 'Moussa lance une pièce un peu bizarre ' + n + ' fois. Il obtient pile ' + k + ' fois. Avec cette fréquence, quelle probabilité de pile peut-il estimer ? Donne un nombre décimal.',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Avec beaucoup de lancers, ce qu’on observe donne une bonne idée de la chance prévue.',
            correction: [k + ' ÷ ' + n + ' = ' + ecr(p) + '.', 'La probabilité de pile est estimée à ' + ecr(p) + '.'],
          };
        },
      },
      {
        id: 'combien-attendus',
        univers: 'dehors',
        // [probabilité (numérateur, dénominateur), lancers, texte]
        versions: [[1, 2, 200, 'pile avec une pièce'], [1, 6, 600, 'un six avec un dé'], [1, 4, 80, 'le rouge avec une roue à 4 couleurs égales'], [1, 10, 300, 'un 7 avec une roue numérotée de 1 à 10'], [1, 3, 90, 'le vert avec une roue à 3 couleurs égales'], [1, 5, 150, 'un 3 avec une roue numérotée de 1 à 5']],
        genere(c) {
          const [a, b, n, t] = c.alea.choisir(this.versions);
          const v = (n * a) / b;
          return {
            enonce: 'La probabilité d’obtenir ' + t + ' est ' + a + '/' + b + '. Laure fait ' + n + ' lancers. Environ combien de fois peut-elle s’attendre à ce résultat ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Prends cette part du nombre de lancers : multiplie par la chance prévue.',
            correction: [n + ' × ' + a + '/' + b + ' = ' + n + ' ÷ ' + b + ' = ' + v + '.', 'Elle peut s’attendre à environ ' + v + ' fois.'],
          };
        },
      },
    ],

    defi: {
      // [résultat, probabilité écrite, lancers 1, obtenus 1, lancers 2, obtenus 2, lancers 3, obtenus 3]
      versions: [
        ['six', 'un sixième', 20, 6, 200, 36, 1000, 170],
        ['six', 'un sixième', 10, 1, 100, 20, 500, 85],
        ['pile', 'un demi', 10, 7, 100, 56, 1000, 510],
        ['pile', 'un demi', 20, 8, 200, 94, 500, 255],
      ],
      genere(c) {
        const [o, p, n1, k1, n2, k2, n3, k3] = c.alea.choisir(this.versions);
        const lib = (n) => 'La série de ' + n + ' lancers';
        return {
          enonce: 'Moussa et Aminata lancent ' + (o === 'six' ? 'un dé à 6 faces' : 'une pièce') + ' et notent combien de fois ils obtiennent « ' + o + ' ». La probabilité de « ' + o + ' » est ' + p + '. ' +
            'Série 1 : ' + k1 + ' sur ' + n1 + ' lancers. Série 2 : ' + k2 + ' sur ' + n2 + ' lancers. Série 3 : ' + k3 + ' sur ' + n3 + ' lancers.',
          questions: [
            {
              texte: 'Question 1. Quelle est la fréquence de « ' + o + ' » dans la série 1 ? Donne un nombre décimal.',
              reponse: { type: 'nombre', valeur: r2(k1 / n1) },
              aide: 'Divise le nombre de fois obtenu par le nombre de lancers.',
              correction: [k1 + ' ÷ ' + n1 + ' = ' + ecr(r2(k1 / n1)) + '.'],
            },
            {
              texte: 'Question 2. Quelle est la fréquence de « ' + o + ' » dans la série 3 ? Donne un nombre décimal.',
              reponse: { type: 'nombre', valeur: r2(k3 / n3) },
              aide: 'Même calcul avec les nombres de la série 3.',
              correction: [k3 + ' ÷ ' + n3 + ' = ' + ecr(r2(k3 / n3)) + '.'],
            },
            {
              texte: 'Question 3. Pour estimer la probabilité, quelle série est la plus fiable ?',
              reponse: O.choix(c.alea, lib(n3), [lib(n1), lib(n2)]),
              aide: 'Plus on lance, plus ce qu’on observe a des chances d’être proche de la chance prévue.',
              correction: ['La série la plus fiable est celle qui a le plus de lancers.', 'Réponse : ' + lib(n3) + '.'],
            },
            {
              texte: 'Question 4. Explique pourquoi la fréquence de la série 1 est éloignée de la probabilité, et pourquoi la série 3 en est proche.',
              correction: ['Avec peu de lancers, le hasard pèse beaucoup : la fréquence peut être loin de la probabilité.', 'Avec beaucoup de lancers, les écarts se compensent : la fréquence s’approche de la probabilité.'],
              grille: ['As-tu comparé les nombres de lancers des deux séries ?', 'As-tu dit que la fréquence s’approche de la probabilité quand les lancers sont nombreux ?', 'As-tu cité une fréquence de la série 1 et une de la série 3 ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais que, plus on lance, plus ce qu’on observe se rapproche de la chance prévue.',
    carte: ['calculer-frequence', 'quelle-serie', 'estimer-probabilite'],
    papierDuSoir: { exercices: ['frequence-pourcent', 'combien-attendus'], defi: true },
    automatismes: [
      {
        id: 'frequence-rapide',
        versions: [[10, 3], [20, 5], [50, 10], [4, 1]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          return { enonce: 'Sur ' + n + ' lancers, on obtient ' + k + ' fois pile. Quelle est la fréquence de pile, en nombre décimal ?', reponse: { type: 'nombre', valeur: r2(k / n) } };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? En Suisse, à Bâle, Jacob Bernoulli a montré que la fréquence se rapproche de la probabilité quand on répète.',
    prenoms: ['Rachel', 'Esther', 'Moussa', 'Aminata', 'Laure'],
  };
});
