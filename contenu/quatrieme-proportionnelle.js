/* Notion 2 du bloc « Proportionnalité, pourcentages et fonctions » : la quatrième proportionnelle. La recette de beignets de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const r2 = (x) => Math.round(x * 100) / 100;
  const croix = (a, b, c2) => r2((b * c2) / a);

  return {
    id: 'quatrieme-proportionnelle',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'La quatrième proportionnelle',
    classe: '4e',
    univers: ['cuisine-restaurant', 'commerce'],

    accroche: {
      texte: 'Rachel a une recette de beignets pour 4 personnes : 300 grammes de farine. Ce soir, ils seront 6. Combien de farine faut-il ? ' +
        'Trois nombres sont connus, un seul manque. Il existe une astuce qui marche à tous les coups.',
      image: { dessin: 'tableur', colonnes: ['Personnes', 'Farine (g)'], lignes: [[4, 300], [6, '?']], description: 'Un tableau. Pour 4 personnes, 300 grammes de farine. Pour 6 personnes, la quantité de farine est à trouver.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Pour 4 personnes : 300 g', 'Pour 1 personne : 75 g', 'Pour 6 personnes : 450 g'], description: 'On passe par une personne : pour 4 personnes, 300 grammes ; pour 1 personne, 75 grammes ; pour 6 personnes, 450 grammes.' },
      etapes: [
        'Première méthode : on passe par une personne. 300 ÷ 4 = 75 g par personne. Puis 75 × 6 = 450 g.',
        'Deuxième méthode : on multiplie en diagonale. 300 × 6 = 1 800.',
        'Puis on divise par le nombre qui reste : 1 800 ÷ 4 = 450. On retrouve 450 g.',
        'Cette méthode marche dès que les grandeurs sont proportionnelles, et seulement dans ce cas.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans un tableau proportionnel, le nombre qui manque s’appelle ' + c.mot('quatrieme') + '. Pour le trouver, tu fais ' + c.mot('croix') + '. Tu multiplies, puis tu divises par le dernier nombre. ' +
        'L’astuce : vérifie d’abord que les grandeurs sont proportionnelles.',
    },

    vocabulaire: {
      termes: {
        quatrieme: { sesMots: 'le nombre caché', officiel: 'la quatrième proportionnelle', lesDeux: 'le nombre caché, que les matheux appellent la quatrième proportionnelle' },
        croix: { sesMots: 'le calcul en diagonale', officiel: 'le produit en croix', lesDeux: 'le calcul en diagonale, que les matheux appellent le produit en croix' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le nombre caché, et le calcul en diagonale. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la quatrième proportionnelle, pour le nombre caché. Et le produit en croix, pour le calcul en diagonale.',
        'Tu connais les mots officiels : la quatrième proportionnelle et le produit en croix.',
      ],
    },

    exercices: [
      {
        id: 'recette',
        univers: 'cuisine-restaurant',
        // [personnes, g de farine, personnes voulues]
        versions: [[4, 300, 6], [6, 450, 10], [2, 150, 5], [4, 200, 10], [5, 400, 8], [3, 240, 7]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const r = croix(a, b, d);
          return {
            enonce: 'Une recette pour ' + a + ' personnes demande ' + b + ' g de farine. Combien de grammes faut-il pour ' + d + ' personnes ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule ' + b + ' × ' + d + ' ÷ ' + a + '.',
            aideParlee: 'Multiplie la farine par le nombre de personnes voulues, puis divise par le nombre de personnes de la recette.',
            correction: [b + ' × ' + d + ' = ' + ecr(b * d) + '.', ecr(b * d) + ' ÷ ' + a + ' = ' + ecr(r) + ' g.'],
          };
        },
      },
      {
        id: 'prix-du-tissu',
        univers: 'commerce',
        // [mètres, prix, mètres voulus]
        versions: [[2, 15, 4], [3, 21, 5], [4, 26, 6], [5, 40, 7], [2, 18, 3], [6, 45, 8]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const r = croix(a, b, d);
          return {
            enonce: 'Au marché, ' + a + ' m de tissu coûtent ' + b + ' €. Le prix est proportionnel à la longueur. Combien coûtent ' + d + ' m, en euros ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule ' + b + ' × ' + d + ' ÷ ' + a + '.',
            aideParlee: 'Multiplie le prix par la longueur voulue, puis divise par la première longueur.',
            correction: [b + ' × ' + d + ' = ' + b * d + '.', b * d + ' ÷ ' + a + ' = ' + ecr(r) + ' €.'],
          };
        },
      },
      {
        id: 'quelle-longueur',
        univers: 'commerce',
        // [mètres, prix, budget]
        versions: [[2, 15, 30], [3, 12, 20], [4, 10, 25], [5, 20, 28], [2, 8, 22], [10, 35, 21]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const r = croix(b, a, d);
          return {
            enonce: a + ' m de tissu coûtent ' + b + ' €. Le prix est proportionnel à la longueur. Quelle longueur Laure peut-elle acheter avec ' + d + ' €, en mètres ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule ' + a + ' × ' + d + ' ÷ ' + b + '.',
            aideParlee: 'Multiplie la longueur par le budget, puis divise par le prix.',
            correction: [a + ' × ' + d + ' = ' + a * d + '.', a * d + ' ÷ ' + b + ' = ' + ecr(r) + ' m.'],
          };
        },
      },
      {
        id: 'quel-calcul',
        univers: 'cuisine-restaurant',
        // [situation, bon calcul, les deux autres]
        versions: [['4 pots pèsent 6 kg. Quel calcul donne la masse de 10 pots ?', '6 × 10 ÷ 4', ['6 × 4 ÷ 10', '4 × 10 ÷ 6']], ['2 sacs coûtent 8 €. Quel calcul donne le prix de 5 sacs ?', '8 × 5 ÷ 2', ['8 × 2 ÷ 5', '2 × 5 ÷ 8']], ['3 m coûtent 12 €. Quel calcul donne le prix de 4 m ?', '12 × 4 ÷ 3', ['12 × 3 ÷ 4', '3 × 4 ÷ 12']]],
        genere(c) {
          const [x, b, autres] = c.alea.choisir(this.versions);
          return {
            enonce: x,
            reponse: O.choix(c.alea, b, [b].concat(autres)),
            aide: 'Multiplie en diagonale, puis divise par le nombre qui reste.',
            correction: ['On multiplie les deux nombres placés en diagonale, puis on divise par le troisième nombre connu.', 'Réponse : ' + b + '.'],
          };
        },
      },
      Q('methode-ou-pas', 'commerce',
        [['Le prix de la farine vendue au kilo', 'Oui, les grandeurs sont proportionnelles'], ['La taille d’un enfant, connaissant son âge', 'Non, elles ne sont pas proportionnelles'], ['Le prix d’un lot où « le troisième est offert »', 'Non, elles ne sont pas proportionnelles']],
        (x) => x + ' : le produit en croix convient-il ?', ['Oui, les grandeurs sont proportionnelles', 'Non, elles ne sont pas proportionnelles'],
        'Regarde si les grandeurs sont proportionnelles.',
        'Le calcul en diagonale n’est juste que pour des grandeurs proportionnelles : il ne marche pas pour un âge, ni pour un lot.'),
    ],

    defi: {
      // [personnes, g de farine, g de sucre, personnes voulues]
      versions: [[4, 300, 100, 6], [6, 450, 150, 8], [4, 200, 80, 10], [5, 400, 150, 7]],
      genere(c) {
        const [a, f, s, d] = c.alea.choisir(this.versions);
        const rf = croix(a, f, d), rs = croix(a, s, d);
        return {
          enonce: 'Laure prépare des gâteaux pour la fête. Sa recette pour ' + a + ' personnes demande ' + f + ' g de farine et ' + s + ' g de sucre. Ce soir, ' + d + ' personnes seront là. Les quantités sont proportionnelles au nombre de personnes.',
          image: { dessin: 'tableur', colonnes: ['Personnes', 'Farine (g)', 'Sucre (g)'], lignes: [[a, f, s], [d, '?', '?']], description: 'Pour ' + a + ' personnes : ' + f + ' grammes de farine et ' + s + ' grammes de sucre. Pour ' + d + ' personnes, les quantités sont à trouver.' },
          questions: [
            {
              texte: 'Question 1. Combien de grammes de farine faut-il ce soir ?',
              reponse: { type: 'nombre', valeur: rf },
              aide: 'Multiplie en diagonale, puis divise par le nombre qui reste.',
              correction: [f + ' × ' + d + ' = ' + ecr(f * d) + '.', ecr(f * d) + ' ÷ ' + a + ' = ' + ecr(rf) + ' g.'],
            },
            {
              texte: 'Question 2. Combien de grammes de sucre faut-il ce soir ?',
              reponse: { type: 'nombre', valeur: rs },
              aide: 'Fais le même calcul avec le sucre.',
              correction: [s + ' × ' + d + ' = ' + ecr(s * d) + '.', ecr(s * d) + ' ÷ ' + a + ' = ' + ecr(rs) + ' g.'],
            },
            {
              texte: 'Question 3. Laure dit : « Pour deux personnes de plus, j’ajoute 200 g de farine. » A-t-elle raison ? Justifie.',
              correction: ['Non : pour une personne, il faut ' + f + ' ÷ ' + a + ' = ' + ecr(f / a) + ' g de farine.', 'Pour deux personnes de plus, il faut donc ' + ecr((2 * f) / a) + ' g, et non 200 g.'],
              grille: ['As-tu calculé la farine pour une personne, ou fait le produit en croix ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! En diagonale, puis on divise : plus aucune recette ne te résiste.',
    carte: ['recette', 'quel-calcul', 'methode-ou-pas'],
    papierDuSoir: { exercices: ['prix-du-tissu', 'quelle-longueur'], defi: true },
    automatismes: [
      {
        id: 'par-unite',
        versions: [[4, 12], [5, 20], [3, 18], [6, 30]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' savons pour ' + b + ' €. 1 savon = combien d’euros ?', reponse: { type: 'nombre', valeur: b / a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Chine, le livre Les Neuf Chapitres utilise la règle de trois pour échanger des grains.',
    prenoms: ['Rachel', 'Laure'],
  };
});
