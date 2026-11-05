/* Test de départ du bloc « Données, probabilités, programmation » : « La grande enquête du marché » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un stand d'enquête par notion testée (4e ; celles de 3e sont toujours à apprendre).
   Il ne redit pas les autres tests du marché : ici, Aminata mène une enquête auprès des marchands, avec ses chiffres, ses jeux de hasard et sa petite machine programmée.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'grande-enquete',
  bloc: 'donnees-probabilites',
  titre: 'La grande enquête du marché',
  etape: 'table',
  prefixe: 'enquete',
  phrases: {
    'test-intro': 'Viens, on mène la grande enquête du marché ! À chaque table, on compte, on trie, on joue un peu. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend la grande enquête là où tu t’étais arrêtée.',
    'test-fin': 'La grande enquête est finie. Merci ! Ton chemin des données et du hasard est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'tableaux-donnees', titre: 'La table des ventes', phrase: 'Toutes mes ventes sont dans ce tableau. Sais-tu le lire ?', generateurs: ['lire-une-case', 'total-ligne'] },
    { notion: 'diagramme-batons', titre: 'La table des bâtons', phrase: 'J’ai dessiné mes ventes en bâtons. Lequel est le plus haut ?', generateurs: ['lire-un-baton', 'jour-le-plus-haut'] },
    { notion: 'diagramme-circulaire', titre: 'La table du rond', phrase: 'Ce rond est partagé selon mes clients. Quel angle pour chacun ?', generateurs: ['calculer-un-angle', 'angle-manquant'] },
    { notion: 'effectifs-frequences', titre: 'La table des comptages', phrase: 'Je compte mes clients, puis je cherche leur part.', generateurs: ['compter-en-tout', 'frequence-decimale'] },
    { notion: 'moyenne-simple', titre: 'La table des dépenses', phrase: 'Combien ai-je dépensé par jour, en moyenne, cette semaine ?', generateurs: ['moyenne-des-depenses', 'somme-depuis-moyenne'] },
    { notion: 'moyenne-ponderee', titre: 'La table des notes', phrase: 'Cette note compte double. Quelle est ma moyenne ?', generateurs: ['deux-notes', 'somme-des-produits'] },
    { notion: 'mediane-etendue', titre: 'La table des prix', phrase: 'Je range mes prix du plus petit au plus grand. Lequel est au milieu ?', generateurs: ['ranger-milieu', 'ecart-temperatures'] },
    { notion: 'issues-evenements', titre: 'La table du dé', phrase: 'Je lance ce dé. Que peut-il arriver ?', generateurs: ['toutes-les-issues', 'combien-pour-gagner'] },
    { notion: 'calculer-probabilite', titre: 'La table du panier', phrase: 'Je tire un fruit sans regarder. Quelle chance d’avoir une mangue ?', generateurs: ['panier-fraction', 'tombola-decimal'] },
    { notion: 'evenement-contraire', titre: 'La table de la tombola', phrase: 'Si je connais ma chance de gagner, je connais celle de perdre.', generateurs: ['perdre-fraction', 'un-moins-p'] },
    { notion: 'scratch-sequences', titre: 'La table du petit robot', phrase: 'Mon petit robot fait ses gestes dans l’ordre écrit. Où arrive-t-il ?', generateurs: ['valeur-de-x', 'ordre-compte'] },
    { notion: 'scratch-boucles', titre: 'La table des répétitions', phrase: 'Inutile d’écrire dix fois la même chose. Il suffit de répéter.', generateurs: ['avancer-repete', 'combien-de-fois'] },
    { notion: 'scratch-variables', titre: 'La table de la caisse', phrase: 'Ma caisse change à chaque vente. Combien contient-elle maintenant ?', generateurs: ['suivre-valeur', 'mettre-ecrase'] },
    { notion: 'scratch-conditions', titre: 'La table des tarifs', phrase: 'Si le client prend beaucoup, alors je baisse le prix.', generateurs: ['suivre-si-sinon', 'deux-tarifs'] },
  ],
});
