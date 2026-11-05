/* Notion 1 du bloc « L'électricité » : le circuit électrique simple. La lampe de poche d'Aminata.
   Manipulation : le circuit à assembler (js/manipulations/circuit.js). Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const BRILLE = 'Elle brille', ETEINTE = 'Elle ne brille pas';
  const COND = 'Il laisse passer le courant', ISOL = 'Il ne laisse pas passer le courant';

  return {
    id: 'circuit-simple',
    matiere: 'physique-chimie',
    bloc: 'electricite',
    titre: 'Le circuit électrique simple',
    classe: 'cycle 4',
    univers: ['appareils', 'maison-courses', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « L’énergie et ses conversions » : circuits électriques, dipôles, conducteurs et isolants ; révision des acquis du cycle 3.',

    accroche: {
      texte: 'Le courant est coupé à la maison. Aminata prend sa lampe de poche : rien ! Elle l’ouvre avec Moussa. Une pile, une petite ampoule, un bouton, et des bouts de métal entre eux. ' +
        'Un des bouts de métal a bougé. Moussa le remet en place, et la lumière revient. Le courant a besoin d’un chemin sans coupure.',
      image: { dessin: 'circuit', branches: [1], description: 'Un circuit : une pile, un interrupteur fermé, et une lampe allumée, reliés par des fils en une seule boucle.' },
    },

    manipulation: {
      type: 'circuit',
      but: 'allumer',
      consigne: 'À toi d’assembler le circuit de la lampe de poche. Pose la pile, ajoute une lampe, relie les fils, ferme l’interrupteur. Puis valide.',
    },

    decouverte: {
      texte: (c) => 'Pour qu’une lampe brille, il faut ' + c.mot('ferme') + '. Cette boucle passe par ' + c.mot('generateur') + '. ' +
        'Le courant passe dans les métaux, mais pas dans le plastique ni le bois sec. ' +
        'Attention : un fil seul entre les deux bornes d’une pile, c’est un court-circuit. Il chauffe, et c’est dangereux. ' +
        'L’astuce : suis la boucle du dessin avec ton doigt. Si tu dois lever le doigt, le courant ne passe pas.',
    },

    vocabulaire: {
      termes: {
        generateur: { sesMots: 'la pile', officiel: 'le générateur', lesDeux: 'la pile, que les physiciens appellent le générateur' },
        ferme: { sesMots: 'une boucle sans coupure', officiel: 'un circuit fermé', lesDeux: 'une boucle sans coupure, que les physiciens appellent un circuit fermé' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la pile, et une boucle sans coupure. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : le générateur, et un circuit fermé. Un circuit coupé est un circuit ouvert. Chaque appareil du circuit, avec ses deux bornes, est un dipôle. Ce qui laisse passer le courant est un conducteur ; le reste, un isolant.',
        'Tu connais les mots officiels : le générateur, le dipôle, le circuit fermé ou ouvert, le conducteur et l’isolant.',
      ],
    },

    exercices: [
      O.qcm('allume-ou-pas', 'appareils',
        [['La pile est posée, les fils sont reliés, l’interrupteur est fermé.', BRILLE], ['La pile est posée, les fils sont reliés, l’interrupteur est ouvert.', ETEINTE], ['Il n’y a pas de pile, les fils sont reliés, l’interrupteur est fermé.', ETEINTE], ['La pile est posée, un fil est coupé, l’interrupteur est fermé.', ETEINTE]],
        (x) => 'Dans ce circuit, avec une lampe en bon état, la lampe brille-t-elle ? ' + x, [BRILLE, ETEINTE],
        'Il faut une pile, et une boucle sans coupure.'),
      O.qcm('conducteur-ou-isolant', 'maison-courses',
        [['Un clou en fer', COND], ['Une règle en plastique', ISOL], ['Une pièce en cuivre', COND], ['Un crayon de bois, côté bois', ISOL], ['Une cuillère en métal', COND], ['Une gomme', ISOL]],
        (x) => 'On place cet objet dans un circuit à pile, à la place d’un fil. ' + x + ' : que fait-il ?', [COND, ISOL],
        'Les métaux laissent passer le courant.'),
      O.qcm('role-de-la-piece', 'appareils',
        [['la pile', 'Elle fournit l’énergie électrique'], ['l’interrupteur', 'Il ouvre ou ferme le circuit'], ['la lampe', 'Elle transforme l’énergie électrique en lumière'], ['le fil', 'Il relie les éléments du circuit']],
        (x) => 'Dans un circuit, à quoi sert ' + x + ' ?', ['Elle fournit l’énergie électrique', 'Il ouvre ou ferme le circuit', 'Elle transforme l’énergie électrique en lumière', 'Il relie les éléments du circuit'],
        'Pense au travail de chaque élément.'),
      {
        id: 'nombre-de-fils',
        univers: 'famille',
        // nombre d'éléments reliés en une seule boucle
        versions: [3, 4, 5, 6, 7],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Rachel relie ' + n + ' éléments, l’un après l’autre, en une seule boucle. Combien de fils lui faut-il ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Dessine la boucle : il y a un fil entre chaque élément et le suivant, et un pour revenir au premier.',
            correction: ['Un fil après chaque élément : ' + n + ' fils.'],
          };
        },
      },
      O.qcm('court-circuit', 'maison-courses',
        [['Un fil relie directement les deux bornes de la pile, sans lampe.', 'Un court-circuit : c’est dangereux'], ['La pile, la lampe et l’interrupteur fermé forment une boucle.', 'Un circuit normal'], ['Un morceau de métal touche les deux bornes de la pile.', 'Un court-circuit : c’est dangereux'], ['Deux lampes et une pile forment une boucle.', 'Un circuit normal']],
        (x) => x + ' De quoi s’agit-il ?', ['Un court-circuit : c’est dangereux', 'Un circuit normal'],
        'Le courant passe-t-il par un appareil, ou directement d’une borne à l’autre ?'),
    ],

    defi: {
      // [éléments de la boucle, leur liste]
      versions: [[3, 'une pile, une lampe et un interrupteur'], [4, 'une pile, deux lampes et un interrupteur'], [4, 'une pile, une lampe, un moteur et un interrupteur'], [5, 'une pile, deux lampes, un moteur et un interrupteur']],
      genere(c) {
        const [n, liste] = c.alea.choisir(this.versions);
        return {
          enonce: 'Aminata fabrique un montage avec ' + liste + '. Elle relie ces ' + n + ' éléments en une seule boucle.',
          image: { dessin: 'circuit', branches: [1], ouvert: true, description: 'Le circuit d’Aminata, interrupteur ouvert : une pile, un interrupteur ouvert, une lampe éteinte.' },
          questions: [
            {
              texte: 'Question 1. Combien de fils faut-il pour relier ces ' + n + ' éléments en une boucle ?',
              reponse: { type: 'nombre', valeur: n },
              aide: 'Un fil après chaque élément.',
              correction: [n + ' éléments : ' + n + ' fils.'],
            },
            {
              texte: 'Question 2. Moussa veut relier les deux bornes de la pile avec un seul fil. Comment s’appelle ce montage ?',
              reponse: O.choix(c.alea, 'Un court-circuit', ['Un court-circuit', 'Un circuit en série', 'Un circuit en dérivation']),
              aide: 'Le courant passe directement d’une borne à l’autre.',
              correction: ['Un seul fil entre les deux bornes : le fil chauffe, c’est dangereux. Il ne faut jamais le faire.', 'Réponse : Un court-circuit.'],
            },
            {
              texte: 'Question 3. L’interrupteur est ouvert. Explique pourquoi la lampe ne brille pas.',
              correction: ['Un interrupteur ouvert coupe la boucle : le circuit est ouvert.', 'Le courant ne circule que dans un circuit fermé.'],
              grille: ['As-tu dit que la boucle est coupée ?', 'As-tu employé le mot « ouvert » ou « fermé » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Une pile, une boucle sans coupure, et la lumière revient : tu sais assembler un circuit.',
    carte: ['allume-ou-pas', 'conducteur-ou-isolant', 'role-de-la-piece'],
    papierDuSoir: { exercices: ['nombre-de-fils', 'court-circuit'], defi: true },
    automatismes: [
      {
        id: 'produit-rapide',
        versions: [[2, 5], [3, 4], [4, 6], [3, 8]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' × ' + b + ' = ?', reponse: { type: 'nombre', valeur: a * b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, en 2020, presque tous les habitants des villes avaient accès à l’électricité. À la campagne, c’était environ un habitant sur trois.',
    prenoms: ['Aminata', 'Moussa', 'Rachel'],
  };
});
