/* Une question, partout la même (consignes du 6 nov. 2026, 21 h 30 à 21 h 51) : test de départ, mission, matin, soir, révision.
   - Réponses à choix : boutons radio ; toucher une réponse la sélectionne seulement (« Ton choix »), on peut changer d'avis ;
     « Valider », juste sous les réponses, reste désactivé tant que rien n'est choisi.
   - Réponse à taper : on corrige librement jusqu'à « Vérifier ».
   - Après la réponse : un verdict vu et entendu, « Juste ! » ou « Pas encore », la bonne réponse, une phrase de correction,
     puis « Voir l'explication » (fermé). Le choix reste marqué « Ton choix » avec ✓ ou ✗, la bonne réponse « Bonne réponse » :
     jamais la couleur seule, toujours une icône et un mot ; rien n'est grisé.
   - Juste : les quatre boutons d'Anki (sans délai écrit) ; Pas encore : « J'ai compris, question suivante ». */
(function (racine) {
  'use strict';

  function el(tag, attributs, enfants) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attributs || {})) {
      if (k === 'texte') e.textContent = v;
      else if (k === 'classe') e.className = v;
      else e.setAttribute(k, v);
    }
    for (const c of [].concat(enfants || [])) if (c) e.appendChild(c);
    return e;
  }

  let compteur = 0;

  /** La première phrase d'un texte, et le reste (ou ''). */
  function premierePhrase(texte) {
    const t = String(texte || '').trim();
    const r = /^(.+?[.!?…])\s+(\S[\s\S]*)$/.exec(t);
    return r ? [r[1], r[2]] : [t, ''];
  }

  /** Un texte court : la première phrase visible, le reste derrière « En savoir plus » (fermé). ouvert : ouvert d'emblée. */
  function texteCourt(texte, ouvert, etiquette) {
    const [a, b] = premierePhrase(texte);
    const p = el('p', { texte: a });
    if (!b) return p;
    const d = el('details', { classe: 'en-savoir-plus' }, [el('summary', { texte: etiquette || 'En savoir plus' }), el('p', { texte: b })]);
    if (ouvert) d.open = true;
    return el('div', { classe: 'texte-court' }, [p, d]);
  }

  /** La correction : une phrase, puis « Voir l'explication » (fermé) avec les autres étapes. */
  function correction(etapes) {
    const l = (etapes || []).filter(Boolean);
    if (!l.length) return null;
    const z = el('div', { classe: 'correction-courte' }, [el('p', { texte: l[0] })]);
    if (l.length > 1) z.append(el('details', { classe: 'explication' }, [el('summary', { texte: 'Voir l’explication' }), el('ol', { classe: 'correction' }, l.slice(1).map((t) => el('li', { texte: t })))]));
    return z;
  }

  /** Pose une question dans corps.
      q : { reponse ({ type, options, valeur }), grille?, correction? }.
      o : repondre(saisie) → vrai si juste (le moteur note la réponse) ; attendu : la bonne réponse en mots ;
          reaction(juste) → la phrase de Djéli Awa dite avec le verdict ; dire(texte) la lit ;
          faux() : appelé dès une réponse fausse (la question est marquée « À revoir ») ;
          suite(note) : après le choix d'Anki, ou « J'ai compris » (note « revoir ») ;
          deja : { juste, saisie } si la question était déjà répondue (séance reprise) ; sansAnki : seulement « Question suivante ». */
  function poser(corps, q, o) {
    const id = 'q' + (++compteur);
    const verdict = el('div', { classe: 'verdict-zone', 'aria-live': 'polite' });
    const suite = el('div', { classe: 'suite-question' });
    let fini = false;

    function conclure(juste, saisie, sansParler) {
      if (fini) return;
      fini = true;
      const phrase = o.reaction ? o.reaction(juste) : '';
      const bloc = el('div', { classe: 'retour-parle verdict ' + (juste ? 'juste' : 'faux') });
      bloc.append(el('p', { classe: 'verdict-mot' }, [el('span', { classe: 'marque', 'aria-hidden': 'true', texte: juste ? '✓' : '✗' }), document.createTextNode(juste ? 'Juste !' : 'Pas encore')]));
      if (phrase) bloc.append(el('p', { classe: 'verdict-phrase', texte: phrase }));
      if (!juste && o.attendu) bloc.append(el('p', { classe: 'bonne-reponse', texte: 'La bonne réponse : ' + o.attendu + '.' }));
      if (phrase) bloc.append(racine.Voix.boutonReecouter(phrase));
      verdict.replaceChildren(bloc);
      const c = correction(q.grille ? null : q.correction);
      if (c) verdict.append(c);
      if (!juste && o.faux) o.faux();
      let b;
      if (juste && !o.sansAnki) b = racine.VueAnki.boutons(null, (note) => o.suite(note));
      else b = racine.VueAnki.compris(() => o.suite(juste ? 'bien' : 'revoir'), juste ? 'Question suivante' : null);
      suite.replaceChildren(b);
      b.montrer();
      if (phrase && !sansParler) o.dire(phrase);
    }

    // ---------- Réponse rédigée sur le cahier, vérifiée avec une grille ----------
    if (q.grille) {
      corps.append(el('p', { classe: 'papier', texte: '✎ Rédige ta réponse sur ton cahier, puis regarde la correction.' }));
      const voir = el('button', { type: 'button', texte: 'Voir la correction' });
      const zone = el('div', { classe: 'grille-zone' });
      voir.addEventListener('click', () => {
        voir.remove();
        const cases = q.grille.map((critere, i) => el('div', { classe: 'critere' }, [el('input', { type: 'checkbox', id: id + '-c' + i }), el('label', { for: id + '-c' + i, texte: critere })]));
        const grille = el('fieldset', { classe: 'grille' }, [el('legend', { texte: 'Coche ce que tu as fait.' })].concat(cases));
        const ok = el('button', { type: 'button', texte: 'J’ai vérifié' });
        ok.addEventListener('click', () => {
          ok.remove();
          const coches = cases.map((d) => d.querySelector('input').checked);
          grille.querySelectorAll('input').forEach((x) => { x.disabled = true; });
          conclure(!!o.repondre(coches), coches);
        });
        zone.append(el('ol', { classe: 'correction' }, (q.correction || []).map((t) => el('li', { texte: t }))), grille, ok);
        grille.querySelector('input').focus();
      });
      corps.append(voir, zone, verdict, suite);
      if (o.deja) { voir.remove(); conclure(o.deja.juste, null, true); }
      return;
    }

    // ---------- Réponses à choix : boutons radio, « Valider » ----------
    if (q.reponse.type === 'choix') {
      const champs = el('fieldset', { classe: 'choix-radio' }, [el('legend', { classe: 'sr', texte: 'Réponses possibles' })]);
      const valider = el('button', { type: 'button', classe: 'valider', texte: 'Valider', disabled: '' });
      const lignes = q.reponse.options.map((texte, i) => {
        const r = el('input', { type: 'radio', name: id, id: id + '-' + i, value: String(i) });
        const marque = el('span', { classe: 'choix-marque' });
        const l = el('label', { for: id + '-' + i, classe: 'choix-ligne' }, [r, el('span', { classe: 'choix-texte', texte }), marque]);
        r.addEventListener('change', () => {
          if (fini) return;
          lignes.forEach((x) => { x.l.classList.toggle('choisi', x.r.checked); x.marque.textContent = x.r.checked ? '✓ Ton choix' : ''; });
          valider.disabled = false;
        });
        champs.append(l);
        return { r, l, marque };
      });
      const marquer = (choix) => {
        lignes.forEach((x, i) => {
          x.r.disabled = true;
          x.l.classList.add('valide');
          const bonne = i === q.reponse.valeur, sienne = i === choix;
          x.l.classList.toggle('choisi', sienne);
          x.l.classList.toggle('bonne', bonne);
          const mots = [];
          if (sienne) mots.push((bonne ? '✓' : '✗') + ' Ton choix');
          if (bonne) mots.push((sienne ? '' : '✓ ') + 'Bonne réponse');
          x.marque.textContent = mots.join(', ');
          if (sienne) x.r.checked = true;
        });
      };
      valider.addEventListener('click', () => {
        const x = lignes.findIndex((y) => y.r.checked);
        if (x < 0 || fini) return;
        valider.remove();
        marquer(x);
        conclure(!!o.repondre(x), x);
      });
      corps.append(champs, valider, verdict, suite);
      if (o.deja) { valider.remove(); marquer(typeof o.deja.saisie === 'number' ? o.deja.saisie : -1); conclure(o.deja.juste, o.deja.saisie, true); }
      return;
    }

    // ---------- Réponse à taper : « Vérifier » ----------
    const champ = el('input', { type: 'text', id, inputmode: q.reponse.type === 'fraction' ? 'text' : 'decimal', autocomplete: 'off', spellcheck: 'false' });
    const verifier = el('button', { type: 'submit', texte: 'Vérifier' });
    const form = el('form', { classe: 'saisie' }, [el('label', { for: id, texte: q.reponse.type === 'fraction' ? 'Ta réponse (par exemple 3/8) :' : 'Ta réponse :' }), champ, verifier]);
    const tienne = el('p', { classe: 'ta-reponse' });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (fini) return;
      if (!champ.value.trim()) { o.dire('Écris d’abord ta réponse.'); champ.focus(); return; }
      const juste = !!o.repondre(champ.value);
      champ.readOnly = true;
      verifier.remove();
      tienne.textContent = (juste ? '✓ ' : '✗ ') + 'Ta réponse : ' + champ.value.trim();
      form.after(tienne);
      conclure(juste, champ.value);
    });
    corps.append(form, verdict, suite);
    if (o.deja) {
      champ.value = o.deja.saisie == null ? '' : String(o.deja.saisie);
      champ.readOnly = true; verifier.remove();
      if (champ.value) { tienne.textContent = (o.deja.juste ? '✓ ' : '✗ ') + 'Ta réponse : ' + champ.value; form.after(tienne); }
      conclure(o.deja.juste, o.deja.saisie, true);
    }
  }

  racine.VueQuestion = { poser, texteCourt, premierePhrase, correction };
})(window);
