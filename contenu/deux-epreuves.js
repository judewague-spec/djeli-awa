/* Notion du bloc « Données, probabilités, programmation » : deux épreuves, arbre ou tableau. Les deux pièces de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const IMG = { dessin: 'arbre-proba', etages: [['P', 'F'], ['P', 'F']], description: 'Un arbre à deux étages. Premier lancer : pile ou face. Deuxième lancer : pile ou face. Il y a quatre chemins : pile et pile, pile et face, face et pile, face et face.' };
  const verbe = (x) => (/roue/.test(x) ? 'fait tourner ' : 'lance ');
  // « une pièce, puis un dé » devient « lance une pièce, puis un dé » ; une roue demande « fait tourner ».
  const gestes = (ep) => {
    if (/^tire/.test(ep)) return ep;
    let dernier = '';
    return ep.split(', puis ').map((x) => { const v = verbe(x); const t = (v === dernier ? '' : v) + x; dernier = v; return t; }).join(', puis ');
  };
  const SOMMES = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1 };

  return {
    id: 'deux-epreuves',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Deux épreuves',
    classe: '3e',
    univers: ['commerce', 'dehors'],

    accroche: {
      texte: 'Moussa lance deux pièces au marché. Pile ou face, puis encore pile ou face. ' +
        'Quels résultats sont possibles ? Un arbre les range tous, sans en oublier. Chaque chemin est un résultat.',
      image: IMG,
    },

    manipulation: {
      image: IMG,
      etapes: [
        'On lance une première pièce : elle donne pile ou face. Ce sont les deux premières branches.',
        'Pour chaque résultat du premier lancer, la seconde pièce donne encore pile ou face.',
        'Chaque chemin de l’arbre, de gauche à droite, est un résultat possible.',
        'Pour compter les chemins, multiplie le nombre de branches de chaque étage.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde un chemin de l’arbre, de gauche à droite. C’est ' + c.mot('issue') + '. ' +
        'Regarde les quatre chemins de l’arbre. Ce sont ' + c.mot('equiprobables') + '. La pièce ne triche pas. ' +
        'L’astuce : pour une probabilité, compte les bons chemins, puis divise par tous les chemins.',
    },

    vocabulaire: {
      termes: {
        issue: { sesMots: 'un résultat possible', officiel: 'une issue', lesDeux: 'un résultat possible, que l’on appelle une issue' },
        equiprobables: { sesMots: 'des résultats à chances égales', officiel: 'des issues équiprobables', lesDeux: 'des résultats à chances égales, que l’on appelle des issues équiprobables' },
      },
      textes: [
        'Pour l’instant, garde tes mots : un résultat possible, et des résultats à chances égales. ' +
          'Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : une issue, pour un résultat possible. Des résultats à chances égales s’appellent des issues équiprobables.',
        'Tu connais les mots officiels : une issue, et des issues équiprobables.',
      ],
    },

    exercices: [
      {
        id: 'compter-resultats',
        univers: 'commerce',
        // [première épreuve, nombre de résultats, seconde épreuve, nombre de résultats]
        versions: [['une pièce', 2, 'un dé à 6 faces', 6], ['une pièce', 2, 'une autre pièce', 2], ['un dé à 6 faces', 6, 'une pièce', 2], ['une roue à 4 couleurs', 4, 'une pièce', 2], ['une roue à 3 couleurs', 3, 'un dé à 6 faces', 6], ['un dé à 6 faces', 6, 'un autre dé à 6 faces', 6]],
        genere(c) {
          const [a, na, b, nb] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa ' + gestes(a + ', puis ' + b) + '. Combien de résultats possibles y a-t-il en tout ?',
            reponse: { type: 'nombre', valeur: na * nb },
            aide: 'Dessine l’arbre. Multiplie le nombre de branches du premier étage par celui du second.',
            correction: ['Premier étage : ' + na + ' branches. Second étage : ' + nb + ' branches pour chacune.', na + ' × ' + nb + ' = ' + na * nb + ' résultats.'],
          };
        },
      },
      {
        id: 'probabilite-deux-epreuves',
        univers: 'commerce',
        // [épreuves, événement, résultats favorables, résultats en tout, résultats qui réalisent l’événement, légende]
        versions: [['une pièce, puis une autre pièce', 'deux fois pile', 1, 4, 'PP', 'P pour pile, F pour face.'], ['une pièce, puis une autre pièce', 'une fois pile et une fois face, dans un ordre ou dans l’autre', 2, 4, 'PF et FP', 'P pour pile, F pour face.'], ['une pièce, puis un dé à 6 faces', 'pile, puis un nombre pair', 3, 12, 'P2, P4 et P6', 'P pour pile, puis le numéro du dé.'], ['une pièce, puis un dé à 6 faces', 'face, puis un 6', 1, 12, 'F6', 'F pour face, puis le numéro du dé.'], ['un dé à 6 faces, puis une pièce', 'un nombre plus grand que 4, puis pile', 2, 12, '5P et 6P', 'le numéro du dé, puis P pour pile.'], ['une roue à 3 couleurs, puis une pièce', 'rouge, puis face', 1, 6, 'RF', 'R pour rouge, F pour face.'],
          ['un dé rouge, puis un dé vert', 'une somme égale à 5', 4, 36, '1+4, 2+3, 3+2 et 4+1', 'dé rouge, puis dé vert. Le tableau à double entrée range les 36 résultats.'],
          ['tire un jeton d’un sac (rouge, jaune, vert), le garde, puis en tire un autre', 'le premier jeton est rouge', 2, 6, 'RJ et RV', 'R pour rouge, J pour jaune, V pour vert. Le jeton gardé ne revient pas dans le sac.']],
        genere(c) {
          const [ep, ev, f, t, chemins, legende] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa ' + gestes(ep) + '. Tous les résultats ont les mêmes chances. Quelle est la probabilité de l’événement « ' + ev + ' » ?',
            reponse: { type: 'fraction', valeur: [f, t] },
            aide: t === 36 ? 'Dresse un tableau à double entrée : un dé en lignes, l’autre en colonnes. Compte les cases qui réalisent l’événement.' : 'Compte les chemins qui réalisent l’événement. Divise par le nombre de chemins en tout.',
            correction: ['Il y a ' + t + ' résultats en tout.', f + (f > 1 ? ' résultats réalisent' : ' résultat réalise') + ' l’événement : ' + chemins + '. (' + legende + ')', 'La probabilité est ' + f + '/' + t + '.'],
          };
        },
      },
      {
        id: 'resultat-impossible',
        univers: 'dehors',
        // [épreuves, résultat impossible, résultat possible 1, résultat possible 2]
        versions: [['une pièce, puis un dé à 6 faces', 'face, puis 7', 'pile, puis 4', 'face, puis 6'], ['un dé à 6 faces, puis une pièce', '7, puis face', '3, puis pile', '6, puis face'], ['une roue rouge, jaune et verte, puis une pièce', 'bleu, puis pile', 'rouge, puis face', 'vert, puis pile'], ['deux pièces', 'pile, puis un 2', 'face, puis pile', 'pile, puis face'], ['une roue à 4 secteurs numérotés de 1 à 4, puis une pièce', '5, puis pile', '2, puis face', '4, puis pile']],
        genere(c) {
          const [ep, imp, p1, p2] = c.alea.choisir(this.versions);
          return {
            enonce: 'Rachel ' + gestes(ep) + '. Quel résultat est impossible ?',
            reponse: O.choix(c.alea, imp, [p1, p2]),
            aide: 'Un résultat impossible n’est sur aucun chemin de l’arbre.',
            correction: ['Les résultats « ' + p1 + ' » et « ' + p2 + ' » sont sur des chemins de l’arbre.', '« ' + imp + ' » n’est sur aucun chemin : il est impossible.'],
          };
        },
      },
      {
        id: 'somme-deux-des',
        univers: 'commerce',
        // [somme demandée]
        versions: [[2], [7], [4], [10], [11], [12]],
        genere(c) {
          const [s] = c.alea.choisir(this.versions);
          const f = SOMMES[s];
          const liste = [];
          for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) liste.push(a + '+' + b);
          return {
            enonce: 'Moussa lance deux dés à 6 faces, un rouge et un vert. Il fait la somme des deux faces. Quelle est la probabilité d’obtenir une somme de ' + s + ' ? Les 36 résultats ont les mêmes chances.',
            reponse: { type: 'fraction', valeur: [f, 36] },
            aide: 'Dresse le tableau des 36 sommes. Compte les cases qui donnent la somme demandée.',
            correction: ['Les couples (rouge + vert) qui font ' + s + ' sont : ' + liste.join(' ; ') + '.', 'Il y en a ' + f + ', sur 36 résultats en tout.', 'La probabilité est ' + f + '/36.'],
          };
        },
      },
      {
        id: 'probabilite-perdre',
        univers: 'dehors',
        // [épreuves, événement gagnant, résultats gagnants, résultats en tout]
        versions: [['une pièce, puis un dé à 6 faces', 'face, puis un 6', 1, 12], ['deux dés à 6 faces', 'deux faces identiques', 6, 36], ['une roue à 4 couleurs, puis une pièce', 'rouge, puis pile', 1, 8], ['une pièce, puis une autre pièce', 'deux fois face', 1, 4], ['une pièce, puis un dé à 6 faces', 'pile, puis un nombre impair', 3, 12]],
        genere(c) {
          const [ep, ev, f, t] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au jeu de Moussa, on ' + gestes(ep) + '. On gagne avec « ' + ev + ' ». Tous les résultats ont les mêmes chances. Quelle est la probabilité de perdre ?',
            reponse: { type: 'fraction', valeur: [t - f, t] },
            aide: 'Perdre, c’est l’événement contraire de gagner. Compte les chemins qui ne gagnent pas.',
            correction: ['Il y a ' + t + ' résultats en tout, dont ' + f + (f > 1 ? ' qui gagnent.' : ' qui gagne.'), t + ' − ' + f + ' = ' + (t - f) + ' résultats perdants.', 'La probabilité de perdre est ' + (t - f) + '/' + t + '.'],
          };
        },
      },
    ],

    defi: {
      // [premières branches, secondes branches, événement gagnant, résultats gagnants, description des branches, chemins gagnants]
      versions: [
        [['P', 'F'], ['1', '2', '3'], 'pile, puis un nombre impair', 2, 'P pour pile, F pour face, puis un nombre de 1 à 3', 'P1 et P3'],
        [['P', 'F'], ['1', '2', '3'], 'pile, puis n’importe quel nombre', 3, 'P pour pile, F pour face, puis un nombre de 1 à 3', 'P1, P2 et P3'],
        [['R', 'J', 'V'], ['P', 'F'], 'rouge ou jaune, puis n’importe quelle face de la pièce', 4, 'R pour rouge, J pour jaune, V pour vert, puis P pour pile ou F pour face', 'RP, RF, JP et JF'],
        [['P', 'F'], ['1', '2', '3'], 'face, puis un 3', 1, 'P pour pile, F pour face, puis un nombre de 1 à 3', 'F3'],
      ],
      genere(c) {
        const [A, B, ev, f, legende, chemins] = c.alea.choisir(this.versions);
        const t = A.length * B.length;
        const juste = f * 2 > t ? 'Gagner' : f * 2 < t ? 'Perdre' : 'Autant';
        const premier = A.length === 2 ? 'une pièce' : 'une roue à 3 couleurs';
        const second = A.length === 2 ? 'une roue à 3 numéros' : 'une pièce';
        return {
          enonce: 'À la tombola de Moussa, on ' + gestes(premier + ', puis ' + second) + '. Tous les résultats ont les mêmes chances. On gagne avec « ' + ev + ' ». Voici l’arbre : ' + legende + '.',
          image: { dessin: 'arbre-proba', etages: [A, B], description: 'Un arbre à deux étages. Premier étage : ' + A.join(', ') + '. Second étage : ' + B.join(', ') + '. Il y a ' + t + ' chemins en tout.' },
          questions: [
            {
              texte: 'Question 1. Combien y a-t-il de résultats possibles en tout ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Multiplie le nombre de branches de chaque étage.',
              correction: [A.length + ' × ' + B.length + ' = ' + t + ' résultats.'],
            },
            {
              texte: 'Question 2. Quelle est la probabilité de gagner ?',
              reponse: { type: 'fraction', valeur: [f, t] },
              aide: 'Compte les chemins gagnants. Divise par le nombre de chemins en tout.',
              correction: [f + (f > 1 ? ' chemins gagnent' : ' chemin gagne') + ', sur ' + t + '.', 'La probabilité de gagner est ' + f + '/' + t + '.'],
            },
            {
              texte: 'Question 3. Y a-t-il plus de chances de gagner, plus de chances de perdre, ou autant ?',
              reponse: O.choix(c.alea, juste, ['Gagner', 'Perdre', 'Autant']),
              aide: 'Compare le nombre de chemins gagnants au nombre de chemins perdants.',
              correction: [f + (f > 1 ? ' chemins gagnants' : ' chemin gagnant') + ' et ' + (t - f) + (t - f > 1 ? ' chemins perdants.' : ' chemin perdant.'), 'Réponse : ' + juste + '.'],
            },
            {
              texte: 'Question 4. Liste tous les chemins gagnants de l’arbre, puis explique comment tu trouves la probabilité de gagner.',
              correction: ['On écrit chaque chemin gagnant avec une lettre par étage.', (f > 1 ? 'Les ' + f + ' chemins gagnants sont : ' : 'Le chemin gagnant est : ') + chemins + '.', 'La probabilité est le nombre de chemins gagnants, divisé par ' + t + ' : ' + f + '/' + t + '.'],
              grille: ['As-tu écrit chaque chemin gagnant, sans en oublier ?', 'As-tu compté le nombre de chemins en tout ?', 'As-tu écrit la probabilité comme une fraction ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avec un arbre, tu ranges tous les résultats et tu comptes les bons chemins sans en oublier.',
    carte: ['compter-resultats', 'probabilite-deux-epreuves', 'resultat-impossible'],
    papierDuSoir: { exercices: ['probabilite-deux-epreuves', 'probabilite-perdre'], defi: true },
    automatismes: [
      {
        id: 'compter-chemins',
        versions: [[2, 3], [3, 4], [2, 6], [4, 5]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return { enonce: 'Un arbre a ' + a + ' branches au premier étage et ' + b + ' branches sur chacune au second. Combien de chemins ?', reponse: { type: 'nombre', valeur: a * b } };
        },
      },
    ],
    savaisTu: 'Le savais-tu ? Aux Pays-Bas, Christiaan Huygens a écrit en 1657 le premier livre imprimé de probabilités.',
    prenoms: ['Moussa', 'Rachel'],
  };
});
