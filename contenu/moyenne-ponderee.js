/* Notion du bloc « Données, probabilités, programmation » : la moyenne pondérée. Les notes de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const CMP = ['Plus grande que la moyenne simple', 'Plus petite que la moyenne simple', 'Égale à la moyenne simple'];
  const IMG = { dessin: 'tableur', colonnes: ['Épreuve', 'Contrôle', 'Examen'], lignes: [['Note sur 20', 12, 16], ['Coefficient', 1, 3]], description: 'Un tableau. Le contrôle : note 12, coefficient 1. L’examen : note 16, coefficient 3.' };

  return {
    id: 'moyenne-ponderee',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'La moyenne pondérée',
    classe: '4e',
    univers: ['maison-courses', 'dehors'],

    accroche: {
      texte: 'Rachel prépare son bulletin de maths. Elle a eu 12 au contrôle, qui compte une fois. Elle a eu 16 à l’examen, qui compte trois fois. ' +
        'Faut-il traiter les deux notes pareil ? Non : l’examen pèse plus lourd, et le calcul doit le montrer.',
      image: IMG,
    },

    manipulation: {
      image: IMG,
      etapes: [
        'Rachel a eu 12 au contrôle, qui compte une fois.',
        'Elle a eu 16 à l’examen, qui compte trois fois.',
        'Elle calcule 12 fois 1, plus 16 fois 3 : cela fait 60.',
        'Elle divise par le nombre de fois en tout : 1 plus 3, soit 4. Résultat : 15.',
      ],
    },

    decouverte: {
      texte: (c) => 'À côté de chaque note, il y a un petit nombre. C’est ' + c.mot('coefficient') + '. ' +
        'Multiplie chaque note par ce nombre, puis ajoute. Divise par la somme de ces petits nombres. Tu obtiens ' + c.mot('ponderee') + '.',
    },

    vocabulaire: {
      termes: {
        coefficient: { sesMots: 'le nombre de fois que la note compte', officiel: 'le coefficient', lesDeux: 'le nombre de fois que la note compte, que l’on appelle le coefficient' },
        ponderee: { sesMots: 'la note qui tient compte du poids de chacune', officiel: 'la moyenne pondérée', lesDeux: 'la note qui tient compte du poids de chacune, que l’on appelle la moyenne pondérée' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le nombre de fois que la note compte, et la note qui tient compte du poids de chacune. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : le coefficient, pour le nombre de fois que la note compte. La note qui tient compte du poids de chacune s’appelle la moyenne pondérée.',
        'Tu connais les mots officiels : le coefficient et la moyenne pondérée.',
      ],
    },

    exercices: [
      {
        id: 'deux-notes',
        univers: 'maison-courses',
        // [note 1, coefficient 1, note 2, coefficient 2]
        versions: [[12, 1, 16, 3], [10, 2, 16, 1], [8, 1, 14, 2], [15, 3, 9, 1], [11, 2, 17, 3], [18, 2, 12, 3]],
        genere(c) {
          const [n1, c1, n2, c2] = c.alea.choisir(this.versions);
          const s = n1 * c1 + n2 * c2, d = c1 + c2, m = r2(s / d);
          return {
            enonce: 'Rachel a ' + n1 + ' avec le coefficient ' + c1 + ', et ' + n2 + ' avec le coefficient ' + c2 + '. Quelle est sa moyenne pondérée ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Multiplie chaque note par son petit nombre, ajoute, puis divise par la somme des petits nombres.',
            correction: [n1 + ' × ' + c1 + ' + ' + n2 + ' × ' + c2 + ' = ' + s + '.', c1 + ' + ' + c2 + ' = ' + d + '.', s + ' ÷ ' + d + (Number.isInteger(s / d) ? ' = ' : ' = ') + ecr(m) + '.'],
          };
        },
      },
      {
        id: 'somme-des-produits',
        univers: 'maison-courses',
        // [note 1, coefficient 1, note 2, coefficient 2, note 3, coefficient 3]
        versions: [[12, 1, 14, 2, 10, 3], [10, 2, 14, 1, 16, 1], [9, 1, 13, 2, 17, 1], [15, 3, 10, 1, 5, 1], [8, 1, 12, 3, 16, 1], [14, 2, 10, 1, 12, 2]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const p = [v[0] * v[1], v[2] * v[3], v[4] * v[5]], s = p[0] + p[1] + p[2];
          return {
            enonce: 'Trois notes : ' + v[0] + ' avec le coefficient ' + v[1] + ', ' + v[2] + ' avec le coefficient ' + v[3] + ', et ' + v[4] + ' avec le coefficient ' + v[5] + '. Calcule la somme des produits note × coefficient.',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Multiplie chaque note par son petit nombre, puis ajoute les trois résultats.',
            correction: [v[0] + ' × ' + v[1] + ' = ' + p[0] + '. ' + v[2] + ' × ' + v[3] + ' = ' + p[1] + '. ' + v[4] + ' × ' + v[5] + ' = ' + p[2] + '.', p[0] + ' + ' + p[1] + ' + ' + p[2] + ' = ' + s + '.'],
          };
        },
      },
      {
        id: 'trois-notes',
        univers: 'dehors',
        // [note 1, coefficient 1, note 2, coefficient 2, note 3, coefficient 3]
        versions: [[10, 2, 14, 1, 16, 1], [12, 1, 15, 2, 9, 1], [8, 1, 12, 3, 16, 1], [14, 2, 10, 1, 12, 2], [9, 1, 13, 2, 17, 1], [15, 3, 10, 1, 5, 1]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const s = v[0] * v[1] + v[2] * v[3] + v[4] * v[5], d = v[1] + v[3] + v[5], m = r2(s / d);
          return {
            enonce: 'Aux sciences, Rachel a ' + v[0] + ' (coefficient ' + v[1] + '), ' + v[2] + ' (coefficient ' + v[3] + ') et ' + v[4] + ' (coefficient ' + v[5] + '). Quelle est sa moyenne pondérée ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Additionne les produits note × petit nombre, puis divise par la somme des petits nombres.',
            correction: [v[0] + ' × ' + v[1] + ' + ' + v[2] + ' × ' + v[3] + ' + ' + v[4] + ' × ' + v[5] + ' = ' + s + '.', v[1] + ' + ' + v[3] + ' + ' + v[5] + ' = ' + d + '.', s + ' ÷ ' + d + ' = ' + ecr(m) + '.'],
          };
        },
      },
      {
        id: 'ponderee-ou-simple',
        univers: 'maison-courses',
        // [note 1, coefficient 1, note 2, coefficient 2]
        versions: [[8, 1, 16, 3], [16, 3, 12, 1], [14, 1, 10, 3], [9, 2, 15, 2], [10, 3, 18, 1], [12, 1, 16, 1]],
        genere(c) {
          const [n1, c1, n2, c2] = c.alea.choisir(this.versions);
          const simple = (n1 + n2) / 2, pond = (n1 * c1 + n2 * c2) / (c1 + c2);
          const juste = pond > simple ? CMP[0] : pond < simple ? CMP[1] : CMP[2];
          return {
            enonce: 'Rachel a ' + n1 + ' avec le coefficient ' + c1 + ', et ' + n2 + ' avec le coefficient ' + c2 + '. Sa moyenne pondérée est-elle plus grande, plus petite, ou égale à la moyenne simple de ses deux notes ?',
            reponse: O.choix(c.alea, juste, CMP),
            aide: 'Calcule les deux moyennes, puis compare-les.',
            correction: ['Moyenne simple : (' + n1 + ' + ' + n2 + ') ÷ 2 = ' + ecr(simple) + '.', 'Moyenne pondérée : (' + n1 + ' × ' + c1 + ' + ' + n2 + ' × ' + c2 + ') ÷ ' + (c1 + c2) + ' = ' + ecr(r2(pond)) + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'note-manquante',
        univers: 'dehors',
        // [note du contrôle, coefficient du contrôle, coefficient de l’examen, moyenne visée]
        versions: [[12, 1, 3, 15], [10, 2, 2, 12], [14, 1, 2, 12], [8, 1, 3, 11], [9, 1, 4, 13], [15, 2, 1, 14]],
        genere(c) {
          const [n, c1, c2, m] = c.alea.choisir(this.versions);
          const x = (m * (c1 + c2) - n * c1) / c2;
          return {
            enonce: 'Rachel a eu ' + n + ' au contrôle, coefficient ' + c1 + '. L’examen a le coefficient ' + c2 + '. Elle vise ' + m + ' de moyenne pondérée. Quelle note doit-elle avoir à l’examen ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'Trouve d’abord la somme visée, puis enlève ce que rapporte déjà le contrôle, puis divise.',
            correction: [m + ' × ' + (c1 + c2) + ' = ' + (m * (c1 + c2)) + '.', (m * (c1 + c2)) + ' − ' + n + ' × ' + c1 + ' = ' + (m * (c1 + c2) - n * c1) + '.', (m * (c1 + c2) - n * c1) + ' ÷ ' + c2 + ' = ' + x + '.'],
          };
        },
      },
    ],

    defi: {
      // [note 1, coefficient 1, note 2, coefficient 2, note 3, coefficient 3] ; la moyenne visée est 12
      versions: [[10, 2, 14, 1, 16, 1], [8, 2, 10, 1, 12, 2], [15, 3, 10, 1, 5, 1], [9, 1, 6, 3, 12, 1], [16, 2, 12, 1, 8, 2]],
      genere(c) {
        const v = c.alea.choisir(this.versions);
        const p = [v[0] * v[1], v[2] * v[3], v[4] * v[5]], s = p[0] + p[1] + p[2], d = v[1] + v[3] + v[5], m = r2(s / d), ok = m >= 12;
        return {
          enonce: 'Aminata a trois notes en sciences : ' + v[0] + ' avec le coefficient ' + v[1] + ', ' + v[2] + ' avec le coefficient ' + v[3] + ', et ' + v[4] + ' avec le coefficient ' + v[5] + '. Elle espère 12 au moins de moyenne pondérée.',
          image: { dessin: 'tableur', colonnes: ['Épreuve', 'Première', 'Deuxième', 'Troisième'], lignes: [['Note sur 20', v[0], v[2], v[4]], ['Coefficient', v[1], v[3], v[5]]], description: 'Un tableau. Première épreuve : note ' + v[0] + ', coefficient ' + v[1] + '. Deuxième : note ' + v[2] + ', coefficient ' + v[3] + '. Troisième : note ' + v[4] + ', coefficient ' + v[5] + '.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la somme des produits note × coefficient ?',
              reponse: { type: 'nombre', valeur: s },
              aide: 'Multiplie chaque note par son petit nombre, puis ajoute.',
              correction: [p[0] + ' + ' + p[1] + ' + ' + p[2] + ' = ' + s + '.'],
            },
            {
              texte: 'Question 2. Quelle est la somme des coefficients ?',
              reponse: { type: 'nombre', valeur: d },
              aide: 'Ajoute les trois petits nombres.',
              correction: [v[1] + ' + ' + v[3] + ' + ' + v[5] + ' = ' + d + '.'],
            },
            {
              texte: 'Question 3. Quelle est la moyenne pondérée d’Aminata ?',
              reponse: { type: 'nombre', valeur: m },
              aide: 'Divise la somme des produits par la somme des petits nombres.',
              correction: [s + ' ÷ ' + d + ' = ' + ecr(m) + '.'],
            },
            {
              texte: 'Question 4. Aminata atteint-elle son objectif de 12 au moins ? Justifie avec ta moyenne pondérée.',
              correction: ['Sa moyenne pondérée est ' + ecr(m) + '.', ok ? (m === 12 ? ecr(m) + ' est égal à 12 : elle atteint son objectif.' : ecr(m) + ' est plus grand que 12 : elle atteint son objectif.') : ecr(m) + ' est plus petit que 12 : elle n’atteint pas son objectif.'],
              grille: ['As-tu rappelé ta moyenne pondérée ?', 'As-tu comparé cette moyenne à 12 ?', 'As-tu répondu à la question par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Chaque note a son poids, et tu sais le faire compter : ta moyenne pondérée est juste.',
    carte: ['deux-notes', 'trois-notes', 'ponderee-ou-simple'],
    papierDuSoir: { exercices: ['note-manquante', 'ponderee-ou-simple'], defi: true },
    automatismes: [
      {
        id: 'produit-rapide',
        versions: [[12, 2], [15, 3], [8, 4], [14, 3]],
        genere(c) { const [n, k] = c.alea.choisir(this.versions); return { enonce: 'Une note de ' + n + ' qui compte ' + k + ' fois. Combien font ' + n + ' × ' + k + ' ?', reponse: { type: 'nombre', valeur: n * k } }; },
      },
    ],
    savaisTu: null,
    prenoms: ['Rachel', 'Aminata'],
  };
});
