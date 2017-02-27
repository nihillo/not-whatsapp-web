import React from 'react';
// import ReactDOM from 'react-dom';

import {ChatHeader} from './chat-header.jsx';
import {MessageList} from './message-list.jsx';
import {ChatForm} from './chat-form.jsx';
import { dataService } from './service/data-service.js';

export class ChatBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}
		
		// Fix 'this' in methods which use events
		this.listenRoomChange = this.listenRoomChange.bind(this);

		this.listenRoomChange();
	}

	render() {
		return (
			<div className="chat-box">
				<ChatHeader title={this.state.title} ></ChatHeader>
				<MessageList user={this.props.user} room={this.state.room}></MessageList>
				<ChatForm user={this.props.user} room={this.state.room}></ChatForm>
			</div>
		);
	}

	listenRoomChange() {
		dataService.listenRoomChange((room) => {
			// console.log('Room changed to ' + room);
			this.setState({
				room: room,
				title: this.setTitle(room)
			});
		});
	}


	componentDidMount() {
		this.setState({
			room: 'main',
			title: this.setTitle('main')
		});
	}



	setTitle(room) {
		var title;
		if (room == 'main') {
			// this.setState({
			// 	title: 'Not Whatsapp Web'
			// })
			title = 'Not Whatsapp Web';
		} else if (/^[A-Za-z0-9]+[:][A-Za-z0-9]+$/.test(room)) {
			var usersInRoom = room.split(':');

			var currUserIndex = usersInRoom.indexOf(dataService.user.username);
			var index;
			if (currUserIndex == 0) {
				index = 1;
			} else {
				index = 0;
			}

			title = 'Private conversation with ' + usersInRoom[index];
		} else {
			title = room;
		}

		return title;
	}
}