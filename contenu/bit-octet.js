/* Notion 2 du bloc de technologie « Le numérique et l'intelligence artificielle » : le bit et l'octet. Les lampes de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);

  return {
    id: 'bit-octet',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Le bit et l’octet',
    classe: 'cycle 4',
    univers: ['appareils', 'maison-courses'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : bit, octet, représentation binaire de l’information.',

    accroche: {
      texte: 'Dans l’atelier, Moussa a deux lampes, chacune avec son interrupteur. Avec Aminata, il invente un code secret : éteinte, éteinte, cela veut dire « viens ». Éteinte, allumée, cela veut dire « attends ». ' +
        'Avec seulement deux lampes, ils ont quatre messages. C’est ainsi que parle un ordinateur.',
      image: { dessin: 'facture', titre: 'Le code des deux lampes', lignes: [['Éteinte, éteinte', '0 0'], ['Éteinte, allumée', '0 1'], ['Allumée, éteinte', '1 0'], ['Allumée, allumée', '1 1']], description: 'Les quatre états de deux lampes : éteinte, éteinte, zéro zéro ; éteinte, allumée, zéro un ; allumée, éteinte, un zéro ; allumée, allumée, un un.' },
    },

    manipulation: {
      image: { dessin: 'doublement', generations: 3, branches: 2, description: 'Chaque nouvelle lampe double le nombre de messages : une lampe en donne deux, deux lampes en donnent quatre, trois lampes en donnent huit.' },
      etapes: [
        'Dans un ordinateur, tout s’écrit avec deux états : 0 et 1. Comme une lampe éteinte, ou allumée.',
        'Avec une case, on a deux messages. Chaque case de plus double le nombre de messages.',
        'Avec huit cases, on a 256 messages : assez pour toutes les lettres, tous les chiffres, et bien plus.',
        'C’est pourquoi on regroupe ces cases par paquets de huit.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’ordinateur écrit tout avec ' + c.mot('bits') + '. Il les regroupe par huit : cela forme ' + c.mot('octet') + '. ' +
        'Mille de ces groupes font un kilo-octet. ' +
        'L’astuce : chaque case de plus double le nombre de messages possibles.',
    },

    vocabulaire: {
      termes: {
        bits: { sesMots: 'des cases à 0 ou 1', officiel: 'des bits', lesDeux: 'des cases à 0 ou 1, que l’on appelle des bits' },
        octet: { sesMots: 'un petit paquet', officiel: 'un octet', lesDeux: 'un petit paquet, que l’on appelle un octet' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les cases à 0 ou 1, et le petit paquet de huit cases. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un bit, pour une case à 0 ou 1. Un octet, pour le paquet de huit bits.',
        'Tu connais les mots officiels : le bit, l’octet, et le kilo-octet, soit mille octets.',
      ],
    },

    exercices: [
      {
        id: 'octets-en-bits',
        univers: 'appareils',
        versions: [3, 5, 10, 12, 25, 100],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Combien de bits y a-t-il dans ' + n + ' octets ?',
            reponse: { type: 'nombre', valeur: n * 8 },
            aide: 'Un octet, c’est 8 bits. Calcule ' + n + ' × 8.',
            aideParlee: 'Un octet, c’est huit bits. Multiplie par huit.',
            correction: [n + ' × 8 = ' + n * 8 + ' bits.'],
          };
        },
      },
      {
        id: 'bits-en-octets',
        univers: 'appareils',
        versions: [16, 40, 64, 80, 200, 800],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Combien d’octets font ' + n + ' bits ?',
            reponse: { type: 'nombre', valeur: n / 8 },
            aide: 'Calcule ' + n + ' ÷ 8.',
            aideParlee: 'Il y a huit bits dans un octet. Divise par huit.',
            correction: [n + ' ÷ 8 = ' + n / 8 + ' octets.'],
          };
        },
      },
      {
        id: 'combien-de-messages',
        univers: 'maison-courses',
        versions: [1, 2, 3, 4, 5, 8],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Avec ' + n + ' lampe' + (n > 1 ? 's' : '') + ', chacune allumée ou éteinte, combien de messages différents peut-on faire ?',
            reponse: { type: 'nombre', valeur: 2 ** n },
            aide: 'Chaque lampe double le nombre de messages. Pars de 1, et double ' + n + ' fois.',
            aideParlee: 'Chaque lampe double le nombre de messages. Pars de un, et double une fois par lampe.',
            correction: [Array(n).fill(2).join(' × ') + ' = ' + 2 ** n + ' messages.'],
          };
        },
      },
      Q('vrai-ou-faux', 'appareils',
        [['Un bit ne peut valoir que 0 ou 1.', 'Vrai'], ['Un octet, c’est 8 bits.', 'Vrai'], ['Un kilo-octet est plus petit qu’un octet.', 'Faux'], ['Un bit peut valoir n’importe quel chiffre, de 0 à 9.', 'Faux']],
        (x) => 'Vrai ou faux ? « ' + x + ' »', ['Vrai', 'Faux'],
        'Deux états pour un bit, huit bits pour un octet.',
        'Un bit vaut 0 ou 1. Huit bits font un octet, et mille octets font un kilo-octet.'),
      Q('du-plus-petit', 'maison-courses',
        [['Quelle est la plus petite unité ?', 'Le bit'], ['Quelle unité compte huit bits ?', 'L’octet'], ['Quelle unité compte mille octets ?', 'Le kilo-octet']],
        (x) => x, ['Le bit', 'L’octet', 'Le kilo-octet'],
        'Bit, puis octet, puis kilo-octet : du plus petit au plus grand.',
        'Le bit est la plus petite unité. Huit bits font un octet, et mille octets un kilo-octet.'),
    ],

    defi: {
      // [lampes, lettres dans le message]
      versions: [[3, 10], [4, 25], [5, 20], [4, 50]],
      genere(c) {
        const [n, l] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : Aminata et Moussa utilisent ' + n + ' lampes pour leurs messages codés. Ensuite, Aminata écrit un message de ' + l + ' lettres sur son téléphone. Chaque lettre occupe un octet.',
          questions: [
            {
              texte: 'Question 1. Combien de messages différents peuvent-ils faire avec leurs lampes ?',
              reponse: { type: 'nombre', valeur: 2 ** n },
              aide: 'Double une fois par lampe, en partant de un.',
              correction: [Array(n).fill(2).join(' × ') + ' = ' + 2 ** n + ' messages.'],
            },
            {
              texte: 'Question 2. Combien de bits occupe le message écrit par Aminata ?',
              reponse: { type: 'nombre', valeur: l * 8 },
              aide: 'Une lettre occupe huit bits. Multiplie par le nombre de lettres.',
              correction: [l + ' × 8 = ' + l * 8 + ' bits.'],
            },
            {
              texte: 'Question 3. Explique pourquoi un ordinateur peut tout enregistrer, alors qu’il ne connaît que 0 et 1.',
              correction: ['Chaque bit de plus double le nombre de messages possibles.', 'Avec assez de bits, on peut coder des lettres, des nombres, des images et des sons.'],
              grille: ['As-tu dit que l’on combine plusieurs bits ?', 'As-tu cité des exemples, comme des lettres ou des images ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Deux états, huit cases, un octet : tu parles maintenant la langue des machines.',
    carte: ['octets-en-bits', 'vrai-ou-faux', 'du-plus-petit'],
    papierDuSoir: { exercices: ['bits-en-octets', 'combien-de-messages'], defi: true },
    automatismes: [
      {
        id: 'fois-huit',
        versions: [2, 3, 5, 10],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' octets = combien de bits ?', reponse: { type: 'nombre', valeur: n * 8 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux États-Unis, l’article de Claude Shannon, en 1948, fut peut-être le premier à employer le mot « bit ».',
    prenoms: ['Moussa', 'Aminata'],
  };
});
