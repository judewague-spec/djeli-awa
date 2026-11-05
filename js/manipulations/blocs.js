/* Manipulation « blocs de programmation » (SPEC.md, section 5 ; bloc « Données, probabilités, programmation »).
   On assemble un petit programme de blocs, comme dans Scratch, pour conduire un lutin sur une grille. Le programme est vraiment exécuté par le code.
   Au doigt comme au lecteur d'écran : des boutons pour ajouter ou retirer un bloc ; le programme et le résultat sont annoncés.
   Blocs, écrits comme dans Scratch : 'avancer' (ajouter 1 à x), 'monter' (ajouter 1 à y), 'repeter3 avancer', 'repeter3 monter', 'si bord alors monter'. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const ECRITS = { avancer: 'ajouter 1 à x', monter: 'ajouter 1 à y', 'repeter3 avancer': 'répéter 3 fois : ajouter 1 à x', 'repeter3 monter': 'répéter 3 fois : ajouter 1 à y', 'si bord alors monter': 'si touche le bord droit, alors : ajouter 1 à y' };

  /** Exécute le programme sur une grille cote × cote, depuis (0 ; 0). Le lutin s'arrête au bord. Rend sa place. */
  function executer(programme, cote) {
    let x = 0, y = 0;
    const avance = () => { if (x < cote - 1) x += 1; };
    const monte = () => { if (y < cote - 1) y += 1; };
    for (const b of programme) {
      if (b === 'avancer') avance();
      else if (b === 'monter') monte();
      else if (b === 'repeter3 avancer') { avance(); avance(); avance(); }
      else if (b === 'repeter3 monter') { monte(); monte(); monte(); }
      else if (b === 'si bord alors monter') { if (x === cote - 1) monte(); }
    }
    return [x, y];
  }

  const ecrit = (programme) => (programme.length ? programme.map((b, i) => (i + 1) + ', ' + ECRITS[b]).join(' ; ') : 'vide');

  function svg(place, cible, cote, description) {
    const c = 36, L = cote * c + 8;
    let s = '<svg class="dessin-code" viewBox="0 0 ' + L + ' ' + L + '" role="img" aria-label="' + aria(description) + '">';
    for (let i = 0; i < cote; i++) for (let j = 0; j < cote; j++) s += '<rect x="' + (4 + i * c) + '" y="' + (4 + j * c) + '" width="' + c + '" height="' + c + '" class="tableur-case"/>';
    const centre = (p) => [4 + p[0] * c + c / 2, 4 + (cote - 1 - p[1]) * c + c / 2];
    const [cx, cy] = centre(cible), [lx, ly] = centre(place);
    s += '<text x="' + cx + '" y="' + (cy + 5) + '" class="dessin-legende">X</text><circle cx="' + lx + '" cy="' + ly + '" r="10" class="echelle-point"/>';
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'blocs', place, cible, cote, description }. */
  const dessin = (img) => svg(img.place || [0, 0], img.cible || [0, 0], img.cote || 4, img.description);

  function phrases() {
    return {
      juste: 'Bravo ! Ton programme conduit le lutin exactement sur la croix.',
      pasEncore: 'Pas encore. Lis où le lutin est arrivé, et change ton programme.',
    };
  }

  /** reglages : { cote, cible: [x, y], blocs: la liste des blocs proposés, maxBlocs } ; un programme court est exigé si maxBlocs est donné. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const cote = reglages.cote || 4;
    const { cible, blocs, maxBlocs } = reglages;
    let programme = [], termine = false;
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    function afficher(mot) {
      const place = executer(programme, cote);
      const t = 'Programme : ' + ecrit(programme) + '. Le lutin arrive en ' + place[0] + ' ; ' + place[1] + '. La croix est en ' + cible[0] + ' ; ' + cible[1] + '.' + (maxBlocs ? ' ' + maxBlocs + ' blocs au plus.' : '');
      cadre.innerHTML = svg(place, cible, cote, t);
      etat.textContent = (mot ? mot + ' ' : '') + t;
    }
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
    };
    for (const b of blocs) bouton('Ajouter le bloc : ' + ECRITS[b], () => { programme = programme.concat([b]); afficher(); });
    bouton('Retirer le dernier bloc', () => { programme = programme.slice(0, -1); afficher(); });
    bouton('Lancer le programme', () => {
      const p = executer(programme, cote);
      const ok = p[0] === cible[0] && p[1] === cible[1] && (!maxBlocs || programme.length <= maxBlocs);
      if (!ok) { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
      termine = true;
      zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    afficher();
    return { etat: () => ({ programme: programme.slice(), termine }) };
  }

  return { type: 'blocs', ECRITS, executer, ecrit, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
