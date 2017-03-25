"use strict";

import React from 'react';
import  {Link} from 'react-router';
import orcidInfo from 'resources/orcid_app_info';
import userInfoModule from 'modules/userInfo';

const AUTH_URL = orcidInfo.authUrl;

const navigationBarStyle = {
    display: "block",
    padding: "0 50px"
};

const navigationListStyle = {
    width: "50%",
    display: "inline",
    padding: 0,
    margin: 0,
    listStyle: "none"
};

const navigationLinkStyle = {
    cursor: "pointer",
    display: "block",
    height: "100%",
    padding: "15px 10px",
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
            <li style={{display: 'inline-block'}} key={linkData.name}>
                <Link style={navigationLinkStyle} to={linkData.to}>{linkData.name}</Link>
            </li>
        );
    }

    render() {

        return (
            <div className="navigation-bar" style={navigationBarStyle}>
                <ul style={navigationListStyle}>
                    {this.props.links.map(this.createNavigationLink)}
                </ul>
                <ul style={Object.assign({}, navigationListStyle, rightNavListStyle)}>
                    
                    {this.props.isAuthenticated ? (
                        <li style={{display: 'inline', float: 'right'}}>
                            <button
                                style={navigationLinkStyle}
                                onClick={this.onProfileClick}
                            >
                                {this.props.userName} &#x25BE;
                            </button>
                            {this.state.showProfile ? (
                                <div style={{position: 'relative'}}>
                                    <userInfoModule.components.UserProfilePanel
                                        componentShouldDismiss={this.dismissProfile}
                                        className="profile-panel"
                                    />
                                </div>
                            ) : null}
                        </li>
                    ) : (
                        <li style={{display: 'inline-block', float: 'right'}}>
                            <a style={navigationLinkStyle} href={AUTH_URL}>Login with ORCID</a>
                        </li>
                    )}
                        
                    
                </ul>
            </div>
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
