// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - TM Scratchcard Image Fix
// @description    Fixes the broken images
// @include        *://www.neopets.com/winter/kiosk2.phtml
// ==/UserScript==

var scratch1 = document.querySelectorAll('[src="https://images.neopets.com/winter/scratchcard/1.gif?v=1"]');
var scratch2 = document.querySelectorAll('[src="https://images.neopets.com/winter/scratchcard/2.gif?v=1"]');
var scratch3 = document.querySelectorAll('[src="https://images.neopets.com/winter/scratchcard/3.gif?v=1"]');

for (let i = 0; i <= scratch1.length - 1; i++) {
  scratch1[i].src="https://images.neopets.com/winter/scratchcard/1.gif";
}

for (let i = 0; i <= scratch2.length - 1; i++) {
  scratch2[i].src="https://images.neopets.com/winter/scratchcard/2.gif";
}

for (let i = 0; i <= scratch3.length - 1; i++) {
  scratch3[i].src="https://images.neopets.com/winter/scratchcard/3.gif";
}