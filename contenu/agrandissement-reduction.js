/* Notion 21 du bloc « Mesures, géométrie et espace » : agrandissement et réduction. La maquette de la maison de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r3 = (x) => Math.round(x * 1000) / 1000;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'agrandissement-reduction',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Agrandissement et réduction',
    classe: '4e',
    univers: ['famille', 'cuisine-restaurant'],

    accroche: {
      texte: 'Clarisse fait une maquette de sa maison. Toutes les longueurs sont divisées par deux. Elle pense : deux fois moins de peinture, deux fois moins de plâtre. Rachel rit. ' +
        'Il ne faut que le quart de la peinture, et le huitième du plâtre ! Les longueurs, les aires et les volumes ne changent pas pareil.',
      image: { dessin: 'transformation', points: { A: [0, 0], B: [2, 0], C: [0, 2] }, image: [[0, 0], [4, 0], [0, 4]], cote: 6, description: 'Un quadrillage. Un petit triangle rectangle de 2 carreaux de côté, en pointillés, et son agrandissement de 4 carreaux de côté. Les longueurs sont doublées. L’aire passe de 2 à 8 carreaux : elle est multipliée par 4.' },
    },

    manipulation: {
      type: 'transformation',
      genre: 'homothetie',
      points: { A: [1, 1], B: [3, 1], C: [1, 3] },
      centre: [0, 0],
      cote: 10,
      cible: 3,
      rapports: [0.5, 1, 2, 3],
      consigne: 'Change le rapport d’agrandissement, et regarde l’aire écrite à l’écran. Choisis le rapport qui multiplie les longueurs par trois, puis valide.',
    },

    decouverte: {
      texte: (c) => 'Le nombre par lequel on multiplie les longueurs, c’est ' + c.mot('rapport') + '. Plus grand que 1, c’est un agrandissement ; plus petit que 1, une réduction. ' +
        'L’astuce : une longueur, une dimension, on multiplie une fois. Une aire, deux dimensions, on multiplie deux fois : par le rapport au carré. Un volume, trois dimensions : par le rapport au cube.',
    },

    vocabulaire: {
      termes: {
        rapport: { sesMots: 'le multiplicateur de la maquette', officiel: 'le rapport', lesDeux: 'le multiplicateur de la maquette, que l’on appelle le rapport' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le multiplicateur de la maquette. Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : le rapport d’agrandissement ou de réduction, pour le multiplicateur de la maquette.',
        'Tu connais le mot officiel : le rapport.',
      ],
    },

    exercices: [
      {
        id: 'longueur',
        univers: 'famille',
        // [longueur, k]
        versions: [[6, 2], [5, 3], [8, 0.5], [12, 0.25], [4, 1.5], [10, 0.1]],
        genere(c) {
          const [d, k] = c.alea.choisir(this.versions);
          const r = r3(d * k);
          return {
            enonce: 'Sur la vraie maison, un mur mesure ' + d + ' m. On reproduit la maison avec le rapport ' + ecr(k) + '. Quelle est la longueur de ce mur après transformation, en mètres ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Une longueur se multiplie une seule fois par le rapport.',
            correction: [d + ' × ' + ecr(k) + ' = ' + ecr(r) + ' m.'],
          };
        },
      },
      {
        id: 'aire',
        univers: 'famille',
        // [aire, k]
        versions: [[12, 2], [5, 3], [40, 0.5], [8, 4], [100, 0.1], [6, 1.5]],
        genere(c) {
          const [a, k] = c.alea.choisir(this.versions);
          const f = r3(k * k), r = r3(a * k * k);
          return {
            enonce: 'Un toit a une aire de ' + a + ' m². On le reproduit avec le rapport ' + ecr(k) + '. Quelle est son aire après transformation, en m² ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Une aire se multiplie par le rapport au carré.',
            correction: [ecr(k) + '² = ' + ecr(f) + '.', a + ' × ' + ecr(f) + ' = ' + ecr(r) + ' m².'],
          };
        },
      },
      {
        id: 'volume',
        univers: 'cuisine-restaurant',
        // [volume, k]
        versions: [[3, 2], [5, 3], [80, 0.5], [2, 4], [10, 0.5], [16, 0.5]],
        genere(c) {
          const [v, k] = c.alea.choisir(this.versions);
          const f = r3(k * k * k), r = r3(v * k * k * k);
          return {
            enonce: 'Un moule contient ' + v + ' L. On prend un moule de même forme, avec le rapport ' + ecr(k) + '. Combien de litres contient-il ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Un volume se multiplie par le rapport au cube.',
            correction: [ecr(k) + '³ = ' + ecr(f) + '.', v + ' × ' + ecr(f) + ' = ' + ecr(r) + ' L.'],
          };
        },
      },
      {
        id: 'trouver-le-rapport',
        univers: 'famille',
        // [vraie longueur, longueur sur la maquette]
        versions: [[10, 5], [8, 2], [20, 1], [6, 3], [15, 3], [12, 3]],
        genere(c) {
          const [v, m] = c.alea.choisir(this.versions);
          const k = m / v;
          return {
            enonce: 'Un mur de ' + v + ' m est représenté par ' + m + ' m sur une grande maquette de jardin. Quel est le rapport de réduction, en écriture décimale ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Divise la longueur de la maquette par la vraie longueur.',
            correction: [m + ' ÷ ' + v + ' = ' + ecr(k) + '.'],
          };
        },
      },
      Q('que-devient', 'cuisine-restaurant',
        [['Les longueurs sont doublées. Par combien l’aire est-elle multipliée ?', '4'], ['Les longueurs sont doublées. Par combien le volume est-il multiplié ?', '8'], ['Les longueurs sont triplées. Par combien l’aire est-elle multipliée ?', '9'], ['Les longueurs sont triplées. Par combien le volume est-il multiplié ?', '27']],
        (x) => x, ['4', '8', '9', '27'],
        'Pour une aire, multiplie deux fois. Pour un volume, trois fois.',
        'Aire : rapport au carré. Volume : rapport au cube.'),
    ],

    defi: {
      // [l, p, h, k]
      versions: [[10, 8, 4, 0.5], [6, 4, 2, 2], [8, 6, 4, 0.5], [5, 4, 2, 3]],
      genere(c) {
        const [l, p, h, k] = c.alea.choisir(this.versions);
        const a = l * p, v = a * h;
        return {
          enonce: 'Une caisse est un pavé droit de ' + l + ' dm de long, ' + p + ' dm de large et ' + h + ' dm de haut. Clarisse en construit une autre, de même forme, avec le rapport ' + ecr(k) + '.',
          image: { dessin: 'solide', forme: 'pave', l, p, h, cotes: { l: l + ' dm', p: p + ' dm', h: h + ' dm' }, description: 'Un pavé droit de ' + l + ' décimètres de long, ' + p + ' de large et ' + h + ' de haut.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la longueur de la nouvelle caisse, en dm ?',
              reponse: { type: 'nombre', valeur: l * k },
              aide: 'Multiplie par le rapport.',
              correction: [l + ' × ' + ecr(k) + ' = ' + ecr(l * k) + ' dm.'],
            },
            {
              texte: 'Question 2. L’aire du fond de la première caisse est de ' + a + ' dm². Quelle est l’aire du fond de la nouvelle caisse, en dm² ?',
              reponse: { type: 'nombre', valeur: a * k * k },
              aide: 'Une aire se multiplie par le rapport au carré.',
              correction: [a + ' × ' + ecr(k * k) + ' = ' + ecr(a * k * k) + ' dm².'],
            },
            {
              texte: 'Question 3. Le volume de la première caisse est de ' + v + ' dm³. Quel est le volume de la nouvelle caisse, en dm³ ?',
              reponse: { type: 'nombre', valeur: v * k * k * k },
              aide: 'Un volume se multiplie par le rapport au cube.',
              correction: [v + ' × ' + ecr(k * k * k) + ' = ' + ecr(v * k * k * k) + ' dm³.'],
            },
            {
              texte: 'Question 4. Quelqu’un dit : « Si je double les longueurs, le volume double aussi. » Expliquer pourquoi il se trompe.',
              correction: ['Les trois dimensions sont doublées.', 'Le volume est donc multiplié par 2 × 2 × 2, soit 8, et non par 2.'],
              grille: ['As-tu dit que les trois dimensions changent ?', 'As-tu donné le bon multiplicateur, 8 ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une fois, deux fois, trois fois : ta maquette ne te coûtera pas un gramme de plâtre de trop.',
    carte: ['longueur', 'aire', 'que-devient'],
    papierDuSoir: { exercices: ['aire', 'volume'], defi: true },
    automatismes: [
      {
        id: 'cube',
        versions: [[2], [3], [4], [5]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: a + '³ = ?', reponse: { type: 'nombre', valeur: a * a * a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Florence, en Italie, Brunelleschi a calculé le lien entre la longueur réelle d’un objet et sa longueur dessinée.',
    prenoms: ['Clarisse', 'Rachel'],
  };
});
