/* Notion 5 du bloc de technologie « Programmer » : écrire en texte. Le programme de Moussa, en blocs puis en Python.
   Les programmes sont écrits en mots (lisibles au lecteur d’écran), exécutés en code et traduits en Python par js/programme-blocs.js.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'), racine.ProgrammeBlocs || require('../js/programme-blocs.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O, PB) {
  const dit = (v) => ({ dire: { v } });

  // Le texte Python, ligne par ligne, avec le décalage dit en mots (pour le lecteur d’écran).
  const lignesTexte = (prog) => PB.python(prog).map((l, i) => {
    const k = l.length - l.trimStart().length;
    return 'Ligne ' + (i + 1) + (k ? ' (décalée de ' + k + ' espaces)' : ' (non décalée)') + ' : ' + l.trim();
  });
  const texte = (prog) => lignesTexte(prog).join(' ; ');
  // Image : le texte du programme, ligne par ligne, avec sa description complète (blocs puis texte).
  const image = (prog, intro) => ({ dessin: 'programme', lignes: PB.python(prog), description: intro + ' En blocs : ' + PB.enMots(prog) + '. En texte : ' + texte(prog) + '.' });

  // Total de départ, puis n fois p ajouté.
  const boucle = (a, n, p) => [{ mettre: 't', a }, { repeter: n, faire: [{ ajouter: 't', a: p }] }, dit('t')];
  // Dire t dedans ou dehors de la boucle.
  const placer = (n, dedans) => [{ mettre: 't', a: 0 }, { repeter: n, faire: [{ ajouter: 't', a: 2 }].concat(dedans ? [dit('t')] : []) }].concat(dedans ? [] : [dit('t')]);
  // La facture de Moussa : somme des prix, puis remise si le total dépasse le seuil.
  const facture = (liste, s, r) => [
    { liste: 'prix', valeurs: liste },
    { mettre: 'total', a: 0 },
    { pourChaque: 'p', dans: 'prix', faire: [{ ajouter: 'total', a: { v: 'p' } }] },
    { si: { op: '>', g: { v: 'total' }, d: s }, alors: [{ mettre: 'total', a: { op: '−', g: { v: 'total' }, d: r } }] },
    dit('total'),
  ];
  const DEPART = [{ mettre: 'total', a: 0 }, { repeter: 3, faire: [{ ajouter: 'total', a: 5 }] }, dit('total')];

  return {
    id: 'ecriture-texte',
    matiere: 'technologie',
    bloc: 'programmer',
    titre: 'Écrire en texte',
    classe: '3e',
    univers: ['appareils', 'commerce'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Programmer » : passer d’un programme en blocs à un programme écrit en langage textuel (Python).',

    accroche: {
      texte: 'Moussa montre un écran plein de texte. Pas de blocs colorés ici : des lignes écrites, dans un langage pour ordinateur. ' +
        'Rachel reconnaît pourtant son programme de la veille. Chaque bloc est devenu une ligne.',
      image: image(DEPART, 'Le même programme, en blocs puis en texte.'),
    },

    manipulation: {
      type: 'pas-a-pas',
      programme: DEPART,
      enTexte: true,
      entrees: {},
      choix: {},
      essais: 1,
      consigne: 'Lis ces repères, puis joue le programme en blocs. Le texte en dessous dit la même chose. La ligne « fin du bloc » n’y est pas : le décalage suffit.',
      etapes: [
        'Un programme en blocs se lit de haut en bas, ligne après ligne.',
        'Écrit en texte, c’est pareil, mais chaque ligne utilise des mots et des signes.',
        'Le signe égal range une valeur dans une variable.',
        'Les lignes d’un bloc sont poussées vers la droite, avec quatre espaces.',
        'Répéter trois fois s’écrit for i in range(3), si s’écrit if, dire s’écrit print.',
        'Pour comparer, on écrit deux signes égal.',
        'Si tu pousses mal une ligne, le programme change de sens.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde le vide au début de certaines lignes. C’est ' + c.mot('indentation') + '. ' +
        'Regarde une ligne avec un signe égal. C’est ' + c.mot('affectation') + '. ' +
        'L’astuce : le texte dit la même chose que les blocs, mais ici, les espaces comptent.',
    },

    vocabulaire: {
      termes: {
        indentation: { sesMots: 'le vide laissé au début d’une ligne rangée dans un bloc', officiel: 'l’indentation', lesDeux: 'le vide laissé au début d’une ligne rangée dans un bloc, que les informaticiens appellent l’indentation' },
        affectation: { sesMots: 'l’ordre qui range une valeur dans une variable', officiel: 'une affectation', lesDeux: 'l’ordre qui range une valeur dans une variable, que les informaticiens appellent une affectation' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le vide au début d’une ligne, et l’ordre qui range une valeur dans une variable. Les informaticiens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les informaticiens disent : l’indentation, pour le vide au début d’une ligne ; une affectation, pour l’ordre qui range une valeur.',
        'Tu connais les mots officiels : l’indentation range une ligne dans un bloc, et l’affectation range une valeur dans une variable.',
      ],
    },

    exercices: [
      {
        id: 'lire-une-ligne',
        univers: 'appareils',
        // [ce que fait la ligne, variable, nombre]
        versions: [['ajoute', 'total', 5], ['remplace', 'vis', 8], ['affiche', 'caisse', 4], ['ajoute', 'tasses', 2], ['remplace', 'total', 10], ['affiche', 'vis', 6]],
        genere(c) {
          const [type, v, n] = c.alea.choisir(this.versions);
          const bloc = { ajoute: { ajouter: v, a: n }, remplace: { mettre: v, a: n }, affiche: { dire: { v } } }[type];
          const ligne = PB.python([bloc])[0];
          const phrase = { ajoute: 'Elle ajoute ' + n + ' à ' + v, remplace: 'Elle met ' + n + ' dans ' + v + ', sans garder l’ancienne valeur', affiche: 'Elle affiche la valeur de ' + v };
          const autres = Object.keys(phrase).filter((k) => k !== type).map((k) => phrase[k]);
          return {
            enonce: 'Voici une ligne de Python : « ' + ligne + ' ». Que fait cette ligne ?',
            reponse: O.choix(c.alea, phrase[type], autres),
            aide: 'Lis la ligne à voix haute, signe par signe.',
            correction: [type === 'ajoute' ? 'À droite du signe égal, on lit ' + v + ' + ' + n + ' : l’ancienne valeur plus ' + n + '.' : type === 'remplace' ? 'À droite du signe égal, il n’y a que ' + n + ' : la variable prend cette valeur.' : 'Le mot print affiche ce qui est entre parenthèses.', 'Réponse : ' + phrase[type] + '.'],
          };
        },
      },
      {
        id: 'prevoir-le-resultat',
        univers: 'commerce',
        // [valeur de départ, nombre de tours, valeur ajoutée à chaque tour]
        versions: [[2, 3, 5], [10, 4, 3], [0, 5, 2], [7, 2, 6], [1, 6, 4]],
        genere(c) {
          const [a, n, p] = c.alea.choisir(this.versions);
          const prog = boucle(a, n, p);
          const t = PB.executer(prog).dits[0];
          return {
            enonce: 'Voici un programme en Python : ' + texte(prog) + '. Qu’affiche-t-il ?',
            image: image(prog, 'Un programme de ' + PB.python(prog).length + ' lignes.'),
            reponse: { type: 'nombre', valeur: t },
            aide: 'Joue le programme ligne par ligne, comme l’ordinateur.',
            correction: ['t vaut ' + a + ' au départ.', 'La ligne décalée est jouée ' + n + ' fois : elle ajoute ' + p + ' à chaque tour.', a + ' + ' + n + ' × ' + p + ' = ' + t + '.'],
          };
        },
      },
      {
        id: 'indentation-print',
        univers: 'appareils',
        // [nombre de tours, true si print est décalé sous le for]
        versions: [[3, true], [4, false], [5, true], [2, false], [4, true]],
        genere(c) {
          const [n, dedans] = c.alea.choisir(this.versions);
          const prog = placer(n, dedans);
          const k = PB.executer(prog).dits.length;
          return {
            enonce: 'Voici un programme en Python : ' + texte(prog) + '. Combien de lignes le programme affiche-t-il ?',
            image: image(prog, 'Un programme où la ligne print est ' + (dedans ? 'décalée sous le for' : 'non décalée') + '.'),
            reponse: { type: 'nombre', valeur: k },
            aide: 'Regarde quelles lignes sont poussées vers la droite : elles sont répétées.',
            correction: dedans
              ? ['La ligne print est décalée : elle est rangée dans la boucle.', 'La boucle tourne ' + n + ' fois : print est joué ' + n + ' fois.', 'Le programme affiche ' + k + ' lignes.']
              : ['La ligne print n’est pas décalée : elle est après la boucle.', 'Elle n’est jouée qu’une fois.', 'Le programme affiche ' + k + ' ligne.'],
          };
        },
      },
      {
        id: 'trouver-l-erreur',
        univers: 'appareils',
        // [genre de faute, variable, nombre]
        versions: [['colon', 'lumière', 50], ['retrait', 'humidité', 40], ['egal', 'porte', 1], ['colon', 'humidité', 35], ['retrait', 'lumière', 60], ['egal', 'vis', 3]],
        genere(c) {
          const [type, v, n] = c.alea.choisir(this.versions);
          const L = {
            colon: [v + ' = ' + (n - 10), 'if ' + v + ' < ' + n, '    print("lampe")'],
            retrait: [v + ' = ' + (n - 10), 'if ' + v + ' < ' + n + ':', 'print("lampe")'],
            egal: [v + ' = ' + n, 'if ' + v + ' = ' + n + ':', '    print("Ding")'],
          }[type];
          const phrase = {
            colon: 'Il manque les deux-points à la fin de la ligne du if',
            retrait: 'La ligne sous le if n’est pas décalée vers la droite',
            egal: 'Dans le if, il faut deux signes égal pour comparer',
          };
          const lignes = L.map((l, i) => 'Ligne ' + (i + 1) + (l.startsWith(' ') ? ' (décalée de 4 espaces)' : ' (non décalée)') + ' : ' + l.trim()).join(' ; ');
          const autres = Object.keys(phrase).filter((k) => k !== type).map((k) => phrase[k]);
          return {
            enonce: 'Ce programme en Python ne marche pas. ' + lignes + '. Une seule faute s’y cache. Laquelle ?',
            image: { dessin: 'programme', lignes: L, description: 'Un programme de 3 lignes. ' + lignes + '.' },
            reponse: O.choix(c.alea, phrase[type], autres),
            aide: 'Regarde chaque ligne : une seule ne respecte pas les règles du texte.',
            correction: [{
              colon: 'Une ligne if se termine toujours par deux-points, et ici ils manquent.',
              retrait: 'La ligne rangée sous le if doit être décalée de quatre espaces, et ici elle ne l’est pas.',
              egal: 'Un seul signe égal range une valeur ; pour comparer, il en faut deux.',
            }[type], 'Réponse : ' + phrase[type] + '.'],
          };
        },
      },
      {
        id: 'bloc-vers-texte',
        univers: 'appareils',
        // [genre de bloc, variable ou mot, nombre]
        versions: [['ajouter', 'total', 4], ['mettre', 'vis', 7], ['dire', 'total', 0], ['repeter', 'i', 3], ['si', 'lumière', 50], ['parler', 'Bonjour', 0]],
        genere(c) {
          const [type, v, n] = c.alea.choisir(this.versions);
          const bloc = {
            ajouter: { ajouter: v, a: n }, mettre: { mettre: v, a: n }, dire: { dire: { v } }, repeter: { repeter: n, faire: [] },
            si: { si: { op: '<', g: { v }, d: n }, alors: [] }, parler: { dire: { t: v } },
          }[type];
          const juste = PB.python([bloc])[0];
          const faux = {
            ajouter: [v + ' = ' + n, v + ' + ' + n + ' = ' + v],
            mettre: [v + ' == ' + n, n + ' = ' + v],
            dire: ['say(' + v + ')', 'print ' + v],
            repeter: ['for i in ' + n + ':', 'repeat ' + n + ' times'],
            si: ['if ' + v + ' < ' + n, 'if ' + v + ' = ' + n + ':'],
            parler: ['print(' + v + ')', 'print "' + v + '"'],
          }[type];
          return {
            enonce: 'Le bloc « ' + PB.entete(bloc) + ' » doit s’écrire en Python. Quelle est la bonne ligne ?',
            reponse: O.choix(c.alea, juste, faux),
            aide: 'Compare le bloc, mot par mot, avec chaque ligne proposée.',
            correction: [{
              ajouter: 'Pour ajouter, la variable est reprise à droite : on lit ' + v + ' + ' + n + '.',
              mettre: 'Pour mettre une valeur, un seul signe égal : la variable à gauche, la valeur à droite.',
              dire: 'Pour dire, Python utilise print avec des parenthèses.',
              repeter: 'Pour répéter ' + n + ' fois, on écrit for i in range(' + n + ') avec deux-points.',
              si: 'Pour tester, on compare avec le signe plus petit, et la ligne finit par deux-points.',
              parler: 'Pour dire un texte, print prend le texte entre guillemets, dans des parenthèses.',
            }[type], 'Réponse : ' + juste],
          };
        },
      },
    ],

    defi: {
      // [liste des prix en euros, nombre du if, remise en euros]
      versions: [[[12, 8, 15], 30, 5], [[10, 6, 9], 30, 4], [[20, 15, 12], 40, 10], [[9, 7, 5, 6], 30, 3]],
      genere(c) {
        const [liste, s, r] = c.alea.choisir(this.versions);
        const prog = facture(liste, s, r);
        const res = PB.executer(prog);
        const somme = liste.reduce((a, b) => a + b, 0);
        const remise = somme > s;
        const final = res.dits[0];
        return {
          enonce: 'Moussa écrit en Python le calcul de la facture d’un client. Voici son programme : ' + texte(prog) + '. Les prix sont en euros.',
          image: image(prog, 'La facture de Moussa. La liste des prix vaut ' + liste.join(', ') + ', le nombre du if vaut ' + s + ' et la remise vaut ' + r + ' euros.'),
          questions: [
            {
              texte: 'Question 1. Combien vaut total juste après la boucle for, avant le if ?',
              reponse: { type: 'nombre', valeur: somme },
              aide: 'Additionne tous les prix de la liste.',
              correction: [liste.join(' + ') + ' = ' + somme + ' euros.'],
            },
            {
              texte: 'Question 2. La remise est-elle retirée du total ?',
              reponse: O.choix(c.alea, remise ? 'Oui, la remise est retirée' : 'Non, la remise n’est pas retirée', [remise ? 'Non, la remise n’est pas retirée' : 'Oui, la remise est retirée', 'On ne peut pas savoir']),
              aide: 'Compare le total au nombre du if.',
              correction: [remise ? somme + ' est plus grand que ' + s + ' : la ligne décalée sous le if est jouée.' : somme + ' n’est pas plus grand que ' + s + ' : la ligne décalée sous le if n’est pas jouée.', 'Réponse : ' + (remise ? 'Oui, la remise est retirée.' : 'Non, la remise n’est pas retirée.')],
            },
            {
              texte: 'Question 3. Combien d’euros le programme affiche-t-il ?',
              reponse: { type: 'nombre', valeur: final },
              aide: 'Si la remise est retirée, enlève-la du total.',
              correction: [remise ? somme + ' − ' + r + ' = ' + final + ' euros.' : 'Le total ne change pas : ' + final + ' euros.'],
            },
            {
              texte: 'Question 4. Que se passerait-il si la ligne « print(total) » était décalée de quatre espaces, sous le if ? Explique le rôle des espaces.',
              correction: ['La ligne serait rangée dans le if.', 'Elle ne serait jouée que si le total dépasse ' + s + ' : sinon, rien ne serait affiché.', 'Les espaces au début d’une ligne disent à quel bloc elle appartient.'],
              grille: ['As-tu dit que print ne serait joué que si la condition est vraie ?', 'As-tu dit que les espaces rangent la ligne dans le if ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu lis un programme écrit en texte, et tu sais où chaque ligne est rangée.',
    carte: ['lire-une-ligne', 'indentation-print', 'trouver-l-erreur'],
    papierDuSoir: { exercices: ['prevoir-le-resultat', 'bloc-vers-texte'], defi: true },
    automatismes: [
      {
        id: 'ligne-simple',
        versions: [[3, 4], [5, 2], [6, 3], [8, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'En Python : t = ' + a + ', puis t = t + ' + b + '. Que vaut t ?', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Soronko Academy, au Ghana, a formé plus de 20 000 femmes et filles au code.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
