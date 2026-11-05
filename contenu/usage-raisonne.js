/* Notion 8 du bloc de technologie « Le numérique et l'intelligence artificielle » : un usage raisonné du numérique. Les soirées de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'usage-raisonne',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Un usage raisonné du numérique',
    classe: '4e',
    univers: ['famille', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : usage raisonné des outils numériques, santé, attention.',

    accroche: {
      texte: 'Un soir, Rachel regarde « une dernière vidéo ». Puis une autre. Quand elle lève les yeux, il est minuit, et le matin, elle est épuisée en cours. ' +
        'Laure lui dit : « Le téléphone n’est pas ton ennemi. Mais qui commande : toi, ou lui ? »',
      image: { dessin: 'barres', barres: [{ nom: 'Dormir', parts: 9 }, { nom: 'Cours', parts: 7 }, { nom: 'Écrans', parts: 4 }], description: 'Trois barres pour une journée, chaque part vaut une heure : dormir, neuf heures ; les cours, sept heures ; les écrans, quatre heures.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Couper les alertes inutiles', 'Pas d’écran avant de dormir', 'Le téléphone hors de la chambre', 'Des moments sans écran'], description: 'Quatre bons réglages : couper les alertes inutiles ; pas d’écran avant de dormir ; le téléphone hors de la chambre ; des moments sans écran.' },
      etapes: [
        'Les applications sont conçues pour te garder le plus longtemps possible : vidéos sans fin, petites alertes, séries de jours.',
        'Trop d’écran le soir retarde le sommeil. Et le manque de sommeil pèse sur l’attention en cours.',
        'Le téléphone peut compter ton temps d’écran : regarde ce chiffre, sans te juger.',
        'Tu peux choisir : couper les alertes, poser le téléphone, garder des moments pour dormir, bouger et voir tes amis.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le numérique est utile, si c’est toi qui décides. C’est ' + c.mot('usage') + '. ' +
        'Les petits signaux qui t’appellent, ce sont ' + c.mot('notifications') + ' : tu peux les couper. ' +
        'L’astuce : pose-toi une question. Est-ce que j’ai choisi d’ouvrir cette application ?',
    },

    vocabulaire: {
      termes: {
        usage: { sesMots: 'une bonne habitude', officiel: 'un usage raisonné', lesDeux: 'une bonne habitude, que l’on appelle un usage raisonné' },
        notifications: { sesMots: 'les petites alertes', officiel: 'les notifications', lesDeux: 'les petites alertes, que l’on appelle les notifications' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la bonne habitude, et les petites alertes. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un usage raisonné, pour la bonne habitude. Et les notifications, pour les petites alertes.',
        'Tu connais les mots officiels : l’usage raisonné, les notifications et le temps d’écran.',
      ],
    },

    exercices: [
      Q('bon-reglage', 'famille',
        [['Rachel a du mal à s’endormir.', 'Arrêter les écrans avant de dormir'], ['Moussa est coupé dans ses devoirs par des alertes.', 'Couper les notifications'], ['Aminata ne sait pas combien de temps elle passe sur son téléphone.', 'Regarder son temps d’écran']],
        (x) => x + ' Quel réglage l’aide le plus ?', ['Arrêter les écrans avant de dormir', 'Couper les notifications', 'Regarder son temps d’écran'],
        'Cherche ce qui répond exactement à son problème.',
        'Chaque geste répond à un problème : le sommeil, la concentration, ou la mesure du temps passé.'),
      Q('vrai-ou-faux', 'maison-courses',
        [['Certaines applications sont conçues pour retenir ton attention.', 'Vrai'], ['Le manque de sommeil peut gêner l’attention en cours.', 'Vrai'], ['Tu ne peux pas couper les notifications.', 'Faux'], ['Une vidéo de plus ne peut jamais coûter une nuit.', 'Faux']],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Qui commande : toi, ou l’application ?',
        'Les applications cherchent ton attention, et le sommeil compte pour apprendre. Les réglages te laissent la main.'),
      Q('choisi-ou-pas', 'famille',
        [['Tu regardes un tutoriel, pour apprendre une coiffure.', 'C’est un choix'], ['Une vidéo se lance seule après la précédente, et tu continues sans y penser.', 'C’est l’application qui décide'], ['Tu appelles Laure, pour prendre de ses nouvelles.', 'C’est un choix'], ['Une alerte te fait ouvrir une application, puis tu y restes.', 'C’est l’application qui décide']],
        (x) => x + ' Qui décide ?', ['C’est un choix', 'C’est l’application qui décide'],
        'As-tu décidé de le faire, ou cela t’a-t-il entraînée ?',
        'L’écran n’est pas mauvais en soi : ce qui compte, c’est si tu l’as choisi, ou s’il t’a entraînée.'),
      {
        id: 'heures-par-semaine',
        univers: 'maison-courses',
        // [heures par jour, jours]
        versions: [[3, 7], [4, 7], [2, 5], [5, 7], [3, 5], [6, 7]],
        genere(c) {
          const [h, j] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa passe ' + h + ' heures par jour sur son téléphone, pendant ' + j + ' jours. Combien d’heures cela fait-il ?',
            reponse: { type: 'nombre', valeur: h * j },
            aide: 'Calcule ' + h + ' × ' + j + '.',
            aideParlee: 'Multiplie les heures d’un jour par le nombre de jours.',
            correction: [h + ' × ' + j + ' = ' + h * j + ' heures.'],
          };
        },
      },
      {
        id: 'part-de-la-journee',
        univers: 'famille',
        // heures d'écran sur 24
        versions: [6, 12, 3, 8, 4, 2],
        genere(c) {
          const h = c.alea.choisir(this.versions);
          const f = 24 / h;
          return {
            enonce: 'Aminata passe ' + h + ' heures par jour devant les écrans. Une journée dure 24 heures. Combien de fois ce temps entre-t-il dans une journée ?',
            reponse: { type: 'nombre', valeur: f },
            aide: 'Calcule 24 ÷ ' + h + '.',
            aideParlee: 'Divise la durée d’une journée par le temps d’écran.',
            correction: ['24 ÷ ' + h + ' = ' + f + ' fois.'],
          };
        },
      },
    ],

    defi: {
      // [heures d'écran par jour avant, après, jours]
      versions: [[5, 3, 7], [6, 4, 7], [4, 2, 7], [6, 3, 5]],
      genere(c) {
        const [a, b, j] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : Rebecca passait ' + a + ' heures par jour devant les écrans. Après avoir coupé ses notifications et laissé son téléphone hors de sa chambre, elle y passe ' + b + ' heures par jour.',
          image: { dessin: 'barres', barres: [{ nom: 'Avant', parts: a }, { nom: 'Après', parts: b }], description: 'Deux barres, chaque part vaut une heure : le temps d’écran de Rebecca, avant et après.' },
          questions: [
            {
              texte: 'Question 1. Combien d’heures gagne-t-elle par jour ?',
              reponse: { type: 'nombre', valeur: a - b },
              aide: 'Fais la différence entre avant et après.',
              correction: [a + ' − ' + b + ' = ' + (a - b) + ' heures.'],
            },
            {
              texte: 'Question 2. Combien d’heures gagne-t-elle en ' + j + ' jours ?',
              reponse: { type: 'nombre', valeur: (a - b) * j },
              aide: 'Multiplie ton résultat par le nombre de jours.',
              correction: [(a - b) + ' × ' + j + ' = ' + (a - b) * j + ' heures.'],
            },
            {
              texte: 'Question 3. Explique en quoi ces changements peuvent l’aider au collège, sans dire que les écrans sont mauvais.',
              correction: ['Couper les alertes et éloigner le téléphone laisse plus de temps pour dormir et travailler, et elle est moins interrompue.', 'Les écrans restent utiles : ce qui compte, c’est qu’elle choisisse quand elle s’en sert.'],
              grille: ['As-tu parlé du sommeil ou de l’attention ?', 'As-tu cité les gestes qu’elle a faits ?', 'As-tu dit que les écrans restent utiles, si on choisit ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le téléphone est un bel outil, et c’est toi qui commandes.',
    carte: ['bon-reglage', 'vrai-ou-faux', 'choisi-ou-pas'],
    papierDuSoir: { exercices: ['heures-par-semaine', 'part-de-la-journee'], defi: true },
    automatismes: [
      {
        id: 'fois-sept',
        versions: [2, 3, 4, 5],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' heures par jour, pendant 7 jours = ?', reponse: { type: 'nombre', valeur: n * 7 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Chine, une règle de 2019 a limité strictement le temps de jeu en ligne des moins de 18 ans.',
    prenoms: ['Rachel', 'Laure', 'Moussa', 'Aminata', 'Rebecca'],
  };
});
