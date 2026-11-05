/* Notion 2 du bloc « L'énergie » : CO₂ et effet de serre. La cuisinière à gaz de Rebecca.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  // Un nombre écrit avec des espaces entre les milliers : 12 000.
  const gr = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const Q = (id, u, v, e, t, a) => O.qcm(id, u, v, e, t, a);

  return {
    id: 'co2-effet-serre',
    matiere: 'physique-chimie',
    bloc: 'energie',
    titre: 'CO₂ et effet de serre',
    classe: 'cycle 4',
    univers: ['appareils', 'dehors', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : combustions, dioxyde de carbone, effet de serre naturel et renforcé.',

    accroche: {
      texte: 'Rebecca allume le gaz de la cuisinière. La flamme chauffe la marmite de Rachel. ' +
        'Mais en brûlant, le gaz fabrique un autre gaz, invisible, qui part dans l’air. Et ce gaz agit sur le climat.',
      image: { dessin: 'chaine', etapes: ['Le gaz brûle dans la flamme', 'Un gaz invisible part dans l’air', 'Il agit sur le climat'], description: 'Le gaz de la cuisinière brûle dans la flamme. Un gaz invisible part dans l’air. Ce gaz agit sur le climat.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Combustion : combustible + dioxygène', 'Rejet : chaleur + dioxyde de carbone', 'Dans l’air : effet de serre renforcé'], description: 'Une combustion utilise un combustible et du dioxygène. Elle rejette de la chaleur et du dioxyde de carbone. Dans l’air, ce gaz renforce l’effet de serre.' },
      etapes: [
        'Quand un combustible brûle, il réagit avec le dioxygène de l’air : c’est une combustion.',
        'La combustion du bois, du gaz ou de l’essence rejette du dioxyde de carbone, de formule CO₂.',
        'Le dioxyde de carbone est un gaz à effet de serre. Il retient une partie de la chaleur de la Terre.',
        'L’effet de serre naturel est utile : sans lui, la Terre serait beaucoup plus froide.',
        'Les activités humaines ajoutent des gaz à effet de serre. L’effet de serre est renforcé, et la Terre se réchauffe.',
        'Bilan simple : ce qui est rejeté, moins ce qui est absorbé par les forêts, reste dans l’air.',
      ],
    },

    decouverte: {
      texte: (c) => 'Quand ça brûle, c’est ' + c.mot('combustion') + '. ' +
        'Elle fabrique ' + c.mot('co2') + '. ' +
        'Dans l’air, ce gaz participe à ' + c.mot('serre') + '. ' +
        'Garder un peu de chaleur est naturel et utile : sans cela, la Terre serait gelée. ' +
        'Mais nos feux ajoutent de ce gaz. Trop de chaleur est gardée, et la Terre se réchauffe. ' +
        'L’astuce : plus on brûle, plus il y a de gaz, et plus la chaleur est gardée.',
    },

    vocabulaire: {
      termes: {
        combustion: { sesMots: 'une flamme qui mange l’air et chauffe', officiel: 'une combustion', lesDeux: 'une flamme qui mange l’air et chauffe, que les physiciens appellent une combustion' },
        co2: { sesMots: 'un gaz invisible qui part dans l’air', officiel: 'du dioxyde de carbone', lesDeux: 'un gaz invisible qui part dans l’air, que les physiciens appellent le dioxyde de carbone' },
        serre: { sesMots: 'une couverture invisible qui garde la chaleur', officiel: 'l’effet de serre', lesDeux: 'une couverture invisible qui garde la chaleur, que les physiciens appellent l’effet de serre' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une flamme qui mange l’air. Un gaz invisible. Une couverture invisible qui garde la chaleur. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : une combustion, le dioxyde de carbone, et l’effet de serre.',
        'Tu connais les mots officiels : la combustion, le dioxyde de carbone et l’effet de serre.',
      ],
    },

    exercices: [
      Q('gaz-forme', 'appareils',
        [
          ['Rebecca fait brûler du bois dans le foyer. Quel gaz se forme et renforce l’effet de serre ?', 'Du dioxyde de carbone', 'La combustion du bois rejette du dioxyde de carbone.'],
          ['Le gaz de la cuisinière brûle. Quel gaz se forme et renforce l’effet de serre ?', 'Du dioxyde de carbone', 'La combustion du gaz rejette du dioxyde de carbone.'],
          ['Une voiture brûle de l’essence dans son moteur. Quel gaz se forme et renforce l’effet de serre ?', 'Du dioxyde de carbone', 'La combustion de l’essence rejette du dioxyde de carbone.'],
          ['Une bougie brûle sur la table. Quel gaz se forme et renforce l’effet de serre ?', 'Du dioxyde de carbone', 'La combustion de la cire rejette du dioxyde de carbone.'],
        ],
        (x) => x,
        ['Du dioxyde de carbone', 'Du dioxygène', 'De l’hélium'],
        'Une combustion rejette un gaz à effet de serre.'),
      {
        id: 'role-effet-serre',
        univers: 'dehors',
        // [sujet, bonne réponse, piège 1, piège 2, pourquoi]
        versions: [
          ['l’effet de serre naturel', 'Il garde une partie de la chaleur et rend la Terre agréable à vivre', 'Il refroidit la Terre', 'Il rend l’air irrespirable', 'Sans effet de serre naturel, la Terre serait beaucoup plus froide.'],
          ['l’effet de serre renforcé par les activités humaines', 'Il garde plus de chaleur et la Terre se réchauffe', 'Il refroidit la Terre', 'Il supprime les nuages', 'Plus de gaz à effet de serre dans l’air garde plus de chaleur.'],
          ['le dioxyde de carbone dans l’air', 'Il retient une partie de la chaleur de la Terre', 'Il refroidit la Terre', 'Il fabrique du dioxygène', 'Le dioxyde de carbone est un gaz à effet de serre.'],
        ],
        genere(c) {
          const [s, bonne, p1, p2, pourquoi] = c.alea.choisir(this.versions);
          return {
            enonce: 'Que fait ' + s + ' ?',
            reponse: O.choix(c.alea, bonne, [p1, p2]),
            aide: 'Pense à la couverture invisible qui garde la chaleur.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'co2-trajet',
        univers: 'dehors',
        // [g de CO₂ par km, distance en km]
        versions: [[120, 50], [120, 100], [100, 30], [150, 20], [100, 80], [120, 25]],
        genere(c) {
          const [g, d] = c.alea.choisir(this.versions);
          const total = g * d, kg = total / 1000;
          return {
            enonce: 'Dans cet exemple, une voiture rejette ' + g + ' g de CO₂ par kilomètre. Elle parcourt ' + d + ' km. Combien de kilogrammes de CO₂ rejette-t-elle ?',
            reponse: { type: 'nombre', valeur: kg },
            aide: 'Multiplie ' + g + ' par ' + d + ', puis divise par 1 000 pour passer des grammes aux kilogrammes.',
            aideParlee: 'Multiplie, puis divise par mille pour passer des grammes aux kilogrammes.',
            correction: [g + ' × ' + d + ' = ' + gr(total) + ' g.', gr(total) + ' ÷ 1 000 = ' + ecr(kg) + ' kg.'],
          };
        },
      },
      {
        id: 'bilan-village',
        univers: 'champetre',
        // [tonnes rejetées par an, tonnes absorbées par an]
        versions: [[50, 20], [40, 15], [60, 25], [30, 12], [45, 20]],
        genere(c) {
          const [r, a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple, un village rejette ' + r + ' tonnes de CO₂ par an. Sa forêt en absorbe ' + a + ' tonnes. Combien de tonnes restent dans l’air ?',
            reponse: { type: 'nombre', valeur: r - a },
            aide: 'Bilan : ce qui est rejeté, moins ce qui est absorbé.',
            correction: [r + ' − ' + a + ' = ' + (r - a) + ' tonnes.'],
          };
        },
      },
      Q('vrai-faux', 'famille',
        [
          ['Vrai ou faux ? Brûler du bois ou du gaz rejette du dioxyde de carbone.', 'Vrai', 'Toute combustion de ce genre rejette du dioxyde de carbone.'],
          ['Vrai ou faux ? Sans aucun effet de serre naturel, la Terre serait beaucoup plus froide.', 'Vrai', 'L’effet de serre naturel garde une partie de la chaleur.'],
          ['Vrai ou faux ? Le dioxyde de carbone est le seul gaz à effet de serre.', 'Faux', 'Il y en a d’autres, comme le méthane.'],
          ['Vrai ou faux ? Brûler du pétrole retire du dioxyde de carbone de l’air.', 'Faux', 'Brûler du pétrole en rejette.'],
          ['Vrai ou faux ? Les forêts peuvent absorber une partie du dioxyde de carbone.', 'Vrai', 'Les arbres prennent du dioxyde de carbone pour fabriquer leur matière.'],
        ],
        (x) => x,
        ['Vrai', 'Faux'],
        'Relis ce que tu sais de la combustion et de l’effet de serre.'),
    ],

    defi: {
      // [rejets transport (t), rejets chauffage (t), absorption par la forêt (t)]
      versions: [[30, 20, 35], [40, 30, 25], [20, 25, 10], [50, 10, 40]],
      genere(c) {
        const [t, ch, a] = c.alea.choisir(this.versions);
        const total = t + ch, reste = total - a, oui = a > total / 2;
        return {
          enonce: 'Dans cet exemple, un village rejette ' + t + ' tonnes de CO₂ par an avec ses transports et ' + ch + ' tonnes avec son chauffage. Sa forêt en absorbe ' + a + ' tonnes.',
          questions: [
            {
              texte: 'Question 1. Combien de tonnes de CO₂ le village rejette-t-il en tout par an ?',
              reponse: { type: 'nombre', valeur: total },
              aide: 'Additionne les deux rejets.',
              correction: [t + ' + ' + ch + ' = ' + total + ' tonnes.'],
            },
            {
              texte: 'Question 2. Combien de tonnes restent dans l’air chaque année ?',
              reponse: { type: 'nombre', valeur: reste },
              aide: 'Retire ce que la forêt absorbe.',
              correction: [total + ' − ' + a + ' = ' + reste + ' tonnes.'],
            },
            {
              texte: 'Question 3. La forêt absorbe-t-elle plus de la moitié de ce que le village rejette ?',
              reponse: O.choix(c.alea, oui ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Calcule la moitié du total, puis compare.',
              correction: ['La moitié de ' + total + ' est ' + ecr(total / 2) + '.', a + (oui ? ' est plus grand que ' : ' n’est pas plus grand que ') + ecr(total / 2) + '.', 'Réponse : ' + (oui ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Propose deux gestes du village pour limiter l’effet de serre renforcé. Explique pourquoi ils aident.',
              correction: ['Par exemple : se déplacer moins en voiture, ou planter des arbres.', 'Le premier rejette moins de dioxyde de carbone ; le second en absorbe davantage.'],
              grille: ['As-tu proposé deux gestes précis ?', 'As-tu dit qu’un geste réduit les rejets ou augmente l’absorption ?', 'As-tu relié ces gestes à l’effet de serre ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais d’où vient le dioxyde de carbone, et pourquoi trop de ce gaz réchauffe la Terre.',
    carte: ['gaz-forme', 'co2-trajet', 'bilan-village'],
    papierDuSoir: { exercices: ['co2-trajet', 'bilan-village'], defi: true },
    automatismes: [
      {
        id: 'g-en-kg',
        versions: [3000, 5000, 8000, 12000],
        genere(c) { const g = c.alea.choisir(this.versions); return { enonce: g + ' g = ? kg', reponse: { type: 'nombre', valeur: g / 1000 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, Eunice Foote a montré en 1856 que le gaz carbonique chauffe le plus au soleil.',
    prenoms: ['Rebecca', 'Rachel'],
  };
});
