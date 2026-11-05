/* Notion 12 du bloc « Proportionnalité, pourcentages et fonctions » : lire une fonction dans un tableau et sur un graphique. Les recettes d'Aminata.
   Chaque graphique annonce ses valeurs : dans sa description et dans l'énoncé (consigne du 2 nov. 2026).
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const X = [0, 1, 2, 3, 4];
  const lire = (v) => X.map((x, i) => 'f(' + x + ') = ' + v[i]).join(', ');
  const table = (v) => ({ dessin: 'tableur', colonnes: ['x'].concat(X.map(String)), lignes: [['f(x)'].concat(v)], description: 'Un tableau de valeurs. ' + lire(v) + '.' });
  const courbe = (v) => ({ dessin: 'courbe', points: X.map((x, i) => [x, v[i]]), axeX: 'x', axeY: 'f(x)', description: 'La courbe de la fonction. ' + lire(v) + '.' });

  return {
    id: 'lire-fonction',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'Lire une fonction dans un tableau et sur un graphique',
    classe: '3e',
    univers: ['commerce', 'dehors'],

    accroche: {
      texte: 'Chaque soir, Aminata note ce que son étal a rapporté, selon le nombre d’heures d’ouverture. Après 2 heures, 6 euros. Après 3 heures, 9 euros. ' +
        'Sa machine à nombres n’a pas de formule écrite. Mais avec un tableau, et un dessin, elle peut quand même lire ses entrées et ses sorties.',
      image: table([0, 3, 6, 9, 10]),
    },

    manipulation: {
      image: courbe([0, 3, 6, 9, 10]),
      etapes: [
        'Dans le tableau, la ligne du haut donne les entrées. La ligne du bas donne les sorties.',
        'Sur le dessin, chaque point a une abscisse, l’entrée, et une ordonnée, la sortie.',
        'Pour la sortie de 3 : on part de 3 sur la règle couchée, et on monte jusqu’à la ligne. Sur la règle debout, on lit 9.',
        'Pour l’entrée qui donne 6 : on part de 6 sur la règle debout, et on va jusqu’à la ligne. On descend, et on lit 2.',
        'Une entrée a une seule sortie. Mais une même sortie peut venir de plusieurs entrées.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le dessin de la machine s’appelle ' + c.mot('courbe') + '. Pour une sortie, tu pars de l’axe couché, et tu lis sur l’axe debout. Pour une entrée, tu fais le chemin inverse. ' +
        'L’astuce : l’image se lit en montant, l’antécédent en descendant.',
    },

    vocabulaire: {
      termes: {
        courbe: { sesMots: 'la ligne des points', officiel: 'la courbe représentative', lesDeux: 'la ligne des points, que les matheux appellent la courbe représentative' },
      },
      textes: [
        'Pour l’instant, garde ton mot : la ligne des points. ' +
          'Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : la courbe représentative, pour la ligne des points.',
        'Tu connais le mot officiel : la courbe représentative d’une fonction.',
      ],
    },

    exercices: [
      {
        id: 'image-dans-le-tableau',
        univers: 'commerce',
        // [valeurs, x demandé]
        versions: [[[0, 3, 6, 9, 10], 2], [[1, 4, 7, 10, 13], 3], [[5, 3, 1, 4, 8], 1], [[2, 2, 5, 9, 12], 4], [[0, 4, 8, 12, 16], 3], [[6, 5, 7, 9, 2], 2]],
        genere(c) {
          const [v, x] = c.alea.choisir(this.versions);
          return {
            enonce: 'Voici le tableau d’une fonction f : ' + lire(v) + '. Quelle est l’image de ' + x + ' ?',
            image: table(v),
            reponse: { type: 'nombre', valeur: v[x] },
            aide: 'Cherche ' + x + ' dans la ligne du haut, puis lis dessous.',
            aideParlee: 'Cherche le nombre dans la ligne du haut, puis lis dessous.',
            correction: ['f(' + x + ') = ' + v[x] + '.'],
          };
        },
      },
      {
        id: 'antecedent-dans-le-tableau',
        univers: 'commerce',
        // [valeurs, y demandé]
        versions: [[[0, 3, 6, 9, 10], 6], [[1, 4, 7, 10, 13], 13], [[5, 3, 1, 4, 8], 4], [[2, 3, 5, 9, 12], 9], [[0, 4, 8, 12, 16], 4], [[6, 5, 7, 9, 2], 2]],
        genere(c) {
          const [v, y] = c.alea.choisir(this.versions);
          const x = v.indexOf(y);
          return {
            enonce: 'Voici le tableau d’une fonction f : ' + lire(v) + '. Quel est l’antécédent de ' + y + ' ?',
            image: table(v),
            reponse: { type: 'nombre', valeur: x },
            aide: 'Cherche ' + y + ' dans la ligne du bas, puis lis au-dessus.',
            aideParlee: 'Cherche le nombre dans la ligne du bas, puis lis au-dessus.',
            correction: ['f(' + x + ') = ' + y + ' : l’antécédent est ' + x + '.'],
          };
        },
      },
      {
        id: 'image-sur-la-courbe',
        univers: 'dehors',
        versions: [[[0, 3, 6, 9, 10], 3], [[1, 4, 7, 10, 13], 2], [[5, 3, 1, 4, 8], 4], [[2, 2, 5, 9, 12], 1], [[0, 4, 8, 12, 16], 2], [[6, 5, 7, 9, 2], 3]],
        genere(c) {
          const [v, x] = c.alea.choisir(this.versions);
          return {
            enonce: 'La courbe d’une fonction passe par les points suivants : ' + lire(v) + '. Par lecture, combien vaut f(' + x + ') ?',
            image: courbe(v),
            reponse: { type: 'nombre', valeur: v[x] },
            aide: 'Pars de ' + x + ' sur l’axe couché, monte jusqu’à la courbe, et lis.',
            aideParlee: 'Pars du nombre sur l’axe couché, monte jusqu’à la courbe, et lis.',
            correction: ['f(' + x + ') = ' + v[x] + '.'],
          };
        },
      },
      {
        id: 'combien-d-antecedents',
        univers: 'dehors',
        // [valeurs, y]
        versions: [[[2, 4, 2, 4, 6], 4], [[5, 3, 1, 3, 5], 3], [[1, 2, 3, 4, 5], 2], [[6, 4, 2, 4, 6], 6], [[3, 3, 3, 1, 0], 3], [[2, 5, 8, 5, 2], 8]],
        genere(c) {
          const [v, y] = c.alea.choisir(this.versions);
          const a = X.filter((x, i) => v[i] === y);
          return {
            enonce: 'Voici une fonction f : ' + lire(v) + '. Dans ce tableau, combien de nombres ont pour image ' + y + ' ?',
            image: table(v),
            reponse: { type: 'nombre', valeur: a.length },
            aide: 'Compte combien de fois ' + y + ' apparaît dans la ligne du bas.',
            aideParlee: 'Compte combien de fois ce nombre apparaît dans la ligne du bas.',
            correction: [(a.length > 1 ? 'Les nombres sont : ' : 'Le nombre est : ') + a.join(', ') + '.', 'Cela fait ' + a.length + '.'],
          };
        },
      },
      Q('vrai-ou-faux', 'commerce',
        [['Un nombre a une seule image.', 'Vrai'], ['Un nombre peut avoir plusieurs antécédents.', 'Vrai'], ['Un nombre peut avoir deux images différentes.', 'Faux'], ['L’image se lit sur l’axe couché.', 'Faux']],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Une machine donne une seule sortie pour une entrée.',
        'À une entrée, la machine donne une seule sortie. Mais plusieurs entrées peuvent donner la même sortie. L’image se lit sur l’axe debout.'),
    ],

    defi: {
      versions: [[0, 4, 8, 10, 6], [1, 3, 7, 9, 5], [2, 6, 8, 4, 2], [0, 5, 7, 9, 3]],
      genere(c) {
        const v = c.alea.choisir(this.versions);
        const m = Math.max(...v), xm = v.indexOf(m);
        return {
          enonce: 'Le graphique donne la recette d’Aminata, en dizaines d’euros, selon l’heure x depuis l’ouverture. Les valeurs sont les suivantes : ' + lire(v) + '.',
          image: courbe(v),
          questions: [
            {
              texte: 'Question 1. Quelle est l’image de 2 ?',
              reponse: { type: 'nombre', valeur: v[2] },
              aide: 'Pars de deux sur l’axe couché, et lis sur l’axe debout.',
              correction: ['f(2) = ' + v[2] + '.'],
            },
            {
              texte: 'Question 2. Pour quelle valeur de x la fonction atteint-elle sa plus grande valeur ?',
              reponse: { type: 'nombre', valeur: xm },
              aide: 'Cherche le point le plus haut, puis lis son abscisse.',
              correction: ['La plus grande valeur est ' + m + ', pour x = ' + xm + '.'],
            },
            {
              texte: 'Question 3. La recette est-elle proportionnelle à l’heure ? Justifie.',
              correction: ['Non : la courbe ne monte pas toujours de la même façon.', 'Quand x augmente de un, l’image ne change pas toujours de la même quantité : ce n’est pas proportionnel.'],
              grille: ['As-tu répondu non ?', 'As-tu justifié, par la forme de la courbe ou par un calcul ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un tableau ou une courbe, et tu lis ta machine, dans un sens comme dans l’autre.',
    carte: ['image-dans-le-tableau', 'antecedent-dans-le-tableau', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['image-sur-la-courbe', 'combien-d-antecedents'], defi: true },
    automatismes: [
      {
        id: 'lire-rapide',
        versions: [[3, 7], [2, 5], [4, 9], [1, 6]],
        genere(c) { const [x, y] = c.alea.choisir(this.versions); return { enonce: 'f(' + x + ') = ' + y + '. Quelle est l’image de ' + x + ' ?', reponse: { type: 'nombre', valeur: y } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux îles Marshall, des baguettes et des coquillages formaient des cartes montrant les îles et la houle de l’océan.',
    prenoms: ['Aminata'],
  };
});
