// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Petpet Lab Ray
// @description    Adds your Pet's names above the petpet, so you know which petpet to zap (or not)!
// @include        *://www.neopets.com/petpetlab.phtml*
// ==/UserScript==

var table = document.querySelector("table[cellpadding='6'][cellspacing='4'][border='0']");

if (table != null) {
  var len = table.children[0].children[0].children.length;
  var tr = document.createElement("tr");
  tr.style.textAlign = "center";
  tr.style.fontWeight = "bold";
  tr.style.color = "darkblue";
  
  for (var i=0; i<len; i++) {
    var td = document.createElement("td");
    td.innerText = table.children[0].children[0].children[i].querySelector("input").value;
    td.style.border = "1px solid #000";
    tr.appendChild(td);
  }
  table.children[0].insertBefore(tr, table.children[0].children[0]);
}