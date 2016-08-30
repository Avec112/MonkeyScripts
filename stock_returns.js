// ==UserScript==
// @name         Nordnet Norden Historic Return
// @namespace    https://github.com/Avec112/MonkeyScripts
// @version      0.6
// @description  Pick the most solid companies and mark them with appropriate icon
// @author       Avec
// @match https://www.nordnet.no/mux/web/marknaden/kurslista/aktier.html*subtyp=historic_return*
// @grant        GM_log
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js
// @grant        GM_addStyle
// ==/UserScript==

// Cells in table
// ----------------------------------------------------------------------------------
// | I dag    | En uke | En måned    | 3 måneder    | 6 måneder | 1 år | 2 år |    3 år | 5 år |
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
    //var minimumLastYearReturnsInFactor = 0.25; // 0.1 equals 10%. "1 år" minimum returns in percent.

    // ********************************************************************************************************************************

    // Append img holder to all rows
    $("#kurstabell tbody tr.highLight").append("<td><img src='https://raw.githubusercontent.com/Avec112/MonkeyScripts/master/Empty.png' style='height:0px; width:0px;'/></td>");

    var row = $("#kurstabell tbody tr");

    row.each(function(i) {
        var isAllGreen = true;
        var isNegativeValue = false;
        var previousValue = 0;

        var cells = $(this).find("td:gt(" + (firstCell-1) + "):lt(" + cellCount + ")");

        cells.each(function(nextCell) {

            var value = accounting.unformat($(this).text());

            if(value > 0 && previousValue * (requiredPositiveIncreaseFactor+1) < value) {

                $(this).css("background-color", positiveColor); // ok

                // if 5 year cell
                if(nextCell == (10-firstCell)) {
                    // if value is less than requiredPositiveIncrease² (includes both year 4 and 5)
                    if(previousValue * Math.pow((requiredPositiveIncreaseFactor+1),2) > value) {
                        isAllGreen = false;
                        $(this).css({"background-color": 'yellow'});
                    } 
                }

            } else {
                isAllGreen = false;
                $(this).css("background-color", negativeColor);
                if(value < 0) {
                    isNegativeValue = true;
                } 
            }

            previousValue = value;
        });

        //console.log("("+i+") -> isNegativeValue: " + isNegativeValue + ", isAllGreen: " + isAllGreen);
        if(isNegativeValue) {
            $(this).find("td:last-child img").addClass("fail");
        } else if(isAllGreen) {
            $(this).find("td:last-child img").addClass("ok");
        } else {
            $(this).find("td:last-child img").addClass("warn");
        }

    });
})();

// css
GM_addStyle('\
          .ok, .warn, .fail {\
            width:20px !important; \
            height:19px !important; \
            //max-height: 20px; \
            //max-width: 20px; \
            background: url(https://raw.githubusercontent.com/Avec112/MonkeyScripts/master/good-warning-error.png) 0 0;\
            background-size: 60px 19px;\
            background-repeat: no-repeat;\
          }\
          .warn {\
            background-position: -20px 0;\
          }\
          .fail {\
            //background-position: -40px 0 !important;\
            background-position: -40px 0;\
          }\
');
