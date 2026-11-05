/* Test de départ du bloc « Comment un objet fonctionne » : « Le grand démontage » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : une pièce démontée par notion testée (cycle 4 et 4e ; celles de 3e sont toujours à apprendre).
   Il ne redit ni « Le tour de l'atelier » ni « Le banc des machines » : ici, on démonte une vieille mobylette sur l'établi, pièce après pièce.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'grand-demontage',
  bloc: 'fonctionnement-objets',
  titre: 'Le grand démontage',
  etape: 'pièce',
  prefixe: 'demontage',
  phrases: {
    'test-intro': 'Viens, on démonte une vieille mobylette sur l’établi ! À chaque pièce, je te pose deux petites questions. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend le grand démontage là où tu t’étais arrêtée.',
    'test-fin': 'Le grand démontage est fini. Merci ! Ton chemin des objets est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'chaine-energie', titre: 'La batterie', phrase: 'Voici la batterie, et tous les fils qui en partent. Où va cette énergie ?', generateurs: ['quelle-action', 'duree-batterie'] },
    { notion: 'flux-energie-objet', titre: 'Le réservoir', phrase: 'De l’essence entre ici, un mouvement sort là-bas. Qu’est-ce qui circule ?', generateurs: ['quelle-sorte', 'entree-ou-sortie'] },
    { notion: 'transmission-mouvement', titre: 'La courroie', phrase: 'Cette courroie relie deux poulies. Comment tournent-elles ?', generateurs: ['quel-systeme', 'sens-de-rotation'] },
    { notion: 'rapport-engrenages', titre: 'Le pignon', phrase: 'Compte les dents de ce pignon. Combien de tours fera la roue ?', generateurs: ['tours-du-pignon', 'tours-de-la-roue'] },
    { notion: 'chaine-information', titre: 'Le clignotant', phrase: 'Je pousse ce bouton, et le clignotant s’allume. Que se passe-t-il entre les deux ?', generateurs: ['ordre-de-la-chaine', 'quel-temps-info'] },
    { notion: 'capteurs-interface', titre: 'Le compteur', phrase: 'Ce compteur montre la vitesse. Qui l’a mesurée ?', generateurs: ['quel-capteur', 'capteur-ou-interface'] },
    { notion: 'proprietes-materiaux', titre: 'Le garde-boue', phrase: 'Ce garde-boue plie sans casser. Pourquoi cette matière ?', generateurs: ['quelle-qualite', 'meilleure-regle'] },
    { notion: 'recyclage-materiaux', titre: 'Le bac à ferraille', phrase: 'Tout ne repart pas à la poubelle. Où va ce qui est abîmé ?', generateurs: ['quel-bac', 'matiere-refaite'] },
    { notion: 'forme-materiau-procede', titre: 'La poignée', phrase: 'Cette poignée a été moulée dans une matière qui chauffe peu.', generateurs: ['quel-procede', 'quel-materiau'] },
    { notion: 'fiabilite-durabilite', titre: 'Le câble de frein', phrase: 'Ce câble s’use à chaque freinage. Combien de temps tiendra-t-il ?', generateurs: ['piece-d-usure', 'cycles-et-annees'] },
    { notion: 'depannage', titre: 'Le phare éteint', phrase: 'Le phare ne s’allume plus. Par quoi commencer, sans rien abîmer ?', generateurs: ['quelle-etape', 'premier-geste'] },
  ],
});
