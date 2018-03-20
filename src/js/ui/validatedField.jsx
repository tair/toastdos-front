"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Popover, PopoverBody } from 'reactstrap';
import generateId from 'lib/idGenerator';


class ValidatedField extends React.Component {
    constructor(props) {
        super(props);
        this.validationId = 'validated_field_' + generateId();

        this.state = {
            valid: this.props.isValid,
            loaded: false,
        };
        this.toggle = this.toggle.bind(this);
        this.shouldDisplay = this.shouldDisplay.bind(this);
    }

    toggle() {
        this.setState(s => {
            return {
                valid: !s.valid,
            };
        });
    }

    shouldDisplay() {
        return this.state.loaded && !this.state.valid;
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    componentDidUpdate() {
        if (this.shouldDisplay()) {
            ReactDOM.findDOMNode(this).scrollIntoView();
        }
    }

    render() {
        return (
            <div>
                <span id={this.validationId}>
                    {this.props.children}
                </span>
                <Popover placement="top" isOpen={this.shouldDisplay()}
                    target={this.validationId}>
                    <PopoverBody className="text-danger">
                        <strong>{this.props.invalidMessage}</strong>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}


ValidatedField.propTypes = {
    isValid: React.PropTypes.bool,
    invalidMessage: React.PropTypes.string,
};

ValidatedField.defaultProps = {
    isValid: false,
    invalidMessage: 'This field is not valid.',
};

export default ValidatedField;
