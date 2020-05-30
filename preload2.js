const remote = require('electron').remote

var loaded = false;
window.addEventListener("load", function(event) {

	if (!loaded) {
		loaded = true;
		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		let times = [
			6500,
			7000,
			7500,
			10000,
			15000,
			20000,
			30000,
			35000,
			40000,
		];
		let timer = getRandomInt(1, times.length);
		let index = timer - 1
		setTimeout(function(){    	
				remote.getCurrentWindow().close()
		}, times[index]);
	}

});