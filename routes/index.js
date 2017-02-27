// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
// 	res.render('index');
// });

// module.exports = router;
var io;
const mainRoom = 'main';
const messages = [];
const users = [];
const userSockets = {};
const channels = [
	{
		name: 'main'
	},
	{
		name: 'Hobbies'
	},
	{
		name: 'Meeting Point'
	}
];
const privateSockets = [];

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
			socket.room = mainRoom;

			console.log(user.username + ' connected');
			addUser(user, socket);

			socket.join(mainRoom);


			// Send initial channel list
			socket.emit('channelListUpdate', channels);

			// Send all room messages
			sendAllRoomMessages(socket);

			let msg = {

				sender: 'Server',
				body: user.username + ' connected',
				room: socket.room
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
				body: socket.user.username + ' disconnected',
				room: socket.room
			}

			registerMessage(msg);
			broadcastLastMessage(socket);
	    });


	    // Receive message when a user starts/stops typing
	    socket.on('typing', function(isTyping, room) {
	    	
			// if (room == 'main') {
			// 	socket.broadcast.emit('userTyping', socket.user.username, isTyping);
			// } else {
				socket.broadcast.to(room).emit('userTyping', socket.user.username, isTyping);
				// io.sockets.in(room).emit('userTyping', socket.user.username, isTyping);
			// }
	    });


	    // Receive private conversation requests
	    socket.on('openPrivate', function(user) {
	    	// console.log(socket.user.username + ' - ' + user);
	    	var room = {}

	    	if (privateSockets.indexOf(user + ':' + socket.user.username) != -1) {
	    		room.id = user + ':' + socket.user.username
	    	} else {
	    		room.id = socket.user.username + ':' + user;
	    	}

	    	privateSockets.push(room.id);

	    	socket.leave(socket.room);
	    	userSockets[user].leave(socket.room);
	    	
	    	socket.room = room.id;
	    	
	    	socket.join(socket.room);
	   		userSockets[user].join(socket.room);

	   		io.sockets.in(room.id).emit('joinedRoom', room.id);

	   		// Send all room messages
			sendAllRoomMessages(socket);

	    });


	    // Open channel
	    socket.on('openChannel', function(channel) {
	    	// console.log(socket.user.username + ' - ' + user);s
	    	var room = {}
	    	room.id = channel;

	    	socket.leave(socket.room);
	    	// userSockets[user].leave(socket.room);
	    	
	    	socket.room = room.id;
	    	
	    	socket.join(socket.room);
	   		// userSockets[user].join(socket.room);

	   		io.sockets.in(room.id).emit('joinedRoom', room.id);

	   		// Send all room messages
			sendAllRoomMessages(socket);


	    });
	});



    router.get('/', function(req, res, next) {
    	res.render('index');
	});

    return router;
}


function addUser(user, socket) {
	users.push(user);

	userSockets[user.username] = socket;
	io.sockets.emit('userListUpdate', users);
}

function removeUser(user) {
	users.forEach((us, index, array) => {
		if (us.username == user.username) {
			array.splice(index, 1);
		}
	});
	
	delete userSockets[user];

	io.sockets.emit('userListUpdate', users);
}


function registerMessage(msg) {
	msg.id = messages.length;
	msg.time = new Date();
	
	messages.push(msg);
}

function sendAllRoomMessages(socket) {
	msgs = messages.filter(function(msg){
		return (msg.room == socket.room); 
	});

	io.in(socket.room).emit('allRoomMessages', msgs);
}

function broadcastLastMessage() {
	var lastMessage = messages[messages.length - 1];
	// if (lastMessage.room == 'main') {
	// 	io.sockets.emit('newMessage', lastMessage);
	// } else {
		io.in(lastMessage.room).emit('newMessage', lastMessage);
	// }
}