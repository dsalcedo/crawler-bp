const remote = require('electron').remote
setTimeout(function(){    	
		remote.getCurrentWindow().close()
}, 7000);