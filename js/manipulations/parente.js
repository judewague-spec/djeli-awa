/* Manipulation « arbre de parenté à compléter » (bloc « Le vivant et son évolution », notion 15 ; accord du 2 nov. 2026).
   Pour chaque caractère, on désigne les animaux qui le possèdent : le code vérifie, puis range les groupes emboîtés. Rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : des boutons à cocher ; l'état est annoncé à chaque geste. Les noms sont écrits : la couleur n'est jamais le seul indice. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  // ---------- Données exactes ----------

  const ANIMAUX = ['L’escargot', 'Le poisson', 'La grenouille', 'La poule', 'Le chat', 'L’être humain'];
  /** Du caractère le plus partagé au moins partagé ; chaque groupe est inclus dans le précédent. */
  const CARACTERES = [
    { nom: 'un squelette avec une colonne vertébrale', groupe: 'Les vertébrés', qui: ['Le poisson', 'La grenouille', 'La poule', 'Le chat', 'L’être humain'] },
    { nom: 'quatre membres', groupe: 'Les tétrapodes', qui: ['La grenouille', 'La poule', 'Le chat', 'L’être humain'] },
    { nom: 'des poils et des mamelles', groupe: 'Les mammifères', qui: ['Le chat', 'L’être humain'] },
  ];

  // ---------- Calculs ----------

  const creer = () => ({ etape: 0, coches: [], faits: [] });

  /** Les animaux cochés sont-ils exactement ceux qui ont ce caractère ? */
  const juste = (etape, coches) => {
    const q = CARACTERES[etape].qui;
    return coches.length === q.length && q.every((a) => coches.includes(a));
  };

  const groupesFaits = (e) => e.faits.map((i) => CARACTERES[i].groupe + ' : ' + CARACTERES[i].qui.join(', ') + '.');

  function etatEcrit(e) {
    if (e.etape >= CARACTERES.length) return 'L’arbre est complet. ' + groupesFaits(e).join(' ');
    const c = e.coches.length;
    return 'Qui possède ' + CARACTERES[e.etape].nom + ' ? ' + (c === 0 ? 'Aucun animal n’est choisi.' : 'Choisis : ' + e.coches.join(', ') + '.');
  }

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');

  /** Les groupes emboîtés : une boîte par caractère, dans la précédente ; le nom de chaque groupe est écrit. */
  function svg(n, description) {
    const L = 320, H = 190;
    let s = '<svg class="dessin-code" viewBox="0 0 ' + L + ' ' + H + '" role="img" aria-label="' + aria(description) + '">';
    s += '<text x="' + (L / 2) + '" y="16" class="dessin-petit">L’escargot reste à part</text>';
    CARACTERES.slice(0, n).forEach((c, i) => {
      const x = 10 + i * 18, y = 24 + i * 40;
      s += '<rect x="' + x + '" y="' + y + '" width="' + (L - 2 * x) + '" height="' + (H - y - 6 - i * 6) + '" rx="10" class="chaine-case"/>';
      s += '<text x="' + (L / 2) + '" y="' + (y + 18) + '" class="dessin-petit">' + c.groupe + '</text>';
      const seuls = i + 1 < CARACTERES.length ? c.qui.filter((a) => !CARACTERES[i + 1].qui.includes(a)) : c.qui;
      s += '<text x="' + (L / 2) + '" y="' + (y + 34) + '" class="dessin-petit">' + seuls.join(', ') + '</text>';
    });
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'parente', niveaux, description }. */
  const dessin = (img) => svg(img.niveaux || CARACTERES.length, img.description);

  function phrases() {
    return {
      juste: 'Oui, ce sont bien eux. Ce caractère forme un groupe.',
      pasEncore: 'Pas encore. Regarde chaque animal, l’un après l’autre.',
      fini: 'Bravo ! Ton arbre est complet : les groupes sont emboîtés, comme des boîtes.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** fini() quand les trois caractères sont bien placés. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const e = creer();
    let dernier = null; // le nom du dernier bouton touché : le focus y revient après chaque geste
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');

    function afficher(annonce) {
      const texte = etatEcrit(e);
      cadre.innerHTML = e.faits.length ? svg(e.faits.length, groupesFaits(e).join(' ')) : '';
      etat.textContent = (annonce ? annonce + ' ' : '') + texte;
      zone.innerHTML = '';
      if (e.etape >= CARACTERES.length) return;
      ANIMAUX.forEach((a) => {
        const b = doc.createElement('button');
        b.type = 'button';
        b.textContent = a;
        b.setAttribute('aria-pressed', e.coches.includes(a) ? 'true' : 'false');
        b.addEventListener('click', () => {
          dernier = a;
          e.coches = e.coches.includes(a) ? e.coches.filter((x) => x !== a) : e.coches.concat(a);
          afficher();
        });
        zone.appendChild(b);
      });
      const v = doc.createElement('button');
      v.type = 'button';
      v.textContent = 'Valider ce groupe';
      v.addEventListener('click', () => {
        dernier = v.textContent;
        if (!juste(e.etape, e.coches)) { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
        e.faits.push(e.etape);
        e.etape++;
        e.coches = [];
        const dit = e.etape >= CARACTERES.length ? P.fini : P.juste;
        afficher(dit);
        dire(etat.textContent, dit);
        if (e.etape >= CARACTERES.length) { etat.setAttribute('tabindex', '-1'); etat.focus(); fini(); }
      });
      zone.appendChild(v);
      if (dernier) ([...zone.children].find((b) => b.textContent === dernier) || zone.firstChild).focus();
    }
    afficher();
    return { etat: () => e };
  }

  return { type: 'parente', ANIMAUX, CARACTERES, creer, juste, etatEcrit, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
