"use strict";

import React from 'react';
import  {Link} from 'react-router';
import orcidInfo from 'resources/orcid_app_info';
import UserProfilePanel from '../../userProfilePanel/connectedUserProfilePanel';

const AUTH_URL = orcidInfo.authUrl;

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProfile: false
        };

        this.onProfileClick = this.onProfileClick.bind(this);
        this.dismissProfile = this.dismissProfile.bind(this);
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

    render() {
        return (
            <div className="navigation-bar">
                <ul>
                    <li>
                        <Link to="/">ToastDos</Link>
                    </li>
                    <li>
                        <Link to="/test">TEST</Link>
                    </li>
                </ul>
                <ul className="right-nav">
                    
                    {this.props.isAuthenticated ? (
                        <div>
                            <li>
                                <span onClick={this.onProfileClick}>{this.props.userName}</span>
                                {this.state.showProfile ? (
                                    <div style={{position: 'relative'}}>
                                        <UserProfilePanel componentShouldDismiss={this.dismissProfile} />
                                    </div>
                                ) : null}
                            </li>
                        </div>
                    ) : (
                        <li>
                            <a href={AUTH_URL}>Login with ORCID</a>
                        </li>
                    )}
                        
                    
                </ul>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    isAuthenticated: React.PropTypes.bool,
    userName: React.PropTypes.string
};

export default NavigationBar;
