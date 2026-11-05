/* Graphe des prérequis du bloc de technologie « Le numérique et l'intelligence artificielle » (PROGRAMME.md, section 7, bloc 2).
   L'ordre de la liste est l'ordre du chemin. Une notion s'ouvre quand toutes les notions de « prerequis » sont acquises.
   quartier : l'atelier du réparateur, comme le bloc 1 de technologie.
   prefixe : le début des noms de sons des notions du bloc (outils/lister-phrases.js).
   Les notions de cycle 4 et de 4e ne demandent pas de notion de 3e : elles restent ainsi testables au test de départ. */
(function (racine, graphe) {
  if (typeof module === 'object' && module.exports) module.exports = graphe;
  else {
    racine.Contenu = racine.Contenu || { notions: {}, graphes: {} };
    racine.Contenu.graphes[graphe.bloc] = graphe;
  }
})(this, {
  matiere: 'technologie',
  bloc: 'numerique-ia',
  titre: 'Le numérique et l’intelligence artificielle',
  quartier: 'techno',
  prefixe: 'num',
  notions: [
    { numero: '1', id: 'fichiers-dossiers', classe: 'cycle 4', titre: 'Fichiers, dossiers et formats', prerequis: [] },
    { numero: '2', id: 'bit-octet', classe: 'cycle 4', titre: 'Le bit et l’octet', prerequis: [] },
    { numero: '3', id: 'tailles-fichiers', classe: 'cycle 4', titre: 'La taille d’une photo, d’une chanson, d’une vidéo', prerequis: ['fichiers-dossiers', 'bit-octet'] },
    { numero: '4', id: 'donnees-personnelles', classe: '4e', titre: 'Les données personnelles', prerequis: [] },
    { numero: '5', id: 'traces-cookies', classe: '4e', titre: 'Traces, cookies et géolocalisation', prerequis: ['donnees-personnelles'] },
    { numero: '6', id: 'mots-de-passe', classe: '4e', titre: 'Les mots de passe', prerequis: ['donnees-personnelles'] },
    { numero: '7', id: 'cyberviolence', classe: '4e', titre: 'La cyberviolence', prerequis: ['donnees-personnelles'] },
    { numero: '8', id: 'usage-raisonne', classe: '4e', titre: 'Un usage raisonné du numérique', prerequis: ['traces-cookies'] },
    { numero: '9', id: 'ia-apprentissage', classe: 'cycle 4', titre: 'Comment une intelligence artificielle apprend', prerequis: [] },
    { numero: '10', id: 'ia-usages-biais', classe: 'cycle 4', titre: 'Usages et biais de l’intelligence artificielle', prerequis: ['ia-apprentissage'] },
    { numero: '11', id: 'types-donnees', classe: 'cycle 4', titre: 'Les types de données', prerequis: ['fichiers-dossiers'] },
    { numero: '12', id: 'code-ascii', classe: 'cycle 4', titre: 'Le code ASCII', prerequis: ['bit-octet', 'types-donnees'] },
    { numero: '13', id: 'tableur-calculs', classe: 'cycle 4', titre: 'Le tableur : les calculs', prerequis: ['types-donnees'] },
    { numero: '14', id: 'tableur-tris', classe: 'cycle 4', titre: 'Le tableur : tris et filtres', prerequis: ['tableur-calculs'] },
    { numero: '15', id: 'reseau-local', classe: '4e', titre: 'Le réseau local', prerequis: [] },
    { numero: '16', id: 'adresse-ip', classe: '4e', titre: 'L’adresse IP', prerequis: ['reseau-local'] },
    { numero: '17', id: 'internet-routage', classe: '3e', titre: 'Internet : routeur, serveur et routage', prerequis: ['adresse-ip'] },
    { numero: '18', id: 'debit', classe: '3e', titre: 'Le débit', prerequis: ['tailles-fichiers', 'internet-routage'] },
    { numero: '19', id: 'numerique-societe', classe: '3e', titre: 'Le rôle du numérique dans la société', prerequis: ['usage-raisonne'] },
  ],
});
