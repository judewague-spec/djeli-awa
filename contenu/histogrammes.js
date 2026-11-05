/* Notion du bloc « Données, probabilités, programmation » : les histogrammes. Les tailles des camarades de danse de Rachel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const somme = (l) => l.reduce((a, b) => a + b, 0);
  const etiq = (base, w, i, u) => 'de ' + (base + i * w) + ' à ' + (base + (i + 1) * w) + ' ' + u;
  const classes = (e, base, w) => e.map((x, i) => [base + i * w, base + (i + 1) * w, x]);
  const de = (mot) => (/^[aeiouyéèêh]/i.test(mot) ? 'd’' : 'de ') + mot;
  const etiqLongue = (base, w, i, u) => 'de ' + (base + i * w) + ' ' + u + ' inclus à ' + (base + (i + 1) * w) + ' ' + u + ' exclu';
  const lignes = (e, base, w, u, qui) => e.map((x, i) => etiqLongue(base, w, i, u) + ' : ' + x + ' ' + qui).join(' ; ');
  const image = (e, base, w, u, qui, sujet) => ({
    dessin: 'histogramme', classes: classes(e, base, w), axe: sujet + ' (' + u + ')',
    description: 'Un histogramme. ' + sujet + '. ' + e.map((x, i) => { const n = etiq(base, w, i, u); return n.charAt(0).toUpperCase() + n.slice(1) + ', ' + x + ' ' + qui + '.'; }).join(' '),
  });
  // [effectifs, borne basse, largeur, sujet, unité, qui]
  const JEUX = [
    [[4, 9, 12, 5], 140, 10, 'Tailles des élèves d’un groupe de danse', 'cm', 'élèves'],
    [[8, 14, 6, 2], 0, 10, 'Temps de trajet jusqu’au collège', 'min', 'élèves'],
    [[5, 12, 18, 10, 5], 20, 10, 'Âges des clients d’un marché, un samedi', 'ans', 'clients'],
    [[6, 11, 15, 8], 0, 5, 'Dépenses des clients d’une boulangerie', '€', 'clients'],
    [[3, 12, 7, 6], 30, 15, 'Durées des séances de sport', 'min', 'personnes'],
  ];
  const avec = (k) => JEUX.map((j, i) => j.concat([k[i]]));

  const IMG = image([4, 9, 12, 5], 140, 10, 'cm', 'élèves', 'Tailles des camarades de danse de Rachel');

  return {
    id: 'histogrammes',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Les histogrammes',
    classe: '3e',
    univers: ['danses', 'commerce'],

    accroche: {
      texte: 'Rachel a mesuré ses camarades de danse. Elle range les tailles par groupes de 10 centimètres. ' +
        'Chaque groupe a sa colonne. Plus il y a de monde dans le groupe, plus la colonne est haute.',
      image: IMG,
    },

    manipulation: {
      image: IMG,
      etapes: [
        'Chaque colonne couvre un groupe de tailles. Tous les groupes ont la même largeur.',
        'La hauteur de la colonne dit combien de personnes sont dans ce groupe.',
        'La colonne la plus haute montre le groupe où il y a le plus de monde.',
        'Pour avoir le total des personnes, ajoute les hauteurs de toutes les colonnes.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde la largeur d’une colonne. C’est ' + c.mot('classe') + '. Regarde sa hauteur. C’est ' + c.mot('effectif') + '. ' +
        'L’astuce : la colonne la plus haute est le groupe le plus fréquent. Pour le total, ajoute toutes les hauteurs.',
    },

    vocabulaire: {
      termes: {
        classe: { sesMots: 'le groupe de valeurs', officiel: 'la classe', lesDeux: 'le groupe de valeurs, que l’on appelle la classe' },
        effectif: { sesMots: 'le nombre de personnes du groupe', officiel: 'l’effectif', lesDeux: 'le nombre de personnes du groupe, que l’on appelle l’effectif' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le groupe de valeurs, et le nombre de personnes du groupe. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : la classe, pour le groupe de valeurs. Le nombre de personnes du groupe s’appelle l’effectif.',
        'Tu connais les mots officiels : la classe et l’effectif.',
      ],
    },

    exercices: [
      {
        id: 'lire-effectif',
        univers: 'danses',
        versions: avec([2, 0, 3, 1, 2]),
        genere(c) {
          const [e, base, w, sujet, u, qui, i] = c.alea.choisir(this.versions);
          return {
            enonce: sujet + '. Effectifs, classe par classe : ' + lignes(e, base, w, u, qui) + '. Quel est l’effectif de la classe ' + etiq(base, w, i, u) + ' ?',
            image: image(e, base, w, u, qui, sujet),
            reponse: { type: 'nombre', valeur: e[i] },
            aide: 'Cherche la colonne de ce groupe de valeurs. Sa hauteur est son effectif.',
            correction: ['La classe ' + etiq(base, w, i, u) + ' a pour effectif ' + e[i] + '.'],
          };
        },
      },
      {
        id: 'classe-frequente',
        univers: 'commerce',
        versions: avec([0, 0, 0, 0, 0]),
        genere(c) {
          const [e, base, w, sujet, u, qui] = c.alea.choisir(this.versions);
          const m = e.indexOf(Math.max(...e)), n = e.length;
          return {
            enonce: sujet + '. Effectifs, classe par classe : ' + lignes(e, base, w, u, qui) + '. Quelle est la classe la plus fréquente ?',
            image: image(e, base, w, u, qui, sujet),
            reponse: O.choix(c.alea, etiq(base, w, m, u), [etiq(base, w, (m + 1) % n, u), etiq(base, w, (m + 2) % n, u)]),
            aide: 'Le groupe le plus rempli est celui dont la colonne est la plus haute.',
            correction: ['Le plus grand effectif est ' + e[m] + '.', 'C’est la classe ' + etiq(base, w, m, u) + '.'],
          };
        },
      },
      {
        id: 'total-effectif',
        univers: 'commerce',
        versions: avec([0, 0, 0, 0, 0]),
        genere(c) {
          const [e, base, w, sujet, u, qui] = c.alea.choisir(this.versions);
          return {
            enonce: sujet + '. Effectifs, classe par classe : ' + lignes(e, base, w, u, qui) + '. Combien y a-t-il ' + de(qui) + ' en tout ?',
            image: image(e, base, w, u, qui, sujet),
            reponse: { type: 'nombre', valeur: somme(e) },
            aide: 'Ajoute les effectifs de tous les groupes.',
            correction: [e.join(' + ') + ' = ' + somme(e) + '.'],
          };
        },
      },
      {
        id: 'au-moins',
        univers: 'danses',
        versions: avec([2, 1, 2, 1, 2]),
        genere(c) {
          const [e, base, w, sujet, u, qui, k] = c.alea.choisir(this.versions);
          const reste = e.slice(k);
          return {
            enonce: sujet + '. Effectifs, classe par classe : ' + lignes(e, base, w, u, qui) + '. Combien y a-t-il ' + de(qui) + ' dans les classes qui commencent à ' + (base + k * w) + ' ' + u + ' ou plus ?',
            image: image(e, base, w, u, qui, sujet),
            reponse: { type: 'nombre', valeur: somme(reste) },
            aide: 'Repère le premier groupe concerné, puis ajoute son effectif et ceux des groupes à sa droite.',
            correction: ['Les classes concernées ont pour effectifs ' + reste.join(' ; ') + '.', reste.join(' + ') + ' = ' + somme(reste) + '.'],
          };
        },
      },
      {
        id: 'part-classe',
        univers: 'commerce',
        versions: avec([1, 2, 0, 2, 1]),
        genere(c) {
          const [e, base, w, sujet, u, qui, i] = c.alea.choisir(this.versions);
          const t = somme(e);
          return {
            enonce: sujet + '. Effectifs, classe par classe : ' + lignes(e, base, w, u, qui) + '. Quelle fraction des ' + qui + ' est dans la classe ' + etiq(base, w, i, u) + ' ?',
            image: image(e, base, w, u, qui, sujet),
            reponse: { type: 'fraction', valeur: [e[i], t] },
            aide: 'Mets l’effectif du groupe en haut, et l’effectif total en bas.',
            correction: ['Effectif de la classe : ' + e[i] + '.', 'Effectif total : ' + e.join(' + ') + ' = ' + t + '.', 'La fraction est ' + e[i] + '/' + t + '.'],
          };
        },
      },
    ],

    defi: {
      // [effectifs, borne basse, largeur, sujet, unité, qui, nombre de classes « en dessous de »]
      versions: [
        [[6, 13, 9, 2], 0, 5, 'Durées de visite au stand de Moussa', 'min', 'clients', 2],
        [[7, 16, 12, 5], 0, 20, 'Âges des invités d’une fête', 'ans', 'invités', 2],
        [[5, 9, 14, 8, 4], 10, 10, 'Prix des paniers vendus au marché', '€', 'paniers', 3],
        [[4, 10, 7, 3], 0, 2, 'Poids des colis d’un magasin', 'kg', 'colis', 1],
      ],
      genere(c) {
        const [e, base, w, sujet, u, qui, k] = c.alea.choisir(this.versions);
        const m = e.indexOf(Math.max(...e)), n = e.length;
        const moins = somme(e.slice(0, k));
        return {
          enonce: sujet + '. Effectifs, classe par classe : ' + lignes(e, base, w, u, qui) + '. Toutes les classes ont la même largeur. Dans chaque classe, la première valeur est comprise, la dernière ne l’est pas.',
          image: image(e, base, w, u, qui, sujet),
          questions: [
            {
              texte: 'Question 1. Combien y a-t-il ' + de(qui) + ' en tout ?',
              reponse: { type: 'nombre', valeur: somme(e) },
              aide: 'Ajoute les effectifs de tous les groupes.',
              correction: [e.join(' + ') + ' = ' + somme(e) + '.'],
            },
            {
              texte: 'Question 2. Quelle est la classe la plus fréquente ?',
              reponse: O.choix(c.alea, etiq(base, w, m, u), [etiq(base, w, (m + 1) % n, u), etiq(base, w, (m + 2) % n, u)]),
              aide: 'Cherche la colonne la plus haute.',
              correction: ['Le plus grand effectif est ' + e[m] + '.', 'C’est la classe ' + etiq(base, w, m, u) + '.'],
            },
            {
              texte: 'Question 3. Combien y a-t-il ' + de(qui) + ' en dessous de ' + (base + k * w) + ' ' + u + ' ?',
              reponse: { type: 'nombre', valeur: moins },
              aide: 'Ajoute les effectifs des groupes situés à gauche de cette valeur.',
              correction: k === 1 ? ['Une seule classe est concernée, la première.', 'Son effectif est ' + moins + '.'] : ['Les classes concernées ont pour effectifs ' + e.slice(0, k).join(' ; ') + '.', e.slice(0, k).join(' + ') + ' = ' + moins + '.'],
            },
            {
              texte: 'Question 4. Écris une phrase de conclusion qui dit dans quelle classe se trouvent le plus ' + de(qui) + ', et comment tu le sais sur l’histogramme.',
              correction: ['Le plus ' + de(qui) + ' se trouvent dans la classe ' + etiq(base, w, m, u) + ', avec un effectif de ' + e[m] + '.', 'On le sait parce que sa colonne est la plus haute, et que toutes les classes ont la même largeur.'],
              grille: ['As-tu nommé la bonne classe ?', 'As-tu donné son effectif ?', 'As-tu dit que sa colonne est la plus haute ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu lis un histogramme comme une pro : la largeur dit le groupe, la hauteur dit combien.',
    carte: ['lire-effectif', 'classe-frequente', 'total-effectif'],
    papierDuSoir: { exercices: ['au-moins', 'part-classe'], defi: true },
    automatismes: [
      {
        id: 'total-colonnes',
        versions: [[3, 5, 2], [4, 4, 7], [6, 1, 8], [9, 2, 4]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          return { enonce: 'Trois colonnes d’un histogramme ont pour hauteurs ' + a + ', ' + b + ' et ' + d + '. Quel est l’effectif total ?', reponse: { type: 'nombre', valeur: a + b + d } };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Royaume-Uni, Karl Pearson a inventé le mot histogramme dans ses conférences publiques de 1895.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
