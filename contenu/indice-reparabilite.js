/* Notion 11 du bloc de technologie « Les objets et la société » : l'indice de réparabilité. Le téléphone cassé d'Esther.
   Dans les exercices, l'indice est calculé de façon simplifiée, comme la moyenne de notes sur 10 ; c'est écrit dans chaque énoncé.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r1 = (x) => Math.round(x * 10) / 10;
  const moyenne = (l) => r1(l.reduce((s, x) => s + x, 0) / l.length);
  const INDICE = (note, appareil) => ({ dessin: 'reparabilite', note, appareil, description: 'L’indice de réparabilité ' + (appareil ? (/^Le /.test(appareil) ? 'du ' + appareil.slice(3) : 'de ' + appareil.charAt(0).toLowerCase() + appareil.slice(1)) : '') + ' : ' + ecr(note) + ' sur 10.' });
  const CRITERES = 'la notice de réparation, le démontage, les pièces détachées, le prix des pièces et l’aide du fabricant';

  return {
    id: 'indice-reparabilite',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'L’indice de réparabilité',
    classe: '4e',
    univers: ['appareils', 'commerce', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 31) : l’indice énergétique et l’indice de réparabilité.',

    accroche: {
      texte: 'L’écran du téléphone d’Esther est fêlé. Chez le réparateur de l’atelier, on lui dit : « Celui-ci se démonte avec un simple tournevis, et la pièce existe. » ' +
        'Sur la boîte d’un autre téléphone, Esther voit une note : 8 sur 10. Une note pour dire si un objet se répare bien !',
      image: INDICE(8, 'Le téléphone'),
    },

    manipulation: {
      image: INDICE(6.5, 'L’ordinateur portable'),
      etapes: [
        'Un objet se répare bien si l’on sait comment le réparer, et s’il se démonte facilement.',
        'Il faut aussi que les pièces existent, et qu’elles ne coûtent pas trop cher.',
        'On donne une note à chacun de ces points, puis on les rassemble en une seule note sur 10.',
        'Plus la note est proche de 10, plus l’objet est facile à réparer.',
        'Réparer, c’est garder son objet plus longtemps : moins de déchets, et souvent moins de dépenses.',
        'En France, depuis 2025, une note de durabilité remplace cette note pour les téléviseurs et les lave-linge.',
      ],
    },

    decouverte: {
      texte: (c) => 'La note sur 10 qui dit si un objet se répare bien, c’est ' + c.mot('indice') + '. Elle tient compte de plusieurs points : ' + CRITERES + '. ' +
        'Quand la pièce cassée peut être changée, on parle de ' + c.mot('piece') + '. ' +
        'L’astuce : avant d’acheter, regarde la note ; plus elle est haute, plus l’objet se répare facilement.',
    },

    vocabulaire: {
      termes: {
        indice: { sesMots: 'la note de réparation', officiel: 'l’indice de réparabilité', lesDeux: 'la note de réparation, que les techniciens appellent l’indice de réparabilité' },
        piece: { sesMots: 'pièce de rechange', officiel: 'pièce détachée', lesDeux: 'pièce de rechange, que les techniciens appellent pièce détachée' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la note de réparation, et la pièce de rechange. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : l’indice de réparabilité, une note sur 10, et les pièces détachées.',
        'Tu connais les mots officiels : l’indice de réparabilité et les pièces détachées.',
      ],
    },

    exercices: [
      {
        id: 'note-moyenne',
        univers: 'appareils',
        // les cinq notes sur 10 (indice simplifié : leur moyenne)
        versions: [[8, 6, 7, 9, 5], [5, 4, 6, 7, 3], [10, 8, 9, 7, 6], [6, 6, 7, 8, 8], [9, 7, 8, 6, 5]],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const m = moyenne(n), s = n.reduce((a, b) => a + b, 0);
          return {
            enonce: 'Dans cet exercice, l’indice est la moyenne de cinq notes sur 10. Un téléphone a eu : ' + n.join(', ') + '. Quel est son indice ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Additionne les cinq notes, puis divise par 5.',
            correction: [n.join(' + ') + ' = ' + s + '.', s + ' ÷ 5 = ' + ecr(m) + ' sur 10.'],
          };
        },
      },
      O.qcm('plus-reparable', 'commerce',
        [[[7.5, 4.2], 'Le premier'], [[5.1, 8.3], 'Le second'], [[6, 9], 'Le second'], [[8.8, 6.4], 'Le premier']],
        (x) => 'Deux téléphones : le premier a un indice de ' + ecr(x[0]) + ' sur 10, le second de ' + ecr(x[1]) + ' sur 10. Lequel se répare le mieux ?', ['Le premier', 'Le second'],
        'Plus la note est haute, mieux l’objet se répare.'),
      O.qcm('quel-point', 'appareils',
        [['On ne trouve plus l’écran de ce modèle.', 'Les pièces détachées'], ['Il faut un outil spécial pour l’ouvrir.', 'Le démontage'], ['Le fabricant ne dit pas comment le réparer.', 'La notice de réparation'], ['La batterie neuve coûte presque le prix du téléphone.', 'Le prix des pièces']],
        (x) => '« ' + x + ' » Quel point de l’indice de réparabilité baisse ?', ['Les pièces détachées', 'Le démontage', 'La notice de réparation', 'Le prix des pièces'],
        'Pièces, démontage, notice ou prix ?'),
      {
        id: 'reparer-ou-racheter',
        univers: 'maison-courses',
        // [prix de la réparation, prix d'un neuf] en euros
        versions: [[60, 250], [40, 180], [90, 300], [35, 120], [80, 400]],
        genere(c) {
          const [r, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Réparer le téléphone d’Esther coûte ' + r + ' euros ; un téléphone neuf coûte ' + n + ' euros. Combien d’euros la réparation fait-elle économiser ?',
            reponse: { type: 'nombre', valeur: n - r },
            aide: 'Calcule ' + n + ' − ' + r + '.',
            aideParlee: 'Soustrais le prix de la réparation au prix du neuf.',
            correction: [n + ' − ' + r + ' = ' + (n - r) + ' euros.'],
          };
        },
      },
      {
        id: 'part-du-prix',
        univers: 'commerce',
        // [prix de la réparation, prix d'un neuf] en euros
        versions: [[60, 240], [50, 200], [30, 150], [45, 180], [80, 400]],
        genere(c) {
          const [r, n] = c.alea.choisir(this.versions);
          const p = (r * 100) / n;
          return {
            enonce: 'Une réparation coûte ' + r + ' euros ; l’appareil neuf coûte ' + n + ' euros. Quel pourcentage du prix du neuf représente la réparation ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + r + ' × 100 ÷ ' + n + '.',
            aideParlee: 'Multiplie le prix de la réparation par cent, puis divise par le prix du neuf.',
            correction: [r + ' × 100 ÷ ' + n + ' = ' + ecr(p) + ' %.'],
          };
        },
      },
    ],

    defi: {
      // [notes du téléphone A], [notes du téléphone B], prix de la réparation, prix du neuf
      versions: [[[8, 6, 7, 9, 5], [5, 4, 6, 7, 3], 60, 250], [[10, 8, 9, 7, 6], [6, 6, 7, 8, 8], 40, 180], [[9, 7, 8, 6, 5], [5, 4, 6, 7, 3], 90, 300]],
      genere(c) {
        const [A, B, r, n] = c.alea.choisir(this.versions);
        const mA = moyenne(A), mB = moyenne(B);
        const bonne = mA > mB ? 'Le téléphone A' : 'Le téléphone B';
        return {
          enonce: 'Esther hésite entre deux téléphones. Dans cet exercice, l’indice de réparabilité est la moyenne de cinq notes sur 10. ' +
            'Téléphone A : ' + A.join(', ') + '. Téléphone B : ' + B.join(', ') + '. Une réparation d’écran coûte ' + r + ' euros ; un téléphone neuf, ' + n + ' euros.',
          image: INDICE(mA, 'Le téléphone A'),
          questions: [
            {
              texte: 'Question 1. Calcule l’indice du téléphone A.',
              reponse: { type: 'nombre', valeur: mA },
              aide: 'Additionne les cinq notes, puis divise par 5.',
              correction: [A.join(' + ') + ' = ' + A.reduce((a, b) => a + b, 0) + ' ; ÷ 5 = ' + ecr(mA) + '.'],
            },
            {
              texte: 'Question 2. Calcule l’indice du téléphone B.',
              reponse: { type: 'nombre', valeur: mB },
              aide: 'Additionne les cinq notes, puis divise par 5.',
              correction: [B.join(' + ') + ' = ' + B.reduce((a, b) => a + b, 0) + ' ; ÷ 5 = ' + ecr(mB) + '.'],
            },
            {
              texte: 'Question 3. Combien d’euros économise-t-on en réparant l’écran plutôt qu’en rachetant un téléphone neuf ?',
              reponse: { type: 'nombre', valeur: n - r },
              aide: 'Soustrais le prix de la réparation au prix du neuf.',
              correction: [n + ' − ' + r + ' = ' + (n - r) + ' euros.'],
            },
            {
              texte: 'Question 4. Quel téléphone conseilles-tu à Esther ? Donne deux raisons.',
              correction: [bonne + ' : son indice est le plus haut, il se répare le mieux.', 'Le réparer coûte bien moins cher que d’en racheter un, et cela fait moins de déchets.'],
              grille: ['As-tu comparé les deux indices ?', 'As-tu parlé du prix de la réparation ou des déchets ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une note sur 10, des pièces qui existent, un objet qui dure : tu sais choisir ce qui se répare.',
    carte: ['note-moyenne', 'plus-reparable', 'quel-point'],
    papierDuSoir: { exercices: ['note-moyenne', 'reparer-ou-racheter'], defi: true },
    automatismes: [
      {
        id: 'somme-rapide',
        versions: [[8, 6, 7], [5, 4, 6], [9, 7, 8], [6, 6, 7]],
        genere(c) { const l = c.alea.choisir(this.versions); return { enonce: l.join(' + ') + ' = ?', reponse: { type: 'nombre', valeur: l[0] + l[1] + l[2] } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, depuis 2021, une note sur 10 dit si certains appareils se réparent bien.',
    prenoms: ['Esther'],
  };
});
