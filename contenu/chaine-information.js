/* Notion 5 du bloc de technologie « Comment un objet fonctionne » : la chaîne d’information (acquérir, traiter, communiquer). La lampe automatique de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const TEMPS = ['Acquérir', 'Traiter', 'Communiquer'];
  const PIECES = ['La sonde', 'Le microcontrôleur', 'L’écran'];
  const plur = (n, mot) => mot + (n >= 2 ? 's' : '');

  return {
    id: 'chaine-information',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'La chaîne d’information',
    classe: '4e',
    univers: ['maison-courses', 'appareils', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : la chaîne d’information (acquérir, traiter, communiquer).',

    accroche: {
      texte: 'La lampe du couloir de Clarisse s’allume seule. Quand quelqu’un passe, elle éclaire. ' +
        'Moussa démonte le boîtier. Il y trouve une petite pièce tournée vers le couloir, une petite carte, et la lampe.',
      image: { dessin: 'chaine', etapes: ['Une pièce guette le passage', 'Une petite carte décide', 'L’ordre part vers la lampe'], description: 'La lampe du couloir : une pièce guette le passage, une petite carte décide, puis l’ordre d’allumer part vers la lampe.' },
    },

    manipulation: {
      etapes: [
        'Quelqu’un passe dans le couloir de Clarisse. La lampe s’allume sans que personne appuie.',
        'Cherche d’abord ce qui voit le passage. C’est le premier maillon du chemin du message.',
        'Puis la petite carte décide : faut-il allumer, oui ou non ?',
        'Enfin, l’ordre part vers la lampe. Le message a fini son chemin.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le trajet du message, du couloir jusqu’à la lampe : c’est ' + c.mot('chaine') + '. ' +
        'Il a trois temps : acquérir, traiter, communiquer. ' +
        'Regarde la petite pièce tournée vers le couloir : c’est ' + c.mot('capteur') + '. Elle acquiert le message. ' +
        'Regarde la petite carte au fond du boîtier : c’est ' + c.mot('micro') + '. Elle traite le message, puis communique l’ordre à la lampe.',
    },

    vocabulaire: {
      termes: {
        chaine: { sesMots: 'le chemin du message dans l’objet', officiel: 'la chaîne d’information', lesDeux: 'le chemin du message dans l’objet. Les techniciens disent : la chaîne d’information' },
        capteur: { sesMots: 'la pièce qui guette', officiel: 'le capteur', lesDeux: 'la pièce qui guette. Les techniciens disent : le capteur' },
        micro: { sesMots: 'la carte qui décide', officiel: 'le microcontrôleur', lesDeux: 'la carte qui décide. Les techniciens disent : le microcontrôleur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le chemin du message dans l’objet, la pièce qui guette, et la carte qui décide. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la chaîne d’information, pour le chemin du message. Ils disent le capteur pour la pièce qui guette, et le microcontrôleur pour la carte qui décide.',
        'Tu connais les mots officiels : la chaîne d’information, le capteur et le microcontrôleur.',
      ],
    },

    exercices: [
      O.qcm('quel-temps-info', 'maison-courses',
        [
          ['le capteur de passage', 'Acquérir', 'Le capteur reçoit le message du monde extérieur.'],
          ['le microcontrôleur', 'Traiter', 'Le microcontrôleur lit le message et décide.'],
          ['le voyant qui s’allume pour prévenir', 'Communiquer', 'Le voyant envoie un message à la personne.'],
          ['le capteur de température', 'Acquérir', 'Le capteur reçoit le message du monde extérieur.'],
          ['la carte qui compare la mesure à une valeur et décide', 'Traiter', 'La carte lit la mesure et décide.'],
          ['l’écran qui affiche le résultat', 'Communiquer', 'L’écran envoie le résultat à la personne.'],
        ],
        (x) => 'Dans la chaîne d’information, quel temps correspond à : ' + x + ' ?', TEMPS,
        'Acquérir, traiter, communiquer : recevoir, décider, ou envoyer ?'),
      O.qcm('ordre-de-la-chaine', 'appareils',
        [
          ['juste après acquérir', 'Traiter'],
          ['juste après traiter', 'Communiquer'],
          ['juste avant traiter', 'Acquérir'],
          ['juste avant communiquer', 'Traiter'],
        ],
        (x) => 'Dans la chaîne d’information, quel temps vient ' + x + ' ?', TEMPS,
        'L’ordre est toujours : acquérir, puis traiter, puis communiquer.'),
      O.qcm('quelle-piece-thermometre', 'appareils',
        [
          ['mesure la température', 'La sonde', 'La sonde touche l’aliment et mesure sa température : elle acquiert.'],
          ['compare et calcule la valeur', 'Le microcontrôleur', 'Comparer et calculer, c’est traiter : c’est le travail du microcontrôleur.'],
          ['montre la valeur à l’utilisateur', 'L’écran', 'Montrer à la personne, c’est communiquer : c’est le travail de l’écran.'],
          ['change la température en petit signal électrique', 'La sonde', 'La sonde change ce qu’elle mesure en signal : c’est elle qui acquiert.'],
          ['décide d’afficher « trop chaud »', 'Le microcontrôleur', 'Décider, c’est traiter : c’est le travail du microcontrôleur.'],
          ['affiche l’alerte « trop chaud »', 'L’écran', 'Afficher l’alerte, c’est communiquer : c’est le travail de l’écran.'],
        ],
        (x) => 'Dans un thermomètre de cuisine à écran, quelle pièce ' + x + ' ?', PIECES,
        'La sonde reçoit, le microcontrôleur décide, l’écran montre.'),
      {
        id: 'minutes-allumee',
        univers: 'maison-courses',
        // [passages dans la soirée, secondes d’éclairage par passage]
        versions: [[12, 30], [10, 30], [8, 45], [20, 30], [16, 15]],
        genere(c) {
          const [n, s] = c.alea.choisir(this.versions);
          const total = n * s;
          const m = total / 60;
          return {
            enonce: 'La lampe du couloir de Clarisse s’allume à chaque passage et reste allumée ' + s + ' secondes. Ce soir, ' + n + ' personnes sont passées. Pendant combien de minutes la lampe a-t-elle été allumée ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Calcule ' + n + ' × ' + s + ', puis passe les secondes en minutes.',
            aideParlee: 'Multiplie le nombre de passages par la durée, puis passe les secondes en minutes.',
            correction: [n + ' × ' + s + ' = ' + total + ' secondes.', total + ' ÷ 60 = ' + m + ' ' + plur(m, 'minute') + '.'],
          };
        },
      },
      {
        id: 'mesures-capteur',
        univers: 'appareils',
        // [mesures par seconde, secondes]
        versions: [[10, 5], [4, 30], [25, 4], [5, 60], [20, 3]],
        genere(c) {
          const [f, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le microcontrôleur lit le capteur ' + f + ' fois par seconde. Combien de mesures lit-il en ' + s + ' secondes ?',
            reponse: { type: 'nombre', valeur: f * s },
            aide: 'Calcule ' + f + ' × ' + s + '.',
            aideParlee: 'Multiplie le nombre de lectures par seconde par le nombre de secondes.',
            correction: [f + ' × ' + s + ' = ' + (f * s) + ' mesures.'],
          };
        },
      },
    ],

    defi: {
      // [puissance de la lampe en W, heures d’une nuit, heures allumée avec le capteur, numéro de l’élément interrogé]
      versions: [[10, 10, 2, 0], [8, 12, 3, 1], [12, 10, 2, 2], [8, 10, 2, 3]],
      genere(c) {
        const [p, hn, ha, k] = c.alea.choisir(this.versions);
        const ELEMENT = [
          ['le capteur de présence', 'Acquérir'],
          ['la petite carte qui décide d’allumer', 'Traiter'],
          ['l’envoi de l’ordre d’allumer à la lampe', 'Communiquer'],
          ['le capteur de lumière du soir', 'Acquérir'],
        ];
        const [el, temps] = ELEMENT[k];
        return {
          enonce: 'Laure remplace la lampe de son entrée par une lampe automatique. Sa puissance est de ' + p + ' watts. ' +
            'Avant, la lampe restait allumée toute la nuit, soit ' + hn + ' heures. Maintenant, un capteur l’allume seulement ' + ha + ' heures par nuit.',
          questions: [
            {
              texte: 'Question 1. Quelle énergie la lampe utilisait-elle chaque nuit avant, en wattheures ?',
              reponse: { type: 'nombre', valeur: p * hn },
              aide: 'Calcule ' + p + ' × ' + hn + '.',
              aideParlee: 'Multiplie la puissance par la durée.',
              correction: [p + ' × ' + hn + ' = ' + (p * hn) + ' wattheures.'],
            },
            {
              texte: 'Question 2. Combien de wattheures Laure économise-t-elle chaque nuit ?',
              reponse: { type: 'nombre', valeur: p * (hn - ha) },
              aide: 'Calcule les heures gagnées, puis multiplie par ' + p + '.',
              aideParlee: 'Calcule les heures gagnées, puis multiplie par la puissance.',
              correction: [hn + ' − ' + ha + ' = ' + (hn - ha) + ' heures gagnées.', p + ' × ' + (hn - ha) + ' = ' + (p * (hn - ha)) + ' wattheures économisés.'],
            },
            {
              texte: 'Question 3. Dans la lampe de Laure, ' + el + ' correspond à quel temps de la chaîne d’information ?',
              reponse: O.choix(c.alea, temps, TEMPS.filter((t) => t !== temps)),
              aide: 'Acquérir, traiter, communiquer : recevoir, décider, ou envoyer ?',
              correction: ['Réponse : ' + temps + '.'],
            },
            {
              texte: 'Question 4. Explique comment la lampe sait qu’elle doit s’allumer, avec les trois temps de la chaîne d’information.',
              correction: ['Le capteur acquiert l’information : quelqu’un passe.', 'Le microcontrôleur traite cette information et décide d’allumer.', 'L’ordre est communiqué à la lampe, qui s’allume.'],
              grille: ['As-tu cité les trois temps : acquérir, traiter, communiquer ?', 'As-tu dit que le capteur repère le passage ?', 'As-tu dit que le microcontrôleur décide, puis envoie l’ordre à la lampe ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Acquérir, traiter, communiquer : tu sais comment une lampe devine qu’elle doit s’allumer.',
    carte: ['quel-temps-info', 'ordre-de-la-chaine', 'quelle-piece-thermometre'],
    papierDuSoir: { exercices: ['minutes-allumee', 'mesures-capteur'], defi: true },
    automatismes: [
      {
        id: 'secondes-minutes',
        versions: [[120], [180], [300], [240]],
        genere(c) { const [s] = c.alea.choisir(this.versions); return { enonce: s + ' secondes, combien de minutes ?', reponse: { type: 'nombre', valeur: s / 60 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Ouganda, à Kampala, des capteurs d’air posés sur des mototaxis envoient leurs mesures vers une application.',
    prenoms: ['Clarisse', 'Moussa', 'Laure'],
  };
});
