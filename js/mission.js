/* Moteur de mission (SPEC.md, section 3) : joue les 7 temps d'une notion, sans rien afficher.
   L'affichage est fait par js/vue-mission.js ; ce moteur se teste seul dans Node.
   Le format des fichiers de notion est décrit dans contenu/FORMAT.md. */
(function (racine, fabrique) {
  const M = fabrique(racine.Hasard || (typeof require === 'function' ? require('./hasard.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = M;
  else racine.Mission = M;
})(this, function (Hasard) {
  'use strict';

  const TEMPS = ['accroche', 'manipulation', 'decouverte', 'vocabulaire', 'entrainement', 'defi', 'recompense'];
  const TITRES = {
    accroche: 'L’histoire',
    manipulation: 'À toi de jouer',
    decouverte: 'L’astuce',
    vocabulaire: 'Les mots des matheux',
    entrainement: 'Entraînement',
    defi: 'Défi brevet',
    recompense: 'Récompense',
  };
  const POINTS = { premierEssai: 10, secondEssai: 5, grille: 10 };

  // ---------- Vocabulaire en trois temps (SPEC.md, principe 4) ----------

  /** Le mot à employer pour un terme, selon l'étape de vocabulaire : 1 ses mots, 2 les deux, 3 le mot officiel. */
  function mot(notion, cle, etape) {
    const t = notion.vocabulaire.termes[cle];
    if (!t) throw new Error('terme inconnu : ' + cle);
    if (etape <= 1) return t.sesMots;
    if (etape === 2) return t.lesDeux || (t.sesMots + ', que les matheux appellent ' + t.officiel);
    return t.officiel;
  }

  /** Étape de vocabulaire d'une notion d'après le nombre de missions déjà faites dessus. */
  function etapeVocabulaire(missionsFaites) {
    return Math.min(3, (missionsFaites || 0) + 1);
  }

  /** Un champ de contenu est un texte, ou une fonction du contexte qui rend un texte. */
  const resoudre = (v, ctx) => (typeof v === 'function' ? v(ctx) : v);
  /** Une découverte trop longue pour un seul son est dite en deux, coupée juste après coupeApres ; rend null si rien n'est coupé. */
  function couper(texte, apres) {
    const i = apres ? texte.indexOf(apres) : -1;
    if (i < 0) return null;
    const a = texte.slice(0, i + apres.length).trim(), b = texte.slice(i + apres.length).trim();
    return b ? [a, b] : null;
  }

  // ---------- Lecture et vérification des réponses saisies ----------

  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

  /** Lit « 3 », « -3 », « 3,5 », « 3.5 », « 3/8 », « − 3 / 8 ». Rend { n, d } (d > 0) ou null. */
  function lireNombre(texte) {
    const t = String(texte).replace(/[\s  ]/g, '').replace(/[−–]/g, '-').replace(',', '.');
    let r = t.match(/^(-?)(\d+)\/(-?)(\d+)$/);
    if (r) {
      const d = Number(r[4]);
      if (d === 0) return null;
      return { n: (r[1] === r[3] ? 1 : -1) * Number(r[2]), d };
    }
    r = t.match(/^(-?)(\d+)(?:\.(\d+))?$/);
    if (!r) return null;
    const decimales = r[3] || '';
    const d = 10 ** decimales.length;
    return { n: (r[1] ? -1 : 1) * Number(r[2] + decimales), d };
  }

  /** La saisie correspond-elle à la réponse attendue ?
      attendu : { type: 'fraction', valeur: [n, d], equivalentes (vrai par défaut) }
              | { type: 'nombre', valeur } | { type: 'choix', options, valeur (indice) } */
  function verifier(attendu, saisie) {
    if (attendu.type === 'choix') return Number(saisie) === attendu.valeur;
    const x = lireNombre(saisie);
    if (!x) return false;
    if (attendu.type === 'nombre') {
      const v = lireNombre(String(attendu.valeur));
      return x.n * v.d === v.n * x.d;
    }
    if (attendu.type === 'fraction') {
      const [n, d] = attendu.valeur;
      if (attendu.equivalentes === false) {
        // Il faut cette fraction-là, écrite avec une barre (3/8, et non 6/16 ni 0,375).
        return String(saisie).includes('/') && x.n === n * Math.sign(d) && x.d === Math.abs(d);
      }
      return x.n * d === n * x.d;
    }
    throw new Error('type de réponse inconnu : ' + attendu.type);
  }

  /** Texte d'une réponse attendue, pour la correction. */
  function ecrireReponse(attendu) {
    if (attendu.type === 'choix') return attendu.options[attendu.valeur];
    if (attendu.type === 'fraction') return attendu.valeur[0] + '/' + attendu.valeur[1];
    return String(attendu.valeur).replace('.', ',');
  }

  // ---------- La mission ----------

  /** Crée une mission. options : graine (hasard reproductible), etape (vocabulaire, 1 à 3), nbExercices. */
  function creer(notion, options = {}) {
    const graine = options.graine === undefined ? Date.now() : options.graine;
    const alea = Hasard.creer(graine);
    const etape = options.etape || 1;
    const ctx = { alea, etape, mot: (cle) => mot(notion, cle, etape), pgcd };
    const nb = options.nbExercices || 5;
    const generateurs = notion.exercices;
    const exercices = [];
    for (let i = 0; i < nb; i++) {
      const g = generateurs[i % generateurs.length];
      exercices.push(Object.assign({ generateur: g.id, univers: g.univers, essais: 0, etat: 'attente', src: i, carte: idCarte(notion, 'ex', g.id) }, g.genere(ctx)));
    }
    const defi = notion.defi.genere(ctx);
    defi.questions.forEach((q, k) => { q.essais = 0; q.etat = 'attente'; q.src = k; q.carte = idCarte(notion, 'defi', k); });
    return {
      notion, etape, ctx, graine,
      anki: !!options.anki, // avec les quatre boutons d'Anki : une question n'est finie qu'une fois notée
      notes: [],
      index: 0,
      manipulationFaite: !aLEcran(notion), // sans manipulation à l'écran, la réflexion guidée suffit
      exercices, iExercice: 0,
      defi, iQuestion: 0,
      points: 0,
    };
  }

  const nomDuTemps = (m) => TEMPS[m.index];
  /** Identifiant de la carte d'une question (le même que Revision.idQuestion). */
  const idCarte = (notion, sorte, cle) => notion.id + '|' + sorte + '|' + cle;

  /** Vrai si la notion a une manipulation à l'écran (champ manipulation.type) ; sinon, réflexion guidée (manipulation.etapes). */
  const aLEcran = (n) => !!(n.manipulation && n.manipulation.type);

  /** Phrase dite au début d'une réflexion guidée (la même pour toutes les notions). */
  const INTRO_REFLEXION = 'Réfléchis avec moi, étape par étape. Prends ton cahier : tu peux dessiner et calculer.';

  function tempsCourant(m) {
    const nom = nomDuTemps(m);
    // Hors maths, les mots officiels sont ceux des scientifiques.
    const titre = nom === 'vocabulaire' && m.notion.matiere && m.notion.matiere !== 'maths' ? 'Les mots des scientifiques' : TITRES[nom];
    return { nom, numero: m.index + 1, total: TEMPS.length, titre };
  }

  /** Ce qu'il faut montrer et dire pour le temps courant, textes résolus. */
  function contenu(m) {
    const n = m.notion;
    const ctx = m.ctx;
    switch (nomDuTemps(m)) {
      case 'accroche':
        return { texte: resoudre(n.accroche.texte, ctx), image: n.accroche.image };
      case 'manipulation':
        return aLEcran(n)
          ? Object.assign({ mode: 'ecran' }, n.manipulation, { consigne: resoudre(n.manipulation.consigne, ctx) })
          : { mode: 'reflexion', intro: INTRO_REFLEXION, image: n.manipulation && n.manipulation.image, etapes: ((n.manipulation && n.manipulation.etapes) || n.reflexion).map((e) => resoudre(e, ctx)) };
      case 'decouverte': {
        const texte = resoudre(n.decouverte.texte, ctx);
        return { texte, parle: couper(texte, n.decouverte.coupeApres), image: n.decouverte.image };
      }
      case 'vocabulaire':
        return { texte: resoudre(n.vocabulaire.textes[m.etape - 1], ctx), etape: m.etape };
      case 'entrainement': {
        const e = m.exercices[m.iExercice];
        return { numero: m.iExercice + 1, total: m.exercices.length, exercice: e };
      }
      case 'defi':
        return { enonce: m.defi.enonce, image: m.defi.image, numero: m.iQuestion + 1, total: m.defi.questions.length, question: m.defi.questions[m.iQuestion] };
      default:
        return { points: m.points, texte: resoudre(n.recompense, ctx) };
    }
  }

  function peutContinuer(m) {
    switch (nomDuTemps(m)) {
      case 'manipulation': return m.manipulationFaite;
      case 'entrainement': return m.exercices.every((e) => faite(m, e));
      case 'defi': return m.defi.questions.every((q) => faite(m, q));
      case 'recompense': return false;
      default: return true;
    }
  }

  function suivant(m) {
    if (!peutContinuer(m)) throw new Error('le temps « ' + nomDuTemps(m) + ' » n’est pas terminé');
    m.index++;
    return tempsCourant(m);
  }

  function marquerManipulation(m) {
    m.manipulationFaite = true;
  }

  /** La question à laquelle on répond : l'exercice courant, ou la question courante du défi. */
  function questionCourante(m) {
    const nom = nomDuTemps(m);
    if (nom === 'entrainement') return m.exercices[m.iExercice];
    if (nom === 'defi') return m.defi.questions[m.iQuestion];
    throw new Error('pas de question pendant « ' + nom + ' »');
  }

  function avancerQuestion(m) {
    if (nomDuTemps(m) === 'entrainement') { if (m.iExercice < m.exercices.length - 1) m.iExercice++; }
    else if (m.iQuestion < m.defi.questions.length - 1) m.iQuestion++;
  }

  /** Réponse saisie (ou indice d'un choix). Deux essais ; au second échec, la correction est montrée.
      Rend { juste, fini, situation (A, B, C, D ou E, SPEC.md section 10), aide?, correction?, attendu? }.
      Appeler ensuite questionSuivante quand fini. */
  function repondre(m, saisie) {
    const q = questionCourante(m);
    if (q.etat !== 'attente') throw new Error('question déjà terminée');
    if (!q.reponse) throw new Error('cette question se rédige sur papier : utiliser validerGrille');
    q.essais++;
    if (verifier(q.reponse, saisie)) {
      q.etat = 'juste';
      m.points += q.essais === 1 ? POINTS.premierEssai : POINTS.secondEssai;
      return { juste: true, fini: true, situation: situationJuste(m, q.essais > 1), correction: q.correction, attendu: ecrireReponse(q.reponse) };
    }
    m.serie = 0;
    if (q.essais < 2) return { juste: false, fini: false, situation: 'D', aide: q.aide, aideParlee: q.aideParlee || q.aide };
    q.etat = 'corrige';
    return { juste: false, fini: true, situation: 'E', correction: q.correction, attendu: ecrireReponse(q.reponse) };
  }

  /** Situation d'une bonne réponse : C juste après une erreur sur le même exercice,
      B à chaque 3e bonne réponse d'affilée, sinon A. */
  function situationJuste(m, apresErreur) {
    m.serie = (m.serie || 0) + 1;
    if (apresErreur) return 'C';
    return m.serie % 3 === 0 ? 'B' : 'A';
  }

  /** Question rédigée sur papier : elle coche les critères de la grille qu'elle a remplis. */
  function validerGrille(m, coches) {
    const q = questionCourante(m);
    if (!q.grille) throw new Error('cette question n’a pas de grille');
    const nb = q.grille.filter((_, i) => coches[i]).length;
    q.coches = q.grille.map((_, i) => !!coches[i]);
    q.etat = nb === q.grille.length ? 'juste' : 'corrige';
    m.points += Math.round((POINTS.grille * nb) / q.grille.length);
    // Grille complète : une bonne réponse (A ou B) ; sinon, comme une deuxième erreur (E).
    let situation = 'E';
    if (nb === q.grille.length) situation = situationJuste(m, false); else m.serie = 0;
    return { reussis: nb, total: q.grille.length, situation };
  }

  /** Passe à la question suivante du temps courant ; rend faux s'il n'y en a plus. */
  function questionSuivante(m) {
    const avant = nomDuTemps(m) === 'entrainement' ? m.iExercice : m.iQuestion;
    avancerQuestion(m);
    return (nomDuTemps(m) === 'entrainement' ? m.iExercice : m.iQuestion) !== avant;
  }

  const faite = (m, q) => q.etat !== 'attente' && (!m.anki || !!q.note);

  /** La liste des questions du temps courant : exercices ou questions du défi. */
  const listeCourante = (m) => (nomDuTemps(m) === 'entrainement' ? m.exercices : m.defi.questions);
  const rangCourant = (m) => (nomDuTemps(m) === 'entrainement' ? m.iExercice : m.iQuestion);

  /** Note la question courante, une fois finie : « revoir », « difficile », « bien » ou « facile ».
      « À revoir » : la même question revient dans cette mission, après 3 autres questions (ou à la fin s'il en reste moins).
      Rend la carte notée : { carte, note }. */
  function noter(m, note, apres = 3) {
    const q = questionCourante(m);
    if (q.etat === 'attente') throw new Error('la question n’est pas finie');
    q.note = note;
    m.notes.push({ carte: q.carte, note });
    if (note === 'revoir') {
      const l = listeCourante(m);
      const i = rangCourant(m);
      const copie = Object.assign({}, q, { etat: 'attente', essais: 0, note: undefined, coches: undefined, retour: true });
      l.splice(Math.min(l.length, i + 1 + apres), 0, copie);
    }
    return { carte: q.carte, note };
  }

  /** Après une note : la question suivante du temps, sinon le temps suivant. Rend 'question', 'temps' ou 'rien'. */
  function avancer(m) {
    if (questionSuivante(m)) return 'question';
    if (peutContinuer(m)) { suivant(m); return 'temps'; }
    return 'rien';
  }

  const etatQuestion = (q) => ({ src: q.src, etat: q.etat, essais: q.essais, note: q.note || null, retour: !!q.retour, coches: q.coches || null });

  /** L'état exact d'une mission, pour la reprendre plus tard : temps, question, réponses déjà données. */
  function sauver(m) {
    return {
      notion: m.notion.id, graine: m.graine, etape: m.etape, index: m.index, manipulationFaite: m.manipulationFaite,
      iExercice: m.iExercice, iQuestion: m.iQuestion, points: m.points, serie: m.serie || 0, notes: m.notes.slice(),
      exercices: m.exercices.map(etatQuestion), defi: m.defi.questions.map(etatQuestion), anki: m.anki,
    };
  }

  /** Reprend une mission sauvée : les questions sont refaites à l'identique (même graine), puis leur état est remis. */
  function reprendre(notion, s) {
    const m = creer(notion, { graine: s.graine, etape: s.etape, anki: s.anki });
    const refaire = (originaux, etats) => etats.map((x) => Object.assign({}, originaux[x.src], { etat: x.etat, essais: x.essais, note: x.note || undefined, retour: x.retour, coches: x.coches || undefined }));
    m.exercices = refaire(m.exercices, s.exercices);
    m.defi.questions = refaire(m.defi.questions, s.defi);
    Object.assign(m, { index: s.index, manipulationFaite: s.manipulationFaite, iExercice: s.iExercice, iQuestion: s.iQuestion, points: s.points, serie: s.serie, notes: s.notes.slice() });
    return m;
  }

  /** Les cartes de question d'une notion (générateurs de l'entraînement, questions du défi), pour l'avancement. */
  function cartesDeNotion(notion) {
    const ids = [...new Set(notion.exercices.map((g) => idCarte(notion, 'ex', g.id)))];
    let n = 0;
    try { n = notion.defi.genere({ alea: Hasard.creer(1), etape: 1, mot: (cle) => mot(notion, cle, 1), pgcd }).questions.length; } catch (e) { n = 0; }
    for (let k = 0; k < n; k++) ids.push(idCarte(notion, 'defi', k));
    return ids;
  }

  /** Fin de mission : l'auto-évaluation (« facile », « hesite », « rate ») programme la révision.
      Revision est le module js/revision.js ; carteAvant est la carte existante de la notion, ou null. */
  function terminer(m, autoEvaluation, aujourdhui, Revision, carteAvant = null) {
    if (nomDuTemps(m) !== 'recompense') throw new Error('la mission n’est pas arrivée à la récompense');
    m.terminee = true;
    // Avec Anki, la carte de la notion entière est programmée à partir des notes de ses questions.
    const note = autoEvaluation || Revision.noteDeNotion(m.notes.map((x) => x.note));
    return {
      notion: m.notion.id,
      points: m.points,
      notes: m.notes.slice(),
      carte: Revision.programmer(carteAvant, note, aujourdhui, m.notion.id),
    };
  }

  /** Textes fixes autour des retours. Les réactions de Djéli Awa (bonne réponse, erreur, fin de mission…) sont tirées
      dans les réserves de js/reserves.js (SPEC.md, section 10) ; nombres et dates sont seulement écrits à l'écran. */
  const PHRASES = {
    ecrisDabord: 'Écris d’abord ta réponse.',
    // Écrits seulement à l'écran : la voix dit la phrase tirée dans la réserve G ou E.
    note: (jour) => 'On reverra cette notion le ' + jour + '.',
    grille: (reussis, total) => reussis + ' critères sur ' + total + '.',
  };

  return {
    TEMPS, TITRES, POINTS, PHRASES, INTRO_REFLEXION, aLEcran, couper,
    mot, etapeVocabulaire, lireNombre, verifier, ecrireReponse, pgcd,
    creer, tempsCourant, contenu, peutContinuer, suivant, marquerManipulation,
    repondre, validerGrille, questionSuivante, terminer,
    noter, avancer, sauver, reprendre, cartesDeNotion, idCarte,
  };
});
