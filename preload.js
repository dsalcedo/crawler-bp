 /**
* Specifies a script that will be loaded before other scripts run in the page.
* This script will always have access to node APIs no matter whether node
* integration is turned on or off. The value should be the absolute file path to
* the script. When node integration is turned off, the preload script can
* reintroduce Node global symbols back to the global scope. See example .
*/

var shell = require('electron').shell;
let loaded = false;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function crawl() {
	let links = document.getElementsByTagName("a");

	var linkNumber = getRandomInt(6, links.length);

	var link = links[linkNumber].getAttribute("href");

	if (link.indexOf('https://bajopalabra.com.mx/') >= 0) {
		window.location.href = link;
	} else {
		crawl();
	}	
}

window.addEventListener("load", function(event) {
	if (!loaded) {
		loaded = true;
		var timer = getRandomInt(5000, 15000);
		console.log("All website has been loaded");
		console.info(`Crawl should be start in ${timer} seconds`);
		setInterval(function(){ 
			crawl();
		}, timer);
	}
 });

window.addEventListener('error', function() {
	setTimeout(function(){ 
		crawl();
	 }, 3000);
});