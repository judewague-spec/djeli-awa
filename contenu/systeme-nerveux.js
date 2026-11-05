/* Notion 3 du bloc SVT « Le corps humain et la santé » : le système nerveux et le réflexe. La casserole brûlante.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const REF = 'Un réflexe', VOL = 'Un geste volontaire';
  const TRAJET = ['La peau sent la chaleur', 'Un nerf porte le message', 'La moelle épinière répond', 'Un nerf porte l’ordre', 'Le muscle du bras se contracte'];

  return {
    id: 'systeme-nerveux',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Le système nerveux et le réflexe',
    classe: '4e',
    univers: ['cuisine-restaurant', 'maison-courses', 'dehors'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : système nerveux, commande des mouvements.',

    accroche: {
      texte: 'Laure, la maman de Rachel, attrape une casserole sans regarder… elle est brûlante ! Sa main lâche aussitôt la poignée, avant même qu’elle ait le temps de penser « aïe ». ' +
        'Qui a donné l’ordre à sa main, si vite ?',
      image: { dessin: 'chaine', etapes: TRAJET, description: 'Le trajet du message : la peau sent la chaleur, un nerf porte le message, la moelle épinière répond, un nerf porte l’ordre, le muscle du bras se contracte.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: TRAJET, description: 'Le trajet du message du réflexe, de la peau jusqu’au muscle.' },
      etapes: [
        'Dans la peau, de petits capteurs sentent la chaleur. Ils envoient un message.',
        'Ce message voyage dans un nerf jusqu’à la moelle épinière, dans le dos.',
        'La moelle épinière répond tout de suite : elle renvoie un ordre par un autre nerf.',
        'Le muscle du bras reçoit l’ordre et se contracte : la main se retire. Le cerveau n’est prévenu qu’après : la douleur arrive ensuite.',
        'Pour un geste qu’on décide, comme lever la main en classe, c’est le cerveau qui donne l’ordre.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le retrait de la main est ' + c.mot('reflexe') + ' : il se fait très vite, sans y penser, et c’est la moelle épinière qui le commande. ' +
        'Le trajet est toujours le même : un capteur, un nerf qui apporte le message, un centre qui décide, un nerf qui porte l’ordre, un muscle. ' +
        'Pour les gestes qu’on décide, le centre qui commande est le cerveau.',
    },

    vocabulaire: {
      termes: {
        reflexe: { sesMots: 'un geste automatique', officiel: 'un réflexe', lesDeux: 'un geste automatique, que les scientifiques appellent un réflexe' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un geste automatique, sans y penser, commandé par la moelle épinière. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : un réflexe. Le capteur s’appelle un récepteur ; le nerf qui apporte le message est un nerf sensitif ; celui qui porte l’ordre, un nerf moteur. ' +
          'Le cerveau et la moelle épinière sont les centres nerveux.',
        'Tu connais les mots officiels : récepteur, nerf sensitif, centre nerveux, nerf moteur, muscle. Le réflexe de retrait de la main est commandé par la moelle épinière ; un geste volontaire, par le cerveau.',
      ],
    },

    exercices: [
      {
        id: 'etape-suivante',
        univers: 'cuisine-restaurant',
        versions: [0, 1, 2, 3],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = TRAJET[i + 1];
          return {
            enonce: 'Dans le réflexe de la casserole, que se passe-t-il juste après cette étape : « ' + TRAJET[i] + ' » ?',
            reponse: O.choix(c.alea, bonne, TRAJET.filter((_, k) => k !== i)),
            aide: 'Capteur, nerf, centre, nerf, muscle.',
            correction: ['Le trajet : ' + TRAJET.map((t) => t.charAt(0).toLowerCase() + t.slice(1)).join(', puis ') + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'reflexe-ou-volontaire',
        univers: 'maison-courses',
        versions: [['Retirer la main d’une casserole brûlante.', REF], ['Lever la main pour répondre en classe.', VOL], ['Retirer le pied d’un sable brûlant.', REF], ['Écrire son prénom.', VOL], ['Lâcher une épine qui pique le doigt.', REF], ['Choisir une mangue au marché.', VOL]],
        genere(c) {
          const [geste, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Réflexe ou geste volontaire ? « ' + geste + ' »',
            reponse: O.choix(c.alea, bonne, [REF, VOL]),
            aide: 'Le fait-on sans y penser, très vite ?',
            correction: [bonne === REF ? 'Automatique et très rapide : c’est un réflexe.' : 'On le décide : c’est un geste volontaire.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quel-centre',
        univers: 'dehors',
        versions: [['le retrait du pied qui marche sur une épine', 'La moelle épinière'], ['un geste volontaire', 'Le cerveau'], ['le retrait de la main brûlée', 'La moelle épinière'], ['la décision de traverser la rue', 'Le cerveau']],
        genere(c) {
          const [geste, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel centre nerveux commande ' + geste + ' ?',
            reponse: O.choix(c.alea, bonne, ['La moelle épinière', 'Le cerveau', 'Le cœur']),
            aide: 'Retrait automatique : moelle épinière. Geste décidé : cerveau.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'duree-du-trajet',
        univers: 'dehors',
        // [distance parcourue par le message en m, vitesse en m/s]
        versions: [[1, 50], [1, 100], [2, 100], [1.5, 50], [0.5, 100], [2, 50]],
        genere(c) {
          const [d, v] = c.alea.choisir(this.versions);
          const ms = Math.round((d / v) * 1000);
          return {
            enonce: 'Un message nerveux parcourt ' + ecr(d) + ' m à ' + v + ' m par seconde. Combien de temps met-il, en millisecondes ?',
            reponse: { type: 'nombre', valeur: ms },
            aide: 'Temps = distance ÷ vitesse, en secondes, puis multiplie par 1 000.',
            aideParlee: 'Divise la distance par la vitesse : tu obtiens des secondes. Multiplie par mille pour avoir des millisecondes.',
            correction: [ecr(d) + ' ÷ ' + v + ' = ' + ecr(Math.round((d / v) * 10000) / 10000) + ' s.', ecr(Math.round((d / v) * 10000) / 10000) + ' s = ' + ms + ' millisecondes.'],
          };
        },
      },
      {
        id: 'quel-capteur',
        univers: 'maison-courses',
        versions: [['la chaleur de la casserole', 'La peau'], ['la lumière du soleil', 'L’œil'], ['le bruit de la sonnette', 'L’oreille'], ['l’odeur du thiéboudiène', 'Le nez'], ['le goût du piment', 'La langue']],
        genere(c) {
          const [stimulus, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel organe des sens capte ' + stimulus + ' ?',
            reponse: O.choix(c.alea, bonne, ['La peau', 'L’œil', 'L’oreille', 'Le nez', 'La langue'].filter((x) => x !== bonne).slice(0, 2).concat(bonne)),
            aide: 'Toucher, vue, ouïe, odorat, goût.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      // [distance capteur-moelle-muscle en m, vitesse en m/s]
      versions: [[1, 50], [1, 100], [2, 100], [1.5, 50], [1.2, 60], [0.8, 40]],
      genere(c) {
        const [d, v] = c.alea.choisir(this.versions);
        const ms = Math.round((d / v) * 1000);
        return {
          enonce: 'Esther pose le doigt sur une épine du jardin et retire la main aussitôt. Le message nerveux a parcouru en tout environ ' + ecr(d) + ' m, à ' + v + ' m par seconde.',
          image: { dessin: 'chaine', etapes: ['La peau sent la piqûre', 'Un nerf porte le message', 'La moelle épinière répond', 'Un nerf porte l’ordre', 'Le muscle du bras se contracte'], description: 'Le trajet du message du réflexe, de la peau piquée jusqu’au muscle.' },
          questions: [
            {
              texte: 'Question 1. Combien de temps, en millisecondes, le message met-il pour faire ce trajet ?',
              reponse: { type: 'nombre', valeur: ms },
              aide: 'Divise la distance par la vitesse, puis passe en millisecondes.',
              correction: [ecr(d) + ' ÷ ' + v + ' = ' + ecr(Math.round((d / v) * 10000) / 10000) + ' s = ' + ms + ' ms.'],
            },
            {
              texte: 'Question 2. Quel centre nerveux a commandé ce geste ?',
              reponse: O.choix(c.alea, 'La moelle épinière', ['La moelle épinière', 'Le cerveau']),
              aide: 'Est-ce un geste réfléchi ou automatique ?',
              correction: ['C’est un réflexe : il est commandé par la moelle épinière.', 'Réponse : La moelle épinière.'],
            },
            {
              texte: 'Question 3. Décris, dans l’ordre, le trajet du message nerveux de ce réflexe.',
              correction: ['Les capteurs de la peau sentent la piqûre.', 'Un nerf porte le message à la moelle épinière, qui renvoie un ordre par un autre nerf.', 'Le muscle du bras se contracte : la main se retire.'],
              grille: ['As-tu commencé par les capteurs de la peau ?', 'As-tu cité la moelle épinière comme centre ?', 'As-tu cité les deux nerfs, aller et retour ?', 'As-tu fini par le muscle qui se contracte ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais comment ta main se retire toute seule : capteur, nerf, centre, nerf, muscle.',
    carte: ['etape-suivante', 'reflexe-ou-volontaire', 'quel-centre'],
    papierDuSoir: { exercices: ['duree-du-trajet', 'etape-suivante'], defi: true },
    automatismes: [
      {
        id: 'reflexe-rapide',
        versions: [['Retirer le pied d’une épine.', REF], ['Écrire une lettre.', VOL], ['Retirer la main d’une flamme.', REF]],
        genere(c) { const [g, b] = c.alea.choisir(this.versions); return { enonce: g + ' Réflexe ou volontaire ?', reponse: O.choix(c.alea, b, [REF, VOL]) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le papyrus Edwin Smith, écrit en Égypte ancienne, décrit déjà des blessures de la tête et leurs effets sur le corps.',
    prenoms: ['Laure', 'Esther'],
  };
});
