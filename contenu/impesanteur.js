/* Notion 11 du bloc « Mouvement et forces » : l'impesanteur. La Station spatiale ne flotte pas : elle tombe autour de la Terre.
   À 400 km d'altitude, g vaut environ 8,7 N/kg. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const G400 = 8.7;
  const r2 = (x) => Math.round(x * 100) / 100;
  const { ecr } = O;
  const mille = (x) => String(x).replace(/\B(?=(\d{3})+$)/g, ' ');

  return {
    id: 'impesanteur',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'L’impesanteur',
    classe: '3e',
    univers: ['espace', 'dehors', 'danses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : gravitation et mouvement des astres, impesanteur ; NASA, « What Is Microgravity? ».',

    accroche: {
      texte: 'Sur l’écran du téléphone, Rebecca regarde une astronaute dans la Station spatiale internationale. Ses cheveux flottent, et sa cuillère reste en l’air. ' +
        '« Là-haut, il n’y a plus de gravité », dit Moussa. Pourtant, la station n’est qu’à 400 kilomètres d’ici. Et la Terre y attire encore presque autant. Alors, pourquoi ça flotte ?',
      image: { dessin: 'trajectoire', forme: 'cercle', legende: 'La station autour de la Terre', description: 'Un cercle : le chemin de la station autour de la Terre. Un point marque la station.' },
    },

    manipulation: {
      etapes: [
        'Imagine un ascenseur dont le câble casse. Toi et l’ascenseur, vous tombez ensemble. C’est une scène imaginaire : ne l’essaie jamais.',
        'Tes pieds ne poussent plus sur le plancher. Tu ne sens plus ton poids, alors que la Terre t’attire toujours.',
        'La station, c’est pareil. Elle tombe vers la Terre, et tout ce qu’elle contient tombe avec elle, à la même allure.',
        'Mais elle file de côté très vite, à environ 28 000 kilomètres par heure. Sa chute fait donc le tour de la Terre.',
        'Son poids n’a pas disparu. C’est justement lui qui la garde autour de la Terre. Sa masse n’a pas changé non plus.',
      ],
    },

    decouverte: {
      texte: (c) => 'Quand tout tombe ensemble, rien ne pousse sur rien, et tout semble flotter. C’est ' + c.mot('impesanteur') + '. ' +
        'Autour de la Terre, la station est ' + c.mot('chute') + '. ' +
        'L’astuce : il y a bien une force. Ce qui manque, c’est le sol qui pousse sous tes pieds.',
    },

    vocabulaire: {
      termes: {
        impesanteur: { sesMots: 'l’impression de ne plus rien peser', officiel: 'l’impesanteur', lesDeux: 'l’impression de ne plus rien peser, que les physiciens appellent l’impesanteur' },
        chute: { sesMots: 'en train de tomber, sans rien qui la retienne', officiel: 'en chute libre', lesDeux: 'en train de tomber, sans rien qui la retienne : les physiciens disent en chute libre' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’impression de ne plus rien peser, et tomber sans rien qui te retienne. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : l’impesanteur, pour cette impression. Et la chute libre, pour un objet qui tombe sans rien qui le retienne.',
        'Tu connais les mots officiels : l’impesanteur, et la chute libre.',
      ],
    },

    exercices: [
      O.qcm('vrai-ou-faux', 'espace',
        [['« Dans la Station spatiale, il n’y a plus de gravité. »', 'Faux'], ['« Dans la Station spatiale, l’astronaute garde sa masse. »', 'Vrai'], ['« La station tombe sans cesse vers la Terre, en filant de côté. »', 'Vrai'], ['« L’impesanteur veut dire que la masse a disparu. »', 'Faux']],
        (x) => x + ' Cette phrase est :', ['Vrai', 'Faux', 'On ne peut pas savoir'],
        'La Terre attire toujours la station. Tout tombe ensemble.'),
      O.qcm('pourquoi-flotter', 'espace',
        [['Pourquoi une cuillère flotte-t-elle dans la Station spatiale ?', 'Elle tombe à la même allure que la station'], ['Pourquoi l’astronaute ne sent-elle plus de poids sous ses pieds ?', 'Elle tombe à la même allure que la station']],
        (x) => x, ['Elle tombe à la même allure que la station', 'La Terre ne l’attire plus', 'Il n’y a pas d’air'],
        'La Terre attire encore la station, et tout ce qu’elle contient.'),
      {
        id: 'poids-en-altitude',
        univers: 'espace',
        versions: [10, 20, 100, 50, 70],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          const p = r2(m * G400);
          return {
            enonce: 'À 400 km d’altitude, g vaut environ 8,7 N/kg. Quel est le poids d’un objet de ' + m + ' kg à cette altitude, en newtons ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + m + ' × 8,7.',
            aideParlee: 'Le poids égale la masse multipliée par g, à cette altitude.',
            correction: ['P = ' + m + ' × 8,7 = ' + ecr(p) + ' N. Il n’est donc pas nul.'],
          };
        },
      },
      {
        id: 'masse-dans-la-station',
        univers: 'danses',
        versions: [60, 65, 70, 80],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur la Terre, une astronaute a une masse de ' + m + ' kg. Elle danse en flottant dans la Station spatiale. Quelle est sa masse dans la station, en kilogrammes ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'La quantité de matière a-t-elle changé ?',
            correction: ['La masse ne change pas : ' + m + ' kg.'],
          };
        },
      },
      {
        id: 'tour-de-terre',
        univers: 'dehors',
        // [distance en km, durée en h], à la vitesse de la station
        versions: [[42000, 1.5], [14000, 0.5], [28000, 1], [56000, 2]],
        genere(c) {
          const [d, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'La Station spatiale parcourt ' + mille(d) + ' km en ' + ecr(t) + ' h. Quelle est sa vitesse moyenne, en km/h ?',
            reponse: { type: 'nombre', valeur: d / t },
            aide: 'Calcule ' + mille(d) + ' ÷ ' + ecr(t) + '.',
            aideParlee: 'La vitesse égale la distance divisée par le temps.',
            correction: ['v = ' + mille(d) + ' ÷ ' + ecr(t) + ' = ' + mille(d / t) + ' km/h.', 'À écrire sans espace : ' + d / t + '.'],
          };
        },
      },
    ],

    defi: {
      versions: [70, 80, 60, 100],
      genere(c) {
        const m = c.alea.choisir(this.versions);
        const pt = r2(m * 9.8), pa = r2(m * G400);
        return {
          enonce: 'Une astronaute et son équipement ont une masse de ' + m + ' kg. Données : g = 9,8 N/kg au sol ; g = 8,7 N/kg à 400 km d’altitude, là où se trouve la Station spatiale internationale.',
          questions: [
            {
              texte: 'Question 1. Calcule le poids de l’ensemble au sol, en newtons.',
              reponse: { type: 'nombre', valeur: pt },
              aide: 'Le poids égale la masse multipliée par g, au sol.',
              correction: ['P = ' + m + ' × 9,8 = ' + ecr(pt) + ' N.'],
            },
            {
              texte: 'Question 2. Calcule le poids de l’ensemble à 400 km d’altitude, en newtons.',
              reponse: { type: 'nombre', valeur: pa },
              aide: 'Le poids égale la masse multipliée par g, à cette altitude.',
              correction: ['P = ' + m + ' × 8,7 = ' + ecr(pa) + ' N.'],
            },
            {
              texte: 'Question 3. Une camarade affirme : « Si l’astronaute flotte, c’est parce que là-haut la Terre ne l’attire plus. » Corrige cette phrase à l’aide de tes résultats.',
              correction: ['Son poids à 400 km n’est pas nul : la Terre l’attire encore. Elle flotte parce qu’elle est en chute libre avec la station : tout tombe ensemble, c’est l’impesanteur.'],
              grille: ['As-tu utilisé ton résultat de la question 2 ?', 'As-tu dit que la station et l’astronaute tombent ensemble ?', 'As-tu employé le mot « impesanteur » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais ce que peu de gens savent : là-haut, on ne flotte pas, on tombe, tout ensemble.',
    carte: ['vrai-ou-faux', 'pourquoi-flotter', 'poids-en-altitude'],
    papierDuSoir: { exercices: ['poids-en-altitude', 'tour-de-terre'], defi: true },
    automatismes: [
      {
        id: 'masse-qui-reste',
        versions: [50, 60, 70, 80],
        genere(c) { const m = c.alea.choisir(this.versions); return { enonce: 'Une masse de ' + m + ' kg au sol. Quelle est sa masse dans la station, en kg ?', reponse: { type: 'nombre', valeur: m } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 2002, le Sud-Africain Mark Shuttleworth est monté dans la Station spatiale internationale. Il a emporté des expériences préparées à l’université du Cap.',
    prenoms: ['Rebecca', 'Moussa'],
  };
});
