/* Notion 9 du bloc de technologie « Les objets et la société » : la notice et la documentation technique. Le ventilateur de Moussa.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const PARTIES = ['Les consignes de sécurité', 'Le montage', 'L’utilisation', 'L’entretien', 'La garantie', 'Le recyclage'];

  return {
    id: 'notice',
    matiere: 'technologie',
    bloc: 'objets-societe',
    titre: 'La notice et la documentation technique',
    classe: '4e',
    univers: ['appareils', 'maison-courses', 'famille'],
    source: 'Programme de technologie du cycle 4 (BOEN n° 9 du 29 février 2024), thème « Les objets et les systèmes techniques » (OST 31) : les composantes d’une notice et d’une documentation technique.',

    accroche: {
      texte: 'Moussa ouvre le carton de son nouveau ventilateur : des pièces, des vis, et un petit livret. Il veut tout monter sans lire. ' +
        'Rachel l’arrête : « Attends ! Le livret dit comment le monter, comment le nettoyer, et ce qu’il ne faut jamais faire. »',
      image: { dessin: 'chaine', etapes: PARTIES.slice(0, 5), description: 'Les parties du livret : les consignes de sécurité, le montage, l’utilisation, l’entretien, la garantie.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Lire les règles pour ne pas se blesser', 'Monter, puis utiliser', 'Entretenir, réparer, recycler'], description: 'Lire les règles pour ne pas se blesser ; monter, puis utiliser ; entretenir, réparer, recycler.' },
      etapes: [
        'Le livret commence souvent par les règles pour ne pas se blesser : ne pas mettre les doigts dans les pales, débrancher avant de nettoyer.',
        'Ensuite viennent le montage, puis l’utilisation : les boutons, les vitesses.',
        'Plus loin : comment nettoyer l’objet, quoi faire s’il ne marche plus, combien de temps il est garanti.',
        'À la fin : comment le jeter, ou mieux, le faire recycler. Pour les techniciens, il existe aussi des documents plus complets, avec les schémas et les pièces.',
      ],
    },

    decouverte: {
      texte: (c) => 'Le livret livré avec l’objet, c’est ' + c.mot('notice') + '. On y trouve d’abord ' + c.mot('securite') + ', puis le montage, l’utilisation, l’entretien, la garantie et le recyclage. ' +
        'Les techniciens ont aussi une documentation technique, avec les schémas et la liste des pièces. ' +
        'L’astuce : lis la sécurité avant tout, et garde le livret pour plus tard.',
    },

    vocabulaire: {
      termes: {
        notice: { sesMots: 'le livret de l’objet', officiel: 'la notice', lesDeux: 'le livret de l’objet, que les techniciens appellent la notice' },
        securite: { sesMots: 'les règles pour ne pas se blesser', officiel: 'les consignes de sécurité', lesDeux: 'les règles pour ne pas se blesser, que les techniciens appellent les consignes de sécurité' },
      },
      textes: [
        'Pour l’instant, garde tes mots : le livret de l’objet, et les règles pour ne pas se blesser. ' +
          'Les techniciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les techniciens disent : la notice, avec ses consignes de sécurité ; et pour eux, la documentation technique.',
        'Tu connais les mots officiels : la notice, les consignes de sécurité, et la documentation technique.',
      ],
    },

    exercices: [
      O.qcm('quelle-partie', 'appareils',
        [['Ne jamais mettre les doigts dans les pales.', 'Les consignes de sécurité'], ['Visser le pied sur la base avec les quatre vis.', 'Le montage'], ['Appuyer sur le bouton deux pour la vitesse moyenne.', 'L’utilisation'],
          ['Débrancher, puis essuyer les pales avec un chiffon sec.', 'L’entretien'], ['L’appareil est réparé gratuitement pendant deux ans.', 'La garantie'], ['Déposer l’appareil usagé dans un point de collecte.', 'Le recyclage']],
        (x) => '« ' + x + ' » Dans quelle partie de la notice lit-on cette phrase ?', PARTIES,
        'Sécurité, montage, utilisation, entretien, garantie ou recyclage ?'),
      O.qcm('que-lire-d-abord', 'maison-courses',
        [['un ventilateur', 'Les consignes de sécurité'], ['une bouilloire', 'Les consignes de sécurité'], ['un sèche-cheveux', 'Les consignes de sécurité']],
        (x) => 'Moussa déballe ' + x + '. Que doit-il lire avant tout ?', ['Les consignes de sécurité', 'La garantie', 'Le recyclage'],
        'Avant tout, ne pas se blesser.'),
      O.qcm('notice-ou-documentation', 'appareils',
        [['Comment brancher et allumer le ventilateur.', 'La notice'], ['Le schéma électrique complet et la liste des pièces.', 'La documentation technique'], ['Les vitesses et les boutons.', 'La notice'], ['Les plans pour fabriquer une pièce de rechange.', 'La documentation technique']],
        (x) => '« ' + x + ' » Où trouve-t-on cela : dans la notice, ou dans la documentation technique ?', ['La notice', 'La documentation technique'],
        'Pour l’utilisateur, ou pour le technicien ?'),
      {
        id: 'fin-de-garantie',
        univers: 'famille',
        // [année d'achat, durée de la garantie en ans]
        versions: [[2024, 2], [2025, 2], [2023, 3], [2026, 2], [2025, 5]],
        genere(c) {
          const [a, g] = c.alea.choisir(this.versions);
          return {
            enonce: 'Moussa achète son ventilateur en janvier ' + a + '. La notice dit : garantie de ' + g + ' ans. En janvier de quelle année la garantie s’arrête-t-elle ?',
            reponse: { type: 'nombre', valeur: a + g },
            aide: 'Calcule ' + a + ' + ' + g + '.',
            aideParlee: 'Ajoute la durée de la garantie à l’année d’achat.',
            correction: [a + ' + ' + g + ' = ' + (a + g) + '.'],
          };
        },
      },
      {
        id: 'nettoyages-par-an',
        univers: 'maison-courses',
        // [nettoyage toutes les k semaines]
        versions: [2, 4, 13, 26, 52],
        genere(c) {
          const k = c.alea.choisir(this.versions);
          return {
            enonce: 'La notice dit de nettoyer les pales toutes les ' + k + ' semaines. Combien de nettoyages en un an, soit 52 semaines ?',
            reponse: { type: 'nombre', valeur: 52 / k },
            aide: 'Calcule 52 ÷ ' + k + '.',
            aideParlee: 'Divise cinquante-deux par le nombre de semaines entre deux nettoyages.',
            correction: ['52 ÷ ' + k + ' = ' + O.nb(52 / k, 'nettoyage') + '.'],
          };
        },
      },
    ],

    defi: {
      // [année d'achat, garantie en ans, nettoyage toutes les k semaines]
      versions: [[2025, 2, 4], [2024, 3, 2], [2026, 2, 13], [2025, 5, 26]],
      genere(c) {
        const [a, g, k] = c.alea.choisir(this.versions);
        return {
          enonce: 'Rachel lit la notice du ventilateur, acheté en mars ' + a + '. Elle y trouve : « Garantie : ' + g + ' ans. Nettoyer les pales toutes les ' + k + ' semaines. Ne jamais ouvrir l’appareil branché. »',
          questions: [
            {
              texte: 'Question 1. En mars de quelle année la garantie s’arrête-t-elle ?',
              reponse: { type: 'nombre', valeur: a + g },
              aide: 'Ajoute la durée de la garantie à l’année d’achat.',
              correction: [a + ' + ' + g + ' = ' + (a + g) + '.'],
            },
            {
              texte: 'Question 2. Combien de nettoyages faut-il faire en 52 semaines ?',
              reponse: { type: 'nombre', valeur: 52 / k },
              aide: 'Divise cinquante-deux par le nombre de semaines entre deux nettoyages.',
              correction: ['52 ÷ ' + k + ' = ' + O.nb(52 / k, 'nettoyage') + '.'],
            },
            {
              texte: 'Question 3. Dans quelle partie de la notice se trouve la phrase « Ne jamais ouvrir l’appareil branché » ? Explique pourquoi on la lit en premier.',
              correction: ['C’est une consigne de sécurité.', 'On la lit en premier pour ne pas se blesser : un appareil ouvert et branché peut électrocuter.'],
              grille: ['As-tu nommé les consignes de sécurité ?', 'As-tu expliqué le danger ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Sécurité d’abord, puis montage, utilisation et entretien : tu sais te servir d’une notice.',
    carte: ['quelle-partie', 'que-lire-d-abord', 'notice-ou-documentation'],
    papierDuSoir: { exercices: ['fin-de-garantie', 'nettoyages-par-an'], defi: true },
    automatismes: [
      {
        id: 'cinquante-deux',
        versions: [2, 4, 13, 26],
        genere(c) { const k = c.alea.choisir(this.versions); return { enonce: '52 ÷ ' + k + ' = ?', reponse: { type: 'nombre', valeur: 52 / k } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Cameroun, selon une loi de 2011, un produit dangereux doit avoir un manuel en français et en anglais.',
    prenoms: ['Moussa', 'Rachel'],
  };
});
