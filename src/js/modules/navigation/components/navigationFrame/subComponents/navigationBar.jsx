"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import  {Link} from 'react-router';
import orcidInfo from 'resources/orcid_public_info';
import userInfoModule from 'modules/userInfo';
import goatLogo from 'img/goat.svg';

const AUTH_URL = orcidInfo.authUrl;

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.createNavigationLink = this.createNavigationLink.bind(this);
    }

    createNavigationLink(linkData) {
        return (
            <NavItem key={linkData.name}>
                <Link className="nav-link text-light" to={linkData.to}>{linkData.name}</Link>
            </NavItem>
        );
    }

    render() {
        return (
            <Navbar dark color="success" expand="xs">
                <NavbarBrand href="/" className="nav-link text-light">
                    <img src={goatLogo} className="brand-logo" />
                    GOAT
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    {this.props.links.filter(l => l.show()).map(this.createNavigationLink)}
                </Nav>
                <Nav navbar>
                    {this.props.isAuthenticated ? (
                        <NavItem>
                            <userInfoModule.components.UserProfilePanel />
                        </NavItem>
                    ) : (
                        <NavItem>
                            <NavLink href={AUTH_URL} className="text-light">
                                Login with ORCID
                            </NavLink>
                        </NavItem>
                    )}
                </Nav>
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {
    isAuthenticated: PropTypes.bool,
    links: PropTypes.arrayOf(PropTypes.object)
};

NavigationBar.defaultProps = {
    links: []
};

export default NavigationBar;
