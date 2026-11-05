/* Notion 13 du bloc de technologie « Les objets et la société » : le bilan carbone. Le trajet d'Aminata vers la ville.
   Les quantités de dioxyde de carbone par kilomètre sont des valeurs d'exercice, données dans chaque énoncé. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;

  return {
    id: 'bilan-carbone',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'Le bilan carbone',
    classe: '4e',
    univers: ['dehors', 'appareils', 'commerce'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 31) : comparer plusieurs objets (incidences environnementales, bilan carbone, efficacité énergétique).',

    accroche: {
      texte: 'Aminata doit aller en ville, à 20 kilomètres. En voiture, en bus, ou à vélo ? Le moteur de la voiture rejette un gaz invisible, le dioxyde de carbone, qui réchauffe la planète. ' +
        'Le bus en rejette aussi, mais il transporte beaucoup de monde. Le vélo, presque rien. Comment compter ?',
      image: { dessin: 'barres', barres: [{ nom: 'Voiture', parts: 4 }, { nom: 'Bus', parts: 2 }, { nom: 'Vélo', parts: 0 }], description: 'Le gaz rejeté pour le même trajet : quatre parts en voiture, deux en bus, aucune à vélo.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Fabriquer l’objet', 'Le transporter jusqu’au magasin', 'L’utiliser', 'Le jeter ou le recycler'], description: 'On additionne le gaz rejeté à chaque étape : fabriquer, transporter, utiliser, jeter ou recycler.' },
      etapes: [
        'On compte le dioxyde de carbone en kilogrammes.',
        'Pour un trajet : on multiplie le nombre de kilomètres par ce que rejette un kilomètre.',
        'Pour un objet : on additionne ce qui est rejeté pour le fabriquer, le transporter, l’utiliser et le jeter.',
        'Pour comparer, on fait le même calcul pour chaque solution, et on garde la plus faible.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le dioxyde de carbone fait partie des ' + c.mot('ges') + '. ' +
        'Faire le compte de tout ce qu’un trajet ou un objet en rejette, c’est faire ' + c.mot('bilan') + '. ' +
        'Pour un trajet : kilomètres multipliés par ce que rejette un kilomètre. L’astuce : le même calcul pour chaque solution, puis on compare.',
    },

    vocabulaire: {
      termes: {
        ges: { sesMots: 'gaz qui réchauffent la planète', officiel: 'gaz à effet de serre', lesDeux: 'gaz qui réchauffent la planète, que les scientifiques appellent gaz à effet de serre' },
        bilan: { sesMots: 'le compte du gaz rejeté', officiel: 'le bilan carbone', lesDeux: 'le compte du gaz rejeté, que les techniciens appellent le bilan carbone' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les gaz qui réchauffent la planète, et le compte du gaz rejeté. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'On dit : les gaz à effet de serre, et le bilan carbone, compté en kilogrammes de dioxyde de carbone.',
        'Tu connais les mots officiels : les gaz à effet de serre et le bilan carbone.',
      ],
    },

    exercices: [
      {
        id: 'trajet',
        univers: 'dehors',
        // [kilomètres, kilogrammes de dioxyde de carbone par kilomètre]
        versions: [[20, 0.2], [15, 0.2], [30, 0.1], [40, 0.2], [25, 0.1], [50, 0.2]],
        genere(c) {
          const [d, f] = c.alea.choisir(this.versions);
          const m = r2(d * f);
          return {
            enonce: 'Dans cet exercice, un véhicule rejette ' + ecr(f) + ' kg de dioxyde de carbone par kilomètre. Combien en rejette-t-il pour ' + d + ' km ?',
            reponse: { type: 'nombre', valeur: m },
            aide: 'Calcule ' + d + ' × ' + ecr(f) + '.',
            aideParlee: 'Multiplie les kilomètres par ce que rejette un kilomètre.',
            correction: [d + ' × ' + ecr(f) + ' = ' + ecr(m) + ' kg.'],
          };
        },
      },
      {
        id: 'gaz-evite',
        univers: 'dehors',
        // [kilomètres, kg par km en voiture, kg par km et par personne en bus]
        versions: [[20, 0.2, 0.05], [30, 0.2, 0.1], [40, 0.2, 0.05], [10, 0.2, 0.1], [50, 0.2, 0.1]],
        genere(c) {
          const [d, v, b] = c.alea.choisir(this.versions);
          const e = r2(d * (v - b));
          return {
            enonce: 'Pour ' + d + ' km, la voiture rejette ' + ecr(v) + ' kg de dioxyde de carbone par kilomètre ; le bus, ' + ecr(b) + ' kg par kilomètre et par personne. Combien de kilogrammes Aminata évite-t-elle en prenant le bus ?',
            reponse: { type: 'nombre', valeur: e },
            aide: 'Calcule ' + d + ' × ' + ecr(v) + ', puis ' + d + ' × ' + ecr(b) + ', puis la différence.',
            aideParlee: 'Calcule ce que rejette chaque trajet, puis fais la différence.',
            correction: [d + ' × ' + ecr(v) + ' = ' + ecr(r2(d * v)) + ' kg.', d + ' × ' + ecr(b) + ' = ' + ecr(r2(d * b)) + ' kg.', ecr(r2(d * v)) + ' − ' + ecr(r2(d * b)) + ' = ' + ecr(e) + ' kg.'],
          };
        },
      },
      {
        id: 'bilan-d-un-objet',
        univers: 'appareils',
        // [fabrication, transport, utilisation, fin de vie] en kg
        versions: [[60, 5, 10, 2], [45, 3, 20, 2], [70, 8, 15, 5], [50, 4, 12, 4], [80, 6, 10, 4]],
        genere(c) {
          const l = c.alea.choisir(this.versions);
          const s = l.reduce((a, b) => a + b, 0);
          return {
            enonce: 'Dans cet exercice, un téléphone rejette ' + l[0] + ' kg de dioxyde de carbone pour sa fabrication, ' + l[1] + ' kg pour son transport, ' + l[2] + ' kg pendant son utilisation et ' + l[3] + ' kg en fin de vie. Quel est son bilan carbone ?',
            reponse: { type: 'nombre', valeur: s },
            aide: 'Additionne les quatre nombres.',
            correction: [l.join(' + ') + ' = ' + s + ' kg.'],
          };
        },
      },
      O.qcm('moins-de-gaz', 'dehors',
        [['aller à l’école, à deux kilomètres', 'À pied ou à vélo'], ['aller au marché du village voisin', 'À pied ou à vélo'], ['partir avec toute la classe dans une ville à 40 kilomètres', 'En bus']],
        (x) => 'Pour ' + x + ', quel moyen rejette le moins de dioxyde de carbone ?', ['À pied ou à vélo', 'En bus', 'Seule en voiture'],
        'Moins de moteur, ou plus de personnes dans le même véhicule.'),
      O.qcm('qu-est-ce-que-c-est', 'commerce',
        [['le bilan carbone d’un objet', 'Le compte du dioxyde de carbone rejeté pendant toute sa vie'], ['un gaz à effet de serre', 'Un gaz qui réchauffe la planète']],
        (x) => ('Qu’est-ce que ' + x + ' ?').replace('que un ', 'qu’un '), ['Le compte du dioxyde de carbone rejeté pendant toute sa vie', 'Un gaz qui réchauffe la planète', 'Le prix de l’objet'],
        'Pense au compte du gaz rejeté.'),
    ],

    defi: {
      // [km aller, kg par km en voiture, kg par km et par personne en bus, allers-retours par mois]
      versions: [[20, 0.2, 0.05, 4], [15, 0.2, 0.1, 8], [30, 0.2, 0.1, 2], [10, 0.2, 0.05, 10]],
      genere(c) {
        const [d, v, b, n] = c.alea.choisir(this.versions);
        const km = 2 * d * n, ev = r2(km * v), eb = r2(km * b);
        return {
          enonce: 'Aminata va en ville à ' + d + ' km, et elle en revient le même jour, ' + n + ' fois par mois. Laure peut l’y conduire en voiture, ou Aminata peut prendre le bus. Dans cet exercice, la voiture rejette ' + ecr(v) + ' kg de dioxyde de carbone par kilomètre ; le bus, ' + ecr(b) + ' kg par kilomètre et par personne.',
          questions: [
            {
              texte: 'Question 1. Combien de kilomètres parcourt-elle en un mois ?',
              reponse: { type: 'nombre', valeur: km },
              aide: 'Un aller-retour, c’est deux fois la distance ; puis multiplie par le nombre de voyages.',
              correction: ['2 × ' + d + ' × ' + n + ' = ' + km + ' km.'],
            },
            {
              texte: 'Question 2. Combien de kilogrammes de dioxyde de carbone rejette-t-elle en un mois en voiture ?',
              reponse: { type: 'nombre', valeur: ev },
              aide: 'Multiplie les kilomètres par ce que rejette un kilomètre en voiture.',
              correction: [km + ' × ' + ecr(v) + ' = ' + ecr(ev) + ' kg.'],
            },
            {
              texte: 'Question 3. Combien de kilogrammes évite-t-elle en un mois en prenant le bus ?',
              reponse: { type: 'nombre', valeur: r2(ev - eb) },
              aide: 'Calcule ce que rejette le bus, puis la différence avec la voiture.',
              correction: [km + ' × ' + ecr(b) + ' = ' + ecr(eb) + ' kg.', ecr(ev) + ' − ' + ecr(eb) + ' = ' + ecr(r2(ev - eb)) + ' kg.'],
            },
            {
              texte: 'Question 4. Rédige un conseil pour Aminata, en utilisant le mot « bilan carbone ».',
              correction: ['Le bilan carbone du bus est plus faible que celui de la voiture, car il transporte beaucoup de personnes.', 'Aminata devrait prendre le bus, ou le vélo pour les petits trajets.'],
              grille: ['As-tu utilisé le mot « bilan carbone » ?', 'As-tu comparé la voiture et le bus ?', 'As-tu donné un conseil clair ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Des kilomètres, un gaz invisible, un calcul simple : tu sais faire le bilan carbone d’un trajet.',
    carte: ['trajet', 'bilan-d-un-objet', 'moins-de-gaz'],
    papierDuSoir: { exercices: ['gaz-evite', 'bilan-d-un-objet'], defi: true },
    automatismes: [
      {
        id: 'fois-zero-virgule-deux',
        versions: [10, 20, 30, 50],
        genere(c) { const d = c.alea.choisir(this.versions); return { enonce: d + ' × 0,2 = ?', reponse: { type: 'nombre', valeur: r2(d * 0.2) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Maroc, près de Ouarzazate, se trouve la centrale solaire Noor. Sa première partie doit éviter chaque année deux cent quarante mille tonnes de dioxyde de carbone.',
    prenoms: ['Aminata', 'Laure'],
  };
});
