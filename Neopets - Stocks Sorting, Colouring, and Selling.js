// ==UserScript==
// @author         0o0slytherinpride0o0 
//                 with code copied from smthngsaid's original stock sorting script
// @name           Neopets - Stocks Sorting, Colouring, and Selling
// @description    Sorts your portfolio by price (highest to lowest).
//                 Adds a secondary ordering of how many you own (least to most).
//                 Moves stocks near 15 to the top of the page (customizable!).
//                 Colour-codes stocks.
//                 Populates the "Sell" text boxes with the number of shares you own with just a click.
//                 You can either click the "Shares (click to sell)" header to auto-populate EVERY row
//                 or click on the rows individually. 
//                 Clicking again will clear it (again either EVERY row or individually).
// @include        *://www.neopets.com/stockmarket.phtml?type=portfolio
// ==/UserScript==

// I copied this from smthngsaid's original script. I would not have known how to do it otherwise!
var table = document.querySelector('[cellpadding="3"][cellspacing="0"][border="1"][align="center"]').children[0];

var currentStock;
var sellCurrentStock;

// I added this because I use this a lot. Note that the first two rows of table are the headers for the table
// the last row is the summary row at the bottom, which cancels out the fact that the indices go from 0 to len - 1
// then hidden sell row, which is why you use - 3 here
// this is also why you start at index 2
// the reason you add + 2 to go through the rows is because the sell rows still count, they are just currently hidden
// it took me a while to figure this out, so I'm adding this is case it's helpful to anyone else
var last_stock_row = table.children.length - 3

for (let i = 4; i <= last_stock_row; i = i + 2) {
  for (let j = 2; j < i; j = j + 2) {
    if (parseInt(table.children[i].children[3].innerText) > parseInt(table.children[j].children[3].innerText)) {
      currentStock = table.children[i];
      sellCurrentStock = table.children[i + 1]; // this captures the hidden sell row that you click on the triangle to reveal
      sellCurrentStock.remove(); // these two removes the rows from the table
      currentStock.remove();
      table.insertBefore(sellCurrentStock, table.children[j]); // these two adds them back
      table.insertBefore(currentStock, sellCurrentStock);
      break;
    }
  }
}

// I added this, copied from the above
// this adds a secondary ordering of how many you own, from least to most
// (so only for stocks with the same price)
for (let i = 4; i <= last_stock_row; i = i + 2) {
  for (let j = 2; j < i; j = j + 2) {
    if (parseInt(table.children[i].children[3].innerText) == parseInt(table.children[j].children[3].innerText)) {
      if (parseInt(table.children[i].children[5].innerText) < parseInt(table.children[j].children[5].innerText)) {
        currentStock = table.children[i];
        sellCurrentStock = table.children[i + 1];
        sellCurrentStock.remove();
        currentStock.remove();
        table.insertBefore(sellCurrentStock, table.children[j]);
        table.insertBefore(currentStock, sellCurrentStock);
        break;
      } 
    }
  }
}

// this is because I want to move stocks near 15 to the top of the table
// stores the indices for the first and last stocks that are 15
var index_15_start = -1;
var index_15_end = -1;

// if you own any stocks at 15
var any_15 = 0;

// this changes the colour of the rows
// stocks >= 60 gold, stocks == 15 green
// and captures indices for moving stocks near 15 to the top
for (let k = 2; k <= last_stock_row; k = k + 2) {
  
  // colours stocks 60+ gold
  if (parseInt(table.children[k].children[3].innerText) >= 60) {
    table.children[k].setAttribute("bgcolor", "#FFE699"); 
    
    // colours stocks 15 green
  } else if (parseInt(table.children[k].children[3].innerText) == 15) {
    table.children[k].setAttribute("bgcolor", "#E5FFE5"); 
    
    // this captures the first row with a stock that costs 15
    if (index_15_start == -1) {
      index_15_start = k; 
      any_15 = 1;
    }
    
  } else if (parseInt(table.children[k].children[3].innerText) < 15) {
    
    // if you don't own any stocks that cost 15, this goes back up one row to the first stock that's above 15
    // or the current row if all your stocks are below 15 (i.e., 2 - the first row)
    if (index_15_start == -1) {
      if (k > 2) {
        index_15_start = k - 2;
      } else {
        index_15_start = k;
      }
    }
    
    // this captures the last row with a stock that costs 15 (or the first stock below 15 if you don't own any at 15)
    if (index_15_end == -1) {
      if (any_15 == 1) {
        index_15_end = k - 2;
      } else {
        index_15_end = k;
      }
      
    }
  }
}

