/* Notion 19 du bloc « Les nombres » : préfixes de nano à giga, ordres de grandeur. La mémoire du téléphone de Moussa. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { puissance: p, ecr } = O;
  const PREFIXES = [['nano', -9], ['micro', -6], ['milli', -3], ['kilo', 3], ['méga', 6], ['giga', 9]];
  const exposant = (nom) => PREFIXES.find(([n]) => n === nom)[1];

  return {
    id: 'prefixes-ordres-grandeur',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Préfixes de nano à giga, ordres de grandeur',
    classe: '4e',
    univers: ['appareils', 'famille', 'dehors'],

    accroche: {
      texte: 'Le téléphone de Moussa affiche : « Mémoire : 64 gigaoctets. Une photo : 3 mégaoctets. » ' +
        'Au collège, sa petite sœur apprend qu’un virus mesure environ 100 nanomètres. Giga, méga, nano… ' +
        'Que veulent dire ces petits mots devant les unités ?',
      image: { dessin: 'echelle', reperes: [{ nom: 'nano', puissance: -9 }, { nom: 'milli', puissance: -3 }, { nom: 'kilo', puissance: 3 }, { nom: 'giga', puissance: 9 }], description: 'Une règle des puissances de 10, de nano à giga : nano, milli, kilo, giga.' },
    },

    manipulation: {
      image: { dessin: 'echelle', reperes: [{ nom: 'un virus', puissance: -7 }, { nom: 'un cheveu', puissance: -4 }, { nom: 'un humain', puissance: 0 }, { nom: 'la Terre', puissance: 7 }], description: 'Quatre objets rangés sur la règle des puissances de 10, en mètres : un virus, un cheveu, un humain, la Terre.' },
      etapes: [
        'Kilo veut dire mille : 10³. Un kilomètre, c’est 1 000 mètres.',
        'Méga veut dire un million, 10⁶. Giga, un milliard, 10⁹.',
        'Vers le petit : milli, 10⁻³ ; micro, 10⁻⁶ ; nano, 10⁻⁹.',
        'L’ordre de grandeur d’un nombre, c’est la puissance de 10 la plus proche. Un humain mesure environ 1 mètre : 10⁰. La Terre, environ 10⁷ mètres.',
      ],
    },

    decouverte: {
      texte: (c) => 'Chacun des mots kilo, méga et nano est ' + c.mot('prefixe') + ' : il remplace une puissance de 10. ' +
        'Giga 10⁹, méga 10⁶, kilo 10³, milli 10⁻³, micro 10⁻⁶, nano 10⁻⁹. L’astuce : de l’un au suivant, on saute de trois zéros. ' +
        'Et pour comparer vite deux objets, on compare leurs ordres de grandeur.',
      // Dite en deux sons, coupés à l'endroit naturel (5 nov. 2026).
      coupeApres: 'il remplace une puissance de 10.',
    },

    vocabulaire: {
      termes: {
        prefixe: { sesMots: 'un petit mot devant l’unité', officiel: 'un préfixe', lesDeux: 'un petit mot devant l’unité, un préfixe' },
      },
      textes: [
        'Pour l’instant, garde tes mots : kilo, méga, giga sont des petits mots devant l’unité. Chacun remplace une puissance de 10. ' +
          'Les matheux ont un mot pour eux : je te le dirai la prochaine fois.',
        'Les matheux disent : un préfixe. Le petit mot devant l’unité, c’est le préfixe. Et la puissance de 10 la plus proche d’un nombre, c’est son ordre de grandeur.',
        'Tu connais les mots officiels : kilo, méga, giga, milli, micro et nano sont des préfixes. L’ordre de grandeur d’un nombre est la puissance de 10 la plus proche.',
      ],
    },

    exercices: [
      {
        id: 'quel-exposant',
        univers: 'appareils',
        versions: PREFIXES.map(([n]) => n),
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const e = exposant(nom);
          return {
            enonce: 'Le préfixe « ' + nom + ' » remplace 10ⁿ. Quel est l’exposant n ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Kilo, c’est 10³ ; on saute de trois en trois.',
            aideParlee: 'Kilo, c’est dix puissance trois. De préfixe en préfixe, on saute de trois.',
            correction: [nom + ' = ' + p(10, e) + '. Réponse : ' + ecr(e) + '.'],
          };
        },
      },
      {
        id: 'quel-prefixe',
        univers: 'dehors',
        versions: PREFIXES.map(([, e]) => e),
        genere(c) {
          const e = c.alea.choisir(this.versions);
          const bonne = PREFIXES.find(([, x]) => x === e)[0];
          const autres = PREFIXES.map(([n]) => n).filter((n) => n !== bonne).slice(0, 3);
          return {
            enonce: 'Quel préfixe remplace ' + p(10, e) + ' ?',
            reponse: O.choix(c.alea, bonne, autres),
            aide: 'Exposant positif : kilo, méga, giga. Exposant négatif : milli, micro, nano.',
            correction: [p(10, e) + ' : c’est « ' + bonne + ' ». Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'convertir',
        univers: 'appareils',
        // [nombre, de, vers]
        versions: [[3, 'giga', 'méga'], [5, 'méga', 'kilo'], [2, 'kilo', ''], [7, 'giga', 'méga'], [9, 'kilo', ''], [12, 'méga', 'kilo'], [8, 'milli', 'micro'], [6, 'micro', 'nano']],
        genere(c) {
          const [n, de, vers] = c.alea.choisir(this.versions);
          const e = exposant(de) - (vers ? exposant(vers) : 0);
          const v = n * 10 ** e;
          const unite = (x) => (x === 'giga' || x === 'méga' || x === 'kilo' ? x + 'octets' : x + 'mètres');
          const u1 = de === 'kilo' && vers !== 'milli' ? 'kilooctets' : unite(de);
          const u2 = vers ? (vers === 'kilo' ? 'kilooctets' : unite(vers)) : 'octets';
          const metres = de === 'milli' || de === 'micro' || (de === 'kilo' && vers === 'milli');
          const a = metres ? de + 'mètres' : u1, b = metres ? vers + 'mètres' : u2;
          return {
            enonce: 'Combien ' + (/^[aeiouéo]/.test(b) ? 'd’' : 'de ') + b + ' y a-t-il dans ' + n + ' ' + a + ' ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'De « ' + de + ' » à « ' + (vers || 'l’unité') + ' », on multiplie par ' + p(10, e) + '.',
            aideParlee: 'Cherche la puissance de 10 qui sépare les deux préfixes, puis multiplie.',
            correction: [de + ' = ' + p(10, exposant(de)) + (vers ? ', ' + vers + ' = ' + p(10, exposant(vers)) : '') + ' : on multiplie par ' + p(10, e) + '.', n + ' × ' + p(10, e) + ' = ' + v + '.'],
          };
        },
      },
      {
        id: 'ordre-de-grandeur',
        univers: 'famille',
        // [objet, taille en mètres écrite, ordre de grandeur]
        versions: [['la taille de Laure', '1,6 m', 0], ['la hauteur d’un immeuble de dix étages', '30 m', 1], ['l’épaisseur d’un cheveu', '0,08 mm', -4], ['la longueur d’une petite fourmi', '1 mm', -3], ['la distance Dakar-Bamako', '1 200 km', 6], ['la longueur d’un terrain de football', '105 m', 2]],
        genere(c) {
          const [objet, taille, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’ordre de grandeur de ' + objet + ' (' + taille + ') est 10ⁿ mètres. Quel est n ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Écris la taille en mètres, puis cherche la puissance de 10 la plus proche.',
            aideParlee: 'Écris la taille en mètres, puis cherche la puissance de 10 la plus proche.',
            correction: [taille + ' : la puissance de 10 la plus proche, en mètres, est ' + p(10, e) + '. Réponse : ' + ecr(e) + '.'],
          };
        },
      },
      {
        id: 'le-plus-petit',
        univers: 'dehors',
        versions: [['un virus', 'un cheveu', 'une fourmi'], ['un grain de sable', 'un chat', 'un immeuble'], ['une cellule', 'un grain de sable', 'un ballon'], ['un atome', 'un virus', 'un cheveu']],
        genere(c) {
          const objets = c.alea.choisir(this.versions);
          return {
            enonce: 'Lequel de ces objets a le plus petit ordre de grandeur ?',
            reponse: O.choix(c.alea, objets[0], objets.slice(1)),
            aide: 'Pense à leur taille réelle : lequel ne se voit pas à l’œil nu ?',
            correction: ['Du plus petit au plus grand : ' + objets.join(', ') + '.', 'Réponse : ' + objets[0] + '.'],
          };
        },
      },
    ],

    defi: {
      // [mémoire du téléphone en gigaoctets, taille d'une photo en mégaoctets]
      versions: [[64, 4], [32, 2], [128, 4], [16, 2], [64, 8], [256, 8]],
      genere(c) {
        const [G, m] = c.alea.choisir(this.versions);
        const mo = G * 1000;
        return {
          enonce: 'Le téléphone de Moussa a une mémoire de ' + G + ' gigaoctets. Une photo prend ' + m + ' mégaoctets. (Un gigaoctet vaut 1 000 mégaoctets.)',
          questions: [
            {
              texte: 'Question 1. Combien de mégaoctets la mémoire contient-elle ?',
              reponse: { type: 'nombre', valeur: mo },
              aide: 'Un gigaoctet vaut 1 000 mégaoctets.',
              correction: [G + ' × 1 000 = ' + mo + ' mégaoctets.'],
            },
            {
              texte: 'Question 2. Combien de photos peut-il garder, au plus ?',
              reponse: { type: 'nombre', valeur: mo / m },
              aide: 'Divise la mémoire en mégaoctets par la taille d’une photo.',
              correction: [mo + ' ÷ ' + m + ' = ' + mo / m + ' photos.'],
            },
            {
              texte: 'Question 3. Aminata dit : « Un gigaoctet, c’est mille fois plus qu’un kilooctet. » A-t-elle raison ? Justifie avec les puissances de 10.',
              correction: ['Giga = 10⁹ = 1 000 000 000 et kilo = 10³ = 1 000.', '1 000 000 000 ÷ 1 000 = 1 000 000 : un gigaoctet vaut un million de kilooctets, pas mille. Aminata a tort.'],
              grille: ['As-tu écrit giga et kilo avec des puissances de 10 ?', 'As-tu divisé un milliard par mille ?', 'As-tu conclu : « Aminata a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! De nano à giga, tu sais ce que veut dire chaque préfixe, et tu ranges le monde du virus à la Terre.',
    carte: ['quel-exposant', 'convertir', 'ordre-de-grandeur'],
    papierDuSoir: { exercices: ['convertir', 'ordre-de-grandeur'], defi: true },
    automatismes: [
      {
        id: 'prefixe-rapide',
        versions: ['kilo', 'méga', 'giga', 'milli'],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' = 10 puissance ?', reponse: { type: 'nombre', valeur: exposant(n) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Les préfixes kilo, méga ou nano sont les mêmes dans le monde entier : le Bureau international des poids et mesures, à Sèvres, près de Paris, les publie.',
    prenoms: ['Moussa', 'Laure', 'Aminata'],
  };
});
