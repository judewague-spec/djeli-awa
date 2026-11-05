/* Notion 7 du bloc de technologie « Les objets et la société » : le cahier des charges. La lampe de bureau d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  // Le cahier des charges de la lampe : au moins 4 heures d'éclairage, au plus 30 euros, au plus 500 grammes.
  const CDC = { heures: 4, prix: 30, masse: 500 };
  const respectes = ([h, p, m]) => (h >= CDC.heures ? 1 : 0) + (p <= CDC.prix ? 1 : 0) + (m <= CDC.masse ? 1 : 0);
  const RAPPEL = 'Le cahier des charges : au moins 4 heures d’éclairage, au plus 30 euros, au plus 500 grammes.';

  return {
    id: 'cahier-des-charges',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Le cahier des charges',
    classe: '4e',
    univers: ['commerce', 'appareils', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 21) : contraintes, exigences issues d’un cahier des charges.',

    accroche: {
      texte: 'Aminata veut une lampe pour réviser le soir. Elle écrit sur un papier : « Elle doit éclairer au moins 4 heures, coûter 30 euros au plus, et peser 500 grammes au plus pour la poser sur l’étagère. » ' +
        'Au marché, Moussa lui montre trois lampes. Avec sa liste, Aminata sait tout de suite laquelle choisir.',
      image: { dessin: 'chaine', etapes: ['Éclairer au moins 4 heures', 'Coûter 30 euros au plus', 'Peser 500 grammes au plus'], description: 'La liste d’Aminata : éclairer au moins 4 heures, coûter 30 euros au plus, peser 500 grammes au plus.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Ce que l’objet doit faire', 'Les obligations à respecter', 'Une valeur mesurable pour chaque point'], description: 'Ce que l’objet doit faire, les obligations à respecter, une valeur mesurable pour chaque point.' },
      etapes: [
        'La liste d’Aminata dit ce que la lampe doit faire : éclairer, pour réviser le soir.',
        'Elle dit aussi ce qu’il faut respecter : un prix, une masse. Ce sont des obligations.',
        'Chaque point a un nombre que l’on peut vérifier : 4 heures, 30 euros, 500 grammes.',
        'Pour choisir, on vérifie chaque point, un par un. La bonne lampe les respecte tous.',
      ],
    },

    decouverte: {
      texte: (c) => 'Avant de fabriquer ou d’acheter un objet, on écrit ' + c.mot('cdc') + ' : ce que l’objet doit faire, et ' + c.mot('contrainte') + '. ' +
        'Chaque point a une valeur que l’on peut mesurer, comme un prix ou une durée. ' +
        'L’astuce : un objet convient seulement s’il respecte tous les points de la liste.',
    },

    vocabulaire: {
      termes: {
        cdc: { sesMots: 'la liste de ce que l’objet doit faire', officiel: 'le cahier des charges', lesDeux: 'la liste de ce que l’objet doit faire, que les techniciens appellent le cahier des charges' },
        contrainte: { sesMots: 'les obligations à respecter', officiel: 'les contraintes', lesDeux: 'les obligations à respecter, que les techniciens appellent les contraintes' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la liste de ce que l’objet doit faire, et les obligations à respecter. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : le cahier des charges, avec ses contraintes et ses critères, chacun avec une valeur à atteindre.',
        'Tu connais les mots officiels : le cahier des charges, les contraintes, et les critères que l’on vérifie un par un.',
      ],
    },

    exercices: [
      {
        id: 'combien-de-points',
        univers: 'commerce',
        // [heures d'éclairage, prix en euros, masse en grammes]
        versions: [[5, 25, 400], [3, 20, 300], [6, 35, 450], [4, 30, 600], [2, 40, 700], [8, 28, 350]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const [h, p, m] = v, n = respectes(v);
          return {
            enonce: RAPPEL + ' Une lampe éclaire ' + h + ' heures, coûte ' + p + ' euros et pèse ' + m + ' grammes. Combien de points du cahier des charges respecte-t-elle ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Vérifie les trois points, un par un.',
            correction: [h + ' heures : ' + (h >= 4 ? 'oui' : 'non') + ' ; ' + p + ' euros : ' + (p <= 30 ? 'oui' : 'non') + ' ; ' + m + ' grammes : ' + (m <= 500 ? 'oui' : 'non') + '.', 'Réponse : ' + n + '.'],
          };
        },
      },
      {
        id: 'reste-du-budget',
        univers: 'famille',
        // [prix de la lampe en euros]
        versions: [18, 22, 25, 27, 12, 29],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          return {
            enonce: RAPPEL + ' Aminata achète une lampe à ' + p + ' euros. Combien d’euros reste-t-il sur ce qu’elle avait prévu ?',
            reponse: { type: 'nombre', valeur: 30 - p },
            aide: 'Calcule 30 − ' + p + '.',
            aideParlee: 'Soustrais le prix de la lampe à trente euros.',
            correction: ['30 − ' + p + ' = ' + O.nb(30 - p, 'euro') + '.'],
          };
        },
      },
      O.qcm('fonction-ou-contrainte', 'appareils',
        [['Éclairer le bureau.', 'Ce que l’objet doit faire'], ['Coûter 30 euros au plus.', 'Une contrainte'], ['Peser 500 grammes au plus.', 'Une contrainte'], ['Garder les boissons au frais.', 'Ce que l’objet doit faire'], ['Résister à la pluie.', 'Une contrainte']],
        (x) => '« ' + x + ' » Dans un cahier des charges, est-ce ce que l’objet doit faire, ou une contrainte ?', ['Ce que l’objet doit faire', 'Une contrainte'],
        'Ce qu’il doit faire, ou une obligation à respecter ?'),
      O.qcm('point-mesurable', 'commerce',
        [['la lampe', 'Éclairer au moins 4 heures'], ['le sac', 'Porter au moins 10 kilogrammes'], ['la gourde', 'Garder l’eau fraîche au moins 6 heures']],
        (x) => 'Pour ' + x + ', quel point du cahier des charges peut se vérifier par une mesure ?', ['Être joli', 'Plaire à tout le monde', 'Éclairer au moins 4 heures', 'Porter au moins 10 kilogrammes', 'Garder l’eau fraîche au moins 6 heures'],
        'Cherche le point qui a un nombre et une unité.'),
      O.qcm('quelle-lampe', 'commerce',
        [['A : 5 heures, 25 euros, 400 grammes. B : 3 heures, 20 euros, 300 grammes.', 'La lampe A'], ['A : 6 heures, 35 euros, 450 grammes. B : 4 heures, 28 euros, 480 grammes.', 'La lampe B'], ['A : 4 heures, 30 euros, 600 grammes. B : 5 heures, 29 euros, 500 grammes.', 'La lampe B']],
        (x) => RAPPEL + ' Quelle lampe respecte tout le cahier des charges ? ' + x, ['La lampe A', 'La lampe B'],
        'Vérifie les trois points pour chaque lampe.'),
    ],

    defi: {
      // [lampe A : heures, prix, masse], [lampe B : heures, prix, masse]
      versions: [[[5, 25, 400], [3, 20, 300]], [[6, 35, 450], [4, 28, 480]], [[4, 30, 600], [5, 29, 500]], [[8, 28, 350], [2, 15, 200]]],
      genere(c) {
        const [A, B] = c.alea.choisir(this.versions);
        const nA = respectes(A), nB = respectes(B);
        const bonne = nA === 3 ? 'La lampe A' : 'La lampe B';
        return {
          enonce: 'Esther doit conseiller Aminata. ' + RAPPEL + ' La lampe A éclaire ' + A[0] + ' heures, coûte ' + A[1] + ' euros et pèse ' + A[2] + ' grammes. ' +
            'La lampe B éclaire ' + B[0] + ' heures, coûte ' + B[1] + ' euros et pèse ' + B[2] + ' grammes.',
          questions: [
            {
              texte: 'Question 1. Combien de points du cahier des charges la lampe A respecte-t-elle ?',
              reponse: { type: 'nombre', valeur: nA },
              aide: 'Vérifie les trois points, un par un.',
              correction: ['Réponse : ' + nA + '.'],
            },
            {
              texte: 'Question 2. Combien de points la lampe B respecte-t-elle ?',
              reponse: { type: 'nombre', valeur: nB },
              aide: 'Vérifie les trois points, un par un.',
              correction: ['Réponse : ' + nB + '.'],
            },
            {
              texte: 'Question 3. Quelle lampe Aminata doit-elle choisir ?',
              reponse: O.choix(c.alea, bonne, ['La lampe A', 'La lampe B']),
              aide: 'La bonne lampe respecte tous les points.',
              correction: ['Seule ' + bonne.replace('La lampe', 'la lampe') + ' respecte les trois points.', 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Explique ton choix en une phrase, en citant les points du cahier des charges.',
              correction: [bonne + ' éclaire assez longtemps, ne coûte pas trop cher et n’est pas trop lourde : elle respecte les trois points.'],
              grille: ['As-tu cité la durée d’éclairage, le prix et la masse ?', 'As-tu conclu par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une liste claire, des points mesurables, vérifiés un par un : tu choisis comme une ingénieure.',
    carte: ['combien-de-points', 'fonction-ou-contrainte', 'quelle-lampe'],
    papierDuSoir: { exercices: ['combien-de-points', 'reste-du-budget'], defi: true },
    automatismes: [
      {
        id: 'plus-petit-ou-egal',
        versions: [[28, 30], [35, 30], [30, 30], [450, 500]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return { enonce: a + ' est-il inférieur ou égal à ' + b + ' ?', reponse: O.choix(c.alea, a <= b ? 'Oui' : 'Non', ['Oui', 'Non']) };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, en 2022, le ministère de la Santé a voulu équiper trente services de soins. Son appel d’offres donne les spécifications techniques du matériel.',
    prenoms: ['Aminata', 'Moussa', 'Esther'],
  };
});
