"use strict";

import React from 'react';
import { connect } from 'react-redux';
import EvidenceWith from 'ui/evidenceWith/listItem';
import {
    updateEvidenceWith,
    attemptValidateEvidenceWith,
} from 'domain/evidenceWith/actions';
import { evidenceWithSelector } from 'domain/evidenceWith/selectors';

const ConnectedEvidenceWith = connect(
    (state, ownProps) => ({
        evidenceWith: evidenceWithSelector(state, ownProps.localId),
    }),
    (dispatch, ownProps) => ({
        attemptValidate: (locusName) => dispatch(
            attemptValidateEvidenceWith(ownProps.localId, locusName)
        ),
        //onUpdate: (data) => dispatch(updateEvidenceWith(ownProps.localId, data)),
        onRemove: () => dispatch(ownProps.onRemove(ownProps.localId)),
    })
)(EvidenceWith);

ConnectedEvidenceWith.propTypes = {
    localId: React.PropTypes.string,
    onRemove: React.PropTypes.func,
};

export default ConnectedEvidenceWith;
