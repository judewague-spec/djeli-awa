/* Notion 16 du bloc SVT « Le corps humain et la santé » : la puberté et les hormones. Les photos de famille.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const OUI = 'Oui, c’est un changement de la puberté', NON = 'Non';

  return {
    id: 'puberte',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'La puberté et les hormones',
    classe: 'cycle 4',
    univers: ['famille', 'chansons'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : puberté, hormones, appareils reproducteurs.',

    accroche: {
      texte: 'La maman de Moussa montre de vieilles photos de famille. À dix ans, Moussa était un petit garçon à la voix fluette. À seize ans, il est grand, il a de la moustache, et sa voix est grave ! ' +
        'Aminata, sa sœur, a beaucoup changé elle aussi. Qu’est-ce qui transforme ainsi le corps, en quelques années ?',
      image: { dessin: 'chaine', etapes: ['Le cerveau envoie un signal', 'Les ovaires ou les testicules se mettent en marche', 'Ils libèrent des hormones dans le sang', 'Le corps se transforme'], description: 'Le déclenchement de la puberté : le cerveau envoie un signal, les ovaires ou les testicules libèrent des hormones dans le sang, et le corps se transforme.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Cerveau', 'Ovaires ou testicules', 'Hormones dans le sang', 'Organes qui changent'], description: 'Le trajet des messages chimiques : du cerveau aux ovaires ou testicules, puis par le sang jusqu’aux organes.' },
      etapes: [
        'Entre environ dix et seize ans, le cerveau envoie un signal aux ovaires chez les filles, aux testicules chez les garçons.',
        'Ces organes se mettent en marche : ils libèrent des messagers chimiques dans le sang.',
        'Le sang transporte ces messagers dans tout le corps : la poitrine se développe, la voix des garçons mue, des poils apparaissent.',
        'Les ovaires et les testicules commencent à produire des cellules reproductrices : les premières règles arrivent chez les filles.',
        'Chacun a son rythme : la puberté peut commencer plus tôt ou plus tard, et c’est normal.',
      ],
    },

    decouverte: {
      texte: (c) => 'À l’adolescence, le corps est transformé par ' + c.mot('hormones') + '. ' + (c.etape === 1 ? 'Ils sont fabriqués par les ovaires ou les testicules, et transportés par le sang. ' : 'Elles sont fabriquées par les ovaires ou les testicules, et transportées par le sang. ') +
        (c.etape === 1 ? 'Ils' : 'Elles') + ' déclenchent les transformations du corps, et le début de la production des cellules reproductrices. ' +
        'L’astuce : le cerveau commande, les ovaires ou les testicules répondent, le sang transporte.',
    },

    vocabulaire: {
      termes: {
        hormones: { sesMots: 'des messagers chimiques', officiel: 'des hormones', lesDeux: 'des messagers chimiques, que les scientifiques appellent des hormones' },
      },
      textes: [
        'Pour l’instant, garde tes mots : des messagers chimiques, transportés par le sang, transforment le corps à l’adolescence. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : des hormones. Les ovaires fabriquent des œstrogènes, les testicules de la testostérone. Ces changements de l’adolescence, c’est la puberté.',
        'Tu connais les mots officiels : à la puberté, les hormones sexuelles, fabriquées par les ovaires et les testicules, transforment le corps.',
      ],
    },

    exercices: [
      {
        id: 'qui-fabrique',
        univers: 'famille',
        versions: [['les œstrogènes', 'Les ovaires'], ['la testostérone', 'Les testicules']],
        genere(c) {
          const [h, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel organe fabrique ' + h + ' ?',
            reponse: O.choix(c.alea, bonne, ['Les ovaires', 'Les testicules', 'L’estomac']),
            aide: 'Œstrogènes chez les filles, testostérone chez les garçons.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'changement-ou-pas',
        univers: 'famille',
        versions: [['La voix d’un garçon devient plus grave.', OUI], ['La poitrine se développe.', OUI], ['La couleur des yeux change.', NON], ['Des poils apparaissent.', OUI], ['Le groupe sanguin change.', NON], ['Les premières règles arrivent.', OUI]],
        genere(c) {
          const [phrase, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Est-ce un changement de la puberté ? « ' + phrase + ' »',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Les messagers chimiques agissent sur la voix, la poitrine, les poils, les organes reproducteurs.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'transport',
        univers: 'chansons',
        versions: [1, 2],
        genere(c) {
          return {
            enonce: 'Qu’est-ce qui transporte les hormones dans tout le corps ?',
            reponse: O.choix(c.alea, 'Le sang', ['Les nerfs', 'L’air des poumons']),
            aide: 'Ce sont des messagers chimiques, pas électriques.',
            correction: ['Les hormones circulent dans le sang. Réponse : Le sang.'],
          };
        },
      },
      {
        id: 'croissance',
        univers: 'famille',
        // [centimètres par an, nombre d'années]
        versions: [[8, 2], [9, 2], [7, 3], [6, 3], [10, 2], [5, 4]],
        genere(c) {
          const [cm, ans] = c.alea.choisir(this.versions);
          return {
            enonce: 'Pendant sa puberté, Moussa a grandi d’environ ' + cm + ' cm par an pendant ' + ans + ' ans. De combien de centimètres a-t-il grandi ?',
            reponse: { type: 'nombre', valeur: cm * ans },
            aide: 'Calcule ' + cm + ' × ' + ans + '.',
            aideParlee: 'Multiplie les centimètres par an par le nombre d’années.',
            correction: [cm + ' × ' + ans + ' = ' + cm * ans + ' cm.'],
          };
        },
      },
      {
        id: 'age',
        univers: 'famille',
        // [âge au début de la puberté, âge aujourd'hui]
        versions: [[11, 14], [12, 15], [10, 13], [13, 16], [11, 15], [12, 16]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'La puberté d’Aminata a commencé à ' + a + ' ans. Elle a aujourd’hui ' + b + ' ans. Depuis combien d’années son corps se transforme-t-il ?',
            reponse: { type: 'nombre', valeur: b - a },
            aide: 'Calcule ' + b + ' − ' + a + '.',
            aideParlee: 'Fais la différence entre son âge et l’âge du début de sa puberté.',
            correction: [b + ' − ' + a + ' = ' + (b - a) + ' ans.'],
          };
        },
      },
    ],

    defi: {
      // [taille à 11 ans, centimètres par an, années]
      versions: [[140, 8, 3], [145, 7, 3], [138, 9, 2], [142, 6, 4], [150, 5, 3], [135, 8, 4]],
      genere(c) {
        const [t, cm, n] = c.alea.choisir(this.versions);
        return {
          enonce: 'À onze ans, Moussa mesurait ' + t + ' cm. Pendant sa puberté, il a grandi d’environ ' + cm + ' cm par an pendant ' + n + ' ans.',
          image: { dessin: 'chaine', etapes: ['Cerveau', 'Testicules', 'Testostérone dans le sang', 'Croissance, voix, poils'], description: 'Chez Moussa : le cerveau, les testicules, la testostérone dans le sang, et les transformations du corps.' },
          questions: [
            {
              texte: 'Question 1. De combien de centimètres a-t-il grandi pendant ces années ?',
              reponse: { type: 'nombre', valeur: cm * n },
              aide: 'Multiplie les centimètres par an par le nombre d’années.',
              correction: [cm + ' × ' + n + ' = ' + cm * n + ' cm.'],
            },
            {
              texte: 'Question 2. Quelle taille mesure-t-il à la fin, en centimètres ?',
              reponse: { type: 'nombre', valeur: t + cm * n },
              aide: 'Ajoute sa croissance à sa taille de départ.',
              correction: [t + ' + ' + cm * n + ' = ' + (t + cm * n) + ' cm.'],
            },
            {
              texte: 'Question 3. Explique ce qui déclenche ces transformations chez un garçon.',
              correction: ['Le cerveau envoie un signal aux testicules.', 'Les testicules fabriquent une hormone, la testostérone, transportée par le sang.', 'Elle déclenche la croissance, la mue de la voix, l’apparition des poils, et la production des spermatozoïdes.'],
              grille: ['As-tu parlé du cerveau ?', 'As-tu cité les testicules et la testostérone ?', 'As-tu dit que le sang transporte l’hormone ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Le cerveau commande, les messagers chimiques voyagent dans le sang : tu sais ce qui transforme le corps à l’adolescence.',
    carte: ['qui-fabrique', 'changement-ou-pas', 'transport'],
    papierDuSoir: { exercices: ['croissance', 'age'], defi: true },
    automatismes: [
      {
        id: 'hormone-rapide',
        versions: [['la testostérone', 'Les testicules'], ['les œstrogènes', 'Les ovaires']],
        genere(c) { const [h, b] = c.alea.choisir(this.versions); return { enonce: 'Qui fabrique ' + h + ' ?', reponse: O.choix(c.alea, b, ['Les ovaires', 'Les testicules']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le mot « hormone » a été proposé en 1905 par le physiologiste britannique Ernest Starling, qui étudiait ces messagers chimiques.',
    prenoms: ['Moussa', 'Aminata'],
  };
});
