/* Notion du bloc « Données, probabilités, programmation » : calculer une probabilité. Le panier-surprise de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const fr = (n, d) => { const [a, b] = O.simplifier(n, d); return a + '/' + b; };

  return {
    id: 'calculer-probabilite',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Calculer une probabilité',
    classe: '4e',
    univers: ['commerce', 'cuisine-restaurant'],

    accroche: {
      texte: 'Laure prépare un panier-surprise. Dans le panier, il y a 10 fruits : 4 mangues et 6 oranges. ' +
        'Rachel va piocher un fruit sans regarder. Elle voudrait savoir quelle chance elle a d’attraper une mangue.',
      image: { dessin: 'batons', valeurs: [['Mangues', 4], ['Oranges', 6]], axe: 'Fruits du panier', description: 'Un diagramme en bâtons. Dans le panier, 4 mangues et 6 oranges.' },
    },

    manipulation: {
      etapes: [
        'Il y a 10 fruits. Chaque fruit est emballé dans le même papier. Chacun a autant de chances d’être pioché.',
        'Compte les fruits qui font plaisir à Rachel : les mangues. Il y en a 4.',
        'Compte tous les fruits qu’elle peut piocher. Il y en a 10.',
        'Écris une fraction : 4 sur 10. Elle dit la chance de piocher une mangue.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ici, chaque fruit peut être pioché aussi facilement qu’un autre. C’est ' + c.mot('equi') + '. ' +
        'L’astuce : divise le nombre de cas qui font gagner par le nombre de cas possibles. Pour la mangue, tu obtiens 4 sur 10. ' +
        'Ce résultat donne ' + c.mot('proba') + ' de piocher une mangue. Elle est toujours entre 0 et 1.',
    },

    vocabulaire: {
      termes: {
        equi: { sesMots: 'autant de chances pour chaque résultat', officiel: 'l’équiprobabilité', lesDeux: 'autant de chances pour chaque résultat, que l’on appelle l’équiprobabilité' },
        proba: { sesMots: 'la chance', officiel: 'la probabilité', lesDeux: 'la chance, que l’on appelle la probabilité,' },
      },
      textes: [
        'Pour l’instant, garde tes mots : autant de chances pour chaque résultat, et la chance. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’équiprobabilité, pour autant de chances pour chaque résultat. La chance s’appelle la probabilité.',
        'Tu connais les mots officiels : l’équiprobabilité et la probabilité.',
      ],
    },

    exercices: [
      {
        id: 'panier-fraction',
        univers: 'commerce',
        // [mangues, oranges]
        versions: [[4, 6], [3, 5], [2, 7], [5, 5], [6, 2], [3, 9]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const t = a + b;
          return {
            enonce: 'Un panier contient ' + a + ' mangues et ' + b + ' oranges. Chaque fruit est emballé dans le même papier. Rachel pioche un fruit sans regarder. Quelle est ' + c.mot('proba') + ' de piocher une mangue ? Écris une fraction.',
            reponse: { type: 'fraction', valeur: [a, t] },
            aide: 'Mangues sur nombre total de fruits.',
            correction: ['Cas qui font gagner : ' + a + ' mangues. Cas possibles : ' + a + ' + ' + b + ' = ' + t + ' fruits.', 'Probabilité : ' + a + '/' + t + (O.simplifier(a, t)[1] !== t ? ', soit ' + fr(a, t) + '.' : '.')],
          };
        },
      },
      {
        id: 'tombola-decimal',
        univers: 'commerce',
        // [cases gagnantes, cases en tout]
        versions: [[3, 4], [7, 10], [1, 5], [9, 20], [1, 4], [13, 50]],
        genere(c) {
          const [g, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une roue de tombola a ' + t + ' cases égales. ' + g + ' case' + (g >= 2 ? 's sont gagnantes' : ' est gagnante') + '. Quelle est ' + c.mot('proba') + ' de gagner, en nombre décimal ?',
            reponse: { type: 'nombre', valeur: r2(g / t) },
            aide: 'Divise le nombre de cases gagnantes par le nombre de cases.',
            aideParlee: 'Divise le nombre de cases gagnantes par le nombre de cases.',
            correction: [g + ' ÷ ' + t + ' = ' + ecr(r2(g / t)) + '.', 'Probabilité de gagner : ' + ecr(r2(g / t)) + '.'],
          };
        },
      },
      {
        id: 'jeu-de-cartes',
        univers: 'cuisine-restaurant',
        // [carte cherchée dans un jeu de 32 cartes, nombre de cartes qui conviennent]
        versions: [['un as', 4], ['un cœur', 8], ['une figure (valet, dame ou roi)', 12], ['le roi de cœur', 1], ['une carte rouge', 16], ['un 7 ou un 8', 8]],
        genere(c) {
          const [t, f] = c.alea.choisir(this.versions);
          return {
            enonce: 'On tire une carte dans un jeu de 32 cartes bien mélangé. Quelle est ' + c.mot('proba') + ' de tirer ' + t + ' ? Écris une fraction.',
            reponse: { type: 'fraction', valeur: [f, 32] },
            aide: 'Cartes qui conviennent sur 32 cartes.',
            correction: ['Cas qui font gagner : ' + f + '. Cas possibles : 32.', 'Probabilité : ' + f + '/32' + (O.simplifier(f, 32)[1] !== 32 ? ', soit ' + fr(f, 32) + '.' : '.')],
          };
        },
      },
      O.qcm('plus-de-chances', 'commerce',
        [['Un sac contient 5 billes rouges et 3 billes bleues. On tire une bille.', 'Rouge', '5 billes rouges contre 3 bleues : le rouge a plus de chances.'],
          ['Un sac contient 2 billes rouges et 6 billes bleues. On tire une bille.', 'Bleue', '6 billes bleues contre 2 rouges : le bleu a plus de chances.'],
          ['Un sac contient 4 billes rouges et 4 billes bleues. On tire une bille.', 'Autant de chances pour les deux', '4 billes de chaque couleur : les deux couleurs ont les mêmes chances.'],
          ['Un sac contient 7 billes rouges et 2 billes bleues. On tire une bille.', 'Rouge', '7 billes rouges contre 2 bleues : le rouge a plus de chances.'],
          ['Un sac contient 1 bille rouge et 9 billes bleues. On tire une bille.', 'Bleue', '9 billes bleues contre 1 rouge : le bleu a plus de chances.'],
          ['Un sac contient 6 billes rouges et 6 billes bleues. On tire une bille.', 'Autant de chances pour les deux', '6 billes de chaque couleur : les deux couleurs ont les mêmes chances.']],
        (x) => x + ' De quelle couleur a-t-on le plus de chances de tirer une bille ?', ['Rouge', 'Bleue', 'Autant de chances pour les deux'],
        'Compare le nombre de billes de chaque couleur.'),
      O.qcm('valeur-possible', 'commerce',
        [['0,3', '0,3', '0,3 est compris entre 0 et 1.'], ['3/4', '3/4', '3/4 est compris entre 0 et 1.'], ['1', '1', '1 est le plus grand nombre possible : c’est un événement sûr.'],
          ['0', '0', '0 est le plus petit nombre possible : c’est un événement impossible.'], ['2/5', '2/5', '2/5 est compris entre 0 et 1.'], ['0,85', '0,85', '0,85 est compris entre 0 et 1.']],
        () => 'Lequel de ces nombres peut être une probabilité ?', ['1,5', '−0,2'],
        'Une probabilité est toujours comprise entre 0 et 1.'),
    ],

    defi: {
      // [jetons rouges, bleus, verts]
      versions: [[4, 3, 3], [3, 5, 2], [5, 12, 3], [10, 5, 10]],
      genere(c) {
        const [r, b, v] = c.alea.choisir(this.versions);
        const t = r + b + v, oui = 2 * (r + v) > t;
        return {
          enonce: 'Sur le stand de Laure, un sac contient ' + r + ' jetons rouges, ' + b + ' jetons bleus et ' + v + ' jetons verts, tous identiques au toucher. Rachel tire un jeton sans regarder.',
          questions: [
            {
              texte: 'Question 1. Quelle est la probabilité de tirer un jeton rouge ? Écris une fraction.',
              reponse: { type: 'fraction', valeur: [r, t] },
              aide: 'Jetons rouges sur nombre total de jetons.',
              correction: ['Nombre total de jetons : ' + r + ' + ' + b + ' + ' + v + ' = ' + t + '.', 'Probabilité : ' + r + '/' + t + (O.simplifier(r, t)[1] !== t ? ', soit ' + fr(r, t) + '.' : '.')],
            },
            {
              texte: 'Question 2. Écris cette probabilité sous forme décimale.',
              reponse: { type: 'nombre', valeur: r2(r / t) },
              aide: 'Divise le numérateur par le dénominateur.',
              correction: [r + ' ÷ ' + t + ' = ' + ecr(r2(r / t)) + '.'],
            },
            {
              texte: 'Question 3. Rachel gagne si elle tire un jeton rouge ou vert. Elle dit : « J’ai plus d’une chance sur deux de gagner. » A-t-elle raison ?',
              reponse: O.choix(c.alea, oui ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare le nombre de jetons gagnants à la moitié du nombre total.',
              aideParlee: 'Compare le nombre de jetons gagnants à la moitié du nombre total de jetons.',
              correction: ['Jetons gagnants : ' + r + ' + ' + v + ' = ' + (r + v) + '. Probabilité de gagner : ' + (r + v) + '/' + t + '.', 'La moitié de ' + t + ' est ' + ecr(t / 2) + '. ' + (r + v) + (oui ? ' est plus grand : Oui.' : ' n’est pas plus grand : Non.')],
            },
            {
              texte: 'Question 4. Pourquoi faut-il que les jetons soient tous identiques au toucher pour calculer ainsi la probabilité ? Explique.',
              correction: ['Si certains jetons étaient plus faciles à attraper, tous les jetons n’auraient pas les mêmes chances.', 'Le calcul « cas qui font gagner sur cas possibles » ne marche que quand tous les cas ont les mêmes chances.'],
              grille: ['As-tu dit que chaque jeton doit avoir la même chance d’être tiré ?', 'As-tu écrit que le calcul donne les cas qui font gagner sur les cas possibles ?', 'As-tu dit ce qui change si un jeton est plus facile à attraper ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Cas qui font gagner, sur cas possibles : tu sais calculer une probabilité. Le panier de Laure est à toi !',
    carte: ['panier-fraction', 'tombola-decimal', 'jeu-de-cartes'],
    papierDuSoir: { exercices: ['panier-fraction', 'jeu-de-cartes'], defi: true },
    automatismes: [
      {
        id: 'proba-rapide',
        versions: [[1, 2], [1, 4], [3, 10], [1, 5]],
        genere(c) { const [g, t] = c.alea.choisir(this.versions); return { enonce: 'Une urne a ' + t + ' billes identiques, dont ' + g + ' gagnante' + (g >= 2 ? 's' : '') + '. Probabilité de gagner, en décimal ?', reponse: { type: 'nombre', valeur: r2(g / t) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, en 1654, Pascal et Fermat s’écrivent cinq lettres sur les jeux de hasard, et fondent les probabilités.',
    prenoms: ['Rachel', 'Laure'],
  };
});
