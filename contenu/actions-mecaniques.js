/* Notion 5 du bloc « Mouvement et forces » : les actions de contact et à distance. Le marteau du forgeron, l'aimant et le clou.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const TYPES = ['Action de contact', 'Action à distance', 'Aucune action'];

  return {
    id: 'actions-mecaniques',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'Les actions de contact et à distance',
    classe: '4e',
    univers: ['appareils', 'champetre', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : identifier les interactions de contact ou à distance.',

    accroche: {
      texte: 'À la forge, le marteau frappe le fer rouge : le fer se déforme. Moussa pousse le chariot de charbon : le chariot démarre. ' +
        'Puis Rachel approche un aimant d’un clou posé sur l’établi. Le clou saute vers l’aimant, sans que rien ne l’ait touché ! Le marteau et l’aimant font-ils la même chose ?',
      image: { dessin: 'chaine', etapes: ['Le marteau touche le fer', 'L’aimant ne touche pas le clou', 'Les deux agissent'], description: 'Le marteau touche le fer. L’aimant ne touche pas le clou. Pourtant, les deux agissent sur l’autre objet.' },
    },

    manipulation: {
      etapes: [
        'Quand un objet agit sur un autre, on nomme toujours les deux : celui qui agit, et celui qui reçoit.',
        'Le marteau agit sur le fer. Ils se touchent : c’est une action de contact.',
        'L’aimant agit sur le clou. Ils ne se touchent pas : c’est une action à distance.',
        'La Terre agit aussi à distance : une mangue tombe alors que rien ne la touche.',
        'Une action peut déformer un objet, le mettre en mouvement, changer sa vitesse ou changer sa direction.',
        'Et les actions vont par deux : si l’aimant attire le clou, le clou attire aussi l’aimant.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le marteau et l’aimant font la même chose : ' + c.mot('action') + '. Si les deux objets se touchent, c’est ' + c.mot('contact') + '. ' +
        'Sinon, c’est ' + c.mot('distance') + '. ' +
        'L’astuce : demande-toi d’abord si les deux objets se touchent.',
    },

    vocabulaire: {
      termes: {
        action: { sesMots: 'une façon d’agir sur un objet', officiel: 'une action mécanique', lesDeux: 'une façon d’agir sur un objet, que les physiciens appellent une action mécanique' },
        contact: { sesMots: 'un effet en touchant', officiel: 'une action de contact', lesDeux: 'un effet en touchant, que les physiciens appellent une action de contact' },
        distance: { sesMots: 'un effet sans toucher', officiel: 'une action à distance', lesDeux: 'un effet sans toucher, que les physiciens appellent une action à distance' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une façon d’agir sur un objet, un effet en touchant, un effet sans toucher. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : une action mécanique, de contact ou à distance. Et deux objets qui agissent l’un sur l’autre sont en interaction.',
        'Tu connais les mots officiels : une action mécanique, de contact ou à distance, et une interaction.',
      ],
    },

    exercices: [
      O.qcm('contact-ou-distance', 'appareils',
        [['Le marteau frappe le fer.', 'Action de contact'], ['L’aimant attire un clou sans le toucher.', 'Action à distance'], ['La Terre attire une mangue qui tombe.', 'Action à distance'], ['Laure pousse son chariot au marché.', 'Action de contact'], ['Le vent pousse une pirogue à voile.', 'Action de contact'], ['Le peigne frotté attire de petits bouts de papier, sans les toucher.', 'Action à distance']],
        (x) => x + ' De quel type d’action s’agit-il ?', TYPES,
        'Demande-toi si les deux objets se touchent.'),
      O.qcm('qui-agit', 'champetre',
        [['Moussa tire une charrette. Qui agit sur la charrette ?', 'Moussa'], ['Une mangue tombe de l’arbre. Qui agit sur la mangue en chute ?', 'La Terre'], ['Un aimant attire un clou. Qui agit sur le clou ?', 'L’aimant']],
        (x) => x, ['Moussa', 'La Terre', 'L’aimant'],
        'Cherche l’objet qui fait bouger ou qui attire l’autre.'),
      O.qcm('effet-de-l-action', 'maison-courses',
        [['Le marteau aplatit le fer.', 'L’objet se déforme'], ['Moussa pousse le chariot immobile : il démarre.', 'L’objet se met en mouvement'], ['Le gardien de but dévie le ballon.', 'La direction de l’objet change']],
        (x) => x + ' Quel est l’effet de l’action ?', ['L’objet se déforme', 'L’objet se met en mouvement', 'La direction de l’objet change'],
        'Regarde ce qui change pour l’objet : sa forme, son départ, ou sa direction.'),
      {
        id: 'compter-les-distances',
        univers: 'champetre',
        // [liste d'actions, nombre d'actions à distance]
        versions: [
          ['la Terre sur une noix de coco qui tombe ; la main sur une porte ; un aimant sur un trombone', 2],
          ['le pied sur un ballon ; le marteau sur un clou ; un aimant sur une aiguille', 1],
          ['un aimant sur un clou ; la Terre sur la Lune ; la Terre sur une pomme qui tombe', 3],
          ['le vent sur une voile ; le pied sur le sol ; la main sur un sac', 0],
        ],
        genere(c) {
          const [l, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Voici trois actions : ' + l + '. Combien sont des actions à distance ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Pour chacune, demande-toi si les deux objets se touchent.',
            correction: ['Une action à distance agit sans toucher : il y en a ' + n + ' dans cette liste.'],
          };
        },
      },
      O.qcm('l-interaction', 'appareils',
        [['Un aimant attire un clou. Que fait le clou ?', 'Il attire aussi l’aimant'], ['La Terre attire la Lune. Que fait la Lune ?', 'Elle attire aussi la Terre'], ['Rachel pousse un mur. Que fait le mur ?', 'Il pousse aussi Rachel']],
        (x) => x, ['Il attire aussi l’aimant', 'Elle attire aussi la Terre', 'Il pousse aussi Rachel'],
        'Les actions vont toujours par deux : si l’un agit sur l’autre, l’autre agit aussi sur lui.'),
    ],

    defi: {
      // [objet tiré, personnage] : la scène change, le raisonnement reste
      versions: [['un sac de charbon'], ['une caisse de clous'], ['un panier de manioc']],
      genere(c) {
        const [o] = c.alea.choisir(this.versions);
        return {
          enonce: 'Dans la cour de la forge, Rebecca tire ' + o + ' avec une corde. Au même moment, une mangue se détache d’un arbre et tombe sur le sol.',
          questions: [
            {
              texte: 'Question 1. De quel type est l’action de la corde sur ' + o + ' ?',
              reponse: O.choix(c.alea, 'Action de contact', ['Action à distance', 'Aucune action']),
              aide: 'La corde touche-t-elle l’objet ?',
              correction: ['La corde touche l’objet.', 'Réponse : Action de contact.'],
            },
            {
              texte: 'Question 2. De quel type est l’action de la Terre sur la mangue en train de tomber ?',
              reponse: O.choix(c.alea, 'Action à distance', ['Action de contact', 'Aucune action']),
              aide: 'La Terre touche-t-elle la mangue pendant sa chute ?',
              correction: ['Pendant la chute, rien ne touche la mangue.', 'Réponse : Action à distance.'],
            },
            {
              texte: 'Question 3. Écris en une phrase ce qui agit sur la mangue quand elle tombe, en nommant l’objet qui agit et l’objet qui reçoit l’action.',
              correction: ['La Terre exerce une action à distance sur la mangue, et cette action la fait tomber.'],
              grille: ['As-tu nommé la Terre et la mangue ?', 'As-tu dit que l’action se fait à distance ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le marteau touche, l’aimant non : tu sais reconnaître une action, avec ou sans contact.',
    carte: ['contact-ou-distance', 'effet-de-l-action', 'l-interaction'],
    papierDuSoir: { exercices: ['compter-les-distances', 'contact-ou-distance'], defi: true },
    automatismes: [
      {
        id: 'contact-rapide',
        versions: [['Un aimant sur un clou', 'À distance'], ['Une main sur une porte', 'De contact'], ['La Terre sur une mangue qui tombe', 'À distance'], ['Un marteau sur le fer', 'De contact']],
        genere(c) {
          const [s, b] = c.alea.choisir(this.versions);
          return { enonce: s + ' : action de contact ou à distance ?', reponse: O.choix(c.alea, b, ['À distance', 'De contact'].filter((x) => x !== b)) };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Japon, un train flotte au-dessus de sa voie grâce à des aimants. En 2015, sur une ligne d’essai, il a atteint 603 kilomètres par heure.',
    prenoms: ['Moussa', 'Rachel', 'Laure', 'Rebecca'],
  };
});
