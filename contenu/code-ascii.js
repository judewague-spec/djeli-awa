/* Notion 12 du bloc de technologie « Le numérique et l'intelligence artificielle » : le code ASCII. Le message secret de Rachel.
   Les codes sont calculés par le code : charCodeAt, jamais écrits à la main.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const code = (l) => l.charCodeAt(0);
  const suite = (m) => [...m].map(code).join(', ');

  return {
    id: 'code-ascii',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Le code ASCII',
    classe: 'cycle 4',
    univers: ['famille', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : codage des données, code ASCII.',

    accroche: {
      texte: 'Rachel écrit un mot à Rebecca sur son téléphone. Mais l’ordinateur ne connaît que des nombres. Alors, comment une lettre voyage-t-elle ? ' +
        'Imagine un carnet, partagé par toutes les machines : à chaque lettre, un numéro. A, c’est 65. B, c’est 66.',
      image: { dessin: 'facture', titre: 'Le carnet des lettres', lignes: [['A', String(code('A'))], ['B', String(code('B'))], ['C', String(code('C'))], ['a', String(code('a'))]], description: 'Un carnet : A, soixante-cinq ; B, soixante-six ; C, soixante-sept ; et a minuscule, quatre-vingt-dix-sept.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['La lettre A', 'Le numéro 65', 'Le code 01000001'], description: 'La lettre A a le numéro soixante-cinq, qui s’écrit en bits : zéro, un, zéro, zéro, zéro, zéro, zéro, un.' },
      etapes: [
        'Les lettres se suivent : A vaut 65, B vaut 66, et ainsi de suite jusqu’à Z.',
        'Les minuscules ont d’autres numéros : a vaut 97. L’écart est toujours de 32.',
        'Chaque numéro s’écrit ensuite avec des bits. Il tient dans un octet.',
        'Mais ce carnet ancien ne contient que 128 signes, sans é ni à ! Un carnet bien plus grand, Unicode, contient aujourd’hui les écritures du monde entier.',
      ],
    },

    decouverte: {
      texte: (c) => 'Chaque lettre ou chiffre est ' + c.mot('caractere') + '. Il a un numéro, écrit dans ' + c.mot('ascii') + '. ' +
        'L’astuce : les lettres se suivent. Pour trouver un numéro, compte à partir de A, qui vaut 65.',
    },

    vocabulaire: {
      termes: {
        caractere: { sesMots: 'un signe', officiel: 'un caractère', lesDeux: 'un signe, que l’on appelle un caractère' },
        ascii: { sesMots: 'le carnet des lettres', officiel: 'le code ASCII', lesDeux: 'le carnet des lettres, que l’on appelle le code ASCII' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le signe, et le carnet des lettres. ' +
          'En informatique, on a des mots à soi : je te les dirai la prochaine fois.',
        'En informatique, on dit : un caractère, pour le signe. Et le code ASCII, pour le carnet des lettres.',
        'Tu connais les mots officiels : le caractère, le code ASCII et Unicode.',
      ],
    },

    exercices: [
      {
        id: 'code-d-une-lettre',
        univers: 'famille',
        versions: ['C', 'E', 'H', 'K', 'M', 'R'],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const ecart = code(l) - code('A');
          return {
            enonce: 'Dans le code ASCII, A vaut 65. Les lettres se suivent. Quel est le code de la lettre ' + l + ' ?',
            reponse: { type: 'nombre', valeur: code(l) },
            aide: 'Compte de A à ' + l + ' : cela fait ' + ecart + ' lettres plus loin.',
            aideParlee: 'Compte les lettres à partir de A, puis ajoute cet écart à soixante-cinq.',
            correction: ['65 + ' + ecart + ' = ' + code(l) + '.'],
          };
        },
      },
      {
        id: 'minuscule',
        univers: 'appareils',
        versions: ['A', 'B', 'D', 'G', 'M', 'S'],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          return {
            enonce: 'Le code de la lettre ' + l + ' est ' + code(l) + '. L’écart entre majuscule et minuscule est de 32. Quel est le code de la minuscule ' + l.toLowerCase() + ' ?',
            reponse: { type: 'nombre', valeur: code(l.toLowerCase()) },
            aide: 'Calcule ' + code(l) + ' + 32.',
            aideParlee: 'Ajoute trente-deux au code de la majuscule.',
            correction: [code(l) + ' + 32 = ' + code(l.toLowerCase()) + '.'],
          };
        },
      },
      {
        id: 'quelle-lettre',
        univers: 'famille',
        versions: ['B', 'D', 'F', 'I', 'L', 'P'],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const bonne = 'La lettre ' + l;
          const voisine = (d) => 'La lettre ' + String.fromCharCode(code(l) + d);
          return {
            enonce: 'Dans le code ASCII, A vaut 65. À quelle lettre correspond le code ' + code(l) + ' ?',
            reponse: O.choix(c.alea, bonne, [bonne, voisine(1), voisine(-1)]),
            aide: 'Enlève 65 pour savoir à combien de lettres de A tu te trouves.',
            aideParlee: 'Enlève soixante-cinq, pour savoir à combien de lettres de A tu te trouves.',
            correction: [code(l) + ' − 65 = ' + (code(l) - 65) + ' : c’est ' + O.nb(code(l) - 65, 'lettre') + ' après A.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'poids-du-message',
        univers: 'appareils',
        // nombre de caractères du message, un octet chacun
        versions: [5, 12, 20, 45, 100, 160],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Un message contient ' + n + ' caractères du code ASCII, à un octet chacun. Combien de bits occupe-t-il ?',
            reponse: { type: 'nombre', valeur: n * 8 },
            aide: 'Un octet, c’est 8 bits. Calcule ' + n + ' × 8.',
            aideParlee: 'Un octet, c’est huit bits. Multiplie le nombre de caractères par huit.',
            correction: [n + ' × 8 = ' + n * 8 + ' bits.'],
          };
        },
      },
      Q('ascii-ou-unicode', 'appareils',
        [['Quel carnet contient la lettre é et les écritures du monde entier ?', 'Unicode'], ['Quel carnet, ancien, ne contient que 128 signes ?', 'Le code ASCII'], ['Quel carnet peut écrire un message en arabe ou en bamoun ?', 'Unicode']],
        (x) => x, ['Unicode', 'Le code ASCII'],
        'Le carnet ancien est tout petit.',
        'Le code ASCII compte 128 signes, sans accents. Unicode contient les écritures du monde entier.'),
    ],

    defi: {
      // le mot à décoder
      versions: ['DANSE', 'CHANT', 'MANGUE', 'VILLAGE'],
      genere(c) {
        const m = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : dans le code ASCII, A vaut 65, et les lettres se suivent jusqu’à Z. Rachel envoie à Rebecca ce message en nombres : ' + suite(m) + '.',
          image: { dessin: 'facture', titre: 'Quelques codes', lignes: [['A', '65'], ['M', '77'], ['Z', '90']], description: 'Quelques codes : A, soixante-cinq ; M, soixante-dix-sept ; Z, quatre-vingt-dix.' },
          questions: [
            {
              texte: 'Question 1. Combien de caractères contient ce message ?',
              reponse: { type: 'nombre', valeur: m.length },
              aide: 'Compte les nombres du message.',
              correction: ['Le message contient ' + m.length + ' nombres, donc ' + m.length + ' caractères.'],
            },
            {
              texte: 'Question 2. Combien de bits occupe-t-il, à un octet par caractère ?',
              reponse: { type: 'nombre', valeur: m.length * 8 },
              aide: 'Multiplie le nombre de caractères par huit.',
              correction: [m.length + ' × 8 = ' + m.length * 8 + ' bits.'],
            },
            {
              texte: 'Question 3. Écris le mot sur ton cahier, en décodant chaque nombre, puis explique pourquoi deux téléphones différents affichent le même mot.',
              correction: ['Le mot est : ' + m + '.', 'Les deux téléphones utilisent le même code : à un nombre correspond le même caractère.'],
              grille: ['As-tu trouvé le bon mot ?', 'As-tu dit que les deux appareils partagent le même code ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une lettre, un numéro, des bits : tu sais comment un mot traverse les machines.',
    carte: ['code-d-une-lettre', 'minuscule', 'ascii-ou-unicode'],
    papierDuSoir: { exercices: ['quelle-lettre', 'poids-du-message'], defi: true },
    automatismes: [
      {
        id: 'plus-trente-deux',
        versions: [65, 70, 80, 66],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' + 32 = ?', reponse: { type: 'nombre', valeur: n + 32 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, l’écriture bamoun, faite surtout par le roi Njoya entre 1896 et 1910, est aujourd’hui dans Unicode.',
    prenoms: ['Rachel', 'Rebecca'],
  };
});
