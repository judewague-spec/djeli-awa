/* Notion 2 du bloc SVT « Le corps humain et la santé » : ce que les muscles demandent pendant l'effort. La course de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const { ecr } = O;
  const r2 = (x) => Math.round(x * 100) / 100;
  const CONSO = 'Du dioxygène et du glucose', REJET = 'Du dioxyde de carbone';

  return {
    id: 'effort-besoins',
    matiere: 'svt',
    bloc: 'corps-sante',
    titre: 'Ce que les muscles demandent pendant l’effort',
    classe: 'cycle 4',
    univers: ['dehors', 'danses', 'famille'],
    source: 'Programme de SVT du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Le corps humain et la santé » : besoins des muscles pendant l’effort.',

    accroche: {
      texte: 'Moussa fait un footing autour du stade. Ses jambes travaillent dur. Il respire vite, son cœur bat fort. ' +
        'Pourquoi tout le corps s’accélère-t-il, alors que ce sont surtout les jambes qui travaillent ? Que réclament ses muscles ?',
      image: { dessin: 'chaine', etapes: ['Les poumons prennent l’air', 'Le sang emporte ce qu’il faut', 'Le cœur pousse le sang', 'Les muscles des jambes'], description: 'Une chaîne : les poumons prennent l’air, le sang l’emporte, le cœur pousse le sang jusqu’aux muscles des jambes.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Poumons : le dioxygène entre dans le sang', 'Intestin : le sucre des aliments entre dans le sang', 'Cœur : il pousse le sang', 'Muscles : ils prennent dioxygène et sucre', 'Muscles : ils rejettent du dioxyde de carbone'], description: 'Le trajet de ce dont les muscles ont besoin, des poumons et de l’intestin jusqu’aux muscles, puis le rejet de dioxyde de carbone.' },
      etapes: [
        'Pour travailler, un muscle a besoin d’énergie. Il la tire du sucre apporté par les aliments, et du dioxygène de l’air.',
        'C’est le sang qui apporte le sucre et le dioxygène aux muscles. Le cœur est la pompe qui fait circuler le sang.',
        'En travaillant, le muscle rejette du dioxyde de carbone. Le sang l’emporte jusqu’aux poumons, qui le rejettent dans l’air.',
        'Pendant l’effort, les muscles en demandent beaucoup plus : le cœur bat plus vite et on respire plus, pour en apporter davantage.',
      ],
    },

    decouverte: {
      texte: (c) => 'Pendant l’effort, les muscles consomment plus de dioxygène et de ' + c.mot('glucose') + ', et rejettent plus de dioxyde de carbone. ' +
        'Le cœur bat plus vite pour envoyer plus de sang ; on respire plus vite et plus fort pour faire entrer plus d’air. ' +
        'L’astuce : le volume d’air respiré en une minute, c’est le nombre de respirations par minute fois le volume d’une respiration.',
    },

    vocabulaire: {
      termes: {
        glucose: { sesMots: 'sucre du sang', officiel: 'glucose', lesDeux: 'sucre du sang, que les scientifiques appellent le glucose' },
      },
      textes: [
        'Pour l’instant, garde tes mots : les muscles ont besoin du dioxygène de l’air et du sucre du sang. Ils rejettent du dioxyde de carbone. ' +
          'Les scientifiques ont un nom pour ce sucre : je te le dirai la prochaine fois.',
        'Les scientifiques disent : le glucose. Le sucre du sang, c’est le glucose. C’est un nutriment : une petite molécule tirée des aliments.',
        'Tu connais le mot officiel : les muscles consomment du dioxygène et du glucose, apportés par le sang, et rejettent du dioxyde de carbone.',
      ],
    },

    exercices: [
      {
        id: 'air-par-minute',
        univers: 'dehors',
        // [respirations par minute, volume d'une respiration en litres]
        versions: [[12, 0.5], [15, 0.5], [20, 1], [30, 1.5], [40, 2], [16, 0.5], [25, 2], [35, 1.5]],
        genere(c) {
          const [f, v] = c.alea.choisir(this.versions);
          const d = r2(f * v);
          return {
            enonce: 'Moussa fait ' + f + ' respirations par minute, et chaque respiration fait entrer ' + ecr(v) + (v >= 2 ? ' litres' : ' litre') + ' d’air. Quel volume d’air respire-t-il en une minute, en litres ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Calcule ' + f + ' × ' + ecr(v) + '.',
            aideParlee: 'Multiplie le nombre de respirations par minute par le volume d’une respiration.',
            correction: [f + ' × ' + ecr(v) + ' = ' + ecr(d) + ' litres par minute.'],
          };
        },
      },
      {
        id: 'sang-par-minute',
        univers: 'famille',
        // [battements par minute, millilitres de sang envoyés à chaque battement]
        versions: [[70, 70], [60, 80], [120, 100], [150, 110], [80, 70], [100, 90]],
        genere(c) {
          const [f, v] = c.alea.choisir(this.versions);
          return {
            enonce: 'À chaque battement, le cœur de Rachel envoie environ ' + v + ' mL de sang. Il bat ' + f + ' fois par minute. Quel volume de sang envoie-t-il en une minute, en millilitres ?',
            reponse: { type: 'nombre', valeur: f * v },
            aide: 'Calcule ' + f + ' × ' + v + '.',
            aideParlee: 'Multiplie le nombre de battements par minute par le volume envoyé à chaque battement.',
            correction: [f + ' × ' + v + ' = ' + f * v + ' mL par minute.'],
          };
        },
      },
      {
        id: 'consomme-ou-rejette',
        univers: 'danses',
        versions: [['Que consomment les muscles en plus pendant l’effort ?', CONSO], ['Que rejettent les muscles en plus pendant l’effort ?', REJET]],
        genere(c) {
          const [q, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: q,
            reponse: O.choix(c.alea, bonne, [CONSO, REJET, 'Du diazote']),
            aide: 'Ils prennent ce que le sang leur apporte, et rendent ce que les poumons rejettent.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'qui-fait-quoi',
        univers: 'famille',
        versions: [['fait circuler le sang', 'Le cœur'], ['fait entrer le dioxygène dans le sang', 'Les poumons'], ['transporte le dioxygène et le sucre jusqu’aux muscles', 'Le sang'], ['fait passer le sucre des aliments dans le sang', 'L’intestin']],
        genere(c) {
          const [role, bonne] = c.alea.choisir(this.versions);
          return {
            enonce: 'Quel organe, ou quel liquide du corps, ' + role + ' ?',
            reponse: O.choix(c.alea, bonne, ['Le cœur', 'Les poumons', 'Le sang', 'L’intestin']),
            aide: 'Pense au trajet : poumons et intestin, sang, cœur, muscles.',
            correction: ['Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'combien-de-fois-plus',
        univers: 'dehors',
        // [litres d'air par minute au repos, pendant l'effort]
        versions: [[6, 30], [8, 40], [7, 70], [5, 50], [6, 60], [8, 80]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          return {
            enonce: 'Au repos, Aminata respire ' + a + ' litres d’air par minute ; en courant, ' + b + ' litres par minute. Combien de fois plus d’air respire-t-elle en courant ?',
            reponse: { type: 'nombre', valeur: b / a },
            aide: 'Calcule ' + b + ' ÷ ' + a + '.',
            aideParlee: 'Divise le volume en courant par le volume au repos.',
            correction: [b + ' ÷ ' + a + ' = ' + b / a + ' : ' + b / a + ' fois plus d’air.'],
          };
        },
      },
    ],

    defi: {
      // [respirations par minute au repos, en courant ; volume d'une respiration au repos, en courant, en L]
      versions: [[12, 30, 0.5, 2], [15, 40, 0.5, 1.5], [12, 36, 0.5, 2], [16, 40, 0.5, 2], [14, 30, 0.5, 2], [10, 30, 0.5, 1.5]],
      genere(c) {
        const [f1, f2, v1, v2] = c.alea.choisir(this.versions);
        const d1 = r2(f1 * v1), d2 = r2(f2 * v2);
        return {
          enonce: 'Au repos, Moussa fait ' + f1 + ' respirations par minute, de ' + ecr(v1) + ' L chacune. En courant, il en fait ' + f2 + ' par minute, de ' + ecr(v2) + ' L chacune.',
          image: { dessin: 'barres', barres: [{ nom: 'Repos', parts: Math.max(1, Math.round(d1 / 5)) }, { nom: 'Course', parts: Math.max(1, Math.round(d2 / 5)) }], description: 'Deux barres : le volume d’air respiré par minute au repos, et en courant, bien plus grand.' },
          questions: [
            {
              texte: 'Question 1. Quel volume d’air respire-t-il par minute au repos, en litres ?',
              reponse: { type: 'nombre', valeur: d1 },
              aide: 'Respirations par minute fois volume d’une respiration.',
              correction: [f1 + ' × ' + ecr(v1) + ' = ' + ecr(d1) + ' L par minute.'],
            },
            {
              texte: 'Question 2. Et en courant ?',
              reponse: { type: 'nombre', valeur: d2 },
              aide: 'Même calcul, avec les valeurs de la course.',
              correction: [f2 + ' × ' + ecr(v2) + ' = ' + ecr(d2) + ' L par minute.'],
            },
            {
              texte: 'Question 3. Explique pourquoi il respire davantage en courant.',
              correction: ['En courant, ses muscles travaillent plus : ils consomment plus de dioxygène et de glucose, et rejettent plus de dioxyde de carbone.', 'En respirant plus, il fait entrer plus de dioxygène et rejette plus de dioxyde de carbone.'],
              grille: ['As-tu dit que les muscles consomment plus de dioxygène ?', 'As-tu parlé du dioxyde de carbone rejeté ?', 'As-tu relié la respiration aux besoins des muscles ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Tu sais pourquoi le cœur et les poumons s’accélèrent : pour servir les muscles qui travaillent.',
    carte: ['air-par-minute', 'consomme-ou-rejette', 'qui-fait-quoi'],
    papierDuSoir: { exercices: ['sang-par-minute', 'combien-de-fois-plus'], defi: true },
    automatismes: [
      {
        id: 'produit-rapide',
        versions: [[12, 0.5], [20, 0.5], [30, 2], [16, 0.5]],
        genere(c) { const [f, v] = c.alea.choisir(this.versions); return { enonce: f + ' respirations de ' + ecr(v) + ' L : combien de litres ?', reponse: { type: 'nombre', valeur: r2(f * v) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cap, en Afrique du Sud, le chirurgien Christiaan Barnard a réalisé en 1967 la première greffe de cœur d’un humain à un autre.',
    prenoms: ['Moussa', 'Rachel', 'Aminata'],
  };
});
