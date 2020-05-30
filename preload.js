 /**
* Specifies a script that will be loaded before other scripts run in the page.
* This script will always have access to node APIs no matter whether node
* integration is turned on or off. The value should be the absolute file path to
* the script. When node integration is turned off, the preload script can
* reintroduce Node global symbols back to the global scope. See example .
*/

var shell = require('electron').shell;
const path = require("path");
let loaded = false;

function createNewBrowserWindow(url) {
  let remote = require('electron').remote;
  let NewBrowserWindow = remote.BrowserWindow;
  let newWin = new NewBrowserWindow({
    height: 600,
    width: 800,
    webPreferences:{
    	preload: path.resolve(path.join(__dirname, "preload2.js")),
        nodeIntegration: false,
        show: false
    }
  });
  // newWin.webContents.openDevTools();
  newWin.loadURL(url);

  newWin.once("ready-to-show", function(){
    newWin.show();
  });

  newWin.on('closed',()=>{
  	newWin = null;
  });
	
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function crawl() {
	var items = []
	var insData = document.getElementsByTagName("ins");
		for (i = 0; i <= insData.length; i++){
			if (insData[i] !== undefined) {
				if (insData[i].hasAttribute("data-revive-zoneid")) {
				    items.push(insData[i].children[0].getAttribute("href"))
				  }
			}
		}

	var links = document.getElementsByTagName("a");
	var linkNumber = getRandomInt(0, links.length);
	var link = links[linkNumber].getAttribute("href");

	var prob = getRandomInt(1, 30);
	var prob2 = getRandomInt(0, items.length);
	var compliance = prob === 7;
	var linkShowBanner = link.indexOf('https://adserver.bajopalabra.com.mx/');
	
	if (linkShowBanner >= 0 || compliance) {
		if (linkShowBanner >= 0) {
			createNewBrowserWindow(link);
		} else if (items[prob2] !== undefined) {
			createNewBrowserWindow(items[prob2]);
		}
	}

	if (
		link.indexOf('whatsapp://') >= 0 ||
		link.indexOf('https://www.facebook.com') >= 0 ||
		link.indexOf('https://twitter.com') >= 0 ||
		link.indexOf('https://instagram.com') >= 0 ||
		link.indexOf('https://www.youtube.com') >= 0 ||
		link.indexOf('sharer/sharer.php') >= 0
	){
		crawl();
	}else if (link.indexOf('https://bajopalabra.com.mx/') >= 0) {
		window.location.href = link;
	} else {
		crawl();
	}	
}

window.addEventListener("load", function(event) {
	if (!loaded) {
		loaded = true;
		var timer = getRandomInt(5000, 11000);
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