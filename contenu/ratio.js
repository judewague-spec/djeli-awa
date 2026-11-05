/* Notion 25 du bloc « Les nombres » (à confirmer, PROGRAMME.md) : ratio et partage selon un ratio. Le riz de Laure et le bénéfice partagé. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { pgcd } = O;
  const r = (a, b) => a + ' : ' + b;

  return {
    id: 'ratio',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Ratio et partage selon un ratio',
    classe: '3e',
    univers: ['cuisine-restaurant', 'commerce', 'famille'],

    accroche: {
      texte: 'Laure fait cuire du riz : pour 1 verre de riz, elle met 2 verres d’eau. Toujours. ' +
        'Et au marché, Rachel et Rebecca ont vendu des pagnes ensemble. Rachel a apporté 2 pagnes, Rebecca 3. ' +
        'Elles gagnent 50 euros. Comment partager de façon juste ?',
      image: { dessin: 'barres', barres: [{ nom: 'Rachel', parts: 2 }, { nom: 'Rebecca', parts: 3 }], description: 'Deux barres : 2 parts pour Rachel, 3 parts pour Rebecca, toutes les parts de même taille.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Rachel', parts: 2 }, { nom: 'Rebecca', parts: 3 }], description: '5 parts en tout : 2 pour Rachel, 3 pour Rebecca.' },
      etapes: [
        'Rachel 2 et Rebecca 3 : on dit qu’elles partagent selon le ratio 2 : 3. On lit « deux pour trois ».',
        'Compte les parts en tout : 2 + 3 = 5 parts.',
        'Une part vaut 50 ÷ 5 = 10 euros.',
        'Rachel reçoit 2 parts : 20 euros. Rebecca reçoit 3 parts : 30 euros. Vérifie : 20 + 30 = 50.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le partage 20 et 30 respecte ' + c.mot('ratio') + ' 2 : 3. L’astuce du partage : additionne 2 et 3 pour savoir combien de parts en tout, ' +
        'trouve la valeur d’une part, puis multiplie. Et 20 : 30, c’est comme 2 : 3 : on simplifie comme une fraction.',
    },

    vocabulaire: {
      termes: {
        ratio: { sesMots: 'la règle du « tant pour tant »', officiel: 'le ratio', lesDeux: 'la règle du « tant pour tant », le ratio,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 1 verre de riz pour 2 verres d’eau, c’est une règle du « tant pour tant ». ' +
          'Les matheux ont un mot pour ça : je te le dirai la prochaine fois.',
        'Les matheux disent : le ratio. 1 : 2 pour le riz et l’eau, 2 : 3 pour Rachel et Rebecca. Notre règle du « tant pour tant », c’est le ratio.',
        'Tu connais le mot officiel : partager selon le ratio 2 : 3, c’est faire 5 parts égales et en donner 2 et 3.',
      ],
    },

    exercices: [
      {
        id: 'eau-du-riz',
        univers: 'cuisine-restaurant',
        // [riz, eau] du ratio, verres de riz
        versions: [[1, 2, 3], [1, 2, 5], [2, 3, 4], [2, 3, 6], [1, 3, 4], [2, 5, 6], [3, 4, 9], [1, 2, 7]],
        genere(c) {
          const [a, b, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour cuire du riz, on suit le ratio riz : eau = ' + r(a, b) + '. Laure met ' + n + ' verres de riz. Combien de verres d’eau ?',
            reponse: { type: 'nombre', valeur: (n * b) / a },
            aide: 'Combien de fois ' + a + ' verre' + (a > 1 ? 's' : '') + ' de riz dans ' + n + ' ? Fais pareil pour l’eau.',
            aideParlee: 'Cherche par combien on multiplie le riz, et fais pareil pour l’eau.',
            correction: [n + ' ÷ ' + a + ' = ' + n / a + ' : on multiplie le ratio par ' + n / a + '.', b + ' × ' + n / a + ' = ' + (n * b) / a + ' verres d’eau.'],
          };
        },
      },
      {
        id: 'partage',
        univers: 'commerce',
        // [a, b, total]
        versions: [[2, 3, 50], [1, 4, 60], [3, 5, 80], [2, 5, 140], [4, 1, 75], [3, 2, 45], [1, 2, 36], [5, 3, 120]],
        genere(c) {
          const [a, b, T] = c.alea.choisir(this.versions);
          const u = T / (a + b);
          return {
            enonce: 'Rachel et Rebecca partagent ' + T + ' euros selon le ratio ' + r(a, b) + '. Combien reçoit Rachel ?',
            reponse: { type: 'nombre', valeur: a * u },
            aide: 'Il y a ' + a + ' + ' + b + ' parts. Une part vaut ' + T + ' ÷ ' + (a + b) + '.',
            aideParlee: 'Ajoute les nombres du ratio pour avoir le nombre de parts, cherche la valeur d’une part, puis multiplie.',
            correction: [a + ' + ' + b + ' = ' + (a + b) + ' parts.', 'Une part : ' + T + ' ÷ ' + (a + b) + ' = ' + u + ' euros.', 'Rachel : ' + a + ' × ' + u + ' = ' + a * u + ' euros.'],
          };
        },
      },
      {
        id: 'nombre-de-parts',
        univers: 'famille',
        versions: [[2, 3], [1, 4], [3, 5], [5, 2], [4, 7], [1, 1], [3, 8], [6, 1]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure partage des bonbons entre Moussa et Aminata selon le ratio ' + r(a, b) + '. En combien de parts égales doit-elle d’abord couper le paquet ?',
            reponse: { type: 'nombre', valeur: a + b },
            aide: 'Ajoute les deux nombres du ratio.',
            correction: [a + ' + ' + b + ' = ' + (a + b) + ' parts.'],
          };
        },
      },
      {
        id: 'simplifier',
        univers: 'commerce',
        versions: [[20, 30], [12, 18], [15, 25], [8, 12], [14, 21], [30, 45], [16, 40], [9, 6]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const g = pgcd(a, b);
          const bonne = r(a / g, b / g);
          return {
            enonce: 'Au marché, Ibrahim vend ' + a + ' mangues pour ' + b + ' avocats. Quel ratio simplifié décrit ce mélange ?',
            reponse: O.choix(c.alea, bonne, [r(a / g * 2, b / g), r(b / g, a / g)]),
            aide: 'Divise les deux nombres par ' + g + ', le plus grand nombre qui les divise tous les deux.',
            aideParlee: 'Divise les deux nombres par le plus grand nombre qui les divise tous les deux, comme pour simplifier une fraction.',
            correction: ['Le plus grand nombre qui divise ' + a + ' et ' + b + ' est ' + g + '.', r(a, b) + ' = ' + bonne + '. Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quantite-manquante',
        univers: 'cuisine-restaurant',
        // ratio a : b, on connaît la seconde quantité q
        versions: [[2, 5, 15], [3, 4, 20], [1, 3, 18], [4, 3, 9], [2, 7, 21], [5, 2, 8]],
        genere(c) {
          const [a, b, q] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour un jus, on mélange gingembre et eau selon le ratio ' + r(a, b) + '. Fatou a ' + q + ' verres d’eau. Combien de verres de gingembre lui faut-il ?',
            reponse: { type: 'nombre', valeur: (q * a) / b },
            aide: 'Par combien faut-il multiplier ' + b + ' pour obtenir ' + q + ' ?',
            aideParlee: 'Cherche par combien on multiplie l’eau du ratio, et fais pareil pour le gingembre.',
            correction: [q + ' ÷ ' + b + ' = ' + q / b + '.', a + ' × ' + q / b + ' = ' + (q * a) / b + ' verres de gingembre.'],
          };
        },
      },
    ],

    defi: {
      // [ratio a : b : c, bénéfice]
      versions: [[2, 3, 5, 500], [1, 2, 3, 360], [3, 4, 5, 600], [2, 2, 1, 250], [1, 3, 4, 400], [4, 5, 6, 750]],
      genere(c) {
        const [a, b, d, T] = c.alea.choisir(this.versions);
        const u = T / (a + b + d);
        return {
          enonce: 'Rachel, Rebecca et Aminata ont monté une petite boutique de pagnes. Elles se partagent un bénéfice de ' + T + ' euros selon le ratio ' + a + ' : ' + b + ' : ' + d + ', ' +
            'dans cet ordre, selon le temps passé par chacune.',
          image: { dessin: 'barres', barres: [{ nom: 'Rachel', parts: a }, { nom: 'Rebecca', parts: b }, { nom: 'Aminata', parts: d }], description: 'Trois barres : ' + O.nb(a, 'part') + ', ' + O.nb(b, 'part') + ' et ' + O.nb(d, 'part') + ' de même taille.' },
          questions: [
            {
              texte: 'Question 1. Combien vaut une part ?',
              reponse: { type: 'nombre', valeur: u },
              aide: 'Ajoute les trois nombres du ratio, puis divise le bénéfice.',
              correction: [a + ' + ' + b + ' + ' + d + ' = ' + (a + b + d) + ' parts.', T + ' ÷ ' + (a + b + d) + ' = ' + u + ' euros par part.'],
            },
            {
              texte: 'Question 2. Combien reçoit Aminata ?',
              reponse: { type: 'nombre', valeur: d * u },
              aide: 'Multiplie la valeur d’une part par le nombre de parts d’Aminata.',
              correction: [d + ' × ' + u + ' = ' + d * u + ' euros.'],
            },
            {
              texte: 'Question 3. Vérifie que le partage est complet : les trois parts font-elles bien ' + T + ' euros ? Écris le calcul.',
              correction: ['Rachel : ' + a * u + ' euros ; Rebecca : ' + b * u + ' euros ; Aminata : ' + d * u + ' euros.', a * u + ' + ' + b * u + ' + ' + d * u + ' = ' + T + ' euros : le partage est complet.'],
              grille: ['As-tu calculé la part de chacune ?', 'As-tu ajouté les trois parts ?', 'As-tu conclu que la somme fait bien ' + T + ' euros ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avec le ratio, tu fais un riz parfait et tu partages un bénéfice de façon juste.',
    carte: ['eau-du-riz', 'partage', 'quantite-manquante'],
    papierDuSoir: { exercices: ['partage', 'quantite-manquante'], defi: true },
    automatismes: [
      {
        id: 'parts-du-ratio',
        versions: [[2, 3, 20], [1, 4, 25], [3, 1, 40], [1, 1, 18]],
        genere(c) { const [a, b, T] = c.alea.choisir(this.versions); return { enonce: 'Partage ' + T + ' selon ' + r(a, b) + ' : combien pour la première part ?', reponse: { type: 'nombre', valeur: (T * a) / (a + b) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte ancienne, on décrivait la pente d’une pyramide par un rapport entre deux longueurs : de combien elle recule quand elle monte.',
    prenoms: ['Laure', 'Rachel', 'Rebecca', 'Moussa', 'Aminata', 'Ibrahim', 'Fatou'],
  };
});
