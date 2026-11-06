/* Affichage des séances hors mission (moteur : js/seances.js) : test de départ, automatismes du matin, papier du soir.
   Jamais de note ni de score à l'écran (SPEC.md, section 7). Chaque changement place le focus sur un titre, pour le lecteur d'écran. */
(function () {
  'use strict';
  const S = window.Seances;
  const M = window.Mission;

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
  function bouton(texte, action, classe) {
    const b = el('button', { type: 'button', texte, classe: classe || '' });
    b.addEventListener('click', action);
    return b;
  }
  /** Une phrase de Djéli Awa (sous-titre), lue par sa voix, avec « Réécouter ». */
  function parole(texte, parle) {
    window.Voix.lire(parle || texte);
    return window.Habillage.bulle(texte, window.Voix.boutonReecouter(parle || texte));
  }
  function image(img) {
    if (!img) return null;
    const f = el('figure', { classe: 'dessin' });
    f.innerHTML = window.Manipulations.dessin(img);
    f.appendChild(el('figcaption', { texte: img.description }));
    return f;
  }
  const correction = (etapes) => el('ol', { classe: 'correction' }, (etapes || []).map((t) => el('li', { texte: t })));

  /** Une question : choix, saisie ou grille. essais : 1 ou 2. fin(r) est appelé une fois la question terminée.
      retours(r) rend ce qu'il faut afficher et dire après une réponse : { affiche, dit, correction }. */
  function question(corps, q, essais, retours, fin, tirage) {
    const retour = el('div', { classe: 'retour', 'aria-live': 'polite' });
    const montrer = (r) => {
      const x = retours(r);
      retour.innerHTML = '';
      if (x.affiche) {
        // Matin et soir : ✓ ou ✗ pour les yeux, le verdict en mots pour le lecteur d'écran ; au test, un retour neutre.
        const m = /^([✓✗]) (.*)$/s.exec(x.affiche);
        const p = m ? el('p', {}, [el('span', { classe: 'marque', 'aria-hidden': 'true', texte: m[1] }), el('span', { classe: 'sr', texte: m[1] === '✓' ? 'Réponse juste. ' : 'Réponse à revoir. ' }), document.createTextNode(m[2])]) : el('p', { texte: x.affiche });
        retour.append(el('div', { classe: 'retour-parle' + (m ? (m[1] === '✓' ? ' juste' : ' faux') : '') }, [p, window.Voix.boutonReecouter(x.dit)]));
      }
      if (x.indice) retour.append(el('p', { classe: 'indice', texte: 'Indice : ' + x.indice }));
      if (x.correction) retour.append(correction(x.correction));
      if (x.dit) window.Voix.lire(x.dit);
    };
    if (q.grille) {
      corps.append(el('p', { classe: 'papier', texte: '✎ Rédige ta réponse sur ton cahier. Quand tu as fini, regarde la correction.' }));
      const voir = bouton('Voir la correction', () => {
        voir.remove();
        const cases = q.grille.map((c, i) => el('div', { classe: 'critere' }, [el('input', { type: 'checkbox', id: 'grille-' + i }), el('label', { for: 'grille-' + i, texte: c })]));
        const grille = el('fieldset', { classe: 'grille' }, [el('legend', { texte: 'Vérifie ta copie, critère par critère, et coche ce que tu as fait.' })].concat(cases));
        const ok = bouton('J’ai vérifié', () => {
          ok.remove();
          grille.querySelectorAll('input').forEach((i) => { i.disabled = true; });
          const toutes = cases.every((d) => d.querySelector('input').checked);
          const p = tirage.tirer(toutes ? 'A' : 'E');
          retour.append(el('div', { classe: 'retour-parle' }, [el('p', { texte: p }), window.Voix.boutonReecouter(p)]));
          window.Voix.lire(p);
          fin({ juste: toutes });
        });
        corps.insertBefore(correction(q.correction), retour);
        corps.insertBefore(grille, retour);
        corps.insertBefore(ok, retour);
        grille.querySelector('input').focus();
      });
      corps.append(voir, retour);
      return;
    }
    const repondre = (saisie, desactiver) => {
      const r = S.repondre(q, saisie, essais);
      montrer(r);
      if (r.fini) { desactiver(); fin(r); }
    };
    if (q.reponse.type === 'choix') {
      const zone = el('div', { classe: 'boutons choix', role: 'group', 'aria-label': 'Réponses possibles' });
      const off = () => zone.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      q.reponse.options.forEach((o, i) => zone.append(bouton(o, () => repondre(i, off))));
      corps.append(zone, retour);
    } else {
      const id = 'seance-' + Math.random().toString(36).slice(2, 8);
      const champ = el('input', { type: 'text', id, inputmode: 'text', autocomplete: 'off', spellcheck: 'false' });
      const form = el('form', { classe: 'saisie' }, [el('label', { for: id, texte: q.reponse.type === 'fraction' ? 'Ta réponse (par exemple 3/8) :' : 'Ta réponse :' }), champ, el('button', { type: 'submit', texte: 'Vérifier' })]);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!champ.value.trim()) { window.Voix.lire(M.PHRASES.ecrisDabord); return; }
        repondre(champ.value, () => { champ.disabled = true; form.querySelector('button').disabled = true; });
      });
      corps.append(form, retour);
    }
  }

  function cadre(conteneur, titreSeance, sousTitre) {
    conteneur.innerHTML = '';
    conteneur.append(el('p', { classe: 'temps', texte: titreSeance }));
    const h = el('h2', { tabindex: '-1', texte: sousTitre });
    const corps = el('div', { classe: 'temps-corps' });
    const pied = el('div', { classe: 'boutons pied' });
    conteneur.append(h, corps, pied);
    return { h, corps, pied };
  }

  // ---------- Test de départ ----------

  /** options : tour, graphe, notions (id → notion), etat (ou null), enregistrer(etat), terminer(bilan), quitter(). */
  function lancerTest(conteneur, options) {
    const { tour, graphe, notions } = options;
    const etat = options.etat || S.creerTest(tour);
    const tirage = window.Reserves.seance();
    // Les phrases et le mot d'étape du décor du bloc (« étal » au marché…) ; sinon, celles du grand tour du marché.
    const P = Object.assign({}, S.PHRASES_DITES, tour.phrases || {});
    const pas = tour.etape || 'étal';

    function accueil() {
      const c = cadre(conteneur, tour.titre, options.etat ? 'On reprend' : 'Bienvenue : ' + tour.titre.replace(/^./, (x) => x.toLowerCase()));
      c.corps.append(parole(options.etat ? P['test-reprise'] : P['test-intro']));
      c.pied.append(bouton('Aller au prochain ' + pas, etal), bouton('Revenir plus tard', options.quitter, 'secondaire'));
      c.h.focus();
    }

    function etal() {
      const e = S.etalSuivant(tour, graphe, etat);
      if (!e) { fin(); return; }
      const enCours = etat.etalEnCours && etat.etalEnCours.notion === e.notion ? etat.etalEnCours : null;
      const graine = enCours ? enCours.graine : Date.now();
      const qs = S.questionsDeLetal(e, notions[e.notion], graine);
      const justes = enCours ? enCours.justes.slice() : [];
      etat.etalEnCours = { notion: e.notion, graine, justes: justes.slice() };
      options.enregistrer(etat);
      const c = cadre(conteneur, tour.titre, e.titre);
      if (!justes.length) c.corps.append(parole(e.phrase));
      let i = justes.length;
      const finEtal = () => {
        S.noterEtal(tour, graphe, etat, e.notion, justes);
        etat.etalEnCours = null;
        options.enregistrer(etat);
        c.pied.prepend(bouton(etat.fini ? 'Finir le tour' : pas.replace(/^./, (x) => x.toUpperCase()) + ' suivant', etat.fini ? fin : etal));
        c.pied.firstChild.focus();
      };
      if (i >= qs.length) { c.pied.append(bouton('Faire une pause', options.quitter, 'secondaire')); finEtal(); c.h.focus(); return; }
      const suivante = () => {
        const q = qs[i];
        const bloc = el('section', { classe: 'question-test' });
        bloc.append(el('h3', { tabindex: '-1', texte: 'Question ' + (i + 1) + ' sur ' + qs.length }), el('p', { classe: 'enonce', texte: q.enonce }));
        const dessinQ = image(q.image); if (dessinQ) bloc.append(dessinQ);
        c.corps.append(bloc);
        // Au test : une seule réponse, et le même retour neutre, juste ou non (jamais de verdict d'échec).
        question(bloc, q, 1, () => ({ affiche: P['test-note'], dit: P['test-note'] }), (r) => {
          justes.push(!!r.premierCoup);
          etat.etalEnCours = { notion: e.notion, graine, justes: justes.slice() };
          options.enregistrer(etat);
          i++;
          if (i < qs.length) suivante();
          else finEtal();
        }, tirage);
        bloc.querySelector('h3').focus();
      };
      c.pied.append(bouton('Faire une pause', options.quitter, 'secondaire'));
      suivante();
      c.h.focus();
    }

    function fin() {
      etat.fini = true;
      options.enregistrer(etat);
      const b = options.terminer(etat);
      const c = cadre(conteneur, tour.titre, 'Le chemin est prêt');
      const g = tirage.tirer('G');
      c.corps.append(parole(P['test-fin'] + ' ' + g, [P['test-fin'], g]));
      if (b && b.acquises) c.corps.append(el('p', { classe: 'note', texte: 'Ton chemin s’ouvre là où tu en es. Les notions déjà connues reviendront en révision dans quelques jours.' }));
      c.pied.append(bouton('Voir mon chemin', options.quitter));
      // La suite proposée (consigne du 6 nov. 2026) : mission suivante, changer de matière, arrêter pour aujourd'hui.
      if (options.suite) Promise.resolve(options.suite()).then((l) => { if (l && l.length) c.pied.replaceChildren(...l); }).catch(() => {});
      c.h.focus();
    }

    accueil();
  }

  // ---------- Automatismes du matin, papier du soir, révision : question par question, à la façon d'Anki ----------

  /** options : mode ('matin', 'soir' ou 'revision'), serie (état : { mode, entrees, i }), notions (id → notion), aujourdhui,
      cartesQ (cartes de question), noterCarte(carte, note), sauver(serie), quitter(), fin(voix) → éléments de la suite.
      Matin : un essai, la réponse est montrée. Soir et révision : deux essais, l'aide, puis la correction.
      Réponse juste : les quatre boutons d'Anki ; fausse : « À revoir », la question revient après 3 autres (consigne du 6 nov. 2026). */
  function lancerSerie(conteneur, options) {
    const P = S.PHRASES_DITES;
    const mode = options.mode;
    const matin = mode === 'matin';
    const titre = matin ? 'Automatismes du matin' : mode === 'soir' ? 'Papier du soir' : 'Révisions';
    const tirage = window.Reserves.seance();
    const serie = options.serie;
    const cartesQ = options.cartesQ || {};
    const sauver = () => { if (options.sauver) options.sauver(serie); };
    if (!serie.entrees.length) {
      const c = cadre(conteneur, titre, 'Pas encore');
      c.corps.append(parole(P['rien-encore']));
      c.pied.append(bouton('Retour', options.quitter));
      c.h.focus();
      return;
    }
    function fin() {
      const c = cadre(conteneur, titre, 'C’est fini');
      const p = matin ? P['matin-fin'] : mode === 'soir' ? P['soir-fin'] : tirage.tirer('G');
      c.corps.append(window.Habillage.bulle(p, window.Voix.boutonReecouter(p)));
      const voix = window.Voix.lire(p);
      const suite = el('div', { classe: 'suite-mission' });
      c.corps.append(suite);
      Promise.resolve(options.fin ? options.fin(voix) : null).then((l) => { if (l && l.length) suite.replaceChildren(...l); else suite.replaceChildren(bouton('Retour au quartier', options.quitter)); }).catch(() => {});
      c.h.focus();
    }
    function item() {
      sauver();
      if (serie.i >= serie.entrees.length) { fin(); return; }
      const e = serie.entrees[serie.i];
      const x = S.questionDe(e, options.notions);
      if (!x) { S.avancerSerie(serie); item(); return; } // une question qui n'existe plus : on passe
      const q = x.question;
      // Le matin : « Calcul » seulement si la réponse est un nombre à trouver ; sinon, « Question ».
      const estCalcul = q.reponse && q.reponse.type !== 'choix';
      const nom = (matin ? (estCalcul ? 'Calcul ' : 'Question ') : mode === 'soir' ? 'Exercice ' : 'Question ') + (serie.i + 1) + ' sur ' + serie.entrees.length + (e.retour ? ' · elle revient' : '');
      const c = cadre(conteneur, titre, nom);
      if (serie.i === 0 && e.etat === 'attente' && mode !== 'revision') c.corps.append(parole(matin ? P['matin-intro'] : P['soir-intro']));
      c.corps.append(el('p', { classe: 'notion-source', texte: x.titre }));
      if (x.enonce) c.corps.append(el('p', { classe: 'enonce-defi', texte: x.enonce }));
      const i0 = image(x.image); if (i0) c.corps.append(i0);
      const bloc = el('section', { classe: 'question-serie' });
      bloc.append(el('p', { classe: 'enonce', texte: q.texte || q.enonce }));
      const dessinQ = image(q.image); if (dessinQ) bloc.append(dessinQ);
      if (!matin && q.reponse && q.reponse.type !== 'choix') bloc.append(el('p', { classe: 'papier', texte: '✎ Écris ton calcul sur ton cahier, puis ta réponse ici.' }));
      c.corps.append(bloc);
      const suite = el('div', { classe: 'suite-question' });
      const conclure = (juste) => {
        e.etat = juste ? 'juste' : 'corrige';
        if (!juste && !e.note) { S.noterSerie(serie, 'revoir', window.Revision.REVOIR_APRES); noterCarte(e.carte, 'revoir'); }
        sauver();
        const passer = () => { S.avancerSerie(serie); item(); };
        if (juste) {
          const b = window.VueAnki.boutons(window.Revision.delaisQuestion(cartesQ[e.carte] || null, options.aujourdhui), (note) => {
            S.noterSerie(serie, note, window.Revision.REVOIR_APRES); noterCarte(e.carte, note); passer();
          });
          suite.replaceChildren(b);
          bloc.append(suite);
          b.montrer();
        } else {
          const b = window.VueAnki.compris(passer);
          suite.replaceChildren(b);
          bloc.append(suite);
          b.montrer();
        }
      };
      const noterCarte = (carte, note) => {
        if (options.noterCarte) options.noterCarte(carte, note);
        cartesQ[carte] = window.Revision.programmerQuestion(cartesQ[carte] || null, note, options.aujourdhui, carte);
      };
      if (e.etat !== 'attente') {
        // Séance reprise : la question était déjà répondue ; il manquait le choix.
        bloc.append(el('ol', { classe: 'correction' }, (q.correction || [M.ecrireReponse(q.reponse)]).map((t) => el('li', { texte: t }))));
        conclure(e.etat === 'juste');
      } else {
        question(bloc, q, matin ? 1 : 2, (r) => {
          e.essais = q.essais; sauver();
          if (r.juste) { const p = tirage.tirer(r.premierCoup ? 'A' : 'C'); return { affiche: '✓ ' + p, dit: p, correction: matin ? null : q.correction }; }
          if (!r.fini) { const p = tirage.tirer('D'); return { affiche: '✗ ' + p, dit: [p, q.aideParlee || q.aide], indice: q.aide }; }
          const p = tirage.tirer('E');
          return { affiche: '✗ ' + p + ' La réponse : ' + M.ecrireReponse(q.reponse) + '.', dit: p, correction: matin ? null : q.correction };
        }, (r) => conclure(!!r.juste), tirage);
      }
      c.h.focus();
    }
    item();
  }

  window.VueSeances = { lancerTest, lancerSerie };
})();
