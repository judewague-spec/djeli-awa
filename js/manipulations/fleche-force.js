/* Manipulation « la flèche de force » (bloc « Mouvement et forces », notion 7 ; permise par la consigne du 2 novembre 2026).
   On représente une force par une flèche : on choisit le point de départ, la direction et le sens, puis la longueur d'après l'échelle.
   Au doigt comme au lecteur d'écran : des boutons ; l'état de la flèche est annoncé à chaque geste. Tout est calculé en code.
   Sert aussi de dessin fixe pour tous les schémas de forces du bloc. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  // ---------- Calculs ----------

  const SENS = { haut: [0, -1], bas: [0, 1], gauche: [-1, 0], droite: [1, 0] };
  const SENS_ECRITS = { haut: 'vers le haut', bas: 'vers le bas', gauche: 'vers la gauche', droite: 'vers la droite' };
  const POINTS_ECRITS = { centre: 'du centre de l’objet', gauche: 'du bord gauche de l’objet', droite: 'du bord droit de l’objet', haut: 'du haut de l’objet', bas: 'du bas de l’objet' };
  const nombre = (x) => String(Math.round(x * 100) / 100).replace('.', ',');

  /** La valeur en newtons d'une flèche de « longueur » carreaux, à l'échelle de « echelle » newtons par carreau. */
  const valeurDe = (longueur, echelle) => longueur * echelle;
  /** La longueur attendue, en carreaux. */
  const longueurPour = (valeur, echelle) => valeur / echelle;

  /** Ce qui ne va pas encore : 'point', 'sens', 'longueur', ou null si la flèche est juste. */
  function defaut(e, but) {
    if (e.point !== but.point) return 'point';
    if (e.sens !== but.sens) return 'sens';
    if (e.longueur !== longueurPour(but.valeur, but.echelle)) return 'longueur';
    return null;
  }

  function etatEcrit(e, echelle) {
    if (!e.sens) return 'La flèche part ' + POINTS_ECRITS[e.point] + '. Elle n’a pas encore de sens. Elle mesure ' + e.longueur + (e.longueur > 1 ? ' carreaux.' : ' carreau.');
    return 'La flèche part ' + POINTS_ECRITS[e.point] + ', ' + SENS_ECRITS[e.sens] + '. Elle mesure ' + e.longueur + (e.longueur > 1 ? ' carreaux' : ' carreau') + ', soit ' + nombre(valeurDe(e.longueur, echelle)) + ' newtons.';
  }

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const CARREAU = 26, LARGE = 300, HAUT = 240, CX = 150, CY = 120, DEMI = 30;

  const origine = (point) => ({
    centre: [CX, CY], gauche: [CX - DEMI, CY], droite: [CX + DEMI, CY], haut: [CX, CY - DEMI], bas: [CX, CY + DEMI],
  })[point] || [CX, CY];

  function fleche(f) {
    if (!f.sens || !f.longueur) return '';
    const [x0, y0] = origine(f.point), [dx, dy] = SENS[f.sens];
    const x1 = x0 + dx * f.longueur * CARREAU, y1 = y0 + dy * f.longueur * CARREAU;
    const p = 8, g = 5;
    const pointe = 'M' + (x1 - dx * p - dy * g) + ',' + (y1 - dy * p - dx * g) + ' L' + x1 + ',' + y1 + ' L' + (x1 - dx * p + dy * g) + ',' + (y1 - dy * p + dx * g);
    let s = '<circle cx="' + x0 + '" cy="' + y0 + '" r="4" class="force-point"/><line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y1 + '" class="force-trait"/><path d="' + pointe + '" class="force-trait"/>';
    if (f.nom) s += '<text x="' + (x1 + (dy ? 14 : 0)) + '" y="' + (y1 + (dx ? -8 : 4)) + '" class="dessin-legende">' + f.nom + '</text>';
    return s;
  }

  /** forces : [{ point, sens, longueur, nom }] ; echelle : le texte écrit sous le dessin. */
  function svg(objet, forces, echelle, description) {
    let s = '<svg class="dessin-code" viewBox="0 0 ' + LARGE + ' ' + HAUT + '" role="img" aria-label="' + aria(description) + '">';
    for (let x = CX % CARREAU; x < LARGE; x += CARREAU) s += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + (HAUT - 24) + '" class="force-grille"/>';
    for (let y = CY % CARREAU; y < HAUT - 24; y += CARREAU) s += '<line x1="0" y1="' + y + '" x2="' + LARGE + '" y2="' + y + '" class="force-grille"/>';
    s += '<rect x="' + (CX - DEMI) + '" y="' + (CY - DEMI) + '" width="' + 2 * DEMI + '" height="' + 2 * DEMI + '" rx="6" class="force-objet"/>';
    s += '<text x="' + CX + '" y="' + (forces.some((f) => f.sens === 'haut') ? CY + 20 : CY - 12) + '" class="dessin-petit">' + (objet || '') + '</text>';
    for (const f of forces) s += fleche(f);
    if (echelle) s += '<text x="' + CX + '" y="' + (HAUT - 8) + '" class="dessin-legende">' + echelle + '</text>';
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'fleche-force', objet, forces, echelle, description } ; echelle : un texte. */
  const dessin = (img) => svg(img.objet, img.forces || [], img.echelle, img.description);

  function phrases() {
    return {
      juste: 'Bravo ! Le point de départ, la direction, le sens et la longueur sont justes. Ta flèche dit tout de la force.',
      point: 'Regarde bien où la force s’applique : c’est de là que part la flèche.',
      sens: 'Le point de départ est bon. Regarde maintenant de quel côté va la force.',
      longueur: 'Le sens est bon. Sers-toi de l’échelle pour trouver la longueur.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { objet, points, but: { point, sens, valeur, echelle }, echelleEcrite, consigne }. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const but = reglages.but;
    const e = { point: reglages.points[0], sens: null, longueur: 1 };
    let termine = false;
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    function afficher(annonce) {
      const t = etatEcrit(e, but.echelle);
      cadre.innerHTML = svg(reglages.objet, [{ point: e.point, sens: e.sens, longueur: e.longueur }], reglages.echelleEcrite, t);
      etat.textContent = (annonce ? annonce + ' ' : '') + t;
    }
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
    };
    for (const p of reglages.points) bouton('Partir ' + POINTS_ECRITS[p], () => { e.point = p; afficher(); });
    for (const s of Object.keys(SENS)) bouton('Aller ' + SENS_ECRITS[s], () => { e.sens = s; afficher(); });
    bouton('Un carreau de moins', () => { if (e.longueur > 1) { e.longueur -= 1; afficher(); } else afficher('La flèche ne peut pas être plus courte.'); });
    bouton('Un carreau de plus', () => { if (e.longueur < 4) { e.longueur += 1; afficher(); } else afficher('La flèche ne peut pas être plus longue.'); });
    bouton('Valider ma flèche', () => {
      const d = defaut(e, but);
      if (d) { afficher(P[d]); dire(etat.textContent, P[d]); return; }
      termine = true;
      zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    afficher();
    return { etat: () => Object.assign({ termine }, e) };
  }

  return { type: 'fleche-force', valeurDe, longueurPour, defaut, etatEcrit, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
