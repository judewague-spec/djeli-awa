/* Test de départ du bloc « Les nombres » : « Le grand tour du marché » (PLAN-ETAPE-3.md, partie 1 ; js/seances.js).
   Un étal par notion testée (bases de 5e, de 4e et du cycle 4), dans l'ordre du chemin. Le marchand dit sa phrase (un son),
   puis pose deux questions tirées des générateurs de la notion. Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'tour-du-marche',
  bloc: 'nombres',
  titre: 'Le grand tour du marché',
  etals: [
    { notion: 'multiples-diviseurs', titre: 'L’étal des mangues', phrase: 'Bonjour ! Ici, Aminata range ses mangues en paquets bien égaux. Aide-la à compter.', generateurs: ['sachets','paquets-juste'] },
    { notion: 'criteres-divisibilite', titre: 'La boutique de savons', phrase: 'Bienvenue chez Moussa ! Ses savons se rangent en lots. Peux-tu voir vite si ça tombe juste ?', generateurs: ['somme','dernier-chiffre'] },
    { notion: 'relatifs-addition', titre: 'Le vendeur de boissons fraîches', phrase: 'Il fait parfois très froid, parfois très chaud ! Lis bien les températures, même au-dessous de zéro.', generateurs: ['temperature-midi','somme'] },
    { notion: 'relatifs-multiplication', titre: 'Le carnet de dettes', phrase: 'Dans ce carnet, les dettes ont un signe moins. Calcule avec les signes.', generateurs: ['produit','quotient'] },
    { notion: 'nombres-premiers', titre: 'L’étal des perles', phrase: 'Certaines perles ne se rangent qu’en une seule ligne. Les reconnais-tu ?', generateurs: ['plus-petit-diviseur','premier-ou-pas'] },
    { notion: 'fractions-sens-egalite', titre: 'Le marchand de pizzas', phrase: 'Ici, on partage les pizzas et les additions en parts égales. À toi !', generateurs: ['facture','reservoir'] },
    { notion: 'fractions-comparer', titre: 'La pâtisserie', phrase: 'Deux gâteaux, deux morceaux : lequel est le plus gros ?', generateurs: ['meme-bas','un-bas-multiple'] },
    { notion: 'fractions-addition-positives', titre: 'L’étal du lait', phrase: 'On verse des moitiés, des quarts, des tiers… Combien en tout ?', generateurs: ['meme-denominateur','deux-denominateurs'] },
    { notion: 'fractions-addition-negatives', titre: 'Le banc du budget', phrase: 'Ici, l’argent monte et descend, en fractions. Garde bien les signes !', generateurs: ['meme-bas-signe','budget'] },
    { notion: 'fractions-multiplication-positives', titre: 'L’étal des épices', phrase: 'La moitié du tiers, le quart de la moitié : on multiplie les fractions.', generateurs: ['moitie-de','produit'] },
    { notion: 'fractions-multiplication-negatives', titre: 'Le comptoir des pertes', phrase: 'Des fractions avec des signes moins à multiplier. Doucement, et sans peur.', generateurs: ['un-negatif','deux-negatifs'] },
    { notion: 'fractions-division', titre: 'Le marchand de jus', phrase: 'Combien de verres dans ces bouteilles ? On divise par des fractions.', generateurs: ['verres','quotient'] },
    { notion: 'puissances-10-positives', titre: 'Le grand magasin', phrase: 'Ici, on compte par milliers et par millions. Attention aux zéros !', generateurs: ['fois-une-puissance','trouver-exposant'] },
    { notion: 'puissances-10-negatives', titre: 'La loupe du bijoutier', phrase: 'Tout petit, encore plus petit… On divise par dix, encore et encore.', generateurs: ['en-fraction','trouver-exposant'] },
    { notion: 'puissances-quelconques', titre: 'La crieuse de nouvelles', phrase: 'Une nouvelle se répète, et se répète encore. On multiplie un nombre par lui-même.', generateurs: ['calculer','base-negative'] },
    { notion: 'notation-scientifique', titre: 'Le stand des étoiles', phrase: 'Des distances géantes et des tailles minuscules : écris-les comme les savants.', generateurs: ['exposant-grand','exposant-petit'] },
    { notion: 'prefixes-ordres-grandeur', titre: 'Le réparateur de téléphones', phrase: 'Kilo, méga, giga, nano… Que veulent dire ces petits mots ?', generateurs: ['quel-exposant','convertir'] },
    { notion: 'carres-parfaits', titre: 'Le carreleur', phrase: 'Ici, on pose des carreaux en beaux carrés. Combien en faut-il ?', generateurs: ['carre-de','cote'] },
    { notion: 'racine-carree', titre: 'Le jardinier', phrase: 'Mon potager est carré. Aide-moi à trouver son côté.', generateurs: ['exacte','entier-dessous'] },
  ],
});
