/* Notion 6 du bloc de technologie « Comment un objet fonctionne » : le schéma-bloc. Le portail automatique de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;

  return {
    id: 'schema-bloc',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Le schéma-bloc',
    classe: '3e',
    univers: ['maison-courses', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : schéma-bloc, chaîne d’énergie et chaîne d’information d’un système automatique.',

    accroche: {
      texte: 'Le portail de Laure s’ouvre tout seul. Rachel appuie sur la télécommande, et le portail glisse. Qui donne l’ordre ? Qui le fait bouger ? ' +
        'Un simple dessin en boîtes peut tout expliquer.',
      image: { dessin: 'chaine', etapes: ['Télécommande : elle envoie l’ordre', 'Carte : elle décide', 'Moteur : il fait bouger', 'Portail : il s’ouvre'], description: 'Le portail en quatre boîtes reliées : la télécommande envoie l’ordre, la carte décide, le moteur fait bouger, le portail s’ouvre.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Télécommande, puis ordre, puis carte', 'Carte, puis courant, puis moteur', 'Moteur, puis mouvement, puis portail', 'Cellule, puis signal d’obstacle, puis carte'], description: 'Le schéma du portail, décrit en mots : la télécommande envoie un ordre à la carte. La carte envoie du courant au moteur. Le moteur donne du mouvement au portail. La cellule envoie un signal d’obstacle à la carte.' },
      etapes: [
        'Un portail automatique se dessine en boîtes : chaque boîte a un seul travail.',
        'La télécommande envoie l’ordre. La carte le reçoit et décide quoi faire.',
        'La carte envoie le courant au moteur. Le moteur fait tourner un mécanisme, et le portail bouge.',
        'Une cellule devant le portail repère un obstacle et prévient la carte, qui arrête le moteur.',
        'Sur le dessin, une flèche relie deux boîtes : elle montre ce qui passe de l’une à l’autre.',
        'Une flèche porte soit un ordre, soit de l’énergie. Les deux se lisent sur le même dessin.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le moteur, la carte, la télécommande : chacun est ' + c.mot('bloc') + '. ' +
        'Regarde une flèche du dessin : c’est ' + c.mot('flux') + '. ' +
        'Regarde le trajet du courant, de la prise jusqu’au portail : c’est ' + c.mot('chaineE') + '. ' +
        'Regarde le trajet de l’ordre, de la télécommande jusqu’à la carte : c’est ' + c.mot('chaineI') + '. ' +
        'L’astuce : un même dessin montre l’ordre et l’énergie, chacun sur ses flèches.',
    },

    vocabulaire: {
      termes: {
        bloc: { sesMots: 'une boîte qui a un seul travail', officiel: 'un bloc', lesDeux: 'une boîte qui a un seul travail. Les techniciens disent : un bloc' },
        flux: { sesMots: 'ce qui passe d’une boîte à l’autre', officiel: 'un flux', lesDeux: 'ce qui passe d’une boîte à l’autre. Les techniciens disent : un flux' },
        chaineE: { sesMots: 'la suite de boîtes qui fait bouger le portail', officiel: 'la chaîne d’énergie', lesDeux: 'la suite de boîtes qui fait bouger le portail. Les techniciens disent : la chaîne d’énergie' },
        chaineI: { sesMots: 'la suite de boîtes qui porte l’ordre', officiel: 'la chaîne d’information', lesDeux: 'la suite de boîtes qui porte l’ordre. Les techniciens disent : la chaîne d’information' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une boîte, ce qui passe d’une boîte à l’autre, et deux suites de boîtes. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : un bloc, pour une boîte. Un flux, pour ce qui passe d’un bloc à l’autre. La chaîne d’énergie et la chaîne d’information, pour les deux suites de blocs.',
        'Tu connais les mots officiels : le bloc, le flux, la chaîne d’énergie et la chaîne d’information.',
      ],
    },

    exercices: [
      O.qcm('role-du-bloc', 'appareils',
        [
          ['de la carte de commande', 'Décider quoi faire', 'La carte reçoit l’ordre et pilote le moteur.'],
          ['du moteur', 'Changer le courant en mouvement', 'Le moteur reçoit du courant et donne du mouvement.'],
          ['de la cellule', 'Repérer un obstacle', 'La cellule surveille le passage et prévient la carte.'],
          ['de la télécommande', 'Envoyer l’ordre', 'La télécommande envoie l’ordre d’ouvrir ou de fermer.'],
        ],
        (x) => 'Dans le portail automatique, quel est le travail ' + x + ' ?',
        ['Décider quoi faire', 'Changer le courant en mouvement', 'Repérer un obstacle', 'Envoyer l’ordre'],
        'Pense à ce que le bloc reçoit et à ce qu’il donne.'),
      O.qcm('quelle-chaine', 'maison-courses',
        [
          ['le moteur', 'La chaîne d’énergie', 'Le moteur reçoit de l’énergie et fait bouger le portail.'],
          ['la télécommande', 'La chaîne d’information', 'La télécommande envoie un ordre, donc une information.'],
          ['la cellule qui repère un obstacle', 'La chaîne d’information', 'La cellule envoie une information à la carte.'],
          ['la roue crantée qui entraîne le portail', 'La chaîne d’énergie', 'La roue transmet le mouvement du moteur : c’est de l’énergie.'],
          ['le courant qui va de la carte au moteur', 'La chaîne d’énergie', 'Le courant apporte l’énergie au moteur.'],
        ],
        (x) => 'Dans le schéma du portail, dans quelle chaîne place-t-on ' + x + ' ?',
        ['La chaîne d’énergie', 'La chaîne d’information', 'Aucune des deux'],
        'Demande-toi si ça porte un ordre ou de l’énergie.'),
      {
        id: 'que-porte-la-fleche',
        univers: 'appareils',
        // [flèche, bonne réponse, explication, autres choix si ce ne sont pas les choix habituels]
        versions: [
          ['de la télécommande vers la carte', 'Un ordre', 'La télécommande donne l’ordre d’ouvrir ou de fermer.'],
          ['de la carte vers le moteur', 'Du courant', 'La carte envoie du courant au moteur.', ['Du courant', 'De la lumière', 'Du mouvement']],
          ['du moteur vers le portail', 'Du mouvement', 'Le moteur donne du mouvement au portail.'],
          ['de la prise vers la carte', 'Du courant', 'La prise apporte le courant à la carte.'],
        ],
        genere(c) {
          const [x, bonne, pourquoi, toutes] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur le schéma du portail, que porte la flèche ' + x + ' ?',
            reponse: O.choix(c.alea, bonne, (toutes || ['Un ordre', 'Du courant', 'Du mouvement']).filter((t) => t !== bonne).slice(0, 2)),
            aide: 'Cherche si la flèche porte un ordre ou de l’énergie.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'vitesse-du-portail',
        univers: 'maison-courses',
        // [largeur parcourue en m, durée en s]
        versions: [[4, 10], [5, 20], [3, 15], [6, 20], [4, 16]],
        genere(c) {
          const [l, t] = c.alea.choisir(this.versions);
          const v = l / t;
          return {
            enonce: 'Le portail de Laure glisse de ' + l + ' m en ' + t + ' secondes, à vitesse constante. Quelle est sa vitesse, en mètres par seconde ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Divise la distance par la durée.',
            correction: [l + ' ÷ ' + t + ' = ' + ecr(v) + ' m/s.'],
          };
        },
      },
      {
        id: 'energie-du-moteur',
        univers: 'appareils',
        // [puissance du moteur en W, durée d'une ouverture en s]
        versions: [[150, 15], [120, 20], [200, 10], [180, 12], [100, 25]],
        genere(c) {
          const [p, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le moteur du portail a une puissance de ' + p + ' W. Il marche ' + t + ' secondes pour une ouverture. On rappelle E = P × t. Quelle énergie utilise-t-il, en joules ?',
            reponse: { type: 'nombre', valeur: p * t },
            aide: 'Multiplie la puissance par la durée en secondes.',
            correction: ['E = ' + p + ' × ' + t + ' = ' + p * t + ' J.'],
          };
        },
      },
    ],

    defi: {
      // [largeur parcourue en m, durée en s, puissance du moteur en W, seuil d'énergie en J]
      versions: [[4, 10, 150, 1200], [5, 20, 120, 3000], [3, 15, 200, 2500], [6, 20, 100, 2500]],
      genere(c) {
        const [l, t, p, s] = c.alea.choisir(this.versions);
        const v = l / t, e = p * t;
        const bonne = e > s ? 'Oui' : 'Non';
        return {
          enonce: 'Le portail de Laure glisse de ' + l + ' m en ' + t + ' secondes, à vitesse constante. Son moteur a une puissance de ' + p + ' W et marche pendant toute l’ouverture. On rappelle E = P × t. ' +
            'Rachel dessine le schéma : la télécommande et la cellule envoient des informations à la carte ; la carte envoie du courant au moteur ; le moteur donne du mouvement au portail.',
          image: { dessin: 'chaine', etapes: ['Télécommande et cellule : informations', 'Carte : elle décide', 'Moteur : il change le courant en mouvement', 'Portail : il glisse de ' + l + ' m'], description: 'Le schéma décrit en mots : la télécommande et la cellule envoient des informations à la carte. La carte envoie du courant au moteur. Le moteur donne du mouvement au portail, qui glisse de ' + l + ' mètres.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la vitesse du portail, en mètres par seconde ?',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Divise la distance par la durée.',
              correction: [l + ' ÷ ' + t + ' = ' + ecr(v) + ' m/s.'],
            },
            {
              texte: 'Question 2. Quelle énergie le moteur utilise-t-il pour une ouverture, en joules ?',
              reponse: { type: 'nombre', valeur: e },
              aide: 'Multiplie la puissance par la durée en secondes.',
              correction: ['E = ' + p + ' × ' + t + ' = ' + e + ' J.'],
            },
            {
              texte: 'Question 3. L’énergie d’une ouverture dépasse-t-elle ' + s + ' joules ?',
              reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
              aide: 'Compare l’énergie trouvée à la question 2 avec la valeur donnée.',
              correction: [e + ' J ' + (e > s ? 'dépasse ' : 'ne dépasse pas ') + s + ' J.', 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Décris en mots le schéma du portail : nomme quatre blocs, dis ce que porte chaque flux, et sépare la chaîne d’information de la chaîne d’énergie.',
              correction: ['Chaîne d’information : la télécommande et la cellule envoient des informations à la carte, qui décide.', 'Chaîne d’énergie : le courant va de la prise à la carte, puis au moteur, qui donne du mouvement au portail.'],
              grille: ['As-tu nommé au moins quatre blocs ?', 'As-tu dit ce que porte chaque flux : ordre, information ou énergie ?', 'As-tu séparé la chaîne d’information et la chaîne d’énergie ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Des boîtes, des flèches, un ordre et de l’énergie : tu lis le schéma d’un portail comme un technicien.',
    carte: ['role-du-bloc', 'quelle-chaine', 'que-porte-la-fleche'],
    papierDuSoir: { exercices: ['vitesse-du-portail', 'energie-du-moteur'], defi: true },
    automatismes: [
      {
        id: 'p-fois-t',
        // [puissance en W, durée en s]
        versions: [[100, 20], [50, 30], [200, 10], [150, 10]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, en 1927, Harold Black a dessiné son amplificateur sur un journal, dans un ferry.',
    prenoms: ['Rachel', 'Laure'],
  };
});
