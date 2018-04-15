"use strict";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EvidenceWith from 'ui/evidenceWith/listItem';
import {
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
    localId: PropTypes.string,
    onRemove: PropTypes.func,
};

export default ConnectedEvidenceWith;
