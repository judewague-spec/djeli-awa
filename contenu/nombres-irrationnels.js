/* Notion 24 du bloc « Les nombres » (à confirmer, PROGRAMME.md) : nombres irrationnels, √2. Le carré deux fois plus grand.
   Sans le théorème de Pythagore (bloc de géométrie) : le carré construit sur la diagonale d'un carreau a une aire de 2, en découpant des triangles.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const RAT = 'Oui, c’est une fraction', IRR = 'Non, il est irrationnel';
  const carre = (x) => Math.round(x * x * 10000) / 10000;

  return {
    id: 'nombres-irrationnels',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Nombres irrationnels, √2',
    classe: '3e',
    univers: ['maison-courses', 'coiffure'],

    accroche: {
      texte: 'Rachel a un carreau carré d’un mètre de côté. Elle veut un carré exactement deux fois plus grand, d’aire 2 mètres carrés. ' +
        'Son côté vaut √2. Elle essaie de l’écrire avec une virgule : 1,4 ? 1,41 ? 1,414 ? Les chiffres ne s’arrêtent jamais ! Pourquoi ?',
      image: { dessin: 'carrelage', cote: 1, description: 'Un seul carreau carré, d’un mètre de côté.' },
    },

    manipulation: {
      image: { dessin: 'carrelage', cote: 2, description: 'Quatre carreaux en carré. Sur ton cahier, relie les milieux des quatre bords : tu dessines un carré penché qui couvre la moitié, soit 2 carreaux.' },
      etapes: [
        'Dessine 4 carreaux d’un mètre en carré, sur ton cahier : un grand carré d’aire 4.',
        'Trace une diagonale dans chaque carreau, de façon à dessiner un carré penché au milieu.',
        'Ce carré penché garde la moitié de chaque carreau : son aire est 2. Son côté est la diagonale d’un carreau, et vaut √2.',
        'Essaie : 1,4² = 1,96 et 1,5² = 2,25. Donc √2 est entre 1,4 et 1,5. Et 1,41² = 1,9881 : plus près, mais pas encore 2.',
      ],
    },

    decouverte: {
      texte: (c) => 'On sait démontrer que √2 ne s’écrit pas comme une fraction de deux nombres entiers : aucune fraction, mise au carré, ne donne exactement 2. ' +
        'Ses chiffres après la virgule ne s’arrêtent jamais et ne se répètent pas. C’est ' + c.mot('irrationnel') + '. ' +
        'Les fractions, elles, sont des nombres rationnels. L’astuce : la racine d’un nombre entier qui n’est pas un carré parfait est toujours irrationnelle.',
    },

    vocabulaire: {
      termes: {
        irrationnel: { sesMots: 'un nombre qui ne s’écrit pas en fraction', officiel: 'un nombre irrationnel', lesDeux: 'un nombre qui ne s’écrit pas en fraction, un nombre irrationnel' },
      },
      textes: [
        'Pour l’instant, garde tes mots : √2 est un nombre qui ne s’écrit pas en fraction. Ses chiffres continuent sans fin. ' +
          'Les matheux ont un mot pour lui : je te le dirai la prochaine fois.',
        'Les matheux disent : √2 est un nombre irrationnel. Un nombre qui ne s’écrit pas en fraction, c’est un irrationnel ; une fraction, c’est un rationnel.',
        'Tu connais le mot officiel : un nombre irrationnel ne peut pas s’écrire comme le quotient de deux entiers. √2 est irrationnel.',
      ],
    },

    exercices: [
      {
        id: 'rationnel-ou-pas',
        univers: 'maison-courses',
        // [nombre écrit, est rationnel, explication]
        versions: [['√4', true, '√4 = 2 = 2/1.'], ['√2', false, '2 n’est pas un carré parfait.'], ['√9', true, '√9 = 3 = 3/1.'], ['√5', false, '5 n’est pas un carré parfait.'],
          ['0,5', true, '0,5 = 1/2.'], ['√3', false, '3 n’est pas un carré parfait.'], ['√25', true, '√25 = 5 = 5/1.'], ['√7', false, '7 n’est pas un carré parfait.']],
        genere(c) {
          const [x, rat, pourquoi] = c.alea.choisir(this.versions);
          const bonne = rat ? RAT : IRR;
          return {
            enonce: 'Le nombre ' + x + ' peut-il s’écrire comme une fraction de deux nombres entiers ?',
            reponse: O.choix(c.alea, bonne, [RAT, IRR]),
            aide: 'Une racine est une fraction seulement si le nombre sous la racine est un carré parfait.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'au-carre',
        univers: 'coiffure',
        versions: [1.4, 1.5, 1.7, 1.8, 2.2, 2.3, 1.6, 2.4],
        genere(c) {
          const x = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour vérifier une longueur, Rebecca calcule ' + ecr(x) + '². Combien trouve-t-elle ?',
            reponse: { type: 'nombre', valeur: carre(x) },
            aide: ecr(x) + ' × ' + ecr(x) + '.',
            aideParlee: 'Multiplie le nombre par lui-même, puis place la virgule.',
            correction: [ecr(x) + ' × ' + ecr(x) + ' = ' + ecr(carre(x)) + '.'],
          };
        },
      },
      {
        id: 'encadrer',
        univers: 'maison-courses',
        // [n, a, b] : a < √n < b, à un dixième près
        versions: [[2, 1.4, 1.5], [3, 1.7, 1.8], [5, 2.2, 2.3], [7, 2.6, 2.7], [6, 2.4, 2.5], [8, 2.8, 2.9]],
        genere(c) {
          const [n, a, b] = c.alea.choisir(this.versions);
          return {
            enonce: '√' + n + ' est entre deux nombres à un chiffre après la virgule, qui se suivent. Le plus petit est ' + ecr(a) + '. Quel est l’autre ?',
            reponse: { type: 'nombre', valeur: b },
            aide: ecr(a) + '² = ' + ecr(carre(a)) + '. Essaie le dixième suivant.',
            aideParlee: 'Mets au carré le dixième suivant, et vérifie qu’il dépasse le nombre sous la racine.',
            correction: [ecr(a) + '² = ' + ecr(carre(a)) + ' < ' + n + ' < ' + ecr(carre(b)) + ' = ' + ecr(b) + '².', 'Donc ' + ecr(a) + ' < √' + n + ' < ' + ecr(b) + '. Réponse : ' + ecr(b) + '.'],
          };
        },
      },
      {
        id: 'aire-du-carre',
        univers: 'maison-courses',
        versions: [2, 3, 5, 6, 7, 10],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Un carré a un côté de √' + n + ' mètres. Quelle est son aire, en mètres carrés ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'L’aire, c’est le côté au carré : (√' + n + ')².',
            aideParlee: 'L’aire d’un carré, c’est le côté au carré. Une racine au carré redonne le nombre.',
            correction: ['(√' + n + ')² = ' + n + '. L’aire est ' + n + ' mètres carrés.'],
          };
        },
      },
      {
        id: 'quelle-nature',
        univers: 'coiffure',
        versions: [['√16', 'Un nombre entier'], ['3/4', 'Une fraction qui n’est pas entière'], ['√11', 'Un nombre irrationnel'], ['√36', 'Un nombre entier'], ['√13', 'Un nombre irrationnel'], ['2/3', 'Une fraction qui n’est pas entière']],
        genere(c) {
          const [x, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quelle est la nature du nombre ' + x + ' ?',
            reponse: O.choix(c.alea, bonne, ['Un nombre entier', 'Une fraction qui n’est pas entière', 'Un nombre irrationnel']),
            aide: 'Pour une racine, regarde si le nombre sous la racine est un carré parfait.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      versions: [[2, 1.4, 1.5], [3, 1.7, 1.8], [5, 2.2, 2.3], [6, 2.4, 2.5]],
      genere(c) {
        const [n, a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Rebecca construit un carré d’aire ' + n + ' mètres carrés. Son côté mesure √' + n + ' mètres.',
          questions: [
            {
              texte: 'Question 1. Calcule ' + ecr(a) + '².',
              reponse: { type: 'nombre', valeur: carre(a) },
              aide: 'Multiplie le nombre par lui-même.',
              correction: [ecr(a) + ' × ' + ecr(a) + ' = ' + ecr(carre(a)) + '.'],
            },
            {
              texte: 'Question 2. Calcule ' + ecr(b) + '².',
              reponse: { type: 'nombre', valeur: carre(b) },
              aide: 'Multiplie le nombre par lui-même.',
              correction: [ecr(b) + ' × ' + ecr(b) + ' = ' + ecr(carre(b)) + '.'],
            },
            {
              texte: 'Question 3. Déduis-en un encadrement du côté du carré, et explique pourquoi on ne pourra jamais l’écrire exactement avec une virgule.',
              correction: [ecr(carre(a)) + ' < ' + n + ' < ' + ecr(carre(b)) + ', donc ' + ecr(a) + ' < √' + n + ' < ' + ecr(b) + '.',
                n + ' n’est pas un carré parfait : √' + n + ' est irrationnel. Ses chiffres après la virgule ne s’arrêtent jamais.'],
              grille: ['As-tu écrit l’encadrement avec les deux carrés ?', 'As-tu dit que ' + n + ' n’est pas un carré parfait ?', 'As-tu employé le mot « irrationnel » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu as rencontré un nombre étonnant, √2, que personne ne pourra jamais écrire en entier.',
    carte: ['rationnel-ou-pas', 'encadrer', 'aire-du-carre'],
    papierDuSoir: { exercices: ['encadrer', 'au-carre'], defi: true },
    automatismes: [
      {
        id: 'racine-rationnelle',
        versions: ['√4', '√2', '√49', '√10'],
        genere(c) { const x = c.alea.choisir(this.versions); const r = ['√4', '√49'].includes(x); return { enonce: x + ' est-il un nombre entier ?', reponse: O.choix(c.alea, r ? 'Oui' : 'Non', ['Oui', 'Non']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Une tablette d’argile de Babylone, gardée à l’université Yale, donne déjà une valeur très précise de la racine de 2.',
    prenoms: ['Rachel', 'Rebecca'],
  };
});
