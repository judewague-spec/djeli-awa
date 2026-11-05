/* Notion 5 du bloc physique-chimie « La matière » : la composition de l'air. Le feu d'Aminata. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const N2 = 'Le diazote', O2 = 'Le dioxygène';

  return {
    id: 'composition-air',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'La composition de l’air',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'maison-courses', 'dehors'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière ».',

    accroche: {
      texte: 'Aminata allume le feu du barbecue. Quand les braises faiblissent, elle souffle dessus : elles rougissent aussitôt ! ' +
        'Quelque chose dans l’air aide le feu à brûler. Mais l’air, ce n’est pas un seul gaz. De quoi est-il fait ?',
      image: { dessin: 'barres', barres: [{ nom: 'Diazote', parts: 4 }, { nom: 'Dioxygène', parts: 1 }], description: 'Deux barres : 4 parts de diazote pour 1 part de dioxygène.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Diazote', parts: 4 }, { nom: 'Dioxygène', parts: 1 }], description: 'L’air coupé en 5 parts égales : 4 parts de diazote, 1 part de dioxygène.' },
      etapes: [
        'L’air est un mélange de gaz. Imagine un litre d’air coupé en 5 parts égales.',
        'Environ 4 parts sur 5 sont un gaz qui ne fait pas brûler le feu.',
        'Environ 1 part sur 5 est le gaz qui entretient le feu, et c’est lui que nous respirons.',
        'Il reste un tout petit peu d’autres gaz, et de la vapeur d’eau.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’air est un mélange. Il contient environ quatre cinquièmes de ' + c.mot('diazote') + ', et un cinquième de ' + c.mot('dioxygene') + '. ' +
        'En pourcentage : environ 78 % et 21 %. ' +
        'L’astuce pour calculer : le volume du gaz qui fait vivre le feu est environ le volume d’air divisé par 5.',
    },

    vocabulaire: {
      termes: {
        diazote: { sesMots: 'gaz qui ne brûle pas', officiel: 'diazote', lesDeux: 'gaz qui ne brûle pas, que les scientifiques appellent le diazote' },
        dioxygene: { sesMots: 'gaz qui fait vivre le feu', officiel: 'dioxygène', lesDeux: 'gaz qui fait vivre le feu, que les scientifiques appellent le dioxygène' },
      },
      textes: [
        'Pour l’instant, garde tes mots : dans l’air, il y a beaucoup d’un gaz qui ne brûle pas, et un peu du gaz qui fait vivre le feu. ' +
          'Les scientifiques ont des noms pour eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le diazote, le gaz le plus abondant de l’air, et le dioxygène, le gaz qui fait vivre le feu.',
        'Tu connais les noms officiels : l’air contient environ 78 % de diazote et 21 % de dioxygène.',
      ],
    },

    exercices: [
      {
        id: 'volume-de-dioxygene',
        univers: 'maison-courses',
        versions: [10, 25, 50, 100, 200, 500, 1000, 35],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          return {
            enonce: 'Un flacon contient ' + v + ' litres d’air. Environ combien de litres de dioxygène contient-il ? (Prends un cinquième.)',
            reponse: { type: 'nombre', valeur: v / 5 },
            aide: 'Calcule ' + v + ' ÷ 5.',
            aideParlee: 'Le dioxygène, c’est environ un cinquième de l’air : divise par 5.',
            correction: [v + ' ÷ 5 = ' + v / 5 + ' litres de dioxygène.'],
          };
        },
      },
      {
        id: 'volume-de-diazote',
        univers: 'dehors',
        versions: [10, 20, 50, 100, 250, 500, 15, 40],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          return {
            enonce: 'Le pneu du vélo de Moussa contient ' + v + ' litres d’air. Environ combien de litres de diazote contient-il ? (Prends quatre cinquièmes.)',
            reponse: { type: 'nombre', valeur: (4 * v) / 5 },
            aide: 'Calcule ' + v + ' ÷ 5 × 4.',
            aideParlee: 'Le diazote, c’est environ quatre cinquièmes de l’air : divise par 5, puis multiplie par 4.',
            correction: [v + ' ÷ 5 = ' + v / 5 + ', puis ' + v / 5 + ' × 4 = ' + (4 * v) / 5 + ' litres de diazote.'],
          };
        },
      },
      {
        id: 'quel-gaz',
        univers: 'cuisine-restaurant',
        versions: [['Quel gaz est le plus abondant dans l’air ?', N2], ['Quel gaz de l’air entretient le feu de la gazinière ?', O2], ['Quel gaz de l’air nos poumons utilisent-ils ?', O2], ['Quel gaz occupe environ quatre cinquièmes de l’air ?', N2]],
        genere(c) {
          const [q, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: q,
            reponse: O.choix(c.alea, bonne, [N2, O2, 'Le dioxyde de carbone']),
            aide: 'Diazote : le plus abondant. Dioxygène : le feu et la respiration.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'piece',
        univers: 'maison-courses',
        // [longueur, largeur, hauteur] en mètres
        versions: [[5, 4, 2.5], [4, 3, 2.5], [6, 5, 2.5], [10, 5, 3], [5, 5, 2], [8, 5, 2.5]],
        genere(c) {
          const [lo, la, h] = c.alea.choisir(this.versions);
          const v = lo * la * h;
          return {
            enonce: 'La chambre de Rachel mesure ' + lo + ' m sur ' + la + ' m, avec ' + String(h).replace('.', ',') + ' m de hauteur. Elle contient ' + String(v).replace('.', ',') + ' m³ d’air. Environ combien de mètres cubes de dioxygène ?',
            reponse: { type: 'nombre', valeur: v / 5 },
            aide: 'Un cinquième du volume d’air : ' + v + ' ÷ 5.',
            aideParlee: 'Prends un cinquième du volume de la pièce.',
            correction: [v + ' ÷ 5 = ' + v / 5 + ' m³ de dioxygène.'],
          };
        },
      },
      {
        id: 'volume-d-air',
        univers: 'dehors',
        versions: [2, 4, 5, 10, 20, 50],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour avoir ' + v + ' litres de dioxygène, environ combien de litres d’air faut-il ? (L’air en contient un cinquième.)',
            reponse: { type: 'nombre', valeur: 5 * v },
            aide: 'L’air contient 5 fois plus que son dioxygène : ' + v + ' × 5.',
            aideParlee: 'Il faut 5 fois plus d’air que de dioxygène : multiplie par 5.',
            correction: [v + ' × 5 = ' + 5 * v + ' litres d’air.'],
          };
        },
      },
    ],

    defi: {
      // [longueur, largeur, hauteur] de la salle en mètres
      versions: [[10, 8, 3], [9, 5, 3], [8, 5, 3], [10, 6, 3], [12, 5, 3], [7, 5, 3]],
      genere(c) {
        const [lo, la, h] = c.alea.choisir(this.versions);
        const v = lo * la * h;
        return {
          enonce: 'La salle de danse où Rebecca s’entraîne mesure ' + lo + ' m de long, ' + la + ' m de large et ' + h + ' m de haut. Elle est remplie d’air.',
          questions: [
            {
              texte: 'Question 1. Quel est le volume d’air de la salle, en mètres cubes ?',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Multiplie la longueur, la largeur et la hauteur.',
              correction: [lo + ' × ' + la + ' × ' + h + ' = ' + v + ' m³.'],
            },
            {
              texte: 'Question 2. Environ combien de mètres cubes de dioxygène contient la salle ?',
              reponse: { type: 'nombre', valeur: v / 5 },
              aide: 'Le dioxygène, c’est environ un cinquième de l’air.',
              correction: [v + ' ÷ 5 = ' + v / 5 + ' m³ de dioxygène.'],
            },
            {
              texte: 'Question 3. Moussa dit : « L’air est un corps pur. » Explique son erreur, en nommant les gaz de l’air.',
              correction: ['L’air contient plusieurs gaz : environ 78 % de diazote, 21 % de dioxygène, et un peu d’autres gaz.', 'Plusieurs sortes de particules : c’est un mélange, pas un corps pur.'],
              grille: ['As-tu nommé le diazote et le dioxygène ?', 'As-tu donné leurs proportions, même environ ?', 'As-tu conclu que l’air est un mélange ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais de quoi est fait l’air : surtout du diazote, et un cinquième de dioxygène pour le feu et pour respirer.',
    carte: ['volume-de-dioxygene', 'quel-gaz', 'volume-d-air'],
    papierDuSoir: { exercices: ['volume-de-diazote', 'piece'], defi: true },
    automatismes: [
      {
        id: 'cinquieme',
        versions: [5, 20, 50, 100, 15],
        genere(c) { const v = c.alea.choisir(this.versions); return { enonce: 'Un cinquième de ' + v + ' ?', reponse: { type: 'nombre', valeur: v / 5 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le chimiste suédois Carl Wilhelm Scheele a découvert l’oxygène, et a montré que l’air contient un gaz qui entretient le feu.',
    prenoms: ['Aminata', 'Moussa', 'Rachel', 'Rebecca', 'Laure'],
  };
});
