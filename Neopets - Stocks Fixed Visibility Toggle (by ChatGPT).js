// ==UserScript==
// @name         Neopets - Stocks Fixed Visibility Toggle (by ChatGPT)
// @description  Fixes the toggle so you can minimize the sell rows
// @author       ChatGPT
// @match        *://www.neopets.com/stockmarket.phtml?type=portfolio
// ==/UserScript==

// My sister asked ChatGPT to fix the toggle on the stock page
// This is what it came up with and it seems to work!
(function() {
    'use strict';

    // Custom toggle function
    function customToggle(id) {
        const row = document.getElementById(id);
        const icon = document.getElementById(id + 'disclosure');

        if (row.style.display === 'none') {
            row.style.display = ''; // Show the row
            if (icon) icon.src = '//images.neopets.com/stockmarket/disclosure_open.gif';
        } else {
            row.style.display = 'none'; // Hide the row
            if (icon) icon.src = '//images.neopets.com/stockmarket/disclosure_closed.gif';
        }
    }

    // Attach custom toggle logic to each disclosure icon
    document.querySelectorAll('img[onclick^="disclose("]').forEach(img => {
        const match = img.getAttribute('onclick').match(/disclose\('(\d+)'\)/);
        if (match && match[1]) {
            const id = match[1];
            img.style.cursor = 'pointer';
            img.onclick = () => {
                customToggle(id);
            };
        }
    });
})();