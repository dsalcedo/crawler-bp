let Person = {
	create(name) {
		window.socket.send('person_create', name);
	}
}

window.socket.on("person_created", (data) => {
            console.log(`Received ${data} from main process`);
        });