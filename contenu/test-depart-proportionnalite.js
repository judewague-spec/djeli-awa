/* Test de départ du bloc « Proportionnalité, pourcentages et fonctions » : « La ronde des balances » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un stand du marché par notion testée (notions de 4e ; celles de 3e sont toujours à apprendre).
   La marchande dit sa phrase, puis pose deux questions tirées des générateurs de la notion.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'ronde-des-balances',
  bloc: 'proportionnalite',
  titre: 'La ronde des balances',
  etape: 'stand',
  prefixe: 'balances',
  phrases: {
    'test-intro': 'Viens, on fait la ronde des balances, au marché ! À chaque stand, une marchande te pose deux petites questions sur ses prix et ses mesures. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend la ronde des balances là où tu t’étais arrêtée.',
    'test-fin': 'La ronde des balances est finie. Merci ! Ton chemin de la proportionnalité est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'reconnaitre-proportionnalite', titre: 'Le stand des mangues', phrase: 'Ici, tout se vend au kilo. Mon prix suit-il vraiment ma balance ?', generateurs: ['tableau-proportionnel', 'case-manquante'] },
    { notion: 'quatrieme-proportionnelle', titre: 'Le stand des beignets', phrase: 'Ma recette est pour quatre. Ce soir, nous serons six. Combien de farine ?', generateurs: ['recette', 'quel-calcul'] },
    { notion: 'grandeur-vitesse', titre: 'Le stand du livreur', phrase: 'Mon livreur fait le tour du marché à vélo. À quelle allure va-t-il ?', generateurs: ['calculer-la-vitesse', 'calculer-la-distance'] },
    { notion: 'grandeur-debit', titre: 'La fontaine du marché', phrase: 'Tout le monde remplit ses seaux à cette fontaine. Quelle est sa force ?', generateurs: ['calculer-le-debit', 'calculer-le-volume'] },
    { notion: 'dependance-formule', titre: 'Le stand du taxi', phrase: 'Pour rentrer, je prends un taxi. Son prix dépend de la distance.', generateurs: ['prix-du-taxi', 'quelle-formule'] },
    { notion: 'dependance-graphique', titre: 'Le stand de l’ombre', phrase: 'Je note la chaleur de la journée, heure après heure. Sais-tu me lire ?', generateurs: ['lire-une-valeur', 'quel-axe'] },
  ],
});
