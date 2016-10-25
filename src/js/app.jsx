"use strict";

import React from 'react';
import Home from 'components/connectedHome';
import LoginView from 'components/views/loginView/connectedLoginView';
import Authentication from 'components/authentication/connectedAuthentication';
import NavigationFrame from 'components/navigationFrame/connectedNavigationFrame';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { isAuthenticated, redirectIfLoggedIn } from './routeChecks';
import { syncHistoryWithStore } from 'react-router-redux';
import Store from './store';


let history = syncHistoryWithStore(browserHistory, Store);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// set initial state
		}
	}


	render() {
		return (
			<Router history={history}>
				<Route path="/" component={NavigationFrame}>
					<IndexRoute component={Home} />
					<Route path="test" component={Home} onEnter={isAuthenticated}/>
			     	<Route path="login" component={LoginView} onEnter={redirectIfLoggedIn} />
		     	</Route>
			</Router>
		)
	}


}


export default App;
