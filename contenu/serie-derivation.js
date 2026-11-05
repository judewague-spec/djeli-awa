/* Notion 2 du bloc « L'électricité » : série et dérivation. La guirlande de Clarisse et les prises de la maison.
   Manipulation : le circuit à assembler (js/manipulations/circuit.js). Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const S = 'En série', D = 'En dérivation';

  return {
    id: 'serie-derivation',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'Série et dérivation',
    classe: 'cycle 4',
    univers: ['famille', 'appareils', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : circuits en série et en dérivation.',

    accroche: {
      texte: 'Pour la fête, Clarisse installe une vieille guirlande. Une seule ampoule grille, et toute la guirlande s’éteint ! ' +
        'Pourtant, à la maison, quand la lampe du salon grille, le réfrigérateur continue de tourner, et Laure peut encore repasser. Pourquoi cette différence ?',
      image: { dessin: 'circuit', branches: [2], description: 'Deux lampes à la suite sur une seule boucle, comme dans la vieille guirlande. Elles brillent faiblement.' },
    },

    manipulation: {
      type: 'circuit',
      but: 'derivation',
      consigne: 'Assemble un circuit avec deux lampes, chacune sur sa propre boucle. Ferme l’interrupteur, puis dévisse la première lampe : l’autre brille encore. Revisse-la, et valide. Ici, c’est un circuit à pile. Une lampe de la maison est sur le 230 volts : on ne la dévisse jamais soi-même.',
    },

    decouverte: {
      texte: (c) => 'Sur une seule boucle, les lampes sont ' + c.mot('serie') + '. Si l’une s’arrête, tout s’arrête. ' +
        'Avec plusieurs boucles, les lampes sont ' + c.mot('derivation') + '. Si l’une s’arrête, les autres continuent. ' +
        'Dans une maison, les prises sont en dérivation. ' +
        'L’astuce : une seule boucle, c’est la série. Plusieurs boucles, c’est la dérivation.',
    },

    vocabulaire: {
      termes: {
        serie: { sesMots: 'à la suite', officiel: 'en série', lesDeux: 'à la suite, ce que les physiciens appellent en série' },
        derivation: { sesMots: 'chacune de son côté', officiel: 'en dérivation', lesDeux: 'chacune de son côté, ce que les physiciens appellent en dérivation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : à la suite, et chacune de son côté. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : en série, pour une seule boucle ; en dérivation, pour plusieurs boucles. La partie du circuit propre à chaque lampe s’appelle une branche.',
        'Tu connais les mots officiels : en série, en dérivation, et une branche.',
      ],
    },

    exercices: [
      O.qcm('serie-ou-derivation', 'appareils',
        [['Deux lampes sont l’une après l’autre, sur une seule boucle.', S], ['Chaque lampe a sa propre boucle, reliée à la pile.', D], ['Sur un circuit à pile, si on dévisse une lampe, l’autre s’éteint.', S], ['Sur un circuit à pile, si on dévisse une lampe, l’autre reste allumée.', D]],
        (x) => x + ' Comment ces lampes sont-elles branchées ?', [S, D],
        'Une seule boucle : en série. Plusieurs boucles : en dérivation.'),
      O.qcm('que-devient-l-autre', 'famille',
        [['en série', 'Elle s’éteint'], ['en dérivation', 'Elle reste allumée']],
        (x) => 'Deux lampes sont branchées sur une pile, ' + x + '. On dévisse la première. Que devient la seconde ?', ['Elle s’éteint', 'Elle reste allumée'],
        'La seconde lampe a-t-elle encore une boucle sans coupure ?'),
      O.qcm('dans-la-maison', 'maison-courses',
        [['On peut allumer la lampe du salon sans allumer la télévision.', D], ['Le réfrigérateur marche quand la lampe de la cuisine est grillée.', D], ['Dans une vieille guirlande, une ampoule grillée éteint toutes les autres.', S]],
        (x) => x + ' Quel branchement cela montre-t-il ?', [S, D],
        'Les appareils marchent-ils chacun de leur côté ?'),
      {
        id: 'lampes-encore-allumees',
        univers: 'famille',
        // [lampes, lampes grillées], en dérivation
        versions: [[12, 2], [20, 3], [8, 1], [15, 4], [30, 5]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une guirlande moderne a ' + n + ' lampes en dérivation. ' + k + (k > 1 ? ' lampes grillent' : ' lampe grille') + '. Combien de lampes restent allumées ?',
            reponse: { type: 'nombre', valeur: n - k },
            aide: 'Calcule ' + n + ' − ' + k + '.',
            aideParlee: 'En dérivation, les autres continuent. Enlève seulement les lampes grillées.',
            correction: ['En dérivation, les autres lampes continuent de briller.', n + ' − ' + k + ' = ' + (n - k) + ' lampes.'],
          };
        },
      },
      {
        id: 'en-serie-il-en-reste',
        univers: 'appareils',
        // [lampes en série]
        versions: [8, 12, 20, 25, 40],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Une vieille guirlande a ' + n + ' lampes en série. Une seule lampe grille. Combien de lampes restent allumées ?',
            reponse: { type: 'nombre', valeur: 0 },
            aide: 'En série, la boucle est coupée pour toutes les lampes.',
            correction: ['La boucle est coupée : le courant ne passe plus.', 'Il reste 0 lampe allumée.'],
          };
        },
      },
    ],

    defi: {
      // [lampes de la guirlande, lampes grillées]
      versions: [[12, 2], [20, 3], [15, 4], [30, 5]],
      genere(c) {
        const [n, k] = c.alea.choisir(this.versions);
        return {
          enonce: 'Clarisse hésite entre deux guirlandes de ' + n + ' lampes. La guirlande A a ses lampes en série. La guirlande B a ses lampes en dérivation. Pendant la fête, ' + k + ' lampes grillent.',
          image: { dessin: 'circuit', branches: [1, 1], devissee: true, description: 'Deux lampes en dérivation : la première est grillée et éteinte, la seconde reste allumée.' },
          questions: [
            {
              texte: 'Question 1. Combien de lampes restent allumées sur la guirlande A ?',
              reponse: { type: 'nombre', valeur: 0 },
              aide: 'En série, la boucle est coupée pour toutes les lampes.',
              correction: ['En série, tout s’éteint : il reste 0 lampe allumée.'],
            },
            {
              texte: 'Question 2. Combien de lampes restent allumées sur la guirlande B ?',
              reponse: { type: 'nombre', valeur: n - k },
              aide: 'En dérivation, seules les lampes grillées s’éteignent.',
              correction: [n + ' − ' + k + ' = ' + (n - k) + ' lampes.'],
            },
            {
              texte: 'Question 3. Quelle guirlande conseilles-tu à Clarisse ? Justifie avec les mots « série » et « dérivation ».',
              correction: ['La guirlande B, en dérivation.', 'Chaque lampe a sa boucle : si l’une grille, les autres continuent. En série, tout s’éteindrait.'],
              grille: ['As-tu choisi la guirlande en dérivation ?', 'As-tu expliqué ce qui se passe quand une lampe grille ?', 'As-tu employé les deux mots ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une boucle ou plusieurs boucles : tu sais pourquoi ta maison ne s’éteint pas pour une seule ampoule.',
    carte: ['serie-ou-derivation', 'que-devient-l-autre', 'dans-la-maison'],
    papierDuSoir: { exercices: ['lampes-encore-allumees', 'dans-la-maison'], defi: true },
    automatismes: [
      {
        id: 'difference-rapide',
        versions: [[12, 2], [20, 3], [15, 4], [30, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Du Sénégal au Nigeria, de grandes lignes électriques relient les réseaux de plusieurs pays d’Afrique de l’Ouest.',
    prenoms: ['Clarisse', 'Laure'],
  };
});
