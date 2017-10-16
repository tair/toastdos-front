"use strict";

import AuthModule from 'modules/authentication';
import {
    validateGene,
    submitSubmission,
    searchKeywords
} from 'lib/api';
import * as actions from './actionTypes';
import { name } from './constants';
import { submissionBodySelector } from './selectors';

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
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE_GENE,
            localId: localId
        });

        // make sure we didn't add gene already
        // newState.geneIndex[action.localId].validating = false;
        // console.log(state.geneIndex);
        // console.log(action.localId);
        for(var gi in currState[name].geneIndex) {
            // console.log(gi)
            if(`${gi}` === `${localId}`) continue;
            if(currState[name].geneIndex[gi].finalizedLocusName === geneData.locusName) {
                return dispatch(validateGeneFail(localId, 'Gene already added'));
            }
        }


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

export function validateEvidenceWith(annotationId, evidenceWithId) {
    return (dispatch, getState) => {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);
        const evidenceWith = currState.submission.annotationIndex[annotationId].data
            .evidenceWithIndex[evidenceWithId];

        validateGene(evidenceWith.locusName, token, (err, data) => {
            if(err) {
                return dispatch(validateEvidenceWithFail(annotationId, evidenceWithId));
            }
            return dispatch(validateEvidenceWithSuccess(annotationId, evidenceWithId));
        });
    };
}

function validateEvidenceWithFail(annotationId, evidenceWithId) {
    return {
        type: actions.VALIDATE_EVIDENCE_WITH_FAIL,
        annotationId,
        evidenceWithId
    };
}

function validateEvidenceWithSuccess(annotationId, evidenceWithId) {
    return {
        type: actions.VALIDATE_EVIDENCE_WITH_SUCCESS,
        annotationId,
        evidenceWithId
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

export function addEvidenceWith(annotationId, newEvidenceWithId) {
    return {
        type: actions.ADD_EVIDENCE_WITH,
        annotationId,
        newEvidenceWithId
    };
}

function submitSuccess(response) {
    return {
        type: actions.SUBMIT_SUCCESS,
        data: response
    };
}

function submitFail(error) {
    // console.log(error);
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
    return {
        type: actions.RESET_SUBMISSION
    };
}

function keywordSearchSuccess(results) {
    return {
        type: actions.KEYWORD_SEARCH_SUCCESS,
        results
    };
}

function keywordSearchFail(error) {
    console.error(error);
    return {
        type: actions.KEYWORD_SEARCH_FAIL,
        error
    };
}

export function attemptKeywordSearch(searchTerm, keywordScope) {
    return (dispatch, getState) => {

        const currState = getState();

        dispatch({
            type: actions.ATTEMPT_KEYWORD_SEARCH
        });

        const token = AuthModule.selectors.rawJwtSelector(currState);
        searchKeywords(searchTerm, keywordScope, token, (err, data) => {
            if(err) {
                return dispatch(keywordSearchFail(err));
            }
            return dispatch(keywordSearchSuccess(data));
        });
    };
}

export function clearKeywordSearch() {
    return {
        type: actions.CLEAR_KEYWORD_SEARCH
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