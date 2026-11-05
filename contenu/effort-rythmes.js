/* Notion 1 du bloc SVT « Le corps humain et la santé » : l'effort, le pouls et la respiration. Les escaliers de Rebecca.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const AUG = 'Elle augmente', DIM = 'Elle diminue', PAREIL = 'Elle ne change pas';

  return {
    id: 'effort-rythmes',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'L’effort : le pouls et la respiration',
    classe: 'cycle 4',
    univers: ['famille', 'danses', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : l’organisme pendant l’effort.',

    accroche: {
      texte: 'L’ascenseur est en panne ! Rebecca monte à pied jusqu’au cinquième étage, avec les courses. En haut, son cœur cogne dans sa poitrine, ' +
        'et elle souffle fort. Deux minutes plus tard, Rebecca est assise sur le canapé et tout se calme. Que s’est-il passé dans son corps ?',
      image: { dessin: 'courbe', points: [[0, 70], [2, 125], [4, 130], [6, 95], [8, 75]], axeX: 'temps, en minutes', axeY: 'battements par minute', description: 'Une courbe du pouls de Rebecca : environ 70 au repos, plus de 120 en montant, puis elle redescend vers 75.' },
    },

    manipulation: {
      type: 'pouls',
      duree: 15,
      consigne: 'Mesure ton propre pouls. Pose deux doigts à l’intérieur de ton poignet, sous le pouce, jusqu’à sentir les battements. ' +
        'Démarre le chronomètre, puis touche le grand bouton à chaque battement. Tu peux aussi compter de tête et écrire le nombre.',
    },

    decouverte: {
      texte: (c) => 'Le nombre de battements du cœur en une minute, c’est ' + c.mot('frequence') + '. Au repos, chez une adulte, il est souvent entre soixante et cent. ' +
        'Pendant l’effort, le cœur bat plus vite et on respire plus vite et plus fort. Après l’effort, tout redescend peu à peu : c’est la récupération. ' +
        'L’astuce : compte les battements pendant quinze secondes, puis multiplie par quatre.',
      image: { dessin: 'pouls', bpm: 72, description: 'Un cœur avec le nombre 72 : un pouls de 72 battements par minute.' },
    },

    vocabulaire: {
      termes: {
        frequence: { sesMots: 'le pouls par minute', officiel: 'la fréquence cardiaque', lesDeux: 'le pouls par minute, que les scientifiques appellent la fréquence cardiaque' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le pouls par minute, c’est le nombre de battements du cœur en une minute. Et on compte aussi les respirations par minute. ' +
          'Les scientifiques ont des mots pour ça : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la fréquence cardiaque, pour le nombre de battements du cœur par minute, et la fréquence respiratoire, pour le nombre de respirations par minute.',
        'Tu connais les mots officiels : pendant l’effort, la fréquence cardiaque et la fréquence respiratoire augmentent ; elles redescendent pendant la récupération.',
      ],
    },

    exercices: [
      {
        id: 'quinze-secondes',
        univers: 'famille',
        versions: [17, 18, 20, 22, 25, 28, 30, 33],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure, la maman de Rachel, compte ' + n + ' battements en 15 secondes. Quel est son pouls, en battements par minute ?',
            reponse: { type: 'nombre', valeur: n * 4 },
            aide: 'Une minute, c’est 4 fois 15 secondes : ' + n + ' × 4.',
            aideParlee: 'Une minute, c’est quatre fois quinze secondes : multiplie par quatre.',
            correction: [n + ' × 4 = ' + n * 4 + ' battements par minute.'],
          };
        },
      },
      {
        id: 'trente-secondes',
        univers: 'danses',
        versions: [40, 45, 52, 60, 64, 70, 75, 80],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Après une danse, Aminata compte ' + n + ' battements en 30 secondes. Quel est son pouls par minute ?',
            reponse: { type: 'nombre', valeur: n * 2 },
            aide: 'Une minute, c’est 2 fois 30 secondes.',
            correction: [n + ' × 2 = ' + n * 2 + ' battements par minute.'],
          };
        },
      },
      {
        id: 'augmentation',
        univers: 'dehors',
        versions: [[68, 120], [72, 140], [60, 110], [75, 150], [80, 135], [65, 125]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au repos, le pouls de Moussa est de ' + a + ' battements par minute. Après une course, il est de ' + b + '. De combien a-t-il augmenté ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Calcule ' + b + ' − ' + a + '.',
            aideParlee: 'Fais la différence entre le pouls après la course et le pouls au repos.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' battements par minute de plus.'],
          };
        },
      },
      {
        id: 'respirations',
        univers: 'dehors',
        versions: [[8, 30], [10, 30], [15, 30], [12, 30], [6, 15], [5, 15]],
        genere(c) {
          const [n, s] = c.alea.choisir(this.versions);
          const k = 60 / s;
          return {
            enonce: 'Rachel compte ses respirations : ' + n + ' en ' + s + ' secondes. Combien de respirations fait-elle par minute ?',
            reponse: { type: 'nombre', valeur: n * k },
            aide: 'Une minute, c’est ' + k + ' fois ' + s + ' secondes.',
            aideParlee: 'Cherche combien de fois la durée de comptage tient dans une minute, puis multiplie.',
            correction: [n + ' × ' + k + ' = ' + n * k + ' respirations par minute.'],
          };
        },
      },
      {
        id: 'que-devient',
        univers: 'danses',
        versions: [['Pendant l’effort, la fréquence cardiaque…', AUG], ['Pendant l’effort, la fréquence respiratoire…', AUG], ['Juste après l’effort, au repos, la fréquence cardiaque…', DIM], ['Au repos, assise depuis longtemps, la fréquence cardiaque…', PAREIL]],
        genere(c) {
          const [phrase, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Complète : « ' + phrase + ' »',
            reponse: O.choix(c.alea, bonne, [AUG, DIM, PAREIL]),
            aide: 'Effort : tout s’accélère. Récupération : tout redescend.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // pouls à 0, 2, 4, 6 et 8 minutes : repos, montée, montée, récupération, récupération
      versions: [[70, 125, 130, 95, 75], [65, 120, 140, 100, 70], [75, 130, 135, 90, 78], [60, 115, 125, 85, 65], [72, 135, 145, 105, 80], [68, 120, 128, 92, 70]],
      genere(c) {
        const v = c.alea.choisir(this.versions);
        const max = Math.max(...v);
        return {
          enonce: 'Rebecca note son pouls toutes les deux minutes : au repos, puis pendant qu’elle monte les escaliers (de la minute 0 à la minute 4), puis assise. ' +
            'Ses mesures : ' + v.join(', ') + ' battements par minute.',
          image: { dessin: 'courbe', points: v.map((y, i) => [2 * i, y]), axeX: 'temps, en minutes', axeY: 'battements par minute', description: 'La courbe du pouls de Rebecca : ' + v.join(', ') + ' battements par minute, toutes les deux minutes.' },
          questions: [
            {
              texte: 'Question 1. Quel est son pouls au repos, en battements par minute ?',
              reponse: { type: 'nombre', valeur: v[0] },
              aide: 'C’est la mesure de la minute 0.',
              correction: ['Au départ, au repos : ' + v[0] + ' battements par minute.'],
            },
            {
              texte: 'Question 2. De combien son pouls a-t-il augmenté, au plus, par rapport au repos ?',
              reponse: { type: 'nombre', valeur: max - v[0] },
              aide: 'Cherche la plus grande mesure, puis enlève le pouls au repos.',
              correction: ['La plus grande mesure est ' + max + '.', max + ' − ' + v[0] + ' = ' + (max - v[0]) + ' battements par minute.'],
            },
            {
              texte: 'Question 3. Décris l’évolution de son pouls pendant l’effort, puis après l’effort.',
              correction: ['Pendant l’effort, le pouls augmente : de ' + v[0] + ' à ' + max + ' battements par minute.', 'Après l’effort, il redescend peu à peu vers sa valeur de repos : c’est la récupération.'],
              grille: ['As-tu dit que le pouls augmente pendant l’effort, avec des valeurs ?', 'As-tu dit qu’il redescend après l’effort ?', 'As-tu employé le mot « récupération » ou une phrase qui l’explique ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais mesurer ton pouls et lire ce que ton cœur raconte pendant l’effort.',
    carte: ['quinze-secondes', 'augmentation', 'que-devient'],
    papierDuSoir: { exercices: ['trente-secondes', 'respirations'], defi: true },
    automatismes: [
      {
        id: 'fois-quatre',
        versions: [15, 18, 20, 25, 30],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' battements en 15 secondes : combien par minute ?', reponse: { type: 'nombre', valeur: n * 4 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux Jeux olympiques de Rome, en 1960, l’Éthiopien Abebe Bikila a gagné le marathon en courant pieds nus.',
    prenoms: ['Rebecca', 'Laure', 'Rachel', 'Aminata', 'Moussa'],
  };
});
