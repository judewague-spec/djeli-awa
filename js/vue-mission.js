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

  /** Une phrase de Djéli Awa : à l'écran, sa première phrase seulement, le reste derrière « En savoir plus » (fermé) ;
      sa voix lit le tout (accepté le 6 nov. 2026), avec un bouton « Réécouter ». ouvert : « En savoir plus » ouvert d'emblée. */
  function parole(texte, parle, sansLire, ouvert) {
    if (!sansLire) window.Voix.lire(parle || texte);
    const b = window.Habillage.bulle('', window.Voix.boutonReecouter(parle || texte));
    const p = b.querySelector('.bulle p');
    const court = window.VueQuestion.texteCourt(texte, ouvert);
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

  /** Lance une mission dans conteneur.
      options : notion, etape, graine, reprise (état sauvé), aujourdhui, carteAvant, dire, perles, points,
      noterCarte(carte, note), sauver(etat), enregistrer(fin), suite(fin, voixFinie) → éléments à montrer,
      apresQuestion(continuer) : après chaque question notée (séances de 5 questions) ; sinon, la suite tout de suite.
      L'accroche, une première question, l'explication (découverte, vocabulaire), la manipulation, puis les autres questions.
      Chaque question : verdict, correction courte, puis les quatre boutons d'Anki (juste) ou « J'ai compris » (pas encore). */
  function lancer(conteneur, options) {
    const m = options.reprise ? M.reprendre(options.notion, options.reprise) : M.creer(options.notion, { graine: options.graine, etape: options.etape, anki: true });
    const dire = options.dire;
    const tirage = options.tirage || window.Reserves.seance(); // réserves de phrases (SPEC.md, section 10)
    const sauver = () => { if (options.sauver && M.tempsCourant(m).nom !== 'recompense') options.sauver(M.sauver(m)); };
    const apres = (continuer) => { sauver(); if (options.apresQuestion) options.apresQuestion(continuer); else continuer(); };

    function noter(carte, note) {
      M.noter(m, note, window.Revision.REVOIR_APRES);
      if (options.noterCarte) options.noterCarte(carte, note);
    }

    function afficher(focus) {
      sauver();
      const t = M.tempsCourant(m);
      const c = M.contenu(m);
      conteneur.innerHTML = '';
      // Une barre de progression simple, pour les yeux seulement.
      conteneur.appendChild(el('div', { classe: 'entete-mission' }, [window.Habillage.progression(t.numero - 1, t.total - 1)]));
      conteneur.appendChild(el('p', { classe: 'temps', texte: options.notion.titre }));
      // Après une première réponse fausse, la découverte sert de correction : « L'explication », ouverte en entier.
      const rate = m.exercices[0] && m.exercices[0].etat === 'corrige';
      const titre = el('h2', { tabindex: '-1', texte: t.nom === 'decouverte' && rate ? 'L’explication' : t.titre });
      conteneur.appendChild(titre);
      const corps = el('div', { classe: 'temps-corps' });
      conteneur.appendChild(corps);
      // « Continuer », juste sous le contenu ; il reçoit le focus quand il apparaît en cours de temps.
      const continuer = bouton('Continuer', () => { if (M.peutContinuer(m)) { M.suivant(m); afficher(); } });
      const suiteTemps = el('div', { classe: 'boutons suite-temps' }, [continuer]);
      let avecContinuer = true;

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
        premiere() { avecContinuer = false; question(corps, c.exercice); },
        manipulation() {
          if (c.mode === 'ecran' && window.Manipulations.obtenir(c.type)) {
            avecContinuer = false;
            const zone = el('div', { classe: 'manipulation' });
            const fin = el('div', { classe: 'fin-manipulation' });
            // Réussie : « Juste ! », puis les quatre boutons ; la note compte pour la carte de la notion.
            const conclure = (sansParler) => {
              const phrase = tirage.tirer('A');
              fin.replaceChildren(el('div', { classe: 'retour-parle verdict juste', 'aria-live': 'polite' }, [
                el('p', { classe: 'verdict-mot' }, [el('span', { classe: 'marque', 'aria-hidden': 'true', texte: '✓' }), document.createTextNode('Juste !')]),
                el('p', { classe: 'verdict-phrase', texte: phrase }), window.Voix.boutonReecouter(phrase)]));
              const b = window.VueAnki.boutons(null, (note) => { M.noterManipulation(m, note); M.suivant(m); apres(() => afficher()); });
              fin.append(b);
              b.montrer();
              if (!sansParler) dire(phrase);
            };
            if (m.manipulationFaite) { corps.append(fin); conclure(true); return; } // reprise : la manipulation était réussie
            corps.append(parole(c.consigne));
            if (c.etapes) corps.append(el('ol', { classe: 'reflexion' }, c.etapes.map((e) => el('li', { texte: e }))));
            corps.append(zone, fin);
            const reussie = () => { if (m.manipulationFaite && fin.childElementCount) return; M.marquerManipulation(m); sauver(); setTimeout(() => conclure(false), 1200); };
            zone.finir = reussie; // pour les tests au navigateur
            window.Manipulations.obtenir(c.type).monter(zone, c, dire, reussie);
          } else {
            // Réflexion guidée : une phrase dite, le dessin, puis les étapes à suivre de tête et sur le cahier.
            if (c.intro) corps.append(parole(c.intro));
            const i = image(c.image); if (i) corps.append(i);
            corps.append(el('ol', { classe: 'reflexion' }, (c.etapes || []).map((e) => el('li', { texte: e }))));
            M.marquerManipulation(m);
          }
        },
        decouverte() { corps.append(parole(c.texte, c.parle, false, rate)); const i = image(c.image); if (i) corps.append(i); },
        vocabulaire() { corps.append(parole(c.texte, null, false, rate)); },
        entrainement() { avecContinuer = false; question(corps, c.exercice); },
        defi() {
          avecContinuer = false;
          corps.append(el('p', { classe: 'enonce-defi', texte: c.enonce }));
          const i = image(c.image); if (i) corps.append(i);
          question(corps, c.question);
        },
        recompense() { avecContinuer = false; recompense(corps, c); },
      })[t.nom]();

      if (avecContinuer) corps.append(suiteTemps);
      const cible = focus === 'h3' ? conteneur.querySelector('h3') : null;
      (cible || titre).focus();
    }

    /** Une question (première question, entraînement, défi) : verdict, correction, quatre boutons ou « J'ai compris ». */
    function question(corps, q) {
      corps.append(el('h3', { tabindex: '-1', texte: q.retour ? 'Elle revient' : 'Question' }));
      corps.append(el('p', { classe: 'enonce', texte: q.enonce || q.texte }));
      const dessinQ = image(q.image); if (dessinQ) corps.append(dessinQ);
      let r = null;
      const deja = q.etat !== 'attente' ? { juste: q.etat === 'juste', saisie: q.saisie } : null;
      window.VueQuestion.poser(corps, q, {
        attendu: q.reponse ? M.ecrireReponse(q.reponse) : null,
        repondre(saisie) {
          if (q.grille) r = M.validerGrille(m, saisie);
          else r = M.repondre(m, saisie);
          q.saisie = saisie;
          sauver();
          return q.etat === 'juste';
        },
        reaction(juste) { return tirage.tirer(r ? r.situation : juste ? 'A' : 'E'); },
        dire,
        faux() { if (!q.note) noter(q.carte, 'revoir'); sauver(); },
        suite(note) {
          if (!q.note) noter(q.carte, note);
          const x = M.avancer(m);
          apres(() => afficher(x === 'question' ? 'h3' : 'h2'));
        },
        deja,
      });
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
      // Fin de mission : une phrase de la réserve G, puis parfois un dicton (réserve I).
      const phrase = tirage.tirer('G');
      const dicton = tirage.dicton();
      const bloc = el('div', { classe: 'retour-parle' }, [el('p', { texte: phrase }), dicton ? el('p', { classe: 'dicton', texte: dicton }) : null, window.Voix.boutonReecouter([phrase].concat(dicton || []))]);
      const suite = el('div', { classe: 'suite-mission' });
      corps.append(bloc, suite);
      const voix = window.Voix.lire([c.texte].concat(fait ? [fait] : [], [phrase], dicton ? [dicton] : []));
      enregistre.then(() => (options.suite ? options.suite(fin, voix) : null)).then((l) => { if (l && l.length) suite.replaceChildren(...l); }).catch(() => {});
    }

    afficher();
    return m;
  }

  window.VueMission = { lancer, jourEnLettres };
})();
