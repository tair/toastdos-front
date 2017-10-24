"use strict";

import React from 'react';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import CustomTextInput from "lib/components/customTextInput";
import ValidationStatus from "../validationStatus";

class ValidationInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <InputGroup>
                {this.props.title !== ''? 
                <InputGroupAddon className="bg-light-green text-dark">
                    {this.props.title}
                </InputGroupAddon>
                : null }
                <CustomTextInput
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    style={this.props.inputStyle}
                />
                <InputGroupAddon>
                    <ValidationStatus validating={this.props.validating} finalized={this.props.finalized || !!this.props.validationError} isValid={this.props.validationError == ""} />
                </InputGroupAddon>
            </InputGroup>
        );
    }
}

ValidationInput.propTypes = {
    title: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    style: React.PropTypes.any,

    finalized: React.PropTypes.bool,
    isValid: React.PropTypes.bool,
    validating: React.PropTypes.bool
};

ValidationInput.defaultProps = {
    title: '',
    children: null,
    finalized: false,
    isValid: false,
    validating: false,
};

export default ValidationInput;