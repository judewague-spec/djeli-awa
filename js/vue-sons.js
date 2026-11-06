/* Dans les réglages : le bouton « Tout télécharger maintenant ». L'avancement est annoncé tous les 10 %, pas plus.
   Une erreur isolée n'arrête plus tout ; à la fin, la page dit ce qui manque et propose « Reprendre », avec un court détail
   de la cause, à répéter tel quel (consigne du 6 nov. 2026). Un téléchargement coupé (page fermée) reprend seul à la prochaine ouverture. */
(function (racine) {
  'use strict';
  const mo = (x) => (x >= 1073741824 ? (x / 1073741824).toFixed(1).replace('.', ',') + ' Go' : Math.max(1, Math.round(x / 1048576)) + ' Mo');
  const CLE = 'djeli-sons-telechargement'; // « en-cours » : à reprendre seul ; « a-reprendre » : proposer « Reprendre »
  const lire = () => { try { return racine.localStorage.getItem(CLE); } catch (e) { return null; } };
  const ecrire = (v) => { try { if (v) racine.localStorage.setItem(CLE, v); else racine.localStorage.removeItem(CLE); } catch (e) { /* sans stockage */ } };

  function monter() {
    const bouton = document.getElementById('bouton-tout-telecharger');
    const arreter = document.getElementById('bouton-arreter-sons');
    const zone = document.getElementById('etat-sons');
    const barre = document.getElementById('avance-sons');
    if (!bouton || !racine.Sons || !racine.Sons.disponible()) { if (bouton) bouton.closest('section').hidden = true; return { rafraichir() {} }; }
    let enCours = null;

    async function rafraichir() {
      if (enCours) return;
      const e = await racine.Sons.etat().catch(() => null);
      if (!e) return;
      if (e.complet) {
        bouton.textContent = 'Tout est déjà téléchargé';
        bouton.disabled = true;
        ecrire(null);
      } else {
        bouton.textContent = lire() ? 'Reprendre' : 'Tout télécharger maintenant';
        bouton.disabled = false;
        zone.dataset.reste = String(e.total - e.faits);
      }
    }

    // Sans internet pendant le téléchargement : on le dit, et il reprend seul au retour.
    racine.addEventListener('offline', () => { if (enCours) zone.textContent = 'En attente d’internet : le téléchargement reprendra seul. Détail : pas d’internet.'; });
    racine.addEventListener('online', () => { if (enCours) zone.textContent = 'Internet est revenu : le téléchargement reprend.'; });

    async function lancer(sansQuestion) {
      if (enCours) return;
      const e = await racine.Sons.etat().catch(() => null);
      if (!e) { zone.textContent = 'Le téléchargement n’a pas pu commencer : il faut internet. Détail : liste des sons introuvable.'; return; }
      if (e.complet) { await rafraichir(); return; }
      const reste = e.total - e.faits;
      if (!sansQuestion) {
        const oui = await racine.Habillage.confirmer('Tout télécharger ?', 'Il reste ' + mo(reste) + ' de sons à télécharger. Mieux vaut être en Wi-Fi, et garder l’écran allumé.', 'Télécharger', 'Pas maintenant');
        if (!oui) return;
      }
      const place = await racine.Sons.preparerPlace();
      if (place.libre !== null && place.libre < reste) {
        zone.textContent = 'Il manque de la place sur ce téléphone : il faut ' + mo(reste) + ', et il reste ' + mo(place.libre) + '. Détail : plus de place.';
        return;
      }
      enCours = new AbortController();
      ecrire('en-cours');
      bouton.hidden = true;
      arreter.hidden = false;
      barre.hidden = false;
      if (!sansQuestion) arreter.focus();
      let dixieme = -1;
      zone.textContent = sansQuestion ? 'Le téléchargement reprend.' : 'Téléchargement commencé.';
      try {
        const r = await racine.Sons.toutTelecharger({
          signal: enCours.signal,
          surAvance(fait, total) {
            const p = total ? fait / total : 1;
            barre.value = p;
            const d = Math.floor(p * 10);
            if (d > dixieme) {
              if (dixieme >= 0 && d < 10) zone.textContent = 'Téléchargé : ' + d * 10 + ' %.';
              dixieme = d;
            }
          },
        });
        if (r.fini) { ecrire(null); zone.textContent = 'C’est fini : tout marche maintenant sans internet.'; }
        else if (r.arrete) { ecrire('a-reprendre'); zone.textContent = 'Arrêté. Ce qui est déjà là reste gardé : appuie sur « Reprendre » pour continuer.'; }
        else {
          ecrire('a-reprendre');
          const n = r.manquants.length;
          zone.textContent = 'Presque fini : ' + (n === 1 ? 'un son n’a' : n + ' sons n’ont') + ' pas pu être téléchargé' + (n === 1 ? '' : 's') +
            '. Tout le reste marche sans internet. Appuie sur « Reprendre » pour réessayer. Détail : ' + r.manquants[0].detail + '.';
        }
      } catch (err) {
        ecrire('a-reprendre');
        zone.textContent = racine.Sons.estPlein(err)
          ? 'Il n’y a plus assez de place sur ce téléphone. Ce qui est déjà là reste gardé. Détail : plus de place.'
          : 'Le téléchargement s’est coupé. Ce qui est déjà là reste gardé : appuie sur « Reprendre ». Détail : ' + ((err && err.detail) || (err && err.message) || 'inconnu') + '.';
      }
      enCours = null;
      bouton.hidden = false;
      arreter.hidden = true;
      barre.hidden = true;
      await rafraichir();
      if (document.getElementById('reglages').hidden) return;
      if (!bouton.disabled) bouton.focus(); else document.getElementById('titre-sons').focus();
    }

    bouton.addEventListener('click', () => lancer(bouton.textContent === 'Reprendre'));
    arreter.addEventListener('click', () => { if (enCours) enCours.abort(); });
    // Un téléchargement coupé avant la fin (page fermée, téléphone éteint) reprend seul à la prochaine ouverture.
    if (lire() === 'en-cours' && navigator.onLine !== false) setTimeout(() => lancer(true), 1500);
    return { rafraichir };
  }

  racine.VueSons = { monter };
})(window);
