/* Notion 10 du bloc SVT « Le vivant et son évolution » : les chromosomes et l'ADN. Les photos de famille de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const POUPEES = ['Le corps', 'Une cellule', 'Le noyau', 'Un chromosome', 'L’ADN'];

  return {
    id: 'chromosomes-adn',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Les chromosomes et l’ADN',
    classe: '3e',
    univers: ['famille', 'cuisine-restaurant'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : ADN, chromosomes, information génétique dans le noyau.',

    accroche: {
      texte: 'Rachel regarde les photos de famille avec Laure. Le même sourire, la même forme de nez, d’une génération à l’autre. ' +
        'Cette ressemblance ne doit rien au hasard : elle a une adresse, au cœur de chaque cellule. Allons voir ce qu’il y a dans le noyau.',
      image: { dessin: 'chromosomes', legende: '3 paires ; un trait : venu du père', description: 'Six bâtonnets rangés par paires : deux grands, deux moyens, deux petits. Dans chaque paire, l’un vient de la mère, l’autre du père.' },
    },

    manipulation: {
      type: 'chromosomes',
      but: 'apparier',
      consigne: 'Voici une cellule imaginaire, avec six bâtonnets. Forme les paires : choisis deux bâtonnets de même taille, un de la mère et un du père.',
    },

    decouverte: {
      texte: (c) => 'Dans le noyau de presque chaque cellule, il y a ' + c.mot('chromosomes') + '. Chez l’être humain, on en compte 46, rangés en 23 paires. Dans chaque paire, l’un vient de la mère, l’autre du père. ' +
        'Chacun est fait d’une très longue molécule : ' + c.mot('adn') + '. ' +
        'L’astuce : le noyau est une bibliothèque, chaque paire un livre en deux exemplaires, et le texte, c’est cette molécule.',
    },

    vocabulaire: {
      termes: {
        chromosomes: { sesMots: 'des bâtonnets', officiel: 'des chromosomes', lesDeux: 'des bâtonnets, que les scientifiques appellent des chromosomes' },
        adn: { sesMots: 'le long fil d’information', officiel: 'l’ADN', lesDeux: 'le long fil d’information, que les scientifiques appellent l’ADN' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les bâtonnets du noyau, et le long fil d’information. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : des chromosomes, pour les bâtonnets, et l’ADN, pour le long fil d’information. Il a la forme d’une double hélice, comme une échelle tordue.',
        'Tu connais les mots officiels : le noyau, les chromosomes, l’ADN et la double hélice.',
      ],
    },

    exercices: [
      {
        id: 'qui-contient-quoi',
        univers: 'famille',
        versions: [0, 1, 2, 3],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = POUPEES[i + 1];
          return {
            enonce: 'Du plus grand au plus petit : que trouve-t-on juste à l’intérieur de cet élément : ' + POUPEES[i].toLowerCase() + ' ?',
            reponse: O.choix(c.alea, bonne, POUPEES.filter((_, k) => k !== i)),
            aide: 'Corps, cellule, noyau, chromosome : pense à des poupées emboîtées.',
            correction: ['L’ordre : ' + POUPEES.join(', puis ').toLowerCase().replace('l’adn', 'l’ADN') + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'famille',
        [['Dans chaque paire, un chromosome vient de la mère et l’autre du père.', 'Vrai'], ['L’ADN se trouve dans le noyau de la cellule.', 'Vrai'], ['Une cellule humaine du corps a 23 chromosomes en tout.', 'Faux'], ['L’ADN est un organe.', 'Faux']].map((v) => [v[0], v[1], 'Dans le noyau, l’être humain a 23 paires, soit 46 chromosomes, dont une moitié vient de chaque parent. L’ADN est une molécule, pas un organe.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Vingt-trois paires, c’est quarante-six chromosomes.'),
      O.qcm('a-quoi-sert-adn', 'cuisine-restaurant',
        [['Comme une recette, que porte l’ADN ?', 'Une information héréditaire'], ['Quel est le rôle de l’ADN ?', 'Une information héréditaire']].map((v) => [v[0], v[1], 'L’ADN porte une information transmise aux descendants, comme un texte écrit dans chaque cellule.']),
        (x) => x, ['Une information héréditaire', 'De l’énergie', 'Du dioxygène'],
        'Pense à la bibliothèque et à son texte.'),
      {
        id: 'paires-en-chromosomes',
        univers: 'famille',
        // paires de chromosomes
        versions: [23, 39, 19, 10, 22, 12],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          return {
            enonce: 'Une espèce a ' + p + ' paires de chromosomes. Combien de chromosomes ont ses cellules du corps ?',
            reponse: { type: 'nombre', valeur: 2 * p },
            aide: 'Une paire, c’est 2 chromosomes. Calcule ' + p + ' × 2.',
            aideParlee: 'Une paire, c’est deux chromosomes. Multiplie par deux.',
            correction: [p + ' × 2 = ' + 2 * p + ' chromosomes.'],
          };
        },
      },
      {
        id: 'chromosomes-en-paires',
        univers: 'famille',
        // chromosomes
        versions: [46, 78, 38, 20, 44, 24],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Les cellules du corps d’une espèce ont ' + n + ' chromosomes. Combien de paires cela fait-il ?',
            reponse: { type: 'nombre', valeur: n / 2 },
            aide: 'Calcule ' + n + ' ÷ 2.',
            aideParlee: 'Divise par deux.',
            correction: [n + ' ÷ 2 = ' + n / 2 + ' paires.'],
          };
        },
      },
    ],

    defi: {
      // [chromosomes d'une espèce A, d'une espèce B]
      versions: [[46, 78], [38, 46], [20, 38], [78, 44]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : on a photographié les chromosomes d’une cellule du corps de deux espèces, puis on les a rangés par paires. Ce rangement s’appelle un caryotype. L’espèce A a ' + a + ' chromosomes, l’espèce B en a ' + b + '.',
          image: { dessin: 'chromosomes', legende: 'Très simplifié ; un trait : venu du père', description: 'Un caryotype très simplifié : des bâtonnets rangés par paires et par taille décroissante.' },
          questions: [
            {
              texte: 'Question 1. Combien de paires de chromosomes a l’espèce A ?',
              reponse: { type: 'nombre', valeur: a / 2 },
              aide: 'Divise le nombre de chromosomes par deux.',
              correction: [a + ' ÷ 2 = ' + a / 2 + ' paires.'],
            },
            {
              texte: 'Question 2. Combien de paires a l’espèce B ?',
              reponse: { type: 'nombre', valeur: b / 2 },
              aide: 'Fais le même calcul pour l’autre espèce.',
              correction: [b + ' ÷ 2 = ' + b / 2 + ' paires.'],
            },
            {
              texte: 'Question 3. Explique pourquoi les chromosomes vont par paires dans une cellule du corps.',
              correction: ['Chaque paire réunit un chromosome venu de la mère et un chromosome venu du père.', 'Un individu reçoit donc une moitié de ses chromosomes de chaque parent.'],
              grille: ['As-tu parlé des deux parents ?', 'As-tu dit que chaque paire a un chromosome de chacun ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Noyau, chromosomes, ADN : tu as trouvé où se cache l’héritage de ta famille.',
    carte: ['qui-contient-quoi', 'vrai-ou-faux', 'a-quoi-sert-adn'],
    papierDuSoir: { exercices: ['paires-en-chromosomes', 'chromosomes-en-paires'], defi: true },
    automatismes: [
      {
        id: 'moitie-rapide',
        versions: [46, 78, 38, 20],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: 'La moitié de ' + n + ' = ?', reponse: { type: 'nombre', valeur: n / 2 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Londres, au Royaume-Uni, en 1952, Rosalind Franklin et Raymond Gosling obtiennent une image de l’ADN aux rayons X.',
    prenoms: ['Rachel', 'Laure'],
  };
});
