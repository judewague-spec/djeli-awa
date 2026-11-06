/* Habillage commun aux écrans : matière en cours, bulles de Djéli Awa, pastilles, confirmation, chemin, récompense. Aucun texte du contenu ici.
   Les images décoratives sont vides pour le lecteur d'écran : le texte dit déjà tout. */
(function (racine) {
  'use strict';
  const SVG = 'http://www.w3.org/2000/svg';
  const FORMES = { maths: 'losange', physique: 'rond', chimie: 'hexagone', svt: 'feuille', techno: 'triangle' };
  const MOUVEMENT_REDUIT = () => racine.matchMedia && racine.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, attributs, enfants) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attributs || {})) {
      if (k === 'texte') e.textContent = v;
      else if (k === 'classe') e.className = v;
      else e.setAttribute(k, v);
    }
    for (const c of [].concat(enfants || [])) if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    return e;
  }

  // ---------- Matière ----------
  const matiere = () => document.documentElement.dataset.matiere || null;
  function entrerMatiere(id) {
    if (id) document.documentElement.dataset.matiere = id;
    else delete document.documentElement.dataset.matiere;
  }

  /** Le dessin d'une perle, dans la forme de sa matière : la couleur n'est jamais le seul indice. */
  function perle(m, x, y, r) {
    const f = FORMES[m];
    const c = 'perle-forme p-' + (f ? m : 'brevet');
    const pts = (l) => l.map(([a, b]) => (x + a * r).toFixed(1) + ',' + (y + b * r).toFixed(1)).join(' ');
    let forme;
    if (f === 'losange') forme = '<polygon class="' + c + '" points="' + pts([[0, -1.2], [1.2, 0], [0, 1.2], [-1.2, 0]]) + '"/>';
    else if (f === 'hexagone') forme = '<polygon class="' + c + '" points="' + pts([[-0.55, -1], [0.55, -1], [1.1, 0], [0.55, 1], [-0.55, 1], [-1.1, 0]]) + '"/>';
    else if (f === 'triangle') forme = '<polygon class="' + c + '" points="' + pts([[0, -1.2], [1.15, 0.95], [-1.15, 0.95]]) + '"/>';
    else if (f === 'feuille') forme = '<path class="' + c + '" d="M' + (x - r) + ' ' + (y + r) + 'C' + (x - r) + ' ' + (y - r * 0.6) + ' ' + (x - r * 0.2) + ' ' + (y - r) + ' ' + (x + r) + ' ' + (y - r) + 'C' + (x + r) + ' ' + (y + r * 0.6) + ' ' + (x + r * 0.2) + ' ' + (y + r) + ' ' + (x - r) + ' ' + (y + r) + 'z"/>';
    else forme = '<circle class="' + c + '" cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    return forme + '<circle class="perle-reflet" cx="' + (x - r * 0.3).toFixed(1) + '" cy="' + (y - r * 0.35).toFixed(1) + '" r="' + (r * 0.22).toFixed(1) + '"/>';
  }

  /** Une petite icône, décorative. */
  function icone(nom) {
    const d = {
      reglages: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
      croix: '<path d="M6 6l12 12M18 6L6 18"/>',
      retour: '<path d="M15 5l-7 7 7 7"/>',
      maison: '<path d="M3.5 11.5L12 4l8.5 7.5M6 10v9.5h4.5v-5h3v5H18V10"/>',
      pause: '<path d="M9 5v14M15 5v14"/>',
    }[nom];
    const s = document.createElementNS(SVG, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('class', 'ui icone');
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
    s.innerHTML = d;
    return s;
  }

  // ---------- Djéli Awa ----------
  function imageDe(m) {
    const V = racine.Village;
    const q = V && V.quartier(m);
    return q ? q.image : (V ? V.IMAGES.accueil.src : '');
  }

  /** Le petit portrait rond, dans la tenue de la matière. */
  function portrait() {
    return el('div', { classe: 'portrait', 'aria-hidden': 'true' }, [el('img', { src: imageDe(matiere()), alt: '' })]);
  }

  /** Une phrase de Djéli Awa dans sa bulle. reecouter : le bouton Réécouter. */
  function bulle(texte, reecouter) {
    return el('div', { classe: 'parole' }, [
      portrait(),
      el('div', { classe: 'bulle' }, [el('p', {}, [el('span', { classe: 'qui', texte: 'Djéli Awa : ' }), texte]), reecouter]),
    ]);
  }

  // ---------- Pastilles ----------
  /** Les temps de la mission, pour les yeux ; le lecteur d'écran garde « temps n sur 7 ». */
  function pastilles(numero, total) {
    const o = el('div', { classe: 'pastilles', 'aria-hidden': 'true' });
    for (let i = 1; i <= total; i++) {
      o.append(el('span', { classe: 'pastille ' + (i < numero ? 'faite' : i === numero ? 'encours' : ''), texte: i < numero ? '✓' : i === numero ? String(i) : '' }));
    }
    return o;
  }

  // ---------- Confirmation ----------
  /** Une question oui / non, en vraie boîte de dialogue : le focus y reste, puis revient au bouton d'avant. Rend une promesse. */
  function confirmer(titre, texte, oui, non) {
    return new Promise((fin) => {
      const h = el('h2', { id: 'confirmation-titre', texte: titre });
      const p = el('p', { id: 'confirmation-texte', texte });
      const bOui = el('button', { type: 'button', classe: 'secondaire', texte: oui });
      const bNon = el('button', { type: 'button', texte: non });
      const d = el('dialog', { classe: 'confirmation', 'aria-labelledby': 'confirmation-titre', 'aria-describedby': 'confirmation-texte' }, [h, p, el('div', { classe: 'boutons' }, [bNon, bOui])]);
      let reponse = false;
      bOui.addEventListener('click', () => { reponse = true; d.close(); });
      bNon.addEventListener('click', () => d.close());
      d.addEventListener('close', () => { d.remove(); fin(reponse); });
      document.body.append(d);
      d.showModal();
      bNon.focus();
    });
  }

  /** Plusieurs choix en grands boutons, l'un sous l'autre, focus sur le premier ; rend la valeur choisie, ou null. */
  function choisir(titre, texte, choix, annuler) {
    return new Promise((fin) => {
      const h = el('h2', { id: 'choix-titre', texte: titre });
      const p = el('p', { id: 'choix-texte', texte });
      let reponse = null;
      const boutons = choix.map((c) => {
        const b = el('button', { type: 'button', classe: 'choix-grand', texte: c.texte });
        b.addEventListener('click', () => { reponse = c.valeur; d.close(); });
        return b;
      });
      const non = el('button', { type: 'button', classe: 'secondaire choix-grand', texte: annuler || 'Annuler' });
      non.addEventListener('click', () => d.close());
      const d = el('dialog', { classe: 'confirmation choix', 'aria-labelledby': 'choix-titre', 'aria-describedby': 'choix-texte' }, [h, p, el('div', { classe: 'boutons colonne' }, boutons.concat(non))]);
      d.addEventListener('close', () => { d.remove(); fin(reponse); });
      document.body.append(d);
      d.showModal();
      boutons[0].focus();
    });
  }

  /** Une barre d'avancement fine, avec son texte (« 60 % », lu « 60 pour cent ») ; la barre est pour les yeux. */
  function avancement(pourcent, texte) {
    const barre = el('span', { classe: 'avance-barre', 'aria-hidden': 'true' }, [el('span', { classe: 'avance-plein', style: 'width:' + Math.max(0, Math.min(100, pourcent)) + '%' })]);
    return el('span', { classe: 'avance' }, [el('span', { classe: 'avance-texte', texte: texte || (pourcent + '\u202F%') }), barre]);
  }

  // ---------- Chemin ----------
  const SERPENT = [18, 40, 64, 82, 64, 40];

  function cadenas() {
    const s = document.createElementNS(SVG, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('class', 'ui cadenas');
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
    s.innerHTML = '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.2"/>';
    return s;
  }

  /** La pierre d'une étape : une perle si la mission est faite, son numéro si elle est ouverte, un cadenas si elle est fermée. */
  function pierre(etat, numero, m) {
    const p = el('span', { classe: 'pierre', 'aria-hidden': 'true' });
    if (etat === 'faite') {
      const s = document.createElementNS(SVG, 'svg');
      s.setAttribute('viewBox', '0 0 40 40');
      s.setAttribute('class', 'ui');
      s.innerHTML = perle(m, 20, 20, 14);
      p.append(s);
    } else if (etat === 'fermee') p.append(cadenas());
    else p.textContent = numero;
    return p;
  }

  /** Une étape du chemin. action : ce que fait le bouton (absent si l'étape est fermée). note : son état, en mots. */
  function etapeChemin(o) {
    const x = SERPENT[o.rang % SERPENT.length];
    const li = el('li', { classe: 'etape ' + o.etat + (x > 50 ? ' droite' : '') + (o.aReviser ? ' a-reviser' : ''), style: '--x:' + x });
    const nom = el('span', { classe: 'etape-nom' }, [el('span', { classe: 'sr', texte: o.numero + '. ' }), o.titre]);
    // L'avancement de la notion, sous son nom (consigne du 6 nov. 2026).
    if (typeof o.pourcent === 'number') nom.append(el('span', { classe: 'sr', texte: ' : ' }), avancement(o.pourcent));
    if (o.action) {
      const b = el('button', { type: 'button', classe: 'pierre-bouton', 'data-notion': o.id }, [pierre(o.etat, o.numero, o.matiere), el('span', { classe: 'etape-texte' }, [nom, o.note ? el('span', { classe: 'note', texte: o.note }) : null])]);
      b.addEventListener('click', o.action);
      li.append(b);
    } else {
      li.append(pierre(o.etat, o.numero, o.matiere), el('span', { classe: 'etape-texte' }, [nom, o.note ? el('span', { classe: 'note', texte: o.note }) : null]));
    }
    return li;
  }

  /** Trace le chemin derrière les pierres, d'après leur place réelle ; il suit les changements de taille. */
  function tracerChemin(liste) {
    const trace = document.createElementNS(SVG, 'svg');
    trace.setAttribute('class', 'ui chemin-trace');
    trace.setAttribute('aria-hidden', 'true');
    trace.setAttribute('focusable', 'false');
    const chemin = document.createElementNS(SVG, 'path');
    trace.append(chemin);
    const cadre = el('div', { classe: 'chemin-cadre' });
    liste.replaceWith(cadre);
    cadre.append(trace, liste);
    const dessiner = () => {
      const b = cadre.getBoundingClientRect();
      if (!b.width) return;
      const pts = [...liste.querySelectorAll('.pierre')].map((p) => {
        const r = p.getBoundingClientRect();
        return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top];
      });
      let d = '';
      pts.forEach(([x, y], i) => {
        if (!i) { d = 'M' + x + ' ' + y; return; }
        const [a, c] = pts[i - 1];
        d += 'C' + a + ' ' + (c + (y - c) * 0.6) + ' ' + x + ' ' + (y - (y - c) * 0.6) + ' ' + x + ' ' + y;
      });
      chemin.setAttribute('d', d);
    };
    if (racine.ResizeObserver) new racine.ResizeObserver(dessiner).observe(cadre);
    dessiner();
  }

  // ---------- Récompense ----------
  function confettis() {
    if (MOUVEMENT_REDUIT()) return;
    const z = el('div', { classe: 'confettis', 'aria-hidden': 'true' });
    for (let i = 0; i < 36; i++) {
      const c = el('span', { classe: 'confetti wax-' + 'abcde'[i % 5] });
      c.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%');
      c.style.setProperty('--l', (0.8 + Math.random() * 1.2).toFixed(2) + 'rem');
      c.style.setProperty('--d', (2.2 + Math.random() * 1.6).toFixed(2) + 's');
      c.style.setProperty('--r', (Math.random() * 0.9).toFixed(2) + 's');
      c.style.setProperty('--t', Math.round(200 + Math.random() * 500) + 'deg');
      z.append(c);
    }
    document.body.append(z);
    setTimeout(() => z.remove(), 5200);
  }

  function compter(sortie, de, a) {
    if (MOUVEMENT_REDUIT() || de === a) { sortie.textContent = a; return; }
    const debut = performance.now(), duree = 1400;
    sortie.textContent = de;
    const pas = (t) => {
      const k = Math.min(1, (t - debut - 500) / duree);
      if (k > 0) sortie.textContent = Math.round(de + (a - de) * (1 - Math.pow(1 - k, 3)));
      if (k < 1 && sortie.isConnected) racine.requestAnimationFrame(pas);
    };
    racine.requestAnimationFrame(pas);
  }

  /** Le collier de Rachel : ses dernières perles, la nouvelle vient s'y enfiler. */
  function collier(perles, nouvelle) {
    const N = 15, W = 320;
    const vues = perles.slice(-(N - 1)).concat(nouvelle);
    // Une place sur le fil, de gauche à droite.
    const place = (i) => {
      const u = 0.06 + ((i + 0.5) / N) * 0.88;
      return [Math.round((1 - u) * (1 - u) * 10 + 2 * (1 - u) * u * 160 + u * u * 310), Math.round((1 - u) * (1 - u) * 18 + 2 * (1 - u) * u * 118 + u * u * 18)];
    };
    let s = '<path class="collier-fil" d="M10 18 Q160 118 310 18"/>';
    for (let i = 0; i < N; i++) { const [a, b] = place(i); s += '<circle class="perle-vide" cx="' + a + '" cy="' + b + '" r="3.5"/>'; }
    // Le collier se remplit depuis le milieu du fil, puis des deux côtés.
    const milieu = (N - 1) / 2;
    const ordre = (i) => milieu + (i % 2 ? (i + 1) / 2 : -i / 2);
    vues.forEach((m, i) => {
      const [x, y] = place(ordre(i));
      const d = perle(m, x, y, 10);
      if (i === vues.length - 1) s += '<circle class="perle-halo" cx="' + x + '" cy="' + y + '" r="15"/><g class="perle-nouvelle">' + d + '</g>';
      else s += d;
    });
    const o = document.createElementNS(SVG, 'svg');
    o.setAttribute('viewBox', '0 -20 ' + W + ' 110');
    o.setAttribute('class', 'ui collier');
    o.setAttribute('aria-hidden', 'true');
    o.setAttribute('focusable', 'false');
    o.innerHTML = s;
    return o;
  }

  function cauri() {
    const s = document.createElementNS(SVG, 'svg');
    s.setAttribute('viewBox', '0 0 40 40');
    s.setAttribute('class', 'ui');
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
    s.innerHTML = '<ellipse class="cauri-corps" cx="20" cy="20" rx="13" ry="18"/><path class="cauri-fente" d="M20 6C17 14 23 26 20 34M15 12h4M15 18h4M15 24h4M21 15h4M21 21h4M21 27h4"/>';
    return s;
  }

  /** La scène de la récompense. o : perles (les matières déjà gagnées), points (avant), gain. */
  function sceneRecompense(o) {
    const m = matiere();
    const total = el('span', { classe: 'compteur-nombre', 'aria-hidden': 'true', texte: String(o.points) });
    const scene = el('div', { classe: 'scene-recompense' }, [
      el('div', { classe: 'scene-haut' }, [
        el('div', { classe: 'scene-djeli', 'aria-hidden': 'true' }, [el('img', { src: imageDe(m), alt: '' })]),
        el('div', {}, [
          el('div', { classe: 'compteur' }, [cauri(), total]),
          el('span', { classe: 'compteur-mot', 'aria-hidden': 'true', texte: 'cauris' }),
        ]),
      ]),
      collier(o.perles, m),
      el('p', { classe: 'sr', texte: 'Tu as maintenant ' + (o.points + o.gain) + ' cauris et ' + (o.perles.length + 1) + (o.perles.length ? ' perles' : ' perle') + ' sur ton collier.' }),
    ]);
    compter(total, o.points, o.points + o.gain);
    confettis();
    return scene;
  }

  racine.Habillage = { el, matiere, entrerMatiere, perle, icone, portrait, bulle, pastilles, confirmer, choisir, avancement, etapeChemin, tracerChemin, sceneRecompense, FORMES, SERPENT };
})(typeof window !== 'undefined' ? window : globalThis);
