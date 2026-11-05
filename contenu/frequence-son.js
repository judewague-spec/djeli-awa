/* Notion 5 du bloc « Signaux et Univers » : fréquence, infrasons, ultrasons. Le sifflet de Moussa.
   Les nombres des exercices sont des exemples de la notion.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return {
    id: 'frequence-son',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'Fréquence, infrasons, ultrasons',
    classe: '3e',
    univers: ['chansons', 'dehors', 'danses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Des signaux pour observer et communiquer » : signal sonore, fréquence, période, domaine audible, infrasons et ultrasons.',

    accroche: {
      texte: 'Moussa souffle dans un sifflet à chien. Rachel n’entend rien du tout. Pourtant, le chien accourt aussitôt. Le sifflet fait bien un son, mais pas pour Rachel. Pourquoi ?',
      image: { dessin: 'chaine', etapes: ['Un sifflet à chien', 'Un son trop aigu pour Rachel', 'Le chien l’entend'], description: 'Un sifflet à chien produit un son trop aigu pour Rachel. Le chien, lui, l’entend.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Période T en secondes', 'f = 1 ÷ T', 'Fréquence f en hertz'], description: 'La fréquence f en hertz est égale à un divisé par la période T en secondes. Par exemple, T égale 0,01 seconde donne f égale 100 hertz.' },
      etapes: [
        'Un son est une vibration. La fréquence f est le nombre de vibrations par seconde. Elle se mesure en hertz, de symbole Hz.',
        'La période T est la durée d’une vibration, en secondes. Les deux sont liées : f = 1 ÷ T.',
        'Par exemple, T = 0,01 s donne f = 1 ÷ 0,01 = 100 Hz.',
        'Un kilohertz vaut mille hertz : 1 kHz = 1 000 Hz.',
        'L’oreille humaine entend de 20 Hz à 20 000 Hz. En dessous, ce sont des infrasons. Au-dessus, ce sont des ultrasons.',
        'Certains animaux en profitent : l’éléphant utilise des infrasons, la chauve-souris des ultrasons.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde la corde qui vibre. Plus elle vibre vite, plus le son est aigu : c’est ' + c.mot('frequence') + '. Elle se compte en ' + c.mot('hertz') + '. ' +
        'Un aller-retour de la corde dure un petit moment. C’est ' + c.mot('periode') + '. ' +
        'Au-dessous de 20 vibrations par seconde, l’oreille n’entend rien. Ce sont ' + c.mot('infrasons') + '. ' +
        'Au-dessus de 20 000 vibrations par seconde, elle n’entend rien non plus. Ce sont ' + c.mot('ultrasons') + '.',
    },

    vocabulaire: {
      termes: {
        frequence: { sesMots: 'la rapidité des vibrations', officiel: 'la fréquence', lesDeux: 'la rapidité des vibrations, que les physiciens appellent la fréquence' },
        hertz: { sesMots: 'vibrations par seconde', officiel: 'hertz', lesDeux: 'vibrations par seconde, que les physiciens appellent des hertz' },
        periode: { sesMots: 'le temps d’une seule vibration', officiel: 'la période', lesDeux: 'le temps d’une seule vibration, que les physiciens appellent la période' },
        infrasons: { sesMots: 'les sons trop graves pour nous', officiel: 'les infrasons', lesDeux: 'les sons trop graves pour nous, que les physiciens appellent les infrasons' },
        ultrasons: { sesMots: 'les sons trop aigus pour nous', officiel: 'les ultrasons', lesDeux: 'les sons trop aigus pour nous, que les physiciens appellent les ultrasons' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la rapidité des vibrations, les vibrations par seconde, et le temps d’une seule vibration. Garde aussi les sons trop graves et les sons trop aigus pour nous. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la fréquence, en hertz, et la période. Ils disent aussi les infrasons et les ultrasons.',
        'Tu connais les mots officiels : la fréquence, le hertz, la période, les infrasons et les ultrasons.',
      ],
    },

    exercices: [
      {
        id: 'frequence-depuis-periode',
        univers: 'chansons',
        // [période en secondes]
        versions: [0.5, 0.25, 0.1, 0.01, 0.005, 0.002],
        genere(c) {
          const t = c.alea.choisir(this.versions);
          const f = Math.round(1 / t);
          return {
            enonce: 'Un son a une période de ' + ecr(t) + ' s. Quelle est sa fréquence, en hertz ?',
            reponse: { type: 'nombre', valeur: f },
            aide: 'Utilise f = 1 ÷ T : calcule 1 ÷ ' + ecr(t) + '.',
            aideParlee: 'Divise un par la période.',
            correction: ['f = 1 ÷ T = 1 ÷ ' + ecr(t) + ' = ' + f + ' Hz.'],
          };
        },
      },
      {
        id: 'periode-depuis-frequence',
        univers: 'danses',
        // [fréquence en hertz]
        versions: [2, 4, 5, 10, 20, 50, 100],
        genere(c) {
          const f = c.alea.choisir(this.versions);
          const t = Math.round((1 / f) * 100) / 100;
          return {
            enonce: 'Un son a une fréquence de ' + f + ' Hz. Quelle est sa période, en secondes ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Utilise T = 1 ÷ f : calcule 1 ÷ ' + f + '.',
            aideParlee: 'Divise un par la fréquence.',
            correction: ['T = 1 ÷ f = 1 ÷ ' + f + ' = ' + ecr(t) + ' s.'],
          };
        },
      },
      {
        id: 'khz-en-hz',
        univers: 'chansons',
        // [fréquence en kilohertz]
        versions: [2, 5, 15, 20, 0.5, 3.5],
        genere(c) {
          const k = c.alea.choisir(this.versions);
          const h = Math.round(k * 1000);
          return {
            enonce: 'Un son a une fréquence de ' + ecr(k) + ' kHz. On sait que 1 kHz = 1 000 Hz. Quelle est sa fréquence, en hertz ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'Multiplie ' + ecr(k) + ' par 1 000.',
            aideParlee: 'Multiplie le nombre de kilohertz par mille.',
            correction: [ecr(k) + ' × 1 000 = ' + fmt(h) + ' Hz.'],
          };
        },
      },
      O.qcm('type-son', 'dehors', [
        ['5 Hz', 'C’est un infrason', '5 Hz est au-dessous de 20 Hz.'],
        ['440 Hz', 'C’est un son audible', '440 Hz est entre 20 Hz et 20 000 Hz.'],
        ['30 000 Hz', 'C’est un ultrason', '30 000 Hz est au-dessus de 20 000 Hz.'],
        ['15 Hz', 'C’est un infrason', '15 Hz est au-dessous de 20 Hz.'],
        ['2 kHz', 'C’est un son audible', '2 kHz font 2 000 Hz, entre 20 Hz et 20 000 Hz.'],
        ['50 kHz', 'C’est un ultrason', '50 kHz font 50 000 Hz, au-dessus de 20 000 Hz.'],
      ], (x) => 'Un son a une fréquence de ' + x + '. Que dire de ce son pour l’oreille humaine ?', ['C’est un infrason', 'C’est un son audible', 'C’est un ultrason'], 'L’oreille humaine entend de 20 Hz à 20 000 Hz. En dessous, infrason. Au-dessus, ultrason.'),
      O.qcm('animaux-sons', 'dehors', [
        ['Une chauve-souris crie des sons de fréquence supérieure à 20 000 Hz. Comment appelle-t-on ces sons ?', 'Des ultrasons', 'Au-dessus de 20 000 Hz, ce sont des ultrasons.'],
        ['Un éléphant communique avec des sons de fréquence inférieure à 20 Hz. Comment appelle-t-on ces sons ?', 'Des infrasons', 'Au-dessous de 20 Hz, ce sont des infrasons.'],
        ['Le sifflet à chien de Moussa produit des sons de fréquence supérieure à 20 000 Hz. Comment appelle-t-on ces sons ?', 'Des ultrasons', 'Rachel ne les entend pas : ils sont au-dessus de 20 000 Hz.'],
        ['Un appareil d’échographie utilise des sons de fréquence supérieure à 20 000 Hz. Comment appelle-t-on ces sons ?', 'Des ultrasons', 'Au-dessus de 20 000 Hz, ce sont des ultrasons.'],
        ['Rachel entend la voix de Laure, dont la fréquence est d’environ 200 Hz. Comment appelle-t-on ce son ?', 'Un son audible', '200 Hz est entre 20 Hz et 20 000 Hz : Rachel l’entend.'],
      ], (x) => x, ['Des infrasons', 'Des ultrasons', 'Un son audible'], 'Compare la fréquence aux limites de l’oreille humaine : 20 Hz et 20 000 Hz.'),
    ],

    defi: {
      // [période en secondes]
      versions: [[0.01], [0.1], [0.002], [0.00004]],
      genere(c) {
        const [t] = c.alea.choisir(this.versions);
        const f = Math.round(1 / t), n = f * 5;
        const genre = f < 20 ? 'Un infrason' : f > 20000 ? 'Un ultrason' : 'Un son audible';
        return {
          enonce: 'Rachel enregistre un son avec un ordinateur. Dans cet exemple, le logiciel mesure une période de ' + ecr(t) + ' s. L’oreille humaine entend de 20 Hz à 20 000 Hz.',
          questions: [
            {
              texte: 'Question 1. Quelle est la fréquence de ce son, en hertz ?',
              reponse: { type: 'nombre', valeur: f },
              aide: 'Utilise f = 1 ÷ T : calcule 1 ÷ ' + ecr(t) + '.',
              aideParlee: 'Divise un par la période.',
              correction: ['f = 1 ÷ T = 1 ÷ ' + ecr(t) + ' = ' + fmt(f) + ' Hz.'],
            },
            {
              texte: 'Question 2. Combien de vibrations y a-t-il en 5 secondes ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'La fréquence donne le nombre de vibrations en une seconde. Multiplie-la par 5.',
              correction: [fmt(f) + ' vibrations par seconde.', fmt(f) + ' × 5 = ' + fmt(n) + ' vibrations.'],
            },
            {
              texte: 'Question 3. Que dire de ce son pour l’oreille humaine ?',
              reponse: O.choix(c.alea, genre, ['Un infrason', 'Un son audible', 'Un ultrason']),
              aide: 'Compare la fréquence à 20 Hz et à 20 000 Hz.',
              correction: ['Fréquence : ' + fmt(f) + ' Hz.', f < 20 ? fmt(f) + ' Hz est au-dessous de 20 Hz.' : f > 20000 ? fmt(f) + ' Hz est au-dessus de 20 000 Hz.' : fmt(f) + ' Hz est entre 20 Hz et 20 000 Hz.', 'Réponse : ' + genre + '.'],
            },
            {
              texte: 'Question 4. Explique pourquoi Rachel entend certains sons et pas d’autres. Donne les limites de l’audition humaine.',
              correction: ['L’oreille humaine entend les sons de 20 Hz à 20 000 Hz.', 'Au-dessous de 20 Hz, ce sont des infrasons. Au-dessus de 20 000 Hz, ce sont des ultrasons : on ne les entend pas.'],
              grille: ['As-tu cité les limites, 20 Hz et 20 000 Hz ?', 'As-tu nommé les infrasons et les ultrasons ?', 'As-tu dit que ces sons existent, mais que l’oreille ne les entend pas ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Fréquence, période, infrasons, ultrasons : tu sais pourquoi Rachel n’entend pas le sifflet du chien.',
    carte: ['frequence-depuis-periode', 'khz-en-hz', 'type-son'],
    papierDuSoir: { exercices: ['frequence-depuis-periode', 'type-son'], defi: true },
    automatismes: [
      {
        id: 'kilo-en-hz',
        versions: [[2], [3], [5], [10]],
        genere(c) { const [k] = c.alea.choisir(this.versions); return { enonce: k + ' kHz = ? Hz', reponse: { type: 'nombre', valeur: k * 1000 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Namibie, des éléphants d’Etosha ont réagi à des cris d’alarme graves, rejoués en vibrations du sol.',
    prenoms: ['Rachel', 'Moussa', 'Laure'],
  };
});
