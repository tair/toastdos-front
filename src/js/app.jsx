"use strict";
/*global process*/

import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import {initialize} from './actions/authentication';

import Home from 'components/connectedHome';
import LoginView from 'components/views/loginView/connectedLoginView';
import submissionView from 'components/views/submissionView/connectedSubmissionView';
import NavigationFrame from 'components/navigationFrame/connectedNavigationFrame';
import DefaultLoadingAnimation from './components/loadingAnimations/defaultLoadingAnimation';

import { isAuthenticated, redirectIfLoggedIn } from './routeChecks';

import Store from './store';

// Only load the dev tools in development
let DevTools = (process.env.NODE_ENV === 'development') ? 
require('components/devTools/devTools').default : f => f;

let history = syncHistoryWithStore(browserHistory, Store);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // set initial state
        };
    }

    componentDidMount() {
        // initialze application
        this.props.initialize();
    }


    render() {

        
        let appContent = (<div>App</div>);

        if(this.props.initializing) {
            appContent = (<DefaultLoadingAnimation />);
        } else {
            appContent = (
                <div>
                    <Router history={history}>
                        <Route path="/" component={NavigationFrame}>
                            <IndexRoute component={Home} />
                            <Route path="submission" component={submissionView} onEnter={isAuthenticated}/>
                            <Route path="login" component={LoginView} onEnter={redirectIfLoggedIn}/>
                        </Route>
                    </Router>
                </div>
            );
        }
        return (
            <div>
                {process.env.NODE_ENV === 'production' ? null : <DevTools/>}
                {appContent}
            </div>
        );
    }


}

App.propTypes = {
    initialize: React.PropTypes.func,
    initializing: React.PropTypes.bool
};

App.defaultProps = {
    initialize: () => {},
    initializing: false
};

const AppContainer = connect(
    state => ({
        initializing: (state.authentication.initializing || state.userInfo.initializing)
    }),
    dispatch => ({
        initialize: () => dispatch(initialize())
    })
)(App);

export default AppContainer;
