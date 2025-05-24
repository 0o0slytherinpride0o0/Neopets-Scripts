// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Wishing Well
// @version        2.0
// @description    Fills your item wish & donation amount in the textbox when you click on the corresponding buttons
// @include        *://www.neopets.com/wishing.phtml*
// ==/UserScript==

//////////////////////////////////
// Set the two variables below!!

// set this to whatever amount you want, as long as it's over 21 (that's the minimum)
var donation = 21;

// set this to the item you want to wish for
// https://items.jellyneo.net/search/wishing-well-prizes/?sort=5&sort_dir=desc
// ^ list of eligible items, sorted by price!
var wish = "Snowager Stamp";
//////////////////////////////////


// function to fill in a value or clear it if it's not empty
function fillorclear(object, n) {
  object.value == "" ? object.value = n : object.value = "";
}

var wish_table =  document.querySelector('form[action="process_wishing.phtml"] table');
var donation_textbox = wish_table.querySelector('input[name="donation"]');
var wish_textbox = wish_table.querySelector('input[name="wish"]');

// make the buttons
var donation_button = document.createElement("div");
donation_button.style = "display:inline-block; border:1px solid black; padding:2px 8px; background-color:#DBF1FF; cursor:pointer; margin:auto;";
donation_button.innerText = donation + " NP";

var wish_button = donation_button.cloneNode();
wish_button.innerText = wish;

// add a row to the table
var tr = document.createElement("tr");
wish_table.children[0].insertBefore(tr, wish_table.children[0].lastElementChild);

// make the cells for the row
var td_donation = donation_textbox.parentElement.cloneNode();
td_donation.style.textAlign = "center";
td_donation.style.paddingTop = "12px";
tr.appendChild(td_donation);
td_donation.appendChild(donation_button);
// add text below
var span_np = document.createElement("span");
span_np.style.display = "block";
span_np.innerText = "(NP Preset)";
td_donation.appendChild(span_np);

var td_wish = td_donation.cloneNode();
tr.appendChild(td_wish);
td_wish.appendChild(wish_button);
var span_wish = span_np.cloneNode();
span_wish.innerText = "(Wish Preset)";
td_wish.appendChild(span_wish);

donation_button.addEventListener("click", function () { fillorclear(donation_textbox, donation) });
wish_button.addEventListener("click", function () { fillorclear(wish_textbox, wish) });

