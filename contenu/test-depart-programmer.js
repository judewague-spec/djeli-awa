/* Test de départ du bloc « Programmer » : « La veilleuse de l'atelier » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un réglage par notion testée (cycle 4 et 4e ; celles de 3e sont toujours à apprendre).
   Il ne redit aucun test de l'atelier : ici, on programme, ligne par ligne, une veilleuse pour l'établi. Tous les programmes sont écrits en mots.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'veilleuse-atelier',
  bloc: 'programmer',
  titre: 'La veilleuse de l’atelier',
  etape: 'réglage',
  prefixe: 'veilleuse',
  phrases: {
    'test-intro': 'Viens, on programme une veilleuse pour l’établi ! À chaque réglage, je te pose deux petites questions. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend la veilleuse de l’atelier là où tu t’étais arrêtée.',
    'test-fin': 'La veilleuse de l’atelier est finie. Merci ! Ton chemin de la programmation est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'prog-variables', titre: 'La petite mémoire', phrase: 'La veilleuse doit retenir un nombre. Où le range-t-elle ?', generateurs: ['valeur-finale', 'quelle-ligne'] },
    { notion: 'prog-operateurs', titre: 'Le calcul', phrase: 'La veilleuse sait compter et comparer. Sais-tu ce qu’elle trouve ?', generateurs: ['recette', 'vrai-ou-faux'] },
    { notion: 'prog-conditions', titre: 'Le choix', phrase: 'S’il fait noir, on allume. Sinon, on éteint.', generateurs: ['veilleuse', 'quel-chemin'] },
    { notion: 'prog-et-ou-non', titre: 'Les deux conditions', phrase: 'Il faut qu’il fasse noir, et que la porte soit ouverte.', generateurs: ['et-deux-conditions', 'ou-deux-conditions'] },
    { notion: 'prog-boucles', titre: 'Le clignotement', phrase: 'La lampe clignote trois fois. Inutile de tout écrire trois fois.', generateurs: ['total-repete', 'quelle-boucle'] },
    { notion: 'prog-listes', titre: 'Les relevés', phrase: 'La veilleuse garde ses mesures de lumière, l’une après l’autre.', generateurs: ['somme-liste', 'quelle-instruction'] },
    { notion: 'prog-evenements', titre: 'Le bouton', phrase: 'Quand j’appuie sur ce bouton, le programme se lance.', generateurs: ['evenement-ou-instruction', 'deux-boutons'] },
    { notion: 'prog-entrees-sorties', titre: 'Le capteur de lumière', phrase: 'Le capteur lit la lumière. Et la lampe, que fait-elle ?', generateurs: ['entree-ou-sortie', 'lampe-veilleuse'] },
    { notion: 'algorithme-programme', titre: 'Le carnet', phrase: 'J’ai écrit ma recette en français. Comment la traduire en blocs ?', generateurs: ['ordre-des-blocs', 'traduire-la-phrase'] },
  ],
});
