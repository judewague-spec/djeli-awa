/* Notion 5 du bloc « Signaux et Univers » : le son et le vide. Le tambour de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { qcm, choix } = O;

  return {
    id: 'propagation-son',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'Le son et le vide',
    classe: 'cycle 4',
    univers: ['danses', 'chansons', 'dehors'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Des signaux pour observer et communiquer » : signal sonore, vibration, propagation dans un milieu matériel, pas de son dans le vide.',

    accroche: {
      texte: 'Moussa frappe son tambour. La peau vibre. Le son voyage dans l’air jusqu’à l’oreille de Rachel. ' +
        'Dans l’espace, il n’y a pas d’air. Un tambour y vibrerait pour rien : personne n’entendrait.',
      image: { dessin: 'chaine', etapes: ['Moussa frappe le tambour', 'La peau vibre et l’air vibre', 'Rachel entend le son'], description: 'Moussa frappe le tambour. La peau vibre, et l’air autour vibre aussi. Rachel entend alors le son.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Source qui vibre', 'Milieu : air, eau ou solide', 'Oreille : on entend', 'Dans le vide : pas de son'], description: 'Une source qui vibre fait vibrer un milieu : l’air, l’eau ou un solide. Le son arrive à l’oreille. Dans le vide, il n’y a pas de milieu : on n’entend pas de son.' },
      etapes: [
        'Pose ta main sur ta gorge et dis « ah ». Tu sens ta gorge vibrer.',
        'Un son naît toujours d’une vibration. Elle fait vibrer l’air autour, de proche en proche.',
        'Le son voyage aussi dans l’eau et dans les solides, comme un mur ou un rail de train.',
        'Dans le vide, il n’y a rien qui puisse vibrer. Le son ne voyage pas.',
      ],
    },

    decouverte: {
      texte: (c) => 'Touche le tambour : tu sens ' + c.mot('vibration') + '. ' +
        'Pour voyager, le son a besoin ' + c.mot('milieu') + '. Dans le vide, il n’y a rien à faire vibrer : on n’entend aucun son.',
    },

    vocabulaire: {
      termes: {
        vibration: { sesMots: 'un petit mouvement de va-et-vient', officiel: 'une vibration', lesDeux: 'un petit mouvement de va-et-vient, que les physiciens appellent une vibration' },
        milieu: { sesMots: 'd’air, d’eau ou d’un solide', officiel: 'd’un milieu matériel', lesDeux: 'd’air, d’eau ou d’un solide, que les physiciens appellent un milieu matériel' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un petit mouvement de va-et-vient, et de l’air, de l’eau ou un solide. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : une vibration, et un milieu matériel. Le son se propage dans un milieu matériel, jamais dans le vide.',
        'Tu connais les mots officiels : une vibration, et un milieu matériel.',
      ],
    },

    exercices: [
      qcm('entend-on', 'danses',
        [
          ['Deux astronautes sont loin l’un de l’autre dans l’espace, sans radio ni contact. L’un crie.', 'Non', 'Il n’y a pas d’air entre eux : le son ne voyage pas dans le vide.'],
          ['Moussa crie dans l’air d’une salle de danse.', 'Oui', 'L’air est un milieu matériel : le son y voyage.'],
          ['Un plongeur est sous l’eau d’une piscine. On donne un coup sur la paroi.', 'Oui', 'L’eau est un milieu matériel : le son y voyage.'],
          ['Rachel colle l’oreille contre un mur. Laure parle de l’autre côté.', 'Oui', 'Le mur est un solide : le son y voyage.'],
          ['Un tambour est frappé dans l’espace, très loin de tout, sans aucun air autour.', 'Non', 'Sans air, rien ne transporte la vibration.'],
        ],
        (x) => x + ' Entend-on le son ?', ['Oui', 'Non'],
        'Demande-toi s’il y a de l’air, de l’eau ou un solide pour porter la vibration.'),
      qcm('quel-milieu', 'chansons',
        [
          ['Moussa parle à Rachel, dans la même pièce.', 'Un gaz', 'Le son passe par l’air, qui est un gaz.'],
          ['Un plongeur entend le moteur d’un bateau.', 'Un liquide', 'Le son passe par l’eau, qui est un liquide.'],
          ['Rachel colle l’oreille contre un rail de train et entend le train arriver.', 'Un solide', 'Le son passe par le métal du rail, qui est un solide.'],
          ['Clarisse appelle Rachel d’un bout à l’autre de la cour.', 'Un gaz', 'Le son passe par l’air, qui est un gaz.'],
          ['Rachel entend son voisin à travers une cloison en bois.', 'Un solide', 'Le son passe par le bois, qui est un solide.'],
        ],
        (x) => x + ' Dans quel type de milieu le son voyage-t-il surtout ?', ['Un gaz', 'Un liquide', 'Un solide'],
        'Cherche ce qui se trouve entre la source et l’oreille.'),
      {
        id: 'qui-vibre',
        univers: 'danses',
        // [situation, ce qui vibre, deux mauvaises réponses]
        versions: [
          ['Moussa frappe son tambour. Qu’est-ce qui vibre ?', 'La peau du tambour', ['Rien ne vibre', 'La lumière']],
          ['Rachel pince la corde d’une guitare. Qu’est-ce qui vibre ?', 'La corde', ['Rien ne vibre', 'La lumière']],
          ['Aminata chante. Qu’est-ce qui vibre dans sa gorge ?', 'Ses cordes vocales', ['Rien ne vibre', 'La lumière']],
          ['Moussa joue de la flûte. Qu’est-ce qui vibre dans le tube ?', 'L’air', ['Rien ne vibre', 'La lumière']],
        ],
        genere(c) {
          const [q, bonne, autres] = c.alea.choisir(this.versions);
          return {
            enonce: q,
            reponse: choix(c.alea, bonne, autres),
            aide: 'Un son naît toujours d’une vibration. Cherche ce qui bouge très vite.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      qcm('vrai-ou-faux', 'dehors',
        [
          ['Le son voyage dans le vide.', 'Faux', 'Il lui faut un milieu matériel.'],
          ['Le son peut voyager dans l’eau.', 'Vrai', 'L’eau est un milieu matériel.'],
          ['Un son vient toujours d’une vibration.', 'Vrai', 'La source du son vibre.'],
          ['Le son peut voyager dans un solide.', 'Vrai', 'Un mur ou un rail transmet le son.'],
          ['Dans le vide de l’espace, on entend les explosions sans radio.', 'Faux', 'Sans milieu, le son ne voyage pas.'],
          ['Le son voyage dans l’air.', 'Vrai', 'L’air est le milieu habituel du son.'],
        ],
        (x) => x + ' Vrai ou faux ?', ['Vrai', 'Faux'],
        'Souviens-toi : le son a besoin d’un milieu matériel.'),
      {
        id: 'compter-les-milieux',
        univers: 'champetre',
        // [liste, nombre de cas où le son voyage, les cas]
        versions: [
          ['l’air ; le vide de l’espace ; l’eau ; le bois', 3, 'l’air, l’eau et le bois'],
          ['le vide de l’espace ; un mur de béton ; l’air ; le vide d’une cloche à vide', 2, 'le mur de béton et l’air'],
          ['l’eau ; le verre ; l’air ; le métal', 4, 'l’eau, le verre, l’air et le métal'],
          ['le vide de l’espace ; le vide d’une cloche à vide ; l’air', 1, 'l’air'],
          ['le vide d’une cloche à vide ; l’eau ; le vide de l’espace', 1, 'l’eau'],
        ],
        genere(c) {
          const [l, n, qui] = c.alea.choisir(this.versions);
          return {
            enonce: 'Voici une liste : ' + l + '. Dans combien de ces cas le son peut-il voyager ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Le son voyage dans un milieu matériel, jamais dans le vide.',
            correction: ['Le son voyage dans : ' + qui + '.', 'Réponse : ' + n + '.'],
          };
        },
      },
    ],

    defi: {
      // [contenu de la cloche, le capteur détecte-t-il un son, phrase qui explique]
      versions: [
        ['de l’air', true, 'L’air porte le son.'],
        ['du vide, après le pompage de l’air', false, 'Il n’y a plus de milieu pour porter le son.'],
        ['de l’eau, avec un capteur et un réveil étanches', true, 'L’eau porte le son.'],
        ['du vide complet', false, 'Il n’y a plus de milieu pour porter le son.'],
      ],
      genere(c) {
        const [contenu, entend, raison] = c.alea.choisir(this.versions);
        return {
          enonce: 'Au club de sciences, Rachel place un réveil qui sonne dans une cloche fermée. Un capteur de bruit est posé dans la cloche, à côté du réveil. La cloche contient ' + contenu + '.',
          questions: [
            {
              texte: 'Question 1. Que fait le réveil au moment où il sonne ?',
              reponse: choix(c.alea, 'Il vibre', ['Il reste immobile', 'Il fabrique de la lumière']),
              aide: 'Un son naît d’une vibration.',
              correction: ['Un son naît toujours d’une vibration.', 'Réponse : Il vibre.'],
            },
            {
              texte: 'Question 2. Le capteur détecte-t-il un son ?',
              reponse: choix(c.alea, entend ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Cherche s’il y a un milieu entre le réveil et le capteur.',
              correction: [entend ? 'Entre le réveil et le capteur, il y a un milieu : le son voyage.' : 'Entre le réveil et le capteur, il n’y a aucun milieu : le son ne voyage pas.', 'Réponse : ' + (entend ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 3. Quelle phrase explique ce que mesure le capteur ?',
              reponse: choix(c.alea, raison, ['Le son voyage mieux dans le vide.', 'Le réveil ne vibre plus.']),
              aide: 'Pense au milieu matériel.',
              correction: [raison],
            },
            {
              texte: 'Question 4. Explique avec tes mots pourquoi on n’entend aucun son dans l’espace. Utilise les mots vibration et milieu.',
              correction: ['Un son naît d’une vibration, qui doit se transmettre de proche en proche.', 'Dans l’espace, il n’y a pas de milieu matériel : le son ne voyage pas.'],
              grille: ['As-tu parlé de la vibration ?', 'As-tu dit que le son a besoin d’un milieu matériel ?', 'As-tu dit qu’il n’y en a pas dans le vide ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais que le son naît d’une vibration, et qu’il ne voyage pas dans le vide.',
    carte: ['entend-on', 'quel-milieu', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['quel-milieu', 'compter-les-milieux'], defi: true },
    automatismes: [
      {
        id: 'doubles',
        versions: [[7], [12], [15], [25]],
        genere(c) { const [n] = c.alea.choisir(this.versions); return { enonce: 'Le double de ' + n + ' = ?', reponse: { type: 'nombre', valeur: 2 * n } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Allemagne, Otto von Guericke a montré qu’une cloche qui sonne dans le vide ne s’entend plus.',
    prenoms: ['Moussa', 'Aminata', 'Clarisse', 'Laure'],
  };
});
