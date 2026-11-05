/* Manipulation « un message qui voyage de routeur en routeur » (bloc « Le numérique et l'intelligence artificielle », notion 17 ; accord du 2 nov. 2026).
   À chaque carrefour, on choisit le suivant. Le réseau et ses liaisons sont écrits ici, le code vérifie : rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : des boutons ; la position et le trajet sont annoncés à chaque geste. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  // ---------- Le réseau ----------

  const DEPART = 'Le téléphone d’Aminata', ARRIVEE = 'Le téléphone de Moussa', SERVEUR = 'L’ordinateur des messages';
  /** Les liaisons : de chaque point, où l'on peut aller. La liaison C, D est coupée : il faut passer par ailleurs. */
  const LIAISONS = {
    [DEPART]: ['Le carrefour A'],
    'Le carrefour A': ['Le carrefour B', 'Le carrefour C'],
    'Le carrefour B': ['Le carrefour D', 'Le carrefour A'],
    'Le carrefour C': ['Le carrefour A'],
    'Le carrefour D': [SERVEUR, 'Le carrefour B'],
    [SERVEUR]: [ARRIVEE],
  };
  const COUPEE = 'Le carrefour C';

  // ---------- Calculs ----------

  const creer = () => ({ position: DEPART, trajet: [DEPART] });
  const voisins = (p) => LIAISONS[p] || [];
  function aller(e, p) {
    if (!voisins(e.position).includes(p)) return false;
    e.position = p;
    e.trajet.push(p);
    return true;
  }
  const arrive = (e) => e.position === ARRIVEE;

  function etatEcrit(e) {
    if (arrive(e)) return 'Le message est arrivé. Son trajet : ' + e.trajet.join(', puis ') + '.';
    return 'Le message est à : ' + e.position + '.' + (e.position === COUPEE ? ' La liaison vers le carrefour D est coupée : il faut revenir en arrière.' : '');
  }

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');

  /** Le dessin fixe { dessin: 'routage', description } : le réseau, avec chaque point nommé. */
  function dessin(img) {
    const P = { a: [40, 70], A: [110, 70], B: [180, 30], C: [180, 110], D: [250, 30], S: [250, 110], m: [320, 110] };
    const lig = (u, v, coupe) => '<line x1="' + P[u][0] + '" y1="' + P[u][1] + '" x2="' + P[v][0] + '" y2="' + P[v][1] + '" class="circuit-fil' + (coupe ? ' coupe' : '') + '"/>';
    const pt = (u, t) => '<circle cx="' + P[u][0] + '" cy="' + P[u][1] + '" r="15" class="circuit-lampe"/>' + (t ? '<text x="' + P[u][0] + '" y="' + (P[u][1] + 5) + '" class="dessin-petit">' + t + '</text>' : '');
    // Les noms entiers ne tiennent pas dans un cercle : ils sont écrits dessous (5 nov. 2026).
    const nom = (u, t) => '<text x="' + P[u][0] + '" y="' + (P[u][1] + 30) + '" class="dessin-petit">' + t + '</text>';
    return '<svg class="dessin-code" viewBox="0 0 360 175" role="img" aria-label="' + aria(img.description) + '">' +
      lig('a', 'A') + lig('A', 'B') + lig('A', 'C') + lig('B', 'D') + lig('D', 'S') + lig('S', 'm') + lig('C', 'D', true) +
      pt('a', '') + pt('A', 'A') + pt('B', 'B') + pt('C', 'C') + pt('D', 'D') + pt('S', '') + pt('m', '') +
      nom('a', 'Aminata') + nom('S', 'Ordinateur') + nom('m', 'Moussa') +
      '<text x="180" y="168" class="dessin-legende">Le trait en pointillés est coupé.</text></svg>';
  }

  function phrases() {
    return {
      impasse: 'Par ici, la liaison est coupée. Reviens en arrière, et prends un autre chemin.',
      juste: 'Bravo ! Le message est arrivé, de carrefour en carrefour.',
    };
  }

  // ---------- La manipulation dans la page ----------

  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const e = creer();
    conteneur.innerHTML = '<p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');

    function afficher(annonce) {
      etat.textContent = (annonce ? annonce + ' ' : '') + etatEcrit(e);
      zone.innerHTML = '';
      voisins(e.position).forEach((p) => {
        const b = doc.createElement('button');
        b.type = 'button';
        b.textContent = 'Envoyer vers : ' + p;
        b.addEventListener('click', () => {
          aller(e, p);
          if (arrive(e)) {
            afficher(P.juste);
            etat.setAttribute('tabindex', '-1');
            etat.focus();
            dire(etat.textContent, P.juste);
            fini();
            return;
          }
          if (e.position === COUPEE) { afficher(P.impasse); dire(etat.textContent, P.impasse); } else afficher();
          if (zone.firstChild) zone.firstChild.focus();
        });
        zone.appendChild(b);
      });
    }
    afficher();
    return { etat: () => e };
  }

  return { type: 'routage', DEPART, ARRIVEE, LIAISONS, creer, voisins, aller, arrive, etatEcrit, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
