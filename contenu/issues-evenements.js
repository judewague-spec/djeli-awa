/* Notion du bloc « Données, probabilités, programmation » : issues et événements. Le dé de Moussa au marché.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;

  return {
    id: 'issues-evenements',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Issues et événements',
    classe: '4e',
    univers: ['commerce', 'dehors'],

    accroche: {
      texte: 'Au marché, Moussa lance un dé. Rachel parie sur un nombre pair. Le dé roule, et personne ne sait ce qui va sortir. ' +
        'Pourtant, on peut dire d’avance tout ce qui est possible. Et on peut dire quels résultats feraient gagner Rachel.',
      image: { dessin: 'tableur', colonnes: ['Face du dé', '1', '2', '3', '4', '5', '6'], lignes: [['Pair ?', 'non', 'oui', 'non', 'oui', 'non', 'oui']], description: 'Un tableau. Face 1, non pair. Face 2, pair. Face 3, non pair. Face 4, pair. Face 5, non pair. Face 6, pair.' },
    },

    manipulation: {
      etapes: [
        'Moussa lance un dé à six faces. Tu ne sais pas ce qui va sortir.',
        'Le dé peut donner 1, 2, 3, 4, 5 ou 6. Ce sont tous les résultats possibles.',
        'Rachel gagne avec un nombre pair. Quels résultats la font gagner ? Le 2, le 4 et le 6.',
        'Si le dé tombe sur 4, Rachel a gagné son pari.',
      ],
    },

    decouverte: {
      texte: (c) => 'Lancer le dé, c’est ' + c.mot('experience') + '. Chaque nombre que le dé peut donner est ' + c.mot('issue') + '. ' +
        'Rachel attend un nombre pair, ce qui regroupe le 2, le 4 et le 6. C’est ' + c.mot('evenement') + '. Si le dé donne 4, ' + c.mot('realise') + '.',
    },

    vocabulaire: {
      termes: {
        experience: { sesMots: 'un jeu de hasard', officiel: 'une expérience aléatoire', lesDeux: 'un jeu de hasard, que l’on appelle une expérience aléatoire' },
        issue: { sesMots: 'un résultat possible', officiel: 'une issue', lesDeux: 'un résultat possible, que l’on appelle une issue' },
        evenement: { sesMots: 'un pari', officiel: 'un événement', lesDeux: 'un pari, que l’on appelle un événement' },
        realise: { sesMots: 'le pari est gagné', officiel: 'l’événement est réalisé', lesDeux: 'le pari est gagné : l’événement est réalisé' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un jeu de hasard, un résultat possible, un pari. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une expérience aléatoire, pour un jeu de hasard. Un résultat possible s’appelle une issue. Un pari s’appelle un événement.',
        'Tu connais les mots officiels : une expérience aléatoire, une issue, un événement. Quand le pari est gagné, l’événement est réalisé.',
      ],
    },

    exercices: [
      {
        id: 'toutes-les-issues',
        univers: 'commerce',
        // [situation, nombre d'issues]
        versions: [['on lance un dé à six faces', 6], ['on tire une carte dans un jeu de 32 cartes', 32], ['on lance une pièce de monnaie', 2],
          ['on tire une carte dans un jeu de 52 cartes', 52], ['on fait tourner une roue de tombola à 8 cases égales', 8], ['on tire un jeton dans un sac qui contient les jetons numérotés de 1 à 10', 10]],
        genere(c) {
          const [s, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au marché, ' + s + '. Combien y a-t-il de résultats possibles ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Compte tout ce que le jeu peut donner, sans rien oublier.',
            aideParlee: 'Compte tout ce que le jeu peut donner, sans rien oublier.',
            correction: ['Le jeu peut donner ' + n + ' résultats différents.', 'Réponse : ' + n + '.'],
          };
        },
      },
      {
        id: 'combien-pour-gagner',
        univers: 'commerce',
        // [pari de Rachel avec un dé à six faces, nombre de résultats qui la font gagner, ces résultats]
        versions: [['un nombre pair', 3, '2, 4 et 6'], ['un nombre impair', 3, '1, 3 et 5'], ['un nombre plus grand que 4', 2, '5 et 6'], ['un multiple de 3', 2, '3 et 6'],
          ['un 6', 1, '6'], ['un nombre différent de 1', 5, '2, 3, 4, 5 et 6']],
        genere(c) {
          const [p, n, liste] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa lance un dé à six faces. Rachel parie sur ' + p + '. Combien de résultats la font gagner ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Passe les six faces en revue : 1, 2, 3, 4, 5, 6. Garde celles qui font gagner Rachel.',
            aideParlee: 'Passe les six faces en revue. Garde celles qui font gagner Rachel.',
            correction: ['Les faces qui font gagner Rachel : ' + liste + '.', 'Cela fait ' + n + (n >= 2 ? ' résultats.' : ' résultat.')],
          };
        },
      },
      O.qcm('pari-gagne', 'commerce',
        [['Rachel parie sur un nombre pair. Le dé donne 5.', 'Non', '5 est impair : le pari est perdu.'],
          ['Rachel parie sur un nombre pair. Le dé donne 4.', 'Oui', '4 est pair : le pari est gagné.'],
          ['Rachel parie sur un nombre plus grand que 3. Le dé donne 6.', 'Oui', '6 est plus grand que 3 : le pari est gagné.'],
          ['Rachel parie sur un nombre plus petit que 3. Le dé donne 3.', 'Non', '3 n’est pas plus petit que 3 : le pari est perdu.'],
          ['Rachel parie sur un multiple de 3. Le dé donne 5.', 'Non', '5 n’est pas un multiple de 3 : le pari est perdu.'],
          ['Rachel parie sur un multiple de 3. Le dé donne 6.', 'Oui', '6 est un multiple de 3 : le pari est gagné.']],
        (x) => x + ' Le pari est-il gagné ?', ['Oui', 'Non'],
        'Regarde le nombre que le dé a donné. Fait-il partie de ceux que Rachel attendait ?'),
      {
        id: 'cartes-favorables',
        univers: 'commerce',
        // [carte cherchée dans un jeu de 32 cartes, nombre de cartes concernées, détail]
        versions: [['des as', 4, '1 as par couleur, et il y a 4 couleurs'], ['des cœurs', 8, '8 cartes dans chaque couleur'], ['des figures (valets, dames ou rois)', 12, '3 figures par couleur, et il y a 4 couleurs'],
          ['des rois ou des as', 8, '4 rois et 4 as'], ['des cartes rouges (cœur ou carreau)', 16, '8 cartes de cœur et 8 de carreau'], ['des dames', 4, '1 dame par couleur, et il y a 4 couleurs']],
        genere(c) {
          const [t, n, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'On tire une carte dans un jeu de 32 cartes. Combien de cartes sont ' + t + ' ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Un jeu de 32 cartes a 4 couleurs, avec 8 cartes dans chacune. Compte celles qui conviennent.',
            aideParlee: 'Un jeu a quatre couleurs. Compte les cartes qui conviennent.',
            correction: [d.charAt(0).toUpperCase() + d.slice(1) + '.', 'Cela fait ' + n + (n >= 2 ? ' cartes.' : ' carte.')],
          };
        },
      },
      {
        id: 'jetons-sac',
        univers: 'commerce',
        // [jetons rouges, bleus, verts]
        versions: [[3, 4, 2], [5, 2, 3], [6, 1, 4], [2, 5, 5], [4, 4, 3], [7, 2, 1]],
        genere(c) {
          const [r, b, v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un sac, il y a ' + r + ' jetons rouges, ' + b + ' jeton' + (b >= 2 ? 's bleus' : ' bleu') + ' et ' + v + ' jeton' + (v >= 2 ? 's verts' : ' vert') + '. Moussa tire un jeton. Combien de résultats réalisent l’événement « le jeton est rouge ou vert » ?',
            reponse: { type: 'nombre', valeur: r + v },
            aide: 'Compte les jetons rouges, puis les verts. Additionne.',
            aideParlee: 'Compte les jetons rouges, puis les verts. Additionne.',
            correction: [r + ' rouges + ' + v + ' ' + (v >= 2 ? 'verts' : 'vert') + ' = ' + (r + v) + '.', 'Il y a ' + (r + v) + ' jetons qui réalisent l’événement.'],
          };
        },
      },
    ],

    defi: {
      // [billets de 1 à N, multiple gagnant k, billet tiré t]
      versions: [[20, 5, 15], [30, 3, 14], [24, 4, 10], [36, 6, 18]],
      genere(c) {
        const [N, k, t] = c.alea.choisir(this.versions);
        const gagne = t % k === 0;
        return {
          enonce: 'Moussa tient la tombola du marché. Un sac contient ' + N + ' billets, numérotés de 1 à ' + N + '. Un billet gagne un panier de fruits quand son numéro est un multiple de ' + k + '. Rachel tire un billet.',
          questions: [
            {
              texte: 'Question 1. Combien y a-t-il d’issues possibles ?',
              reponse: { type: 'nombre', valeur: N },
              aide: 'Chaque billet est une issue.',
              correction: ['Chaque billet peut être tiré : il y a ' + N + ' issues.'],
            },
            {
              texte: 'Question 2. Combien d’issues réalisent l’événement « gagner un panier » ?',
              reponse: { type: 'nombre', valeur: N / k },
              aide: 'Compte les multiples de ' + k + ' jusqu’à ' + N + '.',
              aideParlee: 'Compte les billets dont le numéro est un multiple du nombre donné.',
              correction: ['Les multiples de ' + k + ' jusqu’à ' + N + ' vont de ' + k + ' à ' + N + ', de ' + k + ' en ' + k + '.', N + ' ÷ ' + k + ' = ' + (N / k) + ' billets gagnants.'],
            },
            {
              texte: 'Question 3. Rachel tire le billet numéro ' + t + '. L’événement « gagner un panier » est-il réalisé ?',
              reponse: O.choix(c.alea, gagne ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Le numéro ' + t + ' est-il un multiple de ' + k + ' ?',
              aideParlee: 'Regarde si le numéro tiré est un multiple du nombre donné.',
              correction: [t + (gagne ? ' est' : ' n’est pas') + ' un multiple de ' + k + '.', 'Réponse : ' + (gagne ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Moussa dit : « Avant de tirer, je peux savoir quel billet Rachel va sortir. » A-t-il raison ? Explique avec les mots expérience aléatoire et issue.',
              correction: ['Non. Tirer un billet est une expérience aléatoire.', 'On connaît toutes les issues possibles, mais on ne sait pas laquelle va se produire.'],
              grille: ['As-tu répondu que Moussa a tort ?', 'As-tu dit que tirer un billet est une expérience aléatoire ?', 'As-tu dit qu’on connaît les issues, sans savoir laquelle sortira ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais lister tous les résultats possibles, et dire quand un pari est gagné. Moussa peut lancer son dé !',
    carte: ['toutes-les-issues', 'combien-pour-gagner', 'pari-gagne'],
    papierDuSoir: { exercices: ['cartes-favorables', 'jetons-sac'], defi: true },
    automatismes: [
      {
        id: 'faces-de-de',
        versions: [['plus grand que 4', 2], ['pair', 3], ['plus petit que 3', 2], ['impair', 3]],
        genere(c) { const [p, n] = c.alea.choisir(this.versions); return { enonce: 'Avec un dé à six faces, combien de faces portent un nombre ' + p + ' ?', reponse: { type: 'nombre', valeur: n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Italie, Cardan a étudié les dés et la chance d’obtenir un double six.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
