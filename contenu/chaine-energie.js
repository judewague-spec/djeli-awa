/* Notion 1 du bloc de technologie « Comment un objet fonctionne » : la chaîne d’énergie. Le ventilateur de Rachel, le portail de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const TEMPS = ['Alimenter', 'Distribuer', 'Convertir', 'Transmettre'];
  const ACTIONS = ['Une lampe', 'Un moteur', 'Un vérin', 'Un haut-parleur'];
  const PIECES = ['La batterie', 'L’interrupteur', 'Le moteur', 'L’axe'];
  const plur = (n, mot) => mot + (n >= 2 ? 's' : '');

  return {
    id: 'chaine-energie',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'La chaîne d’énergie',
    classe: 'cycle 4',
    univers: ['appareils', 'maison-courses', 'dehors'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : la chaîne d’énergie (alimenter, distribuer, convertir, transmettre).',

    accroche: {
      texte: 'Rachel apporte son ventilateur à l’atelier. Il ne tourne plus. ' +
        'Moussa le démonte et suit le chemin de l’énergie, de la batterie jusqu’aux pales. Il vérifie chaque pièce, l’une après l’autre.',
      image: { dessin: 'chaine', etapes: ['La batterie donne l’énergie', 'L’interrupteur la laisse passer', 'Le moteur la change en mouvement', 'L’axe donne le mouvement aux pales'], description: 'Le chemin de l’énergie dans le ventilateur : la batterie donne l’énergie, l’interrupteur la laisse passer, le moteur la change en mouvement, l’axe donne ce mouvement aux pales.' },
    },

    manipulation: {
      type: 'ranger',
      etapes: ['Alimenter : la batterie', 'Distribuer : l’interrupteur', 'Convertir : le vérin', 'Transmettre : le bras du portail'],
      depart: ['Convertir : le vérin', 'Alimenter : la batterie', 'Transmettre : le bras du portail', 'Distribuer : l’interrupteur'],
      consigne: 'Voici le portail de Clarisse. Range ses pièces dans l’ordre du chemin de l’énergie. Utilise les boutons monter et descendre.',
    },

    decouverte: {
      texte: (c) => 'Regarde le ventilateur de Rachel, de la batterie jusqu’aux pales : c’est ' + c.mot('chaine') + '. ' +
        'Il a quatre temps. La batterie alimente. L’interrupteur distribue. Le moteur convertit l’énergie en mouvement. Puis l’axe transmet ce mouvement aux pales. ' +
        'Regarde le moteur : c’est ' + c.mot('actionneur') + '. La lampe et le vérin sont des pièces du même genre.',
    },

    vocabulaire: {
      termes: {
        chaine: { sesMots: 'le chemin de l’énergie dans l’objet', officiel: 'la chaîne d’énergie', lesDeux: 'le chemin de l’énergie dans l’objet. Les techniciens disent : la chaîne d’énergie' },
        actionneur: { sesMots: 'la pièce qui change l’énergie en action', officiel: 'l’actionneur', lesDeux: 'la pièce qui change l’énergie en action. Les techniciens disent : l’actionneur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le chemin de l’énergie dans l’objet, et la pièce qui change l’énergie en action. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la chaîne d’énergie, pour le chemin de l’énergie dans l’objet. ' +
          'Ils disent : l’actionneur, pour la pièce qui change l’énergie en action.',
        'Tu connais les mots officiels : la chaîne d’énergie de l’objet, et l’actionneur qui agit.',
      ],
    },

    exercices: [
      O.qcm('role-portail', 'maison-courses',
        [
          ['La batterie garde l’énergie et la donne au portail.', 'Alimenter', 'La batterie apporte l’énergie à tout le portail.'],
          ['L’interrupteur laisse passer l’énergie, ou la coupe.', 'Distribuer', 'L’interrupteur envoie l’énergie là où il faut, ou la coupe.'],
          ['Le vérin change l’énergie électrique en mouvement.', 'Convertir', 'Le vérin change une forme d’énergie en une autre : c’est convertir.'],
          ['Le bras passe le mouvement du vérin au portail.', 'Transmettre', 'Le bras amène le mouvement jusqu’au portail : c’est transmettre.'],
        ],
        (x) => 'Dans le portail de Clarisse : ' + x + ' Quel est ce temps de la chaîne d’énergie ?', TEMPS,
        'Alimenter, distribuer, convertir, transmettre : cherche ce que fait la pièce.'),
      O.qcm('quelle-action', 'appareils',
        [['de la lumière', 'Une lampe', 'Une lampe change l’énergie électrique en lumière.'], ['un mouvement qui tourne', 'Un moteur', 'Un moteur change l’énergie électrique en mouvement qui tourne.'], ['un mouvement en ligne droite, qui pousse et tire', 'Un vérin', 'Un vérin pousse et tire en ligne droite, il ne tourne pas.'], ['du son', 'Un haut-parleur', 'Un haut-parleur change l’énergie électrique en son.']],
        (x) => 'Quelle pièce change l’énergie électrique pour donner ' + x + ' ?', ACTIONS,
        'Cherche la pièce qui change l’énergie en action.'),
      O.qcm('quelle-piece', 'dehors',
        [['alimente le ventilateur en énergie', 'La batterie', 'La batterie garde l’énergie et la fournit : c’est alimenter.'], ['laisse passer l’énergie ou la coupe', 'L’interrupteur', 'L’interrupteur ouvre ou ferme le chemin : c’est distribuer.'], ['convertit l’énergie en mouvement', 'Le moteur', 'Le moteur change l’énergie électrique en mouvement : c’est convertir.'], ['transmet le mouvement aux pales', 'L’axe', 'L’axe amène le mouvement du moteur jusqu’aux pales : c’est transmettre.']],
        (x) => 'Dans un petit ventilateur à batterie, quelle pièce ' + x + ' ?', PIECES,
        'Pense au temps de la chaîne : alimenter, distribuer, convertir ou transmettre.'),
      {
        id: 'duree-batterie',
        univers: 'appareils',
        // [énergie de la batterie en Wh, puissance du ventilateur en W]
        versions: [[10, 2], [12, 3], [15, 5], [20, 4], [18, 6]],
        genere(c) {
          const [e, p] = c.alea.choisir(this.versions);
          const h = e / p;
          return {
            enonce: 'La batterie du ventilateur de Rachel contient ' + e + ' wattheures d’énergie. Le ventilateur consomme ' + p + ' watts. On rappelle : énergie en wattheures = puissance en watts × durée en heures. Combien d’heures tourne-t-il avec une batterie pleine ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'Calcule ' + e + ' ÷ ' + p + '.',
            aideParlee: 'Divise l’énergie de la batterie par la puissance du ventilateur.',
            correction: [e + ' ÷ ' + p + ' = ' + h + ' ' + plur(h, 'heure') + '.'],
          };
        },
      },
      {
        id: 'ouvertures-du-portail',
        univers: 'maison-courses',
        // [wattheures par ouverture, wattheures donnés par jour par le panneau solaire]
        versions: [[2, 20], [4, 24], [3, 18], [5, 30], [2, 16]],
        genere(c) {
          const [w, j] = c.alea.choisir(this.versions);
          const n = j / w;
          return {
            enonce: 'Le panneau solaire du portail de Clarisse recharge la batterie de ' + j + ' wattheures par jour. Chaque ouverture utilise ' + w + ' wattheures. Combien d’ouvertures cette énergie permet-elle chaque jour ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Calcule ' + j + ' ÷ ' + w + '.',
            aideParlee: 'Divise l’énergie reçue par l’énergie d’une ouverture.',
            correction: [j + ' ÷ ' + w + ' = ' + n + ' ' + plur(n, 'ouverture') + ' par jour.'],
          };
        },
      },
    ],

    defi: {
      // [énergie de la batterie en Wh, Wh par ouverture, numéro de la pièce interrogée]
      versions: [[24, 2, 0], [30, 3, 1], [36, 4, 2], [20, 2, 3]],
      genere(c) {
        const [e, w, k] = c.alea.choisir(this.versions);
        const PIECE = [
          ['la batterie', 'Alimenter'],
          ['l’interrupteur du portail', 'Distribuer'],
          ['le vérin', 'Convertir'],
          ['le bras du portail', 'Transmettre'],
        ];
        const [piece, temps] = PIECE[k];
        return {
          enonce: 'Le portail de Clarisse s’ouvre avec un vérin. Il est relié à une batterie par un interrupteur, et un bras pousse le portail. ' +
            'Une batterie pleine contient ' + e + ' wattheures. Chaque ouverture utilise ' + w + ' wattheures.',
          questions: [
            {
              texte: 'Question 1. Combien d’ouvertures permet une batterie pleine ?',
              reponse: { type: 'nombre', valeur: e / w },
              aide: 'Calcule ' + e + ' ÷ ' + w + '.',
              aideParlee: 'Divise l’énergie de la batterie par l’énergie d’une ouverture.',
              correction: [e + ' ÷ ' + w + ' = ' + (e / w) + ' ouvertures.'],
            },
            {
              texte: 'Question 2. Après 5 ouvertures, combien de wattheures reste-t-il dans la batterie ?',
              reponse: { type: 'nombre', valeur: e - 5 * w },
              aide: 'Calcule ' + e + ' − 5 × ' + w + '.',
              aideParlee: 'Calcule l’énergie utilisée par cinq ouvertures, puis retire-la de la batterie.',
              correction: ['5 × ' + w + ' = ' + (5 * w) + ' wattheures utilisés.', e + ' − ' + (5 * w) + ' = ' + (e - 5 * w) + ' wattheures restants.'],
            },
            {
              texte: 'Question 3. Dans la chaîne d’énergie du portail, voici une pièce : ' + piece + '. Quel temps de la chaîne correspond à cette pièce ?',
              reponse: O.choix(c.alea, temps, TEMPS.filter((t) => t !== temps)),
              aide: 'Alimenter, distribuer, convertir, transmettre : cherche ce que fait la pièce.',
              correction: ['Réponse : ' + temps + '.'],
            },
            {
              texte: 'Question 4. Explique le chemin de l’énergie, de la batterie jusqu’au mouvement du portail.',
              correction: ['La batterie alimente, l’interrupteur distribue, le vérin convertit l’énergie en mouvement, le bras transmet ce mouvement au portail.'],
              grille: ['As-tu cité les quatre temps : alimenter, distribuer, convertir, transmettre ?', 'As-tu rangé les pièces dans le bon ordre ?', 'As-tu associé chaque pièce à son temps ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Alimenter, distribuer, convertir, transmettre : tu sais suivre l’énergie dans un objet, de la batterie jusqu’à l’action.',
    carte: ['role-portail', 'quelle-action', 'quelle-piece'],
    papierDuSoir: { exercices: ['duree-batterie', 'ouvertures-du-portail'], defi: true },
    automatismes: [
      {
        id: 'puissance-duree',
        versions: [[3, 4], [2, 5], [5, 2], [4, 3]],
        genere(c) { const [p, h] = c.alea.choisir(this.versions); return { enonce: p + ' watts pendant ' + h + ' heures : combien de wattheures ?', reponse: { type: 'nombre', valeur: p * h } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Rwanda, des drones médicaux partent d’une catapulte électrique, alimentée par des supercondensateurs.',
    prenoms: ['Rachel', 'Moussa', 'Clarisse'],
  };
});
