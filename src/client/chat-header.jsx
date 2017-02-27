import React from 'react';
// import ReactDOM from 'react-dom';

import { Navbar, NavItem, Icon } from 'react-materialize';
import { dataService } from './service/data-service.js';


export class ChatHeader extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
		}
	}

	render() {
		return (
			<div className="chat-header">
				<nav className="grey lighten-3">
				    <div className="nav-wrapper">
				      <p className="chat-header-title grey-text text-darken-1">{this.props.title}</p>
				    </div>
				</nav>
			</div>
		);
	}
}