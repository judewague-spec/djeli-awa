/* Notion 6 du bloc physique-chimie « La matière » : la masse volumique. La vinaigrette de Laure. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const FLOTTE = 'Il flotte', COULE = 'Il coule';

  return {
    id: 'masse-volumique',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'La masse volumique',
    classe: '4e',
    univers: ['cuisine-restaurant', 'maison-courses', 'commerce'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : masse volumique.',

    accroche: {
      texte: 'Laure verse de l’huile dans de l’eau pour une vinaigrette. L’huile remonte toujours au-dessus ! ' +
        'Pourtant, il y a autant d’huile que d’eau dans le bol. Elle pèse 100 mL d’eau : 100 g. Puis 100 mL d’huile : seulement 92 g. Voilà un indice !',
      image: { dessin: 'balance', gauche: '100 mL d’eau', droite: '100 mL d’huile', masseG: 100, masseD: 92, description: 'Une balance : 100 mL d’eau à gauche, 100 g ; 100 mL d’huile à droite, 92 g. Elle penche du côté de l’eau.' },
    },

    manipulation: {
      image: { dessin: 'balance', gauche: '100 mL d’eau', droite: '100 mL d’huile', masseG: 100, masseD: 92, description: 'Même volume, mais l’eau est plus lourde que l’huile.' },
      etapes: [
        'Pour le même volume, 100 mL, l’eau a une masse de 100 g et l’huile de 92 g.',
        'Pour un seul millilitre : l’eau fait 100 ÷ 100 = 1 g, l’huile fait 92 ÷ 100 = 0,92 g.',
        'C’est la masse d’un millilitre qui compte : l’huile est plus légère, à volume égal, alors elle flotte sur l’eau.',
        'On écrit : masse divisée par volume. Pour l’huile : 92 g ÷ 100 mL = 0,92 g par mL.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour comparer deux matières, on compare ' + c.mot('rho') + ' : on divise la masse par le volume, m ÷ V. ' +
        'L’eau : 1 g par mL, soit 1 000 g par litre. L’huile : 0,92 g par mL. ' +
        'L’astuce : ce qui est plus léger que l’eau, à volume égal, flotte dessus ; plus lourd, il coule. Et quand on chauffe un liquide, il prend un peu plus de place pour la même masse.',
    },

    vocabulaire: {
      termes: {
        rho: { sesMots: 'la masse d’un millilitre', officiel: 'la masse volumique', lesDeux: 'la masse d’un millilitre, que les scientifiques appellent la masse volumique' },
      },
      textes: [
        'Pour l’instant, garde tes mots : on compare la masse d’un millilitre de chaque liquide. Le plus léger flotte. ' +
          'Les scientifiques ont un nom et une lettre pour ça : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la masse volumique, et ils l’écrivent avec la lettre grecque rhô. Masse volumique égale masse divisée par volume.',
        'Tu connais le mot officiel : la masse volumique, rhô = m ÷ V. Elle s’exprime par exemple en grammes par millilitre, ou en kilogrammes par litre.',
      ],
    },

    exercices: [
      {
        id: 'calculer',
        univers: 'cuisine-restaurant',
        // [liquide, masse en g, volume en mL]
        versions: [['le miel', 140, 100], ['l’huile', 46, 50], ['le lait', 206, 200], ['l’alcool', 79, 100], ['le sirop', 130, 100], ['l’eau salée', 515, 500], ['l’huile', 184, 200], ['le miel', 70, 50]],
        genere(c) {
          const [liq, m, v] = c.alea.choisir(this.versions);
          const rho = r2(m / v);
          return {
            enonce: 'Moussa pèse ' + v + ' mL ' + liq.replace(/^le |^la /, 'de ').replace(/^l’/, 'd’') + ' : ' + m + ' g. Quelle est sa masse volumique, en grammes par millilitre ?',
            reponse: { type: 'nombre', valeur: rho },
            aide: 'Divise la masse par le volume : ' + m + ' ÷ ' + v + '.',
            aideParlee: 'Divise la masse par le volume.',
            correction: [m + ' ÷ ' + v + ' = ' + ecr(rho) + ' g par mL.'],
          };
        },
      },
      {
        id: 'masse',
        univers: 'commerce',
        // [liquide, masse volumique en g/mL, volume en mL]
        versions: [['l’huile', 0.92, 500], ['le lait', 1.03, 1000], ['le miel', 1.4, 250], ['l’eau', 1, 750], ['l’huile', 0.92, 250], ['le sirop', 1.3, 200]],
        genere(c) {
          const [liq, rho, v] = c.alea.choisir(this.versions);
          const m = r2(rho * v);
          return {
            enonce: 'La masse volumique ' + liq.replace(/^le /, 'du ').replace(/^l’/, 'de l’') + ' est ' + ecr(rho) + ' g par mL. Quelle est la masse, en grammes, d’une bouteille de ' + v + ' mL (sans la bouteille) ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Multiplie la masse volumique par le volume : ' + ecr(rho) + ' × ' + v + '.',
            aideParlee: 'Multiplie la masse volumique par le volume.',
            correction: [ecr(rho) + ' × ' + v + ' = ' + ecr(m) + ' g.'],
          };
        },
      },
      {
        id: 'volume',
        univers: 'cuisine-restaurant',
        // [masse en g, masse volumique en g/mL]
        versions: [[92, 0.92], [140, 1.4], [300, 1.5], [184, 0.92], [260, 1.3], [500, 1]],
        genere(c) {
          const [m, rho] = c.alea.choisir(this.versions);
          const v = r2(m / rho);
          return {
            enonce: 'Rachel a ' + m + ' g d’un liquide de masse volumique ' + ecr(rho) + ' g par mL. Quel volume occupe-t-il, en millilitres ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Volume = masse ÷ masse volumique : ' + m + ' ÷ ' + ecr(rho) + '.',
            aideParlee: 'Divise la masse par la masse volumique.',
            correction: [m + ' ÷ ' + ecr(rho) + ' = ' + ecr(v) + ' mL.'],
          };
        },
      },
      {
        id: 'flotte-ou-coule',
        univers: 'maison-courses',
        // [objet, masse volumique en g/mL] ; l'eau : 1 g/mL
        versions: [['un bouchon en liège', 0.24], ['un clou en fer', 7.87], ['un glaçon', 0.92], ['un caillou', 2.6], ['un morceau de bois de pin', 0.5], ['une pièce en cuivre', 8.96], ['une bille en verre', 2.5], ['une bougie', 0.9]],
        genere(c) {
          const [objet, rho] = c.alea.choisir(this.versions);
          const bonne = rho < 1 ? FLOTTE : COULE;
          return {
            enonce: 'Aminata pose ' + objet + ' dans l’eau. Sa masse volumique est ' + ecr(rho) + ' g par mL ; celle de l’eau est 1 g par mL. Que fait-il ?',
            reponse: O.choix(c.alea, bonne, [FLOTTE, COULE]),
            aide: 'Compare ' + ecr(rho) + ' à 1.',
            aideParlee: 'Compare sa masse volumique à celle de l’eau : moins dense, il flotte.',
            correction: [ecr(rho) + (rho < 1 ? ' < 1 : moins dense que l’eau.' : ' > 1 : plus dense que l’eau.'), 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'en-grammes-par-litre',
        univers: 'commerce',
        versions: [0.92, 1.03, 1.4, 0.79, 1.3, 1.2],
        genere(c) {
          const rho = c.alea.choisir(this.versions);
          const g = Math.round(rho * 1000);
          return {
            enonce: 'Un liquide a une masse volumique de ' + ecr(rho) + ' g par mL. Combien cela fait-il en grammes par litre ?',
            reponse: { type: 'nombre', valeur: g },
            aide: 'Un litre, c’est 1 000 mL : multiplie par 1 000.',
            correction: [ecr(rho) + ' × 1 000 = ' + g + ' g par litre.'],
          };
        },
      },
      {
        id: 'chauffer',
        univers: 'cuisine-restaurant',
        versions: ['l’huile', 'l’eau', 'le lait', 'le sirop'],
        genere(c) {
          const liq = c.alea.choisir(this.versions);
          const bonne = 'Elle diminue';
          return {
            enonce: 'Laure chauffe ' + liq + ' dans une casserole. Son volume augmente un peu, mais sa masse ne change pas. Que devient sa masse volumique ?',
            reponse: O.choix(c.alea, bonne, ['Elle augmente', 'Elle diminue', 'Elle ne change pas']),
            aide: 'Même masse, plus de volume : divise la même masse par un plus grand nombre.',
            correction: ['La masse volumique est m ÷ V : avec la même masse et un volume plus grand, elle est plus petite.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [liquide inconnu : masse en g, volume en mL]
      versions: [[46, 50], [130, 100], [158, 200], [270, 200], [90, 100], [138, 150]],
      genere(c) {
        const [m, v] = c.alea.choisir(this.versions);
        const rho = r2(m / v);
        const flotte = rho < 1;
        return {
          enonce: 'Rebecca trouve dans la cuisine un flacon sans étiquette. Elle verse ' + v + ' mL de ce liquide dans un verre doseur et le pèse : ' + m + ' g. ' +
            'Ce liquide ne se mélange pas à l’eau.',
          questions: [
            {
              texte: 'Question 1. Calcule sa masse volumique, en grammes par millilitre.',
              reponse: { type: 'nombre', valeur: rho },
              aide: 'Divise la masse par le volume.',
              correction: [m + ' ÷ ' + v + ' = ' + ecr(rho) + ' g par mL.'],
            },
            {
              texte: 'Question 2. Si on le verse dans de l’eau, où se placera-t-il ?',
              reponse: O.choix(c.alea, flotte ? 'Au-dessus de l’eau' : 'Au fond, sous l’eau', ['Au-dessus de l’eau', 'Au fond, sous l’eau']),
              aide: 'Compare sa masse volumique à celle de l’eau, 1 g par mL.',
              correction: [ecr(rho) + (flotte ? ' < 1' : ' > 1') + '. Réponse : ' + (flotte ? 'Au-dessus de l’eau' : 'Au fond, sous l’eau') + '.'],
            },
            {
              texte: 'Question 3. Rebecca pense que c’est de l’huile, dont la masse volumique est 0,92 g par mL. A-t-elle raison ? Justifie.',
              correction: ['La masse volumique trouvée est ' + ecr(rho) + ' g par mL.', rho === 0.92 ? 'C’est bien celle de l’huile : Rebecca a peut-être raison.' : 'Ce n’est pas 0,92 g par mL : ce n’est pas de l’huile, Rebecca a tort.'],
              grille: ['As-tu comparé ta masse volumique à 0,92 g par mL ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Masse divisée par volume : tu sais pourquoi l’huile flotte sur l’eau, et tu sais le calculer.',
    carte: ['calculer', 'masse', 'flotte-ou-coule'],
    papierDuSoir: { exercices: ['volume', 'en-grammes-par-litre'], defi: true },
    automatismes: [
      {
        id: 'rho-rapide',
        versions: [[50, 50], [92, 100], [30, 20], [120, 100]],
        genere(c) { const [m, v] = c.alea.choisir(this.versions); return { enonce: m + ' g pour ' + v + ' mL : combien de g par mL ?', reponse: { type: 'nombre', valeur: r2(m / v) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? L’eau de la mer Morte est si salée qu’on y flotte sans effort.',
    prenoms: ['Laure', 'Moussa', 'Rachel', 'Aminata', 'Rebecca'],
  };
});
