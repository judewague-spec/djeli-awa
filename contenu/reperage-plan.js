/* Notion 16 du bloc « Mesures, géométrie et espace » : le repérage dans le plan. Les étals du marché sur leur plan quadrillé.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const moins = (x) => String(x).replace('-', '−');
  const par = (x) => (x < 0 ? '(' + moins(x) + ')' : moins(x));
  const QUART = { '++': 'En haut à droite', '-+': 'En haut à gauche', '--': 'En bas à gauche', '+-': 'En bas à droite' };
  const TOUS = Object.values(QUART);

  return {
    id: 'reperage-plan',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Repérage dans le plan',
    classe: '4e',
    univers: ['commerce', 'dehors'],

    accroche: {
      texte: 'Aminata cherche l’étal de Clarisse. Sur le plan du marché, la fontaine est au centre. « Trois pas vers l’est, puis deux pas vers le nord », lui dit-on. ' +
        'Deux nombres suffisent à trouver n’importe quel étal. Le premier pour aller de côté, le second pour monter ou descendre.',
      image: { dessin: 'point-graphique', a: 0, b: 0, xMax: 5, yMax: 5, marque: [3, 2], description: 'Un quadrillage avec un axe couché et un axe debout, gradués de 0 à 5. Un point marque l’étal, à 3 sur l’axe couché et à 2 sur l’axe debout.' },
    },

    manipulation: {
      type: 'point-graphique',
      a: 1,
      b: 0,
      xMax: 6,
      yMax: 6,
      abscisses: [2, 5],
      consigne: 'Déplace le point avec les boutons. Sur la ligne tracée, on avance d’autant qu’on monte. Place un point à deux pas vers la droite, puis un autre à cinq pas.',
    },

    decouverte: {
      texte: (c) => 'Un point se repère par deux nombres, toujours dans le même ordre. D’abord ' + c.mot('abscisse') + ', sur l’axe couché. Puis ' + c.mot('ordonnee') + ', sur l’axe debout. ' +
        'L’astuce : l’alphabet ! Le a d’abscisse vient avant le o d’ordonnée. Un nombre négatif veut dire à gauche, ou en bas.',
    },

    vocabulaire: {
      termes: {
        abscisse: { sesMots: 'le nombre de côté', officiel: 'l’abscisse', lesDeux: 'le nombre de côté, que l’on appelle l’abscisse' },
        ordonnee: { sesMots: 'le nombre qui monte', officiel: 'l’ordonnée', lesDeux: 'le nombre qui monte, que l’on appelle l’ordonnée' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le nombre de côté, et le nombre qui monte. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’abscisse, pour le nombre de côté. Et le nombre qui monte s’appelle l’ordonnée.',
        'Tu connais les mots officiels : l’abscisse, et l’ordonnée.',
      ],
    },

    exercices: [
      {
        id: 'lire-abscisse',
        univers: 'commerce',
        versions: [[3, 2], [-4, 1], [5, -2], [-1, -3], [0, 4], [2, 6]],
        genere(c) {
          const [x, y] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur le plan du marché, un étal a pour coordonnées (' + moins(x) + ' ; ' + moins(y) + '). Quelle est son abscisse ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'L’abscisse est le premier nombre.',
            correction: ['Le premier nombre est l’abscisse : ' + moins(x) + '.'],
          };
        },
      },
      {
        id: 'lire-ordonnee',
        univers: 'commerce',
        versions: [[3, 2], [-4, 1], [5, -2], [-1, -3], [0, 4], [2, 6]],
        genere(c) {
          const [x, y] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le point M a pour coordonnées (' + moins(x) + ' ; ' + moins(y) + '). Quelle est son ordonnée ?',
            reponse: { type: 'nombre', valeur: y },
            aide: 'L’ordonnée est le second nombre.',
            correction: ['Le second nombre est l’ordonnée : ' + moins(y) + '.'],
          };
        },
      },
      {
        id: 'quel-coin',
        univers: 'dehors',
        versions: [[3, 2], [-4, 1], [5, -2], [-1, -3], [2, 6], [-6, -1]],
        genere(c) {
          const [x, y] = c.alea.choisir(this.versions);
          const juste = QUART[(x > 0 ? '+' : '-') + (y > 0 ? '+' : '-')];
          return {
            enonce: 'La fontaine est au centre du repère. Où se trouve le point (' + moins(x) + ' ; ' + moins(y) + ') par rapport à elle ?',
            reponse: O.choix(c.alea, juste, TOUS),
            aide: 'Regarde le signe de chaque nombre : d’abord droite ou gauche, puis haut ou bas.',
            correction: ['Abscisse ' + moins(x) + ' : ' + (x > 0 ? 'à droite' : 'à gauche') + '.', 'Ordonnée ' + moins(y) + ' : ' + (y > 0 ? 'en haut' : 'en bas') + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'symetrique-origine',
        univers: 'dehors',
        versions: [[3, 2], [-4, 1], [5, -2], [-1, -3], [6, 4], [-2, 7]],
        genere(c) {
          const [x, y] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le point A(' + moins(x) + ' ; ' + moins(y) + ') a pour image B par la symétrie de centre l’origine du repère. Quelle est l’abscisse de B ?',
            reponse: { type: 'nombre', valeur: -x },
            aide: 'L’origine est au milieu de A et de B : les deux nombres changent de signe.',
            correction: ['L’abscisse change de signe.', 'L’abscisse de B est ' + moins(-x) + '.'],
          };
        },
      },
      {
        id: 'distance-horizontale',
        univers: 'commerce',
        // [xa, xb, y]
        versions: [[1, 6, 2], [-3, 4, 1], [-5, -1, 3], [2, 9, 4], [-2, 5, 0], [0, 7, 3]],
        genere(c) {
          const [xa, xb, y] = c.alea.choisir(this.versions);
          return {
            enonce: 'Deux étals sont aux points A(' + moins(xa) + ' ; ' + y + ') et B(' + moins(xb) + ' ; ' + y + '). Une unité représente un pas. Combien de pas les séparent ?',
            reponse: { type: 'nombre', valeur: xb - xa },
            aide: 'Ils ont la même ordonnée : compare leurs abscisses.',
            correction: [moins(xb) + ' − ' + par(xa) + ' = ' + (xb - xa) + ' pas.'],
          };
        },
      },
    ],

    defi: {
      // [x de A, y de A, x de B, y de B] : un rectangle dont A et C sont deux coins opposés
      versions: [[1, 1, 5, 4], [-2, 1, 3, 3], [-3, -1, 2, 2], [0, -2, 4, 3]],
      genere(c) {
        const [xa, ya, xc, yc] = c.alea.choisir(this.versions);
        const l = xc - xa, h = yc - ya;
        return {
          enonce: 'Sur le plan du marché, un stand est un rectangle ABCD, de côtés parallèles aux axes. On donne A(' + moins(xa) + ' ; ' + moins(ya) + ') et C(' + moins(xc) + ' ; ' + moins(yc) + '), deux sommets opposés. Une unité représente un mètre.',
          questions: [
            {
              texte: 'Question 1. Le sommet B a la même ordonnée que A et la même abscisse que C. Quelle est son abscisse ?',
              reponse: { type: 'nombre', valeur: xc },
              aide: 'Son abscisse est celle de C.',
              correction: ['B(' + moins(xc) + ' ; ' + moins(ya) + ').'],
            },
            {
              texte: 'Question 2. Quelle est la longueur AB, en mètres ?',
              reponse: { type: 'nombre', valeur: l },
              aide: 'Compare les abscisses de A et de B.',
              correction: [moins(xc) + ' − ' + par(xa) + ' = ' + l + ' m.'],
            },
            {
              texte: 'Question 3. Quelle est l’aire du stand, en m² ?',
              reponse: { type: 'nombre', valeur: l * h },
              aide: 'Calcule aussi la longueur BC, puis multiplie.',
              correction: ['BC = ' + moins(yc) + ' − ' + par(ya) + ' = ' + h + ' m.', l + ' × ' + h + ' = ' + l * h + ' m².'],
            },
            {
              texte: 'Question 4. Donner les coordonnées du point D, et expliquer comment on les trouve.',
              correction: ['D a la même abscisse que A et la même ordonnée que C.', 'D(' + moins(xa) + ' ; ' + moins(yc) + ').'],
              grille: ['As-tu donné les deux nombres, dans le bon ordre ?', 'As-tu expliqué avec les côtés parallèles aux axes ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Deux nombres, dans le bon ordre, et tu trouves n’importe quel étal du marché.',
    carte: ['lire-abscisse', 'lire-ordonnee', 'quel-coin'],
    papierDuSoir: { exercices: ['quel-coin', 'distance-horizontale'], defi: true },
    automatismes: [
      {
        id: 'ecart-relatif',
        versions: [[5, 2], [3, -1], [-2, -6], [4, -4]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: moins(a) + ' − ' + par(b) + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le Français René Descartes a appliqué l’algèbre à la géométrie : d’où le nom de géométrie cartésienne.',
    prenoms: ['Aminata', 'Clarisse'],
  };
});
