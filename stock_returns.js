// ==UserScript==
// @name         Nordnet Norden Historic Return
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Show company strength with colors and icons
// @author       Avec
// @match        https://www.nordnet.no/mux/web/marknaden/kurslista/aktier.html*subtyp=historic_return*
// @grant        GM_log
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js
// @grant        GM_addStyle
// ==/UserScript==

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

    var firstCell = 4; // Pick number for first cell above
    var cellCount = 7; // Choose how many cells you will display (match). I.e. firstCell is 5 and countCell is 6. Then you will use cells 5 to 10
    var positiveColor = '#80ff00';
    var negativeColor = 'pink';
    var requiredPositiveIncreaseFactor = 0.30; // 0.1 equals 10%. This kinda says somthing about the trendline. Higher value steper trend. Also fewer matches.
    var minimumLastYearReturnsInFactor = 0.25; // 0.1 equals 10%. "1 år" minimum returns in percent.

    // ********************************************************************************************************************************

    $("#kurstabell tbody tr").append("<td><img /*class='ok'*/ src='http://wiki.plarium.com/images/5/59/Empty.png' style='height:0px; width:0px;'/></td>");

    //var row = $("#kurstabell tbody tr:lt(2)").find("td:gt(4):lt(5)"); // tr:lt(x) to limit row amount
    var row = $("#kurstabell tbody tr").find("td:gt(" + (firstCell-1) + "):lt(" + cellCount + ")"); // td:gt(x) eq reference cell. lt(x) eq cell count to include. Note! Must match cellCount variable

    var nextCell = 0;
    var current = 0;
    var isAllGreen = true;
    var isNegativeValue = false;
    row.each(function(i) {
        var value = $(this).text();
        value = accounting.unformat(value);

        // reset?
        if(nextCell == cellCount) {
            current = 0;
            nextCell = 0;
            isAllGreen = true;
            isNegativeValue = false;
        }
       // console.log(j+": current = " + current +", value = " + value);

        if((value > 0) && current*(requiredPositiveIncreaseFactor+1) < value) {

            $(this).css("background-color", positiveColor); // ok

            // if 1 year cell and value is less than minimumLastYearReturns
            if( nextCell == (7-firstCell) && value < minimumLastYearReturnsInFactor*10000) {
                isAllGreen = false;
                $(this).css("background-color", 'yellow'); // warn
                if(!isNegativeValue) {
                    $(this).parent().find("td:last-child img").addClass("warn");
                }
            }

            // if 5 year cell and value is less than requiredPositiveIncrease² (includes both year 4 and 5)
            if( nextCell == (10-firstCell) && current * Math.pow((requiredPositiveIncreaseFactor+1),2) > value) {
                $(this).css({"background-color": 'yellow'}); // warn
                if(!isNegativeValue) {
                    $(this).parent().find("td:last-child img").addClass("warn").css("opacity","0.8");
                }
            }

            if(nextCell == (10-firstCell) && isAllGreen) {
                $(this).parent().find("td:last-child img").addClass("ok");

            }


        } else {
            isAllGreen = false;
            if(value < 0) {
                isNegativeValue = true;
                $(this).parent().find("td:last-child img").addClass("fail");
            }
            $(this).css("background-color", negativeColor); // fail
            //$(this).parent().find("td:last-child img").addClass("fail");
        }
        current = value;
        nextCell++;

    });
})();

// css
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
            background-position: -20px 0;\
          }\
          .fail {\
            background-position: -40px 0;\
          }\
');
