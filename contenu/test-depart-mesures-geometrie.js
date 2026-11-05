/* Test de départ du bloc « Mesures, géométrie et espace » : « Le chantier du marché » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un poste du chantier par notion testée (5e et 4e ; celles de 3e et de l'ancien programme sont toujours à apprendre).
   Il ne redit pas les autres tests du marché : ici, on rebâtit les auvents et les étals, et chaque artisan pose deux questions tirées des générateurs de la notion.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'chantier-du-marche',
  bloc: 'mesures-geometrie',
  titre: 'Le chantier du marché',
  etape: 'stand',
  prefixe: 'chantier',
  phrases: {
    'test-intro': 'Viens, on visite le chantier du marché ! On rebâtit les étals et les auvents. À chaque poste, un artisan te pose deux petites questions sur ses mesures. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend la visite du chantier là où tu t’étais arrêtée.',
    'test-fin': 'La visite du chantier est finie. Merci ! Ton chemin de la géométrie est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'angles-triangle', titre: 'Le poste de la bâche', phrase: 'Je coupe une bâche en triangle. Il me manque la mesure d’un coin.', generateurs: ['troisieme-angle', 'triangle-rectangle'] },
    { notion: 'inegalite-triangulaire', titre: 'Le poste des baguettes', phrase: 'J’ai trois baguettes pour un cadre. Va-t-il se fermer ?', generateurs: ['construire-ou-pas', 'plus-long-possible'] },
    { notion: 'parallelogramme', titre: 'Le poste du portillon', phrase: 'Mon portillon penche un peu. Que reste-t-il de vrai ?', generateurs: ['cote-en-face', 'angle-oppose'] },
    { notion: 'hauteurs-mediatrices', titre: 'Le poste du puits', phrase: 'Ce puits doit être aussi loin d’un étal que de l’autre.', generateurs: ['distance-puits', 'aire-avec-hauteur'] },
    { notion: 'symetries', titre: 'Le poste de la frise pliée', phrase: 'Je plie mon tissu, et je trouve le double du motif.', generateurs: ['longueur-conservee', 'axes'] },
    { notion: 'conversions-unites', titre: 'Le poste du mètre', phrase: 'Les mesures arrivent en mètres et en centimètres. Tu me les convertis ?', generateurs: ['longueur', 'aire'] },
    { notion: 'unites-composees', titre: 'Le poste du livreur de sable', phrase: 'Mon camion roule en kilomètres par heure. Et en mètres par seconde ?', generateurs: ['kmh-en-ms', 'ms-en-kmh'] },
    { notion: 'aires-usuelles', titre: 'Le poste du carreleur', phrase: 'Quelle surface y a-t-il à couvrir, sur ce sol ?', generateurs: ['rectangle', 'triangle'] },
    { notion: 'volume-prisme-cylindre', titre: 'Le poste de la citerne', phrase: 'Il me faut savoir ce que contient cette citerne.', generateurs: ['pave', 'cylindre'] },
    { notion: 'volume-pyramide-cone', titre: 'Le poste du tas de sable', phrase: 'Mon tas de sable finit en pointe. Quel est son volume ?', generateurs: ['pyramide-aire-donnee', 'trois-cornets'] },
    { notion: 'triangles-egaux', titre: 'Le poste des deux fanions', phrase: 'Je veux deux fanions pareils, sans tout mesurer.', generateurs: ['quel-cas', 'cote-du-jumeau'] },
    { notion: 'pythagore', titre: 'Le poste de la barre en diagonale', phrase: 'Il me faut une barre en diagonale. De quelle longueur ?', generateurs: ['grand-cote', 'petit-cote'] },
    { notion: 'pythagore-reciproque', titre: 'Le poste du maçon', phrase: 'Ce coin de mur est-il vraiment d’équerre ?', generateurs: ['rectangle-ou-pas', 'carre-du-plus-grand'] },
    { notion: 'thales-emboites', titre: 'Le poste de l’ombre', phrase: 'Un bâton, une ombre : je veux connaître la hauteur de ce poteau.', generateurs: ['hauteur-arbre', 'calcul-de-cote'] },
    { notion: 'cosinus', titre: 'Le poste de l’échelle', phrase: 'Mon échelle est-elle bien posée contre le mur ?', generateurs: ['calculer-le-cosinus', 'trouver-adjacent'] },
    { notion: 'reperage-plan', titre: 'Le poste du plan', phrase: 'Sur le plan du chantier, où est cet étal ?', generateurs: ['lire-abscisse', 'quel-coin'] },
    { notion: 'translation', titre: 'Le poste du tampon', phrase: 'Mon tampon glisse le long de l’enseigne. Où arrive-t-il ?', generateurs: ['abscisse-image', 'longueur-de-frise'] },
    { notion: 'reperage-pave', titre: 'Le poste des caisses', phrase: 'Trois nombres pour retrouver un clou dans ma caisse.', generateurs: ['lire-altitude', 'coin-oppose'] },
    { notion: 'perspective-cavaliere', titre: 'Le poste du dessinateur', phrase: 'Je dessine les caisses sur une feuille plate. Quelle longueur tracer ?', generateurs: ['longueur-dessinee', 'vrai-ou-faux'] },
    { notion: 'patrons-vues', titre: 'Le poste du carton', phrase: 'Je plie un toit de carton pour la maquette du marché.', generateurs: ['combien-de-faces', 'quelle-vue'] },
    { notion: 'agrandissement-reduction', titre: 'Le poste de la maquette', phrase: 'Ma maquette est plus petite. Et sa peinture, et son plâtre ?', generateurs: ['longueur', 'que-devient'] },
  ],
});
