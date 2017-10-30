"use strict";

import React from 'react';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import CustomTextInput from "lib/components/customTextInput";
import ValidationStatus from "../validationStatus";

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
                    onChange={this.onChange}
                    onBlur={this.determineAttemptValidate}
                    onKeyDown={this.onKeyDown}
                />
                <InputGroupAddon>
                    <ValidationStatus validating={this.props.validating} finalized={this.props.finalized || !!this.props.validationError} validationError={this.props.validationError} />
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
    attemptValidate: React.PropTypes.func,
    finalized: React.PropTypes.bool,
    validationError: React.PropTypes.string,
    validating: React.PropTypes.bool,
    upperCaseOnly: React.PropTypes.bool,
};

ValidationInput.defaultProps = {
    title: '',
    children: null,
    finalized: false,
    validationError: '',
    validating: false,
    upperCaseOnly: false,
};

export default ValidationInput;