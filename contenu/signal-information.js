/* Notion 1 du bloc « Signaux et Univers » : signal et information. La télécommande de Rachel.
   Les nombres des exercices sont des exemples de la notion.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ecr = (n) => { const [e, d] = O.ecr(n).split(','); const g = e.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return d ? g + ',' + d : g; };
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return {
    id: 'signal-information',
    matiere: 'physique-chimie',
    bloc: 'signaux-univers',
    titre: 'Signal et information',
    classe: 'cycle 4',
    univers: ['appareils', 'dehors', 'famille'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Des signaux pour observer et communiquer » : signal et information, lumière et son, vitesse de propagation.',

    accroche: {
      texte: 'Rachel appuie sur la télécommande. La télévision change de chaîne, sans aucun fil. Pourtant, un message a voyagé de l’une à l’autre. Comment est-ce possible ?',
      image: { dessin: 'chaine', etapes: ['La télécommande', 'Une lumière invisible voyage', 'La télévision'], description: 'La télécommande envoie une lumière invisible vers la télévision, qui change de chaîne.' },
    },

    manipulation: {
      image: { dessin: 'chaine', etapes: ['Émetteur : envoie', 'Signal : lumière ou son', 'Récepteur : reçoit'], description: 'L’émetteur envoie un signal, lumière ou son. Le récepteur le reçoit et lit l’information.' },
      etapes: [
        'Un signal est un phénomène qui transporte une information : un son, de la lumière, ou une onde radio.',
        'L’émetteur envoie le signal. Le récepteur le reçoit et lit l’information.',
        'La télécommande envoie de la lumière infrarouge, invisible à l’œil. Le récepteur de la télévision la capte.',
        'Dans une fibre optique, un fil de verre très fin, des signaux lumineux portent l’information, par exemple pour Internet.',
        'Un sonar envoie un son et écoute son écho. Le temps de retour donne la distance : d = v × t ÷ 2.',
        'Le son voyage dans l’air à environ 340 mètres par seconde. La lumière va bien plus vite : environ 300 000 kilomètres par seconde.',
      ],
    },

    decouverte: {
      texte: (c) => 'Regarde la télécommande : c’est ' + c.mot('emetteur') + '. Regarde la télévision : c’est ' + c.mot('recepteur') + '. ' +
        'Entre les deux voyage ' + c.mot('signal') + '. Dans la fibre optique et avec le sonar, c’est pareil. ' +
        'L’astuce : la lumière va bien plus vite que le son.',
    },

    vocabulaire: {
      termes: {
        emetteur: { sesMots: 'ce qui envoie le message', officiel: 'l’émetteur', lesDeux: 'ce qui envoie le message, que les physiciens appellent l’émetteur' },
        recepteur: { sesMots: 'ce qui reçoit le message', officiel: 'le récepteur', lesDeux: 'ce qui reçoit le message, que les physiciens appellent le récepteur' },
        signal: { sesMots: 'la lumière ou le son qui porte le message', officiel: 'le signal', lesDeux: 'la lumière ou le son qui porte le message, que les physiciens appellent le signal' },
      },
      textes: [
        'Pour l’instant, garde tes mots. Il y a ce qui envoie le message, et ce qui le reçoit. Il y a aussi la lumière ou le son qui le porte. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : l’émetteur envoie, le récepteur reçoit, et le signal porte l’information.',
        'Tu connais les mots officiels : l’émetteur, le récepteur et le signal.',
      ],
    },

    exercices: [
      {
        id: 'distance-orage',
        univers: 'dehors',
        // [secondes entre l'éclair et le tonnerre]
        versions: [2, 3, 5, 6, 9, 10],
        genere(c) {
          const t = c.alea.choisir(this.versions);
          const d = 340 * t;
          return {
            enonce: 'Moussa voit un éclair, puis entend le tonnerre ' + t + ' secondes plus tard. Le son va à 340 m/s dans l’air. On considère que la lumière arrive tout de suite. À quelle distance est l’éclair, en mètres ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Multiplie 340 par ' + t + '.',
            aideParlee: 'Multiplie la vitesse du son par la durée.',
            correction: ['d = v × t = 340 × ' + t + ' = ' + ecr(d) + ' m.'],
          };
        },
      },
      {
        id: 'echo-falaise',
        univers: 'dehors',
        // [secondes avant l'écho]
        versions: [0.5, 1, 2, 3, 4, 6],
        genere(c) {
          const t = c.alea.choisir(this.versions);
          const aller = 340 * t, d = aller / 2;
          return {
            enonce: 'Rachel crie face à une falaise. Elle entend l’écho ' + ecr(t) + (t >= 2 ? ' secondes' : ' seconde') + ' plus tard. Le son va à 340 m/s dans l’air. À quelle distance est la falaise, en mètres ?',
            reponse: { type: 'nombre', valeur: d },
            aide: 'Le son fait l’aller et le retour. Calcule 340 × ' + ecr(t) + ', puis divise par 2.',
            aideParlee: 'Le son fait l’aller et le retour. Multiplie la vitesse par la durée, puis divise par deux.',
            correction: ['Aller et retour : 340 × ' + ecr(t) + ' = ' + ecr(aller) + ' m.', 'Distance de la falaise : ' + ecr(aller) + ' ÷ 2 = ' + ecr(d) + ' m.'],
          };
        },
      },
      O.qcm('role-signal', 'appareils', [
        ['Rachel appuie sur la télécommande. Que représente la télécommande ?', 'L’émetteur', 'Elle envoie le signal vers la télévision.'],
        ['La télévision capte la lumière envoyée par la télécommande. Que représente-t-elle ?', 'Le récepteur', 'Elle reçoit le signal et lit l’information.'],
        ['Un sonar envoie un son vers le fond de la mer. Que représente ce son ?', 'Le signal', 'Le son porte l’information : c’est le signal.'],
        ['Moussa crie dans la vallée. Que représente Moussa ?', 'L’émetteur', 'Il envoie un signal sonore.'],
        ['Rachel entend le cri de Moussa. Que représente l’oreille de Rachel ?', 'Le récepteur', 'Elle reçoit le signal sonore.'],
        ['Dans une fibre optique, la lumière qui voyage porte l’information. Que représente cette lumière ?', 'Le signal', 'Cette lumière transporte l’information : c’est le signal.'],
      ], (x) => x, ['L’émetteur', 'Le récepteur', 'Le signal'], 'L’émetteur envoie, le récepteur reçoit, et le signal voyage entre les deux.'),
      O.qcm('porteur-information', 'famille', [
        ['Quel signal porte l’information dans une fibre optique ?', 'Un signal lumineux', 'Dans une fibre optique, c’est de la lumière qui voyage.'],
        ['Moussa appelle Rachel de loin, à la voix. Quel signal utilise-t-il ?', 'Un signal sonore', 'La voix est un son.'],
        ['Quel signal la télécommande envoie-t-elle à la télévision ?', 'Un signal lumineux', 'Elle envoie de la lumière infrarouge, invisible à l’œil.'],
        ['Quel signal un sonar envoie-t-il dans l’eau ?', 'Un signal sonore', 'Un sonar envoie un son et écoute l’écho.'],
        ['Quel signal un phare envoie-t-il aux bateaux la nuit ?', 'Un signal lumineux', 'Le phare envoie de la lumière.'],
        ['Quel signal un sifflet d’arbitre envoie-t-il aux joueurs ?', 'Un signal sonore', 'Le sifflet produit un son.'],
      ], (x) => x, ['Un signal lumineux', 'Un signal sonore', 'Un signal électrique'], 'Demande-toi : est-ce de la lumière ou du son qui voyage ?'),
      {
        id: 'temps-lumiere',
        univers: 'appareils',
        // [distance en km]
        versions: [150000, 300000, 600000, 900000, 1500000, 3000000],
        genere(c) {
          const d = c.alea.choisir(this.versions);
          const t = d / 300000;
          return {
            enonce: 'La lumière va à 300 000 km/s. Un signal lumineux parcourt ' + fmt(d) + ' km. Combien de secondes met-il ?',
            reponse: { type: 'nombre', valeur: t },
            aide: 'Divise ' + fmt(d) + ' par 300 000.',
            aideParlee: 'Divise la distance par la vitesse de la lumière.',
            correction: [fmt(d) + ' ÷ 300 000 = ' + ecr(t) + ' s.'],
          };
        },
      },
    ],

    defi: {
      // [secondes entre l'éclair et le tonnerre]
      versions: [[2], [3], [1], [5]],
      genere(c) {
        const [t] = c.alea.choisir(this.versions);
        const d = 340 * t, km = d / 1000, plus = d > 1000;
        return {
          enonce: 'Un soir d’orage, Rachel et Moussa regardent le ciel depuis la cour. Dans cet exemple, ils voient un éclair, puis entendent le tonnerre ' + t + (t > 1 ? ' secondes' : ' seconde') + ' plus tard. Le son va à 340 m/s dans l’air et la lumière à 300 000 km/s.',
          questions: [
            {
              texte: 'Question 1. À quelle distance est l’éclair, en mètres ?',
              reponse: { type: 'nombre', valeur: d },
              aide: 'Multiplie la vitesse du son par la durée : 340 × ' + t + '.',
              aideParlee: 'Multiplie la vitesse du son par la durée.',
              correction: ['d = v × t = 340 × ' + t + ' = ' + ecr(d) + ' m.'],
            },
            {
              texte: 'Question 2. Écris cette distance en kilomètres.',
              reponse: { type: 'nombre', valeur: km },
              aide: 'Divise par 1 000 : 1 km = 1 000 m.',
              correction: [fmt(d) + ' ÷ 1 000 = ' + ecr(km) + ' km.'],
            },
            {
              texte: 'Question 3. L’éclair est-il à plus d’un kilomètre ?',
              reponse: O.choix(c.alea, plus ? 'Oui' : 'Non', ['Oui', 'Non']),
              aide: 'Compare la distance à 1 km.',
              correction: ['Distance : ' + ecr(km) + ' km.', ecr(km) + (plus ? ' est plus grand que 1.' : ' est plus petit que 1.'), 'Réponse : ' + (plus ? 'Oui' : 'Non') + '.'],
            },
            {
              texte: 'Question 4. Rachel voit l’éclair avant d’entendre le tonnerre. Explique pourquoi. Parle des deux signaux et de leur vitesse.',
              correction: ['L’éclair et le tonnerre partent en même temps, mais la lumière va bien plus vite que le son.', 'La lumière, à environ 300 000 km/s, arrive presque tout de suite. Le son, à environ 340 m/s, arrive plus tard.'],
              grille: ['As-tu parlé des deux signaux, la lumière et le son ?', 'As-tu dit que la lumière va plus vite que le son ?', 'As-tu cité les vitesses, 300 000 km/s et 340 m/s ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Émetteur, récepteur, signal : tu sais comment un message voyage, par la lumière ou par le son.',
    carte: ['distance-orage', 'echo-falaise', 'role-signal'],
    papierDuSoir: { exercices: ['echo-falaise', 'temps-lumiere'], defi: true },
    automatismes: [
      {
        id: 'fois-340',
        versions: [[2], [3], [4], [5], [10]],
        genere(c) { const [t] = c.alea.choisir(this.versions); return { enonce: '340 × ' + t + ' = ?', reponse: { type: 'nombre', valeur: 340 * t } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? Au Nigeria, le tambour parlant dùndún des Yoruba imite les trois tons de leur langue.',
    prenoms: ['Rachel', 'Moussa'],
  };
});
