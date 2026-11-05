/* Notion 4 du bloc SVT « Le corps humain et la santé » : neurones et message nerveux. Le relais de la danse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ELEC = 'Électrique', CHIM = 'Chimique';

  return {
    id: 'neurones',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Neurones et message nerveux',
    classe: '4e',
    univers: ['danses', 'famille', 'appareils'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : neurones, message nerveux, synapses.',

    accroche: {
      texte: 'À la fête, Rebecca et ses amies dansent en file : chacune tape l’épaule de la suivante, qui tape celle d’après. Le signal file jusqu’au bout de la file ! ' +
        'Dans ton corps, les messages voyagent un peu comme ça, de cellule en cellule. Comment passent-ils d’une cellule à l’autre ?',
      image: { dessin: 'chaine', etapes: ['Cellule nerveuse 1', 'Petit espace', 'Cellule nerveuse 2', 'Petit espace', 'Cellule nerveuse 3'], description: 'Trois cellules nerveuses à la suite, séparées par de petits espaces.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Message électrique le long de la cellule', 'Arrivée au bout de la cellule', 'Molécules libérées dans le petit espace', 'Message électrique dans la cellule suivante'], description: 'Le passage du message : électrique le long d’une cellule, chimique dans le petit espace, puis électrique à nouveau.' },
      etapes: [
        'Le système nerveux est fait de cellules nerveuses, avec de longs prolongements, comme des fils.',
        'Le long d’une cellule nerveuse, le message est électrique. Il va très vite.',
        'Entre deux cellules, il y a un tout petit espace. Le message ne saute pas : la première cellule libère des molécules, qui vont exciter la suivante.',
        'Dans la cellule suivante, le message redevient électrique. Un nerf, c’est un faisceau de nombreux prolongements de ces cellules.',
      ],
    },

    decouverte: {
      texte: (c) => 'Les cellules du système nerveux, avec leurs longs prolongements, sont ' + c.mot('neurones') + '. Le message nerveux est électrique le long d’une cellule, et chimique dans le petit espace entre deux cellules. ' +
        'Là, des molécules sont libérées pour passer le relais. ' +
        'L’astuce : électrique dans le fil, chimique dans l’espace.',
    },

    vocabulaire: {
      termes: {
        neurones: { sesMots: 'des cellules-fils', officiel: 'des neurones', lesDeux: 'des cellules-fils, que les scientifiques appellent des neurones' },
      },
      textes: [
        'Pour l’instant, garde tes mots : des cellules-fils se passent le message, comme un relais, avec un petit espace entre elles. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : les cellules-fils sont des neurones. Le petit espace entre deux neurones est une synapse, et les molécules libérées sont des neurotransmetteurs.',
        'Tu connais les mots officiels : le message nerveux est électrique le long des neurones, et chimique dans les synapses, grâce aux neurotransmetteurs.',
      ],
    },

    exercices: [
      {
        id: 'electrique-ou-chimique',
        univers: 'appareils',
        versions: [['le long d’un neurone', ELEC], ['dans une synapse', CHIM], ['le long d’une fibre d’un nerf', ELEC], ['entre deux neurones', CHIM]],
        genere(c) {
          const [ou, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le message nerveux est-il électrique ou chimique ' + ou + ' ?',
            reponse: O.choix(c.alea, bonne, [ELEC, CHIM]),
            aide: 'Électrique dans le fil, chimique dans l’espace.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'combien-de-synapses',
        univers: 'danses',
        versions: [2, 3, 4, 5, 6, 8],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Un message traverse une chaîne de ' + n + ' neurones placés bout à bout. Combien de synapses traverse-t-il ?',
            reponse: { type: 'nombre', valeur: n - 1 },
            aide: 'Un petit espace entre chaque cellule et la suivante : compte les espaces.',
            correction: ['Entre ' + n + ' neurones à la suite, il y a ' + O.nb(n - 1, 'espace') + ' : ' + O.nb(n - 1, 'synapse') + '.'],
          };
        },
      },
      {
        id: 'vitesse',
        univers: 'appareils',
        // [distance en cm, durée en millisecondes]
        versions: [[50, 5], [100, 10], [60, 6], [40, 4], [90, 9], [80, 8]],
        genere(c) {
          const [d, t] = c.alea.choisir(this.versions);
          const v = (10 * d) / t;
          return {
            enonce: 'Un message parcourt ' + d + ' cm le long d’une fibre nerveuse en ' + t + ' millisecondes. Quelle est sa vitesse, en mètres par seconde ?',
            reponse: { type: 'nombre', valeur: v },
            aide: d + ' cm = ' + String(d / 100).replace('.', ',') + ' m, et ' + t + ' ms = ' + String(t / 1000).replace('.', ',') + ' s. Divise.',
            aideParlee: 'Convertis la distance en mètres et la durée en secondes, puis divise la distance par la durée.',
            correction: [d + ' cm = ' + String(d / 100).replace('.', ',') + ' m ; ' + t + ' ms = ' + String(t / 1000).replace('.', ',') + ' s.', 'Vitesse : ' + v + ' m par seconde.'],
          };
        },
      },
      {
        id: 'quelle-molecule',
        univers: 'famille',
        versions: [1, 2, 3],
        genere(c) {
          const bonne = 'Un neurotransmetteur';
          return {
            enonce: 'Dans une synapse, quelle sorte de molécule passe le message d’un neurone au suivant ?',
            reponse: O.choix(c.alea, bonne, ['Une hormone de croissance', 'Un globule rouge']),
            aide: 'Son nom dit qu’il transmet le message entre deux cellules nerveuses.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'danses',
        versions: [['Un nerf est fait de nombreuses fibres de neurones.', true], ['Le message saute directement d’un neurone à l’autre, comme une étincelle.', false], ['Un neurone est une cellule.', true], ['Le message nerveux est chimique tout le long du neurone.', false]],
        genere(c) {
          const [phrase, vrai] = c.alea.choisir(this.versions);
          const bonne = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Aminata affirme : « ' + phrase + ' » Vrai ou faux ?',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Électrique le long des cellules ; chimique dans les petits espaces entre elles.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [nombre de neurones, distance en cm, durée en ms]
      versions: [[3, 100, 10], [4, 50, 5], [5, 60, 6], [3, 80, 8], [4, 90, 9], [6, 40, 4]],
      genere(c) {
        const [n, d, t] = c.alea.choisir(this.versions);
        const v = (10 * d) / t;
        return {
          enonce: 'Dans un manuel, Rebecca voit le schéma d’un message qui traverse ' + n + ' neurones à la suite. Sur le premier neurone, il parcourt ' + d + ' cm en ' + t + ' millisecondes.',
          image: { dessin: 'chaine', etapes: Array.from({ length: n }, (_, i) => 'Neurone ' + (i + 1)), description: 'Une chaîne de ' + n + ' neurones à la suite.' },
          questions: [
            {
              texte: 'Question 1. Combien de synapses le message traverse-t-il ?',
              reponse: { type: 'nombre', valeur: n - 1 },
              aide: 'Une synapse entre deux neurones qui se suivent.',
              correction: [(n - 1) + ' synapses.'],
            },
            {
              texte: 'Question 2. Quelle est sa vitesse sur le premier neurone, en mètres par seconde ?',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Convertis en mètres et en secondes, puis divise.',
              correction: ['Vitesse : ' + v + ' m par seconde.'],
            },
            {
              texte: 'Question 3. Explique comment le message passe d’un neurone au suivant.',
              correction: ['Le message arrive, électrique, au bout du neurone.', 'Dans la synapse, le neurone libère des neurotransmetteurs, des molécules qui excitent le neurone suivant.', 'Le message redevient électrique dans le neurone suivant.'],
              grille: ['As-tu dit que le message est électrique dans le neurone ?', 'As-tu parlé de la synapse et des neurotransmetteurs ?', 'As-tu dit que le neurone suivant prend le relais ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Électrique dans le fil, chimique dans l’espace : tu sais comment les cellules nerveuses se passent le relais.',
    carte: ['electrique-ou-chimique', 'combien-de-synapses', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['vitesse', 'combien-de-synapses'], defi: true },
    automatismes: [
      {
        id: 'synapses-rapide',
        versions: [2, 3, 5, 10],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' neurones en file : combien de synapses ?', reponse: { type: 'nombre', valeur: n - 1 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? L’Espagnol Santiago Ramón y Cajal a dessiné les neurones au microscope, et défendu l’idée qu’ils sont des cellules séparées.',
    prenoms: ['Rebecca', 'Aminata'],
  };
});
