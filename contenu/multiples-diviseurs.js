/* Notion 1 du bloc « Les nombres » : multiples et diviseurs. Les mangues d'Aminata. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  return {
    id: 'multiples-diviseurs',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Multiples et diviseurs',
    classe: '5e',
    univers: ['commerce', 'cuisine-restaurant', 'famille'],

    accroche: {
      texte: 'Au marché, Aminata vend des mangues. Ce matin, elle en a 24. Elle veut les ranger en paquets égaux sur son étal, ' +
        'sans qu’il reste une seule mangue à côté. Combien de mangues peut-elle mettre dans chaque paquet ?',
      image: { dessin: 'paquets', objets: 24, parPaquet: 24, description: 'Les 24 mangues d’Aminata, en tas sur l’étal, pas encore rangées.' },
    },

    manipulation: {
      image: { dessin: 'paquets', objets: 24, parPaquet: 5, description: '24 mangues rangées par paquets de 5 : 4 paquets, et 4 mangues qui restent à côté.' },
      etapes: [
        'Essaie des paquets de 2 : 24 ÷ 2 = 12. Douze paquets, et rien ne reste. Ça tombe juste.',
        'Essaie des paquets de 5, comme sur le dessin : 4 paquets, et il reste 4 mangues. Ça ne tombe pas juste.',
        'Sur ton cahier, essaie 3, 4, 6, 8 et 12. Note ceux qui tombent juste.',
        'Range-les par paires qui font 24 : 1 et 24, 2 et 12, 3 et 8, 4 et 6.',
      ],
    },

    decouverte: {
      texte: (c) => 'Les paquets qui tombent juste ont 1, 2, 3, 4, 6, 8, 12 ou 24 mangues. Ce sont ' + c.mot('diviseurs') + ' de 24. ' +
        'Et dans l’autre sens, 24 est ' + c.mot('multiple') + ' de 6 : 6, 12, 18, 24. ' +
        'L’astuce : cherche par paires, 1 × 24, 2 × 12, 3 × 8, 4 × 6. Quand les paires se croisent, tu as tout trouvé.',
      image: { dessin: 'paquets', objets: 24, parPaquet: 6, description: '24 mangues rangées en 4 paquets de 6 : rien ne reste.' },
    },

    vocabulaire: {
      termes: {
        diviseurs: { sesMots: 'les bonnes tailles de paquets', officiel: 'les diviseurs', lesDeux: 'les bonnes tailles de paquets, les diviseurs,' },
        multiple: { sesMots: 'dans la table', officiel: 'un multiple', lesDeux: 'dans la table, donc un multiple,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 6 est une bonne taille de paquet pour 24, parce que 24 mangues font 4 paquets de 6 sans reste. ' +
          'Et 24 est dans la table de 6. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : 6 est un diviseur de 24, parce que 24 ÷ 6 tombe juste. Et ils disent : 24 est un multiple de 6, ' +
          'parce que 24 est dans la table de 6. Les deux phrases disent la même chose, dans les deux sens.',
        'Tu connais les mots officiels : 6 est un diviseur de 24, et 24 est un multiple de 6.',
      ],
    },

    exercices: [
      {
        id: 'paquets-juste',
        univers: 'commerce',
        // [mangues, taille du paquet]
        versions: [[18, 3], [18, 4], [20, 5], [20, 6], [27, 9], [27, 6], [32, 8], [32, 6], [35, 7], [35, 4], [42, 6], [42, 8]],
        genere(c) {
          const [n, p] = c.alea.choisir(this.versions);
          const q = Math.floor(n / p), r = n % p;
          const bonne = r === 0 ? 'Oui, ça tombe juste' : 'Non, il en reste';
          return {
            enonce: 'Aminata a ' + n + ' mangues. Peut-elle les ranger en paquets de ' + p + ' sans qu’il en reste ?',
            reponse: O.choix(c.alea, bonne, ['Oui, ça tombe juste', 'Non, il en reste']),
            aide: 'Divise ' + n + ' par ' + p + ', et regarde s’il reste quelque chose.',
            aideParlee: 'Divise le nombre de mangues par la taille du paquet, et regarde s’il reste quelque chose.',
            correction: [n + ' ÷ ' + p + ' : ' + q + ' paquets, et il reste ' + r + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'sachets',
        univers: 'cuisine-restaurant',
        // [beignets, beignets par sachet]
        versions: [[24, 4], [30, 5], [36, 6], [42, 7], [48, 8], [45, 9], [56, 7], [60, 12], [72, 8], [63, 9]],
        genere(c) {
          const [n, p] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure, la maman de Rachel, fait ' + n + ' beignets. Elle les met par sachets de ' + p + '. Combien de sachets remplit-elle ?',
            reponse: { type: 'nombre', valeur: n / p },
            aide: 'Cherche combien de fois ' + p + ' va dans ' + n + '.',
            aideParlee: 'Cherche combien de fois la taille du sachet va dans le nombre de beignets.',
            correction: [n + ' ÷ ' + p + ' = ' + (n / p) + ', car ' + p + ' × ' + (n / p) + ' = ' + n + '.', 'Elle remplit ' + (n / p) + ' sachets.'],
          };
        },
      },
      {
        id: 'combien-de-diviseurs',
        univers: 'commerce',
        versions: [12, 16, 18, 20, 28, 30, 36, 45, 50, 15],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const d = O.diviseurs(n);
          return {
            enonce: 'Moussa a ' + n + ' savons. Combien y a-t-il de tailles de paquets qui tombent juste, en comptant 1 et ' + n + ' ?',
            reponse: { type: 'nombre', valeur: d.length },
            aide: 'Cherche par paires dont le produit fait ' + n + ' : 1 × ' + n + ', puis 2, puis 3…',
            aideParlee: 'Cherche par paires : 1 fois le nombre, puis essaie 2, puis 3, jusqu’à ce que les paires se croisent.',
            correction: ['Les paires : ' + O.paires(n).join(', ') + '.', 'Les tailles qui tombent juste : ' + d.join(', ') + '.', 'Il y en a ' + d.length + '.'],
          };
        },
      },
      {
        id: 'packs',
        univers: 'famille',
        // [bouteilles par pack, bouteilles voulues au moins]
        versions: [[6, 20], [6, 25], [4, 15], [4, 18], [8, 30], [8, 35], [12, 40], [12, 50], [5, 22], [9, 40]],
        genere(c) {
          const [p, n] = c.alea.choisir(this.versions);
          const m = Math.ceil(n / p) * p;
          return {
            enonce: 'Pour la fête, Rachel veut au moins ' + n + ' bouteilles de bissap. Elles se vendent par packs de ' + p + '. ' +
              'Combien de bouteilles va-t-elle acheter, au plus juste ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Compte de ' + p + ' en ' + p + ' jusqu’à dépasser ou atteindre ' + n + '.',
            aideParlee: 'Compte de pack en pack, jusqu’à atteindre ou dépasser le nombre voulu.',
            correction: ['Les multiples de ' + p + ' : ' + Array.from({ length: m / p }, (_, i) => p * (i + 1)).join(', ') + '.',
              'Le premier qui atteint ' + n + ' est ' + m + ' : elle achète ' + (m / p) + ' packs, soit ' + m + ' bouteilles.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'cuisine-restaurant',
        // [a, b] : « a est-il un multiple de b ? »
        versions: [[56, 8], [56, 6], [81, 9], [81, 7], [65, 5], [65, 4], [96, 12], [96, 7], [84, 7], [84, 9]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const oui = a % b === 0;
          const bonne = oui ? 'Vrai' : 'Faux';
          return {
            enonce: 'Au restaurant, Fatou affirme : « ' + a + ' est un multiple de ' + b + '. » Vrai ou faux ?',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Est-ce que ' + a + ' est dans la table de ' + b + ' ? Divise pour voir.',
            aideParlee: 'Est-ce que le premier nombre est dans la table du second ? Divise pour voir.',
            correction: [a + ' ÷ ' + b + ' = ' + Math.floor(a / b) + ', reste ' + (a % b) + '.', oui ? 'Il ne reste rien : c’est un multiple.' : 'Il reste quelque chose : ce n’est pas un multiple.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [gâteaux, nombre de tables essayé]
      versions: [[36, 4], [36, 9], [48, 6], [48, 8], [60, 5], [60, 10], [72, 8], [72, 9], [40, 5], [40, 8]],
      genere(c) {
        const [n, t] = c.alea.choisir(this.versions);
        const possibles = O.diviseurs(n).filter((d) => d >= 2 && d <= 10);
        const sept = n % 7 === 0;
        return {
          enonce: 'Esther organise le goûter du quartier. Elle a ' + n + ' gâteaux et veut les poser en parts égales sur des tables, ' +
            'sans qu’il en reste. Elle peut installer entre 2 et 10 tables.',
          image: { dessin: 'paquets', objets: n, parPaquet: n / t, description: n + ' gâteaux rangés en ' + t + ' groupes égaux.' },
          questions: [
            {
              texte: 'Question 1. Avec ' + t + ' tables, combien de gâteaux y a-t-il sur chaque table ?',
              reponse: { type: 'nombre', valeur: n / t },
              aide: 'Partage les gâteaux en parts égales entre les tables.',
              correction: [n + ' ÷ ' + t + ' = ' + (n / t) + ' : il y a ' + (n / t) + ' gâteaux par table.'],
            },
            {
              texte: 'Question 2. Combien de nombres de tables, entre 2 et 10, tombent juste ?',
              reponse: { type: 'nombre', valeur: possibles.length },
              aide: 'Cherche les diviseurs du nombre de gâteaux qui sont entre 2 et 10.',
              correction: ['Les diviseurs de ' + n + ' : ' + O.diviseurs(n).join(', ') + '.', 'Entre 2 et 10 : ' + possibles.join(', ') + '.', 'Il y en a ' + possibles.length + '.'],
            },
            {
              texte: 'Question 3. Moussa affirme : « Avec 7 tables, ça tombe juste. » A-t-il raison ? Justifie ta réponse.',
              correction: [n + ' ÷ 7 = ' + Math.floor(n / 7) + ', reste ' + (n % 7) + '.',
                sept ? 'Il ne reste rien : 7 est un diviseur de ' + n + '. Moussa a raison.' : 'Il reste des gâteaux : 7 n’est pas un diviseur de ' + n + '. Moussa a tort.'],
              grille: ['As-tu divisé ' + n + ' par 7 ?', 'As-tu regardé le reste de la division ?', 'As-tu conclu par une phrase : « Moussa a raison » ou « Moussa a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais trouver les bonnes tailles de paquets : les diviseurs. Et tu sais lire une table dans les deux sens.',
    carte: ['paquets-juste', 'sachets', 'packs'],
    papierDuSoir: { exercices: ['sachets', 'combien-de-diviseurs'], defi: true },
    automatismes: [
      {
        id: 'tables',
        versions: [[6, 7], [7, 8], [8, 9], [6, 8], [7, 9], [9, 6], [4, 7], [8, 8], [7, 7], [12, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Combien font ' + a + ' × ' + b + ' ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
      {
        id: 'division-juste',
        versions: [[42, 6], [56, 8], [63, 7], [72, 9], [48, 6], [54, 9], [35, 5], [64, 8]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Combien font ' + a + ' ÷ ' + b + ' ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le calendrier maya combinait un cycle de 260 jours et un cycle de 365 jours : les deux retombaient ensemble tous les 52 ans.',
    prenoms: ['Aminata', 'Laure', 'Rachel', 'Moussa', 'Fatou', 'Esther'],
  };
});
