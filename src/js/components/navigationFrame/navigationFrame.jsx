"use strict";

import React, {PropTypes} from 'react';
import NavigationBar from './subComponents/navigationBar';

class NavigationFrame extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // set initial state
        }
    }

    render() {
        return (
            <div>
                <NavigationBar
                    {...this.props}
                />
                <div>
                    {this.props.children}
                </div>
            </div>  
        )
    }
}


NavigationFrame.propTypes = {
    isAuthenticated: React.PropTypes.bool,
    onLogoutClick: React.PropTypes.func
}

export default NavigationFrame;