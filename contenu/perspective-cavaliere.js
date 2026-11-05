/* Notion 19 du bloc « Mesures, géométrie et espace » : la perspective cavalière. Dessiner la boîte de Rachel sur une feuille plate.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'perspective-cavaliere',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'La perspective cavalière',
    classe: '4e',
    univers: ['commerce', 'appareils'],

    accroche: {
      texte: 'Rachel veut dessiner une boîte en carton. Mais la feuille est plate, et la boîte ne l’est pas. Comment faire comprendre la profondeur ? ' +
        'On triche, avec des règles que tout le monde connaît : la face de devant reste vraie, le reste penche, et se raccourcit.',
      image: { dessin: 'solide', forme: 'pave', l: 4, p: 6, h: 3, cotes: { l: '4 cm', p: '6 cm', h: '3 cm' }, description: 'Une boîte en pavé droit. La face de devant mesure 4 centimètres sur 3, en vraie grandeur. Les arêtes qui fuient mesurent 6 centimètres, mais sont dessinées à moitié, soit 3 centimètres, penchées à 45 degrés. Les trois arêtes cachées sont en pointillés.' },
    },

    manipulation: {
      type: 'solide',
      l: 4,
      p: 6,
      h: 3,
      cible: 6,
      consigne: 'Fais tourner la boîte d’un quart de tour, et lis ce qui est écrit à l’écran. Arrête-toi quand la grande face est devant, puis valide.',
    },

    decouverte: {
      texte: (c) => 'Voici ' + c.mot('cavaliere') + ' : la face de devant garde sa vraie forme et ses vraies mesures. Les lignes penchées sont ' + c.mot('fuyantes') + ' : on les raccourcit. ' +
        'L’astuce : ce qui est caché se dessine en pointillés, et les droites parallèles restent parallèles.',
    },

    vocabulaire: {
      termes: {
        cavaliere: { sesMots: 'le dessin qui triche', officiel: 'la perspective cavalière', lesDeux: 'le dessin qui triche, que l’on appelle la perspective cavalière' },
        fuyantes: { sesMots: 'des arêtes qui partent vers le fond', officiel: 'des arêtes fuyantes', lesDeux: 'des arêtes qui partent vers le fond, donc des arêtes fuyantes' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le dessin qui triche, et les arêtes qui partent vers le fond. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la perspective cavalière, pour le dessin qui triche. Et les arêtes qui partent vers le fond sont fuyantes.',
        'Tu connais les mots officiels : la perspective cavalière, et les arêtes fuyantes.',
      ],
    },

    exercices: [
      {
        id: 'longueur-dessinee',
        univers: 'commerce',
        versions: [[6], [8], [10], [5], [4], [12]],
        genere(c) {
          const [p] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une boîte a une profondeur de ' + p + ' cm. On la dessine en perspective cavalière, en réduisant les fuyantes de moitié. Quelle est la longueur dessinée, en cm ?',
            reponse: { type: 'nombre', valeur: p / 2 },
            aide: 'Divise par deux.',
            correction: [p + ' ÷ 2 = ' + ecr(p / 2) + ' cm.'],
          };
        },
      },
      {
        id: 'longueur-reelle',
        univers: 'appareils',
        versions: [[3], [4], [2.5], [1.5], [5], [6]],
        genere(c) {
          const [d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur un dessin en perspective cavalière, une fuyante mesure ' + ecr(d) + ' cm. Elle est réduite de moitié. Quelle est sa vraie longueur, en cm ?',
            reponse: { type: 'nombre', valeur: d * 2 },
            aide: 'Le vrai côté est deux fois plus long que le dessin.',
            correction: [ecr(d) + ' × 2 = ' + d * 2 + ' cm.'],
          };
        },
      },
      {
        id: 'face-de-devant',
        univers: 'commerce',
        // [l, h, p]
        versions: [[4, 3, 6], [5, 2, 8], [6, 4, 10], [3, 3, 5], [7, 2, 4], [8, 5, 6]],
        genere(c) {
          const [l, h, p] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une boîte mesure ' + l + ' cm de large, ' + h + ' cm de haut et ' + p + ' cm de profondeur. On place sa face ' + l + ' sur ' + h + ' devant. Quelle est l’aire de cette face sur le dessin, en cm² ?',
            reponse: { type: 'nombre', valeur: l * h },
            aide: 'La face de devant garde ses vraies mesures.',
            correction: [l + ' × ' + h + ' = ' + l * h + ' cm².'],
          };
        },
      },
      Q('aretes-cachees', 'appareils',
        [['un pavé droit vu de trois quarts, trois faces visibles', '3'], ['une pyramide à base carrée, sommet en haut, vue de trois quarts', '3']],
        (x) => 'Combien d’arêtes dessine-t-on en pointillés pour ' + x + ' ?', ['1', '3', '5'],
        'Imagine le coin caché, ou les arêtes de derrière.',
        'Trois arêtes partent du coin caché du pavé. Pour la pyramide, ce sont deux arêtes de la base et une arête vers le sommet.'),
      Q('vrai-ou-faux', 'commerce',
        [['La face de devant garde ses vraies mesures.', 'Vrai'], ['Les arêtes cachées sont dessinées en pointillés.', 'Vrai'], ['Deux arêtes parallèles restent parallèles sur le dessin.', 'Vrai'], ['Toutes les arêtes sont dessinées à leur vraie longueur.', 'Faux'], ['Les angles droits restent droits sur toutes les faces.', 'Faux']],
        (x) => 'En perspective cavalière : « ' + x + ' » Vrai ou faux ?', ['Vrai', 'Faux'],
        'Pense à la face de devant, puis aux faces qui partent vers le fond.',
        'Seule la face de devant, et celle de derrière, gardent leur vraie forme. Sur les autres, les angles droits sont déformés, mais les parallèles le restent.'),
    ],

    defi: {
      // [l, h, p]
      versions: [[6, 4, 8], [5, 3, 6], [8, 5, 4], [4, 4, 10]],
      genere(c) {
        const [l, h, p] = c.alea.choisir(this.versions);
        return {
          enonce: 'On veut représenter en perspective cavalière un pavé droit ABCDEFGH de longueur AB = ' + l + ' cm, de hauteur AE = ' + h + ' cm et de profondeur AD = ' + p + ' cm. La face ABFE est placée devant, et les fuyantes sont réduites de moitié.',
          image: { dessin: 'solide', forme: 'pave', l, p, h, cotes: { l: l + ' cm', p: p + ' cm', h: h + ' cm' }, description: 'Un pavé droit. La face de devant A B F E mesure ' + l + ' centimètres sur ' + h + '. La profondeur réelle est de ' + p + ' centimètres.' },
          questions: [
            {
              texte: 'Question 1. Quelle longueur dessine-t-on pour le segment [AD], en cm ?',
              reponse: { type: 'nombre', valeur: p / 2 },
              aide: '[AD] part vers le fond.',
              correction: [p + ' ÷ 2 = ' + ecr(p / 2) + ' cm.'],
            },
            {
              texte: 'Question 2. Quelle longueur dessine-t-on pour le segment [AB], en cm ?',
              reponse: { type: 'nombre', valeur: l },
              aide: '[AB] est sur la face de devant.',
              correction: ['[AB] garde sa vraie longueur : ' + l + ' cm.'],
            },
            {
              texte: 'Question 3. Calculer le volume réel du pavé, en cm³.',
              reponse: { type: 'nombre', valeur: l * h * p },
              aide: 'Pour le volume, on prend les vraies longueurs, pas celles du dessin.',
              correction: [l + ' × ' + p + ' × ' + h + ' = ' + l * h * p + ' cm³.'],
            },
            {
              texte: 'Question 4. Expliquer comment dessiner ce pavé, étape par étape. Tu peux le tracer sur ta feuille.',
              correction: ['On trace la face de devant en vraie grandeur.', 'On trace depuis les sommets les fuyantes parallèles, penchées, de ' + ecr(p / 2) + ' cm.', 'On relie les bouts, avec des pointillés pour les arêtes cachées.'],
              grille: ['As-tu commencé par la face de devant, en vraie grandeur ?', 'As-tu réduit les fuyantes de moitié ?', 'As-tu mis les arêtes cachées en pointillés ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Sur ta feuille plate, ta boîte a maintenant de la profondeur.',
    carte: ['longueur-dessinee', 'vrai-ou-faux', 'aretes-cachees'],
    papierDuSoir: { exercices: ['longueur-dessinee', 'longueur-reelle'], defi: true },
    automatismes: [
      {
        id: 'moitie',
        versions: [[12], [7], [5], [9]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: 'La moitié de ' + a + ' = ?', reponse: { type: 'nombre', valeur: a / 2 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Allemagne, Dürer a publié en 1525 un livre de géométrie qui contient une introduction à la perspective.',
    prenoms: ['Rachel'],
  };
});
