/* Notion 2 du bloc de technologie « Les objets et la société » : invention et innovation. Le séchoir d'Ibrahim.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const INV = 'Une invention', INNO = 'Une innovation';

  return {
    id: 'invention-innovation',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Invention et innovation',
    classe: 'cycle 4',
    univers: ['champetre', 'commerce', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 11) : invention, innovation, évolution des besoins.',

    accroche: {
      texte: 'Ibrahim a une idée : un séchoir à mangues qui marche au soleil, fait avec une caisse et une vitre. Personne n’en avait fait avant lui. ' +
        'Deux ans plus tard, une petite usine le fabrique, et tout le village en achète. Entre l’idée et le marché, que s’est-il passé ?',
      image: { dessin: 'chaine', etapes: ['L’idée nouvelle d’Ibrahim', 'Un premier séchoir qui marche', 'Fabriqué et vendu à beaucoup de gens'], description: 'L’idée nouvelle d’Ibrahim, un premier séchoir qui marche, puis fabriqué et vendu à beaucoup de gens.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Une idée ou un objet nouveau', 'Il est fabriqué en série', 'Les gens l’achètent et l’utilisent'], description: 'Une idée ou un objet nouveau, il est fabriqué en série, les gens l’achètent et l’utilisent.' },
      etapes: [
        'Quand quelqu’un imagine un objet qui n’existait pas, c’est une idée nouvelle : on la protège parfois par un brevet.',
        'Une idée nouvelle ne sert à personne tant qu’elle reste dans un atelier.',
        'Quand l’objet nouveau, ou amélioré, est fabriqué, vendu et utilisé par beaucoup de gens, il change leur vie.',
        'Une amélioration peut suffire : un téléphone qui prend des photos, un vélo avec un petit moteur.',
      ],
    },

    decouverte: {
      texte: (c) => 'Imaginer un objet qui n’existait pas, c’est ' + c.mot('invention') + '. ' +
        'Quand cet objet, ou une amélioration, arrive chez les gens et se vend, c’est ' + c.mot('innovation') + '. ' +
        'L’astuce : l’idée naît dans l’atelier ; elle devient un succès quand les gens l’utilisent.',
    },

    vocabulaire: {
      termes: {
        invention: { sesMots: 'une idée nouvelle', officiel: 'une invention', lesDeux: 'une idée nouvelle, que les techniciens appellent une invention' },
        innovation: { sesMots: 'une idée qui arrive chez les gens', officiel: 'une innovation', lesDeux: 'une idée qui arrive chez les gens, que les techniciens appellent une innovation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une idée nouvelle, puis une idée qui arrive chez les gens. ' +
          'Les techniciens ont deux mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : une invention, quand l’objet est nouveau ; une innovation, quand il est adopté et vendu.',
        'Tu connais les mots officiels : l’invention, puis l’innovation, qui répond à un besoin des gens.',
      ],
    },

    exercices: [
      O.qcm('invention-ou-innovation', 'appareils',
        [['Ibrahim dessine pour la première fois un séchoir à mangues solaire.', INV], ['Le séchoir d’Ibrahim est fabriqué en usine et vendu dans toute la région.', INNO],
          ['Un téléphone déjà vendu partout reçoit un appareil photo, et tout le monde l’achète.', INNO], ['Fatou imagine un panier qui garde le pain chaud : personne n’en avait fait.', INV]],
        (x) => x + ' Est-ce une invention ou une innovation ?', [INV, INNO],
        'Invention : l’idée est nouvelle. Innovation : les gens l’achètent et l’utilisent.'),
      O.qcm('amelioration', 'dehors',
        [['un vélo', 'Lui ajouter un petit moteur électrique'], ['une lampe', 'La faire marcher au soleil, sans pile'], ['un téléphone', 'Lui ajouter un appareil photo'], ['une marmite', 'Lui ajouter un couvercle qui garde la chaleur']],
        (x) => 'Quelle idée est une amélioration d’' + x + ' ?', ['Lui ajouter un petit moteur électrique', 'La faire marcher au soleil, sans pile', 'Lui ajouter un appareil photo', 'Lui ajouter un couvercle qui garde la chaleur'],
        'Cherche ce qui rend l’objet plus utile, sans changer ce à quoi il sert.'),
      O.qcm('pourquoi-adopte', 'commerce',
        [['le séchoir d’Ibrahim', 'Il répond à un besoin des gens'], ['la lampe solaire', 'Il répond à un besoin des gens']],
        (x) => 'Pourquoi les gens adoptent-ils ' + x + ' ?', ['Il répond à un besoin des gens', 'Il est le plus lourd', 'Il n’a jamais été fabriqué'],
        'Une innovation réussit quand elle sert vraiment.'),
      {
        id: 'annees-d-attente',
        univers: 'champetre',
        // [année de l'idée, année de la vente]
        versions: [[2019, 2022], [2015, 2021], [2018, 2020], [2010, 2016], [2012, 2019]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Ibrahim a eu son idée en ' + a + '. Son séchoir est vendu dans les magasins en ' + b + '. Combien d’années ont passé ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Calcule ' + b + ' − ' + a + '.',
            aideParlee: 'Soustrais l’année de l’idée à l’année de la vente.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' ans.'],
          };
        },
      },
      {
        id: 'ventes',
        univers: 'commerce',
        // [séchoirs vendus par mois, nombre de mois]
        versions: [[25, 4], [30, 6], [40, 3], [15, 8], [50, 5], [20, 9]],
        genere(c) {
          const [n, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’usine vend ' + n + ' séchoirs chaque mois. Combien en vend-elle en ' + m + ' mois ?',
            reponse: { type: 'nombre', valeur: n * m },
            aide: 'Calcule ' + n + ' × ' + m + '.',
            aideParlee: 'Multiplie les ventes d’un mois par le nombre de mois.',
            correction: [n + ' × ' + m + ' = ' + n * m + ' séchoirs.'],
          };
        },
      },
    ],

    defi: {
      // [année de l'idée, année de la vente, ventes par mois, mois]
      versions: [[2019, 2022, 30, 6], [2018, 2021, 25, 4], [2015, 2020, 40, 5], [2017, 2019, 20, 9]],
      genere(c) {
        const [a, b, n, m] = c.alea.choisir(this.versions);
        return {
          enonce: 'Rebecca prépare un exposé sur le séchoir solaire d’Ibrahim. Ibrahim a fabriqué le premier séchoir en ' + a + '. ' +
            'Une usine le vend depuis ' + b + ' ; elle en vend ' + n + ' par mois.',
          questions: [
            {
              texte: 'Question 1. Combien d’années séparent le premier séchoir du début de la vente ?',
              reponse: { type: 'nombre', valeur: b - a },
              aide: 'Soustrais l’année de l’idée à l’année de la vente.',
              correction: [b + ' − ' + a + ' = ' + (b - a) + ' ans.'],
            },
            {
              texte: 'Question 2. Combien de séchoirs l’usine vend-elle en ' + m + ' mois ?',
              reponse: { type: 'nombre', valeur: n * m },
              aide: 'Multiplie les ventes d’un mois par le nombre de mois.',
              correction: [n + ' × ' + m + ' = ' + n * m + ' séchoirs.'],
            },
            {
              texte: 'Question 3. Explique pourquoi le séchoir était d’abord une invention, puis est devenu une innovation.',
              correction: ['Au début, c’était un objet nouveau, imaginé par Ibrahim : une invention.', 'Il est devenu une innovation quand il a été fabriqué, vendu et utilisé par beaucoup de gens.'],
              grille: ['As-tu dit que l’objet était nouveau au début ?', 'As-tu dit qu’une innovation est vendue et utilisée ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! L’invention naît d’une idée, l’innovation arrive chez les gens : tu sais faire la différence.',
    carte: ['invention-ou-innovation', 'amelioration', 'ventes'],
    papierDuSoir: { exercices: ['annees-d-attente', 'ventes'], defi: true },
    automatismes: [
      {
        id: 'ecart-annees',
        versions: [[2019, 2022], [2015, 2020], [2010, 2018], [2021, 2024]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: b + ' − ' + a + ' = ?', reponse: { type: 'nombre', valeur: b - a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, depuis 2007, M-Pesa permet d’envoyer de l’argent avec un simple téléphone portable. Des millions de personnes l’ont adopté.',
    prenoms: ['Ibrahim', 'Fatou', 'Rebecca'],
  };
});
