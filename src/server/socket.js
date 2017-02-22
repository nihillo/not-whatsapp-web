var messages = [];
io.on('connection', function(socket) {
	console.log('A user connected');
	console.log(socket.id);

    socket.on('message', function (msg) {
    	console.log(socket.id);
    	registerMessage(msg);
    	broadcastLastMessage(socket);
    });
});

function registerMessage(msg) {
	msg.id = messages.length;

	messages.push(msg);
}


function broadcastLastMessage() {
	var lastMessage = messages[messages.length - 1];
	io.sockets.emit('newMessage', lastMessage);

	// console.log('Message broadcasted');
}