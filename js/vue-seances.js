/* Affichage des séances hors mission (moteur : js/seances.js) : test de départ, automatismes du matin, papier du soir, révisions.
   Partout, après chaque question (consignes du 6 nov. 2026) : le verdict « Juste ! » ou « Pas encore », la bonne réponse,
   une phrase de correction, puis les quatre boutons d'Anki ou « J'ai compris, question suivante » (js/vue-question.js).
   Chaque changement place le focus sur un titre, pour le lecteur d'écran. */
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
  /** Une phrase de Djéli Awa : sa première phrase à l'écran, le reste derrière « En savoir plus » ; la voix lit le tout. */
  function parole(texte, parle) {
    window.Voix.lire(parle || texte);
    const b = window.Habillage.bulle('', window.Voix.boutonReecouter(parle || texte));
    const p = b.querySelector('.bulle p');
    const court = window.VueQuestion.texteCourt(texte);
    if (court.tagName === 'P') p.append(court.textContent);
    else { p.append(court.firstChild.textContent); p.after(court.lastChild); }
    return b;
  }
  function image(img) {
    if (!img) return null;
    const f = el('figure', { classe: 'dessin' });
    f.innerHTML = window.Manipulations.dessin(img);
    f.appendChild(el('figcaption', { texte: img.description }));
    return f;
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

  /** La note d'une carte de question : gardée par l'application, et dans la copie locale des cartes. */
  function noteur(options) {
    const cartesQ = options.cartesQ || {};
    return (carte, note) => {
      if (options.noterCarte) options.noterCarte(carte, note);
      cartesQ[carte] = window.Revision.programmerQuestion(cartesQ[carte] || null, note, options.aujourdhui, carte);
    };
  }
  const apresDe = (options) => (continuer) => (options.apresQuestion ? options.apresQuestion(continuer) : continuer());

  // ---------- Test de départ ----------

  /** options : tour, graphe, notions (id → notion), etat (ou null), aujourdhui, cartesQ, noterCarte(carte, note),
      enregistrer(etat), terminer(bilan), quitter(), apresQuestion(continuer) (6 questions d'un coup au plus), suite().
      Deux réponses justes du premier coup = notion acquise ; chaque question est une carte et montre son verdict. */
  function lancerTest(conteneur, options) {
    const { tour, graphe, notions } = options;
    const etat = options.etat || S.creerTest(tour);
    const tirage = window.Reserves.seance();
    const noterCarte = noteur(options);
    const apres = apresDe(options);
    // Les phrases et le mot d'étape du décor du bloc (« étal » au marché…) ; sinon, celles du grand tour du marché.
    const P = Object.assign({}, S.PHRASES_DITES, tour.phrases || {});
    const pas = tour.etape || 'étal';

    function accueil() {
      const c = cadre(conteneur, tour.titre, options.etat ? 'On reprend' : tour.titre);
      c.corps.append(parole(options.etat ? P['test-reprise'] : P['test-intro']));
      c.corps.append(el('div', { classe: 'boutons suite-temps' }, [bouton('Commencer', etal)]));
      c.h.focus();
    }

    function etal() {
      const e = S.etalSuivant(tour, graphe, etat);
      if (!e) { fin(); return; }
      const enCours = etat.etalEnCours && etat.etalEnCours.notion === e.notion ? etat.etalEnCours : null;
      const graine = enCours ? enCours.graine : Date.now();
      const n = notions[e.notion];
      const qs = S.questionsDeLetal(e, n, graine);
      const justes = enCours ? enCours.justes.slice() : [];
      const garder = () => { etat.etalEnCours = { notion: e.notion, graine, justes: justes.slice() }; options.enregistrer(etat); };
      garder();
      const finEtal = () => {
        S.noterEtal(tour, graphe, etat, e.notion, justes);
        etat.etalEnCours = null;
        options.enregistrer(etat);
        if (etat.fini) fin(); else etal();
      };
      if (justes.length >= qs.length) { finEtal(); return; }
      const poser = (i, premier) => {
        const q = qs[i];
        const c = cadre(conteneur, tour.titre, e.titre);
        if (premier && !justes.length) c.corps.append(parole(e.phrase));
        const bloc = el('section', { classe: 'question-test' });
        bloc.append(el('h3', { tabindex: '-1', texte: 'Question' }), el('p', { classe: 'enonce', texte: q.enonce }));
        const dessinQ = image(q.image); if (dessinQ) bloc.append(dessinQ);
        c.corps.append(bloc);
        const carte = M.idCarte(n, 'ex', q.generateur);
        window.VueQuestion.poser(bloc, q, {
          attendu: M.ecrireReponse(q.reponse),
          repondre(saisie) { const juste = q.grille ? saisie.every(Boolean) : S.repondre(q, saisie, 1).juste; justes.push(juste); garder(); return juste; },
          reaction(juste) { return tirage.tirer(juste ? 'A' : 'E'); },
          dire: (t) => window.Voix.lire(t),
          faux() { noterCarte(carte, 'revoir'); },
          suite(note) {
            if (note !== 'revoir') noterCarte(carte, note);
            apres(() => (i + 1 < qs.length ? poser(i + 1, false) : finEtal()));
          },
        });
        (premier ? c.h : bloc.querySelector('h3')).focus();
      };
      poser(justes.length, true);
    }

    function fin() {
      etat.fini = true;
      options.enregistrer(etat);
      options.terminer(etat);
      const c = cadre(conteneur, tour.titre, 'C’est fini');
      const g = tirage.tirer('G');
      c.corps.append(parole(P['test-fin'] + ' ' + g, [P['test-fin'], g]));
      const suite = el('div', { classe: 'suite-mission' }, [bouton('Retour', options.quitter)]);
      c.corps.append(suite);
      if (options.suite) Promise.resolve(options.suite()).then((l) => { if (l && l.length) suite.replaceChildren(...l); }).catch(() => {});
      c.h.focus();
    }

    // Un test déjà commencé reprend tout de suite à sa question ; sinon, l'accueil.
    if (options.etat && options.etat.etalEnCours) etal(); else accueil();
  }

  // ---------- Automatismes du matin, papier du soir, révision : question par question, à la façon d'Anki ----------

  /** options : mode ('matin', 'soir' ou 'revision'), serie (état : { mode, entrees, i }), notions (id → notion), aujourdhui,
      cartesQ (cartes de question), noterCarte(carte, note), sauver(serie), quitter(), fin(voix) → éléments de la suite,
      apresQuestion(continuer). Une seule réponse ; « Pas encore » : la question revient après 3 autres. */
  function lancerSerie(conteneur, options) {
    const P = S.PHRASES_DITES;
    const mode = options.mode;
    const matin = mode === 'matin';
    const titre = matin ? 'Automatismes du matin' : mode === 'soir' ? 'Papier du soir' : 'Révisions';
    const tirage = window.Reserves.seance();
    const serie = options.serie;
    const noterCarte = noteur(options);
    const apres = apresDe(options);
    const sauver = () => { if (options.sauver) options.sauver(serie); };
    function fin() {
      const c = cadre(conteneur, titre, 'C’est fini');
      const p = matin ? P['matin-fin'] : mode === 'soir' ? P['soir-fin'] : tirage.tirer('G');
      c.corps.append(window.Habillage.bulle(p, window.Voix.boutonReecouter(p)));
      const voix = window.Voix.lire(p);
      const suite = el('div', { classe: 'suite-mission' });
      c.corps.append(suite);
      Promise.resolve(options.fin ? options.fin(voix) : null).then((l) => { if (l && l.length) suite.replaceChildren(...l); else suite.replaceChildren(bouton('Retour', options.quitter)); }).catch(() => {});
      c.h.focus();
    }
    function item() {
      sauver();
      if (serie.i >= serie.entrees.length) { fin(); return; }
      const e = serie.entrees[serie.i];
      const x = S.questionDe(e, options.notions);
      if (!x) { S.avancerSerie(serie); item(); return; } // une question qui n'existe plus : on passe
      const q = x.question;
      const nom = e.retour ? 'Elle revient' : matin && q.reponse && q.reponse.type !== 'choix' ? 'Calcul' : mode === 'soir' ? 'Exercice' : 'Question';
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
      window.VueQuestion.poser(bloc, q, {
        attendu: q.reponse ? M.ecrireReponse(q.reponse) : null,
        repondre(saisie) {
          let juste;
          if (q.grille) juste = saisie.every(Boolean);
          else juste = S.repondre(q, saisie, 1).juste;
          e.etat = juste ? 'juste' : 'corrige';
          e.essais = 1;
          e.saisie = saisie;
          sauver();
          return juste;
        },
        reaction(juste) { return tirage.tirer(juste ? 'A' : 'E'); },
        dire: (t) => window.Voix.lire(t),
        faux() { if (!e.note) { S.noterSerie(serie, 'revoir', window.Revision.REVOIR_APRES); noterCarte(e.carte, 'revoir'); } sauver(); },
        suite(note) {
          if (!e.note) { S.noterSerie(serie, note, window.Revision.REVOIR_APRES); noterCarte(e.carte, note); }
          S.avancerSerie(serie);
          sauver();
          apres(item);
        },
        deja: e.etat !== 'attente' ? { juste: e.etat === 'juste', saisie: e.saisie } : null,
      });
      c.h.focus();
    }
    item();
  }

  window.VueSeances = { lancerTest, lancerSerie };
})();
