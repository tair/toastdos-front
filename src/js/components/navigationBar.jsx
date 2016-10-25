"use strict";

import React from 'react';
import  {Link} from 'react-router';

const AUTH_URL = "https://orcid.org/oauth/authorize?client_id=APP-ITUEP986Z6KHTC7H&response_type=code&scope=/authenticate&redirect_uri=http://localhost:8080/login";

class NavigationBar extends React.Component {

    render() {
        return (
            <div className="navigation-bar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <ul className="right-nav">
                    <li>
                        <a href={AUTH_URL}>Login</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavigationBar;