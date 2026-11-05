/* Notion 8 du bloc « L'électricité » : la puissance électrique. Les étiquettes des appareils de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'puissance-electrique',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'La puissance électrique',
    classe: '3e',
    univers: ['appareils', 'cuisine-restaurant', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : puissance électrique, relation P = U × I.',

    accroche: {
      texte: 'Laure branche la bouilloire, le fer à repasser et le four en même temps : tout s’éteint ! Le disjoncteur a sauté. Rachel lit les étiquettes : 10 watts pour la petite lampe, 2 000 watts pour la bouilloire. ' +
        'Ce nombre dit à quelle vitesse chaque appareil utilise l’énergie.',
      image: { dessin: 'chaine', etapes: ['La petite lampe : 10 W', 'Le fer à repasser : 1 000 W', 'La bouilloire : 2 000 W'], description: 'Trois étiquettes : la petite lampe, 10 watts ; le fer à repasser, 1 000 watts ; la bouilloire, 2 000 watts.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['P = U × I', 'U en volts, I en ampères', 'P en watts'], description: 'P égale U fois I : U en volts, I en ampères, P en watts.' },
      etapes: [
        'Sur chaque appareil, un nombre est écrit en watts, de symbole W. Plus il est grand, plus l’appareil utilise d’énergie à chaque seconde.',
        'On peut le calculer : P = U × I, avec U en volts et I en ampères.',
        'Pour trouver l’intensité : I = P ÷ U. Sous 230 V, une bouilloire de 2 300 W demande 10 A.',
        'Les grands appareils s’écrivent en kilowatts : 1 kW = 1 000 W.',
        'Si les appareils branchés ensemble demandent trop de courant, le disjoncteur coupe tout, pour éviter que les fils chauffent. Ne branche jamais plusieurs gros appareils sur une même prise.',
      ],
    },

    decouverte: {
      texte: (c) => 'Ce nombre, c’est ' + c.mot('puissance') + '. Il se mesure en watts. ' +
        'On le calcule ainsi : la tension multipliée par l’intensité. P égale U fois I. ' +
        'Dans une maison, les puissances s’additionnent. Trop de courant à la fois : tout est coupé par ' + c.mot('disjoncteur') + '. ' +
        'L’astuce : lis l’étiquette avant de brancher.',
    },

    vocabulaire: {
      termes: {
        puissance: { sesMots: 'la vitesse d’utilisation de l’énergie', officiel: 'la puissance électrique', lesDeux: 'la vitesse d’utilisation de l’énergie, que les physiciens appellent la puissance électrique' },
        disjoncteur: { sesMots: 'le gardien du courant', officiel: 'le disjoncteur', lesDeux: 'le gardien du courant, que l’on appelle le disjoncteur' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la vitesse d’utilisation de l’énergie, et le gardien du courant. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : la puissance électrique, notée P, en watts. P égale U fois I. Et le gardien du courant, c’est le disjoncteur.',
        'Tu connais les mots officiels : la puissance électrique, le watt, le kilowatt, et le disjoncteur.',
      ],
    },

    exercices: [
      {
        id: 'calculer-p',
        univers: 'appareils',
        // [U, I]
        versions: [[230, 2], [230, 10], [12, 2], [230, 0.5], [6, 0.5], [230, 5]],
        genere(c) {
          const [u, i] = c.alea.choisir(this.versions);
          const p = r2(u * i);
          return {
            enonce: 'Un appareil fonctionne sous ' + u + ' V et il est traversé par ' + ecr(i) + ' A. Quelle est sa puissance, en watts ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + u + ' × ' + ecr(i) + '.',
            aideParlee: 'La puissance égale la tension multipliée par l’intensité.',
            correction: ['P = U × I = ' + u + ' × ' + ecr(i) + ' = ' + ecr(p) + ' W.'],
          };
        },
      },
      {
        id: 'calculer-i',
        univers: 'cuisine-restaurant',
        // [P, U]
        versions: [[2300, 230], [1150, 230], [460, 230], [115, 230], [24, 12], [920, 230]],
        genere(c) {
          const [p, u] = c.alea.choisir(this.versions);
          const i = r2(p / u);
          return {
            enonce: 'Un appareil de ' + p + ' W est branché sous ' + u + ' V. Quelle est l’intensité du courant, en ampères ?',
            reponse: { type: 'nombre', valeur: i },
            aide: 'Calcule ' + p + ' ÷ ' + u + '.',
            aideParlee: 'L’intensité égale la puissance divisée par la tension.',
            correction: ['I = P ÷ U = ' + p + ' ÷ ' + u + ' = ' + ecr(i) + ' A.'],
          };
        },
      },
      {
        id: 'en-kilowatts',
        univers: 'maison-courses',
        versions: [2000, 1500, 500, 3000, 750, 2500],
        genere(c) {
          const w = c.alea.choisir(this.versions);
          const k = r2(w / 1000);
          return {
            enonce: 'Un four a une puissance de ' + w + ' W. Combien cela fait-il en kilowatts ?',
            reponse: { type: 'nombre', valeur: k },
            aide: 'Divise ' + w + ' par 1 000.',
            aideParlee: 'Divise par mille.',
            correction: [w + ' ÷ 1 000 = ' + ecr(k) + ' kW.'],
          };
        },
      },
      {
        id: 'en-meme-temps',
        univers: 'maison-courses',
        // [P1, P2, P3]
        versions: [[2000, 1000, 500], [1500, 750, 250], [2300, 100, 600], [800, 1200, 2000], [60, 1500, 2000]],
        genere(c) {
          const [a, b, d] = c.alea.choisir(this.versions);
          const s = a + b + d;
          return {
            enonce: 'Laure branche en même temps trois appareils de ' + a + ' W, ' + b + ' W et ' + d + ' W. Quelle puissance totale demandent-ils, en watts ?',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Additionne les trois puissances.',
            correction: [a + ' + ' + b + ' + ' + d + ' = ' + s + ' W.'],
          };
        },
      },
      {
        id: 'le-plus-puissant',
        univers: 'cuisine-restaurant',
        // [les deux appareils], le plus puissant
        versions: [[['Une lampe de 10 W', 'Une bouilloire de 2 000 W'], 'Une bouilloire de 2 000 W'], [['Un four de 3 kW', 'Un fer de 1 500 W'], 'Un four de 3 kW'], [['Un chargeur de 20 W', 'Un ventilateur de 50 W'], 'Un ventilateur de 50 W'], [['Un sèche-cheveux de 2 kW', 'Un mixeur de 500 W'], 'Un sèche-cheveux de 2 kW']],
        genere(c) {
          const [[a, b], juste] = c.alea.choisir(this.versions);
          return {
            enonce: 'Lequel utilise l’énergie le plus vite ?',
            reponse: O.choix(c.alea, juste, [a, b]),
            aide: 'Compare les puissances, dans la même unité.',
            correction: ['1 kW = 1 000 W.', 'Réponse : ' + juste + '.'],
          };
        },
      },
    ],

    defi: {
      // [P1, P2, U, I max du disjoncteur]
      versions: [[2300, 1150, 230, 10], [1150, 920, 230, 16], [2300, 2300, 230, 16], [1840, 920, 230, 10]],
      genere(c) {
        const [a, b, u, m] = c.alea.choisir(this.versions);
        const i1 = a / u, i2 = b / u, t = i1 + i2, coupe = t > m;
        const bonne = coupe ? 'Oui, il coupe le courant' : 'Non, il laisse passer le courant';
        return {
          enonce: 'Dans la cuisine de Laure, tout est sous ' + u + ' V. Une bouilloire de ' + a + ' W et un four de ' + b + ' W sont branchés en dérivation. Le disjoncteur coupe le courant au-dessus de ' + m + ' A.',
          questions: [
            {
              texte: 'Question 1. Quelle intensité demande la bouilloire, en ampères ?',
              reponse: { type: 'nombre', valeur: i1 },
              aide: 'L’intensité égale la puissance divisée par la tension.',
              correction: [a + ' ÷ ' + u + ' = ' + ecr(i1) + ' A.'],
            },
            {
              texte: 'Question 2. Quelle intensité demandent les deux appareils ensemble, en ampères ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'En dérivation, les intensités s’additionnent.',
              correction: [ecr(i1) + ' + ' + ecr(i2) + ' = ' + ecr(t) + ' A.'],
            },
            {
              texte: 'Question 3. Le disjoncteur coupe-t-il le courant ?',
              reponse: O.choix(c.alea, bonne, ['Oui, il coupe le courant', 'Non, il laisse passer le courant']),
              aide: 'Compare l’intensité totale à la limite du disjoncteur.',
              correction: [ecr(t) + ' A' + (coupe ? ' dépasse ' : ' ne dépasse pas ') + m + ' A.', 'Réponse : ' + bonne + '.'],
            },
            {
              texte: 'Question 4. Explique à quoi sert un disjoncteur dans une maison.',
              correction: ['Il coupe le courant quand l’intensité est trop grande.', 'Ainsi, les fils ne chauffent pas trop : il protège des incendies.'],
              grille: ['As-tu dit qu’il coupe le courant ?', 'As-tu parlé du danger, les fils qui chauffent ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Des watts, des volts, des ampères : tu sais pourquoi le disjoncteur a sauté.',
    carte: ['calculer-p', 'calculer-i', 'le-plus-puissant'],
    papierDuSoir: { exercices: ['calculer-i', 'en-meme-temps'], defi: true },
    automatismes: [
      {
        id: 'watts-rapides',
        versions: [[230, 2], [12, 2], [6, 3], [230, 10]],
        genere(c) { const [u, i] = c.alea.choisir(this.versions); return { enonce: u + ' × ' + i + ' = ?', reponse: { type: 'nombre', valeur: u * i } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En République démocratique du Congo, la centrale Inga 2 a une puissance de mille quatre cent vingt-quatre mégawatts.',
    prenoms: ['Laure', 'Rachel'],
  };
});
