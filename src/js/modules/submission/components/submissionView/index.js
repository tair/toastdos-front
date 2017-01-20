"use strict";

import { connect } from 'react-redux';
import SubmissionView from './submissionView';
import {
        submitSubmission,
        resetSubmission
    } from '../../actions';

const ConnectedSubmissionView = connect(
    state => ({
        submitting: state.submission.submitting,
        submitted: state.submission.submitted
    }),
    dispatch => ({
        submit: () => dispatch(submitSubmission()),
        resetSubmission: () => dispatch(resetSubmission())
    })
)(SubmissionView);

export default ConnectedSubmissionView;
