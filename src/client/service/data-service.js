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

	watchUsers(callback) {
		this.socket.on('userListUpdate', callback);
	}

	sendMessage(msg) {
		this.socket.emit('message', msg);
	}

	sendTyping(isTyping) {
		this.socket.emit('typing', isTyping);
	}

	listenTyping(callback) {
		this.socket.on('userTyping', callback);
	} 
}

export const dataService = new DataService();