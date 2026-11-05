/* Notion 20 du bloc « Mesures, géométrie et espace » : patrons et vues de la pyramide et du cône. La boîte en carton à plier d'Esther.
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
    id: 'patrons-vues',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Patrons et vues',
    classe: '4e',
    univers: ['commerce', 'cuisine-restaurant'],

    accroche: {
      texte: 'Esther veut offrir des boîtes en pyramide. Elle ouvre une boîte du commerce, la déplie à plat. Voilà un carré, et quatre triangles collés à ses côtés. ' +
        'Ce dessin à plat, c’est tout ce qu’il faut pour fabriquer la boîte : on découpe, on plie, on colle.',
      image: { dessin: 'figure', points: { A: [0, 0], B: [4, 0], C: [4, 4], D: [0, 4], E: [2, -3], F: [7, 2], G: [2, 7], H: [-3, 2] }, segments: [['A', 'B', '4 cm'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'E'], ['B', 'E'], ['B', 'F'], ['C', 'F'], ['C', 'G'], ['D', 'G'], ['D', 'H'], ['A', 'H']], description: 'Le patron d’une pyramide à base carrée. Au centre, le carré A B C D de 4 centimètres de côté. Sur chaque côté, un triangle isocèle est collé : quatre triangles en tout, pointes vers l’extérieur.' },
    },

    manipulation: {
      etapes: [
        'Dessine un carré sur du carton : c’est le fond de la boîte.',
        'Sur chaque côté, dessine un triangle, tous les quatre identiques.',
        'Découpe le tour, plie le long des côtés du carré, et relève les quatre triangles. Leurs pointes se rejoignent en haut.',
        'Pour un cône : un disque pour le fond, et un morceau de disque, comme une part de pizza.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le dessin à plat d’un solide, c’est ' + c.mot('patron') + '. Une pyramide à base carrée, c’est un carré et quatre triangles. Un cône, c’est un disque et une part de disque. ' +
        'Regarde le solide de face ou de dessus : tu obtiens ' + c.mot('vue') + '. L’astuce : de dessus, on voit la base ; de face, un cône et une pyramide font un triangle.',
    },

    vocabulaire: {
      termes: {
        patron: { sesMots: 'la boîte dépliée', officiel: 'le patron', lesDeux: 'la boîte dépliée, que l’on appelle le patron' },
        vue: { sesMots: 'une image du solide', officiel: 'une vue', lesDeux: 'une image du solide, que l’on appelle une vue' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la boîte dépliée, et une image du solide. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : le patron, pour la boîte dépliée. Et une image du solide s’appelle une vue.',
        'Tu connais les mots officiels : le patron, et une vue.',
      ],
    },

    exercices: [
      Q('combien-de-faces', 'commerce',
        [['une pyramide à base carrée', '5'], ['une pyramide à base triangulaire', '4'], ['un pavé droit', '6']],
        (x) => 'Combien de faces, base comprise, le patron d’' + x + ' doit-il avoir ?', ['4', '5', '6'],
        'Compte la base, puis les faces qui l’entourent.',
        'Une pyramide a sa base, plus un triangle par côté de la base. Un pavé droit a six faces.'),
      O.qcm('quelle-vue', 'cuisine-restaurant',
        [['un cône, vu de dessus', 'Un disque', 'De dessus, on voit sa base ronde.'], ['un cône, vu de face', 'Un triangle', 'De face, un solide pointu fait un triangle.'], ['une pyramide à base carrée, vue de face', 'Un triangle', 'De face, un solide pointu fait un triangle.'], ['une pyramide à base carrée, vue de dessus', 'Un carré avec ses diagonales', 'De dessus, on voit la base et les arêtes qui montent au sommet.'], ['un cylindre debout, vu de dessus', 'Un disque', 'De dessus, on voit sa base ronde.']],
        (x) => 'Que voit-on pour ' + x + ' ?', ['Un disque', 'Un triangle', 'Un carré avec ses diagonales'],
        'Imagine le solide posé sur la table, et baisse-toi, ou penche-toi au-dessus.'),
      {
        id: 'carton-pyramide',
        univers: 'commerce',
        // [côté du carré, hauteur d'un triangle]
        versions: [[4, 5], [6, 5], [10, 12], [8, 5], [2, 3], [6, 10]],
        genere(c) {
          const [k, h] = c.alea.choisir(this.versions);
          const t = (k * h) / 2, a = k * k + 4 * t;
          return {
            enonce: 'Le patron d’une pyramide est fait d’un carré de ' + k + ' cm de côté et de quatre triangles de base ' + k + ' cm et de hauteur ' + h + ' cm. Quelle est l’aire totale de carton, en cm² ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Calcule l’aire du carré, puis celle d’un triangle multipliée par quatre.',
            correction: ['Carré : ' + k + ' × ' + k + ' = ' + k * k + ' cm².', 'Un triangle : ' + k + ' × ' + h + ' ÷ 2 = ' + t + ' cm².', k * k + ' + 4 × ' + t + ' = ' + a + ' cm².'],
          };
        },
      },
      {
        id: 'perimetre-du-disque',
        univers: 'cuisine-restaurant',
        versions: [[5], [10], [2], [3], [4], [20]],
        genere(c) {
          const [r] = c.alea.choisir(this.versions);
          const p = r2(2 * 3.14 * r);
          return {
            enonce: 'Pour un chapeau de fête en cône, le disque du bas a un rayon de ' + r + ' cm. Le bord de la part de disque doit faire le tour de ce disque. Quelle longueur doit avoir ce bord, en cm ? Prends 3,14 pour π.',
            reponse: { type: 'nombre', valeur: p },
            aide: 'C’est le tour du disque : deux fois le rayon, fois 3,14.',
            aideParlee: 'C’est le tour du disque : deux fois le rayon, fois le nombre pi.',
            correction: ['2 × 3,14 × ' + r + ' = ' + ecr(p) + ' cm.'],
          };
        },
      },
      {
        id: 'aretes-pyramide',
        univers: 'commerce',
        // nombre de côtés de la base
        versions: [[3], [4], [5], [6], [8], [10]],
        genere(c) {
          const [n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une pyramide a une base à ' + n + ' côtés. Combien a-t-elle d’arêtes en tout ?',
            reponse: { type: 'nombre', valeur: 2 * n },
            aide: 'Compte les côtés de la base, puis les arêtes qui montent au sommet.',
            correction: [n + ' côtés de base + ' + n + ' arêtes vers le sommet = ' + 2 * n + ' arêtes.'],
          };
        },
      },
    ],

    defi: {
      // [côté du carré, hauteur des triangles, prix du carton au m² : nombre de boîtes]
      versions: [[10, 12, 20], [20, 15, 10], [10, 6, 50], [20, 20, 25]],
      genere(c) {
        const [k, h, n] = c.alea.choisir(this.versions);
        const t = (k * h) / 2, a = k * k + 4 * t;
        return {
          enonce: 'Esther fabrique ' + n + ' boîtes en forme de pyramide. Le patron d’une boîte est formé d’un carré de ' + k + ' cm de côté et de quatre triangles isocèles identiques, de base ' + k + ' cm et de hauteur ' + h + ' cm.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [4, 0], C: [4, 4], D: [0, 4], E: [2, -3], F: [7, 2], G: [2, 7], H: [-3, 2] }, segments: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'E'], ['B', 'E'], ['B', 'F'], ['C', 'F'], ['C', 'G'], ['D', 'G'], ['D', 'H'], ['A', 'H']], description: 'Le patron : un carré de ' + k + ' centimètres de côté, et sur chaque côté un triangle isocèle de ' + h + ' centimètres de hauteur.' },
          questions: [
            {
              texte: 'Question 1. Calculer l’aire d’un triangle, en cm².',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Base fois hauteur, divisé par deux.',
              correction: [k + ' × ' + h + ' ÷ 2 = ' + t + ' cm².'],
            },
            {
              texte: 'Question 2. Calculer l’aire de carton d’une boîte, en cm².',
              reponse: { type: 'nombre', valeur: a },
              aide: 'Le carré, plus les quatre triangles.',
              correction: [k * k + ' + 4 × ' + t + ' = ' + a + ' cm².'],
            },
            {
              texte: 'Question 3. Quelle aire de carton faut-il pour toutes les boîtes, en m² ?',
              reponse: { type: 'nombre', valeur: (a * n) / 10000 },
              aide: 'Multiplie, puis convertis : un mètre carré, c’est 10 000 centimètres carrés.',
              aideParlee: 'Multiplie, puis convertis : pour une aire, chaque rang vaut cent.',
              correction: [a + ' × ' + n + ' = ' + a * n + ' cm².', a * n + ' cm² = ' + ecr((a * n) / 10000) + ' m².'],
            },
            {
              texte: 'Question 4. Décrire ce que l’on voit quand on regarde la pyramide montée de dessus, puis de face.',
              correction: ['De dessus : un carré, avec ses deux diagonales, qui se croisent au sommet.', 'De face : un triangle isocèle.'],
              grille: ['As-tu décrit la vue de dessus ?', 'As-tu décrit la vue de face ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Découper, plier, coller : ta boîte passe du plat au volume sans erreur.',
    carte: ['combien-de-faces', 'quelle-vue', 'aretes-pyramide'],
    papierDuSoir: { exercices: ['carton-pyramide', 'perimetre-du-disque'], defi: true },
    automatismes: [
      {
        id: 'quatre-fois',
        versions: [[12], [15], [25], [30]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: '4 × ' + a + ' = ?', reponse: { type: 'nombre', valeur: 4 * a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, Monge a imaginé de représenter un solide par ses vues sur deux plans perpendiculaires.',
    prenoms: ['Esther'],
  };
});
