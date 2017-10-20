"use strict";

import React from 'react';
import { ListGroupItem, InputGroup, InputGroupAddon, Row, Col, Button } from 'reactstrap';
import ValidationStatus from "../validationStatus";
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
        let currentEvidenceWith = this.props.evidenceWithIndex[this.props.evidenceWithId];
        
        return (
            <ListGroupItem key={`evidence_with_${this.props.evidenceWithId}`}>
                <Row>
                    <Col>
                        <InputGroup>
                            <CustomTextInput
                                placeholder="e.g. a locus, protein"
                                value={currentEvidenceWith.locusName}
                                onChange={event => this.props.updateEvidenceWith(this.props.evidenceWithId,
                                    {
                                        ...currentEvidenceWith,
                                        finalized: false,
                                        locusName: event.target.value
                                    }
                                )}
                                onBlur={() => { this.props.validateEvidenceWith(this.props.evidenceWithId); }}
                                style={{ marginRight: 10 }}
                            />
                            <InputGroupAddon>
                                <ValidationStatus finalized={currentEvidenceWith.finalized} isValid={currentEvidenceWith.isValid} />
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                    <Col sm="auto" className="text-right input-container">
                        <Button color="danger"
                            onClick={this.props.removeEvidenceWith}
                        >
                            <span className="fa fa-close" title="Remove Evidence With"></span>
                        </Button>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
}

EvidenceWith.propTypes = {
    evidenceWithIndex: React.PropTypes.object,
    evidenceWithId: React.PropTypes.any,
    validateEvidenceWith: React.PropTypes.func,
    updateEvidenceWith: React.PropTypes.func,
    removeEvidenceWith: React.PropTypes.func
};

EvidenceWith.defaultProps = {
    evidenceWithIndex: {},
    validateEvidenceWith: () => {},
    updateEvidenceWith: () => {},
    removeEvidenceWith: () => {}
};

export default EvidenceWith;