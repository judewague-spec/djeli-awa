/* Notion 1 du bloc de technologie « Les objets et la société » : le besoin et la fonction d'usage d'un objet. La lampe solaire de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const FONCTIONS = ['Chauffer de l’eau', 'Protéger de la pluie', 'Rafraîchir l’air', 'Garder les aliments au froid', 'Sécher les cheveux'];
  const OBJETS = ['Une lampe', 'Un réfrigérateur', 'Un parapluie', 'Une bouilloire', 'Un ventilateur'];
  const OUI = 'Oui, il est fabriqué par l’être humain', NON = 'Non, il existe dans la nature';

  return {
    id: 'besoin-fonction',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Le besoin et la fonction d’un objet',
    classe: 'cycle 4',
    univers: ['commerce', 'appareils', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 11) : besoins, fonction d’un objet.',

    accroche: {
      texte: 'Au marché, Moussa vend des lampes solaires. Une cliente lui demande : « À quoi sert-elle, au juste ? » ' +
        'Moussa sourit : « Le soir, quand le courant est coupé, elle éclaire la maison. » La cliente a un besoin, et la lampe y répond.',
      image: { dessin: 'chaine', etapes: ['Un besoin : y voir clair le soir', 'Un objet : la lampe solaire', 'Ce qu’il fait : il éclaire la maison'], description: 'Du besoin à l’objet : y voir clair le soir, la lampe solaire, elle éclaire la maison.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Le besoin de l’utilisateur', 'L’objet technique', 'Ce à quoi il sert'], description: 'Le besoin de l’utilisateur, l’objet technique, ce à quoi il sert.' },
      etapes: [
        'Un objet technique est fabriqué par l’être humain. Un caillou ou un arbre ne sont pas des objets techniques.',
        'Chaque objet technique répond à un besoin : y voir clair, garder l’eau fraîche, se protéger de la pluie.',
        'Pour dire à quoi sert un objet, on fait une phrase avec un verbe : la lampe sert à éclairer.',
        'Deux objets différents peuvent répondre au même besoin : une bougie et une lampe éclairent toutes les deux.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un objet technique répond toujours à un besoin. Ce à quoi il sert, on le dit avec un verbe : c’est ' + c.mot('fonction') + '. ' +
        'La lampe solaire sert à éclairer ; la bouilloire sert à chauffer de l’eau. ' +
        'L’astuce : pour trouver ce à quoi sert un objet, demande-toi « à quoi sert-il, pour qui, et pourquoi ? ».',
    },

    vocabulaire: {
      termes: {
        fonction: { sesMots: 'ce à quoi sert l’objet', officiel: 'la fonction d’usage', lesDeux: 'ce à quoi sert l’objet, que les techniciens appellent la fonction d’usage' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce à quoi sert l’objet, avec un verbe. La lampe sert à éclairer. ' +
          'Les techniciens ont un mot à eux : je te le dirai la prochaine fois.',
        'Les techniciens disent : la fonction d’usage. Et ce qui manque à l’utilisateur, c’est son besoin.',
        'Tu connais les mots officiels : le besoin, et la fonction d’usage de l’objet qui y répond.',
      ],
    },

    exercices: [
      O.qcm('a-quoi-sert', 'appareils',
        [['une bouilloire', 'Chauffer de l’eau'], ['un parapluie', 'Protéger de la pluie'], ['un ventilateur', 'Rafraîchir l’air'], ['un réfrigérateur', 'Garder les aliments au froid'], ['un sèche-cheveux', 'Sécher les cheveux']],
        (x) => 'Quelle est la fonction d’usage d’' + x + ' ?', FONCTIONS,
        'Demande-toi : à quoi sert-il ?'),
      O.qcm('quel-objet', 'maison-courses',
        [['d’y voir clair le soir', 'Une lampe'], ['de garder le poisson au frais', 'Un réfrigérateur'], ['de rester au sec sous l’orage', 'Un parapluie'], ['de préparer un thé', 'Une bouilloire'], ['d’avoir moins chaud l’été', 'Un ventilateur']],
        (x) => 'Laure a besoin ' + x + '. Quel objet répond à ce besoin ?', OBJETS,
        'Cherche l’objet qui fait exactement ce qu’il faut.'),
      O.qcm('objet-technique', 'dehors',
        [['une casserole', OUI], ['un caillou', NON], ['un vélo', OUI], ['un arbre', NON], ['une chaise', OUI], ['une rivière', NON]],
        (x) => 'Est-ce un objet technique : ' + x + ' ?', [OUI, NON],
        'Un objet technique est fabriqué par l’être humain.'),
      {
        id: 'heures-d-eclairage',
        univers: 'commerce',
        // [heures par soir, nombre de soirs]
        versions: [[4, 7], [5, 6], [3, 8], [6, 5], [4, 9], [5, 8]],
        genere(c) {
          const [h, j] = c.alea.choisir(this.versions);
          return {
            enonce: 'La lampe solaire de Rachel éclaire ' + h + ' heures chaque soir. Combien d’heures éclaire-t-elle en ' + j + ' soirs ?',
            reponse: { type: 'nombre', valeur: h * j },
            aide: 'Calcule ' + h + ' × ' + j + '.',
            aideParlee: 'Multiplie les heures d’un soir par le nombre de soirs.',
            correction: [h + ' × ' + j + ' = ' + h * j + ' heures.'],
          };
        },
      },
      {
        id: 'cout-par-an',
        univers: 'commerce',
        // [prix en euros, années d'usage]
        versions: [[60, 3], [120, 4], [90, 3], [200, 5], [150, 5], [80, 4]],
        genere(c) {
          const [p, a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Aminata achète un objet à ' + p + ' euros. Il lui sert pendant ' + a + ' ans. Combien lui coûte-t-il par an ?',
            reponse: { type: 'nombre', valeur: p / a },
            aide: 'Calcule ' + p + ' ÷ ' + a + '.',
            aideParlee: 'Divise le prix par le nombre d’années.',
            correction: [p + ' ÷ ' + a + ' = ' + ecr(p / a) + ' euros par an.'],
          };
        },
      },
    ],

    defi: {
      // [heures par soir, soirs par mois, prix en euros, années d'usage]
      versions: [[4, 30, 60, 3], [5, 30, 90, 3], [3, 30, 80, 4], [6, 30, 120, 4]],
      genere(c) {
        const [h, j, p, a] = c.alea.choisir(this.versions);
        return {
          enonce: 'Dans le village, le courant est souvent coupé le soir. Moussa propose à Laure une lampe solaire à ' + p + ' euros. ' +
            'Elle éclaire ' + h + ' heures chaque soir et doit durer ' + a + ' ans.',
          questions: [
            {
              texte: 'Question 1. Combien d’heures la lampe éclaire-t-elle en ' + j + ' soirs ?',
              reponse: { type: 'nombre', valeur: h * j },
              aide: 'Multiplie les heures d’un soir par le nombre de soirs.',
              correction: [h + ' × ' + j + ' = ' + h * j + ' heures.'],
            },
            {
              texte: 'Question 2. Combien la lampe coûte-t-elle par an ?',
              reponse: { type: 'nombre', valeur: p / a },
              aide: 'Divise le prix par le nombre d’années.',
              correction: [p + ' ÷ ' + a + ' = ' + ecr(p / a) + ' euros par an.'],
            },
            {
              texte: 'Question 3. À quel besoin répond la lampe ? Écris sa fonction d’usage avec un verbe.',
              correction: ['Le besoin : y voir clair le soir, quand le courant est coupé.', 'La fonction d’usage : la lampe sert à éclairer la maison.'],
              grille: ['As-tu nommé le besoin de Laure ?', 'As-tu écrit la fonction avec un verbe, comme « éclairer » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un besoin, un objet, et ce à quoi il sert : tu regardes déjà les objets comme une technicienne.',
    carte: ['a-quoi-sert', 'quel-objet', 'objet-technique'],
    papierDuSoir: { exercices: ['heures-d-eclairage', 'cout-par-an'], defi: true },
    automatismes: [
      {
        id: 'produit-rapide',
        versions: [[4, 7], [5, 6], [3, 9], [6, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, à Mekomo, les femmes écrasent le maïs et le manioc avec des mortiers et des pierres. Pour répondre à ce besoin, un projet prévoit un moulin solaire.',
    prenoms: ['Moussa', 'Laure', 'Rachel', 'Aminata'],
  };
});
