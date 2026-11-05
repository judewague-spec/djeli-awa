/* Manipulation « compter entre l'éclair et le tonnerre » (bloc « Signaux et Univers »).
   On compte les secondes : le code calcule la distance avec la vitesse du son dans l'air, 340 m/s. Rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : des boutons ; les secondes et la distance sont annoncées à chaque geste. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const VITESSE_SON = 340; // m/s, dans l'air, vers 15 °C
  const distance = (secondes) => VITESSE_SON * secondes;
  const millier = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const etatEcrit = (s) => 'Temps compté : ' + s + (s > 1 ? ' secondes' : ' seconde') + '. Distance de l’orage : 340 × ' + s + ' = ' + millier(distance(s)) + ' m.';

  function phrases() {
    return {
      juste: 'Bravo ! Tu as trouvé le temps qu’il faut compter pour cette distance.',
      pasEncore: 'Pas encore. Change le nombre de secondes, et lis la distance à l’écran.',
    };
  }

  /** reglages : { cible : la distance de l'orage, en mètres, multiple de 340 } */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const { cible } = reglages;
    let s = 1, termine = false;
    conteneur.innerHTML = '<p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    const afficher = (mot) => { etat.textContent = (mot ? mot + ' ' : '') + etatEcrit(s) + ' Distance voulue : ' + millier(cible) + ' m.'; };
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
    };
    bouton('Une seconde de plus', () => { s += 1; afficher(); });
    bouton('Une seconde de moins', () => { if (s > 1) { s -= 1; afficher(); } else afficher('On compte au moins une seconde.'); });
    bouton('Valider ce temps', () => {
      if (distance(s) !== cible) { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
      termine = true;
      zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    afficher();
    return { etat: () => ({ s, termine }) };
  }

  return { type: 'tonnerre', VITESSE_SON, distance, etatEcrit, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
