/* Notion 6 du bloc SVT « Le vivant et son évolution » : les réserves des plantes. L'igname de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const AMIDON = 'Bleu-noir : il y a de l’amidon', RIEN = 'Pas de bleu-noir : il n’y a pas d’amidon';

  return {
    id: 'reserves-plantes',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Les réserves des plantes',
    classe: 'cycle 4',
    univers: ['champetre', 'cuisine-restaurant'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : stockage de la matière organique par les plantes, organes de réserve.',

    accroche: {
      texte: 'Clarisse a gardé une igname au fond de sa cuisine, depuis la récolte. Elle a vu sortir une longue pousse verte, sans terre et presque sans lumière ! ' +
        'Où cette pousse trouve-t-elle sa matière ? Dans l’igname elle-même, comme dans un garde-manger.',
      image: { dessin: 'chaine', etapes: ['Les feuilles fabriquent le sucre', 'La sève l’apporte au tubercule', 'Il y est rangé en grandes chaînes', 'Il nourrit plus tard les jeunes pousses'], description: 'Les feuilles fabriquent le sucre ; la sève l’apporte au tubercule ; il y est rangé en grandes chaînes ; plus tard, il nourrit les jeunes pousses.' },
    },

    manipulation: {
      image: { dessin: 'tube', aspect: 'bleu', legende: 'Avec du sucre en chaînes', description: 'Un tube à essai bleu-noir : une goutte d’eau iodée colore en bleu-noir le sucre rangé en chaînes.' },
      etapes: [
        'La plante fabrique plus de sucre qu’elle n’en utilise. Elle garde le reste.',
        'Elle le stocke dans des parties précises : le tubercule de l’igname ou de la pomme de terre, la racine du manioc, la graine du maïs, le bulbe de l’oignon.',
        'Très souvent, ce sucre est rangé en grandes chaînes, qui se gardent bien.',
        'En classe, l’eau iodée le montre : sur une tranche de pomme de terre, ce sucre rangé devient bleu-noir.',
        'Quand la plante repart, elle utilise ces réserves. Et quand tu manges du manioc, tu les manges aussi !',
      ],
    },

    decouverte: {
      texte: (c) => 'Une plante garde dans certains organes ' + c.mot('reserves') + '. Souvent sous forme ' + c.mot('amidon') + '. ' +
        'Ces réserves nourrissent les nouvelles pousses, quand les feuilles ne suffisent pas encore. ' +
        'L’astuce : quand tu manges une igname ou un grain de riz, tu manges le garde-manger d’une plante.',
    },

    vocabulaire: {
      termes: {
        reserves: { sesMots: 'son garde-manger', officiel: 'ses réserves', lesDeux: 'son garde-manger, que les scientifiques appellent ses réserves' },
        amidon: { sesMots: 'de sucre rangé en grandes chaînes', officiel: 'd’amidon', lesDeux: 'de sucre rangé en grandes chaînes, que l’on appelle l’amidon' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le garde-manger de la plante, et le sucre rangé en grandes chaînes. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : les réserves, pour le garde-manger. Le sucre rangé en grandes chaînes, c’est l’amidon.',
        'Tu connais les mots officiels : les réserves, l’amidon, le tubercule et le bulbe.',
      ],
    },

    exercices: [
      O.qcm('quel-organe', 'champetre',
        [['l’igname', 'Un tubercule'], ['le maïs que l’on sème', 'Une graine'], ['l’oignon', 'Un bulbe'], ['la pomme de terre', 'Un tubercule'], ['le haricot sec', 'Une graine']].map((v) => [v[0], v[1], 'L’igname et la pomme de terre sont des tubercules, le maïs et le haricot des graines, l’oignon un bulbe.']),
        (x) => 'Quel organe de réserve est ' + x + ' ?', ['Un tubercule', 'Une graine', 'Un bulbe'],
        'Une graine peut germer. Un bulbe est fait de couches, comme l’oignon.'),
      O.qcm('test-eau-iodee', 'cuisine-restaurant',
        [['une tranche de pomme de terre', AMIDON], ['un peu de farine de manioc', AMIDON], ['un peu d’huile', RIEN], ['un verre d’eau', RIEN]].map((v) => [v[0], v[1], 'L’eau iodée devient bleu-noir au contact de l’amidon. L’huile et l’eau n’en contiennent pas.']),
        (x) => 'On verse une goutte d’eau iodée sur ' + x + '. Que voit-on ?', [AMIDON, RIEN],
        'Les organes de réserve et leurs farines contiennent de l’amidon.'),
      O.qcm('a-quoi-ca-sert', 'champetre',
        [['Pourquoi une igname germe-t-elle sans feuilles ?', 'La pousse utilise les réserves'], ['Comment une graine grandit-elle avant d’avoir des feuilles ?', 'La pousse utilise les réserves']].map((v) => [v[0], v[1], 'Sans feuilles vertes, la pousse ne peut pas fabriquer son sucre : elle utilise les réserves.']),
        (x) => x, ['La pousse utilise les réserves', 'La pousse mange la terre', 'La pousse n’a besoin de rien'],
        'Avant d’avoir des feuilles vertes, la plante ne peut pas encore fabriquer son sucre.'),
      {
        id: 'amidon-dans-la-masse',
        univers: 'cuisine-restaurant',
        // [masse de tubercule en g, part d'amidon sur 100]
        versions: [[200, 20], [500, 30], [300, 20], [400, 25], [100, 30], [600, 15]],
        genere(c) {
          const [m, p] = c.alea.choisir(this.versions);
          const a = (m * p) / 100;
          return {
            enonce: 'Un morceau de tubercule de ' + m + ' g contient ' + p + ' % d’amidon. Combien de grammes d’amidon contient-il ?',
            reponse: { type: 'nombre', valeur: a },
            aide: 'Calcule ' + m + ' × ' + p + ' ÷ 100.',
            aideParlee: 'Multiplie la masse par le pourcentage, puis divise par cent.',
            correction: [m + ' × ' + p + ' ÷ 100 = ' + ecr(a) + ' g.'],
          };
        },
      },
      {
        id: 'semence-et-recolte',
        univers: 'champetre',
        // [ignames plantées, ignames récoltées par igname plantée]
        versions: [[12, 4], [20, 3], [15, 4], [25, 2], [10, 6], [30, 3]],
        genere(c) {
          const [n, r] = c.alea.choisir(this.versions);
          return {
            enonce: 'Clarisse plante ' + n + ' morceaux d’igname. Chacun donne ' + r + ' nouvelles ignames. Combien d’ignames récolte-t-elle ?',
            reponse: { type: 'nombre', valeur: n * r },
            aide: 'Calcule ' + n + ' × ' + r + '.',
            aideParlee: 'Multiplie le nombre de morceaux par ce que donne chacun.',
            correction: [n + ' × ' + r + ' = ' + n * r + ' ignames.'],
          };
        },
      },
    ],

    defi: {
      // [masse au départ en g, masse après la germination dans le noir]
      versions: [[200, 160], [300, 250], [150, 120], [250, 200]],
      genere(c) {
        const [a, b] = c.alea.choisir(this.versions);
        return {
          enonce: 'Expérience : Rachel pèse une pomme de terre : ' + a + ' g. Elle la garde dans le noir pendant plusieurs semaines. Une pousse sort, puis la pomme de terre, sans sa pousse, ne pèse plus que ' + b + ' g, et elle s’est ramollie. L’eau iodée, à son contact, donne moins de bleu-noir qu’au début.',
          questions: [
            {
              texte: 'Question 1. Combien de grammes la pomme de terre a-t-elle perdus ?',
              reponse: { type: 'nombre', valeur: a - b },
              aide: 'Fais la différence entre la masse de départ et la masse d’arrivée.',
              correction: [a + ' − ' + b + ' = ' + (a - b) + ' g.'],
            },
            {
              texte: 'Question 2. Que montre le test à l’eau iodée ?',
              reponse: O.choix(c.alea, 'Il reste moins d’amidon', ['Il reste moins d’amidon', 'Il y a plus d’amidon', 'Il n’y a jamais eu d’amidon']),
              aide: 'Le bleu-noir révèle l’amidon. Ici, il y en a moins.',
              correction: ['Moins de bleu-noir : moins d’amidon.', 'Réponse : Il reste moins d’amidon.'],
            },
            {
              texte: 'Question 3. Explique comment la pousse a pu grandir dans le noir.',
              correction: ['Dans le noir, il n’y a pas de photosynthèse : la pousse ne peut pas fabriquer son sucre.', 'Elle a utilisé les réserves du tubercule, l’amidon : c’est pourquoi il en reste moins.'],
              grille: ['As-tu dit que, sans lumière, il n’y a pas de photosynthèse ?', 'As-tu parlé de l’utilisation des réserves ?', 'As-tu nommé l’amidon ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tubercule, graine, bulbe : tu sais où une plante cache son garde-manger.',
    carte: ['quel-organe', 'test-eau-iodee', 'a-quoi-ca-sert'],
    papierDuSoir: { exercices: ['amidon-dans-la-masse', 'semence-et-recolte'], defi: true },
    automatismes: [
      {
        id: 'dix-pour-cent',
        versions: [200, 300, 500, 800],
        genere(c) { const m = c.alea.choisir(this.versions); return { enonce: '10 % de ' + m + ' = ?', reponse: { type: 'nombre', valeur: m / 10 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Pérou, dans les Andes, poussent des pommes de terre anciennes : leurs tubercules gardent l’amidon fabriqué par les feuilles.',
    prenoms: ['Clarisse', 'Rachel'],
  };
});
