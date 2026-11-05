/* Notion 1 du bloc physique-chimie « La matière » : les trois états de la matière et les particules. Le thé de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const S = 'Solide', L = 'Liquide', G = 'Gaz';
  const ETATS = [S, L, G];

  return {
    id: 'etats-matiere',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Les trois états de la matière et les particules',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'maison-courses', 'dehors'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière ».',

    accroche: {
      texte: 'Laure prépare un thé glacé pour Rachel. Dans le verre, il y a des glaçons, du thé, et au-dessus, l’air de la cuisine. ' +
        'Le glaçon garde sa forme. Le thé prend la forme du verre. L’air, lui, remplit toute la pièce. ' +
        'Trois façons d’être pour la matière ! Qu’est-ce qui les rend si différentes ?',
      image: { dessin: 'particules', etat: 'liquide', description: 'Un récipient où des particules, serrées mais en désordre, forment un liquide au fond.' },
    },

    manipulation: {
      image: { dessin: 'particules', etat: 'solide', description: 'Les particules d’un solide : rangées en lignes, serrées les unes contre les autres.' },
      etapes: [
        'Un solide, comme le glaçon, a sa propre forme. Ses grains minuscules sont serrés et bien rangés : ils ne font que vibrer sur place.',
        'Un liquide, comme le thé, prend la forme du récipient, et sa surface est plane et horizontale. Ses grains sont serrés, mais en désordre : ils glissent les uns sur les autres.',
        'Un gaz, comme l’air, occupe tout l’espace qu’on lui donne. Ses grains sont très éloignés et bougent dans tous les sens.',
        'C’est pour ça qu’on peut serrer un gaz dans une seringue bouchée, mais pas un liquide : entre les grains d’un gaz, il y a beaucoup de vide.',
      ],
    },

    decouverte: {
      texte: (c) => 'Toute la matière est faite de ' + c.mot('particules') + '. On ne peut pas les voir, même à la loupe. ' +
        'C’est leur façon d’être rangés qui fait l’état : rangés et serrés dans un solide, serrés en désordre dans un liquide, éloignés dans un gaz. ' +
        'L’astuce : un gaz se comprime, un liquide et un solide presque pas.',
      image: { dessin: 'particules', etat: 'gaz', description: 'Les particules d’un gaz : peu nombreuses dans le récipient, très éloignées les unes des autres.' },
    },

    vocabulaire: {
      termes: {
        particules: { sesMots: 'grains minuscules', officiel: 'particules', lesDeux: 'grains minuscules, que les scientifiques appellent des particules' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la matière est faite de grains minuscules. Leur rangement fait la différence entre le glaçon, le thé et l’air. ' +
          'Les scientifiques ont un mot pour ces grains : je te le dirai la prochaine fois.',
        'Les scientifiques disent : des particules. Nos grains minuscules, ce sont des particules. Pour l’eau, chaque particule est une molécule d’eau.',
        'Tu connais le mot officiel : la matière est faite de particules. Leur rangement donne l’état : solide, liquide ou gaz.',
      ],
    },

    exercices: [
      {
        id: 'quel-etat',
        univers: 'cuisine-restaurant',
        versions: [['le beurre sorti du frigo', S], ['l’huile dans la bouteille', L], ['l’air enfermé dans un ballon', G], ['le lait dans la casserole froide', L],
          ['un glaçon', S], ['le gaz de la gazinière, avant qu’on l’allume', G], ['le sel dans la salière', S], ['le jus de bissap dans la carafe', L]],
        genere(c) {
          const [objet, etat] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans quel état est ' + objet + ' ?',
            reponse: O.choix(c.alea, etat, ETATS),
            aide: 'Garde-t-il sa forme ? Prend-il la forme du récipient ? Remplit-il tout l’espace ?',
            correction: [etat === S ? 'Il garde sa propre forme.' : etat === L ? 'Il prend la forme du récipient, avec une surface plane.' : 'Il occupe tout l’espace qu’on lui donne.', 'Réponse : ' + etat + '.'],
          };
        },
      },
      {
        id: 'propriete',
        univers: 'maison-courses',
        versions: [['Il a sa propre forme, même posé sur la table.', S], ['Il prend la forme du récipient, et sa surface reste plane et horizontale.', L],
          ['Il occupe tout le volume qu’on lui offre.', G], ['On peut le comprimer facilement dans une seringue bouchée.', G], ['On peut le saisir avec une pince, il ne coule pas.', S], ['Il coule, et on peut le verser d’un verre à l’autre.', L]],
        genere(c) {
          const [phrase, etat] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rebecca décrit un corps : « ' + phrase + ' » De quel état parle-t-elle ?',
            reponse: O.choix(c.alea, etat, ETATS),
            aide: 'Solide : forme propre. Liquide : forme du récipient. Gaz : tout l’espace.',
            correction: ['Réponse : ' + etat + '.'],
          };
        },
      },
      {
        id: 'particules',
        univers: 'dehors',
        versions: [['Les particules sont rangées en lignes, serrées les unes contre les autres.', S], ['Les particules sont serrées, mais en désordre : elles glissent les unes sur les autres.', L],
          ['Les particules sont très éloignées les unes des autres et bougent dans tous les sens.', G]],
        genere(c) {
          const [phrase, etat] = c.alea.choisir(this.versions);
          return {
            enonce: 'À quel état correspond ce modèle ? « ' + phrase + ' »',
            reponse: O.choix(c.alea, etat, ETATS),
            aide: 'Pense au glaçon, au thé et à l’air.',
            correction: ['Réponse : ' + etat + '.'],
          };
        },
      },
      {
        id: 'seringue',
        univers: 'maison-courses',
        // [volume de départ, volume final] en millilitres
        versions: [[60, 20], [50, 10], [40, 20], [90, 30], [80, 20], [60, 15], [100, 25], [30, 10]],
        genere(c) {
          const [v1, v2] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa bouche une seringue qui contient ' + v1 + ' mL d’air, puis il pousse le piston jusqu’à ' + v2 + ' mL. Le volume de l’air a été divisé par combien ?',
            reponse: { type: 'nombre', valeur: v1 / v2 },
            aide: 'Calcule ' + v1 + ' ÷ ' + v2 + '.',
            aideParlee: 'Divise le volume de départ par le volume final.',
            correction: [v1 + ' ÷ ' + v2 + ' = ' + v1 / v2 + '.', 'L’air a été comprimé : ses particules se sont rapprochées. Réponse : ' + v1 / v2 + '.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'cuisine-restaurant',
        versions: [['Un liquide se comprime facilement.', false, 'Les particules d’un liquide sont déjà serrées : on ne peut presque pas le comprimer.'],
          ['Dans un gaz, les particules sont très éloignées les unes des autres.', true, 'Il y a beaucoup de vide entre elles.'],
          ['Le sable coule : c’est donc un liquide.', false, 'Chaque grain de sable est un solide ; c’est le tas qui coule.'],
          ['Dans un solide, les particules sont rangées et serrées.', true, 'C’est pour cela qu’il garde sa forme.'],
          ['L’air n’a pas de masse.', false, 'L’air a une masse : un ballon gonflé est un peu plus lourd qu’un ballon vide.']],
        genere(c) {
          const [phrase, vrai, pourquoi] = c.alea.choisir(this.versions);
          const bonne = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Aminata affirme : « ' + phrase + ' » Vrai ou faux ?',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Pense à la façon dont les particules sont rangées.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [volume d'air dans la seringue, volume après compression]
      versions: [[60, 20], [80, 40], [90, 30], [100, 20], [50, 25], [120, 40]],
      genere(c) {
        const [v1, v2] = c.alea.choisir(this.versions);
        return {
          enonce: 'Au collège, Rachel enferme de l’air dans une seringue bouchée : ' + v1 + ' mL. Elle pousse le piston jusqu’à ' + v2 + ' mL. ' +
            'Puis elle recommence avec de l’eau : le piston ne bouge presque pas.',
          image: { dessin: 'particules', etat: 'gaz', description: 'Les particules de l’air dans la seringue : très éloignées les unes des autres.' },
          questions: [
            {
              texte: 'Question 1. Dans quel état est l’air de la seringue ?',
              reponse: O.choix(c.alea, G, ETATS),
              aide: 'L’air occupe tout l’espace qu’on lui donne.',
              correction: ['L’air est un gaz. Réponse : ' + G + '.'],
            },
            {
              texte: 'Question 2. Le volume de l’air a été divisé par combien ?',
              reponse: { type: 'nombre', valeur: v1 / v2 },
              aide: 'Divise le volume de départ par le volume final.',
              correction: [v1 + ' ÷ ' + v2 + ' = ' + v1 / v2 + '.'],
            },
            {
              texte: 'Question 3. Explique, avec les particules, pourquoi on peut comprimer l’air mais presque pas l’eau.',
              correction: ['Dans un gaz, les particules sont très éloignées : en poussant, on les rapproche.', 'Dans un liquide, les particules sont déjà serrées : on ne peut presque pas les rapprocher.'],
              grille: ['As-tu parlé des particules de l’air, éloignées les unes des autres ?', 'As-tu parlé des particules de l’eau, déjà serrées ?', 'As-tu fait une phrase de conclusion ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le glaçon, le thé et l’air n’ont plus de secret : tu sais voir leurs particules en pensée.',
    carte: ['quel-etat', 'propriete', 'particules'],
    papierDuSoir: { exercices: ['seringue', 'vrai-ou-faux'], defi: true },
    automatismes: [
      {
        id: 'etat-rapide',
        versions: [['l’eau du robinet', L], ['un caillou', S], ['la vapeur d’eau invisible de l’air', G], ['le miel', L]],
        genere(c) { const [o, e] = c.alea.choisir(this.versions); return { enonce: 'État ' + o.replace(/^le /, 'du ').replace(/^un /, 'd’un ').replace(/^(l’|la )/, 'de $1') + ' ?', reponse: O.choix(c.alea, e, ETATS) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le Kilimandjaro, en Tanzanie, porte encore de la glace à son sommet, tout près de l’équateur.',
    prenoms: ['Laure', 'Rachel', 'Rebecca', 'Moussa', 'Aminata'],
  };
});
