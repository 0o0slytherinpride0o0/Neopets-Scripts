// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           JN iDB - Add DTI link to wearables
// @version        2.0
// @description    Adds DTI link to wearable items in JN's iDB, at the top of the "Find This Item" section
// @include        *items.jellyneo.net/item/*
// ==/UserScript==

window.onload = function() {
  
  var find_list = document.querySelector("div.find-this-item.text-small ul");
  
  if (find_list.querySelector("img[alt='Find in your Closet']") != null) {
    
    var item_name = document.querySelector("h1").innerText;
    var item_name_url = encodeURIComponent(item_name).replaceAll("%20", "+");

    var li = find_list.children[0].cloneNode();
    var img_link = find_list.children[0].children[0].cloneNode();
    var img = find_list.children[0].children[0].children[0].cloneNode();
    var text_link = find_list.children[0].children[1].cloneNode();

    img_link.href = "https://impress.openneo.net/items?q=" + item_name_url;
    img.src = "https://images.neopets.com/items/clo_shoyru_dappermon.gif";
    img.alt = "Find on DTI";
    img.title = "Find on DTI";
    text_link.href = "https://impress.openneo.net/items?q=" + item_name_url;
    text_link.innerText = "Dress to Impress";

    img_link.appendChild(img);
    li.appendChild(img_link);
    li.appendChild(text_link);

    find_list.insertBefore(li, find_list.children[0]);
    
  }
}

