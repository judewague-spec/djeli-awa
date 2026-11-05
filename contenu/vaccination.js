/* Notion 14 du bloc SVT « Le corps humain et la santé » : la vaccination. Le carnet de santé de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const CONTIENT = 'Un microbe affaibli ou tué, ou un morceau de microbe';

  return {
    id: 'vaccination',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'La vaccination',
    classe: 'cycle 4',
    univers: ['famille', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : vaccination, protection individuelle et collective.',

    accroche: {
      texte: 'En rangeant des papiers, Laure retrouve le carnet de santé de Rachel, bébé : une page entière de vaccins, avec des dates. ' +
        'Rachel s’étonne : « On m’a injecté des microbes, alors que je n’étais pas malade ? » Pourquoi fait-on ça ?',
      image: { dessin: 'chaine', etapes: ['Le vaccin : un microbe rendu inoffensif', 'Le corps apprend à le reconnaître', 'Il garde une mémoire', 'Plus tard, le vrai microbe arrive', 'Le corps le reconnaît et le combat vite'], description: 'Comment agit un vaccin : le corps apprend à reconnaître un microbe inoffensif, en garde la mémoire, puis combat vite le vrai microbe.' },
    },

    manipulation: {
      image: { dessin: 'courbe', points: [[0, 0], [7, 10], [14, 20], [21, 10], [28, 80], [35, 70]], axeX: 'jours', axeY: 'défenses du corps', description: 'Une courbe des défenses du corps : faible après le vaccin, puis très forte et rapide quand le vrai microbe arrive, au jour vingt-huit.' },
      etapes: [
        'Un vaccin contient un microbe affaibli ou tué, ou seulement un morceau de microbe : il ne rend pas malade.',
        'Le corps le rencontre et apprend à le reconnaître, comme une photo d’identité.',
        'Il en garde la mémoire, souvent pendant des années. Des rappels entretiennent cette mémoire.',
        'Si le vrai microbe arrive, le corps le reconnaît tout de suite et réagit vite et fort : on ne tombe pas malade, ou beaucoup moins.',
        'Quand beaucoup de gens sont vaccinés, le microbe circule moins : on protège aussi ceux qui ne peuvent pas être vaccinés.',
      ],
    },

    decouverte: {
      texte: (c) => 'Se faire vacciner, c’est apprendre au corps à reconnaître un microbe avant de le rencontrer : il en garde ' + c.mot('memoire') + '. ' +
        'C’est une protection pour soi, et pour les autres, quand une grande partie de la population est vaccinée. ' +
        'L’astuce : le vaccin, c’est un entraînement sans danger, avant le vrai match.',
    },

    vocabulaire: {
      termes: {
        memoire: { sesMots: 'un souvenir', officiel: 'une mémoire immunitaire', lesDeux: 'un souvenir, que les scientifiques appellent une mémoire immunitaire' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le corps garde un souvenir du microbe, et réagit plus vite la fois suivante. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une mémoire immunitaire. Et la part de la population qui est vaccinée s’appelle la couverture vaccinale.',
        'Tu connais les mots officiels : la vaccination crée une mémoire immunitaire ; une bonne couverture vaccinale protège toute la population.',
      ],
    },

    exercices: [
      {
        id: 'que-contient',
        univers: 'famille',
        versions: [1, 2, 3],
        genere(c) {
          return {
            enonce: 'Que contient un vaccin ?',
            reponse: O.choix(c.alea, CONTIENT, ['Un médicament qui tue les bactéries', 'Des microbes dangereux et actifs']),
            aide: 'Il ne doit pas rendre malade, mais montrer le microbe au corps.',
            correction: ['Réponse : ' + CONTIENT + '.'],
          };
        },
      },
      {
        id: 'couverture',
        univers: 'dehors',
        // [habitants, vaccinés]
        versions: [[200, 180], [500, 450], [400, 380], [1000, 950], [300, 270], [800, 760]],
        genere(c) {
          const [n, v] = c.alea.choisir(this.versions);
          const p = (v * 100) / n;
          return {
            enonce: 'Dans un village de ' + n + ' habitants, ' + v + ' sont vaccinés contre la rougeole. Quel pourcentage des habitants est vacciné ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + v + ' ÷ ' + n + ' × 100.',
            aideParlee: 'Divise le nombre de vaccinés par le nombre d’habitants, puis multiplie par cent.',
            correction: [v + ' ÷ ' + n + ' × 100 = ' + p + ' %.'],
          };
        },
      },
      {
        id: 'non-vaccines',
        univers: 'dehors',
        versions: [[200, 180], [500, 450], [400, 380], [1000, 950], [300, 270], [800, 760]],
        genere(c) {
          const [n, v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un quartier de ' + n + ' habitants, ' + v + ' sont vaccinés. Combien de personnes ne le sont pas ?',
            reponse: { type: 'nombre', valeur: n - v },
            aide: 'Calcule ' + n + ' − ' + v + '.',
            aideParlee: 'Fais la différence entre tous les habitants et les vaccinés.',
            correction: [n + ' − ' + v + ' = ' + (n - v) + ' personnes.'],
          };
        },
      },
      {
        id: 'prochain-rappel',
        univers: 'famille',
        // [âge du dernier rappel, années entre deux rappels]
        versions: [[25, 20], [45, 20], [11, 14], [65, 10], [75, 10], [16, 9]],
        genere(c) {
          const [a, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un vaccin demande un rappel tous les ' + k + ' ans. Le dernier rappel a été fait à ' + a + ' ans. À quel âge faudra-t-il le prochain ?',
            reponse: { type: 'nombre', valeur: a + k },
            aide: 'Calcule ' + a + ' + ' + k + '.',
            aideParlee: 'Ajoute la durée entre deux rappels à l’âge du dernier rappel.',
            correction: [a + ' + ' + k + ' = ' + (a + k) + ' ans.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'famille',
        versions: [['On se fait vacciner avant d’être malade.', true], ['Un vaccin soigne une maladie qu’on a déjà.', false], ['Se faire vacciner protège aussi les autres.', true], ['La mémoire du vaccin dure toujours, sans aucun rappel, pour tous les vaccins.', false]],
        genere(c) {
          const [phrase, vrai] = c.alea.choisir(this.versions);
          const bonne = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Vrai ou faux ? « ' + phrase + ' »',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Le vaccin prépare le corps à l’avance ; certains demandent des rappels.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      versions: [[30, 27], [25, 24], [32, 28], [28, 21], [20, 19], [36, 27]],
      genere(c) {
        const [n, v] = c.alea.choisir(this.versions);
        const p = Math.round((v * 1000) / n) / 10;
        return {
          enonce: 'Dans la classe d’Aminata, ' + v + ' élèves sur ' + n + ' sont vaccinés contre une maladie.',
          questions: [
            {
              texte: 'Question 1. Combien d’élèves ne sont pas vaccinés ?',
              reponse: { type: 'nombre', valeur: n - v },
              aide: 'Fais la différence.',
              correction: [n + ' − ' + v + ' = ' + O.nb(n - v, 'élève') + '.'],
            },
            {
              texte: 'Question 2. Quel pourcentage des élèves est vacciné ? Arrondis au dixième.',
              reponse: { type: 'nombre', valeur: p },
              aide: 'Divise le nombre de vaccinés par le nombre d’élèves, puis multiplie par 100.',
              correction: [v + ' ÷ ' + n + ' × 100 ≈ ' + String(p).replace('.', ',') + ' %.'],
            },
            {
              texte: 'Question 3. Explique comment le vaccin protège Aminata, et pourquoi il protège aussi les élèves non vaccinés.',
              correction: ['Le vaccin apprend au corps à reconnaître le microbe ; il en garde la mémoire et réagit vite s’il le rencontre.', 'Si presque tout le monde est vacciné, le microbe circule peu : les élèves non vaccinés sont moins exposés.'],
              grille: ['As-tu parlé de la mémoire du corps ?', 'As-tu expliqué la réaction plus rapide ?', 'As-tu parlé de la protection des autres ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un entraînement sans danger avant le vrai match : tu sais comment un vaccin protège, toi et les autres.',
    carte: ['que-contient', 'couverture', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['couverture', 'prochain-rappel'], defi: true },
    automatismes: [
      {
        id: 'pourcentage-rapide',
        versions: [[100, 90], [200, 180], [50, 45], [20, 19]],
        genere(c) { const [n, v] = c.alea.choisir(this.versions); return { enonce: v + ' vaccinés sur ' + n + ' : quel pourcentage ?', reponse: { type: 'nombre', valeur: (v * 100) / n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Boston, Onesimus, un homme réduit en esclavage, a fait connaître une pratique africaine contre la variole, qui a inspiré l’inoculation dans la ville.',
    prenoms: ['Laure', 'Rachel', 'Aminata'],
  };
});
