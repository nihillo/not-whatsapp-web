import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return (
    	<div>
    		<div>
    			<h1>This is not Whatsapp web</h1>
    			<p> This is the app component</p>
    			<Comp></Comp>
    		</div>
    	</div>
    	
    );
  }
}




class Comp extends React.Component {
	render () {
		return <p>This is a child component</p>;
	}
}



render(<App/>, document.getElementById('app'));