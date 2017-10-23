"use strict";

import { connect } from 'react-redux';

import generateId from 'lib/idGenerator';
import EvidenceWith from './evidenceWith';
import {
    validateEvidenceWith,
    updateEvidenceWith,
    removeEvidenceWith,
    clearEvidenceWith
} from '../../actions';

const ConnectedEvidenceWith = connect(
    state => ({
        evidenceWithIndex: state.submission.evidenceWithIndex
    }),
    dispatch => ({
        updateEvidenceWith: (evidenceWithId, data) => dispatch(updateEvidenceWith(evidenceWithId, data)),
        clearEvidenceWith: (evidenceWithId) => dispatch(clearEvidenceWith(evidenceWithId))
    })
)(EvidenceWith);

export default ConnectedEvidenceWith;