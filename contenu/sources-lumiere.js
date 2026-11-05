/* Notion 1 du bloc « Signaux et Univers » : sources et objets diffusants. Rachel, Moussa et la Lune.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { qcm, choix } = O;

  return {
    id: 'sources-lumiere',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'Sources et objets diffusants',
    classe: 'cycle 4',
    univers: ['dehors', 'famille', 'appareils'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Des signaux pour observer et communiquer » : sources de lumière, objets diffusants.',

    accroche: {
      texte: 'Ce soir, Rachel regarde la Lune. Elle brille, mais elle ne fabrique pas sa lumière. Elle renvoie celle du Soleil. ' +
        'Moussa, lui, allume une lampe. La lampe fabrique la sienne.',
      image: { dessin: 'chaine', etapes: ['Le Soleil fabrique de la lumière', 'La Lune la renvoie', 'Rachel voit la Lune'], description: 'Le Soleil fabrique de la lumière. La Lune la renvoie. Rachel voit alors la Lune briller.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Lampe allumée : elle fabrique sa lumière', 'Mur éclairé : il renvoie la lumière de la lampe'], description: 'Une lampe allumée fabrique sa lumière. Un mur éclairé par cette lampe renvoie la lumière qu’il reçoit.' },
      etapes: [
        'Éteins toute la lumière. Un cahier posé sur la table devient invisible.',
        'Allume une lampe. Tu vois la lampe, mais aussi le cahier.',
        'La lampe fabrique sa lumière. Le cahier ne fait que renvoyer celle de la lampe.',
        'La Lune fait comme le cahier. Elle renvoie la lumière du Soleil vers nous.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde la lampe : c’est ' + c.mot('source') + '. Regarde la Lune : c’est ' + c.mot('diffusant') + '. ' +
        'L’astuce : un objet qui ne brille pas tout seul renvoie la lumière d’un autre.',
    },

    vocabulaire: {
      termes: {
        source: { sesMots: 'un objet qui fabrique sa lumière', officiel: 'une source primaire', lesDeux: 'un objet qui fabrique sa lumière, que les physiciens appellent une source primaire' },
        diffusant: { sesMots: 'un objet qui renvoie la lumière reçue', officiel: 'un objet diffusant', lesDeux: 'un objet qui renvoie la lumière reçue, que les physiciens appellent un objet diffusant' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un objet qui fabrique sa lumière, et un objet qui renvoie la lumière reçue. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : une source primaire fabrique sa lumière. Un objet diffusant renvoie la lumière qu’il reçoit.',
        'Tu connais les mots officiels : une source primaire et un objet diffusant.',
      ],
    },

    exercices: [
      qcm('source-ou-diffusant', 'dehors',
        [
          ['Le Soleil.', 'Une source primaire', 'Le Soleil fabrique sa propre lumière.'],
          ['La Lune.', 'Un objet diffusant', 'La Lune ne fabrique rien : elle renvoie la lumière du Soleil.'],
          ['Une bougie allumée.', 'Une source primaire', 'La flamme fabrique sa propre lumière.'],
          ['Un mur blanc éclairé par une lampe.', 'Un objet diffusant', 'Le mur renvoie la lumière de la lampe.'],
          ['Une étoile.', 'Une source primaire', 'Une étoile fabrique sa propre lumière.'],
          ['Le cahier de Rachel, éclairé par sa lampe.', 'Un objet diffusant', 'Le cahier renvoie la lumière de la lampe.'],
        ],
        (x) => x + ' Est-ce une source primaire ou un objet diffusant ?',
        ['Une source primaire', 'Un objet diffusant', 'Ni l’un ni l’autre'],
        'Demande-toi si l’objet fabrique sa lumière, ou s’il renvoie celle d’un autre.'),
      {
        id: 'qui-fabrique-la-lumiere',
        univers: 'famille',
        // [scène, bonne réponse, deux mauvaises réponses, pourquoi]
        versions: [
          ['Rachel allume une torche et regarde son livre. Quel objet fabrique la lumière ?', 'La torche', ['Le livre', 'La table'], 'Le livre ne fait que renvoyer la lumière de la torche.'],
          ['Moussa regarde la Lune. Quel astre fabrique la lumière qui éclaire la Lune ?', 'Le Soleil', ['La Terre', 'La Lune'], 'La Lune renvoie la lumière du Soleil.'],
          ['Aminata regarde le mur éclairé par une bougie. Quel objet fabrique la lumière ?', 'La bougie', ['Le mur', 'Le sol'], 'Le mur renvoie la lumière de la bougie.'],
          ['Laure voit son cahier éclairé par une lampe. Quel objet fabrique la lumière ?', 'La lampe', ['Le cahier', 'Le mur'], 'La lampe fabrique la lumière, le cahier la renvoie.'],
        ],
        genere(c) {
          const [scene, bonne, autres, pourquoi] = c.alea.choisir(this.versions);
          return {
            enonce: scene,
            reponse: choix(c.alea, bonne, autres),
            aide: 'Cherche l’objet qui brille tout seul.',
            correction: [pourquoi, 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'compter-les-sources',
        univers: 'appareils',
        // [liste, nombre de sources primaires, les sources]
        versions: [
          ['le Soleil ; la Lune ; une bougie allumée ; un mur blanc', 2, 'le Soleil et la bougie allumée'],
          ['une étoile ; la planète Vénus ; un cahier ; une lampe éteinte', 1, 'l’étoile'],
          ['un écran de téléphone allumé ; une lampe allumée ; le Soleil ; la Lune', 3, 'l’écran, la lampe et le Soleil'],
          ['un mur ; un cahier ; la Lune ; une vitre', 0, 'aucun objet de la liste'],
          ['une bougie allumée ; une lampe torche allumée ; une étoile ; un mur blanc', 3, 'la bougie, la lampe torche et l’étoile'],
        ],
        genere(c) {
          const [l, n, qui] = c.alea.choisir(this.versions);
          return {
            enonce: 'Voici quatre objets : ' + l + '. Combien sont des sources primaires ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Compte seulement les objets qui fabriquent leur lumière.',
            correction: ['Sources primaires de la liste : ' + qui + '.', 'Réponse : ' + n + '.'],
          };
        },
      },
      {
        id: 'pourquoi-on-voit',
        univers: 'champetre',
        // [question, bonne réponse, deux mauvaises réponses]
        versions: [
          ['Pourquoi voit-on la Lune ?', 'Parce qu’elle renvoie la lumière du Soleil', ['Parce qu’elle fabrique sa propre lumière', 'Parce qu’elle est très chaude']],
          ['Pourquoi voit-on le Soleil ?', 'Parce qu’il fabrique sa propre lumière', ['Parce qu’il renvoie la lumière de la Lune', 'Parce qu’il est un objet diffusant']],
          ['Pourquoi voit-on un mur éclairé par une lampe ?', 'Parce qu’il renvoie la lumière de la lampe', ['Parce qu’il fabrique sa propre lumière', 'Parce qu’il est une source primaire']],
          ['Pourquoi voit-on la flamme d’une bougie ?', 'Parce qu’elle fabrique sa propre lumière', ['Parce qu’elle renvoie la lumière de la pièce', 'Parce qu’elle est un objet diffusant']],
        ],
        genere(c) {
          const [q, bonne, autres] = c.alea.choisir(this.versions);
          return {
            enonce: q,
            reponse: choix(c.alea, bonne, autres),
            aide: 'Demande-toi si l’objet brille tout seul.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      qcm('vrai-ou-faux', 'maison-courses',
        [
          ['La Lune fabrique sa propre lumière.', 'Faux', 'La Lune renvoie la lumière du Soleil.'],
          ['Le Soleil est une source primaire.', 'Vrai', 'Le Soleil fabrique sa lumière.'],
          ['Un mur blanc éclairé est un objet diffusant.', 'Vrai', 'Il renvoie la lumière reçue.'],
          ['Une lampe éteinte est une source primaire.', 'Faux', 'Éteinte, elle ne fabrique plus de lumière.'],
          ['Une étoile renvoie seulement la lumière du Soleil.', 'Faux', 'Une étoile fabrique sa propre lumière.'],
          ['Un cahier éclairé par une lampe renvoie de la lumière.', 'Vrai', 'Le cahier est un objet diffusant.'],
        ],
        (x) => x + ' Vrai ou faux ?', ['Vrai', 'Faux'],
        'Souviens-toi : une source fabrique, un objet diffusant renvoie.'),
    ],

    defi: {
      // [astre diffusant, objet près d'eux, l'objet est une source primaire]
      versions: [['la Lune', 'la lampe allumée', true], ['la planète Vénus', 'le mur éclairé par la lampe', false], ['la Lune', 'le mur éclairé par la lampe', false], ['la planète Vénus', 'la lampe allumée', true]],
      genere(c) {
        const [astre, objet, source] = c.alea.choisir(this.versions);
        const Astre = astre.charAt(0).toUpperCase() + astre.slice(1);
        const Objet = objet.charAt(0).toUpperCase() + objet.slice(1);
        return {
          enonce: 'Ce soir, Rachel et Moussa regardent le ciel depuis la cour. Ils voient ' + astre + ' et une étoile. Près d’eux, il y a ' + objet + '.',
          questions: [
            {
              texte: 'Question 1. Entre ' + astre + ' et l’étoile, laquelle est une source primaire ?',
              reponse: choix(c.alea, 'L’étoile', [Astre, 'Les deux']),
              aide: 'Une source primaire fabrique sa lumière.',
              correction: ['Une étoile fabrique sa lumière. ' + Astre + ' renvoie celle du Soleil.', 'Réponse : L’étoile.'],
            },
            {
              texte: 'Question 2. Pourquoi voit-on ' + astre + ' ?',
              reponse: choix(c.alea, 'Elle renvoie la lumière du Soleil.', ['Elle fabrique sa propre lumière.', 'Elle est une étoile.']),
              aide: 'Pense à un objet diffusant.',
              correction: [Astre + ' est un objet diffusant.', 'Réponse : Elle renvoie la lumière du Soleil.'],
            },
            {
              texte: 'Question 3. Est-ce que ' + objet + ' est une source primaire ?',
              reponse: choix(c.alea, source ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Demande-toi si cet objet fabrique sa lumière.',
              correction: source ? [Objet + ' fabrique sa lumière : c’est une source primaire.', 'Réponse : Oui.'] : [Objet + ' renvoie la lumière de la lampe : ce n’est pas une source primaire.', 'Réponse : Non.'],
            },
            {
              texte: 'Question 4. Explique avec tes mots la différence entre une source primaire et un objet diffusant. Donne un exemple de chaque.',
              correction: ['Une source primaire fabrique sa lumière, par exemple le Soleil.', 'Un objet diffusant renvoie la lumière reçue, par exemple la Lune.'],
              grille: ['As-tu dit qu’une source primaire fabrique sa lumière ?', 'As-tu dit qu’un objet diffusant la renvoie ?', 'As-tu donné un exemple de chaque ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais qui fabrique la lumière et qui la renvoie. La Lune n’a plus de secret pour toi.',
    carte: ['source-ou-diffusant', 'compter-les-sources', 'pourquoi-on-voit'],
    papierDuSoir: { exercices: ['qui-fabrique-la-lumiere', 'compter-les-sources'], defi: true },
    automatismes: [
      {
        id: 'multiples-de-cent',
        versions: [[3], [5], [7], [12]],
        genere(c) { const [n] = c.alea.choisir(this.versions); return { enonce: n + ' × 100 = ?', reponse: { type: 'nombre', valeur: n * 100 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Du Sénégal à l’ouest du Cameroun pousse un arbre, l’élémi, dont la résine sert de bougie de brousse.',
    prenoms: ['Moussa', 'Aminata'],
  };
});
