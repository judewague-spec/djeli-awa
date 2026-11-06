/* Affichage d'une mission : montre chaque temps du moteur (js/mission.js) et transmet ses gestes.
   Chaque changement de temps place le focus sur son titre, pour que le lecteur d'écran le lise. */
(function () {
  'use strict';
  const M = window.Mission;

  const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  function jourEnLettres(jour) {
    const [a, m, j] = jour.split('-').map(Number);
    const d = new Date(a, m - 1, j);
    return JOURS[d.getDay()] + ' ' + (j === 1 ? '1er' : j) + ' ' + MOIS[m - 1];
  }

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

  /** Une phrase de Djéli Awa : son sous-titre, lu par sa voix dès qu'il paraît, avec un bouton « Réécouter ». */
  function parole(texte, parle, sansLire) {
    if (!sansLire) window.Voix.lire(parle || texte);
    return window.Habillage.bulle(texte, window.Voix.boutonReecouter(parle || texte));
  }

  /** Un retour (juste, faux, grille) : le texte affiché et son bouton « Réécouter ». */
  function retourParle(classe, affiche, texte) {
    // La marque ✓ ou ✗ est pour les yeux ; le lecteur d'écran entend le verdict en mots.
    const m = /^([✓✗]) (.*)$/s.exec(affiche);
    const p = m ? el('p', {}, [el('span', { classe: 'marque', 'aria-hidden': 'true', texte: m[1] }), el('span', { classe: 'sr', texte: m[1] === '✓' ? 'Réponse juste. ' : 'Réponse à revoir. ' }), document.createTextNode(m[2])]) : el('p', { texte: affiche });
    return el('div', { classe: 'retour-parle ' + classe }, [p, window.Voix.boutonReecouter(texte)]);
  }

  function image(img) {
    if (!img) return null;
    const f = el('figure', { classe: 'dessin' });
    f.innerHTML = window.Manipulations.dessin(img);
    f.appendChild(el('figcaption', { texte: img.description }));
    return f;
  }

  function listeCorrection(etapes) {
    return el('ol', { classe: 'correction' }, etapes.map((t) => el('li', { texte: t })));
  }

  /** Lance une mission dans conteneur.
      options : notion, etape, graine, reprise (état sauvé), aujourdhui, carteAvant, cartesQ (cartes de question, pour les délais),
      dire, perles, points, noterCarte(carte, note), sauver(etat), enregistrer(fin), suite(fin, voixFinie) → éléments à montrer.
      Question par question, à la façon d'Anki (consigne du 6 nov. 2026) : réponse juste, quatre boutons ; réponse fausse,
      « J'ai compris, question suivante » ; le choix fait venir la suite, et le focus va sur son titre. */
  function lancer(conteneur, options) {
    const m = options.reprise ? M.reprendre(options.notion, options.reprise) : M.creer(options.notion, { graine: options.graine, etape: options.etape, anki: true });
    const dire = options.dire;
    const tirage = options.tirage || window.Reserves.seance(); // réserves de phrases (SPEC.md, section 10)
    const cartesQ = options.cartesQ || {};
    const sauver = () => { if (options.sauver && M.tempsCourant(m).nom !== 'recompense') options.sauver(M.sauver(m)); };

    /** Après une note : la question suivante, ou le temps suivant ; le focus va sur le nouveau titre. */
    function apresNote(note) {
      const r = M.avancer(m);
      afficher(r === 'question' ? 'h3' : 'h2');
    }

    function noter(carte, note) {
      M.noter(m, note, window.Revision.REVOIR_APRES);
      if (options.noterCarte) options.noterCarte(carte, note);
      cartesQ[carte] = window.Revision.programmerQuestion(cartesQ[carte] || null, note, options.aujourdhui, carte);
    }

    function afficher(focus) {
      sauver();
      const t = M.tempsCourant(m);
      const c = M.contenu(m);
      conteneur.innerHTML = '';
      const titre = el('h2', { tabindex: '-1', texte: t.titre });
      // Les pastilles pour les yeux ; « temps n sur 7 » pour le lecteur d'écran.
      conteneur.appendChild(el('div', { classe: 'entete-mission' }, [window.Habillage.pastilles(t.numero, t.total)]));
      const nomTemps = el('p', { classe: 'temps', texte: options.notion.titre });
      nomTemps.append(el('span', { classe: 'sr', texte: ' · temps ' + t.numero + ' sur ' + t.total }));
      conteneur.appendChild(nomTemps);
      conteneur.appendChild(titre);
      const corps = el('div', { classe: 'temps-corps' });
      conteneur.appendChild(corps);
      // « Continuer », juste sous le contenu ; il reçoit le focus quand il apparaît en cours de temps (manipulation finie).
      const continuer = bouton('Continuer', () => { if (M.peutContinuer(m)) { M.suivant(m); afficher('h2'); } });
      const suiteTemps = el('div', { classe: 'boutons suite-temps' }, [continuer]);
      const majContinuer = (focus) => {
        const avant = continuer.hidden;
        continuer.hidden = !M.peutContinuer(m);
        if (focus && avant && !continuer.hidden) continuer.focus();
      };

      const avecQuestion = t.nom === 'entrainement' || t.nom === 'defi';
      ({
        accroche() {
          const d = window.Decors && window.Decors.pour(options.notion.id);
          if (d) {
            const img = document.createElement('img');
            img.className = 'decor-image';
            img.src = d.fichier;
            img.alt = d.alt;
            img.width = 893;
            img.height = 1600;
            corps.append(el('figure', { classe: 'decor' }, [img]));
          }
          corps.append(parole(c.texte)); const i = image(c.image); if (i) corps.append(i);
        },
        manipulation() {
          if (c.mode === 'ecran' && window.Manipulations.obtenir(c.type)) {
            corps.append(parole(c.consigne));
            if (c.etapes) corps.append(el('ol', { classe: 'reflexion' }, c.etapes.map((e) => el('li', { texte: e }))));
            const zone = el('div', { classe: 'manipulation' });
            corps.append(zone);
            window.Manipulations.obtenir(c.type).monter(zone, c, dire, () => { M.marquerManipulation(m); sauver(); majContinuer(true); });
          } else {
            // Réflexion guidée : une phrase dite, le dessin, puis les étapes à suivre de tête et sur le cahier (affichées).
            if (c.intro) corps.append(parole(c.intro));
            const i = image(c.image); if (i) corps.append(i);
            corps.append(el('ol', { classe: 'reflexion' }, (c.etapes || []).map((e) => el('li', { texte: e }))));
            M.marquerManipulation(m);
          }
        },
        decouverte() { corps.append(parole(c.texte, c.parle)); const i = image(c.image); if (i) corps.append(i); },
        vocabulaire() { corps.append(parole(c.texte)); },
        entrainement() { question(corps, c.exercice, 'Exercice ' + c.numero + ' sur ' + c.total); },
        defi() {
          corps.append(el('p', { classe: 'enonce-defi', texte: c.enonce }));
          const i = image(c.image); if (i) corps.append(i);
          question(corps, c.question, 'Question ' + c.numero + ' sur ' + c.total);
        },
        recompense() { recompense(corps, c); },
      })[t.nom]();

      if (!avecQuestion && t.nom !== 'recompense') { corps.append(suiteTemps); majContinuer(false); }
      const cible = focus === 'h3' ? conteneur.querySelector('h3') : null;
      (cible || titre).focus();
    }

    /** Un exercice ou une question du défi : saisie, choix, ou réponse rédigée avec grille. */
    function question(corps, q, entete) {
      const reprise = q.retour ? ' · elle revient' : '';
      corps.append(el('h3', { tabindex: '-1', texte: entete + reprise }));
      corps.append(el('p', { classe: 'enonce', texte: q.enonce || q.texte }));
      const dessinQ = image(q.image); if (dessinQ) corps.append(dessinQ); // un exercice peut avoir son dessin (tableau périodique…)
      const retour = el('div', { classe: 'retour', 'aria-live': 'polite' });
      const suite = el('div', { classe: 'suite-question' });

      // Aucune action pendant 45 secondes : une phrase de la réserve F, une fois, puis plus rien avant le prochain geste.
      const relance = el('div', { classe: 'relance', 'aria-live': 'polite' });
      let fini = false, minuteur = null;
      function guetter() {
        clearTimeout(minuteur);
        if (fini) return;
        minuteur = setTimeout(() => {
          if (fini || !document.body.contains(corps)) return;
          const p = tirage.tirer('F');
          relance.replaceChildren(retourParle('', p, p));
          dire(p);
        }, window.Reserves.ATTENTE_RELANCE);
      }
      ['click', 'keydown', 'input'].forEach((ev) => corps.addEventListener(ev, guetter));
      guetter();

      /** Première erreur : une phrase de la réserve D, puis l'aide de l'exercice. */
      function premiereErreur(r, sansParler) {
        const phrase = tirage.tirer('D');
        retour.innerHTML = '';
        const bloc = retourParle('faux', '✗ ' + phrase, [phrase, r.aideParlee]);
        bloc.insertBefore(el('p', { classe: 'indice', texte: 'Indice : ' + r.aide }), bloc.lastChild);
        retour.append(bloc);
        if (!sansParler) dire(phrase + ' Indice : ' + r.aide, [phrase, r.aideParlee]);
      }

      /** La question est finie : juste, les quatre boutons ; fausse, « À revoir » et « J'ai compris ». */
      function conclure(juste, phrase, correction) {
        fini = true; clearTimeout(minuteur); relance.innerHTML = '';
        sauver();
        if (juste) {
          const b = window.VueAnki.boutons(window.Revision.delaisQuestion(cartesQ[q.carte] || null, options.aujourdhui), (note) => { noter(q.carte, note); apresNote(note); });
          suite.replaceChildren(b);
          if (correction) suite.append(correction);
          b.montrer();
        } else {
          if (!q.note) noter(q.carte, 'revoir');
          sauver();
          const b = window.VueAnki.compris(() => apresNote('revoir'));
          if (correction) suite.append(correction);
          suite.append(b);
          b.montrer();
        }
        if (phrase) dire(phrase);
      }

      function finir(r, sansParler) {
        retour.innerHTML = '';
        const phrase = tirage.tirer(r.situation);
        retour.append(retourParle(r.juste ? 'juste' : 'faux', (r.juste ? '✓ ' : '✗ ') + phrase, phrase));
        conclure(r.juste, sansParler ? null : phrase, listeCorrection(r.correction || q.correction || []));
      }

      // Une question déjà répondue (mission reprise) : son verdict, puis le choix qui manquait.
      if (q.etat !== 'attente') {
        corps.append(relance, retour, suite);
        finir({ juste: q.etat === 'juste', situation: q.etat === 'juste' ? 'A' : 'E', correction: q.correction }, true);
        return;
      }

      if (q.grille) {
        corps.append(el('p', { classe: 'papier', texte: '✎ Rédige ta réponse sur ton cahier. Quand tu as fini, regarde la correction.' }));
        const voir = bouton('Voir la correction', () => {
          voir.remove();
          const cases = q.grille.map((critere, i) => {
            const id = 'critere-' + i;
            return el('div', { classe: 'critere' }, [el('input', { type: 'checkbox', id }), el('label', { for: id, texte: critere })]);
          });
          const grille = el('fieldset', { classe: 'grille' }, [el('legend', { texte: 'Vérifie ta copie, critère par critère, et coche ce que tu as fait.' })].concat(cases));
          const valider = bouton('J’ai vérifié', () => {
            const r = M.validerGrille(m, cases.map((d) => d.querySelector('input').checked));
            valider.remove();
            grille.querySelectorAll('input').forEach((i) => { i.disabled = true; });
            const phrase = tirage.tirer(r.situation);
            retour.append(el('p', { classe: 'compte', texte: M.PHRASES.grille(r.reussis, r.total) }), retourParle('', phrase, phrase));
            conclure(r.reussis === r.total, phrase, null);
          });
          corps.insertBefore(listeCorrection(q.correction), retour);
          corps.insertBefore(grille, retour);
          corps.insertBefore(valider, retour);
          grille.querySelector('input').focus();
        });
        corps.append(voir, relance, retour, suite);
        return;
      }

      const apresReponse = (r, desactiver) => {
        sauver();
        if (r.fini) { desactiver(); finir(r); } else premiereErreur(r);
      };
      if (q.reponse.type === 'choix') {
        const choix = el('div', { classe: 'boutons choix', role: 'group', 'aria-label': 'Réponses possibles' });
        q.reponse.options.forEach((o, i) => choix.append(bouton(o, () => {
          apresReponse(M.repondre(m, i), () => choix.querySelectorAll('button').forEach((b) => { b.disabled = true; }));
        })));
        corps.append(choix);
      } else {
        corps.append(el('p', { classe: 'papier', texte: '✎ Fais le calcul sur ton cahier, puis écris ta réponse ici.' }));
        const id = 'saisie-' + m.index + '-' + (m.iExercice + m.iQuestion);
        const champ = el('input', { type: 'text', id, inputmode: q.reponse.type === 'fraction' ? 'text' : 'decimal', autocomplete: 'off', spellcheck: 'false' });
        const formulaire = el('form', { classe: 'saisie' }, [
          el('label', { for: id, texte: q.reponse.type === 'fraction' ? 'Ta réponse (par exemple 3/8) :' : 'Ta réponse :' }),
          champ,
          el('button', { type: 'submit', texte: 'Vérifier' }),
        ]);
        formulaire.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!champ.value.trim()) { dire(M.PHRASES.ecrisDabord); return; }
          apresReponse(M.repondre(m, champ.value), () => { champ.disabled = true; formulaire.querySelector('button').disabled = true; });
          if (!champ.disabled) champ.select();
        });
        corps.append(formulaire);
      }
      const aide = bouton('Aide', () => { retour.innerHTML = ''; retour.append(parole(q.aide, q.aideParlee)); }, 'secondaire');
      corps.append(el('div', { classe: 'boutons' }, [aide]), relance, retour, suite);
      // Reprise après une première erreur : l'indice est remontré.
      if (q.essais === 1) premiereErreur({ aide: q.aide, aideParlee: q.aideParlee || q.aide }, true);
    }

    function recompense(corps, c) {
      // La fin de mission est enregistrée dès la récompense : la carte de la notion vient des notes de ses questions.
      const fin = M.terminer(m, null, options.aujourdhui, window.Revision, options.carteAvant);
      const enregistre = Promise.resolve(options.enregistrer ? options.enregistrer(fin) : null);
      // Le fait culturel « Le savais-tu ? » (SPEC.md, principe 9) suit la récompense, lu juste après elle.
      const fait = options.notion.savaisTu;
      if (options.perles) corps.append(window.Habillage.sceneRecompense({ perles: options.perles, points: options.points || 0, gain: c.points }));
      corps.append(parole(c.texte, null, true));
      if (fait) corps.append(el('div', { classe: 'savais-tu' }, [parole(fait, null, true)]));
      corps.append(el('p', { classe: 'gain', texte: 'Tu gagnes ' + c.points + ' cauris, et une perle de plus pour ton collier.' }));
      // Fin de mission : une phrase de la réserve G, puis parfois un dicton (réserve I) ; la date est seulement écrite.
      const phrase = tirage.tirer('G');
      const dicton = tirage.dicton();
      const bloc = retourParle('', phrase, [phrase].concat(dicton || []));
      if (dicton) bloc.insertBefore(el('p', { classe: 'dicton', texte: dicton }), bloc.lastChild);
      const suite = el('div', { classe: 'suite-mission' });
      corps.append(bloc, el('p', { classe: 'note', texte: M.PHRASES.note(jourEnLettres(fin.carte.echeance)) }), suite);
      const voix = window.Voix.lire([c.texte].concat(fait ? [fait] : [], [phrase], dicton ? [dicton] : []));
      enregistre.then(() => (options.suite ? options.suite(fin, voix) : null)).then((l) => { if (l && l.length) suite.replaceChildren(...l); }).catch(() => {});
    }

    afficher();
    return m;
  }

  window.VueMission = { lancer, jourEnLettres };
})();
