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

  /** Lance une mission dans conteneur. options : notion, etape, graine, aujourdhui, carteAvant, dire, surFin. */
  function lancer(conteneur, options) {
    const m = M.creer(options.notion, { graine: options.graine, etape: options.etape });
    const dire = options.dire;
    const tirage = options.tirage || window.Reserves.seance(); // réserves de phrases (SPEC.md, section 10)

    let termine = false; // la mission est finie : plus rien à perdre en la quittant

    function afficher() {
      const t = M.tempsCourant(m);
      const c = M.contenu(m);
      conteneur.innerHTML = '';
      const titre = el('h2', { tabindex: '-1', texte: t.titre });
      // Les pastilles pour les yeux ; « temps n sur 7 » pour le lecteur d'écran.
      conteneur.appendChild(el('div', { classe: 'entete-mission' }, [window.Habillage.pastilles(t.numero, t.total)]));
      const nomTemps = el('p', { classe: 'temps', texte: options.notion.titre });
      nomTemps.append(el('span', { classe: 'sr', texte: ' · temps ' + t.numero + ' sur ' + t.total }));
      conteneur.appendChild(nomTemps);
      const barre = options.barre || conteneur;
      const quitter = bouton('Quitter', () => {
        if (termine) { window.Voix.arreter(); options.surFin(null); return; }
        window.Habillage.confirmer('Quitter la mission ?', 'Tu reprendras cette mission au début.', 'Quitter', 'Continuer la mission').then((oui) => { if (oui) { window.Voix.arreter(); options.surFin(null); } });
      }, 'discret');
      quitter.setAttribute('aria-label', 'Quitter la mission');
      quitter.prepend(window.Habillage.icone('croix'));
      barre.replaceChildren(quitter);
      conteneur.appendChild(titre);
      const corps = el('div', { classe: 'temps-corps' });
      conteneur.appendChild(corps);
      const pied = el('div', { classe: 'boutons pied' });
      conteneur.appendChild(pied);
      const continuer = bouton('Continuer', () => { if (M.peutContinuer(m)) { M.suivant(m); afficher(); } });
      const majContinuer = () => { continuer.hidden = !M.peutContinuer(m); };

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
            window.Manipulations.obtenir(c.type).monter(zone, c, dire, () => { M.marquerManipulation(m); majContinuer(); });
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
        entrainement() { question(corps, c.exercice, 'Exercice ' + c.numero + ' sur ' + c.total, c.numero < c.total, majContinuer); },
        defi() {
          corps.append(el('p', { classe: 'enonce-defi', texte: c.enonce }));
          const i = image(c.image); if (i) corps.append(i);
          question(corps, c.question, 'Question ' + c.numero + ' sur ' + c.total, c.numero < c.total, majContinuer);
        },
        recompense() { recompense(corps, c); },
      })[t.nom]();

      pied.append(continuer);
      majContinuer();
      titre.focus();
    }

    function questionSuivante() {
      M.questionSuivante(m);
      afficher();
      conteneur.querySelector('h3').focus();
    }

    /** Un exercice ou une question du défi : saisie, choix, ou réponse rédigée avec grille. */
    function question(corps, q, entete, encoreUne, majContinuer) {
      corps.append(el('h3', { tabindex: '-1', texte: entete }));
      corps.append(el('p', { classe: 'enonce', texte: q.enonce || q.texte }));
      const dessinQ = image(q.image); if (dessinQ) corps.append(dessinQ); // un exercice peut avoir son dessin (tableau périodique…)
      const retour = el('div', { classe: 'retour', 'aria-live': 'polite' });
      const suite = el('div', { classe: 'boutons' });

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
      function premiereErreur(r) {
        const phrase = tirage.tirer('D');
        retour.innerHTML = '';
        const bloc = retourParle('faux', '✗ ' + phrase, [phrase, r.aideParlee]);
        bloc.insertBefore(el('p', { classe: 'indice', texte: 'Indice : ' + r.aide }), bloc.lastChild);
        retour.append(bloc);
        dire(phrase + ' Indice : ' + r.aide, [phrase, r.aideParlee]);
      }

      function finir(r) {
        fini = true; clearTimeout(minuteur); relance.innerHTML = '';
        retour.innerHTML = '';
        const phrase = tirage.tirer(r.situation);
        retour.append(retourParle(r.juste ? 'juste' : 'faux', (r.juste ? '✓ ' : '✗ ') + phrase, phrase), listeCorrection(r.correction));
        dire(phrase);
        if (encoreUne) suite.append(bouton('Question suivante', questionSuivante));
        majContinuer();
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
            fini = true; clearTimeout(minuteur); relance.innerHTML = '';
            const phrase = tirage.tirer(r.situation);
            retour.append(el('p', { classe: 'compte', texte: M.PHRASES.grille(r.reussis, r.total) }), retourParle('', phrase, phrase));
            dire(phrase);
            if (encoreUne) suite.append(bouton('Question suivante', questionSuivante));
            majContinuer();
          });
          corps.insertBefore(listeCorrection(q.correction), retour);
          corps.insertBefore(grille, retour);
          corps.insertBefore(valider, retour);
          grille.querySelector('input').focus();
        });
        corps.append(voir, relance, retour, suite);
        return;
      }

      if (q.reponse.type === 'choix') {
        const choix = el('div', { classe: 'boutons choix', role: 'group', 'aria-label': 'Réponses possibles' });
        q.reponse.options.forEach((o, i) => choix.append(bouton(o, () => {
          const r = M.repondre(m, i);
          if (r.fini) { choix.querySelectorAll('button').forEach((b) => { b.disabled = true; }); finir(r); }
          else premiereErreur(r);
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
          const r = M.repondre(m, champ.value);
          if (r.fini) { champ.disabled = true; formulaire.querySelector('button').disabled = true; finir(r); }
          else { premiereErreur(r); champ.select(); }
        });
        corps.append(formulaire);
      }
      const aide = bouton('Aide', () => { retour.innerHTML = ''; retour.append(parole(q.aide, q.aideParlee)); }, 'secondaire');
      corps.append(el('div', { classe: 'boutons' }, [aide]), relance, retour, suite);
    }

    function recompense(corps, c) {
      // Le fait culturel « Le savais-tu ? » (SPEC.md, principe 9) suit la récompense, lu juste après elle.
      const fait = options.notion.savaisTu;
      if (options.perles) corps.append(window.Habillage.sceneRecompense({ perles: options.perles, points: options.points || 0, gain: c.points }));
      corps.append(parole(c.texte, null, !!fait));
      if (fait) { corps.append(el('div', { classe: 'savais-tu' }, [parole(fait, null, true)])); window.Voix.lire([c.texte, fait]); }
      corps.append(el('p', { classe: 'gain', texte: 'Tu gagnes ' + c.points + ' cauris, et une perle de plus pour ton collier.' }));
      const question = el('fieldset', { classe: 'auto-evaluation' }, [el('legend', { texte: 'Pour toi, cette mission était :' })]);
      const zone = el('div', { classe: 'boutons' });
      question.append(zone);
      const libelles = { facile: 'Facile', hesite: 'J’ai hésité', rate: 'Raté' };
      for (const rep of window.Revision.REPONSES) {
        zone.append(bouton(libelles[rep], () => {
          const fin = M.terminer(m, rep, options.aujourdhui, window.Revision, options.carteAvant);
          termine = true;
          zone.querySelectorAll('button').forEach((b) => { b.disabled = true; });
          // Fin de mission : une phrase de la réserve G, puis parfois un dicton (réserve I) ; la date est seulement écrite.
          const phrase = tirage.tirer('G');
          const dicton = tirage.dicton();
          const dites = [phrase].concat(dicton || []);
          const bloc = retourParle('', phrase, dites);
          if (dicton) bloc.insertBefore(el('p', { classe: 'dicton', texte: dicton }), bloc.lastChild);
          corps.append(bloc, el('p', { classe: 'note', texte: M.PHRASES.note(jourEnLettres(fin.carte.echeance)) }),
            el('div', { classe: 'boutons' }, [bouton('Retour au quartier', () => options.surFin(fin))]));
          options.enregistrer(fin);
          dire(dites.join(' '), dites);
        }));
      }
      corps.append(question);
    }

    afficher();
    return m;
  }

  window.VueMission = { lancer, jourEnLettres };
})();
