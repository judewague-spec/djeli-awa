/* Manipulation « circuit électrique à assembler » (SPEC.md, section 5 : liste des manipulations à l'écran).
   Elle pose la pile, relie les fils, ajoute des lampes à la suite ou sur une nouvelle boucle, ferme l'interrupteur, dévisse une lampe.
   Le code dit quelles lampes brillent : rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : des boutons ; l'état du circuit et de chaque lampe est annoncé à chaque geste.
   Dans le dessin, une lampe qui brille porte des rayons : la couleur n'est jamais le seul indice. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const MAX_LAMPES = 3;

  // ---------- Calculs ----------

  /** branches : le nombre de lampes de chaque boucle ; [2] : deux lampes en série ; [1, 1] : deux lampes en dérivation. */
  const creer = () => ({ pile: false, fils: false, interrupteur: false, branches: [], devissee: false });

  const ferme = (e) => e.pile && e.fils && e.interrupteur;

  /** Pour chaque boucle : 'eteinte', 'forte' (une lampe seule sur sa boucle) ou 'faible' (plusieurs à la suite). La lampe dévissée est la première. */
  function lampes(e) {
    return e.branches.map((n, i) => {
      if (!ferme(e) || (e.devissee && i === 0)) return 'eteinte';
      return n === 1 ? 'forte' : 'faible';
    });
  }
  const nombreDeLampes = (e) => e.branches.reduce((s, n) => s + n, 0);

  /** Le but est-il atteint ? but : 'allumer' (une lampe), 'serie' (deux à la suite), 'derivation' (deux sur deux boucles). */
  function reussi(e, but) {
    if (!ferme(e) || e.devissee) return false;
    if (but === 'allumer') return e.branches.length === 1 && e.branches[0] === 1;
    if (but === 'serie') return e.branches.length === 1 && e.branches[0] === 2;
    if (but === 'derivation') return e.branches.length === 2 && e.branches[0] === 1 && e.branches[1] === 1;
    return false;
  }

  function etatEcrit(e) {
    const parties = [e.pile ? 'La pile est posée.' : 'Il n’y a pas de pile.', e.fils ? 'Les fils sont reliés.' : 'Les fils ne sont pas reliés.', e.interrupteur ? 'L’interrupteur est fermé.' : 'L’interrupteur est ouvert.'];
    if (!e.branches.length) parties.push(ferme(e) ? 'Il n’y a pas de lampe. Sans lampe, c’est un court-circuit : c’est dangereux.' : 'Il n’y a pas de lampe.');
    else {
      const L = lampes(e), mot = { eteinte: 'éteinte', forte: 'allumée, elle brille fort', faible: 'allumée, elle brille faiblement' };
      if (e.branches.length === 1 && e.branches[0] > 1) parties.push(e.branches[0] + ' lampes à la suite : ' + (L[0] === 'eteinte' ? 'éteintes' : 'allumées, elles brillent faiblement') + '.');
      else e.branches.forEach((n, i) => {
        if (n === 1) parties.push('Boucle ' + (i + 1) + ' : une lampe ' + mot[L[i]] + '.');
        else parties.push('Boucle ' + (i + 1) + ' : ' + n + ' lampes ' + (L[i] === 'eteinte' ? 'éteintes' : 'allumées, elles brillent faiblement') + '.');
      });
      if (e.devissee) parties.push('La première lampe est dévissée.');
    }
    return parties.join(' ');
  }

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');

  function lampe(x, y, etat) {
    let s = '<circle cx="' + x + '" cy="' + y + '" r="13" class="circuit-lampe' + (etat !== 'eteinte' ? ' allumee' : '') + '"/>' +
      '<path d="M' + (x - 9) + ',' + (y - 9) + ' L' + (x + 9) + ',' + (y + 9) + ' M' + (x - 9) + ',' + (y + 9) + ' L' + (x + 9) + ',' + (y - 9) + '" class="circuit-fil"/>';
    if (etat !== 'eteinte') for (const [dx, dy] of [[0, -1], [0.8, -0.8], [-0.8, -0.8]]) s += '<line x1="' + (x + dx * 16) + '" y1="' + (y + dy * 16) + '" x2="' + (x + dx * 24) + '" y2="' + (y + dy * 24) + '" class="circuit-rayon"/>';
    return s;
  }

  /** Un appareil de mesure : un cercle et sa lettre. */
  const appareil = (x, y, lettre) => '<circle cx="' + x + '" cy="' + y + '" r="12" class="circuit-lampe"/><text x="' + x + '" y="' + (y + 5) + '" class="dessin-legende">' + lettre + '</text>';

  /** e : l'état ; mesures : des légendes écrites sous le schéma ; ampere, volt : l'ampèremètre dans la boucle, le voltmètre aux bornes de la première lampe. */
  function svg(e, description, mesures, ampere, volt) {
    const n = Math.max(1, e.branches.length), h = 50 + n * 66, bas = 30 + n * 60, L = lampes(e);
    let s = '<svg class="dessin-code circuit" viewBox="0 0 320 ' + (h + (mesures ? mesures.length * 16 : 0)) + '" role="img" aria-label="' + aria(description) + '">';
    // La pile à gauche
    const milieu = (30 + bas) / 2;
    s += e.pile
      ? '<line x1="30" y1="' + (milieu - 4) + '" x2="70" y2="' + (milieu - 4) + '" class="circuit-fil epais"/><line x1="40" y1="' + (milieu + 5) + '" x2="60" y2="' + (milieu + 5) + '" class="circuit-fil"/><text x="82" y="' + (milieu + 4) + '" class="dessin-petit">pile</text>'
      : '<text x="50" y="' + (milieu + 4) + '" class="dessin-petit">sans pile</text>';
    if (e.fils) s += '<line x1="50" y1="30" x2="50" y2="' + (milieu - 4) + '" class="circuit-fil"/><line x1="50" y1="' + (milieu + 5) + '" x2="50" y2="' + bas + '" class="circuit-fil"/>';
    // L'interrupteur en haut
    s += '<line x1="50" y1="30" x2="100" y2="30" class="circuit-fil"/>';
    s += e.interrupteur ? '<line x1="100" y1="30" x2="140" y2="30" class="circuit-fil"/>' : '<line x1="100" y1="30" x2="134" y2="10" class="circuit-fil"/>';
    s += '<text x="120" y="48" class="dessin-petit">' + (e.interrupteur ? 'fermé' : 'ouvert') + '</text>';
    s += '<line x1="140" y1="30" x2="190" y2="30" class="circuit-fil"/><line x1="290" y1="30" x2="290" y2="' + bas + '" class="circuit-fil"/><line x1="50" y1="' + bas + '" x2="290" y2="' + bas + '" class="circuit-fil"/>';
    // Les boucles de lampes, de haut en bas ; la première prolonge le fil du haut.
    e.branches.forEach((nb, i) => {
      const y = i === 0 ? 30 : 30 + i * 48;
      if (i > 0) s += '<line x1="190" y1="30" x2="190" y2="' + y + '" class="circuit-fil"/><line x1="290" y1="' + y + '" x2="290" y2="30" class="circuit-fil"/>';
      s += '<line x1="190" y1="' + y + '" x2="290" y2="' + y + '" class="circuit-fil"/>';
      for (let k = 0; k < nb; k++) s += lampe(190 + (100 * (k + 1)) / (nb + 1), y, L[i]);
    });
    if (!e.branches.length) s += '<line x1="190" y1="30" x2="290" y2="30" class="circuit-fil"/>';
    if (ampere) s += appareil(170, bas, 'A');
    if (volt) s += '<path d="M212,30 L212,62 L228,62 M252,62 L268,62 L268,30" class="circuit-fil"/>' + appareil(240, 62, 'V');
    (mesures || []).forEach((m, i) => { s += '<text x="160" y="' + (h + 8 + i * 16) + '" class="dessin-legende">' + m + '</text>'; });
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'circuit', branches, ouvert, devissee, mesures, ampere, volt, description } : pile et fils en place. */
  const dessin = (img) => svg({ pile: true, fils: true, interrupteur: !img.ouvert, branches: img.branches || [1], devissee: !!img.devissee }, img.description, img.mesures, img.ampere, img.volt);

  function phrases() {
    return {
      juste: 'Bravo ! Ton circuit est bon, et les lampes brillent comme il faut.',
      pasEncore: 'Pas encore. Il faut une pile, des fils reliés, l’interrupteur fermé, et les bonnes lampes.',
      limite: 'Il y a déjà assez de lampes sur ce circuit.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { but : 'allumer' | 'serie' | 'derivation' } ; fini() quand le but est atteint et validé. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const e = creer();
    let termine = false;
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons circuit-boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.circuit-boutons');

    function dessiner(annonce) {
      const texte = etatEcrit(e);
      cadre.innerHTML = svg(e, texte);
      etat.textContent = (annonce ? annonce + ' ' : '') + texte;
    }
    function bouton(texte, action) {
      const b = doc.createElement('button');
      b.type = 'button';
      b.textContent = texte;
      b.addEventListener('click', () => { if (!termine) { const dit = action(); dessiner(dit); if (dit) dire(dit, dit); } });
      zone.appendChild(b);
      return b;
    }
    bouton('Poser ou enlever la pile', () => { e.pile = !e.pile; });
    bouton('Relier ou défaire les fils', () => { e.fils = !e.fils; });
    bouton('Fermer ou ouvrir l’interrupteur', () => { e.interrupteur = !e.interrupteur; });
    bouton('Ajouter une lampe à la suite', () => {
      if (nombreDeLampes(e) >= MAX_LAMPES) return phrases().limite;
      if (!e.branches.length) e.branches.push(1); else e.branches[0]++;
      return '';
    });
    bouton('Ajouter une lampe sur une nouvelle boucle', () => {
      if (nombreDeLampes(e) >= MAX_LAMPES) return phrases().limite;
      e.branches.push(1);
      return '';
    });
    bouton('Enlever la dernière lampe', () => {
      if (!e.branches.length) return '';
      const d = e.branches.length - 1;
      if (e.branches[d] > 1) e.branches[d]--; else e.branches.pop();
      return '';
    });
    bouton('Dévisser ou revisser la première lampe', () => { e.devissee = !e.devissee && e.branches.length > 0; });
    const valider = doc.createElement('button');
    valider.type = 'button';
    valider.textContent = 'Valider mon circuit';
    valider.addEventListener('click', () => {
      if (termine) return;
      if (reussi(e, reglages.but)) {
        termine = true;
        zone.querySelectorAll('button').forEach((b) => { b.disabled = true; });
        etat.textContent = phrases().juste + ' ' + etatEcrit(e);
        dire(etat.textContent, phrases().juste);
        fini();
      } else {
        etat.textContent = phrases().pasEncore + ' ' + etatEcrit(e);
        dire(etat.textContent, phrases().pasEncore);
      }
    });
    zone.appendChild(valider);
    dessiner();
    return { etat: () => ({ e, termine }) };
  }

  return { type: 'circuit', creer, ferme, lampes, reussi, etatEcrit, nombreDeLampes, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
