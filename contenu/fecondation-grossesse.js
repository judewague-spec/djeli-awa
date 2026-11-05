/* Notion 18 du bloc SVT « Le corps humain et la santé » : fécondation, grossesse et fertilité. L'échographie de Fatou.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ETAPES = ['Un spermatozoïde rencontre l’ovule dans une trompe', 'Une cellule-œuf se forme', 'Elle se divise en descendant vers l’utérus', 'L’embryon s’installe dans la paroi de l’utérus', 'Il se développe et devient un fœtus'];

  return {
    id: 'fecondation-grossesse',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Fécondation, grossesse et fertilité',
    classe: 'cycle 4',
    univers: ['famille', 'chansons'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : fécondation, grossesse, fertilité.',

    accroche: {
      texte: 'Fatou attend un bébé. Avec sa maman, elle regarde la première échographie : un petit cœur bat déjà sur l’écran. ' +
        'Sa maman est émue : « Il y a quelques semaines, ce bébé n’était qu’une seule cellule ! » Comment une cellule devient-elle un bébé ?',
      image: { dessin: 'chaine', etapes: ETAPES, description: 'Les étapes du début d’une grossesse : rencontre des gamètes dans une trompe, cellule-œuf, divisions, installation dans l’utérus, développement en fœtus.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Début des règles : jour 1', 'L’ovaire prépare un ovule', 'Ovulation, au milieu du cycle', 'La paroi de l’utérus s’épaissit', 'Sans fécondation : nouvelles règles'], description: 'Le cycle de la femme : début des règles, préparation d’un ovule, ovulation au milieu du cycle, paroi de l’utérus qui s’épaissit, puis nouvelles règles s’il n’y a pas de fécondation.' },
      etapes: [
        'Chez la femme, chaque cycle dure environ quatre semaines. Vers le milieu, un ovaire libère un ovule : c’est l’ovulation.',
        'Si un spermatozoïde rencontre l’ovule dans une trompe, ils s’unissent : une cellule-œuf se forme.',
        'La cellule-œuf se divise et descend vers l’utérus, où l’embryon s’installe dans la paroi.',
        'Le placenta se forme : il fait les échanges entre le sang de la mère et celui de l’enfant. La grossesse dure environ neuf mois.',
        'S’il n’y a pas de fécondation, la paroi de l’utérus se détache : ce sont les règles, et un nouveau cycle commence.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’union d’un ovule et d’un spermatozoïde, c’est ' + c.mot('fecondation') + '. Elle donne une cellule-œuf, qui va devenir un embryon, puis un fœtus. ' +
        'La période où une femme peut être enceinte se situe autour de l’ovulation, qui a lieu environ quatorze jours avant les règles suivantes. ' +
        'L’astuce : dans un cycle de vingt-huit jours, l’ovulation a lieu vers le quatorzième jour.',
    },

    vocabulaire: {
      termes: {
        fecondation: { sesMots: 'la grande rencontre', officiel: 'la fécondation', lesDeux: 'la grande rencontre, que les scientifiques appellent la fécondation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la grande rencontre d’un ovule et d’un spermatozoïde donne la toute première cellule du bébé. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la fécondation. La première cellule est la cellule-œuf ; elle devient un embryon, puis un fœtus. L’organe d’échange est le placenta.',
        'Tu connais les mots officiels : fécondation, cellule-œuf, embryon, fœtus, placenta. L’ovulation a lieu environ quatorze jours avant les règles suivantes.',
      ],
    },

    exercices: [
      {
        id: 'jour-d-ovulation',
        univers: 'famille',
        versions: [28, 30, 32, 26, 29, 31],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          return {
            enonce: 'Le cycle d’une femme dure ' + l + ' jours. L’ovulation a lieu environ 14 jours avant les règles suivantes. Vers quel jour du cycle a-t-elle lieu ?',
            reponse: { type: 'nombre', valeur: l - 14 },
            aide: 'Calcule ' + l + ' − 14.',
            aideParlee: 'Enlève quatorze jours à la durée du cycle.',
            correction: [l + ' − 14 = ' + (l - 14) + ' : vers le jour ' + (l - 14) + '.'],
          };
        },
      },
      {
        id: 'prochaines-regles',
        univers: 'famille',
        // [jour du mois du début des règles, durée du cycle]
        versions: [[1, 28], [2, 28], [3, 27], [1, 30], [2, 26], [3, 25]],
        genere(c) {
          const [j, l] = c.alea.choisir(this.versions);
          return {
            enonce: 'Les règles d’Aminata ont commencé le ' + (j === 1 ? '1er' : j) + ' du mois. Son cycle dure ' + l + ' jours. Quel jour du mois les prochaines règles devraient-elles commencer ?',
            reponse: { type: 'nombre', valeur: j + l },
            aide: 'Calcule ' + j + ' + ' + l + '.',
            aideParlee: 'Ajoute la durée du cycle au jour de début.',
            correction: [j + ' + ' + l + ' = ' + (j + l) + ' : le ' + (j + l) + ' du mois, environ.'],
          };
        },
      },
      {
        id: 'en-semaines',
        univers: 'famille',
        versions: [280, 273, 266, 259, 287, 252],
        genere(c) {
          const j = c.alea.choisir(this.versions);
          return {
            enonce: 'Une grossesse a duré ' + j + ' jours. Combien de semaines cela fait-il ?',
            reponse: { type: 'nombre', valeur: j / 7 },
            aide: 'Une semaine, c’est 7 jours : ' + j + ' ÷ 7.',
            aideParlee: 'Divise le nombre de jours par sept.',
            correction: [j + ' ÷ 7 = ' + j / 7 + ' semaines.'],
          };
        },
      },
      {
        id: 'etape-suivante',
        univers: 'chansons',
        versions: [0, 1, 2, 3],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = ETAPES[i + 1];
          return {
            enonce: 'Au début d’une grossesse, que se passe-t-il après cette étape : « ' + ETAPES[i] + ' » ?',
            reponse: O.choix(c.alea, bonne, ETAPES.filter((_, k) => k !== i)),
            aide: 'Rencontre, cellule-œuf, divisions, installation, développement.',
            correction: ['L’ordre : ' + ETAPES.map((t) => t.charAt(0).toLowerCase() + t.slice(1)).join(', puis ') + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'placenta',
        univers: 'famille',
        versions: [['Où a lieu la fécondation ?', 'Dans une trompe'], ['Où se développe le bébé ?', 'Dans l’utérus'], ['Quel organe fait les échanges entre le sang de la mère et celui du bébé ?', 'Le placenta']],
        genere(c) {
          const [q, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: q,
            reponse: O.choix(c.alea, bonne, ['Dans une trompe', 'Dans l’utérus', 'Le placenta', 'Dans un ovaire'].filter((x) => x !== bonne).slice(0, 2)),
            aide: 'Trompe : la rencontre. Utérus : le développement. Placenta : les échanges.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [durée du cycle, jour du mois du début des règles]
      versions: [[28, 1], [30, 2], [26, 3], [32, 1], [29, 2], [27, 1]],
      genere(c) {
        const [l, j] = c.alea.choisir(this.versions);
        return {
          enonce: 'Esther note ses cycles dans un carnet. Ils durent ' + l + ' jours. Ses dernières règles ont commencé le ' + (j === 1 ? '1er' : j) + ' du mois. L’ovulation a lieu environ 14 jours avant les règles suivantes.',
          image: { dessin: 'chaine', etapes: ['Règles : jour 1', 'Ovulation, 14 jours avant les règles', 'Règles suivantes'], description: 'Un cycle : les règles, l’ovulation environ quatorze jours avant les règles suivantes, puis les règles suivantes.' },
          questions: [
            {
              texte: 'Question 1. Quel jour du mois les prochaines règles devraient-elles commencer ?',
              reponse: { type: 'nombre', valeur: j + l },
              aide: 'Ajoute la durée du cycle.',
              correction: [j + ' + ' + l + ' = ' + (j + l) + '.'],
            },
            {
              texte: 'Question 2. Quel jour du mois a lieu, environ, l’ovulation ?',
              reponse: { type: 'nombre', valeur: j + l - 14 },
              aide: 'Quatorze jours avant les règles suivantes.',
              correction: [(j + l) + ' − 14 = ' + (j + l - 14) + '.'],
            },
            {
              texte: 'Question 3. Explique ce qui se passe s’il y a fécondation, et s’il n’y en a pas.',
              correction: ['S’il y a fécondation dans une trompe, une cellule-œuf se forme, descend dans l’utérus et s’y installe : une grossesse commence.', 'Sinon, la paroi de l’utérus se détache : ce sont les règles, et un nouveau cycle commence.'],
              grille: ['As-tu parlé de la cellule-œuf et de l’utérus ?', 'As-tu expliqué les règles quand il n’y a pas de fécondation ?', 'As-tu employé le mot « fécondation » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! De la grande rencontre au fœtus, tu sais comment commence une vie.',
    carte: ['jour-d-ovulation', 'etape-suivante', 'placenta'],
    papierDuSoir: { exercices: ['prochaines-regles', 'en-semaines'], defi: true },
    automatismes: [
      {
        id: 'ovulation-rapide',
        versions: [28, 30, 26],
        genere(c) { const l = c.alea.choisir(this.versions); return { enonce: 'Cycle de ' + l + ' jours : jour de l’ovulation ?', reponse: { type: 'nombre', valeur: l - 14 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Louise Brown, née en Angleterre en 1978, a été le premier bébé conçu par fécondation in vitro.',
    prenoms: ['Fatou', 'Aminata', 'Esther'],
  };
});
