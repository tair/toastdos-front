"use strict";

import React from 'react';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import CustomTextInput from "lib/components/customTextInput";
import ValidationStatus from "../validationStatus";
import { validationStates } from "../../constants";

class ValidationInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };

        this.lastValue = '';
        this.debouncer = null;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.determineAttemptValidate = this.determineAttemptValidate.bind(this);
    }

    onKeyDown(event){
        // trigger validation on enter
        if(event.keyCode === 13) {
            event.preventDefault();
            this.determineAttemptValidate();
            return false;
        }
    }

    onChange(event) {
        this.setState({
            value: (this.props.upperCaseOnly ) ? event.target.value.toUpperCase() : event.target.value,
        });
    }

    componentDidUpdate() {
        if (this.debouncer) {
            clearTimeout(this.debouncer);
        }

        this.debouncer = setTimeout(() => {
            this.determineAttemptValidate();
        }, 500);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value && nextProps.validationState === validationStates.NOT_VALIDATED) {
            this.setState({
                value: nextProps.value,
            });
        }
    }

    determineAttemptValidate(){
        // only attempt validation if the value was changed
        if (this.state.value == this.lastValue) {
            return false;
        }
        this.lastValue = this.state.value;
        this.props.attemptValidate(this.state.value);
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
                    value={this.state.value}
                    required={this.props.required}
                    onChange={this.onChange}
                    onBlur={this.determineAttemptValidate}
                    onKeyDown={this.onKeyDown}
                />
                <InputGroupAddon>
                    <ValidationStatus
                        validationState={this.props.validationState}
                        validationError={this.props.validationError} />
                </InputGroupAddon>
            </InputGroup>
        );
    }
}

ValidationInput.propTypes = {
    title: React.PropTypes.string,
    hasValidationStatus: React.PropTypes.bool,
    isSmartTextInput: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    attemptValidate: React.PropTypes.func,
    validationError: React.PropTypes.string,
    upperCaseOnly: React.PropTypes.bool,
    required: React.PropTypes.bool,
    validationState: React.PropTypes.string,
};

ValidationInput.defaultProps = {
    title: '',
    hasValidationStatus: false,
    isSmartTextInput: false,
    children: null,
    validationError: '',
    upperCaseOnly: false,
    required: false,
    validationState: validationStates.NOT_VALIDATED,
};

export default ValidationInput;