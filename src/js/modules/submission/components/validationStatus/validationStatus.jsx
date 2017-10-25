"use strict";

import React from 'react';

import { Popover, PopoverBody } from 'reactstrap';
import generateId from 'lib/idGenerator';

class ValidationStatus extends React.Component {
    constructor(props) {
        super(props);
        this.validationId = 'validation_status_' + generateId();
    }

    getEWColor() {
        if (this.props.finalized) {
            return !this.props.validationError? "green": "red";
        } else {
            return "black";
        }
    }

    getEWStatus() {
        let className = "fa fa-fw ";
        if (this.props.validating) {
            return className + "fa-spin fa-refresh";
        }
        if (this.props.finalized) {
            return className +  (!this.props.validationError? "fa-check": "fa-exclamation-circle");
        } else {
            return className + "fa-chain";
        }
    }

    render() {
        return (
            <div>
                <span id={this.validationId} className={this.getEWStatus()}
                    style={{color: this.getEWColor()}} >
                </span>
                <Popover placement="bottom" isOpen={!!this.props.validationError} 
                    target={this.validationId}>
                    <PopoverBody className="text-danger">
                        <strong>{this.props.validationError}</strong>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

ValidationStatus.propTypes = {
    finalized: React.PropTypes.bool,
    validating: React.PropTypes.bool,
    validationError: React.PropTypes.string
};

ValidationStatus.defaultProps = {
    finalized: false,
    validating: false,
    validationError: ''
};

export default ValidationStatus;