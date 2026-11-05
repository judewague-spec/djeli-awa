/* Notion 2 du bloc de technologie « Comment un objet fonctionne » : identifier les flux d’énergie, de matière et d’information. La cafetière de Rebecca.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const SORTES = ['De l’énergie', 'De la matière', 'De l’information'];
  const SENS = ['Une entrée', 'Une sortie'];
  const ENTREES = ['Des tranches de pain', 'De l’eau et du café moulu', 'Du courant électrique', 'De l’air', 'Du papier'];
  const ELEMENTS = [
    ['le courant venu de la prise', 'De l’énergie'],
    ['l’air de la pièce aspiré par l’appareil', 'De la matière'],
    ['la position choisie sur le bouton de vitesse', 'De l’information'],
    ['l’air chaud qui sort de l’appareil', 'De la matière'],
  ];

  return {
    id: 'flux-energie-objet',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Identifier les flux',
    classe: '4e',
    univers: ['cuisine-restaurant', 'appareils', 'coiffure'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : flux d’énergie, de matière et d’information dans un objet.',

    accroche: {
      texte: 'Rebecca apporte sa cafetière à l’atelier. Elle ne chauffe plus. ' +
        'Moussa regarde ce qui entre et ce qui sort. Du courant entre. De l’eau et du café moulu entrent. Du café chaud sort. Un voyant s’allume.',
      image: { dessin: 'chaine', etapes: ['Entrent : courant, eau, café moulu', 'La cafetière travaille', 'Sortent : café chaud, vapeur, lumière du voyant'], description: 'La cafetière de Rebecca : le courant, l’eau et le café moulu entrent ; la cafetière travaille ; le café chaud, la vapeur et la lumière du voyant sortent.' },
    },

    manipulation: {
      etapes: [
        'Regarde la cafetière de Rebecca. Qu’est-ce qui entre dedans ? Du courant, de l’eau, du café moulu.',
        'Le courant de la prise, c’est de l’énergie. L’eau et le café, c’est de la matière.',
        'Le voyant et le bouton portent un message. C’est de l’information.',
        'Pour lire un objet, cherche ce qui entre, ce qui sort, et de quelle sorte c’est.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le courant, l’eau et le voyant de la cafetière : ce sont ' + c.mot('flux') + '. ' +
        'Il y en a de trois sortes. Le courant de la prise, c’est de l’énergie. L’eau et le café, c’est de la matière. Le message du voyant, c’est de l’information. ' +
        'L’astuce : pour lire un objet, cherche ce qui entre, ce qui sort, et de quelle sorte c’est.',
    },

    vocabulaire: {
      termes: {
        flux: { sesMots: 'des choses qui passent dans l’objet', officiel: 'des flux', lesDeux: 'des choses qui passent dans l’objet. Les techniciens disent : des flux' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce qui passe dans l’objet. Il y a de l’énergie, de la matière et de l’information. ' +
          'Les techniciens ont un mot à eux : je te le dirai la prochaine fois.',
        'Les techniciens disent : des flux, pour les choses qui passent dans l’objet. Un flux d’énergie, un flux de matière, un flux d’information.',
        'Tu connais le mot officiel : les flux d’énergie, de matière et d’information.',
      ],
    },

    exercices: [
      O.qcm('quelle-sorte', 'cuisine-restaurant',
        [
          ['Le courant qui entre dans la cafetière', 'De l’énergie', 'Le courant électrique apporte de l’énergie.'],
          ['L’eau versée dans le réservoir', 'De la matière', 'L’eau est une matière que l’on peut toucher.'],
          ['Le voyant qui indique « prêt »', 'De l’information', 'Le voyant porte un message à Rebecca.'],
          ['Le café moulu', 'De la matière', 'Le café est une matière que l’on peut toucher.'],
          ['L’ordre donné en appuyant sur le bouton marche', 'De l’information', 'Appuyer sur le bouton envoie un message à l’appareil.'],
          ['La chaleur qui sort de la plaque chauffante', 'De l’énergie', 'La chaleur est une forme d’énergie.'],
        ],
        (x) => x + ' : de quelle sorte de flux s’agit-il ?', SORTES,
        'Énergie, matière ou information : qu’est-ce qui circule ?'),
      O.qcm('entree-ou-sortie', 'appareils',
        [
          ['le café chaud versé dans la tasse', 'Une sortie', 'Le café chaud quitte la cafetière pour la tasse.'],
          ['l’eau du réservoir', 'Une entrée', 'L’eau arrive dans la cafetière pour être chauffée.'],
          ['la vapeur qui s’échappe', 'Une sortie', 'La vapeur quitte la cafetière.'],
          ['le courant venu de la prise', 'Une entrée', 'Le courant arrive dans la cafetière depuis la prise.'],
        ],
        (x) => 'Pour la cafetière de Rebecca : ' + x + '. Est-ce une entrée ou une sortie ?', SENS,
        'Est-ce que cela arrive dans l’objet, ou en sort ?'),
      O.qcm('matiere-qui-entre', 'cuisine-restaurant',
        [['un grille-pain', 'Des tranches de pain', 'On glisse des tranches de pain dans les fentes du grille-pain.'], ['une cafetière', 'De l’eau et du café moulu', 'La cafetière reçoit de l’eau et du café moulu.'], ['un ventilateur', 'De l’air', 'Le ventilateur brasse l’air de la pièce.'], ['une imprimante', 'Du papier', 'L’imprimante avale des feuilles de papier.']],
        (x) => 'Dans ' + x + ', quel flux de matière entre ?', ENTREES,
        'Cherche ce que l’on touche et qui entre dans l’appareil.'),
      {
        id: 'energie-cafetiere',
        univers: 'cuisine-restaurant',
        // [puissance en W, durée en minutes]
        versions: [[800, 15], [1000, 6], [1200, 30], [900, 20], [600, 30], [1000, 12]],
        genere(c) {
          const [p, m] = c.alea.choisir(this.versions);
          const e = (p * m) / 60;
          return {
            enonce: 'La cafetière de Rebecca a une puissance de ' + p + ' watts. Elle fonctionne ' + m + ' minutes. On rappelle : énergie en wattheures = puissance en watts × durée en heures. Quelle énergie reçoit-elle, en wattheures ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Calcule ' + p + ' × ' + m + ', puis divise par 60.',
            aideParlee: 'Multiplie la puissance par les minutes, puis divise par soixante.',
            correction: [p + ' × ' + m + ' = ' + (p * m) + ', puis ' + (p * m) + ' ÷ 60 = ' + e + ' wattheures.'],
          };
        },
      },
      {
        id: 'eau-en-une-semaine',
        univers: 'cuisine-restaurant',
        // [cafés par jour, centilitres d’eau par café]
        versions: [[2, 15], [3, 12], [2, 20], [4, 10], [3, 25]],
        genere(c) {
          const [n, v] = c.alea.choisir(this.versions);
          const j = n * v;
          return {
            enonce: 'Chaque jour, Rebecca fait ' + n + ' cafés. Chaque café demande ' + v + ' centilitres d’eau. Combien de centilitres d’eau entrent dans la cafetière en 7 jours ?',
            reponse: { type: 'nombre', valeur: j * 7 },
            aide: 'Calcule d’abord l’eau d’une journée, puis multiplie par 7.',
            correction: [n + ' × ' + v + ' = ' + j + ' centilitres par jour.', j + ' × 7 = ' + (j * 7) + ' centilitres en 7 jours.'],
          };
        },
      },
    ],

    defi: {
      // [puissance en W, durée par jour en minutes, numéro de l’élément interrogé]
      versions: [[1600, 15, 0], [1200, 10, 1], [2000, 12, 2], [1800, 20, 3]],
      genere(c) {
        const [p, m, k] = c.alea.choisir(this.versions);
        const [el, sorte] = ELEMENTS[k];
        const e = (p * m) / 60;
        return {
          enonce: 'Rebecca utilise son sèche-cheveux ' + m + ' minutes par jour. Sa puissance est de ' + p + ' watts. ' +
            'Il aspire l’air de la pièce, le chauffe et le souffle. Un bouton permet de choisir la vitesse.',
          questions: [
            {
              texte: 'Question 1. On rappelle : énergie en wattheures = puissance en watts × durée en heures. Quelle énergie reçoit le sèche-cheveux chaque jour, en wattheures ?',
              reponse: { type: 'nombre', valeur: e },
              aide: 'Calcule ' + p + ' × ' + m + ', puis divise par 60.',
              aideParlee: 'Multiplie la puissance par les minutes, puis divise par soixante.',
              correction: [p + ' × ' + m + ' = ' + (p * m) + ', puis ' + (p * m) + ' ÷ 60 = ' + e + ' wattheures.'],
            },
            {
              texte: 'Question 2. Quelle énergie reçoit-il en 7 jours, en kilowattheures ?',
              reponse: { type: 'nombre', valeur: (e * 7) / 1000 },
              aide: 'Multiplie l’énergie d’un jour par 7, puis divise par 1 000.',
              correction: [e + ' × 7 = ' + (e * 7) + ' wattheures.', (e * 7) + ' ÷ 1 000 = ' + O.ecr((e * 7) / 1000) + ' kilowattheures.'],
            },
            {
              texte: 'Question 3. Pour le sèche-cheveux, ' + el + ' : de quelle sorte de flux s’agit-il ?',
              reponse: O.choix(c.alea, sorte, SORTES.filter((s) => s !== sorte)),
              aide: 'Énergie, matière ou information : qu’est-ce qui circule ?',
              correction: ['Réponse : ' + sorte + '.'],
            },
            {
              texte: 'Question 4. Cite un flux d’énergie, un flux de matière et un flux d’information du sèche-cheveux.',
              correction: ['Énergie : le courant de la prise. Matière : l’air aspiré, puis soufflé chaud. Information : la position du bouton de vitesse.'],
              grille: ['As-tu cité le courant de la prise comme flux d’énergie ?', 'As-tu cité l’air comme flux de matière ?', 'As-tu cité le bouton de vitesse ou le voyant comme flux d’information ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Énergie, matière, information : tu sais lire ce qui entre et ce qui sort d’un objet.',
    carte: ['quelle-sorte', 'entree-ou-sortie', 'matiere-qui-entre'],
    papierDuSoir: { exercices: ['energie-cafetiere', 'eau-en-une-semaine'], defi: true },
    automatismes: [
      {
        id: 'watts-heures',
        versions: [[1000, 2], [800, 3], [500, 4], [1200, 2]],
        genere(c) { const [p, h] = c.alea.choisir(this.versions); return { enonce: p + ' watts pendant ' + h + ' heures : combien de wattheures ?', reponse: { type: 'nombre', valeur: p * h } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Inde, au Barefoot College, des femmes venues d’Afrique apprennent à fabriquer et entretenir des lampes solaires.',
    prenoms: ['Rebecca', 'Moussa'],
  };
});
