import React from 'react';
// import ReactDOM from 'react-dom';
import { CardPanel } from 'react-materialize';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		
		var user = {
				username: '',
				status: '',
				avatar: '1'
			}

		if (localStorage.getItem('user')) {
			
				user = {
					username: JSON.parse(localStorage.getItem('user')).username,
					status: JSON.parse(localStorage.getItem('user')).status,
					avatar: JSON.parse(localStorage.getItem('user')).avatar
				}
			
		}

		this.state = { user: user }

		
		// Fix 'this' in methods which use events
		this.liftLogin = this.liftLogin.bind(this);
		this.changeAvatar = this.changeAvatar.bind(this);
		this.changeName = this.changeName.bind(this);
		this.changeStatus = this.changeStatus.bind(this);
	}

	render() {
		return (
			<div className="login-view">
				<div className="login-card-wrapper">
					<CardPanel className="login-card z-depth-4">
						<AvatarSelector onAvatarSelect={this.changeAvatar} avatarID={this.state.user.avatar}/>
						<form className="col s12" onSubmit={this.liftLogin}>
						 	<div className='row'>
				              <div className='col s12'>
				              </div>
				            </div>

				            <div className='row'>
				              <div className='input-field col s12'>
				                <input className='validate' type='text' name='username' id='username' ref="username" value={this.state.user.username} onChange={this.changeName}/>
				                <label htmlFor='username'>User name</label>
				              </div>
				            </div>

				            <div className='row'>
				              <div className='input-field col s12'>
				                <input className='validate' type='text' name='status' id='status' ref="status" value={this.state.user.status} onChange={this.changeStatus}/>
				                <label htmlFor='status'>Status</label>
				              </div>
				            </div>

				            <br />
				            <center>
				              <div className='row'>
				                <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect teal'>Login</button>
				              </div>
				            </center>
				         </form>
					</CardPanel>
				</div>
			</div>
		);
	}

	componentWillMount() {
		// if (localStorage.getItem('user')) {
		// 	this.setState({
		// 		user: {
		// 			username: JSON.parse(localStorage.getItem('user')).username,
		// 			status: JSON.parse(localStorage.getItem('user')).status,
		// 			avatar: JSON.parse(localStorage.getItem('user')).avatar
		// 		}
		// 	});
		// }
	}

	componentDidUpdate() {
		// console.log(this.state.user);
		localStorage.setItem('user', JSON.stringify(this.state.user));
	}

	changeName(event) {
		this.setState({
			user: {
				username: event.target.value,
				status: this.state.user.status,
				avatar: this.state.user.avatar
			}
		});
	}

	changeStatus(event) {
		this.setState({
			user: {
				status: event.target.value,
				username: this.state.user.username,
				avatar: this.state.user.avatar
			}
		});
	}

	changeAvatar(avatar) {
		this.setState({
			user: {
				username: this.state.user.username,
				avatar: avatar,
				status: this.state.user.status
			}
		})
		// this.props.onAvatarSelect(avatar);
	}

	liftLogin(event) {
		event.preventDefault();
		// this.setState({
		// 	user: {
		// 		username: this.refs.username.value.trim(),
		// 		status: this.refs.status.value.trim(),
		// 		avatar: this.state.user.avatar
		// 	}
		// });

		if (!this.state.user.username || !this.state.user.status) {
			return;
		}

		// console.log(this.state.user);

		this.props.onLoginSubmit(this.state.user);
	}
}

class AvatarSelector extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<div className="avatar-wrapper center">
				<div id="avatar" className="center"></div>
			</div>
		);
	}

	componentWillMount() {
		
	}

	componentDidMount() {
		var iconSelect = new IconSelect("avatar");

		var icons = [];
		icons.push({'iconFilePath':'images/avatar/1.png', 'iconValue':'1'});
		icons.push({'iconFilePath':'images/avatar/2.png', 'iconValue':'2'});
		icons.push({'iconFilePath':'images/avatar/3.png', 'iconValue':'3'});
		icons.push({'iconFilePath':'images/avatar/4.png', 'iconValue':'4'});
		icons.push({'iconFilePath':'images/avatar/5.png', 'iconValue':'5'});
		icons.push({'iconFilePath':'images/avatar/6.png', 'iconValue':'6'});

		iconSelect.refresh(icons);

		iconSelect.setSelectedIndex(this.props.avatarID - 1);

		document.getElementById('avatar').addEventListener('changed', (e) => {

			this.props.onAvatarSelect(iconSelect.getSelectedValue());
        
        });
	}
}