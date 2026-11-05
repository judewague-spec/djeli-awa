/* Notion 4 du bloc « L'énergie » : la centrale électrique. La visite de Rachel avec sa tante Clarisse.
   Les nombres des exercices sont des exemples de la notion.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const gr = (x) => { const [a, b] = String(x).split('.'); return a.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (b ? ',' + b : ''); };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const EAU = 'L’eau d’un barrage', URA = 'L’uranium', GAZ = 'Le gaz', CHAR = 'Le charbon';
  const TUR = 'La turbine', ALT = 'L’alternateur', LIG = 'Les lignes électriques';
  const CENTRALES = [
    { nom: 'hydraulique', etapes: ['l’eau du barrage', 'la turbine', 'l’alternateur', 'les lignes électriques'] },
    { nom: 'thermique à gaz', etapes: ['le gaz brûlé', 'l’eau chauffée en vapeur', 'la turbine', 'l’alternateur'] },
    { nom: 'nucléaire', etapes: ['l’uranium', 'l’eau chauffée en vapeur', 'la turbine', 'l’alternateur'] },
  ];
  // [description, source, la turbine est-elle poussée par de la vapeur ?]
  const TYPES = [
    ['une centrale hydraulique construite au pied d’un barrage', EAU, false],
    ['une centrale thermique qui brûle du gaz', GAZ, true],
    ['une centrale nucléaire', URA, true],
    ['une centrale thermique qui brûle du charbon', CHAR, true],
  ];

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
    id: 'centrale-electrique',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'La centrale électrique',
    classe: 'cycle 4',
    univers: ['maison-courses', 'famille', 'dehors'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : production d’électricité dans une centrale hydraulique, thermique ou nucléaire ; turbine et alternateur.',

    accroche: {
      texte: 'Rachel visite une centrale avec Clarisse. Une grande roue tourne vite. Elle entraîne une machine qui fabrique le courant. Mais qui pousse la roue ?',
      image: { dessin: 'chaine', etapes: ['Une source d’énergie', 'La grande roue tourne', 'La machine fabrique le courant'], description: 'Une source d’énergie pousse une grande roue. La roue tourne et entraîne une machine, qui fabrique le courant électrique.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['L’eau ou la vapeur pousse la grande roue', 'La roue entraîne la machine', 'La machine fabrique le courant'], description: 'L’eau ou la vapeur pousse la grande roue. La roue entraîne la machine, qui fabrique le courant électrique.' },
      etapes: [
        'Dans une centrale, quelque chose pousse une grande roue à pales. La roue tourne vite.',
        'La roue entraîne une machine. En tournant, cette machine fabrique le courant électrique.',
        'Dans une centrale à eau, l’eau d’un barrage tombe et pousse la roue.',
        'Dans une centrale à gaz ou à charbon, on brûle le combustible pour chauffer de l’eau. La vapeur pousse la roue.',
        'Dans une centrale nucléaire, l’uranium chauffe l’eau. La vapeur pousse la roue, comme ailleurs.',
        'Partout, l’énergie de départ devient du mouvement, puis de l’électricité.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans la centrale, l’eau ou la vapeur pousse ' + c.mot('turbine') + '. ' +
        'Elle entraîne ensuite ' + c.mot('alternateur') + '. ' +
        'Quand l’eau d’un barrage pousse la roue, on parle d’' + c.mot('hydraulique') + '. ' +
        'Quand on brûle du gaz ou du charbon pour chauffer l’eau, on parle d’' + c.mot('thermique') + '. ' +
        'Avec l’uranium, on parle d’une centrale nucléaire. ' +
        'L’astuce : la source change, mais dans ces centrales la fin est la même. Une roue tourne, et le courant sort.',
    },

    vocabulaire: {
      termes: {
        turbine: { sesMots: 'la grande roue à pales', officiel: 'la turbine', lesDeux: 'la grande roue à pales, appelée turbine' },
        alternateur: { sesMots: 'la machine qui fabrique le courant', officiel: 'l’alternateur', lesDeux: 'la machine qui fabrique le courant, appelée alternateur' },
        hydraulique: { sesMots: 'une centrale à eau', officiel: 'une centrale hydraulique', lesDeux: 'une centrale à eau, appelée centrale hydraulique' },
        thermique: { sesMots: 'une centrale à flamme', officiel: 'une centrale thermique', lesDeux: 'une centrale à flamme, appelée centrale thermique' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la grande roue, la machine qui fabrique le courant, la centrale à eau et la centrale à flamme. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la turbine, l’alternateur, la centrale hydraulique et la centrale thermique.',
        'Tu connais les mots officiels : turbine, alternateur, hydraulique et thermique. Tu sais aussi dire d’où vient l’énergie de départ.',
      ],
    },

    exercices: [
      Q('quelle-source', 'maison-courses', [
        ['une centrale hydraulique', EAU, [URA, CHAR], 'Une centrale hydraulique utilise l’eau d’un barrage qui tombe.'],
        ['une centrale nucléaire', URA, [EAU, CHAR], 'Une centrale nucléaire utilise l’énergie cachée dans l’uranium.'],
        ['une centrale thermique qui brûle du gaz', GAZ, [EAU, URA], 'Cette centrale brûle du gaz pour chauffer l’eau.'],
        ['une centrale thermique qui brûle du charbon', CHAR, [EAU, URA], 'Cette centrale brûle du charbon pour chauffer l’eau.'],
        ['une centrale construite au pied d’un barrage', EAU, [URA, GAZ], 'Au pied d’un barrage, c’est l’eau qui tombe qui pousse la roue.'],
        ['une centrale qui utilise l’énergie cachée dans l’uranium', URA, [EAU, GAZ], 'L’énergie cachée dans l’uranium est la source d’une centrale nucléaire.'],
      ], (x) => 'Clarisse montre à Rachel ' + x + '. Quelle est sa source d’énergie ?', 'Cherche ce qui donne l’énergie de départ : de l’eau, du gaz, du charbon ou de l’uranium. Hydraulique veut dire à eau, et thermique veut dire à flamme.'),

      Q('quelle-piece', 'famille', [
        ['fabrique le courant électrique en tournant', ALT, [TUR, LIG], 'L’alternateur est la machine qui fabrique le courant.'],
        ['est poussée par l’eau ou par la vapeur', TUR, [ALT, LIG], 'La turbine est la grande roue poussée par l’eau ou par la vapeur.'],
        ['est entraînée par la turbine', ALT, [TUR, LIG], 'La turbine entraîne l’alternateur, qui produit le courant.'],
        ['fait tourner l’alternateur', TUR, [ALT, LIG], 'L’eau pousse la turbine, et la turbine entraîne ensuite l’alternateur.'],
        ['reçoit en premier l’énergie de l’eau qui tombe', TUR, [ALT, LIG], 'L’eau tombe sur la turbine avant d’arriver à l’alternateur.'],
        ['produit l’électricité quand on la fait tourner', ALT, [TUR, LIG], 'L’alternateur est la machine qui produit l’électricité.'],
      ], (x) => 'Dans une centrale, quelle pièce ' + x + ' ?', 'La turbine est la grande roue. L’alternateur est la machine qui fabrique le courant.'),

      {
        id: 'ordre-de-la-centrale',
        univers: 'dehors',
        // [numéro de la centrale, numéro de l'étape citée, étape demandée : après ou avant]
        versions: [[0, 1, 'après'], [0, 3, 'avant'], [1, 0, 'après'], [1, 2, 'avant'], [2, 1, 'après'], [2, 3, 'avant']],
        genere(c) {
          const [k, i, sens] = c.alea.choisir(this.versions);
          const ch = CENTRALES[k].etapes, x = ch[i], juste = ch[sens === 'après' ? i + 1 : i - 1];
          const autres = ch.filter((e) => e !== x && e !== juste).slice(0, 2).map(cap);
          return {
            enonce: 'Voici les étapes d’une centrale ' + CENTRALES[k].nom + ', dans le désordre : ' + c.alea.melanger(ch.slice()).join(', ') + '. Quelle étape vient juste ' + sens + ' ' + x + ' ?',
            reponse: O.choix(c.alea, cap(juste), autres),
            aide: 'Suis l’énergie : elle part de la source et finit en courant électrique.',
            correction: ['Dans l’ordre : ' + ch.join(', puis ') + '.', 'Réponse : ' + cap(juste) + '.'],
          };
        },
      },

      {
        id: 'energie-produite',
        univers: 'maison-courses',
        // [puissance en MW, durée en heures]
        versions: [[20, 6], [50, 3], [15, 12], [100, 2], [35, 4], [8, 24]],
        genere(c) {
          const [p, t] = c.alea.choisir(this.versions);
          const e = p * t;
          return {
            enonce: 'Une petite centrale fournit une puissance de ' + p + ' MW pendant ' + t + ' heures. Quelle énergie produit-elle, en mégawattheures (MWh) ? Le MW est l’unité de puissance. Le MWh est l’unité d’énergie : un MWh, c’est un MW pendant une heure. On utilise E = P × t.',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Multiplie la puissance par la durée : ' + p + ' × ' + t + '.',
            aideParlee: 'Multiplie la puissance par la durée en heures.',
            correction: ['E = P × t = ' + p + ' × ' + t + ' = ' + e + ' MWh.'],
          };
        },
      },

      {
        id: 'foyers',
        univers: 'famille',
        // [énergie produite en MWh dans la journée, énergie utilisée par un foyer en kWh par jour]
        versions: [[30, 10], [12, 8], [24, 12], [45, 15], [60, 12], [9, 12]],
        genere(c) {
          const [e, f] = c.alea.choisir(this.versions);
          const kwh = e * 1000, n = kwh / f;
          return {
            enonce: 'Une centrale produit ' + e + ' MWh dans la journée. Un foyer utilise ' + f + ' kWh par jour. Le kWh, le kilowattheure, est mille fois plus petit : 1 MWh = 1 000 kWh. Combien de foyers cette énergie peut-elle alimenter ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Écris d’abord l’énergie en kWh, puis divise par ' + f + '.',
            aideParlee: 'Écris d’abord l’énergie en kilowattheures, puis divise par ce qu’utilise un foyer.',
            correction: [e + ' MWh = ' + e + ' × 1 000 = ' + gr(kwh) + ' kWh.', gr(kwh) + ' ÷ ' + f + ' = ' + gr(n) + ' foyers.'],
          };
        },
      },
    ],

    defi: {
      // [numéro du type de centrale, puissance en MW, durée en heures]
      versions: [[0, 40, 5], [1, 300, 4], [2, 900, 3], [3, 250, 6], [0, 60, 3]],
      genere(c) {
        const [k, p, t] = c.alea.choisir(this.versions);
        const [phrase, source, vapeur] = TYPES[k];
        const e = p * t;
        const sources = [EAU, GAZ, CHAR, URA].filter((s) => s !== source);
        return {
          enonce: 'Clarisse emmène Rachel voir ' + phrase + '. Cette centrale fournit une puissance de ' + p + ' MW pendant ' + t + ' heures. Le MW est l’unité de puissance, et le MWh est l’unité d’énergie.',
          questions: [
            {
              texte: 'Question 1. Quelle est la source d’énergie de cette centrale ?',
              reponse: O.choix(c.alea, source, sources.slice(0, 2)),
              aide: 'Cherche ce qui donne l’énergie de départ.',
              correction: ['La source de cette centrale est : ' + source.charAt(0).toLowerCase() + source.slice(1) + '.', 'Réponse : ' + source + '.'],
            },
            {
              texte: 'Question 2. Quelle énergie la centrale produit-elle en ' + t + ' heures, en mégawattheures ? On utilise E = P × t.',
              reponse: { type: 'nombre', valeur: e },
              aide: 'Multiplie la puissance par la durée en heures.',
              correction: ['E = P × t = ' + p + ' × ' + t + ' = ' + e + ' MWh.'],
            },
            {
              texte: 'Question 3. Dans cette centrale, la turbine est-elle poussée par de la vapeur ?',
              reponse: O.choix(c.alea, vapeur ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Une centrale à eau n’a pas besoin de vapeur. Une centrale qui chauffe l’eau en a besoin.',
              correction: [vapeur ? 'Oui : en brûlant, ou grâce à l’uranium, la source chauffe de l’eau, et la vapeur pousse la turbine.' : 'Non : c’est l’eau du barrage qui pousse directement la turbine.'],
            },
            {
              texte: 'Question 4. Explique comment la source d’énergie de cette centrale finit par donner du courant. Cite la turbine et l’alternateur.',
              correction: [vapeur ? 'En brûlant, ou grâce à l’uranium, la source chauffe de l’eau. La vapeur pousse la turbine.' : 'L’eau du barrage tombe et pousse la turbine.', 'La turbine entraîne l’alternateur, qui produit le courant électrique.'],
              grille: ['As-tu cité la source d’énergie de cette centrale ?', 'As-tu dit que la turbine est poussée par l’eau ou par la vapeur ?', 'As-tu dit que l’alternateur, entraîné par la turbine, produit le courant ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais comment une centrale fabrique le courant : une source, une turbine, puis un alternateur.',
    carte: ['quelle-source', 'quelle-piece', 'ordre-de-la-centrale'],
    papierDuSoir: { exercices: ['energie-produite', 'foyers'], defi: true },
    automatismes: [
      {
        id: 'p-fois-t',
        versions: [[20, 6], [50, 3], [10, 12], [100, 2]],
        genere(c) { const [p, t] = c.alea.choisir(this.versions); return { enonce: p + ' × ' + t + ' = ?', reponse: { type: 'nombre', valeur: p * t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, la centrale de Kribi, terminée en 2013, produit 216 mégawatts d’électricité avec du gaz naturel.',
    prenoms: ['Rachel', 'Clarisse'],
  };
});
