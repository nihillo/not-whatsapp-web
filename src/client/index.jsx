import React from 'react';
import ReactDOM from 'react-dom';

var socket = io();

// class App extends React.Component {
//   render () {
//     return (
//     	<div>
//     		<div>
//     			<h1>This is not Whatsapp web</h1>
//     			<p> This is the app component</p>
//     			<Comp></Comp>
//     		</div>
//     	</div>
    	
//     );
//   }
// }


class ChatBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageList: []
		}

		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
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


	handleMessageSubmit(message) {
		socket.emit('message', message);
		this.addNewMessage(message);
	}

	addNewMessage(message) {
		var messageList = this.state.messageList;
		message.id = messageList.length + 1;
		if (messageList.length > 100) {
			messageList.shift();
		}
		messageList.push(message);
		this.setState({messageList: messageList});
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