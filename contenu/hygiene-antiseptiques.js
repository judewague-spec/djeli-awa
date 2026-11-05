/* Notion 12 du bloc SVT « Le corps humain et la santé » : hygiène et antiseptiques. Le genou écorché d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ANTI = 'Un antiseptique', DESI = 'Un désinfectant';

  return {
    id: 'hygiene-antiseptiques',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Hygiène et antiseptiques',
    classe: 'cycle 4',
    univers: ['famille', 'maison-courses', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : contamination, hygiène, antiseptiques.',

    accroche: {
      texte: 'Aminata tombe à vélo : son genou est écorché, avec un peu de terre dans la plaie. Laure, la maman de Rachel, accourt avec sa trousse. ' +
        'Elle se lave d’abord les mains, puis nettoie la plaie. Pourquoi tant de précautions pour une petite écorchure ?',
      image: { dessin: 'chaine', etapes: ['Des microbes sur la terre et les mains', 'Ils entrent par la plaie', 'Ils se multiplient', 'La plaie s’infecte'], description: 'Comment une plaie s’infecte : des microbes entrent par la plaie, se multiplient, et la plaie s’infecte.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Se laver les mains', 'Nettoyer la plaie à l’eau et au savon', 'Appliquer un produit qui tue les microbes', 'Couvrir d’un pansement propre'], description: 'Les bons gestes : se laver les mains, nettoyer la plaie, appliquer un produit qui tue les microbes, couvrir d’un pansement propre.' },
      etapes: [
        'La peau est une barrière contre les microbes. Une plaie ouvre une porte d’entrée.',
        'Les microbes peuvent aussi entrer par la bouche, le nez, ou passer d’une personne à l’autre par les mains, la toux, l’eau ou les aliments.',
        'Se laver les mains au savon élimine beaucoup de microbes.',
        'Sur une plaie, on met un produit qui tue les microbes sans abîmer la peau. Sur une table ou un sol, on utilise un autre produit, plus fort.',
      ],
    },

    decouverte: {
      texte: (c) => 'Par une plaie, la bouche ou le nez, les microbes peuvent entrer : c’est ' + c.mot('contamination') + '. L’hygiène la limite : se laver les mains, cuire et conserver les aliments au froid, couvrir sa toux. ' +
        'Sur la peau ou une plaie, on utilise un antiseptique ; sur les objets et les surfaces, un désinfectant, qu’on ne met jamais sur la peau. ' +
        'L’astuce : antiseptique pour le vivant, désinfectant pour les objets.',
    },

    vocabulaire: {
      termes: {
        contamination: { sesMots: 'l’invasion par les microbes', officiel: 'la contamination', lesDeux: 'l’invasion par les microbes, que les scientifiques appellent la contamination' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’entrée des microbes dans le corps, par une plaie, la bouche ou le nez. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la contamination. Et l’ensemble des gestes qui empêchent les microbes d’arriver, c’est l’asepsie.',
        'Tu connais les mots officiels : contamination, asepsie, antiseptique, désinfectant. L’hygiène protège de la contamination.',
      ],
    },

    exercices: [
      {
        id: 'quel-produit',
        univers: 'maison-courses',
        versions: [['nettoyer une écorchure au genou', ANTI], ['nettoyer le sol de la cuisine', DESI], ['soigner une petite coupure au doigt', ANTI], ['laver la table à langer', DESI]],
        genere(c) {
          const [but, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour ' + but + ', faut-il un antiseptique ou un désinfectant ?',
            reponse: O.choix(c.alea, bonne, [ANTI, DESI]),
            aide: 'Antiseptique pour le vivant, désinfectant pour les objets.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'porte-d-entree',
        univers: 'dehors',
        versions: [['une écharde dans le doigt', 'Par une plaie de la peau'], ['un ami qui tousse sans se couvrir', 'Par l’air respiré'], ['un plat mal conservé', 'Par les aliments'], ['des mains sales portées à la bouche', 'Par la bouche']],
        genere(c) {
          const [situation, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Par où les microbes peuvent-ils entrer dans le corps, dans cette situation : ' + situation + ' ?',
            reponse: O.choix(c.alea, bonne, ['Par une plaie de la peau', 'Par l’air respiré', 'Par les aliments', 'Par la bouche'].filter((x) => x !== bonne).slice(0, 2)),
            aide: 'Peau, air, aliments, bouche.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'bon-geste',
        univers: 'famille',
        versions: [['Se laver les mains avant de cuisiner.', 'Il protège'], ['Tousser dans son coude.', 'Il protège'], ['Laisser les restes de repas sur la table toute la journée.', 'Il expose aux microbes'], ['Partager sa brosse à dents.', 'Il expose aux microbes']],
        genere(c) {
          const [geste, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Ce geste protège-t-il des microbes ? « ' + geste + ' »',
            reponse: O.choix(c.alea, bonne, ['Il protège', 'Il expose aux microbes']),
            aide: 'Pense aux mains, à la toux et aux aliments.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'temps-de-lavage',
        univers: 'famille',
        // [lavages par jour, secondes par lavage]
        versions: [[6, 30], [8, 30], [10, 30], [4, 30], [6, 40], [9, 40]],
        genere(c) {
          const [n, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rebecca se lave les mains ' + n + ' fois par jour, ' + s + ' secondes chaque fois. Combien de secondes en tout ?',
            reponse: { type: 'nombre', valeur: n * s },
            aide: 'Calcule ' + n + ' × ' + s + '.',
            aideParlee: 'Multiplie le nombre de lavages par la durée d’un lavage.',
            correction: [n + ' × ' + s + ' = ' + n * s + ' secondes.'],
          };
        },
      },
      {
        id: 'microbes-restants',
        univers: 'maison-courses',
        // [microbes au départ, divisés par]
        versions: [[10000, 100], [50000, 100], [20000, 1000], [80000, 1000], [6000, 100], [90000, 100]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur une main sale, on compte ' + n + ' microbes. Un bon lavage au savon en divise le nombre par ' + k + '. Combien en reste-t-il ?',
            reponse: { type: 'nombre', valeur: n / k },
            aide: 'Calcule ' + n + ' ÷ ' + k + '.',
            aideParlee: 'Divise le nombre de microbes par le nombre donné.',
            correction: [n + ' ÷ ' + k + ' = ' + n / k + ' microbes.'],
          };
        },
      },
    ],

    defi: {
      // [microbes sur les mains, divisés par, lavages par jour]
      versions: [[20000, 100, 6], [50000, 1000, 8], [10000, 100, 5], [40000, 1000, 7]],
      genere(c) {
        const [n, k, j] = c.alea.choisir(this.versions);
        return {
          enonce: 'Avant de préparer un repas pour la famille, Rachel a ' + n + ' microbes sur les mains. Un lavage de 30 secondes au savon en divise le nombre par ' + k + '. Elle se lave les mains ' + j + ' fois dans la journée.',
          questions: [
            {
              texte: 'Question 1. Combien de microbes reste-t-il après un lavage ?',
              reponse: { type: 'nombre', valeur: n / k },
              aide: 'Divise par le nombre donné.',
              correction: [n + ' ÷ ' + k + ' = ' + n / k + ' microbes.'],
            },
            {
              texte: 'Question 2. Combien de secondes passe-t-elle à se laver les mains dans la journée ?',
              reponse: { type: 'nombre', valeur: 30 * j },
              aide: 'Multiplie par le nombre de lavages.',
              correction: ['30 × ' + j + ' = ' + 30 * j + ' secondes.'],
            },
            {
              texte: 'Question 3. Explique pourquoi se laver les mains avant de cuisiner protège toute la famille.',
              correction: ['Les mains transportent des microbes, qui peuvent passer dans les aliments.', 'Le lavage en élimine une grande partie : il limite la contamination de ceux qui mangent le repas.'],
              grille: ['As-tu dit que les mains transportent des microbes ?', 'As-tu parlé des aliments ou de la famille ?', 'As-tu employé le mot « contamination » ou une phrase qui l’explique ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Des mains propres, une plaie bien soignée, le bon produit au bon endroit : tu sais te protéger des microbes.',
    carte: ['quel-produit', 'porte-d-entree', 'bon-geste'],
    papierDuSoir: { exercices: ['microbes-restants', 'temps-de-lavage'], defi: true },
    automatismes: [
      {
        id: 'produit-rapide',
        versions: [['une plaie', ANTI], ['le sol', DESI]],
        genere(c) { const [x, b] = c.alea.choisir(this.versions); return { enonce: 'Pour ' + x + ' : antiseptique ou désinfectant ?', reponse: O.choix(c.alea, b, [ANTI, DESI]) }; },
      },
    ],
    // Fait proposé (Semmelweis) écarté : la page de la source n'a pas pu être ouverte (contenu/sources-culture.md).
    savaisTu: null,
    prenoms: ['Aminata', 'Laure', 'Rachel', 'Rebecca'],
  };
});
