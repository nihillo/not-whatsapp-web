import React from 'react';
import ReactDOM from 'react-dom';
import {Login} from './login.jsx';
import {ChatBox} from './chatbox.jsx';

var socket = io();

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
		// this.setAvatar = this.setAvatar.bind(this);
	}

	render() {
		if (this.state.allowLogin) {
			return(
				<ChatBox/>
			);
		}

		return(
			<Login onLoginSubmit={this.login}/>
		);
	}

	// setAvatar(avatar) {
	// 	this.setState({
	// 		user: {
	// 			username: this.state.user.username,
	// 			avatar: avatar,
	// 			status: this.state.user.status
	// 		}
	// 	})
	// }

	login(user) {
		// event.preventDefault();
		// console.log('A punto de hacer login');
		this.setState({
			user: {
				username: user.username,
				avatar: user.avatar,
				status: user.status
			},
			allowLogin: true
		})
	}

	componentDidUpdate() {
		console.log(this.state);
		// localStorage.setItem('user', JSON.stringify(this.state.user));
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));