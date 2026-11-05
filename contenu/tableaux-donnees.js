/* Notion du bloc « Données, probabilités, programmation » : lire un tableau de données. Les ventes du marché.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const JOURS = ['mardi', 'mercredi', 'jeudi'];
  const autres = (j) => JOURS.filter((x) => x !== j);

  return {
    id: 'tableaux-donnees',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Lire un tableau de données',
    classe: '4e',
    univers: ['commerce', 'champetre'],

    accroche: {
      texte: 'Rachel aide Laure au marché. Elles notent les ventes dans un tableau. Mardi, 12 bananes et 9 mangues. Mercredi, 8 bananes et 14 mangues. ' +
        'Jeudi, 15 bananes et 6 mangues. Un tableau range les nombres : on les trouve vite, sans chercher dans une phrase.',
      image: { dessin: 'tableur', colonnes: ['Jour', 'Mardi', 'Mercredi', 'Jeudi'], lignes: [['Bananes', 12, 8, 15], ['Mangues', 9, 14, 6]], description: 'Un tableau des ventes. Mardi, 12 bananes et 9 mangues. Mercredi, 8 bananes et 14 mangues. Jeudi, 15 bananes et 6 mangues.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Jour', 'Mardi', 'Mercredi', 'Jeudi'], lignes: [['Bananes', 12, 8, 15], ['Mangues', 9, 14, 6]], description: 'Un tableau des ventes. Mardi, 12 bananes et 9 mangues. Mercredi, 8 bananes et 14 mangues. Jeudi, 15 bananes et 6 mangues.' },
      etapes: [
        'Chaque ligne parle d’un fruit. Chaque colonne parle d’un jour.',
        'Pour les mangues du mercredi, cherche la ligne des mangues, puis la colonne du mercredi. Tu trouves 14.',
        'Pour comparer deux jours, regarde deux nombres sur la même ligne. Les bananes : 12 mardi, 15 jeudi.',
        'Pour savoir combien en tout, ajoute les nombres de la ligne : 12 plus 8 plus 15.',
      ],
    },

    decouverte: {
      texte: (c) => 'Cherche une ligne, puis une colonne. Regarde où elles se croisent. C’est ' + c.mot('cellule') + '. ' +
        'Pour comparer, lis deux cases de la même ligne. Pour savoir combien en tout, ajoute les cases de la ligne. Tu obtiens ' + c.mot('total') + '.',
    },

    vocabulaire: {
      termes: {
        cellule: { sesMots: 'la case qui donne le nombre cherché', officiel: 'une cellule', lesDeux: 'la case qui donne le nombre cherché, que l’on appelle une cellule' },
        total: { sesMots: 'le tout de la ligne', officiel: 'le total de la ligne', lesDeux: 'le tout de la ligne, que l’on appelle le total' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la case qui donne le nombre cherché, et le tout de la ligne. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une cellule, pour la case qui donne le nombre cherché. Le tout de la ligne s’appelle le total.',
        'Tu connais les mots officiels : la cellule et le total de la ligne.',
      ],
    },

    exercices: [
      {
        id: 'lire-une-case',
        univers: 'commerce',
        // [mardi, mercredi, jeudi, position du jour demandé]
        versions: [[12, 8, 15, 0], [9, 14, 6, 1], [20, 17, 11, 2], [7, 13, 10, 1], [18, 6, 14, 0], [16, 9, 21, 2]],
        genere(c) {
          const [a, b, d, k] = c.alea.choisir(this.versions);
          const v = [a, b, d][k];
          return {
            enonce: 'Au marché, Laure note ses ventes de mangues. Mardi : ' + a + '. Mercredi : ' + b + '. Jeudi : ' + d + '. Combien de mangues a-t-elle vendues ' + JOURS[k] + ' ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Cherche la colonne du bon jour, puis lis le nombre.',
            correction: ['Colonne ' + JOURS[k] + ' : ' + v + ' mangues.'],
          };
        },
      },
      {
        id: 'jour-le-plus',
        univers: 'commerce',
        // [mardi, mercredi, jeudi, 'plus' ou 'moins']
        versions: [[12, 8, 15, 'plus'], [9, 14, 6, 'plus'], [20, 17, 11, 'moins'], [7, 13, 10, 'moins'], [18, 6, 14, 'plus'], [16, 9, 21, 'moins']],
        genere(c) {
          const [a, b, d, s] = c.alea.choisir(this.versions);
          const l = [a, b, d];
          const cible = s === 'plus' ? Math.max(...l) : Math.min(...l);
          const juste = JOURS[l.indexOf(cible)];
          return {
            enonce: 'Laure note ses ventes de bananes. Mardi : ' + a + '. Mercredi : ' + b + '. Jeudi : ' + d + '. Quel jour a-t-elle vendu le ' + s + ' de bananes ?',
            reponse: O.choix(c.alea, juste, autres(juste)),
            aide: 'Compare les trois nombres.',
            correction: ['On compare ' + a + ', ' + b + ' et ' + d + '.', 'Le ' + (s === 'plus' ? 'plus grand' : 'plus petit') + ' est ' + cible + ' : c’est ' + juste + '.'],
          };
        },
      },
      {
        id: 'ecart-deux-jours',
        univers: 'commerce',
        // [mardi, mercredi, jeudi, premier jour, deuxième jour]
        versions: [[12, 8, 15, 0, 2], [9, 14, 6, 1, 2], [20, 17, 11, 0, 2], [7, 13, 10, 0, 1], [18, 6, 14, 0, 1], [16, 9, 21, 1, 2]],
        genere(c) {
          const [a, b, d, i, j] = c.alea.choisir(this.versions);
          const l = [a, b, d];
          const gr = Math.max(l[i], l[j]), pe = Math.min(l[i], l[j]);
          return {
            enonce: 'Laure note ses ventes d’ananas. Mardi : ' + a + '. Mercredi : ' + b + '. Jeudi : ' + d + '. Quelle est la différence entre les ventes de ' + JOURS[i] + ' et celles de ' + JOURS[j] + ' ?',
            reponse: { type: 'nombre', valeur: gr - pe },
            aide: 'Lis les deux cases, puis enlève le petit nombre au grand.',
            correction: ['Les deux cases : ' + l[i] + ' et ' + l[j] + '.', gr + ' − ' + pe + ' = ' + (gr - pe) + '.'],
          };
        },
      },
      {
        id: 'total-ligne',
        univers: 'champetre',
        // [bananes mardi, mercredi, jeudi, mangues mardi, mercredi, jeudi, ligne demandée : 0 bananes, 1 mangues]
        versions: [[12, 8, 15, 9, 14, 6, 0], [12, 8, 15, 9, 14, 6, 1], [10, 14, 9, 7, 6, 12, 0], [10, 14, 9, 7, 6, 12, 1], [14, 10, 12, 6, 16, 11, 1], [8, 11, 13, 15, 9, 10, 0]],
        genere(c) {
          const v = c.alea.choisir(this.versions);
          const k = v[6], l = k === 0 ? v.slice(0, 3) : v.slice(3, 6), nom = k === 0 ? 'bananes' : 'mangues';
          const t = l[0] + l[1] + l[2];
          return {
            enonce: 'Voici les ventes de Laure. Bananes : mardi ' + v[0] + ', mercredi ' + v[1] + ', jeudi ' + v[2] + '. Mangues : mardi ' + v[3] + ', mercredi ' + v[4] + ', jeudi ' + v[5] + '. Combien de ' + nom + ' a-t-elle vendues en tout ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Ajoute les trois nombres de la bonne ligne.',
            correction: ['Ligne des ' + nom + ' : ' + l[0] + ' + ' + l[1] + ' + ' + l[2] + ' = ' + t + '.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'commerce',
        // [bananes du mardi, mangues du mardi, 'plus' ou 'moins']
        versions: [[12, 9, 'plus'], [8, 14, 'plus'], [15, 6, 'moins'], [7, 10, 'moins'], [11, 13, 'moins'], [17, 9, 'plus']],
        genere(c) {
          const [b, m, s] = c.alea.choisir(this.versions);
          const vrai = s === 'plus' ? b > m : b < m;
          const juste = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Mardi, Laure a vendu ' + b + ' bananes et ' + m + ' mangues. Vrai ou faux : mardi, il y a eu ' + s + ' de bananes vendues que de mangues.',
            reponse: O.choix(c.alea, juste, ['Vrai', 'Faux']),
            aide: 'Compare les deux nombres de mardi.',
            correction: ['On compare ' + b + ' bananes et ' + m + ' mangues.', b + (b > m ? ' est plus grand que ' : ' est plus petit que ') + m + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [bananes mardi, mercredi, jeudi, mangues mardi, mercredi, jeudi]
      versions: [[12, 8, 15, 9, 14, 6], [10, 14, 9, 7, 6, 12], [8, 11, 13, 15, 9, 10], [14, 10, 12, 6, 16, 11]],
      genere(c) {
        const v = c.alea.choisir(this.versions);
        const [b1, b2, b3, m1, m2, m3] = v;
        const tb = b1 + b2 + b3, tm = m1 + m2 + m3;
        const mmax = Math.max(m1, m2, m3), jour = JOURS[[m1, m2, m3].indexOf(mmax)];
        const raison = tb > tm;
        return {
          enonce: 'Laure vend des bananes et des mangues au marché. Elle note ses ventes de trois jours dans un tableau. Bananes : mardi ' + b1 + ', mercredi ' + b2 + ', jeudi ' + b3 + '. Mangues : mardi ' + m1 + ', mercredi ' + m2 + ', jeudi ' + m3 + '.',
          image: { dessin: 'tableur', colonnes: ['Jour', 'Mardi', 'Mercredi', 'Jeudi'], lignes: [['Bananes', b1, b2, b3], ['Mangues', m1, m2, m3]], description: 'Un tableau des ventes. Bananes : mardi ' + b1 + ', mercredi ' + b2 + ', jeudi ' + b3 + '. Mangues : mardi ' + m1 + ', mercredi ' + m2 + ', jeudi ' + m3 + '.' },
          questions: [
            {
              texte: 'Question 1. Combien de bananes Laure a-t-elle vendues en tout ?',
              reponse: { type: 'nombre', valeur: tb },
              aide: 'Ajoute les trois nombres de la ligne des bananes.',
              correction: [b1 + ' + ' + b2 + ' + ' + b3 + ' = ' + tb + ' bananes.'],
            },
            {
              texte: 'Question 2. Quel jour les mangues se sont-elles le mieux vendues ?',
              reponse: O.choix(c.alea, jour, JOURS.filter((x) => x !== jour)),
              aide: 'Compare les trois nombres de la ligne des mangues.',
              correction: ['On compare ' + m1 + ', ' + m2 + ' et ' + m3 + '.', 'Le plus grand est ' + mmax + ' : c’est ' + jour + '.'],
            },
            {
              texte: 'Question 3. Combien de fruits Laure a-t-elle vendus en tout, bananes et mangues ensemble ?',
              reponse: { type: 'nombre', valeur: tb + tm },
              aide: 'Ajoute le total des bananes et le total des mangues.',
              correction: ['Mangues : ' + m1 + ' + ' + m2 + ' + ' + m3 + ' = ' + tm + '.', 'Fruits : ' + tb + ' + ' + tm + ' = ' + (tb + tm) + '.'],
            },
            {
              texte: 'Question 4. Laure pense que les bananes se vendent mieux que les mangues. A-t-elle raison ? Justifie avec les totaux de chaque ligne.',
              correction: ['Total des bananes : ' + tb + '. Total des mangues : ' + tm + '.', raison ? 'Elle a raison : ' + tb + ' est plus grand que ' + tm + '.' : 'Elle a tort : ' + tb + ' est plus petit que ' + tm + '.'],
              grille: ['As-tu calculé le total de chaque ligne ?', 'As-tu comparé les deux totaux ?', 'As-tu répondu à la question de Laure par une phrase ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu lis un tableau comme une vraie commerçante : une ligne, une colonne, et la case est à toi.',
    carte: ['lire-une-case', 'jour-le-plus', 'total-ligne'],
    papierDuSoir: { exercices: ['ecart-deux-jours', 'total-ligne'], defi: true },
    automatismes: [
      {
        id: 'ajouter-ligne',
        versions: [[3, 5, 4], [6, 2, 7], [8, 4, 5], [9, 3, 6]],
        genere(c) { const [a, b, d] = c.alea.choisir(this.versions); return { enonce: 'Une ligne du tableau : ' + a + ', ' + b + ', ' + d + '. Quel est le total ?', reponse: { type: 'nombre', valeur: a + b + d } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En République démocratique du Congo, l’os d’Ishango, vieux de près de 20 000 ans, porte des entailles rangées en groupes.',
    prenoms: ['Rachel', 'Laure'],
  };
});
