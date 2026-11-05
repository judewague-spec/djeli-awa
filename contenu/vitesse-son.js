/* Notion 6 du bloc « Signaux et Univers » : la vitesse du son. L’orage, l’éclair et le tonnerre.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { qcm, choix } = O;
  const ecr = (n) => { const [e, d] = O.ecr(n).split(','); const g = e.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return d ? g + ',' + d : g; };
  const VS = 340; // m/s, vitesse du son dans l’air vers 15 °C
  const sec = (t) => ecr(t) + (t > 1 ? ' secondes' : ' seconde');

  return {
    id: 'vitesse-son',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'La vitesse du son',
    classe: 'cycle 4',
    univers: ['dehors', 'champetre', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Des signaux pour observer et communiquer » : vitesse de propagation du son dans l’air, relation d = v × t.',

    accroche: {
      texte: 'Rachel voit un éclair au loin. Quelques secondes plus tard, elle entend le tonnerre. ' +
        'L’éclair et le tonnerre partent en même temps. Mais le son est bien plus lent que la lumière.',
      image: { dessin: 'chaine', etapes: ['L’éclair et le tonnerre partent ensemble', 'La lumière arrive presque aussitôt', 'Le son arrive bien plus tard'], description: 'L’éclair et le tonnerre partent ensemble. La lumière arrive presque aussitôt chez Rachel. Le son arrive bien plus tard.' },
    },

    manipulation: {
      type: 'tonnerre',
      cible: 1700,
      consigne: 'Un orage éclate à 1 700 mètres. Le son avance de 340 mètres par seconde. Trouve combien de secondes compter, puis valide.',
    },

    decouverte: {
      texte: (c) => 'Dans l’air, le son avance lentement. Retiens ' + c.mot('vitesse') + '. Elle vaut environ 340 mètres par seconde. ' +
        'Pour calculer, utilise ' + c.mot('recette') + '. L’astuce : compte les secondes entre l’éclair et le tonnerre. Environ trois secondes font un kilomètre.',
    },

    vocabulaire: {
      termes: {
        vitesse: { sesMots: 'la distance faite par le son en une seconde', officiel: 'la vitesse du son', lesDeux: 'la distance faite par le son en une seconde, que les physiciens appellent la vitesse du son' },
        recette: { sesMots: 'la recette de la distance parcourue', officiel: 'la relation d égale v fois t', lesDeux: 'la recette de la distance parcourue, que les physiciens écrivent d égale v fois t' },
      },
      textes: [
        'Pour l’instant, garde tes mots. Il y a la distance faite par le son en une seconde, et la recette de la distance parcourue. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la vitesse du son, et la relation d égale v fois t. La distance, c’est la vitesse multipliée par le temps.',
        'Tu connais les mots officiels : la vitesse du son, et la relation d égale v fois t.',
      ],
    },

    exercices: [
      {
        id: 'distance-de-l-orage',
        univers: 'dehors',
        // [durée comptée en s]
        versions: [[2], [3], [5], [10], [4], [6], [1]],
        genere(c) {
          const [t] = c.alea.choisir(this.versions);
          const d = VS * t;
          return {
            enonce: 'Rachel compte ' + sec(t) + ' entre l’éclair et le tonnerre. Le son va à 340 m/s, et la lumière arrive presque aussitôt. À quelle distance est l’orage, en mètres ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Utilise d = v × t, avec v = 340 m/s.',
            aideParlee: 'Multiplie la vitesse du son par le temps compté.',
            correction: ['d = v × t = ' + VS + ' × ' + ecr(t) + ' = ' + ecr(d) + ' m.'],
          };
        },
      },
      {
        id: 'temps-a-compter',
        univers: 'champetre',
        // [distance en m]
        versions: [[680], [1020], [1700], [3400], [2040], [340]],
        genere(c) {
          const [d] = c.alea.choisir(this.versions);
          const t = d / VS;
          return {
            enonce: 'Un orage éclate à ' + ecr(d) + ' m de Moussa. Le son va à 340 m/s. Combien de secondes séparent l’éclair du tonnerre ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Cherche t : divise la distance par la vitesse.',
            aideParlee: 'Divise la distance par la vitesse du son.',
            correction: ['t = d ÷ v = ' + ecr(d) + ' ÷ ' + VS + ' = ' + ecr(t) + ' s.'],
          };
        },
      },
      {
        id: 'en-kilometres',
        univers: 'famille',
        // [durée comptée en s]
        versions: [[3], [6], [9], [15], [30]],
        genere(c) {
          const [t] = c.alea.choisir(this.versions);
          const m = VS * t;
          const km = m / 1000;
          return {
            enonce: 'Laure compte ' + sec(t) + ' entre l’éclair et le tonnerre. Le son va à 340 m/s. À quelle distance est l’orage, en kilomètres ?',
            reponse: { type: 'nombre', valeur: km },
            aide: 'Calcule la distance en mètres, puis divise par 1 000.',
            aideParlee: 'Calcule la distance en mètres, puis écris-la en kilomètres.',
            correction: ['d = ' + VS + ' × ' + ecr(t) + ' = ' + ecr(m) + ' m.', ecr(m) + ' m = ' + ecr(km) + ' km.'],
          };
        },
      },
      {
        id: 'quel-orage-est-plus-proche',
        univers: 'dehors',
        // [secondes comptées par Rachel, secondes comptées par Moussa]
        versions: [[3, 6], [8, 2], [5, 5], [1, 9], [7, 4]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = a === b ? 'Ils sont à la même distance' : a < b ? 'L’orage de Rachel' : 'L’orage de Moussa';
          return {
            enonce: 'Rachel compte ' + sec(a) + ' entre l’éclair et le tonnerre. Moussa, devant un autre orage, compte ' + sec(b) + '. Quel orage est le plus proche ?',
            reponse: choix(c.alea, bonne, ['L’orage de Rachel', 'L’orage de Moussa', 'Ils sont à la même distance']),
            aide: 'Plus on compte de secondes, plus l’orage est loin.',
            correction: ['Rachel : ' + VS + ' × ' + ecr(a) + ' = ' + ecr(VS * a) + ' m. Moussa : ' + VS + ' × ' + ecr(b) + ' = ' + ecr(VS * b) + ' m.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      qcm('vrai-ou-faux', 'champetre',
        [
          ['On voit l’éclair avant d’entendre le tonnerre.', 'Vrai', 'La lumière va bien plus vite que le son.'],
          ['Le son va plus vite que la lumière.', 'Faux', 'La lumière est bien plus rapide.'],
          ['Plus on compte de secondes, plus l’orage est loin.', 'Vrai', 'Le son a plus de chemin à faire.'],
          ['Dans l’air, le son va à environ 340 m/s.', 'Vrai', 'Vers 15 °C.'],
          ['Dans l’air, le son va à environ 300 000 km/s.', 'Faux', 'C’est la vitesse de la lumière, pas celle du son.'],
          ['Si l’on entend le tonnerre tout de suite, l’orage est très loin.', 'Faux', 'Il est tout près.'],
        ],
        (x) => x + ' Vrai ou faux ?', ['Vrai', 'Faux'],
        'Souviens-toi : le son va à environ 340 mètres par seconde dans l’air.'),
    ],

    defi: {
      // [secondes du premier tonnerre, secondes du second tonnerre]
      versions: [[9, 6], [4, 7], [6, 3], [3, 8]],
      genere(c) {
        const [t1, t2] = c.alea.choisir(this.versions);
        const d1 = VS * t1, d2 = VS * t2;
        const proche = t2 < t1;
        return {
          enonce: 'Un soir d’orage, Rachel regarde le ciel depuis le village. Elle compte ' + sec(t1) + ' entre un premier éclair et son tonnerre. ' +
            'Quelques minutes plus tard, elle compte ' + sec(t2) + ' pour un second éclair. Le son va à 340 m/s dans l’air.',
          questions: [
            {
              texte: 'Question 1. À quelle distance est le premier éclair, en mètres ?',
              reponse: { type: 'nombre', valeur: d1 },
              aide: 'Multiplie la vitesse du son par le temps compté.',
              correction: ['d = v × t = ' + VS + ' × ' + ecr(t1) + ' = ' + ecr(d1) + ' m.'],
            },
            {
              texte: 'Question 2. À quelle distance est le second éclair, en mètres ?',
              reponse: { type: 'nombre', valeur: d2 },
              aide: 'Multiplie la vitesse du son par le temps compté.',
              correction: ['d = v × t = ' + VS + ' × ' + ecr(t2) + ' = ' + ecr(d2) + ' m.'],
            },
            {
              texte: 'Question 3. L’orage s’approche-t-il du village ?',
              reponse: choix(c.alea, proche ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare les deux distances.',
              correction: [ecr(d2) + ' m, c’est ' + (proche ? 'moins' : 'plus') + ' que ' + ecr(d1) + ' m.', proche ? 'L’orage s’approche.' : 'L’orage s’éloigne.', 'Réponse : ' + (proche ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Explique avec tes mots pourquoi on voit l’éclair avant d’entendre le tonnerre, alors qu’ils partent en même temps.',
              correction: ['L’éclair et le tonnerre partent en même temps.', 'La lumière va environ 300 000 km/s : elle arrive presque aussitôt.', 'Le son va environ 340 m/s : il arrive bien plus tard.'],
              grille: ['As-tu dit que l’éclair et le tonnerre partent en même temps ?', 'As-tu comparé la vitesse de la lumière et celle du son ?', 'As-tu conclu que la lumière arrive la première ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais compter les secondes entre l’éclair et le tonnerre, et trouver la distance de l’orage.',
    carte: ['distance-de-l-orage', 'temps-a-compter', 'en-kilometres'],
    papierDuSoir: { exercices: ['distance-de-l-orage', 'en-kilometres'], defi: true },
    automatismes: [
      {
        id: 'metres-en-kilometres',
        versions: [[3000], [5000], [1500], [8000]],
        genere(c) { const [m] = c.alea.choisir(this.versions); return { enonce: ecr(m) + ' m = ? km', reponse: { type: 'nombre', valeur: m / 1000 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Des satellites ont placé Kabare, en République démocratique du Congo, deuxième au monde pour les éclairs, et premier d’Afrique.',
    prenoms: ['Moussa', 'Laure'],
  };
});
