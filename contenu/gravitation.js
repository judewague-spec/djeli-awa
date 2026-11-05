/* Notion 8 du bloc « Mouvement et forces » : la gravitation. La mangue, la Lune et la formule fournie.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  return {
    id: 'gravitation',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'La gravitation',
    classe: '3e',
    univers: ['espace', 'champetre', 'chansons'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : exploiter l’expression de la loi de gravitation universelle, la loi étant fournie.',

    accroche: {
      texte: 'Le soir, devant la forge, une mangue se détache et tombe. Rachel lève les yeux : la Lune est là, tout en haut. Rien ne la retient, aucune corde. ' +
        'Pourquoi la mangue tombe-t-elle, et pourquoi la Lune tourne-t-elle autour de nous sans s’en aller ? La réponse est la même pour les deux.',
      image: { dessin: 'attraction', gauche: 'La Terre', droite: 'La Lune', description: 'La Terre et la Lune, à distance. Deux flèches de même longueur et de sens opposés : la Terre attire la Lune, la Lune attire la Terre.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['F = G × m₁ × m₂ ÷ d²', 'Masses plus grandes : F plus grande', 'Distance plus grande : F plus petite'], description: 'F égale G fois m un fois m deux, divisé par d au carré. Si les masses grandissent, la force grandit. Si la distance grandit, la force diminue.' },
      etapes: [
        'Deux objets qui ont une masse s’attirent toujours, même sans se toucher.',
        'Cette attraction est très faible entre deux petits objets, et très forte quand un astre est en jeu.',
        'Les deux flèches ont la même valeur : la Lune attire la Terre autant que la Terre attire la Lune.',
        'Si la masse d’un des objets double, la force double.',
        'Si la distance double, la force est divisée par quatre, car la distance est au carré.',
        'La Lune tombe sans cesse vers la Terre, mais elle file si vite de côté qu’elle tourne autour d’elle.',
      ],
    },

    decouverte: {
      texte: (c) => 'Tout ce qui a une masse attire le reste : c’est ' + c.mot('gravitation') + '. C’est une action à distance. ' +
        'Elle est décrite par ' + c.mot('loi') + ', donnée dans les énoncés du brevet : F égale G fois les deux masses, divisé par la distance au carré. ' +
        'L’astuce : plus de masse, plus de force. Plus de distance, beaucoup moins de force.',
    },

    vocabulaire: {
      termes: {
        gravitation: { sesMots: 'l’attraction entre les masses', officiel: 'la gravitation', lesDeux: 'l’attraction entre les masses, que les physiciens appellent la gravitation' },
        loi: { sesMots: 'la formule de l’attraction', officiel: 'la loi de gravitation universelle', lesDeux: 'la formule de l’attraction, que les physiciens appellent la loi de gravitation universelle' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’attraction entre les masses, et la formule de l’attraction. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la gravitation, et la loi de gravitation universelle. Tu n’as pas à la retenir : elle est donnée, il faut savoir s’en servir.',
        'Tu connais les mots officiels : la gravitation, et la loi de gravitation universelle.',
      ],
    },

    exercices: [
      O.qcm('qui-attire-qui', 'espace',
        [['La Terre attire la Lune. Que fait la Lune ?', 'Elle attire la Terre avec la même force'], ['Le Soleil attire la Terre. Que fait la Terre ?', 'Elle attire le Soleil avec la même force'], ['La Terre attire une mangue. Que fait la mangue ?', 'Elle attire la Terre avec la même force']],
        (x) => x, ['Elle attire la Terre avec la même force', 'Elle attire le Soleil avec la même force', 'Elle n’attire rien'],
        'Les deux forces ont toujours la même valeur et des sens opposés.'),
      {
        id: 'si-la-masse-change',
        univers: 'espace',
        // [force en newtons, facteur sur la masse]
        versions: [[20, 2], [15, 3], [40, 2], [30, 4], [12, 5]],
        genere(c) {
          const [f, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Deux objets s’attirent avec une force de ' + f + ' N. On multiplie la masse de l’un d’eux par ' + k + ', sans changer la distance. Quelle est la nouvelle force, en newtons ?',
            reponse: { type: 'nombre', valeur: f * k },
            aide: 'La force est multipliée par ' + k + '.',
            aideParlee: 'La force est multipliée par le même nombre que la masse.',
            correction: [f + ' × ' + k + ' = ' + f * k + ' N.'],
          };
        },
      },
      {
        id: 'si-la-distance-change',
        univers: 'espace',
        // [force en newtons, facteur sur la distance]
        versions: [[36, 2], [90, 3], [80, 2], [100, 2], [45, 3], [160, 4]],
        genere(c) {
          const [f, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Deux objets s’attirent avec une force de ' + f + ' N. On multiplie la distance entre eux par ' + k + '. Quelle est la nouvelle force, en newtons ?',
            reponse: { type: 'nombre', valeur: f / (k * k) },
            aide: 'La distance est au carré : la force est divisée par ' + k + ' × ' + k + '.',
            aideParlee: 'La distance est au carré dans la formule : la force est divisée par ce nombre multiplié par lui-même.',
            correction: [k + ' × ' + k + ' = ' + k * k + '.', f + ' ÷ ' + k * k + ' = ' + f / (k * k) + ' N.'],
          };
        },
      },
      O.qcm('pourquoi-ca-tourne', 'espace',
        [['Ce qui maintient la Lune autour de la Terre :', 'L’attraction de la Terre'], ['Ce qui maintient la Terre autour du Soleil :', 'L’attraction du Soleil'], ['Ce qui fait tomber une mangue mûre :', 'L’attraction de la Terre']],
        (x) => x, ['L’attraction de la Terre', 'L’attraction du Soleil', 'Le vent'],
        'Cherche l’astre le plus massif, tout près de l’objet.'),
      O.qcm('la-declaration', 'chansons',
        [['« Plus tu es loin, moins je t’attire. » Quelle grandeur dit cette chanson ?', 'La distance'], ['« Plus j’ai de matière, plus je t’attire. » Quelle grandeur dit cette chanson ?', 'La masse']],
        (x) => x, ['La distance', 'La masse', 'La vitesse'],
        'La force grandit avec les masses. Elle diminue avec la distance.'),
    ],

    defi: {
      // [astre A, astre B, formule posée, force écrite] : calcul à la calculatrice, résultat recalculé dans le test
      versions: [
        ['la Terre', 'la Lune', '6 × 10²⁴ kg', '7 × 10²² kg', '3,8 × 10⁸ m', '2 × 10²⁰ N', ['2 × 10¹⁰ N', '2 × 10³⁰ N'], 'de la Terre', 'de la Lune'],
        ['le Soleil', 'la Terre', '2 × 10³⁰ kg', '6 × 10²⁴ kg', '1,5 × 10¹¹ m', '3,6 × 10²² N', ['3,6 × 10¹² N', '3,6 × 10³² N'], 'du Soleil', 'de la Terre'],
      ],
      genere(c) {
        const [a, b, ma, mb, d, f, autres, da, db] = c.alea.choisir(this.versions);
        const maj = (x) => x.replace(/^./, (l) => l.toUpperCase());
        return {
          enonce: 'Document : la loi de gravitation universelle dit que F = G × m₁ × m₂ ÷ d², avec G = 6,7 × 10⁻¹¹ en unités du système international. Masse ' + da + ' : ' + ma + '. Masse ' + db + ' : ' + mb + '. Distance entre les deux : ' + d + '.',
          image: { dessin: 'attraction', gauche: maj(a), droite: maj(b), description: maj(a) + ' et ' + b + ', à distance. Deux flèches de même longueur et de sens opposés montrent que les deux astres s’attirent l’un l’autre.' },
          questions: [
            {
              texte: 'Question 1. Avec ta calculatrice, trouve l’ordre de grandeur de la force d’attraction.',
              reponse: O.choix(c.alea, f, autres),
              aide: 'Multiplie G par les deux masses, puis divise par la distance au carré.',
              correction: ['F = 6,7 × 10⁻¹¹ × ' + ma.replace(' kg', '') + ' × ' + mb.replace(' kg', '') + ' ÷ (' + d.replace(' m', '') + ')².', 'Réponse : ' + f + '.'],
            },
            {
              texte: 'Question 2. Si la distance entre les deux astres était deux fois plus grande, par combien la force serait-elle divisée ?',
              reponse: { type: 'nombre', valeur: 4 },
              aide: 'La distance est au carré dans la formule.',
              correction: ['2 × 2 = 4 : la force serait divisée par 4.'],
            },
            {
              texte: 'Question 3. Explique en une phrase pourquoi on parle d’action à distance, puis dis si ' + b + ' attire aussi ' + a + '.',
              correction: ['Les deux astres ne se touchent pas : l’action se fait à distance. Et oui, ' + b + ' attire aussi ' + a + ', avec une force de même valeur.'],
              grille: ['As-tu dit que les astres ne se touchent pas ?', 'As-tu dit que l’attraction marche dans les deux sens ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une mangue qui tombe et une Lune qui tourne : tu sais que c’est la même attraction.',
    carte: ['qui-attire-qui', 'si-la-masse-change', 'si-la-distance-change'],
    papierDuSoir: { exercices: ['si-la-masse-change', 'si-la-distance-change'], defi: true },
    automatismes: [
      {
        id: 'carre-rapide',
        versions: [2, 3, 4, 5],
        genere(c) { const k = c.alea.choisir(this.versions); return { enonce: k + ' × ' + k + ' = ?', reponse: { type: 'nombre', valeur: k * k } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Angleterre, Isaac Newton a publié son grand livre, les Principia, en 1687. Il y montre que toute matière attire toute matière.',
    prenoms: ['Rachel'],
  };
});
