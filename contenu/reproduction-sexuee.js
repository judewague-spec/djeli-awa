/* Notion 7 du bloc SVT « Le vivant et son évolution » : la reproduction sexuée. Les fleurs de courge d'Aminata.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ETAPES = ['Le pollen quitte une fleur', 'Il arrive sur une autre fleur', 'Les deux gamètes s’unissent', 'La fleur devient un fruit'];

  return {
    id: 'reproduction-sexuee',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'La reproduction sexuée',
    classe: 'cycle 4',
    univers: ['champetre', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : reproduction sexuée, gamètes et fécondation, chez les animaux et les plantes.',

    accroche: {
      texte: 'Dans le potager, Aminata regarde une abeille entrer dans une fleur de courge, puis ressortir couverte de poudre jaune. Elle va dans une autre fleur. ' +
        'Quelques semaines plus tard, cette fleur est devenue une courge, pleine de graines. Qu’a fait l’abeille ?',
      image: { dessin: 'chaine', etapes: ETAPES, description: 'Le pollen quitte une fleur ; il arrive sur une autre fleur ; les deux gamètes s’unissent ; la fleur devient un fruit, avec des graines.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Fleurs libres', parts: 8 }, { nom: 'Sous un filet', parts: 1 }], description: 'Deux barres : les fleurs libres donnent beaucoup de fruits ; les fleurs sous un filet, que les insectes n’atteignent pas, en donnent très peu.' },
      etapes: [
        'La poudre jaune, c’est le pollen. Il contient la cellule mâle de la plante.',
        'Au fond de la fleur, il y a l’ovule : il contient la cellule femelle.',
        'L’abeille, le vent ou la main transportent le pollen d’une fleur à l’autre.',
        'Les deux cellules s’unissent : c’est le début d’une graine. Chaque graine donnera une plante un peu différente.',
        'Chez les animaux aussi, un spermatozoïde et un ovule s’unissent. Le petit a deux parents.',
      ],
    },

    decouverte: {
      texte: (c) => 'Deux parents donnent chacun une cellule spéciale, un gamète. On parle alors de ' + c.mot('sexuee') + '. Chez les plantes à fleurs, tout commence par ' + c.mot('pollinisation') + '. ' +
        'Les deux gamètes s’unissent, et cela donne une graine. ' +
        'L’astuce : deux parents, donc un petit différent de chacun d’eux.',
    },

    vocabulaire: {
      termes: {
        sexuee: { sesMots: 'la reproduction à deux parents', officiel: 'la reproduction sexuée', lesDeux: 'la reproduction à deux parents, que les scientifiques appellent la reproduction sexuée' },
        pollinisation: { sesMots: 'le voyage du pollen', officiel: 'la pollinisation', lesDeux: 'le voyage du pollen, que l’on appelle la pollinisation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la reproduction à deux parents, et le voyage du pollen. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la reproduction sexuée, et la pollinisation pour le voyage du pollen. L’union des deux gamètes est la fécondation.',
        'Tu connais les mots officiels : la reproduction sexuée, les gamètes, la pollinisation et la fécondation.',
      ],
    },

    exercices: [
      {
        id: 'etape-suivante',
        univers: 'champetre',
        versions: [0, 1, 2],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = ETAPES[i + 1];
          return {
            enonce: 'Que se passe-t-il juste après cette étape : « ' + ETAPES[i] + ' » ?',
            reponse: O.choix(c.alea, bonne, ETAPES.filter((_, k) => k !== i)),
            aide: 'Le pollen voyage d’abord. Les gamètes s’unissent ensuite. Le fruit vient à la fin.',
            correction: ['L’ordre : ' + ETAPES.join(', puis ').toLowerCase() + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      O.qcm('qui-transporte', 'champetre',
        [['l’abeille qui va de fleur en fleur', 'Un insecte'], ['le maïs, dont le pollen léger flotte dans l’air', 'Le vent'], ['le papillon sur les fleurs du jardin', 'Un insecte'], ['le palmier dattier, que l’on féconde en montant au sommet', 'Une main humaine']].map((v) => [v[0], v[1], 'Les insectes portent le pollen sur leur corps, le vent emporte le pollen léger, et les paysans peuvent le déposer à la main.']),
        (x) => 'Qui transporte le pollen dans ce cas : ' + x + ' ?', ['Un insecte', 'Le vent', 'Une main humaine'],
        'Lis bien la situation : elle dit presque tout.'),
      O.qcm('vrai-ou-faux', 'famille',
        [['Dans la reproduction sexuée, il y a deux parents.', 'Vrai'], ['Le petit est la copie exacte d’un de ses parents.', 'Faux'], ['Le pollen contient une cellule mâle.', 'Vrai'], ['Une graine se forme sans pollen, chez la courge du potager.', 'Faux']].map((v) => [v[0], v[1], 'Deux parents donnent chacun un gamète : le pollen porte la cellule mâle. Le petit est différent de ses parents. Sans pollen, pas de graine chez la courge.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Deux parents donnent chacun un gamète.'),
      {
        id: 'graines-en-tout',
        univers: 'champetre',
        // [fruits, graines par fruit]
        versions: [[6, 40], [8, 25], [5, 60], [12, 30], [4, 150], [10, 35]],
        genere(c) {
          const [f, g] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure récolte ' + f + ' courges. Chacune contient ' + g + ' graines. Combien de graines cela fait-il ?',
            reponse: { type: 'nombre', valeur: f * g },
            aide: 'Calcule ' + f + ' × ' + g + '.',
            aideParlee: 'Multiplie le nombre de courges par le nombre de graines d’une courge.',
            correction: [f + ' × ' + g + ' = ' + f * g + ' graines.'],
          };
        },
      },
      {
        id: 'fleurs-sans-fruit',
        univers: 'champetre',
        // [fleurs, fruits]
        versions: [[40, 32], [25, 18], [30, 24], [50, 35], [60, 45], [20, 17]],
        genere(c) {
          const [f, r] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur un pied de courge, il y a ' + f + ' fleurs. Seulement ' + r + ' donnent un fruit. Combien de fleurs ne donnent pas de fruit ?',
            reponse: { type: 'nombre', valeur: f - r },
            aide: 'Calcule ' + f + ' − ' + r + '.',
            aideParlee: 'Enlève le nombre de fruits au nombre de fleurs.',
            correction: [f + ' − ' + r + ' = ' + (f - r) + ' fleurs sans fruit.'],
          };
        },
      },
    ],

    defi: {
      // [fleurs de chaque lot, fruits avec insectes, fruits sous filet]
      versions: [[20, 16, 1], [30, 24, 3], [40, 30, 2], [50, 40, 5]],
      genere(c) {
        const [n, a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Expérience : Rachel choisit deux lots de ' + n + ' fleurs de courge. Le lot A reste libre : les insectes y viennent. Le lot B est sous un filet fin : les insectes n’y entrent pas. À la fin, le lot A a donné ' + a + ' fruits, et le lot B ' + b + '.',
          image: { dessin: 'barres', barres: [{ nom: 'Lot A', parts: Math.round(a / 2) }, { nom: 'Lot B', parts: Math.max(1, Math.round(b / 2)) }], description: 'Deux barres, sans échelle exacte : le lot A a donné bien plus de fruits que le lot B.' },
          questions: [
            {
              texte: 'Question 1. Combien de fruits de plus le lot A a-t-il donnés ?',
              reponse: { type: 'nombre', valeur: a - b },
              aide: 'Fais la différence entre les deux lots.',
              correction: [a + ' − ' + b + ' = ' + (a - b) + ' fruits de plus.'],
            },
            {
              texte: 'Question 2. Quel est le seul facteur qui change entre les deux lots ?',
              reponse: O.choix(c.alea, 'La venue des insectes', ['La venue des insectes', 'Le nombre de fleurs', 'L’espèce de la plante']),
              aide: 'Le nombre de fleurs est le même. Que fait le filet ?',
              correction: ['Le filet empêche les insectes d’arriver.', 'Réponse : La venue des insectes.'],
            },
            {
              texte: 'Question 3. Rédige une conclusion : quel est le rôle des insectes pour la courge ?',
              correction: ['Sans insectes, très peu de fleurs donnent un fruit.', 'Les insectes transportent le pollen : ils permettent la pollinisation, puis la fécondation.'],
              grille: ['As-tu utilisé les résultats des deux lots ?', 'As-tu dit que les insectes transportent le pollen ?', 'As-tu nommé la pollinisation ou la fécondation ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Pollen, gamètes, graine : tu sais pourquoi l’abeille compte tant pour le potager.',
    carte: ['etape-suivante', 'qui-transporte', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['graines-en-tout', 'fleurs-sans-fruit'], defi: true },
    automatismes: [
      {
        id: 'combien-de-parents',
        versions: [['sexuée', 'Deux parents']],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Reproduction ' + d + ' : combien de parents ?', reponse: O.choix(c.alea, b, ['Un parent', 'Deux parents']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À La Réunion, en France, en 1841, Edmond Albius, esclave de 12 ans, pollinise la vanille à la main.',
    prenoms: ['Aminata', 'Laure', 'Rachel'],
  };
});
