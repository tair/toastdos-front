"use strict";

import * as actions from './actionTypes';
import { validateGene } from 'lib/api';
import AuthModule from 'modules/authentication';

export function changePublicationId(value) {
    return {
        type: actions.PUBLICATION_ID_CHANGED,
        value: value
    };
}

export function addNewGene(localId) {
    return {
        type: actions.ADD_NEW_GENE,
        localId: localId
    };
}

export function removeGene(localId) {
    return {
        type: actions.REMOVE_GENE,
        localId: localId
    };
}

export function attemptValidateGene(localId, geneData) {
    return (dispatch, getState) => {
        const currState = getState();
        const token = AuthModule.selectors.jwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE_GENE,
            localId: localId
        });

        // console.log(geneData)
        validateGene(geneData.locusName, token, (err, data) => {
            if(err) {
                if(err.error === 'NOT_FOUND') {
                    return dispatch(validateGeneFail(localId, "Gene Not Found"));
                }
                return dispatch(validateGeneFail(localId, "Error Validating Gene"));
            }
            return dispatch(validateGeneSuccess(localId, geneData));
        });

        // todo the async operation
        // return setTimeout(() => {
        //     return dispatch(validateGeneResult(localId, false, geneData));
        // }, 500);
    };
}

function validateGeneSuccess(localId, geneData) {
    return {
        type: actions.VALIDATE_GENE_SUCCESS,
        localId: localId,
        geneData: geneData
    };
}

function validateGeneFail(localId, error) {
    return {
        type: actions.VALIDATE_GENE_FAIL,
        localId: localId,
        error: error
    };
}

export function editGeneData(localId) {
    return {
        type: actions.EDIT_GENE_DATA,
        localId: localId
    };
}

export function addNewAnnotation(localId) {
    return {
        type: actions.ADD_NEW_ANNOTATION,
        localId: localId
    };
}

export function removeAnnotation(localId) {
    return {
        type: actions.REMOVE_ANNOTATION,
        localId: localId
    };
}

export function changeAnnotationType(localId, newType) {
    return {
        type: actions.CHANGE_ANNOTATION_TYPE,
        localId: localId,
        newAnnotationType: newType
    };
}

export function updateAnnotationData(localId, data) {
    return {
        type: actions.UPDATE_ANNOTATION_DATA,
        localId: localId,
        data: data
    };
}

function submitResult(result) {
    return {
        type: actions.SUBMIT_RESULT
    };
}

export function submitSubmission() {
    return (dispatch, getState) => {

        const currState = getState().submission;

        //todo build JSON for submission request

        dispatch({
            type: actions.ATTEMPT_SUBMIT
        });

        // todo the async operation
        return setTimeout(() => {
            return dispatch(submitResult({}));
        }, 500);
    };
}

export function resetSubmission() {
    return {
        type: actions.RESET_SUBMISSION
    };
}

