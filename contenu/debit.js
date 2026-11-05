/* Notion 18 du bloc de technologie « Le numérique et l'intelligence artificielle » : le débit. La vidéo de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'debit',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Le débit',
    classe: '3e',
    univers: ['appareils', 'maison-courses', 'danses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : Internet, débit d’une connexion.',

    accroche: {
      texte: 'Rachel envoie à Clarisse une vidéo de la danse de la fête. Sur le Wi-Fi de la maison, c’est fait en une minute. Au village, sur un petit réseau, l’envoi dure bien plus longtemps. ' +
        'Pourtant, c’est la même vidéo. Ce n’est pas le poids qui change : c’est la vitesse.',
      image: { dessin: 'barres', barres: [{ nom: 'Ville', parts: 8 }, { nom: 'Maison', parts: 4 }, { nom: 'Village', parts: 1 }], description: 'Trois barres, sans échelle exacte : la connexion de la ville fait passer le plus de données chaque seconde, puis la maison, et enfin le village.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Le poids en méga-octets', 'Multiplié par 8 : des millions de bits', 'Divisé par la vitesse', 'La durée, en secondes'], description: 'Le calcul : le poids en méga-octets, multiplié par huit pour avoir des millions de bits, divisé par la vitesse, donne la durée en secondes.' },
      etapes: [
        'Pense à un tuyau : plus il est large, plus il fait passer d’eau, chaque seconde.',
        'Sur un réseau, on compte la quantité de données qui passe chaque seconde, en millions de bits par seconde.',
        'Attention, un fichier se pèse en méga-octets, et un octet fait 8 bits. Il faut donc multiplier le poids par 8.',
        'Ensuite, on divise par la vitesse. On obtient le temps d’envoi, en secondes.',
      ],
    },

    decouverte: {
      texte: (c) => 'La quantité de données qui passe chaque seconde, c’est ' + c.mot('debit') + '. Elle se mesure en ' + c.mot('mbit') + '. ' +
        'Pour trouver le temps d’envoi, on passe le poids en bits, puis on divise par cette vitesse. ' +
        'L’astuce : les octets sont huit fois plus gros que les bits. Pense à multiplier par huit.',
    },

    vocabulaire: {
      termes: {
        debit: { sesMots: 'la largeur du tuyau', officiel: 'le débit', lesDeux: 'la largeur du tuyau, que l’on appelle le débit' },
        mbit: { sesMots: 'millions de bits par seconde', officiel: 'mégabits par seconde', lesDeux: 'millions de bits par seconde, que l’on appelle des mégabits par seconde' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la largeur du tuyau, et les millions de bits par seconde. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : le débit, pour la largeur du tuyau. Et les mégabits par seconde, écrits Mbit par seconde.',
        'Tu connais les mots officiels : le débit et le mégabit par seconde.',
      ],
    },

    exercices: [
      {
        id: 'mo-en-mbit',
        univers: 'appareils',
        versions: [5, 10, 25, 50, 100, 200],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Un fichier pèse ' + n + ' Mo. Combien de mégabits cela fait-il ?',
            reponse: { type: 'nombre', valeur: n * 8 },
            aide: 'Un octet, c’est 8 bits. Calcule ' + n + ' × 8.',
            aideParlee: 'Un octet, c’est huit bits. Multiplie par huit.',
            correction: [n + ' × 8 = ' + n * 8 + ' Mbit.'],
          };
        },
      },
      {
        id: 'temps-d-envoi',
        univers: 'danses',
        // [poids en Mo, débit en Mbit/s]
        versions: [[100, 8], [50, 4], [25, 2], [200, 16], [100, 40], [50, 20]],
        genere(c) {
          const [p, d] = c.alea.choisir(this.versions);
          const b = p * 8, t = b / d;
          return {
            enonce: 'Rachel envoie une vidéo de ' + p + ' Mo. Le débit est de ' + d + ' Mbit par seconde. Combien de secondes dure l’envoi ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + p + ' × 8, puis divise par ' + d + '.',
            aideParlee: 'Multiplie le poids par huit, puis divise par le débit.',
            correction: [p + ' × 8 = ' + b + ' Mbit.', b + ' ÷ ' + d + ' = ' + ecr(t) + ' secondes.'],
          };
        },
      },
      {
        id: 'quel-debit',
        univers: 'maison-courses',
        // [poids en Mbit, secondes]
        versions: [[400, 20], [800, 8], [300, 30], [100, 5], [1000, 50], [240, 12]],
        genere(c) {
          const [b, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Il faut ' + s + ' secondes pour faire passer ' + b + ' mégabits. Quel est le débit, en Mbit par seconde ?',
            reponse: { type: 'nombre', valeur: b / s },
            aide: 'Calcule ' + b + ' ÷ ' + s + '.',
            aideParlee: 'Divise la quantité de mégabits par le nombre de secondes.',
            correction: [b + ' ÷ ' + s + ' = ' + b / s + ' Mbit par seconde.'],
          };
        },
      },
      Q('le-plus-rapide', 'appareils',
        [['Pour une même vidéo, quel débit donne l’envoi le plus court ?', '100 Mbit par seconde'], ['Quelle connexion fait passer le plus de données chaque seconde ?', '100 Mbit par seconde']],
        (x) => x, ['100 Mbit par seconde', '10 Mbit par seconde', '1 Mbit par seconde'],
        'Plus le tuyau est large, plus cela va vite.',
        'Plus le débit est grand, plus de données passent chaque seconde, et plus l’envoi est court.'),
      Q('vrai-ou-faux', 'maison-courses',
        [['Une vidéo plus lourde met plus de temps, au même débit.', 'Vrai'], ['Doubler le débit divise le temps d’envoi par deux.', 'Vrai'], ['Le débit se mesure en grammes.', 'Faux'], ['Un octet et un bit, c’est la même chose.', 'Faux']],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Poids, débit et temps sont liés.',
        'Temps d’envoi = poids en bits divisé par le débit. Un octet fait huit bits, et le débit se compte en bits par seconde.'),
    ],

    defi: {
      // [poids en Mo, débit maison, débit village]
      versions: [[50, 20, 2], [100, 40, 4], [25, 10, 2], [200, 80, 8]],
      genere(c) {
        const [p, m, v] = c.alea.choisir(this.versions);
        const b = p * 8;
        return {
          enonce: 'Document : Rachel envoie une vidéo de ' + p + ' Mo à Clarisse. Chez elle, le débit est de ' + m + ' Mbit par seconde. Au village de Clarisse, il est de ' + v + ' Mbit par seconde.',
          image: { dessin: 'barres', barres: [{ nom: 'Maison', parts: Math.round(m / v) }, { nom: 'Village', parts: 1 }], description: 'Deux barres : le débit de la maison et celui du village. Chaque part vaut le débit du village.' },
          questions: [
            {
              texte: 'Question 1. Quel est le poids de la vidéo, en mégabits ?',
              reponse: { type: 'nombre', valeur: b },
              aide: 'Multiplie le poids par huit.',
              correction: [p + ' × 8 = ' + b + ' Mbit.'],
            },
            {
              texte: 'Question 2. Combien de secondes dure l’envoi depuis la maison de Rachel ?',
              reponse: { type: 'nombre', valeur: b / m },
              aide: 'Divise le poids en mégabits par le débit de la maison.',
              correction: [b + ' ÷ ' + m + ' = ' + ecr(b / m) + ' secondes.'],
            },
            {
              texte: 'Question 3. Combien de secondes durerait le même envoi au débit du village ?',
              reponse: { type: 'nombre', valeur: b / v },
              aide: 'Divise le poids en mégabits par le débit du village.',
              correction: [b + ' ÷ ' + v + ' = ' + ecr(b / v) + ' secondes.'],
            },
            {
              texte: 'Question 4. Clarisse veut regarder cette vidéo plus vite. Propose une solution, sans changer de réseau, et explique-la.',
              correction: ['Rachel peut réduire le poids de la vidéo avant de l’envoyer.', 'À débit égal, un fichier plus léger passe plus vite : le temps dépend du poids et du débit.'],
              grille: ['As-tu proposé de réduire le poids ?', 'As-tu relié le poids, le débit et le temps ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le poids, le tuyau, le temps : tu sais pourquoi ta vidéo arrive vite, ou lentement.',
    carte: ['mo-en-mbit', 'le-plus-rapide', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['temps-d-envoi', 'quel-debit'], defi: true },
    automatismes: [
      {
        id: 'fois-huit-debit',
        versions: [5, 10, 25, 50],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' × 8 = ?', reponse: { type: 'nombre', valeur: n * 8 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le câble Equiano, arrivé au Nigeria en 2022, devait apporter jusqu’à 20 fois plus de capacité que les précédents.',
    prenoms: ['Rachel', 'Clarisse'],
  };
});
