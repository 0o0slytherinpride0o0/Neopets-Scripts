// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Customisation Spotlight: Image Enlarger
// @description    Makes Customisation Spotlight Images bigger for improved voting experience
// @include        *://www.neopets.com/spotlights/custompet/custom_spotlight_votes.phtml
// ==/UserScript==

// Note that this code assumes there are 2+ images on the page with the properties: 
// width="150", height="150", border="0", style=""
// Right now this is true, as the first image is your active pet's image at the side
// This may have to be changed when the page is converted

var pet_images = document.querySelectorAll('[width="150"][height="150"][border="0"][style=""]');

if (pet_images.length == 2) {
	pet_images[1].src = pet_images[1].src.replace(/2.png/,"7.png")
	pet_images[1].width = 500;
	pet_images[1].height = 500;
}