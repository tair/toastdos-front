"use strict";

import React from 'react';
import NavigationBar from './subComponents/navigationBar';


let links = [
    {
        to: '/',
        name: 'GOAT'
    },
    {
        to: '/submission',
        name: 'Submission'
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

        let links = [
            {
                to: '/',
                name: 'ToastDos',
                show: () => true
                
            },
            {
                to: '/submission',
                name: 'Submission',
                show: () => this.props.userRoles.includes('Researcher')
            },
            {
                to: '/curation',
                name: 'Curation',
                show: () => this.props.userRoles.includes('Curator')
            }
        ];

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
    userName: React.PropTypes.string,
    userRoles: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default NavigationFrame;
