/* Notion du bloc de technologie « Concevoir et fabriquer » : les procédés de fabrication. L'atelier de Moussa, le réparateur du quartier.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const PROCEDES = ['L’impression 3D', 'La découpe laser', 'Le pliage', 'Le thermoformage'];
  /** Un exercice à réponse numérique : f(version) rend { enonce, valeur, aide, correction }. */
  const N = (id, univers, versions, f) => ({
    id, univers, versions,
    genere(c) {
      const r = f(c.alea.choisir(this.versions));
      return { enonce: r.enonce, reponse: { type: 'nombre', valeur: r.valeur }, aide: r.aide, correction: r.correction };
    },
  });

  return {
    id: 'procedes-fabrication',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'Les procédés de fabrication',
    classe: '4e',
    univers: ['appareils', 'maison-courses', 'commerce'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : procédés de fabrication (impression 3D, découpe laser, pliage, thermoformage), choix d’un procédé selon la pièce.',

    accroche: {
      texte: 'À l’atelier, Moussa répare une lampe. Le bouton est cassé. Il en refait un avec la machine à imprimer en 3D : elle ajoute du plastique, couche après couche. ' +
        'Pour une plaque de bois, il préfère le laser, qui découpe et retire de la matière. Chaque pièce a sa bonne machine.',
      image: { dessin: 'chaine', etapes: ['Le bouton : on ajoute du plastique', 'La plaque : on retire du bois', 'Chaque pièce a sa bonne machine'], description: 'À l’atelier de Moussa : le bouton est fait en ajoutant du plastique, la plaque est faite en retirant du bois, et chaque pièce a sa bonne machine.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Ajouter : l’impression 3D', 'Retirer : la découpe laser', 'Plier : une bande de tôle', 'Chauffer et mouler : le thermoformage'], description: 'Quatre façons de fabriquer : ajouter de la matière avec l’impression 3D, en retirer avec la découpe laser, plier une bande de tôle, chauffer puis mouler un plastique avec le thermoformage.' },
      etapes: [
        'Moussa veut un bouton neuf. La machine à imprimer en 3D pose du plastique fondu, couche après couche.',
        'Pour une plaque de bois, il utilise le laser. Le laser découpe : il retire de la matière.',
        'Pour une équerre, il plie une bande de tôle. Rien n’est ajouté, rien n’est retiré.',
        'Pour une coque, il chauffe une feuille de plastique, puis il la plaque sur un moule. C’est le thermoformage.',
        'Pour choisir, Moussa se demande : faut-il ajouter, retirer, plier ou mouler ?',
      ],
    },

    decouverte: {
      texte: (c) => 'Le bouton est fait par ' + c.mot('ajout') + ' : la machine pose du plastique, couche par couche. ' +
        'La plaque est faite en retirant de la matière avec le laser. Pour chaque pièce, Moussa choisit ' + c.mot('procede') + '. ' +
        'L’astuce : on regarde la pièce, puis on se demande s’il faut ajouter, retirer, plier ou mouler.',
    },

    vocabulaire: {
      termes: {
        ajout: { sesMots: 'ajout de matière', officiel: 'la fabrication additive', lesDeux: 'ajout de matière, que les techniciens appellent la fabrication additive' },
        procede: { sesMots: 'une façon de la fabriquer', officiel: 'le procédé de fabrication', lesDeux: 'une façon de la fabriquer, que les techniciens appellent le procédé de fabrication' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’ajout de matière, et une façon de fabriquer la pièce. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la fabrication additive, pour l’ajout de matière ; le procédé de fabrication, pour la façon de fabriquer.',
        'Tu connais les mots officiels : la fabrication additive, et le procédé de fabrication choisi pour chaque pièce.',
      ],
    },

    exercices: [
      O.qcm('quel-procede', 'appareils',
        [['un petit objet creux, de forme compliquée, en une seule fois', 'L’impression 3D', 'La machine ajoute la matière couche par couche : elle peut faire des creux et des formes compliquées.'],
          ['une plaque plate, découpée avec précision selon un dessin', 'La découpe laser', 'Le laser suit le dessin et retire la matière autour de la forme.'],
          ['une équerre faite avec une bande de métal à courber', 'Le pliage', 'Il suffit de courber la bande : on ne coupe rien et on n’ajoute rien.'],
          ['un emballage en plastique qui épouse la forme d’un moule', 'Le thermoformage', 'La feuille chauffée devient souple et se plaque contre le moule.']],
        (x) => 'Quel procédé convient le mieux pour fabriquer ' + x + ' ?', PROCEDES,
        'Demande-toi : faut-il ajouter, retirer, plier ou mouler ?'),
      O.qcm('ajout-ou-retrait', 'maison-courses',
        [['l’impression 3D', 'On ajoute de la matière', 'La machine dépose du plastique couche après couche.'],
          ['la découpe laser', 'On retire de la matière', 'Le laser enlève la matière sur le tracé de la découpe.'],
          ['le perçage d’une planche', 'On retire de la matière', 'Le trou est de la matière enlevée.'],
          ['une pièce faite couche par couche avec un fil de plastique', 'On ajoute de la matière', 'Chaque couche s’ajoute à la précédente.']],
        (x) => 'Pour ' + x + ', que fait-on avec la matière ?', ['On ajoute de la matière', 'On retire de la matière'],
        'Regarde si la pièce grossit ou si elle maigrit pendant la fabrication.'),
      N('temps-impression', 'appareils',
        // [nombre de pièces, minutes par pièce]
        [[4, 45], [3, 40], [6, 30], [8, 15], [5, 24]],
        ([n, m]) => ({
          enonce: 'Moussa imprime ' + n + ' pièces identiques en 3D, l’une après l’autre. Chaque pièce demande ' + m + ' minutes. Combien d’heures la machine travaille-t-elle en tout ?',
          valeur: (n * m) / 60,
          aide: 'Multiplie le nombre de pièces par le temps d’une pièce, puis passe en heures : une heure compte soixante minutes.',
          correction: [n + ' × ' + m + ' = ' + n * m + ' minutes.', n * m + ' ÷ 60 = ' + ecr((n * m) / 60) + ' heures.'],
        })),
      N('longueur-de-fil', 'commerce',
        // [mètres de fil dans la bobine, mètres de fil par pièce]
        [[120, 8], [100, 5], [84, 7], [132, 11], [96, 12], [110, 10]],
        ([L, p]) => ({
          enonce: 'Une bobine contient ' + L + ' mètres de fil pour l’imprimante 3D. Chaque pièce utilise ' + p + ' mètres de fil. Combien de pièces entières peut-on imprimer avec une bobine ?',
          valeur: L / p,
          aide: 'Cherche combien de fois la longueur d’une pièce entre dans la longueur de la bobine.',
          correction: [L + ' ÷ ' + p + ' = ' + L / p + ' pièces.'],
        })),
      N('matiere-retiree', 'maison-courses',
        // [masse de la plaque, masse de la pièce découpée], en grammes
        [[500, 320], [400, 310], [600, 450], [250, 190], [800, 620]],
        ([P, p]) => ({
          enonce: 'Moussa découpe au laser une pièce dans une plaque de contreplaqué de ' + P + ' grammes. La pièce découpée pèse ' + p + ' grammes. Combien de grammes de chutes reste-t-il ?',
          valeur: P - p,
          aide: 'Soustrais la masse de la pièce à la masse de la plaque.',
          correction: [P + ' − ' + p + ' = ' + (P - p) + ' grammes.'],
        })),
    ],

    defi: {
      // [supports, minutes par support, mètres de fil par support, mètres dans la bobine]
      versions: [[6, 30, 5, 40], [4, 45, 12, 40], [8, 15, 6, 50], [5, 36, 10, 40], [3, 40, 9, 30]],
      genere(c) {
        const [n, p, m, L] = c.alea.choisir(this.versions);
        const total = n * m, suffit = total <= L;
        return {
          enonce: 'Moussa imprime en 3D ' + n + ' supports de téléphone pour le marché. Chaque support demande ' + p + ' minutes d’impression et ' + m + ' mètres de fil. Il dispose d’une petite bobine d’essai de ' + L + ' mètres.',
          questions: [
            {
              texte: 'Question 1. Combien d’heures d’impression faut-il pour les ' + n + ' supports ?',
              reponse: { type: 'nombre', valeur: (n * p) / 60 },
              aide: 'Multiplie le nombre de supports par le temps d’un support, puis passe en heures.',
              correction: [n + ' × ' + p + ' = ' + n * p + ' minutes.', n * p + ' ÷ 60 = ' + ecr((n * p) / 60) + ' heures.'],
            },
            {
              texte: 'Question 2. Combien de mètres de fil faut-il au total ?',
              reponse: { type: 'nombre', valeur: total },
              aide: 'Multiplie le nombre de supports par la longueur de fil d’un support.',
              correction: [n + ' × ' + m + ' = ' + total + ' mètres.'],
            },
            {
              texte: 'Question 3. La petite bobine suffit-elle pour les ' + n + ' supports ?',
              reponse: O.choix(c.alea, suffit ? 'Oui, la bobine suffit' : 'Non, la bobine ne suffit pas', [suffit ? 'Non, la bobine ne suffit pas' : 'Oui, la bobine suffit']),
              aide: 'Compare la longueur de fil nécessaire à celle de la bobine.',
              correction: ['Il faut ' + total + ' mètres de fil, et la bobine en contient ' + L + '.', (suffit ? 'Oui, la bobine suffit' : 'Non, la bobine ne suffit pas') + '.'],
            },
            {
              texte: 'Question 4. Pour un support tout plat en bois, Moussa hésite entre l’impression 3D et la découpe laser. Explique la différence entre ces deux procédés, puis dis lequel tu choisis, et pourquoi.',
              correction: ['L’impression 3D ajoute de la matière, couche après couche.', 'La découpe laser retire de la matière autour de la forme.', 'Pour un support plat en bois, on choisit la découpe laser : elle part d’une plaque de bois.'],
              grille: ['As-tu dit que l’impression 3D ajoute de la matière ?', 'As-tu dit que la découpe laser retire de la matière ?', 'As-tu choisi un procédé pour le support plat et expliqué pourquoi ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Ajouter, retirer, plier, mouler : tu sais choisir la bonne façon de fabriquer chaque pièce.',
    carte: ['quel-procede', 'ajout-ou-retrait', 'temps-impression'],
    papierDuSoir: { exercices: ['temps-impression', 'longueur-de-fil', 'matiere-retiree'], defi: true },
    automatismes: [
      {
        id: 'heures-en-minutes',
        versions: [[2], [3], [4], [5]],
        genere(c) { const [h] = c.alea.choisir(this.versions); return { enonce: 'Combien de minutes dans ' + h + ' heures ?', reponse: { type: 'nombre', valeur: h * 60 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Togo, Kodjo Afate Gnikou a construit, pour cent dollars environ, une imprimante 3D de récupération.',
    prenoms: ['Moussa'],
  };
});
