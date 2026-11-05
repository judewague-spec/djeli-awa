/* Notion 5 du bloc « Les nombres » : nombres premiers jusqu'à 100. Les danseuses de Rebecca et le crible. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const OUI = 'Oui', NON = 'Non';
  const premiersEntre = (a, b) => { const p = []; for (let n = a; n <= b; n++) if (O.estPremier(n)) p.push(n); return p; };
  const plusPetitDiviseur = (n) => O.diviseurs(n)[1];

  return {
    id: 'nombres-premiers',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Nombres premiers jusqu’à 100',
    classe: '4e',
    univers: ['danses', 'cuisine-restaurant', 'commerce'],

    accroche: {
      texte: 'Pour la fête, Rebecca fait danser son groupe en rectangle : plusieurs rangées, autant de danseuses dans chaque rangée. ' +
        'Avec 6 danseuses, c’est facile : 2 rangées de 3. Mais avec 7 danseuses, impossible ! Elles ne tiennent que sur une seule ligne. ' +
        'Quels nombres font ça ?',
      image: { dessin: 'paquets', objets: 7, parPaquet: 7, description: 'Sept danseuses, toutes sur une seule ligne : on ne peut pas faire de rectangle.' },
    },

    manipulation: {
      type: 'crible',
      jusqua: 100,
      consigne: 'Voici les nombres de 1 à 100. Le 1 est déjà barré. Touche le plus petit nombre libre : je le garde, et je barre tous ses multiples. ' +
        'Puis recommence avec le plus petit nombre libre suivant, jusqu’à ce qu’il n’y ait plus rien à barrer.',
    },

    decouverte: {
      texte: (c) => '7 n’a que deux diviseurs : 1 et lui-même. C’est ' + c.mot('premier') + '. ' +
        'Attention, 1 n’est pas premier : il n’a qu’un seul diviseur. Et 2 est le seul nombre pair qui soit premier. ' +
        'L’astuce du crible : garde 2, 3, 5 et 7, barre leurs multiples, et tout ce qui reste jusqu’à 100 est premier.',
      image: { dessin: 'crible', jusqua: 100, par: [2, 3, 5, 7], fin: true, description: 'La grille de 1 à 100 après le crible : les multiples de 2, 3, 5 et 7 sont barrés, les nombres premiers sont entourés.' },
    },

    vocabulaire: {
      termes: {
        premier: { sesMots: 'un nombre qui ne fait qu’une seule ligne', officiel: 'un nombre premier', lesDeux: 'un nombre qui ne fait qu’une seule ligne, un nombre premier' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 7 est un nombre qui ne fait qu’une seule ligne. On ne peut le ranger en rectangle d’aucune façon. ' +
          'Les matheux ont un mot pour ça : je te le dirai la prochaine fois.',
        'Les matheux disent : 7 est un nombre premier. Un nombre premier a exactement deux diviseurs : 1 et lui-même. ' +
          'C’est notre nombre qui ne fait qu’une seule ligne.',
        'Tu connais le mot officiel : un nombre premier a exactement deux diviseurs, 1 et lui-même. 2, 3, 5 et 7 sont les premiers d’entre eux.',
      ],
    },

    exercices: [
      {
        id: 'premier-ou-pas',
        univers: 'danses',
        versions: [13, 15, 21, 23, 29, 33, 37, 39, 41, 49, 51, 53, 57, 59, 87, 91, 97],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const bonne = O.estPremier(n) ? OUI : NON;
          return {
            enonce: 'Le groupe de danse compte ' + n + ' danseuses. Le nombre ' + n + ' est-il premier ?',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Essaie de diviser ' + n + ' par 2, 3, 5 et 7.',
            aideParlee: 'Essaie de diviser par 2, par 3, par 5 et par 7. Si rien ne tombe juste, il est premier.',
            correction: O.estPremier(n)
              ? [n + ' ne se divise ni par 2, ni par 3, ni par 5, ni par 7.', 'Ses seuls diviseurs sont 1 et ' + n + '. Réponse : ' + bonne + '.']
              : [n + ' = ' + plusPetitDiviseur(n) + ' × ' + n / plusPetitDiviseur(n) + '.', 'Il a d’autres diviseurs que 1 et lui-même. Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'premier-suivant',
        univers: 'commerce',
        versions: [14, 20, 24, 32, 38, 44, 48, 54, 62, 74, 80, 90],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          let p = n + 1;
          while (!O.estPremier(p)) p++;
          return {
            enonce: 'Quel est le premier nombre premier plus grand que ' + n + ' ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Essaie ' + (n + 1) + ', puis ' + (n + 2) + '… Saute les nombres pairs.',
            aideParlee: 'Essaie les nombres suivants un par un, en sautant les nombres pairs.',
            correction: Array.from({ length: p - n }, (_, i) => n + 1 + i).map((k) => k + (O.estPremier(k) ? ' est premier.' : ' = ' + plusPetitDiviseur(k) + ' × ' + k / plusPetitDiviseur(k) + '.')).concat(['Réponse : ' + p + '.']),
          };
        },
      },
      {
        id: 'combien-entre',
        univers: 'cuisine-restaurant',
        versions: [[10, 20], [20, 30], [30, 40], [40, 50], [50, 60], [60, 70], [70, 80], [80, 90], [1, 10], [90, 100]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const p = premiersEntre(a, b);
          return {
            enonce: 'Combien y a-t-il de nombres premiers entre ' + a + ' et ' + b + ' ?',
            reponse: { type: 'nombre', valeur: p.length },
            aide: 'Barre les pairs et les multiples de 3, 5 et 7 entre ' + a + ' et ' + b + ', puis compte ce qui reste.',
            aideParlee: 'Barre les nombres pairs et les multiples de 3, 5 et 7, puis compte ce qui reste.',
            correction: ['Les nombres premiers entre ' + a + ' et ' + b + ' : ' + p.join(', ') + '.', 'Il y en a ' + p.length + '.'],
          };
        },
      },
      {
        id: 'plus-petit-diviseur',
        univers: 'commerce',
        versions: [21, 35, 49, 51, 57, 77, 85, 91, 95, 87, 65, 39],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const d = plusPetitDiviseur(n);
          return {
            enonce: 'Le nombre ' + n + ' n’est pas premier. Quel est son plus petit diviseur, autre que 1 ?',
            reponse: { type: 'nombre', valeur: d },
            aide: n + ' est impair : essaie 3, puis 5, puis 7.',
            aideParlee: 'Le nombre est impair : essaie 3, puis 5, puis 7.',
            correction: [n + ' = ' + d + ' × ' + n / d + '.', 'Son plus petit diviseur, autre que 1, est ' + d + '.'],
          };
        },
      },
      {
        id: 'rectangle',
        univers: 'danses',
        versions: [9, 11, 12, 17, 19, 25, 31, 35, 43, 45, 47, 55],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const ok = !O.estPremier(n);
          const bonne = ok ? 'Oui, en rectangle' : 'Non, une seule ligne';
          const d = plusPetitDiviseur(n);
          return {
            enonce: 'Rebecca a ' + n + ' danseuses. Peut-elle les ranger en rectangle, avec au moins 2 rangées de 2 danseuses ?',
            reponse: O.choix(c.alea, bonne, ['Oui, en rectangle', 'Non, une seule ligne']),
            aide: 'Si ' + n + ' est premier, elles ne font qu’une seule ligne.',
            aideParlee: 'Si le nombre de danseuses est premier, elles ne font qu’une seule ligne.',
            correction: [ok ? n + ' = ' + d + ' × ' + n / d + ' : ' + d + ' rangées de ' + n / d + '.' : n + ' est premier : ses seuls diviseurs sont 1 et ' + n + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [début, fin, nombre impair non premier]
      versions: [[20, 40, 27], [30, 50, 35], [40, 60, 45], [50, 70, 63], [60, 80, 77], [70, 90, 81], [80, 100, 91], [10, 30, 21]],
      genere(c) {
        const [a, b, k] = c.alea.choisir(this.versions);
        const p = premiersEntre(a, b);
        const d = plusPetitDiviseur(k);
        return {
          enonce: 'Pour sa chorale, Rebecca cherche des nombres premiers. Elle a écrit la liste des nombres de ' + a + ' à ' + b + '. ' +
            'Fatou, sa voisine, affirme : « Tous les nombres impairs sont premiers. »',
          image: { dessin: 'crible', jusqua: 100, par: [2, 3, 5, 7], fin: true, description: 'La grille de 1 à 100 après le crible : les nombres premiers sont entourés.' },
          questions: [
            {
              texte: 'Question 1. Combien y a-t-il de nombres premiers entre ' + a + ' et ' + b + ' ?',
              reponse: { type: 'nombre', valeur: p.length },
              aide: 'Barre les multiples de 2, 3, 5 et 7, puis compte ce qui reste.',
              correction: ['Les nombres premiers entre ' + a + ' et ' + b + ' : ' + p.join(', ') + '.', 'Il y en a ' + p.length + '.'],
            },
            {
              texte: 'Question 2. Quel est le plus petit diviseur de ' + k + ', autre que 1 ?',
              reponse: { type: 'nombre', valeur: d },
              aide: 'Le nombre est impair : essaie 3, puis 5, puis 7.',
              correction: [k + ' = ' + d + ' × ' + k / d + '. Réponse : ' + d + '.'],
            },
            {
              texte: 'Question 3. Fatou a-t-elle raison ? Justifie ta réponse avec un exemple.',
              correction: [k + ' est impair.', 'Mais ' + k + ' = ' + d + ' × ' + k / d + ' : il a d’autres diviseurs que 1 et lui-même, il n’est pas premier.', 'Fatou a tort : un seul exemple suffit pour le montrer.'],
              grille: ['As-tu choisi un nombre impair qui n’est pas premier ?', 'As-tu écrit ce nombre comme un produit, par exemple ' + k + ' = ' + d + ' × ' + k / d + ' ?', 'As-tu conclu par une phrase : « Fatou a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais reconnaître un nombre premier, et tu connais le crible pour tous les trouver jusqu’à 100.',
    carte: ['premier-ou-pas', 'plus-petit-diviseur', 'rectangle'],
    papierDuSoir: { exercices: ['combien-entre', 'premier-suivant'], defi: true },
    automatismes: [
      {
        id: 'premier-rapide',
        versions: [2, 9, 11, 15, 17, 21, 23, 27, 31, 1],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' est-il un nombre premier ?', reponse: O.choix(c.alea, O.estPremier(n) ? OUI : NON, [OUI, NON]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Ératosthène, né à Cyrène, dans la Libye d’aujourd’hui, puis savant à Alexandrie, est connu pour son crible qui trouve les nombres premiers.',
    prenoms: ['Rebecca', 'Fatou'],
  };
});
