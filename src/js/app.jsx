"use strict";
/*global process*/

import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import homeModule from 'modules/home';
import authenticationModule from 'modules/authentication';
import submissionModule from 'modules/submission';
import navigationModule from 'modules/navigation';
import curationModule from 'modules/curation';

import { isAuthenticated, redirectIfLoggedIn } from 'lib/routeChecks';
import DefaultLoadingAnimation from 'lib/components/loadingAnimations/defaultLoadingAnimation';

import Store from './store';

// Only load the dev tools in development
let DevTools = (process.env.NODE_ENV === 'development') ? 
require('lib/components/devTools').default : f => f;

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
        const routerComponent = (
            <Router history={history}>
                <Route
                    path="login"
                    component={authenticationModule.components.LoginView}
                    onEnter={redirectIfLoggedIn}
                />
                <Route
                    path="/"
                    component={navigationModule.components.NavigationFrame}
                >
                    <IndexRoute
                        component={homeModule.components.HomeView}
                    />
                    <Route
                        path="submission"
                        component={submissionModule.components.SubmissionView}
                        onEnter={isAuthenticated}
                    />
                    <Route
                        path="curation/detail/:submissionId"
                        component={curationModule.components.CurationDetailView}
                        onEnter={isAuthenticated}
                    />
                    <Route
                        path="curation"
                        component={curationModule.components.CurationOverviewView}
                        onEnter={isAuthenticated}
                    />
                </Route>
            </Router>
        );

        return (
            <div>
                {process.env.NODE_ENV === 'production' ? null : <DevTools/>}
                <div>
                    <authenticationModule.components.TokenWatchdog />
                    {this.props.initializing ? (<DefaultLoadingAnimation />) : routerComponent}
                </div>
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
        initialize: () => dispatch(authenticationModule.actions.initialize())
    })
)(App);

export default AppContainer;
