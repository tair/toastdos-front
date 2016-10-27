"use strict";

import React from 'react';
import  {Link} from 'react-router';

const AUTH_URL = "https://orcid.org/oauth/authorize?client_id=APP-ITUEP986Z6KHTC7H&state=test&response_type=code&scope=/authenticate&redirect_uri=http://localhost:8080/login";

class NavigationBar extends React.Component {

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
                        <Link>Logout</Link>

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
    isAuthenticated: React.PropTypes.bool
}

export default NavigationBar;