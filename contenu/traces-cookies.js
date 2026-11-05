/* Notion 5 du bloc de technologie « Le numérique et l'intelligence artificielle » : traces, cookies et géolocalisation. Les baskets de Rebecca.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const TRACE = 'Oui, cela laisse une trace', PAS = 'Non, cela ne laisse aucune trace en ligne';

  return {
    id: 'traces-cookies',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Traces, cookies et géolocalisation',
    classe: '4e',
    univers: ['commerce', 'appareils', 'dehors'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : traces numériques, cookies, géolocalisation.',

    accroche: {
      texte: 'Lundi, Rebecca regarde une paire de baskets sur un site. Mardi, elle lit les nouvelles sur un autre site, et ces baskets apparaissent dans une publicité. Mercredi aussi ! ' +
        'Comment ces sites savent-ils ce qu’elle a regardé ?',
      image: { dessin: 'chaine', etapes: ['Rebecca regarde des baskets', 'Un petit fichier s’enregistre', 'Une publicité les lui remontre'], description: 'Rebecca regarde des baskets ; un petit fichier s’enregistre sur son téléphone ; une publicité les lui remontre, plus tard, sur un autre site.' },
    },

    manipulation: {
      image: { dessin: 'facture', titre: 'Ce que tu laisses en passant', lignes: [['Une recherche', 'gardée'], ['Une page visitée', 'gardée'], ['Un « j’aime »', 'gardé'], ['Une position', 'gardée, si elle est permise']], description: 'Ce que tu laisses en passant : une recherche, une page visitée, un j’aime, et une position, quand tu l’as permis.' },
      etapes: [
        'Sur Internet, presque chaque geste laisse quelque chose derrière lui, comme des pas dans le sable.',
        'Un site peut déposer sur ton téléphone un tout petit fichier, qui se souvient de ta visite, et de tes réglages.',
        'Certaines applications demandent aussi à connaître ta position. Parfois, c’est utile, comme pour une carte. Parfois, non, comme pour un jeu de cartes.',
        'Tu peux refuser ces petits fichiers publicitaires, et interdire la position aux applications qui n’en ont pas besoin.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ce que tu laisses en ligne, ce sont ' + c.mot('traces') + '. Les sites en gardent une partie dans ' + c.mot('cookies') + '. ' +
        'Et ton téléphone peut donner ' + c.mot('geolocalisation') + '. ' +
        'L’astuce : à chaque question, demande-toi si tu as vraiment besoin de dire oui.',
    },

    vocabulaire: {
      termes: {
        traces: { sesMots: 'des pas dans le sable', officiel: 'des traces numériques', lesDeux: 'des pas dans le sable, que l’on appelle des traces numériques' },
        cookies: { sesMots: 'de petits fichiers', officiel: 'des cookies', lesDeux: 'de petits fichiers, que l’on appelle des cookies' },
        geolocalisation: { sesMots: 'ta position', officiel: 'ta géolocalisation', lesDeux: 'ta position, que l’on appelle ta géolocalisation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les pas dans le sable, les petits fichiers, et ta position. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : des traces numériques, pour les pas dans le sable. Des cookies, pour les petits fichiers. La géolocalisation, pour ta position.',
        'Tu connais les mots officiels : la trace numérique, le cookie et la géolocalisation.',
      ],
    },

    exercices: [
      Q('trace-ou-pas', 'commerce',
        [['Faire une recherche sur Internet', TRACE], ['Mettre un « j’aime » sous une vidéo', TRACE], ['Lire un livre en papier', PAS], ['Publier une photo', TRACE], ['Marcher sans téléphone', PAS]],
        (x) => x + ' : cela laisse-t-il une trace ?', [TRACE, PAS],
        'Le geste se fait-il sur un appareil relié à Internet ?',
        'Un geste en ligne laisse une trace. Un geste sans appareil connecté n’en laisse pas en ligne.'),
      Q('position-utile', 'dehors',
        [['Une application de carte, pour trouver ton chemin', 'Oui, elle en a besoin'], ['Une application de jeu de mots', 'Non, elle n’en a pas besoin'], ['Une lampe de poche', 'Non, elle n’en a pas besoin'], ['Une application de météo locale', 'Oui, elle en a besoin']],
        (x) => x + ' : a-t-elle besoin de ta position ?', ['Oui, elle en a besoin', 'Non, elle n’en a pas besoin'],
        'Ta position lui sert-elle à ce qu’elle fait ?',
        'Une carte ou la météo locale s’en servent vraiment. Un jeu de mots ou une lampe n’en ont aucun besoin.'),
      Q('bon-reflexe', 'appareils',
        [['Un site te propose « tout accepter » ou « tout refuser » pour ses cookies publicitaires.', 'Refuser ce qui n’est pas nécessaire'], ['Une application te demande l’accès à ta position, sans raison.', 'Refuser ce qui n’est pas nécessaire']],
        (x) => x + ' Que faire ?', ['Refuser ce qui n’est pas nécessaire', 'Accepter pour aller plus vite', 'Donner une fausse adresse à tout le monde'],
        'Tu n’as pas à dire oui à tout.',
        'Tu peux refuser ce qui ne sert pas : refuser doit être aussi simple qu’accepter.'),
      {
        id: 'traces-par-semaine',
        univers: 'appareils',
        // [recherches par jour, jours]
        versions: [[12, 7], [8, 7], [15, 7], [20, 5], [25, 4], [30, 7]],
        genere(c) {
          const [r, j] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa fait ' + r + ' recherches par jour sur Internet, pendant ' + j + ' jours. Combien de traces laissent ces recherches ?',
            reponse: { type: 'nombre', valeur: r * j },
            aide: 'Calcule ' + r + ' × ' + j + '.',
            aideParlee: 'Multiplie les recherches d’un jour par le nombre de jours.',
            correction: [r + ' × ' + j + ' = ' + r * j + ' traces.'],
          };
        },
      },
      {
        id: 'pourcentage-de-cookies',
        univers: 'commerce',
        // [cookies déposés, cookies publicitaires]
        versions: [[20, 5], [40, 10], [50, 20], [25, 5], [10, 7], [80, 20]],
        genere(c) {
          const [t, p] = c.alea.choisir(this.versions);
          const q = (p / t) * 100;
          return {
            enonce: 'Un site dépose ' + t + ' cookies. ' + p + ' d’entre eux servent à la publicité. Quel est le pourcentage de cookies publicitaires ?',
            reponse: { type: 'nombre', valeur: q },
            aide: 'Calcule ' + p + ' ÷ ' + t + ' × 100.',
            aideParlee: 'Divise les cookies publicitaires par le total, puis multiplie par cent.',
            correction: [p + ' ÷ ' + t + ' × 100 = ' + q + ' %.'],
          };
        },
      },
    ],

    defi: {
      // [applications, applications qui demandent la position, applications qui en ont besoin]
      versions: [[20, 8, 2], [15, 6, 3], [30, 12, 4], [25, 10, 3]],
      genere(c) {
        const [a, d, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : sur le téléphone de Rebecca, il y a ' + a + ' applications. ' + d + ' demandent sa position. Seules ' + b + ' en ont vraiment besoin : la carte, et la météo locale par exemple.',
          questions: [
            {
              texte: 'Question 1. Combien d’applications demandent sa position sans en avoir besoin ?',
              reponse: { type: 'nombre', valeur: d - b },
              aide: 'Enlève celles qui en ont besoin à celles qui la demandent.',
              correction: [d + ' − ' + b + ' = ' + (d - b) + ' applications.'],
            },
            {
              texte: 'Question 2. Quel pourcentage des applications demande sa position ?',
              reponse: { type: 'nombre', valeur: (d / a) * 100 },
              aide: 'Divise celles qui la demandent par le total, puis multiplie par cent.',
              correction: [d + ' ÷ ' + a + ' × 100 = ' + (d / a) * 100 + ' %.'],
            },
            {
              texte: 'Question 3. Explique pourquoi elle a intérêt à limiter ces accès, et comment faire.',
              correction: ['La position révèle où elle vit, où elle va, et à quelles heures : ce sont des données personnelles.', 'Dans les réglages, elle peut retirer la position aux applications qui n’en ont pas besoin.'],
              grille: ['As-tu dit que la position est une donnée personnelle ?', 'As-tu dit ce qu’elle peut révéler ?', 'As-tu parlé des réglages ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Traces, cookies, position : tu sais ce que tu laisses derrière toi, et comment choisir.',
    carte: ['trace-ou-pas', 'position-utile', 'bon-reflexe'],
    papierDuSoir: { exercices: ['traces-par-semaine', 'pourcentage-de-cookies'], defi: true },
    automatismes: [
      {
        id: 'pourcentage-rapide',
        versions: [[5, 10], [2, 10], [10, 20], [5, 20]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' sur ' + b + ', en pourcentage = ?', reponse: { type: 'nombre', valeur: (a / b) * 100 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Prague, en Tchéquie, l’agence européenne EUSPA gère la fourniture des services de navigation Galileo.',
    prenoms: ['Rebecca', 'Moussa'],
  };
});
