/* Manipulation « programme pas à pas » (bloc de technologie « Programmer »). Le programme est écrit en mots, ligne par ligne, et il est vraiment exécuté par le code.
   Au doigt comme au lecteur d'écran : des boutons ; la ligne jouée, les variables, les sorties et ce qui est dit sont annoncés à chaque geste.
   On peut changer une entrée (la lumière, par exemple) et rejouer. Le dessin n'est jamais sans texte : la liste des lignes est un vrai texte. */
(function (racine, fabrique) {
  const X = fabrique(typeof module === 'object' && module.exports ? require('../programme-blocs.js') : racine.ProgrammeBlocs);
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function (PB) {
  'use strict';

  const ecr = (x) => (typeof x === 'number' ? String(x).replace('.', ',') : Array.isArray(x) ? x.map(ecr).join(', ') : x === true ? 'vrai' : x === false ? 'faux' : String(x));

  /** L'état écrit après un pas de la trace. */
  function etatEcrit(pas) {
    const vars = Object.entries(pas.vars).map(([k, v]) => k + ' vaut ' + ecr(v));
    const sorties = Object.entries(pas.sorties).map(([k, v]) => k + (v ? ' allumée' : ' éteinte'));
    return 'Ligne jouée : ' + pas.texte + '.' + (vars.length ? ' ' + vars.join(', ') + '.' : '') + (sorties.length ? ' Sortie : ' + sorties.join(', ') + '.' : '') + (pas.dits.length ? ' Dit : ' + pas.dits.map(ecr).join(', ') + '.' : '');
  }

  /** Le programme écrit en texte, ligne par ligne ; le décalage est dit en mots. */
  const lignesEnTexte = (programme) => PB.python(programme).map((l) => {
    const vide = l.length - l.trimStart().length;
    return (vide ? 'décalée de ' + vide + ' espaces : ' : '') + l.trim();
  });

  function phrases() {
    return {
      fin: 'Le programme est fini. Lis ce qu’il a fait, écrit à l’écran.',
      entree: 'L’entrée a changé. Rejoue le programme, ligne par ligne.',
    };
  }

  /** reglages : { programme, entrees: { nom: valeur }, choix: { nom: [valeurs] }, essais : le nombre de fins de programme à atteindre (1 par défaut) } */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const { programme, choix } = reglages;
    const entrees = Object.assign({}, reglages.entrees);
    const essais = reglages.essais || 1;
    let trace = PB.executer(programme, entrees).trace, k = 0, finis = 0, termine = false;
    conteneur.innerHTML = '<ol class="pas-a-pas-lignes"></ol><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const ol = conteneur.querySelector('.pas-a-pas-lignes');
    if (reglages.enTexte) {
      // Le même programme écrit en texte : le décalage est dit en mots.
      const titre = doc.createElement('p');
      titre.textContent = 'Le même programme, écrit en texte :';
      const texte = doc.createElement('ol');
      texte.className = 'pas-a-pas-lignes';
      for (const l of lignesEnTexte(programme)) {
        const li = doc.createElement('li');
        li.textContent = l;
        texte.append(li);
      }
      ol.after(titre, texte);
    }
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');
    for (const l of PB.aPlat(programme)) {
      const li = doc.createElement('li');
      li.textContent = (l.retrait ? 'dans le bloc : '.repeat(l.retrait) : '') + l.texte;
      ol.append(li);
    }
    const lesEntrees = () => (Object.keys(entrees).length ? ' Entrées : ' + Object.entries(entrees).map(([a, b]) => a + ' vaut ' + ecr(b)).join(', ') + '.' : '');
    const afficher = (t) => { etat.textContent = t + lesEntrees(); };
    const bouton = (texte, action) => {
      const c = doc.createElement('button');
      c.type = 'button';
      c.textContent = texte;
      c.addEventListener('click', () => { if (!termine) action(); });
      zone.appendChild(c);
    };
    bouton('Jouer la ligne suivante', () => {
      if (k >= trace.length) { afficher(P.fin); return; }
      const pas = trace[k];
      k += 1;
      if (k < trace.length) { afficher(etatEcrit(pas)); return; }
      afficher(etatEcrit(pas) + ' ' + P.fin);
      dire(etat.textContent, P.fin);
      finis += 1;
      if (finis >= essais) {
        termine = true;
        zone.querySelectorAll('button').forEach((c) => { c.disabled = true; });
        etat.setAttribute('tabindex', '-1');
        etat.focus();
        fini();
      }
    });
    bouton('Recommencer depuis le début', () => { k = 0; afficher('On recommence.'); });
    for (const [nom, valeurs] of Object.entries(choix || {})) {
      for (const v of valeurs) {
        bouton('Mettre ' + nom + ' à ' + ecr(v), () => {
          entrees[nom] = v;
          trace = PB.executer(programme, entrees).trace;
          k = 0;
          afficher(P.entree);
          dire(etat.textContent, P.entree);
        });
      }
    }
    afficher('Le programme est prêt.');
    return { etat: () => ({ k, finis, termine }) };
  }

  return { type: 'pas-a-pas', etatEcrit, lignesEnTexte, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
