/* Notion 2 du bloc « L'énergie » : les conversions d'énergie. Le ventilateur de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const E_C = 'L’énergie cinétique', E_T = 'L’énergie thermique', E_CH = 'L’énergie chimique';
  const E_EL = 'L’énergie électrique', E_L = 'L’énergie lumineuse', E_N = 'L’énergie nucléaire';
  const UTILE = 'L’énergie utile', DISSIPEE = 'L’énergie dissipée', RECUE = 'L’énergie reçue';

  /** Une question à choix : versions [[texte, bonne réponse, autres réponses, explication]]. */
  const Q = (id, univers, versions, enonce, aide) => ({
    id, univers, versions,
    genere(c) {
      const [x, bonne, autres, pourquoi] = c.alea.choisir(this.versions);
      return {
        enonce: enonce(x),
        reponse: O.choix(c.alea, bonne, autres),
        aide,
        correction: [pourquoi, 'Réponse : ' + bonne + '.'],
      };
    },
  });

  return {
    id: 'conversions-energie',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'Les conversions d’énergie',
    classe: 'cycle 4',
    univers: ['appareils', 'famille', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : conversions d’énergie, énergie utile et énergie dissipée.',

    accroche: {
      texte: 'Laure allume le ventilateur du salon. Il tourne et brasse l’air. Mais son moteur devient tiède. Rachel se demande où va l’énergie.',
      image: { dessin: 'chaine', etapes: ['Énergie électrique reçue', 'Le ventilateur', 'Air brassé et un peu de chaleur'], description: 'Le ventilateur reçoit de l’énergie électrique. Il la change en mouvement de l’air, et aussi en un peu de chaleur.' },
    },

    manipulation: {
      etapes: [
        'Le ventilateur reçoit de l’énergie électrique, par la prise.',
        'Son moteur la change en mouvement : l’air est brassé. C’est ce que Laure voulait.',
        'Mais le moteur chauffe un peu. Cette chaleur ne sert pas à rafraîchir le salon.',
        'L’appareil a reçu une énergie, et il en rend deux : une qui sert, une qui part en chaleur.',
        'Dans une vieille lampe à filament, c’est pareil : la lumière sert, et la chaleur est perdue.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le ventilateur de Laure : c’est ' + c.mot('convertisseur') + '. ' +
        'Le mouvement de l’air rafraîchit Laure : c’est ' + c.mot('utile') + '. ' +
        'La chaleur du moteur ne rafraîchit personne : c’est ' + c.mot('dissipee') + '. ' +
        (c.etape >= 3 ? 'Dissipée' : 'Perdue') + ' ne veut pas dire disparue : cette chaleur part dans l’air de la pièce. ' +
        'L’astuce : un appareil reçoit une énergie, et il en rend deux. L’une sert, l’autre part en chaleur.',
    },

    vocabulaire: {
      termes: {
        convertisseur: { sesMots: 'un appareil qui change l’énergie d’une forme à une autre', officiel: 'un convertisseur d’énergie', lesDeux: 'un appareil qui change l’énergie d’une forme à une autre, appelé convertisseur d’énergie' },
        utile: { sesMots: 'l’énergie qui sert à ce que tu veux', officiel: 'l’énergie utile', lesDeux: 'l’énergie qui sert à ce que tu veux, appelée énergie utile' },
        dissipee: { sesMots: 'l’énergie perdue en chaleur', officiel: 'l’énergie dissipée', lesDeux: 'l’énergie perdue en chaleur, appelée énergie dissipée' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un appareil qui change l’énergie, l’énergie qui sert, et l’énergie perdue en chaleur. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : un convertisseur d’énergie, l’énergie utile et l’énergie dissipée.',
        'Tu connais les mots officiels : convertisseur, énergie utile et énergie dissipée. Tu sais aussi nommer l’énergie reçue.',
      ],
    },

    exercices: [
      Q('forme-utile', 'appareils', [
        ['le ventilateur du salon', E_C, [E_L, E_N], 'Le ventilateur sert à brasser l’air : son énergie utile est du mouvement.'],
        ['la lampe de poche de Moussa', E_L, [E_CH, E_N], 'La lampe sert à éclairer : son énergie utile est de la lumière.'],
        ['la bouilloire de Clarisse', E_T, [E_L, E_C], 'La bouilloire sert à chauffer l’eau : son énergie utile est de la chaleur.'],
        ['le grille-pain de la cuisine', E_T, [E_L, E_C], 'Le grille-pain sert à griller le pain : son énergie utile est de la chaleur.'],
        ['le moteur d’un vélo électrique', E_C, [E_L, E_N], 'Le moteur sert à faire avancer le vélo : son énergie utile est du mouvement.'],
        ['la lampe de son bureau', E_L, [E_C, E_N], 'La lampe sert à éclairer : son énergie utile est de la lumière.'],
      ], (x) => 'Rachel utilise ' + x + '. Quelle forme d’énergie est son énergie utile, celle qui sert ?', 'L’énergie utile, c’est celle qui sert à ce que Rachel veut faire. Cinétique veut dire du mouvement, et thermique de la chaleur.'),

      Q('forme-recue', 'maison-courses', [
        ['un grille-pain', E_EL, [E_L, E_C], 'Un grille-pain est branché sur la prise : il reçoit de l’énergie électrique.'],
        ['une cuisinière à gaz', E_CH, [E_EL, E_L], 'Le gaz garde de l’énergie en réserve : la cuisinière reçoit de l’énergie chimique.'],
        ['un panneau solaire', E_L, [E_CH, E_C], 'Le panneau est éclairé par le soleil : il reçoit de l’énergie lumineuse.'],
        ['une éolienne', E_C, [E_CH, E_T], 'Le vent, c’est de l’air qui bouge : l’éolienne reçoit de l’énergie cinétique.'],
        ['un ventilateur', E_EL, [E_CH, E_N], 'Un ventilateur est branché sur la prise : il reçoit de l’énergie électrique.'],
        ['une chaudière à bois', E_CH, [E_EL, E_L], 'Le bois garde de l’énergie en réserve : la chaudière reçoit de l’énergie chimique.'],
      ], (x) => 'Aminata observe ' + x + '. Quelle forme d’énergie cet appareil reçoit-il ?', 'Cherche ce qui arrive dans l’appareil : une prise, du gaz, de la lumière, du vent ou du bois. Cinétique veut dire du mouvement, et chimique de la réserve.'),

      Q('quel-mot', 'famille', [
        ['L’énergie qui sert à ce que l’on veut faire', UTILE, [DISSIPEE, RECUE], 'C’est la définition de l’énergie utile.'],
        ['L’énergie perdue en chaleur, qui ne sert à rien', DISSIPEE, [UTILE, RECUE], 'C’est la définition de l’énergie dissipée.'],
        ['L’énergie qui arrive dans l’appareil, par la prise par exemple', RECUE, [UTILE, DISSIPEE], 'C’est la définition de l’énergie reçue.'],
        ['Un appareil qui change l’énergie d’une forme à une autre', 'Un convertisseur d’énergie', [UTILE, DISSIPEE], 'C’est la définition d’un convertisseur d’énergie.'],
        ['La chaleur du moteur d’un ventilateur, qui ne sert pas', DISSIPEE, [UTILE, RECUE], 'Cette chaleur ne sert pas : c’est de l’énergie dissipée.'],
      ], (x) => 'Moussa cherche le bon mot pour : « ' + x + ' ». Utile veut dire qui sert. Dissipée veut dire perdue en chaleur. Reçue veut dire arrivée dans l’appareil. Un convertisseur change l’énergie d’une forme à une autre. Lequel choisis-tu ?', 'Relis les mots, et choisis celui qui va avec la phrase.'),

      Q('chaleur-utile-ou-dissipee', 'appareils', [
        ['Dans un radiateur électrique, la chaleur produite est-elle utile ou dissipée ?', 'Utile', ['Dissipée'], 'Un radiateur sert à chauffer la pièce : sa chaleur est utile.'],
        ['Dans un ventilateur, la chaleur du moteur est-elle utile ou dissipée ?', 'Dissipée', ['Utile'], 'Un ventilateur sert à brasser l’air : la chaleur de son moteur est perdue.'],
        ['Dans un fer à repasser, la chaleur produite est-elle utile ou dissipée ?', 'Utile', ['Dissipée'], 'Un fer sert à chauffer le tissu : sa chaleur est utile.'],
        ['Dans un ordinateur, la chaleur produite est-elle utile ou dissipée ?', 'Dissipée', ['Utile'], 'Un ordinateur ne sert pas à chauffer : sa chaleur est perdue.'],
        ['Dans un grille-pain, la chaleur produite est-elle utile ou dissipée ?', 'Utile', ['Dissipée'], 'Un grille-pain sert à griller le pain : sa chaleur est utile.'],
        ['Dans un téléphone qui chauffe pendant un jeu, la chaleur est-elle utile ou dissipée ?', 'Dissipée', ['Utile'], 'Un téléphone ne sert pas à chauffer : sa chaleur est perdue.'],
      ], (x) => 'Rachel se demande : ' + x, 'Demande-toi : est-ce que cette chaleur sert à ce que Rachel veut faire ? Utile veut dire qui sert, et dissipée veut dire perdue.'),

      Q('convertisseur-ou-pas', 'maison-courses', [
        ['un grille-pain', 'Oui', ['Non'], 'Un grille-pain change l’énergie électrique en chaleur : c’est un convertisseur.'],
        ['une table en bois', 'Non', ['Oui'], 'Une table ne change aucune énergie : ce n’est pas un convertisseur.'],
        ['un panneau solaire', 'Oui', ['Non'], 'Un panneau solaire change la lumière en énergie électrique : c’est un convertisseur.'],
        ['une chaise', 'Non', ['Oui'], 'Une chaise ne change aucune énergie : ce n’est pas un convertisseur.'],
        ['le moteur d’un vélo électrique', 'Oui', ['Non'], 'Le moteur change l’énergie électrique en mouvement : c’est un convertisseur.'],
        ['un livre fermé', 'Non', ['Oui'], 'Un livre fermé ne change aucune énergie : ce n’est pas un convertisseur.'],
      ], (x) => 'Moussa se demande si ' + x + ' est un convertisseur d’énergie. Qu’en penses-tu ?', 'Un convertisseur change l’énergie d’une forme à une autre. Est-ce le cas ici ?'),
    ],

    defi: {
      // [phrase, énergie reçue, énergie utile, la chaleur est-elle utile ?]
      versions: [
        ['un ventilateur dans le salon', E_EL, E_C, false],
        ['une bouilloire sur la table', E_EL, E_T, true],
        ['une éolienne dans le jardin', E_C, E_EL, false],
        ['un panneau solaire sur le toit', E_L, E_EL, false],
      ],
      genere(c) {
        const [app, recue, utile, chaleurUtile] = c.alea.choisir(this.versions);
        const formes = [E_EL, E_C, E_L, E_T, E_CH];
        const autres = (juste) => formes.filter((f) => f !== juste).slice(0, 2);
        return {
          enonce: 'Chez Clarisse, Rachel observe ' + app + '. Elle veut savoir comment cet appareil change l’énergie.',
          questions: [
            {
              texte: 'Question 1. Quelle forme d’énergie l’appareil reçoit-il ?',
              reponse: O.choix(c.alea, recue, autres(recue)),
              aide: 'Cherche ce qui arrive dans l’appareil. Cinétique veut dire du mouvement, thermique de la chaleur.',
              correction: ['L’appareil reçoit ' + recue.charAt(0).toLowerCase() + recue.slice(1) + '.', 'Réponse : ' + recue + '.'],
            },
            {
              texte: 'Question 2. Quelle forme d’énergie est l’énergie utile ?',
              reponse: O.choix(c.alea, utile, autres(utile)),
              aide: 'L’énergie utile est celle qui sert à ce que Rachel veut. Cinétique veut dire du mouvement, thermique de la chaleur.',
              correction: ['Ce qui sert, c’est ' + utile.charAt(0).toLowerCase() + utile.slice(1) + '.', 'Réponse : ' + utile + '.'],
            },
            {
              texte: 'Question 3. La chaleur produite par l’appareil est-elle utile ou dissipée ?',
              reponse: O.choix(c.alea, chaleurUtile ? 'Utile' : 'Dissipée', ['Utile', 'Dissipée']),
              aide: 'Demande-toi : est-ce que cette chaleur sert à ce que Rachel veut ? Utile veut dire qui sert, et dissipée veut dire perdue.',
              correction: [chaleurUtile ? 'Ici, la chaleur est ce que l’on cherche : elle est utile.' : 'Ici, la chaleur n’est pas ce que l’on cherche : elle est dissipée.', 'Réponse : ' + (chaleurUtile ? 'Utile' : 'Dissipée') + '.'],
            },
            {
              texte: 'Question 4. Explique ce que cet appareil fait de l’énergie. Parle de l’énergie reçue (celle qui arrive), de l’énergie utile (celle qui sert) et de la chaleur.',
              correction: ['L’appareil reçoit ' + recue.charAt(0).toLowerCase() + recue.slice(1) + ' et la change en ' + utile.replace(/^L’/, '').toLowerCase() + '.', chaleurUtile ? 'La chaleur est l’énergie utile.' : 'Une partie part en chaleur : c’est l’énergie dissipée.'],
              grille: ['As-tu nommé l’énergie reçue ?', 'As-tu nommé l’énergie utile ?', 'As-tu parlé de la chaleur, utile ou dissipée ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais suivre l’énergie dans un appareil : ce qui arrive, ce qui sert, et ce qui part en chaleur.',
    carte: ['forme-utile', 'forme-recue', 'chaleur-utile-ou-dissipee'],
    papierDuSoir: { exercices: ['forme-utile', 'convertisseur-ou-pas'], defi: true },
    automatismes: [
      {
        id: 'additionner',
        versions: [[6, 20], [25, 10], [8, 18], [30, 12]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' + ' + b + ' = ?', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte, Héron d’Alexandrie a décrit l’éolipile, première machine connue qui change la vapeur en rotation.',
    prenoms: ['Rachel', 'Moussa', 'Laure', 'Clarisse', 'Aminata'],
  };
});
