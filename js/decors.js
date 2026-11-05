/* Fichier écrit par outils/ranger-decors.js : ne pas le modifier à la main.
   Le décor de chaque notion, affiché avec son accroche. */
(function (racine) {
  const DECORS = {
 "prop-1": {
  "fichier": "images/app/decor-prop-1.webp",
  "alt": "Un étal de marché en bois, sous une toile bleu indigo, sans vendeur. Sur la table, un panier d'osier plein de mangues mûres et une balance en laiton aux plateaux vides, avec trois poids. Derrière, une ruelle de marché animée, des pagnes suspendus, un flamboyant en fleur et trois silhouettes de dos."
 },
 "mouv-3": {
  "fichier": "images/app/decor-mouv-3.webp",
  "alt": "Une petite gare de brousse en Afrique de l'Ouest : une voie ferrée sur du gravier rouge, un quai usé et un bâtiment ocre aux volets bleus sous un toit de tôle rouillée. Sur le banc, une bouilloire ambre ; à côté, un panier, un sac de toile et une valise brune. Au loin, trois silhouettes de dos attendent près d'un baobab et d'un petit étal."
 },
 "vivant-1": {
  "fichier": "images/app/decor-vivant-1.webp",
  "alt": "Un potager en pleine vie derrière la maison. Au premier plan, des plants de courge portent cinq fleurs orange et une courge verte, avec trois abeilles et un piquet vert. Derrière, des tomates, un tuyau d'arrosage, un bac à compost, un papayer et deux personnes penchées sur les planches, sans visage visible."
 },
 "nb-savons": {
  "fichier": "images/app/decor-nb-savons.webp",
  "alt": "Le comptoir d'une petite boutique de marché, sans vendeur. Trois pyramides de savons, ocre, blanche et verte, reposent sur un tissu indigo, à côté d'un carton ouvert plein de savons. Derrière, des pagnes suspendus, des paniers et deux silhouettes de dos dans la ruelle."
 },
 "nb-pizza": {
  "fichier": "images/app/decor-nb-pizza.webp",
  "alt": "Le soir au marché, une grande pizza entière sur une planche ronde, au milieu d'une table en bois. Autour, quatre assiettes blanches, une lampe à huile en laiton allumée et une serviette indigo pliée. Au fond, des guirlandes d'ampoules, des étals qui ferment et trois silhouettes de dos."
 },
 "nb-bissap": {
  "fichier": "images/app/decor-nb-bissap.webp",
  "alt": "Un stand de fête de quartier : sur une nappe blanche, une grande jarre de bissap rouge sombre nouée d'un ruban indigo, six verres et deux bols de friandises et de sucettes. Derrière, des fanions, des tambours, un mur de terre et un flamboyant en fleur. Deux silhouettes se tiennent de dos."
 },
 "nb-restaurant": {
  "fichier": "images/app/decor-nb-restaurant.webp",
  "alt": "Une livraison à la porte de derrière d'un petit restaurant : à gauche, une pile de cinq cartons sans inscription ; à droite, une caisse en bois pleine de bouteilles de jus de gingembre. Un tablier indigo pend à un clou près de la porte. On devine la cuisine, ses casseroles et sa vapeur, puis une grande jarre et un manguier dans la cour."
 },
 "nb-terrasse": {
  "fichier": "images/app/decor-nb-terrasse.webp",
  "alt": "Une petite terrasse vue d'un peu haut : trente-six carreaux de terre cuite forment un grand carré de six rangées de six. À côté, une pile de carreaux, une truelle et un seau de mortier avec un chiffon indigo. Au fond, un muret de terre, une plante en pot et des pagnes qui sèchent chez les voisins."
 },
 "cal-pagnes": {
  "fichier": "images/app/decor-cal-pagnes.webp",
  "alt": "Un étal de pagnes au marché : deux piles de tissus wax orange et verts à motifs de triangles, un tissu indigo posé sur celle de gauche. Une longue règle en bois sans graduation et des ciseaux sont posés à côté. Derrière, un mur de pagnes suspendus, des paniers et deux silhouettes de dos."
 },
 "cal-balance": {
  "fichier": "images/app/decor-cal-balance.webp",
  "alt": "Une balance à deux plateaux en laiton, en équilibre sur une table de marché, posée sur un tissu indigo. À gauche, deux petits sacs de riz et un poids de fer ; à droite, un poids de fer plus gros. Derrière, des paniers et des sacs ouverts de grains, un mur de terre et des tissus suspendus."
 },
 "cal-cafe": {
  "fichier": "images/app/decor-cal-cafe.webp",
  "alt": "Un petit stand de rue au marché, le matin : sur un comptoir de bois, une haute cafetière en métal cabossé, deux verres de café et un plateau de beignets dorés. Un tissu indigo est plié au bord. Derrière, un fourneau à charbon fume et deux silhouettes s'éloignent de dos."
 },
 "cal-caisse": {
  "fichier": "images/app/decor-cal-caisse.webp",
  "alt": "Une vieille caisse enregistreuse en métal crème sur un comptoir de boutique, avec ses touches rondes sans chiffre. Devant elle, une pile de tickets, une calculatrice et une petite bourse indigo. Derrière, des étagères de sacs et de boîtes, des paniers suspendus et une porte ouverte sur la ruelle du marché."
 },
 "cal-epicerie": {
  "fichier": "images/app/decor-cal-epicerie.webp",
  "alt": "Une petite épicerie de village, bien rangée : une étagère de bois porte quatre boîtes de sucre, quatre sachets de thé et trois bidons d'huile, tous sans étiquette. Sur le comptoir, une pile de cornets en papier et une pelle indigo. Par la porte ouverte, on voit une lampe suspendue, des sacs de riz, un panier d'oignons et la ruelle au soleil."
 },
 "prop-2": {
  "fichier": "images/app/decor-prop-2.webp",
  "alt": "La fontaine au cœur du marché : un grand bassin rond en pierre et une colonne avec deux robinets de laiton qui coulent. Un tissu indigo pend sur le bord, et deux seaux de métal attendent à côté, l'un plein, l'autre à moitié. Derrière, des auvents, un mur de terre, un arbre et trois silhouettes de dos, avec des bassines sur la tête."
 },
 "prop-3": {
  "fichier": "images/app/decor-prop-3.webp",
  "alt": "Un portant de vêtements devant une boutique du marché : cinq robes unies, blanche, ocre, rouge, bleu ciel et verte, chacune avec une étiquette jaune sans inscription. Un tissu indigo plié repose sur un tabouret. Derrière, des piles de pagnes, des paniers et deux silhouettes de dos."
 },
 "prop-4": {
  "fichier": "images/app/decor-prop-4.webp",
  "alt": "Une drôle de machine en bois sur un établi, avec une façade indigo : trois boules de bois attendent dans l'entonnoir du haut, deux boules plus grosses sont sorties par la goulotte. Une manivelle de métal est fixée sur le côté. Derrière, des outils au mur, des bocaux de vis et une ruelle lumineuse."
 },
 "prop-5": {
  "fichier": "images/app/decor-prop-5.webp",
  "alt": "Un panneau d'affichage en bois au cadre indigo, sur un mur de terre : une feuille blanche y montre un tableau vide de deux rangées de cinq cases. Dessous, trois petites maisons de bois de plus en plus grandes sont posées sur une tablette. Derrière le muret, un citronnier, des maisons au toit de tôle et deux silhouettes de dos."
 },
 "mesures-1": {
  "fichier": "images/app/decor-mesures-1.webp",
  "alt": "Le chantier du nouveau marché, calme en fin de journée : un mur de parpaings gris avec deux ouvertures de fenêtres, un échafaudage de tubes à trois niveaux et une bâche indigo. Devant, une pile de parpaings, un tas de sable avec sa pelle, et une rampe de bois qui monte à un vieux camion. Au fond, des toits de tôle, un grand arbre et deux silhouettes d'ouvriers de dos."
 },
 "mesures-2": {
  "fichier": "images/app/decor-mesures-2.webp",
  "alt": "Une échelle de bois posée contre un mur de terre ocre : avec le mur et le sol, elle dessine un grand triangle. Au pied du mur, un seau de métal et son chiffon indigo. Au fond de la rue, un papayer et des pagnes qui sèchent sur une corde."
 },
 "mesures-3": {
  "fichier": "images/app/decor-mesures-3.webp",
  "alt": "Un grand manguier seul derrière le marché, au soir : son ombre s'étire loin sur le sol, vers le bas de l'image. Un poteau de bois, entouré d'un tissu indigo, projette une ombre plus courte dans la même direction. Au fond, des paillotes, des toits de tôle et un fil électrique."
 },
 "mesures-4": {
  "fichier": "images/app/decor-mesures-4.webp",
  "alt": "Une passerelle de bois avec deux rampes de corde traverse une petite rivière calme. Un tissu indigo est noué au poteau de la rive, tout près. Sur l'autre rive, des planches de légumes, des bananiers, une maison de terre au toit de chaume, du linge étalé sur des rochers et deux silhouettes de dos."
 },
 "mesures-5": {
  "fichier": "images/app/decor-mesures-5.webp",
  "alt": "Un globe terrestre à l'armature de laiton sur la table du maître, tourné vers l'Afrique, sans aucun nom. À côté, une règle sans graduation, une pelote de ficelle et un cahier indigo fermé. Par la fenêtre ouverte, on voit une cour d'école, un grand arbre et trois silhouettes de dos."
 },
 "donnees-1": {
  "fichier": "images/app/decor-donnees-1.webp",
  "alt": "Une petite table d'enquête au marché, dont la propriétaire vient de s'éloigner : une planchette avec une feuille blanche, un crayon jaune, un cahier ouvert aux pages vides et un bocal de jetons. Une bande de tissu indigo court sur la table, devant une chaise pliante vide. Derrière, des étals de bananes et d'ananas, des paniers suspendus, des pagnes et trois silhouettes de dos."
 },
 "donnees-2": {
  "fichier": "images/app/decor-donnees-2.webp",
  "alt": "Un grand panier d'osier sur une table de marché, rempli de fruits ronds entièrement emballés dans du papier blanc, brun ou jaune : on ne peut pas savoir ce qu'ils sont. Un ruban indigo est noué à l'anse, et une feuille de papier d'emballage est posée à côté. Derrière, des étals de mangues et d'oranges, des auvents de toile et un mur de terre."
 },
 "donnees-3": {
  "fichier": "images/app/decor-donnees-3.webp",
  "alt": "Le stand de tombola du marché : une grande roue de bois à six parts égales, rouge, jaune, verte, bleu ciel, blanche et orange, avec un bord indigo et une flèche en métal en haut, sans aucun chiffre. Devant, un dé blanc à points noirs et une petite boîte de tickets vierges. Au fond, des fanions, des lampes suspendues, des paniers et des silhouettes de dos."
 },
 "donnees-4": {
  "fichier": "images/app/decor-donnees-4.webp",
  "alt": "Un petit robot gris sur roues, au couvercle indigo, posé sur un quadrillage tracé à la craie sur le sol d'une cour. Trois pierres grises occupent trois cases, un morceau de craie est posé en bas et une mangue attend dans le coin du fond. Au fond, un muret de terre et des paniers sous un auvent."
 },
 "donnees-5": {
  "fichier": "images/app/decor-donnees-5.webp",
  "alt": "Sur le mur de terre d'un étal, une feuille blanche montre un diagramme de quatre bâtons de plus en plus hauts, jaune, orange, rouge et vert, sans écriture. Sur la table, trois petits paniers d'oranges, d'oignons et de tomates, et un tissu indigo. Sur la gauche, on devine la ruelle, ses auvents et deux silhouettes de dos."
 },
 "matiere-1": {
  "fichier": "images/app/decor-matiere-1.webp",
  "alt": "La cuisine de la famille, en plein travail : une gazinière blanche aux deux petites flammes bleues, une casserole qui fume, et un plan de bois avec un verre d'eau, une bouteille d'huile, un bol de sel et un citron. Un tissu violet est plié sur le plan, près d'un réfrigérateur blanc et d'un tableau électrique. Par la porte ouverte, on voit la cour, un fourneau à charbon qui fume, des jarres et un manguier."
 },
 "matiere-2": {
  "fichier": "images/app/decor-matiere-2.webp",
  "alt": "Le lac Rose, au Sénégal : trois tas coniques de sel blanc sur la rive et une longue pirogue de bois vide, posée sur l'eau rose. Un tissu violet est étendu au pied d'un tas. Au loin, d'autres tas de sel, des pirogues peintes, des dunes pâles avec des filaos et trois petites silhouettes de ramasseurs de sel."
 },
 "matiere-3": {
  "fichier": "images/app/decor-matiere-3.webp",
  "alt": "Une salle de classe vide à la récréation : au mur, un tableau de cases colorées sans aucune lettre et une planche du corps humain sans légende. Sur la table du maître, un microscope, trois tubes à essai et un ballon de verre au liquide violet ; à droite, trois écrans bleu pâle. Par les volets ouverts, on voit des cartables, un grand arbre et trois silhouettes de dos."
 },
 "matiere-4": {
  "fichier": "images/app/decor-matiere-4.webp",
  "alt": "Un petit salon de coiffure de quartier, vide pour un instant : un fauteuil brun, un miroir rond au cadre de bois et une tablette avec trois flacons blancs sans étiquette. Un casque sèche-cheveux violet se dresse à droite, près d'un tabouret avec une serviette pliée et un peigne. Par la porte, on voit des mèches à tresser suspendues, des tabourets de plastique et trois silhouettes de dos."
 },
 "matiere-5": {
  "fichier": "images/app/decor-matiere-5.webp",
  "alt": "Une caravane de sel arrive à Tombouctou, au Mali : des dromadaires marchent en file sur le sable doré, chacun portant deux plaques de sel gris-blanc attachées sur les flancs. Le premier porte une couverture violette. Au loin, un caravanier de dos et la ville de terre, avec le minaret pyramidal de la mosquée de Djingareyber, hérissé de pièces de bois."
 },
 "matiere-6": {
  "fichier": "images/app/decor-matiere-6.webp",
  "alt": "Le lac Nyos, au Cameroun : un lac de cratère sombre et calme, entouré de pentes vertes et de rochers volcaniques, sous des nuages bas. Au milieu, un petit radeau gris porte un tuyau fin d'où jaillit une fontaine d'eau et de vapeur. Au premier plan, une grande dalle de roche sombre et un poteau de bois où est noué un tissu violet."
 },
 "elec-1": {
  "fichier": "images/app/decor-elec-1.webp",
  "alt": "La forge du village, ouverte sous son toit de chaume : un foyer de pierre aux braises vives, une enclume sur une souche, un soufflet de cuir et une grande meule de pierre. Sur l'établi brillent une petite ampoule reliée à une pile par des fils rouge et noir, et un tablier ambre pend à un poteau. Derrière, un chariot de charbon, de vieilles charrettes, des toits de chaume et deux silhouettes de dos."
 },
 "elec-2": {
  "fichier": "images/app/decor-elec-2.webp",
  "alt": "Une cour préparée pour une fête, à la nuit tombante : une guirlande de onze ampoules est tendue entre deux poteaux, dix sont allumées et celle du milieu est éteinte. Dessous, des fanions bleu ciel et rouges, une longue table à nappe blanche, et un enrouleur de câble ambre au pied du poteau. Au fond, des chaises empilées, de la fumée de cuisine, un flamboyant et trois silhouettes de dos."
 },
 "elec-3": {
  "fichier": "images/app/decor-elec-3.webp",
  "alt": "Le château d'eau du village, vu du sol : une grande cuve ronde de béton gris, cerclée d'une bande ambre, sur quatre piliers droits, avec une échelle et un robinet à son pied. Au fond, des maisons de terre aux toits de tôle, du linge sur une corde et un baobab. Trois silhouettes de dos portent des bassines."
 },
 "elec-5": {
  "fichier": "images/app/decor-elec-5.webp",
  "alt": "Une feuille posée sur une table de famille, sans aucune écriture : seulement des barres grises et une case vide, tenues par un trombone ambre. Autour, un stylo gris, une ampoule éteinte et une paire de vieilles lunettes. Plus loin, une théière de terre, un verre de thé, une nappe à motifs et la lumière d'une porte ouverte."
 },
 "elec-6": {
  "fichier": "images/app/decor-elec-6.webp",
  "alt": "Un barrage de béton dans des collines tropicales : une grande vanne d'acier à demi levée laisse passer une eau blanche et bouillonnante. Au premier plan, sur une passerelle de bois, un volant de manœuvre ambre. Au loin, un lac, de la brume, deux pylônes et deux silhouettes de dos sur le barrage."
 },
 "mouv-4": {
  "fichier": "images/app/decor-mouv-4.webp",
  "alt": "Une grande route droite dans la savane, au soir. Au premier plan, sur le bas-côté, un vélomoteur rouge avec un casque blanc au guidon et une sacoche ambre. Plus loin, une vieille voiture blanche freine, ses feux rouges allumés, en laissant des traces sombres ; au fond, un étal sous une paillote, des acacias et trois silhouettes."
 },
 "mouv-6": {
  "fichier": "images/app/decor-mouv-6.webp",
  "alt": "L'intérieur de la Station spatiale, sans personne : un couloir aux parois matelassées, plein de câbles, de rampes et de voyants verts. Deux sachets, un stylo et une cuillère flottent en l'air, et un sac ambre est sanglé à la paroi. Par le hublot rond, à gauche, on voit la courbe bleue de la Terre."
 },
 "energie-4": {
  "fichier": "images/app/decor-energie-4.webp",
  "alt": "L'intérieur d'une centrale : à gauche, une grande roue de turbine en acier à pales courbes ; un arbre horizontal la relie à un alternateur gris foncé, entouré d'une barrière ambre. Un gros câble noir monte vers le plafond. Au fond, une haute fenêtre en arc ouvre sur des collines vertes, et deux silhouettes d'ouvriers s'éloignent de dos."
 },
 "energie-6": {
  "fichier": "images/app/decor-energie-6.webp",
  "alt": "Une vieille cheminée de briques, très haute, au bord d'une ville, à la nuit tombante, avec une bande ambre près du sommet. Une longue fumée grise part vers la droite, au-dessus d'un hangar aux trois fenêtres éclairées. Autour, des toits de tôle, des palmiers sombres, de petites lumières et deux silhouettes de dos."
 },
 "signaux-1": {
  "fichier": "images/app/decor-signaux-1.webp",
  "alt": "Une nuit d'orage sur le village : un seul grand éclair blanc et ramifié déchire le ciel, à droite. Au milieu, un abri de chaume garde une lanterne ambre allumée, sous une pluie fine. Autour, des maisons aux fenêtres éclairées, des arbres sombres et des flaques qui reflètent la lumière."
 },
 "signaux-3": {
  "fichier": "images/app/decor-signaux-3.webp",
  "alt": "Un salon de famille : une petite télécommande grise à six boutons sans signe est posée sur un dessous-de-verre ambre, sur une table basse en bois. Plus loin, une petite télévision éteinte sur son meuble. Au fond, un canapé à coussins, une natte, un ventilateur et une fenêtre sur une cour où sèche du linge."
 },
 "signaux-4": {
  "fichier": "images/app/decor-signaux-4.webp",
  "alt": "Un soir de coupure de courant, sur une table de bois : une bougie allumée dans un bougeoir de terre, à côté d'un petit verre retourné. À droite, une lampe torche noire envoie un faisceau droit qui fait un rond de lumière sur le mur, et un tissu ambre est plié sur la table. Derrière, un rideau de pagne et une fenêtre sur le village au crépuscule."
 },
 "corps-2": {
  "fichier": "images/app/decor-corps-2.webp",
  "alt": "Un stade de quartier en fin de journée : un escalier de béton gris aux rampes blanches monte à gauche. Au pied, un banc de bois avec une gourde verte et une paire de chaussures de course blanches. Au fond, un terrain de terre rouge, des buts sans filet, des gradins bas, un grand arbre et trois petites silhouettes qui courent."
 },
 "corps-3": {
  "fichier": "images/app/decor-corps-3.webp",
  "alt": "La table ronde de la famille, vue d'un peu haut et prête pour le repas : au centre, un grand plat de terre avec du riz blanc et du mafé brun. Autour, quatre assiettes blanches, quatre cuillères, une cruche de terre et une serviette verte. Derrière, des murs ocre, un rideau qui bouge et, par la porte ouverte, un manguier dans la cour."
 },
 "corps-4": {
  "fichier": "images/app/decor-corps-4.webp",
  "alt": "L'infirmerie du collège, simple et propre : un lit d'examen à drap blanc avec une couverture verte pliée au pied, et une armoire vitrée avec quatre boîtes blanches sans inscription. Au mur, une toise en bois ; sur un tabouret, une boîte de premiers soins fermée. Par la fenêtre aux volets ouverts, on voit un grand arbre, une bassine et trois silhouettes de dos dans la cour."
 },
 "vivant-3": {
  "fichier": "images/app/decor-vivant-3.webp",
  "alt": "Le champ du village en fin de journée, dans le vent : une rangée de plants de manioc sur la terre rouge, un fagot de tiges coupées noué d'une corde verte, et un pluviomètre de verre sur son poteau. Haut dans le ciel, un cerf-volant rouge et blanc. Au fond, du mil, un petit canal, un grenier de chaume, des baobabs et trois silhouettes qui travaillent la terre."
 },
 "vivant-4": {
  "fichier": "images/app/decor-vivant-4.webp",
  "alt": "Une haute falaise de grès, comme celle de Bandiagara au Mali, montre cinq couches : crème, ocre, rouge rouille, grise et brun foncé. Deux coquillages fossiles sont pris dans la couche grise, un marteau repose sur une pierre plate, et un sac de toile vert est posé à côté. Au loin, dans la vallée sèche, un puits en chantier, de petits greniers de terre et deux silhouettes de dos."
 },
 "vivant-5": {
  "fichier": "images/app/decor-vivant-5.webp",
  "alt": "Le ciel du soir au-dessus du verger : la Voie lactée, des milliers d'étoiles, une demi-lune et un petit point rouge, la planète Mars. À gauche, un grand manguier porte des mangues orange, et une couverture verte est étendue sur l'herbe. À l'horizon orangé, des maisons aux fenêtres éclairées, des fumées de cuisine et deux silhouettes de dos qui regardent le ciel."
 },
 "planete-2": {
  "fichier": "images/app/decor-planete-2.webp",
  "alt": "Le fond d'une mare asséchée, en saison sèche : une grande étendue de terre pâle, craquelée en larges plaques. Un seau de métal cabossé et un gobelet vert y sont posés, près d'un arbre sec et épineux. Au loin, un puits, des cases de chaume et trois silhouettes de dos, avec des bassines sur la tête."
 },
 "planete-3": {
  "fichier": "images/app/decor-planete-3.webp",
  "alt": "Un champ de roches noires sur les pentes du mont Cameroun : cinq gros blocs de basalte, une petite fougère verte qui pousse dans une fente, et un tissu vert noué à un piquet. Au fond, un cône volcanique sombre d'où monte un mince filet de vapeur blanche. Plus bas, une forêt très verte et un village aux toits de tôle."
 },
 "planete-5": {
  "fichier": "images/app/decor-planete-5.webp",
  "alt": "Une rivière en crue : une eau brune recouvre les rives, avec deux troncs à demi noyés. Un panneau bleu sur un poteau porte seulement une flèche blanche vers le haut et la gauche, et une paire de bottes vertes attend sur la rive boueuse. Au loin, des bananiers dans l'eau et trois silhouettes de dos montent vers les maisons, sous un ciel de pluie."
 },
 "planete-6": {
  "fichier": "images/app/decor-planete-6.webp",
  "alt": "La mare du village, calme, bordée d'une haie semée de petites fleurs. Sur l'eau flottent des nénuphars et deux fleurs blanches ; une grenouille verte est posée sur une feuille, et une libellule bleue passe au-dessus. Un piquet vert se dresse au bord ; derrière la haie, un filet sur des pieux, une case de chaume et deux silhouettes de pêcheurs, de dos."
 },
 "num-2": {
  "fichier": "images/app/decor-num-2.webp",
  "alt": "Une petite armoire réseau noire, porte ouverte, dans l'arrière-salle de l'atelier : un commutateur à huit prises avec de petits voyants verts, un faisceau de câbles bleus et gris serrés par un lien sarcelle, et un routeur gris. Derrière, un ventilateur, des étagères de vieux ordinateurs et une porte sur une cour au soleil."
 },
 "num-3": {
  "fichier": "images/app/decor-num-3.webp",
  "alt": "Une carte sans aucun mot de l'océan Atlantique, au mur de l'atelier : l'Afrique de l'Ouest, l'Europe et l'Amérique du Sud, reliées par de fines lignes sombres sur la mer, avec des épingles rouges sur la côte africaine. Sur l'établi, un rouleau de câble noir, un tube sarcelle, des bocaux et des outils. Par l'ouverture, une radio, un palmier et la mer."
 },
 "num-4": {
  "fichier": "images/app/decor-num-4.webp",
  "alt": "Une cour de sable pendant une danse : au premier plan, un petit trépied tient un téléphone à coque sarcelle, vu de dos. À droite, deux djembés et un pagne étalé sur le sable. Au fond, trois danseuses de dos en pagnes colorés soulèvent la poussière devant un mur ocre, sous un flamboyant et une guirlande d'ampoules."
 },
 "objet-1": {
  "fichier": "images/app/decor-objet-1.webp",
  "alt": "L'atelier du réparateur, plein de vie : sur un long établi, un moteur démonté, une vieille radio, un ancien ordinateur à l'écran noir, un ventilateur et un bidon d'huile de couleur sarcelle. Un vélomoteur rouge est garé contre l'établi, et un tableau au mur montre cinq barres de couleur. Au fond, des outils suspendus, de vieux téléphones et, par l'ouverture, un vélo, un panneau solaire et deux silhouettes de dos."
 },
 "objet-2": {
  "fichier": "images/app/decor-objet-2.webp",
  "alt": "Gros plan sur un établi : deux mains à la peau brun foncé ajustent une courroie noire entre une grande poulie d'acier au moyeu sarcelle et une petite poulie. Une petite manivelle est fixée sur la grande. Derrière, flous, des bols, des jarres et des outils contre un mur de terre."
 },
 "objet-3": {
  "fichier": "images/app/decor-objet-3.webp",
  "alt": "Gros plan sur un vélo retourné, sur le sol de l'atelier : un grand plateau denté, une pédale et sa manivelle, et une chaîne d'acier aux maillons bien visibles. Le cadre est sarcelle, et un petit cadenas sans chiffre y est accroché. Derrière, une porte de bois, des chambres à air suspendues et une ruelle ensoleillée."
 },
 "objet-5": {
  "fichier": "images/app/decor-objet-5.webp",
  "alt": "Le coin de la ferraille, derrière l'atelier : un bac rouillé contient une roue de vélo, une vieille bouilloire, un tuyau tordu, des boîtes de conserve sans étiquette et une bobine de fil. Un tissu sarcelle pend au bord, et un aimant rouge en fer à cheval est posé au sol. Derrière, des tas de métal triés, un chariot, un mur de terre et deux silhouettes sombres contre le mur."
 },
 "objet-6": {
  "fichier": "images/app/decor-objet-6.webp",
  "alt": "Un portail coulissant de métal gris, à demi ouvert, dans un mur de terre : des barreaux, une barre en diagonale, un rail au sol et un boîtier de moteur à son pied. Une lampe orange brille sur le mur, à côté d'une boîte aux lettres sarcelle sans inscription. Derrière, on voit une cour, un manguier, une maison aux volets bleus, du linge et une silhouette de dos."
 },
 "concevoir-2": {
  "fichier": "images/app/decor-concevoir-2.webp",
  "alt": "Une étagère de bois en construction dans une pièce : deux mains à la peau brun foncé tiennent la planche du haut, sans qu'on voie de visage. Par terre, une scie, un marteau, une équerre en bois et une petite pile de quatre planches. Derrière, une caisse à outils sarcelle, un rideau de pagne, une poutre en pente et de la sciure dans la lumière."
 },
 "concevoir-3": {
  "fichier": "images/app/decor-concevoir-3.webp",
  "alt": "Le coin de fabrication de l'atelier : une imprimante 3D noire fabrique un petit cube blanc, à côté d'une découpeuse laser grise au couvercle transparent, avec une plaque de bois à l'intérieur. Sur l'établi, une bobine de fil blanc, une petite lampe et des lunettes de protection sarcelle. Derrière, des étagères de petites pièces et, par la porte ouverte, un panneau solaire et une silhouette de dos."
 },
 "concevoir-4": {
  "fichier": "images/app/decor-concevoir-4.webp",
  "alt": "Un écran d'ordinateur sur un bureau de l'atelier : sur un fond bleu foncé, seulement une boîte blanche en fil de fer, avec son couvercle, en volume. Devant, un clavier sans lettres, une souris sur un tapis sarcelle et une feuille avec le même croquis, sans mots. Derrière, des outils au mur, un ventilateur et, par la fenêtre, trois silhouettes de dos dans la ruelle."
 },
 "concevoir-5": {
  "fichier": "images/app/decor-concevoir-5.webp",
  "alt": "Le banc d'essai de l'atelier : sur l'établi, un petit phare de vélo allumé, un ventilateur de poche et un chronomètre au cadran vierge. Dessous, une planche posée sur deux tréteaux plie légèrement sous trois poids de fer attachés par une corde sarcelle. Derrière, des étagères de lampes et de bocaux, et une ouverture sur la ruelle au crépuscule, avec des silhouettes."
 },
 "prog-1": {
  "fichier": "images/app/decor-prog-1.webp",
  "alt": "L'atelier à la tombée de la nuit : sur l'établi, une petite veilleuse ronde en verre brille sur un boîtier de bois, avec un petit capteur de lumière. À côté, une carte électronique verte, ses fils et un câble sarcelle. Par l'ouverture, on voit le bleu de la nuit, quelques étoiles et des fenêtres éclairées."
 },
 "prog-2": {
  "fichier": "images/app/decor-prog-2.webp",
  "alt": "Gros plan sur une planche de démonstration, sur l'établi : trois boutons noirs à gauche, trois petites lampes à droite, rouge, jaune et verte, reliés par des fils à une petite carte électronique verte. Un boîtier de pile sarcelle est posé au milieu. Derrière, un fer à souder, des bocaux de pièces, une radio ouverte et un ventilateur."
 },
 "prog-3": {
  "fichier": "images/app/decor-prog-3.webp",
  "alt": "Un ordinateur portable gris sur une table de l'atelier, le soir : à l'écran, six barres arrondies jaune pâle, bleu ciel et blanches tiennent la place des lignes du programme, sans aucun signe. Un cahier sarcelle est posé à côté. Derrière, une lampe allumée, des jarres, une radio et une porte sur la ruelle au crépuscule, avec des silhouettes."
 },
 "prog-5": {
  "fichier": "images/app/decor-prog-5.webp",
  "alt": "La porte de l'atelier, en bois brun : une main à la peau brun foncé appuie sur un bouton rond gris, sur le mur ocre. Un fil relie le bouton à une sonnette de métal, en haut, et un paillasson sarcelle est posé au pied de la porte. À gauche, la ruelle, un vélo, du linge qui sèche et une silhouette de dos."
 },
 "soc-lampes": {
  "fichier": "images/app/decor-soc-lampes.webp",
  "alt": "Un petit étal de lampes solaires devant l'atelier, sans vendeur : six petites lampes, chacune avec son panneau sombre, sur une table de bois, et un grand panneau solaire appuyé au pied de la table. Un tissu sarcelle pend à l'avant. Derrière, l'atelier et ses outils, des maisons de terre, un arbre et deux silhouettes de dos."
 },
 "soc-sechoir": {
  "fichier": "images/app/decor-soc-sechoir.webp",
  "alt": "Un séchoir à mangues fait maison, dans une cour : une caisse de bois sur pieds, avec une vitre en pente et un cadre sarcelle, et des tranches de mangue orange qui sèchent sur une grille. Par terre, un panier de fil de fer avec des mangues entières. Derrière, un manguier chargé de fruits, un mur de terre, un établi avec des planches, du linge et un enfant de dos, tout habillé de jaune."
 },
 "soc-telephones": {
  "fichier": "images/app/decor-soc-telephones.webp",
  "alt": "Le comptoir du réparateur : de gauche à droite, un vieux téléphone à fil, un téléphone sans fil, un petit portable à touches et un smartphone à l'écran noir, à côté de sa batterie, sur un tapis sarcelle. À droite, un plateau de petites vis et un tournevis. Derrière, des téléphones accrochés au mur, un ventilateur et, par la porte, une ruelle et deux silhouettes de dos."
 },
 "soc-radio": {
  "fichier": "images/app/decor-soc-radio.webp",
  "alt": "Le soir au bord du champ : sur un petit tabouret de bois, une vieille radio à l'antenne levée et une lampe à pétrole allumée, avec un fin filet de fumée. Un tissu sarcelle est posé sous la radio. Au fond, un grenier de chaume, un baobab sombre, de petites fenêtres éclairées et une silhouette de dos."
 },
 "soc-plastiques": {
  "fichier": "images/app/decor-soc-plastiques.webp",
  "alt": "Le tas de déchets derrière l'atelier, pas encore brûlé : de vieilles bouteilles en plastique sans étiquette, des sacs et des boîtiers cassés. À côté, une petite pile de huit batteries sans inscription, de longues pinces d'acier et un bac de tri sarcelle, vide. Au fond, un mur de terre, un papayer, de la fumée et une silhouette de dos."
 }
};
  const NOTIONS = {"criteres-divisibilite":"nb-savons","lire-expression":"nb-savons","factoriser":"nb-savons","fractions-sens-egalite":"nb-pizza","pgcd":"nb-bissap","fractions-division":"nb-bissap","fraction-irreductible":"nb-bissap","decomposition-facteurs-premiers":"nb-restaurant","carres-parfaits":"nb-terrasse","nombres-irrationnels":"nb-terrasse","developper":"nb-terrasse","conversions-unites":"nb-terrasse","aires-usuelles":"nb-terrasse","ratio":"cal-pagnes","tester-egalite":"cal-pagnes","angles-triangle":"cal-pagnes","symetries":"cal-pagnes","translation":"cal-pagnes","polygones-reguliers":"cal-pagnes","resoudre-equation":"cal-balance","systemes":"cal-cafe","prouver-calcul":"cal-cafe","coefficient-multiplicateur":"cal-cafe","fractions-multiplication-negatives":"cal-caisse","calculs-racines":"cal-caisse","difference-carres":"cal-caisse","mettre-en-equation":"cal-caisse","equation-produit-nul":"cal-caisse","moyenne-simple":"cal-caisse","reduire":"cal-epicerie","inequations":"cal-epicerie","volume-prisme-cylindre":"cal-epicerie","volume-pyramide-cone":"cal-epicerie","patrons-vues":"cal-epicerie","multiples-diviseurs":"prop-1","ia-apprentissage":"prop-1","numerique-societe":"prop-1","reconnaitre-proportionnalite":"prop-1","fonction-lineaire":"prop-1","reperage-pave":"prop-1","sphere-boule":"prop-1","force-newton":"prop-1","masse-poids":"prop-1","mediane-etendue":"prop-1","grandeur-debit":"prop-2","inegalite-triangulaire":"prop-2","hauteurs-mediatrices":"prop-2","reperage-plan":"prop-2","pourcentage-appliquer":"prop-3","fonction-machine":"prop-4","pourcentage-evolution":"prop-5","pythagore-reciproque":"mesures-1","agrandissement-reduction":"mesures-1","triangles-semblables":"mesures-1","sinus":"mesures-1","cosinus":"mesures-2","thales-emboites":"mesures-3","tangente":"mesures-3","thales-papillon":"mesures-4","reperage-sphere":"mesures-5","plaques-tectoniques":"mesures-5","zones-climatiques":"mesures-5","types-donnees":"donnees-1","tableur-calculs":"donnees-1","tableur-tris":"donnees-1","tableaux-donnees":"donnees-1","effectifs-frequences":"donnees-1","prog-listes":"donnees-1","calculer-probabilite":"donnees-2","issues-evenements":"donnees-3","evenement-contraire":"donnees-3","deux-epreuves":"donnees-3","frequence-probabilite":"donnees-3","scratch-sequences":"donnees-4","scratch-boucles":"donnees-4","scratch-variables":"donnees-4","scratch-conditions":"donnees-4","dependance-graphique":"donnees-5","lire-fonction":"donnees-5","droite-graphique":"donnees-5","diagramme-batons":"donnees-5","diagramme-circulaire":"donnees-5","histogrammes":"donnees-5","fractions-comparer":"matiere-1","fractions-addition-positives":"matiere-1","fractions-multiplication-positives":"matiere-1","puissances-10-negatives":"matiere-1","principe-technique":"matiere-1","etiquette-energie":"matiere-1","etats-matiere":"matiere-1","changements-etat":"matiere-1","composition-air":"matiere-1","masse-volumique":"matiere-1","conservation-masse":"matiere-1","transformation-chimique":"matiere-1","equation-reaction":"matiere-1","systeme-nerveux":"matiere-1","puissance-electrique":"matiere-1","reserves-plantes":"matiere-1","ia-usages-biais":"matiere-1","quatrieme-proportionnelle":"matiere-1","grandeur-masse-volumique":"matiere-1","proprietes-materiaux":"matiere-1","forme-materiau-procede":"matiere-1","solubilite-miscibilite":"matiere-2","corps-pur-melange":"matiere-2","atomes-molecules":"matiere-3","tableau-periodique":"matiere-3","acides-metaux":"matiere-3","appareils-reproducteurs":"matiere-3","besoins-cellules":"matiere-3","cyberviolence":"matiere-3","moyenne-ponderee":"matiere-3","remplacer-lettre":"matiere-4","ph":"matiere-4","loi-ohm":"matiere-4","ions":"matiere-5","tests-caracteristiques":"matiere-6","circuit-simple":"elec-1","trajectoire":"elec-1","actions-mecaniques":"elec-1","representer-force":"elec-1","serie-derivation":"elec-2","lois-serie":"elec-2","triangles-egaux":"elec-2","scratch-blocs-parallele":"elec-2","tension":"elec-3","fractions-addition-negatives":"elec-5","energie-electrique":"elec-5","facture-electricite":"elec-5","unites-energie":"elec-5","energie-position":"elec-6","relativite-mouvement":"mouv-3","bilan-carbone":"mouv-4","drogues-dopage":"mouv-4","grandeur-vitesse":"mouv-4","dependance-formule":"mouv-4","unites-composees":"mouv-4","vitesse-moyenne":"mouv-4","nature-mouvement":"mouv-4","ressources-exploitees":"mouv-4","energie-cinetique":"mouv-4","freinage":"mouv-4","impesanteur":"mouv-6","centrale-electrique":"energie-4","co2-effet-serre":"energie-6","changements-climatiques":"energie-6","vitesse-son":"signaux-1","signal-information":"signaux-3","combustions":"signaux-4","propagation-lumiere":"signaux-4","vitesse-lumiere":"signaux-4","structure-atome":"corps-2","effort-rythmes":"corps-2","effort-besoins":"corps-2","hygiene-de-vie":"corps-2","formes-energie":"corps-2","digestion":"corps-3","enzymes":"corps-3","absorption":"corps-3","besoins-nutritionnels":"corps-3","microbes":"corps-3","chromosomes-adn":"corps-3","genes-alleles":"corps-3","mutations":"corps-3","meiose-fecondation":"corps-3","angle-inscrit":"corps-3","sections-planes":"corps-3","hygiene-antiseptiques":"corps-4","antibiotiques":"corps-4","vaccination":"corps-4","immunite":"corps-4","puberte":"corps-4","fecondation-grossesse":"corps-4","contraception-ist":"corps-4","racine-carree":"vivant-1","identites-remarquables":"vivant-1","intensite":"vivant-1","transport-sang":"vivant-1","role-micro-organismes":"vivant-1","seves":"vivant-1","reproduction-sexuee":"vivant-1","populations":"vivant-1","parente-classification":"vivant-1","objets-communicants":"vivant-1","programme-structure":"vivant-1","equation-x-carre":"vivant-3","double-distributivite":"vivant-3","lois-derivation":"vivant-3","photosynthese":"vivant-3","reproduction-asexuee":"vivant-3","genotype-phenotype":"vivant-3","selection-naturelle":"vivant-3","meteo-climat":"vivant-3","vents-courants":"vivant-3","fossiles":"vivant-4","eres-geologiques":"vivant-4","notation-scientifique":"vivant-5","vie-ailleurs":"vivant-5","gravitation":"vivant-5","poids-lune":"vivant-5","systeme-solaire":"vivant-5","sources-lumiere":"vivant-5","annee-lumiere":"vivant-5","galaxies-ordres":"vivant-5","formation-systeme-solaire":"vivant-5","origine-elements":"vivant-5","ressources-eau-sol":"planete-2","seismes":"planete-3","volcans":"planete-3","alea-vulnerabilite":"planete-3","prevention-risques":"planete-5","activites-ecosystemes":"planete-6","biodiversite-gestion":"planete-6","reseau-local":"num-2","adresse-ip":"num-2","internet-routage":"num-3","nombres-premiers":"num-4","puissances-10-positives":"num-4","neurones":"num-4","place-humain":"num-4","tailles-fichiers":"num-4","debit":"num-4","fonction-affine":"num-4","rotation":"num-4","homothetie":"num-4","propagation-son":"num-4","notice":"objet-1","mesurer-performance":"objet-1","chaine-energie":"objet-1","flux-energie-objet":"objet-1","conversions-energie":"objet-1","conservation-energie":"objet-1","prog-variables":"objet-1","prog-operateurs":"objet-1","prog-boucles":"objet-1","algorithme-programme":"objet-1","transmission-mouvement":"objet-2","fiabilite-durabilite":"objet-2","mots-de-passe":"objet-3","rapport-engrenages":"objet-3","recyclage-materiaux":"objet-5","parallelogramme":"objet-6","pythagore":"objet-6","schema-bloc":"objet-6","thales-reciproque":"concevoir-2","taches-planning":"concevoir-2","revue-projet":"concevoir-2","procedes-fabrication":"concevoir-3","securite-atelier":"concevoir-3","perspective-cavaliere":"concevoir-4","croquis-schemas":"concevoir-4","modelisation-3d":"concevoir-4","simulation-test":"concevoir-5","protocole-test":"concevoir-5","chaine-information":"prog-1","usage-raisonne":"prog-1","prog-conditions":"prog-1","prog-et-ou-non":"prog-1","prog-entrees-sorties":"prog-1","bit-octet":"prog-2","capteurs-interface":"prog-2","depannage":"prog-2","mesure-donnee":"prog-2","prototype-fonction":"prog-2","ecriture-texte":"prog-3","prog-evenements":"prog-5","besoin-fonction":"soc-lampes","cahier-des-charges":"soc-lampes","protocole-evaluation":"soc-lampes","ecoconception":"soc-lampes","concevoir-objet":"soc-lampes","invention-innovation":"soc-sechoir","puissances-produits-quotients":"soc-telephones","prefixes-ordres-grandeur":"soc-telephones","equation-deux-cotes":"soc-telephones","familles-lignees":"soc-telephones","normes-labels":"soc-telephones","indice-reparabilite":"soc-telephones","cycle-de-vie":"soc-telephones","developpement-durable":"soc-telephones","fichiers-dossiers":"soc-telephones","donnees-personnelles":"soc-telephones","traces-cookies":"soc-telephones","code-ascii":"soc-telephones","chaine-energetique":"soc-telephones","avantages-inconvenients":"soc-radio","decouverte-societe":"soc-radio","impacts-environnement":"soc-plastiques"};
  const pour = (notion) => DECORS[NOTIONS[notion]] || null;
  const api = { DECORS, NOTIONS, pour };
  if (typeof module === 'object' && module.exports) module.exports = api; else racine.Decors = api;
})(this);
