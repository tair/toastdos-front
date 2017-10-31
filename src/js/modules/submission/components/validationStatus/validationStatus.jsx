"use strict";

import React from 'react';

import { Popover, PopoverBody } from 'reactstrap';
import generateId from 'lib/idGenerator';
import { validationStates } from '../../constants';

class ValidationStatus extends React.Component {
    constructor(props) {
        super(props);
        this.validationId = 'validation_status_' + generateId();
    }

    getEWColor() {
        switch (this.props.validationState) {
            case validationStates.VALID:
                return "green";
            case validationStates.INVALID:
                return "red";
            default:
                return "black";
        }
    }

    getEWStatus() {
        let className = "fa fa-fw ";
        switch (this.props.validationState) {
            case validationStates.VALIDATING:
                return className + "fa-spin fa-refresh";
            case validationStates.VALID:
                return className + "fa-check";
            case validationStates.INVALID:
                return className + "fa-exclamation-circle";
            default:
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
    validationState: React.PropTypes.string,
    validationError: React.PropTypes.string
};

ValidationStatus.defaultProps = {
    validationState: validationStates.NOT_VALIDATED,
    validationError: ''
};

export default ValidationStatus;