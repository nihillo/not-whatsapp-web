import React from 'react';
// import ReactDOM from 'react-dom';

import { Navbar, NavItem, Icon } from 'react-materialize';


export class PanelHeader extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		var avatar = React.createElement('img', {src: "images/avatar/" + this.props.user.avatar + ".png", className: "avatar"});


		return (
			<div className="panel-header">
				<nav className="grey lighten-3">
				    <div className="nav-wrapper">
				      <div className="brand-logo">
				      	{avatar}
				      	<div className="header-user grey-text">{this.props.user.username}</div>
				      </div>
				      <ul className="right">
				        <li><a href="#"><Icon>more_vert</Icon></a></li>
				      </ul>
				    </div>
				</nav>
			</div>
		);
	}
}