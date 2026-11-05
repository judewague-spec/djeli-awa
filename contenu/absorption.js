/* Notion 9 du bloc SVT « Le corps humain et la santé » : l'absorption des nutriments. Du repas au sang.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const PASSE = 'Oui, dans le sang', NON = 'Non, il reste dans l’intestin';

  return {
    id: 'absorption',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'L’absorption des nutriments',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : passage des nutriments dans le sang.',

    accroche: {
      texte: 'Après le repas, Aminata se sent pleine d’énergie pour sa répétition de danse. Mais son repas est encore dans son ventre ! ' +
        'Comment le glucose du riz arrive-t-il jusqu’aux muscles de ses jambes ?',
      image: { dessin: 'chaine', etapes: ['Les nutriments dans l’intestin grêle', 'Ils traversent la paroi', 'Ils passent dans le sang', 'Le sang les apporte aux organes'], description: 'Le trajet des nutriments : de l’intestin grêle, à travers la paroi, dans le sang, jusqu’aux organes.' },
    },

    manipulation: {
      image: { dessin: 'barres', barres: [{ nom: 'Paroi lisse', parts: 1 }, { nom: 'Paroi plissée', parts: 6 }], description: 'Deux barres : une paroi lisse a une petite surface ; une paroi plissée, couverte de replis, a une surface bien plus grande.' },
      etapes: [
        'Les nutriments sont de toutes petites molécules : elles peuvent traverser la paroi de l’intestin grêle.',
        'La paroi est pleine de replis, couverte de petits doigts : cela donne une très grande surface d’échange.',
        'Juste derrière la paroi, il y a de nombreux petits vaisseaux sanguins : les nutriments passent dans le sang.',
        'Les grosses molécules non découpées, comme les fibres, ne passent pas : elles continuent vers le gros intestin.',
      ],
    },

    decouverte: {
      texte: (c) => 'Les nutriments traversent la paroi de l’intestin grêle et passent dans le sang : c’est ' + c.mot('absorption') + '. ' +
        'Il se fait grâce à une paroi fine, très plissée, au contact de nombreux vaisseaux sanguins. ' +
        'L’astuce : seules les petites molécules passent. Ce qui n’est pas digéré ne passe pas.',
    },

    vocabulaire: {
      termes: {
        absorption: { sesMots: 'le grand passage', officiel: 'l’absorption intestinale', lesDeux: 'le grand passage, que les scientifiques appellent l’absorption intestinale' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le grand passage, quand les nutriments traversent la paroi de l’intestin pour aller dans le sang. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : l’absorption intestinale. Les petits doigts de la paroi s’appellent des villosités ; ils augmentent la surface d’échange.',
        'Tu connais les mots officiels : l’absorption intestinale fait passer les nutriments dans le sang, à travers les villosités de l’intestin grêle.',
      ],
    },

    exercices: [
      {
        id: 'passe-ou-pas',
        univers: 'cuisine-restaurant',
        versions: [['le glucose', PASSE], ['un acide aminé', PASSE], ['l’amidon non digéré', NON], ['une fibre des légumes', NON], ['une molécule d’eau', PASSE]],
        genere(c) {
          const [corps, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans l’intestin grêle, ' + corps + (/^une /.test(corps) ? ' peut-elle' : ' peut-il') + ' traverser la paroi pour aller dans le sang ?',
            reponse: O.choix(c.alea, bonne, [PASSE, NON]),
            aide: 'Seules les petites molécules traversent la paroi.',
            correction: [(bonne === PASSE ? 'Petite molécule : elle traverse.' : 'Trop grosse : elle ne traverse pas.'), 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'ou',
        univers: 'famille',
        versions: [['Où se fait surtout l’absorption des nutriments ?', 'Dans l’intestin grêle'], ['Où vont les nutriments après avoir traversé la paroi ?', 'Dans le sang'], ['Où va ce qui n’a pas été absorbé ?', 'Dans le gros intestin']],
        genere(c) {
          const [q, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: q,
            reponse: O.choix(c.alea, bonne, ['Dans l’intestin grêle', 'Dans le sang', 'Dans le gros intestin', 'Dans l’estomac'].filter((x) => x !== bonne).slice(0, 2)),
            aide: 'Intestin grêle, puis sang ; le reste continue.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'replis',
        univers: 'famille',
        // [surface lisse en cm², multiplicateur dû aux replis]
        versions: [[20, 30], [10, 50], [25, 40], [15, 20], [50, 30], [12, 25]],
        genere(c) {
          const [s, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur un modèle, un morceau de paroi lisse a une surface de ' + s + ' cm². Avec ses replis, sa surface est ' + k + ' fois plus grande. Quelle est sa surface avec les replis, en cm² ?',
            reponse: { type: 'nombre', valeur: s * k },
            aide: 'Calcule ' + s + ' × ' + k + '.',
            aideParlee: 'Multiplie la surface lisse par le nombre de fois.',
            correction: [s + ' × ' + k + ' = ' + s * k + ' cm².'],
          };
        },
      },
      {
        id: 'glucose-du-sang',
        univers: 'cuisine-restaurant',
        // [glucose dans le sang avant le repas, une heure après, en g par litre]
        versions: [[0.9, 1.4], [0.85, 1.3], [0.95, 1.45], [0.8, 1.2], [0.9, 1.35], [1, 1.4]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          const d = r2(b - a);
          return {
            enonce: 'Avant le repas, le sang de Rachel contient ' + ecr(a) + ' g de glucose par litre. Une heure après, ' + ecr(b) + ' g par litre. De combien a-t-il augmenté ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Calcule ' + ecr(b) + ' − ' + ecr(a) + '.',
            aideParlee: 'Fais la différence entre après et avant le repas.',
            correction: [ecr(b) + ' − ' + ecr(a) + ' = ' + ecr(d) + ' g par litre : le glucose du repas est passé dans le sang.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'famille',
        versions: [['La paroi de l’intestin grêle est très plissée.', true], ['L’amidon traverse la paroi sans être digéré.', false], ['Les nutriments passent dans le sang.', true], ['L’absorption se fait surtout dans la bouche.', false]],
        genere(c) {
          const [phrase, vrai] = c.alea.choisir(this.versions);
          const bonne = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Moussa affirme : « ' + phrase + ' » Vrai ou faux ?',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Petites molécules, intestin grêle, paroi plissée, sang.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // glucose dans le sang (g/L) à 0, 1, 2 et 3 heures après le repas
      versions: [[0.9, 1.4, 1.1, 0.9], [0.85, 1.3, 1, 0.9], [0.95, 1.45, 1.15, 0.95], [0.8, 1.25, 1, 0.85], [0.9, 1.35, 1.05, 0.9], [1, 1.4, 1.1, 1]],
      genere(c) {
        const v = c.alea.choisir(this.versions);
        const max = Math.max(...v);
        return {
          enonce: 'Rebecca mesure le glucose de son sang, en grammes par litre, juste avant le repas puis chaque heure : ' + v.map(ecr).join(' ; ') + '.',
          image: { dessin: 'courbe', points: v.map((y, i) => [i, y]), axeX: 'heures après le repas', axeY: 'glucose, g par litre', description: 'Une courbe du glucose dans le sang : il monte après le repas, puis redescend.' },
          questions: [
            {
              texte: 'Question 1. Quelle est la valeur la plus haute, en grammes par litre ?',
              reponse: { type: 'nombre', valeur: max },
              aide: 'Cherche le plus grand nombre.',
              correction: ['La valeur la plus haute est ' + ecr(max) + ' g par litre.'],
            },
            {
              texte: 'Question 2. De combien le glucose a-t-il augmenté, au plus, par rapport à avant le repas ?',
              reponse: { type: 'nombre', valeur: r2(max - v[0]) },
              aide: 'La plus haute valeur moins la valeur avant le repas.',
              correction: [ecr(max) + ' − ' + ecr(v[0]) + ' = ' + ecr(r2(max - v[0])) + ' g par litre.'],
            },
            {
              texte: 'Question 3. Explique pourquoi le glucose du sang augmente après le repas.',
              correction: ['L’amidon du repas est digéré en glucose dans l’intestin grêle.', 'Le glucose traverse la paroi de l’intestin grêle et passe dans le sang : c’est l’absorption.'],
              grille: ['As-tu parlé de la digestion de l’amidon en glucose ?', 'As-tu dit que le glucose passe dans le sang à travers l’intestin grêle ?', 'As-tu employé le mot « absorption » ou une phrase qui l’explique ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais comment le repas passe dans le sang : par la grande paroi plissée de l’intestin grêle.',
    carte: ['passe-ou-pas', 'ou', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['replis', 'glucose-du-sang'], defi: true },
    automatismes: [
      {
        id: 'passe-rapide',
        versions: [['le glucose', PASSE], ['une fibre', NON], ['une molécule d’eau', PASSE]],
        genere(c) { const [x, b] = c.alea.choisir(this.versions); return { enonce: x.charAt(0).toUpperCase() + x.slice(1) + (/^une /.test(x) ? ' passe-t-elle' : ' passe-t-il') + ' dans le sang ?', reponse: O.choix(c.alea, b, [PASSE, NON]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, on ajoute de l’iode au sel de cuisine : l’intestin absorbe cet iode, puis le sang le porte jusqu’à la glande thyroïde.',
    prenoms: ['Aminata', 'Rachel', 'Moussa', 'Rebecca'],
  };
});
