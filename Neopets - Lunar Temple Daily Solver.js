// ==UserScript==
// @author       0o0slytherinpride0o0
// @name         Neopets - Lunar Temple Daily Solver
// @description  Highlights the correct answer for the Lunar Temple Daily
// @match        *://www.neopets.com/shenkuu/lunar/?show=puzzle
// ==/UserScript==

var angle_match = document.body.innerHTML.match(/angleKreludor=([0-9]*)&/);

if (angle_match != null) {
  
  var angle = Number(angle_match[1]);
  
  // the solution according to JN is just dividing by 22.5 and rounding
  // plus 0 and 16 have the same solution
  var angle_solution = Math.round(angle/22.5) % 16;

  // the image names don't match the solution number though:
  // the image numbers are 0-15 from the top left to the bottom right
  // the solution numbers are 0-15 from the bottom left to the top right
  // so the new moon (all black) is the image 0.gif but 8 is the solution number
  const image_number_arr = Array(8).fill(1).map((x, index) => index + 8).concat(Array(8).fill(1).map((x, index) => index));
  var image_number = image_number_arr[angle_solution];

  var solution_image = document.querySelector('img[src="https://images.neopets.com/shenkuu/lunar/phases/' + image_number + '.gif"]');

  solution_image.setAttribute("style", "border: 3px solid red");
}
