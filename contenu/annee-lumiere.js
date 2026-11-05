/* Notion 4 du bloc « Signaux et Univers » : l’année-lumière. Moussa lit un livre sur les étoiles.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { qcm, choix, puissance } = O;
  const ecr = (n) => { const [e, d] = O.ecr(n).split(','); const g = e.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return d ? g + ',' + d : g; };
  const AL = 9460; // une année-lumière vaut environ 9 460 milliards de km

  return {
    id: 'annee-lumiere',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'L’année-lumière',
    classe: 'cycle 4',
    univers: ['dehors', 'famille', 'chansons'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Des signaux pour observer et communiquer » : l’année-lumière, unité de distance ; notation avec les puissances de 10.',

    accroche: {
      texte: 'Moussa lit un livre sur les étoiles. Il y découvre une étoile proche, à environ 4,2 années-lumière. ' +
        'Rachel se demande si c’est un temps. Non : une année-lumière mesure une distance, celle que la lumière parcourt en un an.',
      image: { dessin: 'chaine', etapes: ['La lumière voyage pendant un an', 'Elle parcourt une très grande distance', 'Cette distance est l’année-lumière'], description: 'La lumière voyage pendant un an. Elle parcourt une très grande distance. Cette distance s’appelle une année-lumière.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Une année-lumière : environ 9 460 milliards de km', 'Soit environ 9,46 × 10¹² km', 'Une étoile à 4,2 années-lumière : sa lumière a voyagé environ 4,2 ans'], description: 'Une année-lumière vaut environ 9 460 milliards de kilomètres, soit environ 9,46 fois 10 puissance 12 kilomètres. Pour une étoile à 4,2 années-lumière, la lumière a voyagé environ 4,2 ans.' },
      etapes: [
        'Dans un an, la lumière parcourt une distance énorme : environ 9 460 milliards de kilomètres.',
        'Cette distance s’appelle une année-lumière. Ce n’est pas un temps, c’est une longueur.',
        'On l’écrit aussi avec une puissance de dix : environ 9,46 fois dix puissance douze kilomètres.',
        'Une étoile à huit années-lumière : sa lumière a voyagé huit ans avant d’arriver chez nous.',
      ],
    },

    decouverte: {
      texte: (c) => 'Les étoiles sont si loin que les kilomètres ne suffisent plus. On a donc inventé ' + c.mot('unite') + '. ' +
        'Regarde la lumière voyager pendant un an : c’est ' + c.mot('annee') + '. L’astuce : le mot « année » trompe, car cela se mesure en kilomètres.',
    },

    vocabulaire: {
      termes: {
        unite: { sesMots: 'une règle pour mesurer très loin', officiel: 'une unité de distance', lesDeux: 'une règle pour mesurer très loin, que les physiciens appellent une unité de distance' },
        annee: { sesMots: 'son trajet', officiel: 'une année-lumière', lesDeux: 'son trajet, que les physiciens appellent une année-lumière' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une règle pour mesurer très loin, et le trajet de la lumière pendant un an. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : une unité de distance, et une année-lumière. Une année-lumière est une distance, jamais une durée.',
        'Tu connais les mots officiels : une unité de distance, et une année-lumière.',
      ],
    },

    exercices: [
      qcm('que-mesure-t-on', 'dehors',
        [
          ['Une étoile est à huit années-lumière. Que mesure ce nombre ?', 'Une distance', 'L’année-lumière est une unité de distance.'],
          ['Rachel dit : « une année-lumière, c’est un an ». Que mesure vraiment une année-lumière ?', 'Une distance', 'C’est la distance que la lumière parcourt en un an.'],
          ['Que mesure 300 000 km/s ?', 'Une vitesse', 'Des kilomètres par seconde : c’est une vitesse.'],
          ['Que mesure « un an » ?', 'Une durée', 'Un an est un temps qui passe.'],
        ],
        (x) => x, ['Une distance', 'Une durée', 'Une vitesse'],
        'Regarde l’unité : des kilomètres, des secondes, ou des kilomètres par seconde.'),
      {
        id: 'temps-de-voyage',
        univers: 'famille',
        // [distance de l'étoile en années-lumière]
        versions: [[4.2], [8], [10], [25], [100]],
        genere(c) {
          const [n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans son livre, Moussa lit qu’une étoile est à ' + ecr(n) + ' années-lumière de la Terre. Depuis combien d’années sa lumière voyage-t-elle quand on la voit ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Une année-lumière, c’est la distance de la lumière en un an.',
            aideParlee: 'Une année-lumière, c’est la distance que la lumière fait en un an.',
            correction: ['Une année-lumière correspond à un an de voyage.', ecr(n) + ' années-lumière correspondent à ' + ecr(n) + ' ans de voyage.'],
          };
        },
      },
      {
        id: 'en-milliards-de-km',
        univers: 'chansons',
        // [nombre d'années-lumière]
        versions: [[4.2], [5], [6], [8], [9], [10]],
        genere(c) {
          const [n] = c.alea.choisir(this.versions);
          const d = Math.round(n * AL * 100) / 100;
          return {
            enonce: 'Une année-lumière vaut environ 9 460 milliards de km. Une étoile est à ' + ecr(n) + (n > 1 ? ' années-lumière' : ' année-lumière') + '. Quelle est cette distance, en milliards de km ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Multiplie le nombre d’années-lumière par 9 460.',
            aideParlee: 'Multiplie le nombre d’années-lumière par la valeur d’une année-lumière.',
            correction: [ecr(n) + ' × ' + ecr(AL) + ' ≈ ' + ecr(d) + ' milliards de km.'],
          };
        },
      },
      {
        id: 'ecrire-avec-une-puissance',
        univers: 'appareils',
        // [nombre de milliards de km, coefficient, exposant]
        versions: [[9460, 9.46, 12], [3000, 3, 12], [150, 1.5, 11], [28000, 2.8, 13], [45, 4.5, 10]],
        genere(c) {
          const [n, a, e] = c.alea.choisir(this.versions);
          const juste = ecr(a) + ' × ' + puissance(10, e);
          return {
            enonce: 'Une distance vaut ' + ecr(n) + ' milliards de km. Un milliard s’écrit 10⁹. Comment écrire cette distance en kilomètres, avec une puissance de 10 ?',
            reponse: choix(c.alea, juste, [ecr(a) + ' × ' + puissance(10, e - 3), ecr(a) + ' × ' + puissance(10, e + 1)]),
            aide: 'Écris ' + ecr(n) + ' × 10⁹, puis décale la virgule.',
            aideParlee: 'Multiplie le nombre par un milliard, puis écris le résultat avec un seul chiffre avant la virgule.',
            correction: [ecr(n) + ' × 10⁹ = ' + ecr(a) + ' × ' + puissance(10, e) + ' km.', 'Réponse : ' + juste + ' km.'],
          };
        },
      },
      qcm('vrai-ou-faux', 'maison-courses',
        [
          ['Une année-lumière est une durée.', 'Faux', 'C’est une distance.'],
          ['Une année-lumière est la distance que la lumière parcourt en un an.', 'Vrai', 'C’est la définition.'],
          ['Une étoile à 8 années-lumière est à 8 ans de voyage en voiture.', 'Faux', 'Une année-lumière est une distance, pas un temps de voyage en voiture.'],
          ['La lumière d’une étoile à 10 années-lumière est partie il y a environ 10 ans.', 'Vrai', 'Elle a voyagé 10 ans pour arriver.'],
          ['Une année-lumière vaut environ 9 460 milliards de km.', 'Vrai', 'C’est la distance parcourue en un an.'],
          ['Une année-lumière vaut environ 300 000 km.', 'Faux', 'Elle vaut environ 9 460 milliards de km. 300 000 km, c’est ce que la lumière fait en une seconde.'],
        ],
        (x) => x + ' Vrai ou faux ?', ['Vrai', 'Faux'],
        'Souviens-toi : une année-lumière est une distance.'),
    ],

    defi: {
      // [distance de l'étoile en années-lumière]
      versions: [[4.2], [8], [4.4], [10]],
      genere(c) {
        const [n] = c.alea.choisir(this.versions);
        const d = Math.round(n * AL * 100) / 100;
        const recent = n < 5;
        return {
          enonce: 'Dans un livre, Moussa lit qu’une étoile est à ' + ecr(n) + ' années-lumière de la Terre. Une année-lumière vaut environ 9 460 milliards de km.',
          questions: [
            {
              texte: 'Question 1. La lumière que Rachel reçoit de cette étoile est partie il y a combien d’années ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Une année-lumière correspond à un an de voyage.',
              correction: ['Une année-lumière correspond à un an de voyage.', ecr(n) + ' années-lumière, c’est ' + ecr(n) + ' ans de voyage.'],
            },
            {
              texte: 'Question 2. Quelle est la distance de cette étoile, en milliards de km ?',
              reponse: { type: 'nombre', valeur: d },
              aide: 'Multiplie par 9 460.',
              aideParlee: 'Multiplie le nombre d’années-lumière par la valeur d’une année-lumière.',
              correction: [ecr(n) + ' × ' + ecr(AL) + ' ≈ ' + ecr(d) + ' milliards de km.'],
            },
            {
              texte: 'Question 3. Cette lumière date-t-elle de moins de 5 ans ?',
              reponse: choix(c.alea, recent ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare le temps de voyage à 5 ans.',
              correction: [ecr(n) + ' ans, c’est ' + (recent ? 'moins' : 'plus') + ' que 5 ans.', 'Réponse : ' + (recent ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Explique avec tes mots pourquoi le mot « année » dans « année-lumière » ne mesure pas un temps.',
              correction: ['Une année-lumière est la distance que la lumière parcourt en un an.', 'C’est donc une longueur, qu’on peut écrire en kilomètres : environ 9 460 milliards de km.'],
              grille: ['As-tu dit qu’une année-lumière est une distance ?', 'As-tu parlé de la lumière qui voyage pendant un an ?', 'As-tu donné une valeur en kilomètres ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais qu’une année-lumière est une distance, et tu sais lire la distance des étoiles.',
    carte: ['que-mesure-t-on', 'en-milliards-de-km', 'ecrire-avec-une-puissance'],
    papierDuSoir: { exercices: ['en-milliards-de-km', 'ecrire-avec-une-puissance'], defi: true },
    automatismes: [
      {
        id: 'milliards',
        versions: [[2], [3], [5], [10]],
        genere(c) { const [n] = c.alea.choisir(this.versions); return { enonce: n + ' × 1 000 = ?', reponse: { type: 'nombre', valeur: n * 1000 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Depuis l’Afrique du Sud, Thomas Henderson a observé Alpha du Centaure, puis calculé la distance de cette étoile.',
    prenoms: ['Moussa'],
  };
});
