"use strict";

import React from 'react';
import { ListGroupItem } from 'reactstrap';

class EvidenceWithReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem key={`evidence_with_${this.props.evidenceWithId}`}>
                {this.props.evidenceWith.locusName}
            </ListGroupItem>
        );
    }
}

EvidenceWithReadOnly.propTypes = {
    evidenceWith: React.PropTypes.object,
    evidenceWithId: React.PropTypes.string,
};

EvidenceWithReadOnly.defaultProps = {
    evidenceWith: null,
    evidenceWithId: null,
};

export default EvidenceWithReadOnly;
