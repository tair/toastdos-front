"use strict";

import { connect } from 'react-redux';

import generateId from 'lib/idGenerator';
import EvidenceWith from './evidenceWith';
import {
    validateEvidenceWith,
    updateEvidenceWith
} from '../../actions';

const ConnectedEvidenceWith = connect(
    state => ({
        evidenceWithIndex: state.submission.evidenceWithIndex
    }),
    dispatch => ({
        validateEvidenceWith: (annotationId, evidenceWithId) => dispatch(validateEvidenceWith(annotationId, evidenceWithId)),
        updateEvidenceWith: (evidenceWithId, data) => dispatch(updateEvidenceWith(evidenceWithId, data))
    })
)(EvidenceWith);

export default ConnectedEvidenceWith;