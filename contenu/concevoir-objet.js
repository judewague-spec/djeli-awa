/* Notion du bloc de technologie « Concevoir et fabriquer » : concevoir un objet, du besoin à l'objet. La lampe de lecture de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const ENERGIES = ['Le secteur, c’est-à-dire la prise de courant', 'Un panneau solaire', 'Une pile', 'Une batterie rechargeable'];
  const MATERIAUX = ['Le plastique', 'Le métal', 'Le bois'];
  const euros = (x) => ecr(x) + ' euro' + (x >= 2 ? 's' : '');
  /** Un exercice à réponse numérique : f(version) rend { enonce, valeur, aide, correction }. */
  const N = (id, univers, versions, f) => ({
    id, univers, versions,
    genere(c) {
      const r = f(c.alea.choisir(this.versions));
      return { enonce: r.enonce, reponse: { type: 'nombre', valeur: r.valeur }, aide: r.aide, correction: r.correction };
    },
  });

  return {
    id: 'concevoir-objet',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'Concevoir un objet',
    classe: '3e',
    univers: ['appareils', 'commerce', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : du besoin à l’objet, choix de matériaux et d’une source d’énergie, comparaison de solutions à l’aide de données chiffrées.',

    accroche: {
      texte: 'Clarisse veut une lampe de lecture. Elle lit le soir, dans le jardin. Moussa lui demande : « Combien de temps lis-tu ? Où poses-tu la lampe ? » ' +
        'Ses réponses décident du matériau du support. Elles décident aussi de ce qui fait marcher la lampe : pile, batterie, prise de courant ou soleil. Moussa compare avec des chiffres.',
      image: { dessin: 'chaine', etapes: ['Ce que veut faire Clarisse', 'Le matériau du support', 'Ce qui fait marcher la lampe', 'La comparaison avec des chiffres'], description: 'Les étapes de Moussa pour la lampe de Clarisse : ce que Clarisse veut faire, le matériau du support, ce qui fait marcher la lampe, puis la comparaison avec des chiffres.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Lire le soir, dehors', 'Support léger, qui résiste à l’humidité', 'Pile, batterie, prise ou soleil', 'Comparer le prix, la durée, le poids'], description: 'Lire le soir dehors, un support léger qui résiste à l’humidité, le choix entre pile, batterie, prise ou soleil, puis la comparaison du prix, de la durée et du poids.' },
      etapes: [
        'Clarisse veut lire le soir, dehors. Voilà ce qu’elle veut pouvoir faire.',
        'La lampe doit tenir toute la soirée, loin de la prise de courant. Une pile ou une batterie conviennent mieux qu’un câble.',
        'La batterie se recharge. La pile se jette quand elle est vide. Le soleil ne marche pas la nuit.',
        'Le support doit être léger et résister à l’humidité. Moussa pense au plastique ou au bois traité.',
        'Pour choisir, il compare des chiffres : le prix, la durée, le poids.',
      ],
    },

    decouverte: {
      texte: (c) => 'Moussa écrit d’abord ' + c.mot('besoin') + '. Puis il choisit les matériaux du support. ' +
        'Ensuite, il choisit ' + c.mot('energie') + ' : pile, batterie, prise de courant ou soleil. ' +
        'L’astuce : on compare les solutions avec des nombres, pas avec des impressions.',
    },

    vocabulaire: {
      termes: {
        besoin: { sesMots: 'ce que Clarisse veut pouvoir faire', officiel: 'le besoin', lesDeux: 'ce que Clarisse veut pouvoir faire, que les techniciens appellent le besoin' },
        energie: { sesMots: 'ce qui fait marcher la lampe', officiel: 'la source d’énergie', lesDeux: 'ce qui fait marcher la lampe, que les techniciens appellent la source d’énergie' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce que Clarisse veut pouvoir faire, et ce qui fait marcher la lampe. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : le besoin, pour ce que la personne veut faire ; la source d’énergie, pour ce qui fait marcher l’objet.',
        'Tu connais les mots officiels : le besoin, et la source d’énergie que l’on choisit en comparant des chiffres.',
      ],
    },

    exercices: [
      O.qcm('quelle-energie', 'appareils',
        [['une lampe de bureau toujours posée près d’une prise, allumée des heures chaque jour', 'Le secteur, c’est-à-dire la prise de courant', 'La prise est tout près et la lampe marche longtemps : le secteur ne s’épuise pas.'],
          ['un petit capteur dans un champ, loin de toute prise, en plein soleil toute la journée', 'Un panneau solaire', 'Le soleil est là toute la journée et il n’y a pas de prise.'],
          ['une télécommande qui consomme très peu et qu’on utilise de temps en temps', 'Une pile', 'Elle consomme très peu : une pile dure longtemps.'],
          ['un téléphone qu’on emporte partout et qu’on recharge chaque soir', 'Une batterie rechargeable', 'On l’emporte, donc pas de prise, et on peut le recharger chaque soir.']],
        (x) => 'Quelle source d’énergie convient le mieux pour ' + x + ' ?', ENERGIES,
        'Regarde où est l’objet, et combien de temps il marche.'),
      O.qcm('quel-materiau', 'commerce',
        [['un pied de lampe léger, moulé d’une seule pièce, qui reste dehors sous la pluie', 'Le plastique', 'Le plastique est léger, se moule et ne rouille pas.'],
          ['une équerre qui doit porter une étagère très chargée', 'Le métal', 'Le métal est solide et ne plie pas facilement.'],
          ['un petit objet décoratif à sculpter à la main', 'Le bois', 'Le bois se sculpte facilement avec des outils simples.'],
          ['un support de jardin moulé d’une seule pièce, qui reste sous la pluie et pèse très peu', 'Le plastique', 'Le plastique est léger et résiste à la pluie.'],
          ['une patte de fixation qui doit supporter de lourdes charges', 'Le métal', 'Le métal supporte de lourdes charges.']],
        (x) => 'Quel matériau convient le mieux pour ' + x + ' ?', MATERIAUX,
        'Pense à la solidité, au poids, et à l’humidité.'),
      N('cout-piles', 'maison-courses',
        // [prix d'une pile, heures par pile, heures de lecture dans l'année]
        [[2, 20, 100], [3, 30, 120], [4, 25, 100], [2, 40, 160], [5, 50, 250], [3, 15, 90]],
        ([p, h, H]) => ({
          enonce: 'Une pile coûte ' + euros(p) + ' et fait marcher la lampe ' + h + ' heures. Clarisse lit ' + H + ' heures dans l’année. Combien d’euros dépense-t-elle en piles sur l’année ?',
          valeur: (H / h) * p,
          aide: 'Cherche d’abord combien de piles il faut, puis multiplie par le prix d’une pile.',
          correction: [H + ' ÷ ' + h + ' = ' + H / h + ' piles.', H / h + ' × ' + p + ' = ' + (H / h) * p + ' euros.'],
        })),
      N('cout-secteur', 'appareils',
        // [puissance de la lampe en watts, heures de marche, prix du kilowattheure en euros]
        [[10, 200, 0.25], [20, 100, 0.2], [8, 250, 0.25], [12, 500, 0.2], [15, 200, 0.2]],
        ([W, h, prix]) => {
          const kwh = (W * h) / 1000, tot = r2(kwh * prix);
          return {
            enonce: 'Une lampe de ' + W + ' watts marche ' + h + ' heures sur le secteur. Dans cet exemple, un kilowattheure coûte ' + euros(prix) + '. Combien d’euros coûte cette électricité ?',
            valeur: tot,
            aide: 'Passe d’abord en kilowattheures : multiplie les watts par les heures, puis divise par mille. Multiplie ensuite par le prix.',
            correction: [W + ' × ' + h + ' = ' + W * h + ' wattheures, soit ' + ecr(kwh) + ' kilowattheures.', ecr(kwh) + ' × ' + ecr(prix) + ' = ' + ecr(tot) + ' ' + (tot >= 2 ? 'euros' : 'euro') + '.'],
          };
        }),
      {
        id: 'piles-ou-batterie',
        univers: 'commerce',
        // [piles par an, prix d'une pile, prix de la batterie, années]
        versions: [[6, 2, 20, 3], [3, 2, 20, 3], [4, 3, 25, 2], [5, 2, 15, 2], [2, 4, 30, 4], [3, 3, 30, 3]],
        genere(c) {
          const [a, p, B, n] = c.alea.choisir(this.versions);
          const an = a * p, tot = an * n, piles = tot < B;
          const juste = piles ? 'Les piles sont moins chères' : 'La batterie est moins chère';
          return {
            enonce: 'Clarisse use ' + a + ' piles par an, à ' + euros(p) + ' la pile. Une batterie coûte ' + euros(B) + ' et dure ' + n + ' ans. Sur ' + n + ' ans, quelle solution coûte le moins ?',
            reponse: O.choix(c.alea, juste, [piles ? 'La batterie est moins chère' : 'Les piles sont moins chères']),
            aide: 'Calcule d’abord le prix des piles sur toute la durée, puis compare-le au prix de la batterie.',
            correction: ['Piles par an : ' + a + ' × ' + p + ' = ' + an + ' euros.', 'Piles sur ' + n + ' ans : ' + an + ' × ' + n + ' = ' + tot + ' euros, contre ' + B + ' euros pour la batterie.', juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [heures par pile, heures de lecture par an, prix d'une pile, prix de la batterie, années]
      versions: [[20, 100, 2, 18, 3], [25, 100, 2, 30, 3], [30, 120, 3, 25, 2], [10, 80, 1, 20, 4], [20, 160, 2, 40, 2], [40, 200, 4, 35, 2]],
      genere(c) {
        const [h, H, p, B, n] = c.alea.choisir(this.versions);
        const piles = H / h, an = piles * p, tot = an * n, bat = B < tot;
        const juste = bat ? 'Oui, la batterie coûte moins' : 'Non, les piles coûtent moins';
        return {
          enonce: 'Clarisse hésite entre deux lampes de lecture. La lampe A marche avec des piles : une pile coûte ' + euros(p) + ' et dure ' + h + ' heures. ' +
            'La lampe B a une batterie rechargeable de ' + euros(B) + ', qui dure ' + n + ' ans. Clarisse lit ' + H + ' heures par an.',
          questions: [
            {
              texte: 'Question 1. Combien de piles la lampe A use-t-elle en un an ?',
              reponse: { type: 'nombre', valeur: piles },
              aide: 'Cherche combien de fois la durée d’une pile entre dans les heures de lecture de l’année.',
              correction: [H + ' ÷ ' + h + ' = ' + piles + ' piles.'],
            },
            {
              texte: 'Question 2. Combien d’euros de piles Clarisse dépense-t-elle en ' + n + ' ans ?',
              reponse: { type: 'nombre', valeur: tot },
              aide: 'Multiplie les piles d’un an par le prix d’une pile, puis par le nombre d’années.',
              correction: [piles + ' × ' + p + ' = ' + an + ' euros par an.', an + ' × ' + n + ' = ' + tot + ' euros.'],
            },
            {
              texte: 'Question 3. Sur ' + n + ' ans, la lampe B coûte-t-elle moins cher que la lampe A ?',
              reponse: O.choix(c.alea, juste, [bat ? 'Non, les piles coûtent moins' : 'Oui, la batterie coûte moins']),
              aide: 'Compare le prix de la batterie à celui des piles sur toute la durée.',
              correction: ['Les piles coûtent ' + tot + ' euros, et la batterie coûte ' + B + ' euros.', juste + '.'],
            },
            {
              texte: 'Question 4. Clarisse lit aussi dans le train, sans prise de courant. Quelle lampe lui conseilles-tu ? Justifie avec deux critères.',
              correction: ['On peut conseiller la batterie rechargeable : elle marche sans prise et se recharge.', (bat ? 'Deux critères possibles : elle coûte moins sur plusieurs années, et on ne jette pas de piles.' : 'Deux critères possibles : on ne jette pas de piles, et on recharge à la maison. Ici, les piles coûtent moins : choisir la lampe A pour son prix est aussi juste.')],
              grille: ['As-tu choisi une des deux lampes ?', 'As-tu donné un premier critère, avec un chiffre ou un fait ?', 'As-tu donné un deuxième critère ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais partir du besoin, choisir un matériau et une source d’énergie, et comparer les solutions avec des chiffres.',
    carte: ['quelle-energie', 'quel-materiau', 'piles-ou-batterie'],
    papierDuSoir: { exercices: ['cout-piles', 'cout-secteur', 'piles-ou-batterie'], defi: true },
    automatismes: [
      {
        id: 'multiplication-prix',
        versions: [[5, 2], [4, 3], [6, 2], [3, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, les toilettes Fresh Life de Sanergy ont deux cartouches étanches qu’on peut retirer et une lanterne solaire.',
    prenoms: ['Clarisse', 'Moussa'],
  };
});
