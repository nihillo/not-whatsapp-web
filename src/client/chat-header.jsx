import React from 'react';
// import ReactDOM from 'react-dom';

import { Navbar, NavItem, Icon } from 'react-materialize';


export class ChatHeader extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<div className="chat-header">
				<nav className="grey lighten-3">
				    <div className="nav-wrapper">
				      <p className="chat-header-title grey-text text-darken-1">Not Whatsapp Web</p>
				    </div>
				</nav>
			</div>
		);
	}
}