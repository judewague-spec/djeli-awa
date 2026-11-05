/* Notion 12 du bloc de technologie « Les objets et la société » : les impacts sur l'air, l'eau, le sol et la santé. Le tas de déchets derrière l'atelier.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const MILIEUX = ['L’air', 'L’eau', 'Le sol', 'La santé'];

  return {
    id: 'impacts-environnement',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Les impacts sur l’air, l’eau, le sol et la santé',
    classe: '4e',
    univers: ['dehors', 'champetre', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 31) : les impacts environnementaux (indicateurs : air, eau, sol et santé).',

    accroche: {
      texte: 'Derrière l’atelier, Moussa veut brûler un tas de vieux plastiques et de piles usées. Rachel l’arrête : « La fumée va dans nos poumons ! » ' +
        'Et quand il pleut, ce qui coule du tas part vers la rivière et le potager. Un seul tas de déchets abîme beaucoup de choses autour de lui.',
      image: { dessin: 'chaine', etapes: ['La fumée salit l’air', 'L’eau de pluie emporte les produits vers la rivière', 'Le sol du potager est pollué', 'La santé des gens est en danger'], description: 'Un tas de déchets brûlé : la fumée salit l’air, la pluie emporte les produits vers la rivière, le sol est pollué, la santé est en danger.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Air', parts: 1 }, { nom: 'Eau', parts: 1 }, { nom: 'Sol', parts: 1 }, { nom: 'Santé', parts: 1 }], description: 'Quatre cases à surveiller : l’air, l’eau, le sol et la santé.' },
      etapes: [
        'Pour juger un objet ou un geste, on regarde quatre choses : l’air, l’eau, le sol, et la santé des gens.',
        'Brûler du plastique salit l’air, et la fumée fait tousser.',
        'Une pile jetée par terre libère des produits qui vont dans le sol, puis dans l’eau.',
        'Mieux vaut déposer piles et appareils usagés dans un lieu de collecte, où ils seront traités.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ce qu’un objet ou un geste abîme autour de lui, c’est ' + c.mot('impact') + '. On le regarde sur ' + c.mot('indicateurs') + ' : l’air, l’eau, le sol et la santé. ' +
        'Un objet peut en avoir à sa fabrication, quand on l’utilise, et quand on le jette. ' +
        'L’astuce : pose-toi quatre questions, une pour l’air, une pour l’eau, une pour le sol, une pour la santé.',
    },

    vocabulaire: {
      termes: {
        impact: { sesMots: 'les dégâts sur la nature', officiel: 'l’impact environnemental', lesDeux: 'les dégâts sur la nature, que les techniciens appellent l’impact environnemental' },
        indicateurs: { sesMots: 'quatre choses à surveiller', officiel: 'quatre indicateurs', lesDeux: 'quatre choses à surveiller, que les techniciens appellent quatre indicateurs' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les dégâts sur la nature, et les quatre choses à surveiller. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : l’impact environnemental, mesuré par quatre indicateurs, l’air, l’eau, le sol et la santé.',
        'Tu connais les mots officiels : l’impact environnemental et ses indicateurs.',
      ],
    },

    exercices: [
      O.qcm('quel-milieu', 'dehors',
        [['La fumée d’un feu de pneus.', 'L’air'], ['De l’huile de moteur versée dans la rivière.', 'L’eau'], ['Des piles enterrées au fond du jardin.', 'Le sol'], ['Le bruit très fort d’un générateur toute la nuit.', 'La santé'], ['Des sacs plastiques jetés dans le fleuve.', 'L’eau']],
        (x) => '« ' + x + ' » Quel indicateur est touché en premier ?', MILIEUX,
        'L’air, l’eau, le sol ou la santé ?'),
      O.qcm('bon-geste', 'maison-courses',
        [['des piles usées', 'Les déposer dans un lieu de collecte'], ['d’un vieux téléphone', 'Le déposer dans un lieu de collecte ou le faire réparer'], ['de l’huile de friture usée', 'La garder dans une bouteille fermée et la déposer au point de collecte']],
        (x) => 'Que faire ' + x + ' ?', ['Les déposer dans un lieu de collecte', 'Le déposer dans un lieu de collecte ou le faire réparer', 'La garder dans une bouteille fermée et la déposer au point de collecte', 'Les brûler', 'Les jeter dans la rivière'],
        'Ni brûler, ni jeter dans la nature.'),
      O.qcm('quand', 'champetre',
        [['L’usine rejette des fumées pour fabriquer le téléphone.', 'À la fabrication'], ['La voiture rejette des gaz en roulant.', 'À l’utilisation'], ['Le vieux réfrigérateur est abandonné dans un champ.', 'Quand on le jette']],
        (x) => '« ' + x + ' » À quel moment de la vie de l’objet cet impact a-t-il lieu ?', ['À la fabrication', 'À l’utilisation', 'Quand on le jette'],
        'Fabrication, utilisation, ou fin de l’objet ?'),
      {
        id: 'sacs-evites',
        univers: 'maison-courses',
        // [sacs plastiques évités par semaine]
        versions: [2, 3, 4, 5, 6],
        genere(c) {
          const k = c.alea.choisir(this.versions);
          return {
            enonce: 'Avec un panier, Laure évite ' + k + ' sacs plastiques par semaine. Combien en évite-t-elle en un an, soit 52 semaines ?',
            reponse: { type: 'nombre', valeur: k * 52 },
            aide: 'Calcule ' + k + ' × 52.',
            aideParlee: 'Multiplie le nombre de sacs d’une semaine par cinquante-deux.',
            correction: [k + ' × 52 = ' + k * 52 + ' sacs.'],
          };
        },
      },
      {
        id: 'piles-collectees',
        univers: 'champetre',
        // [familles du village, piles rapportées par famille et par an]
        versions: [[40, 8], [60, 5], [25, 12], [80, 6], [50, 10]],
        genere(c) {
          const [n, p] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au village, ' + n + ' familles rapportent chacune ' + p + ' piles usées par an au point de collecte de l’atelier. Combien de piles ne finissent pas dans la nature ?',
            reponse: { type: 'nombre', valeur: n * p },
            aide: 'Calcule ' + n + ' × ' + p + '.',
            aideParlee: 'Multiplie le nombre de familles par le nombre de piles d’une famille.',
            correction: [n + ' × ' + p + ' = ' + n * p + ' piles.'],
          };
        },
      },
    ],

    defi: {
      // [familles, piles par famille et par an, sacs évités par famille et par semaine]
      versions: [[40, 8, 3], [60, 5, 2], [25, 12, 4], [50, 10, 3]],
      genere(c) {
        const [n, p, s] = c.alea.choisir(this.versions);
        return {
          enonce: 'Rebecca organise au village une semaine « zéro déchet dans la nature ». ' + n + ' familles participent. Chacune rapporte ' + p + ' piles usées par an et évite ' + s + ' sacs plastiques par semaine.',
          questions: [
            {
              texte: 'Question 1. Combien de piles sont rapportées en un an ?',
              reponse: { type: 'nombre', valeur: n * p },
              aide: 'Multiplie le nombre de familles par le nombre de piles d’une famille.',
              correction: [n + ' × ' + p + ' = ' + n * p + ' piles.'],
            },
            {
              texte: 'Question 2. Combien de sacs plastiques sont évités en une semaine, par tout le village ?',
              reponse: { type: 'nombre', valeur: n * s },
              aide: 'Multiplie le nombre de familles par le nombre de sacs d’une famille.',
              correction: [n + ' × ' + s + ' = ' + n * s + ' sacs.'],
            },
            {
              texte: 'Question 3. Pour l’affiche de Rebecca, explique les impacts d’une pile jetée dans la nature, avec au moins deux indicateurs.',
              correction: ['La pile libère des produits dans le sol, qui vont ensuite dans l’eau.', 'L’eau et les légumes du potager peuvent alors nuire à la santé des gens.'],
              grille: ['As-tu cité au moins deux indicateurs parmi l’air, l’eau, le sol et la santé ?', 'As-tu expliqué le chemin de la pollution ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! L’air, l’eau, le sol, la santé : tu sais juger ce qu’un objet laisse derrière lui.',
    carte: ['quel-milieu', 'bon-geste', 'quand'],
    papierDuSoir: { exercices: ['sacs-evites', 'piles-collectees'], defi: true },
    automatismes: [
      {
        id: 'fois-cinquante-deux',
        versions: [2, 3, 5, 10],
        genere(c) { const k = c.alea.choisir(this.versions); return { enonce: k + ' × 52 = ?', reponse: { type: 'nombre', valeur: k * 52 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Rwanda, une loi de 2019 interdit les sacs plastiques. Elle interdit aussi les objets en plastique jetés après un seul usage.',
    prenoms: ['Moussa', 'Rachel', 'Laure', 'Rebecca'],
  };
});
