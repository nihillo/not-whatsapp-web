import React from 'react';
import ReactDOM from 'react-dom';
import { dataService } from './service/data-service.js';


export class MessageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageList: []
		}

		// Fix 'this' in methods which use events
		this.listenMessages = this.listenMessages.bind(this);


		this.listenMessages(this.props.room);
		

	}

	render() {

		var messageList = this.state.messageList.map((message) => {
			return (
				<Message key={message.id} name={message.sender} time={message.time}>
					{message.body}
				</Message>
			);
		});

	    return (
	    	<div className="message-list">
	    		<ul className="message-list-ul">
	    			{messageList}
			    </ul>

			    <Typing></Typing>
			    <div ref="anchorEnd"></div>
	    	</div>
	    	
	    );
	}


	componentDidMount() {  
		const node = ReactDOM.findDOMNode(this.refs.anchorEnd);
    	node.scrollIntoView({behavior: "smooth"});

    	this.listenAllMessages();
	}

	componentWillUpdate(nextProps, nextState) {
	}

	componentDidUpdate(prevProps, prevState) {
		const node = ReactDOM.findDOMNode(this.refs.anchorEnd);
    	node.scrollIntoView({behavior: "smooth"});
	}


	listenMessages(room) {

		dataService.listenMessages((msg) => {
			var msgList = this.state.messageList;
			msgList.push(msg);
			this.setState({messageList: msgList});
		});
	}

	listenAllMessages() {
		dataService.listenAllMessages((messages) => {
			this.setState({messageList: messages});
		});
	}
}


class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		switch(this.props.name) {
			case 'Server':
				return (
					<li className="message">
				      	<div className="grey-text">
				      		<strong>{this.props.name}:</strong> {this.props.children} 
				      		&nbsp;<TimeAgo>{this.props.time}</TimeAgo>
				      	</div>
				    </li>
				);
			case dataService.user.username:
				return (
					<li className="message right">
				      	<div className="message-box light-green lighten-3">
				      		<strong className="grey-text text-darken-1">{this.props.name}:</strong>
				      		<p>{this.props.children} </p>
				      		<p><TimeAgo>{this.props.time}</TimeAgo></p>
				      	</div>
				    </li>
				);
			default: 
				return (
					<li className="message">
				      	<div className="message-box">
				      		<strong className="grey-text text-darken-1">{this.props.name}:</strong>
				      		<p>{this.props.children} </p>
				      		<p><TimeAgo>{this.props.time}</TimeAgo></p>
				      	</div>
				    </li>
				);
		}
	}
}


class TimeAgo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: this.props.children
		}
	}

	render() {
		return (
				<small className="time-ago grey-text text-darken-1">{moment(this.state.time).fromNow()}</small>
	    );
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState(this.state);
		}, 60000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
}


class Typing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			typing: []
		}


		this.listenTyping = this.listenTyping.bind(this);

		this.listenTyping();
	}


	render() {


		var username;
		var verb;

		switch(this.state.typing.length) {
			case 0:
				return (
					<div className="typing">
					</div>
				);
			case 1:
				username = this.state.typing[0];
				verb = 'is';
				break;
			default:
				username = 'Some users';
				verb = 'are';
		}

		return (
			<div className="typing">
				<small>{username} {verb} typing...</small>
			</div>
		);
	}

	listenTyping() {

		dataService.listenTyping((username, isTyping) => {

			var currentlyTyping = this.state.typing;

			if(isTyping) {
				currentlyTyping.push(username);
			} else {
				var index = currentlyTyping.indexOf(username);
				if (index != -1) {
					currentlyTyping.splice(index, 1);
				}
			}

			this.setState({typing: currentlyTyping});
		});
	}

}