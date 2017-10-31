"use strict";

import React from 'react';
import { ListGroupItem, InputGroup, InputGroupAddon, Row, Col, Button } from 'reactstrap';
import ValidationInput from "../validationInput";
import CustomTextInput from "lib/components/customTextInput";

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class EvidenceWith extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentEvidenceWith = this.props.evidenceWithIndex[this.props.evidenceWithId];

        return (
            <ListGroupItem key={`evidence_with_${this.props.evidenceWithId}`}>
                <Row>
                    <Col>
                        <ValidationInput
                            validationState={currentEvidenceWith.validationState}
                            validationError={currentEvidenceWith.validationError}
                            placeholder="e.g. a locus, protein"
                            value={currentEvidenceWith.locusName}
                            attemptValidate={this.props.attemptValidate}
                            upperCaseOnly={true}
                            required={true}
                        />
                    </Col>
                    <Col sm="auto" className="text-right input-container">
                        {(this.props.annotationData.data.evidenceWithOrder.length === 1)?(
                        <Button color="danger"
                            onClick={() => this.props.clearEvidenceWith(this.props.evidenceWithId)}
                        >
                            <span className="fa fa-close" title="Remove Evidence With"></span>
                        </Button>
                        ):(
                        <Button color="danger"
                            onClick={this.props.removeEvidenceWith}
                        >
                            <span className="fa fa-close" title="Remove Evidence With"></span>
                        </Button>
                        )}
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
}

EvidenceWith.propTypes = {
    evidenceWithIndex: React.PropTypes.object,
    evidenceWithId: React.PropTypes.any,
    annotationData: React.PropTypes.any,
    attemptValidate: React.PropTypes.func,
    updateEvidenceWith: React.PropTypes.func,
    removeEvidenceWith: React.PropTypes.func,
    clearEvidenceWith: React.PropTypes.func
};

EvidenceWith.defaultProps = {
    evidenceWithIndex: {},
    attemptValidate: () => {},
    updateEvidenceWith: () => {},
    removeEvidenceWith: () => {},
    clearEvidenceWith: () => {}
};

export default EvidenceWith;