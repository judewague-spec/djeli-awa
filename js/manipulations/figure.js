/* Dessin « figure de géométrie » (bloc « Mesures, géométrie et espace ») : points, segments, angles et cercles, placés par le code à partir de leurs coordonnées.
   Une image { dessin: 'figure', points, segments, pointilles, droits, angles, cercles, arcs, description } : rien n'est dessiné par une IA.
   La description annonce toujours les sommets, les longueurs et les angles : aucun exercice ne dépend de la seule vue du dessin.
   Pas de geste ici : monter() affiche seulement le dessin. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const L = 300, H = 220, M = 26;

  /** L'échelle qui fait entrer la figure dans le cadre, sans la déformer. y monte vers le haut. */
  function cadrage(img) {
    const pts = Object.values(img.points || {}).slice();
    for (const [o, r] of (img.cercles || []).concat(img.arcs || [])) { const c = img.points[o]; pts.push([c[0] - r, c[1] - r], [c[0] + r, c[1] + r]); }
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const e = Math.min((L - 2 * M) / Math.max(x1 - x0, 1e-6), (H - 2 * M) / Math.max(y1 - y0, 1e-6));
    const dx = (L - (x1 - x0) * e) / 2, dy = (H - (y1 - y0) * e) / 2;
    return { e, X: (x) => dx + (x - x0) * e, Y: (y) => H - dy - (y - y0) * e };
  }

  const f1 = (x) => Number(x).toFixed(1);

  function svg(img) {
    const { e, X, Y } = cadrage(img);
    const P = img.points || {};
    const noms = Object.keys(P);
    const gx = noms.reduce((s, n) => s + X(P[n][0]), 0) / (noms.length || 1), gy = noms.reduce((s, n) => s + Y(P[n][1]), 0) / (noms.length || 1);
    const trait = (a, b, tirets) => '<line x1="' + f1(X(P[a][0])) + '" y1="' + f1(Y(P[a][1])) + '" x2="' + f1(X(P[b][0])) + '" y2="' + f1(Y(P[b][1])) + '" class="chaine-fleche"' + (tirets ? ' stroke-dasharray="5 4"' : '') + '/>';
    let s = '<svg class="dessin-code figure" viewBox="0 0 ' + L + ' ' + H + '" role="img" aria-label="' + aria(img.description) + '">';
    for (const [o, r] of img.cercles || []) s += '<circle cx="' + f1(X(P[o][0])) + '" cy="' + f1(Y(P[o][1])) + '" r="' + f1(r * e) + '" class="chaine-fleche"/>';
    for (const [o, r, a0, a1] of img.arcs || []) {
      const px = (a) => X(P[o][0] + r * Math.cos((a * Math.PI) / 180)), py = (a) => Y(P[o][1] + r * Math.sin((a * Math.PI) / 180));
      s += '<path d="M' + f1(px(a0)) + ',' + f1(py(a0)) + ' A' + f1(r * e) + ',' + f1(r * e) + ' 0 ' + (a1 - a0 > 180 ? 1 : 0) + ' 0 ' + f1(px(a1)) + ',' + f1(py(a1)) + '" class="chaine-fleche"/>';
    }
    for (const q of img.pointilles || []) s += trait(q[0], q[1], true);
    for (const q of img.segments || []) {
      s += trait(q[0], q[1], false);
      if (q[2]) { // la longueur, écrite au milieu du segment, du côté extérieur
        const mx = (X(P[q[0]][0]) + X(P[q[1]][0])) / 2, my = (Y(P[q[0]][1]) + Y(P[q[1]][1])) / 2;
        const d = Math.hypot(mx - gx, my - gy) || 1;
        s += '<text x="' + f1(mx + ((mx - gx) / d) * 14) + '" y="' + f1(my + ((my - gy) / d) * 14 + 4) + '" class="dessin-petit">' + q[2] + '</text>';
      }
    }
    for (const [a, b, c] of img.droits || []) { // le petit carré de l'angle droit, en b
      const u = (n) => { const dx = X(P[n][0]) - X(P[b][0]), dy = Y(P[n][1]) - Y(P[b][1]), l = Math.hypot(dx, dy) || 1; return [(dx / l) * 10, (dy / l) * 10]; };
      const [ax, ay] = u(a), [cx, cy] = u(c), bx = X(P[b][0]), by = Y(P[b][1]);
      s += '<path d="M' + f1(bx + ax) + ',' + f1(by + ay) + ' L' + f1(bx + ax + cx) + ',' + f1(by + ay + cy) + ' L' + f1(bx + cx) + ',' + f1(by + cy) + '" class="chaine-fleche"/>';
    }
    for (const [a, b, c, t] of img.angles || []) { // l'angle en b, écrit vers l'intérieur
      const v = (n) => { const dx = X(P[n][0]) - X(P[b][0]), dy = Y(P[n][1]) - Y(P[b][1]), l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
      const [ax, ay] = v(a), [cx, cy] = v(c), l = Math.hypot(ax + cx, ay + cy) || 1;
      s += '<text x="' + f1(X(P[b][0]) + ((ax + cx) / l) * 28) + '" y="' + f1(Y(P[b][1]) + ((ay + cy) / l) * 28 + 4) + '" class="dessin-petit">' + (t || '') + '</text>';
    }
    for (const n of noms) {
      if (n.startsWith('_')) continue; // un point d'appui sans nom
      const px = X(P[n][0]), py = Y(P[n][1]), d = Math.hypot(px - gx, py - gy) || 1;
      s += '<circle cx="' + f1(px) + '" cy="' + f1(py) + '" r="2.5" class="echelle-point"/><text x="' + f1(px + ((px - gx) / d) * 13) + '" y="' + f1(py + ((py - gy) / d) * 13 + 4) + '" class="dessin-legende">' + n + '</text>';
    }
    return s + '</svg>';
  }

  return {
    type: 'figure', svg, dessin: svg, phrases: () => ({}),
    monter(conteneur, reglages, dire, fini) { conteneur.innerHTML = svg(reglages); fini(); return {}; },
  };
});
