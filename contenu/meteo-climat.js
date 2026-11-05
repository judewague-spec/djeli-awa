/* Notion 1 du bloc SVT « Planète Terre, environnement, action humaine » : météo et climat. Le cahier de pluie de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ecr = O.ecr;
  const somme = (l) => l.reduce((a, b) => a + b, 0);
  const MOIS = ['Janvier', 'Avril', 'Juillet'];

  return {
    id: 'meteo-climat',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Météo et climat',
    classe: 'cycle 4',
    univers: ['champetre', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : différence entre météo et climat, lecture de températures et de précipitations.',

    accroche: {
      texte: 'Rachel regarde le potager. Hier, il a beaucoup plu. Ce matin, le ciel est clair. ' +
        'Clarisse, elle, tient un cahier de pluie depuis très longtemps. Elle sait ce qui tombe d’habitude, mois après mois.',
      image: { dessin: 'tableur', colonnes: ['Jour', 'Hier', 'Ce matin'], lignes: [['Pluie (mm)', 12, 0]], description: 'Un tableau. Hier, 12 millimètres de pluie. Ce matin, aucune pluie.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Pluie de janvier', 'An 1', 'An 2', 'An 3', 'An 4', 'An 5'], lignes: [['En mm', 40, 60, 50, 30, 70]], description: 'Un tableau. La pluie de janvier, cinq années de suite : 40, 60, 50, 30, puis 70 millimètres.' },
      etapes: [
        'Rachel note la pluie tombée dans le potager en janvier, année après année.',
        'Une année, il pleut peu. Une autre, il pleut beaucoup. Un seul mois ne dit pas ce qui arrive d’habitude.',
        'Alors on additionne toutes les pluies notées, puis on divise par le nombre d’années. C’est la moyenne.',
        'Ici, la moyenne vaut 50 millimètres : c’est la pluie habituelle de janvier.',
        'Pour être sûr de soi, les scientifiques calculent cette moyenne sur au moins trente ans.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde ce qu’on observe un jour précis, en un lieu : c’est ' + c.mot('meteo') + '. Cela change vite, d’un jour à l’autre. ' +
        'Regarde ce qu’on mesure pendant au moins trente ans, en un même lieu : c’est ' + c.mot('climat') + '. ' +
        'Pour le trouver, on calcule des moyennes de températures et de pluies. L’astuce : un jour, c’est un détail ; trente ans, c’est une habitude.',
    },

    vocabulaire: {
      termes: {
        meteo: { sesMots: 'le temps d’un jour', officiel: 'la météo', lesDeux: 'le temps d’un jour, que l’on appelle la météo' },
        climat: { sesMots: 'le temps habituel d’un lieu', officiel: 'le climat', lesDeux: 'le temps habituel d’un lieu, que l’on appelle le climat' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le temps d’un jour, et le temps habituel d’un lieu. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la météo, pour le temps d’un jour. Le temps habituel d’un lieu s’appelle le climat.',
        'Tu connais les mots officiels : la météo, le climat, et la moyenne, qui sert à calculer le climat.',
      ],
    },

    exercices: [
      O.qcm('meteo-ou-climat', 'champetre',
        [
          ['Demain, un gros orage va passer sur le village.', 'La météo', 'Un orage de demain est un temps d’un seul jour : c’est la météo.'],
          ['Dans cette région, les étés sont chauds et secs, année après année.', 'Le climat', 'Un temps habituel, observé pendant des années, c’est le climat.'],
          ['Ce matin, il y a du brouillard dans le champ.', 'La météo', 'Le brouillard de ce matin ne dure qu’un moment : c’est la météo.'],
          ['Dans ce pays, il pleut surtout en été, d’après trente ans de mesures.', 'Le climat', 'Trente ans de mesures donnent le temps habituel : c’est le climat.'],
        ],
        (x) => x + ' Est-ce la météo ou le climat ?', ['La météo', 'Le climat'],
        'Un seul jour, c’est la météo. Des dizaines d’années, c’est le climat.'),
      O.qcm('vrai-ou-faux', 'dehors',
        [
          ['Le climat d’un lieu se décide avec la pluie d’un seul mois.', 'Faux', 'Un seul mois ne suffit pas : le climat se calcule sur au moins trente ans.'],
          ['Pour connaître le climat, on mesure pendant au moins trente ans.', 'Vrai', 'C’est la durée choisie par les scientifiques pour que les moyennes soient fiables.'],
          ['La météo peut changer d’un jour à l’autre.', 'Vrai', 'La météo est le temps d’un moment précis : elle change vite.'],
          ['Un hiver très froid prouve à lui seul que le climat a changé.', 'Faux', 'Un hiver froid est de la météo : le climat se juge sur de longues années.'],
        ],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Pense à la durée : un moment, c’est la météo ; de longues années, c’est le climat.'),
      {
        id: 'moyenne-temperature',
        univers: 'champetre',
        // cinq températures de midi, en °C
        versions: [[18, 25, 22, 19, 26], [30, 28, 32, 35, 25], [12, 15, 9, 14, 10], [21, 23, 19, 24, 18], [27, 31, 29, 33, 30]],
        genere(c) {
          const t = c.alea.choisir(this.versions);
          const s = somme(t), m = s / t.length;
          return {
            enonce: 'Rachel note la température de midi cinq jours de suite : ' + t.join(' °C, ') + ' °C. Quelle est la moyenne de ces températures, en °C ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Additionne les cinq températures, puis divise par 5.',
            correction: [t.join(' + ') + ' = ' + s + '.', s + ' ÷ 5 = ' + ecr(m) + ' °C.'],
          };
        },
      },
      {
        id: 'ecart-pluie',
        univers: 'champetre',
        // [pluie habituelle d'avril (mm), pluie de cette année (mm)]
        versions: [[45, 60], [30, 55], [60, 90], [80, 110], [50, 75]],
        genere(c) {
          const [h, a] = c.alea.choisir(this.versions);
          return {
            enonce: 'En avril, il tombe d’habitude ' + h + ' mm de pluie dans le champ de Clarisse. Cette année, il est tombé ' + a + ' mm. Combien de millimètres de plus que d’habitude ?',
            reponse: { type: 'nombre', valeur: a - h },
            aide: 'Enlève la pluie habituelle à la pluie de cette année.',
            correction: [a + ' − ' + h + ' = ' + (a - h) + ' mm de plus que d’habitude.'],
          };
        },
      },
      {
        id: 'mois-sec',
        univers: 'dehors',
        // pluie moyenne de janvier, d'avril et de juillet (mm)
        versions: [[60, 20, 5], [10, 40, 80], [45, 15, 70], [25, 60, 70], [50, 12, 35], [70, 45, 10]],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          const mini = Math.min(...p), juste = MOIS[p.indexOf(mini)];
          return {
            enonce: 'Voici la pluie moyenne de trois mois dans un village : janvier, ' + p[0] + ' mm ; avril, ' + p[1] + ' mm ; juillet, ' + p[2] + ' mm. Quel mois est le plus sec ?',
            reponse: O.choix(c.alea, juste, MOIS),
            aide: 'Le mois le plus sec est celui où il pleut le moins.',
            correction: ['Le plus petit nombre est ' + mini + ' mm, en ' + juste.toLowerCase() + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [pluie de mars sur cinq ans (mm), pluie de mars cette année (mm)]
      versions: [[[40, 60, 50, 30, 70], 35], [[20, 35, 25, 30, 40], 36], [[80, 60, 70, 90, 100], 95], [[10, 20, 15, 5, 25], 8]],
      genere(c) {
        const [p, z] = c.alea.choisir(this.versions);
        const m = somme(p) / p.length, sec = z < m;
        return {
          enonce: 'Clarisse note la pluie tombée en mars dans son champ, cinq ans de suite : ' + p.join(' mm, ') + ' mm. Cette année, en mars, il est tombé ' + z + ' mm.',
          image: { dessin: 'batons', valeurs: p.map((x, i) => ['An ' + (i + 1), x]), axe: 'pluie de mars, en millimètres', description: 'Un diagramme en bâtons de la pluie de mars sur cinq ans : ' + p.join(', ') + ' millimètres.' },
          questions: [
            {
              texte: 'Question 1. Calcule la moyenne de pluie de mars sur ces cinq ans, en mm.',
              reponse: { type: 'nombre', valeur: m },
              aide: 'Additionne les cinq pluies, puis divise par 5.',
              correction: [p.join(' + ') + ' = ' + somme(p) + '.', somme(p) + ' ÷ 5 = ' + ecr(m) + ' mm.'],
            },
            {
              texte: 'Question 2. Cette année, mars est-il plus sec que la moyenne ?',
              reponse: O.choix(c.alea, sec ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare la pluie de cette année avec la moyenne de la question 1.',
              correction: [z + ' mm, contre une moyenne de ' + ecr(m) + ' mm : ' + (sec ? 'c’est moins, donc plus sec.' : 'c’est plus, donc plus pluvieux.'), 'Réponse : ' + (sec ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 3. Clarisse dit : « Mars a été ' + (sec ? 'plus sec' : 'plus pluvieux') + ' cette année, donc le climat de la région a changé. » A-t-elle raison ? Explique en deux phrases.',
              correction: ['Non : une seule année ne dit pas le climat. Elle donne seulement la météo d’un mois.', 'Pour parler de climat, il faut des mesures sur au moins trente ans.'],
              grille: ['As-tu dit qu’une seule année ne suffit pas pour parler de climat ?', 'As-tu cité une durée d’au moins trente ans ?', 'As-tu distingué le temps d’une année (météo) et le temps habituel (climat) ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un jour, c’est la météo. Trente ans, c’est le climat. Tu ne les mélanges plus.',
    carte: ['meteo-ou-climat', 'vrai-ou-faux', 'moyenne-temperature'],
    papierDuSoir: { exercices: ['moyenne-temperature', 'ecart-pluie'], defi: true },
    automatismes: [
      {
        id: 'moyenne-de-deux',
        versions: [[20, 30], [10, 18], [24, 26], [12, 16], [30, 40], [6, 14]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Moyenne de ' + a + ' °C et de ' + b + ' °C ?', reponse: { type: 'nombre', valeur: (a + b) / 2 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Libye, à El Azizia, un record mondial de chaleur de 1922 a été annulé en 2012 : la mesure était douteuse.',
    prenoms: ['Rachel', 'Clarisse'],
  };
});
