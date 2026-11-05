/* Test de départ du bloc de technologie « Les objets et la société » : « Le tour de l'atelier » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle du « Grand tour du marché » : un établi de l'atelier du réparateur par notion testée (cycle 4 et 4e ; les notions
   de 3e sont toujours à apprendre). Le réparateur dit sa phrase, puis pose deux questions tirées des générateurs de la notion.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'tour-de-l-atelier',
  bloc: 'objets-societe',
  titre: 'Le tour de l’atelier',
  etape: 'établi',
  prefixe: 'atelier',
  phrases: {
    'test-intro': 'Viens, on fait le tour de l’atelier du réparateur ! À chaque établi, un réparateur te pose deux petites questions sur les objets. Prends ton cahier. Tu peux t’arrêter quand tu veux : on reprendra au prochain établi.',
    'test-reprise': 'On reprend le tour de l’atelier là où tu t’étais arrêtée.',
    'test-fin': 'Le tour de l’atelier est fini. Merci ! Ton chemin des objets et de la société est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'besoin-fonction', titre: 'L’étagère des lampes', phrase: 'Chaque objet de cette étagère répond à un besoin. Lequel ?', generateurs: ['a-quoi-sert', 'objet-technique'] },
    { notion: 'invention-innovation', titre: 'Le coin des prototypes', phrase: 'Ici, on garde les idées nouvelles. Certaines sont devenues des succès.', generateurs: ['invention-ou-innovation', 'ventes'] },
    { notion: 'principe-technique', titre: 'La bouilloire démontée', phrase: 'Regarde l’intérieur : chaque pièce a son travail.', generateurs: ['quelle-piece', 'quel-principe'] },
    { notion: 'familles-lignees', titre: 'Le carton des vieux téléphones', phrase: 'Du téléphone à fil au smartphone : sais-tu les ranger ?', generateurs: ['le-plus-ancien', 'famille-ou-lignee'] },
    { notion: 'avantages-inconvenients', titre: 'La lampe à pétrole', phrase: 'Avant, on s’éclairait comme ça. Qu’a-t-on gagné, et perdu, en changeant ?', generateurs: ['avantage-ou-inconvenient', 'semaines-pour-rembourser'] },
    { notion: 'cahier-des-charges', titre: 'Le tableau des commandes', phrase: 'Chaque client laisse sa liste. L’objet doit tout respecter.', generateurs: ['combien-de-points', 'fonction-ou-contrainte'] },
    { notion: 'normes-labels', titre: 'La boîte des chargeurs', phrase: 'Pourquoi tous ces chargeurs vont-ils sur tant de téléphones ?', generateurs: ['norme-ou-label', 'qui-verifie'] },
    { notion: 'notice', titre: 'Le tiroir des notices', phrase: 'Un livret pour chaque appareil. Sais-tu où chercher ?', generateurs: ['quelle-partie', 'fin-de-garantie'] },
    { notion: 'etiquette-energie', titre: 'Le réfrigérateur à vendre', phrase: 'Regarde son étiquette, avec ses lettres et ses barres de couleur.', generateurs: ['plus-sobre', 'cout-annuel'] },
    { notion: 'indice-reparabilite', titre: 'L’établi des téléphones cassés', phrase: 'Certains se réparent bien, d’autres non. Il y a une note pour ça.', generateurs: ['plus-reparable', 'reparer-ou-racheter'] },
    { notion: 'impacts-environnement', titre: 'Le bac des piles usées', phrase: 'Ces piles ne vont pas à la poubelle. Sais-tu pourquoi ?', generateurs: ['quel-milieu', 'piles-collectees'] },
    { notion: 'bilan-carbone', titre: 'Le scooter de livraison', phrase: 'Pour livrer les pièces, on peut rouler plus ou moins proprement.', generateurs: ['trajet', 'moins-de-gaz'] },
    { notion: 'mesurer-performance', titre: 'La piste d’essai', phrase: 'Chronomètre en main ! On vérifie ce que promettent les objets.', generateurs: ['vitesse', 'quel-appareil'] },
  ],
});
