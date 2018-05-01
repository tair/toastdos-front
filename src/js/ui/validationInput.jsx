"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import CustomTextInput from 'lib/components/customTextInput';
import ValidationStatus from 'ui/validationStatus';
import { validationStates } from 'lib/validation';

class ValidationInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };

        this.lastValue = this.props.value;
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

    componentDidMount() {
        if (this.props.validationState === validationStates.NOT_VALIDATED &&
        !!this.state.value) {
            this.props.attemptValidate(this.state.value);
        }
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
        if (nextProps.value !== this.state.value &&
            nextProps.validationState === validationStates.NOT_VALIDATED) {
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
                <InputGroupAddon className="bg-light-green text-dark"
                    addonType='prepend'>
                    <InputGroupText>
                        {this.props.title}
                    </InputGroupText>
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
                <InputGroupAddon addonType='append'>
                    <InputGroupText>
                        <ValidationStatus
                            validationState={this.props.validationState}
                            validationError={this.props.validationError} />
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        );
    }
}

ValidationInput.propTypes = {
    title: PropTypes.string,
    hasValidationStatus: PropTypes.bool,
    isSmartTextInput: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    attemptValidate: PropTypes.func,
    validationError: PropTypes.string,
    upperCaseOnly: PropTypes.bool,
    required: PropTypes.bool,
    validationState: PropTypes.string,
};

ValidationInput.defaultProps = {
    title: '',
    hasValidationStatus: false,
    isSmartTextInput: false,
    value: '',
    children: null,
    validationError: '',
    upperCaseOnly: false,
    required: false,
    validationState: validationStates.NOT_VALIDATED,
};

export default ValidationInput;
