class DataService {
	constructor() {
		this.socket = io();
		this.user = {};
	}

	tryUser(username) {
		this.socket.emit('tryUser', username);
	}

	getUserAvailability(callback) {
		this.socket.on('userAvailability', callback);
	}

	login(user) {
		this.user = user;
		this.socket.emit('userLogin', user);
	}

	listenMessages(callback) {
		this.socket.on('newMessage', callback);
	}

	listenAllMessages(callback) {
		this.socket.on('allRoomMessages', callback);
	}

	watchUsers(callback) {
		this.socket.on('userListUpdate', callback);
	}

	watchChannels(callback) {
		this.socket.on('channelListUpdate', callback);
	}

	sendMessage(msg) {
		this.socket.emit('message', msg);
	}

	sendTyping(isTyping, room) {
		this.socket.emit('typing', isTyping, room);
	}

	listenTyping(callback) {
		this.socket.on('userTyping', callback);
	}

	openPrivate(user) {
		this.socket.emit('openPrivate', user);
	}

	listenRoomChange(callback) {
		this.socket.on('joinedRoom', callback);
	}

	openChannel(channel) {
		this.socket.emit('openChannel', channel);
	}
}

export const dataService = new DataService();