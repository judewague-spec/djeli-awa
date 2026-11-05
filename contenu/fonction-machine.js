/* Notion 11 du bloc « Proportionnalité, pourcentages et fonctions » : la machine à nombres, image, antécédent, f(x). La machine de l'atelier de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const f = (a, b) => 'f(x) = ' + a + 'x' + (b ? ' + ' + b : '');

  return {
    id: 'fonction-machine',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'La machine à nombres : image, antécédent, f(x)',
    classe: '3e',
    univers: ['appareils', 'commerce'],

    accroche: {
      texte: 'Moussa imagine une drôle de machine. Il met un nombre à l’entrée. Elle le multiplie par 2, puis ajoute 1, et sort le résultat. Il met 3 : il sort 7. Il met 5 : il sort 11. ' +
        'À chaque nombre d’entrée, une seule sortie. Peux-tu trouver ce qu’il faut mettre, pour que sorte le nombre que tu veux ?',
      image: { dessin: 'machine', entree: 3, regle: '× 2 + 1', sortie: 7, description: 'Une machine. À l’entrée, le nombre 3. La machine multiplie par 2, puis ajoute 1. À la sortie, le nombre 7.' },
    },

    manipulation: {
      type: 'machine',
      a: 2,
      b: 1,
      depart: 0,
      cible: 9,
      consigne: 'La machine multiplie par 2, puis ajoute 1. Change le nombre d’entrée, jusqu’à ce que la machine sorte 9. Puis valide.',
    },

    decouverte: {
      texte: (c) => 'Cette machine à nombres s’appelle ' + c.mot('fonction') + '. On écrit f de x égale 2 x plus 1. Si tu mets 3 et qu’il sort 7, alors 7 est ' + c.mot('image') + ' de 3. Et 3 est ' + c.mot('antecedent') + ' de 7. ' +
        'L’astuce : pour la sortie, on calcule. Pour l’entrée, on cherche.',
    },

    vocabulaire: {
      termes: {
        fonction: { sesMots: 'une règle', officiel: 'une fonction', lesDeux: 'une règle, que les matheux appellent une fonction' },
        image: { sesMots: 'la sortie', officiel: 'l’image', lesDeux: 'la sortie, que les matheux appellent l’image,' },
        antecedent: { sesMots: 'une entrée', officiel: 'un antécédent', lesDeux: 'une entrée, que les matheux appellent un antécédent,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la règle, la sortie, et l’entrée. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une fonction, pour la règle. L’image, pour la sortie. Un antécédent, pour l’entrée.',
        'Tu connais les mots officiels : la fonction, l’image, l’antécédent, et l’écriture f de x.',
      ],
    },

    exercices: [
      {
        id: 'calculer-une-image',
        univers: 'appareils',
        // [a, b, x]
        versions: [[2, 1, 3], [3, 2, 4], [5, 0, 6], [4, 3, 2], [2, 5, 7], [6, 1, 3]],
        genere(c) {
          const [a, b, x] = c.alea.choisir(this.versions);
          return {
            enonce: 'Soit la fonction ' + f(a, b) + '. Quelle est l’image de ' + x + ' ?',
            image: { dessin: 'machine', entree: x, regle: '× ' + a + (b ? ' + ' + b : ''), sortie: '?', description: 'Une machine. À l’entrée, ' + x + '. Elle multiplie par ' + a + (b ? ', puis ajoute ' + b : '') + '. La sortie est à trouver.' },
            reponse: { type: 'nombre', valeur: a * x + b },
            aide: 'Remplace x par ' + x + ' : calcule ' + a + ' × ' + x + (b ? ' + ' + b : '') + '.',
            aideParlee: 'Remplace x par le nombre donné, puis calcule.',
            correction: ['f(' + x + ') = ' + a + ' × ' + x + (b ? ' + ' + b : '') + ' = ' + (a * x + b) + '.'],
          };
        },
      },
      {
        id: 'trouver-un-antecedent',
        univers: 'appareils',
        // [a, b, sortie]
        versions: [[2, 1, 9], [3, 2, 14], [5, 0, 30], [4, 3, 11], [2, 5, 19], [6, 1, 19]],
        genere(c) {
          const [a, b, y] = c.alea.choisir(this.versions);
          const x = (y - b) / a;
          return {
            enonce: 'Soit la fonction ' + f(a, b) + '. Quel nombre a pour image ' + y + ' ?',
            reponse: { type: 'nombre', valeur: x },
            aide: (b ? 'Enlève ' + b + ' à ' + y + ', puis divise' : 'Divise ' + y) + ' par ' + a + '.',
            aideParlee: 'Remonte la machine : fais les calculs à l’envers, dans l’autre sens.',
            correction: (b ? [y + ' − ' + b + ' = ' + (y - b) + '.'] : []).concat((y - b) + ' ÷ ' + a + ' = ' + x + '.'),
          };
        },
      },
      {
        id: 'avec-un-carre',
        univers: 'commerce',
        versions: [2, 3, 4, 5, 6, 7],
        genere(c) {
          const x = c.alea.choisir(this.versions);
          return {
            enonce: 'Soit la fonction f(x) = x × x. Quelle est l’image de ' + x + ' ?',
            reponse: { type: 'nombre', valeur: x * x },
            aide: 'Calcule ' + x + ' × ' + x + '.',
            aideParlee: 'Multiplie le nombre par lui-même.',
            correction: ['f(' + x + ') = ' + x + ' × ' + x + ' = ' + x * x + '.'],
          };
        },
      },
      {
        id: 'lire-l-ecriture',
        univers: 'commerce',
        // [question, bonne réponse, les autres choix]
        versions: [['On lit f(3) = 7. Quelle est l’image de 3 ?', '7', ['3', '10']], ['On lit f(4) = 9. Quel nombre est un antécédent de 9 ?', '4', ['9', '13']], ['On lit f(2) = 5. Quelle est l’image de 2 ?', '5', ['2', '7']]],
        genere(c) {
          const [x, b, autres] = c.alea.choisir(this.versions);
          return {
            enonce: x,
            reponse: O.choix(c.alea, b, [b].concat(autres)),
            aide: 'Dans cette écriture, le nombre entre parenthèses entre, et le résultat sort.',
            correction: ['Le nombre entre parenthèses est l’entrée, ou l’antécédent. Le résultat est la sortie, ou l’image.', 'Réponse : ' + b + '.'],
          };
        },
      },
      Q('image-ou-antecedent', 'appareils',
        [['Le nombre qui sort de la machine', 'L’image'], ['Le nombre que l’on met dans la machine', 'Un antécédent']],
        (x) => x + ', c’est :', ['L’image', 'Un antécédent'],
        'Entrée, ou sortie ?',
        'On met un antécédent à l’entrée. Il en sort son image.'),
    ],

    defi: {
      // [a, b, x, y voulu]
      versions: [[2, 3, 4, 15], [3, 1, 5, 19], [4, 2, 3, 22], [5, 1, 2, 31]],
      genere(c) {
        const [a, b, x, y] = c.alea.choisir(this.versions);
        return {
          enonce: 'On considère la fonction f définie par ' + f(a, b) + '.',
          questions: [
            {
              texte: 'Question 1. Calcule l’image de ' + x + ' par f.',
              reponse: { type: 'nombre', valeur: a * x + b },
              aide: 'Remplace x par le nombre donné, puis calcule.',
              correction: ['f(' + x + ') = ' + a + ' × ' + x + ' + ' + b + ' = ' + (a * x + b) + '.'],
            },
            {
              texte: 'Question 2. Calcule f(0).',
              reponse: { type: 'nombre', valeur: b },
              aide: 'Remplace x par zéro.',
              correction: ['f(0) = ' + a + ' × 0 + ' + b + ' = ' + b + '.'],
            },
            {
              texte: 'Question 3. Quel nombre a pour image ' + y + ' par f ?',
              reponse: { type: 'nombre', valeur: (y - b) / a },
              aide: 'Remonte la machine : fais les calculs à l’envers.',
              correction: [y + ' − ' + b + ' = ' + (y - b) + '.', (y - b) + ' ÷ ' + a + ' = ' + (y - b) / a + '.'],
            },
            {
              texte: 'Question 4. Explique la différence entre l’image d’un nombre et un antécédent d’un nombre.',
              correction: ['L’image est le résultat, celui qui sort de la machine : on le calcule.', 'Un antécédent est un nombre que l’on met à l’entrée, et qui donne ce résultat : on le cherche.'],
              grille: ['As-tu dit que l’image est ce qui sort ?', 'As-tu dit que l’antécédent est ce que l’on met à l’entrée ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une entrée, une sortie, et f de x n’est plus qu’une machine que tu sais faire tourner.',
    carte: ['calculer-une-image', 'trouver-un-antecedent', 'lire-l-ecriture'],
    papierDuSoir: { exercices: ['calculer-une-image', 'avec-un-carre'], defi: true },
    automatismes: [
      {
        id: 'image-rapide',
        versions: [[2, 1, 4], [3, 0, 5], [4, 1, 2], [5, 2, 3]],
        genere(c) { const [a, b, x] = c.alea.choisir(this.versions); return { enonce: f(a, b) + '. f(' + x + ') = ?', reponse: { type: 'nombre', valeur: a * x + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le Suisse Leonhard Euler nous a donné la notation f(x) en 1734.',
    prenoms: ['Moussa'],
  };
});
