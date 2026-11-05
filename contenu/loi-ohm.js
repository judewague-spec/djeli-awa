/* Notion 7 du bloc « L'électricité » : la résistance et la loi d'Ohm. Le sèche-cheveux de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'loi-ohm',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'La résistance et la loi d’Ohm',
    classe: '4e',
    univers: ['coiffure', 'appareils', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : résistance électrique, loi d’Ohm.',

    accroche: {
      texte: 'Clarisse, la tante de Rachel, a débranché son vieux sèche-cheveux en panne avant de l’ouvrir. « Ne fais jamais ça seule », dit-elle. Dedans, un long fil enroulé, qui chauffe quand le courant passe. Il freine le courant. ' +
        'En classe, avec un générateur de laboratoire, Rachel fait des mesures sur un petit fil du même genre. Quand elle double les volts, le courant double aussi. Une règle se cache là-dessous.',
      image: { dessin: 'courbe', points: [[0, 0], [1, 2], [2, 4], [3, 6]], axeX: 'Intensité (en dixièmes d’ampère)', axeY: 'Tension (V)', description: 'Une droite qui part de zéro : quand l’intensité double, la tension double. Les points sont 0 et 0, 1 et 2, 2 et 4, 3 et 6.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['U = R × I', 'U en volts, I en ampères', 'R en ohms'], description: 'U égale R fois I : U en volts, I en ampères, R en ohms.' },
      etapes: [
        'Le fil freine le courant. Plus il freine, plus il faut de volts pour le même courant.',
        'Ce frein se mesure en ohms, avec le symbole Ω.',
        'La règle : U = R × I, avec U en volts, R en ohms et I en ampères.',
        'Pour trouver I : I = U ÷ R. Pour trouver R : R = U ÷ I.',
        'Attention : si I est donné en milliampères, on le convertit d’abord en ampères.',
        'Cette loi vaut pour un conducteur ohmique, comme un fil résistant de laboratoire. Une lampe, elle, ne la suit pas vraiment.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un fil peut freiner le courant. On mesure en ohms ' + c.mot('resistance') + '. ' +
        'La tension égale ce frein multiplié par l’intensité : U égale R fois I. C’est ' + c.mot('loi') + '. ' +
        'L’astuce : la tension et l’intensité sont proportionnelles. Si l’une double, l’autre double aussi.',
    },

    vocabulaire: {
      termes: {
        resistance: { sesMots: 'le frein du courant', officiel: 'la résistance', lesDeux: 'le frein du courant, que les physiciens appellent la résistance' },
        loi: { sesMots: 'la règle du frein', officiel: 'la loi d’Ohm', lesDeux: 'la règle du frein, que les physiciens appellent la loi d’Ohm' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le frein du courant, et la règle du frein. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la résistance, notée R et mesurée en ohms, et la loi d’Ohm : U égale R fois I. Ce qui obéit à cette loi est un conducteur ohmique.',
        'Tu connais les mots officiels : la résistance, l’ohm, la loi d’Ohm, et le conducteur ohmique.',
      ],
    },

    exercices: [
      {
        id: 'calculer-u',
        univers: 'appareils',
        // [R, I]
        versions: [[10, 0.5], [20, 0.3], [100, 0.12], [50, 0.2], [30, 0.4], [150, 0.06]],
        genere(c) {
          const [r, i] = c.alea.choisir(this.versions);
          const u = r2(r * i);
          return {
            enonce: 'Un conducteur ohmique de ' + r + ' Ω est traversé par un courant de ' + ecr(i) + ' A. Quelle est la tension à ses bornes, en volts ?',
            reponse: { type: 'nombre', valeur: u },
            aide: 'Calcule ' + r + ' × ' + ecr(i) + '.',
            aideParlee: 'La tension égale la résistance multipliée par l’intensité.',
            correction: ['U = R × I = ' + r + ' × ' + ecr(i) + ' = ' + ecr(u) + ' V.'],
          };
        },
      },
      {
        id: 'calculer-i',
        univers: 'maison-courses',
        // [U, R]
        versions: [[6, 12], [9, 30], [12, 40], [4.5, 15], [3, 10], [12, 60]],
        genere(c) {
          const [u, r] = c.alea.choisir(this.versions);
          const i = r2(u / r);
          return {
            enonce: 'On applique ' + ecr(u) + ' V aux bornes d’un conducteur ohmique de ' + r + ' Ω. Quelle est l’intensité du courant, en ampères ?',
            reponse: { type: 'nombre', valeur: i },
            aide: 'Calcule ' + ecr(u) + ' ÷ ' + r + '.',
            aideParlee: 'L’intensité égale la tension divisée par la résistance.',
            correction: ['I = U ÷ R = ' + ecr(u) + ' ÷ ' + r + ' = ' + ecr(i) + ' A.'],
          };
        },
      },
      {
        id: 'calculer-r',
        univers: 'coiffure',
        // [U, I]
        versions: [[6, 0.5], [12, 0.4], [9, 0.3], [4.5, 0.5], [3, 0.2], [6, 0.3]],
        genere(c) {
          const [u, i] = c.alea.choisir(this.versions);
          const r = Math.round(u / i);
          return {
            enonce: 'Sous ' + ecr(u) + ' V, un fil est traversé par ' + ecr(i) + ' A. Quelle est sa résistance, en ohms ?',
            reponse: { type: 'nombre', valeur: r },
            aide: 'Calcule ' + ecr(u) + ' ÷ ' + ecr(i) + '.',
            aideParlee: 'La résistance égale la tension divisée par l’intensité.',
            correction: ['R = U ÷ I = ' + ecr(u) + ' ÷ ' + ecr(i) + ' = ' + r + ' Ω.'],
          };
        },
      },
      {
        id: 'avec-des-milliamperes',
        univers: 'appareils',
        // [R, mA]
        versions: [[100, 50], [200, 30], [50, 200], [150, 40], [300, 20]],
        genere(c) {
          const [r, m] = c.alea.choisir(this.versions);
          const i = r2(m / 1000), u = r2((r * m) / 1000);
          return {
            enonce: 'Une résistance de ' + r + ' Ω est traversée par ' + m + ' mA. Quelle est la tension à ses bornes, en volts ?',
            reponse: { type: 'nombre', valeur: u },
            aide: 'Convertis d’abord : ' + m + ' mA = ' + ecr(i) + ' A.',
            aideParlee: 'Convertis d’abord les milliampères en ampères.',
            correction: [m + ' mA = ' + ecr(i) + ' A.', 'U = ' + r + ' × ' + ecr(i) + ' = ' + ecr(u) + ' V.'],
          };
        },
      },
      O.qcm('que-devient-i', 'coiffure',
        [['la tension double.', 'L’intensité double'], ['la tension est divisée par deux.', 'L’intensité est divisée par deux'], ['la tension est multipliée par trois.', 'L’intensité est multipliée par trois']],
        (x) => 'Pour une même résistance : ' + x + ' Que devient l’intensité ?', ['L’intensité double', 'L’intensité est divisée par deux', 'L’intensité est multipliée par trois'],
        'La tension et l’intensité sont proportionnelles.'),
    ],

    defi: {
      // [I1, U1, U2] : mesures sur une même résistance
      versions: [[0.2, 4, 12], [0.3, 6, 9], [0.1, 5, 20], [0.5, 10, 15]],
      genere(c) {
        const [i1, u1, u2] = c.alea.choisir(this.versions);
        const r = Math.round(u1 / i1), i2 = r2(u2 / r);
        return {
          enonce: 'Dans le laboratoire du collège, Esther mesure ' + ecr(i1) + ' A dans une résistance soumise à ' + u1 + ' V. Elle veut savoir ce qui se passera sous ' + u2 + ' V.',
          questions: [
            {
              texte: 'Question 1. Calcule la valeur de la résistance, en ohms.',
              reponse: { type: 'nombre', valeur: r },
              aide: 'La résistance égale la tension divisée par l’intensité.',
              correction: ['R = ' + u1 + ' ÷ ' + ecr(i1) + ' = ' + r + ' Ω.'],
            },
            {
              texte: 'Question 2. Calcule l’intensité sous ' + u2 + ' V, en ampères.',
              reponse: { type: 'nombre', valeur: i2 },
              aide: 'L’intensité égale la tension divisée par la résistance.',
              correction: ['I = ' + u2 + ' ÷ ' + r + ' = ' + ecr(i2) + ' A.'],
            },
            {
              texte: 'Question 3. Rédige la loi d’Ohm en une phrase, en citant les trois grandeurs et leurs unités.',
              correction: ['La tension U, en volts, égale la résistance R, en ohms, multipliée par l’intensité I, en ampères.'],
              grille: ['As-tu cité la tension, la résistance et l’intensité ?', 'As-tu donné les trois unités ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le frein du courant n’a plus de secret : la loi d’Ohm te donne le nombre qui manque.',
    carte: ['calculer-u', 'calculer-i', 'que-devient-i'],
    papierDuSoir: { exercices: ['calculer-r', 'avec-des-milliamperes'], defi: true },
    automatismes: [
      {
        id: 'ohm-rapide',
        versions: [[10, 0.5], [20, 0.5], [100, 0.1], [50, 0.2]],
        genere(c) { const [r, i] = c.alea.choisir(this.versions); return { enonce: r + ' × ' + ecr(i) + ' = ?', reponse: { type: 'nombre', valeur: r2(r * i) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? L’Allemand Georg Simon Ohm a montré que le courant est proportionnel à la tension. Cette loi porte son nom.',
    prenoms: ['Clarisse', 'Rachel', 'Esther'],
  };
});
