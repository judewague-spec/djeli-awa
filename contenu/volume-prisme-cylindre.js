/* Notion 9 du bloc « Mesures, géométrie et espace » : le volume du prisme et du cylindre. Le bidon d'huile et la caisse du marché.
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
    id: 'volume-prisme-cylindre',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Volume du prisme et du cylindre',
    classe: '4e',
    univers: ['commerce', 'cuisine-restaurant'],

    accroche: {
      texte: 'Aminata remplit un bidon d’huile bien droit. Moussa regarde l’huile monter. La surface du fond reste la même, couche après couche. ' +
        'Chaque couche pèse autant que la précédente. Pour connaître tout le volume, il suffit d’empiler : le fond, fois la hauteur.',
      image: { dessin: 'solide', forme: 'cylindre', r: 2, h: 5, cotes: { r: '2 dm', h: '5 dm' }, description: 'Un bidon en forme de cylindre, debout. Le rayon du fond mesure 2 décimètres, la hauteur 5 décimètres. La moitié arrière du fond est en pointillés.' },
    },

    manipulation: {
      image: { dessin: 'solide', forme: 'prisme', l: 4, p: 5, h: 3, cotes: { l: '4 cm', p: '5 cm', h: '3 cm' }, description: 'Un prisme droit couché. Ses deux bases sont des triangles, de 4 centimètres de base et 3 centimètres de hauteur. La distance entre les deux bases mesure 5 centimètres. Les arêtes cachées sont en pointillés.' },
      etapes: [
        'Pose une pile de feuilles identiques sur la table. Une feuille, c’est la base.',
        'Plus la pile monte, plus le volume grandit, sans que la forme de la feuille change.',
        'Ce volume, c’est l’aire d’une feuille, multipliée par la hauteur de la pile.',
        'Une pile de feuilles rondes fait un cylindre. Une pile de feuilles triangulaires fait un prisme.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un solide bien droit a deux bases identiques, l’une au-dessus de l’autre. Si ses bases ont des angles, c’est ' + c.mot('prisme') + '. Si elles sont rondes, c’est ' + c.mot('cylindre') + '. ' +
        'L’astuce : même formule pour tous. Aire de la base, fois hauteur.',
    },

    vocabulaire: {
      termes: {
        prisme: { sesMots: 'une pile de feuilles à angles', officiel: 'un prisme droit', lesDeux: 'une pile de feuilles à angles, que l’on appelle un prisme droit' },
        cylindre: { sesMots: 'une pile de feuilles rondes', officiel: 'un cylindre', lesDeux: 'une pile de feuilles rondes, que l’on appelle un cylindre' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une pile de feuilles à angles, et une pile de feuilles rondes. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : un prisme droit, pour la pile de feuilles à angles. Et la pile de feuilles rondes s’appelle un cylindre.',
        'Tu connais les mots officiels : le prisme droit, et le cylindre.',
      ],
    },

    exercices: [
      {
        id: 'pave',
        univers: 'commerce',
        versions: [[4, 3, 2], [5, 4, 3], [6, 5, 2], [10, 4, 3], [8, 5, 2], [2.5, 4, 2]],
        genere(c) {
          const [l, k, h] = c.alea.choisir(this.versions);
          const v = r2(l * k * h);
          return {
            enonce: 'Une caisse de mangues a la forme d’un pavé droit de ' + ecr(l) + ' dm, ' + k + ' dm et ' + h + ' dm. Quel est son volume, en dm³ ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Aire du fond, fois hauteur.',
            correction: ['Aire du fond : ' + ecr(l) + ' × ' + k + ' = ' + ecr(r2(l * k)) + ' dm².', ecr(r2(l * k)) + ' × ' + h + ' = ' + ecr(v) + ' dm³.'],
          };
        },
      },
      {
        id: 'prisme-triangle',
        univers: 'commerce',
        // [base du triangle, hauteur du triangle, longueur du prisme]
        versions: [[4, 3, 5], [6, 2, 10], [5, 4, 6], [8, 3, 4], [10, 3, 2], [6, 5, 3]],
        genere(c) {
          const [b, h, p] = c.alea.choisir(this.versions);
          const a = (b * h) / 2;
          return {
            enonce: 'Une part de gâteau a la forme d’un prisme droit. Sa base est un triangle de base ' + b + ' cm et de hauteur ' + h + ' cm. L’épaisseur du gâteau est de ' + p + ' cm. Quel est son volume, en cm³ ?',
            reponse: { type: 'nombre', valeur: a * p },
            aide: 'Calcule d’abord l’aire du triangle, puis multiplie par l’épaisseur.',
            correction: ['Aire du triangle : ' + b + ' × ' + h + ' ÷ 2 = ' + a + ' cm².', a + ' × ' + p + ' = ' + a * p + ' cm³.'],
          };
        },
      },
      {
        id: 'cylindre',
        univers: 'cuisine-restaurant',
        versions: [[2, 5], [1, 3], [3, 4], [2, 4], [3, 2], [2, 3]],
        genere(c) {
          const [r, h] = c.alea.choisir(this.versions);
          const a = r2(3.14 * r * r), v = r2(a * h);
          return {
            enonce: 'Une marmite cylindrique a un rayon de ' + r + ' dm et une hauteur de ' + h + ' dm. Quel est son volume, en dm³ ? Prends 3,14 pour π.',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Aire du disque, soit rayon fois rayon fois 3,14. Puis multiplie par la hauteur.',
            aideParlee: 'Aire du disque, soit rayon fois rayon fois pi. Puis multiplie par la hauteur.',
            correction: ['Aire du fond : 3,14 × ' + r + ' × ' + r + ' = ' + ecr(a) + ' dm².', ecr(a) + ' × ' + h + ' = ' + ecr(v) + ' dm³.'],
          };
        },
      },
      {
        id: 'en-litres',
        univers: 'cuisine-restaurant',
        // [aire de la base en dm², hauteur en dm]
        versions: [[12, 5], [20, 3], [15, 4], [8, 2.5], [30, 2], [10, 6]],
        genere(c) {
          const [a, h] = c.alea.choisir(this.versions);
          const v = r2(a * h);
          return {
            enonce: 'Le fond d’un récipient droit a une aire de ' + a + ' dm², et sa hauteur est de ' + ecr(h) + ' dm. Combien de litres peut-il contenir ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Aire du fond, fois hauteur. Un décimètre cube, c’est un litre.',
            correction: [a + ' × ' + ecr(h) + ' = ' + ecr(v) + ' dm³.', '1 dm³ = 1 L, donc ' + ecr(v) + ' L.'],
          };
        },
      },
      Q('quelle-base', 'commerce',
        [['une boîte de conserve', 'Un disque'], ['une boîte à chaussures', 'Un rectangle'], ['une tente canadienne couchée sur sa longueur', 'Un triangle'], ['un tuyau bien droit', 'Un disque']],
        (x) => 'Quelle est la forme de la base d’' + x + ' ?', ['Un disque', 'Un rectangle', 'Un triangle'],
        'Cherche les deux faces identiques, en face l’une de l’autre.',
        'La base est la forme qui se répète, tout le long du solide.'),
    ],

    defi: {
      // [rayon en dm, hauteur en dm, prix par litre, litres dans une bouteille]
      versions: [[2, 5, 2, 1], [1, 10, 3, 1], [2, 10, 2, 2], [3, 10, 1, 2]],
      genere(c) {
        const [r, h, p, b] = c.alea.choisir(this.versions);
        const v = r2(3.14 * r * r * h), n = Math.floor(v / b), g = r2(n * b * p);
        return {
          enonce: 'Un marchand d’huile a un bidon cylindrique de ' + r + ' dm de rayon et de ' + h + ' dm de hauteur, plein. Il remplit des bouteilles de ' + b + ' L, qu’il vend à raison de ' + p + ' € le litre. On prendra 3,14 pour π.',
          image: { dessin: 'solide', forme: 'cylindre', r: 2, h: 5, cotes: { r: r + ' dm', h: h + ' dm' }, description: 'Un cylindre debout. Le rayon du fond mesure ' + O.nb(r, 'décimètre') + ', la hauteur ' + h + ' décimètres. Le dessin n’est pas à l’échelle.' },
          questions: [
            {
              texte: 'Question 1. Calculer le volume du bidon, en dm³.',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Aire du disque, fois hauteur.',
              correction: ['3,14 × ' + r + ' × ' + r + ' × ' + h + ' = ' + ecr(v) + ' dm³.'],
            },
            {
              texte: 'Question 2. Combien de bouteilles pleines peut-il remplir ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Un décimètre cube, c’est un litre. Garde seulement les bouteilles pleines.',
              correction: [ecr(v) + ' dm³ = ' + ecr(v) + ' L.', ecr(v) + ' ÷ ' + b + ' donne ' + n + ' bouteilles pleines.'],
            },
            {
              texte: 'Question 3. Combien gagne-t-il en vendant toutes ces bouteilles, en euros ?',
              reponse: { type: 'nombre', valeur: g },
              aide: 'Multiplie le nombre de litres vendus par le prix du litre.',
              correction: [n + ' × ' + b + ' = ' + n * b + ' L vendus.', n * b + ' × ' + p + ' = ' + ecr(g) + ' €.'],
            },
            {
              texte: 'Question 4. Expliquer pourquoi la formule du volume d’un cylindre ressemble à celle d’un pavé droit.',
              correction: ['Dans les deux cas, le solide est une pile de couches identiques.', 'Le volume est l’aire de la base multipliée par la hauteur.'],
              grille: ['As-tu parlé de la base qui reste la même ?', 'As-tu écrit : aire de la base fois hauteur ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le fond, fois la hauteur : bidons, caisses et marmites sont à ta main.',
    carte: ['pave', 'cylindre', 'quelle-base'],
    papierDuSoir: { exercices: ['prisme-triangle', 'en-litres'], defi: true },
    automatismes: [
      {
        id: 'volume-rapide',
        versions: [[2, 3, 4], [5, 2, 3], [4, 5, 2], [3, 3, 2]],
        genere(c) { const [a, b, h] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' × ' + h + ' = ?', reponse: { type: 'nombre', valeur: a * b * h } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Italie, Cavalieri a montré que deux solides aux tranches de même aire ont le même volume.',
    prenoms: ['Aminata', 'Moussa'],
  };
});
