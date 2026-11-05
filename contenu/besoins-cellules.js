/* Notion 1 du bloc SVT « Le vivant et son évolution » : les besoins des cellules. La peau d'oignon de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const BESOIN = 'La cellule en a besoin', DECHET = 'La cellule le rejette';

  return {
    id: 'besoins-cellules',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Les besoins des cellules',
    classe: 'cycle 4',
    univers: ['champetre', 'famille', 'danses'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : besoins des cellules en nutriments et en dioxygène, rejet de déchets.',

    accroche: {
      texte: 'Au collège, Rachel pose une fine peau d’oignon du potager sous un microscope. Elle voit des milliers de petites cases, collées les unes aux autres. ' +
        'Chaque case est vivante. Elle a des besoins, comme toi, mais en tout petit.',
      image: { dessin: 'chaine', etapes: ['Entrent : nourriture et dioxygène', 'La cellule en tire de l’énergie', 'Sortent : dioxyde de carbone et déchets'], description: 'Une petite case vivante, en trois temps : de la nourriture et du dioxygène entrent ; elle en tire de l’énergie ; du dioxyde de carbone et des déchets sortent.' },
    },

    manipulation: {
      image: { dessin: 'paquets', objets: 12, parPaquet: 4, description: 'Douze petites cases rangées en trois rangées de quatre, comme des cellules vues au microscope.' },
      etapes: [
        'Tous les êtres vivants sont faits de ces petites cases : l’oignon, le manguier, le chat, et toi.',
        'Pense à une danse : tes muscles ont besoin d’énergie. Cette énergie est produite dans chaque petite case.',
        'Pour la produire, la case reçoit de la nourriture, comme le glucose, et du dioxygène.',
        'En travaillant, elle fabrique des déchets, comme le dioxyde de carbone. Elle doit s’en débarrasser.',
      ],
    },

    decouverte: {
      texte: (c) => 'Tout être vivant est fait de ' + c.mot('cellule') + '. Chacune a besoin de dioxygène et de ' + c.mot('nutriments') + '. ' +
        'Elle en tire de l’énergie, et elle rejette du dioxyde de carbone. ' +
        'L’astuce : retiens « ça entre, ça sert, ça sort ».',
    },

    vocabulaire: {
      termes: {
        cellule: { sesMots: 'petites cases vivantes', officiel: 'cellules', lesDeux: 'petites cases vivantes, que les scientifiques appellent des cellules' },
        nutriments: { sesMots: 'la nourriture des cases', officiel: 'nutriments', lesDeux: 'la nourriture des cases, que les scientifiques appellent les nutriments' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les petites cases vivantes, et leur nourriture. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une cellule, pour la petite case vivante. Sa nourriture, ce sont les nutriments, comme le glucose.',
        'Tu connais les mots officiels : la cellule, les nutriments, le glucose, le dioxygène et le dioxyde de carbone.',
      ],
    },

    exercices: [
      O.qcm('besoin-ou-dechet', 'champetre',
        [['Le dioxygène', BESOIN], ['Le dioxyde de carbone', DECHET], ['Le glucose', BESOIN]].map((v) => [v[0], v[1], 'Le dioxygène et le glucose entrent et servent à produire de l’énergie. Le dioxyde de carbone est un déchet qui sort.']),
        (x) => x + ' : que peut-on dire pour une cellule de ton corps ?', [BESOIN, DECHET],
        'Ça entre, ça sert, ça sort.'),
      O.qcm('vivant-ou-pas', 'champetre',
        [['Un oignon', 'Oui, c’est fait de cellules'], ['Un caillou', 'Non, il n’y a pas de cellules'], ['Une feuille de manguier', 'Oui, c’est fait de cellules'], ['Une bouteille en plastique', 'Non, il n’y a pas de cellules'], ['Un ver de terre', 'Oui, c’est fait de cellules']].map((v) => [v[0], v[1], 'Les êtres vivants et leurs parties, comme une feuille, sont faits de cellules. Un caillou ou du plastique n’en ont pas.']),
        (x) => x + ' : est-ce fait de cellules ?', ['Oui, c’est fait de cellules', 'Non, il n’y a pas de cellules'],
        'Seuls les êtres vivants, et ce qui en vient, sont faits de cellules.'),
      O.qcm('a-quoi-ca-sert', 'danses',
        [['Pourquoi tes muscles ont-ils besoin de dioxygène et de glucose pendant une danse ?', 'Pour produire de l’énergie'], ['À quoi servent le glucose et le dioxygène dans une cellule ?', 'Pour produire de l’énergie']].map((v) => [v[0], v[1], 'La cellule utilise le glucose et le dioxygène pour produire son énergie. Le dioxyde de carbone n’est qu’un déchet.']),
        (x) => x, ['Pour produire de l’énergie', 'Pour fabriquer du dioxyde de carbone', 'Pour refroidir le corps'],
        'Le dioxyde de carbone n’est qu’un déchet.'),
      {
        id: 'cellules-en-rangees',
        univers: 'famille',
        // [rangées, cellules par rangée]
        versions: [[8, 12], [6, 15], [9, 10], [7, 20], [5, 14], [12, 11]],
        genere(c) {
          const [r, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Esther compte les cellules d’une peau d’oignon au microscope. Elle voit ' + r + ' rangées de ' + n + ' cellules. Combien y a-t-il de cellules ?',
            reponse: { type: 'nombre', valeur: r * n },
            aide: 'Calcule ' + r + ' × ' + n + '.',
            aideParlee: 'Multiplie le nombre de rangées par le nombre de cellules d’une rangée.',
            correction: [r + ' × ' + n + ' = ' + r * n + ' cellules.'],
          };
        },
      },
      {
        id: 'grossissement',
        univers: 'famille',
        // [taille réelle en mm, grossissement]
        versions: [[0.02, 400], [0.05, 100], [0.1, 40], [0.02, 100], [0.05, 400], [0.1, 100]],
        genere(c) {
          const [t, g] = c.alea.choisir(this.versions);
          const v = r2(t * g);
          return {
            enonce: 'Une cellule mesure ' + ecr(t) + ' mm. Le microscope grossit ' + g + ' fois. Quelle taille paraît-elle avoir, en millimètres ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Calcule ' + ecr(t) + ' × ' + g + '.',
            aideParlee: 'Multiplie la taille réelle par le grossissement.',
            correction: [ecr(t) + ' × ' + g + ' = ' + ecr(v) + ' mm.'],
          };
        },
      },
    ],

    defi: {
      // [dioxygène au repos, à l'effort, en litres par minute, durée de l'effort en minutes]
      versions: [[1, 3, 10], [1, 4, 5], [2, 6, 10], [1, 5, 8]],
      genere(c) {
        const [a, b, t] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : on mesure le dioxygène utilisé par le corps d’Aminata. Au repos, elle en utilise ' + a + ' L par minute. Pendant une danse, elle en utilise ' + b + ' L par minute.',
          image: { dessin: 'barres', barres: [{ nom: 'Repos', parts: a }, { nom: 'Danse', parts: b }], description: 'Deux barres : celle de la danse est plus longue que celle du repos, chaque part vaut un litre de dioxygène par minute.' },
          questions: [
            {
              texte: 'Question 1. Combien de fois plus de dioxygène Aminata utilise-t-elle pendant la danse ?',
              reponse: { type: 'nombre', valeur: b / a },
              aide: 'Divise la valeur de la danse par la valeur du repos.',
              correction: [b + ' ÷ ' + a + ' = ' + b / a + ' fois plus.'],
            },
            {
              texte: 'Question 2. Combien de litres de dioxygène utilise-t-elle en ' + t + ' minutes de danse ?',
              reponse: { type: 'nombre', valeur: b * t },
              aide: 'Multiplie la valeur d’une minute par le nombre de minutes.',
              correction: [b + ' × ' + t + ' = ' + b * t + ' L.'],
            },
            {
              texte: 'Question 3. Explique pourquoi les cellules de ses muscles utilisent davantage de dioxygène pendant la danse.',
              correction: ['Les muscles travaillent plus : leurs cellules ont besoin de plus d’énergie.', 'Elles utilisent donc plus de dioxygène et de glucose, et rejettent plus de dioxyde de carbone.'],
              grille: ['As-tu parlé du besoin d’énergie des cellules ?', 'As-tu cité le dioxygène et le glucose ?', 'As-tu cité le rejet de dioxyde de carbone ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Ça entre, ça sert, ça sort : tu sais de quoi vit chaque cellule de ton corps.',
    carte: ['besoin-ou-dechet', 'vivant-ou-pas', 'a-quoi-ca-sert'],
    papierDuSoir: { exercices: ['cellules-en-rangees', 'grossissement'], defi: true },
    automatismes: [
      {
        id: 'besoin-rapide',
        versions: [['le dioxygène', BESOIN], ['le dioxyde de carbone', DECHET]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Une cellule et ' + d + ' ?', reponse: O.choix(c.alea, b, [BESOIN, DECHET]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Angleterre, Robert Hooke a inventé le mot « cellules » en 1665, en observant du liège.',
    prenoms: ['Rachel', 'Esther', 'Aminata'],
  };
});
