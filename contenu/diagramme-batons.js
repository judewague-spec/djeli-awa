/* Notion du bloc « Données, probabilités, programmation » : le diagramme en bâtons. Les clients du marché.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi'];
  const JUS = ['bissap', 'gingembre', 'baobab', 'ananas'];
  const voyelle = (m) => /^[aeiouyéèh]/i.test(m);
  const le = (m) => (voyelle(m) ? 'l’' : 'le ') + m;
  const du = (m) => (voyelle(m) ? 'de l’' : 'du ') + m;
  const IMG = { dessin: 'batons', valeurs: [['lundi', 20], ['mardi', 30], ['mercredi', 25]], axe: 'Clients par jour', description: 'Un diagramme en bâtons. Lundi, 20 clients. Mardi, 30 clients. Mercredi, 25 clients. Le bâton du mardi est le plus haut.' };

  return {
    id: 'diagramme-batons',
    matiere: 'maths',
    bloc: 'donnees-probabilites',
    titre: 'Le diagramme en bâtons',
    classe: '4e',
    univers: ['commerce', 'champetre'],

    accroche: {
      texte: 'Rebecca compte les clients du marché. Chaque jour, elle dresse un bâton. Lundi, 20 clients. Mardi, 30. Mercredi, 25. ' +
        'Plus le bâton est haut, plus il y a de monde. D’un coup d’œil, on voit le jour le plus chargé.',
      image: IMG,
    },

    manipulation: {
      image: IMG,
      etapes: [
        'Chaque bâton est un jour. Son nom est écrit en dessous.',
        'Le nombre écrit au-dessus du bâton dit combien de clients sont venus ce jour-là.',
        'Le bâton le plus haut montre le jour le plus chargé. Ici, c’est le mardi, avec 30 clients.',
        'Pour savoir combien de clients en tout, ajoute les nombres de tous les bâtons : 20, plus 30, plus 25.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde en bas. C’est ' + c.mot('axe') + '. Au-dessus de chaque bâton, lis le nombre. C’est ' + c.mot('effectif') + '. ' +
        'Plus le bâton est haut, plus ce nombre est grand. Pour comparer, regarde les hauteurs. Pour tout compter, ajoute les nombres.',
    },

    vocabulaire: {
      termes: {
        axe: { sesMots: 'la ligne qui porte les noms', officiel: 'l’axe horizontal', lesDeux: 'la ligne qui porte les noms, que l’on appelle l’axe horizontal' },
        effectif: { sesMots: 'combien il y en a pour ce bâton', officiel: 'l’effectif', lesDeux: 'combien il y en a pour ce bâton, que l’on appelle l’effectif' },
      },
      textes: [
        'Pour l’instant, garde tes mots : la ligne qui porte les noms, et combien il y en a pour ce bâton. Les matheux ont des mots à eux : je te les dirai la prochaine fois.',
        'Les matheux disent : l’axe horizontal, pour la ligne qui porte les noms. Combien il y en a pour un bâton s’appelle l’effectif.',
        'Tu connais les mots officiels : l’axe horizontal et l’effectif.',
      ],
    },

    exercices: [
      {
        id: 'lire-un-baton',
        univers: 'commerce',
        // [lundi, mardi, mercredi, jeudi, position du jour demandé]
        versions: [[20, 30, 25, 35, 2], [15, 40, 30, 20, 1], [50, 45, 60, 55, 3], [12, 18, 24, 16, 0], [28, 22, 36, 30, 2], [45, 38, 52, 41, 1]],
        genere(c) {
          const [a, b, d, e, k] = c.alea.choisir(this.versions);
          const v = [a, b, d, e][k];
          return {
            enonce: 'Un diagramme en bâtons montre les clients du marché. Lundi : ' + a + '. Mardi : ' + b + '. Mercredi : ' + d + '. Jeudi : ' + e + '. Combien de clients sont venus ' + JOURS[k] + ' ?',
            reponse: { type: 'nombre', valeur: v },
            aide: 'Trouve le bâton du bon jour et lis son nombre.',
            correction: ['Le bâton de ' + JOURS[k] + ' porte le nombre ' + v + '.'],
          };
        },
      },
      {
        id: 'jour-le-plus-haut',
        univers: 'commerce',
        // [lundi, mardi, mercredi, jeudi, 'plus' ou 'moins']
        versions: [[20, 30, 25, 35, 'plus'], [15, 40, 30, 20, 'moins'], [50, 45, 60, 55, 'plus'], [12, 18, 24, 16, 'moins'], [28, 22, 36, 30, 'moins'], [45, 38, 52, 41, 'plus']],
        genere(c) {
          const [a, b, d, e, s] = c.alea.choisir(this.versions);
          const l = [a, b, d, e];
          const cible = s === 'plus' ? Math.max(...l) : Math.min(...l);
          const juste = JOURS[l.indexOf(cible)];
          return {
            enonce: 'Un diagramme en bâtons montre les clients du marché. Lundi : ' + a + '. Mardi : ' + b + '. Mercredi : ' + d + '. Jeudi : ' + e + '. Quel jour a le bâton le plus ' + (s === 'plus' ? 'haut' : 'bas') + ' ?',
            reponse: O.choix(c.alea, juste, JOURS.filter((x) => x !== juste)),
            aide: 'Le bâton le plus ' + (s === 'plus' ? 'haut' : 'bas') + ' porte le nombre le plus ' + (s === 'plus' ? 'grand' : 'petit') + '.',
            correction: ['On compare ' + a + ', ' + b + ', ' + d + ' et ' + e + '.', 'Le plus ' + (s === 'plus' ? 'grand' : 'petit') + ' est ' + cible + ' : c’est ' + juste + '.'],
          };
        },
      },
      {
        id: 'ecart-hauteurs',
        univers: 'champetre',
        // [bissap, gingembre, baobab, ananas] : bouteilles vendues
        versions: [[24, 36, 18, 30], [15, 22, 40, 28], [50, 35, 45, 20], [12, 27, 33, 21], [64, 48, 72, 56]],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const mx = Math.max(...l), mn = Math.min(...l);
          return {
            enonce: 'Un diagramme en bâtons montre les bouteilles de jus vendues. Bissap : ' + l[0] + '. Gingembre : ' + l[1] + '. Baobab : ' + l[2] + '. Ananas : ' + l[3] + '. Quelle est la différence entre le plus grand et le plus petit effectif ?',
            reponse: { type: 'nombre', valeur: mx - mn },
            aide: 'Trouve le plus grand nombre et le plus petit, puis enlève.',
            correction: ['Le plus grand est ' + mx + '. Le plus petit est ' + mn + '.', mx + ' − ' + mn + ' = ' + (mx - mn) + '.'],
          };
        },
      },
      {
        id: 'total-batons',
        univers: 'commerce',
        // [lundi, mardi, mercredi, jeudi]
        versions: [[20, 30, 25, 35], [15, 40, 30, 20], [50, 45, 60, 55], [12, 18, 24, 16], [28, 22, 36, 30]],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const t = l[0] + l[1] + l[2] + l[3];
          return {
            enonce: 'Un diagramme en bâtons montre les clients du marché. Lundi : ' + l[0] + '. Mardi : ' + l[1] + '. Mercredi : ' + l[2] + '. Jeudi : ' + l[3] + '. Combien de clients sont venus en tout ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Ajoute les nombres de tous les bâtons.',
            correction: [l.join(' + ') + ' = ' + t + ' clients.'],
          };
        },
      },
      {
        id: 'depasser-un-seuil',
        univers: 'champetre',
        // [lundi, mardi, mercredi, jeudi, seuil]
        versions: [[20, 30, 25, 35, 28], [15, 40, 30, 20, 25], [50, 45, 60, 55, 48], [12, 18, 24, 16, 17], [28, 22, 36, 30, 29], [45, 38, 52, 41, 40]],
        genere(c) {
          const [a, b, d, e, s] = c.alea.choisir(this.versions);
          const l = [a, b, d, e], n = l.filter((x) => x > s).length;
          return {
            enonce: 'Un diagramme en bâtons montre les clients du marché. Lundi : ' + a + '. Mardi : ' + b + '. Mercredi : ' + d + '. Jeudi : ' + e + '. Combien de jours ont eu plus de ' + s + ' clients ?',
            reponse: { type: 'nombre', valeur: n },
            aide: 'Regarde chaque bâton : dépasse-t-il ce nombre ?',
            correction: ['On garde les nombres plus grands que ' + s + ' : ' + (n === 0 ? 'aucun.' : l.filter((x) => x > s).join(', ') + '.'), n === 0 ? 'Aucun bâton ne dépasse.' : n === 1 ? 'Un seul bâton dépasse.' : n + ' bâtons dépassent.'],
          };
        },
      },
    ],

    defi: {
      // [bissap, gingembre, baobab, ananas] : bouteilles vendues dans la semaine
      versions: [[24, 36, 18, 30], [15, 22, 40, 28], [50, 35, 45, 20], [32, 27, 14, 41]],
      genere(c) {
        const l = c.alea.choisir(this.versions);
        const mx = Math.max(...l), mn = Math.min(...l), jus = JUS[l.indexOf(mx)], t = l[0] + l[1] + l[2] + l[3];
        return {
          enonce: 'Laure vend quatre jus au marché. Rebecca trace le diagramme en bâtons des bouteilles vendues dans la semaine. Bissap : ' + l[0] + '. Gingembre : ' + l[1] + '. Baobab : ' + l[2] + '. Ananas : ' + l[3] + '.',
          image: { dessin: 'batons', valeurs: [['Bissap', l[0]], ['Gingembre', l[1]], ['Baobab', l[2]], ['Ananas', l[3]]], axe: 'Bouteilles vendues', description: 'Un diagramme en bâtons. Bissap, ' + l[0] + ' bouteilles. Gingembre, ' + l[1] + '. Baobab, ' + l[2] + '. Ananas, ' + l[3] + '.' },
          questions: [
            {
              texte: 'Question 1. Quel jus a le bâton le plus haut ?',
              reponse: O.choix(c.alea, jus, JUS.filter((x) => x !== jus)),
              aide: 'Cherche le plus grand nombre.',
              correction: ['Le plus grand nombre est ' + mx + ' : c’est ' + le(jus) + '.'],
            },
            {
              texte: 'Question 2. Quelle est la différence entre le bâton le plus haut et le plus bas ?',
              reponse: { type: 'nombre', valeur: mx - mn },
              aide: 'Enlève le plus petit nombre au plus grand.',
              correction: [mx + ' − ' + mn + ' = ' + (mx - mn) + ' bouteilles.'],
            },
            {
              texte: 'Question 3. Combien de bouteilles Laure a-t-elle vendues en tout ?',
              reponse: { type: 'nombre', valeur: t },
              aide: 'Ajoute les quatre nombres.',
              correction: [l.join(' + ') + ' = ' + t + ' bouteilles.'],
            },
            {
              texte: 'Question 4. Laure veut commander plus de bouteilles pour la semaine suivante. Quel jus lui conseilles-tu de commander en plus grande quantité ? Justifie avec le diagramme.',
              correction: ['Le bâton le plus haut est celui ' + du(jus) + ', avec ' + mx + ' bouteilles vendues.', 'On conseille donc de commander plus ' + (voyelle(jus) ? 'd’' : 'de ') + jus + '.'],
              grille: ['As-tu nommé le jus dont le bâton est le plus haut ?', 'As-tu cité son effectif ?', 'As-tu écrit une phrase complète pour conseiller Laure ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu lis les hauteurs, tu compares, tu ajoutes : un diagramme en bâtons n’a plus de secret pour toi.',
    carte: ['lire-un-baton', 'jour-le-plus-haut', 'total-batons'],
    papierDuSoir: { exercices: ['ecart-hauteurs', 'depasser-un-seuil'], defi: true },
    automatismes: [
      {
        id: 'ecart-rapide',
        versions: [[30, 20], [45, 25], [60, 35], [52, 28]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: 'Un bâton à ' + a + ', un autre à ' + b + '. Quelle est la différence ?', reponse: { type: 'nombre', valeur: a - b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? L’Écossais William Playfair a inventé le diagramme en bâtons, pour montrer le commerce de l’Écosse.',
    prenoms: ['Rebecca', 'Laure'],
  };
});
