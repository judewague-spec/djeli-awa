/* Notion 4 du bloc de technologie « Le numérique et l'intelligence artificielle » : les données personnelles. Le concours d'Aminata.
   Aucune vraie donnée personnelle dans les exemples : consigne du 2 nov. 2026.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const OUI = 'Oui, elle permet de la reconnaître', NON = 'Non, elle ne dit rien sur elle';
  const UTILE = 'Oui, c’est utile au concours', TROP = 'Non, cela ne sert pas au concours';

  return {
    id: 'donnees-personnelles',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Les données personnelles',
    classe: '4e',
    univers: ['famille', 'chansons'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : données personnelles, droits et bons usages.',

    accroche: {
      texte: 'Aminata veut participer à un concours de chant en ligne. Le formulaire lui demande son nom, sa date de naissance, son adresse, sa photo. Et même le métier de ses parents. ' +
        'Pour chanter, faut-il vraiment dire tout cela ? Et que deviendront ces informations ?',
      image: { dessin: 'facture', titre: 'Le formulaire du concours', lignes: [['Prénom', 'demandé'], ['Date de naissance', 'demandée'], ['Adresse', 'demandée'], ['Métier des parents', 'demandé']], description: 'Un formulaire : le prénom, la date de naissance, l’adresse, et le métier des parents sont demandés, sans que les réponses soient écrites.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Pourquoi me demande-t-on cela ?', 'Est-ce vraiment utile ?', 'Qui va le lire, et combien de temps ?'], description: 'Trois questions à se poser : pourquoi me demande-t-on cela ? Est-ce vraiment utile ? Qui va le lire, et combien de temps ?' },
      etapes: [
        'Certaines informations disent qui tu es : ton nom, ton adresse, ta photo, ta voix. Même une seule peut suffire à te retrouver.',
        'Une fois sur Internet, elles peuvent être copiées. Il est presque impossible de les faire disparaître.',
        'Devant un formulaire, pose trois questions : pourquoi, est-ce utile, et qui va le lire ?',
        'En France, tu as des droits : savoir ce qu’on garde sur toi, le faire corriger, ou le faire effacer. Et, avant 15 ans, tes parents doivent souvent donner leur accord aussi.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ce qui permet de te reconnaître, c’est ' + c.mot('donnee') + '. Avant de la donner, tu peux demander à quoi cela sert. On doit obtenir ' + c.mot('consentement') + '. ' +
        'L’astuce : ne donne que ce qui sert vraiment.',
    },

    vocabulaire: {
      termes: {
        donnee: { sesMots: 'ton information à toi', officiel: 'une donnée personnelle', lesDeux: 'ton information à toi, que l’on appelle une donnée personnelle' },
        consentement: { sesMots: 'ton accord', officiel: 'ton consentement', lesDeux: 'ton accord, que l’on appelle ton consentement' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ton information à toi, et ton accord. ' +
          'Dans la loi, on a des mots à soi : je te les dirai la prochaine fois.',
        'Dans la loi, on dit : une donnée personnelle, pour ton information à toi. Et ton consentement, pour ton accord.',
        'Tu connais les mots officiels : la donnée personnelle, le consentement, et le droit de faire effacer.',
      ],
    },

    exercices: [
      Q('personnelle-ou-pas', 'famille',
        [['Le numéro de téléphone de Rachel', OUI], ['La photo de Moussa', OUI], ['La température d’aujourd’hui', NON], ['L’adresse de Laure', OUI], ['Le prix du pain', NON]],
        (x) => x + ' : est-ce une donnée personnelle ?', [OUI, NON],
        'Cette information permet-elle de reconnaître quelqu’un ?',
        'Un numéro, une photo ou une adresse permettent de reconnaître une personne. La météo ou un prix, non.'),
      Q('utile-au-concours', 'chansons',
        [['Un prénom pour afficher le nom de la chanteuse', UTILE], ['Le métier de ses parents', TROP], ['L’enregistrement de sa chanson', UTILE], ['Son adresse exacte, pour un vote en ligne', TROP]],
        (x) => 'Pour un concours de chant en ligne, faut-il donner ceci : ' + x.toLowerCase() + ' ?', [UTILE, TROP],
        'Demande-toi à quoi cela sert pour chanter.',
        'On ne donne que ce qui sert vraiment au concours : le reste n’a rien à faire dans le formulaire.'),
      Q('quel-droit', 'famille',
        [['Rachel veut savoir ce qu’un site garde sur elle.', 'Demander à voir ses données'], ['Le site a mal écrit le nom de Moussa.', 'Demander de corriger'], ['Aminata ne veut plus être inscrite, ni que ses données restent.', 'Demander d’effacer']],
        (x) => x + ' Que peut-on demander au site ?', ['Demander à voir ses données', 'Demander de corriger', 'Demander d’effacer'],
        'Lis bien ce que chacune veut obtenir.',
        'La loi donne le droit de voir ses données, de les faire corriger, et de les faire effacer.'),
      {
        id: 'cases-demandees',
        univers: 'famille',
        // [cases du formulaire, cases vraiment utiles]
        versions: [[10, 3], [12, 4], [8, 2], [15, 5], [9, 4], [14, 6]],
        genere(c) {
          const [n, u] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un formulaire contient ' + n + ' cases. Seules ' + u + ' sont vraiment utiles. Combien de cases demandent trop de choses ?',
            reponse: { type: 'nombre', valeur: n - u },
            aide: 'Calcule ' + n + ' − ' + u + '.',
            aideParlee: 'Enlève les cases utiles au nombre de cases.',
            correction: [n + ' − ' + u + ' = ' + (n - u) + ' cases de trop.'],
          };
        },
      },
      {
        id: 'donnees-recoltees',
        univers: 'chansons',
        // [inscrits, données par inscrit]
        versions: [[200, 4], [150, 6], [500, 3], [80, 5], [120, 5], [300, 8]],
        genere(c) {
          const [n, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un concours compte ' + n + ' inscrits. Pour chacun, le site garde ' + d + ' données personnelles. Combien de données garde-t-il en tout ?',
            reponse: { type: 'nombre', valeur: n * d },
            aide: 'Calcule ' + n + ' × ' + d + '.',
            aideParlee: 'Multiplie le nombre d’inscrits par le nombre de données de chacun.',
            correction: [n + ' × ' + d + ' = ' + n * d + ' données.'],
          };
        },
      },
    ],

    defi: {
      // [données demandées, données utiles, inscrits]
      versions: [[9, 3, 100], [12, 4, 50], [10, 2, 200], [8, 3, 400]],
      genere(c) {
        const [d, u, n] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : une application de jeu demande ' + d + ' informations à ses utilisatrices, dont leur adresse et leur date de naissance. Pour jouer, ' + u + ' suffiraient. L’application compte ' + n + ' utilisatrices dans ton collège.',
          questions: [
            {
              texte: 'Question 1. Combien d’informations l’application demande-t-elle en trop à chaque utilisatrice ?',
              reponse: { type: 'nombre', valeur: d - u },
              aide: 'Enlève les informations utiles aux informations demandées.',
              correction: [d + ' − ' + u + ' = ' + (d - u) + ' informations en trop.'],
            },
            {
              texte: 'Question 2. Combien d’informations en trop possède-t-elle sur l’ensemble de ces utilisatrices ?',
              reponse: { type: 'nombre', valeur: (d - u) * n },
              aide: 'Multiplie ton résultat par le nombre d’utilisatrices.',
              correction: [(d - u) + ' × ' + n + ' = ' + (d - u) * n + ' informations.'],
            },
            {
              texte: 'Question 3. Rédige les conseils que tu donnerais à une amie avant qu’elle installe cette application.',
              correction: ['Se demander à quoi sert chaque information, et ne donner que ce qui est utile.', 'Lire qui garde les données, et savoir qu’elle peut demander à les voir, à les corriger ou à les effacer.'],
              grille: ['As-tu conseillé de ne donner que ce qui est utile ?', 'As-tu parlé de ce que devient l’information ?', 'As-tu cité un droit, comme faire effacer ses données ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Pourquoi, est-ce utile, qui va le lire : tu sais protéger ce qui te concerne.',
    carte: ['personnelle-ou-pas', 'utile-au-concours', 'quel-droit'],
    papierDuSoir: { exercices: ['cases-demandees', 'donnees-recoltees'], defi: true },
    automatismes: [
      {
        id: 'perso-rapide',
        versions: [['une photo de toi', 'Oui'], ['le prix du pain', 'Non'], ['ton adresse', 'Oui']],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Donnée personnelle : ' + d + ' ?', reponse: O.choix(c.alea, b, ['Oui', 'Non']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, le Parlement a adopté le 26 novembre 2024 une loi sur les données personnelles.',
    prenoms: ['Aminata', 'Rachel', 'Moussa', 'Laure'],
  };
});
