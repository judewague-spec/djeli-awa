/* Manipulation « la boîte mystère » (bloc « Le calcul avec des lettres » ; ajoutée avec accord, le 2 novembre 2026).
   On change le nombre caché dans la boîte : le code recalcule tout de suite l'expression, a × boîte + b.
   But : trouver le nombre qui donne le résultat demandé.
   Au doigt : toucher la boîte ajoute un ; au lecteur d'écran : boutons « un de plus », « un de moins », et chaque état est annoncé.
   Tout le calcul est fait en code. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const MIN = 0, MAX = 20;

  // ---------- Calculs ----------

  /** La valeur de a × n + b. */
  const valeur = (a, b, n) => a * n + b;
  /** Le calcul écrit : « 2 × 5 + 3 = 13 ». */
  const ecriture = (a, b, n) => a + ' × ' + n + ' + ' + b + ' = ' + valeur(a, b, n);
  const borner = (n) => Math.max(MIN, Math.min(MAX, n));

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');

  /** Une boîte ; fermée, elle porte un point d'interrogation ; ouverte, le nombre qu'elle contient. */
  function svg(contenu, description) {
    return '<svg class="boite-mystere" viewBox="0 0 160 120" role="img" aria-label="' + aria(description) + '">' +
      '<rect x="30" y="35" width="100" height="75" rx="6" class="boite-corps"/><path d="M22,35 L138,35 L130,15 L30,15 Z" class="boite-couvercle"/>' +
      '<text x="80" y="88" class="boite-texte">' + (contenu === null || contenu === undefined ? '?' : contenu) + '</text></svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'boite-mystere', contenu, description }. */
  const dessin = (img) => svg(img.contenu, img.description);

  function phrases() {
    return {
      juste: 'Bravo ! Avec ce nombre dans la boîte, le calcul donne le bon résultat.',
      pasEncore: 'Pas encore. Change le nombre dans la boîte, et regarde le résultat changer.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { a, b, cible } ; il faut trouver n tel que a × n + b = cible. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const { a, b, cible } = reglages;
    let n = 0, termine = false;
    conteneur.innerHTML = '<div class="boite-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons boite-boutons"></div>';
    const cadre = conteneur.querySelector('.boite-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boite-boutons');

    function dessiner() {
      cadre.innerHTML = svg(n, 'La boîte contient ' + n + '.');
      etat.textContent = 'La boîte contient ' + n + '. ' + ecriture(a, b, n) + '. Résultat à trouver : ' + cible + '.';
    }
    function changer(v) {
      if (termine) return;
      const hors = borner(v) !== v;
      n = borner(v);
      dessiner();
      if (hors) etat.textContent = (v < MIN ? 'La boîte ne peut pas descendre plus bas. ' : 'La boîte ne peut pas monter plus haut. ') + etat.textContent;
    }
    function bouton(texte, action) {
      const x = doc.createElement('button');
      x.type = 'button';
      x.textContent = texte;
      x.addEventListener('click', action);
      zone.appendChild(x);
      return x;
    }
    cadre.addEventListener('click', () => changer(n + 1));
    bouton('Un de plus dans la boîte', () => changer(n + 1));
    bouton('Un de moins dans la boîte', () => changer(n - 1));
    bouton('Valider', () => {
      if (termine) return;
      if (valeur(a, b, n) === cible) {
        termine = true;
        zone.querySelectorAll('button').forEach((x) => { x.disabled = true; });
        etat.textContent = phrases().juste + ' ' + ecriture(a, b, n) + '.';
        dire(etat.textContent, phrases().juste);
        fini();
      } else {
        etat.textContent = phrases().pasEncore + ' Là : ' + ecriture(a, b, n) + '.';
        dire(etat.textContent, phrases().pasEncore);
      }
    });
    dessiner();
    return { etat: () => ({ n, termine }) };
  }

  return { type: 'boite-mystere', valeur, ecriture, borner, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
