/* Manipulation « la balance à plateaux » (bloc « Le calcul avec des lettres », équations ; ajoutée avec accord, le 2 novembre 2026).
   Sur chaque plateau : des boîtes mystère, toutes pareilles, et des kilos. La balance est en équilibre.
   On enlève la même chose des deux côtés, puis on partage : la balance reste en équilibre, jusqu'à lire ce que pèse une boîte.
   Au doigt comme au lecteur d'écran : des boutons ; l'état des deux plateaux est annoncé à chaque geste. Tout est calculé en code. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  // ---------- Calculs ----------

  /** L'état de départ : g et d sont les plateaux, { boites, kilos }. */
  const creer = (r) => ({ g: { boites: r.boites, kilos: r.kilos || 0 }, d: { boites: r.boitesDroite || 0, kilos: r.droite } });

  /** Enlève une boîte de chaque plateau ; false si un plateau n'en a pas. */
  function enleverBoite(e) {
    if (e.g.boites < 1 || e.d.boites < 1) return false;
    e.g.boites--; e.d.boites--;
    return true;
  }
  /** Enlève un kilo de chaque plateau ; false si un plateau n'en a pas. */
  function enleverKilo(e) {
    if (e.g.kilos < 1 || e.d.kilos < 1) return false;
    e.g.kilos--; e.d.kilos--;
    return true;
  }
  /** Partage en parts égales, quand il ne reste que des boîtes d'un côté et des kilos de l'autre ; false sinon. */
  function partager(e) {
    const p = e.g.kilos === 0 && e.d.boites === 0 ? [e.g, e.d] : e.g.boites === 0 && e.d.kilos === 0 ? [e.d, e.g] : null;
    if (!p || p[0].boites < 2 || p[1].kilos % p[0].boites !== 0) return false;
    p[1].kilos /= p[0].boites;
    p[0].boites = 1;
    return true;
  }
  /** Le poids d'une boîte, quand il reste une boîte seule face à des kilos ; sinon null. */
  function resolu(e) {
    if (e.g.boites === 1 && e.g.kilos === 0 && e.d.boites === 0) return e.d.kilos;
    if (e.d.boites === 1 && e.d.kilos === 0 && e.g.boites === 0) return e.g.kilos;
    return null;
  }
  const plateauEcrit = (p) => {
    const b = p.boites + (p.boites > 1 ? ' boîtes' : ' boîte'), k = p.kilos + (p.kilos > 1 ? ' kilos' : ' kilo');
    if (p.boites && p.kilos) return b + ' et ' + k;
    return p.boites ? b : k;
  };
  const etatEcrit = (e) => 'À gauche : ' + plateauEcrit(e.g) + '. À droite : ' + plateauEcrit(e.d) + '.';

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');

  function plateau(p, x0, unite) {
    let s = '<line x1="' + x0 + '" y1="100" x2="' + (x0 + 120) + '" y2="100" class="plateau-ligne"/>';
    let x = x0 + 2;
    const large = p.kilos ? 50 : 0, pas = Math.min(24, Math.floor((116 - large) / Math.max(1, p.boites))); // tout tient sur le plateau
    for (let k = 0; k < p.boites; k++, x += pas) s += '<rect x="' + x + '" y="74" width="' + (pas - 2) + '" height="24" class="plateau-boite"/><text x="' + (x + (pas - 2) / 2) + '" y="91" class="plateau-texte">x</text>';
    if (p.kilos) s += '<rect x="' + x + '" y="74" width="' + large + '" height="24" rx="4" class="plateau-kilos"/><text x="' + (x + large / 2) + '" y="91" class="plateau-texte">' + p.kilos + ' ' + unite + '</text>';
    return s;
  }
  function svg(e, description, unite = 'kg') {
    return '<svg class="plateaux" viewBox="0 0 300 150" role="img" aria-label="' + aria(description) + '">' +
      '<line x1="150" y1="40" x2="150" y2="140" class="plateau-pied"/><line x1="70" y1="40" x2="230" y2="40" class="plateau-pied"/>' +
      '<line x1="70" y1="40" x2="70" y2="100" class="plateau-ligne"/><line x1="230" y1="40" x2="230" y2="100" class="plateau-ligne"/>' +
      plateau(e.g, 10, unite) + plateau(e.d, 170, unite) + '<text x="150" y="30" class="plateau-texte">En équilibre</text></svg>';
  }
  /** Le dessin fixe d'une image { dessin: 'plateaux', boites, kilos, droite, boitesDroite, unite, description } ; unite : kg si rien n'est dit. */
  const dessin = (img) => svg(creer(img), img.description, img.unite);

  function phrases() {
    return {
      juste: 'Bravo ! Une boîte seule d’un côté, des kilos de l’autre : tu sais ce que pèse la boîte.',
      impossible: 'Pas possible : il faut pouvoir faire la même chose sur les deux plateaux.',
      partage: 'Pour partager, il faut seulement des boîtes d’un côté, et seulement des kilos de l’autre.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { boites, kilos, droite, boitesDroite } : boites × x + kilos = boitesDroite × x + droite. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const e = creer(reglages);
    let termine = false;
    conteneur.innerHTML = '<div class="plateaux-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons plateaux-boutons"></div>';
    const cadre = conteneur.querySelector('.plateaux-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.plateaux-boutons');

    function dessiner(annonce) {
      cadre.innerHTML = svg(e, etatEcrit(e));
      etat.textContent = (annonce ? annonce + ' ' : '') + etatEcrit(e);
      const v = resolu(e);
      if (v !== null && !termine) {
        termine = true;
        zone.querySelectorAll('button').forEach((x) => { x.disabled = true; });
        etat.textContent = phrases().juste + ' ' + etatEcrit(e) + ' Une boîte pèse ' + v + (v > 1 ? ' kilos.' : ' kilo.');
        dire(etat.textContent, phrases().juste);
        fini();
      }
    }
    function bouton(texte, action, refus) {
      const x = doc.createElement('button');
      x.type = 'button';
      x.textContent = texte;
      x.addEventListener('click', () => {
        if (termine) return;
        if (action(e)) dessiner();
        else { dessiner(refus); dire(refus, refus); }
      });
      zone.appendChild(x);
    }
    bouton('Enlever un kilo de chaque côté', enleverKilo, phrases().impossible);
    bouton('Enlever une boîte de chaque côté', enleverBoite, phrases().impossible);
    bouton('Partager en parts égales', partager, phrases().partage);
    dessiner();
    return { etat: () => ({ e, termine }) };
  }

  return { type: 'plateaux', creer, enleverBoite, enleverKilo, partager, resolu, etatEcrit, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
