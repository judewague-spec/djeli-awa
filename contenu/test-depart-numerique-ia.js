/* Test de départ du bloc de technologie « Le numérique et l'intelligence artificielle » : « Le banc des machines » (SPEC.md, section 7 ; js/seances.js).
   Sur le modèle des autres tests : un poste du banc des machines, au fond de l'atelier, par notion testée (cycle 4 et 4e ; les notions
   de 3e sont toujours à apprendre). La réparatrice dit sa phrase, puis pose deux questions tirées des générateurs de la notion.
   Deux réponses justes du premier coup = notion acquise. */
(function (racine, tour) {
  if (typeof module === 'object' && module.exports) module.exports = tour;
  else { racine.Contenu = racine.Contenu || { notions: {}, graphes: {} }; racine.Contenu.tests = racine.Contenu.tests || {}; racine.Contenu.tests[tour.bloc] = tour; }
})(this, {
  id: 'banc-des-machines',
  bloc: 'numerique-ia',
  titre: 'Le banc des machines',
  etape: 'poste',
  prefixe: 'machines',
  phrases: {
    'test-intro': 'Viens au fond de l’atelier : voici le banc des machines ! À chaque poste, la réparatrice te pose deux petites questions sur le numérique. Prends ton cahier. Tu peux t’arrêter quand tu veux.',
    'test-reprise': 'On reprend le banc des machines là où tu t’étais arrêtée.',
    'test-fin': 'Le banc des machines est fini. Merci ! Ton chemin du numérique est prêt : je sais par où commencer avec toi.',
  },
  etals: [
    { notion: 'fichiers-dossiers', titre: 'Le vieil ordinateur', phrase: 'Tous ces documents sont en vrac. Sais-tu les reconnaître et les ranger ?', generateurs: ['quel-genre', 'fichiers-en-tout'] },
    { notion: 'bit-octet', titre: 'Le tableau de lampes', phrase: 'Ces lampes s’allument et s’éteignent. Elles parlent la langue des machines.', generateurs: ['octets-en-bits', 'vrai-ou-faux'] },
    { notion: 'tailles-fichiers', titre: 'La carte mémoire', phrase: 'Cette carte est presque pleine. Que pèsent donc ces fichiers ?', generateurs: ['go-en-mo', 'le-plus-lourd'] },
    { notion: 'donnees-personnelles', titre: 'Le formulaire du client', phrase: 'Pour réparer ce téléphone, que dois-je vraiment savoir de toi ?', generateurs: ['personnelle-ou-pas', 'quel-droit'] },
    { notion: 'traces-cookies', titre: 'Le téléphone bavard', phrase: 'Ce téléphone en dit long sur son propriétaire. Comment le sait-il ?', generateurs: ['trace-ou-pas', 'position-utile'] },
    { notion: 'mots-de-passe', titre: 'Le cadenas de l’armoire', phrase: 'Cette armoire est fermée par un code. Est-il assez solide ?', generateurs: ['solide-ou-faible', 'combien-de-codes'] },
    { notion: 'cyberviolence', titre: 'Le tableau d’affichage', phrase: 'Une affiche dit : personne ne reste seule. Sais-tu quels gestes aident ?', generateurs: ['que-faire', 'quel-numero'] },
    { notion: 'usage-raisonne', titre: 'La pendule de l’atelier', phrase: 'Il se fait tard, et cet écran brille encore. Qui commande ?', generateurs: ['bon-reglage', 'heures-par-semaine'] },
    { notion: 'ia-apprentissage', titre: 'La machine qui trie', phrase: 'Cette machine apprend à trier les vis, à force d’exemples.', generateurs: ['quelle-facon', 'vrai-ou-faux'] },
    { notion: 'ia-usages-biais', titre: 'L’assistant vocal', phrase: 'Cet assistant ne comprend pas tout le monde aussi bien. Pourquoi ?', generateurs: ['ia-ou-pas', 'cause-du-defaut'] },
    { notion: 'types-donnees', titre: 'Le cahier de pannes', phrase: 'Dans ce cahier, il y a des mots, des nombres, et des oui ou non.', generateurs: ['quel-type', 'combien-de-valeurs'] },
    { notion: 'code-ascii', titre: 'Le clavier en panne', phrase: 'Quand j’appuie sur A, c’est un nombre qui part dans la machine. Lequel ?', generateurs: ['code-d-une-lettre', 'poids-du-message'] },
    { notion: 'tableur-calculs', titre: 'Le carnet des factures', phrase: 'Mes factures sont dans un tableur. Il compte pour moi, si je sais lui parler.', generateurs: ['nom-de-la-case', 'resultat-de-la-formule'] },
    { notion: 'tableur-tris', titre: 'La liste des clients', phrase: 'Je veux voir d’abord les réparations les moins chères.', generateurs: ['tri-ou-filtre', 'premiere-ligne'] },
    { notion: 'reseau-local', titre: 'La baie de câbles', phrase: 'Tous ces câbles arrivent dans la même boîte. À quoi sert-elle ?', generateurs: ['quel-element', 'prises-libres'] },
    { notion: 'adresse-ip', titre: 'L’imprimante perdue', phrase: 'Mon ordinateur ne trouve pas l’imprimante. Regardons leurs adresses.', generateurs: ['correcte-ou-pas', 'meme-reseau'] },
  ],
});
