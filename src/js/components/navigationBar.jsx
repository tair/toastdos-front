"use strict"

import React from 'react';
import  {Link} from 'react-router';

class NavigationBar extends React.Component {

    render() {
        return (
            <div className="navigation-bar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/counter">Counter</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavigationBar;