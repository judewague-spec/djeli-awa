/* Dessins fixes du bloc « Mouvement et forces » : faits en code, chacun avec sa description orale. Rien à toucher.
     trajectoire  { forme: droite | cercle | courbe, legende, description }   le chemin dessiné par un objet
     chronophoto  { positions: [en mètres], legende, description }            la position de l'objet à intervalles de temps égaux
     train-quai   { description }                                             Rachel assise dans le train, Laure debout sur le quai
     attraction   { gauche, droite, description }                             deux astres qui s'attirent : deux flèches opposées */
(function (racine, fabrique) {
  const liste = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = liste;
  else if (racine.Manipulations) liste.forEach((d) => racine.Manipulations.enregistrer(d));
})(this, function () {
  'use strict';

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const ouvrir = (l, h, description) => '<svg class="dessin-code" viewBox="0 0 ' + l + ' ' + h + '" role="img" aria-label="' + aria(description) + '">';

  function trajectoire(img) {
    let s = ouvrir(300, 170, img.description);
    if (img.forme === 'droite') s += '<line x1="30" y1="85" x2="270" y2="85" class="courbe-ligne"/><circle cx="30" cy="85" r="5" class="echelle-point"/><path d="M258,77 L270,85 L258,93" class="chaine-fleche"/>';
    else if (img.forme === 'cercle') s += '<circle cx="150" cy="80" r="58" class="courbe-ligne"/><circle cx="208" cy="80" r="5" class="echelle-point"/><path d="M200,62 L208,74 L216,62" class="chaine-fleche"/>';
    else s += '<path d="M30,140 Q150,-30 270,140" class="courbe-ligne"/><circle cx="30" cy="140" r="5" class="echelle-point"/><path d="M255,130 L270,140 L268,122" class="chaine-fleche"/>';
    return s + '<text x="150" y="162" class="dessin-legende">' + (img.legende || '') + '</text></svg>';
  }

  function chronophoto(img) {
    const max = Math.max(...img.positions, 1);
    const X = (p) => 20 + (p / max) * 260;
    let s = ouvrir(300, 104, img.description) + '<line x1="20" y1="40" x2="285" y2="40" class="echelle-axe"/>';
    img.positions.forEach((p, i) => {
      s += '<circle cx="' + X(p).toFixed(1) + '" cy="40" r="6" class="echelle-point"/><text x="' + X(p).toFixed(1) + '" y="' + (i % 2 ? 12 : 24) + '" class="dessin-petit">' + i + ' s</text><text x="' + X(p).toFixed(1) + '" y="' + (i % 2 ? 72 : 60) + '" class="dessin-petit">' + String(p).replace('.', ',') + ' m</text>';
    });
    return s + '<text x="150" y="96" class="dessin-legende">' + (img.legende || '') + '</text></svg>';
  }

  function trainQuai(img) {
    let s = ouvrir(300, 150, img.description);
    s += '<rect x="20" y="24" width="190" height="70" rx="10" class="chaine-case"/><circle cx="60" cy="108" r="11" class="echelle-point"/><circle cx="170" cy="108" r="11" class="echelle-point"/>';
    s += '<circle cx="90" cy="50" r="7" class="echelle-point"/><line x1="90" y1="57" x2="90" y2="78" class="chaine-fleche"/><text x="90" y="90" class="dessin-petit">Rachel</text>';
    s += '<path d="M150,60 l40,0 m-8,-7 l8,7 l-8,7" class="chaine-fleche"/><text x="170" y="50" class="dessin-petit">le train</text>';
    s += '<line x1="4" y1="122" x2="296" y2="122" class="echelle-axe"/>';
    s += '<circle cx="262" cy="74" r="7" class="echelle-point"/><line x1="262" y1="81" x2="262" y2="110" class="chaine-fleche"/><text x="262" y="60" class="dessin-petit">Laure</text>';
    return s + '<text x="150" y="142" class="dessin-legende">Le quai ne bouge pas par rapport au sol</text></svg>';
  }

  function attraction(img) {
    let s = ouvrir(300, 120, img.description);
    s += '<circle cx="60" cy="56" r="30" class="force-objet"/><circle cx="240" cy="56" r="16" class="force-objet"/>';
    s += '<line x1="60" y1="56" x2="120" y2="56" class="force-trait"/><path d="M112,50 L120,56 L112,62" class="force-trait"/>';
    s += '<line x1="240" y1="56" x2="180" y2="56" class="force-trait"/><path d="M188,50 L180,56 L188,62" class="force-trait"/>';
    return s + '<text x="60" y="108" class="dessin-legende">' + (img.gauche || '') + '</text><text x="240" y="108" class="dessin-legende">' + (img.droite || '') + '</text></svg>';
  }

  const fixe = (type, f) => ({
    type,
    dessin: f,
    phrases: () => ({}),
    phrasesDites: () => [],
    monter(conteneur, reglages, dire, fini) { conteneur.innerHTML = f(reglages); fini(); },
  });

  return [fixe('trajectoire', trajectoire), fixe('chronophoto', chronophoto), fixe('train-quai', trainQuai), fixe('attraction', attraction)];
});
