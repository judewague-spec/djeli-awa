/* Notion 2 du bloc de technologie « Comment un objet fonctionne » : recycler les matériaux. La canette de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const pl = (n, mot, pluriel) => mot + (n >= 2 ? pluriel || 's' : '');

  return {
    id: 'recyclage-materiaux',
    matiere: 'technologie',
    bloc: 'fonctionnement-objets',
    titre: 'Recycler les matériaux',
    classe: 'cycle 4',
    univers: ['maison-courses', 'dehors', 'champetre'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » : matériaux recyclables, tri, matière première économisée.',

    accroche: {
      texte: 'Moussa pose une canette vide sur l’établi. Rachel hésite : où la jeter ? Laure sourit. Dans le bon bac, la canette repart à l’usine. ' +
        'Là, on la fond pour fabriquer des objets neufs, sans creuser la terre.',
      image: { dessin: 'chaine', etapes: ['Une canette dans le bon bac', 'L’usine la fond', 'Un objet neuf est fabriqué'], description: 'Le trajet d’une canette : elle est jetée dans le bon bac, l’usine la fond, puis un objet neuf est fabriqué.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Un déchet dans le bon bac', 'L’usine le fond ou le broie', 'Une matière neuve est refaite', 'Un objet neuf est fabriqué'], description: 'Quatre étapes : un déchet est rangé dans le bon bac, l’usine le fond ou le broie, une matière neuve est refaite, puis un objet neuf est fabriqué.' },
      etapes: [
        'Un déchet n’est pas toujours perdu : le métal, le verre et le papier peuvent servir à refaire des objets.',
        'D’abord, on range chaque déchet avec sa matière, dans le bon bac.',
        'Ensuite, l’usine fond le métal ou broie le verre, pour refaire de la matière neuve.',
        'Cette matière neuve remplace ce qu’on irait chercher dans la terre. On économise la nature.',
        'Un objet fait de plusieurs matières collées est plus dur à ranger, donc à refaire.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le bac jaune et le conteneur à verre : c’est ' + c.mot('tri') + '. ' +
        'Regarde la canette fondue à l’usine : c’est ' + c.mot('recyclage') + '. ' +
        'Regarde le minerai dans la mine : c’est ' + c.mot('matiere') + '. ' +
        'L’astuce : ce qu’on refait, on n’a plus besoin de le prendre dans la nature.',
    },

    vocabulaire: {
      termes: {
        tri: { sesMots: 'ranger chaque déchet avec sa matière', officiel: 'le tri sélectif', lesDeux: 'ranger chaque déchet avec sa matière. Les techniciens disent : le tri sélectif' },
        recyclage: { sesMots: 'refaire de la matière neuve avec un vieil objet', officiel: 'le recyclage', lesDeux: 'refaire de la matière neuve avec un vieil objet. Les techniciens disent : le recyclage' },
        matiere: { sesMots: 'ce qu’on prend dans la nature pour fabriquer', officiel: 'la matière première', lesDeux: 'ce qu’on prend dans la nature pour fabriquer. Les techniciens disent : la matière première' },
      },
      textes: [
        'Pour l’instant, garde tes mots : ranger chaque déchet avec sa matière, refaire de la matière neuve, et ce qu’on prend dans la nature. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : le tri sélectif, pour ranger les déchets. Le recyclage, pour refaire de la matière. La matière première, pour ce qu’on prend dans la nature.',
        'Tu connais les mots officiels : le tri sélectif, le recyclage et la matière première.',
      ],
    },

    exercices: [
      O.qcm('quel-bac', 'maison-courses',
        [['une canette en aluminium', 'Au bac jaune', 'Un emballage en métal va au bac jaune.'], ['une bouteille en verre', 'Au conteneur à verre', 'Le verre a son propre conteneur.'], ['un carton d’emballage', 'Au bac jaune', 'Un emballage en carton va au bac jaune.'], ['un pot de yaourt en plastique', 'Au bac jaune', 'Un emballage en plastique va au bac jaune.'], ['une couche usagée', 'Aux ordures ménagères', 'Une couche usagée n’est ni un emballage ni du verre : elle va aux ordures ménagères.'], ['un bocal en verre', 'Au conteneur à verre', 'Le verre a son propre conteneur.']],
        (x) => 'Dans la commune de Rachel, le bac jaune reçoit les emballages en métal, en plastique et en carton. Le verre a son conteneur. Où va ' + x + ' ?',
        ['Au bac jaune', 'Au conteneur à verre', 'Aux ordures ménagères'],
        'Cherche de quelle matière est fait l’objet.'),
      O.qcm('matiere-refaite', 'dehors',
        [['une bouteille en verre', 'De verre', 'Le verre broyé et fondu donne du verre neuf.'], ['une canette en aluminium', 'D’aluminium', 'L’aluminium fondu donne de l’aluminium neuf.'], ['du vieux papier', 'De papier', 'Le vieux papier défait donne du papier neuf.'], ['une vieille poêle en acier', 'D’acier', 'L’acier fondu donne de l’acier neuf.']],
        (x) => 'Après le recyclage, de quelle matière est faite la matière neuve refaite avec cet objet jeté : ' + x + ' ?',
        ['De verre', 'D’aluminium', 'De papier', 'D’acier'],
        'La matière refaite est la même que celle de l’objet jeté.'),
      {
        id: 'canettes-economisees',
        univers: 'champetre',
        // [nombre de canettes, grammes par canette]
        versions: [[100, 15], [200, 15], [40, 14], [500, 15], [60, 12]],
        genere(c) {
          const [n, g] = c.alea.choisir(this.versions);
          return {
            enonce: 'L’école de Moussa recycle ' + n + ' canettes en aluminium. Chaque canette pèse ' + g + ' g. Dans cet exemple, chaque gramme recyclé évite de prendre un gramme de matière neuve dans la nature. Combien de grammes de matière première sont économisés ?',
            reponse: { type: 'nombre', valeur: n * g },
            aide: 'Multiplie le nombre de canettes par la masse d’une canette.',
            correction: [n + ' × ' + g + ' = ' + n * g + ' g.'],
          };
        },
      },
      {
        id: 'part-ordures',
        univers: 'maison-courses',
        // [kg de déchets par semaine, kg recyclables]
        versions: [[12, 7], [10, 6], [15, 9], [8, 5], [20, 13]],
        genere(c) {
          const [t, r] = c.alea.choisir(this.versions);
          return {
            enonce: 'Chaque semaine, la famille de Laure jette ' + t + ' kg de déchets. Il y a ' + r + ' kg de déchets recyclables, rangés dans les bons bacs. Combien de kilogrammes partent aux ordures ménagères ?',
            reponse: { type: 'nombre', valeur: t - r },
            aide: 'Retire les déchets recyclables du total.',
            correction: [t + ' − ' + r + ' = ' + (t - r) + ' kg.'],
          };
        },
      },
      {
        id: 'papier-annee',
        univers: 'dehors',
        // [kg de papier par semaine]
        versions: [5, 8, 10, 12, 6],
        genere(c) {
          const k = c.alea.choisir(this.versions);
          return {
            enonce: 'Chaque semaine, l’association de Rachel range ' + k + ' kg de papier dans le bac à papier. L’année scolaire compte 36 semaines. Combien de kilogrammes de papier sont rangés en une année scolaire ?',
            reponse: { type: 'nombre', valeur: k * 36 },
            aide: 'Multiplie la masse d’une semaine par le nombre de semaines.',
            correction: [k + ' × 36 = ' + k * 36 + ' kg.'],
          };
        },
      },
    ],

    defi: {
      // [canettes par semaine, semaines, grammes par canette, objectif en kg]
      versions: [[50, 8, 15, 5], [40, 5, 15, 4], [60, 10, 10, 6], [30, 4, 15, 2]],
      genere(c) {
        const [n, s, g, obj] = c.alea.choisir(this.versions);
        const total = n * s, kg = Math.round(total * g) / 1000;
        const bonne = kg >= obj ? 'Oui' : 'Non';
        return {
          enonce: 'Le club de Moussa ramasse ' + n + ' canettes en aluminium chaque semaine, pendant ' + s + ' semaines. Chaque canette pèse ' + g + ' g. ' +
            'Dans cet exemple, chaque gramme recyclé évite de prendre un gramme de matière neuve. Le club vise ' + obj + ' kg de matière première économisée.',
          image: { dessin: 'chaine', etapes: [n + ' canettes par semaine', s + ' semaines', g + ' g par canette', 'Objectif : ' + obj + ' kg'], description: 'Le club ramasse ' + n + ' canettes par semaine pendant ' + s + ' semaines. Chaque canette pèse ' + g + ' grammes. L’objectif est de ' + obj + ' kilogrammes économisés.' },
          questions: [
            {
              texte: 'Question 1. Combien de canettes le club ramasse-t-il en tout ?',
              reponse: { type: 'nombre', valeur: total },
              aide: 'Multiplie les canettes d’une semaine par le nombre de semaines.',
              correction: [n + ' × ' + s + ' = ' + total + ' canettes.'],
            },
            {
              texte: 'Question 2. Quelle masse d’aluminium cela représente-t-il, en kilogrammes ?',
              reponse: { type: 'nombre', valeur: kg },
              aide: 'Multiplie par la masse d’une canette, puis passe des grammes aux kilogrammes.',
              correction: [total + ' × ' + g + ' = ' + total * g + ' g.', total * g + ' g = ' + ecr(kg) + ' kg.'],
            },
            {
              texte: 'Question 3. Le club atteint-il son objectif ?',
              reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
              aide: 'Compare la masse économisée à l’objectif.',
              correction: [ecr(kg) + ' kg ' + (kg >= obj ? 'est supérieur ou égal à ' : 'est inférieur à ') + obj + ' kg.', 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Pourquoi un objet fait de plusieurs matières collées est-il plus dur à recycler ? Explique.',
              correction: ['Il faut séparer les matières avant de les refaire.', 'Collées, elles se séparent mal : le tri est plus long, et la matière refaite est moins pure.'],
              grille: ['As-tu parlé de séparer les matières ?', 'As-tu dit que le tri devient plus long ou la matière moins pure ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais quoi ranger dans quel bac, et pourquoi refaire de la matière protège la nature.',
    carte: ['quel-bac', 'matiere-refaite', 'canettes-economisees'],
    papierDuSoir: { exercices: ['canettes-economisees', 'papier-annee'], defi: true },
    automatismes: [
      {
        id: 'fois-semaines',
        versions: [[5, 36], [8, 36], [10, 36], [4, 36]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, à Yaoundé, l’entreprise de Roger Milla fabrique des pavés avec du plastique recyclé mélangé à du sable.',
    prenoms: ['Moussa', 'Rachel', 'Laure'],
  };
});
