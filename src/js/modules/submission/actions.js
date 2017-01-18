"use strict";

import * as actions from './actionTypes';

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

        const currState = getState().submission;

        dispatch({
            type: actions.ATTEMPT_VALIDATE_GENE,
            localId: localId
        });

        // todo the async operation
        return setTimeout(() => {
            return dispatch(validateGeneResult(localId, true, geneData));
        }, 2000);
    };
}

export function validateGeneResult(localId, result, geneData) {
    return {
        type: actions.VALIDATE_GENE_RESULT,
        localId: localId,
        result: result,
        geneData: geneData
    };
}

export function validateGeneFail(localId, error) {
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

export function changeAnnotationType(localId, newType) {
    return {
        type: actions.CHANGE_ANNOTATION_TYPE,
        localId: localId,
        newAnnotationType: newType
    };
}

