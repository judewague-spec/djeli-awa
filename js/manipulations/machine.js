/* Manipulation « machine à nombres » (bloc « Proportionnalité, pourcentages et fonctions », notion 11 ; accord du 2 nov. 2026).
   On met un nombre à l'entrée : la machine calcule la sortie. Il faut trouver l'entrée qui donne la sortie demandée.
   Le calcul est fait en code : rien n'est inventé par une IA. Au doigt comme au lecteur d'écran : des boutons ; chaque état est annoncé. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  // ---------- Calculs ----------

  /** La machine ajoute b après avoir multiplié par a. */
  const sortie = (a, b, x) => a * x + b;
  const regleEcrite = (a, b) => 'multiplier par ' + a + (b ? ', puis ajouter ' + b : '');

  function etatEcrit(a, b, x, cible) {
    const s = sortie(a, b, x);
    return 'À l’entrée : ' + x + '. La machine sort : ' + s + '. Il faut obtenir : ' + cible + '.';
  }

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');

  /** Le dessin : l'entrée, la boîte de la machine, la sortie. */
  function svg(entree, regle, sort, description) {
    const cadre = (x, w, t, sous) => '<rect x="' + x + '" y="26" width="' + w + '" height="50" rx="8" class="chaine-case"/><text x="' + (x + w / 2) + '" y="56" class="dessin-legende">' + t + '</text><text x="' + (x + w / 2) + '" y="18" class="dessin-petit">' + sous + '</text>';
    return '<svg class="dessin-code" viewBox="0 0 320 90" role="img" aria-label="' + aria(description) + '">' +
      cadre(6, 62, entree, 'Entrée') + '<path d="M70,51 l24,0 m-6,-6 l6,6 l-6,6" class="chaine-fleche"/>' +
      cadre(96, 128, regle, 'La machine') + '<path d="M226,51 l24,0 m-6,-6 l6,6 l-6,6" class="chaine-fleche"/>' +
      cadre(252, 62, sort, 'Sortie') + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'machine', entree, regle, sortie, description }. */
  const dessin = (img) => svg(String(img.entree), img.regle, String(img.sortie), img.description);

  function phrases() {
    return {
      juste: 'Bravo ! Tu as trouvé le nombre qui donne la bonne sortie.',
      pasEncore: 'Pas encore. Change le nombre d’entrée, et regarde ce qui sort.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { a, b, depart, cible } ; fini() quand l'entrée donne la cible et que c'est validé. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const { a, b, cible } = reglages;
    let x = reglages.depart || 0, termine = false;
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    function afficher(annonce) {
      const t = etatEcrit(a, b, x, cible);
      cadre.innerHTML = svg(String(x), regleEcrite(a, b).length > 22 ? '× ' + a + (b ? ' + ' + b : '') : regleEcrite(a, b), String(sortie(a, b, x)), t);
      etat.textContent = (annonce ? annonce + ' ' : '') + t;
    }
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
    };
    bouton('Un de moins à l’entrée', () => { x -= 1; afficher(); });
    bouton('Un de plus à l’entrée', () => { x += 1; afficher(); });
    bouton('Valider ce nombre', () => {
      if (sortie(a, b, x) !== cible) { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
      termine = true;
      zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    afficher();
    return { etat: () => ({ x, termine }) };
  }

  return { type: 'machine', sortie, regleEcrite, etatEcrit, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
