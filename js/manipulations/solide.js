/* Manipulation « solide qui tourne en perspective cavalière » (SPEC.md, section 5 ; bloc « Mesures, géométrie et espace », notion 19).
   Le dessin des solides est calculé par le code : la face de devant en vraie grandeur, les arêtes qui fuient à moitié, à 45 degrés, les arêtes cachées en pointillés.
   Au doigt comme au lecteur d'écran : des boutons ; ce que l'on voit est annoncé à chaque quart de tour.
   Le dessin fixe { dessin: 'solide', forme, l, p, h, r, cotes, coupe, description } sert aussi aux autres notions du bloc. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const f1 = (x) => Number(x).toFixed(1);
  const ecr = (x) => String(x).replace('.', ',');
  const L = 300, H = 220;
  const COS = Math.SQRT1_2;

  /** La projection cavalière : ce qui fuit (y) est réduit de moitié, et penché à 45 degrés. */
  const projeter = (x, y, z) => [x + 0.5 * y * COS, z + 0.5 * y * COS];

  /** Après n quarts de tour, la face de devant et l'arête qui fuit échangent leurs longueurs. */
  const apresTours = (l, p, n) => (((n % 2) + 2) % 2 === 0 ? [l, p] : [p, l]);

  function etatEcrit(l, p, h, n) {
    const [a, b] = apresTours(l, p, n);
    return 'Face de devant : ' + ecr(a) + ' cm sur ' + ecr(h) + ' cm, en vraie grandeur. Arêtes qui fuient : elles mesurent ' + ecr(b) + ' cm, et sont dessinées à moitié, soit ' + ecr(b / 2) + ' cm, penchées à 45 degrés.';
  }

  // Les sommets et les arêtes [a, b, cachée] de chaque forme à faces planes.
  function polyedre(forme, l, p, h) {
    if (forme === 'pave') {
      const S = [[0, 0, 0], [l, 0, 0], [l, p, 0], [0, p, 0], [0, 0, h], [l, 0, h], [l, p, h], [0, p, h]];
      return { S, A: [[0, 1, 0], [1, 2, 0], [2, 3, 1], [3, 0, 1], [4, 5, 0], [5, 6, 0], [6, 7, 0], [7, 4, 0], [0, 4, 0], [1, 5, 0], [2, 6, 0], [3, 7, 1]] };
    }
    if (forme === 'prisme') { // base triangulaire, à l'avant et à l'arrière
      const S = [[0, 0, 0], [l, 0, 0], [l / 2, 0, h], [0, p, 0], [l, p, 0], [l / 2, p, h]];
      return { S, A: [[0, 1, 0], [1, 2, 0], [2, 0, 0], [3, 4, 1], [4, 5, 0], [5, 3, 1], [0, 3, 1], [1, 4, 0], [2, 5, 0]] };
    }
    // pyramide à base rectangulaire, le sommet à la verticale du centre
    const S = [[0, 0, 0], [l, 0, 0], [l, p, 0], [0, p, 0], [l / 2, p / 2, h]];
    return { S, A: [[0, 1, 0], [1, 2, 0], [2, 3, 1], [3, 0, 1], [0, 4, 0], [1, 4, 0], [2, 4, 0], [3, 4, 1]] };
  }

  function svg(img) {
    const { forme } = img;
    const cotes = img.cotes || {};
    let xs, ys;
    const texte = [], tracer = [];
    if (forme === 'pave' || forme === 'prisme' || forme === 'pyramide') {
      const { S, A } = polyedre(forme, img.l, img.p, img.h);
      const P = S.map((s) => projeter(s[0], s[1], s[2]));
      for (const [a, b, c] of A) tracer.push([P[a], P[b], c]);
      xs = P.map((q) => q[0]); ys = P.map((q) => q[1]);
      if (cotes.l) texte.push([(P[0][0] + P[1][0]) / 2, P[0][1], cotes.l, 'bas']);
      if (cotes.p) texte.push([(P[1][0] + P[2][0]) / 2, (P[1][1] + P[2][1]) / 2, cotes.p, 'droite']);
      if (cotes.h) texte.push(forme === 'pave' ? [P[0][0], (P[0][1] + P[4][1]) / 2, cotes.h, 'gauche'] : forme === 'prisme' ? [P[2][0], P[2][1], cotes.h, 'haut'] : [P[4][0], P[4][1], cotes.h, 'haut']);
    } else {
      const r = img.r;
      xs = [-r, r]; ys = forme === 'boule' ? [-r, r] : [-r * 0.35, (img.h || 0) + r * 0.35];
      if (cotes.r) texte.push([r / 2, 0, cotes.r, 'bas']);
      if (cotes.h) texte.push([0, img.h, cotes.h, 'haut']);
    }
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const e = Math.min((L - 70) / Math.max(x1 - x0, 1e-6), (H - 60) / Math.max(y1 - y0, 1e-6));
    const dx = (L - (x1 - x0) * e) / 2, dy = (H - (y1 - y0) * e) / 2;
    const XX = (x) => dx + (x - x0) * e, YY = (y) => H - dy - (y - y0) * e;
    const ligne = (a, b, c) => '<line x1="' + f1(XX(a[0])) + '" y1="' + f1(YY(a[1])) + '" x2="' + f1(XX(b[0])) + '" y2="' + f1(YY(b[1])) + '" class="chaine-fleche"' + (c ? ' stroke-dasharray="5 4"' : '') + '/>';
    let s = '<svg class="dessin-code solide" viewBox="0 0 ' + L + ' ' + H + '" role="img" aria-label="' + aria(img.description) + '">';
    for (const [a, b, c] of tracer) s += ligne(a, b, c);
    const ellipse = (cz, r) => { // une base ronde : la moitié de derrière en pointillés
      const rx = r * e, ry = r * 0.35 * e, cx = XX(0), cy = YY(cz);
      return '<path d="M' + f1(cx - rx) + ',' + f1(cy) + ' A' + f1(rx) + ',' + f1(ry) + ' 0 0 0 ' + f1(cx + rx) + ',' + f1(cy) + '" class="chaine-fleche"/><path d="M' + f1(cx - rx) + ',' + f1(cy) + ' A' + f1(rx) + ',' + f1(ry) + ' 0 0 1 ' + f1(cx + rx) + ',' + f1(cy) + '" class="chaine-fleche" stroke-dasharray="5 4"/>';
    };
    if (forme === 'cylindre') {
      const { r, h } = img;
      s += ellipse(0, r) + ligne([-r, 0], [-r, h]) + ligne([r, 0], [r, h]);
      s += '<ellipse cx="' + f1(XX(0)) + '" cy="' + f1(YY(h)) + '" rx="' + f1(r * e) + '" ry="' + f1(r * 0.35 * e) + '" class="chaine-fleche"/>';
    } else if (forme === 'cone') {
      const { r, h } = img;
      s += ellipse(0, r) + ligne([-r, 0], [0, h]) + ligne([r, 0], [0, h]);
    } else if (forme === 'boule') {
      s += '<circle cx="' + f1(XX(0)) + '" cy="' + f1(YY(0)) + '" r="' + f1(img.r * e) + '" class="chaine-fleche"/>' + ellipse(0, img.r);
    }
    if (img.coupe) s += coupeDessinee(img, XX, YY, e);
    for (const [x, y, t, ou] of texte) {
      const px = XX(x) + (ou === 'droite' ? 26 : ou === 'gauche' ? -24 : 0), py = YY(y) + (ou === 'bas' ? 16 : ou === 'haut' ? -8 : 4);
      s += '<text x="' + f1(px) + '" y="' + f1(py) + '" class="dessin-petit">' + t + '</text>';
    }
    return s + '</svg>';
  }

  /** Le contour de la section, en trait épais (courbe-ligne). coupe : { plan: 'horizontal' | 'vertical', t : la place, de 0 à 1 }. */
  function coupeDessinee(img, XX, YY, e) {
    const { forme, coupe } = img;
    const t = coupe.t === undefined ? 0.5 : coupe.t;
    const poly = (pts) => '<polygon points="' + pts.map((q) => f1(XX(q[0])) + ',' + f1(YY(q[1]))).join(' ') + '" class="courbe-ligne"/>';
    if (forme === 'pave') {
      const { l, p, h } = img;
      if (coupe.plan === 'horizontal') return poly([[0, 0, h * t], [l, 0, h * t], [l, p, h * t], [0, p, h * t]].map((s) => projeter(s[0], s[1], s[2])));
      return poly([[l * t, 0, 0], [l * t, p, 0], [l * t, p, h], [l * t, 0, h]].map((s) => projeter(s[0], s[1], s[2])));
    }
    if (forme === 'pyramide') {
      const { l, p, h } = img;
      const a = t / 2; // la section parallèle à la base : une réduction de la base, centrée
      return poly([[l * a, p * a], [l * (1 - a), p * a], [l * (1 - a), p * (1 - a)], [l * a, p * (1 - a)]].map((s) => projeter(s[0], s[1], h * t)));
    }
    const rond = (cz, r) => '<ellipse cx="' + f1(XX(0)) + '" cy="' + f1(YY(cz)) + '" rx="' + f1(r * e) + '" ry="' + f1(r * 0.35 * e) + '" class="courbe-ligne"/>';
    if (forme === 'cylindre') {
      if (coupe.plan === 'horizontal') return rond(img.h * t, img.r);
      return poly([[-img.r * 0.5, 0], [img.r * 0.5, 0], [img.r * 0.5, img.h], [-img.r * 0.5, img.h]]);
    }
    if (forme === 'cone') return rond(img.h * t, img.r * (1 - t));
    if (forme === 'boule') { const z = img.r * t; return rond(z, Math.sqrt(img.r * img.r - z * z)); }
    return '';
  }

  function phrases() {
    return {
      juste: 'Bravo ! C’est bien cette face qui est devant. Elle garde sa vraie grandeur.',
      pasEncore: 'Pas encore. Tourne le solide, et lis ce qui est annoncé à l’écran.',
    };
  }

  /** reglages : { l, p, h, cible : la largeur voulue pour la face de devant } */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const { l, p, h, cible } = reglages;
    let n = 0, termine = false;
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    function afficher(annonce) {
      const [a, b] = apresTours(l, p, n);
      const t = etatEcrit(l, p, h, n);
      cadre.innerHTML = svg({ forme: 'pave', l: a, p: b, h, cotes: { l: ecr(a) + ' cm', p: ecr(b) + ' cm', h: ecr(h) + ' cm' }, description: t });
      etat.textContent = (annonce ? annonce + ' ' : '') + t + ' Face voulue devant : ' + ecr(cible) + ' cm de large.';
    }
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
    };
    bouton('Un quart de tour à droite', () => { n += 1; afficher(); });
    bouton('Un quart de tour à gauche', () => { n -= 1; afficher(); });
    bouton('Valider cette vue', () => {
      if (apresTours(l, p, n)[0] !== cible) { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
      termine = true;
      zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    afficher();
    return { etat: () => ({ n, termine }) };
  }

  return { type: 'solide', projeter, apresTours, etatEcrit, polyedre, svg, dessin: svg, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
