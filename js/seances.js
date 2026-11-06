/* Les séances hors mission (SPEC.md, sections 4, 5 et 7), sans rien afficher : testées seules dans Node.
   - Test de départ « Le grand tour du marché » : deux questions par étal (une notion) ; deux réponses justes du premier coup
     = notion acquise. Une notion n'est testée que si ses prérequis sont acquis. Une notion acquise revient en révision
     3 jours plus tard (décisions du 1er novembre 2026).
   - Automatismes du matin : 5 petits calculs tirés des notions vues.
   - Papier du soir : 3 exercices rédigés sur le cahier, tirés des notions vues.
   L'affichage est fait par js/vue-seances.js. */
(function (racine, fabrique) {
  const req = (nom, chemin) => racine[nom] || (typeof require === 'function' ? require(chemin) : null);
  const S = fabrique(req('Hasard', './hasard.js'), req('Mission', './mission.js'), req('Prerequis', './prerequis.js'));
  if (typeof module === 'object' && module.exports) module.exports = S;
  else racine.Seances = S;
})(this, function (Hasard, Mission, Prerequis) {
  'use strict';

  const NB_MATIN = 5;
  const NB_SOIR = 3;
  const QUESTIONS_PAR_ETAL = 2;
  const REVISION_APRES_TEST = 3; // jours

  /** Phrases fixes dites pendant les séances (leurs sons : outils/lister-phrases.js). */
  const PHRASES_DITES = {
    'test-intro': 'Viens, on fait le grand tour du marché ! À chaque étal, un marchand te pose deux petites questions. Prends ton cahier. Tu peux t’arrêter quand tu veux : on reprendra au prochain étal.',
    'test-note': 'C’est noté. On continue.',
    'test-fin': 'Le tour du marché est fini. Merci ! Ton chemin est prêt : je sais par où commencer avec toi.',
    'test-reprise': 'On reprend le tour du marché là où tu t’étais arrêtée.',
    'matin-intro': 'Bonjour ! Cinq petites questions pour bien réveiller ton cerveau. Pas de calculatrice !',
    'matin-fin': 'C’est fini pour ce matin. Belle journée !',
    'soir-intro': 'Ce soir, trois exercices sur ton cahier. Écris chaque étape, comme au brevet. Ensuite, tu vérifies avec moi.',
    'soir-fin': 'Bravo pour ce travail sur papier. Range bien ton cahier !',
    'rien-encore': 'Fais d’abord ta première mission : ensuite, je te préparerai des exercices sur ce que tu as vu.',
  };

  /** Contexte de génération : vocabulaire de l'étape donnée. */
  function contexte(notion, alea, etape) {
    return { alea, etape, mot: (cle) => Mission.mot(notion, cle, etape), pgcd: Mission.pgcd };
  }

  // ---------- Test de départ ----------

  /** Les phrases dites au test d'un bloc : celles des étapes, et celles du décor (accueil, reprise, fin) si le bloc a les siennes. */
  const phrasesDuTest = (tour) => tour.etals.map((e) => e.phrase).concat(Object.values(tour.phrases || {}));

  /** État neuf du test. */
  function creerTest(tour) {
    return { resultats: {}, fini: false, tour: tour.id };
  }

  /** L'étal suivant à tester, ou null : le premier étal du tour, pas encore fait, dont tous les prérequis du graphe sont acquis. */
  function etalSuivant(tour, graphe, etat) {
    const acquises = Object.keys(etat.resultats).filter((id) => etat.resultats[id] === true);
    const ouvertes = new Set(Prerequis.ouvertes(graphe, acquises));
    return tour.etals.find((e) => !(e.notion in etat.resultats) && ouvertes.has(e.notion)) || null;
  }

  /** Les deux questions d'un étal, tirées de ses générateurs (vocabulaire de l'étape 1 : ses mots). */
  function questionsDeLetal(etal, notion, graine) {
    const alea = Hasard.creer(graine);
    const ctx = contexte(notion, alea, 1);
    return etal.generateurs.slice(0, QUESTIONS_PAR_ETAL).map((id) => {
      const g = notion.exercices.find((x) => x.id === id);
      if (!g) throw new Error('générateur inconnu ' + id + ' dans ' + notion.id);
      return Object.assign({ generateur: id, essais: 0, etat: 'attente' }, g.genere(ctx));
    });
  }

  /** Note un étal : justes est la liste des réponses (vrai si juste du premier coup). Rend l'état mis à jour. */
  function noterEtal(tour, graphe, etat, notionId, justes) {
    etat.resultats[notionId] = justes.length === QUESTIONS_PAR_ETAL && justes.every(Boolean);
    etat.fini = etalSuivant(tour, graphe, etat) === null;
    return etat;
  }

  /** Ce que le test donne : notions acquises, et leurs cartes de révision (dans 3 jours). */
  function bilan(etat, aujourdhui, Revision) {
    const acquises = Object.keys(etat.resultats).filter((id) => etat.resultats[id] === true);
    const cartes = {};
    for (const id of acquises) {
      cartes[id] = { notion: id, intervalle: REVISION_APRES_TEST, derniere: aujourdhui, echeance: Revision.ajouterJours(aujourdhui, REVISION_APRES_TEST) };
    }
    return { acquises, cartes };
  }

  // ---------- Automatismes du matin et papier du soir ----------

  /** Tire n éléments en tournant sur la liste mélangée (on peut en reprendre si la liste est courte). */
  function tirer(alea, liste, n) {
    if (!liste.length) return [];
    const m = alea.melanger(liste);
    return Array.from({ length: n }, (_, i) => m[i % m.length]);
  }

  /** Les 5 automatismes du matin, tirés des notions vues : [{ notion, enonce, reponse }]. */
  function serieDuMatin(notionsVues, graine, nb = NB_MATIN) {
    const alea = Hasard.creer(graine);
    const sources = notionsVues.flatMap((n) => n.automatismes.map((a) => ({ n, a })));
    return tirer(alea, sources, nb).map(({ n, a }) => Object.assign({ notion: n.id, titre: n.titre, essais: 0, etat: 'attente' }, a.genere(contexte(n, alea, 3))));
  }

  /** Les 3 exercices du soir, tirés des notions vues : [{ notion, titre, enonce, questions: [...] }].
      Un exercice simple devient une seule question ; un défi garde ses questions (et sa grille si elle est rédigée). */
  function serieDuSoir(notionsVues, graine, etapes = {}, nb = NB_SOIR) {
    const alea = Hasard.creer(graine);
    const sources = notionsVues.flatMap((n) => n.papierDuSoir.exercices.map((id) => ({ n, id })).concat(n.papierDuSoir.defi ? [{ n, id: null }] : []));
    return tirer(alea, sources, nb).map(({ n, id }) => {
      const ctx = contexte(n, alea, etapes[n.id] || 3);
      if (id === null) {
        const d = n.defi.genere(ctx);
        return { notion: n.id, titre: n.titre, enonce: d.enonce, image: d.image, questions: d.questions.map((q) => Object.assign({ essais: 0, etat: 'attente' }, q)) };
      }
      const q = n.exercices.find((g) => g.id === id).genere(ctx);
      return { notion: n.id, titre: n.titre, enonce: '', questions: [Object.assign({ essais: 0, etat: 'attente', texte: q.enonce }, q)] };
    });
  }

  /** Réponse à une question de séance. essaisMax : 1 (test, matin) ou 2 (soir). Rend { juste, fini, premierCoup }. */
  function repondre(q, saisie, essaisMax) {
    if (q.etat !== 'attente') throw new Error('question déjà terminée');
    q.essais++;
    if (Mission.verifier(q.reponse, saisie)) { q.etat = 'juste'; return { juste: true, fini: true, premierCoup: q.essais === 1 }; }
    if (q.essais < essaisMax) return { juste: false, fini: false, premierCoup: false };
    q.etat = 'corrige';
    return { juste: false, fini: true, premierCoup: false };
  }

  // ---------- Séances question par question, à la façon d'Anki (consigne du 6 nov. 2026) ----------
  // Une séance est une file d'entrées { carte, graine, etape, etat, essais, note, retour } : chaque question se refait
  // à l'identique à partir de sa carte et de sa graine. La séance se sauve donc et se reprend exactement.

  const entree = (carte, graine, etape) => ({ carte, graine, etape: etape || 3, etat: 'attente', essais: 0, note: null, retour: false });

  /** Les entrées du matin : 5 automatismes tirés des notions vues. */
  function entreesDuMatin(notionsVues, graine, nb = NB_MATIN) {
    const alea = Hasard.creer(graine);
    const sources = notionsVues.flatMap((n) => n.automatismes.map((a, i) => n.id + '|auto|' + i));
    return tirer(alea, sources, nb).map((id, k) => entree(id, graine + k + 1, 3));
  }

  /** Les entrées du soir : 3 exercices tirés des notions vues ; un défi donne une entrée par question. */
  function entreesDuSoir(notionsVues, graine, etapes = {}, notions = {}, nb = NB_SOIR) {
    const alea = Hasard.creer(graine);
    const sources = notionsVues.flatMap((n) => n.papierDuSoir.exercices.map((id) => ({ n, id })).concat(n.papierDuSoir.defi ? [{ n, id: null }] : []));
    const l = [];
    tirer(alea, sources, nb).forEach(({ n, id }, k) => {
      const g = graine + k + 1, etape = etapes[n.id] || 3;
      if (id !== null) { l.push(entree(n.id + '|ex|' + id, g, etape)); return; }
      const nbq = n.defi.genere(contexte(n, Hasard.creer(g), etape)).questions.length;
      for (let q = 0; q < nbq; q++) l.push(entree(n.id + '|defi|' + q, g, etape));
    });
    return l;
  }

  /** Les entrées d'une révision : les cartes dues, dans l'ordre donné (les plus en retard d'abord). */
  function entreesDeRevision(ids, graine, etapes = {}) {
    return ids.map((id, k) => entree(id, graine + k + 1, etapes[id.split('|')[0]] || 3));
  }

  /** La question d'une entrée, refaite à l'identique : { notion, titre, enonce (du défi), image, question }. */
  function questionDe(e, notions) {
    const [nid, sorte, cle] = e.carte.split('|');
    const n = notions[nid];
    if (!n) return null;
    const ctx = contexte(n, Hasard.creer(e.graine), e.etape);
    let q = null, enonce = '', image = null;
    if (sorte === 'auto') { const a = n.automatismes[Number(cle)]; if (a) q = Object.assign({ texte: null }, a.genere(ctx)); }
    else if (sorte === 'ex') { const g = n.exercices.find((x) => x.id === cle); if (g) { q = g.genere(ctx); q = Object.assign({ texte: q.enonce }, q); } }
    else if (sorte === 'defi') { const d = n.defi.genere(ctx); q = d.questions[Number(cle)] || null; enonce = d.enonce; image = d.image; }
    if (!q) return null;
    return { notion: nid, titre: n.titre, enonce, image, question: Object.assign({}, q, { etat: e.etat, essais: e.essais, carte: e.carte }) };
  }

  /** Une séance neuve : { mode, entrees, i }. */
  const creerSerie = (mode, entrees) => ({ mode, entrees, i: 0 });

  /** Note l'entrée courante ; « À revoir » la remet dans la file, après 3 autres questions. */
  function noterSerie(s, note, apres = 3) {
    const e = s.entrees[s.i];
    e.note = note;
    if (note === 'revoir') s.entrees.splice(Math.min(s.entrees.length, s.i + 1 + apres), 0, Object.assign({}, e, { etat: 'attente', essais: 0, note: null, retour: true }));
    return { carte: e.carte, note };
  }

  /** Passe à l'entrée suivante ; rend faux à la fin de la file. */
  function avancerSerie(s) {
    s.i++;
    return s.i < s.entrees.length;
  }

  return {
    entreesDuMatin, entreesDuSoir, entreesDeRevision, questionDe, creerSerie, noterSerie, avancerSerie,
    NB_MATIN, NB_SOIR, QUESTIONS_PAR_ETAL, REVISION_APRES_TEST, PHRASES_DITES,
    phrasesDuTest, creerTest, etalSuivant, questionsDeLetal, noterEtal, bilan, serieDuMatin, serieDuSoir, repondre,
  };
});
