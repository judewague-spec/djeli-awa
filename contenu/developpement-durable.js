/* Notion 15 du bloc de technologie « Les objets et la société » : les trois piliers du développement durable. L'atelier de réparation de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const PILIERS = ['L’environnement', 'Le social', 'L’économie'];

  return {
    id: 'developpement-durable',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Les trois piliers du développement durable',
    classe: '3e',
    univers: ['commerce', 'famille', 'champetre'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 31) : les piliers du développement durable.',

    accroche: {
      texte: 'Moussa ouvre un atelier de réparation de téléphones au village. Les vieux appareils ne finissent plus dans la nature. Trois jeunes du village apprennent le métier et ont un travail. ' +
        'Et l’atelier gagne assez d’argent pour durer. Une seule idée, et trois bonnes nouvelles !',
      image: { dessin: 'chaine', etapes: ['Moins de déchets dans la nature', 'Des jeunes formés, avec un travail', 'Un atelier qui gagne assez pour durer'], description: 'Les trois bonnes nouvelles de l’atelier : moins de déchets dans la nature, des jeunes formés avec un travail, un atelier qui gagne assez pour durer.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Nature', parts: 1 }, { nom: 'Les gens', parts: 1 }, { nom: 'L’argent', parts: 1 }], description: 'Trois colonnes de même taille : la nature, les gens, l’argent.' },
      etapes: [
        'Un projet est bon pour la nature s’il pollue peu et ménage les ressources.',
        'Il est bon pour les gens s’il crée du travail, protège la santé et ne laisse personne de côté.',
        'Il est bon pour l’argent s’il fait vivre ceux qui y travaillent, sans gaspiller.',
        'Un projet solide tient sur les trois colonnes à la fois. Il pense à aujourd’hui et à demain.',
      ],
    },

    decouverte: {
      texte: (c) => 'Répondre aux besoins d’aujourd’hui sans abîmer le monde de demain, c’est ' + c.mot('durable') + '. Il repose sur ' + c.mot('piliers') + ' : l’environnement, le social et l’économie. ' +
        'Un bon projet doit tenir sur les trois. ' +
        'L’astuce : la nature, les gens, l’argent. Si un des trois manque, le projet est bancal.',
    },

    vocabulaire: {
      termes: {
        durable: { sesMots: 'penser aussi à demain', officiel: 'le développement durable', lesDeux: 'penser aussi à demain, que l’on appelle le développement durable' },
        piliers: { sesMots: 'trois colonnes', officiel: 'trois piliers', lesDeux: 'trois colonnes, que l’on appelle les trois piliers' },
      },
      textes: [
        'Pour l’instant, garde tes mots : penser aussi à demain, avec trois colonnes, la nature, les gens et l’argent. ' +
          'Il existe des mots officiels : je te les dirai la prochaine fois.',
        'On dit : le développement durable, et ses trois piliers, l’environnement, le social et l’économie.',
        'Tu connais les mots officiels : le développement durable et ses trois piliers, environnemental, social et économique.',
      ],
    },

    exercices: [
      O.qcm('quel-pilier', 'commerce',
        [['L’atelier recycle les batteries usées.', 'L’environnement'], ['Trois jeunes apprennent le métier de réparateur.', 'Le social'], ['L’atelier gagne assez pour payer ses employés.', 'L’économie'],
          ['L’atelier fait payer ses réparations assez pour couvrir ses dépenses.', 'L’économie'], ['L’atelier forme aussi des femmes du village.', 'Le social'], ['Les vieux téléphones ne finissent plus dans la rivière.', 'L’environnement']],
        (x) => '« ' + x + ' » Quel pilier du développement durable est concerné ?', PILIERS,
        'La nature, les gens, ou l’argent ?'),
      O.qcm('pilier-oublie', 'champetre',
        [['Une usine crée beaucoup d’emplois et gagne de l’argent, mais elle vide ses déchets dans la rivière.', 'L’environnement'], ['Un projet protège la forêt et fait vivre ses employés, mais il ne paie pas les femmes autant que les hommes.', 'Le social'],
          ['Une coopérative recycle tout et forme les jeunes, mais elle perd de l’argent chaque mois et va fermer.', 'L’économie']],
        (x) => '« ' + x + ' » Quel pilier est oublié ?', PILIERS,
        'Cherche la colonne qui manque.'),
      O.qcm('durable-ou-pas', 'famille',
        [['Un atelier répare les vieux téléphones, forme des jeunes et gagne assez pour payer ses employés.', 'Oui, il tient sur les trois piliers'], ['Brûler les déchets pour gagner de la place.', 'Non, un pilier au moins est oublié'], ['Une coopérative qui recycle, emploie et gagne assez pour durer.', 'Oui, il tient sur les trois piliers']],
        (x) => '« ' + x + ' » Ce projet est-il durable ?', ['Oui, il tient sur les trois piliers', 'Non, un pilier au moins est oublié'],
        'Vérifie la nature, les gens et l’argent.'),
      {
        id: 'telephones-sauves',
        univers: 'commerce',
        // [réparateurs, téléphones réparés par réparateur et par semaine, semaines]
        versions: [[3, 10, 4], [2, 15, 4], [4, 8, 5], [3, 12, 10], [5, 6, 4]],
        genere(c) {
          const [r, t, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans l’atelier, ' + r + ' réparateurs réparent chacun ' + t + ' téléphones par semaine. Combien de téléphones sont sauvés en ' + s + ' semaines ?',
            reponse: { type: 'nombre', valeur: r * t * s },
            aide: 'Calcule ' + r + ' × ' + t + ' × ' + s + '.',
            aideParlee: 'Multiplie le nombre de réparateurs, les téléphones d’une semaine, et le nombre de semaines.',
            correction: [r + ' × ' + t + ' = ' + r * t + ' par semaine.', r * t + ' × ' + s + ' = ' + r * t * s + ' téléphones.'],
          };
        },
      },
      {
        id: 'benefice',
        univers: 'commerce',
        // [recettes du mois, dépenses du mois] en euros
        versions: [[1200, 900], [1500, 1100], [800, 650], [2000, 1700], [1000, 750]],
        genere(c) {
          const [r, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Ce mois-ci, l’atelier a gagné ' + r + ' euros et dépensé ' + d + ' euros pour les pièces et les salaires. Combien lui reste-t-il ?',
            reponse: { type: 'nombre', valeur: r - d },
            aide: 'Calcule ' + r + ' − ' + d + '.',
            aideParlee: 'Soustrais les dépenses à ce que l’atelier a gagné.',
            correction: [r + ' − ' + d + ' = ' + (r - d) + ' euros.'],
          };
        },
      },
    ],

    defi: {
      // [réparateurs, téléphones par réparateur et par semaine, recettes du mois, dépenses du mois]
      versions: [[3, 10, 1200, 900], [2, 15, 1500, 1100], [4, 8, 800, 650], [3, 12, 2000, 1700]],
      genere(c) {
        const [r, t, rec, dep] = c.alea.choisir(this.versions);
        return {
          enonce: 'L’atelier de Moussa emploie ' + r + ' jeunes du village. Chacun répare ' + t + ' téléphones par semaine. Ce mois-ci, l’atelier a gagné ' + rec + ' euros et dépensé ' + dep + ' euros.',
          questions: [
            {
              texte: 'Question 1. Combien de téléphones sont réparés en 4 semaines ?',
              reponse: { type: 'nombre', valeur: r * t * 4 },
              aide: 'Multiplie le nombre de réparateurs, les téléphones d’une semaine, et le nombre de semaines.',
              correction: [r + ' × ' + t + ' × 4 = ' + r * t * 4 + ' téléphones.'],
            },
            {
              texte: 'Question 2. Combien reste-t-il à l’atelier ce mois-ci ?',
              reponse: { type: 'nombre', valeur: rec - dep },
              aide: 'Soustrais les dépenses à ce que l’atelier a gagné.',
              correction: [rec + ' − ' + dep + ' = ' + (rec - dep) + ' euros.'],
            },
            {
              texte: 'Question 3. Montre que l’atelier de Moussa est un projet de développement durable : donne un argument pour chacun des trois piliers.',
              correction: ['Environnement : les téléphones réparés ne deviennent pas des déchets.', 'Social : des jeunes du village sont formés et ont un travail.', 'Économie : l’atelier gagne plus qu’il ne dépense, il peut durer.'],
              grille: ['As-tu un argument pour l’environnement ?', 'As-tu un argument pour le social ?', 'As-tu un argument pour l’économie ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! La nature, les gens, l’argent : tu sais vérifier qu’un projet tient sur ses trois piliers.',
    carte: ['quel-pilier', 'pilier-oublie', 'durable-ou-pas'],
    papierDuSoir: { exercices: ['telephones-sauves', 'benefice'], defi: true },
    automatismes: [
      {
        id: 'soustraction-rapide',
        versions: [[1200, 900], [1500, 1100], [800, 650], [1000, 750]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, Wangari Maathai a fait planter des millions d’arbres par des femmes. En 2004, elle a reçu le prix Nobel de la paix.',
    prenoms: ['Moussa'],
  };
});
