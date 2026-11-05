/* Notion 4 du bloc SVT « Le vivant et son évolution » : la photosynthèse. Le pied de maïs de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ENTRE = 'La feuille l’utilise', SORT = 'La feuille le fabrique';

  return {
    id: 'photosynthese',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'La photosynthèse',
    classe: 'cycle 4',
    univers: ['champetre', 'maison-courses'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : production de matière par les plantes chlorophylliennes à la lumière.',

    accroche: {
      texte: 'Moussa plante un grain de maïs. Trois mois plus tard, le pied est plus grand que lui, et pèse bien plus qu’un grain. Pourtant, la terre autour a à peine diminué. ' +
        'D’où vient toute cette matière ? La réponse flotte dans l’air, et tombe du soleil.',
      image: { dessin: 'chaine', etapes: ['Eau et dioxyde de carbone', 'Lumière, dans une feuille verte', 'Sucre et dioxygène'], description: 'Dans une feuille verte, à la lumière, l’eau et le dioxyde de carbone deviennent du sucre et du dioxygène.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Éclairée', parts: 5 }, { nom: 'Cachée', parts: 0 }], description: 'Deux barres, pour une feuille en partie cachée : la partie éclairée a fabriqué une réserve de sucre, la partie cachée n’en a pas fabriqué.' },
      etapes: [
        'Imagine une feuille du potager. On en cache une partie avec un papier noir, et on la laisse au soleil.',
        'Le soir, on la teste : seule la partie éclairée contient une réserve de sucre, l’amidon.',
        'Donc la feuille a besoin de lumière pour fabriquer sa matière.',
        'Elle prend le dioxyde de carbone de l’air, par de minuscules trous, et l’eau qui monte des racines.',
        'Elle fabrique du sucre, et rejette du dioxygène : celui que tu respires.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une plante verte fabrique elle-même sa nourriture, avec ' + c.mot('chlorophylle') + '. C’est ' + c.mot('photosynthese') + '. ' +
        'Elle utilise l’eau, le dioxyde de carbone et la lumière. Elle produit du sucre et du dioxygène. ' +
        'L’astuce : le maïs est fait d’air et d’eau, cuisinés par le soleil.',
    },

    vocabulaire: {
      termes: {
        chlorophylle: { sesMots: 'le vert des feuilles', officiel: 'la chlorophylle', lesDeux: 'le vert des feuilles, que l’on appelle la chlorophylle' },
        photosynthese: { sesMots: 'la cuisine de la feuille', officiel: 'la photosynthèse', lesDeux: 'la cuisine de la feuille, que les scientifiques appellent la photosynthèse' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le vert des feuilles, et la cuisine de la feuille. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la chlorophylle, pour le vert des feuilles. La cuisine de la feuille s’appelle la photosynthèse.',
        'Tu connais les mots officiels : la photosynthèse, la chlorophylle, et la matière organique, que la plante fabrique.',
      ],
    },

    exercices: [
      O.qcm('utilise-ou-fabrique', 'champetre',
        [['Le dioxyde de carbone', ENTRE], ['Le dioxygène', SORT], ['L’eau', ENTRE], ['Le sucre', SORT]].map((v) => [v[0], v[1], 'La feuille utilise l’eau et le dioxyde de carbone. Avec la lumière, elle fabrique du sucre et rejette du dioxygène.']),
        (x) => x + ' : pendant la photosynthèse, que peut-on dire ?', [ENTRE, SORT],
        'Eau et dioxyde de carbone entrent. Sucre et dioxygène sortent.'),
      O.qcm('ce-qu-il-manque', 'maison-courses',
        [['Une plante est gardée dans un placard noir.', 'La lumière'], ['Une plante n’est plus arrosée depuis des semaines.', 'L’eau'], ['Une plante est mise sous une cloche sans dioxyde de carbone.', 'Le dioxyde de carbone']].map((v) => [v[0], v[1], 'La photosynthèse a besoin de lumière, d’eau et de dioxyde de carbone. Sans l’un d’eux, elle s’arrête.']),
        (x) => x + ' Que lui manque-t-il pour faire sa photosynthèse ?', ['La lumière', 'L’eau', 'Le dioxyde de carbone'],
        'Regarde lequel des trois besoins n’est pas là.'),
      O.qcm('vrai-ou-faux', 'champetre',
        [['Une plante prend presque toute sa matière dans la terre.', 'Faux'], ['La photosynthèse a lieu à la lumière.', 'Vrai'], ['La photosynthèse rejette du dioxygène.', 'Vrai'], ['Une feuille entièrement blanche fait autant de photosynthèse qu’une feuille verte.', 'Faux']].map((v) => [v[0], v[1], 'La plante tire sa matière surtout de l’air et de l’eau, grâce à la lumière et à la chlorophylle, et elle rejette du dioxygène.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Il faut de la lumière et de la chlorophylle. La matière vient surtout de l’air et de l’eau.'),
      {
        id: 'masse-du-mais',
        univers: 'champetre',
        // [g au départ (grain), g de plante à la récolte]
        versions: [[1, 900], [2, 1000], [1, 1200], [2, 800], [1, 700], [1, 1500]],
        genere(c) {
          const [g, p] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le grain de maïs de Moussa pèse ' + g + ' g. Le pied récolté pèse ' + p + ' g. Combien de grammes de matière la plante a-t-elle gagnés ?',
            reponse: { type: 'nombre', valeur: p - g },
            aide: 'Calcule ' + p + ' − ' + g + '.',
            aideParlee: 'Enlève la masse du grain à la masse du pied récolté.',
            correction: [p + ' − ' + g + ' = ' + (p - g) + ' g, gagnés surtout grâce à la photosynthèse.'],
          };
        },
      },
      {
        id: 'bulles',
        univers: 'maison-courses',
        // [bulles de dioxygène par minute, minutes]
        versions: [[12, 5], [15, 4], [20, 3], [8, 10], [25, 4], [30, 5]],
        genere(c) {
          const [b, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une plante d’eau, en pleine lumière, produit ' + b + ' bulles de dioxygène par minute. Combien de bulles produit-elle en ' + m + ' minutes ?',
            reponse: { type: 'nombre', valeur: b * m },
            aide: 'Calcule ' + b + ' × ' + m + '.',
            aideParlee: 'Multiplie les bulles d’une minute par le nombre de minutes.',
            correction: [b + ' × ' + m + ' = ' + b * m + ' bulles.'],
          };
        },
      },
    ],

    defi: {
      // [bulles par minute près de la lampe, loin, dans le noir]
      versions: [[30, 10, 0], [40, 20, 0], [24, 8, 0], [36, 12, 0]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Expérience : on place une plante d’eau à trois endroits, et on compte les bulles de gaz par minute. Près d’une lampe, on en compte ' + a + '. Loin de la lampe, ' + b + '. Dans le noir, aucune.',
          image: { dessin: 'barres', barres: [{ nom: 'Près', parts: a / 2 }, { nom: 'Loin', parts: b / 2 }, { nom: 'Noir', parts: 0 }], description: 'Trois barres : beaucoup de bulles près de la lampe, moins loin de la lampe, aucune dans le noir. Chaque part vaut deux bulles.' },
          questions: [
            {
              texte: 'Question 1. Combien de fois plus de bulles compte-t-on près de la lampe que loin d’elle ?',
              reponse: { type: 'nombre', valeur: a / b },
              aide: 'Divise le nombre de bulles près de la lampe par celui de loin.',
              correction: [a + ' ÷ ' + b + ' = ' + a / b + ' fois plus.'],
            },
            {
              texte: 'Question 2. Quel gaz forme ces bulles ?',
              reponse: O.choix(c.alea, 'Le dioxygène', ['Le dioxygène', 'Le dioxyde de carbone', 'La vapeur d’eau']),
              aide: 'C’est le gaz rejeté par la photosynthèse.',
              correction: ['La photosynthèse rejette du dioxygène.', 'Réponse : Le dioxygène.'],
            },
            {
              texte: 'Question 3. Que montre cette expérience ? Rédige une phrase de conclusion.',
              correction: ['Plus la plante reçoit de lumière, plus elle produit de dioxygène.', 'Sans lumière, il n’y a pas de photosynthèse : la lumière est indispensable.'],
              grille: ['As-tu relié la quantité de lumière à la quantité de bulles ?', 'As-tu dit que, sans lumière, il n’y a pas de photosynthèse ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Eau, air, lumière : tu sais comment une feuille cuisine la matière dont le monde se nourrit.',
    carte: ['utilise-ou-fabrique', 'ce-qu-il-manque', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['masse-du-mais', 'bulles'], defi: true },
    automatismes: [
      {
        id: 'entre-ou-sort-rapide',
        versions: [['l’eau', ENTRE], ['le dioxygène', SORT]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Photosynthèse et ' + d + ' ?', reponse: O.choix(c.alea, b, [ENTRE, SORT]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En République du Congo et dans cinq autres pays, la grande forêt absorbe le dioxyde de carbone de l’air.',
    prenoms: ['Moussa'],
  };
});
