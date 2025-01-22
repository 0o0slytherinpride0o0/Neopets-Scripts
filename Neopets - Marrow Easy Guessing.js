// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Marrow: Easy Guessing
// @description    Fills the textbox with a set number (or a random number) when you click in it
//                 Click again to clear
// @include        *://www.neopets.com/medieval/guessmarrow.phtml
// ==/UserScript==

// function to fill in a value or clear it if it's not empty
function fillorclear(object) {
   // guess must be between 200 and 800
   // it's unclear if this is inclusive or not
   // although it *probably* is
   
   // set the below variable to whatever you want
   var guess = 201;
   
   // or if you want to use a random number, use this instead:
   // var guess = Math.floor(Math.random() * 601) + 200;
  
   // for a random number from 201 to 799 instead:
   // var guess = Math.floor(Math.random() * 599) + 201;
   
  if (object.value == "") {
    object.value = guess;
  } else {
    object.value = "";
  }
}

if (document.body.innerHTML.match(/Please enter your value as an integer/)) {
   var guess_textbox = document.querySelector('[type="text"][name="guess"][size="5"][maxlength="5"]');
   
   // Textbox has a 0 in it, so this clears it
   guess_textbox.value = "";
   
   // just using the textbox directly becacuse there's no better place to click
   guess_textbox.addEventListener("click", function () { fillorclear(guess_textbox) });
}