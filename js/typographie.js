/* Typographie française, posée à l'affichage : espaces insécables devant ; : ! ? et dans les guillemets, entre un nombre et son unité,
   apostrophe courbe. Les textes du contenu gardent leurs espaces simples ; les sons n'en dépendent pas (Voix.normaliser). */
(function (racine, fabrique) {
  const T = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = T;
  else racine.Typographie = T;
})(this, function () {
  'use strict';
  const FINE = ' ', INSECABLE = ' ';
  const UNITES = 'km|hm|dam|dm|cm|mm|nm|µm|m|kg|mg|hg|t|g|hL|dL|cL|mL|L|h|min|ms|s|°C|°|%|‰|€|kWh|MWh|GWh|Wh|kW|MW|GW|W|mV|kV|V|mA|A|kHz|MHz|GHz|Hz|kN|N|kJ|MJ|J|Mo|Go|To|ko|Ko|octets?|bits?|dB|ppm|hPa|Pa|euros?|heures?|ans?|jours?|semaines?|mois|minutes?|secondes?|mètres?|kilomètres?|centimètres?|litres?|kilos?|grammes?|kilogrammes?|degrés?|volts?|watts?|newtons?|km/h|m/s|Mbit/s|bit/s|cm²|dm²|km²|mm²|m²|cm³|dm³|mm³|m³|ha';
  const AVANT_UNITE = new RegExp('(\\d) (?=(?:' + UNITES + ')(?![\\p{L}\\d]))', 'gu');

  function typo(t) {
    return String(t)
      .replace(/(\p{L})'(?=[\p{L}\d])/gu, '$1’')
      .replace(/ +([;!?])/g, FINE + '$1')
      .replace(/ +([:»])/g, INSECABLE + '$1')
      .replace(/« +/g, '«' + INSECABLE)
      .replace(AVANT_UNITE, '$1' + INSECABLE);
  }

  /** Corrige les textes d'un nœud et de ceux qui s'y ajoutent ensuite. */
  function surveiller(racineDom) {
    const corriger = (n) => {
      if (n.nodeType !== 3) return;
      const p = n.parentNode;
      if (p && /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)) return;
      const v = typo(n.nodeValue);
      if (v !== n.nodeValue) n.nodeValue = v;
    };
    const tout = (n) => {
      if (n.nodeType === 3) { corriger(n); return; }
      const w = document.createTreeWalker(n, 4);
      while (w.nextNode()) corriger(w.currentNode);
    };
    tout(racineDom);
    new MutationObserver((liste) => {
      for (const m of liste) {
        if (m.type === 'characterData') corriger(m.target);
        else m.addedNodes.forEach(tout);
      }
    }).observe(racineDom, { childList: true, subtree: true, characterData: true });
  }

  return { typo, surveiller };
});
