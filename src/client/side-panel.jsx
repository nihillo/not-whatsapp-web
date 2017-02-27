import React from 'react';
// import ReactDOM from 'react-dom';

import { PanelHeader } from './panel-header.jsx';
import { PanelBody } from './panel-body.jsx';

export class SidePanel extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<div className="side-panel">
				<PanelHeader user={this.props.user}></PanelHeader>
				<PanelBody></PanelBody>
			</div>
		);
	}
}