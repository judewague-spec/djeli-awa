/* Manipulation « crible des nombres premiers » (SPEC.md, section 5 ; fiche dans js/manipulations/FICHES.md).
   Elle touche le plus petit nombre libre : il est gardé (premier), et tous ses multiples sont barrés.
   Quand il ne reste plus rien à barrer, tous les nombres libres sont premiers.
   Chaque case est un bouton qui dit son état (« barré », « gardé ») : le lecteur d'écran et le doigt font la même chose.
   Les calculs sont séparés de l'affichage pour être testés dans Node. */
(function (racine, fabrique) {
  const C = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = C;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(C);
})(this, function () {
  'use strict';

  // ---------- Calculs ----------

  /** État de départ : 1 est barré (il n'est pas premier), les autres sont libres. etat[n] pour n de 1 à jusqua. */
  function depart(jusqua) {
    const e = new Array(jusqua + 1).fill('libre');
    e[0] = null;
    e[1] = 'barre';
    return e;
  }

  /** Garde n et barre tous ses multiples (nouvel état). */
  function cribler(etat, n) {
    const e = etat.slice();
    e[n] = 'garde';
    for (let k = 2 * n; k < e.length; k += n) if (e[k] === 'libre') e[k] = 'barre';
    return e;
  }

  const plusPetitLibre = (etat) => { for (let n = 2; n < etat.length; n++) if (etat[n] === 'libre') return n; return null; };

  /** Fini quand le plus petit libre, au carré, dépasse le dernier nombre : les libres qui restent sont premiers. */
  function estFini(etat) {
    const p = plusPetitLibre(etat);
    return p === null || p * p >= etat.length;
  }

  /** Garde tous les nombres libres (à la fin du crible). */
  const garderLesLibres = (etat) => etat.map((x) => (x === 'libre' ? 'garde' : x));

  /** Le crible complet par les nombres donnés, pour un dessin fixe. */
  function etatApres(jusqua, par) {
    let e = depart(jusqua);
    for (const p of par || []) e = cribler(e, p);
    return e;
  }

  const premiers = (jusqua) => garderLesLibres(etatApres(jusqua, [2, 3, 5, 7, 11].filter((p) => p * p <= jusqua)))
    .map((x, n) => (x === 'garde' ? n : 0)).filter(Boolean);

  // ---------- Dessin fixe ----------

  /** Grille de 10 colonnes : barré = trait en travers, gardé = cercle épais (la couleur n'est pas le seul indice). */
  function svg(etat, description) {
    const jusqua = etat.length - 1;
    const lignes = Math.ceil(jusqua / 10);
    let s = '<svg class="crible-dessin" viewBox="0 0 300 ' + (lignes * 30) + '" role="img" aria-label="' + String(description || '').replace(/"/g, '&quot;') + '">';
    for (let n = 1; n <= jusqua; n++) {
      const x = ((n - 1) % 10) * 30 + 15, y = Math.floor((n - 1) / 10) * 30 + 15;
      if (etat[n] === 'garde') s += '<circle cx="' + x + '" cy="' + y + '" r="13" class="crible-garde"/>';
      s += '<text x="' + x + '" y="' + (y + 5) + '" class="crible-nombre' + (etat[n] === 'barre' ? ' barre' : '') + '">' + n + '</text>';
      if (etat[n] === 'barre') s += '<line x1="' + (x - 11) + '" y1="' + (y + 9) + '" x2="' + (x + 11) + '" y2="' + (y - 9) + '" class="crible-trait"/>';
    }
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'crible', jusqua, par: [2, 3…], description }. */
  const dessin = (img) => svg(img.fin ? garderLesLibres(etatApres(img.jusqua, img.par)) : etatApres(img.jusqua, img.par), img.description);

  /** Phrases fixes que la voix peut dire (sans nombre variable : le nombre touché est écrit). */
  function phrases() {
    return {
      garde: 'Je le garde : il est premier. Tous ses multiples sont barrés.',
      dejaBarre: 'Ce nombre est déjà barré : il a un diviseur plus petit que lui.',
      dejaGarde: 'Celui-là est déjà gardé.',
      plusPetit: 'Touche le plus petit nombre qui n’est ni barré ni gardé.',
      fini: 'Plus rien à barrer ! Tous les nombres qui restent sont premiers : ils n’ont que deux diviseurs, 1 et eux-mêmes.',
    };
  }

  // ---------- La manipulation dans la page ----------

  const nomCase = (n, x) => n + (x === 'barre' ? ', barré' : x === 'garde' ? ', gardé, premier' : '');

  /** reglages : { jusqua }. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    let etat = depart(reglages.jusqua);
    let termine = false;
    conteneur.innerHTML = '<p class="manip-etat" aria-live="polite"></p><div class="crible-grille" role="group" aria-label="Les nombres de 1 à ' + reglages.jusqua + '"></div>';
    const annonce = conteneur.querySelector('.manip-etat');
    const grille = conteneur.querySelector('.crible-grille');
    const cases = [];
    for (let n = 1; n <= reglages.jusqua; n++) {
      const b = doc.createElement('button');
      b.type = 'button';
      b.className = 'crible-case';
      b.textContent = n;
      b.addEventListener('click', () => toucher(n));
      grille.appendChild(b);
      cases[n] = b;
    }
    function maj() {
      for (let n = 1; n < etat.length; n++) {
        cases[n].className = 'crible-case ' + etat[n];
        cases[n].setAttribute('aria-label', nomCase(n, etat[n]));
      }
    }
    function toucher(n) {
      if (termine) return;
      const P = phrases();
      let affiche, parle;
      if (etat[n] === 'barre') { affiche = n === 1 ? '1 n’est pas premier : il n’a qu’un seul diviseur. ' + P.plusPetit : n + ' : ' + P.dejaBarre; parle = n === 1 ? P.plusPetit : P.dejaBarre; }
      else if (etat[n] === 'garde') { affiche = n + ' : ' + P.dejaGarde; parle = P.dejaGarde; }
      else if (n !== plusPetitLibre(etat)) { affiche = P.plusPetit + ' Ici, c’est ' + plusPetitLibre(etat) + '.'; parle = P.plusPetit; }
      else {
        etat = cribler(etat, n);
        affiche = n + ' est gardé : il est premier. Ses multiples sont barrés.';
        parle = P.garde;
        if (estFini(etat)) {
          etat = garderLesLibres(etat);
          termine = true;
          affiche += ' ' + P.fini;
          parle = [P.garde, P.fini];
        }
      }
      maj();
      annonce.textContent = affiche;
      dire(affiche, parle);
      if (termine) fini();
    }
    maj();
    return { etat: () => ({ etat: etat.slice(), termine }) };
  }

  return { type: 'crible', depart, cribler, plusPetitLibre, estFini, garderLesLibres, etatApres, premiers, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
