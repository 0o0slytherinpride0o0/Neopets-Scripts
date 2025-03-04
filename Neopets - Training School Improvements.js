// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Training School Improvements
// @description    Tallies the codestones/dubloons needed for all enrolled courses
//                 Reorders pets on the Status Page for easier enrolling/finishing/paying
//                 Order:
//								 	 - Pets who are finished their course
//                 	 - Pets you are training (you have to define these pets below)
//                 	   who are NOT in a course (so they need to be enrolled!)
//								 	 - Pets whose course needs paying for
//								 	 - Pets who are enrolled
//                 Reorders the drop down on the Courses Page to have the pets you are training
//                 at the top, in the order you specify
//                 Adds buttons to go back to the Status & Courses Pages on the Process Page
// @include        *://www.neopets.com/pirates/academy.phtml?type=status
// @include        *://www.neopets.com/pirates/academy.phtml?type=courses
// @include        *://www.neopets.com/pirates/process_academy.phtml
// @include        *://www.neopets.com/island/training.phtml?type=status
// @include        *://www.neopets.com/island/training.phtml?type=courses
// @include        *://www.neopets.com/island/process_training.phtml
// @include        *://www.neopets.com/island/fight_training.phtml?type=status
// @include        *://www.neopets.com/island/fight_training.phtml?type=courses
// @include        *://www.neopets.com/island/process_fight_training.phtml
// ==/UserScript==

var current_url = document.URL;

var count_arr = [];
var payment_arr = [];
var total = 0;

var reordering = true;
var special_pets_arr = [];
var finished_offset = 0;
var special_pets_offset = 0;
var enrolling_offset = 0;
var enrolled_offset = 0;

var finished_text = "Course Finished!";
var payment_text = "Codestone";
var enrolled_text = "Time till course finishes";

if (current_url.includes("neopets.com/island/training.phtml")) {
  
 	// These are the full names of the pets you're currently training at the MI School 
  // Put them in the order you want them to appear
  special_pets_arr = ["petName1", "petName2", "petName3"];
  
  // this is SDB order, feel free to change it
  payment_arr = ["Mau Codestone", "Tai-Kai Codestone", "Lu Codestone",
               	 "Vo Codestone",	"Eo Codestone",  		 "Main Codestone",
               	 "Zei Codestone", "Orn Codestone", 		 "Har Codestone",
               	 "Bri Codestone"];
  count_arr = [0,0,0,0,0,0,0,0,0,0];
  
} else if (current_url.includes("neopets.com/pirates/academy.phtml")) {
  
  // These are the full names of the pets you're currently training at the Academy 
  // Put them in the order you want them to appear
  special_pets_arr = ["petName1", "petName2", "petName3"];
  
  payment_arr = ["One Dubloon Coin","Two Dubloon Coin","Five Dubloon Coin"];
  count_arr = [0,0,0];
  
  payment_text = "Dubloon";
  
} else if (current_url.includes("neopets.com/island/fight_training.phtml")) {
  
  // These are the full names of the pets you're currently training at the Ninja School
  // Put them in the order you want them to appear
  // Or comment it out like I have here, since I only have one pet at the Ninja School!
  // special_pets_arr = [];
  
  payment_arr = ["Mag Codestone","Vux Codestone","Cui Codestone",
               	 "Kew Codestone","Sho Codestone","Zed Codestone"];
  count_arr = [0,0,0,0,0,0];
  
}

if (special_pets_arr.length == 0) {
  reordering = false;
}

