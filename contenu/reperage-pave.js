/* Notion 18 du bloc « Mesures, géométrie et espace » : se repérer dans un pavé droit. La mouche et les mangues dans la caisse du marchand.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const dans = (l, p, h, x, y, z) => x >= 0 && y >= 0 && z >= 0 && x <= l && y <= p && z <= h;
  const OUI = 'Oui, il est dans la caisse', NON = 'Non, il est en dehors';

  return {
    id: 'reperage-pave',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Repérage dans un pavé',
    classe: '4e',
    univers: ['commerce', 'appareils'],

    accroche: {
      texte: 'Moussa range des mangues par couches. Comment dire où est une mangue précise ? Deux nombres ne suffisent plus. ' +
        'Il faut dire : combien de places en longueur, combien en largeur, et à quelle couche. Trois nombres, pour un seul point dans l’espace.',
      image: { dessin: 'solide', forme: 'pave', l: 5, p: 4, h: 3, cotes: { l: 'longueur 5', p: 'largeur 4', h: 'hauteur 3' }, description: 'Une caisse en pavé droit. Le coin du bas, à gauche, devant, est l’origine. La longueur mesure 5, la largeur 4, la hauteur 3. Le coin opposé a pour coordonnées 5, 4 et 3.' },
    },

    manipulation: {
      etapes: [
        'Choisis le coin du bas, à gauche, devant : c’est le départ.',
        'Le premier nombre dit combien avancer le long de la longueur.',
        'Le deuxième dit combien avancer dans la largeur, vers le fond.',
        'Le troisième dit combien monter. La mangue de coordonnées 2, 1 et 3 est à la troisième couche.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans un pavé droit, un point a trois coordonnées : l’abscisse, l’ordonnée et ' + c.mot('altitude') + '. On part ' + c.mot('origine').replace(/^le /, 'du ').replace(/^(l’|la )/, 'de $1') + ', avec trois zéros. ' +
        'L’astuce : le coin opposé a pour coordonnées les trois dimensions de la caisse.',
    },

    vocabulaire: {
      termes: {
        altitude: { sesMots: 'la hauteur du point', officiel: 'l’altitude', lesDeux: 'la hauteur du point, que l’on appelle l’altitude' },
        origine: { sesMots: 'le coin de départ', officiel: 'l’origine du repère', lesDeux: 'le coin de départ, que l’on appelle l’origine du repère' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la hauteur du point, et le coin de départ. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’altitude, pour la hauteur du point. Et le coin de départ s’appelle l’origine du repère.',
        'Tu connais les mots officiels : l’altitude, et l’origine du repère.',
      ],
    },

    exercices: [
      {
        id: 'lire-altitude',
        univers: 'commerce',
        versions: [[2, 1, 3], [4, 3, 1], [5, 2, 2], [1, 4, 5], [3, 3, 4], [6, 2, 1]],
        genere(c) {
          const [x, y, z] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une mangue a pour coordonnées (' + x + ' ; ' + y + ' ; ' + z + ') dans la caisse. À quelle couche est-elle ?',
            reponse: { type: 'nombre', valeur: z },
            aide: 'La couche, c’est le troisième nombre.',
            correction: ['Le troisième nombre est l’altitude : ' + z + '.'],
          };
        },
      },
      {
        id: 'coin-oppose',
        univers: 'commerce',
        // [l, p, h, quelle coordonnée]
        versions: [[5, 4, 3, 0], [6, 2, 5, 1], [8, 5, 2, 2], [4, 4, 6, 0], [10, 3, 2, 1], [7, 5, 4, 2]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const [l, p, h, k] = v;
          const nom = ['abscisse', 'ordonnée', 'altitude'][k];
          return {
            enonce: 'Une caisse mesure ' + l + ' de long, ' + p + ' de large et ' + h + ' de haut. L’origine est un de ses coins. Quelle est l’' + nom + ' du coin opposé ?',
            reponse: { type: 'nombre', valeur: v[k] },
            aide: 'Le coin opposé a pour coordonnées la longueur, la largeur et la hauteur.',
            correction: ['Le coin opposé est (' + l + ' ; ' + p + ' ; ' + h + ').', 'Son ' + nom + ' est ' + v[k] + '.'],
          };
        },
      },
      {
        id: 'dans-la-caisse',
        univers: 'appareils',
        // [l, p, h, x, y, z]
        versions: [[5, 4, 3, 2, 1, 3], [5, 4, 3, 6, 1, 2], [6, 2, 5, 3, 3, 1], [6, 2, 5, 4, 2, 5], [8, 5, 2, 1, 1, 3], [8, 5, 2, 8, 0, 2]],
        genere(c) {
          const [l, p, h, x, y, z] = c.alea.choisir(this.versions);
          const juste = dans(l, p, h, x, y, z) ? OUI : NON;
          return {
            enonce: 'Une caisse de l’atelier mesure ' + l + ' dm sur ' + p + ' dm, et ' + h + ' dm de haut. L’origine est un de ses coins. Le point (' + x + ' ; ' + y + ' ; ' + z + ') est-il dans la caisse ?',
            reponse: O.choix(c.alea, juste, [OUI, NON]),
            aide: 'Compare chaque nombre à la dimension qui lui correspond.',
            correction: ['Abscisse ' + x + ' pour ' + l + ', ordonnée ' + y + ' pour ' + p + ', altitude ' + z + ' pour ' + h + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'monter-dune-couche',
        univers: 'commerce',
        // [x, y, z, couches montées]
        versions: [[2, 1, 1, 2], [3, 4, 2, 1], [1, 1, 3, 2], [5, 2, 1, 3], [2, 2, 4, 1], [4, 3, 2, 3]],
        genere(c) {
          const [x, y, z, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une mangue est au point (' + x + ' ; ' + y + ' ; ' + z + '). Moussa la remonte tout droit de ' + O.nb(n, 'couche') + '. Quelle est sa nouvelle altitude ?',
            reponse: { type: 'nombre', valeur: z + n },
            aide: 'Seul le troisième nombre change.',
            correction: [z + ' + ' + n + ' = ' + (z + n) + '.'],
          };
        },
      },
      {
        id: 'centre-de-la-caisse',
        univers: 'appareils',
        // [l, p, h, quelle coordonnée]
        versions: [[4, 6, 2, 0], [8, 4, 6, 1], [10, 2, 4, 2], [6, 6, 8, 0], [5, 4, 3, 2], [3, 8, 2, 0]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const [l, p, h, k] = v;
          const nom = ['abscisse', 'ordonnée', 'altitude'][k];
          return {
            enonce: 'Une boîte a pour dimensions ' + l + ', ' + p + ' et ' + h + ', avec l’origine à un coin. Quelle est l’' + nom + ' du centre de la boîte ?',
            reponse: { type: 'nombre', valeur: v[k] / 2 },
            aide: 'Le centre est à la moitié de chaque dimension.',
            correction: ['Le centre est (' + ecr(l / 2) + ' ; ' + ecr(p / 2) + ' ; ' + ecr(h / 2) + ').', 'Son ' + nom + ' est ' + ecr(v[k] / 2) + '.'],
          };
        },
      },
    ],

    defi: {
      // [l, p, h, côté d'une couche]
      versions: [[6, 4, 3], [5, 3, 4], [8, 4, 2], [6, 5, 2]],
      genere(c) {
        const [l, p, h] = c.alea.choisir(this.versions);
        return {
          enonce: 'Une caisse de mangues est un pavé droit ABCDEFGH, de ' + l + ' places en longueur, ' + p + ' en largeur et ' + h + ' en hauteur. L’origine du repère est le sommet A, et G est le sommet opposé à A. Chaque place contient une mangue.',
          image: { dessin: 'solide', forme: 'pave', l, p, h, cotes: { l: l + ' places', p: p + ' places', h: h + ' places' }, description: 'Un pavé droit de ' + l + ' places en longueur, ' + p + ' en largeur et ' + h + ' en hauteur. Le sommet A, en bas devant à gauche, est l’origine. Le sommet G, opposé à A, a pour coordonnées ' + l + ', ' + p + ' et ' + h + '.' },
          questions: [
            {
              texte: 'Question 1. Quelle est l’altitude du point G ?',
              reponse: { type: 'nombre', valeur: h },
              aide: 'G est le coin opposé à l’origine.',
              correction: ['G(' + l + ' ; ' + p + ' ; ' + h + '), donc son altitude est ' + h + '.'],
            },
            {
              texte: 'Question 2. Combien de mangues y a-t-il dans une couche ?',
              reponse: { type: 'nombre', valeur: l * p },
              aide: 'Une couche, c’est la longueur fois la largeur.',
              correction: [l + ' × ' + p + ' = ' + l * p + ' mangues.'],
            },
            {
              texte: 'Question 3. Combien de mangues y a-t-il dans toute la caisse ?',
              reponse: { type: 'nombre', valeur: l * p * h },
              aide: 'Multiplie par le nombre de couches.',
              correction: [l * p + ' × ' + h + ' = ' + l * p * h + ' mangues.'],
            },
            {
              texte: 'Question 4. Une mangue a pour coordonnées (' + (l - 1) + ' ; ' + (p - 1) + ' ; 1). Dire où elle se trouve dans la caisse, avec des mots.',
              correction: ['Son altitude est 1 : elle est dans la couche du bas.', 'Elle est à la place ' + (l - 1) + ' en longueur et à la place ' + (p - 1) + ' en largeur.'],
              grille: ['As-tu utilisé les trois nombres ?', 'As-tu dit que le troisième donne la couche ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Trois nombres, et plus aucune mangue ne se cache dans la caisse.',
    carte: ['lire-altitude', 'coin-oppose', 'dans-la-caisse'],
    papierDuSoir: { exercices: ['coin-oppose', 'centre-de-la-caisse'], defi: true },
    automatismes: [
      {
        id: 'trois-facteurs',
        versions: [[2, 3, 4], [5, 2, 2], [3, 3, 3], [4, 5, 2]],
        genere(c) { const [a, b, d] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' × ' + d + ' = ?', reponse: { type: 'nombre', valeur: a * b * d } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte, à Alexandrie, Ptolémée a placé les lieux du monde avec deux nombres, latitude et longitude.',
    prenoms: ['Moussa'],
  };
});
