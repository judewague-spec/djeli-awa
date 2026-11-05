/* Notion 1 du bloc « Mouvement et forces » : la trajectoire. La meule de la forge, le vélo de Moussa, la balle de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const FORMES = ['Rectiligne', 'Circulaire', 'Courbe'];
  const IMAGES = {
    Rectiligne: { dessin: 'trajectoire', forme: 'droite', legende: 'Le chemin de l’objet', description: 'Le chemin de l’objet est une ligne droite, parcourue de gauche à droite.' },
    Circulaire: { dessin: 'trajectoire', forme: 'cercle', legende: 'Le chemin de l’objet', description: 'Le chemin de l’objet est un cercle, parcouru en tournant.' },
    Courbe: { dessin: 'trajectoire', forme: 'courbe', legende: 'Le chemin de l’objet', description: 'Le chemin de l’objet est une courbe : il monte, puis il redescend.' },
  };

  return {
    id: 'trajectoire',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'La trajectoire d’un mouvement',
    classe: 'cycle 4',
    univers: ['dehors', 'danses', 'appareils'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : caractériser un mouvement, mouvements rectilignes et circulaires.',

    accroche: {
      texte: 'À la forge, le forgeron fait tourner sa grande meule pour aiguiser une lame. Une tache de peinture, sur le bord de la meule, dessine un rond. ' +
        'Dehors, Moussa file à vélo sur la route toute droite. Rachel lui lance une balle : elle monte, puis elle redescend. Trois objets, trois chemins bien différents. Comment les décrire ?',
      image: { dessin: 'trajectoire', forme: 'cercle', legende: 'La tache de peinture de la meule', description: 'La tache de peinture, sur le bord de la meule, dessine un cercle en tournant.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['En ligne droite : rectiligne', 'En rond : circulaire', 'Ni l’un ni l’autre : courbe'], description: 'Trois chemins : en ligne droite, on dit rectiligne ; en rond, on dit circulaire ; sinon, on dit courbe.' },
      etapes: [
        'Imagine que l’objet laisse une trace derrière lui, comme une craie sur le sol.',
        'La trace de Moussa à vélo : une ligne droite.',
        'La trace de la tache de peinture : un cercle.',
        'La trace de la balle de Rachel : une courbe, qui monte et qui redescend.',
        'On décrit donc un mouvement en disant d’abord la forme de sa trace.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un objet qui bouge laisse une trace imaginaire : c’est ' + c.mot('trajectoire') + '. ' +
        'Si elle est droite, le mouvement est ' + c.mot('rectiligne') + '. Si elle est ronde, il est ' + c.mot('circulaire') + '. ' +
        'L’astuce : ferme les yeux, et dessine dans ta tête le chemin de l’objet.',
    },

    vocabulaire: {
      termes: {
        trajectoire: { sesMots: 'le chemin dessiné', officiel: 'la trajectoire', lesDeux: 'le chemin dessiné, que les physiciens appellent la trajectoire' },
        rectiligne: { sesMots: 'en ligne droite', officiel: 'rectiligne', lesDeux: 'en ligne droite, ce que les physiciens appellent rectiligne' },
        circulaire: { sesMots: 'en rond', officiel: 'circulaire', lesDeux: 'en rond, ce que les physiciens appellent circulaire' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le chemin dessiné, en ligne droite, ou en rond. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la trajectoire, pour le chemin dessiné. Rectiligne, pour la ligne droite. Circulaire, pour le rond.',
        'Tu connais les mots officiels : la trajectoire, un mouvement rectiligne, un mouvement circulaire.',
      ],
    },

    exercices: [
      O.qcm('quel-chemin', 'dehors',
        [['Un train roule sur une longue voie toute droite.', 'Rectiligne'], ['Une enfant tourne sur un manège.', 'Circulaire'], ['Une mangue lancée en l’air par Aminata retombe plus loin.', 'Courbe'], ['Une bille tombe tout droit du haut d’une table.', 'Rectiligne'], ['L’extrémité d’une aiguille de montre avance.', 'Circulaire']],
        (x) => x + ' Quelle est la forme du chemin dessiné ?', FORMES,
        'Dessine le chemin dans ta tête : une ligne droite, un rond, ou autre chose ?'),
      {
        id: 'lire-le-dessin',
        univers: 'appareils',
        versions: FORMES,
        genere(c) {
          const f = c.alea.choisir(this.versions);
          return {
            enonce: 'Le dessin montre le chemin d’un objet. Comment décris-tu ce chemin ?',
            image: IMAGES[f],
            reponse: O.choix(c.alea, f, FORMES.filter((x) => x !== f)),
            aide: 'Regarde la forme de la trace : une ligne droite, un rond, ou autre chose ?',
            correction: ['Réponse : ' + f + '.'],
          };
        },
      },
      {
        id: 'tours-de-piste',
        univers: 'dehors',
        // [longueur d'un tour en mètres, nombre de tours]
        versions: [[400, 3], [400, 5], [300, 4], [250, 6], [200, 7]],
        genere(c) {
          const [l, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Esther court sur une piste ronde de ' + l + ' m. Elle fait ' + n + ' tours. Quelle distance parcourt-elle, en mètres ?',
            reponse: { type: 'nombre', valeur: l * n },
            aide: 'Multiplie ' + l + ' par ' + n + '.',
            aideParlee: 'Multiplie la longueur d’un tour par le nombre de tours.',
            correction: ['Distance = ' + l + ' × ' + n + ' = ' + l * n + ' m.'],
          };
        },
      },
      {
        id: 'aller-retour',
        univers: 'dehors',
        // distance de l'aller en mètres
        versions: [450, 800, 650, 1200, 350],
        genere(c) {
          const d = c.alea.choisir(this.versions);
          return {
            enonce: 'Le matin, Moussa va en ligne droite de la forge au puits, à ' + d + ' m, puis il revient par le même chemin. Quelle distance a-t-il parcourue, en mètres ?',
            reponse: { type: 'nombre', valeur: 2 * d },
            aide: 'Il fait ' + d + ' m deux fois.',
            aideParlee: 'Il fait deux fois le même trajet.',
            correction: ['Distance = 2 × ' + d + ' = ' + 2 * d + ' m.'],
          };
        },
      },
      O.qcm('dans-la-danse', 'danses',
        [['Aminata tourne sur elle-même. Sa main, bras tendu, dessine…', 'Un cercle'], ['Rachel avance tout droit sur la scène. Sa tête dessine…', 'Une ligne droite'], ['Moussa saute vers l’avant. Son pied dessine…', 'Une courbe']],
        (x) => x, ['Un cercle', 'Une ligne droite', 'Une courbe'],
        'Imagine une craie attachée au point qui bouge. Que dessine-t-elle ?'),
    ],

    defi: {
      // [longueur d'un tour, tours, sortie en ligne droite] (mètres)
      versions: [[400, 3, 200], [300, 4, 150], [400, 2, 300], [250, 4, 100]],
      genere(c) {
        const [l, n, s] = c.alea.choisir(this.versions);
        return {
          enonce: 'Esther s’entraîne au stade. Elle fait ' + n + ' tours d’une piste ronde de ' + l + ' m. Puis elle sort du stade et rejoint la forge par une route toute droite de ' + s + ' m.',
          questions: [
            {
              texte: 'Question 1. Comment se nomme le mouvement d’Esther sur la route toute droite ?',
              reponse: O.choix(c.alea, 'Rectiligne', ['Circulaire', 'Courbe']),
              aide: 'La route est toute droite.',
              correction: ['Sur une route toute droite, le mouvement est rectiligne.', 'Réponse : Rectiligne.'],
            },
            {
              texte: 'Question 2. Calcule la distance totale parcourue, en mètres.',
              reponse: { type: 'nombre', valeur: l * n + s },
              aide: 'Ajoute la distance des tours et celle de la route.',
              correction: ['Sur la piste : ' + l + ' × ' + n + ' = ' + l * n + ' m.', 'Au total : ' + l * n + ' + ' + s + ' = ' + (l * n + s) + ' m.'],
            },
            {
              texte: 'Question 3. Décris en une phrase la forme du chemin d’Esther pendant ses tours de piste, en employant le mot officiel.',
              correction: ['Pendant ses tours de piste, la trajectoire d’Esther a la forme d’un cercle : son mouvement est circulaire.'],
              grille: ['As-tu employé le mot « trajectoire » ?', 'As-tu dit que le mouvement est circulaire ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu vois le chemin que dessine tout ce qui bouge : en ligne droite, en rond ou en courbe.',
    carte: ['quel-chemin', 'lire-le-dessin', 'tours-de-piste'],
    papierDuSoir: { exercices: ['tours-de-piste', 'aller-retour'], defi: true },
    automatismes: [
      {
        id: 'tours-rapides',
        versions: [[400, 2], [400, 3], [200, 4], [300, 2]],
        genere(c) { const [l, n] = c.alea.choisir(this.versions); return { enonce: n + ' tours de ' + l + ' m : combien de mètres ?', reponse: { type: 'nombre', valeur: l * n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? On attribue aux Aborigènes d’Australie l’invention du boomerang qui revient. Bien lancé, il suit une trajectoire courbe qui le ramène à son point de départ.',
    prenoms: ['Moussa', 'Rachel', 'Esther', 'Aminata'],
  };
});
