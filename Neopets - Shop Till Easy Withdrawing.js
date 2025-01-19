// ==UserScript==
// @author         0o0slytherinpride0o0
//                 With one line taken from diceroll123's script
// @name           Neopets - Shop Till Easy Withdrawing
// @description    Fills the textbox with the amount in your shop till when you click on the cell that says "Amount in NP"
//                 Click again to clear
// @include        *://www.neopets.com/market.phtml?type=till
// ==/UserScript==

// function to fill in a value or clear it if it's not empty
function fillorclear(object, n) {
  if (object.value == "") {
    object.value = n;
  } else {
    object.value = "";
  }
}

var till_table = document.querySelector('[align="center"][cellpadding="3"][cellspacing="0"][border="0"]');
var till_textbox = document.querySelector('[type="text"][name="amount"][size="10"][maxlength="10"]');

// took this from diceroll123's script
var till_amount = document.body.innerHTML.match(/You currently have <b>([0-9,\,]*) NP<\/b> in your till./)[1].replace(/,/g, '');

till_table.children[1].children[0].children[0].addEventListener("click", function () { fillorclear(till_textbox, till_amount) });
