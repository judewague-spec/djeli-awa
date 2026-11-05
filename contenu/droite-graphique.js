/* Notion 15 du bloc « Proportionnalité, pourcentages et fonctions » : tracer et lire une droite. Le graphique de Rachel.
   Chaque droite annonce ses valeurs : dans sa description et dans l'énoncé (consigne du 2 nov. 2026).
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const OUI = 'Oui, le point est sur la droite', NON = 'Non, le point n’est pas sur la droite';
  const droite = (a, b, xMax, yMax) => {
    const pts = [];
    for (let x = 0; x <= xMax; x++) pts.push('pour x égal à ' + x + ', y égal à ' + (a * x + b));
    return { dessin: 'point-graphique', a, b, xMax, yMax: Math.max(yMax, b), description: 'Une droite : ' + pts.join(' ; ') + '.' };
  };

  return {
    id: 'droite-graphique',
    matiere: 'maths',
    bloc: 'proportionnalite',
    titre: 'Tracer et lire une droite',
    classe: '3e',
    univers: ['commerce', 'maison-courses'],

    accroche: {
      texte: 'Rachel a écrit le prix de son abonnement de bus : 2 euros la carte, puis 1 euro par trajet. Elle veut voir d’un coup d’œil ce que cela donne. ' +
        'Un dessin suffit-il, avec seulement deux points ? Oui : pour une ligne bien droite, deux points font toute la route.',
      image: droite(1, 2, 5, 8),
    },

    manipulation: {
      type: 'point-graphique',
      a: 2,
      b: 1,
      xMax: 5,
      yMax: 11,
      abscisses: [1, 3],
      consigne: 'Voici la droite de la règle : deux fois x, plus un. Déplace le point pour le mettre sur la droite, à x égal à un, puis à x égal à trois.',
    },

    decouverte: {
      texte: (c) => 'La droite de f de x égale a x plus b part de b, sur l’axe debout. Ce nombre b, c’est ' + c.mot('ordonnee') + '. Quand x augmente de 1, y change de a : c’est ' + c.mot('coefficient') + '. Si a est positif, la droite monte. S’il est négatif, elle descend. ' +
        'L’astuce : pour tracer la droite, calcule deux points, puis relie-les à la règle.',
    },

    vocabulaire: {
      termes: {
        ordonnee: { sesMots: 'son point de départ', officiel: 'l’ordonnée à l’origine', lesDeux: 'son point de départ, que l’on appelle l’ordonnée à l’origine' },
        coefficient: { sesMots: 'son pas', officiel: 'le coefficient directeur', lesDeux: 'son pas, que l’on appelle le coefficient directeur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le point de départ, et le pas. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’ordonnée à l’origine, pour le point de départ. Et le coefficient directeur, pour le pas.',
        'Tu connais les mots officiels : l’ordonnée à l’origine et le coefficient directeur.',
      ],
    },

    exercices: [
      {
        id: 'point-sur-la-droite',
        univers: 'maison-courses',
        // [a, b, x, y]
        versions: [[2, 1, 3, 7], [2, 1, 3, 8], [3, 2, 2, 8], [3, 2, 2, 9], [1, 4, 5, 9], [-2, 10, 3, 4]],
        genere(c) {
          const [a, b, x, y] = c.alea.choisir(this.versions);
          const v = a * x + b;
          const juste = v === y ? OUI : NON;
          return {
            enonce: 'On trace la droite de f(x) = ' + String(a).replace('-', '−') + 'x' + (b ? ' + ' + b : '') + '. Le point de coordonnées (' + x + ' ; ' + y + ') est-il sur cette droite ?',
            reponse: O.choix(c.alea, juste, [OUI, NON]),
            aide: 'Calcule f de l’abscisse du point, et compare à son ordonnée.',
            correction: ['f(' + x + ') = ' + String(a).replace('-', '−') + ' × ' + x + (b ? ' + ' + b : '') + ' = ' + v + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'lire-le-depart',
        univers: 'commerce',
        // [a, b]
        versions: [[2, 3], [1, 5], [3, 1], [2, 6], [4, 2], [1, 7]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une droite passe par les points suivants : pour x = 0, y = ' + b + ' ; pour x = 1, y = ' + (a + b) + ' ; pour x = 2, y = ' + (2 * a + b) + '. Quelle est son ordonnée à l’origine ?',
            image: droite(a, b, 3, 3 * a + b),
            reponse: { type: 'nombre', valeur: b },
            aide: 'C’est la valeur de y quand x vaut zéro.',
            correction: ['Pour x = 0, on lit y = ' + b + '.'],
          };
        },
      },
      {
        id: 'lire-la-montee',
        univers: 'commerce',
        // [a, b]
        versions: [[2, 3], [1, 5], [3, 1], [2, 6], [-2, 10], [-3, 12]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une droite passe par les points (1 ; ' + (a + b) + ') et (2 ; ' + (2 * a + b) + '). Quel est son coefficient directeur ?',
            image: droite(a, b, 3, 3 * a + b),
            reponse: { type: 'nombre', valeur: a },
            aide: 'Quand x augmente de un, de combien y change-t-il ? Cela peut être négatif.',
            correction: [(2 * a + b) + ' − ' + (a + b) + ' = ' + String(a).replace('-', '−') + '.' + (a < 0 ? ' Le coefficient est négatif : la droite descend.' : '')],
          };
        },
      },
      {
        id: 'meme-prix',
        univers: 'maison-courses',
        // [abonnement, prix A, prix B] : A = f + a x, B = b x
        versions: [[10, 1, 3], [20, 2, 4], [12, 2, 5], [15, 1, 4], [30, 2, 5], [8, 1, 3]],
        genere(c) {
          const [f, a, b] = c.alea.choisir(this.versions);
          const x = f / (b - a);
          return {
            enonce: 'Tarif A : ' + f + ' € d’abonnement, plus ' + a + ' € par heure. Tarif B : ' + b + ' € par heure. Pour combien d’heures les deux tarifs coûtent-ils le même prix ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'Divise l’abonnement par l’écart entre les deux prix à l’heure.',
            correction: ['On résout ' + f + ' + ' + a + 'x = ' + b + 'x.', f + ' = ' + (b - a) + 'x, donc x = ' + ecr(x) + ' heures.'],
          };
        },
      },
      Q('que-dit-la-droite', 'commerce',
        [['Une droite qui passe par l’origine représente :', 'Une fonction linéaire'], ['Une droite qui coupe l’axe debout en 5, et non en 0, représente :', 'Une fonction affine, sans être linéaire']],
        (x) => x, ['Une fonction linéaire', 'Une fonction affine, sans être linéaire', 'Aucune fonction'],
        'Où la droite coupe-t-elle l’axe debout ?',
        'Toute droite non verticale représente une fonction affine. Si elle passe par l’origine, cette fonction est linéaire.'),
    ],

    defi: {
      // [abonnement, prix A par trajet, prix B par trajet, trajets]
      versions: [[10, 1, 3, 3], [12, 2, 5, 3], [15, 1, 4, 3], [8, 1, 3, 2]],
      genere(c) {
        const [f, a, b, h] = c.alea.choisir(this.versions);
        const pa = f + a * h, pb = b * h, x = f / (b - a);
        return {
          enonce: 'Pour le bus, Rachel hésite entre deux tarifs. Tarif A : une carte à ' + f + ' €, puis ' + a + ' € par trajet. Tarif B : ' + b + ' € par trajet, sans carte. On note x le nombre de trajets. Le dessin montre la droite du tarif A. Celle du tarif B part de 0, et monte de ' + b + ' à chaque trajet.',
          image: droite(a, f, 8, a * 8 + f),
          questions: [
            {
              texte: 'Question 1. Quel est le prix de ' + h + ' trajets avec le tarif A, en euros ?',
              reponse: { type: 'nombre', valeur: pa },
              aide: 'Multiplie, puis ajoute le prix de la carte.',
              correction: [a + ' × ' + h + ' + ' + f + ' = ' + pa + ' €.'],
            },
            {
              texte: 'Question 2. Quel est le prix de ' + h + ' trajets avec le tarif B, en euros ?',
              reponse: { type: 'nombre', valeur: pb },
              aide: 'Multiplie le prix d’un trajet par le nombre de trajets.',
              correction: [b + ' × ' + h + ' = ' + pb + ' €.'],
            },
            {
              texte: 'Question 3. Pour combien de trajets les deux tarifs sont-ils égaux ?',
              reponse: { type: 'nombre', valeur: x },
              aide: 'Divise le prix de la carte par l’écart entre les deux prix par trajet.',
              correction: ['On résout ' + f + ' + ' + a + 'x = ' + b + 'x.', f + ' = ' + (b - a) + 'x, donc x = ' + ecr(x) + '.'],
            },
            {
              texte: 'Question 4. Explique comment choisir le meilleur tarif selon le nombre de trajets, en utilisant les droites.',
              correction: ['Avant le point d’intersection, la droite du tarif B est la plus basse : le tarif B coûte moins cher.', 'Après ce point, la droite du tarif A est la plus basse : le tarif A coûte moins cher.'],
              grille: ['As-tu parlé du point d’intersection ?', 'As-tu dit quel tarif est le moins cher avant ce point ?', 'As-tu dit quel tarif est le moins cher après ce point ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Un point de départ, une montée, et la droite te dit quel tarif choisir.',
    carte: ['point-sur-la-droite', 'lire-le-depart', 'que-dit-la-droite'],
    papierDuSoir: { exercices: ['lire-la-montee', 'meme-prix'], defi: true },
    automatismes: [
      {
        id: 'point-rapide',
        versions: [[2, 1, 3], [3, 0, 2], [1, 4, 5], [2, 3, 1]],
        genere(c) { const [a, b, x] = c.alea.choisir(this.versions); return { enonce: 'Sur la droite y = ' + a + 'x + ' + b + ', pour x = ' + x + ', y = ?', reponse: { type: 'nombre', valeur: a * x + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Grace Alele-Williams fut, en 1963, la première Nigériane à obtenir un doctorat.',
    prenoms: ['Rachel'],
  };
});
