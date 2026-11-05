/* Notion 16 du bloc de technologie « Le numérique et l'intelligence artificielle » : l'adresse IP. Les colis de la maison d'Esther.
   Les adresses des exemples sont des adresses privées d'école (192.168…) : aucune vraie adresse d'une personne.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const OK = 'Oui, elle est correcte', KO = 'Non, elle est incorrecte';
  const MEME = 'Oui, le même réseau', AUTRE = 'Non, deux réseaux différents';

  return {
    id: 'adresse-ip',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'L’adresse IP',
    classe: '4e',
    univers: ['famille', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : réseau, adresse IP.',

    accroche: {
      texte: 'Esther attend un colis. Pour qu’il arrive, le livreur a besoin d’une adresse : la rue, puis le numéro de la maison. Sur le réseau, c’est pareil. ' +
        'Quand ton téléphone envoie un message à l’imprimante, comment sait-il où l’envoyer ?',
      image: { dessin: 'facture', titre: 'Le réseau de la maison', lignes: [['Le téléphone', '192.168.1.12'], ['L’ordinateur', '192.168.1.20'], ['L’imprimante', '192.168.1.30']], description: 'Trois appareils du réseau de la maison, avec leur numéro : le téléphone, 192.168.1.12 ; l’ordinateur, 192.168.1.20 ; l’imprimante, 192.168.1.30.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['192.168.1 : la rue', '.12 : le numéro de la maison'], description: 'Un numéro en deux parties : 192.168.1, comme le nom de la rue, et douze, comme le numéro de la maison.' },
      etapes: [
        'Sur un réseau, chaque appareil a un numéro, formé de quatre nombres séparés par des points.',
        'Chacun de ces quatre nombres va de 0 à 255. Il tient donc dans un octet.',
        'Dans une maison, le plus souvent, les trois premiers nombres sont les mêmes pour tous : c’est comme le nom de la rue.',
        'Le dernier change, pour chaque appareil : c’est comme le numéro de la maison. Deux appareils du même réseau n’ont jamais le même.',
      ],
    },

    decouverte: {
      texte: (c) => 'Chaque appareil d’un réseau a ' + c.mot('ip') + '. Elle est formée de quatre nombres, de 0 à 255. ' +
        'Les premiers désignent ' + c.mot('rue') + '. Le dernier désigne l’appareil. ' +
        'L’astuce : pas d’adresse, pas de livraison.',
    },

    vocabulaire: {
      termes: {
        ip: { sesMots: 'une adresse de réseau', officiel: 'une adresse IP', lesDeux: 'une adresse de réseau, que l’on appelle une adresse IP' },
        rue: { sesMots: 'la rue', officiel: 'le réseau', lesDeux: 'la rue, c’est-à-dire le réseau' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’adresse de réseau, et la rue. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : une adresse IP, pour l’adresse de réseau. La rue, c’est le réseau, et le dernier nombre désigne l’appareil.',
        'Tu connais les mots officiels : l’adresse IP, le réseau, et l’appareil, appelé aussi hôte.',
      ],
    },

    exercices: [
      Q('correcte-ou-pas', 'appareils',
        [['192.168.1.12', OK], ['192.168.1.300', KO], ['10.0.0.5', OK], ['192.168.1', KO], ['172.16.256.1', KO]],
        (x) => 'Cette adresse IP est-elle correcte : ' + x + ' ?', [OK, KO],
        'Il faut quatre nombres, chacun de 0 à 255.',
        'Une adresse correcte a quatre nombres, séparés par des points, et aucun ne dépasse 255.'),
      Q('meme-reseau', 'famille',
        [[['192.168.1.12', '192.168.1.30'], MEME], [['192.168.1.12', '192.168.2.12'], AUTRE], [['192.168.1.5', '192.168.1.200'], MEME], [['10.0.0.5', '192.168.1.5'], AUTRE]],
        (x) => 'Dans une maison où les trois premiers nombres désignent le réseau, ces deux appareils sont-ils sur le même réseau : ' + x[0] + ' et ' + x[1] + ' ?', [MEME, AUTRE],
        'Compare seulement les trois premiers nombres.',
        'Si les trois premiers nombres sont identiques, les deux appareils sont dans la même rue, donc sur le même réseau.'),
      Q('a-quoi-ca-sert', 'appareils',
        [['À quoi sert une adresse IP ?', 'Pour trouver le bon appareil sur le réseau'], ['Pourquoi deux appareils du même réseau n’ont-ils pas la même adresse IP ?', 'Pour trouver le bon appareil sur le réseau']],
        (x) => x, ['Pour trouver le bon appareil sur le réseau', 'Pour donner le prix de l’appareil', 'Pour rendre l’appareil plus rapide'],
        'Pense à l’adresse sur un colis.',
        'Comme sur un colis, l’adresse permet de trouver le bon destinataire, sans confusion.'),
      {
        id: 'bits-de-l-adresse',
        univers: 'appareils',
        // nombre d'adresses
        versions: [1, 2, 5, 10, 25, 100],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Une adresse IP de ce type compte 4 octets. Combien de bits occupent ' + n + ' adresse' + (n > 1 ? 's' : '') + ' ?',
            reponse: { type: 'nombre', valeur: n * 32 },
            aide: '4 octets, c’est 32 bits. Calcule ' + n + ' × 32.',
            aideParlee: 'Quatre octets, c’est trente-deux bits. Multiplie par trente-deux.',
            correction: ['4 × 8 = 32 bits par adresse.', n + ' × 32 = ' + n * 32 + ' bits.'],
          };
        },
      },
      {
        id: 'adresses-libres',
        univers: 'famille',
        // appareils déjà connectés, sur 254 adresses
        versions: [5, 12, 30, 54, 100, 200],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Ce réseau propose 254 adresses pour des appareils. ' + n + ' sont déjà utilisées. Combien en reste-t-il ?',
            reponse: { type: 'nombre', valeur: 254 - n },
            aide: 'Calcule 254 − ' + n + '.',
            aideParlee: 'Enlève les adresses utilisées au nombre d’adresses disponibles.',
            correction: ['254 − ' + n + ' = ' + (254 - n) + ' adresses.'],
          };
        },
      },
    ],

    defi: {
      // [dernier nombre du téléphone, de l'ordinateur, de l'imprimante d'un autre réseau, nombre d'appareils]
      versions: [[12, 20, 30, 18], [5, 40, 60, 25], [7, 9, 200, 50], [100, 101, 50, 12]],
      genere(c) {
        const [t, o, i, n] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : dans le collège, le téléphone a l’adresse 192.168.1.' + t + ', l’ordinateur 192.168.1.' + o + ', et l’imprimante 192.168.2.' + i + '. Les trois premiers nombres désignent le réseau, et aucun appareil ne relie ces deux réseaux. Dans le réseau de l’ordinateur, ' + n + ' appareils sont déjà connectés, sur 254 adresses.',
          questions: [
            {
              texte: 'Question 1. Quel appareil n’est pas sur le même réseau que les deux autres ?',
              reponse: O.choix(c.alea, 'L’imprimante', ['Le téléphone', 'L’ordinateur', 'L’imprimante']),
              aide: 'Compare les trois premiers nombres.',
              correction: ['L’imprimante commence par 192.168.2, les autres par 192.168.1.', 'Réponse : L’imprimante.'],
            },
            {
              texte: 'Question 2. Combien d’adresses restent libres dans le réseau de l’ordinateur ?',
              reponse: { type: 'nombre', valeur: 254 - n },
              aide: 'Enlève les appareils connectés au nombre d’adresses.',
              correction: ['254 − ' + n + ' = ' + (254 - n) + ' adresses.'],
            },
            {
              texte: 'Question 3. Le téléphone n’arrive pas à imprimer. Explique pourquoi, et propose une solution.',
              correction: ['Le téléphone et l’imprimante ne sont pas sur le même réseau : leurs trois premiers nombres diffèrent.', 'Il faut relier l’imprimante au réseau du téléphone, ou y connecter le téléphone.'],
              grille: ['As-tu comparé les adresses ?', 'As-tu dit qu’ils ne sont pas sur le même réseau ?', 'As-tu proposé une solution ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Quatre nombres, une rue, une maison : tu sais comment les données trouvent le bon appareil.',
    carte: ['correcte-ou-pas', 'meme-reseau', 'a-quoi-ca-sert'],
    papierDuSoir: { exercices: ['bits-de-l-adresse', 'adresses-libres'], defi: true },
    automatismes: [
      {
        id: 'quatre-fois-huit',
        versions: [1, 2, 3, 5],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' × 32 = ?', reponse: { type: 'nombre', valeur: n * 32 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? AFRINIC, le registre des adresses IP de l’Afrique et de l’océan Indien, a son siège à Ebène, à Maurice.',
    prenoms: ['Esther'],
  };
});
