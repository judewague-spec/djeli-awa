/* Notion 6 du bloc de technologie « Comment un objet fonctionne » : capteurs et interface (présence, lumière, température, bouton). Le thermostat d’Esther.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const MESURES = ['Le passage d’une personne', 'La clarté de la pièce', 'La température de l’air', 'Un appui du doigt'];
  const CAPTEURS = ['Un capteur de lumière', 'Un capteur de présence', 'Un capteur de température', 'Un bouton'];
  const GENRES = ['Un capteur', 'Une interface'];
  const PIECES = ['Le capteur de température', 'Le bouton', 'L’écran'];
  const plur = (n, mot) => mot + (n >= 2 ? 's' : '');

  return {
    id: 'capteurs-interface',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Capteurs et interface',
    classe: '4e',
    univers: ['maison-courses', 'appareils', 'dehors'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : capteurs (présence, lumière, température), grandeur mesurée, signal, interface.',

    accroche: {
      texte: 'Le chauffage d’Esther s’arrête tout seul. Il mesure la température de la pièce. ' +
        'Quand il fait assez chaud, il s’éteint. Moussa ouvre le boîtier : un petit capteur, un bouton, un écran.',
      image: { dessin: 'chaine', etapes: ['Le capteur mesure la température', 'La carte compare à la température voulue', 'L’écran affiche, le chauffage s’arrête'], description: 'Le thermostat d’Esther : le capteur mesure la température de la pièce, la carte la compare à la température voulue, l’écran affiche la valeur et le chauffage s’arrête.' },
    },

    manipulation: {
      etapes: [
        'Le chauffage d’Esther s’arrête quand la pièce est assez chaude. Qui lui dit la température de la pièce ?',
        'C’est un petit capteur. Chaque capteur mesure une seule chose : la température, la lumière ou la présence.',
        'Le capteur envoie un petit message électrique, que la carte sait lire.',
        'L’écran et le bouton permettent à Esther de parler à l’objet, et à l’objet de lui répondre.',
      ],
    },

    decouverte: {
      texte: (c) => 'Chaque capteur mesure une seule chose : la présence, la lumière ou la température. Un bouton, lui, rend un message quand on appuie. ' +
        'Regarde la température de la pièce : c’est ' + c.mot('grandeur') + '. ' +
        'Regarde le courant que le capteur envoie à la carte : c’est ' + c.mot('signal') + '. ' +
        'Regarde l’écran et le bouton : c’est ' + c.mot('interface') + '.',
    },

    vocabulaire: {
      termes: {
        grandeur: { sesMots: 'ce que le capteur mesure', officiel: 'la grandeur mesurée', lesDeux: 'ce que le capteur mesure. Les techniciens disent : la grandeur mesurée' },
        signal: { sesMots: 'le message du capteur', officiel: 'le signal', lesDeux: 'le message du capteur. Les techniciens disent : le signal' },
        interface: { sesMots: 'ce qui permet de parler à l’objet', officiel: 'l’interface', lesDeux: 'ce qui permet de parler à l’objet. Les techniciens disent : l’interface' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce que le capteur mesure, le message du capteur, et ce qui permet de parler à l’objet. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la grandeur mesurée, pour ce que le capteur mesure. Ils disent : le signal, pour le message du capteur. ' +
          'Ils disent : l’interface, pour ce qui permet de parler à l’objet.',
        'Tu connais les mots officiels : la grandeur mesurée, le signal et l’interface.',
      ],
    },

    exercices: [
      O.qcm('que-mesure-t-il', 'maison-courses',
        [
          ['un capteur de présence', 'Le passage d’une personne', 'Un capteur de présence repère quelqu’un qui passe.'],
          ['un capteur de lumière', 'La clarté de la pièce', 'Un capteur de lumière mesure la clarté.'],
          ['un capteur de température', 'La température de l’air', 'Un capteur de température mesure la température.'],
          ['un bouton', 'Un appui du doigt', 'Un bouton repère quand on appuie.'],
        ],
        (x) => 'Qu’est-ce que mesure ou repère ' + x + ' ?', MESURES,
        'Pense à ce que le capteur surveille.'),
      O.qcm('quel-capteur', 'appareils',
        [
          ['allumer un lampadaire quand la nuit tombe', 'Un capteur de lumière', 'Il faut mesurer la lumière du jour : c’est le travail d’un capteur de lumière.'],
          ['ouvrir la porte d’un magasin quand quelqu’un approche', 'Un capteur de présence', 'Il faut repérer une personne qui approche : c’est le travail d’un capteur de présence.'],
          ['arrêter le chauffage quand la chambre est assez chaude', 'Un capteur de température', 'Il faut mesurer la température de la chambre : c’est le travail d’un capteur de température.'],
          ['faire sonner la sonnette quand on appuie', 'Un bouton', 'Il faut repérer l’appui d’un doigt : c’est le travail d’un bouton.'],
          ['allumer la lampe du couloir quand quelqu’un passe', 'Un capteur de présence', 'Il faut repérer une personne qui passe : c’est le travail d’un capteur de présence.'],
          ['couper le fer à repasser s’il devient trop chaud', 'Un capteur de température', 'Il faut mesurer la température du fer : c’est le travail d’un capteur de température.'],
        ],
        (x) => 'Quelle pièce faut-il pour ' + x + ' ?', CAPTEURS,
        'Cherche ce que l’objet doit surveiller.'),
      O.qcm('capteur-ou-interface', 'dehors',
        [
          ['la pièce qui mesure la lumière', 'Un capteur', 'Mesurer le monde autour de l’objet, c’est le travail d’un capteur.'],
          ['la pièce qui montre la température à Esther', 'Une interface', 'Parler à la personne, c’est le travail d’une interface.'],
          ['la pièce qui sonne pour prévenir la personne', 'Une interface', 'Parler à la personne, c’est le travail d’une interface.'],
          ['la pièce qui mesure la température de l’air', 'Un capteur', 'Mesurer le monde autour de l’objet, c’est le travail d’un capteur.'],
          ['la petite lampe qui s’allume pour prévenir la personne', 'Une interface', 'Parler à la personne, c’est le travail d’une interface.'],
          ['la pièce qui repère une personne qui passe', 'Un capteur', 'Mesurer le monde autour de l’objet, c’est le travail d’un capteur.'],
        ],
        (x) => 'Dans un objet automatique, ' + x + ' est… un capteur ou une interface ?', GENRES,
        'Le capteur mesure le monde ; l’interface parle à la personne.'),
      {
        id: 'degres-a-gagner',
        univers: 'maison-courses',
        // [température d’arrêt du chauffage, température de la pièce]
        versions: [[20, 16], [19, 14], [21, 17], [20, 13], [18, 12]],
        genere(c) {
          const [t, m] = c.alea.choisir(this.versions);
          const d = t - m;
          return {
            enonce: 'Le chauffage d’Esther s’arrête à ' + t + ' °C. Le capteur mesure ' + m + ' °C dans la pièce. De combien de degrés la température doit-elle encore monter ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Calcule ' + t + ' − ' + m + '.',
            aideParlee: 'Soustrais la température mesurée à la température d’arrêt.',
            correction: [t + ' − ' + m + ' = ' + d + ' ' + plur(d, 'degré') + '.'],
          };
        },
      },
      {
        id: 'mesures-en-une-heure',
        univers: 'appareils',
        // minutes entre deux mesures
        versions: [[5], [10], [15], [4], [12], [20]],
        genere(c) {
          const [m] = c.alea.choisir(this.versions);
          const n = 60 / m;
          return {
            enonce: 'Le capteur du thermostat envoie une mesure toutes les ' + m + ' minutes. Combien de mesures envoie-t-il en une heure ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Une heure dure 60 minutes. Calcule 60 ÷ ' + m + '.',
            aideParlee: 'Divise la durée d’une heure, en minutes, par le temps entre deux mesures.',
            correction: ['60 ÷ ' + m + ' = ' + n + ' ' + plur(n, 'mesure') + '.'],
          };
        },
      },
    ],

    defi: {
      // [température d’arrêt, température de départ, degrés gagnés par heure, numéro de la pièce interrogée]
      versions: [[20, 14, 2, 0], [21, 15, 3, 1], [20, 12, 4, 2], [22, 16, 2, 1], [19, 13, 3, 2]],
      genere(c) {
        const [t, m, v, k] = c.alea.choisir(this.versions);
        const QUESTION = [
          ['Quelle pièce mesure la température de la chambre ?', 'Le capteur de température'],
          ['Quelle pièce permet à Esther de choisir la température voulue ?', 'Le bouton'],
          ['Quelle pièce montre la température à Esther ?', 'L’écran'],
        ];
        const [q3, bonne] = QUESTION[k];
        const d = t - m;
        return {
          enonce: 'Esther installe un thermostat dans sa chambre. Le capteur mesure ' + m + ' °C. Esther règle le chauffage pour qu’il s’arrête à ' + t + ' °C. ' +
            'La chambre gagne ' + v + ' degrés chaque heure. Le thermostat a un capteur, un bouton et un écran.',
          questions: [
            {
              texte: 'Question 1. De combien de degrés la température doit-elle monter avant l’arrêt du chauffage ?',
              reponse: { type: 'nombre', valeur: d },
              aide: 'Calcule ' + t + ' − ' + m + '.',
              aideParlee: 'Soustrais la température mesurée à la température d’arrêt.',
              correction: [t + ' − ' + m + ' = ' + d + ' degrés.'],
            },
            {
              texte: 'Question 2. Combien d’heures le chauffage fonctionne-t-il avant de s’arrêter ?',
              reponse: { type: 'nombre', valeur: d / v },
              aide: 'Divise les degrés à gagner par les degrés gagnés chaque heure.',
              correction: [d + ' ÷ ' + v + ' = ' + (d / v) + ' ' + plur(d / v, 'heure') + '.'],
            },
            {
              texte: 'Question 3. ' + q3,
              reponse: O.choix(c.alea, bonne, PIECES.filter((p) => p !== bonne)),
              aide: 'Le capteur mesure ; le bouton et l’écran permettent de parler à l’objet.',
              correction: ['Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Explique ce que le capteur mesure, ce qu’il envoie à la carte, et à quoi sert l’interface.',
              correction: ['Le capteur mesure la température de la chambre.', 'Il envoie un petit signal électrique à la carte.', 'L’interface, avec le bouton et l’écran, permet à Esther de parler à l’objet et de lire sa réponse.'],
              grille: ['As-tu dit que le capteur mesure la température ?', 'As-tu dit que le capteur envoie un signal à la carte ?', 'As-tu cité le bouton ou l’écran comme interface ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais ce que mesure chaque capteur, et comment tu parles à un objet grâce à son interface.',
    carte: ['que-mesure-t-il', 'quel-capteur', 'capteur-ou-interface'],
    papierDuSoir: { exercices: ['degres-a-gagner', 'mesures-en-une-heure'], defi: true },
    automatismes: [
      {
        id: 'difference-degres',
        versions: [[20, 16], [19, 13], [22, 18], [21, 15]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Rwanda, un système suit en direct la température des poches de sang, et alerte si elle dérape.',
    prenoms: ['Esther', 'Moussa'],
  };
});
