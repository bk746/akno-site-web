/** Scroll en haut au chargement + scrollRestoration manual (sans overlay intro). */
export const scrollBootScript = `(function(){try{if("scrollRestoration"in history)history.scrollRestoration="manual";if(!location.hash)window.scrollTo(0,0);}catch(e){}})();`;
