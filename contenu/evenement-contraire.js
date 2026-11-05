/* Notion du bloc « Données, probabilités, programmation » : l'événement contraire. Les billets de tombola de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const fr = (n, d) => { const [a, b] = O.simplifier(n, d); return a + '/' + b; };
  const suite = (n, d) => (O.simplifier(n, d)[1] !== d ? ', soit ' + fr(n, d) + '.' : '.');

  return {
    id: 'evenement-contraire',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'L’événement contraire',
    classe: '4e',
    univers: ['commerce', 'dehors'],

    accroche: {
      texte: 'Moussa vend des billets de tombola. Il y a 20 billets, et 5 seulement gagnent un panier. ' +
        'Rachel en prend un. Elle sait calculer sa chance de gagner. Mais quelle est sa chance de perdre ?',
      image: { dessin: 'batons', valeurs: [['Gagnants', 5], ['Perdants', 15]], axe: 'Billets de la tombola', description: 'Un diagramme en bâtons. Sur 20 billets, 5 billets gagnants et 15 billets perdants.' },
    },

    manipulation: {
      etapes: [
        'Un billet gagne, ou il perd. Il n’y a pas de troisième cas.',
        'Sur 20 billets, 5 gagnent. Les 15 autres perdent.',
        'La chance de gagner est 5 sur 20. La chance de perdre est 15 sur 20.',
        'Ajoute les deux chances : 5 sur 20 et 15 sur 20 font 20 sur 20, c’est-à-dire 1.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le billet gagne, ou il ne gagne pas. Ne pas gagner, c’est ' + c.mot('contraire') + ' de gagner. ' +
        'L’astuce : les chances des deux cas s’ajoutent pour faire 1. Pour la chance de perdre, calcule 1 moins la chance de gagner.',
    },

    vocabulaire: {
      termes: {
        contraire: { sesMots: 'le cas opposé', officiel: 'l’événement contraire', lesDeux: 'le cas opposé, que l’on appelle l’événement contraire,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le cas opposé. Gagner et perdre sont deux cas opposés. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’événement contraire, pour le cas opposé. Perdre est l’événement contraire de gagner.',
        'Tu connais le mot officiel : l’événement contraire. On écrit p de non A égale 1 moins p de A.',
      ],
    },

    exercices: [
      {
        id: 'perdre-fraction',
        univers: 'commerce',
        // [billets, billets gagnants]
        versions: [[20, 5], [10, 3], [25, 5], [30, 6], [8, 1], [12, 5]],
        genere(c) {
          const [n, g] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa a ' + n + ' billets de tombola, dont ' + g + ' gagnant' + (g >= 2 ? 's' : '') + '. Rachel tire un billet. Quelle est la probabilité de perdre ? Écris une fraction.',
            reponse: { type: 'fraction', valeur: [n - g, n] },
            aide: 'Calcule 1 moins la probabilité de gagner. Ou compte les billets perdants.',
            aideParlee: 'Calcule un moins la probabilité de gagner. Ou compte les billets perdants.',
            correction: ['Probabilité de gagner : ' + g + '/' + n + '.', 'Perdre est le contraire de gagner : 1 − ' + g + '/' + n + ' = ' + (n - g) + '/' + n + suite(n - g, n)],
          };
        },
      },
      {
        id: 'un-moins-p',
        univers: 'dehors',
        versions: [0.3, 0.65, 0.2, 0.45, 0.9, 0.15],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          return {
            enonce: 'Selon la météo, la probabilité qu’il pleuve demain sur le marché est ' + ecr(p) + '. Quelle est la probabilité qu’il ne pleuve pas, en nombre décimal ?',
            reponse: { type: 'nombre', valeur: r2(1 - p) },
            aide: 'Ne pas pleuvoir est le contraire de pleuvoir. Calcule 1 moins la probabilité de pleuvoir.',
            aideParlee: 'Ne pas pleuvoir est le contraire de pleuvoir. Calcule un moins la probabilité de pleuvoir.',
            correction: ['1 − ' + ecr(p) + ' = ' + ecr(r2(1 - p)) + '.', 'Probabilité qu’il ne pleuve pas : ' + ecr(r2(1 - p)) + '.'],
          };
        },
      },
      {
        id: 'de-contraire',
        univers: 'commerce',
        // [événement avec un dé à six faces, nombre de faces concernées]
        versions: [['obtenir un 6', 1], ['obtenir un nombre pair', 3], ['obtenir un nombre plus grand que 2', 4], ['obtenir 1 ou 2', 2], ['obtenir un multiple de 3', 2], ['obtenir un nombre plus petit que 6', 5]],
        genere(c) {
          const [e, f] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa lance un dé à six faces. L’événement A est : « ' + e + ' ». Quelle est la probabilité de l’événement contraire de A ? Écris une fraction.',
            reponse: { type: 'fraction', valeur: [6 - f, 6] },
            aide: 'Calcule la probabilité de A, puis fais 1 moins ce résultat.',
            aideParlee: 'Calcule la probabilité de A, puis fais un moins ce résultat.',
            correction: ['Probabilité de A : ' + f + '/6.', 'p(non A) = 1 − ' + f + '/6 = ' + (6 - f) + '/6' + suite(6 - f, 6)],
          };
        },
      },
      {
        id: 'bon-contraire',
        univers: 'commerce',
        // [événement, son contraire, deux événements qui ne le sont pas]
        versions: [
          ['Le dé donne un nombre pair', 'Le dé donne un nombre impair', 'Le dé donne un 6', 'Le dé donne un nombre plus grand que 3'],
          ['Le dé donne un 6', 'Le dé donne 1, 2, 3, 4 ou 5', 'Le dé donne un 1', 'Le dé donne un nombre pair'],
          ['Le dé donne un nombre plus grand que 4', 'Le dé donne un nombre plus petit ou égal à 4', 'Le dé donne un nombre plus petit que 4', 'Le dé donne un nombre plus grand que 2'],
          ['La carte tirée est un cœur', 'La carte tirée n’est pas un cœur', 'La carte tirée est un pique', 'La carte tirée est un carreau'],
          ['Le billet est gagnant', 'Le billet est perdant', 'Le billet porte un numéro pair', 'Le billet porte le numéro 1'],
        ],
        genere(c) {
          const [e, juste, p1, p2] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel est l’événement contraire de « ' + e.charAt(0).toLowerCase() + e.slice(1) + ' » ?',
            reponse: O.choix(c.alea, juste, [p1, p2]),
            aide: 'L’événement contraire arrive exactement quand l’autre n’arrive pas : tous les autres cas, sans rien oublier.',
            correction: ['Le contraire de « ' + e.charAt(0).toLowerCase() + e.slice(1) + ' » contient tous les autres cas, et seulement eux.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'retrouver-p',
        univers: 'dehors',
        // probabilité de l'événement contraire
        versions: [0.35, 0.8, 0.6, 0.25, 0.1, 0.95],
        genere(c) {
          const q = c.alea.choisir(this.versions);
          return {
            enonce: 'La probabilité de l’événement contraire de A est ' + ecr(q) + '. Quelle est la probabilité de A, en nombre décimal ?',
            reponse: { type: 'nombre', valeur: r2(1 - q) },
            aide: 'Les deux probabilités s’ajoutent pour faire 1.',
            aideParlee: 'Les deux probabilités s’ajoutent pour faire un.',
            correction: ['p(A) + p(non A) = 1, donc p(A) = 1 − ' + ecr(q) + '.', '1 − ' + ecr(q) + ' = ' + ecr(r2(1 - q)) + '.'],
          };
        },
      },
    ],

    defi: {
      // [rouges, jaunes, bleus] sur une roue de tombola
      versions: [[3, 2, 5], [4, 4, 2], [6, 4, 10], [5, 10, 5]],
      genere(c) {
        const [r, j, b] = c.alea.choisir(this.versions);
        const t = r + j + b, pasBleu = t - b, oui = 2 * pasBleu > t;
        return {
          enonce: 'La roue de tombola de Moussa a ' + t + ' secteurs égaux : ' + r + ' rouges, ' + j + ' jaunes et ' + b + ' bleus. Rachel fait tourner la roue.',
          questions: [
            {
              texte: 'Question 1. Quelle est la probabilité d’obtenir un secteur rouge ? Écris une fraction.',
              reponse: { type: 'fraction', valeur: [r, t] },
              aide: 'Secteurs rouges sur nombre total de secteurs.',
              correction: ['Il y a ' + r + ' secteurs rouges sur ' + t + '.', 'Probabilité : ' + r + '/' + t + suite(r, t)],
            },
            {
              texte: 'Question 2. Quelle est la probabilité de ne pas obtenir de rouge, en nombre décimal ?',
              reponse: { type: 'nombre', valeur: r2(1 - r / t) },
              aide: 'Calcule 1 moins la probabilité d’obtenir un rouge.',
              aideParlee: 'Calcule un moins la probabilité d’obtenir un rouge.',
              correction: ['p(rouge) = ' + r + '/' + t + ' = ' + ecr(r2(r / t)) + '.', '1 − ' + ecr(r2(r / t)) + ' = ' + ecr(r2(1 - r / t)) + '.'],
            },
            {
              texte: 'Question 3. Rachel dit : « J’ai plus de chances de ne pas tomber sur le bleu que d’y tomber. » A-t-elle raison ?',
              reponse: O.choix(c.alea, oui ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare la probabilité d’obtenir un bleu et la probabilité de ne pas en obtenir.',
              aideParlee: 'Compare la probabilité d’obtenir un bleu et la probabilité de ne pas en obtenir.',
              correction: ['p(bleu) = ' + b + '/' + t + '. p(pas de bleu) = 1 − ' + b + '/' + t + ' = ' + pasBleu + '/' + t + '.', pasBleu + '/' + t + (oui ? ' est plus grand que ' : ' n’est pas plus grand que ') + b + '/' + t + ' : la réponse est ' + (oui ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Moussa dit : « La probabilité d’obtenir un rouge et celle de ne pas en obtenir font ensemble 1. » A-t-il raison ? Explique.',
              correction: ['Oui. Obtenir un rouge et ne pas en obtenir sont deux cas opposés, et il n’y a pas d’autre cas.', 'Leurs probabilités s’ajoutent donc pour faire 1.'],
              grille: ['As-tu répondu que Moussa a raison ?', 'As-tu dit que les deux cas sont opposés et qu’il n’y en a pas d’autre ?', 'As-tu écrit que p(non A) = 1 − p(A) ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais trouver la chance de perdre quand tu connais la chance de gagner. Un moins la chance, c’est tout !',
    carte: ['perdre-fraction', 'un-moins-p', 'retrouver-p'],
    papierDuSoir: { exercices: ['de-contraire', 'perdre-fraction'], defi: true },
    automatismes: [
      {
        id: 'un-moins-vite',
        versions: [[0.4], [0.7], [0.25], [0.9]],
        genere(c) { const [p] = c.alea.choisir(this.versions); return { enonce: 'p(A) = ' + ecr(p) + '. p(non A) = ?', reponse: { type: 'nombre', valeur: r2(1 - p) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, le chevalier de Méré a posé une question de dés à Blaise Pascal.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
