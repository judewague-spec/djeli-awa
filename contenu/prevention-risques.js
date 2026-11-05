/* Notion 1 du bloc SVT « Planète Terre, environnement, action humaine » : prévenir les risques. Le village de Moussa et la crue.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const PREV = 'La prévision', PREVE = 'La prévention', PROT = 'La protection';
  const SEISME = 'Se mettre sous un meuble solide, loin des vitres', EAU = 'Monter à pied à l’étage', ASC = 'Prendre l’ascenseur';
  const metres = (x) => ecr(x) + (x < 2 ? ' mètre' : ' mètres');

  return {
    id: 'prevention-risques',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Prévenir les risques',
    classe: 'cycle 4',
    univers: ['maison-courses', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : risques naturels, prévision, prévention et protection.',

    accroche: {
      texte: 'La rivière gonfle près du champ de Moussa. Il pleut depuis deux jours sans arrêt. Rachel le sait : le village a un plan. ' +
        'Quand la sirène sonne, chacun connaît son chemin vers un lieu sûr. Le danger est là, mais le village s’y était préparé.',
      image: { dessin: 'chaine', etapes: ['On surveille', 'On se prépare', 'On se met à l’abri'], description: 'Trois étapes, l’une après l’autre : on surveille le danger, on se prépare à l’avance, puis on se met à l’abri quand il arrive.' },
    },

    manipulation: {
      image: { dessin: 'courbe', points: [[0, 1], [6, 1.5], [12, 2.5], [18, 4]], axeX: 'Heures', axeY: 'Hauteur de la rivière (m)', description: 'Une courbe qui monte : la rivière mesure 1 mètre à 0 heure, 1,5 mètre à 6 heures, 2,5 mètres à 12 heures et 4 mètres à 18 heures.' },
      etapes: [
        'Imagine la rivière qui gonfle près du champ de Moussa. Que peut faire le village ?',
        'Des spécialistes mesurent la pluie et la hauteur de la rivière, et annoncent la crue à l’avance.',
        'Avant la crue, le village se prépare : règles de construction, affiches de consignes, exercices pour s’entraîner.',
        'Quand la sirène sonne, chacun suit les consignes et rejoint le lieu sûr indiqué sur le plan d’évacuation.',
        'Pendant un séisme, on s’abrite sous un meuble solide, loin des vitres, et on n’utilise pas l’ascenseur.',
        'Pendant une inondation, on monte à pied à l’étage, on coupe l’électricité, et on ne prend pas la voiture.',
      ],
    },

    decouverte: {
      texte: (c) => 'On ne peut pas empêcher un séisme ou une crue. Mais on peut réduire les dégâts. ' +
        'Regarde les spécialistes qui mesurent la pluie et la rivière : c’est ' + c.mot('prevision') + '. ' +
        'Regarde le village qui construit solidement et s’entraîne : c’est ' + c.mot('prevention') + '. ' +
        'Regarde ce que fait chacun quand la sirène sonne : c’est ' + c.mot('protection') + '. ' +
        'L’astuce : surveiller, préparer, puis se mettre à l’abri.',
    },

    vocabulaire: {
      termes: {
        prevision: { sesMots: 'la surveillance du danger', officiel: 'la prévision', lesDeux: 'la surveillance du danger, que les scientifiques appellent la prévision' },
        prevention: { sesMots: 'la préparation avant le danger', officiel: 'la prévention', lesDeux: 'la préparation avant le danger, que les scientifiques appellent la prévention' },
        protection: { sesMots: 'la mise à l’abri pendant le danger', officiel: 'la protection', lesDeux: 'la mise à l’abri pendant le danger, que les scientifiques appellent la protection' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la surveillance du danger, la préparation avant le danger, et la mise à l’abri. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la prévision, pour la surveillance du danger. La préparation avant le danger s’appelle la prévention. La mise à l’abri s’appelle la protection.',
        'Tu connais les mots officiels : la prévision, la prévention et la protection. Ensemble, ils réduisent les dégâts d’un séisme ou d’une inondation.',
      ],
    },

    exercices: [
      O.qcm('quel-mot', 'maison-courses',
        [
          ['Des spécialistes mesurent chaque jour la hauteur de la rivière pour annoncer une crue.', PREV, 'Mesurer et annoncer le danger à l’avance, c’est la prévision.'],
          ['Le village affiche les consignes et organise chaque année un exercice d’évacuation.', PREVE, 'S’entraîner et informer avant le danger, c’est la prévention.'],
          ['Pendant la secousse, Rachel s’abrite sous une table solide.', PROT, 'Se mettre à l’abri pendant le danger, c’est la protection.'],
          ['Une station enregistre les secousses de la terre près d’un volcan pour avertir la population.', PREV, 'Enregistrer des signes du danger pour avertir à l’avance, c’est la prévision.'],
          ['La mairie interdit de construire dans la zone qui peut être inondée.', PREVE, 'Une règle posée avant le danger pour réduire les dégâts, c’est la prévention.'],
          ['Quand la sirène sonne, Moussa monte à l’étage avec sa famille.', PROT, 'Se mettre à l’abri au moment du danger, c’est la protection.'],
        ],
        (x) => x + ' De quoi s’agit-il ?', [PREV, PREVE, PROT],
        'Surveiller et annoncer, se préparer avant, ou agir pendant le danger : choisis.'),
      O.qcm('bon-geste', 'dehors',
        [
          ['Le sol tremble dans la maison. Que faire ?', SEISME, 'Pendant un séisme, on s’abrite sous un meuble solide, loin des vitres, et on n’utilise pas l’ascenseur.'],
          ['L’eau monte dans la rue et la sirène sonne. Que faire ?', EAU, 'Pendant une inondation, on monte à pied à l’étage : l’ascenseur peut s’arrêter, et l’eau peut surprendre en voiture.'],
          ['Pendant une secousse, Rachel est dans sa classe. Que faire ?', SEISME, 'Dans la classe aussi, on s’abrite sous une table solide, loin des vitres.'],
          ['L’eau entre dans la cour de la maison de Laure. Que faire ?', EAU, 'Quand l’eau entre, on monte à pied à l’étage, bien au-dessus de l’eau.'],
        ],
        (x) => x, [SEISME, EAU, ASC],
        'Un seul geste convient. Un séisme secoue le sol, une inondation fait monter l’eau.'),
      O.qcm('vrai-ou-faux', 'maison-courses',
        [
          ['De bonnes consignes peuvent empêcher un séisme.', 'Faux', 'Les consignes ne peuvent pas empêcher un séisme : elles aident seulement à réduire les dégâts.'],
          ['Un plan d’évacuation indique le chemin vers un lieu sûr.', 'Vrai', 'Le plan d’évacuation montre où aller, et par où passer, quand l’alerte sonne.'],
          ['Aujourd’hui, on sait prévoir la date exacte d’un séisme.', 'Faux', 'On sait où les séismes sont probables, mais pas annoncer leur date exacte.'],
          ['Un exercice d’évacuation sert à s’entraîner avant le danger.', 'Vrai', 'S’entraîner à l’avance fait gagner du temps et évite la panique le jour du danger.'],
          ['Une crue peut être annoncée en mesurant la pluie et la hauteur des rivières.', 'Vrai', 'Ces mesures permettent d’annoncer une crue plusieurs heures à l’avance.'],
          ['Quand l’alerte sonne, il faut suivre les consignes.', 'Vrai', 'Les consignes sont prévues pour la sécurité de tous : on les suit.'],
        ],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'On ne peut pas empêcher un phénomène naturel, mais on peut s’y préparer.'),
      {
        id: 'temps-pour-arriver',
        univers: 'dehors',
        // [mètres jusqu'au lieu de rassemblement, mètres parcourus en une minute]
        versions: [[600, 60], [450, 90], [300, 50], [720, 80], [800, 80], [900, 75]],
        genere(c) {
          const [d, v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le lieu de rassemblement est à ' + d + ' m de l’école. Rachel marche à ' + v + ' m par minute. Combien de minutes met-elle pour y arriver ?',
            reponse: { type: 'nombre', valeur: d / v },
            aide: 'Calcule ' + d + ' ÷ ' + v + '.',
            aideParlee: 'Divise la distance à parcourir par la distance parcourue en une minute.',
            correction: [d + ' ÷ ' + v + ' = ' + ecr(d / v) + ' minutes.'],
          };
        },
      },
      {
        id: 'crue-hauteur',
        univers: 'dehors',
        // [hauteur de départ en m, montée par heure en m, heures]
        versions: [[2, 0.5, 4], [1.5, 0.5, 3], [3, 0.25, 4], [2, 0.2, 5], [1, 0.5, 6], [2.5, 0.5, 2]],
        genere(c) {
          const [h, m, n] = c.alea.choisir(this.versions);
          const total = r2(h + m * n);
          return {
            enonce: 'La rivière mesure ' + ecr(h) + ' m de hauteur. Elle monte de ' + ecr(m) + ' m par heure. Quelle sera sa hauteur dans ' + n + ' heures ?',
            reponse: { type: 'nombre', valeur: total },
            aide: 'Calcule ' + ecr(m) + ' × ' + n + ', puis ajoute ' + ecr(h) + '.',
            aideParlee: 'Multiplie la montée d’une heure par le nombre d’heures, puis ajoute la hauteur de départ.',
            correction: [ecr(m) + ' × ' + n + ' = ' + ecr(r2(m * n)) + ' m de montée.', ecr(h) + ' + ' + ecr(r2(m * n)) + ' = ' + ecr(total) + ' m.'],
          };
        },
      },
    ],

    defi: {
      // [hauteur au départ en m, montée par heure en m, heures, seuil de débordement en m]
      versions: [[1, 0.5, 4, 2.5], [1.5, 0.25, 4, 3], [2, 0.5, 3, 3], [1, 0.25, 6, 3], [2, 0.5, 2, 4], [0.5, 0.5, 5, 2.5]],
      genere(c) {
        const [h, m, n, s] = c.alea.choisir(this.versions);
        const total = r2(h + m * n), deborde = total > s;
        return {
          enonce: 'Après un orage, la rivière du village de Moussa commence à monter. Elle mesure ' + ecr(h) + ' m de hauteur. Elle monte de ' + ecr(m) + ' m par heure pendant ' + n +
            ' heures. Elle déborde dès que sa hauteur dépasse ' + ecr(s) + ' m.',
          image: { dessin: 'courbe', points: [[0, h], [n, total]], axeX: 'Heures', axeY: 'Hauteur de la rivière (m)', description: 'Une courbe qui monte : la rivière mesure ' + metres(h) + ' à 0 heure et ' + metres(total) + ' à ' + n + ' heures. Elle déborde au-dessus de ' + metres(s) + '.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la hauteur de la rivière au bout de ' + n + ' heures, en mètres ?',
              reponse: { type: 'nombre', valeur: total },
              aide: 'Calcule ' + ecr(m) + ' × ' + n + ', puis ajoute ' + ecr(h) + '.',
              aideParlee: 'Multiplie la montée d’une heure par le nombre d’heures, puis ajoute la hauteur de départ.',
              correction: [ecr(m) + ' × ' + n + ' = ' + ecr(r2(m * n)) + ' m de montée.', ecr(h) + ' + ' + ecr(r2(m * n)) + ' = ' + ecr(total) + ' m.'],
            },
            {
              texte: 'Question 2. La rivière déborde-t-elle au bout de ' + n + ' heures ?',
              reponse: O.choix(c.alea, deborde ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare la hauteur trouvée avec la hauteur de débordement.',
              correction: [ecr(total) + ' m est ' + (deborde ? 'au-dessus de ' : 'sous ') + ecr(s) + ' m.', 'Réponse : ' + (deborde ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 3. Mesurer la hauteur de la rivière pour annoncer la crue, c’est quel travail ?',
              reponse: O.choix(c.alea, PREV, [PREV, PREVE, PROT]),
              aide: 'Pense à ceux qui surveillent le danger et l’annoncent à l’avance.',
              correction: ['Surveiller et annoncer le danger à l’avance, c’est la prévision.', 'Réponse : La prévision.'],
            },
            {
              texte: 'Question 4. Cite deux gestes que les habitants doivent faire si l’eau monte, et explique le rôle du plan d’évacuation.',
              correction: ['Gestes possibles : monter à pied à l’étage, couper l’électricité, ne pas prendre la voiture, suivre les consignes.', 'Le plan d’évacuation indique où aller et par où passer pour rejoindre un lieu sûr.'],
              grille: ['As-tu cité deux gestes de protection qui conviennent à une inondation ?', 'As-tu dit que le plan d’évacuation montre le chemin vers un lieu sûr ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Surveiller, préparer, se mettre à l’abri : tu sais comment un village affronte un danger naturel.',
    carte: ['quel-mot', 'bon-geste', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['temps-pour-arriver', 'crue-hauteur'], defi: true },
    automatismes: [
      {
        id: 'avant-ou-pendant',
        versions: [['Une affiche explique les consignes à toute la classe.', 'Avant le danger'], ['Moussa se met sous une table solide.', 'Pendant le danger'], ['Le village fait un exercice d’évacuation.', 'Avant le danger'], ['Laure monte à l’étage quand l’eau entre.', 'Pendant le danger']],
        genere(c) { const [t, b] = c.alea.choisir(this.versions); return { enonce: t + ' Avant ou pendant le danger ?', reponse: O.choix(c.alea, b, ['Avant le danger', 'Pendant le danger']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Japon, à Kamaishi, des élèves ont survécu au tsunami de 2011 grâce aux leçons de prévention.',
    prenoms: ['Rachel', 'Moussa', 'Laure'],
  };
});
