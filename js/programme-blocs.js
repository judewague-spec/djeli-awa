/* Petits programmes en blocs (bloc de technologie « Programmer ») : un programme est un tableau d'instructions ; ce module l'écrit en mots et l'exécute en code.
   Rien n'est dessiné sans texte, et rien n'est calculé par une IA. Aussi utilisé par les exercices et par la manipulation « pas-a-pas ».
   Instructions :
     { mettre: 'x', a: expr }              mettre x à …
     { ajouter: 'x', a: expr }             ajouter … à x
     { si: expr, alors: [...], sinon: [...] }  si … alors … sinon … (sinon facultatif)
     { repeter: n, faire: [...] }          répéter n fois
     { tantQue: expr, faire: [...] }       répéter tant que …
     { pourChaque: 'e', dans: 'L', faire: [...] }  pour chaque élément e de la liste L
     { liste: 'L', valeurs: [...] }        créer la liste L
     { ajouterListe: 'L', a: expr }        ajouter … à la liste L
     { dire: expr }                        dire …
     { allumer: 'lampe' } { eteindre: 'lampe' }  allumer ou éteindre une sortie
     { definir: 'arroser', faire: [...] }  définir le bloc arroser, un sous-programme : écrit en tête du programme, il n'est joué que s'il est appelé
     { appeler: 'arroser' }                appeler le bloc arroser
   Expressions : un nombre ; un texte entre guillemets { t: 'bonjour' } ; une variable { v: 'x' } ; une entrée { entree: 'lumiere' } ;
     { op, g, d } avec op parmi + − × ÷ < > = et ou ; { non: expr } ; { longueur: 'L' }. */
