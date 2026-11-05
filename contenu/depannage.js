/* Notion 5 du bloc de technologie « Comment un objet fonctionne » : dépanner avec méthode. La lampe de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const eu = (x) => ecr(x) + ' euro' + (x >= 2 ? 's' : '');
  const arr = (x) => Math.round(x * 100) / 100;
  /** Question à choix : versions [[situation, bonne réponse, [deux pièges faux], explication]]. */
  const Q = (id, univers, versions, enonce, aide) => ({
    id, univers, versions,
    genere(c) {
      const [x, bonne, autres, pourquoi] = c.alea.choisir(this.versions);
      return { enonce: enonce(x), reponse: O.choix(c.alea, bonne, autres), aide, correction: [pourquoi, 'Réponse : ' + bonne + (/[.!?]$/.test(bonne) ? '' : '.')] };
    },
  });

  return {
    id: 'depannage',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Dépanner avec méthode',
    classe: '4e',
    univers: ['appareils', 'maison-courses', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : démarche de dépannage (symptôme, hypothèses, test, réparation, vérification) et sécurité.',

    accroche: {
      texte: 'La lampe de Rachel ne s’allume plus. Elle veut la jeter. Laure l’arrête : cherchons d’abord pourquoi, avec méthode. ' +
        'Et avant d’ouvrir quoi que ce soit, on débranche toujours.',
      image: { dessin: 'chaine', etapes: ['On débranche', 'On note ce qu’on voit', 'On cherche la cause', 'On répare, puis on vérifie'], description: 'La méthode de dépannage en quatre temps : on débranche, on note ce qu’on voit, on cherche la cause, puis on répare et on vérifie.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['1. Je débranche', '2. Je note ce que je vois', '3. Je liste les causes possibles', '4. Je teste une cause à la fois', '5. Je répare, puis je vérifie'], description: 'Cinq étapes : je débranche, je note ce que je vois, je liste les causes possibles, je teste une cause à la fois, puis je répare et je vérifie.' },
      etapes: [
        'Première règle : avant d’ouvrir un appareil, on le débranche. Toujours.',
        'D’abord, on décrit ce qu’on voit : la lampe ne s’allume plus.',
        'Ensuite, on liste les causes possibles : l’ampoule, la prise, l’interrupteur, le fil.',
        'On teste une cause à la fois : l’ampoule dans une autre lampe qui marche, ou une autre lampe sur la même prise.',
        'Quand on a trouvé la cause, on répare, par exemple en changeant l’ampoule. Puis on vérifie que la lampe s’allume.',
        'Le courant de la maison reste l’affaire d’un électricien : on n’y touche jamais.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde la lampe éteinte : c’est ' + c.mot('symptome') + '. ' +
        'Pense à l’ampoule grillée : c’est ' + c.mot('hypothese') + '. ' +
        'Regarde Rachel qui essaie chaque cause, l’une après l’autre : c’est ' + c.mot('diagnostic') + '. ' +
        'L’astuce : on débranche d’abord, et on teste une cause à la fois.',
    },

    vocabulaire: {
      termes: {
        symptome: { sesMots: 'ce qu’on voit qui ne va pas', officiel: 'le symptôme', lesDeux: 'ce qu’on voit qui ne va pas. Les techniciens disent : le symptôme' },
        hypothese: { sesMots: 'une cause possible', officiel: 'une hypothèse', lesDeux: 'une cause possible. Les techniciens disent : une hypothèse' },
        diagnostic: { sesMots: 'chercher la vraie cause par des tests', officiel: 'le diagnostic', lesDeux: 'chercher la vraie cause par des tests. Les techniciens disent : le diagnostic' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce qu’on voit qui ne va pas, une cause possible, et chercher la vraie cause par des tests. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : le symptôme, pour ce qu’on voit qui ne va pas. Une hypothèse, pour une cause possible. Le diagnostic, pour trouver la vraie cause.',
        'Tu connais les mots officiels : le symptôme, l’hypothèse et le diagnostic.',
      ],
    },

    exercices: [
      O.qcm('quelle-etape', 'appareils',
        [
          ['La lampe ne s’allume plus.', 'Le symptôme', 'C’est ce qu’on voit qui ne va pas.'],
          ['Peut-être que l’ampoule est grillée.', 'L’hypothèse', 'C’est une cause possible, pas encore vérifiée.'],
          ['Je mets l’ampoule dans une autre lampe qui marche.', 'Le test', 'On vérifie une cause possible par un essai.'],
          ['Je change l’ampoule grillée.', 'La réparation', 'On remplace la pièce qui est la cause de la panne.'],
          ['Je rallume la lampe pour voir si elle marche.', 'La vérification', 'On contrôle que la panne a disparu.'],
        ],
        (x) => '« ' + x + ' » De quelle étape de la méthode s’agit-il ?',
        ['Le symptôme', 'L’hypothèse', 'Le test', 'La réparation', 'La vérification'],
        'Demande-toi si on observe, si on imagine, si on essaie, si on change ou si on contrôle.'),
      Q('premier-geste', 'maison-courses',
        [
          ['Tu veux ouvrir le boîtier d’un grille-pain en panne.', 'Je le débranche de la prise.', ['Je l’ouvre vite pour voir.', 'Je cherche la panne avant de le débrancher.'], 'On débranche toujours avant d’ouvrir un appareil.'],
          ['Tu veux changer l’ampoule d’une lampe éteinte.', 'Je débranche la lampe.', ['Je dévisse l’ampoule tout de suite.', 'Je secoue la lampe pour écouter.'], 'On débranche d’abord, même pour une simple ampoule.'],
          ['Le cordon d’un ventilateur semble abîmé.', 'Je débranche, puis je préviens un électricien.', ['Je le répare tout de suite, sans le débrancher.', 'Je continue de l’utiliser avec précaution.'], 'Un cordon abîmé est dangereux : on débranche et on prévient un électricien.'],
          ['Tu veux nettoyer l’intérieur d’un mixeur.', 'Je le débranche d’abord.', ['Je passe un chiffon dedans, branché.', 'Je le laisse branché pour mieux voir.'], 'On débranche toujours avant de mettre les mains près d’un appareil.'],
        ],
        (x) => x + ' Quel est le premier geste ?',
        'Pense à ce qui te protège avant tout le reste.'),
      {
        id: 'causes-restantes',
        univers: 'appareils',
        // [causes possibles, causes déjà écartées]
        versions: [[6, 2], [5, 3], [8, 5], [7, 4], [9, 6]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          const r = n - k;
          return {
            enonce: 'La lampe de Rachel a ' + n + ' causes possibles. Rachel en a déjà écarté ' + k + ' par des tests. Combien de causes reste-t-il à tester ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Retire les causes écartées du total.',
            correction: [n + ' − ' + k + ' = ' + r + ' ' + (r >= 2 ? 'causes' : 'cause') + '.'],
          };
        },
      },
      {
        id: 'temps-des-tests',
        univers: 'famille',
        // [minutes par test, nombre de tests]
        versions: [[5, 4], [10, 3], [15, 2], [4, 6], [8, 5]],
        genere(c) {
          const [t, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Chaque test d’une cause dure ' + t + ' minutes. Laure doit faire ' + n + ' tests. Combien de minutes faut-il pour tous les faire ?',
            reponse: { type: 'nombre', valeur: t * n },
            aide: 'Multiplie la durée d’un test par le nombre de tests.',
            correction: [t + ' × ' + n + ' = ' + t * n + ' minutes.'],
          };
        },
      },
      {
        id: 'prix-ampoule',
        univers: 'maison-courses',
        // [prix de l'ampoule en euros, prix de la lampe en euros]
        versions: [[3, 12], [4, 18], [2.5, 15], [5, 20], [1.5, 9]],
        genere(c) {
          const [a, l] = c.alea.choisir(this.versions);
          const d = arr(l - a);
          return {
            enonce: 'Une ampoule neuve coûte ' + eu(a) + '. Une lampe neuve coûte ' + eu(l) + '. Rachel jette sa lampe alors que seule l’ampoule est grillée. Combien d’euros de trop dépense-t-elle ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Soustrais le prix de l’ampoule au prix de la lampe.',
            correction: [ecr(l) + ' − ' + ecr(a) + ' = ' + ecr(d) + ' euros.'],
          };
        },
      },
    ],

    defi: {
      // [causes possibles, causes écartées, minutes par test, 1 si l'ampoule s'allume dans l'autre lampe, 0 sinon]
      versions: [[5, 1, 5, 1], [6, 2, 10, 0], [4, 1, 15, 1], [7, 3, 5, 0]],
      genere(c) {
        const [n, k, t, s] = c.alea.choisir(this.versions);
        const r = n - k;
        const bonne = s === 1 ? 'Non' : 'Oui';
        return {
          enonce: 'La lampe de Rachel ne s’allume plus. Rachel a noté ' + n + ' causes possibles et en a déjà écarté ' + k + '. Chaque test dure ' + t + ' minutes. ' +
            'Elle débranche la lampe, sort l’ampoule, puis la visse dans une autre lampe qui marche : l’ampoule ' + (s === 1 ? 's’allume.' : 'reste éteinte.'),
          questions: [
            {
              texte: 'Question 1. Combien de causes reste-t-il à tester ?',
              reponse: { type: 'nombre', valeur: r },
              aide: 'Retire les causes écartées du total.',
              correction: [n + ' − ' + k + ' = ' + r + ' ' + (r >= 2 ? 'causes' : 'cause') + '.'],
            },
            {
              texte: 'Question 2. Combien de minutes faut-il pour tester toutes les causes restantes ?',
              reponse: { type: 'nombre', valeur: r * t },
              aide: 'Multiplie les causes restantes par la durée d’un test.',
              correction: [r + ' × ' + t + ' = ' + r * t + ' minutes.'],
            },
            {
              texte: 'Question 3. L’ampoule est-elle la cause de la panne ?',
              reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
              aide: 'Si l’ampoule s’allume dans une autre lampe, elle fonctionne.',
              correction: [s === 1 ? 'L’ampoule s’allume ailleurs : elle fonctionne.' : 'L’ampoule reste éteinte même dans une lampe qui marche : elle est grillée.', 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. La prise du mur ne donne plus de courant. Rachel peut-elle la réparer elle-même ? Que fait-elle ? Explique.',
              correction: ['Non : le courant de la maison est dangereux.', 'Rachel n’y touche pas. Elle appelle un électricien, un professionnel.'],
              grille: ['As-tu dit qu’on ne touche pas au courant de la maison ?', 'As-tu dit d’appeler un électricien ou un professionnel ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Débrancher, observer, chercher la cause, tester, réparer, vérifier : tu dépannes avec méthode et en sécurité.',
    carte: ['quelle-etape', 'premier-geste', 'causes-restantes'],
    papierDuSoir: { exercices: ['temps-des-tests', 'prix-ampoule'], defi: true },
    automatismes: [
      {
        id: 'minutes-de-tests',
        // [minutes par test, nombre de tests]
        versions: [[5, 4], [10, 3], [15, 2], [8, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Ghana, à Suame Magazine, à Kumasi, des milliers d’artisans remettent en marche des véhicules.',
    prenoms: ['Rachel', 'Laure'],
  };
});
