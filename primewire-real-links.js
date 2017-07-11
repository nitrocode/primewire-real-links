// ==UserScript==
// @name           PrimewireLinks
// @namespace      nitrocode
// @description    If link text is missing, it will fill it so you can see which CDNs to click on. This will also strip out Promo / Sponsor hosts.
// @version        0.1
// @include        *://*.primewire.ag/tv-*
// @include        *://*.primewire.ag/watch-*
// @grant          none
// ==/UserScript==

// Purposely did not use jquery because it didn't seem to work too well with FF
// Only run script after the page has fully loaded
window.addEventListener('load', function() {
    // grab all version_host class vars that hold the rocker script
    var tables = document.querySelectorAll('.movie_version');
    var real_url, real_url_de, domain_text, domain_text_el;
    var real_link_count = 0;
    for (var i=0; i<tables.length; i++) {
        // extract domain text from js
        domain_text_el = tables[i].querySelector('.version_host');
        domain_text = domain_text_el.innerHTML.substring(
            domain_text_el.innerHTML.indexOf("'") + 1,
            domain_text_el.innerHTML.lastIndexOf("'")
        );
        // if the text does not contain Host like Promo Host or Sponsor Host
        if (!domain_text.includes('Host')) {
            // set domain text without javascript
            domain_text_el.innerHTML = domain_text;
            // base64 decrypt the real url
            real_url = tables[i].querySelector('a');
            real_url_de = atob(real_url.href.split('&')[1].split('=')[1]);
            real_url.href = real_url_de;
            //given_url.innerHTML = real_url;
            console.log('#' + i + ' Found real link: ' + real_url_de);
            real_link_count++;
        // remove it if it does
        } else {
            tables[i].remove();
            console.log('#' + i + ' Removed: ' + domain_text);
        }
    }
    console.log('Found ' + real_link_count + ' real links');
}, false);
