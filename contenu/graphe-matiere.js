/* Graphe des prérequis du bloc physique-chimie « La matière » (PROGRAMME.md, section 5, bloc 1).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   quartier : le quartier du village où le bloc se joue (la cuisine : « on mélange, on chauffe et on observe »).
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js). */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'physique-chimie',
  bloc: 'matiere',
  titre: 'La matière',
  quartier: 'chimie',
  prefixe: 'pcm',
  notions: [
    { numero: '1', id: 'etats-matiere', classe: 'cycle 4', titre: 'Les trois états de la matière et les particules', prerequis: [] },
    { numero: '2', id: 'changements-etat', classe: 'cycle 4', titre: 'Les changements d’état', prerequis: ['etats-matiere'] },
    { numero: '3', id: 'corps-pur-melange', classe: 'cycle 4', titre: 'Corps pur et mélange', prerequis: ['etats-matiere'] },
    { numero: '4', id: 'solubilite-miscibilite', classe: 'cycle 4', titre: 'Solubilité et miscibilité', prerequis: ['corps-pur-melange'] },
    { numero: '5', id: 'composition-air', classe: 'cycle 4', titre: 'La composition de l’air', prerequis: ['corps-pur-melange'] },
    { numero: '6', id: 'masse-volumique', classe: '4e', titre: 'La masse volumique', prerequis: ['etats-matiere'] },
    { numero: '7', id: 'conservation-masse', classe: 'cycle 4', titre: 'La conservation de la masse', prerequis: ['changements-etat', 'solubilite-miscibilite'] },
    { numero: '8', id: 'tests-caracteristiques', classe: 'cycle 4', titre: 'Les tests de l’eau et du dioxyde de carbone', prerequis: ['corps-pur-melange'] },
    { numero: '9', id: 'transformation-chimique', classe: 'cycle 4', titre: 'Transformation physique ou chimique ?', prerequis: ['conservation-masse', 'tests-caracteristiques'] },
    { numero: '10', id: 'atomes-molecules', classe: 'cycle 4', titre: 'Atomes et molécules', prerequis: ['transformation-chimique'] },
    { numero: '11', id: 'equation-reaction', classe: '4e', titre: 'L’équation d’une réaction', prerequis: ['atomes-molecules'] },
    { numero: '12', id: 'tableau-periodique', classe: '4e', titre: 'Le tableau périodique', prerequis: ['atomes-molecules'] },
    { numero: '13', id: 'combustions', classe: 'cycle 4', titre: 'Les combustions', prerequis: ['equation-reaction', 'composition-air'] },
    { numero: '14', id: 'acides-metaux', classe: 'cycle 4', titre: 'Corrosion, acides et métaux', prerequis: ['equation-reaction', 'tests-caracteristiques'] },
    { numero: '15', id: 'structure-atome', classe: '3e', titre: 'La structure de l’atome', prerequis: ['tableau-periodique'] },
    { numero: '16', id: 'ions', classe: '3e', titre: 'Les ions', prerequis: ['structure-atome'] },
    { numero: '17', id: 'ph', classe: '3e', titre: 'Acide, basique ou neutre : le pH', prerequis: ['ions', 'acides-metaux'] },
  ],
});
