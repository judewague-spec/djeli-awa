/* Notion 3 du bloc « Les nombres » : nombres relatifs, addition et soustraction. Le thermomètre de Laure. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr, par } = O;
  const deg = (t) => ecr(t) + ' °C';

  return {
    id: 'relatifs-addition',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Nombres relatifs : addition et soustraction',
    classe: '4e',
    univers: ['maison-courses', 'famille', 'champetre'],

    accroche: {
      texte: 'Laure, la maman de Rachel, habite dans le nord de la France. Ce matin d’hiver, le thermomètre du balcon montre 4 degrés ' +
        'au-dessous de zéro. À midi, le soleil a réchauffé l’air : il fait 7 degrés de plus. Quelle température fait-il à midi ?',
      image: { dessin: 'thermometre', min: -10, max: 10, valeur: -4, depart: -4, description: 'Un thermomètre gradué de −10 à +10 degrés. Le liquide s’arrête à 4 degrés au-dessous de zéro.' },
    },

    manipulation: {
      type: 'thermometre',
      min: -10,
      max: 10,
      depart: -4,
      cible: 3,
      consigne: 'Le thermomètre montre 4 degrés au-dessous de zéro. D’ici midi, la température monte de 7 degrés. ' +
        'Fais monter le liquide de 7 degrés, en comptant un par un, puis valide. Tu peux toucher le tube ou utiliser les boutons.',
    },

    decouverte: {
      texte: (c) => 'Le liquide est passé par zéro : de 4 au-dessous à 3 au-dessus. On écrit : −4 + 7 = 3. ' +
        '−4 est ' + c.mot('negatif') + ', et 3 est ' + c.mot('positif') + '. ' +
        'L’astuce : ajouter, c’est monter ; ajouter un nombre au-dessous de zéro, c’est descendre. Et soustraire un nombre au-dessous de zéro, c’est monter : ' +
        '2 − (−3) = 2 + 3 = 5. Enlever du froid, ça réchauffe !',
      image: { dessin: 'thermometre', min: -10, max: 10, valeur: 3, depart: -4, description: 'Le thermomètre est monté de 4 degrés au-dessous de zéro jusqu’à 3 degrés au-dessus.' },
    },

    vocabulaire: {
      termes: {
        negatif: { sesMots: 'un nombre au-dessous de zéro', officiel: 'un nombre négatif', lesDeux: 'un nombre au-dessous de zéro, un nombre négatif' },
        positif: { sesMots: 'un nombre au-dessus de zéro', officiel: 'un nombre positif', lesDeux: 'un nombre au-dessus de zéro, un nombre positif' },
      },
      textes: [
        'Pour l’instant, garde tes mots : −4 est un nombre au-dessous de zéro, avec son signe moins. 3 est un nombre au-dessus de zéro. ' +
          'Les matheux ont leurs mots : je te les dirai la prochaine fois.',
        'Les matheux disent : −4 est un nombre négatif, 3 est un nombre positif. Et tous ces nombres avec leur signe, ils les appellent des nombres relatifs. ' +
          'Négatif, au-dessous de zéro ; positif, au-dessus.',
        'Tu connais les mots officiels : les nombres relatifs sont positifs ou négatifs. −4 est négatif, 3 est positif, et zéro est les deux à la fois.',
      ],
    },

    exercices: [
      {
        id: 'temperature-midi',
        univers: 'maison-courses',
        // [température du matin, degrés gagnés]
        versions: [[-5, 8], [-3, 9], [-7, 4], [-6, 6], [-2, 11], [-8, 3], [-4, 10], [-9, 5], [-1, 7], [-6, 13]],
        genere(c) {
          const [t, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'Ce matin, il fait ' + deg(t) + '. À midi, la température a monté de ' + m + ' degrés. Quelle température fait-il à midi ? (Écris le signe moins s’il le faut, par exemple -2.)',
            reponse: { type: 'nombre', valeur: t + m },
            aide: 'Pars de ' + ecr(t) + ' et monte de ' + m + ' : compte en passant par zéro.',
            aideParlee: 'Pars de la température du matin et monte un degré à la fois, en passant par zéro.',
            correction: [ecr(t) + ' + ' + m + ' = ' + ecr(t + m) + '.', 'À midi, il fait ' + deg(t + m) + '.'],
          };
        },
      },
      {
        id: 'temperature-nuit',
        univers: 'champetre',
        // [température du soir, degrés perdus]
        versions: [[3, 7], [5, 9], [2, 6], [1, 8], [4, 4], [6, 10], [0, 5], [-2, 3], [-1, 6], [7, 12]],
        genere(c) {
          const [t, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au potager, ce soir, il fait ' + deg(t) + '. Pendant la nuit, la température baisse de ' + d + ' degrés. Quelle température fera-t-il au petit matin ?',
            reponse: { type: 'nombre', valeur: t - d },
            aide: 'Pars de ' + ecr(t) + ' et descends de ' + d + '.',
            aideParlee: 'Pars de la température du soir et descends un degré à la fois.',
            correction: [ecr(t) + ' − ' + d + ' = ' + ecr(t - d) + '.', 'Au petit matin, il fera ' + deg(t - d) + '.'],
          };
        },
      },
      {
        id: 'compte',
        univers: 'famille',
        // [solde du compte, dépense]
        versions: [[40, 65], [25, 60], [100, 130], [15, 50], [-20, 35], [-10, 45], [70, 85], [30, 90], [-35, 15], [5, 40]],
        genere(c) {
          const [s, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le compte en banque de Rachel est à ' + ecr(s) + ' euros. Elle paie ' + d + ' euros de courses avec sa carte. Où en est son compte ?',
            reponse: { type: 'nombre', valeur: s - d },
            aide: 'Calcule ' + par(s) + ' − ' + d + '. Si la dépense dépasse ce qu’il y a, le compte passe au-dessous de zéro.',
            aideParlee: 'Enlève la dépense. Si elle dépasse ce qu’il y a sur le compte, le compte passe au-dessous de zéro.',
            correction: [par(s) + ' − ' + d + ' = ' + ecr(s - d) + '.', 'Son compte est à ' + ecr(s - d) + ' euros.'],
          };
        },
      },
      {
        id: 'somme',
        univers: 'maison-courses',
        versions: [[-7, 3], [5, -9], [-4, -6], [8, -3], [-12, 5], [-2, -9], [6, -6], [-15, 20], [3, -11], [-8, -8]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule : ' + ecr(a) + ' + ' + par(b) + '.',
            reponse: { type: 'nombre', valeur: a + b },
            aide: 'Pars de ' + ecr(a) + ' sur le thermomètre. Ajouter ' + par(b) + (b < 0 ? ', c’est descendre.' : ', c’est monter.'),
            aideParlee: 'Pars du premier nombre sur le thermomètre. Ajouter un positif, c’est monter ; ajouter un négatif, c’est descendre.',
            correction: [ecr(a) + ' + ' + par(b) + ' = ' + ecr(a + b) + '.'],
          };
        },
      },
      {
        id: 'soustraction',
        univers: 'famille',
        versions: [[4, -3], [-2, -7], [-5, 3], [6, -6], [-9, -4], [0, -8], [3, 10], [-1, -1], [7, -5], [-6, 2]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Calcule : ' + ecr(a) + ' − ' + par(b) + '.',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Soustraire ' + par(b) + ', c’est ajouter ' + ecr(-b) + ' : ' + ecr(a) + ' + ' + par(-b) + '.',
            aideParlee: 'Soustraire un nombre, c’est ajouter son contraire : on change le signe du second nombre, et on ajoute.',
            correction: [ecr(a) + ' − ' + par(b) + ' = ' + ecr(a) + ' + ' + par(-b) + '.', '= ' + ecr(a - b) + '.'],
          };
        },
      },
    ],

    defi: {
      // [6 h, 12 h, 18 h, baisse jusqu'à minuit, montée affirmée par Moussa entre 6 h et 12 h]
      versions: [[-6, 4, 1, 9, 10], [-8, 3, -1, 6, 5], [-5, 7, 2, 8, 12], [-3, 6, 0, 7, 3], [-9, 2, -2, 5, 11], [-4, 5, 3, 10, 9]],
      genere(c) {
        const [a, b, s, baisse, dit] = c.alea.choisir(this.versions);
        const temps = [a, b, s];
        const ecart = Math.max(...temps) - Math.min(...temps);
        const minuit = s - baisse;
        const raison = b - a === dit;
        return {
          enonce: 'Esther passe une journée d’hiver à Ifrane, une ville de montagne au Maroc. Elle relève la température : ' +
            deg(a) + ' à 6 heures, ' + deg(b) + ' à midi et ' + deg(s) + ' à 18 heures.',
          image: { dessin: 'thermometre', min: -10, max: 10, valeur: b, depart: a, description: 'Un thermomètre : la flèche marque la température de 6 heures, le liquide celle de midi.' },
          questions: [
            {
              texte: 'Question 1. Quel est l’écart entre la température la plus haute et la plus basse de la journée ?',
              reponse: { type: 'nombre', valeur: ecart },
              aide: 'Cherche la plus haute et la plus basse, puis calcule la plus haute moins la plus basse.',
              correction: ['La plus haute : ' + deg(Math.max(...temps)) + '. La plus basse : ' + deg(Math.min(...temps)) + '.',
                ecr(Math.max(...temps)) + ' − ' + par(Math.min(...temps)) + ' = ' + ecart + '. L’écart est de ' + ecart + ' degrés.'],
            },
            {
              texte: 'Question 2. Entre 18 heures et minuit, la température baisse de ' + baisse + ' degrés. Quelle température fait-il à minuit ?',
              reponse: { type: 'nombre', valeur: minuit },
              aide: 'Pars de la température de 18 heures et descends.',
              correction: [ecr(s) + ' − ' + baisse + ' = ' + ecr(minuit) + '. À minuit, il fait ' + deg(minuit) + '.'],
            },
            {
              texte: 'Question 3. Moussa affirme : « Entre 6 heures et midi, la température a monté de ' + dit + ' degrés. » A-t-il raison ? Justifie par un calcul.',
              correction: ['Montée : ' + ecr(b) + ' − ' + par(a) + ' = ' + ecr(b) + ' + ' + par(-a) + ' = ' + (b - a) + ' degrés.',
                raison ? 'La température a bien monté de ' + dit + ' degrés : Moussa a raison.' : 'La température a monté de ' + (b - a) + ' degrés, pas de ' + dit + ' : Moussa a tort.'],
              grille: ['As-tu calculé la température de midi moins celle de 6 heures ?', 'As-tu bien changé le signe en soustrayant un nombre négatif ?', 'As-tu conclu par une phrase : « Moussa a raison » ou « Moussa a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais monter et descendre sur le thermomètre, même en passant sous zéro : tu calcules avec les nombres relatifs.',
    carte: ['temperature-midi', 'compte', 'soustraction'],
    papierDuSoir: { exercices: ['compte', 'soustraction'], defi: true },
    automatismes: [
      {
        id: 'somme-signee',
        versions: [[-3, 5], [4, -9], [-6, -2], [7, -7], [-8, 3], [-5, -5], [2, -10], [-1, 9]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: ecr(a) + ' + ' + par(b) + ' = ?', reponse: { type: 'nombre', valeur: a + b } }; },
      },
      {
        id: 'difference-signee',
        versions: [[3, -4], [-2, 5], [-6, -9], [0, -7], [5, 8], [-4, -1]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: ecr(a) + ' − ' + par(b) + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Chine, le livre des Neuf Chapitres employait déjà des nombres négatifs, avec des règles pour calculer avec eux.',
    prenoms: ['Laure', 'Rachel', 'Esther', 'Moussa'],
  };
});
