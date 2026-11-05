/* Notion 13 du bloc « Les nombres » : fraction irréductible. Les sachets de bonbons, simplifiés avec le PGCD. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { frac, pgcd } = O;
  const OUI = 'Oui, elle est irréductible', NON = 'Non, on peut simplifier';
  const lignes = (a, b) => {
    const g = pgcd(a, b);
    return ['Le PGCD de ' + a + ' et ' + b + ' est ' + g + '.', frac(a, b) + ' = ' + '(' + a + ' ÷ ' + g + ')/(' + b + ' ÷ ' + g + ')' + ' = ' + frac(a / g, b / g) + '.'];
  };

  return {
    id: 'fraction-irreductible',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Fraction irréductible',
    classe: '3e',
    univers: ['commerce', 'coiffure', 'cuisine-restaurant'],

    accroche: {
      texte: 'Tu te souviens des 84 bonbons et des 60 sucettes d’Aminata ? On peut écrire leur rapport avec une fraction : 84/60. ' +
        'Mais c’est encombrant ! Rachel veut l’écrire avec les plus petits nombres possibles, sans changer sa valeur. Comment faire ?',
      image: { dessin: 'barres', barres: [{ nom: 'Bonbons', parts: 7 }, { nom: 'Sucettes', parts: 5 }], description: 'Deux barres : 7 cases pour les bonbons, 5 cases pour les sucettes. Chaque case vaut 12.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Bonbons', parts: 7 }, { nom: 'Sucettes', parts: 5 }], description: 'Pour 7 bonbons, 5 sucettes : c’est le contenu d’un sachet.' },
      etapes: [
        'On peut simplifier petit à petit : 84/60 = 42/30 (on divise par 2), puis 21/15 (encore par 2), puis 7/5 (par 3).',
        'Plus rapide : le PGCD de 84 et 60 est 12. On divise le haut et le bas par 12 d’un seul coup : 84/60 = 7/5.',
        '7 et 5 n’ont plus aucun diviseur commun, à part 1. On ne peut plus simplifier.',
        'C’est logique : chaque sachet contient 7 bonbons et 5 sucettes.',
      ],
    },

    decouverte: {
      texte: (c) => '84/60 = 7/5, et on ne peut pas aller plus loin : 7/5 est ' + c.mot('irreductible') + '. ' +
        'L’astuce : divise le numérateur et le dénominateur par leur PGCD. Tu obtiens d’un seul coup la fraction la plus simple.',
    },

    vocabulaire: {
      termes: {
        irreductible: { sesMots: 'la fraction la plus simple', officiel: 'une fraction irréductible', lesDeux: 'la fraction la plus simple, une fraction irréductible' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 7/5 est la fraction la plus simple. On ne peut plus diviser en haut et en bas par le même nombre. ' +
          'Les matheux ont un mot pour ça : je te le dirai la prochaine fois.',
        'Les matheux disent : 7/5 est une fraction irréductible. Irréductible, ça veut dire qu’on ne peut plus la réduire : c’est la plus simple.',
        'Tu connais le mot officiel : une fraction est irréductible quand le PGCD du numérateur et du dénominateur vaut 1.',
      ],
    },

    exercices: [
      {
        id: 'simplifier',
        univers: 'cuisine-restaurant',
        versions: [[6, 8], [10, 15], [12, 18], [14, 21], [9, 12], [16, 20], [15, 25], [8, 12], [18, 24], [20, 28]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = pgcd(a, b);
          return {
            enonce: 'Écris ' + frac(a, b) + ' sous forme de fraction irréductible.',
            reponse: { type: 'fraction', valeur: [a / g, b / g], equivalentes: false },
            aide: 'Cherche le plus grand nombre qui divise ' + a + ' et ' + b + '.',
            aideParlee: 'Cherche le plus grand nombre qui divise à la fois le haut et le bas.',
            correction: lignes(a, b),
          };
        },
      },
      {
        id: 'avec-le-pgcd',
        univers: 'commerce',
        versions: [[84, 60], [126, 90], [96, 64], [105, 75], [144, 84], [132, 96], [150, 105], [168, 120]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = pgcd(a, b);
          return {
            enonce: 'Le PGCD de ' + a + ' et ' + b + ' est ' + g + '. Écris ' + frac(a, b) + ' sous forme de fraction irréductible.',
            reponse: { type: 'fraction', valeur: [a / g, b / g], equivalentes: false },
            aide: 'Divise ' + a + ' et ' + b + ' par ' + g + '.',
            aideParlee: 'Divise le haut et le bas par le PGCD.',
            correction: [a + ' ÷ ' + g + ' = ' + a / g + ' et ' + b + ' ÷ ' + g + ' = ' + b / g + '.', 'La fraction irréductible est ' + frac(a / g, b / g) + '.'],
          };
        },
      },
      {
        id: 'est-irreductible',
        univers: 'coiffure',
        versions: [[7, 9], [6, 9], [8, 15], [10, 14], [11, 13], [12, 25], [15, 21], [9, 16], [14, 35], [5, 12]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = pgcd(a, b);
          const bonne = g === 1 ? OUI : NON;
          return {
            enonce: 'Pour ses tresses, Rebecca utilise ' + frac(a, b) + ' d’un paquet de mèches. Cette fraction est-elle irréductible ?',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Cherche un diviseur commun à ' + a + ' et ' + b + ', autre que 1.',
            aideParlee: 'Cherche un diviseur commun au haut et au bas, autre que 1.',
            correction: ['Le PGCD de ' + a + ' et ' + b + ' est ' + g + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quel-pgcd',
        univers: 'commerce',
        versions: [[24, 36], [30, 45], [28, 42], [40, 56], [27, 45], [32, 48], [35, 49], [45, 60]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = pgcd(a, b);
          return {
            enonce: 'Pour simplifier ' + frac(a, b) + ' d’un seul coup, par quel nombre faut-il diviser le haut et le bas ?',
            reponse: { type: 'nombre', valeur: g },
            aide: 'C’est le PGCD de ' + a + ' et ' + b + '.',
            aideParlee: 'C’est le PGCD du haut et du bas.',
            correction: lignes(a, b),
          };
        },
      },
      {
        id: 'part-des-ventes',
        univers: 'commerce',
        // [mangues vendues, mangues en tout]
        versions: [[45, 60], [36, 48], [56, 70], [72, 90], [40, 64], [54, 81], [30, 75], [48, 80]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = pgcd(a, b);
          return {
            enonce: 'Aminata a vendu ' + a + ' mangues sur ' + b + '. Écris la fraction des mangues vendues sous forme irréductible.',
            reponse: { type: 'fraction', valeur: [a / g, b / g], equivalentes: false },
            aide: 'La fraction est ' + frac(a, b) + '. Divise par le PGCD de ' + a + ' et ' + b + '.',
            aideParlee: 'Écris d’abord la fraction des mangues vendues, puis divise le haut et le bas par leur PGCD.',
            correction: ['Mangues vendues : ' + frac(a, b) + '.'].concat(lignes(a, b)),
          };
        },
      },
    ],

    defi: {
      versions: [[252, 196], [210, 126], [180, 150], [168, 140], [240, 180], [270, 210]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        const g = pgcd(a, b);
        return {
          enonce: 'Dans un club de danse, il y a ' + a + ' filles et ' + b + ' garçons. Rebecca veut écrire la fraction filles sur garçons, ' + frac(a, b) + ', le plus simplement possible.',
          questions: [
            {
              texte: 'Question 1. Calcule le PGCD de ' + a + ' et ' + b + '.',
              reponse: { type: 'nombre', valeur: g },
              aide: 'Utilise l’algorithme d’Euclide : divise le grand par le petit, puis recommence avec le reste.',
              correction: ['Avec l’algorithme d’Euclide, le dernier reste non nul est ' + g + '. Le PGCD est ' + g + '.'],
            },
            {
              texte: 'Question 2. Écris ' + frac(a, b) + ' sous forme de fraction irréductible.',
              reponse: { type: 'fraction', valeur: [a / g, b / g], equivalentes: false },
              aide: 'Divise le haut et le bas par le PGCD.',
              correction: lignes(a, b),
            },
            {
              texte: 'Question 3. Explique pourquoi la fraction trouvée est bien irréductible.',
              correction: ['Le PGCD de ' + a / g + ' et ' + b / g + ' est 1 : ils n’ont aucun diviseur commun autre que 1.', 'Donc ' + frac(a / g, b / g) + ' est irréductible.'],
              grille: ['As-tu cherché les diviseurs communs de ' + a / g + ' et ' + b / g + ' ?', 'As-tu dit que leur PGCD vaut 1 ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avec le PGCD, tu écris n’importe quelle fraction de la façon la plus simple, d’un seul coup.',
    carte: ['simplifier', 'avec-le-pgcd', 'part-des-ventes'],
    papierDuSoir: { exercices: ['avec-le-pgcd', 'part-des-ventes'], defi: true },
    automatismes: [
      {
        id: 'simplifier-vite',
        versions: [[2, 4], [3, 9], [5, 10], [4, 6], [6, 9], [10, 12]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); const g = pgcd(a, b); return { enonce: 'Simplifie ' + frac(a, b) + ' au maximum.', reponse: { type: 'fraction', valeur: [a / g, b / g], equivalentes: false } }; },
      },
    ],
    // Fait proposé (Tombouctou) écarté : aucune source sérieuse ouverte ne l'a confirmé (contenu/sources-culture.md).
    savaisTu: null,
    prenoms: ['Aminata', 'Rachel', 'Rebecca'],
  };
});
