/* Notion 3 du bloc de technologie « Comment un objet fonctionne » : forme, matériau et procédé. La casserole de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const eu = (x) => ecr(x) + ' euro' + (x >= 2 ? 's' : '');
  const arr = (x) => Math.round(x * 100) / 100;
  /** Question à choix : versions [[situation, bonne réponse, [deux pièges faux], explication]]. */
  const Q = (id, univers, versions, enonce, aide) => ({
    id, univers, versions,
    genere(c) {
      const [x, bonne, autres, pourquoi] = c.alea.choisir(this.versions);
      return { enonce: enonce(x), reponse: O.choix(c.alea, bonne, autres), aide, correction: [pourquoi, 'Réponse : ' + bonne + '.'] };
    },
  });

  return {
    id: 'forme-materiau-procede',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Forme, matériau et procédé',
    classe: '4e',
    univers: ['cuisine-restaurant', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : relier forme, matériau et procédé de fabrication (moulage, pliage, découpe).',

    accroche: {
      texte: 'Rachel regarde la casserole de Laure. Le corps est en métal brillant. Le manche est en plastique noir. ' +
        'Pourquoi pas tout en métal, ou tout en plastique ? Chaque partie a sa forme, sa matière, et sa façon d’être fabriquée.',
      image: { dessin: 'chaine', etapes: ['Le corps : métal, embouti', 'Le manche : plastique, moulé'], description: 'La casserole de Laure : le corps est en métal, enfoncé en creux par une presse (embouti) ; le manche est en plastique, fabriqué dans un moule.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Le rôle de la pièce', 'Le matériau qui convient', 'Le procédé qui donne la forme'], description: 'Trois étapes : le rôle de la pièce, puis le matériau qui convient, puis le procédé qui donne la forme.' },
      etapes: [
        'Le manche doit garder la chaleur loin de la main : il est en plastique, qui laisse mal passer la chaleur.',
        'Le corps doit chauffer vite : il est en métal, qui laisse bien passer la chaleur.',
        'Pour la casserole, une plaque de métal se découpe en rond, puis une presse l’enfonce en creux : on dit qu’elle est emboutie. Pour une boîte, on plie la plaque.',
        'Le plastique fondu est injecté dans un moule creux : une machine le pousse dedans. En refroidissant, il garde la forme du moule.',
        'Chaque matériau se travaille avec certaines méthodes : on moule le plastique fondu, on emboutit ou on plie la plaque de métal.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde la casserole : sa forme est un creux avec un manche. ' +
        'Regarde le métal de la casserole : c’est ' + c.mot('materiau') + '. ' +
        'Regarde comment le manche a été moulé : c’est ' + c.mot('procede') + '. ' +
        'L’astuce : la forme, la matière et la façon de fabriquer vont ensemble, d’après le rôle de la pièce.',
    },

    vocabulaire: {
      termes: {
        materiau: { sesMots: 'la matière dont la pièce est faite', officiel: 'le matériau', lesDeux: 'la matière dont la pièce est faite. Les techniciens disent : le matériau' },
        procede: { sesMots: 'la façon de fabriquer la pièce', officiel: 'le procédé de fabrication', lesDeux: 'la façon de fabriquer la pièce. Les techniciens disent : le procédé de fabrication' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la matière dont la pièce est faite, et la façon de la fabriquer. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : le matériau, pour la matière de la pièce. Le procédé de fabrication, pour la façon de la fabriquer.',
        'Tu connais les mots officiels : le matériau, le procédé de fabrication, et la forme de la pièce.',
      ],
    },

    exercices: [
      O.qcm('quel-procede', 'cuisine-restaurant',
        [
          ['une poignée en plastique fondu, injecté dans un moule creux', 'Le moulage', 'Le plastique fondu prend la forme du creux.'],
          ['les bords relevés d’une plaque de métal', 'Le pliage', 'Relever un bord, c’est plier la plaque.'],
          ['un rond de métal sorti d’une grande plaque', 'La découpe', 'On enlève le rond de la plaque en la coupant.'],
          ['une boîte en plastique dont la forme vient d’un moule', 'Le moulage', 'La forme de la boîte est celle du moule.'],
          ['une équerre faite d’une bande de métal coudée', 'Le pliage', 'La bande est coudée : on l’a pliée.'],
        ],
        (x) => 'Quel procédé de fabrication a servi pour ' + x + ' ?',
        ['Le moulage', 'Le pliage', 'La découpe'],
        'Demande-toi si on a injecté dans un moule, plié ou coupé.'),
      Q('quel-materiau', 'appareils',
        [
          ['le fond d’une casserole, qui doit chauffer l’eau vite', 'Du métal', ['Du plastique', 'Du caoutchouc'], 'Le métal laisse bien passer la chaleur.'],
          ['la poignée d’une casserole, qui ne doit pas brûler la main', 'Du plastique', ['Du métal', 'De l’acier'], 'Le plastique laisse mal passer la chaleur.'],
          ['la gaine d’un fil électrique, qui ne doit pas laisser passer le courant', 'Du plastique', ['Du cuivre', 'De l’acier'], 'Le plastique ne laisse pas passer le courant.'],
          ['le fil électrique lui-même, qui doit laisser passer le courant', 'Du cuivre', ['Du plastique', 'Du bois'], 'Le cuivre laisse bien passer le courant.'],
          ['le manche d’un tournevis, qui isole la main et se tient bien', 'Du plastique', ['Du cuivre', 'De l’acier'], 'Le plastique isole la main et se moule en forme de poignée.'],
        ],
        (x) => 'Quel matériau convient pour ' + x + ' ?',
        'Cherche le rôle de la pièce, puis la matière qui le remplit bien.'),
      {
        id: 'decoupe-rondelles',
        univers: 'appareils',
        // [longueur de la plaque en cm, largeur d'une rondelle en cm]
        versions: [[60, 5], [90, 6], [48, 4], [100, 5], [72, 8]],
        genere(c) {
          const [l, r] = c.alea.choisir(this.versions);
          const n = l / r;
          return {
            enonce: 'Une plaque de métal mesure ' + l + ' cm de long. On y découpe, côte à côte, des rondelles de ' + r + ' cm de large. Combien de rondelles tiennent dans une rangée ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Divise la longueur de la plaque par la largeur d’une rondelle.',
            correction: [l + ' ÷ ' + r + ' = ' + n + ' rondelles.'],
          };
        },
      },
      {
        id: 'bande-rectangle',
        univers: 'cuisine-restaurant',
        // [longueur du rectangle en cm, largeur en cm]
        versions: [[20, 10], [15, 5], [30, 20], [12, 8], [25, 15]],
        genere(c) {
          const [l, w] = c.alea.choisir(this.versions);
          const p = 2 * (l + w);
          return {
            enonce: 'On plie une bande de métal pour former le tour d’une boîte rectangulaire de ' + l + ' cm sur ' + w + ' cm. On ne compte pas le recouvrement. Quelle longueur de bande faut-il, en centimètres ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'La bande fait le tour du rectangle : calcule son périmètre.',
            correction: ['2 × (' + l + ' + ' + w + ') = 2 × ' + (l + w) + ' = ' + p + ' cm.'],
          };
        },
      },
      {
        id: 'cout-du-moule',
        univers: 'appareils',
        // [prix du moule en euros, plastique par pièce en euros, nombre de pièces]
        versions: [[200, 0.5, 1000], [150, 0.25, 400], [300, 0.2, 500], [120, 0.1, 1000], [500, 0.4, 2000], [60, 0.5, 200]],
        genere(c) {
          const [m, p, n] = c.alea.choisir(this.versions);
          const plastique = arr(p * n), total = arr(m + plastique);
          return {
            enonce: 'Un moule coûte ' + eu(m) + '. Chaque pièce moulée demande ' + eu(p) + ' de plastique. Quel est le coût total pour ' + n + ' pièces, en euros ?',
            reponse: { type: 'nombre', valeur: total },
            aide: 'Calcule d’abord le plastique de toutes les pièces, puis ajoute le moule.',
            correction: [n + ' × ' + ecr(p) + ' = ' + ecr(plastique) + ' euros de plastique.', m + ' + ' + ecr(plastique) + ' = ' + ecr(total) + ' ' + (total >= 2 ? 'euros' : 'euro') + '.'],
          };
        },
      },
    ],

    defi: {
      // [prix du moule, plastique par couvercle, nombre de couvercles, longueur du rectangle, largeur, bande disponible en cm]
      versions: [[100, 0.5, 200, 15, 5, 50], [150, 0.25, 400, 12, 8, 36], [80, 0.2, 500, 20, 10, 60], [200, 0.4, 1000, 25, 15, 70]],
      genere(c) {
        const [m, p, n, l, w, b] = c.alea.choisir(this.versions);
        const total = arr(m + p * n), bande = 2 * (l + w);
        const bonne = bande <= b ? 'Oui' : 'Non';
        return {
          enonce: 'Esther fabrique des boîtes à épices. Chaque couvercle est en plastique moulé : le moule coûte ' + eu(m) + ' et chaque couvercle demande ' + eu(p) + ' de plastique. ' +
            'Elle veut ' + n + ' couvercles. Le corps d’une boîte est une bande de métal pliée en rectangle de ' + l + ' cm sur ' + w + ' cm, sans recouvrement. Pour le corps d’une boîte, Esther a une bande de ' + b + ' cm.',
          image: { dessin: 'chaine', etapes: ['Couvercle : plastique, moulage', 'Corps : métal, pliage'], description: 'Une boîte à épices : le couvercle est en plastique fabriqué dans un moule, le corps est une bande de métal pliée en rectangle de ' + l + ' centimètres sur ' + w + ' centimètres.' },
          questions: [
            {
              texte: 'Question 1. Quel est le coût total des couvercles, moule compris, en euros ?',
              reponse: { type: 'nombre', valeur: total },
              aide: 'Calcule le plastique de tous les couvercles, puis ajoute le moule.',
              correction: [n + ' × ' + ecr(p) + ' = ' + ecr(arr(p * n)) + ' euros.', m + ' + ' + ecr(arr(p * n)) + ' = ' + ecr(total) + ' euros.'],
            },
            {
              texte: 'Question 2. Quelle longueur de bande faut-il pour le corps, en centimètres ?',
              reponse: { type: 'nombre', valeur: bande },
              aide: 'La bande fait le tour du rectangle : calcule son périmètre.',
              correction: ['2 × (' + l + ' + ' + w + ') = 2 × ' + (l + w) + ' = ' + bande + ' cm.'],
            },
            {
              texte: 'Question 3. La bande suffit-elle pour une boîte ?',
              reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
              aide: 'Compare la longueur de la bande à la longueur nécessaire.',
              correction: ['Il faut ' + bande + ' cm, et la bande fait ' + b + ' cm.', 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Pourquoi le couvercle est-il en plastique moulé, et le corps en métal plié ? Explique.',
              correction: ['Le plastique fondu prend vite la forme d’un moule, pour beaucoup de couvercles identiques.', 'Le métal se découpe et se plie en bande : il donne un corps solide.'],
              grille: ['As-tu relié le plastique au moulage ?', 'As-tu relié le métal au pliage ?', 'As-tu expliqué pourquoi chaque matériau convient à sa pièce ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! La forme, la matière et la façon de fabriquer vont ensemble : tu lis une casserole comme un technicien.',
    carte: ['quel-procede', 'quel-materiau', 'bande-rectangle'],
    papierDuSoir: { exercices: ['decoupe-rondelles', 'cout-du-moule'], defi: true },
    automatismes: [
      {
        id: 'rondelles-rapide',
        // [longueur, largeur d'une pièce]
        versions: [[60, 5], [48, 4], [72, 8], [90, 6]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, à Nairobi, l’entreprise Gjenge Makers chauffe du plastique broyé avec du sable, puis le moule en pavés.',
    prenoms: ['Rachel', 'Laure', 'Esther'],
  };
});
