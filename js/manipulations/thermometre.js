/* Manipulation « thermomètre des relatifs » (SPEC.md, section 5 ; fiche dans js/manipulations/FICHES.md).
   Elle fait monter ou descendre le liquide au doigt, jusqu'à la température demandée.
   Alternative pour le lecteur d'écran : un curseur et les boutons « un degré de plus », « un degré de moins » ;
   la température est annoncée à chaque changement. La voix ne dit que des phrases fixes : la température est écrite.
   Elle suit le contrat commun des manipulations (js/manipulations/commun.js). */
(function (racine, fabrique) {
  const T = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = T;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(T);
})(this, function () {
  'use strict';

  // ---------- Calculs ----------

  const borner = (v, min, max) => Math.max(min, Math.min(max, Math.round(v)));

  /** La température en toutes lettres pour le lecteur d'écran : « 3 degrés au-dessous de zéro ». */
  function enMots(v) {
    if (v === 0) return 'zéro degré';
    const n = Math.abs(v);
    return n + (n === 1 ? ' degré' : ' degrés') + (v < 0 ? ' au-dessous de zéro' : ' au-dessus de zéro');
  }

  /** La température écrite avec son signe : « −3 °C », « +5 °C », « 0 °C ». */
  function ecrite(v) {
    return (v < 0 ? '−' + Math.abs(v) : v > 0 ? '+' + v : '0') + ' °C';
  }

  // ---------- Dessin ----------

  const PAS = 9; // hauteur d'un degré dans le dessin
  const HAUT = 14; // marge du haut

  const yDe = (v, max) => HAUT + (max - v) * PAS;

  /** Le dessin SVG (texte) d'un thermomètre gradué de min à max, rempli jusqu'à valeur ; depart marqué d'une flèche. */
  function svg(min, max, valeur, depart, description) {
    const bas = yDe(min, max);
    const hauteur = bas + 40;
    let s = '<svg class="thermometre" viewBox="0 0 130 ' + hauteur + '" role="img" aria-label="' + String(description || '').replace(/"/g, '&quot;') + '">';
    s += '<rect x="44" y="' + (HAUT - 8) + '" width="22" height="' + (bas - HAUT + 16) + '" rx="11" class="thermo-tube"/>';
    s += '<circle cx="55" cy="' + (bas + 18) + '" r="17" class="thermo-boule"/>';
    s += '<rect x="49" y="' + yDe(valeur, max) + '" width="12" height="' + (bas - yDe(valeur, max) + 14) + '" class="thermo-liquide"/>';
    for (let v = min; v <= max; v++) {
      const y = yDe(v, max);
      const grand = v % 5 === 0;
      s += '<line x1="' + (grand ? 66 : 66) + '" x2="' + (grand ? 80 : 73) + '" y1="' + y + '" y2="' + y + '" class="thermo-trait' + (v === 0 ? ' zero' : '') + '"/>';
      if (grand) s += '<text x="84" y="' + (y + 4) + '" class="thermo-nombre' + (v === 0 ? ' zero' : '') + '">' + (v < 0 ? '−' + -v : v) + '</text>';
    }
    if (depart !== undefined && depart !== null) {
      const y = yDe(depart, max);
      s += '<path d="M8,' + (y - 6) + ' L22,' + y + ' L8,' + (y + 6) + ' Z" class="thermo-depart"/><text x="2" y="' + (y - 9) + '" class="thermo-legende">départ</text>';
    }
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'thermometre', min, max, valeur, depart, description }. */
  const dessin = (img) => svg(img.min, img.max, img.valeur, img.depart, img.description);

  /** Phrases fixes que la voix peut dire pendant la manipulation (sans nombre variable). */
  function phrases() {
    return {
      juste: 'Bravo ! Le thermomètre montre la bonne température.',
      pasEncore: 'Pas encore. Compte les degrés un par un depuis la flèche du départ, en passant par zéro s’il le faut.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { min, max, depart, cible }. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const { min, max, depart, cible } = reglages;
    let valeur = depart;
    let termine = false;

    conteneur.innerHTML = '<div class="thermo-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons thermo-boutons"></div>';
    const cadre = conteneur.querySelector('.thermo-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const boutons = conteneur.querySelector('.thermo-boutons');

    const curseur = doc.createElement('input');
    curseur.type = 'range';
    curseur.min = min; curseur.max = max; curseur.step = 1; curseur.value = valeur;
    curseur.className = 'thermo-curseur';
    curseur.setAttribute('aria-label', 'Température du thermomètre');

    function dessiner() {
      cadre.innerHTML = svg(min, max, valeur, depart, 'Thermomètre : ' + enMots(valeur) + '.');
      curseur.value = valeur;
      curseur.setAttribute('aria-valuetext', enMots(valeur));
      etat.textContent = 'Le thermomètre montre ' + ecrite(valeur) + ' : ' + enMots(valeur) + '.';
    }

    function changer(v) {
      if (termine) return;
      valeur = borner(v, min, max);
      dessiner();
    }

    // Au doigt : toucher ou faire glisser le long du tube.
    let appuye = false;
    const depuisPointeur = (e) => {
      const s = cadre.querySelector('svg');
      const r = s.getBoundingClientRect();
      const hauteur = Number(s.getAttribute('viewBox').split(' ')[3]);
      const y = ((e.clientY - r.top) / r.height) * hauteur;
      changer(max - (y - HAUT) / PAS);
    };
    cadre.addEventListener('pointerdown', (e) => { appuye = true; depuisPointeur(e); });
    cadre.addEventListener('pointermove', (e) => { if (appuye) depuisPointeur(e); });
    doc.addEventListener('pointerup', () => { appuye = false; });
    curseur.addEventListener('input', () => changer(Number(curseur.value)));

    function bouton(texte, action) {
      const b = doc.createElement('button');
      b.type = 'button';
      b.textContent = texte;
      b.addEventListener('click', action);
      boutons.appendChild(b);
      return b;
    }
    bouton('Un degré de plus', () => changer(valeur + 1));
    bouton('Un degré de moins', () => changer(valeur - 1));
    bouton('Revenir au départ', () => changer(depart));
    bouton('Valider la température', () => {
      if (termine) return;
      if (valeur === cible) {
        termine = true;
        boutons.querySelectorAll('button').forEach((b) => { b.disabled = true; });
        curseur.disabled = true;
        etat.textContent = phrases().juste + ' ' + ecrite(valeur) + '.';
        dire(etat.textContent, phrases().juste);
        fini();
      } else {
        etat.textContent = phrases().pasEncore + ' Là, il montre ' + ecrite(valeur) + '.';
        dire(etat.textContent, phrases().pasEncore);
      }
    });
    cadre.insertAdjacentElement('afterend', curseur);
    dessiner();
    return { etat: () => ({ valeur, termine }) };
  }

  return { type: 'thermometre', enMots, ecrite, borner, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
