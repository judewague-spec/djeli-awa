/* Test de départ du bloc SVT « Le vivant et son évolution » : « La visite du verger » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un arbre du verger, au fond du potager, par notion testée (cycle 4 ; les notions de 3e sont
   toujours à apprendre). La jardinière dit sa phrase, puis pose deux questions tirées des générateurs de la notion.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'visite-du-verger',
  bloc: 'vivant-evolution',
  titre: 'La visite du verger',
  etape: 'arbre',
  prefixe: 'verger',
  phrases: {
    'test-intro': 'Viens au fond du potager : on visite le verger ! Sous chaque arbre, la jardinière te pose deux petites questions sur le vivant. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend la visite du verger là où tu t’étais arrêtée.',
    'test-fin': 'La visite du verger est finie. Merci ! Ton chemin du vivant est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'besoins-cellules', titre: 'Le citronnier', phrase: 'Ma feuille est faite de milliers de petites cases vivantes. De quoi vivent-elles ?', generateurs: ['besoin-ou-dechet', 'vivant-ou-pas'] },
    { notion: 'transport-sang', titre: 'Le goyavier', phrase: 'Mon tuyau d’arrosage va partout. Dans ton corps, qui fait ce travail ?', generateurs: ['apporte-ou-emporte', 'quel-organe'] },
    { notion: 'role-micro-organismes', titre: 'Le tas de feuilles mortes', phrase: 'Sous cet arbre, les feuilles mortes disparaissent toutes seules. Qui les fait disparaître ?', generateurs: ['quel-metier', 'qui-travaille'] },
    { notion: 'photosynthese', titre: 'Le manguier au soleil', phrase: 'Mes feuilles sont au travail, au soleil. Que fabriquent-elles ?', generateurs: ['utilise-ou-fabrique', 'ce-qu-il-manque'] },
    { notion: 'seves', titre: 'Le palmier', phrase: 'Un liquide circule dans mes tiges, même sans que tu le voies. Lequel ?', generateurs: ['quelle-seve', 'ou-absorbe'] },
    { notion: 'reserves-plantes', titre: 'Le carré d’ignames', phrase: 'Ici, les plantes gardent leurs provisions sous la terre. Où donc ?', generateurs: ['quel-organe', 'test-eau-iodee'] },
    { notion: 'reproduction-sexuee', titre: 'L’oranger en fleurs', phrase: 'Les abeilles visitent mes fleurs. Sans elles, pas de fruits !', generateurs: ['etape-suivante', 'qui-transporte'] },
    { notion: 'reproduction-asexuee', titre: 'La rangée de manioc', phrase: 'Toutes ces plantes sont nées d’un seul pied. Comment ?', generateurs: ['sexuee-ou-asexuee', 'copie-ou-pas'] },
    { notion: 'populations', titre: 'Le papayer aux pucerons', phrase: 'Il y a de plus en plus de pucerons sur mes feuilles. Pourquoi ?', generateurs: ['monte-ou-baisse', 'population-ou-pas'] },
    { notion: 'parente-classification', titre: 'Le poulailler', phrase: 'La poule, le chat, l’escargot passent sous mes branches. Qui est parent de qui ?', generateurs: ['quel-groupe', 'qui-est-le-plus-proche'] },
    { notion: 'place-humain', titre: 'Le banc du verger', phrase: 'Regarde ta main sur ce banc. Elle dit à quel groupe tu appartiens.', generateurs: ['boite-suivante', 'quel-caractere'] },
    { notion: 'fossiles', titre: 'Le vieux puits', phrase: 'Dans ce puits, on voit les couches de la terre. Elles racontent le passé.', generateurs: ['quelle-couche', 'etape-suivante'] },
    { notion: 'selection-naturelle', titre: 'Le chemin de terre', phrase: 'Sur ce chemin brun, les scarabées bruns sont les plus nombreux. Pourquoi ?', generateurs: ['bonne-explication', 'etape-suivante'] },
    { notion: 'vie-ailleurs', titre: 'La clairière du soir', phrase: 'Le soir, depuis cette clairière, on voit Mars. Y a-t-il de la vie, là-haut ?', generateurs: ['habitable-ou-pas', 'etat-de-l-eau'] },
  ],
});
