import React from 'react';
// import ReactDOM from 'react-dom';

import {SidePanel} from './side-panel.jsx';
import {ChatBox} from './chat-box.jsx';

export class Chat extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	messageList: []
		// }

		// Fix 'this' in methods which use events
		// this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
		// this.listenMessages = this.listenMessages.bind(this);
		// this.addNewMessage = this.addNewMessage.bind(this);

		// this.listenMessages();
	}

	render() {

		return (
			<div className="chat-view">
				<div className="container chat-container z-depth-3">
					<SidePanel user={this.props.user} ></SidePanel>
	        		<ChatBox user={this.props.user} ></ChatBox>		
				</div>
		    </div>
		);
	}

	// componentDidMount() {  
	//   socket.once('allMessages', function (messages) {
	//   	var messageList = this.limitMessages(messages, 10);
	//     this.setState({ messageList: messageList });
	//   }.bind(this));

	//   socket.on('newMessage', function (message) {
	//     this.addNewMessage(message);
	//   }.bind(this));

	//   // this.listenMessages();
	// }


	// handleMessageSubmit(message) {
	// 	// console.log('Message sent');
	// 	socket.emit('message', message);
	// 	// this.addNewMessage(message);
	// }

	// addNewMessage(message) {
	// 	// console.log(message);
	// 	// console.log(this.state.messageList)
	// 	var messageList = this.state.messageList;
	// 	messageList = this.limitMessages(messageList, 100);

	// 	messageList.push(message);
	// 	// console.log(messageList);
	// 	this.setState({messageList: messageList});
	// }

	// limitMessages(messageList, length) {
	// 	while (messageList.length > length) {
	// 		messageList.shift();
	// 	}

	// 	// console.log(messageList);
	// 	return messageList;
	// }
}



