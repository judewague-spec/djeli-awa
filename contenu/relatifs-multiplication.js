/* Notion 4 du bloc « Les nombres » : nombres relatifs, multiplication et division. Les dettes de Moussa. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr, par } = O;
  const POS = 'Positif', NEG = 'Négatif';

  return {
    id: 'relatifs-multiplication',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Nombres relatifs : multiplication et division',
    classe: '4e',
    univers: ['famille', 'commerce'],

    accroche: {
      texte: 'Moussa a emprunté 5 euros à trois amis : à Ibrahim, à Fatou et à Aminata. Il a donc trois dettes de 5 euros. ' +
        'Une dette, c’est de l’argent en moins : on l’écrit avec un signe moins. Comment calculer ce qu’il doit en tout ? ' +
        'Et que se passe-t-il si un ami efface sa dette ?',
      image: { dessin: 'barres', barres: [{ nom: 'Ibrahim', parts: 5 }, { nom: 'Fatou', parts: 5 }, { nom: 'Aminata', parts: 5 }], description: 'Trois dettes de 5 euros, une par ami : trois barres de 5 cases.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Dette 1', parts: 5 }, { nom: 'Dette 2', parts: 5 }, { nom: 'Dette 3', parts: 5 }], description: 'Trois barres de 5 cases : trois dettes de 5 euros.' },
      etapes: [
        'Une dette de 5 euros s’écrit −5.',
        'Trois dettes de 5 euros : (−5) + (−5) + (−5) = −15. Donc 3 × (−5) = −15 : un positif fois un négatif donne un négatif.',
        'Effacer une dette, c’est comme gagner de l’argent. Effacer trois dettes de 5 euros, c’est gagner 15 euros : (−3) × (−5) = 15.',
        'Pour diviser, c’est pareil : partager une dette de 15 euros en 3, ça fait trois dettes de 5. (−15) ÷ 3 = −5.',
      ],
    },

    decouverte: {
      texte: (c) => 'Voici ' + c.mot('regle') + ' : deux signes pareils donnent un résultat positif ; deux signes différents donnent un résultat négatif. ' +
        '3 × (−5) = −15, et (−3) × (−5) = 15. C’est la même chose pour la division : (−15) ÷ (−3) = 5. ' +
        'L’astuce : calcule d’abord sans les signes, puis compte les signes moins. Un nombre pair de signes moins, le résultat est positif.',
    },

    vocabulaire: {
      termes: {
        regle: { sesMots: 'l’astuce des dettes', officiel: 'la règle des signes', lesDeux: 'l’astuce des dettes, que les matheux appellent la règle des signes' },
      },
      textes: [
        'Pour l’instant, garde tes mots : c’est l’astuce des dettes. Une dette fois un nombre positif reste une dette. Effacer une dette, c’est gagner. ' +
          'Les matheux ont un nom pour cette astuce : je te le dirai la prochaine fois.',
        'Les matheux appellent notre astuce des dettes la règle des signes. Le résultat d’une multiplication s’appelle un produit, ' +
          'et celui d’une division, un quotient. Même règle pour les deux.',
        'Tu connais le mot officiel : la règle des signes. Un produit ou un quotient de deux nombres de même signe est positif ; de signes contraires, il est négatif.',
      ],
    },

    exercices: [
      {
        id: 'dettes',
        univers: 'famille',
        // [nombre de dettes, montant de chaque dette]
        versions: [[4, 6], [3, 8], [5, 7], [6, 4], [2, 15], [7, 3], [4, 9], [8, 5], [3, 12], [9, 2]],
        genere(c) {
          const [n, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure a ' + n + ' factures en retard de ' + d + ' euros chacune. Écris ce qu’elle doit comme un nombre relatif.',
            reponse: { type: 'nombre', valeur: -n * d },
            aide: 'Chaque facture, c’est ' + ecr(-d) + '. Calcule ' + n + ' × ' + par(-d) + '.',
            aideParlee: 'Chaque facture en retard, c’est une dette : un nombre négatif. Multiplie par le nombre de factures.',
            correction: [n + ' × ' + par(-d) + ' = ' + ecr(-n * d) + '.', 'Elle doit ' + n * d + ' euros : on écrit ' + ecr(-n * d) + '.'],
          };
        },
      },
      {
        id: 'produit',
        univers: 'commerce',
        versions: [[-4, 7], [6, -8], [-9, -3], [-5, -5], [7, -6], [-12, 3], [-2, -11], [8, -9], [-7, -8], [10, -4]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule : ' + par(a) + ' × ' + par(b) + '.',
            reponse: { type: 'nombre', valeur: a * b },
            aide: 'Sans les signes : ' + Math.abs(a) + ' × ' + Math.abs(b) + ' = ' + Math.abs(a * b) + '. Puis regarde si les signes sont pareils.',
            aideParlee: 'Calcule d’abord sans les signes. Puis : signes pareils, résultat positif ; signes différents, résultat négatif.',
            correction: [Math.abs(a) + ' × ' + Math.abs(b) + ' = ' + Math.abs(a * b) + '.', (a < 0) === (b < 0) ? 'Les signes sont pareils : le produit est positif.' : 'Les signes sont différents : le produit est négatif.', par(a) + ' × ' + par(b) + ' = ' + ecr(a * b) + '.'],
          };
        },
      },
      {
        id: 'quotient',
        univers: 'commerce',
        versions: [[-24, 6], [35, -7], [-48, -8], [-56, 7], [63, -9], [-42, -6], [-90, 10], [72, -8], [-36, -4], [-81, 9]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule : ' + par(a) + ' ÷ ' + par(b) + '.',
            reponse: { type: 'nombre', valeur: a / b },
            aide: 'Sans les signes : ' + Math.abs(a) + ' ÷ ' + Math.abs(b) + ' = ' + Math.abs(a / b) + '. Puis la règle des signes.',
            aideParlee: 'Divise d’abord sans les signes. Puis : signes pareils, résultat positif ; signes différents, résultat négatif.',
            correction: [Math.abs(a) + ' ÷ ' + Math.abs(b) + ' = ' + Math.abs(a / b) + '.', (a < 0) === (b < 0) ? 'Signes pareils : quotient positif.' : 'Signes différents : quotient négatif.', par(a) + ' ÷ ' + par(b) + ' = ' + ecr(a / b) + '.'],
          };
        },
      },
      {
        id: 'signe-du-produit',
        univers: 'famille',
        versions: [[-2, 3, -4], [-1, -5, -2], [3, -7, 2], [-6, -1, 3, -2], [2, -3, -4, -5], [-8, 5], [-3, -3, -3, -3], [4, -2, 1]],
        genere(c) {
          const f = c.alea.choisir(this.versions);
          const negatifs = f.filter((x) => x < 0).length;
          const bonne = negatifs % 2 ? NEG : POS;
          return {
            enonce: 'Sans calculer, dis si ce produit est positif ou négatif : ' + f.map(par).join(' × ') + '.',
            reponse: O.choix(c.alea, bonne, [POS, NEG]),
            aide: 'Compte les signes moins : ' + negatifs + '. Pair ou impair ?',
            aideParlee: 'Compte les signes moins. Un nombre pair de signes moins donne un résultat positif.',
            correction: ['Il y a ' + negatifs + ' signe' + (negatifs > 1 ? 's' : '') + ' moins : c’est un nombre ' + (negatifs % 2 ? 'impair' : 'pair') + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'partage-dette',
        univers: 'commerce',
        // [dette totale, nombre d'associées]
        versions: [[60, 4], [90, 3], [120, 5], [84, 6], [150, 6], [72, 8], [100, 4], [45, 3], [140, 7], [96, 4]],
        genere(c) {
          const [d, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'La boutique de Rebecca et de ses ' + (k - 1) + ' associées a une dette de ' + d + ' euros. Elles la partagent en parts égales. ' +
              'Écris la part de chacune comme un nombre relatif.',
            reponse: { type: 'nombre', valeur: -d / k },
            aide: 'Calcule ' + par(-d) + ' ÷ ' + k + '.',
            aideParlee: 'Une dette est un nombre négatif. Divise-la par le nombre de personnes.',
            correction: [par(-d) + ' ÷ ' + k + ' = ' + ecr(-d / k) + '.', 'Chacune doit ' + d / k + ' euros : ' + ecr(-d / k) + '.'],
          };
        },
      },
    ],

    defi: {
      // Programme : multiplier par k (négatif), puis ajouter b. [k, b, premier nombre, second nombre (négatif)]
      versions: [[-3, 5, 4, -2], [-2, 7, 6, -3], [-4, 3, 2, -5], [-5, 2, 3, -1], [-3, 8, 5, -4], [-2, 9, 7, -6]],
      genere(c) {
        const [k, b, x, y] = c.alea.choisir(this.versions);
        const f = (v) => k * v + b;
        return {
          enonce: 'Voici un programme de calcul. Choisir un nombre. Le multiplier par ' + ecr(k) + '. Ajouter ' + b + ' au résultat.',
          questions: [
            {
              texte: 'Question 1. Quel résultat obtient-on en choisissant ' + x + ' ?',
              reponse: { type: 'nombre', valeur: f(x) },
              aide: 'Multiplie d’abord, avec la règle des signes, puis ajoute.',
              correction: [x + ' × ' + par(k) + ' = ' + ecr(k * x) + '.', ecr(k * x) + ' + ' + b + ' = ' + ecr(f(x)) + '.'],
            },
            {
              texte: 'Question 2. Quel résultat obtient-on en choisissant ' + ecr(y) + ' ?',
              reponse: { type: 'nombre', valeur: f(y) },
              aide: 'Un nombre négatif fois un nombre négatif donne un nombre positif.',
              correction: [par(y) + ' × ' + par(k) + ' = ' + ecr(k * y) + '.', ecr(k * y) + ' + ' + b + ' = ' + ecr(f(y)) + '.'],
            },
            {
              texte: 'Question 3. Rebecca affirme : « Si on choisit un nombre négatif, le résultat est toujours positif. » A-t-elle raison ? Explique.',
              correction: ['Un nombre négatif multiplié par ' + ecr(k) + ' donne un nombre positif : deux signes pareils.',
                'Puis on ajoute ' + b + ', qui est positif : le résultat est encore positif, et même plus grand que ' + b + '.',
                'Rebecca a raison.'],
              grille: ['As-tu utilisé la règle des signes pour la multiplication ?', 'As-tu dit qu’ajouter un nombre positif garde un résultat positif ?', 'As-tu conclu par une phrase : « Rebecca a raison » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avec l’astuce des dettes, tu multiplies et tu divises les nombres relatifs sans te tromper de signe.',
    carte: ['dettes', 'produit', 'quotient'],
    papierDuSoir: { exercices: ['partage-dette', 'quotient'], defi: true },
    automatismes: [
      {
        id: 'produit-signe',
        versions: [[-3, 4], [-6, -2], [5, -5], [-7, -3], [8, -2], [-9, 1]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: par(a) + ' × ' + par(b) + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
      {
        id: 'quotient-signe',
        versions: [[-12, 3], [20, -4], [-18, -6], [-30, 5], [27, -9], [-16, -8]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: par(a) + ' ÷ ' + par(b) + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Inde, le savant Brahmagupta a écrit les règles des nombres négatifs, qu’il appelait des « dettes », et des positifs, qu’il appelait des « fortunes ».',
    prenoms: ['Moussa', 'Ibrahim', 'Fatou', 'Aminata', 'Laure', 'Rebecca'],
  };
});
