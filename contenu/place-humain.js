/* Notion 16 du bloc SVT « Le vivant et son évolution » : la place de l'être humain. Le pouce d'Aminata.
   S'en tient à la science du programme, sans jugement sur les croyances : consigne du 2 nov. 2026.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r1 = (x) => Math.round(x * 10) / 10;
  const BOITES = ['Les vertébrés', 'Les mammifères', 'Les primates', 'Les grands singes', 'L’être humain'];

  return {
    id: 'place-humain',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'La place de l’être humain',
    classe: 'cycle 4',
    univers: ['famille', 'danses'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : place de l’être humain dans la classification du vivant, parenté avec les autres espèces.',

    accroche: {
      texte: 'En danse, Aminata attrape son foulard avec le pouce et l’index. Dans un livre, elle voit la main d’un chimpanzé tenir une branche, avec le même geste. Cinq doigts, des ongles, un pouce qui se plie vers les autres. ' +
        'Pourquoi une telle ressemblance ?',
      image: { dessin: 'chaine', etapes: ['L’être humain est un vertébré', 'Et aussi un mammifère', 'Et aussi un primate', 'Et aussi un grand singe'], description: 'Les groupes de l’être humain, du plus large au plus précis : c’est un vertébré, et aussi un mammifère, un primate et un grand singe.' },
    },

    manipulation: {
      image: { dessin: 'parente', description: 'Des boîtes emboîtées. Les vertébrés contiennent le poisson et les tétrapodes. Les tétrapodes contiennent la grenouille, la poule et les mammifères. Les mammifères contiennent le chat et l’être humain.' },
      etapes: [
        'L’être humain a une colonne vertébrale, des poils, des mamelles : c’est un vertébré, et un mammifère.',
        'Comme les singes, il a un pouce qui se plie vers les autres doigts, et des ongles plats.',
        'Le chimpanzé est son plus proche parent actuel. L’humain ne descend pas du chimpanzé : tous deux viennent d’un même lointain parent, disparu depuis des millions d’années.',
        'Notre espèce, Homo sapiens, est la seule espèce humaine encore vivante. Ses plus anciens fossiles sont africains.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’être humain est un mammifère, parmi ' + c.mot('primates') + '. Il partage avec le chimpanzé ' + c.mot('ancetre') + '. ' +
        'Il ne descend pas du chimpanzé d’aujourd’hui : ce sont deux branches voisines d’un même arbre. ' +
        'L’astuce : pense à des cousins, pas à des parents.',
    },

    vocabulaire: {
      termes: {
        primates: { sesMots: 'les animaux au pouce qui attrape', officiel: 'les primates', lesDeux: 'les animaux au pouce qui attrape, que les scientifiques appellent les primates' },
        ancetre: { sesMots: 'un lointain parent disparu', officiel: 'un ancêtre commun', lesDeux: 'un lointain parent disparu, que les scientifiques appellent un ancêtre commun' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les animaux au pouce qui attrape, et le lointain parent disparu. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : les primates, pour les animaux au pouce qui attrape. Et un ancêtre commun, pour le lointain parent disparu.',
        'Tu connais les mots officiels : les primates, l’ancêtre commun et Homo sapiens.',
      ],
    },

    exercices: [
      {
        id: 'boite-suivante',
        univers: 'famille',
        versions: [0, 1, 2, 3],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = BOITES[i + 1];
          return {
            enonce: 'Quel groupe, plus précis, vient juste à l’intérieur de celui-ci : ' + BOITES[i].toLowerCase() + ' ?',
            reponse: O.choix(c.alea, bonne, BOITES.filter((_, k) => k !== i)),
            aide: 'Vertébrés, mammifères, primates, grands singes, être humain.',
            correction: ['L’ordre : ' + BOITES.join(', puis ').toLowerCase() + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'famille',
        [['L’être humain descend du chimpanzé d’aujourd’hui.', 'Faux'], ['L’être humain et le chimpanzé ont un ancêtre commun.', 'Vrai'], ['L’être humain est un mammifère.', 'Vrai'], ['Homo sapiens est la seule espèce humaine encore vivante.', 'Vrai'], ['L’être humain n’appartient à aucun groupe du vivant.', 'Faux']].map((v) => [v[0], v[1], 'L’être humain est un mammifère, et le chimpanzé est un proche parent, sur une branche voisine : ils ont un ancêtre commun. Homo sapiens est la seule espèce humaine vivante.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Pense à des cousins, pas à des parents.'),
      O.qcm('quel-caractere', 'danses',
        [['Quel caractère l’être humain partage-t-il avec les primates ?', 'Un pouce opposable'], ['Quel caractère te permet de saisir ton foulard, comme un chimpanzé tient une branche ?', 'Un pouce opposable']].map((v) => [v[0], v[1], 'Le pouce opposable permet d’attraper : c’est un caractère des primates. Plumes et écailles appartiennent à d’autres groupes.']),
        (x) => x, ['Un pouce opposable', 'Des plumes', 'Des écailles'],
        'Regarde ta main.'),
      {
        id: 'ecart-de-temps',
        univers: 'famille',
        // âges en millions d'années
        versions: [[7, 3.2], [3.2, 0.3], [7, 0.3], [6, 3.2], [5, 0.3], [4, 0.3]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const e = r1(a - b);
          return {
            enonce: 'Un fossile a ' + ecr(a) + ' millions d’années. Un autre a ' + ecr(b) + ' million' + (b >= 2 ? 's' : '') + ' d’années. Combien de millions d’années les séparent ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Calcule ' + ecr(a) + ' − ' + ecr(b) + '.',
            aideParlee: 'Fais la différence entre les deux âges.',
            correction: [ecr(a) + ' − ' + ecr(b) + ' = ' + ecr(e) + ' millions d’années.'],
          };
        },
      },
      {
        id: 'chiffre-en-milliers',
        univers: 'famille',
        // âge en milliers d'années, d'un fossile de notre espèce
        versions: [100, 90, 60, 40, 30, 12],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          return {
            enonce: 'Un fossile d’Homo sapiens a ' + m + ' mille ans. Combien cela fait-il en années ?',
            reponse: { type: 'nombre', valeur: m * 1000 },
            aide: 'Calcule ' + m + ' × 1 000.',
            aideParlee: 'Multiplie par mille.',
            correction: [m + ' × 1 000 = ' + O.ecr(m * 1000) + ' ans.'],
          };
        },
      },
    ],

    defi: {
      // [âge du premier fossile, âge du deuxième, en millions d'années]
      versions: [[7, 3.2], [6, 3.2], [7, 0.3], [3.2, 0.3]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        const e = r1(a - b);
        return {
          enonce: 'Document : un arbre de parenté montre l’être humain et le chimpanzé sur deux branches voisines. Les deux branches partent d’un ancêtre commun. On compare aussi deux fossiles : l’un a ' + ecr(a) + ' millions d’années, l’autre ' + ecr(b) + ' million' + (b >= 2 ? 's' : '') + ' d’années.',
          questions: [
            {
              texte: 'Question 1. Combien de millions d’années séparent ces deux fossiles ?',
              reponse: { type: 'nombre', valeur: e },
              aide: 'Fais la différence entre les deux âges.',
              correction: [ecr(a) + ' − ' + ecr(b) + ' = ' + ecr(e) + ' millions d’années.'],
            },
            {
              texte: 'Question 2. À quel groupe appartiennent à la fois l’être humain et le chimpanzé ?',
              reponse: O.choix(c.alea, 'Les primates', ['Les primates', 'Les poissons', 'Les oiseaux']),
              aide: 'Pense au pouce opposable.',
              correction: ['Les deux ont un pouce opposable.', 'Réponse : Les primates.'],
            },
            {
              texte: 'Question 3. Un élève dit : « Selon la science, l’être humain descend du chimpanzé. » Corrige cette phrase à l’aide du document.',
              correction: ['Le chimpanzé actuel n’est pas notre ancêtre : c’est une espèce vivante, sur une branche voisine.', 'L’être humain et le chimpanzé ont un ancêtre commun, disparu.'],
              grille: ['As-tu dit que cette phrase est fausse ?', 'As-tu parlé des deux branches voisines ?', 'As-tu cité l’ancêtre commun ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Mammifère, primate, cousine des grands singes : tu sais où se place l’être humain sur l’arbre du vivant.',
    carte: ['boite-suivante', 'vrai-ou-faux', 'quel-caractere'],
    papierDuSoir: { exercices: ['ecart-de-temps', 'chiffre-en-milliers'], defi: true },
    automatismes: [
      {
        id: 'fois-mille',
        versions: [3, 7, 12, 30],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' × 1 000 = ?', reponse: { type: 'nombre', valeur: n * 1000 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Maroc, à Jebel Irhoud, des fossiles d’Homo sapiens datent d’environ 300 000 ans : les plus anciens bien datés.',
    prenoms: ['Aminata'],
  };
});
