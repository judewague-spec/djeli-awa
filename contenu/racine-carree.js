/* Notion 21 du bloc « Les nombres » : racine carrée, définition et encadrement. Le potager carré de Laure. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const bas = (n) => Math.floor(Math.sqrt(n));
  const { ecr } = O;
  const encadre = (n) => bas(n) + '² = ' + bas(n) ** 2 + ' < ' + n + ' < ' + (bas(n) + 1) ** 2 + ' = ' + (bas(n) + 1) + '², donc ' + bas(n) + ' < √' + n + ' < ' + (bas(n) + 1) + '.';

  return {
    id: 'racine-carree',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Racine carrée : définition et encadrement',
    classe: '4e',
    univers: ['champetre', 'maison-courses'],

    accroche: {
      texte: 'Laure veut un potager carré de 50 mètres carrés derrière la maison. Pour acheter le grillage, elle doit connaître la longueur d’un côté. ' +
        'Quel nombre, multiplié par lui-même, donne 50 ? Ce n’est ni 7, ni 8…',
      image: { dessin: 'carrelage', cote: 7, description: 'Un carré de 7 sur 7, soit 49 cases : presque 50.' },
    },

    manipulation: {
      image: { dessin: 'carrelage', cote: 8, description: 'Un carré de 8 sur 8, soit 64 cases : trop grand.' },
      etapes: [
        'Essaie 7 : 7 × 7 = 49. C’est un peu moins que 50.',
        'Essaie 8 : 8 × 8 = 64. C’est trop.',
        'Le côté est donc entre 7 et 8 mètres, très près de 7.',
        'Avec la calculatrice : 7,07 × 7,07 ≈ 49,98. Le côté mesure environ 7,07 mètres.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le nombre positif qui, multiplié par lui-même, donne 50 s’appelle ' + c.mot('racine') + ' de 50. On l’écrit √50. ' +
        'Pour un carré parfait, c’est un nombre entier : √49 = 7. Sinon, on l’encadre entre deux entiers : 49 < 50 < 64, donc 7 < √50 < 8. ' +
        'Et √50 × √50 = 50, toujours.',
    },

    vocabulaire: {
      termes: {
        racine: { sesMots: 'le côté du carré', officiel: 'la racine carrée', lesDeux: 'le côté du carré, la racine carrée,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le nombre qui, multiplié par lui-même, donne 50, c’est le côté du carré de 50 mètres carrés. ' +
          'Les matheux ont un nom et un signe pour lui : je te les dirai la prochaine fois.',
        'Les matheux disent : la racine carrée de 50, et ils l’écrivent avec un signe qui ressemble à un crochet, √50. Le côté du carré, c’est la racine carrée de son aire.',
        'Tu connais le mot officiel : la racine carrée d’un nombre positif a est le nombre positif dont le carré vaut a. On l’écrit √a.',
      ],
    },

    exercices: [
      {
        id: 'exacte',
        univers: 'champetre',
        versions: [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule √' + n + '.',
            reponse: { type: 'nombre', valeur: Math.sqrt(n) },
            aide: 'Quel nombre positif, multiplié par lui-même, donne ' + n + ' ?',
            aideParlee: 'Cherche le nombre positif qui, multiplié par lui-même, donne le nombre sous la racine.',
            correction: [Math.sqrt(n) + ' × ' + Math.sqrt(n) + ' = ' + n + ', donc √' + n + ' = ' + Math.sqrt(n) + '.'],
          };
        },
      },
      {
        id: 'entier-dessous',
        univers: 'maison-courses',
        versions: [10, 20, 30, 50, 60, 75, 90, 110, 130, 140],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: '√' + n + ' est entre deux nombres entiers qui se suivent. Quel est le plus petit des deux ?',
            reponse: { type: 'nombre', valeur: bas(n) },
            aide: 'Cherche le plus grand carré parfait plus petit que ' + n + '.',
            aideParlee: 'Cherche le plus grand carré parfait plus petit que le nombre.',
            correction: [encadre(n), 'Réponse : ' + bas(n) + '.'],
          };
        },
      },
      {
        id: 'entier-dessus',
        univers: 'champetre',
        versions: [12, 18, 28, 40, 55, 70, 85, 99, 120, 135],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Le potager de Fatou est un carré de ' + n + ' mètres carrés. Son côté est entre deux nombres entiers de mètres. Quel est le plus grand des deux ?',
            reponse: { type: 'nombre', valeur: bas(n) + 1 },
            aide: 'Cherche le plus petit carré parfait plus grand que ' + n + '.',
            aideParlee: 'Cherche le plus petit carré parfait plus grand que l’aire.',
            correction: [encadre(n), 'Réponse : ' + (bas(n) + 1) + '.'],
          };
        },
      },
      {
        id: 'carre-de-racine',
        univers: 'maison-courses',
        versions: [7, 13, 29, 50, 2, 3, 41, 18],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Combien vaut √' + n + ' × √' + n + ' ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Par définition, la racine carrée multipliée par elle-même redonne le nombre.',
            correction: ['√' + n + ' est le nombre positif dont le carré vaut ' + n + '.', 'Donc √' + n + ' × √' + n + ' = ' + n + '.'],
          };
        },
      },
      {
        id: 'plus-proche',
        univers: 'champetre',
        // Nombres loin du milieu entre deux carrés : l'entier le plus proche est sans ambiguïté.
        versions: [50, 26, 65, 82, 99, 120, 140, 35, 47, 80],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const k = Math.round(Math.sqrt(n));
          return {
            enonce: 'Quel est le nombre entier le plus proche de √' + n + ' ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Encadre ' + n + ' entre deux carrés parfaits, et regarde duquel il est le plus près.',
            aideParlee: 'Encadre le nombre entre deux carrés parfaits, et regarde duquel il est le plus près.',
            correction: [encadre(n), n + ' est plus près de ' + k * k + '. Réponse : ' + k + '.'],
          };
        },
      },
    ],

    defi: {
      versions: [75, 40, 90, 60, 110, 30],
      genere(c) {
        const n = c.alea.choisir(this.versions);
        return {
          enonce: 'Laure veut entourer de grillage un potager carré de ' + n + ' mètres carrés.',
          questions: [
            {
              texte: 'Question 1. Le côté du potager est entre deux nombres entiers de mètres qui se suivent. Quel est le plus petit ?',
              reponse: { type: 'nombre', valeur: bas(n) },
              aide: 'Cherche le plus grand carré parfait plus petit que l’aire.',
              correction: [encadre(n), 'Réponse : ' + bas(n) + '.'],
            },
            {
              texte: 'Question 2. Quel est le plus grand des deux ?',
              reponse: { type: 'nombre', valeur: bas(n) + 1 },
              aide: 'Cherche le plus petit carré parfait plus grand que l’aire.',
              correction: ['Réponse : ' + (bas(n) + 1) + '.'],
            },
            {
              texte: 'Question 3. Moussa dit : « Le côté mesure ' + ecr(n / 2) + ' mètres, car ' + n + ' ÷ 2 = ' + ecr(n / 2) + '. » Explique son erreur.',
              correction: ['Le côté c d’un carré d’aire ' + n + ' vérifie c × c = ' + n + ', et non c × 2.', 'Avec ' + ecr(n / 2) + ' mètres, l’aire serait ' + ecr(n / 2) + ' × ' + ecr(n / 2) + ' = ' + ecr((n / 2) ** 2) + ' mètres carrés.', 'Le côté est √' + n + ', entre ' + bas(n) + ' et ' + (bas(n) + 1) + ' mètres.'],
              grille: ['As-tu rappelé que le côté multiplié par lui-même donne l’aire ?', 'As-tu calculé l’aire avec le côté de Moussa ?', 'As-tu donné le bon encadrement du côté ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais ce qu’est une racine carrée, et tu encadres le côté d’un potager carré entre deux entiers.',
    carte: ['exacte', 'entier-dessous', 'plus-proche'],
    papierDuSoir: { exercices: ['entier-dessus', 'plus-proche'], defi: true },
    automatismes: [
      {
        id: 'racine-rapide',
        versions: [16, 36, 49, 81, 100, 144],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: '√' + n + ' = ?', reponse: { type: 'nombre', valeur: Math.sqrt(n) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Héron d’Alexandrie, en Égypte, a décrit une méthode pour calculer une racine carrée pas à pas, déjà connue des Babyloniens.',
    prenoms: ['Laure', 'Fatou', 'Moussa'],
  };
});
