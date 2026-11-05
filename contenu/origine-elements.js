/* Notion 4 du bloc « Signaux et Univers » : l'origine des éléments. Rachel et Moussa sous les étoiles.
   Les nombres des exercices sont des exemples de la notion.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r1 = (x) => Math.round(x * 10) / 10;

  // [question, bonne réponse, deux pièges (faux pour cette question), explication]
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
    id: 'origine-elements',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'L’origine des éléments',
    classe: 'cycle 4',
    univers: ['dehors', 'cuisine-restaurant', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : l’Univers, hydrogène et hélium après le Big Bang, éléments plus lourds formés dans les étoiles.',

    accroche: {
      texte: 'Rachel mange une orange avec Moussa. Il lui dit : « Tu es faite de poussières d’étoiles ! » Elle rit, mais il l’a lu dans un livre. Que veut-il dire ?',
      image: { dessin: 'chaine', etapes: ['Des étoiles', 'De la matière envoyée dans l’espace', 'Rachel et son orange'], description: 'Des étoiles envoient de la matière dans l’espace. Cette matière arrive jusqu’à Rachel et à son orange.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Big Bang : hydrogène et hélium', 'Étoiles : éléments plus lourds', 'Explosion : éléments dispersés', 'Planètes et êtres vivants'], description: 'Après le Big Bang, il y a surtout de l’hydrogène et de l’hélium. Les étoiles fabriquent des éléments plus lourds. Elles explosent et dispersent ces éléments, qui arrivent dans les planètes et les êtres vivants.' },
      etapes: [
        'Le Big Bang a eu lieu il y a environ 13,8 milliards d’années.',
        'Juste après, il n’y a presque que de l’hydrogène et de l’hélium.',
        'La gravitation rassemble ces gaz en boules qui chauffent : les premières étoiles naissent.',
        'Dans les étoiles, la fusion nucléaire assemble de petits atomes en plus gros : carbone, oxygène, fer.',
        'Quand une grosse étoile explose, elle lance ces éléments dans l’espace.',
        'Ils entrent dans de nouveaux nuages, puis dans des planètes et des êtres vivants. Nous sommes faits de poussières d’étoiles.',
      ],
    },

    decouverte: {
      texte: (c) => 'Hydrogène, hélium, carbone, oxygène, fer : ce sont ' + c.mot('elements') + '. ' +
        'Juste après le Big Bang, il n’y avait presque que de l’hydrogène et de l’hélium. Regarde ce qui se passe au cœur d’une étoile. C’est ' + c.mot('fusion') + '. ' +
        'L’étoile fabrique ainsi les éléments plus lourds. Si elle est très grosse, elle explose et les envoie dans l’espace. L’astuce : le carbone et l’oxygène de ton corps viennent des étoiles.',
    },

    vocabulaire: {
      termes: {
        elements: { sesMots: 'les différentes sortes d’atomes', officiel: 'les éléments chimiques', lesDeux: 'les différentes sortes d’atomes, que l’on appelle les éléments chimiques' },
        fusion: { sesMots: 'l’assemblage de petits atomes en plus gros', officiel: 'la fusion nucléaire', lesDeux: 'l’assemblage de petits atomes en plus gros, que l’on appelle la fusion nucléaire' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les différentes sortes d’atomes, et l’assemblage de petits atomes en plus gros. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : les éléments chimiques, et la fusion nucléaire.',
        'Tu connais les mots officiels : les éléments chimiques et la fusion nucléaire. Oui, nous sommes faits de poussières d’étoiles.',
      ],
    },

    exercices: [
      O.qcm('ou-est-ne', 'dehors', [
        ['l’hydrogène', 'Juste après le Big Bang', 'L’hydrogène existe dès les premiers temps de l’Univers.'],
        ['le carbone', 'Dans les étoiles', 'Le carbone est fabriqué par la fusion nucléaire dans les étoiles.'],
        ['l’oxygène', 'Dans les étoiles', 'L’oxygène est fabriqué par la fusion nucléaire dans les étoiles.'],
        ['le fer', 'Dans les étoiles', 'Le fer est fabriqué dans les étoiles.'],
        ['l’azote', 'Dans les étoiles', 'L’azote est fabriqué dans les étoiles.'],
      ], (x) => 'Où s’est formé ' + x + ' ?', ['Juste après le Big Bang', 'Dans les étoiles', 'Dans un laboratoire'], 'Seuls l’hydrogène et l’hélium viennent du Big Bang. Les éléments plus lourds sont nés dans les étoiles.'),
      O.qcm('vrai-faux-elements', 'cuisine-restaurant', [
        ['Après le Big Bang, il y avait surtout de l’hydrogène et de l’hélium.', 'Vrai', 'C’est bien ce qui existait juste après le Big Bang.'],
        ['Le carbone de ton corps a été fabriqué dans des étoiles.', 'Vrai', 'Le carbone est fabriqué dans les étoiles.'],
        ['Tous les éléments ont été formés juste après le Big Bang.', 'Faux', 'Seuls l’hydrogène et l’hélium sont nés ainsi. Les autres sont nés dans les étoiles.'],
        ['Les étoiles ne fabriquent que de l’hydrogène.', 'Faux', 'Les étoiles transforment l’hydrogène en hélium, puis en éléments plus lourds.'],
        ['Une grosse étoile qui explose disperse des éléments dans l’espace.', 'Vrai', 'Son explosion lance les éléments qu’elle a fabriqués.'],
        ['L’oxygène que tu respires a été fabriqué dans une étoile.', 'Vrai', 'L’oxygène est un élément plus lourd, fabriqué dans les étoiles.'],
      ], (x) => 'Vrai ou faux ? ' + x, ['Vrai', 'Faux'], 'Seuls l’hydrogène et l’hélium viennent du Big Bang. Les éléments plus lourds viennent des étoiles.'),
      {
        id: 'explosion-ancienne',
        univers: 'dehors',
        // [naissance de l'étoile : il y a E milliards d'années, durée de vie D en milliards d'années]
        versions: [[12, 2], [11, 3], [10, 2], [9, 3], [12, 4], [8, 2]],
        genere(c) {
          const [e, d] = c.alea.choisir(this.versions);
          const r = e - d;
          return {
            enonce: 'Dans cet exemple, une étoile se forme il y a ' + e + ' milliards d’années. Elle vit ' + d + ' milliards d’années, puis elle rejette sa matière dans l’espace. Il y a combien de milliards d’années a-t-elle rejeté sa matière ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule ' + e + ' − ' + d + '.',
            aideParlee: 'Enlève la durée de vie de l’étoile au moment de sa naissance.',
            correction: [e + ' − ' + d + ' = ' + r + ' milliards d’années.'],
          };
        },
      },
      Q('sens-phrase', 'famille', [
        ['Que fait la fusion nucléaire dans une étoile ?', 'Elle assemble de petits atomes en plus gros', ['Elle fabrique de l’eau pure', 'Elle coupe les atomes en deux pour en faire du gaz'], 'La fusion nucléaire assemble de petits atomes en atomes plus gros.'],
        ['Que fait l’explosion d’une grosse étoile ?', 'Elle disperse les éléments dans l’espace', ['Elle efface tous les éléments', 'Elle fabrique le Big Bang'], 'L’explosion lance dans l’espace les éléments fabriqués par l’étoile.'],
        ['Qu’y avait-il surtout juste après le Big Bang ?', 'De l’hydrogène et de l’hélium', ['Du carbone et du fer', 'De l’oxygène et de l’azote'], 'Juste après le Big Bang, il n’y a presque que de l’hydrogène et de l’hélium.'],
        ['Que veut dire : « nous sommes faits de poussières d’étoiles » ?', 'Les éléments de notre corps ont été fabriqués dans des étoiles', ['Nous sommes tombés du ciel comme des étoiles filantes', 'Notre corps est fait de lumière'], 'Le carbone, l’oxygène et d’autres éléments de notre corps sont nés dans des étoiles.'],
        ['Où se fabriquent les éléments plus lourds que l’hélium ?', 'Dans les étoiles', ['Dans les océans de la Terre', 'Dans les nuages de la Terre'], 'Les éléments plus lourds que l’hélium sont fabriqués dans les étoiles.'],
      ], (x) => x, 'Reprends l’histoire : Big Bang, étoiles, explosion, nouveaux nuages.'),
      {
        id: 'plus-vieux',
        univers: 'cuisine-restaurant',
        // [âge du carbone en milliards d'années]
        versions: [12, 10, 8, 6, 5],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const r = r1(13.8 - a);
          return {
            enonce: 'Dans cet exemple, un atome d’hydrogène date du Big Bang, il y a environ 13,8 milliards d’années. Un atome de carbone a été fabriqué dans une étoile il y a ' + a + ' milliards d’années. De combien l’hydrogène est-il plus ancien, en milliards d’années ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule 13,8 − ' + a + '.',
            aideParlee: 'Enlève l’âge du carbone à l’âge de l’hydrogène.',
            correction: ['13,8 − ' + a + ' = ' + ecr(r) + (r < 2 ? ' milliard' : ' milliards') + ' d’années.'],
          };
        },
      },
    ],

    defi: {
      // [naissance de l'étoile : il y a E milliards d'années, durée de vie D en milliards d'années]
      versions: [[12, 2], [8, 4], [10, 3], [6, 3]],
      genere(c) {
        const [e, d] = c.alea.choisir(this.versions);
        const age = r1(13.8 - e), expl = e - d, oui = expl > 4.6;
        return {
          enonce: 'Rachel et Moussa étudient l’histoire d’une étoile. Dans cet exemple, elle se forme il y a ' + e + ' milliards d’années et elle vit ' + d + ' milliards d’années avant de rejeter sa matière dans l’espace. L’Univers a environ 13,8 milliards d’années et le système solaire environ 4,6 milliards d’années.',
          questions: [
            {
              texte: 'Question 1. Quel âge avait l’Univers à la naissance de cette étoile, en milliards d’années ?',
              reponse: { type: 'nombre', valeur: age },
              aide: 'Calcule 13,8 − ' + e + '.',
              aideParlee: 'Enlève le moment de naissance de l’étoile à l’âge de l’Univers.',
              correction: ['13,8 − ' + e + ' = ' + ecr(age) + (age < 2 ? ' milliard' : ' milliards') + ' d’années.'],
            },
            {
              texte: 'Question 2. Il y a combien de milliards d’années l’étoile a-t-elle rejeté sa matière ?',
              reponse: { type: 'nombre', valeur: expl },
              aide: 'Calcule ' + e + ' − ' + d + '.',
              aideParlee: 'Enlève la durée de vie de l’étoile à son moment de naissance.',
              correction: [e + ' − ' + d + ' = ' + expl + ' milliards d’années.'],
            },
            {
              texte: 'Question 3. L’étoile a-t-elle rejeté sa matière avant la naissance du système solaire ?',
              reponse: O.choix(c.alea, oui ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare ce moment à 4,6 milliards d’années. Plus le nombre est grand, plus c’est ancien.',
              correction: ['L’étoile a rejeté sa matière il y a ' + expl + ' milliards d’années. Le système solaire est né il y a 4,6 milliards d’années.', expl + (oui ? ' est plus grand que 4,6 : c’est plus ancien.' : ' est plus petit que 4,6 : c’est plus récent.'), 'Réponse : ' + (oui ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Explique avec tes mots pourquoi on dit : « nous sommes faits de poussières d’étoiles ». Parle des étoiles et des éléments.',
              correction: ['Dans les étoiles, la fusion nucléaire fabrique des éléments plus lourds, comme le carbone et l’oxygène.', 'Les étoiles qui explosent les dispersent. Ils entrent ensuite dans les planètes et dans les êtres vivants.'],
              grille: ['As-tu dit que les étoiles fabriquent des éléments, comme le carbone ou l’oxygène ?', 'As-tu parlé de l’explosion qui disperse ces éléments ?', 'As-tu fait le lien avec notre corps ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais d’où viennent les éléments de ton corps : oui, tu es faite de poussières d’étoiles.',
    carte: ['ou-est-ne', 'vrai-faux-elements', 'explosion-ancienne'],
    papierDuSoir: { exercices: ['explosion-ancienne', 'plus-vieux'], defi: true },
    automatismes: [
      {
        id: 'moins-treize-huit',
        versions: [[3], [4], [6], [8]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: '14 − ' + a + ' = ?', reponse: { type: 'nombre', valeur: 14 - a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Grandie en Angleterre, Cecilia Payne a conclu que les étoiles sont surtout faites d’hydrogène et d’hélium.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
