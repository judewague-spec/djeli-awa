/* Test de départ du bloc SVT « Le corps humain et la santé » : « Le tour du potager » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle du « Grand tour du marché » : un carré du potager et du champ par notion testée (cycle 4 et 4e ; les notions
   de 3e sont toujours à apprendre). La jardinière dit sa phrase, puis pose deux questions tirées des générateurs de la notion.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'tour-du-potager',
  bloc: 'corps-sante',
  titre: 'Le tour du potager',
  etape: 'carré',
  prefixe: 'potager',
  phrases: {
    'test-intro': 'Viens, on fait le tour du potager et du champ ! À chaque carré, une jardinière te pose deux petites questions sur ton corps et ta santé. Prends ton cahier. Tu peux t’arrêter quand tu veux : on reprendra au carré suivant.',
    'test-reprise': 'On reprend le tour du potager là où tu t’étais arrêtée.',
    'test-fin': 'Le tour du potager est fini. Merci ! Ton chemin du corps et de la santé est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'effort-rythmes', titre: 'Le chemin en pente', phrase: 'Monter la pente avec l’arrosoir, ça essouffle ! Parlons du cœur et du souffle.', generateurs: ['quinze-secondes', 'que-devient'] },
    { notion: 'effort-besoins', titre: 'Le carré des ignames', phrase: 'Bêcher fait travailler les muscles. Mais que leur faut-il pour tenir ?', generateurs: ['consomme-ou-rejette', 'sang-par-minute'] },
    { notion: 'systeme-nerveux', titre: 'La haie d’épines', phrase: 'Aïe, une épine ! Ta main se retire toute seule. Sais-tu comment ?', generateurs: ['reflexe-ou-volontaire', 'quel-centre'] },
    { notion: 'neurones', titre: 'Le réseau d’irrigation', phrase: 'Comme l’eau dans mes tuyaux, les messages voyagent dans ton corps.', generateurs: ['electrique-ou-chimique', 'combien-de-synapses'] },
    { notion: 'hygiene-de-vie', titre: 'Le hamac sous le manguier', phrase: 'Après le travail, le repos ! Dormir, s’échauffer, écouter son corps…', generateurs: ['heures-de-sommeil', 'bon-geste'] },
    { notion: 'drogues-dopage', titre: 'Le chemin du retour en scooter', phrase: 'Pour rentrer du champ en scooter, il faut des réflexes bien réveillés.', generateurs: ['substance-du-tabac', 'distance-de-reaction'] },
    { notion: 'digestion', titre: 'Le carré des légumes', phrase: 'Ces légumes finiront dans une assiette. Et ensuite, quel voyage !', generateurs: ['organe-suivant', 'nutriment'] },
    { notion: 'absorption', titre: 'Le canal d’arrosage', phrase: 'L’eau passe du canal à la terre ; les nutriments passent de l’intestin au sang.', generateurs: ['passe-ou-pas', 'ou'] },
    { notion: 'besoins-nutritionnels', titre: 'Le panier de la récolte', phrase: 'Dans mon panier, il y a de tout. De quoi composer une assiette équilibrée ?', generateurs: ['energie-du-repas', 'quelle-famille'] },
    { notion: 'microbes', titre: 'Le tas de compost', phrase: 'Dans le compost, des milliards de petits êtres invisibles travaillent pour nous.', generateurs: ['doublement', 'quel-microbe'] },
    { notion: 'hygiene-antiseptiques', titre: 'Le robinet du jardin', phrase: 'Les mains pleines de terre ? On les lave avant de cuisiner, et on soigne la moindre écorchure.', generateurs: ['quel-produit', 'temps-de-lavage'] },
    { notion: 'antibiotiques', titre: 'La trousse de la jardinière', phrase: 'Dans ma trousse, des médicaments. Mais pas pour n’importe quelle maladie !', generateurs: ['agit-ou-pas', 'comprimes'] },
    { notion: 'vaccination', titre: 'Le panneau du village', phrase: 'Sur le panneau, une annonce de vaccination. Sais-tu à quoi elle sert ?', generateurs: ['que-contient', 'couverture'] },
    { notion: 'puberte', titre: 'Le carré des jeunes pousses', phrase: 'Les jeunes pousses grandissent vite, comme les adolescents. Que se passe-t-il dans le corps ?', generateurs: ['qui-fabrique', 'changement-ou-pas'] },
    { notion: 'appareils-reproducteurs', titre: 'Le carré des graines', phrase: 'Les graines donnent de nouvelles plantes. Chez nous, ce sont d’autres cellules.', generateurs: ['qui-produit', 'quel-gamete'] },
    { notion: 'fecondation-grossesse', titre: 'Le calendrier des semis', phrase: 'Je note tout sur mon calendrier. Les cycles aussi se comptent en jours.', generateurs: ['jour-d-ovulation', 'placenta'] },
    { notion: 'contraception-ist', titre: 'L’abri de la jardinière', phrase: 'Sous l’abri, une affiche de santé. Lisons-la ensemble, sans gêne.', generateurs: ['protege-des-ist', 'comment-agit'] },
  ],
});
