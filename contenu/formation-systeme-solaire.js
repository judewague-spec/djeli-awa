/* Notion 3 du bloc « Signaux et Univers » : la formation du système solaire. Le ciel de Rachel et de Laure.
   Les nombres des exercices sont des exemples de la notion.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r1 = (x) => Math.round(x * 10) / 10;
  const r2 = (x) => Math.round(x * 100) / 100;

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
    id: 'formation-systeme-solaire',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'La formation du système solaire',
    classe: 'cycle 4',
    univers: ['dehors', 'famille', 'champetre'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : l’Univers, formation du système solaire à partir d’un nuage de gaz et de poussières.',

    accroche: {
      texte: 'Ce soir, Rachel repère une planète. Laure lui dit : « Le Soleil et les planètes ont environ 4,6 milliards d’années. » Mais avant, qu’y avait-il à leur place ?',
      image: { dessin: 'chaine', etapes: ['Il y a 4,6 milliards d’années : un nuage', 'Le Soleil naît au centre', 'Les planètes se forment autour'], description: 'Il y a environ 4,6 milliards d’années, un nuage. Puis le Soleil naît au centre, et les planètes se forment autour.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Nuage de gaz et de poussières', 'Effondrement : un disque qui tourne', 'Soleil au centre', 'Planètes dans le disque'], description: 'Un nuage de gaz et de poussières s’effondre en un disque qui tourne. Le Soleil se forme au centre et les planètes se forment dans le disque.' },
      etapes: [
        'Il y a environ 4,6 milliards d’années, un immense nuage de gaz et de poussières flotte dans l’espace.',
        'Ce nuage s’effondre sur lui-même, attiré par sa propre gravitation. Il se met à tourner et s’aplatit en disque.',
        'Au centre, la matière s’entasse et chauffe très fort : le Soleil naît.',
        'Dans le disque, les poussières se collent et grossissent : elles forment les planètes. Les plus grosses attirent aussi beaucoup de gaz.',
        'Près du Soleil, il y a les planètes rocheuses, comme la Terre. Plus loin, il y a les grosses planètes géantes.',
      ],
    },

    decouverte: {
      texte: (c) => 'Au départ, il y a un grand nuage de gaz et de poussières. Regarde ce qui le rassemble. C’est ' + c.mot('gravitation') + '. ' +
        'Le nuage s’effondre, tourne, et s’aplatit en disque. Au centre naît le Soleil. Dans le disque naissent les planètes. ' +
        'Au total, c’est ' + c.mot('systeme') + '. L’astuce : le Soleil et les planètes sont nés ensemble, du même nuage.',
    },

    vocabulaire: {
      termes: {
        gravitation: { sesMots: 'la force qui attire la matière vers le centre', officiel: 'la gravitation', lesDeux: 'la force qui attire la matière vers le centre, que les physiciens appellent la gravitation' },
        systeme: { sesMots: 'le Soleil et tout ce qui tourne autour de lui', officiel: 'le système solaire', lesDeux: 'le Soleil et tout ce qui tourne autour de lui, que l’on appelle le système solaire' },
      },
      textes: [
        'Pour l’instant, garde tes mots. Il y a la force qui attire la matière vers le centre. Il y a aussi le Soleil avec tout ce qui tourne autour de lui. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la gravitation, et le système solaire.',
        'Tu connais les mots officiels : la gravitation et le système solaire.',
      ],
    },

    exercices: [
      Q('ordre-formation', 'dehors', [
        ['Au départ, que trouve-t-on dans l’espace, là où sera le système solaire ?', 'Un nuage de gaz et de poussières', ['Un Soleil déjà allumé', 'Des planètes déjà formées'], 'Tout commence par un grand nuage de gaz et de poussières.'],
        ['Qu’est-ce qui naît au centre du disque qui tourne ?', 'Le Soleil', ['La Lune', 'Une planète rocheuse'], 'La matière s’entasse au centre et chauffe : le Soleil naît.'],
        ['Comment les planètes naissent-elles dans le disque ?', 'Des poussières se collent et grossissent', ['Elles arrivent d’une autre galaxie', 'Le Soleil les lance en explosant'], 'Dans le disque, les poussières se collent et forment peu à peu les planètes.'],
        ['Quelle force fait s’effondrer le nuage sur lui-même ?', 'La gravitation', ['Le vent', 'La chaleur d’un feu'], 'La gravitation attire la matière vers le centre du nuage.'],
        ['Que devient le nuage en s’effondrant et en tournant ?', 'Il s’aplatit en disque', ['Il reste une boule immobile', 'Il disparaît d’un seul coup'], 'En tournant, le nuage s’aplatit en un disque.'],
      ], (x) => x, 'Reprends les étapes : nuage, effondrement et disque qui tourne, Soleil, planètes.'),
      {
        id: 'age-etoile',
        univers: 'dehors',
        // [âge de l'étoile en milliards d'années]
        versions: [2, 3, 4.6, 5, 6, 7.5],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const r = r1(13.8 - a);
          return {
            enonce: 'Moussa lit qu’une étoile s’est formée il y a ' + ecr(a) + ' milliards d’années. L’Univers a environ 13,8 milliards d’années. Quel âge avait l’Univers à la naissance de cette étoile, en milliards d’années ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule 13,8 − ' + ecr(a) + '.',
            aideParlee: 'Enlève l’âge de l’étoile à l’âge de l’Univers.',
            correction: ['13,8 − ' + ecr(a) + ' = ' + ecr(r) + ' milliards d’années.'],
          };
        },
      },
      O.qcm('type-planete', 'dehors', [
        ['Mars', 'Une planète rocheuse', 'Mars fait partie des planètes rocheuses, comme la Terre.'],
        ['Jupiter', 'Une planète géante', 'Jupiter est une grosse planète, faite surtout de gaz.'],
        ['Vénus', 'Une planète rocheuse', 'Vénus fait partie des planètes rocheuses, comme la Terre.'],
        ['Saturne', 'Une planète géante', 'Saturne est une grosse planète, faite surtout de gaz.'],
        ['Mercure', 'Une planète rocheuse', 'Mercure est la planète rocheuse la plus proche du Soleil.'],
        ['Neptune', 'Une planète géante', 'Neptune est une grosse planète géante, très loin du Soleil.'],
      ], (x) => 'Dans le système solaire, quel genre d’astre est ' + x + ' ?', ['Une planète rocheuse', 'Une planète géante', 'Une étoile'], 'Près du Soleil, les planètes sont rocheuses. Plus loin, ce sont de grosses planètes géantes.'),
      {
        id: 'numero-etape',
        univers: 'famille',
        // [étape demandée, son numéro]
        versions: [['le nuage de gaz et de poussières', 1], ['l’effondrement et la rotation du nuage', 2], ['la naissance du Soleil', 3], ['la formation des planètes', 4]],
        genere(c) {
          const [e, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Voici quatre étapes, dans le désordre : la formation des planètes ; le nuage de gaz et de poussières ; la naissance du Soleil ; l’effondrement et la rotation du nuage. Quel est le rang, dans l’histoire, de l’étape : ' + e + ' ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Remets les étapes dans l’ordre de l’histoire, puis compte.',
            correction: ['Dans l’ordre : le nuage de gaz et de poussières, l’effondrement et la rotation du nuage, la naissance du Soleil, la formation des planètes.', 'L’étape « ' + e + ' » est donc la numéro ' + n + '.'],
          };
        },
      },
      O.qcm('vrai-faux-formation', 'champetre', [
        ['Le Soleil s’est formé au centre du disque qui tournait.', 'Vrai', 'Le centre du nuage a donné le Soleil.'],
        ['Les planètes se sont formées à partir des poussières et du gaz du disque.', 'Vrai', 'Les poussières et le gaz du disque ont formé les planètes.'],
        ['Le système solaire est aussi vieux que l’Univers.', 'Faux', 'Le système solaire a environ 4,6 milliards d’années, l’Univers environ 13,8.'],
        ['Le nuage de départ était fait de gaz et de poussières.', 'Vrai', 'C’est bien un nuage de gaz et de poussières.'],
        ['Les planètes ont été lancées par une autre galaxie.', 'Faux', 'Elles sont nées du disque de gaz et de poussières autour du Soleil.'],
        ['Le nuage de départ est resté immobile.', 'Faux', 'Il s’est effondré, a tourné et s’est aplati en disque.'],
      ], (x) => 'Vrai ou faux ? ' + x, ['Vrai', 'Faux'], 'Reprends l’histoire : nuage, effondrement, disque, Soleil, planètes.'),
    ],

    defi: {
      // [centimètres par milliard d'années]
      versions: [[1], [2], [5], [10]],
      genere(c) {
        const [e] = c.alea.choisir(this.versions);
        const total = r2(13.8 * e), naiss = r2(9.2 * e), depuis = r2(4.6 * e);
        return {
          enonce: 'Rachel et Laure fabriquent une frise de l’histoire de l’Univers. Elles comptent ' + e + ' cm pour 1 milliard d’années. L’Univers a environ 13,8 milliards d’années et le système solaire environ 4,6 milliards d’années.',
          questions: [
            {
              texte: 'Question 1. Quelle est la longueur de la frise, en centimètres ?',
              reponse: { type: 'nombre', valeur: total },
              aide: 'Multiplie 13,8 par ' + e + '.',
              aideParlee: 'Multiplie l’âge de l’Univers par le nombre de centimètres pour un milliard d’années.',
              correction: ['13,8 × ' + e + ' = ' + ecr(total) + ' cm.'],
            },
            {
              texte: 'Question 2. À quelle distance du début de la frise place-t-on la naissance du système solaire, en centimètres ?',
              reponse: { type: 'nombre', valeur: naiss },
              aide: 'Le système solaire est né 4,6 milliards d’années avant aujourd’hui. Calcule d’abord 13,8 − 4,6.',
              correction: ['13,8 − 4,6 = 9,2 milliards d’années après le début.', '9,2 × ' + e + ' = ' + ecr(naiss) + ' cm.'],
            },
            {
              texte: 'Question 3. Quelle distance sépare cette naissance de la fin de la frise, qui est aujourd’hui, en centimètres ?',
              reponse: { type: 'nombre', valeur: depuis },
              aide: 'Multiplie 4,6 par ' + e + '.',
              aideParlee: 'Multiplie l’âge du système solaire par le nombre de centimètres pour un milliard d’années.',
              correction: ['4,6 × ' + e + ' = ' + ecr(depuis) + ' cm.'],
            },
            {
              texte: 'Question 4. Raconte, en quelques phrases, comment le système solaire s’est formé à partir d’un nuage. Cite les étapes dans l’ordre.',
              correction: ['Un nuage de gaz et de poussières s’effondre sous l’effet de la gravitation, tourne et s’aplatit en disque.', 'Le Soleil naît au centre. Dans le disque, les poussières se collent et forment les planètes.'],
              grille: ['As-tu parlé du nuage de gaz et de poussières au départ ?', 'As-tu cité la gravitation, l’effondrement et le disque qui tourne ?', 'As-tu dit que le Soleil naît au centre et les planètes dans le disque ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais raconter la naissance du Soleil et des planètes, du nuage jusqu’au disque.',
    carte: ['ordre-formation', 'age-etoile', 'type-planete'],
    papierDuSoir: { exercices: ['age-etoile', 'numero-etape'], defi: true },
    automatismes: [
      {
        id: 'treize-huit-moins',
        versions: [[2], [3], [5], [8]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: '10 − ' + a + ' = ?', reponse: { type: 'nombre', valeur: 10 - a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Algérie, on a trouvé une météorite qui date des tout débuts de la formation du système solaire.',
    prenoms: ['Rachel', 'Laure', 'Moussa'],
  };
});
