/* Notion 3 du bloc de technologie « Concevoir et fabriquer » : l’écoconception. La lampe de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const pl = (n, mot) => O.ecr(n) + ' ' + mot + (n < 2 ? '' : 's');

  return {
    id: 'ecoconception',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'L’écoconception',
    classe: '4e',
    univers: ['appareils', 'maison-courses', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : prendre en compte l’impact d’un objet dès sa conception (matière, énergie, transport, fin de vie, réparabilité).',

    accroche: {
      texte: 'Clarisse veut offrir une lampe à Rachel. Rachel dit : « Et si on la dessinait nous-mêmes ? » ' +
        'Elle pense à la matière, à l’énergie, au voyage de la lampe depuis l’usine. Elle pense aussi à ce que la lampe deviendra un jour. Moussa ajoute : « Et si on pouvait la réparer ? »',
      image: { dessin: 'chaine', etapes: ['La matière', 'L’énergie', 'Le voyage', 'Ce que devient la lampe', 'La réparation'], description: 'Les cinq questions de Rachel sur la lampe : la matière, l’énergie, le voyage, ce que devient la lampe, et la réparation.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['La matière', 'L’énergie', 'Le voyage', 'Ce que devient la lampe', 'La réparation'], description: 'Les cinq questions à poser avant de dessiner une lampe : la matière, l’énergie, le voyage, ce que devient la lampe, la réparation.' },
      etapes: [
        'Première question : de quelle matière la lampe est-elle faite, et en faut-il autant ?',
        'Deuxième question : quelle énergie la lampe consomme-t-elle quand elle éclaire ?',
        'Troisième question : d’où vient la lampe, et quel chemin fait-elle pour arriver ?',
        'Quatrième question : que devient la lampe quand on n’en veut plus ? Elle part un jour à la déchetterie.',
        'Cinquième question : si elle tombe en panne, peut-on la réparer facilement ? Moussa regarde si les vis se défont.',
        'On pose ces cinq questions dès le dessin, avant de fabriquer.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde la façon de travailler de Rachel : c’est ' + c.mot('eco') + '. ' +
        'Regarde ce qui arrive à la lampe à la déchetterie : c’est ' + c.mot('fin') + '. ' +
        'Regarde les vis que Moussa peut défaire : c’est ' + c.mot('rep') + '. ' +
        'L’astuce : avant de dessiner, on pose cinq questions sur l’objet, de sa fabrication jusqu’à sa dernière heure.',
    },

    vocabulaire: {
      termes: {
        eco: { sesMots: 'penser à la planète dès le dessin de l’objet', officiel: 'l’écoconception', lesDeux: 'penser à la planète dès le dessin de l’objet, que les techniciens appellent l’écoconception' },
        fin: { sesMots: 'ce que devient l’objet à la fin', officiel: 'la fin de vie', lesDeux: 'ce que devient l’objet à la fin, que les techniciens appellent la fin de vie' },
        rep: { sesMots: 'la facilité à réparer l’objet', officiel: 'la réparabilité', lesDeux: 'la facilité à réparer l’objet, que les techniciens appellent la réparabilité' },
      },
      textes: [
        'Pour l’instant, garde tes mots : penser à la planète dès le dessin. Garde aussi : ce que devient l’objet quand on n’en veut plus, et la facilité à réparer. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : l’écoconception, la fin de vie, la réparabilité. L’écoconception, c’est penser à la planète dès le dessin. ' +
          'La fin de vie, c’est ce que devient l’objet. La réparabilité, c’est la facilité à le réparer.',
        'Tu connais les mots officiels : l’écoconception, la fin de vie et la réparabilité. Avec eux, tu choisis mieux tes objets.',
      ],
    },

    exercices: [
      {
        id: 'quel-choix',
        univers: 'maison-courses',
        // [ce que l’on veut, bon choix, deux mauvais choix, pourquoi]
        versions: [
          ['limiter la matière utilisée', 'Faire un pied plus fin, mais assez solide', ['Ajouter une deuxième coque autour', 'Épaissir toutes les pièces sans raison'], 'Moins de matière, c’est moins de ressources prises à la planète.'],
          ['consommer moins d’énergie quand la lampe éclaire', 'Choisir une ampoule qui consomme peu', ['Choisir une ampoule qui chauffe beaucoup', 'Laisser la lampe allumée toute la nuit'], 'Une ampoule économe éclaire autant en consommant moins.'],
          ['limiter le transport', 'Acheter le bois dans un atelier proche', ['Faire venir chaque planche de très loin', 'Faire livrer chaque pièce séparément'], 'Plus la matière vient de près, moins elle voyage.'],
          ['faciliter la réparation', 'Visser les pièces plutôt que les coller', ['Coller toutes les pièces ensemble', 'Cacher les vis sous de la résine'], 'Une pièce vissée se défait et se change.'],
          ['préparer la fin de vie', 'Choisir des matières que l’on peut séparer et recycler', ['Coller ensemble plusieurs matières différentes', 'Fermer la lampe pour que personne ne puisse l’ouvrir'], 'Des matières séparables peuvent être recyclées une à une.'],
        ],
        genere(c) {
          const [x, bonne, autres, pourquoi] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pour l’écoconception de la lampe, Rachel veut ' + x + '. Quel choix convient ?',
            reponse: O.choix(c.alea, bonne, autres),
            aide: 'Pense à ce que chaque choix change pour la planète.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'matiere-economisee',
        univers: 'appareils',
        // [grammes du premier pied, grammes du pied plus fin, nombre de lampes]
        versions: [[500, 400, 20], [800, 600, 10], [300, 250, 40], [1200, 900, 10], [450, 350, 30]],
        genere(c) {
          const [m1, m2, n] = c.alea.choisir(this.versions);
          const g = (m1 - m2) * n;
          return {
            enonce: 'Le pied d’une lampe pèse ' + m1 + ' g. Rachel le dessine plus fin : il pèse ' + m2 + ' g. Pour fabriquer ' + n + ' lampes, combien de kilogrammes de matière économise-t-elle ? (1 kg = 1 000 g)',
            reponse: { type: 'nombre', valeur: g / 1000 },
            aide: 'Calcule la masse gagnée sur une lampe, multiplie par le nombre de lampes, puis convertis en kilogrammes.',
            correction: [m1 + ' − ' + m2 + ' = ' + (m1 - m2) + ' g par lampe.', (m1 - m2) + ' × ' + n + ' = ' + g + ' g.', g + ' ÷ 1 000 = ' + O.ecr(g / 1000) + ' kg.'],
          };
        },
      },
      {
        id: 'kilometres-evites',
        univers: 'dehors',
        // [km jusqu’à la scierie proche, km jusqu’à la scierie lointaine]
        versions: [[10, 60], [5, 45], [20, 120], [15, 75], [8, 38]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'La scierie proche est à ' + a + ' km de l’atelier, la scierie lointaine à ' + b + ' km. Pour une commande, il faut un aller et un retour. Combien de kilomètres Rachel évite-t-elle en choisissant la scierie proche ?',
            reponse: { type: 'nombre', valeur: 2 * (b - a) },
            aide: 'Calcule la différence entre les deux distances, puis double-la pour l’aller et le retour.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' km pour un trajet.', (b - a) + ' × 2 = ' + 2 * (b - a) + ' km.'],
          };
        },
      },
      {
        id: 'cout-par-annee',
        univers: 'commerce',
        // [prix en euros, années de vie]
        versions: [[24, 3], [30, 5], [18, 2], [40, 4], [35, 5]],
        genere(c) {
          const [p, a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une lampe coûte ' + p + ' euros et dure ' + pl(a, 'an') + '. Combien coûte-t-elle par année d’usage, en euros ?',
            reponse: { type: 'nombre', valeur: p / a },
            aide: 'Divise le prix par le nombre d’années.',
            correction: [p + ' ÷ ' + a + ' = ' + p / a + ' euros par an.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'famille',
        [
          ['On pense à l’impact d’un objet seulement quand on le jette.', 'Faux', 'L’écoconception commence dès le dessin, pas à la fin.'],
          ['Des pièces faciles à démonter aident à réparer l’objet.', 'Vrai', 'On peut changer la pièce en panne sans tout jeter.'],
          ['Un objet que l’on ne peut pas ouvrir est facile à réparer.', 'Faux', 'Sans ouvrir l’objet, on ne peut pas atteindre la pièce en panne.'],
          ['Choisir une matière qui se recycle prépare la fin de vie de l’objet.', 'Vrai', 'Une matière recyclable peut servir à fabriquer un autre objet.'],
          ['Faire venir les pièces de plus près réduit le transport.', 'Vrai', 'Un trajet plus court, c’est moins de transport.'],
        ],
        (x) => '« ' + x + ' » Vrai ou faux ?', ['Vrai', 'Faux'],
        'Relis la phrase en pensant à la planète, du dessin jusqu’à la fin de vie.'),
    ],

    defi: {
      // [prix du modèle A, années du modèle A, prix du modèle B, années du modèle B]
      versions: [[24, 3, 30, 5], [20, 2, 36, 6], [30, 5, 28, 4], [36, 3, 40, 5], [15, 3, 21, 3]],
      genere(c) {
        const [pa, ya, pb, yb] = c.alea.choisir(this.versions);
        const ca = pa / ya, cb = pb / yb;
        const moins = ca < cb ? 'Le modèle A' : 'Le modèle B';
        return {
          enonce: 'Clarisse hésite entre deux lampes. Le modèle A a des pièces collées : il coûte ' + pa + ' euros et dure ' + pl(ya, 'an') + '. ' +
            'Le modèle B a des pièces vissées : il coûte ' + pb + ' euros et dure ' + pl(yb, 'an') + '.',
          questions: [
            {
              texte: 'Question 1. Combien coûte le modèle A par année d’usage, en euros ?',
              reponse: { type: 'nombre', valeur: ca },
              aide: 'Divise le prix par le nombre d’années.',
              correction: [pa + ' ÷ ' + ya + ' = ' + ca + ' euros par an.'],
            },
            {
              texte: 'Question 2. Combien coûte le modèle B par année d’usage, en euros ?',
              reponse: { type: 'nombre', valeur: cb },
              aide: 'Divise le prix par le nombre d’années.',
              correction: [pb + ' ÷ ' + yb + ' = ' + cb + ' euros par an.'],
            },
            {
              texte: 'Question 3. Quel modèle coûte le moins par année d’usage ?',
              reponse: O.choix(c.alea, moins, [moins === 'Le modèle A' ? 'Le modèle B' : 'Le modèle A']),
              aide: 'Compare les deux coûts par année.',
              correction: ['Le modèle A coûte ' + ca + ' euros par an, le modèle B ' + cb + ' euros par an.', 'Réponse : ' + moins + '.'],
            },
            {
              texte: 'Question 4. Explique en deux phrases ce que les pièces vissées du modèle B changent pour la réparation et pour la fin de vie.',
              correction: ['Des pièces vissées se défont : on peut changer la pièce en panne.', 'À la fin de vie, on peut séparer les matières pour les recycler.'],
              grille: ['As-tu parlé de la réparation d’une pièce en panne ?', 'As-tu parlé de la fin de vie ou du recyclage ?', 'Tes phrases sont-elles courtes et claires ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais penser à la planète dès le dessin : la matière, l’énergie, le voyage, la fin de vie et la réparation.',
    carte: ['quel-choix', 'cout-par-annee', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['matiere-economisee', 'kilometres-evites', 'cout-par-annee'], defi: true },
    automatismes: [
      {
        id: 'prix-par-an',
        versions: [[20, 4], [30, 5], [18, 3], [24, 2]],
        genere(c) { const [p, a] = c.alea.choisir(this.versions); return { enonce: p + ' euros pour ' + a + ' ans : combien par an, en euros ?', reponse: { type: 'nombre', valeur: p / a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Ghana, Bernice Dapaah fabrique des vélos en bambou et plante dix bambous pour chaque bambou coupé.',
    prenoms: ['Clarisse', 'Rachel', 'Moussa'],
  };
});
