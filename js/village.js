/* Village d'accueil (DIRECTION-ARTISTIQUE.md) : cinq quartiers reliés par un chemin, Djéli Awa à chaque étape.
   Les dessins sont des images WebP dans images/app (originaux PNG dans images/sources) ; si une image manque, une silhouette la remplace.
   Les zones cliquables sont de vrais boutons, posés sur l'image, dans l'ordre du chemin. */
(function (racine, fabrique) {
  const V = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = V;
  else racine.Village = V;
})(this, function () {
  'use strict';

  // Couleurs vérifiées : texte du bouton contrasté AA, teintes distinctes pour un daltonien (tests/village.test.js).
  // zone : centre du bouton sur l'image, en pourcentage de sa largeur (x) et de sa hauteur (y).
  // Positions mesurées sur les images (images/controle-village.txt).
  const QUARTIERS = [
    {
      id: 'maths', matiere: 'Mathématiques', lieu: 'Le marché', forme: 'losange',
      couleur: '#3730A3', texte: '#FFFFFF',
      zone: { vertical: { x: 51, y: 13 }, horizontal: { x: 20, y: 32 } },
      image: 'images/app/djeli-maths.webp',
      alt: 'Djéli Awa en boubou indigo brodé de losanges et de triangles, un crayon derrière l’oreille, prête pour les maths.',
      accueil: 'Bienvenue au marché ! Ici, on compte, on partage et on mesure.',
    },
    {
      id: 'physique', matiere: 'Physique', lieu: 'La forge', forme: 'rond',
      couleur: '#F5A300', texte: '#2B1A0E',
      zone: { vertical: { x: 80, y: 27 }, horizontal: { x: 35, y: 55 } },
      image: 'images/app/djeli-physique.webp',
      alt: 'Djéli Awa en boubou ambre à éclairs et à ondes, avec des boucles d’oreilles en soleil, prête pour la physique.',
      accueil: 'Bienvenue à la forge ! Ici, on parle d’énergie, de lumière et de mouvement.',
    },
    {
      id: 'chimie', matiere: 'Chimie', lieu: 'La cuisine du restaurant', forme: 'hexagone',
      couleur: '#9C4DCC', texte: '#FFFFFF',
      zone: { vertical: { x: 18, y: 38 }, horizontal: { x: 57, y: 70 } },
      image: 'images/app/djeli-chimie.webp',
      alt: 'Djéli Awa en blouse blanche ouverte sur une robe violette, lunettes de protection relevées sur son foulard, prête pour la chimie.',
      accueil: 'Bienvenue dans la cuisine ! Ici, on mélange, on chauffe et on observe ce qui change.',
    },
    {
      id: 'svt', matiere: 'SVT', lieu: 'Le potager et le champ', forme: 'feuille',
      couleur: '#4E9A2A', texte: '#2B1A0E',
      zone: { vertical: { x: 78, y: 58 }, horizontal: { x: 73, y: 35 } },
      image: 'images/app/djeli-svt.webp',
      alt: 'Djéli Awa en robe verte à feuilles et à fleurs, sous un grand chapeau de paille, prête pour les SVT.',
      accueil: 'Bienvenue au potager ! Ici, on découvre le vivant, du corps humain aux plantes.',
    },
    {
      id: 'techno', matiere: 'Technologie', lieu: 'L’atelier du réparateur', forme: 'triangle',
      couleur: '#00737A', texte: '#FFFFFF',
      zone: { vertical: { x: 22, y: 68 }, horizontal: { x: 88, y: 70 } },
      image: 'images/app/djeli-techno.webp',
      alt: 'Djéli Awa en salopette bleu-vert à motifs de circuits, ceinture à outils et casque autour du cou, prête pour la technologie.',
      accueil: 'Bienvenue à l’atelier ! Ici, on démonte, on comprend et on répare.',
    },
  ];

  const ALT_VILLAGE = 'Le village de Djéli Awa, vu d’en haut. Un chemin de terre rouge part du feu de veillée et relie le marché, la forge, la cuisine du restaurant, le potager et le champ, puis l’atelier du réparateur. Un grand baobab se dresse au milieu.';

  const IMAGES = {
    village: { vertical: 'images/app/village-vertical.webp', horizontal: 'images/app/village-horizontal.webp', alt: ALT_VILLAGE },
    accueil: {
      src: 'images/app/djeli-brevet.webp',
      alt: 'Djéli Awa, la griotte conteuse, en grand boubou aux cinq couleurs, sa kora dans le dos et une calebasse à la main.',
    },
  };

  /** Toutes les images que l'application peut afficher (pour le service worker et les tests). */
  function toutesLesImages() {
    return [IMAGES.village.vertical, IMAGES.village.horizontal, IMAGES.accueil.src].concat(QUARTIERS.map((q) => q.image));
  }

  function quartier(id) {
    return QUARTIERS.find((q) => q.id === id) || null;
  }

  // ---------- Affichage (navigateur seulement) ----------

  function el(tag, attributs, enfants) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attributs || {})) {
      if (k === 'texte') e.textContent = v;
      else if (k === 'classe') e.className = v;
      else e.setAttribute(k, v);
    }
    for (const c of [].concat(enfants || [])) if (c) e.appendChild(c);
    return e;
  }

  /** Une image ; si le fichier manque, une silhouette qui porte le même texte alternatif. */
  function image(src, alt, classeSilhouette) {
    const img = el('img', { src, alt, classe: 'image' });
    img.addEventListener('error', () => {
      img.replaceWith(el('div', { role: 'img', 'aria-label': alt, classe: 'silhouette ' + classeSilhouette }, [el('span', { 'aria-hidden': 'true' })]));
    });
    return img;
  }

  /** Djéli Awa : image de sa tenue, ou silhouette. */
  function djeli(src, alt) {
    return el('figure', { classe: 'djeli' }, [image(src, alt, 'silhouette-djeli')]);
  }

  /** Le plan du village dans conteneur ; choisir(id) est appelé quand on touche un quartier. */
  function dessiner(conteneur, choisir) {
    const paysage = window.matchMedia('(orientation: landscape) and (min-width: 40rem)');
    const plan = el('div', { classe: 'plan' });
    const fond = el('div', { classe: 'plan-fond' });
    const liste = el('ul', { classe: 'quartiers', 'aria-label': 'Les quartiers, dans l’ordre du chemin' });
    for (const q of QUARTIERS) {
      const b = el('button', { type: 'button', classe: 'quartier forme-' + q.forme, 'data-quartier': q.id }, [
        el('span', { classe: 'quartier-forme', 'aria-hidden': 'true' }),
        el('span', { classe: 'quartier-lieu', texte: q.lieu }),
        el('span', { classe: 'sr', texte: ', ' }),
        el('span', { classe: 'quartier-matiere', texte: q.matiere }),
        el('span', { classe: 'sr', texte: ', avancement ' }),
        el('span', { classe: 'quartier-avance' }),
      ]);
      b.style.setProperty('--couleur', q.couleur);
      b.style.setProperty('--couleur-texte', q.texte);
      b.addEventListener('click', () => choisir(q.id));
      liste.appendChild(el('li', {}, [b]));
    }
    plan.append(fond, liste);
    conteneur.replaceChildren(plan);

    function placer() {
      const sens = paysage.matches ? 'horizontal' : 'vertical';
      plan.className = 'plan plan-' + sens;
      fond.replaceChildren(image(IMAGES.village[sens], IMAGES.village.alt, 'silhouette-village'));
      const img = fond.firstChild;
      if (img.complete) caler(); else img.addEventListener('load', caler);
    }

    // Chaque bouton est centré sur son quartier, puis rentré dans le plan s'il dépassait du bord.
    function caler() {
      const sens = plan.classList.contains('plan-horizontal') ? 'horizontal' : 'vertical';
      plan.classList.remove('plan-liste');
      const W = plan.clientWidth, H = plan.clientHeight;
      liste.querySelectorAll('li').forEach((li, i) => {
        const { x, y } = QUARTIERS[i].zone[sens];
        const w = li.offsetWidth, h = li.offsetHeight;
        li.style.left = Math.min(Math.max(W * x / 100, w / 2), W - w / 2) + 'px';
        li.style.top = Math.min(Math.max(H * y / 100, h / 2), H - h / 2) + 'px';
      });
      // Deux quartiers qui se chevauchent : la liste, plus lisible et plus facile à toucher (consigne du 6 nov. 2026).
      const r = [...liste.querySelectorAll('li')].map((li) => li.getBoundingClientRect());
      const touche = r.some((a, i) => r.some((c, j) => j > i && Math.min(a.right, c.right) - Math.max(a.left, c.left) > 2 && Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top) > 2));
      if (touche) plan.classList.add('plan-liste');
    }

    placer();
    paysage.addEventListener('change', placer);
    if (typeof ResizeObserver === 'function') new ResizeObserver(() => requestAnimationFrame(caler)).observe(plan);
  }

  return { QUARTIERS, IMAGES, toutesLesImages, quartier, image, djeli, dessiner };
});
