/* Les quatre boutons d'Anki, après une réponse juste (consigne du 6 nov. 2026) : « À revoir », « Difficile », « Bien », « Facile ».
   Seulement les quatre mots : les délais sont calculés en coulisse (consigne du 6 nov. 2026, 21 h 37) ; le focus va sur « Bien » ; les touches 1, 2, 3 et 4 les choisissent.
   Après une réponse fausse : un seul bouton, « J'ai compris, question suivante ». L'écran défile pour les montrer en entier. */
(function (racine) {
  'use strict';
  const R = racine.Revision;

  function bouton(texte, sous, classe) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = classe || '';
    const nom = document.createElement('span');
    nom.className = 'anki-nom';
    nom.textContent = texte;
    b.append(nom);
    if (sous) {
      const s = document.createElement('span');
      s.className = 'anki-delai';
      s.textContent = sous;
      b.append(s);
      b.setAttribute('aria-label', texte + ', ' + sous);
    }
    return b;
  }

  /** Montre l'élément en entier, sans saut brusque, puis place le focus. */
  function montrer(zone, focus) {
    try { zone.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) { zone.scrollIntoView(false); }
    focus.focus({ preventScroll: true });
  }

  let clavier = null;
  function oublierClavier() { if (clavier) { document.removeEventListener('keydown', clavier, true); clavier = null; } }

  /** Les quatre boutons. delais : { revoir, difficile, bien, facile } en mots. choisir(note) est appelé une seule fois. */
  function boutons(delais, choisir) {
    oublierClavier();
    const zone = document.createElement('div');
    zone.className = 'anki';
    zone.setAttribute('role', 'group');
    zone.setAttribute('aria-label', 'Comment c’était ?');
    let fait = false;
    const prendre = (note) => {
      if (fait) return;
      fait = true;
      oublierClavier();
      zone.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      choisir(note);
    };
    const parNote = {};
    R.NOTES.forEach((note) => {
      const b = bouton(R.LIBELLES[note], delais ? delais[note] : null, 'anki-' + note + (note === 'bien' ? ' defaut' : ''));
      b.dataset.note = note;
      b.addEventListener('click', () => prendre(note));
      parNote[note] = b;
      zone.append(b);
    });
    clavier = (e) => {
      if (!document.body.contains(zone)) { oublierClavier(); return; }
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      const i = ['1', '2', '3', '4'].indexOf(e.key);
      if (i < 0) return;
      e.preventDefault();
      prendre(R.NOTES[i]);
    };
    document.addEventListener('keydown', clavier, true);
    zone.montrer = () => montrer(zone, parNote.bien);
    return zone;
  }

  /** Après une réponse fausse : « J'ai compris, question suivante ». */
  function compris(action, texte) {
    oublierClavier();
    const b = bouton(texte || 'J’ai compris, question suivante', null, 'compris');
    let fait = false;
    b.addEventListener('click', () => { if (fait) return; fait = true; b.disabled = true; action(); });
    b.montrer = () => montrer(b, b);
    return b;
  }

  racine.VueAnki = { boutons, compris, oublierClavier };
})(window);
