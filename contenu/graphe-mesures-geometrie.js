/* Graphe des prérequis du bloc de maths « Mesures, géométrie et espace » (PROGRAMME.md, section 4, bloc 4).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   Les rappels de 5e d'abord, puis les bases de 4e, avant la 3e et l'ancien programme (SPEC.md, principe 3). Les notions de 4e ne demandent
   aucune notion de 3e : elles restent testables au test de départ.
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js). */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'maths',
  bloc: 'mesures-geometrie',
  titre: 'Mesures, géométrie et espace',
  quartier: 'maths',
  prefixe: 'mes',
  notions: [
    { numero: '1', id: 'angles-triangle', classe: '5e', titre: 'La somme des angles', prerequis: [] },
    { numero: '2', id: 'inegalite-triangulaire', classe: '5e', titre: 'L’inégalité triangulaire', prerequis: [] },
    { numero: '3', id: 'parallelogramme', classe: '5e', titre: 'Le parallélogramme', prerequis: ['angles-triangle'] },
    { numero: '4', id: 'hauteurs-mediatrices', classe: '5e', titre: 'Hauteurs et médiatrices', prerequis: ['angles-triangle'] },
    { numero: '5', id: 'symetries', classe: '5e', titre: 'Les symétries', prerequis: ['parallelogramme'] },
    { numero: '6', id: 'conversions-unites', classe: '4e', titre: 'Les conversions', prerequis: [] },
    { numero: '7', id: 'unites-composees', classe: '4e', titre: 'Les unités composées', prerequis: ['conversions-unites'] },
    { numero: '8', id: 'aires-usuelles', classe: '4e', titre: 'Les aires usuelles', prerequis: ['conversions-unites'] },
    { numero: '9', id: 'volume-prisme-cylindre', classe: '4e', titre: 'Volume du prisme et du cylindre', prerequis: ['aires-usuelles'] },
    { numero: '10', id: 'volume-pyramide-cone', classe: '4e', titre: 'Volume de la pyramide et du cône', prerequis: ['volume-prisme-cylindre'] },
    { numero: '11', id: 'triangles-egaux', classe: '4e', titre: 'Cas d’égalité des triangles', prerequis: ['angles-triangle'] },
    { numero: '12', id: 'pythagore', classe: '4e', titre: 'Le théorème de Pythagore', prerequis: ['aires-usuelles'] },
    { numero: '13', id: 'pythagore-reciproque', classe: '4e', titre: 'Réciproque de Pythagore', prerequis: ['pythagore'] },
    { numero: '14', id: 'thales-emboites', classe: '4e', titre: 'Thalès en triangles emboîtés', prerequis: ['triangles-egaux'] },
    { numero: '15', id: 'cosinus', classe: '4e', titre: 'Le cosinus', prerequis: ['pythagore'] },
    { numero: '16', id: 'reperage-plan', classe: '4e', titre: 'Repérage dans le plan', prerequis: ['symetries'] },
    { numero: '17', id: 'translation', classe: '4e', titre: 'Translation et frises', prerequis: ['symetries', 'reperage-plan'] },
    { numero: '18', id: 'reperage-pave', classe: '4e', titre: 'Repérage dans un pavé', prerequis: ['reperage-plan'] },
    { numero: '19', id: 'perspective-cavaliere', classe: '4e', titre: 'La perspective cavalière', prerequis: ['reperage-pave'] },
    { numero: '20', id: 'patrons-vues', classe: '4e', titre: 'Patrons et vues', prerequis: ['perspective-cavaliere', 'volume-pyramide-cone'] },
    { numero: '21', id: 'agrandissement-reduction', classe: '4e', titre: 'Agrandissement et réduction', prerequis: ['aires-usuelles', 'volume-prisme-cylindre'] },
    { numero: '22', id: 'sphere-boule', classe: '3e', titre: 'Sphère et boule', prerequis: ['volume-pyramide-cone', 'agrandissement-reduction'] },
    { numero: '23', id: 'thales-papillon', classe: '3e', titre: 'Thalès en papillon', prerequis: ['thales-emboites'] },
    { numero: '24', id: 'thales-reciproque', classe: '3e', titre: 'Réciproque de Thalès', prerequis: ['thales-papillon'] },
    { numero: '25', id: 'triangles-semblables', classe: '3e', titre: 'Les triangles semblables', prerequis: ['thales-emboites', 'triangles-egaux', 'pythagore-reciproque'] },
    { numero: '26', id: 'sinus', classe: '3e', titre: 'Le sinus', prerequis: ['cosinus'] },
    { numero: '27', id: 'tangente', classe: '3e', titre: 'La tangente', prerequis: ['sinus'] },
    { numero: '28', id: 'rotation', classe: '3e', titre: 'La rotation', prerequis: ['translation'] },
    { numero: '29', id: 'homothetie', classe: '3e', titre: 'L’homothétie', prerequis: ['rotation', 'agrandissement-reduction'] },
    { numero: '30', id: 'angle-inscrit', classe: 'ancien programme', titre: 'Angle inscrit, angle au centre', prerequis: ['angles-triangle'] },
    { numero: '31', id: 'polygones-reguliers', classe: 'ancien programme', titre: 'Les polygones réguliers', prerequis: ['angle-inscrit'] },
    { numero: '32', id: 'reperage-sphere', classe: '3e', titre: 'Latitude et longitude', prerequis: ['reperage-pave', 'sphere-boule'] },
    { numero: '33', id: 'sections-planes', classe: '3e', titre: 'Sections de solides', prerequis: ['perspective-cavaliere', 'sphere-boule', 'pythagore', 'agrandissement-reduction'] },
  ],
});
