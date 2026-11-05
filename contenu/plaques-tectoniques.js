/* Notion 2 du bloc SVT « Planète Terre, environnement, action humaine » : les plaques tectoniques. La carte du monde de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ecr = O.ecr;
  const DIV = 'Divergence', CONV = 'Convergence', IMMO = 'Les plaques ne bougent pas';
  const mettre = (n, s, p) => (n < 2 ? s : p);
  const esp = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return {
    id: 'plaques-tectoniques',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Les plaques tectoniques',
    classe: 'cycle 4',
    univers: ['dehors', 'champetre'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : la tectonique des plaques, mouvements des plaques de quelques centimètres par an.',

    accroche: {
      texte: 'Rachel regarde une carte du monde. Moussa lui dit : « Les continents bougent ! » Elle rit, mais il a raison. ' +
        'La surface de la Terre est découpée comme un puzzle, et ses pièces se déplacent très lentement.',
      image: { dessin: 'chaine', etapes: ['La surface de la Terre est un puzzle', 'Ses grandes pièces bougent lentement', 'Chaque année, de quelques centimètres'], description: 'La surface de la Terre est un puzzle de grandes pièces rigides. Ces pièces bougent lentement, de quelques centimètres chaque année.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Les pièces s’éloignent : du nouveau fond d’océan se forme', 'Les pièces se rapprochent : montagnes, ou plongée de l’une sous l’autre'], description: 'Deux cas. Quand deux pièces s’éloignent, du nouveau fond d’océan se forme entre elles. Quand deux pièces se rapprochent, cela fait des montagnes, ou l’une plonge sous l’autre.' },
      etapes: [
        'Regarde la carte : la surface de la Terre est découpée en grandes pièces rigides, comme un puzzle.',
        'Ces pièces portent les continents et les océans. Elles bougent de quelques centimètres par an.',
        'Au milieu de l’Atlantique, deux pièces s’éloignent. Du nouveau fond d’océan se forme entre elles.',
        'Ailleurs, deux pièces se rapprochent et se poussent. Cela peut faire des montagnes, ou faire plonger l’une sous l’autre.',
        'Les bords de ces pièces sont donc des zones actives, avec des séismes et des volcans.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde une pièce de la carte : c’est ' + c.mot('plaque') + '. Elle avance de quelques centimètres par an. ' +
        'Deux pièces peuvent aller dans des sens opposés : c’est ' + c.mot('divergence') + '. Elles peuvent aussi aller l’une vers l’autre : c’est ' + c.mot('convergence') + '. ' +
        'L’astuce : à chaque rencontre ou séparation, la Terre se plisse, se déchire ou se refait.',
    },

    vocabulaire: {
      termes: {
        plaque: { sesMots: 'un morceau du puzzle de la Terre', officiel: 'une plaque tectonique', lesDeux: 'un morceau du puzzle de la Terre, que l’on appelle une plaque tectonique' },
        divergence: { sesMots: 'un éloignement', officiel: 'une divergence', lesDeux: 'un éloignement, que les scientifiques appellent une divergence' },
        convergence: { sesMots: 'un rapprochement', officiel: 'une convergence', lesDeux: 'un rapprochement, que les scientifiques appellent une convergence' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un morceau du puzzle, un éloignement et un rapprochement. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : une plaque tectonique, pour le morceau du puzzle. L’éloignement est une divergence, le rapprochement est une convergence.',
        'Tu connais les mots officiels : la plaque tectonique, la divergence et la convergence.',
      ],
    },

    exercices: [
      O.qcm('quel-mouvement', 'dehors',
        [['Au milieu de l’océan, deux plaques s’éloignent l’une de l’autre.', DIV, 'Quand deux plaques s’éloignent, c’est une divergence.'],
          ['Deux plaques se poussent l’une vers l’autre et forment une chaîne de montagnes.', CONV, 'Quand deux plaques se rapprochent, c’est une convergence.'],
          ['Deux plaques s’écartent, et du nouveau fond d’océan se forme entre elles.', DIV, 'Quand deux plaques s’éloignent, c’est une divergence.'],
          ['Une plaque plonge sous une autre qui la pousse.', CONV, 'Quand deux plaques se rapprochent et se poussent, c’est une convergence.']],
        (x) => x + ' Quel mouvement est-ce ?', [DIV, CONV, IMMO],
        'S’éloigner, c’est la divergence. Se rapprocher, c’est la convergence.'),
      O.qcm('vrai-ou-faux', 'champetre',
        [['Les plaques bougent de quelques centimètres par an.', 'Vrai'], ['Les plaques sont immobiles depuis toujours.', 'Faux'], ['Les continents sont posés sur des plaques qui se déplacent.', 'Vrai'], ['Les plaques avancent de plusieurs mètres chaque jour.', 'Faux']].map((v) => [v[0], v[1], 'La surface de la Terre est découpée en plaques. Elles se déplacent très lentement, de quelques centimètres par an.']),
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Les plaques bougent, mais très lentement.'),
      {
        id: 'avance-en-metres',
        univers: 'champetre',
        // [centimètres par an, années] ; résultat en mètres
        versions: [[2, 50], [3, 100], [4, 50], [5, 100], [2, 200], [4, 25], [5, 60]],
        genere(c) {
          const [v, a] = c.alea.choisir(this.versions);
          const m = Math.round(v * a) / 100;
          return {
            enonce: 'Dans cet exemple, une plaque avance de ' + v + ' cm par an. De combien de mètres avance-t-elle en ' + a + ' ans ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Calcule ' + v + ' × ' + a + ', puis divise par 100 pour passer des centimètres aux mètres.',
            aideParlee: 'Multiplie la vitesse par le nombre d’années, puis passe des centimètres aux mètres.',
            correction: [v + ' × ' + a + ' = ' + v * a + ' cm.', v * a + ' ÷ 100 = ' + ecr(m) + ' ' + mettre(m, 'mètre', 'mètres') + '.'],
          };
        },
      },
      {
        id: 'avance-en-kilometres',
        univers: 'dehors',
        // [centimètres par an] ; en un million d'années : 1 000 000 cm = 10 km par cm/an
        versions: [[2], [3], [4], [5], [6]],
        genere(c) {
          const [v] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple, une plaque avance de ' + v + ' cm par an. Combien de kilomètres fait-elle en un million d’années ? (1 km = 100 000 cm)',
            reponse: { type: 'nombre', valeur: v * 10 },
            aide: 'En un million d’années : ' + v + ' × 1 000 000 = ' + esp(v * 1000000) + ' cm. Divise par 100 000.',
            aideParlee: 'Multiplie la vitesse par un million d’années, puis passe des centimètres aux kilomètres.',
            correction: [v + ' × 1 000 000 = ' + esp(v * 1000000) + ' cm.', esp(v * 1000000) + ' ÷ 100 000 = ' + v * 10 + ' km.'],
          };
        },
      },
      {
        id: 'duree-du-trajet',
        univers: 'champetre',
        // [centimètres par an, centimètres à parcourir] ; résultat en années
        versions: [[3, 120], [4, 200], [2, 100], [5, 150], [6, 300]],
        genere(c) {
          const [v, d] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans cet exemple, une plaque avance de ' + v + ' cm par an. Combien d’années lui faut-il pour avancer de ' + d + ' cm ?',
            reponse: { type: 'nombre', valeur: d / v },
            aide: 'Divise la distance par la vitesse : ' + d + ' ÷ ' + v + '.',
            aideParlee: 'Divise la distance à parcourir par la vitesse de la plaque.',
            correction: [d + ' ÷ ' + v + ' = ' + d / v + ' ans.'],
          };
        },
      },
    ],

    defi: {
      // [centimètres par an, années, 0 = elles s'éloignent / 1 = elles se rapprochent]
      versions: [[2, 100, 0], [3, 50, 1], [4, 200, 0], [5, 100, 1]],
      genere(c) {
        const [v, a, s] = c.alea.choisir(this.versions);
        const cm = v * a, m = Math.round(cm) / 100;
        const mouv = s === 0 ? 'Deux plaques s’éloignent l’une de l’autre' : 'Deux plaques se rapprochent l’une de l’autre';
        return {
          enonce: 'Rachel et Aminata observent une carte des plaques. ' + mouv + ' : l’écart entre elles change de ' + v + ' cm chaque année. On suppose cette vitesse constante pendant ' + a + ' ans.',
          image: { dessin: 'barres', barres: [{ nom: 'Dix ans', parts: 1 }, { nom: a + ' ans', parts: a / 10 }], description: 'Deux barres pour comparer la durée, chaque part valant dix ans : dix ans, et ' + a + ' ans. L’écart entre les plaques change de ' + v + ' cm par an.' },
          questions: [
            {
              texte: 'Question 1. De combien de centimètres l’écart a-t-il changé en ' + a + ' ans ?',
              reponse: { type: 'nombre', valeur: cm },
              aide: 'Multiplie la vitesse par le nombre d’années.',
              correction: [v + ' × ' + a + ' = ' + cm + ' cm.'],
            },
            {
              texte: 'Question 2. Convertis ce résultat en mètres.',
              reponse: { type: 'nombre', valeur: m },
              aide: 'Divise par 100.',
              correction: [cm + ' ÷ 100 = ' + ecr(m) + ' ' + mettre(m, 'mètre', 'mètres') + '.'],
            },
            {
              texte: 'Question 3. Comment appelle-t-on le mouvement décrit dans la mise en situation ?',
              reponse: O.choix(c.alea, s === 0 ? DIV : CONV, [DIV, CONV, IMMO]),
              aide: 'Pense à ce que font les deux plaques : elles s’éloignent ou se rapprochent.',
              correction: [s === 0 ? 'Les plaques s’éloignent : c’est une divergence.' : 'Les plaques se rapprochent : c’est une convergence.', 'Réponse : ' + (s === 0 ? DIV : CONV) + '.'],
            },
            {
              texte: 'Question 4. Nous ne sentons pas bouger les plaques. Rédige une phrase pour expliquer pourquoi.',
              correction: ['Les plaques avancent de quelques centimètres par an seulement : le mouvement est beaucoup trop lent pour être senti.'],
              grille: ['As-tu dit que le mouvement est très lent ?', 'As-tu cité une vitesse de quelques centimètres par an ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais lire le puzzle de la Terre, et tu sais que ses pièces avancent de quelques centimètres chaque année.',
    carte: ['quel-mouvement', 'vrai-ou-faux', 'avance-en-metres'],
    papierDuSoir: { exercices: ['avance-en-metres', 'duree-du-trajet'], defi: true },
    automatismes: [
      {
        id: 'sens-rapide',
        versions: [['Deux plaques s’éloignent.', DIV], ['Deux plaques se rapprochent.', CONV]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: d + ' Divergence ou convergence ?', reponse: O.choix(c.alea, b, [DIV, CONV]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Éthiopie, dans la dépression du Danakil, trois plaques s’éloignent et la croûte se déchire.',
    prenoms: ['Rachel', 'Moussa', 'Aminata'],
  };
});
