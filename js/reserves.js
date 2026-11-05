/* Réserves de phrases de Djéli Awa (SPEC.md, section 10 ; décision du 1er novembre 2026).
   Pour chaque situation, une phrase est tirée au hasard dans sa réserve, sans répéter l'une des 3 dernières entendues
   dans cette situation. Un dicton (réserve I) au plus une fois par séance, en fin de mission, une fois sur trois.
   Le texte affiché à l'écran est la phrase dite. */
(function (racine, fabrique) {
  const R = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = R;
  else racine.Reserves = R;
})(this, function () {
  'use strict';

  const RESERVES = {
    // A. bonne réponse
    A: ['Excellent !', 'Bravo, c’est exactement ça !', 'Oui ! Tu l’as.', 'Bien joué, c’est ça !', 'Parfait !',
      'Exactement ! Tu vois que tu sais faire.', 'Très bien, on continue !', 'Et voilà ! C’est ça.'],
    // B. 3 bonnes réponses d'affilée, à la place de A
    B: ['Encore une ! Tu enchaînes !', 'Tu enchaînes les bonnes réponses, bravo !', 'Rien ne t’arrête aujourd’hui !',
      'Là, tu maîtrises vraiment.', 'Quelle série ! Continue comme ça.', 'Tu es lancée, rien ne t’arrête !',
      'Encore bravo ! Tu prends confiance, ça se sent.', 'Bravo, tu es sur ta lancée !'],
    // C. bonne réponse juste après une erreur sur le même exercice, à la place de A
    C: ['Voilà ! Tu as corrigé toute seule.', 'Bien rattrapé !', 'Tu vois, il suffisait de regarder encore.',
      'C’est ça ! Une erreur, ça sert à apprendre.', 'Bien vu, tu as trouvé ton erreur !', 'Et voilà, tu ne lâches rien !',
      'Tu as réfléchi, et ça a payé. Bravo !'],
    // D. première erreur sur un exercice
    D: ['Pas tout à fait. Regarde encore.', 'Presque ! Essaie encore une fois.', 'Hmm, pas encore. Prends ton temps.',
      'Ce n’est pas ça, mais tu n’es pas loin.', 'On réessaie, tu vas trouver.', 'Pas grave, c’est comme ça qu’on apprend. Encore une fois !'],
    // E. deuxième erreur, avant la correction
    E: ['Regarde la correction, on la comprend ensemble.', 'Ce n’était pas facile. Voici comment on fait.', 'Pas de souci, je te montre.',
      'Garde cette correction en tête, elle reviendra.'],
    // F. aucune action pendant 45 secondes
    F: ['Prends ton temps, je suis là.', 'Tu veux un petit coup de pouce ? Touche l’aide.', 'Réfléchis tranquillement, rien ne presse.',
      'Pas de panique, relis doucement la question.', 'Respire, tu as tout le temps qu’il faut.', 'Si tu bloques, l’aide est là pour toi.'],
    // G. fin de mission
    G: ['Mission accomplie ! Je suis fière de toi.', 'Belle séance ! Tu as bien travaillé.', 'C’est gagné pour aujourd’hui !',
      'Bravo pour ta persévérance !', 'Encore une mission réussie, bravo !', 'Tu progresses à chaque séance, continue !',
      'Superbe travail aujourd’hui !', 'On a bien avancé ensemble. À la prochaine !'],
    // H. ouverture de l'application, sauf la toute première fois (l'accueil du village reste dit)
    H: ['Te revoilà ! On reprend où on s’était arrêtées.', 'Contente de te retrouver !', 'Bonjour ! Prête pour une nouvelle aventure ?',
      'Te voilà ! Le village t’attendait.', 'Quel plaisir de te revoir !', 'On s’y remet ? Je suis prête, et toi ?', 'Bon retour au village !'],
    // I. dicton rare, après G
    I: ['Comme on dit : petit à petit, l’oiseau fait son nid.',
      'Comme on dit : si tu veux aller vite, marche seule ; si tu veux aller loin, marchons ensemble.',
      'Comme dit le proverbe : c’est en forgeant qu’on devient forgeron.',
      'Comme disait La Fontaine : patience et longueur de temps font plus que force ni que rage.',
      'Comme dit le proverbe : qui veut voyager loin ménage sa monture.',
      'Comme on dit : c’est en tombant qu’on apprend à marcher.'],
  };

  // Préfixe du nom des sons de chaque réserve (« Excellent ! » garde son son déjà fait, retour-juste).
  const PREFIXES = { A: 'bonne-reponse', B: 'serie', C: 'rattrapage', D: 'erreur', E: 'correction', F: 'relance', G: 'fin-de-mission', H: 'retour-appli', I: 'dicton' };
  const SANS_REPETER = 3;
  const SERIE = 3;
  const CHANCE_DICTON = 1 / 3;
  const ATTENTE_RELANCE = 45000; // ms sans action avant une phrase F

  /** Situation d'une bonne réponse : C juste après une erreur sur le même exercice, B à chaque 3e bonne réponse d'affilée, sinon A. */
  function situationJuste(serie, apresErreur) {
    if (apresErreur) return 'C';
    return serie >= SERIE && serie % SERIE === 0 ? 'B' : 'A';
  }

  /** Un tirage pour une séance. hasard : fonction comme Math.random (remplaçable dans les tests). */
  function creerTirage(hasard = Math.random) {
    const dernieres = {};
    let dictonDit = false;

    /** Une phrase de la réserve, au hasard, hors des 3 dernières entendues dans cette situation. */
    function tirer(situation) {
      const reserve = RESERVES[situation];
      if (!reserve) throw new Error('situation inconnue : ' + situation);
      const vues = dernieres[situation] || (dernieres[situation] = []);
      const possibles = reserve.filter((p) => !vues.includes(p));
      const phrase = possibles[Math.min(possibles.length - 1, Math.floor(hasard() * possibles.length))];
      vues.push(phrase);
      if (vues.length > Math.min(SANS_REPETER, reserve.length - 1)) vues.shift();
      return phrase;
    }

    /** En fin de mission : un dicton une fois sur trois, au plus une fois par séance ; sinon null. */
    function dicton() {
      if (dictonDit || hasard() >= CHANCE_DICTON) return null;
      dictonDit = true;
      return tirer('I');
    }

    return { tirer, dicton };
  }

  /** Toutes les phrases, avec leur situation : [{ situation, texte }]. */
  function toutes() {
    return Object.entries(RESERVES).flatMap(([situation, liste]) => liste.map((texte) => ({ situation, texte })));
  }

  // Le tirage de la séance en cours (une page ouverte), partagé par l'accueil et les missions.
  let seanceCourante = null;
  const seance = () => seanceCourante || (seanceCourante = creerTirage());

  const FELICITATIONS = ['A', 'B', 'C', 'G'];
  const estFelicitation = (texte) => FELICITATIONS.some((s) => RESERVES[s].includes(texte));

  return { RESERVES, PREFIXES, SANS_REPETER, SERIE, CHANCE_DICTON, ATTENTE_RELANCE, situationJuste, creerTirage, seance, toutes, FELICITATIONS, estFelicitation };
});
