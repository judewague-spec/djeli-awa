/* Notion 2 du bloc « Les nombres » : critères de divisibilité. Les savons de Moussa. Format : contenu/GABARIT-NOTION.md. */
(function (racine, fabrique) {
  const notion = fabrique(racine.OutilsContenu || require('../js/outils-contenu.js'));
  if (typeof module === 'object' && module.exports) module.exports = notion;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.notions[notion.id] = notion; }
})(this, function (O) {
  const somme = (n) => String(n).split('').reduce((a, x) => a + Number(x), 0);
  const chiffres = (n) => String(n).split('').join(' + ');
  const OUI = 'Oui', NON = 'Non';
  /** Le petit test de d sur n, écrit pour la correction. */
  function test(n, d) {
    const der = String(n).slice(-1);
    if (d === 2) return 'Le dernier chiffre est ' + der + (n % 2 ? ' : il est impair.' : ' : il est pair.');
    if (d === 5) return 'Le dernier chiffre est ' + der + (n % 5 ? ' : ni 0 ni 5.' : ' : c’est 0 ou 5.');
    if (d === 10) return 'Le dernier chiffre est ' + der + (n % 10 ? ' : ce n’est pas 0.' : ' : le nombre se termine par 0.');
    return 'Somme des chiffres : ' + chiffres(n) + ' = ' + somme(n) + (somme(n) % d ? ', qui n’est pas dans la table de ' + d + '.' : ', qui est dans la table de ' + d + '.');
  }

  return {
    id: 'criteres-divisibilite',
    matiere: 'maths',
    bloc: 'nombres',
    titre: 'Critères de divisibilité',
    classe: '5e',
    univers: ['commerce', 'maison-courses', 'coiffure'],

    accroche: {
      texte: 'Moussa a reçu 135 savons pour sa boutique. Il veut les ranger en lots égaux de 2, de 3, de 5, de 9 ou de 10. ' +
        'Mais il n’a pas envie de faire toutes les divisions ! Existe-t-il un moyen de savoir tout de suite si ça tombe juste ?',
      image: { dessin: 'paquets', objets: 135, parPaquet: 9, description: 'Les 135 savons de Moussa rangés en lots de 9 : 15 lots, rien ne reste.' },
    },

    manipulation: {
      image: { dessin: 'paquets', objets: 30, parPaquet: 5, description: '30 savons rangés par lots de 5 : 6 lots, rien ne reste.' },
      etapes: [
        'Regarde le dernier chiffre. S’il est 0, 2, 4, 6 ou 8, le nombre est pair : il se partage en 2.',
        'S’il est 0 ou 5, le nombre se partage en 5. S’il est 0, il se partage en 10.',
        'Additionne les chiffres. Pour 135 : 1 + 3 + 5 = 9.',
        'Si cette somme est dans la table de 3, le nombre se partage en 3. Si elle est dans la table de 9, il se partage en 9.',
        'Pour 135 : le dernier chiffre est 5, et la somme fait 9. Il se partage en 3, en 5 et en 9, mais pas en 2 ni en 10.',
      ],
    },

    decouverte: {
      texte: (c) => '135 ' + c.mot('divisible') + ' 3, 5 et 9, sans faire une seule division ! ' +
        'Voici ' + c.mot('criteres') + '. Pour 2, 5 et 10 : le dernier chiffre. Pour 3 et 9 : la somme des chiffres. ' +
        'Vérifie : 135 ÷ 9 = 15, ça tombe juste.',
    },

    vocabulaire: {
      termes: {
        divisible: { sesMots: 'se partage sans reste en', officiel: 'est divisible par', lesDeux: 'se partage sans reste en (on dit : est divisible par)' },
        criteres: { sesMots: 'les petits tests', officiel: 'les critères de divisibilité', lesDeux: 'les petits tests, que les matheux appellent les critères de divisibilité' },
      },
      textes: [
        'Pour l’instant, garde tes mots : 135 se partage sans reste en 5. Et le dernier chiffre, la somme des chiffres, ce sont nos petits tests. ' +
          'Les matheux ont leurs mots : je te les dirai la prochaine fois.',
        'Les matheux disent : 135 est divisible par 5. Et nos petits tests, ils les appellent les critères de divisibilité. ' +
          'Divisible par 5, ça veut dire : se partage en 5 sans reste.',
        'Tu connais les mots officiels : 135 est divisible par 3, par 5 et par 9. Les critères de divisibilité permettent de le voir sans calculer.',
      ],
    },

    exercices: [
      {
        id: 'dernier-chiffre',
        univers: 'commerce',
        // [nombre, diviseur testé]
        versions: [[134, 2], [135, 2], [240, 10], [245, 10], [345, 5], [346, 5], [718, 2], [990, 10], [405, 5], [1003, 5]],
        genere(c) {
          const [n, d] = c.alea.choisir(this.versions);
          const bonne = n % d === 0 ? OUI : NON;
          return {
            enonce: 'Moussa a ' + n + ' savons. Le nombre ' + n + ' est-il divisible par ' + d + ' ?',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Pour ' + d + ', regarde seulement le dernier chiffre.',
            aideParlee: 'Pour 2, 5 et 10, regarde seulement le dernier chiffre.',
            correction: [test(n, d), 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'somme-des-chiffres',
        univers: 'maison-courses',
        versions: [[123, 3], [124, 3], [234, 9], [235, 9], [471, 3], [612, 9], [702, 9], [811, 3], [999, 9], [1011, 3]],
        genere(c) {
          const [n, d] = c.alea.choisir(this.versions);
          const bonne = n % d === 0 ? OUI : NON;
          return {
            enonce: 'Au supermarché, il y a ' + n + ' boîtes de tomates. Le nombre ' + n + ' est-il divisible par ' + d + ' ?',
            reponse: O.choix(c.alea, bonne, [OUI, NON]),
            aide: 'Additionne les chiffres : ' + chiffres(n) + '. Puis regarde la table de ' + d + '.',
            aideParlee: 'Pour 3 et 9, additionne les chiffres, puis regarde si la somme est dans la table.',
            correction: [test(n, d), 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'chiffre-efface',
        univers: 'coiffure',
        // [chiffre des centaines, chiffre des unités] : le chiffre des dizaines est effacé ; le plus petit qui rend divisible par 3
        versions: [[4, 2], [2, 5], [1, 1], [5, 3], [7, 0], [3, 8], [6, 4], [8, 1]],
        genere(c) {
          const [a, b] = c.alea.choisir(this.versions);
          let x = 0;
          while ((a + x + b) % 3) x++;
          return {
            enonce: 'Rebecca a acheté des perles pour ses tresses. Sur l’étiquette, un chiffre est effacé : ' + a + ' ? ' + b + ' perles. ' +
              'Elle sait que le nombre est divisible par 3. Quel est le plus petit chiffre possible à la place du point d’interrogation ?',
            reponse: { type: 'nombre', valeur: x },
            aide: 'La somme ' + a + ' + ? + ' + b + ' doit être dans la table de 3. Essaie 0, puis 1, puis 2.',
            aideParlee: 'La somme des trois chiffres doit être dans la table de 3. Essaie 0, puis 1, puis 2.',
            correction: [a + ' + ' + x + ' + ' + b + ' = ' + (a + x + b) + ', qui est dans la table de 3.', 'Le plus petit chiffre possible est ' + x + ' : le nombre est ' + a + x + b + '.'],
          };
        },
      },
      {
        id: 'quel-lot',
        univers: 'commerce',
        // Un seul lot parmi 2, 3, 5, 9 et 10 tombe juste.
        versions: [14, 22, 38, 33, 57, 51, 55, 65, 85, 69],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          const bon = [2, 3, 5, 9, 10].find((d) => n % d === 0);
          const options = ['Des lots de 2', 'Des lots de 3', 'Des lots de 5', 'Des lots de 9', 'Des lots de 10'];
          const bonne = 'Des lots de ' + bon;
          return {
            enonce: 'Fatou vend ' + n + ' noix de coco. Un seul de ces lots tombe juste. Lequel ?',
            reponse: O.choix(c.alea, bonne, options),
            aide: 'Dernier chiffre de ' + n + ' : ' + String(n).slice(-1) + '. Somme des chiffres : ' + somme(n) + '.',
            aideParlee: 'Regarde le dernier chiffre, puis la somme des chiffres.',
            correction: [test(n, 2), test(n, 3), 'Réponse : ' + bonne + '.'],
          };
        },
      },
      {
        id: 'somme',
        univers: 'maison-courses',
        versions: [135, 246, 378, 459, 512, 627, 803, 914, 1206, 2019],
        genere(c) {
          const n = c.alea.choisir(this.versions);
          return {
            enonce: 'Quelle est la somme des chiffres de ' + n + ' ?',
            reponse: { type: 'nombre', valeur: somme(n) },
            aide: 'Ajoute les chiffres un par un : ' + chiffres(n) + '.',
            aideParlee: 'Ajoute les chiffres un par un, de gauche à droite.',
            correction: [chiffres(n) + ' = ' + somme(n) + '.'],
          };
        },
      },
    ],

    defi: {
      versions: [270, 315, 180, 405, 252, 460, 135, 990],
      genere(c) {
        const n = c.alea.choisir(this.versions);
        const par9 = n % 9 === 0 ? OUI : NON;
        const tous = [2, 3, 5, 9, 10].filter((d) => n % d === 0);
        const vrai = tous.length === 5;
        return {
          enonce: 'Un grossiste reçoit ' + n + ' bonbons. Il veut les mettre en sachets identiques, sans reste. ' +
            'Ibrahim, son vendeur, affirme : « On peut faire des sachets de 2, de 3, de 5, de 9 ou de 10. »',
          questions: [
            {
              texte: 'Question 1. Quelle est la somme des chiffres de ' + n + ' ?',
              reponse: { type: 'nombre', valeur: somme(n) },
              aide: 'Ajoute les chiffres un par un.',
              correction: [chiffres(n) + ' = ' + somme(n) + '.'],
            },
            {
              texte: 'Question 2. Le nombre ' + n + ' est-il divisible par 9 ?',
              reponse: O.choix(c.alea, par9, [OUI, NON]),
              aide: 'Regarde si la somme des chiffres est dans la table de 9.',
              correction: [test(n, 9), 'Réponse : ' + par9 + '.'],
            },
            {
              texte: 'Question 3. Ibrahim a-t-il raison ? Justifie avec les critères de divisibilité.',
              correction: [test(n, 2), test(n, 5), test(n, 10), test(n, 3), test(n, 9),
                vrai ? 'Les cinq critères marchent : Ibrahim a raison.' : 'Divisible seulement par ' + tous.join(', ') + ' : Ibrahim a tort.'],
              grille: ['As-tu utilisé le dernier chiffre pour 2, 5 et 10 ?', 'As-tu utilisé la somme des chiffres pour 3 et 9 ?', 'As-tu conclu par une phrase : « Ibrahim a raison » ou « Ibrahim a tort » ?'],
            },
          ],
        };
      },
    },

    recompense: 'Bravo ! Avec le dernier chiffre et la somme des chiffres, tu sais tout de suite si un lot tombe juste.',
    carte: ['dernier-chiffre', 'somme-des-chiffres', 'quel-lot'],
    papierDuSoir: { exercices: ['chiffre-efface', 'quel-lot'], defi: true },
    automatismes: [
      {
        id: 'pair-ou-pas',
        versions: [37, 58, 104, 221, 390, 47, 1006, 85],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: n + ' est-il divisible par 2 ?', reponse: O.choix(c.alea, n % 2 ? NON : OUI, [OUI, NON]) }; },
      },
      {
        id: 'somme-rapide',
        versions: [123, 405, 312, 621, 234, 513],
        genere(c) { const n = c.alea.choisir(this.versions); return { enonce: 'Somme des chiffres de ' + n + ' ?', reponse: { type: 'nombre', valeur: somme(n) } }; },
      },
    ],
    savaisTu: 'Le savais-tu ? À Babylone, dans l’Irak d’aujourd’hui, on comptait de soixante en soixante : soixante se partage de beaucoup de façons.',
    prenoms: ['Moussa', 'Rebecca', 'Fatou', 'Ibrahim'],
  };
});
