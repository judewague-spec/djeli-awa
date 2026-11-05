/* Notion 2 du bloc de technologie « Programmer » : entrées et sorties. La veilleuse de Rebecca.
   Les programmes sont écrits en mots (lisibles au lecteur d’écran) et exécutés en code (js/programme-blocs.js).
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const image = (prog, intro) => ({ dessin: 'programme', lignes: PB.lignes(prog), description: intro + ' ' + PB.enMots(prog) + '.' });
  // Le dessin n’a que 300 de large : les lignes les plus longues y perdent « l’entrée » ; la description reste entière.
  const imageCourte = (prog, intro) => Object.assign(image(prog, intro), { lignes: PB.lignes(prog).map((l) => l.split('l’entrée ').join('')) });
  const lum = { entree: 'lumière' };

  // La veilleuse : la lampe s’allume si la lumière est plus petite que le seuil.
  const veilleuse = (seuil) => [{ si: { op: '<', g: lum, d: seuil }, alors: [{ allumer: 'lampe' }], sinon: [{ eteindre: 'lampe' }] }];

  // Veilleuse avec détecteur de présence : il faut qu’il fasse sombre ET que quelqu’un soit là.
  const avecPresence = (seuil) => [{
    si: { op: 'et', g: { op: '<', g: lum, d: seuil }, d: { op: '=', g: { entree: 'présence' }, d: 1 } },
    alors: [{ allumer: 'lampe' }], sinon: [{ eteindre: 'lampe' }],
  }];

  // Une mesure par période : on compte (en périodes de pas heures) le temps où il fait sombre.
  const relevés = (liste, seuil, pas) => [
    { mettre: 'heures', a: 0 },
    { liste: 'relevés', valeurs: liste },
    { pourChaque: 'm', dans: 'relevés', faire: [{ si: { op: '<', g: { v: 'm' }, d: seuil }, alors: [{ allumer: 'lampe' }, { ajouter: 'heures', a: pas }], sinon: [{ eteindre: 'lampe' }] }] },
    { dire: { v: 'heures' } },
  ];

  const sombres = (liste, seuil) => liste.filter((m) => m < seuil).length;
  const etat = (allumee) => (allumee ? 'La lampe est allumée' : 'La lampe est éteinte');

  return {
    id: 'prog-entrees-sorties',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'Entrées et sorties',
    classe: 'cycle 4',
    univers: ['appareils', 'famille', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Programmer » : entrées, sorties, condition et seuil d’un programme qui pilote un objet.',

    accroche: {
      texte: 'Rebecca a peur du noir. Rachel répare une petite veilleuse pour elle. ' +
        'La veilleuse doit s’allumer toute seule quand la nuit tombe. Comment sait-elle qu’il fait noir ? Un petit œil mesure la lumière de la chambre.',
      image: image(veilleuse(50), 'Le programme de la veilleuse, écrit en mots. La lumière de la chambre est mesurée. Le programme :'),
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: veilleuse(50),
      entrees: { lumière: 80 },
      choix: { lumière: [20, 80] },
      essais: 2,
      consigne: 'Joue le programme ligne par ligne. Puis change la lumière, rejoue-le, et regarde la lampe.',
    },

    decouverte: {
      texte: (c) => 'Regarde la lumière de la chambre : c’est ' + c.mot('entree') + '. ' +
        'Regarde la lampe qui s’allume : c’est ' + c.mot('sortie') + '. ' +
        'Regarde le nombre de comparaison dans le programme : c’est ' + c.mot('seuil') + '. ' +
        'L’astuce : l’objet reçoit, il compare, il agit.',
    },

    vocabulaire: {
      termes: {
        entree: { sesMots: 'ce que l’objet reçoit du monde', officiel: 'une entrée', lesDeux: 'ce que l’objet reçoit du monde, que les informaticiens appellent une entrée' },
        sortie: { sesMots: 'ce que l’objet fait en réponse', officiel: 'une sortie', lesDeux: 'ce que l’objet fait en réponse, que les informaticiens appellent une sortie' },
        seuil: { sesMots: 'le nombre qui fait changer la décision', officiel: 'un seuil', lesDeux: 'le nombre qui fait changer la décision, que les informaticiens appellent un seuil' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce que l’objet reçoit, ce qu’il fait, et le nombre qui fait changer la décision. Les informaticiens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les informaticiens disent : une entrée, pour ce que l’objet reçoit ; une sortie, pour ce qu’il fait. Et un seuil, pour le nombre qui change la décision.',
        'Tu connais les mots officiels : l’entrée est reçue, la sortie agit, et le seuil fait changer la décision.',
      ],
    },

    exercices: [
      O.qcm('entree-ou-sortie', 'appareils',
        [['Le capteur de lumière', 'Une entrée', 'Il mesure la lumière : il envoie une information à l’objet.'],
          ['La lampe', 'Une sortie', 'Elle agit : elle s’allume ou s’éteint.'],
          ['Le bouton-poussoir', 'Une entrée', 'Un appui envoie une information à l’objet.'],
          ['Le haut-parleur', 'Une sortie', 'Il agit : il fait du bruit.'],
          ['Le thermomètre', 'Une entrée', 'Il mesure la température : il envoie une information à l’objet.'],
          ['Le moteur du ventilateur', 'Une sortie', 'Il agit : il fait tourner l’hélice.']],
        (x) => '« ' + x + ' » Est-ce une entrée ou une sortie de l’objet ?', ['Une entrée', 'Une sortie'],
        'Cet élément mesure le monde, ou il agit sur lui ?'),
      {
        id: 'lampe-veilleuse',
        univers: 'famille',
        // [nombre du programme, lumière mesurée]
        versions: [[50, 20], [50, 80], [30, 30], [40, 35], [60, 75]],
        genere(c) {
          const [s, l] = c.alea.choisir(this.versions);
          const prog = veilleuse(s);
          const allumee = Boolean(PB.executer(prog, { lumière: l }).sorties.lampe);
          const juste = etat(allumee);
          return {
            enonce: 'Voici le programme de la veilleuse, écrit en mots : ' + PB.enMots(prog) + '. La lumière mesurée vaut ' + l + '. Que fait la lampe ?',
            image: image(prog, 'Le programme de la veilleuse. La lumière mesurée vaut ' + l + '. Le programme :'),
            reponse: O.choix(c.alea, juste, [etat(!allumee), 'La lampe clignote']),
            aide: 'Compare la lumière au nombre du programme, puis choisis la ligne jouée.',
            correction: [l < s ? l + ' est plus petit que ' + s + ' : la condition est vraie.' : l + ' n’est pas plus petit que ' + s + ' : la condition est fausse.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'plus-grande-lumiere',
        univers: 'maison-courses',
        // nombre du programme
        versions: [50, 30, 40, 60, 25],
        genere(c) {
          const s = c.alea.choisir(this.versions);
          let max = -1;
          for (let l = 0; l <= 100; l++) if (PB.executer(veilleuse(s), { lumière: l }).sorties.lampe) max = l;
          return {
            enonce: 'Voici le programme de la veilleuse : ' + PB.enMots(veilleuse(s)) + '. La lumière est un nombre entier. Quelle est la plus grande lumière pour laquelle la lampe est allumée ?',
            image: image(veilleuse(s), 'Le programme de la veilleuse. Le nombre de comparaison vaut ' + s + '. Le programme :'),
            reponse: { type: 'nombre', valeur: max },
            aide: 'Cherche le plus grand nombre entier plus petit que le nombre du programme.',
            correction: ['Il faut une lumière plus petite que ' + s + '.', 'Le plus grand nombre entier plus petit que ' + s + ' est ' + max + '.'],
          };
        },
      },
      {
        id: 'veilleuse-presence',
        univers: 'famille',
        // [nombre du programme, lumière mesurée, présence : 1 si quelqu’un est là]
        versions: [[50, 20, 1], [50, 20, 0], [40, 70, 1], [30, 25, 1], [60, 65, 0]],
        genere(c) {
          const [s, l, p] = c.alea.choisir(this.versions);
          const prog = avecPresence(s);
          const allumee = Boolean(PB.executer(prog, { lumière: l, présence: p }).sorties.lampe);
          const juste = etat(allumee);
          return {
            enonce: 'Rachel ajoute un détecteur de présence : la présence vaut 1 si quelqu’un est dans la chambre, 0 sinon. Voici le programme : ' + PB.enMots(prog) + '. La lumière mesurée vaut ' + l + ' et la présence vaut ' + p + '. Que fait la lampe ?',
            image: imageCourte(prog, 'Le programme avec le détecteur de présence. La lumière mesurée vaut ' + l + ' et la présence vaut ' + p + '. Le programme :'),
            reponse: O.choix(c.alea, juste, [etat(!allumee), 'La lampe clignote']),
            aide: 'La lampe ne s’allume que si les deux conditions sont vraies.',
            correction: [
              l < s ? 'Il fait sombre : ' + l + ' est plus petit que ' + s + '.' : 'Il ne fait pas assez sombre : ' + l + ' n’est pas plus petit que ' + s + '.',
              p === 1 ? 'Quelqu’un est là : la présence vaut 1.' : 'Personne n’est là : la présence vaut 0.',
              (l < s && p === 1 ? 'Les deux conditions sont vraies.' : 'Au moins une condition est fausse, donc « et » est faux.') + ' Réponse : ' + juste + '.',
            ],
          };
        },
      },
      {
        id: 'heures-sombres',
        univers: 'famille',
        // [nombre du programme, liste des mesures, une mesure par heure]
        versions: [[50, [80, 60, 30, 20, 40, 90]], [40, [10, 45, 40, 35, 5]], [30, [30, 29, 31, 28]], [60, [70, 65, 55, 50, 62, 10, 5]], [20, [25, 15, 22, 5, 30]]],
        genere(c) {
          const [s, liste] = c.alea.choisir(this.versions);
          const prog = relevés(liste, s, 1);
          const n = PB.executer(prog).dits[0];
          return {
            enonce: 'La veilleuse note la lumière une fois par heure. Voici son programme : ' + PB.enMots(prog) + '. Que dit-il à la fin ?',
            image: image(prog, 'Le programme qui compte les heures sombres. La liste des mesures vaut ' + liste.join(', ') + ' et le nombre de comparaison vaut ' + s + '. Le programme :'),
            reponse: { type: 'nombre', valeur: n },
            aide: 'Compte les mesures plus petites que le nombre du programme.',
            correction: ['Les mesures sont ' + liste.join(', ') + '.', 'Celles plus petites que ' + s + ' sont au nombre de ' + n + '.', 'Le programme ajoute 1 à chaque fois : il dit ' + n + '.'],
          };
        },
      },
    ],

    defi: {
      // [liste des mesures, nombre du programme, heures entre deux mesures]
      versions: [[[80, 40, 15, 10, 60], 40, 2], [[10, 20, 70, 90], 30, 3], [[20, 45, 15, 35, 60, 10], 40, 2], [[60, 30, 10], 50, 4]],
      genere(c) {
        const [liste, s, pas] = c.alea.choisir(this.versions);
        const prog = relevés(liste, s, pas);
        const n = sombres(liste, s);
        const premiere = liste[0] < s;
        return {
          enonce: 'Rebecca dort mal. Rachel règle la veilleuse : elle note la lumière toutes les ' + pas + ' heures. Elle compte les heures où la lampe est allumée. ' +
            'Voici son programme : ' + PB.enMots(prog) + '.',
          image: image(prog, 'Le programme de la nuit. La liste des mesures vaut ' + liste.join(', ') + ', le nombre de comparaison vaut ' + s + ', et il y a ' + pas + ' heures entre deux mesures. Le programme :'),
          questions: [
            {
              texte: 'Question 1. Pour combien de mesures la lumière est-elle plus petite que le nombre de comparaison ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Compte les mesures plus petites que le nombre de comparaison.',
              correction: ['Les mesures sont ' + liste.join(', ') + '.', 'Celles plus petites que ' + s + ' sont au nombre de ' + n + '.'],
            },
            {
              texte: 'Question 2. Combien d’heures la lampe est-elle allumée, selon le programme ?',
              reponse: { type: 'nombre', valeur: n * pas },
              aide: 'Multiplie le nombre de mesures sombres par les heures de chaque mesure.',
              correction: [n + ' × ' + pas + ' = ' + n * pas + ' heures.'],
            },
            {
              texte: 'Question 3. À la première mesure, la lampe est-elle allumée ?',
              reponse: O.choix(c.alea, premiere ? 'Oui, elle est allumée' : 'Non, elle est éteinte', [premiere ? 'Non, elle est éteinte' : 'Oui, elle est allumée', 'On ne peut pas savoir']),
              aide: 'Regarde seulement la première mesure de la liste.',
              correction: ['La première mesure vaut ' + liste[0] + '.', premiere ? liste[0] + ' est plus petit que ' + s + ' : la lampe est allumée.' : liste[0] + ' n’est pas plus petit que ' + s + ' : la lampe est éteinte.', 'Réponse : ' + (premiere ? 'Oui, elle est allumée.' : 'Non, elle est éteinte.')],
            },
            {
              texte: 'Question 4. Dans ce programme, quelle est l’entrée, quelle est la sortie, et à quoi sert le nombre de comparaison ?',
              correction: ['L’entrée est la lumière mesurée, notée dans la liste relevés.', 'La sortie est la lampe.', 'Le nombre de comparaison est le seuil : il décide quand la lampe s’allume.'],
              grille: ['As-tu dit que l’entrée est la lumière mesurée ?', 'As-tu dit que la sortie est la lampe ?', 'As-tu dit que le seuil fait changer la décision ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais ce que l’objet reçoit, ce qu’il fait, et le nombre qui change sa décision.',
    carte: ['entree-ou-sortie', 'lampe-veilleuse', 'veilleuse-presence'],
    papierDuSoir: { exercices: ['plus-grande-lumiere', 'heures-sombres'], defi: true },
    automatismes: [
      {
        id: 'plus-petit-que',
        versions: [[20, 50], [80, 50], [50, 50], [49, 50]],
        genere(c) {
          const [l, s] = c.alea.choisir(this.versions);
          return { enonce: 'La lumière vaut ' + l + '. Le seuil vaut ' + s + '. La lampe s’allume si la lumière est plus petite que le seuil. Allumée : 1, éteinte : 0.', reponse: { type: 'nombre', valeur: l < s ? 1 : 0 } };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, Ushahidi rassemble textos, photos et messages de téléphones sur une carte.',
    prenoms: ['Rebecca', 'Rachel'],
  };
});
