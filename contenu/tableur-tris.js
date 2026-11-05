/* Notion 14 du bloc de technologie « Le numérique et l'intelligence artificielle » : le tableur, tris et filtres. La liste des clients de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const TRI = 'Un tri', FILTRE = 'Un filtre';

  return {
    id: 'tableur-tris',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Le tableur : tris et filtres',
    classe: 'cycle 4',
    univers: ['commerce', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : tableur, tris et filtres.',

    accroche: {
      texte: 'Clarisse a noté toutes ses ventes du marché, dans le désordre. Elle se demande quelle est la moins chère, et quels clients lui doivent encore de l’argent. ' +
        'Elle pourrait tout relire, ligne après ligne. Mais son tableur sait ranger, et sait cacher ce qui gêne.',
      image: { dessin: 'tableur', colonnes: ['Produit', 'Prix (€)', 'Payé'], lignes: [['Jus', 3, 'non'], ['Avocats', 5, 'oui'], ['Beignets', 2, 'oui']], description: 'Trois lignes dans le désordre. Jus, trois euros, payé non. Avocats, cinq euros, payé oui. Beignets, deux euros, payé oui.' },
    },

    manipulation: {
      type: 'tableur',
      consigne: 'Voici les ventes de Clarisse. Range les lignes par prix, du plus petit au plus grand. Puis garde seulement les clients qui ont payé, et valide.',
    },

    decouverte: {
      texte: (c) => 'Les noms de A à Z, ou les prix dans l’ordre : c’est ' + c.mot('tri') + '. Rien ne disparaît. ' +
        'Ne montrer que certaines lignes, selon une condition : c’est ' + c.mot('filtre') + '. Les autres existent encore. ' +
        'L’astuce : le premier change l’ordre, le second change ce que tu vois.',
    },

    vocabulaire: {
      termes: {
        tri: { sesMots: 'le rangement', officiel: 'un tri', lesDeux: 'le rangement, que l’on appelle un tri' },
        filtre: { sesMots: 'le cache', officiel: 'un filtre', lesDeux: 'le cache, que l’on appelle un filtre' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le rangement, et le cache. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un tri, pour le rangement. Un filtre, pour le cache. Un tri peut être croissant, ou décroissant.',
        'Tu connais les mots officiels : le tri croissant, le tri décroissant et le filtre.',
      ],
    },

    exercices: [
      Q('tri-ou-filtre', 'commerce',
        [['Clarisse range ses produits du moins cher au plus cher.', TRI], ['Clarisse n’affiche que les clients qui n’ont pas payé.', FILTRE], ['Clarisse classe les noms de A à Z.', TRI], ['Clarisse ne garde à l’écran que les prix de plus de 3 euros.', FILTRE]],
        (x) => x + ' Que fait-elle ?', [TRI, FILTRE],
        'Toutes les lignes restent-elles visibles ?',
        'Un tri garde toutes les lignes, et change leur ordre. Un filtre en cache certaines.'),
      {
        id: 'premiere-ligne',
        univers: 'commerce',
        // des prix
        versions: [[3, 5, 2, 4], [8, 6, 9, 7], [12, 10, 15, 11], [5, 1, 3, 2], [20, 25, 18, 30], [7, 4, 6, 9]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const m = Math.min(...v);
          return {
            enonce: 'Une colonne contient les prix : ' + v.join(', ') + '. On la trie en ordre croissant. Quel prix arrive en première ligne ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Croissant : du plus petit au plus grand.',
            correction: ['Dans l’ordre croissant : ' + v.slice().sort((a, b) => a - b).join(', ') + '.', 'Le premier est ' + m + '.'],
          };
        },
      },
      {
        id: 'derniere-ligne',
        univers: 'famille',
        // des âges
        versions: [[12, 15, 14, 13], [31, 28, 45, 39], [9, 7, 11, 8], [50, 62, 41, 55], [16, 18, 17, 15], [23, 27, 21, 30]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const m = Math.min(...v);
          return {
            enonce: 'Une colonne contient des nombres : ' + v.join(', ') + '. On la trie en ordre décroissant. Quel nombre arrive en dernière ligne ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Décroissant : du plus grand au plus petit. Le dernier est donc le plus petit.',
            correction: ['Dans l’ordre décroissant : ' + v.slice().sort((a, b) => b - a).join(', ') + '.', 'Le dernier est ' + m + '.'],
          };
        },
      },
      {
        id: 'apres-le-filtre',
        univers: 'commerce',
        // [prix, seuil]
        versions: [[[3, 5, 2, 4, 6], 3], [[8, 6, 9, 7, 2], 6], [[10, 12, 15, 11, 9], 11], [[5, 1, 3, 2, 8], 2], [[20, 25, 18, 30, 15], 19], [[7, 4, 6, 9, 3], 5]],
        genere(c) {
          const [v, s] = c.alea.choisir(this.versions);
          const g = v.filter((x) => x > s);
          return {
            enonce: 'Une colonne contient les prix : ' + v.join(', ') + '. On filtre pour ne voir que les prix de plus de ' + s + ' euros. Combien de lignes restent visibles ?',
            reponse: { type: 'nombre', valeur: g.length },
            aide: 'Compte les prix strictement plus grands que ' + s + '.',
            aideParlee: 'Compte les prix strictement plus grands que la limite donnée.',
            correction: ['Les prix gardés : ' + g.join(', ') + '.', 'Cela fait ' + g.length + ' lignes.'],
          };
        },
      },
      Q('ce-qui-reste', 'famille',
        [['Après un filtre, que deviennent les lignes cachées ?', 'Elles existent encore'], ['Les lignes cachées par un filtre sont-elles perdues ? Que deviennent-elles ?', 'Elles existent encore']],
        (x) => x, ['Elles existent encore', 'Elles sont effacées', 'Elles changent de prix'],
        'Un filtre ne supprime rien.',
        'Le filtre cache seulement : quand on l’enlève, toutes les lignes réapparaissent, car rien n’a été effacé.'),
    ],

    defi: {
      // [ventes par jour]
      versions: [[12, 30, 18, 25, 20], [40, 15, 35, 20, 10], [8, 22, 14, 16, 30], [50, 10, 45, 25, 20]],
      genere(c) {
        const v = c.alea.choisir(this.versions);
        const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
        const max = Math.max(...v), plus = v.filter((x) => x > 20);
        return {
          enonce: 'Document : Clarisse note ses ventes de la semaine, en euros, dans un tableur. ' + JOURS.map((j, i) => j + ' : ' + v[i]).join(', ') + '.',
          image: { dessin: 'tableur', colonnes: ['Jour', 'Ventes (€)'], lignes: JOURS.map((j, i) => [j, v[i]]), description: 'Un tableur de cinq lignes : les ventes de chaque jour, du lundi au vendredi.' },
          questions: [
            {
              texte: 'Question 1. Après un tri décroissant sur les ventes, quel montant se trouve en première ligne ?',
              reponse: { type: 'nombre', valeur: max },
              aide: 'En ordre décroissant, le plus grand arrive en premier.',
              correction: ['Le plus grand montant est ' + max + '.'],
            },
            {
              texte: 'Question 2. Combien de lignes restent visibles avec un filtre sur les ventes de plus de 20 euros ?',
              reponse: { type: 'nombre', valeur: plus.length },
              aide: 'Compte les montants strictement plus grands que vingt.',
              correction: ['Les montants gardés : ' + plus.join(', ') + '.', 'Cela fait ' + plus.length + ' lignes.'],
            },
            {
              texte: 'Question 3. Clarisse veut savoir quels jours ont bien marché. Explique ce qu’elle utilise, et pourquoi ses données ne sont pas perdues.',
              correction: ['Un tri décroissant classe les jours, du meilleur au moins bon. Un filtre ne montre que les bons jours.', 'Le tri change seulement l’ordre, et le filtre cache : aucune donnée n’est effacée.'],
              grille: ['As-tu cité le tri ou le filtre ?', 'As-tu dit à quoi il sert ici ?', 'As-tu dit que rien n’est effacé ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Ranger et cacher, sans rien perdre : ton tableur répond à tes questions en un geste.',
    carte: ['tri-ou-filtre', 'premiere-ligne', 'ce-qui-reste'],
    papierDuSoir: { exercices: ['derniere-ligne', 'apres-le-filtre'], defi: true },
    automatismes: [
      {
        id: 'plus-petit',
        versions: [[4, 2, 7], [9, 5, 6], [3, 8, 1], [6, 7, 4]],
        genere(c) { const v = c.alea.choisir(this.versions); return { enonce: 'Le premier, en ordre croissant, parmi ' + v.join(', ') + ' = ?', reponse: { type: 'nombre', valeur: Math.min(...v) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, pour le recensement de 1890, un opérateur des machines de Hollerith triait 80 cartes par minute.',
    prenoms: ['Clarisse'],
  };
});
