/* Notion 13 du bloc « Proportionnalité, pourcentages et fonctions » : la fonction linéaire. Le prix au kilo de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const r2 = (x) => Math.round(x * 100) / 100;
  const OUI = 'Oui, elle est linéaire', NON = 'Non, elle n’est pas linéaire';

  return {
    id: 'fonction-lineaire',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'La fonction linéaire',
    classe: '3e',
    univers: ['commerce', 'cuisine-restaurant'],

    accroche: {
      texte: 'Clarisse vend des tomates à 3 euros le kilo. Pour x kilos, le prix est 3 fois x. Si un client ne prend rien, il ne paie rien. S’il en prend deux fois plus, il paie deux fois plus. ' +
        'Sa machine à nombres n’a qu’un seul travail : multiplier.',
      image: { dessin: 'point-graphique', a: 3, b: 0, xMax: 5, yMax: 15, description: 'Une droite qui part du coin, en bas à gauche. Pour x égal à 0, le prix est 0. Pour 1, 3. Pour 2, 6. Pour 3, 9. Pour 4, 12. Pour 5, 15.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Masse x (kg)', '0', '1', '2', '4'], lignes: [['Prix (€)', 0, 3, 6, 12]], description: 'Un tableau. 0 kilo, 0 euro. 1 kilo, 3 euros. 2 kilos, 6 euros. 4 kilos, 12 euros.' },
      etapes: [
        'La règle de Clarisse s’écrit f de x égale 3 fois x : elle multiplie seulement.',
        'Le prix est proportionnel à la masse : on retrouve le tableau du début du bloc.',
        'Sur le dessin, tous les points sont alignés. Leur droite passe par le coin, en bas à gauche.',
        'Pour retrouver le 3 : on prend un point de la droite, et on divise le prix par la masse.',
      ],
    },

    decouverte: {
      texte: (c) => 'Cette machine ne fait que multiplier par un même nombre a. C’est ' + c.mot('lineaire') + '. On écrit f de x égale a x. Ce nombre a s’appelle ' + c.mot('coefficient') + '. ' +
        'Elle traduit la proportionnalité. Sa droite passe par ' + c.mot('origine') + '. ' +
        'L’astuce : pour trouver a, divise une image par son antécédent.',
    },

    vocabulaire: {
      termes: {
        lineaire: { sesMots: 'la machine simple', officiel: 'une fonction linéaire', lesDeux: 'la machine simple, que les matheux appellent une fonction linéaire' },
        origine: { sesMots: 'le coin, en bas à gauche', officiel: 'l’origine', lesDeux: 'le coin, en bas à gauche, que l’on appelle l’origine' },
        coefficient: { sesMots: 'son multiplicateur', officiel: 'son coefficient', lesDeux: 'son multiplicateur, que les matheux appellent son coefficient' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la machine simple, son multiplicateur, et le coin, en bas à gauche. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une fonction linéaire, pour la machine simple. Le multiplicateur s’appelle le coefficient. Le coin s’appelle l’origine.',
        'Tu connais les mots officiels : la fonction linéaire, son coefficient, et l’origine.',
      ],
    },

    exercices: [
      {
        id: 'image-lineaire',
        univers: 'commerce',
        // [a, x]
        versions: [[3, 5], [4, 7], [2.5, 4], [6, 8], [1.5, 6], [5, 9]],
        genere(c) {
          const [a, x] = c.alea.choisir(this.versions);
          const y = r2(a * x);
          return {
            enonce: 'Soit la fonction f(x) = ' + ecr(a) + 'x. Quelle est l’image de ' + x + ' ?',
            reponse: { type: 'nombre', valeur: y },
            aide: 'Calcule ' + ecr(a) + ' × ' + x + '.',
            aideParlee: 'Multiplie le nombre par le coefficient.',
            correction: ['f(' + x + ') = ' + ecr(a) + ' × ' + x + ' = ' + ecr(y) + '.'],
          };
        },
      },
      {
        id: 'trouver-a',
        univers: 'cuisine-restaurant',
        // [x, y]
        versions: [[2, 6], [4, 10], [5, 20], [3, 12], [8, 12], [6, 21]],
        genere(c) {
          const [x, y] = c.alea.choisir(this.versions);
          const a = y / x;
          return {
            enonce: 'Une fonction linéaire f vérifie f(' + x + ') = ' + y + '. Quel est son coefficient a ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Calcule ' + y + ' ÷ ' + x + '.',
            aideParlee: 'Divise l’image par son antécédent.',
            correction: [y + ' ÷ ' + x + ' = ' + ecr(a) + '.'],
          };
        },
      },
      {
        id: 'antecedent-lineaire',
        univers: 'commerce',
        // [a, y]
        versions: [[3, 12], [4, 20], [2.5, 10], [6, 42], [5, 45], [8, 24]],
        genere(c) {
          const [a, y] = c.alea.choisir(this.versions);
          return {
            enonce: 'Les tomates coûtent ' + ecr(a) + ' € le kilo. Le prix est donné par f(x) = ' + ecr(a) + 'x. Quelle masse, en kg, peut-on acheter pour ' + y + ' € ?',
            reponse: { type: 'nombre', valeur: y / a },
            aide: 'Calcule ' + y + ' ÷ ' + ecr(a) + '.',
            aideParlee: 'Divise le prix par le coefficient.',
            correction: [y + ' ÷ ' + ecr(a) + ' = ' + ecr(y / a) + ' kg.'],
          };
        },
      },
      Q('lineaire-ou-pas', 'cuisine-restaurant',
        [['f(x) = 4x', OUI], ['f(x) = 2x + 3', NON], ['f(x) = 0,5x', OUI], ['f(x) = x × x', NON], ['f(x) = −2x', OUI]],
        (x) => 'La fonction ' + x + ' est-elle linéaire ?', [OUI, NON],
        'Une fonction linéaire ne fait que multiplier x par un nombre.',
        'Une fonction linéaire s’écrit f(x) = ax. Ajouter un nombre, ou multiplier x par lui-même, donne autre chose.'),
      Q('ce-que-dit-la-droite', 'commerce',
        [['Une fonction linéaire est représentée par :', 'Une droite qui passe par l’origine'], ['Sur son graphique, une situation de proportionnalité donne :', 'Une droite qui passe par l’origine']],
        (x) => x, ['Une droite qui passe par l’origine', 'Une droite qui ne passe pas par l’origine', 'Une courbe qui monte et qui descend'],
        'Quand x vaut zéro, que vaut f de x ?',
        'Quand x vaut zéro, ax vaut zéro : la droite passe par l’origine. C’est la marque de la proportionnalité.'),
    ],

    defi: {
      // [prix du kilo, masse, budget]
      versions: [[3, 4, 15], [2.5, 6, 20], [4, 3, 18], [1.5, 8, 12]],
      genere(c) {
        const [a, m, b] = c.alea.choisir(this.versions);
        const y = r2(a * m);
        return {
          enonce: 'Clarisse vend ses tomates ' + ecr(a) + ' € le kilo. On note f la fonction qui, à une masse x en kilos, associe le prix en euros.',
          image: { dessin: 'tableur', colonnes: ['Masse x (kg)', '1', String(m)], lignes: [['Prix (€)', ecr(a), '?']], description: 'Un tableau. Pour 1 kilo, ' + ecr(a) + ' euros. Pour ' + m + ' kilos, le prix est à trouver.' },
          questions: [
            {
              texte: 'Question 1. Combien coûtent ' + m + ' kg, en euros ?',
              reponse: { type: 'nombre', valeur: y },
              aide: 'Multiplie la masse par le prix du kilo.',
              correction: [m + ' × ' + ecr(a) + ' = ' + ecr(y) + ' €.'],
            },
            {
              texte: 'Question 2. Quelle masse peut-on acheter avec ' + b + ' €, en kg ?',
              reponse: { type: 'nombre', valeur: b / a },
              aide: 'Divise le budget par le prix du kilo.',
              correction: [b + ' ÷ ' + ecr(a) + ' = ' + ecr(b / a) + ' kg.'],
            },
            {
              texte: 'Question 3. Écris f(x), puis explique pourquoi f est une fonction linéaire. Comment est sa droite ?',
              correction: ['f(x) = ' + ecr(a) + 'x.', 'La fonction ne fait que multiplier x par un même nombre : le prix est proportionnel à la masse. Sa droite passe par l’origine.'],
              grille: ['As-tu écrit f(x) ?', 'As-tu parlé de la proportionnalité ?', 'As-tu dit que la droite passe par l’origine ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un seul multiplicateur, une droite par l’origine : voilà la proportionnalité en fonction.',
    carte: ['image-lineaire', 'trouver-a', 'lineaire-ou-pas'],
    papierDuSoir: { exercices: ['antecedent-lineaire', 'image-lineaire'], defi: true },
    automatismes: [
      {
        id: 'lineaire-rapide',
        versions: [[3, 4], [5, 6], [2, 9], [4, 7]],
        genere(c) { const [a, x] = c.alea.choisir(this.versions); return { enonce: 'f(x) = ' + a + 'x. f(' + x + ') = ?', reponse: { type: 'nombre', valeur: a * x } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Douala, au Cameroun, en juillet 2026, le kilo de cacao s’achetait autour de 2 800 francs CFA.',
    prenoms: ['Clarisse'],
  };
});