(function (racine, fabrique) {
  const X = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = X;
  else racine.ProgrammeBlocs = X;
})(this, function () {
  'use strict';

  const ecrNombre = (x) => String(x).replace('.', ',');
  const OPS = { '+': '+', '−': '−', '×': '×', '÷': '÷', '<': '<', '>': '>', '=': '=', et: 'et', ou: 'ou' };

  /** Une expression écrite en mots. */
  function expr(e) {
    if (typeof e === 'number') return ecrNombre(e);
    if (e.t !== undefined) return '« ' + e.t + ' »';
    if (e.v) return e.v;
    if (e.entree) return 'l’entrée ' + e.entree;
    if (e.longueur) return 'la longueur de ' + e.longueur;
    if (e.non) return 'non (' + expr(e.non) + ')';
    return (e.g.op ? '(' + expr(e.g) + ')' : expr(e.g)) + ' ' + OPS[e.op] + ' ' + (e.d.op ? '(' + expr(e.d) + ')' : expr(e.d));
  }

  /** La ligne d'une instruction simple, ou l'en-tête d'un bloc. */
  function entete(i) {
    if (i.mettre) return 'mettre ' + i.mettre + ' à ' + expr(i.a);
    if (i.ajouter) return 'ajouter ' + expr(i.a) + ' à ' + i.ajouter;
    if (i.si) return 'si ' + expr(i.si) + ' alors';
    if (i.repeter) return 'répéter ' + i.repeter + ' fois';
    if (i.tantQue) return 'répéter tant que ' + expr(i.tantQue);
    if (i.pourChaque) return 'pour chaque ' + i.pourChaque + ' de la liste ' + i.dans;
    if (i.liste) return 'créer la liste ' + i.liste + ' avec ' + i.valeurs.map(ecrNombre).join(', ');
    if (i.ajouterListe) return 'ajouter ' + expr(i.a) + ' à la liste ' + i.ajouterListe;
    if (i.dire !== undefined) return 'dire ' + expr(i.dire);
    if (i.allumer) return 'allumer ' + i.allumer;
    if (i.eteindre) return 'éteindre ' + i.eteindre;
    if (i.definir) return 'définir le bloc ' + i.definir;
    if (i.appeler) return 'appeler le bloc ' + i.appeler;
    throw new Error('instruction inconnue');
  }

  /** Toutes les lignes du programme, à plat : { texte, retrait, instruction }. Après les définitions, une ligne annonce le programme principal. */
  function aPlat(programme, retrait = 0, sortie = []) {
    programme.forEach((i, k) => {
      sortie.push({ texte: entete(i), retrait, instruction: i });
      const dedans = i.alors || i.faire;
      if (dedans) aPlat(dedans, retrait + 1, sortie);
      if (i.sinon) { sortie.push({ texte: 'sinon', retrait, instruction: null }); aPlat(i.sinon, retrait + 1, sortie); }
      if (dedans) sortie.push({ texte: 'fin du bloc', retrait, instruction: null });
      const suivant = programme[k + 1];
      if (i.definir && suivant && !suivant.definir) sortie.push({ texte: 'programme principal', retrait, instruction: null });
    });
    return sortie;
  }

  /** Le programme écrit en lignes, avec des espaces de retrait (pour le dessin « programme »). */
  const lignes = (programme) => aPlat(programme).map((l) => '  '.repeat(l.retrait) + l.texte);
  /** Le programme écrit en une phrase pour un énoncé ou une description : chaque bloc se termine par « fin du bloc ». */
  const enMots = (programme) => aPlat(programme).map((l) => l.texte).join(' ; ');

  function valeur(e, m) {
    if (typeof e === 'number') return e;
    if (e.t !== undefined) return e.t;
    if (e.v) { if (!(e.v in m.vars)) throw new Error('variable inconnue ' + e.v); return m.vars[e.v]; }
    if (e.entree) { if (!(e.entree in m.entrees)) throw new Error('entrée inconnue ' + e.entree); return m.entrees[e.entree]; }
    if (e.longueur) return m.vars[e.longueur].length;
    if (e.non) return !valeur(e.non, m);
    const g = valeur(e.g, m), d = valeur(e.d, m);
    switch (e.op) {
      case '+': return g + d;
      case '−': return g - d;
      case '×': return g * d;
      case '÷': return g / d;
      case '<': return g < d;
      case '>': return g > d;
      case '=': return g === d;
      case 'et': return Boolean(g && d);
      case 'ou': return Boolean(g || d);
      default: throw new Error('opérateur inconnu ' + e.op);
    }
  }

  const MAX_PAS = 500;

  /** Exécute le programme. Rend { vars, sorties, dits, trace } ; trace : une entrée par instruction exécutée : { texte, vars, sorties, dits }.
      Une définition n'est pas jouée ; un appel annonce l'entrée dans le sous-programme, chacune de ses lignes, puis le retour. */
  function executer(programme, entrees = {}) {
    const m = { vars: {}, sorties: {}, dits: [], entrees, trace: [] };
    const blocs = {}, pile = [];
    let tete = true;
    for (const i of programme) { if (i.definir) { if (!tete) throw new Error('bloc défini trop tard ' + i.definir); blocs[i.definir] = i.faire; } else tete = false; }
    const note = (texte) => {
      if (m.trace.length >= MAX_PAS) throw new Error('programme trop long');
      const ici = pile.length ? 'dans le sous-programme ' + pile[pile.length - 1] + ' : ' : '';
      m.trace.push({ texte: ici + texte, vars: JSON.parse(JSON.stringify(m.vars)), sorties: Object.assign({}, m.sorties), dits: m.dits.slice() });
    };
    function suite(liste) {
      for (const i of liste) {
        if (i.definir) continue;
        if (i.appeler) {
          if (!blocs[i.appeler]) throw new Error('bloc inconnu ' + i.appeler);
          note(entete(i) + ' : entrée dans le sous-programme ' + i.appeler);
          pile.push(i.appeler);
          suite(blocs[i.appeler]);
          pile.pop();
          note('fin du sous-programme ' + i.appeler + ', retour au ' + (pile.length ? 'sous-programme ' + pile[pile.length - 1] : 'programme principal'));
        }
        else if (i.mettre) { m.vars[i.mettre] = valeur(i.a, m); note(entete(i)); }
        else if (i.ajouter) { m.vars[i.ajouter] = valeur({ op: '+', g: { v: i.ajouter }, d: i.a }, m); note(entete(i)); }
        else if (i.si) { const c = valeur(i.si, m); note(entete(i) + ' : ' + (c ? 'oui' : 'non')); suite(c ? i.alors : i.sinon || []); }
        else if (i.repeter) { for (let k = 0; k < i.repeter; k++) { note(entete(i) + ' : tour ' + (k + 1)); suite(i.faire); } }
        else if (i.tantQue) { for (;;) { const c = valeur(i.tantQue, m); note(entete(i) + ' : ' + (c ? 'oui' : 'non')); if (!c) break; suite(i.faire); } }
        else if (i.pourChaque) { for (const x of m.vars[i.dans].slice()) { m.vars[i.pourChaque] = x; note(entete(i) + ' : ' + ecrNombre(x)); suite(i.faire); } }
        else if (i.liste) { m.vars[i.liste] = i.valeurs.slice(); note(entete(i)); }
        else if (i.ajouterListe) { m.vars[i.ajouterListe].push(valeur(i.a, m)); note(entete(i)); }
        else if (i.dire !== undefined) { m.dits.push(valeur(i.dire, m)); note(entete(i)); }
        else if (i.allumer) { m.sorties[i.allumer] = true; note(entete(i)); }
        else if (i.eteindre) { m.sorties[i.eteindre] = false; note(entete(i)); }
        else throw new Error('instruction inconnue');
      }
    }
    suite(programme);
    return { vars: m.vars, sorties: m.sorties, dits: m.dits, trace: m.trace };
  }

  /** Le programme traduit en Python : le premier pas vers l'écriture en texte. */
  function python(programme, retrait = 0) {
    const py = (e) => {
      if (typeof e === 'number') return String(e);
      if (e.t !== undefined) return '"' + e.t + '"';
      if (e.v) return e.v;
      if (e.entree) return 'lire_' + e.entree + '()';
      if (e.longueur) return 'len(' + e.longueur + ')';
      if (e.non) return 'not (' + py(e.non) + ')';
      const P = { '−': '-', '×': '*', '÷': '/', '=': '==', et: 'and', ou: 'or' };
      return (e.g.op ? '(' + py(e.g) + ')' : py(e.g)) + ' ' + (P[e.op] || e.op) + ' ' + (e.d.op ? '(' + py(e.d) + ')' : py(e.d));
    };
    const r = '    '.repeat(retrait), L = [];
    // Python demande « global » pour changer dans une fonction une variable du programme principal.
    const changees = (liste) => liste.flatMap((i) => (i.mettre ? [i.mettre] : i.ajouter ? [i.ajouter] : i.liste ? [i.liste] : (i.pourChaque ? [i.pourChaque] : []).concat(changees(i.alors || i.faire || []), changees(i.sinon || []))));
    for (const i of programme) {
      if (i.definir) {
        const g = [...new Set(changees(i.faire))];
        L.push(r + 'def ' + i.definir + '():', ...(g.length ? [r + '    global ' + g.join(', ')] : []), ...(i.faire.length ? python(i.faire, retrait + 1) : [r + '    pass']));
      }
      else if (i.appeler) L.push(r + i.appeler + '()');
      else if (i.mettre) L.push(r + i.mettre + ' = ' + py(i.a));
      else if (i.ajouter) L.push(r + i.ajouter + ' = ' + i.ajouter + ' + ' + py(i.a));
      else if (i.si) { L.push(r + 'if ' + py(i.si) + ':', ...python(i.alors, retrait + 1)); if (i.sinon) L.push(r + 'else:', ...python(i.sinon, retrait + 1)); }
      else if (i.repeter) L.push(r + 'for i in range(' + i.repeter + '):', ...python(i.faire, retrait + 1));
      else if (i.tantQue) L.push(r + 'while ' + py(i.tantQue) + ':', ...python(i.faire, retrait + 1));
      else if (i.pourChaque) L.push(r + 'for ' + i.pourChaque + ' in ' + i.dans + ':', ...python(i.faire, retrait + 1));
      else if (i.liste) L.push(r + i.liste + ' = [' + i.valeurs.join(', ') + ']');
      else if (i.ajouterListe) L.push(r + i.ajouterListe + '.append(' + py(i.a) + ')');
      else if (i.dire !== undefined) L.push(r + 'print(' + py(i.dire) + ')');
      else if (i.allumer) L.push(r + 'allumer("' + i.allumer + '")');
      else if (i.eteindre) L.push(r + 'eteindre("' + i.eteindre + '")');
    }
    return L;
  }

  return { expr, entete, aPlat, lignes, enMots, executer, python };
});
