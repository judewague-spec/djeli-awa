/* Notion 2 du bloc « Signaux et Univers » : la lumière va tout droit. La torche, la main de Moussa et l’ombre sur le mur.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr, qcm, choix } = O;

  return {
    id: 'propagation-lumiere',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'La lumière va tout droit',
    classe: 'cycle 4',
    univers: ['dehors', 'famille', 'champetre'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Des signaux pour observer et communiquer » : propagation rectiligne de la lumière, rayon lumineux, ombre.',

    accroche: {
      texte: 'Rachel essaie sa torche. Moussa met sa main devant le faisceau. Une ombre apparaît sur le mur. ' +
        'La lumière avance tout droit. Elle ne contourne pas la main.',
      image: { dessin: 'chaine', etapes: ['La torche envoie sa lumière', 'La main arrête la lumière', 'Une ombre apparaît sur le mur'], description: 'La torche envoie sa lumière tout droit. La main de Moussa l’arrête. Une ombre apparaît alors sur le mur.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Torche, objet, mur : alignés', 'Objet près de la torche : grande ombre', 'Objet près du mur : petite ombre'], description: 'La torche, l’objet et le mur sont alignés. Si l’objet est près de la torche, l’ombre est grande. S’il est près du mur, l’ombre est plus petite.' },
      etapes: [
        'Pose une torche, un objet et un mur en ligne. Allume la torche.',
        'La lumière part de la torche et avance en ligne droite.',
        'L’objet arrête une partie de la lumière. Derrière lui, il y a une ombre.',
        'Rapproche l’objet de la torche : l’ombre grandit. Rapproche-le du mur : elle rétrécit.',
      ],
    },

    decouverte: {
      texte: (c) => 'Suis la lumière de la torche : c’est ' + c.mot('rayon') + '. Regarde comment elle avance : c’est ' + c.mot('rectiligne') + '. ' +
        'Derrière la main, regarde : c’est ' + c.mot('ombre') + '. L’astuce : pour tracer un rayon, prends toujours une règle.',
    },

    vocabulaire: {
      termes: {
        rayon: { sesMots: 'une ligne droite de lumière', officiel: 'un rayon lumineux', lesDeux: 'une ligne droite de lumière, que les physiciens appellent un rayon lumineux' },
        rectiligne: { sesMots: 'un voyage tout droit', officiel: 'la propagation rectiligne', lesDeux: 'un voyage tout droit, que les physiciens appellent la propagation rectiligne' },
        ombre: { sesMots: 'la tache sombre sur le mur', officiel: 'l’ombre portée', lesDeux: 'la tache sombre sur le mur, que les physiciens appellent l’ombre portée' },
      },
      textes: [
        'Pour l’instant, garde tes mots. Il y a une ligne droite de lumière, un voyage tout droit, et la tache sombre sur le mur. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : un rayon lumineux, la propagation rectiligne, et l’ombre portée.',
        'Tu connais les mots officiels : un rayon lumineux, la propagation rectiligne, et l’ombre portée.',
      ],
    },

    exercices: [
      qcm('taille-de-l-ombre', 'dehors',
        [
          ['Rachel rapproche sa main de la torche. L’ombre sur le mur devient…', 'Plus grande'],
          ['Rachel rapproche sa main du mur. L’ombre sur le mur devient…', 'Plus petite'],
          ['Moussa éloigne la balle de la torche, vers le mur. L’ombre devient…', 'Plus petite'],
          ['Moussa rapproche la balle de la torche. L’ombre devient…', 'Plus grande'],
        ],
        (x) => x, ['Plus grande', 'Plus petite', 'De la même taille'],
        'Les rayons partent de la torche et s’écartent : plus l’objet est près de la torche, plus il arrête de lumière.'),
      qcm('tuyau', 'maison-courses',
        [
          ['un tuyau droit', 'Oui', 'Le tuyau est droit : la lumière le traverse en ligne droite.'],
          ['un tuyau courbé en U, aux parois opaques', 'Non', 'La lumière ne tourne pas : elle ne suit pas la courbe du tuyau.'],
          ['un tuyau droit, bouché au milieu par un carton', 'Non', 'Le carton arrête la lumière.'],
          ['un long tuyau droit et vide', 'Oui', 'La lumière avance tout droit jusqu’au bout.'],
        ],
        (x) => 'Moussa allume une torche à un bout d’' + x + '. Rachel regarde par l’autre bout. Voit-elle la lumière ?', ['Oui', 'Non'],
        'Souviens-toi : la lumière avance en ligne droite.'),
      {
        id: 'longueur-de-l-ombre',
        univers: 'champetre',
        // [hauteur de la première perche en m, son ombre en m, hauteur de l’arbre en m]
        versions: [[1, 2, 3], [2, 3, 4], [2, 1, 6], [3, 2, 9], [4, 6, 2]],
        genere(c) {
          const [h1, o1, h2] = c.alea.choisir(this.versions);
          const k = h2 / h1;
          const o2 = o1 * k;
          return {
            enonce: 'Au même endroit et au même moment, une perche de ' + h1 + ' m a une ombre de ' + o1 + ' m. Quelle est la longueur, en mètres, de l’ombre d’un arbre de ' + h2 + ' m ?',
            reponse: { type: 'nombre', valeur: o2 },
            aide: 'L’ombre est proportionnelle à la hauteur. Cherche par combien la hauteur est multipliée.',
            aideParlee: 'L’ombre est proportionnelle à la hauteur. Cherche par combien la hauteur est multipliée.',
            correction: [h2 + ' ÷ ' + h1 + ' = ' + ecr(k) + '.', o1 + ' × ' + ecr(k) + ' = ' + ecr(o2) + ' m.'],
          };
        },
      },
      qcm('vrai-ou-faux', 'famille',
        [
          ['La lumière avance en ligne droite dans l’air.', 'Vrai', 'C’est la propagation rectiligne.'],
          ['La lumière contourne les objets.', 'Faux', 'Elle est arrêtée par un objet opaque : il y a une ombre.'],
          ['Un rayon lumineux est une ligne droite.', 'Vrai', 'On le trace toujours avec une règle.'],
          ['Une ombre apparaît devant la lampe, avant l’objet.', 'Faux', 'L’ombre est derrière l’objet, du côté opposé à la lampe.'],
          ['Un objet opaque arrête la lumière.', 'Vrai', 'La lumière ne le traverse pas.'],
          ['Pour tracer un rayon lumineux, on utilise une règle.', 'Vrai', 'Le rayon est une ligne droite.'],
        ],
        (x) => x + ' Vrai ou faux ?', ['Vrai', 'Faux'],
        'Souviens-toi : la lumière avance tout droit.'),
      qcm('ou-est-l-ombre', 'famille',
        [
          ['Une torche éclaire un mur. Rachel place un carton entre la torche et le mur.', 'Du côté du mur, derrière l’objet'],
          ['Une lampe éclaire un mur. Moussa place sa main entre la lampe et le mur.', 'Du côté du mur, derrière l’objet'],
          ['Une bougie éclaire un mur. Aminata place une balle entre la bougie et le mur.', 'Du côté du mur, derrière l’objet'],
        ],
        (x) => x + ' Où se forme l’ombre ?',
        ['Du côté du mur, derrière l’objet', 'Du côté de la source, devant l’objet', 'Sur la source de lumière'],
        'La lumière va de la source vers le mur. Elle est arrêtée par l’objet.'),
    ],

    defi: {
      // [hauteur de la première perche en m, son ombre en m, hauteur de la seconde en m, hauteur de la troisième en m]
      versions: [[2, 3, 4, 1], [1, 2, 3, 2], [4, 6, 2, 6], [2, 1, 6, 1]],
      genere(c) {
        const [h1, o1, h2, h3] = c.alea.choisir(this.versions);
        const o2 = (o1 * h2) / h1;
        const plusLongue = h3 > h1;
        return {
          enonce: 'En fin d’après-midi, Rachel et Moussa discutent dans la cour. Une perche de ' + h1 + ' m projette une ombre de ' + o1 + ' m. Tous les objets de la cour sont éclairés par le même Soleil.',
          questions: [
            {
              texte: 'Question 1. Pourquoi y a-t-il une tache sombre derrière la perche ?',
              reponse: choix(c.alea, 'La perche arrête la lumière, qui avance tout droit.', ['La lumière contourne la perche.', 'La perche fabrique de l’obscurité.']),
              aide: 'Pense à la propagation rectiligne.',
              correction: ['La lumière avance en ligne droite et ne contourne pas la perche.', 'Réponse : La perche arrête la lumière, qui avance tout droit.'],
            },
            {
              texte: 'Question 2. Au même moment, quelle est la longueur, en mètres, de l’ombre d’une autre perche de ' + h2 + ' m ?',
              reponse: { type: 'nombre', valeur: o2 },
              aide: 'L’ombre est proportionnelle à la hauteur.',
              aideParlee: 'L’ombre est proportionnelle à la hauteur.',
              correction: [h2 + ' ÷ ' + h1 + ' = ' + ecr(h2 / h1) + '.', o1 + ' × ' + ecr(h2 / h1) + ' = ' + ecr(o2) + ' m.'],
            },
            {
              texte: 'Question 3. Une perche de ' + h3 + ' m aura-t-elle, au même moment, une ombre plus longue que celle de la première perche ?',
              reponse: choix(c.alea, plusLongue ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare les hauteurs : l’ombre suit la hauteur.',
              aideParlee: 'Compare les hauteurs : l’ombre suit la hauteur.',
              correction: [h3 + ' m, c’est ' + (plusLongue ? 'plus haut' : 'moins haut') + ' que ' + h1 + ' m.', 'Son ombre est ' + (plusLongue ? 'plus longue' : 'plus courte') + ' que celle de la première perche.', 'Réponse : ' + (plusLongue ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Explique avec tes mots pourquoi on peut tracer un rayon lumineux avec une règle. Cite la propagation rectiligne.',
              correction: ['La lumière avance en ligne droite dans l’air : c’est la propagation rectiligne.', 'Un rayon lumineux est donc une droite, qu’on trace avec une règle.'],
              grille: ['As-tu dit que la lumière avance en ligne droite ?', 'As-tu cité la propagation rectiligne ?', 'As-tu relié le rayon à la règle ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais que la lumière va tout droit, et tu sais d’où vient l’ombre derrière la main de Moussa.',
    carte: ['taille-de-l-ombre', 'longueur-de-l-ombre', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['longueur-de-l-ombre', 'tuyau'], defi: true },
    automatismes: [
      {
        id: 'doubler-tripler',
        versions: [[2, 3], [3, 4], [4, 3], [5, 2]],
        genere(c) { const [a, k] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + k + ' = ?', reponse: { type: 'nombre', valeur: a * k } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Ibn al-Haytham, qui vécut en Égypte, au Caire, a montré par l’expérience que la lumière va en ligne droite.',
    prenoms: ['Moussa', 'Aminata'],
  };
});
