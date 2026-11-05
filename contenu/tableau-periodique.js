/* Notion 12 du bloc physique-chimie « La matière » : le tableau périodique. L'affiche de la classe de Rebecca. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  // Les 18 premiers éléments : [nom, symbole, numéro atomique].
  const E = [['hydrogène', 'H', 1], ['hélium', 'He', 2], ['lithium', 'Li', 3], ['béryllium', 'Be', 4], ['bore', 'B', 5], ['carbone', 'C', 6], ['azote', 'N', 7], ['oxygène', 'O', 8], ['fluor', 'F', 9], ['néon', 'Ne', 10],
    ['sodium', 'Na', 11], ['magnésium', 'Mg', 12], ['aluminium', 'Al', 13], ['silicium', 'Si', 14], ['phosphore', 'P', 15], ['soufre', 'S', 16], ['chlore', 'Cl', 17], ['argon', 'Ar', 18]];
  const par = (nom) => E.find(([n]) => n === nom);
  const ligne = (z) => (z <= 2 ? 1 : z <= 10 ? 2 : 3);
  const le = (nom) => (/^[aeiouh]/.test(nom) ? 'l’' : 'le ') + nom;
  const du = (nom) => (/^[aeiouh]/.test(nom) ? 'de l’' : 'du ') + nom;
  const TABLEAU = { dessin: 'tableau', description: 'Le début du tableau périodique, en trois lignes : de l’hydrogène, numéro 1, à l’argon, numéro 18. Chaque case donne le numéro atomique et le symbole.' };
  // Paires d'éléments d'une même colonne.
  const COLONNES = [['lithium', 'sodium'], ['béryllium', 'magnésium'], ['bore', 'aluminium'], ['carbone', 'silicium'], ['azote', 'phosphore'], ['oxygène', 'soufre'], ['fluor', 'chlore'], ['néon', 'argon']];

  return {
    id: 'tableau-periodique',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Le tableau périodique',
    classe: '4e',
    univers: ['famille', 'cuisine-restaurant', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : éléments chimiques, tableau périodique.',

    accroche: {
      texte: 'Dans la classe de Rebecca, une grande affiche couvre le mur : des cases avec des lettres, H, O, C, Na… et un numéro dans chaque case. ' +
        'C’est le tableau périodique. On y trouve toutes les sortes d’atomes connues, rangées comme les maisons d’une rue. Comment le lire ?',
      image: TABLEAU,
    },

    manipulation: {
      image: Object.assign({ surligne: 'O' }, TABLEAU, { description: 'Le début du tableau périodique ; la case de l’oxygène, numéro 8, symbole O, est encadrée.' }),
      etapes: [
        'Chaque case est un élément : une sorte d’atome. Dans la case, une ou deux lettres : le symbole. O pour l’oxygène, Na pour le sodium.',
        'Le petit nombre en haut de la case est le numéro de l’élément. Pour l’oxygène, c’est 8.',
        'Les éléments sont rangés par numéro croissant, ligne après ligne : 1 et 2 sur la première ligne, de 3 à 10 sur la deuxième, de 11 à 18 sur la troisième.',
        'Les éléments d’une même colonne se ressemblent : le lithium et le sodium, l’oxygène et le soufre.',
      ],
    },

    decouverte: {
      texte: (c) => 'Chaque élément a un symbole et un numéro, qu’on appelle ' + c.mot('numero') + '. ' +
        'On les range par numéro croissant ; les éléments d’une même colonne forment une famille aux propriétés proches. ' +
        'L’astuce : le symbole commence toujours par une majuscule ; s’il a deux lettres, la seconde est une minuscule, comme Na ou Cl.',
    },

    vocabulaire: {
      termes: {
        numero: { sesMots: 'le numéro de la case', officiel: 'le numéro atomique', lesDeux: 'le numéro de la case, que les scientifiques appellent le numéro atomique' },
      },
      textes: [
        'Pour l’instant, garde tes mots : chaque case a des lettres et un numéro de case. Les cases sont rangées par numéro. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : chaque case est un élément chimique, avec son symbole et son numéro atomique. Le grand tableau s’appelle la classification périodique.',
        'Tu connais les mots officiels : élément, symbole, numéro atomique. Dans le tableau périodique, les éléments sont rangés par numéro atomique croissant.',
      ],
    },

    exercices: [
      {
        id: 'numero-atomique',
        univers: 'famille',
        versions: ['carbone', 'oxygène', 'azote', 'sodium', 'chlore', 'aluminium', 'soufre', 'néon'],
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const [, s, z] = par(nom);
          return {
            enonce: 'Avec le tableau, trouve le numéro atomique ' + du(nom) + ', de symbole ' + s + '.',
            image: TABLEAU,
            reponse: { type: 'nombre', valeur: z },
            aide: 'Cherche la case du symbole ' + s + ', puis lis le petit nombre en haut.',
            aideParlee: 'Cherche la case de ce symbole, puis lis le petit nombre en haut de la case.',
            correction: ['La case ' + s + ' porte le numéro ' + z + '. Réponse : ' + z + '.'],
          };
        },
      },
      {
        id: 'symbole',
        univers: 'cuisine-restaurant',
        versions: ['sodium', 'chlore', 'carbone', 'azote', 'magnésium', 'hydrogène', 'soufre', 'hélium'],
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const bonne = par(nom)[1];
          const pieges = { sodium: ['S', 'So'], chlore: ['C', 'Ch'], carbone: ['Ca', 'Cr'], azote: ['A', 'Az'], magnésium: ['M', 'Ma'], hydrogène: ['Hy', 'He'], soufre: ['So', 'Sf'], hélium: ['H', 'Hl'] }[nom];
          return {
            enonce: 'Quel est le symbole ' + du(nom) + ' ?',
            image: TABLEAU,
            reponse: O.choix(c.alea, bonne, pieges),
            aide: 'Lis le tableau : le symbole ne vient pas toujours du nom français.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'element-du-numero',
        univers: 'maison-courses',
        versions: [1, 6, 7, 8, 11, 13, 17, 18],
        genere(c) {
          const z = c.alea.choisir(this.versions);
          const [nom] = E.find(([, , x]) => x === z);
          const autres = E.filter(([, , x]) => Math.abs(x - z) === 1).map(([n]) => n);
          return {
            enonce: 'Quel élément porte le numéro atomique ' + z + ' ?',
            image: TABLEAU,
            reponse: O.choix(c.alea, nom, autres),
            aide: 'Compte les cases dans l’ordre, ligne après ligne.',
            correction: ['La case numéro ' + z + ' est celle ' + du(nom) + '. Réponse : ' + nom + '.'],
          };
        },
      },
      {
        id: 'meme-colonne',
        univers: 'famille',
        versions: COLONNES.map(([a]) => a),
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const b = COLONNES.find(([x]) => x === a)[1];
          const za = par(a)[2];
          const autres = E.filter(([n, , z]) => n !== b && Math.abs(z - za) === 1).map(([n]) => n).slice(0, 2);
          return {
            enonce: 'Quel élément est dans la même colonne que ' + le(a) + ', juste en dessous ?',
            image: TABLEAU,
            reponse: O.choix(c.alea, b, autres),
            aide: 'Trouve la case ' + du(a) + ', puis descends d’une ligne.',
            aideParlee: 'Trouve la case de cet élément, puis descends d’une ligne dans la même colonne.',
            correction: ['Sous ' + le(a) + ' se trouve ' + le(b) + '. Réponse : ' + b + '.'],
          };
        },
      },
      {
        id: 'quelle-ligne',
        univers: 'maison-courses',
        versions: ['hydrogène', 'lithium', 'oxygène', 'sodium', 'argon', 'hélium', 'carbone', 'phosphore'],
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const z = par(nom)[2];
          return {
            enonce: 'Sur quelle ligne du tableau se trouve ' + le(nom) + ' ?',
            image: TABLEAU,
            reponse: { type: 'nombre', valeur: ligne(z) },
            aide: 'Ligne 1 : numéros 1 et 2. Ligne 2 : de 3 à 10. Ligne 3 : de 11 à 18.',
            correction: ['Numéro atomique ' + z + ' : ligne ' + ligne(z) + '.'],
          };
        },
      },
    ],

    defi: {
      versions: ['oxygène', 'carbone', 'azote', 'chlore', 'sodium', 'magnésium'],
      genere(c) {
        const nom = c.alea.choisir(this.versions);
        const [, s, z] = par(nom);
        const colonne = COLONNES.find((p) => p.includes(nom));
        const voisin = colonne ? colonne.find((x) => x !== nom) : null;
        return {
          enonce: 'Rachel aide Rebecca à réviser. Elle pointe la case ' + du(nom) + ' sur l’affiche du tableau périodique.',
          image: Object.assign({ surligne: s }, TABLEAU, { description: 'Le début du tableau périodique ; la case ' + s + ' est encadrée.' }),
          questions: [
            {
              texte: 'Question 1. Quel est le numéro atomique ' + du(nom) + ' ?',
              reponse: { type: 'nombre', valeur: z },
              aide: 'Lis le petit nombre en haut de la case encadrée.',
              correction: ['Réponse : ' + z + '.'],
            },
            {
              texte: 'Question 2. Sur quelle ligne se trouve-t-il ?',
              reponse: { type: 'nombre', valeur: ligne(z) },
              aide: 'Ligne 1 : numéros 1 et 2. Ligne 2 : de 3 à 10. Ligne 3 : de 11 à 18.',
              correction: ['Numéro ' + z + ' : ligne ' + ligne(z) + '.'],
            },
            {
              texte: 'Question 3. Explique comment les éléments sont rangés dans le tableau, et ce qu’ont en commun ' + le(nom) + ' et ' + le(voisin) + '.',
              correction: ['Les éléments sont rangés par numéro atomique croissant, ligne après ligne.', le(nom).replace(/^./, (x) => x.toUpperCase()) + ' et ' + le(voisin) + ' sont dans la même colonne : ils ont des propriétés chimiques proches.'],
              grille: ['As-tu parlé du rangement par numéro atomique croissant ?', 'As-tu dit qu’ils sont dans la même colonne ?', 'As-tu dit que les éléments d’une même colonne se ressemblent ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le tableau périodique n’est plus une affiche mystérieuse : tu sais y lire les symboles et les numéros.',
    carte: ['numero-atomique', 'symbole', 'element-du-numero'],
    papierDuSoir: { exercices: ['meme-colonne', 'quelle-ligne'], defi: true },
    automatismes: [
      {
        id: 'symbole-rapide',
        versions: ['carbone', 'oxygène', 'hydrogène', 'azote'],
        genere(c) { const nom = c.alea.choisir(this.versions); const s = par(nom)[1]; return { enonce: 'Symbole ' + du(nom) + ' ?', reponse: O.choix(c.alea, s, E.filter(([n]) => n !== nom).slice(0, 2).map(([, x]) => x)) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le chimiste russe Dmitri Mendeleïev a rangé les éléments dans un tableau, en laissant des cases vides pour des éléments encore inconnus.',
    prenoms: ['Rebecca', 'Rachel'],
  };
});
