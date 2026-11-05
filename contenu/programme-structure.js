/* Notion 4 du bloc de technologie « Programmer » : piloter un objet réel. L’arrosage automatique des tomates de Laure.
   Les programmes sont écrits en mots (lisibles au lecteur d’écran) et exécutés en code (js/programme-blocs.js).
   Le sous-programme « arroser » est un vrai bloc défini, puis appelé (definir, appeler). « allumer vanne » ouvre la vanne, « éteindre vanne » la ferme.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const image = (prog, intro) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: intro + ' ' + PB.enMots(prog) + '.' });
  // Le dessin n’a que 300 de large : les lignes les plus longues y perdent « l’entrée » ; la description reste entière.
  const imageCourte = (prog, intro) => Object.assign(image(prog, intro), { lignes: PB.lignes(prog).map((l) => l.split('l’entrée ').join('')) });

  // Le sous-programme « arroser » : ajouter l litres à eau, puis ouvrir la vanne.
  const arroser = (l) => [{ ajouter: 'eau', a: l }, { allumer: 'vanne' }];

  // Le programme : le bloc arroser est défini, puis le programme principal l’appelle à chaque relevé trop sec.
  const surveille = (liste, seuil, l) => [
    { definir: 'arroser', faire: arroser(l) },
    { mettre: 'eau', a: 0 },
    { liste: 'relevés', valeurs: liste },
    { pourChaque: 'm', dans: 'relevés', faire: [{ si: { op: '<', g: { v: 'm' }, d: seuil }, alors: [{ appeler: 'arroser' }], sinon: [{ eteindre: 'vanne' }] }] },
    { dire: { v: 'eau' } },
  ];

  // Le programme à jouer pas à pas : un relevé, et un vrai appel du bloc arroser si la terre est sèche.
  const JOUE = [
    { definir: 'arroser', faire: arroser(3) },
    { mettre: 'eau', a: 0 },
    { si: { op: '<', g: { entree: 'humidité' }, d: 40 }, alors: [{ appeler: 'arroser' }], sinon: [{ eteindre: 'vanne' }] },
    { dire: { v: 'eau' } },
  ];

  // Un sous-programme appelé une fois, puis plusieurs fois dans une boucle.
  const appels = (l, a, n) => [
    { definir: 'arroser', faire: arroser(l) },
    { mettre: 'eau', a },
    { appeler: 'arroser' },
    { repeter: n, faire: [{ appeler: 'arroser' }] },
    { dire: { v: 'eau' } },
  ];

  // Un seul relevé : la vanne s’ouvre si la terre est plus sèche que le seuil.
  const unReleve = (seuil) => [{ si: { op: '<', g: { entree: 'humidité' }, d: seuil }, alors: [{ allumer: 'vanne' }], sinon: [{ eteindre: 'vanne' }] }];

  // Le portail : le moteur tourne si une voiture attend et si rien ne barre le passage.
  const portail = [{
    si: { op: 'et', g: { op: '=', g: { entree: 'voiture' }, d: 1 }, d: { op: '=', g: { entree: 'obstacle' }, d: 0 } },
    alors: [{ allumer: 'moteur' }], sinon: [{ eteindre: 'moteur' }],
  }];

  // Boucle qui surveille : on arrose par petites quantités tant que la terre est trop sèche.
  const tantSec = (h0, seuil, pas) => [
    { mettre: 'humidité', a: h0 },
    { mettre: 'arrosages', a: 0 },
    { tantQue: { op: '<', g: { v: 'humidité' }, d: seuil }, faire: [{ ajouter: 'humidité', a: pas }, { ajouter: 'arrosages', a: 1 }] },
    { dire: { v: 'arrosages' } },
  ];

  const sous = (liste, seuil) => liste.filter((m) => m < seuil).length;
  const vanne = (ouverte) => (ouverte ? 'La vanne est ouverte' : 'La vanne est fermée');
  const PRINCIPAL = surveille([30, 60, 20], 40, 3);
  const VANNE = 'Ici, « allumer vanne » ouvre la vanne et « éteindre vanne » la ferme.';

  return {
    id: 'programme-structure',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'Piloter un objet réel',
    classe: '3e',
    univers: ['dehors', 'champetre', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Programmer » : programme structuré, sous-programme, capteurs et actionneurs, boucle de surveillance d’un objet réel.',

    accroche: {
      texte: 'Laure part en voyage. Qui arrosera ses tomates ? Rachel et Clarisse installent un arroseur automatique. ' +
        'Un petit appareil mesure la terre, et une vanne s’ouvre quand elle est sèche.',
      image: image(PRINCIPAL, 'Le programme de l’arroseur, écrit en mots. Un relevé d’humidité est lu à chaque passage. ' + VANNE + ' Le programme :'),
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: JOUE,
      entrees: { humidité: 30 },
      choix: { humidité: [20, 60] },
      essais: 2,
      etapes: [VANNE],
      consigne: 'Joue le programme : tu entres dans le bloc arroser, tu suis ses lignes, puis tu reviens au programme principal. Mets ensuite l’humidité à 60, et rejoue : le bloc arroser n’est plus appelé.',
    },

    decouverte: {
      texte: (c) => 'Regarde le petit appareil planté dans la terre : c’est ' + c.mot('capteur') + '. ' +
        'Regarde la vanne qui s’ouvre : c’est ' + c.mot('actionneur') + '. ' +
        'Regarde le bloc arroser, défini au début, et appelé ensuite. C’est ' + c.mot('sousProgramme') + '. ' +
        'L’astuce : on mesure, on décide, on agit.',
    },

    vocabulaire: {
      termes: {
        capteur: { sesMots: 'ce qui mesure pour l’objet', officiel: 'un capteur', lesDeux: 'ce qui mesure pour l’objet, que les informaticiens appellent un capteur' },
        actionneur: { sesMots: 'ce qui agit pour l’objet', officiel: 'un actionneur', lesDeux: 'ce qui agit pour l’objet, que les informaticiens appellent un actionneur' },
        sousProgramme: { sesMots: 'un petit groupe d’ordres à part, avec un nom', officiel: 'un sous-programme', lesDeux: 'un petit groupe d’ordres à part, avec un nom, que les informaticiens appellent un sous-programme' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce qui mesure, ce qui agit, et le petit groupe d’ordres à part. Les informaticiens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les informaticiens disent : un capteur, pour ce qui mesure ; un actionneur, pour ce qui agit. Et un sous-programme, pour le groupe d’ordres à part.',
        'Tu connais les mots officiels : le capteur mesure, l’actionneur agit, et le sous-programme range un groupe d’ordres.',
      ],
    },

    exercices: [
      O.qcm('capteur-ou-actionneur', 'appareils',
        [['La sonde d’humidité', 'Un capteur', 'Elle mesure la terre : elle envoie une information.'],
          ['L’électrovanne', 'Un actionneur', 'Elle agit : elle laisse passer l’eau.'],
          ['La cellule qui voit une voiture', 'Un capteur', 'Elle détecte : elle envoie une information.'],
          ['Le moteur du portail', 'Un actionneur', 'Il agit : il fait bouger le portail.'],
          ['Le détecteur de pluie', 'Un capteur', 'Il détecte la pluie : il envoie une information.'],
          ['Le voyant qui clignote', 'Un actionneur', 'Il agit : il montre quelque chose.']],
        (x) => '« ' + x + ' » Est-ce un capteur ou un actionneur ?', ['Un capteur', 'Un actionneur'],
        'Cet élément mesure le monde, ou il agit sur lui ?'),
      {
        id: 'portail-securite',
        univers: 'dehors',
        // [voiture : 1 si une voiture attend, obstacle : 1 si quelque chose barre le passage]
        versions: [[1, 0], [1, 1], [0, 0], [0, 1]],
        genere(c) {
          const [v, o] = c.alea.choisir(this.versions);
          const tourne = Boolean(PB.executer(portail, { voiture: v, obstacle: o }).sorties.moteur);
          const juste = tourne ? 'Le moteur tourne' : 'Le moteur est arrêté';
          return {
            enonce: 'Le portail de l’atelier a deux capteurs : voiture vaut 1 si une voiture attend, obstacle vaut 1 si quelque chose barre le passage. Voici son programme : ' + PB.enMots(portail) + '. Ici, voiture vaut ' + v + ' et obstacle vaut ' + o + '. Que fait le moteur ?',
            image: imageCourte(portail,'Le programme du portail. Voiture vaut ' + v + ' et obstacle vaut ' + o + '. Le programme :'),
            reponse: O.choix(c.alea, juste, [tourne ? 'Le moteur est arrêté' : 'Le moteur tourne', 'Le moteur tourne à l’envers']),
            aide: 'Le moteur ne tourne que si les deux conditions sont vraies.',
            correction: [v === 1 ? 'Une voiture attend : voiture vaut 1.' : 'Aucune voiture n’attend : voiture vaut 0.', o === 0 ? 'Rien ne barre le passage : obstacle vaut 0.' : 'Quelque chose barre le passage : obstacle vaut 1.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'arrosage-un-releve',
        univers: 'champetre',
        // [nombre du programme, humidité mesurée]
        versions: [[40, 25], [40, 60], [35, 35], [50, 48], [30, 70]],
        genere(c) {
          const [s, h] = c.alea.choisir(this.versions);
          const ouverte = Boolean(PB.executer(unReleve(s), { humidité: h }).sorties.vanne);
          const juste = vanne(ouverte);
          return {
            enonce: 'Voici le programme de l’arroseur : ' + PB.enMots(unReleve(s)) + '. ' + VANNE + ' L’humidité mesurée vaut ' + h + '. Que fait la vanne ?',
            image: image(unReleve(s), 'Le programme de l’arroseur. L’humidité mesurée vaut ' + h + '. ' + VANNE + ' Le programme :'),
            reponse: O.choix(c.alea, juste, [vanne(!ouverte), 'La vanne s’ouvre puis se ferme']),
            aide: 'Compare la mesure au nombre du programme, puis choisis la ligne jouée.',
            correction: [h < s ? h + ' est plus petit que ' + s + ' : la terre est sèche, la condition est vraie.' : h + ' n’est pas plus petit que ' + s + ' : la condition est fausse.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'litres-du-jour',
        univers: 'champetre',
        // [nombre du programme, litres par arrosage, relevés]
        versions: [[40, 3, [25, 50, 30, 45, 20]], [30, 2, [35, 20, 28, 40, 10, 5]], [50, 4, [60, 55, 52, 48]], [35, 5, [30, 34, 35, 36]], [45, 2, [40, 44, 45, 50, 10]]],
        genere(c) {
          const [s, l, liste] = c.alea.choisir(this.versions);
          const prog = surveille(liste, s, l);
          const eau = PB.executer(prog).dits[0];
          const n = eau / l;
          return {
            enonce: VANNE + ' Voici le programme, avec le bloc arroser défini au début : ' + PB.enMots(prog) + '. Que dit-il à la fin ?',
            image: image(prog, 'Le programme complet de l’arroseur. Les relevés valent ' + liste.join(', ') + ', le nombre de comparaison vaut ' + s + ' et chaque arrosage ajoute ' + l + ' litres. Le programme :'),
            reponse: { type: 'nombre', valeur: eau },
            aide: 'Compte les relevés plus petits que le nombre du programme, puis multiplie.',
            correction: ['Les relevés sont ' + liste.join(', ') + '.', 'Ceux plus petits que ' + s + ' sont au nombre de ' + n + ' : la vanne arrose ' + n + ' fois.', n + ' × ' + l + ' = ' + eau + ' litres.'],
          };
        },
      },
      {
        id: 'appel-sous-programme',
        univers: 'champetre',
        // [litres par arrosage, eau au départ, tours de la boucle]
        versions: [[3, 0, 2], [2, 5, 3], [4, 1, 2], [5, 10, 2], [2, 0, 4]],
        genere(c) {
          const [l, a, n] = c.alea.choisir(this.versions);
          const prog = appels(l, a, n);
          const eau = PB.executer(prog).dits[0];
          return {
            enonce: 'Clarisse programme l’arrosage des tomates de Laure. Elle définit un bloc arroser, puis elle l’appelle dans le programme principal. ' + VANNE + ' Voici le programme : ' + PB.enMots(prog) + '. Quelle quantité d’eau, en litres, le programme dit-il à la fin ?',
            image: image(prog, 'Le programme de Clarisse. Le bloc arroser ajoute ' + l + ' litres. Le programme :'),
            reponse: { type: 'nombre', valeur: eau },
            aide: 'Compte les appels du bloc arroser : un appel seul, puis ceux de la boucle.',
            correction: ['Le bloc arroser n’est joué que s’il est appelé. Chaque appel ajoute ' + l + ' litres.', 'Un appel seul, puis ' + n + ' dans la boucle : ' + (n + 1) + ' appels.', a + ' + ' + (n + 1) + ' × ' + l + ' = ' + eau + ' litres.'],
          };
        },
      },
      {
        id: 'arroser-tant-que',
        univers: 'dehors',
        // [humidité au départ, nombre à atteindre, humidité gagnée à chaque arrosage]
        versions: [[20, 60, 10], [35, 60, 10], [40, 70, 15], [10, 50, 20], [25, 60, 20]],
        genere(c) {
          const [h0, s, pas] = c.alea.choisir(this.versions);
          const prog = tantSec(h0, s, pas);
          const n = PB.executer(prog).dits[0];
          const pasEcrits = [];
          for (let h = h0, k = 1; h < s; k++) { h += pas; pasEcrits.push('Arrosage ' + k + ' : l’humidité vaut ' + h + '.'); }
          return {
            enonce: 'Voici une boucle qui surveille : ' + PB.enMots(prog) + '. Que dit le programme à la fin ?',
            image: image(prog, 'La boucle qui surveille. L’humidité de départ vaut ' + h0 + ', le nombre à atteindre vaut ' + s + ' et chaque arrosage ajoute ' + pas + '. Le programme :'),
            reponse: { type: 'nombre', valeur: n },
            aide: 'Joue la boucle tour par tour, jusqu’à ce que la condition devienne fausse.',
            correction: ['Au départ, l’humidité vaut ' + h0 + '.'].concat(pasEcrits, ['Maintenant, ' + (h0 + n * pas) + ' n’est pas plus petit que ' + s + ' : la boucle s’arrête. Le programme dit ' + n + '.']),
          };
        },
      },
    ],

    defi: {
      // [relevés, nombre du programme, litres par arrosage]
      versions: [[[30, 50, 20, 45, 25], 40, 3], [[60, 35, 55, 30, 70], 50, 4], [[45, 20, 38, 52, 48, 15], 45, 2], [[22, 48, 50, 60, 18, 55], 35, 5]],
      genere(c) {
        const [liste, s, l] = c.alea.choisir(this.versions);
        const prog = surveille(liste, s, l);
        const res = PB.executer(prog);
        const n = sous(liste, s);
        const ouverte = Boolean(res.sorties.vanne);
        return {
          enonce: 'Laure est en voyage. Rachel et Clarisse programment l’arroseur des tomates. Un capteur d’humidité fait un relevé à chaque passage, et la vanne s’ouvre si la terre est sèche. ' +
            'Dans ce programme, « allumer vanne » ouvre la vanne et « éteindre vanne » la ferme. ' +
            'Voici le programme, avec le bloc arroser défini au début : ' + PB.enMots(prog) + '.',
          image: image(prog, 'Le programme complet de l’arroseur. Les relevés valent ' + liste.join(', ') + ', le nombre de comparaison vaut ' + s + ' et chaque arrosage ajoute ' + l + ' litres. Le programme :'),
          questions: [
            {
              texte: 'Question 1. Combien de fois le programme principal appelle-t-il le bloc arroser ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Le bloc est appelé pour chaque relevé plus petit que le nombre du programme.',
              correction: ['Les relevés sont ' + liste.join(', ') + '.', 'Ceux plus petits que ' + s + ' sont au nombre de ' + n + ' : le bloc arroser est appelé ' + n + ' fois.'],
            },
            {
              texte: 'Question 2. Combien de litres d’eau le programme dit-il à la fin ?',
              reponse: { type: 'nombre', valeur: n * l },
              aide: 'Multiplie le nombre d’arrosages par les litres de chaque arrosage.',
              correction: [n + ' × ' + l + ' = ' + n * l + ' litres.'],
            },
            {
              texte: 'Question 3. Après le dernier relevé, la vanne est-elle ouverte ?',
              reponse: O.choix(c.alea, ouverte ? 'Oui, elle est ouverte' : 'Non, elle est fermée', [ouverte ? 'Non, elle est fermée' : 'Oui, elle est ouverte', 'On ne peut pas savoir']),
              aide: 'Regarde seulement le dernier relevé de la liste.',
              correction: ['Le dernier relevé vaut ' + liste[liste.length - 1] + '.', ouverte ? liste[liste.length - 1] + ' est plus petit que ' + s + ' : la vanne s’ouvre.' : liste[liste.length - 1] + ' n’est pas plus petit que ' + s + ' : la vanne se ferme.', 'Réponse : ' + (ouverte ? 'Oui, elle est ouverte.' : 'Non, elle est fermée.')],
            },
            {
              texte: 'Question 4. Nomme le capteur et l’actionneur de l’arroseur. Explique pourquoi on écrit « arroser » dans un sous-programme.',
              correction: ['Le capteur est la sonde d’humidité ; l’actionneur est la vanne.', 'Le sous-programme range les ordres d’arrosage sous un nom : on les écrit une fois et on les appelle quand on en a besoin.'],
              grille: ['As-tu nommé le capteur, la sonde d’humidité ?', 'As-tu nommé l’actionneur, la vanne ?', 'As-tu dit que le sous-programme évite de réécrire les mêmes ordres ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais faire mesurer, décider et agir un objet réel, avec un programme bien rangé.',
    carte: ['capteur-ou-actionneur', 'portail-securite', 'arrosage-un-releve'],
    papierDuSoir: { exercices: ['litres-du-jour', 'appel-sous-programme'], defi: true },
    automatismes: [
      {
        id: 'litres-simples',
        versions: [[3, 2], [4, 5], [6, 3], [5, 4]],
        genere(c) { const [n, l] = c.alea.choisir(this.versions); return { enonce: 'La vanne arrose ' + n + ' fois, avec ' + l + ' litres à chaque fois. Combien de litres en tout ?', reponse: { type: 'nombre', valeur: n * l } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, Grace Hopper a conçu en 1952 le compilateur A-0, qui gérait des sous-programmes.',
    prenoms: ['Rachel', 'Laure', 'Clarisse'],
  };
});
