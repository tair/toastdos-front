"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubmissionView from './submissionView';

import { canSubmit } from '../../selectors';
import {
        attemptSubmit,
        resetSubmission,
        preview,
        edit,
    } from '../../actions';

const ConnectedSubmissionView = connect(
    createStructuredSelector({
        submitting: s => s.submission.submitting,
        submitted: s => s.submission.submitted,
        previewing: s => s.submission.previewing,
        canSubmit,
        errorMessage: s => `${s.submission.submissionError}`,
    }),
    dispatch => ({
        preview: () => dispatch(preview()),
        edit: () => dispatch(edit()),
        submit: () => dispatch(attemptSubmit()),
        resetSubmission: () => dispatch(resetSubmission())
    })
)(SubmissionView);

export default ConnectedSubmissionView;
