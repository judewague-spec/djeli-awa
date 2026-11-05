/* Notion 24 du bloc « Mesures, géométrie et espace » : la réciproque de Thalès. Vérifier que deux étagères sont bien parallèles.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const OUI = 'Oui, elles sont parallèles', NON = 'Non, elles ne sont pas parallèles';

  return {
    id: 'thales-reciproque',
    matiere: 'maths',
    bloc: 'mesures-geometrie',
    titre: 'Réciproque de Thalès',
    classe: '3e',
    univers: ['maison-courses', 'commerce'],

    accroche: {
      texte: 'Rachel fixe une tablette chez Laure. Le toit est en pente, et elle la veut bien parallèle à la poutre du bas. Sans outil spécial, comment vérifier ? ' +
        'Elle mesure seulement le long des deux pentes, et compare. Si les deux fractions sont égales, les deux lignes sont parallèles.',
      image: { dessin: 'figure', points: { A: [0, 0], M: [2, 1.5], B: [4, 3], N: [6, 1.5], C: [8, 0] }, segments: [['A', 'B'], ['B', 'C'], ['A', 'C'], ['M', 'N']], description: 'Un triangle B A C, sommet B en haut. M est sur B A, N est sur B C. B M est la moitié de B A, et B N la moitié de B C : la tablette M N est parallèle à la poutre A C.' },
    },

    manipulation: {
      etapes: [
        'Depuis le sommet du toit, mesure jusqu’à la tablette, puis jusqu’à la poutre, sur chaque pente.',
        'Sur la première pente : 2 mètres, puis 5 mètres. Le quotient fait 0,4.',
        'Sur l’autre pente : 1,6 mètre, puis 4 mètres. Le quotient fait 0,4 aussi.',
        'Les deux quotients sont égaux, et les points sont dans le même ordre : la tablette est bien parallèle à la poutre.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ici, on ne sait pas encore si les lignes sont parallèles : on veut le prouver. On calcule séparément les deux fractions. Si elles sont égales, c’est ' + c.mot('reciproque') + ' : les droites sont parallèles. ' +
        'Si elles sont différentes, c’est ' + c.mot('contraposee') + ' : elles ne le sont pas. L’astuce : vérifie aussi l’ordre des points sur chaque droite.',
    },

    vocabulaire: {
      termes: {
        reciproque: { sesMots: 'la preuve des parallèles', officiel: 'la réciproque', lesDeux: 'la preuve des parallèles, que l’on appelle la réciproque du théorème de Thalès' },
        contraposee: { sesMots: 'la preuve du contraire', officiel: 'la contraposée', lesDeux: 'la preuve du contraire, que l’on appelle la contraposée du théorème de Thalès' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la preuve des parallèles, et la preuve du contraire. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la réciproque du théorème de Thalès, pour la preuve des parallèles. Et la preuve du contraire s’appelle la contraposée.',
        'Tu connais les mots officiels : la réciproque, et la contraposée du théorème de Thalès.',
      ],
    },

    exercices: [
      {
        id: 'paralleles-ou-pas',
        univers: 'maison-courses',
        // [AM, AB, AN, AC]
        versions: [[2, 5, 1.6, 4], [3, 6, 4, 8], [2, 8, 3, 12], [3, 7, 4, 8], [4, 10, 6, 14], [5, 8, 10, 16], [6, 9, 8, 13], [1.5, 3, 2, 4]],
        genere(c) {
          const [am, ab, an, ac] = c.alea.choisir(this.versions);
          const eg = am * ac === an * ab;
          const juste = eg ? OUI : NON;
          return {
            enonce: 'M est sur [AB] et N est sur [AC]. On donne AM = ' + ecr(am) + ' cm, AB = ' + ab + ' cm, AN = ' + ecr(an) + ' cm et AC = ' + ac + ' cm. Les droites (MN) et (BC) sont-elles parallèles ?',
            reponse: O.choix(c.alea, juste, [OUI, NON]),
            aide: 'Compare AM sur AB, et AN sur AC. Le produit en croix évite les arrondis.',
            correction: ['AM × AC = ' + ecr(r2(am * ac)) + ' et AN × AB = ' + ecr(r2(an * ab)) + '.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      {
        id: 'premier-quotient',
        univers: 'commerce',
        versions: [[2, 5], [3, 6], [2, 8], [3, 4], [7, 10], [1, 4]],
        genere(c) {
          const [am, ab] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur une pente, AM = ' + am + ' m et AB = ' + ab + ' m. Calcule le quotient AM/AB, en écriture décimale.',
            reponse: { type: 'nombre', valeur: am / ab },
            aide: 'Divise la petite longueur par la grande.',
            correction: [am + ' ÷ ' + ab + ' = ' + ecr(am / ab) + '.'],
          };
        },
      },
      {
        id: 'quelle-longueur-pour-paralleles',
        univers: 'maison-courses',
        // [AM, AB, AC] : la valeur de AN qui rend parallèles
        versions: [[2, 5, 10], [3, 6, 8], [2, 8, 12], [3, 9, 12], [4, 10, 15], [5, 8, 16]],
        genere(c) {
          const [am, ab, ac] = c.alea.choisir(this.versions);
          const an = r2((am * ac) / ab);
          return {
            enonce: 'M est sur [AB] et N est sur [AC]. On a AM = ' + am + ' cm, AB = ' + ab + ' cm et AC = ' + ac + ' cm. Combien doit mesurer AN pour que (MN) et (BC) soient parallèles, en cm ?',
            reponse: { type: 'nombre', valeur: an },
            aide: 'Il faut AN sur AC égale AM sur AB. Fais un produit en croix.',
            correction: ['AN/' + ac + ' = ' + am + '/' + ab + '.', 'AN = ' + am + ' × ' + ac + ' ÷ ' + ab + ' = ' + ecr(an) + ' cm.'],
          };
        },
      },
      O.qcm('quel-theoreme', 'commerce',
        [['Je sais que les droites sont parallèles, et je cherche une longueur.', 'Le théorème de Thalès', 'On part de droites parallèles connues.'],
          ['Les deux fractions sont égales, et je veux prouver que les droites sont parallèles.', 'La réciproque', 'L’égalité prouve le parallélisme.'],
          ['Les deux fractions sont différentes, et je veux prouver que les droites ne sont pas parallèles.', 'La contraposée', 'La différence prouve qu’elles ne sont pas parallèles.']],
        (x) => x + ' Quel théorème dois-je utiliser ?', ['Le théorème de Thalès', 'La réciproque', 'La contraposée'],
        'Sais-tu déjà que les droites sont parallèles, ou veux-tu le prouver ?'),
      O.qcm('ordre-des-points', 'maison-courses',
        [['A, M, B dans cet ordre, et A, N, C dans cet ordre', 'Oui, on peut l’utiliser', 'Les points sont dans le même ordre sur les deux droites.'],
          ['M, A, B dans cet ordre, et N, A, C dans cet ordre', 'Oui, on peut l’utiliser', 'Les points sont dans le même ordre sur les deux droites : c’est un papillon.'],
          ['A, M, B dans cet ordre, et N, A, C dans cet ordre', 'Non, on ne peut pas l’utiliser', 'L’ordre n’est pas le même : M est du côté de B, mais N n’est pas du côté de C.']],
        (x) => 'Les deux fractions sont égales, et les points sont placés ainsi : ' + x + '. Peut-on utiliser la réciproque de Thalès ?', ['Oui, on peut l’utiliser', 'Non, on ne peut pas l’utiliser'],
        'Les points doivent être dans le même ordre sur les deux droites.'),
    ],

    defi: {
      // [BM, BA, BN, BC]
      versions: [[2, 5, 1.6, 4], [3, 6, 2, 4], [2, 5, 2, 4], [4, 6, 6, 8]],
      genere(c) {
        const [bm, ba, bn, bc] = c.alea.choisir(this.versions);
        const q1 = r2(bm / ba), q2 = r2(bn / bc), eg = bm * bc === bn * ba;
        const juste = eg ? 'Oui, elle est parallèle' : 'Non, elle n’est pas parallèle';
        return {
          enonce: 'Dans la remise, le toit forme un triangle ABC, de sommet B. Rachel fixe une tablette [MN], avec M sur [BA] et N sur [BC]. On mesure BM = ' + bm + ' m, BA = ' + ba + ' m, BN = ' + ecr(bn) + ' m et BC = ' + bc + ' m.',
          image: { dessin: 'figure', points: { A: [0, 0], M: [2, 1.5], B: [4, 3], N: [6, 1.5], C: [8, 0] }, segments: [['A', 'B'], ['B', 'C'], ['A', 'C'], ['M', 'N']], description: 'Le triangle A B C de sommet B. M est sur B A, N sur B C. B M mesure ' + bm + ' mètres, B A ' + ba + ' mètres, B N ' + ecr(bn) + (bn < 2 ? ' mètre' : ' mètres') + ', B C ' + bc + ' mètres. Le dessin ne dit pas si M N est parallèle à A C : il faut calculer.' },
          questions: [
            {
              texte: 'Question 1. Calculer BM/BA, arrondi au centième.',
              reponse: { type: 'nombre', valeur: q1 },
              aide: 'Divise les deux longueurs.',
              correction: [bm + ' ÷ ' + ba + (q1 === bm / ba ? ' = ' : ' ≈ ') + ecr(q1) + '.'],
            },
            {
              texte: 'Question 2. Calculer BN/BC, arrondi au centième.',
              reponse: { type: 'nombre', valeur: q2 },
              aide: 'Divise les deux longueurs.',
              correction: [ecr(bn) + ' ÷ ' + bc + (q2 === bn / bc ? ' = ' : ' ≈ ') + ecr(q2) + '.'],
            },
            {
              texte: 'Question 3. La tablette est-elle parallèle à la poutre [AC] ?',
              reponse: O.choix(c.alea, juste, ['Oui, elle est parallèle', 'Non, elle n’est pas parallèle']),
              aide: 'Compare les deux quotients.',
              correction: ['Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Rédiger la justification, en citant le théorème utilisé.',
              correction: ['Les points B, M, A et B, N, C sont alignés dans le même ordre.', eg ? 'BM/BA = BN/BC : d’après la réciproque du théorème de Thalès, (MN) et (AC) sont parallèles.' : 'BM/BA est différent de BN/BC : d’après la contraposée du théorème de Thalès, (MN) et (AC) ne sont pas parallèles.'],
              grille: ['As-tu parlé de l’ordre des points ?', 'As-tu comparé les deux fractions ?', 'As-tu cité le bon théorème ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Sans outil spécial, deux quotients te disent si ta tablette est droite.',
    carte: ['paralleles-ou-pas', 'quel-theoreme', 'premier-quotient'],
    papierDuSoir: { exercices: ['paralleles-ou-pas', 'quelle-longueur-pour-paralleles'], defi: true },
    automatismes: [
      {
        id: 'quotient-egal',
        versions: [[2, 5], [3, 4], [1, 2], [3, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' ÷ ' + b + ' = ?', reponse: { type: 'nombre', valeur: a / b } }; },
      },
    ],
    savaisTu: null,
    prenoms: ['Rachel', 'Laure'],
  };
});
