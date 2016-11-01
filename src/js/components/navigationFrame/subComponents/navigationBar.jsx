"use strict";

import React from 'react';
import  {Link} from 'react-router';

const AUTH_URL = "https://sandbox.orcid.org/oauth/authorize?client_id=APP-ICY3HOEWL1KVKM3V&state=test&response_type=code&scope=/read-limited&redirect_uri=http://localhost:8080/login";

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className="navigation-bar">
                <ul>
                    <li>
                        <Link to="/">ToastDos</Link>
                    </li>
                    <li>
                        <Link to="/test">TEST</Link>
                    </li>
                </ul>
                <ul className="right-nav">
                    <li>
                    {this.props.isAuthenticated ? (
                        <Link to="/" onClick={this.props.onLogoutClick} >Logout</Link>

                    ) : (
                        <a href={AUTH_URL}>Login with ORCID</a>
                    )}
                        
                    </li>
                </ul>
            </div>
        )
    }
}

NavigationBar.propTypes = {
    isAuthenticated: React.PropTypes.bool,
    onLogoutClick: React.PropTypes.func
}

export default NavigationBar;