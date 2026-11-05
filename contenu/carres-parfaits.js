/* Notion 20 du bloc « Les nombres » : carrés parfaits de 1 à 144. La terrasse de Rachel. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { puissance: p } = O;
  const OUI = 'Oui, c’est un carré parfait', NON = 'Non';
  const estCarre = (n) => Number.isInteger(Math.sqrt(n));
  const carresEntre = (a, b) => { const l = []; for (let k = 1; k * k <= b; k++) if (k * k >= a) l.push(k * k); return l; };

  return {
    id: 'carres-parfaits',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Carrés parfaits de 1 à 144',
    classe: 'cycle 4',
    univers: ['maison-courses', 'cuisine-restaurant', 'danses'],

    accroche: {
      texte: 'Rachel refait le coin de sa terrasse avec 36 carreaux, tous pareils. Elle a d’abord posé 4 rangées de 9 carreaux : un long rectangle. ' +
        'Mais elle rêve d’un beau carré, avec autant de rangées que de colonnes, et sans un seul carreau de reste. Est-ce possible ?',
      image: { dessin: 'carrelage', rangees: 4, colonnes: 9, description: 'Un carrelage de 4 rangées de 9 carreaux : un long rectangle.' },
    },

    manipulation: {
      type: 'carrelage',
      carreaux: 36,
      rangees: 4,
      colonnes: 9,
      consigne: 'Voici les 36 carreaux de Rachel, en 4 rangées de 9. Change le nombre de rangées et de colonnes pour former un carré, ' +
        'en utilisant tous les carreaux. Puis touche « Est-ce un carré ? ».',
    },

    decouverte: {
      texte: (c) => '6 rangées de 6 carreaux : 6 × 6 = 36. On l’écrit 6², « six au carré ». 36 est ' + c.mot('carre') + '. ' +
        'Retiens-les jusqu’à 144 : 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144. ' +
        'L’astuce : la différence entre deux carrés qui se suivent augmente de 2 à chaque fois : 3, 5, 7, 9…',
      image: { dessin: 'carrelage', cote: 6, description: 'Un carrelage carré de 6 rangées de 6 carreaux : 36 carreaux.' },
    },

    vocabulaire: {
      termes: {
        carre: { sesMots: 'un nombre qui fait un carré de carreaux', officiel: 'un carré parfait', lesDeux: 'un nombre qui fait un carré de carreaux, un carré parfait' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 36 est un nombre qui fait un carré de carreaux, 6 sur 6. 35 n’en est pas un. ' +
          'Les matheux ont un mot pour ces nombres : je te le dirai la prochaine fois.',
        'Les matheux disent : 36 est un carré parfait. Un nombre qui fait un carré de carreaux, c’est un carré parfait : le carré d’un nombre entier.',
        'Tu connais le mot officiel : un carré parfait est le carré d’un nombre entier, comme 36 = 6². De 1 à 144, il y en a douze.',
      ],
    },

    exercices: [
      {
        id: 'carre-de',
        univers: 'maison-courses',
        versions: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        genere(c) {
          const a = c.alea.choisir(this.versions);
          return {
            enonce: 'Combien de carreaux faut-il pour un carré de ' + a + ' carreaux de côté ? Calcule ' + p(a, 2) + '.',
            reponse: { type: 'nombre', valeur: a * a },
            aide: p(a, 2) + ' = ' + a + ' × ' + a + '.',
            aideParlee: 'Au carré, c’est le nombre fois lui-même.',
            correction: [a + ' × ' + a + ' = ' + a * a + ' carreaux.'],
          };
        },
      },
      {
        id: 'est-carre',
        univers: 'maison-courses',
        versions: [49, 50, 64, 72, 81, 90, 100, 110, 121, 125, 144, 48],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const k = Math.floor(Math.sqrt(n));
          const bonne = estCarre(n) ? OUI : NON;
          return {
            enonce: 'Laure a ' + n + ' carreaux. Peut-elle former un carré avec tous ses carreaux ? Le nombre ' + n + ' est-il un carré parfait ?',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Encadre ' + n + ' entre deux carrés de la liste.',
            aideParlee: 'Récite la liste des carrés parfaits, et regarde si le nombre y est.',
            correction: estCarre(n) ? [n + ' = ' + k + ' × ' + k + '. Réponse : ' + bonne + '.'] : [k + ' × ' + k + ' = ' + k * k + ' et ' + (k + 1) + ' × ' + (k + 1) + ' = ' + (k + 1) ** 2 + '.', n + ' est entre les deux. Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'cote',
        univers: 'danses',
        versions: [16, 25, 36, 49, 64, 81, 100, 121, 144],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const k = Math.sqrt(n);
          return {
            enonce: 'Pour un spectacle, ' + n + ' danseuses se placent en carré : autant de rangées que de danseuses par rangée. Combien de danseuses par rangée ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Quel nombre, multiplié par lui-même, donne ' + n + ' ?',
            aideParlee: 'Cherche le nombre qui, multiplié par lui-même, donne le nombre de danseuses.',
            correction: [k + ' × ' + k + ' = ' + n + ' : ' + k + ' danseuses par rangée.'],
          };
        },
      },
      {
        id: 'carreaux-manquants',
        univers: 'maison-courses',
        versions: [20, 30, 40, 45, 55, 70, 90, 110, 130, 60],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const k = Math.ceil(Math.sqrt(n));
          return {
            enonce: 'Moussa a ' + n + ' carreaux. Combien doit-il en acheter, au moins, pour former un carré ?',
            reponse: { type: 'nombre', valeur: k * k - n },
            aide: 'Cherche le premier carré parfait plus grand que ' + n + '.',
            aideParlee: 'Cherche le premier carré parfait plus grand que le nombre de carreaux, puis fais la différence.',
            correction: ['Le premier carré parfait après ' + n + ' est ' + k * k + ' = ' + k + '².', k * k + ' − ' + n + ' = ' + (k * k - n) + ' carreaux à acheter.'],
          };
        },
      },
      {
        id: 'combien-entre',
        univers: 'cuisine-restaurant',
        versions: [[10, 50], [20, 80], [1, 30], [50, 100], [30, 130], [60, 144], [5, 40], [90, 144]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const l = carresEntre(a, b);
          return {
            enonce: 'Combien y a-t-il de carrés parfaits entre ' + a + ' et ' + b + ' (en comptant ' + a + ' et ' + b + ' s’ils en sont) ?',
            reponse: { type: 'nombre', valeur: l.length },
            aide: 'Récite la liste : 1, 4, 9, 16, 25… et garde ceux entre ' + a + ' et ' + b + '.',
            aideParlee: 'Récite la liste des carrés parfaits et garde ceux qui sont entre les deux nombres.',
            correction: ['Les carrés parfaits entre ' + a + ' et ' + b + ' : ' + l.join(', ') + '.', 'Il y en a ' + l.length + '.'],
          };
        },
      },
    ],

    defi: {
      // [carreaux de Rachel, côté d'un carreau en cm]
      versions: [[100, 20], [64, 25], [81, 20], [144, 25], [49, 30], [121, 20]],
      genere(c) {
        const [n, t] = c.alea.choisir(this.versions);
        const k = Math.sqrt(n);
        return {
          enonce: 'Esther carrelle le sol carré de sa cuisine avec ' + n + ' carreaux carrés de ' + t + ' cm de côté. Elle les pose en carré.',
          image: { dessin: 'carrelage', cote: k, description: 'Un carrelage carré de ' + k + ' carreaux de côté.' },
          questions: [
            {
              texte: 'Question 1. Combien de carreaux y a-t-il sur un côté ?',
              reponse: { type: 'nombre', valeur: k },
              aide: 'Quel nombre, multiplié par lui-même, donne le nombre de carreaux ?',
              correction: [k + ' × ' + k + ' = ' + n + ' : ' + k + ' carreaux par côté.'],
            },
            {
              texte: 'Question 2. Quelle est la longueur d’un côté de la cuisine, en centimètres ?',
              reponse: { type: 'nombre', valeur: k * t },
              aide: 'Multiplie le nombre de carreaux d’un côté par la taille d’un carreau.',
              correction: [k + ' × ' + t + ' = ' + k * t + ' cm.'],
            },
            {
              texte: 'Question 3. Esther dit : « Avec ' + (n + 1) + ' carreaux, j’aurais aussi pu faire un carré. » A-t-elle raison ? Justifie.',
              correction: [k + '² = ' + n + ' et ' + (k + 1) + '² = ' + (k + 1) ** 2 + '.', (n + 1) + ' est entre les deux : ce n’est pas un carré parfait. Esther a tort.'],
              grille: ['As-tu cherché les deux carrés parfaits autour de ' + (n + 1) + ' ?', 'As-tu dit que ' + (n + 1) + ' n’est pas un carré parfait ?', 'As-tu conclu : « Esther a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu connais les carrés parfaits jusqu’à 144, et tu sais quand des carreaux peuvent faire un vrai carré.',
    carte: ['carre-de', 'est-carre', 'cote'],
    papierDuSoir: { exercices: ['carreaux-manquants', 'combien-entre'], defi: true },
    automatismes: [
      {
        id: 'carre-rapide',
        versions: [4, 6, 7, 8, 9, 11, 12, 13],
        genere(c) { const a = c.alea.choisir(this.versions); return { enonce: p(a, 2) + ' = ?', reponse: { type: 'nombre', valeur: a * a } }; },
      },
      {
        id: 'racine-de-carre',
        versions: [25, 49, 64, 81, 121, 144],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: 'Quel nombre au carré donne ' + n + ' ?', reponse: { type: 'nombre', valeur: Math.sqrt(n) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? La grande pyramide de Gizeh, en Égypte, repose sur une base presque parfaitement carrée.',
    prenoms: ['Rachel', 'Laure', 'Moussa', 'Esther'],
  };
});
