/* Notion 3 du bloc « L'énergie » : la chaîne énergétique. Le téléphone que Rachel recharge.
   Manipulation à l'écran : ranger les étapes de la recharge (js/manipulations/ranger.js).
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const R = 'Un réservoir d’énergie', C = 'Un convertisseur d’énergie', T = 'Un transfert d’énergie';
  const CHAINES = [
    { nom: 'de l’éolienne', etapes: ['le vent', 'l’hélice de l’éolienne', 'l’alternateur', 'les fils électriques', 'la lampe allumée'] },
    { nom: 'du panneau solaire', etapes: ['le soleil', 'le panneau solaire', 'la batterie', 'la radio'] },
    { nom: 'du vélo', etapes: ['la nourriture de Moussa', 'les muscles de Moussa', 'les pédales', 'la roue du vélo'] },
    { nom: 'de la casserole', etapes: ['le gaz', 'la flamme', 'la casserole', 'l’eau chaude'] },
  ];
  const ELEMENTS = [['la batterie', R], ['les fils du chargeur', T], ['l’écran du téléphone', C], ['les lignes électriques de la ville', T]];

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
    id: 'chaine-energetique',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'La chaîne énergétique',
    classe: 'cycle 4',
    univers: ['appareils', 'famille', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : chaîne énergétique, réservoir, convertisseur, transfert d’énergie.',

    accroche: {
      texte: 'Rachel branche son téléphone pour la nuit. Le soir, il est presque vide. Le matin, il est plein. D’où vient cette énergie ? Où est-elle gardée ?',
      image: { dessin: 'chaine', etapes: ['La prise de la maison', 'Le chargeur', 'La batterie du téléphone'], description: 'L’énergie vient de la prise, passe par le chargeur, puis elle est gardée dans la batterie du téléphone.' },
    },

    manipulation: {
      type: 'ranger',
      etapes: [
        'La centrale produit de l’électricité.',
        'Les fils portent l’électricité jusqu’à la maison.',
        'Le chargeur envoie l’électricité à la batterie.',
        'La batterie garde l’énergie en réserve.',
        'L’écran s’allume grâce à la batterie.',
      ],
      depart: [
        'Le chargeur envoie l’électricité à la batterie.',
        'La centrale produit de l’électricité.',
        'L’écran s’allume grâce à la batterie.',
        'Les fils portent l’électricité jusqu’à la maison.',
        'La batterie garde l’énergie en réserve.',
      ],
      consigne: 'Range les étapes de la centrale jusqu’à l’écran du téléphone de Rachel. Utilise les boutons monter et descendre.',
    },

    decouverte: {
      texte: (c) => 'Suis l’énergie du téléphone de Rachel. Regarde la batterie. C’est ' + c.mot('reservoir') + '. ' +
        'Dans les fils, l’énergie voyage de la centrale à la maison. C’est ' + c.mot('transfert') + '. ' +
        'Regarde l’écran qui s’allume. C’est ' + c.mot('convertisseur') + '. ' +
        'L’astuce : on lit la chaîne comme une histoire. Elle va de la source jusqu’à ce qui sert.',
    },

    vocabulaire: {
      termes: {
        reservoir: { sesMots: 'un endroit qui garde l’énergie', officiel: 'un réservoir d’énergie', lesDeux: 'un endroit qui garde l’énergie, appelé réservoir d’énergie' },
        transfert: { sesMots: 'le passage de l’énergie d’un endroit à un autre', officiel: 'un transfert d’énergie', lesDeux: 'le passage de l’énergie d’un endroit à un autre, appelé transfert d’énergie' },
        convertisseur: { sesMots: 'un appareil qui change l’énergie d’une forme à une autre', officiel: 'un convertisseur d’énergie', lesDeux: 'un appareil qui change l’énergie d’une forme à une autre, appelé convertisseur d’énergie' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un endroit qui garde l’énergie, le passage de l’énergie, et un appareil qui la change. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : un réservoir d’énergie, un transfert d’énergie et un convertisseur d’énergie.',
        'Tu connais les mots officiels : réservoir, transfert et convertisseur. Tu sais lire une chaîne énergétique, étape par étape.',
      ],
    },

    exercices: [
      Q('role-dans-la-chaine', 'appareils', [
        ['la batterie chargée du téléphone, qui garde l’énergie', R, [C, T], 'Elle garde l’énergie en réserve : c’est un réservoir.'],
        ['la bouteille de gaz de la cuisinière, qui garde le gaz', R, [C, T], 'Elle garde le gaz, donc de l’énergie en réserve : c’est un réservoir.'],
        ['l’ampoule d’une lampe, qui change l’électricité en lumière', C, [R, T], 'Elle change une forme d’énergie en une autre : c’est un convertisseur.'],
        ['le moteur d’un ventilateur, qui change l’électricité en mouvement', C, [R, T], 'Il change une forme d’énergie en une autre : c’est un convertisseur.'],
        ['les fils entre la prise et le chargeur, qui portent l’électricité', T, [R, C], 'Les fils portent l’énergie d’un endroit à un autre : c’est un transfert.'],
        ['les lignes électriques entre la centrale et la ville, qui portent l’électricité', T, [R, C], 'Les lignes portent l’énergie d’un endroit à un autre : c’est un transfert.'],
      ], (x) => 'Dans une chaîne d’énergie, quel rôle ' + (/^les /.test(x) ? 'jouent ' : 'joue ') + x + ' ?', 'Un réservoir garde l’énergie, un convertisseur la change de forme, un transfert la fait passer ailleurs.'),

      {
        id: 'ordre-de-la-chaine',
        univers: 'famille',
        // [numéro de la chaîne, numéro de l'étape citée, étape demandée : après ou avant]
        versions: [[0, 1, 'après'], [0, 3, 'avant'], [1, 2, 'avant'], [2, 0, 'après'], [3, 2, 'après'], [1, 1, 'après']],
        genere(c) {
          const [k, i, sens] = c.alea.choisir(this.versions);
          const ch = CHAINES[k].etapes, x = ch[i], juste = ch[sens === 'après' ? i + 1 : i - 1];
          const autres = ch.filter((e) => e !== x && e !== juste).slice(0, 2).map(cap);
          return {
            enonce: 'Voici les étapes de la chaîne ' + CHAINES[k].nom + ', dans le désordre : ' + c.alea.melanger(ch.slice()).join(', ') + '. Quelle étape vient juste ' + sens + ' ' + x + ' ?',
            reponse: O.choix(c.alea, cap(juste), autres),
            aide: 'Imagine l’énergie qui voyage : elle part du début et finit là où elle sert.' + (k === 0 ? ' L’alternateur est la machine qui fabrique l’électricité.' : ''),
            correction: ['Dans l’ordre : ' + ch.join(', puis ') + '.', 'Réponse : ' + cap(juste) + '.'],
          };
        },
      },

      {
        id: 'batterie-qui-se-vide',
        univers: 'appareils',
        // [pourcentage de départ, pourcentage perdu par heure, heures d'utilisation]
        versions: [[100, 10, 4], [90, 15, 3], [80, 8, 5], [100, 25, 2], [70, 5, 6], [60, 12, 4]],
        genere(c) {
          const [a, p, h] = c.alea.choisir(this.versions);
          const perdu = p * h;
          return {
            enonce: 'Le téléphone de Rachel est chargé à ' + a + ' %. Il perd ' + p + ' % par heure d’utilisation. Quel pourcentage reste-t-il après ' + h + ' heures ?',
            reponse: { type: 'nombre', valeur: a - perdu },
            aide: 'Calcule d’abord ce qui est perdu : ' + p + ' × ' + h + '.',
            aideParlee: 'Calcule d’abord ce qui est perdu en tout, puis enlève-le.',
            correction: [p + ' × ' + h + ' = ' + perdu + ' % perdus.', a + ' − ' + perdu + ' = ' + (a - perdu) + ' %.'],
          };
        },
      },

      {
        id: 'temps-de-charge',
        univers: 'maison-courses',
        // [pourcentage de départ, pourcentage ajouté par heure]
        versions: [[20, 20], [40, 30], [10, 30], [50, 25], [25, 15], [20, 16]],
        genere(c) {
          const [a, p] = c.alea.choisir(this.versions);
          const reste = 100 - a, h = reste / p;
          return {
            enonce: 'Rachel branche son téléphone chargé à ' + a + ' %. Le chargeur ajoute ' + p + ' % par heure. Combien d’heures faut-il pour arriver à 100 % ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'Cherche ce qui manque pour arriver à 100 %, puis divise par ' + p + '.',
            aideParlee: 'Cherche ce qui manque pour arriver à cent pour cent, puis divise.',
            correction: ['100 − ' + a + ' = ' + reste + ' %.', reste + ' ÷ ' + p + ' = ' + h + ' heures.'],
          };
        },
      },

      Q('vrai-ou-faux', 'famille', [
        ['La batterie d’un téléphone est un réservoir d’énergie.', 'Vrai', ['Faux'], 'La batterie garde l’énergie en réserve.'],
        ['Les fils électriques fabriquent l’énergie qu’ils portent.', 'Faux', ['Vrai'], 'Les fils font passer l’énergie d’un endroit à un autre : ils ne la fabriquent pas.'],
        ['Une chaîne d’énergie peut passer par plusieurs convertisseurs.', 'Vrai', ['Faux'], 'Par exemple, l’alternateur de la centrale, puis l’écran du téléphone, changent chacun l’énergie.'],
        ['Une chaîne d’énergie commence toujours par la batterie.', 'Faux', ['Vrai'], 'Elle commence par une source, comme le soleil, le vent ou l’uranium.'],
        ['Un transfert d’énergie est un passage d’énergie d’un endroit à un autre.', 'Vrai', ['Faux'], 'C’est bien la définition d’un transfert.'],
        ['Un réservoir d’énergie fabrique de l’énergie à partir de rien.', 'Faux', ['Vrai'], 'Un réservoir garde de l’énergie : il n’en fabrique pas à partir de rien.'],
      ], (x) => 'Moussa lit cette phrase : « ' + x + ' » Est-elle vraie ou fausse ?', 'Relis la phrase en pensant au téléphone de Rachel. Un alternateur est la machine qui fabrique l’électricité. Un réservoir garde l’énergie, un convertisseur la change de forme, un transfert la fait passer ailleurs.'),
    ],

    defi: {
      // [% au départ, % ajouté par heure, % perdu par heure d'utilisation, heures d'utilisation, numéro de l'élément de la question 3]
      versions: [[20, 20, 10, 5, 0], [40, 30, 8, 6, 1], [10, 30, 15, 4, 2], [50, 25, 12, 5, 3]],
      genere(c) {
        const [a, p, d, h, k] = c.alea.choisir(this.versions);
        const heures = (100 - a) / p, reste = 100 - d * h;
        const [nom, role] = ELEMENTS[k];
        return {
          enonce: 'Le soir, Rachel branche son téléphone chargé à ' + a + ' %. Le chargeur ajoute ' + p + ' % par heure. ' +
            'Le lendemain, le téléphone est plein. Rachel l’utilise ' + h + ' heures, et la batterie perd ' + d + ' % par heure.',
          questions: [
            {
              texte: 'Question 1. Combien d’heures le chargeur met-il pour arriver à 100 % ?',
              reponse: { type: 'nombre', valeur: heures },
              aide: 'Cherche ce qui manque pour arriver à 100 %, puis divise.',
              correction: ['100 − ' + a + ' = ' + (100 - a) + ' %.', (100 - a) + ' ÷ ' + p + ' = ' + heures + ' heures.'],
            },
            {
              texte: 'Question 2. Quel pourcentage reste-t-il après ' + h + ' heures d’utilisation ?',
              reponse: { type: 'nombre', valeur: reste },
              aide: 'Calcule ce qui est perdu en tout, puis enlève-le de 100.',
              correction: [d + ' × ' + h + ' = ' + d * h + ' % perdus.', '100 − ' + d * h + ' = ' + reste + ' %.'],
            },
            {
              texte: 'Question 3. Dans la chaîne d’énergie, quel rôle ' + (/^les /.test(nom) ? 'jouent ' : 'joue ') + nom + ' ?',
              reponse: O.choix(c.alea, role, [R, C, T]),
              aide: 'Un réservoir garde l’énergie, un convertisseur la change de forme, un transfert la fait passer ailleurs.',
              correction: ['Réponse : ' + role + '.'],
            },
            {
              texte: 'Question 4. Décris la chaîne d’énergie du téléphone, de la centrale jusqu’à l’écran. Utilise les mots réservoir, convertisseur et transfert.',
              correction: ['La centrale produit l’électricité, qui voyage dans les fils : c’est un transfert d’énergie.', 'La batterie garde l’énergie : c’est un réservoir. L’écran la change en lumière : c’est un convertisseur.'],
              grille: ['As-tu cité les étapes dans le bon ordre ?', 'As-tu nommé la batterie comme réservoir ?', 'As-tu utilisé les mots transfert et convertisseur à la bonne place ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais lire une chaîne d’énergie : un réservoir, des transferts et des convertisseurs, de la centrale à l’écran.',
    carte: ['role-dans-la-chaine', 'ordre-de-la-chaine', 'temps-de-charge'],
    papierDuSoir: { exercices: ['batterie-qui-se-vide', 'temps-de-charge'], defi: true },
    automatismes: [
      {
        id: 'cent-moins',
        versions: [[100, 40], [100, 25], [100, 60], [100, 35]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Égypte, le barrage d’Assouan couvrait, en 1970, la moitié des besoins du pays.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
