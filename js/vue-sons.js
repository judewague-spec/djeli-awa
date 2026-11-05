/* Dans les réglages : le bouton « Tout télécharger maintenant ». L'avancement est annoncé tous les 10 %, pas plus. */
(function (racine) {
  'use strict';
  const mo = (x) => (x >= 1073741824 ? (x / 1073741824).toFixed(1).replace('.', ',') + ' Go' : Math.max(1, Math.round(x / 1048576)) + ' Mo');

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
      } else {
        bouton.textContent = 'Tout télécharger maintenant';
        bouton.disabled = false;
        zone.dataset.reste = String(e.total - e.faits);
      }
    }

    bouton.addEventListener('click', async () => {
      const e = await racine.Sons.etat();
      const reste = e.total - e.faits;
      const oui = await racine.Habillage.confirmer('Tout télécharger ?', 'Il reste ' + mo(reste) + ' de sons à télécharger. Mieux vaut être en Wi-Fi.', 'Télécharger', 'Pas maintenant');
      if (!oui) return;
      const place = await racine.Sons.preparerPlace();
      if (place.libre !== null && place.libre < reste) {
        zone.textContent = 'Il manque de la place sur ce téléphone : il faut ' + mo(reste) + ', et il reste ' + mo(place.libre) + '.';
        return;
      }
      enCours = new AbortController();
      bouton.hidden = true;
      arreter.hidden = false;
      barre.hidden = false;
      arreter.focus();
      let dixieme = -1;
      zone.textContent = 'Téléchargement commencé.';
      try {
        const fini = await racine.Sons.toutTelecharger({
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
        zone.textContent = fini ? 'C’est fini : tout marche maintenant sans internet.' : 'Arrêté. Ce qui est déjà là reste gardé : tu pourras reprendre plus tard.';
      } catch (err) {
        const plein = err && err.name === 'QuotaExceededError';
        zone.textContent = plein ? 'Il n’y a plus assez de place sur ce téléphone. Ce qui est déjà là reste gardé.' : 'Le téléchargement s’est coupé : il faut internet. Ce qui est déjà là reste gardé, tu pourras reprendre.';
      }
      enCours = null;
      bouton.hidden = false;
      arreter.hidden = true;
      barre.hidden = true;
      await rafraichir();
      if (!bouton.disabled) bouton.focus(); else document.getElementById('titre-sons').focus();
    });

    arreter.addEventListener('click', () => { if (enCours) enCours.abort(); });
    return { rafraichir };
  }

  racine.VueSons = { monter };
})(window);
