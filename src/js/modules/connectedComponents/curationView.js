"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CurationView from 'ui/curation/view';
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
    hasPendingAnnotations,
} from 'modules/curationDetail/selectors';
import {
    attemptSubmit,
    resetSubmission,
    preview,
    edit,
    addAnnotation,
    removeAnnotation,
    addGene,
    removeGene,
    requestSubmission,
} from 'modules/curationDetail/actions';

const ConnectedCurationView = connect(
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
        hasPendingAnnotations,
    }),
    dispatch => ({
        preview: () => dispatch(preview()),
        edit: () => dispatch(edit()),
        submit: () => dispatch(attemptSubmit()),
        resetSubmission: () => dispatch(resetSubmission()),
        addAnnotation: () => dispatch(addAnnotation()),
        removeAnnotation: (localId) => dispatch(removeAnnotation(localId)),
        addGene: () => dispatch(addGene()),
        removeGene: (localId) => dispatch(removeGene(localId)),
        requestSubmission: (submissionId) => dispatch(requestSubmission(submissionId)),
    })
)(CurationView);

export default ConnectedCurationView;
