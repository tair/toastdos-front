"use strict";

import React from 'react';
import Login from '../views/loginView/loginView';

class Authentication extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.isAuthenticated ? (
            <div>
                {this.props.children}
            </div>
        ) : (
            <Login/>
        )
    }
}

Authentication.propTypes = {
    isAuthenticated: React.PropTypes.bool
}


export default Authentication;

