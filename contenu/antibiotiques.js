/* Notion 13 du bloc SVT « Le corps humain et la santé » : les antibiotiques et la résistance. L'angine de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const OUI = 'Oui, il agit', NON = 'Non, il n’agit pas';

  return {
    id: 'antibiotiques',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Les antibiotiques et la résistance',
    classe: 'cycle 4',
    univers: ['famille', 'commerce'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : antibiotiques, résistance des bactéries.',

    accroche: {
      texte: 'Moussa a mal à la gorge. Le médecin fait un test : c’est une angine due à une bactérie. Il prescrit un médicament pour sept jours. ' +
        'Au bout de trois jours, Moussa va mieux et veut arrêter. Mais la semaine d’avant, pour la grippe de Rachel, le médecin n’avait rien donné de ce genre. Pourquoi ?',
      image: { dessin: 'chaine', etapes: ['Une infection par des bactéries', 'Le médecin prescrit le médicament', 'Il tue les bactéries', 'On le prend jusqu’au bout'], description: 'Le bon usage du médicament contre les bactéries : prescrit par le médecin, pris jusqu’au bout.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Avant', parts: 9 }, { nom: 'Traitement arrêté trop tôt', parts: 2 }, { nom: 'Quelques jours après', parts: 8 }], description: 'Trois barres : beaucoup de bactéries avant ; peu après un traitement arrêté trop tôt ; puis elles se multiplient à nouveau, et les survivantes résistent mieux.' },
      etapes: [
        'Ce médicament tue les bactéries, ou les empêche de se multiplier. Il ne fait rien contre les virus, comme celui de la grippe.',
        'Parmi des millions de bactéries, quelques-unes résistent un peu mieux au médicament.',
        'Si on arrête trop tôt, ces survivantes se multiplient : la maladie revient, plus dure à soigner.',
        'Avec le temps, à force de mauvais usages, des bactéries deviennent insensibles au médicament.',
      ],
    },

    decouverte: {
      texte: (c) => 'Contre une infection due à des bactéries, le médecin prescrit ' + c.mot('antibiotique') + '. Il agit sur les bactéries, jamais sur les virus. ' +
        'Mal utilisé, il favorise des bactéries qui ne meurent plus : c’est la résistance. ' +
        'L’astuce : seulement sur ordonnance, et jusqu’au dernier jour, même quand on va mieux.',
    },

    vocabulaire: {
      termes: {
        antibiotique: { sesMots: 'un médicament anti-bactéries', officiel: 'un antibiotique', lesDeux: 'un médicament anti-bactéries, que les scientifiques appellent un antibiotique' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un médicament anti-bactéries. Il ne soigne pas les maladies dues aux virus. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : un antibiotique. Et des bactéries qui ne meurent plus avec lui sont des bactéries résistantes.',
        'Tu connais les mots officiels : les antibiotiques agissent sur les bactéries ; leur mauvais usage favorise la résistance des bactéries.',
      ],
    },

    exercices: [
      {
        id: 'agit-ou-pas',
        univers: 'famille',
        versions: [['une angine due à une bactérie', OUI], ['la grippe, due à un virus', NON], ['un rhume, dû à un virus', NON], ['une infection urinaire due à une bactérie', OUI], ['la varicelle, due à un virus', NON]],
        genere(c) {
          const [maladie, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un antibiotique agit-il contre ' + maladie + ' ?',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Bactérie : oui. Virus : non.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'comprimes',
        univers: 'commerce',
        // [comprimés par jour, jours]
        versions: [[2, 7], [3, 7], [2, 10], [3, 5], [2, 6], [3, 8]],
        genere(c) {
          const [p, j] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’ordonnance de Moussa dit : ' + p + ' comprimés par jour pendant ' + j + ' jours. Combien de comprimés doit-il prendre en tout ?',
            reponse: { type: 'nombre', valeur: p * j },
            aide: 'Calcule ' + p + ' × ' + j + '.',
            aideParlee: 'Multiplie le nombre de comprimés par jour par le nombre de jours.',
            correction: [p + ' × ' + j + ' = ' + p * j + ' comprimés.'],
          };
        },
      },
      {
        id: 'survivantes',
        univers: 'famille',
        // [bactéries résistantes qui survivent, nombre de divisions ensuite]
        versions: [[5, 3], [10, 4], [3, 5], [8, 3], [6, 4], [2, 6]],
        genere(c) {
          const [r, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Après un traitement arrêté trop tôt, ' + r + ' bactéries résistantes survivent. Chacune se divise en deux, puis encore, ' + k + ' fois de suite. Combien y en a-t-il ensuite ?',
            reponse: { type: 'nombre', valeur: r * 2 ** k },
            aide: 'Chaque division double le nombre : ' + r + ' × 2 puissance ' + k + '.',
            aideParlee: 'Chaque division double le nombre : multiplie par deux autant de fois qu’il y a de divisions.',
            correction: ['2 puissance ' + k + ' = ' + 2 ** k + '.', r + ' × ' + 2 ** k + ' = ' + r * 2 ** k + ' bactéries résistantes.'],
          };
        },
      },
      {
        id: 'bon-usage',
        univers: 'commerce',
        versions: [['Prendre l’antibiotique jusqu’au dernier jour prescrit.', 'Bon usage'], ['Garder les comprimés restants pour la prochaine fois.', 'Mauvais usage'], ['Prendre l’antibiotique d’une amie pour un rhume.', 'Mauvais usage'], ['Prendre un antibiotique seulement sur ordonnance.', 'Bon usage']],
        genere(c) {
          const [geste, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Bon ou mauvais usage des antibiotiques ? « ' + geste + ' »',
            reponse: O.choix(c.alea, bonne, ['Bon usage', 'Mauvais usage']),
            aide: 'Sur ordonnance, pour les bactéries, jusqu’au bout.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'jours-restants',
        univers: 'famille',
        versions: [[7, 3], [10, 4], [7, 2], [8, 5], [6, 3], [10, 6]],
        genere(c) {
          const [t, f] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le traitement d’Aminata dure ' + t + ' jours. Elle se sent mieux au bout de ' + f + ' jours. Combien de jours de traitement lui reste-t-il à suivre ?',
            reponse: { type: 'nombre', valeur: t - f },
            aide: 'On va jusqu’au bout : ' + t + ' − ' + f + '.',
            aideParlee: 'On va jusqu’au bout du traitement : fais la différence.',
            correction: [t + ' − ' + f + ' = ' + (t - f) + ' jours : il faut les faire tous, même en allant mieux.'],
          };
        },
      },
    ],

    defi: {
      // [comprimés par jour, jours, jours où il se sent mieux, résistantes qui survivraient, divisions]
      versions: [[2, 7, 3, 4, 5], [3, 7, 2, 5, 4], [2, 10, 4, 3, 6], [3, 6, 3, 6, 4]],
      genere(c) {
        const [p, j, f, r, k] = c.alea.choisir(this.versions);
        return {
          enonce: 'Le médecin prescrit à Moussa un antibiotique contre une angine due à une bactérie : ' + p + ' comprimés par jour pendant ' + j + ' jours. Au bout de ' + f + ' jours, il se sent mieux.',
          questions: [
            {
              texte: 'Question 1. Combien de comprimés doit-il prendre en tout ?',
              reponse: { type: 'nombre', valeur: p * j },
              aide: 'Comprimés par jour fois nombre de jours.',
              correction: [p + ' × ' + j + ' = ' + p * j + ' comprimés.'],
            },
            {
              texte: 'Question 2. S’il arrête trop tôt, ' + r + ' bactéries résistantes survivent, puis se divisent ' + k + ' fois de suite. Combien y en aurait-il ?',
              reponse: { type: 'nombre', valeur: r * 2 ** k },
              aide: 'Le nombre double à chaque division.',
              correction: [r + ' × ' + 2 ** k + ' = ' + r * 2 ** k + ' bactéries résistantes.'],
            },
            {
              texte: 'Question 3. Explique à Moussa pourquoi il doit finir son traitement.',
              correction: ['Quand il se sent mieux, il reste encore des bactéries, souvent les plus résistantes.', 'S’il arrête, elles se multiplient : la maladie peut revenir, plus dure à soigner, et des bactéries résistantes se répandent.'],
              grille: ['As-tu dit qu’il reste des bactéries même quand on va mieux ?', 'As-tu parlé de la multiplication des bactéries résistantes ?', 'As-tu fait une phrase de conclusion ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Contre les bactéries seulement, sur ordonnance, et jusqu’au bout : tu sais bien utiliser ces médicaments.',
    carte: ['agit-ou-pas', 'bon-usage', 'comprimes'],
    papierDuSoir: { exercices: ['survivantes', 'jours-restants'], defi: true },
    automatismes: [
      {
        id: 'bacterie-ou-virus',
        versions: [['la grippe', NON], ['une angine bactérienne', OUI], ['un rhume', NON]],
        genere(c) { const [m, b] = c.alea.choisir(this.versions); return { enonce: 'Antibiotique contre ' + m + ' ?', reponse: O.choix(c.alea, b, [OUI, NON]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 1928, Alexander Fleming a vu que, autour d’une moisissure, des bactéries ne poussaient plus : c’est le début de la pénicilline.',
    prenoms: ['Moussa', 'Rachel', 'Aminata'],
  };
});
