/* Notion 17 du bloc physique-chimie « La matière » : acide, basique ou neutre, le pH. Les produits du salon de coiffure. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const AC = 'Acide', NE = 'Neutre', BA = 'Basique';
  const nature = (v) => (v < 7 ? AC : v === 7 ? NE : BA);
  const ECHELLE = { dessin: 'ph', reperes: [{ nom: 'citron', ph: 2 }, { nom: 'eau pure', ph: 7 }, { nom: 'eau de Javel', ph: 12 }], description: 'L’échelle de pH de 0 à 14 : acide en dessous de 7, neutre à 7, basique au-dessus. Le citron est vers 2, l’eau pure à 7, l’eau de Javel vers 12.' };

  return {
    id: 'ph',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Acide, basique ou neutre : le pH',
    classe: '3e',
    univers: ['coiffure', 'cuisine-restaurant', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : pH, solutions acides, basiques et neutres.',

    accroche: {
      texte: 'Au salon de coiffure de sa cousine, Rachel lit les étiquettes : « shampoing doux, légèrement acide », « défrisant basique, porter des gants ». ' +
        'À la maison, Laure met du citron dans le thé et range l’eau de Javel tout en haut du placard. ' +
        'Qu’ont en commun le citron, le shampoing et l’eau de Javel ?',
      image: ECHELLE,
    },

    manipulation: {
      image: ECHELLE,
      etapes: [
        'Un nombre de 0 à 14 dit si une solution est acide, neutre ou basique.',
        'Au-dessous de 7, la solution est acide : citron, vinaigre. Plus le nombre est petit, plus elle est acide.',
        'À 7, elle est neutre : l’eau pure.',
        'Au-dessus de 7, elle est basique : savon, eau de Javel. Plus le nombre est grand, plus elle est basique.',
        'On le mesure avec un papier spécial, qui change de couleur, ou avec un appareil.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un seul nombre, de 0 à 14, dit si une solution est acide, neutre ou basique : c’est ' + c.mot('ph') + '. Une solution acide contient plus d’ions hydrogène H⁺ que d’ions hydroxyde HO⁻ ; une solution basique, l’inverse. ' +
        'Quand on ajoute de l’eau à un acide, ce nombre remonte vers 7 ; à une base, il redescend vers 7. ' +
        'Attention : les acides et les bases forts sont dangereux. Gants et lunettes, et jamais d’eau de Javel avec un acide.',
    },

    vocabulaire: {
      termes: {
        ph: { sesMots: 'la note d’acidité', officiel: 'le pH', lesDeux: 'la note d’acidité, que les scientifiques appellent le pH' },
      },
      textes: [
        'Pour l’instant, garde tes mots : chaque solution a une note d’acidité, de 0 à 14. Moins de 7, c’est acide ; 7, c’est neutre ; plus de 7, c’est basique. ' +
          'Les scientifiques ont un nom pour cette note : je te le dirai la prochaine fois.',
        'Les scientifiques disent : le pH. Notre note d’acidité, c’est le pH. Une solution acide a beaucoup d’ions H⁺, une solution basique beaucoup d’ions HO⁻.',
        'Tu connais le mot officiel : le pH. Acide si le pH est inférieur à 7, neutre s’il vaut 7, basique s’il est supérieur à 7.',
      ],
    },

    exercices: [
      {
        id: 'nature',
        univers: 'coiffure',
        versions: [['un shampoing doux', 5.5], ['un défrisant', 12], ['du jus de citron', 2], ['de l’eau pure', 7], ['du vinaigre', 3], ['de l’eau savonneuse', 10], ['de l’eau de Javel', 12], ['une eau gazeuse', 5]],
        genere(c) {
          const [prod, v] = c.alea.choisir(this.versions);
          const bonne = nature(v);
          return {
            enonce: 'Rachel mesure le pH ' + prod.replace(/^un |^une /, 'd’un ').replace(/^d’un e/, 'd’une e').replace(/^du |^de l’/, (m) => (m === 'du ' ? 'du ' : 'de l’')) + ' : ' + ecr(v) + '. Cette solution est-elle acide, neutre ou basique ?',
            reponse: O.choix(c.alea, bonne, [AC, NE, BA]),
            aide: 'Compare ' + ecr(v) + ' à 7.',
            aideParlee: 'Compare le pH à 7 : en dessous, acide ; égal, neutre ; au-dessus, basique.',
            correction: [ecr(v) + (v < 7 ? ' < 7' : v === 7 ? ' = 7' : ' > 7') + '. Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'plus-acide',
        univers: 'cuisine-restaurant',
        versions: [[['le citron', 2], ['le vinaigre', 3]], [['le jus d’orange', 4], ['le lait', 6.5]], [['le café', 5], ['le vinaigre', 3]], [['le coca', 2.5], ['le jus de tomate', 4]]],
        genere(c) {
          const [[a, va], [b, vb]] = c.alea.choisir(this.versions);
          const bonne = va < vb ? a : b;
          return {
            enonce: 'Le pH ' + a.replace(/^le /, 'du ') + ' est ' + ecr(va) + ', celui ' + b.replace(/^le /, 'du ') + ' est ' + ecr(vb) + '. Lequel est le plus acide ?',
            reponse: O.choix(c.alea, bonne.replace(/^./, (x) => x.toUpperCase()), [a, b].map((x) => x.replace(/^./, (y) => y.toUpperCase()))),
            aide: 'Plus le pH est petit, plus c’est acide.',
            correction: ['Le plus petit pH est ' + ecr(Math.min(va, vb)) + '. Réponse : ' + bonne.replace(/^./, (x) => x.toUpperCase()) + '.'],
          };
        },
      },
      {
        id: 'dilution',
        univers: 'maison-courses',
        versions: [['du vinaigre', 'acide'], ['du jus de citron', 'acide'], ['de l’eau savonneuse', 'basique'], ['de la lessive', 'basique']],
        genere(c) {
          const [sol, n] = c.alea.choisir(this.versions);
          const bonne = n === 'acide' ? 'Il augmente vers 7' : 'Il diminue vers 7';
          return {
            enonce: 'Laure ajoute beaucoup d’eau à ' + sol + ', une solution ' + n + '. Que devient son pH ?',
            reponse: O.choix(c.alea, bonne, ['Il augmente vers 7', 'Il diminue vers 7', 'Il ne change pas']),
            aide: 'En diluant, une solution se rapproche de l’eau, neutre.',
            correction: ['En diluant, le pH se rapproche de 7. Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quels-ions',
        univers: 'coiffure',
        versions: [[AC, 'Plus d’ions H⁺ que d’ions HO⁻'], [BA, 'Plus d’ions HO⁻ que d’ions H⁺'], [NE, 'Autant d’ions H⁺ que d’ions HO⁻']],
        genere(c) {
          const [n, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Que contient une solution ' + n.toLowerCase() + ' ?',
            reponse: O.choix(c.alea, bonne, ['Plus d’ions H⁺ que d’ions HO⁻', 'Plus d’ions HO⁻ que d’ions H⁺', 'Autant d’ions H⁺ que d’ions HO⁻']),
            aide: 'Acide : les ions H⁺ dominent. Basique : les ions HO⁻ dominent.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'ecart-a-sept',
        univers: 'maison-courses',
        versions: [2, 3, 4, 9, 10, 12, 11, 5],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          return {
            enonce: 'Une solution a un pH de ' + v + '. De combien d’unités est-elle éloignée du neutre ?',
            reponse: { type: 'nombre', valeur: Math.abs(v - 7) },
            aide: 'Le neutre est à 7 : fais la différence.',
            aideParlee: 'Le neutre est à 7. Fais la différence entre le pH et 7, sans t’occuper du signe.',
            correction: ['L’écart entre ' + v + ' et 7 est ' + Math.abs(v - 7) + '.'],
          };
        },
      },
    ],

    defi: {
      // [pH du shampoing, pH du défrisant, pH du produit d'entretien]
      versions: [[5, 12, 9], [6, 13, 10], [5.5, 12, 8], [4.5, 11, 10], [6, 12, 9], [5, 13, 11]],
      genere(c) {
        const [s, d, e] = c.alea.choisir(this.versions);
        return {
          enonce: 'Dans le salon de coiffure, Rebecca range trois produits : un shampoing de pH ' + ecr(s) + ', un défrisant de pH ' + d + ' et un produit pour nettoyer les bacs de pH ' + e + '. ' +
            'Elle a aussi de l’eau de Javel pour désinfecter, et du vinaigre.',
          image: { dessin: 'ph', reperes: [{ nom: 'shampoing', ph: s }, { nom: 'produit des bacs', ph: e }, { nom: 'défrisant', ph: d }], description: 'L’échelle de pH avec le shampoing, le produit des bacs et le défrisant.' },
          questions: [
            {
              texte: 'Question 1. Le shampoing est-il acide, neutre ou basique ?',
              reponse: O.choix(c.alea, nature(s), [AC, NE, BA]),
              aide: 'Compare son pH à 7.',
              correction: [ecr(s) + ' < 7. Réponse : ' + nature(s) + '.'],
            },
            {
              texte: 'Question 2. Lequel des trois produits est le plus basique ?',
              reponse: O.choix(c.alea, 'Le défrisant', ['Le shampoing', 'Le défrisant', 'Le produit des bacs']),
              aide: 'Le plus basique a le plus grand pH.',
              correction: ['Le plus grand pH est ' + d + '. Réponse : Le défrisant.'],
            },
            {
              texte: 'Question 3. Rebecca veut mélanger l’eau de Javel et le vinaigre pour mieux nettoyer. Explique pourquoi c’est dangereux, et les précautions à prendre avec ces produits.',
              correction: ['L’eau de Javel, basique, mélangée à un acide comme le vinaigre, dégage un gaz toxique.', 'Il ne faut jamais les mélanger. On porte des gants et des lunettes, et on aère.'],
              grille: ['As-tu dit que l’eau de Javel est basique et le vinaigre acide ?', 'As-tu dit que le mélange dégage un gaz toxique ?', 'As-tu cité des précautions : gants, lunettes, aérer, ne pas mélanger ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Acide, neutre ou basique : tu sais lire le pH, et manipuler les produits sans danger.',
    carte: ['nature', 'plus-acide', 'dilution'],
    papierDuSoir: { exercices: ['quels-ions', 'ecart-a-sept'], defi: true },
    automatismes: [
      {
        id: 'nature-rapide',
        versions: [2, 7, 9, 4, 12],
        genere(c) { const v = c.alea.choisir(this.versions); return { enonce: 'pH ' + v + ' : acide, neutre ou basique ?', reponse: O.choix(c.alea, nature(v), [AC, NE, BA]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, les calices du foléré servent à faire des boissons : comme le chou rouge, ils contiennent des pigments qui changent de couleur avec un acide ou une base.',
    prenoms: ['Rachel', 'Laure', 'Rebecca'],
  };
});
