/* Manipulation « petit tableur à trier » (bloc « Le numérique et l'intelligence artificielle », notion 14 ; accord du 2 nov. 2026).
   On trie les lignes, puis on filtre. Le tri et le filtre sont faits en code : rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : des boutons, et un vrai tableau, lu ligne par ligne ; chaque état est annoncé.
   Le dessin fixe { dessin: 'tableur', colonnes, lignes, description } sert aussi aux autres notions du tableur. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  // ---------- Données et calculs ----------

  const COLONNES = ['Produit', 'Prix (€)', 'Payé'];
  const LIGNES = [['Jus', 3, 'non'], ['Avocats', 5, 'oui'], ['Beignets', 2, 'oui'], ['Mangues', 4, 'non'], ['Riz', 6, 'oui']];

  const creer = () => ({ tri: null, filtre: false });

  /** tri : 'prix-croissant', 'prix-decroissant', 'nom', ou null. Le tableau de départ n'est jamais modifié. */
  function trier(lignes, tri) {
    const l = lignes.slice();
    if (tri === 'prix-croissant') l.sort((a, b) => a[1] - b[1]);
    if (tri === 'prix-decroissant') l.sort((a, b) => b[1] - a[1]);
    if (tri === 'nom') l.sort((a, b) => a[0].localeCompare(b[0], 'fr'));
    return l;
  }

  const filtrer = (lignes, filtre) => (filtre ? lignes.filter((x) => x[2] === 'oui') : lignes.slice());
  const visibles = (e) => filtrer(trier(LIGNES, e.tri), e.filtre);
  const reussi = (e) => e.tri === 'prix-croissant' && e.filtre;

  const NOM_TRI = { 'prix-croissant': 'par prix, du plus petit au plus grand', 'prix-decroissant': 'par prix, du plus grand au plus petit', nom: 'par nom, de A à Z' };

  function etatEcrit(e) {
    const v = visibles(e);
    return (e.tri ? 'Lignes rangées ' + NOM_TRI[e.tri] + '. ' : 'Lignes dans l’ordre de départ. ') +
      (e.filtre ? 'Seuls les clients qui ont payé sont montrés. ' : 'Toutes les lignes sont montrées. ') +
      v.length + ' lignes affichées : ' + v.map((x) => x[0] + ', ' + x[1] + ' euros').join(' ; ') + '.';
  }

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');

  /** Le dessin fixe : les colonnes A, B, C… et les lignes numérotées, comme dans un tableur. */
  function dessin(img) {
    const n = img.colonnes.length, L = 44 + n * 84, H = 28 + 26 * (img.lignes.length + 1);
    let s = '<svg class="dessin-code" viewBox="0 0 ' + L + ' ' + H + '" role="img" aria-label="' + aria(img.description) + '">';
    const texte = (x, y, t, classe) => '<text x="' + x + '" y="' + y + '" class="' + (classe || 'dessin-petit') + '">' + t + '</text>';
    img.colonnes.forEach((_, k) => { s += texte(44 + k * 84 + 42, 16, String.fromCharCode(65 + k)); });
    [img.colonnes].concat(img.lignes).forEach((ligne, i) => {
      const y = 24 + i * 26;
      s += texte(14, y + 18, String(i + 1));
      ligne.forEach((v, k) => {
        s += '<rect x="' + (44 + k * 84) + '" y="' + y + '" width="84" height="26" class="tableur-case' + (i === 0 ? ' entete' : '') + '"/>';
        s += texte(44 + k * 84 + 42, y + 18, String(v));
      });
    });
    return s + '</svg>';
  }

  function phrases() {
    return {
      juste: 'Bravo ! Ton tableau est rangé, et il ne montre que ceux qui ont payé.',
      pasEncore: 'Pas encore. Range par prix, du plus petit au plus grand, puis ne montre que ceux qui ont payé.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** fini() quand le tri et le filtre demandés sont en place et validés. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const e = creer();
    let termine = false;
    conteneur.innerHTML = '<div class="tableur-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.tableur-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');

    function afficher(annonce) {
      const caption = '<caption>Les ventes du marché</caption>';
      const entete = '<tr>' + COLONNES.map((c) => '<th scope="col">' + c + '</th>').join('') + '</tr>';
      const corps = visibles(e).map((l) => '<tr><th scope="row">' + l[0] + '</th><td>' + l[1] + '</td><td>' + l[2] + '</td></tr>').join('');
      cadre.innerHTML = '<table class="tableur-table">' + caption + '<thead>' + entete + '</thead><tbody>' + corps + '</tbody></table>';
      etat.textContent = (annonce ? annonce + ' ' : '') + etatEcrit(e);
    }
    const bouton = (texte, action) => {
      const b = doc.createElement('button');
      b.type = 'button';
      b.textContent = texte;
      b.addEventListener('click', () => {
        if (termine) return;
        const avant = etat.textContent;
        action();
        afficher();
        if (etat.textContent === avant) etat.textContent = 'Déjà fait. ' + avant; // le lecteur d'écran annonce ainsi un geste répété
      });
      zone.appendChild(b);
    };
    bouton('Ranger par prix, du plus petit au plus grand', () => { e.tri = 'prix-croissant'; });
    bouton('Ranger par prix, du plus grand au plus petit', () => { e.tri = 'prix-decroissant'; });
    bouton('Ranger par nom, de A à Z', () => { e.tri = 'nom'; });
    bouton('Ne montrer que ceux qui ont payé', () => { e.filtre = true; });
    bouton('Montrer toutes les lignes', () => { e.filtre = false; });
    const valider = doc.createElement('button');
    valider.type = 'button';
    valider.textContent = 'Valider mon tableau';
    valider.addEventListener('click', () => {
      if (termine) return;
      if (!reussi(e)) { afficher(P.pasEncore); dire(etat.textContent, P.pasEncore); return; }
      termine = true;
      zone.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    });
    zone.appendChild(valider);
    afficher();
    return { etat: () => e };
  }

  return { type: 'tableur', COLONNES, LIGNES, creer, trier, filtrer, visibles, reussi, etatEcrit, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
