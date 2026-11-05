/* Notion 15 du bloc SVT « Le corps humain et la santé » : l'immunité, la défense du corps. L'écharde de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ETAPES = ['Des microbes entrent par une plaie', 'Des globules blancs les avalent', 'D’autres globules blancs fabriquent des anticorps', 'Les anticorps neutralisent les microbes', 'Des cellules mémoire restent'];
  const PHAGO = 'Un globule blanc qui avale les microbes', LYMPHO = 'Un globule blanc qui fabrique des anticorps', ANTI = 'Un anticorps';

  return {
    id: 'immunite',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'L’immunité, la défense du corps',
    classe: '3e',
    univers: ['famille', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : réactions immunitaires, rôle des globules blancs.',

    accroche: {
      texte: 'Moussa s’est planté une écharde dans le doigt en réparant un banc. Le lendemain, autour, c’est rouge, chaud, un peu gonflé. ' +
        'Puis, en quelques jours, tout guérit tout seul. Qui a combattu les microbes entrés avec l’écharde ?',
      image: { dessin: 'chaine', etapes: ETAPES, description: 'Les étapes de la défense du corps : des microbes entrent, des globules blancs les avalent, d’autres fabriquent des anticorps, les anticorps neutralisent les microbes, des cellules mémoire restent.' },
    },

    manipulation: {
      image: { dessin: 'courbe', points: [[0, 0], [5, 20], [10, 40], [15, 10], [20, 0], [25, 90], [30, 60]], axeX: 'jours', axeY: 'anticorps dans le sang', description: 'Une courbe des anticorps : une première montée lente, puis, au deuxième contact, une montée bien plus rapide et plus forte.' },
      etapes: [
        'La peau est une première barrière. Quand elle est percée, des microbes entrent.',
        'Aussitôt, des globules blancs arrivent et avalent les microbes : c’est rapide, mais pas toujours suffisant. La rougeur et la chaleur en sont les signes.',
        'Ensuite, d’autres globules blancs fabriquent des anticorps : des molécules qui s’accrochent à un microbe précis, et à lui seul.',
        'Il reste des cellules mémoire. Au deuxième contact avec le même microbe, la réponse est bien plus rapide et plus forte.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pour se défendre contre les microbes, le corps a ' + c.mot('immunite') + '. Sa défense a deux temps : une réaction rapide, où des globules blancs avalent les microbes, ' +
        'puis une réaction plus lente et précise, avec des anticorps, chacun fait pour un seul microbe. ' +
        'L’astuce : le corps se souvient. Le deuxième combat contre le même microbe est gagné plus vite.',
    },

    vocabulaire: {
      termes: {
        immunite: { sesMots: 'une armée intérieure', officiel: 'un système immunitaire', lesDeux: 'une armée intérieure, que les scientifiques appellent le système immunitaire' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’armée du corps, avec des globules blancs qui avalent les microbes, et d’autres qui fabriquent des armes précises. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le système immunitaire. Les globules blancs qui avalent les microbes sont les phagocytes ; ceux qui fabriquent les anticorps sont des lymphocytes.',
        'Tu connais les mots officiels : phagocytes, lymphocytes, anticorps, mémoire immunitaire. Un anticorps est spécifique d’un seul microbe.',
      ],
    },

    exercices: [
      {
        id: 'etape-suivante',
        univers: 'dehors',
        versions: [0, 1, 2, 3],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = ETAPES[i + 1];
          return {
            enonce: 'Dans la défense du corps, que se passe-t-il après cette étape : « ' + ETAPES[i] + ' » ?',
            reponse: O.choix(c.alea, bonne, ETAPES.filter((_, k) => k !== i)),
            aide: 'D’abord avaler, puis fabriquer des anticorps, puis se souvenir.',
            correction: ['L’ordre : ' + ETAPES.map((t) => t.charAt(0).toLowerCase() + t.slice(1)).join(', puis ') + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quel-defenseur',
        univers: 'famille',
        versions: [['Il arrive très vite sur la plaie et avale les microbes.', PHAGO], ['Il produit des molécules faites pour un seul microbe.', LYMPHO], ['C’est une molécule qui s’accroche à un microbe précis.', ANTI]],
        genere(c) {
          const [desc, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Qui est-ce ? « ' + desc + ' »',
            reponse: O.choix(c.alea, bonne, [PHAGO, LYMPHO, ANTI]),
            aide: 'Avaler, fabriquer, s’accrocher.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'specifique',
        univers: 'famille',
        versions: [['Un anticorps contre la rougeole agit aussi contre la grippe.', false], ['Un anticorps s’accroche à un seul microbe précis.', true], ['Les globules blancs qui avalent les microbes agissent contre beaucoup de microbes différents.', true], ['Le corps ne garde aucun souvenir d’un microbe déjà rencontré.', false]],
        genere(c) {
          const [phrase, vrai] = c.alea.choisir(this.versions);
          const bonne = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Vrai ou faux ? « ' + phrase + ' »',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Les anticorps sont précis ; les globules blancs qui avalent ne le sont pas.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'plus-rapide',
        univers: 'dehors',
        // [jours pour produire assez d'anticorps au premier contact, au second]
        versions: [[12, 3], [14, 4], [10, 2], [15, 5], [12, 4], [10, 3]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au premier contact avec un microbe, le corps met ' + a + ' jours à fabriquer assez d’anticorps. Au second contact, ' + b + ' jours. Combien de jours gagne-t-il ?',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Calcule ' + a + ' − ' + b + '.',
            aideParlee: 'Fais la différence entre les deux durées.',
            correction: [a + ' − ' + b + ' = ' + (a - b) + ' jours de gagnés, grâce à la mémoire.'],
          };
        },
      },
      {
        id: 'combien-de-fois',
        univers: 'famille',
        // [anticorps au premier contact, au second, en unités]
        versions: [[10, 100], [20, 200], [15, 150], [25, 100], [10, 80], [30, 150]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au premier contact, le sang contient au plus ' + a + ' unités d’anticorps ; au second contact, ' + b + ' unités. Combien de fois plus ?',
            reponse: { type: 'nombre', valeur: b / a },
            aide: 'Calcule ' + b + ' ÷ ' + a + '.',
            aideParlee: 'Divise la quantité du second contact par celle du premier.',
            correction: [b + ' ÷ ' + a + ' = ' + b / a + ' fois plus.'],
          };
        },
      },
    ],

    defi: {
      // [jours premier contact, jours second contact, anticorps premier, anticorps second]
      versions: [[12, 3, 20, 200], [14, 4, 10, 100], [10, 2, 25, 150], [15, 5, 20, 160]],
      genere(c) {
        const [j1, j2, a1, a2] = c.alea.choisir(this.versions);
        return {
          enonce: 'Un graphique montre les anticorps de Rebecca contre un microbe. Au premier contact, il faut ' + j1 + ' jours pour en avoir assez, et le maximum est de ' + a1 + ' unités. ' +
            'Quelques semaines plus tard, au second contact, il faut ' + j2 + ' jours, et le maximum est de ' + a2 + ' unités.',
          image: { dessin: 'courbe', points: [[0, 0], [j1, a1], [j1 + 10, 0], [j1 + 20, 0], [j1 + 20 + j2, a2]], axeX: 'jours', axeY: 'anticorps', description: 'La courbe des anticorps : une petite montée lente au premier contact, une grande montée rapide au second.' },
          questions: [
            {
              texte: 'Question 1. Combien de jours la réponse est-elle plus rapide au second contact ?',
              reponse: { type: 'nombre', valeur: j1 - j2 },
              aide: 'Fais la différence entre les deux durées.',
              correction: [j1 + ' − ' + j2 + ' = ' + (j1 - j2) + ' jours.'],
            },
            {
              texte: 'Question 2. Combien de fois plus d’anticorps y a-t-il au second contact ?',
              reponse: { type: 'nombre', valeur: a2 / a1 },
              aide: 'Divise le maximum du second contact par celui du premier.',
              correction: [a2 + ' ÷ ' + a1 + ' = ' + a2 / a1 + ' fois plus.'],
            },
            {
              texte: 'Question 3. Explique pourquoi la seconde réponse est plus rapide et plus forte.',
              correction: ['Après le premier contact, il reste des cellules mémoire qui reconnaissent ce microbe.', 'Au second contact, elles fabriquent très vite beaucoup d’anticorps : c’est la mémoire immunitaire, celle qu’utilisent les vaccins.'],
              grille: ['As-tu parlé des cellules mémoire ?', 'As-tu dit que les anticorps sont fabriqués plus vite et en plus grand nombre ?', 'As-tu fait le lien avec la vaccination ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avaler, fabriquer des anticorps, se souvenir : tu connais les armes de défense de ton corps.',
    carte: ['etape-suivante', 'quel-defenseur', 'specifique'],
    papierDuSoir: { exercices: ['plus-rapide', 'combien-de-fois'], defi: true },
    automatismes: [
      {
        id: 'defenseur-rapide',
        versions: [['avale les microbes', PHAGO], ['s’accroche à un seul microbe', ANTI]],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Qui ' + d + ' ?', reponse: O.choix(c.alea, b, [PHAGO, LYMPHO, ANTI]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 2020, la région Afrique de l’Organisation mondiale de la santé a été déclarée libre du poliovirus sauvage, grâce à la vaccination.',
    prenoms: ['Moussa', 'Rebecca'],
  };
});
