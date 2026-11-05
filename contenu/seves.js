/* Notion 5 du bloc SVT « Le vivant et son évolution » : les sèves. La fleur blanche d'Esther.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const BRUTE = 'La sève brute', ELABOREE = 'La sève élaborée';

  return {
    id: 'seves',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Les sèves',
    classe: 'cycle 4',
    univers: ['champetre', 'maison-courses'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : circulation de la sève brute et de la sève élaborée dans la plante.',

    accroche: {
      texte: 'Esther met une fleur blanche dans un verre d’eau avec du colorant bleu. Le lendemain, les pétales sont devenus bleus ! ' +
        'L’eau est montée toute seule, par la tige, jusqu’en haut. Une plante a donc ses tuyaux, elle aussi.',
      image: { dessin: 'chaine', etapes: ['Les racines absorbent eau et sels', 'La tige fait monter cette sève', 'Les feuilles fabriquent le sucre', 'Le sucre part vers toute la plante'], description: 'Les racines absorbent l’eau et les sels minéraux ; la tige fait monter cette sève ; les feuilles fabriquent le sucre ; une autre sève l’emporte vers toute la plante.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Monte', parts: 4 }, { nom: 'Repart', parts: 4 }], description: 'Deux barres de même longueur : une sève monte des racines aux feuilles, l’autre repart des feuilles vers toute la plante.' },
      etapes: [
        'Sous la terre, de très fins poils des racines absorbent l’eau et les sels minéraux.',
        'Ce mélange monte jusqu’aux feuilles, dans de fins tuyaux. Il ressemble à de l’eau : pas de sucre dedans.',
        'Dans les feuilles, à la lumière, la plante fabrique du sucre.',
        'Ce sucre part dans d’autres tuyaux, vers tout ce qui grandit ou fait des réserves : les fruits, les racines, les jeunes pousses.',
      ],
    },

    decouverte: {
      texte: (c) => 'Dans une plante, deux liquides circulent. ' + c.mot('brute') + ' va des racines aux feuilles. Elle porte l’eau et les sels minéraux. ' +
        c.mot('elaboree') + ' part des feuilles vers toute la plante, avec le sucre. ' +
        'L’astuce : la première apporte les ingrédients à la cuisine ; la seconde livre le plat.',
    },

    vocabulaire: {
      termes: {
        brute: { sesMots: 'La sève qui monte', officiel: 'La sève brute', lesDeux: 'La sève qui monte, que l’on appelle la sève brute,' },
        elaboree: { sesMots: 'La sève sucrée', officiel: 'La sève élaborée', lesDeux: 'La sève sucrée, que l’on appelle la sève élaborée,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la sève qui monte, et la sève sucrée. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la sève brute, pour celle qui monte des racines. La sève élaborée, pour celle qui porte le sucre.',
        'Tu connais les mots officiels : la sève brute, la sève élaborée et les sels minéraux.',
      ],
    },

    exercices: [
      O.qcm('quelle-seve', 'champetre',
        [['Elle monte des racines vers les feuilles.', BRUTE], ['Elle contient le sucre fabriqué par les feuilles.', ELABOREE], ['Elle contient de l’eau et des sels minéraux.', BRUTE], ['Elle nourrit les fruits qui grandissent.', ELABOREE]].map((v) => [v[0], v[1], 'La sève brute monte des racines avec l’eau et les sels minéraux. La sève élaborée part des feuilles avec le sucre.']),
        (x) => x + ' De quelle sève parle-t-on ?', [BRUTE, ELABOREE],
        'Celle qui monte apporte l’eau et les sels. L’autre porte le sucre.'),
      O.qcm('ou-absorbe', 'champetre',
        [['Par où une plante absorbe-t-elle surtout l’eau ?', 'Par les poils des racines'], ['Où le sucre est-il fabriqué ?', 'Dans les feuilles vertes'], ['Par où la sève monte-t-elle vers les feuilles ?', 'Dans les tuyaux de la tige']].map((v) => [v[0], v[1], 'Les poils des racines absorbent l’eau, la tige la fait monter, et les feuilles vertes fabriquent le sucre.']),
        (x) => x, ['Par les poils des racines', 'Dans les feuilles vertes', 'Dans les tuyaux de la tige'],
        'Racines, tige, feuilles : suis le trajet de bas en haut.'),
      O.qcm('explique-la-fleur', 'maison-courses',
        [['Pourquoi la fleur blanche devient-elle bleue ?', 'L’eau colorée monte par la tige'], ['Que montre le colorant qui arrive dans les pétales ?', 'L’eau colorée monte par la tige']].map((v) => [v[0], v[1], 'Le colorant était dans l’eau du verre : il est monté avec elle, par les tuyaux de la tige, jusqu’aux pétales.']),
        (x) => x, ['L’eau colorée monte par la tige', 'La fleur fabrique du bleu', 'Le colorant vient de l’air'],
        'Le colorant était dans l’eau du verre.'),
      {
        id: 'hauteur-montee',
        univers: 'maison-courses',
        // [cm par heure, heures]
        versions: [[3, 4], [5, 6], [2, 8], [4, 5], [6, 3], [10, 2]],
        genere(c) {
          const [v, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans une tige de fleur, le colorant monte de ' + v + ' cm par heure. De combien de centimètres monte-t-il en ' + h + ' heures ?',
            reponse: { type: 'nombre', valeur: v * h },
            aide: 'Calcule ' + v + ' × ' + h + '.',
            aideParlee: 'Multiplie la hauteur d’une heure par le nombre d’heures.',
            correction: [v + ' × ' + h + ' = ' + v * h + ' cm.'],
          };
        },
      },
      {
        id: 'eau-absorbee',
        univers: 'champetre',
        // [litres par jour, pieds de tomate]
        versions: [[2, 6], [1, 12], [3, 5], [2, 15], [4, 3], [1, 20]],
        genere(c) {
          const [l, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans le potager de Laure, chaque pied de tomate absorbe ' + l + ' L d’eau par jour. Combien de litres absorbent ' + n + ' pieds chaque jour ?',
            reponse: { type: 'nombre', valeur: l * n },
            aide: 'Calcule ' + l + ' × ' + n + '.',
            aideParlee: 'Multiplie l’eau d’un pied par le nombre de pieds.',
            correction: [l + ' × ' + n + ' = ' + l * n + ' L.'],
          };
        },
      },
    ],

    defi: {
      // [hauteur de la plante en cm, cm monté par heure]
      versions: [[20, 5], [30, 5], [24, 6], [18, 3]],
      genere(c) {
        const [h, v] = c.alea.choisir(this.versions);
        return {
          enonce: 'Expérience : on plonge dans de l’eau colorée une tige de céleri de ' + h + ' cm. Le colorant monte de ' + v + ' cm par heure. Au microscope, une coupe de la tige montre de petits points colorés : ce sont des tuyaux. Le reste de la tige n’est pas coloré.',
          questions: [
            {
              texte: 'Question 1. En combien d’heures le colorant arrive-t-il en haut de la tige ?',
              reponse: { type: 'nombre', valeur: h / v },
              aide: 'Divise la hauteur de la tige par la hauteur montée en une heure.',
              correction: [h + ' ÷ ' + v + ' = ' + h / v + ' heures.'],
            },
            {
              texte: 'Question 2. Quelle sève suit le même chemin que ce colorant ?',
              reponse: O.choix(c.alea, BRUTE, [BRUTE, ELABOREE]),
              aide: 'Le colorant monte depuis le bas de la tige.',
              correction: ['Il monte du bas vers le haut, comme l’eau venue des racines.', 'Réponse : ' + BRUTE + '.'],
            },
            {
              texte: 'Question 3. Que montre la coupe de la tige ? Explique le rôle de ces petits tuyaux.',
              correction: ['Seuls de petits tuyaux sont colorés : l’eau ne passe pas partout, elle circule dans ces vaisseaux.', 'Ils transportent la sève brute des racines vers les feuilles.'],
              grille: ['As-tu dit que l’eau circule dans des tuyaux, ou vaisseaux ?', 'As-tu indiqué le sens : des racines vers les feuilles ?', 'As-tu nommé la sève brute ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! L’une monte, l’autre livre le sucre : tu sais ce qui circule dans une plante.',
    carte: ['quelle-seve', 'ou-absorbe', 'explique-la-fleur'],
    papierDuSoir: { exercices: ['hauteur-montee', 'eau-absorbee'], defi: true },
    automatismes: [
      {
        id: 'seve-rapide',
        versions: [['qui monte des racines', BRUTE], ['qui porte le sucre', ELABOREE]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'La sève ' + d + ' ?', reponse: O.choix(c.alea, b, [BRUTE, ELABOREE]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, le vin de palme, appelé mimbo, vient de la sève tirée d’un palmier.',
    prenoms: ['Esther', 'Laure'],
  };
});
