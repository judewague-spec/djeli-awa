/* Test de départ du bloc « Énergie » : « Le chemin du feu » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un coin de la forge par notion testée (cycle 4 ; celles de 3e sont toujours à apprendre).
   Il ne redit ni « Le tour de la forge » ni « La cour des charrettes » : ici, on suit le feu du forgeron, du charbon jusqu'à la lampe.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'chemin-du-feu',
  bloc: 'energie',
  titre: 'Le chemin du feu',
  etape: 'étape',
  prefixe: 'feu',
  phrases: {
    'test-intro': 'Viens, on suit le chemin du feu, dans la forge ! À chaque étape, je te pose deux petites questions sur l’énergie. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend le chemin du feu là où tu t’étais arrêtée.',
    'test-fin': 'Le chemin du feu est fini. Merci ! Ton chemin de l’énergie est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'formes-energie', titre: 'Le tas de charbon', phrase: 'Ce charbon ne bouge pas, et pourtant il garde de l’énergie.', generateurs: ['quelle-forme', 'source-ou-forme'] },
    { notion: 'conversions-energie', titre: 'Le soufflet', phrase: 'Mes bras poussent le soufflet, et le feu grandit. Que devient cette énergie ?', generateurs: ['forme-utile', 'forme-recue'] },
    { notion: 'chaine-energetique', titre: 'La lampe de poche', phrase: 'La lampe du forgeron s’éteint. Sais-tu refaire son chemin ?', generateurs: ['role-dans-la-chaine', 'ordre-de-la-chaine'] },
    { notion: 'centrale-electrique', titre: 'Le câble du village', phrase: 'Ce câble vient de loin. Comment fabrique-t-on ce courant ?', generateurs: ['quelle-source', 'quelle-piece'] },
    { notion: 'conservation-energie', titre: 'L’enclume brûlante', phrase: 'L’énergie reçue n’a pas disparu. Où est-elle passée ?', generateurs: ['energie-dissipee', 'energie-utile'] },
    { notion: 'unites-energie', titre: 'Le compteur', phrase: 'Le compteur parle en kilowattheures. Et le savant, en joules.', generateurs: ['wh-en-joules', 'bonne-egalite'] },
    { notion: 'co2-effet-serre', titre: 'La cheminée', phrase: 'Regarde cette fumée. Qu’est-ce qui part dans le ciel ?', generateurs: ['gaz-forme', 'role-effet-serre'] },
    { notion: 'energie-position', titre: 'Le marteau levé', phrase: 'Plus je lève ce marteau, plus il frappe fort.', generateurs: ['calcul-ep', 'qui-a-le-plus'] },
  ],
});
