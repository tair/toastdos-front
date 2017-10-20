"use strict";

import { connect } from 'react-redux';

import generateId from 'lib/idGenerator';
import EvidenceWith from './evidenceWith';
import {
    validateEvidenceWith,
    updateEvidenceWith,
    removeEvidenceWith
} from '../../actions';

const ConnectedEvidenceWith = connect(
    state => ({
        evidenceWithIndex: state.submission.evidenceWithIndex
    }),
    dispatch => ({
        updateEvidenceWith: (evidenceWithId, data) => dispatch(updateEvidenceWith(evidenceWithId, data)),
    })
)(EvidenceWith);

export default ConnectedEvidenceWith;