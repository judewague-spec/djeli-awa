/* Notion 5 du bloc de technologie « Les objets et la société » : avantages et inconvénients d'une évolution. De la lampe à pétrole à la lampe solaire.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const AV = 'Un avantage', INC = 'Un inconvénient';

  return {
    id: 'avantages-inconvenients',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Avantages et inconvénients d’une évolution',
    classe: '4e',
    univers: ['famille', 'commerce', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 11) : avantages et inconvénients associés aux évolutions technologiques.',

    accroche: {
      texte: 'Chez la grand-mère de Rachel, on s’éclairait avec une lampe à pétrole. Elle fumait, sentait fort, et le pétrole coûtait cher chaque semaine. ' +
        'Rachel lui offre une lampe solaire. Mamie est ravie, mais elle demande : « Et quand la batterie sera usée, on en fera quoi ? »',
      image: { dessin: 'chaine', etapes: ['Lampe à pétrole : fumée, odeur, achat chaque semaine', 'Lampe solaire : pas de fumée, lumière gratuite', 'Mais une batterie à recycler un jour'], description: 'Lampe à pétrole : fumée, odeur, pétrole à acheter. Lampe solaire : pas de fumée, lumière gratuite, mais une batterie à recycler un jour.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Ce qui va mieux', parts: 3 }, { nom: 'Ce qui va moins bien', parts: 1 }], description: 'Deux barres : trois points qui vont mieux avec la lampe solaire, un point qui va moins bien.' },
      etapes: [
        'Avec la lampe solaire, fini la fumée dans la maison : c’est mieux pour les poumons.',
        'La lumière du soleil est gratuite : fini le pétrole à acheter chaque semaine.',
        'Mais la lampe coûte plus cher à l’achat, et sa batterie devra un jour être recyclée.',
        'Une évolution d’un objet apporte souvent du mieux, et parfois du moins bien : il faut peser les deux.',
      ],
    },

    decouverte: {
      texte: (c) => 'Quand un objet évolue, on liste ce qui va mieux : c’est ' + c.mot('avantage') + '. Et ce qui va moins bien : c’est ' + c.mot('inconvenient') + '. ' +
        'Ils peuvent toucher la santé, l’argent, le confort ou la nature. ' +
        'L’astuce : fais deux colonnes, le pour et le contre, avant de juger une évolution.',
    },

    vocabulaire: {
      termes: {
        avantage: { sesMots: 'ce qui va mieux', officiel: 'un avantage', lesDeux: 'ce qui va mieux, que les techniciens appellent un avantage' },
        inconvenient: { sesMots: 'ce qui va moins bien', officiel: 'un inconvénient', lesDeux: 'ce qui va moins bien, que les techniciens appellent un inconvénient' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce qui va mieux, ce qui va moins bien. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : les avantages et les inconvénients d’une évolution.',
        'Tu connais les mots officiels : un avantage, un inconvénient. On les pèse pour juger une évolution.',
      ],
    },

    exercices: [
      O.qcm('avantage-ou-inconvenient', 'famille',
        [['La lampe solaire ne fait pas de fumée.', AV], ['La lampe solaire coûte plus cher à l’achat.', INC], ['Avec le smartphone, on peut appeler de partout.', AV], ['La batterie du smartphone doit être rechargée chaque jour.', INC], ['La voiture électrique ne rejette pas de fumée dans la rue.', AV], ['Une voiture électrique met longtemps à se recharger.', INC]],
        (x) => '« ' + x + ' » Est-ce un avantage ou un inconvénient de l’évolution ?', [AV, INC],
        'Est-ce mieux, ou moins bien, qu’avant ?'),
      O.qcm('quel-domaine', 'appareils',
        [['Fini la fumée dans la maison.', 'La santé'], ['Fini le pétrole à acheter chaque semaine.', 'L’argent'], ['Une batterie usée à recycler.', 'La nature'], ['Une lumière plus forte pour lire le soir.', 'Le confort']],
        (x) => '« ' + x + ' » Ce changement touche surtout quel domaine ?', ['La santé', 'L’argent', 'La nature', 'Le confort'],
        'Santé, argent, nature ou confort ?'),
      O.qcm('bonne-conclusion', 'commerce',
        [['la lampe solaire', 'Peser les avantages et les inconvénients'], ['la voiture électrique', 'Peser les avantages et les inconvénients']],
        (x) => 'Pour juger l’évolution vers ' + x + ', que faut-il faire ?', ['Peser les avantages et les inconvénients', 'Regarder seulement le prix', 'Regarder seulement la couleur'],
        'Une évolution a souvent du pour et du contre.'),
      {
        id: 'semaines-pour-rembourser',
        univers: 'commerce',
        // [prix de la lampe solaire en euros, pétrole économisé par semaine en euros]
        versions: [[30, 3], [40, 4], [24, 2], [36, 3], [50, 5], [45, 3]],
        genere(c) {
          const [p, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'La lampe solaire coûte ' + p + ' euros. Elle fait économiser ' + e + ' euros de pétrole par semaine. Au bout de combien de semaines est-elle remboursée ?',
            reponse: { type: 'nombre', valeur: p / e },
            aide: 'Calcule ' + p + ' ÷ ' + e + '.',
            aideParlee: 'Divise le prix de la lampe par l’économie d’une semaine.',
            correction: [p + ' ÷ ' + e + ' = ' + p / e + ' semaines.'],
          };
        },
      },
      {
        id: 'economie-par-an',
        univers: 'famille',
        // [euros de pétrole par semaine]
        versions: [2, 3, 4, 5, 6],
        genere(c) {
          const e = c.alea.choisir(this.versions);
          return {
            enonce: 'La famille de Rachel dépensait ' + e + ' euros de pétrole par semaine. Combien économise-t-elle en un an, soit 52 semaines ?',
            reponse: { type: 'nombre', valeur: e * 52 },
            aide: 'Calcule ' + e + ' × 52.',
            aideParlee: 'Multiplie la dépense d’une semaine par cinquante-deux.',
            correction: [e + ' × 52 = ' + e * 52 + ' euros.'],
          };
        },
      },
    ],

    defi: {
      // [prix de la lampe en euros, économie par semaine en euros]
      versions: [[30, 3], [40, 4], [24, 2], [36, 3]],
      genere(c) {
        const [p, e] = c.alea.choisir(this.versions);
        return {
          enonce: 'Rachel veut convaincre sa grand-mère de garder la lampe solaire. Avant, la lampe à pétrole coûtait ' + e + ' euros de pétrole par semaine. La lampe solaire a coûté ' + p + ' euros.',
          questions: [
            {
              texte: 'Question 1. Au bout de combien de semaines la lampe solaire est-elle remboursée ?',
              reponse: { type: 'nombre', valeur: p / e },
              aide: 'Divise le prix de la lampe par l’économie d’une semaine.',
              correction: [p + ' ÷ ' + e + ' = ' + p / e + ' semaines.'],
            },
            {
              texte: 'Question 2. Combien la famille économise-t-elle en 52 semaines, une fois la lampe payée ?',
              reponse: { type: 'nombre', valeur: e * 52 - p },
              aide: 'Calcule l’économie sur cinquante-deux semaines, puis enlève le prix de la lampe.',
              correction: [e + ' × 52 = ' + e * 52 + ' euros économisés.', e * 52 + ' − ' + p + ' = ' + (e * 52 - p) + ' euros gagnés.'],
            },
            {
              texte: 'Question 3. Écris un court argument pour la grand-mère : deux avantages et un inconvénient de la lampe solaire.',
              correction: ['Avantages : pas de fumée, meilleur pour la santé ; pas de pétrole à acheter.', 'Inconvénient : la batterie s’usera et devra être recyclée.'],
              grille: ['As-tu donné deux avantages ?', 'As-tu donné un inconvénient ?', 'As-tu fait des phrases complètes ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le pour, le contre, puis un avis : tu sais juger une évolution sans te laisser éblouir.',
    carte: ['avantage-ou-inconvenient', 'quel-domaine', 'semaines-pour-rembourser'],
    papierDuSoir: { exercices: ['semaines-pour-rembourser', 'economie-par-an'], defi: true },
    automatismes: [
      {
        id: 'division-rapide',
        versions: [[30, 3], [40, 4], [24, 2], [50, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Rwanda, des drones livrent du sang aux hôpitaux, bien plus vite que par la route. Mais ils ne portent que de petites charges.',
    prenoms: ['Rachel'],
  };
});
