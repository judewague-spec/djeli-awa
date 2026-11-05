/* Notion 22 du bloc « Mesures, géométrie et espace » : l'aire de la sphère et le volume de la boule. Le ballon d'Aminata et les oranges du marché.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'sphere-boule',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Sphère et boule',
    classe: '3e',
    univers: ['commerce', 'cuisine-restaurant'],

    accroche: {
      texte: 'Aminata épluche une orange, au marché. Elle étale les morceaux de peau sur la table, et trace autour de l’orange des cercles de même taille. Moussa compte. ' +
        'La peau remplit juste quatre disques ! Quatre disques, c’est tout ce qu’il faut pour envelopper une boule.',
      image: { dessin: 'solide', forme: 'boule', r: 4, cotes: { r: '4 cm' }, description: 'Une orange en forme de boule, de 4 centimètres de rayon. Une ligne fait le tour, au milieu, avec sa moitié arrière en pointillés.' },
    },

    manipulation: {
      etapes: [
        'La peau d’une orange recouvre quatre disques de même rayon que l’orange. L’aire de la peau, c’est donc quatre fois pi fois le rayon au carré.',
        'Prends maintenant une boîte cylindrique, juste assez grande pour contenir la boule.',
        'La boule occupe les deux tiers de cette boîte.',
        'Le calcul donne le volume : quatre tiers, fois pi, fois le rayon au cube.',
      ],
    },

    decouverte: {
      texte: (c) => 'Autour de l’orange, il y a ' + c.mot('sphere') + ' : elle n’a pas d’épaisseur, on mesure son aire. Avec tout l’intérieur, tu as ' + c.mot('boule') + ' : on mesure son volume. ' +
        'L’astuce : une aire, c’est un rayon au carré ; quatre pi, rayon au carré. Un volume, c’est un rayon au cube ; quatre tiers de pi, rayon au cube.',
    },

    vocabulaire: {
      termes: {
        sphere: { sesMots: 'la peau', officiel: 'la sphère', lesDeux: 'la peau, que l’on appelle la sphère' },
        boule: { sesMots: 'le fruit plein', officiel: 'la boule', lesDeux: 'le fruit plein, que l’on appelle la boule' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la peau, et le fruit plein. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la sphère, pour la peau. Et le fruit plein s’appelle la boule.',
        'Tu connais les mots officiels : la sphère, et la boule.',
      ],
    },

    exercices: [
      {
        id: 'aire-sphere',
        univers: 'commerce',
        versions: [[1], [2], [3], [4], [5], [6]],
        genere(c) {
          const [r] = c.alea.choisir(this.versions);
          const a = r2(4 * 3.14 * r * r);
          return {
            enonce: 'Un ballon a un rayon de ' + r + ' dm. Quelle est l’aire de sa surface, en dm² ? Prends 3,14 pour π.',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Quatre fois 3,14, fois le rayon au carré.',
            aideParlee: 'Quatre fois pi, fois le rayon au carré.',
            correction: [r + '² = ' + r * r + '.', '4 × 3,14 × ' + r * r + ' = ' + ecr(a) + ' dm².'],
          };
        },
      },
      {
        id: 'volume-boule',
        univers: 'cuisine-restaurant',
        versions: [[1], [2], [3], [4], [5], [6]],
        genere(c) {
          const [r] = c.alea.choisir(this.versions);
          const v = r2((4 / 3) * 3.14 * r * r * r);
          return {
            enonce: 'Un fruit bien rond a un rayon de ' + r + ' cm. Quel est son volume, en cm³, arrondi au centième ? Prends 3,14 pour π.',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Quatre tiers, fois 3,14, fois le rayon au cube.',
            aideParlee: 'Quatre tiers, fois pi, fois le rayon au cube.',
            correction: [r + '³ = ' + r * r * r + '.', '4 ÷ 3 × 3,14 × ' + r * r * r + ' ≈ ' + ecr(v) + ' cm³.'],
          };
        },
      },
      {
        id: 'rayon-depuis-diametre',
        univers: 'commerce',
        versions: [[20], [10], [6], [8], [24], [30]],
        genere(c) {
          const [d] = c.alea.choisir(this.versions);
          const a = r2(4 * 3.14 * (d / 2) * (d / 2));
          return {
            enonce: 'Une balle a un diamètre de ' + d + ' cm. Quelle est l’aire de sa surface, en cm² ? Prends 3,14 pour π.',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Le rayon est la moitié du diamètre. Puis quatre fois 3,14, fois le rayon au carré.',
            aideParlee: 'Le rayon est la moitié du diamètre. Puis quatre fois pi, fois le rayon au carré.',
            correction: ['Rayon : ' + d / 2 + ' cm.', '4 × 3,14 × ' + (d / 2) * (d / 2) + ' = ' + ecr(a) + ' cm².'],
          };
        },
      },
      {
        id: 'deux-tiers-du-cylindre',
        univers: 'cuisine-restaurant',
        // volume du cylindre autour de la boule
        versions: [[300], [90], [150], [600], [60], [120]],
        genere(c) {
          const [v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une boîte cylindrique contient juste une boule. Le volume de la boîte est de ' + v + ' cm³. Quel est le volume de la boule, en cm³ ?',
            reponse: { type: 'nombre', valeur: (v * 2) / 3 },
            aide: 'La boule occupe les deux tiers de la boîte.',
            correction: [v + ' × 2 ÷ 3 = ' + (v * 2) / 3 + ' cm³.'],
          };
        },
      },
      Q('aire-ou-volume', 'commerce',
        [['la quantité de jus dans une orange', 'Le volume de la boule'], ['la quantité de cuir nécessaire pour couvrir un ballon', 'L’aire de la sphère'], ['l’air contenu dans un ballon', 'Le volume de la boule'], ['la quantité de peinture pour un globe terrestre', 'L’aire de la sphère']],
        (x) => 'Pour connaître ' + x + ', que faut-il calculer ?', ['L’aire de la sphère', 'Le volume de la boule'],
        'Parle-t-on de ce qui recouvre, ou de ce qui remplit ?',
        'Ce qui recouvre : une aire. Ce qui remplit : un volume.'),
    ],

    defi: {
      // [rayon en cm d'une glace, hauteur du cylindre de bac = litres disponibles ×1000]
      versions: [[2, 2], [2, 5], [4, 5], [4, 10]],
      genere(c) {
        const [r, l] = c.alea.choisir(this.versions);
        const v = r2((4 / 3) * 3.14 * r * r * r), a = r2(4 * 3.14 * r * r), n = Math.floor((l * 1000) / v);
        return {
          enonce: 'Au restaurant, Laure sert des boules de glace de ' + r + ' cm de rayon. Elle dispose d’un bac de ' + l + ' L de glace. On prendra 3,14 pour π, et on rappelle que 1 L = 1 000 cm³.',
          image: { dessin: 'solide', forme: 'boule', r: 3, cotes: { r: r + ' cm' }, description: 'Une boule de ' + r + ' centimètres de rayon.' },
          questions: [
            {
              texte: 'Question 1. Calculer le volume d’une boule, en cm³, arrondi au centième.',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Quatre tiers, fois 3,14, fois le rayon au cube.',
              aideParlee: 'Quatre tiers, fois pi, fois le rayon au cube.',
              correction: ['4 ÷ 3 × 3,14 × ' + r * r * r + ' ≈ ' + ecr(v) + ' cm³.'],
            },
            {
              texte: 'Question 2. Combien de boules entières peut-elle servir ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Convertis le bac en centimètres cubes, puis divise. Garde seulement les boules entières.',
              correction: [l + ' L = ' + l * 1000 + ' cm³.', l * 1000 + ' ÷ ' + ecr(v) + ' donne ' + n + ' boules entières.'],
            },
            {
              texte: 'Question 3. Calculer l’aire de la surface d’une boule, en cm².',
              reponse: { type: 'nombre', valeur: a },
              aide: 'Quatre fois 3,14, fois le rayon au carré.',
              aideParlee: 'Quatre fois pi, fois le rayon au carré.',
              correction: ['4 × 3,14 × ' + r * r + ' = ' + ecr(a) + ' cm².'],
            },
            {
              texte: 'Question 4. Si le rayon double, par combien le volume de la boule est-il multiplié ? Justifier.',
              correction: ['Le rayon est multiplié par 2 : c’est un agrandissement de rapport 2.', 'Un volume est multiplié par le rapport au cube, soit par 8.'],
              grille: ['As-tu répondu par 8 ?', 'As-tu parlé du rapport au cube, ou de 2 × 2 × 2 ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! La peau ou le fruit, l’aire ou le volume : tu les distingues à coup sûr.',
    carte: ['aire-sphere', 'volume-boule', 'aire-ou-volume'],
    papierDuSoir: { exercices: ['volume-boule', 'rayon-depuis-diametre'], defi: true },
    automatismes: [
      {
        id: 'carre-et-cube',
        versions: [[2], [3], [10], [5]],
        genere(c) { const [a] = c.alea.choisir(this.versions); return { enonce: a + '³ = ?', reponse: { type: 'nombre', valeur: a * a * a } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Sicile, en Italie, Archimède a montré qu’une boule vaut les deux tiers du cylindre qui l’entoure.',
    prenoms: ['Aminata', 'Moussa', 'Laure'],
  };
});
