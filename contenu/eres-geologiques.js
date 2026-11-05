/* Notion 5 du bloc SVT « Planète Terre, environnement, action humaine » : les ères géologiques. La carrière de Clarisse.
   Manipulation à l'écran : ranger les ères du plus ancien au plus récent (js/manipulations/ranger.js).
   Les nombres des exercices sont des exemples de la notion, arrondis.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ecr = O.ecr;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const ERES = ['le Précambrien', 'l’ère primaire', 'l’ère secondaire', 'l’ère tertiaire', 'l’ère quaternaire'];
  const MEME = 'Les deux ont le même âge';

  return {
    id: 'eres-geologiques',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Les ères géologiques',
    classe: 'cycle 4',
    univers: ['dehors', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : temps géologique, strates, fossiles, ères géologiques.',

    accroche: {
      texte: 'Rachel visite une carrière avec Clarisse. Les couches de pierre sont empilées comme des pages. ' +
        'Tout en bas, il y a des coquillages fossiles. Ces pages racontent un temps immense. Comment le découper en chapitres ?',
      image: { dessin: 'chaine', etapes: ['Le temps passe : des millions d’années', 'Les couches s’empilent, la vie change', 'Les fossiles aident à dater les couches'], description: 'Le temps passe pendant des millions d’années. Les couches de roche s’empilent et la vie change. Les fossiles aident à dater les couches.' },
    },

    manipulation: {
      type: 'ranger',
      etapes: ['Précambrien', 'Ère primaire', 'Ère secondaire', 'Ère tertiaire', 'Ère quaternaire'],
      depart: ['Ère tertiaire', 'Précambrien', 'Ère quaternaire', 'Ère primaire', 'Ère secondaire'],
      consigne: 'Range les ères du plus ancien en haut au plus récent en bas. Utilise les boutons monter et descendre.',
    },

    decouverte: {
      texte: (c) => 'L’histoire de la Terre se compte en milliards d’années. Les scientifiques la découpent en périodes : ce sont ' + c.mot('ere') + '. ' +
        'Du plus ancien au plus récent : le Précambrien, puis l’ère primaire, l’ère secondaire, l’ère tertiaire et l’ère quaternaire. ' +
        'L’astuce : dans une falaise, plus une couche est profonde, plus elle est ancienne.',
    },

    vocabulaire: {
      termes: {
        ere: { sesMots: 'de grands chapitres du temps passé', officiel: 'des ères géologiques', lesDeux: 'de grands chapitres du temps passé, que l’on appelle des ères géologiques' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les grands chapitres du temps passé. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : les ères géologiques, pour les grands chapitres du temps passé.',
        'Tu connais le mot officiel : les ères géologiques. Et tu sais les ranger, du Précambrien jusqu’à l’ère quaternaire.',
      ],
    },

    exercices: [
      {
        id: 'plus-ancienne',
        univers: 'dehors',
        // [numéro de la période A, numéro de la période B, 0 = la plus ancienne demandée, 1 = la plus récente demandée] ; ordre des numéros : du plus ancien au plus récent
        versions: [[1, 2, 0], [2, 3, 1], [0, 3, 0], [3, 4, 1], [1, 4, 0], [0, 2, 1]],
        genere(c) {
          const [i, j, r] = c.alea.choisir(this.versions);
          const bonne = cap(r === 0 ? ERES[i] : ERES[j]), autre = cap(r === 0 ? ERES[j] : ERES[i]);
          return {
            enonce: 'Entre ' + ERES[i] + ' et ' + ERES[j] + ', quelle période est la plus ' + (r === 0 ? 'ancienne' : 'récente') + ' ?',
            reponse: O.choix(c.alea, bonne, [autre, MEME]),
            aide: 'Retiens l’ordre : Précambrien, primaire, secondaire, tertiaire, quaternaire. Du plus ancien au plus récent.',
            correction: ['Du plus ancien au plus récent : Précambrien, primaire, secondaire, tertiaire, quaternaire.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'frise',
        univers: 'dehors',
        // [repère, millions d'années] ; 1 cm pour 100 millions d'années
        versions: [['la fin de l’ère secondaire', 66], ['le début de l’ère secondaire', 250], ['le début de l’ère primaire', 540], ['un fossile vieux de 100 millions d’années', 100], ['un fossile vieux de 400 millions d’années', 400]],
        genere(c) {
          const [ev, m] = c.alea.choisir(this.versions);
          const r = Math.round(m) / 100;
          return {
            enonce: 'Sur une frise, 1 cm représente 100 millions d’années, et aujourd’hui est tout à droite. Repère : il y a environ ' + m + ' millions d’années (' + ev + '). À combien de centimètres de la droite place-t-on ce repère ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Divise ' + m + ' par 100.',
            aideParlee: 'Divise le nombre de millions d’années par cent, puisqu’un centimètre vaut cent millions d’années.',
            correction: [m + ' ÷ 100 = ' + ecr(r) + ' cm.'],
          };
        },
      },
      {
        id: 'duree-periode',
        univers: 'famille',
        // [période, début (millions d'années), fin (millions d'années)]
        versions: [['l’ère primaire', 540, 250], ['l’ère secondaire', 250, 66], ['l’ère primaire et l’ère secondaire ensemble', 540, 66], ['le Précambrien', 4600, 540]],
        genere(c) {
          const [nom, d, f] = c.alea.choisir(this.versions);
          return {
            enonce: 'Considère ' + nom + '. Dans cet exemple, cette période commence il y a environ ' + d + ' millions d’années et finit il y a environ ' + f + ' millions d’années. Quelle est sa durée, en millions d’années ?',
            reponse: { type: 'nombre', valeur: d - f },
            aide: 'Enlève la fin au début : ' + d + ' − ' + f + '.',
            aideParlee: 'Enlève la date de fin à la date de début.',
            correction: [d + ' − ' + f + ' = ' + (d - f) + ' millions d’années.'],
          };
        },
      },
      {
        id: 'siecles-de-depot',
        univers: 'dehors',
        // [millimètres déposés par siècle, centimètres de roche]
        versions: [[1, 5], [2, 6], [5, 10], [2, 10], [1, 3], [5, 15]],
        genere(c) {
          const [mm, cm] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple, une couche de roche se dépose de ' + mm + ' mm par siècle. Combien de siècles faut-il pour déposer ' + cm + ' cm de roche ?',
            reponse: { type: 'nombre', valeur: (cm * 10) / mm },
            aide: 'Passe d’abord les ' + cm + ' cm en millimètres, puis divise par ' + mm + '.',
            aideParlee: 'Passe d’abord les centimètres en millimètres, puis divise par ce qui se dépose en un siècle.',
            correction: [cm + ' cm = ' + cm * 10 + ' mm.', cm * 10 + ' ÷ ' + mm + ' = ' + (cm * 10) / mm + ' siècles.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'famille',
        [['Les ères géologiques se comptent en millions d’années.', 'Vrai', 'Vrai : le temps géologique est immense, et chaque ère dure des millions d’années.'], ['Dans une falaise, les couches du bas sont en général les plus anciennes.', 'Vrai', 'Vrai : les couches se déposent l’une sur l’autre, donc celles du bas sont arrivées en premier.'], ['L’ère quaternaire est la plus ancienne.', 'Faux', 'Faux : du plus ancien au plus récent, le quaternaire vient en dernier. C’est la plus récente.'], ['Les grands dinosaures ont disparu à la fin de l’ère secondaire.', 'Vrai', 'Vrai : cette disparition marque la fin de l’ère secondaire.'], ['Le Précambrien est la période la plus récente.', 'Faux', 'Faux : le Précambrien est la plus ancienne, avant l’ère primaire.']],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Ordre : Précambrien, primaire, secondaire, tertiaire, quaternaire.'),
    ],

    defi: {
      // [millimètres déposés par siècle, centimètres sous le fossile A, centimètres sous le fossile B]
      versions: [[2, 6, 3], [5, 10, 20], [2, 10, 15], [1, 4, 2]],
      genere(c) {
        const [v, da, db] = c.alea.choisir(this.versions);
        const sa = (da * 10) / v;
        const vieux = da > db ? 'Fossile A' : 'Fossile B';
        return {
          enonce: 'Rachel et Clarisse étudient une paroi de carrière. Dans cet exemple, la roche s’est déposée régulièrement de ' + v + ' mm par siècle. Le fossile A est sous ' + da + ' cm de roche, le fossile B sous ' + db + ' cm de roche.',
          image: { dessin: 'barres', barres: [{ nom: 'Fossile A', parts: da }, { nom: 'Fossile B', parts: db }], description: 'Deux barres, chaque part valant un centimètre de roche au-dessus du fossile : le fossile A est sous ' + da + ' cm, le fossile B sous ' + db + ' cm.' },
          questions: [
            {
              texte: 'Question 1. Depuis combien de siècles le fossile A est-il enfoui ? Pour le savoir, calcule le temps qu’il a fallu pour déposer la roche au-dessus de lui.',
              reponse: { type: 'nombre', valeur: sa },
              aide: 'Passe les centimètres en millimètres, puis divise par ce qui se dépose en un siècle.',
              correction: [da + ' cm = ' + da * 10 + ' mm.', da * 10 + ' ÷ ' + v + ' = ' + sa + ' siècles.'],
            },
            {
              texte: 'Question 2. Convertis ce résultat en années. (1 siècle = 100 ans)',
              reponse: { type: 'nombre', valeur: sa * 100 },
              aide: 'Multiplie par 100.',
              correction: [sa + ' × 100 = ' + sa * 100 + ' ans.'],
            },
            {
              texte: 'Question 3. Lequel des deux fossiles est le plus ancien ?',
              reponse: O.choix(c.alea, vieux, ['Fossile A', 'Fossile B', MEME]),
              aide: 'Plus une couche est profonde, plus elle est ancienne.',
              correction: ['Le fossile A est sous ' + da + ' cm, le fossile B sous ' + db + ' cm.', 'Réponse : ' + vieux + '.'],
            },
            {
              texte: 'Question 4. Explique, en deux phrases, comment des fossiles et des couches aident à raconter l’histoire de la Terre.',
              correction: ['Les couches s’empilent : celles du bas sont en général les plus anciennes.', 'Les fossiles d’une couche montrent quels êtres vivants existaient à cette époque.'],
              grille: ['As-tu dit que les couches du bas sont les plus anciennes ?', 'As-tu dit que les fossiles montrent la vie d’une époque ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais ranger les grandes ères de la Terre, et lire dans les couches comme dans un livre très ancien.',
    carte: ['plus-ancienne', 'frise', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['frise', 'siecles-de-depot'], defi: true },
    automatismes: [
      {
        id: 'ancien-ou-recent',
        versions: [['le Précambrien', 'le plus ancien'], ['l’ère quaternaire', 'le plus récent']],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: d.charAt(0).toUpperCase() + d.slice(1) + ' : le plus ancien ou le plus récent ?', reponse: O.choix(c.alea, b, ['le plus ancien', 'le plus récent']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Niger, dans le Sahara, des paléontologues ont trouvé des dinosaures vieux d’environ 110 millions d’années.',
    prenoms: ['Rachel', 'Clarisse'],
  };
});
