// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
// 	res.render('index');
// });

// module.exports = router;
var io;
var messages = [];

module.exports = function(socket_io) {

	// Socket.io events
	io = socket_io;
    var app = require('express');
    var router = app.Router();

	io.on('connection', function(socket) {
		console.log('A user connected');
		sendAllMessages(socket);

	    socket.on('message', function (msg) {
	    	registerMessage(msg);
	    	broadcastLastMessage(socket);
	    });
	});

    router.get('/', function(req, res, next) {
    	res.render('index');
	});

    return router;
}


function registerMessage(msg) {
	msg.id = messages.length;

	messages.push(msg);
}

function sendAllMessages(socket) {
	socket.emit('allMessages', messages);
}

function broadcastLastMessage() {
	var lastMessage = messages[messages.length - 1];
	io.sockets.emit('newMessage', lastMessage);

}