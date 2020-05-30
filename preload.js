// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

var shell = require('electron').shell;

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

let not_valid = [
	'https://bajopalabra.com.mx/quienes-somos',
	'https://bajopalabra.com.mx/codigo-de-etica',
	'https://bajopalabra.com.mx/declaracion-de-accesibilidad-para-todos-bajo-palabra',
	'https://bajopalabra.com.mx/nuestra-linea-editorial'
];

function crawl() {
	let links = document.getElementsByTagName("a");

	var linkNumber = getRandomInt(6, links.length);

	var link = links[linkNumber].getAttribute("href");

	not_valid.forEach(function(item){
		if (link.indexOf(item) >= 0) {
			crawl();	
		}
	})


	if (link.indexOf('https://bajopalabra.com.mx/') >= 0) {
		window.location.href = link;
	} else {
		crawl();
	}	
}

setTimeout(function(){ 

	crawl();
 }, 5000);
