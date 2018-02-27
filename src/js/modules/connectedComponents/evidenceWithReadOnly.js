"use strict";

import React from 'react';
import { connect } from 'react-redux';
import EvidenceWithReadOnly from 'ui/evidenceWith/listItemReadOnly';
import { evidenceWithSelector } from 'domain/evidenceWith/selectors';

const ConnectedEvidenceWithReadOnly = connect(
    (state, ownProps) => ({
        evidenceWith: evidenceWithSelector(state, ownProps.localId),
        evidenceWithId: ownProps.localId,
    }),
    () => ({})
)(EvidenceWithReadOnly);

ConnectedEvidenceWithReadOnly.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedEvidenceWithReadOnly;
