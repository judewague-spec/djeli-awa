/* Notion 2 du bloc SVT « Planète Terre, environnement, action humaine » : l'eau et le sol. Le potager d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const EVAP = 'L’évaporation', COND = 'La condensation', INFIL = 'L’infiltration';
  const PAILLE = 'Couvrir le sol de paille', COMPOST = 'Faire du compost', TOT = 'Arroser tôt le matin ou le soir';

  return {
    id: 'ressources-eau-sol',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'L’eau et le sol',
    classe: 'cycle 4',
    univers: ['champetre', 'maison-courses'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : eau et sol, ressources, exploitation et gestion responsable.',

    accroche: {
      texte: 'Aminata arrose son potager. Moussa lui dit : arrose tôt le matin, pas à midi. ' +
        'L’eau douce n’est pas infinie : la plus grande part de l’eau de la Terre est salée. Et la bonne terre du potager met très longtemps à se former.',
      image: { dessin: 'coupe-terre', couches: [['Feuilles mortes', 1], ['Terre riche en vie', 2], ['Terre plus pauvre', 3], ['Roche', 4]], description: 'Une coupe du sol, de haut en bas : des feuilles mortes, une terre riche en vie, une terre plus pauvre, puis la roche.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Le soleil chauffe la mer', 'La vapeur forme un nuage', 'La pluie tombe sur les champs', 'L’eau passe dans le sol et revient'], description: 'Le voyage de l’eau en quatre étapes : le soleil chauffe la mer, la vapeur forme un nuage, la pluie tombe sur les champs, puis l’eau passe dans le sol, les rivières, et revient à la mer.' },
      etapes: [
        'Imagine une goutte d’eau de la mer. Le soleil la chauffe, et elle monte dans l’air sous forme de vapeur : c’est l’évaporation.',
        'En haut, l’air est froid : la vapeur redevient de petites gouttes et forme un nuage. C’est la condensation. Puis elle retombe en pluie sur les champs.',
        'La pluie entre dans le sol : c’est l’infiltration. Elle nourrit les plantes. Elle remplit les nappes sous terre et les rivières, puis rejoint la mer.',
        'Dans un sol vivant, les vers de terre et les microbes transforment les feuilles mortes en terreau.',
        'Sur une pente, un sol nu est emporté par la pluie. Les racines et les haies le retiennent.',
        'Au potager, on arrose tôt le matin ou le soir : moins d’eau s’évapore. Le compost rend au sol ce qu’on lui a pris.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’eau est précieuse, et le sol aussi. ' +
        'Regarde l’eau qui monte au ciel, retombe, puis revient à la mer : c’est ' + c.mot('cycle') + '. ' +
        'Regarde la pluie qui emporte la terre d’une pente nue : c’est ' + c.mot('erosion') + '. ' +
        'Regarde l’eau de pluie qui remplit le puits chaque année : c’est ' + c.mot('renouvelable') + '. ' +
        'L’astuce : l’eau revient avec la pluie, mais le sol se refait si lentement qu’il faut le protéger.',
    },

    vocabulaire: {
      termes: {
        cycle: { sesMots: 'le voyage de l’eau entre mer, nuages et terre', officiel: 'le cycle de l’eau', lesDeux: 'le voyage de l’eau entre mer, nuages et terre, que les scientifiques appellent le cycle de l’eau' },
        erosion: { sesMots: 'la terre emportée par la pluie et le vent', officiel: 'l’érosion', lesDeux: 'la terre emportée par la pluie et le vent, que les scientifiques appellent l’érosion' },
        renouvelable: { sesMots: 'ce qui se refait assez vite', officiel: 'une ressource renouvelable', lesDeux: 'ce qui se refait assez vite, que les scientifiques appellent une ressource renouvelable' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le voyage de l’eau, la terre emportée, et ce qui se refait assez vite. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le cycle de l’eau, pour le voyage de l’eau. La terre emportée s’appelle l’érosion. Ce qui se refait assez vite s’appelle une ressource renouvelable.',
        'Tu connais les mots officiels : le cycle de l’eau, l’érosion, et une ressource renouvelable. Tu sais aussi quels gestes ménagent l’eau et le sol.',
      ],
    },

    exercices: [
      O.qcm('etape-du-cycle', 'champetre',
        [
          ['Une flaque disparaît au soleil de midi.', EVAP, 'L’eau liquide se change en vapeur sous la chaleur du soleil : c’est l’évaporation.'],
          ['De la buée se forme sur le miroir froid de la salle de bain.', COND, 'La vapeur d’eau se refroidit et redevient de petites gouttes : c’est la condensation.'],
          ['Après l’orage, l’eau disparaît dans la terre du champ.', INFIL, 'L’eau de pluie passe entre les grains du sol : c’est l’infiltration.'],
          ['Le linge de Laure sèche sur le fil.', EVAP, 'L’eau du linge devient de la vapeur dans l’air : c’est l’évaporation.'],
          ['Le couvercle de la casserole se couvre de gouttes.', COND, 'La vapeur touche le couvercle plus froid et redevient liquide : c’est la condensation.'],
          ['L’eau de pluie descend entre les grains de sable du jardin.', INFIL, 'L’eau s’enfonce dans le sol : c’est l’infiltration.'],
        ],
        (x) => x + ' Quelle étape de l’eau voit-on ?', [EVAP, COND, INFIL],
        'Pense à ce que devient l’eau : elle monte dans l’air, elle se refroidit, ou elle entre dans la terre.'),
      O.qcm('bon-geste-potager', 'champetre',
        [
          ['Quel geste couvre la terre pour limiter l’évaporation ?', PAILLE, 'Une couche de paille garde l’ombre et l’humidité : l’eau s’évapore moins.'],
          ['Que faire des épluchures de légumes pour nourrir la terre ?', COMPOST, 'Les vers et les microbes transforment les épluchures en terreau qui nourrit le sol.'],
          ['Quand arroser pour perdre le moins d’eau ?', TOT, 'Tôt le matin ou le soir, il fait moins chaud : moins d’eau s’évapore.'],
          ['Comment protéger la terre nue du soleil et du vent ?', PAILLE, 'La paille couvre la terre : le soleil la dessèche moins, et le vent l’emporte moins.'],
          ['Que faire des feuilles mortes du jardin pour fabriquer un terreau ?', COMPOST, 'Mises au compost, les feuilles mortes sont transformées en terreau.'],
          ['À quel moment l’eau d’arrosage s’évapore-t-elle le moins ?', TOT, 'En fin de journée ou tôt le matin, le soleil est moins fort.'],
        ],
        (x) => x, [PAILLE, COMPOST, TOT],
        'Choisis le geste qui répond à la question posée.'),
      O.qcm('vrai-ou-faux', 'maison-courses',
        [
          ['La plus grande part de l’eau de la Terre est salée.', 'Vrai', 'Les mers et les océans contiennent presque toute l’eau de la Terre, et elle est salée.'],
          ['Si on pompe une nappe plus vite que la pluie ne la remplit, elle baisse.', 'Vrai', 'On prend plus d’eau qu’il n’en revient : la nappe se vide peu à peu.'],
          ['Un sol nu sur une pente est mieux protégé qu’un sol couvert de plantes.', 'Faux', 'Les racines et les plantes retiennent la terre : un sol nu est plus facilement emporté.'],
          ['Les vers de terre et les microbes aident à fabriquer un sol fertile.', 'Vrai', 'Ils transforment les restes de plantes en terreau, qui nourrit les cultures.'],
          ['Un sol emporté par l’érosion se reforme en quelques semaines.', 'Faux', 'Un sol met très longtemps à se former : bien plus qu’une vie humaine.'],
          ['L’eau de pluie s’infiltre mieux dans un sol vivant que dans un sol bétonné.', 'Vrai', 'Le béton ferme le passage : l’eau ruisselle au lieu d’entrer dans la terre.'],
        ],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'L’eau douce est limitée, et un sol met très longtemps à se former.'),
      {
        id: 'recuperateur',
        univers: 'champetre',
        // [litres dans le récupérateur, litres utilisés par jour]
        versions: [[120, 15], [200, 25], [90, 15], [150, 30], [180, 20], [240, 40]],
        genere(c) {
          const [v, l] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un récupérateur d’eau de pluie contient ' + v + ' litres. Aminata en utilise ' + l + ' litres par jour pour arroser. Pendant combien de jours l’eau suffit-elle ?',
            reponse: { type: 'nombre', valeur: v / l },
            aide: 'Calcule ' + v + ' ÷ ' + l + '.',
            aideParlee: 'Divise l’eau du récupérateur par l’eau utilisée en un jour.',
            correction: [v + ' ÷ ' + l + ' = ' + ecr(v / l) + ' jours.'],
          };
        },
      },
      {
        id: 'epluchures',
        univers: 'maison-courses',
        // [kg d'épluchures par semaine, semaines]
        versions: [[2, 8], [3, 6], [2, 12], [4, 5], [3, 10], [5, 4]],
        genere(c) {
          const [k, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'La famille de Rachel met ' + k + ' kg d’épluchures par semaine au compost. Combien de kilogrammes cela fait-il en ' + n + ' semaines ?',
            reponse: { type: 'nombre', valeur: k * n },
            aide: 'Calcule ' + k + ' × ' + n + '.',
            aideParlee: 'Multiplie les kilogrammes d’une semaine par le nombre de semaines.',
            correction: [k + ' × ' + n + ' = ' + k * n + ' kg.'],
          };
        },
      },
    ],

    defi: {
      // [kg de terre emportée, sol nu ; kg de terre emportée, sol couvert]
      versions: [[40, 10], [60, 12], [45, 15], [80, 20], [36, 6], [50, 10]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        const BONNE = 'Les plantes et leurs racines retiennent la terre';
        return {
          enonce: 'Aminata teste deux parcelles de même taille, sur la même pente, sous la même pluie. La première a un sol nu. La seconde est couverte de plantes. ' +
            'Après un orage, elle pèse la terre emportée : ' + a + ' kg pour le sol nu, et ' + b + ' kg pour le sol couvert.',
          image: { dessin: 'batons', valeurs: [['Sol nu', a], ['Sol couvert', b]], axe: 'Terre emportée (kg)', description: 'Deux bâtons : ' + a + ' kilogrammes de terre emportée pour le sol nu, et ' + b + ' kilogrammes pour le sol couvert de plantes.' },
          questions: [
            {
              texte: 'Question 1. Combien de kilogrammes de terre le sol couvert a-t-il gardés de plus que le sol nu ?',
              reponse: { type: 'nombre', valeur: a - b },
              aide: 'Fais la différence entre les deux masses de terre emportée.',
              correction: [a + ' − ' + b + ' = ' + (a - b) + ' kg.'],
            },
            {
              texte: 'Question 2. Combien de fois plus de terre le sol nu a-t-il perdue que le sol couvert ?',
              reponse: { type: 'nombre', valeur: a / b },
              aide: 'Divise la terre perdue par le sol nu par la terre perdue par le sol couvert.',
              correction: [a + ' ÷ ' + b + ' = ' + a / b + ' fois plus.'],
            },
            {
              texte: 'Question 3. Quelle cause explique cette différence ?',
              reponse: O.choix(c.alea, BONNE, [BONNE, 'Il a plu davantage sur le sol couvert', 'La terre du sol nu est plus lourde']),
              aide: 'La pente et la pluie sont les mêmes. Cherche ce qui change entre les deux parcelles.',
              correction: ['La pente et la pluie sont les mêmes : seule la couverture du sol change.', 'Réponse : ' + BONNE + '.'],
            },
            {
              texte: 'Question 4. Propose deux gestes pour limiter l’érosion d’un champ en pente, et explique pourquoi ils agissent.',
              correction: ['Gestes possibles : planter des haies, garder le sol couvert de plantes, cultiver en suivant les courbes de la pente.', 'Les racines et les plantes retiennent la terre et ralentissent l’eau de pluie.'],
              grille: ['As-tu proposé deux gestes qui couvrent ou retiennent le sol ?', 'As-tu expliqué que les racines ou les plantes retiennent la terre ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais comment l’eau voyage, et pourquoi il faut ménager l’eau douce et le sol.',
    carte: ['etape-du-cycle', 'bon-geste-potager', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['recuperateur', 'epluchures'], defi: true },
    automatismes: [
      {
        id: 'renouvele-ou-lent',
        versions: [['L’eau de pluie qui remplit un puits', 'Revient vite'], ['La terre emportée par l’érosion', 'Revient très lentement'], ['L’eau de la mer qui s’évapore', 'Revient vite'], ['Un sol riche, formé pendant des siècles', 'Revient très lentement']],
        genere(c) { const [t, b] = c.alea.choisir(this.versions); return { enonce: t + ' : cela revient-il vite ou très lentement ?', reponse: O.choix(c.alea, b, ['Revient vite', 'Revient très lentement']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Maroc, dans l’oasis du Tafilalt, des khettaras amènent l’eau d’une nappe souterraine jusqu’à la surface, sans aucune pompe.',
    prenoms: ['Aminata', 'Moussa', 'Rachel', 'Laure'],
  };
});
