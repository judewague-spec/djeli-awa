/* Manipulation « engrenage et pignon du vélo » (bloc « Comment un objet fonctionne »).
   On change le nombre de dents de la roue menée : le code calcule les tours et le sens. Rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : des boutons ; les dents, les tours et le sens sont annoncés à chaque geste.
   Le dessin fixe { dessin: 'engrenage', dentsA, dentsB, lien, description } montre les deux roues. lien : 'contact' (engrenage) ou 'chaine'. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const ecr = (x) => String(Math.round(x * 100) / 100).replace('.', ',');

  /** Tours de la roue menée quand la roue menante fait un tour : dents menantes ÷ dents menées. */
  const tours = (dentsA, dentsB, toursA = 1) => (toursA * dentsA) / dentsB;
  /** Deux roues en contact tournent en sens inverse ; reliées par une chaîne, dans le même sens. */
  const sensInverse = (lien) => lien === 'contact';

  function svg(dentsA, dentsB, lien, description) {
    const ra = 14 + dentsA * 0.9, rb = 14 + dentsB * 0.9, cy = 80;
    const ax = 20 + ra, bx = lien === 'contact' ? ax + ra + rb : ax + ra + rb + 40;
    let s = '<svg class="dessin-code" viewBox="0 0 ' + (bx + rb + 20) + ' 170" role="img" aria-label="' + aria(description) + '">';
    const roue = (x, r, d, nom) => '<circle cx="' + x + '" cy="' + cy + '" r="' + r + '" class="chaine-fleche"/><circle cx="' + x + '" cy="' + cy + '" r="3" class="echelle-point"/><text x="' + x + '" y="' + (cy + 5) + '" class="dessin-legende">' + d + '</text><text x="' + x + '" y="' + (cy + r + 14) + '" class="dessin-petit">' + nom + '</text>';
    if (lien !== 'contact') s += '<line x1="' + ax + '" y1="' + (cy - ra) + '" x2="' + bx + '" y2="' + (cy - rb) + '" class="chaine-fleche"/><line x1="' + ax + '" y1="' + (cy + ra) + '" x2="' + bx + '" y2="' + (cy + rb) + '" class="chaine-fleche"/>';
    return s + roue(ax, ra, dentsA + ' dents', 'menante') + roue(bx, rb, dentsB + ' dents', 'menée') + '</svg>';
  }

  const dessin = (img) => svg(img.dentsA, img.dentsB, img.lien || 'contact', img.description);

  function etatEcrit(dentsA, dentsB, lien) {
    return 'Roue menante : ' + dentsA + ' dents. Roue menée : ' + dentsB + ' dents. Pour un tour de la roue menante, la roue menée fait ' + ecr(tours(dentsA, dentsB)) + (tours(dentsA, dentsB) < 2 ? ' tour, ' : ' tours, ') + (sensInverse(lien) ? 'en sens inverse.' : 'dans le même sens.');
  }

  function phrases() {
    return {
      juste: 'Bravo ! Avec ce pignon, on obtient exactement les tours demandés.',
      pasEncore: 'Pas encore. Change le nombre de dents, et lis les tours écrits à l’écran.',
    };
  }

  /** reglages : { dentsA, choix: [dents possibles pour la roue menée], depart, lien, cible : les tours voulus } */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const { dentsA, choix, cible } = reglages;
    const lien = reglages.lien || 'contact';
    let i = reglages.depart === undefined ? 0 : choix.indexOf(reglages.depart), termine = false;
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    function afficher(mot) {
      const t = etatEcrit(dentsA, choix[i], lien);
      cadre.innerHTML = svg(dentsA, choix[i], lien, t);
      etat.textContent = (mot ? mot + ' ' : '') + t + ' Tours voulus : ' + ecr(cible) + '.';
    }
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
    };
    bouton('Un pignon plus grand', () => { if (i < choix.length - 1) { i += 1; afficher(); } else afficher('C’est le plus grand pignon.'); });
    bouton('Un pignon plus petit', () => { if (i > 0) { i -= 1; afficher(); } else afficher('C’est le plus petit pignon.'); });
    bouton('Valider ce pignon', () => {
      if (tours(dentsA, choix[i]) !== cible) { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
      termine = true;
      zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    afficher();
    return { etat: () => ({ dentsB: choix[i], termine }) };
  }

  return { type: 'engrenage', tours, sensInverse, etatEcrit, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
