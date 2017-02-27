import React from 'react';
// import ReactDOM from 'react-dom';
import { Input, Button } from 'react-materialize';

import { dataService } from './service/data-service.js';


export class ChatForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			typing: false,
			typingTimeout: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
	}

	render() {
		return (
			<div className="chat-form">
				<form className="send-form" onSubmit={this.handleSubmit}>
					<Input label="Message" name="body" ref="body" onKeyDown={this.handleTyping} />
					<Button waves='light'>Send</Button>
				</form>
			</div>
		);
	}

	handleSubmit(event) {
		event.preventDefault();

		var message = {
			sender: dataService.user.username,
			body: event.target.body.value.trim()
		}

		if (!message.body) {
			return;
		}

		dataService.sendMessage(message);
		
		dataService.sendTyping(false);
		clearTimeout(this.state.typingTimeout);
		this.setState({
			typing: false,
			typingTimeout: null
		});

		event.target.body.value = '';
	}

	handleTyping(event) {

		if (!this.state.typing) {
			dataService.sendTyping(true);	
		} 

		clearTimeout(this.state.typingTimeout);

		this.setState({
			typing: true,
			typingTimeout: setTimeout(() => {
				dataService.sendTyping(false);
				this.setState({
					typing: false,
					typingTimeout: null
				});

			}, 2000)
		});
	}
}