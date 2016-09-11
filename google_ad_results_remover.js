// ==UserScript==
// @name         Google ad results remover
// @namespace    https://github.com/Avec112/MonkeyScripts
// @version      0.1
// @description  Remove the annoying ad results
// @author       Avec
// @include      https://*.google.*/*
// @grant        GM_addStyle
// @downloadURL  https://raw.githubusercontent.com/Avec112/MonkeyScripts/master/google_ad_results_remover.js
// @updateURL    https://raw.githubusercontent.com/Avec112/MonkeyScripts/master/google_ad_results_remover.js
// ==/UserScript==


(function() {

    // did not work. Had to override with css
    //$("#center_col li.ads-ad").hide();

})();

GM_addStyle('\
          li.ads-ad { display: none !important; }\
');
