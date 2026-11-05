/* Graphe des prérequis du bloc SVT « Le corps humain et la santé » (PROGRAMME.md, section 6, bloc 1).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   quartier : le quartier du village où le bloc se joue (le potager et le champ : « on découvre le vivant, du corps humain aux plantes »).
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js). */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'svt',
  bloc: 'corps-sante',
  titre: 'Le corps humain et la santé',
  quartier: 'svt',
  prefixe: 'svt',
  notions: [
    { numero: '1', id: 'effort-rythmes', classe: 'cycle 4', titre: 'L’effort : le pouls et la respiration', prerequis: [] },
    { numero: '2', id: 'effort-besoins', classe: 'cycle 4', titre: 'Ce que les muscles demandent pendant l’effort', prerequis: ['effort-rythmes'] },
    { numero: '3', id: 'systeme-nerveux', classe: '4e', titre: 'Le système nerveux et le réflexe', prerequis: [] },
    { numero: '4', id: 'neurones', classe: '4e', titre: 'Neurones et message nerveux', prerequis: ['systeme-nerveux'] },
    { numero: '5', id: 'hygiene-de-vie', classe: 'cycle 4', titre: 'Sommeil, entraînement et limites', prerequis: ['effort-besoins'] },
    { numero: '6', id: 'drogues-dopage', classe: 'cycle 4', titre: 'Drogues et dopage', prerequis: ['neurones', 'hygiene-de-vie'] },
    { numero: '7', id: 'digestion', classe: 'cycle 4', titre: 'La digestion', prerequis: [] },
    { numero: '8', id: 'enzymes', classe: '3e', titre: 'Les enzymes de la digestion', prerequis: ['digestion'] },
    { numero: '9', id: 'absorption', classe: 'cycle 4', titre: 'L’absorption des nutriments', prerequis: ['digestion'] },
    { numero: '10', id: 'besoins-nutritionnels', classe: 'cycle 4', titre: 'Les besoins nutritionnels', prerequis: ['absorption', 'effort-besoins'] },
    { numero: '11', id: 'microbes', classe: 'cycle 4', titre: 'Les microbes et le microbiote', prerequis: [] },
    { numero: '12', id: 'hygiene-antiseptiques', classe: 'cycle 4', titre: 'Hygiène et antiseptiques', prerequis: ['microbes'] },
    { numero: '13', id: 'antibiotiques', classe: 'cycle 4', titre: 'Les antibiotiques et la résistance', prerequis: ['microbes'] },
    { numero: '14', id: 'vaccination', classe: 'cycle 4', titre: 'La vaccination', prerequis: ['microbes'] },
    { numero: '15', id: 'immunite', classe: '3e', titre: 'L’immunité, la défense du corps', prerequis: ['vaccination', 'antibiotiques'] },
    { numero: '16', id: 'puberte', classe: 'cycle 4', titre: 'La puberté et les hormones', prerequis: [] },
    { numero: '17', id: 'appareils-reproducteurs', classe: 'cycle 4', titre: 'Les appareils reproducteurs et les gamètes', prerequis: ['puberte'] },
    { numero: '18', id: 'fecondation-grossesse', classe: 'cycle 4', titre: 'Fécondation, grossesse et fertilité', prerequis: ['appareils-reproducteurs'] },
    { numero: '19', id: 'contraception-ist', classe: 'cycle 4', titre: 'Contraception et infections sexuellement transmissibles', prerequis: ['fecondation-grossesse', 'hygiene-antiseptiques'] },
  ],
});