// this is in case you ONLY have any stocks above 15
if (index_15_start == -1) {
  index_15_start = 2;
}

// this is in case you don't have any stocks below 15
if (index_15_end == -1) {
  index_15_end = last_stock_row;
}

// now we're going to capture stocks around 15 and move them up to the top of the table
// if you only want stocks at 15 to be at the top, that's easy enough to change
// I just like keeping an eye on stocks that are close, in case I have time to check throughout the day
// So, I opted to gather at least 3 stocks that are above 15 and at least 3 stocks that are below 15
// I chose to do this over simply moving stocks that are, say, 13-17 because it gives you more information
// But it's simple enough to change if you want: just set price_top and price_bottom to the prices you want
// e.g., var price_top = 17; below and comment out the indicated sections ***
var price_top;
var price_bottom;

var price_top_index = -1;
var price_bottom_index = -1;

// I don't just want to capture 3 stocks above and below though
// I want to include any number of stocks at the same price
// This way if you have 5 stocks are 16, then all of them are moved
// I set this number as a variable, so if you want to change it, change the following variable:
var num_keep = 3;

// I guess I can put in a limit, too
// So, if you want to keep 3 but no more than 6
// Then, if you have 7 stocks at 16, none of them are moved
var num_keep_limit = 6;

// this adjusts the number to be kept if no stocks at are 15
// e.g., if you have 17 16 16 14 14 13 and want to keep 2, this will keep 16 16 14 14
// otherwise it would keep all of them
if (any_15 == 0) {
  num_keep = num_keep -1;
}

// this captures the price for the stock that's num_keep above the first 15
// *** comment these out by removing the two // in the row below
// /* 
if (index_15_start > num_keep*2) {
  price_top = parseInt(table.children[index_15_start - num_keep*2].children[3].innerText);
} else {
  price_top = parseInt(table.children[2].children[3].innerText);
}

// this captures the price for the stock that's num_keep below the last 15
if (index_15_end < (last_stock_row - num_keep*2)) {
  price_bottom = parseInt(table.children[index_15_end + num_keep*2].children[3].innerText);
} else {
  price_bottom = parseInt(table.children[last_stock_row].children[3].innerText);
}
// */ 
// *** comment these out by removing the two // in the row above

// this captures the index for the first stock that costs price_top
// (<= instead of == to handle the case where none of your stocks are at the price you set
// if you define price_bottom yourself)
for (let k = 2; k <= last_stock_row; k = k + 2) {
  if (parseInt(table.children[k].children[3].innerText) <= price_top) {
    price_top_index = k;
    if ((index_15_start - price_top_index) > num_keep_limit*2) {
      for (let j = k + 2; j <= last_stock_row; j = j + 2) {
        if (parseInt(table.children[j].children[3].innerText) < price_top) {
          price_top = parseInt(table.children[j].children[3].innerText);
          price_top_index = j;
          break;
        }
      }
    }
    break;
  }
}

// this captures the index for the last stock that costs price_bottom
// (>= instead of == to handle the case where none of your stocks are at the price you set
// if you define price_top yourself)
for (let k = last_stock_row; k > 1 ; k = k - 2) {
  if (parseInt(table.children[k].children[3].innerText) >= price_bottom) {
    price_bottom_index = k;
    if ((price_bottom_index - index_15_end) > num_keep_limit*2) {
      for (let j = k - 2; j > 1; j = j - 2) {
        if (parseInt(table.children[j].children[3].innerText) > price_bottom) {
          price_bottom = parseInt(table.children[j].children[3].innerText);
          price_bottom_index = j;
          break;
        }
      }
    }
    break;
  }
}

