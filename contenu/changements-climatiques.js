/* Notion 4 du bloc SVT « Planète Terre, environnement, action humaine » : climats passés et actuels. La vieille photo de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ecr = O.ecr;
  const r2 = (x) => Math.round(x * 100) / 100;
  const PERIODES = ['Entre le début et 10 ans après', 'Entre 10 et 20 ans après', 'Entre 20 et 30 ans après'];
  const OUI = 'Oui, il réduit les gaz', NON = 'Non, il en ajoute';

  return {
    id: 'changements-climatiques',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Climats passés et actuels',
    classe: 'cycle 4',
    univers: ['dehors', 'champetre'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : climats passés, réchauffement actuel, gaz à effet de serre et conséquences.',

    accroche: {
      texte: 'Clarisse montre une vieille photo. On y voit un grand glacier blanc. Aujourd’hui, il a presque disparu. ' +
        'Rachel demande : « Le climat de la Terre a-t-il toujours été pareil ? »',
      image: { dessin: 'tableur', colonnes: ['Photo', 'Ancienne', 'Récente'], lignes: [['Le glacier', 'Très grand', 'Très petit']], description: 'Un tableau. Sur la photo ancienne, le glacier est très grand. Sur la photo récente, il est très petit.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Période', 'Très froide', 'Plus douce'], lignes: [['Dioxyde de carbone dans les bulles (ppm, parties par million)', 190, 280]], description: 'Un tableau, pour un exemple de glace très ancienne. Pendant une période très froide, 190 parties par million de dioxyde de carbone dans les bulles. Pendant une période plus douce, 280.' },
      etapes: [
        'Clarisse a lu qu’on perce les glaciers pour en sortir de longs bâtons de glace très ancienne.',
        'Dans cette glace, de petites bulles gardent l’air d’autrefois, comme des bouteilles bouchées depuis très longtemps.',
        'En mesurant l’air des bulles, on voit : quand il fait très froid, l’air contient peu de dioxyde de carbone.',
        'Quand il fait plus doux, il en contient davantage. Les climats ont donc changé plusieurs fois, depuis très longtemps.',
        'Aujourd’hui, l’air en contient plus que dans toutes les bulles anciennes.',
        'Les humains en ajoutent en brûlant du charbon, du pétrole et du gaz. Ce gaz retient la chaleur : la planète se réchauffe.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde ce que l’on sort d’un glacier pour lire le passé : c’est ' + c.mot('carotte') + '. ' +
        'Ses bulles racontent des climats d’autrefois : des périodes très froides ont alterné avec des périodes plus douces. ' +
        'Regarde les gaz de l’air, comme le dioxyde de carbone, qui retiennent la chaleur : ce sont ' + c.mot('gaz') + '. ' +
        'Un peu de ces gaz est utile : sans eux, la Terre serait glacée. Mais les humains en ajoutent beaucoup, en brûlant du charbon, du pétrole et du gaz. ' +
        'Résultat : la Terre se réchauffe, les glaciers fondent, la mer monte, et les canicules sont plus fréquentes. L’astuce : plus de gaz dans l’air, plus de chaleur gardée.',
    },

    vocabulaire: {
      termes: {
        carotte: { sesMots: 'un long bâton de glace ancienne', officiel: 'une carotte de glace', lesDeux: 'un long bâton de glace ancienne, que l’on appelle une carotte de glace' },
        gaz: { sesMots: 'les gaz couverture', officiel: 'les gaz à effet de serre', lesDeux: 'les gaz couverture, que l’on appelle les gaz à effet de serre' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le long bâton de glace ancienne, et les gaz couverture. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une carotte de glace, pour le long bâton de glace ancienne. Les gaz couverture s’appellent les gaz à effet de serre.',
        'Tu connais les mots officiels : une carotte de glace, les gaz à effet de serre, et une glaciation, qui est une période très froide.',
      ],
    },

    exercices: [
      O.qcm('cause-ou-consequence', 'dehors',
        [
          ['On brûle du pétrole et du charbon.', 'Une cause du réchauffement', 'Brûler ces combustibles ajoute des gaz à effet de serre dans l’air : c’est une cause.'],
          ['Les glaciers fondent.', 'Une conséquence du réchauffement', 'La chaleur fait fondre la glace : c’est une conséquence.'],
          ['La mer monte sur les côtes.', 'Une conséquence du réchauffement', 'La glace fond et l’eau se dilate : la mer monte. C’est une conséquence.'],
          ['On coupe de grandes forêts.', 'Une cause du réchauffement', 'Moins d’arbres, c’est moins de dioxyde de carbone absorbé : c’est une cause.'],
          ['Les canicules sont plus fréquentes.', 'Une conséquence du réchauffement', 'Plus de chaleur dans l’air : les canicules reviennent plus souvent. C’est une conséquence.'],
        ],
        (x) => x + ' Est-ce une cause ou une conséquence du réchauffement ?', ['Une cause du réchauffement', 'Une conséquence du réchauffement'],
        'Une cause fait monter la chaleur. Une conséquence arrive à cause de la chaleur.'),
      O.qcm('vrai-ou-faux', 'dehors',
        [
          ['Le climat de la Terre est resté le même depuis toujours.', 'Faux', 'Il y a eu des périodes très froides, appelées glaciations, et des périodes plus douces.'],
          ['Les bulles de la glace gardent un peu de l’air d’autrefois.', 'Vrai', 'Les bulles piégées dans la glace permettent de mesurer l’air du passé.'],
          ['Une glaciation est une période très froide.', 'Vrai', 'Pendant une glaciation, la glace s’étend beaucoup sur la Terre.'],
          ['Brûler du charbon ajoute du dioxyde de carbone dans l’air.', 'Vrai', 'Brûler du charbon rejette du dioxyde de carbone.'],
          ['Les gaz à effet de serre font baisser la température de la Terre.', 'Faux', 'Ils retiennent la chaleur : ils la font monter.'],
        ],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Pense à la glace du passé, et aux gaz qui retiennent la chaleur.'),
      {
        id: 'ecart-gaz',
        univers: 'dehors',
        // [ppm de dioxyde de carbone en période froide, en période douce]
        versions: [[190, 280], [185, 275], [200, 290], [180, 260], [195, 285]],
        genere(c) {
          const [f, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple de carotte de glace, une période très froide contient ' + f + ' ppm (parties par million) de dioxyde de carbone, et une période plus douce en contient ' + d + '. Quelle est la différence, en ppm ?',
            reponse: { type: 'nombre', valeur: d - f },
            aide: 'Enlève la plus petite valeur à la plus grande.',
            correction: [d + ' − ' + f + ' = ' + (d - f) + ' ppm.'],
          };
        },
      },
      {
        id: 'hausse-station',
        univers: 'champetre',
        // [moyenne de trente années anciennes, moyenne de trente années récentes] en °C
        versions: [[12, 13.5], [14, 15.2], [11, 12.4], [13, 14.1], [10, 11.3]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const h = r2(b - a);
          return {
            enonce: 'La station météo d’un village calcule la température moyenne de trente années anciennes : ' + ecr(a) + ' °C. Puis celle de trente années récentes : ' + ecr(b) + ' °C. De combien la moyenne a-t-elle augmenté, en °C ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'Enlève la moyenne ancienne à la moyenne récente.',
            correction: [ecr(b) + ' − ' + ecr(a) + ' = ' + ecr(h) + ' °C.'],
          };
        },
      },
      O.qcm('bon-geste', 'maison-courses',
        [
          ['Aller à l’école à pied plutôt qu’en voiture.', OUI, 'On ne brûle pas d’essence : on ajoute moins de dioxyde de carbone.'],
          ['Planter des arbres.', OUI, 'Les arbres absorbent du dioxyde de carbone pour grandir.'],
          ['Prendre la voiture seul pour un trajet très court.', NON, 'La voiture brûle de l’essence : elle ajoute du dioxyde de carbone.'],
          ['Garder son téléphone plusieurs années.', OUI, 'Fabriquer un téléphone neuf demande beaucoup d’énergie : en garder un longtemps évite ces rejets.'],
          ['Chauffer la maison avec les fenêtres grandes ouvertes.', NON, 'Il faut brûler plus de combustible pour chauffer : on ajoute des gaz.'],
        ],
        (x) => x + ' Ce geste réduit-il les gaz à effet de serre ?', [OUI, NON],
        'Demande-toi si le geste ajoute moins de gaz à effet de serre dans l’air, ou s’il en retire.'),
    ],

    defi: {
      // température moyenne de l'année au début du relevé, puis 10, 20 et 30 ans après, en °C
      versions: [[12.0, 12.4, 13.2, 13.8], [11.5, 12.4, 12.7, 13.4], [10.8, 11.1, 11.5, 12.5], [12.0, 12.3, 13.4, 13.6]],
      genere(c) {
        const t = c.alea.choisir(this.versions);
        const d = [0, 1, 2].map((i) => Math.round((t[i + 1] - t[i]) * 10));
        const juste = PERIODES[d.indexOf(Math.max(...d))];
        const total = r2(t[3] - t[0]);
        return {
          enonce: 'Esther étudie le relevé de la station météo de son village. Elle note la température moyenne de l’année, au début du relevé, puis 10, 20 et 30 ans après : ' + t.map(ecr).join(' °C, ') + ' °C.',
          image: { dessin: 'courbe', points: [[0, t[0]], [10, t[1]], [20, t[2]], [30, t[3]]], axeX: 'années depuis le début du relevé', axeY: 'température moyenne (°C)', description: 'Une courbe de la température moyenne de l’année : ' + t.map(ecr).join(', ') + ' degrés, au début du relevé puis 10, 20 et 30 ans après.' },
          questions: [
            {
              texte: 'Question 1. De combien la température a-t-elle augmenté en 30 ans, en °C ?',
              reponse: { type: 'nombre', valeur: total },
              aide: 'Enlève la première température à la dernière.',
              correction: [ecr(t[3]) + ' − ' + ecr(t[0]) + ' = ' + ecr(total) + ' °C.'],
            },
            {
              texte: 'Question 2. Pendant quelle période la hausse a-t-elle été la plus forte ?',
              reponse: O.choix(c.alea, juste, PERIODES),
              aide: 'Calcule la hausse de chaque période, puis garde la plus grande.',
              correction: ['Hausses : ' + [0, 1, 2].map((i) => ecr(d[i] / 10)).join(' °C, ') + ' °C.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 3. Explique comment l’action humaine peut faire monter la température de la Terre. Rédige trois phrases.',
              correction: ['Les humains brûlent du charbon, du pétrole et du gaz, et ils ajoutent des gaz à effet de serre dans l’air.', 'Ces gaz retiennent la chaleur près de la Terre.', 'La planète se réchauffe donc : les glaciers fondent et la mer monte.'],
              grille: ['As-tu cité une activité humaine qui ajoute des gaz dans l’air ?', 'As-tu dit que ces gaz retiennent la chaleur ?', 'As-tu cité une conséquence du réchauffement ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais lire le passé dans la glace, et tu comprends ce qui chauffe la planète aujourd’hui.',
    carte: ['cause-ou-consequence', 'vrai-ou-faux', 'bon-geste'],
    papierDuSoir: { exercices: ['ecart-gaz', 'hausse-station'], defi: true },
    automatismes: [
      {
        id: 'chaud-ou-froid-gaz',
        versions: [['Plus de gaz à effet de serre', 'Plus chaude'], ['Moins de gaz à effet de serre', 'Moins chaude']],
        genere(c) { const [g, b] = c.alea.choisir(this.versions); return { enonce: g + ' dans l’air : la Terre est-elle plus chaude ou moins chaude ?', reponse: O.choix(c.alea, b, ['Plus chaude', 'Moins chaude']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Tchad, au Niger, au Nigeria et au Cameroun, le lac Tchad a beaucoup rétréci : moins de pluie, plus d’irrigation.',
    prenoms: ['Clarisse', 'Rachel', 'Esther'],
  };
});