if (current_url.includes("type=status")) {

  var table = document.querySelector('[width="500"][align="center"][border="0"][cellpadding="3"][cellspacing="0"]');
  var num_pets = table.children[0].children.length;
  
  // this moves all the pets you're currently training to the top, in order
  if (reordering) {
    for (let i = special_pets_arr.length - 1; i >=0 ; i--) {
    	for (let j = 1; j < num_pets; j += 2) {
    	  // splitting by " (" in case your pet's name has a space
        var pet = table.children[0].children[(j-1)].innerText.split(" (")[0];
        if (pet == special_pets_arr[i]) {
          var pet_tr = table.children[0].children[(j-1)];
          var status_td = table.children[0].children[j];
          table.children[0].insertBefore(status_td, table.children[0].children[0]);
      		table.children[0].insertBefore(pet_tr, table.children[0].children[0]);
        }
  		}
  	}
  }
	
  // this goes through ALL your pets and moves pets whose courses are complete to the top
  // then the pets you are training who aren't in a course yet
  // (this is important, since when you're enrolling your pets, the pets you just enrolled
  //  won't move to the top, they'll be under the pets who still need to be enrolled)
  // then ALL pets who are enrolled in a course but that course isn't paid for yet
  // then ALL pets who are enrolled in a course but it isn't finished yet

  for (let i = 1; i < num_pets; i += 2) {
    var pet_tr = table.children[0].children[(i-1)];
    var status_td = table.children[0].children[i];
    
    var pet_name = pet_tr.innerText.split(" (")[0];
    var status_text = status_td.children[1].innerText;
		
    // these are the pets who are finished their course
    if (status_text.search(finished_text) > -1) {
      table.children[0].insertBefore(status_td, table.children[0].children[finished_offset]);
      table.children[0].insertBefore(pet_tr, table.children[0].children[finished_offset]);
      
      finished_offset += 2;
      special_pets_offset += 2;
      enrolling_offset += 2; 
      enrolled_offset += 2;
      
    // these are the pets you are training who are NOT in a course or finished their course
    // i.e., they need to be enrolled!
    } else if (status_text == "" && special_pets_arr.includes(pet_name)) {
      table.children[0].insertBefore(status_td, table.children[0].children[special_pets_offset]);
      table.children[0].insertBefore(pet_tr, table.children[0].children[special_pets_offset]);
      
      special_pets_offset += 2;
      enrolling_offset += 2; 
      enrolled_offset += 2;
		
    // these are the pets whose course needs paying for
    } else if (status_text.search(payment_text) > -1) {
      table.children[0].insertBefore(status_td, table.children[0].children[enrolling_offset]);
      table.children[0].insertBefore(pet_tr, table.children[0].children[enrolling_offset]);
      
      for (let j = 0; j < payment_arr.length; j++) {
        var regex = new RegExp(payment_arr[j], 'g');
        var num = (status_text.match(regex) || []).length;
        count_arr[j] += num;
        total += num;
      }

      enrolling_offset += 2;
      enrolled_offset += 2;
      
    // these are the pets who are currently enrolled in a course  
    } else if (status_text.search(enrolled_text) > -1) {      
      table.children[0].insertBefore(status_td, table.children[0].children[enrolled_offset]);
      table.children[0].insertBefore(pet_tr, table.children[0].children[enrolled_offset]);

      enrolled_offset += 2;
    }
    
  }

  if (total > 0) {
    tally_div = document.createElement("div");
    tally_div.style.color = "darkblue";
    tally_div.style.fontSize = "14pt";
    tally_div.style.display = "inline-block";
    tally_div.style.verticalAlign = "top";
    tally_div.style.width = "125px";
    tally_div.style.margin = "0px 10px 0px 15px";
    
    var header_span = document.createElement("span");
    header_span.style.display = "block";
    header_span.style.marginBottom = "15px";
    header_span.innerText = payment_text +"s:";
    tally_div.appendChild(header_span);
    
    for (let k = 0; k < payment_arr.length; k++) {
      var span = document.createElement("span");
      span.style.display = "block";
      span.innerText = count_arr[k] + " " + payment_arr[k].split(" ")[0];
      if (count_arr[k] == 0) {
        span.style.color = "lightgrey";
        span.style.textDecoration = "line-through";
      }
      tally_div.appendChild(span);
    }
    
    var total_span = document.createElement("span");
    total_span.style.display = "block";
    total_span.style.marginTop = "15px";
    total_span.innerText = total + " Total";
    tally_div.appendChild(total_span);
    
    // I found it's a little long for pets that need 7+ codestones, so I put it on the side instead
    // if you want it at the top, comment out the line below and 
    // this line above: tally_div.style.display = "inline-block";
    table.style.display = "inline-block";
    table.parentElement.insertBefore(tally_div, table);
    
  } else if (total == 0 && current_url.includes("neopets.com/island/fight_training.phtml")) {
    
    // this is so I know what to train for my battle pet 
    // (I only have one pet with stats high enough to train at the Ninja School and I'm ONLY training HP)
    // I'm too lazy to implement this for the other schools, but I figure if I include this,
    // those of you who really want this for the other schools will hopefully be able to figure it out
    
    var hp = parseInt(table.children[0].children[1].children[0].textContent.match(/Hp  : \d* \/ (\d*)/)[1]);
    var needed_level = Math.round(hp/3 * 100) / 100;
    var needed_level_floor = Math.floor(hp/3);
    var level = parseInt(table.children[0].children[1].children[0].textContent.match(/Lvl : (\d*)/)[1]);
    var diff = needed_level_floor - level;
    var stats = document.createElement("div");
    var equation = document.createElement("TextNode");
    var needed = document.createElement("TextNode");
    equation.style.color= "darkblue";

    equation.innerHTML = hp + " / 3 = " + needed_level + "<br>" ;
    needed.innerHTML = needed_level_floor + " - " + level + " = " + diff + "<p>";

    if (diff > 0) {
      needed.style.color= "red";
      needed.innerHTML += "<b>Train: Level</b><p>";
    } else if (diff <= 0) {
      needed.style.color= "darkblue";
      needed.innerHTML += "<b>Train: HP!!</b><p>";
    }

    stats.appendChild(equation);
    stats.appendChild(needed);
    table.insertBefore(stats, table.children[0]);
  }
 
} else if (current_url.includes("type=courses") && reordering) {
  
  var dropdown = document.querySelector('[name="pet_name"]');
  var first_pet;
  
  // this reorders the dropdown to have the pets you are training at the top
  // unfortunately, I don't know if there's an easy way to make it match the current 
  // order on the status page, so this will have to do!
  
  for (let x = special_pets_arr.length - 1; x >= 0; x--) {
    for (let y = 0; y < dropdown.children.length; y++) {
      if (dropdown.children[y].value == special_pets_arr[x]) {
        var pet = dropdown.children[y];
        if (x == 0) {
          first_pet = pet;
        }
        pet.remove();
        dropdown.insertBefore(pet, dropdown.children[0]);
        break;
      }
    }
  }
  
  first_pet.selected = true;
  
} else if (current_url.includes("process_")) {
  
  // this just adds back buttons to the process page
  // because I find it super annoying that it doesn't go back to a useful page
  // (and when it randomly decides not to let you use your browser's back button)
  
  var default_button = document.querySelector('form');
  var container = document.createElement("div");
  var my_button = document.createElement("a");
  var p = document.createElement("p");
  container.style.textAlign = "center";

  my_button.style.color = "#000000";
  my_button.style.fontSize = "14pt";
  my_button.style.border = "1px solid #000000";
  my_button.style.display = "inline-block";
  my_button.style.padding = "3px 5px 3px 5px";
  my_button.style.cursor = "pointer";
  my_button.style.backgroundColor = "DBF1FF";
  my_button.style.margin = "5px";
  my_button.style.textDecoration = "none";

  var my_button2 = my_button.cloneNode();

  my_button.innerText = "Back to Status Page";
  my_button.href = current_url.replace("process_", "") + "?type=status";
  my_button2.innerText = "Back to Course Page";
  my_button2.href = current_url.replace("process_", "") + "?type=courses";

  default_button.after(p);
  p.after(container);
  container.appendChild(my_button);
  container.appendChild(my_button2);
}
