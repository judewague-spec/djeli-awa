/* Notion 3 du bloc « Signaux et Univers » : la vitesse de la lumière. Rachel allume la lumière du salon.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { qcm, choix } = O;
  const ecr = (n) => { const [e, d] = O.ecr(n).split(','); const g = e.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return d ? g + ',' + d : g; };
  const V = 300000; // km/s, valeur arrondie de la vitesse de la lumière dans le vide (exactement 299 792 km/s)
  const sec = (t) => ecr(t) + (t > 1 ? ' secondes' : ' seconde');

  return {
    id: 'vitesse-lumiere',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'La vitesse de la lumière',
    classe: 'cycle 4',
    univers: ['famille', 'appareils', 'dehors'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Des signaux pour observer et communiquer » : vitesse de propagation de la lumière dans le vide, relation d = v × t.',

    accroche: {
      texte: 'Rachel allume la lumière du salon. Elle voit la pièce aussitôt. ' +
        'Pourtant, la lumière voyage, comme une voiture sur la route. Elle va environ 300 000 kilomètres par seconde, bien plus vite que le son.',
      image: { dessin: 'chaine', etapes: ['Rachel allume la lumière', 'La lumière voyage dans la pièce', 'Rachel voit la pièce'], description: 'Rachel allume la lumière. La lumière voyage dans la pièce, très vite. Rachel voit alors la pièce.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Signal', 'Vitesse'], lignes: [['Lumière dans le vide', 'environ 300 000 km/s'], ['Son dans l’air', 'environ 340 m/s']], description: 'Un tableau de deux lignes. La lumière dans le vide va à environ 300 000 kilomètres par seconde. Le son dans l’air va à environ 340 mètres par seconde.' },
      etapes: [
        'La lumière du Soleil met environ 8 minutes pour arriver jusqu’à la Terre.',
        'Dans le vide, elle va environ 300 000 km/s. Chaque seconde, elle fait 300 000 kilomètres.',
        'Pour la distance, on multiplie la vitesse par le temps : d égale v fois t.',
        'Le son va bien moins vite : environ 340 mètres par seconde dans l’air.',
      ],
    },

    decouverte: {
      texte: (c) => 'La lumière voyage sans s’arrêter. Retiens ' + c.mot('vitesse') + '. Elle vaut environ 300 000 kilomètres par seconde. ' +
        'Pour calculer, utilise ' + c.mot('recette') + '. L’astuce : si la vitesse est en kilomètres par seconde, le temps doit être en secondes.',
    },

    vocabulaire: {
      termes: {
        vitesse: { sesMots: 'la distance faite en une seconde', officiel: 'la vitesse de la lumière', lesDeux: 'la distance faite en une seconde, que les physiciens appellent la vitesse de la lumière' },
        recette: { sesMots: 'la recette de la distance parcourue', officiel: 'la relation d égale v fois t', lesDeux: 'la recette de la distance parcourue, que les physiciens écrivent d égale v fois t' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la distance faite en une seconde, et la recette de la distance parcourue. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la vitesse de la lumière, et la relation d égale v fois t. La distance, c’est la vitesse multipliée par le temps.',
        'Tu connais les mots officiels : la vitesse de la lumière, et la relation d égale v fois t.',
      ],
    },

    exercices: [
      {
        id: 'distance-en-secondes',
        univers: 'appareils',
        // [durée en s]
        versions: [[2], [5], [10], [0.5], [3], [20]],
        genere(c) {
          const [t] = c.alea.choisir(this.versions);
          const d = V * t;
          return {
            enonce: 'Dans le vide, la lumière va à 300 000 km/s. Quelle distance parcourt-elle en ' + sec(t) + ' ?',
            reponse: choix(c.alea, ecr(d) + ' km', [ecr(d / 10) + ' km', ecr(d * 10) + ' km']),
            aide: 'Utilise d = v × t, avec v = 300 000 km/s.',
            aideParlee: 'Multiplie la vitesse de la lumière par la durée en secondes.',
            correction: ['d = v × t = ' + ecr(V) + ' × ' + ecr(t) + ' = ' + ecr(d) + ' km.', 'Réponse : ' + ecr(d) + ' km.'],
          };
        },
      },
      {
        id: 'duree-du-trajet',
        univers: 'dehors',
        // [distance en km]
        versions: [[900000], [1500000], [3000000], [600000], [150000], [4500000]],
        genere(c) {
          const [d] = c.alea.choisir(this.versions);
          const t = d / V;
          return {
            enonce: 'Un signal lumineux parcourt ' + ecr(d) + ' km dans le vide. On prend 300 000 km/s pour la lumière. Combien de secondes dure le trajet ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Cherche t : divise la distance par la vitesse.',
            aideParlee: 'Divise la distance par la vitesse de la lumière.',
            correction: ['t = d ÷ v = ' + ecr(d) + ' ÷ ' + ecr(V) + ' = ' + ecr(t) + ' s.'],
          };
        },
      },
      {
        id: 'soleil-terre',
        univers: 'champetre',
        // [question, bonne réponse, deux mauvaises réponses]
        versions: [
          ['Rachel regarde le Soleil briller. La lumière qu’elle reçoit est partie du Soleil il y a combien de temps ?', 'Environ 8 minutes', ['Environ 8 secondes', 'Environ 8 heures']],
          ['La lumière du Soleil met combien de temps pour arriver jusqu’à la Terre ?', 'Environ 8 minutes', ['Environ 8 jours', 'Environ 8 secondes']],
          ['Si le Soleil s’éteignait d’un coup, quand les habitants de la Terre verraient-ils la nuit tomber ?', 'Environ 8 minutes plus tard', ['Aussitôt', 'Environ 8 heures plus tard']],
        ],
        genere(c) {
          const [q, bonne, autres] = c.alea.choisir(this.versions);
          return {
            enonce: q,
            reponse: choix(c.alea, bonne, autres),
            aide: 'Le Soleil est très loin, mais la lumière va très vite.',
            aideParlee: 'Le Soleil est très loin, mais la lumière va très vite.',
            correction: ['Le Soleil est très loin de la Terre. Sa lumière met environ 8 minutes à venir.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      qcm('lumiere-ou-son', 'famille',
        [
          ['Au feu d’artifice, Moussa voit l’éclat avant d’entendre le bruit. Qu’est-ce qui arrive en premier ?', 'La lumière', 'La lumière va bien plus vite que le son.'],
          ['Pendant un orage, qu’est-ce qui arrive en premier chez Rachel ?', 'La lumière', 'On voit l’éclair avant d’entendre le tonnerre.'],
          ['Laure regarde un coup de canon au loin. Qu’est-ce qui arrive en dernier ?', 'Le son', 'Le son est bien plus lent que la lumière.'],
          ['Rachel voit l’éclair et entend ensuite le tonnerre. Qu’est-ce qui est le plus lent ?', 'Le son', 'Le son est bien plus lent que la lumière.'],
        ],
        (x) => x, ['La lumière', 'Le son', 'Les deux en même temps'],
        'Compare les deux vitesses : la lumière va bien plus vite.'),
      qcm('vrai-ou-faux', 'maison-courses',
        [
          ['La lumière met environ 8 minutes pour venir du Soleil.', 'Vrai', 'Le Soleil est très loin.'],
          ['La lumière va moins vite que le son.', 'Faux', 'La lumière est bien plus rapide.'],
          ['Dans le vide, la lumière va à environ 300 000 km/s.', 'Vrai', 'C’est la vitesse de la lumière.'],
          ['La lumière du Soleil arrive instantanément sur Terre.', 'Faux', 'Elle met environ 8 minutes.'],
          ['En une seconde, la lumière parcourt environ 3 000 km.', 'Faux', 'Elle parcourt environ 300 000 km.'],
          ['Pour calculer une distance, on multiplie la vitesse par la durée.', 'Vrai', 'C’est la relation d = v × t.'],
        ],
        (x) => x + ' Vrai ou faux ?', ['Vrai', 'Faux'],
        'Souviens-toi : environ 300 000 kilomètres par seconde dans le vide.'),
    ],

    defi: {
      // [distance en km]
      versions: [[600000], [21000000], [3000000], [27000000]],
      genere(c) {
        const [d] = c.alea.choisir(this.versions);
        const t = d / V;
        const moins = t < 60;
        return {
          enonce: 'Au club de sciences, Rachel et Moussa étudient une sonde lointaine. Elle envoie un signal radio, qui voyage à la vitesse de la lumière. Le signal parcourt ' + ecr(d) + ' km pour arriver. On prend 300 000 km/s.',
          questions: [
            {
              texte: 'Question 1. Combien de secondes le signal met-il pour arriver ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Divise la distance par la vitesse.',
              aideParlee: 'Divise la distance par la vitesse de la lumière.',
              correction: ['t = d ÷ v = ' + ecr(d) + ' ÷ ' + ecr(V) + ' = ' + ecr(t) + ' s.'],
            },
            {
              texte: 'Question 2. Combien de secondes dure un aller-retour, si la réponse revient par le même chemin ?',
              reponse: { type: 'nombre', valeur: 2 * t },
              aide: 'Un aller-retour, c’est deux fois le trajet.',
              correction: ['2 × ' + ecr(t) + ' = ' + ecr(2 * t) + ' s.'],
            },
            {
              texte: 'Question 3. Le signal arrive-t-il en moins d’une minute ?',
              reponse: choix(c.alea, moins ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Une minute, c’est 60 secondes.',
              correction: [ecr(t) + ' s, c’est ' + (moins ? 'moins' : 'plus') + ' que 60 s.', 'Réponse : ' + (moins ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Explique avec tes mots pourquoi la lumière du Soleil n’arrive pas à l’instant même sur Terre, alors qu’elle est très rapide.',
              correction: ['La lumière va très vite, mais pas à l’infini : environ 300 000 km/s.', 'Le Soleil est très loin : le trajet dure environ 8 minutes.'],
              grille: ['As-tu dit que la lumière a une vitesse précise ?', 'As-tu parlé de la grande distance du Soleil ?', 'As-tu cité la durée d’environ 8 minutes ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! La lumière va très vite, mais pas à l’infini. Tu sais calculer sa distance avec d égale v fois t.',
    carte: ['distance-en-secondes', 'duree-du-trajet', 'soleil-terre'],
    papierDuSoir: { exercices: ['distance-en-secondes', 'duree-du-trajet'], defi: true },
    automatismes: [
      {
        id: 'fois-trois-cent-mille',
        versions: [[2], [3], [4], [10]],
        genere(c) { const [n] = c.alea.choisir(this.versions); return { enonce: ecr(300000) + ' × ' + n + ' = ?', reponse: { type: 'nombre', valeur: 300000 * n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, Hippolyte Fizeau a mesuré en 1849 la vitesse de la lumière avec une roue dentée tournante.',
    prenoms: [],
  };
});
