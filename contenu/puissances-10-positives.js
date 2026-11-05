/* Notion 14 du bloc « Les nombres » : puissances de 10, exposant positif. La vidéo d'Esther. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { puissance: p } = O;
  const ecrit = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const MOTS = { 1: 'dix', 2: 'cent', 3: 'mille', 4: 'dix mille', 5: 'cent mille', 6: 'un million' };

  return {
    id: 'puissances-10-positives',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Puissances de 10, exposant positif',
    classe: '4e',
    univers: ['appareils', 'commerce', 'danses'],

    accroche: {
      texte: 'Esther a posté sur son téléphone une vidéo de danse avec ses amies. Le premier jour : dix vues. Puis cent, puis mille ! ' +
        'Chaque jour, les vues sont multipliées par dix. Au bout d’une semaine, un million de vues ! ' +
        'Comment écrire ces grands nombres sans se perdre dans les zéros ?',
      image: { dessin: 'echelle', reperes: [{ nom: 'dix vues', puissance: 1 }, { nom: 'mille vues', puissance: 3 }, { nom: 'un million de vues', puissance: 6 }], description: 'Une règle des puissances de 10, de 10 à un million : dix vues, mille vues, un million de vues.' },
    },

    manipulation: {
      image: { dessin: 'echelle', reperes: [{ nom: '10', puissance: 1 }, { nom: '100', puissance: 2 }, { nom: '1 000', puissance: 3 }, { nom: '10 000', puissance: 4 }], description: 'La règle : chaque cran multiplie par 10.' },
      etapes: [
        '10 × 10 = 100 : deux 10 multipliés, deux zéros. On écrit 10².',
        '10 × 10 × 10 = 1 000 : trois 10 multipliés, trois zéros. On écrit 10³.',
        'Un million, 1 000 000, a six zéros : c’est 10 multiplié six fois par lui-même, 10⁶.',
        'Sur ton cahier, écris 10⁴ et 10⁵ en entier, et compte leurs zéros.',
      ],
    },

    decouverte: {
      texte: (c) => '10⁶ = 1 000 000. Le 6, écrit en petit, c’est ' + c.mot('exposant') + ' : il dit combien de fois on multiplie 10. ' +
        'L’astuce : pour une puissance de 10, ce petit nombre, c’est le nombre de zéros. Et 10¹ = 10, tout simplement.',
    },

    vocabulaire: {
      termes: {
        exposant: { sesMots: 'le petit nombre en haut', officiel: 'l’exposant', lesDeux: 'le petit nombre en haut, que les matheux appellent l’exposant' },
      },
      textes: [
        'Pour l’instant, garde tes mots : dans 10⁶, le 6 est le petit nombre en haut. Il compte les 10 multipliés, et donc les zéros. ' +
          'Les matheux ont un mot pour lui : je te le dirai la prochaine fois.',
        'Les matheux disent : 6 est l’exposant. Le petit nombre en haut, c’est l’exposant. Et 10⁶ se lit « dix puissance six » : c’est une puissance de 10.',
        'Tu connais les mots officiels : 10⁶ est une puissance de 10, d’exposant 6. On lit « dix puissance six ».',
      ],
    },

    exercices: [
      {
        id: 'zeros',
        univers: 'appareils',
        versions: [2, 3, 4, 5, 6, 7, 8, 9, 12],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Combien de zéros faut-il écrire après le 1 pour écrire ' + p(10, n) + ' en entier ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'L’exposant de 10 donne le nombre de zéros.',
            correction: [p(10, n) + ' = 1 suivi de ' + n + ' zéros.', 'Réponse : ' + n + '.'],
          };
        },
      },
      {
        id: 'trouver-exposant',
        univers: 'commerce',
        versions: [2, 3, 4, 5, 6, 7, 8, 9],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Le grand marché a vendu ' + ecrit(10 ** n) + ' sacs de riz depuis son ouverture. Écris ce nombre sous la forme 10ⁿ : quel est l’exposant n ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Compte les zéros de ' + ecrit(10 ** n) + '.',
            aideParlee: 'Compte les zéros du nombre : c’est l’exposant.',
            correction: [ecrit(10 ** n) + ' a ' + n + ' zéros : c’est ' + p(10, n) + '. L’exposant est ' + n + '.'],
          };
        },
      },
      {
        id: 'fois-une-puissance',
        univers: 'commerce',
        versions: [[3, 2], [7, 3], [12, 2], [45, 3], [5, 4], [8, 3], [25, 2], [6, 4]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule : ' + a + ' × ' + p(10, n) + '.',
            reponse: { type: 'nombre', valeur: a * 10 ** n },
            aide: 'Multiplier par ' + p(10, n) + ', c’est ajouter ' + n + ' zéros.',
            aideParlee: 'Multiplier par une puissance de 10, c’est ajouter autant de zéros que l’exposant.',
            correction: [a + ' × ' + p(10, n) + ' = ' + a + ' × ' + ecrit(10 ** n) + ' = ' + ecrit(a * 10 ** n) + '.', 'Réponse : ' + a * 10 ** n + '.'],
          };
        },
      },
      {
        id: 'vues',
        univers: 'danses',
        versions: [2, 3, 4, 5, 6],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'La vidéo de danse d’Esther a ' + MOTS[n] + (n === 6 ? ' de' : '') + ' vues. Écris ce nombre comme une puissance de 10 : quel est l’exposant ?',
            reponse: { type: 'nombre', valeur: n },
            aide: MOTS[n][0].toUpperCase() + MOTS[n].slice(1) + ', c’est ' + ecrit(10 ** n) + '. Compte les zéros.',
            aideParlee: 'Écris le nombre en chiffres, puis compte ses zéros.',
            correction: [MOTS[n][0].toUpperCase() + MOTS[n].slice(1) + ' = ' + ecrit(10 ** n) + ' = ' + p(10, n) + '. L’exposant est ' + n + '.'],
          };
        },
      },
      {
        id: 'combien-de-fois',
        univers: 'appareils',
        versions: [[5, 2], [6, 3], [4, 1], [7, 4], [9, 5], [3, 1], [8, 6], [6, 2]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Combien de fois ' + p(10, a) + ' est-il plus grand que ' + p(10, b) + ' ?',
            reponse: { type: 'nombre', valeur: 10 ** (a - b) },
            aide: 'Combien de zéros en plus ? ' + a + ' − ' + b + '.',
            aideParlee: 'Compte combien de zéros le premier a en plus du second.',
            correction: [p(10, a) + ' a ' + (a - b) + ' zéros de plus que ' + p(10, b) + '.', 'Il est ' + p(10, a - b) + ' = ' + ecrit(10 ** (a - b)) + ' fois plus grand. Réponse : ' + 10 ** (a - b) + '.'],
          };
        },
      },
    ],

    defi: {
      // [vues le premier jour (exposant), jours]
      versions: [[1, 4], [1, 5], [2, 3], [2, 4], [1, 3], [3, 3]],
      genere(c) {
        const [e, j] = c.alea.choisir(this.versions);
        const fin = e + j;
        return {
          enonce: 'Une vidéo de Rachel fait ' + p(10, e) + ' vues le premier jour. Ensuite, chaque jour, le nombre de vues est multiplié par 10.',
          questions: [
            {
              texte: 'Question 1. Au bout de ' + j + ' jours de plus, combien de vues la vidéo a-t-elle ? Donne l’exposant de la puissance de 10.',
              reponse: { type: 'nombre', valeur: fin },
              aide: 'Chaque jour, l’exposant augmente de 1.',
              correction: ['Chaque jour ajoute un zéro : ' + e + ' + ' + j + ' = ' + fin + '.', 'La vidéo a ' + p(10, fin) + ' vues. Réponse : ' + fin + '.'],
            },
            {
              texte: 'Question 2. Écris ce nombre de vues en entier.',
              reponse: { type: 'nombre', valeur: 10 ** fin },
              aide: 'Écris 1 suivi d’autant de zéros que l’exposant.',
              correction: [p(10, fin) + ' = ' + ecrit(10 ** fin) + '. Réponse : ' + 10 ** fin + '.'],
            },
            {
              texte: 'Question 3. Moussa dit : « ' + p(10, 3) + ', c’est 10 × 3 = 30. » Explique son erreur.',
              correction: ['L’exposant ne multiplie pas 10 par 3.', p(10, 3) + ' = 10 × 10 × 10 = 1 000 : on multiplie trois 10 entre eux.'],
              grille: ['As-tu écrit ' + p(10, 3) + ' comme un produit de trois 10 ?', 'As-tu donné le bon résultat, 1 000 ?', 'As-tu dit que l’exposant compte les 10 multipliés ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avec l’exposant, tu écris les très grands nombres sans te perdre dans les zéros.',
    carte: ['zeros', 'trouver-exposant', 'fois-une-puissance'],
    papierDuSoir: { exercices: ['fois-une-puissance', 'combien-de-fois'], defi: true },
    automatismes: [
      {
        id: 'puissance-en-entier',
        versions: [2, 3, 4, 5],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: p(10, n) + ' = ?', reponse: { type: 'nombre', valeur: 10 ** n } }; },
      },
      {
        id: 'fois-mille',
        versions: [[4, 3], [12, 2], [7, 4], [35, 2]],
        genere(c) { const [a, n] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + p(10, n) + ' = ?', reponse: { type: 'nombre', valeur: a * 10 ** n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le mot « googol » désigne un 1 suivi de cent zéros. Avec une faute d’écriture, il a donné son nom à Google.',
    prenoms: ['Esther', 'Rachel', 'Moussa'],
  };
});
