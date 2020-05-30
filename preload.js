// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

var shell = require('electron').shell;

window.addEventListener("load", function(event) {
    console.log("'Todos los recursos terminaron de cargar!");


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
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

setTimeout(function(){ 

	crawl();
 }, 5000);

 });
