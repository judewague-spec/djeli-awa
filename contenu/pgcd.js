/* Notion 7 du bloc « Les nombres » : PGCD, méthode des diviseurs et algorithme d'Euclide. Les sachets de bonbons. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  /** Les lignes de l'algorithme d'Euclide : « 84 = 1 × 60 + 24 »… */
  function euclide(a, b) {
    const l = [];
    while (b) { const q = Math.floor(a / b), r = a % b; l.push(a + ' = ' + q + ' × ' + b + ' + ' + r); [a, b] = [b, r]; }
    return l;
  }
  const communs = (a, b) => O.diviseurs(Math.min(a, b)).filter((d) => a % d === 0 && b % d === 0);

  return {
    id: 'pgcd',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'PGCD : méthode des diviseurs et algorithme d’Euclide',
    classe: 'ancien programme',
    univers: ['commerce', 'cuisine-restaurant', 'famille'],

    accroche: {
      texte: 'Pour l’anniversaire de Rachel, Aminata a 84 bonbons et 60 sucettes. Elle veut faire des sachets tous pareils : ' +
        'le même nombre de bonbons et le même nombre de sucettes dans chaque sachet, sans rien laisser. ' +
        'Combien de sachets peut-elle faire, au plus ?',
      image: { dessin: 'barres', barres: [{ nom: 'Bonbons', parts: 7 }, { nom: 'Sucettes', parts: 5 }], description: 'Deux barres : 84 bonbons et 60 sucettes, à partager en sachets identiques.' },
    },

    manipulation: {
      image: { dessin: 'paquets', objets: 84, parPaquet: 7, description: '84 bonbons rangés en 12 tas de 7.' },
      etapes: [
        'Première méthode : les diviseurs. Diviseurs de 60 : 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60.',
        'Parmi eux, ceux qui divisent aussi 84 : 1, 2, 3, 4, 6, 12. Le plus grand est 12.',
        'Deuxième méthode, plus rapide avec les grands nombres : on divise le grand par le petit. 84 = 1 × 60 + 24.',
        'On recommence avec 60 et le reste 24 : 60 = 2 × 24 + 12. Puis 24 = 2 × 12 + 0.',
        'Le reste est 0 : le dernier reste qui n’était pas nul, 12, est la réponse. 12 sachets, avec 7 bonbons et 5 sucettes chacun.',
      ],
    },

    decouverte: {
      texte: (c) => '12 est le plus grand nombre qui divise à la fois 84 et 60. C’est ' + c.mot('pgcd') + ' de 84 et 60. ' +
        'L’astuce d’Euclide : divise le grand par le petit, garde le reste, et recommence avec le petit et le reste. ' +
        'Quand le reste vaut zéro, le dernier reste non nul est la réponse.',
    },

    vocabulaire: {
      termes: {
        pgcd: { sesMots: 'le plus grand nombre de sachets', officiel: 'le PGCD', lesDeux: 'le plus grand nombre de sachets, le PGCD,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 12, c’est le plus grand nombre de sachets qu’on peut faire avec 84 bonbons et 60 sucettes. ' +
          'Les matheux ont un mot pour ça : je te le dirai la prochaine fois.',
        'Les matheux disent : le PGCD, pour plus grand commun diviseur. Le PGCD de 84 et 60, c’est 12 : notre plus grand nombre de sachets. ' +
          'Commun, parce qu’il divise les deux nombres à la fois.',
        'Tu connais le mot officiel : le PGCD de 84 et 60 est 12. On le trouve avec les diviseurs, ou avec l’algorithme d’Euclide.',
      ],
    },

    exercices: [
      {
        id: 'diviseurs-communs',
        univers: 'cuisine-restaurant',
        versions: [[12, 18], [16, 24], [20, 30], [18, 27], [24, 36], [15, 25], [14, 21], [28, 42]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = O.pgcd(a, b);
          return {
            enonce: 'Laure range ' + a + ' œufs et ' + b + ' tomates dans des paniers identiques, sans reste. Combien de paniers, au plus ?',
            reponse: { type: 'nombre', valeur: g },
            aide: 'Écris les diviseurs de ' + a + ' et de ' + b + ', puis prends le plus grand qui est dans les deux listes.',
            aideParlee: 'Écris les diviseurs des deux nombres, puis prends le plus grand qui est dans les deux listes.',
            correction: ['Diviseurs de ' + a + ' : ' + O.diviseurs(a).join(', ') + '.', 'Diviseurs de ' + b + ' : ' + O.diviseurs(b).join(', ') + '.',
              'Diviseurs communs : ' + communs(a, b).join(', ') + '. Le plus grand est ' + g + ' : ' + g + ' paniers.'],
          };
        },
      },
      {
        id: 'euclide',
        univers: 'commerce',
        versions: [[84, 60], [126, 90], [105, 75], [96, 64], [144, 84], [150, 105], [132, 96], [168, 120], [210, 140], [252, 196]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = O.pgcd(a, b);
          return {
            enonce: 'Avec l’algorithme d’Euclide, trouve le PGCD de ' + a + ' et ' + b + '.',
            reponse: { type: 'nombre', valeur: g },
            aide: 'Commence par diviser ' + a + ' par ' + b + ' et garde le reste.',
            aideParlee: 'Divise le grand nombre par le petit, garde le reste, et recommence avec le petit et le reste.',
            correction: euclide(a, b).concat(['Le dernier reste non nul est ' + g + ' : le PGCD est ' + g + '.']),
          };
        },
      },
      {
        id: 'contenu-du-sachet',
        univers: 'famille',
        versions: [[84, 60], [48, 36], [72, 54], [90, 60], [56, 42], [45, 30], [64, 48], [80, 50]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = O.pgcd(a, b);
          return {
            enonce: 'Avec ' + a + ' bonbons et ' + b + ' sucettes, Aminata fait ' + g + ' sachets identiques, le plus possible. Combien de bonbons y a-t-il dans chaque sachet ?',
            reponse: { type: 'nombre', valeur: a / g },
            aide: 'Partage les ' + a + ' bonbons entre les ' + g + ' sachets.',
            aideParlee: 'Partage les bonbons entre les sachets.',
            correction: [a + ' ÷ ' + g + ' = ' + a / g + ' : ' + a / g + ' bonbons par sachet.'],
          };
        },
      },
      {
        id: 'premiers-entre-eux',
        univers: 'commerce',
        versions: [[8, 15], [9, 12], [14, 25], [10, 21], [18, 24], [16, 27], [20, 33], [22, 33]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = O.pgcd(a, b);
          const bonne = g === 1 ? 'Non, seulement 1' : 'Oui';
          return {
            enonce: 'Les nombres ' + a + ' et ' + b + ' ont-ils un diviseur commun autre que 1 ?',
            reponse: O.choix(c.alea, bonne, ['Oui', 'Non, seulement 1']),
            aide: 'Cherche le PGCD de ' + a + ' et ' + b + '.',
            aideParlee: 'Cherche le PGCD des deux nombres. S’il vaut 1, ils n’ont que 1 en commun.',
            correction: euclide(Math.max(a, b), Math.min(a, b)).concat(['Le PGCD est ' + g + '. Réponse : ' + bonne + '.']),
          };
        },
      },
      {
        id: 'possible',
        univers: 'cuisine-restaurant',
        // [a, b, nombre de sachets proposé]
        versions: [[84, 60, 6], [84, 60, 8], [90, 60, 15], [90, 60, 20], [72, 48, 12], [72, 48, 16], [64, 40, 8], [64, 40, 5]],
        genere(c) {
          const [a, b, n] = c.alea.choisir(this.versions);
          const ok = a % n === 0 && b % n === 0;
          const bonne = ok ? 'Oui' : 'Non';
          return {
            enonce: 'Avec ' + a + ' beignets et ' + b + ' bananes, peut-on faire ' + n + ' assiettes identiques, sans reste ?',
            reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
            aide: n + ' doit diviser ' + a + ' et aussi ' + b + '.',
            aideParlee: 'Le nombre d’assiettes doit diviser les deux nombres à la fois.',
            correction: [a + ' ÷ ' + n + ' : reste ' + (a % n) + '. ' + b + ' ÷ ' + n + ' : reste ' + (b % n) + '.', ok ? 'Les deux tombent juste.' : 'Les deux ne tombent pas juste.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      versions: [[252, 196], [210, 126], [180, 150], [168, 140], [240, 180], [270, 210]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        const g = O.pgcd(a, b);
        return {
          enonce: 'Un fleuriste a ' + a + ' roses et ' + b + ' tulipes. Il veut faire le plus grand nombre de bouquets identiques, ' +
            'en utilisant toutes les fleurs.',
          questions: [
            {
              texte: 'Question 1. Combien de bouquets peut-il faire, au plus ?',
              reponse: { type: 'nombre', valeur: g },
              aide: 'Cherche le PGCD des deux nombres, avec l’algorithme d’Euclide.',
              correction: euclide(a, b).concat(['Le PGCD est ' + g + ' : il peut faire ' + g + ' bouquets.']),
            },
            {
              texte: 'Question 2. Combien de roses y aura-t-il dans chaque bouquet ?',
              reponse: { type: 'nombre', valeur: a / g },
              aide: 'Partage les roses entre les bouquets.',
              correction: [a + ' ÷ ' + g + ' = ' + a / g + ' roses par bouquet.'],
            },
            {
              texte: 'Question 3. Justifie ta réponse à la question 1 en écrivant toutes les étapes de l’algorithme d’Euclide.',
              correction: euclide(a, b).concat(['Le dernier reste non nul est ' + g + '.', 'Donc le PGCD de ' + a + ' et ' + b + ' est ' + g + ' : ' + g + ' bouquets au plus.']),
              grille: ['As-tu divisé ' + a + ' par ' + b + ' ?', 'As-tu continué avec le diviseur et le reste, jusqu’au reste 0 ?', 'As-tu dit que le PGCD est le dernier reste non nul ?', 'As-tu conclu par une phrase avec le nombre de bouquets ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais faire le plus grand nombre de sachets identiques : c’est le PGCD, et Euclide t’aide à le trouver vite.',
    carte: ['diviseurs-communs', 'euclide', 'contenu-du-sachet'],
    papierDuSoir: { exercices: ['euclide', 'possible'], defi: true },
    automatismes: [
      {
        id: 'pgcd-rapide',
        versions: [[6, 9], [8, 12], [10, 15], [12, 16], [9, 15], [14, 21], [12, 18], [20, 25]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'PGCD de ' + a + ' et ' + b + ' ?', reponse: { type: 'nombre', valeur: O.pgcd(a, b) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Euclide, savant d’Alexandrie, en Égypte, a décrit il y a plus de deux mille ans la méthode pour trouver le plus grand diviseur commun.',
    prenoms: ['Rachel', 'Aminata', 'Laure'],
  };
});
