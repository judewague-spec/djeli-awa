/* Notion 1 du bloc de technologie « Concevoir et fabriquer » : tâches et planning. L’étagère de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const pl = (n, mot) => O.ecr(n) + ' ' + mot + (n < 2 ? '' : 's');
  // L’ordre des tâches du projet de l’étagère.
  const CHAINE = ['Écouter le besoin de Laure', 'Dessiner l’étagère', 'Acheter les planches', 'Scier les planches', 'Poncer les planches', 'Assembler l’étagère', 'Peindre l’étagère', 'Laisser sécher la peinture', 'Livrer l’étagère à Laure'];

  return {
    id: 'taches-planning',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'Tâches et planning',
    classe: '4e',
    univers: ['famille', 'maison-courses', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : organiser un projet, découper en tâches, ordre, durées, jalons.',

    accroche: {
      texte: 'Laure veut une étagère pour le salon. Rachel répond : « Je la fabrique avec Moussa. » Mais par quoi commencer ? Et combien de jours faut-il ? ' +
        'Rachel prend une feuille et écrit tout ce qu’il faut faire, dans l’ordre.',
      image: { dessin: 'chaine', etapes: ['Le besoin de Laure', 'La liste des travaux', 'Le calendrier des jours'], description: 'La feuille de Rachel : le besoin de Laure, la liste des travaux à faire, puis le calendrier des jours.' },
    },

    manipulation: {
      type: 'ranger',
      etapes: [
        'On écoute le besoin de Laure.',
        'On dessine l’étagère et on note les mesures.',
        'On achète les planches.',
        'On scie et on assemble les planches.',
        'On peint l’étagère.',
        'On livre l’étagère à Laure.',
      ],
      depart: [
        'On peint l’étagère.',
        'On achète les planches.',
        'On livre l’étagère à Laure.',
        'On écoute le besoin de Laure.',
        'On scie et on assemble les planches.',
        'On dessine l’étagère et on note les mesures.',
      ],
      consigne: 'Range les étapes de l’étagère de Laure dans le bon ordre, du besoin jusqu’à la livraison.',
    },

    decouverte: {
      texte: (c) => 'Regarde la feuille de Rachel. Chaque ligne, c’est ' + c.mot('tache') + '. ' +
        'Rachel place ensuite chaque travail sur les jours : c’est ' + c.mot('planning') + '. ' +
        'Elle entoure le jour où l’étagère doit être prête à peindre : c’est ' + c.mot('jalon') + '. ' +
        'L’astuce : on découpe le projet, on range les travaux dans l’ordre, puis on note les dates à tenir.',
    },

    vocabulaire: {
      termes: {
        tache: { sesMots: 'un petit travail du projet', officiel: 'une tâche', lesDeux: 'un petit travail du projet, que les techniciens appellent une tâche' },
        planning: { sesMots: 'le calendrier des travaux', officiel: 'le planning', lesDeux: 'le calendrier des travaux, que les techniciens appellent le planning' },
        jalon: { sesMots: 'une date importante à ne pas manquer', officiel: 'un jalon', lesDeux: 'une date importante à ne pas manquer, que les techniciens appellent un jalon' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un petit travail du projet, le calendrier des travaux, et une date importante à ne pas manquer. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : une tâche, le planning, un jalon. Une tâche est un petit travail du projet. ' +
          'Le planning est le calendrier des travaux. Un jalon est une date importante à ne pas manquer.',
        'Tu connais les mots officiels : une tâche, le planning et un jalon. Avec eux, tu peux organiser tout un projet.',
      ],
    },

    exercices: [
      O.qcm('tache-ou-jalon', 'maison-courses',
        [
          ['Poncer les planches', 'Une tâche', 'Poncer est un travail à faire : c’est une tâche.'],
          ['Le jeudi où l’étagère doit être livrée à Laure', 'Un jalon', 'C’est une date importante à ne pas manquer : c’est un jalon.'],
          ['Visser les équerres', 'Une tâche', 'Visser est un travail à faire : c’est une tâche.'],
          ['Le jour où toutes les planches doivent être coupées', 'Un jalon', 'C’est une date importante du projet, que l’on vérifie : c’est un jalon.'],
          ['Acheter les vis', 'Une tâche', 'Acheter est un travail à faire : c’est une tâche.'],
        ],
        (x) => '« ' + x + ' » Est-ce une tâche (un travail à faire) ou un jalon (une date à ne pas manquer) ?', ['Une tâche', 'Un jalon'],
        'Un travail à faire, ou une date à ne pas manquer ?'),
      {
        id: 'juste-avant',
        univers: 'famille',
        // [numéro de la tâche dans l’ordre du projet, en comptant à partir de 0]
        versions: [[2], [3], [4], [5], [6]],
        genere(c) {
          const [i] = c.alea.choisir(this.versions);
          const t = CHAINE[i];
          const bonne = CHAINE[i - 1];
          return {
            enonce: 'Voici l’ordre des tâches du projet : ' + CHAINE.map((x, k) => (k + 1) + '. ' + x).join(' ; ') + '. Quelle tâche faut-il finir juste avant « ' + t + ' » ?',
            reponse: O.choix(c.alea, bonne, [CHAINE[i + 1], CHAINE[i + 2]]),
            aide: 'Cherche la tâche qui porte le numéro juste avant.',
            correction: ['Dans l’ordre du projet, « ' + bonne + ' » vient juste avant « ' + t + ' ».', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'duree-totale',
        univers: 'maison-courses',
        // [heures pour scier, heures pour assembler, heures pour peindre]
        versions: [[2, 3, 1], [1, 2, 2], [3, 4, 2], [2, 2, 3], [1, 3, 1]],
        genere(c) {
          const [a, b, p] = c.alea.choisir(this.versions);
          const s = a + b + p;
          return {
            enonce: 'Rachel fait trois tâches l’une après l’autre : scier pendant ' + pl(a, 'heure') + ', assembler pendant ' + pl(b, 'heure') + ', puis peindre pendant ' + pl(p, 'heure') + '. Combien d’heures cela fait-il en tout ?',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Les tâches se suivent : additionne leurs durées.',
            correction: [a + ' + ' + b + ' + ' + p + ' = ' + s + ' heures.'],
          };
        },
      },
      {
        id: 'en-meme-temps',
        univers: 'appareils',
        // [heures pour poncer, heures pour percer les trous, heures pour assembler]
        versions: [[3, 1, 2], [2, 3, 1], [4, 2, 2], [1, 2, 3], [3, 2, 1]],
        genere(c) {
          const [a, b, s] = c.alea.choisir(this.versions);
          const m = Math.max(a, b);
          const t = m + s;
          return {
            enonce: 'Rachel ponce les planches pendant ' + pl(a, 'heure') + '. Au même moment, Moussa perce les trous des planches pendant ' + pl(b, 'heure') + '. ' +
              'Quand ils ont fini tous les deux, ils assemblent l’étagère ensemble pendant ' + pl(s, 'heure') + '. Combien d’heures dure le travail en tout ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Deux tâches faites en même temps : garde seulement la plus longue, puis additionne la suite.',
            correction: ['Les deux premières tâches se font en même temps : on garde la plus longue, ' + pl(m, 'heure') + '.', m + ' + ' + s + ' = ' + t + ' heures.'],
          };
        },
      },
      {
        id: 'heure-de-fin',
        univers: 'famille',
        // [heure de début, heures pour scier, heures pour assembler]
        versions: [[9, 2, 1], [8, 2, 3], [10, 1, 2], [14, 2, 2], [9, 3, 2]],
        genere(c) {
          const [d, a, b] = c.alea.choisir(this.versions);
          const f = d + a + b;
          return {
            enonce: 'Rachel commence à ' + d + ' h. Elle scie pendant ' + pl(a, 'heure') + ', puis elle assemble pendant ' + pl(b, 'heure') + ', sans pause. À quelle heure finit-elle ? Réponds par un nombre, par exemple 15 pour 15 h.',
            reponse: { type: 'nombre', valeur: f },
            aide: 'Ajoute les durées à l’heure de début.',
            correction: [d + ' + ' + a + ' + ' + b + ' = ' + f + '.', 'Elle finit à ' + f + ' h.'],
          };
        },
      },
    ],

    defi: {
      // [jours avant la livraison, jours pour dessiner, pour acheter, pour fabriquer, pour peindre et laisser sécher]
      versions: [[10, 2, 1, 3, 2], [7, 2, 1, 3, 2], [12, 3, 1, 4, 2], [9, 3, 1, 4, 3], [14, 3, 1, 5, 2]],
      genere(c) {
        const [d, a, b, f, e] = c.alea.choisir(this.versions);
        const t = a + b + f + e;
        const ecart = Math.abs(d - t);
        const dansLeDelai = t <= d;
        const jours = (n) => n + (n < 2 ? ' jour' : ' jours');
        return {
          enonce: 'Laure veut son étagère dans ' + pl(d, 'jour') + '. Rachel prévoit : dessiner pendant ' + pl(a, 'jour') + ', acheter pendant ' + pl(b, 'jour') + ', fabriquer pendant ' + pl(f, 'jour') +
            ', puis peindre et laisser sécher pendant ' + pl(e, 'jour') + '. Ces tâches se font l’une après l’autre.',
          questions: [
            {
              texte: 'Question 1. Combien de jours durent toutes les tâches ensemble ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Les tâches se suivent : additionne leurs durées.',
              correction: [a + ' + ' + b + ' + ' + f + ' + ' + e + ' = ' + t + ' jours.'],
            },
            {
              texte: 'Question 2. Quelle est la différence, en jours, entre la durée des travaux et le délai de Laure ?',
              reponse: { type: 'nombre', valeur: ecart },
              aide: 'Soustrais le plus petit nombre de jours au plus grand.',
              correction: [(dansLeDelai ? d + ' − ' + t : t + ' − ' + d) + ' = ' + jours(ecart) + '.'],
            },
            {
              texte: 'Question 3. Rachel peut-elle livrer l’étagère à temps ?',
              reponse: O.choix(c.alea, dansLeDelai ? 'Oui' : 'Non', [dansLeDelai ? 'Non' : 'Oui']),
              aide: 'Compare la durée des travaux au délai de Laure.',
              correction: ['Les travaux durent ' + jours(t) + ', et Laure attend ' + jours(d) + (dansLeDelai ? ' : c’est bon.' : ' : c’est trop long.'), 'Réponse : ' + (dansLeDelai ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Écris deux phrases pour Laure : où en est le planning, et un jalon que Rachel va vérifier.',
              correction: ['Une phrase dit si le planning tient dans le délai.', 'Une phrase cite une date à ne pas manquer, par exemple la fin de la peinture.'],
              grille: ['As-tu dit si le planning tient dans le délai ?', 'As-tu cité une date à vérifier, un jalon ?', 'Tes phrases sont-elles courtes et claires ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais découper un projet en travaux, les ranger dans l’ordre, et poser des dates à tenir.',
    carte: ['tache-ou-jalon', 'juste-avant', 'en-meme-temps'],
    papierDuSoir: { exercices: ['duree-totale', 'en-meme-temps', 'heure-de-fin'], defi: true },
    automatismes: [
      {
        id: 'additionner-durees',
        versions: [[2, 3], [1, 4], [3, 3], [2, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' h + ' + b + ' h = ? (en heures)', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Pologne, Karol Adamiecki a conçu un planning, le harmonogramme, proche du diagramme de Gantt.',
    prenoms: ['Laure', 'Rachel', 'Moussa'],
  };
});
