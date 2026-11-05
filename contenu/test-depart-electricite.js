/* Test de départ du bloc de physique-chimie « L'électricité » : « Le tour de la forge » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un atelier de la forge par notion testée (cycle 4 et 4e ; les notions de 3e sont toujours à apprendre).
   Le forgeron dit sa phrase, puis pose deux questions tirées des générateurs de la notion. Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'tour-de-la-forge',
  bloc: 'electricite',
  titre: 'Le tour de la forge',
  etape: 'atelier',
  prefixe: 'forge',
  phrases: {
    'test-intro': 'Viens, on fait le tour de la forge ! À chaque atelier, un forgeron te pose deux petites questions sur l’électricité. Prends ton cahier. Tu peux t’arrêter quand tu veux : on reprendra au prochain atelier.',
    'test-reprise': 'On reprend le tour de la forge là où tu t’étais arrêtée.',
    'test-fin': 'Le tour de la forge est fini. Merci ! Ton chemin de l’électricité est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'circuit-simple', titre: 'La lampe de l’atelier', phrase: 'Ma lampe à pile ne s’allume plus. Où le courant est-il coupé ?', generateurs: ['allume-ou-pas', 'conducteur-ou-isolant'] },
    { notion: 'serie-derivation', titre: 'La guirlande de la forge', phrase: 'Une ampoule grille, et voilà ce qui arrive aux autres. Sais-tu pourquoi ?', generateurs: ['serie-ou-derivation', 'lampes-encore-allumees'] },
    { notion: 'intensite', titre: 'Le compteur de courant', phrase: 'Mon appareil compte le courant dans le fil. Sais-tu le lire ?', generateurs: ['milli-en-ampere', 'comment-brancher'] },
    { notion: 'tension', titre: 'L’étagère des piles', phrase: 'Des piles à la suite, et la lampe brille plus fort. Combien de volts ?', generateurs: ['piles-a-la-suite', 'quel-appareil'] },
    { notion: 'lois-serie', titre: 'Les lampes à la file', phrase: 'Sur une seule boucle, comment se partagent le courant et les volts ?', generateurs: ['meme-courant', 'tension-de-la-lampe'] },
    { notion: 'lois-derivation', titre: 'Les fils qui se séparent', phrase: 'Ici, le fil se sépare en deux branches. Que devient le courant ?', generateurs: ['courant-principal', 'meme-tension'] },
    { notion: 'loi-ohm', titre: 'Le fil qui chauffe', phrase: 'Ce fil freine le courant, et il chauffe. Calculons avec ses ohms.', generateurs: ['calculer-u', 'que-devient-i'] },
  ],
});
