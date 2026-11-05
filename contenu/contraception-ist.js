/* Notion 19 du bloc SVT « Le corps humain et la santé » : contraception et infections sexuellement transmissibles. L'affiche de l'infirmerie.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const PRES = 'Le préservatif', PIL = 'La pilule', DIU = 'Le stérilet';

  return {
    id: 'contraception-ist',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Contraception et infections sexuellement transmissibles',
    classe: 'cycle 4',
    univers: ['famille', 'chansons'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : maîtrise de la reproduction, infections sexuellement transmissibles.',

    accroche: {
      texte: 'Devant l’infirmerie du collège, Aminata lit une affiche : « Choisir le moment d’avoir un enfant. Se protéger des infections. Se faire dépister. » ' +
        'Elle se pose des questions, et elle a raison : c’est une question de santé et de liberté. Que faut-il savoir ?',
      image: { dessin: 'chaine', etapes: ['Choisir quand avoir un enfant', 'Se protéger des infections', 'Se faire dépister', 'En parler à un professionnel de santé'], description: 'Quatre messages de l’affiche : choisir quand avoir un enfant, se protéger des infections, se faire dépister, en parler à un professionnel de santé.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Empêcher l’ovulation', 'Empêcher la rencontre des gamètes'], description: 'Deux façons d’éviter une grossesse : empêcher l’ovulation, empêcher la rencontre des gamètes.' },
      etapes: [
        'Pour éviter une grossesse, on peut empêcher l’ovulation : c’est le rôle de la pilule, qui contient des hormones.',
        'On peut empêcher la rencontre de l’ovule et des spermatozoïdes : c’est le rôle du préservatif.',
        'Certaines infections passent d’une personne à l’autre lors des rapports sexuels, comme le VIH. Elles ne se voient pas toujours.',
        'Le préservatif est la seule méthode qui protège aussi de ces infections. Un dépistage permet de savoir si l’on est infecté, et de se soigner.',
        'Un médecin, une sage-femme ou l’infirmière scolaire peuvent conseiller, en toute confidentialité.',
      ],
    },

    decouverte: {
      texte: (c) => 'Choisir le moment d’avoir un enfant, c’est ' + c.mot('contraception') + '. Plusieurs méthodes existent : la pilule, le stérilet, le préservatif. ' +
        'Les infections sexuellement transmissibles passent lors des rapports sexuels ; le préservatif est la seule méthode qui protège à la fois d’une grossesse et de ces infections. ' +
        'L’astuce : en cas de doute, on se fait dépister, et on en parle à un professionnel de santé.',
    },

    vocabulaire: {
      termes: {
        contraception: { sesMots: 'éviter une grossesse quand on ne la veut pas', officiel: 'la contraception', lesDeux: 'éviter une grossesse quand on ne la veut pas, ce que les scientifiques appellent la contraception' },
      },
      textes: [
        'Pour l’instant, garde tes mots : il existe des moyens d’éviter une grossesse quand on ne la veut pas, et de se protéger des infections. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : la contraception, et les infections sexuellement transmissibles, qu’on écrit souvent IST. Faire un test pour savoir si l’on est infecté, c’est un dépistage.',
        'Tu connais les mots officiels : contraception, infections sexuellement transmissibles, dépistage. Le préservatif protège des deux.',
      ],
    },

    exercices: [
      {
        id: 'protege-des-ist',
        univers: 'famille',
        versions: [[PRES, 'Oui'], [PIL, 'Non'], [DIU, 'Non']],
        genere(c) {
          const [m, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'La méthode « ' + m.toLowerCase() + ' » protège-t-elle des infections sexuellement transmissibles ?',
            reponse: O.choix(c.alea, bonne, ['Oui', 'Non']),
            aide: 'Une seule méthode protège à la fois d’une grossesse et des infections.',
            correction: ['Seul le préservatif protège des infections sexuellement transmissibles.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'comment-agit',
        univers: 'famille',
        versions: [[PIL, 'Elle empêche l’ovulation'], [PRES, 'Il empêche la rencontre des gamètes']],
        genere(c) {
          const [m, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Comment agit ' + m.toLowerCase() + ' pour éviter une grossesse ?',
            reponse: O.choix(c.alea, bonne, ['Elle empêche l’ovulation', 'Il empêche la rencontre des gamètes', 'Il soigne les infections']),
            aide: 'La pilule contient des hormones ; le préservatif fait barrière.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'vrai-ou-faux',
        univers: 'chansons',
        versions: [['Une infection sexuellement transmissible peut ne donner aucun signe.', true, 'C’est pourquoi le dépistage est utile.'], ['On peut voir à l’œil nu si une personne est infectée.', false, 'Seul un test, le dépistage, permet de le savoir.'],
          ['Le préservatif protège d’une grossesse et des infections.', true, 'C’est la seule méthode qui fait les deux.'], ['La pilule protège du VIH.', false, 'La pilule évite une grossesse, mais ne protège d’aucune infection.']],
        genere(c) {
          const [phrase, vrai, pourquoi] = c.alea.choisir(this.versions);
          const bonne = vrai ? 'Vrai' : 'Faux';
          return {
            enonce: 'Vrai ou faux ? « ' + phrase + ' »',
            reponse: O.choix(c.alea, bonne, ['Vrai', 'Faux']),
            aide: 'Pense au dépistage et au rôle de chaque méthode.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'plaquettes',
        univers: 'famille',
        // [comprimés par plaquette, plaquettes]
        versions: [[21, 3], [28, 3], [21, 6], [28, 2], [21, 4], [28, 6]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une plaquette de pilule contient ' + n + ' comprimés. Combien de comprimés y a-t-il dans ' + k + ' plaquettes ?',
            reponse: { type: 'nombre', valeur: n * k },
            aide: 'Calcule ' + n + ' × ' + k + '.',
            aideParlee: 'Multiplie le nombre de comprimés d’une plaquette par le nombre de plaquettes.',
            correction: [n + ' × ' + k + ' = ' + n * k + ' comprimés.'],
          };
        },
      },
      {
        id: 'enquete',
        univers: 'chansons',
        // [élèves interrogés, élèves qui connaissent le rôle du préservatif]
        versions: [[200, 150], [400, 300], [500, 450], [250, 200], [300, 240], [800, 600]],
        genere(c) {
          const [n, k] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans une enquête, ' + k + ' élèves sur ' + n + ' savent que le préservatif protège des infections. Quel pourcentage cela représente-t-il ?',
            reponse: { type: 'nombre', valeur: (k * 100) / n },
            aide: 'Calcule ' + k + ' ÷ ' + n + ' × 100.',
            aideParlee: 'Divise par le nombre d’élèves interrogés, puis multiplie par cent.',
            correction: [k + ' ÷ ' + n + ' × 100 = ' + (k * 100) / n + ' %.'],
          };
        },
      },
    ],

    defi: {
      versions: [[200, 150], [400, 320], [500, 400], [250, 175]],
      genere(c) {
        const [n, k] = c.alea.choisir(this.versions);
        return {
          enonce: 'Pour préparer une affiche, Rebecca interroge ' + n + ' élèves : ' + k + ' savent que le préservatif protège à la fois d’une grossesse et des infections sexuellement transmissibles.',
          questions: [
            {
              texte: 'Question 1. Quel pourcentage des élèves le savent ?',
              reponse: { type: 'nombre', valeur: (k * 100) / n },
              aide: 'Divise, puis multiplie par 100.',
              correction: [k + ' ÷ ' + n + ' × 100 = ' + (k * 100) / n + ' %.'],
            },
            {
              texte: 'Question 2. Quelle méthode protège à la fois d’une grossesse et des infections ?',
              reponse: O.choix(c.alea, PRES, [PRES, PIL, DIU]),
              aide: 'Une seule méthode fait les deux.',
              correction: ['Réponse : ' + PRES + '.'],
            },
            {
              texte: 'Question 3. Écris deux messages pour l’affiche : un sur la protection, un sur le dépistage, en expliquant pourquoi.',
              correction: ['Le préservatif protège d’une grossesse et des infections sexuellement transmissibles.', 'Une infection peut ne donner aucun signe : le dépistage permet de savoir et de se soigner tôt.'],
              grille: ['As-tu écrit un message sur le préservatif ?', 'As-tu écrit un message sur le dépistage ?', 'As-tu expliqué pourquoi chacun est important ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais comment choisir le moment d’avoir un enfant, te protéger, et pourquoi le dépistage compte.',
    carte: ['protege-des-ist', 'comment-agit', 'vrai-ou-faux'],
    papierDuSoir: { exercices: ['enquete', 'plaquettes'], defi: true },
    automatismes: [
      {
        id: 'protection-rapide',
        versions: [[PRES, 'Oui'], [PIL, 'Non']],
        genere(c) { const [m, b] = c.alea.choisir(this.versions); return { enonce: m + ' : protège des infections ?', reponse: O.choix(c.alea, b, ['Oui', 'Non']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, depuis 2007, les médicaments contre le VIH, les antirétroviraux, sont gratuits.',
    prenoms: ['Aminata', 'Rebecca'],
  };
});
