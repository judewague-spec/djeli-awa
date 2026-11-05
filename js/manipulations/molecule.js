/* Manipulation « molécule à construire » (SPEC.md, section 5 : liste des manipulations à l'écran).
   Comme avec des briques : elle ajoute ou enlève des atomes (C, H, O, N) jusqu'à obtenir la molécule demandée.
   Au doigt : toucher un atome de la molécule l'enlève ; les boutons en ajoutent.
   Au lecteur d'écran : boutons « un atome de … de plus / de moins » ; la composition est annoncée à chaque changement.
   Chaque atome a sa couleur ET sa lettre : la couleur n'est jamais le seul indice. Le dessin est fait en code. */
(function (racine, fabrique) {
  const C = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = C;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(C);
})(this, function () {
  'use strict';

  const ATOMES = {
    C: { nom: 'carbone', classe: 'atome-c', r: 15 },
    H: { nom: 'hydrogène', classe: 'atome-h', r: 10 },
    O: { nom: 'oxygène', classe: 'atome-o', r: 14 },
    N: { nom: 'azote', classe: 'atome-n', r: 14 },
  };
  const INDICES = { 1: '', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆' };

  // ---------- Calculs ----------

  /** « CO2 » ou « CO₂ » → { C: 1, O: 2 }, dans l'ordre de la formule. */
  function comptes(formule) {
    const t = String(formule).replace(/[₀-₉]/g, (x) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(x)));
    const c = {};
    for (const [, e, n] of t.matchAll(/([A-Z][a-z]?)(\d*)/g)) c[e] = (c[e] || 0) + (n ? Number(n) : 1);
    return c;
  }

  /** { H: 2, O: 1 } → « H₂O », dans l'ordre donné (sinon C, H, puis les autres). */
  function ecrire(c, ordre) {
    const cles = (ordre || ['C', 'H', 'N', 'O']).filter((e) => c[e]).concat(Object.keys(c).filter((e) => c[e] && !(ordre || ['C', 'H', 'N', 'O']).includes(e)));
    return cles.map((e) => e + INDICES[c[e]]).join('') || 'rien';
  }

  const pareil = (a, b) => Object.keys(Object.assign({}, a, b)).every((e) => (a[e] || 0) === (b[e] || 0));

  /** « 2 atomes d'hydrogène et 1 atome d'oxygène ». */
  function enMots(c) {
    const l = Object.keys(c).filter((e) => c[e]).map((e) => c[e] + (c[e] > 1 ? ' atomes' : ' atome') + (/^[aeiouh]/.test(ATOMES[e].nom) ? ' d’' : ' de ') + ATOMES[e].nom);
    return l.length ? l.slice(0, -1).join(', ') + (l.length > 1 ? ' et ' : '') + l[l.length - 1] : 'aucun atome';
  }

  // ---------- Dessin ----------

  /** Les atomes à la suite, collés comme des briques (le dessin ne montre pas la forme réelle de la molécule). */
  function svg(c, description) {
    let liste = [];
    for (const e of Object.keys(c)) for (let k = 0; k < c[e]; k++) liste.push(e);
    // Un seul atome central (C, sinon N, sinon O) : il va au milieu, les autres de part et d'autre (H–O–H, O–C–O).
    const centre = ['C', 'N', 'O'].find((e) => c[e] === 1 && liste.length > 2);
    if (centre) {
      const autres = liste.filter((e, i) => i !== liste.indexOf(centre));
      liste = autres.slice(0, Math.floor(autres.length / 2)).concat(centre, autres.slice(Math.floor(autres.length / 2)));
    }
    const L = liste.reduce((s, e) => s + ATOMES[e].r * 2 - 4, 16);
    const W = Math.max(200, L); // un cadre assez large : une petite molécule reste petite et centrée
    let s = '<svg class="molecule" viewBox="0 0 ' + W + ' 50" role="img" aria-label="' + String(description || '').replace(/"/g, '&quot;') + '">';
    let x = 8 + (W - L) / 2;
    liste.forEach((e, i) => {
      const a = ATOMES[e];
      x += a.r;
      s += '<g data-atome="' + e + '" data-rang="' + i + '"><circle cx="' + x + '" cy="25" r="' + a.r + '" class="atome-boule ' + a.classe + '"/>' +
        '<text x="' + x + '" y="30" class="atome-lettre">' + e + '</text></g>';
      x += a.r - 4;
    });
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'molecule', formule, description }. */
  const dessin = (img) => svg(comptes(img.formule), img.description);

  function phrases() {
    return {
      juste: 'Bravo ! C’est la bonne molécule : il y a le bon nombre d’atomes de chaque sorte.',
      pasEncore: 'Pas encore. Compte les atomes de chaque sorte, comme le dit la formule : le petit chiffre en bas compte l’atome juste avant lui.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { cible: 'H2O', nomCible: 'une molécule d’eau', atomes: ['H', 'O'] }. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const cible = comptes(reglages.cible);
    const ordre = Object.keys(cible);
    const atomes = reglages.atomes || ordre;
    const c = {};
    let termine = false;
    conteneur.innerHTML = '<div class="molecule-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="molecule-boutons"></div>';
    const cadre = conteneur.querySelector('.molecule-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.molecule-boutons');

    function dessiner() {
      const desc = 'Ta molécule : ' + enMots(c) + '. Formule : ' + ecrire(c, ordre) + '.';
      cadre.innerHTML = svg(c, desc);
      etat.textContent = desc;
    }
    function changer(e, d) {
      if (termine) return;
      c[e] = Math.max(0, Math.min(6, (c[e] || 0) + d));
      dessiner();
    }
    function bouton(texte, action, parent) {
      const b = doc.createElement('button');
      b.type = 'button';
      b.textContent = texte;
      b.addEventListener('click', action);
      parent.appendChild(b);
      return b;
    }
    for (const e of atomes) {
      const ligne = doc.createElement('div');
      ligne.className = 'boutons';
      ligne.setAttribute('role', 'group');
      ligne.setAttribute('aria-label', 'Atomes de ' + ATOMES[e].nom);
      bouton('Un atome ' + e + ' de plus', () => changer(e, 1), ligne).setAttribute('aria-label', 'Un atome de ' + ATOMES[e].nom + ' de plus');
      bouton('Un atome ' + e + ' de moins', () => changer(e, -1), ligne).setAttribute('aria-label', 'Un atome de ' + ATOMES[e].nom + ' de moins');
      zone.appendChild(ligne);
    }
    const fin = doc.createElement('div');
    fin.className = 'boutons';
    zone.appendChild(fin);
    bouton('Vérifier ma molécule', () => {
      if (termine) return;
      const P = phrases();
      if (pareil(c, cible)) {
        termine = true;
        zone.querySelectorAll('button').forEach((b) => { b.disabled = true; });
        etat.textContent = P.juste + ' ' + ecrire(c, ordre) + ' : ' + reglages.nomCible + '.';
        dire(etat.textContent, P.juste);
        fini();
      } else {
        etat.textContent = P.pasEncore + ' Il faut ' + reglages.cible.replace(/\d/g, (x) => INDICES[x] || x) + '. Tu as ' + ecrire(c, ordre) + '.';
        dire(etat.textContent, P.pasEncore);
      }
    }, fin);
    // Au doigt : toucher un atome de la molécule l'enlève.
    cadre.addEventListener('click', (ev) => {
      const g = ev.target.closest && ev.target.closest('[data-atome]');
      if (g) changer(g.getAttribute('data-atome'), -1);
    });
    dessiner();
    return { etat: () => ({ comptes: Object.assign({}, c), termine }) };
  }

  return { type: 'molecule', ATOMES, comptes, ecrire, pareil, enMots, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
