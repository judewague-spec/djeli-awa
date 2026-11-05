/* Notion 6 du bloc « Les nombres » : décomposition en facteurs premiers. La commande d'Ibrahim. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  /** Les étapes de l'arbre : « 60 = 2 × 30 », « 30 = 2 × 15 »… */
  function etapes(n) {
    const e = [];
    while (!O.estPremier(n) && n > 1) { const p = O.facteurs(n)[0]; e.push(n + ' = ' + p + ' × ' + n / p); n /= p; }
    return e;
  }
  const produit = (n) => O.facteurs(n).join(' × ');

  return {
    id: 'decomposition-facteurs-premiers',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Décomposition en facteurs premiers',
    classe: '3e',
    univers: ['commerce', 'cuisine-restaurant'],

    accroche: {
      texte: 'Ibrahim tient un restaurant. Il commande 60 bouteilles de jus de gingembre. Le fournisseur ne livre que par petits cartons, ' +
        'et le nombre de bouteilles d’un carton est toujours un nombre premier : 2, 3, 5 ou 7. ' +
        'Comment découper 60 en une multiplication de nombres premiers ?',
      image: { dessin: 'paquets', objets: 60, parPaquet: 5, description: '60 bouteilles de jus rangées en 12 cartons de 5.' },
    },

    manipulation: {
      image: { dessin: 'arbre', nombre: 60, description: 'L’arbre de 60 : 60 donne 2 et 30 ; 30 donne 2 et 15 ; 15 donne 3 et 5. Les nombres premiers sont entourés.' },
      etapes: [
        '60 est pair : 60 = 2 × 30. Le 2 est premier, on l’entoure.',
        '30 est pair : 30 = 2 × 15. On entoure encore un 2.',
        '15 n’est pas pair, mais il se divise par 3 : 15 = 3 × 5.',
        '3 et 5 sont premiers : on s’arrête. Sur ton cahier, recopie l’arbre.',
        'On ramasse les nombres entourés : 60 = 2 × 2 × 3 × 5.',
      ],
    },

    decouverte: {
      texte: (c) => '60 = 2 × 2 × 3 × 5 : c’est ' + c.mot('decomposition') + ' de 60. On l’écrit aussi 2² × 3 × 5. ' +
        'L’astuce : divise toujours par le plus petit nombre premier possible, 2, puis 3, puis 5, puis 7. ' +
        'Et quel que soit ton chemin, tu trouves toujours les mêmes nombres premiers à la fin.',
      image: { dessin: 'arbre', nombre: 60, description: 'L’arbre de 60, jusqu’aux nombres premiers 2, 2, 3 et 5.' },
    },

    vocabulaire: {
      termes: {
        decomposition: { sesMots: 'l’écriture en petits cartons premiers', officiel: 'la décomposition en facteurs premiers', lesDeux: 'l’écriture en petits cartons premiers, la décomposition en facteurs premiers,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 2 × 2 × 3 × 5, c’est l’écriture de 60 en petits cartons premiers. ' +
          'Les matheux ont un mot pour ça : je te le dirai la prochaine fois.',
        'Les matheux disent : la décomposition en facteurs premiers. Un facteur, c’est un nombre qu’on multiplie. ' +
          'Donc 2 × 2 × 3 × 5 est la décomposition en facteurs premiers de 60 : nos petits cartons premiers.',
        'Tu connais le mot officiel : la décomposition en facteurs premiers de 60 est 2² × 3 × 5.',
      ],
    },

    exercices: [
      {
        id: 'premier-facteur',
        univers: 'commerce',
        versions: [45, 63, 77, 91, 49, 75, 35, 121, 143, 99],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const p = O.facteurs(n)[0];
          return {
            enonce: 'Ibrahim reçoit ' + n + ' bouteilles. Par quel plus petit nombre premier peut-il diviser ' + n + ' ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Essaie 2, puis 3, puis 5, puis 7, puis 11.',
            aideParlee: 'Essaie 2, puis 3, puis 5, puis 7, puis 11.',
            correction: [n + ' = ' + p + ' × ' + n / p + '.', 'Le plus petit nombre premier qui divise ' + n + ' est ' + p + '.'],
          };
        },
      },
      {
        id: 'recomposer',
        univers: 'cuisine-restaurant',
        versions: [[2, 2, 3], [2, 3, 5], [2, 2, 7], [3, 3, 5], [2, 2, 2, 3], [2, 5, 7], [3, 5, 5], [2, 2, 3, 3]],
        genere(c) {
          const f = c.alea.choisir(this.versions);
          const n = f.reduce((a, x) => a * x, 1);
          return {
            enonce: 'La décomposition en facteurs premiers d’un nombre est ' + f.join(' × ') + '. Quel est ce nombre ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Multiplie les nombres deux par deux.',
            aideParlee: 'Multiplie les nombres deux par deux, de gauche à droite.',
            correction: [f.join(' × ') + ' = ' + n + '.'],
          };
        },
      },
      {
        id: 'combien-de-facteurs',
        univers: 'commerce',
        versions: [12, 18, 20, 24, 28, 30, 36, 40, 42, 48, 50, 72],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const f = O.facteurs(n);
          return {
            enonce: 'Décompose ' + n + ' en facteurs premiers sur ton cahier. Combien de nombres premiers multiplies-tu en tout (en comptant chaque répétition) ?',
            reponse: { type: 'nombre', valeur: f.length },
            aide: 'Fais l’arbre : ' + etapes(n)[0] + ', puis continue.',
            aideParlee: 'Fais l’arbre : divise par 2 tant que tu peux, puis par 3, puis par 5.',
            correction: etapes(n).concat([n + ' = ' + produit(n) + ' : ' + f.length + ' facteurs premiers.']),
          };
        },
      },
      {
        id: 'combien-de-2',
        univers: 'cuisine-restaurant',
        versions: [8, 12, 24, 40, 48, 56, 80, 96, 20, 44],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const k = O.facteurs(n).filter((p) => p === 2).length;
          return {
            enonce: 'Dans la décomposition en facteurs premiers de ' + n + ', combien de fois le nombre 2 apparaît-il ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Divise ' + n + ' par 2, puis encore par 2, tant que c’est pair.',
            aideParlee: 'Divise par 2, puis encore par 2, tant que le résultat est pair.',
            correction: etapes(n).concat([n + ' = ' + O.decompositionEcrite(n) + ' : le 2 apparaît ' + k + ' fois.']),
          };
        },
      },
      {
        id: 'bonne-ecriture',
        univers: 'commerce',
        versions: [36, 45, 54, 84, 90, 100, 126, 150],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const bonne = O.decompositionEcrite(n);
          // Pièges : un facteur qui n'est pas premier, ou un produit faux.
          const f = O.facteurs(n);
          const piege1 = (f[0] * f[1]) + ' × ' + f.slice(2).join(' × ');
          const piege2 = O.decompositionEcrite(n * 2);
          return {
            enonce: 'Quelle est la décomposition en facteurs premiers de ' + n + ' ?',
            reponse: O.choix(c.alea, bonne, [piege1, piege2]),
            aide: 'Tous les facteurs doivent être premiers, et leur produit doit faire ' + n + '.',
            aideParlee: 'Tous les facteurs doivent être des nombres premiers, et leur produit doit redonner le nombre.',
            correction: etapes(n).concat([n + ' = ' + produit(n) + '. Réponse : ' + bonne + '.']),
          };
        },
      },
    ],

    defi: {
      versions: [84, 90, 126, 150, 180, 196, 120, 132],
      genere(c) {
        const n = c.alea.choisir(this.versions);
        const f = O.facteurs(n);
        const grand = f[f.length - 1];
        const par7 = n % 7 === 0;
        return {
          enonce: 'Laure, la maman de Rachel, prépare ' + n + ' parts de gâteau pour une fête. Elle veut savoir comment les ranger en plateaux égaux. ' +
            'Pour cela, elle décompose ' + n + ' en facteurs premiers.',
          image: { dessin: 'arbre', nombre: n, description: 'L’arbre de décomposition de ' + n + ' jusqu’aux nombres premiers.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la décomposition en facteurs premiers de ' + n + ' ?',
              reponse: O.choix(c.alea, O.decompositionEcrite(n), [O.decompositionEcrite(n * 2), O.decompositionEcrite(n * 3)]),
              aide: 'Divise par 2 tant que tu peux, puis par 3, puis par 5, puis par 7.',
              correction: etapes(n).concat(['Réponse : ' + O.decompositionEcrite(n) + '.']),
            },
            {
              texte: 'Question 2. Quel est le plus grand facteur premier de ' + n + ' ?',
              reponse: { type: 'nombre', valeur: grand },
              aide: 'Regarde le dernier nombre de ton arbre.',
              correction: [n + ' = ' + produit(n) + '. Le plus grand facteur premier est ' + grand + '.'],
            },
            {
              texte: 'Question 3. Peut-on ranger les parts en 7 plateaux égaux ? Justifie avec la décomposition.',
              correction: [n + ' = ' + O.decompositionEcrite(n) + '.', par7 ? '7 apparaît dans la décomposition : ' + n + ' est divisible par 7. Oui, on peut.' : '7 n’apparaît pas dans la décomposition : ' + n + ' n’est pas divisible par 7. Non, on ne peut pas.'],
              grille: ['As-tu écrit la décomposition de ' + n + ' ?', 'As-tu regardé si 7 apparaît dans la décomposition ?', 'As-tu conclu par une phrase : « oui, on peut » ou « non, on ne peut pas » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais faire l’arbre d’un nombre et l’écrire avec ses facteurs premiers.',
    carte: ['premier-facteur', 'recomposer', 'combien-de-2'],
    papierDuSoir: { exercices: ['combien-de-facteurs', 'bonne-ecriture'], defi: true },
    automatismes: [
      {
        id: 'produit-de-premiers',
        versions: [[2, 3], [2, 5], [3, 5], [2, 7], [3, 7], [5, 7], [2, 11], [3, 11]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Combien font ' + a + ' × ' + b + ' ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    // Fait proposé (RSA) écarté : aucune source sérieuse ouverte ne l'a confirmé (contenu/sources-culture.md).
    savaisTu: null,
    prenoms: ['Ibrahim', 'Laure', 'Esther'],
  };
});
