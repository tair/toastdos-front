"use strict";

import AuthModule from 'modules/authentication';
import { submitSubmission } from 'lib/api';
import * as actions from './actionTypes';
import * as publicationActions from 'domain/publication/actions';
import * as geneActions from 'domain/gene/actions';
import * as annotationActions from 'domain/annotation/actions';
import {
    submissionBodySelector,
    publicationLocalId,
    annotationOrder,
    geneOrder,
} from './selectors';

export function initialize() {
    return dispatch => {
        // Create publication for submission
        let newPub = publicationActions.addNew();
        dispatch(newPub);

        // Link the newly created publication to the submission
        dispatch(setPublication(newPub.localId));

        // Create gene for submission
        dispatch(addGene());
    };
}

export function addGene() {
    return dispatch => {
        // Create the new gene
        let newGene = geneActions.addNew();
        dispatch(newGene);

        // Link the newly created gene to the submission
        dispatch(addToGeneOrder(newGene.localId));
    };
}

export function removeGene(geneLocalId) {
    return dispatch => {
        // Delete the gene
        dispatch(geneActions.removeGene(geneLocalId));

        // Remove the link to the gene
        dispatch(removeFromGeneOrder(geneLocalId));
    };
}

export function addToGeneOrder(geneLocalId) {
    return {
        type: actions.ADD_GENE,
        geneLocalId,
    };
}

export function removeFromGeneOrder(geneLocalId) {
    return {
        type: actions.REMOVE_GENE,
        geneLocalId,
    };
}

export function addAnnotation() {
    return (dispatch, getState) => {
        // Create the new annotation
        let newAnnotation = annotationActions.addNew()(dispatch, getState);

        // Link the newly created annotation to the submission
        dispatch(addToAnnotationOrder(newAnnotation.localId));
    };
}

export function removeAnnotation(annotationLocalId) {
    return dispatch => {
        // Delete the annotation
        dispatch(annotationActions.remove(annotationLocalId));

        // Remove the link to the annotation
        dispatch(removeFromAnnotationOrder(annotationLocalId));
    };
}

export function addToAnnotationOrder(annotationLocalId) {
    return {
        type: actions.ADD_ANNOTATION,
        annotationLocalId,
    };
}

export function removeFromAnnotationOrder(annotationLocalId) {
    return {
        type: actions.REMOVE_ANNOTATION,
        annotationLocalId,
    };
}

export function setPublication(publicationLocalId) {
    return {
        type: actions.SET_PUBLICATION,
        publicationLocalId,
    };
}

function submitSuccess(response) {
    return {
        type: actions.SUBMIT_SUCCESS,
        data: response
    };
}

function submitFail(error) {
    return {
        type: actions.SUBMIT_FAIL,
        error
    };
}

export function attemptSubmit() {
    return (dispatch, getState) => {

        const currState = getState();

        const submissionBody = submissionBodySelector(currState);

        dispatch({
            type: actions.ATTEMPT_SUBMIT
        });

        const token = AuthModule.selectors.rawJwtSelector(currState);
        submitSubmission(submissionBody, token, (err, data) => {
            if(err) {
                return dispatch(submitFail(err));
            }
            return dispatch(submitSuccess(data));
        });
    };
}

export function resetSubmission() {
    return (dispatch, getState) => {
        const currState = getState();

        // Delete the publication
        dispatch(publicationActions.remove(publicationLocalId(currState)));

        // Delete the annotations
        dispatch(annotationActions.removeAnnotations(annotationOrder(currState)));

        // Delete the genes
        dispatch(geneActions.removeGenes(geneOrder(currState)));

        // Reset the submission
        dispatch({
            type: actions.RESET_SUBMISSION
        });

        // Initialize the submission
        return dispatch(initialize());
    };
}

export function preview() {
    return {
        type: actions.PREVIEW,
    };
}

export function edit() {
    return {
        type: actions.EDIT,
    };
}

export function loadSubmission(submission) {
    return {
        type: actions.LOAD_SUBMISSION,
        submission,
    };
}
