/* Notion du bloc « Données, probabilités, programmation » : blocs personnalisés et programmes en parallèle. Les lumières de la fête d'Esther.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const IMG = { dessin: 'programme', lignes: ['définir clignoter', '  allumer', '  attendre', '  éteindre', 'répéter 3 fois', '  clignoter'], description: 'Un programme en blocs. Définir clignoter : allumer, attendre, éteindre. Puis répéter 3 fois : clignoter. Le groupe est écrit une fois et utilisé trois fois.' };

  return {
    id: 'scratch-blocs-parallele',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Blocs personnalisés et parallèle',
    classe: '3e',
    univers: ['appareils', 'danses'],

    accroche: {
      texte: 'Esther règle les lumières de la fête. Pour faire clignoter, elle écrit chaque fois : allumer, attendre, éteindre. ' +
        'Elle donne un nom à ce groupe : clignoter. Ensuite, un seul mot suffit.',
      image: IMG,
    },

    manipulation: {
      image: IMG,
      etapes: [
        'Un groupe d’instructions qui a reçu un nom s’écrit une seule fois.',
        'Pour s’en servir, il suffit d’écrire son nom, autant de fois qu’il faut.',
        'Chaque fois que le nom apparaît, tout le groupe s’exécute.',
        'Deux lutins peuvent agir en même temps : chacun suit son programme, au même moment.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde « clignoter », dans le programme d’Esther. C’est ' + c.mot('bloc') + '. On l’écrit une fois, et on l’appelle autant de fois qu’on veut. ' +
        'Regarde deux programmes lancés ensemble par un seul clic. Ce sont ' + c.mot('parallele') + '. ' +
        'L’astuce : pour savoir ce que fait un programme, compte combien de fois chaque nom est appelé.',
    },

    vocabulaire: {
      termes: {
        bloc: { sesMots: 'le groupe d’instructions avec un nom', officiel: 'un bloc personnalisé', lesDeux: 'le groupe d’instructions avec un nom, que l’on appelle un bloc personnalisé' },
        parallele: { sesMots: 'des programmes qui avancent côte à côte', officiel: 'des programmes en parallèle', lesDeux: 'des programmes qui avancent côte à côte, que l’on appelle des programmes en parallèle' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le groupe d’instructions avec un nom, et les programmes qui avancent côte à côte. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : un bloc personnalisé, pour le groupe d’instructions avec un nom. Des programmes côte à côte s’appellent des programmes en parallèle.',
        'Tu connais les mots officiels : le bloc personnalisé et les programmes en parallèle.',
      ],
    },

    exercices: [
      {
        id: 'compter-appels',
        univers: 'danses',
        // [pas du bloc, appels, pas en plus]
        versions: [[4, 3, 2], [6, 2, 5], [3, 5, 1], [5, 4, 3], [8, 3, 4], [2, 6, 6]],
        genere(c) {
          const [p, n, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le bloc « danser » fait ' + p + ' pas. Le programme de Rachel appelle « danser » ' + n + ' fois, puis fait ' + e + ' pas de plus. Combien de pas fait-elle en tout ?',
            reponse: { type: 'nombre', valeur: p * n + e },
            aide: 'Chaque appel du bloc refait tout le groupe. Compte les appels, puis ajoute les pas en plus.',
            correction: [n + ' appels de ' + p + ' pas : ' + n + ' × ' + p + ' = ' + p * n + '.', p * n + ' + ' + e + ' = ' + (p * n + e) + ' pas.'],
          };
        },
      },
      {
        id: 'bloc-dans-boucle',
        univers: 'appareils',
        // [instructions du bloc, tours de boucle, appels par tour]
        versions: [[3, 4, 2], [3, 5, 3], [4, 3, 2], [2, 6, 3], [5, 2, 4], [4, 5, 2]],
        genere(c) {
          const [i, r, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le bloc « signal » contient ' + i + ' instructions. Le programme d’Esther : répéter ' + r + ' fois, et à chaque tour appeler « signal » ' + k + ' fois. Combien d’instructions sont exécutées en tout ?',
            reponse: { type: 'nombre', valeur: i * r * k },
            aide: 'Compte d’abord les appels du bloc en tout. Multiplie ensuite par la taille du bloc.',
            correction: [r + ' tours, ' + k + ' appels par tour : ' + r + ' × ' + k + ' = ' + r * k + ' appels.', r * k + ' × ' + i + ' = ' + i * r * k + ' instructions.'],
          };
        },
      },
      O.qcm('quelle-solution', 'appareils', [
        ['La même suite de quatre instructions revient dix fois dans le programme.', 'Créer un bloc personnalisé', 'Le groupe répété mérite un nom : on l’écrit une fois et on l’appelle dix fois.'],
        ['Deux personnages doivent bouger au même moment, chacun à sa façon.', 'Utiliser des programmes en parallèle', 'Chaque personnage a son programme, et les deux avancent côte à côte.'],
        ['Une instruction n’est utilisée qu’une seule fois, toute seule.', 'Écrire l’instruction directement', 'Un seul emploi ne demande pas de bloc, ni de second programme : on l’écrit directement.'],
        ['Une danse de trois pas revient huit fois dans le programme.', 'Créer un bloc personnalisé', 'Le groupe de pas répété mérite un nom : on l’écrit une fois et on l’appelle huit fois.'],
        ['Le lutin de la musique et le lutin des lumières doivent partir ensemble, chacun avec ses instructions.', 'Utiliser des programmes en parallèle', 'Deux lutins qui travaillent en même temps ont chacun leur programme.'],
      ],
      (x) => x + ' Quelle est la solution la plus simple ?',
      ['Créer un bloc personnalisé', 'Utiliser des programmes en parallèle', 'Écrire l’instruction directement'],
      'Demande-toi si un groupe se répète, si deux lutins agissent ensemble, ou si l’instruction est seule.'),
      {
        id: 'deux-lutins',
        univers: 'danses',
        // [instructions du lutin 1, secondes par instruction, instructions du lutin 2, secondes par instruction]
        versions: [[3, 2, 4, 1], [2, 5, 3, 3], [4, 2, 2, 5], [5, 1, 2, 4], [3, 3, 3, 2], [6, 2, 3, 3]],
        genere(c) {
          const [na, ta, nb, tb] = c.alea.choisir(this.versions);
          const a = na * ta, b = nb * tb;
          return {
            enonce: 'Esther lance deux lutins en même temps. Le lutin A fait ' + na + ' instructions de ' + ta + ' seconde' + (ta > 1 ? 's' : '') + ' chacune. Le lutin B fait ' + nb + ' instructions de ' + tb + ' seconde' + (tb > 1 ? 's' : '') + ' chacune. Au bout de combien de secondes les deux ont-ils fini ?',
            reponse: { type: 'nombre', valeur: Math.max(a, b) },
            aide: 'Les deux lutins avancent en même temps : leurs durées ne s’ajoutent pas. Attends le plus lent.',
            correction: ['Lutin A : ' + na + ' × ' + ta + ' = ' + a + ' secondes.', 'Lutin B : ' + nb + ' × ' + tb + ' = ' + b + ' secondes.', 'Ils avancent ensemble : on attend le plus lent, soit ' + Math.max(a, b) + ' secondes.'],
          };
        },
      },
      {
        id: 'deux-blocs-deux-lutins',
        univers: 'appareils',
        // [instructions du bloc X, appels de X, instructions du bloc Y, appels de Y]
        versions: [[3, 4, 2, 5], [4, 2, 3, 3], [2, 6, 5, 2], [5, 3, 4, 2], [3, 3, 3, 4], [6, 2, 2, 7]],
        genere(c) {
          const [p, a, q, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le lutin A appelle le bloc « lumière » ' + a + ' fois ; ce bloc contient ' + p + ' instructions. Le lutin B appelle le bloc « musique » ' + b + ' fois ; ce bloc contient ' + q + ' instructions. Combien d’instructions les deux lutins exécutent-ils en tout ?',
            reponse: { type: 'nombre', valeur: p * a + q * b },
            aide: 'Compte les instructions de chaque lutin, puis ajoute. Ici, on compte les instructions, pas le temps.',
            correction: ['Lutin A : ' + a + ' × ' + p + ' = ' + p * a + '.', 'Lutin B : ' + b + ' × ' + q + ' = ' + q * b + '.', p * a + ' + ' + q * b + ' = ' + (p * a + q * b) + ' instructions.'],
          };
        },
      },
    ],

    defi: {
      // [instructions de « clignoter », tours du lutin 1, instructions de « danser », tours du lutin 2]
      versions: [[3, 4, 2, 5], [3, 2, 4, 3], [4, 3, 3, 5], [2, 6, 5, 2]],
      genere(c) {
        const [i, r, q, s] = c.alea.choisir(this.versions);
        const a = r * i, b = s * q, m = Math.max(a, b);
        return {
          enonce: 'À la fête d’Esther, deux lutins partent en même temps. Le bloc « clignoter » contient ' + i + ' instructions, le bloc « danser » en contient ' + q + '. ' +
            'Lutin 1 : répéter ' + r + ' fois « clignoter ». Lutin 2 : répéter ' + s + ' fois « danser ». Chaque instruction dure 1 seconde.',
          image: { dessin: 'programme', lignes: ['Lutin 1', '  répéter ' + r + ' fois', '    clignoter', 'Lutin 2', '  répéter ' + s + ' fois', '    danser'], description: 'Deux programmes en blocs, lancés ensemble. Lutin 1 : répéter ' + r + ' fois clignoter, qui contient ' + i + ' instructions. Lutin 2 : répéter ' + s + ' fois danser, qui contient ' + q + ' instructions.' },
          questions: [
            {
              texte: 'Question 1. Combien d’instructions le lutin 1 exécute-t-il en tout ?',
              reponse: { type: 'nombre', valeur: a },
              aide: 'Compte les appels du bloc, puis multiplie par sa taille.',
              correction: [r + ' × ' + i + ' = ' + a + ' instructions.'],
            },
            {
              texte: 'Question 2. Combien d’instructions le lutin 2 exécute-t-il en tout ?',
              reponse: { type: 'nombre', valeur: b },
              aide: 'Même démarche avec le bloc « danser ».',
              correction: [s + ' × ' + q + ' = ' + b + ' instructions.'],
            },
            {
              texte: 'Question 3. Au bout de combien de secondes les deux lutins ont-ils fini ?',
              reponse: { type: 'nombre', valeur: m },
              aide: 'Les lutins avancent en même temps : attends le plus lent.',
              correction: ['Lutin 1 : ' + a + ' secondes. Lutin 2 : ' + b + ' secondes.', 'Ils avancent ensemble : on attend le plus lent, soit ' + m + ' secondes.'],
            },
            {
              texte: 'Question 4. Explique l’avantage du bloc « clignoter » pour le lutin 1. Que faudrait-il écrire sans bloc ?',
              correction: ['Le bloc s’écrit une fois, puis on l’appelle par son nom : le programme est plus court et plus facile à relire.', 'Sans bloc, il faudrait recopier les ' + i + ' instructions à chaque tour.'],
              grille: ['As-tu dit que le bloc s’écrit une seule fois ?', 'As-tu dit que le programme est plus court ou plus lisible ?', 'As-tu dit qu’il faudrait recopier les instructions sans bloc ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un nom pour un groupe, deux lutins côte à côte : tu sais lire des programmes bien rangés.',
    carte: ['compter-appels', 'bloc-dans-boucle', 'quelle-solution'],
    papierDuSoir: { exercices: ['bloc-dans-boucle', 'deux-lutins'], defi: true },
    automatismes: [
      {
        id: 'appels-rapides',
        versions: [[3, 4], [5, 2], [4, 6], [2, 8]],
        genere(c) {
          const [p, n] = c.alea.choisir(this.versions);
          return { enonce: 'Un bloc contient ' + p + ' instructions. On l’appelle ' + n + ' fois. Combien d’instructions en tout ?', reponse: { type: 'nombre', valeur: p * n } };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? Le Nigérian Philip Emeagwali a fait travailler des milliers de microprocesseurs en même temps, aux États-Unis.',
    prenoms: ['Esther', 'Rachel'],
  };
});
