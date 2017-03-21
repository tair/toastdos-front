"use strict";

import React from 'react';
import { browserHistory } from 'react-router';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       // ... 
        if(this.props.location.query.code) {
            this.props.attemptLogin(this.props.location.query.code);
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
    attemptLogin: React.PropTypes.func,
    isAuthenticating: React.PropTypes.bool,
    isAutheticated: React.PropTypes.bool
};


export default LoginView;


