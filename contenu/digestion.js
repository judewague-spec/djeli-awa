/* Notion 7 du bloc SVT « Le corps humain et la santé » : la digestion. Le voyage du mafé de Laure.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const TUBE = ['La bouche', 'L’œsophage', 'L’estomac', 'L’intestin grêle', 'Le gros intestin'];
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'digestion',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'La digestion',
    classe: 'cycle 4',
    univers: ['cuisine-restaurant', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : transformation des aliments dans le tube digestif.',

    accroche: {
      texte: 'Laure a cuisiné un mafé : de la viande, une sauce à l’arachide, du riz. Rachel se régale. ' +
        'Mais une fois avalé, où va ce repas ? Comment un plat de riz et de viande peut-il finir par nourrir les muscles des jambes ?',
      image: { dessin: 'chaine', etapes: TUBE, description: 'Le trajet des aliments : la bouche, l’œsophage, l’estomac, l’intestin grêle, le gros intestin.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: TUBE, description: 'Le tube que parcourent les aliments, de la bouche au gros intestin.' },
      etapes: [
        'Dans la bouche, les dents coupent et écrasent les aliments ; la salive les mouille.',
        'L’œsophage fait descendre la bouchée jusqu’à l’estomac, qui la brasse avec un liquide très acide.',
        'Dans l’intestin grêle, d’autres liquides finissent de découper les aliments en toutes petites molécules : les nutriments.',
        'Ce qui n’a pas été digéré, comme une partie des fibres, passe dans le gros intestin, puis sort du corps dans les selles.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le chemin des aliments est ' + c.mot('tube') + ' : bouche, œsophage, estomac, intestin grêle, gros intestin. ' +
        'Le long de ce chemin, les aliments sont coupés, brassés, puis découpés par des liquides en toutes petites molécules : les nutriments. ' +
        'L’amidon du riz devient du glucose ; les protéines de la viande deviennent des acides aminés.',
    },

    vocabulaire: {
      termes: {
        tube: { sesMots: 'un long tuyau', officiel: 'le tube digestif', lesDeux: 'un long tuyau, que les scientifiques appellent le tube digestif' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un long tuyau, où les aliments sont coupés en tout petits morceaux. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : le tube digestif. Les liquides qui découpent les aliments s’appellent les sucs digestifs, et les petites molécules obtenues, les nutriments.',
        'Tu connais les mots officiels : dans le tube digestif, les sucs digestifs transforment les aliments en nutriments. C’est la digestion.',
      ],
    },

    exercices: [
      {
        id: 'organe-suivant',
        univers: 'cuisine-restaurant',
        versions: [0, 1, 2, 3],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = TUBE[i + 1];
          return {
            enonce: 'Après ' + TUBE[i].replace(/^La |^Le |^L’/, (m) => ({ 'La ': 'la ', 'Le ': 'le ', 'L’': 'l’' })[m]) + ', par quel organe passent les aliments ?',
            reponse: O.choix(c.alea, bonne, TUBE.filter((_, k) => k !== i)),
            aide: 'Bouche, œsophage, estomac, intestin grêle, gros intestin.',
            correction: ['L’ordre : ' + TUBE.map((t) => t.charAt(0).toLowerCase() + t.slice(1)).join(', ') + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'quel-role',
        univers: 'famille',
        versions: [['couper et écraser les aliments avec les dents', 'La bouche'], ['brasser les aliments avec un liquide très acide', 'L’estomac'], ['finir de découper les aliments en nutriments', 'L’intestin grêle'], ['faire descendre la bouchée', 'L’œsophage'], ['recevoir ce qui n’a pas été digéré', 'Le gros intestin']],
        genere(c) {
          const [role, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel organe est chargé de ' + role + ' ?',
            reponse: O.choix(c.alea, bonne, TUBE),
            aide: 'Suis le trajet du repas, étape par étape.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'nutriment',
        univers: 'cuisine-restaurant',
        versions: [['l’amidon du riz', 'Du glucose'], ['les protéines de la viande', 'Des acides aminés'], ['l’amidon du pain', 'Du glucose'], ['les protéines du poisson', 'Des acides aminés']],
        genere(c) {
          const [aliment, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Après la digestion, que ' + (/^les /.test(aliment) ? 'deviennent' : 'devient') + ' ' + aliment + ' ?',
            reponse: O.choix(c.alea, bonne, ['Du glucose', 'Des acides aminés', 'De l’eau seulement']),
            aide: 'L’amidon donne un sucre ; les protéines donnent leurs briques.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'longueur',
        univers: 'famille',
        // [œsophage, intestin grêle, gros intestin] en mètres
        versions: [[0.25, 6, 1.5], [0.25, 7, 1.5], [0.25, 6.5, 1.5], [0.3, 6, 1.5], [0.25, 5, 1.5], [0.25, 7.5, 1.5]],
        genere(c) {
          const [a, b, g] = c.alea.choisir(this.versions);
          const t = r2(a + b + g);
          return {
            enonce: 'Chez une adulte, l’œsophage mesure environ ' + ecr(a) + ' m, l’intestin grêle ' + ecr(b) + ' m et le gros intestin ' + ecr(g) + ' m. Quelle longueur font ces trois parties ensemble, en mètres ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Additionne les trois longueurs.',
            correction: [ecr(a) + ' + ' + ecr(b) + ' + ' + ecr(g) + ' = ' + ecr(t) + ' m.'],
          };
        },
      },
      {
        id: 'duree',
        univers: 'cuisine-restaurant',
        // [heures dans l'estomac, heures dans l'intestin grêle]
        versions: [[3, 5], [2, 6], [4, 5], [3, 4], [2, 5], [4, 6]],
        genere(c) {
          const [e, i] = c.alea.choisir(this.versions);
          return {
            enonce: 'Un repas reste environ ' + e + ' heures dans l’estomac de Moussa, puis ' + i + ' heures dans son intestin grêle. Combien d’heures en tout dans ces deux organes ?',
            reponse: { type: 'nombre', valeur: e + i },
            aide: 'Additionne les deux durées.',
            correction: [e + ' + ' + i + ' = ' + (e + i) + ' heures.'],
          };
        },
      },
    ],

    defi: {
      // [heures dans l'estomac, heures dans l'intestin grêle]
      versions: [[3, 5], [2, 6], [4, 5], [3, 6], [2, 5], [4, 4]],
      genere(c) {
        const [e, i] = c.alea.choisir(this.versions);
        return {
          enonce: 'Rachel mange du riz au poisson à midi. Le repas reste environ ' + e + ' heures dans son estomac, puis ' + i + ' heures dans son intestin grêle.',
          image: { dessin: 'chaine', etapes: TUBE, description: 'Le trajet des aliments dans le tube digestif.' },
          questions: [
            {
              texte: 'Question 1. Dans quel organe les nutriments sont-ils obtenus en dernier, avant de passer dans le sang ?',
              reponse: O.choix(c.alea, 'L’intestin grêle', TUBE),
              aide: 'C’est là que la digestion se termine.',
              correction: ['Réponse : L’intestin grêle.'],
            },
            {
              texte: 'Question 2. Combien d’heures après le repas la digestion dans l’intestin grêle se termine-t-elle environ ?',
              reponse: { type: 'nombre', valeur: e + i },
              aide: 'Additionne le temps dans l’estomac et dans l’intestin grêle.',
              correction: [e + ' + ' + i + ' = ' + (e + i) + ' heures.'],
            },
            {
              texte: 'Question 3. Explique ce que devient l’amidon du riz, de la bouche jusqu’à l’intestin grêle.',
              correction: ['Dans la bouche, le riz est mâché.', 'Dans la bouche, la salive commence à découper l’amidon ; dans l’intestin grêle, les sucs digestifs finissent le travail.', 'À la fin, l’amidon est transformé en glucose, un nutriment.'],
              grille: ['As-tu cité les organes dans l’ordre ?', 'As-tu parlé de la salive et des sucs digestifs de l’intestin grêle ?', 'As-tu dit que l’amidon devient du glucose ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais suivre le voyage d’un repas, de la bouche jusqu’aux nutriments.',
    carte: ['organe-suivant', 'quel-role', 'nutriment'],
    papierDuSoir: { exercices: ['longueur', 'duree'], defi: true },
    automatismes: [
      {
        id: 'ordre-rapide',
        versions: [0, 1, 2],
        genere(c) { const i = c.alea.choisir(this.versions); return { enonce: 'Après ' + TUBE[i].toLowerCase() + ' ?', reponse: O.choix(c.alea, TUBE[i + 1], TUBE.filter((_, k) => k !== i)) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le médecin William Beaumont a observé la digestion à travers une ouverture dans l’estomac d’un patient, Alexis St. Martin.',
    prenoms: ['Laure', 'Rachel', 'Moussa'],
  };
});
