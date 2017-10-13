"use strict";

import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import  {Link} from 'react-router';
import orcidInfo from 'resources/orcid_app_info';
import userInfoModule from 'modules/userInfo';

const AUTH_URL = orcidInfo.authUrl;

const navigationLinkStyle = {
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    WebkitUserSelect: "none", /* webkit (safari, chrome) browsers */
    MozUserSelect: "none", /* mozilla browsers */
    KhtmlUserSelect: "none", /* webkit (konqueror) browsers */
    MsUserSelect: "none"
};

const rightNavListStyle = {
    float: "right",
    textAlign: "right"
};

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProfile: false
        };

        this.onProfileClick = this.onProfileClick.bind(this);
        this.dismissProfile = this.dismissProfile.bind(this);
        this.createNavigationLink = this.createNavigationLink.bind(this);
    }

    onProfileClick() {
        this.setState({
            showProfile: !this.state.showProfile
        });
    }

    dismissProfile() {
        this.setState({
            showProfile: false
        });
    }

    createNavigationLink(linkData) {
        return (
            <NavItem key={linkData.name}>
                <Link className="nav-link text-light" style={navigationLinkStyle} to={linkData.to}>{linkData.name}</Link>
            </NavItem>
        );
    }

    render() {

        return (
            <Navbar dark color="success">
                <NavbarBrand>
                    <Link className="text-light" style={navigationLinkStyle} to="/">GOAT</Link>
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    {this.props.links.filter(l => l.show()).map(this.createNavigationLink)}
                </Nav>
                <Nav navbar>
                    {this.props.isAuthenticated ? (
                        <NavItem>
                            <NavLink
                                className="text-light"
                                onClick={this.onProfileClick}
                            >
                                {this.props.userName} &#x25BE;
                            </NavLink>
                            {this.state.showProfile ? (
                                <div style={{position: 'relative'}}>
                                    <userInfoModule.components.UserProfilePanel
                                        componentShouldDismiss={this.dismissProfile}
                                        className="profile-panel"
                                    />
                                </div>
                            ) : null}
                        </NavItem>
                    ) : (
                        <NavLink href={AUTH_URL} className="text-light">
                            Login with ORCID
                        </NavLink>
                    )}
                        
                    
                </Nav>
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {
    isAuthenticated: React.PropTypes.bool,
    userName: React.PropTypes.string,
    links: React.PropTypes.arrayOf(React.PropTypes.object)
};

NavigationBar.defaultProps = {
    links: []
};

export default NavigationBar;
