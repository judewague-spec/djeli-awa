/* Manipulation « mélange à doser » (SPEC.md, section 5 : liste des manipulations à l'écran).
   Elle verse du sel, cuillère après cuillère, dans un verre d'eau. Tant que l'eau peut le dissoudre, le sel disparaît
   et le mélange reste homogène ; au-delà, le sel reste au fond : l'eau est saturée.
   Au doigt : toucher le verre ajoute une cuillère. Au lecteur d'écran : boutons ; la masse versée et l'aspect sont annoncés.
   Le calcul suit la solubilité donnée (en grammes pour le volume d'eau du verre) : rien n'est inventé par une IA. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  // ---------- Calculs ----------

  /** Ce que l'on voit : masse dissoute et masse au fond, pour une masse versée et une masse maximale dissoute. */
  function etat(verse, maximum) {
    const dissous = Math.min(verse, maximum);
    return { dissous, fond: verse - dissous, sature: verse > maximum };
  }

  // ---------- Dessin ----------

  /** Un verre d'eau ; le sel au fond est dessiné en grains et nommé dans la description. */
  function svg(fond, description) {
    let s = '<svg class="melange" viewBox="0 0 160 170" role="img" aria-label="' + String(description || '').replace(/"/g, '&quot;') + '">';
    s += '<path d="M30,10 L40,160 L120,160 L130,10" class="verre"/>';
    s += '<path d="M33,45 L40,158 L120,158 L127,45 Z" class="eau"/>';
    const grains = Math.min(40, Math.ceil(fond));
    for (let k = 0; k < grains; k++) {
      const x = 48 + ((k * 37) % 64), y = 152 - Math.floor(k / 8) * 5;
      s += '<rect x="' + x + '" y="' + y + '" width="4" height="4" class="grain"/>';
    }
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'melange', fond, description }. */
  const dessin = (img) => svg(img.fond || 0, img.description);

  function phrases() {
    return {
      dissous: 'Tout se dissout : on ne voit plus le sel. Le mélange reste homogène.',
      sature: 'Le sel ne se dissout plus : il reste au fond du verre. L’eau est saturée.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { cuillere (g), maximum (g), eau (mL), solute: 'sel' }. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    let verse = 0;
    let termine = false;
    conteneur.innerHTML = '<div class="melange-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons melange-boutons"></div>';
    const cadre = conteneur.querySelector('.melange-cadre');
    const zone = conteneur.querySelector('.manip-etat');
    const boutons = conteneur.querySelector('.melange-boutons');
    const decrire = (e) => verse + ' g de ' + reglages.solute + ' versés dans ' + reglages.eau + ' mL d’eau. ' +
      (e.sature ? 'Environ ' + e.fond + ' g restent au fond.' : verse ? 'Tout est dissous.' : 'Rien n’est encore versé.');

    function dessiner(e) { cadre.innerHTML = svg(e.fond, decrire(e)); }
    function ajouter() {
      if (termine) return;
      verse += reglages.cuillere;
      const e = etat(verse, reglages.maximum);
      dessiner(e);
      const P = phrases();
      zone.textContent = (e.sature ? P.sature : P.dissous) + ' ' + decrire(e);
      dire(zone.textContent, e.sature ? P.sature : P.dissous);
      if (e.sature) {
        termine = true;
        boutons.querySelector('button').disabled = true;
        fini();
      }
    }
    const b = doc.createElement('button');
    b.type = 'button';
    b.textContent = 'Verser une cuillère de ' + reglages.solute + ' et remuer';
    b.addEventListener('click', ajouter);
    boutons.appendChild(b);
    cadre.addEventListener('click', ajouter);
    dessiner(etat(0, reglages.maximum));
    zone.textContent = decrire(etat(0, reglages.maximum));
    return { etat: () => ({ verse, termine }) };
  }

  return { type: 'melange', etat, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
