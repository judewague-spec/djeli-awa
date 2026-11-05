/* Notion 4 du bloc « L'électricité » : la tension électrique. Le château d'eau et les piles de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r1 = (x) => Math.round(x * 10) / 10;

  return {
    id: 'tension',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'La tension électrique',
    classe: '4e',
    univers: ['appareils', 'maison-courses', 'dehors'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : tension électrique, mesure au voltmètre.',

    accroche: {
      texte: 'Moussa met deux piles à la suite dans sa radio, et le son devient plus fort. Il pense au château d’eau du village : plus l’eau tombe de haut, plus elle pousse fort. ' +
        'Une pile, c’est pareil : elle pousse le courant dans le fil. Sur chaque pile, un nombre est écrit, suivi de la lettre V.',
      image: { dessin: 'chaine', etapes: ['Château d’eau : l’eau pousse dans le tuyau', 'Pile : elle pousse le courant dans le fil', 'Sur la pile : 1,5 V'], description: 'Le château d’eau pousse l’eau dans le tuyau. La pile pousse le courant dans le fil. Sur la pile, on lit 1,5 volt.' },
    },

    manipulation: {
      image: { dessin: 'circuit', branches: [1], volt: true, mesures: ['Le voltmètre, marqué V, est aux deux bornes de la lampe.'], description: 'Un circuit : une pile, un interrupteur, une lampe. Le voltmètre se branche aux deux bornes de la lampe, sans couper la boucle.' },
      etapes: [
        'La poussée de la pile se mesure en volts, de symbole V. Sur une petite pile, on lit 1,5 V.',
        'L’appareil de mesure s’appelle le voltmètre. Il se branche aux deux bornes de ce que l’on mesure, sans couper la boucle.',
        'Deux piles à la suite ajoutent leurs volts : 1,5 V + 1,5 V = 3 V.',
        'En France, une prise de la maison donne 230 V : c’est dangereux, on n’y touche jamais.',
      ],
    },

    decouverte: {
      texte: (c) => 'Une pile pousse le courant dans le fil. On mesure en volts ' + c.mot('tension') + '. L’appareil pour cela, c’est ' + c.mot('appareil') + '. Il se branche en dérivation, aux deux bornes. ' +
        'L’astuce : le compteur de courant va dans la boucle. Celui de la poussée va à côté, sur les deux bornes.',
    },

    vocabulaire: {
      termes: {
        tension: { sesMots: 'la poussée', officiel: 'la tension', lesDeux: 'la poussée, que les physiciens appellent la tension' },
        appareil: { sesMots: 'le mesureur de poussée', officiel: 'le voltmètre', lesDeux: 'le mesureur de poussée, que les physiciens appellent le voltmètre' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la poussée, et le mesureur de poussée. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la tension, notée U, qui se mesure en volts, avec un voltmètre branché en dérivation.',
        'Tu connais les mots officiels : la tension U, le volt, et le voltmètre branché en dérivation.',
      ],
    },

    exercices: [
      {
        id: 'piles-a-la-suite',
        univers: 'appareils',
        // [tension d'une pile, nombre de piles]
        versions: [[1.5, 2], [1.5, 3], [1.5, 4], [4.5, 2], [1.5, 6], [9, 2]],
        genere(c) {
          const [u, n] = c.alea.choisir(this.versions);
          const t = r1(u * n);
          return {
            enonce: 'Moussa met ' + n + ' piles de ' + ecr(u) + ' V à la suite. Quelle tension obtient-il, en volts ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Calcule ' + n + ' × ' + ecr(u) + '.',
            aideParlee: 'Des piles à la suite ajoutent leurs tensions. Multiplie.',
            correction: [n + ' × ' + ecr(u) + ' = ' + ecr(t) + ' V.'],
          };
        },
      },
      O.qcm('comment-brancher', 'appareils',
        [['un voltmètre', 'En dérivation, aux deux bornes'], ['l’appareil qui mesure la tension', 'En dérivation, aux deux bornes']],
        (x) => 'Comment branche-t-on ' + x + ' ?', ['En dérivation, aux deux bornes', 'En série, dans la boucle', 'Il n’a pas besoin de fils'],
        'Il se branche à côté, sans couper la boucle.'),
      O.qcm('quel-appareil', 'maison-courses',
        [['la tension d’une pile', 'Un voltmètre'], ['l’intensité dans une lampe', 'Un ampèremètre'], ['la tension aux bornes d’une lampe', 'Un voltmètre'], ['le courant dans un fil', 'Un ampèremètre']],
        (x) => 'Quel appareil faut-il pour mesurer ' + x + ' ?', ['Un voltmètre', 'Un ampèremètre'],
        'Volts : voltmètre. Ampères : ampèremètre.'),
      {
        id: 'combien-de-piles',
        univers: 'dehors',
        // [tension voulue, tension d'une pile]
        versions: [[6, 1.5], [9, 1.5], [3, 1.5], [12, 1.5], [9, 4.5], [12, 3]],
        genere(c) {
          const [t, u] = c.alea.choisir(this.versions);
          return {
            enonce: 'La radio de Rachel demande ' + t + ' V. Combien de piles de ' + ecr(u) + ' V faut-il mettre à la suite ?',
            reponse: { type: 'nombre', valeur: t / u },
            aide: 'Calcule ' + t + ' ÷ ' + ecr(u) + '.',
            aideParlee: 'Divise la tension voulue par la tension d’une pile.',
            correction: [t + ' ÷ ' + ecr(u) + ' = ' + t / u + ' piles.'],
          };
        },
      },
      O.qcm('danger', 'maison-courses',
        [['une prise de la maison', 'Elle est dangereuse : on n’y touche jamais'], ['une pile de 1,5 V', 'Elle ne présente pas de danger pour une expérience'], ['un fil dénudé sur une prise', 'Elle est dangereuse : on n’y touche jamais']],
        (x) => 'Que peut-on dire de la tension d’' + x + ' ?', ['Elle est dangereuse : on n’y touche jamais', 'Elle ne présente pas de danger pour une expérience'],
        'Les expériences se font avec des piles, jamais avec une prise.'),
    ],

    defi: {
      // [tension voulue, tension d'une pile, tension mesurée aux bornes de la lampe]
      versions: [[6, 1.5, 5.5], [9, 1.5, 8.5], [12, 3, 11.5], [9, 4.5, 8.5]],
      genere(c) {
        const [t, u, m] = c.alea.choisir(this.versions);
        const n = t / u;
        return {
          enonce: 'Aminata prépare une lampe pour la fête. La lampe demande ' + t + ' V. Elle a des piles de ' + ecr(u) + ' V. Une fois le circuit fait, elle mesure ' + ecr(m) + ' V aux bornes de la lampe.',
          questions: [
            {
              texte: 'Question 1. Combien de piles faut-il mettre à la suite ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Divise la tension voulue par la tension d’une pile.',
              correction: [t + ' ÷ ' + ecr(u) + ' = ' + n + ' piles.'],
            },
            {
              texte: 'Question 2. Quel est l’écart entre la tension demandée et la tension mesurée, en volts ?',
              reponse: { type: 'nombre', valeur: r1(t - m) },
              aide: 'Fais la différence entre les deux tensions.',
              correction: [t + ' − ' + ecr(m) + ' = ' + ecr(r1(t - m)) + ' V.'],
            },
            {
              texte: 'Question 3. Quel appareil a-t-elle utilisé pour la mesure ? Comment l’a-t-elle branché ?',
              correction: ['Un voltmètre.', 'Il est branché en dérivation, aux deux bornes de la lampe.'],
              grille: ['As-tu nommé le voltmètre ?', 'As-tu dit « en dérivation », ou « aux deux bornes » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Volts, voltmètre, aux deux bornes : tu sais mesurer la poussée d’une pile.',
    carte: ['piles-a-la-suite', 'comment-brancher', 'quel-appareil'],
    papierDuSoir: { exercices: ['piles-a-la-suite', 'combien-de-piles'], defi: true },
    automatismes: [
      {
        id: 'un-virgule-cinq',
        versions: [2, 3, 4, 6],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' × 1,5 = ?', reponse: { type: 'nombre', valeur: r1(n * 1.5) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Une grande ligne électrique relie la Côte d’Ivoire, la Guinée, le Liberia et la Sierra Leone. Sa tension est de deux cent vingt-cinq mille volts.',
    prenoms: ['Moussa', 'Rachel', 'Aminata'],
  };
});
