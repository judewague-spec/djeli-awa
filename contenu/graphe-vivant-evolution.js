/* Graphe des prérequis du bloc SVT « Le vivant et son évolution » (PROGRAMME.md, section 6, bloc 2).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   quartier : le potager et le champ, comme le bloc 1 de SVT.
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js).
   Les notions du cycle 4 ne demandent pas de notion de 3e : elles restent ainsi testables au test de départ. */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'svt',
  bloc: 'vivant-evolution',
  titre: 'Le vivant et son évolution',
  quartier: 'svt',
  prefixe: 'viv',
  notions: [
    { numero: '1', id: 'besoins-cellules', classe: 'cycle 4', titre: 'Les besoins des cellules', prerequis: [] },
    { numero: '2', id: 'transport-sang', classe: 'cycle 4', titre: 'Le transport par le sang', prerequis: ['besoins-cellules'] },
    { numero: '3', id: 'role-micro-organismes', classe: 'cycle 4', titre: 'Le rôle des micro-organismes', prerequis: ['besoins-cellules'] },
    { numero: '4', id: 'photosynthese', classe: 'cycle 4', titre: 'La photosynthèse', prerequis: ['besoins-cellules'] },
    { numero: '5', id: 'seves', classe: 'cycle 4', titre: 'Les sèves', prerequis: ['photosynthese'] },
    { numero: '6', id: 'reserves-plantes', classe: 'cycle 4', titre: 'Les réserves des plantes', prerequis: ['seves'] },
    { numero: '7', id: 'reproduction-sexuee', classe: 'cycle 4', titre: 'La reproduction sexuée', prerequis: ['besoins-cellules'] },
    { numero: '8', id: 'reproduction-asexuee', classe: 'cycle 4', titre: 'La reproduction asexuée', prerequis: ['reproduction-sexuee'] },
    { numero: '9', id: 'populations', classe: 'cycle 4', titre: 'Les populations', prerequis: ['reproduction-sexuee'] },
    { numero: '10', id: 'chromosomes-adn', classe: '3e', titre: 'Les chromosomes et l’ADN', prerequis: ['besoins-cellules'] },
    { numero: '11', id: 'genes-alleles', classe: '3e', titre: 'Les gènes et les allèles', prerequis: ['chromosomes-adn'] },
    { numero: '12', id: 'mutations', classe: '3e', titre: 'Les mutations', prerequis: ['genes-alleles'] },
    { numero: '13', id: 'meiose-fecondation', classe: '3e', titre: 'La méiose et la fécondation', prerequis: ['chromosomes-adn', 'reproduction-sexuee'] },
    { numero: '14', id: 'genotype-phenotype', classe: '3e', titre: 'Génotype, phénotype et environnement', prerequis: ['genes-alleles', 'meiose-fecondation'] },
    { numero: '15', id: 'parente-classification', classe: 'cycle 4', titre: 'La parenté et la classification', prerequis: [] },
    { numero: '16', id: 'place-humain', classe: 'cycle 4', titre: 'La place de l’être humain', prerequis: ['parente-classification'] },
    { numero: '17', id: 'fossiles', classe: 'cycle 4', titre: 'Les fossiles', prerequis: ['parente-classification'] },
    { numero: '18', id: 'selection-naturelle', classe: 'cycle 4', titre: 'La sélection naturelle et le hasard', prerequis: ['fossiles', 'populations'] },
    { numero: '19', id: 'vie-ailleurs', classe: 'cycle 4', titre: 'La vie sur d’autres planètes', prerequis: ['besoins-cellules'] },
  ],
});
