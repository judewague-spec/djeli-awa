/* Notion 10 du bloc « L'électricité » : le kilowattheure et la facture. La facture de Laure.
   Les prix du kilowattheure sont des valeurs d'exercice, données dans chaque énoncé. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const eu = (x) => x.toFixed(2).replace('.', ','); // une somme, au centime
  const FACTURE = (kwh, prix, abo) => ({
    dessin: 'facture',
    lignes: [['Énergie consommée', kwh + ' kWh'], ['Prix du kilowattheure', eu(prix) + ' €'], ['Abonnement du mois', eu(abo) + ' €'], ['À payer', eu(r2(kwh * prix + abo)) + ' €']],
    description: 'Une facture : ' + kwh + ' kilowattheures consommés, à ' + eu(prix) + ' euro le kilowattheure, plus ' + abo + ' euros d’abonnement. À payer : ' + eu(r2(kwh * prix + abo)) + ' euros.',
  });

  return {
    id: 'facture-electricite',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'Le kilowattheure et la facture',
    classe: '3e',
    univers: ['famille', 'maison-courses', 'commerce'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : énergie électrique, kilowattheure, facture d’électricité.',

    accroche: {
      texte: 'Laure ouvre la facture d’électricité du mois, et elle soupire. Elle demande à Rachel de l’aider à la comprendre. ' +
        'Sur la feuille : une ligne pour l’énergie consommée, une ligne pour le prix, et une pour l’abonnement. Le compteur, lui, compte dans une unité bien pratique.',
      image: FACTURE(200, 0.2, 10),
    },

    manipulation: {
      image: FACTURE(150, 0.25, 12),
      etapes: [
        'Le compteur de la maison compte l’énergie en kilowattheures, de symbole kWh. 1 kWh = 1 000 Wh.',
        'Un appareil de 1 000 W qui marche 1 heure consomme 1 kWh.',
        'Pour le prix de l’énergie, on multiplie les kilowattheures par le prix d’un kilowattheure.',
        'On ajoute l’abonnement, une somme fixe : 150 × 0,25 + 12 = 49,50 euros.',
        'Pour trouver l’énergie d’un appareil en kilowattheures, on écrit sa puissance en kilowatts, et la durée en heures.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’unité du compteur, c’est ' + c.mot('kwh') + ' : mille wattheures. Pour le prix à payer, on multiplie l’énergie par le prix du kilowattheure. Puis on ajoute ' + c.mot('abonnement') + '. ' +
        'L’astuce : pour payer moins, regarde les appareils puissants, et ceux qui restent longtemps allumés.',
    },

    vocabulaire: {
      termes: {
        kwh: { sesMots: 'le gros paquet d’énergie', officiel: 'le kilowattheure', lesDeux: 'le gros paquet d’énergie, que l’on appelle le kilowattheure' },
        abonnement: { sesMots: 'la somme fixe', officiel: 'l’abonnement', lesDeux: 'la somme fixe, que l’on appelle l’abonnement' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le gros paquet d’énergie, et la somme fixe. ' +
          'Il existe des mots officiels : je te les dirai la prochaine fois.',
        'On dit : le kilowattheure, et l’abonnement. Le compteur compte les kilowattheures.',
        'Tu connais les mots officiels : le kilowattheure, le compteur, et l’abonnement.',
      ],
    },

    exercices: [
      {
        id: 'prix-de-l-energie',
        univers: 'famille',
        // [kWh, prix]
        versions: [[200, 0.2], [150, 0.2], [300, 0.25], [100, 0.3], [400, 0.25], [250, 0.2]],
        genere(c) {
          const [k, p] = c.alea.choisir(this.versions);
          const t = r2(k * p);
          return {
            enonce: 'La famille de Laure a consommé ' + k + ' kWh. Le kilowattheure coûte ' + ecr(p) + ' euro. Quel est le prix de cette énergie, en euros ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + k + ' × ' + ecr(p) + '.',
            aideParlee: 'Multiplie les kilowattheures par le prix d’un kilowattheure.',
            correction: [k + ' × ' + ecr(p) + ' = ' + eu(t) + ' euros.'],
          };
        },
      },
      {
        id: 'total-de-la-facture',
        univers: 'maison-courses',
        // [kWh, prix, abonnement]
        versions: [[200, 0.2, 10], [150, 0.2, 12], [300, 0.25, 15], [100, 0.3, 8], [400, 0.25, 14]],
        genere(c) {
          const [k, p, a] = c.alea.choisir(this.versions);
          const t = r2(k * p + a);
          return {
            enonce: 'Lis cette facture. Combien faut-il payer, en euros ? Énergie : ' + k + ' kWh, à ' + ecr(p) + ' euro le kilowattheure. Abonnement : ' + a + ' euros.',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + k + ' × ' + ecr(p) + ', puis ajoute ' + a + '.',
            aideParlee: 'Calcule le prix de l’énergie, puis ajoute l’abonnement.',
            correction: [k + ' × ' + ecr(p) + ' = ' + eu(r2(k * p)) + ' euros.', eu(r2(k * p)) + ' + ' + a + ' = ' + eu(t) + ' euros.'],
          };
        },
      },
      {
        id: 'kwh-d-un-appareil',
        univers: 'maison-courses',
        // [P en W, heures]
        versions: [[1000, 3], [2000, 2], [500, 4], [100, 10], [1500, 2], [250, 8]],
        genere(c) {
          const [w, h] = c.alea.choisir(this.versions);
          const k = r2((w * h) / 1000);
          return {
            enonce: 'Un appareil de ' + w + ' W marche ' + h + ' heures. Combien de kilowattheures consomme-t-il ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Écris ' + w + ' W en kilowatts, puis multiplie par ' + h + '.',
            aideParlee: 'Écris la puissance en kilowatts, puis multiplie par la durée en heures.',
            correction: [w + ' W = ' + ecr(r2(w / 1000)) + ' kW.', ecr(r2(w / 1000)) + ' × ' + h + ' = ' + ecr(k) + ' kWh.'],
          };
        },
      },
      {
        id: 'cout-d-un-appareil',
        univers: 'commerce',
        // [P en W, heures, prix]
        versions: [[1000, 10, 0.2], [2000, 5, 0.25], [500, 20, 0.2], [100, 100, 0.3], [1500, 4, 0.25]],
        genere(c) {
          const [w, h, p] = c.alea.choisir(this.versions);
          const k = r2((w * h) / 1000), t = r2(k * p);
          return {
            enonce: 'Un appareil de ' + w + ' W marche ' + h + ' heures dans le mois. Le kilowattheure coûte ' + ecr(p) + ' euro. Combien coûte son électricité, en euros ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Trouve d’abord les kilowattheures, puis multiplie par ' + ecr(p) + '.',
            aideParlee: 'Trouve d’abord les kilowattheures, puis multiplie par le prix.',
            correction: [ecr(r2(w / 1000)) + ' × ' + h + ' = ' + ecr(k) + ' kWh.', ecr(k) + ' × ' + ecr(p) + ' = ' + eu(t) + ' euros.'],
          };
        },
      },
      O.qcm('que-compte-le-compteur', 'famille',
        [['Le compteur de la maison', 'Des kilowattheures'], ['La puissance écrite sur un four', 'Des watts'], ['Le chiffre écrit sur une pile', 'Des volts']],
        (x) => x + ' : qu’indique-t-' + (/^La /.test(x) ? 'elle' : 'il') + ' ?', ['Des kilowattheures', 'Des watts', 'Des volts'],
        'L’énergie, la puissance, ou la tension ?'),
    ],

    defi: {
      // [kWh, prix, abonnement, puissance du vieil appareil, puissance du nouveau, heures]
      versions: [[200, 0.2, 10, 100, 20, 100], [150, 0.2, 12, 60, 10, 200], [300, 0.25, 15, 75, 15, 100], [100, 0.3, 8, 100, 10, 100]],
      genere(c) {
        const [k, p, a, v, n, h] = c.alea.choisir(this.versions);
        const t = r2(k * p + a), eco = r2(((v - n) * h) / 1000), gain = r2(eco * p);
        return {
          enonce: 'Laure reçoit sa facture : ' + k + ' kWh consommés, à ' + ecr(p) + ' euro le kilowattheure, et ' + a + ' euros d’abonnement. Elle remplace une vieille lampe de ' + v + ' W par une lampe de ' + n + ' W, qui éclaire autant. Cette lampe marche ' + h + ' heures par mois.',
          image: FACTURE(k, p, a),
          questions: [
            {
              texte: 'Question 1. Quel est le montant de la facture, en euros ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Calcule le prix de l’énergie, puis ajoute l’abonnement.',
              correction: [k + ' × ' + ecr(p) + ' + ' + a + ' = ' + eu(t) + ' euros.'],
            },
            {
              texte: 'Question 2. Combien de kilowattheures la nouvelle lampe fait-elle économiser en un mois ?',
              reponse: { type: 'nombre', valeur: eco },
              aide: 'Calcule la différence de puissance en kilowatts, puis multiplie par les heures.',
              correction: [(v - n) + ' W = ' + ecr(r2((v - n) / 1000)) + ' kW.', ecr(r2((v - n) / 1000)) + ' × ' + h + ' = ' + ecr(eco) + ' kWh.'],
            },
            {
              texte: 'Question 3. Combien d’euros cela fait-il gagner par mois ?',
              reponse: { type: 'nombre', valeur: gain },
              aide: 'Multiplie les kilowattheures économisés par le prix.',
              correction: [ecr(eco) + ' × ' + ecr(p) + ' = ' + eu(gain) + ' euros.'],
            },
            {
              texte: 'Question 4. Donne à Laure deux autres conseils pour payer moins, et justifie-les.',
              correction: ['Éteindre les appareils quand ils ne servent pas : l’énergie dépend de la durée.', 'Choisir des appareils moins puissants, à service égal : l’énergie dépend aussi de la puissance.'],
              grille: ['As-tu donné deux conseils ?', 'As-tu utilisé la durée ou la puissance pour justifier ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une facture n’a plus de mystère : tu sais lire chaque ligne et aider toute la famille à payer moins.',
    carte: ['prix-de-l-energie', 'total-de-la-facture', 'que-compte-le-compteur'],
    papierDuSoir: { exercices: ['total-de-la-facture', 'cout-d-un-appareil'], defi: true },
    automatismes: [
      {
        id: 'fois-zero-deux',
        versions: [100, 200, 300, 500],
        genere(c) { const k = c.alea.choisir(this.versions); return { enonce: k + ' × 0,2 = ?', reponse: { type: 'nombre', valeur: r2(k * 0.2) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, on peut payer un kit solaire petit à petit. Un premier versement, puis de petits paiements chaque jour, par téléphone.',
    prenoms: ['Laure', 'Rachel'],
  };
});
