/* Notion du bloc de technologie « Concevoir et fabriquer » : le protocole de test. La lampe de vélo de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const RESPECT = ['Oui, le cahier des charges est respecté', 'Non, le cahier des charges n’est pas respecté'];
  const PROTOCOLES = ['Un bon protocole', 'Un protocole à améliorer'];
  const pl = (n, mot) => ecr(n) + ' ' + mot + (n >= 2 ? 's' : '');
  /** Un exercice à réponse numérique : f(version) rend { enonce, valeur, aide, correction }. */
  const N = (id, univers, versions, f) => ({
    id, univers, versions,
    genere(c) {
      const r = f(c.alea.choisir(this.versions));
      return { enonce: r.enonce, reponse: { type: 'nombre', valeur: r.valeur }, aide: r.aide, correction: r.correction };
    },
  });

  return {
    id: 'protocole-test',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'Le protocole de test',
    classe: '3e',
    univers: ['appareils', 'dehors', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : protocole de test (critère, valeur attendue, mesures répétées, moyenne), conclusion selon le cahier des charges.',

    accroche: {
      texte: 'Moussa teste une lampe de vélo. Le cahier des charges demande au moins 6 heures d’éclairage. ' +
        'Il la laisse allumée et chronomètre trois fois : 6,2 heures, 5,8 heures, puis 6 heures. Aucune mesure n’est exactement pareille. Pour conclure, Moussa fait la moyenne.',
      image: { dessin: 'chaine', etapes: ['Exigé : 6 heures au moins', 'Trois mesures : 6,2 ; 5,8 ; 6 heures', 'La moyenne : 6 heures'], description: 'Le cahier des charges exige au moins 6 heures. Moussa mesure 6,2 heures, 5,8 heures et 6 heures. La moyenne est de 6 heures.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Ce qu’on vérifie : la durée d’éclairage', 'Le résultat exigé : 6 heures au moins', 'Trois mesures dans les mêmes conditions', 'On fait la moyenne, on compare, on conclut'], description: 'Ce qu’on vérifie : la durée d’éclairage. Le résultat exigé : 6 heures au moins. Trois mesures dans les mêmes conditions. On fait la moyenne, on compare et on conclut.' },
      etapes: [
        'Moussa teste une lampe de vélo. Le cahier des charges dit : au moins 6 heures d’éclairage.',
        'Ce qu’il vérifie, c’est la durée d’éclairage. Le résultat qu’il exige, c’est 6 heures au moins.',
        'Une seule mesure peut être un hasard. Il fait donc trois mesures, dans les mêmes conditions.',
        'Il trouve 6,2 heures, 5,8 heures et 6 heures. Il additionne, puis divise par 3 : la moyenne est de 6 heures.',
        'La moyenne atteint 6 heures. Le cahier des charges est respecté.',
      ],
    },

    decouverte: {
      texte: (c) => 'Moussa regarde un point précis : la durée d’éclairage. C’est ' + c.mot('critere') + '. ' +
        'Il demande au moins 6 heures : c’est ' + c.mot('valeur') + '. ' +
        'L’astuce : plusieurs mesures, une moyenne, puis on compare avec ce qui est exigé pour conclure.',
    },

    vocabulaire: {
      termes: {
        critere: { sesMots: 'ce qu’on vérifie', officiel: 'le critère', lesDeux: 'ce qu’on vérifie, que les techniciens appellent le critère' },
        valeur: { sesMots: 'le résultat qu’on exige', officiel: 'la valeur attendue', lesDeux: 'le résultat qu’on exige, que les techniciens appellent la valeur attendue' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce qu’on vérifie, et le résultat qu’on exige. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : le critère, pour ce qu’on vérifie ; la valeur attendue, pour le résultat qu’on exige.',
        'Tu connais les mots officiels : le critère, et la valeur attendue que la moyenne doit atteindre.',
      ],
    },

    exercices: [
      N('moyenne-trois', 'appareils',
        // [mesure 1, mesure 2, mesure 3], en heures
        [[4, 5, 6], [12, 15, 18], [7, 8, 12], [20, 22, 24], [10, 13, 16], [3, 4, 5]],
        ([a, b, c]) => ({
          enonce: 'Moussa mesure trois fois la durée d’éclairage d’une lampe : ' + a + ' heures, ' + b + ' heures et ' + c + ' heures. Quelle est la moyenne, en heures ?',
          valeur: (a + b + c) / 3,
          aide: 'Additionne les trois mesures, puis divise par trois.',
          correction: [a + ' + ' + b + ' + ' + c + ' = ' + (a + b + c) + '.', (a + b + c) + ' ÷ 3 = ' + (a + b + c) / 3 + ' heures.'],
        })),
      N('moyenne-quatre', 'dehors',
        // [4 temps de charge], en minutes
        [[30, 34, 36, 40], [20, 22, 26, 28], [45, 50, 55, 50], [12, 15, 15, 18], [60, 64, 66, 70]],
        ([a, b, c, d]) => ({
          enonce: 'Quatre essais de charge d’une batterie ont duré ' + a + ', ' + b + ', ' + c + ' et ' + d + ' minutes. Quelle est la moyenne, en minutes ?',
          valeur: (a + b + c + d) / 4,
          aide: 'Additionne les quatre durées, puis divise par quatre.',
          correction: [a + ' + ' + b + ' + ' + c + ' + ' + d + ' = ' + (a + b + c + d) + '.', (a + b + c + d) + ' ÷ 4 = ' + (a + b + c + d) / 4 + ' minutes.'],
        })),
      O.qcm('conclusion', 'maison-courses',
        [['La lampe doit éclairer au moins 6 heures. La moyenne des mesures est de 5,5 heures.', 'Non, le cahier des charges n’est pas respecté', 'La moyenne, 5,5 heures, est plus petite que les 6 heures exigées.'],
          ['La batterie doit se charger en 40 minutes au plus. La moyenne des mesures est de 35 minutes.', 'Oui, le cahier des charges est respecté', 'La moyenne, 35 minutes, est plus petite que les 40 minutes permises.'],
          ['Le ventilateur doit peser 300 grammes au plus. La moyenne des mesures est de 320 grammes.', 'Non, le cahier des charges n’est pas respecté', 'La moyenne, 320 grammes, dépasse les 300 grammes permis.'],
          ['La pile doit durer au moins 20 jours. La moyenne des mesures est de 20 jours.', 'Oui, le cahier des charges est respecté', 'La moyenne atteint juste les 20 jours exigés.'],
          ['Le capteur doit répondre en 2 secondes au plus. La moyenne des mesures est de 1,5 seconde.', 'Oui, le cahier des charges est respecté', 'La moyenne, 1,5 seconde, est plus petite que les 2 secondes permises.'],
          ['Le moteur doit tenir au moins 100 heures. La moyenne des mesures est de 96 heures.', 'Non, le cahier des charges n’est pas respecté', 'La moyenne, 96 heures, n’atteint pas les 100 heures exigées.']],
        (x) => x + ' Le cahier des charges est-il respecté ?', RESPECT,
        'Lis si le cahier des charges dit « au moins » ou « au plus », puis compare.'),
      O.qcm('bon-protocole', 'dehors',
        [['Moussa mesure une seule fois la durée de la pile.', 'Un protocole à améliorer', 'Une seule mesure peut être un hasard : il faut la répéter.'],
          ['Moussa mesure cinq fois, toujours avec la même lampe et une pile neuve.', 'Un bon protocole', 'Les mesures sont répétées, dans les mêmes conditions.'],
          ['Moussa mesure une fois avec une pile neuve, une fois avec une pile usée, puis fait la moyenne.', 'Un protocole à améliorer', 'Les conditions ne sont pas les mêmes d’une mesure à l’autre.'],
          ['Moussa mesure trois fois dans les mêmes conditions, puis fait la moyenne.', 'Un bon protocole', 'Les mesures sont répétées dans les mêmes conditions, puis moyennées.'],
          ['Moussa change de lampe à chaque mesure.', 'Un protocole à améliorer', 'Il ne teste pas toujours le même objet, donc la moyenne ne veut rien dire.']],
        (x) => '« ' + x + ' » Est-ce un bon protocole ou un protocole à améliorer ?', PROTOCOLES,
        'Cherche si les mesures sont répétées, et faites dans les mêmes conditions.'),
      N('duree-protocole', 'maison-courses',
        // [nombre de mesures, minutes par mesure, minutes de préparation]
        [[5, 12, 10], [3, 20, 15], [4, 15, 10], [6, 10, 20], [5, 8, 15]],
        ([n, t, p]) => ({
          enonce: 'Le protocole demande ' + n + ' mesures de ' + t + ' minutes chacune, après ' + p + ' minutes de préparation. Combien de minutes dure le test en tout ?',
          valeur: n * t + p,
          aide: 'Multiplie le nombre de mesures par la durée d’une mesure, puis ajoute la préparation.',
          correction: [n + ' × ' + t + ' = ' + n * t + ' minutes.', n * t + ' + ' + p + ' = ' + (n * t + p) + ' minutes.'],
        })),
    ],

    defi: {
      // [durée exigée au moins, mesure 1, mesure 2, mesure 3], en heures
      versions: [[6, 6, 7, 8], [8, 7, 8, 9], [10, 9, 10, 8], [12, 11, 12, 16], [5, 4, 5, 3], [9, 10, 11, 12]],
      genere(c) {
        const [V, a, b, d] = c.alea.choisir(this.versions);
        const moy = (a + b + d) / 3, ok = moy >= V, sous = [a, b, d].filter((x) => x < V).length;
        const juste = ok ? 'Oui, le cahier des charges est respecté' : 'Non, le cahier des charges n’est pas respecté';
        return {
          enonce: 'Moussa teste la batterie d’une lampe de vélo. Le cahier des charges exige une durée d’au moins ' + V + ' heures. ' +
            'Il mesure trois fois, dans les mêmes conditions : ' + a + ' heures, ' + b + ' heures et ' + d + ' heures.',
          questions: [
            {
              texte: 'Question 1. Quelle est la moyenne des trois mesures, en heures ?',
              reponse: { type: 'nombre', valeur: moy },
              aide: 'Additionne les trois mesures, puis divise par trois.',
              correction: [a + ' + ' + b + ' + ' + d + ' = ' + (a + b + d) + '.', (a + b + d) + ' ÷ 3 = ' + moy + ' heures.'],
            },
            {
              texte: 'Question 2. Combien de mesures sont plus petites que ' + V + ' heures ?',
              reponse: { type: 'nombre', valeur: sous },
              aide: 'Compare chaque mesure à la durée exigée.',
              correction: ['Mesures : ' + a + ', ' + b + ' et ' + d + ' heures, à comparer à ' + V + ' heures.', sous === 0 ? 'Aucune mesure n’est plus petite : la réponse est 0.' : pl(sous, 'mesure') + ' ' + (sous >= 2 ? 'sont plus petites' : 'est plus petite') + '.'],
            },
            {
              texte: 'Question 3. D’après la moyenne, le cahier des charges est-il respecté ?',
              reponse: O.choix(c.alea, juste, [ok ? 'Non, le cahier des charges n’est pas respecté' : 'Oui, le cahier des charges est respecté']),
              aide: 'Compare la moyenne à la durée exigée : elle doit l’atteindre ou la dépasser.',
              correction: ['La moyenne est de ' + moy + ' heures, et on exige au moins ' + V + ' heures.', juste + '.'],
            },
            {
              texte: 'Question 4. Moussa a fait une des trois mesures dehors par temps froid et les deux autres dans l’atelier. Que penses-tu de son protocole ? Explique.',
              correction: ['Les mesures doivent se faire dans les mêmes conditions, sinon la moyenne ne dit rien de fiable.', 'Moussa refait les trois mesures dans les mêmes conditions, puis compare la moyenne à la durée exigée.'],
              grille: ['As-tu dit que les conditions doivent être les mêmes pour toutes les mesures ?', 'As-tu proposé de refaire les mesures ?', 'As-tu dit qu’on compare ensuite la moyenne à la valeur exigée ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais répéter des mesures, faire la moyenne, et conclure selon le cahier des charges.',
    carte: ['moyenne-trois', 'conclusion', 'bon-protocole'],
    papierDuSoir: { exercices: ['moyenne-quatre', 'duree-protocole', 'conclusion'], defi: true },
    automatismes: [
      {
        id: 'moyenne-deux',
        versions: [[4, 6], [10, 14], [20, 30], [8, 12]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Moyenne de ' + a + ' et ' + b + ' ?', reponse: { type: 'nombre', valeur: (a + b) / 2 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, l’Agence des normes et de la qualité écrit des normes et vérifie qu’elles sont respectées.',
    prenoms: ['Moussa'],
  };
});
