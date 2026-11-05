/* Notion 4 du bloc « Mouvement et forces » : le mouvement dépend de qui regarde. Rachel dans le train, Laure sur le quai.
   Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const ETATS = ['Elle est immobile', 'Elle est en mouvement', 'On ne peut rien dire'];

  return {
    id: 'relativite-mouvement',
    matiere: 'physique-chimie',
    bloc: 'mouvement-forces',
    titre: 'Le mouvement dépend de qui regarde',
    classe: 'cycle 4',
    univers: ['dehors', 'famille', 'champetre'],
    source: 'Programme de physique-chimie du cycle 4 (BO n° 31 du 30 juillet 2020), thème « Mouvement et interactions » : relativité du mouvement dans des cas simples.',

    accroche: {
      texte: 'Rachel est assise dans le train, son sac sur les genoux. Sur le quai, Laure, sa maman, lui fait signe. Le train démarre. ' +
        'Rachel envoie un message : « Je ne bouge pas, je suis bien assise ». Laure répond : « Tu files à toute allure ! ». Laquelle des deux a raison ?',
      image: { dessin: 'train-quai', description: 'Rachel est assise dans un train qui roule vers la droite. Laure est debout sur le quai et regarde passer le train. Le quai ne bouge pas par rapport au sol.' },
    },

    manipulation: {
      image: { dessin: 'train-quai', description: 'Rachel est assise dans un train qui roule vers la droite. Laure est debout sur le quai et regarde passer le train. Le quai ne bouge pas par rapport au sol.' },
      etapes: [
        'Regarde depuis le siège d’à côté : Rachel reste à la même place. Pour son voisin, elle est immobile.',
        'Regarde depuis le quai : Rachel s’éloigne. Pour Laure, elle est en mouvement.',
        'Les deux ont donc raison. Ce qui change, c’est l’objet que l’on prend comme repère.',
        'On ne dit donc jamais seulement « ça bouge ». On dit « ça bouge par rapport à… ».',
        'Si Rachel marche vers l’avant du train, Laure voit les deux vitesses s’ajouter.',
        'Si elle marche vers l’arrière, Laure voit la vitesse de Rachel diminuer.',
      ],
    },

    decouverte: {
      texte: (c) => 'Un mouvement se décrit toujours par rapport à quelque chose. Ce quelque chose s’appelle ' + c.mot('referentiel') + '. ' +
        'C’est pour cela que l’on dit que le mouvement est ' + c.mot('relatif') + '. ' +
        'L’astuce : avant de répondre, demande-toi toujours : par rapport à quoi ?',
    },

    vocabulaire: {
      termes: {
        referentiel: { sesMots: 'l’objet que l’on prend comme repère', officiel: 'le référentiel', lesDeux: 'l’objet que l’on prend comme repère, que les physiciens appellent le référentiel' },
        relatif: { sesMots: 'dépendant de celui qui regarde', officiel: 'relatif', lesDeux: 'dépendant de celui qui regarde, ce que les physiciens appellent relatif' },
      },
      textes: [
        'Pour l’instant, garde tes mots : l’objet que l’on prend comme repère, et un mouvement qui dépend de celui qui regarde. ' +
          'Les physiciens ont des mots à eux : je te les dirai la prochaine fois.',
        'Les physiciens disent : le référentiel, pour l’objet pris comme repère. Et ils disent que le mouvement est relatif.',
        'Tu connais les mots officiels : le référentiel, et le mouvement relatif.',
      ],
    },

    exercices: [
      O.qcm('bouge-ou-pas', 'famille',
        [['Rachel est assise dans le train qui roule. Par rapport à Laure, debout sur le quai :', 'Elle est en mouvement'], ['Rachel est assise dans le train qui roule. Par rapport à son siège :', 'Elle est immobile'], ['Clarisse conduit sa voiture sur la route. Par rapport à son volant :', 'Elle est immobile'], ['Clarisse conduit sa voiture sur la route. Par rapport à un arbre du bord de la route :', 'Elle est en mouvement']],
        (x) => x, ETATS,
        'Demande-toi si la distance change entre elle et l’objet pris comme repère.'),
      O.qcm('quel-repere', 'dehors',
        [['Pour dire qu’un arbre est immobile, on le regarde depuis :', 'Le sol'], ['Pour dire qu’une passagère est immobile dans un bus, on la regarde depuis :', 'Le bus'], ['Pour dire que la Terre tourne autour du Soleil, on la regarde depuis :', 'Le Soleil']],
        (x) => x, ['Le sol', 'Le bus', 'Le Soleil'],
        'Cherche l’objet par rapport auquel la distance ne change pas, ou par rapport auquel on décrit le mouvement.'),
      {
        id: 'marcher-vers-l-avant',
        univers: 'dehors',
        // [vitesse du train, vitesse de marche] en m/s
        versions: [[20, 2], [30, 1], [25, 2], [40, 3], [15, 1]],
        genere(c) {
          const [t, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le train roule à ' + t + ' m/s par rapport au quai. Dans le couloir, Moussa marche vers l’avant du train à ' + m + ' m/s par rapport au train. Quelle est sa vitesse par rapport au quai, en m/s ?',
            reponse: { type: 'nombre', valeur: t + m },
            aide: 'Calcule ' + t + ' + ' + m + '.',
            aideParlee: 'Il va dans le même sens que le train : les deux vitesses s’ajoutent.',
            correction: ['Même sens : on ajoute. ' + t + ' + ' + m + ' = ' + (t + m) + ' m/s.'],
          };
        },
      },
      {
        id: 'marcher-vers-l-arriere',
        univers: 'dehors',
        versions: [[20, 2], [30, 1], [25, 2], [40, 3], [15, 1]],
        genere(c) {
          const [t, m] = c.alea.choisir(this.versions);
          return {
            enonce: 'Le train roule à ' + t + ' m/s par rapport au quai. Dans le couloir, Aminata marche vers l’arrière du train à ' + m + ' m/s par rapport au train. Quelle est sa vitesse par rapport au quai, en m/s ?',
            reponse: { type: 'nombre', valeur: t - m },
            aide: 'Calcule ' + t + ' − ' + m + '.',
            aideParlee: 'Elle va dans le sens contraire du train : on retire sa vitesse de celle du train.',
            correction: ['Sens contraire : on retire. ' + t + ' − ' + m + ' = ' + (t - m) + ' m/s.'],
          };
        },
      },
      O.qcm('la-balle-lachee', 'champetre',
        [['Dans un train qui roule à vitesse stable, Rachel lâche une balle. Pour Rachel, la balle tombe en dessinant :', 'Une ligne droite'], ['Dans le même train, Rachel lâche une balle. Pour Laure, sur le quai, la balle dessine :', 'Une courbe'], ['Sur une charrette qui avance à vitesse stable, Moussa lâche une mangue. Pour lui, elle tombe en dessinant :', 'Une ligne droite'], ['Sur la même charrette, Moussa lâche une mangue. Pour une paysanne dans le champ, elle dessine :', 'Une courbe']],
        (x) => x, ['Une ligne droite', 'Une courbe', 'Un cercle'],
        'La balle avance avec le train, ou la mangue avec la charrette. Qui voit cette avancée ?'),
    ],

    defi: {
      // [vitesse du courant, vitesse de la pirogue par rapport à l'eau] en m/s
      versions: [[1, 2], [2, 3], [1, 4], [2, 1]],
      genere(c) {
        const [e, r] = c.alea.choisir(this.versions);
        return {
          enonce: 'Esther descend le fleuve Sanaga en pirogue, dans le sens du courant. L’eau avance à ' + e + ' m/s par rapport à la berge. La pirogue avance à ' + r + ' m/s par rapport à l’eau. Sur la berge, Moussa regarde la pirogue passer.',
          questions: [
            {
              texte: 'Question 1. Par rapport à sa pirogue, comment est Esther, assise sans bouger ?',
              reponse: O.choix(c.alea, 'Elle est immobile', ['Elle est en mouvement', 'On ne peut rien dire']),
              aide: 'La distance entre Esther et sa pirogue change-t-elle ?',
              correction: ['La distance entre Esther et sa pirogue ne change pas.', 'Réponse : Elle est immobile.'],
            },
            {
              texte: 'Question 2. Calcule la vitesse de la pirogue par rapport à la berge, en m/s.',
              reponse: { type: 'nombre', valeur: e + r },
              aide: 'La pirogue va dans le sens du courant : les deux vitesses s’ajoutent.',
              correction: ['Même sens : ' + e + ' + ' + r + ' = ' + (e + r) + ' m/s.'],
            },
            {
              texte: 'Question 3. Moussa dit : « Esther bouge ». Esther répond : « Je ne bouge pas ». Explique pourquoi ces deux phrases peuvent être justes, avec le mot officiel.',
              correction: ['Le mouvement est relatif : il dépend du référentiel. Par rapport à la berge, Esther bouge. Par rapport à sa pirogue, elle ne bouge pas.'],
              grille: ['As-tu employé le mot « référentiel » ?', 'As-tu décrit le mouvement par rapport à la berge et par rapport à la pirogue ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avant de dire « ça bouge », tu demandes maintenant : par rapport à quoi ?',
    carte: ['bouge-ou-pas', 'quel-repere', 'la-balle-lachee'],
    papierDuSoir: { exercices: ['marcher-vers-l-avant', 'marcher-vers-l-arriere'], defi: true },
    automatismes: [
      {
        id: 'somme-de-vitesses',
        versions: [[20, 3], [15, 2], [30, 4], [25, 5]],
        genere(c) { const [a, b] = c.alea.choisir(this.versions); return { enonce: a + ' m/s + ' + b + ' m/s = ? (en m/s)', reponse: { type: 'nombre', valeur: a + b } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? En Italie, Galilée a comparé la Terre à un navire. Une pierre lâchée du haut du mât retombe au pied du mât, même si le navire avance.',
    prenoms: ['Rachel', 'Laure', 'Clarisse', 'Moussa', 'Aminata', 'Esther'],
  };
});
