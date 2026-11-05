/* Notion 5 du bloc SVT « Planète Terre, environnement, action humaine » : préserver la biodiversité. Le bord du champ d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const MEN = 'Une menace', GES = 'Un geste de protection';
  const DEST = 'Destruction du milieu', POLL = 'Pollution', EXC = 'Prélèvement excessif';

  return {
    id: 'biodiversite-gestion',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Préserver la biodiversité',
    classe: 'cycle 4',
    univers: ['champetre', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : biodiversité, menaces, aires protégées et gestes de protection.',

    accroche: {
      texte: 'Aminata compte les fleurs au bord du champ. Elle en trouve douze sortes, et chaque sorte attire ses abeilles ou ses papillons. ' +
        'Près de la route, tout est tondu : elle n’en trouve que trois. Laure lui dit : plus il y a de sortes, plus la nature est solide.',
      image: { dessin: 'batons', valeurs: [['Bord de route', 3], ['Bord du champ', 12]], axe: 'Sortes de fleurs comptées', description: 'Deux bâtons : 3 sortes de fleurs au bord de la route, et 12 sortes au bord du champ.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Menaces sur la nature', 'Coins protégés et règles', 'Gestes de chacun'], description: 'Trois étapes : les menaces sur la nature, puis les coins protégés et les règles, puis les gestes de chacun.' },
      etapes: [
        'Imagine deux bords de champ. L’un est tondu ras. L’autre est laissé sauvage, avec des fleurs, des buissons et des tas de bois.',
        'Dans le coin sauvage, Aminata compte beaucoup de sortes de plantes, d’insectes et d’oiseaux.',
        'Chaque sorte a son rôle : les abeilles portent le pollen, les oiseaux mangent les chenilles, les vers aèrent le sol.',
        'Les menaces : milieux détruits, pollution, chasse ou pêche excessive, plantes et animaux venus d’ailleurs qui envahissent tout.',
        'Quand une sorte disparaît, elle ne revient jamais. Les autres, qui en dépendaient, peuvent disparaître aussi.',
        'On protège : des coins de nature gardés à l’abri, des règles de chasse et de pêche, des haies, des mares.',
        'Chacun peut agir : laisser un coin sauvage, planter des fleurs, ne rien jeter dans l’eau, trier ses déchets.',
      ],
    },

    decouverte: {
      texte: (c) => 'La nature est faite de milliers de sortes de vivants, qui dépendent les uns des autres. ' +
        'Regarde une abeille, une marguerite, un ver de terre : chacun est ' + c.mot('espece') + '. ' +
        'Regarde toutes les fleurs, tous les insectes et tous les oiseaux du bord du champ : c’est ' + c.mot('biodiversite') + '. ' +
        'Regarde un coin de forêt où il est interdit de couper, de chasser et de construire : c’est ' + c.mot('aire') + '. ' +
        'L’astuce : plus il y a de sortes, plus la nature est solide.',
    },

    vocabulaire: {
      termes: {
        espece: { sesMots: 'une sorte d’être vivant', officiel: 'une espèce', lesDeux: 'une sorte d’être vivant, que les scientifiques appellent une espèce' },
        biodiversite: { sesMots: 'l’ensemble des sortes de vivants d’un lieu', officiel: 'la biodiversité', lesDeux: 'l’ensemble des sortes de vivants d’un lieu, que les scientifiques appellent la biodiversité' },
        aire: { sesMots: 'un coin de nature mis à l’abri', officiel: 'une aire protégée', lesDeux: 'un coin de nature mis à l’abri, que les scientifiques appellent une aire protégée' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une sorte d’être vivant, l’ensemble des sortes de vivants d’un lieu, et un coin de nature mis à l’abri. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une espèce, pour une sorte d’être vivant. L’ensemble des sortes de vivants d’un lieu s’appelle la biodiversité. Un coin de nature mis à l’abri s’appelle une aire protégée.',
        'Tu connais les mots officiels : une espèce, la biodiversité, et une aire protégée. Tu connais aussi les gestes qui préservent la nature.',
      ],
    },

    exercices: [
      O.qcm('menace-ou-geste', 'champetre',
        [
          ['Arracher toutes les haies d’un village.', MEN, 'Les haies abritent oiseaux et insectes : les arracher détruit leur milieu.'],
          ['Laisser un coin du jardin sauvage.', GES, 'Un coin sauvage offre un abri et de la nourriture à beaucoup de sortes de vivants.'],
          ['Jeter un produit toxique dans une mare.', MEN, 'Le produit empoisonne le milieu et les êtres vivants qui y vivent.'],
          ['Installer un hôtel à insectes dans un jardin.', GES, 'Les insectes y trouvent un abri : cela aide la biodiversité.'],
          ['Lâcher dans la nature un animal venu d’ailleurs, qui mange les espèces d’ici.', MEN, 'Un animal venu d’ailleurs peut envahir le milieu et faire disparaître des espèces locales.'],
          ['Créer une réserve où la chasse est interdite.', GES, 'Dans la réserve, les animaux sont à l’abri : c’est une aire protégée.'],
        ],
        (x) => x + ' Est-ce une menace ou un geste de protection ?', [MEN, GES],
        'Demande-toi si les vivants gagnent un abri, ou s’ils perdent leur milieu.'),
      O.qcm('quelle-menace', 'dehors',
        [
          ['Une zone humide est asséchée pour construire un parking.', DEST, 'Le milieu disparaît : les êtres vivants qui y vivaient perdent leur abri.'],
          ['Un produit toxique se déverse dans la rivière.', POLL, 'Un produit qui abîme l’eau et ses vivants est une pollution.'],
          ['On pêche chaque année tous les gros poissons d’un lac.', EXC, 'On prend plus de poissons que le lac ne peut en refaire : c’est un prélèvement excessif.'],
          ['On arrache une haie pour agrandir le champ.', DEST, 'La haie disparaît : oiseaux et insectes perdent leur milieu de vie.'],
          ['Du plastique et du pétrole se répandent dans la mer.', POLL, 'Ces produits salissent le milieu et blessent les animaux : c’est une pollution.'],
          ['On chasse chaque année plus d’animaux qu’il n’en naît.', EXC, 'Les animaux deviennent de moins en moins nombreux : c’est un prélèvement excessif.'],
        ],
        (x) => x + ' Quelle menace pour la biodiversité ?', [DEST, POLL, EXC],
        'Le milieu peut disparaître, être sali, ou être trop vidé de ses vivants.'),
      O.qcm('vrai-ou-faux', 'champetre',
        [
          ['Une espèce disparue ne revient jamais.', 'Vrai', 'Quand une espèce disparaît, elle est perdue pour toujours.'],
          ['Un milieu avec beaucoup d’espèces différentes résiste souvent mieux aux changements.', 'Vrai', 'Si une espèce manque, une autre peut prendre sa place : le milieu tient mieux.'],
          ['Dans une aire protégée, les activités humaines sont réglementées pour protéger le milieu.', 'Vrai', 'Les règles limitent la chasse, la coupe ou la construction pour protéger la nature.'],
          ['Les espèces ne dépendent pas les unes des autres.', 'Faux', 'Les êtres vivants se nourrissent, s’abritent et se reproduisent grâce aux autres.'],
          ['Un jardin tondu ras toute l’année accueille autant d’espèces qu’un coin sauvage.', 'Faux', 'Un coin sauvage offre plus d’abris et de nourriture, donc plus d’espèces.'],
          ['Chacun peut agir pour la biodiversité, même avec un petit jardin.', 'Vrai', 'Un coin sauvage, des fleurs ou une mare suffisent à aider des espèces.'],
        ],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Les êtres vivants dépendent les uns des autres, et leur milieu doit rester à l’abri.'),
      {
        id: 'difference-especes',
        univers: 'champetre',
        // [sortes de fleurs au bord du champ, sortes de fleurs au bord de la route]
        versions: [[12, 3], [15, 6], [14, 5], [12, 4], [18, 7], [20, 8]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Aminata a compté ' + a + ' sortes de fleurs au bord du champ, et ' + b + ' sortes au bord de la route. Combien de sortes de plus a-t-elle trouvées au bord du champ ?',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Calcule ' + a + ' − ' + b + '.',
            aideParlee: 'Enlève le nombre de sortes du bord de la route à celui du bord du champ.',
            correction: [a + ' − ' + b + ' = ' + (a - b) + ' sortes de plus.'],
          };
        },
      },
      {
        id: 'surface-protegee',
        univers: 'dehors',
        // [hectares du territoire, pourcentage protégé]
        versions: [[400, 25], [200, 15], [600, 10], [500, 30], [800, 5], [250, 20]],
        genere(c) {
          const [s, p] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une commune a un territoire de ' + s + ' hectares. Elle met ' + p + ' % de ce territoire en aire protégée. Combien d’hectares cela représente-t-il ?',
            reponse: { type: 'nombre', valeur: (s * p) / 100 },
            aide: 'Calcule ' + s + ' × ' + p + ' ÷ 100.',
            aideParlee: 'Multiplie la surface du territoire par le pourcentage, puis divise par cent.',
            correction: [s + ' × ' + p + ' ÷ 100 = ' + (s * p) / 100 + ' hectares.'],
          };
        },
      },
    ],

    defi: {
      // [espèces d'oiseaux vues dans le champ avec haies, dans le champ sans haies]
      versions: [[12, 6], [10, 7], [16, 8], [9, 6], [14, 5], [11, 7]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        const deux = a >= 2 * b;
        const BONNE = 'Replanter des haies et laisser des coins sauvages';
        return {
          enonce: 'Rachel et Aminata observent les oiseaux pendant une matinée. Dans un champ entouré de haies, elles voient ' + a + ' espèces. Dans un champ sans haies, elles en voient ' + b + '.',
          image: { dessin: 'batons', valeurs: [['Avec haies', a], ['Sans haies', b]], axe: 'Espèces d’oiseaux vues', description: 'Deux bâtons : ' + a + ' espèces d’oiseaux vues dans le champ avec haies, et ' + b + ' espèces dans le champ sans haies.' },
          questions: [
            {
              texte: 'Question 1. Combien d’espèces de plus voit-on dans le champ avec haies ?',
              reponse: { type: 'nombre', valeur: a - b },
              aide: 'Fais la différence entre les deux nombres d’espèces.',
              correction: [a + ' − ' + b + ' = ' + (a - b) + ' espèces de plus.'],
            },
            {
              texte: 'Question 2. Le champ avec haies compte-t-il au moins deux fois plus d’espèces que le champ sans haies ?',
              reponse: O.choix(c.alea, deux ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Calcule le double du nombre d’espèces du champ sans haies, puis compare.',
              correction: ['Le double de ' + b + ' est ' + 2 * b + '.', a + ' est ' + (deux ? 'au moins égal à ' : 'plus petit que ') + 2 * b + '.', 'Réponse : ' + (deux ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 3. Quelle mesure aide le mieux à garder les oiseaux ?',
              reponse: O.choix(c.alea, BONNE, [BONNE, 'Arracher les haies pour agrandir le champ', 'Tondre tout le terrain au ras']),
              aide: 'Choisis ce qui offre des abris et de la nourriture aux oiseaux.',
              correction: ['Les haies et les coins sauvages offrent des abris et de la nourriture.', 'Réponse : ' + BONNE + '.'],
            },
            {
              texte: 'Question 4. Propose deux gestes concrets pour préserver la biodiversité autour d’un champ ou d’un jardin, et explique leur effet.',
              correction: ['Gestes possibles : planter des haies, laisser un coin sauvage, creuser une mare, éviter les produits toxiques.', 'Les espèces y trouvent un abri et de la nourriture, donc elles restent plus nombreuses.'],
              grille: ['As-tu proposé deux gestes concrets et réalistes ?', 'As-tu expliqué qu’ils donnent un abri ou de la nourriture aux espèces ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais pourquoi la diversité du vivant compte, et quels gestes la protègent autour de toi.',
    carte: ['menace-ou-geste', 'quelle-menace', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['difference-especes', 'surface-protegee'], defi: true },
    automatismes: [
      {
        id: 'abri-ou-menace',
        versions: [['Planter une haie', 'Un abri'], ['Arracher une haie', 'Une menace'], ['Creuser une mare', 'Un abri'], ['Verser un produit toxique', 'Une menace']],
        genere(c) { const [t, b] = c.alea.choisir(this.versions); return { enonce: t + ' : cela donne-t-il un abri aux vivants, ou est-ce une menace ?', reponse: O.choix(c.alea, b, ['Un abri', 'Une menace']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, les Baka protègent la forêt du Dja : ils replantent les ignames sauvages.',
    prenoms: ['Aminata', 'Laure', 'Rachel'],
  };
});
