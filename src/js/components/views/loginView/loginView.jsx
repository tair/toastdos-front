"use strict";

import React from 'react';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            this.props.location.query.code ? (
                <div>
                    Authenticating...
                </div>
            ) : (
                <div>
                    PLS Authenticate
                </div>
            )
        )
    }
}


export default LoginView;