/* Manipulation « compte ton pouls » (SVT, l'effort) : une vraie mesure sur son propre corps.
   Deux doigts sur le poignet, elle touche le grand bouton à chaque battement pendant la durée du chronomètre ;
   le code calcule les battements par minute. Sans toucher en rythme : elle compte de tête et écrit le nombre dans un champ.
   Au lecteur d'écran : le temps restant est annoncé toutes les cinq secondes, puis le résultat. Rien n'est inventé : le calcul est fait en code. */
(function (racine, fabrique) {
  const P = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = P;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(P);
})(this, function () {
  'use strict';

  // ---------- Calculs ----------

  /** Battements par minute, d'après le nombre compté pendant « duree » secondes. */
  const parMinute = (n, duree) => Math.round((n * 60) / duree);

  // ---------- Dessin ----------

  /** Un cœur et le nombre de battements par minute écrit dessous. */
  function svg(bpm, description) {
    let s = '<svg class="pouls" viewBox="0 0 160 150" role="img" aria-label="' + String(description || '').replace(/"/g, '&quot;') + '">';
    s += '<path d="M80,130 C20,90 10,55 35,35 C55,20 75,30 80,45 C85,30 105,20 125,35 C150,55 140,90 80,130 Z" class="coeur"/>';
    if (bpm) s += '<text x="80" y="80" class="pouls-nombre">' + bpm + '</text><text x="80" y="98" class="pouls-unite">par minute</text>';
    return s + '</svg>';
  }

  /** Le dessin fixe d'une image { dessin: 'pouls', bpm, description }. */
  const dessin = (img) => svg(img.bpm, img.description);

  function phrases() {
    return {
      depart: 'C’est parti ! Touche le grand bouton à chaque battement que tu sens sous tes doigts.',
      fin: 'C’est fini ! Ton pouls est écrit à l’écran : c’est le nombre de battements en une minute.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { duree } en secondes (15 par défaut). */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const duree = reglages.duree || 15;
    let n = 0, reste = duree, minuteur = null, termine = false;
    conteneur.innerHTML = '<div class="pouls-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons pouls-boutons"></div>' +
      '<form class="saisie pouls-saisie"><label for="pouls-compte">Ou bien : compte de tête pendant ' + duree + ' secondes, et écris le nombre de battements :</label>' +
      '<input id="pouls-compte" type="text" inputmode="numeric" autocomplete="off"><button type="submit">Calculer</button></form>';
    const cadre = conteneur.querySelector('.pouls-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.pouls-boutons');
    const form = conteneur.querySelector('.pouls-saisie');

    function finir(compte) {
      if (termine) return;
      termine = true;
      clearInterval(minuteur);
      const bpm = parMinute(compte, duree);
      cadre.innerHTML = svg(bpm, 'Ton pouls : ' + bpm + ' battements par minute.');
      etat.textContent = phrases().fin + ' ' + compte + ' battements en ' + duree + ' secondes, soit ' + bpm + ' battements par minute.';
      dire(etat.textContent, phrases().fin);
      zone.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      form.querySelectorAll('input, button').forEach((b) => { b.disabled = true; });
      fini();
    }
    const bouton = (texte, action) => { const b = doc.createElement('button'); b.type = 'button'; b.textContent = texte; b.addEventListener('click', action); zone.appendChild(b); return b; };
    const battement = bouton('Un battement', () => { if (minuteur && !termine) { n++; battement.textContent = 'Un battement (' + n + ')'; } });
    battement.classList.add('pouls-gros');
    battement.disabled = true;
    const depart = bouton('Démarrer le chronomètre', () => {
      depart.disabled = true;
      battement.disabled = false;
      battement.focus();
      etat.textContent = phrases().depart + ' Il reste ' + reste + ' secondes.';
      dire(etat.textContent, phrases().depart);
      minuteur = setInterval(() => {
        reste--;
        if (reste <= 0) {
          if (n > 0) finir(n);
          else { clearInterval(minuteur); minuteur = null; etat.textContent = 'Le temps est écoulé. Écris maintenant le nombre de battements que tu as comptés.'; form.querySelector('input').focus(); }
        }
        else if (reste % 5 === 0) etat.textContent = 'Il reste ' + reste + ' secondes.';
      }, 1000);
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = Number(form.querySelector('input').value.trim());
      if (Number.isInteger(v) && v > 0 && v < 100) finir(v);
      else etat.textContent = 'Écris un nombre entier de battements, par exemple 20.';
    });
    cadre.innerHTML = svg(null, 'Un cœur. Ton pouls s’affichera ici.');
    return { etat: () => ({ n, reste, termine }) };
  }

  return { type: 'pouls', parMinute, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
