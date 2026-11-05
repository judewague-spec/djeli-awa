/* Stockage local dans IndexedDB : un magasin clé → valeur, et la sauvegarde en un seul fichier JSON.
   Le module marche dans le navigateur (window.Stockage) et dans Node pour les tests (require).
   La fabrique IndexedDB est passée en paramètre : le navigateur donne la vraie, les tests une fausse en mémoire.
   Chaque opération est une seule transaction : un import remplace tout ou rien. */
(function (racine, fabrique) {
  const S = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = S;
  else racine.Stockage = S;
})(this, function () {
  'use strict';

  const NOM_BASE = 'djeli-awa';
  const VERSION_BASE = 1;
  const MAGASIN = 'donnees';
  const APPLICATION = 'djeli-awa';
  const FORMAT_SAUVEGARDE = 1;

  /** Ouvre (ou crée) la base. Rend une promesse de la base ouverte. */
  function ouvrir(idb, nom = NOM_BASE) {
    return new Promise((ok, ko) => {
      if (!idb) return ko(new Error('IndexedDB indisponible'));
      const r = idb.open(nom, VERSION_BASE);
      r.onupgradeneeded = () => {
        const db = r.result;
        if (!db.objectStoreNames.contains(MAGASIN)) db.createObjectStore(MAGASIN);
      };
      r.onsuccess = () => ok(r.result);
      r.onerror = () => ko(r.error);
    });
  }

  /** Une transaction sur le magasin : travail(magasin) lance les requêtes et rend une fonction qui lit le résultat. */
  function transaction(db, mode, travail) {
    return new Promise((ok, ko) => {
      const t = db.transaction(MAGASIN, mode);
      const resultat = travail(t.objectStore(MAGASIN));
      t.oncomplete = () => ok(typeof resultat === 'function' ? resultat() : undefined);
      t.onerror = () => ko(t.error);
      t.onabort = () => ko(t.error || new Error('transaction annulée'));
    });
  }

  function lire(db, cle) {
    return transaction(db, 'readonly', (m) => { const r = m.get(cle); return () => r.result; });
  }

  function ecrire(db, cle, valeur) {
    return transaction(db, 'readwrite', (m) => { m.put(valeur, cle); });
  }

  function effacer(db, cle) {
    return transaction(db, 'readwrite', (m) => { m.delete(cle); });
  }

  /** Tout le contenu, sous forme d'objet { clé: valeur }. */
  function toutLire(db) {
    return transaction(db, 'readonly', (m) => {
      const cles = m.getAllKeys();
      const valeurs = m.getAll();
      return () => {
        const o = {};
        cles.result.forEach((c, i) => { o[c] = valeurs.result[i]; });
        return o;
      };
    });
  }

  /** Remplace tout le contenu par celui de l'objet donné, en une seule transaction. */
  function remplacerTout(db, donnees) {
    return transaction(db, 'readwrite', (m) => {
      m.clear();
      Object.keys(donnees).forEach((c) => m.put(donnees[c], c));
    });
  }

  /** Texte du fichier de sauvegarde. */
  function construireSauvegarde(donnees, date = Date.now()) {
    return JSON.stringify({
      application: APPLICATION,
      format: FORMAT_SAUVEGARDE,
      date: new Date(date).toISOString(),
      donnees,
    }, null, 1);
  }

  /** Lit un fichier de sauvegarde. Rend { ok: true, donnees } ou { ok: false, raison } (phrase pour l'écran). */
  function lireSauvegarde(texte) {
    let o;
    try { o = JSON.parse(texte); } catch (e) { return { ok: false, raison: 'Ce fichier est illisible.' }; }
    if (!o || typeof o !== 'object' || o.application !== APPLICATION) {
      return { ok: false, raison: 'Ce fichier n’est pas une sauvegarde de Djéli Awa.' };
    }
    if (typeof o.format !== 'number' || o.format > FORMAT_SAUVEGARDE) {
      return { ok: false, raison: 'Cette sauvegarde vient d’une version plus récente de l’application.' };
    }
    if (!o.donnees || typeof o.donnees !== 'object' || Array.isArray(o.donnees)) {
      return { ok: false, raison: 'Cette sauvegarde est incomplète.' };
    }
    return { ok: true, donnees: o.donnees };
  }

  async function exporter(db, date = Date.now()) {
    return construireSauvegarde(await toutLire(db), date);
  }

  /** Remplace les données par celles du fichier. Un fichier refusé ne touche à rien. */
  async function importer(db, texte) {
    const r = lireSauvegarde(texte);
    if (r.ok) await remplacerTout(db, r.donnees);
    return r;
  }

  function nomFichierSauvegarde(date = Date.now()) {
    const d = new Date(date);
    const deux = (n) => String(n).padStart(2, '0');
    return 'djeli-awa-sauvegarde-' + d.getFullYear() + '-' + deux(d.getMonth() + 1) + '-' + deux(d.getDate()) + '.json';
  }

  return {
    NOM_BASE, VERSION_BASE, MAGASIN, APPLICATION, FORMAT_SAUVEGARDE,
    ouvrir, lire, ecrire, effacer, toutLire, remplacerTout,
    construireSauvegarde, lireSauvegarde, exporter, importer, nomFichierSauvegarde,
  };
});
