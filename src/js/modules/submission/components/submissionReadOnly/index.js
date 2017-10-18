"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubmissionReadOnly from './submissionReadOnly';

import {
    geneListSelector, 
    annotationListSelector,
    publicationSelector,
    evidenceWithSelector} from '../../selectors';
import {
        attemptSubmit,
        resetSubmission,
        preview,
        edit,
    } from '../../actions';

const ConnectedSubmissionReadOnly = connect(
    createStructuredSelector({
        publication: publicationSelector,
        genes: geneListSelector,
        annotations: annotationListSelector,
        evidenceWith: evidenceWithSelector,
        geneIndex: s => s.submission.geneIndex
    }), dispatch => ({})
)(SubmissionReadOnly);

export default ConnectedSubmissionReadOnly;
