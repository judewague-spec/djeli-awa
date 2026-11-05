/* Notion 6 du bloc de technologie « Le numérique et l'intelligence artificielle » : les mots de passe. Le cadenas de Moussa.
   Jamais de vrai mot de passe dans un exemple : consigne du 2 nov. 2026. Les exemples sont décrits, jamais écrits.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const SOLIDE = 'Plutôt solide', FAIBLE = 'Trop faible';

  return {
    id: 'mots-de-passe',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Les mots de passe',
    classe: '4e',
    univers: ['appareils', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : cybersécurité, mots de passe.',

    accroche: {
      texte: 'Moussa ferme son vélo avec un cadenas à trois chiffres. Son ami les essaie un par un, et l’ouvre en quelques minutes. Avec un cadenas à six chiffres, ce serait bien plus long. ' +
        'Le code de ton compte en ligne, c’est pareil : plus il est long et varié, plus il résiste.',
      image: { dessin: 'barres', barres: [{ nom: '1 chiffre', parts: 1 }, { nom: '2 chiffres', parts: 2 }, { nom: '3 chiffres', parts: 3 }, { nom: '4 chiffres', parts: 4 }], description: 'Quatre barres : à chaque chiffre de plus, le nombre de codes possibles est multiplié par dix. Une part de plus veut dire dix fois plus de codes.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Long, et sans mot du dictionnaire', 'Un code différent par compte', 'Un second verrou, si possible', 'Gardé pour soi'], description: 'Quatre conseils : un code long, sans mot du dictionnaire ; un code différent par compte ; un second verrou, si possible ; et gardé pour soi.' },
      etapes: [
        'Un voleur essaie d’abord le plus simple : les prénoms, les dates de naissance, les suites de chiffres.',
        'Un ordinateur peut essayer des milliers de codes à la seconde. Plus il y a de possibilités, plus c’est long.',
        'Si tu utilises le même code partout, un seul vol ouvre tous tes comptes.',
        'Beaucoup de comptes proposent un second verrou : un code reçu par message, en plus du premier.',
        'Ton code est à toi seule. Tu ne le donnes pas, même à une amie, ni à quelqu’un qui prétend travailler pour le site.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un bon code ne se devine pas : il est long, varié, et différent pour chaque compte. Une petite phrase secrète se retient bien, et se devine mal. ' +
        'Ajoute si possible ' + c.mot('double') + '. ' +
        'Si quelqu’un te demande ton code par message, c’est ' + c.mot('hameconnage') + '. Ne réponds pas. ' +
        'L’astuce : ton code se garde comme une brosse à dents. Il ne se prête pas.',
    },

    vocabulaire: {
      termes: {
        double: { sesMots: 'un second verrou', officiel: 'la double authentification', lesDeux: 'un second verrou, que l’on appelle la double authentification' },
        hameconnage: { sesMots: 'une ruse pour voler ton code', officiel: 'de l’hameçonnage', lesDeux: 'une ruse pour voler ton code, que l’on appelle de l’hameçonnage' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le second verrou, et la ruse pour voler ton code. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : la double authentification, pour le second verrou. Et l’hameçonnage, pour la ruse.',
        'Tu connais les mots officiels : le mot de passe, la double authentification et l’hameçonnage.',
      ],
    },

    exercices: [
      {
        id: 'combien-de-codes',
        univers: 'maison-courses',
        versions: [1, 2, 3, 4],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Un cadenas a ' + n + ' molette' + (n > 1 ? 's' : '') + ', avec les chiffres de 0 à 9. Combien de codes différents sont possibles ?',
            reponse: { type: 'nombre', valeur: 10 ** n },
            aide: 'Chaque molette a 10 positions. Multiplie 10 par lui-même, ' + n + ' fois.',
            aideParlee: 'Chaque molette a dix positions. Multiplie dix par lui-même, une fois par molette.',
            correction: [Array(n).fill(10).join(' × ') + ' = ' + ecr(10 ** n) + ' codes.'],
          };
        },
      },
      {
        id: 'temps-pour-trouver',
        univers: 'appareils',
        // [codes possibles, essais par seconde]
        versions: [[10000, 100], [1000, 10], [10000, 50], [100000, 1000], [1000, 5], [100000, 500]],
        genere(c) {
          const [n, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'Il y a ' + ecr(n) + ' codes possibles. Une machine en essaie ' + ecr(e) + ' par seconde. Combien de secondes lui faut-il, au plus, pour tous les essayer ?',
            reponse: { type: 'nombre', valeur: n / e },
            aide: 'Calcule ' + ecr(n) + ' ÷ ' + ecr(e) + '.',
            aideParlee: 'Divise le nombre de codes par le nombre d’essais par seconde.',
            correction: [ecr(n) + ' ÷ ' + ecr(e) + ' = ' + ecr(n / e) + ' secondes.'],
          };
        },
      },
      Q('solide-ou-faible', 'appareils',
        [['Le prénom de son chat', FAIBLE], ['Sa date de naissance', FAIBLE], ['Une longue phrase secrète, avec des chiffres et des signes', SOLIDE], ['Le même code court sur tous ses comptes', FAIBLE], ['Une suite de chiffres qui se suivent', FAIBLE]],
        (x) => 'Comme mot de passe : ' + x.toLowerCase() + ' ?', [SOLIDE, FAIBLE],
        'Quelqu’un qui te connaît un peu pourrait-il le deviner ?',
        'Ce qui se devine, ou ce qui sert partout, reste faible. Une longue phrase secrète et variée résiste bien mieux.'),
      Q('ruse-ou-pas', 'maison-courses',
        [['Un message dit : « Ton compte va fermer ! Donne vite ton mot de passe. »', 'Ne pas répondre, et prévenir un adulte'], ['Un inconnu se dit technicien du site, et demande ton code.', 'Ne pas répondre, et prévenir un adulte']],
        (x) => x + ' Que faire ?', ['Ne pas répondre, et prévenir un adulte', 'Donner le code, pour éviter un problème', 'Cliquer sur le lien pour vérifier'],
        'Un vrai site ne demande jamais ton mot de passe par message.',
        'C’est une ruse pour voler ton code, souvent avec une fausse urgence. Un vrai site ne le demande jamais par message.'),
      Q('meme-code', 'appareils',
        [['Quel est le risque d’utiliser le même code partout ?', 'Un seul vol ouvre tous les comptes'], ['Pourquoi utiliser un code différent par compte ?', 'Un seul vol ouvre tous les comptes']],
        (x) => x, ['Un seul vol ouvre tous les comptes', 'Le téléphone devient plus lent', 'Les comptes coûtent plus cher'],
        'Imagine une seule clé pour toutes les portes.',
        'Si un site se fait voler ses codes, un voleur peut essayer le même sur tous tes autres comptes.'),
    ],

    defi: {
      // [chiffres du code A, chiffres du code B, essais par seconde]
      versions: [[3, 4, 10], [2, 4, 5], [3, 5, 100], [4, 5, 100]],
      genere(c) {
        const [a, b, e] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : un site propose un code A, de ' + a + ' chiffres, ou un code B, de ' + b + ' chiffres. Une machine essaie ' + e + ' codes par seconde.',
          questions: [
            {
              texte: 'Question 1. Combien de codes différents sont possibles avec le code B ?',
              reponse: { type: 'nombre', valeur: 10 ** b },
              aide: 'Multiplie dix par lui-même, une fois par chiffre.',
              correction: [Array(b).fill(10).join(' × ') + ' = ' + ecr(10 ** b) + ' codes.'],
            },
            {
              texte: 'Question 2. Combien de secondes faut-il, au plus, à la machine pour essayer tous les codes B ?',
              reponse: { type: 'nombre', valeur: 10 ** b / e },
              aide: 'Divise le nombre de codes par le nombre d’essais par seconde.',
              correction: [ecr(10 ** b) + ' ÷ ' + e + ' = ' + ecr(10 ** b / e) + ' secondes.'],
            },
            {
              texte: 'Question 3. Même le code B reste faible. Donne des conseils pour un mot de passe bien plus sûr.',
              correction: ['Le rendre beaucoup plus long, avec des lettres, des chiffres et des signes.', 'En utiliser un différent par compte, ajouter un second verrou, et ne le donner à personne.'],
              grille: ['As-tu parlé de la longueur et de la variété ?', 'As-tu dit : un code différent par compte ?', 'As-tu dit de ne le donner à personne ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Long, varié, différent, et gardé pour toi : ton cadenas numérique résiste.',
    carte: ['solide-ou-faible', 'ruse-ou-pas', 'meme-code'],
    papierDuSoir: { exercices: ['combien-de-codes', 'temps-pour-trouver'], defi: true },
    automatismes: [
      {
        id: 'puissance-de-dix',
        versions: [1, 2, 3, 4],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: '10 multiplié ' + n + ' fois par lui-même = ?', reponse: { type: 'nombre', valeur: 10 ** n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au MIT, aux États-Unis, le système CTSS est considéré comme le premier à utiliser des mots de passe.',
    prenoms: ['Moussa'],
  };
});
