/* Notion 18 du bloc SVT « Le vivant et son évolution » : la sélection naturelle et le hasard. Les scarabées du champ de Rachel.
   S'en tient à la science du programme, sans jugement sur les croyances : consigne du 2 nov. 2026.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ETAPES = ['Des différences existent, par hasard', 'Le milieu trie : certains survivent mieux', 'Ils ont plus de descendants', 'Le caractère devient plus fréquent'];

  return {
    id: 'selection-naturelle',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'La sélection naturelle et le hasard',
    classe: 'cycle 4',
    univers: ['champetre', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : mécanismes de l’évolution, sélection naturelle et rôle du hasard.',

    accroche: {
      texte: 'Sur le sol brun du champ, Rachel voit de petits scarabées, certains verts, d’autres bruns. Année après année, les verts se font rares : les oiseaux les repèrent plus vite. ' +
        'Les bruns n’ont rien décidé. Pourtant, ils sont de plus en plus nombreux. Comment est-ce possible ?',
      image: { dessin: 'chaine', etapes: ETAPES, description: 'La sélection naturelle : des différences existent, par hasard ; le milieu trie, certains survivent mieux ; ils ont plus de descendants ; leur caractère devient plus fréquent.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Verts, an 1', parts: 5 }, { nom: 'Bruns, an 1', parts: 5 }, { nom: 'Verts, an 5', parts: 2 }, { nom: 'Bruns, an 5', parts: 8 }], description: 'Des barres : la première année, autant de scarabées verts que de bruns ; cinq ans plus tard, beaucoup moins de verts, beaucoup plus de bruns.' },
      etapes: [
        'Dans une population, les individus ne sont pas tous pareils. Ces différences apparaissent par hasard.',
        'Sur le sol brun, un scarabée vert est plus vite vu. Le milieu fait un tri.',
        'Les bruns survivent mieux, donc ils ont plus de petits, et ces petits sont souvent bruns à leur tour.',
        'Génération après génération, la population change. Personne n’a choisi : ni les scarabées, ni les oiseaux.',
      ],
    },

    decouverte: {
      texte: (c) => 'Par hasard, les individus d’une population sont différents. Le milieu avantage certains d’entre eux : c’est ' + c.mot('selection') + '. ' +
        'Peu à peu, le caractère avantageux devient fréquent. Sur très longtemps, on observe ' + c.mot('evolution') + '. ' +
        'L’astuce : le hasard propose, le milieu trie. Le caractère ne vient jamais du besoin de l’individu.',
    },

    vocabulaire: {
      termes: {
        selection: { sesMots: 'le tri par le milieu', officiel: 'la sélection naturelle', lesDeux: 'le tri par le milieu, que les scientifiques appellent la sélection naturelle' },
        evolution: { sesMots: 'le lent changement des espèces', officiel: 'l’évolution', lesDeux: 'le lent changement des espèces, que les scientifiques appellent l’évolution' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le tri par le milieu, et le lent changement des espèces. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la sélection naturelle, pour le tri par le milieu. Et l’évolution, pour le lent changement des espèces. Charles Darwin a décrit ce mécanisme.',
        'Tu connais les mots officiels : la sélection naturelle, le hasard, et l’évolution.',
      ],
    },

    exercices: [
      {
        id: 'etape-suivante',
        univers: 'champetre',
        versions: [0, 1, 2],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = ETAPES[i + 1];
          return {
            enonce: 'Que se passe-t-il juste après cette étape : « ' + ETAPES[i] + ' » ?',
            reponse: O.choix(c.alea, bonne, ETAPES.filter((_, k) => k !== i)),
            aide: 'Le hasard propose, le milieu trie, puis les survivants ont des descendants.',
            correction: ['L’ordre : ' + ETAPES.join(', puis ').toLowerCase() + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      O.qcm('bonne-explication', 'dehors',
        [['Pourquoi les scarabées bruns sont-ils plus nombreux sur un sol brun ?', 'Ils sont moins vus, donc ils survivent mieux'], ['Sur un sol brun, pourquoi les scarabées bruns ont-ils plus de descendants ?', 'Ils sont moins vus, donc ils survivent mieux']].map((v) => [v[0], v[1], 'Sur un sol brun, un scarabée brun est moins vu par les oiseaux : il survit mieux, et a plus de descendants. Il n’a rien décidé.']),
        (x) => x, ['Ils sont moins vus, donc ils survivent mieux', 'Ils ont décidé de changer de couleur', 'Le sol a peint leur carapace'],
        'Un individu ne décide pas de ses caractères.'),
      O.qcm('vrai-ou-faux', 'champetre',
        [['Un individu change ses gènes parce qu’il en a besoin.', 'Faux'], ['Les différences entre individus apparaissent par hasard.', 'Vrai'], ['La sélection agit sur une population, au fil des générations.', 'Vrai'], ['Les caractères avantageux dépendent du milieu.', 'Vrai'], ['Un caractère utile dans un milieu l’est forcément partout.', 'Faux']].map((v) => [v[0], v[1], 'Les différences apparaissent au hasard, et le milieu trie, génération après génération. Ce qui est utile dans un milieu ne l’est pas forcément ailleurs.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Le hasard propose, le milieu trie.'),
      {
        id: 'pourcentage-de-bruns',
        univers: 'champetre',
        // [bruns, verts]
        versions: [[80, 20], [60, 40], [70, 30], [90, 10], [150, 50], [120, 80]],
        genere(c) {
          const [b, v] = c.alea.choisir(this.versions);
          const p = (b / (b + v)) * 100;
          return {
            enonce: 'Rachel compte ' + b + ' scarabées bruns et ' + v + ' scarabées verts. Quel est le pourcentage de bruns ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Il y a ' + (b + v) + ' scarabées en tout. Calcule ' + b + ' ÷ ' + (b + v) + ' × 100.',
            aideParlee: 'Divise le nombre de bruns par le total, puis multiplie par cent.',
            correction: [b + ' + ' + v + ' = ' + (b + v) + ' scarabées.', b + ' ÷ ' + (b + v) + ' × 100 = ' + p + ' %.'],
          };
        },
      },
      {
        id: 'descendants',
        univers: 'dehors',
        // [survivants, descendants par survivant]
        versions: [[20, 4], [15, 6], [30, 5], [12, 10], [25, 4], [40, 3]],
        genere(c) {
          const [s, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans une population, ' + s + ' scarabées bruns survivent. Chacun a en moyenne ' + d + ' descendants. Combien de descendants cela fait-il ?',
            reponse: { type: 'nombre', valeur: s * d },
            aide: 'Calcule ' + s + ' × ' + d + '.',
            aideParlee: 'Multiplie les survivants par le nombre de descendants de chacun.',
            correction: [s + ' × ' + d + ' = ' + s * d + ' descendants.'],
          };
        },
      },
    ],

    defi: {
      // [% de bruns année 1, % de bruns année 5, oiseaux absents : % de bruns année 5 dans la zone protégée]
      versions: [[50, 80, 60], [40, 70, 50], [50, 90, 60], [30, 70, 40]],
      genere(c) {
        const [a, b, t] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : sur un sol brun, on suit la part de scarabées bruns dans une population. L’année 1, elle est de ' + a + ' %. L’année 5, elle est de ' + b + ' %. Dans une zone voisine, sous un filet qui empêche les oiseaux d’entrer, elle passe de ' + a + ' % à ' + t + ' %.',
          image: { dessin: 'barres', barres: [{ nom: 'Année 1', parts: a / 10 }, { nom: 'Année 5', parts: b / 10 }, { nom: 'Sous filet', parts: t / 10 }], description: 'Trois barres, chaque part vaut dix pour cent : la part de scarabées bruns au début, puis cinq ans après sans filet, puis cinq ans après sous filet.' },
          questions: [
            {
              texte: 'Question 1. De combien de points la part de bruns a-t-elle augmenté sans filet ?',
              reponse: { type: 'nombre', valeur: b - a },
              aide: 'Fais la différence entre les deux années.',
              correction: [b + ' − ' + a + ' = ' + (b - a) + ' points.'],
            },
            {
              texte: 'Question 2. De combien de points a-t-elle augmenté sous le filet ?',
              reponse: { type: 'nombre', valeur: t - a },
              aide: 'Fais le même calcul pour la zone voisine.',
              correction: [t + ' − ' + a + ' = ' + (t - a) + ' points.'],
            },
            {
              texte: 'Question 3. Explique, à l’aide de ces résultats, le rôle des oiseaux dans l’évolution de cette population.',
              correction: ['Sans filet, la part de bruns augmente beaucoup plus que sous le filet.', 'Les oiseaux repèrent plus facilement les verts : ils exercent une sélection. Les bruns survivent mieux et ont plus de descendants.'],
              grille: ['As-tu comparé les deux zones ?', 'As-tu dit que les oiseaux repèrent davantage les verts ?', 'As-tu nommé la sélection naturelle ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le hasard propose, le milieu trie : tu sais comment une population change sans rien décider.',
    carte: ['etape-suivante', 'bonne-explication', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['pourcentage-de-bruns', 'descendants'], defi: true },
    automatismes: [
      {
        id: 'pourcentage-rapide',
        versions: [[20, 100], [50, 100], [25, 100], [10, 100]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' sur ' + b + ', en pourcentage = ?', reponse: { type: 'nombre', valeur: (a / b) * 100 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, un petit oiseau a deux tailles de bec : l’une pour les graines tendres, l’autre pour les dures.',
    prenoms: ['Rachel'],
  };
});
