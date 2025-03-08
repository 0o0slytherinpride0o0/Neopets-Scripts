// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Lab Ray - Adds Pet Names 
// @description    Adds pet names to the Lab Ray selection page
// @include        *://www.neopets.com/lab2.phtml
// ==/UserScript==

addEventListener("DOMContentLoaded", () => {
  var pet_buttons = document.querySelector(".bx-viewport").querySelectorAll("input[type='radio'][name='chosen']");

  for (pet of pet_buttons) {
    var name = document.createElement("b");
    name.style.color = "darkblue";
    name.innerText = pet.value;
    name.style.display = "block";
    name.style.paddingTop = "12px";

    pet.previousElementSibling.previousElementSibling.after(name);
  }
});