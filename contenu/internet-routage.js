/* Notion 17 du bloc de technologie « Le numérique et l'intelligence artificielle » : Internet, routeur, serveur et routage. Le message d'Aminata à Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const ROUTEUR = 'Un routeur', SERVEUR = 'Un serveur', PAQUET = 'Un paquet';

  return {
    id: 'internet-routage',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Internet : routeur, serveur et routage',
    classe: '3e',
    univers: ['appareils', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : Internet, routeur, serveur, routage.',

    accroche: {
      texte: 'Aminata envoie un message à Moussa, qui vit dans un autre pays. Elle appuie sur envoyer, et il le reçoit presque aussitôt. Pourtant, aucun fil ne relie directement leurs deux téléphones. ' +
        'Par où ce message est-il passé ?',
      image: { dessin: 'routage', description: 'Le chemin d’un message. Le téléphone d’Aminata est relié au carrefour A. A est relié à B et à C. B est relié à D. La liaison entre C et D est coupée. D est relié à l’ordinateur des messages, puis au téléphone de Moussa.' },
    },

    manipulation: {
      type: 'routage',
      consigne: 'Tu es le message d’Aminata. À chaque carrefour, choisis où aller. Attention : une liaison est coupée. Arrive jusqu’au téléphone de Moussa.',
    },

    decouverte: {
      texte: (c) => 'Internet relie des réseaux entre eux. Un message y voyage en petits morceaux : les paquets. Entre ces réseaux, on trouve ' + c.mot('routeurs') + '. Choisir le chemin, c’est ' + c.mot('routage') + '. ' +
        'Les messages sont gardés et distribués par ' + c.mot('serveur') + '. ' +
        'L’astuce : si une route est coupée, le message en prend une autre.',
    },

    vocabulaire: {
      termes: {
        routeurs: { sesMots: 'de grands carrefours', officiel: 'des routeurs', lesDeux: 'de grands carrefours, que l’on appelle des routeurs' },
        routage: { sesMots: 'la navigation', officiel: 'le routage', lesDeux: 'la navigation, que l’on appelle le routage' },
        serveur: { sesMots: 'un ordinateur toujours allumé', officiel: 'un serveur', lesDeux: 'un ordinateur toujours allumé, que l’on appelle un serveur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les carrefours, la navigation, et l’ordinateur toujours allumé. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un routeur, pour le carrefour. Le routage, pour la navigation. Un serveur, pour l’ordinateur toujours allumé.',
        'Tu connais les mots officiels : le routeur, le routage, le serveur et le paquet de données.',
      ],
    },

    exercices: [
      Q('qui-fait-quoi', 'appareils',
        [['Il choisit vers où envoyer les données, à chaque carrefour.', ROUTEUR], ['Il garde des messages ou des pages, et les fournit à ceux qui les demandent.', SERVEUR], ['C’est un petit morceau d’un message, qui voyage sur le réseau.', PAQUET]],
        (x) => x + ' De quoi parle-t-on ?', [ROUTEUR, SERVEUR, PAQUET],
        'Le carrefour, l’ordinateur toujours allumé, ou le morceau de message ?',
        'Le routeur oriente, le serveur garde et fournit, et le paquet est un morceau de message.'),
      Q('route-coupee', 'famille',
        [['Une liaison entre deux routeurs est coupée. Que devient le message ?', 'Il prend un autre chemin'], ['Pourquoi un message arrive-t-il, même si une route est en panne ?', 'Il prend un autre chemin']],
        (x) => x, ['Il prend un autre chemin', 'Il est perdu à tout jamais', 'Il revient toujours à l’expéditeur'],
        'Internet a beaucoup de chemins.',
        'Le réseau a beaucoup de chemins : les routeurs orientent les données vers une route qui marche.'),
      Q('internet-ou-web', 'appareils',
        [['Quel est le rôle d’Internet ?', 'Il relie les réseaux entre eux'], ['Que fait Internet, entre les réseaux du monde ?', 'Il relie les réseaux entre eux']],
        (x) => x, ['Il relie les réseaux entre eux', 'Il garde une seule page', 'Il remplace tous les téléphones'],
        'Pense aux carrefours.',
        'Internet relie les réseaux du monde entre eux. Les pages que tu lis sont gardées sur des serveurs.'),
      {
        id: 'combien-de-paquets',
        univers: 'appareils',
        // [poids du message en ko, poids d'un paquet en ko]
        versions: [[100, 5], [60, 2], [40, 4], [150, 3], [200, 8], [90, 5]],
        genere(c) {
          const [m, p] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un message pèse ' + m + ' ko. Il est découpé en paquets de ' + p + ' ko. Combien y a-t-il de paquets ?',
            reponse: { type: 'nombre', valeur: m / p },
            aide: 'Calcule ' + m + ' ÷ ' + p + '.',
            aideParlee: 'Divise le poids du message par le poids d’un paquet.',
            correction: [m + ' ÷ ' + p + ' = ' + m / p + ' paquets.'],
          };
        },
      },
      {
        id: 'duree-du-trajet',
        univers: 'famille',
        // [routeurs traversés, millisecondes à chaque routeur]
        versions: [[10, 5], [8, 15], [12, 10], [15, 4], [6, 20], [20, 5]],
        genere(c) {
          const [r, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le message d’Aminata traverse ' + r + ' routeurs. Il met ' + t + ' millisecondes pour chacun. Combien de millisecondes dure le trajet ?',
            reponse: { type: 'nombre', valeur: r * t },
            aide: 'Calcule ' + r + ' × ' + t + '.',
            aideParlee: 'Multiplie le nombre de routeurs par le temps passé à chacun.',
            correction: [r + ' × ' + t + ' = ' + ecr(r * t) + ' millisecondes.'],
          };
        },
      },
    ],

    defi: {
      // [routeurs chemin A, routeurs chemin B, millisecondes par routeur]
      versions: [[8, 5, 10], [12, 9, 5], [10, 6, 20], [7, 4, 15]],
      genere(c) {
        const [a, b, t] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : le message d’Aminata peut prendre le chemin A, qui traverse ' + a + ' routeurs, ou le chemin B, qui en traverse ' + b + '. Chaque routeur prend ' + t + ' millisecondes. Le chemin B passe par le même serveur que le chemin A.',
          image: { dessin: 'barres', barres: [{ nom: 'Chemin A', parts: a }, { nom: 'Chemin B', parts: b }], description: 'Deux barres, chaque part vaut un routeur : le chemin A est plus long que le chemin B.' },
          questions: [
            {
              texte: 'Question 1. Combien de millisecondes dure le chemin A ?',
              reponse: { type: 'nombre', valeur: a * t },
              aide: 'Multiplie le nombre de routeurs par le temps de chacun.',
              correction: [a + ' × ' + t + ' = ' + a * t + ' millisecondes.'],
            },
            {
              texte: 'Question 2. Combien de millisecondes le chemin B fait-il gagner ?',
              reponse: { type: 'nombre', valeur: (a - b) * t },
              aide: 'Calcule la durée du chemin B, puis fais la différence.',
              correction: [b + ' × ' + t + ' = ' + b * t + ' millisecondes.', a * t + ' − ' + b * t + ' = ' + (a - b) * t + ' millisecondes.'],
            },
            {
              texte: 'Question 3. Explique le rôle des routeurs et du serveur dans le voyage de ce message.',
              correction: ['Les routeurs orientent le message, de carrefour en carrefour, vers son destinataire.', 'Le serveur garde le message et le remet au téléphone de Moussa, même si celui-ci était éteint.'],
              grille: ['As-tu donné le rôle des routeurs ?', 'As-tu donné le rôle du serveur ?', 'As-tu décrit le trajet, d’un téléphone à l’autre ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Routeurs, serveur, routage : ton message n’a plus de secret, d’un pays à l’autre.',
    carte: ['qui-fait-quoi', 'route-coupee', 'internet-ou-web'],
    papierDuSoir: { exercices: ['combien-de-paquets', 'duree-du-trajet'], defi: true },
    automatismes: [
      {
        id: 'paquets-rapide',
        versions: [[100, 5], [60, 2], [40, 4], [80, 8]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ko, en paquets de ' + b + ' ko : paquets = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le câble sous-marin SAIL relie Kribi, au Cameroun, à Fortaleza, au Brésil.',
    prenoms: ['Aminata', 'Moussa'],
  };
});
