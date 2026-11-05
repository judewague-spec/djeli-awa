/* Notion 9 du bloc de technologie « Le numérique et l'intelligence artificielle » : comment une intelligence artificielle apprend. Les mangues de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const SUP = 'Avec les réponses données', NON = 'Sans réponses, en regroupant', REC = 'Par essais et récompenses';

  return {
    id: 'ia-apprentissage',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Comment une intelligence artificielle apprend',
    classe: 'cycle 4',
    univers: ['commerce', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : intelligence artificielle, modes d’apprentissage.',

    accroche: {
      texte: 'Moussa veut qu’une application reconnaisse ses mangues mûres. Personne ne lui écrit de règle. Il lui montre des centaines de photos : « Celle-ci est mûre. Celle-là, non. » ' +
        'Peu à peu, elle se trompe de moins en moins. Elle apprend, comme toi, à force d’exemples.',
      image: { dessin: 'chaine', etapes: ['Des photos avec leur réponse', 'Le programme cherche des points communs', 'Il essaie sur une nouvelle photo'], description: 'Comment apprend le programme : des photos avec leur réponse ; il cherche des points communs ; il essaie ensuite sur une nouvelle photo.' },
    },

    manipulation: {
      image: { dessin: 'facture', titre: 'Trois façons d’apprendre', lignes: [['On donne les réponses', 'mûre ou pas'], ['On ne donne rien', 'il fait des groupes'], ['On donne des points', 'il retient ce qui gagne']], description: 'Trois façons d’apprendre : on donne les réponses, comme mûre ou pas mûre ; on ne donne rien, et il fait des groupes ; on donne des points, et il retient ce qui gagne.' },
      etapes: [
        'Un programme de ce genre n’est pas un cerveau. Il calcule, et il repère des points communs dans de très nombreux exemples.',
        'Première façon : on lui donne les réponses. « Mûre », « pas mûre ». Il apprend à les retrouver.',
        'Deuxième façon : on ne lui donne aucune réponse. Il fait des groupes de ce qui se ressemble, tout seul.',
        'Troisième façon : il essaie, et il reçoit des points quand il gagne, comme pour un jeu.',
        'On le vérifie ensuite sur des photos qu’il n’a jamais vues. S’il réussit, il a appris.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ce programme apprend à partir d’exemples : ce n’est pas une règle écrite à la main. Si on lui donne les réponses, c’est ' + c.mot('supervise') + '. ' +
        'Sans réponses, c’est ' + c.mot('nonSupervise') + '. Avec des points, c’est ' + c.mot('renforcement') + '. ' +
        'L’astuce : plus les exemples sont nombreux et variés, mieux il apprend.',
    },

    vocabulaire: {
      termes: {
        supervise: { sesMots: 'la première façon', officiel: 'l’apprentissage supervisé', lesDeux: 'la première façon, que l’on appelle l’apprentissage supervisé' },
        nonSupervise: { sesMots: 'la deuxième façon', officiel: 'l’apprentissage non supervisé', lesDeux: 'la deuxième façon, que l’on appelle l’apprentissage non supervisé' },
        renforcement: { sesMots: 'la troisième façon', officiel: 'l’apprentissage par renforcement', lesDeux: 'la troisième façon, que l’on appelle l’apprentissage par renforcement' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la première, la deuxième et la troisième façon d’apprendre. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : l’apprentissage supervisé, l’apprentissage non supervisé, et l’apprentissage par renforcement.',
        'Tu connais les mots officiels : l’intelligence artificielle, et les apprentissages supervisé, non supervisé et par renforcement.',
      ],
    },

    exercices: [
      Q('quelle-facon', 'commerce',
        [['On montre des photos, chacune avec sa réponse : « mûre » ou « pas mûre ».', SUP], ['Le programme range des clients en groupes qui se ressemblent, sans qu’on lui dise lesquels.', NON], ['Le programme joue à un jeu, et gagne des points quand il réussit.', REC], ['On donne des messages marqués « indésirable » ou « normal ».', SUP]],
        (x) => x + ' Comment ce programme apprend-il ?', [SUP, NON, REC],
        'Reçoit-il des réponses, rien, ou des points ?',
        'Avec des réponses, on parle d’apprentissage supervisé. Sans réponses, non supervisé. Avec des points, par renforcement.'),
      Q('vrai-ou-faux', 'appareils',
        [['Ce programme apprend à partir d’exemples.', 'Vrai'], ['Il comprend le monde exactement comme un être humain.', 'Faux'], ['Il peut se tromper, même après son apprentissage.', 'Vrai'], ['Il n’a besoin d’aucune donnée pour apprendre.', 'Faux']],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Il calcule à partir d’exemples : ce n’est pas un cerveau.',
        'Il repère des points communs dans des exemples, par le calcul. Il ne comprend pas comme nous, et il peut se tromper.'),
      Q('pourquoi-nouvelles-photos', 'appareils',
        [['Pourquoi vérifie-t-on le programme sur des photos qu’il n’a jamais vues ?', 'Pour voir s’il sait faire face à du nouveau'], ['À quoi servent des photos que le programme n’a pas reçues pendant son apprentissage ?', 'Pour voir s’il sait faire face à du nouveau']],
        (x) => x, ['Pour voir s’il sait faire face à du nouveau', 'Pour lui donner les réponses', 'Pour le rendre plus lent'],
        'Il peut avoir retenu par cœur les premières photos.',
        'Réussir sur des photos déjà vues peut n’être que du par cœur. Réussir sur des nouvelles montre qu’il a vraiment appris.'),
      {
        id: 'taux-de-reussite',
        univers: 'commerce',
        // [photos testées, réponses justes]
        versions: [[100, 90], [50, 40], [200, 170], [20, 15], [500, 450], [40, 34]],
        genere(c) {
          const [n, j] = c.alea.choisir(this.versions);
          const p = (j / n) * 100;
          return {
            enonce: 'On teste l’application de Moussa sur ' + n + ' nouvelles photos. Elle donne ' + j + ' réponses justes. Quel est son pourcentage de réussite ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + j + ' ÷ ' + n + ' × 100.',
            aideParlee: 'Divise les réponses justes par le nombre de photos, puis multiplie par cent.',
            correction: [j + ' ÷ ' + n + ' × 100 = ' + p + ' %.'],
          };
        },
      },
      {
        id: 'photos-pour-apprendre',
        univers: 'appareils',
        // [photos, photos gardées pour le test]
        versions: [[1000, 200], [500, 100], [800, 150], [1200, 300], [600, 100], [2000, 400]],
        genere(c) {
          const [n, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa a ' + n + ' photos. Il en garde ' + t + ' pour le test final. Combien lui en reste-t-il pour l’apprentissage ?',
            reponse: { type: 'nombre', valeur: n - t },
            aide: 'Calcule ' + n + ' − ' + t + '.',
            aideParlee: 'Enlève les photos du test au nombre total de photos.',
            correction: [n + ' − ' + t + ' = ' + (n - t) + ' photos.'],
          };
        },
      },
    ],

    defi: {
      // [photos du test, justes avec 100 exemples, justes avec 1 000 exemples]
      versions: [[100, 60, 90], [50, 30, 45], [200, 120, 170], [100, 70, 95]],
      genere(c) {
        const [n, a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : on entraîne deux fois un programme qui reconnaît les mangues mûres. Chaque exemple porte sa réponse : mûre ou pas mûre. On le teste sur ' + n + ' nouvelles photos. Après 100 exemples, il donne ' + a + ' réponses justes. Après 1 000 exemples, il en donne ' + b + '.',
          image: { dessin: 'barres', barres: [{ nom: '100 exemples', parts: Math.round((a / n) * 10) }, { nom: '1 000 exemples', parts: Math.round((b / n) * 10) }], description: 'Deux barres, chaque part vaut environ dix pour cent de réussite : le programme réussit mieux après mille exemples qu’après cent.' },
          questions: [
            {
              texte: 'Question 1. Quel est le pourcentage de réussite après 100 exemples ?',
              reponse: { type: 'nombre', valeur: (a / n) * 100 },
              aide: 'Divise les réponses justes par le nombre de photos, puis multiplie par cent.',
              correction: [a + ' ÷ ' + n + ' × 100 = ' + (a / n) * 100 + ' %.'],
            },
            {
              texte: 'Question 2. Combien de réponses justes de plus donne-t-il après 1 000 exemples ?',
              reponse: { type: 'nombre', valeur: b - a },
              aide: 'Fais la différence entre les deux résultats.',
              correction: [b + ' − ' + a + ' = ' + (b - a) + ' réponses de plus.'],
            },
            {
              texte: 'Question 3. Que montre ce document sur l’apprentissage de ce programme ? Quel mode d’apprentissage est utilisé ? Justifie.',
              correction: ['Plus il reçoit d’exemples, mieux il réussit sur de nouvelles photos.', 'Il s’agit d’un apprentissage supervisé, car chaque exemple porte sa réponse.'],
              grille: ['As-tu relié le nombre d’exemples à la réussite ?', 'As-tu nommé l’apprentissage supervisé ?', 'As-tu justifié, par les réponses données ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Des exemples, des réponses, des points : tu sais comment une machine apprend, et ce qu’elle n’est pas.',
    carte: ['quelle-facon', 'vrai-ou-faux', 'pourquoi-nouvelles-photos'],
    papierDuSoir: { exercices: ['taux-de-reussite', 'photos-pour-apprendre'], defi: true },
    automatismes: [
      {
        id: 'sur-cent',
        versions: [[90, 100], [75, 100], [60, 100], [85, 100]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' justes sur ' + b + ', en pourcentage = ?', reponse: { type: 'nombre', valeur: (a / b) * 100 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 2017, l’université Wits, en Afrique du Sud, accueille la première rencontre Deep Learning Indaba, sur l’intelligence artificielle.',
    prenoms: ['Moussa'],
  };
});
