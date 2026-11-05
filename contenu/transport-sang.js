/* Notion 2 du bloc SVT « Le vivant et son évolution » : le transport par le sang. Le tuyau d'arrosage de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const APPORTE = 'Le sang l’apporte aux cellules', EMPORTE = 'Le sang l’emporte loin des cellules';
  const CIRCUIT = ['Le cœur', 'Une artère', 'Les capillaires', 'Une veine'];

  return {
    id: 'transport-sang',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Le transport par le sang',
    classe: 'cycle 4',
    univers: ['champetre', 'famille', 'danses'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : circulation sanguine, échanges entre le sang et les cellules.',

    accroche: {
      texte: 'Laure arrose le potager. Un gros tuyau part de la pompe, puis de petits tuyaux vont jusqu’à chaque carré. L’eau arrive partout. ' +
        'Dans ton corps, tes cellules sont des milliards. Comment le dioxygène et le glucose arrivent-ils jusqu’à chacune ?',
      image: { dessin: 'chaine', etapes: ['Le cœur', 'Un gros tuyau', 'Des tuyaux très fins', 'Un autre gros tuyau'], description: 'Le trajet du sang : le cœur l’envoie dans un gros tuyau, il passe dans des tuyaux très fins, puis revient par un autre gros tuyau.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Poumons : le sang prend le dioxygène', 'Intestin : le sang prend les nutriments', 'Cellules : le sang les dépose', 'Reins et poumons : il dépose les déchets'], description: 'Le sang prend le dioxygène dans les poumons et les nutriments dans l’intestin, les dépose aux cellules, puis dépose les déchets aux reins et aux poumons.' },
      etapes: [
        'Le cœur est la pompe. Il pousse le sang dans tout le corps.',
        'Le sang part dans de gros tuyaux, puis dans des tuyaux de plus en plus fins, qui passent tout près de chaque cellule.',
        'Là, le dioxygène et les nutriments passent du sang à la cellule. Les déchets passent de la cellule au sang.',
        'Le sang revient au cœur par d’autres gros tuyaux, et le tour recommence.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le sang circule toujours dans ' + c.mot('vaisseaux') + '. Le cœur le pousse. Près des cellules, il passe dans ' + c.mot('capillaires') + '. ' +
        'Là, il dépose le dioxygène et les nutriments, et il prend les déchets. ' +
        'L’astuce : le sang est un livreur. Il apporte en allant, il emporte les déchets en passant.',
    },

    vocabulaire: {
      termes: {
        vaisseaux: { sesMots: 'les tuyaux du sang', officiel: 'les vaisseaux sanguins', lesDeux: 'les tuyaux du sang, que les scientifiques appellent les vaisseaux sanguins' },
        capillaires: { sesMots: 'les tuyaux les plus fins', officiel: 'les capillaires', lesDeux: 'les tuyaux les plus fins, que l’on appelle les capillaires' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les tuyaux du sang, et les tuyaux les plus fins. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : les vaisseaux sanguins. Ceux qui partent du cœur sont les artères, ceux qui y reviennent sont les veines. Les plus fins sont les capillaires.',
        'Tu connais les mots officiels : les vaisseaux sanguins, les artères, les veines et les capillaires.',
      ],
    },

    exercices: [
      {
        id: 'apres-quoi',
        univers: 'famille',
        versions: [0, 1, 2],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = CIRCUIT[i + 1];
          return {
            enonce: 'Sur le trajet du sang, que trouve-t-on juste après : ' + CIRCUIT[i].toLowerCase() + ' ?',
            reponse: O.choix(c.alea, bonne, CIRCUIT.filter((_, k) => k !== i)),
            aide: 'Le sang part du cœur et y revient. Les tuyaux les plus fins sont au milieu.',
            correction: ['Le trajet : ' + CIRCUIT.join(', puis ').toLowerCase() + ', puis retour au cœur.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      O.qcm('apporte-ou-emporte', 'danses',
        [['Le dioxygène', APPORTE], ['Le dioxyde de carbone', EMPORTE], ['Le glucose', APPORTE]].map((v) => [v[0], v[1], 'Le sang apporte le dioxygène et le glucose aux cellules, et il emporte leur déchet, le dioxyde de carbone.']),
        (x) => x + ' : que fait le sang pendant une danse ?', [APPORTE, EMPORTE],
        'Il apporte ce qui sert, il emporte les déchets.'),
      O.qcm('quel-organe', 'famille',
        [['Où le sang prend-il le dioxygène ?', 'Dans les poumons'], ['Où le sang prend-il les nutriments ?', 'Dans l’intestin'], ['Quel organe pousse le sang ?', 'Le cœur']].map((v) => [v[0], v[1], 'L’air arrive aux poumons, la nourriture digérée à l’intestin, et le cœur est la pompe.']),
        (x) => x, ['Dans les poumons', 'Dans l’intestin', 'Le cœur'],
        'L’air arrive aux poumons, la nourriture digérée à l’intestin.'),
      {
        id: 'litres-en-une-heure',
        univers: 'champetre',
        // litres par minute
        versions: [5, 6, 4, 10, 15, 20],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          return {
            enonce: 'Le cœur de Moussa envoie ' + l + ' L de sang par minute pendant qu’il travaille au champ. Combien de litres envoie-t-il en une heure ?',
            reponse: { type: 'nombre', valeur: l * 60 },
            aide: 'Une heure, c’est 60 minutes. Calcule ' + l + ' × 60.',
            aideParlee: 'Une heure, c’est soixante minutes. Multiplie par soixante.',
            correction: [l + ' × 60 = ' + l * 60 + ' L.'],
          };
        },
      },
      {
        id: 'battements',
        univers: 'danses',
        // [battements par minute, minutes]
        versions: [[70, 10], [80, 5], [120, 3], [150, 4], [60, 20], [90, 10]],
        genere(c) {
          const [b, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le cœur de Rebecca bat ' + b + ' fois par minute. Combien de fois bat-il en ' + m + ' minutes ?',
            reponse: { type: 'nombre', valeur: b * m },
            aide: 'Calcule ' + b + ' × ' + m + '.',
            aideParlee: 'Multiplie les battements d’une minute par le nombre de minutes.',
            correction: [b + ' × ' + m + ' = ' + b * m + ' battements.'],
          };
        },
      },
    ],

    defi: {
      // [dioxygène à l'entrée du muscle, à la sortie au repos, à la sortie pendant l'effort, en mL par litre de sang]
      versions: [[200, 150, 50], [200, 140, 60], [190, 150, 40], [200, 160, 80]],
      genere(c) {
        const [e, r, f] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : on mesure le dioxygène dans le sang, à l’entrée et à la sortie d’un muscle. À l’entrée, il y a ' + e + ' mL de dioxygène par litre de sang. À la sortie, il y en a ' + r + ' mL au repos, et ' + f + ' mL pendant l’effort.',
          questions: [
            {
              texte: 'Question 1. Combien de millilitres le muscle prend-il dans un litre de sang au repos ?',
              reponse: { type: 'nombre', valeur: e - r },
              aide: 'Fais la différence entre l’entrée et la sortie.',
              correction: [e + ' − ' + r + ' = ' + (e - r) + ' mL.'],
            },
            {
              texte: 'Question 2. Combien de millilitres prend-il dans un litre de sang pendant l’effort ?',
              reponse: { type: 'nombre', valeur: e - f },
              aide: 'Fais la même différence, avec la valeur de l’effort.',
              correction: [e + ' − ' + f + ' = ' + (e - f) + ' mL.'],
            },
            {
              texte: 'Question 3. Explique, à l’aide de ces résultats, le rôle du sang pour le muscle.',
              correction: ['Le sang apporte le dioxygène au muscle : le muscle en prend une partie au passage.', 'Pendant l’effort, ses cellules ont besoin de plus d’énergie : le muscle en prend davantage.'],
              grille: ['As-tu utilisé tes deux résultats ?', 'As-tu dit que le sang apporte le dioxygène ?', 'As-tu relié l’effort au besoin d’énergie des cellules ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le cœur pousse, le sang livre et emporte les déchets : tu connais ce grand voyage.',
    carte: ['apres-quoi', 'apporte-ou-emporte', 'quel-organe'],
    papierDuSoir: { exercices: ['litres-en-une-heure', 'battements'], defi: true },
    automatismes: [
      {
        id: 'soixante-fois',
        versions: [5, 4, 6, 3],
        genere(c) { const l = c.alea.choisir(this.versions); return { enonce: l + ' × 60 = ?', reponse: { type: 'nombre', valeur: l * 60 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Ibn al-Nafis, médecin mort au Caire, en Égypte, en 1288, a décrit le passage du sang par les poumons.',
    prenoms: ['Laure', 'Moussa', 'Rebecca'],
  };
});
