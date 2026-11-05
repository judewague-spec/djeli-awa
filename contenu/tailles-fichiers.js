/* Notion 3 du bloc de technologie « Le numérique et l'intelligence artificielle » : la taille d'une photo, d'une chanson, d'une vidéo. Le téléphone plein d'Esther.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'tailles-fichiers',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'La taille d’une photo, d’une chanson, d’une vidéo',
    classe: 'cycle 4',
    univers: ['appareils', 'danses', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : unités de mesure de l’information, poids des fichiers.',

    accroche: {
      texte: 'Esther filme sa danse. Soudain, son téléphone refuse : plus de place ! Pourtant, hier, elle a gardé des dizaines de photos sans problème. ' +
        'Une petite vidéo pèse-t-elle donc plus lourd que toutes ces photos ? Eh oui, un fichier a un poids.',
      image: { dessin: 'barres', barres: [{ nom: 'Photo', parts: 1 }, { nom: 'Chanson', parts: 2 }, { nom: 'Vidéo', parts: 8 }], description: 'Trois barres, sans échelle exacte : la photo est la plus courte, la chanson est un peu plus longue, la vidéo est de très loin la plus longue.' },
    },

    manipulation: {
      image: { dessin: 'facture', titre: 'Des poids habituels', lignes: [['Une photo', '3 millions d’octets'], ['Une chanson', '5 millions d’octets'], ['Une minute de vidéo', '100 millions'], ['Le téléphone', '64 milliards d’octets']], description: 'Des poids habituels, environ : une photo, trois millions d’octets ; une chanson, cinq millions ; une minute de vidéo, cent millions. La mémoire d’un téléphone : soixante-quatre milliards, par exemple.' },
      etapes: [
        'Le poids d’un fichier se compte en octets. Mais il y en a tant qu’on utilise de plus grandes unités.',
        'Mille octets font un kilo-octet. Mille kilo-octets font une unité plus grande. Et mille de ces unités en font une plus grande encore.',
        'Une photo est faite de millions de points. Une vidéo, de milliers de photos à la suite, avec le son.',
        'Pour gagner de la place, on peut réduire un fichier : il pèse moins, mais il perd parfois en qualité.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le poids d’une photo se compte en ' + c.mot('mo') + '. La mémoire d’un téléphone se compte en ' + c.mot('go') + '. ' +
        'Pour passer de l’un à l’autre, on multiplie ou on divise par mille. ' +
        'L’astuce : le plus souvent, une vidéo pèse bien plus qu’une chanson, et une chanson plus qu’une photo.',
    },

    vocabulaire: {
      termes: {
        mo: { sesMots: 'millions d’octets', officiel: 'méga-octets', lesDeux: 'millions d’octets, que l’on appelle des méga-octets' },
        go: { sesMots: 'milliards d’octets', officiel: 'giga-octets', lesDeux: 'milliards d’octets, que l’on appelle des giga-octets' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les millions d’octets, et les milliards d’octets. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un méga-octet, écrit Mo, pour un million d’octets. Un giga-octet, écrit Go, pour un milliard d’octets.',
        'Tu connais les mots officiels : le kilo-octet, le méga-octet et le giga-octet.',
      ],
    },

    exercices: [
      {
        id: 'go-en-mo',
        univers: 'appareils',
        versions: [2, 4, 8, 16, 32, 64],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Combien de méga-octets font ' + n + ' Go ?',
            reponse: { type: 'nombre', valeur: n * 1000 },
            aide: 'Un giga-octet, c’est 1 000 méga-octets. Calcule ' + n + ' × 1 000.',
            aideParlee: 'Un giga-octet, c’est mille méga-octets. Multiplie par mille.',
            correction: [n + ' × 1 000 = ' + ecr(n * 1000) + ' Mo.'],
          };
        },
      },
      {
        id: 'combien-de-photos',
        univers: 'famille',
        // [Go libres, Mo par photo]
        versions: [[1, 4], [2, 5], [1, 2], [3, 5], [2, 4], [6, 3]],
        genere(c) {
          const [g, p] = c.alea.choisir(this.versions);
          const n = (g * 1000) / p;
          return {
            enonce: 'Il reste ' + g + ' Go sur le téléphone de Rachel. Chaque photo pèse ' + p + ' Mo. Combien de photos peut-elle garder ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Convertis en Mo : ' + g + ' × 1 000. Puis divise par ' + p + '.',
            aideParlee: 'Convertis les giga-octets en méga-octets, puis divise par le poids d’une photo.',
            correction: [g + ' × 1 000 = ' + ecr(g * 1000) + ' Mo.', ecr(g * 1000) + ' ÷ ' + p + ' = ' + ecr(n) + ' photos.'],
          };
        },
      },
      {
        id: 'poids-de-la-liste',
        univers: 'danses',
        // [chansons, Mo par chanson]
        versions: [[20, 5], [12, 4], [30, 5], [15, 6], [25, 4], [40, 3]],
        genere(c) {
          const [n, p] = c.alea.choisir(this.versions);
          return {
            enonce: 'La liste de danse d’Esther contient ' + n + ' chansons de ' + p + ' Mo chacune. Quel est son poids, en Mo ?',
            reponse: { type: 'nombre', valeur: n * p },
            aide: 'Calcule ' + n + ' × ' + p + '.',
            aideParlee: 'Multiplie le nombre de chansons par le poids d’une chanson.',
            correction: [n + ' × ' + p + ' = ' + n * p + ' Mo.'],
          };
        },
      },
      {
        id: 'le-plus-lourd',
        univers: 'appareils',
        // [les deux fichiers], le plus lourd
        versions: [[['Une chanson de 5 Mo', 'Une vidéo de 500 Mo'], 'Une vidéo de 500 Mo'], [['Un film de 2 Go', 'Une photo de 3 Mo'], 'Un film de 2 Go'], [['Un texte de 50 ko', 'Une photo de 3 Mo'], 'Une photo de 3 Mo'], [['Une vidéo de 800 Mo', 'Un film de 1 Go'], 'Un film de 1 Go']],
        genere(c) {
          const [[a, b], juste] = c.alea.choisir(this.versions);
          return {
            enonce: 'Lequel de ces deux fichiers est le plus lourd ?',
            reponse: O.choix(c.alea, juste, [a, b]),
            aide: 'Mets tout dans la même unité : ko, puis Mo, puis Go.',
            correction: ['Du plus petit au plus grand : ko, Mo, Go. Il y a mille fois plus à chaque unité.', 'Réponse : ' + juste + '.'],
          };
        },
      },
      Q('reduire-un-fichier', 'famille',
        [['Pourquoi réduit-on un fichier avant de l’envoyer ?', 'Il pèse moins, et part plus vite'], ['Quel est l’avantage d’un fichier réduit ?', 'Il pèse moins, et part plus vite']],
        (x) => x, ['Il pèse moins, et part plus vite', 'Il devient plus beau', 'Il ne prend plus aucune place'],
        'Pense à la place et au temps d’envoi.',
        'Un fichier réduit prend moins de place et s’envoie plus vite, parfois avec une qualité un peu moins bonne.'),
    ],

    defi: {
      // [Go libres, minutes de vidéo, Mo par minute]
      versions: [[2, 5, 100], [1, 8, 100], [3, 10, 100], [2, 6, 200]],
      genere(c) {
        const [g, m, p] = c.alea.choisir(this.versions);
        const v = m * p, reste = g * 1000 - v;
        return {
          enonce: 'Document : sur son téléphone, il reste ' + g + ' Go à Esther. Elle veut filmer une danse de ' + m + ' minutes. Une minute de vidéo pèse ' + p + ' Mo.',
          questions: [
            {
              texte: 'Question 1. Quel sera le poids de la vidéo, en Mo ?',
              reponse: { type: 'nombre', valeur: v },
              aide: 'Multiplie le nombre de minutes par le poids d’une minute.',
              correction: [m + ' × ' + p + ' = ' + v + ' Mo.'],
            },
            {
              texte: 'Question 2. Combien restera-t-il de place, en Mo, après cette vidéo ?',
              reponse: { type: 'nombre', valeur: reste },
              aide: 'Convertis la place libre en méga-octets, puis enlève le poids de la vidéo.',
              correction: [g + ' × 1 000 = ' + ecr(g * 1000) + ' Mo.', ecr(g * 1000) + ' − ' + v + ' = ' + ecr(reste) + ' Mo.'],
            },
            {
              texte: 'Question 3. Propose deux façons de libérer de la place sur son téléphone, et explique ton choix.',
              correction: ['Par exemple : supprimer les vidéos en double, et copier ses photos sur un autre support.', 'Les vidéos sont les fichiers les plus lourds : ce sont elles qui libèrent le plus de place.'],
              grille: ['As-tu donné deux façons ?', 'As-tu dit que les vidéos pèsent le plus ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Kilo, méga, giga : tu sais pourquoi ta vidéo a rempli le téléphone.',
    carte: ['go-en-mo', 'le-plus-lourd', 'reduire-un-fichier'],
    papierDuSoir: { exercices: ['combien-de-photos', 'poids-de-la-liste'], defi: true },
    automatismes: [
      {
        id: 'fois-mille',
        versions: [2, 4, 8, 16],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' Go = combien de Mo ?', reponse: { type: 'nombre', valeur: n * 1000 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En 1957, aux États-Unis, la première image numérique mesurait 176 points de côté.',
    prenoms: ['Esther', 'Rachel'],
  };
});
