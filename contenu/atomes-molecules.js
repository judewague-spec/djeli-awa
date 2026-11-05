/* Notion 10 du bloc physique-chimie « La matière » : atomes et molécules. Les briques de Moussa. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const INDICES = '₀₁₂₃₄₅₆₇₈₉';
  /** « C3H8 » → « C₃H₈ ». */
  const f = (formule) => formule.replace(/\d/g, (x) => INDICES[x]);
  /** « C3H8 » → { C: 3, H: 8 }. */
  function comptes(formule) {
    const c = {};
    for (const [, e, n] of formule.matchAll(/([A-Z][a-z]?)(\d*)/g)) c[e] = (c[e] || 0) + (n ? Number(n) : 1);
    return c;
  }
  const total = (formule) => Object.values(comptes(formule)).reduce((a, x) => a + x, 0);
  const NOMS = { C: 'carbone', H: 'hydrogène', O: 'oxygène', N: 'azote' };
  const de = (e) => (/^[aeiouh]/.test(NOMS[e]) ? 'd’' : 'de ') + NOMS[e];
  const MOLECULES = [['l’eau', 'H2O'], ['le dioxyde de carbone', 'CO2'], ['le méthane', 'CH4'], ['le dioxygène', 'O2'], ['le diazote', 'N2'], ['le dihydrogène', 'H2']];

  return {
    id: 'atomes-molecules',
    matiere: 'physique-chimie',
    bloc: 'matiere',
    titre: 'Atomes et molécules',
    classe: 'cycle 4',
    univers: ['famille', 'cuisine-restaurant', 'maison-courses'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Organisation et transformations de la matière » : atomes, molécules et formules.',

    accroche: {
      texte: 'Moussa joue aux briques avec son petit neveu. Avec quelques sortes de briques seulement, ils construisent une maison, une voiture, un bateau. ' +
        'La matière, c’est pareil ! Avec une centaine de sortes de petites briques, on fabrique l’eau, l’air, le sucre, et tout le reste.',
      image: { dessin: 'molecule', formule: 'H2O', description: 'Une molécule d’eau dessinée comme trois briques rondes collées : deux petites H, une plus grosse O.' },
    },

    manipulation: {
      type: 'molecule',
      cible: 'H2O',
      nomCible: 'une molécule d’eau',
      atomes: ['H', 'O', 'C'],
      consigne: 'Construis la brique d’eau, de formule H, 2, O : deux H et un O. Ajoute ou enlève des briques avec les boutons, puis vérifie.',
    },

    decouverte: {
      texte: (c) => 'La matière est faite ' + c.mot('atomes') + '. Quand on les colle ensemble, on obtient ' + c.mot('molecule') + '. ' +
        'La formule dit tout : H₂O, c’est deux H, de l’hydrogène, et un O, de l’oxygène. Le petit chiffre en bas compte la lettre juste avant lui ; sans chiffre, il y en a une. ' +
        'CO₂ : un carbone, deux oxygènes. CH₄ : un carbone, quatre hydrogènes.',
      image: { dessin: 'molecule', formule: 'CO2', description: 'Une molécule de dioxyde de carbone : un atome C entre deux atomes O.' },
    },

    vocabulaire: {
      termes: {
        atomes: { sesMots: 'de petites briques', officiel: 'd’atomes', lesDeux: 'de petites briques, que les scientifiques appellent des atomes' },
        molecule: { sesMots: 'un assemblage', officiel: 'une molécule', lesDeux: 'un assemblage, que les scientifiques appellent une molécule' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la matière est faite de briques, et un assemblage de briques fait l’eau ou le dioxyde de carbone. ' +
          'Les scientifiques ont des mots à eux : je te les dirai la prochaine fois.',
        'Les scientifiques disent : les briques sont des atomes, et un assemblage d’atomes est une molécule. Chaque sorte d’atome a sa lettre : H, O, C, N.',
        'Tu connais les mots officiels : une molécule est un assemblage d’atomes. Sa formule, comme H₂O, dit quels atomes et combien.',
      ],
    },

    exercices: [
      {
        id: 'combien-d-atomes',
        univers: 'cuisine-restaurant',
        versions: ['H2O', 'CO2', 'CH4', 'O2', 'C3H8', 'C2H6O', 'NH3', 'C6H12O6'],
        genere(c) {
          const m = c.alea.choisir(this.versions);
          return {
            enonce: 'Combien d’atomes en tout dans la molécule ' + f(m) + ' ?',
            reponse: { type: 'nombre', valeur: total(m) },
            aide: 'Ajoute les petits chiffres ; un atome sans chiffre compte pour 1.',
            correction: Object.entries(comptes(m)).map(([e, n]) => n + ' ' + (n > 1 ? 'atomes' : 'atome') + ' ' + de(e)).concat(['En tout : ' + total(m) + ' atomes.']),
          };
        },
      },
      {
        id: 'atomes-d-un-element',
        univers: 'famille',
        versions: [['CH4', 'H'], ['C6H12O6', 'O'], ['C3H8', 'H'], ['CO2', 'O'], ['C2H6O', 'C'], ['C6H12O6', 'C'], ['H2O', 'H'], ['NH3', 'H']],
        genere(c) {
          const [m, e] = c.alea.choisir(this.versions);
          const n = comptes(m)[e];
          return {
            enonce: 'Dans la molécule ' + f(m) + ', combien y a-t-il d’atomes ' + de(e) + ' ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Regarde le petit chiffre juste après la lettre ' + e + '.',
            aideParlee: 'Regarde le petit chiffre juste après la lettre de cet atome. Sans chiffre, il y en a un.',
            correction: ['Après ' + e + ', on lit ' + n + ' : ' + n + ' ' + (n > 1 ? 'atomes' : 'atome') + ' ' + de(e) + '.'],
          };
        },
      },
      {
        id: 'formule-du-nom',
        univers: 'maison-courses',
        versions: MOLECULES.map(([n]) => n),
        genere(c) {
          const nom = c.alea.choisir(this.versions);
          const bonne = f(MOLECULES.find(([n]) => n === nom)[1]);
          const autres = MOLECULES.map(([, m]) => f(m)).filter((x) => x !== bonne).slice(0, 2);
          return {
            enonce: 'Quelle est la formule ' + nom.replace(/^le /, 'du ').replace(/^l’/, 'de l’') + ' ?',
            reponse: O.choix(c.alea, bonne, autres),
            aide: 'Eau : H₂O. Dioxyde de carbone : CO₂. Méthane : CH₄.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'plusieurs-molecules',
        univers: 'cuisine-restaurant',
        versions: [[3, 'H2O', 'H'], [2, 'CO2', 'O'], [4, 'CH4', 'H'], [5, 'O2', 'O'], [3, 'CO2', 'O'], [2, 'C3H8', 'H']],
        genere(c) {
          const [k, m, e] = c.alea.choisir(this.versions);
          const n = comptes(m)[e];
          return {
            enonce: 'Aminata dessine ' + k + ' molécules ' + f(m) + '. Combien d’atomes ' + de(e) + ' a-t-elle dessinés en tout ?',
            reponse: { type: 'nombre', valeur: k * n },
            aide: 'Une molécule en contient ' + n + '. Multiplie par ' + k + '.',
            aideParlee: 'Compte les atomes dans une molécule, puis multiplie par le nombre de molécules.',
            correction: [k + ' × ' + n + ' = ' + k * n + ' atomes ' + de(e) + '.'],
          };
        },
      },
      {
        id: 'formule-d-une-description',
        univers: 'famille',
        versions: [['deux atomes d’hydrogène et un atome d’oxygène', 'H2O'], ['un atome de carbone et deux atomes d’oxygène', 'CO2'], ['un atome de carbone et quatre atomes d’hydrogène', 'CH4'], ['deux atomes d’azote', 'N2']],
        genere(c) {
          const [desc, m] = c.alea.choisir(this.versions);
          const bonne = f(m);
          return {
            enonce: 'Rachel construit une molécule avec ' + desc + '. Quelle est sa formule ?',
            reponse: O.choix(c.alea, bonne, ['H₂O', 'CO₂', 'CH₄', 'N₂'].filter((x) => x !== bonne).slice(0, 2)),
            aide: 'Chaque lettre, puis le petit chiffre qui compte cet atome.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
    ],

    defi: {
      versions: [[2, 'CH4'], [3, 'CH4'], [2, 'C3H8'], [4, 'CO2'], [3, 'H2O'], [5, 'O2']],
      genere(c) {
        const [k, m] = c.alea.choisir(this.versions);
        const t = total(m);
        return {
          enonce: 'Rebecca regarde la formule ' + f(m) + ' sur son cahier. Elle dessine ' + k + ' molécules ' + f(m) + ', avec un rond par atome.',
          image: { dessin: 'molecule', formule: m, description: 'Une molécule ' + f(m) + ' dessinée en atomes collés.' },
          questions: [
            {
              texte: 'Question 1. Combien d’atomes y a-t-il dans une seule molécule ' + f(m) + ' ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Ajoute les petits chiffres ; sans chiffre, compte 1.',
              correction: ['Une molécule ' + f(m) + ' contient ' + t + ' atomes.'],
            },
            {
              texte: 'Question 2. Combien de ronds dessine-t-elle en tout ?',
              reponse: { type: 'nombre', valeur: k * t },
              aide: 'Multiplie par le nombre de molécules.',
              correction: [k + ' × ' + t + ' = ' + k * t + ' ronds.'],
            },
            {
              texte: 'Question 3. Explique la différence entre un atome et une molécule, avec l’exemple de ' + f(m) + '.',
              correction: ['Un atome est une brique de la matière, comme ' + Object.keys(comptes(m)).join(' ou ') + '.', 'Une molécule est un assemblage d’atomes : ' + f(m) + ' en contient ' + t + '.'],
              grille: ['As-tu dit qu’un atome est une brique de la matière ?', 'As-tu dit qu’une molécule est un assemblage d’atomes ?', 'As-tu utilisé l’exemple de ' + f(m) + ' ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais lire une formule comme une liste de briques : quels atomes, et combien.',
    carte: ['combien-d-atomes', 'atomes-d-un-element', 'formule-du-nom'],
    papierDuSoir: { exercices: ['plusieurs-molecules', 'combien-d-atomes'], defi: true },
    automatismes: [
      {
        id: 'atomes-rapide',
        versions: ['H2O', 'CO2', 'CH4', 'O2'],
        genere(c) { const m = c.alea.choisir(this.versions); return { enonce: 'Nombre d’atomes dans ' + f(m) + ' ?', reponse: { type: 'nombre', valeur: total(m) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Le mot « atome » vient du grec, et veut dire « qu’on ne peut pas couper ».',
    prenoms: ['Moussa', 'Laure', 'Rachel', 'Rebecca'],
  };
});
