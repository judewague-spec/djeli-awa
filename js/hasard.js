/* Tirages au hasard reproductibles : une graine donne toujours la même suite.
   Les tests rejouent ainsi des milliers de tirages ; l'application prend une graine nouvelle à chaque mission. */
(function (racine, fabrique) {
  const H = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = H;
  else racine.Hasard = H;
})(this, function () {
  'use strict';

  /** Rend un tireur : alea() donne un nombre dans [0, 1[, et des raccourcis pratiques. */
  function creer(graine = Date.now()) {
    let a = graine >>> 0;
    function alea() {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    alea.entier = (min, max) => min + Math.floor(alea() * (max - min + 1));
    alea.choisir = (liste) => liste[Math.floor(alea() * liste.length)];
    alea.melanger = (liste) => {
      const l = liste.slice();
      for (let i = l.length - 1; i > 0; i--) {
        const j = Math.floor(alea() * (i + 1));
        [l[i], l[j]] = [l[j], l[i]];
      }
      return l;
    };
    return alea;
  }

  return { creer };
});
