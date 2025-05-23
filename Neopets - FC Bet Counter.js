// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - FC Bet Counter
// @description    Adds a simple count of FC bets in the table header
// @include        *://www.neopets.com/pirates/foodclub.phtml?type=current_bets*
// ==/UserScript==

var table = document.querySelector("table[border='0'][cellpadding='4'][cellspacing='2'][width='500'][bgcolor='black']");
var count = table.children[0].children.length - 3;
table.querySelector("tbody tr td font b").innerText += " --- Count: " + count + (count == 10 ? "\u2705" : "");
