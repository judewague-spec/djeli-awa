/* Manipulation « pizza à couper » (SPEC.md, sections 3 et 5).
   Elle coupe au doigt en touchant le bord ; si les parts sont inégales, un ami râle gentiment.
   Alternative par boutons pour le lecteur d'écran : des coupes toujours égales, et une liste de parts à cocher.
   Les calculs (tailles des parts, égalité) sont séparés de l'affichage pour être testés dans Node.
   Elle suit le contrat commun des manipulations (js/manipulations/commun.js). */
(function (racine, fabrique) {
  const P = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = P;
  else {
    racine.ManipPizza = P;
    if (racine.Manipulations) racine.Manipulations.enregistrer(P);
  }
})(this, function () {
  'use strict';

  const TOLERANCE = 0.25; // écart permis entre la plus grande et la plus petite part, en part de la moyenne
  const ECART_MIN = 6; // deux coupes plus proches que 6 degrés n'en font qu'une
  const PARTS_MAX = 16; // au-delà, plus de coupe : chaque nombre de parts a son son (voix/app)

  // ---------- Calculs ----------

  /** Tailles des parts en degrés, pour des coupes données en degrés (0 en haut, sens des aiguilles). */
  function taillesDesParts(coupes) {
    if (coupes.length < 2) return [360];
    const a = coupes.slice().sort((x, y) => x - y);
    return a.map((x, i) => (i < a.length - 1 ? a[i + 1] - x : 360 - x + a[0]));
  }

  function partsEgales(tailles, tolerance = TOLERANCE) {
    const moyenne = 360 / tailles.length;
    return Math.max(...tailles) - Math.min(...tailles) <= tolerance * moyenne;
  }

  /** n parts égales (n coupes), en partant du haut ; une seule part = aucune coupe. */
  function coupesEgales(n) {
    if (n < 2) return [];
    return Array.from({ length: n }, (_, i) => (360 * i) / n);
  }

  /** Angle (degrés, 0 en haut, sens des aiguilles) du point (x, y) vu du centre. */
  function angleDuPoint(x, y) {
    return (Math.atan2(x, -y) * 180 / Math.PI + 360) % 360;
  }

  /** Ajoute une coupe, sauf si elle tombe sur une coupe existante. */
  function ajouterCoupe(coupes, angle) {
    const proche = coupes.some((c) => { const d = Math.abs(c - angle) % 360; return Math.min(d, 360 - d) < ECART_MIN; });
    return proche || coupes.length >= PARTS_MAX ? coupes : coupes.concat(angle).sort((x, y) => x - y);
  }

  // ---------- Dessin ----------

  const R = 100;
  const point = (angle, r = R) => {
    const a = (angle * Math.PI) / 180;
    return [+(r * Math.sin(a)).toFixed(2), +(-r * Math.cos(a)).toFixed(2)];
  };

  function cheminPart(debut, fin) {
    const [x1, y1] = point(debut);
    const [x2, y2] = point(fin);
    const grand = fin - debut > 180 ? 1 : 0;
    return 'M0,0 L' + x1 + ',' + y1 + ' A' + R + ',' + R + ' 0 ' + grand + ' 1 ' + x2 + ',' + y2 + ' Z';
  }

  /** Les parts : [{ debut, fin }], dans l'ordre des coupes. */
  function partsDepuisCoupes(coupes) {
    if (coupes.length < 2) return [{ debut: 0, fin: 360 }];
    const a = coupes.slice().sort((x, y) => x - y);
    return a.map((x, i) => ({ debut: x, fin: i < a.length - 1 ? a[i + 1] : a[0] + 360 }));
  }

  const PEPPERONI = [[0, -55], [40, -30], [-45, -20], [20, 15], [-25, 45], [55, 40], [-60, 25], [5, 70], [30, -70], [-30, -65]];

  /** Le dessin SVG (texte) : parts mangées en assiette vide, au contour pointillé (la couleur n'est pas le seul indice). */
  function svg(coupes, mangees = [], description = '') {
    const parts = partsDepuisCoupes(coupes);
    let s = '<svg class="pizza" viewBox="-115 -115 230 230" role="img" aria-label="' + description.replace(/"/g, '&quot;') + '">';
    s += '<circle r="112" class="pizza-assiette"/>';
    s += '<defs><clipPath id="pizza-garniture"><circle r="88"/></clipPath></defs>';
    parts.forEach((p, i) => {
      const mangee = mangees.includes(i);
      const forme = parts.length === 1
        ? '<circle r="' + R + '" '
        : '<path d="' + cheminPart(p.debut, p.fin) + '" ';
      s += forme + 'class="pizza-part' + (mangee ? ' mangee' : '') + '" data-part="' + i + '"/>';
    });
    if (!mangees.length || mangees.length < parts.length) {
      s += '<g clip-path="url(#pizza-garniture)" pointer-events="none">';
      for (const [x, y] of PEPPERONI) {
        const ang = angleDuPoint(x, y);
        const i = parts.findIndex((p) => (ang >= p.debut && ang < p.fin) || (ang + 360 >= p.debut && ang + 360 < p.fin));
        if (!mangees.includes(i)) s += '<circle cx="' + x + '" cy="' + y + '" r="9" class="pizza-pepperoni"/>';
      }
      s += '</g>';
    }
    if (coupes.length >= 2) {
      for (const c of coupes) {
        const [x, y] = point(c);
        s += '<line x1="0" y1="0" x2="' + x + '" y2="' + y + '" class="pizza-coupe"/>';
      }
    }
    return s + '</svg>';
  }

  /** Les parts mangées pour un dessin statique : les premières dans l'ordre. */
  function svgStatique(nbParts, nbMangees, description) {
    return svg(coupesEgales(nbParts), Array.from({ length: nbMangees }, (_, i) => i), description);
  }

  /** Phrases de la manipulation (aussi utilisées pour fabriquer les voix). Celles qui dépendent du nombre de parts
      coupées par l'élève ont une version parlée sans ce nombre (« …Parle ») : le nombre exact reste écrit à l'écran. */
  function phrases(reglages) {
    const consigneManger = (reglages.histoire ? reglages.histoire + ' ' : '') + reglages.mangeur + ' mange ' + reglages.mangees +
      ' parts. Touche les ' + reglages.mangees + ' parts qu’il mange.';
    return {
      inegales: '« Hé ! Ma part est plus petite que celle de ' + reglages.mangeur + ' ! », râle Ibrahim en riant. Les parts doivent être égales.',
      consigneManger,
      egales: 'Bravo, ' + reglages.parts + ' parts égales ! ' + consigneManger,
      fini: reglages.mangeur + ' a mangé ' + reglages.mangees + ' parts sur ' + reglages.parts + '. Il en reste ' + (reglages.parts - reglages.mangees) + ' pour les autres.',
      parts: (n) => (n === 1 ? 'La pizza n’est pas encore coupée.' : 'La pizza a ' + n + ' parts.'),
      partsParle: (n) => (n === 1 ? 'La pizza n’est pas encore coupée.' : 'La pizza est coupée. Le nombre de parts est écrit à l’écran.'),
      egalisees: (n) => 'Voilà ' + n + ' parts bien égales.',
      egaliseesParle: (n) => (n === reglages.parts ? 'Voilà ' + n + ' parts bien égales.' : 'Voilà des parts bien égales.'),
      ilFaut: (n) => 'Il faut ' + reglages.parts + ' parts : deux pour chacun des quatre amis. Là, il y en a ' + n + '.',
      ilFautParle: () => 'Il faut ' + reglages.parts + ' parts : deux pour chacun des quatre amis. Là, ce n’est pas le bon nombre.',
      mangees: (k) => k + ' parts mangées sur les ' + reglages.mangees + ' de ' + reglages.mangeur + '.',
      mangeesParle: () => 'Continue : touche les parts que ' + reglages.mangeur + ' mange.',
    };
  }

  // ---------- La manipulation dans la page ----------

  const racineVoix = () => (typeof window !== 'undefined' && window.Voix) || null;

  /** Monte la manipulation dans conteneur. reglages : { parts, mangees, mangeur, histoire }.
      histoire (facultative) explique, une fois la pizza partagée, pourquoi le mangeur prend ce nombre de parts.
      dire(texte) annonce au lecteur d'écran ; fini() est appelé quand la pizza est coupée et partagée. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    let coupes = [];
    let phase = 'couper';
    let mangees = [];

    conteneur.innerHTML =
      '<div class="pizza-cadre"></div>' +
      '<p class="pizza-etat" aria-live="polite"></p>' +
      '<div class="boutons pizza-boutons"></div>' +
      '<fieldset class="pizza-liste" hidden><legend></legend><div class="boutons"></div></fieldset>';
    const cadre = conteneur.querySelector('.pizza-cadre');
    const etat = conteneur.querySelector('.pizza-etat');
    const boutons = conteneur.querySelector('.pizza-boutons');
    const liste = conteneur.querySelector('.pizza-liste');

    const nbParts = () => taillesDesParts(coupes).length;
    function bouton(texte, action, parent = boutons) {
      const b = doc.createElement('button');
      b.type = 'button';
      b.textContent = texte;
      b.addEventListener('click', action);
      parent.appendChild(b);
      return b;
    }

    function description() {
      const n = nbParts();
      if (phase === 'couper') return n === 1 ? 'La pizza entière, pas encore coupée.' : 'La pizza coupée en ' + n + ' parts' + (partsEgales(taillesDesParts(coupes)) ? ' égales.' : ' qui ne sont pas toutes égales.');
      return 'La pizza coupée en ' + n + ' parts égales ; ' + mangees.length + ' parts mangées par ' + reglages.mangeur + '.';
    }

    function dessiner() {
      cadre.innerHTML = svg(coupes, mangees, description());
    }

    // La voix dit l'état de la pizza en même temps que son sous-titre (déjà annoncé au lecteur d'écran par aria-live).
    // etat.dataset.parle garde ce que dit la voix, pour « Réécouter ».
    const parler = (texte) => { etat.dataset.parle = texte; if (racineVoix()) racineVoix().lire(texte); };
    const afficher = (affiche, parle) => { etat.textContent = affiche; etat.dataset.parle = parle || affiche; };

    function changer(nouvelles, annonce, sansVoix, annonceParlee) {
      coupes = nouvelles;
      if (!annonce) boutonEgaliser.hidden = true; // « Égaliser » ne sert que juste après des parts inégales
      dessiner();
      afficher(annonce || phrases(reglages).parts(nbParts()), annonce ? annonceParlee : phrases(reglages).partsParle(nbParts()));
      if (!sansVoix) parler(etat.dataset.parle);
    }

    cadre.addEventListener('click', (e) => {
      const s = cadre.querySelector('svg');
      if (!s) return;
      const r = s.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 230 - 115;
      const y = ((e.clientY - r.top) / r.height) * 230 - 115;
      if (phase === 'couper') {
        changer(ajouterCoupe(coupes, angleDuPoint(x, y)));
      } else if (phase === 'manger') {
        const cible = e.target.closest && e.target.closest('[data-part]');
        if (cible) basculer(Number(cible.getAttribute('data-part')));
      }
    });

    function partager() {
      const n = nbParts();
      if (n !== reglages.parts) {
        afficher(phrases(reglages).ilFaut(n), phrases(reglages).ilFautParle(n));
        dire(etat.textContent, etat.dataset.parle);
        return;
      }
      if (!partsEgales(taillesDesParts(coupes))) {
        afficher(phrases(reglages).inegales);
        dire(etat.textContent);
        boutonEgaliser.hidden = false;
        return;
      }
      coupes = coupesEgales(n); // on range les coupes bien droites
      passerAManger();
    }

    function passerAManger() {
      phase = 'manger';
      boutons.innerHTML = '';
      liste.hidden = false;
      liste.querySelector('legend').textContent = phrases(reglages).consigneManger;
      const zone = liste.querySelector('.boutons');
      zone.innerHTML = '';
      for (let i = 0; i < reglages.parts; i++) {
        const b = bouton('Part ' + (i + 1), () => basculer(i), zone);
        b.setAttribute('aria-pressed', 'false');
        b.dataset.part = i;
      }
      dessiner();
      afficher(phrases(reglages).egales);
      dire(etat.textContent);
    }

    function basculer(i) {
      if (phase !== 'manger') return;
      if (mangees.includes(i)) mangees = mangees.filter((x) => x !== i);
      else if (mangees.length < reglages.mangees) mangees = mangees.concat(i);
      liste.querySelectorAll('[data-part]').forEach((b) => b.setAttribute('aria-pressed', String(mangees.includes(Number(b.dataset.part)))));
      dessiner();
      if (mangees.length === reglages.mangees) {
        phase = 'fini';
        liste.querySelectorAll('button').forEach((b) => { b.disabled = true; });
        afficher(phrases(reglages).fini);
        dire(etat.textContent);
        fini();
      } else {
        afficher(phrases(reglages).mangees(mangees.length));
        parler(phrases(reglages).mangeesParle(mangees.length));
      }
    }

    bouton('Une part de plus, bien égale', () => changer(coupesEgales(Math.min(PARTS_MAX, nbParts() + 1))));
    bouton('Une part de moins', () => changer(coupesEgales(Math.max(1, nbParts() - 1))));
    bouton('Recommencer', () => { boutonEgaliser.hidden = true; changer([]); });
    const boutonEgaliser = bouton('Égaliser les parts', () => { boutonEgaliser.hidden = true; changer(coupesEgales(nbParts()), phrases(reglages).egalisees(nbParts()), false, phrases(reglages).egaliseesParle(nbParts())); });
    boutonEgaliser.hidden = true;
    bouton('Partager entre les amis', partager);
    // « Réécouter » relit la dernière phrase de Djéli Awa (ou l'état de la pizza).
    if (racineVoix()) etat.insertAdjacentElement('afterend', racineVoix().boutonReecouter(() => etat.dataset.parle || etat.textContent));
    changer([], null, true); // au départ, la voix finit de lire la consigne

    // Pour les tests dans la page : état courant.
    return { etat: () => ({ phase, coupes: coupes.slice(), mangees: mangees.slice() }) };
  }

  /** Le dessin fixe d'une image de notion { dessin: 'pizza', parts, mangees, description }. */
  const dessin = (img) => svgStatique(img.parts, img.mangees, img.description);

  return { type: 'pizza', TOLERANCE, PARTS_MAX, dessin, taillesDesParts, partsEgales, coupesEgales, angleDuPoint, ajouterCoupe, partsDepuisCoupes, svg, svgStatique, phrases, monter };
});
