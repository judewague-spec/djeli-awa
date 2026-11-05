/* Test de départ du bloc physique-chimie « La matière » : « Le tour de la cuisine » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle du « Grand tour du marché » : un poste de la cuisine du restaurant par notion testée (cycle 4 et 4e ; les notions
   de 3e sont toujours à apprendre). Le cuisinier dit sa phrase, puis pose deux questions tirées des générateurs de la notion.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'tour-de-la-cuisine',
  bloc: 'matiere',
  titre: 'Le tour de la cuisine',
  etape: 'poste',
  prefixe: 'cuisine',
  phrases: {
    'test-intro': 'Viens, on fait le tour de la cuisine du restaurant ! À chaque poste, un cuisinier te pose deux petites questions. Prends ton cahier. Tu peux t’arrêter quand tu veux : on reprendra au poste suivant.',
    'test-reprise': 'On reprend le tour de la cuisine là où tu t’étais arrêtée.',
    'test-fin': 'Le tour de la cuisine est fini. Merci ! Ton chemin de la matière est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'etats-matiere', titre: 'Le congélateur', phrase: 'Glaçons, eau, vapeur : ici, tout change de forme. Dis-moi dans quel état est chaque chose.', generateurs: ['quel-etat', 'seringue'] },
    { notion: 'changements-etat', titre: 'Le fourneau', phrase: 'Sur le feu, la glace fond et l’eau bout. Regarde bien le thermomètre !', generateurs: ['etat-de-l-eau', 'masse'] },
    { notion: 'corps-pur-melange', titre: 'Le garde-manger', phrase: 'Eau salée, eau boueuse, eau pure : sais-tu les reconnaître et les séparer ?', generateurs: ['separer', 'sel-de-mer'] },
    { notion: 'solubilite-miscibilite', titre: 'La table des sauces', phrase: 'Le sel disparaît dans l’eau, mais l’huile non. Jusqu’où peut-on dissoudre ?', generateurs: ['masse-maximale', 'masse-de-la-solution'] },
    { notion: 'composition-air', titre: 'La hotte', phrase: 'Ici, on parle de l’air qui fait vivre le feu des fourneaux.', generateurs: ['volume-de-dioxygene', 'quel-gaz'] },
    { notion: 'masse-volumique', titre: 'La balance du pâtissier', phrase: 'L’huile flotte, le miel coule : je pèse tout, au millilitre près.', generateurs: ['calculer', 'flotte-ou-coule'] },
    { notion: 'conservation-masse', titre: 'La balance des recettes', phrase: 'Avant, après : la balance ne ment jamais. À toi de compter !', generateurs: ['dissolution', 'verre-ouvert'] },
    { notion: 'tests-caracteristiques', titre: 'L’étagère des petits tests', phrase: 'Une poudre qui bleuit, une eau qui se trouble : que nous disent-elles ?', generateurs: ['quel-test', 'resultat'] },
    { notion: 'transformation-chimique', titre: 'Le four', phrase: 'Le beurre fond, le gâteau cuit : lequel change pour de bon ?', generateurs: ['physique-ou-chimique', 'masse-dans-un-flacon'] },
    { notion: 'atomes-molecules', titre: 'Le tableau des recettes', phrase: 'Sur mon tableau, j’écris les formules des molécules. Sais-tu les lire ?', generateurs: ['combien-d-atomes', 'formule-du-nom'] },
    { notion: 'equation-reaction', titre: 'La gazinière', phrase: 'Le gaz brûle avec le dioxygène : écrivons la recette exacte.', generateurs: ['coefficient-manquant', 'molecules-d-eau'] },
    { notion: 'tableau-periodique', titre: 'L’affiche du mur', phrase: 'Sur le mur de la cuisine, j’ai accroché le tableau des éléments. Il t’aide ?', generateurs: ['numero-atomique', 'symbole'] },
    { notion: 'combustions', titre: 'Le barbecue', phrase: 'Pour un bon feu, il faut trois choses. Et pour l’éteindre, il suffit d’en retirer une.', generateurs: ['triangle', 'masse-de-co2'] },
    { notion: 'acides-metaux', titre: 'L’évier', phrase: 'Mes vieilles casseroles en fer rouillent… Aide-moi à comprendre pourquoi.', generateurs: ['quel-gaz', 'rouille-ou-pas'] },
  ],
});
