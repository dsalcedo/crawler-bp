const remote = require('electron').remote

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let times = [
	7000,
	10000,
	15000,
	20000,
	30000,
	35000,
	40000,
];
let timer = getRandomInt(1, 7);
setTimeout(function(){    	
		remote.getCurrentWindow().close()
}, timer - 1);