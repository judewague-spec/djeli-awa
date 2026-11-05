/* Révision espacée (SPEC.md, section 6).
   Une carte : { notion, intervalle (jours), derniere (jour de la dernière révision), echeance (jour prévu) }.
   Les jours sont des textes « AAAA-MM-JJ » (date locale) : pas de surprise au changement d'heure.
   Réglage : raté → 1 jour ; j'ai hésité → × 1,2 (premier : 2 jours, jamais moins de 2) ;
   facile → × 2,5 (premier : 3 jours) ; arrondi au jour supérieur.
   Plafonds : 14 jours à partir du 1er mai 2027, 7 jours à partir du 1er juin 2027,
   appliqués aussi aux cartes déjà programmées. */
(function (racine, fabrique) {
  const R = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = R;
  else racine.Revision = R;
})(this, function () {
  'use strict';

  const REPONSES = ['facile', 'hesite', 'rate'];
  const PLAFONDS = [
    { depuis: '2027-05-01', jours: 14 },
    { depuis: '2027-06-01', jours: 7 },
  ];

  const deux = (n) => String(n).padStart(2, '0');

  /** Le jour local d'une date (objet Date ou nombre de millisecondes). */
  function jourDe(date = new Date()) {
    const d = new Date(date);
    return d.getFullYear() + '-' + deux(d.getMonth() + 1) + '-' + deux(d.getDate());
  }

  function ajouterJours(jour, n) {
    const [a, m, j] = jour.split('-').map(Number);
    const d = new Date(Date.UTC(a, m - 1, j + n));
    return d.getUTCFullYear() + '-' + deux(d.getUTCMonth() + 1) + '-' + deux(d.getUTCDate());
  }

  const plusTard = (a, b) => (a > b ? a : b);

  /** Le plafond en vigueur ce jour-là : { depuis, jours }, ou null avant le 1er mai 2027. */
  function plafond(jour) {
    let p = null;
    for (const x of PLAFONDS) if (jour >= x.depuis) p = x;
    return p;
  }

  /** Intervalle suivant, sans plafond. Les multiplications passent par des entiers : 5 × 1,2 donne bien 6. */
  function intervalleSuivant(precedent, reponse) {
    if (!REPONSES.includes(reponse)) throw new Error('réponse inconnue : ' + reponse);
    if (reponse === 'rate') return 1;
    if (reponse === 'hesite') return precedent ? Math.max(2, Math.ceil((precedent * 12) / 10)) : 2;
    return precedent ? Math.ceil((precedent * 25) / 10) : 3;
  }

  /** Programme la carte après une révision faite ce jour-là. carte peut être null (nouvelle notion). */
  function programmer(carte, reponse, aujourdhui, notion = carte && carte.notion) {
    let intervalle = intervalleSuivant(carte ? carte.intervalle : 0, reponse);
    const p = plafond(aujourdhui);
    if (p) intervalle = Math.min(intervalle, p.jours);
    return { notion, intervalle, derniere: aujourdhui, echeance: ajouterJours(aujourdhui, intervalle) };
  }

  /** Ramène sous le plafond les cartes programmées trop loin. Une carte programmée avant l'entrée en vigueur
      du plafond est ramenée à (date d'entrée en vigueur + plafond), quel que soit le jour où l'on ouvre l'application.
      Rend { cartes, changees } ; les cartes d'origine ne sont pas modifiées. */
  function appliquerPlafonds(cartes, aujourdhui) {
    const p = plafond(aujourdhui);
    const resultat = {};
    let changees = 0;
    for (const id of Object.keys(cartes)) {
      const c = cartes[id];
      resultat[id] = c;
      if (!p) continue;
      const limite = ajouterJours(plusTard(c.derniere || p.depuis, p.depuis), p.jours);
      if (c.echeance > limite) {
        resultat[id] = Object.assign({}, c, { echeance: limite, intervalle: Math.min(c.intervalle, p.jours) });
        changees++;
      }
    }
    return { cartes: resultat, changees };
  }

  /** Identifiants des cartes à réviser ce jour-là, les plus en retard d'abord. */
  function dues(cartes, aujourdhui) {
    return Object.keys(cartes)
      .filter((id) => cartes[id].echeance <= aujourdhui)
      .sort((a, b) => (cartes[a].echeance < cartes[b].echeance ? -1 : cartes[a].echeance > cartes[b].echeance ? 1 : 0));
  }

  return { REPONSES, PLAFONDS, jourDe, ajouterJours, plafond, intervalleSuivant, programmer, appliquerPlafonds, dues };
});
