/* Notion 5 du bloc SVT « Le corps humain et la santé » : sommeil, entraînement et limites. La préparation du match d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  /** Durée entre l'heure du coucher et celle du lever (le lever est le lendemain matin). */
  const duree = (coucher, lever) => (24 - coucher) + lever;

  return {
    id: 'hygiene-de-vie',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Sommeil, entraînement et limites',
    classe: 'cycle 4',
    univers: ['famille', 'danses', 'appareils'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : hygiène de vie, sommeil, pratique sportive raisonnée.',

    accroche: {
      texte: 'Aminata a un match de basket samedi. Vendredi soir, elle regarde des vidéos sur son téléphone jusqu’à une heure du matin. ' +
        'Samedi, elle se sent lourde, et elle a une crampe au mollet dès le début du match. Qu’aurait-elle pu faire autrement ?',
      image: { dessin: 'barres', barres: [{ nom: 'Dormi', parts: 6 }, { nom: 'Conseillé', parts: 9 }], description: 'Deux barres : Aminata a dormi 6 heures ; il est conseillé de dormir environ 9 heures à son âge.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Bien dormir', 'S’échauffer', 'S’entraîner peu à peu', 'Boire et manger équilibré', 'Récupérer'], description: 'Une chaîne de bons gestes : bien dormir, s’échauffer, s’entraîner peu à peu, boire et manger équilibré, récupérer.' },
      etapes: [
        'Pendant le sommeil, le corps récupère et le cerveau range ce qu’on a appris. Une adolescente a besoin de huit à dix heures de sommeil par nuit.',
        'La lumière des écrans, le soir, retarde l’endormissement.',
        'Avant l’effort, on s’échauffe : le cœur et les muscles se préparent doucement.',
        'On progresse en s’entraînant régulièrement, en augmentant l’effort peu à peu. Le corps a des limites : douleur, crampe, grande fatigue sont des signaux d’alerte.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un corps en forme, c’est un corps qui dort assez, mange équilibré et s’entraîne avec régularité. Ce sont ' + c.mot('habitudes') + '. ' +
        'Avec l’entraînement, le cœur devient plus efficace : au repos, il bat moins vite. ' +
        'L’astuce : écoute ton corps. Une douleur pendant l’effort, c’est un signal pour t’arrêter.',
    },

    vocabulaire: {
      termes: {
        habitudes: { sesMots: 'les bonnes habitudes', officiel: 'les règles d’hygiène de vie', lesDeux: 'les bonnes habitudes, que les scientifiques appellent les règles d’hygiène de vie' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les bonnes habitudes, ce sont dormir assez, bien manger, s’échauffer et s’entraîner peu à peu. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : les règles d’hygiène de vie. Et s’entraîner régulièrement, en augmentant peu à peu, c’est une pratique sportive raisonnée.',
        'Tu connais les mots officiels : une bonne hygiène de vie, avec assez de sommeil et une pratique sportive raisonnée, protège la santé.',
      ],
    },

    exercices: [
      {
        id: 'heures-de-sommeil',
        univers: 'famille',
        // [heure du coucher, heure du lever]
        versions: [[22, 7], [23, 7], [21, 6], [22, 6], [23, 8], [21, 7], [20, 6]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const d = duree(a, b);
          return {
            enonce: 'Rebecca se couche à ' + O.nb(a, 'heure') + ' et se lève à ' + O.nb(b, 'heure') + ' le lendemain. Combien d’heures a-t-elle dormi, si elle s’est endormie tout de suite ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'De ' + O.nb(a, 'heure') + ' à minuit : ' + O.nb(24 - a, 'heure') + '. Puis de minuit à ' + O.nb(b, 'heure') + '.',
            aideParlee: 'Compte les heures jusqu’à minuit, puis ajoute les heures après minuit.',
            correction: [(24 - a) + ' + ' + b + ' = ' + d + ' heures de sommeil.'],
          };
        },
      },
      {
        id: 'assez-dormi',
        univers: 'appareils',
        versions: [[1, 7], [23, 7], [22, 7], [0, 6], [21, 6], [2, 8]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const d = a > 12 ? duree(a, b) : b - a;
          const bonne = d >= 8 ? 'Oui' : 'Non';
          return {
            enonce: 'Aminata s’endort à ' + (a === 0 ? 'minuit' : a + ' heure' + (a > 1 ? 's' : '')) + ' et se réveille à ' + b + ' heures. A-t-elle dormi au moins 8 heures ?',
            reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
            aide: 'Compte les heures entre l’endormissement et le réveil.',
            correction: ['Elle a dormi ' + d + ' heures.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'bon-geste',
        univers: 'danses',
        versions: [['S’échauffer avant de danser.', 'Bon pour la santé'], ['Regarder son téléphone au lit jusqu’à très tard.', 'Mauvais pour la santé'], ['Continuer à courir malgré une forte douleur.', 'Mauvais pour la santé'], ['Boire de l’eau pendant l’effort.', 'Bon pour la santé'], ['Augmenter l’entraînement peu à peu.', 'Bon pour la santé']],
        genere(c) {
          const [geste, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Ce geste est-il bon ou mauvais pour la santé ? « ' + geste + ' »',
            reponse: O.choix(c.alea, bonne, ['Bon pour la santé', 'Mauvais pour la santé']),
            aide: 'Sommeil, échauffement, progression, écoute de la douleur.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'coeur-entraine',
        univers: 'famille',
        // [pouls au repos avant, après plusieurs mois d'entraînement]
        versions: [[80, 70], [75, 64], [78, 66], [72, 60], [85, 72], [70, 62]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Avant de s’entraîner, le pouls au repos de Moussa était de ' + a + ' battements par minute. Après plusieurs mois de course, il est de ' + b + '. De combien a-t-il baissé ?',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Calcule ' + a + ' − ' + b + '.',
            aideParlee: 'Fais la différence entre le pouls d’avant et celui d’après.',
            correction: [a + ' − ' + b + ' = ' + (a - b) + ' battements par minute de moins : son cœur est plus efficace.'],
          };
        },
      },
      {
        id: 'semaine',
        univers: 'appareils',
        // heures de sommeil sur cinq nuits
        versions: [[8, 7, 9, 6, 8], [9, 9, 8, 7, 9], [6, 7, 6, 8, 7], [10, 9, 8, 9, 9], [7, 7, 8, 7, 6]],
        genere(c) {
          const h = c.alea.choisir(this.versions);
          const t = h.reduce((a, x) => a + x, 0);
          return {
            enonce: 'Rachel note ses heures de sommeil pendant cinq nuits : ' + h.join(', ') + '. Combien d’heures a-t-elle dormi en tout ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Additionne les cinq nombres.',
            correction: [h.join(' + ') + ' = ' + t + ' heures.'],
          };
        },
      },
    ],

    defi: {
      // [coucher, lever] de cinq nuits, du lundi au vendredi
      versions: [[[22, 7], [23, 7], [1, 7], [22, 6], [23, 7]], [[21, 6], [22, 6], [0, 6], [23, 7], [22, 7]], [[23, 7], [0, 7], [23, 7], [22, 7], [2, 8]]],
      genere(c) {
        const nuits = c.alea.choisir(this.versions);
        const h = nuits.map(([a, b]) => (a > 12 ? duree(a, b) : b - a));
        const t = h.reduce((a, x) => a + x, 0);
        const court = Math.min(...h);
        return {
          enonce: 'Pendant la semaine du brevet blanc, Rachel note ses heures de coucher et de lever : ' + nuits.map(([a, b]) => a + ' h – ' + b + ' h').join(' ; ') + '.',
          questions: [
            {
              texte: 'Question 1. Combien d’heures a-t-elle dormi en tout, sur les cinq nuits ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Calcule la durée de chaque nuit, puis additionne.',
              correction: ['Durées : ' + h.join(', ') + ' heures.', 'En tout : ' + t + ' heures.'],
            },
            {
              texte: 'Question 2. Combien d’heures a duré sa nuit la plus courte ?',
              reponse: { type: 'nombre', valeur: court },
              aide: 'Cherche la plus petite des cinq durées.',
              correction: ['La nuit la plus courte a duré ' + court + ' heures.'],
            },
            {
              texte: 'Question 3. Donne-lui deux conseils pour mieux dormir avant une épreuve, et explique pourquoi le sommeil compte.',
              correction: ['Se coucher plus tôt et à heure régulière ; éviter les écrans le soir, dont la lumière retarde l’endormissement.', 'Pendant le sommeil, le corps récupère et le cerveau range ce qu’on a appris.'],
              grille: ['As-tu donné deux conseils précis ?', 'As-tu parlé des écrans ou de la régularité ?', 'As-tu expliqué à quoi sert le sommeil ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Dormir, s’échauffer, progresser peu à peu, écouter son corps : tu connais les bonnes habitudes.',
    carte: ['heures-de-sommeil', 'bon-geste', 'coeur-entraine'],
    papierDuSoir: { exercices: ['semaine', 'assez-dormi'], defi: true },
    automatismes: [
      {
        id: 'duree-de-nuit',
        versions: [[22, 7], [23, 7], [21, 6]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Coucher à ' + a + ' h, lever à ' + b + ' h : combien d’heures ?', reponse: { type: 'nombre', valeur: duree(a, b) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Une étude a suivi des peuples sans électricité, dont les Hadza de Tanzanie : ils dorment à peu près autant que beaucoup de gens aujourd’hui.',
    prenoms: ['Aminata', 'Rebecca', 'Moussa', 'Rachel'],
  };
});
