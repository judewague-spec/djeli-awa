/* Notion 3 du bloc SVT « Le vivant et son évolution » : le rôle des micro-organismes. Le compost de Clarisse et le pain de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const DECOMPOSE = 'Ils décomposent la matière morte', FERMENTE = 'Ils font fermenter un aliment';

  return {
    id: 'role-micro-organismes',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Le rôle des micro-organismes',
    classe: 'cycle 4',
    univers: ['champetre', 'cuisine-restaurant'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : rôle des micro-organismes dans le recyclage de la matière et les fermentations.',

    accroche: {
      texte: 'Clarisse jette les épluchures sur le tas de compost, au fond du potager. Quelques mois plus tard, elles sont devenues une terre noire qui sent la forêt. ' +
        'Le même jour, la pâte à pain de Laure a doublé de volume. Qui a fait tout ce travail, sans qu’on le voie ?',
      image: { dessin: 'chaine', etapes: ['Épluchures et feuilles mortes', 'Des êtres minuscules les décomposent', 'Une terre riche en sels minéraux', 'Les plantes s’en nourrissent'], description: 'Le compost : les épluchures sont décomposées par des êtres minuscules, elles deviennent une terre riche en sels minéraux, et les plantes s’en nourrissent.' },
    },

    manipulation: {
      image: { dessin: 'doublement', generations: 4, branches: 2, description: 'Une bactérie se coupe en deux, puis chacune encore en deux : en quatre fois, cela fait seize bactéries.' },
      etapes: [
        'Il existe des êtres vivants trop petits pour être vus à l’œil nu : des bactéries, des levures et d’autres champignons.',
        'Beaucoup sont utiles. Dans le compost et le sol, ils découpent la matière morte. Ils rendent au sol des sels minéraux, qui nourrissent les plantes.',
        'En cuisine, ils transforment les aliments. Des levures font gonfler le pain. Des bactéries transforment le lait en yaourt.',
        'Ils se multiplient vite : une bactérie se coupe en deux, puis chacune encore en deux.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ces êtres minuscules ont deux grands métiers. Dans le sol, ce sont ' + c.mot('decomposeurs') + '. Ils rendent la matière morte aux plantes. ' +
        'En cuisine, ils transforment les aliments : c’est ' + c.mot('fermentation') + '. ' +
        'L’astuce : sans eux, les feuilles mortes s’entasseraient, et il n’y aurait ni pain levé, ni yaourt.',
    },

    vocabulaire: {
      termes: {
        decomposeurs: { sesMots: 'les recycleurs invisibles', officiel: 'les décomposeurs', lesDeux: 'les recycleurs invisibles, que les scientifiques appellent les décomposeurs' },
        fermentation: { sesMots: 'le travail des levures et des bactéries', officiel: 'la fermentation', lesDeux: 'le travail des levures et des bactéries, que l’on appelle la fermentation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les recycleurs invisibles, et le travail des levures et des bactéries. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : des micro-organismes, pour ces êtres minuscules. Dans le sol, ce sont des décomposeurs. En cuisine, ils font une fermentation.',
        'Tu connais les mots officiels : les micro-organismes, les décomposeurs et la fermentation.',
      ],
    },

    exercices: [
      O.qcm('quel-metier', 'champetre',
        [['Dans le compost, des bactéries transforment les épluchures.', DECOMPOSE], ['Des levures font gonfler la pâte à pain.', FERMENTE], ['Dans la forêt, des champignons font disparaître les feuilles mortes.', DECOMPOSE], ['Des bactéries transforment le lait en yaourt.', FERMENTE]].map((v) => [v[0], v[1], 'Dans le sol et le compost, ils décomposent la matière morte. Dans les aliments, comme le pain ou le yaourt, ils font une fermentation.']),
        (x) => x + ' Quel est leur rôle ?', [DECOMPOSE, FERMENTE],
        'Dans le sol, ils recyclent. En cuisine, ils transforment les aliments.'),
      O.qcm('qui-travaille', 'cuisine-restaurant',
        [['le pain qui lève', 'Des levures'], ['le yaourt', 'Des bactéries']].map((v) => [v[0], v[1], 'Les levures font lever le pain. Des bactéries transforment le lait en yaourt.']),
        (x) => 'Quel micro-organisme est au travail dans ' + x + ' ?', ['Des levures', 'Des bactéries', 'Des virus'],
        'Pour le pain, on achète de la levure de boulanger.'),
      O.qcm('vrai-ou-faux', 'champetre',
        [['Tous les micro-organismes rendent malade.', 'Faux'], ['Le compost rend des sels minéraux au sol.', 'Vrai'], ['Sans décomposeurs, la matière morte s’entasserait.', 'Vrai'], ['On peut voir une bactérie à l’œil nu.', 'Faux']].map((v) => [v[0], v[1], 'Beaucoup de micro-organismes sont utiles : ils recyclent la matière morte en sels minéraux. Il faut un microscope pour les voir.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'La plupart des micro-organismes ne rendent pas malade, et beaucoup sont utiles.'),
      {
        id: 'bacteries-doublent',
        univers: 'cuisine-restaurant',
        // [bactéries au départ, nombre de doublements]
        versions: [[1, 3], [2, 3], [5, 2], [10, 3], [3, 2], [1, 4]],
        genere(c) {
          const [d, n] = c.alea.choisir(this.versions);
          const f = d * 2 ** n;
          return {
            enonce: 'Dans du lait, il y a ' + d + ' bactérie' + (d > 1 ? 's' : '') + ' de yaourt. Leur nombre double ' + n + ' fois. Combien y a-t-il de bactéries à la fin ?',
            reponse: { type: 'nombre', valeur: f },
            aide: 'Multiplie par 2, ' + n + ' fois de suite.',
            aideParlee: 'Multiplie par deux, autant de fois que le nombre double.',
            correction: [d + ' × ' + Array(n).fill(2).join(' × ') + ' = ' + f + ' bactéries.'],
          };
        },
      },
      {
        id: 'compost-reste',
        univers: 'champetre',
        // [kg d'épluchures, kg de compost obtenu]
        versions: [[100, 30], [50, 15], [80, 20], [60, 15], [40, 10], [90, 30]],
        genere(c) {
          const [e, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Clarisse met ' + e + ' kg d’épluchures au compost. Elle obtient ' + k + ' kg de terre. Combien de kilogrammes la matière a-t-elle perdus, surtout en eau et en gaz ?',
            reponse: { type: 'nombre', valeur: e - k },
            aide: 'Calcule ' + e + ' − ' + k + '.',
            aideParlee: 'Enlève la masse de terre obtenue à la masse d’épluchures.',
            correction: [e + ' − ' + k + ' = ' + (e - k) + ' kg.'],
          };
        },
      },
    ],

    defi: {
      // [volume de pâte au départ, tube A avec levure après 1 h à 30 °C, en mL]
      versions: [[50, 100], [40, 120], [60, 150], [50, 150]],
      genere(c) {
        const [d, a] = c.alea.choisir(this.versions);
        return {
          enonce: 'Expérience : on prépare deux tubes avec ' + d + ' mL de pâte à pain, à 30 °C. Le tube A contient de la levure, le tube B n’en contient pas. Après une heure, la pâte du tube A occupe ' + a + ' mL. Celle du tube B n’a pas changé.',
          image: { dessin: 'barres', barres: [{ nom: 'Tube A', parts: a / 10 }, { nom: 'Tube B', parts: d / 10 }], description: 'Deux barres : après une heure, la pâte du tube A avec levure est plus haute que celle du tube B sans levure. Chaque part vaut dix millilitres.' },
          questions: [
            {
              texte: 'Question 1. De combien de millilitres la pâte du tube A a-t-elle augmenté ?',
              reponse: { type: 'nombre', valeur: a - d },
              aide: 'Enlève le volume de départ au volume final.',
              correction: [a + ' − ' + d + ' = ' + (a - d) + ' mL.'],
            },
            {
              texte: 'Question 2. Quel tube sert de témoin, pour comparer ?',
              reponse: O.choix(c.alea, 'Le tube B', ['Le tube A', 'Le tube B']),
              aide: 'Le témoin est le tube sans ce que l’on veut tester.',
              correction: ['On teste la levure. Le tube sans levure sert de comparaison.', 'Réponse : Le tube B.'],
            },
            {
              texte: 'Question 3. Rédige la conclusion de cette expérience.',
              correction: ['Seule la pâte avec levure a gonflé : la levure est responsable de la levée de la pâte.', 'Les levures sont des micro-organismes vivants : leur fermentation produit un gaz qui fait gonfler la pâte.'],
              grille: ['As-tu comparé les deux tubes ?', 'As-tu conclu que la levure fait lever la pâte ?', 'As-tu parlé de la fermentation ou du gaz produit ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Recycler la matière et transformer les aliments : tu connais le travail des êtres invisibles.',
    carte: ['quel-metier', 'qui-travaille', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['bacteries-doublent', 'compost-reste'], defi: true },
    automatismes: [
      {
        id: 'double-rapide',
        versions: [8, 16, 25, 50],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: 'Le double de ' + n + ' = ?', reponse: { type: 'nombre', valeur: 2 * n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, le manioc du fufu fermente plusieurs jours, grâce à des bactéries et des levures.',
    prenoms: ['Clarisse', 'Laure'],
  };
});
