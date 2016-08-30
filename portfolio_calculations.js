// ==UserScript==
// @name        nordnet
// @namespace   https://github.com/Avec112/MonkeyScripts
// @include     https://www.nordnet.no/mux/web/depa/mindepa/depaoversikt.html
// @include     https://www.nordnet.no/mux/web/depa/mindepa/depaoversikt.html#
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js
// @version     1.2
// @grant       GM_log
// ==/UserScript==

//this.$ = this.jQuery = jQuery.noConflict(true);

// Run on load page
$(function() {
  justDoIt();
});


function justDoIt()
{
  accounting.settings.number = {
   thousand: " ",
   decimal: ","
  };
  
  $("#aktier thead .bottomRow th:nth-child(8)").text("Kjøpsverdi");
  $("#aktier thead .bottomRow th:nth-child(9)").text("Markedsverdi");
  
  var profitKolonne = $("#aktier tbody td:nth-child(11)");
  var markedsverdiArray = $("#aktier tbody td:nth-child(8):not(:last-child)");
  var kjopsprisArray = $("#aktier tbody td:nth-child(9):not(:last-child)");
  
  //var totalKjopspris = 0;
  markedsverdiArray.each(function(i){
    profit = accounting.unformat(profitKolonne.get(i).textContent);
    kjopspris = accounting.unformat(kjopsprisArray.get(i).textContent);
    calc = kjopspris - profit;
    calc = accounting.formatNumber(calc, 0, " ");
    $(this).text(calc);

  });
  
  var winLossClass = "kursMinus";
  
  // add total buy sum
  var avkastning = $("#aktier tbody tr.resultLine td:last-child").text();
  //alert("avkastning = " + avkastning);
  avkastning = accounting.unformat(avkastning);
   
  
  
  
  // find market value
  var markedsverdi = $("#aktier tbody tr.resultLine td:nth-child(2)").text();
  //alert("markedsverdi = " + markedsverdi);
  markedsverdi = accounting.unformat(markedsverdi);
  
  var totalKjopspris = markedsverdi - avkastning;
  var tmp = accounting.formatNumber(totalKjopspris, 0, " ");

  $("#aktier tbody tr.resultLine td:nth-child(1)").attr("colspan", "7").after("<td>"+ tmp +"</td>");
  
//  alert("totalKjopspris: " + totalKjopspris + ", markedsverdi: " + markedsverdi);
  
  // add total win/loss percent  
  var kalkulertProsent = ((markedsverdi-totalKjopspris)*100)/totalKjopspris;
  //var kalkulertProsent = ((markedsverdi*100)/totalKjopspris)-100;
  
  //alert("((" + markedsverdi+ " * 100)/"  +totalKjopspris+")-100");
  
  if(kalkulertProsent > 0) {
    winLossClass = "kursPlus";
  }
  
  //alert("kalkulert prosent: " + kalkulertProsent);
  
  kalkulertProsent = accounting.formatNumber(kalkulertProsent, 2, ",");

  //alert("kalkulert prosent: " + kalkulertProsent);
  $("#aktier tbody tr.resultLine td:nth-child(4)").text(kalkulertProsent).addClass(winLossClass);
  $("#aktier tbody tr.resultLine td:nth-child(3)").addClass(winLossClass);
}
