/* Notion 4 du bloc SVT « Planète Terre, environnement, action humaine » : les volcans. La photo de Moussa.
   Les nombres des exercices sont des exemples de la notion, pas des mesures réelles.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const EFF = 'Éruption effusive', EXP = 'Éruption explosive', RIEN = 'Pas d’éruption';
  const MAGMA = 'Le magma', LAVE = 'La lave', CENDRES = 'Les cendres';
  const mettre = (n, s, p) => (n < 2 ? s : p);

  return {
    id: 'volcans',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Les volcans',
    classe: 'cycle 4',
    univers: ['dehors', 'champetre'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : volcans, éruptions, risques, lien avec les limites de plaques.',

    accroche: {
      texte: 'Moussa montre une photo à Rachel. Un volcan crache de la roche rouge et brûlante. ' +
        'D’où vient-elle ? Et pourquoi certains volcans coulent doucement, alors que d’autres explosent ?',
      image: { dessin: 'chaine', etapes: ['Sous terre : de la roche fondue', 'Elle monte par la cheminée', 'Elle sort : une éruption'], description: 'Dans un volcan, de la roche fondue se trouve sous terre, monte par la cheminée, puis sort lors d’une éruption.' },
    },

    manipulation: {
      image: { dessin: 'coupe-terre', couches: [['Cratère, au sommet', 1], ['Cheminée', 2], ['Poche de roche fondue', 2]], description: 'Coupe d’un volcan, de haut en bas : le cratère au sommet, la cheminée, puis une poche de roche fondue sous terre.' },
      etapes: [
        'Sous le volcan, il fait si chaud que la roche fond. Cette roche fondue monte, car elle est plus légère.',
        'Elle s’accumule dans une poche sous le volcan, puis cherche à sortir par la cheminée.',
        'Si elle est fluide, elle coule tranquillement comme une rivière de feu : l’éruption est effusive.',
        'Si elle est pâteuse, les gaz restent piégés. Ils finissent par exploser et projettent des cendres : l’éruption est explosive.',
        'Beaucoup de volcans se trouvent près des bords des grandes pièces de la Terre.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde sous le volcan : c’est ' + c.mot('magma') + '. ' +
        'Regarde ce qui sort du cratère : c’est ' + c.mot('lave') + '. ' +
        'Si elle est fluide, elle coule sans exploser. Si elle est pâteuse et pleine de gaz, elle explose. ' +
        'L’astuce : fluide, ça coule ; pâteux, ça explose.',
    },

    vocabulaire: {
      termes: {
        magma: { sesMots: 'la roche fondue qui attend en profondeur', officiel: 'le magma', lesDeux: 'la roche fondue qui attend en profondeur, que l’on appelle le magma' },
        lave: { sesMots: 'la roche fondue qui coule dehors', officiel: 'la lave', lesDeux: 'la roche fondue qui coule dehors, que l’on appelle la lave' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la roche fondue qui attend en profondeur, et la roche fondue qui coule dehors. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le magma, pour la roche fondue qui attend. Dehors, elle devient de la lave.',
        'Tu connais les mots officiels : le magma, la lave, l’éruption effusive et l’éruption explosive.',
      ],
    },

    exercices: [
      O.qcm('quel-type', 'dehors',
        [['La lave est fluide et coule doucement le long du volcan.', EFF, 'Une lave fluide laisse échapper les gaz : elle coule tranquillement, c’est une éruption effusive.'],
          ['Le magma est pâteux, les gaz restent piégés et projettent des cendres.', EXP, 'Quand les gaz restent piégés, ils finissent par exploser : c’est une éruption explosive.'],
          ['Une rivière de lave rouge descend lentement, sans explosion.', EFF, 'Sans explosion, avec une lave qui coule, c’est une éruption effusive.'],
          ['Un grand nuage de cendres est projeté très haut dans le ciel.', EXP, 'Un nuage de cendres est projeté par des explosions : c’est une éruption explosive.']],
        (x) => x + ' Quel type d’éruption est-ce ?', [EFF, EXP, RIEN],
        'Fluide, ça coule : effusive. Pâteux, ça explose : explosive.'),
      O.qcm('magma-ou-lave', 'champetre',
        [['La roche fondue qui se trouve dans la poche, sous le volcan.', MAGMA], ['La roche fondue qui coule sur le flanc du volcan.', LAVE],
          ['Les petits fragments de roche projetés en l’air par l’éruption.', CENDRES]].map((v) => [v[0], v[1], v[1] === CENDRES ? 'Les cendres correspondent à cette description : ce sont des fragments projetés en l’air.' : v[1] + ' correspond à cette description.']),
        (x) => x + ' De quoi s’agit-il ?', [MAGMA, LAVE, CENDRES],
        'Sous terre, c’est le magma. Dehors, c’est la lave. Les petits fragments projetés en l’air sont des cendres.'),
      {
        id: 'distance-coulee',
        univers: 'champetre',
        // [mètres par heure, heures]
        versions: [[50, 4], [100, 3], [150, 2], [200, 5], [100, 6], [50, 8]],
        genere(c) {
          const [v, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple, une coulée de lave avance de ' + v + ' m par heure. Quelle distance parcourt-elle en ' + h + ' heures ?',
            reponse: { type: 'nombre', valeur: v * h },
            aide: 'Calcule ' + v + ' × ' + h + '.',
            aideParlee: 'Multiplie la vitesse de la coulée par le nombre d’heures.',
            correction: [v + ' × ' + h + ' = ' + v * h + ' m.'],
          };
        },
      },
      {
        id: 'duree-coulee',
        univers: 'champetre',
        // [mètres par heure, mètres jusqu'au village]
        versions: [[100, 500], [200, 800], [50, 300], [150, 600], [100, 400]],
        genere(c) {
          const [v, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple, une coulée de lave avance de ' + v + ' m par heure. Un champ est à ' + d + ' m du volcan. Dans combien d’heures la lave y arrive-t-elle ?',
            reponse: { type: 'nombre', valeur: d / v },
            aide: 'Divise la distance par la vitesse : ' + d + ' ÷ ' + v + '.',
            aideParlee: 'Divise la distance par la vitesse de la coulée.',
            correction: [d + ' ÷ ' + v + ' = ' + d / v + ' ' + mettre(d / v, 'heure', 'heures') + '.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'dehors',
        [['Beaucoup de volcans se trouvent près des bords des plaques.', 'Vrai', 'Vrai : beaucoup de volcans se trouvent près des bords des plaques.'], ['Le magma devient de la lave quand il sort à la surface.', 'Vrai', 'Vrai : sous terre, c’est le magma ; dehors, c’est la lave.'], ['Une éruption explosive projette des cendres.', 'Vrai', 'Vrai : les gaz piégés explosent et projettent des cendres.'], ['Tous les volcans coulent doucement, sans aucun danger.', 'Faux', 'Faux : une lave pâteuse et pleine de gaz explose, et c’est en général plus dangereux.'], ['La lave d’une éruption effusive est très pâteuse et pleine de gaz.', 'Faux', 'Faux : en éruption effusive, la lave est fluide ; la lave pâteuse et pleine de gaz explose.']],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Fluide, ça coule. Pâteux, ça explose.'),
    ],

    defi: {
      // [mètres par heure, mètres jusqu'au village, heures avant la nuit]
      versions: [[100, 500, 6], [100, 500, 3], [200, 800, 5], [50, 300, 4]],
      genere(c) {
        const [v, d, h] = c.alea.choisir(this.versions);
        const arrive = v * h >= d;
        const t = d / v;
        return {
          enonce: 'Un volcan est en éruption effusive. Moussa et Aminata suivent la coulée de lave. Dans cet exemple, la lave avance de ' + v + ' m par heure. Le village est à ' + d + ' m du volcan, et la nuit tombe dans ' + h + ' heures.',
          image: { dessin: 'barres', barres: [{ nom: 'Village', parts: Math.round(d / 50) }, { nom: 'En ' + h + ' h', parts: Math.round((v * h) / 50) }], description: 'Deux barres, chaque part valant 50 mètres : le village est à ' + d + ' mètres du volcan, et la lave avance de ' + v * h + ' mètres en ' + h + ' heures.' },
          questions: [
            {
              texte: 'Question 1. En combien d’heures la lave arrive-t-elle au village ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Divise la distance du village par la vitesse de la lave.',
              correction: [d + ' ÷ ' + v + ' = ' + t + ' ' + mettre(t, 'heure', 'heures') + '.'],
            },
            {
              texte: 'Question 2. Quelle distance la lave parcourt-elle avant la nuit, en mètres ?',
              reponse: { type: 'nombre', valeur: v * h },
              aide: 'Multiplie la vitesse par le nombre d’heures.',
              correction: [v + ' × ' + h + ' = ' + v * h + ' m.'],
            },
            {
              texte: 'Question 3. La lave atteint-elle le village avant la nuit ?',
              reponse: O.choix(c.alea, arrive ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare la distance parcourue avant la nuit à la distance du village.',
              correction: [v * h + ' m ' + (arrive ? 'est supérieur ou égal à ' : 'est inférieur à ') + d + ' m.', 'Réponse : ' + (arrive ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Une éruption explosive est en général plus dangereuse qu’une éruption effusive. Rédige deux phrases pour expliquer pourquoi.',
              correction: ['Dans une éruption explosive, les gaz piégés explosent et projettent des cendres et des fragments de roche.', 'Ces projections et ces nuages de cendres touchent une zone bien plus large, et très vite.'],
              grille: ['As-tu parlé des gaz piégés et de l’explosion ?', 'As-tu cité les cendres ou les projections de roche ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais d’où vient la lave, et pourquoi un volcan peut couler doucement ou exploser.',
    carte: ['quel-type', 'magma-ou-lave', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['distance-coulee', 'duree-coulee'], defi: true },
    automatismes: [
      {
        id: 'fluide-ou-pateux',
        versions: [['fluide', EFF], ['pâteuse et pleine de gaz', EXP]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Une lave ' + d + ' : effusive ou explosive ?', reponse: O.choix(c.alea, b, [EFF, EXP]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En République démocratique du Congo, le volcan Nyiragongo, près de Goma, produit une lave très fluide qui coule vite.',
    prenoms: ['Rachel', 'Moussa', 'Aminata'],
  };
});
