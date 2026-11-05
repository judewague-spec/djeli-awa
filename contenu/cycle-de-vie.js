/* Notion 14 du bloc de technologie « Les objets et la société » : le cycle de vie d'un objet. La vie du téléphone de Rachel.
   Les quantités de dioxyde de carbone sont des valeurs d'exercice, données dans chaque énoncé. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const ETAPES = ['Extraire les matières premières', 'Fabriquer l’objet', 'Le transporter et le vendre', 'L’utiliser', 'Sa fin de vie : réparer, réemployer ou recycler'];
  const COURT = ['L’extraction des matières premières', 'La fabrication', 'Le transport', 'L’utilisation', 'La fin de vie'];

  return {
    id: 'cycle-de-vie',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Le cycle de vie d’un objet',
    classe: '3e',
    univers: ['appareils', 'commerce', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 31) : les différentes étapes du cycle de vie d’un objet.',

    accroche: {
      texte: 'Le téléphone de Rachel a une longue histoire. Avant d’arriver dans sa main, des métaux ont été sortis de la terre, puis transformés à l’usine, puis transportés en bateau et en camion. ' +
        'Et quand il ne marchera plus ? Réparé à l’atelier, donné à sa petite sœur, ou recyclé. Toute la vie d’un objet compte.',
      image: { dessin: 'chaine', etapes: ETAPES, description: 'La vie d’un téléphone : extraire les matières premières, le fabriquer, le transporter et le vendre, l’utiliser, puis le réparer, le réemployer ou le recycler.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: COURT, description: 'Les cinq étapes : extraction des matières premières, fabrication, transport, utilisation, fin de vie.' },
      etapes: [
        'La vie d’un objet commence bien avant le magasin : on extrait des métaux, du pétrole pour le plastique, du sable pour le verre.',
        'Ensuite on le fabrique, on le transporte, on le vend, puis on l’utilise.',
        'À la fin, on peut le réparer, le donner pour qu’il serve encore, ou le recycler pour récupérer ses matières.',
        'Chaque étape a un impact sur la nature. Garder son objet plus longtemps répartit l’impact de sa fabrication sur plus d’années.',
      ],
    },

    decouverte: {
      texte: (c) => 'Toutes les étapes de la vie d’un objet, de la matière sortie de la terre jusqu’au recyclage, forment ' + c.mot('cycle') + '. ' +
        'La dernière étape s’appelle ' + c.mot('fin') + ' : réparer, réemployer, ou recycler. ' +
        'L’astuce : pour juger un objet, regarde toutes les étapes, pas seulement le moment où tu l’utilises.',
    },

    vocabulaire: {
      termes: {
        cycle: { sesMots: 'toute la vie de l’objet', officiel: 'le cycle de vie', lesDeux: 'toute la vie de l’objet, que les techniciens appellent le cycle de vie' },
        fin: { sesMots: 'le moment où l’objet ne sert plus', officiel: 'la fin de vie', lesDeux: 'le moment où l’objet ne sert plus, que les techniciens appellent la fin de vie' },
      },
      textes: [
        'Pour l’instant, garde tes mots : toute la vie de l’objet, et le moment où l’objet ne sert plus. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : le cycle de vie, de l’extraction des matières premières à la fin de vie.',
        'Tu connais les mots officiels : le cycle de vie, les matières premières, et la fin de vie.',
      ],
    },

    exercices: [
      O.qcm('quelle-etape', 'appareils',
        [['On sort du cuivre d’une mine.', 'L’extraction des matières premières'], ['On assemble l’écran et la batterie à l’usine.', 'La fabrication'], ['Le carton de téléphones voyage en bateau.', 'Le transport'],
          ['Rachel recharge son téléphone chaque soir.', 'L’utilisation'], ['Le vieux téléphone est donné à la petite sœur de Rachel.', 'La fin de vie']],
        (x) => '« ' + x + ' » À quelle étape du cycle de vie est-on ?', COURT,
        'Extraction, fabrication, transport, utilisation, ou fin de vie ?'),
      O.qcm('etape-suivante', 'commerce',
        [['L’extraction des matières premières', 'La fabrication'], ['La fabrication', 'Le transport'], ['Le transport', 'L’utilisation'], ['L’utilisation', 'La fin de vie']],
        (x) => 'Dans le cycle de vie, quelle étape vient juste après : ' + x.charAt(0).toLowerCase() + x.slice(1) + ' ?', COURT,
        'Suis la vie de l’objet, de la mine au recyclage.'),
      O.qcm('meilleure-fin', 'famille',
        [['un téléphone qui marche encore', 'Le donner pour qu’il serve encore'], ['un téléphone à l’écran fêlé', 'Le faire réparer'], ['un téléphone qui ne s’allume plus du tout et ne se répare pas', 'Le déposer pour qu’il soit recyclé']],
        (x) => 'Que faire d’' + x + ' ?', ['Le donner pour qu’il serve encore', 'Le faire réparer', 'Le déposer pour qu’il soit recyclé', 'Le jeter dans la nature'],
        'D’abord réparer ou donner ; recycler en dernier.'),
      {
        id: 'part-de-la-fabrication',
        univers: 'appareils',
        // [kg de dioxyde de carbone à la fabrication, total sur toute la vie]
        versions: [[60, 80], [45, 60], [70, 100], [40, 50], [80, 100]],
        genere(c) {
          const [f, t] = c.alea.choisir(this.versions);
          const p = (f * 100) / t;
          return {
            enonce: 'Dans cet exercice, sur toute sa vie, un téléphone rejette ' + t + ' kg de dioxyde de carbone, dont ' + f + ' kg pour sa fabrication. Quel pourcentage vient de la fabrication ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + f + ' × 100 ÷ ' + t + '.',
            aideParlee: 'Multiplie la part de la fabrication par cent, puis divise par le total.',
            correction: [f + ' × 100 ÷ ' + t + ' = ' + ecr(p) + ' %.'],
          };
        },
      },
      {
        id: 'par-annee',
        univers: 'famille',
        // [kg à la fabrication, années d'usage]
        versions: [[60, 2], [60, 4], [72, 3], [72, 6], [80, 5]],
        genere(c) {
          const [f, a] = c.alea.choisir(this.versions);
          return {
            enonce: 'La fabrication d’un téléphone rejette ' + f + ' kg de dioxyde de carbone. Rachel le garde ' + a + ' ans. Combien de kilogrammes cela fait-il par année d’usage ?',
            reponse: { type: 'nombre', valeur: f / a },
            aide: 'Calcule ' + f + ' ÷ ' + a + '.',
            aideParlee: 'Divise ce que rejette la fabrication par le nombre d’années.',
            correction: [f + ' ÷ ' + a + ' = ' + ecr(f / a) + ' kg par an.'],
          };
        },
      },
    ],

    defi: {
      // [kg à la fabrication, total sur la vie, années d'usage courtes, années d'usage longues]
      versions: [[60, 80, 2, 4], [72, 90, 3, 6], [80, 100, 2, 5], [45, 60, 3, 5]],
      genere(c) {
        const [f, t, a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Dans cet exercice, le téléphone de Rachel rejette ' + t + ' kg de dioxyde de carbone sur toute sa vie, dont ' + f + ' kg pour sa fabrication. ' +
            'Rachel hésite : le changer au bout de ' + a + ' ans, ou le garder ' + b + ' ans en le faisant réparer.',
          questions: [
            {
              texte: 'Question 1. Quel pourcentage du total vient de la fabrication ?',
              reponse: { type: 'nombre', valeur: (f * 100) / t },
              aide: 'Multiplie la part de la fabrication par cent, puis divise par le total.',
              correction: [f + ' × 100 ÷ ' + t + ' = ' + ecr((f * 100) / t) + ' %.'],
            },
            {
              texte: 'Question 2. Combien de kilogrammes de la fabrication compte-t-on par année, si elle le garde ' + a + ' ans ?',
              reponse: { type: 'nombre', valeur: f / a },
              aide: 'Divise ce que rejette la fabrication par le nombre d’années.',
              correction: [f + ' ÷ ' + a + ' = ' + ecr(f / a) + ' kg par an.'],
            },
            {
              texte: 'Question 3. Et si elle le garde ' + b + ' ans ?',
              reponse: { type: 'nombre', valeur: f / b },
              aide: 'Divise ce que rejette la fabrication par le nombre d’années.',
              correction: [f + ' ÷ ' + b + ' = ' + ecr(f / b) + ' kg par an.'],
            },
            {
              texte: 'Question 4. En t’appuyant sur le cycle de vie, explique pourquoi garder et réparer son téléphone est un bon choix.',
              correction: ['La fabrication est l’étape qui rejette le plus.', 'Plus on garde le téléphone longtemps, plus cet impact est réparti sur beaucoup d’années, et moins il faut fabriquer de téléphones neufs.'],
              grille: ['As-tu dit que la fabrication pèse lourd dans le cycle de vie ?', 'As-tu comparé les deux durées ?', 'As-tu parlé de réparation ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! De la mine au recyclage, tu sais suivre toute la vie d’un objet.',
    carte: ['quelle-etape', 'etape-suivante', 'meilleure-fin'],
    papierDuSoir: { exercices: ['part-de-la-fabrication', 'par-annee'], defi: true },
    automatismes: [
      {
        id: 'division-rapide',
        versions: [[60, 2], [60, 4], [72, 6], [80, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, un bateau de neuf mètres a été construit avec dix tonnes de déchets plastiques ramassés sur les plages. Il a navigué jusqu’à Zanzibar, en Tanzanie.',
    prenoms: ['Rachel'],
  };
});
