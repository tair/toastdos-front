"use strict";

import React from 'react';
import  {Link} from 'react-router';
import EditableLabel from '../lib/editableLabel';


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

    handleEmailChange() {

    }

    validateEmail() {

    }

    render() {

        const containerStyle = {
            position: "absolute",
            display: "block",
            width: "240px",
            right: 0,
            textAlign: 'left',
            fontSize: "1.1em"
        };

        const profileDataContainerStyle = {
            padding: '7px',
            display: "fixed"
            // width: "100%"
        };

        const profileDataStyle = {
            whiteSpace: "noWrap",
            width: "100%",
            textOverflow: "ellipsis",
            marginBottom: "7px"
        };

        const logoutButtonContainerStyle = {
            width: "100%",
            borderTop: "solid 1px #FFFFFF"
        };

        const logoutButtonStyle = {
            padding: "15px 10px",
            textDecoration: "none",
            display: "block",
            textAlign: "center"
        };

        const profileDataLabelStyle = {
            fontSize: '0.7em'
        };

        return (
            <div style={containerStyle} className={this.props.className} onMouseDown={this.handleMouseDown}>
                <div style={profileDataContainerStyle}>
                    <div style={profileDataStyle}>
                        <div style={profileDataLabelStyle}>ORCID:</div>
                        <div>{this.props.orcid}</div>
                    </div>
                    <div style={profileDataStyle}>
                        <div style={profileDataLabelStyle}>EMAIL:</div>
                        <div>
                            <EditableLabel
                                placeholder="Add Email..."
                                value={this.props.email}
                                className="email-label"
                                editingClassName="email-label-editing"
                                inputType="email"
                                onSubmit={this.props.onEmailChange}
                            />
                        </div>
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
    componentShouldDismiss: React.PropTypes.func,
    className: React.PropTypes.string
};

UserProfilePanel.defaultProps = {
    className: ""
};

export default UserProfilePanel;
