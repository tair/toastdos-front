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
    draftNumber,
    reviewValidated,
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
    saveDraft,
    reviewValidatedFields,
} from 'modules/submission/actions';

const ConnectedSubmissionView = connect(
    createStructuredSelector({
        publicationLocalId,
        geneOrder,
        annotationOrder,
        submitting,
        submitted,
        previewing,
        draftNumber,
        canSubmit,
        errorMessage,
        hasValidGene,
        reviewValidated,
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
        saveDraft: () => dispatch(saveDraft()),
        removeGene: (localId) => dispatch(removeGene(localId)),
        reviewValidatedFields: () => dispatch(reviewValidatedFields()),
    })
)(SubmissionView);

export default ConnectedSubmissionView;
