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
  // progression : { notions: { id: { missions, acquise, parTest } }, points, perles: [id…] } ; cartes : { id: carte de révision } ;
  // tests : l'état du test de départ de chaque bloc (js/seances.js), gardé après chaque étape.
  const R = window.Revision;
  const accueil = document.getElementById('accueil');
  const zoneMission = document.getElementById('mission');
  const etatRevision = document.getElementById('etat-revision');
  // Les blocs écrits et leur quartier du village : « Les nombres » au marché, « La matière » à la cuisine…
  const GRAPHES = Object.values(window.Contenu.graphes);
  const quartierDu = (g) => g.quartier || (g.matiere === 'maths' ? 'maths' : null);
  const NOTIONS = window.Contenu.notions;
  /** Le quartier d'une notion : c'est la couleur de sa perle. */
  const matiereDe = (id) => { const g = GRAPHES.find((x) => x.notions.some((n) => n.id === id)); return g ? quartierDu(g) : null; };
  const TESTS = (window.Contenu.tests) || {}; // un test de départ par bloc (contenu/test-depart-*.js)
  // La sauvegarde de chaque test ; « testDepart » est gardé pour « Les nombres », qui l'avait avant les autres blocs.
  const cleTest = (bloc) => (bloc === 'nombres' ? 'testDepart' : 'testDepart-' + bloc);

  async function lireEtat(db) {
    const progression = (await S.lire(db, 'progression')) || { notions: {}, points: 0, perles: [] };
    const cartes = (await S.lire(db, 'cartes')) || {};
    const tests = {};
    for (const bloc of Object.keys(TESTS)) tests[bloc] = (await S.lire(db, cleTest(bloc))) || null;
    return { progression, cartes, tests };
  }

  async function etatOuVide() {
    try { const db = await laBase(); return Object.assign({ db }, await lireEtat(db)); } catch (e) { return { db: null, progression: { notions: {}, points: 0, perles: [] }, cartes: {}, tests: {} }; }
  }

  /** Les chemins du quartier ouvert : pour chaque bloc, chaque notion du graphe, ouverte (bouton) ou fermée (texte), avec sa révision. */
  async function montrerRevision() {
    const etat = await etatOuVide();
    // Plafonds de mai et juin : appliqués à chaque ouverture, aux cartes déjà programmées.
    const p = R.appliquerPlafonds(etat.cartes, R.jourDe());
    if (p.changees && etat.db) { try { await S.ecrire(etat.db, 'cartes', p.cartes); } catch (e) { /* tant pis */ } }
    const cartes = p.cartes;
    const acquises = Object.keys(etat.progression.notions).filter((id) => etat.progression.notions[id].acquise);
    const dues = R.dues(cartes, R.jourDe()).filter((id) => NOTIONS[id]);
    etatRevision.textContent = dues.length ? (dues.length === 1 ? 'Une mission est à réviser aujourd’hui.' : dues.length + ' missions sont à réviser aujourd’hui.') : '';
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
        let note = '';
        if (carte) note = aReviser ? 'À réviser aujourd’hui.' : 'Faite. Révision le ' + window.VueMission.jourEnLettres(carte.echeance) + '.';
        else if (ouvertes.has(g.id)) note = 'Ouverte.';
        const acquise = acquises.includes(g.id);
        const commun = { id: g.id, rang, numero: g.numero, titre: g.titre, matiere: quartierOuvert, aReviser };
        if (n && (ouvertes.has(g.id) || acquise)) {
          liste.append(window.Habillage.etapeChemin(Object.assign(commun, { etat: carte || acquise ? 'faite' : 'ouverte', note: note || 'Faite.', action: () => lancerMission(n) })));
        } else {
          const avant = g.prerequis.filter((id) => !acquises.includes(id)).map((id) => graphe.notions.find((x) => x.id === id).numero);
          liste.append(window.Habillage.etapeChemin(Object.assign(commun, { etat: 'fermee', note: 'S’ouvrira après ' + (avant.length > 1 ? 'les missions ' + avant.join(' et ') : 'la mission ' + avant[0]) + '.' })));
        }
      });
      zone.append(titre, liste);
      window.Habillage.tracerChemin(liste);
    }
    // Les tests de départ des blocs du quartier (SPEC.md, section 7).
    const zoneTests = document.getElementById('tests');
    zoneTests.innerHTML = '';
    const notes = [];
    for (const graphe of GRAPHES.filter((g) => quartierDu(g) === quartierOuvert && TESTS[g.bloc])) {
      const tour = TESTS[graphe.bloc];
      const t = etat.tests[graphe.bloc];
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.test = graphe.bloc;
      b.textContent = (t && t.fini ? 'Refaire : ' : t ? 'Reprendre : ' : '') + tour.titre;
      b.addEventListener('click', () => lancerTest(graphe.bloc));
      zoneTests.append(b);
      notes.push(t && t.fini ? tour.titre + ' : fait, ton chemin est prêt.' : tour.titre + ' : pour commencer, 15 à 20 minutes, en plusieurs fois si tu veux.');
    }
    document.getElementById('etat-test').textContent = notes.join(' ');
  }

  function ouvrirZone() {
    zoneQuartier.hidden = true;
    zoneMission.hidden = false;
    window.scrollTo(0, 0);
  }
  function fermerZone(focusId) {
    window.Voix.arreter();
    zoneMission.hidden = true;
    zoneMission.innerHTML = '';
    document.getElementById('barre-gauche').replaceChildren();
    annonce.textContent = '';
    zoneQuartier.hidden = false;
    montrerRevision().then(() => { const b = document.querySelector(focusId); if (b) b.focus(); });
  }

  /** Les notions déjà vues : acquises au test ou faites en mission. */
  function notionsVues(progression) {
    return GRAPHES.flatMap((gr) => gr.notions).map((g) => g.id).filter((id) => NOTIONS[id] && progression.notions[id] && (progression.notions[id].acquise || progression.notions[id].missions)).map((id) => NOTIONS[id]);
  }

  // ---------- Village et quartiers ----------
  const V = window.Village;
  const zoneQuartier = document.getElementById('quartier');
  const titreQuartier = document.getElementById('titre-quartier');
  let quartierOuvert = null;

  document.getElementById('djeli-accueil').replaceChildren(V.djeli(V.IMAGES.accueil.src, V.IMAGES.accueil.alt));

  // Voix de Djéli Awa : réglage oui / non, phrase d'accueil (lue si le navigateur le permet), boutons « Réécouter ».
  const Voix = window.Voix;
  Voix.monterReglage(document.getElementById('reglage-voix'));
  const accrocheAccueil = document.querySelector('#accueil .accroche');
  // La toute première fois, l'accueil du village ; ensuite, une phrase de la réserve H (SPEC.md, section 10).
  try {
    if (window.localStorage.getItem('djeli-deja-venue')) accrocheAccueil.textContent = window.Reserves.seance().tirer('H');
    window.localStorage.setItem('djeli-deja-venue', 'oui');
  } catch (e) { /* sans stockage, l'accueil du village */ }
  accrocheAccueil.after(Voix.boutonReecouter(accrocheAccueil.textContent));
  Voix.lire(accrocheAccueil.textContent);
  const paroleQuartier = document.getElementById('parole-quartier');
  paroleQuartier.parentElement.after(Voix.boutonReecouter(() => paroleQuartier.textContent));

  function ouvrirQuartier(id) {
    const q = V.quartier(id);
    quartierOuvert = id;
    window.Habillage.entrerMatiere(id);
    document.getElementById('portrait-quartier').replaceChildren(window.Habillage.portrait().firstChild);
    titreQuartier.textContent = q.lieu + ', ' + q.matiere.toLowerCase();
    document.getElementById('djeli-quartier').replaceChildren(V.djeli(q.image, q.alt));
    paroleQuartier.textContent = q.accueil;
    Voix.lire(q.accueil);
    // Un quartier montre ses chemins s'il a au moins un bloc écrit ; sinon, « bientôt ».
    const avecBloc = GRAPHES.some((g) => quartierDu(g) === id);
    document.getElementById('missions').hidden = !avecBloc;
    document.getElementById('missions-bientot').hidden = avecBloc;
    montrerRevision();
    accueil.hidden = true;
    zoneQuartier.hidden = false;
    window.scrollTo(0, 0);
    titreQuartier.focus();
  }

  function retourVillage() {
    Voix.arreter();
    window.Habillage.entrerMatiere(null);
    zoneQuartier.hidden = true;
    accueil.hidden = false;
    const b = document.querySelector('[data-quartier="' + quartierOuvert + '"]');
    if (b) b.focus();
  }

  // ---------- Page de réglages : elle s'ouvre par-dessus l'écran en cours, et y revient sans rien perdre ----------
  const pageReglages = document.getElementById('reglages');
  const boutonReglages = document.getElementById('bouton-reglages');
  boutonReglages.prepend(window.Habillage.icone('reglages'));
  let cachesParReglages = [];
  const vueSons = window.VueSons.monter();
  boutonReglages.addEventListener('click', () => {
    Voix.arreter();
    cachesParReglages = [accueil, zoneQuartier, zoneMission].filter((z) => !z.hidden);
    cachesParReglages.forEach((z) => { z.hidden = true; });
    document.getElementById('barre-gauche').hidden = true;
    boutonReglages.hidden = true;
    pageReglages.hidden = false;
    window.scrollTo(0, 0);
    document.getElementById('titre-reglages').focus();
    vueSons.rafraichir();
  });
  document.getElementById('bouton-fermer-reglages').addEventListener('click', () => {
    pageReglages.hidden = true;
    cachesParReglages.forEach((z) => { z.hidden = false; });
    document.getElementById('barre-gauche').hidden = false;
    boutonReglages.hidden = false;
    boutonReglages.focus();
  });

  V.dessiner(document.getElementById('village'), ouvrirQuartier);
  document.getElementById('bouton-retour-village').addEventListener('click', retourVillage);

  /** Le test de départ d'un bloc : il se coupe et reprend à l'étape suivante. */
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

  async function lancerTest(bloc) {
    ouvrirSonsDuBloc(bloc);
    const etat = await etatOuVide();
    const t0 = etat.tests[bloc];
    ouvrirZone();
    window.VueSeances.lancerTest(zoneMission, {
      tour: TESTS[bloc],
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
        if (etat.db) { S.ecrire(etat.db, 'progression', pr).then(() => S.ecrire(etat.db, 'cartes', etat.cartes)).catch(() => dire('Ta progression n’a pas pu être enregistrée.')); }
        return b;
      },
      quitter() { fermerZone('[data-test="' + bloc + '"]'); },
    });
  }

  async function lancerSerie(mode) {
    const etat = await etatOuVide();
    const vues = notionsVues(etat.progression);
    const etapes = {};
    for (const n of vues) etapes[n.id] = window.Mission.etapeVocabulaire(Math.max(0, (etat.progression.notions[n.id].missions || 0) - 1));
    const items = mode === 'matin' ? window.Seances.serieDuMatin(vues, Date.now()) : window.Seances.serieDuSoir(vues, Date.now(), etapes);
    ouvrirZone();
    window.VueSeances.lancerSerie(zoneMission, { mode, items, quitter() { fermerZone('#bouton-' + mode); } });
  }
  document.getElementById('bouton-matin').addEventListener('click', () => lancerSerie('matin'));
  document.getElementById('bouton-soir').addEventListener('click', () => lancerSerie('soir'));

  async function lancerMission(notion) {
    ouvrirSonsDuBloc(notion.bloc);
    const etat = await etatOuVide();
    const db = etat.db;
    const suivi = etat.progression.notions[notion.id] || { missions: 0 };
    ouvrirZone();
    window.VueMission.lancer(zoneMission, {
      notion,
      etape: window.Mission.etapeVocabulaire(suivi.missions),
      aujourdhui: R.jourDe(),
      carteAvant: etat.cartes[notion.id] || null,
      barre: document.getElementById('barre-gauche'),
      perles: etat.progression.perles.map(matiereDe),
      points: etat.progression.points || 0,
      dire(texte, parle) { dire(texte); Voix.lire(parle || texte); },
      async enregistrer(fin) {
        const pr = etat.progression;
        pr.notions[fin.notion] = Object.assign({}, pr.notions[fin.notion], { missions: (suivi.missions || 0) + 1, acquise: true });
        pr.points = (pr.points || 0) + fin.points;
        if (!pr.perles.includes(fin.notion)) pr.perles.push(fin.notion);
        etat.cartes[fin.notion] = fin.carte;
        if (!db) return;
        try {
          await S.ecrire(db, 'progression', pr);
          await S.ecrire(db, 'cartes', etat.cartes);
        } catch (e) { dire('Ta progression n’a pas pu être enregistrée.'); }
      },
      surFin() { fermerZone('[data-notion="' + notion.id + '"]'); },
    });
  }

  montrerRevision();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').then(() => navigator.serviceWorker.ready).then(() => {
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
      etat.textContent = 'L’application marche aussi sans connexion. Les sons d’un bloc se gardent quand tu l’ouvres.';
    }).catch(() => { /* sans service worker, l'application marche quand même en ligne */ });
  }
})();
