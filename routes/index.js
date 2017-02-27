// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
// 	res.render('index');
// });

// module.exports = router;
var io;
const messages = [];
const users = [];
const rooms = [];

module.exports = function(socket_io) {

	// Socket.io events
	io = socket_io;
    var app = require('express');
    var router = app.Router();

	io.on('connection', function(socket) {

		// Socket associated user
		socket.user = {};

		// Try if username is in use on the server
		socket.on('tryUser', function(username) {
			userAvailable = true;
			usersLogged = users.map(function(user) {
				return user.username;
			});

			if (usersLogged.indexOf(username) != -1) {
				userAvailable = false;
			}

			// Return response
			socket.emit('userAvailability', userAvailable);
		});

		// Login user
		socket.on('userLogin', function(user) {
			
			socket.user = user;

			console.log(user.username + ' connected');
			addUser(user);

			let msg = {

				sender: 'Server',
				body: user.username + ' connected'
			}

			registerMessage(msg);
			broadcastLastMessage(socket);
		});


		// Receive message
	    socket.on('message', function (msg) {
	    	registerMessage(msg);
	    	broadcastLastMessage(socket);
	    });


	    // Disconnect user
	    socket.on('disconnect', function(){

	        console.log(socket.user.username + ' disconnected');
	        removeUser(socket.user);

	        let msg = {
				sender: 'Server',
				body: socket.user.username + ' disconnected'

			}

			registerMessage(msg);
			broadcastLastMessage(socket);
	    });


	    // Recive message when a user starts/stops typing
	    socket.on('typing', function(isTyping) {
	    	socket.broadcast.emit('userTyping', socket.user.username, isTyping);

	    	console.log(socket.user.username + ' typing: ' + isTyping);
	    });
	});



    router.get('/', function(req, res, next) {
    	res.render('index');
	});

    return router;
}


function addUser(user) {
	users.push(user);
	io.sockets.emit('userListUpdate', users);
}

function removeUser(user) {
	users.forEach((us, index, array) => {
		if (us.username == user.username) {
			array.splice(index, 1);
		}
	});
	

	io.sockets.emit('userListUpdate', users);
}


function registerMessage(msg) {
	msg.id = messages.length;
	msg.time = new Date();
	
	messages.push(msg);
}

function sendAllMessages(socket) {
	socket.emit('allMessages', messages);
}

function broadcastLastMessage() {
	var lastMessage = messages[messages.length - 1];
	io.sockets.emit('newMessage', lastMessage);

}