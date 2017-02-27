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
				<PanelUsers></PanelUsers>
				<PanelChannels></PanelChannels>
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
					<div className="card horizontal card-user">
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
			<Collection>
				{users}
			</Collection>
		);
	}


	watchUsers() {
		dataService.watchUsers((userList) => {
			this.setState({userList: userList});
		})
	}
}

class PanelChannels extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<p>Holi soy el panel de canales</p>
		);
	}
}