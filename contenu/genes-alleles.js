/* Notion 11 du bloc SVT « Le vivant et son évolution » : les gènes et les allèles. La sauce de Laure et les pois de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const GENE = 'Un gène', ALLELE = 'Un allèle', CHROMOSOME = 'Un chromosome';
  const VIOLET = 'Violette', BLANC = 'Blanche';

  return {
    id: 'genes-alleles',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Les gènes et les allèles',
    classe: '3e',
    univers: ['cuisine-restaurant', 'champetre', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : gènes, allèles, transmission des caractères héréditaires.',

    accroche: {
      texte: 'Dans le carnet de Laure, il y a une recette de sauce d’arachide. Laure a trois manières de la faire : douce, pimentée, très pimentée. La recette reste la même, seule sa version change. ' +
        'Dans tes chromosomes, c’est pareil : des recettes, et des versions de ces recettes.',
      image: { dessin: 'chaine', etapes: ['Un livre de recettes', 'Une recette', 'Une version de la recette'], description: 'Un livre de recettes contient une recette, et cette recette a plusieurs versions.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Violettes', parts: 3 }, { nom: 'Blanches', parts: 1 }], description: 'Deux barres : trois parts de plantes à fleurs violettes pour une part de plantes à fleurs blanches.' },
      etapes: [
        'Une recette est un morceau d’ADN, à une place précise sur un chromosome. Elle porte l’information d’un caractère, comme la couleur d’une fleur.',
        'Chez le pois, cette recette existe en deux versions : violette et blanche.',
        'Une plante a deux versions de la recette : une venue de chaque parent, sur chaque chromosome de la paire.',
        'Si elle a une version violette et une version blanche, sa fleur est violette : la version violette masque l’autre.',
        'Pour avoir une fleur blanche, il lui faut deux versions blanches.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’information d’un caractère est portée par ' + c.mot('gene') + '. Cette information existe sous plusieurs formes : ' + c.mot('allele') + '. ' +
        'Tu reçois deux formes pour chaque caractère, une de chaque parent. Parfois, l’une masque l’autre. ' +
        'L’astuce : pense à une recette, qui peut avoir plusieurs versions.',
    },

    vocabulaire: {
      termes: {
        gene: { sesMots: 'une recette de l’ADN', officiel: 'un gène', lesDeux: 'une recette de l’ADN, que les scientifiques appellent un gène' },
        allele: { sesMots: 'les versions', officiel: 'les allèles', lesDeux: 'les versions, que les scientifiques appellent les allèles' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la recette, et ses versions. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : un gène, pour la recette. Ses versions sont les allèles. Celui qui masque l’autre est dominant, celui qui est masqué est récessif.',
        'Tu connais les mots officiels : le gène, l’allèle, dominant et récessif.',
      ],
    },

    exercices: [
      O.qcm('gene-allele-chromosome', 'cuisine-restaurant',
        [['Un morceau d’ADN qui porte l’information d’un caractère', GENE], ['Une version de cette information', ALLELE], ['Le long bâtonnet qui porte de nombreuses recettes', CHROMOSOME]].map((v) => [v[0], v[1], 'Un chromosome porte de nombreux gènes. Un gène porte l’information d’un caractère. Un allèle est une version de ce gène.']),
        (x) => x + ' : qu’est-ce que c’est ?', [GENE, ALLELE, CHROMOSOME],
        'Chapitre, recette, version de la recette.'),
      O.qcm('quelle-couleur', 'champetre',
        [['Une version violette et une version blanche', VIOLET], ['Deux versions violettes', VIOLET], ['Deux versions blanches', BLANC]].map((v) => [v[0], v[1], 'L’allèle violet masque l’allèle blanc : il suffit d’un seul. Pour une fleur blanche, il faut deux allèles blancs.']),
        (x) => 'Chez le pois, la version violette masque la blanche. De quelle couleur est la fleur avec : ' + x.toLowerCase() + ' ?', [VIOLET, BLANC],
        'Une seule version violette suffit pour que la fleur soit violette.'),
      O.qcm('d-ou-viennent', 'famille',
        [['D’où viennent tes deux versions d’un même gène ?', 'De chacun de tes deux parents'], ['D’où reçois-tu les deux allèles d’un gène ?', 'De chacun de tes deux parents']].map((v) => [v[0], v[1], 'Dans chaque paire de chromosomes, l’un vient de la mère et l’autre du père.']),
        (x) => x, ['De chacun de tes deux parents', 'Seulement de ta mère', 'Seulement de ton père'],
        'Dans chaque paire de chromosomes, l’un vient de la mère et l’autre du père.'),
      {
        id: 'trois-quarts',
        univers: 'champetre',
        // nombre de plantes
        versions: [400, 200, 800, 100, 120, 1000],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa sème ' + n + ' pois. Les trois quarts donnent des fleurs violettes. Combien de plantes ont des fleurs violettes ?',
            reponse: { type: 'nombre', valeur: (n * 3) / 4 },
            aide: 'Divise ' + n + ' par 4, puis multiplie par 3.',
            aideParlee: 'Divise par quatre, puis multiplie par trois.',
            correction: [n + ' ÷ 4 = ' + n / 4 + '.', n / 4 + ' × 3 = ' + (n * 3) / 4 + ' plantes.'],
          };
        },
      },
      {
        id: 'versions-d-un-gene',
        univers: 'famille',
        // gènes observés
        versions: [3, 5, 8, 10, 12, 20],
        genere(c) {
          const g = c.alea.choisir(this.versions);
          return {
            enonce: 'Combien d’allèles une personne porte-t-elle en tout, pour ' + g + ' gènes différents, sachant qu’elle en a deux par gène ?',
            reponse: { type: 'nombre', valeur: 2 * g },
            aide: 'Calcule ' + g + ' × 2.',
            aideParlee: 'Multiplie le nombre de gènes par deux.',
            correction: [g + ' × 2 = ' + 2 * g + ' allèles.'],
          };
        },
      },
    ],

    defi: {
      // [plantes à fleurs violettes, plantes à fleurs blanches]
      versions: [[300, 100], [150, 50], [600, 200], [90, 30]],
      genere(c) {
        const [v, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : on croise deux plantes de pois à fleurs violettes. Chacune porte un allèle violet et un allèle blanc. Parmi leurs descendants, on compte ' + v + ' plantes à fleurs violettes et ' + b + ' plantes à fleurs blanches.',
          image: { dessin: 'barres', barres: [{ nom: 'Violettes', parts: 3 }, { nom: 'Blanches', parts: 1 }], description: 'Deux barres : trois parts de fleurs violettes pour une part de fleurs blanches.' },
          questions: [
            {
              texte: 'Question 1. Combien y a-t-il de descendants en tout ?',
              reponse: { type: 'nombre', valeur: v + b },
              aide: 'Additionne les deux nombres.',
              correction: [v + ' + ' + b + ' = ' + (v + b) + ' plantes.'],
            },
            {
              texte: 'Question 2. Combien de fois plus de fleurs violettes que de fleurs blanches y a-t-il ?',
              reponse: { type: 'nombre', valeur: v / b },
              aide: 'Divise le nombre de fleurs violettes par le nombre de fleurs blanches.',
              correction: [v + ' ÷ ' + b + ' = ' + v / b + ' fois plus.'],
            },
            {
              texte: 'Question 3. Les deux parents ont des fleurs violettes. Explique comment certains descendants peuvent avoir des fleurs blanches.',
              correction: ['Chaque parent porte un allèle blanc, masqué par l’allèle violet.', 'Un descendant qui reçoit l’allèle blanc de chacun de ses deux parents a deux allèles blancs : sa fleur est blanche.'],
              grille: ['As-tu dit que l’allèle blanc est masqué, ou récessif ?', 'As-tu dit que chaque parent peut le transmettre ?', 'As-tu dit qu’il faut deux allèles blancs ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Gène, allèle, version cachée : tu comprends pourquoi une couleur peut sauter une génération.',
    carte: ['gene-allele-chromosome', 'quelle-couleur', 'd-ou-viennent'],
    papierDuSoir: { exercices: ['trois-quarts', 'versions-d-un-gene'], defi: true },
    automatismes: [
      {
        id: 'quart-rapide',
        versions: [40, 80, 100, 200],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: 'Le quart de ' + n + ' = ?', reponse: { type: 'nombre', valeur: n / 4 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Brno, aujourd’hui en Tchéquie, Gregor Mendel a suivi plus de 10 000 plants de petits pois.',
    prenoms: ['Laure', 'Moussa'],
  };
});
