/* Manipulation « gâteau des fractions » (SPEC.md, section 5 ; fiche dans js/manipulations/FICHES.md).
   Deux gâteaux rectangulaires, coupés en parts différentes, avec des parts prises. Elle recoupe chaque part en morceaux égaux
   (le haut et le bas sont multipliés par le même nombre : la fraction ne change pas), jusqu'à ce que les deux gâteaux
   aient des parts de même taille. On peut alors comparer, ou ajouter, en comptant les parts.
   Au doigt : toucher un gâteau le recoupe. Au lecteur d'écran : boutons « plus de parts », « moins de parts » ; chaque état est annoncé. */
(function (racine, fabrique) {
  const G = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = G;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(G);
})(this, function () {
  'use strict';

  const PARTS_MAX = 24;

  // ---------- Calculs ----------

  /** Un gâteau recoupé : chaque part en k morceaux. */
  const recoupe = (g, k) => ({ nom: g.nom, parts: g.parts * k, prises: g.prises * k });

  /** Vrai si tous les gâteaux ont le même nombre de parts (des parts de même taille). */
  const memesParts = (gateaux) => gateaux.every((g) => g.parts === gateaux[0].parts);

  /** Le plus grand multiplicateur permis pour un gâteau. */
  const kMax = (g) => Math.max(1, Math.floor(PARTS_MAX / g.parts));

  // ---------- Dessin ----------

  let compteur = 0;

  /** Un ou plusieurs gâteaux en SVG : parts prises hachurées (la couleur n'est pas le seul indice). */
  function svg(gateaux, description) {
    const id = 'hachures-' + (++compteur);
    const H = 70, L = 260, ecart = 34;
    const hauteur = gateaux.length * (H + ecart);
    let s = '<svg class="gateau" viewBox="0 0 280 ' + hauteur + '" role="img" aria-label="' + String(description || '').replace(/"/g, '&quot;') + '">';
    s += '<defs><pattern id="' + id + '" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" class="gateau-prise-fond"/><line x1="0" y1="0" x2="0" y2="8" class="gateau-hachure"/></pattern></defs>';
    gateaux.forEach((g, i) => {
      const y = i * (H + ecart) + 24;
      if (g.nom) s += '<text x="10" y="' + (y - 7) + '" class="gateau-nom">' + g.nom + '</text>';
      const l = L / g.parts;
      for (let p = 0; p < g.parts; p++) {
        s += '<rect x="' + (10 + p * l).toFixed(2) + '" y="' + y + '" width="' + l.toFixed(2) + '" height="' + H + '" class="gateau-part"' +
          (p < g.prises ? ' style="fill: url(#' + id + ')"' : '') + '/>'; // style : la feuille de style ne doit pas cacher les hachures
      }
    });
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'gateau', parts, prises, description } ou { dessin: 'gateau', gateaux: [...], description }. */
  const dessin = (img) => svg(img.gateaux || [{ parts: img.parts, prises: img.prises }], img.description);

  function phrases() {
    return {
      pasPareil: 'Les parts ne sont pas encore de la même taille : recoupe encore un des gâteaux.',
      pareil: 'Bravo ! Les parts ont maintenant la même taille : on peut comparer en comptant les parts prises.',
    };
  }

  const decrire = (g) => 'Gâteau de ' + g.nom + ' : ' + g.parts + ' parts, dont ' + g.prises + ' prises, soit ' + g.prises + '/' + g.parts + '.';

  // ---------- La manipulation dans la page ----------

  /** reglages : { gateaux: [{ nom, parts, prises }, …] } (deux gâteaux). */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const k = reglages.gateaux.map(() => 1);
    let termine = false;
    const actuels = () => reglages.gateaux.map((g, i) => recoupe(g, k[i]));

    conteneur.innerHTML = '<div class="gateau-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="gateau-boutons"></div>';
    const cadre = conteneur.querySelector('.gateau-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.gateau-boutons');

    function dessiner(annonce) {
      const g = actuels();
      cadre.innerHTML = svg(g, g.map(decrire).join(' '));
      etat.textContent = annonce || g.map(decrire).join(' ');
    }
    function changer(i, d) {
      if (termine) return;
      const g = reglages.gateaux[i];
      const nk = Math.max(1, Math.min(kMax(g), k[i] + d));
      if (nk === k[i]) return;
      k[i] = nk;
      dessiner(decrire(recoupe(g, nk)));
    }
    function bouton(texte, action, parent) {
      const b = doc.createElement('button');
      b.type = 'button';
      b.textContent = texte;
      b.addEventListener('click', action);
      parent.appendChild(b);
      return b;
    }
    reglages.gateaux.forEach((g, i) => {
      const ligne = doc.createElement('div');
      ligne.className = 'boutons';
      ligne.setAttribute('role', 'group');
      ligne.setAttribute('aria-label', 'Gâteau de ' + g.nom);
      bouton('Gâteau de ' + g.nom + ' : plus de parts', () => changer(i, 1), ligne);
      bouton('Gâteau de ' + g.nom + ' : moins de parts', () => changer(i, -1), ligne);
      zone.appendChild(ligne);
    });
    const fin = doc.createElement('div');
    fin.className = 'boutons';
    zone.appendChild(fin);
    bouton('Comparer les gâteaux', () => {
      if (termine) return;
      const P = phrases();
      if (memesParts(actuels())) {
        termine = true;
        zone.querySelectorAll('button').forEach((b) => { b.disabled = true; });
        dessiner(P.pareil + ' ' + actuels().map(decrire).join(' '));
        dire(etat.textContent, P.pareil);
        fini();
      } else {
        dessiner(P.pasPareil + ' ' + actuels().map(decrire).join(' '));
        dire(etat.textContent, P.pasPareil);
      }
    }, fin);

    // Au doigt : toucher un gâteau le recoupe une fois de plus (et revient à une seule coupe après le maximum).
    cadre.addEventListener('click', (e) => {
      const s = cadre.querySelector('svg');
      if (!s || termine) return;
      const r = s.getBoundingClientRect();
      const i = Math.min(reglages.gateaux.length - 1, Math.floor(((e.clientY - r.top) / r.height) * reglages.gateaux.length));
      if (k[i] >= kMax(reglages.gateaux[i])) { k[i] = 1; dessiner(decrire(recoupe(reglages.gateaux[i], 1))); } else changer(i, 1);
    });
    dessiner();
    return { etat: () => ({ gateaux: actuels(), termine }) };
  }

  return { type: 'gateau', PARTS_MAX, recoupe, memesParts, kMax, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
