/* Dessins fixes des réflexions guidées (SPEC.md, section 5) : faits en code, gratuits, chacun avec sa description orale.
   Ce ne sont pas des manipulations : rien à toucher. Chacun suit quand même le contrat commun (js/manipulations/commun.js),
   pour que le registre sache les dessiner ; monter() affiche seulement le dessin.
     paquets      { objets, parPaquet, description }        des objets rangés en paquets égaux (et le reste à part)
     arbre        { nombre, description }                    l'arbre de décomposition en facteurs premiers
     doublement   { generations, branches, description }     un message transféré, génération après génération
     echelle      { reperes: [{ nom, puissance }], description }  une règle des puissances de 10
     barres       { barres: [{ nom, parts }], description }  des barres de parts égales (ratios, fractions)
   Bloc « La matière » :
     particules   { etat: solide | liquide | gaz }            les particules d'un état
     balance      { gauche, droite, masseG, masseD }          une balance à deux plateaux
     ph           { reperes: [{ nom, ph }] }                  l'échelle de pH de 0 à 14
     atome        { protons, neutrons, electrons }            un atome, sans échelle
     tableau      { surligne }                                les 18 premiers éléments
     tube         { aspect: clair | trouble | bleu | blanc, legende }  un tube à essai
   Bloc de technologie « Les objets et la société » :
     etiquette    { classe: A à G, kwh, appareil }            l'étiquette énergie
     reparabilite { note, appareil }                         l'indice de réparabilité, une note sur 10
   Bloc « Le calcul avec des lettres » :
     aires        { lignes, colonnes, cases }                un rectangle partagé en cases, avec leurs aires écrites
   Bloc « L'électricité » :
     facture      { titre, lignes: [[nom, valeur]] }         une facture d'électricité, la dernière ligne en gras */
