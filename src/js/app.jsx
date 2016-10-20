"use strict"

import React from 'react';
import Counter from 'components/connectedCounter';
import Home from 'components/connectedHome';
import NavigationFrame from 'components/NavigationFrame';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// set initial state
		}
	}


	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={NavigationFrame}>
					<IndexRoute component={Home} />
			     	<Route path="counter" component={Counter}/>
			     	
			    </Route>
			</Router>
		)
	}


}


export default App;
