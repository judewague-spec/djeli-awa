/* Notion 11 du bloc de technologie « Le numérique et l'intelligence artificielle » : les types de données. Le cahier de vente de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const TEXTE = 'Du texte', NOMBRE = 'Un nombre', BOOL = 'Un booléen';

  return {
    id: 'types-donnees',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Les types de données',
    classe: 'cycle 4',
    univers: ['commerce', 'cuisine-restaurant'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : types de données (texte, nombre, booléen).',

    accroche: {
      texte: 'Clarisse note ses ventes au marché. Chaque ligne de son cahier a trois renseignements : ce qu’elle a vendu, le prix, et si le client a payé. Le soir, elle veut additionner les prix. ' +
        'Additionner des prix, oui. Mais additionner « beignets » et « oui » ? Cela n’a pas de sens !',
      image: { dessin: 'tableur', colonnes: ['Produit', 'Prix (€)', 'Payé'], lignes: [['Beignets', 2, 'oui'], ['Jus', 3, 'non'], ['Avocats', 5, 'oui']], description: 'Un tableau de trois lignes. Beignets, deux euros, payé oui. Jus, trois euros, payé non. Avocats, cinq euros, payé oui.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Des mots', 'Des valeurs pour calculer', 'Seulement vrai ou faux'], description: 'Trois genres de renseignements : des mots ; des valeurs pour calculer ; ou seulement vrai ou faux.' },
      etapes: [
        'Pour un ordinateur, tous les renseignements ne se ressemblent pas. Il faut lui dire de quel genre ils sont.',
        '« Beignets » est fait de lettres : on peut le lire, le ranger, mais pas le multiplier.',
        '3 est une valeur : on peut l’additionner, la multiplier, la comparer.',
        '« Payé » n’a que deux réponses possibles : vrai ou faux. C’est très utile pour trier ou pour décider.',
      ],
    },

    decouverte: {
      texte: (c) => 'Chaque donnée a ' + c.mot('type') + '. Des lettres : c’est du texte. Une valeur pour calculer : c’est un nombre. ' +
        'Seulement vrai ou faux : c’est ' + c.mot('booleen') + '. ' +
        'L’astuce : demande-toi ce que tu veux en faire. Calculer, lire, ou répondre par oui ou non ?',
    },

    vocabulaire: {
      termes: {
        type: { sesMots: 'son genre', officiel: 'son type', lesDeux: 'son genre, que l’on appelle son type' },
        booleen: { sesMots: 'un oui ou non', officiel: 'un booléen', lesDeux: 'un oui ou non, que l’on appelle un booléen' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le genre d’une donnée, et le oui ou non. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : le type d’une donnée. Il peut être un texte, un nombre, ou un booléen, pour le oui ou non.',
        'Tu connais les mots officiels : le type, le texte, le nombre et le booléen.',
      ],
    },

    exercices: [
      Q('quel-type', 'commerce',
        [['Le nom d’un produit : « beignets »', TEXTE], ['Un prix de 3 euros, à additionner', NOMBRE], ['« Le client a payé » : vrai ou faux', BOOL], ['La quantité vendue : 12', NOMBRE], ['Le prénom d’une cliente', TEXTE], ['« Il reste du stock » : vrai ou faux', BOOL]],
        (x) => x + ' : quel est le type de cette donnée ?', [TEXTE, NOMBRE, BOOL],
        'Des lettres, une valeur pour calculer, ou seulement vrai ou faux ?',
        'Des lettres forment un texte. Une valeur pour calculer est un nombre. Ce qui vaut seulement vrai ou faux est un booléen.'),
      Q('quelle-operation', 'cuisine-restaurant',
        [['Du texte', 'Le lire, ou le ranger par ordre alphabétique'], ['Un nombre', 'L’additionner à un autre'], ['Un booléen', 'Vérifier s’il est vrai ou faux']],
        (x) => x + ' : que peut-on en faire ?', ['Le lire, ou le ranger par ordre alphabétique', 'L’additionner à un autre', 'Vérifier s’il est vrai ou faux'],
        'Chaque type a ce qui lui convient.',
        'Chaque type permet ses opérations : ranger un texte, calculer avec un nombre, tester un booléen.'),
      Q('combien-de-valeurs', 'commerce',
        [['Combien de valeurs différentes un booléen peut-il prendre ?', 'Deux'], ['Vrai et faux : combien de réponses cela fait-il pour un booléen ?', 'Deux']],
        (x) => x, ['Deux', 'Dix', 'Autant que l’on veut'],
        'Vrai, ou faux.',
        'Un booléen vaut vrai, ou faux : deux valeurs seulement.'),
      {
        id: 'cases-du-tableau',
        univers: 'commerce',
        // [lignes, colonnes]
        versions: [[10, 3], [12, 4], [25, 3], [8, 5], [30, 4], [15, 6]],
        genere(c) {
          const [l, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le tableau de Clarisse a ' + l + ' lignes et ' + k + ' colonnes. Combien de données contient-il ?',
            reponse: { type: 'nombre', valeur: l * k },
            aide: 'Calcule ' + l + ' × ' + k + '.',
            aideParlee: 'Multiplie le nombre de lignes par le nombre de colonnes.',
            correction: [l + ' × ' + k + ' = ' + l * k + ' données.'],
          };
        },
      },
      {
        id: 'combien-de-faux',
        univers: 'commerce',
        // [clients, clients qui ont payé]
        versions: [[20, 14], [35, 28], [50, 45], [18, 11], [42, 30], [60, 52]],
        genere(c) {
          const [n, v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans la colonne « Payé » de Clarisse, il y a ' + n + ' lignes, et ' + v + ' valent vrai. Combien valent faux ?',
            reponse: { type: 'nombre', valeur: n - v },
            aide: 'Calcule ' + n + ' − ' + v + '.',
            aideParlee: 'Enlève les vrais au nombre de lignes.',
            correction: [n + ' − ' + v + ' = ' + (n - v) + ' lignes valent faux.'],
          };
        },
      },
    ],

    defi: {
      // [prix des beignets, quantité, prix du jus, quantité]
      versions: [[2, 10, 3, 5], [1, 20, 2, 10], [2, 15, 4, 5], [3, 8, 2, 6]],
      genere(c) {
        const [a, q, b, r] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : Clarisse tient un tableau de ventes. Les colonnes sont : Produit, Prix (en euros), Quantité, Payé. Beignets : ' + a + ' €, quantité ' + q + ', payé vrai. Jus : ' + b + ' €, quantité ' + r + ', payé faux.',
          image: { dessin: 'tableur', colonnes: ['Produit', 'Prix (€)', 'Quantité', 'Payé'], lignes: [['Beignets', a, q, 'vrai'], ['Jus', b, r, 'faux']], description: 'Un tableau de ventes de deux lignes, avec le produit, le prix, la quantité et si le client a payé.' },
          questions: [
            {
              texte: 'Question 1. Quel est le type de la colonne « Payé » ?',
              reponse: O.choix(c.alea, BOOL, [TEXTE, NOMBRE, BOOL]),
              aide: 'Cette colonne ne vaut que vrai ou faux.',
              correction: ['Seulement vrai ou faux : c’est un booléen.', 'Réponse : ' + BOOL + '.'],
            },
            {
              texte: 'Question 2. Quelle somme, en euros, les beignets ont-ils rapportée ?',
              reponse: { type: 'nombre', valeur: a * q },
              aide: 'Multiplie le prix par la quantité.',
              correction: [a + ' × ' + q + ' = ' + a * q + ' €.'],
            },
            {
              texte: 'Question 3. Explique pourquoi l’on peut calculer avec la colonne « Prix », mais pas avec la colonne « Produit ».',
              correction: ['Les prix sont des nombres : on peut les additionner et les multiplier.', 'Les produits sont du texte : une opération de calcul n’a pas de sens sur des lettres.'],
              grille: ['As-tu donné le type de chaque colonne ?', 'As-tu dit ce que chaque type permet ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Texte, nombre, booléen : tu sais de quoi parlent les colonnes de tes tableaux.',
    carte: ['quel-type', 'quelle-operation', 'combien-de-valeurs'],
    papierDuSoir: { exercices: ['cases-du-tableau', 'combien-de-faux'], defi: true },
    automatismes: [
      {
        id: 'type-rapide',
        versions: [['12', NOMBRE], ['beignets', TEXTE], ['vrai', BOOL]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Le type de « ' + d + ' » ?', reponse: O.choix(c.alea, b, [TEXTE, NOMBRE, BOOL]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, un clavier pour l’alphabet général des langues camerounaises permet d’écrire l’ewondo, le bulu et le fang.',
    prenoms: ['Clarisse'],
  };
});
