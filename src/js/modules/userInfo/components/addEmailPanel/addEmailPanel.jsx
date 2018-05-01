"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import CustomTextInput from 'lib/components/customTextInput';
import { Alert } from 'reactstrap';


class AddEmailPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email
        };
        this.onChange = this.onChange.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
    }

    updateEmail(event) {
        let emailInput = event.target;
        if (emailInput.checkValidity()) {
            this.props.onEmailChange(emailInput.value);
        } else {

            setTimeout(() => {
                emailInput.reportValidity();
            }, 10);
        }
    }

    onChange(event) {
        this.setState({email: event.target.value});
    }

    getDerivedStateFromProps(nextProps, prevState) {
        prevState.email = nextProps.email;
    }

    render() {
        return (
            <div>
                <CustomTextInput
                    placeholder="Email Address (optional)"
                    value={this.state.email}
                    type="email"
                    onBlur={this.updateEmail}
                    onChange={this.onChange}
                />
                <br />
                <Alert color="info"><span className="fa fa-info-circle" /> We wil only use your email to contact you about updates to your submissions.</Alert>
            </div>
        );
    }
}

AddEmailPanel.propTypes = {
    email: PropTypes.string,
    onEmailChange: PropTypes.func,
};

AddEmailPanel.defaultProps = {
    email: ""
};

export default AddEmailPanel;
