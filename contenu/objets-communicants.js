/* Notion du bloc de technologie « Concevoir et fabriquer » : les objets communicants. L'arrosage connecté d'Esther.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ROLES = ['Mesurer', 'Transporter les mesures', 'Afficher les mesures et permettre d’agir'];
  /** Un exercice à réponse numérique : f(version) rend { enonce, valeur, aide, correction }. */
  const N = (id, univers, versions, f) => ({
    id, univers, versions,
    genere(c) {
      const r = f(c.alea.choisir(this.versions));
      return { enonce: r.enonce, reponse: { type: 'nombre', valeur: r.valeur }, aide: r.aide, correction: r.correction };
    },
  });

  return {
    id: 'objets-communicants',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'Les objets communicants',
    classe: '3e',
    univers: ['appareils', 'maison-courses', 'champetre'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : objets communicants (capteur, réseau, application), données, sécurité, consommation, utilité.',

    accroche: {
      texte: 'Esther a un arrosage connecté. Dans son jardin, un petit capteur mesure l’humidité de la terre. Il envoie la mesure par radio. ' +
        'Sur le téléphone d’Esther, une application affiche : « La terre est sèche. » Esther appuie sur un bouton, et l’arrosage s’ouvre.',
      image: { dessin: 'chaine', etapes: ['Le capteur mesure l’humidité', 'Le réseau envoie la mesure', 'L’application affiche et commande'], description: 'Le capteur du jardin mesure l’humidité de la terre, le réseau envoie la mesure, et l’application du téléphone d’Esther affiche la mesure et commande l’arrosage.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Un capteur mesure', 'Le réseau transporte la mesure', 'L’application affiche et commande', 'On protège, on économise la pile, on vérifie l’utilité'], description: 'Un capteur mesure, le réseau transporte la mesure, l’application affiche et commande, et on pense à la protection, à la pile et à l’utilité.' },
      etapes: [
        'Dans le jardin d’Esther, un capteur mesure l’humidité de la terre.',
        'Il envoie la mesure par radio, vers la box de la maison. C’est le réseau.',
        'Une application sur le téléphone affiche la mesure. Esther peut ouvrir l’arrosage à distance.',
        'Mais une personne inconnue ne doit pas pouvoir ouvrir l’arrosage. Il faut un mot de passe solide.',
        'Le capteur marche sur pile. S’il envoie trop souvent, la pile se vide vite.',
        'Avant d’acheter, Esther se demande : est-ce vraiment utile pour mon jardin ?',
      ],
    },

    decouverte: {
      texte: (c) => 'L’arrosage d’Esther est ' + c.mot('objetcom') + '. ' +
        'Ce qui voyage dans le réseau, ce sont ' + c.mot('donnees') + ' : ici, l’humidité de la terre. ' +
        'L’astuce : un capteur mesure, le réseau transporte, l’application montre. Et on protège ce qui voyage.',
    },

    vocabulaire: {
      termes: {
        objetcom: { sesMots: 'un objet qui mesure et envoie ses mesures par radio', officiel: 'un objet communicant', lesDeux: 'un objet qui mesure et envoie ses mesures par radio, que les techniciens appellent un objet communicant' },
        donnees: { sesMots: 'des mesures', officiel: 'des données', lesDeux: 'des mesures, que les techniciens appellent des données' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un objet qui mesure et envoie ses mesures par radio, et les mesures qui voyagent. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : un objet communicant, pour l’objet qui envoie ses mesures ; des données, pour les mesures qui voyagent.',
        'Tu connais les mots officiels : un objet communicant, et les données qu’il envoie sur le réseau.',
      ],
    },

    exercices: [
      O.qcm('role-du-maillon', 'appareils',
        [['le capteur', 'Mesurer', 'Le capteur est le seul à mesurer, par exemple l’humidité de la terre.'],
          ['le réseau', 'Transporter les mesures', 'Le réseau fait voyager les mesures du capteur vers l’application.'],
          ['l’application', 'Afficher les mesures et permettre d’agir', 'L’application montre les mesures et permet d’envoyer une commande.'],
          ['le capteur de mouvement d’une alarme', 'Mesurer', 'Un capteur de mouvement mesure s’il y a du mouvement.'],
          ['l’application d’une montre connectée', 'Afficher les mesures et permettre d’agir', 'L’application montre les mesures de la montre.']],
        (x) => 'Dans un objet communicant, quel est le rôle de ce maillon : ' + x + ' ?', ROLES,
        'Cherche qui mesure, qui transporte, et qui montre.'),
      O.qcm('bonne-pratique', 'maison-courses',
        [['Garder le mot de passe d’usine « 1234 ».', 'À éviter', 'Un mot de passe connu de tous s’essaie en premier.'],
          ['Choisir un mot de passe long et personnel.', 'Une bonne pratique', 'Un mot de passe long se devine très mal.'],
          ['Installer les mises à jour de l’application.', 'Une bonne pratique', 'Les mises à jour corrigent des failles de sécurité.'],
          ['Donner son mot de passe à un voisin pour qu’il arrose.', 'À éviter', 'Un mot de passe donné peut être transmis à d’autres.'],
          ['Mettre le même mot de passe partout.', 'À éviter', 'Si un site est piraté, les autres comptes sont en danger aussi.']],
        (x) => '« ' + x + ' » Est-ce une bonne pratique ou à éviter ?', ['Une bonne pratique', 'À éviter'],
        'Demande-toi si un inconnu pourrait en profiter.'),
      N('mesures-par-heure', 'champetre',
        // [minutes entre deux envois]
        [[10], [15], [5], [20], [12], [30]],
        ([m]) => ({
          enonce: 'Le capteur d’Esther envoie une mesure toutes les ' + m + ' minutes. Combien de mesures envoie-t-il en une heure ?',
          valeur: 60 / m,
          aide: 'Cherche combien de fois la durée entre deux envois entre dans une heure, soit soixante minutes.',
          correction: ['60 ÷ ' + m + ' = ' + 60 / m + ' mesures.'],
        })),
      N('duree-pile', 'appareils',
        // [jours de pile avec un envoi toutes les 10 minutes, facteur d'espacement des envois]
        [[30, 2], [24, 2], [18, 3], [10, 4], [14, 3]],
        ([j, k]) => ({
          enonce: 'Quand le capteur envoie une mesure toutes les 10 minutes, la pile dure ' + j + ' jours. Dans cet exemple, si le capteur envoie ' + k + ' fois moins souvent, la pile dure ' + k + ' fois plus longtemps. Combien de jours dure-t-elle ?',
          valeur: j * k,
          aide: 'Multiplie la durée de départ par le nombre de fois où les envois sont moins fréquents.',
          correction: [j + ' × ' + k + ' = ' + j * k + ' jours.'],
        })),
      N('octets-par-jour', 'appareils',
        // [mesures par jour, octets par mesure]
        [[48, 50], [96, 50], [24, 100], [144, 20], [72, 40]],
        ([n, o]) => ({
          enonce: 'Le capteur envoie ' + n + ' mesures par jour. Chaque mesure pèse ' + o + ' octets. Combien d’octets sont envoyés en un jour ?',
          valeur: n * o,
          aide: 'Multiplie le nombre de mesures par le poids d’une mesure.',
          correction: [n + ' × ' + o + ' = ' + n * o + ' octets.'],
        })),
    ],

    defi: {
      // [minutes entre deux envois, octets par mesure, limite d'octets par jour]
      versions: [[10, 50, 5000], [15, 50, 5000], [30, 40, 3000], [20, 60, 4000], [12, 30, 4000], [15, 80, 6000]],
      genere(c) {
        const [m, o, L] = c.alea.choisir(this.versions);
        const n = 1440 / m, tot = n * o, ok = tot <= L;
        const juste = ok ? 'Oui, la limite est respectée' : 'Non, la limite est dépassée';
        return {
          enonce: 'Esther installe un capteur d’humidité. Il envoie une mesure toutes les ' + m + ' minutes, et chaque mesure pèse ' + o + ' octets. Une journée compte 1 440 minutes. ' +
            'Sa box accepte au plus ' + L + ' octets par jour pour ce capteur.',
          questions: [
            {
              texte: 'Question 1. Combien de mesures le capteur envoie-t-il en un jour ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Cherche combien de fois la durée entre deux envois entre dans une journée.',
              correction: ['1 440 ÷ ' + m + ' = ' + n + ' mesures.'],
            },
            {
              texte: 'Question 2. Combien d’octets sont envoyés en un jour ?',
              reponse: { type: 'nombre', valeur: tot },
              aide: 'Multiplie le nombre de mesures par le poids d’une mesure.',
              correction: [n + ' × ' + o + ' = ' + tot + ' octets.'],
            },
            {
              texte: 'Question 3. La limite de la box est-elle respectée ?',
              reponse: O.choix(c.alea, juste, [ok ? 'Non, la limite est dépassée' : 'Oui, la limite est respectée']),
              aide: 'Compare les octets envoyés à la limite de la box.',
              correction: ['Le capteur envoie ' + tot + ' octets, et la limite est de ' + L + ' octets.', juste + '.'],
            },
            {
              texte: 'Question 4. Un voisin propose un capteur connecté pour un cactus, qu’on arrose une fois par mois. Est-ce utile ? Donne un argument d’utilité et un argument de sécurité ou de consommation.',
              correction: ['Pour un cactus qu’on arrose rarement, le capteur apporte peu : il est peu utile.', 'Il consomme une pile et envoie des données sur le réseau, qu’il faudra protéger.'],
              grille: ['As-tu donné ton avis sur l’utilité du capteur ?', 'As-tu donné un argument de consommation ou de sécurité ?', 'Tes phrases sont-elles courtes et claires ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Capteur, réseau, application : tu sais comment un objet communicant marche, et tu penses à le protéger.',
    carte: ['role-du-maillon', 'bonne-pratique', 'mesures-par-heure'],
    papierDuSoir: { exercices: ['mesures-par-heure', 'duree-pile', 'octets-par-jour'], defi: true },
    automatismes: [
      {
        id: 'division-60',
        versions: [[10], [15], [20], [30]],
        genere(c) { const [m] = c.alea.choisir(this.versions); return { enonce: '60 ÷ ' + m + ' = ?', reponse: { type: 'nombre', valeur: 60 / m } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, à Lodwar, un boîtier solaire envoie par réseau mobile ou satellite les données d’une pompe d’arrosage.',
    prenoms: ['Esther'],
  };
});
