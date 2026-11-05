/* Notion 12 du bloc « Les nombres » : diviser des fractions. Les verres de bissap. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { frac, simplifier } = O;
  const fp = (n, d) => (n < 0 ? '(' + frac(n, d) + ')' : frac(n, d));
  /** a/b ÷ c/d = a/b × d/c : lignes et résultat simplifié (signe en haut). */
  function quotient(a, b, cc, d) {
    const s = cc < 0 ? -1 : 1; // l'inverse garde le signe, écrit en haut
    const n = s * a * d, D = s * b * cc;
    const r = simplifier(n, D);
    const l = [fp(a, b) + ' ÷ ' + fp(cc, d) + ' = ' + fp(a, b) + ' × ' + fp(s * d, s * cc) + '.', '= ' + frac(n, D) + '.'];
    if (r[1] !== D || r[0] !== n) l.push('= ' + (r[1] === 1 ? r[0] : frac(r[0], r[1])) + '.');
    return { lignes: l, r };
  }

  return {
    id: 'fractions-division',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Diviser des fractions',
    classe: '4e',
    univers: ['cuisine-restaurant', 'commerce'],

    accroche: {
      texte: 'Pour la fête de quartier, Fatou a préparé 3 litres de bissap. Elle le sert dans des verres d’un quart de litre. ' +
        'Combien de verres peut-elle remplir ? On cherche combien de fois un quart va dans 3.',
      image: { dessin: 'gateau', gateaux: [{ nom: 'Litre 1', parts: 4, prises: 4 }, { nom: 'Litre 2', parts: 4, prises: 4 }, { nom: 'Litre 3', parts: 4, prises: 4 }], description: 'Trois litres de bissap, chacun coupé en 4 quarts de litre.' },
    },

    manipulation: {
      image: { dessin: 'gateau', gateaux: [{ nom: 'Litre 1', parts: 4, prises: 4 }, { nom: 'Litre 2', parts: 4, prises: 4 }, { nom: 'Litre 3', parts: 4, prises: 4 }], description: 'Trois litres, et 4 quarts dans chaque litre : 12 verres.' },
      etapes: [
        'Dans un litre, il y a 4 quarts de litre : 4 verres.',
        'Dans 3 litres, il y a 3 fois plus de verres : 3 × 4 = 12 verres.',
        'Donc 3 ÷ 1/4 = 12. Diviser par un quart, c’est multiplier par 4.',
        'Et 4, c’est 1/4 retourné : diviser par une fraction, c’est multiplier par son inverse.',
      ],
    },

    decouverte: {
      texte: (c) => '3 ÷ 1/4 = 3 × 4 = 12. Voici l’astuce : pour diviser par une fraction, ' + c.mot('diviser') + '. ' +
        'Par exemple, 2/3 ÷ 5/7 = 2/3 × 7/5 = 14/15. Les règles des signes restent les mêmes.',
    },

    vocabulaire: {
      termes: {
        diviser: { sesMots: 'on la retourne et on multiplie', officiel: 'on multiplie par son inverse', lesDeux: 'on la retourne et on multiplie, c’est-à-dire on multiplie par son inverse' },
      },
      textes: [
        'Pour l’instant, garde tes mots : pour diviser par une fraction, on la retourne et on multiplie. ' +
          'Les matheux le disent autrement : je te le dirai la prochaine fois.',
        'Les matheux disent : diviser par une fraction, c’est multiplier par son inverse. L’inverse, c’est la fraction retournée.',
        'Tu connais la règle officielle : diviser par un nombre non nul, c’est multiplier par son inverse.',
      ],
    },

    exercices: [
      {
        id: 'verres',
        univers: 'cuisine-restaurant',
        // [litres, verre de 1/k litre]
        versions: [[2, 4], [3, 5], [5, 3], [4, 6], [6, 4], [2, 8], [3, 3], [5, 4]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Fatou a ' + n + ' litres de jus. Combien de verres de ' + frac(1, k) + ' de litre peut-elle remplir ?',
            reponse: { type: 'nombre', valeur: n * k },
            aide: 'Dans un litre, il y a ' + k + ' verres. Calcule ' + n + ' ÷ ' + frac(1, k) + ' = ' + n + ' × ' + k + '.',
            aideParlee: 'Cherche combien de verres il y a dans un litre, puis multiplie par le nombre de litres.',
            correction: [n + ' ÷ ' + frac(1, k) + ' = ' + n + ' × ' + k + ' = ' + n * k + '.', 'Elle remplit ' + n * k + ' verres.'],
          };
        },
      },
      {
        id: 'quotient',
        univers: 'commerce',
        versions: [[2, 3, 5, 7], [3, 4, 1, 2], [5, 6, 2, 3], [1, 2, 3, 4], [4, 5, 2, 5], [7, 8, 3, 4], [3, 5, 9, 10], [2, 9, 4, 3]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = quotient(a, b, cc, d);
          return {
            enonce: 'Calcule : ' + frac(a, b) + ' ÷ ' + frac(cc, d) + '. Donne le résultat sous forme de fraction.',
            reponse: k.r[1] === 1 ? { type: 'nombre', valeur: k.r[0] } : { type: 'fraction', valeur: k.r },
            aide: 'Retourne ' + frac(cc, d) + ' et multiplie.',
            aideParlee: 'Retourne la seconde fraction, puis multiplie.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'avec-signe',
        univers: 'commerce',
        versions: [[-2, 3, 4, 5], [3, 4, -1, 2], [-5, 6, -5, 3], [1, 2, -3, 4], [-4, 7, 2, 7], [-3, 5, -6, 5]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = quotient(a, b, cc, d);
          return {
            enonce: 'Calcule : ' + fp(a, b) + ' ÷ ' + fp(cc, d) + '. Écris le signe moins devant s’il le faut.',
            reponse: k.r[1] === 1 ? { type: 'nombre', valeur: k.r[0] } : { type: 'fraction', valeur: k.r },
            aide: 'Retourne la seconde fraction, multiplie, puis applique la règle des signes.',
            correction: k.lignes,
          };
        },
      },
      {
        id: 'portions',
        univers: 'cuisine-restaurant',
        // [kilos de riz a/b, portion c/d kilo] : nombre entier de portions
        versions: [[3, 2, 1, 4], [5, 2, 1, 8], [9, 4, 3, 8], [2, 1, 1, 5], [4, 3, 1, 6], [15, 4, 3, 8], [6, 5, 1, 10], [7, 2, 1, 4]],
        genere(c) {
          const [a, b, cc, d] = c.alea.choisir(this.versions);
          const k = quotient(a, b, cc, d);
          return {
            enonce: 'Au restaurant d’Ibrahim, il reste ' + (b === 1 ? a : frac(a, b)) + ' kilos de riz. Une portion pèse ' + frac(cc, d) + ' de kilo. Combien de portions peut-il servir ?',
            reponse: { type: 'nombre', valeur: k.r[0] / k.r[1] },
            aide: 'Calcule ' + (b === 1 ? a : frac(a, b)) + ' ÷ ' + frac(cc, d) + ' : retourne et multiplie.',
            aideParlee: 'Divise la quantité de riz par une portion : retourne la fraction de la portion et multiplie.',
            correction: k.lignes.concat(['Il peut servir ' + k.r[0] / k.r[1] + ' portions.']),
          };
        },
      },
      {
        id: 'par-un-entier',
        univers: 'commerce',
        versions: [[3, 4, 3], [6, 7, 2], [4, 5, 8], [9, 10, 3], [2, 3, 4], [5, 8, 5]],
        genere(c) {
          const [a, b, n] = c.alea.choisir(this.versions);
          const k = quotient(a, b, n, 1);
          return {
            enonce: 'Rebecca partage ' + frac(a, b) + ' d’une tarte entre ' + n + ' amies, en parts égales. Quelle fraction de la tarte reçoit chacune ?',
            reponse: { type: 'fraction', valeur: k.r },
            aide: 'Diviser par ' + n + ', c’est multiplier par ' + frac(1, n) + '.',
            aideParlee: 'Diviser par un nombre entier, c’est multiplier par son inverse : un sur ce nombre.',
            correction: [frac(a, b) + ' ÷ ' + n + ' = ' + frac(a, b) + ' × ' + frac(1, n) + ' = ' + frac(a, b * n) + '.'].concat(k.r[1] !== b * n ? ['= ' + frac(k.r[0], k.r[1]) + '.'] : []),
          };
        },
      },
    ],

    defi: {
      // [litres de sirop a/b, dose c/d litre par bouteille, prix d'une bouteille]
      versions: [[9, 2, 3, 4, 2], [15, 4, 3, 8, 3], [10, 3, 5, 6, 2], [7, 2, 1, 4, 3], [12, 5, 2, 5, 4], [5, 2, 5, 8, 3]],
      genere(c) {
        const [a, b, cc, d, prix] = c.alea.choisir(this.versions);
        const k = quotient(a, b, cc, d);
        const n = k.r[0] / k.r[1];
        return {
          enonce: 'Rebecca fabrique du sirop de gingembre pour le vendre au marché. Elle a ' + frac(a, b) + ' litres de sirop. ' +
            'Elle remplit des bouteilles de ' + frac(cc, d) + ' de litre, qu’elle vend ' + prix + ' euros chacune.',
          questions: [
            {
              texte: 'Question 1. Combien de bouteilles peut-elle remplir ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Divise la quantité de sirop par le contenu d’une bouteille.',
              correction: k.lignes.concat(['Elle remplit ' + n + ' bouteilles.']),
            },
            {
              texte: 'Question 2. Combien gagne-t-elle si elle vend toutes ses bouteilles ?',
              reponse: { type: 'nombre', valeur: n * prix },
              aide: 'Multiplie le nombre de bouteilles par le prix d’une bouteille.',
              correction: [n + ' × ' + prix + ' = ' + n * prix + ' euros.'],
            },
            {
              texte: 'Question 3. Moussa dit : « Diviser par ' + frac(cc, d) + ', c’est comme multiplier par ' + frac(d, cc) + '. » Explique pourquoi il a raison.',
              correction: ['L’inverse de ' + frac(cc, d) + ' est ' + frac(d, cc) + ', car ' + frac(cc, d) + ' × ' + frac(d, cc) + ' = 1.', 'Diviser par une fraction, c’est multiplier par son inverse : Moussa a raison.'],
              grille: ['As-tu donné l’inverse de ' + frac(cc, d) + ' ?', 'As-tu vérifié que le produit d’une fraction par son inverse fait 1 ?', 'As-tu cité la règle : diviser, c’est multiplier par l’inverse ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Diviser par une fraction, c’est la retourner et multiplier : tu sais combien de verres remplir.',
    carte: ['verres', 'quotient', 'portions'],
    papierDuSoir: { exercices: ['quotient', 'portions'], defi: true },
    automatismes: [
      {
        id: 'diviser-par-une-fraction',
        versions: [[2, 2], [3, 4], [5, 2], [4, 3], [6, 5]],
        genere(c) { const [n, k] = c.alea.choisir(this.versions); return { enonce: n + ' ÷ ' + frac(1, k) + ' = ?', reponse: { type: 'nombre', valeur: n * k } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Chine, le livre des Neuf Chapitres donnait déjà des règles pour additionner, soustraire, multiplier et diviser des fractions.',
    prenoms: ['Fatou', 'Ibrahim', 'Rebecca', 'Moussa'],
  };
});
