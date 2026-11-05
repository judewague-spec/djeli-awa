/* Notion 18 du bloc « Les nombres » : notation scientifique. Du Soleil au virus. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { puissance: p, ecr } = O;
  const sci = (a, n) => ecr(a) + ' × ' + p(10, n);
  /** Le nombre a × 10ⁿ écrit en entier ou en décimal (a a au plus deux décimales). */
  function enEntier(a, n) {
    const [ent, dec = ''] = String(a).split('.');
    const chiffres = ent + dec;
    const virgule = ent.length + n; // position de la virgule dans « chiffres »
    if (virgule >= chiffres.length) return (chiffres + '0'.repeat(virgule - chiffres.length)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    if (virgule <= 0) return '0,' + '0'.repeat(-virgule) + chiffres;
    return chiffres.slice(0, virgule) + ',' + chiffres.slice(virgule);
  }

  return {
    id: 'notation-scientifique',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Notation scientifique',
    classe: '4e',
    univers: ['dehors', 'famille', 'appareils'],

    accroche: {
      texte: 'Le soir, Rachel et Laure regardent le ciel. La Terre est à environ 150 millions de kilomètres du Soleil. ' +
        'Et un virus mesure environ un dix-millième de millimètre ! Les savants ont une écriture courte pour les très grands et les très petits nombres. ' +
        'La voici.',
      image: { dessin: 'echelle', reperes: [{ nom: 'un virus, en mètres', puissance: -7 }, { nom: 'un humain', puissance: 0 }, { nom: 'Terre-Soleil', puissance: 11 }], description: 'Une règle des puissances de 10 : un virus, un humain, la distance de la Terre au Soleil, en mètres.' },
    },

    manipulation: {
      image: { dessin: 'echelle', reperes: [{ nom: '1,5', puissance: 0 }, { nom: '150 000 000', puissance: 8 }], description: 'De 1,5 à 150 millions : on décale la virgule de 8 rangs.' },
      etapes: [
        '150 000 000 km. On veut un seul chiffre avant la virgule, pas zéro : 1,5.',
        'De 1,5 à 150 000 000, la virgule avance de 8 rangs vers la droite : on multiplie par 10⁸.',
        'Donc 150 000 000 = 1,5 × 10⁸.',
        'Pour un tout petit nombre, la virgule recule : 0,0003 = 3 × 10⁻⁴.',
      ],
    },

    decouverte: {
      texte: (c) => '1,5 × 10⁸ est ' + c.mot('notation') + ' de 150 000 000. Elle a deux morceaux : un nombre entre 1 et 10, sans compter 10, et une puissance de 10. ' +
        'L’astuce : compte de combien de rangs tu déplaces la virgule. Vers la droite pour un grand nombre, l’exposant est positif ; ' +
        'pour un nombre plus petit que 1, il est négatif.',
    },

    vocabulaire: {
      termes: {
        notation: { sesMots: 'l’écriture courte des savants', officiel: 'la notation scientifique', lesDeux: 'l’écriture courte des savants, la notation scientifique,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 1,5 × 10⁸, c’est l’écriture courte des savants. Un chiffre avant la virgule, puis une puissance de 10. ' +
          'Les matheux lui ont donné un nom : je te le dirai la prochaine fois.',
        'Les matheux disent : la notation scientifique. C’est notre écriture courte des savants : a × 10ⁿ, avec a au moins égal à 1 et plus petit que 10.',
        'Tu connais le nom officiel : la notation scientifique d’un nombre s’écrit a × 10ⁿ, avec 1 ≤ a < 10 et n un nombre entier relatif.',
      ],
    },

    exercices: [
      {
        id: 'exposant-grand',
        univers: 'dehors',
        versions: [[1.5, 8], [3, 5], [4.2, 6], [7, 3], [2.5, 7], [6, 4], [9.1, 5], [1.2, 9]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'En notation scientifique, ' + enEntier(a, n) + ' s’écrit ' + ecr(a) + ' × 10ⁿ. Quel est l’exposant n ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Compte de combien de rangs la virgule avance de ' + ecr(a) + ' à ' + enEntier(a, n) + '.',
            aideParlee: 'Compte de combien de rangs la virgule doit avancer pour passer du petit nombre au grand.',
            correction: [enEntier(a, n) + ' = ' + sci(a, n) + ' : la virgule avance de ' + n + ' rangs. Réponse : ' + n + '.'],
          };
        },
      },
      {
        id: 'exposant-petit',
        univers: 'famille',
        versions: [[3, -4], [2.5, -3], [7, -2], [1.2, -5], [4, -6], [8.5, -3], [5, -7], [6.1, -2]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'En notation scientifique, ' + enEntier(a, n) + ' s’écrit ' + ecr(a) + ' × 10ⁿ. Quel est l’exposant n ? (N’oublie pas le signe.)',
            reponse: { type: 'nombre', valeur: n },
            aide: 'La virgule recule de ' + -n + ' rangs : l’exposant est négatif.',
            aideParlee: 'Pour un nombre plus petit que 1, la virgule recule : l’exposant est négatif.',
            correction: [enEntier(a, n) + ' = ' + sci(a, n) + '. Réponse : ' + ecr(n) + '.'],
          };
        },
      },
      {
        id: 'premier-morceau',
        univers: 'appareils',
        versions: [[4.5, 6], [2, 4], [7.25, 5], [3.8, 3], [1.6, 7], [9, 8], [5.5, 4], [2.75, 6]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un téléphone a coûté au total ' + enEntier(a, n) + ' euros de fabrication à l’usine. En notation scientifique, c’est a × ' + p(10, n) + '. Quel est a ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'a doit avoir un seul chiffre avant la virgule, et ce chiffre n’est pas 0.',
            correction: [enEntier(a, n) + ' = ' + sci(a, n) + '. Réponse : a = ' + ecr(a) + '.'],
          };
        },
      },
      {
        id: 'bonne-ecriture',
        univers: 'dehors',
        versions: [[3.4, 5], [1.2, 6], [5, -3], [7.5, 4], [2.1, -4], [6, 7]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          const bonne = sci(a, n);
          const pieges = [ecr(Math.round(a * 100) / 10) + ' × ' + p(10, n - 1), ecr(Math.round(a * 1000) / 10000) + ' × ' + p(10, n + 1)];
          return {
            enonce: 'Laquelle de ces écritures est la notation scientifique de ' + enEntier(a, n) + ' ?',
            reponse: O.choix(c.alea, bonne, pieges),
            aide: 'Le premier nombre doit être entre 1 et 10.',
            aideParlee: 'En notation scientifique, le premier nombre est au moins égal à 1 et plus petit que 10.',
            correction: ['Les trois écritures valent ' + enEntier(a, n) + ', mais une seule commence par un nombre entre 1 et 10.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'en-entier',
        univers: 'appareils',
        versions: [[2, 3], [4.5, 2], [3, 4], [1.25, 3], [7, 2], [6.5, 3]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          const v = Math.round(a * 10 ** n);
          return {
            enonce: 'Écris ' + sci(a, n) + ' en entier.',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Déplace la virgule de ' + n + ' rangs vers la droite.',
            aideParlee: 'Déplace la virgule vers la droite d’autant de rangs que l’exposant.',
            correction: [sci(a, n) + ' = ' + enEntier(a, n) + '. Réponse : ' + v + '.'],
          };
        },
      },
    ],

    defi: {
      // [distance Terre-Soleil a × 10^n km, vitesse de la lumière 3 × 10^5 km/s]
      versions: [[1.5, 8], [9, 7], [2.4, 8], [7.5, 7], [6, 7], [4.5, 8]],
      genere(c) {
        const [a, n] = c.alea.choisir(this.versions);
        const t = Math.round((a * 10 ** n) / (3 * 10 ** 5));
        return {
          enonce: 'Une étoile se trouve à ' + enEntier(a, n) + ' km d’une planète. La lumière parcourt environ 300 000 km chaque seconde.',
          questions: [
            {
              texte: 'Question 1. Écris la distance en notation scientifique, a × 10ⁿ. Quel est l’exposant n ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Compte de combien de rangs la virgule avance.',
              correction: [enEntier(a, n) + ' = ' + sci(a, n) + '. Réponse : ' + n + '.'],
            },
            {
              texte: 'Question 2. Combien de secondes la lumière met-elle pour faire ce trajet ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Divise la distance par la distance parcourue en une seconde.',
              correction: [enEntier(a, n) + ' ÷ 300 000 = ' + t + ' secondes.'],
            },
            {
              texte: 'Question 3. Esther écrit la distance « ' + ecr(a * 10) + ' × ' + p(10, n - 1) + ' ». Est-ce une notation scientifique ? Justifie.',
              correction: [ecr(a * 10) + ' × ' + p(10, n - 1) + ' vaut bien ' + enEntier(a, n) + '.', 'Mais ' + ecr(a * 10) + ' n’est pas entre 1 et 10 : ce n’est pas une notation scientifique.'],
              grille: ['As-tu vérifié que l’écriture vaut bien la distance ?', 'As-tu regardé si le premier nombre est entre 1 et 10 ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Du Soleil au virus, tu écris les nombres géants et minuscules comme les savants.',
    carte: ['exposant-grand', 'exposant-petit', 'premier-morceau'],
    papierDuSoir: { exercices: ['exposant-petit', 'en-entier'], defi: true },
    automatismes: [
      {
        id: 'exposant-rapide',
        versions: [[3, 4], [5, 3], [2, 6], [7, -3], [4, -2]],
        genere(c) { const [a, n] = c.alea.choisir(this.versions); return { enonce: enEntier(a, n) + ' = ' + a + ' × 10 puissance ?', reponse: { type: 'nombre', valeur: n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 1676, le Danois Ole Rømer a montré que la lumière met du temps pour voyager : celle du Soleil met un peu plus de huit minutes pour arriver jusqu’à la Terre.',
    prenoms: ['Rachel', 'Laure', 'Esther'],
  };
});
