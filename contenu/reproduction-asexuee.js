/* Notion 8 du bloc SVT « Le vivant et son évolution » : la reproduction asexuée. Les boutures de manioc de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const SEXUEE = 'Reproduction sexuée', ASEXUEE = 'Reproduction asexuée';

  return {
    id: 'reproduction-asexuee',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'La reproduction asexuée',
    classe: 'cycle 4',
    univers: ['champetre', 'cuisine-restaurant'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : reproduction asexuée, bouturage, individus génétiquement identiques.',

    accroche: {
      texte: 'Clarisse coupe une tige de manioc en morceaux, et les plante dans la terre. Pas de fleur, pas de graine. Quelques semaines plus tard, chaque morceau porte des feuilles et des racines. ' +
        'Tous ces pieds seront les mêmes que celui de départ. Comment est-ce possible, avec un seul parent ?',
      image: { dessin: 'chaine', etapes: ['Un pied de manioc', 'Une tige coupée en morceaux', 'Chaque morceau fait des racines', 'De nouveaux pieds identiques'], description: 'Un pied de manioc ; sa tige coupée en morceaux ; chaque morceau fait des racines ; on obtient de nouveaux pieds identiques.' },
    },

    manipulation: {
      image: { dessin: 'doublement', generations: 3, branches: 2, description: 'Une bactérie se coupe en deux, et chacune encore en deux : en trois fois, cela fait huit bactéries identiques.' },
      etapes: [
        'Un morceau de tige contient des cellules capables de fabriquer tout le reste : racines, feuilles, tige.',
        'Le nouveau pied vient d’un seul parent. Il n’y a pas d’union de gamètes.',
        'Il a donc les mêmes caractères héréditaires que son parent.',
        'Ce n’est pas que le manioc. Le fraisier fait des tiges rampantes, la pomme de terre des tubercules, et une bactérie se coupe en deux.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une plante peut naître d’une simple tige, sans gamètes. On parle alors de ' + c.mot('asexuee') + '. Chaque nouvel individu est ' + c.mot('clone') + ' de son parent. ' +
        'C’est simple et rapide. Mais si une maladie touche l’un d’eux, elle peut tous les toucher. ' +
        'L’astuce : un parent, des copies ; deux parents, des individus différents.',
    },

    vocabulaire: {
      termes: {
        asexuee: { sesMots: 'la reproduction à un seul parent', officiel: 'la reproduction asexuée', lesDeux: 'la reproduction à un seul parent, que les scientifiques appellent la reproduction asexuée' },
        clone: { sesMots: 'une copie vivante', officiel: 'un clone', lesDeux: 'une copie vivante, que l’on appelle un clone,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la reproduction à un seul parent, et la copie vivante. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la reproduction asexuée, et un clone pour la copie vivante. Couper une tige pour la replanter, c’est le bouturage.',
        'Tu connais les mots officiels : la reproduction asexuée, le clone et le bouturage.',
      ],
    },

    exercices: [
      O.qcm('sexuee-ou-asexuee', 'champetre',
        [['On plante un morceau de tige de manioc.', ASEXUEE], ['Une abeille transporte du pollen, puis une courge se forme.', SEXUEE], ['Une bactérie se coupe en deux.', ASEXUEE], ['Un fraisier fait une tige rampante, qui prend racine plus loin.', ASEXUEE], ['Un coq et une poule ont des poussins.', SEXUEE]].map((v) => [v[0], v[1], 'Avec un seul parent et sans gamètes, la reproduction est asexuée. Avec deux parents et des gamètes, elle est sexuée.']),
        (x) => x + ' De quel mode de reproduction s’agit-il ?', [SEXUEE, ASEXUEE],
        'Y a-t-il deux parents et des gamètes, ou un seul parent ?'),
      O.qcm('copie-ou-pas', 'champetre',
        [['Deux pieds de manioc venus de la même tige', 'Identiques par leurs gènes'], ['Deux graines d’une même courge', 'Différents par leurs gènes'], ['Deux bactéries issues de la même bactérie', 'Identiques par leurs gènes']].map((v) => [v[0], v[1], 'Un seul parent donne des copies aux mêmes gènes. Deux graines viennent de gamètes différents.']),
        (x) => x + ' : que peut-on dire ?', ['Identiques par leurs gènes', 'Différents par leurs gènes'],
        'Un seul parent donne des copies. Deux parents mélangent leurs gamètes.'),
      O.qcm('avantage', 'cuisine-restaurant',
        [['Pourquoi les paysans bouturent-ils le manioc qu’ils aiment ?', 'Pour garder les mêmes qualités'], ['Quel est l’intérêt de planter des boutures d’une variété très bonne ?', 'Pour garder les mêmes qualités']].map((v) => [v[0], v[1], 'Une bouture a les mêmes gènes que sa plante : elle garde ses qualités. Elle n’est pas protégée de toutes les maladies.']),
        (x) => x, ['Pour garder les mêmes qualités', 'Pour avoir des plantes toutes différentes', 'Pour éviter toute maladie'],
        'Une bouture est une copie de sa plante.'),
      {
        id: 'boutures-d-une-tige',
        univers: 'champetre',
        // [longueur de tige en cm, longueur d'une bouture en cm]
        versions: [[100, 25], [120, 20], [150, 25], [90, 15], [80, 20], [200, 25]],
        genere(c) {
          const [l, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Clarisse a une tige de manioc de ' + l + ' cm. Chaque bouture mesure ' + b + ' cm. Combien de boutures peut-elle couper ?',
            reponse: { type: 'nombre', valeur: l / b },
            aide: 'Calcule ' + l + ' ÷ ' + b + '.',
            aideParlee: 'Divise la longueur de la tige par la longueur d’une bouture.',
            correction: [l + ' ÷ ' + b + ' = ' + l / b + ' boutures.'],
          };
        },
      },
      {
        id: 'bacteries-en-deux',
        univers: 'cuisine-restaurant',
        // nombre de divisions
        versions: [2, 3, 4, 5, 6],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Une bactérie se coupe en deux, puis chaque bactérie se coupe à son tour. Cela arrive ' + n + ' fois. Combien de bactéries y a-t-il à la fin ?',
            reponse: { type: 'nombre', valeur: 2 ** n },
            aide: 'Multiplie 2 par lui-même, ' + n + ' fois.',
            aideParlee: 'Multiplie deux par lui-même, autant de fois qu’il y a de divisions.',
            correction: [Array(n).fill(2).join(' × ') + ' = ' + 2 ** n + ' bactéries.'],
          };
        },
      },
    ],

    defi: {
      // [pieds par champ, pieds malades du champ de boutures, pieds malades du champ de graines]
      versions: [[100, 80, 20], [200, 150, 50], [120, 90, 30], [100, 70, 10]],
      genere(c) {
        const [n, a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : deux champs de ' + n + ' pieds subissent la même maladie. Le champ A vient de boutures d’un seul pied. Le champ B vient de graines différentes. Dans le champ A, ' + a + ' pieds sont malades. Dans le champ B, ' + b + ' pieds le sont.',
          questions: [
            {
              texte: 'Question 1. Combien de pieds sont restés sains dans le champ A ?',
              reponse: { type: 'nombre', valeur: n - a },
              aide: 'Enlève les pieds malades au nombre total de pieds.',
              correction: [n + ' − ' + a + ' = ' + (n - a) + ' pieds sains.'],
            },
            {
              texte: 'Question 2. Combien de pieds sont restés sains dans le champ B ?',
              reponse: { type: 'nombre', valeur: n - b },
              aide: 'Fais le même calcul pour l’autre champ.',
              correction: [n + ' − ' + b + ' = ' + (n - b) + ' pieds sains.'],
            },
            {
              texte: 'Question 3. Explique pourquoi la maladie touche davantage le champ A.',
              correction: ['Les pieds du champ A sont des clones : ils ont tous les mêmes gènes, donc la même fragilité.', 'Les pieds du champ B sont différents : certains résistent mieux. La diversité protège la population.'],
              grille: ['As-tu dit que le champ A est fait de clones ?', 'As-tu parlé de la diversité du champ B ?', 'As-tu relié cette diversité à la résistance à la maladie ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une tige, des copies, et le risque qui va avec : tu sais bouturer et tu sais pourquoi.',
    carte: ['sexuee-ou-asexuee', 'copie-ou-pas', 'avantage'],
    papierDuSoir: { exercices: ['boutures-d-une-tige', 'bacteries-en-deux'], defi: true },
    automatismes: [
      {
        id: 'puissance-de-deux',
        versions: [2, 3, 4, 5],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: '2 multiplié ' + n + ' fois par lui-même = ?', reponse: { type: 'nombre', valeur: 2 ** n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, des boutures de manioc amélioré ont été multipliées, puis distribuées aux paysans de 221 villages.',
    prenoms: ['Clarisse'],
  };
});
