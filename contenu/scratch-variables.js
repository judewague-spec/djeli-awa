/* Notion du bloc « Données, probabilités, programmation » : les variables. La boîte « score » d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const IMG = { dessin: 'programme', lignes: ['mettre score à 0', 'ajouter 5 à score', 'ajouter 5 à score'], description: 'Un programme en blocs. Mettre score à 0. Ajouter 5 à score. Ajouter 5 à score. À la fin, la boîte score contient 10.' };

  return {
    id: 'scratch-variables',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Les variables',
    classe: '4e',
    univers: ['maison-courses', 'commerce'],

    accroche: {
      texte: 'Aminata compte ses points au jeu. Elle a une boîte avec une étiquette : score. Au début, la boîte contient 0. ' +
        'À chaque victoire, elle y ajoute 5. Un programme garde les points dans une boîte comme celle-là.',
      image: IMG,
    },

    manipulation: {
      image: IMG,
      etapes: [
        'Le bloc « mettre score à 0 » pose le nombre 0 dans la boîte.',
        'Le bloc « ajouter 5 à score » garde ce qu’il y a dans la boîte, et ajoute 5.',
        'Après le premier ajout, la boîte contient 5. Après le second, elle contient 10.',
        'Pour suivre la boîte pas à pas, note ce qu’elle contient après chaque bloc, comme dans un tableau.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde score, dans le programme d’Aminata. C’est ' + c.mot('variable') + '. ' +
        'Regarde ce que score contient, à un instant précis. C’est ' + c.mot('valeur') + '. ' +
        'Le bloc « mettre à » remplace ce qu’il y a dedans. Le bloc « ajouter à » le garde, et ajoute.',
    },

    vocabulaire: {
      termes: {
        variable: { sesMots: 'la boîte avec un nom', officiel: 'une variable', lesDeux: 'la boîte avec un nom, que l’on appelle une variable' },
        valeur: { sesMots: 'le nombre du moment', officiel: 'la valeur de la variable', lesDeux: 'le nombre du moment, que l’on appelle la valeur de la variable' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la boîte avec un nom, et le nombre du moment. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une variable, pour la boîte avec un nom. Le nombre du moment s’appelle la valeur de la variable.',
        'Tu connais les mots officiels : la variable et sa valeur.',
      ],
    },

    exercices: [
      {
        id: 'suivre-valeur',
        univers: 'maison-courses',
        // [départ, ajout 1, ajout 2]
        versions: [[0, 5, 3], [10, 2, 4], [20, 5, 5], [8, 3, 6], [15, 10, 5], [0, 12, 8]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rachel suit sa tirelire dans une variable nommée tirelire, en euros. Mettre tirelire à ' + a + '. Ajouter ' + b + ' à tirelire. Ajouter ' + d + ' à tirelire. Quelle est la valeur de tirelire à la fin ?',
            reponse: { type: 'nombre', valeur: a + b + d },
            aide: 'Avance bloc par bloc. À chaque « ajouter », garde l’ancien contenu et ajoute le nombre.',
            correction: ['Après « mettre » : ' + a + '.', 'Après le premier ajout : ' + a + ' + ' + b + ' = ' + (a + b) + '.', 'Après le second : ' + (a + b) + ' + ' + d + ' = ' + (a + b + d) + '.'],
          };
        },
      },
      {
        id: 'mettre-ecrase',
        univers: 'commerce',
        // [premier nombre, ajout, nouveau nombre, dernier ajout]
        versions: [[5, 3, 2, 4], [10, 4, 6, 3], [7, 7, 1, 9], [20, 5, 8, 2], [4, 6, 12, 5], [9, 1, 3, 8]],
        genere(c) {
          const [a, b, m, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa suit sa caisse dans une variable nommée caisse, en euros. Mettre caisse à ' + a + '. Ajouter ' + b + ' à caisse. Mettre caisse à ' + m + '. Ajouter ' + d + ' à caisse. Quelle est la valeur de caisse à la fin ?',
            reponse: { type: 'nombre', valeur: m + d },
            aide: 'Le bloc « mettre à » efface l’ancien contenu. Repère le dernier « mettre » du programme.',
            correction: ['Après le premier « mettre » et l’ajout : ' + (a + b) + '.', 'Le second « mettre » remplace tout : la boîte contient ' + m + '.', 'Après le dernier ajout : ' + m + ' + ' + d + ' = ' + (m + d) + '.'],
          };
        },
      },
      {
        id: 'valeur-apres-bloc',
        univers: 'maison-courses',
        // [départ, ajout 1, ajout 2, numéro du bloc demandé]
        versions: [[3, 4, 5, 2], [10, 2, 6, 3], [6, 6, 1, 2], [0, 9, 4, 3], [12, 3, 8, 2], [5, 5, 5, 3]],
        genere(c) {
          const [a, b, d, k] = c.alea.choisir(this.versions);
          const val = k === 2 ? a + b : a + b + d;
          return {
            enonce: 'Programme sur la variable points : 1) mettre points à ' + a + ' ; 2) ajouter ' + b + ' à points ; 3) ajouter ' + d + ' à points. Quelle est la valeur de points juste après le bloc numéro ' + k + ' ?',
            reponse: { type: 'nombre', valeur: val },
            aide: 'Arrête-toi au bloc demandé. Ne passe pas aux blocs suivants.',
            correction: k === 2
              ? ['Après le bloc 1 : ' + a + '.', 'Après le bloc 2 : ' + a + ' + ' + b + ' = ' + val + '.']
              : ['Après le bloc 2 : ' + a + ' + ' + b + ' = ' + (a + b) + '.', 'Après le bloc 3 : ' + (a + b) + ' + ' + d + ' = ' + val + '.'],
          };
        },
      },
      O.qcm('quel-bloc', 'appareils', [
        ['Au début de la partie, la boîte points doit contenir zéro, quoi qu’il y ait dedans avant.', 'mettre points à ce nombre', 'Il faut remplacer l’ancien contenu : c’est le travail de « mettre à ».'],
        ['Rachel gagne un point : la boîte doit garder les anciens points, et en recevoir un de plus.', 'ajouter ce nombre à points', 'Il faut garder l’ancien contenu et ajouter : c’est le travail de « ajouter à ».'],
        ['Moussa veut seulement montrer à l’écran ce que contient la boîte, sans la changer.', 'dire ce qu’il y a dans points', 'La boîte ne doit pas changer : on la lit seulement, avec un bloc qui dit son contenu.'],
        ['Nouvelle manche : la boîte doit repartir à 10, même si elle contenait 40.', 'mettre points à ce nombre', 'Il faut écraser l’ancien contenu : c’est « mettre à ».'],
        ['Aminata touche un cadeau de points : il s’ajoute à ce qu’elle a déjà.', 'ajouter ce nombre à points', 'Ce qu’elle a déjà doit rester : on utilise « ajouter à ».'],
      ],
      (x) => x + ' Quel bloc faut-il ?',
      ['mettre points à ce nombre', 'ajouter ce nombre à points', 'dire ce qu’il y a dans points'],
      'Demande-toi si la boîte doit être remplacée, augmentée, ou seulement lue.'),
      {
        id: 'boucle-variable',
        univers: 'appareils',
        // [départ, nombre de répétitions, ajout]
        versions: [[0, 4, 3], [10, 3, 5], [5, 6, 2], [2, 5, 4], [0, 8, 5], [20, 4, 10]],
        genere(c) {
          const [a, n, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rachel programme un compteur de pas dans la variable pas. Mettre pas à ' + a + '. Répéter ' + n + ' fois : ajouter ' + b + ' à pas. Quelle est la valeur de pas à la fin ?',
            reponse: { type: 'nombre', valeur: a + n * b },
            aide: 'Chaque tour de boucle ajoute le même nombre. Compte les tours, puis ajoute au départ.',
            correction: [n + ' tours qui ajoutent ' + b + ' : ' + n + ' × ' + b + ' = ' + n * b + '.', a + ' + ' + n * b + ' = ' + (a + n * b) + '.'],
          };
        },
      },
    ],

    defi: {
      // [départ, répétitions, ajout par jour, ajout final, objectif]
      versions: [[10, 3, 5, 4, 30], [0, 4, 6, 2, 25], [20, 2, 8, 5, 40], [5, 5, 3, 2, 25]],
      genere(c) {
        const [a, n, b, f, g] = c.alea.choisir(this.versions);
        const apres = a + n * b, fin = apres + f;
        return {
          enonce: 'Rebecca vend des beignets au marché et suit sa cagnotte, en euros, dans la variable cagnotte. Son programme : mettre cagnotte à ' + a + '. Répéter ' + n + ' fois : ajouter ' + b + ' à cagnotte. Puis ajouter ' + f + ' à cagnotte.',
          questions: [
            {
              texte: 'Question 1. Quelle est la valeur de cagnotte juste après la boucle, en euros ?',
              reponse: { type: 'nombre', valeur: apres },
              aide: 'Compte les tours de boucle. Chaque tour ajoute le même nombre.',
              correction: [n + ' × ' + b + ' = ' + n * b + '.', a + ' + ' + n * b + ' = ' + apres + ' €.'],
            },
            {
              texte: 'Question 2. Quelle est la valeur de cagnotte à la fin du programme, en euros ?',
              reponse: { type: 'nombre', valeur: fin },
              aide: 'Pars de la valeur après la boucle, puis passe au dernier bloc.',
              correction: [apres + ' + ' + f + ' = ' + fin + ' €.'],
            },
            {
              texte: 'Question 3. Rebecca veut au moins ' + g + ' €. La cagnotte atteint-elle cet objectif ?',
              reponse: O.choix(c.alea, fin >= g ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare la valeur finale à l’objectif.',
              correction: [fin + ' € ' + (fin >= g ? 'est au moins égal à ' : 'est plus petit que ') + g + ' €.', 'Réponse : ' + (fin >= g ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Explique la différence entre « mettre cagnotte à 20 » et « ajouter 20 à cagnotte ». Donne un exemple.',
              correction: ['« Mettre à » remplace l’ancien contenu de la boîte. « Ajouter à » garde l’ancien contenu et ajoute le nombre.', 'Exemple : si cagnotte contient 5, « mettre à 20 » donne 20, et « ajouter 20 » donne 25.'],
              grille: ['As-tu dit que « mettre à » remplace l’ancien contenu ?', 'As-tu dit que « ajouter à » garde l’ancien contenu ?', 'As-tu donné un exemple avec des nombres exacts ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu suis une variable pas à pas, sans confondre « mettre à » et « ajouter à ».',
    carte: ['suivre-valeur', 'mettre-ecrase', 'quel-bloc'],
    papierDuSoir: { exercices: ['mettre-ecrase', 'boucle-variable'], defi: true },
    automatismes: [
      {
        id: 'variable-rapide',
        versions: [[3, 4, 2], [10, 5, 5], [6, 2, 7], [0, 9, 4]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return { enonce: 'Mettre x à ' + a + '. Ajouter ' + b + ' à x. Ajouter ' + d + ' à x. Que vaut x ?', reponse: { type: 'nombre', valeur: a + b + d } };
        },
      },
    ],
    savaisTu: null,
    prenoms: ['Aminata', 'Rachel', 'Moussa', 'Rebecca'],
  };
});
