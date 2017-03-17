"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubmissionView from './submissionView';

import { canSubmit } from '../../selectors';
import {
        attemptSubmit,
        resetSubmission
    } from '../../actions';

const ConnectedSubmissionView = connect(
    createStructuredSelector({
        submitting: s => s.submission.submitting,
        submitted: s => s.submission.submitted,
        canSubmit,
        errorMessage: s => `${s.submission.submissionError}`,
    }),
    dispatch => ({
        submit: () => dispatch(attemptSubmit()),
        resetSubmission: () => dispatch(resetSubmission())
    })
)(SubmissionView);

export default ConnectedSubmissionView;
