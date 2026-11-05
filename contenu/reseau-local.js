/* Notion 15 du bloc de technologie « Le numérique et l'intelligence artificielle » : le réseau local. L'imprimante de l'atelier de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const CARTE = 'La carte réseau', COMMUT = 'Le commutateur', WIFI = 'Le Wi-Fi';

  return {
    id: 'reseau-local',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Le réseau local',
    classe: '4e',
    univers: ['appareils', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : réseau local, carte réseau, Wi-Fi, commutateur.',

    accroche: {
      texte: 'Dans l’atelier, Moussa a trois ordinateurs et une seule imprimante. Chaque fois qu’il veut imprimer, il porte son fichier sur une clé USB jusqu’à l’imprimante. ' +
        'Et si ces machines pouvaient se parler directement, sans quitter la pièce ?',
      image: { dessin: 'chaine', etapes: ['L’ordinateur envoie le fichier', 'La boîte centrale le dirige', 'L’imprimante le reçoit'], description: 'L’ordinateur envoie le fichier ; la boîte centrale le dirige ; l’imprimante le reçoit, dans la même pièce.' },
    },

    manipulation: {
      image: { dessin: 'facture', titre: 'Dans l’atelier', lignes: [['Dans chaque appareil', 'la pièce qui parle'], ['Au centre', 'la boîte qui dirige'], ['Avec un câble', 'très stable'], ['Sans câble', 'très pratique']], description: 'Dans l’atelier : dans chaque appareil, une pièce qui parle ; au centre, une boîte qui dirige ; avec un câble, c’est très stable ; sans câble, très pratique.' },
      etapes: [
        'Des appareils reliés dans un même lieu, comme une maison ou un collège, forment une petite famille.',
        'Pour cela, chaque appareil possède une pièce qui lui permet d’envoyer et de recevoir.',
        'Au centre, une boîte reçoit les données et les envoie seulement à l’appareil concerné.',
        'On peut les relier par des câbles, ou par des ondes, sans câble.',
      ],
    },

    decouverte: {
      texte: (c) => 'Des appareils reliés au même endroit forment ' + c.mot('reseau') + '. Chacun communique grâce à ' + c.mot('carte') + '. Au centre, on trouve souvent ' + c.mot('commutateur') + '. ' +
        'Sans câble, on utilise le Wi-Fi. ' +
        'L’astuce : pense à une famille qui parle à table. La boîte centrale passe chaque message à la bonne personne.',
    },

    vocabulaire: {
      termes: {
        reseau: { sesMots: 'une petite famille', officiel: 'un réseau local', lesDeux: 'une petite famille, que l’on appelle un réseau local' },
        carte: { sesMots: 'sa pièce qui parle', officiel: 'sa carte réseau', lesDeux: 'sa pièce qui parle, que l’on appelle sa carte réseau' },
        commutateur: { sesMots: 'la boîte qui dirige', officiel: 'le commutateur', lesDeux: 'la boîte qui dirige, que l’on appelle le commutateur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la petite famille, la pièce qui parle, et la boîte qui dirige. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un réseau local, pour la petite famille. Une carte réseau, pour la pièce qui parle. Un commutateur, pour la boîte qui dirige.',
        'Tu connais les mots officiels : le réseau local, la carte réseau, le commutateur et le Wi-Fi.',
      ],
    },

    exercices: [
      Q('quel-element', 'appareils',
        [['Elle est dans chaque appareil, et lui permet de communiquer.', CARTE], ['Il reçoit les données, et les envoie seulement à l’appareil concerné.', COMMUT], ['Il relie les appareils par des ondes, sans câble.', WIFI]],
        (x) => x + ' De quoi parle-t-on ?', [CARTE, COMMUT, WIFI],
        'Dans l’appareil, au centre, ou dans l’air ?',
        'La carte réseau est dans l’appareil. Le commutateur est au centre. Le Wi-Fi passe par les ondes.'),
      Q('local-ou-pas', 'maison-courses',
        [['Les ordinateurs d’une salle du collège', 'Oui, c’est un réseau local'], ['Le téléphone et l’imprimante d’une même maison', 'Oui, c’est un réseau local'], ['Tous les ordinateurs du monde', 'Non, c’est bien plus large'], ['Deux téléphones dans deux pays différents, par Internet', 'Non, c’est bien plus large']],
        (x) => x + ' : est-ce un réseau local ?', ['Oui, c’est un réseau local', 'Non, c’est bien plus large'],
        'Sont-ils dans un même lieu ?',
        'Un réseau local relie des appareils d’un même lieu. Internet relie des réseaux entre eux, dans le monde entier.'),
      Q('cable-ou-ondes', 'appareils',
        [['Moussa veut un lien très stable, pour un ordinateur fixe.', 'Un câble'], ['Rachel veut se déplacer dans la maison, avec son téléphone.', 'Le Wi-Fi']],
        (x) => x + ' Que choisir ?', ['Un câble', 'Le Wi-Fi'],
        'Stabilité, ou liberté de mouvement ?',
        'Le câble est stable pour un appareil fixe. Le Wi-Fi laisse bouger, mais il dépend de la distance et des obstacles.'),
      {
        id: 'prises-libres',
        univers: 'appareils',
        // [prises du commutateur, appareils branchés]
        versions: [[8, 5], [16, 11], [24, 17], [8, 3], [16, 9], [24, 20]],
        genere(c) {
          const [p, a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un commutateur a ' + p + ' prises. ' + a + ' appareils y sont branchés, chacun sur une prise. Combien de prises restent libres ?',
            reponse: { type: 'nombre', valeur: p - a },
            aide: 'Calcule ' + p + ' − ' + a + '.',
            aideParlee: 'Enlève les appareils branchés au nombre de prises.',
            correction: [p + ' − ' + a + ' = ' + (p - a) + ' prises.'],
          };
        },
      },
      {
        id: 'cables-de-la-salle',
        univers: 'maison-courses',
        // [appareils, mètres de câble par appareil]
        versions: [[12, 5], [8, 10], [15, 4], [20, 6], [10, 7], [16, 5]],
        genere(c) {
          const [a, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans une salle, ' + a + ' appareils sont reliés au commutateur par un câble de ' + m + ' m chacun. Quelle longueur de câble faut-il, en mètres ?',
            reponse: { type: 'nombre', valeur: a * m },
            aide: 'Calcule ' + a + ' × ' + m + '.',
            aideParlee: 'Multiplie le nombre d’appareils par la longueur d’un câble.',
            correction: [a + ' × ' + m + ' = ' + a * m + ' m.'],
          };
        },
      },
    ],

    defi: {
      // [ordinateurs, imprimantes, prises du commutateur]
      versions: [[6, 1, 8], [10, 2, 16], [12, 1, 16], [20, 2, 24]],
      genere(c) {
        const [o, i, p] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : le collège veut relier une salle : ' + o + ' ordinateurs et ' + i + ' imprimante' + (i > 1 ? 's' : '') + ', dans un réseau local, par câble. Il dispose d’un commutateur de ' + p + ' prises.',
          questions: [
            {
              texte: 'Question 1. Combien d’appareils faut-il brancher en tout ?',
              reponse: { type: 'nombre', valeur: o + i },
              aide: 'Additionne les ordinateurs et les imprimantes.',
              correction: [o + ' + ' + i + ' = ' + (o + i) + ' appareils.'],
            },
            {
              texte: 'Question 2. Combien de prises restent libres sur le commutateur ?',
              reponse: { type: 'nombre', valeur: p - o - i },
              aide: 'Enlève le nombre d’appareils au nombre de prises.',
              correction: [p + ' − ' + (o + i) + ' = ' + O.nb(p - o - i, 'prise') + '.'],
            },
            {
              texte: 'Question 3. Explique le rôle du commutateur et celui des cartes réseau. Dessine ce réseau sur ton cahier.',
              correction: ['Chaque appareil possède une carte réseau, pour envoyer et recevoir.', 'Le commutateur, au centre, reçoit les données et les envoie seulement à l’appareil concerné. Sur le schéma, chaque appareil est relié au commutateur.'],
              grille: ['As-tu donné le rôle de la carte réseau ?', 'As-tu donné le rôle du commutateur ?', 'As-tu relié chaque appareil au commutateur sur ton schéma ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Carte, commutateur, Wi-Fi : les machines de ton atelier se parlent, et tu sais comment.',
    carte: ['quel-element', 'local-ou-pas', 'cable-ou-ondes'],
    papierDuSoir: { exercices: ['prises-libres', 'cables-de-la-salle'], defi: true },
    automatismes: [
      {
        id: 'prises-rapide',
        versions: [[8, 5], [16, 9], [24, 12], [8, 2]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' prises, ' + b + ' occupées : libres = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Australie, le CSIRO a inventé et breveté dans les années 1990 une technologie à la base du Wi-Fi.',
    prenoms: ['Moussa', 'Rachel'],
  };
});
