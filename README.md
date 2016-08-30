# MonkeyScripts

Scripts to manipulate/tamper webpages @ Nordnet as you see fit. The scripts must be used with [Greasemonkey](http://www.greasespot.net/) or [Tampermonkey](https://tampermonkey.net/) inside your browser (IE not supported).

The scripts here only work with http://www.nordnet.no (or se, dk or fi)

## Install
Tampermonkey is what the developer preferes for different reasons so this is what will be recommended. 
We will install Tampermonkey in Chrome, Firefox, Opera or Safari as an addon. You know your own browser.
* Go to [](https://tampermonkey.net/) and click the download button and follow the instructions
* Go to the script you want to install and copy content to clipboard. I.e [https://raw.githubusercontent.com/Avec112/MonkeyScripts/master/stock_returns.js](https://raw.githubusercontent.com/Avec112/MonkeyScripts/master/stock_returns.js) (Alt+a, Alt+c on Mac, CTRL+A, CTRL+C on Windows)
* After install click the Tampermonkey icon in your browser and click on the dashboard
* Look for the green plus and click it to add a new script
* Mark all content of the default script with the mouse or Alt+A or CTRL+A, then paste from clipboard with Alt+V or CTRL+V)
* Click save
* The script should now work when you visit the page where the script is supposed to function

## Portfolio script
Information will come later.

## Stock returns
Script to better display rock solid companies and the not so solid ones. 
![](https://raw.githubusercontent.com/Avec112/MonkeyScripts/master/stock_returns.png)

### Where it works
`https://www.nordnet.no/mux/web/marknaden/kurslista/aktier.html*subtyp=historic_return*`

Go to nordnet -> Aksjer -> Aksjekurser -> Avkastning (sorry only know the Norwegian site)

### How it works (colors and icons)

#### Colors
* Green is good as the returns is as required (configurable).
* Yellow means the required returns for the forth and fifth year is not as good as expected. It could be the fourth or fifth year or maybe both. Yellow is better than red.
* Red cell with a positive value means the expected returns for the current period is less than required. 
* Red cell with a negative value is not good and the user must be very cautious considering the company.  
* The green and pink colors can be configured. 

#### Icons
* Green icon (ok) is considered to be a safe choice since the company meets the required returns in all periods. Solid economy.
* Yellow icon (warn) is not meeting all the required returns in all periods. Choose these companies with care.  
* Red icon (fail) has negative returns in one or more periods. Not recommended or at lease choose with great care.  

#### Configurable parameteres
* firstCell = The first cell to meet the required returns
* cellCount = Choose how many cells you will display (match). I.e. firstCell is 5 and countCell is 6. Then you will use cells 5 to 10
* positiveColor = The color to display when requirement is meet. Green by default.
* negativeColor = The color to display when the requirement is NOT met. Pink by default.
* requiredPositiveIncreaseFactor = The required returns expected for each period. 0.1 equals 10%. 0.3 (30%) by default.
