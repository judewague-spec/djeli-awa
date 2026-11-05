/* Notion 9 du bloc « Proportionnalité, pourcentages et fonctions » : le coefficient multiplicateur. Les prix de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const r2 = (x) => Math.round(x * 100) / 100;
  const hausse = (p) => r2(1 + p / 100), baisse = (p) => r2(1 - p / 100);

  return {
    id: 'coefficient-multiplicateur',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'Le coefficient multiplicateur',
    classe: '3e',
    univers: ['commerce', 'maison-courses'],

    accroche: {
      texte: 'Moussa vend ses jus 2 euros. Il augmente le prix de 10 pour cent. Il calcule 10 pour cent de 2, puis il l’ajoute, et il recommence pour chaque produit de son étal. Que de calculs ! ' +
        'Aminata sourit : « Avec une seule multiplication, c’est fait. »',
      image: { dessin: 'chaine', etapes: ['Prix de départ : 100 %', 'Hausse : 10 %', 'Prix final : 110 %', 'Cela fait × 1,10'], description: 'Le prix de départ, c’est cent pour cent. On ajoute dix pour cent. Le prix final vaut cent dix pour cent : cela revient à multiplier par 1,10.' },
    },

    manipulation: {
      image: { dessin: 'tableur', colonnes: ['Évolution', 'Multiplier par'], lignes: [['Hausse de 10 %', '1,10'], ['Hausse de 5 %', '1,05'], ['Baisse de 20 %', '0,80'], ['Baisse de 5 %', '0,95']], description: 'Un tableau. Une hausse de 10 pour cent revient à multiplier par 1,10. Une hausse de 5 pour cent, par 1,05. Une baisse de 20 pour cent, par 0,80. Une baisse de 5 pour cent, par 0,95.' },
      etapes: [
        'Le prix de départ, c’est 100 pour cent du prix. Avec une hausse de 10 pour cent, on arrive à 110 pour cent.',
        '110 pour cent, c’est 110 ÷ 100 = 1,10. Pour augmenter de 10 pour cent, on multiplie donc par 1,10.',
        'Pour une baisse de 20 pour cent, on arrive à 80 pour cent : on multiplie par 0,80.',
        'Plus grand que 1 : le prix monte. Plus petit que 1 : le prix baisse.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour une hausse ou une baisse, on multiplie le prix par un seul nombre. C’est ' + c.mot('coefficient') + '. ' +
        'Pour une hausse, on ajoute le pourcentage à 100, puis on divise par 100. Pour une baisse, on l’enlève. ' +
        'L’astuce : une seule multiplication, et le nouveau prix est là.',
    },

    vocabulaire: {
      termes: {
        coefficient: { sesMots: 'le raccourci', officiel: 'le coefficient multiplicateur', lesDeux: 'le raccourci, que les matheux appellent le coefficient multiplicateur' },
      },
      textes: [
        'Pour l’instant, garde ton mot : le raccourci. ' +
          'Les matheux ont un mot à eux : je te le dirai la prochaine fois.',
        'Les matheux disent : le coefficient multiplicateur, pour le raccourci.',
        'Tu connais le mot officiel : le coefficient multiplicateur.',
      ],
    },

    exercices: [
      {
        id: 'coefficient-de-hausse',
        univers: 'commerce',
        versions: [10, 5, 20, 3, 25, 50],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          return {
            enonce: 'Par quel nombre multiplie-t-on un prix pour l’augmenter de ' + p + ' % ?',
            reponse: { type: 'nombre', valeur: hausse(p) },
            aide: 'Calcule 100 + ' + p + ', puis divise par 100.',
            aideParlee: 'Ajoute le pourcentage à cent, puis divise par cent.',
            correction: ['100 + ' + p + ' = ' + (100 + p) + '.', (100 + p) + ' ÷ 100 = ' + ecr(hausse(p)) + '.'],
          };
        },
      },
      {
        id: 'coefficient-de-baisse',
        univers: 'commerce',
        versions: [10, 20, 5, 30, 25, 50],
        genere(c) {
          const p = c.alea.choisir(this.versions);
          return {
            enonce: 'Par quel nombre multiplie-t-on un prix pour le baisser de ' + p + ' % ?',
            reponse: { type: 'nombre', valeur: baisse(p) },
            aide: 'Calcule 100 − ' + p + ', puis divise par 100.',
            aideParlee: 'Enlève le pourcentage à cent, puis divise par cent.',
            correction: ['100 − ' + p + ' = ' + (100 - p) + '.', (100 - p) + ' ÷ 100 = ' + ecr(baisse(p)) + '.'],
          };
        },
      },
      {
        id: 'nouveau-prix-hausse',
        univers: 'maison-courses',
        // [prix, hausse %]
        versions: [[20, 10], [50, 20], [40, 5], [60, 50], [80, 25], [200, 3]],
        genere(c) {
          const [m, p] = c.alea.choisir(this.versions);
          const r = r2(m * hausse(p));
          return {
            enonce: 'Un article coûte ' + m + ' €. Son prix augmente de ' + p + ' %. Quel est son nouveau prix, en euros ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Multiplie ' + m + ' par ' + ecr(hausse(p)) + '.',
            aideParlee: 'Trouve le nombre par lequel multiplier, puis multiplie le prix.',
            correction: [m + ' × ' + ecr(hausse(p)) + ' = ' + ecr(r) + ' €.'],
          };
        },
      },
      {
        id: 'nouveau-prix-baisse',
        univers: 'commerce',
        // [prix, baisse %]
        versions: [[50, 20], [40, 10], [80, 25], [60, 30], [120, 50], [200, 5]],
        genere(c) {
          const [m, p] = c.alea.choisir(this.versions);
          const r = r2(m * baisse(p));
          return {
            enonce: 'Un article coûte ' + m + ' €. Il est soldé à moins ' + p + ' %. Quel est son nouveau prix, en euros ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Multiplie ' + m + ' par ' + ecr(baisse(p)) + '.',
            aideParlee: 'Trouve le nombre par lequel multiplier, puis multiplie le prix.',
            correction: [m + ' × ' + ecr(baisse(p)) + ' = ' + ecr(r) + ' €.'],
          };
        },
      },
      Q('que-veut-dire', 'maison-courses',
        [['Multiplier un prix par 1,20, c’est :', 'L’augmenter de 20 %'], ['Multiplier un prix par 0,80, c’est :', 'Le baisser de 20 %'], ['Multiplier un prix par 1,02, c’est :', 'L’augmenter de 2 %']],
        (x) => x, ['L’augmenter de 20 %', 'Le baisser de 20 %', 'L’augmenter de 2 %'],
        'Plus grand que un, cela monte. Plus petit que un, cela baisse.',
        'On compare à 1. Pour 1,20, on a 20 % de plus. Pour 0,80, 20 % de moins. Pour 1,02, 2 % de plus.'),
    ],

    defi: {
      // [loyer, hausse %, prix d'un meuble, baisse %]
      versions: [[500, 2, 120, 25], [600, 5, 80, 20], [800, 3, 150, 10], [700, 2, 200, 30]],
      genere(c) {
        const [l, h, m, b] = c.alea.choisir(this.versions);
        const nl = r2(l * hausse(h)), nm = r2(m * baisse(b));
        return {
          enonce: 'Le loyer de Clarisse est de ' + l + ' € par mois. Il augmente de ' + h + ' %. Dans le même temps, elle achète un meuble de ' + m + ' €, soldé à moins ' + b + ' %.',
          questions: [
            {
              texte: 'Question 1. Par quel nombre faut-il multiplier le loyer ?',
              reponse: { type: 'nombre', valeur: hausse(h) },
              aide: 'Ajoute le pourcentage à cent, puis divise par cent.',
              correction: ['100 + ' + h + ' = ' + (100 + h) + '.', (100 + h) + ' ÷ 100 = ' + ecr(hausse(h)) + '.'],
            },
            {
              texte: 'Question 2. Quel est le nouveau loyer, en euros ?',
              reponse: { type: 'nombre', valeur: nl },
              aide: 'Multiplie le loyer par ce nombre.',
              correction: [l + ' × ' + ecr(hausse(h)) + ' = ' + ecr(nl) + ' €.'],
            },
            {
              texte: 'Question 3. Quel est le prix soldé du meuble, en euros ?',
              reponse: { type: 'nombre', valeur: nm },
              aide: 'Multiplie le prix du meuble par le nombre qui correspond à la baisse.',
              correction: [m + ' × ' + ecr(baisse(b)) + ' = ' + ecr(nm) + ' €.'],
            },
            {
              texte: 'Question 4. Explique pourquoi multiplier par 0,75 revient à baisser de 25 %.',
              correction: ['0,75, c’est 75 pour 100 : il reste 75 % du prix de départ.', 'On a donc enlevé 100 − 75 = 25 % du prix.'],
              grille: ['As-tu dit qu’il reste 75 % du prix ?', 'As-tu fait le calcul 100 − 75 ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une seule multiplication pour une hausse ou une baisse : voilà un vrai raccourci.',
    carte: ['coefficient-de-hausse', 'coefficient-de-baisse', 'que-veut-dire'],
    papierDuSoir: { exercices: ['nouveau-prix-hausse', 'nouveau-prix-baisse'], defi: true },
    automatismes: [
      {
        id: 'coefficient-rapide',
        versions: [[10, 1.1], [20, 1.2], [50, 1.5], [5, 1.05]],
        genere(c) { const [p, k] = c.alea.choisir(this.versions); return { enonce: 'Hausse de ' + p + ' % : on multiplie par ?', reponse: { type: 'nombre', valeur: k } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Une tablette de Babylone, dans l’Irak actuel, semble chercher en combien de temps un prêt double.',
    prenoms: ['Moussa', 'Aminata', 'Clarisse'],
  };
});
