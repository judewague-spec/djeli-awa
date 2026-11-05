/* Notion 25 du bloc « Mesures, géométrie et espace » : les triangles semblables. La tente d'Aminata et sa réplique pour les enfants.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const OUI = 'Oui, ils sont semblables', NON = 'Non, ils ne sont pas semblables';

  return {
    id: 'triangles-semblables',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Les triangles semblables',
    classe: '3e',
    univers: ['commerce', 'famille'],

    accroche: {
      texte: 'Aminata a une bâche en triangle. Elle en coud une petite, pour les enfants. Ce n’est pas la même taille, mais c’est bien la même forme. ' +
        'Rachel pose la petite sur la grande : les trois coins s’ouvrent pareil. Mêmes angles, côtés proportionnels. Ce ne sont pas des jumeaux : ce sont un parent et son enfant.',
      image: { dessin: 'figure', points: { A: [0, 0], B: [4, 0], C: [0, 3], D: [6, 0], E: [8, 0], F: [6, 1.5] }, segments: [['A', 'B', '4 m'], ['A', 'C', '3 m'], ['B', 'C', '5 m'], ['D', 'E', '2 m'], ['D', 'F', '1,5 m'], ['E', 'F', '2,5 m']], droits: [['B', 'A', 'C'], ['E', 'D', 'F']], description: 'Deux triangles rectangles de même forme. Le grand A B C a des côtés de 4, 3 et 5 mètres. Le petit D E F a des côtés de 2, 1,5 et 2,5 mètres. Chaque côté du petit vaut la moitié du côté qui lui correspond. Leurs angles sont égaux.' },
    },

    manipulation: {
      etapes: [
        'Trace un triangle, et mesure ses trois angles.',
        'Trace un autre triangle, plus petit, avec les mêmes angles.',
        'Divise ses côtés un par un par les côtés correspondants du premier : tu trouves toujours le même nombre.',
        'Deux angles égaux suffisent, car le troisième se déduit de la somme des angles.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un triangle et sa copie agrandie sont ' + c.mot('semblables') + '. Pour le prouver, il suffit de montrer deux angles égaux, ou trois côtés proportionnels. ' +
        'On compare toujours les côtés ' + c.mot('homologues') + '. L’astuce : range les côtés du plus petit au plus grand, dans chaque triangle, pour les comparer.',
    },

    vocabulaire: {
      termes: {
        semblables: { sesMots: 'de même forme', officiel: 'semblables', lesDeux: 'de même forme, donc semblables' },
        homologues: { sesMots: 'qui se correspondent', officiel: 'homologues', lesDeux: 'qui se correspondent, donc homologues' },
      },
      textes: [
        'Pour l’instant, garde tes mots : de même forme, et les côtés qui se correspondent. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : semblables, pour des triangles de même forme. Et les côtés qui se correspondent sont homologues.',
        'Tu connais les mots officiels : semblables, et homologues.',
      ],
    },

    exercices: [
      {
        id: 'cote-homologue',
        univers: 'commerce',
        // [côté du grand, côté homologue du petit, autre côté du grand]
        versions: [[4, 2, 3], [6, 2, 9], [10, 5, 7], [8, 4, 5], [12, 3, 8], [5, 2, 10]],
        genere(c) {
          const [g, p, a] = c.alea.choisir(this.versions);
          const r = r2((a * p) / g);
          return {
            enonce: 'Deux bâches en triangle sont semblables. Un côté de la grande mesure ' + g + ' m, et son homologue sur la petite ' + p + ' m. Un autre côté de la grande mesure ' + a + ' m. Combien mesure son homologue, en mètres ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Cherche le rapport entre les deux bâches, puis applique-le.',
            correction: ['Rapport : ' + p + ' ÷ ' + g + ' = ' + ecr(r2(p / g)) + '.', a + ' × ' + p + ' ÷ ' + g + ' = ' + ecr(r) + ' m.'],
          };
        },
      },
      {
        id: 'troisieme-angle',
        univers: 'famille',
        versions: [[50, 60], [40, 90], [30, 70], [45, 45], [80, 35], [25, 65]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Deux triangles sont semblables. Dans le premier, deux angles mesurent ' + a + '° et ' + b + '°. Combien mesure le troisième angle du second triangle, en degrés ?',
            reponse: { type: 'nombre', valeur: 180 - a - b },
            aide: 'Des triangles semblables ont les mêmes angles. Utilise la somme des angles.',
            correction: ['180 − ' + a + ' − ' + b + ' = ' + (180 - a - b) + '°.'],
          };
        },
      },
      {
        id: 'semblables-par-les-cotes',
        univers: 'commerce',
        // [a, b, c] et [a', b', c'], rangés
        versions: [[3, 4, 5, 6, 8, 10], [2, 3, 4, 4, 6, 8], [3, 4, 5, 6, 8, 11], [5, 6, 7, 10, 12, 15], [4, 6, 8, 2, 3, 4], [2, 5, 6, 4, 10, 13]],
        genere(c) {
          const [a, b, d, e, f, g] = c.alea.choisir(this.versions);
          const eg = a * f === b * e && b * g === d * f;
          const juste = eg ? OUI : NON;
          return {
            enonce: 'Un premier triangle a des côtés de ' + a + ', ' + b + ' et ' + d + ' cm. Un second a des côtés de ' + e + ', ' + f + ' et ' + g + ' cm. Sont-ils semblables ?',
            reponse: O.choix(c.alea, juste, [OUI, NON]),
            aide: 'Divise chaque côté du second par le côté correspondant du premier.',
            correction: [e + ' ÷ ' + a + ' = ' + ecr(r2(e / a)) + ', ' + f + ' ÷ ' + b + ' = ' + ecr(r2(f / b)) + ', ' + g + ' ÷ ' + d + ' = ' + ecr(r2(g / d)) + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'semblables-par-les-angles',
        univers: 'famille',
        // [a, b, a', b']
        versions: [[50, 60, 60, 70], [40, 90, 90, 50], [30, 70, 30, 90], [45, 45, 90, 45], [80, 35, 65, 80], [25, 65, 90, 30]],
        genere(c) {
          const [a, b, e, f] = c.alea.choisir(this.versions);
          const t1 = [a, b, 180 - a - b].sort((x, y) => x - y), t2 = [e, f, 180 - e - f].sort((x, y) => x - y);
          const eg = t1.join() === t2.join();
          const juste = eg ? OUI : NON;
          return {
            enonce: 'Le premier triangle a deux angles de ' + a + '° et ' + b + '°. Le second a deux angles de ' + e + '° et ' + f + '°. Sont-ils semblables ?',
            reponse: O.choix(c.alea, juste, [OUI, NON]),
            aide: 'Calcule le troisième angle de chacun, puis compare.',
            correction: ['Premier triangle : ' + t1.join('°, ') + '°.', 'Second triangle : ' + t2.join('°, ') + '°.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      Q('egaux-ou-semblables', 'commerce',
        [['Deux triangles ont les mêmes côtés.', 'Égaux, et donc aussi semblables'], ['Deux triangles ont les mêmes angles, mais pas les mêmes côtés.', 'Semblables, sans être égaux'], ['Un triangle est l’agrandissement d’un autre, de rapport 2.', 'Semblables, sans être égaux'], ['Deux triangles se superposent exactement.', 'Égaux, et donc aussi semblables']],
        (x) => x + ' Comment sont-ils ?', ['Égaux, et donc aussi semblables', 'Semblables, sans être égaux'],
        'Ont-ils la même taille, ou seulement la même forme ?',
        'Égaux : même forme et même taille. Semblables : même forme.'),
    ],

    defi: {
      // [AB, AC, BC, DE, k pour le petit] triangle petit = k × grand
      versions: [[4, 3, 5, 2], [8, 6, 10, 2], [15, 20, 25, 6], [4, 3, 5, 8]],
      genere(c) {
        const [ab, ac, bc, de] = c.alea.choisir(this.versions);
        const k = de / ab, df = ac * k, ef = bc * k;
        return {
          enonce: 'Les triangles ABC et DEF sont semblables, A correspond à D, B à E et C à F. On donne AB = ' + ab + ' m, AC = ' + ac + ' m, BC = ' + bc + ' m et DE = ' + de + ' m.',
          image: { dessin: 'figure', points: { A: [0, 0], B: [4, 0], C: [0, 3], D: [6, 0], E: [8, 0], F: [6, 1.5] }, segments: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['D', 'E'], ['D', 'F'], ['E', 'F']], description: 'Deux triangles de même forme, A B C et D E F. A B mesure ' + ab + ' mètres, A C ' + ac + ' mètres, B C ' + bc + ' mètres. D E mesure ' + de + ' mètres. Les sommets se correspondent dans cet ordre. Le dessin n’est pas à l’échelle.' },
          questions: [
            {
              texte: 'Question 1. Calculer le rapport DE/AB, en écriture décimale.',
              reponse: { type: 'nombre', valeur: k },
              aide: 'Divise DE par AB.',
              correction: [de + ' ÷ ' + ab + ' = ' + ecr(r2(k)) + '.'],
            },
            {
              texte: 'Question 2. Calculer DF, en mètres, arrondi au centième si besoin.',
              reponse: { type: 'nombre', valeur: r2(df) },
              aide: 'DF est l’homologue de AC.',
              correction: [ac + ' × ' + de + ' ÷ ' + ab + ' = ' + ecr(r2(df)) + ' m.'],
            },
            {
              texte: 'Question 3. Calculer EF, en mètres, arrondi au centième si besoin.',
              reponse: { type: 'nombre', valeur: r2(ef) },
              aide: 'EF est l’homologue de BC.',
              correction: [bc + ' × ' + de + ' ÷ ' + ab + ' = ' + ecr(r2(ef)) + ' m.'],
            },
            {
              texte: 'Question 4. Le triangle ABC est-il rectangle ? Peut-on en dire autant de DEF ? Justifier.',
              correction: ['BC² = ' + bc * bc + ' et AB² + AC² = ' + (ab * ab + ac * ac) + ' : l’égalité est vraie, donc ABC est rectangle en A.', 'Des triangles semblables ont les mêmes angles, donc DEF est rectangle en D.'],
              grille: ['As-tu vérifié avec la réciproque de Pythagore ?', 'As-tu utilisé les angles égaux pour DEF ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Même forme, autre taille : tu sais reconnaître un parent et son enfant.',
    carte: ['cote-homologue', 'troisieme-angle', 'egaux-ou-semblables'],
    papierDuSoir: { exercices: ['cote-homologue', 'semblables-par-les-cotes'], defi: true },
    automatismes: [
      {
        id: 'meme-rapport',
        versions: [[3, 6, 5], [2, 8, 3], [4, 12, 2], [5, 10, 7]],
        genere(c) { const [a, b, d] = c.alea.choisir(this.versions); return { enonce: a + ' devient ' + b + '. Avec le même multiplicateur, ' + d + ' devient ?', reponse: { type: 'nombre', valeur: (d * b) / a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Grèce, Hippocrate de Chios comparait déjà les aires de morceaux de cercle semblables, par les carrés de leurs bases.',
    prenoms: ['Aminata', 'Rachel'],
  };
});
