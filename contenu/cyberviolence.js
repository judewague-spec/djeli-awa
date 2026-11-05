/* Notion 7 du bloc de technologie « Le numérique et l'intelligence artificielle » : la cyberviolence. Le groupe de discussion d'Aminata.
   Situations sobres, avec toujours la conduite à tenir et à qui en parler, le 3018 en France : consigne du 2 nov. 2026.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const CONDUITE = ['Ne pas répondre', 'Garder des preuves', 'Bloquer et signaler', 'En parler à un adulte, ou au 3018'];

  return {
    id: 'cyberviolence',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'La cyberviolence',
    classe: '4e',
    univers: ['famille', 'appareils'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : cyberviolence, comportements responsables. Ressource : numéro national 3018, République française et association e-Enfance.',

    accroche: {
      texte: 'Dans un groupe de messages de sa classe, Aminata voit des moqueries sur une camarade, jour après jour. Certains rient, d’autres se taisent. Aminata ne sait pas quoi faire, et elle n’aime pas ça. ' +
        'Ce qu’elle ressent compte. Et il existe de bons gestes.',
      image: { dessin: 'chaine', etapes: CONDUITE, description: 'Les bons gestes, dans l’ordre : ne pas répondre ; garder des preuves ; bloquer et signaler ; en parler à un adulte, ou au trente dix-huit.' },
    },

    manipulation: {
      image: { dessin: 'facture', titre: 'À qui en parler', lignes: [['Un parent', 'à la maison'], ['Un adulte du collège', 'à l’école'], ['Le 3018', 'gratuit et confidentiel']], description: 'À qui en parler : un parent à la maison ; un adulte du collège ; et le trente dix-huit, un numéro gratuit et confidentiel.' },
      etapes: [
        'Quand des messages blessants se répètent en ligne, ce n’est pas un jeu. Celle qui les reçoit n’a rien à se reprocher.',
        'D’abord, ne réponds pas : cela évite de nourrir l’attaque. Puis fais des captures d’écran de la conversation, pour garder des preuves. Ne les renvoie à personne.',
        'Ensuite, bloque, et signale le compte sur le réseau.',
        'Surtout, parles-en à un adulte de confiance. En France, tu peux aussi appeler le 3018 : c’est gratuit et confidentiel.',
        'Si tu vois cela sans être visée, ne partage pas, ne ris pas, et aide la personne à en parler. Ton geste compte.',
      ],
    },

    decouverte: {
      texte: (c) => 'Des messages blessants qui se répètent, c’est ' + c.mot('cyberharcelement') + '. Cela blesse vraiment, et c’est puni par la loi. ' +
        'Sans être visée, tu es parfois ' + c.mot('temoin') + '. Tu peux agir. ' +
        'L’astuce : ne réponds pas, garde des preuves, signale, et parles-en. En France, le 3018 t’écoute.',
    },

    vocabulaire: {
      termes: {
        cyberharcelement: { sesMots: 'une attaque en ligne', officiel: 'du cyberharcèlement', lesDeux: 'une attaque en ligne, que l’on appelle du cyberharcèlement' },
        temoin: { sesMots: 'celle qui voit', officiel: 'témoin', lesDeux: 'celle qui voit, que l’on appelle un témoin' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’attaque en ligne, et celle qui voit. ' +
          'La loi a des mots à elle : je te les dirai la prochaine fois.',
        'La loi dit : le cyberharcèlement, pour l’attaque en ligne. Et un témoin, pour celle qui voit.',
        'Tu connais les mots officiels : la cyberviolence, le cyberharcèlement et le témoin.',
      ],
    },

    exercices: [
      {
        id: 'geste-suivant',
        univers: 'appareils',
        versions: [0, 1, 2],
        genere(c) {
          const i = c.alea.choisir(this.versions);
          const bonne = CONDUITE[i + 1];
          return {
            enonce: 'Quel bon geste vient juste après celui-ci : « ' + CONDUITE[i] + ' » ?',
            reponse: O.choix(c.alea, bonne, CONDUITE.filter((_, k) => k !== i)),
            aide: 'Ne pas répondre, garder des preuves, bloquer et signaler, puis en parler.',
            correction: ['L’ordre : ' + CONDUITE.join(', puis ').toLowerCase() + '.', 'Réponse : ' + bonne + '.'],
          };
        },
      },
      Q('que-faire', 'famille',
        [['Tu reçois chaque jour des messages blessants.', 'En parler à un adulte de confiance'], ['Une camarade reçoit ces messages, et elle a honte. Tu veux l’aider.', 'En parler à un adulte de confiance'], ['Une photo gênante de toi circule dans un groupe.', 'En parler à un adulte de confiance']],
        (x) => x + ' Que faire ?', ['En parler à un adulte de confiance', 'Partager pour faire rire', 'Répondre avec des insultes'],
        'Personne ne doit rester seule avec cela.',
        'Celle qui subit, comme celle qui voit, peut en parler. Personne ne doit rester seule : un parent, un adulte du collège, ou le 3018 peuvent aider.'),
      Q('quel-numero', 'appareils',
        [['Quel numéro appeler en France, gratuitement et de façon confidentielle, en cas de cyberharcèlement ?', 'Le 3018'], ['En France, quel numéro écoute les jeunes victimes de violences en ligne ?', 'Le 3018']],
        (x) => x, ['Le 3018', 'Le 15', 'Le 12'],
        'Ce numéro a quatre chiffres.',
        'Le 3018 est le numéro national contre les violences numériques : il est gratuit et confidentiel.'),
      {
        id: 'partage-qui-grossit',
        univers: 'appareils',
        // [premiers lecteurs, fois que le message est partagé, chaque fois à combien de personnes en plus]
        versions: [[5, 2, 2], [3, 3, 2], [10, 2, 3], [4, 2, 5], [2, 4, 2], [5, 3, 2]],
        genere(c) {
          const [d, n, x] = c.alea.choisir(this.versions);
          const f = d * x ** n;
          return {
            enonce: 'Une moquerie est lue par ' + d + ' personnes. Puis le nombre de lecteurs est multiplié par ' + x + ', ' + n + ' fois de suite. Combien de personnes l’ont lue à la fin ?',
            reponse: { type: 'nombre', valeur: f },
            aide: 'Multiplie par ' + x + ', ' + n + ' fois de suite.',
            aideParlee: 'Multiplie autant de fois que le message est partagé.',
            correction: [d + ' × ' + Array(n).fill(x).join(' × ') + ' = ' + f + ' personnes. Ne pas partager, c’est arrêter cela.'],
          };
        },
      },
      {
        id: 'temoins-qui-agissent',
        univers: 'famille',
        // [élèves du groupe, qui se taisent]
        versions: [[25, 15], [30, 20], [20, 12], [28, 21], [24, 18], [32, 25]],
        genere(c) {
          const [n, s] = c.alea.choisir(this.versions);
          return {
            enonce: 'Dans un groupe de ' + n + ' élèves, ' + s + ' voient une moquerie et ne font rien. Les autres préviennent un adulte. Combien d’élèves préviennent un adulte ?',
            reponse: { type: 'nombre', valeur: n - s },
            aide: 'Calcule ' + n + ' − ' + s + '.',
            aideParlee: 'Enlève ceux qui ne font rien au nombre d’élèves.',
            correction: [n + ' − ' + s + ' = ' + (n - s) + ' élèves.'],
          };
        },
      },
    ],

    defi: {
      // [élèves du groupe, élèves qui ont partagé]
      versions: [[25, 5], [30, 6], [20, 4], [40, 10]],
      genere(c) {
        const [n, p] = c.alea.choisir(this.versions);
        return {
          enonce: 'Situation : dans le groupe de messages d’une classe de ' + n + ' élèves, une photo gênante d’une camarade circule depuis plusieurs jours. ' + p + ' élèves l’ont partagée. Cette camarade ne vient plus en cours.',
          questions: [
            {
              texte: 'Question 1. Combien d’élèves du groupe n’ont pas partagé la photo ?',
              reponse: { type: 'nombre', valeur: n - p },
              aide: 'Enlève ceux qui ont partagé au nombre d’élèves.',
              correction: [n + ' − ' + p + ' = ' + (n - p) + ' élèves.'],
            },
            {
              texte: 'Question 2. Quel pourcentage des élèves a partagé la photo ?',
              reponse: { type: 'nombre', valeur: (p / n) * 100 },
              aide: 'Divise ceux qui ont partagé par le total, puis multiplie par cent.',
              correction: [p + ' ÷ ' + n + ' × 100 = ' + (p / n) * 100 + ' %.'],
            },
            {
              texte: 'Question 3. Tu es dans ce groupe. Écris ce que tu fais, et à qui tu en parles.',
              correction: ['Je ne partage pas, et je ne ris pas. Je signale la photo. Comme preuve, je fais une capture de la conversation, que je ne renvoie à personne.', 'Si la photo est intime, je ne la garde pas : je vais tout de suite voir un adulte, ou j’appelle le 3018.', 'J’en parle à un adulte de confiance, et je soutiens ma camarade. En France, le 3018 peut nous aider et faire retirer la photo.'],
              grille: ['As-tu dit que tu ne partages pas ?', 'As-tu parlé de signaler, et de garder une preuve sans la renvoyer ?', 'As-tu cité un adulte de confiance, ou le 3018 ?', 'As-tu pensé à soutenir ta camarade ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu connais les bons gestes, et tu sais que personne ne doit rester seule avec cela.',
    carte: ['geste-suivant', 'que-faire', 'quel-numero'],
    papierDuSoir: { exercices: ['partage-qui-grossit', 'temoins-qui-agissent'], defi: true },
    automatismes: [
      {
        id: 'numero-rapide',
        versions: [['contre le cyberharcèlement, en France', 'Le 3018']],
        genere(c) { const [d, b] = c.alea.choisir(this.versions); return { enonce: 'Le numéro ' + d + ' ?', reponse: O.choix(c.alea, b, ['Le 3018', 'Le 15', 'Le 12']) }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En France, le 3018 est un numéro gratuit, anonyme et confidentiel contre le cyberharcèlement.',
    prenoms: ['Aminata'],
  };
});
