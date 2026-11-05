/* Notion 4 du bloc de technologie « Comment un objet fonctionne » : engrenages et chaîne du vélo (tours = dents menantes ÷ dents menée). Le vélo de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const TOURS = ['Plus de tours', 'Moins de tours', 'Autant de tours'];
  const plur = (n, mot) => mot + (n >= 2 ? 's' : '');

  return {
    id: 'rapport-engrenages',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Engrenages et chaîne du vélo',
    classe: 'cycle 4',
    univers: ['dehors', 'appareils', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : rapport de transmission d’un engrenage ou d’une chaîne.',

    accroche: {
      texte: 'Rachel monte une côte à vélo. Elle change de vitesse, et les pédales deviennent plus faciles. ' +
        'Moussa lui explique que la chaîne passe sur un autre pignon. La roue arrière ne tourne plus pareil.',
      image: { dessin: 'engrenage', dentsA: 48, dentsB: 24, lien: 'chaine', description: 'Le vélo de Rachel : le plateau a 48 dents, le pignon de la roue arrière a 24 dents, et une chaîne les relie.' },
    },

    manipulation: {
      type: 'engrenage',
      dentsA: 48,
      choix: [12, 16, 24, 48],
      depart: 24,
      lien: 'chaine',
      cible: 3,
      consigne: 'Voici le plateau du vélo de Rachel. Choisis le pignon pour que la roue arrière fasse trois tours à chaque tour de pédales.',
    },

    decouverte: {
      texte: (c) => 'Sur le vélo de Rachel, le plateau commande, et la roue arrière suit. ' +
        'Regarde le pignon, collé à la roue arrière : c’est ' + c.mot('menee') + '. ' +
        'Divise les dents du plateau par les dents du pignon. Regarde ce que tu obtiens : c’est ' + c.mot('rapport') + '. ' +
        'Plus le pignon est petit, plus la roue arrière tourne vite.',
    },

    vocabulaire: {
      termes: {
        menee: { sesMots: 'la roue qui suit', officiel: 'la roue menée', lesDeux: 'la roue qui suit. Les techniciens disent : la roue menée' },
        rapport: { sesMots: 'le nombre de tours du pignon pour un tour du plateau', officiel: 'le rapport de transmission', lesDeux: 'le nombre de tours du pignon pour un tour du plateau. Les techniciens disent : le rapport de transmission' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la roue qui suit, et le nombre de tours du pignon pour un tour du plateau. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la roue menée, pour la roue qui suit. Ils disent aussi : le rapport de transmission, pour le nombre de tours du pignon pour un tour du plateau.',
        'Tu connais les mots officiels : la roue menée, et le rapport de transmission.',
      ],
    },

    exercices: [
      {
        id: 'tours-du-pignon',
        univers: 'dehors',
        // [dents du plateau, dents du pignon]
        versions: [[48, 16], [48, 24], [48, 12], [36, 18], [45, 15], [50, 10]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const t = a / b;
          return {
            enonce: 'Sur le vélo de Rachel, le plateau a ' + a + ' dents et le pignon de la roue arrière a ' + b + ' dents. Pour un tour de pédales, combien de tours fait la roue arrière ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + a + ' ÷ ' + b + '.',
            aideParlee: 'Divise les dents du plateau par les dents du pignon.',
            correction: [a + ' ÷ ' + b + ' = ' + t + ' ' + plur(t, 'tour') + '.'],
          };
        },
      },
      {
        id: 'tours-de-la-roue',
        univers: 'appareils',
        // [dents de la roue menante, dents de la roue menée]
        versions: [[20, 40], [15, 60], [24, 48], [12, 48], [30, 40], [18, 24]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const t = a / b;
          return {
            enonce: 'Dans un engrenage, la roue menante a ' + a + ' dents et la roue menée a ' + b + ' dents. Combien de tours fait la roue menée pendant un tour de la roue menante ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + a + ' ÷ ' + b + '.',
            aideParlee: 'Divise les dents de la roue menante par les dents de la roue menée.',
            correction: [a + ' ÷ ' + b + ' = ' + O.ecr(t) + ' ' + plur(t, 'tour') + '.'],
          };
        },
      },
      {
        id: 'dents-du-pignon',
        univers: 'famille',
        // [dents du plateau, tours voulus de la roue arrière]
        versions: [[48, 3], [48, 4], [42, 3], [45, 3], [44, 4], [48, 2]],
        genere(c) {
          const [a, t] = c.alea.choisir(this.versions);
          const b = a / t;
          return {
            enonce: 'Le plateau du vélo a ' + a + ' dents. Rachel veut que la roue arrière fasse ' + t + ' tours à chaque tour de pédales. Combien de dents faut-il au pignon ?',
            reponse: { type: 'nombre', valeur: b },
            aide: 'Calcule ' + a + ' ÷ ' + t + '.',
            aideParlee: 'Divise les dents du plateau par le nombre de tours voulu.',
            correction: [a + ' ÷ ' + t + ' = ' + b + ' dents.'],
          };
        },
      },
      O.qcm('plus-de-tours', 'dehors',
        [
          ['plus petit', 'Plus de tours', 'Un petit pignon a peu de dents : le résultat de la division est plus grand.'],
          ['plus grand', 'Moins de tours', 'Un grand pignon a beaucoup de dents : le résultat de la division est plus petit.'],
          ['qui a moins de dents', 'Plus de tours', 'Moins de dents au pignon : la division donne un plus grand résultat.'],
          ['qui a plus de dents', 'Moins de tours', 'Plus de dents au pignon : la division donne un plus petit résultat.'],
        ],
        (x) => 'Le plateau ne change pas. Rachel passe la chaîne sur un pignon ' + x + '. Pour un tour de pédales, la roue arrière fait…', TOURS,
        'Plus le pignon a de dents, plus le résultat de la division est petit.'),
      {
        id: 'tours-par-minute',
        univers: 'famille',
        // [tours de pédales par minute, dents du plateau, dents du pignon]
        versions: [[60, 48, 16], [50, 48, 24], [80, 36, 12], [45, 42, 14], [70, 48, 16], [60, 45, 15]],
        genere(c) {
          const [m, a, b] = c.alea.choisir(this.versions);
          const t = a / b;
          return {
            enonce: 'Rachel pédale à ' + m + ' tours par minute. Le plateau a ' + a + ' dents et le pignon ' + b + ' dents. Combien de tours par minute fait la roue arrière ?',
            reponse: { type: 'nombre', valeur: m * t },
            aide: 'Calcule les tours de la roue pour un tour de pédales, puis multiplie par ' + m + '.',
            aideParlee: 'Calcule les tours de la roue pour un tour de pédales, puis multiplie par la cadence.',
            correction: [a + ' ÷ ' + b + ' = ' + t + ' tours de roue pour un tour de pédales.', m + ' × ' + t + ' = ' + (m * t) + ' tours par minute.'],
          };
        },
      },
    ],

    defi: {
      // [dents du plateau, dents du petit pignon, dents du grand pignon, question sur le plus (0) ou le moins (1) de tours]
      versions: [[48, 16, 24, 0], [48, 12, 24, 1], [42, 14, 21, 0], [36, 12, 18, 1], [48, 12, 16, 0]],
      genere(c) {
        const [a, p1, p2, mode] = c.alea.choisir(this.versions);
        const juste = mode === 0 ? 'Le pignon de ' + p1 + ' dents' : 'Le pignon de ' + p2 + ' dents';
        const autre = mode === 0 ? 'Le pignon de ' + p2 + ' dents' : 'Le pignon de ' + p1 + ' dents';
        return {
          enonce: 'Le vélo de Rachel a un plateau de ' + a + ' dents. À l’arrière, la chaîne peut passer sur un petit pignon de ' + p1 + ' dents ou sur un grand pignon de ' + p2 + ' dents.',
          image: { dessin: 'engrenage', dentsA: a, dentsB: p1, lien: 'chaine', description: 'Le plateau du vélo a ' + a + ' dents, le petit pignon ' + p1 + ' dents, le grand pignon ' + p2 + ' dents. Une chaîne relie le plateau au pignon choisi.' },
          questions: [
            {
              texte: 'Question 1. Avec le petit pignon, combien de tours fait la roue arrière pour un tour de pédales ?',
              reponse: { type: 'nombre', valeur: a / p1 },
              aide: 'Calcule ' + a + ' ÷ ' + p1 + '.',
              aideParlee: 'Divise les dents du plateau par les dents du petit pignon.',
              correction: [a + ' ÷ ' + p1 + ' = ' + (a / p1) + ' tours.'],
            },
            {
              texte: 'Question 2. Avec le grand pignon, combien de tours fait la roue arrière pour un tour de pédales ?',
              reponse: { type: 'nombre', valeur: a / p2 },
              aide: 'Calcule ' + a + ' ÷ ' + p2 + '.',
              aideParlee: 'Divise les dents du plateau par les dents du grand pignon.',
              correction: [a + ' ÷ ' + p2 + ' = ' + (a / p2) + ' tours.'],
            },
            {
              texte: 'Question 3. Quel pignon donne ' + (mode === 0 ? 'le plus' : 'le moins') + ' de tours de roue pour un tour de pédales ?',
              reponse: O.choix(c.alea, juste, [autre]),
              aide: 'Compare les résultats des deux premières questions.',
              correction: [mode === 0 ? 'Le petit pignon donne ' + (a / p1) + ' tours, plus que le grand pignon avec ' + (a / p2) + ' tours.' : 'Le grand pignon donne ' + (a / p2) + ' tours, moins que le petit pignon avec ' + (a / p1) + ' tours.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Explique à Rachel pourquoi elle choisit le grand pignon pour monter une côte.',
              correction: ['Avec le grand pignon, la roue arrière fait moins de tours à chaque tour de pédales.', 'Chaque tour de pédales demande moins d’effort : la montée est plus facile.'],
              grille: ['As-tu dit que le grand pignon donne moins de tours de roue pour un tour de pédales ?', 'As-tu relié cela à un effort plus faible, donc à une montée plus facile ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais compter les tours d’une roue avec les dents : tu choisis le bon pignon pour chaque route.',
    carte: ['tours-du-pignon', 'tours-de-la-roue', 'plus-de-tours'],
    papierDuSoir: { exercices: ['dents-du-pignon', 'tours-par-minute'], defi: true },
    automatismes: [
      {
        id: 'division-des-dents',
        versions: [[48, 12], [36, 12], [30, 10], [45, 15]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Royaume-Uni, en 1885, le vélo Rover de John Kemp Starley a une chaîne et deux roues de même taille.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
