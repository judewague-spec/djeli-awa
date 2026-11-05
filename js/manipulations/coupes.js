/* Manipulation « coupes de solides » (SPEC.md, section 5 ; bloc « Mesures, géométrie et espace », notion 33).
   Pour chaque tranche, on choisit la forme de la coupe. La réponse vient d'une table écrite ici : rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : des boutons ; le solide, le sens de la coupe et le résultat sont annoncés. */
(function (racine, fabrique) {
  const X = fabrique(typeof module === 'object' && module.exports ? require('./solide.js') : racine.Manipulations.obtenir('solide'));
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function (Solide) {
  'use strict';

  const FORMES = ['Un rectangle', 'Un disque', 'Un carré', 'Un triangle'];
  const NOMS = { pave: 'un pavé droit', cylindre: 'un cylindre', cone: 'un cône', pyramide: 'une pyramide à base carrée', boule: 'une boule' };
  const SENS = { horizontal: 'à l’horizontale, parallèlement à la base', vertical: 'à la verticale, parallèlement à une face ou à l’axe' };

  /** La forme de la coupe : une table, sans calcul caché. Le cône et la pyramide ne sont coupés que parallèlement à leur base (programme). */
  function section(forme, plan) {
    if (forme === 'boule' || forme === 'cone') return 'Un disque';
    if (forme === 'pave') return 'Un rectangle';
    if (forme === 'pyramide') return 'Un carré';
    return plan === 'horizontal' ? 'Un disque' : 'Un rectangle'; // cylindre
  }

  const TAILLES = { pave: { l: 4, p: 3, h: 3 }, cylindre: { r: 2, h: 5 }, cone: { r: 3, h: 5 }, pyramide: { l: 4, p: 4, h: 5 }, boule: { r: 3 } };
  const decrire = (f, plan) => 'On coupe ' + NOMS[f] + ' ' + (f === 'boule' ? 'par un plan' : SENS[plan]) + '.';

  const dessinCoupe = (f, plan, description) => Solide.svg(Object.assign({ forme: f, coupe: { plan, t: f === 'boule' ? 0.4 : 0.5 }, description }, TAILLES[f]));

  function phrases() {
    return {
      juste: 'Oui ! C’est bien la forme de cette tranche.',
      pasEncore: 'Pas encore. Imagine la tranche que tu tiendrais dans ta main, et essaie une autre forme.',
      fin: 'Bravo ! Tu as trouvé la forme de toutes les tranches.',
    };
  }

  /** reglages : { coupes: [[forme, plan], …] } */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const { coupes } = reglages;
    let k = 0, termine = false;
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    function afficher(annonce) {
      const [f, plan] = coupes[k];
      const t = decrire(f, plan);
      cadre.innerHTML = dessinCoupe(f, plan, t + ' Le contour de la tranche est en trait épais.');
      etat.textContent = (annonce ? annonce + ' ' : '') + t + ' Tranche ' + (k + 1) + ' sur ' + coupes.length + '. Quelle est sa forme ?';
    }
    for (const texte of FORMES) {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => {
        if (termine) return;
        const [f, plan] = coupes[k];
        if (section(f, plan) !== texte) { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
        if (k + 1 < coupes.length) { k += 1; afficher(P.juste + ' ' + texte + '.'); dire(etat.textContent, P.juste); return; }
        termine = true;
        zone.querySelectorAll('button').forEach((b) => { b.disabled = true; });
        etat.textContent = P.fin + ' La dernière tranche : ' + texte.toLowerCase() + '.';
        etat.setAttribute('tabindex', '-1');
        etat.focus();
        dire(etat.textContent, P.fin);
        fini();
      });
      zone.appendChild(c);
    }
    afficher();
    return { etat: () => ({ k, termine }) };
  }

  return { type: 'coupes', FORMES, section, decrire, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
