/* Manipulation « carrelage des carrés » (SPEC.md, section 5 ; fiche dans js/manipulations/FICHES.md).
   Elle pose ses carreaux en rangées et en colonnes, et cherche à former un carré avec tous les carreaux donnés.
   Au doigt : toucher le bord droit ajoute une colonne, le bord du bas ajoute une rangée.
   Au lecteur d'écran : boutons « une rangée de plus », « une colonne de plus »… ; la forme et le nombre de carreaux sont annoncés. */
(function (racine, fabrique) {
  const C = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = C;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(C);
})(this, function () {
  'use strict';

  const COTE_MAX = 12;

  // ---------- Calculs ----------

  /** Ce que donne le carrelage : 'carre' (tous les carreaux, en carré), 'compte' (pas le bon nombre), 'forme' (bon nombre, pas un carré). */
  function juger(rangees, colonnes, carreaux) {
    if (rangees * colonnes !== carreaux) return 'compte';
    return rangees === colonnes ? 'carre' : 'forme';
  }

  const borner = (n) => Math.max(1, Math.min(COTE_MAX, n));

  // ---------- Dessin ----------

  function svg(rangees, colonnes, description) {
    const c = 22;
    const L = colonnes * c, H = rangees * c;
    let s = '<svg class="carrelage" viewBox="-4 -4 ' + (L + 8) + ' ' + (H + 8) + '" role="img" aria-label="' + String(description || '').replace(/"/g, '&quot;') + '">';
    for (let r = 0; r < rangees; r++) for (let k = 0; k < colonnes; k++) {
      s += '<rect x="' + (k * c) + '" y="' + (r * c) + '" width="' + c + '" height="' + c + '" class="carreau' + ((r + k) % 2 ? ' sombre' : '') + '"/>';
    }
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'carrelage', cote } ou { dessin: 'carrelage', rangees, colonnes, description }. */
  const dessin = (img) => svg(img.rangees || img.cote, img.colonnes || img.cote, img.description);

  function phrases() {
    return {
      carre: 'Bravo, un carré parfait ! Autant de rangées que de colonnes, et tous les carreaux sont posés.',
      compte: 'Il faut poser tous les carreaux, ni plus ni moins. Le compte est écrit à l’écran.',
      forme: 'Tous les carreaux sont posés, mais ce n’est pas un carré : il faut autant de rangées que de colonnes.',
    };
  }

  const decrire = (r, k, n) => r + (r > 1 ? ' rangées' : ' rangée') + ' de ' + k + (k > 1 ? ' carreaux' : ' carreau') + ' : ' + (r * k) + ' carreaux posés sur ' + n + '.';

  // ---------- La manipulation dans la page ----------

  /** reglages : { carreaux, rangees, colonnes } (rangées et colonnes de départ, 1 par défaut). */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    let r = reglages.rangees || 1, k = reglages.colonnes || 1;
    let termine = false;
    conteneur.innerHTML = '<div class="carrelage-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons carrelage-boutons"></div>';
    const cadre = conteneur.querySelector('.carrelage-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const boutons = conteneur.querySelector('.carrelage-boutons');

    function dessiner() {
      cadre.innerHTML = svg(r, k, decrire(r, k, reglages.carreaux));
      etat.textContent = decrire(r, k, reglages.carreaux);
    }
    function changer(dr, dk) {
      if (termine) return;
      r = borner(r + dr); k = borner(k + dk);
      dessiner();
    }
    function bouton(texte, action) {
      const b = doc.createElement('button');
      b.type = 'button';
      b.textContent = texte;
      b.addEventListener('click', action);
      boutons.appendChild(b);
    }
    bouton('Une rangée de plus', () => changer(1, 0));
    bouton('Une rangée de moins', () => changer(-1, 0));
    bouton('Une colonne de plus', () => changer(0, 1));
    bouton('Une colonne de moins', () => changer(0, -1));
    bouton('Est-ce un carré ?', () => {
      if (termine) return;
      const j = juger(r, k, reglages.carreaux);
      const P = phrases();
      etat.textContent = P[j] + ' ' + decrire(r, k, reglages.carreaux);
      dire(etat.textContent, P[j]);
      if (j === 'carre') {
        termine = true;
        boutons.querySelectorAll('button').forEach((b) => { b.disabled = true; });
        fini();
      }
    });
    // Au doigt : le tiers droit ajoute une colonne, le tiers du bas une rangée.
    cadre.addEventListener('click', (e) => {
      const s = cadre.querySelector('svg');
      if (!s) return;
      const b = s.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
      if (x > 0.66 && x >= y) changer(0, 1);
      else if (y > 0.66) changer(1, 0);
    });
    dessiner();
    return { etat: () => ({ rangees: r, colonnes: k, termine }) };
  }

  return { type: 'carrelage', COTE_MAX, juger, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
