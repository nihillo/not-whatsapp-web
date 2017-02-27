import React from 'react';
// import ReactDOM from 'react-dom';

import {ChatHeader} from './chat-header.jsx';
import {MessageList} from './message-list.jsx';
import {ChatForm} from './chat-form.jsx';

export class ChatBox extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<div className="chat-box">
				<ChatHeader></ChatHeader>
				<MessageList user={this.props.user} ></MessageList>
				<ChatForm user={this.props.user} ></ChatForm>
			</div>
		);
	}
}