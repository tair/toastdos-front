"use strict";

import React from 'react';
import { ListGroupItem, InputGroup, InputGroupAddon, Row, Col, Button } from 'reactstrap';
import ValidationInput from 'ui/validationInput';
import CustomTextInput from 'lib/components/customTextInput';

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class EvidenceWith extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentEvidenceWith = this.props.evidenceWith;
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
                        <Button color="danger"
                            onClick={this.props.onRemove}
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
    evidenceWith: React.PropTypes.object,
    evidenceWithId: React.PropTypes.any,
    attemptValidate: React.PropTypes.func,
    onRemove: React.PropTypes.func,
};

EvidenceWith.defaultProps = {
    evidenceWith: null,
    evidenceWithId: null,
    attemptValidate: () => {},
    onRemove: () => {},
};

export default EvidenceWith;
