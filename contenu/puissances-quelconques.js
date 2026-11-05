/* Notion 16 du bloc « Les nombres » : puissances d'un nombre quelconque. La rumeur qui double. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { puissance: p, ecr } = O;
  const facteurs = (a, n) => Array.from({ length: n }, () => (a < 0 ? '(' + a + ')' : a)).join(' × ');

  return {
    id: 'puissances-quelconques',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Puissances d’un nombre quelconque',
    classe: '4e',
    univers: ['famille', 'danses', 'appareils'],

    accroche: {
      texte: 'Rebecca envoie un message drôle à deux amies. Chacune le transfère à deux autres amies, qui le transfèrent chacune à deux autres… ' +
        'À chaque tour, le nombre de personnes qui reçoivent le message double. Combien le reçoivent au cinquième tour ?',
      image: { dessin: 'doublement', generations: 3, branches: 2, description: 'Un arbre de messages : 1 personne, puis 2, puis 4, puis 8. À chaque tour, le nombre double.' },
    },

    manipulation: {
      image: { dessin: 'doublement', generations: 4, branches: 2, description: 'L’arbre des messages sur quatre tours : 2, 4, 8, puis 16 personnes.' },
      etapes: [
        'Premier tour : 2 personnes. Deuxième tour : 2 × 2 = 4 personnes.',
        'Troisième tour : 2 × 2 × 2 = 8. Quatrième tour : 16.',
        'Au cinquième tour : 2 × 2 × 2 × 2 × 2 = 32 personnes. On écrit 2⁵.',
        'Ça marche avec n’importe quel nombre : 3⁴ = 3 × 3 × 3 × 3 = 81.',
      ],
    },

    decouverte: {
      texte: (c) => '2⁵ = 2 × 2 × 2 × 2 × 2 = 32. Le nombre 2 est ' + c.mot('base') + ', et 5 est l’exposant : il dit combien de fois on multiplie. ' +
        'Attention aux signes : (−2)² = 4, mais (−2)³ = −8. Un exposant pair donne un résultat positif. ' +
        'Et 5², c’est « cinq au carré » ; 5³, « cinq au cube ».',
    },

    vocabulaire: {
      termes: {
        base: { sesMots: 'le nombre qu’on multiplie', officiel: 'la base', lesDeux: 'le nombre qu’on multiplie, la base' },
      },
      textes: [
        'Pour l’instant, garde tes mots : dans 2⁵, 2 est le nombre qu’on multiplie, et 5 est l’exposant. ' +
          'Les matheux ont un mot pour le nombre qu’on multiplie : je te le dirai la prochaine fois.',
        'Les matheux disent : dans 2⁵, 2 est la base. Le nombre qu’on multiplie, c’est la base, et l’exposant compte combien de fois.',
        'Tu connais les mots officiels : dans 2⁵, la base est 2 et l’exposant est 5. 2⁵ se lit « deux puissance cinq ».',
      ],
    },

    exercices: [
      {
        id: 'calculer',
        univers: 'appareils',
        versions: [[2, 4], [3, 3], [5, 2], [2, 6], [4, 3], [3, 4], [6, 2], [2, 7], [10, 3], [7, 2]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule : ' + p(a, n) + '.',
            reponse: { type: 'nombre', valeur: a ** n },
            aide: p(a, n) + ' = ' + facteurs(a, n) + '.',
            aideParlee: 'Écris la base autant de fois que l’exposant, avec des signes fois, puis calcule deux par deux.',
            correction: [p(a, n) + ' = ' + facteurs(a, n) + ' = ' + a ** n + '.'],
          };
        },
      },
      {
        id: 'message',
        univers: 'famille',
        // [chaque personne transfère à b amies, tour]
        versions: [[2, 4], [2, 5], [2, 6], [3, 3], [3, 4], [2, 7], [4, 3], [5, 3]],
        genere(c) {
          const [b, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un message part de Rebecca. Chaque personne qui le reçoit le transfère à ' + b + ' amies. Au tour ' + t + ', combien de personnes le reçoivent ?',
            reponse: { type: 'nombre', valeur: b ** t },
            aide: 'Au tour ' + t + ', c’est ' + p(b, t) + '.',
            aideParlee: 'À chaque tour, on multiplie par le nombre d’amies. C’est une puissance, avec le numéro du tour en exposant.',
            correction: ['Tour 1 : ' + b + '. À chaque tour, on multiplie par ' + b + '.', 'Tour ' + t + ' : ' + p(b, t) + ' = ' + facteurs(b, t) + ' = ' + b ** t + '.'],
          };
        },
      },
      {
        id: 'base-negative',
        univers: 'danses',
        versions: [[-2, 2], [-2, 3], [-3, 2], [-3, 3], [-1, 5], [-2, 4], [-5, 2], [-1, 8], [-4, 3], [-10, 3]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule : ' + p(a, n) + '. (Écris le signe moins s’il le faut.)',
            reponse: { type: 'nombre', valeur: a ** n },
            aide: 'Calcule sans le signe, puis : exposant ' + (n % 2 ? 'impair' : 'pair') + ', donc résultat ' + (n % 2 ? 'négatif' : 'positif') + '.',
            aideParlee: 'Calcule sans le signe. Puis : exposant pair, résultat positif ; exposant impair, résultat négatif.',
            correction: [p(a, n) + ' = ' + facteurs(a, n) + '.', n % 2 ? 'L’exposant est impair : le résultat est négatif.' : 'L’exposant est pair : le résultat est positif.', 'Réponse : ' + ecr(a ** n) + '.'],
          };
        },
      },
      {
        id: 'exposant-cache',
        univers: 'appareils',
        versions: [[2, 8], [2, 16], [3, 27], [3, 81], [2, 64], [5, 125], [4, 64], [2, 128]],
        genere(c) {
          const [a, v] = c.alea.choisir(this.versions);
          const n = Math.round(Math.log(v) / Math.log(a));
          return {
            enonce: 'Trouve l’exposant : ' + a + ' puissance combien fait ' + v + ' ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Multiplie ' + a + ' par lui-même et compte jusqu’à ' + v + '.',
            aideParlee: 'Multiplie la base par elle-même, encore et encore, et compte combien de fois il faut pour arriver au nombre.',
            correction: [facteurs(a, n) + ' = ' + v + ' : ' + n + ' fois. Réponse : ' + n + '.'],
          };
        },
      },
      {
        id: 'carre-ou-cube',
        univers: 'famille',
        versions: [[4, 2], [9, 2], [3, 3], [5, 3], [11, 2], [2, 3], [12, 2], [6, 3]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule ' + a + (n === 2 ? ' au carré.' : ' au cube.'),
            reponse: { type: 'nombre', valeur: a ** n },
            aide: n === 2 ? 'Au carré, c’est ' + a + ' × ' + a + '.' : 'Au cube, c’est ' + a + ' × ' + a + ' × ' + a + '.',
            aideParlee: 'Au carré, c’est le nombre fois lui-même. Au cube, c’est le nombre fois lui-même, encore fois lui-même.',
            correction: [p(a, n) + ' = ' + facteurs(a, n) + ' = ' + a ** n + '.'],
          };
        },
      },
    ],

    defi: {
      // [base, exposant affirmé par Fatou]
      versions: [[7, 4], [3, 5], [5, 4], [4, 4], [2, 9], [6, 3]],
      genere(c) {
        const [a, n] = c.alea.choisir(this.versions);
        return {
          enonce: 'Dans un vieux problème d’Égypte, il y a ' + a + ' maisons. Dans chaque maison, ' + a + ' chats. Chaque chat attrape ' + a + ' souris.',
          questions: [
            {
              texte: 'Question 1. Combien y a-t-il de chats en tout ? Écris le calcul avec une puissance.',
              reponse: { type: 'nombre', valeur: a ** 2 },
              aide: 'Les maisons fois les chats par maison.',
              correction: [a + ' × ' + a + ' = ' + p(a, 2) + ' = ' + a ** 2 + ' chats.'],
            },
            {
              texte: 'Question 2. Combien de souris sont attrapées en tout ?',
              reponse: { type: 'nombre', valeur: a ** 3 },
              aide: 'Les chats fois les souris par chat.',
              correction: [p(a, 2) + ' × ' + a + ' = ' + p(a, 3) + ' = ' + a ** 3 + ' souris.'],
            },
            {
              texte: 'Question 3. Fatou dit : « ' + p(a, n) + ' = ' + a + ' × ' + n + ' = ' + a * n + '. » Explique son erreur et donne la bonne valeur.',
              correction: ['L’exposant ne multiplie pas la base par ' + n + '.', p(a, n) + ' = ' + facteurs(a, n) + ' = ' + a ** n + '.'],
              grille: ['As-tu écrit ' + p(a, n) + ' comme un produit de ' + n + ' facteurs ' + a + ' ?', 'As-tu trouvé ' + a ** n + ' ?', 'As-tu expliqué que l’exposant compte les facteurs ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une puissance, c’est une multiplication répétée : tu calcules la rumeur qui double, même avec des nombres négatifs.',
    carte: ['calculer', 'message', 'base-negative'],
    papierDuSoir: { exercices: ['message', 'base-negative'], defi: true },
    automatismes: [
      {
        id: 'carres',
        versions: [2, 3, 4, 5, 6, 7, 8, 9],
        genere(c) { const a = c.alea.choisir(this.versions); return { enonce: p(a, 2) + ' = ?', reponse: { type: 'nombre', valeur: a * a } }; },
      },
      {
        id: 'cubes',
        versions: [2, 3, 4, 5],
        genere(c) { const a = c.alea.choisir(this.versions); return { enonce: p(a, 3) + ' = ?', reponse: { type: 'nombre', valeur: a ** 3 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le papyrus Rhind, en Égypte, contient un problème avec 7 maisons, 7 chats par maison, 7 souris par chat : des puissances de 7.',
    prenoms: ['Rebecca', 'Fatou'],
  };
});
