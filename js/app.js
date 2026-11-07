/* Page d'accueil : village et quartiers, service worker (hors connexion), sauvegarde en un fichier, mission de démonstration. */
(function () {
  'use strict';
  window.Typographie.surveiller(document.body);
  const S = window.Stockage;
  const annonce = document.getElementById('annonce');
  const etat = document.getElementById('etat-hors-connexion');

  // L'annonce parle au lecteur d'écran et montre le texte, sauf si la zone de réponse le montre et l'annonce déjà.
  let finAnnonce = null;
  function dire(texte) {
    const norm = (x) => window.Voix.normaliser(x);
    const debut = norm(texte).slice(0, 20);
    const r = document.querySelector('#mission .retour');
    annonce.textContent = '';
    clearTimeout(finAnnonce);
    if (r && norm(r.textContent).includes(debut)) return;
    const z = document.getElementById('mission');
    annonce.classList.toggle('sr', !z.hidden && norm(z.textContent).includes(debut));
    setTimeout(() => { annonce.textContent = texte; }, 50);
    finAnnonce = setTimeout(() => { annonce.textContent = ''; }, 9000);
  }

  let base = null;
  function laBase() {
    if (!base) base = S.ouvrir(window.indexedDB);
    return base;
  }

  // Premier lancement : on note la date, pour que la base ne soit jamais vide.
  laBase().then(async (db) => {
    if (await S.lire(db, 'premierLancement') === undefined) await S.ecrire(db, 'premierLancement', Date.now());
  }).catch(() => dire('Le stockage n’est pas disponible sur cet appareil.'));

  document.getElementById('bouton-exporter').addEventListener('click', async () => {
    try {
      const texte = await S.exporter(await laBase());
      const lien = document.createElement('a');
      lien.href = URL.createObjectURL(new Blob([texte], { type: 'application/json' }));
      lien.download = S.nomFichierSauvegarde();
      document.body.appendChild(lien);
      lien.click();
      lien.remove();
      setTimeout(() => URL.revokeObjectURL(lien.href), 1000);
      dire('Sauvegarde enregistrée : ' + lien.download + '.');
    } catch (e) {
      dire('La sauvegarde n’a pas pu être enregistrée.');
    }
  });

  const champ = document.getElementById('fichier-import');
  document.getElementById('bouton-importer').addEventListener('click', () => champ.click());
  champ.addEventListener('change', async () => {
    const fichier = champ.files && champ.files[0];
    champ.value = '';
    if (!fichier) return;
    try {
      const resultat = await S.importer(await laBase(), await fichier.text());
      dire(resultat.ok ? 'Sauvegarde reprise. Ta progression est revenue.' : resultat.raison);
    } catch (e) {
      dire('La sauvegarde n’a pas pu être reprise.');
    }
  });

  // ---------- Chemins des blocs, missions et révision ----------
  // progression : { notions: { id: { missions, acquise, parTest } }, points, perles: [id…] } ; cartes : { id: carte de la notion } ;
  // cartesQ : { id de question : carte Anki } (consigne du 6 nov. 2026) ; enCours : { missions: { notion: état }, series: { mode: état } } ;
  // reprise : l'activité à reprendre à la prochaine ouverture ; tests : l'état du test de départ de chaque bloc.
  const R = window.Revision;
  const A = window.Avancement;
  const accueil = document.getElementById('accueil');
  const zoneMission = document.getElementById('mission');
  // Les blocs écrits et leur quartier du village : « Les nombres » au marché, « La matière » à la cuisine…
  const GRAPHES = Object.values(window.Contenu.graphes);
  const quartierDu = (g) => g.quartier || (g.matiere === 'maths' ? 'maths' : null);
  const NOTIONS = window.Contenu.notions;
  /** Le quartier d'une notion : c'est la couleur de sa perle. */
  const matiereDe = (id) => { const g = GRAPHES.find((x) => x.notions.some((n) => n.id === id)); return g ? quartierDu(g) : null; };
  const TESTS = (window.Contenu.tests) || {}; // un test de départ par bloc (contenu/test-depart-*.js)
  // La sauvegarde de chaque test ; « testDepart » est gardé pour « Les nombres », qui l'avait avant les autres blocs.
  const cleTest = (bloc) => (bloc === 'nombres' ? 'testDepart' : 'testDepart-' + bloc);
  const notionsDuQuartier = (q) => GRAPHES.filter((g) => quartierDu(g) === q).flatMap((g) => g.notions.map((x) => NOTIONS[x.id])).filter(Boolean);

  async function lireEtat(db) {
    const progression = (await S.lire(db, 'progression')) || { notions: {}, points: 0, perles: [] };
    const cartes = (await S.lire(db, 'cartes')) || {};
    const cartesQ = (await S.lire(db, 'cartesQuestions')) || {};
    const enCours = (await S.lire(db, 'enCours')) || { missions: {}, series: {} };
    const reprise = (await S.lire(db, 'reprise')) || null;
    const tests = {};
    for (const bloc of Object.keys(TESTS)) tests[bloc] = (await S.lire(db, cleTest(bloc))) || null;
    return { progression, cartes, cartesQ, enCours, reprise, tests };
  }

  async function etatOuVide() {
    try { const db = await laBase(); return Object.assign({ db }, await lireEtat(db)); } catch (e) { return { db: null, progression: { notions: {}, points: 0, perles: [] }, cartes: {}, cartesQ: {}, enCours: { missions: {}, series: {} }, reprise: null, tests: {} }; }
  }
  async function ecrire(cle, valeur) {
    try { await S.ecrire(await laBase(), cle, valeur); } catch (e) { dire('Ta progression n’a pas pu être enregistrée.'); }
  }

  /** Les questions à réviser aujourd'hui dans un quartier, les plus en retard d'abord. Une ancienne carte de notion due,
      sans cartes de question, donne toutes les questions de la notion : les anciennes cartes restent valables. */
  function questionsDues(etat, q) {
    const ids = new Set(notionsDuQuartier(q).map((n) => n.id));
    const jour = R.jourDe();
    const l = R.duesQuestions(etat.cartesQ, jour, [...ids]).map((id) => ({ id, echeance: etat.cartesQ[id].echeance }));
    for (const nid of R.dues(etat.cartes, jour).filter((x) => ids.has(x))) {
      const propres = A.cartesDe(NOTIONS[nid]);
      if (propres.some((id) => etat.cartesQ[id])) continue;
      for (const id of propres) l.push({ id, echeance: etat.cartes[nid].echeance });
    }
    return l.sort((a, b) => (a.echeance < b.echeance ? -1 : a.echeance > b.echeance ? 1 : 0)).map((x) => x.id);
  }

  /** La prochaine mission ouverte d'un quartier, pas encore faite : une mission commencée d'abord, puis les bases, puis le programme
      (dans chaque groupe, l'ordre des chemins). */
  function prochaineMission(etat, q, sauf) {
    const notions = notionsDuQuartier(q);
    const commencee = notions.find((n) => n.id !== sauf && etat.enCours.missions[n.id]);
    if (commencee) return commencee;
    const acquises = Object.keys(etat.progression.notions).filter((id) => etat.progression.notions[id].acquise).concat(sauf ? [sauf] : []);
    const graphes = GRAPHES.filter((g) => quartierDu(g) === q);
    const id = window.Prerequis.suivanteDansMatiere(graphes, acquises, (x) => x === sauf || !NOTIONS[x] || !!etat.cartes[x]);
    return id ? NOTIONS[id] : null;
  }

  /** Les chemins du quartier ouvert, avec l'avancement de chaque notion et de la matière ; le bouton « Réviser ». */
  async function montrerRevision() {
    const etat = await etatOuVide();
    // Plafonds de mai et juin : appliqués à chaque ouverture, aux cartes déjà programmées.
    const p = R.appliquerPlafonds(etat.cartes, R.jourDe());
    if (p.changees && etat.db) { try { await S.ecrire(etat.db, 'cartes', p.cartes); } catch (e) { /* tant pis */ } }
    const pq = R.appliquerPlafonds(etat.cartesQ, R.jourDe());
    if (pq.changees && etat.db) { try { await S.ecrire(etat.db, 'cartesQuestions', pq.cartes); } catch (e) { /* tant pis */ } }
    etat.cartes = p.cartes;
    etat.cartesQ = pq.cartes;
    mettreAJourVillage(etat);
    if (!quartierOuvert) return;
    const cartes = p.cartes;
    const acquises = Object.keys(etat.progression.notions).filter((id) => etat.progression.notions[id].acquise);
    // Sous « Jouer », une seule ligne : l'avancement de la matière, avec sa barre.
    const am = A.matiere(notionsDuQuartier(quartierOuvert), etat.cartesQ, etat.progression);
    document.getElementById('avance-quartier').replaceChildren(window.Habillage.avancement(am.pourcent, 'Avancement : ' + A.enTexte(am.pourcent)));
    // Le matin et le soir ne servent qu'une fois des notions vues.
    document.getElementById('zone-jour').hidden = !notionsVues(etat.progression).length;
    const zone = document.getElementById('chemins');
    zone.innerHTML = '';
    for (const graphe of GRAPHES.filter((g) => quartierDu(g) === quartierOuvert)) {
      const ouvertes = new Set(window.Prerequis.ouvertes(graphe, acquises));
      const titre = document.createElement('h3');
      titre.textContent = 'Le chemin : ' + graphe.titre.replace(/^./, (x) => x.toLowerCase());
      const liste = document.createElement('ol');
      liste.className = 'chemin';
      liste.setAttribute('role', 'list');
      graphe.notions.forEach((g, rang) => {
        const n = NOTIONS[g.id];
        const carte = cartes[g.id];
        const aReviser = !!carte && carte.echeance <= R.jourDe();
        const acquise = acquises.includes(g.id);
        const pourcent = n ? A.notion(n, etat.cartesQ, etat.progression.notions[g.id]) : 0;
        const commun = { id: g.id, rang, numero: g.numero, titre: g.titre, matiere: quartierOuvert, aReviser, pourcent };
        if (n && (ouvertes.has(g.id) || acquise)) {
          liste.append(window.Habillage.etapeChemin(Object.assign(commun, { etat: carte || acquise ? 'faite' : 'ouverte', action: () => { nouvelleSeance(); lancerMission(n); } })));
        } else {
          // Une étape fermée : un simple cadenas, lu « pas encore ouverte ».
          liste.append(window.Habillage.etapeChemin(Object.assign(commun, { etat: 'fermee', noteSr: 'pas encore ouverte' })));
        }
      });
      zone.append(titre, liste);
      window.Habillage.tracerChemin(liste);
    }
    // Les tests de départ des blocs du quartier (SPEC.md, section 7).
    const zoneTests = document.getElementById('tests');
    zoneTests.innerHTML = '';
    for (const graphe of GRAPHES.filter((g) => quartierDu(g) === quartierOuvert && TESTS[g.bloc])) {
      const tour = TESTS[graphe.bloc];
      const t = etat.tests[graphe.bloc];
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.test = graphe.bloc;
      b.textContent = (t && t.fini ? 'Refaire : ' : t ? 'Reprendre : ' : '') + tour.titre;
      b.addEventListener('click', () => { nouvelleSeance(6); lancerTest(graphe.bloc); });
      zoneTests.append(b);
    }
    document.getElementById('zone-tests').hidden = !zoneTests.childElementCount;
  }

  /** Sous chaque quartier du village, le pourcentage de sa matière. */
  function mettreAJourVillage(etat) {
    for (const b of document.querySelectorAll('#village [data-quartier]')) {
      const notions = notionsDuQuartier(b.dataset.quartier);
      const s = b.querySelector('.quartier-avance');
      if (!s) continue;
      if (!notions.length) { s.textContent = ''; continue; }
      const am = A.matiere(notions, etat.cartesQ, etat.progression);
      s.textContent = A.enTexte(am.pourcent);
    }
  }

  // ---------- Historique : chaque écran ajoute une entrée ; le Retour du téléphone remonte d'un écran ----------
  const pile = []; // écrans ouverts au-dessus du village : 'quartier', 'zone' (mission, test, séance), 'reglages'
  let apresRetour = null; // ce que fait le prochain retour dans l'historique, quand c'est l'application qui remonte
  let zoneOuverte = null; // { sorte, focus } : la mission, le test ou la séance en cours
  let jetonZone = 0; // change à chaque ouverture ou fermeture de zone : une suite automatique d'avant ne s'applique plus
  let enQuestion = false; // le choix de « Pause » est montré
  try { history.replaceState({ djeli: 0 }, ''); } catch (e) { /* sans historique */ }
  function empiler(nom) { pile.push(nom); try { history.pushState({ djeli: pile.length }, ''); } catch (e) { /* sans historique */ } }
  /** Remonte de n écrans dans l'historique, puis fait action. */
  function remonter(n, action) {
    n = Math.min(n, pile.length);
    if (!n) { action(); return; }
    pile.splice(pile.length - n, n);
    apresRetour = action;
    try { history.go(-n); } catch (e) { /* sans historique : le filet ci-dessous agit */ }
    // Filet : si le navigateur ne rend pas la main, l'action se fait quand même.
    setTimeout(() => { if (apresRetour === action) { apresRetour = null; action(); } }, 800);
  }
  window.addEventListener('popstate', () => {
    if (apresRetour) { const a = apresRetour; apresRetour = null; a(); return; }
    const haut = pile.pop();
    if (haut === 'reglages') fermerReglagesEcran();
    else if (haut === 'zone') { empiler('zone'); pause(); } // le Retour du téléphone ouvre « Pause » : rien n'est perdu
    else if (haut === 'quartier') retourVillageEcran();
  });

  const boutonPause = document.getElementById('bouton-pause');
  function ouvrirZone(sorte, focusId, reprise) {
    jetonZone++;
    zoneOuverte = { sorte, focus: focusId };
    zoneQuartier.hidden = true;
    accueil.hidden = true;
    zoneMission.hidden = false;
    boutonPause.hidden = false;
    empiler('zone');
    window.scrollTo(0, 0);
    // L'activité à reprendre à la prochaine ouverture, tant qu'elle n'est pas finie.
    if (reprise) ecrire('reprise', Object.assign({ quartier: quartierOuvert }, reprise));
  }
  /** Ferme la zone ; puisVillage : on va ensuite au village ; ensuite : une action de plus (mission suivante, mot de fin). */
  function fermerZone(focusId, puisVillage, ensuite) {
    jetonZone++;
    zoneOuverte = null;
    boutonPause.hidden = true;
    window.Voix.arreter();
    window.VueAnki.oublierClavier();
    remonter(puisVillage ? pile.length : 1, () => {
      zoneMission.hidden = true;
      zoneMission.innerHTML = '';
      annonce.textContent = '';
      if (puisVillage) { retourVillageEcran(true); montrerRevision(); }
      else {
        zoneQuartier.hidden = false;
        montrerRevision().then(() => {
          const b = focusId && document.querySelector(focusId);
          if (b && b.closest('#voir-tout')) document.getElementById('voir-tout').open = true;
          if (b) b.focus(); else if (!ensuite) document.getElementById('bouton-jouer').focus();
        });
      }
      if (ensuite) ensuite();
    });
  }
  const finActivite = () => ecrire('reprise', null);

  /** « Pause » : trois choix, l'endroit exact est déjà gardé (consigne du 6 nov. 2026). */
  async function pause() {
    if (!zoneOuverte || enQuestion) return;
    enQuestion = true;
    const focus = zoneOuverte.focus;
    const c = await window.Habillage.choisir('Pause', 'Tout ce que tu as fait est gardé : tu reprendras à cet endroit précis.', [
      { valeur: 'autre', texte: 'Autre mission de cette matière' },
      { valeur: 'matiere', texte: 'Changer de matière' },
      { valeur: 'arreter', texte: 'Arrêter pour aujourd’hui' },
    ], 'Continuer ici');
    enQuestion = false;
    if (!zoneOuverte) return;
    if (c === 'autre') { finActivite(); fermerZone(focus); }
    else if (c === 'matiere') { finActivite(); fermerZone(null, true); }
    else if (c === 'arreter') fermerZone(null, true, () => { montrerReprise(); dire('C’est noté : tout est gardé. À bientôt !'); });
  }
  boutonPause.addEventListener('click', pause);

  /** La suite après une mission, une révision ou un test : la prochaine activité démarre seule 3 s après la voix,
      sauf si Rachel choisit « Autre mission de cette matière », « Changer de matière » ou « Arrêter pour aujourd'hui ». */
  async function suiteDe(q, voix, sauf) {
    const jeton = jetonZone;
    const etat = await etatOuVide();
    const dues = questionsDues(etat, q).filter((id) => R.notionDe(id) !== sauf);
    const prochaine = dues.length ? null : prochaineMission(etat, q, sauf);
    const b = (texte, action, classe) => { const x = document.createElement('button'); x.type = 'button'; x.textContent = texte; if (classe) x.className = classe; x.addEventListener('click', () => { jetonZone++; action(); }); return x; };
    const info = document.createElement('p');
    info.className = 'suite-info';
    info.setAttribute('aria-live', 'polite');
    const choix = document.createElement('div');
    choix.className = 'boutons suite-choix';
    choix.append(
      b('Autre mission de cette matière', () => { finActivite(); fermerZone(null); }),
      b('Changer de matière', () => { finActivite(); fermerZone(null, true); }),
      b('Arrêter pour aujourd’hui', () => { finActivite(); fermerZone(null, true, () => dire('C’est noté : ta progression est gardée. À bientôt !')); }, 'secondaire'));
    let lancer = null;
    if (dues.length) { info.textContent = 'Ensuite : tes révisions. Elles commencent dans 3 secondes.'; lancer = () => lancerSerie('revision'); }
    else if (prochaine) { info.textContent = 'Ensuite : « ' + prochaine.titre + ' ». Ça commence dans 3 secondes.'; lancer = () => lancerMission(prochaine); }
    else info.textContent = 'Tu as fini le chemin de cette matière. Bravo !';
    // Séance finie (5 questions) : pas de suite automatique, la petite récompense propose « Encore 5 ».
    if (lancer && compte >= limite) {
      const encore = b('Encore ' + limite, () => { nouvelleSeance(limite); finActivite(); fermerZone(null, false, lancer); });
      encore.classList.add('encore');
      info.textContent = '';
      choix.prepend(encore);
      setTimeout(() => encore.focus(), 0);
      return [info, choix];
    }
    if (lancer) {
      // La voix de Djéli d'abord ; puis 3 secondes ; puis la suite, si rien n'a été choisi entre-temps.
      Promise.resolve(voix).then(() => new Promise((ok) => setTimeout(ok, 3000))).then(() => {
        if (jeton !== jetonZone || jetonZone !== jeton) return;
        if (document.querySelector('dialog[open]')) return;
        finActivite();
        fermerZone(null, false, lancer);
      });
    }
    return [info, choix];
  }

  // ---------- Village et quartiers ----------
  const V = window.Village;
  const zoneQuartier = document.getElementById('quartier');
  const titreQuartier = document.getElementById('titre-quartier');
  let quartierOuvert = null;


  // Voix de Djéli Awa : réglage oui / non, phrase d'accueil (lue si le navigateur le permet), boutons « Réécouter ».
  const Voix = window.Voix;
  Voix.monterReglage(document.getElementById('reglage-voix'));
  function ouvrirQuartier(id, sansVoix) {
    const q = V.quartier(id);
    if (!pile.includes('quartier')) empiler('quartier');
    document.title = q.lieu + ', ' + q.matiere.toLowerCase() + ' – Djéli Awa';
    quartierOuvert = id;
    window.Habillage.entrerMatiere(id);
    titreQuartier.textContent = q.matiere;
    // Un quartier montre ses chemins s'il a au moins un bloc écrit ; sinon, « bientôt ».
    const avecBloc = GRAPHES.some((g) => quartierDu(g) === id);
    document.getElementById('voir-tout').hidden = !avecBloc;
    document.getElementById('voir-tout').open = false;
    document.getElementById('missions-bientot').hidden = avecBloc;
    document.getElementById('bouton-jouer').hidden = !avecBloc;
    document.getElementById('avance-quartier').hidden = !avecBloc;
    const pret = montrerRevision();
    accueil.hidden = true;
    zoneQuartier.hidden = false;
    window.scrollTo(0, 0);
    // « Jouer » est le premier lu (consigne du 6 nov. 2026, 21 h 37).
    (avecBloc ? document.getElementById('bouton-jouer') : titreQuartier).focus();
    return pret;
  }

  const TITRE_PAGE = document.title;
  /** Montre le village. titre : le focus va sur le titre du village (on change de matière), sinon sur le quartier quitté. */
  function retourVillageEcran(titre) {
    Voix.arreter();
    window.Habillage.entrerMatiere(null);
    document.title = TITRE_PAGE;
    zoneQuartier.hidden = true;
    accueil.hidden = false;
    window.scrollTo(0, 0);
    const b = !titre && document.querySelector('[data-quartier="' + quartierOuvert + '"]');
    if (b) b.focus(); else document.getElementById('titre-village').focus();
  }
  function retourVillage() { remonter(pile.length, () => retourVillageEcran()); }

  /** Le bouton Village de la barre du haut, toujours là : tout est gardé, on rejoint le village. */
  async function allerAuVillage() {
    if (!pageReglages.hidden) await new Promise((ok) => remonter(1, () => { fermerReglagesEcran(true); ok(); }));
    if (!zoneMission.hidden) { finActivite(); fermerZone(null, true); return; }
    if (!zoneQuartier.hidden) { remonter(pile.length, () => retourVillageEcran(true)); return; }
    window.scrollTo(0, 0);
    document.getElementById('titre-village').focus();
  }

  // ---------- Page de réglages : elle s'ouvre par-dessus l'écran en cours, et y revient sans rien perdre ----------
  const pageReglages = document.getElementById('reglages');
  const boutonReglages = document.getElementById('bouton-reglages');
  boutonReglages.prepend(window.Habillage.icone('reglages'));
  let cachesParReglages = [];
  let pauseAvantReglages = false;
  const vueSons = window.VueSons.monter();
  boutonReglages.addEventListener('click', () => {
    Voix.arreter();
    empiler('reglages');
    cachesParReglages = [accueil, zoneQuartier, zoneMission].filter((z) => !z.hidden);
    cachesParReglages.forEach((z) => { z.hidden = true; });
    pauseAvantReglages = !boutonPause.hidden;
    boutonPause.hidden = true;
    boutonReglages.hidden = true;
    pageReglages.hidden = false;
    window.scrollTo(0, 0);
    document.getElementById('titre-reglages').focus();
    vueSons.rafraichir();
  });
  function fermerReglagesEcran(sansFocus) {
    pageReglages.hidden = true;
    cachesParReglages.forEach((z) => { z.hidden = false; });
    boutonPause.hidden = !pauseAvantReglages;
    boutonReglages.hidden = false;
    if (!sansFocus) boutonReglages.focus();
  }
  document.getElementById('bouton-fermer-reglages').addEventListener('click', () => remonter(1, () => fermerReglagesEcran()));
  const boutonVillage = document.getElementById('bouton-village');
  boutonVillage.prepend(window.Habillage.icone('maison'));
  boutonVillage.addEventListener('click', allerAuVillage);
  boutonPause.prepend(window.Habillage.icone('pause'));

  // La barre tient toujours sur une ligne : si les mots ne tiennent pas (texte agrandi), les icônes seules.
  const barre = document.querySelector('header.barre');
  function ajusterBarre() {
    barre.classList.remove('barre-icones');
    if (barre.scrollWidth > barre.clientWidth + 1 || [...barre.querySelectorAll('button')].some((b) => !b.hidden && b.getBoundingClientRect().top > barre.querySelector('button:not([hidden])').getBoundingClientRect().top + 4)) barre.classList.add('barre-icones');
  }
  if (typeof ResizeObserver === 'function') new ResizeObserver(() => requestAnimationFrame(ajusterBarre)).observe(barre);
  new MutationObserver(ajusterBarre).observe(boutonPause, { attributes: true, attributeFilter: ['hidden'] });
  ajusterBarre();

  V.matieres(document.getElementById('village'), ouvrirQuartier);

  /** « Jouer » : sans rien demander, la reprise dans cette matière, sinon ses révisions dues, sinon la mission suivante
      (les bases d'abord, puis le programme). Le bouton « Réviser » faisait doublon : il est retiré (21 h 46). */
  async function jouer(q) {
    nouvelleSeance();
    const etat = await etatOuVide();
    const r = etat.reprise;
    if (r && (r.quartier === q || (r.notion && matiereDe(r.notion) === q)) && repriseValable(etat, r)) { reprendreActivite(r); return; }
    if (etat.enCours.series && etat.enCours.series['revision-' + q]) { lancerSerie('revision'); return; }
    const commencee = notionsDuQuartier(q).find((n) => etat.enCours.missions[n.id]);
    if (commencee) { lancerMission(commencee); return; }
    if (questionsDues(etat, q).length) { lancerSerie('revision'); return; }
    const n = prochaineMission(etat, q);
    if (n) lancerMission(n);
    else dire('Tu as fini le chemin de cette matière. Bravo !');
  }
  document.getElementById('bouton-jouer').addEventListener('click', () => jouer(quartierOuvert));

  // ---------- Séances courtes : 5 questions au plus (6 au test de départ), puis une petite récompense ----------
  let compte = 0, limite = 5;
  function nouvelleSeance(n) { compte = 0; limite = n || 5; }
  /** Après chaque question notée : la suite, ou, à la 5e, « Encore 5 » (le focus) et « Arrêter là » (comme Pause). */
  function apresQuestion(continuer) {
    compte++;
    if (compte < limite || !zoneOuverte) { continuer(); return; }
    const jeton = jetonZone;
    // Une phrase de la réserve G qui ne dit pas au revoir (on peut continuer) : son son existe déjà.
    const BRAVO = ['Belle séance ! Tu as bien travaillé.', 'Bravo pour ta persévérance !', 'Tu progresses à chaque séance, continue !', 'Superbe travail aujourd’hui !'];
    const p = BRAVO[Math.floor(Math.random() * BRAVO.length)];
    zoneMission.innerHTML = '';
    const h = document.createElement('h2');
    h.tabIndex = -1;
    h.textContent = 'Bien joué !';
    const choix = document.createElement('div');
    choix.className = 'boutons suite-choix';
    const bouton = (texte, action, classe) => { const x = document.createElement('button'); x.type = 'button'; x.textContent = texte; if (classe) x.className = classe; x.addEventListener('click', action); return x; };
    const encore = bouton('Encore ' + limite, () => { if (jeton !== jetonZone) return; nouvelleSeance(limite); continuer(); }, 'encore');
    choix.append(encore, bouton('Arrêter là', () => { if (jeton !== jetonZone) return; fermerZone(null, true, () => { montrerReprise(); dire('C’est noté : tout est gardé. À bientôt !'); }); }, 'secondaire'));
    zoneMission.append(h, window.Habillage.bulle(p, Voix.boutonReecouter(p)), choix);
    try { window.Habillage.confettis(); } catch (e) { /* sans confettis */ }
    Voix.lire(p);
    window.scrollTo(0, 0);
    encore.focus();
  }

  // ---------- Sons du bloc : gardés à son ouverture ; sans internet, le bloc se joue avec les sous-titres ----------
  const voixSignalee = new Set();
  async function ouvrirSonsDuBloc(bloc) {
    if (!window.Sons || !window.Sons.disponible() || !bloc) return;
    if (navigator.onLine !== false) { window.Sons.ouvrirBloc(bloc); return; }
    const e = await window.Sons.etat(bloc).catch(() => null);
    if (e && !e.complet && !voixSignalee.has(bloc)) {
      voixSignalee.add(bloc);
      dire('Pour entendre ma voix ici, il faut internet une fois. En attendant, les sous-titres sont là.');
    }
  }

  /** Le test de départ d'un bloc : il se coupe et reprend à l'endroit exact, question par question. */
  async function lancerTest(bloc) {
    ouvrirSonsDuBloc(bloc);
    const etat = await etatOuVide();
    const t0 = etat.tests[bloc];
    ouvrirZone('test', '[data-test="' + bloc + '"]', { sorte: 'test', bloc });
    window.VueSeances.lancerTest(zoneMission, {
      tour: TESTS[bloc],
      aujourdhui: R.jourDe(), cartesQ: etat.cartesQ, apresQuestion,
      noterCarte(carte, note) { etat.cartesQ[carte] = R.programmerQuestion(etat.cartesQ[carte] || null, note, R.jourDe(), carte); ecrire('cartesQuestions', etat.cartesQ); },
      graphe: window.Contenu.graphes[bloc],
      notions: NOTIONS,
      etat: t0 && !t0.fini ? t0 : null,
      async enregistrer(t) { if (etat.db) { try { await S.ecrire(etat.db, cleTest(bloc), t); } catch (e) { dire('Ta progression n’a pas pu être enregistrée.'); } } },
      terminer(t) {
        // Notions acquises au test : prérequis remplis, et révision 3 jours plus tard (décision du 1er novembre 2026).
        const b = window.Seances.bilan(t, R.jourDe(), R);
        const pr = etat.progression;
        for (const id of b.acquises) {
          pr.notions[id] = Object.assign({ missions: 0 }, pr.notions[id], { acquise: true, parTest: true });
          if (!etat.cartes[id]) etat.cartes[id] = b.cartes[id];
        }
        finActivite();
        if (etat.db) { S.ecrire(etat.db, 'progression', pr).then(() => S.ecrire(etat.db, 'cartes', etat.cartes)).catch(() => dire('Ta progression n’a pas pu être enregistrée.')); }
        return b;
      },
      quitter() { fermerZone('[data-test="' + bloc + '"]'); },
      suite() { return suiteDe(quartierOuvert, null); },
    });
  }

  /** Une séance question par question : « matin », « soir » ou « revision » (les questions dues du quartier). Reprise exacte. */
  async function lancerSerie(mode) {
    const etat = await etatOuVide();
    const cle = mode === 'revision' ? 'revision-' + quartierOuvert : mode;
    let serie = etat.enCours.series && etat.enCours.series[cle];
    if (!serie) {
      const vues = notionsVues(etat.progression);
      const etapes = {};
      for (const n of vues) etapes[n.id] = window.Mission.etapeVocabulaire(Math.max(0, (etat.progression.notions[n.id].missions || 0) - 1));
      const graine = Date.now();
      const entrees = mode === 'matin' ? window.Seances.entreesDuMatin(vues, graine)
        : mode === 'soir' ? window.Seances.entreesDuSoir(vues, graine, etapes, NOTIONS)
          : window.Seances.entreesDeRevision(questionsDues(etat, quartierOuvert), graine, etapes);
      serie = window.Seances.creerSerie(mode, entrees);
    }
    const focus = mode === 'revision' ? '#bouton-jouer' : '#bouton-' + mode;
    ouvrirZone('serie', focus, { sorte: 'serie', mode });
    const sauver = (s) => { etat.enCours.series = etat.enCours.series || {}; etat.enCours.series[cle] = s; ecrire('enCours', etat.enCours); };
    window.VueSeances.lancerSerie(zoneMission, {
      mode, serie, notions: NOTIONS, aujourdhui: R.jourDe(), cartesQ: etat.cartesQ, apresQuestion,
      sauver,
      noterCarte(carte, note) { etat.cartesQ[carte] = R.programmerQuestion(etat.cartesQ[carte] || null, note, R.jourDe(), carte); ecrire('cartesQuestions', etat.cartesQ); },
      quitter() { finActivite(); fermerZone(focus); },
      fin(voix) {
        delete etat.enCours.series[cle];
        ecrire('enCours', etat.enCours);
        finActivite();
        return suiteDe(quartierOuvert, voix);
      },
    });
  }
  document.getElementById('bouton-matin').addEventListener('click', () => { nouvelleSeance(); lancerSerie('matin'); });
  document.getElementById('bouton-soir').addEventListener('click', () => { nouvelleSeance(); lancerSerie('soir'); });

  /** Les notions déjà vues : acquises au test ou faites en mission. */
  function notionsVues(progression) {
    return GRAPHES.flatMap((gr) => gr.notions).map((g) => g.id).filter((id) => NOTIONS[id] && progression.notions[id] && (progression.notions[id].acquise || progression.notions[id].missions)).map((id) => NOTIONS[id]);
  }

  /** Une mission : question par question, à la façon d'Anki ; reprise à l'endroit exact si elle était commencée. */
  async function lancerMission(notion) {
    ouvrirSonsDuBloc(notion.bloc);
    const etat = await etatOuVide();
    const suivi = etat.progression.notions[notion.id] || { missions: 0 };
    const reprise = etat.enCours.missions[notion.id] || null;
    const q = matiereDe(notion.id) || quartierOuvert;
    ouvrirZone('mission', '[data-notion="' + notion.id + '"]', { sorte: 'mission', notion: notion.id });
    window.VueMission.lancer(zoneMission, {
      notion,
      reprise,
      etape: window.Mission.etapeVocabulaire(suivi.missions),
      aujourdhui: R.jourDe(),
      carteAvant: etat.cartes[notion.id] || null,
      apresQuestion,
      perles: etat.progression.perles.map(matiereDe),
      points: etat.progression.points || 0,
      dire(texte, parle) { dire(texte); Voix.lire(parle || texte); },
      sauver(s) { etat.enCours.missions[notion.id] = s; ecrire('enCours', etat.enCours); },
      noterCarte(carte, note) { etat.cartesQ[carte] = R.programmerQuestion(etat.cartesQ[carte] || null, note, R.jourDe(), carte); ecrire('cartesQuestions', etat.cartesQ); },
      async enregistrer(fin) {
        const pr = etat.progression;
        pr.notions[fin.notion] = Object.assign({}, pr.notions[fin.notion], { missions: (suivi.missions || 0) + 1, acquise: true });
        pr.points = (pr.points || 0) + fin.points;
        if (!pr.perles.includes(fin.notion)) pr.perles.push(fin.notion);
        etat.cartes[fin.notion] = fin.carte;
        delete etat.enCours.missions[fin.notion];
        finActivite();
        await ecrire('progression', pr);
        await ecrire('cartes', etat.cartes);
        await ecrire('enCours', etat.enCours);
      },
      surFin() { fermerZone('[data-notion="' + notion.id + '"]'); },
      suite(fin, voix) { return suiteDe(q, voix, notion.id); },
    });
  }

  // ---------- Reprendre là où tu t'es arrêtée ----------
  const boutonReprendre = document.getElementById('bouton-reprendre');
  async function montrerReprise() {
    const etat = await etatOuVide();
    const r = etat.reprise;
    const ok = repriseValable(etat, r);
    boutonReprendre.hidden = !ok;
    if (ok) boutonReprendre.querySelector('.reprendre-quoi').textContent = r.sorte === 'mission' ? 'La mission « ' + NOTIONS[r.notion].titre + ' »' : r.sorte === 'test' ? TESTS[r.bloc].titre : r.mode === 'matin' ? 'Les automatismes du matin' : r.mode === 'soir' ? 'Le papier du soir' : 'Tes révisions';
  }
  function repriseValable(etat, r) {
    return !!r && ((r.sorte === 'mission' && NOTIONS[r.notion] && etat.enCours.missions[r.notion]) || (r.sorte === 'serie') || (r.sorte === 'test' && TESTS[r.bloc]));
  }
  function reprendreActivite(r) {
    if (r.sorte === 'mission') lancerMission(NOTIONS[r.notion]);
    else if (r.sorte === 'test') { limite = 6; lancerTest(r.bloc); }
    else lancerSerie(r.mode);
  }
  boutonReprendre.addEventListener('click', async () => {
    const etat = await etatOuVide();
    const r = etat.reprise;
    if (!r) return;
    nouvelleSeance(r.sorte === 'test' ? 6 : 5);
    const q = r.quartier || (r.notion ? matiereDe(r.notion) : 'maths');
    await ouvrirQuartier(q, true);
    reprendreActivite(r);
  });

  montrerRevision();
  montrerReprise();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').then(() => navigator.serviceWorker.ready).then(() => {
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
      // L'accueil ne montre que ce qui sert à apprendre : plus de phrase sur le fonctionnement hors connexion (6 nov. 2026).
    }).catch(() => { /* sans service worker, l'application marche quand même en ligne */ });
  }
})();
