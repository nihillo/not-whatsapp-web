import React from 'react';
import ReactDOM from 'react-dom';

import {dataService} from './service/data-service.js';

import {Login} from './login.jsx';
import {Chat} from './chat.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				username: '',
				avatar: '1',
				status: ''
			},
			allowLogin: false
		}

		// Fix 'this' in methods which use events
		this.login = this.login.bind(this);
	}

	render() {
		if (this.state.allowLogin) {
			return(
				<div className="app-wrapper">
					<Chat user={this.state.user} />
				</div>	
			);
		}

		return(
			<div className="app-wrapper">
				<Login onLoginSubmit={this.login}/>
			</div>
		);
	}

	login(user) {
		this.setState({
			user: {
				username: user.username,
				avatar: user.avatar,
				status: user.status
			},
			allowLogin: true
		})

		dataService.login(user);
	}

	componentDidUpdate() {
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));