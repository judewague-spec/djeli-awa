/* Notion 1 du bloc « Proportionnalité, pourcentages et fonctions » : reconnaître la proportionnalité. Les mangues d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const OUI = 'Oui, c’est proportionnel', NON = 'Non, ce n’est pas proportionnel';
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'reconnaitre-proportionnalite',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'Reconnaître la proportionnalité',
    classe: '4e',
    univers: ['commerce', 'cuisine-restaurant', 'maison-courses'],

    accroche: {
      texte: 'Au marché, Aminata achète des mangues. 1 kilo coûte 3 euros, 2 kilos coûtent 6 euros, 5 kilos coûtent 15 euros. À côté, un vendeur crie : « 1 kilo, 3 euros, et 3 kilos, 8 euros ! » ' +
        'Chez qui le prix suit-il exactement la masse ?',
      image: { dessin: 'tableur', colonnes: ['Masse (kg)', '1', '2', '5'], lignes: [['Prix (€)', 3, 6, 15]], description: 'Un tableau. Pour une masse de 1 kilo, le prix est de 3 euros. Pour 2 kilos, 6 euros. Pour 5 kilos, 15 euros.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['1 kg → 3 €', '2 kg → 6 €', '5 kg → 15 €'], description: 'Chaque fois, le prix est la masse multipliée par 3 : 1 kilo donne 3 euros, 2 kilos donnent 6 euros, 5 kilos donnent 15 euros.' },
      etapes: [
        'Chez Aminata, divise chaque prix par la masse. 3 ÷ 1 = 3, 6 ÷ 2 = 3, 15 ÷ 5 = 3. C’est toujours 3.',
        'Pour passer de la masse au prix, on multiplie toujours par le même nombre.',
        'Chez l’autre vendeur : 3 ÷ 1 = 3, mais 8 ÷ 3 n’est pas égal à 3. Il fait un prix de lot : le prix ne suit pas exactement la masse.',
        'Si, en doublant l’un, on double l’autre, alors ces deux grandeurs vont bien ensemble.',
      ],
    },

    decouverte: {
      texte: (c) => 'On passe d’une grandeur à l’autre en multipliant toujours par le même nombre ? Elles sont alors ' + c.mot('proportionnelles') + '. Ce nombre, c’est ' + c.mot('coefficient') + '. ' +
        'L’astuce : divise chaque valeur du bas par celle du haut. Si tu trouves toujours le même résultat, c’est gagné.',
    },

    vocabulaire: {
      termes: {
        proportionnelles: { sesMots: 'bien accordées', officiel: 'proportionnelles', lesDeux: 'bien accordées, ce que les matheux appellent proportionnelles' },
        coefficient: { sesMots: 'le multiplicateur', officiel: 'le coefficient de proportionnalité', lesDeux: 'le multiplicateur, que les matheux appellent le coefficient de proportionnalité' },
      },
      textes: [
        'Pour l’instant, garde tes mots : des grandeurs bien accordées, et le multiplicateur. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : proportionnelles, pour bien accordées. Le multiplicateur s’appelle le coefficient de proportionnalité.',
        'Tu connais les mots officiels : un tableau de proportionnalité, et le coefficient de proportionnalité.',
      ],
    },

    exercices: [
      {
        id: 'tableau-proportionnel',
        univers: 'commerce',
        // [quantités, prix], bonne réponse
        versions: [[[1, 2, 4], [2, 4, 8], OUI], [[2, 3, 5], [6, 9, 15], OUI], [[1, 3, 6], [4, 10, 20], NON], [[2, 4, 10], [5, 10, 25], OUI], [[1, 2, 5], [3, 5, 12], NON]],
        genere(c) {
          const [q, p, juste] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quantités : ' + q.join(', ') + '. Prix en euros : ' + p.join(', ') + '. Ce tableau est-il un tableau de proportionnalité ?',
            image: { dessin: 'tableur', colonnes: ['Quantité'].concat(q.map(String)), lignes: [['Prix (€)'].concat(p)], description: 'Quantités : ' + q.join(', ') + '. Prix en euros : ' + p.join(', ') + '.' },
            reponse: O.choix(c.alea, juste, [OUI, NON]),
            aide: 'Divise chaque prix par sa quantité, et compare les résultats.',
            correction: q.map((x, i) => p[i] + ' ÷ ' + x + (r2(p[i] / x) === p[i] / x ? ' = ' : ' ≈ ') + ecr(r2(p[i] / x))).concat('Réponse : ' + juste + '.'),
          };
        },
      },
      {
        id: 'le-multiplicateur',
        univers: 'cuisine-restaurant',
        // [quantité, valeur]
        versions: [[4, 12], [5, 20], [3, 21], [6, 9], [8, 12], [10, 25]],
        genere(c) {
          const [q, v] = c.alea.choisir(this.versions);
          const k = v / q;
          return {
            enonce: 'Dans un tableau de proportionnalité, ' + q + ' pots de farine pèsent ' + v + ' kg. Par quel nombre multiplie-t-on le nombre de pots, pour obtenir la masse ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Calcule ' + v + ' ÷ ' + q + '.',
            aideParlee: 'Divise la masse par le nombre de pots.',
            correction: [v + ' ÷ ' + q + ' = ' + ecr(k) + '.'],
          };
        },
      },
      {
        id: 'case-manquante',
        univers: 'commerce',
        // [coefficient, quantité demandée]
        versions: [[3, 7], [4, 6], [5, 9], [2, 12], [6, 8], [7, 5]],
        genere(c) {
          const [k, q] = c.alea.choisir(this.versions);
          return {
            enonce: '1 savon coûte ' + k + ' €. Le prix est proportionnel au nombre de savons. Combien coûtent ' + q + ' savons, en euros ?',
            reponse: { type: 'nombre', valeur: k * q },
            aide: 'Calcule ' + q + ' × ' + k + '.',
            aideParlee: 'Multiplie le nombre de savons par le prix d’un savon.',
            correction: [q + ' × ' + k + ' = ' + k * q + ' €.'],
          };
        },
      },
      Q('dans-la-vie', 'maison-courses',
        [['Le prix du tissu, vendu au mètre, et sa longueur', OUI], ['L’âge d’un enfant et sa taille', NON], ['La distance parcourue à vitesse constante et la durée', OUI], ['La note d’un devoir et le temps passé dessus', NON], ['Le nombre de litres d’essence, au même prix par litre, et le prix payé', OUI]],
        (x) => x + ' : ces deux grandeurs sont-elles proportionnelles ?', [OUI, NON],
        'Si l’une double, l’autre double-t-elle toujours ?',
        'Deux grandeurs sont proportionnelles si l’une double toujours quand l’autre double. Un prix à l’unité le fait. L’âge et la taille, ou une note et un temps, non.'),
      Q('le-lot', 'commerce',
        [['1 kg coûte 2 €, et 5 kg coûtent 8 €.', NON], ['1 kg coûte 2 €, et 5 kg coûtent 10 €.', OUI], ['2 kg coûtent 3 €, et 4 kg coûtent 6 €.', OUI], ['2 kg coûtent 3 €, et 4 kg coûtent 5 €.', NON]],
        (x) => x + ' Le prix est-il proportionnel à la masse ?', [OUI, NON],
        'Si la masse est multipliée, le prix l’est-il par le même nombre ?',
        'On regarde si la masse et le prix sont multipliés par le même nombre. Un prix de lot, plus bas, casse la proportionnalité.'),
    ],

    defi: {
      // [prix de 2 kg chez A, prix de 6 kg chez A, prix de 2 kg chez B, prix de 6 kg chez B]
      versions: [[4, 12, 5, 14], [6, 18, 5, 12], [5, 15, 6, 15], [3, 9, 4, 10]],
      genere(c) {
        const [a2, a6, b2, b6] = c.alea.choisir(this.versions);
        return {
          enonce: 'Deux vendeuses de tomates affichent leurs prix. Chez Laure : 2 kg à ' + a2 + ' €, 6 kg à ' + a6 + ' €. Chez Clarisse : 2 kg à ' + b2 + ' €, 6 kg à ' + b6 + ' €.',
          image: { dessin: 'tableur', colonnes: ['Masse', '2 kg', '6 kg'], lignes: [['Laure', a2, a6], ['Clarisse', b2, b6]], description: 'Chez Laure : 2 kilos à ' + a2 + ' euros, 6 kilos à ' + a6 + ' euros. Chez Clarisse : 2 kilos à ' + b2 + ' euros, 6 kilos à ' + b6 + ' euros.' },
          questions: [
            {
              texte: 'Question 1. Chez Laure, combien coûte 1 kg de tomates, en euros ?',
              reponse: { type: 'nombre', valeur: a2 / 2 },
              aide: 'Divise le prix de deux kilos par deux.',
              correction: [a2 + ' ÷ 2 = ' + ecr(a2 / 2) + ' €.'],
            },
            {
              texte: 'Question 2. Chez Laure, le prix est-il proportionnel à la masse ?',
              reponse: O.choix(c.alea, OUI, [OUI, NON]),
              aide: 'Regarde si 6 kilos coûtent trois fois le prix de 2 kilos.',
              correction: [a2 + ' × 3 = ' + a6 + '.', 'Réponse : ' + OUI + '.'],
            },
            {
              texte: 'Question 3. Le prix de Clarisse est-il proportionnel à la masse ? Justifie par un calcul.',
              correction: [b2 + ' × 3 = ' + b2 * 3 + ', et ce n’est pas ' + b6 + '.', 'Pour trois fois plus de tomates, le prix n’est pas multiplié par 3 : ce n’est pas proportionnel.'],
              grille: ['As-tu fait le calcul ?', 'As-tu comparé le résultat au prix affiché ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le même multiplicateur partout : tu sais repérer un vrai prix au kilo, et un prix de lot.',
    carte: ['tableau-proportionnel', 'dans-la-vie', 'le-lot'],
    papierDuSoir: { exercices: ['le-multiplicateur', 'case-manquante'], defi: true },
    automatismes: [
      {
        id: 'prix-rapide',
        versions: [[3, 4], [5, 6], [2, 9], [4, 7]],
        genere(c) { const [k, q] = c.alea.choisir(this.versions); return { enonce: '1 kg à ' + k + ' €. ' + q + ' kg = combien d’euros ?', reponse: { type: 'nombre', valeur: k * q } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Ghana, les Akan pesaient la poudre d’or avec des poids, car elle servait de monnaie.',
    prenoms: ['Aminata', 'Laure', 'Clarisse'],
  };
});
