/* Notion 15 du bloc « Les nombres » : puissances de 10, exposant négatif. Du grain de sel à la poussière. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { puissance: p, ecr } = O;
  /** 10⁻ⁿ écrit en nombre décimal : « 0,001 ». */
  const decimal = (n) => '0,' + '0'.repeat(n - 1) + '1';
  const ecrit = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return {
    id: 'puissances-10-negatives',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Puissances de 10, exposant négatif',
    classe: '4e',
    univers: ['cuisine-restaurant', 'coiffure', 'appareils'],

    accroche: {
      texte: 'Dans la cuisine, Fatou regarde un grain de sel à la loupe : il mesure environ un millimètre. ' +
        'Un cheveu est encore plus fin, et un grain de poussière, plus fin encore. ' +
        'À chaque fois, c’est comme diviser par dix. Comment écrire ces nombres tout petits ?',
      image: { dessin: 'echelle', reperes: [{ nom: 'un mètre', puissance: 0 }, { nom: 'un millimètre', puissance: -3 }, { nom: 'un cheveu', puissance: -4 }], description: 'Une règle des puissances de 10 vers le tout petit : un mètre, un millimètre, l’épaisseur d’un cheveu.' },
    },

    manipulation: {
      image: { dessin: 'echelle', reperes: [{ nom: '1', puissance: 0 }, { nom: '0,1', puissance: -1 }, { nom: '0,01', puissance: -2 }, { nom: '0,001', puissance: -3 }], description: 'La règle vers le petit : chaque cran divise par 10.' },
      etapes: [
        'Un mètre divisé par 10 : 0,1 mètre, c’est un décimètre. On écrit 10⁻¹ = 1/10 = 0,1.',
        'Divisé encore par 10 : 0,01 mètre, un centimètre. On écrit 10⁻² = 1/100 = 0,01.',
        'Encore par 10 : 0,001 mètre, un millimètre. 10⁻³ = 1/1 000 = 0,001.',
        'Regarde le chiffre 1 : dans 10⁻³, il est au troisième rang après la virgule.',
      ],
    },

    decouverte: {
      texte: (c) => '10⁻³ = 1/1 000 = 0,001. Un signe moins dans ' + c.mot('exposant') + ', c’est « un divisé par ». ' +
        'L’astuce : pour 10⁻ⁿ, le chiffre 1 se trouve au rang n après la virgule. Et 10⁰ = 1 : on n’a ni multiplié ni divisé.',
    },

    vocabulaire: {
      termes: {
        exposant: { sesMots: 'le petit nombre en haut', officiel: 'l’exposant', lesDeux: 'le petit nombre en haut, que les matheux appellent l’exposant' },
      },
      textes: [
        'Pour l’instant, garde tes mots : quand le petit nombre en haut est négatif, on divise par 10 au lieu de multiplier. ' +
          'Je te redonnerai le mot des matheux la prochaine fois.',
        'Les matheux disent : 10⁻³ est une puissance de 10 d’exposant négatif. Le petit nombre en haut, c’est l’exposant, et ici il vaut moins trois.',
        'Tu connais le mot officiel : une puissance de 10 d’exposant négatif, comme 10⁻³, est l’inverse de 10³. On lit « dix puissance moins trois ».',
      ],
    },

    exercices: [
      {
        id: 'en-fraction',
        univers: 'cuisine-restaurant',
        versions: [1, 2, 3, 4, 5, 6],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Écris ' + p(10, -n) + ' sous forme de fraction, par exemple 1/10.',
            reponse: { type: 'fraction', valeur: [1, 10 ** n] },
            aide: 'C’est un divisé par ' + p(10, n) + '.',
            aideParlee: 'Un exposant négatif, c’est un divisé par la puissance de 10 positive.',
            correction: [p(10, -n) + ' = 1/' + p(10, n) + ' = 1/' + (10 ** n) + '.'],
          };
        },
      },
      {
        id: 'trouver-exposant',
        univers: 'appareils',
        versions: [1, 2, 3, 4, 5, 6],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Le nombre ' + decimal(n) + ' s’écrit 10ⁿ. Quel est l’exposant n ? (N’oublie pas le signe moins.)',
            reponse: { type: 'nombre', valeur: -n },
            aide: 'Le 1 est au rang ' + n + ' après la virgule.',
            aideParlee: 'Regarde à quel rang se trouve le chiffre 1 après la virgule, et mets un signe moins.',
            correction: ['Le chiffre 1 est au rang ' + n + ' après la virgule : ' + decimal(n) + ' = ' + p(10, -n) + '.', 'Réponse : ' + ecr(-n) + '.'],
          };
        },
      },
      {
        id: 'rang-du-un',
        univers: 'coiffure',
        versions: [2, 3, 4, 5, 6, 7],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Quand on écrit ' + p(10, -n) + ' avec une virgule, combien y a-t-il de chiffres après la virgule ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Avec l’exposant moins ' + n + ', le 1 est au rang ' + n + '.',
            aideParlee: 'Pour un exposant négatif, le chiffre 1 est au rang donné par l’exposant, sans le signe.',
            correction: [p(10, -n) + ' = ' + decimal(n) + ' : ' + n + ' chiffres après la virgule.'],
          };
        },
      },
      {
        id: 'en-decimal',
        univers: 'cuisine-restaurant',
        versions: [1, 2, 3, 4],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const options = [1, 2, 3, 4, 5].filter((k) => Math.abs(k - n) <= 2).slice(0, 3).map(decimal);
          return {
            enonce: 'Sur la balance de la cuisine, Laure lit ' + p(10, -n) + ' kilo. Quel nombre décimal est-ce ?',
            reponse: O.choix(c.alea, decimal(n), options),
            aide: 'Le 1 doit être au rang ' + n + ' après la virgule.',
            aideParlee: 'Place le chiffre 1 au bon rang après la virgule, comme le dit l’exposant.',
            correction: [p(10, -n) + ' = ' + decimal(n) + '. Réponse : ' + decimal(n) + '.'],
          };
        },
      },
      {
        id: 'diviser',
        univers: 'appareils',
        versions: [[3, 1], [5, 2], [12, 1], [7, 2], [45, 1], [8, 2]],
        genere(c) {
          const [a, n] = c.alea.choisir(this.versions);
          const v = a / 10 ** n;
          return {
            enonce: 'Calcule : ' + a + ' × ' + p(10, -n) + '. Donne un nombre décimal.',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Multiplier par ' + p(10, -n) + ', c’est diviser par ' + 10 ** n + '.',
            aideParlee: 'Multiplier par une puissance de 10 d’exposant négatif, c’est diviser par 10 autant de fois.',
            correction: [a + ' × ' + p(10, -n) + ' = ' + a + ' ÷ ' + ecrit(10 ** n) + ' = ' + ecr(v) + '.'],
          };
        },
      },
    ],

    defi: {
      // [exposant de la taille du grain, exposant de la taille de la poussière]
      versions: [[-3, -5], [-2, -4], [-3, -6], [-1, -4], [-2, -5], [-4, -6]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Dans un laboratoire, on mesure un grain de sable : ' + p(10, a) + ' mètre. Puis un grain de poussière : ' + p(10, b) + ' mètre.',
          image: { dessin: 'echelle', reperes: [{ nom: 'grain de sable', puissance: a }, { nom: 'poussière', puissance: b }], description: 'Une règle des puissances de 10 : le grain de sable et, plus petit, le grain de poussière.' },
          questions: [
            {
              texte: 'Question 1. Écris la taille du grain de sable sous forme de fraction.',
              reponse: { type: 'fraction', valeur: [1, 10 ** -a] },
              aide: 'Un exposant négatif, c’est un divisé par.',
              correction: [p(10, a) + ' = 1/' + 10 ** -a + '.'],
            },
            {
              texte: 'Question 2. Combien de fois le grain de sable est-il plus grand que le grain de poussière ?',
              reponse: { type: 'nombre', valeur: 10 ** (a - b) },
              aide: 'Compte les crans de dix entre les deux tailles.',
              correction: ['De ' + p(10, b) + ' à ' + p(10, a) + ', il y a ' + (a - b) + ' crans de dix.', 'Le grain de sable est ' + 10 ** (a - b) + ' fois plus grand.'],
            },
            {
              texte: 'Question 3. Fatou dit : « ' + p(10, -2) + ' est un nombre négatif. » A-t-elle raison ? Justifie.',
              correction: [p(10, -2) + ' = 1/100 = 0,01.', 'C’est un nombre positif, plus petit que 1 : Fatou a tort. Le signe moins est dans l’exposant, pas devant le nombre.'],
              grille: ['As-tu écrit ' + p(10, -2) + ' en fraction ou en décimal ?', 'As-tu dit que ce nombre est positif ?', 'As-tu conclu : « Fatou a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le signe moins dans l’exposant ne te piège plus : tu écris le tout petit aussi bien que le très grand.',
    carte: ['en-fraction', 'trouver-exposant', 'diviser'],
    papierDuSoir: { exercices: ['en-fraction', 'diviser'], defi: true },
    automatismes: [
      {
        id: 'exposant-du-decimal',
        versions: [1, 2, 3],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: decimal(n) + ' = 10 puissance ?', reponse: { type: 'nombre', valeur: -n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Afrique, de la Côte d’Ivoire à l’Éthiopie, pousse une plante aux baies bleues sans aucun pigment bleu : leur couleur vient de fibres larges d’environ cinq milliardièmes de mètre.',
    prenoms: ['Fatou', 'Laure'],
  };
});
