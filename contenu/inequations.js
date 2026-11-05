/* Notion 14 du bloc « Le calcul avec des lettres » : inéquations. Le budget de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;
  const OUI = 'Oui, le nombre convient', NON = 'Non, le nombre ne convient pas';

  return {
    id: 'inequations',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Les inéquations',
    classe: 'ancien programme',
    univers: ['commerce', 'famille', 'maison-courses'],

    accroche: {
      texte: 'Laure a 20 euros pour le marché. Elle doit payer 2 euros de transport. Puis elle veut le plus de kilos de tomates possible, à 3 euros le kilo. ' +
        'Combien de kilos peut-elle prendre sans dépasser son budget ? Cette fois, le total n’a pas besoin d’être égal à 20 : il peut être plus petit, ou égal.',
      image: { dessin: 'chaine', etapes: ['3x + 2 ≤ 20', '3x ≤ 18', 'x ≤ 6'], description: '3x plus 2 inférieur ou égal à 20. Donc 3x inférieur ou égal à 18. Donc x inférieur ou égal à 6.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Égalité : un seul nombre', 'Inégalité : beaucoup de nombres', 'x ≤ 6 : 6, 5, 4, 3…'], description: 'Une égalité donne un seul nombre. Une inégalité en donne beaucoup : x inférieur ou égal à 6, c’est 6, 5, 4, 3 et les autres nombres plus petits.' },
      etapes: [
        'Le signe ≤ se lit « inférieur ou égal à ». Le signe < se lit « strictement inférieur à ».',
        'Le budget s’écrit : 3x + 2 ≤ 20.',
        'On résout comme une équation : on enlève 2 des deux côtés, 3x ≤ 18 ; on divise par 3, x ≤ 6.',
        'Laure peut prendre 6 kilos, ou moins. Tous ces nombres sont des solutions.',
        'Attention : si l’on multiplie ou divise par un nombre négatif, le sens du signe change. −2x ≤ 6 donne x ≥ −3.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un calcul avec le signe plus petit ou plus grand, et une boîte mystère ? C’est ' + c.mot('inequation') + '. Elle se résout comme une équation : on fait la même chose des deux côtés. ' +
        'Ses solutions sont beaucoup de nombres. ' +
        'L’astuce : attention aux nombres négatifs. Quand on divise par l’un d’eux, ' + c.mot('sens') + '.',
    },

    vocabulaire: {
      termes: {
        inequation: { sesMots: 'une limite à ne pas dépasser', officiel: 'une inéquation', lesDeux: 'une limite à ne pas dépasser, que les matheux appellent une inéquation' },
        sens: { sesMots: 'le signe se retourne', officiel: 'le sens de l’inégalité change', lesDeux: 'le signe se retourne : les matheux disent que le sens de l’inégalité change' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une limite à ne pas dépasser, et le signe qui se retourne. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une inéquation, et le sens de l’inégalité change quand on divise par un nombre négatif.',
        'Tu connais les mots officiels : une inéquation, inférieur ou égal, supérieur ou égal, et le sens de l’inégalité.',
      ],
    },

    exercices: [
      {
        id: 'le-plus-possible',
        univers: 'commerce',
        // [prix au kilo, transport, budget]
        versions: [[3, 2, 20], [4, 1, 23], [2, 3, 15], [5, 2, 30], [3, 5, 20], [4, 3, 25]],
        genere(c) {
          const [p, t, b] = c.alea.choisir(this.versions);
          const n = Math.floor((b - t) / p);
          return {
            enonce: 'Laure a ' + b + ' euros. Elle paie ' + O.nb(t, 'euro') + ' de transport, et le kilo de tomates coûte ' + p + ' euros. Combien de kilos entiers peut-elle acheter, au plus ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Résous ' + expr(p, t) + ' ≤ ' + b + ', puis garde le plus grand nombre entier.',
            aideParlee: 'Écris l’inéquation, résous-la, puis garde le plus grand nombre entier.',
            correction: [p + 'x ≤ ' + (b - t) + '.', 'x ≤ ' + O.ecr(Math.round(((b - t) / p) * 100) / 100) + ' : au plus ' + n + ' kilos.'],
          };
        },
      },
      {
        id: 'ce-nombre-convient',
        univers: 'maison-courses',
        // [a, b, c, x] : ax + b ≤ c
        versions: [[3, 2, 20, 6], [3, 2, 20, 7], [2, 5, 15, 5], [2, 5, 15, 6], [4, 1, 21, 5], [4, 1, 21, 6]],
        genere(c) {
          const [a, b, t, x] = c.alea.choisir(this.versions);
          const v = a * x + b, bonne = v <= t ? OUI : NON;
          return {
            enonce: 'Le nombre ' + x + ' est-il solution de ' + expr(a, b) + ' ≤ ' + t + ' ?',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Calcule ' + a + ' × ' + x + ' + ' + b + ', puis compare à ' + t + '.',
            aideParlee: 'Remplace x, calcule, puis compare.',
            correction: [a + ' × ' + x + ' + ' + b + ' = ' + v + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'resoudre',
        univers: 'famille',
        // [a, b, s] : ax + b ≤ a×s + b
        versions: [[3, 2, 6], [2, 5, 5], [4, 1, 5], [5, 3, 4], [6, 2, 3]],
        genere(c) {
          const [a, b, s] = c.alea.choisir(this.versions);
          const t = a * s + b, bonne = 'x ≤ ' + s;
          return {
            enonce: 'Résous ' + expr(a, b) + ' ≤ ' + t + '.',
            reponse: O.choix(c.alea, bonne, ['x ≥ ' + s, 'x ≤ ' + (t - b), 'x = ' + s]),
            aide: 'Enlève ' + b + ' des deux côtés, puis divise par ' + a + '.',
            aideParlee: 'Fais comme pour une équation : enlève le nombre seul, puis divise.',
            correction: [a + 'x ≤ ' + (t - b) + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'sens-qui-change',
        univers: 'maison-courses',
        // [a, c] : −ax ≤ c
        versions: [[2, 6], [3, 12], [5, 10], [4, 8], [2, 14]],
        genere(c) {
          const [a, t] = c.alea.choisir(this.versions);
          const s = t / a, bonne = 'x ≥ −' + s;
          return {
            enonce: 'Résous −' + a + 'x ≤ ' + t + '.',
            reponse: O.choix(c.alea, bonne, ['x ≤ −' + s, 'x ≥ ' + s, 'x ≤ ' + s]),
            aide: 'Tu divises par un nombre négatif : le signe se retourne.',
            correction: ['On divise par −' + a + ' : le sens change.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      O.qcm('lire-le-signe', 'commerce',
        [['ne pas dépasser 20 euros', 'x ≤ 20'], ['avoir au moins 20 euros', 'x ≥ 20'], ['dépenser moins de 20 euros, sans atteindre 20', 'x < 20']],
        (x) => 'Comment écrire : ' + x + ' ?', ['x ≤ 20', 'x ≥ 20', 'x < 20'],
        'Ne pas dépasser : inférieur ou égal. Au moins : supérieur ou égal.'),
    ],

    defi: {
      // [prix au kilo, transport, budget]
      versions: [[3, 2, 20], [4, 1, 23], [2, 3, 15], [5, 2, 30]],
      genere(c) {
        const [p, t, b] = c.alea.choisir(this.versions);
        const n = Math.floor((b - t) / p), reste = b - t - n * p;
        const bonne = expr(p, t) + ' ≤ ' + b;
        return {
          enonce: 'Pour le marché, Laure a un budget de ' + b + ' euros. Elle paie ' + O.nb(t, 'euro') + ' de transport. Les tomates coûtent ' + p + ' euros le kilo. On note x le nombre de kilos.',
          questions: [
            {
              texte: 'Question 1. Quelle inéquation traduit le budget de Laure ?',
              reponse: O.choix(c.alea, bonne, [expr(p, t) + ' ≥ ' + b, expr(t, p) + ' ≤ ' + b]),
              aide: 'Le prix total ne doit pas dépasser le budget.',
              correction: ['Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 2. Combien de kilos entiers peut-elle acheter, au plus ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Résous l’inéquation, puis garde le plus grand nombre entier.',
              correction: [p + 'x ≤ ' + (b - t) + ', donc au plus ' + n + ' kilos.'],
            },
            {
              texte: 'Question 3. Combien d’euros lui reste-t-il alors ?',
              reponse: { type: 'nombre', valeur: reste },
              aide: 'Calcule le prix total, puis enlève-le du budget.',
              correction: [p + ' × ' + n + ' + ' + t + ' = ' + (p * n + t) + ' euros.', b + ' − ' + (p * n + t) + ' = ' + reste + ' euros.'],
            },
            {
              texte: 'Question 4. Pourquoi ne peut-elle pas acheter un kilo de plus ? Justifie par un calcul.',
              correction: [p + ' × ' + (n + 1) + ' + ' + t + ' = ' + (p * (n + 1) + t) + ' euros : cela dépasse ' + b + ' euros.'],
              grille: ['As-tu calculé le prix avec un kilo de plus ?', 'As-tu comparé au budget ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une limite, une inéquation, et tu sais ce que ton budget permet.',
    carte: ['le-plus-possible', 'ce-nombre-convient', 'lire-le-signe'],
    papierDuSoir: { exercices: ['le-plus-possible', 'resoudre'], defi: true },
    automatismes: [
      {
        id: 'plus-petit-rapide',
        versions: [[7, 9], [12, 8], [15, 15], [20, 21]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return { enonce: a + ' ≤ ' + b + ' : vrai ou faux ?', reponse: O.choix(c.alea, a <= b ? 'Vrai' : 'Faux', ['Vrai', 'Faux']) };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? En Angleterre, les signes plus petit et plus grand sont apparus en 1631, dans le livre de Thomas Harriot. C’est son éditeur qui les y a mis.',
    prenoms: ['Laure'],
  };
});
