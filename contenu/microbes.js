/* Notion 11 du bloc SVT « Le corps humain et la santé » : les microbes et le microbiote. Le lait laissé au soleil.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const BAC = 'Une bactérie', VIR = 'Un virus', CHA = 'Un champignon microscopique';

  return {
    id: 'microbes',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Les microbes et le microbiote',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'famille', 'maison-courses'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : micro-organismes, microbiote.',

    accroche: {
      texte: 'Moussa a oublié une bouteille de lait sur la table, au soleil, tout l’après-midi. Le soir, le lait a tourné : il sent mauvais. ' +
        'Pourtant, le matin, le même lait était bon. D’où viennent ces êtres vivants invisibles qui l’ont gâché, et comment se multiplient-ils si vite ?',
      image: { dessin: 'doublement', generations: 4, branches: 2, description: 'Un arbre : une cellule se divise en deux, puis quatre, huit, seize. Chaque génération double le nombre.' },
    },

    manipulation: {
      image: { dessin: 'doublement', generations: 5, branches: 2, description: 'Cinq générations de divisions : une, deux, quatre, huit, seize, trente-deux cellules.' },
      etapes: [
        'Il existe des êtres vivants si petits qu’on ne les voit qu’au microscope : bactéries, champignons microscopiques, et virus, encore plus petits.',
        'Au chaud, une bactérie peut se couper en deux en une vingtaine de minutes. Puis chacune recommence.',
        'Une, deux, quatre, huit… En quelques heures, il y en a des millions : c’est ce qui a gâché le lait.',
        'Tous ne sont pas dangereux : notre intestin abrite des milliards de bactéries utiles, qui aident la digestion et nous protègent.',
      ],
    },

    decouverte: {
      texte: (c) => 'Les bactéries, les champignons minuscules et les virus sont ' + c.mot('microbes') + '. Certains rendent malades ; beaucoup sont inoffensifs, ou même utiles. ' +
        'Les bactéries de notre intestin forment un ensemble utile, qu’il faut protéger. ' +
        'L’astuce : quand une bactérie se divise, le nombre double à chaque génération. C’est une puissance de deux.',
    },

    vocabulaire: {
      termes: {
        microbes: { sesMots: 'des petits êtres invisibles', officiel: 'des micro-organismes', lesDeux: 'des petits êtres invisibles, que les scientifiques appellent des micro-organismes' },
      },
      textes: [
        'Pour l’instant, garde tes mots : des petits êtres invisibles, dont certains rendent malades et d’autres nous aident. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : des micro-organismes, qu’on appelle aussi des microbes. L’ensemble des bactéries utiles de notre intestin s’appelle le microbiote.',
        'Tu connais les mots officiels : les micro-organismes, bactéries, champignons et virus ; le microbiote intestinal est utile à notre santé.',
      ],
    },

    exercices: [
      {
        id: 'doublement',
        univers: 'cuisine-restaurant',
        // durée en minutes ; une division toutes les 20 minutes
        versions: [20, 40, 60, 80, 100, 120, 160, 200],
        genere(c) {
          const t = c.alea.choisir(this.versions);
          const g = t / 20;
          return {
            enonce: 'Une bactérie se divise en deux toutes les 20 minutes. Au départ, il y en a une seule dans le lait. Combien y en a-t-il au bout de ' + t + ' minutes ?',
            reponse: { type: 'nombre', valeur: 2 ** g },
            aide: 'En ' + t + ' minutes, il y a ' + O.nb(g, 'division') + '. Calcule 2 puissance ' + g + '.',
            aideParlee: 'Compte combien de fois vingt minutes tient dans la durée, puis multiplie par deux autant de fois.',
            correction: [t + ' ÷ 20 = ' + O.nb(g, 'division') + '.', '2 puissance ' + g + ' = ' + 2 ** g + ' bactéries.'],
          };
        },
      },
      {
        id: 'generations',
        univers: 'famille',
        versions: [[20, 60], [20, 100], [30, 90], [30, 180], [20, 140], [15, 60]],
        genere(c) {
          const [p, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une bactérie se divise toutes les ' + p + ' minutes. Combien de fois se divise-t-elle en ' + t + ' minutes ?',
            reponse: { type: 'nombre', valeur: t / p },
            aide: 'Calcule ' + t + ' ÷ ' + p + '.',
            aideParlee: 'Divise la durée totale par le temps entre deux divisions.',
            correction: [t + ' ÷ ' + p + ' = ' + t / p + ' divisions.'],
          };
        },
      },
      {
        id: 'quel-microbe',
        univers: 'maison-courses',
        versions: [['Il est encore plus petit qu’une bactérie, et ne se multiplie qu’à l’intérieur d’une cellule.', VIR], ['C’est une cellule qui se coupe en deux pour se multiplier.', BAC], ['Il peut former de la moisissure sur le pain.', CHA]],
        genere(c) {
          const [desc, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'De quel micro-organisme s’agit-il ? « ' + desc + ' »',
            reponse: O.choix(c.alea, bonne, [BAC, VIR, CHA]),
            aide: 'Virus : le plus petit, dans les cellules. Bactérie : se coupe en deux. Champignon : moisissure.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'famille',
        versions: [['Tous les microbes rendent malades.', false, 'Beaucoup sont inoffensifs, ou même utiles.'], ['Notre intestin abrite des bactéries utiles.', true, 'C’est le microbiote intestinal.'], ['Les bactéries se multiplient plus vite au chaud qu’au réfrigérateur.', true, 'Le froid ralentit leur multiplication.'], ['Un virus est plus gros qu’une bactérie.', false, 'Un virus est bien plus petit.']],
        genere(c) {
          const [phrase, vrai, pourquoi] = c.alea.choisir(this.versions);
          const bonne = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Vrai ou faux ? « ' + phrase + ' »',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Pense au microbiote, à la taille et à la chaleur.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'frigo',
        univers: 'cuisine-restaurant',
        versions: [['au réfrigérateur', 'Plus lentement'], ['au soleil, sur la table', 'Plus vite'], ['dans une cuisine très chaude', 'Plus vite'], ['au congélateur', 'Plus lentement']],
        genere(c) {
          const [ou, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Laure, la maman de Rachel, range du lait ' + ou + '. Les bactéries s’y multiplient-elles plus vite ou plus lentement qu’à température ambiante ?',
            reponse: O.choix(c.alea, bonne, ['Plus vite', 'Plus lentement']),
            aide: 'Le chaud accélère la multiplication ; le froid la ralentit.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // durée en minutes, une division toutes les 20 minutes
      versions: [60, 80, 100, 120, 140, 160],
      genere(c) {
        const t = c.alea.choisir(this.versions);
        const g = t / 20;
        return {
          enonce: 'Dans un plat laissé au chaud, une seule bactérie arrive. Elle se divise en deux toutes les 20 minutes, et chaque nouvelle bactérie fait de même. Aminata revient ' + t + ' minutes plus tard.',
          image: { dessin: 'doublement', generations: Math.min(5, g), branches: 2, description: 'Un arbre de divisions : le nombre de bactéries double à chaque génération.' },
          questions: [
            {
              texte: 'Question 1. Combien de divisions ont eu lieu ?',
              reponse: { type: 'nombre', valeur: g },
              aide: 'Divise la durée par 20 minutes.',
              correction: [t + ' ÷ 20 = ' + O.nb(g, 'division') + '.'],
            },
            {
              texte: 'Question 2. Combien y a-t-il de bactéries quand elle revient ?',
              reponse: { type: 'nombre', valeur: 2 ** g },
              aide: 'Le nombre double à chaque division : 2 puissance le nombre de divisions.',
              correction: ['2 puissance ' + g + ' = ' + 2 ** g + ' bactéries.'],
            },
            {
              texte: 'Question 3. Explique pourquoi il faut ranger les restes de repas au réfrigérateur.',
              correction: ['Au chaud, les bactéries se multiplient très vite : leur nombre double à chaque génération.', 'Le froid du réfrigérateur ralentit leur multiplication : les aliments restent bons plus longtemps.'],
              grille: ['As-tu dit que les bactéries se multiplient vite au chaud ?', 'As-tu dit que le froid ralentit leur multiplication ?', 'As-tu fait une phrase de conclusion ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu connais le monde invisible des microbes, et tu sais que certains sont nos alliés.',
    carte: ['doublement', 'quel-microbe', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['doublement', 'generations'], defi: true },
    automatismes: [
      {
        id: 'puissance-de-deux',
        versions: [2, 3, 4, 5, 6],
        genere(c) { const g = c.alea.choisir(this.versions); return { enonce: 'Une bactérie, ' + O.nb(g, 'division') + ' : combien de bactéries ?', reponse: { type: 'nombre', valeur: 2 ** g } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Antoni van Leeuwenhoek, aux Pays-Bas, a été l’un des premiers à observer des bactéries au microscope.',
    prenoms: ['Moussa', 'Laure', 'Aminata'],
  };
});