// I wanted the stocks to be from lowest to highest cost for the ones at the top
// but you can easily change this if you want
// just remove the indicated lines
var i_top = 2;
for (let p = price_bottom; p <= price_top; p++) { //remove
  for (let k = price_top_index; k <= price_bottom_index; k = k + 2) {
    if (parseInt(table.children[k].children[3].innerText) == p) { //remove
      currentStock = table.children[k];
      sellCurrentStock = table.children[k + 1];
      sellCurrentStock.remove();
      currentStock.remove();
      table.insertBefore(sellCurrentStock, table.children[i_top]);
      table.insertBefore(currentStock, sellCurrentStock);
      i_top = i_top + 2
    } //remove
  }
} //remove

// reordering it doesn't change the colours, so the original by smthngsaid fixed this
// I changed this so 16-59 are blue and < 15 are pink (with a similar alternating colour scheme)
// you can remove the blue/pink distinction if you think it's too busy
for (let k = 2; k <= last_stock_row; k = k + 2) {
  if (parseInt(table.children[k].children[3].innerText) < 60 && parseInt(table.children[k].children[3].innerText) > 15) {
    if (k % 4 != 0) {
      table.children[k].setAttribute("bgcolor", "#EEEEFF"); //blue
    } else {
      table.children[k].setAttribute("bgcolor", "#FAFAFF"); //lighter blue
    }
  } else if (parseInt(table.children[k].children[3].innerText) < 15) {
    if (k % 4 != 0) {
      table.children[k].setAttribute("bgcolor", "#FFE9FF"); //pink 
    } else {
      table.children[k].setAttribute("bgcolor", "#FFF5FF"); //lighter pink
    }
  }
}

// this function lets you click on the first cell in each row to auto-populate the corresponding 
// text box with the number of shares you own (and click again to clear)
// adapted from smthngsaid's original code
function sellRow(stock, row) {
  // Current price is only considered a column of the first row, that's why it changes from 6 to 5
  // and we have to do the cases separately
  var index = 5;
  if (row == 1) {
    index = 6;
  }
  
  if (table.children[stock].children[0].children[0].children[0].children[row].children[index].children[0].value == "") {
    table.children[stock].children[0].children[0].children[0].children[row].children[index].children[0].value = 
      table.children[stock].children[0].children[0].children[0].children[row].children[0].innerText.replace(/,/g, '');
  } else {
    table.children[stock].children[0].children[0].children[0].children[row].children[index].children[0].value = "";
  }
}

// this adds an "undo" button to the code that smthngsaid wrote
// basically if you click it again, it'll clear all the text boxes
var sellAllCalled = 0;

function sellAll(stock) {
  // Current price is only considered a column of the first row, that's why it changes from 6 to 5
  // and we have to do the cases separately
  if (sellAllCalled == 0) {
    table.children[stock].children[0].children[0].children[0].children[1].children[6].children[0].value = 
      table.children[stock].children[0].children[0].children[0].children[1].children[0].innerText.replace(/,/g, '');
    
    for (let t = 2; t < table.children[stock].children[0].children[0].children[0].children.length; t++) {
      table.children[stock].children[0].children[0].children[0].children[t].children[5].children[0].value = 
        table.children[stock].children[0].children[0].children[0].children[t].children[0].innerText.replace(/,/g, '');
    }
    sellAllCalled = 1;
    
  } else {
    table.children[stock].children[0].children[0].children[0].children[1].children[6].children[0].value = "";
    
    for (let t = 2; t < table.children[stock].children[0].children[0].children[0].children.length; t++) {
      table.children[stock].children[0].children[0].children[0].children[t].children[5].children[0].value = "";
    }
    sellAllCalled = 0;
  }
}

// adapted from smthngsaid's code
// this adds the sellAll function to the "Shares (click to sell)" header
// and the sellRow function to the number of stocks owned for each row
for (let s = 3; s <= last_stock_row; s = s + 2) {
  table.children[s].children[0].children[0].children[0].children[0].children[0].addEventListener("click", function () { sellAll(s) });
  for (let t = 1; t < table.children[s].children[0].children[0].children[0].children.length; t++) {
    table.children[s].children[0].children[0].children[0].children[t].children[0].addEventListener("click", function () { sellRow(s, t) });
  }
  // this changes the header to "Shares (click to sell)" from "Shares", just as a reminder
  table.children[s].children[0].children[0].children[0].children[0].children[0].children[0].innerText = 'Shares (click to sell)';
}
