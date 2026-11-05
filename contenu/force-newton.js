/* Notion 6 du bloc « Mouvement et forces » : la force et le newton. Le chariot de Laure et le dynamomètre de la forge.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const CARACTERES = ['Le point d’application', 'La direction', 'Le sens', 'La valeur'];

  return {
    id: 'force-newton',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'La force et le newton',
    classe: '4e',
    univers: ['maison-courses', 'appareils', 'commerce'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : force, point d’application, direction, sens et valeur.',

    accroche: {
      texte: 'Au marché, Laure pousse son chariot chargé. « Pousse plus fort ! », lui lance Moussa. Mais plus fort comment ? Et à quel endroit ? Dans quel sens ? ' +
        'Pour le dire sans se tromper, il faut quatre renseignements. Et un petit appareil à ressort, dans la forge, donne même le nombre.',
      image: { dessin: 'fleche-force', objet: 'Chariot', forces: [{ point: 'gauche', sens: 'droite', longueur: 2 }], description: 'Un carré marqué Chariot, sur un quadrillage. Une flèche part de son bord gauche, là où Laure pousse, et va vers la droite.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Où ? le point d’application', 'Selon quelle ligne ? la direction', 'De quel côté ? le sens', 'Combien ? la valeur en newtons'], description: 'Les quatre questions d’une force : où, selon quelle ligne, de quel côté, et combien. On répond par le point d’application, la direction, le sens et la valeur en newtons.' },
      etapes: [
        'Où Laure pousse-t-elle ? Sur la poignée du chariot : c’est l’endroit où la force s’applique.',
        'Selon quelle ligne ? Une ligne horizontale : c’est la direction.',
        'De quel côté ? Vers l’avant du chariot : c’est le sens. Sur une même ligne, il y a deux sens.',
        'Combien ? On le mesure avec un dynamomètre, un ressort gradué qui s’allonge avec la force.',
        'L’unité de force est le newton, écrit N. Soulever une petite pomme demande environ un newton.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour bien décrire une action, on la voit comme ' + c.mot('force') + '. Il faut quatre renseignements. L’endroit : ' + c.mot('point') + '. La ligne : ' + c.mot('direction') + '. Le côté : ' + c.mot('sens') + '. ' +
        'Et le combien : ' + c.mot('valeur') + '. L’astuce : pose-toi quatre questions. Où, selon quelle ligne, de quel côté, combien ?',
    },

    vocabulaire: {
      termes: {
        force: { sesMots: 'un effort', officiel: 'une force', lesDeux: 'un effort, que les physiciens appellent une force' },
        point: { sesMots: 'l’endroit où ça pousse', officiel: 'le point d’application', lesDeux: 'l’endroit où ça pousse, que les physiciens appellent le point d’application' },
        direction: { sesMots: 'la ligne suivie', officiel: 'la direction', lesDeux: 'la ligne suivie, que les physiciens appellent la direction' },
        sens: { sesMots: 'le côté vers lequel ça pousse', officiel: 'le sens', lesDeux: 'le côté vers lequel ça pousse, que les physiciens appellent le sens' },
        valeur: { sesMots: 'le nombre de newtons', officiel: 'la valeur', lesDeux: 'le nombre de newtons, que les physiciens appellent la valeur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un effort, l’endroit où ça pousse, la ligne suivie, le côté vers lequel ça pousse, le nombre de newtons. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : une force. Elle a un point d’application, une direction, un sens, et une valeur en newtons. On la mesure avec un dynamomètre.',
        'Tu connais les mots officiels : la force, le point d’application, la direction, le sens, la valeur, le newton et le dynamomètre.',
      ],
    },

    exercices: [
      O.qcm('quelle-caracteristique', 'maison-courses',
        [['« Laure pousse sur la poignée du chariot. »', 'Le point d’application'], ['« La force est horizontale. »', 'La direction'], ['« La force va de la gauche vers la droite. »', 'Le sens'], ['« La force vaut 40 newtons. »', 'La valeur']],
        (x) => x + ' De quel renseignement s’agit-il ?', CARACTERES,
        'Où, selon quelle ligne, de quel côté, ou combien ?'),
      {
        id: 'lire-le-dynamometre',
        univers: 'appareils',
        // [newtons par graduation, nombre de graduations]
        versions: [[0.5, 6], [1, 7], [2, 4], [0.5, 9], [5, 3], [0.2, 5]],
        genere(c) {
          const [g, n] = c.alea.choisir(this.versions);
          const v = r2(g * n);
          return {
            enonce: 'Sur le dynamomètre de la forge, une graduation vaut ' + ecr(g) + ' N. L’aiguille s’arrête à ' + n + ' graduations. Quelle est la valeur de la force, en newtons ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Calcule ' + ecr(g) + ' × ' + n + '.',
            aideParlee: 'Multiplie la valeur d’une graduation par le nombre de graduations.',
            correction: [ecr(g) + ' × ' + n + ' = ' + ecr(v) + ' N.'],
          };
        },
      },
      O.qcm('quel-instrument', 'appareils',
        [['Pour mesurer une force, on utilise…', 'Un dynamomètre'], ['Pour mesurer une masse, on utilise…', 'Une balance'], ['Pour mesurer une tension électrique, on utilise…', 'Un voltmètre']],
        (x) => x, ['Un dynamomètre', 'Une balance', 'Un voltmètre'],
        'Le dynamomètre est le ressort gradué de la forge.'),
      {
        id: 'combien-de-fois',
        univers: 'commerce',
        // [force la plus petite, force la plus grande] en newtons
        versions: [[20, 60], [15, 45], [25, 100], [30, 90], [50, 200]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au marché, Moussa tire un carton avec une force de ' + a + ' N. Aminata tire une caisse avec une force de ' + b + ' N. Combien de fois la force d’Aminata est-elle plus grande ?',
            reponse: { type: 'nombre', valeur: b / a },
            aide: 'Calcule ' + b + ' ÷ ' + a + '.',
            aideParlee: 'Divise la grande force par la petite.',
            correction: [b + ' ÷ ' + a + ' = ' + b / a + '. Sa force est ' + b / a + ' fois plus grande.'],
          };
        },
      },
      O.qcm('ordre-de-grandeur', 'maison-courses',
        [['Soulever une petite pomme demande environ…', '1 newton'], ['Soulever un sac de riz de 10 kilos demande environ…', '100 newtons'], ['Soulever un adulte demande environ…', '700 newtons']],
        (x) => x, ['1 newton', '100 newtons', '700 newtons'],
        'Une petite pomme, environ un newton. Compare avec ce que tu soulèves.'),
    ],

    defi: {
      // [newtons par graduation, graduations]
      versions: [[5, 8], [10, 6], [2, 15], [5, 12]],
      genere(c) {
        const [g, n] = c.alea.choisir(this.versions);
        const v = g * n;
        return {
          enonce: 'À la forge, Esther tire vers le haut, avec un dynamomètre, sur le crochet d’un seau de clous posé au sol. Le seau ne décolle pas. Une graduation vaut ' + g + ' N, et l’aiguille s’arrête à ' + n + ' graduations.',
          questions: [
            {
              texte: 'Question 1. Calcule la valeur de la force exercée par le dynamomètre, en newtons.',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Multiplie la valeur d’une graduation par le nombre de graduations.',
              correction: [g + ' × ' + n + ' = ' + v + ' N.'],
            },
            {
              texte: 'Question 2. Quelle est la direction de cette force ?',
              reponse: O.choix(c.alea, 'Verticale', ['Horizontale', 'Aucune direction']),
              aide: 'Esther tire vers le haut. Quelle ligne cela donne-t-il ?',
              correction: ['Une force vers le haut suit une ligne verticale.', 'Réponse : Verticale.'],
            },
            {
              texte: 'Question 3. Donne les quatre caractéristiques de cette force.',
              correction: ['Point d’application : le crochet du seau. Direction : verticale. Sens : vers le haut. Valeur : ' + v + ' N.'],
              grille: ['As-tu donné le point d’application ?', 'As-tu donné la direction et le sens ?', 'As-tu donné la valeur en newtons ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Où, selon quelle ligne, de quel côté, combien : une force n’a plus de secret pour toi.',
    carte: ['quelle-caracteristique', 'lire-le-dynamometre', 'ordre-de-grandeur'],
    papierDuSoir: { exercices: ['lire-le-dynamometre', 'combien-de-fois'], defi: true },
    automatismes: [
      {
        id: 'graduations',
        versions: [[2, 5], [5, 4], [10, 3], [2, 8]],
        genere(c) { const [g, n] = c.alea.choisir(this.versions); return { enonce: n + ' graduations de ' + g + ' N : combien de newtons ?', reponse: { type: 'nombre', valeur: g * n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Gabon, les Fang tendaient leur arbalète assis, les deux pieds sur l’arc. Ils tiraient la corde de toutes leurs forces.',
    prenoms: ['Laure', 'Moussa', 'Aminata', 'Esther'],
  };
});
