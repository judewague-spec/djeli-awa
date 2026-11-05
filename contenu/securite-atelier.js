/* Notion du bloc de technologie « Concevoir et fabriquer » : la sécurité à l’atelier. Rebecca à l'atelier de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const GESTES = ['Mettre des lunettes de protection', 'Attacher les cheveux', 'Allumer l’aspiration des fumées', 'Arrêter la machine'];
  /** Un exercice à réponse numérique : f(version) rend { enonce, valeur, aide, correction }. */
  const N = (id, univers, versions, f) => ({
    id, univers, versions,
    genere(c) {
      const r = f(c.alea.choisir(this.versions));
      return { enonce: r.enonce, reponse: { type: 'nombre', valeur: r.valeur }, aide: r.aide, correction: r.correction };
    },
  });
  const groupes = (n, g) => Math.ceil(n / g);

  return {
    id: 'securite-atelier',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'La sécurité à l’atelier',
    classe: '4e',
    univers: ['appareils', 'famille', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : règles de sécurité lors de l’utilisation de machines et d’outils (protections individuelles, aspiration des fumées, arrêt de la machine, présence d’un professionnel).',

    accroche: {
      texte: 'Rebecca entre dans l’atelier de Moussa. Elle veut découper une plaque avec la machine laser. Moussa lui dit : « Mets tes lunettes et attache tes cheveux. » ' +
        'Il allume l’aspiration des fumées. Puis il reste à côté d’elle : on ne reste jamais seule devant une machine.',
      image: { dessin: 'chaine', etapes: ['Lunettes et cheveux attachés', 'Aspiration des fumées allumée', 'Un professionnel reste à côté'], description: 'À l’atelier de Moussa : Rebecca met ses lunettes et attache ses cheveux, l’aspiration des fumées est allumée, et un professionnel reste à côté d’elle.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Lunettes et cheveux attachés', 'Aspiration des fumées allumée', 'Machine arrêtée avant de toucher la pièce', 'Jamais seule devant la machine'], description: 'Quatre bons gestes à l’atelier : lunettes et cheveux attachés, aspiration des fumées allumée, machine arrêtée avant de toucher la pièce, jamais seule devant la machine.' },
      etapes: [
        'Rebecca met des lunettes. Elle attache ses cheveux : ils pourraient se prendre dans une machine.',
        'Moussa allume l’aspiration. Elle emporte les fumées de la découpe, qu’il ne faut pas respirer.',
        'Pour reprendre une pièce, il arrête d’abord la machine. Une machine à l’arrêt ne coupe plus.',
        'Un professionnel reste toujours à côté. On ne reste jamais seule devant une machine.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde les lunettes de Rebecca : c’est ' + c.mot('epi') + '. ' +
        'Avant de lancer la machine, Moussa rappelle ' + c.mot('consigne') + ' : machine arrêtée avant de toucher la pièce, aspiration allumée. ' +
        'L’astuce : protège-toi, évacue les fumées, arrête la machine, et ne reste jamais seule.',
    },

    vocabulaire: {
      termes: {
        epi: { sesMots: 'ce que l’on porte pour se protéger', officiel: 'l’équipement de protection individuelle', lesDeux: 'ce que l’on porte pour se protéger, que les techniciens appellent l’équipement de protection individuelle' },
        consigne: { sesMots: 'les règles à suivre', officiel: 'les consignes de sécurité', lesDeux: 'les règles à suivre, que les techniciens appellent les consignes de sécurité' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ce que l’on porte pour se protéger, et les règles à suivre. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : l’équipement de protection individuelle, pour ce que l’on porte ; les consignes de sécurité, pour les règles à suivre.',
        'Tu connais les mots officiels : l’équipement de protection individuelle, et les consignes de sécurité de l’atelier.',
      ],
    },

    exercices: [
      O.qcm('bon-geste', 'appareils',
        [['des éclats peuvent sauter vers les yeux', 'Mettre des lunettes de protection', 'Les lunettes protègent les yeux des éclats.'],
          ['des cheveux longs pendent près d’une pièce qui tourne', 'Attacher les cheveux', 'Des cheveux attachés risquent beaucoup moins de se prendre dans la machine.'],
          ['la découpe dégage de la fumée dans la pièce', 'Allumer l’aspiration des fumées', 'L’aspiration emporte la fumée, qu’il ne faut pas respirer.'],
          ['on veut reprendre une pièce coincée dans la machine', 'Arrêter la machine', 'Une machine à l’arrêt ne coupe plus.']],
        (x) => 'Quel est le bon geste quand ' + x + ' ?', GESTES,
        'Cherche le danger, puis le geste qui le supprime.'),
      O.qcm('bon-ou-mauvais', 'famille',
        [['Je reste seule devant la machine pour aller plus vite.', 'Un mauvais geste', 'On ne reste jamais seule devant une machine.'],
          ['J’arrête la machine avant de toucher la pièce.', 'Un bon geste', 'Une machine à l’arrêt ne coupe plus.'],
          ['Je garde mes cheveux détachés près de la machine.', 'Un mauvais geste', 'Des cheveux détachés peuvent se prendre dans la machine.'],
          ['Je mets mes lunettes avant de lancer la découpe.', 'Un bon geste', 'Les lunettes protègent les yeux.'],
          ['Je laisse l’aspiration éteinte, parce que la fumée est légère.', 'Un mauvais geste', 'Même légère, la fumée ne doit pas être respirée.'],
          ['Je demande à un professionnel de rester près de moi.', 'Un bon geste', 'Un professionnel peut agir tout de suite en cas de problème.']],
        (x) => '« ' + x + ' » Est-ce un bon geste ou un mauvais geste ?', ['Un bon geste', 'Un mauvais geste'],
        'Pense à ce qui peut blesser, et à ce qui l’évite.'),
      N('aspiration-allumee', 'appareils',
        // [minutes de découpe, minutes d'aspiration en plus]
        [[25, 5], [40, 10], [15, 5], [30, 10], [45, 15]],
        ([d, s]) => ({
          enonce: 'La découpe laser dure ' + d + ' minutes. Moussa laisse l’aspiration tourner ' + s + ' minutes de plus pour évacuer les dernières fumées. Combien de minutes l’aspiration reste-t-elle allumée en tout ?',
          valeur: d + s,
          aide: 'Additionne la durée de la découpe et les minutes en plus.',
          correction: [d + ' + ' + s + ' = ' + (d + s) + ' minutes.'],
        })),
      N('groupes-machine', 'maison-courses',
        // [élèves au plus par groupe, élèves en tout]
        [[4, 18], [3, 10], [5, 22], [4, 13], [6, 25], [2, 9]],
        ([g, n]) => ({
          enonce: 'Moussa surveille au plus ' + g + ' élèves à la fois devant la machine. Ils sont ' + n + ' élèves à passer. Combien de groupes faut-il au minimum ?',
          valeur: groupes(n, g),
          aide: 'Cherche combien de groupes pleins tu peux faire, puis ajoute un groupe pour les élèves qui restent.',
          correction: ['Dans ' + n + ', il y a ' + Math.floor(n / g) + ' fois ' + g + ', et il reste ' + (n % g) + ' ' + (n % g >= 2 ? 'élèves' : 'élève') + '.', 'Il faut donc ' + groupes(n, g) + ' groupes.'],
        })),
      N('lunettes-manquantes', 'commerce',
        // [élèves, paires de lunettes disponibles, euros la paire]
        [[12, 8, 5], [15, 9, 4], [10, 7, 6], [18, 11, 5], [9, 5, 8]],
        ([n, p, e]) => ({
          enonce: 'Il y a ' + n + ' élèves à l’atelier, et chacun doit porter des lunettes. L’atelier a ' + p + ' paires. Une paire neuve coûte ' + e + ' euros. Combien d’euros faut-il pour acheter les paires qui manquent ?',
          valeur: (n - p) * e,
          aide: 'Cherche d’abord combien de paires manquent, puis multiplie par le prix d’une paire.',
          correction: [n + ' − ' + p + ' = ' + (n - p) + ' paires qui manquent.', (n - p) + ' × ' + e + ' = ' + (n - p) * e + ' euros.'],
        })),
    ],

    defi: {
      // [élèves, élèves au plus par groupe, minutes par groupe, minutes disponibles]
      versions: [[12, 4, 20, 60], [14, 4, 20, 60], [10, 5, 15, 60], [13, 4, 15, 45], [9, 3, 10, 45], [16, 4, 25, 90]],
      genere(c) {
        const [n, g, d, T] = c.alea.choisir(this.versions);
        const k = groupes(n, g), total = k * d, tient = total <= T;
        return {
          enonce: 'Moussa accueille ' + n + ' élèves pour une séance de découpe laser. Au plus ' + g + ' élèves peuvent passer ensemble devant la machine, et chaque groupe passe ' + d + ' minutes. Les groupes passent l’un après l’autre. La séance dure ' + T + ' minutes au plus.',
          questions: [
            {
              texte: 'Question 1. Combien de groupes faut-il au minimum ?',
              reponse: { type: 'nombre', valeur: k },
              aide: 'Cherche combien de groupes pleins tu peux faire, puis ajoute un groupe s’il reste des élèves.',
              correction: ['Dans ' + n + ', il y a ' + Math.floor(n / g) + ' fois ' + g + ', et il reste ' + (n % g) + ' ' + (n % g >= 2 ? 'élèves' : 'élève') + '.', 'Il faut donc ' + k + ' groupes.'],
            },
            {
              texte: 'Question 2. Combien de minutes durent tous les passages ?',
              reponse: { type: 'nombre', valeur: total },
              aide: 'Multiplie le nombre de groupes par la durée d’un groupe.',
              correction: [k + ' × ' + d + ' = ' + total + ' minutes.'],
            },
            {
              texte: 'Question 3. Tous les passages tiennent-ils dans la séance ?',
              reponse: O.choix(c.alea, tient ? 'Oui, tout tient dans la séance' : 'Non, cela dépasse la séance', [tient ? 'Non, cela dépasse la séance' : 'Oui, tout tient dans la séance']),
              aide: 'Compare la durée des passages à la durée de la séance.',
              correction: ['Les passages durent ' + total + ' minutes, et la séance dure ' + T + ' minutes au plus.', (tient ? 'Oui, tout tient dans la séance' : 'Non, cela dépasse la séance') + '.'],
            },
            {
              texte: 'Question 4. Avant de lancer la découpe, un élève veut commencer sans lunettes et sans aspiration. Explique pourquoi Moussa refuse.',
              correction: ['Les lunettes protègent les yeux.', 'L’aspiration emporte les fumées, qu’il ne faut pas respirer.'],
              grille: ['As-tu parlé des lunettes et de la protection des yeux ?', 'As-tu parlé de l’aspiration des fumées ?', 'Tes phrases sont-elles courtes et claires ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Lunettes, cheveux attachés, aspiration, machine arrêtée : tu sais te protéger à l’atelier, et protéger les autres.',
    carte: ['bon-geste', 'bon-ou-mauvais', 'groupes-machine'],
    papierDuSoir: { exercices: ['aspiration-allumee', 'groupes-machine', 'lunettes-manquantes'], defi: true },
    automatismes: [
      {
        id: 'somme-minutes',
        versions: [[25, 5], [40, 10], [15, 5], [30, 15]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' + ' + b + ' = ?', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Lesotho, une loi sur la sécurité et la santé au travail a été adoptée en avril 2024.',
    prenoms: ['Rebecca', 'Moussa'],
  };
});
