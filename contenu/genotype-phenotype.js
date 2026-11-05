/* Notion 14 du bloc SVT « Le vivant et son évolution » : génotype, phénotype et environnement. Les deux boutures d'Esther.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const GENO = 'Le génotype', PHENO = 'Le phénotype';
  const GENES = 'Les gènes seuls', ENV = 'L’environnement seul', LES2 = 'Les gènes et l’environnement';

  return {
    id: 'genotype-phenotype',
    matiere: 'svt',
    bloc: 'vivant-evolution',
    titre: 'Génotype, phénotype et environnement',
    classe: '3e',
    univers: ['champetre', 'famille', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le vivant et son évolution » : relation entre génotype, phénotype et environnement.',

    accroche: {
      texte: 'Esther plante deux boutures de la même tige de manioc. L’une pousse en pleine terre, au soleil. L’autre dans un petit pot, à l’ombre. Trois mois plus tard, la première est bien plus grande. ' +
        'Pourtant, elles ont exactement les mêmes gènes. Alors, qu’est-ce qui décide ?',
      image: { dessin: 'barres', barres: [{ nom: 'Au soleil', parts: 8 }, { nom: 'À l’ombre', parts: 3 }], description: 'Deux barres : la bouture au soleil a beaucoup plus poussé que la bouture à l’ombre, alors qu’elles ont les mêmes gènes.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Ce qui est écrit dans les gènes', 'L’environnement agit', 'Ce que l’on observe'], description: 'Ce qui est écrit dans les gènes, plus ce que fait l’environnement, donne ce que l’on observe.' },
      etapes: [
        'Il y a ce qui est écrit dans l’ADN : l’ensemble des allèles d’un individu.',
        'Et il y a ce que l’on observe : la taille, la couleur, la force.',
        'Ce que l’on observe dépend des gènes, mais aussi du milieu : la nourriture, le soleil, l’entraînement.',
        'Quand tu restes au soleil, ta peau fonce un peu : tes gènes n’ont pas changé. Et cela ne passera pas à tes enfants.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ce qui est écrit dans tes allèles, c’est ' + c.mot('genotype') + '. Ce qu’on observe chez toi, c’est ' + c.mot('phenotype') + '. ' +
        'Ce qu’on observe dépend des allèles et de l’environnement. ' +
        'L’astuce : les gènes donnent des possibilités, le milieu aide à les réaliser.',
    },

    vocabulaire: {
      termes: {
        genotype: { sesMots: 'ton texte caché', officiel: 'ton génotype', lesDeux: 'ton texte caché, que les scientifiques appellent le génotype' },
        phenotype: { sesMots: 'ton apparence', officiel: 'ton phénotype', lesDeux: 'ton apparence, que les scientifiques appellent le phénotype' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le texte caché, et l’apparence. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le génotype, pour le texte caché. Le phénotype, pour ce que l’on observe. Le phénotype dépend du génotype et de l’environnement.',
        'Tu connais les mots officiels : le génotype, le phénotype et l’environnement.',
      ],
    },

    exercices: [
      O.qcm('geno-ou-pheno', 'famille',
        [['La couleur que l’on voit sur une fleur', PHENO], ['Les deux allèles portés par une plante', GENO], ['La taille d’une plante adulte', PHENO], ['La liste des allèles écrits dans l’ADN', GENO]].map((v) => [v[0], v[1], 'Le phénotype, c’est ce que l’on observe. Le génotype, c’est ce qui est écrit dans l’ADN.']),
        (x) => x + ' : de quoi s’agit-il ?', [GENO, PHENO],
        'Ce que l’on observe, ou ce qui est écrit dans l’ADN ?'),
      O.qcm('qui-decide', 'dehors',
        [['Deux boutures identiques, au soleil et à l’ombre, ont des tailles différentes.', ENV], ['Une plante à deux allèles blancs a une fleur blanche, partout où elle pousse.', GENES], ['La taille d’un adulte dépend de ses allèles et de son alimentation.', LES2]].map((v) => [v[0], v[1], 'Mêmes gènes et tailles différentes : c’est le milieu. Deux allèles blancs donnent du blanc partout : ce sont les gènes. La taille adulte dépend des deux.']),
        (x) => x + ' Qu’est-ce qui explique cela ?', [GENES, ENV, LES2],
        'Si les gènes sont les mêmes, cherche du côté du milieu.'),
      O.qcm('se-transmet', 'famille',
        [['Une peau bronzée par le soleil', 'Non, les gènes n’ont pas changé'], ['Des muscles obtenus par l’entraînement', 'Non, les gènes n’ont pas changé'], ['La couleur de fleur portée par des allèles', 'Oui, elle est portée par les gènes']].map((v) => [v[0], v[1], 'Ce qui vient du milieu ne change pas les gènes : cela ne passe pas aux descendants. Ce qui est porté par les allèles peut y passer.']),
        (x) => x + ' : cela peut-il passer aux descendants ?', ['Oui, elle est portée par les gènes', 'Non, les gènes n’ont pas changé'],
        'Seul ce qui est écrit dans les gamètes peut passer aux descendants.'),
      {
        id: 'ecart-de-taille',
        univers: 'champetre',
        // [taille au soleil, taille à l'ombre, en cm]
        versions: [[120, 80], [150, 90], [100, 65], [140, 75], [90, 45], [110, 70]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Deux boutures du même pied mesurent ' + a + ' cm au soleil et ' + b + ' cm à l’ombre. Quel est l’écart entre elles, en centimètres ?',
            reponse: { type: 'nombre', valeur: a - b },
            aide: 'Calcule ' + a + ' − ' + b + '.',
            aideParlee: 'Fais la différence entre les deux tailles.',
            correction: [a + ' − ' + b + ' = ' + (a - b) + ' cm.'],
          };
        },
      },
      {
        id: 'moyenne-des-pieds',
        univers: 'champetre',
        // tailles de trois pieds, en cm
        versions: [[90, 100, 110], [120, 130, 140], [70, 80, 90], [60, 90, 120], [100, 110, 150], [80, 85, 90]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const m = (a + b + d) / 3;
          return {
            enonce: 'Dans un même sol, trois pieds de la même variété mesurent ' + a + ' cm, ' + b + ' cm et ' + d + ' cm. Quelle est leur taille moyenne, en centimètres ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Additionne les trois tailles, puis divise par 3.',
            aideParlee: 'Additionne les trois tailles, puis divise par trois.',
            correction: [a + ' + ' + b + ' + ' + d + ' = ' + (a + b + d) + '.', (a + b + d) + ' ÷ 3 = ' + m + ' cm.'],
          };
        },
      },
    ],

    defi: {
      // [taille au soleil, taille à l'ombre, autre variété au soleil, en cm]
      versions: [[120, 60, 80], [140, 70, 100], [100, 50, 70], [160, 80, 90]],
      genere(c) {
        const [a, b, v] = c.alea.choisir(this.versions);
        return {
          enonce: 'Expérience : on plante des boutures. Les boutures de la variété 1 sont toutes issues du même pied. Au soleil, elles mesurent ' + a + ' cm. À l’ombre, elles mesurent ' + b + ' cm. Les boutures de la variété 2, au même soleil, mesurent ' + v + ' cm.',
          image: { dessin: 'barres', barres: [{ nom: 'V1, soleil', parts: a / 10 }, { nom: 'V1, ombre', parts: b / 10 }, { nom: 'V2, soleil', parts: v / 10 }], description: 'Trois barres, chaque part vaut dix centimètres : la variété 1 au soleil, la variété 1 à l’ombre, la variété 2 au soleil.' },
          questions: [
            {
              texte: 'Question 1. Combien de fois la variété 1 est-elle plus grande au soleil qu’à l’ombre ?',
              reponse: { type: 'nombre', valeur: a / b },
              aide: 'Divise la taille au soleil par la taille à l’ombre.',
              correction: [a + ' ÷ ' + b + ' = ' + a / b + ' fois plus grande.'],
            },
            {
              texte: 'Question 2. Au soleil, de combien de centimètres la variété 1 dépasse-t-elle la variété 2 ?',
              reponse: { type: 'nombre', valeur: a - v },
              aide: 'Fais la différence entre les deux variétés, au soleil.',
              correction: [a + ' − ' + v + ' = ' + (a - v) + ' cm.'],
            },
            {
              texte: 'Question 3. À partir de ces deux comparaisons, explique ce qui détermine la taille de la plante.',
              correction: ['Même génotype, milieu différent : la taille change. L’environnement agit donc.', 'Même milieu, génotype différent : la taille change aussi. Le génotype agit donc.', 'Le phénotype dépend à la fois du génotype et de l’environnement.'],
              grille: ['As-tu comparé les deux milieux pour la variété 1 ?', 'As-tu comparé les deux variétés au soleil ?', 'As-tu conclu avec le génotype et l’environnement ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le texte caché, plus le milieu, donnent ce qu’on observe. Tu sais ce qui fait de toi ce que tu es.',
    carte: ['geno-ou-pheno', 'qui-decide', 'se-transmet'],
    papierDuSoir: { exercices: ['ecart-de-taille', 'moyenne-des-pieds'], defi: true },
    automatismes: [
      {
        id: 'moyenne-rapide',
        versions: [[10, 20, 30], [20, 30, 40], [10, 10, 40], [30, 30, 30]],
        genere(c) { const [a, b, d] = c.alea.choisir(this.versions); return { enonce: 'Moyenne de ' + a + ', ' + b + ' et ' + d + ' = ?', reponse: { type: 'nombre', valeur: (a + b + d) / 3 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Thaïlande, les enfants moken voient plus de deux fois mieux sous l’eau. Des enfants européens entraînés y parviennent aussi.',
    prenoms: ['Esther'],
  };
});
