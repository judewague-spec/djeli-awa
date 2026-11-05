/* Manipulation « transformer une figure » (SPEC.md, section 5 : translation, rotation, homothétie, agrandissement ; bloc « Mesures, géométrie et espace »).
   Sur un quadrillage, on déplace, on tourne ou on agrandit un triangle, jusqu'à obtenir l'image demandée. Tout est calculé par le code.
   Au doigt comme au lecteur d'écran : des boutons ; les coordonnées des sommets de l'image, et l'aire en homothétie, sont annoncées à chaque geste.
   Le dessin fixe { dessin: 'transformation', points, image, centre, cote, description } montre une figure et son image. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const ecr = (x) => String(x).replace('.', ',').replace('-', '−');
  const f1 = (x) => Number(x).toFixed(1);

  // ---------- Calculs ----------

  const translater = (pt, dx, dy) => [pt[0] + dx, pt[1] + dy];
  /** n quarts de tour autour de o : sens inverse des aiguilles si n > 0. */
  function tourner(pt, o, n) {
    let [x, y] = [pt[0] - o[0], pt[1] - o[1]];
    const q = ((n % 4) + 4) % 4;
    for (let i = 0; i < q; i++) [x, y] = [-y, x];
    return [x + o[0], y + o[1]];
  }
  const agrandir = (pt, o, k) => [o[0] + k * (pt[0] - o[0]), o[1] + k * (pt[1] - o[1])];
  const aireTriangle = (a, b, c) => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
  const carreaux = (x) => ecr(x) + (x > 1 ? ' carreaux' : ' carreau');
  const coords = (noms, pts) => noms.map((n, i) => n + '′ (' + ecr(pts[i][0]) + ' ; ' + ecr(pts[i][1]) + ')').join(', ');

  // ---------- Dessin ----------

  function svg(points, image, centre, cote, description) {
    const L = 300, x0 = 14, y0 = 14, e = (L - 2 * x0) / cote;
    const X = (x) => x0 + x * e, Y = (y) => L - y0 - y * e;
    let s = '<svg class="dessin-code transformation" viewBox="0 0 ' + L + ' ' + L + '" role="img" aria-label="' + aria(description) + '">';
    for (let i = 0; i <= cote; i++) {
      s += '<line x1="' + f1(X(i)) + '" y1="' + f1(Y(0)) + '" x2="' + f1(X(i)) + '" y2="' + f1(Y(cote)) + '" class="tableur-case"/>';
      s += '<line x1="' + f1(X(0)) + '" y1="' + f1(Y(i)) + '" x2="' + f1(X(cote)) + '" y2="' + f1(Y(i)) + '" class="tableur-case"/>';
    }
    const poly = (t, cl, tirets) => '<polygon points="' + t.map((q) => f1(X(q[0])) + ',' + f1(Y(q[1]))).join(' ') + '" class="' + cl + '"' + (tirets ? ' stroke-dasharray="5 4"' : '') + '/>';
    const noms = Object.keys(points);
    const dep = noms.map((n) => points[n]);
    s += poly(dep, 'chaine-fleche', true);
    if (image) s += poly(image, 'courbe-ligne', false);
    noms.forEach((n, i) => {
      s += '<text x="' + f1(X(dep[i][0]) - 8) + '" y="' + f1(Y(dep[i][1]) - 4) + '" class="dessin-petit">' + n + '</text>';
      if (image) s += '<text x="' + f1(X(image[i][0]) + 8) + '" y="' + f1(Y(image[i][1]) - 4) + '" class="dessin-legende">' + n + '′</text>';
    });
    if (centre) s += '<circle cx="' + f1(X(centre[0])) + '" cy="' + f1(Y(centre[1])) + '" r="4" class="echelle-point"/><text x="' + f1(X(centre[0]) - 9) + '" y="' + f1(Y(centre[1]) + 12) + '" class="dessin-petit">O</text>';
    return s + '</svg>';
  }

  const dessin = (img) => svg(img.points, img.image || null, img.centre || null, img.cote || 10, img.description);

  function phrases() {
    return {
      juste: 'Bravo ! Ton image est exactement à la place demandée.',
      pasEncore: 'Pas encore. Lis les coordonnées écrites à l’écran, et continue.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { genre: 'translation' | 'rotation' | 'homothetie', points: { A: [x, y], … }, centre, cote, cible, rapports } ;
      cible : [dx, dy] en translation, un nombre de quarts de tour en rotation, le rapport en homothétie. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const { genre, points, centre, cible } = reglages;
    const cote = reglages.cote || 10;
    const noms = Object.keys(points), dep = noms.map((n) => points[n]);
    const rapports = reglages.rapports || [0.5, 1, 1.5, 2, 3];
    let dx = 0, dy = 0, n = 0, ik = rapports.indexOf(1), termine = false;
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    const image = () => dep.map((q) => (genre === 'translation' ? translater(q, dx, dy) : genre === 'rotation' ? tourner(q, centre, n) : agrandir(q, centre, rapports[ik])));
    function afficher(annonce) {
      const im = image();
      let t = 'Image : ' + coords(noms, im) + '.';
      if (genre === 'translation') t += ' Déplacement : ' + ecr(dx) + ' en largeur, ' + ecr(dy) + ' en hauteur.';
      if (genre === 'rotation') t += ' Angle : ' + (((n % 4) + 4) % 4) * 90 + ' degrés, sens inverse des aiguilles d’une montre.';
      if (genre === 'homothetie') t += ' Rapport : ' + ecr(rapports[ik]) + '. Aire de départ : ' + carreaux(aireTriangle(...dep)) + '. Aire de l’image : ' + carreaux(aireTriangle(...im)) + '.';
      cadre.innerHTML = svg(points, im, centre || null, cote, t);
      etat.textContent = (annonce ? annonce + ' ' : '') + t;
    }
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
    };
    const dans = (ddx, ddy) => dep.every((q) => q[0] + dx + ddx >= 0 && q[0] + dx + ddx <= cote && q[1] + dy + ddy >= 0 && q[1] + dy + ddy <= cote);
    const bouge = (ddx, ddy) => { if (dans(ddx, ddy)) { dx += ddx; dy += ddy; afficher(); } else afficher('Bord du quadrillage.'); };
    if (genre === 'translation') {
      bouton('Un carreau à droite', () => bouge(1, 0));
      bouton('Un carreau à gauche', () => bouge(-1, 0));
      bouton('Un carreau vers le haut', () => bouge(0, 1));
      bouton('Un carreau vers le bas', () => bouge(0, -1));
    } else if (genre === 'rotation') {
      bouton('Un quart de tour, sens inverse des aiguilles', () => { n += 1; afficher(); });
      bouton('Un quart de tour, sens des aiguilles', () => { n -= 1; afficher(); });
    } else {
      bouton('Rapport plus grand', () => { if (ik < rapports.length - 1) { ik += 1; afficher(); } else afficher('C’est le rapport le plus grand.'); });
      bouton('Rapport plus petit', () => { if (ik > 0) { ik -= 1; afficher(); } else afficher('C’est le rapport le plus petit.'); });
    }
    const reussi = () => (genre === 'translation' ? dx === cible[0] && dy === cible[1] : genre === 'rotation' ? ((n % 4) + 4) % 4 === ((cible % 4) + 4) % 4 : rapports[ik] === cible);
    bouton('Valider cette image', () => {
      if (!reussi()) { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
      termine = true;
      zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    afficher();
    return { etat: () => ({ dx, dy, n, k: rapports[ik], termine }) };
  }

  return { type: 'transformation', translater, tourner, agrandir, aireTriangle, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
