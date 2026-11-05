/* Notion 22 du bloc « Les nombres » : équation x² = a. Le champ carré et ses deux solutions. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const DEUX = 'Deux solutions', UNE = 'Une seule solution', AUCUNE = 'Aucune solution';

  return {
    id: 'equation-x-carre',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Équation x² = a',
    classe: '3e',
    univers: ['champetre', 'maison-courses', 'famille'],

    accroche: {
      texte: 'Ibrahim a un champ carré de 49 mètres carrés. Il cherche la longueur du côté : un nombre qui, au carré, donne 49. ' +
        'Il trouve 7, bien sûr. Mais son cousin, qui aime les maths, lui dit : « Il y a un autre nombre qui marche ! » Lequel ?',
      image: { dessin: 'carrelage', cote: 7, description: 'Un champ carré de 7 sur 7, soit 49 cases.' },
    },

    manipulation: {
      image: { dessin: 'thermometre', min: -8, max: 8, valeur: 7, depart: -7, description: 'Une droite graduée de −8 à 8 : la flèche marque −7, le liquide s’arrête à 7. Les deux sont à la même distance de zéro.' },
      etapes: [
        'On cherche x tel que x² = 49. On écrit cette égalité : c’est une équation.',
        '7² = 7 × 7 = 49 : 7 marche.',
        'Et (−7)² = (−7) × (−7) = 49 aussi, avec la règle des signes ! −7 marche aussi.',
        'Pour un champ, une longueur est positive : le côté est 7 mètres. Mais en maths, l’équation a deux solutions : 7 et −7.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’équation x² = 49 a deux solutions : 7 et −7. Ce sont ' + c.mot('solutions') + '. ' +
        'La règle : si a est positif, x² = a a deux solutions, √a et −√a. Si a = 0, une seule : 0. ' +
        'Si a est négatif, aucune : un carré n’est jamais négatif.',
    },

    vocabulaire: {
      termes: {
        solutions: { sesMots: 'les nombres qui marchent', officiel: 'les solutions de l’équation', lesDeux: 'les nombres qui marchent, les solutions de l’équation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 7 et −7 sont les nombres qui marchent dans x² = 49. ' +
          'Les matheux ont un mot pour eux : je te le dirai la prochaine fois.',
        'Les matheux disent : 7 et −7 sont les solutions de l’équation x² = 49. Les nombres qui marchent, ce sont les solutions.',
        'Tu connais le mot officiel : les solutions de x² = a sont √a et −√a quand a est positif. Résoudre une équation, c’est trouver toutes ses solutions.',
      ],
    },

    exercices: [
      {
        id: 'solution-positive',
        univers: 'champetre',
        versions: [16, 25, 36, 64, 81, 100, 121, 144, 9, 4],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          return {
            enonce: 'Le champ carré d’Ibrahim a une aire de ' + a + ' mètres carrés. Résous x² = ' + a + ' et donne la solution qui convient pour le côté.',
            reponse: { type: 'nombre', valeur: Math.sqrt(a) },
            aide: 'Une longueur est positive : c’est √' + a + '.',
            aideParlee: 'Une longueur est positive : prends la racine carrée de l’aire.',
            correction: ['x² = ' + a + ' a pour solutions ' + Math.sqrt(a) + ' et ' + ecr(-Math.sqrt(a)) + '.', 'Le côté est positif : ' + Math.sqrt(a) + ' mètres.'],
          };
        },
      },
      {
        id: 'solution-negative',
        univers: 'famille',
        versions: [9, 16, 25, 36, 49, 64, 81, 100, 121, 144],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          return {
            enonce: 'Donne la solution négative de l’équation x² = ' + a + '.',
            reponse: { type: 'nombre', valeur: -Math.sqrt(a) },
            aide: 'Un nombre négatif au carré donne un nombre positif.',
            correction: ['(' + ecr(-Math.sqrt(a)) + ')² = ' + a + '.', 'La solution négative est ' + ecr(-Math.sqrt(a)) + '.'],
          };
        },
      },
      {
        id: 'combien',
        univers: 'maison-courses',
        versions: [25, -9, 0, 7, -1, 100, -16, 2],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const bonne = a > 0 ? DEUX : a === 0 ? UNE : AUCUNE;
          return {
            enonce: 'Combien de solutions a l’équation x² = ' + ecr(a) + ' ?',
            reponse: O.choix(c.alea, bonne, [DEUX, UNE, AUCUNE]),
            aide: 'Regarde le signe de ' + ecr(a) + ' : un carré n’est jamais négatif.',
            aideParlee: 'Regarde le signe du nombre de droite : un carré n’est jamais négatif.',
            correction: [a > 0 ? ecr(a) + ' est positif : deux solutions, √' + a + ' et −√' + a + '.' : a === 0 ? 'Seul 0 au carré donne 0.' : 'Un carré n’est jamais négatif : aucun nombre ne marche.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'avec-un-ajout',
        univers: 'famille',
        // x² + k = m
        versions: [[5, 30], [4, 40], [10, 59], [7, 71], [11, 47], [3, 84], [20, 120], [6, 150]],
        genere(c) {
          const [k, m] = c.alea.choisir(this.versions);
          const a = m - k;
          return {
            enonce: 'Résous x² + ' + k + ' = ' + m + '. Donne la solution positive.',
            reponse: { type: 'nombre', valeur: Math.sqrt(a) },
            aide: 'Enlève ' + k + ' des deux côtés : x² = ' + a + '.',
            aideParlee: 'Enlève d’abord le nombre ajouté des deux côtés, pour avoir x au carré seul.',
            correction: ['x² = ' + m + ' − ' + k + ' = ' + a + '.', 'Solutions : ' + Math.sqrt(a) + ' et ' + ecr(-Math.sqrt(a)) + '. La solution positive est ' + Math.sqrt(a) + '.'],
          };
        },
      },
      {
        id: 'nappe',
        univers: 'maison-courses',
        // aire d'une nappe carrée en dm² (carré parfait)
        versions: [144, 121, 100, 81, 64, 196, 225, 169],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          return {
            enonce: 'Rebecca coud une nappe carrée de ' + a + ' décimètres carrés. Quelle est la longueur de son côté, en décimètres ?',
            reponse: { type: 'nombre', valeur: Math.sqrt(a) },
            aide: 'Résous x² = ' + a + ' et garde la solution positive.',
            aideParlee: 'Résous x au carré égale l’aire, et garde la solution positive.',
            correction: ['x² = ' + a + ' : x = ' + Math.sqrt(a) + ' ou x = ' + ecr(-Math.sqrt(a)) + '.', 'Une longueur est positive : ' + Math.sqrt(a) + ' décimètres.'],
          };
        },
      },
    ],

    defi: {
      // [k, m] : x² − k = m, avec m + k carré parfait
      versions: [[11, 70], [19, 81], [24, 40], [6, 30], [15, 85], [21, 100]],
      genere(c) {
        const [k, m] = c.alea.choisir(this.versions);
        const a = m + k, r = Math.sqrt(a);
        return {
          enonce: 'Rebecca pense à un nombre. Elle le met au carré, puis enlève ' + k + '. Elle trouve ' + m + '.',
          questions: [
            {
              texte: 'Question 1. Écris l’équation : x² − ' + k + ' = ' + m + '. Combien vaut x² ?',
              reponse: { type: 'nombre', valeur: a },
              aide: 'Ajoute le nombre enlevé des deux côtés.',
              correction: ['x² = ' + m + ' + ' + k + ' = ' + a + '.'],
            },
            {
              texte: 'Question 2. Donne la solution positive de l’équation.',
              reponse: { type: 'nombre', valeur: r },
              aide: 'Prends la racine carrée de x².',
              correction: ['x² = ' + a + ' donne x = ' + r + ' ou x = ' + ecr(-r) + '. La solution positive est ' + r + '.'],
            },
            {
              texte: 'Question 3. Aminata dit : « Rebecca a forcément pensé à ' + r + '. » A-t-elle raison ? Justifie.',
              correction: ['(' + ecr(-r) + ')² − ' + k + ' = ' + a + ' − ' + k + ' = ' + m + ' aussi.', 'Rebecca a pu penser à ' + r + ' ou à ' + ecr(-r) + ' : Aminata a tort.'],
              grille: ['As-tu testé le nombre négatif ' + ecr(-r) + ' ?', 'As-tu dit que l’équation a deux solutions ?', 'As-tu conclu : « Aminata a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais que x² = a a deux solutions quand a est positif, et tu choisis la bonne pour une longueur.',
    carte: ['solution-positive', 'combien', 'avec-un-ajout'],
    papierDuSoir: { exercices: ['avec-un-ajout', 'nappe'], defi: true },
    automatismes: [
      {
        id: 'solution-rapide',
        versions: [36, 49, 64, 81],
        genere(c) { const a = c.alea.choisir(this.versions); return { enonce: 'Solution positive de x² = ' + a + ' ?', reponse: { type: 'nombre', valeur: Math.sqrt(a) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Il y a très longtemps, des tablettes d’argile de Babylone posaient déjà des problèmes de carrés et de rectangles, que l’on résout comme des équations.',
    prenoms: ['Ibrahim', 'Rebecca', 'Aminata'],
  };
});
