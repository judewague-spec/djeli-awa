/* Test de départ du bloc de physique-chimie « Mouvement et forces » : « La cour des charrettes » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un arrêt par notion testée (cycle 4 et 4e ; les notions de 3e sont toujours à apprendre).
   Dans la cour de la forge, chaque charretier dit sa phrase, puis pose deux questions tirées des générateurs de la notion. Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'cour-des-charrettes',
  bloc: 'mouvement-forces',
  titre: 'La cour des charrettes',
  etape: 'arrêt',
  prefixe: 'cour',
  phrases: {
    'test-intro': 'Viens dans la cour des charrettes, derrière la forge ! Ici, ça roule, ça pousse et ça tire. À chaque arrêt, un charretier te pose deux petites questions. Prends ton cahier. Tu peux t’arrêter quand tu veux : on reprendra à l’arrêt suivant.',
    'test-reprise': 'On reprend dans la cour des charrettes, à l’endroit où tu t’étais arrêtée.',
    'test-fin': 'Toutes les charrettes sont passées. Merci ! Ton chemin du mouvement et des forces est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'trajectoire', titre: 'La trace dans la poussière', phrase: 'Ma charrette laisse une trace dans la poussière. Sais-tu la décrire ?', generateurs: ['quel-chemin', 'tours-de-piste'] },
    { notion: 'vitesse-moyenne', titre: 'La borne du chemin', phrase: 'Tant de kilomètres, en tant d’heures. À quelle allure suis-je venu ?', generateurs: ['calculer-v', 'calculer-d'] },
    { notion: 'nature-mouvement', titre: 'Les gouttes d’huile', phrase: 'Mon essieu perd de l’huile, goutte après goutte. Que racontent ces taches ?', generateurs: ['lire-les-gouttes', 'dans-la-vie'] },
    { notion: 'relativite-mouvement', titre: 'Le passager assis', phrase: 'Mon passager dit qu’il ne bouge pas. Moi, je le vois passer. Qui a raison ?', generateurs: ['bouge-ou-pas', 'marcher-vers-l-avant'] },
    { notion: 'actions-mecaniques', titre: 'La corde et l’aimant', phrase: 'Ma corde tire, et cet aimant attire sans toucher. Sais-tu les distinguer ?', generateurs: ['contact-ou-distance', 'effet-de-l-action'] },
    { notion: 'force-newton', titre: 'Le ressort gradué', phrase: 'Avec ce ressort, je mesure combien je tire. Sais-tu le lire ?', generateurs: ['quelle-caracteristique', 'lire-le-dynamometre'] },
    { notion: 'representer-force', titre: 'Le plan du chargement', phrase: 'Sur mon plan, une flèche montre chaque force. Que dit-elle ?', generateurs: ['longueur-de-la-fleche', 'ce-que-dit-la-fleche'] },
  ],
});
