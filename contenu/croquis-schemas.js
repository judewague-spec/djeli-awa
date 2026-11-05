/* Notion 4 du bloc de technologie « Concevoir et fabriquer » : croquis et schémas. Le dessin de l’étagère.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  return {
    id: 'croquis-schemas',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'Croquis et schémas',
    classe: '4e',
    univers: ['famille', 'maison-courses', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : représenter une idée ou un objet (croquis à main levée, schéma, légende, échelle).',

    accroche: {
      texte: 'Rachel dessine son idée sur un papier. Un trait pour le haut, un trait pour le côté. ' +
        'Moussa regarde et demande : « C’est grand comment ? Et ce petit trait, c’est quoi ? » Rachel doit ajouter des mots et des mesures.',
      image: { dessin: 'chaine', etapes: ['Un dessin rapide de l’étagère', 'Des mots à côté des traits', 'Les mesures'], description: 'Le papier de Rachel : un dessin rapide de l’étagère, des mots écrits à côté des traits, puis les mesures.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Dessiner à main levée', 'Écrire des mots', 'Noter le rapport de taille', 'Décrire en mots'], description: 'Les quatre gestes de Rachel : dessiner à main levée, écrire des mots, noter le rapport de taille, puis décrire le dessin en mots.' },
      etapes: [
        'Rachel dessine l’étagère à main levée, sans règle, pour garder son idée.',
        'Elle écrit à côté de chaque trait ce qu’il représente.',
        'Puis elle le retrace à la règle, et note de combien il est plus petit que la vraie étagère.',
        'Pour la lampe de l’étagère, elle fait un dessin simplifié qui montre comment le courant passe.',
        'Enfin, elle décrit son dessin avec des mots, pour que Moussa le comprenne même sans le voir.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde ce que Rachel trace sans règle : c’est ' + c.mot('croquis') + '. ' +
        'Regarde le tracé du courant dans la lampe, avec ses symboles : c’est ' + c.mot('schema') + '. ' +
        'Regarde ce qu’écrit Rachel à côté des traits : c’est ' + c.mot('legende') + '. ' +
        'Regarde de combien le dessin est plus petit que la vraie étagère : c’est ' + c.mot('echelle') + '. ' +
        'L’astuce : tout ce que l’on voit sur un dessin, on peut aussi le dire avec des mots.',
    },

    vocabulaire: {
      termes: {
        croquis: { sesMots: 'un dessin rapide fait à la main', officiel: 'un croquis à main levée', lesDeux: 'un dessin rapide fait à la main, que les techniciens appellent un croquis à main levée' },
        schema: { sesMots: 'un dessin simplifié qui montre comment ça marche', officiel: 'un schéma', lesDeux: 'un dessin simplifié qui montre comment ça marche, que les techniciens appellent un schéma' },
        legende: { sesMots: 'l’explication de chaque trait', officiel: 'la légende', lesDeux: 'l’explication de chaque trait, que les techniciens appellent la légende' },
        echelle: { sesMots: 'le rapport entre le dessin et l’objet vrai', officiel: 'l’échelle', lesDeux: 'le rapport entre le dessin et l’objet vrai, que les techniciens appellent l’échelle' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un dessin rapide fait à la main. Garde aussi un dessin simplifié, l’explication de chaque trait, et le rapport avec l’objet vrai. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : un croquis à main levée, un schéma, la légende, l’échelle. ' +
          'Le croquis est un dessin rapide. Le schéma montre comment ça marche. La légende explique les traits. L’échelle donne le rapport de taille.',
        'Tu connais les mots officiels : le croquis à main levée, le schéma, la légende et l’échelle. Avec eux, tu expliques une idée sans la fabriquer.',
      ],
    },

    exercices: [
      {
        id: 'echelle-reelle',
        univers: 'maison-courses',
        // [échelle 1/e, centimètres sur le dessin]
        versions: [[10, 8], [5, 12], [20, 5], [10, 15], [4, 22]],
        genere(c) {
          const [e, a] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rachel dessine l’étagère à l’échelle 1/' + e + ' : 1 cm du dessin vaut ' + e + ' cm en vrai. Une planche mesure ' + a + ' cm sur le dessin. Quelle est sa longueur réelle, en centimètres ?',
            reponse: { type: 'nombre', valeur: a * e },
            aide: 'Multiplie la longueur du dessin par le nombre de centimètres que vaut 1 cm du dessin.',
            correction: [a + ' × ' + e + ' = ' + a * e + ' cm.'],
          };
        },
      },
      {
        id: 'echelle-dessin',
        univers: 'famille',
        // [largeur réelle en cm, échelle 1/e]
        versions: [[80, 10], [60, 5], [120, 20], [90, 10], [100, 5]],
        genere(c) {
          const [L, e] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’étagère de Laure mesure ' + L + ' cm de large. Rachel la dessine à l’échelle 1/' + e + ' : 1 cm du dessin vaut ' + e + ' cm en vrai. Combien de centimètres doit-elle tracer ?',
            reponse: { type: 'nombre', valeur: L / e },
            aide: 'Divise la longueur réelle par le nombre de centimètres que vaut 1 cm du dessin.',
            correction: [L + ' ÷ ' + e + ' = ' + L / e + ' cm sur le dessin.'],
          };
        },
      },
      {
        id: 'quel-dessin',
        univers: 'appareils',
        // [situation, bonne réponse, deux mauvaises réponses, pourquoi]
        versions: [
          ['Rachel veut garder une idée très vite, sans règle.', 'Un croquis à main levée', ['Un plan précis tracé à la règle', 'Une maquette en bois'], 'Un croquis à main levée se fait vite et sans outils.'],
          ['Moussa veut montrer comment le courant passe dans la lampe, avec des symboles.', 'Un schéma', ['Un croquis de la forme de la lampe', 'Une photo de la lampe'], 'Un schéma montre comment ça marche, avec des symboles.'],
          ['Aminata veut dire à quoi correspond chaque trait de son dessin.', 'Ajouter une légende', ['Effacer les traits', 'Changer la couleur du papier'], 'La légende dit ce que chaque trait représente.'],
          ['Clarisse veut savoir à quelle taille réelle correspond le dessin.', 'Lire l’échelle', ['Compter les traits du dessin', 'Regarder la couleur du dessin'], 'L’échelle donne le rapport entre le dessin et l’objet vrai.'],
          ['Laure ne voit pas bien le dessin. Que peut faire Rachel pour qu’elle le comprenne ?', 'Le décrire avec des mots', ['Le dessiner plus petit', 'Ne rien dire'], 'Un dessin se décrit aussi avec des mots : tout le monde peut le comprendre.'],
        ],
        genere(c) {
          const [s, bonne, autres, pourquoi] = c.alea.choisir(this.versions);
          return {
            enonce: s + ' Que faut-il choisir ?',
            reponse: O.choix(c.alea, bonne, autres),
            aide: 'Pense à ce que chaque dessin montre.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'baguette',
        univers: 'maison-courses',
        // [largeur en cm, hauteur en cm de la façade]
        versions: [[80, 30], [60, 25], [100, 40], [90, 20], [120, 35]],
        genere(c) {
          const [L, H] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le croquis de la façade d’une étagère est un rectangle. Sa légende dit : largeur ' + L + ' cm, hauteur ' + H + ' cm. Une baguette de bois doit faire tout le tour de la façade. Quelle longueur de baguette faut-il, en centimètres ?',
            reponse: { type: 'nombre', valeur: 2 * (L + H) },
            aide: 'Le tour d’un rectangle, c’est deux largeurs et deux hauteurs.',
            correction: [L + ' + ' + H + ' = ' + (L + H) + ' cm.', (L + H) + ' × 2 = ' + 2 * (L + H) + ' cm.'],
          };
        },
      },
      O.qcm('vrai-ou-faux', 'famille',
        [
          ['Un croquis à main levée doit être tracé avec une règle.', 'Faux', 'À main levée, on dessine sans règle.'],
          ['Sans échelle ni mesures, on ne peut pas connaître la taille réelle de l’objet.', 'Vrai', 'Il faut l’échelle ou des mesures pour passer du dessin à la vraie taille.'],
          ['La légende explique ce que représentent les traits et les symboles.', 'Vrai', 'La légende donne le sens de chaque trait.'],
          ['À l’échelle 1/10, 1 cm sur le dessin représente 1 cm dans la réalité.', 'Faux', 'À l’échelle 1/10, 1 cm du dessin représente 10 cm dans la réalité.'],
          ['Un croquis peut servir à expliquer une idée avant de fabriquer.', 'Vrai', 'On dessine d’abord pour partager l’idée, puis on fabrique.'],
        ],
        (x) => '« ' + x + ' » Vrai ou faux ?', ['Vrai', 'Faux'],
        'Relis la phrase en pensant à ce que montre un dessin.'),
    ],

    defi: {
      // [échelle 1/e, centimètres de large sur le dessin, centimètres de haut sur le dessin]
      versions: [[10, 8, 3], [10, 10, 4], [20, 6, 2], [5, 12, 6], [20, 4, 2]],
      genere(c) {
        const [e, a, b] = c.alea.choisir(this.versions);
        const L = a * e, H = b * e;
        return {
          enonce: 'Le plan de l’étagère de Laure est tracé à la règle, à l’échelle 1/' + e + ' : 1 cm du dessin vaut ' + e + ' cm en vrai. Sur le dessin, la façade mesure ' + a + ' cm de large et ' + b + ' cm de haut.',
          questions: [
            {
              texte: 'Question 1. Quelle est la largeur réelle de la façade, en centimètres ?',
              reponse: { type: 'nombre', valeur: L },
              aide: 'Multiplie la largeur du dessin par le nombre de centimètres que vaut 1 cm du dessin.',
              correction: [a + ' × ' + e + ' = ' + L + ' cm.'],
            },
            {
              texte: 'Question 2. Quelle est la hauteur réelle de la façade, en centimètres ?',
              reponse: { type: 'nombre', valeur: H },
              aide: 'Multiplie la hauteur du dessin par le nombre de centimètres que vaut 1 cm du dessin.',
              correction: [b + ' × ' + e + ' = ' + H + ' cm.'],
            },
            {
              texte: 'Question 3. Une baguette doit faire tout le tour de la façade. Quelle longueur faut-il, en centimètres ?',
              reponse: { type: 'nombre', valeur: 2 * (L + H) },
              aide: 'Le tour d’un rectangle, c’est deux largeurs et deux hauteurs.',
              correction: [L + ' + ' + H + ' = ' + (L + H) + ' cm.', (L + H) + ' × 2 = ' + 2 * (L + H) + ' cm.'],
            },
            {
              texte: 'Question 4. Moussa ne voit pas le dessin. Écris la légende et la description en mots qui lui permettent de comprendre la façade.',
              correction: ['On nomme chaque partie : la façade, la largeur, la hauteur.', 'On donne les mesures et l’échelle, et on dit comment les traits sont placés.'],
              grille: ['As-tu nommé les parties du dessin ?', 'As-tu donné les mesures ou l’échelle ?', 'As-tu décrit la forme avec des mots, sans dire « regarde » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais dessiner une idée, la légender, lire l’échelle, et la décrire avec des mots.',
    carte: ['echelle-reelle', 'quel-dessin', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['echelle-reelle', 'echelle-dessin', 'baguette'], defi: true },
    automatismes: [
      {
        id: 'fois-echelle',
        versions: [[10, 4], [5, 6], [20, 3], [10, 9]],
        genere(c) { const [e, a] = c.alea.choisir(this.versions); return { enonce: 'Échelle 1/' + e + ' : ' + a + ' cm sur le dessin. Combien de centimètres en vrai ?', reponse: { type: 'nombre', valeur: a * e } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Italie, Léonard de Vinci a croqué des machines dans ses carnets, annotés en écriture miroir.',
    prenoms: ['Rachel', 'Moussa', 'Laure', 'Aminata', 'Clarisse'],
  };
});
