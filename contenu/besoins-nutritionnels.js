/* Notion 10 du bloc SVT « Le corps humain et la santé » : les besoins nutritionnels. Le menu de la semaine de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const GROUPES = ['Les féculents', 'Les fruits et légumes', 'Viande, poisson, œufs', 'Les produits laitiers', 'Les matières grasses'];

  return {
    id: 'besoins-nutritionnels',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Les besoins nutritionnels',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'famille', 'commerce'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : besoins nutritionnels, alimentation équilibrée.',

    accroche: {
      texte: 'Laure, la maman de Rachel, prépare les menus de la semaine pour toute la famille. Son neveu Moussa joue au football tous les soirs, Rachel travaille assise toute la journée. ' +
        'Faut-il leur servir la même quantité ? Et que doit contenir une assiette pour bien nourrir le corps ?',
      image: { dessin: 'barres', barres: [{ nom: 'Moussa, sportif', parts: 6 }, { nom: 'Rachel, assise', parts: 4 }], description: 'Deux barres : Moussa, qui fait du sport, a besoin de plus d’énergie que Rachel, qui reste assise.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: GROUPES, description: 'Les cinq familles d’aliments : féculents, fruits et légumes, viande poisson œufs, produits laitiers, matières grasses.' },
      etapes: [
        'Les aliments apportent l’énergie dont le corps a besoin pour vivre, bouger, grandir. On la mesure en kilojoules.',
        'Ils apportent aussi des matériaux pour construire et réparer le corps, de l’eau, des vitamines et des minéraux.',
        'Les besoins dépendent de l’âge, du sexe et de l’activité : un sportif a besoin de plus d’énergie.',
        'Manger varié, en piochant dans chaque famille d’aliments, c’est manger équilibré.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le corps a des ' + c.mot('besoins') + ' : de l’énergie, et de quoi se construire. Ils sont plus grands quand on est très active. ' +
        'Une alimentation équilibrée pioche chaque jour dans toutes les familles d’aliments, sans excès de sucre, de sel ni de gras. ' +
        'L’astuce : sur l’étiquette, l’énergie est donnée pour cent grammes ; on calcule pour la portion qu’on mange.',
    },

    vocabulaire: {
      termes: {
        besoins: { sesMots: 'besoins de carburant', officiel: 'besoins nutritionnels', lesDeux: 'besoins de carburant, que les scientifiques appellent les besoins nutritionnels' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le corps a des besoins de carburant et de matériaux. Ils changent selon l’âge et l’activité. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : les besoins nutritionnels. Le carburant, c’est l’énergie, mesurée en kilojoules ; manger de tout, en bonne quantité, c’est une alimentation équilibrée.',
        'Tu connais les mots officiels : les besoins nutritionnels dépendent de l’âge, du sexe et de l’activité ; une alimentation équilibrée les couvre.',
      ],
    },

    exercices: [
      {
        id: 'energie-du-repas',
        univers: 'cuisine-restaurant',
        // énergie de trois plats, en kilojoules
        versions: [[1200, 800, 400], [1500, 600, 350], [900, 1100, 500], [1300, 700, 300], [1000, 900, 450], [1600, 500, 250]],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          const t = p.reduce((a, x) => a + x, 0);
          return {
            enonce: 'Au déjeuner, Moussa mange trois plats qui apportent ' + p.join(' kJ, ') + ' kJ. Quelle énergie apporte son repas, en kilojoules ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Additionne les trois nombres.',
            correction: [p.join(' + ') + ' = ' + t + ' kJ.'],
          };
        },
      },
      {
        id: 'portion',
        univers: 'commerce',
        // [énergie pour 100 g, masse de la portion en g]
        versions: [[1500, 50], [1500, 80], [400, 200], [600, 150], [1600, 30], [250, 200]],
        genere(c) {
          const [e, m] = c.alea.choisir(this.versions);
          const t = (e * m) / 100;
          return {
            enonce: 'L’étiquette d’un aliment indique ' + e + ' kJ pour 100 g. Rachel en mange une portion de ' + m + ' g. Quelle énergie, en kilojoules, lui apporte-t-elle ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + e + ' ÷ 100 × ' + m + '.',
            aideParlee: 'Divise l’énergie par cent, puis multiplie par la masse de la portion.',
            correction: [e + ' ÷ 100 = ' + e / 100 + ' kJ par gramme.', e / 100 + ' × ' + m + ' = ' + t + ' kJ.'],
          };
        },
      },
      {
        id: 'reste-a-manger',
        univers: 'famille',
        // [besoin de la journée, déjà mangé] en kilojoules
        versions: [[9000, 6500], [10000, 7200], [11000, 8000], [8500, 5000], [12000, 9500], [9500, 6000]],
        genere(c) {
          const [b, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'Aminata a besoin d’environ ' + b + ' kJ par jour. Avant le dîner, elle en a déjà mangé ' + m + '. Combien de kilojoules environ doit encore lui apporter le dîner ?',
            reponse: { type: 'nombre', valeur: b - m },
            aide: 'Calcule ' + b + ' − ' + m + '.',
            aideParlee: 'Fais la différence entre le besoin de la journée et ce qui est déjà mangé.',
            correction: [b + ' − ' + m + ' = ' + (b - m) + ' kJ.'],
          };
        },
      },
      {
        id: 'quelle-famille',
        univers: 'cuisine-restaurant',
        versions: [['le riz', 'Les féculents'], ['la mangue', 'Les fruits et légumes'], ['le poisson', 'Viande, poisson, œufs'], ['le yaourt', 'Les produits laitiers'], ['l’huile d’arachide', 'Les matières grasses'], ['l’igname', 'Les féculents'], ['le gombo', 'Les fruits et légumes']],
        genere(c) {
          const [aliment, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'À quelle famille d’aliments appartient ' + aliment + ' ?',
            reponse: O.choix(c.alea, bonne, GROUPES.filter((x) => x !== bonne).slice(0, 2)),
            aide: 'Féculents, fruits et légumes, viande poisson œufs, produits laitiers, matières grasses.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'qui-a-plus-besoin',
        univers: 'famille',
        versions: [['une danseuse qui s’entraîne chaque jour', 'une personne assise toute la journée'], ['un joueur de football', 'un joueur d’échecs'], ['une adolescente qui court beaucoup', 'la même adolescente au repos']],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = a.replace(/^./, (x) => x.toUpperCase());
          return {
            enonce: 'Qui a besoin de plus d’énergie : ' + a + ', ou ' + b + ' ?',
            reponse: O.choix(c.alea, bonne, [b.replace(/^./, (x) => x.toUpperCase())]),
            aide: 'Plus on bouge, plus les besoins en énergie sont grands.',
            correction: ['L’activité physique augmente les besoins en énergie.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [énergie du fonio pour 100 g, portion en g, besoin de la journée, déjà mangé hors fonio]
      versions: [[1500, 80, 9000, 6000], [1500, 100, 10000, 7000], [1500, 60, 9500, 6500], [1500, 120, 11000, 8000]],
      genere(c) {
        const [e, m, b, d] = c.alea.choisir(this.versions);
        const f = (e * m) / 100;
        return {
          enonce: 'Laure cuisine du fonio. L’étiquette indique ' + e + ' kJ pour 100 g. Rebecca en mange ' + m + ' g au dîner. Elle a besoin d’environ ' + b + ' kJ par jour, et a déjà mangé ' + d + ' kJ avant le dîner.',
          questions: [
            {
              texte: 'Question 1. Quelle énergie lui apporte sa portion de fonio, en kilojoules ?',
              reponse: { type: 'nombre', valeur: f },
              aide: 'Divise par cent, puis multiplie par la masse de la portion.',
              correction: [e + ' ÷ 100 × ' + m + ' = ' + f + ' kJ.'],
            },
            {
              texte: 'Question 2. Combien de kilojoules a-t-elle mangés dans la journée, avec le fonio ?',
              reponse: { type: 'nombre', valeur: d + f },
              aide: 'Ajoute l’énergie du fonio à ce qu’elle avait déjà mangé.',
              correction: [d + ' + ' + f + ' = ' + (d + f) + ' kJ.'],
            },
            {
              texte: 'Question 3. Ses besoins sont-ils couverts ? Que pourrait-elle ajouter pour un dîner équilibré ?',
              correction: [(d + f >= b ? 'Oui : ' + (d + f) + ' kJ ≥ ' + b + ' kJ.' : 'Pas tout à fait : ' + (d + f) + ' kJ < ' + b + ' kJ.'), 'Pour équilibrer, elle peut ajouter des légumes, un fruit, ou un produit laitier, sans excès de sucre ni de gras.'],
              grille: ['As-tu comparé l’énergie mangée au besoin ?', 'As-tu proposé des aliments d’autres familles ?', 'As-tu fait une phrase de conclusion ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais lire une étiquette, calculer l’énergie d’une portion, et composer une assiette équilibrée.',
    carte: ['energie-du-repas', 'portion', 'quelle-famille'],
    papierDuSoir: { exercices: ['portion', 'reste-a-manger'], defi: true },
    automatismes: [
      {
        id: 'portion-rapide',
        versions: [[1000, 50], [400, 200], [1500, 100], [800, 50]],
        genere(c) { const [e, m] = c.alea.choisir(this.versions); return { enonce: e + ' kJ pour 100 g : combien pour ' + m + ' g ?', reponse: { type: 'nombre', valeur: (e * m) / 100 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le fonio est une céréale cultivée depuis des milliers d’années en Afrique de l’Ouest.',
    prenoms: ['Laure', 'Moussa', 'Rachel', 'Aminata', 'Rebecca'],
  };
});
