// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Petpet Lab Ray
// @description    Adds your Pet's names above the petpet, so you know which petpet to zap (or not)!
// @include        *://www.neopets.com/petpetlab.phtml*
// ==/UserScript==

var div = document.querySelector("form[action='process_petpetlab.phtml']").children[0];

if (div != null) {
  var len = div.children.length;
  var span = document.createElement("span");
  span.style.display = "block";
  span.style.marginBottom = "8px";
  span.style.padding = "3px 0px 3px 0px";
  span.style.backgroundColor = "darkblue";
  span.style.color = "white";
  span.style.font = "bold small-caps 10pt verdana";
  
  for (var i=0; i<len; i++) {
    var pet_name = span.cloneNode();
    pet_name.innerText = table.children[i].querySelector("input").value;
    table.children[i].insertBefore(pet_name, table.children[i].children[0]);
  }
}
