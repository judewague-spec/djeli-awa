/* Notion du bloc « Données, probabilités, programmation » : médiane et étendue. Les ventes de mangues au marché.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const liste = (v) => v.map(ecr).join(', ');
  const rangee = (v) => v.slice().sort((a, b) => a - b);
  const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const IMP = 'Je prends la valeur qui est pile au milieu';
  const PAIR = 'Je calcule la moitié de la somme des deux valeurs du milieu';
  const ETD = 'Je soustrais la plus petite valeur à la plus grande';

  return {
    id: 'mediane-etendue',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Médiane et étendue',
    classe: '4e',
    univers: ['commerce', 'maison-courses'],

    accroche: {
      texte: 'Rachel aide Laure au marché. Chaque jour, elles notent combien de caisses de mangues elles vendent. ' +
        'Cette semaine, cela donne cinq nombres, dans le désordre. Comment résumer la semaine avec un seul nombre ? Et comment dire si les jours se ressemblent ?',
      image: { dessin: 'batons', valeurs: [['lundi', 4], ['mardi', 9], ['mercredi', 6], ['jeudi', 12], ['vendredi', 7]], axe: 'Caisses vendues', description: 'Un diagramme en bâtons. Lundi, 4 caisses. Mardi, 9. Mercredi, 6. Jeudi, 12. Vendredi, 7.' },
    },

    manipulation: {
      etapes: [
        'Rachel range ses ventes du plus petit au plus grand.',
        'Avec un nombre impair de valeurs, il y en a une pile au milieu.',
        'Avec un nombre pair, il y en a deux au milieu. On prend le nombre qui est entre les deux.',
        'Pour l’écart entre le meilleur jour et le moins bon, on enlève la plus petite valeur à la plus grande.',
      ],
    },

    decouverte: {
      texte: (c) => 'Range d’abord les ventes du plus petit au plus grand. Avec un nombre impair de valeurs, une seule valeur partage la rangée en deux groupes égaux. C’est ' + c.mot('mediane') + '. ' +
        'Avec un nombre pair, il y a deux valeurs au milieu : prends la moitié de leur somme. Enlève la plus petite valeur à la plus grande. Tu trouves ' + c.mot('etendue') + '.',
    },

    vocabulaire: {
      termes: {
        mediane: { sesMots: 'le nombre du milieu', officiel: 'la médiane', lesDeux: 'le nombre du milieu, que l’on appelle la médiane' },
        etendue: { sesMots: 'l’écart total', officiel: 'l’étendue', lesDeux: 'l’écart total, que l’on appelle l’étendue' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le nombre du milieu, et l’écart total. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la médiane, pour le nombre du milieu. L’écart total s’appelle l’étendue.',
        'Tu connais les mots officiels : la médiane et l’étendue.',
      ],
    },

    exercices: [
      {
        id: 'ranger-milieu',
        univers: 'commerce',
        versions: [[4, 9, 6, 12, 7], [15, 8, 22, 10, 12], [30, 18, 25, 21, 27], [3, 11, 5, 8, 14], [40, 35, 50, 45, 38], [6, 2, 9, 4, 8]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const r = rangee(v), m = r[2];
          return {
            enonce: 'Rachel a vendu ces nombres de caisses de mangues en cinq jours : ' + liste(v) + '. Range-les, puis donne ' + c.mot('mediane') + '.',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Range les cinq nombres du plus petit au plus grand. Prends celui du milieu.',
            aideParlee: 'Range les nombres du plus petit au plus grand. Prends celui du milieu.',
            correction: ['Dans l’ordre : ' + liste(r) + '.', 'Il y a 5 valeurs : celle du milieu est la 3e. Elle vaut ' + ecr(m) + '.'],
          };
        },
      },
      {
        id: 'nombre-pair',
        univers: 'commerce',
        versions: [[3, 8, 5, 10, 6, 12], [2, 7, 4, 9, 5, 6], [20, 14, 18, 25, 16, 30], [11, 9, 15, 13, 10, 12], [50, 42, 48, 60, 45, 55], [1, 6, 3, 8, 2, 5]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const r = rangee(v), a = r[2], b = r[3], m = (a + b) / 2;
          return {
            enonce: 'Laure a noté le nombre de clients de son étal pendant six jours : ' + liste(v) + '. Range-les, puis donne ' + c.mot('mediane') + '.',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Range les six nombres. Les deux du milieu sont les 3e et 4e. Prends le nombre qui est entre les deux.',
            aideParlee: 'Range les nombres. Il y a deux valeurs au milieu. Prends le nombre qui est entre les deux.',
            correction: ['Dans l’ordre : ' + liste(r) + '.', 'Il y a 6 valeurs : les deux du milieu sont ' + ecr(a) + ' et ' + ecr(b) + '.', '(' + ecr(a) + ' + ' + ecr(b) + ') ÷ 2 = ' + ecr(m) + '.'],
          };
        },
      },
      {
        id: 'ecart-temperatures',
        univers: 'dehors',
        versions: [[18, 25, 21, 30, 24], [12, 15, 9, 14, 11, 16], [22, 28, 31, 26, 24], [5, 8, 3, 7, 6, 10], [30, 34, 27, 36, 29], [14, 19, 16, 12, 18]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const M = Math.max(...v), m = Math.min(...v);
          return {
            enonce: 'Au marché, on a relevé la température à midi, en degrés : ' + liste(v) + '. Donne ' + c.mot('etendue') + ' de ces températures.',
            reponse: { type: 'nombre', valeur: M - m },
            aide: 'Cherche la plus grande valeur et la plus petite. Soustrais-les.',
            aideParlee: 'Cherche la plus grande valeur et la plus petite. Soustrais-les.',
            correction: ['La plus grande valeur est ' + M + ', la plus petite est ' + m + '.', M + ' − ' + m + ' = ' + (M - m) + ' degrés.'],
          };
        },
      },
      {
        id: 'quelle-methode',
        univers: 'maison-courses',
        versions: [5, 7, 9, 6, 8, 10],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const impair = n % 2 === 1;
          const juste = impair ? IMP : PAIR;
          return {
            enonce: 'Laure a rangé ' + n + ' prix du plus petit au plus grand. Comment trouves-tu ' + c.mot('mediane') + ' ?',
            reponse: O.choix(c.alea, juste, impair ? [PAIR, ETD] : [IMP, ETD]),
            aide: 'Compte les valeurs : le nombre est pair, ou impair ?',
            aideParlee: 'Regarde si le nombre de valeurs est pair, ou impair.',
            correction: impair
              ? [n + ' valeurs, c’est un nombre impair : une seule valeur est pile au milieu.', 'Réponse : ' + juste + '.']
              : [n + ' valeurs, c’est un nombre pair : deux valeurs sont au milieu, aucune n’est pile au milieu.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'prix-le-plus-bas',
        univers: 'commerce',
        // [prix le plus haut, étendue]
        versions: [[5, 2], [4, 1], [5, 1], [4, 2], [3, 1], [5, 3]],
        genere(c) {
          const [H, E] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au marché, le prix le plus haut d’un melon est ' + H + ' €, et ' + c.mot('etendue') + ' des prix est ' + E + ' €. Quel est le prix le plus bas, en euros ?',
            reponse: { type: 'nombre', valeur: H - E },
            aide: 'L’écart total, c’est le plus haut moins le plus bas. Retrouve le plus bas.',
            aideParlee: 'L’écart total, c’est le plus haut moins le plus bas. Retrouve le plus bas.',
            correction: [H + ' − ' + E + ' = ' + (H - E) + ' €.', 'Vérification : ' + H + ' − ' + (H - E) + ' = ' + E + '.'],
          };
        },
      },
    ],

    defi: {
      // [ventes de lundi à dimanche (7 valeurs), seuil]
      versions: [[8, 12, 6, 15, 9, 11, 10, 10], [14, 9, 20, 11, 16, 18, 12, 15], [5, 7, 3, 9, 6, 4, 8, 6], [25, 30, 18, 22, 35, 28, 20, 28]],
      genere(c) {
        const w = c.alea.choisir(this.versions);
        const v = w.slice(0, 7), seuil = w[7];
        const r = rangee(v), nb = v.filter((x) => x >= seuil).length, oui = nb > 3.5;
        return {
          enonce: 'Rachel a noté le nombre de caisses de mangues vendues chaque jour : ' + v.map((x, i) => JOURS[i] + ' ' + x).join(', ') + '.',
          image: { dessin: 'batons', valeurs: v.map((x, i) => [JOURS[i], x]), axe: 'Caisses vendues', description: 'Un diagramme en bâtons. ' + v.map((x, i) => JOURS[i].charAt(0).toUpperCase() + JOURS[i].slice(1) + ', ' + x + ' caisses').join('. ') + '.' },
          questions: [
            {
              texte: 'Question 1. Quelle est l’étendue des ventes de la semaine, en caisses ?',
              reponse: { type: 'nombre', valeur: r[6] - r[0] },
              aide: 'Plus grande valeur, moins plus petite valeur.',
              correction: ['La plus grande valeur est ' + r[6] + ', la plus petite est ' + r[0] + '.', r[6] + ' − ' + r[0] + ' = ' + (r[6] - r[0]) + ' caisses.'],
            },
            {
              texte: 'Question 2. Quelle est la médiane des ventes, en caisses ?',
              reponse: { type: 'nombre', valeur: r[3] },
              aide: 'Range les sept nombres. Prends celui du milieu, le 4e.',
              correction: ['Dans l’ordre : ' + liste(r) + '.', 'Il y a 7 valeurs : la 4e est au milieu. Elle vaut ' + r[3] + '.'],
            },
            {
              texte: 'Question 3. Rachel espère vendre au moins ' + seuil + ' caisses sur plus de la moitié des jours. Est-ce le cas ?',
              reponse: O.choix(c.alea, oui ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compte les jours où elle vend ' + seuil + ' caisses ou plus. Plus de la moitié de 7 jours, c’est 4 jours ou plus.',
              aideParlee: 'Compte les jours où elle atteint son but. Plus de la moitié de sept jours, c’est au moins quatre jours.',
              correction: ['Jours à ' + seuil + ' caisses ou plus : ' + nb + '.', nb + (oui ? ' est au moins 4' : ' est moins que 4') + ' : la réponse est ' + (oui ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Laure dit : « Avec une journée exceptionnelle, la médiane change peu, mais l’étendue change beaucoup. » Es-tu d’accord ? Explique avec un exemple.',
              correction: ['Oui. Si un jour monte très haut, la plus grande valeur change, donc l’étendue change beaucoup.', 'La médiane reste au milieu de la rangée : elle bouge peu.'],
              grille: ['As-tu dit que l’étendue dépend de la plus grande et de la plus petite valeur ?', 'As-tu dit que la médiane, au milieu de la rangée, bouge peu ?', 'As-tu donné un exemple avec des nombres ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais trouver le nombre du milieu et l’écart d’une série. Les ventes du marché n’ont plus de secret pour toi.',
    carte: ['ranger-milieu', 'nombre-pair', 'ecart-temperatures'],
    papierDuSoir: { exercices: ['nombre-pair', 'prix-le-plus-bas'], defi: true },
    automatismes: [
      {
        id: 'mediane-trois',
        versions: [[3, 9, 5], [2, 8, 6], [10, 4, 7], [12, 20, 15]],
        genere(c) { const v = c.alea.choisir(this.versions); return { enonce: 'Médiane de ' + liste(v) + ' ?', reponse: { type: 'nombre', valeur: rangee(v)[1] } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Royaume-Uni, Francis Galton a mesuré des graines de pois de senteur et comparé leurs diamètres médians.',
    prenoms: ['Rachel', 'Laure'],
  };
});
