/* Manipulation « point à déplacer sur le graphique d'une fonction » (SPEC.md, section 5 ; bloc « Proportionnalité, pourcentages et fonctions », notion 15).
   On déplace un point sur un quadrillage, jusqu'à la droite de la fonction, à l'abscisse demandée. Le code vérifie : rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : des boutons ; les coordonnées, et la place du point par rapport à la droite, sont annoncées à chaque geste.
   Le dessin fixe { dessin: 'point-graphique', a, b, xMax, yMax, marque, description } montre une droite, pour d'autres notions. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  // ---------- Calculs ----------

  const surDroite = (a, b, x) => a * x + b;
  /** Où est le point par rapport à la droite : 'sur', 'au-dessus' ou 'en dessous'. */
  function place(a, b, x, y) {
    const d = y - surDroite(a, b, x);
    return d === 0 ? 'sur' : d > 0 ? 'au-dessus' : 'en dessous';
  }
  const placeEcrite = (p) => (p === 'sur' ? 'Il est sur la droite.' : p === 'au-dessus' ? 'Il est au-dessus de la droite.' : 'Il est en dessous de la droite.');

  /** Les points entiers de la droite que l'on annonce au lecteur d'écran. */
  const valeurs = (a, b, xMax) => {
    const t = [];
    for (let x = 0; x <= xMax; x++) t.push([x, surDroite(a, b, x)]);
    return t;
  };

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');

  function svg(a, b, xMax, yMax, point, description) {
    const L = 300, H = 230, x0 = 36, y0 = 200;
    const X = (x) => x0 + (x / xMax) * (L - x0 - 14), Y = (y) => y0 - (y / yMax) * (y0 - 14);
    let s = '<svg class="dessin-code" viewBox="0 0 ' + L + ' ' + H + '" role="img" aria-label="' + aria(description) + '">';
    const pasY = [1, 2, 5, 10].find((p) => yMax / p <= 8) || 20; // un pas rond, pour lire l'axe debout
    for (let i = 0; i <= xMax; i++) {
      s += '<line x1="' + X(i) + '" y1="' + y0 + '" x2="' + X(i) + '" y2="14" class="tableur-case"/><text x="' + X(i) + '" y="' + (y0 + 16) + '" class="dessin-petit">' + i + '</text>';
    }
    for (let j = 0; j <= yMax; j += pasY) {
      s += '<line x1="' + x0 + '" y1="' + Y(j) + '" x2="' + X(xMax) + '" y2="' + Y(j) + '" class="tableur-case"/><text x="' + (x0 - 12) + '" y="' + (Y(j) + 4) + '" class="dessin-petit">' + j + '</text>';
    }
    // La droite, coupée au bord du quadrillage
    const xFin = a > 0 ? Math.min(xMax, (yMax - b) / a) : xMax;
    s += '<line x1="' + X(0) + '" y1="' + Y(b) + '" x2="' + X(xFin) + '" y2="' + Y(surDroite(a, b, xFin)) + '" class="courbe-ligne"/>';
    if (point) s += '<circle cx="' + X(point[0]) + '" cy="' + Y(point[1]) + '" r="7" class="echelle-point"/>';
    return s + '</svg>';
  }

  const dessin = (img) => svg(img.a, img.b, img.xMax || 5, img.yMax || 10, img.marque || null, img.description);

  function phrases() {
    return {
      juste: 'Bravo ! Ton point est bien sur la droite.',
      pasEncore: 'Pas encore. Regarde où se trouve ton point, et déplace-le.',
      suivant: 'Oui, ce point est sur la droite. Place maintenant le suivant.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { a, b, xMax, yMax, abscisses } : les abscisses des points à placer sur la droite, l'une après l'autre. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const { a, b, abscisses } = reglages;
    const xMax = reglages.xMax || 5, yMax = reglages.yMax || 10;
    let k = 0, x = 0, y = 0, termine = false;
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    function afficher(annonce) {
      const t = 'Point à placer pour x égal à ' + abscisses[k] + '. Ton point : x égal à ' + x + ', y égal à ' + y + '. ' + placeEcrite(place(a, b, x, y));
      cadre.innerHTML = svg(a, b, xMax, yMax, [x, y], t);
      etat.textContent = (annonce ? annonce + ' ' : '') + t;
    }
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
    };
    const borne = (v, m) => Math.max(0, Math.min(m, v));
    bouton('Un pas à droite', () => { x = borne(x + 1, xMax); afficher(); });
    bouton('Un pas à gauche', () => { x = borne(x - 1, xMax); afficher(); });
    bouton('Un pas vers le haut', () => { y = borne(y + 1, yMax); afficher(); });
    bouton('Un pas vers le bas', () => { y = borne(y - 1, yMax); afficher(); });
    bouton('Valider ce point', () => {
      if (x !== abscisses[k] || place(a, b, x, y) !== 'sur') { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
      k += 1;
      if (k < abscisses.length) { afficher(P.suivant); dire(etat.textContent, P.suivant); return; }
      k -= 1;
      termine = true;
      zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    afficher();
    return { etat: () => ({ x, y, k, termine }) };
  }

  return { type: 'point-graphique', surDroite, place, valeurs, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
