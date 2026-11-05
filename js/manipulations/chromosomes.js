/* Manipulation « cartes de chromosomes à apparier » (bloc « Le vivant et son évolution », notions 10 et 13 ; accord du 2 nov. 2026).
   Une cellule modèle a 3 paires de chromosomes : 6 cartes. On forme les paires ; pour la méiose, on garde un chromosome de chaque paire ;
   pour la fécondation, deux gamètes se réunissent. Le code tient le compte : rien n'est inventé par une IA.
   Au doigt comme au lecteur d'écran : des boutons ; l'état est annoncé à chaque geste. La taille est écrite : la couleur n'est jamais le seul indice. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else if (racine.Manipulations) racine.Manipulations.enregistrer(X);
})(this, function () {
  'use strict';

  const TAILLES = ['grand', 'moyen', 'petit'];
  const ORIGINES = ['de la mère', 'du père'];

  // ---------- Calculs ----------

  /** Les 6 cartes, dans un ordre mélangé qui ne dépend pas du hasard : les deux d'une paire ne se suivent jamais. */
  const CARTES = [[0, 0], [1, 1], [2, 0], [0, 1], [2, 1], [1, 0]].map(([t, o], i) => ({ i, taille: TAILLES[t], origine: ORIGINES[o] }));

  const nomCarte = (c) => 'Chromosome ' + c.taille + ', venu ' + c.origine;

  /** phase : 'apparier', puis 'meiose', puis 'fecondation', puis 'fini'. paires : les tailles déjà formées. garde : la taille → l'origine gardée. */
  const creer = () => ({ phase: 'apparier', paires: [], choisie: null, garde: {} });

  /** Tente d'apparier deux cartes : juste si elles ont la même taille et ne sont pas la même carte. */
  const memePaire = (a, b) => a.i !== b.i && a.taille === b.taille;

  /** Le nombre de chromosomes de la cellule qu'on regarde. */
  function compte(e) {
    if (e.phase === 'meiose') return Object.keys(e.garde).length;
    return 6;
  }

  function etatEcrit(e, but) {
    if (e.phase === 'apparier') {
      const c = e.paires.length;
      const r = c === 0 ? 'Aucune paire n’est formée.' : c === 1 ? 'Une paire est formée.' : c + ' paires sont formées.';
      return r + ' Il y a 6 chromosomes dans cette cellule.';
    }
    if (e.phase === 'meiose') {
      const n = compte(e);
      return n === 0 ? 'Le gamète n’a encore aucun chromosome.' : 'Le gamète a ' + (n === 1 ? 'un chromosome' : n + ' chromosomes') + ', sur 3.';
    }
    if (e.phase === 'fecondation') return 'Ton gamète a 3 chromosomes, un de chaque paire. L’autre gamète en a 3 aussi.';
    return but === 'apparier' ? 'Les 3 paires sont formées : 6 chromosomes, 3 de la mère et 3 du père.' : 'La cellule-œuf a 6 chromosomes : 3 paires. Une moitié vient de chaque parent.';
  }

  // ---------- Dessin ----------

  const aria = (t) => String(t || '').replace(/"/g, '&quot;');
  const HAUTEUR = { grand: 54, moyen: 38, petit: 24 };

  /** Un chromosome : un bâtonnet ; le trait du milieu marque la différence d'origine, en plus de la couleur. */
  function baton(x, bas, taille, origine) {
    const h = HAUTEUR[taille];
    return '<rect x="' + x + '" y="' + (bas - h) + '" width="12" height="' + h + '" rx="6" class="chromosome' + (origine === ORIGINES[1] ? ' pere' : '') + '"/>' +
      (origine === ORIGINES[1] ? '<line x1="' + (x + 2) + '" y1="' + (bas - h / 2) + '" x2="' + (x + 10) + '" y2="' + (bas - h / 2) + '" class="circuit-fil"/>' : '');
  }

  /** chromosomes : une liste de { taille, origine } ; rangés par paires, de gauche à droite. Le trait marque ceux du père. */
  function svg(chromosomes, description, legende) {
    const groupes = TAILLES.map((t) => chromosomes.filter((c) => c.taille === t).sort((a, b) => ORIGINES.indexOf(a.origine) - ORIGINES.indexOf(b.origine)));
    let s = '<svg class="dessin-code" viewBox="0 0 300 ' + (legende ? 112 : 92) + '" role="img" aria-label="' + aria(description) + '">';
    groupes.forEach((g, i) => {
      const x = 40 + i * 90;
      g.forEach((c, k) => { s += baton(x + k * 18, 70, c.taille, c.origine); });
      if (g.length) s += '<text x="' + (x + 15) + '" y="86" class="dessin-petit">' + TAILLES[i] + '</text>';
    });
    if (legende) s += '<text x="150" y="106" class="dessin-legende">' + legende + '</text>';
    return s + '</svg>';
  }

  /** Toutes les cartes d'une cellule à 3 paires. */
  const cellule = () => CARTES.map((c) => ({ taille: c.taille, origine: c.origine }));

  /** Le dessin fixe d'une image { dessin: 'chromosomes', gamete, legende, description } : une cellule, ou un gamète s'il est demandé. */
  function dessin(img) {
    const liste = img.gamete ? TAILLES.map((taille, i) => ({ taille, origine: ORIGINES[i === 1 ? 1 : 0] })) : cellule();
    return svg(liste, img.description, img.legende);
  }

  function phrases() {
    return {
      paire: 'Oui, ces deux-là forment une paire.',
      pasPaire: 'Pas encore : une paire, c’est deux chromosomes de même taille.',
      meiose: 'Bravo, les paires sont formées. Pour faire un gamète, garde un seul chromosome de chaque paire.',
      gamete: 'Ton gamète est prêt, avec un chromosome de chaque paire. Réunis-le avec l’autre gamète.',
      juste: 'Bravo ! Tu as retrouvé le bon nombre de chromosomes.',
    };
  }

  // ---------- La manipulation dans la page ----------

  /** reglages : { but : 'apparier' | 'complet' } ; fini() quand c'est réussi. */
  function monter(conteneur, reglages, dire, fini) {
    const doc = conteneur.ownerDocument;
    const P = phrases();
    const but = reglages.but === 'apparier' ? 'apparier' : 'complet';
    const e = creer();
    let dernier = null; // le nom du dernier bouton touché : le focus y revient après chaque geste
    conteneur.innerHTML = '<div class="circuit-cadre"></div><p class="manip-etat" aria-live="polite"></p><div class="boutons"></div>';
    const cadre = conteneur.querySelector('.circuit-cadre');
    const etat = conteneur.querySelector('.manip-etat');
    const zone = conteneur.querySelector('.boutons');

    const bouton = (texte, action, presse) => {
      const b = doc.createElement('button');
      b.type = 'button';
      b.textContent = texte;
      if (presse !== undefined) b.setAttribute('aria-pressed', presse ? 'true' : 'false');
      b.addEventListener('click', () => { dernier = texte; action(); });
      zone.appendChild(b);
      return b;
    };

    function afficher(annonce) {
      const texte = etatEcrit(e, but);
      const vus = e.phase === 'meiose' ? Object.entries(e.garde).map(([taille, origine]) => ({ taille, origine }))
        : e.phase === 'fecondation' ? [] : cellule();
      cadre.innerHTML = e.phase === 'fecondation' ? '' : svg(vus, texte, 'Un trait : venu du père.');
      etat.textContent = (annonce ? annonce + ' ' : '') + texte;
      zone.innerHTML = '';
      if (e.phase === 'apparier') {
        CARTES.filter((c) => !e.paires.includes(c.taille)).forEach((c) => {
          bouton(nomCarte(c), () => choisir(c), e.choisie === c.i);
        });
      } else if (e.phase === 'meiose') {
        TAILLES.filter((t) => !e.garde[t]).forEach((t) => {
          ORIGINES.forEach((o) => bouton('Garder le chromosome ' + t + ' venu ' + o, () => garder(t, o)));
        });
      } else if (e.phase === 'fecondation') {
        bouton('Réunir les deux gamètes', () => {
          e.phase = 'fini';
          terminer();
        });
      }
      if (dernier && zone.firstChild) ([...zone.children].find((b) => b.textContent === dernier) || zone.firstChild).focus();
    }

    function terminer() {
      afficher(P.juste);
      etat.setAttribute('tabindex', '-1');
      etat.focus();
      dire(etat.textContent, P.juste);
      fini();
    }

    function choisir(c) {
      if (e.choisie === null) { e.choisie = c.i; afficher('Choisi : ' + nomCarte(c) + '.'); return; }
      if (e.choisie === c.i) { e.choisie = null; afficher('Carte reposée.'); return; }
      const a = CARTES[e.choisie];
      e.choisie = null;
      if (!memePaire(a, c)) { afficher(P.pasPaire); dire(etat.textContent, P.pasPaire); return; }
      e.paires.push(c.taille);
      if (e.paires.length < 3) { afficher(P.paire); dire(etat.textContent, P.paire); return; }
      if (but === 'apparier') { e.phase = 'fini'; terminer(); return; }
      e.phase = 'meiose';
      afficher(P.meiose);
      dire(etat.textContent, P.meiose);
    }

    function garder(t, o) {
      e.garde[t] = o;
      if (Object.keys(e.garde).length < 3) { afficher(); return; }
      e.phase = 'fecondation';
      afficher(P.gamete);
      dire(etat.textContent, P.gamete);
    }

    afficher();
    return { etat: () => e };
  }

  return { type: 'chromosomes', CARTES, creer, memePaire, compte, etatEcrit, svg, dessin, phrases, phrasesDites: () => Object.values(phrases()), monter };
});