(function (racine, fabrique) {
  const D = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = D;
  else if (racine.Manipulations) D.forEach((d) => racine.Manipulations.enregistrer(d));
})(this, function () {
  'use strict';

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const ouvrir = (classe, l, h, description) => '<svg class="dessin-code ' + classe + '" viewBox="0 0 ' + l + ' ' + h + '" role="img" aria-label="' + aria(description) + '">';

  /** Plus petit diviseur premier de n (n ≥ 2). */
  function plusPetitFacteur(n) {
    for (let p = 2; p * p <= n; p++) if (n % p === 0) return p;
    return n;
  }

  /** Les étages de l'arbre : [[n, p, n/p], …] jusqu'à un nombre premier. */
  function etagesArbre(n) {
    const e = [];
    while (n > 1) {
      const p = plusPetitFacteur(n);
      if (p === n) break;
      e.push([n, p, n / p]);
      n /= p;
    }
    return e;
  }

  function paquets(img) {
    const n = img.parPaquet, nb = Math.floor(img.objets / n), reste = img.objets % n;
    const col = Math.ceil(Math.sqrt(n)), lig = Math.ceil(n / col);
    const L = col * 16 + 10, H = lig * 16 + 10;
    const parLigne = Math.max(1, Math.floor(300 / (L + 8)));
    const lignes = Math.ceil((nb + (reste ? 1 : 0)) / parLigne);
    let s = ouvrir('paquets', 300, lignes * (H + 8) + 4, img.description);
    const boite = (i, compte, classe) => {
      const x = (i % parLigne) * (L + 8) + 2, y = Math.floor(i / parLigne) * (H + 8) + 2;
      s += '<rect x="' + x + '" y="' + y + '" width="' + L + '" height="' + H + '" rx="6" class="' + classe + '"/>';
      for (let k = 0; k < compte; k++) s += '<circle cx="' + (x + 13 + (k % col) * 16) + '" cy="' + (y + 13 + Math.floor(k / col) * 16) + '" r="6" class="paquet-objet"/>';
    };
    for (let i = 0; i < nb; i++) boite(i, n, 'paquet');
    if (reste) boite(nb, reste, 'paquet-reste');
    return s + '</svg>';
  }

  function arbre(img) {
    const e = etagesArbre(img.nombre);
    let s = ouvrir('arbre', 220, e.length * 46 + 34, img.description);
    let x = 60;
    e.forEach(([n, p, q], i) => {
      const y = i * 46 + 18;
      if (i === 0) s += '<text x="' + x + '" y="' + y + '" class="arbre-nombre">' + n + '</text>';
      s += '<line x1="' + x + '" y1="' + (y + 5) + '" x2="' + (x - 22) + '" y2="' + (y + 30) + '" class="arbre-branche"/>';
      s += '<line x1="' + x + '" y1="' + (y + 5) + '" x2="' + (x + 22) + '" y2="' + (y + 30) + '" class="arbre-branche"/>';
      s += '<circle cx="' + (x - 24) + '" cy="' + (y + 40) + '" r="12" class="arbre-premier"/><text x="' + (x - 24) + '" y="' + (y + 45) + '" class="arbre-nombre">' + p + '</text>';
      x += 24;
      s += (i === e.length - 1 ? '<circle cx="' + x + '" cy="' + (y + 40) + '" r="12" class="arbre-premier"/>' : '') + '<text x="' + x + '" y="' + (y + 45) + '" class="arbre-nombre">' + q + '</text>';
    });
    return s + '</svg>';
  }

  function doublement(img) {
    const b = img.branches || 2, g = img.generations;
    const larges = b ** g;
    const L = Math.max(200, larges * 14 + 20), pas = 40;
    let s = ouvrir('doublement', L, (g + 1) * pas + 10, img.description);
    for (let i = 0; i <= g; i++) {
      const n = b ** i;
      for (let k = 0; k < n; k++) {
        const x = (L * (k + 0.5)) / n, y = i * pas + 16;
        if (i > 0) { const px = (L * (Math.floor(k / b) + 0.5)) / (n / b); s += '<line x1="' + px + '" y1="' + (y - pas) + '" x2="' + x + '" y2="' + y + '" class="arbre-branche"/>'; }
        s += '<circle cx="' + x + '" cy="' + y + '" r="6" class="paquet-objet"/>';
      }
    }
    return s + '</svg>';
  }

  function echelle(img) {
    const ps = img.reperes.map((r) => r.puissance);
    const min = Math.min(...ps), max = Math.max(...ps);
    const L = 300, x = (p) => 20 + ((p - min) / Math.max(1, max - min)) * (L - 40);
    const lignes = img.reperes.length;
    let s = ouvrir('echelle', L, 60 + lignes * 18, img.description);
    s += '<line x1="10" y1="40" x2="' + (L - 10) + '" y2="40" class="echelle-axe"/>';
    for (let p = min; p <= max; p++) s += '<line x1="' + x(p) + '" y1="34" x2="' + x(p) + '" y2="46" class="echelle-trait"/>';
    s += '<text x="' + x(min) + '" y="24" class="echelle-texte">10<tspan dy="-6" font-size="70%">' + (min < 0 ? '−' + -min : min) + '</tspan></text>';
    s += '<text x="' + x(max) + '" y="24" class="echelle-texte">10<tspan dy="-6" font-size="70%">' + (max < 0 ? '−' + -max : max) + '</tspan></text>';
    img.reperes.forEach((r, i) => {
      s += '<circle cx="' + x(r.puissance) + '" cy="40" r="5" class="echelle-point"/>';
      s += '<text x="' + Math.min(L - 60, Math.max(4, x(r.puissance) - 20)) + '" y="' + (66 + i * 18) + '" class="echelle-nom">' + r.nom + '</text>';
    });
    return s + '</svg>';
  }

  function barres(img) {
    const max = Math.max(...img.barres.map((b) => b.parts));
    const c = Math.min(28, Math.floor(200 / max));
    let s = ouvrir('barres', 300, img.barres.length * 44 + 8, img.description);
    img.barres.forEach((b, i) => {
      const y = i * 44 + 8;
      s += '<text x="4" y="' + (y + 20) + '" class="barre-nom">' + b.nom + '</text>';
      for (let k = 0; k < b.parts; k++) s += '<rect x="' + (90 + k * c) + '" y="' + y + '" width="' + c + '" height="28" class="barre-part' + (i % 2 ? ' autre' : '') + '"/>';
    });
    return s + '</svg>';
  }

  // ---------- Bloc physique-chimie « La matière » ----------

  /** Les particules d'un état : solide rangé et serré, liquide serré en désordre, gaz dispersé. Positions fixes, faites en code. */
  function particules(img) {
    const pts = [];
    if (img.etat === 'solide') for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) pts.push([50 + k * 20, 60 + r * 20]);
    else if (img.etat === 'liquide') for (let i = 0; i < 24; i++) pts.push([48 + ((i * 47) % 104) + (i % 3) * 3, 140 - Math.floor(i / 6) * 19 - ((i * 7) % 5)]);
    else for (let i = 0; i < 8; i++) pts.push([30 + ((i * 61) % 150), 25 + ((i * 43) % 120)]);
    let s = ouvrir('particules', 210, 165, img.description);
    s += '<rect x="20" y="10" width="170" height="145" rx="6" class="recipient"/>';
    for (const [x, y] of pts) s += '<circle cx="' + x + '" cy="' + y + '" r="9" class="particule"/>';
    return s + '</svg>';
  }

  /** Une balance à deux plateaux : elle penche du côté le plus lourd ; chaque plateau porte son nom et sa masse. */
  function balance(img) {
    const d = Math.sign((img.masseG || 0) - (img.masseD || 0)) * 10;
    let s = ouvrir('balance', 260, 170, img.description);
    s += '<rect x="122" y="40" width="16" height="110" class="balance-pied"/><rect x="80" y="150" width="100" height="10" class="balance-pied"/>';
    s += '<line x1="40" y1="' + (40 + d) + '" x2="220" y2="' + (40 - d) + '" class="balance-fleau"/>';
    [[40, 40 + d, img.gauche, img.masseG], [220, 40 - d, img.droite, img.masseD]].forEach(([x, y, nom, m]) => {
      s += '<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y + 40) + '" class="balance-fil"/>';
      s += '<path d="M' + (x - 34) + ',' + (y + 40) + ' Q' + x + ',' + (y + 62) + ' ' + (x + 34) + ',' + (y + 40) + ' Z" class="balance-plateau"/>';
      s += '<text x="' + x + '" y="' + (y + 80) + '" class="dessin-legende">' + (nom || '') + '</text>';
      if (m !== undefined) s += '<text x="' + x + '" y="' + (y + 96) + '" class="dessin-legende">' + String(m).replace('.', ',') + ' g</text>';
    });
    return s + '</svg>';
  }

  /** L'échelle de pH de 0 à 14, avec ses trois zones écrites et des repères nommés. */
  function ph(img) {
    const x = (v) => 15 + v * 19;
    const reperes = img.reperes || [];
    let s = ouvrir('echelle-ph', 300, 92 + reperes.length * 16, img.description);
    s += '<rect x="' + x(0) + '" y="30" width="' + (x(7) - x(0)) + '" height="16" class="ph-acide"/>';
    s += '<rect x="' + x(7) + '" y="30" width="' + (x(14) - x(7)) + '" height="16" class="ph-basique"/>';
    for (let v = 0; v <= 14; v++) s += '<line x1="' + x(v) + '" y1="46" x2="' + x(v) + '" y2="52" class="echelle-trait"/><text x="' + x(v) + '" y="64" class="dessin-petit">' + v + '</text>';
    s += '<text x="' + x(3) + '" y="22" class="dessin-legende">acide</text><text x="' + x(7) + '" y="22" class="dessin-legende">neutre</text><text x="' + x(11) + '" y="22" class="dessin-legende">basique</text>';
    s += '<line x1="' + x(7) + '" y1="26" x2="' + x(7) + '" y2="50" class="ph-neutre"/>';
    reperes.forEach((r, i) => {
      s += '<path d="M' + x(r.ph) + ',70 l-5,8 l10,0 Z" class="echelle-point"/><text x="' + Math.min(250, Math.max(30, x(r.ph))) + '" y="' + (90 + i * 16) + '" class="dessin-legende">' + r.nom + '</text>';
    });
    return s + '</svg>';
  }

  /** Un atome, sans échelle : le noyau (protons et neutrons écrits) et ses électrons sur un cercle. */
  function atome(img) {
    const e = img.electrons || 0;
    let s = ouvrir('atome', 220, 200, img.description);
    s += '<circle cx="110" cy="95" r="70" class="atome-nuage"/>';
    for (let k = 0; k < e; k++) {
      const a = (2 * Math.PI * k) / Math.max(1, e) - Math.PI / 2;
      const ex = +(110 + 70 * Math.cos(a)).toFixed(1), ey = +(95 + 70 * Math.sin(a)).toFixed(1);
      s += '<circle cx="' + ex + '" cy="' + ey + '" r="7" class="electron"/><text x="' + ex + '" y="' + (ey + 4) + '" class="dessin-petit electron-signe">−</text>';
    }
    s += '<circle cx="110" cy="95" r="24" class="noyau"/>';
    s += '<text x="110" y="92" class="dessin-petit">' + (img.protons || 0) + ' p⁺</text><text x="110" y="106" class="dessin-petit">' + (img.neutrons || 0) + ' n</text>';
    s += '<text x="110" y="190" class="dessin-petit">Dessin pas à l’échelle : le noyau est bien plus petit.</text>';
    return s + '</svg>';
  }

  // Les 18 premiers éléments, rangés en 3 lignes de 8 colonnes (colonnes 1, 2, puis 13 à 18 du tableau complet).
  const ELEMENTS = [['H', 1, 0, 0], ['He', 2, 0, 7], ['Li', 3, 1, 0], ['Be', 4, 1, 1], ['B', 5, 1, 2], ['C', 6, 1, 3], ['N', 7, 1, 4], ['O', 8, 1, 5], ['F', 9, 1, 6], ['Ne', 10, 1, 7],
    ['Na', 11, 2, 0], ['Mg', 12, 2, 1], ['Al', 13, 2, 2], ['Si', 14, 2, 3], ['P', 15, 2, 4], ['S', 16, 2, 5], ['Cl', 17, 2, 6], ['Ar', 18, 2, 7]];

  /** Le début du tableau périodique : numéro atomique en petit, symbole en grand ; l'élément surligné a un cadre épais. */
  function tableau(img) {
    let s = ouvrir('tableau', 300, 120, img.description);
    for (const [sym, z, l, c] of ELEMENTS) {
      const x = 4 + c * 37, y = 4 + l * 38;
      s += '<rect x="' + x + '" y="' + y + '" width="35" height="36" class="case-element' + (sym === img.surligne ? ' surligne' : '') + '"/>';
      s += '<text x="' + (x + 4) + '" y="' + (y + 11) + '" class="element-z">' + z + '</text><text x="' + (x + 17) + '" y="' + (y + 29) + '" class="element-symbole">' + sym + '</text>';
    }
    return s + '</svg>';
  }

  /** Un tube à essai et son contenu ; un liquide trouble est pointillé, et l'aspect est écrit sous le tube. */
  function tube(img) {
    let s = ouvrir('tube', 160, 190, img.description);
    s += '<path d="M60,10 L60,140 Q80,165 100,140 L100,10" class="tube-verre"/>';
    s += '<path d="M61,70 L61,140 Q80,163 99,140 L99,70 Z" class="liquide liquide-' + (img.aspect || 'clair') + '"/>';
    if (img.aspect === 'trouble') for (let k = 0; k < 14; k++) s += '<circle cx="' + (66 + ((k * 13) % 30)) + '" cy="' + (78 + ((k * 23) % 60)) + '" r="2" class="trouble"/>';
    s += '<text x="80" y="182" class="dessin-legende">' + (img.legende || '') + '</text>';
    return s + '</svg>';
  }

  // ---------- Bloc SVT « Le corps humain et la santé » ----------

  /** Une chaîne de cases reliées par des flèches, de haut en bas (le trajet d'un message, d'un aliment…). */
  function chaine(img) {
    const n = img.etapes.length;
    let s = ouvrir('chaine', 300, n * 52, img.description);
    img.etapes.forEach((t, i) => {
      const y = i * 52 + 4;
      s += '<rect x="30" y="' + y + '" width="240" height="32" rx="8" class="chaine-case"/><text x="150" y="' + (y + 21) + '" class="' + (t.length > 34 ? 'dessin-petit' : 'dessin-legende') + '">' + t + '</text>';
      if (i < n - 1) s += '<path d="M150,' + (y + 34) + ' l0,12 m-6,-6 l6,6 l6,-6" class="chaine-fleche"/>';
    });
    return s + '</svg>';
  }

  /** Une courbe simple : points reliés, chaque point marqué et sa valeur écrite (la couleur n'est pas le seul indice). */
  function courbe(img) {
    const xs = img.points.map(([x]) => x), ys = img.points.map(([, y]) => y);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(0, ...ys), y1 = Math.max(...ys);
    const X = (x) => 40 + ((x - x0) / Math.max(1, x1 - x0)) * 240, Y = (y) => 160 - ((y - y0) / Math.max(1, y1 - y0)) * 130;
    let s = ouvrir('courbe', 300, 200, img.description);
    s += '<line x1="40" y1="160" x2="285" y2="160" class="echelle-axe"/><line x1="40" y1="160" x2="40" y2="20" class="echelle-axe"/>';
    s += '<polyline points="' + img.points.map(([x, y]) => X(x).toFixed(1) + ',' + Y(y).toFixed(1)).join(' ') + '" class="courbe-ligne"/>';
    for (const [x, y] of img.points) {
      s += '<circle cx="' + X(x).toFixed(1) + '" cy="' + Y(y).toFixed(1) + '" r="4" class="echelle-point"/><text x="' + X(x).toFixed(1) + '" y="' + (Y(y) - 8).toFixed(1) + '" class="dessin-petit">' + String(y).replace('.', ',') + '</text>';
      s += '<text x="' + X(x).toFixed(1) + '" y="174" class="dessin-petit">' + x + '</text>';
    }
    s += '<text x="160" y="194" class="dessin-legende">' + (img.axeX || '') + '</text><text x="4" y="12" class="dessin-petit" style="text-anchor: start">' + (img.axeY || '') + '</text>';
    return s + '</svg>';
  }

  // ---------- Bloc de technologie « Les objets et la société » ----------

  /** L'étiquette énergie : sept classes de A à G, de plus en plus longues ; la classe de l'appareil a un cadre épais et sa lettre
      répétée à droite, et sa consommation est écrite dessous (la couleur n'est pas le seul indice). */
  function etiquette(img) {
    const CLASSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    let s = ouvrir('etiquette', 300, 7 * 26 + 50, img.description);
    if (img.appareil) s += '<text x="150" y="14" class="dessin-legende">' + img.appareil + '</text>';
    CLASSES.forEach((c, i) => {
      const y = 22 + i * 26, l = 70 + i * 22, choisie = c === img.classe;
      s += '<rect x="10" y="' + y + '" width="' + l + '" height="22" class="etiquette-barre etiquette-' + c + (choisie ? ' etiquette-choisie' : '') + '"/>';
      s += '<text x="22" y="' + (y + 16) + '" class="etiquette-lettre">' + c + '</text>';
      if (choisie) s += '<path d="M' + (l + 22) + ',' + (y + 11) + ' l14,-11 l60,0 l0,22 l-60,0 z" class="etiquette-fleche"/><text x="' + (l + 66) + '" y="' + (y + 16) + '" class="etiquette-lettre">' + c + '</text>';
    });
    if (img.kwh) s += '<text x="150" y="' + (22 + 7 * 26 + 16) + '" class="dessin-legende">' + img.kwh + ' kWh par an</text>';
    return s + '</svg>';
  }

  /** L'indice de réparabilité : une note sur 10, écrite en grand, et dix cases dont les pleines comptent les points entiers. */
  function reparabilite(img) {
    const note = img.note, pleines = Math.floor(note);
    let s = ouvrir('reparabilite', 300, 110, img.description);
    if (img.appareil) s += '<text x="150" y="14" class="dessin-legende">' + img.appareil + '</text>';
    s += '<text x="150" y="52" class="reparabilite-note">' + String(note).replace('.', ',') + ' sur 10</text>';
    for (let k = 0; k < 10; k++) s += '<rect x="' + (20 + k * 26) + '" y="66" width="22" height="22" class="reparabilite-case' + (k < pleines ? ' pleine' : '') + '"/>';
    s += '<text x="150" y="104" class="dessin-petit">' + pleines + ' cases pleines sur 10</text>';
    return s + '</svg>';
  }

  // ---------- Bloc « Le calcul avec des lettres » ----------

  /** Un rectangle partagé : ses côtés sont écrits en haut et à gauche, et chaque case porte son aire écrite. */
  function aires(img) {
    const nC = img.colonnes.length, nL = img.lignes.length, c = Math.floor(230 / nC), h = 48;
    let s = ouvrir('aires', 300, nL * h + 34, img.description);
    img.colonnes.forEach((t, j) => { s += '<text x="' + (60 + j * c + c / 2) + '" y="18" class="dessin-legende">' + t + '</text>'; });
    img.lignes.forEach((t, i) => {
      s += '<text x="30" y="' + (30 + i * h + h / 2 + 4) + '" class="dessin-legende">' + t + '</text>';
      img.colonnes.forEach((_, j) => {
        s += '<rect x="' + (60 + j * c) + '" y="' + (26 + i * h) + '" width="' + c + '" height="' + h + '" class="aires-case"/>';
        s += '<text x="' + (60 + j * c + c / 2) + '" y="' + (26 + i * h + h / 2 + 5) + '" class="dessin-legende">' + img.cases[i][j] + '</text>';
      });
    });
    return s + '</svg>';
  }

  // ---------- Bloc « L'électricité » ----------

  /** Une facture d'électricité : une ligne par poste, la dernière en gras ; tout est écrit en toutes lettres. */
  function facture(img) {
    const n = img.lignes.length;
    let s = ouvrir('facture', 300, 34 + n * 26, img.description);
    s += '<rect x="4" y="4" width="292" height="' + (26 + n * 26) + '" rx="4" class="facture-cadre"/><text x="150" y="22" class="dessin-legende">' + (img.titre || 'Facture d’électricité') + '</text>';
    img.lignes.forEach(([nom, valeur], i) => {
      const y = 46 + i * 26, classe = i === n - 1 ? ' facture-total' : '';
      s += '<text x="14" y="' + y + '" class="facture-texte' + classe + '">' + nom + '</text><text x="286" y="' + y + '" class="facture-texte facture-valeur' + classe + '">' + valeur + '</text>';
    });
    return s + '</svg>';
  }

  const fixe = (type, f) => ({
    type,
    dessin: f,
    phrases: () => ({}),
    phrasesDites: () => [],
    monter(conteneur, reglages, dire, fini) { conteneur.innerHTML = f(reglages); fini(); },
  });

  const liste = [fixe('paquets', paquets), fixe('arbre', arbre), fixe('doublement', doublement), fixe('echelle', echelle), fixe('barres', barres),
    fixe('particules', particules), fixe('balance', balance), fixe('ph', ph), fixe('atome', atome), fixe('tableau', tableau), fixe('tube', tube),
    fixe('chaine', chaine), fixe('courbe', courbe), fixe('etiquette', etiquette), fixe('reparabilite', reparabilite), fixe('aires', aires), fixe('facture', facture)];
  liste.etagesArbre = etagesArbre;
  liste.plusPetitFacteur = plusPetitFacteur;
  return liste;
});
