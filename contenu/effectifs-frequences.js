/* Notion du bloc « Données, probabilités, programmation » : effectifs et fréquences. Les clients de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr, frac } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const IMG = { dessin: 'tableur', colonnes: ['Fruit', 'Mangues', 'Bananes', 'Ananas', 'Tous'], lignes: [['Clients', 5, 9, 6, 20]], description: 'Un tableau. Mangues, 5 clients. Bananes, 9 clients. Ananas, 6 clients. Tous les fruits ensemble, 20 clients.' };

  return {
    id: 'effectifs-frequences',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Effectifs et fréquences',
    classe: '4e',
    univers: ['commerce', 'maison-courses'],

    accroche: {
      texte: 'Moussa a vu passer 20 clients. Parmi eux, 5 ont pris des mangues, 9 des bananes et 6 des ananas. ' +
        'Pour les mangues, cela fait 5 clients sur 20. On peut le dire en fraction, en nombre décimal, ou en pourcentage.',
      image: IMG,
    },

    manipulation: {
      image: IMG,
      etapes: [
        'Moussa compte les clients de chaque fruit : 5 pour les mangues, 9 pour les bananes, 6 pour les ananas.',
        'Il ajoute tout : 5 plus 9 plus 6, cela fait 20 clients en tout.',
        'Pour les mangues, c’est 5 clients sur 20. En fraction, on écrit 5 sur 20.',
        'Diviser 5 par 20 donne 0,25 : c’est l’écriture décimale. Multiplier par 100 donne 25 pour cent.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le 5 du tableau. C’est ' + c.mot('effectif') + '. Regarde le 20. C’est ' + c.mot('total') + '. ' +
        'Divise le 5 par le 20. Tu obtiens ' + c.mot('frequence') + '. Cette part s’écrit en fraction, en nombre décimal ou en pourcentage.',
    },

    vocabulaire: {
      termes: {
        effectif: { sesMots: 'combien de clients ont pris des mangues', officiel: 'l’effectif', lesDeux: 'combien de clients ont pris des mangues, que l’on appelle l’effectif' },
        total: { sesMots: 'combien de clients en tout', officiel: 'l’effectif total', lesDeux: 'combien de clients en tout, que l’on appelle l’effectif total' },
        frequence: { sesMots: 'la part des mangues sur tous les clients', officiel: 'la fréquence', lesDeux: 'la part des mangues sur tous les clients, que l’on appelle la fréquence' },
      },
      textes: [
        'Pour l’instant, garde tes mots : combien de clients pour un fruit, combien en tout, et la part du fruit. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’effectif, pour combien de clients ont pris un fruit. Combien en tout s’appelle l’effectif total, et la part s’appelle la fréquence.',
        'Tu connais les mots officiels : l’effectif, l’effectif total et la fréquence.',
      ],
    },

    exercices: [
      {
        id: 'compter-en-tout',
        univers: 'commerce',
        // [mangues, bananes, ananas]
        versions: [[5, 9, 6], [12, 7, 11], [8, 15, 10], [14, 6, 9], [20, 13, 7], [9, 9, 12]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa note ses ventes : ' + a + ' clients pour les mangues, ' + b + ' pour les bananes et ' + d + ' pour les ananas. Combien de clients a-t-il eus en tout ?',
            reponse: { type: 'nombre', valeur: a + b + d },
            aide: 'Ajoute les trois nombres.',
            correction: [a + ' + ' + b + ' + ' + d + ' = ' + (a + b + d) + ' clients.'],
          };
        },
      },
      {
        id: 'frequence-fraction',
        univers: 'maison-courses',
        // [clients du fruit, clients en tout]
        versions: [[5, 20], [6, 25], [9, 12], [3, 8], [7, 30], [11, 40]],
        genere(c) {
          const [e, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur ' + t + ' clients, ' + e + ' ont pris des mangues. Écris la part des clients qui ont pris des mangues sous forme de fraction.',
            reponse: { type: 'fraction', valeur: [e, t] },
            aide: 'Le nombre de clients des mangues en haut, le nombre de clients en tout en bas.',
            correction: ['En haut : ' + e + ' clients des mangues. En bas : ' + t + ' clients en tout.', 'La fréquence est ' + frac(e, t) + '.'],
          };
        },
      },
      {
        id: 'frequence-decimale',
        univers: 'commerce',
        // [clients du fruit, clients en tout]
        versions: [[5, 20], [6, 25], [12, 40], [18, 50], [7, 10], [9, 20], [3, 4]],
        genere(c) {
          const [e, t] = c.alea.choisir(this.versions);
          const f = r2(e / t);
          return {
            enonce: 'Sur ' + t + ' clients, ' + e + ' ont pris des bananes. Écris la fréquence des bananes en nombre décimal.',
            reponse: { type: 'nombre', valeur: f },
            aide: 'Divise le nombre de clients des bananes par le nombre de clients en tout.',
            correction: [e + ' ÷ ' + t + ' = ' + ecr(f) + '.', 'La fréquence est ' + ecr(f) + '.'],
          };
        },
      },
      {
        id: 'frequence-pourcentage',
        univers: 'maison-courses',
        // [clients du fruit, clients en tout]
        versions: [[7, 20], [12, 25], [9, 50], [30, 40], [3, 12], [15, 60]],
        genere(c) {
          const [e, t] = c.alea.choisir(this.versions);
          const p = r2((e / t) * 100);
          return {
            enonce: 'Sur ' + t + ' clients, ' + e + ' ont pris des ananas. Quel pourcentage des clients cela fait-il ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule la part en divisant, puis multiplie par 100.',
            correction: [e + ' ÷ ' + t + ' = ' + ecr(r2(e / t)) + '.', ecr(r2(e / t)) + ' × 100 = ' + ecr(p) + ' pour cent.'],
          };
        },
      },
      {
        id: 'clients-depuis-pourcentage',
        univers: 'commerce',
        // [pourcentage, clients en tout]
        versions: [[25, 40], [30, 50], [10, 30], [20, 35], [40, 25], [15, 20]],
        genere(c) {
          const [p, t] = c.alea.choisir(this.versions);
          const e = (p * t) / 100;
          return {
            enonce: 'Moussa a eu ' + t + ' clients. ' + p + ' % d’entre eux ont pris des mangues. Combien de clients cela fait-il ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Multiplie le nombre de clients par le pourcentage, puis divise par 100.',
            correction: [t + ' × ' + p + ' = ' + (t * p) + '.', (t * p) + ' ÷ 100 = ' + ecr(e) + ' clients.'],
          };
        },
      },
    ],

    defi: {
      // [espèces, mobile, carte] : moyens de paiement de 20, 40 ou 50 clients
      versions: [[20, 12, 8], [25, 10, 15], [30, 15, 5], [16, 12, 12], [10, 6, 4], [18, 12, 10]],
      genere(c) {
        const [a, b, d] = c.alea.choisir(this.versions);
        const t = a + b + d, f = r2(a / t), p = r2((b / t) * 100), moins = d / t < 0.25;
        return {
          enonce: 'Rachel observe comment les clients de Laure paient. Espèces : ' + a + ' clients. Téléphone : ' + b + ' clients. Carte : ' + d + ' clients.',
          image: { dessin: 'tableur', colonnes: ['Paiement', 'Espèces', 'Téléphone', 'Carte'], lignes: [['Clients', a, b, d]], description: 'Un tableau. Espèces, ' + a + ' clients. Téléphone, ' + b + ' clients. Carte, ' + d + ' clients.' },
          questions: [
            {
              texte: 'Question 1. Combien de clients Rachel a-t-elle observés en tout ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Ajoute les trois effectifs.',
              correction: [a + ' + ' + b + ' + ' + d + ' = ' + t + ' clients.'],
            },
            {
              texte: 'Question 2. Quelle est la fréquence des paiements en espèces, en nombre décimal ?',
              reponse: { type: 'nombre', valeur: f },
              aide: 'Divise l’effectif des espèces par le nombre de clients en tout.',
              correction: [a + ' ÷ ' + t + ' = ' + ecr(f) + '.'],
            },
            {
              texte: 'Question 3. Quel pourcentage des clients paient par téléphone ?',
              reponse: { type: 'nombre', valeur: p },
              aide: 'Divise l’effectif du téléphone par le nombre de clients en tout, puis multiplie par 100.',
              correction: [b + ' ÷ ' + t + ' = ' + ecr(r2(b / t)) + '.', ecr(r2(b / t)) + ' × 100 = ' + ecr(p) + ' pour cent.'],
            },
            {
              texte: 'Question 4. Laure dit : « Moins d’un client sur quatre paie par carte. » A-t-elle raison ? Justifie avec la fréquence.',
              correction: ['Fréquence des paiements par carte : ' + d + ' ÷ ' + t + ' = ' + ecr(r2(d / t)) + '.', 'Un client sur quatre, c’est 0,25.', moins ? 'Elle a raison : ' + ecr(r2(d / t)) + ' est plus petit que 0,25.' : 'Elle a tort : ' + ecr(r2(d / t)) + ' n’est pas plus petit que 0,25.'],
              grille: ['As-tu calculé la fréquence des paiements par carte ?', 'As-tu comparé cette fréquence à 0,25 ?', 'As-tu répondu à Laure par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Effectif, total, fréquence : tu sais dire la part de chacun en fraction, en décimal et en pourcentage.',
    carte: ['frequence-fraction', 'frequence-decimale', 'frequence-pourcentage'],
    papierDuSoir: { exercices: ['clients-depuis-pourcentage', 'frequence-pourcentage'], defi: true },
    automatismes: [
      {
        id: 'moitie-quart',
        versions: [[10, 20], [5, 20], [15, 20], [25, 50]],
        genere(c) { const [e, t] = c.alea.choisir(this.versions); return { enonce: e + ' clients sur ' + t + '. Quel pourcentage ?', reponse: { type: 'nombre', valeur: (e / t) * 100 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, le recensement de 2005 a compté les ménages et les personnes : scolarité, naissances, décès, logements.',
    prenoms: ['Moussa', 'Rachel', 'Laure'],
  };
});
