// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Quickstock: Unselect the first N items 
// @description    Adds a button to unselect the first N items, so they stay in your inventory
//                 Note that this assumes you've selected one of the "Check All" buttons first.
//                 I do this because I keep a few Pant Devil Attractors, a toy, and a grooming item
//                 in my inventory at all times and this way I don't have to unclick them all 
//                 manually when using Quick Stock!
// @include        *://www.neopets.com/quickstock.phtml*
// ==/UserScript==

// set the number of items you want to keep
var num = 7;

const type_arr = ["stock","deposit","donate","discard","gallery","closet","storage_shed"];

var form = document.querySelector('form[name="quickstock"]');

var container = document.createElement("div");
container.style.textAlign = "center";
var my_button = document.createElement("div");
my_button.innerText = "Unselect first " + num + " items";
my_button.style.border = "1px solid #000000";
my_button.style.display = "inline-block";
my_button.style.padding = "3px 5px 3px 5px";
my_button.style.cursor = "pointer";
my_button.style.backgroundColor = "DBF1FF";

my_button.addEventListener("click", function() {
  
  // this figures out which of the "Check All" buttons you clicked
  // originally I just had it for depositing - you can easily skip this if you want
  // just comment these out and replace type_arr[index] below with the type you want e.g., "deposit"
  var checkall_radios = document.querySelectorAll('input[type="radio"][name="checkall"]');
  var checkall_checked = document.querySelector('input[type="radio"][name="checkall"]:checked');
  var index = Array.from(checkall_radios).indexOf(checkall_checked);
  
  for (let i = 1; i <= num; i++) {
    var radio_i = document.querySelector('input[type="radio"][name="radio_arr['+i+']"][value='+type_arr[index]+']');
    // this is so you don't get an error if the option isn't available for that item
    if (radio_i != null) {
      radio_i.checked = false;
    }
  }
  // this unselects the "Check All" button
  document.querySelectorAll('input[type="radio"][name="checkall"]')[index].checked = false;
});

form.nextElementSibling.after(container);
container.appendChild(my_button);
