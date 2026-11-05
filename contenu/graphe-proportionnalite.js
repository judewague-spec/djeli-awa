/* Graphe des prérequis du bloc de maths « Proportionnalité, pourcentages et fonctions » (PROGRAMME.md, section 4, bloc 3).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   Les bases de 4e viennent avant la 3e (SPEC.md, principe 3 ; décision du 2 nov. 2026 pour le bloc du numérique). Les notions de 4e ne demandent
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
  bloc: 'proportionnalite',
  titre: 'Proportionnalité, pourcentages et fonctions',
  quartier: 'maths',
  prefixe: 'pro',
  notions: [
    { numero: '1', id: 'reconnaitre-proportionnalite', classe: '4e', titre: 'Reconnaître la proportionnalité', prerequis: [] },
    { numero: '2', id: 'quatrieme-proportionnelle', classe: '4e', titre: 'La quatrième proportionnelle', prerequis: ['reconnaitre-proportionnalite'] },
    { numero: '3', id: 'grandeur-vitesse', classe: '4e', titre: 'La vitesse', prerequis: ['quatrieme-proportionnelle'] },
    { numero: '4', id: 'grandeur-debit', classe: '4e', titre: 'Le débit d’un robinet', prerequis: ['grandeur-vitesse'] },
    { numero: '5', id: 'dependance-formule', classe: '4e', titre: 'Une grandeur qui dépend d’une autre : la formule', prerequis: ['reconnaitre-proportionnalite'] },
    { numero: '6', id: 'dependance-graphique', classe: '4e', titre: 'Une grandeur qui dépend d’une autre : tableau et graphique', prerequis: ['dependance-formule', 'reconnaitre-proportionnalite'] },
    { numero: '7', id: 'grandeur-masse-volumique', classe: '3e', titre: 'La masse volumique', prerequis: ['grandeur-debit'] },
    { numero: '8', id: 'pourcentage-appliquer', classe: '3e', titre: 'Calculer un pourcentage', prerequis: ['quatrieme-proportionnelle'] },
    { numero: '9', id: 'coefficient-multiplicateur', classe: '3e', titre: 'Le coefficient multiplicateur', prerequis: ['pourcentage-appliquer'] },
    { numero: '10', id: 'pourcentage-evolution', classe: '3e', titre: 'Le pourcentage d’évolution', prerequis: ['coefficient-multiplicateur'] },
    { numero: '11', id: 'fonction-machine', classe: '3e', titre: 'La machine à nombres : image, antécédent, f(x)', prerequis: ['dependance-formule'] },
    { numero: '12', id: 'lire-fonction', classe: '3e', titre: 'Lire une fonction dans un tableau et sur un graphique', prerequis: ['fonction-machine', 'dependance-graphique'] },
    { numero: '13', id: 'fonction-lineaire', classe: '3e', titre: 'La fonction linéaire', prerequis: ['fonction-machine', 'reconnaitre-proportionnalite'] },
    { numero: '14', id: 'fonction-affine', classe: '3e', titre: 'La fonction affine', prerequis: ['fonction-lineaire'] },
    { numero: '15', id: 'droite-graphique', classe: '3e', titre: 'Tracer et lire une droite', prerequis: ['fonction-affine', 'lire-fonction'] },
  ],
});
