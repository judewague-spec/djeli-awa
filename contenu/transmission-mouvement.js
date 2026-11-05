/* Notion 3 du bloc de technologie « Comment un objet fonctionne » : transmettre un mouvement (engrenage, courroie, chaîne ; sens de rotation). Le batteur de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const SYSTEMES = ['Un engrenage', 'Une courroie', 'Une chaîne'];
  const SENS = ['Dans le sens des aiguilles d’une montre', 'Dans le sens inverse des aiguilles d’une montre'];
  const OUINON = ['Oui, dans le même sens', 'Non, en sens inverse'];

  return {
    id: 'transmission-mouvement',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Transmettre un mouvement',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'appareils', 'dehors'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : transmission de mouvement (engrenage, courroie, chaîne), sens de rotation.',

    accroche: {
      texte: 'Laure apporte son batteur à main. Elle tourne la manivelle. ' +
        'Les fouets tournent aussi, mais plus vite. Moussa ouvre le boîtier : des roues à dents se touchent.',
      image: { dessin: 'chaine', etapes: ['La main tourne la manivelle', 'Les roues à dents se touchent', 'Les fouets tournent'], description: 'Le batteur de Laure : la main tourne la manivelle, les roues à dents se touchent, les fouets tournent.' },
    },

    manipulation: {
      etapes: [
        'Dans le batteur de Laure, deux roues à dents se touchent. La première tourne dans un sens.',
        'Regarde l’autre roue : les dents de la première poussent les siennes, donc elle tourne à l’envers.',
        'Une courroie ou une chaîne relie deux roues éloignées. Les deux roues tournent alors dans le même sens.',
        'Pour savoir dans quel sens tourne une roue, cherche comment elle est reliée à la première.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le trajet du mouvement, de la manivelle aux fouets : c’est ' + c.mot('transmission') + '. ' +
        'Dans le batteur, deux roues à dents se touchent : c’est un engrenage. Elles tournent en sens inverse. ' +
        'Une courroie ou une chaîne relie deux roues éloignées : elles tournent dans le même sens. ' +
        'Regarde la roue de la manivelle, qui reçoit la force de la main : c’est ' + c.mot('menante') + '.',
    },

    vocabulaire: {
      termes: {
        transmission: { sesMots: 'le passage du mouvement d’une pièce à l’autre', officiel: 'la transmission de mouvement', lesDeux: 'le passage du mouvement d’une pièce à l’autre. Les techniciens disent : la transmission de mouvement' },
        menante: { sesMots: 'la roue qui commande l’autre', officiel: 'la roue menante', lesDeux: 'la roue qui commande l’autre. Les techniciens disent : la roue menante' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le passage du mouvement d’une pièce à l’autre, et la roue qui commande l’autre. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la transmission de mouvement, pour le passage du mouvement d’une pièce à l’autre. ' +
          'Ils disent : la roue menante, pour la roue qui commande l’autre.',
        'Tu connais les mots officiels : la transmission de mouvement, et la roue menante.',
      ],
    },

    exercices: [
      O.qcm('quel-systeme', 'cuisine-restaurant',
        [
          ['deux roues à dents qui se touchent', 'Un engrenage', 'Des dents qui se touchent et se poussent forment un engrenage.'],
          ['deux poulies reliées par une bande souple', 'Une courroie', 'Une bande souple autour de deux poulies, c’est une courroie.'],
          ['deux roues à dents reliées par des maillons métalliques', 'Une chaîne', 'Des maillons métalliques qui passent d’une roue à l’autre forment une chaîne.'],
          ['les roues à dents du boîtier d’un batteur à main', 'Un engrenage', 'Les roues à dents du batteur se touchent : c’est un engrenage.'],
          ['la bande souple d’un lave-linge, entre le moteur et le tambour', 'Une courroie', 'Une bande souple entre deux poulies, c’est une courroie.'],
          ['le système qui relie les pédales à la roue arrière d’un vélo', 'Une chaîne', 'Sur un vélo, les maillons de la chaîne relient le plateau et le pignon.'],
        ],
        (x) => 'Comment s’appelle ce système de transmission : ' + x + ' ?', SYSTEMES,
        'Des dents qui se touchent, une bande souple, ou des maillons ?'),
      {
        id: 'sens-de-rotation',
        univers: 'appareils',
        // [système, sens de la première roue (0 : aiguilles d’une montre, 1 : inverse), la seconde roue tourne-t-elle à l’inverse ?]
        versions: [
          ['Les deux roues ont des dents et se touchent.', 0, true],
          ['Les deux roues ont des dents et se touchent.', 1, true],
          ['Les deux roues sont des poulies reliées par une courroie ordinaire.', 0, false],
          ['Les deux roues sont des poulies reliées par une courroie ordinaire.', 1, false],
          ['Les deux roues ont des dents et sont reliées par une chaîne.', 1, false],
          ['Les deux roues ont des dents et sont reliées par une chaîne.', 0, false],
        ],
        genere(c) {
          const [sys, s0, inv] = c.alea.choisir(this.versions);
          const s1 = inv ? 1 - s0 : s0;
          return {
            enonce: 'La première roue tourne ' + SENS[s0].toLowerCase() + '. ' + sys + ' Dans quel sens tourne la seconde roue ?',
            reponse: O.choix(c.alea, SENS[s1], [SENS[1 - s1]]),
            aide: 'Des roues à dents qui se touchent tournent à l’inverse ; avec une chaîne ou une courroie, elles tournent dans le même sens.',
            correction: [inv ? 'Des roues à dents qui se touchent tournent en sens inverse.' : 'Reliées par une chaîne ou une courroie ordinaire, les roues tournent dans le même sens.', 'Réponse : ' + SENS[s1] + '.'],
          };
        },
      },
      {
        id: 'quelle-roue-mene',
        univers: 'dehors',
        // [situation, roue menante, roue menée]
        versions: [
          ['Sur un vélo, les pieds appuient sur les pédales.', 'Le plateau, près des pédales', 'Le pignon de la roue arrière'],
          ['Dans un batteur à main, la main tourne la manivelle.', 'La roue de la manivelle', 'La roue des fouets'],
          ['Dans un lave-linge, le moteur tourne et la courroie entraîne le tambour.', 'La poulie du moteur', 'La poulie du tambour'],
          ['Dans un portail, le moteur tourne et la chaîne entraîne l’axe.', 'Le pignon du moteur', 'Le pignon de l’axe'],
        ],
        genere(c) {
          const [sit, menante, menee] = c.alea.choisir(this.versions);
          return {
            enonce: sit + ' Laquelle est la roue menante, celle qui commande l’autre ?',
            reponse: O.choix(c.alea, menante, [menee]),
            aide: 'La roue menante est celle qui reçoit le mouvement en premier.',
            correction: ['La roue menante reçoit le mouvement en premier : elle commande l’autre.', 'Réponse : ' + menante + '.'],
          };
        },
      },
      {
        id: 'sens-de-la-derniere',
        univers: 'appareils',
        // nombre de roues à dents en ligne qui se touchent
        versions: [[3], [4], [5], [6], [7]],
        genere(c) {
          const [n] = c.alea.choisir(this.versions);
          const memes = [];
          for (let k = 1; k <= n; k += 2) memes.push(k);
          return {
            enonce: 'Dans la boîte de Moussa, ' + n + ' roues à dents sont en ligne et se touchent. La première tourne dans un sens. Combien de roues tournent dans le même sens qu’elle, la première comprise ?',
            reponse: { type: 'nombre', valeur: memes.length },
            aide: 'Chaque roue tourne à l’inverse de sa voisine.',
            correction: ['Les roues ' + memes.join(', ') + ' tournent dans le même sens que la première.', 'Cela fait ' + memes.length + ' roues.'],
          };
        },
      },
      {
        id: 'dents-passees',
        univers: 'cuisine-restaurant',
        // [dents de la roue menante, tours de la roue menante]
        versions: [[20, 3], [12, 5], [15, 4], [24, 2], [30, 3]],
        genere(c) {
          const [d, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'La roue menante d’un engrenage a ' + d + ' dents. Elle fait ' + t + ' tours. Combien de dents passent devant le point de contact avec l’autre roue ?',
            reponse: { type: 'nombre', valeur: d * t },
            aide: 'Multiplie le nombre de dents par le nombre de tours.',
            correction: [d + ' × ' + t + ' = ' + (d * t) + ' dents.'],
          };
        },
      },
    ],

    defi: {
      // [nombre de roues à dents en ligne, dents de la roue de la manivelle, tours de manivelle]
      versions: [[3, 20, 4], [4, 15, 3], [5, 24, 2], [6, 12, 5]],
      genere(c) {
        const [n, d, t] = c.alea.choisir(this.versions);
        const memes = Math.ceil(n / 2);
        return {
          enonce: 'Le boîtier du batteur de Laure contient ' + n + ' roues à dents en ligne, qui se touchent. La roue de la manivelle a ' + d + ' dents. Laure tourne la manivelle de ' + t + ' tours.',
          image: { dessin: 'engrenage', dentsA: d, dentsB: 20, lien: 'contact', description: 'Deux roues à dents en contact : la roue menante de la manivelle a ' + d + ' dents, la roue suivante a 20 dents. Elles tournent en sens inverse.' },
          questions: [
            {
              texte: 'Question 1. Combien de dents de la roue de la manivelle passent devant le point de contact ?',
              reponse: { type: 'nombre', valeur: d * t },
              aide: 'Calcule ' + d + ' × ' + t + '.',
              aideParlee: 'Multiplie le nombre de dents par le nombre de tours.',
              correction: [d + ' × ' + t + ' = ' + (d * t) + ' dents.'],
            },
            {
              texte: 'Question 2. Combien de roues tournent dans le même sens que la manivelle, elle comprise ?',
              reponse: { type: 'nombre', valeur: memes },
              aide: 'Chaque roue tourne à l’inverse de sa voisine.',
              correction: ['Une roue sur deux tourne dans le même sens, en partant de la première.', 'Cela fait ' + memes + ' roues.'],
            },
            {
              texte: 'Question 3. La dernière roue tourne-t-elle dans le même sens que la manivelle ?',
              reponse: O.choix(c.alea, n % 2 === 1 ? OUINON[0] : OUINON[1], [n % 2 === 1 ? OUINON[1] : OUINON[0]]),
              aide: 'Compte les roues : chaque roue inverse le sens de la précédente.',
              correction: [n % 2 === 1 ? 'Le nombre de roues est impair : la dernière tourne comme la première.' : 'Le nombre de roues est pair : la dernière tourne à l’inverse de la première.', 'Réponse : ' + (n % 2 === 1 ? OUINON[0] : OUINON[1]) + '.'],
            },
            {
              texte: 'Question 4. Moussa propose de remplacer les roues à dents par une courroie ordinaire, non croisée. Explique ce qui change pour le sens de rotation.',
              correction: ['Avec des roues à dents en contact, chaque roue tourne à l’inverse de sa voisine.', 'Avec une courroie ordinaire, les deux poulies tournent dans le même sens.'],
              grille: ['As-tu dit que deux roues à dents en contact tournent en sens inverse ?', 'As-tu dit qu’avec une courroie ordinaire les deux poulies tournent dans le même sens ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Engrenage, courroie, chaîne : tu sais comment le mouvement voyage, et dans quel sens tournent les roues.',
    carte: ['quel-systeme', 'sens-de-rotation', 'quelle-roue-mene'],
    papierDuSoir: { exercices: ['sens-de-la-derniere', 'dents-passees'], defi: true },
    automatismes: [
      {
        id: 'dents-fois-tours',
        versions: [[10, 3], [12, 4], [15, 2], [20, 3]],
        genere(c) { const [d, t] = c.alea.choisir(this.versions); return { enonce: d + ' × ' + t + ' = ?', reponse: { type: 'nombre', valeur: d * t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Grèce, le mécanisme d’Anticythère, vieux de plus de 2000 ans, contenait environ trente roues dentées en bronze.',
    prenoms: ['Laure', 'Moussa'],
  };
});
