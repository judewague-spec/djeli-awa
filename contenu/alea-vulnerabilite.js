/* Notion 5 du bloc SVT « Planète Terre, environnement, action humaine » : aléa, enjeu, vulnérabilité. Le séisme et les deux villages.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ALEA = 'Un aléa', ENJEUX = 'Des enjeux', VULN = 'La vulnérabilité';
  const QA = 'Le quartier A', QB = 'Le quartier B';

  return {
    id: 'alea-vulnerabilite',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Aléa, enjeu, vulnérabilité',
    classe: 'cycle 4',
    univers: ['famille', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : aléa, enjeux, vulnérabilité et risque.',

    accroche: {
      texte: 'Le sol a tremblé hier soir. Dans le village de Moussa, des murs sont tombés. Dans la ville voisine, presque rien n’a bougé. ' +
        'Pourtant, la secousse était la même. Laure demande à Rachel : « Comment l’expliques-tu ? »',
      image: { dessin: 'tableur', colonnes: ['Lieu', 'Village de Moussa', 'Ville voisine'], lignes: [['Dégâts', 'Importants', 'Très faibles']], description: 'Un tableau. Après la même secousse, les dégâts sont importants dans le village de Moussa, et très faibles dans la ville voisine.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Donnée', 'Village A', 'Village B'], lignes: [['Habitants', 500, 500], ['Maisons solides, sur 100', 10, 90], ['Maisons détruites, sur 100', 30, 2]], description: 'Un tableau. Chaque village compte 500 habitants. Maisons solides sur 100 : 10 au village A, 90 au village B. Maisons détruites sur 100 : 30 au village A, 2 au village B.' },
      etapes: [
        'Un séisme secoue deux villages. La secousse est la même dans les deux.',
        'Dans chaque village, vivent cinq cents habitants : il y a autant de personnes à protéger.',
        'Village A : seulement dix maisons sur cent sont construites pour résister aux secousses.',
        'Village B : quatre-vingt-dix maisons sur cent sont construites pour résister.',
        'Résultat : trente maisons détruites sur cent dans le village A, et seulement deux dans le village B.',
        'Même secousse, mais pas les mêmes dégâts : tout dépend de ce qu’il y a à protéger, et de sa solidité.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde un séisme, une crue ou une tempête : c’est ' + c.mot('alea') + '. ' +
        'Regarde les personnes, les maisons et les champs qui se trouvent sur place : ce sont ' + c.mot('enjeux') + '. ' +
        'Regarde à quel point ces maisons peuvent être abîmées : c’est ' + c.mot('vulnerabilite') + '. ' +
        'Le risque, c’est la rencontre de ces trois idées. Sans personne à protéger, il n’y a aucun risque : une crue dans un désert vide ne menace personne. ' +
        'L’astuce : le même séisme ne fait pas les mêmes dégâts partout.',
    },

    vocabulaire: {
      termes: {
        alea: { sesMots: 'ce qui peut arriver', officiel: 'l’aléa', lesDeux: 'ce qui peut arriver, que l’on appelle l’aléa' },
        enjeux: { sesMots: 'les choses qu’on peut perdre', officiel: 'les enjeux', lesDeux: 'les choses qu’on peut perdre, que l’on appelle les enjeux' },
        vulnerabilite: { sesMots: 'la fragilité', officiel: 'la vulnérabilité', lesDeux: 'la fragilité, que l’on appelle la vulnérabilité' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce qui peut arriver, les choses qu’on peut perdre, et la fragilité. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : l’aléa, pour ce qui peut arriver. Les choses qu’on peut perdre s’appellent les enjeux. La fragilité s’appelle la vulnérabilité.',
        'Tu connais les mots officiels : l’aléa, les enjeux, la vulnérabilité, et le risque, qui naît de leur croisement.',
      ],
    },

    exercices: [
      O.qcm('alea-enjeu-vulnerabilite', 'dehors',
        [
          ['Une crue peut arriver chaque printemps.', ALEA, 'Un phénomène naturel qui peut se produire est un aléa.'],
          ['Dix maisons et une école sont près de la rivière.', ENJEUX, 'Des personnes et des biens exposés sont des enjeux.'],
          ['Les maisons sont en bois fragile, sans protection.', VULN, 'Des maisons qui résistent mal montrent une vulnérabilité.'],
          ['Un volcan peut entrer en éruption.', ALEA, 'Une éruption possible est un aléa.'],
          ['Beaucoup de gens vivent au pied de la montagne.', ENJEUX, 'Des habitants exposés sont des enjeux.'],
          ['Le toit de l’école est ancien et peu solide.', VULN, 'Un bâtiment qui résiste mal montre une vulnérabilité.'],
        ],
        (x) => x + ' Est-ce un aléa, des enjeux ou la vulnérabilité ?', [ALEA, ENJEUX, VULN],
        'L’aléa peut arriver. Les enjeux peuvent être perdus. La vulnérabilité dit si c’est fragile.'),
      O.qcm('vrai-ou-faux', 'famille',
        [
          ['Le même séisme fait toujours les mêmes dégâts partout.', 'Faux', 'Les dégâts dépendent des habitants présents et de la solidité des constructions.'],
          ['Un séisme dans une région sans aucun habitant ne menace personne.', 'Vrai', 'Sans enjeux, il n’y a pas de risque pour les personnes.'],
          ['Le risque naît du croisement d’un aléa et d’enjeux.', 'Vrai', 'Il faut un phénomène possible, et quelque chose à perdre sur place.'],
          ['Construire des maisons solides diminue la vulnérabilité.', 'Vrai', 'Des maisons plus solides résistent mieux : la vulnérabilité baisse.'],
          ['On peut empêcher un séisme de se produire.', 'Faux', 'On ne peut pas empêcher un séisme, mais on peut réduire ses dégâts.'],
        ],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Pense à trois idées : ce qui peut arriver, ce qu’on peut perdre, et la solidité.'),
      {
        id: 'maisons-touchees',
        univers: 'famille',
        // [maisons du village, part touchée en pour cent]
        versions: [[200, 15], [400, 10], [300, 20], [500, 4], [250, 8]],
        genere(c) {
          const [n, p] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un village compte ' + n + ' maisons. Après un séisme, ' + p + ' pour cent de ces maisons sont touchées. Combien de maisons sont touchées ?',
            reponse: { type: 'nombre', valeur: (n * p) / 100 },
            aide: 'Multiplie le nombre de maisons par la part touchée, puis divise par 100.',
            correction: [n + ' × ' + p + ' ÷ 100 = ' + (n * p) / 100 + ' maisons touchées.'],
          };
        },
      },
      {
        id: 'personnes-exposees',
        univers: 'dehors',
        // [maisons, habitants par maison, élèves de l'école]
        versions: [[12, 4, 60], [10, 5, 80], [15, 3, 90], [20, 4, 70], [8, 5, 100]],
        genere(c) {
          const [m, h, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une crue menace une rue de ' + m + ' maisons, avec ' + h + ' habitants dans chacune, et l’école voisine, qui accueille ' + e + ' élèves. Combien de personnes sont exposées ?',
            reponse: { type: 'nombre', valeur: m * h + e },
            aide: 'Calcule d’abord les habitants de la rue, puis ajoute les élèves.',
            correction: [m + ' × ' + h + ' = ' + m * h + ' habitants.', m * h + ' + ' + e + ' = ' + (m * h + e) + ' personnes exposées.'],
          };
        },
      },
      O.qcm('quartier-risque', 'dehors',
        [
          [['20 maisons, sans digue', '20 maisons, protégées par une digue'], QA, 'Même nombre de maisons, mais le quartier A est plus fragile : rien ne le protège.'],
          [['5 maisons, protégées par une digue', '5 maisons, sans digue'], QB, 'Même nombre de maisons, mais le quartier B est plus fragile : rien ne le protège.'],
          [['60 maisons, sans digue', '6 maisons, sans digue'], QA, 'Même fragilité, mais le quartier A a bien plus de maisons à perdre : plus d’enjeux.'],
          [['8 maisons, sans digue', '80 maisons, sans digue'], QB, 'Même fragilité, mais le quartier B a bien plus de maisons à perdre : plus d’enjeux.'],
        ],
        (x) => 'Une même crue arrive sur deux quartiers. Quartier A : ' + x[0] + '. Quartier B : ' + x[1] + '. Lequel risque le plus de dégâts ?', [QA, QB],
        'Compare ce qu’il y a à perdre, puis la protection de chaque quartier.'),
    ],

    defi: {
      // [maisons par village, part détruite au village A, au village B] en pour cent
      versions: [[400, 25, 5], [200, 10, 30], [500, 20, 4], [300, 2, 12]],
      genere(c) {
        const [n, a, b] = c.alea.choisir(this.versions);
        const ecart = (n * Math.abs(a - b)) / 100;
        const juste = a > b ? 'Le village A' : 'Le village B';
        return {
          enonce: 'Aminata compare deux villages après un même séisme. Il y a autant de maisons et d’habitants dans chaque village : ' + n + ' maisons. Dans le village A, ' + a + ' pour cent des maisons sont détruites. Dans le village B, ' + b + ' pour cent.',
          image: { dessin: 'batons', valeurs: [['Village A', a], ['Village B', b]], axe: 'maisons détruites, pour cent', description: 'Un diagramme en bâtons : ' + a + ' pour cent de maisons détruites au village A, et ' + b + ' pour cent au village B.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la différence entre les deux villages, en nombre de maisons détruites ?',
              reponse: { type: 'nombre', valeur: ecart },
              aide: 'Calcule l’écart des deux parts en pour cent, puis la part correspondante des maisons.',
              correction: ['Écart des parts : ' + Math.abs(a - b) + ' pour cent.', n + ' × ' + Math.abs(a - b) + ' ÷ 100 = ' + ecart + ' maisons.'],
            },
            {
              texte: 'Question 2. Les deux villages ont subi le même séisme et ont autant d’habitants. Lequel est le plus vulnérable ?',
              reponse: O.choix(c.alea, juste, ['Le village A', 'Le village B']),
              aide: 'Le village le plus vulnérable est celui où les maisons résistent le moins.',
              correction: ['Même séisme, mêmes enjeux : le village qui perd le plus de maisons est le plus fragile.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 3. Explique pourquoi un même séisme ne fait pas les mêmes dégâts dans deux villages. Utilise les mots aléa, enjeux et vulnérabilité.',
              correction: ['Le séisme est l’aléa, et il est le même dans les deux villages.', 'Les enjeux sont les habitants et les maisons exposés.', 'La vulnérabilité change : des maisons plus solides subissent moins de dégâts, donc le risque est plus faible.'],
              grille: ['As-tu dit que le séisme est l’aléa, le même pour les deux villages ?', 'As-tu cité les enjeux (habitants, maisons) ?', 'As-tu expliqué que la solidité des maisons change la vulnérabilité ?', 'As-tu conclu que les dégâts, donc le risque, ne sont pas les mêmes ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le danger dépend aussi de ce que nous construisons.',
    carte: ['alea-enjeu-vulnerabilite', 'vrai-ou-faux', 'quartier-risque'],
    papierDuSoir: { exercices: ['maisons-touchees', 'personnes-exposees'], defi: true },
    automatismes: [
      {
        id: 'plus-solide',
        versions: [['en terre fragile', 'Plus de dégâts'], ['aux normes anti-séisme', 'Moins de dégâts']],
        genere(c) { const [m, b] = c.alea.choisir(this.versions); return { enonce: 'Une maison ' + m + ' : plus ou moins de dégâts lors d’un séisme ?', reponse: O.choix(c.alea, b, ['Plus de dégâts', 'Moins de dégâts']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 2019, au Mozambique, le cyclone Idai a frappé Beira : la Croix-Rouge a estimé la ville détruite à 90 %.',
    prenoms: ['Moussa', 'Laure', 'Rachel', 'Aminata'],
  };
});
