/* Notion 17 du bloc de technologie « Les objets et la société » : protocole de mesure et choix d'un objet. Les deux lampes de l'atelier.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r1 = (x) => Math.round(x * 10) / 10;
  const moyenne = (l) => r1(l.reduce((s, x) => s + x, 0) / l.length);
  const ORDRE = ['Charger la batterie à fond', 'Allumer la lampe et lancer le chronomètre', 'Arrêter le chronomètre quand la lampe s’éteint', 'Recommencer trois fois et faire la moyenne'];

  return {
    id: 'protocole-evaluation',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Protocole de mesure et choix d’un objet',
    classe: '3e',
    univers: ['appareils', 'commerce', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 31 et 32) : définir et mettre en œuvre un protocole de mesure ; évaluer selon des critères (performances, coût, indice de réparabilité).',

    accroche: {
      texte: 'À l’atelier, Esther doit choisir entre deux lampes solaires pour toute la famille. Moussa a mesuré la première un jour de grand soleil, la seconde un jour de pluie. ' +
        'Esther secoue la tête : « Ce n’est pas juste ! Il faut les mesurer de la même façon, plusieurs fois. » Elle écrit les étapes sur une feuille.',
      image: { dessin: 'chaine', etapes: ORDRE, description: 'Les étapes d’Esther : charger la batterie à fond, allumer la lampe et lancer le chronomètre, arrêter le chronomètre quand la lampe s’éteint, recommencer trois fois et faire la moyenne.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Mêmes conditions pour chaque objet', 'Plusieurs mesures, puis la moyenne', 'Comparer performance, prix et réparation', 'Choisir et justifier'], description: 'Mêmes conditions pour chaque objet, plusieurs mesures puis la moyenne, comparer performance, prix et réparation, choisir et justifier.' },
      etapes: [
        'Pour comparer deux objets, on les mesure dans les mêmes conditions : même charge, même endroit, même appareil de mesure.',
        'On écrit les étapes dans l’ordre, pour que quelqu’un d’autre puisse refaire la mesure.',
        'On mesure plusieurs fois, et on fait la moyenne : une seule mesure peut tromper.',
        'Enfin, on compare les objets sur plusieurs points : la performance, le prix, la note de réparation. Puis on choisit, et on explique pourquoi.',
      ],
    },

    decouverte: {
      texte: (c) => 'Les étapes écrites d’une mesure, toujours faites de la même façon, c’est ' + c.mot('protocole') + '. On mesure plusieurs fois et on fait la moyenne. ' +
        'Pour choisir, on note chaque objet sur ' + c.mot('criteres') + ' : performance, coût, réparation. ' +
        'L’astuce : mêmes conditions, plusieurs mesures, plusieurs points de comparaison.',
    },

    vocabulaire: {
      termes: {
        protocole: { sesMots: 'la recette de la mesure', officiel: 'le protocole de mesure', lesDeux: 'la recette de la mesure, que les techniciens appellent le protocole de mesure' },
        criteres: { sesMots: 'des points de comparaison', officiel: 'des critères d’évaluation', lesDeux: 'des points de comparaison, que les techniciens appellent des critères d’évaluation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la recette de la mesure, et les points de comparaison. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : le protocole de mesure, et les critères d’évaluation.',
        'Tu connais les mots officiels : le protocole de mesure et les critères d’évaluation, comme la performance, le coût et l’indice de réparabilité.',
      ],
    },

    exercices: [
      {
        id: 'moyenne-des-mesures',
        univers: 'appareils',
        // trois durées d'éclairage mesurées, en heures
        versions: [[6, 7, 8], [5, 5, 8], [9, 8, 10], [4, 6, 5], [7, 7, 10]],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const m = moyenne(l), s = l.reduce((a, b) => a + b, 0);
          return {
            enonce: 'Esther mesure trois fois la durée d’éclairage d’une lampe : ' + l.join(' heures, ') + ' heures. Quelle est la moyenne, en heures ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Additionne les trois mesures, puis divise par 3.',
            correction: [l.join(' + ') + ' = ' + s + '.', s + ' ÷ 3 = ' + ecr(m) + ' heures.'],
          };
        },
      },
      O.qcm('juste-ou-pas', 'appareils',
        [['Les deux lampes sont chargées le même jour, au même endroit.', 'Oui, la comparaison est juste'], ['Une lampe est chargée au soleil, l’autre à l’ombre.', 'Non, les conditions ne sont pas les mêmes'],
          ['On mesure chaque lampe une seule fois, un jour différent.', 'Non, les conditions ne sont pas les mêmes'], ['On utilise le même chronomètre et on refait trois mesures.', 'Oui, la comparaison est juste']],
        (x) => '« ' + x + ' » La comparaison est-elle juste ?', ['Oui, la comparaison est juste', 'Non, les conditions ne sont pas les mêmes'],
        'Les mêmes conditions pour les deux objets ?'),
      O.qcm('etape-suivante', 'famille',
        [[ORDRE[0], ORDRE[1]], [ORDRE[1], ORDRE[2]], [ORDRE[2], ORDRE[3]]],
        (x) => 'Dans le protocole d’Esther, quelle étape vient juste après : « ' + x + ' » ?', ORDRE,
        'Suis l’ordre de la mesure, du début à la fin.'),
      {
        id: 'cout-par-heure',
        univers: 'commerce',
        // [prix de la lampe en euros, heures d'éclairage sur toute sa vie]
        versions: [[30, 3000], [20, 1000], [45, 3000], [60, 4000], [25, 2500]],
        genere(c) {
          const [p, h] = c.alea.choisir(this.versions);
          const ct = r1((p * 100) / h);
          return {
            enonce: 'Une lampe coûte ' + p + ' euros et doit éclairer ' + h + ' heures pendant toute sa vie. Combien coûte une heure d’éclairage, en centimes ?',
            reponse: { type: 'nombre', valeur: ct },
            aide: 'Le prix en centimes : ' + p * 100 + '. Calcule ' + p * 100 + ' ÷ ' + h + '.',
            aideParlee: 'Écris le prix en centimes, puis divise par le nombre d’heures.',
            correction: [p + ' euros = ' + p * 100 + ' centimes.', p * 100 + ' ÷ ' + h + ' = ' + ecr(ct) + ' centime' + (ct > 1 ? 's' : '') + '.'],
          };
        },
      },
      {
        id: 'total-des-points',
        univers: 'commerce',
        // points sur 5 pour : la performance, le coût, la réparabilité
        versions: [[4, 3, 5], [5, 2, 3], [3, 4, 4], [2, 5, 3], [4, 4, 2]],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const s = l.reduce((a, b) => a + b, 0);
          return {
            enonce: 'Esther note une lampe sur trois critères, chacun sur 5 : performance ' + l[0] + ', coût ' + l[1] + ', réparabilité ' + l[2] + '. Combien de points a-t-elle en tout, sur 15 ?',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Additionne les trois notes.',
            correction: [l.join(' + ') + ' = ' + s + ' points sur 15.'],
          };
        },
      },
    ],

    defi: {
      // [mesures de la lampe A], [mesures de la lampe B], [points de A], [points de B]
      versions: [[[6, 7, 8], [5, 5, 8], [4, 3, 5], [3, 4, 2]], [[9, 8, 10], [4, 6, 5], [5, 2, 4], [2, 5, 3]], [[5, 5, 8], [7, 7, 10], [3, 4, 3], [4, 3, 5]]],
      genere(c) {
        const [mA, mB, pA, pB] = c.alea.choisir(this.versions);
        const sA = pA.reduce((a, b) => a + b, 0), sB = pB.reduce((a, b) => a + b, 0);
        const bonne = sA > sB ? 'La lampe A' : 'La lampe B';
        return {
          enonce: 'Esther suit son protocole pour deux lampes solaires, chargées le même jour au même endroit. Lampe A : ' + mA.join(', ') + ' heures. Lampe B : ' + mB.join(', ') + ' heures. ' +
            'Puis elle note chaque lampe sur 5 pour la performance, le coût et la réparabilité : A obtient ' + pA.join(', ') + ' ; B obtient ' + pB.join(', ') + '.',
          questions: [
            {
              texte: 'Question 1. Calcule la durée moyenne d’éclairage de la lampe A.',
              reponse: { type: 'nombre', valeur: moyenne(mA) },
              aide: 'Additionne les trois mesures, puis divise par 3.',
              correction: [mA.join(' + ') + ' = ' + mA.reduce((a, b) => a + b, 0) + ' ; ÷ 3 = ' + ecr(moyenne(mA)) + ' heures.'],
            },
            {
              texte: 'Question 2. Calcule la durée moyenne de la lampe B.',
              reponse: { type: 'nombre', valeur: moyenne(mB) },
              aide: 'Additionne les trois mesures, puis divise par 3.',
              correction: [mB.join(' + ') + ' = ' + mB.reduce((a, b) => a + b, 0) + ' ; ÷ 3 = ' + ecr(moyenne(mB)) + ' heures.'],
            },
            {
              texte: 'Question 3. Quelle lampe a le plus de points sur 15 ?',
              reponse: O.choix(c.alea, bonne, ['La lampe A', 'La lampe B']),
              aide: 'Additionne les trois notes de chaque lampe.',
              correction: ['A : ' + pA.join(' + ') + ' = ' + sA + '. B : ' + pB.join(' + ') + ' = ' + sB + '.', 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Explique pourquoi Esther a mesuré trois fois chaque lampe, dans les mêmes conditions.',
              correction: ['Dans les mêmes conditions, la comparaison est juste : seule la lampe change.', 'Trois mesures et une moyenne évitent d’être trompé par une seule mesure.'],
              grille: ['As-tu parlé des mêmes conditions ?', 'As-tu expliqué l’intérêt de la moyenne ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une recette de mesure, une moyenne, des points de comparaison : tu choisis un objet comme au laboratoire.',
    carte: ['moyenne-des-mesures', 'juste-ou-pas', 'etape-suivante'],
    papierDuSoir: { exercices: ['moyenne-des-mesures', 'cout-par-heure'], defi: true },
    automatismes: [
      {
        id: 'moyenne-rapide',
        versions: [[6, 7, 8], [5, 5, 8], [9, 8, 10], [4, 6, 5]],
        genere(c) { const l = c.alea.choisir(this.versions); return { enonce: 'Moyenne de ' + l.join(', ') + ' ?', reponse: { type: 'nombre', valeur: moyenne(l) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, un laboratoire de l’université de Nairobi teste la qualité de petits appareils solaires. C’est le premier d’Afrique accrédité pour ces tests.',
    prenoms: ['Esther', 'Moussa'],
  };
});
