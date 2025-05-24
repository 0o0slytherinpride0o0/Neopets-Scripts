// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Marrow: Easy Guessing
// @version        2.0
// @description    Fills the textbox with a preset number (or a random number) when you click the button
// @include        *://www.neopets.com/medieval/guessmarrow.phtml
// ==/UserScript==

// set the below variable to whatever you want
// guess must be between 200 and 800
// it's unclear if this is inclusive or not
// although it *probably* is

var guess = 200;
var random = false;

// if you want to use a random number, uncomment the following lines:
// guess = null;
// random = true;

// one of these two lines *must* be uncommented if you want a random number
// for a random number from 200 to 800 (inclusive), uncomment the following line:
// var inclusive = true;

// for a random number from 201 to 799 instead, uncomment the following line:
// var inclusive = false;

// function to fill in a value or clear it if it's not empty
function fillorclear(object, n) {
  (object.value == "" || object.value == "0") ? object.value = n : object.value = "";
}

var guess_textbox = document.querySelector('input[type="text"][name="guess"][size="5"][maxlength="5"]');

if (guess_textbox != null) {
  // create the button
  var guess_button = document.createElement("div");
  guess_button.style = "display:inline-block; border:1px solid black; padding:2px 5px; background-color:#DBF1FF; cursor:pointer; margin-top:6px;";
  guess_button.innerText = guess == null ? "Random number" : "Preset: " + guess;
  
  // add the button to the page
  guess_textbox.parentElement.after(guess_button);
	
  // make the button work
  guess_button.addEventListener("click", function() {
    var guess_inner = guess != null ? guess : 
                                      (inclusive ? Math.floor(Math.random() * (801 - 200)) + 200 : 
                                       				Math.floor(Math.random() * (800 - 201)) + 201);
    fillorclear(guess_textbox, guess_inner) 
  });
}
