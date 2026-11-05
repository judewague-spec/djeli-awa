/* Notion du bloc de technologie « Concevoir et fabriquer » : ajouter une fonction à un objet, avec un prototype. La lampe de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const CAPTEURS = ['Un capteur de présence', 'Un capteur de luminosité', 'Un capteur de température', 'Un capteur d’humidité de la terre'];
  const ETAPES = ['Construire un prototype', 'Corriger puis refaire un essai', 'Fixer la fonction pour de bon', 'Chercher une idée d’amélioration'];
  /** Un exercice à réponse numérique : f(version) rend { enonce, valeur, aide, correction }. */
  const N = (id, univers, versions, f) => ({
    id, univers, versions,
    genere(c) {
      const r = f(c.alea.choisir(this.versions));
      return { enonce: r.enonce, reponse: { type: 'nombre', valeur: r.valeur }, aide: r.aide, correction: r.correction };
    },
  });

  return {
    id: 'prototype-fonction',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'Ajouter une fonction',
    classe: '4e',
    univers: ['appareils', 'maison-courses', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : prototype, amélioration d’un objet existant par l’ajout d’une fonction.',

    accroche: {
      texte: 'La lampe de Laure reste allumée. Souvent, Laure l’oublie en partant. Moussa lui propose d’ajouter un capteur de présence : la lampe s’éteindra seule quand la pièce est vide. ' +
        'Avant de percer la lampe, il construit un premier modèle pour essayer.',
      image: { dessin: 'chaine', etapes: ['Le besoin : la lampe reste allumée', 'L’idée : ajouter un capteur de présence', 'Un premier modèle pour essayer'], description: 'La lampe de Laure reste allumée. L’idée de Moussa : ajouter un capteur de présence. Avant de percer la lampe, il construit un premier modèle pour essayer.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Un besoin : éteindre seule', 'Un capteur ajouté à la lampe', 'Un premier modèle, avec des fils et du carton', 'Des essais, des corrections, puis la fixation'], description: 'Les étapes de Moussa : un besoin, un capteur ajouté à la lampe, un premier modèle avec des fils et du carton, puis des essais, des corrections et la fixation.' },
      etapes: [
        'Laure oublie d’éteindre sa lampe. Elle voudrait qu’elle s’éteigne seule.',
        'Moussa garde la lampe et lui ajoute un capteur de présence. Il n’achète pas de lampe neuve.',
        'Il monte d’abord un premier modèle, avec des fils et du carton. Il l’essaie dans la pièce.',
        'Le capteur ne voit pas Laure dans le coin. Moussa le déplace, puis il refait l’essai.',
        'Quand tout marche à chaque essai, il fixe le capteur pour de bon.',
      ],
    },

    decouverte: {
      texte: (c) => 'Moussa garde la lampe de Laure et lui ajoute un capteur. C’est ' + c.mot('evolution') + '. ' +
        'Avant de percer la lampe, il construit ' + c.mot('proto') + '. Il l’essaie, puis il corrige ce qui ne va pas. ' +
        'L’astuce : on essaie avec un modèle, avant de toucher à l’objet final.',
    },

    vocabulaire: {
      termes: {
        evolution: { sesMots: 'une amélioration de l’objet qui existe déjà', officiel: 'une évolution de l’objet', lesDeux: 'une amélioration de l’objet qui existe déjà, que les techniciens appellent une évolution de l’objet' },
        proto: { sesMots: 'un premier modèle pour essayer', officiel: 'un prototype', lesDeux: 'un premier modèle pour essayer, que les techniciens appellent un prototype' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une amélioration de l’objet qui existe déjà, et un premier modèle pour essayer. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : une évolution de l’objet, pour l’amélioration ; un prototype, pour le premier modèle.',
        'Tu connais les mots officiels : une évolution de l’objet, et un prototype que l’on essaie puis que l’on corrige.',
      ],
    },

    exercices: [
      O.qcm('quel-capteur', 'appareils',
        [['une lampe qui doit s’éteindre quand la pièce est vide', 'Un capteur de présence', 'Il détecte si quelqu’un est dans la pièce.'],
          ['une veilleuse qui doit s’allumer quand la nuit tombe', 'Un capteur de luminosité', 'Il mesure la lumière autour de la veilleuse.'],
          ['un petit four dont on veut surveiller la chaleur', 'Un capteur de température', 'Il mesure la chaleur dans le four.'],
          ['une plante en pot qu’on oublie d’arroser', 'Un capteur d’humidité de la terre', 'Il dit si la terre est sèche ou humide.']],
        (x) => 'Pour améliorer ' + x + ', quel capteur ajouter ?', CAPTEURS,
        'Cherche ce que l’objet doit savoir pour agir tout seul.'),
      O.qcm('etape-suivante', 'maison-courses',
        [['Moussa a son idée, un capteur de présence, mais il n’a encore aucun modèle.', 'Construire un prototype', 'Il faut d’abord un premier modèle pour essayer l’idée.'],
          ['Le prototype ne détecte pas Laure quand elle est dans le coin de la pièce.', 'Corriger puis refaire un essai', 'On déplace le capteur, puis on essaie de nouveau.'],
          ['Le prototype marche bien à chaque essai.', 'Fixer la fonction pour de bon', 'Quand tout marche à chaque essai, on peut fixer le capteur.'],
          ['La lampe reste souvent allumée, mais personne n’a encore trouvé comment l’éviter.', 'Chercher une idée d’amélioration', 'Il faut d’abord trouver l’idée, avant de construire un modèle.']],
        (x) => x + ' Quelle est la prochaine étape ?', ETAPES,
        'Demande-toi où en est Moussa : idée, modèle, essai ou fixation ?'),
      N('economie-lampe', 'commerce',
        // [prix de la lampe neuve, prix du capteur], en euros
        [[30, 8], [25, 9], [40, 12], [18, 6], [45, 15]],
        ([A, k]) => ({
          enonce: 'Une lampe neuve avec capteur coûte ' + A + ' euros. Moussa garde la lampe de Laure et achète seulement un capteur à ' + k + ' euros. Combien d’euros économise-t-il ?',
          valeur: A - k,
          aide: 'Soustrais le prix du capteur au prix de la lampe neuve.',
          correction: [A + ' − ' + k + ' = ' + (A - k) + ' euros.'],
        })),
      N('heures-de-trop', 'famille',
        // [heures de trop par jour, nombre de jours]
        [[3, 7], [2, 30], [4, 7], [5, 6], [2, 14]],
        ([h, j]) => ({
          enonce: 'Laure oublie sa lampe allumée ' + h + ' heures de trop chaque jour. Combien d’heures de trop cela fait-il en ' + j + ' jours ?',
          valeur: h * j,
          aide: 'Multiplie les heures de trop d’un jour par le nombre de jours.',
          correction: [h + ' × ' + j + ' = ' + h * j + ' heures.'],
        })),
      N('essais-rates', 'maison-courses',
        // [essais faits, essais réussis]
        [[10, 8], [12, 9], [20, 17], [15, 10], [9, 6]],
        ([n, k]) => ({
          enonce: 'Moussa fait ' + n + ' essais du prototype. Le capteur détecte Laure ' + k + ' fois. Combien d’essais ont échoué ?',
          valeur: n - k,
          aide: 'Soustrais les essais réussis au nombre d’essais.',
          correction: [n + ' − ' + k + ' = ' + (n - k) + ' essais.'],
        })),
    ],

    defi: {
      // [prix de la lampe neuve, prix du capteur, prix des fils, essais faits, essais réussis, essais réussis exigés]
      versions: [[30, 8, 2, 10, 9, 9], [36, 9, 3, 10, 7, 9], [45, 12, 3, 12, 12, 11], [28, 7, 1, 8, 6, 7], [40, 10, 2, 15, 13, 14], [24, 6, 2, 10, 10, 9]],
      genere(c) {
        const [A, k, f, n, r, m] = c.alea.choisir(this.versions);
        const cout = k + f, bon = r >= m;
        return {
          enonce: 'Laure fait améliorer sa lampe par Moussa. Une lampe neuve avec capteur coûte ' + A + ' euros. Le capteur de Moussa coûte ' + k + ' euros et les fils ' + O.nb(f, 'euro') + '. ' +
            'Moussa essaie le prototype ' + n + ' fois : le capteur marche ' + r + ' fois. Il veut au moins ' + m + ' essais réussis avant de fixer le capteur.',
          questions: [
            {
              texte: 'Question 1. Combien d’euros coûte l’amélioration de la lampe de Laure ?',
              reponse: { type: 'nombre', valeur: cout },
              aide: 'Additionne le prix du capteur et celui des fils.',
              correction: [k + ' + ' + f + ' = ' + cout + ' euros.'],
            },
            {
              texte: 'Question 2. Combien d’euros Laure économise-t-elle par rapport à une lampe neuve ?',
              reponse: { type: 'nombre', valeur: A - cout },
              aide: 'Soustrais le coût de l’amélioration au prix de la lampe neuve.',
              correction: [A + ' − ' + cout + ' = ' + (A - cout) + ' euros.'],
            },
            {
              texte: 'Question 3. Moussa peut-il fixer le capteur pour de bon ?',
              reponse: O.choix(c.alea, bon ? 'Oui, il peut fixer le capteur' : 'Non, il doit d’abord corriger', [bon ? 'Non, il doit d’abord corriger' : 'Oui, il peut fixer le capteur']),
              aide: 'Compare les essais réussis à ceux que Moussa exige.',
              correction: ['Le capteur a marché ' + r + ' fois, et Moussa en exige au moins ' + m + '.', (bon ? 'Oui, il peut fixer le capteur' : 'Non, il doit d’abord corriger') + '.'],
            },
            {
              texte: 'Question 4. Imagine que le capteur rate souvent ses essais. Que doit faire Moussa avant de fixer la nouvelle fonction ? Explique.',
              correction: ['Il cherche pourquoi le capteur rate, par exemple en changeant sa place.', 'Il corrige, refait des essais, et fixe le capteur seulement quand tout marche.'],
              grille: ['As-tu dit que Moussa corrige le prototype ?', 'As-tu dit qu’il refait des essais ?', 'As-tu dit qu’il fixe la fonction seulement quand les essais réussissent ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais ajouter une fonction à un objet, et l’essayer avec un modèle avant de la fixer.',
    carte: ['quel-capteur', 'etape-suivante', 'economie-lampe'],
    papierDuSoir: { exercices: ['economie-lampe', 'heures-de-trop', 'essais-rates'], defi: true },
    automatismes: [
      {
        id: 'soustraction-rapide',
        versions: [[30, 8], [25, 9], [40, 12], [18, 6]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Malawi, William Kamkwamba a bâti une éolienne avec des tuyaux en plastique et des pièces de vélo.',
    prenoms: ['Laure', 'Moussa'],
  };
});
