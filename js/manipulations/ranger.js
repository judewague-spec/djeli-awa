/* Manipulation « étapes à ranger » (SPEC.md, section 5 : les étapes d'une chaîne d'énergie à ranger ; sert aussi aux ères géologiques).
   On remet une liste dans le bon ordre. Le code compare à l'ordre juste : rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : pour chaque étape, des boutons « monter » et « descendre » ; l'ordre est annoncé à chaque geste. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const estRange = (ordre, juste) => ordre.length === juste.length && ordre.every((x, i) => x === juste[i]);
  /** Combien d'étapes sont à leur place. */
  const bienPlaces = (ordre, juste) => ordre.filter((x, i) => x === juste[i]).length;
  /** Échange une étape avec sa voisine ; ne bouge rien au bord. */
  function deplacer(ordre, i, d) {
    const j = i + d;
    if (j < 0 || j >= ordre.length) return ordre.slice();
    const o = ordre.slice();
    [o[i], o[j]] = [o[j], o[i]];
    return o;
  }

  function phrases() {
    return {
      juste: 'Bravo ! Toutes les étapes sont dans le bon ordre.',
      pasEncore: 'Pas encore. Lis le nombre d’étapes bien placées, et déplace les autres.',
    };
  }

  /** reglages : { etapes: l'ordre juste, depart: l'ordre de départ (mélangé, écrit dans la notion) } */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const juste = reglages.etapes;
    let ordre = reglages.depart.slice(), termine = false;
    conteneur.innerHTML = '<ol class="ranger-liste"></ol><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const liste = conteneur.querySelector('.ranger-liste');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    const annonce = () => 'Ordre actuel : ' + ordre.map((x, i) => (i + 1) + ', ' + x).join(' ; ') + '.';
    function afficher(mot) {
      liste.innerHTML = '';
      ordre.forEach((x, i) => {
        const li = doc.createElement('li');
        li.append(doc.createTextNode(x + ' '));
        for (const [t, d, nom] of [['Monter', -1, 'Monter : ' + x], ['Descendre', 1, 'Descendre : ' + x]]) {
          const b = doc.createElement('button');
          b.type = 'button';
          b.textContent = t;
          b.setAttribute('aria-label', nom);
          b.disabled = termine || (d < 0 ? i === 0 : i === ordre.length - 1);
          b.addEventListener('click', () => {
            if (termine) return;
            ordre = deplacer(ordre, i, d);
            afficher();
            redonnerFocus(x, t);
          });
          li.append(b);
        }
        liste.append(li);
      });
      etat.textContent = (mot ? mot + ' ' : '') + annonce();
    }
    /** Après un déplacement, la liste est redessinée : le focus revient sur le bouton de la même étape (ou sur l'autre, au bord). */
    function redonnerFocus(x, t) {
      const de = [...liste.querySelectorAll('button')].filter((b) => b.getAttribute('aria-label').endsWith(' : ' + x));
      const cible = de.find((b) => b.textContent === t && !b.disabled) || de.find((b) => !b.disabled);
      if (cible) cible.focus();
    }
    const v = doc.createElement('button');
    v.type = 'button';
    v.textContent = 'Valider cet ordre';
    v.addEventListener('click', () => {
      if (termine) return;
      if (!estRange(ordre, juste)) {
        afficher(P.pasEncore + ' Bien placées : ' + bienPlaces(ordre, juste) + ' sur ' + juste.length + '.');
        dire(etat.textContent, P.pasEncore);
        return;
      }
      termine = true;
      v.disabled = true;
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    zone.append(v);
    afficher();
    return { etat: () => ({ ordre: ordre.slice(), termine }) };
  }

  return { type: 'ranger', estRange, bienPlaces, deplacer, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
