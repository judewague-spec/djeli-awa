/* Petits outils partagés par les fichiers de notion (contenu/*.js) : écriture des nombres, choix, diviseurs, fractions.
   Chargé avant les notions dans index.html ; dans Node, chaque notion le demande avec require. */
(function (racine, fabrique) {
  const O = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = O;
  else racine.OutilsContenu = O;
})(this, function () {
  'use strict';

  /** Un nombre écrit comme la vérification l'écrit (virgule, signe moins simple) : « -3 », « 2,5 ». */
  const ecr = (x) => String(x).replace('.', ',');

  /** Un nombre entre parenthèses s'il est négatif : « (-3) ». */
  const par = (x) => (x < 0 ? '(' + ecr(x) + ')' : ecr(x));

  /** Un nombre et son nom, bien accordés : « 1 carré », « 3 carrés », « 1,5 litre ». pluriel : s'il ne prend pas seulement un s. */
  const nb = (n, singulier, pluriel) => ecr(n) + ' ' + (Math.abs(n) < 2 ? singulier : pluriel || singulier + 's');

  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const ppcm = (a, b) => (a / pgcd(a, b)) * b;

  /** Les diviseurs de n, du plus petit au plus grand. */
  function diviseurs(n) {
    const d = [];
    for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k);
    return d;
  }

  /** Les paires de diviseurs : « 1 × 24 », « 2 × 12 »… */
  function paires(n) {
    const p = [];
    for (let k = 1; k * k <= n; k++) if (n % k === 0) p.push(k + ' × ' + n / k);
    return p;
  }

  const estPremier = (n) => n > 1 && diviseurs(n).length === 2;

  /** Décomposition en facteurs premiers : [2, 2, 3] pour 12. */
  function facteurs(n) {
    const f = [];
    for (let p = 2; n > 1; p++) while (n % p === 0) { f.push(p); n /= p; }
    return f;
  }

  /** La décomposition écrite avec des puissances : « 2² × 3 ». */
  function decompositionEcrite(n) {
    const exp = ['', '', '²', '³', '⁴', '⁵', '⁶', '⁷'];
    const comptes = new Map();
    for (const p of facteurs(n)) comptes.set(p, (comptes.get(p) || 0) + 1);
    return [...comptes].map(([p, k]) => p + exp[k]).join(' × ');
  }

  /** Fraction simplifiée, signe en haut : [n, d] avec d > 0. */
  function simplifier(n, d) {
    const g = pgcd(n, d) || 1;
    const s = d < 0 ? -1 : 1;
    return [(s * n) / g, (s * d) / g];
  }

  /** Une fraction écrite « 3/4 » (le signe en haut : « -3/4 »). */
  const frac = (n, d) => n + '/' + d;

  /** Une réponse à choisir : la bonne réponse et les autres, mélangées. */
  function choix(alea, bonne, autres) {
    const options = alea.melanger([bonne].concat(autres.filter((a) => a !== bonne)));
    return { type: 'choix', options, valeur: options.indexOf(bonne) };
  }

  /** Une puissance écrite avec son exposant en petits chiffres : « 10³ », « 10⁻² ». */
  function puissance(base, e) {
    const petits = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
    return (base < 0 ? '(' + base + ')' : String(base)) + String(e).split('').map((x) => petits[x]).join('');
  }

  /** Un générateur de question à choix (technologie) : versions [[situation, bonne réponse, explication facultative]] ;
      la bonne réponse et les deux premières autres de « toutes » sont proposées, mélangées. L'aide est la même à chaque étape. */
  function qcm(id, univers, versions, enonce, toutes, aide) {
    return {
      id, univers, versions,
      genere(c) {
        const [x, bonne, pourquoi] = c.alea.choisir(this.versions);
        return {
          enonce: enonce(x),
          reponse: choix(c.alea, bonne, toutes.filter((t) => t !== bonne).slice(0, 2)),
          aide,
          correction: (pourquoi ? [pourquoi] : []).concat(['Réponse : ' + bonne + (/[.!?]$/.test(bonne) ? '' : '.')]),
        };
      },
    };
  }

  // ---------- Expressions littérales (bloc « Le calcul avec des lettres ») ----------

  /** Un terme signé ; premier : sans « + » devant. coef 1 et -1 s'écrivent sans le 1 devant une lettre. */
  function terme(coef, lettre, premier) {
    if (coef === 0) return '';
    const abs = Math.abs(coef), corps = lettre ? (abs === 1 ? '' : ecr(abs)) + lettre : ecr(abs);
    if (premier) return (coef < 0 ? '−' : '') + corps;
    return (coef < 0 ? ' − ' : ' + ') + corps;
  }
  /** Une somme de termes : [[coef, lettre], …] ; rien n'est écrit pour un coefficient nul. */
  function somme(termes) {
    let s = '';
    for (const [c, l] of termes) if (c !== 0) s += terme(c, l, s === '');
    return s === '' ? '0' : s;
  }
  /** ax + b. */
  const expr = (a, b, l = 'x') => somme([[a, l], [b, '']]);
  /** ax² + bx + c. */
  const expr2 = (a, b, c, l = 'x') => somme([[a, l + '²'], [b, l], [c, '']]);

  return { ecr, par, nb, pgcd, ppcm, diviseurs, paires, estPremier, facteurs, decompositionEcrite, simplifier, frac, choix, puissance, qcm, somme, expr, expr2 };
});
