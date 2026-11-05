/* Notion 10 du bloc « Mouvement et forces » : le poids sur la Lune. Manipulation : la balance et le dynamomètre (js/manipulations/balance-astres.js).
   g = 9,8 N/kg sur la Terre, environ 1,6 N/kg sur la Lune. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const GT = 9.8, GL = 1.6;
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'poids-lune',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'Le poids sur la Lune',
    classe: '3e',
    univers: ['espace', 'famille', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : poids et masse, intensité de la pesanteur selon l’astre.',

    accroche: {
      texte: 'Moussa regarde une vidéo : des astronautes marchent sur la Lune à grands bonds, comme si leur combinaison ne pesait rien. « Sur la Lune, je ne pèserais presque plus rien ! », dit-il. ' +
        'Aminata se moque : « Tu n’aurais pas maigri pour autant ! » Emportons un sac de 10 kilos là-haut, et regardons.',
      image: { dessin: 'balance-astres', masse: 10, lieu: 'lune', description: 'Sur la Lune, un objet de 10 kilogrammes. La balance à plateaux donne 10 kilogrammes. Le dynamomètre donne 16 newtons.' },
    },

    manipulation: {
      type: 'balance-astres',
      masse: 10,
      consigne: 'Voici un sac de 10 kilos, une balance à plateaux et un dynamomètre. Fais-les voyager sur la Terre et sur la Lune. Regarde les deux nombres. Puis dis ce qui n’a pas changé.',
    },

    decouverte: {
      texte: (c) => 'Pendant le voyage, rien ne change pour ' + c.mot('masse') + '. ' +
        'Mais la Lune attire moins que la Terre. Sur la Lune, g vaut environ 1,6 newton par kilogramme, au lieu de 9,8. C’est environ six fois moins pour ' + c.mot('poids') + '. ' +
        'L’astuce : même formule partout, P égale m fois g. Seul g change. Attention : un pèse-personne mesure une force. Sur la Lune, il se tromperait.',
    },

    vocabulaire: {
      termes: {
        masse: { sesMots: 'la quantité de matière', officiel: 'la masse', lesDeux: 'la quantité de matière, que les physiciens appellent la masse' },
        poids: { sesMots: 'la force de l’astre sur l’objet', officiel: 'le poids', lesDeux: 'la force de l’astre sur l’objet, que les physiciens appellent le poids' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la quantité de matière ne bouge pas ; la force de l’astre sur l’objet, si. ' +
          'Les physiciens ont des mots à eux : je te les redirai la prochaine fois.',
        'Les physiciens disent : la masse ne dépend pas de l’astre. Le poids en dépend, à travers l’intensité de la pesanteur, g.',
        'Tu connais les mots officiels : la masse, le poids, et l’intensité de la pesanteur de chaque astre.',
      ],
    },

    exercices: [
      {
        id: 'poids-sur-la-lune',
        univers: 'espace',
        versions: [10, 5, 20, 50, 60, 2.5],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          const p = r2(m * GL);
          return {
            enonce: 'Un objet a une masse de ' + ecr(m) + ' kg. Sur la Lune, g = 1,6 N/kg. Quel est son poids sur la Lune, en newtons ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + ecr(m) + ' × 1,6.',
            aideParlee: 'Le poids égale la masse multipliée par le g de la Lune.',
            correction: ['P = ' + ecr(m) + ' × 1,6 = ' + ecr(p) + ' N.'],
          };
        },
      },
      {
        id: 'masse-sur-la-lune',
        univers: 'espace',
        versions: [10, 25, 60, 70, 3],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur la Terre, un sac a une masse de ' + m + ' kg. On l’emporte sur la Lune. Quelle est sa masse sur la Lune, en kilogrammes ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'La quantité de matière change-t-elle pendant le voyage ?',
            correction: ['La masse ne change pas : elle reste de ' + m + ' kg.'],
          };
        },
      },
      {
        id: 'trouver-g',
        univers: 'maison-courses',
        // [masse en kg, poids en N, astre]
        versions: [[10, 16, 'la Lune'], [5, 8, 'la Lune'], [10, 37, 'Mars'], [2, 7.4, 'Mars'], [10, 98, 'la Terre']],
        genere(c) {
          const [m, p, a] = c.alea.choisir(this.versions);
          const g = r2(p / m);
          return {
            enonce: 'Sur ' + a + ', un objet de ' + m + ' kg a un poids de ' + ecr(p) + ' N. Quelle est la valeur de g sur cet astre, en N/kg ?',
            reponse: { type: 'nombre', valeur: g },
            aide: 'Calcule ' + ecr(p) + ' ÷ ' + m + '.',
            aideParlee: 'g égale le poids divisé par la masse.',
            correction: ['g = P ÷ m = ' + ecr(p) + ' ÷ ' + m + ' = ' + ecr(g) + ' N/kg.'],
          };
        },
      },
      O.qcm('qui-change', 'famille',
        [['Rachel voyage de la Terre à la Lune. Qu’est-ce qui change ?', 'Son poids'], ['Rachel voyage de la Terre à la Lune. Qu’est-ce qui reste identique ?', 'Sa masse'], ['Sur la Lune, un sac accroché à un dynamomètre affiche moins que sur la Terre. Qu’est-ce qui a changé ?', 'Son poids']],
        (x) => x, ['Son poids', 'Sa masse'],
        'La matière ne change pas. L’attraction de l’astre, si.'),
      O.qcm('quel-instrument-sur-la-lune', 'maison-courses',
        [['Sur la Lune, une balance à plateaux compare deux masses. Elle indique pour un sac de 10 kilos :', '10 kilos'], ['Sur la Lune, un pèse-personne réglé pour la Terre, avec une personne de 60 kilos, afficherait environ :', '10 kilos'], ['Sur la Terre, un pèse-personne réglé pour la Terre, avec une personne de 60 kilos, affiche :', '60 kilos']],
        (x) => x, ['10 kilos', '60 kilos', '98 kilos'],
        'Les plateaux comparent deux masses. Le pèse-personne, lui, mesure une force.'),
    ],

    defi: {
      versions: [80, 100, 60, 70],
      genere(c) {
        const m = c.alea.choisir(this.versions);
        const pt = r2(m * GT), pl = r2(m * GL);
        return {
          enonce: 'Une astronaute et sa combinaison ont une masse totale de ' + m + ' kg. Données : g = 9,8 N/kg sur la Terre ; g = 1,6 N/kg sur la Lune.',
          questions: [
            {
              texte: 'Question 1. Calcule le poids de l’ensemble sur la Terre, en newtons.',
              reponse: { type: 'nombre', valeur: pt },
              aide: 'Le poids égale la masse multipliée par le g de la Terre.',
              correction: ['P = ' + m + ' × 9,8 = ' + ecr(pt) + ' N.'],
            },
            {
              texte: 'Question 2. Calcule le poids de l’ensemble sur la Lune, en newtons.',
              reponse: { type: 'nombre', valeur: pl },
              aide: 'Le poids égale la masse multipliée par le g de la Lune.',
              correction: ['P = ' + m + ' × 1,6 = ' + ecr(pl) + ' N.'],
            },
            {
              texte: 'Question 3. Moussa dit : « Sur la Lune, l’astronaute perd de la masse. » A-t-il raison ? Justifie, puis explique pourquoi elle y saute plus facilement.',
              correction: ['Non : la masse reste de ' + m + ' kg, car la quantité de matière ne change pas. Son poids est plus petit, car g est plus petit sur la Lune : elle saute plus facilement.'],
              grille: ['As-tu dit que la masse ne change pas ?', 'As-tu dit que le poids est plus petit sur la Lune ?', 'As-tu relié cela à la valeur de g ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Sur la Lune, tu gardes ta masse, et seul ton poids s’allège. Tu ne confondras plus jamais.',
    carte: ['poids-sur-la-lune', 'masse-sur-la-lune', 'qui-change'],
    papierDuSoir: { exercices: ['poids-sur-la-lune', 'trouver-g'], defi: true },
    automatismes: [
      {
        id: 'lune-rapide',
        versions: [10, 5, 20, 100],
        genere(c) { const m = c.alea.choisir(this.versions); return { enonce: m + ' × 1,6 = ?', reponse: { type: 'nombre', valeur: r2(m * GL) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 1971, l’Américain David Scott a lâché un marteau et une plume sur la Lune. Sans air, ils ont touché le sol en même temps.',
    prenoms: ['Moussa', 'Aminata', 'Rachel'],
  };
});
