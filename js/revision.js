/* Révision espacée (SPEC.md, section 6).
   Une carte : { notion, intervalle (jours), derniere (jour de la dernière révision), echeance (jour prévu) }.
   Les jours sont des textes « AAAA-MM-JJ » (date locale) : pas de surprise au changement d'heure.
   Réglage : raté → 1 jour ; j'ai hésité → × 1,2 (premier : 2 jours, jamais moins de 2) ;
   facile → × 2,5 (premier : 3 jours) ; arrondi au jour supérieur.
   Plafonds : 14 jours à partir du 1er mai 2027, 7 jours à partir du 1er juin 2027,
   appliqués aussi aux cartes déjà programmées. */
(function (racine, fabrique) {
  const R = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = R;
  else racine.Revision = R;
})(this, function () {
  'use strict';

  const REPONSES = ['facile', 'hesite', 'rate'];
  const PLAFONDS = [
    { depuis: '2027-05-01', jours: 14 },
    { depuis: '2027-06-01', jours: 7 },
  ];

  const deux = (n) => String(n).padStart(2, '0');

  /** Le jour local d'une date (objet Date ou nombre de millisecondes). */
  function jourDe(date = new Date()) {
    const d = new Date(date);
    return d.getFullYear() + '-' + deux(d.getMonth() + 1) + '-' + deux(d.getDate());
  }

  function ajouterJours(jour, n) {
    const [a, m, j] = jour.split('-').map(Number);
    const d = new Date(Date.UTC(a, m - 1, j + n));
    return d.getUTCFullYear() + '-' + deux(d.getUTCMonth() + 1) + '-' + deux(d.getUTCDate());
  }

  const plusTard = (a, b) => (a > b ? a : b);

  /** Le plafond en vigueur ce jour-là : { depuis, jours }, ou null avant le 1er mai 2027. */
  function plafond(jour) {
    let p = null;
    for (const x of PLAFONDS) if (jour >= x.depuis) p = x;
    return p;
  }

  /** Intervalle suivant, sans plafond. Les multiplications passent par des entiers : 5 × 1,2 donne bien 6. */
  function intervalleSuivant(precedent, reponse) {
    if (!REPONSES.includes(reponse)) throw new Error('réponse inconnue : ' + reponse);
    if (reponse === 'rate') return 1;
    if (reponse === 'hesite') return precedent ? Math.max(2, Math.ceil((precedent * 12) / 10)) : 2;
    return precedent ? Math.ceil((precedent * 25) / 10) : 3;
  }

  /** Programme la carte après une révision faite ce jour-là. carte peut être null (nouvelle notion). */
  function programmer(carte, reponse, aujourdhui, notion = carte && carte.notion) {
    let intervalle = intervalleSuivant(carte ? carte.intervalle : 0, reponse);
    const p = plafond(aujourdhui);
    if (p) intervalle = Math.min(intervalle, p.jours);
    return { notion, intervalle, derniere: aujourdhui, echeance: ajouterJours(aujourdhui, intervalle) };
  }

  /** Ramène sous le plafond les cartes programmées trop loin. Une carte programmée avant l'entrée en vigueur
      du plafond est ramenée à (date d'entrée en vigueur + plafond), quel que soit le jour où l'on ouvre l'application.
      Rend { cartes, changees } ; les cartes d'origine ne sont pas modifiées. */
  function appliquerPlafonds(cartes, aujourdhui) {
    const p = plafond(aujourdhui);
    const resultat = {};
    let changees = 0;
    for (const id of Object.keys(cartes)) {
      const c = cartes[id];
      resultat[id] = c;
      if (!p) continue;
      const limite = ajouterJours(plusTard(c.derniere || p.depuis, p.depuis), p.jours);
      if (c.echeance > limite) {
        resultat[id] = Object.assign({}, c, { echeance: limite, intervalle: Math.min(c.intervalle, p.jours) });
        changees++;
      }
    }
    return { cartes: resultat, changees };
  }

  /** Identifiants des cartes à réviser ce jour-là, les plus en retard d'abord. */
  function dues(cartes, aujourdhui) {
    return Object.keys(cartes)
      .filter((id) => cartes[id].echeance <= aujourdhui)
      .sort((a, b) => (cartes[a].echeance < cartes[b].echeance ? -1 : cartes[a].echeance > cartes[b].echeance ? 1 : 0));
  }

  // ---------- Cartes par question, à la façon d'Anki (consigne du 6 nov. 2026) ----------
  // Une carte : { id, notion, facilite, intervalle (jours), derniere, echeance, revues, note }.
  // Quatre boutons : « À revoir », « Difficile », « Bien », « Facile ». Facilité de départ 2,5, jamais sous 1,3 ;
  // « Difficile » −0,15, « Facile » +0,15, « À revoir » −0,20 (comme Anki). Première fois : 1, 2 et 4 jours.
  // Ensuite (a : intervalle, f : facilité avant la réponse) : Difficile max(a × 1,2 ; a + 1) ; Bien max(a × f ; Difficile + 1) ;
  // Facile max(a × f × 1,3 ; Bien + 1), arrondis au jour supérieur. « À revoir » : dans la séance après 3 questions, puis demain.
  // Les plafonds de mai et juin 2027 valent aussi pour ces cartes.
  const NOTES = ['revoir', 'difficile', 'bien', 'facile'];
  const LIBELLES = { revoir: 'À revoir', difficile: 'Difficile', bien: 'Bien', facile: 'Facile' };
  const FACILITE = { depart: 2.5, min: 1.3, difficile: -0.15, facile: 0.15, revoir: -0.2 };
  const PREMIERS = { difficile: 1, bien: 2, facile: 4 };
  const REVOIR_APRES = 3; // questions avant le retour d'une question « À revoir », dans la même séance

  /** Identifiant d'une carte de question : notion, sorte (ex, defi, auto) et clé (générateur ou rang). */
  const idQuestion = (notion, sorte, cle) => notion + '|' + sorte + '|' + cle;
  const notionDe = (id) => String(id).split('|')[0];

  const arrondi2 = (x) => Math.round(x * 100) / 100;

  /** Les intervalles proposés par chaque bouton, sans plafond : { revoir, difficile, bien, facile } en jours. */
  function intervallesQuestion(carte) {
    const a = carte && carte.intervalle > 0 && carte.note !== 'revoir' ? carte.intervalle : 0;
    const f = carte && carte.facilite ? carte.facilite : FACILITE.depart;
    if (!a) return { revoir: 1, difficile: PREMIERS.difficile, bien: PREMIERS.bien, facile: PREMIERS.facile };
    const difficile = Math.max(Math.ceil((a * 12) / 10), a + 1);
    const bien = Math.max(Math.ceil(arrondi2(a * f)), difficile + 1);
    const facile = Math.max(Math.ceil(arrondi2(a * f * 1.3)), bien + 1);
    return { revoir: 1, difficile, bien, facile };
  }

  /** Programme une carte de question après une réponse notée ce jour-là. carte peut être null (question neuve). */
  function programmerQuestion(carte, note, aujourdhui, id = carte && carte.id) {
    if (!NOTES.includes(note)) throw new Error('note inconnue : ' + note);
    let intervalle = intervallesQuestion(carte)[note];
    const p = plafond(aujourdhui);
    if (p) intervalle = Math.min(intervalle, p.jours);
    const avant = carte && carte.facilite ? carte.facilite : FACILITE.depart;
    const facilite = Math.max(FACILITE.min, arrondi2(avant + (FACILITE[note] || 0)));
    return { id, notion: notionDe(id), facilite, intervalle, derniere: aujourdhui, echeance: ajouterJours(aujourdhui, intervalle), revues: ((carte && carte.revues) || 0) + 1, note };
  }

  /** Un délai en mots, pour le petit texte sous chaque bouton. */
  function delaiEnMots(jours) {
    if (jours <= 0) return 'dans ' + REVOIR_APRES + ' questions';
    if (jours === 1) return 'demain';
    if (jours < 60) return 'dans ' + jours + ' jours';
    const mois = Math.round(jours / 30);
    return 'dans ' + mois + ' mois';
  }

  /** Ce que chaque bouton annonce sous son nom, plafonds compris : { revoir, difficile, bien, facile }. */
  function delaisQuestion(carte, aujourdhui) {
    const i = intervallesQuestion(carte);
    const p = plafond(aujourdhui);
    const r = {};
    for (const n of NOTES) r[n] = n === 'revoir' ? delaiEnMots(0) : delaiEnMots(p ? Math.min(i[n], p.jours) : i[n]);
    return r;
  }

  /** La carte de la notion entière, programmée à partir des notes de ses questions : une « À revoir » donne « raté »,
      une « Difficile » donne « j'ai hésité », sinon « facile ». */
  function noteDeNotion(notes) {
    if (notes.includes('revoir')) return 'rate';
    if (notes.includes('difficile')) return 'hesite';
    return 'facile';
  }

  /** Les cartes de question à réviser ce jour-là pour une liste de notions, les plus en retard d'abord. */
  function duesQuestions(cartesQ, aujourdhui, notions) {
    const garder = notions ? new Set(notions) : null;
    return dues(cartesQ, aujourdhui).filter((id) => !garder || garder.has(notionDe(id)));
  }

  return {
    REPONSES, PLAFONDS, jourDe, ajouterJours, plafond, intervalleSuivant, programmer, appliquerPlafonds, dues,
    NOTES, LIBELLES, FACILITE, REVOIR_APRES, idQuestion, notionDe, intervallesQuestion, programmerQuestion, delaiEnMots, delaisQuestion, noteDeNotion, duesQuestions,
  };
});
