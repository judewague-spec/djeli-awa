/* Notion 5 du bloc « Proportionnalité, pourcentages et fonctions » : une grandeur qui dépend d'une autre, la formule. Le taxi de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'dependance-formule',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'Une grandeur qui dépend d’une autre : la formule',
    classe: '4e',
    univers: ['dehors', 'maison-courses'],

    accroche: {
      texte: 'Clarisse prend un taxi en ville. Le chauffeur lui dit : « 2 euros pour monter, puis 1 euro par kilomètre. » Pour 3 kilomètres, cela fait 5 euros. Pour 10 kilomètres, 12 euros. ' +
        'Chaque fois que la distance change, le prix change aussi. Peut-on écrire cette règle une fois pour toutes ?',
      image: { dessin: 'tableur', colonnes: ['Distance (km)', '3', '5', '10'], lignes: [['Prix (€)', 5, 7, 12]], description: 'Un tableau. Pour 3 kilomètres, 5 euros. Pour 5 kilomètres, 7 euros. Pour 10 kilomètres, 12 euros.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Prix = 2 + 1 × distance', 'Pour 3 km : 2 + 1 × 3', 'Cela fait 5 €'], description: 'La règle : le prix égale 2 plus 1 fois la distance. Pour 3 kilomètres : 2 plus 1 fois 3, cela fait 5 euros.' },
      etapes: [
        'Le prix dépend de la distance : si l’on connaît la distance, on peut calculer le prix.',
        'On écrit la règle avec une lettre à la place de la distance : prix = 2 + 1 × d.',
        'Pour trouver le prix, on remplace d par le nombre de kilomètres.',
        'Autre exemple : le périmètre d’un carré dépend de son côté : P = 4 × c.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le prix dépend de la distance. On écrit ce lien avec des lettres : c’est ' + c.mot('formule') + '. La distance peut changer : c’est ' + c.mot('variable') + '. ' +
        'L’astuce : pour utiliser la règle, remplace la lettre par le nombre, et calcule.',
    },

    vocabulaire: {
      termes: {
        formule: { sesMots: 'une règle de calcul', officiel: 'une formule', lesDeux: 'une règle de calcul, que les matheux appellent une formule' },
        variable: { sesMots: 'une valeur libre', officiel: 'une variable', lesDeux: 'une valeur libre, que les matheux appellent une variable' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la règle de calcul, et la valeur libre. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une formule, pour la règle de calcul. Une variable, pour la valeur libre.',
        'Tu connais les mots officiels : la formule, la variable, et une grandeur qui dépend d’une autre.',
      ],
    },

    exercices: [
      {
        id: 'prix-du-taxi',
        univers: 'dehors',
        // [prise en charge, prix du km, km]
        versions: [[2, 1, 8], [3, 2, 5], [2, 3, 4], [4, 1, 12], [3, 2, 10], [5, 2, 7]],
        genere(c) {
          const [f, p, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le prix d’un taxi, en euros, est donné par la formule : prix = ' + f + ' + ' + p + ' × d, où d est la distance en km. Combien coûtent ' + d + ' km ?',
            reponse: { type: 'nombre', valeur: f + p * d },
            aide: 'Calcule ' + p + ' × ' + d + ', puis ajoute ' + f + '.',
            aideParlee: 'Remplace d par la distance. Fais d’abord la multiplication, puis l’addition.',
            correction: [p + ' × ' + d + ' = ' + p * d + '.', p * d + ' + ' + f + ' = ' + (f + p * d) + ' €.'],
          };
        },
      },
      {
        id: 'perimetre-carre',
        univers: 'maison-courses',
        versions: [3, 5, 7, 2.5, 12, 1.5],
        genere(c) {
          const k = c.alea.choisir(this.versions);
          return {
            enonce: 'Le périmètre d’un carré de côté c est donné par P = 4 × c. Quel est le périmètre d’un carré de ' + ecr(k) + ' m de côté, en mètres ?',
            reponse: { type: 'nombre', valeur: 4 * k },
            aide: 'Calcule 4 × ' + ecr(k) + '.',
            aideParlee: 'Remplace c par la longueur du côté, puis multiplie par quatre.',
            correction: ['4 × ' + ecr(k) + ' = ' + ecr(4 * k) + ' m.'],
          };
        },
      },
      {
        id: 'aire-du-carre',
        univers: 'maison-courses',
        versions: [2, 3, 4, 5, 6, 10],
        genere(c) {
          const k = c.alea.choisir(this.versions);
          return {
            enonce: 'L’aire d’un carré de côté c est donnée par A = c × c. Quelle est l’aire d’une terrasse carrée de ' + k + ' m de côté, en m² ?',
            reponse: { type: 'nombre', valeur: k * k },
            aide: 'Calcule ' + k + ' × ' + k + '.',
            aideParlee: 'Remplace c par la longueur du côté, et multiplie ce nombre par lui-même.',
            correction: [k + ' × ' + k + ' = ' + k * k + ' m².'],
          };
        },
      },
      Q('quelle-formule', 'dehors',
        [['Un carnet de tickets : 3 € le ticket.', 'prix = 3 × n'], ['Une location : 5 € pour le casque, puis 3 € par heure.', 'prix = 5 + 3 × n'], ['Un jus à 3 €, avec une remise de 1 € sur le tout.', 'prix = 3 × n − 1']],
        (x) => x + ' Pour n tickets, heures ou jus, quelle formule convient ?', ['prix = 3 × n', 'prix = 5 + 3 × n', 'prix = 3 × n − 1'],
        'Cherche ce qui se paie une seule fois, et ce qui se paie chaque fois.',
        'Ce qui se paie chaque fois se multiplie par n. Ce qui se paie une seule fois s’ajoute ou s’enlève une fois.'),
      {
        id: 'qui-depend',
        univers: 'maison-courses',
        // [question, bonne réponse, les autres choix]
        versions: [['Le prix du tissu, vendu au mètre, dépend :', 'De la longueur achetée', ['Du nom du vendeur', 'Du jour de la semaine']], ['Le temps de remplissage d’un seau, à débit fixe, dépend :', 'Du volume du seau', ['De la couleur du seau', 'Du prénom de la personne']], ['La distance parcourue, à vitesse fixe, dépend :', 'De la durée du trajet', ['De la couleur du vélo', 'Du nom de la rue']]],
        genere(c) {
          const [x, b, autres] = c.alea.choisir(this.versions);
          return {
            enonce: x,
            reponse: O.choix(c.alea, b, [b].concat(autres)),
            aide: 'Quelle grandeur, si on la change, change l’autre ?',
            correction: ['Une grandeur dépend d’une autre si, quand on change la seconde, on sait calculer la première.', 'Réponse : ' + b + '.'],
          };
        },
      },
    ],

    defi: {
      // [frais de location, prix par heure, heures, budget]
      versions: [[5, 3, 4, 20], [4, 2, 6, 16], [6, 4, 3, 22], [10, 5, 2, 30]],
      genere(c) {
        const [f, p, h, b] = c.alea.choisir(this.versions);
        const n = (b - f) / p;
        return {
          enonce: 'Un loueur de vélos applique le tarif suivant : ' + f + ' € pour le casque, puis ' + p + ' € par heure. Moussa loue un vélo pendant n heures.',
          questions: [
            {
              texte: 'Question 1. Combien paie-t-il pour ' + h + ' heures, en euros ?',
              reponse: { type: 'nombre', valeur: f + p * h },
              aide: 'Multiplie le prix d’une heure par le nombre d’heures, puis ajoute le casque.',
              correction: [p + ' × ' + h + ' = ' + p * h + '.', p * h + ' + ' + f + ' = ' + (f + p * h) + ' €.'],
            },
            {
              texte: 'Question 2. Écris sur ton cahier le prix en fonction de n, puis dis combien d’heures il peut louer avec ' + b + ' €.',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Enlève le prix du casque au budget, puis divise par le prix d’une heure.',
              correction: ['Le prix est : ' + f + ' + ' + p + ' × n.', b + ' − ' + f + ' = ' + (b - f) + '.', (b - f) + ' ÷ ' + p + ' = ' + n + ' heures.'],
            },
            {
              texte: 'Question 3. Le prix est-il proportionnel au nombre d’heures ? Justifie.',
              correction: ['Non : pour 0 heure, il paie déjà le casque.', 'Pour deux fois plus d’heures, le prix n’est pas multiplié par 2 : le prix n’est pas proportionnel.'],
              grille: ['As-tu répondu non ?', 'As-tu parlé du prix du casque, ou d’un calcul qui le montre ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une règle avec une lettre, et tu peux tout calculer, pour n’importe quelle distance.',
    carte: ['prix-du-taxi', 'quelle-formule', 'qui-depend'],
    papierDuSoir: { exercices: ['perimetre-carre', 'aire-du-carre'], defi: true },
    automatismes: [
      {
        id: 'remplacer',
        versions: [[3, 2, 4], [2, 5, 3], [4, 3, 5], [5, 2, 6]],
        genere(c) { const [a, b, x] = c.alea.choisir(this.versions); return { enonce: 'Si x = ' + x + ', combien vaut ' + a + ' × x + ' + b + ' ?', reponse: { type: 'nombre', valeur: a * x + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, François Viète proposa en 1591 d’écrire avec des lettres les quantités connues et inconnues.',
    prenoms: ['Clarisse', 'Moussa'],
  };
});
