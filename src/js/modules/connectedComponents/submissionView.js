"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubmissionView from 'ui/submission/view';
import {
    publicationLocalId,
    geneOrder,
    annotationOrder,
    hasValidGene,
    submitting,
    submitted,
    previewing,
    canSubmit,
    errorMessage,
} from 'modules/submission/selectors';
import {
    initialize,
    attemptSubmit,
    resetSubmission,
    preview,
    edit,
    addAnnotation,
    removeAnnotation,
    addGene,
    removeGene,
} from 'modules/submission/actions';

const ConnectedSubmissionView = connect(
    createStructuredSelector({
        publicationLocalId,
        geneOrder,
        annotationOrder,
        submitting,
        submitted,
        previewing,
        canSubmit,
        errorMessage,
        hasValidGene,
    }),
    dispatch => ({
        initialize: () => dispatch(initialize()),
        preview: () => dispatch(preview()),
        edit: () => dispatch(edit()),
        submit: () => dispatch(attemptSubmit()),
        resetSubmission: () => dispatch(resetSubmission()),
        addAnnotation: () => dispatch(addAnnotation()),
        removeAnnotation: (localId) => dispatch(removeAnnotation(localId)),
        addGene: () => dispatch(addGene()),
        removeGene: (localId) => dispatch(removeGene(localId)),
    })
)(SubmissionView);

export default ConnectedSubmissionView;
