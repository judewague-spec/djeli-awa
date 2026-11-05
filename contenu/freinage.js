/* Notion 5 du bloc « L'énergie » : freinage et sécurité. La voiture de Laure et le ballon.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  // Un nombre écrit avec des espaces entre les milliers et une virgule : 67 500, 1,5.
  const gr = (x) => { const [a, b] = String(x).split('.'); return a.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (b ? ',' + b : ''); };
  const sec = (t) => ecr(t) + (t >= 2 ? ' secondes' : ' seconde');

  return {
    id: 'freinage',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'Freinage et sécurité',
    classe: '3e',
    univers: ['dehors', 'famille', 'appareils'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : énergie cinétique convertie en chaleur au freinage, distances de réaction, de freinage et d’arrêt.',

    accroche: {
      texte: 'Laure conduit en ville, avec Rachel. Soudain, un ballon roule sur la route. Laure freine. ' +
        'Mais la voiture ne s’arrête pas tout de suite. Elle avance encore de plusieurs mètres.',
      image: { dessin: 'chaine', etapes: ['Laure voit le ballon', 'La voiture avance encore', 'Les freins serrent', 'La voiture s’arrête'], description: 'Laure voit le ballon. La voiture avance encore. Les freins serrent. Enfin la voiture s’arrête.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Distance de réaction + distance de freinage', '= distance d’arrêt', 'Énergie cinétique devient chaleur'], description: 'La distance de réaction plus la distance de freinage donne la distance d’arrêt. Dans les freins, l’énergie cinétique devient de la chaleur.' },
      etapes: [
        'Quand un danger apparaît, le conducteur met un moment à réagir : c’est le temps de réaction.',
        'Pendant ce temps, la voiture avance : c’est la distance de réaction. Elle est égale à la vitesse fois le temps de réaction.',
        'Ensuite, les freins agissent : la voiture avance encore. C’est la distance de freinage.',
        'La distance d’arrêt est la somme : distance de réaction plus distance de freinage.',
        'Les freins transforment l’énergie cinétique de la voiture en chaleur : ils chauffent.',
        'Si la vitesse double, l’énergie cinétique est multipliée par 4. La distance de freinage l’est aussi, à peu près.',
        'Sur route mouillée, les pneus adhèrent moins : la distance de freinage est plus longue.',
        'Les valeurs des exercices sont des exemples : elles changent selon la voiture, la route et le conducteur.',
      ],
    },

    decouverte: {
      texte: (c) => 'Il y a d’abord ' + c.mot('reaction') + '. C’est le temps de réagir : la voiture avance déjà. ' +
        'Il y a ensuite ' + c.mot('freinage') + '. La voiture ralentit peu à peu. ' +
        'En tout, cela donne ' + c.mot('arret') + '. On additionne les deux. ' +
        'L’énergie du mouvement devient de la chaleur dans les freins. ' +
        'Sur route mouillée, le deuxième chemin est plus long.',
    },

    vocabulaire: {
      termes: {
        reaction: { sesMots: 'le chemin fait avant de freiner', officiel: 'la distance de réaction', lesDeux: 'le chemin fait avant de freiner, que les physiciens appellent la distance de réaction' },
        freinage: { sesMots: 'le chemin fait freins serrés', officiel: 'la distance de freinage', lesDeux: 'le chemin fait freins serrés, que les physiciens appellent la distance de freinage' },
        arret: { sesMots: 'le chemin total pour s’arrêter', officiel: 'la distance d’arrêt', lesDeux: 'le chemin total pour s’arrêter, que les physiciens appellent la distance d’arrêt' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le chemin fait avant de freiner. Le chemin fait freins serrés. Le chemin total pour s’arrêter. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la distance de réaction, la distance de freinage, et la distance d’arrêt.',
        'Tu connais les mots officiels : la distance de réaction, la distance de freinage et la distance d’arrêt.',
      ],
    },

    exercices: [
      {
        id: 'dist-reaction',
        univers: 'dehors',
        // [vitesse en km/h, temps de réaction en s]
        versions: [[36, 1], [72, 1], [54, 1.5], [90, 1], [108, 1], [72, 1.5]],
        genere(c) {
          const [k, t] = c.alea.choisir(this.versions);
          const v = r2(k / 3.6), d = r2(v * t);
          return {
            enonce: 'Laure roule à ' + k + ' km/h. Dans cet exemple, son temps de réaction est de ' + sec(t) + '. Quelle distance de réaction parcourt la voiture, en mètres ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Convertis la vitesse en m/s, puis multiplie par ' + ecr(t) + '.',
            aideParlee: 'Convertis la vitesse en mètres par seconde, puis multiplie par le temps de réaction.',
            correction: [k + ' ÷ 3,6 = ' + ecr(v) + ' m/s.', 'd = v × t = ' + ecr(v) + ' × ' + ecr(t) + ' = ' + ecr(d) + ' m.'],
          };
        },
      },
      {
        id: 'dist-arret',
        univers: 'famille',
        // [vitesse en km/h, distance de réaction en m, distance de freinage en m]
        versions: [[36, 10, 7], [54, 15, 16], [72, 20, 30], [90, 25, 45], [108, 30, 65]],
        genere(c) {
          const [k, r, f] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple, à ' + k + ' km/h, la distance de réaction est de ' + r + ' m et la distance de freinage de ' + f + ' m. Quelle est la distance d’arrêt, en mètres ?',
            reponse: { type: 'nombre', valeur: r + f },
            aide: 'Additionne la distance de réaction et la distance de freinage.',
            correction: ['Distance d’arrêt = ' + r + ' + ' + f + ' = ' + (r + f) + ' m.'],
          };
        },
      },
      {
        id: 'chaleur-freins',
        univers: 'appareils',
        // [masse en kg, vitesse en m/s]
        versions: [[1000, 10], [800, 10], [1500, 10], [1200, 10], [600, 15], [400, 15]],
        genere(c) {
          const [m, v] = c.alea.choisir(this.versions);
          const ec = (m * v * v) / 2;
          return {
            enonce: 'Dans cet exemple, un véhicule de ' + gr(m) + ' kg roule à ' + v + ' m/s, puis s’arrête en freinant. On suppose que toute son énergie cinétique devient de la chaleur dans les freins. On donne Ec = ½ × m × v². Quelle chaleur reçoivent les freins, en joules ?',
            reponse: { type: 'nombre', valeur: ec },
            aide: 'Calcule l’énergie cinétique : ½ × ' + gr(m) + ' × ' + v + ' × ' + v + '.',
            aideParlee: 'Calcule l’énergie cinétique : la moitié de la masse fois la vitesse fois la vitesse.',
            correction: ['Ec = ½ × ' + gr(m) + ' × ' + v * v + ' = ' + gr(ec) + ' J.', 'Les freins reçoivent ' + gr(ec) + ' J sous forme de chaleur.'],
          };
        },
      },
      {
        id: 'route-mouillee',
        univers: 'dehors',
        // [distance de réaction en m, distance de freinage sur route sèche en m, facteur sur route mouillée]
        versions: [[10, 7, 2], [15, 16, 2], [20, 30, 1.5], [25, 45, 1.5], [20, 30, 2], [30, 65, 1.5]],
        genere(c) {
          const [r, f, k] = c.alea.choisir(this.versions);
          const fm = r2(f * k), tot = r2(r + fm);
          return {
            enonce: 'Dans cet exemple, la distance de réaction est de ' + r + ' m. Sur route sèche, la distance de freinage est de ' + f + ' m. Sur route mouillée, elle est multipliée par ' + ecr(k) + '. Quelle est la distance d’arrêt sur route mouillée, en mètres ?',
            reponse: { type: 'nombre', valeur: tot },
            aide: 'Calcule d’abord la distance de freinage sur route mouillée, puis additionne.',
            correction: ['Freinage sur route mouillée : ' + f + ' × ' + ecr(k) + ' = ' + ecr(fm) + ' m.', 'Distance d’arrêt : ' + r + ' + ' + ecr(fm) + ' = ' + ecr(tot) + ' m.'],
          };
        },
      },
      {
        id: 'energie-et-freins',
        univers: 'famille',
        // [question, bonne réponse, piège 1, piège 2, pourquoi]
        versions: [
          ['Une voiture double sa vitesse. Que devient son énergie cinétique ?', 'Elle est multipliée par 4', 'Elle est multipliée par 2', 'Elle reste la même', 'La vitesse est au carré dans la formule : 2 × 2 = 4.'],
          ['Une voiture roule deux fois plus vite, sur la même route sèche, avec les mêmes freins. Que devient à peu près sa distance de freinage ?', 'Elle est multipliée par 4', 'Elle est multipliée par 2', 'Elle reste la même', 'L’énergie à absorber est multipliée par 4 : la distance de freinage l’est à peu près aussi.'],
          ['Quand les freins arrêtent la voiture, que devient surtout son énergie cinétique ?', 'Elle devient de la chaleur', 'Elle disparaît sans laisser de trace', 'Elle devient de l’énergie de position', 'Les freins chauffent : l’énergie de mouvement devient de la chaleur.'],
          ['Sur route mouillée, que devient la distance de freinage ?', 'Elle est plus longue', 'Elle est plus courte', 'Elle est la même', 'Les pneus adhèrent moins : la voiture met plus de chemin à s’arrêter.'],
        ],
        genere(c) {
          const [q, bonne, p1, p2, pourquoi] = c.alea.choisir(this.versions);
          return {
            enonce: q,
            reponse: O.choix(c.alea, bonne, [p1, p2]),
            aide: 'Pense à l’énergie du mouvement et à ce qu’elle devient dans les freins.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [vitesse en km/h, temps de réaction en s, distance de freinage sur route sèche en m, distance du ballon en m]
      versions: [[54, 1, 16, 35], [72, 1, 30, 45], [90, 1, 45, 60], [36, 1.5, 7, 25]],
      genere(c) {
        const [k, t, f, d] = c.alea.choisir(this.versions);
        const v = r2(k / 3.6), r = r2(v * t), tot = r2(r + f), oui = tot <= d;
        return {
          enonce: 'Laure roule à ' + k + ' km/h, avec Rachel. Un ballon roule sur la route, à ' + d + ' m devant la voiture. Dans cet exemple, le temps de réaction de Laure est de ' + sec(t) + ' et la distance de freinage sur route sèche est de ' + f + ' m.',
          questions: [
            {
              texte: 'Question 1. Quelle distance la voiture parcourt-elle pendant le temps de réaction, en mètres ?',
              reponse: { type: 'nombre', valeur: r },
              aide: 'Convertis la vitesse en m/s, puis multiplie par ' + ecr(t) + '.',
              aideParlee: 'Convertis la vitesse en mètres par seconde, puis multiplie par le temps de réaction.',
              correction: [k + ' ÷ 3,6 = ' + ecr(v) + ' m/s.', ecr(v) + ' × ' + ecr(t) + ' = ' + ecr(r) + ' m.'],
            },
            {
              texte: 'Question 2. Quelle est la distance d’arrêt, en mètres ?',
              reponse: { type: 'nombre', valeur: tot },
              aide: 'Additionne la distance de réaction et la distance de freinage.',
              correction: [ecr(r) + ' + ' + f + ' = ' + ecr(tot) + ' m.'],
            },
            {
              texte: 'Question 3. La voiture s’arrête-t-elle avant le ballon ?',
              reponse: O.choix(c.alea, oui ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare la distance d’arrêt à la distance du ballon.',
              correction: ['Distance d’arrêt : ' + ecr(tot) + ' m. Distance du ballon : ' + d + ' m.', ecr(tot) + (oui ? ' est plus petit que ' : ' est plus grand que ') + d + '.', 'Réponse : ' + (oui ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Il se met à pleuvoir. Explique comment la distance d’arrêt change et pourquoi. Parle des freins et de l’énergie cinétique.',
              correction: ['Sur route mouillée, les pneus adhèrent moins : la distance de freinage est plus longue, donc la distance d’arrêt aussi.', 'Les freins doivent transformer la même énergie cinétique en chaleur, mais sur un chemin plus long.'],
              grille: ['As-tu dit que la distance d’arrêt augmente ?', 'As-tu expliqué que les pneus adhèrent moins ?', 'As-tu parlé de l’énergie cinétique qui devient de la chaleur ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais additionner réaction et freinage, et tu sais pourquoi la vitesse et la pluie allongent l’arrêt.',
    carte: ['dist-reaction', 'dist-arret', 'route-mouillee'],
    papierDuSoir: { exercices: ['dist-reaction', 'route-mouillee'], defi: true },
    automatismes: [
      {
        id: 'metres-en-reaction',
        // [vitesse en m/s, temps en s]
        versions: [[10, 2], [15, 2], [20, 2], [5, 3]],
        genere(c) { const [v, t] = c.alea.choisir(this.versions); return { enonce: v + ' × ' + t + ' = ?', reponse: { type: 'nombre', valeur: v * t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Allemagne, un cordonnier a cloué du cuir neuf sur les patins de frein de Bertha Benz.',
    prenoms: ['Laure', 'Rachel'],
  };
});
