/* Notion du bloc « Données, probabilités, programmation » : la moyenne. Les dépenses de la semaine de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const IMG = { dessin: 'tableur', colonnes: ['Jour', 'Lundi', 'Mardi', 'Mercredi'], lignes: [['Dépense (€)', 3, 5, 4]], description: 'Un tableau. Lundi, 3 euros. Mardi, 5 euros. Mercredi, 4 euros.' };
  const SEM = ['La première semaine', 'La deuxième semaine', 'Les deux semaines, pareil'];

  return {
    id: 'moyenne-simple',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'La moyenne',
    classe: '4e',
    univers: ['maison-courses', 'commerce'],

    accroche: {
      texte: 'Rachel note ses dépenses de la semaine. Lundi, 3 euros. Mardi, 5 euros. Mercredi, 4 euros. ' +
        'Elle se demande : si je dépensais pareil chaque jour, combien ce serait ? Elle ajoute tout : 12 euros. Puis elle partage entre 3 jours : 4 euros par jour.',
      image: IMG,
    },

    manipulation: {
      image: IMG,
      etapes: [
        'Rachel a noté 3 euros, 5 euros et 4 euros.',
        'Elle ajoute les trois dépenses : cela fait 12 euros en tout.',
        'Elle partage ces 12 euros entre 3 jours, de façon égale : 4 euros par jour.',
        'Ce montant est le même chaque jour, et la somme reste 12 euros.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ajoute toutes les dépenses. Compte les jours. C’est ' + c.mot('effectif') + '. ' +
        'Partage la somme par ce nombre. Tu trouves ' + c.mot('moyenne') + '. L’astuce : somme divisée par le nombre de jours.',
    },

    vocabulaire: {
      termes: {
        effectif: { sesMots: 'combien de dépenses on a notées', officiel: 'l’effectif total', lesDeux: 'combien de dépenses on a notées, que l’on appelle l’effectif total' },
        moyenne: { sesMots: 'le même montant pour chaque jour', officiel: 'la moyenne', lesDeux: 'le même montant pour chaque jour, que l’on appelle la moyenne' },
      },
      textes: [
        'Pour l’instant, garde tes mots : combien de dépenses on a notées, et le même montant pour chaque jour. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’effectif total, pour combien de dépenses on a notées. Le même montant pour chaque jour s’appelle la moyenne.',
        'Tu connais les mots officiels : l’effectif total et la moyenne.',
      ],
    },

    exercices: [
      {
        id: 'moyenne-des-depenses',
        univers: 'maison-courses',
        // quatre dépenses en euros
        versions: [[3, 5, 4, 8], [10, 6, 2, 14], [2, 5, 7, 9], [4, 4, 9, 7], [7, 8, 9, 12], [2, 3, 4, 6]],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const s = l[0] + l[1] + l[2] + l[3], m = r2(s / 4);
          return {
            enonce: 'Rachel a dépensé ' + l[0] + ' €, ' + l[1] + ' €, ' + l[2] + ' € et ' + l[3] + ' € pendant quatre jours. Quelle est sa dépense moyenne par jour, en euros ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Ajoute les dépenses, puis divise par le nombre de jours.',
            correction: [l.join(' + ') + ' = ' + s + '.', s + ' ÷ 4 = ' + ecr(m) + ' €.'],
          };
        },
      },
      {
        id: 'moyenne-des-ventes',
        univers: 'commerce',
        // cinq jours de ventes de mangues
        versions: [[10, 12, 8, 14, 6], [20, 15, 25, 10, 30], [9, 11, 13, 7, 10], [16, 18, 14, 20, 12], [5, 8, 6, 9, 7], [22, 18, 24, 16, 20]],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const s = l.reduce((x, y) => x + y, 0), m = s / 5;
          return {
            enonce: 'Moussa a vendu ' + l.join(', ') + ' mangues de lundi à vendredi. Combien en a-t-il vendu en moyenne par jour ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Ajoute les cinq nombres, puis divise par le nombre de jours.',
            correction: [l.join(' + ') + ' = ' + s + '.', s + ' ÷ 5 = ' + m + ' mangues.'],
          };
        },
      },
      {
        id: 'somme-depuis-moyenne',
        univers: 'maison-courses',
        // [moyenne, nombre de jours]
        versions: [[4, 5], [6, 3], [5, 6], [8, 4], [3, 7], [7, 5]],
        genere(c) {
          const [m, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rachel dépense en moyenne ' + m + ' € par jour pendant ' + n + ' jours. Quelle somme a-t-elle dépensée en tout, en euros ?',
            reponse: { type: 'nombre', valeur: m * n },
            aide: 'La moyenne, c’est la somme partagée en parts égales : retrouve la somme en multipliant.',
            correction: [m + ' × ' + n + ' = ' + (m * n) + ' €.'],
          };
        },
      },
      {
        id: 'depense-manquante',
        univers: 'maison-courses',
        // [moyenne sur trois jours, première dépense, deuxième dépense]
        versions: [[5, 4, 6], [4, 2, 7], [6, 5, 9], [3, 1, 4], [7, 10, 6], [8, 9, 7]],
        genere(c) {
          const [m, a, b] = c.alea.choisir(this.versions);
          const x = 3 * m - a - b;
          return {
            enonce: 'Sur trois jours, Rachel a dépensé ' + m + ' € en moyenne. Le premier jour, ' + a + ' €. Le deuxième jour, ' + b + ' €. Combien a-t-elle dépensé le troisième jour, en euros ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'Trouve d’abord la somme des trois jours, puis enlève les deux dépenses connues.',
            correction: [m + ' × 3 = ' + (3 * m) + ' € en tout.', (3 * m) + ' − ' + a + ' − ' + b + ' = ' + x + ' €.'],
          };
        },
      },
      {
        id: 'quelle-semaine',
        univers: 'commerce',
        // [trois dépenses de la première semaine, trois dépenses de la deuxième semaine]
        versions: [[2, 4, 6, 5, 6, 7], [3, 5, 4, 6, 2, 4], [8, 7, 9, 6, 5, 7], [3, 3, 6, 5, 5, 5], [9, 6, 3, 5, 5, 5], [6, 8, 10, 3, 9, 6]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const s1 = v[0] + v[1] + v[2], s2 = v[3] + v[4] + v[5];
          const juste = s1 < s2 ? SEM[0] : s2 < s1 ? SEM[1] : SEM[2];
          return {
            enonce: 'Première semaine, Rachel dépense ' + v[0] + ' €, ' + v[1] + ' € et ' + v[2] + ' € en trois jours. Deuxième semaine, ' + v[3] + ' €, ' + v[4] + ' € et ' + v[5] + ' €. Quelle semaine a la plus petite moyenne ?',
            reponse: O.choix(c.alea, juste, SEM),
            aide: 'Calcule la moyenne de chaque semaine, puis compare.',
            correction: ['Première semaine : ' + s1 + ' ÷ 3 = ' + ecr(r2(s1 / 3)) + ' €.', 'Deuxième semaine : ' + s2 + ' ÷ 3 = ' + ecr(r2(s2 / 3)) + ' €.', 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [cinq dépenses, sixième dépense, budget moyen]
      versions: [[4, 6, 5, 3, 7, 8, 6], [8, 2, 6, 4, 10, 3, 5], [3, 9, 6, 5, 7, 6, 6], [2, 3, 4, 6, 10, 2, 4], [5, 7, 4, 6, 8, 9, 6]],
      genere(c) {
        const v = c.alea.choisir(this.versions);
        const l = v.slice(0, 5), x = v[5], bud = v[6];
        const s = l.reduce((a, b) => a + b, 0), m = s / 5;
        const juste = x > m ? 'Plus grande' : x < m ? 'Plus petite' : 'La même';
        const ok = m <= bud;
        return {
          enonce: 'Rachel note ses dépenses au marché pendant cinq jours : ' + l.join(' €, ') + ' €.',
          image: { dessin: 'tableur', colonnes: ['Jour', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'], lignes: [['Dépense (€)'].concat(l)], description: 'Un tableau des dépenses. Lundi, ' + l[0] + ' euros. Mardi, ' + l[1] + '. Mercredi, ' + l[2] + '. Jeudi, ' + l[3] + '. Vendredi, ' + l[4] + '.' },
          questions: [
            {
              texte: 'Question 1. Quelle somme Rachel a-t-elle dépensée en tout, en euros ?',
              reponse: { type: 'nombre', valeur: s },
              aide: 'Ajoute les cinq dépenses.',
              correction: [l.join(' + ') + ' = ' + s + ' €.'],
            },
            {
              texte: 'Question 2. Quelle est sa dépense moyenne par jour, en euros ?',
              reponse: { type: 'nombre', valeur: m },
              aide: 'Divise la somme par le nombre de jours.',
              correction: [s + ' ÷ 5 = ' + ecr(m) + ' €.'],
            },
            {
              texte: 'Question 3. Le samedi, elle dépense ' + x + ' €. La moyenne des six jours est-elle plus grande, plus petite, ou la même que celle des cinq premiers jours ?',
              reponse: O.choix(c.alea, juste, ['Plus grande', 'Plus petite', 'La même']),
              aide: 'Compare la dépense du samedi à la moyenne des cinq premiers jours.',
              correction: ['La moyenne des cinq jours est ' + ecr(m) + ' €.', 'Le samedi, elle dépense ' + x + ' €, ' + (x > m ? 'plus que' : x < m ? 'moins que' : 'autant que') + ' la moyenne.', 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Rachel veut dépenser au plus ' + bud + ' € par jour en moyenne. Respecte-t-elle son budget sur les cinq jours ? Justifie.',
              correction: ['Moyenne : ' + s + ' ÷ 5 = ' + ecr(m) + ' €.', ok ? 'Elle respecte son budget : ' + ecr(m) + ' ne dépasse pas ' + bud + '.' : 'Elle ne respecte pas son budget : ' + ecr(m) + ' est plus grand que ' + bud + '.'],
              grille: ['As-tu calculé la moyenne des cinq jours ?', 'As-tu comparé cette moyenne au budget ?', 'As-tu écrit une phrase de réponse ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais partager une somme de façon égale : la moyenne n’a plus de secret pour toi.',
    carte: ['moyenne-des-depenses', 'somme-depuis-moyenne', 'quelle-semaine'],
    papierDuSoir: { exercices: ['depense-manquante', 'quelle-semaine'], defi: true },
    automatismes: [
      {
        id: 'moyenne-rapide',
        versions: [[2, 4], [6, 8], [3, 9], [10, 20]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Quelle est la moyenne de ' + a + ' et ' + b + ' ?', reponse: { type: 'nombre', valeur: (a + b) / 2 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Belgique, Adolphe Quetelet a imaginé l’homme moyen, autour duquel se groupent les mesures.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
