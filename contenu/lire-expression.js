/* Notion 1 du bloc « Le calcul avec des lettres » : lire une expression, la boîte mystère. Les savons de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { expr } = O;
  const SOMME = 'Une somme', PRODUIT = 'Un produit';

  return {
    id: 'lire-expression',
    matiere: 'maths',
    bloc: 'calcul-lettres',
    titre: 'Lire une expression : la boîte mystère',
    classe: '4e',
    univers: ['commerce', 'cuisine-restaurant', 'maison-courses'],

    accroche: {
      texte: 'Au marché, Moussa reçoit des boîtes de savons, toutes pareilles. Il a oublié combien de savons il y a dans une boîte. ' +
        'Il a 3 boîtes, et 2 savons en plus sur la table. Comment écrire son nombre de savons, sans connaître ce qu’il y a dans la boîte ? ' +
        'Aminata a une idée : dessiner une boîte mystère à la place du nombre.',
      image: { dessin: 'boite-mystere', contenu: null, description: 'Une boîte fermée, avec un point d’interrogation : on ne connaît pas encore le nombre qu’elle contient.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['3 boîtes : 3 × boîte', '2 savons en plus : + 2', 'En tout : 3 × boîte + 2'], description: 'Trois boîtes, cela fait 3 fois la boîte ; plus 2 savons ; en tout : 3 fois la boîte plus 2.' },
      etapes: [
        'Une boîte contient un nombre de savons que l’on ne connaît pas. On écrit une lettre à sa place : x.',
        'Trois boîtes, c’est 3 × x. Pour aller plus vite, on enlève le signe × devant une lettre : 3x.',
        'Avec 2 savons de plus : 3x + 2.',
        'Pour lire cette écriture, on cherche le dernier calcul à faire : d’abord 3 × x, puis on ajoute 2. Le dernier calcul est une addition : c’est une somme.',
        'Dans 3(x + 2), on calcule d’abord la parenthèse, puis on multiplie par 3 : c’est un produit.',
      ],
    },

    decouverte: {
      texte: (c) => 'On ne connaît pas un nombre ? On met à sa place ' + c.mot('lettre') + '. Un calcul qui contient cette lettre, c’est ' + c.mot('expression') + '. ' +
        'Devant une lettre, on n’écrit pas le signe fois : 3x veut dire 3 fois x. ' +
        'L’astuce : pour lire un calcul, cherche ce que tu ferais en dernier. Une addition à la fin : c’est une somme. Une multiplication à la fin : c’est un produit.',
    },

    vocabulaire: {
      termes: {
        lettre: { sesMots: 'la boîte mystère', officiel: 'la lettre x', lesDeux: 'la boîte mystère, que les matheux appellent la lettre x' },
        expression: { sesMots: 'le calcul avec la boîte', officiel: 'une expression littérale', lesDeux: 'le calcul avec la boîte, que les matheux appellent une expression littérale' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la boîte mystère, et le calcul avec la boîte. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la lettre x, à la place de la boîte mystère. Et une expression littérale, pour le calcul avec la lettre.',
        'Tu connais les mots officiels : la lettre x, une expression littérale, une somme et un produit.',
      ],
    },

    exercices: [
      {
        id: 'ecrire-expression',
        univers: 'commerce',
        // [boîtes, savons en plus]
        versions: [[3, 2], [4, 1], [5, 3], [2, 6], [6, 4], [7, 5]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = expr(a, b);
          return {
            enonce: 'Moussa a ' + O.nb(a, 'boîte') + ' de x savons chacune, et ' + O.nb(b, 'savon') + ' en plus. Quelle expression donne son nombre de savons ?',
            reponse: O.choix(c.alea, bonne, [expr(b, a), a + b + 'x', a + 'x × ' + b]),
            aide: 'Le nombre de boîtes multiplie x, puis on ajoute les savons en plus.',
            correction: [O.nb(a, 'boîte') + ' de x savons : ' + a + 'x.', (b > 1 ? 'Avec les ' + b + ' savons en plus : ' : 'Avec le savon en plus : ') + bonne + '.'],
          };
        },
      },
      {
        id: 'que-veut-dire',
        univers: 'maison-courses',
        versions: [5, 2, 7, 9, 4],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          const bonne = a + ' × x';
          return {
            enonce: 'Que veut dire ' + a + 'x ?',
            reponse: O.choix(c.alea, bonne, [a + ' + x', 'Le nombre ' + a + ' suivi du chiffre x']),
            aide: 'Devant une lettre, on n’écrit pas le signe fois.',
            correction: [a + 'x veut dire ' + a + ' × x.'],
          };
        },
      },
      {
        id: 'somme-ou-produit',
        univers: 'commerce',
        versions: [['2x + 5', SOMME], ['2(x + 5)', PRODUIT], ['3 + 4x', SOMME], ['(x + 1) × 6', PRODUIT], ['7x + 2', SOMME], ['5(2x − 1)', PRODUIT]],
        genere(c) {
          const [e, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’expression ' + e + ' est-elle une somme ou un produit ?',
            reponse: O.choix(c.alea, bonne, [SOMME, PRODUIT]),
            aide: 'Cherche le dernier calcul à faire.',
            correction: [bonne === SOMME ? 'Le dernier calcul est une addition.' : 'Le dernier calcul est une multiplication.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'nombre-devant-x',
        univers: 'cuisine-restaurant',
        // [nombre devant x, nombre seul]
        versions: [[4, 3], [6, 1], [9, 5], [12, 7], [3, 8]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans l’expression ' + expr(a, b) + ', quel nombre multiplie x ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'C’est le nombre écrit juste devant la lettre.',
            correction: ['Dans ' + expr(a, b) + ', x est multiplié par ' + a + '.'],
          };
        },
      },
      {
        id: 'ecrire-sans-fois',
        univers: 'maison-courses',
        // [a, b]
        versions: [[4, 1], [8, 3], [2, 9], [5, 6], [3, 7]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const bonne = expr(a, b);
          return {
            enonce: 'Écris plus simplement : ' + a + ' × x + ' + b + '.',
            reponse: O.choix(c.alea, bonne, [a + b + 'x', a + 'x' + b, expr(b, a)]),
            aide: 'On enlève seulement le signe fois devant la lettre.',
            correction: [a + ' × x s’écrit ' + a + 'x. Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [cahiers, prix d'un sac en euros]
      versions: [[3, 5], [4, 6], [5, 8], [6, 7]],
      genere(c) {
        const [n, s] = c.alea.choisir(this.versions);
        const bonne = expr(n, s);
        return {
          enonce: 'Pour la rentrée, Rachel achète ' + n + ' cahiers au même prix, x euros chacun, et un sac à ' + s + ' euros.',
          questions: [
            {
              texte: 'Question 1. Quelle expression donne le prix total, en euros ?',
              reponse: O.choix(c.alea, bonne, [expr(s, n), n + s + 'x']),
              aide: 'Le nombre de cahiers multiplie x ; puis on ajoute le sac.',
              correction: [n + ' cahiers : ' + n + 'x euros. Avec le sac : ' + bonne + '.'],
            },
            {
              texte: 'Question 2. Cette expression est-elle une somme ou un produit ?',
              reponse: O.choix(c.alea, SOMME, [SOMME, PRODUIT]),
              aide: 'Cherche le dernier calcul à faire.',
              correction: ['Le dernier calcul est une addition.', 'Réponse : ' + SOMME + '.'],
            },
            {
              texte: 'Question 3. Que représente la lettre x ici ? Et que représente ' + n + 'x ?',
              correction: ['x représente le prix d’un cahier, en euros.', n + 'x représente le prix des ' + n + ' cahiers, en euros.'],
              grille: ['As-tu dit que x est le prix d’un cahier ?', 'As-tu dit que ' + n + 'x est le prix de tous les cahiers ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une lettre à la place d’un nombre, et tu sais lire le calcul : la boîte mystère n’a plus de secret.',
    carte: ['ecrire-expression', 'que-veut-dire', 'somme-ou-produit'],
    papierDuSoir: { exercices: ['ecrire-expression', 'ecrire-sans-fois'], defi: true },
    automatismes: [
      {
        id: 'produit-rapide',
        versions: [[3, 4], [5, 6], [7, 2], [8, 3]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Al-Qalasadi est mort à Béja, en Tunisie. Au quinzième siècle, il utilisait de courts mots arabes, ou leurs initiales, comme symboles de calcul.',
    prenoms: ['Moussa', 'Aminata', 'Rachel'],
  };
});
