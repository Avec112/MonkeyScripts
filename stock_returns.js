// ==UserScript==
// @name         Nordnet Norden Historic Return
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Pick the most solid companies and mark them green. Second most yellow.
// @author       Avec
// @match        https://www.nordnet.no/mux/web/marknaden/kurslista/aktier.html*subtyp=historic_return*
// @grant        GM_log
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js
// @grant    GM_addStyle
// ==/UserScript==

// GM_addStyle('.warn { width:20px; height:20px; background: url(http://www.clker.com/cliparts/b/b/f/5/12525782581615116634good-warning-error.svg.hi.png) -100 0;}');
// GM_addStyle('.fail { width:20px; height:20px; background: url(http://www.clker.com/cliparts/b/b/f/5/12525782581615116634good-warning-error.svg.hi.png) -200 0;}');
// Cells in table
// ----------------------------------------------------------------------------------
// | I dag	| En uke | En måned	| 3 måneder	| 6 måneder	| 1 år | 2 år |	3 år | 5 år |
// ----------------------------------------------------------------------------------
// |     2  |      3 |        4 |         5 |         6 |    7 |    8 |    9 |   10 |
// ----------------------------------------------------------------------------------
(function() {
    // 'use strict';
    // ********************************************************************************************************************************
    // Configure how you want to display the results

    var firstCell = 5; // Pick number for first cell above
    var cellCount = 6; // Choose how many cells you will display (match). I.e. firstCell is 5 and countCell is 6. Then you will use cells 5 to 10
    var positiveColor = '#80ff00';
    var negativeColor = 'pink';
    var requiredPositiveIncreaseFactor = 0.25; // 0.1 equals 10%. This kinda says somthing about the trendline. Higher value steper trend. Also fewer matches.

    // ********************************************************************************************************************************

    $("#kurstabell tbody tr").append("<td><img class='ok' src='http://wiki.plarium.com/images/5/59/Empty.png' style='height:0px; width:0px;'/></td>");
    
    //var row = $("#kurstabell tbody tr:lt(2)").find("td:gt(4):lt(5)"); // tr:lt(x) to limit row amount
    var row = $("#kurstabell tbody tr").find("td:gt(" + (firstCell-1) + "):lt(" + cellCount + ")"); // td:gt(x) eq reference cell. lt(x) eq cell count to include. Note! Must match cellCount variable

    var nextCell = 0;
    var current = 0;
    row.each(function(i) {
        var value = $(this).text();
        value = accounting.unformat(value);

        if(nextCell == cellCount) {
            current = 0;
            nextCell = 0;
        }
       // console.log(j+": current = " + current +", value = " + value);

        // ok!
        if(current*(requiredPositiveIncreaseFactor+1) < value) {
            $(this).css("background-color", positiveColor);
        } else {
            $(this).css("background-color", negativeColor);
            $(this).parent().find("td:last-child img").addClass("fail");
        }
        current = value;
        nextCell++;

    });
    
})();

GM_addStyle('\
          .ok, .warn, .fail {\
            width:20px !important; \
            height:19px !important; \
            //max-height: 20px; \
            //max-width: 20px; \
            background: url(http://www.clker.com/cliparts/b/b/f/5/12525782581615116634good-warning-error.svg.hi.png) 0 0;\
            background-size: 60px 19px;\
            background-repeat: no-repeat;\
          }\
          .warn {\
            background-position-x: -20px;\
          }\
          .fail {\
            background-position-x: -40px;\
          }\
');
