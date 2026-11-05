/* Notion 19 du bloc de technologie « Le numérique et l'intelligence artificielle » : le rôle du numérique dans la société. Le marché de Laure et le village de Clarisse.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const Q = (id, u, v, e, t, a, p) => O.qcm(id, u, v.map((x) => [x[0], x[1], p]), e, t, a);
  const AV = 'Un avantage', RI = 'Un risque';

  return {
    id: 'numerique-societe',
    matiere: 'technologie',
    bloc: 'numerique-ia',
    titre: 'Le rôle du numérique dans la société',
    classe: '3e',
    univers: ['commerce', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), partie sur le numérique : usages et effets du numérique dans la société.',

    accroche: {
      texte: 'Au marché, Laure paie ses légumes avec son téléphone, et elle voit son médecin en visioconférence. Mais Clarisse, dans son village, n’a presque pas de réseau. Elle doit marcher une heure pour faire ses papiers en ligne. ' +
        'Le numérique change la vie. Pas de la même façon pour tout le monde.',
      image: { dessin: 'facture', titre: 'Avantages et risques', lignes: [['Payer, se soigner à distance', 'un avantage'], ['Apprendre, partager', 'un avantage'], ['Fausses nouvelles', 'un risque'], ['Tous n’ont pas de réseau', 'un risque']], description: 'Avantages : payer et se soigner à distance, apprendre et partager. Risques : les fausses nouvelles, et le fait que tous n’ont pas de réseau.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Qui a écrit cette information ?', 'D’où vient-elle ?', 'D’autres sources sérieuses la disent-elles ?'], description: 'Trois questions pour vérifier une information : qui l’a écrite ? D’où vient-elle ? D’autres sources sérieuses la disent-elles ?' },
      etapes: [
        'Le numérique rend de grands services : se soigner, payer, apprendre, travailler et garder le contact, parfois de très loin.',
        'Mais tous n’y ont pas accès de la même façon : le réseau, le prix, et le savoir-faire comptent.',
        'Sur les réseaux, une fausse nouvelle peut aller plus vite que la vraie. Avant de partager, pose trois questions.',
        'Le numérique a aussi un coût pour la planète : les appareils, et les grands centres de données, consomment des ressources et de l’énergie.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le numérique aide beaucoup. Mais il laisse de côté ceux qui n’y ont pas accès. Cet écart, c’est ' + c.mot('fracture') + '. ' +
        'Une fausse nouvelle diffusée pour tromper, c’est ' + c.mot('infox') + '. ' +
        'L’astuce : avant de partager, vérifie qui parle.',
    },

    vocabulaire: {
      termes: {
        fracture: { sesMots: 'le grand fossé', officiel: 'la fracture numérique', lesDeux: 'le grand fossé, que l’on appelle la fracture numérique' },
        infox: { sesMots: 'un faux message', officiel: 'une infox', lesDeux: 'un faux message, que l’on appelle une infox' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le grand fossé, et le faux message. ' +
          'On a des mots officiels pour cela : je te les dirai la prochaine fois.',
        'On dit : la fracture numérique, pour le grand fossé. Et une infox, pour le faux message.',
        'Tu connais les mots officiels : la fracture numérique et l’infox.',
      ],
    },

    exercices: [
      Q('avantage-ou-risque', 'commerce',
        [['Voir un médecin à distance, quand il n’y en a pas près de chez soi', AV], ['Une fausse nouvelle partagée par des milliers de personnes', RI], ['Payer au marché avec son téléphone, sans avoir d’argent sur soi', AV], ['Des démarches possibles seulement en ligne, pour une personne sans réseau', RI]],
        (x) => x + ' : qu’est-ce que c’est ?', [AV, RI],
        'Qui est aidé, et qui est gêné ?',
        'Le numérique aide quand il rapproche les services. Il gêne quand il trompe, ou laisse des personnes de côté.'),
      Q('verifier-une-info', 'famille',
        [['Un message annonce une nouvelle étonnante, sans source. Que fais-tu d’abord ?', 'Je cherche si des sources sérieuses la confirment'], ['Une vidéo choquante circule, et un ami te demande de la partager. Que fais-tu ?', 'Je cherche si des sources sérieuses la confirment']],
        (x) => x, ['Je cherche si des sources sérieuses la confirment', 'Je la partage tout de suite', 'Je la crois, car beaucoup la partagent'],
        'Le nombre de partages ne prouve rien.',
        'Le nombre de partages ne prouve pas qu’une nouvelle est vraie : on cherche qui parle, et des sources sérieuses.'),
      Q('quelle-cause', 'famille',
        [['Dans le village de Clarisse, le réseau arrive à peine.', 'Le réseau'], ['Une famille ne peut pas payer un téléphone récent.', 'Le prix'], ['Une personne âgée ne sait pas remplir un formulaire en ligne.', 'Le savoir-faire']],
        (x) => x + ' Quelle cause de la fracture numérique est en jeu ?', ['Le réseau', 'Le prix', 'Le savoir-faire'],
        'Lis la cause écrite dans la phrase.',
        'L’accès au numérique dépend du réseau, du prix des appareils, et de ce que l’on sait faire.'),
      {
        id: 'pourcentage-connecte',
        univers: 'famille',
        // [habitants, habitants connectés]
        versions: [[200, 150], [500, 300], [400, 100], [50, 40], [1000, 700], [250, 200]],
        genere(c) {
          const [h, n] = c.alea.choisir(this.versions);
          const p = (n / h) * 100;
          return {
            enonce: 'Dans un village de ' + h + ' habitants, ' + n + ' ont accès à Internet. Quel pourcentage des habitants y a accès ?',
            reponse: { type: 'nombre', valeur: p },
            aide: 'Calcule ' + n + ' ÷ ' + h + ' × 100.',
            aideParlee: 'Divise les habitants connectés par le total, puis multiplie par cent.',
            correction: [n + ' ÷ ' + h + ' × 100 = ' + p + ' %.'],
          };
        },
      },
      {
        id: 'partages-en-une-heure',
        univers: 'commerce',
        // [partages par minute, minutes]
        versions: [[20, 15], [50, 10], [12, 30], [15, 60], [30, 20], [40, 15]],
        genere(c) {
          const [p, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'Une fausse nouvelle est partagée ' + p + ' fois par minute. Combien de fois est-elle partagée en ' + m + ' minutes ?',
            reponse: { type: 'nombre', valeur: p * m },
            aide: 'Calcule ' + p + ' × ' + m + '.',
            aideParlee: 'Multiplie les partages d’une minute par le nombre de minutes.',
            correction: [p + ' × ' + m + ' = ' + p * m + ' partages.'],
          };
        },
      },
    ],

    defi: {
      // [habitants, habitants connectés, heures de route vers le service, démarches par an]
      versions: [[400, 300, 2, 3], [500, 200, 3, 2], [200, 150, 2, 4], [800, 600, 1, 5]],
      genere(c) {
        const [h, n, r, d] = c.alea.choisir(this.versions);
        return {
          enonce: 'Document : le village de Clarisse compte ' + h + ' habitants, dont ' + n + ' ont accès à Internet. Une démarche administrative se fait maintenant en ligne. Sans Internet, il faut ' + O.nb(r, 'heure') + ' de route pour la faire en ville, et il y a ' + d + ' démarches par an.',
          questions: [
            {
              texte: 'Question 1. Combien d’habitants n’ont pas accès à Internet ?',
              reponse: { type: 'nombre', valeur: h - n },
              aide: 'Enlève les habitants connectés au nombre d’habitants.',
              correction: [h + ' − ' + n + ' = ' + (h - n) + ' habitants.'],
            },
            {
              texte: 'Question 2. Combien d’heures de route coûtent ces démarches, par an, à une personne sans Internet ?',
              reponse: { type: 'nombre', valeur: r * d },
              aide: 'Multiplie les heures d’une démarche par le nombre de démarches.',
              correction: [r + ' × ' + d + ' = ' + r * d + ' heures.'],
            },
            {
              texte: 'Question 3. Présente un avantage et un inconvénient de ces démarches en ligne, puis propose une solution pour les habitants sans Internet.',
              correction: ['Avantage : pour ceux qui sont connectés, on gagne du temps et de la route.', 'Inconvénient : ceux qui ne le sont pas sont pénalisés, c’est la fracture numérique.', 'Solution : garder un guichet, ou un lieu d’accès avec une personne qui aide, près du village.'],
              grille: ['As-tu donné un avantage ?', 'As-tu donné un inconvénient, avec la fracture numérique ?', 'As-tu proposé une solution réaliste ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais peser le pour et le contre, et penser à ceux que le numérique oublie.',
    carte: ['avantage-ou-risque', 'verifier-une-info', 'quelle-cause'],
    papierDuSoir: { exercices: ['pourcentage-connecte', 'partages-en-une-heure'], defi: true },
    automatismes: [
      {
        id: 'pourcentage-rapide',
        versions: [[50, 100], [25, 100], [75, 100], [10, 100]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' habitants sur ' + b + ', en pourcentage = ?', reponse: { type: 'nombre', valeur: (a / b) * 100 } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Kenya, le paiement par téléphone M-Pesa a sorti environ 194 000 foyers de l’extrême pauvreté, selon une étude.',
    prenoms: ['Laure', 'Clarisse'],
  };
});
