/* Notion du bloc de technologie « Concevoir et fabriquer » : simuler et tester. Le ventilateur de poche de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const ESSAIS = ['Un essai sur ordinateur', 'Un essai réel'];
  const r2 = (x) => Math.round(x * 100) / 100;
  /** Un exercice à réponse numérique : f(version) rend { enonce, valeur, aide, correction }. */
  const N = (id, univers, versions, f) => ({
    id, univers, versions,
    genere(c) {
      const r = f(c.alea.choisir(this.versions));
      return { enonce: r.enonce, reponse: { type: 'nombre', valeur: r.valeur }, aide: r.aide, correction: r.correction };
    },
  });
  const heures = (x) => ecr(x) + ' heure' + (x >= 2 ? 's' : '');

  return {
    id: 'simulation-test',
    matiere: 'technologie',
    bloc: 'concevoir-fabriquer',
    titre: 'Simuler et tester',
    classe: '4e',
    univers: ['appareils', 'dehors', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Concevoir et fabriquer » : simulation numérique et essai réel, comparaison d’un résultat mesuré à un résultat attendu, écart.',

    accroche: {
      texte: 'Moussa teste un ventilateur de poche. Sur l’ordinateur, un logiciel lui annonce que la pile durera 4 heures. ' +
        'Dans l’atelier, il laisse tourner le vrai ventilateur et il mesure : seulement 3 heures. Ce n’est pas pareil. Moussa cherche pourquoi.',
      image: { dessin: 'chaine', etapes: ['Sur l’ordinateur : 4 heures annoncées', 'Dans l’atelier : 3 heures mesurées', 'Moussa cherche la cause de la différence'], description: 'Le logiciel annonce 4 heures pour la pile, la mesure dans l’atelier donne 3 heures, et Moussa cherche la cause de la différence.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Un essai sur ordinateur : 4 heures annoncées', 'Un essai réel : 3 heures mesurées', 'La différence : 1 heure', 'On corrige le modèle et on recommence'], description: 'Un essai sur ordinateur annonce 4 heures, un essai réel mesure 3 heures, la différence est de 1 heure, puis on corrige le modèle et on recommence.' },
      etapes: [
        'Moussa lance un logiciel qui essaie le ventilateur sur l’ordinateur.',
        'Le logiciel annonce que la pile dure 4 heures. C’est ce qu’on attend, pas encore une mesure.',
        'Ensuite, Moussa fait un essai réel : il laisse tourner le vrai ventilateur et il mesure.',
        'Il trouve 3 heures. Il compare avec 4 heures et note la différence : 1 heure.',
        'Le logiciel ne connaissait pas la chaleur de l’atelier. Moussa corrige son modèle, puis il recommence.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour le ventilateur, Moussa fait d’abord ' + c.mot('simul') + '. Ensuite, il fait un essai réel avec le vrai objet. ' +
        'Il compare 4 heures et 3 heures : il trouve ' + c.mot('ecart') + '. ' +
        'L’astuce : on essaie sur ordinateur pour gagner du temps, puis on essaie pour de vrai pour vérifier.',
    },

    vocabulaire: {
      termes: {
        simul: { sesMots: 'l’essai sur ordinateur', officiel: 'la simulation', lesDeux: 'l’essai sur ordinateur, que les techniciens appellent la simulation' },
        ecart: { sesMots: 'la différence entre ce qu’on attendait et ce qu’on mesure', officiel: 'l’écart', lesDeux: 'la différence entre ce qu’on attendait et ce qu’on mesure, que les techniciens appellent l’écart' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’essai sur ordinateur, et la différence entre ce qu’on attendait et ce qu’on mesure. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la simulation, pour l’essai sur ordinateur ; l’écart, pour la différence entre l’attendu et le mesuré.',
        'Tu connais les mots officiels : la simulation, et l’écart entre le résultat attendu et le résultat mesuré.',
      ],
    },

    exercices: [
      O.qcm('ordinateur-ou-reel', 'appareils',
        [['Moussa fait tourner un logiciel qui calcule la résistance d’un pont en carton.', 'Un essai sur ordinateur', 'Rien n’est construit : c’est un logiciel qui calcule.'],
          ['Moussa pose des poids sur le vrai pont en carton.', 'Un essai réel', 'Le pont existe vraiment et on le charge.'],
          ['Aminata regarde sur écran comment l’eau coulerait dans le tuyau dessiné.', 'Un essai sur ordinateur', 'Le tuyau n’est qu’un dessin sur écran.'],
          ['Aminata remplit le vrai tuyau et regarde si l’eau coule.', 'Un essai réel', 'Le tuyau existe vraiment et l’eau coule pour de vrai.']],
        (x) => '« ' + x + ' » Est-ce un essai sur ordinateur ou un essai réel ?', ESSAIS,
        'Demande-toi si l’objet existe vraiment ou seulement dans le logiciel.'),
      O.qcm('quel-essai-choisir', 'dehors',
        [['pour essayer cent formes de pont sans rien couper', 'Un essai sur ordinateur', 'Sur ordinateur, on change la forme en un instant, sans matière dépensée.'],
          ['pour savoir si la colle tient vraiment à la chaleur de l’atelier', 'Un essai réel', 'Seul le vrai objet, dans la vraie chaleur, donne la vraie réponse.'],
          ['pour gagner du temps avant de couper le bois', 'Un essai sur ordinateur', 'Le logiciel permet de vérifier l’idée avant de couper.'],
          ['pour vérifier que la pile tient vraiment le temps annoncé', 'Un essai réel', 'Il faut mesurer le vrai objet pour vérifier l’annonce du logiciel.']],
        (x) => 'Quel essai choisir ' + x + ' ?', ESSAIS,
        'Pense à ce qu’on veut : aller vite, ou vérifier pour de vrai.'),
      N('ecart-mesure', 'appareils',
        // [durée attendue, durée mesurée], en heures
        [[4, 3], [6, 4.5], [10, 7], [8, 9], [2.5, 3]],
        ([a, m]) => {
          const e = r2(Math.abs(a - m));
          return {
            enonce: 'Le logiciel annonce que la pile dure ' + heures(a) + '. Moussa mesure ' + heures(m) + ' avec le vrai ventilateur. Quel est l’écart, en heures, entre l’attendu et le mesuré ?',
            valeur: e,
            aide: 'Soustrais le plus petit nombre au plus grand.',
            correction: [ecr(Math.max(a, m)) + ' − ' + ecr(Math.min(a, m)) + ' = ' + ecr(e) + ' ' + (e >= 2 ? 'heures' : 'heure') + '.'],
          };
        }),
      N('reste-a-porter', 'maison-courses',
        // [charge annoncée par le logiciel, charge déjà posée], en kilogrammes
        [[12, 7], [20, 13], [15, 9], [10, 4], [18, 11]],
        ([P, p]) => ({
          enonce: 'Le logiciel annonce que le pont en carton peut porter ' + P + ' kilogrammes. Moussa a déjà posé ' + p + ' kilogrammes dessus. Combien de kilogrammes peut-il encore poser, d’après le logiciel ?',
          valeur: P - p,
          aide: 'Soustrais la charge posée à la charge annoncée.',
          correction: [P + ' − ' + p + ' = ' + (P - p) + ' kilogrammes.'],
        })),
      N('essais-economises', 'commerce',
        // [essais réels sans simulation, euros de matière par essai réel]
        [[3, 4], [5, 3], [4, 6], [6, 2], [3, 5]],
        ([n, e]) => ({
          enonce: 'Sans simulation, Moussa aurait fait ' + n + ' essais réels. Avec la simulation, il n’en fait qu’un seul. Chaque essai réel coûte ' + e + ' euros de matière. Combien d’euros économise-t-il ?',
          valeur: (n - 1) * e,
          aide: 'Cherche d’abord combien d’essais réels il évite, puis multiplie par le prix d’un essai.',
          correction: [n + ' − 1 = ' + (n - 1) + ' essais évités.', (n - 1) + ' × ' + e + ' = ' + (n - 1) * e + ' euros.'],
        })),
    ],

    defi: {
      // [charge annoncée par le logiciel, charge qui fait céder le pont, charge à porter pour le sac], en kilogrammes
      versions: [[12, 9, 10], [10, 11, 10], [15, 12, 11], [8, 10, 9], [14, 10, 12], [9, 12, 13]],
      genere(c) {
        const [P, m, S] = c.alea.choisir(this.versions);
        const optimiste = P > m, porte = m >= S;
        return {
          enonce: 'Aminata construit un petit pont en carton. Le logiciel annonce qu’il tiendra ' + P + ' kilogrammes. Elle charge le vrai pont : il cède à ' + m + ' kilogrammes. Elle voudrait y poser un sac de ' + S + ' kilogrammes.',
          questions: [
            {
              texte: 'Question 1. Quel est l’écart, en kilogrammes, entre la charge annoncée et la charge mesurée ?',
              reponse: { type: 'nombre', valeur: Math.abs(P - m) },
              aide: 'Soustrais le plus petit nombre au plus grand.',
              correction: [Math.max(P, m) + ' − ' + Math.min(P, m) + ' = ' + O.nb(Math.abs(P - m), 'kilogramme') + '.'],
            },
            {
              texte: 'Question 2. Que dire de la simulation ?',
              reponse: O.choix(c.alea, optimiste ? 'Trop optimiste : elle annonçait plus que la mesure' : 'Trop prudente : elle annonçait moins que la mesure', [optimiste ? 'Trop prudente : elle annonçait moins que la mesure' : 'Trop optimiste : elle annonçait plus que la mesure']),
              aide: 'Compare la charge annoncée à la charge mesurée : laquelle est la plus grande ?',
              correction: ['Annoncé : ' + P + ' kilogrammes. Mesuré : ' + m + ' kilogrammes.', (optimiste ? 'Trop optimiste : elle annonçait plus que la mesure' : 'Trop prudente : elle annonçait moins que la mesure') + '.'],
            },
            {
              texte: 'Question 3. D’après la mesure, le pont porte-t-il le sac de ' + S + ' kilogrammes ?',
              reponse: O.choix(c.alea, porte ? 'Oui, le pont porte le sac' : 'Non, le pont ne porte pas le sac', [porte ? 'Non, le pont ne porte pas le sac' : 'Oui, le pont porte le sac']),
              aide: 'Compare la charge mesurée au poids du sac.',
              correction: ['Le pont cède à ' + m + ' kilogrammes, et le sac pèse ' + S + ' kilogrammes.', (porte ? 'Oui, le pont porte le sac' : 'Non, le pont ne porte pas le sac') + '.'],
            },
            {
              texte: 'Question 4. Pourquoi Aminata fait-elle un essai réel, alors que le logiciel a déjà donné une réponse ? Explique.',
              correction: ['Le logiciel donne une prévision, qui peut être fausse.', 'L’essai réel donne la mesure vraie, et on la compare à la prévision pour corriger le modèle.'],
              grille: ['As-tu dit que le logiciel donne une prévision ?', 'As-tu dit que l’essai réel donne une mesure vraie ?', 'As-tu parlé de comparer les deux, ou de corriger le modèle ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais essayer sur ordinateur, vérifier pour de vrai, et comparer ce qu’on attendait avec ce qu’on mesure.',
    carte: ['ordinateur-ou-reel', 'quel-essai-choisir', 'ecart-mesure'],
    papierDuSoir: { exercices: ['ecart-mesure', 'reste-a-porter', 'essais-economises'], defi: true },
    automatismes: [
      {
        id: 'difference-rapide',
        versions: [[12, 7], [20, 13], [15, 9], [10, 4]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' − ' + b + ' = ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, les frères Wright ont testé en 1901 des modèles d’ailes dans une soufflerie.',
    prenoms: ['Moussa', 'Aminata'],
  };
});
