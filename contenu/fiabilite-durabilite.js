/* Notion 4 du bloc de technologie « Comment un objet fonctionne » : fiabilité et durabilité. Les mixeurs de Laure et de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const eu = (x) => ecr(x) + ' euro' + (x >= 2 ? 's' : '');
  const pan = (n) => n + (n >= 2 ? ' mixeurs tombent en panne' : ' mixeur tombe en panne');
  const pannes = (n) => n + (n >= 2 ? ' pannes' : ' panne');
  /** Question à choix : versions [[situation, bonne réponse, [deux pièges faux], explication]]. */
  const Q = (id, univers, versions, enonce, aide) => ({
    id, univers, versions,
    genere(c) {
      const [x, bonne, autres, pourquoi] = c.alea.choisir(this.versions);
      return { enonce: enonce(x), reponse: O.choix(c.alea, bonne, autres), aide, correction: [pourquoi, 'Réponse : ' + bonne + '.'] };
    },
  });

  return {
    id: 'fiabilite-durabilite',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Fiabilité et durabilité',
    classe: 'cycle 4',
    univers: ['appareils', 'famille', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : fiabilité et durabilité d’un objet, pannes, durée de vie, nombre de cycles, pièces d’usure.',

    accroche: {
      texte: 'Le mixeur de Laure s’est arrêté. Il n’avait que deux ans. Celui de Clarisse, bien plus ancien, marche encore. Pourquoi ? ' +
        'Une courroie ou un joint s’abîme à force de servir. Et on peut le changer.',
      image: { dessin: 'chaine', etapes: ['Un objet sert', 'Une pièce s’abîme', 'On la change', 'L’objet sert encore'], description: 'Un objet sert, une pièce s’abîme, on la change, puis l’objet sert encore.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Une pièce lâche : c’est la panne', 'On compte le temps ou les cycles', 'La pièce qui s’abîme se change', 'L’objet repart pour longtemps'], description: 'Quatre étapes : une pièce lâche et c’est la panne, on compte le temps ou les cycles, la pièce qui s’abîme se change, l’objet repart pour longtemps.' },
      etapes: [
        'Un objet tombe en panne quand une de ses pièces lâche. Certains objets tombent en panne bien plus souvent que d’autres.',
        'On compte combien de temps un objet sert, ou combien de fois : par exemple, les lavages d’un lave-linge.',
        'Certaines pièces s’abîment à force de servir : une courroie, un joint, des plaquettes de frein.',
        'Ces pièces-là, on peut les changer. L’objet repart pour longtemps.',
        'Un objet bien pensé s’abîme lentement et se répare facilement. Il sert plus longtemps.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le mixeur de Clarisse, toujours sans souci : c’est ' + c.mot('fiab') + '. ' +
        'Pense au temps entre l’achat d’un objet et le jour où il ne sert plus : c’est ' + c.mot('duree') + '. ' +
        'Regarde la courroie qui frotte à chaque tour : c’est ' + c.mot('usure') + '. ' +
        'Regarde le mixeur que Clarisse garde depuis des années : c’est ' + c.mot('durab') + '. ' +
        'L’astuce : une pièce qui s’use se change, et l’objet repart.',
    },

    vocabulaire: {
      termes: {
        fiab: { sesMots: 'le fait de ne presque jamais tomber en panne', officiel: 'la fiabilité', lesDeux: 'le fait de ne presque jamais tomber en panne. Les techniciens disent : la fiabilité' },
        duree: { sesMots: 'le temps pendant lequel l’objet sert', officiel: 'la durée de vie', lesDeux: 'le temps pendant lequel l’objet sert. Les techniciens disent : la durée de vie' },
        usure: { sesMots: 'une pièce qui s’abîme à force de servir', officiel: 'une pièce d’usure', lesDeux: 'une pièce qui s’abîme à force de servir. Les techniciens disent : une pièce d’usure' },
        durab: { sesMots: 'la capacité à tenir longtemps', officiel: 'la durabilité', lesDeux: 'la capacité à tenir longtemps. Les techniciens disent : la durabilité' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ne presque jamais tomber en panne, le temps pendant lequel l’objet sert, et tenir longtemps. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la fiabilité, pour les pannes rares. La durée de vie, pour le temps de service. La durabilité, pour tenir longtemps. Et une pièce d’usure, pour une pièce qui s’abîme.',
        'Tu connais les mots officiels : la fiabilité, la durée de vie, la durabilité et les pièces d’usure.',
      ],
    },

    exercices: [
      {
        id: 'duree-en-semaines',
        univers: 'maison-courses',
        // [utilisations par semaine, utilisations avant la panne]
        versions: [[3, 300], [4, 320], [2, 208], [5, 200], [6, 300]],
        genere(c) {
          const [r, n] = c.alea.choisir(this.versions);
          const s = n / r;
          return {
            enonce: 'Le mixeur de Laure sert ' + r + ' fois par semaine. On estime qu’il tombe en panne après ' + n + ' utilisations. Au bout de combien de semaines tombera-t-il en panne ?',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Divise le nombre d’utilisations possibles par le nombre d’utilisations par semaine.',
            correction: [n + ' ÷ ' + r + ' = ' + s + ' semaines.'],
          };
        },
      },
      {
        id: 'cycles-et-annees',
        univers: 'famille',
        // [cycles prévus, cycles par semaine]
        versions: [[1560, 6], [1560, 5], [1560, 3], [1040, 2], [1040, 5]],
        genere(c) {
          const [cy, s] = c.alea.choisir(this.versions);
          const an = s * 52, ans = cy / an;
          return {
            enonce: 'Un lave-linge est prévu pour ' + cy + ' cycles de lavage. Clarisse en fait ' + s + ' par semaine. Une année compte 52 semaines. Au bout de combien d’années aura-t-il fait ses ' + cy + ' cycles ?',
            reponse: { type: 'nombre', valeur: ans },
            aide: 'Calcule d’abord les cycles d’une année, puis divise.',
            aideParlee: 'Calcule d’abord les cycles d’une année, puis divise les cycles prévus par ce nombre.',
            correction: [s + ' × 52 = ' + an + ' cycles par an.', cy + ' ÷ ' + an + ' = ' + ans + ' ans.'],
          };
        },
      },
      Q('piece-d-usure', 'appareils',
        [
          ['un mixeur', 'La courroie qui tourne sans cesse', ['Le bol en verre', 'Le socle en plastique'], 'La courroie frotte à chaque tour : elle s’use et se change.'],
          ['un robinet', 'Le joint en caoutchouc', ['Le corps en laiton', 'La vis de fixation'], 'Le joint est serré à chaque fermeture : il s’use et se change.'],
          ['un vélo', 'Les plaquettes de frein', ['Le cadre en acier', 'Le guidon en aluminium'], 'Les plaquettes frottent à chaque freinage : elles s’usent.'],
          ['une perceuse', 'Le foret', ['Le carter en plastique', 'La poignée en plastique'], 'Le foret frotte la matière percée : il s’use.'],
          ['un lave-linge', 'Le joint de la porte', ['Le tambour en acier', 'Le bouton du programme'], 'Le joint est plié et mouillé à chaque lavage : il s’use.'],
        ],
        (x) => 'Dans ' + x + ', laquelle de ces pièces est une pièce d’usure ?',
        'Cherche la pièce qui frotte ou qui travaille à chaque fois.'),
      {
        id: 'comparer-fiabilite',
        univers: 'appareils',
        // [pannes pour 100 objets A, pannes pour 100 objets B]
        versions: [[3, 7], [9, 4], [2, 6], [8, 5], [1, 12]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = a < b ? 'Les mixeurs A' : 'Les mixeurs B';
          return {
            enonce: 'Sur 100 mixeurs A suivis pendant un an, ' + pan(a) + '. Sur 100 mixeurs B suivis pendant un an, ' + pan(b) + '. Quels mixeurs sont les plus fiables ?',
            reponse: O.choix(c.alea, bonne, ['Les mixeurs A', 'Les mixeurs B', 'Ils sont aussi fiables']),
            aide: 'Le plus fiable est celui qui tombe le moins en panne.',
            correction: [pannes(a) + ' pour A, ' + pannes(b) + ' pour B : le plus petit nombre est ' + Math.min(a, b) + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'reparer-ou-racheter',
        univers: 'famille',
        // [prix de la réparation en euros, prix d'un mixeur neuf en euros]
        versions: [[8, 40], [5, 30], [12, 55], [10, 45], [6, 35]],
        genere(c) {
          const [r, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Réparer le mixeur de Clarisse coûte ' + eu(r) + '. En acheter un neuf coûte ' + eu(n) + '. Combien d’euros Clarisse économise-t-elle en réparant ?',
            reponse: { type: 'nombre', valeur: n - r },
            aide: 'Soustrais le prix de la réparation au prix du neuf.',
            correction: [n + ' − ' + r + ' = ' + (n - r) + ' euros.'],
          };
        },
      },
    ],

    defi: {
      // [cycles prévus, cycles par semaine, prix du joint posé en euros, prix du neuf en euros]
      versions: [[1560, 3, 45, 420], [1560, 6, 60, 450], [1040, 5, 50, 380], [1040, 2, 40, 400]],
      genere(c) {
        const [cy, s, j, n] = c.alea.choisir(this.versions);
        const an = s * 52, ans = cy / an;
        const bonne = ans >= 8 ? 'Oui' : 'Non';
        return {
          enonce: 'Le lave-linge de Clarisse est prévu pour ' + cy + ' cycles. Elle en fait ' + s + ' par semaine, sur 52 semaines par an. ' +
            'Le joint de la porte est usé : le changer coûte ' + eu(j) + '. Un lave-linge neuf coûte ' + eu(n) + '. Clarisse voudrait garder son appareil au moins 8 ans.',
          image: { dessin: 'chaine', etapes: [cy + ' cycles prévus', s + ' cycles par semaine', 'Joint usé : ' + j + ' euros', 'Neuf : ' + n + ' euros'], description: 'Le lave-linge est prévu pour ' + cy + ' cycles. Clarisse en fait ' + s + ' par semaine. Changer le joint usé coûte ' + j + ' euros. Un appareil neuf coûte ' + n + ' euros.' },
          questions: [
            {
              texte: 'Question 1. Pendant combien d’années le lave-linge peut-il servir ?',
              reponse: { type: 'nombre', valeur: ans },
              aide: 'Calcule les cycles d’une année, puis divise les cycles prévus par ce nombre.',
              correction: [s + ' × 52 = ' + an + ' cycles par an.', cy + ' ÷ ' + an + ' = ' + ans + ' ans.'],
            },
            {
              texte: 'Question 2. Combien d’euros Clarisse économise-t-elle en changeant le joint plutôt qu’en achetant un neuf ?',
              reponse: { type: 'nombre', valeur: n - j },
              aide: 'Soustrais le prix du joint au prix du neuf.',
              correction: [n + ' − ' + j + ' = ' + (n - j) + ' euros.'],
            },
            {
              texte: 'Question 3. Le lave-linge peut-il servir au moins 8 ans ?',
              reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
              aide: 'Compare la durée trouvée à la question 1 avec 8 ans.',
              correction: [ans + ' ans ' + (ans >= 8 ? 'font au moins 8 ans.' : 'font moins de 8 ans.'), 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Le joint de la porte est usé. Que conseilles-tu à Clarisse : jeter l’appareil ou changer le joint ? Explique.',
              correction: ['Le joint est une pièce d’usure : on peut le changer.', 'Changer le joint coûte bien moins cher qu’un appareil neuf, et le lave-linge repart pour longtemps.'],
              grille: ['As-tu dit que le joint est une pièce d’usure ?', 'As-tu comparé le prix du joint et celui du neuf ?', 'As-tu conclu qu’il vaut mieux réparer ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais pourquoi un objet tient longtemps, et comment une pièce changée lui rend de belles années.',
    carte: ['piece-d-usure', 'comparer-fiabilite', 'cycles-et-annees'],
    papierDuSoir: { exercices: ['cycles-et-annees', 'reparer-ou-racheter'], defi: true },
    automatismes: [
      {
        id: 'diviser-semaines',
        // [utilisations avant la panne, utilisations par semaine]
        versions: [[300, 3], [320, 4], [200, 5], [300, 6]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Pérou, des communautés quechua refont chaque année le pont de corde Q’eswachaka, tressé en paille.',
    prenoms: ['Laure', 'Clarisse'],
  };
});
