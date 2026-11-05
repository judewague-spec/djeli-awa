/* Manipulation « la balance et le dynamomètre, sur la Terre et sur la Lune » (bloc « Mouvement et forces », notion 10 ; permise par la consigne du 2 novembre 2026).
   On emporte un objet de la Terre à la Lune : la balance à plateaux donne la même masse, le dynamomètre donne un poids plus petit.
   g = 9,8 N/kg sur la Terre, environ 1,6 N/kg sur la Lune. Au doigt comme au lecteur d'écran : des boutons ; chaque état est annoncé. Tout est calculé en code. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  // ---------- Calculs ----------

  const G = { terre: 9.8, lune: 1.6 };
  const LIEUX = { terre: 'Sur la Terre', lune: 'Sur la Lune' };
  const nombre = (x) => String(Math.round(x * 100) / 100).replace('.', ',');

  /** Le poids en newtons d'une masse en kilogrammes, à cet endroit. */
  const poids = (masse, lieu) => Math.round(masse * G[lieu] * 100) / 100;

  function etatEcrit(masse, lieu) {
    return LIEUX[lieu] + '. La balance à plateaux donne une masse de ' + nombre(masse) + ' kilogrammes. Le dynamomètre donne un poids de ' + nombre(poids(masse, lieu)) + ' newtons.';
  }

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');

  /** Un ressort vertical, d'autant plus long que le poids est grand. */
  function ressort(x, y0, longueur) {
    const pas = longueur / 8;
    let d = 'M' + x + ',' + y0;
    for (let k = 1; k <= 8; k++) d += ' L' + (x + (k % 2 ? 9 : -9)) + ',' + (y0 + k * pas).toFixed(1);
    return '<path d="' + d + '" class="force-trait"/>';
  }

  function svg(masse, lieu, description) {
    const p = poids(masse, lieu);
    const longueur = 14 + 76 * Math.min(1, p / (masse * G.terre)); // le ressort s'allonge avec le poids, sur la Terre au plus long
    let s = '<svg class="dessin-code" viewBox="0 0 320 190" role="img" aria-label="' + aria(description) + '">';
    s += '<text x="160" y="16" class="dessin-legende">' + LIEUX[lieu] + '</text>';
    // La balance à plateaux, toujours en équilibre.
    s += '<line x1="90" y1="50" x2="90" y2="140" class="plateau-pied"/><line x1="30" y1="50" x2="150" y2="50" class="plateau-pied"/>';
    s += '<line x1="30" y1="50" x2="30" y2="86" class="plateau-ligne"/><line x1="150" y1="50" x2="150" y2="86" class="plateau-ligne"/>';
    s += '<line x1="8" y1="86" x2="52" y2="86" class="plateau-ligne"/><line x1="128" y1="86" x2="172" y2="86" class="plateau-ligne"/>';
    s += '<rect x="18" y="66" width="24" height="20" class="plateau-boite"/><rect x="134" y="66" width="32" height="20" rx="3" class="plateau-kilos"/>';
    s += '<text x="150" y="80" class="dessin-petit">' + nombre(masse) + ' kg</text>';
    s += '<text x="90" y="178" class="dessin-legende">Masse : ' + nombre(masse) + ' kg</text>';
    // Le dynamomètre : un ressort, l'objet accroché dessous.
    s += '<line x1="220" y1="34" x2="280" y2="34" class="plateau-pied"/><line x1="250" y1="34" x2="250" y2="42" class="force-trait"/>';
    s += ressort(250, 42, longueur);
    s += '<rect x="238" y="' + (42 + longueur).toFixed(1) + '" width="24" height="20" class="plateau-boite"/>';
    s += '<text x="250" y="178" class="dessin-legende">Poids : ' + nombre(p) + ' N</text>';
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'balance-astres', masse, lieu, description }. */
  const dessin = (img) => svg(img.masse, img.lieu, img.description);

  function phrases() {
    return {
      voyage: 'Regarde bien les deux nombres. Puis va de l’autre côté.',
      question: 'Tu as vu les deux astres. Qu’est-ce qui n’a pas changé ?',
      pasEncore: 'Regarde encore : un des deux nombres n’a pas bougé pendant le voyage.',
      juste: 'Bravo ! La masse reste la même partout. C’est le poids qui change d’un astre à l’autre.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { masse } ; il faut voir les deux astres, puis dire ce qui n'a pas changé. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const masse = reglages.masse;
    let lieu = 'terre', termine = false;
    const vus = new Set(['terre']);
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    function afficher(annonce) {
      const t = etatEcrit(masse, lieu);
      cadre.innerHTML = svg(masse, lieu, t);
      etat.textContent = (annonce ? annonce + ' ' : '') + t;
    }
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
      return c;
    };
    let questionPosee = false;
    function poserQuestion() {
      if (questionPosee) return;
      questionPosee = true;
      bouton('La masse n’a pas changé', () => {
        termine = true;
        zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
        afficher(P.juste);
        etat.setAttribute('tabindex', '-1');
        etat.focus();
        dire(etat.textContent, P.juste);
        fini();
      });
      bouton('Le poids n’a pas changé', () => { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); });
    }
    function aller(l) {
      lieu = l;
      vus.add(l);
      const tout = vus.size === 2;
      if (tout) poserQuestion();
      const annonce = tout ? P.question : P.voyage;
      afficher(annonce);
      dire(etat.textContent, annonce);
    }
    bouton('Aller sur la Terre', () => aller('terre'));
    bouton('Aller sur la Lune', () => aller('lune'));
    afficher();
    return { etat: () => ({ lieu, termine, vus: [...vus] }) };
  }

  return { type: 'balance-astres', G, poids, etatEcrit, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
