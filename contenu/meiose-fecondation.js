/* Notion 13 du bloc SVT « Le vivant et son évolution » : la méiose et la fécondation. Rebecca et les enfants de sa voisine.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const CORPS = 'Une cellule du corps', GAMETE = 'Un gamète', OEUF = 'Une cellule-œuf';

  return {
    id: 'meiose-fecondation',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'La méiose et la fécondation',
    classe: '3e',
    univers: ['famille', 'chansons'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : méiose et fécondation, stabilité du nombre de chromosomes et diversité des individus.',

    accroche: {
      texte: 'Rebecca regarde les trois enfants de sa voisine. Mêmes parents, et pourtant, ils ne se ressemblent pas tout à fait. Comment deux parents peuvent-ils faire des enfants tous différents ? ' +
        'Et comment le nombre de chromosomes reste-t-il toujours le même, de génération en génération ?',
      image: { dessin: 'chaine', etapes: ['Cellule du parent : 46 chromosomes', 'Gamète : 23 chromosomes', 'Deux gamètes s’unissent', 'Cellule-œuf : 46 chromosomes'], description: 'Une cellule du parent a 46 chromosomes ; un gamète n’en a que 23 ; deux gamètes s’unissent ; la cellule-œuf a de nouveau 46 chromosomes.' },
    },

    manipulation: {
      type: 'chromosomes',
      but: 'complet',
      consigne: 'Voici une cellule imaginaire, à six chromosomes. Forme les trois paires. Puis garde un seul chromosome de chaque paire : c’est un gamète. Enfin, réunis deux gamètes.',
    },

    decouverte: {
      texte: (c) => 'Pour fabriquer un gamète, la cellule fait ' + c.mot('meiose') + '. Le gamète ne garde qu’un chromosome de chaque paire. Chez l’être humain, cela fait 23 chromosomes. ' +
        'Puis deux gamètes s’unissent : c’est ' + c.mot('fecondation') + '. On retrouve 46 chromosomes. ' +
        'L’astuce : on coupe en deux, puis on réunit. Et le tri se fait au hasard : chaque enfant est unique, sauf les vrais jumeaux.',
    },

    vocabulaire: {
      termes: {
        meiose: { sesMots: 'le grand partage', officiel: 'la méiose', lesDeux: 'le grand partage, que les scientifiques appellent la méiose' },
        fecondation: { sesMots: 'la grande réunion', officiel: 'la fécondation', lesDeux: 'la grande réunion, que l’on appelle la fécondation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le grand partage, et la grande réunion. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la méiose, pour le grand partage qui donne les gamètes. La fécondation, pour la grande réunion, qui donne la cellule-œuf.',
        'Tu connais les mots officiels : la méiose, la fécondation, le gamète et la cellule-œuf.',
      ],
    },

    exercices: [
      {
        id: 'chromosomes-du-gamete',
        univers: 'famille',
        // chromosomes des cellules du corps
        versions: [46, 78, 38, 20, 44, 24],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Les cellules du corps d’une espèce ont ' + n + ' chromosomes. Combien de chromosomes ont ses gamètes ?',
            reponse: { type: 'nombre', valeur: n / 2 },
            aide: 'Un gamète garde un chromosome de chaque paire. Calcule ' + n + ' ÷ 2.',
            aideParlee: 'Un gamète garde un chromosome de chaque paire. Divise par deux.',
            correction: [n + ' ÷ 2 = ' + n / 2 + ' chromosomes.'],
          };
        },
      },
      {
        id: 'chromosomes-de-l-oeuf',
        univers: 'famille',
        // chromosomes d'un gamète
        versions: [23, 39, 19, 10, 22, 12],
        genere(c) {
          const g = c.alea.choisir(this.versions);
          return {
            enonce: 'Chez une espèce, un gamète a ' + g + ' chromosomes. Combien de chromosomes a la cellule-œuf, après la fécondation ?',
            reponse: { type: 'nombre', valeur: 2 * g },
            aide: 'Deux gamètes s’unissent. Calcule ' + g + ' + ' + g + '.',
            aideParlee: 'Deux gamètes s’unissent. Additionne leurs chromosomes.',
            correction: [g + ' + ' + g + ' = ' + 2 * g + ' chromosomes.'],
          };
        },
      },
      O.qcm('qui-a-combien', 'famille',
        [['Chez l’être humain, qui a 23 chromosomes ?', GAMETE], ['Chez l’être humain, qui se forme juste après l’union de deux gamètes ?', OEUF], ['Chez l’être humain, laquelle est une cellule du bras, avec 46 chromosomes ?', CORPS]].map((v) => [v[0], v[1], 'Un gamète a 23 chromosomes. L’union de deux gamètes donne une cellule-œuf. Une cellule du bras en a 46.']),
        (x) => x, [CORPS, GAMETE, OEUF],
        'Le gamète n’a qu’un chromosome de chaque paire.'),
      {
        id: 'gametes-differents',
        univers: 'chansons',
        // nombre de paires de chromosomes
        versions: [2, 3, 4, 5, 6],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour chaque paire, le gamète garde l’un ou l’autre des deux chromosomes. Avec ' + p + ' paires, combien de gamètes différents peut-on faire ?',
            reponse: { type: 'nombre', valeur: 2 ** p },
            aide: 'Deux choix par paire : multiplie 2 par lui-même, ' + p + ' fois.',
            aideParlee: 'Deux choix par paire : multiplie deux par lui-même, autant de fois qu’il y a de paires.',
            correction: [Array(p).fill(2).join(' × ') + ' = ' + 2 ** p + ' gamètes différents.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'famille',
        [['Hors vrais jumeaux, deux enfants des mêmes parents reçoivent les mêmes chromosomes.', 'Faux'], ['La méiose donne des gamètes tous différents.', 'Vrai'], ['La fécondation rétablit le nombre de chromosomes de l’espèce.', 'Vrai']].map((v) => [v[0], v[1], 'Le tri au hasard donne des gamètes différents : hors vrais jumeaux, deux enfants diffèrent. La fécondation redonne le nombre de l’espèce.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Le tri des chromosomes se fait au hasard.'),
    ],

    defi: {
      // [chromosomes du chat ou d'une autre espèce, paires du modèle]
      versions: [[38, 3], [78, 3], [46, 3], [20, 3]],
      genere(c) {
        const [n, p] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : chez une espèce, les cellules du corps ont ' + n + ' chromosomes. Un parent fabrique des gamètes par méiose. Ensuite, les deux gamètes, un de chaque parent, s’unissent. Pour étudier le hasard, on prend un modèle plus simple, à ' + p + ' paires de chromosomes.',
          image: { dessin: 'chromosomes', legende: '3 paires ; un trait : venu du père', description: 'Un modèle de cellule : trois paires de bâtonnets, un grand, un moyen, un petit, chaque fois un de la mère et un du père.' },
          questions: [
            {
              texte: 'Question 1. Combien de chromosomes ont les gamètes de cette espèce ?',
              reponse: { type: 'nombre', valeur: n / 2 },
              aide: 'Divise par deux le nombre de chromosomes de la cellule du corps.',
              correction: [n + ' ÷ 2 = ' + n / 2 + ' chromosomes.'],
            },
            {
              texte: 'Question 2. Avec le modèle plus simple, combien de gamètes différents peut-on obtenir ?',
              reponse: { type: 'nombre', valeur: 2 ** p },
              aide: 'Deux choix par paire : multiplie les choix entre eux.',
              correction: [Array(p).fill(2).join(' × ') + ' = ' + 2 ** p + ' gamètes.'],
            },
            {
              texte: 'Question 3. Explique pourquoi deux enfants des mêmes parents sont différents.',
              correction: ['Pendant la méiose, chaque parent fabrique des gamètes différents, par le tri au hasard des chromosomes.', 'À la fécondation, deux gamètes se rencontrent au hasard : chaque cellule-œuf est unique.'],
              grille: ['As-tu parlé de la méiose et du tri des chromosomes ?', 'As-tu parlé de la fécondation ?', 'As-tu utilisé le mot « hasard » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Partager, puis réunir, et le hasard au milieu : tu sais pourquoi chaque enfant est unique.',
    carte: ['chromosomes-du-gamete', 'chromosomes-de-l-oeuf', 'qui-a-combien'],
    papierDuSoir: { exercices: ['chromosomes-du-gamete', 'gametes-differents'], defi: true },
    automatismes: [
      {
        id: 'moitie-ou-double',
        versions: [[46, 23], [38, 19], [20, 10], [78, 39]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: 'La moitié de ' + a + ' = ?', reponse: { type: 'nombre', valeur: a / 2 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Liège, en Belgique, Édouard Van Beneden découvre en 1883 ce qu’on appellera plus tard la méiose.',
    prenoms: ['Rebecca'],
  };
});
