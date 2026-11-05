/* Notion 7 du bloc de technologie « Comment un objet fonctionne » : d’une mesure à une donnée. La sonde de la serre de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const arr = (x) => Math.round(x * 100) / 100;

  return {
    id: 'mesure-donnee',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'D’une mesure à une donnée',
    classe: '3e',
    univers: ['champetre', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : du capteur à la donnée (grandeur, tension, valeur numérique, unité, pas de mesure, seuil).',

    accroche: {
      texte: 'Moussa installe une sonde dans la serre. Il veut connaître la température de l’air. La sonde donne une petite tension. ' +
        'Une carte la change en nombre. Un écran affiche enfin des degrés.',
      image: { dessin: 'chaine', etapes: ['La température de l’air', 'La sonde donne une tension', 'La carte écrit un nombre', 'L’écran affiche des degrés'], description: 'Quatre étapes : la température de l’air, la sonde qui donne une tension, la carte qui écrit un nombre, l’écran qui affiche des degrés.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Température de l’air', 'Sonde : une tension', 'Carte : un nombre entier', 'Calcul : des degrés Celsius'], description: 'Le chemin d’une mesure : la température de l’air, une tension donnée par la sonde, un nombre entier écrit par la carte, puis un calcul qui donne des degrés Celsius.' },
      etapes: [
        'Ce que Moussa veut mesurer, c’est la température de l’air. La sonde la sent.',
        'La sonde change la température en une petite tension, qui monte quand l’air chauffe.',
        'Une carte électronique lit cette tension et la change en un nombre entier.',
        'Un petit calcul transforme ce nombre en degrés, avec son unité : le degré Celsius.',
        'Deux nombres voisins sont toujours séparés d’un petit écart : la carte ne voit pas plus fin.',
        'On peut aussi fixer une valeur limite : au-dessus, le ventilateur démarre tout seul.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde la température de la serre : c’est ' + c.mot('grandeur') + '. ' +
        'Regarde la petite sonde posée dans la serre : c’est ' + c.mot('capteur') + '. ' +
        'Regarde le nombre que la carte écrit après la sonde : c’est ' + c.mot('valeur') + '. ' +
        'Regarde la carte qui compte par petits sauts : c’est ' + c.mot('pas') + '. ' +
        'Regarde le ventilateur qui démarre à une température fixée : c’est ' + c.mot('seuil') + '. ' +
        'L’astuce : ce qu’on mesure devient une tension, puis un nombre, puis une valeur avec son unité.',
    },

    vocabulaire: {
      termes: {
        grandeur: { sesMots: 'ce qu’on veut mesurer', officiel: 'la grandeur à mesurer', lesDeux: 'ce qu’on veut mesurer. Les techniciens disent : la grandeur à mesurer' },
        capteur: { sesMots: 'une pièce qui change ce qu’on mesure en tension', officiel: 'un capteur', lesDeux: 'une pièce qui change ce qu’on mesure en tension. Les techniciens disent : un capteur' },
        valeur: { sesMots: 'le nombre que la carte écrit pour la tension', officiel: 'la valeur numérique', lesDeux: 'le nombre que la carte écrit pour la tension. Les techniciens disent : la valeur numérique' },
        pas: { sesMots: 'la plus petite différence que la carte voit', officiel: 'le pas de mesure', lesDeux: 'la plus petite différence que la carte voit. Les techniciens disent : le pas de mesure' },
        seuil: { sesMots: 'la valeur qui déclenche une action', officiel: 'le seuil', lesDeux: 'la valeur qui déclenche une action. Les techniciens disent : le seuil' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce qu’on mesure, le nombre écrit, le petit saut, et la valeur limite. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la grandeur à mesurer, et un capteur. La valeur numérique, et le pas de mesure. Et le seuil, pour la valeur qui déclenche une action.',
        'Tu connais les mots officiels : la grandeur, le capteur, la tension, la valeur numérique, l’unité, le pas de mesure et le seuil.',
      ],
    },

    exercices: [
      {
        id: 'tension-vers-degres',
        univers: 'champetre',
        // tension de la sonde en millivolts
        versions: [250, 180, 300, 215, 90, 275],
        genere(c) {
          const u = c.alea.choisir(this.versions);
          const t = u / 10;
          return {
            enonce: 'La sonde de Moussa donne 10 mV par degré Celsius. Elle donne ' + u + ' mV. Quelle température mesure-t-elle, en degrés Celsius ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Divise la tension en millivolts par dix.',
            correction: [u + ' ÷ 10 = ' + ecr(t) + ' °C.'],
          };
        },
      },
      {
        id: 'degres-vers-tension',
        univers: 'champetre',
        // température en degrés Celsius
        versions: [25, 18, 30, 22, 35, 12],
        genere(c) {
          const t = c.alea.choisir(this.versions);
          const u = arr(t * 0.01);
          return {
            enonce: 'La sonde de Moussa donne 10 mV par degré Celsius, soit 0,01 V par degré. Il fait ' + t + ' °C. Quelle tension la sonde donne-t-elle, en volts ?',
            reponse: { type: 'nombre', valeur: u },
            aide: 'Multiplie la température par la tension d’un degré, en volts.',
            correction: [t + ' × 0,01 = ' + ecr(u) + ' V.'],
          };
        },
      },
      {
        id: 'valeur-de-la-carte',
        univers: 'appareils',
        // tension en volts
        versions: [1.5, 2, 0.75, 3.2, 2.5, 4],
        genere(c) {
          const u = c.alea.choisir(this.versions);
          const n = Math.round(u * 200);
          return {
            enonce: 'La carte code les tensions de 0 à 5 V par des nombres de 0 à 1 000, soit 200 par volt. Un capteur donne ' + ecr(u) + ' V. Quelle valeur numérique la carte écrit-elle ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Multiplie la tension en volts par 200.',
            aideParlee: 'Multiplie la tension en volts par le nombre de valeurs par volt.',
            correction: [ecr(u) + ' × 200 = ' + n + '.'],
          };
        },
      },
      {
        id: 'pas-de-la-carte',
        univers: 'appareils',
        // [température maximale en °C, nombre de pas égaux]
        versions: [[50, 100], [20, 200], [40, 160], [60, 240], [100, 250], [30, 100]],
        genere(c) {
          const [r, n] = c.alea.choisir(this.versions);
          const p = arr(r / n);
          return {
            enonce: 'La carte code les températures de 0 à ' + r + ' °C par des nombres de 0 à ' + n + ', en ' + n + ' pas égaux. Quel est le pas de mesure, en degrés Celsius ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Divise l’étendue de la mesure par le nombre de pas.',
            correction: [r + ' ÷ ' + n + ' = ' + ecr(p) + ' °C.'],
          };
        },
      },
      {
        id: 'seuil-ventilateur',
        univers: 'champetre',
        // [seuil en °C, température mesurée en °C]
        versions: [[28, 31], [30, 27], [25, 25], [35, 36], [22, 19]],
        genere(c) {
          const [s, t] = c.alea.choisir(this.versions);
          const bonne = t > s ? 'Oui, il démarre' : 'Non, il reste arrêté';
          return {
            enonce: 'Le ventilateur de la serre démarre dès que la température dépasse le seuil de ' + s + ' °C. La sonde mesure ' + t + ' °C. Le ventilateur démarre-t-il ?',
            reponse: O.choix(c.alea, bonne, ['Oui, il démarre', 'Non, il reste arrêté', 'On ne peut pas le savoir']),
            aide: 'Compare la température mesurée au seuil.',
            correction: [t + ' °C ' + (t > s ? 'dépasse ' : 'ne dépasse pas ') + s + ' °C.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [température de la serre en °C, seuil du ventilateur en °C]
      versions: [[25, 28], [32, 30], [18, 20], [36, 30]],
      genere(c) {
        const [t, s] = c.alea.choisir(this.versions);
        const u = arr(t / 100), n = t * 2;
        const bonne = t > s ? 'Oui, il démarre' : 'Non, il reste arrêté';
        return {
          enonce: 'Dans la serre, la sonde de Moussa donne 10 mV par degré Celsius, soit 0,01 V par degré. La carte code les tensions de 0 à 5 V par des nombres de 0 à 1 000, soit 200 par volt. ' +
            'Il fait ' + t + ' °C. Le ventilateur démarre dès que la température dépasse ' + s + ' °C.',
          image: { dessin: 'chaine', etapes: ['Température de l’air : ' + t + ' °C', 'Sonde : ' + ecr(u) + ' V', 'Carte : ' + n, 'Écran : ' + t + ' °C'], description: 'Le chemin de la mesure : la température de l’air est de ' + t + ' degrés Celsius, la sonde donne ' + ecr(u) + ' volt, la carte écrit ' + n + ', l’écran affiche ' + t + ' degrés Celsius.' },
          questions: [
            {
              texte: 'Question 1. Quelle tension la sonde donne-t-elle, en volts ?',
              reponse: { type: 'nombre', valeur: u },
              aide: 'Multiplie la température par la tension d’un degré, en volts.',
              correction: [t + ' × 0,01 = ' + ecr(u) + ' V.'],
            },
            {
              texte: 'Question 2. Quelle valeur numérique la carte écrit-elle ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Multiplie la tension en volts par 200.',
              correction: [ecr(u) + ' × 200 = ' + n + '.'],
            },
            {
              texte: 'Question 3. Le ventilateur démarre-t-il ?',
              reponse: O.choix(c.alea, bonne, ['Oui, il démarre', 'Non, il reste arrêté', 'On ne peut pas le savoir']),
              aide: 'Compare la température au seuil.',
              correction: [t + ' °C ' + (t > s ? 'dépasse ' : 'ne dépasse pas ') + s + ' °C.', 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Raconte en trois phrases le chemin de la température jusqu’à l’écran. Nomme la grandeur, le capteur, la tension, la valeur numérique et l’unité.',
              correction: ['La grandeur à mesurer est la température de l’air.', 'Le capteur la change en une tension, que la carte change en valeur numérique.', 'Un calcul donne ensuite la température, écrite avec son unité, le degré Celsius.'],
              grille: ['As-tu nommé la grandeur et le capteur ?', 'As-tu parlé de la tension puis de la valeur numérique ?', 'As-tu cité l’unité, le degré Celsius ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! De la température à la tension, de la tension au nombre, du nombre au degré : tu sais lire le chemin d’une mesure.',
    carte: ['tension-vers-degres', 'valeur-de-la-carte', 'seuil-ventilateur'],
    papierDuSoir: { exercices: ['degres-vers-tension', 'pas-de-la-carte'], defi: true },
    automatismes: [
      {
        id: 'millivolts-en-degres',
        // tension en millivolts
        versions: [180, 250, 90, 300],
        genere(c) { const u = c.alea.choisir(this.versions); return { enonce: u + ' ÷ 10 = ?', reponse: { type: 'nombre', valeur: u / 10 } }; },
      },
    ],
    savaisTu: null,
    prenoms: ['Moussa'],
  };
});
