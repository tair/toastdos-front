"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Row, Col, Card } from 'reactstrap';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(!this.props.isAuthenticating && this.props.location.query.code && !this.props.loginError) {
            this.props.attemptLogin(this.props.location.query.code);
        }

        if(!this.props.location.query.code) {
            browserHistory.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isAuthenticated) {
            browserHistory.push("/");
        }
    }

    render() {
        return (
            <Row className="justify-content-center mt-5">
                <Col sm="3">
                    <Card className="text-center py-3">
                        {this.renderInner()}
                    </Card>
                </Col>
            </Row>
        );
    }

    renderInner() {
        if(this.props.location.query.error) {
            return(
                <div>
                    <h3>Error</h3>
                    <span>{this.props.location.query.error_description}</span>
                </div>);
        }
        return (
            this.props.isAuthenticating ? (
                <span><span className="fa fa-refresh fa-spin" /> Authenticating... </span>
            ) : (
                <span>Not Authenticated</span>
            )
        );
    }
}

LoginView.propTypes = {
    attemptLogin: PropTypes.func,
    isAuthenticating: PropTypes.bool,
    isAutheticated: PropTypes.bool,
    loginError: PropTypes.object,
};


export default LoginView;


