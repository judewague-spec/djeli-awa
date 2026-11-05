/* Notion 1 du bloc de technologie « Le numérique et l'intelligence artificielle » : fichiers, dossiers et formats. Le téléphone de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const PHOTO = 'Une photo', CHANSON = 'Une chanson', VIDEO = 'Une vidéo', TEXTE = 'Un texte';

  return {
    id: 'fichiers-dossiers',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Fichiers, dossiers et formats',
    classe: 'cycle 4',
    univers: ['appareils', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : fichiers, dossiers, formats.',

    accroche: {
      texte: 'Rachel cherche la photo de la fête de Laure sur son téléphone. Mais tout est mélangé : des photos, des chansons, des recettes, des devoirs. Elle fait défiler pendant dix minutes. ' +
        'Dans une cuisine, chaque chose a son tiroir. Et dans un téléphone ?',
      image: { dessin: 'chaine', etapes: ['Le téléphone', 'Le tiroir des photos', 'La photo de la fête'], description: 'Du plus grand au plus petit : le téléphone, le tiroir des photos, puis la photo de la fête.' },
    },

    manipulation: {
      image: { dessin: 'facture', titre: 'Le tiroir de Rachel', lignes: [['fete.jpg', 'une photo'], ['refrain.mp3', 'une chanson'], ['danse.mp4', 'une vidéo'], ['recette.pdf', 'un texte']], description: 'Une liste de quatre documents : fete point jpg, une photo ; refrain point mp3, une chanson ; danse point mp4, une vidéo ; recette point pdf, un texte.' },
      etapes: [
        'Chaque photo, chanson ou recette est un document, avec un nom.',
        'On range les documents dans des tiroirs, et on peut mettre un tiroir dans un autre.',
        'La fin du nom, après le point, dit quel genre de document c’est, et avec quelle application l’ouvrir.',
        'Un nom clair et le bon tiroir : tu retrouves tout en quelques secondes.',
      ],
    },

    decouverte: {
      texte: (c) => 'Chaque photo ou chanson du téléphone est enregistrée comme ' + c.mot('fichier') + '. On le range dans ' + c.mot('dossier') + '. ' +
        'La fin de son nom, après le point, donne ' + c.mot('format') + '. ' +
        'L’astuce : un nom clair, un bon rangement, et tu retrouves tout.',
    },

    vocabulaire: {
      termes: {
        fichier: { sesMots: 'un document', officiel: 'un fichier', lesDeux: 'un document, que l’on appelle un fichier' },
        dossier: { sesMots: 'un tiroir', officiel: 'un dossier', lesDeux: 'un tiroir, que l’on appelle un dossier' },
        format: { sesMots: 'son genre', officiel: 'son format', lesDeux: 'son genre, que l’on appelle son format' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le document, le tiroir, et le genre du document. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un fichier, pour le document. Un dossier, pour le tiroir. Et le format, pour son genre.',
        'Tu connais les mots officiels : le fichier, le dossier et le format.',
      ],
    },

    exercices: [
      Q('quel-genre', 'famille',
        [['fete.jpg', PHOTO], ['refrain.mp3', CHANSON], ['danse.mp4', VIDEO], ['devoir.pdf', TEXTE], ['coiffure.png', PHOTO]],
        (x) => 'Que contient le fichier « ' + x + ' » ?', [PHOTO, CHANSON, VIDEO, TEXTE],
        'Regarde les lettres après le point.',
        'Les formats jpg et png sont des photos, mp3 du son, mp4 de la vidéo, et pdf souvent un texte mis en page.'),
      Q('quel-format', 'appareils',
        [['une chanson', 'mp3'], ['une photo', 'jpg'], ['une vidéo', 'mp4']],
        (x) => 'Quel format convient pour enregistrer ' + x + ' ?', ['mp3', 'jpg', 'mp4'],
        'Le son, l’image et l’image qui bouge ont chacun leur format.',
        'Le format mp3 garde du son, jpg une image fixe, mp4 une vidéo.'),
      Q('bon-rangement', 'famille',
        [['Où Rachel range-t-elle le mieux la photo de la fête de Laure ?', 'Dans Photos, puis dans Fête de Laure'], ['Quel rangement l’aide le plus à retrouver cette photo ?', 'Dans Photos, puis dans Fête de Laure']],
        (x) => x, ['Dans Photos, puis dans Fête de Laure', 'Dans Recettes', 'Avec tous les fichiers, sans dossier'],
        'Va du plus large au plus précis.',
        'Un dossier large, puis un dossier précis : on suit un chemin logique jusqu’au fichier.'),
      {
        id: 'fichiers-en-tout',
        univers: 'famille',
        // [dossiers, fichiers par dossier]
        versions: [[4, 12], [6, 15], [5, 20], [8, 25], [3, 40], [7, 30]],
        genere(c) {
          const [d, f] = c.alea.choisir(this.versions);
          return {
            enonce: 'Clarisse a ' + d + ' dossiers de photos. Chacun contient ' + f + ' fichiers. Combien de fichiers a-t-elle en tout ?',
            reponse: { type: 'nombre', valeur: d * f },
            aide: 'Calcule ' + d + ' × ' + f + '.',
            aideParlee: 'Multiplie le nombre de dossiers par le nombre de fichiers d’un dossier.',
            correction: [d + ' × ' + f + ' = ' + d * f + ' fichiers.'],
          };
        },
      },
      {
        id: 'apres-le-tri',
        univers: 'appareils',
        // [fichiers, supprimés]
        versions: [[120, 35], [250, 80], [90, 25], [300, 120], [75, 18], [160, 45]],
        genere(c) {
          const [n, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le dossier Téléchargements de Moussa contient ' + n + ' fichiers. Il en supprime ' + s + '. Combien de fichiers reste-t-il ?',
            reponse: { type: 'nombre', valeur: n - s },
            aide: 'Calcule ' + n + ' − ' + s + '.',
            aideParlee: 'Enlève les fichiers supprimés au nombre de départ.',
            correction: [n + ' − ' + s + ' = ' + (n - s) + ' fichiers.'],
          };
        },
      },
    ],

    defi: {
      // [photos, chansons, vidéos]
      versions: [[40, 25, 5], [60, 30, 10], [35, 20, 15], [50, 45, 5]],
      genere(c) {
        const [p, s, v] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : la clé USB de Laure a trois dossiers. Le dossier Photos contient ' + p + ' fichiers jpg, le dossier Musique ' + s + ' fichiers mp3, le dossier Vidéos ' + v + ' fichiers mp4. Laure cherche la chanson « refrain.mp3 ».',
          questions: [
            {
              texte: 'Question 1. Combien de fichiers y a-t-il sur la clé ?',
              reponse: { type: 'nombre', valeur: p + s + v },
              aide: 'Additionne les fichiers des trois dossiers.',
              correction: [p + ' + ' + s + ' + ' + v + ' = ' + (p + s + v) + ' fichiers.'],
            },
            {
              texte: 'Question 2. Dans quel dossier se trouve « refrain.mp3 » ?',
              reponse: O.choix(c.alea, 'Musique', ['Photos', 'Musique', 'Vidéos']),
              aide: 'Regarde le format du fichier.',
              correction: ['Le format mp3 est un format de son.', 'Réponse : Musique.'],
            },
            {
              texte: 'Question 3. Explique pourquoi il vaut mieux ranger ses fichiers dans des dossiers, avec des noms clairs.',
              correction: ['On retrouve plus vite un fichier précis, sans tout faire défiler.', 'Un nom clair dit ce que le fichier contient, sans avoir à l’ouvrir.'],
              grille: ['As-tu parlé de la rapidité pour retrouver un fichier ?', 'As-tu parlé du rôle du nom ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Fichier, dossier, format : ton téléphone n’a plus de secret, et chaque chose a son tiroir.',
    carte: ['quel-genre', 'quel-format', 'bon-rangement'],
    papierDuSoir: { exercices: ['fichiers-en-tout', 'apres-le-tri'], defi: true },
    automatismes: [
      {
        id: 'format-rapide',
        versions: [['mp3', CHANSON], ['jpg', PHOTO], ['mp4', VIDEO]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Le format ' + d + ' contient :', reponse: O.choix(c.alea, b, [PHOTO, CHANSON, VIDEO]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Allemagne, des chercheurs de l’institut Fraunhofer ont choisi en 1995 l’extension de fichier mp3.',
    prenoms: ['Rachel', 'Laure', 'Clarisse', 'Moussa'],
  };
});
