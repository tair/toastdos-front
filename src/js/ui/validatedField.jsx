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
            loaded: false,
        };
        this.shouldDisplay = this.shouldDisplay.bind(this);
    }

    shouldDisplay() {
        return (
            this.state.loaded &&
            this.props.reviewValidated &&
            !this.props.isValid
        );
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
    reviewValidated: React.PropTypes.bool,
    invalidMessage: React.PropTypes.string,
};

ValidatedField.defaultProps = {
    isValid: false,
    reviewValidated: false,
    invalidMessage: 'This field is not valid.',
};

export default ValidatedField;
