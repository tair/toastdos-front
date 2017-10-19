"use strict";

import React from 'react';

class ValidationStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    getEWColor() {
        if (this.props.finalized) {
            return this.props.isValid? "green": "red";
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
            return className +  (this.props.isValid? "fa-check": "fa-exclamation-circle");
        } else {
            return className + "fa-chain";
        }
    }

    render() {
        return (
            <span className={this.getEWStatus()}
                style={{color: this.getEWColor()}} >
            </span>
        );
    }
}

ValidationStatus.propTypes = {
    finalized: React.PropTypes.bool,
    isValid: React.PropTypes.bool,
    validating: React.PropTypes.bool
};

ValidationStatus.defaultProps = {
    finalized: false,
    isValid: false,
    validating: false,
};

export default ValidationStatus;