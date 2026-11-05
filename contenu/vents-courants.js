/* Notion 2 du bloc SVT « Planète Terre, environnement, action humaine » : vents et courants. Le cerf-volant de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const SENS = ['De A vers B', 'De B vers A'];
  const sens = (a, b) => (a > b ? SENS[0] : SENS[1]);

  return {
    id: 'vents-courants',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Vents et courants',
    classe: 'cycle 4',
    univers: ['champetre', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : le Soleil chauffe inégalement la Terre ; hautes et basses pressions ; vents et courants marins, et ce qu’ils transportent.',

    accroche: {
      texte: 'Le vent se lève sur le champ. Moussa lâche son cerf-volant, et il file vers le champ labouré. Aminata sent un air frais sur son visage. ' +
        'D’où vient ce vent ? Et pourquoi souffle-t-il dans ce sens, ce matin ?',
      image: { dessin: 'chaine', etapes: ['Le Soleil chauffe le sol', 'L’air chaud monte', 'L’air frais arrive : c’est le vent'], description: 'Le Soleil chauffe le sol, l’air chaud monte, et de l’air frais arrive pour prendre sa place : c’est le vent.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Lieu', 'Le pré', 'Le champ labouré'], lignes: [['Pression (hPa)', 1014, 1012]], description: 'Un tableau. Au pré, la pression de l’air est de 1014 hectopascals. Au champ labouré, à la même hauteur, elle est de 1012 hectopascals.' },
      etapes: [
        'Au soleil, le sol sombre du champ labouré chauffe plus vite que l’herbe humide du pré. Les deux sont à la même hauteur.',
        'L’air chaud est léger : il monte au-dessus du champ labouré. L’air frais du pré, lui, reste plus lourd.',
        'Sur le tableau, le pré est à 1014 hectopascals, et le champ labouré à 1012. Plus le nombre est petit, plus l’air est léger.',
        'L’air se déplace du côté lourd vers le côté léger : c’est le vent, qui pousse le cerf-volant.',
        'En mer, le vent et la chaleur font aussi voyager l’eau, sur de très longues distances.',
        'Vents et courants transportent de la chaleur, de la vapeur d’eau et des poussières.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le Soleil chauffe la Terre de façon inégale. Regarde l’air chaud qui monte : il crée ' + c.mot('basse') + '. ' +
        'Regarde l’air froid qui descend : il crée ' + c.mot('haute') + '. ' +
        'Le vent, c’est de l’air qui se déplace de la zone lourde vers la zone légère. ' +
        'Dans l’océan, regarde l’eau qui voyage sur de longues distances : c’est ' + c.mot('courant') + '. ' +
        'Vents et courants transportent de la chaleur et de l’eau. L’astuce : l’air file du lourd vers le léger, comme l’eau qui descend une pente.',
    },

    vocabulaire: {
      termes: {
        basse: { sesMots: 'la zone d’air léger', officiel: 'une basse pression', lesDeux: 'la zone d’air léger, que l’on appelle une basse pression' },
        haute: { sesMots: 'la zone d’air lourd', officiel: 'une haute pression', lesDeux: 'la zone d’air lourd, que l’on appelle une haute pression' },
        courant: { sesMots: 'un grand fleuve d’eau salée', officiel: 'un courant marin', lesDeux: 'un grand fleuve d’eau salée, que l’on appelle un courant marin' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la zone d’air léger, la zone d’air lourd, et le grand fleuve d’eau salée. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une basse pression, pour la zone d’air léger. La zone d’air lourd s’appelle une haute pression. Le grand fleuve d’eau salée est un courant marin.',
        'Tu connais les mots officiels : une basse pression, une haute pression, et un courant marin.',
      ],
    },

    exercices: [
      {
        id: 'sens-du-vent',
        univers: 'champetre',
        // [pression au lieu A (hPa), pression au lieu B (hPa)]
        versions: [[1020, 1006], [1004, 1018], [1026, 1010], [1008, 1024], [1015, 1001], [1000, 1012]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const juste = sens(a, b), haut = a > b ? 'A' : 'B';
          return {
            enonce: 'Ce matin, la pression de l’air est de ' + a + ' hPa au lieu A et de ' + b + ' hPa au lieu B. Dans quel sens souffle le vent ?',
            reponse: O.choix(c.alea, juste, SENS),
            aide: 'Le vent va de la haute pression vers la basse pression.',
            correction: ['La pression la plus haute est au lieu ' + haut + '.', 'Le vent souffle de la haute pression vers la basse pression.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'dehors',
        [
          ['L’air chaud monte, l’air froid descend.', 'Vrai', 'Chauffé, l’air devient léger et monte. Refroidi, il devient plus lourd et descend.'],
          ['Là où l’air descend, on trouve une haute pression.', 'Vrai', 'L’air qui descend est lourd et appuie sur le sol : c’est une haute pression.'],
          ['Le vent souffle d’une basse pression vers une haute pression.', 'Faux', 'C’est l’inverse : le vent souffle de la haute pression vers la basse pression.'],
          ['Le Soleil chauffe la Terre de la même façon partout.', 'Faux', 'Les rayons arrivent plus droits près de l’équateur : la Terre est chauffée de façon inégale.'],
        ],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Pense au sens : l’air chaud monte, et le vent va de la haute pression vers la basse pression.'),
      {
        id: 'ecart-pression',
        univers: 'champetre',
        // [pression chez Rachel, pression chez Clarisse] en hPa
        versions: [[1024, 1008], [1016, 1000], [1030, 1012], [1020, 1005], [1012, 996]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rachel lit ' + a + ' hPa chez elle. Chez Clarisse, dans une autre région, la pression est de ' + b + ' hPa. Quel est l’écart de pression entre les deux maisons, en hPa ?',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Enlève la plus petite pression à la plus grande.',
            correction: [a + ' − ' + b + ' = ' + (a - b) + ' hPa.'],
          };
        },
      },
      {
        id: 'derive-courant',
        univers: 'dehors',
        // [km par jour, nombre de jours]
        versions: [[20, 5], [15, 4], [30, 3], [25, 4], [10, 6]],
        genere(c) {
          const [k, j] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une bouteille jetée à la mer est emportée par un courant marin. Dans cet exemple, elle dérive de ' + k + ' km par jour. Quelle distance parcourt-elle en ' + j + ' jours, en km ?',
            reponse: { type: 'nombre', valeur: k * j },
            aide: 'Multiplie la distance d’un jour par le nombre de jours.',
            correction: [k + ' × ' + j + ' = ' + k * j + ' km.'],
          };
        },
      },
      {
        id: 'ce-qui-voyage',
        univers: 'dehors',
        // [situation, bonne réponse, piège 1, piège 2, explication]
        versions: [
          ['Un vent chaud et humide venu de la mer souffle sur la côte.', 'De la chaleur et de la vapeur d’eau', 'Du froid et de l’air sec', 'Rien : un vent ne transporte rien', 'Un vent venu d’une mer chaude emporte de la chaleur et de la vapeur d’eau.'],
          ['Un vent du désert, chaud et sec, souffle sur la ville.', 'De la chaleur et de la poussière', 'De la vapeur d’eau et de la pluie', 'Du froid et de la neige', 'Un vent du désert emporte de la chaleur et de fines poussières.'],
          ['Un courant marin chaud longe une côte.', 'De la chaleur vers cette côte', 'Du froid vers cette côte', 'Rien : l’eau reste sur place', 'Un courant chaud transporte de la chaleur le long des côtes.'],
        ],
        genere(c) {
          const [s, juste, p1, p2, pourquoi] = c.alea.choisir(this.versions);
          return {
            enonce: s + ' Que transporte-t-il ?',
            reponse: O.choix(c.alea, juste, [p1, p2]),
            aide: 'Pense à ce que porte un vent chaud ou un courant chaud : de la chaleur, de l’eau ou des poussières.',
            correction: [pourquoi, 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [pression au lieu A, pression au lieu B] en hPa
      versions: [[1022, 1004], [1008, 1026], [1030, 1010], [1006, 1018]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        const juste = sens(a, b);
        return {
          enonce: 'Moussa regarde une carte du temps. Au lieu A, la pression est de ' + a + ' hPa. Au lieu B, elle est de ' + b + ' hPa. Ces deux lieux sont séparés par un grand champ plat.',
          image: { dessin: 'tableur', colonnes: ['Lieu', 'A', 'B'], lignes: [['Pression (hPa)', a, b]], description: 'Un tableau. Au lieu A, la pression est de ' + a + ' hectopascals. Au lieu B, elle est de ' + b + ' hectopascals.' },
          questions: [
            {
              texte: 'Question 1. Quel est l’écart de pression entre A et B, en hPa ?',
              reponse: { type: 'nombre', valeur: Math.abs(a - b) },
              aide: 'Enlève la plus petite pression à la plus grande.',
              correction: [Math.max(a, b) + ' − ' + Math.min(a, b) + ' = ' + Math.abs(a - b) + ' hPa.'],
            },
            {
              texte: 'Question 2. Dans quel sens souffle le vent entre A et B ?',
              reponse: O.choix(c.alea, juste, SENS),
              aide: 'Le vent va de la haute pression vers la basse pression.',
              correction: ['La pression la plus haute est au lieu ' + (a > b ? 'A' : 'B') + '.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 3. Explique comment le Soleil peut créer un vent entre deux lieux. Rédige trois phrases.',
              correction: ['Le Soleil chauffe un lieu plus que l’autre. L’air chaud monte : cela crée une basse pression.', 'Dans l’autre lieu, l’air froid descend : c’est une haute pression.', 'L’air se déplace de la haute pression vers la basse pression : c’est le vent.'],
              grille: ['As-tu dit que le Soleil chauffe les lieux de façon inégale ?', 'As-tu dit que l’air chaud monte et crée une basse pression ?', 'As-tu dit que le vent va de la haute pression vers la basse pression ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais d’où vient le vent, et ce qu’il emporte avec lui. Le cerf-volant de Moussa a de la chance.',
    carte: ['sens-du-vent', 'vrai-ou-faux', 'ce-qui-voyage'],
    papierDuSoir: { exercices: ['ecart-pression', 'derive-courant'], defi: true },
    automatismes: [
      {
        id: 'monte-ou-descend',
        versions: [['chaud', 'Il monte'], ['froid', 'Il descend']],
        genere(c) { const [t, b] = c.alea.choisir(this.versions); return { enonce: 'Un air ' + t + ' : monte-t-il ou descend-il ?', reponse: O.choix(c.alea, b, ['Il monte', 'Il descend']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Maroc, en mars 2026, le harmattan a apporté la poussière du Sahara et réduit la visibilité.',
    prenoms: ['Moussa', 'Aminata', 'Rachel', 'Clarisse'],
  };
});
