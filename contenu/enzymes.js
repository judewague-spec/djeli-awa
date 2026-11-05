/* Notion 8 du bloc SVT « Le corps humain et la santé » : les enzymes de la digestion. Le pain qui devient sucré.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const PRES = 'Il reste de l’amidon', ABS = 'Il n’y a plus d’amidon';

  return {
    id: 'enzymes',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Les enzymes de la digestion',
    classe: '3e',
    univers: ['cuisine-restaurant', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : rôle des enzymes digestives.',

    accroche: {
      texte: 'Esther mâche longtemps un morceau de pain, sans l’avaler. Au bout d’un moment, il a un goût sucré ! ' +
        'Pourtant, le pain n’était pas sucré au départ. Quelque chose, dans sa bouche, a transformé le pain. Quoi ?',
      image: { dessin: 'tube', aspect: 'clair', legende: 'amidon et salive à 37 °C', description: 'Un tube où l’on a mis de l’amidon et de la salive, à la température du corps.' },
    },

    manipulation: {
      type: 'thermometre',
      min: 0,
      max: 40,
      depart: 20,
      cible: 37,
      consigne: 'Au laboratoire, on place un tube d’amidon et de salive dans un bain d’eau. Règle le bain à la température du corps humain, trente-sept degrés, puis valide.',
    },

    decouverte: {
      texte: (c) => 'La salive contient ' + c.mot('enzyme') + ' qui découpe l’amidon en sucres. À la température du corps, elle travaille vite. Dans un tube trop froid, ou bouilli, elle ne marche plus. ' +
        'Pour voir s’il reste de l’amidon, on ajoute de l’eau iodée : elle devient bleu foncé, presque noire, s’il y a de l’amidon. ' +
        'Chaque enzyme ne découpe qu’une sorte d’aliment : celle de la salive découpe l’amidon, pas les protéines.',
      image: { dessin: 'thermometre', min: 0, max: 40, valeur: 37, depart: 20, description: 'Un thermomètre réglé à 37 degrés, la température du corps.' },
    },

    vocabulaire: {
      termes: {
        enzyme: { sesMots: 'une molécule-ciseaux', officiel: 'une enzyme', lesDeux: 'une molécule-ciseaux, que les scientifiques appellent une enzyme,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la salive contient une molécule-ciseaux, qui découpe l’amidon. ' +
          'Les scientifiques ont un mot pour elle : je te le dirai la prochaine fois.',
        'Les scientifiques disent : une enzyme. La molécule-ciseaux de la salive est une enzyme, l’amylase. Chaque enzyme est spécifique : elle n’agit que sur un aliment.',
        'Tu connais le mot officiel : les enzymes digestives découpent les aliments en nutriments ; elles sont spécifiques et agissent le mieux à la température du corps.',
      ],
    },

    exercices: [
      {
        id: 'eau-iodee',
        univers: 'cuisine-restaurant',
        versions: [['bleu foncé, presque noire', PRES], ['jaune orangé, sa couleur de départ', ABS]],
        genere(c) {
          const [couleur, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'On verse de l’eau iodée dans un tube. Elle devient ' + couleur + '. Que conclure ?',
            reponse: O.choix(c.alea, bonne, [PRES, ABS]),
            aide: 'L’eau iodée devient bleu foncé en présence d’amidon.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quel-tube',
        univers: 'famille',
        versions: [1, 2, 3],
        genere(c) {
          const bonne = 'Le tube à 37 °C';
          return {
            enonce: 'Trois tubes contiennent de l’amidon et de la salive : un à 0 °C, un à 37 °C, et un avec de la salive bouillie. Dans quel tube l’amidon disparaît-il ?',
            reponse: O.choix(c.alea, bonne, ['Le tube à 0 °C', 'Le tube avec la salive bouillie']),
            aide: 'La salive travaille à la température du corps ; le froid et l’ébullition l’en empêchent.',
            correction: ['L’enzyme de la salive agit à la température du corps.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'specifique',
        univers: 'cuisine-restaurant',
        versions: [['l’amidon du pain', 'Oui'], ['les protéines de l’œuf', 'Non'], ['l’amidon du riz', 'Oui'], ['les protéines de la viande', 'Non']],
        genere(c) {
          const [aliment, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’enzyme de la salive peut-elle découper ' + aliment + ' ?',
            reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
            aide: 'La salive ne découpe que l’amidon.',
            correction: ['Une enzyme est spécifique : celle de la salive découpe l’amidon seulement.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'plus-rapide',
        univers: 'famille',
        // [minutes pour que l'amidon disparaisse à 37 °C, à 20 °C]
        versions: [[5, 20], [8, 30], [6, 25], [10, 40], [4, 15], [7, 28]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’amidon d’un tube disparaît en ' + a + ' minutes à 37 °C, et en ' + b + ' minutes à 20 °C. Combien de minutes gagne-t-on à 37 °C ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Calcule ' + b + ' − ' + a + '.',
            aideParlee: 'Fais la différence entre les deux durées.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' minutes.'],
          };
        },
      },
      {
        id: 'combien-de-tubes',
        univers: 'cuisine-restaurant',
        // [tubes en tout, tubes encore bleu foncé]
        versions: [[6, 2], [8, 3], [5, 1], [10, 4], [7, 2], [9, 3]],
        genere(c) {
          const [n, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans une expérience, ' + n + ' tubes d’amidon et de salive sont testés à l’eau iodée. ' + b + (b > 1 ? ' deviennent' : ' devient') + ' bleu foncé. Dans combien de tubes l’amidon a-t-il été digéré ?',
            reponse: { type: 'nombre', valeur: n - b },
            aide: 'Bleu foncé : il reste de l’amidon. Les autres sont digérés.',
            correction: [n + ' − ' + b + ' = ' + (n - b) + ' tubes.'],
          };
        },
      },
    ],

    defi: {
      // [minutes à 37 °C, minutes à 20 °C]
      versions: [[5, 20], [6, 30], [8, 24], [4, 20], [10, 30], [5, 25]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Moussa fait une expérience : de l’amidon et de la salive, dans deux tubes. À 37 °C, l’eau iodée ne bleuit plus après ' + a + ' minutes. À 20 °C, il faut ' + b + ' minutes. ' +
            'Un troisième tube, avec de la salive bouillie, reste bleu foncé même après une heure.',
          image: { dessin: 'tube', aspect: 'bleu', legende: 'salive bouillie : encore bleu', description: 'Le tube de salive bouillie, encore bleu foncé à l’eau iodée.' },
          questions: [
            {
              texte: 'Question 1. Combien de fois plus de temps faut-il à 20 °C qu’à 37 °C ?',
              reponse: { type: 'nombre', valeur: b / a },
              aide: 'Divise la durée à 20 °C par la durée à 37 °C.',
              correction: [b + ' ÷ ' + a + ' = ' + b / a + ' fois plus de temps.'],
            },
            {
              texte: 'Question 2. Dans le tube de salive bouillie, que conclure ?',
              reponse: O.choix(c.alea, PRES, [PRES, ABS]),
              aide: 'Le tube reste bleu foncé.',
              correction: ['Réponse : ' + PRES + '.'],
            },
            {
              texte: 'Question 3. Explique ces résultats avec le mot « enzyme ».',
              correction: ['La salive contient une enzyme qui découpe l’amidon.', 'Elle agit le plus vite à la température du corps, 37 °C, plus lentement à 20 °C.', 'Bouillie, elle est détruite : l’amidon n’est plus découpé.'],
              grille: ['As-tu employé le mot « enzyme » ?', 'As-tu parlé de la température du corps ?', 'As-tu expliqué le tube de salive bouillie ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais pourquoi le pain devient sucré dans la bouche : la salive découpe l’amidon.',
    carte: ['eau-iodee', 'quel-tube', 'specifique'],
    papierDuSoir: { exercices: ['plus-rapide', 'combien-de-tubes'], defi: true },
    automatismes: [
      {
        id: 'iode-rapide',
        versions: [['bleu foncé', PRES], ['sans changer de couleur', ABS]],
        genere(c) { const [col, b] = c.alea.choisir(this.versions); return { enonce: 'Eau iodée ' + col + ' : de l’amidon ?', reponse: O.choix(c.alea, b, [PRES, ABS]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Chez les Eton, un peuple beti du Cameroun, on fait tremper le manioc dans l’eau pour préparer le bobolo, le bâton de manioc : une enzyme du manioc défait alors ses substances toxiques.',
    prenoms: ['Esther', 'Moussa'],
  };
});
