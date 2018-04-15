"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, Row, Col, Button } from 'reactstrap';
import ValidationInput from 'ui/validationInput';


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
    evidenceWith: PropTypes.object,
    evidenceWithId: PropTypes.any,
    attemptValidate: PropTypes.func,
    onRemove: PropTypes.func,
};

EvidenceWith.defaultProps = {
    evidenceWith: null,
    evidenceWithId: null,
    attemptValidate: () => {},
    onRemove: () => {},
};

export default EvidenceWith;
