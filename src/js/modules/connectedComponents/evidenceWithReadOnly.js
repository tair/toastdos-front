"use strict";

import PropTypes from 'prop-types';
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
    localId: PropTypes.string,
};

export default ConnectedEvidenceWithReadOnly;
