/* Notion 17 du bloc SVT « Le corps humain et la santé » : les appareils reproducteurs et les gamètes. La planche du manuel.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const FEMME = ['Les ovaires', 'Les trompes', 'L’utérus', 'Le vagin'];

  return {
    id: 'appareils-reproducteurs',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Les appareils reproducteurs et les gamètes',
    classe: 'cycle 4',
    univers: ['famille', 'chansons'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : appareils reproducteurs, cellules reproductrices.',

    accroche: {
      texte: 'Pour réviser, Rachel ouvre son manuel à une planche de schémas : l’appareil reproducteur de la femme, celui de l’homme, et deux cellules très différentes. ' +
        'L’une est ronde et énorme, l’autre minuscule, avec une longue queue. À quoi servent-elles ?',
      image: { dessin: 'chaine', etapes: FEMME, description: 'Les organes de l’appareil reproducteur de la femme, dans l’ordre : les ovaires, les trompes, l’utérus, le vagin.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Les testicules', 'Les spermiductes', 'La prostate', 'Le pénis'], description: 'Les organes de l’appareil reproducteur de l’homme, dans l’ordre : les testicules, les spermiductes, la prostate, le pénis.' },
      etapes: [
        'Chez la femme, les ovaires libèrent chaque mois, à partir de la puberté, une grosse cellule : l’ovule. Il passe dans une trompe.',
        'L’utérus est l’organe où un bébé pourrait se développer.',
        'Chez l’homme, les testicules produisent en continu, dès la puberté, des millions de petites cellules mobiles : les spermatozoïdes.',
        'Ces cellules reproductrices sont faites pour se rencontrer : chacune apporte la moitié de ce qu’il faut pour former un nouvel être humain.',
      ],
    },

    decouverte: {
      texte: (c) => 'L’ovule et le spermatozoïde sont ' + c.mot('gametes') + '. L’ovule vient d’un ovaire, le spermatozoïde d’un testicule. ' +
        'Chacun apporte la moitié de ce qu’il faut pour former un nouvel être humain. ' +
        'L’astuce : l’ovule est gros et immobile ; le spermatozoïde est minuscule et nage grâce à son flagelle.',
    },

    vocabulaire: {
      termes: {
        gametes: { sesMots: 'les cellules reproductrices', officiel: 'les gamètes', lesDeux: 'les cellules reproductrices, que les scientifiques appellent les gamètes' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les cellules reproductrices, l’ovule chez la femme, le spermatozoïde chez l’homme. ' +
          'Les scientifiques ont un mot à eux : je te le dirai la prochaine fois.',
        'Les scientifiques disent : les gamètes. L’ovule est le gamète femelle, le spermatozoïde le gamète mâle.',
        'Tu connais les mots officiels : les gamètes sont les ovules, produits par les ovaires, et les spermatozoïdes, produits par les testicules.',
      ],
    },

    exercices: [
      {
        id: 'qui-produit',
        univers: 'famille',
        versions: [['les ovules', 'Les ovaires'], ['les spermatozoïdes', 'Les testicules']],
        genere(c) {
          const [g, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel organe produit ' + g + ' ?',
            reponse: O.choix(c.alea, bonne, ['Les ovaires', 'Les testicules', 'L’utérus']),
            aide: 'Ovules chez la femme, spermatozoïdes chez l’homme.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quel-organe',
        univers: 'famille',
        versions: [['où un bébé peut se développer', 'L’utérus'], ['où passe l’ovule après l’ovaire', 'Les trompes'], ['qui libère les ovules', 'Les ovaires']],
        genere(c) {
          const [role, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans l’appareil reproducteur de la femme, quel est l’organe ' + role + ' ?',
            reponse: O.choix(c.alea, bonne, FEMME.filter((x) => x !== bonne).slice(0, 2)),
            aide: 'Ovaires, trompes, utérus, vagin.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'ovules-par-an',
        univers: 'chansons',
        versions: [6, 12, 24, 3, 18, 9],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          return {
            enonce: 'À partir de la puberté, les ovaires libèrent environ un ovule par mois. Environ combien d’ovules sont libérés en ' + m + ' mois ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Un par mois, environ.',
            correction: ['Environ un par mois : ' + m + ' ovules en ' + m + ' mois.'],
          };
        },
      },
      {
        id: 'combien-de-fois-plus-gros',
        univers: 'famille',
        // [diamètre de l'ovule, largeur de la tête du spermatozoïde], en micromètres
        versions: [[120, 4], [120, 5], [100, 4], [120, 3], [100, 5], [150, 5]],
        genere(c) {
          const [o, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Sur un schéma à l’échelle, l’ovule mesure ' + o + ' micromètres de diamètre, et la tête du spermatozoïde ' + s + ' micromètres de large. Combien de fois l’ovule est-il plus large ?',
            reponse: { type: 'nombre', valeur: o / s },
            aide: 'Calcule ' + o + ' ÷ ' + s + '.',
            aideParlee: 'Divise la taille de l’ovule par celle de la tête du spermatozoïde.',
            correction: [o + ' ÷ ' + s + ' = ' + o / s + ' fois.'],
          };
        },
      },
      {
        id: 'quel-gamete',
        univers: 'famille',
        versions: [['C’est une grosse cellule ronde, immobile.', 'L’ovule'], ['C’est une petite cellule mobile, avec un flagelle.', 'Le spermatozoïde'], ['Il est produit en continu, par millions.', 'Le spermatozoïde'], ['Il est libéré environ une fois par mois.', 'L’ovule']],
        genere(c) {
          const [desc, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'De quel gamète s’agit-il ? « ' + desc + ' »',
            reponse: O.choix(c.alea, bonne, ['L’ovule', 'Le spermatozoïde']),
            aide: 'Ovule : gros, immobile, une fois par mois. Spermatozoïde : petit, mobile, par millions.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      versions: [[120, 4], [100, 5], [150, 5], [120, 3]],
      genere(c) {
        const [o, s] = c.alea.choisir(this.versions);
        return {
          enonce: 'Dans son manuel, Rachel lit qu’un ovule mesure environ ' + o + ' micromètres de diamètre, et que la tête d’un spermatozoïde mesure environ ' + s + ' micromètres.',
          questions: [
            {
              texte: 'Question 1. Combien de fois l’ovule est-il plus large que la tête du spermatozoïde ?',
              reponse: { type: 'nombre', valeur: o / s },
              aide: 'Divise les deux tailles.',
              correction: [o + ' ÷ ' + s + ' = ' + o / s + ' fois.'],
            },
            {
              texte: 'Question 2. Environ combien d’ovules sont libérés en un an, à raison d’environ un par mois ?',
              reponse: { type: 'nombre', valeur: 12 },
              aide: 'Il y a douze mois dans une année.',
              correction: ['Environ un par mois : 12 ovules par an.'],
            },
            {
              texte: 'Question 3. Compare l’ovule et le spermatozoïde : organe qui les produit, taille, mobilité, rythme de production.',
              correction: ['L’ovule est produit par un ovaire ; il est gros, immobile, libéré environ une fois par mois.', 'Le spermatozoïde est produit par un testicule ; il est petit, mobile grâce à son flagelle, produit en continu, par millions.'],
              grille: ['As-tu cité l’organe qui produit chacun ?', 'As-tu comparé leurs tailles ?', 'As-tu parlé de la mobilité et du rythme de production ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Ovules et spermatozoïdes n’ont plus de secret : tu sais d’où ils viennent et ce qu’ils portent.',
    carte: ['qui-produit', 'quel-organe', 'quel-gamete'],
    papierDuSoir: { exercices: ['combien-de-fois-plus-gros', 'ovules-par-an'], defi: true },
    automatismes: [
      {
        id: 'gamete-rapide',
        versions: [['les ovules', 'Les ovaires'], ['les spermatozoïdes', 'Les testicules']],
        genere(c) { const [g, b] = c.alea.choisir(this.versions); return { enonce: 'Qui produit ' + g + ' ?', reponse: O.choix(c.alea, b, ['Les ovaires', 'Les testicules']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Yaoundé, au Cameroun, un centre hospitalier aide des couples à avoir un enfant : au laboratoire, on y fait entrer un spermatozoïde dans un ovule.',
    prenoms: ['Rachel'],
  };
});
