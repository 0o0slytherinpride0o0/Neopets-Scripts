// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Wishing Well
// @description    Fills your item wish in the textbox when you click on the "What item do you wish for?" cell
//                 Fills set neopoint amount in the textbox when you click on the "Amount of Donation" cell
// @include        *://www.neopets.com/wishing.phtml*
// ==/UserScript==

// function to fill in a value or clear it if it's not empty
function fillorclear(object, n) {
  if (object.value == "") {
    object.value = n;
  } else {
    object.value = "";
  }
}

// 21 is the minimum amount of neopoints for the wish to count
var donation = 21;
var wish = "Your Wish";

var amount_textbox = document.querySelector('[type="text"][size="5"][maxlength="5"][name="donation"]');
var wish_textbox = document.querySelector('[type="text"][size="20"][maxlength="40"][name="wish"]');
var wish_table =  document.querySelector('[cellpadding="3"][cellspacing="0"][align="center"][border="0"]');

wish_table.children[0].children[0].children[0].addEventListener("click", function () { fillorclear(amount_textbox, donation) });
wish_table.children[0].children[2].children[0].addEventListener("click", function () { fillorclear(wish_textbox, wish) });
