"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';


class UserProfilePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfile: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            showProfile: !this.state.showProfile
        });
    }

    render() {
        // TODO: Add split dropdown so that email editing/ other info still works.
        return (
            <Dropdown isOpen={this.state.showProfile} toggle={this.toggle}>
                <DropdownToggle caret color="link" className="nav-link text-light"
                style={{cursor: 'pointer'}}>
                    {this.props.name}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={this.props.onLogoutClick}>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

UserProfilePanel.propTypes = {
    name: PropTypes.string,
    orcid: PropTypes.string,
    email: PropTypes.string,
    onEmailChange: PropTypes.func,
    onLogoutClick: PropTypes.func,
    className: PropTypes.string
};

UserProfilePanel.defaultProps = {
    className: ""
};

export default UserProfilePanel;
