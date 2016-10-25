"use strict";

import React from 'react';
import Home from 'components/connectedHome';
import LoginView from 'components/views/loginView/loginView';
import Authentication from 'components/authentication/connectedAuthentication';
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
			     	<Route component={Authentication}>
						<Route path="test" component={Home} />
			     	</Route>
			     	<Route path="login" component={LoginView} />
		     	</Route>
			</Router>
		)
	}


}


export default App;
