/* Notion 14 du bloc physique-chimie « La matière » : corrosion, acides et métaux. Le clou rouillé de Moussa. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const H2 = 'Du dihydrogène', CO2 = 'Du dioxyde de carbone', O2 = 'Du dioxygène';

  return {
    id: 'acides-metaux',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Corrosion, acides et métaux',
    classe: 'cycle 4',
    univers: ['maison-courses', 'dehors', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : corrosion, action d’un acide sur un métal.',

    accroche: {
      texte: 'Moussa retrouve dans le jardin un vieux clou, tout orange et friable : il a rouillé sous la pluie. ' +
        'Au collège, Rebecca verse de l’acide chlorhydrique sur de la limaille de fer : ça fait des bulles, et le tube chauffe. ' +
        'Le fer est attaqué, de deux façons différentes. Que se passe-t-il ?',
      image: { dessin: 'tube', aspect: 'clair', legende: 'fer et acide : des bulles', description: 'Un tube où de la limaille de fer réagit avec de l’acide : des bulles de gaz montent.' },
    },

    manipulation: {
      image: { dessin: 'tube', aspect: 'clair', legende: 'le gaz approché d’une flamme', description: 'Un tube dont on approche une allumette : le gaz produit une petite détonation.' },
      etapes: [
        'Le clou rouille avec le dioxygène de l’air et l’eau : il se forme de la rouille, un oxyde de fer. C’est une transformation chimique.',
        'Dans de l’air bien sec, ou sous une couche de peinture, le fer rouille très peu.',
        'L’acide chlorhydrique attaque le fer : le fer disparaît, des bulles de gaz se forment.',
        'On approche une flamme du gaz recueilli : une petite détonation, un « pop ». C’est le test du dihydrogène.',
      ],
    },

    decouverte: {
      texte: (c) => 'La rouille vient de ' + c.mot('corrosion') + ' du fer par le dioxygène et l’eau. ' +
        'Un acide, comme l’acide chlorhydrique, attaque aussi certains métaux, comme le fer ou le zinc : il se forme du dihydrogène, reconnu par sa petite détonation. ' +
        'L’astuce : pour protéger un métal, on l’isole de l’air et de l’eau, avec de la peinture, de l’huile ou une couche de zinc.',
    },

    vocabulaire: {
      termes: {
        corrosion: { sesMots: 'l’attaque', officiel: 'la corrosion', lesDeux: 'l’attaque, que les scientifiques appellent la corrosion,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le fer est attaqué par l’air humide, et par l’acide. ' +
          'Les scientifiques ont un mot pour l’attaque par l’air : je te le dirai la prochaine fois.',
        'Les scientifiques disent : la corrosion. L’attaque du fer par le dioxygène et l’eau, c’est la corrosion ; elle forme la rouille.',
        'Tu connais le mot officiel : la corrosion du fer forme de la rouille. Un acide attaque le fer en produisant du dihydrogène.',
      ],
    },

    exercices: [
      {
        id: 'rouille-ou-pas',
        univers: 'dehors',
        versions: [['dans l’herbe mouillée du jardin', 'Oui, vite'], ['dans un bocal d’air très sec, bien fermé', 'Presque pas'], ['recouvert d’une couche épaisse de peinture', 'Presque pas'], ['au bord de la mer, dans l’air humide et salé', 'Oui, vite'], ['plongé dans de l’huile', 'Presque pas']],
        genere(c) {
          const [ou, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un clou en fer est laissé plusieurs semaines ' + ou + '. Va-t-il rouiller ?',
            reponse: O.choix(c.alea, bonne, ['Oui, vite', 'Presque pas']),
            aide: 'Pour rouiller, le fer a besoin de dioxygène et d’eau.',
            correction: [bonne === 'Oui, vite' ? 'Il est en contact avec le dioxygène et l’eau.' : 'Il est protégé de l’air ou de l’eau.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quel-gaz',
        univers: 'maison-courses',
        versions: [['Le gaz fait une petite détonation à l’approche d’une flamme.', H2], ['Le gaz trouble l’eau de chaux.', CO2], ['Le gaz rallume une bûchette qui rougeoie encore.', O2]],
        genere(c) {
          const [obs, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Observation : « ' + obs + ' » Quel gaz est-ce ?',
            reponse: O.choix(c.alea, bonne, [H2, CO2, O2]),
            aide: 'Détonation : dihydrogène. Eau de chaux : dioxyde de carbone. Bûchette : dioxygène.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'reactifs',
        univers: 'famille',
        versions: [['le fer', 'Le fer et l’acide chlorhydrique'], ['le zinc', 'Le zinc et l’acide chlorhydrique']],
        genere(c) {
          const [metal, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'On verse de l’acide chlorhydrique sur ' + metal + '. Des bulles de dihydrogène se forment. Quels sont les réactifs ?',
            reponse: O.choix(c.alea, bonne, ['Le dihydrogène et l’acide chlorhydrique', 'Le dihydrogène seul']),
            aide: 'Les réactifs sont ce qui disparaît.',
            correction: ['Le métal et l’acide disparaissent ; le dihydrogène apparaît.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'masse-du-clou',
        univers: 'dehors',
        // [masse du clou neuf en g, masse d'oxygène fixée en g]
        versions: [[10, 3], [8, 2], [12, 4], [20, 6], [5, 1], [15, 5]],
        genere(c) {
          const [m, o] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un clou de ' + m + ' g rouille complètement en fixant ' + o + ' g d’oxygène de l’air. Quelle est la masse de la rouille obtenue, en grammes ?',
            reponse: { type: 'nombre', valeur: m + o },
            aide: 'La rouille contient le fer et l’oxygène fixé.',
            correction: [m + ' + ' + o + ' = ' + (m + o) + ' g : la rouille pèse plus que le clou neuf.'],
          };
        },
      },
      {
        id: 'proteger',
        univers: 'maison-courses',
        versions: [['une grille de jardin', 'La peindre'], ['une chaîne de vélo', 'La graisser avec de l’huile'], ['un seau en fer', 'Le recouvrir d’une couche de zinc']],
        genere(c) {
          const [objet, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Comment Laure peut-elle protéger ' + objet + ' de la rouille ?',
            reponse: O.choix(c.alea, bonne, ['Ne rien faire', 'L’arroser chaque jour']),
            aide: 'Il faut empêcher l’air et l’eau d’atteindre le fer.',
            correction: ['Isoler le fer de l’air et de l’eau le protège. Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [masse de fer au départ en g, masse de fer restant en g]
      versions: [[5, 2], [8, 3], [10, 4], [6, 1], [12, 7], [9, 5]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Rebecca verse de l’acide chlorhydrique sur ' + a + ' g de limaille de fer. Des bulles se forment. Quand les bulles s’arrêtent, il reste ' + b + ' g de fer. ' +
            'Elle recueille le gaz dans un tube et en approche une flamme : petite détonation.',
          image: { dessin: 'tube', aspect: 'clair', legende: 'test à la flamme', description: 'Le tube de gaz dont on approche une flamme.' },
          questions: [
            {
              texte: 'Question 1. Quelle masse de fer, en grammes, a réagi avec l’acide ?',
              reponse: { type: 'nombre', valeur: a - b },
              aide: 'Fais la différence entre le départ et la fin.',
              correction: [a + ' − ' + b + ' = ' + (a - b) + ' g de fer ont réagi.'],
            },
            {
              texte: 'Question 2. Quel gaz s’est formé ?',
              reponse: O.choix(c.alea, H2, [H2, CO2, O2]),
              aide: 'Quel gaz fait une petite détonation à la flamme ?',
              correction: ['Réponse : ' + H2 + '.'],
            },
            {
              texte: 'Question 3. Est-ce une transformation chimique ? Justifie avec tes observations.',
              correction: ['Le fer disparaît en partie : c’est un réactif.', 'Un gaz nouveau, le dihydrogène, apparaît : c’est un produit.', 'Des réactifs disparaissent et un produit apparaît : c’est une transformation chimique.'],
              grille: ['As-tu dit que le fer disparaît ?', 'As-tu dit qu’un gaz nouveau, le dihydrogène, apparaît ?', 'As-tu conclu qu’il s’agit d’une transformation chimique ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais pourquoi le clou rouille, comment le protéger, et reconnaître le dihydrogène à son petit « pop ».',
    carte: ['rouille-ou-pas', 'quel-gaz', 'proteger'],
    papierDuSoir: { exercices: ['masse-du-clou', 'reactifs'], defi: true },
    automatismes: [
      {
        id: 'test-du-gaz',
        versions: [['petite détonation', H2], ['eau de chaux troublée', CO2], ['bûchette rallumée', O2]],
        genere(c) { const [o, b] = c.alea.choisir(this.versions); return { enonce: o + ' : quel gaz ?', reponse: O.choix(c.alea, b, [H2, CO2, O2]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Delhi, en Inde, un pilier de fer vieux de plus de mille cinq cents ans ne s’est presque pas rouillé.',
    prenoms: ['Moussa', 'Rebecca', 'Laure'],
  };
});
