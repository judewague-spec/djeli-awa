/* Dessins fixes des blocs de données et de la Terre : faits en code, chacun avec sa description orale, et ses valeurs écrites (la couleur n'est jamais le seul indice).
     batons      { valeurs: [[nom, effectif]], axe, description }      un diagramme en bâtons
     circulaire  { parts: [[nom, angle en degrés]], description }      un diagramme circulaire
     histogramme { classes: [[borne basse, borne haute, effectif]], axe, description }  un histogramme à classes de même largeur
     arbre-proba { etages: [['P', 'F'], ['P', 'F']], description }  un arbre de deux épreuves
     programme   { lignes: [texte], description }                      les blocs d'un programme, l'un sous l'autre (retrait avec des espaces)
     coupe-terre { couches: [[nom, épaisseur relative]], description } une coupe en couches, de haut en bas (sol, roches, Terre) */
(function (racine, fabrique) {
  const liste = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = liste;
  else if (racine.Manipulations) liste.forEach((d) => racine.Manipulations.enregistrer(d));
})(this, function () {
  'use strict';

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const f1 = (x) => Number(x).toFixed(1);
  const ouvrir = (l, h, description) => '<svg class="dessin-code" viewBox="0 0 ' + l + ' ' + h + '" role="img" aria-label="' + aria(description) + '">';
  const ecr = (x) => String(x).replace('.', ',');

  function batons(img) {
    const max = Math.max(...img.valeurs.map((v) => v[1]));
    const n = img.valeurs.length, L = 300, y0 = 170, H = 130, pas = (L - 40) / n;
    let s = ouvrir(L, 210, img.description) + '<line x1="30" y1="' + y0 + '" x2="' + (L - 4) + '" y2="' + y0 + '" class="chaine-fleche"/><line x1="30" y1="' + y0 + '" x2="30" y2="20" class="chaine-fleche"/>';
    img.valeurs.forEach(([nom, e], i) => {
      const x = 30 + pas * (i + 0.5), h = (e / max) * H;
      s += '<line x1="' + f1(x) + '" y1="' + y0 + '" x2="' + f1(x) + '" y2="' + f1(y0 - h) + '" class="courbe-ligne"/><text x="' + f1(x) + '" y="' + f1(y0 - h - 5) + '" class="dessin-petit">' + ecr(e) + '</text><text x="' + f1(x) + '" y="' + (y0 + 14 + (n > 4 && i % 2 ? 12 : 0)) + '" class="dessin-petit">' + nom + '</text>';
    });
    return s + '<text x="165" y="204" class="dessin-legende">' + (img.axe || '') + '</text></svg>';
  }

  function circulaire(img) {
    const cx = 100, cy = 100, r = 80;
    let a = -90;
    let s = ouvrir(300, 200, img.description) + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="chaine-fleche"/>';
    img.parts.forEach(([nom, ang], i) => {
      const rad = (a * Math.PI) / 180;
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + f1(cx + r * Math.cos(rad)) + '" y2="' + f1(cy + r * Math.sin(rad)) + '" class="chaine-fleche"/>';
      const mil = ((a + ang / 2) * Math.PI) / 180;
      s += '<text x="' + f1(cx + r * 0.6 * Math.cos(mil)) + '" y="' + f1(cy + r * 0.6 * Math.sin(mil) + 4) + '" class="dessin-legende">' + (i + 1) + '</text>';
      s += '<text x="192" y="' + (30 + i * 18) + '" class="dessin-petit" style="text-anchor: start">' + (i + 1) + ' : ' + nom + ', ' + ecr(ang) + '°</text>';
      a += ang;
    });
    return s + '</svg>';
  }

  function histogramme(img) {
    const max = Math.max(...img.classes.map((c) => c[2]));
    const n = img.classes.length, L = 300, y0 = 170, H = 130, w = (L - 40) / n;
    let s = ouvrir(L, 210, img.description) + '<line x1="30" y1="' + y0 + '" x2="' + (L - 4) + '" y2="' + y0 + '" class="chaine-fleche"/>';
    img.classes.forEach(([a, b, e], i) => {
      const x = 30 + i * w, h = (e / max) * H;
      s += '<rect x="' + f1(x) + '" y="' + f1(y0 - h) + '" width="' + f1(w) + '" height="' + f1(h) + '" class="chaine-case"/><text x="' + f1(x + w / 2) + '" y="' + f1(y0 - h - 4) + '" class="dessin-petit">' + e + '</text><text x="' + f1(x) + '" y="' + (y0 + 14) + '" class="dessin-petit">' + a + '</text>';
      if (i === n - 1) s += '<text x="' + f1(x + w) + '" y="' + (y0 + 14) + '" class="dessin-petit">' + b + '</text>';
    });
    return s + '<text x="165" y="204" class="dessin-legende">' + (img.axe || '') + '</text></svg>';
  }

  function arbre(img) {
    const [n1, n2] = img.etages;
    const H = Math.max(120, n1.length * n2.length * 30), x0 = 20, x1 = 120, x2 = 220;
    const pas2 = H / (n1.length * n2.length), pas1 = H / n1.length;
    let s = ouvrir(300, H + 10, img.description);
    n1.forEach((a, i) => {
      const y1 = pas1 * (i + 0.5);
      s += '<line x1="' + x0 + '" y1="' + f1(H / 2) + '" x2="' + x1 + '" y2="' + f1(y1) + '" class="chaine-fleche"/><text x="' + (x1 + 6) + '" y="' + f1(y1 - 4) + '" class="dessin-legende">' + a + '</text>';
      n2.forEach((b, j) => {
        const y2 = pas2 * (i * n2.length + j + 0.5);
        s += '<line x1="' + x1 + '" y1="' + f1(y1) + '" x2="' + x2 + '" y2="' + f1(y2) + '" class="chaine-fleche"/><text x="' + (x2 + 6) + '" y="' + f1(y2 + 4) + '" class="dessin-legende">' + b + ', issue ' + a + b + '</text>';
      });
    });
    return s + '</svg>';
  }

  function programme(img) {
    const h = 26;
    let s = ouvrir(300, img.lignes.length * h + 8, img.description);
    img.lignes.forEach((t, i) => {
      const retrait = t.length - t.trimStart().length;
      s += '<rect x="' + (4 + retrait * 6) + '" y="' + (4 + i * h) + '" width="' + (290 - retrait * 6) + '" height="' + (h - 3) + '" rx="5" class="chaine-case"/><text x="' + (12 + retrait * 6) + '" y="' + (21 + i * h) + '" class="dessin-petit" style="text-anchor: start">' + t.trim() + '</text>';
    });
    return s + '</svg>';
  }

  function coupe(img) {
    const total = img.couches.reduce((a, c) => a + c[1], 0), H = 180;
    let y = 8, s = ouvrir(300, H + 16, img.description);
    for (const [nom, e] of img.couches) {
      const h = (e / total) * H;
      s += '<rect x="20" y="' + f1(y) + '" width="260" height="' + f1(h) + '" class="tableur-case"/><text x="150" y="' + f1(y + h / 2 + 4) + '" class="dessin-legende">' + nom + '</text>';
      y += h;
    }
    return s + '</svg>';
  }

  const fixe = (type, f) => ({
    type,
    dessin: f,
    phrases: () => ({}),
    phrasesDites: () => [],
    monter(conteneur, reglages, dire, fini) { conteneur.innerHTML = f(reglages); fini(); },
  });

  return [fixe('batons', batons), fixe('circulaire', circulaire), fixe('histogramme', histogramme), fixe('arbre-proba', arbre), fixe('programme', programme), fixe('coupe-terre', coupe)];
});
