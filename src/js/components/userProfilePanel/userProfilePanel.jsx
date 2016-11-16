"use strict";

import React from 'react';
import  {Link} from 'react-router';


class UserProfilePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clicking: true
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // console.log(event);
        if(this.state.clicking) {
            this.setState({
                clicking: false
            });
        } else {
            this.props.componentShouldDismiss();
        }

    }

    handleMouseDown() {
        this.setState({
            clicking: true
        });
    }
    
    componentDidMount() {
        window.addEventListener("click", this.handleClick);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.handleClick);
    }

    render() {

        let containerStyle = {
            position: "absolute",
            display: "block",
            minWidth: "200px",
            backgroundColor: "#428cf4",
            zIndex: 1,
            right: 0,
            textAlign: 'left',
            color: "#FFFFFF"
        };

        let profileDataStyle = {
            padding: "7px"
        };

        let logoutButtonContainerStyle = {
            width: "100%",
            height: "50px",
            borderTop: "solid 1px #FFFFFF"
        };

        let logoutButtonStyle = {
            padding: "15px 10px",
            textDecoration: "none",
            display: "block",
            textAlign: "center"
        };

        let profileDataLabelStyle = {
            fontSize: '0.7em'
        };

        return (
            <div style={containerStyle} onMouseDown={this.handleMouseDown}>
                <div style={profileDataStyle}>
                    <div style={profileDataLabelStyle}>ORCID:</div>
                    <div>{this.props.orcid}</div>
                </div>
                <div style={profileDataStyle}>
                    <div style={profileDataLabelStyle}>EMAIL:</div>
                    <div>
                        {this.props.email ?
                            (this.props.email) :
                            (<em>No Email</em>)
                        }
                    </div>
                </div>
                <div style={logoutButtonContainerStyle}>
                    <Link style={logoutButtonStyle} to="/" onClick={this.props.onLogoutClick}>Logout</Link>
                </div>
            </div>
        );
    }
}

UserProfilePanel.propTypes = {
    name: React.PropTypes.string,
    orcid: React.PropTypes.string,
    email: React.PropTypes.string,
    onEmailChange: React.PropTypes.func,
    onLogoutClick: React.PropTypes.func,
    componentShouldDismiss: React.PropTypes.func
};

export default UserProfilePanel;
