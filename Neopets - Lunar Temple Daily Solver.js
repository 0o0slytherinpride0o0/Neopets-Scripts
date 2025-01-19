// ==UserScript==
// @author       0o0slytherinpride0o0
// @name         Neopets - Lunar Temple Daily Solver
// @description  Highlights the correct answer for the Lunar Temple Daily
// @match        *://www.neopets.com/shenkuu/lunar/?show=puzzle
// ==/UserScript==

var angle = parseInt(document.body.innerHTML.match(/angleKreludor=([0-9]*)&/)[1]);

// the solution according to JN is just dividing by 16 and rounding
angle_solution = Math.round(angle/22.5);

// but JS rounds weirdly, it rounds 0.5 DOWN instead of up, so we have to fix that
// at least, I think... I'm too lazy to check if this is really needed
// I don't think it is but it's easy enough to account for
if ((angle/22.5) % 1 == 0.5) {
  angle_solution = angle_solution + 1;
}

// now we have to change this around because the images are named 0-15 from the top left to the bottom right
// but the solution numbers are 0-15 from the bottom left to the top right
// so the new moon (all black) is the image 0.gif but 8 is the solution number
if (angle_solution == 16 | angle_solution < 8) {
  angle_solution = (angle_solution + 8) % 16;
} else {
  angle_solution = angle_solution - 8;
}

var solution_image = document.querySelector('[src="https://images.neopets.com/shenkuu/lunar/phases/' + CSS.escape(angle_solution) + '.gif"]');

solution_image.setAttribute("style", "border: 2px solid blue");
