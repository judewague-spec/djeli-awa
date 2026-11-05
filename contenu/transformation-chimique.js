/* Notion 9 du bloc physique-chimie « La matière » : transformation physique ou chimique ? La pâte qui lève. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const PHY = 'Physique', CHI = 'Chimique';
  const REA = 'Un réactif', PRO = 'Un produit';

  return {
    id: 'transformation-chimique',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Transformation physique ou chimique ?',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'maison-courses', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : transformations physiques et chimiques.',

    accroche: {
      texte: 'Dans la cuisine, deux choses changent. Le beurre fond dans la poêle. Et le gâteau de Laure cuit au four : la pâte liquide devient un gâteau moelleux et doré. ' +
        'Quand le beurre refroidit, il redevient du beurre. Mais le gâteau, lui, ne redeviendra jamais de la pâte crue. Quelle différence ?',
      image: { dessin: 'tube', aspect: 'trouble', legende: 'un gaz nouveau trouble l’eau de chaux', description: 'Un tube d’eau de chaux troublée : un gaz nouveau, le dioxyde de carbone, est apparu.' },
    },

    manipulation: {
      image: { dessin: 'balance', gauche: 'avant', droite: 'après', masseG: 300, masseD: 300, description: 'Une balance équilibrée : la masse est la même avant et après, dans un récipient fermé.' },
      etapes: [
        'Le beurre qui fond reste du beurre : ses particules sont les mêmes, seul leur rangement change. C’est une transformation physique.',
        'Dans le gâteau qui cuit, de nouvelles espèces apparaissent : la couleur, l’odeur et le goût changent. C’est une transformation chimique.',
        'Avec du vinaigre et du bicarbonate, ça mousse : un gaz nouveau se forme et trouble l’eau de chaux. C’est du dioxyde de carbone : encore une transformation chimique.',
        'Dans les deux cas, la masse totale se conserve si rien ne s’échappe.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans une transformation chimique, des corps disparaissent : ce sont ' + c.mot('reactifs') + '. D’autres apparaissent : ce sont ' + c.mot('produits') + '. ' +
        'Dans une transformation physique, comme un changement d’état ou une dissolution, les corps restent les mêmes. ' +
        'L’astuce : cherche un corps nouveau. Un test qui réagit, une couleur, une odeur ou un gaz nouveaux en sont des indices.',
    },

    vocabulaire: {
      termes: {
        reactifs: { sesMots: 'les ingrédients qui disparaissent', officiel: 'les réactifs', lesDeux: 'les ingrédients qui disparaissent, que les scientifiques appellent les réactifs' },
        produits: { sesMots: 'les nouveautés qui apparaissent', officiel: 'les produits', lesDeux: 'les nouveautés qui apparaissent, que les scientifiques appellent les produits' },
      },
      textes: [
        'Pour l’instant, garde tes mots : dans une transformation chimique, il y a les ingrédients qui disparaissent et les nouveautés qui apparaissent. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : les réactifs, ce sont les ingrédients qui disparaissent ; les produits, ce sont les nouveautés qui apparaissent. On écrit : réactifs, une flèche, produits.',
        'Tu connais les mots officiels : réactifs et produits. Une transformation chimique change des réactifs en produits ; la masse totale se conserve.',
      ],
    },

    exercices: [
      {
        id: 'physique-ou-chimique',
        univers: 'cuisine-restaurant',
        versions: [['La glace fond.', PHY], ['Un œuf cuit dans l’eau bouillante.', CHI], ['Le sucre se dissout dans le thé.', PHY], ['Un clou rouille sous la pluie.', CHI],
          ['Le bois brûle dans le feu.', CHI], ['L’eau d’une flaque s’évapore.', PHY], ['Le lait tourne et devient aigre.', CHI], ['Le chocolat fondu durcit.', PHY]],
        genere(c) {
          const [phrase, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Transformation physique ou chimique ? « ' + phrase + ' »',
            reponse: O.choix(c.alea, bonne, [PHY, CHI]),
            aide: 'Un corps nouveau apparaît-il ?',
            correction: [bonne === CHI ? 'De nouvelles espèces apparaissent.' : 'Les corps restent les mêmes ; seul leur état ou leur mélange change.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'reactif-ou-produit',
        univers: 'maison-courses',
        versions: [['carbone + dioxygène → dioxyde de carbone', 'le carbone', REA], ['carbone + dioxygène → dioxyde de carbone', 'le dioxyde de carbone', PRO],
          ['méthane + dioxygène → dioxyde de carbone + eau', 'l’eau', PRO], ['méthane + dioxygène → dioxyde de carbone + eau', 'le méthane', REA],
          ['fer + dioxygène → oxyde de fer', 'l’oxyde de fer', PRO], ['fer + dioxygène → oxyde de fer', 'le dioxygène', REA]],
        genere(c) {
          const [bilan, corps, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Voici une transformation : ' + bilan + '. Dans cette transformation, ' + corps + (corps === 'l’eau' ? ' est-elle' : ' est-il') + ' un réactif ou un produit ?',
            reponse: O.choix(c.alea, bonne, [REA, PRO]),
            aide: 'Avant la flèche : ce qui disparaît. Après la flèche : ce qui apparaît.',
            correction: [bonne === REA ? 'Il est avant la flèche : il disparaît.' : 'Il est après la flèche : il apparaît.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'indice',
        univers: 'famille',
        versions: [['Un gaz nouveau se forme et trouble l’eau de chaux.', CHI], ['L’eau change d’état et devient de la vapeur.', PHY], ['La couleur et l’odeur changent pendant la cuisson.', CHI], ['Le sel disparaît dans l’eau, et revient quand l’eau s’évapore.', PHY]],
        genere(c) {
          const [obs, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rachel observe : « ' + obs + ' » Cette observation montre-t-elle une transformation physique ou chimique ?',
            reponse: O.choix(c.alea, bonne, [PHY, CHI]),
            aide: 'Un corps nouveau, ou les mêmes corps ?',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'masse-dans-un-flacon',
        univers: 'maison-courses',
        versions: [[5, 50], [10, 100], [8, 60], [12, 90], [6, 75], [15, 150]],
        genere(c) {
          const [b, v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa met ' + b + ' g de bicarbonate et ' + v + ' g de vinaigre dans un flacon fermé par un ballon. Ça mousse. Quelle est la masse de ce qui est dans le flacon et le ballon après la transformation, en grammes ?',
            reponse: { type: 'nombre', valeur: b + v },
            aide: 'Rien ne sort : la masse se conserve.',
            correction: [b + ' + ' + v + ' = ' + (b + v) + ' g.'],
          };
        },
      },
      {
        id: 'reversible',
        univers: 'cuisine-restaurant',
        versions: [['le beurre fondu', 'Oui'], ['un gâteau cuit', 'Non'], ['de l’eau gelée', 'Oui'], ['un œuf dur', 'Non'], ['une allumette brûlée', 'Non'], ['du sucre dissous', 'Oui']],
        genere(c) {
          const [corps, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Aminata se demande si on peut retrouver facilement le corps de départ à partir ' + corps.replace(/^le /, 'du ').replace(/^un(e?) /, 'd’un$1 ') + '. Est-ce possible ?',
            reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
            aide: 'Après une transformation physique, on retrouve souvent le corps de départ ; après une transformation chimique, non.',
            correction: [bonne === 'Oui' ? 'Transformation physique : on retrouve le corps de départ.' : 'Transformation chimique : de nouvelles espèces se sont formées.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [masse de bicarbonate, masse de vinaigre] en g
      versions: [[4, 40], [6, 50], [8, 70], [5, 45], [10, 80], [3, 30]],
      genere(c) {
        const [b, v] = c.alea.choisir(this.versions);
        return {
          enonce: 'Rebecca fait une expérience dans la cuisine : elle mélange ' + b + ' g de bicarbonate et ' + v + ' g de vinaigre dans un flacon fermé par un ballon. ' +
            'Ça mousse, le ballon gonfle. Le gaz du ballon trouble l’eau de chaux.',
          questions: [
            {
              texte: 'Question 1. Est-ce une transformation physique ou chimique ?',
              reponse: O.choix(c.alea, CHI, [PHY, CHI]),
              aide: 'Un gaz nouveau est-il apparu ?',
              correction: ['Un gaz nouveau, le dioxyde de carbone, est apparu. Réponse : ' + CHI + '.'],
            },
            {
              texte: 'Question 2. Quelle est la masse totale, en grammes, après la transformation ?',
              reponse: { type: 'nombre', valeur: b + v },
              aide: 'Le flacon est fermé.',
              correction: [b + ' + ' + v + ' = ' + (b + v) + ' g : la masse se conserve.'],
            },
            {
              texte: 'Question 3. Justifie ta réponse à la question 1 en citant l’expérience qui le prouve.',
              correction: ['Le gaz du ballon trouble l’eau de chaux : c’est du dioxyde de carbone.', 'Ce gaz n’existait pas au départ : un produit nouveau s’est formé, la transformation est chimique.'],
              grille: ['As-tu cité l’eau de chaux qui se trouble ?', 'As-tu nommé le dioxyde de carbone ?', 'As-tu dit qu’un corps nouveau est apparu ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais reconnaître une transformation chimique : des réactifs disparaissent, des produits apparaissent.',
    carte: ['physique-ou-chimique', 'reactif-ou-produit', 'indice'],
    papierDuSoir: { exercices: ['reactif-ou-produit', 'masse-dans-un-flacon'], defi: true },
    automatismes: [
      {
        id: 'transformation-rapide',
        versions: [['La glace fond.', PHY], ['Le bois brûle.', CHI], ['Le sel se dissout.', PHY], ['Le fer rouille.', CHI]],
        genere(c) { const [p, b] = c.alea.choisir(this.versions); return { enonce: p + ' Physique ou chimique ?', reponse: O.choix(c.alea, b, [PHY, CHI]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Éthiopie, l’injera est une galette faite de farine de teff et d’eau, que l’on laisse fermenter.',
    prenoms: ['Laure', 'Rachel', 'Moussa', 'Aminata', 'Rebecca'],
  };
});
