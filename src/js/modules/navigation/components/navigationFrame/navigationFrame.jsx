"use strict";

import React from 'react';
import NavigationBar from './subComponents/navigationBar';

class NavigationFrame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let links = [
            {
                to: '/submission',
                name: 'Submission',
                show: () => this.props.userRoles.includes('Researcher')
            },
            {
                to: '/curation',
                name: 'Curation',
                show: () => this.props.userRoles.includes('Curator')
            },
            {
                to: '/exports',
                name: 'Exports',
                show: () => true
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
    userRoles: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default NavigationFrame;
