/* Notion 4 du bloc physique-chimie « La matière » : solubilité et miscibilité. Le sel de Rachel, l'huile et le vinaigre. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const SOL = 'Soluble dans l’eau', INS = 'Insoluble dans l’eau';
  const MIS = 'Miscibles', NON = 'Non miscibles';

  return {
    id: 'solubilite-miscibilite',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Solubilité et miscibilité',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'maison-courses', 'coiffure'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière ».',

    accroche: {
      texte: 'Rachel prépare une eau salée pour faire tremper des légumes. Elle verse du sel dans un verre d’eau et remue : le sel disparaît. ' +
        'Elle en verse encore, et encore… Est-ce que l’eau peut avaler autant de sel qu’on veut ? ' +
        'Et pourquoi la vinaigrette de Laure se sépare-t-elle toujours en deux ?',
      image: { dessin: 'melange', fond: 0, description: 'Un verre d’eau claire, avant d’y verser du sel.' },
    },

    manipulation: {
      type: 'melange',
      cuillere: 5,
      maximum: 36,
      eau: 100,
      solute: 'sel',
      consigne: 'Voici 100 mL d’eau. Verse le sel cuillère après cuillère, et regarde ce qui se passe, jusqu’à ce que le sel ne disparaisse plus.',
    },

    decouverte: {
      texte: (c) => 'Le sel disparaît dans l’eau : il se dissout. Le sel est ' + c.mot('soluble') + '. Mais il y a une limite : dans 100 mL d’eau, environ 36 g de sel au plus. ' +
        'Au-delà, le sel reste au fond : l’eau est ' + c.mot('sature') + '. Le sable, lui, ne se dissout pas du tout. ' +
        'Et pour deux liquides : l’eau et le vinaigre ' + c.mot('miscibles') + ' ; l’eau et l’huile, elles, se séparent en deux couches.',
      image: { dessin: 'melange', fond: 9, description: 'Le verre d’eau saturée : des grains de sel restent au fond.' },
    },

    vocabulaire: {
      termes: {
        soluble: { sesMots: 'capable de disparaître dans l’eau', officiel: 'soluble dans l’eau', lesDeux: 'capable de disparaître dans l’eau : on dit soluble dans l’eau' },
        sature: { sesMots: 'pleine', officiel: 'saturée', lesDeux: 'pleine : on dit saturée' },
        miscibles: { sesMots: 'se mélangent bien', officiel: 'sont miscibles', lesDeux: 'se mélangent bien : on dit qu’ils sont miscibles' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le sel est capable de disparaître dans l’eau, jusqu’à une limite. L’huile et l’eau, elles, ne se mélangent pas. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le sel est soluble dans l’eau, et l’eau salée qui n’en avale plus est saturée. Deux liquides qui se mélangent sont miscibles.',
        'Tu connais les mots officiels : soluble, saturée, miscible. La solubilité, c’est la masse maximale qu’on peut dissoudre dans un litre de liquide.',
      ],
    },

    exercices: [
      {
        id: 'soluble-ou-pas',
        univers: 'cuisine-restaurant',
        versions: [['le sel', SOL], ['le sucre', SOL], ['le sable', INS], ['la farine', INS], ['le café en poudre soluble', SOL], ['le poivre moulu', INS]],
        genere(c) {
          const [corps, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure met un peu de ' + corps.replace(/^le |^la /, '') + ' dans un verre d’eau et remue bien. Ce corps est-il soluble dans l’eau ?',
            reponse: O.choix(c.alea, bonne, [SOL, INS]),
            aide: 'Disparaît-il dans l’eau, ou le voit-on encore ?',
            correction: [bonne === SOL ? 'Il disparaît : il se dissout.' : 'On le voit encore : il ne se dissout pas.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'miscibles',
        univers: 'cuisine-restaurant',
        versions: [['l’eau et le vinaigre', MIS], ['l’eau et l’huile', NON], ['l’eau et le sirop', MIS], ['l’huile et le vinaigre', NON], ['l’eau et l’alcool à brûler', MIS]],
        genere(c) {
          const [deux, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Aminata verse ' + deux + ' dans un même flacon et secoue. Après quelques minutes, ces deux liquides sont-ils miscibles ?',
            reponse: O.choix(c.alea, bonne, [MIS, NON]),
            aide: 'Forment-ils un seul liquide, ou deux couches ?',
            correction: [bonne === MIS ? 'On obtient un seul liquide homogène.' : 'Ils se séparent en deux couches.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'masse-maximale',
        univers: 'cuisine-restaurant',
        // [corps, solubilité en g/L, volume en L]
        versions: [['sel', 360, 0.5], ['sel', 360, 2], ['sucre', 2000, 0.25], ['sucre', 2000, 0.5], ['sel', 360, 0.25], ['sucre', 2000, 0.1]],
        genere(c) {
          const [corps, s, v] = c.alea.choisir(this.versions);
          const m = Math.round(s * v * 100) / 100;
          return {
            enonce: 'La solubilité du ' + corps + ' dans l’eau est d’environ ' + s + ' g par litre. Quelle masse de ' + corps + ', en grammes, peut-on dissoudre au plus dans ' + ecr(v) + ' L d’eau ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Calcule ' + s + ' × ' + ecr(v) + '.',
            aideParlee: 'Multiplie la solubilité par le volume d’eau, en litres.',
            correction: [s + ' × ' + ecr(v) + ' = ' + ecr(m) + ' g.'],
          };
        },
      },
      {
        id: 'sature-ou-pas',
        univers: 'coiffure',
        // [masse de sel versée en g, volume d'eau en L] ; solubilité 360 g/L
        versions: [[100, 0.5], [200, 0.5], [50, 0.25], [100, 0.25], [400, 1], [300, 1]],
        genere(c) {
          const [m, v] = c.alea.choisir(this.versions);
          const max = 360 * v;
          const bonne = m <= max ? 'Oui, tout se dissout' : 'Non, il en reste au fond';
          return {
            enonce: 'Pour un bain de pieds, Rebecca met ' + m + ' g de sel dans ' + ecr(v) + ' L d’eau. La solubilité du sel est d’environ 360 g par litre. Tout le sel se dissout-il ?',
            reponse: O.choix(c.alea, bonne, ['Oui, tout se dissout', 'Non, il en reste au fond']),
            aide: 'Calcule d’abord la masse maximale qu’on peut dissoudre : 360 × ' + ecr(v) + '.',
            aideParlee: 'Calcule la masse maximale qu’on peut dissoudre, puis compare-la au sel versé.',
            correction: ['Masse maximale : 360 × ' + ecr(v) + ' = ' + ecr(max) + ' g.', m + (m <= max ? ' ≤ ' : ' > ') + ecr(max) + '. Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'masse-de-la-solution',
        univers: 'maison-courses',
        // [masse d'eau, masse de sucre dissous] en grammes
        versions: [[200, 30], [250, 50], [500, 40], [150, 25], [300, 60], [400, 35]],
        genere(c) {
          const [e, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa dissout ' + s + ' g de sucre dans ' + e + ' g d’eau. Quelle est la masse de l’eau sucrée, en grammes ?',
            reponse: { type: 'nombre', valeur: e + s },
            aide: 'Le sucre a disparu à la vue, mais pas sa masse.',
            correction: [e + ' + ' + s + ' = ' + (e + s) + ' g : la masse se conserve pendant une dissolution.'],
          };
        },
      },
    ],

    defi: {
      // [volume d'eau en L, masse de sel versée en g] ; solubilité 360 g/L
      versions: [[0.5, 200], [0.25, 120], [1, 400], [0.5, 250], [0.25, 100], [1, 450]],
      genere(c) {
        const [v, m] = c.alea.choisir(this.versions);
        const max = 360 * v;
        const fond = m - max;
        return {
          enonce: 'Rachel verse ' + m + ' g de sel dans ' + ecr(v) + ' L d’eau, et remue longtemps. La solubilité du sel dans l’eau est d’environ 360 g par litre.',
          image: { dessin: 'melange', fond: Math.max(0, fond), description: 'Un verre d’eau salée' + (fond > 0 ? ' avec du sel au fond.' : ' sans rien au fond.') },
          questions: [
            {
              texte: 'Question 1. Quelle masse de sel, en grammes, peut-on dissoudre au plus dans cette eau ?',
              reponse: { type: 'nombre', valeur: max },
              aide: 'Multiplie la solubilité par le volume d’eau.',
              correction: ['360 × ' + ecr(v) + ' = ' + ecr(max) + ' g.'],
            },
            {
              texte: 'Question 2. Quelle masse de sel, en grammes, reste au fond du verre ?',
              reponse: { type: 'nombre', valeur: Math.max(0, fond) },
              aide: 'Compare la masse versée à la masse maximale.',
              correction: fond > 0 ? [m + ' − ' + ecr(max) + ' = ' + ecr(fond) + ' g restent au fond : l’eau est saturée.'] : [m + ' ≤ ' + ecr(max) + ' : tout se dissout, il reste 0 g au fond.'],
            },
            {
              texte: 'Question 3. Rebecca dit : « Le sel dissous a disparu, donc sa masse a disparu aussi. » A-t-elle raison ? Explique.',
              correction: ['Le sel dissous n’est plus visible, mais ses particules sont toujours dans l’eau.', 'La masse de l’eau salée est la masse de l’eau plus celle du sel : Rebecca a tort.'],
              grille: ['As-tu dit que le sel est toujours là, sous forme de particules ?', 'As-tu dit que la masse se conserve ?', 'As-tu conclu : « Rebecca a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais qu’un solide peut se dissoudre jusqu’à une limite, et que deux liquides ne se mélangent pas toujours.',
    carte: ['soluble-ou-pas', 'miscibles', 'masse-maximale'],
    papierDuSoir: { exercices: ['sature-ou-pas', 'masse-de-la-solution'], defi: true },
    automatismes: [
      {
        id: 'miscible-rapide',
        versions: [['l’eau et l’huile', NON], ['l’eau et le vinaigre', MIS], ['l’eau et le sirop', MIS]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: d + ' : miscibles ?', reponse: O.choix(c.alea, b, [MIS, NON]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au salar d’Uyuni, en Bolivie, un ancien lac a séché et a laissé une immense croûte de sel.',
    prenoms: ['Rachel', 'Laure', 'Aminata', 'Rebecca', 'Moussa'],
  };
});
