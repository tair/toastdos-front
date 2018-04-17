"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(!this.props.isAuthenticating && this.props.location.query.code && !this.props.loginError) {
            this.props.attemptLogin(this.props.location.query.code);
        }

        if(!this.props.location.query.code) {
            browserHistory.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isAuthenticated) {
            browserHistory.push("/");
        }
    }

    render() {
        if(this.props.location.query.error) {
            return(
                <div>
                    <h1>Error</h1>
                    <h2>{this.props.location.query.error_description}</h2>
                </div>);
        }
        return (
            this.props.isAuthenticating ? (
                <div>
                    <h1>Authenticating...</h1>
                </div>
            ) : (
                <div>
                    <h1>Not Authenticated</h1>
                </div>
            )
        );
    }
}

LoginView.propTypes = {
    attemptLogin: PropTypes.func,
    isAuthenticating: PropTypes.bool,
    isAutheticated: PropTypes.bool,
    loginError: PropTypes.object,
};


export default LoginView;


