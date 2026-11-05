/* Notion 10 du bloc de technologie « Le numérique et l'intelligence artificielle » : usages et biais de l'intelligence artificielle. L'assistant vocal de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const OUI = 'Oui', NON = 'Non';

  return {
    id: 'ia-usages-biais',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Usages et biais de l’intelligence artificielle',
    classe: 'cycle 4',
    univers: ['famille', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : usages de l’intelligence artificielle, biais, esprit critique.',

    accroche: {
      texte: 'Laure parle à l’assistant de son téléphone. Il comprend mal son accent, et se trompe de numéro. Pourtant, il comprend très bien la voix du présentateur de la radio. ' +
        'Laure parle-t-elle mal ? Pas du tout. L’assistant a surtout appris sur d’autres voix que la sienne.',
      image: { dessin: 'barres', barres: [{ nom: 'Voix A', parts: 9 }, { nom: 'Voix B', parts: 1 }], description: 'Deux barres : le programme a appris avec neuf fois plus de voix de type A que de voix de type B.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Un programme apprend sur des données', 'Ces données oublient des personnes', 'Il se trompe plus souvent pour elles'], description: 'Un programme apprend sur des données ; ces données oublient des personnes ; il se trompe plus souvent pour elles.' },
      etapes: [
        'Ces programmes rendent déjà de grands services : traduire une langue, reconnaître une image, aider un médecin, résumer un texte.',
        'Mais ils n’apprennent que ce que contiennent leurs exemples. Si un groupe y est peu présent, ils se trompent davantage pour lui.',
        'Ils peuvent aussi donner une réponse fausse avec beaucoup d’assurance : ils ne savent pas ce qui est vrai, ils calculent ce qui est probable.',
        'Alors, on garde son esprit critique : on vérifie, et une personne décide pour les choix importants.',
      ],
    },

    decouverte: {
      texte: (c) => 'Les exemples oublient parfois certaines personnes. Le programme hérite alors de ce manque : c’est ' + c.mot('biais') + '. ' +
        'Il peut aussi inventer une réponse qui paraît vraie. C’est ' + c.mot('hallucination') + '. ' +
        'L’astuce : c’est un outil. Vérifie ce qu’il dit, comme tu vérifierais une rumeur.',
    },

    vocabulaire: {
      termes: {
        biais: { sesMots: 'un défaut appris', officiel: 'un biais', lesDeux: 'un défaut appris, que l’on appelle un biais' },
        hallucination: { sesMots: 'une invention', officiel: 'une hallucination', lesDeux: 'une invention, que les informaticiens appellent aussi une hallucination' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le défaut appris, et l’invention. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un biais, pour le défaut appris. Et une hallucination, pour l’invention.',
        'Tu connais les mots officiels : le biais et l’hallucination.',
      ],
    },

    exercices: [
      Q('ia-ou-pas', 'appareils',
        [['Une application qui traduit une phrase du français vers l’anglais', OUI], ['Un téléphone qui reconnaît un visage, pour s’ouvrir', OUI], ['Une ampoule qu’on allume avec un interrupteur', NON], ['Un site qui propose les vidéos qui pourraient te plaire', OUI], ['Une calculatrice qui fait une addition', NON]],
        (x) => x + ' : y a-t-il là, le plus souvent, un programme qui a appris sur des exemples ?', [OUI, NON],
        'L’appareil a-t-il appris sur des exemples, ou suit-il une règle simple ?',
        'Traduire, reconnaître un visage ou proposer une vidéo s’appuie sur des exemples. Une ampoule et une addition suivent une règle fixe.'),
      Q('cause-du-defaut', 'famille',
        [['Un assistant comprend mal certains accents.', 'Ils sont rares dans ses exemples'], ['Un programme reconnaît moins bien certains visages.', 'Ils sont rares dans ses exemples']],
        (x) => x + ' Quelle est la cause la plus probable ?', ['Ils sont rares dans ses exemples', 'Les personnes font une erreur', 'L’appareil est trop vieux'],
        'Le programme n’apprend que ce qu’on lui montre.',
        'Le défaut vient des exemples reçus pendant l’apprentissage, pas des personnes.'),
      {
        id: 'bon-reflexe',
        univers: 'appareils',
        // [situation, bon réflexe, les autres choix]
        versions: [['Un programme te donne une date, pour un exposé.', 'Vérifier dans une source sérieuse', ['Le croire sans vérifier', 'Recopier sa réponse telle quelle']], ['Un programme te cite un livre qui t’étonne.', 'Vérifier dans une source sérieuse', ['Le croire sans vérifier', 'Recopier sa réponse telle quelle']], ['Un programme te donne un conseil de santé.', 'Demander à un professionnel de santé', ['Le suivre sans rien demander', 'Le partager à tes amies']]],
        genere(c) {
          const [x, b, autres] = c.alea.choisir(this.versions);
          return {
            enonce: x + ' Quel est le bon réflexe ?',
            reponse: O.choix(c.alea, b, [b].concat(autres)),
            aide: 'Une réponse sûre d’elle n’est pas forcément vraie.',
            correction: ['Un programme peut inventer : on vérifie les faits dans une source sérieuse, et la santé avec un professionnel.', 'Réponse : ' + b + '.'],
          };
        },
      },
      {
        id: 'part-des-exemples',
        univers: 'famille',
        // [voix en tout, voix avec l'accent de Laure]
        versions: [[1000, 50], [500, 25], [200, 10], [1000, 100], [400, 20], [800, 40]],
        genere(c) {
          const [t, a] = c.alea.choisir(this.versions);
          const p = (a / t) * 100;
          return {
            enonce: 'Un assistant a appris sur ' + t + ' voix. Seulement ' + a + ' ont l’accent de Laure. Quel pourcentage cela représente-t-il ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + a + ' ÷ ' + t + ' × 100.',
            aideParlee: 'Divise les voix avec cet accent par le total, puis multiplie par cent.',
            correction: [a + ' ÷ ' + t + ' × 100 = ' + p + ' %.'],
          };
        },
      },
      {
        id: 'erreurs-par-groupe',
        univers: 'appareils',
        // [phrases, phrases mal comprises, sur 100]
        versions: [[200, 4], [500, 3], [100, 20], [400, 10], [200, 15], [300, 5]],
        genere(c) {
          const [n, e] = c.alea.choisir(this.versions);
          const f = (n * e) / 100;
          return {
            enonce: 'Sur ' + n + ' phrases, un assistant se trompe dans ' + e + ' % des cas. Combien de phrases comprend-il mal ?',
            reponse: { type: 'nombre', valeur: f },
            aide: 'Calcule ' + n + ' × ' + e + ' ÷ 100.',
            aideParlee: 'Multiplie le nombre de phrases par le pourcentage, puis divise par cent.',
            correction: [n + ' × ' + e + ' ÷ 100 = ' + f + ' phrases.'],
          };
        },
      },
    ],

    defi: {
      // [phrases par groupe, erreurs groupe A, erreurs groupe B]
      versions: [[200, 4, 40], [100, 2, 15], [500, 10, 75], [200, 6, 50]],
      genere(c) {
        const [n, a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : on teste un assistant vocal avec ' + n + ' phrases dites par des personnes du groupe A, très présent dans ses exemples, et ' + n + ' phrases dites par des personnes du groupe B, peu présent. Il se trompe ' + a + ' fois pour le groupe A, et ' + b + ' fois pour le groupe B.',
          questions: [
            {
              texte: 'Question 1. Quel est le pourcentage d’erreurs pour le groupe A ?',
              reponse: { type: 'nombre', valeur: (a / n) * 100 },
              aide: 'Divise les erreurs par le nombre de phrases, puis multiplie par cent.',
              correction: [a + ' ÷ ' + n + ' × 100 = ' + (a / n) * 100 + ' %.'],
            },
            {
              texte: 'Question 2. Quel est le pourcentage d’erreurs pour le groupe B ?',
              reponse: { type: 'nombre', valeur: (b / n) * 100 },
              aide: 'Fais le même calcul pour l’autre groupe.',
              correction: [b + ' ÷ ' + n + ' × 100 = ' + (b / n) * 100 + ' %.'],
            },
            {
              texte: 'Question 3. Explique ce résultat, et propose un moyen de le corriger.',
              correction: ['Ce programme a appris surtout sur le groupe A : il a un biais, il se trompe davantage pour le groupe B.', 'Pour corriger, on ajoute des exemples variés, dont beaucoup de phrases du groupe B, puis on teste de nouveau.'],
              grille: ['As-tu comparé les deux pourcentages ?', 'As-tu nommé le biais ?', 'As-tu proposé d’ajouter des exemples variés ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais à quoi sert ce genre d’outil, d’où viennent ses défauts, et pourquoi on vérifie.',
    carte: ['ia-ou-pas', 'cause-du-defaut', 'bon-reflexe'],
    papierDuSoir: { exercices: ['part-des-exemples', 'erreurs-par-groupe'], defi: true },
    automatismes: [
      {
        id: 'part-rapide',
        versions: [[10, 100], [50, 100], [5, 100], [20, 100]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' erreurs sur ' + b + ', en pourcentage = ?', reponse: { type: 'nombre', valeur: (a / b) * 100 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, en 2018, des logiciels d’analyse de visages se sont davantage trompés sur les femmes à peau foncée.',
    prenoms: ['Laure'],
  };
});
