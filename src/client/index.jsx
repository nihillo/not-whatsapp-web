import React from 'react';
import ReactDOM from 'react-dom';

var socket = io();

class ChatBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageList: []
		}

		// Fix 'this' in methods which use events
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
		// this.listenMessages = this.listenMessages.bind(this);
		this.addNewMessage = this.addNewMessage.bind(this);

		// this.listenMessages();
	}

	render() {

		return (
			<div className="chat-box">
		        <h1 className="title">This is not Whatsapp Web</h1>
		        <MessageList messageList={this.state.messageList}/>
		        <ChatForm onMessageSubmit={this.handleMessageSubmit}/>
		    </div>
		);
	}

	componentDidMount() {  
	  socket.once('allMessages', function (messages) {
	  	var messageList = this.limitMessages(messages, 10);
	    this.setState({ messageList: messageList });
	  }.bind(this));

	  socket.on('newMessage', function (message) {
	    this.addNewMessage(message);
	  }.bind(this));

	  // this.listenMessages();
	}


	handleMessageSubmit(message) {
		// console.log('Message sent');
		socket.emit('message', message);
		// this.addNewMessage(message);
	}

	addNewMessage(message) {
		// console.log(message);
		// console.log(this.state.messageList)
		var messageList = this.state.messageList;
		messageList = this.limitMessages(messageList, 100);

		messageList.push(message);
		// console.log(messageList);
		this.setState({messageList: messageList});
	}

	limitMessages(messageList, length) {
		while (messageList.length > length) {
			messageList.shift();
		}

		// console.log(messageList);
		return messageList;
	}
}



class ChatForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<form className="chat-form" onSubmit={this.handleSubmit}>
				<input className="input username-input" type="text" placeholder="Nombre de usuario" ref="username"/>
				<input className="input body-input" type="text" placeholder="¡Escribe algo! :D" ref="body"/>
				<button className="button">Enviar</button>
			</form>
		);
	}

	handleSubmit(event) {
		event.preventDefault();

		var message = {
			username: this.refs.username.value.trim(),
			body: this.refs.body.value.trim()
		}

		if (!message.username || !message.body) {
			return;
		}

		this.props.onMessageSubmit(message);
		this.refs.body.value = '';
	}
}


class MessageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {

		var messageList = this.props.messageList.map((message) => {
			return (
				<Message key={message.id} name={message.username} time={message.time}>
					{message.body}
				</Message>
			);
		});

	    return (
	      <ul className="message-list">
	        {messageList}
	      </ul>
	    );
	}
}


class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
	      <li className="message">
	      	<strong>{this.props.name}:</strong> {this.props.children} 
	      	<TimeAgo>{this.props.time}</TimeAgo>
	      </li>
	    );
	}
}


class TimeAgo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
	      <small className="time-ago">{moment(this.props.children).fromNow()}</small>
	    );
	}
}

ReactDOM.render(<ChatBox/>, document.getElementById('app'));