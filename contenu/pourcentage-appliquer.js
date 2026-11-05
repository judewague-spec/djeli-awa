/* Notion 8 du bloc « Proportionnalité, pourcentages et fonctions » : calculer un pourcentage. Les soldes de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'pourcentage-appliquer',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'Calculer un pourcentage',
    classe: '3e',
    univers: ['commerce', 'coiffure', 'maison-courses'],

    accroche: {
      texte: 'C’est la période des soldes. Rachel voit une robe à 40 euros, avec une étiquette : moins 25 pour cent. Elle se demande combien elle va vraiment payer. ' +
        'Le vendeur lui dit : « Pour 100 euros de prix, on enlève 25 euros. »',
      image: { dessin: 'tableur', colonnes: ['Prix', '100 €', '40 €'], lignes: [['Remise', '25 €', '?']], description: 'Un tableau de proportionnalité. Pour un prix de 100 euros, la remise est de 25 euros. Pour un prix de 40 euros, la remise est à trouver.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['40 × 25 = 1 000', '1 000 ÷ 100 = 10', 'Remise : 10 €', 'À payer : 30 €'], description: 'Quarante fois vingt-cinq égale mille. Mille divisé par cent égale dix. La remise est de dix euros. Rachel paie trente euros.' },
      etapes: [
        '25 pour cent, cela veut dire 25 pour 100. La remise est proportionnelle au prix.',
        'On fait donc le calcul en diagonale : 40 × 25 ÷ 100 = 10. La remise est de 10 euros.',
        'Rachel paie 40 − 10 = 30 euros.',
        'Dans l’autre sens : si 10 euros sont enlevés sur 40 euros, on calcule 10 ÷ 40 × 100 = 25. Cela fait 25 pour cent.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une remise de 25 pour cent, c’est ' + c.mot('pourcentage') + '. Pour la calculer, on multiplie le prix par 25, puis on divise par 100. ' +
        'Pour retrouver cette part, on divise la remise par le prix, puis on multiplie par 100. ' +
        'L’astuce : 10 pour cent, c’est diviser par 10. 50 pour cent, c’est prendre la moitié.',
    },

    vocabulaire: {
      termes: {
        pourcentage: { sesMots: 'une part sur cent', officiel: 'un pourcentage', lesDeux: 'une part sur cent, que l’on appelle un pourcentage' },
      },
      textes: [
        'Pour l’instant, garde ton mot : une part sur cent. ' +
          'Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : un pourcentage, pour une part sur cent. On l’écrit avec le signe pour cent.',
        'Tu connais le mot officiel : le pourcentage.',
      ],
    },

    exercices: [
      {
        id: 'prendre-le-pourcentage',
        univers: 'commerce',
        // [pourcentage, montant]
        versions: [[10, 60], [25, 80], [50, 34], [20, 45], [30, 90], [75, 40]],
        genere(c) {
          const [p, m] = c.alea.choisir(this.versions);
          const r = (p * m) / 100;
          return {
            enonce: 'Combien font ' + p + ' % de ' + m + ' € ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule ' + m + ' × ' + p + ' ÷ 100.',
            aideParlee: 'Multiplie le montant par le pourcentage, puis divise par cent.',
            correction: [m + ' × ' + p + ' = ' + ecr(m * p) + '.', ecr(m * p) + ' ÷ 100 = ' + ecr(r) + ' €.'],
          };
        },
      },
      {
        id: 'prix-apres-remise',
        univers: 'commerce',
        // [prix, remise en %]
        versions: [[40, 25], [60, 10], [50, 20], [80, 30], [120, 25], [35, 20]],
        genere(c) {
          const [m, p] = c.alea.choisir(this.versions);
          const r = (p * m) / 100;
          return {
            enonce: 'Une robe coûte ' + m + ' €. Elle est soldée à moins ' + p + ' %. Quel est son nouveau prix, en euros ?',
            reponse: { type: 'nombre', valeur: m - r },
            aide: 'Calcule la remise, puis enlève-la au prix.',
            correction: [m + ' × ' + p + ' ÷ 100 = ' + ecr(r) + ' € de remise.', m + ' − ' + ecr(r) + ' = ' + ecr(m - r) + ' €.'],
          };
        },
      },
      {
        id: 'quel-pourcentage',
        univers: 'coiffure',
        // [part, total]
        versions: [[5, 20], [12, 60], [30, 40], [9, 30], [45, 50], [8, 80]],
        genere(c) {
          const [a, t] = c.alea.choisir(this.versions);
          const p = r2((a / t) * 100);
          return {
            enonce: 'Dans un salon de coiffure, ' + a + ' clientes sur ' + t + ' demandent des tresses. Quel pourcentage cela représente-t-il ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + a + ' ÷ ' + t + ' × 100.',
            aideParlee: 'Divise la part par le total, puis multiplie par cent.',
            correction: [a + ' ÷ ' + t + ' × 100 = ' + ecr(p) + ' %.'],
          };
        },
      },
      {
        id: 'la-moitie-le-quart',
        univers: 'maison-courses',
        // [pourcentage, montant]
        versions: [[50, 18], [25, 36], [10, 70], [50, 46], [25, 12], [10, 130]],
        genere(c) {
          const [p, m] = c.alea.choisir(this.versions);
          const r = (p * m) / 100;
          const d = { 50: 'Prends la moitié.', 25: 'Prends le quart.', 10: 'Divise par dix.' }[p];
          return {
            enonce: 'Sans poser le calcul, combien font ' + p + ' % de ' + m + ' € ?',
            reponse: { type: 'nombre', valeur: r },
            aide: d,
            correction: [p + ' % de ' + m + ', cela fait ' + ecr(r) + ' €.'],
          };
        },
      },
      Q('quelle-fraction', 'maison-courses',
        [['50 %, c’est :', 'La moitié'], ['25 %, c’est :', 'Le quart'], ['100 %, c’est :', 'Le tout'], ['10 %, c’est :', 'Le dixième']],
        (x) => x, ['La moitié', 'Le quart', 'Le tout', 'Le dixième'],
        'Pense à une part sur cent.',
        'Cinquante pour cent, c’est la moitié ; vingt-cinq pour cent, le quart ; dix pour cent, le dixième ; cent pour cent, le tout.'),
    ],

    defi: {
      // [prix des tresses, acompte %, prix du produit, remise %]
      versions: [[60, 20, 15, 10], [80, 25, 20, 10], [50, 10, 30, 20], [90, 30, 25, 20]],
      genere(c) {
        const [t, a, d, r] = c.alea.choisir(this.versions);
        const ac = (t * a) / 100, re = (d * r) / 100;
        return {
          enonce: 'Esther réserve des tresses, à ' + t + ' €. Elle verse d’abord un acompte de ' + a + ' % du prix. Elle achète aussi un produit capillaire à ' + d + ' €, soldé à moins ' + r + ' %.',
          questions: [
            {
              texte: 'Question 1. Quel est le montant de l’acompte, en euros ?',
              reponse: { type: 'nombre', valeur: ac },
              aide: 'Multiplie le prix par le pourcentage, puis divise par cent.',
              correction: [t + ' × ' + a + ' ÷ 100 = ' + ecr(ac) + ' €.'],
            },
            {
              texte: 'Question 2. Quel est le prix soldé du produit, en euros ?',
              reponse: { type: 'nombre', valeur: d - re },
              aide: 'Calcule la remise, puis enlève-la au prix.',
              correction: [d + ' × ' + r + ' ÷ 100 = ' + ecr(re) + ' €.', d + ' − ' + ecr(re) + ' = ' + ecr(d - re) + ' €.'],
            },
            {
              texte: 'Question 3. Combien lui reste-t-il à payer en tout, en euros, si elle n’a versé que l’acompte ?',
              reponse: { type: 'nombre', valeur: t - ac + d - re },
              aide: 'Ajoute le reste des tresses et le produit soldé.',
              correction: [t + ' − ' + ecr(ac) + ' = ' + ecr(t - ac) + ' €.', ecr(t - ac) + ' + ' + ecr(d - re) + ' = ' + ecr(t - ac + d - re) + ' €.'],
            },
            {
              texte: 'Question 4. Explique pourquoi une remise de 10 % ne fait pas toujours gagner 10 €.',
              correction: ['Dix pour cent est une part du prix : la remise dépend donc du prix.', 'Sur 100 €, on gagne 10 €. Sur 20 €, on ne gagne que 2 €.'],
              grille: ['As-tu dit que la remise dépend du prix ?', 'As-tu donné un exemple ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Moins 25 pour cent n’a plus de secret : tu sais ce que tu vas vraiment payer.',
    carte: ['prendre-le-pourcentage', 'quel-pourcentage', 'quelle-fraction'],
    papierDuSoir: { exercices: ['prix-apres-remise', 'la-moitie-le-quart'], defi: true },
    automatismes: [
      {
        id: 'dix-pour-cent',
        versions: [60, 90, 120, 200],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: '10 % de ' + n + ' € = ?', reponse: { type: 'nombre', valeur: n / 10 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, le taux de la taxe sur la valeur ajoutée est de 19,25 %.',
    prenoms: ['Rachel', 'Esther'],
  };
});
