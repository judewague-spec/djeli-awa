/* Notion 1 du bloc SVT « Planète Terre, environnement, action humaine » : le système solaire. La maquette dans la cour.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ecr = O.ecr;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const ROCHE = 'Planète rocheuse', GAZ = 'Planète gazeuse', ETOILE = 'Étoile';
  const CHAUD = 'Trop chaude pour de l’eau liquide', FROID = 'Trop froide pour de l’eau liquide', JUSTE = 'Ni trop chaude ni trop froide';

  return {
    id: 'systeme-solaire',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Le système solaire',
    classe: 'cycle 4',
    univers: ['dehors', 'champetre'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : la Terre dans le système solaire, ses conditions particulières.',

    accroche: {
      texte: 'Ce soir, Rachel regarde le ciel. Moussa lui montre un point brillant qui ne scintille pas : c’est une planète. ' +
        'Elle tourne autour du Soleil, comme la Terre. Mais où se trouve-t-elle, et à quelle distance de nous ?',
      image: { dessin: 'chaine', etapes: ['Au centre : le Soleil, une étoile', 'Près de lui : des planètes rocheuses', 'Plus loin : des planètes gazeuses géantes'], description: 'Le système solaire : au centre le Soleil, une étoile ; près de lui des planètes rocheuses ; plus loin des planètes gazeuses géantes.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Mercure', parts: 6 }, { nom: 'Vénus', parts: 11 }, { nom: 'Terre', parts: 15 }, { nom: 'Mars', parts: 23 }], description: 'Quatre barres pour la distance au Soleil, une part valant dix millions de kilomètres : Mercure à environ 6 parts, Vénus à environ 11, la Terre à 15, Mars à environ 23.' },
      etapes: [
        'Imagine le système solaire dans la cour. Au centre, une boule de gaz géante et brûlante : le Soleil. Elle éclaire et chauffe tout.',
        'Autour de lui tournent huit planètes. Les plus proches sont petites et rocheuses, comme la Terre.',
        'Les plus lointaines sont immenses et gazeuses, comme Jupiter. Entre les planètes, il y a surtout du vide.',
        'Si la Terre était à quinze centimètres du Soleil, Jupiter serait à près de quatre-vingts centimètres.',
        'La Terre a de la chance : ni trop près, ni trop loin. L’eau y reste liquide, et son air nous protège.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le Soleil : c’est ' + c.mot('etoile') + '. Huit planètes tournent autour de lui, chacune sur ' + c.mot('orbite') + '. ' +
        'Près du Soleil, les planètes sont rocheuses. Loin de lui, les grandes planètes sont gazeuses. ' +
        'L’astuce : la Terre est la seule, à bonne distance du Soleil, où l’on sait que la vie existe.',
    },

    vocabulaire: {
      termes: {
        etoile: { sesMots: 'une boule de gaz géante et brûlante', officiel: 'une étoile', lesDeux: 'une boule de gaz géante et brûlante, que l’on appelle une étoile' },
        orbite: { sesMots: 'son chemin autour du Soleil', officiel: 'son orbite', lesDeux: 'son chemin autour du Soleil, que l’on appelle son orbite' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la boule de gaz géante et brûlante, et le chemin autour du Soleil. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une étoile, pour la boule de gaz géante et brûlante. Le chemin autour du Soleil s’appelle l’orbite.',
        'Tu connais les mots officiels : l’étoile, l’orbite, la planète rocheuse et la planète gazeuse.',
      ],
    },

    exercices: [
      {
        id: 'maquette',
        univers: 'dehors',
        // [planète, millions de km du Soleil]
        versions: [['Mercure', 58], ['Vénus', 108], ['La Terre', 150], ['Mars', 228], ['Jupiter', 778]],
        genere(c) {
          const [nom, d] = c.alea.choisir(this.versions);
          const r = Math.round(d * 10) / 100;
          return {
            enonce: 'Rachel et Moussa font une maquette dans la cour : 1 cm représente 10 millions de km. ' + nom + ' est à environ ' + d + ' millions de km du Soleil. À quelle distance du Soleil la place-t-on, en centimètres ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Divise ' + d + ' par 10.',
            aideParlee: 'Divise la distance par dix, puisqu’un centimètre représente dix millions de kilomètres.',
            correction: [d + ' ÷ 10 = ' + ecr(r) + ' cm.'],
          };
        },
      },
      {
        id: 'ecart-distance',
        univers: 'dehors',
        // [planète, millions de km du Soleil] ; la Terre est à 150
        versions: [['Mercure', 58], ['Vénus', 108], ['Mars', 228], ['Jupiter', 778]],
        genere(c) {
          const [nom, d] = c.alea.choisir(this.versions);
          const e = Math.abs(d - 150);
          return {
            enonce: 'La Terre est à environ 150 millions de km du Soleil. ' + nom + ' est à environ ' + d + ' millions de km. Quelle est la différence entre ces deux distances, en millions de km ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Enlève la plus petite distance à la plus grande : ' + Math.max(d, 150) + ' − ' + Math.min(d, 150) + '.',
            aideParlee: 'Enlève la plus petite distance à la plus grande.',
            correction: [Math.max(d, 150) + ' − ' + Math.min(d, 150) + ' = ' + e + ' millions de km.'],
          };
        },
      },
      O.qcm('rocheuse-ou-gazeuse', 'champetre',
        [['Mars', ROCHE, 'Mars est une petite planète proche du Soleil, faite de roches.'], ['Jupiter', GAZ, 'Jupiter est une planète géante, faite surtout de gaz.'],
          ['Vénus', ROCHE, 'Vénus est une planète proche du Soleil, faite de roches.'], ['Le Soleil', ETOILE, 'Le Soleil fabrique lui-même sa lumière : c’est une étoile.'],
          ['La Terre', ROCHE, 'La Terre est une planète proche du Soleil, faite de roches.'], ['Saturne', GAZ, 'Saturne est une planète géante, faite surtout de gaz.']],
        (x) => x + ' : de quel type d’astre s’agit-il ?', [ROCHE, GAZ, ETOILE],
        'Une étoile brille toute seule. Les planètes proches du Soleil sont rocheuses, les grandes planètes lointaines sont gazeuses.'),
      O.qcm('chaud-ou-froid', 'dehors',
        [['Une planète très proche du Soleil, comme Mercure.', CHAUD, 'Si près du Soleil, la chaleur est très forte : l’eau ne peut pas rester liquide.'],
          ['Une planète très lointaine du Soleil, comme Neptune.', FROID, 'Si loin du Soleil, il fait très froid : l’eau y est gelée.'],
          ['La Terre, à bonne distance du Soleil.', JUSTE, 'À cette distance, l’eau reste liquide sur la Terre.']],
        (x) => x + ' Que peut-on dire de la température et de l’eau ?', [CHAUD, FROID, JUSTE],
        'Plus on est près du Soleil, plus il fait chaud. Plus on est loin, plus il fait froid.'),
      O.qcm('vrai-ou-faux', 'champetre',
        [['Le Soleil est une étoile.', 'Vrai'], ['Le Soleil tourne autour de la Terre.', 'Faux'], ['Jupiter est une planète rocheuse.', 'Faux'], ['Il y a huit planètes dans le système solaire.', 'Vrai'], ['Les planètes tournent autour du Soleil.', 'Vrai']].map((v) => [v[0], v[1], 'Le Soleil est une étoile, au centre du système solaire. Huit planètes tournent autour de lui. Les plus proches sont rocheuses ; Jupiter est gazeuse.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Le Soleil est au centre. Les planètes tournent autour de lui.'),
    ],

    defi: {
      // [planète A, millions de km, planète B, millions de km]
      versions: [['Vénus', 108, 'la Terre', 150], ['Mars', 228, 'la Terre', 150], ['Jupiter', 778, 'Mars', 228], ['Mercure', 58, 'la Terre', 150]],
      genere(c) {
        const [a, da, b, db] = c.alea.choisir(this.versions);
        const proche = da < db ? a : b;
        return {
          enonce: 'Rachel et Aminata construisent une maquette du système solaire. Elles utilisent l’échelle suivante : 1 cm pour 10 millions de km. ' +
            cap(a) + ' est à environ ' + da + ' millions de km du Soleil, et ' + b + ' à environ ' + db + ' millions de km.',
          image: { dessin: 'barres', barres: [{ nom: cap(a), parts: Math.round(da / 10) }, { nom: cap(b), parts: Math.round(db / 10) }], description: 'Deux barres pour la distance au Soleil, une part valant dix millions de kilomètres, arrondie : ' + a + ' à ' + da + ' millions de km, ' + b + ' à ' + db + ' millions de km.' },
          questions: [
            {
              texte: 'Question 1. À quelle distance du Soleil, en centimètres, faut-il placer ' + a + ' ?',
              reponse: { type: 'nombre', valeur: Math.round(da * 10) / 100 },
              aide: 'Divise la distance par 10.',
              correction: [da + ' ÷ 10 = ' + ecr(Math.round(da * 10) / 100) + ' cm.'],
            },
            {
              texte: 'Question 2. Quelle distance, en centimètres, sépare ' + a + ' et ' + b + ' sur la maquette ?',
              reponse: { type: 'nombre', valeur: Math.round(Math.abs(db - da) * 10) / 100 },
              aide: 'Calcule la différence des deux distances, puis divise par 10.',
              correction: [Math.max(da, db) + ' − ' + Math.min(da, db) + ' = ' + Math.abs(db - da) + ' millions de km.', Math.abs(db - da) + ' ÷ 10 = ' + ecr(Math.round(Math.abs(db - da) * 10) / 100) + ' cm.'],
            },
            {
              texte: 'Question 3. Laquelle de ces deux planètes est la plus proche du Soleil ?',
              reponse: O.choix(c.alea, cap(proche), [cap(a), cap(b)]),
              aide: 'Compare les deux distances au Soleil.',
              correction: [da + ' et ' + db + ' millions de km.', 'Réponse : ' + cap(proche) + '.'],
            },
            {
              texte: 'Question 4. Avec cette échelle, les planètes seraient minuscules. Rédige deux phrases pour expliquer pourquoi.',
              correction: ['Les distances entre les planètes sont énormes par rapport à leur taille.', 'Avec 1 cm pour 10 millions de km, une planète serait presque invisible.'],
              grille: ['As-tu dit que les distances sont énormes ?', 'As-tu dit que les planètes seraient minuscules ou presque invisibles à cette échelle ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais placer les planètes autour du Soleil, et pourquoi la Terre est une planète à part.',
    carte: ['rocheuse-ou-gazeuse', 'chaud-ou-froid', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['maquette', 'ecart-distance'], defi: true },
    automatismes: [
      {
        id: 'astre-rapide',
        versions: [['Le Soleil', ETOILE], ['La Terre', ROCHE], ['Jupiter', GAZ]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: d + ' : étoile, planète rocheuse ou planète gazeuse ?', reponse: O.choix(c.alea, b, [ETOILE, ROCHE, GAZ]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Afrique du Sud, près de Sutherland, le grand télescope SALT observe le ciel avec 91 miroirs hexagonaux.',
    prenoms: ['Rachel', 'Moussa', 'Aminata'],
  };
});
