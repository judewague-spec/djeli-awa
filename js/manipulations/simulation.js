/* Manipulation « simulation d'un dé » (bloc « Données, probabilités, programmation », fréquence et probabilité).
   On lance un dé en code, par séries : la fréquence du six s'approche de un sixième. Le hasard vient d'une suite calculée par le code, pas d'une IA.
   Au doigt comme au lecteur d'écran : des boutons ; le nombre de lancers, de six et la fréquence sont annoncés à chaque geste.
   Une graine fixe rend le résultat reproductible (pour les tests). */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const ecr = (x) => String(x).replace('.', ',');

  /** Une suite de dés calculée : une même graine donne les mêmes lancers. */
  function lanceur(graine) {
    let g = graine >>> 0;
    return () => {
      g = (Math.imul(g, 1664525) + 1013904223) >>> 0;
      return ((g >>> 16) % 6) + 1;
    };
  }
  /** La fréquence arrondie au centième. */
  const frequence = (six, lancers) => (lancers ? Math.round((six / lancers) * 100) / 100 : 0);

  function etatEcrit(lancers, six) {
    return 'Lancers : ' + lancers + '. Six obtenus : ' + six + '. Fréquence du six : ' + ecr(frequence(six, lancers)) + '. Probabilité : un sixième, soit environ 0,17.';
  }

  function phrases() {
    return {
      fin: 'Bravo ! Avec beaucoup de lancers, la fréquence se rapproche de la probabilité.',
    };
  }

  /** reglages : { graine, objectif : le nombre de lancers à atteindre } */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const de = lanceur(reglages.graine || 7);
    const objectif = reglages.objectif || 1000;
    let lancers = 0, six = 0, termine = false;
    conteneur.innerHTML = '<p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    const afficher = (mot) => { etat.textContent = (mot ? mot + ' ' : '') + etatEcrit(lancers, six) + (termine ? '' : ' Objectif : ' + objectif + ' lancers.'); };
    const lancer = (n) => {
      if (termine) return;
      for (let i = 0; i < n; i++) { lancers += 1; if (de() === 6) six += 1; }
      if (lancers >= objectif) {
        termine = true;
        zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
        afficher(P.fin);
        etat.setAttribute('tabindex', '-1');
        etat.focus();
        dire(etat.textContent, P.fin);
        fini();
      } else afficher();
    };
    for (const n of [10, 100]) {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = 'Lancer ' + n + ' fois';
      c.addEventListener('click', () => lancer(n));
      zone.appendChild(c);
    }
    afficher();
    return { etat: () => ({ lancers, six, termine }) };
  }

  return { type: 'simulation', lanceur, frequence, etatEcrit, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
