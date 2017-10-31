"use strict";

import React from 'react';
import  {Link} from 'react-router';
import EditableLabel from 'lib/components/editableLabel';
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
    name: React.PropTypes.string,
    orcid: React.PropTypes.string,
    email: React.PropTypes.string,
    onEmailChange: React.PropTypes.func,
    onLogoutClick: React.PropTypes.func,
    className: React.PropTypes.string
};

UserProfilePanel.defaultProps = {
    className: ""
};

export default UserProfilePanel;
