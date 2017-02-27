import React from 'react';
// import ReactDOM from 'react-dom';

import { Collection, CollectionItem } from 'react-materialize';

import { dataService } from './service/data-service.js';


export class PanelBody extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="panel-body">
				<PanelChannels></PanelChannels>
				<PanelUsers></PanelUsers>	
			</div>
		);
	}
}


class PanelUsers extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			userList: []
		}

		this.watchUsers();
	}

	render() {
		var users = this.state.userList;

		var users = this.state.userList.filter((user) => {
			return user.username != dataService.user.username;
		});

		users = users.map((user) => {


			return (

					<CollectionItem key={'u-list-' + user.username} className="collection-item-user">
						<div className="card horizontal card-user" onClick={this.openPrivate.bind(this, user.username)}>
					      <div className="card-image">
					        <img className="avatar" src={'images/avatar/' + user.avatar + '.png'}/>
					      </div>
					      <div className="card-stacked">
					        <div className="card-content">
					          <p className="user-name bold grey-text text-darken-2">{user.username}</p>
					          <p className="user-status grey-text">{user.status}</p>
					        </div>
					      </div>
					    </div>
					</CollectionItem>
				
			);

		});

		return (
			<div className="users">
				<h6>Users online</h6>
				<Collection>
					{users}
				</Collection>
			</div>
		);
	}

	watchUsers() {
		dataService.watchUsers((userList) => {
			this.setState({userList: userList});
		})
	}

	openPrivate(user) {
		dataService.openPrivate(user);
	}
}

class PanelChannels extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			channelList: []
		}

		this.watchChannels();
	}

	render() {
		var channels = this.state.channelList;

		// var channels = this.state.channelList.filter((channel) => {
		// 	return channel.name != dataService.channel.name;
		// });

		channels = channels.map((channel) => {


			return (
				
				<CollectionItem key={'u-list-' + channel.name} className="collection-item-channel">
					<div className="card horizontal card-channel" onClick={this.openChannel.bind(this, channel.name)}>
				      
				      <div className="card-stacked">
				        <div className="card-content">
				          <p className="channel-name bold grey-text text-darken-2">#{channel.name}</p>
				        </div>
				      </div>
				    </div>
				</CollectionItem>
			);

		});

		return (
			<div className="channels">
				<h6>Channels</h6>
				<Collection>
					{channels}
				</Collection>
			</div>
		);
	}

	watchChannels() {
		dataService.watchChannels((channelList) => {
			this.setState({channelList: channelList});
		})
	}

	openChannel(channel) {
		dataService.openChannel(channel);
	}
}