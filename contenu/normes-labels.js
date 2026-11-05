/* Notion 8 du bloc de technologie « Les objets et la société » : normes, labels et certifications. Le chargeur de Rebecca.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const NORME = 'Une norme', LABEL = 'Un label';

  return {
    id: 'normes-labels',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Normes, labels et certifications',
    classe: '4e',
    univers: ['appareils', 'commerce', 'cuisine-restaurant'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 21) : exigences issues des normes, labels et certifications.',

    accroche: {
      texte: 'Rebecca a perdu le chargeur de son téléphone. Celui de sa cousine se branche parfaitement, même s’il vient d’une autre marque ! ' +
        'Au marché, Laure choisit un paquet de café avec un petit logo vert. « Ce logo dit qu’il a été cultivé en respectant la nature », explique-t-elle.',
      image: { dessin: 'chaine', etapes: ['Une règle commune : tous les chargeurs se branchent', 'Un logo de qualité : café cultivé en respectant la nature', 'Un organisme vérifie que c’est vrai'], description: 'Une règle commune pour les chargeurs, un logo de qualité sur le café, et un organisme qui vérifie.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Règle commune à tous les fabricants', 'Logo de qualité choisi par le fabricant', 'Vérification par un organisme indépendant'], description: 'Une règle commune à tous les fabricants, un logo de qualité choisi par le fabricant, une vérification par un organisme indépendant.' },
      etapes: [
        'Les fabricants suivent des règles communes : la taille d’une prise, la forme d’un chargeur, la sécurité d’un jouet. Grâce à elles, les objets vont ensemble et ne sont pas dangereux.',
        'Certaines de ces règles sont obligatoires : un objet qui ne les respecte pas ne peut pas être vendu.',
        'Un logo de qualité, lui, est choisi par le fabricant : il promet plus, par exemple un produit qui respecte la nature.',
        'Un organisme indépendant vérifie que la règle ou la promesse est tenue.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une règle commune à tous les fabricants, c’est ' + c.mot('norme') + ' : elle assure la sécurité et la compatibilité des objets. ' +
        'Un logo de qualité choisi par le fabricant, c’est ' + c.mot('label') + '. Quand un organisme indépendant vérifie, on parle de certification. ' +
        'L’astuce : la règle commune protège tout le monde ; le logo de qualité promet un plus.',
    },

    vocabulaire: {
      termes: {
        norme: { sesMots: 'une règle commune', officiel: 'une norme', lesDeux: 'une règle commune, que les techniciens appellent une norme' },
        label: { sesMots: 'un logo de qualité', officiel: 'un label', lesDeux: 'un logo de qualité, que les techniciens appellent un label' },
      },
      textes: [
        'Pour l’instant, garde tes mots : une règle commune, et un logo de qualité. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : une norme, pour la règle commune ; un label, pour le logo de qualité ; et une certification, quand un organisme vérifie.',
        'Tu connais les mots officiels : la norme, le label et la certification.',
      ],
    },

    exercices: [
      O.qcm('norme-ou-label', 'appareils',
        [['Toutes les prises d’un pays ont la même forme.', NORME], ['Un logo dit que le café a été cultivé en respectant la nature.', LABEL], ['Un jouet doit respecter des règles de sécurité pour être vendu.', NORME], ['Un logo dit que le cacao a été payé un prix juste aux paysans.', LABEL]],
        (x) => '« ' + x + ' » Est-ce une norme ou un label ?', [NORME, LABEL],
        'Règle commune à tous, ou logo de qualité choisi ?'),
      O.qcm('a-quoi-sert-la-norme', 'appareils',
        [['les prises électriques', 'Que les objets aillent ensemble et soient sûrs'], ['les chargeurs de téléphone', 'Que les objets aillent ensemble et soient sûrs']],
        (x) => 'À quoi sert une norme pour ' + x + ' ?', ['Que les objets aillent ensemble et soient sûrs', 'Que les objets soient plus jolis', 'Que les objets coûtent plus cher'],
        'Pense au chargeur de la cousine de Rebecca.'),
      O.qcm('qui-verifie', 'commerce',
        [['le logo vert du café', 'Un organisme indépendant'], ['la sécurité d’un jouet', 'Un organisme indépendant']],
        (x) => 'Qui vérifie ' + x + ' ?', ['Un organisme indépendant', 'Le vendeur seul', 'Personne'],
        'Pour qu’on puisse lui faire confiance, la vérification ne vient pas du vendeur.'),
      {
        id: 'part-labellisee',
        univers: 'commerce',
        // [produits du rayon, produits avec un label]
        versions: [[40, 10], [50, 20], [80, 20], [25, 5], [60, 15], [200, 50]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un rayon de ' + n + ' produits, ' + k + ' ont un label. Quel pourcentage des produits a un label ?',
            reponse: { type: 'nombre', valeur: (k * 100) / n },
            aide: 'Calcule ' + k + ' × 100 ÷ ' + n + '.',
            aideParlee: 'Multiplie le nombre de produits avec un label par cent, puis divise par le nombre total.',
            correction: [k + ' × 100 ÷ ' + n + ' = ' + ecr((k * 100) / n) + ' %.'],
          };
        },
      },
      {
        id: 'prix-du-label',
        univers: 'cuisine-restaurant',
        // [prix sans label, prix avec label] en euros
        versions: [[5, 6], [4, 5], [10, 12], [8, 10], [20, 25]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const p = ((b - a) * 100) / a;
          return {
            enonce: 'Un paquet de café coûte ' + a + ' euros sans label et ' + b + ' euros avec un label. De quel pourcentage le prix augmente-t-il ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule la différence, ' + O.nb(b - a, 'euro') + ', puis ' + (b - a) + ' × 100 ÷ ' + a + '.',
            aideParlee: 'Calcule la différence de prix, multiplie-la par cent, puis divise par le prix sans label.',
            correction: [b + ' − ' + a + ' = ' + O.nb(b - a, 'euro') + '.', (b - a) + ' × 100 ÷ ' + a + ' = ' + ecr(p) + ' %.'],
          };
        },
      },
    ],

    defi: {
      // [prix sans label, prix avec label, paquets par mois]
      versions: [[5, 6, 4], [4, 5, 3], [10, 12, 2], [8, 10, 3]],
      genere(c) {
        const [a, b, n] = c.alea.choisir(this.versions);
        return {
          enonce: 'Laure hésite entre deux paquets de café. Le premier coûte ' + a + ' euros. Le second coûte ' + b + ' euros et porte un label qui garantit un prix juste aux paysans. Laure achète ' + n + ' paquets par mois.',
          questions: [
            {
              texte: 'Question 1. Combien coûte le café avec label en un mois ?',
              reponse: { type: 'nombre', valeur: b * n },
              aide: 'Multiplie le prix d’un paquet par le nombre de paquets.',
              correction: [b + ' × ' + n + ' = ' + b * n + ' euros.'],
            },
            {
              texte: 'Question 2. Combien d’euros de plus paie-t-elle en un mois avec le label ?',
              reponse: { type: 'nombre', valeur: (b - a) * n },
              aide: 'Calcule la différence de prix d’un paquet, puis multiplie par le nombre de paquets.',
              correction: [(b - a) + ' × ' + n + ' = ' + (b - a) * n + ' euros.'],
            },
            {
              texte: 'Question 3. Explique la différence entre une norme et un label, avec l’exemple du chargeur et celui du café.',
              correction: ['Une norme est une règle commune : les chargeurs se branchent sur tous les téléphones qui la suivent.', 'Un label est un logo de qualité choisi par le fabricant et vérifié : il garantit ici un prix juste aux paysans.'],
              grille: ['As-tu dit qu’une norme est une règle commune ?', 'As-tu dit qu’un label promet une qualité en plus ?', 'As-tu utilisé les deux exemples ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Règle commune, logo de qualité, vérification : tu sais lire ce que promettent les objets.',
    carte: ['norme-ou-label', 'a-quoi-sert-la-norme', 'qui-verifie'],
    papierDuSoir: { exercices: ['part-labellisee', 'prix-du-label'], defi: true },
    automatismes: [
      {
        id: 'pourcentage-rapide',
        versions: [[40, 10], [50, 25], [20, 5], [80, 40]],
        genere(c) { const [n, k] = c.alea.choisir(this.versions); return { enonce: k + ' sur ' + n + ', c’est combien pour cent ?', reponse: { type: 'nombre', valeur: (k * 100) / n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, l’Agence des normes et de la qualité, créée en 2009, s’occupe des normes du pays. Les produits importés doivent avoir son certificat de conformité.',
    prenoms: ['Rebecca', 'Laure'],
  };
});
