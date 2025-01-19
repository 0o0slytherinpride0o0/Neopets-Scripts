// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Bank Easy Depositing & Withdrawing
// @description    Automatically fills in a set amount to withdraw when you click on the "Withdraw" header
//                 Automatically fills the current number of neopoints on hand to deposit if you click on the "Deposit" header
//                 Click again to clear
// @include        *://www.neopets.com/bank.phtml
// ==/UserScript==

// function to fill in a value or clear it if it's not empty
function fillorclear(object, n) {
  if (object.value == "") {
    object.value = n;
  } else {
    object.value = "";
  }
}

// for the super rich who withdraw their max interest every day
// feel free to change
var withdraw_amount = 735188;

// checking to see if the boon is active
// only if you care, feel free to comment out
var boon_check = document.querySelector('[style="color: red; text-decoration: line-through;"]');

if (boon_check != null) {
  withdraw_amount = 911559;
}

var withdraw_textbox = document.querySelectorAll('[type="text"][name="amount"][size="10"][maxlength="10"]')[1];
var withdraw_header = document.querySelector('[class="bank-withdraw-header bank-backing-header bank-backing-t4"]');

withdraw_header.addEventListener("click", function () { fillorclear(withdraw_textbox, withdraw_amount) });

var deposit_textbox = document.querySelectorAll('[type="text"][name="amount"][size="10"][maxlength="10"]')[0];
var deposit_amount = parseInt(document.querySelector('[id="npanchor"][class="np-text__2020"]').innerText.replace(/,/g, ''));
var deposit_header = document.querySelector('[class="bank-deposit-header bank-backing-header bank-backing-t4"]');

deposit_header.addEventListener("click", function () { fillorclear(deposit_textbox, deposit_amount) });
