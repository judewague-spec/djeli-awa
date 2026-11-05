/* Test de départ du bloc « Signaux et Univers » : « La nuit de la forge » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un moment de la soirée par notion testée (cycle 4 ; celle de 3e est toujours à apprendre).
   Il ne redit aucun test de la forge : ici, le feu s'éteint, l'orage passe, et on regarde le ciel depuis la cour.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'nuit-de-la-forge',
  bloc: 'signaux-univers',
  titre: 'La nuit de la forge',
  etape: 'moment',
  prefixe: 'nuit',
  phrases: {
    'test-intro': 'Viens, la forge s’endort, et on sort dans la cour ! À chaque moment de la soirée, je te pose deux petites questions. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend la nuit de la forge là où tu t’étais arrêtée.',
    'test-fin': 'La nuit de la forge est finie. Merci ! Ton chemin des signaux et de l’Univers est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'sources-lumiere', titre: 'La dernière braise', phrase: 'Cette braise brille encore. Et le marteau, à côté, pourquoi le voit-on ?', generateurs: ['source-ou-diffusant', 'qui-fabrique-la-lumiere'] },
    { notion: 'propagation-lumiere', titre: 'L’ombre sur le mur', phrase: 'Regarde l’ombre de ma main sur le mur de la forge.', generateurs: ['ou-est-l-ombre', 'tuyau'] },
    { notion: 'vitesse-lumiere', titre: 'L’éclair au loin', phrase: 'Cet éclair, on le voit presque aussitôt. Quelle vitesse !', generateurs: ['duree-du-trajet', 'lumiere-ou-son'] },
    { notion: 'annee-lumiere', titre: 'La première étoile', phrase: 'La lumière de cette étoile a voyagé bien des années.', generateurs: ['que-mesure-t-on', 'temps-de-voyage'] },
    { notion: 'propagation-son', titre: 'Le bruit de l’enclume', phrase: 'J’entends encore l’enclume vibrer. Comment ce bruit vient-il jusqu’à nous ?', generateurs: ['entend-on', 'qui-vibre'] },
    { notion: 'vitesse-son', titre: 'Le tonnerre', phrase: 'Compte avec moi, entre l’éclair et le tonnerre.', generateurs: ['distance-de-l-orage', 'temps-a-compter'] },
    { notion: 'signal-information', titre: 'La télécommande', phrase: 'D’un seul geste, j’éteins le ventilateur depuis la cour. Qui porte l’ordre ?', generateurs: ['role-signal', 'porteur-information'] },
    { notion: 'galaxies-ordres', titre: 'La bande blanche du ciel', phrase: 'Cette longue bande blanche, là-haut, c’est notre galaxie.', generateurs: ['nature-unite', 'plus-grand'] },
    { notion: 'formation-systeme-solaire', titre: 'La Lune qui se lève', phrase: 'Comment le Soleil et ses planètes sont-ils nés ?', generateurs: ['ordre-formation', 'type-planete'] },
    { notion: 'origine-elements', titre: 'Le fer de la forge', phrase: 'Ce fer que je bats vient de très loin, et de très longtemps.', generateurs: ['ou-est-ne', 'plus-vieux'] },
  ],
});
