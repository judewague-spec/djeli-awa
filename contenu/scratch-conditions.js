/* Notion du bloc « Données, probabilités, programmation » : les conditions (si … alors … sinon). Les mangues de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const oui = (b) => (b ? 'oui' : 'non');

  return {
    id: 'scratch-conditions',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Les conditions',
    classe: '4e',
    univers: ['commerce', 'maison-courses'],

    accroche: {
      texte: 'Moussa trie des mangues au marché. Si la mangue est mûre, il la pose à gauche. Sinon, il la pose à droite. ' +
        'Un programme fait pareil, avec « si … alors … sinon ».',
      image: { dessin: 'programme', lignes: ['si la mangue est mûre', '  alors poser à gauche', 'sinon', '  poser à droite'], description: 'Un programme en blocs. Si la mangue est mûre, alors poser à gauche. Sinon, poser à droite.' },
    },

    manipulation: {
      type: 'blocs',
      cote: 4,
      cible: [3, 1],
      blocs: ['repeter3 avancer', 'si bord alors monter'],
      maxBlocs: 2,
      consigne: 'Conduis le lutin sur la croix, avec deux blocs seulement. Le bloc « si touche le bord droit, alors » ajoute 1 à y seulement si le lutin touche ce bord. Le bloc « répéter 3 fois » ajoute 1 à x trois fois.',
    },

    decouverte: {
      texte: (c) => 'Regarde le début du programme de Moussa, « si la mangue est mûre ». C’est ' + c.mot('condition') + '. ' +
        'Si la réponse est oui, on fait ce qui suit « alors ». Si la réponse est non, on fait ce qui suit « sinon ». ' +
        'Regarde le bloc en entier, avec « alors » et « sinon ». C’est ' + c.mot('bloc') + '. L’astuce : on ne fait jamais les deux chemins.',
    },

    vocabulaire: {
      termes: {
        condition: { sesMots: 'la question à oui ou non', officiel: 'une condition', lesDeux: 'la question à oui ou non, que l’on appelle une condition' },
        bloc: { sesMots: 'le bloc à deux chemins', officiel: 'une instruction conditionnelle', lesDeux: 'le bloc à deux chemins, que l’on appelle une instruction conditionnelle' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la question à oui ou non, et le bloc à deux chemins. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une condition, pour la question à oui ou non. Le bloc à deux chemins s’appelle une instruction conditionnelle.',
        'Tu connais les mots officiels : la condition et l’instruction conditionnelle.',
      ],
    },

    exercices: [
      {
        id: 'suivre-si-sinon',
        univers: 'commerce',
        // [prix, seuil, réduction]
        versions: [[20, 15, 3], [10, 15, 3], [40, 30, 5], [25, 30, 5], [12, 10, 2], [8, 10, 2]],
        genere(c) {
          const [p, s, r] = c.alea.choisir(this.versions);
          const vrai = p > s;
          return {
            enonce: 'Programme de la caisse de Moussa : si le prix est plus grand que ' + s + ' €, alors le client a ' + r + ' € de réduction, sinon il paie le prix entier. ' +
              'Le prix est ' + p + ' €. Combien le client paie-t-il, en euros ?',
            reponse: { type: 'nombre', valeur: vrai ? p - r : p },
            aide: 'Réponds d’abord à la question à oui ou non : le prix est-il plus grand que le seuil ? Puis suis le bon chemin.',
            correction: [p + ' est ' + (vrai ? 'plus grand' : 'plus petit') + ' que ' + s + ' : la condition est ' + (vrai ? 'vraie' : 'fausse') + '.',
              vrai ? p + ' − ' + r + ' = ' + (p - r) + ' €.' : 'On suit le « sinon » : le client paie ' + p + ' €.'],
          };
        },
      },
      {
        id: 'condition-vraie',
        univers: 'maison-courses',
        // [nombre de bocaux, signe, seuil]
        versions: [[7, '>', 5], [3, '>', 5], [4, '<', 9], [12, '<', 9], [8, '>', 8], [8, '<', 8]],
        genere(c) {
          const [x, op, s] = c.alea.choisir(this.versions);
          const vrai = op === '>' ? x > s : x < s;
          const mot = op === '>' ? 'plus grand' : 'plus petit';
          return {
            enonce: 'Dans le programme de Laure, la condition est « le nombre de bocaux est ' + mot + ' que ' + s + ' ». Laure a ' + x + ' bocaux. La condition est-elle vraie ou fausse ?',
            reponse: O.choix(c.alea, vrai ? 'Vraie' : 'Fausse', ['Vraie', 'Fausse']),
            aide: 'Compare le nombre de bocaux au seuil, avec les mots de la phrase.',
            correction: [x + ' ' + (vrai ? 'est' : 'n’est pas') + ' ' + mot + ' que ' + s + '.', 'Réponse : ' + (vrai ? 'Vraie' : 'Fausse') + '.'],
          };
        },
      },
      {
        id: 'quel-message',
        univers: 'chansons',
        // [score, seuil, message si oui, message si non]
        versions: [[14, 10, 'Bravo', 'Courage'], [6, 10, 'Bravo', 'Courage'], [9, 8, 'Gagné', 'Perdu'], [3, 8, 'Gagné', 'Perdu'], [20, 15, 'Super', 'Encore un essai'], [11, 15, 'Super', 'Encore un essai']],
        genere(c) {
          const [x, s, a, b] = c.alea.choisir(this.versions);
          const vrai = x > s;
          const juste = vrai ? a : b;
          return {
            enonce: 'Aminata programme un quiz de chansons. Si le score est plus grand que ' + s + ', alors le jeu affiche « ' + a + ' », sinon il affiche « ' + b + ' ». Le score est ' + x + '. Que le jeu affiche-t-il ?',
            reponse: O.choix(c.alea, juste, [vrai ? b : a, 'Rien ne s’affiche']),
            aide: 'Réponds à la question à oui ou non. Si c’est oui, lis le « alors ». Sinon, lis le « sinon ».',
            correction: [x + ' est ' + (vrai ? 'plus grand' : 'plus petit') + ' que ' + s + '.', 'On suit le chemin « ' + (vrai ? 'alors' : 'sinon') + ' » : le jeu affiche « ' + juste + ' ».'],
          };
        },
      },
      {
        id: 'deux-tarifs',
        univers: 'danses',
        // [âge]
        versions: [[8], [35], [70], [11], [60], [61]],
        genere(c) {
          const [age] = c.alea.choisir(this.versions);
          const jeune = age < 12, ainee = age > 60;
          const t = jeune ? 6 : ainee ? 8 : 10;
          return {
            enonce: 'Programme du cours de danse : mettre tarif à 10. Si l’âge est plus petit que 12, alors mettre tarif à 6. Si l’âge est plus grand que 60, alors mettre tarif à 8. ' +
              'L’âge est ' + age + ' ans. Quelle est la valeur de tarif à la fin, en euros ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Suis les blocs dans l’ordre. Réponds à chaque question à oui ou non, l’une après l’autre.',
            correction: ['Au départ, tarif vaut 10.', 'Premier « si » : ' + age + ' est plus petit que 12 ? ' + oui(jeune) + '.', 'Second « si » : ' + age + ' est plus grand que 60 ? ' + oui(ainee) + '.', 'À la fin, tarif vaut ' + t + ' €.'],
          };
        },
      },
      {
        id: 'compter-conditions',
        univers: 'maison-courses',
        // [liste des prix]
        versions: [[[12, 5, 18, 10, 30]], [[3, 9, 11, 10, 2]], [[15, 20, 7, 25, 11]], [[4, 6, 8, 10, 12]], [[14, 13, 12, 11, 10]], [[8, 4, 19, 7, 16]]],
        genere(c) {
          const [L] = c.alea.choisir(this.versions);
          const gros = L.filter((x) => x > 10);
          return {
            enonce: 'Laure note le prix de cinq articles : ' + L.join(' ; ') + ' (en euros). Le compteur vaut 0. Pour chaque prix, si le prix est plus grand que 10 €, alors ajouter 1 au compteur. Quelle est la valeur finale du compteur ?',
            reponse: { type: 'nombre', valeur: gros.length },
            aide: 'Passe les prix un par un. Ajoute 1 seulement quand la réponse est oui.',
            correction: ['Les prix plus grands que 10 sont : ' + gros.join(' ; ') + '.', 'Le compteur vaut ' + gros.length + '.'],
          };
        },
      },
    ],

    defi: {
      // [prix du sac, seuil, réduction, sacs du client 1, sacs de la cliente 2]
      versions: [[5, 10, 8, 12, 6], [4, 10, 6, 8, 15], [6, 5, 5, 7, 3], [3, 20, 10, 15, 25]],
      genere(c) {
        const [p, s, r, q1, q2] = c.alea.choisir(this.versions);
        const t = (q) => (q > s ? p * q - r : p * q);
        return {
          enonce: 'Moussa vend des sacs de riz à ' + p + ' € le sac. Son programme de caisse : mettre total à prix × nombre de sacs. Si le nombre de sacs est plus grand que ' + s + ', alors retirer ' + r + ' € de total.',
          questions: [
            {
              texte: 'Question 1. Un client prend ' + q1 + ' sacs. Quelle est la valeur finale de total, en euros ?',
              reponse: { type: 'nombre', valeur: t(q1) },
              aide: 'Calcule d’abord prix × nombre de sacs. Puis réponds à la question à oui ou non.',
              correction: [p + ' × ' + q1 + ' = ' + p * q1 + '.', q1 > s ? q1 + ' est plus grand que ' + s + ' : on retire ' + r + '. ' + p * q1 + ' − ' + r + ' = ' + t(q1) + ' €.' : q1 + ' n’est pas plus grand que ' + s + ' : on ne retire rien. Total : ' + t(q1) + ' €.'],
            },
            {
              texte: 'Question 2. Pour ' + q1 + ' sacs, la condition « le nombre de sacs est plus grand que ' + s + ' » est-elle vraie ?',
              reponse: O.choix(c.alea, q1 > s ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare le nombre de sacs au seuil.',
              correction: [q1 + (q1 > s ? ' est' : ' n’est pas') + ' plus grand que ' + s + '.', 'Réponse : ' + (q1 > s ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 3. Une cliente prend ' + q2 + ' sacs. Quelle est la valeur finale de total, en euros ?',
              reponse: { type: 'nombre', valeur: t(q2) },
              aide: 'Même démarche : calcule, puis réponds à la question à oui ou non.',
              correction: [p + ' × ' + q2 + ' = ' + p * q2 + '.', q2 > s ? q2 + ' est plus grand que ' + s + ' : ' + p * q2 + ' − ' + r + ' = ' + t(q2) + ' €.' : q2 + ' n’est pas plus grand que ' + s + ' : total reste ' + t(q2) + ' €.'],
            },
            {
              texte: 'Question 4. Réécris le programme de Moussa avec « si », « alors » et « sinon ». Explique ce qui se passe quand la condition est fausse.',
              correction: ['mettre total à prix × nombre de sacs. Si le nombre de sacs est plus grand que ' + s + ', alors mettre total à prix × nombre de sacs − ' + r + ', sinon garder total.', 'Quand la condition est fausse, on suit le « sinon » : le client ne reçoit aucune réduction.'],
              grille: ['As-tu écrit « si », « alors » et « sinon » dans le bon ordre ?', 'As-tu écrit la condition avec le nombre de sacs ?', 'As-tu dit ce qui se passe quand la condition est fausse ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une question à oui ou non, deux chemins : tu sais suivre un programme avec des conditions.',
    carte: ['suivre-si-sinon', 'condition-vraie', 'quel-message'],
    papierDuSoir: { exercices: ['suivre-si-sinon', 'deux-tarifs'], defi: true },
    automatismes: [
      {
        id: 'condition-rapide',
        versions: [[7, 5, 3, 2], [4, 5, 3, 2], [12, 10, 1, 4], [9, 10, 1, 4]],
        genere(c) {
          const [x, s, y, a] = c.alea.choisir(this.versions);
          return { enonce: 'y vaut ' + y + '. Si x est plus grand que ' + s + ', alors ajouter ' + a + ' à y. Ici, x = ' + x + '. Que vaut y à la fin ?', reponse: { type: 'nombre', valeur: x > s ? y + a : y } };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? En Irlande, George Boole, professeur à Cork, a transformé la logique en algèbre, base des ordinateurs.',
    prenoms: ['Moussa', 'Aminata', 'Laure'],
  };
});
