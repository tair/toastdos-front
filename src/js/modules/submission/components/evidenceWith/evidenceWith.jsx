"use strict";

import React from 'react';

import CustomTextInput from "lib/components/customTextInput";

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class EvidenceWith extends React.Component {
    constructor(props) {
        super(props);
    }

    getEWColor(finalized, isValid) {
        if (finalized) {
            return isValid ? "green" : "red";
        } else {
            return "black";
        }
    }

    getEWStatus(finalized, isValid) {
        let className = "fa fa-fw ";
        if (finalized) {
            return className + (isValid ? "fa-check" : "fa-exclamation-circle");
        } else {
            return className + "fa-chain";
        }
    }

    render() {
        const currentEvidenceWith = this.props.evidenceWithIndex[this.props.evidenceWithId];
        return (
            <div style={inputContainerStyle} key={`evidence_with_${this.props.evidenceWithId}`}>
                <CustomTextInput 
                    placeholder="e.g. a locus, protein"
                    value={currentEvidenceWith.locusName}
                    onChange={event => this.props.updateEvidenceWith(this.props.evidenceWithId, {
                        ...this.props,
                        evidenceWithIndex: {
                            ...this.props.evidenceWithIndex,
                            [this.props.evidenceWithId]: {
                                ...currentEvidenceWith,
                                finalized: false,
                                locusName: event.target.value
                            }
                        }
                    })}
                    onBlur={() => {this.props.validateEvidenceWith(this.props.evidenceWithId);}}
                    style={{ marginRight: 10 }}
                />
                <div className={this.getEWStatus(currentEvidenceWith.finalized, currentEvidenceWith.isValid)}
                    style={{ color: this.getEWColor(currentEvidenceWith.finalized, currentEvidenceWith.isValid) }} />
            </div>
        );
    }
}

EvidenceWith.propTypes = {
    evidenceWithIndex: React.PropTypes.object,
    evidenceWithId: React.PropTypes.any,
    validateEvidenceWith: React.PropTypes.func,
    updateEvidenceWith: React.PropTypes.func
};

EvidenceWith.defaultProps = {
    evidenceWithIndex: {},
    validateEvidenceWith: () => {},
    updateEvidenceWith: () => {}
};

export default EvidenceWith;