"use strict";

import React from 'react';
import { ListGroupItem } from 'reactstrap';

class EvidenceWithReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isListGroupItem) {
            return (
                <ListGroupItem key={`evidence_with_${this.props.evidenceWithId}`}>
                    {this.props.evidenceWith.locusName}
                </ListGroupItem>
            );
        } else {
            return (
                <span key={`evidence_with_${this.props.evidenceWithId}`}>
                    {this.props.evidenceWith.locusName}
                </span>
            );
        }
    }
}

EvidenceWithReadOnly.propTypes = {
    evidenceWith: React.PropTypes.object,
    evidenceWithId: React.PropTypes.string,
    isListGroupItem: React.PropTypes.bool,
};

EvidenceWithReadOnly.defaultProps = {
    evidenceWith: null,
    evidenceWithId: null,
    isListGroupItem: true,
};

export default EvidenceWithReadOnly;
