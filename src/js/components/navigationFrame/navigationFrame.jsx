"use strict";

import React from 'react';
import NavigationBar from './subComponents/navigationBar';

let links = [
    {
        to: '/',
        name: 'ToastDos'
    },
    {
        to: '/test',
        name: 'TEST'
    }
];

class NavigationFrame extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // set initial state
        };
    }

    render() {
        return (
            <div>
                <NavigationBar
                    {...this.props}
                    links={links}
                />
                <div>
                    {this.props.children}
                </div>
            </div>  
        );
    }
}


NavigationFrame.propTypes = {
    isAuthenticated: React.PropTypes.bool,
    onLogoutClick: React.PropTypes.func,
    userName: React.PropTypes.string
};

export default NavigationFrame;
