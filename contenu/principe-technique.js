/* Notion 3 du bloc de technologie « Les objets et la société » : fonction technique et principe technique. La bouilloire de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const PIECES = ['La poignée en plastique', 'La résistance', 'Le couvercle', 'L’interrupteur'];
  const PRINCIPES = ['Une résistance électrique qui chauffe', 'Une hélice tournée par un moteur', 'L’énergie du soleil changée en électricité', 'Une flamme de gaz'];

  return {
    id: 'principe-technique',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Fonction technique et principe technique',
    classe: 'cycle 4',
    univers: ['appareils', 'cuisine-restaurant', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 11) : fonction technique, principe technique.',

    accroche: {
      texte: 'Laure fait chauffer de l’eau pour le thé. La bouilloire devient brûlante, mais Laure la tient sans se brûler. ' +
        'Comment l’eau chauffe-t-elle ? Et pourquoi la poignée reste-t-elle froide ? Chaque pièce de l’objet a son travail.',
      image: { dessin: 'chaine', etapes: ['La résistance chauffe l’eau', 'Le couvercle garde la chaleur', 'La poignée protège la main'], description: 'Les pièces de la bouilloire : la résistance chauffe l’eau, le couvercle garde la chaleur, la poignée protège la main.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Ce à quoi sert l’objet : chauffer l’eau', 'Le travail de chaque pièce', 'L’idée qui le fait marcher : une résistance'], description: 'Ce à quoi sert la bouilloire, le travail de chaque pièce, l’idée qui la fait marcher.' },
      etapes: [
        'La bouilloire sert à chauffer de l’eau : c’est ce à quoi elle sert, pour Laure.',
        'Dedans, chaque pièce a un travail : la résistance chauffe, l’interrupteur allume, la poignée protège la main.',
        'L’idée qui fait marcher la bouilloire : le courant électrique chauffe une résistance, qui chauffe l’eau.',
        'Une casserole sur le feu chauffe aussi l’eau, avec une autre idée : une flamme.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans un objet, le travail de chaque pièce, c’est ' + c.mot('fonctionTech') + ' : la poignée sert à protéger la main. ' +
        'L’idée scientifique qui fait marcher l’objet, c’est ' + c.mot('principe') + ' : dans la bouilloire, une résistance électrique qui chauffe. ' +
        'L’astuce : une pièce, un travail ; un objet, une idée qui le fait marcher.',
    },

    vocabulaire: {
      termes: {
        fonctionTech: { sesMots: 'le travail d’une pièce', officiel: 'la fonction technique', lesDeux: 'le travail d’une pièce, que les techniciens appellent la fonction technique' },
        principe: { sesMots: 'l’idée qui fait marcher l’objet', officiel: 'le principe technique', lesDeux: 'l’idée qui fait marcher l’objet, que les techniciens appellent le principe technique' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le travail d’une pièce, et l’idée qui fait marcher l’objet. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la fonction technique, pour le travail d’une pièce ; le principe technique, pour l’idée qui fait marcher l’objet.',
        'Tu connais les mots officiels : la fonction technique de chaque pièce, et le principe technique de l’objet.',
      ],
    },

    exercices: [
      O.qcm('quelle-piece', 'appareils',
        [['protéger la main de la chaleur', 'La poignée en plastique'], ['chauffer l’eau', 'La résistance'], ['garder la vapeur dans la bouilloire', 'Le couvercle'], ['allumer et d’éteindre', 'L’interrupteur']],
        (x) => 'Dans la bouilloire, quelle pièce a pour travail ' + (/^[aeiouyéèêh]/i.test(x) ? 'd’' : 'de ') + x + ' ?', PIECES,
        'Pense au travail de chaque pièce.'),
      O.qcm('quel-principe', 'maison-courses',
        [['la bouilloire électrique', 'Une résistance électrique qui chauffe'], ['le ventilateur', 'Une hélice tournée par un moteur'], ['la lampe solaire', 'L’énergie du soleil changée en électricité'], ['la gazinière', 'Une flamme de gaz']],
        (x) => 'Quel est le principe technique ' + x.replace(/^le /, 'du ').replace(/^(la |l’)/, 'de $1') + ' ?', PRINCIPES,
        'Cherche l’idée scientifique qui fait marcher l’objet.'),
      O.qcm('fonction-ou-principe', 'cuisine-restaurant',
        [['La poignée protège la main.', 'Une fonction technique'], ['Le courant chauffe une résistance, qui chauffe l’eau.', 'Un principe technique'], ['L’interrupteur allume la bouilloire.', 'Une fonction technique'], ['La flamme de gaz chauffe la casserole.', 'Un principe technique']],
        (x) => '« ' + x + ' » Est-ce une fonction technique ou un principe technique ?', ['Une fonction technique', 'Un principe technique'],
        'Le travail d’une pièce, ou l’idée qui fait marcher l’objet ?'),
      {
        id: 'quelle-bouilloire',
        univers: 'cuisine-restaurant',
        // [minutes de la bouilloire, minutes de la casserole]
        versions: [[3, 8], [4, 9], [2, 7], [5, 11], [3, 10]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour chauffer un litre d’eau, la bouilloire électrique met ' + a + ' minutes et la casserole sur le gaz met ' + b + ' minutes. Combien de minutes la bouilloire fait-elle gagner ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Calcule ' + b + ' − ' + a + '.',
            aideParlee: 'Soustrais le temps de la bouilloire au temps de la casserole.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' minutes.'],
          };
        },
      },
      {
        id: 'nombre-de-thes',
        univers: 'cuisine-restaurant',
        // [litres d'eau, centilitres par tasse]
        versions: [[1, 20], [1.5, 25], [2, 25], [1, 25], [1.2, 20]],
        genere(c) {
          const [l, cl] = c.alea.choisir(this.versions);
          const n = Math.round((l * 100) / cl);
          return {
            enonce: 'La bouilloire contient ' + O.ecr(l) + ' litre' + (l >= 2 ? 's' : '') + ' d’eau, soit ' + l * 100 + ' cL. Une tasse de thé contient ' + cl + ' cL. Combien de tasses Laure peut-elle remplir ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Calcule ' + l * 100 + ' ÷ ' + cl + '.',
            aideParlee: 'Divise le volume de la bouilloire par celui d’une tasse.',
            correction: [l * 100 + ' ÷ ' + cl + ' = ' + n + ' tasses.'],
          };
        },
      },
    ],

    defi: {
      // [minutes de la bouilloire, minutes de la casserole, nombre de thés par jour]
      versions: [[3, 8, 2], [4, 9, 3], [2, 7, 2], [3, 10, 3]],
      genere(c) {
        const [a, b, j] = c.alea.choisir(this.versions);
        return {
          enonce: 'Chez Laure, on chauffe l’eau du thé ' + j + ' fois par jour. Avec la bouilloire électrique, il faut ' + a + ' minutes ; avec une casserole sur le gaz, ' + b + ' minutes.',
          questions: [
            {
              texte: 'Question 1. Combien de minutes la bouilloire fait-elle gagner à chaque fois ?',
              reponse: { type: 'nombre', valeur: b - a },
              aide: 'Soustrais le temps de la bouilloire au temps de la casserole.',
              correction: [b + ' − ' + a + ' = ' + (b - a) + ' minutes.'],
            },
            {
              texte: 'Question 2. Combien de minutes gagne-t-elle en un jour ?',
              reponse: { type: 'nombre', valeur: (b - a) * j },
              aide: 'Multiplie le temps gagné par le nombre de fois.',
              correction: [(b - a) + ' × ' + j + ' = ' + (b - a) * j + ' minutes.'],
            },
            {
              texte: 'Question 3. La bouilloire et la casserole ont la même fonction d’usage. Leur principe technique est-il le même ? Explique.',
              correction: ['Les deux servent à chauffer de l’eau.', 'Le principe n’est pas le même : une résistance électrique dans la bouilloire, une flamme de gaz sous la casserole.'],
              grille: ['As-tu dit que les deux chauffent de l’eau ?', 'As-tu nommé les deux principes : résistance électrique et flamme ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le travail de chaque pièce, l’idée qui fait marcher l’objet : tu vois maintenant à l’intérieur des appareils.',
    carte: ['quelle-piece', 'quel-principe', 'fonction-ou-principe'],
    papierDuSoir: { exercices: ['quelle-bouilloire', 'nombre-de-thes'], defi: true },
    automatismes: [
      {
        id: 'difference-rapide',
        versions: [[3, 8], [4, 9], [2, 7], [5, 12]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: b + ' − ' + a + ' = ?', reponse: { type: 'nombre', valeur: b - a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Nigeria, Mohammed Bah Abba a conçu un frigo sans électricité : deux pots en terre et du sable mouillé. L’eau qui s’évapore refroidit le pot intérieur.',
    prenoms: ['Laure'],
  };
});
