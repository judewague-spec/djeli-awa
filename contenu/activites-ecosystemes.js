/* Notion 4 du bloc SVT « Planète Terre, environnement, action humaine » : activités et écosystèmes. La mare de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const MIL = 'Un élément du milieu', VIV = 'Un être vivant';
  const POLL = 'L’eau est polluée', PERTE = 'Les animaux perdent leur milieu de vie', RICHE = 'Le sol devient plus riche';

  return {
    id: 'activites-ecosystemes',
    matiere: 'svt',
    bloc: 'planete-terre',
    titre: 'Activités et écosystèmes',
    classe: 'cycle 4',
    univers: ['champetre', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « La planète Terre, l’environnement et l’action humaine » : impacts de l’activité humaine sur les écosystèmes, et solutions.',

    accroche: {
      texte: 'Moussa pêche dans la mare du village. Depuis des mois, il y trouve moins de poissons. Rachel remarque que l’eau est devenue verte. ' +
        'Le champ voisin reçoit beaucoup d’engrais, et la pluie en emporte une partie jusqu’à la mare. Dans la nature, tout se tient.',
      image: { dessin: 'programme', lignes: ['Une mare', '  Le milieu : eau, lumière, température', '  Les êtres vivants : plantes, insectes, poissons'], description: 'Une mare se compose de deux choses : le milieu, avec l’eau, la lumière et la température, et les êtres vivants, avec les plantes, les insectes et les poissons.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Engrais sur le champ', 'La pluie les emporte dans la mare', 'Les algues se multiplient', 'Le dioxygène manque aux poissons'], description: 'Quatre étapes : des engrais sont répandus sur le champ, la pluie les emporte dans la mare, les algues se multiplient, puis le dioxygène manque aux poissons.' },
      etapes: [
        'Imagine la mare de Moussa : de l’eau, des plantes, des insectes, des poissons, des oiseaux.',
        'Les êtres vivants dépendent les uns des autres, et de leur milieu : l’eau, la lumière, la température.',
        'Un champ voisin reçoit trop d’engrais. La pluie en emporte une partie jusqu’à la mare.',
        'Les algues se multiplient, puis meurent. Des microbes les décomposent et consomment le dioxygène : les poissons manquent d’air.',
        'En ville, le béton empêche l’eau de s’infiltrer, et les routes coupent le chemin des animaux.',
        'Quand on rase une forêt, on détruit le milieu de ses plantes et de ses animaux.',
        'Des solutions existent : moins d’engrais, des haies, des espaces verts en ville, des forêts protégées.',
      ],
    },

    decouverte: {
      texte: (c) => 'Toute activité humaine change son environnement. ' +
        'Regarde la mare du village, vue en entier : c’est ' + c.mot('ecosysteme') + '. ' +
        'Regarde les engrais qui arrivent dans l’eau : c’est ' + c.mot('pollution') + '. ' +
        'Regarde une forêt qui recule d’année en année : c’est ' + c.mot('deforestation') + '. ' +
        'L’astuce : touche à un maillon, et toute la chaîne bouge.',
    },

    vocabulaire: {
      termes: {
        ecosysteme: { sesMots: 'un milieu et tous les êtres vivants qui y vivent', officiel: 'un écosystème', lesDeux: 'un milieu et tous les êtres vivants qui y vivent, que les scientifiques appellent un écosystème' },
        pollution: { sesMots: 'une saleté qui abîme le milieu', officiel: 'une pollution', lesDeux: 'une saleté qui abîme le milieu, que les scientifiques appellent une pollution' },
        deforestation: { sesMots: 'la forêt rasée pour faire de la place', officiel: 'la déforestation', lesDeux: 'la forêt rasée pour faire de la place, que les scientifiques appellent la déforestation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un milieu avec ses vivants, une saleté qui abîme le milieu, et la forêt rasée pour faire de la place. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : un écosystème, pour un milieu et ses vivants. Une saleté qui abîme le milieu s’appelle une pollution. La forêt rasée s’appelle la déforestation.',
        'Tu connais les mots officiels : un écosystème, une pollution, et la déforestation. Tu sais aussi quelles solutions les limitent.',
      ],
    },

    exercices: [
      O.qcm('milieu-ou-vivant', 'champetre',
        [
          ['L’eau', MIL, 'L’eau fait partie du milieu : ce n’est pas un être vivant.'],
          ['Une libellule', VIV, 'Une libellule est un animal : c’est un être vivant.'],
          ['La lumière', MIL, 'La lumière fait partie du milieu : elle n’est pas vivante.'],
          ['Un nénuphar', VIV, 'Un nénuphar est une plante : c’est un être vivant.'],
          ['La température', MIL, 'La température est une caractéristique du milieu.'],
          ['Un têtard', VIV, 'Un têtard est un petit animal : c’est un être vivant.'],
        ],
        (x) => x + ' : dans une mare, est-ce un élément du milieu ou un être vivant ?', [MIL, VIV],
        'Un être vivant naît, grandit et meurt. Le milieu, c’est ce qui l’entoure.'),
      O.qcm('cause-effet', 'dehors',
        [
          ['Un agriculteur répand trop d’engrais, qui finissent dans la rivière.', POLL, 'Les engrais en trop sont une pollution : ils déséquilibrent l’eau et ses êtres vivants.'],
          ['On rase une forêt pour y planter un champ.', PERTE, 'Sans les arbres, les animaux de la forêt perdent leur abri et leur nourriture.'],
          ['Une usine rejette ses eaux sales dans la rivière.', POLL, 'Les eaux sales apportent des produits qui abîment le milieu : c’est une pollution.'],
          ['On défriche une vieille forêt pour construire des maisons.', PERTE, 'La forêt disparaît : les animaux qui y vivaient perdent leur milieu de vie.'],
          ['Des déchets en plastique sont jetés dans la mare.', POLL, 'Les déchets abîment le milieu et blessent les animaux : c’est une pollution.'],
          ['Une haie qui abritait des oiseaux et des insectes est arrachée.', PERTE, 'Sans la haie, oiseaux et insectes perdent leur abri.'],
        ],
        (x) => x + ' Quel est l’effet principal ?', [POLL, PERTE, RICHE],
        'Cherche si le milieu est abîmé par une saleté, ou s’il disparaît.'),
      O.qcm('vrai-ou-faux', 'champetre',
        [
          ['Dans un écosystème, les êtres vivants et le milieu s’influencent.', 'Vrai', 'Les vivants changent leur milieu, et le milieu agit sur les vivants.'],
          ['Un écosystème ne change jamais, même si on y ajoute une pollution.', 'Faux', 'Une pollution peut modifier le milieu, puis les êtres vivants qui y vivent.'],
          ['Les engrais en trop peuvent polluer une mare.', 'Vrai', 'Emportés par la pluie, ils font proliférer les algues et manquer le dioxygène.'],
          ['Les haies autour des champs abritent des animaux utiles.', 'Vrai', 'Oiseaux et insectes y trouvent un abri et de la nourriture.'],
          ['Raser une forêt n’a aucun effet sur les animaux qui y vivent.', 'Faux', 'Ils perdent leur abri et leur nourriture.'],
          ['Les espaces verts en ville peuvent aider les animaux et les plantes sauvages.', 'Vrai', 'Parcs et jardins offrent des abris et de la nourriture, et laissent l’eau s’infiltrer.'],
        ],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Les êtres vivants et leur milieu sont liés : si l’un change, l’autre change.'),
      {
        id: 'engrais',
        univers: 'champetre',
        // [kg d'engrais par hectare, hectares]
        versions: [[60, 4], [80, 5], [50, 6], [100, 3], [40, 8], [75, 4]],
        genere(c) {
          const [k, h] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un agriculteur répand ' + k + ' kg d’engrais par hectare sur ' + h + ' hectares. Combien de kilogrammes d’engrais utilise-t-il ?',
            reponse: { type: 'nombre', valeur: k * h },
            aide: 'Calcule ' + k + ' × ' + h + '.',
            aideParlee: 'Multiplie les kilogrammes d’un hectare par le nombre d’hectares.',
            correction: [k + ' × ' + h + ' = ' + k * h + ' kg.'],
          };
        },
      },
      {
        id: 'foret-rasee',
        univers: 'dehors',
        // [hectares de forêt, hectares rasés par an, années]
        versions: [[120, 10, 4], [200, 15, 6], [90, 5, 8], [150, 20, 5], [300, 25, 4], [80, 6, 10]],
        genere(c) {
          const [f, p, n] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une forêt de ' + f + ' hectares perd ' + p + ' hectares chaque année, rasés pour faire de nouveaux champs. Combien d’hectares restera-t-il dans ' + n + ' ans ?',
            reponse: { type: 'nombre', valeur: f - p * n },
            aide: 'Calcule d’abord ' + p + ' × ' + n + ', puis enlève le résultat à ' + f + '.',
            aideParlee: 'Calcule la surface perdue en tout, puis enlève-la à la surface de départ.',
            correction: [p + ' × ' + n + ' = ' + p * n + ' hectares perdus.', f + ' − ' + p * n + ' = ' + (f - p * n) + ' hectares.'],
          };
        },
      },
    ],

    defi: {
      // [dioxygène loin du champ, au milieu, près du champ, en mg par litre]
      versions: [[9, 7, 2], [10, 5, 3], [8, 6, 1], [12, 6, 3], [9, 4, 2], [11, 7, 3]],
      genere(c) {
        const [a, b, d] = c.alea.choisir(this.versions);
        const BONNE = 'Les engrais font proliférer les algues, puis des microbes qui décomposent les algues consomment le dioxygène';
        return {
          enonce: 'Aminata mesure le dioxygène dissous dans l’eau de la mare, à trois endroits. Loin du champ : ' + a + ' mg par litre. Au milieu : ' + b +
            ' mg par litre. Près du champ, où arrivent les engrais : ' + d + ' mg par litre.',
          image: { dessin: 'batons', valeurs: [['Loin', a], ['Milieu', b], ['Près', d]], axe: 'Dioxygène (mg par litre)', description: 'Trois bâtons : ' + a + ' milligrammes de dioxygène par litre loin du champ, ' + b + ' au milieu, et ' + d + ' près du champ.' },
          questions: [
            {
              texte: 'Question 1. De combien de milligrammes par litre la valeur près du champ est-elle plus faible que celle loin du champ ?',
              reponse: { type: 'nombre', valeur: a - d },
              aide: 'Fais la différence entre la valeur loin du champ et la valeur près du champ.',
              correction: [a + ' − ' + d + ' = ' + (a - d) + ' mg par litre.'],
            },
            {
              texte: 'Question 2. Quelle est la moyenne des trois mesures, en milligrammes par litre ?',
              reponse: { type: 'nombre', valeur: (a + b + d) / 3 },
              aide: 'Additionne les trois mesures, puis divise par trois.',
              correction: [a + ' + ' + b + ' + ' + d + ' = ' + (a + b + d) + '.', (a + b + d) + ' ÷ 3 = ' + (a + b + d) / 3 + ' mg par litre.'],
            },
            {
              texte: 'Question 3. Quelle cause explique le mieux la baisse de dioxygène près du champ ?',
              reponse: O.choix(c.alea, BONNE, [BONNE, 'Les poissons produisent du dioxygène près du champ', 'Le champ ajoute du dioxygène à l’eau']),
              aide: 'Pense à ce qui arrive dans la mare depuis le champ voisin.',
              correction: ['Les engrais font se multiplier les algues. Quand les algues meurent, des microbes les décomposent et consomment le dioxygène de l’eau.', 'Réponse : ' + BONNE + '.'],
            },
            {
              texte: 'Question 4. Propose deux solutions pour limiter les engrais qui arrivent dans la mare, et explique leur effet.',
              correction: ['Solutions possibles : utiliser moins d’engrais, planter une haie ou une bande d’herbe entre le champ et la mare.', 'Moins d’engrais arrivent dans l’eau : les algues se multiplient moins, et le dioxygène reste suffisant.'],
              grille: ['As-tu proposé deux solutions qui réduisent les engrais dans l’eau ?', 'As-tu relié ces solutions à moins d’algues et plus de dioxygène ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais comment nos activités changent un écosystème, et comment on peut en limiter les effets.',
    carte: ['milieu-ou-vivant', 'cause-effet', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['engrais', 'foret-rasee'], defi: true },
    automatismes: [
      {
        id: 'cause-ou-solution',
        versions: [['Répandre trop d’engrais', 'Une cause'], ['Planter une haie', 'Une solution'], ['Raser une forêt', 'Une cause'], ['Créer un parc en ville', 'Une solution']],
        genere(c) { const [t, b] = c.alea.choisir(this.versions); return { enonce: t + ' : pour un écosystème, est-ce un problème ou une solution ?', reponse: O.choix(c.alea, b === 'Une cause' ? 'Un problème' : 'Une solution', ['Un problème', 'Une solution']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En République démocratique du Congo et en République du Congo, la plus grande tourbière tropicale stocke beaucoup de carbone.',
    prenoms: ['Moussa', 'Rachel', 'Aminata'],
  };
});
