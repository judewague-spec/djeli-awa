/* Notion 10 du bloc « Mesures, géométrie et espace » : le volume de la pyramide et du cône. Le tas de piment et le cornet d'arachides.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'volume-pyramide-cone',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Volume de la pyramide et du cône',
    classe: '4e',
    univers: ['commerce', 'cuisine-restaurant'],

    accroche: {
      texte: 'Rebecca achète des arachides en cornet. Le vendeur en remplit trois, et les vide dans un petit pot droit, de même fond et de même hauteur. ' +
        'Le pot est juste plein ! Trois cornets pour un pot. Le cornet ne fait qu’un tiers.',
      image: { dessin: 'solide', forme: 'cone', r: 3, h: 6, cotes: { r: '3 cm', h: '6 cm' }, description: 'Un cornet en forme de cône, pointe en haut. Le rayon du fond mesure 3 centimètres, la hauteur 6 centimètres.' },
    },

    manipulation: {
      image: { dessin: 'solide', forme: 'pyramide', l: 6, p: 6, h: 5, cotes: { l: '6 cm', h: '5 cm' }, description: 'Une pyramide à base carrée de 6 centimètres de côté, et de 5 centimètres de hauteur. Le sommet est à la verticale du centre de la base. Les arêtes cachées sont en pointillés.' },
      etapes: [
        'Imagine une boîte droite, et un cornet pointu de même fond et de même hauteur.',
        'Remplis le cornet de riz, et verse-le dans la boîte. Recommence.',
        'Au troisième cornet, la boîte est pleine, tout juste.',
        'Les solides pointus valent donc un tiers de la boîte : c’est vrai pour le cône, et pour la pyramide.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le solide pointu à base ronde, c’est ' + c.mot('cone') + '. Le solide pointu à base à angles, c’est ' + c.mot('pyramide') + '. ' +
        'L’astuce : même calcul que pour le solide droit, puis on prend le tiers. Aire de la base, fois hauteur, divisé par trois.',
    },

    vocabulaire: {
      termes: {
        cone: { sesMots: 'le cornet', officiel: 'le cône', lesDeux: 'le cornet, que l’on appelle le cône' },
        pyramide: { sesMots: 'le tas à angles', officiel: 'la pyramide', lesDeux: 'le tas à angles, que l’on appelle la pyramide' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le cornet, et le tas à angles. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : le cône, pour le cornet. Et le tas à angles s’appelle la pyramide.',
        'Tu connais les mots officiels : le cône, et la pyramide.',
      ],
    },

    exercices: [
      {
        id: 'pyramide-carree',
        univers: 'commerce',
        versions: [[3, 4], [6, 5], [6, 2], [9, 1], [3, 10], [12, 2]],
        genere(c) {
          const [k, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un tas d’épices a la forme d’une pyramide à base carrée, de ' + k + ' cm de côté et ' + h + ' cm de hauteur. Quel est son volume, en cm³ ?',
            reponse: { type: 'nombre', valeur: (k * k * h) / 3 },
            aide: 'Aire de la base, fois hauteur, puis divise par trois.',
            correction: ['Aire de la base : ' + k + ' × ' + k + ' = ' + k * k + ' cm².', k * k + ' × ' + h + ' ÷ 3 = ' + (k * k * h) / 3 + ' cm³.'],
          };
        },
      },
      {
        id: 'pyramide-aire-donnee',
        univers: 'commerce',
        versions: [[12, 5], [30, 4], [15, 6], [24, 10], [9, 7], [21, 3]],
        genere(c) {
          const [a, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une pyramide a une base d’aire ' + a + ' cm², et une hauteur de ' + h + ' cm. Quel est son volume, en cm³ ?',
            reponse: { type: 'nombre', valeur: (a * h) / 3 },
            aide: 'Multiplie les deux nombres, puis divise par trois.',
            correction: [a + ' × ' + h + ' = ' + a * h + '.', a * h + ' ÷ 3 = ' + (a * h) / 3 + ' cm³.'],
          };
        },
      },
      {
        id: 'cone',
        univers: 'cuisine-restaurant',
        versions: [[3, 10], [3, 5], [6, 5], [2, 3], [3, 20], [1, 3]],
        genere(c) {
          const [r, h] = c.alea.choisir(this.versions);
          const a = r2(3.14 * r * r), v = r2((a * h) / 3);
          return {
            enonce: 'Un cornet de glace a un rayon de ' + r + ' cm et une hauteur de ' + h + ' cm. Quel est son volume, en cm³, arrondi au centième ? Prends 3,14 pour π.',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Aire du disque, fois hauteur, puis divise par trois.',
            correction: ['Aire du disque : 3,14 × ' + r + ' × ' + r + ' = ' + ecr(a) + ' cm².', ecr(a) + ' × ' + h + ' ÷ 3 = ' + ecr(v) + ' cm³.'],
          };
        },
      },
      {
        id: 'trois-cornets',
        univers: 'cuisine-restaurant',
        // le volume du pot droit
        versions: [[90], [150], [240], [300], [60], [120]],
        genere(c) {
          const [v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un pot droit a un volume de ' + v + ' cm³. Quel est le volume d’un cornet de même base et de même hauteur, en cm³ ?',
            reponse: { type: 'nombre', valeur: v / 3 },
            aide: 'Il faut trois cornets pour remplir le pot.',
            correction: [v + ' ÷ 3 = ' + v / 3 + ' cm³.'],
          };
        },
      },
      Q('droit-ou-pointu', 'commerce',
        [['un cylindre', 'Aire de la base × hauteur'], ['un prisme droit', 'Aire de la base × hauteur'], ['un cône', 'Aire de la base × hauteur ÷ 3'], ['une pyramide', 'Aire de la base × hauteur ÷ 3']],
        (x) => 'Quelle formule donne le volume d’' + x + ' ?', ['Aire de la base × hauteur', 'Aire de la base × hauteur ÷ 3'],
        'Le solide finit-il en pointe ?',
        'Un solide droit : base fois hauteur. Un solide pointu : le tiers de cela.'),
    ],

    defi: {
      // [côté de la base en m, hauteur en m, prix du m³]
      versions: [[6, 5, 4], [3, 4, 5], [9, 2, 3], [6, 4, 2]],
      genere(c) {
        const [k, h, p] = c.alea.choisir(this.versions);
        const a = k * k, v = (a * h) / 3;
        return {
          enonce: 'Pour une fête, le village construit un tas de sable en forme de pyramide à base carrée, de ' + k + ' m de côté et ' + h + ' m de hauteur. Le sable coûte ' + p + ' € le m³.',
          image: { dessin: 'solide', forme: 'pyramide', l: 4, p: 4, h: 4, cotes: { l: k + ' m', h: h + ' m' }, description: 'Une pyramide à base carrée de ' + k + ' mètres de côté, et de ' + h + ' mètres de hauteur. Le dessin n’est pas à l’échelle.' },
          questions: [
            {
              texte: 'Question 1. Calculer l’aire de la base, en m².',
              reponse: { type: 'nombre', valeur: a },
              aide: 'La base est un carré.',
              correction: [k + ' × ' + k + ' = ' + a + ' m².'],
            },
            {
              texte: 'Question 2. Calculer le volume de la pyramide, en m³.',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Aire de la base, fois hauteur, divisé par trois.',
              correction: [a + ' × ' + h + ' ÷ 3 = ' + v + ' m³.'],
            },
            {
              texte: 'Question 3. Combien coûte ce sable, en euros ?',
              reponse: { type: 'nombre', valeur: v * p },
              aide: 'Multiplie le volume par le prix.',
              correction: [v + ' × ' + p + ' = ' + v * p + ' €.'],
            },
            {
              texte: 'Question 4. Une boîte en pavé droit a la même base et la même hauteur que la pyramide. Combien de fois la pyramide tient-elle dans cette boîte ? Justifier.',
              correction: ['Le pavé droit a pour volume aire de la base fois hauteur.', 'La pyramide en vaut le tiers, donc elle tient 3 fois dans la boîte.'],
              grille: ['As-tu répondu 3 fois ?', 'As-tu comparé les deux formules ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Pointu veut dire un tiers : plus aucun cornet ne te trompe.',
    carte: ['pyramide-aire-donnee', 'trois-cornets', 'droit-ou-pointu'],
    papierDuSoir: { exercices: ['pyramide-carree', 'cone'], defi: true },
    automatismes: [
      {
        id: 'tiers',
        versions: [[12], [30], [27], [60]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: 'Le tiers de ' + a + ' = ?', reponse: { type: 'nombre', valeur: a / 3 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte, le papyrus de Moscou calcule déjà le volume d’une pyramide coupée, à base carrée.',
    prenoms: ['Rebecca'],
  };
});
