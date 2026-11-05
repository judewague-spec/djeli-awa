/* Notion 33 du bloc « Mesures, géométrie et espace » : les sections planes de solides. La tranche de fromage, d'orange ou de pain de manioc d'Aminata.
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
    id: 'sections-planes',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Sections de solides',
    classe: '3e',
    univers: ['cuisine-restaurant', 'commerce'],

    accroche: {
      texte: 'Aminata coupe un pain de manioc. En rondelles, ce sont des disques, tous pareils. Puis elle le coupe dans la longueur : un rectangle. Elle tranche une orange : encore un disque, mais plus ou moins grand selon l’endroit. ' +
        'Le couteau révèle la forme cachée à l’intérieur.',
      image: { dessin: 'solide', forme: 'cylindre', r: 2, h: 5, coupe: { plan: 'horizontal', t: 0.6 }, description: 'Un cylindre debout, coupé à l’horizontale. La tranche, en trait épais, est un disque de même rayon que la base.' },
    },

    manipulation: {
      type: 'coupes',
      coupes: [['pave', 'horizontal'], ['cylindre', 'horizontal'], ['cylindre', 'vertical'], ['pyramide', 'horizontal'], ['cone', 'horizontal'], ['boule', 'horizontal']],
      consigne: 'Le couteau passe dans le solide. Pour chaque tranche, choisis sa forme. Si tu hésites, imagine la tranche dans ta main.',
    },

    decouverte: {
      texte: (c) => 'La forme que laisse le couteau, c’est ' + c.mot('section') + '. Un cylindre coupé parallèlement à sa base donne un disque, et parallèlement à son axe, un rectangle. Une boule coupée donne toujours un disque. ' +
        'L’astuce : une pyramide ou un cône coupés parallèlement à la base donnent ' + c.mot('reduction') + ' de la base.',
    },

    vocabulaire: {
      termes: {
        section: { sesMots: 'la tranche', officiel: 'la section plane', lesDeux: 'la tranche, que l’on appelle la section plane' },
        reduction: { sesMots: 'une petite copie', officiel: 'une réduction', lesDeux: 'une petite copie, ou une réduction,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la tranche, et une petite copie. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la section plane, pour la tranche. Et une petite copie s’appelle une réduction.',
        'Tu connais les mots officiels : la section plane, et une réduction.',
      ],
    },

    exercices: [
      Q('quelle-forme', 'cuisine-restaurant',
        [['un cylindre, parallèlement à sa base', 'Un disque'], ['un cylindre, parallèlement à son axe', 'Un rectangle'], ['un pavé droit, parallèlement à une face', 'Un rectangle'], ['une boule, par un plan', 'Un disque'], ['une pyramide à base carrée, parallèlement à sa base', 'Un carré'], ['un cône, parallèlement à sa base', 'Un disque']],
        (x) => 'On coupe ' + x + '. Quelle est la forme de la section ?', ['Un disque', 'Un rectangle', 'Un carré'],
        'Imagine la tranche dans ta main.',
        'Parallèle à la base : une copie de la base. Le long de l’axe du cylindre : un rectangle. La boule : toujours un disque.'),
      {
        id: 'rayon-coupe-boule',
        univers: 'cuisine-restaurant',
        // [rayon de la boule, distance du centre au plan] : un triangle rectangle à valeurs entières
        versions: [[5, 3], [5, 4], [10, 6], [10, 8], [13, 5], [13, 12]],
        genere(c) {
          const [R, d] = c.alea.choisir(this.versions);
          const r = Math.sqrt(R * R - d * d);
          return {
            enonce: 'Une boule a un rayon de ' + R + ' cm. On la coupe par un plan situé à ' + d + ' cm du centre. Quel est le rayon du disque obtenu, en cm ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Le centre, le centre du disque et un point du bord forment un triangle rectangle. Utilise le théorème de Pythagore.',
            correction: [R + '² − ' + d + '² = ' + (R * R - d * d) + '.', '√' + (R * R - d * d) + ' = ' + r + ' cm.'],
          };
        },
      },
      {
        id: 'reduction-pyramide',
        univers: 'commerce',
        // [côté de la base, hauteur, hauteur coupée depuis le sommet]
        versions: [[6, 9, 3], [8, 12, 6], [10, 10, 5], [12, 8, 2], [9, 12, 4], [15, 10, 2]],
        genere(c) {
          const [k, h, s] = c.alea.choisir(this.versions);
          const t = (k * s) / h;
          return {
            enonce: 'Une pyramide a une base carrée de ' + k + ' cm de côté, et une hauteur de ' + h + ' cm. On la coupe parallèlement à la base, à ' + s + ' cm du sommet. Quel est le côté du carré obtenu, en cm ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'C’est une réduction de rapport : la hauteur coupée divisée par la hauteur totale.',
            correction: ['Rapport : ' + s + ' ÷ ' + h + '.', k + ' × ' + s + ' ÷ ' + h + ' = ' + ecr(t) + ' cm.'],
          };
        },
      },
      {
        id: 'aire-section-cylindre',
        univers: 'cuisine-restaurant',
        versions: [[5], [10], [2], [3], [4], [20]],
        genere(c) {
          const [r] = c.alea.choisir(this.versions);
          const a = r2(3.14 * r * r);
          return {
            enonce: 'Un pain cylindrique a un rayon de ' + r + ' cm. Quelle est l’aire d’une rondelle, en cm² ? Prends 3,14 pour π.',
            reponse: { type: 'nombre', valeur: a },
            aide: 'La rondelle est un disque de même rayon. Rayon fois rayon, fois 3,14.',
            aideParlee: 'La rondelle est un disque de même rayon. Rayon fois rayon, fois le nombre pi.',
            correction: ['3,14 × ' + r + ' × ' + r + ' = ' + ecr(a) + ' cm².'],
          };
        },
      },
      {
        id: 'section-dans-longueur',
        univers: 'commerce',
        // [rayon, longueur] : coupe passant par l'axe
        versions: [[5, 20], [4, 15], [3, 25], [2, 10], [6, 30], [10, 40]],
        genere(c) {
          const [r, l] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un pain cylindrique a un rayon de ' + r + ' cm et une longueur de ' + l + ' cm. On le coupe dans la longueur, en passant par son axe. Quelle est l’aire de la coupe, en cm² ?',
            reponse: { type: 'nombre', valeur: 2 * r * l },
            aide: 'C’est un rectangle : son petit côté est le diamètre, et son grand côté la longueur.',
            correction: ['Diamètre : 2 × ' + r + ' = ' + 2 * r + ' cm.', 2 * r + ' × ' + l + ' = ' + 2 * r * l + ' cm².'],
          };
        },
      },
    ],

    defi: {
      // [R, d]
      versions: [[5, 3], [5, 4], [10, 6], [10, 8]],
      genere(c) {
        const [R, d] = c.alea.choisir(this.versions);
        const r = Math.sqrt(R * R - d * d), a = r2(3.14 * r * r);
        return {
          enonce: 'Un fruit rond est assimilé à une boule de centre O et de rayon ' + R + ' cm. On la coupe par un plan à ' + d + ' cm de O. La tranche est un disque de centre H, et M est un point du bord du disque. Le triangle OHM est rectangle en H. On prendra 3,14 pour π.',
          image: { dessin: 'figure', points: { O: [0, 0], H: [0, 3], M: [4, 3] }, segments: [['O', 'H'], ['H', 'M'], ['O', 'M']], droits: [['O', 'H', 'M']], cercles: [['O', 5]], description: 'Un cercle de centre O, vu de côté, pour la boule. H est au-dessus de O. M est sur le cercle. O H mesure ' + d + ' centimètres, O M mesure ' + R + ' centimètres. Le triangle O H M est rectangle en H.' },
          questions: [
            {
              texte: 'Question 1. Combien mesure OM, en cm ?',
              reponse: { type: 'nombre', valeur: R },
              aide: 'M est sur la boule.',
              correction: ['OM est un rayon de la boule : ' + R + ' cm.'],
            },
            {
              texte: 'Question 2. Calculer le rayon HM de la tranche, en cm.',
              reponse: { type: 'nombre', valeur: r },
              aide: 'Utilise le théorème de Pythagore dans le triangle OHM.',
              correction: ['HM² = ' + R * R + ' − ' + d * d + ' = ' + (R * R - d * d) + '.', 'HM = ' + r + ' cm.'],
            },
            {
              texte: 'Question 3. Calculer l’aire de la tranche, en cm².',
              reponse: { type: 'nombre', valeur: a },
              aide: 'Rayon fois rayon, fois 3,14.',
              aideParlee: 'Rayon fois rayon, fois le nombre pi.',
              correction: ['3,14 × ' + r + ' × ' + r + ' = ' + ecr(a) + ' cm².'],
            },
            {
              texte: 'Question 4. Où faut-il couper pour obtenir la plus grande tranche possible ? Justifier.',
              correction: ['Il faut couper par le centre de la boule.', 'Alors la distance au centre vaut 0, et le rayon de la tranche est celui de la boule : c’est le plus grand possible.'],
              grille: ['As-tu répondu : par le centre ?', 'As-tu expliqué avec la distance au centre, ou avec le théorème de Pythagore ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un coup de couteau, et tu sais déjà quelle forme tu vas voir.',
    carte: ['quelle-forme', 'aire-section-cylindre', 'rayon-coupe-boule'],
    papierDuSoir: { exercices: ['rayon-coupe-boule', 'reduction-pyramide'], defi: true },
    automatismes: [
      {
        id: 'difference-de-carres',
        versions: [[5, 3], [5, 4], [10, 6], [10, 8]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + '² − ' + b + '² = ?', reponse: { type: 'nombre', valeur: a * a - b * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Apollonios, né à Perga, en Turquie actuelle, a étudié les courbes obtenues en coupant un cône par un plan.',
    prenoms: ['Aminata'],
  };
});
