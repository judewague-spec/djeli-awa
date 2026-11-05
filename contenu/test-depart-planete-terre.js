/* Test de départ du bloc « Planète Terre, environnement, action humaine » : « La promenade du champ » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un coin du champ par notion testée (toutes sont du cycle 4). Il ne redit ni « Le tour du potager » ni « La visite du verger » :
   ici, on sort du potager, on marche jusqu'au bout du champ, et chaque coin fait penser à la Terre entière.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'promenade-du-champ',
  bloc: 'planete-terre',
  titre: 'La promenade du champ',
  etape: 'coin',
  prefixe: 'champ',
  phrases: {
    'test-intro': 'Viens, on marche jusqu’au bout du champ ! À chaque coin, je te pose deux petites questions sur la Terre. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend la promenade du champ là où tu t’étais arrêtée.',
    'test-fin': 'La promenade du champ est finie. Merci ! Ton chemin de la planète Terre est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'systeme-solaire', titre: 'Le coin du grand ciel', phrase: 'Le soir, ici, on voit des points brillants. Lesquels sont nos voisins ?', generateurs: ['rocheuse-ou-gazeuse', 'maquette'] },
    { notion: 'plaques-tectoniques', titre: 'Le coin de la terre craquelée', phrase: 'Ce sol sec se fend en morceaux. La Terre aussi, en bien plus grand.', generateurs: ['quel-mouvement', 'avance-en-metres'] },
    { notion: 'seismes', titre: 'Le coin de la vieille clôture', phrase: 'Cette clôture a bougé, un jour où le sol a tremblé.', generateurs: ['mot-juste', 'distance-station'] },
    { notion: 'volcans', titre: 'Le coin des pierres noires', phrase: 'Ces pierres noires sont sorties, un jour, du fond de la Terre.', generateurs: ['quel-type', 'magma-ou-lave'] },
    { notion: 'eres-geologiques', titre: 'Le coin de la coquille', phrase: 'Regarde cette coquille dans la roche. Elle a bien plus d’âge que nous.', generateurs: ['plus-ancienne', 'duree-periode'] },
    { notion: 'meteo-climat', titre: 'Le coin du pluviomètre', phrase: 'Ce petit tube compte la pluie, jour après jour et année après année.', generateurs: ['meteo-ou-climat', 'moyenne-temperature'] },
    { notion: 'vents-courants', titre: 'Le coin du cerf-volant', phrase: 'Aujourd’hui, le vent tire fort sur le fil. D’où vient-il ?', generateurs: ['sens-du-vent', 'ce-qui-voyage'] },
    { notion: 'zones-climatiques', titre: 'Le coin des graines venues de loin', phrase: 'Ces graines ont grandi sous d’autres ciels. Quel climat leur faut-il ?', generateurs: ['quelle-zone', 'plus-pres-equateur'] },
    { notion: 'changements-climatiques', titre: 'Le coin des anciens carnets', phrase: 'Le grand-père notait les récoltes. Le temps n’est plus tout à fait le même.', generateurs: ['cause-ou-consequence', 'hausse-station'] },
    { notion: 'alea-vulnerabilite', titre: 'Le coin de la rivière', phrase: 'La rivière peut monter. Mais qui serait touché, ici ?', generateurs: ['alea-enjeu-vulnerabilite', 'maisons-touchees'] },
    { notion: 'prevention-risques', titre: 'Le coin du panneau', phrase: 'Ce panneau montre où monter en cas de crue. Sais-tu quoi faire ?', generateurs: ['quel-mot', 'bon-geste'] },
    { notion: 'ressources-eau-sol', titre: 'Le coin du tonneau', phrase: 'Ce tonneau garde l’eau de pluie, et cette terre nourrit tout le champ.', generateurs: ['etape-du-cycle', 'recuperateur'] },
    { notion: 'ressources-exploitees', titre: 'Le coin du tas de bois', phrase: 'Ce bois vient de la forêt. Tout ce que l’on prend se refait-il ?', generateurs: ['se-refait-ou-pas', 'durable-ou-pas'] },
    { notion: 'activites-ecosystemes', titre: 'Le coin de la mare', phrase: 'Dans cette mare, tout le monde dépend de tout le monde.', generateurs: ['milieu-ou-vivant', 'cause-effet'] },
    { notion: 'biodiversite-gestion', titre: 'Le coin de la haie', phrase: 'Dans cette haie, je compte des oiseaux, des insectes et des fleurs.', generateurs: ['menace-ou-geste', 'difference-especes'] },
  ],
});
