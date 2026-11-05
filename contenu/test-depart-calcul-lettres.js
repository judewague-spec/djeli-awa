/* Test de départ du bloc de maths « Le calcul avec des lettres » : « Les comptes du marché » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un comptoir du marché par notion testée (4e ; les notions de 3e et de l'ancien programme sont
   toujours à apprendre). Il ne redit pas le « Grand tour du marché » : ici, on visite les carnets de comptes des commerçants.
   Le commerçant dit sa phrase, puis pose deux questions tirées des générateurs de la notion. Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'comptes-du-marche',
  bloc: 'calcul-lettres',
  titre: 'Les comptes du marché',
  etape: 'comptoir',
  prefixe: 'comptoir',
  phrases: {
    'test-intro': 'Viens, on ouvre les carnets de comptes du marché ! À chaque comptoir, un commerçant te pose deux petites questions, avec des boîtes mystère. Prends ton cahier. Tu peux t’arrêter quand tu veux : on reprendra au prochain comptoir.',
    'test-reprise': 'On reprend les comptes du marché là où tu t’étais arrêtée.',
    'test-fin': 'Les comptes du marché sont finis. Merci ! Ton chemin du calcul avec des lettres est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'lire-expression', titre: 'Le carnet de Moussa', phrase: 'Dans mon carnet, une lettre remplace ce que je ne sais pas encore.', generateurs: ['ecrire-expression', 'que-veut-dire'] },
    { notion: 'remplacer-lettre', titre: 'Le tarif de la coiffeuse', phrase: 'Mon tarif est écrit avec une lettre. Sauras-tu calculer le prix ?', generateurs: ['somme-simple', 'tarif'] },
    { notion: 'tester-egalite', titre: 'Les deux vendeurs de pagnes', phrase: 'Deux prix, et une question : tombent-ils pareil ?', generateurs: ['vraie-ou-fausse', 'quelle-valeur'] },
    { notion: 'developper', titre: 'Le comptoir des lots', phrase: 'Trois lots de deux choses : comment le compter sans parenthèse ?', generateurs: ['developper-plus', 'calcul-malin'] },
    { notion: 'reduire', titre: 'Le rangement des boîtes', phrase: 'Les boîtes avec les boîtes, les sachets avec les sachets !', generateurs: ['x-et-nombres', 'les-x-ensemble'] },
    { notion: 'factoriser', titre: 'Le comptoir des paquets', phrase: 'Je cherche ce qui se répète, pour en faire des paquets.', generateurs: ['quel-facteur', 'factoriser-plus'] },
    { notion: 'mettre-en-equation', titre: 'Le ticket perdu', phrase: 'J’ai perdu mon ticket, mais je me souviens du total. Écrivons l’histoire.', generateurs: ['quelle-equation', 'tester-un-nombre'] },
    { notion: 'resoudre-equation', titre: 'La balance du riz', phrase: 'Ma balance est en équilibre. Combien pèse un sac ?', generateurs: ['resoudre-plus', 'premier-geste'] },
    { notion: 'equation-deux-cotes', titre: 'Les deux forfaits', phrase: 'Il y a des boîtes des deux côtés. Sais-tu les regrouper ?', generateurs: ['x-des-deux-cotes', 'forfaits'] },
  ],
});
