/* Notion 14 du bloc « Mesures, géométrie et espace » : Thalès en triangles emboîtés. Mesurer un arbre avec son ombre.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'thales-emboites',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Thalès en triangles emboîtés',
    classe: '4e',
    univers: ['champetre', 'dehors'],

    accroche: {
      texte: 'Le manguier de Clarisse grandit. Touchera-t-il la ligne électrique ? Impossible d’y grimper avec un mètre ! Rebecca a une idée, à l’heure où le soleil descend. ' +
        'Elle plante un bâton de 1 mètre. Son ombre fait 2 mètres. L’ombre de l’arbre fait 12 mètres. Le soleil fait tout le travail.',
      image: { dessin: 'figure', points: { O: [0, 0], B: [2, 0], A: [12, 0], C: [2, 1], D: [12, 6] }, segments: [['O', 'A', '12 m'], ['A', 'D', '6 m'], ['B', 'C', '1 m'], ['O', 'D']], description: 'Un grand triangle O A D, et un petit triangle O B C emboîté dedans. O est le bout des ombres. O B, l’ombre du bâton, mesure 2 mètres. B C, le bâton, mesure 1 mètre. O A, l’ombre de l’arbre, mesure 12 mètres. A D, l’arbre, mesure 6 mètres. Le bâton et l’arbre sont parallèles.' },
    },

    manipulation: {
      etapes: [
        'Le rayon de soleil forme deux triangles emboîtés, qui partagent le même coin : le bout des ombres.',
        'Le bâton et l’arbre sont tous les deux bien droits : ils sont parallèles.',
        'L’ombre de l’arbre est 6 fois plus longue que celle du bâton.',
        'Alors l’arbre est 6 fois plus haut que le bâton : il mesure 6 mètres.',
      ],
    },

    decouverte: {
      texte: (c) => 'Deux triangles emboîtés, avec deux côtés ' + c.mot('paralleles') + ', sont comme un agrandissement l’un de l’autre. Les côtés du petit et ceux du grand sont ' + c.mot('proportionnels') + '. ' +
        'C’est le théorème de Thalès. L’astuce : écris toujours les trois fractions, petit triangle en haut, grand triangle en bas.',
    },

    vocabulaire: {
      termes: {
        paralleles: { sesMots: 'qui ne se croisent jamais', officiel: 'parallèles', lesDeux: 'qui ne se croisent jamais, donc parallèles' },
        proportionnels: { sesMots: 'multipliés par le même nombre', officiel: 'proportionnels', lesDeux: 'multipliés par le même nombre, donc proportionnels' },
      },
      textes: [
        'Pour l’instant, garde tes mots : des côtés qui ne se croisent jamais, et des longueurs multipliées par le même nombre. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : parallèles, pour ce qui ne se croise jamais. Et des longueurs multipliées par le même nombre sont proportionnelles.',
        'Tu connais les mots officiels : parallèles, et proportionnels.',
      ],
    },

    exercices: [
      {
        id: 'hauteur-arbre',
        univers: 'champetre',
        // [bâton, ombre du bâton, ombre de l'arbre]
        versions: [[1, 2, 12], [1, 2, 8], [2, 3, 12], [1.5, 2, 8], [2, 5, 15], [1, 4, 20]],
        genere(c) {
          const [b, o, a] = c.alea.choisir(this.versions);
          const h = r2((b * a) / o);
          return {
            enonce: 'Un bâton de ' + ecr(b) + ' m a une ombre de ' + o + ' m. Au même moment, l’ombre d’un arbre mesure ' + a + ' m. Quelle est la hauteur de l’arbre, en mètres ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'Cherche combien de fois l’ombre de l’arbre contient celle du bâton.',
            correction: [a + ' ÷ ' + o + ' = ' + ecr(r2(a / o)) + '.', ecr(b) + ' × ' + ecr(r2(a / o)) + ' = ' + ecr(h) + ' m.'],
          };
        },
      },
      {
        id: 'calcul-de-cote',
        univers: 'dehors',
        // [AM, AB, MN] : (MN) // (BC), M sur [AB], N sur [AC] ; on cherche BC
        versions: [[3, 6, 4], [2, 8, 3], [4, 10, 6], [5, 15, 4], [3, 12, 2.5], [6, 9, 8]],
        genere(c) {
          const [am, ab, mn] = c.alea.choisir(this.versions);
          const bc = r2((mn * ab) / am);
          return {
            enonce: 'Dans le triangle ABC, M est sur [AB] et N est sur [AC], avec (MN) parallèle à (BC). On donne AM = ' + am + ' cm, AB = ' + ab + ' cm et MN = ' + ecr(mn) + ' cm. Combien mesure BC, en cm ?',
            reponse: { type: 'nombre', valeur: bc },
            aide: 'Écris AM sur AB égale MN sur BC, puis fais un produit en croix.',
            correction: ['AM/AB = MN/BC, soit ' + am + '/' + ab + ' = ' + ecr(mn) + '/BC.', 'BC = ' + ecr(mn) + ' × ' + ab + ' ÷ ' + am + ' = ' + ecr(bc) + ' cm.'],
          };
        },
      },
      {
        id: 'petit-cote',
        univers: 'dehors',
        // [AM, AB, AC] : on cherche AN
        versions: [[3, 6, 8], [2, 8, 12], [4, 10, 15], [5, 15, 9], [3, 12, 10], [6, 9, 12]],
        genere(c) {
          const [am, ab, ac] = c.alea.choisir(this.versions);
          const an = r2((am * ac) / ab);
          return {
            enonce: 'Dans le triangle ABC, M est sur [AB] et N est sur [AC], avec (MN) parallèle à (BC). On donne AM = ' + am + ' cm, AB = ' + ab + ' cm et AC = ' + ac + ' cm. Combien mesure AN, en cm ?',
            reponse: { type: 'nombre', valeur: an },
            aide: 'Écris AM sur AB égale AN sur AC, puis fais un produit en croix.',
            correction: ['AM/AB = AN/AC, soit ' + am + '/' + ab + ' = AN/' + ac + '.', 'AN = ' + am + ' × ' + ac + ' ÷ ' + ab + ' = ' + ecr(an) + ' cm.'],
          };
        },
      },
      {
        id: 'bonne-egalite',
        univers: 'champetre',
        // [fraction donnée, bonne réponse, piège, piège]
        versions: [['AM/AB', 'AN/AC', 'AB/AM', 'AC/AN'], ['AN/AC', 'MN/BC', 'AC/AN', 'BC/MN'], ['MN/BC', 'AM/AB', 'BC/MN', 'AB/AM']],
        genere(c) {
          const [x, b, p1, p2] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans le triangle ABC, M est sur [AB], N est sur [AC], et (MN) est parallèle à (BC). Quelle fraction est égale à ' + x + ' ?',
            reponse: O.choix(c.alea, b, [p1, p2]),
            aide: 'Petit triangle en haut, grand triangle en bas.',
            correction: ['AM/AB = AN/AC = MN/BC : le petit triangle en haut, le grand en bas.', 'Réponse : ' + b + '.'],
          };
        },
      },
      {
        id: 'fois-plus-grand',
        univers: 'champetre',
        // [AM, AB]
        versions: [[2, 6], [3, 12], [4, 20], [5, 10], [1.5, 3], [2.5, 10]],
        genere(c) {
          const [am, ab] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans deux triangles emboîtés, AM = ' + ecr(am) + ' cm sur le petit, et AB = ' + ab + ' cm sur le grand. Par combien sont multipliées les longueurs, du petit au grand ?',
            reponse: { type: 'nombre', valeur: ab / am },
            aide: 'Divise la longueur du grand par celle du petit.',
            correction: [ab + ' ÷ ' + ecr(am) + ' = ' + ab / am + '.'],
          };
        },
      },
    ],

    defi: {
      // [bâton, ombre bâton, ombre arbre, limite de hauteur de la ligne]
      versions: [[1, 2, 12, 8], [1, 2, 18, 8], [2, 3, 15, 12], [1.5, 2, 12, 8]],
      genere(c) {
        const [b, o, a, l] = c.alea.choisir(this.versions);
        const h = r2((b * a) / o);
        const juste = h > l ? 'Oui, il dépasse la ligne' : 'Non, il reste en dessous';
        return {
          enonce: 'Pour mesurer un arbre, on plante un bâton vertical [BC] de ' + ecr(b) + ' m. Au même moment, l’ombre du bâton mesure OB = ' + o + ' m, et celle de l’arbre OA = ' + a + ' m. Les rayons du soleil passent par O, C et le haut D de l’arbre. Une ligne électrique passe à ' + l + ' m du sol.',
          image: { dessin: 'figure', points: { O: [0, 0], B: [2, 0], A: [12, 0], C: [2, 1], D: [12, 6] }, segments: [['O', 'A'], ['A', 'D'], ['B', 'C'], ['O', 'D']], droits: [['O', 'B', 'C'], ['O', 'A', 'D']], description: 'Deux triangles emboîtés de sommet O. O B mesure ' + o + ' mètres, B C ' + ecr(b) + (b < 2 ? ' mètre' : ' mètres') + ', O A ' + a + ' mètres. Le bâton B C et l’arbre A D sont verticaux, donc parallèles. La hauteur A D est à calculer.' },
          questions: [
            {
              texte: 'Question 1. Par combien l’ombre du bâton est-elle multipliée pour obtenir celle de l’arbre ?',
              reponse: { type: 'nombre', valeur: a / o },
              aide: 'Divise les deux ombres.',
              correction: [a + ' ÷ ' + o + ' = ' + ecr(a / o) + '.'],
            },
            {
              texte: 'Question 2. Calculer la hauteur AD de l’arbre, en mètres.',
              reponse: { type: 'nombre', valeur: h },
              aide: 'Multiplie la hauteur du bâton par ce même nombre.',
              correction: [ecr(b) + ' × ' + ecr(a / o) + ' = ' + ecr(h) + ' m.'],
            },
            {
              texte: 'Question 3. L’arbre dépasse-t-il la ligne électrique ?',
              reponse: O.choix(c.alea, juste, ['Oui, il dépasse la ligne', 'Non, il reste en dessous']),
              aide: 'Compare les deux hauteurs.',
              correction: ['On compare ' + ecr(h) + ' m et ' + l + ' m.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Rédiger le calcul de AD, en citant le théorème utilisé.',
              correction: ['Les droites (BC) et (AD) sont parallèles, car toutes deux verticales.', 'D’après le théorème de Thalès, OB/OA = BC/AD.', 'Donc AD = ' + ecr(b) + ' × ' + a + ' ÷ ' + o + ' = ' + ecr(h) + ' m.'],
              grille: ['As-tu dit que les droites sont parallèles ?', 'As-tu cité le théorème de Thalès ?', 'As-tu écrit l’égalité de fractions ?', 'As-tu conclu avec l’unité ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avec un bâton et le soleil, tu mesures un arbre sans quitter le sol.',
    carte: ['hauteur-arbre', 'bonne-egalite', 'calcul-de-cote'],
    papierDuSoir: { exercices: ['calcul-de-cote', 'petit-cote'], defi: true },
    automatismes: [
      {
        id: 'produit-en-croix',
        versions: [[2, 4, 3], [3, 6, 5], [2, 10, 3], [4, 8, 5]],
        genere(c) { const [a, b, d] = c.alea.choisir(this.versions); return { enonce: a + '/' + b + ' = ' + d + '/? : quel nombre manque ?', reponse: { type: 'nombre', valeur: (d * b) / a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Selon les Anciens, Thalès de Milet a mesuré les pyramides d’Égypte grâce à la longueur de leur ombre.',
    prenoms: ['Clarisse', 'Rebecca'],
  };
});
