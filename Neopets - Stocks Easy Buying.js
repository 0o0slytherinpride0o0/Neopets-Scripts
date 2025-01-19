// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Stocks Easy Buying
// @description    Puts 1000 in the textbox when you click on the cell that says "Number of Shares"
//                 Click again to clear
// @include        *://www.neopets.com/stockmarket.phtml?type=buy&ticker=*
// ==/UserScript==

// function to fill in a value or clear it if it's not empty
function fillorclear(object, n) {
  if (object.value == "") {
    object.value = n;
  } else {
    object.value = "";
  }
}
   
var stock_table = document.querySelector('[align="center"][cellpadding="3"][cellspacing="0"][border="0"]');
stock_amount_textbox = document.querySelector('[type="text"][name="amount_shares"][size="5"][maxlength="5"]');   

stock_table.children[1].children[1].children[0].addEventListener("click", function () { fillorclear(stock_amount_textbox, 1000) });

// change it to stock_table.children[1] if you want it to be the entire table 
// or stock_table.children[1].children[1].children[1].children[0] if you want it to be the textbox itself
// I just prefer having it exclude the textbox, so I opt for the <td> cell before the textbox