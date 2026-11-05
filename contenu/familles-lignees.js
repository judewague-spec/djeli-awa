/* Notion 4 du bloc de technologie « Les objets et la société » : familles et lignées d'objets. Les vieux téléphones d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const LIGNEE = ['Le téléphone fixe à fil', 'Le téléphone fixe sans fil', 'Le téléphone portable à touches', 'Le smartphone'];
  const ECLAIRER = ['Une bougie', 'Une lampe à pétrole', 'Une ampoule électrique', 'Une lampe solaire'];

  return {
    id: 'familles-lignees',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Familles et lignées d’objets',
    classe: 'cycle 4',
    univers: ['famille', 'appareils', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 11) : famille et lignée d’objets.',

    accroche: {
      texte: 'Dans un carton, Aminata retrouve les téléphones de sa famille : un gros téléphone à fil, un téléphone sans fil, un portable à touches. ' +
        'Et dans sa poche, son smartphone. Tous servent à appeler, mais ils sont si différents ! Comment les ranger ?',
      image: { dessin: 'chaine', etapes: LIGNEE, description: 'Du plus ancien au plus récent : le téléphone fixe à fil, le téléphone fixe sans fil, le portable à touches, le smartphone.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ECLAIRER, description: 'Des objets qui servent tous à éclairer : une bougie, une lampe à pétrole, une ampoule électrique, une lampe solaire.' },
      etapes: [
        'Une bougie, une lampe à pétrole, une ampoule, une lampe solaire : tous ces objets servent à éclairer.',
        'Ils marchent chacun avec une idée différente : une flamme, du pétrole, l’électricité, le soleil. Ils forment un groupe d’objets de même usage.',
        'Les téléphones d’Aminata servent tous à appeler, et chacun descend du précédent : on les range du plus ancien au plus récent.',
        'Ce rangement dans le temps montre comment l’objet s’est amélioré, modèle après modèle.',
      ],
    },

    decouverte: {
      texte: (c) => 'Des objets qui servent à la même chose, même s’ils marchent autrement, forment ' + c.mot('famille') + ' : la bougie et la lampe solaire éclairent toutes les deux. ' +
        'Des objets rangés dans le temps, chacun amélioré à partir du précédent, forment ' + c.mot('lignee') + ' : du téléphone à fil au smartphone. ' +
        'L’astuce : même usage, c’est le groupe ; même objet qui évolue dans le temps, c’est la suite.',
    },

    vocabulaire: {
      termes: {
        famille: { sesMots: 'un groupe d’objets de même usage', officiel: 'une famille d’objets', lesDeux: 'un groupe d’objets de même usage, que les techniciens appellent une famille d’objets' },
        lignee: { sesMots: 'une suite d’objets dans le temps', officiel: 'une lignée d’objets', lesDeux: 'une suite d’objets dans le temps, que les techniciens appellent une lignée d’objets' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un groupe d’objets de même usage, et une suite d’objets dans le temps. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : une famille d’objets, pour le même usage ; une lignée d’objets, pour la suite des modèles dans le temps.',
        'Tu connais les mots officiels : la famille d’objets et la lignée d’objets.',
      ],
    },

    exercices: [
      O.qcm('quelle-famille', 'maison-courses',
        [['servent à éclairer', 'Une lampe à pétrole'], ['servent à chauffer de l’eau', 'Une bouilloire'], ['servent à se déplacer', 'Un vélo'], ['servent à garder les aliments au froid', 'Un réfrigérateur']],
        (x) => 'Quel objet fait partie de la famille des objets qui ' + x + ' ?', ['Une lampe à pétrole', 'Une bouilloire', 'Un vélo', 'Un réfrigérateur'],
        'Cherche l’objet qui a le même usage.'),
      O.qcm('le-plus-ancien', 'famille',
        [[['Le smartphone', 'Le téléphone fixe à fil'], 'Le téléphone fixe à fil'], [['Le téléphone portable à touches', 'Le téléphone fixe sans fil'], 'Le téléphone fixe sans fil'],
          [['Le smartphone', 'Le téléphone portable à touches'], 'Le téléphone portable à touches'], [['Le téléphone fixe sans fil', 'Le téléphone fixe à fil'], 'Le téléphone fixe à fil']],
        (x) => 'Dans la lignée des téléphones, lequel est venu en premier : ' + x[0].toLowerCase() + ' ou ' + x[1].toLowerCase() + ' ?', LIGNEE,
        'Range les téléphones du plus ancien au plus récent.'),
      O.qcm('famille-ou-lignee', 'appareils',
        [['Une bougie, une ampoule et une lampe solaire.', 'Une famille d’objets'], ['Le téléphone à fil, le portable, puis le smartphone.', 'Une lignée d’objets'],
          ['Un vélo, une moto, une voiture : tous servent à se déplacer.', 'Une famille d’objets'], ['Trois modèles de la même lampe, sortis l’un après l’autre.', 'Une lignée d’objets']],
        (x) => x + ' Est-ce une famille ou une lignée d’objets ?', ['Une famille d’objets', 'Une lignée d’objets'],
        'Même usage : la famille. Même objet qui évolue dans le temps : la lignée.'),
      {
        id: 'plus-leger',
        univers: 'famille',
        // [masse du vieux téléphone en g, masse du récent en g]
        versions: [[800, 200], [600, 150], [900, 180], [750, 150], [1000, 200]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le vieux téléphone de la famille pèse ' + a + ' g ; le smartphone d’Aminata pèse ' + b + ' g. Combien de fois le smartphone est-il plus léger ?',
            reponse: { type: 'nombre', valeur: a / b },
            aide: 'Calcule ' + a + ' ÷ ' + b + '.',
            aideParlee: 'Divise la masse du vieux téléphone par celle du smartphone.',
            correction: [a + ' ÷ ' + b + ' = ' + ecr(a / b) + ' : il est ' + ecr(a / b) + ' fois plus léger.'],
          };
        },
      },
      {
        id: 'ecart-modeles',
        univers: 'appareils',
        // [année du premier modèle, année du second]
        versions: [[1995, 2007], [1985, 1998], [2000, 2012], [1990, 2005], [1998, 2010]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans une lignée de téléphones, un modèle sort en ' + a + ' et le modèle suivant en ' + b + '. Combien d’années les séparent ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Calcule ' + b + ' − ' + a + '.',
            aideParlee: 'Soustrais la première année à la seconde.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' ans.'],
          };
        },
      },
    ],

    defi: {
      // [masse ancienne en g, masse récente en g, autonomie ancienne en h, autonomie récente en h]
      versions: [[800, 200, 0, 24], [600, 150, 0, 30], [900, 180, 0, 20]],
      genere(c) {
        const [a, b, , h] = c.alea.choisir(this.versions);
        return {
          enonce: 'Esther compare deux objets d’une même lignée : le vieux téléphone fixe de sa grand-mère, qui pèse ' + a + ' g et doit rester branché, ' +
            'et son smartphone, qui pèse ' + b + ' g et tient ' + h + ' heures sans être rechargé.',
          questions: [
            {
              texte: 'Question 1. Combien de fois le smartphone est-il plus léger ?',
              reponse: { type: 'nombre', valeur: a / b },
              aide: 'Divise la masse du vieux téléphone par celle du smartphone.',
              correction: [a + ' ÷ ' + b + ' = ' + ecr(a / b) + '.'],
            },
            {
              texte: 'Question 2. Combien de grammes le smartphone pèse-t-il de moins ?',
              reponse: { type: 'nombre', valeur: a - b },
              aide: 'Soustrais la masse du smartphone à celle du vieux téléphone.',
              correction: [a + ' − ' + b + ' = ' + (a - b) + ' g.'],
            },
            {
              texte: 'Question 3. Pourquoi dit-on que ces deux téléphones appartiennent à la même lignée ? Cite une autre famille d’objets qui servent à communiquer à distance.',
              correction: ['Ils ont le même usage, appeler, et le smartphone descend des téléphones plus anciens : c’est une évolution dans le temps.', 'Par exemple : la lettre, la radio, le téléphone, la messagerie sur internet servent tous à communiquer à distance.'],
              grille: ['As-tu parlé d’évolution dans le temps ?', 'As-tu cité au moins un autre objet qui sert à communiquer ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Même usage, c’est la famille ; une suite de modèles dans le temps, c’est la lignée. Tu sais ranger les objets.',
    carte: ['quelle-famille', 'le-plus-ancien', 'famille-ou-lignee'],
    papierDuSoir: { exercices: ['plus-leger', 'ecart-modeles'], defi: true },
    automatismes: [
      {
        id: 'quotient-rapide',
        versions: [[800, 200], [600, 150], [900, 300], [1000, 250]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Chez les Ewondo, un peuple beti du Cameroun, un responsable d’église appelle ses fidèles aux réunions avec un tambour parlant. Ce tambour aussi envoie un message à distance, comme le téléphone.',
    prenoms: ['Aminata', 'Esther'],
  };
});
