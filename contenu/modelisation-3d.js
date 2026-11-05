/* Notion 5 du bloc de technologie « Concevoir et fabriquer » : la modélisation 3D. La boîte de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const pl = (n, mot) => O.ecr(n) + ' ' + mot + (n < 2 ? '' : 's');

  return {
    id: 'modelisation-3d',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'La modélisation 3D',
    classe: '4e',
    univers: ['appareils', 'maison-courses', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : modéliser une pièce avec un logiciel de CAO, dimensions, assemblage, vues, volume, modèle avant fabrication.',

    accroche: {
      texte: 'Rachel dessine une boîte sur l’ordinateur. Moussa lui montre comment la tourner sur l’écran, la mesurer et la mettre avec un couvercle. ' +
        'Rien n’est encore coupé, rien n’est gâché. Pourtant, Rachel voit déjà si la boîte ira sur l’étagère de Laure.',
      image: { dessin: 'chaine', etapes: ['La boîte dessinée sur l’écran', 'Le couvercle ajouté', 'La boîte fabriquée'], description: 'Les étapes de Rachel : la boîte dessinée sur l’écran, le couvercle ajouté, puis la boîte fabriquée en vrai.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Dessiner avec les dimensions', 'Tourner et regarder', 'Ajouter le couvercle', 'Corriger puis fabriquer'], description: 'Les gestes de Rachel : dessiner avec les dimensions, tourner et regarder, ajouter le couvercle, puis corriger avant de fabriquer.' },
      etapes: [
        'Rachel dessine la boîte sur l’écran, avec ses dimensions : longueur, largeur et hauteur.',
        'Elle fait tourner la boîte pour la voir de dessus, de côté et de face.',
        'Elle ajoute le couvercle et vérifie qu’il se pose bien sur la boîte.',
        'L’ordinateur donne le volume de la boîte. Rachel sait ce qu’elle peut ranger dedans.',
        'Elle corrige une mesure sur l’écran. Ce n’est qu’après qu’elle découpe vraiment le bois.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde l’outil : c’est ' + c.mot('cao') + '. ' +
        'Regarde la boîte que Rachel fait tourner : c’est ' + c.mot('modele') + '. ' +
        'Regarde la boîte avec son couvercle : c’est ' + c.mot('assemblage') + '. ' +
        'L’astuce : on dessine, on assemble, on mesure le volume, et seulement après on fabrique.',
    },

    vocabulaire: {
      termes: {
        cao: { sesMots: 'un logiciel de dessin en volume', officiel: 'un logiciel de conception assistée par ordinateur', lesDeux: 'un logiciel de dessin en volume, que les techniciens appellent un logiciel de conception assistée par ordinateur' },
        modele: { sesMots: 'la pièce dessinée en volume sur l’écran', officiel: 'le modèle numérique', lesDeux: 'la pièce dessinée en volume sur l’écran, que les techniciens appellent le modèle numérique' },
        assemblage: { sesMots: 'un groupe de pièces mises ensemble', officiel: 'un assemblage', lesDeux: 'un groupe de pièces mises ensemble, que les techniciens appellent un assemblage' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un logiciel de dessin en volume, la pièce dessinée sur l’écran, et un groupe de pièces mises ensemble. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la conception assistée par ordinateur, le modèle numérique, un assemblage. ' +
          'Le logiciel dessine en volume. Le modèle est la pièce sur l’écran. Un assemblage met plusieurs pièces ensemble.',
        'Tu connais les mots officiels : la conception assistée par ordinateur, le modèle numérique et l’assemblage. Avec eux, tu testes avant de fabriquer.',
      ],
    },

    exercices: [
      {
        id: 'volume-pave',
        univers: 'maison-courses',
        // [longueur, largeur, hauteur en cm]
        versions: [[10, 5, 4], [8, 6, 5], [12, 5, 3], [20, 10, 5], [15, 4, 5]],
        genere(c) {
          const [L, l, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur l’écran, Rachel dessine une boîte de ' + L + ' cm de long, ' + l + ' cm de large et ' + h + ' cm de haut. Quel est son volume, en cm³ ?',
            reponse: { type: 'nombre', valeur: L * l * h },
            aide: 'Le volume d’un pavé, c’est longueur × largeur × hauteur.',
            correction: [L + ' × ' + l + ' × ' + h + ' = ' + L * l * h + ' cm³.'],
          };
        },
      },
      {
        id: 'millimetres',
        univers: 'appareils',
        // [millimètres affichés par le logiciel]
        versions: [[85], [120], [35], [64], [250]],
        genere(c) {
          const [x] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le logiciel affiche une pièce de ' + x + ' mm. Combien cela fait-il en centimètres ? (1 cm = 10 mm)',
            reponse: { type: 'nombre', valeur: x / 10 },
            aide: 'Divise le nombre de millimètres par 10.',
            correction: [x + ' ÷ 10 = ' + O.ecr(x / 10) + ' cm.'],
          };
        },
      },
      {
        id: 'litres-boite',
        univers: 'cuisine-restaurant',
        // [volume de la boîte en cm³]
        versions: [[2000], [500], [1500], [250], [3000]],
        genere(c) {
          const [v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le logiciel donne un volume de ' + v + ' cm³ pour la boîte. Combien de litres d’eau peut-elle contenir ? (1 litre = 1 000 cm³)',
            reponse: { type: 'nombre', valeur: v / 1000 },
            aide: 'Divise le volume en cm³ par 1 000.',
            correction: [v + ' ÷ 1 000 = ' + pl(v / 1000, 'litre') + '.'],
          };
        },
      },
      {
        id: 'hauteur-assemblage',
        univers: 'famille',
        // [épaisseur d’une planche en cm, hauteur d’un espace vide en cm]
        versions: [[2, 28], [2, 30], [3, 27], [2, 23], [3, 21]],
        genere(c) {
          const [e, s] = c.alea.choisir(this.versions);
          const h = 3 * e + 2 * s;
          return {
            enonce: 'Une étagère est un assemblage de trois planches de ' + e + ' cm d’épaisseur. Elles sont empilées dans cet ordre : planche, espace vide de ' + s + ' cm, planche, espace vide de ' + s + ' cm, planche. Quelle est la hauteur totale, en centimètres ?',
            reponse: { type: 'nombre', valeur: h },
            aide: 'Additionne les épaisseurs des trois planches et les deux espaces vides.',
            correction: ['3 × ' + e + ' = ' + 3 * e + ' cm pour les planches.', '2 × ' + s + ' = ' + 2 * s + ' cm pour les espaces vides.', 3 * e + ' + ' + 2 * s + ' = ' + h + ' cm.'],
          };
        },
      },
      {
        id: 'avant-fabriquer',
        univers: 'appareils',
        // [ce que montre le modèle, bonne décision, deux mauvaises décisions]
        versions: [
          ['Sur l’écran, deux pièces se heurtent quand on les assemble.', 'Corriger les dimensions sur l’écran, puis fabriquer', ['Scier quand même, on verra bien', 'Changer la couleur du modèle']],
          ['Le volume de la boîte est trop petit pour les vis de Moussa.', 'Agrandir la boîte dans le modèle avant de couper le bois', ['Couper le bois, puis agrandir la boîte ensuite', 'Enlever les vis de la liste']],
          ['Le couvercle devait se poser pile sur la boîte, mais il dépasse de quelques millimètres.', 'Réduire le couvercle dans le modèle', ['Fabriquer les deux pièces telles quelles', 'Effacer le couvercle du modèle']],
          ['Le modèle montre que l’étagère touche le mur à gauche.', 'Décaler l’étagère dans le modèle, puis fabriquer', ['Fabriquer d’abord, décaler après', 'Cacher le mur dans le logiciel']],
          ['Le modèle est bon : aucune pièce ne se heurte et tout rentre.', 'Passer à la fabrication', ['Refaire tout le modèle depuis le début', 'Jeter le modèle']],
        ],
        genere(c) {
          const [s, bonne, autres] = c.alea.choisir(this.versions);
          return {
            enonce: s + ' Que doit faire Rachel ?',
            reponse: O.choix(c.alea, bonne, autres),
            aide: 'Le modèle sert à corriger les erreurs avant de couper le bois.',
            correction: ['Une erreur se corrige sur l’écran sans gâcher de matière. S’il n’y a aucune erreur, on peut fabriquer.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [longueur, largeur, hauteur de l’intérieur en cm, litres de vis à ranger]
      versions: [[20, 10, 5, 0.8], [25, 10, 6, 2], [30, 20, 10, 5], [20, 15, 5, 2], [25, 20, 8, 3]],
      genere(c) {
        const [L, l, h, vis] = c.alea.choisir(this.versions);
        const v = L * l * h;
        const litres = v / 1000;
        const oui = litres >= vis;
        return {
          enonce: 'Dans le logiciel, Rachel modélise un bac de rangement pour l’atelier. L’intérieur du bac est un pavé de ' + L + ' cm de long, ' + l + ' cm de large et ' + h + ' cm de haut. ' +
            'Moussa voudrait y ranger ' + pl(vis, 'litre') + ' de vis. (1 litre = 1 000 cm³)',
          questions: [
            {
              texte: 'Question 1. Quel est le volume du bac, en cm³ ?',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Le volume d’un pavé, c’est longueur × largeur × hauteur.',
              correction: [L + ' × ' + l + ' × ' + h + ' = ' + v + ' cm³.'],
            },
            {
              texte: 'Question 2. Combien de litres le bac peut-il contenir ?',
              reponse: { type: 'nombre', valeur: litres },
              aide: 'Divise le volume en cm³ par 1 000.',
              correction: [v + ' ÷ 1 000 = ' + pl(litres, 'litre') + '.'],
            },
            {
              texte: 'Question 3. Le bac peut-il contenir toutes les vis de Moussa ?',
              reponse: O.choix(c.alea, oui ? 'Oui' : 'Non', [oui ? 'Non' : 'Oui']),
              aide: 'Compare la contenance du bac au volume de vis à ranger.',
              correction: ['Le bac contient ' + pl(litres, 'litre') + ', et Moussa veut ranger ' + pl(vis, 'litre') + (oui ? ' : tout rentre.' : ' : tout ne rentre pas.'), 'Réponse : ' + (oui ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Explique en deux phrases pourquoi Rachel a intérêt à tester son bac sur l’écran avant de couper le bois.',
              correction: ['Sur l’écran, on trouve les erreurs de mesure sans gâcher de matière.', 'On peut corriger le modèle, puis fabriquer une seule fois.'],
              grille: ['As-tu parlé de repérer les erreurs avant de fabriquer ?', 'As-tu parlé de matière ou de temps gagnés ?', 'Tes phrases sont-elles courtes et claires ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais dessiner une pièce en volume, calculer son volume et tout vérifier avant de fabriquer.',
    carte: ['volume-pave', 'litres-boite', 'avant-fabriquer'],
    papierDuSoir: { exercices: ['volume-pave', 'litres-boite', 'hauteur-assemblage'], defi: true },
    automatismes: [
      {
        id: 'mm-en-cm',
        versions: [[50], [120], [30], [200]],
        genere(c) { const [x] = c.alea.choisir(this.versions); return { enonce: x + ' mm = ? cm', reponse: { type: 'nombre', valeur: x / 10 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Afrique du Sud, le projet Zamani scanne au laser des sites africains pour créer des modèles 3D.',
    prenoms: ['Rachel', 'Moussa', 'Laure'],
  };
});
